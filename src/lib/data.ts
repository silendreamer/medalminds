import { Difficulty, type Prisma } from "@prisma/client";
import { buzzerQuestions as localBuzzerQuestions } from "@/data/buzzerQuestions";
import { competitions as localCompetitions } from "@/data/competitions";
import { lessons as localLessons } from "@/data/lessons";
import { practiceQuestions as localPracticeQuestions } from "@/data/practiceQuestions";
import { tests as localTests } from "@/data/tests";
import type { CompetitionSlug, Lesson, PracticeQuestion, Test } from "@/types";
import { getPrisma, hasDatabaseUrl } from "./db";

type DbLesson = Prisma.LessonGetPayload<Record<string, never>>;
type DbPracticeQuestion = Prisma.PracticeQuestionGetPayload<{
  include: { answers: { orderBy: { position: "asc" } } };
}>;
type DbTestWithQuestions = Prisma.TestGetPayload<{
  include: {
    questions: {
      orderBy: { position: "asc" };
      include: {
        question: {
          include: { answers: { orderBy: { position: "asc" } } };
        };
      };
    };
  };
}>;
type DbBuzzerQuestion = Prisma.BuzzerQuestionGetPayload<Record<string, never>>;

function fromDbDifficulty(difficulty: Difficulty | string): PracticeQuestion["difficulty"] {
  if (difficulty === Difficulty.FOUNDATIONAL || difficulty === "FOUNDATIONAL") return "Foundational";
  if (difficulty === Difficulty.ADVANCED || difficulty === "ADVANCED") return "Advanced";
  return "Intermediate";
}

function toPracticeQuestion(question: DbPracticeQuestion): PracticeQuestion {
  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
  const primaryCorrectAnswer = correctAnswers[0]?.text ?? question.correctAnswer;
  const alternateAnswers = correctAnswers.slice(1).map((answer) => answer.text);
  const answerChoices = question.answers.map((answer) => answer.text);

  return {
    id: question.id,
    competitionSlug: question.competitionId as CompetitionSlug,
    category: question.category,
    level: question.level,
    difficulty: fromDbDifficulty(question.difficulty),
    type: question.type as PracticeQuestion["type"],
    prompt: question.prompt,
    choices:
      question.type === "multiple_choice"
        ? answerChoices.length
          ? answerChoices
          : Array.isArray(question.choices)
            ? question.choices.map(String)
            : undefined
        : undefined,
    correctAnswer: primaryCorrectAnswer,
    alternateAnswers: alternateAnswers.length ? alternateAnswers : question.alternateAnswers.length ? question.alternateAnswers : undefined,
    explanation: question.explanation
  };
}

function toLesson(lesson: DbLesson): Lesson {
  return {
    id: lesson.id,
    slug: lesson.slug,
    competitionSlug: lesson.competitionId as CompetitionSlug,
    title: lesson.title,
    category: lesson.category,
    level: lesson.level,
    estimatedMinutes: lesson.estimatedMinutes,
    summary: lesson.summary,
    keyConcepts: lesson.keyConcepts,
    contentSections: lesson.contentSections as Lesson["contentSections"],
    reviewQuestions: lesson.reviewQuestions
  };
}

function toTest(test: DbTestWithQuestions): Test {
  return {
    id: test.id,
    slug: test.slug,
    competitionSlug: test.competitionId as CompetitionSlug,
    title: test.title,
    level: test.level,
    categories: test.categories,
    timeLimitMinutes: test.timeLimitMinutes,
    description: test.description,
    questionIds: test.questions.map((question) => question.questionId)
  };
}

function toBuzzerQuestion(question: DbBuzzerQuestion) {
  return {
    id: question.id,
    competitionSlug: question.competitionId as "science-bowl",
    category: question.category,
    difficulty: fromDbDifficulty(question.difficulty),
    tossupPrompt: question.tossupPrompt,
    tossupAnswer: question.tossupAnswer,
    tossupExplanation: question.tossupExplanation,
    bonusPrompt: question.bonusPrompt,
    bonusAnswer: question.bonusAnswer,
    bonusExplanation: question.bonusExplanation
  };
}

function isDbEnabled() {
  return hasDatabaseUrl;
}

export async function getCompetitions() {
  if (!isDbEnabled()) return localCompetitions;

  const prisma = getPrisma();
  return prisma.competition.findMany({
    orderBy: { slug: "asc" }
  });
}

export async function getCompetitionBySlug(slug: string) {
  if (!isDbEnabled()) {
    return localCompetitions.find((competition) => competition.slug === slug);
  }

  return getPrisma().competition.findUnique({ where: { slug } });
}

export function isCompetitionSlug(slug: string): slug is CompetitionSlug {
  return localCompetitions.some((competition) => competition.slug === slug);
}

export async function getQuestionsByCompetition(slug: CompetitionSlug) {
  if (!isDbEnabled()) {
    return localPracticeQuestions.filter((question) => question.competitionSlug === slug);
  }

  const questions = await getPrisma().practiceQuestion.findMany({
    where: { competition: { slug } },
    orderBy: { id: "asc" },
    include: { answers: { orderBy: { position: "asc" } } }
  });

  return questions.map(toPracticeQuestion);
}

export async function getLessonsByCompetition(slug: CompetitionSlug) {
  if (!isDbEnabled()) {
    return localLessons.filter((lesson) => lesson.competitionSlug === slug);
  }

  const lessons = await getPrisma().lesson.findMany({
    where: { competition: { slug } },
    orderBy: { id: "asc" }
  });

  return lessons.map(toLesson);
}

export async function getTestsByCompetition(slug: CompetitionSlug) {
  if (!isDbEnabled()) {
    return localTests.filter((test) => test.competitionSlug === slug);
  }

  const tests = await getPrisma().test.findMany({
    where: { competition: { slug } },
    orderBy: { id: "asc" },
    include: {
      questions: {
        orderBy: { position: "asc" },
        include: {
          question: {
            include: { answers: { orderBy: { position: "asc" } } }
          }
        }
      }
    }
  });

  return tests.map(toTest);
}

export async function getLessonBySlug(slug: CompetitionSlug, lessonSlug: string) {
  if (!isDbEnabled()) {
    return localLessons.find((lesson) => lesson.competitionSlug === slug && lesson.slug === lessonSlug);
  }

  const lesson = await getPrisma().lesson.findFirst({
    where: {
      slug: lessonSlug,
      competition: { slug }
    }
  });

  return lesson ? toLesson(lesson) : undefined;
}

export async function getTestBySlug(slug: CompetitionSlug, testSlug: string) {
  if (!isDbEnabled()) {
    return localTests.find((test) => test.competitionSlug === slug && test.slug === testSlug);
  }

  const test = await getPrisma().test.findFirst({
    where: {
      slug: testSlug,
      competition: { slug }
    },
    include: {
      questions: {
        orderBy: { position: "asc" },
        include: {
          question: {
            include: { answers: { orderBy: { position: "asc" } } }
          }
        }
      }
    }
  });

  return test ? toTest(test) : undefined;
}

export async function getQuestionsForTest(questionIds: string[]) {
  if (!isDbEnabled()) {
    return questionIds
      .map((id) => localPracticeQuestions.find((question) => question.id === id))
      .filter((question): question is NonNullable<typeof question> => Boolean(question));
  }

  const questions = await getPrisma().practiceQuestion.findMany({
    where: { id: { in: questionIds } },
    include: { answers: { orderBy: { position: "asc" } } }
  });
  const byId = new Map(questions.map((question) => [question.id, toPracticeQuestion(question)]));

  return questionIds
    .map((id) => byId.get(id))
    .filter((question): question is NonNullable<typeof question> => Boolean(question));
}

export async function getContentCounts(slug: CompetitionSlug) {
  if (!isDbEnabled()) {
    return {
      questions: localPracticeQuestions.filter((question) => question.competitionSlug === slug).length,
      lessons: localLessons.filter((lesson) => lesson.competitionSlug === slug).length,
      tests: localTests.filter((test) => test.competitionSlug === slug).length
    };
  }

  const prisma = getPrisma();
  const competition = await prisma.competition.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (!competition) {
    return { questions: 0, lessons: 0, tests: 0 };
  }

  const [questions, lessons, tests] = await Promise.all([
    prisma.practiceQuestion.count({ where: { competitionId: competition.id } }),
    prisma.lesson.count({ where: { competitionId: competition.id } }),
    prisma.test.count({ where: { competitionId: competition.id } })
  ]);

  return { questions, lessons, tests };
}

export async function getBuzzerQuestions() {
  if (!isDbEnabled()) return localBuzzerQuestions;

  const questions = await getPrisma().buzzerQuestion.findMany({
    where: { competition: { slug: "science-bowl" } },
    orderBy: { id: "asc" }
  });

  return questions.map(toBuzzerQuestion);
}

export const competitions = localCompetitions;
export const lessons = localLessons;
export const practiceQuestions = localPracticeQuestions;
export const tests = localTests;
export const buzzerQuestions = localBuzzerQuestions;
