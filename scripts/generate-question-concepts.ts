import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { QuestionFormat, SchoolLevel, type Prisma } from "@prisma/client";
import { getPrisma } from "../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

const PROMPT_VERSION = "question-concept-v1";

type QuestionWithRelations = Prisma.QuestionGetPayload<{
  include: {
    competition: true;
    answers: { orderBy: { position: "asc" } };
  };
}>;

type ExistingConcept = Prisma.ConceptGetPayload<{
  include: {
    lessons: { select: { id: true; title: true } };
  };
}>;

type ConceptDecision = {
  useExistingConceptId: string | null;
  createNewConcept: boolean;
  conceptTitle: string;
  conceptSlug: string;
  shortDescription: string;
  aliases: string[];
  confidence: "high" | "medium" | "low";
  needsReview: boolean;
  lessonSummary: string;
  lessonKeyConcepts: string[];
  lessonSections: Array<{ heading: string; body: string }>;
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function schoolLevelFromArg(value: string | undefined) {
  if (value === "middle-school") return SchoolLevel.MIDDLE_SCHOOL;
  if (value === "high-school") return SchoolLevel.HIGH_SCHOOL;
  if (value === "mixed") return SchoolLevel.MIXED;
  return undefined;
}

function schoolLevelSlug(value: string | null) {
  if (value === SchoolLevel.MIDDLE_SCHOOL || value === "MIDDLE_SCHOOL") return "middle-school";
  if (value === SchoolLevel.HIGH_SCHOOL || value === "HIGH_SCHOOL") return "high-school";
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

function questionInput(question: QuestionWithRelations) {
  return {
    competition: question.competition.name,
    schoolLevel: question.schoolLevel ?? question.level,
    category: question.category,
    difficulty: question.difficulty,
    questionKind: question.questionKind,
    prompt: question.prompt,
    choices:
      question.format === QuestionFormat.MULTIPLE_CHOICE
        ? question.answers.map((answer) => answer.text)
        : null,
    correctAnswer: question.correctAnswer
  };
}

function conceptInput(concepts: ExistingConcept[]) {
  return concepts.slice(0, 50).map((concept) => ({
    id: concept.id,
    title: concept.title,
    slug: concept.slug,
    shortDescription: concept.shortDescription,
    aliases: concept.aliases,
    hasLesson: concept.lessons.length > 0
  }));
}

function buildPrompt(question: QuestionWithRelations, concepts: ExistingConcept[]) {
  return `You are grouping academic competition questions into reusable learning concepts for Medal Minds.

Goal:
- Link each question to one reusable concept lesson whenever possible.
- Prefer an existing concept if it covers the same underlying skill or fact pattern.
- Create a new concept only when none of the existing concepts fit.
- Do not create overly narrow concepts that only restate one question.
- Do not name a concept after a proper noun, species, organism, person, place, or one-off example unless that entity is the actual reusable topic.
- Generalize examples to the underlying science or math principle students should learn.
- The concept should be reusable by many similar questions.
- Keep concept titles short and canonical.
- Output only valid JSON.

Question:
${JSON.stringify(questionInput(question), null, 2)}

Existing concepts for this competition/category/level:
${JSON.stringify(conceptInput(concepts), null, 2)}

Decision rules:
- If an existing concept fits, set useExistingConceptId to that exact id and createNewConcept to false.
- If no existing concept fits, set useExistingConceptId to null and createNewConcept to true.
- If creating a new concept, also generate a short reusable lesson.
- If using an existing concept, still fill the lesson fields with concise reusable content, but the script will not create a duplicate lesson.
- Set needsReview to true if confidence is low or if the question is ambiguous.

Output schema:
{
  "useExistingConceptId": string | null,
  "createNewConcept": boolean,
  "conceptTitle": string,
  "conceptSlug": string,
  "shortDescription": string,
  "aliases": string[],
  "confidence": "high" | "medium" | "low",
  "needsReview": boolean,
  "lessonSummary": string,
  "lessonKeyConcepts": string[],
  "lessonSections": [{ "heading": string, "body": string }],
  "reviewQuestions": string[]
}`;
}

function validateStringArray(value: unknown, name: string, minLength: number) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Model output did not include valid ${name}.`);
  }
  const cleaned = value.map((item) => item.trim()).filter(Boolean);
  if (cleaned.length < minLength) {
    throw new Error(`Model output did not include enough ${name}.`);
  }
  return cleaned;
}

function validateDecision(value: unknown, existingConceptIds: Set<string>): ConceptDecision {
  if (!value || typeof value !== "object") {
    throw new Error("Model output was not a JSON object.");
  }

  const candidate = value as Partial<ConceptDecision>;
  const useExistingConceptId = candidate.useExistingConceptId ?? null;
  if (useExistingConceptId !== null && !existingConceptIds.has(useExistingConceptId)) {
    throw new Error(`Model selected unknown concept id: ${useExistingConceptId}`);
  }
  if (typeof candidate.createNewConcept !== "boolean") {
    throw new Error("Model output did not include createNewConcept.");
  }
  if (useExistingConceptId && candidate.createNewConcept) {
    throw new Error("Model output both selected an existing concept and requested a new concept.");
  }
  if (!useExistingConceptId && !candidate.createNewConcept) {
    throw new Error("Model output neither selected an existing concept nor requested a new concept.");
  }
  if (typeof candidate.conceptTitle !== "string" || !candidate.conceptTitle.trim()) {
    throw new Error("Model output did not include conceptTitle.");
  }
  if (typeof candidate.shortDescription !== "string" || !candidate.shortDescription.trim()) {
    throw new Error("Model output did not include shortDescription.");
  }
  const confidence = candidate.confidence;
  if (confidence !== "high" && confidence !== "medium" && confidence !== "low") {
    throw new Error("Model output did not include valid confidence.");
  }
  if (typeof candidate.needsReview !== "boolean") {
    throw new Error("Model output did not include needsReview.");
  }
  if (typeof candidate.lessonSummary !== "string" || !candidate.lessonSummary.trim()) {
    throw new Error("Model output did not include lessonSummary.");
  }
  if (!Array.isArray(candidate.lessonSections) || candidate.lessonSections.length < 2) {
    throw new Error("Model output did not include enough lessonSections.");
  }
  const lessonSections = candidate.lessonSections.map((section) => {
    if (!section || typeof section.heading !== "string" || typeof section.body !== "string") {
      throw new Error("Model output included an invalid lesson section.");
    }
    return {
      heading: section.heading.trim(),
      body: section.body.trim()
    };
  }).filter((section) => section.heading && section.body);

  return {
    useExistingConceptId,
    createNewConcept: candidate.createNewConcept,
    conceptTitle: candidate.conceptTitle.trim(),
    conceptSlug: slugify(candidate.conceptSlug || candidate.conceptTitle),
    shortDescription: candidate.shortDescription.trim(),
    aliases: validateStringArray(candidate.aliases, "aliases", 1).slice(0, 8),
    confidence,
    needsReview: candidate.needsReview,
    lessonSummary: candidate.lessonSummary.trim(),
    lessonKeyConcepts: validateStringArray(candidate.lessonKeyConcepts, "lessonKeyConcepts", 3).slice(0, 5),
    lessonSections: lessonSections.slice(0, 3),
    reviewQuestions: validateStringArray(candidate.reviewQuestions, "reviewQuestions", 2).slice(0, 3)
  };
}

async function requestConceptDecision(question: QuestionWithRelations, concepts: ExistingConcept[], model: string) {
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
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You group questions into reusable learning concepts and avoid duplicate lesson creation."
        },
        {
          role: "user",
          content: buildPrompt(question, concepts)
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "question_concept_decision",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "useExistingConceptId",
              "createNewConcept",
              "conceptTitle",
              "conceptSlug",
              "shortDescription",
              "aliases",
              "confidence",
              "needsReview",
              "lessonSummary",
              "lessonKeyConcepts",
              "lessonSections",
              "reviewQuestions"
            ],
            properties: {
              useExistingConceptId: { anyOf: [{ type: "string" }, { type: "null" }] },
              createNewConcept: { type: "boolean" },
              conceptTitle: { type: "string" },
              conceptSlug: { type: "string" },
              shortDescription: { type: "string" },
              aliases: { type: "array", items: { type: "string" } },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              needsReview: { type: "boolean" },
              lessonSummary: { type: "string" },
              lessonKeyConcepts: { type: "array", items: { type: "string" } },
              lessonSections: {
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

  return validateDecision(JSON.parse(content), new Set(concepts.map((concept) => concept.id)));
}

async function getCandidateConcepts(question: QuestionWithRelations) {
  return getPrisma().concept.findMany({
    where: {
      competitionId: question.competitionId,
      category: question.category,
      OR: [
        { schoolLevel: question.schoolLevel },
        { schoolLevel: SchoolLevel.MIXED },
        { schoolLevel: null }
      ]
    },
    orderBy: [{ title: "asc" }],
    include: {
      lessons: {
        select: { id: true, title: true }
      }
    }
  });
}

async function writeDecision(question: QuestionWithRelations, decision: ConceptDecision) {
  const prisma = getPrisma();
  const conceptId =
    decision.useExistingConceptId ??
    `${question.competitionId}-${schoolLevelSlug(question.schoolLevel) ?? "mixed"}-${slugify(question.category)}-${decision.conceptSlug}`;
  const lessonId = `${conceptId}-lesson`;

  if (decision.createNewConcept) {
    if (!question.schoolLevel) {
      throw new Error(`Question ${question.id} needs a schoolLevel before creating a new concept.`);
    }

    await prisma.concept.upsert({
      where: {
        competitionId_slug_category_schoolLevel: {
          competitionId: question.competitionId,
          slug: decision.conceptSlug,
          category: question.category,
          schoolLevel: question.schoolLevel
        }
      },
      update: {
        id: conceptId,
        title: decision.conceptTitle,
        shortDescription: decision.shortDescription,
        aliases: decision.aliases
      },
      create: {
        id: conceptId,
        competitionId: question.competitionId,
        slug: decision.conceptSlug,
        title: decision.conceptTitle,
        category: question.category,
        schoolLevel: question.schoolLevel,
        shortDescription: decision.shortDescription,
        aliases: decision.aliases
      }
    });

    await prisma.lesson.upsert({
      where: {
        competitionId_slug: {
          competitionId: question.competitionId,
          slug: decision.conceptSlug
        }
      },
      update: {
        conceptId,
        title: decision.conceptTitle,
        category: question.category,
        level: question.level,
        estimatedMinutes: 7,
        summary: decision.lessonSummary,
        keyConcepts: decision.lessonKeyConcepts,
        contentSections: decision.lessonSections,
        reviewQuestions: decision.reviewQuestions
      },
      create: {
        id: lessonId,
        competitionId: question.competitionId,
        levelId: question.levelId,
        conceptId,
        slug: decision.conceptSlug,
        title: decision.conceptTitle,
        category: question.category,
        level: question.level,
        estimatedMinutes: 7,
        summary: decision.lessonSummary,
        keyConcepts: decision.lessonKeyConcepts,
        contentSections: decision.lessonSections,
        reviewQuestions: decision.reviewQuestions
      }
    });
  }

  await prisma.questionConcept.upsert({
    where: {
      questionId_conceptId: {
        questionId: question.id,
        conceptId
      }
    },
    update: {
      isPrimary: true,
      position: 0
    },
    create: {
      questionId: question.id,
      conceptId,
      isPrimary: true,
      position: 0
    }
  });

  return conceptId;
}

async function main() {
  const limit = parsePositiveInt(readArg("limit"), 5);
  const delayMs = parsePositiveInt(readArg("delay-ms"), 350);
  const maxNewConcepts = parsePositiveInt(readArg("max-new-concepts"), 3);
  const model = readArg("model") ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const write = hasFlag("write");
  const listOnly = hasFlag("list-only");
  const overwrite = hasFlag("overwrite");
  const competitionSlug = readArg("competition") ?? "science-bowl";
  const category = readArg("category");
  const questionId = readArg("question-id");
  const schoolLevel = schoolLevelFromArg(readArg("school-level"));
  const prisma = getPrisma();
  const where: Prisma.QuestionWhereInput = {
    competition: { slug: competitionSlug },
    ...(questionId ? { id: questionId } : {}),
    ...(category ? { category } : {}),
    ...(schoolLevel ? { schoolLevel } : {}),
    ...(overwrite ? {} : { concepts: { none: { isPrimary: true } } })
  };
  const questions = await prisma.question.findMany({
    where,
    take: limit,
    orderBy: [{ updatedAt: "asc" }, { id: "asc" }],
    include: {
      competition: true,
      answers: { orderBy: { position: "asc" } }
    }
  });

  console.log(JSON.stringify({
    mode: listOnly ? "list-only" : write ? "write" : "dry-run",
    model,
    promptVersion: PROMPT_VERSION,
    selected: questions.length,
    maxNewConcepts,
    filters: { competitionSlug, category, schoolLevel, questionId, overwrite }
  }, null, 2));

  if (listOnly) {
    for (const question of questions) {
      const concepts = await getCandidateConcepts(question);
      console.log(JSON.stringify({
        questionId: question.id,
        verificationPath: buildVerificationPath(question),
        category: question.category,
        schoolLevel: question.schoolLevel,
        candidateConcepts: concepts.map((concept) => ({ id: concept.id, title: concept.title }))
      }, null, 2));
    }
    await prisma.$disconnect();
    return;
  }

  let linked = 0;
  let createdConcepts = 0;
  let skippedForNewConceptCap = 0;
  for (const question of questions) {
    const concepts = await getCandidateConcepts(question);
    const decision = await requestConceptDecision(question, concepts, model);
    const wouldCreate = decision.createNewConcept && !decision.useExistingConceptId;

    if (write && wouldCreate && createdConcepts >= maxNewConcepts) {
      skippedForNewConceptCap += 1;
      console.log(JSON.stringify({
        questionId: question.id,
        verificationPath: buildVerificationPath(question),
        skipped: true,
        reason: "max-new-concepts reached",
        proposedConceptTitle: decision.conceptTitle
      }, null, 2));
      continue;
    }

    let conceptId = decision.useExistingConceptId;
    if (write) {
      conceptId = await writeDecision(question, decision);
      linked += 1;
      if (wouldCreate) createdConcepts += 1;
    }

    console.log(JSON.stringify({
      questionId: question.id,
      verificationPath: buildVerificationPath(question),
      conceptId,
      createNewConcept: decision.createNewConcept,
      conceptTitle: decision.conceptTitle,
      confidence: decision.confidence,
      needsReview: decision.needsReview,
      write
    }, null, 2));

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  console.log(JSON.stringify({ done: true, linked, createdConcepts, skippedForNewConceptCap, write }, null, 2));
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
