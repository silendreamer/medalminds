/**
 * link-content-to-subtopics.ts
 *
 * Phase 4: sets subTopicId on existing Question and Lesson rows by matching
 * them against the 128 SubTopic rows seeded in Phase 2.
 *
 * Usage:
 *   npx tsx scripts/link-content-to-subtopics.ts            # dry run
 *   npx tsx scripts/link-content-to-subtopics.ts --write    # apply
 *   npx tsx scripts/link-content-to-subtopics.ts --write --reset  # clear + re-link
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { getPrisma } from "../src/lib/db";

loadDotenv({ path: ".env.local", override: false });

const dryRun  = !process.argv.includes("--write");
const doReset = process.argv.includes("--reset");

// ── Normalisation helpers ─────────────────────────────────────────────────────

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenOverlap(a: string, b: string): number {
  const ta = new Set(norm(a).split(" ").filter((t) => t.length > 2));
  const tb = new Set(norm(b).split(" ").filter((t) => t.length > 2));
  if (ta.size === 0 || tb.size === 0) return 0;
  let hits = 0;
  for (const t of ta) if (tb.has(t)) hits++;
  return hits / Math.max(ta.size, tb.size);
}

// ── Category → subject id mapping ────────────────────────────────────────────

const categoryToSubjectId: Record<string, string> = {
  "Biology":                  "subj--life-science",
  "Life Science":             "subj--life-science",
  "Chemistry":                "subj--physical-science",
  "Physics":                  "subj--physical-science",
  "Physical Science":         "subj--physical-science",
  "Earth & Space":            "subj--earth-space-science",
  "Earth and Space":          "subj--earth-space-science",
  "Earth and Space Science":  "subj--earth-space-science",
  "Energy":                   "subj--energy",
  "Math":                     "subj--mathematics",
  "Mathematics":              "subj--mathematics",
};

// ── Lesson → SubTopic hardcoded map ──────────────────────────────────────────

const LESSON_MAP: Record<string, string> = {
  "Cell Energy in Quick Recall":         "Cellular Respiration",
  "Acids, Bases, and Fast pH Reasoning": "Acids & Bases",
  "Newton's Laws for Toss-Ups":          "Newton's Laws",
  "Earth Layers and Magnetic Fields":    "Core",
  "Energy Forms and Transfers":          "Forms of Energy",
  "Mental Percent Math":                 "Mental Math",
  "DNA to RNA Essentials":               "DNA & Genes",
  "Catalysts and Reaction Pathways":     "Energy Changes",
  "Simple Machines Under Pressure":      "Work & Power",
  "Reading Stellar Diagrams":            "Stars",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type SubTopicWithChain = {
  id: string;
  name: string;
  topicId: string;
  topic: {
    id: string;
    name: string;
    subjectId: string;
    subject: { id: string; name: string };
  };
};

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const prisma = getPrisma();

  if (dryRun) console.log("dry-run — pass --write to apply\n");

  // ── Load SubTopics with full chain ──────────────────────────────────────────

  const allSubTopics: SubTopicWithChain[] = await prisma.subTopic.findMany({
    include: { topic: { include: { subject: true } } },
  });

  // Group by subject id for fast filtering
  const subTopicsBySubject = new Map<string, SubTopicWithChain[]>();
  for (const st of allSubTopics) {
    const sid = st.topic.subject.id;
    if (!subTopicsBySubject.has(sid)) subTopicsBySubject.set(sid, []);
    subTopicsBySubject.get(sid)!.push(st);
  }

  // Flat name → id lookup (for lesson hardcoded map)
  const subTopicByName = new Map<string, string>(); // lower-name → id
  for (const st of allSubTopics) {
    subTopicByName.set(norm(st.name), st.id);
  }

  // ── Optional reset ──────────────────────────────────────────────────────────

  if (doReset && !dryRun) {
    console.log("Resetting subTopicId on science-bowl questions + lessons…");
    await prisma.question.updateMany({
      where: { competitionId: "science-bowl" },
      data: { subTopicId: null },
    });
    await prisma.lesson.updateMany({
      where: { competitionId: "science-bowl" },
      data: { subTopicId: null },
    });
    console.log("Reset done.\n");
  }

  // ════════════════════════════════════════════════════════════════════════════
  // Part A — Lessons
  // ════════════════════════════════════════════════════════════════════════════

  const sbLessons = await prisma.lesson.findMany({
    where: { competitionId: "science-bowl" },
    select: { id: true, title: true, subTopicId: true },
  });

  let lessonLinked = 0;
  let lessonSkipped = 0;

  console.log("── Linking lessons ──");
  for (const lesson of sbLessons) {
    const targetName = LESSON_MAP[lesson.title];
    if (!targetName) {
      console.log(`  SKIP (no map entry): "${lesson.title}"`);
      lessonSkipped++;
      continue;
    }
    const stId = subTopicByName.get(norm(targetName));
    if (!stId) {
      console.log(`  MISS (subtopic not found): "${targetName}" for "${lesson.title}"`);
      lessonSkipped++;
      continue;
    }
    console.log(`  ${lesson.title} → ${targetName}`);
    if (!dryRun) {
      await prisma.lesson.update({ where: { id: lesson.id }, data: { subTopicId: stId } });
    }
    lessonLinked++;
  }

  // ════════════════════════════════════════════════════════════════════════════
  // Part B — Questions
  // ════════════════════════════════════════════════════════════════════════════

  // Load all classifications into a Map
  const classifications = await prisma.questionTopicClassification.findMany({
    select: { questionId: true, topic: true, subtopic: true, keyConcept: true, confidence: true },
  });
  const classMap = new Map(classifications.map((c) => [c.questionId, c]));

  console.log(`\n── Linking questions (${classMap.size} classified) ──`);

  // Process in batches of 500
  const BATCH = 500;
  let offset = 0;
  let totalQuestions = 0;
  let hadClassification = 0;
  let matched = 0;
  let noMatch = 0;
  let noClassification = 0;

  // Track coverage per subject
  const subjectTotals   = new Map<string, number>();
  const subjectMatched  = new Map<string, number>();

  // Track unmatched classification subtopics
  const unmatchedCounts = new Map<string, number>();

  // Track pending updates for batching
  const pendingUpdates: { id: string; subTopicId: string }[] = [];

  const flush = async () => {
    if (dryRun || pendingUpdates.length === 0) {
      pendingUpdates.length = 0;
      return;
    }
    // Chunk into 100 per transaction
    for (let i = 0; i < pendingUpdates.length; i += 100) {
      const chunk = pendingUpdates.slice(i, i + 100);
      await prisma.$transaction(
        chunk.map((u) =>
          prisma.question.update({ where: { id: u.id }, data: { subTopicId: u.subTopicId } })
        )
      );
    }
    pendingUpdates.length = 0;
  };

  while (true) {
    const batch = await prisma.question.findMany({
      where: {
        competitionId: "science-bowl",
        deletedAt: null,
        ...(doReset ? {} : { subTopicId: null }),
      },
      select: { id: true, category: true, subTopicId: true },
      skip: offset,
      take: BATCH,
      orderBy: { createdAt: "asc" },
    });

    if (batch.length === 0) break;
    offset += batch.length;
    totalQuestions += batch.length;

    for (const q of batch) {
      // Track subject totals
      const subjectId = categoryToSubjectId[q.category];
      if (subjectId) {
        subjectTotals.set(subjectId, (subjectTotals.get(subjectId) ?? 0) + 1);
      }

      const cls = classMap.get(q.id);
      if (!cls) {
        noClassification++;
        continue;
      }
      hadClassification++;

      if (!subjectId) {
        noMatch++;
        const key = `[unknown category: ${q.category}]`;
        unmatchedCounts.set(key, (unmatchedCounts.get(key) ?? 0) + 1);
        continue;
      }

      const candidates = subTopicsBySubject.get(subjectId) ?? [];

      // Score each candidate
      let bestId: string | null = null;
      let bestScore = 0;

      for (const st of candidates) {
        let score = tokenOverlap(cls.subtopic, st.name);

        // Topic name bonus
        const topicBonus = tokenOverlap(cls.topic, st.topic.name);
        if (topicBonus > 0.3) score += 0.2;

        // Confidence multiplier
        score = score * (0.5 + 0.5 * cls.confidence);

        if (score > bestScore) {
          bestScore = score;
          bestId = st.id;
        }
      }

      // Fallback: try keyConcept against subtopic name
      if ((bestId === null || bestScore < 0.4) && cls.keyConcept) {
        let fallbackBestId: string | null = null;
        let fallbackBestScore = 0;
        for (const st of candidates) {
          const score = tokenOverlap(cls.keyConcept, st.name) * (0.5 + 0.5 * cls.confidence);
          if (score > fallbackBestScore) {
            fallbackBestScore = score;
            fallbackBestId = st.id;
          }
        }
        if (fallbackBestScore >= 0.4) {
          bestId = fallbackBestId;
          bestScore = fallbackBestScore;
        }
      }

      if (bestId && bestScore >= 0.4) {
        matched++;
        subjectMatched.set(subjectId, (subjectMatched.get(subjectId) ?? 0) + 1);
        pendingUpdates.push({ id: q.id, subTopicId: bestId });
      } else {
        noMatch++;
        const key = `"${cls.subtopic}"`;
        unmatchedCounts.set(key, (unmatchedCounts.get(key) ?? 0) + 1);
      }
    }

    await flush();
    process.stdout.write(`  processed ${offset} questions…\r`);
  }

  await flush(); // final flush

  // ════════════════════════════════════════════════════════════════════════════
  // Part C — Stats
  // ════════════════════════════════════════════════════════════════════════════

  const pct = hadClassification > 0 ? Math.round((matched / hadClassification) * 100) : 0;

  console.log("\n\n=== Lesson linking ===");
  console.log(`  Linked:  ${lessonLinked} / ${sbLessons.length}`);
  if (lessonSkipped > 0) console.log(`  Skipped: ${lessonSkipped}`);

  console.log("\n=== Question linking ===");
  console.log(`  Total science-bowl questions:  ${totalQuestions}`);
  console.log(`  Had classification:            ${hadClassification}`);
  console.log(`  Matched to SubTopic:           ${matched}  (${pct}% of classified)`);
  console.log(`  No match (subtopic unclear):   ${noMatch}`);
  console.log(`  No classification:             ${noClassification}`);

  if (unmatchedCounts.size > 0) {
    const top = [...unmatchedCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
    console.log("\n=== Top unmatched subtopics ===");
    for (const [label, count] of top) {
      console.log(`  ${label} → no match  (${count} questions)`);
    }
  }

  const subjectNames: Record<string, string> = {
    "subj--life-science":         "Life Science",
    "subj--physical-science":     "Physical Science",
    "subj--earth-space-science":  "Earth & Space Science",
    "subj--energy":               "Energy",
    "subj--mathematics":          "Mathematics",
  };
  console.log("\n=== Coverage by Subject ===");
  for (const [sid, name] of Object.entries(subjectNames)) {
    const total   = subjectTotals.get(sid) ?? 0;
    const matched = subjectMatched.get(sid) ?? 0;
    const pct = total > 0 ? Math.round((matched / total) * 100) : 0;
    console.log(`  ${name.padEnd(22)} ${matched} / ${total}  (${pct}%)`);
  }

  if (dryRun) console.log("\n(no changes written — pass --write to apply)");
  else console.log("\nDone.");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
