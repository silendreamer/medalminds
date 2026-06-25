import "dotenv/config";
import { mkdir, appendFile, writeFile } from "fs/promises";
import path from "path";
import { ClassificationDifficulty, QuestionFormat, type Prisma } from "@prisma/client";
import { getPrisma } from "../src/lib/db";

const PROMPT_VERSION = "topic-classification-v2";
const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const DEFAULT_LIMIT = 50;
const DEFAULT_BATCH_SIZE = 6;
const DEFAULT_DELAY_MS = 0;

type ClassificationDifficultyLabel = "Easy" | "Medium" | "Hard";
type Confidence = number;

type QuestionWithRelations = Prisma.QuestionGetPayload<{
  include: {
    competition: true;
    answers: { include: { mc: true } };
    multipleChoices: { orderBy: { position: "asc" } };
    topicClassification: true;
  };
}>;

type QuestionInput = {
  id: string;
  subject: string;
  schoolLevel: string | null;
  competition: string;
  prompt: string;
  answerText: string;
  format: QuestionFormat;
  existingClassification: {
    topic: string;
    subtopic: string;
    keyConcept: string;
    difficulty: ClassificationDifficultyLabel;
    confidence: number;
    needsReview: boolean;
  } | null;
};

type ClassificationDecision = {
  questionId: string;
  topic: string;
  subtopic: string;
  keyConcept: string;
  difficulty: ClassificationDifficultyLabel;
  confidence: Confidence;
  needsReview: boolean;
  rationale?: string;
};

function readArg(name: string) {
  const prefix = `--${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function hasFlag(name: string) {
  return process.argv.includes(`--${name}`);
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mapWithConcurrency<T, U>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<U>
) {
  const results: U[] = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

function normalizeSubjectFilter(value: string | undefined) {
  if (!value) return undefined;
  return value.trim();
}

function questionAnswerText(question: QuestionWithRelations) {
  const answer = question.answers[0];
  const text = answer?.mc?.text ?? answer?.text ?? "";
  return text.trim();
}

function questionInput(question: QuestionWithRelations): QuestionInput {
  return {
    id: question.id,
    subject: question.category,
    schoolLevel: question.schoolLevel,
    competition: question.competition.name,
    prompt: question.prompt,
    answerText: questionAnswerText(question),
    format: question.format,
    existingClassification: question.topicClassification
      ? {
          topic: question.topicClassification.topic,
          subtopic: question.topicClassification.subtopic,
          keyConcept: question.topicClassification.keyConcept,
          difficulty: question.topicClassification.difficulty === ClassificationDifficulty.EASY
            ? "Easy"
            : question.topicClassification.difficulty === ClassificationDifficulty.MEDIUM
              ? "Medium"
              : "Hard",
          confidence: question.topicClassification.confidence,
          needsReview: question.topicClassification.needsReview
        }
      : null
  };
}

function buildPrompt(questions: QuestionInput[]) {
  return `You are classifying Science Bowl questions for Medal Minds.

Goal:
- Assign a reusable topic and subtopic that can group many similar questions.
- Do not reclassify the subject. The subject is already correct.
- Use the question text and answer text to infer the scientific or mathematical idea.
- Avoid one-off labels and overly narrow phrasing.
- If a question is unclear or too ambiguous, use "Needs Review" for both topic and subtopic.
- Keep topic broad and reusable.
- Keep subtopic specific but not too narrow.
- Return a concise key concept sentence that teaches the underlying idea.
- Confidence must be between 0 and 1.
- Set needsReview to true when confidence is below 0.6 or when the question is ambiguous.
- Output only valid JSON.

Questions:
${JSON.stringify(questions, null, 2)}

Output schema:
{
  "items": [
    {
      "questionId": string,
      "topic": string,
      "subtopic": string,
      "keyConcept": string,
      "difficulty": "Easy" | "Medium" | "Hard",
      "confidence": number,
      "needsReview": boolean,
      "rationale": string
    }
  ]
}`;
}

function difficultyFromValue(value: unknown): ClassificationDifficultyLabel {
  if (value === "Easy" || value === "Medium" || value === "Hard") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "easy") return "Easy";
    if (normalized === "medium") return "Medium";
    if (normalized === "hard") return "Hard";
  }
  throw new Error("Invalid difficulty value.");
}

function dbDifficultyFromLabel(value: ClassificationDifficultyLabel): ClassificationDifficulty {
  if (value === "Easy") return ClassificationDifficulty.EASY;
  if (value === "Medium") return ClassificationDifficulty.MEDIUM;
  return ClassificationDifficulty.HARD;
}

function clampConfidence(value: unknown) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) throw new Error("Invalid confidence value.");
  return Math.max(0, Math.min(1, parsed));
}

function cleanText(value: unknown, name: string, fallback?: string) {
  if (typeof value !== "string") {
    if (fallback) return fallback;
    throw new Error(`Invalid ${name}.`);
  }
  const cleaned = value.trim();
  if (cleaned) return cleaned;
  if (fallback) return fallback;
  throw new Error(`Invalid ${name}.`);
}

function normalizeBatchDecision(raw: unknown): ClassificationDecision[] {
  if (!raw || typeof raw !== "object") {
    throw new Error("Model response was not an object.");
  }

  const value = raw as { items?: unknown };
  if (!Array.isArray(value.items)) {
    throw new Error("Model response did not include an items array.");
  }

  return value.items.map((entry) => {
    if (!entry || typeof entry !== "object") {
      throw new Error("Model response included an invalid batch item.");
    }

    const item = entry as Record<string, unknown>;
    const confidence = clampConfidence(item.confidence);
    const topic = cleanText(item.topic, "topic");
    const subtopic = cleanText(item.subtopic, "subtopic");
    const keyConcept = cleanText(item.keyConcept, "keyConcept");
    const difficulty = difficultyFromValue(item.difficulty);
    const needsReview = typeof item.needsReview === "boolean" ? item.needsReview : confidence < 0.6;
    const questionId = cleanText(item.questionId, "questionId");

    return {
      questionId,
      topic: confidence < 0.6 ? "Needs Review" : topic,
      subtopic: confidence < 0.6 ? "Needs Review" : subtopic,
      keyConcept,
      difficulty,
      confidence,
      needsReview: needsReview || confidence < 0.6,
      rationale: typeof item.rationale === "string" ? item.rationale.trim() : undefined
    };
  });
}

async function fetchJsonWithRetry(url: string, init: RequestInit, attempts = 4) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok) return response;
      if (response.status === 429 || response.status >= 500) {
        lastError = new Error(`HTTP ${response.status}`);
        const retryAfter = response.headers.get("retry-after");
        const retryDelay = retryAfter ? Number(retryAfter) * 1000 : 0;
        if (attempt < attempts && Number.isFinite(retryDelay) && retryDelay > 0) {
          await sleep(Math.min(retryDelay, 15000));
          continue;
        }
      } else {
        return response;
      }
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) {
      await sleep(500 * attempt * attempt);
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Request failed after retries.");
}

async function requestClassifications(questions: QuestionWithRelations[], model: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required.");
  }

  const response = await fetchJsonWithRetry("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You classify academic competition questions into reusable topic and subtopic labels."
        },
        {
          role: "user",
          content: buildPrompt(questions.map((question) => questionInput(question)))
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "question_topic_classification_batch",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["items"],
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["questionId", "topic", "subtopic", "keyConcept", "difficulty", "confidence", "needsReview", "rationale"],
                  properties: {
                    questionId: { type: "string" },
                    topic: { type: "string" },
                    subtopic: { type: "string" },
                    keyConcept: { type: "string" },
                    difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
                    confidence: { type: "number" },
                    needsReview: { type: "boolean" },
                    rationale: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed with ${response.status}: ${body}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI response did not include message content.");
  }

  return normalizeBatchDecision(JSON.parse(content));
}

function classificationId(questionId: string) {
  return `topic-classification-${questionId}`;
}

async function writeClassification(
  prisma: ReturnType<typeof getPrisma>,
  question: QuestionWithRelations,
  decision: ClassificationDecision,
  model: string
) {
  return prisma.questionTopicClassification.upsert({
    where: { questionId: question.id },
    update: {
      topic: decision.topic,
      subtopic: decision.subtopic,
      keyConcept: decision.keyConcept,
      difficulty: dbDifficultyFromLabel(decision.difficulty),
      confidence: decision.confidence,
      needsReview: decision.needsReview,
      model,
      promptVersion: PROMPT_VERSION,
      notes: decision.rationale ?? null
    },
    create: {
      id: classificationId(question.id),
      questionId: question.id,
      topic: decision.topic,
      subtopic: decision.subtopic,
      keyConcept: decision.keyConcept,
      difficulty: dbDifficultyFromLabel(decision.difficulty),
      confidence: decision.confidence,
      needsReview: decision.needsReview,
      model,
      promptVersion: PROMPT_VERSION,
      notes: decision.rationale ?? null
    }
  });
}

async function main() {
  const prisma = getPrisma();
  const model = readArg("model") ?? DEFAULT_MODEL;
  const competition = readArg("competition") ?? "science-bowl";
  const subject = normalizeSubjectFilter(readArg("subject") ?? readArg("category"));
  const schoolLevelArg = normalizeSubjectFilter(readArg("school-level"));
  const limit = parsePositiveInt(readArg("limit"), DEFAULT_LIMIT);
  const batchSize = parsePositiveInt(readArg("batch-size"), DEFAULT_BATCH_SIZE);
  const concurrency = parsePositiveInt(readArg("concurrency"), 2);
  const delayMs = parsePositiveInt(readArg("delay-ms"), DEFAULT_DELAY_MS);
  const includeClassified = hasFlag("overwrite");
  const dryRun = hasFlag("dry-run") || !hasFlag("write");
  const writeMode = !dryRun;
  const reportDir = readArg("report-dir") ?? "reports";
  const failedLogFile = path.join(reportDir, "question-topic-classification-failures.jsonl");
  const schoolLevel =
    schoolLevelArg === "middle-school"
      ? "MIDDLE_SCHOOL"
      : schoolLevelArg === "high-school"
        ? "HIGH_SCHOOL"
        : schoolLevelArg === "mixed"
          ? "MIXED"
          : undefined;

  const where: Prisma.QuestionWhereInput = {
    competition: { slug: competition },
    ...(subject ? { category: subject } : {}),
    ...(schoolLevel ? { schoolLevel } : {}),
    ...(includeClassified ? {} : { topicClassification: { is: null } })
  };

  const questions = await prisma.question.findMany({
    where,
    include: {
      competition: true,
      answers: { include: { mc: true } },
      multipleChoices: { orderBy: { position: "asc" } },
      topicClassification: true
    },
    orderBy: [{ updatedAt: "asc" }, { id: "asc" }],
    take: limit
  });

  console.log(
    JSON.stringify(
      {
        mode: writeMode ? "write" : "dry-run",
        model,
        promptVersion: PROMPT_VERSION,
        selected: questions.length,
        batchSize,
        concurrency,
        delayMs,
        filters: {
          competition,
          subject,
          schoolLevel,
          limit,
          overwrite: includeClassified
        }
      },
      null,
      2
    )
  );

  if (questions.length === 0) {
    console.log(JSON.stringify({ done: true, processed: 0, skipped: 0, failed: 0 }, null, 2));
    await prisma.$disconnect();
    return;
  }

  if (writeMode) {
    await mkdir(reportDir, { recursive: true });
  }

  let processed = 0;
  let skipped = 0;
  let failed = 0;
  const failures: Array<Record<string, unknown>> = [];

  const batches: QuestionWithRelations[][] = [];
  for (let index = 0; index < questions.length; index += batchSize) {
    batches.push(questions.slice(index, index + batchSize));
  }

  await mapWithConcurrency(batches, concurrency, async (batch) => {
    const pending = batch.filter((question) => includeClassified || !question.topicClassification);
    const alreadyClassified = batch.filter((question) => question.topicClassification && !includeClassified);

    for (const question of alreadyClassified) {
      skipped += 1;
      console.log(
        JSON.stringify(
          {
            questionId: question.id,
            skipped: true,
            reason: "already classified"
          },
          null,
          2
        )
      );
    }

    if (pending.length === 0) return;

    try {
      const decisions = await requestClassifications(pending, model);
      const decisionById = new Map(decisions.map((decision) => [decision.questionId, decision]));

      for (const question of pending) {
        const decision = decisionById.get(question.id);
        if (!decision) {
          failed += 1;
          const failure = {
            questionId: question.id,
            subject: question.category,
            schoolLevel: question.schoolLevel,
            prompt: question.prompt,
            error: "Model response did not include this question"
          };
          failures.push(failure);
          console.error(JSON.stringify(failure, null, 2));
          if (writeMode) {
            await appendFile(failedLogFile, `${JSON.stringify(failure)}\n`, "utf8");
          }
          continue;
        }

        if (writeMode) {
          await writeClassification(prisma, question, decision, model);
        }

        processed += 1;
        console.log(
          JSON.stringify(
            {
              questionId: question.id,
              subject: question.category,
              schoolLevel: question.schoolLevel,
              difficulty: decision.difficulty,
              topic: decision.topic,
              subtopic: decision.subtopic,
              confidence: decision.confidence,
              needsReview: decision.needsReview,
              write: writeMode
            },
            null,
            2
          )
        );
      }
    } catch (error) {
      for (const question of pending) {
        failed += 1;
        const failure = {
          questionId: question.id,
          subject: question.category,
          schoolLevel: question.schoolLevel,
          prompt: question.prompt,
          error: error instanceof Error ? error.message : String(error)
        };
        failures.push(failure);
        console.error(JSON.stringify(failure, null, 2));
        if (writeMode) {
          await appendFile(failedLogFile, `${JSON.stringify(failure)}\n`, "utf8");
        }
      }
    }

    if (delayMs > 0) {
      await sleep(delayMs);
    }
  });

  if (writeMode) {
    const summary = {
      mode: "write",
      model,
      promptVersion: PROMPT_VERSION,
      processed,
      skipped,
      failed,
      failuresFile: failedLogFile
    };
    await writeFile(path.join(reportDir, "question-topic-classification-run.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(JSON.stringify({ mode: "dry-run", processed, skipped, failed, pendingFailures: failures.length }, null, 2));
  }

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  try {
    await getPrisma().$disconnect();
  } catch {
    // Ignore disconnect errors during failure handling.
  }
  process.exit(1);
});
