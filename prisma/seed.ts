import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadDotenv } from "dotenv";
import { Difficulty, PrismaClient, SchoolLevel } from "@prisma/client";
import { Pool } from "pg";
import { buzzerQuestions } from "../src/data/buzzerQuestions";
import { competitions } from "../src/data/competitions";
import { lessons } from "../src/data/lessons";
import { tests } from "../src/data/tests";

loadDotenv({ path: ".env.local", override: false, quiet: true });

const urlFromParts =
  process.env.POSTGRES_HOST &&
  process.env.POSTGRES_USER &&
  process.env.POSTGRES_PASSWORD &&
  process.env.POSTGRES_DATABASE
    ? `postgresql://${encodeURIComponent(process.env.POSTGRES_USER)}:${encodeURIComponent(process.env.POSTGRES_PASSWORD)}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?sslmode=require`
    : undefined;

const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING ??
  urlFromParts;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const competitionLevels = [
  {
    id: "science-bowl-middle-school",
    competitionId: "science-bowl",
    slug: "middle-school",
    name: "Middle School",
    description: "Science Bowl preparation for grades 6-8.",
    schoolLevel: SchoolLevel.MIDDLE_SCHOOL,
    sortOrder: 10
  },
  {
    id: "science-bowl-high-school",
    competitionId: "science-bowl",
    slug: "high-school",
    name: "High School",
    description: "Science Bowl preparation for grades 9-12.",
    schoolLevel: SchoolLevel.HIGH_SCHOOL,
    sortOrder: 20
  },
  {
    id: "science-bowl-mixed-bowl-prep",
    competitionId: "science-bowl",
    slug: "mixed-bowl-prep",
    name: "Mixed Bowl Prep",
    description: "Science Bowl lessons that apply across middle and high school prep.",
    schoolLevel: SchoolLevel.MIXED,
    sortOrder: 30
  },
  {
    id: "science-olympiad-division-b",
    competitionId: "science-olympiad",
    slug: "division-b",
    name: "Division B",
    description: "Science Olympiad middle school division preparation.",
    schoolLevel: SchoolLevel.MIDDLE_SCHOOL,
    sortOrder: 10
  },
  {
    id: "science-olympiad-division-c",
    competitionId: "science-olympiad",
    slug: "division-c",
    name: "Division C",
    description: "Science Olympiad high school division preparation.",
    schoolLevel: SchoolLevel.HIGH_SCHOOL,
    sortOrder: 20
  },
  {
    id: "science-olympiad-event-foundation",
    competitionId: "science-olympiad",
    slug: "event-foundation",
    name: "Event Foundation",
    description: "Science Olympiad event-based conceptual foundation.",
    schoolLevel: SchoolLevel.MIXED,
    sortOrder: 30
  },
  {
    id: "math-olympiad-intro-olympiad",
    competitionId: "math-olympiad",
    slug: "intro-olympiad",
    name: "Intro Olympiad",
    description: "Entry-level olympiad problem-solving preparation.",
    schoolLevel: SchoolLevel.MIXED,
    sortOrder: 10
  },
  {
    id: "math-olympiad-olympiad-builder",
    competitionId: "math-olympiad",
    slug: "olympiad-builder",
    name: "Olympiad Builder",
    description: "Intermediate olympiad problem-solving preparation.",
    schoolLevel: SchoolLevel.MIXED,
    sortOrder: 20
  }
];

const competitionLevelIds = new Set(competitionLevels.map((level) => level.id));

function toDbDifficulty(difficulty: string) {
  if (difficulty === "Foundational") return Difficulty.FOUNDATIONAL;
  if (difficulty === "Advanced") return Difficulty.ADVANCED;
  return Difficulty.INTERMEDIATE;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function competitionLevelIdFor(competitionSlug: string, level: string) {
  const id = `${competitionSlug}-${slugify(level)}`;
  return competitionLevelIds.has(id) ? id : undefined;
}

function scienceBowlCategoryAliases(categories: string[], title: string) {
  const aliases = new Set<string>();
  const normalizedTitle = title.toLowerCase();
  let titleSpecific = false;

  function add(...values: string[]) {
    values.forEach((value) => aliases.add(value));
  }

  function addAllCategories() {
    add(
      "Astronomy",
      "Biology",
      "Chemistry",
      "Earth & Space Science",
      "Earth Science",
      "Energy",
      "General Science",
      "Life Science",
      "Math",
      "Physical Science",
      "Physics"
    );
  }

  if (normalizedTitle.includes("mixed") || normalizedTitle.includes("balance") || normalizedTitle.includes("endurance")) {
    addAllCategories();
    titleSpecific = true;
  }

  if (normalizedTitle.includes("recall")) {
    addAllCategories();
    titleSpecific = true;
  }

  if (normalizedTitle.includes("biology")) {
    add("Biology", "Life Science");
    titleSpecific = true;
  }
  if (normalizedTitle.includes("chemistry")) {
    add("Chemistry");
    titleSpecific = true;
  }
  if (normalizedTitle.includes("physics")) {
    add("Physics", "Physical Science");
    titleSpecific = true;
  }
  if (normalizedTitle.includes("earth") || normalizedTitle.includes("space")) {
    add("Earth & Space Science", "Earth Science", "Astronomy");
    titleSpecific = true;
  }
  if (normalizedTitle.includes("energy")) {
    add("Energy");
    titleSpecific = true;
  }
  if (normalizedTitle.includes("math")) {
    add("Math");
    titleSpecific = true;
  }

  if (!titleSpecific) {
    for (const category of categories) {
      if (category === "Biology") add("Biology", "Life Science");
      else if (category === "Chemistry") add("Chemistry");
      else if (category === "Physics") add("Physics", "Physical Science");
      else if (category === "Earth & Space") add("Earth & Space Science", "Earth Science", "Astronomy");
      else if (category === "Energy") add("Energy");
      else if (category === "Math") add("Math");
      else add(category);
    }
  }

  return Array.from(aliases);
}

function scienceBowlSchoolLevelForTitle(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("high school")) return SchoolLevel.HIGH_SCHOOL;
  if (normalized.includes("middle school")) return SchoolLevel.MIDDLE_SCHOOL;
  return undefined;
}

async function getQuestionIdsForTest(test: (typeof tests)[number]) {
  if (test.competitionSlug !== "science-bowl") {
    const existingQuestionIds = new Set(
      (
        await prisma.question.findMany({
          where: { id: { in: test.questionIds } },
          select: { id: true }
        })
      ).map((question) => question.id)
    );

    return test.questionIds.filter((questionId) => existingQuestionIds.has(questionId));
  }

  const match = test.id.match(/-(\d+)$/);
  const testNumber = match ? Number(match[1]) : 1;
  const take = Math.max(test.questionIds.length, 8);
  const categories = scienceBowlCategoryAliases(test.categories, test.title);
  const schoolLevel = scienceBowlSchoolLevelForTitle(test.title);

  const questions = await prisma.question.findMany({
    where: {
      competitionId: "science-bowl",
      category: { in: categories },
      ...(schoolLevel ? { schoolLevel } : {}),
      OR: [
        { format: "MULTIPLE_CHOICE" },
        { format: "SHORT_ANSWER" }
      ]
    },
    orderBy: [
      { sourceSet: "asc" },
      { sourceRound: "asc" },
      { sourceQuestionNumber: "asc" },
      { id: "asc" }
    ],
    skip: (testNumber - 1) * take,
    take: take * 4,
    include: {
      answers: {
        orderBy: { position: "asc" },
        select: { text: true }
      }
    }
  });

  return questions
    .filter(
      (question) =>
        question.format === "SHORT_ANSWER" ||
        (question.answers.length === 4 && question.answers.every((answer) => !/answer\s*:/i.test(answer.text)))
    )
    .slice(0, take)
    .map((question) => question.id);
}

async function main() {
  for (const competition of competitions) {
    await prisma.competition.upsert({
      where: { slug: competition.slug },
      update: {
        name: competition.name,
        description: competition.description,
        shortDescription: competition.shortDescription,
        subdomain: competition.subdomain,
        categories: competition.categories
      },
      create: {
        id: competition.slug,
        slug: competition.slug,
        name: competition.name,
        description: competition.description,
        shortDescription: competition.shortDescription,
        subdomain: competition.subdomain,
        categories: competition.categories
      }
    });
  }

  for (const level of competitionLevels) {
    await prisma.competitionLevel.upsert({
      where: {
        competitionId_slug: {
          competitionId: level.competitionId,
          slug: level.slug
        }
      },
      update: {
        id: level.id,
        name: level.name,
        description: level.description,
        schoolLevel: level.schoolLevel,
        sortOrder: level.sortOrder
      },
      create: level
    });
  }

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: {
        competitionId_slug: {
          competitionId: lesson.competitionSlug,
          slug: lesson.slug
        }
      },
      update: {
        id: lesson.id,
        levelId: competitionLevelIdFor(lesson.competitionSlug, lesson.level),
        title: lesson.title,
        category: lesson.category,
        level: lesson.level,
        estimatedMinutes: lesson.estimatedMinutes,
        summary: lesson.summary,
        keyConcepts: lesson.keyConcepts,
        contentSections: lesson.contentSections,
        reviewQuestions: lesson.reviewQuestions
      },
      create: {
        id: lesson.id,
        competitionId: lesson.competitionSlug,
        levelId: competitionLevelIdFor(lesson.competitionSlug, lesson.level),
        slug: lesson.slug,
        title: lesson.title,
        category: lesson.category,
        level: lesson.level,
        estimatedMinutes: lesson.estimatedMinutes,
        summary: lesson.summary,
        keyConcepts: lesson.keyConcepts,
        contentSections: lesson.contentSections,
        reviewQuestions: lesson.reviewQuestions
      }
    });
  }

  for (const test of tests) {
    await prisma.test.upsert({
      where: {
        competitionId_slug: {
          competitionId: test.competitionSlug,
          slug: test.slug
        }
      },
      update: {
        id: test.id,
        levelId: competitionLevelIdFor(test.competitionSlug, test.level),
        title: test.title,
        level: test.level,
        categories: test.categories,
        timeLimitMinutes: test.timeLimitMinutes,
        description: test.description
      },
      create: {
        id: test.id,
        competitionId: test.competitionSlug,
        levelId: competitionLevelIdFor(test.competitionSlug, test.level),
        slug: test.slug,
        title: test.title,
        level: test.level,
        categories: test.categories,
        timeLimitMinutes: test.timeLimitMinutes,
        description: test.description
      }
    });

    await prisma.testQuestion.deleteMany({ where: { testId: test.id } });

    const linkedQuestionIds = await getQuestionIdsForTest(test);

    for (const [position, questionId] of linkedQuestionIds.entries()) {
      await prisma.testQuestion.create({
        data: {
          testId: test.id,
          questionId,
          position
        }
      });
    }
  }

  for (const question of buzzerQuestions) {
    await prisma.buzzerQuestion.upsert({
      where: { id: question.id },
      update: {
        competitionId: question.competitionSlug,
        category: question.category,
        difficulty: toDbDifficulty(question.difficulty),
        tossupPrompt: question.tossupPrompt,
        tossupAnswer: question.tossupAnswer,
        tossupExplanation: question.tossupExplanation,
        bonusPrompt: question.bonusPrompt,
        bonusAnswer: question.bonusAnswer,
        bonusExplanation: question.bonusExplanation
      },
      create: {
        id: question.id,
        competitionId: question.competitionSlug,
        category: question.category,
        difficulty: toDbDifficulty(question.difficulty),
        tossupPrompt: question.tossupPrompt,
        tossupAnswer: question.tossupAnswer,
        tossupExplanation: question.tossupExplanation,
        bonusPrompt: question.bonusPrompt,
        bonusAnswer: question.bonusAnswer,
        bonusExplanation: question.bonusExplanation
      }
    });
  }

  const counts = await Promise.all([
    prisma.competition.count(),
    prisma.competitionLevel.count(),
    prisma.question.count(),
    prisma.answer.count(),
    prisma.lesson.count(),
    prisma.test.count(),
    prisma.buzzerQuestion.count()
  ]);

  console.log(
    `Seed complete: ${counts[0]} competitions, ${counts[1]} competition levels, ${counts[2]} questions, ${counts[3]} answers, ${counts[4]} lessons, ${counts[5]} tests, ${counts[6]} buzzer questions.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
