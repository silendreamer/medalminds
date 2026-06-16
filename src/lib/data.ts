import { Difficulty, Prisma, QuestionFormat } from "@prisma/client";
import { buzzerQuestions as localBuzzerQuestions } from "@/data/buzzerQuestions";
import { competitions as localCompetitions } from "@/data/competitions";
import { lessons as localLessons } from "@/data/lessons";
import { practiceQuestions as localPracticeQuestions } from "@/data/practiceQuestions";
import {
  scienceBowlMiddleSchoolSubjects as staticScienceBowlMiddleSchoolSubjects
} from "@/data/scienceBowlMiddleSchoolCurriculum";
import { tests as localTests } from "@/data/tests";
import type { CompetitionSlug, CurriculumSubject, Lesson, PracticeQuestion, Test } from "@/types";
import { getPrisma, hasDatabaseUrl } from "./db";

export type SchoolLevelFilter = "MIDDLE_SCHOOL" | "HIGH_SCHOOL";

type DbLesson = Prisma.LessonGetPayload<Record<string, never>>;
type DbQuestion = Prisma.QuestionGetPayload<{
  include: {
    answers: { orderBy: { position: "asc" } };
    answerExplanations: { orderBy: { position: "asc" } };
  };
}>;
type DbTestWithQuestions = Prisma.TestGetPayload<{
  include: {
    questions: {
      orderBy: { position: "asc" };
      include: {
        question: {
          include: {
            answers: { orderBy: { position: "asc" } };
            answerExplanations: { orderBy: { position: "asc" } };
          };
        };
      };
    };
  };
}>;
type DbBuzzerQuestion = Prisma.BuzzerQuestionGetPayload<Record<string, never>>;
type DbCurriculumSubject = Prisma.CurriculumSubjectGetPayload<{
  include: {
    grades: {
      orderBy: { sortOrder: "asc" };
      include: {
        units: {
          orderBy: { sortOrder: "asc" };
          include: {
            topics: { orderBy: { sortOrder: "asc" } };
          };
        };
      };
    };
  };
}>;

function fromDbDifficulty(difficulty: Difficulty | string): PracticeQuestion["difficulty"] {
  if (difficulty === Difficulty.FOUNDATIONAL || difficulty === "FOUNDATIONAL") return "Foundational";
  if (difficulty === Difficulty.ADVANCED || difficulty === "ADVANCED") return "Advanced";
  return "Intermediate";
}

function fromDbQuestionFormat(format: QuestionFormat | string): PracticeQuestion["type"] {
  return format === QuestionFormat.MULTIPLE_CHOICE || format === "MULTIPLE_CHOICE"
    ? "multiple_choice"
    : "short_answer";
}

function stripInlineMultipleChoiceOptions(prompt: string, type: PracticeQuestion["type"]) {
  if (type !== "multiple_choice") return prompt;
  const stripped = prompt
    .replace(/\s+W\)\s+[\s\S]*?\s+X\)\s+[\s\S]*?\s+Y\)\s+[\s\S]*?\s+Z\)\s+[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return stripped || prompt;
}

function toPracticeQuestion(question: DbQuestion): PracticeQuestion {
  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
  const primaryCorrectAnswer = correctAnswers[0]?.text ?? question.correctAnswer;
  const alternateAnswers = correctAnswers.slice(1).map((answer) => answer.text);
  const type = fromDbQuestionFormat(question.format);
  const answerChoices = shuffle(question.answers.map((answer) => answer.text));
  const explanation = question.answerExplanations[0]?.shortExplanation ?? question.explanation;

  return {
    id: question.id,
    competitionSlug: question.competitionId as CompetitionSlug,
    category: question.category,
    level: question.level,
    difficulty: fromDbDifficulty(question.difficulty),
    type,
    prompt: stripInlineMultipleChoiceOptions(question.prompt, type),
    choices:
      type === "multiple_choice"
        ? answerChoices.length
          ? answerChoices
          : Array.isArray(question.choices)
            ? question.choices.map(String)
            : undefined
        : undefined,
    correctAnswer: primaryCorrectAnswer,
    alternateAnswers: alternateAnswers.length ? alternateAnswers : question.alternateAnswers.length ? question.alternateAnswers : undefined,
    explanation
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

function toCurriculumSubject(subject: DbCurriculumSubject): CurriculumSubject {
  return {
    id: subject.id,
    slug: subject.slug,
    competitionSlug: subject.competitionId as CompetitionSlug,
    levelId: subject.levelId ?? undefined,
    name: subject.name,
    shortDescription: subject.shortDescription,
    whyItMatters: subject.whyItMatters,
    highYieldTopics: subject.highYieldTopics,
    sources: subject.sources,
    sortOrder: subject.sortOrder,
    grades: subject.grades.map((grade) => ({
      id: grade.id,
      key: grade.key,
      label: grade.label,
      sortOrder: grade.sortOrder,
      units: grade.units.map((unit) => ({
        id: unit.id,
        title: unit.title,
        sortOrder: unit.sortOrder,
        topics: unit.topics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          sortOrder: topic.sortOrder
        }))
      }))
    }))
  };
}

function isDbEnabled() {
  return hasDatabaseUrl;
}

const subjectAliases: Record<string, string[]> = {
  "Biology": ["Biology", "Life Science"],
  "Life Science": ["Life Science", "Biology"],
  "Chemistry": ["Chemistry"],
  "Physical Science": ["Physical Science", "Physics", "Chemistry"],
  "Physics": ["Physics", "Physical Science"],
  "Earth & Space Science": ["Earth & Space Science", "Earth & Space", "Earth Science", "Astronomy"],
  "Earth & Space": ["Earth & Space", "Earth & Space Science", "Earth Science", "Astronomy"],
  "Energy": ["Energy"],
  "Math": ["Math"],
  "Anatomy": ["Anatomy"],
  "Astronomy": ["Astronomy"],
  "Disease Detectives": ["Disease Detectives"],
  "Dynamic Planet": ["Dynamic Planet"],
  "Forensics": ["Forensics"],
  "Machines": ["Machines"],
  "Number Theory": ["Number Theory"],
  "Algebra": ["Algebra"],
  "Geometry": ["Geometry"],
  "Combinatorics": ["Combinatorics"],
  "Probability": ["Probability"],
  "Logic": ["Logic"]
};

function aliasesForSubject(subject?: string | null) {
  if (!subject) return undefined;
  return subjectAliases[subject] ?? [subject];
}

function localQuestionMatchesSubject(question: PracticeQuestion, subject?: string | null) {
  const aliases = aliasesForSubject(subject);
  return !aliases || aliases.includes(question.category);
}

function levelStringMatchesSchoolLevel(level: string, schoolLevel?: SchoolLevelFilter | null) {
  if (!schoolLevel) return true;
  if (schoolLevel === "MIDDLE_SCHOOL") return level.toLowerCase().includes("middle");
  return level.toLowerCase().includes("high");
}

function localQuestionMatchesSchoolLevel(question: PracticeQuestion, schoolLevel?: SchoolLevelFilter | null) {
  return levelStringMatchesSchoolLevel(question.level, schoolLevel);
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function questionWhereForSubject(slug: CompetitionSlug, subject?: string | null, schoolLevel?: SchoolLevelFilter | null) {
  const aliases = aliasesForSubject(subject);
  return {
    competition: { slug },
    ...(aliases ? { category: { in: aliases } } : {}),
    ...(schoolLevel ? { schoolLevel } : {})
  };
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

export async function getScienceBowlMiddleSchoolCurriculumSubjects() {
  if (!isDbEnabled()) {
    return staticScienceBowlMiddleSchoolSubjects.map((subject, subjectIndex) => ({
      id: `static-${subject.slug}`,
      slug: subject.slug,
      competitionSlug: "science-bowl" as const,
      levelId: "science-bowl-middle-school",
      name: subject.name,
      shortDescription: subject.shortDescription,
      whyItMatters: subject.whyItMatters,
      highYieldTopics: subject.highYieldTopics,
      sources: subject.sources,
      sortOrder: subjectIndex,
      grades: subject.grades.map((grade, gradeIndex) => ({
        id: `static-${subject.slug}-${grade.key}`,
        key: grade.key,
        label: grade.label,
        sortOrder: gradeIndex,
        units: grade.units.map((unit, unitIndex) => ({
          id: `static-${subject.slug}-${grade.key}-${unitIndex}`,
          title: unit.title,
          sortOrder: unitIndex,
          topics: unit.topics.map((topic, topicIndex) => ({
            id: `static-${subject.slug}-${grade.key}-${unitIndex}-${topicIndex}`,
            title: topic,
            sortOrder: topicIndex
          }))
        }))
      }))
    }));
  }

  const subjects = await getPrisma().curriculumSubject.findMany({
    where: {
      competitionId: "science-bowl",
      levelId: "science-bowl-middle-school"
    },
    orderBy: { sortOrder: "asc" },
    include: {
      grades: {
        orderBy: { sortOrder: "asc" },
        include: {
          units: {
            orderBy: { sortOrder: "asc" },
            include: {
              topics: { orderBy: { sortOrder: "asc" } }
            }
          }
        }
      }
    }
  });

  return subjects.map(toCurriculumSubject);
}

export async function getScienceBowlMiddleSchoolCurriculumSubjectByName(name?: string | null) {
  const subjects = await getScienceBowlMiddleSchoolCurriculumSubjects();
  if (!name) return undefined;
  const normalized = name.trim().toLowerCase();
  return subjects.find(
    (subject) => subject.name.toLowerCase() === normalized || subject.slug === normalized.replace(/\s+/g, "-")
  );
}

export async function getQuestionsByCompetition(slug: CompetitionSlug) {
  if (!isDbEnabled()) {
    return localPracticeQuestions.filter((question) => question.competitionSlug === slug);
  }

  const questions = await getPrisma().question.findMany({
    where: { competition: { slug } },
    orderBy: { id: "asc" },
    include: {
      answers: { orderBy: { position: "asc" } },
      answerExplanations: { orderBy: { position: "asc" } }
    }
  });

  return questions.map(toPracticeQuestion);
}

export async function getRandomQuestionByCompetition(
  slug: CompetitionSlug,
  subject?: string | null,
  schoolLevel?: SchoolLevelFilter | null
) {
  if (!isDbEnabled()) {
    const questions = localPracticeQuestions.filter(
      (question) =>
        question.competitionSlug === slug &&
        localQuestionMatchesSubject(question, subject) &&
        localQuestionMatchesSchoolLevel(question, schoolLevel)
    );
    return shuffle(questions)[0];
  }

  const questions = await getPrisma().question.findMany({
    where: questionWhereForSubject(slug, subject, schoolLevel),
    take: 250,
    orderBy: { updatedAt: "desc" },
    include: {
      answers: { orderBy: { position: "asc" } },
      answerExplanations: { orderBy: { position: "asc" } }
    }
  });

  return shuffle(questions).map(toPracticeQuestion)[0];
}

export async function getQuestionById(
  slug: CompetitionSlug,
  questionId: string,
  subject?: string | null,
  schoolLevel?: SchoolLevelFilter | null
) {
  if (!isDbEnabled()) {
    return localPracticeQuestions.find(
      (question) =>
        question.id === questionId &&
        question.competitionSlug === slug &&
        localQuestionMatchesSubject(question, subject) &&
        localQuestionMatchesSchoolLevel(question, schoolLevel)
    );
  }

  const question = await getPrisma().question.findFirst({
    where: {
      id: questionId,
      ...questionWhereForSubject(slug, subject, schoolLevel)
    },
    include: {
      answers: { orderBy: { position: "asc" } },
      answerExplanations: { orderBy: { position: "asc" } }
    }
  });

  return question ? toPracticeQuestion(question) : undefined;
}

export async function getRandomMultipleChoiceQuestions(
  slug: CompetitionSlug,
  subject: string | null,
  count: number,
  schoolLevel?: SchoolLevelFilter | null
) {
  if (!isDbEnabled()) {
    return shuffle(
      localPracticeQuestions.filter(
        (question) =>
          question.competitionSlug === slug &&
          question.type === "multiple_choice" &&
          localQuestionMatchesSubject(question, subject) &&
          localQuestionMatchesSchoolLevel(question, schoolLevel)
      )
    ).slice(0, count);
  }

  const aliases = aliasesForSubject(subject);
  const prisma = getPrisma();
  const randomQuestionIds = await prisma.$queryRaw<Array<{ id: string }>>(
    Prisma.sql`
      SELECT q.id
      FROM "Question" q
      INNER JOIN "Competition" c ON c.id = q."competitionId"
      WHERE c.slug = ${slug}
        AND q.format = 'MULTIPLE_CHOICE'
        ${aliases ? Prisma.sql`AND q.category IN (${Prisma.join(aliases)})` : Prisma.empty}
        ${schoolLevel ? Prisma.sql`AND q."schoolLevel" = ${schoolLevel}::"SchoolLevel"` : Prisma.empty}
        AND (
          SELECT count(*)
          FROM "Answer" a
          WHERE a."questionId" = q.id
        ) = 4
      ORDER BY random()
      LIMIT ${count}
    `
  );
  const ids = randomQuestionIds.map((question) => question.id);

  const questions = await prisma.question.findMany({
    where: { id: { in: ids } },
    include: {
      answers: { orderBy: { position: "asc" } },
      answerExplanations: { orderBy: { position: "asc" } }
    }
  });
  const byId = new Map(questions.map((question) => [question.id, toPracticeQuestion(question)]));

  return ids
    .map((id) => byId.get(id))
    .filter((question): question is NonNullable<typeof question> => Boolean(question));
}

export async function getLessonsByCompetition(
  slug: CompetitionSlug,
  subject?: string | null,
  schoolLevel?: SchoolLevelFilter | null
) {
  if (!isDbEnabled()) {
    const aliases = aliasesForSubject(subject);
    return localLessons.filter(
      (lesson) =>
        lesson.competitionSlug === slug &&
        (!aliases || aliases.includes(lesson.category)) &&
        levelStringMatchesSchoolLevel(lesson.level, schoolLevel)
    );
  }

  const aliases = aliasesForSubject(subject);
  const lessons = await getPrisma().lesson.findMany({
    where: {
      competition: { slug },
      ...(aliases ? { category: { in: aliases } } : {}),
      ...(schoolLevel
        ? {
            competitionLevel: {
              schoolLevel: { in: [schoolLevel, "MIXED"] }
            }
          }
        : {})
    },
    orderBy: { id: "asc" }
  });

  return lessons.map(toLesson);
}

export async function getPrimaryConceptLessonForQuestion(questionId: string) {
  if (!isDbEnabled()) return undefined;

  const questionConcept = await getPrisma().questionConcept.findFirst({
    where: {
      questionId,
      isPrimary: true
    },
    orderBy: { position: "asc" },
    include: {
      concept: {
        include: {
          lessons: {
            orderBy: { id: "asc" },
            take: 1
          }
        }
      }
    }
  });
  const lesson = questionConcept?.concept.lessons[0];

  return lesson ? toLesson(lesson) : undefined;
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
            include: {
              answers: { orderBy: { position: "asc" } },
              answerExplanations: { orderBy: { position: "asc" } }
            }
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
            include: {
              answers: { orderBy: { position: "asc" } },
              answerExplanations: { orderBy: { position: "asc" } }
            }
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

  const questions = await getPrisma().question.findMany({
    where: { id: { in: questionIds } },
    include: {
      answers: { orderBy: { position: "asc" } },
      answerExplanations: { orderBy: { position: "asc" } }
    }
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
      lessons: localLessons.filter((lesson) => lesson.competitionSlug === slug).length
    };
  }

  const prisma = getPrisma();
  const competition = await prisma.competition.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (!competition) {
    return { questions: 0, lessons: 0 };
  }

  const [questions, lessons] = await Promise.all([
    prisma.question.count({ where: { competitionId: competition.id } }),
    prisma.lesson.count({ where: { competitionId: competition.id } })
  ]);

  return { questions, lessons };
}

export async function getContentCountsBySchoolLevel(slug: CompetitionSlug, schoolLevel: SchoolLevelFilter) {
  if (!isDbEnabled()) {
    return {
      questions: localPracticeQuestions.filter(
        (question) =>
          question.competitionSlug === slug &&
          localQuestionMatchesSchoolLevel(question, schoolLevel)
      ).length,
      lessons: localLessons.filter(
        (lesson) =>
          lesson.competitionSlug === slug &&
          levelStringMatchesSchoolLevel(lesson.level, schoolLevel)
      ).length
    };
  }

  const prisma = getPrisma();
  const competition = await prisma.competition.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (!competition) {
    return { questions: 0, lessons: 0 };
  }

  const [questions, lessons] = await Promise.all([
    prisma.question.count({
      where: {
        competitionId: competition.id,
        schoolLevel
      }
    }),
    prisma.lesson.count({
      where: {
        competitionId: competition.id,
        competitionLevel: {
          schoolLevel: { in: [schoolLevel, "MIXED"] }
        }
      }
    })
  ]);

  return { questions, lessons };
}

export async function getContentCountsForSubject(
  slug: CompetitionSlug,
  subject: string,
  schoolLevel?: SchoolLevelFilter | null
) {
  const aliases = aliasesForSubject(subject);

  if (!isDbEnabled()) {
    return {
      questions: localPracticeQuestions.filter(
        (question) =>
          question.competitionSlug === slug &&
          localQuestionMatchesSubject(question, subject) &&
          localQuestionMatchesSchoolLevel(question, schoolLevel)
      ).length,
      lessons: localLessons.filter(
        (lesson) =>
          lesson.competitionSlug === slug &&
          (!aliases || aliases.includes(lesson.category)) &&
          levelStringMatchesSchoolLevel(lesson.level, schoolLevel)
      ).length
    };
  }

  const prisma = getPrisma();
  const competition = await prisma.competition.findUnique({
    where: { slug },
    select: { id: true }
  });

  if (!competition) {
    return { questions: 0, lessons: 0 };
  }

  const [questions, lessons] = await Promise.all([
    prisma.question.count({
      where: {
        competitionId: competition.id,
        ...(aliases ? { category: { in: aliases } } : {}),
        ...(schoolLevel ? { schoolLevel } : {})
      }
    }),
    prisma.lesson.count({
      where: {
        competitionId: competition.id,
        ...(aliases ? { category: { in: aliases } } : {}),
        ...(schoolLevel
          ? {
              competitionLevel: {
                schoolLevel: { in: [schoolLevel, "MIXED"] }
              }
            }
          : {})
      }
    })
  ]);

  return { questions, lessons };
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
