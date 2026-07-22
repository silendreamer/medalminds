import { unstable_cache } from "next/cache";
import { competitions as localCompetitions } from "@/data/competitions";
import { lessons as localLessons } from "@/data/lessons";
import { practiceQuestions as localPracticeQuestions } from "@/data/practiceQuestions";
import {
  scienceBowlMiddleSchoolSubjects as staticScienceBowlMiddleSchoolSubjects,
  getScienceBowlMiddleSchoolSubjectByName as staticGetSubjectByName,
} from "@/data/scienceBowlMiddleSchoolCurriculum";
import {
  getNsbQuestions,
  getNsbQuestionsFor,
  getNsbLessons,
  getNsbLessonContent,
  getNsbTopicYieldStats,
  type NsbLesson,
  type NsbTopicYieldStats
} from "@/data/nsbQuestions";
import type { CompetitionSlug, Lesson, PracticeQuestion } from "@/types";
import { slugifySubject } from "@/lib/subjects";
import { shuffle } from "@/lib/shuffle";
import { type SchoolLevelFilter, schoolLevelDisplay } from "@/lib/levels";

export type { SchoolLevelFilter } from "./levels";

/**
 * Wrap a compute function in Next's `unstable_cache`, but fall back to calling it
 * directly when there is no incremental cache available (unit tests, scripts, or
 * any non-request context). `unstable_cache` throws an "incrementalCache missing"
 * invariant outside the Next server runtime; this keeps the readers hermetic
 * (test/setup.ts runs them with no request context) while still caching in prod.
 */
async function cached<T>(fn: () => Promise<T>, keyParts: string[], tags: string[]): Promise<T> {
  try {
    return await unstable_cache(fn, keyParts, { tags })();
  } catch (error) {
    if (error instanceof Error && error.message.includes("incrementalCache missing")) {
      return fn();
    }
    throw error;
  }
}

function localQuestionMatchesSubject(question: PracticeQuestion, subject?: string | null) {
  return !subject || question.subject === subject;
}

function schoolLevelToDisplay(schoolLevel: SchoolLevelFilter): string {
  return schoolLevelDisplay(schoolLevel);
}

function levelStringMatchesSchoolLevel(level: string, schoolLevel?: SchoolLevelFilter | null) {
  if (!schoolLevel) return true;
  if (schoolLevel === "MIDDLE_SCHOOL") return level.toLowerCase().includes("middle");
  return level.toLowerCase().includes("high");
}

function localQuestionMatchesSchoolLevel(question: PracticeQuestion, schoolLevel?: SchoolLevelFilter | null) {
  return levelStringMatchesSchoolLevel(question.level, schoolLevel);
}

/**
 * Map the base fields shared by getLessonsByCompetition and getLessonBySlug.
 * contentSections and reviewQuestions differ per caller and are NOT set here.
 */
function toLesson(nsb: NsbLesson): Omit<Lesson, "contentSections" | "reviewQuestions"> {
  return {
    id: nsb.id,
    slug: nsb.slug,
    competitionSlug: "science-bowl" as const,
    title: nsb.title,
    subject: nsb.subject,
    level: nsb.level,
    topicSlug: nsb.topicSlug || "",
    subtopic: nsb.subtopic || "",
    estimatedMinutes: nsb.estimatedMinutes ?? 10,
    summary: nsb.summary ?? "",
    keyConcepts: nsb.keyConcepts ?? [],
  };
}

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
  /** Lessons matched by subject but not yet linked to any subtopic — shown as a flat list. */
  unlinkedLessons: Array<{ id: string; slug: string; title: string; estimatedMinutes: number }>;
};

function subjectSlugToName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Display-name overrides for topic slugs whose title-cased form reads poorly
// (or where we want an "&"/lowercase article the slug can't carry).
const TOPIC_NAME_OVERRIDES: Record<string, string> = {
  // MS Biology
  "foundations-of-life": "Cells & the Study of Life",
  "evolution-classification": "Evolution & Classification",
  "genetics-heredity": "Genetics & Heredity",
  "human-body-systems": "Human Body Systems",
  "plant-biology": "Plant Biology",
  // New topics created during the cross-subject reorg
  "measurement-and-scientific-method": "Measurement & the Scientific Method",
  "atomic-nuclear-physics": "Atomic & Nuclear Physics",
  "planetary-science-astrobiology": "Planetary Science & Astrobiology"
};

function topicSlugToName(slug: string): string {
  if (TOPIC_NAME_OVERRIDES[slug]) return TOPIC_NAME_OVERRIDES[slug];
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
      slug: slugifySubject(name),
      order
    }))
  );
}

export async function getSubjectWithTree(competitionSlug: CompetitionSlug, subjectSlug: string, schoolLevel?: SchoolLevelFilter | null): Promise<SubjectTree | null> {
  if (competitionSlug === "science-bowl") {
    const lessons = await getNsbLessons();
    const subjectDisplay = lessons.map((l) => l.subject).find(
      (s) => slugifySubject(s) === subjectSlug
    ) ?? subjectSlug;
    const levelDisplay = schoolLevel ? schoolLevelToDisplay(schoolLevel) : null;
    const subjectLessons = lessons.filter(
      (l) => l.subject === subjectDisplay && (!levelDisplay || l.level === levelDisplay)
    );

    if (subjectLessons.length === 0) return null;

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
}

export async function getScienceBowlMiddleSchoolCurriculumSubjectByName(name?: string | null) {
  const subjects = await getScienceBowlMiddleSchoolCurriculumSubjects();
  if (!name) return undefined;
  const normalized = name.trim().toLowerCase();
  return subjects.find(
    (subject) => subject.name.toLowerCase() === normalized || subject.slug === normalized.replace(/\s+/g, "-")
  );
}

// Sync lookup by URL slug (e.g. "earth-and-space" or "earth-and-space-science")
export function getScienceBowlMiddleSchoolSubjectBySlug(slug: string) {
  return staticGetSubjectByName(slug.replace(/-/g, " "));
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
  if (slug === "science-bowl") {
    // Load only the shard(s) for this subject+level rather than the whole bank.
    const nsbQuestions = await getNsbQuestionsFor(subject, schoolLevel);
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
    ? await getNsbQuestionsFor(subject, schoolLevel)
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

export async function getLessonsByCompetition(
  slug: CompetitionSlug,
  subject?: string | null,
  schoolLevel?: SchoolLevelFilter | null
) {
  if (slug === "science-bowl") {
    const nsbLessons = await getNsbLessons();
    return nsbLessons
      .filter((lesson: NsbLesson) => {
        const levelMatch = !schoolLevel || lesson.level === schoolLevelToDisplay(schoolLevel);
        const subjectMatch = !subject || lesson.subject === subject;
        return levelMatch && subjectMatch;
      })
      .map((lesson: NsbLesson): Lesson => ({
        ...toLesson(lesson),
        contentSections: [],
        reviewQuestions: []
      }));
  }

  return localLessons.filter(
    (lesson) =>
      lesson.competitionSlug === slug &&
      (!subject || lesson.subject === subject) &&
      levelStringMatchesSchoolLevel(lesson.level, schoolLevel)
  );
}

// The set of questions linked to a lesson is stable per (lesson, competition),
// but small (a lesson links only a handful of questions), so it's a good cache
// unit. We cache the *filtered, explanation-prioritized* candidate list and do
// the shuffle + limit AFTER the cache, so ordering stays fresh per request while
// the expensive full-array scan is memoized.
async function computeLessonQuestionCandidates(
  lessonId: string,
  competitionSlug: CompetitionSlug
): Promise<{ withExplanation: PracticeQuestion[]; rest: PracticeQuestion[] }> {
  const pool =
    competitionSlug === "science-bowl"
      ? await getNsbQuestions()
      : localPracticeQuestions.filter((q) => q.competitionSlug === competitionSlug);

  const linked = pool.filter((q) => q.lessonIds?.includes(lessonId));

  // Prefer questions that already have a worked-out explanation, so the
  // read-only lesson section isn't just a bare question + answer.
  return {
    withExplanation: linked.filter((q) => q.explainAnswer?.length),
    rest: linked.filter((q) => !q.explainAnswer?.length)
  };
}

export async function getQuestionsForLesson(
  lessonId: string,
  competitionSlug: CompetitionSlug,
  limit = 25
): Promise<PracticeQuestion[]> {
  const { withExplanation, rest } = await cached(
    () => computeLessonQuestionCandidates(lessonId, competitionSlug),
    ["lesson-questions", competitionSlug, lessonId],
    ["nsb-content"]
  );

  return [...shuffle(withExplanation), ...shuffle(rest)].slice(0, limit);
}

export async function getLessonBySlug(slug: CompetitionSlug, lessonSlug: string, levelHint?: string) {
  if (slug === "science-bowl") {
    const lessons = await getNsbLessons();
    const matches = lessons.filter((l: NsbLesson) => l.slug === lessonSlug);
    const lesson = levelHint
      ? (matches.find((l: NsbLesson) => l.level === levelHint) ?? matches[0])
      : matches[0];
    if (!lesson) return undefined;

    const contentSections = await getNsbLessonContent(lesson.contentPath);

    return {
      ...toLesson(lesson),
      contentSections,
      reviewQuestions: []
    };
  }

  return localLessons.find((lesson) => lesson.competitionSlug === slug && lesson.slug === lessonSlug);
}

// Content counts are tiny, stable, derived values called many times per hub page
// (e.g. the practice hub computes counts for all six subjects in parallel).
// They are the safest, highest-frequency thing to cache: keys are stable per
// (competition, level, subject), and the serialized payload is just two numbers,
// so we avoid the data-cache bloat that wrapping the full-array loaders would cause.
// The `nsb-content` tag lets a future content redeploy invalidate all of them at once.

async function computeContentCounts(slug: CompetitionSlug) {
  if (slug === "science-bowl") {
    const [questions, lessons] = await Promise.all([getNsbQuestions(), getNsbLessons()]);
    return { questions: questions.length, lessons: lessons.length };
  }
  return {
    questions: localPracticeQuestions.filter((q) => q.competitionSlug === slug).length,
    lessons: localLessons.filter((l) => l.competitionSlug === slug).length
  };
}

export async function getContentCounts(slug: CompetitionSlug) {
  return cached(() => computeContentCounts(slug), ["content-counts", slug], ["nsb-content"]);
}

async function computeContentCountsBySchoolLevel(slug: CompetitionSlug, schoolLevel: SchoolLevelFilter) {
  if (slug === "science-bowl") {
    const [questions, lessons] = await Promise.all([getNsbQuestions(), getNsbLessons()]);
    return {
      questions: questions.filter((q) => localQuestionMatchesSchoolLevel(q, schoolLevel)).length,
      lessons: lessons.filter((l: NsbLesson) => l.level === schoolLevelToDisplay(schoolLevel)).length
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

export async function getContentCountsBySchoolLevel(slug: CompetitionSlug, schoolLevel: SchoolLevelFilter) {
  return cached(
    () => computeContentCountsBySchoolLevel(slug, schoolLevel),
    ["content-counts-by-level", slug, schoolLevel],
    ["nsb-content"]
  );
}

async function computeContentCountsForSubject(
  slug: CompetitionSlug,
  subject: string,
  schoolLevel?: SchoolLevelFilter | null
) {
  if (slug === "science-bowl") {
    // Only this subject's shard(s) are needed for its count.
    const [questions, lessons] = await Promise.all([
      getNsbQuestionsFor(subject, schoolLevel),
      getNsbLessons()
    ]);
    return {
      questions: questions.filter(
        (q) => localQuestionMatchesSubject(q, subject) && localQuestionMatchesSchoolLevel(q, schoolLevel)
      ).length,
      lessons: lessons.filter(
        (l: NsbLesson) => l.subject === subject && (!schoolLevel || l.level === schoolLevelToDisplay(schoolLevel))
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

export async function getContentCountsForSubject(
  slug: CompetitionSlug,
  subject: string,
  schoolLevel?: SchoolLevelFilter | null
) {
  return cached(
    () => computeContentCountsForSubject(slug, subject, schoolLevel),
    ["content-counts-for-subject", slug, subject, schoolLevel ?? "all"],
    ["nsb-content"]
  );
}

export async function getTopicYieldStats(slug: CompetitionSlug): Promise<NsbTopicYieldStats | null> {
  if (slug === "science-bowl") {
    return getNsbTopicYieldStats();
  }
  return null;
}

export const competitions = localCompetitions;
