import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import Database from "better-sqlite3";
import { Prisma, PrismaClient, QuestionFormat, QuestionKind, SchoolLevel } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

loadDotenv({ path: ".env.local", override: false, quiet: true });

const SQLITE_FILES = [
  ".cache/osti-science-bowl/osti-ms-all-sets.sqlite",
  ".cache/osti-science-bowl/osti-hs-all-sets.sqlite"
];

const SOURCE_PROVIDER = "U.S. DOE Office of Science / National Science Bowl";

type SqliteQuestion = {
  id: string;
  competitionId: string;
  levelId: string | null;
  category: string;
  level: string;
  difficulty: "FOUNDATIONAL" | "INTERMEDIATE" | "ADVANCED";
  format: "MULTIPLE_CHOICE" | "SHORT_ANSWER";
  questionKind: "PRACTICE" | "TOSSUP" | "BONUS" | "REVIEW";
  schoolLevel: "MIDDLE_SCHOOL" | "HIGH_SCHOOL" | "MIXED" | null;
  sourceProvider: string | null;
  sourcePageUrl: string | null;
  sourcePdfUrl: string | null;
  sourceSet: string | null;
  sourceRound: string | null;
  sourceQuestionNumber: number | null;
  sourceHash: string | null;
  prompt: string;
  choices: string | null;
  correctAnswer: string;
  alternateAnswers: string | null;
  explanation: string | null;
};

type SqliteAnswer = {
  id: string;
  questionId: string;
  text: string;
  isCorrect: 0 | 1;
  explanation: string | null;
  position: number;
};

function buildPostgresUrlFromParts() {
  const host = process.env.POSTGRES_HOST;
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const database = process.env.POSTGRES_DATABASE;

  if (!host || !user || !password || !database) {
    return undefined;
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:5432/${database}?sslmode=require`;
}

function getDatabaseUrl() {
  return (
    process.env.DIRECT_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    buildPostgresUrlFromParts()
  );
}

function parseJsonArray(value: string | null): string[] | undefined {
  if (!value) return undefined;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map((item) => requiredText(String(item))) : undefined;
  } catch {
    return undefined;
  }
}

function cleanText(value: string | null | undefined) {
  return value?.replace(/\u0000/g, "").trim() ?? null;
}

function requiredText(value: string) {
  return cleanText(value) ?? "";
}

function mapQuestionKind(value: SqliteQuestion["questionKind"]) {
  if (value === "BONUS") return QuestionKind.BONUS;
  if (value === "REVIEW") return QuestionKind.REVIEW;
  if (value === "PRACTICE") return QuestionKind.PRACTICE;
  return QuestionKind.TOSSUP;
}

function mapQuestionFormat(value: SqliteQuestion["format"]) {
  return value === "MULTIPLE_CHOICE" ? QuestionFormat.MULTIPLE_CHOICE : QuestionFormat.SHORT_ANSWER;
}

function mapSchoolLevel(value: SqliteQuestion["schoolLevel"] | null) {
  if (value === "HIGH_SCHOOL") return SchoolLevel.HIGH_SCHOOL;
  if (value === "MIXED") return SchoolLevel.MIXED;
  return SchoolLevel.MIDDLE_SCHOOL;
}

function levelIdFor(question: SqliteQuestion) {
  if (question.schoolLevel === "HIGH_SCHOOL") return "science-bowl-high-school";
  if (question.schoolLevel === "MIXED") return "science-bowl-mixed-bowl-prep";
  return "science-bowl-middle-school";
}

function explanationFor(question: SqliteQuestion) {
  const sourceExplanation = cleanText(question.explanation);
  if (sourceExplanation) return sourceExplanation;
  return `The official sample answer is ${requiredText(question.correctAnswer)}. The source packet does not include a worked explanation for this item.`;
}

async function ensureScienceBowl(prisma: PrismaClient) {
  await prisma.competition.upsert({
    where: { slug: "science-bowl" },
    update: {
      name: "Science Bowl",
      description: "Science Bowl preparation with real-format toss-up and bonus questions.",
      shortDescription: "Real-format Science Bowl practice.",
      subdomain: "science-bowl",
      categories: ["Biology", "Chemistry", "Physics", "Math", "Earth & Space", "Energy"]
    },
    create: {
      id: "science-bowl",
      slug: "science-bowl",
      name: "Science Bowl",
      description: "Science Bowl preparation with real-format toss-up and bonus questions.",
      shortDescription: "Real-format Science Bowl practice.",
      subdomain: "science-bowl",
      categories: ["Biology", "Chemistry", "Physics", "Math", "Earth & Space", "Energy"]
    }
  });

  const levels = [
    {
      id: "science-bowl-middle-school",
      slug: "middle-school",
      name: "Middle School",
      description: "Science Bowl preparation for grades 6-8.",
      schoolLevel: SchoolLevel.MIDDLE_SCHOOL,
      sortOrder: 10
    },
    {
      id: "science-bowl-high-school",
      slug: "high-school",
      name: "High School",
      description: "Science Bowl preparation for grades 9-12.",
      schoolLevel: SchoolLevel.HIGH_SCHOOL,
      sortOrder: 20
    },
    {
      id: "science-bowl-mixed-bowl-prep",
      slug: "mixed-bowl-prep",
      name: "Mixed Bowl Prep",
      description: "Science Bowl lessons that apply across middle and high school prep.",
      schoolLevel: SchoolLevel.MIXED,
      sortOrder: 30
    }
  ];

  for (const level of levels) {
    await prisma.competitionLevel.upsert({
      where: {
        competitionId_slug: {
          competitionId: "science-bowl",
          slug: level.slug
        }
      },
      update: level,
      create: {
        ...level,
        competitionId: "science-bowl"
      }
    });
  }
}

async function deletePlaceholderPractice(prisma: PrismaClient) {
  const result = await prisma.question.deleteMany({
    where: {
      questionKind: QuestionKind.PRACTICE,
      OR: [{ sourceProvider: "MedalMinds Original" }, { sourceSet: "MVP Sample Content" }]
    }
  });

  return result.count;
}

async function deleteExistingOstiQuestions(prisma: PrismaClient) {
  const result = await prisma.question.deleteMany({
    where: {
      competitionId: "science-bowl",
      sourceProvider: SOURCE_PROVIDER
    }
  });

  return result.count;
}

async function createManyInBatches<T>(items: T[], batchSize: number, createMany: (batch: T[]) => Promise<{ count: number }>) {
  let created = 0;

  for (let index = 0; index < items.length; index += batchSize) {
    const batch = items.slice(index, index + batchSize);
    const result = await createMany(batch);
    created += result.count;
  }

  return created;
}

async function importSqliteFile(prisma: PrismaClient, sqlitePath: string) {
  const db = new Database(sqlitePath, { readonly: true });
  const questions = db.prepare("select * from question order by id").all() as SqliteQuestion[];
  const questionRows: Prisma.QuestionCreateManyInput[] = [];
  const answerRows: Prisma.AnswerCreateManyInput[] = [];
  const explanationRows: Prisma.AnswerExplanationCreateManyInput[] = [];

  for (const question of questions) {
    const answers = db.prepare("select * from answer where questionId = ? order by position").all(question.id) as SqliteAnswer[];
    const explanation = explanationFor(question);

    questionRows.push({
      id: question.id,
      competitionId: "science-bowl",
      levelId: levelIdFor(question),
      category: requiredText(question.category),
      level: requiredText(question.level),
      difficulty: question.difficulty,
      format: mapQuestionFormat(question.format),
      questionKind: mapQuestionKind(question.questionKind),
      schoolLevel: mapSchoolLevel(question.schoolLevel),
      sourceProvider: cleanText(question.sourceProvider) ?? SOURCE_PROVIDER,
      sourcePageUrl: cleanText(question.sourcePageUrl),
      sourcePdfUrl: cleanText(question.sourcePdfUrl),
      sourceSet: cleanText(question.sourceSet),
      sourceRound: cleanText(question.sourceRound),
      sourceQuestionNumber: question.sourceQuestionNumber,
      sourceHash: question.sourceHash,
      prompt: requiredText(question.prompt),
      choices: parseJsonArray(question.choices) ?? Prisma.JsonNull,
      correctAnswer: requiredText(question.correctAnswer),
      alternateAnswers: parseJsonArray(question.alternateAnswers) ?? [],
      explanation
    });

    answerRows.push(
      ...answers.map((answer) => ({
        id: answer.id,
        questionId: question.id,
        text: requiredText(answer.text),
        isCorrect: Boolean(answer.isCorrect),
        explanation: cleanText(answer.explanation),
        position: answer.position
      }))
    );

    explanationRows.push({
        id: `${question.id}-explanation-0`,
        questionId: question.id,
        shortExplanation: explanation,
        position: 0
    });
  }

  db.close();

  const questionsImported = await createManyInBatches(questionRows, 750, (batch) =>
    prisma.question.createMany({ data: batch, skipDuplicates: true })
  );
  const answersImported = await createManyInBatches(answerRows, 1500, (batch) =>
    prisma.answer.createMany({ data: batch, skipDuplicates: true })
  );
  const explanationsImported = await createManyInBatches(explanationRows, 1500, (batch) =>
    prisma.answerExplanation.createMany({ data: batch, skipDuplicates: true })
  );

  return {
    questionsImported,
    answersImported,
    explanationsImported
  };
}

async function main() {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) {
    throw new Error("Set DATABASE_URL, POSTGRES_URL_NON_POOLING, POSTGRES_PRISMA_URL, POSTGRES_URL, or Postgres parts before importing.");
  }

  const poolOptions: ConstructorParameters<typeof Pool>[0] = { connectionString: databaseUrl };
  if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
    poolOptions.ssl = { rejectUnauthorized: false };
  }

  const pool = new Pool(poolOptions);
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    await ensureScienceBowl(prisma);
    const deletedPractice = await deletePlaceholderPractice(prisma);
    const deletedOsti = await deleteExistingOstiQuestions(prisma);
    const results = [];

    for (const sqlitePath of SQLITE_FILES) {
      results.push({ sqlitePath, ...(await importSqliteFile(prisma, sqlitePath)) });
    }

    const [questionCount, answerCount, explanationCount] = await Promise.all([
      prisma.question.count({ where: { competitionId: "science-bowl" } }),
      prisma.answer.count({ where: { question: { competitionId: "science-bowl" } } }),
      prisma.answerExplanation.count({ where: { question: { competitionId: "science-bowl" } } })
    ]);

    console.log(JSON.stringify({ deletedPractice, deletedOsti, results, questionCount, answerCount, explanationCount }, null, 2));
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
