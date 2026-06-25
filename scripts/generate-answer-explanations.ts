import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { QuestionFormat, type Prisma } from "@prisma/client";
import { getPrisma } from "../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

const PLACEHOLDER_EXPLANATION_MARKER = "source packet does not include a worked explanation";
const PROMPT_VERSION = "answer-explanation-v1";

type GeneratedExplanation = {
  explanation: string;
  confidence: "high" | "medium" | "low";
  keyConcepts: string[];
  needsReview: boolean;
};

type QuestionWithRelations = Prisma.QuestionGetPayload<{
  include: {
    competition: true;
    answers: { orderBy: { position: "asc" } };
    answerExplanations: { orderBy: { position: "asc" } };
  };
}>;

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

function schoolLevelSlug(value: string | null) {
  if (value === "MIDDLE_SCHOOL") return "middle-school";
  if (value === "HIGH_SCHOOL") return "high-school";
  return undefined;
}

function buildVerificationPath(question: QuestionWithRelations) {
  const params = new URLSearchParams();
  const level = schoolLevelSlug(question.schoolLevel);
  if (level) params.set("level", level);
  params.set("subject", question.category);
  params.set("q", question.id);
  return `/${question.competition.slug}/practice?${params.toString()}`;
}

function buildPromptInput(question: QuestionWithRelations) {
  const choices =
    question.format === QuestionFormat.MULTIPLE_CHOICE
      ? question.answers
          .sort((a, b) => a.position - b.position)
          .map((answer) => answer.text)
      : null;

  return {
    competition: question.competition.name,
    schoolLevel: question.schoolLevel,
    category: question.category,
    difficulty: question.difficulty,
    questionKind: question.questionKind,
    prompt: question.prompt,
    choices,
    correctAnswer: question.answers.find((a) => a.isCorrect)?.text ?? ""
  };
}

function buildUserPrompt(question: QuestionWithRelations) {
  return `You are generating database-ready answer explanations for Medal Minds, an academic competition prep platform.

Write a solution explanation for the given competition question.

Requirements:
- Explanation must be factually careful and educational.
- Explanation must be short, usually 60 to 120 words.
- Do not add unrelated background.
- Do not include markdown.
- Do not include "The answer is..." as the first sentence unless it reads naturally.
- If choices are provided, use them to explain the answer.
- If the correct answer has aliases, treat them as equivalent.
- The explanation must support the provided correctAnswer, not choose a different answer.
- If the provided correctAnswer seems wrong, ambiguous, or inconsistent with the prompt, explain the issue briefly and set needsReview to true.
- If the prompt already contains multiple-choice labels W, X, Y, Z, do not repeat the full choices unless needed.
- Set needsReview to true if confidence is low.
- Output only valid JSON.

Input:
${JSON.stringify(buildPromptInput(question), null, 2)}

Output schema:
{
  "explanation": string,
  "confidence": "high" | "medium" | "low",
  "keyConcepts": string[],
  "needsReview": boolean
}`;
}

function validateGeneratedExplanation(value: unknown): GeneratedExplanation {
  if (!value || typeof value !== "object") {
    throw new Error("Model output was not a JSON object.");
  }

  const candidate = value as Partial<GeneratedExplanation>;
  if (typeof candidate.explanation !== "string" || !candidate.explanation.trim()) {
    throw new Error("Model output did not include a usable explanation.");
  }
  const confidence = candidate.confidence;
  if (confidence !== "high" && confidence !== "medium" && confidence !== "low") {
    throw new Error("Model output did not include a valid confidence value.");
  }
  if (!Array.isArray(candidate.keyConcepts) || candidate.keyConcepts.some((item) => typeof item !== "string")) {
    throw new Error("Model output did not include valid keyConcepts.");
  }
  if (typeof candidate.needsReview !== "boolean") {
    throw new Error("Model output did not include a boolean needsReview value.");
  }

  return {
    explanation: candidate.explanation.trim(),
    confidence,
    keyConcepts: candidate.keyConcepts.map((item) => item.trim()).filter(Boolean),
    needsReview: candidate.needsReview
  };
}

async function createExplanation(question: QuestionWithRelations, model: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: "You write concise, factual solution explanations for academic competition questions."
        },
        {
          role: "user",
          content: buildUserPrompt(question)
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "answer_explanation",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["explanation", "confidence", "keyConcepts", "needsReview"],
            properties: {
              explanation: { type: "string" },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              keyConcepts: {
                type: "array",
                items: { type: "string" }
              },
              needsReview: { type: "boolean" }
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

  const payload = await response.json() as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI response did not include message content.");
  }

  return validateGeneratedExplanation(JSON.parse(content));
}

async function main() {
  const limit = parsePositiveInt(readArg("limit"), 5);
  const delayMs = parsePositiveInt(readArg("delay-ms"), 350);
  const model = readArg("model") ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const write = hasFlag("write");
  const listOnly = hasFlag("list-only");
  const overwrite = hasFlag("overwrite");
  const competitionSlug = readArg("competition") ?? "science-bowl";
  const category = readArg("category");
  const questionId = readArg("question-id");
  const schoolLevelArg = readArg("school-level");
  const schoolLevel =
    schoolLevelArg === "middle-school"
      ? "MIDDLE_SCHOOL"
      : schoolLevelArg === "high-school"
        ? "HIGH_SCHOOL"
        : undefined;

  const prisma = getPrisma();
  const where: Prisma.QuestionWhereInput = {
    competition: { slug: competitionSlug },
    ...(questionId ? { id: questionId } : {}),
    ...(category ? { category } : {}),
    ...(schoolLevel ? { schoolLevel } : {}),
    ...(overwrite
      ? {}
      : {
          OR: [
            { answerExplanations: { none: {} } },
            {
              answerExplanations: {
                some: {
                  position: 0,
                  shortExplanation: { contains: PLACEHOLDER_EXPLANATION_MARKER }
                }
              }
            }
          ]
        })
  };

  const questions = await prisma.question.findMany({
    where,
    take: limit,
    orderBy: [{ updatedAt: "asc" }, { id: "asc" }],
    include: {
      competition: true,
      answers: { orderBy: { position: "asc" } },
      answerExplanations: { orderBy: { position: "asc" } }
    }
  });

  console.log(JSON.stringify({
    mode: listOnly ? "list-only" : write ? "write" : "dry-run",
    model,
    promptVersion: PROMPT_VERSION,
    selected: questions.length,
    filters: { competitionSlug, category, schoolLevel, questionId, overwrite }
  }, null, 2));

  if (listOnly) {
    for (const question of questions) {
      console.log(JSON.stringify({
        questionId: question.id,
        verificationPath: buildVerificationPath(question),
        category: question.category,
        schoolLevel: question.schoolLevel,
        currentExplanation: question.answerExplanations[0]?.shortExplanation ?? question.explanation
      }, null, 2));
    }
    console.log(JSON.stringify({ done: true, listed: questions.length }, null, 2));
    await prisma.$disconnect();
    return;
  }

  let updated = 0;
  for (const question of questions) {
    const generated = await createExplanation(question, model);
    const verificationPath = buildVerificationPath(question);
    const metadata = {
      confidence: generated.confidence,
      keyConcepts: generated.keyConcepts,
      needsReview: generated.needsReview,
      model,
      promptVersion: PROMPT_VERSION,
      generatedAt: new Date().toISOString()
    };

    if (write) {
      await prisma.answerExplanation.upsert({
        where: {
          questionId_position: {
            questionId: question.id,
            position: 0
          }
        },
        update: {
          shortExplanation: generated.explanation,
          detailedExplanation: JSON.stringify(metadata),
          updatedAt: new Date()
        },
        create: {
          id: `${question.id}-explanation-0`,
          questionId: question.id,
          shortExplanation: generated.explanation,
          detailedExplanation: JSON.stringify(metadata),
          position: 0
        }
      });
      updated += 1;
    }

    console.log(JSON.stringify({
      questionId: question.id,
      verificationPath,
      confidence: generated.confidence,
      needsReview: generated.needsReview,
      explanation: generated.explanation
    }, null, 2));

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  console.log(JSON.stringify({ done: true, updated, write }, null, 2));
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
