import { PrismaPg } from "@prisma/adapter-pg";
import { createHash } from "node:crypto";
import { Difficulty, PrismaClient, QuestionFormat, QuestionKind, SchoolLevel } from "@prisma/client";
import { Pool } from "pg";
import { buzzerQuestions } from "../src/data/buzzerQuestions";
import { competitions } from "../src/data/competitions";
import { lessons } from "../src/data/lessons";
import { practiceQuestions } from "../src/data/practiceQuestions";
import { tests } from "../src/data/tests";

const databaseUrl =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

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

function toDbQuestionFormat(type: string) {
  return type === "multiple_choice" ? QuestionFormat.MULTIPLE_CHOICE : QuestionFormat.SHORT_ANSWER;
}

function toSchoolLevel(level: string) {
  const normalized = level.toLowerCase();
  if (normalized.includes("middle") || normalized.includes("division b")) return SchoolLevel.MIDDLE_SCHOOL;
  if (normalized.includes("high") || normalized.includes("division c")) return SchoolLevel.HIGH_SCHOOL;
  return SchoolLevel.MIXED;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function competitionLevelIdFor(competitionSlug: string, level: string) {
  const id = `${competitionSlug}-${slugify(level)}`;
  return competitionLevelIds.has(id) ? id : undefined;
}

function sourceHashForQuestion(question: (typeof practiceQuestions)[number]) {
  return createHash("sha256")
    .update(`${question.competitionSlug}|${question.category}|${question.prompt}|${question.correctAnswer}`)
    .digest("hex");
}

function answerRowsForQuestion(question: (typeof practiceQuestions)[number]) {
  const seen = new Set<string>();
  const answers: Array<{ text: string; isCorrect: boolean; explanation?: string; position: number }> = [];

  function addAnswer(text: string, isCorrect: boolean, position: number) {
    const normalized = text.trim().toLowerCase();
    if (seen.has(normalized)) return;
    seen.add(normalized);
    answers.push({
      text,
      isCorrect,
      explanation: isCorrect ? question.explanation : undefined,
      position
    });
  }

  addAnswer(question.correctAnswer, true, 0);
  question.alternateAnswers?.forEach((answer, index) => addAnswer(answer, true, index + 1));
  question.choices?.forEach((choice, index) => addAnswer(choice, choice === question.correctAnswer, index + 100));

  return answers;
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

  for (const question of practiceQuestions) {
    await prisma.question.upsert({
      where: { id: question.id },
      update: {
        competitionId: question.competitionSlug,
        levelId: competitionLevelIdFor(question.competitionSlug, question.level),
        category: question.category,
        level: question.level,
        difficulty: toDbDifficulty(question.difficulty),
        format: toDbQuestionFormat(question.type),
        questionKind: QuestionKind.PRACTICE,
        schoolLevel: toSchoolLevel(question.level),
        sourceProvider: "MedalMinds Original",
        sourcePageUrl: undefined,
        sourcePdfUrl: undefined,
        sourceSet: "MVP Sample Content",
        sourceRound: undefined,
        sourceQuestionNumber: Number(question.id.match(/\d+$/)?.[0] ?? 0) || undefined,
        sourceHash: sourceHashForQuestion(question),
        prompt: question.prompt,
        choices: question.choices ?? undefined,
        correctAnswer: question.correctAnswer,
        alternateAnswers: question.alternateAnswers ?? [],
        explanation: question.explanation
      },
      create: {
        id: question.id,
        competitionId: question.competitionSlug,
        levelId: competitionLevelIdFor(question.competitionSlug, question.level),
        category: question.category,
        level: question.level,
        difficulty: toDbDifficulty(question.difficulty),
        format: toDbQuestionFormat(question.type),
        questionKind: QuestionKind.PRACTICE,
        schoolLevel: toSchoolLevel(question.level),
        sourceProvider: "MedalMinds Original",
        sourcePageUrl: undefined,
        sourcePdfUrl: undefined,
        sourceSet: "MVP Sample Content",
        sourceRound: undefined,
        sourceQuestionNumber: Number(question.id.match(/\d+$/)?.[0] ?? 0) || undefined,
        sourceHash: sourceHashForQuestion(question),
        prompt: question.prompt,
        choices: question.choices ?? undefined,
        correctAnswer: question.correctAnswer,
        alternateAnswers: question.alternateAnswers ?? [],
        explanation: question.explanation
      }
    });

    await prisma.answer.deleteMany({ where: { questionId: question.id } });
    await prisma.answerExplanation.deleteMany({ where: { questionId: question.id } });

    for (const answer of answerRowsForQuestion(question)) {
      await prisma.answer.create({
        data: {
          id: `${question.id}-answer-${answer.position}`,
          questionId: question.id,
          text: answer.text,
          isCorrect: answer.isCorrect,
          explanation: answer.explanation,
          position: answer.position
        }
      });
    }

    await prisma.answerExplanation.create({
      data: {
        id: `${question.id}-explanation-0`,
        questionId: question.id,
        shortExplanation: question.explanation,
        position: 0
      }
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

    for (const [position, questionId] of test.questionIds.entries()) {
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
