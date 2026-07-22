import type { PracticeQuestion } from "@/types";

/** Shape of each record in content/nsb/json/questions.json */
export type NsbRawQuestion = {
  id: string;
  competitionSlug: string;
  category: string;
  schoolLevel: "MIDDLE_SCHOOL" | "HIGH_SCHOOL";
  difficulty: string;
  format: string;
  displayText?: string;
  text: string;
  choices?: string[];
  answerIndex?: number | null;
  answer: string;
  explainAnswer?: string[];
  lessonIds?: string[];
  subtopic?: string;
  questionKind?: "TOSS_UP" | "BONUS";
  bonusQuestionId?: string;
};

/** Shape of each record in content/nsb/json/lessons.json */
export type NsbLesson = {
  id: string;
  slug: string;
  competitionSlug?: string;
  title: string;
  subject: string;
  level: string;
  topicSlug: string;
  subtopic: string;
  estimatedMinutes?: number;
  summary?: string;
  keyConcepts?: string[];
  contentPath: string;
};

// ── Sharded question loading ──
//
// content/nsb/json/questions.json (~24 MB) is split by scripts/shard-questions.mjs
// into content/nsb/json/questions/<subject-slug>__<LEVEL>.json (12 shards, ~1–4 MB
// each). Practice pages need only the shard(s) matching their subject+level, so
// loading a single ~2 MB shard instead of parsing the whole bank cuts cold-start
// cost dramatically. Shards are read with fs.readFile at request time (the same
// pattern as lesson bodies) — which is why next.config.ts must keep the
// content/nsb/json/questions/** entry in outputFileTracingIncludes, or the shards
// won't be bundled on Vercel and the loader will return [].

const SUBJECT_SLUGS: Record<string, string> = {
  Biology: "biology",
  Chemistry: "chemistry",
  Physics: "physics",
  "Earth and Space": "earth-and-space",
  Energy: "energy",
  Math: "math",
};

type ShardLevel = "MIDDLE_SCHOOL" | "HIGH_SCHOOL";
const SHARD_LEVELS: ShardLevel[] = ["MIDDLE_SCHOOL", "HIGH_SCHOOL"];

// Per-shard cache of the raw records, keyed by "<subject-slug>__<LEVEL>".
const shardCache = new Map<string, NsbRawQuestion[]>();

function shardKey(subjectSlug: string, level: ShardLevel): string {
  return `${subjectSlug}__${level}`;
}

async function loadShard(subjectSlug: string, level: ShardLevel): Promise<NsbRawQuestion[]> {
  const key = shardKey(subjectSlug, level);
  const cached = shardCache.get(key);
  if (cached) return cached;

  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const fullPath = path.join(process.cwd(), "content", "nsb", "json", "questions", `${key}.json`);
    const raw = JSON.parse(await fs.readFile(fullPath, "utf-8")) as NsbRawQuestion[];
    shardCache.set(key, raw);
    return raw;
  } catch (error) {
    console.warn(`Failed to load NSB question shard ${key}:`, error);
    return [];
  }
}

/**
 * Load raw question records for the given filters, reading only the shards that
 * match. A null/undefined subject or level widens the load to every matching
 * shard (e.g. subject only → both levels; neither → all 12 shards).
 */
async function loadRawQuestions(
  subject?: string | null,
  level?: ShardLevel | null
): Promise<NsbRawQuestion[]> {
  const subjectSlugs = subject
    ? [SUBJECT_SLUGS[subject]].filter(Boolean)
    : Object.values(SUBJECT_SLUGS);
  const levels = level ? [level] : SHARD_LEVELS;

  const shards = await Promise.all(
    subjectSlugs.flatMap((slug) => levels.map((lvl) => loadShard(slug, lvl)))
  );
  return shards.flat();
}

function toPracticeQuestion(q: NsbRawQuestion): PracticeQuestion {
  return {
    id: q.id,
    competitionSlug: q.competitionSlug as "science-bowl",
    subject: q.category,
    level: q.schoolLevel === "MIDDLE_SCHOOL" ? "Middle School" : "High School",
    difficulty: q.difficulty as "EASY" | "MEDIUM" | "HARD",
    type: q.format as "multiple_choice" | "short_answer",
    prompt: q.displayText || q.text,
    choices: q.choices && q.choices.length > 0 ? q.choices : undefined,
    correctAnswer: (q.choices && q.answerIndex != null) ? q.choices[q.answerIndex] : q.answer,
    explanation: "",
    explainAnswer: q.explainAnswer && q.explainAnswer.length > 0 ? q.explainAnswer : undefined,
    lessonIds: q.lessonIds || [],
    subtopic: q.subtopic,
  };
}

let nsbQuestionsCache: PracticeQuestion[] | null = null;

/**
 * All NSB questions, composed from every shard. Kept for callers that must scan
 * the whole bank (lesson/question-by-id lookups, buzzer pool, yield stats).
 * Memoized at module scope, same as before. Prefer getNsbQuestionsFor() on the
 * hot path so only the needed shards are loaded.
 */
export async function getNsbQuestions(): Promise<PracticeQuestion[]> {
  if (nsbQuestionsCache) {
    return nsbQuestionsCache;
  }

  const raw = await loadRawQuestions();
  if (raw.length === 0) return [];
  nsbQuestionsCache = raw.map(toPracticeQuestion);
  return nsbQuestionsCache;
}

/**
 * Questions for a specific subject and/or level, loading only the matching
 * shard(s). This is the hot path used by the practice random-question API.
 */
export async function getNsbQuestionsFor(
  subject?: string | null,
  level?: ShardLevel | null
): Promise<PracticeQuestion[]> {
  const raw = await loadRawQuestions(subject, level);
  return raw.map(toPracticeQuestion);
}

export type NsbBuzzerQuestion = {
  id: string;
  category: string;
  schoolLevel: "MIDDLE_SCHOOL" | "HIGH_SCHOOL";
  format: "multiple_choice" | "short_answer";
  text: string;
  choices?: string[];
  answerIndex?: number;
  answer: string;
  questionKind?: "TOSS_UP" | "BONUS";
  bonusQuestionId?: string;
};

export type NsbBuzzerPool = {
  byId: Map<string, NsbBuzzerQuestion>;
  tossupIds: Record<"MIDDLE_SCHOOL" | "HIGH_SCHOOL", string[]>;
};

let nsbBuzzerPoolCache: NsbBuzzerPool | null = null;

// Pool for the Buzzer Arena: real Science Bowl toss-ups paired with their
// bonus question (recovered from the original round PDFs by
// scripts/derive-question-kind.mjs).
export async function getNsbBuzzerPool(): Promise<NsbBuzzerPool | null> {
  if (nsbBuzzerPoolCache) {
    return nsbBuzzerPoolCache;
  }

  try {
    const rawQuestions = await loadRawQuestions();

    const byId = new Map<string, NsbBuzzerQuestion>();
    const tossupIds: NsbBuzzerPool["tossupIds"] = { MIDDLE_SCHOOL: [], HIGH_SCHOOL: [] };

    for (const q of rawQuestions) {
      const question: NsbBuzzerQuestion = {
        id: q.id,
        category: q.category,
        schoolLevel: q.schoolLevel,
        format: q.format as "multiple_choice" | "short_answer",
        text: q.displayText || q.text,
        choices: q.choices && q.choices.length > 0 ? q.choices : undefined,
        answerIndex: q.answerIndex ?? undefined,
        answer: (q.choices && q.answerIndex != null) ? q.choices[q.answerIndex] : q.answer,
        questionKind: q.questionKind,
        bonusQuestionId: q.bonusQuestionId
      };
      byId.set(question.id, question);
    }

    for (const question of byId.values()) {
      if (
        question.questionKind === "TOSS_UP" &&
        question.bonusQuestionId &&
        byId.has(question.bonusQuestionId) &&
        (question.schoolLevel === "MIDDLE_SCHOOL" || question.schoolLevel === "HIGH_SCHOOL")
      ) {
        tossupIds[question.schoolLevel].push(question.id);
      }
    }

    nsbBuzzerPoolCache = { byId, tossupIds };
    return nsbBuzzerPoolCache;
  } catch (error) {
    console.warn("Failed to load NSB buzzer pool from JSON:", error);
    return null;
  }
}

export type NsbTopicYieldStats = {
  /** Questions that carry a subtopic tag (the population the stats describe). */
  totalQuestions: number;
  /** Distinct (category, subtopic) pairs. */
  totalTopics: number;
  /** Fewest top-ranked topics whose questions add up to ≥ headSharePct. */
  headTopics: number;
  /** Share of all tagged questions covered by headTopics (rounded %). */
  headSharePct: number;
  /**
   * Ranked topic frequencies bucketed into equal-size groups for charting,
   * each bucket a mean count normalized 0..1 against the largest bucket.
   */
  curve: number[];
  /** How many leading curve buckets fall inside the head. */
  headBuckets: number;
  /** Per subject: fewest topics covering half that subject's questions. */
  perSubject: Array<{ subject: string; halfTopics: number; totalTopics: number }>;
};

const YIELD_CURVE_BUCKETS = 64;
const YIELD_HEAD_TARGET = 0.8;

let nsbTopicYieldCache: NsbTopicYieldStats | null = null;

/**
 * Concentration stats behind the "80/20" pitch: how few subtopics account for
 * most of the historical question bank. Drives the landing-page yield chart.
 */
export async function getNsbTopicYieldStats(): Promise<NsbTopicYieldStats | null> {
  if (nsbTopicYieldCache) {
    return nsbTopicYieldCache;
  }

  try {
    const rawQuestions = await loadRawQuestions();

    const byTopic = new Map<string, number>();
    const bySubject = new Map<string, Map<string, number>>();
    for (const q of rawQuestions) {
      if (!q.subtopic) continue;
      const key = `${q.category}|${q.subtopic}`;
      byTopic.set(key, (byTopic.get(key) ?? 0) + 1);
      let subjectTopics = bySubject.get(q.category);
      if (!subjectTopics) {
        subjectTopics = new Map();
        bySubject.set(q.category, subjectTopics);
      }
      subjectTopics.set(q.subtopic, (subjectTopics.get(q.subtopic) ?? 0) + 1);
    }

    const ranked = [...byTopic.values()].sort((a, b) => b - a);
    const totalQuestions = ranked.reduce((sum, count) => sum + count, 0);
    if (totalQuestions === 0 || ranked.length === 0) {
      return null;
    }

    let covered = 0;
    let headTopics = 0;
    for (const count of ranked) {
      covered += count;
      headTopics += 1;
      if (covered >= totalQuestions * YIELD_HEAD_TARGET) break;
    }
    const headSharePct = Math.round((100 * covered) / totalQuestions);

    const bucketSize = Math.max(1, Math.ceil(ranked.length / YIELD_CURVE_BUCKETS));
    const curve: number[] = [];
    for (let i = 0; i < ranked.length; i += bucketSize) {
      const bucket = ranked.slice(i, i + bucketSize);
      curve.push(bucket.reduce((sum, count) => sum + count, 0) / bucket.length);
    }
    const maxBucket = curve[0] || 1;
    const normalizedCurve = curve.map((value) => value / maxBucket);
    const headBuckets = Math.max(1, Math.round(headTopics / bucketSize));

    const perSubject = [...bySubject.entries()].map(([subject, topics]) => {
      const counts = [...topics.values()].sort((a, b) => b - a);
      const subjectTotal = counts.reduce((sum, count) => sum + count, 0);
      let acc = 0;
      let halfTopics = 0;
      for (const count of counts) {
        acc += count;
        halfTopics += 1;
        if (acc >= subjectTotal / 2) break;
      }
      return { subject, halfTopics, totalTopics: counts.length };
    });

    nsbTopicYieldCache = {
      totalQuestions,
      totalTopics: ranked.length,
      headTopics,
      headSharePct,
      curve: normalizedCurve,
      headBuckets,
      perSubject
    };
    return nsbTopicYieldCache;
  } catch (error) {
    console.warn("Failed to compute NSB topic yield stats:", error);
    return null;
  }
}

export async function getNsbLessons(): Promise<NsbLesson[]> {
  try {
    const { default: rawLessons } = await import("../../content/nsb/json/lessons.json");
    return rawLessons as NsbLesson[];
  } catch (error) {
    console.warn("Failed to load NSB lessons from JSON:", error);
    return [];
  }
}

export async function getNsbLessonContent(contentPath: string): Promise<Array<{ heading: string; body: string }>> {
  try {
    // contentPath is repo-root-relative, e.g.
    // "content/nsb/lessons/hs/biology/scientific-inquiry/scientific-method-observation-to-conclusion.md"
    const fs = await import("fs/promises");
    const path = await import("path");

    const fullPath = path.join(process.cwd(), contentPath);
    const markdown = await fs.readFile(fullPath, "utf-8");

    // Remove frontmatter (YAML between --- markers)
    let content = markdown;
    if (content.startsWith("---")) {
      const endIndex = content.indexOf("---", 3);
      if (endIndex !== -1) {
        content = content.substring(endIndex + 3);
      }
    }

    // Parse by h4 headers (#### ) and h3 headers (### )
    const sections: Array<{ heading: string; body: string }> = [];
    const lines = content.split("\n");

    let currentSection: { heading: string; body: string } | null = null;

    for (const line of lines) {
      // Match #### or ### headers
      const h4Match = line.match(/^#### (.+)/);
      const h3Match = line.match(/^### (.+)/);

      if (h4Match || h3Match) {
        // Save previous section if it exists
        if (currentSection) {
          currentSection.body = currentSection.body.trim();
          if (currentSection.body) {
            sections.push(currentSection);
          }
        }
        // Start new section
        const heading = (h4Match || h3Match)?.[1]?.trim() || "";
        currentSection = { heading, body: "" };
      } else if (currentSection && line.trim()) {
        // Skip empty lines at the start of a section
        if (currentSection.body || line.trim()) {
          currentSection.body += line + "\n";
        }
      }
    }

    // Don't forget the last section
    if (currentSection && currentSection.body.trim()) {
      currentSection.body = currentSection.body.trim();
      sections.push(currentSection);
    }

    return sections;
  } catch (error) {
    console.warn(`Failed to load NSB lesson content from ${contentPath}:`, error);
    return [];
  }
}
