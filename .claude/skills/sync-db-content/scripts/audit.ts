/**
 * audit.ts — read-only report of content gaps and MC formatting issues.
 *
 * Checks:
 *   1. Local practiceQuestions not in DB (by id)
 *   2. Local lessons not in DB (by competitionSlug + slug)
 *   3. MC questions where Answer table has ≠ 4 rows
 *   4. MC questions where an Answer row contains "Answer:" in its text
 *   5. MC questions whose prompt still embeds inline W) X) Y) Z) choices
 *   6. MC questions with no Answer row marked isCorrect
 *
 * Usage:
 *   npx tsx .claude/skills/sync-db-content/scripts/audit.ts
 *   npx tsx .claude/skills/sync-db-content/scripts/audit.ts --competition=science-bowl
 *   npx tsx .claude/skills/sync-db-content/scripts/audit.ts --limit=500
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { QuestionFormat } from "@prisma/client";
import { getPrisma } from "../../../../src/lib/db";
import { practiceQuestions as localPracticeQuestions } from "../../../../src/data/practiceQuestions";
import { lessons as localLessons } from "../../../../src/data/lessons";

loadDotenv({ path: ".env.local", override: false, quiet: true });

function readArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const inline = process.argv.find((a) => a.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const idx = process.argv.indexOf(`--${name}`);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}

const filterCompetition = readArg("competition");
const limitArg = readArg("limit");
const LIMIT = limitArg ? parseInt(limitArg, 10) : 2000;

const INLINE_MC_PATTERN = /\bW\)\s+.+?\s+X\)\s+.+?\s+Y\)\s+.+?\s+Z\)\s+/is;

async function main() {
  const prisma = getPrisma();

  console.log("=== MedalMinds Content Audit ===\n");

  // ── 1. Local questions not in DB ──────────────────────────────────────────
  const filteredLocalQuestions = filterCompetition
    ? localPracticeQuestions.filter((q) => q.competitionSlug === filterCompetition)
    : localPracticeQuestions;

  const localQuestionIds = filteredLocalQuestions.map((q) => q.id);
  const dbQuestionIds = new Set(
    (
      await prisma.question.findMany({
        where: { id: { in: localQuestionIds } },
        select: { id: true }
      })
    ).map((q) => q.id)
  );

  const missingQuestions = filteredLocalQuestions.filter((q) => !dbQuestionIds.has(q.id));
  console.log(`[1] Local questions missing from DB: ${missingQuestions.length} / ${filteredLocalQuestions.length}`);
  if (missingQuestions.length > 0) {
    missingQuestions.slice(0, 10).forEach((q) => {
      console.log(`    - ${q.id}  (${q.competitionSlug} / ${q.category} / ${q.type})`);
    });
    if (missingQuestions.length > 10) console.log(`    ... and ${missingQuestions.length - 10} more`);
  }

  // ── 2. Local lessons not in DB ───────────────────────────────────────────
  const filteredLocalLessons = filterCompetition
    ? localLessons.filter((l) => l.competitionSlug === filterCompetition)
    : localLessons;

  const localLessonKeys = filteredLocalLessons.map((l) => `${l.competitionSlug}::${l.slug}`);
  const dbLessons = await prisma.lesson.findMany({
    where: {
      competitionId: filterCompetition
        ? filterCompetition
        : { in: [...new Set(filteredLocalLessons.map((l) => l.competitionSlug))] },
      slug: { in: filteredLocalLessons.map((l) => l.slug) }
    },
    select: { competitionId: true, slug: true }
  });
  const dbLessonKeys = new Set(dbLessons.map((l) => `${l.competitionId}::${l.slug}`));
  const missingLessons = filteredLocalLessons.filter((l) => !dbLessonKeys.has(`${l.competitionSlug}::${l.slug}`));

  console.log(`\n[2] Local lessons missing from DB: ${missingLessons.length} / ${filteredLocalLessons.length}`);
  if (missingLessons.length > 0) {
    missingLessons.forEach((l) => {
      console.log(`    - ${l.slug}  (${l.competitionSlug} / ${l.category})`);
    });
  }

  // ── 3–6. DB MC question audits ───────────────────────────────────────────
  const mcQuestions = await prisma.question.findMany({
    where: {
      format: QuestionFormat.MULTIPLE_CHOICE,
      ...(filterCompetition ? { competitionId: filterCompetition } : {})
    },
    select: {
      id: true,
      competitionId: true,
      category: true,
      prompt: true,
      answers: { select: { text: true, isCorrect: true } }
    },
    take: LIMIT,
    orderBy: { createdAt: "asc" }
  });

  const wrongAnswerCount: string[] = [];
  const answerTextContainsLabel: string[] = [];
  const inlineChoicesInPrompt: string[] = [];
  const correctAnswerMismatch: string[] = [];

  for (const q of mcQuestions) {
    if (q.answers.length !== 4) wrongAnswerCount.push(q.id);
    if (q.answers.some((a) => /answer\s*:/i.test(a.text))) answerTextContainsLabel.push(q.id);
    if (INLINE_MC_PATTERN.test(q.prompt)) inlineChoicesInPrompt.push(q.id);

    const hasCorrectRow = q.answers.some((a) => a.isCorrect);
    if (!hasCorrectRow) {
      correctAnswerMismatch.push(q.id);
    }
  }

  const total = mcQuestions.length;
  console.log(`\n[3] MC questions with wrong Answer row count (≠4): ${wrongAnswerCount.length} / ${total}`);
  wrongAnswerCount.slice(0, 5).forEach((id) => console.log(`    - ${id}`));
  if (wrongAnswerCount.length > 5) console.log(`    ... and ${wrongAnswerCount.length - 5} more`);

  console.log(`\n[4] MC questions with "Answer:" in answer text: ${answerTextContainsLabel.length} / ${total}`);
  answerTextContainsLabel.slice(0, 5).forEach((id) => console.log(`    - ${id}`));
  if (answerTextContainsLabel.length > 5) console.log(`    ... and ${answerTextContainsLabel.length - 5} more`);

  console.log(`\n[5] MC questions with inline W/X/Y/Z choices in prompt: ${inlineChoicesInPrompt.length} / ${total}`);
  inlineChoicesInPrompt.slice(0, 5).forEach((id) => console.log(`    - ${id}`));
  if (inlineChoicesInPrompt.length > 5) console.log(`    ... and ${inlineChoicesInPrompt.length - 5} more`);

  console.log(`\n[6] MC questions with no isCorrect Answer row: ${correctAnswerMismatch.length} / ${total}`);
  correctAnswerMismatch.slice(0, 5).forEach((id) => console.log(`    - ${id}`));
  if (correctAnswerMismatch.length > 5) console.log(`    ... and ${correctAnswerMismatch.length - 5} more`);

  console.log("\n=== Summary ===");
  console.log(`  Missing local questions:     ${missingQuestions.length}`);
  console.log(`  Missing local lessons:       ${missingLessons.length}`);
  console.log(`  MC wrong answer count:       ${wrongAnswerCount.length}`);
  console.log(`  MC label in answer text:     ${answerTextContainsLabel.length}`);
  console.log(`  MC inline choices in prompt: ${inlineChoicesInPrompt.length}`);
  console.log(`  MC no isCorrect row:         ${correctAnswerMismatch.length}`);
  console.log(`  (scanned ${total} MC questions, limit=${LIMIT})`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
