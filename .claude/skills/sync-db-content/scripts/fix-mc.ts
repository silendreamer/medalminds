/**
 * fix-mc.ts — repair multiple-choice formatting in the DB.
 *
 * NOTE: Obsolete after migration 0016_v2_architecture. The Question.correctAnswer
 * and Question.choices columns no longer exist. This script is kept for reference.
 *
 * Fixes three classes of problems:
 *
 *   A) Answer rows with "Answer: X" labels in their text
 *      → strip the label, keep only the choice text
 *
 *   B) Prompt still contains inline W) X) Y) Z) choices
 *      → strip the inline block from the prompt regardless of answer row state
 *
 *   C) correctAnswer is stored as a letter (W/X/Y/Z) instead of full text
 *      → resolve the letter to the matching choice text using the inline block
 *        or the existing Answer rows; update correctAnswer and ensure the
 *        matching Answer row has isCorrect = true
 *
 *   D) MC questions with fewer than 4 Answer rows
 *      → parse choices from the inline block and create the missing rows
 *
 * Usage:
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --dry-run
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write --limit=500
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write --competition=science-bowl --limit=5000
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { QuestionFormat } from "@prisma/client";
import { getPrisma } from "../../../../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

function readArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const inline = process.argv.find((a) => a.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const idx = process.argv.indexOf(`--${name}`);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}

const dryRun = !process.argv.includes("--write");
const filterCompetition = readArg("competition");
const limitArg = readArg("limit");
const LIMIT = limitArg ? parseInt(limitArg, 10) : 5000;

const LETTER_ANSWER = /^[WXYZ]$/i;
const INLINE_MC_PATTERN = /\bW\)\s+.+?\s+X\)\s+.+?\s+Y\)\s+.+?\s+Z\)\s+/is;

function cleanChoiceText(text: string): string {
  return text
    .replace(/\s*ANSWER\s*:\s*.*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Parse "stem W) w X) x Y) y Z) z" → { stem, letterToText }
function parseInlineBlock(prompt: string): {
  stem: string;
  letterToText: Record<string, string>;
} | null {
  const match = prompt.match(
    /^([\s\S]*?)\s+W\)\s+([\s\S]+?)\s+X\)\s+([\s\S]+?)\s+Y\)\s+([\s\S]+?)\s+Z\)\s+([\s\S]+?)\s*$/i
  );
  if (!match) return null;

  const [, stem, w, x, y, z] = match;
  return {
    stem: stem.trim(),
    letterToText: {
      W: cleanChoiceText(w),
      X: cleanChoiceText(x),
      Y: cleanChoiceText(y),
      Z: cleanChoiceText(z)
    }
  };
}

async function main() {
  const prisma = getPrisma();

  if (dryRun) console.log("dry-run mode — pass --write to apply changes\n");

  const mcQuestions = await prisma.question.findMany({
    where: {
      format: QuestionFormat.MULTIPLE_CHOICE,
      ...(filterCompetition ? { competitionId: filterCompetition } : {})
    },
    include: {
      answers: { orderBy: { position: "asc" } }
    },
    take: LIMIT,
    orderBy: { createdAt: "asc" }
  });

  console.log(`Loaded ${mcQuestions.length} MC questions (limit=${LIMIT})\n`);

  let fixedLabel = 0;
  let fixedPrompt = 0;
  let fixedCorrectAnswer = 0;
  let fixedAnswerRows = 0;
  let alreadyOk = 0;
  const skipped: string[] = [];

  for (const q of mcQuestions) {
    const changes: string[] = [];
    try {

    // ── Fix A: strip "Answer:" labels from Answer rows ──────────────────────
    for (const answer of q.answers) {
      if (/answer\s*:/i.test(answer.text)) {
        const cleaned = cleanChoiceText(answer.text);
        if (cleaned && cleaned !== answer.text) {
          changes.push(`label:"${answer.text.slice(0, 40)}"→"${cleaned.slice(0, 40)}"`);
          if (!dryRun) {
            await prisma.answer.update({
              where: { id: answer.id },
              data: { text: cleaned }
            });
          }
          fixedLabel++;
        }
      }
    }

    // ── Parse inline block if present ────────────────────────────────────────
    const hasInline = INLINE_MC_PATTERN.test(q.prompt);
    const parsed = hasInline ? parseInlineBlock(q.prompt) : null;

    // ── Fix B: strip inline block from prompt ────────────────────────────────
    if (hasInline && parsed) {
      changes.push(`strip-prompt`);
      if (!dryRun) {
        await prisma.question.update({
          where: { id: q.id },
          data: { prompt: parsed.stem }
        });
      }
      fixedPrompt++;
    }

    // ── Fix C: strip trailing "ANSWER: ..." garbage from correctAnswer ──────
    const cleanedCA = cleanChoiceText(q.correctAnswer);
    if (cleanedCA && cleanedCA !== q.correctAnswer) {
      changes.push(`clean-ca:"${q.correctAnswer.slice(0, 40)}"→"${cleanedCA.slice(0, 40)}"`);
      if (!dryRun) {
        await prisma.question.update({
          where: { id: q.id },
          data: { correctAnswer: cleanedCA }
        });
      }
      fixedCorrectAnswer++;
    }
    const effectiveCA = cleanedCA || q.correctAnswer;

    // ── Fix D: resolve letter-based correctAnswer → full text ────────────────
    const correctLetter = effectiveCA.trim().toUpperCase();
    if (LETTER_ANSWER.test(correctLetter)) {
      // Source priority:
      //   1. inline block letter mapping (if block still in prompt)
      //   2. existing Answer row marked isCorrect = true (if block already stripped)
      const letterToText = parsed?.letterToText;
      const resolvedFromBlock = letterToText?.[correctLetter];
      const existingCorrectRow = q.answers.find((a) => a.isCorrect);
      const correctText = resolvedFromBlock ?? existingCorrectRow?.text;

      if (correctText) {
        changes.push(`correctAnswer:"${correctLetter}"→"${correctText.slice(0, 40)}"`);
        if (!dryRun) {
          await prisma.question.update({
            where: { id: q.id },
            data: { correctAnswer: correctText }
          });

          // Ensure the matching Answer row is marked isCorrect = true
          const matchingRow = q.answers.find(
            (a) => a.text.trim().toLowerCase() === correctText.trim().toLowerCase()
          );
          if (matchingRow && !matchingRow.isCorrect) {
            await prisma.answer.update({
              where: { id: matchingRow.id },
              data: { isCorrect: true }
            });
          }
        }
        fixedCorrectAnswer++;
      } else {
        changes.push(`WARN: letter "${correctLetter}" but no text found`);
      }
    }

    // ── Fix E: create Answer rows when missing/wrong count ───────────────────
    if (q.answers.length !== 4 && parsed) {
      const { letterToText } = parsed;
      const correctText =
        LETTER_ANSWER.test(correctLetter)
          ? letterToText[correctLetter]
          : effectiveCA.trim();

      changes.push(`rebuild-answers(${q.answers.length}→4)`);
      if (!dryRun) {
        await prisma.answer.deleteMany({ where: { questionId: q.id } });
        const choices = [
          letterToText["W"],
          letterToText["X"],
          letterToText["Y"],
          letterToText["Z"]
        ];
        for (const [position, text] of choices.entries()) {
          if (!text) continue;
          const isCorrect = text.trim().toLowerCase() === correctText?.trim().toLowerCase();
          await prisma.answer.create({
            data: {
              id: `${q.id}-a${position}`,
              questionId: q.id,
              text,
              isCorrect,
              position
            }
          });
        }
      }
      fixedAnswerRows++;
    }

    if (changes.length > 0) {
      console.log(`  ${q.id.slice(0, 16)}…  ${changes.join(" | ")}`);
    } else {
      alreadyOk++;
    }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  SKIP ${q.id.slice(0, 16)}…  error: ${msg.split("\n")[0].slice(0, 80)}`);
      skipped.push(q.id);
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`  Label fixes:            ${fixedLabel}`);
  console.log(`  Prompt stripped:        ${fixedPrompt}`);
  console.log(`  correctAnswer cleaned:  ${fixedCorrectAnswer}`);
  console.log(`  Answer rows rebuilt:    ${fixedAnswerRows}`);
  console.log(`  Already ok:             ${alreadyOk}`);
  console.log(`  Skipped (errors):       ${skipped.length}`);
  if (skipped.length > 0) skipped.forEach((id) => console.log(`    - ${id}`));
  if (dryRun) console.log("\n(no changes written — pass --write to apply)");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
