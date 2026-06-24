/**
 * fix-mc.ts — repair multiple-choice formatting in the DB.
 *
 * Fixes two classes of problems:
 *
 *   A) Answer rows with "Answer: X" labels in their text
 *      → strip the label, keep only the choice text
 *
 *   B) MC questions whose prompt embeds inline W) X) Y) Z) choices
 *      and has fewer than 4 proper Answer rows
 *      → parse the W/X/Y/Z block out of the prompt, create Answer rows,
 *        strip the inline block from the prompt
 *
 * Usage:
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --dry-run
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write --limit=100
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write --competition=science-bowl
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
const LIMIT = limitArg ? parseInt(limitArg, 10) : 500;

// Parse inline "W) ... X) ... Y) ... Z) ..." block from a prompt.
// Returns { choices: string[], cleanPrompt: string } or null if pattern not found.
function parseInlineChoices(prompt: string, correctAnswer: string): {
  choices: [string, string, string, string];
  correctLetter: string;
  cleanPrompt: string;
} | null {
  // Match the block starting with W) through end of string
  const match = prompt.match(/^([\s\S]*?)\s+W\)\s+([\s\S]+?)\s+X\)\s+([\s\S]+?)\s+Y\)\s+([\s\S]+?)\s+Z\)\s+([\s\S]+?)\s*$/i);
  if (!match) return null;

  const [, stem, w, x, y, z] = match;
  const choices: [string, string, string, string] = [
    cleanChoiceText(w),
    cleanChoiceText(x),
    cleanChoiceText(y),
    cleanChoiceText(z)
  ];

  // Determine which letter is correct based on correctAnswer
  const answerLetter = correctAnswer.trim().toUpperCase();
  const letterMap: Record<string, string> = { W: choices[0], X: choices[1], Y: choices[2], Z: choices[3] };

  return {
    choices,
    correctLetter: answerLetter in letterMap ? answerLetter : "W",
    cleanPrompt: stem.replace(/\s+$/, "")
  };
}

function cleanChoiceText(text: string): string {
  return text
    .replace(/\s*ANSWER\s*:\s*.*/i, "")
    .replace(/\s+/g, " ")
    .trim();
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

  let fixedLabelCount = 0;
  let fixedInlineCount = 0;
  let alreadyOk = 0;

  for (const q of mcQuestions) {
    // ── Fix A: strip "Answer:" labels from existing Answer rows ──────────────
    const labelled = q.answers.filter((a) => /answer\s*:/i.test(a.text));
    if (labelled.length > 0) {
      for (const answer of labelled) {
        const cleaned = cleanChoiceText(answer.text);
        if (cleaned && cleaned !== answer.text) {
          console.log(`  FIX-A ${q.id}: "${answer.text.slice(0, 60)}" → "${cleaned}"`);
          if (!dryRun) {
            await prisma.answer.update({
              where: { id: answer.id },
              data: { text: cleaned }
            });
          }
          fixedLabelCount++;
        }
      }
    }

    // ── Fix B: parse inline W/X/Y/Z from prompt ──────────────────────────────
    const hasInline = /\bW\)\s+.+?\s+X\)\s+.+?\s+Y\)\s+.+?\s+Z\)\s+/is.test(q.prompt);
    const hasGoodAnswers = q.answers.length === 4 && q.answers.every((a) => !/answer\s*:/i.test(a.text));

    if (hasInline && !hasGoodAnswers) {
      const parsed = parseInlineChoices(q.prompt, q.correctAnswer);
      if (!parsed) {
        console.log(`  SKIP ${q.id}: inline pattern found but couldn't parse`);
        continue;
      }

      const { choices, correctLetter, cleanPrompt } = parsed;
      const letterToChoice: Record<string, string> = {
        W: choices[0], X: choices[1], Y: choices[2], Z: choices[3]
      };
      const correctChoiceText = letterToChoice[correctLetter] ?? choices[0];

      console.log(`  FIX-B ${q.id}: extract ${choices.length} choices, correct="${correctChoiceText.slice(0, 40)}"`);
      if (!dryRun) {
        await prisma.answer.deleteMany({ where: { questionId: q.id } });
        for (const [position, text] of choices.entries()) {
          const isCorrect = text.trim().toLowerCase() === correctChoiceText.trim().toLowerCase();
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
        await prisma.question.update({
          where: { id: q.id },
          data: {
            prompt: cleanPrompt,
            correctAnswer: correctChoiceText
          }
        });
      }
      fixedInlineCount++;
    } else if (!hasInline && q.answers.length === 4) {
      alreadyOk++;
    }
  }

  console.log(`\nDone (${LIMIT} limit): ${fixedLabelCount} label fixes, ${fixedInlineCount} inline parses, ${alreadyOk} already ok`);
  if (dryRun) console.log("(no changes written — pass --write to apply)");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
