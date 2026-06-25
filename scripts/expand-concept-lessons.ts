import "dotenv/config";
import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { QuestionFormat, type Prisma } from "@prisma/client";
import { getPrisma } from "../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

type ConceptWithQuestions = Prisma.ConceptGetPayload<{
  include: {
    lessons: { select: { id: true; slug: true } };
    questions: {
      orderBy: [{ isPrimary: "desc" }, { position: "asc" }];
      take: number;
      include: {
        question: {
          include: {
            answers: { orderBy: { position: "asc" } };
          };
        };
      };
    };
  };
}>;

type LessonDraft = {
  summary: string;
  keyConcepts: string[];
  contentSections: Array<{ heading: string; body: string }>;
  reviewQuestions: string[];
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

function isRetryableFetchError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const code = (error as { code?: string }).code;
  const message = (error as { message?: string }).message ?? "";
  return code === "ECONNRESET" || code === "ETIMEDOUT" || message.includes("fetch failed");
}

async function fetchJsonWithRetry(url: string, init: RequestInit, attempts = 4) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok) return response;
      if (response.status === 429 || response.status >= 500) {
        lastError = new Error(`HTTP ${response.status}`);
      } else {
        return response;
      }
    } catch (error) {
      lastError = error;
      if (!isRetryableFetchError(error)) throw error;
    }
    if (attempt < attempts) {
      await sleep(500 * attempt * attempt);
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Request failed after retries.");
}

function schoolLevelLabel(value: string | null) {
  if (value === "MIDDLE_SCHOOL") return "Middle School";
  if (value === "HIGH_SCHOOL") return "High School";
  return "Mixed";
}

function lessonPrompt(concept: ConceptWithQuestions) {
  const examples = concept.questions.slice(0, 3).map((entry) => {
    const question = entry.question;
    const choices =
      question.format === QuestionFormat.MULTIPLE_CHOICE
        ? question.answers.map((answer) => answer.text)
        : null;
    return {
      prompt: question.prompt,
      category: question.category,
      difficulty: question.difficulty,
      correctAnswer: question.answers.find((a) => a.isCorrect)?.text ?? "",
      choices
    };
  });

  return `You are writing a reusable concept lesson for Medal Minds, a Science Bowl prep platform.

Write for a student who is seeing the topic for the first time.

The lesson must be practical, clear, and self-contained. It should feel like a one-stop study page, not a short note. It should help the student understand the topic, recognize it in a Science Bowl clue, avoid the common mistake, and do a quick self-check.

Requirements:
- Write a fuller lesson with enough detail for a student to learn the topic from scratch.
- Make it feel like one-stop study material for this topic.
- Use language a middle school or high school competitor can understand.
- Do not use markdown.
- Do not mention that this is AI-generated.
- Do not repeat question text verbatim.
- Use the provided examples only as evidence for what the concept should emphasize.
- If the concept is broad, keep the lesson broad and reusable.
- If the concept is narrow, still explain the broader rule or idea behind it.
- Include a concrete example or mental model when helpful.
- Explain what the topic is, how it works, why it matters, and how it shows up in Science Bowl questions.
- Prefer 6 or 7 sections rather than the minimum.
- Keep each section substantial, usually 2 to 4 sentences.
- Avoid vague filler.
- Output only valid JSON.

Concept:
${JSON.stringify({
    title: concept.title,
    slug: concept.slug,
    category: concept.category,
    schoolLevel: schoolLevelLabel(concept.schoolLevel),
    shortDescription: concept.shortDescription,
    aliases: concept.aliases
  }, null, 2)}

Example questions:
${JSON.stringify(examples, null, 2)}

Output schema:
{
  "summary": string,
  "keyConcepts": string[],
  "contentSections": [
    { "heading": "What it is", "body": string },
    { "heading": "Core Idea", "body": string },
    { "heading": "How it works", "body": string },
    { "heading": "Science Bowl Clue", "body": string },
    { "heading": "Common Trap", "body": string },
    { "heading": "Worked Example", "body": string },
    { "heading": "Mini review", "body": string }
  ],
  "reviewQuestions": string[]
}`;
}

type DraftResponse = {
  summary: string;
  keyConcepts: string[];
  contentSections: Array<{ heading: string; body: string }>;
  reviewQuestions: string[];
};

function validateDraft(value: unknown): LessonDraft {
  if (!value || typeof value !== "object") {
    throw new Error("Model output was not a JSON object.");
  }
  const candidate = value as Partial<DraftResponse>;
  if (typeof candidate.summary !== "string" || !candidate.summary.trim()) {
    throw new Error("Model output did not include summary.");
  }
  if (!Array.isArray(candidate.keyConcepts) || candidate.keyConcepts.some((item) => typeof item !== "string")) {
    throw new Error("Model output did not include keyConcepts.");
  }
  if (!Array.isArray(candidate.contentSections) || candidate.contentSections.length < 6) {
    throw new Error("Model output did not include enough contentSections.");
  }
  if (!Array.isArray(candidate.reviewQuestions) || candidate.reviewQuestions.length < 2) {
    throw new Error("Model output did not include enough reviewQuestions.");
  }

  const sections = candidate.contentSections.map((section) => {
    if (!section || typeof section.heading !== "string" || typeof section.body !== "string") {
      throw new Error("Model output included an invalid content section.");
    }
    return {
      heading: section.heading.trim(),
      body: section.body.trim()
    };
  });

  return {
    summary: candidate.summary.trim(),
    keyConcepts: candidate.keyConcepts.map((item) => item.trim()).filter(Boolean).slice(0, 6),
    contentSections: sections.slice(0, 7),
    reviewQuestions: candidate.reviewQuestions.map((item) => item.trim()).filter(Boolean).slice(0, 3)
  };
}

async function generateDraft(concept: ConceptWithQuestions, model: string) {
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
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: "You write clear, reusable lesson content for academic competition prep."
        },
        {
          role: "user",
          content: lessonPrompt(concept)
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "concept_lesson_draft",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["summary", "keyConcepts", "contentSections", "reviewQuestions"],
            properties: {
              summary: { type: "string" },
              keyConcepts: { type: "array", items: { type: "string" } },
              contentSections: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["heading", "body"],
                  properties: {
                    heading: { type: "string" },
                    body: { type: "string" }
                  }
                }
              },
              reviewQuestions: { type: "array", items: { type: "string" } }
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

  return validateDraft(JSON.parse(content));
}

async function main() {
  const competitionSlug = readArg("competition") ?? "science-bowl";
  const limit = parsePositiveInt(readArg("limit"), 1000);
  const model = readArg("model") ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const write = hasFlag("write");

  const prisma = getPrisma();
  const concepts = await prisma.concept.findMany({
    where: { competition: { slug: competitionSlug } },
    take: limit,
    orderBy: [{ category: "asc" }, { title: "asc" }],
    include: {
      lessons: { select: { id: true, slug: true } },
      questions: {
        orderBy: [{ isPrimary: "desc" }, { position: "asc" }],
        take: 3,
        include: {
          question: {
            include: {
              answers: { orderBy: { position: "asc" } }
            }
          }
        }
      }
    }
  }) as ConceptWithQuestions[];

  console.log(JSON.stringify({ competitionSlug, model, selected: concepts.length, write }, null, 2));

  for (const concept of concepts) {
    try {
      const draft = await generateDraft(concept, model);
      const lessonSlug = concept.slug;
      const lessonId = `${concept.id}-lesson`;
      const levelSlug =
        concept.schoolLevel === "MIDDLE_SCHOOL"
          ? "middle-school"
          : concept.schoolLevel === "HIGH_SCHOOL"
            ? "high-school"
            : "mixed-bowl-prep";
      const levelId = `${concept.competitionId}-${levelSlug}`;
      const estimatedMinutes = Math.min(20, Math.max(12, draft.keyConcepts.length * 2 + 8));

      if (write) {
        await prisma.lesson.upsert({
          where: {
            competitionId_slug: {
              competitionId: concept.competitionId,
              slug: lessonSlug
            }
          },
          update: {
            conceptId: concept.id,
            levelId,
            title: concept.title,
            category: concept.category,
            estimatedMinutes,
            summary: draft.summary,
            keyConcepts: draft.keyConcepts,
            contentSections: draft.contentSections,
            reviewQuestions: draft.reviewQuestions
          },
          create: {
            id: lessonId,
            competitionId: concept.competitionId,
            conceptId: concept.id,
            levelId,
            slug: lessonSlug,
            title: concept.title,
            category: concept.category,
            estimatedMinutes,
            summary: draft.summary,
            keyConcepts: draft.keyConcepts,
            contentSections: draft.contentSections,
            reviewQuestions: draft.reviewQuestions
          }
        });
      }

      console.log(JSON.stringify({
        conceptId: concept.id,
        lessonSlug,
        lessonExists: concept.lessons.length > 0,
        summary: draft.summary,
        keyConcepts: draft.keyConcepts,
        write
      }, null, 2));
    } catch (error) {
      console.error(JSON.stringify({
        conceptId: concept.id,
        lessonSlug: concept.slug,
        error: error instanceof Error ? error.message : String(error)
      }, null, 2));
      continue;
    }
  }

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  try {
    await getPrisma().$disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
