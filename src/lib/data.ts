import { unstable_cache } from "next/cache";
import { Difficulty, Prisma, QuestionFormat } from "@prisma/client";
import { buzzerQuestions as localBuzzerQuestions } from "@/data/buzzerQuestions";
import { competitions as localCompetitions } from "@/data/competitions";
import { lessons as localLessons } from "@/data/lessons";
import { practiceQuestions as localPracticeQuestions } from "@/data/practiceQuestions";
import {
  scienceBowlMiddleSchoolSubjects as staticScienceBowlMiddleSchoolSubjects
} from "@/data/scienceBowlMiddleSchoolCurriculum";
import { tests as localTests } from "@/data/tests";
import { getNsbQuestions, getNsbLessons, getNsbLessonContent } from "@/data/nsbQuestions";
import type { CompetitionSlug, CurriculumSubject, Lesson, PracticeQuestion, Test } from "@/types";
import { getPrisma, hasDatabaseUrl } from "./db";

export type SchoolLevelFilter = "MIDDLE_SCHOOL" | "HIGH_SCHOOL";

type DbLesson = Prisma.LessonGetPayload<{
  include: {
    competitionLevel: { select: { name: true } };
  };
}>;
type DbQuestion = Prisma.QuestionGetPayload<{
  include: {
    answers: { include: { mc: true } };
    multipleChoices: { orderBy: { position: "asc" } };
    answerExplanations: { orderBy: { position: "asc" } };
    competitionLevel: { select: { name: true } };
  };
}>;
type DbTestWithQuestions = Prisma.TestGetPayload<{
  include: {
    competitionLevel: { select: { name: true } };
    questions: {
      orderBy: { position: "asc" };
      include: {
        question: {
          include: {
            answers: { include: { mc: true } };
            multipleChoices: { orderBy: { position: "asc" } };
            answerExplanations: { orderBy: { position: "asc" } };
          };
        };
      };
    };
  };
}>;
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
  if (difficulty === Difficulty.FOUNDATIONAL || difficulty === "FOUNDATIONAL") return "EASY";
  if (difficulty === Difficulty.ADVANCED || difficulty === "ADVANCED") return "HARD";
  return "MEDIUM";
}

function fromDbQuestionFormat(format: QuestionFormat | string): PracticeQuestion["type"] {
  return format === QuestionFormat.MULTIPLE_CHOICE || format === "MULTIPLE_CHOICE"
    ? "multiple_choice"
    : "short_answer";
}


function toPracticeQuestion(question: DbQuestion): PracticeQuestion {
  const answer = question.answers[0];
  const primaryCorrectAnswer = answer?.mc?.text ?? answer?.text ?? "";
  const alternateAnswers = question.answers.slice(1).map((a) => a.mc?.text ?? a.text ?? "").filter(Boolean);
  const type = fromDbQuestionFormat(question.format);
  const answerChoices = shuffle(question.multipleChoices.map((mc) => mc.text));
  const explanation = question.answerExplanations[0]?.shortExplanation ?? question.explanation;

  return {
    id: question.id,
    competitionSlug: question.competitionId as CompetitionSlug,
    subject: question.category,
    level: question.competitionLevel?.name ?? "",
    difficulty: fromDbDifficulty(question.difficulty),
    type,
    prompt: question.prompt,
    choices: type === "multiple_choice" && answerChoices.length ? answerChoices : undefined,
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
    subject: lesson.category,
    level: lesson.competitionLevel?.name ?? "",
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
    level: test.competitionLevel?.name ?? "",
    subjects: test.categories,
    timeLimitMinutes: test.timeLimitMinutes,
    description: test.description,
    questionIds: test.questions.map((question) => question.questionId)
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

const CONTENT_REVALIDATE_SECONDS = 3600;

export function contentTag(slug: string) {
  return `content:${slug}`;
}

// Cache deterministic content reads across requests so hot pages stop hitting
// Postgres on every render. This is a no-op on the local-data path: there is no
// round-trip to amortize, and the unit tests exercise the readers outside the
// Next runtime where `unstable_cache` is unavailable. Bust per-competition
// entries with `revalidateTag(contentTag(slug))` after an admin write.
function cachedContent<T>(load: () => Promise<T>, keyParts: string[], tags: string[]): Promise<T> {
  if (!hasDatabaseUrl) return load();
  return unstable_cache(load, keyParts, { tags, revalidate: CONTENT_REVALIDATE_SECONDS })();
}

function localQuestionMatchesSubject(question: PracticeQuestion, subject?: string | null) {
  return !subject || question.subject === subject;
}

function schoolLevelToDisplay(schoolLevel: SchoolLevelFilter): string {
  return schoolLevel === "MIDDLE_SCHOOL" ? "Middle School" : "High School";
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

const questionInclude = {
  answers: { include: { mc: true } },
  multipleChoices: { orderBy: { position: "asc" as const } },
  answerExplanations: { orderBy: { position: "asc" as const } },
  competitionLevel: { select: { name: true } }
} as const;

export function getCompetitions() {
  return Promise.resolve(localCompetitions);
}

export function getCompetitionBySlug(slug: string) {
  return Promise.resolve(localCompetitions.find((competition) => competition.slug === slug));
}

export function isCompetitionSlug(slug: string): slug is CompetitionSlug {
  return localCompetitions.some((competition) => competition.slug === slug);
}

export async function getScienceBowlMiddleSchoolCurriculumSubjects() {
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

export type SubjectTree = {
  id: string;
  name: string;
  slug: string;
  topics: Array<{
    id: string;
    name: string;
    order: number;
    subTopics: Array<{
      id: string;
      name: string;
      order: number;
      lessons: Array<{ id: string; slug: string; title: string; estimatedMinutes: number }>;
    }>;
  }>;
  /** Lessons matched by category but not yet linked to any subtopic — shown as a flat list. */
  unlinkedLessons: Array<{ id: string; slug: string; title: string; estimatedMinutes: number }>;
};

function subjectSlugToName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function topicSlugToName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export type SubjectSummary = { id: string; name: string; slug: string; order: number };

export function getSubjectsForCompetition(competitionSlug: CompetitionSlug): Promise<SubjectSummary[]> {
  const competition = localCompetitions.find((c) => c.slug === competitionSlug);
  const subjects = competition?.subjects ?? [];
  return Promise.resolve(
    subjects.map((name, order) => ({
      id: `static-subject-${competitionSlug}-${order}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      order
    }))
  );
}

export function getSubjectWithTree(competitionSlug: CompetitionSlug, subjectSlug: string) {
  return cachedContent(
    async (): Promise<SubjectTree | null> => {
      // Science Bowl reads from NSB JSON
      if (competitionSlug === "science-bowl") {
        const lessons = await getNsbLessons();
        // Resolve URL slug (e.g. "earth-space-science") to the display name used in lessons.json
        const subjectDisplay = (lessons as any[]).map((l) => l.subject as string).find(
          (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-") === subjectSlug
        ) ?? subjectSlug;
        const subjectLessons = lessons.filter((l) => l.subject === subjectDisplay);

        if (subjectLessons.length === 0) return null;

        // Build topic → subtopic → lessons hierarchy from NSB data
        const topicMap = new Map<
          string,
          Map<string, Array<{ id: string; slug: string; title: string; estimatedMinutes: number }>>
        >();

        subjectLessons.forEach((lesson) => {
          if (!topicMap.has(lesson.topicSlug)) {
            topicMap.set(lesson.topicSlug, new Map());
          }
          const subtopicMap = topicMap.get(lesson.topicSlug)!;
          if (!subtopicMap.has(lesson.subtopic)) {
            subtopicMap.set(lesson.subtopic, []);
          }
          subtopicMap.get(lesson.subtopic)!.push({
            id: lesson.id,
            slug: lesson.slug,
            title: lesson.title,
            estimatedMinutes: lesson.estimatedMinutes ?? 0
          });
        });

        const topics: SubjectTree["topics"] = Array.from(topicMap.entries()).map(
          ([topicSlug, subtopicMap], topicIndex) => ({
            id: `nsb-topic-${topicSlug}`,
            name: topicSlugToName(topicSlug),
            order: topicIndex,
            subTopics: Array.from(subtopicMap.entries()).map(([subtopic, lessonList], subtopicIndex) => ({
              id: `nsb-subtopic-${topicSlug}-${subtopic}`,
              name: subtopic,
              order: subtopicIndex,
              lessons: lessonList
            }))
          })
        );

        return {
          id: `nsb-subject-${subjectSlug}`,
          name: subjectSlugToName(subjectSlug),
          slug: subjectSlug,
          topics,
          unlinkedLessons: []
        };
      }

      return null;
    },
    ["subject-tree", competitionSlug, subjectSlug],
    [contentTag(competitionSlug)]
  );
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
  if (slug === "science-bowl") {
    return getNsbQuestions();
  }
  return localPracticeQuestions.filter((question) => question.competitionSlug === slug);
}

export async function getRandomQuestionByCompetition(
  slug: CompetitionSlug,
  subject?: string | null,
  schoolLevel?: SchoolLevelFilter | null
) {
  // Always use NSB questions for science-bowl (local JSON with lesson links)
  if (slug === "science-bowl") {
    const nsbQuestions = await getNsbQuestions();
    if (nsbQuestions.length > 0) {
      const questions = nsbQuestions.filter(
        (question) =>
          question.type === "multiple_choice" &&
          localQuestionMatchesSubject(question, subject) &&
          localQuestionMatchesSchoolLevel(question, schoolLevel)
      );
      return shuffle(questions)[0];
    }
  }

  // Fall back to local TypeScript data for other competitions
  const questions = localPracticeQuestions.filter(
    (question) =>
      question.type === "multiple_choice" &&
      question.competitionSlug === slug &&
      localQuestionMatchesSubject(question, subject) &&
      localQuestionMatchesSchoolLevel(question, schoolLevel)
  );
  return shuffle(questions)[0];
}

export async function getQuestionById(
  slug: CompetitionSlug,
  questionId: string,
  subject?: string | null,
  schoolLevel?: SchoolLevelFilter | null
) {
  // Always use NSB questions for science-bowl (local JSON with lesson links)
  if (slug === "science-bowl") {
    const nsbQuestions = await getNsbQuestions();
    const question = nsbQuestions.find(
      (q) =>
        q.type === "multiple_choice" &&
        q.id === questionId &&
        localQuestionMatchesSubject(q, subject) &&
        localQuestionMatchesSchoolLevel(q, schoolLevel)
    );
    if (question) return question;
  }

  // Fall back to local TypeScript data for other competitions
  return localPracticeQuestions.find(
    (question) =>
      question.type === "multiple_choice" &&
      question.id === questionId &&
      question.competitionSlug === slug &&
      localQuestionMatchesSubject(question, subject) &&
      localQuestionMatchesSchoolLevel(question, schoolLevel)
  );
}

export async function getRandomMultipleChoiceQuestions(
  slug: CompetitionSlug,
  subject: string | null,
  count: number,
  schoolLevel?: SchoolLevelFilter | null
) {
  const pool = slug === "science-bowl"
    ? await getNsbQuestions()
    : localPracticeQuestions.filter((q) => q.competitionSlug === slug);

  return shuffle(
    pool.filter(
      (question) =>
        question.type === "multiple_choice" &&
        localQuestionMatchesSubject(question, subject) &&
        localQuestionMatchesSchoolLevel(question, schoolLevel)
    )
  ).slice(0, count);
}

export function getLessonsByCompetition(
  slug: CompetitionSlug,
  subject?: string | null,
  schoolLevel?: SchoolLevelFilter | null
) {
  return cachedContent(
    async () => {
      // Always use NSB lessons for science-bowl (local JSON with links)
      if (slug === "science-bowl") {
        const nsbLessons = await getNsbLessons();
        return nsbLessons
          .filter((lesson: any) => {
            const levelMatch = !schoolLevel || lesson.level === schoolLevelToDisplay(schoolLevel);
            const subjectMatch = !subject || lesson.subject === subject;
            return levelMatch && subjectMatch;
          })
          .map((lesson: any) => ({
            id: lesson.id,
            slug: lesson.slug,
            competitionSlug: "science-bowl" as const,
            title: lesson.title,
            subject: lesson.subject,
            level: lesson.level,
            estimatedMinutes: lesson.estimatedMinutes || 10,
            summary: lesson.summary || "",
            keyConcepts: lesson.keyConcepts || [],
            contentSections: [],
            reviewQuestions: []
          }));
      }

      // Fall back to local TypeScript data for other competitions
      return localLessons.filter(
        (lesson) =>
          lesson.competitionSlug === slug &&
          (!subject || lesson.subject === subject) &&
          levelStringMatchesSchoolLevel(lesson.level, schoolLevel)
      );
    },
    ["lessons", slug, subject ?? "", schoolLevel ?? ""],
    [contentTag(slug)]
  );
}

export async function getLessonsByIds(lessonIds: string[], competitionSlug: CompetitionSlug): Promise<Lesson[]> {
  if (!lessonIds.length) return [];

  // Always use NSB lessons for science-bowl (local JSON with links)
  if (competitionSlug === "science-bowl") {
    const nsbLessons = await getNsbLessons();
    const idSet = new Set(lessonIds);
    return nsbLessons
      .filter((lesson: any) => idSet.has(lesson.id))
      .map((lesson: any) => ({
        id: lesson.id,
        slug: lesson.slug,
        competitionSlug: "science-bowl" as const,
        title: lesson.title,
        subject: lesson.subject,
        level: lesson.level,
        estimatedMinutes: lesson.estimatedMinutes || 10,
        summary: lesson.summary || "",
        keyConcepts: lesson.keyConcepts || [],
        contentSections: [],
        reviewQuestions: []
      }));
  }

  // Fall back to local TypeScript data for other competitions
  return localLessons.filter((lesson) => lessonIds.includes(lesson.id) && lesson.competitionSlug === competitionSlug);
}


export function getTestsByCompetition(slug: CompetitionSlug) {
  return Promise.resolve(localTests.filter((test) => test.competitionSlug === slug));
}

export async function getLessonBySlug(slug: CompetitionSlug, lessonSlug: string) {
  if (slug === "science-bowl") {
    const lessons = await getNsbLessons();
    const lesson = lessons.find((l: any) => l.slug === lessonSlug);
    if (!lesson) return undefined;

    const contentSections = await getNsbLessonContent(lesson.contentPath);

    return {
      id: lesson.id,
      competitionSlug: slug,
      title: lesson.title,
      slug: lesson.slug,
      subject: lesson.subject,
      level: lesson.level,
      summary: lesson.summary ?? "",
      keyConcepts: lesson.keyConcepts,
      estimatedMinutes: lesson.estimatedMinutes ?? 0,
      contentSections,
      reviewQuestions: []
    };
  }

  return localLessons.find((lesson) => lesson.competitionSlug === slug && lesson.slug === lessonSlug);
}

export async function getTestBySlug(slug: CompetitionSlug, testSlug: string) {
  return localTests.find((test) => test.competitionSlug === slug && test.slug === testSlug);
}

export async function getQuestionsForTest(questionIds: string[]) {
  return questionIds
    .map((id) => localPracticeQuestions.find((question) => question.id === id))
    .filter((question): question is NonNullable<typeof question> => Boolean(question));
}

export async function getContentCounts(slug: CompetitionSlug) {
  if (slug === "science-bowl") {
    const [questions, lessons] = await Promise.all([getNsbQuestions(), getNsbLessons()]);
    return { questions: questions.length, lessons: (lessons as any[]).length };
  }
  return {
    questions: localPracticeQuestions.filter((q) => q.competitionSlug === slug).length,
    lessons: localLessons.filter((l) => l.competitionSlug === slug).length
  };
}

export async function getContentCountsBySchoolLevel(slug: CompetitionSlug, schoolLevel: SchoolLevelFilter) {
  if (slug === "science-bowl") {
    const [questions, lessons] = await Promise.all([getNsbQuestions(), getNsbLessons()]);
    return {
      questions: questions.filter((q) => localQuestionMatchesSchoolLevel(q, schoolLevel)).length,
      lessons: (lessons as any[]).filter((l) => l.level === schoolLevelToDisplay(schoolLevel)).length
    };
  }
  return {
    questions: localPracticeQuestions.filter(
      (q) => q.competitionSlug === slug && localQuestionMatchesSchoolLevel(q, schoolLevel)
    ).length,
    lessons: localLessons.filter(
      (l) => l.competitionSlug === slug && levelStringMatchesSchoolLevel(l.level, schoolLevel)
    ).length
  };
}


export async function getContentCountsForSubject(
  slug: CompetitionSlug,
  subject: string,
  schoolLevel?: SchoolLevelFilter | null
) {
  if (slug === "science-bowl") {
    const [questions, lessons] = await Promise.all([getNsbQuestions(), getNsbLessons()]);
    return {
      questions: questions.filter(
        (q) => localQuestionMatchesSubject(q, subject) && localQuestionMatchesSchoolLevel(q, schoolLevel)
      ).length,
      lessons: (lessons as any[]).filter(
        (l) => l.subject === subject && (!schoolLevel || l.level === schoolLevelToDisplay(schoolLevel))
      ).length
    };
  }

  return {
    questions: localPracticeQuestions.filter(
      (q) =>
        q.competitionSlug === slug &&
        localQuestionMatchesSubject(q, subject) &&
        localQuestionMatchesSchoolLevel(q, schoolLevel)
    ).length,
    lessons: localLessons.filter(
      (l) =>
        l.competitionSlug === slug &&
        (!subject || l.subject === subject) &&
        levelStringMatchesSchoolLevel(l.level, schoolLevel)
    ).length
  };
}

export function getBuzzerQuestions() {
  return cachedContent(
    async () => {
      if (!isDbEnabled()) return localBuzzerQuestions;

      const pairs = await getPrisma().buzzerQuestionPair.findMany({
        orderBy: { id: "asc" },
        include: {
          tossup: {
            include: {
              answers: { take: 1 },
              answerExplanations: { orderBy: { position: "asc" }, take: 1 }
            }
          },
          bonus: {
            include: {
              answers: { take: 1 },
              answerExplanations: { orderBy: { position: "asc" }, take: 1 }
            }
          }
        }
      });

      return pairs.map((pair) => ({
        id: pair.id,
        competitionSlug: pair.tossup.competitionId as "science-bowl",
        subject: pair.tossup.category,
        difficulty: fromDbDifficulty(pair.tossup.difficulty),
        tossupPrompt: pair.tossup.prompt,
        tossupAnswer: pair.tossup.answers[0]?.text ?? "",
        tossupExplanation: pair.tossup.answerExplanations[0]?.shortExplanation ?? pair.tossup.explanation,
        bonusPrompt: pair.bonus.prompt,
        bonusAnswer: pair.bonus.answers[0]?.text ?? "",
        bonusExplanation: pair.bonus.answerExplanations[0]?.shortExplanation ?? pair.bonus.explanation
      }));
    },
    ["buzzer-questions"],
    [contentTag("science-bowl")]
  );
}

export const competitions = localCompetitions;
export const lessons = localLessons;
export const practiceQuestions = localPracticeQuestions;
export const tests = localTests;
export const buzzerQuestions = localBuzzerQuestions;
