/**
 * sync-local.ts — upsert questions from src/data/practiceQuestions.ts into the DB.
 *
 * For each question in the local data file:
 *   - If not in DB, create it (plus Answer rows for MC questions).
 *   - If already in DB, update its fields (and recreate Answer rows for MC).
 *
 * Usage:
 *   npx tsx .claude/skills/sync-db-content/scripts/sync-local.ts --dry-run
 *   npx tsx .claude/skills/sync-db-content/scripts/sync-local.ts --write
 *   npx tsx .claude/skills/sync-db-content/scripts/sync-local.ts --write --competition=science-bowl
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { Difficulty, QuestionFormat } from "@prisma/client";
import { getPrisma } from "../../../../src/lib/db";
import { practiceQuestions as localPracticeQuestions } from "../../../../src/data/practiceQuestions";
import type { PracticeQuestion } from "../../../../src/types";

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

function toDbDifficulty(d: PracticeQuestion["difficulty"]): Difficulty {
  if (d === "Foundational") return Difficulty.FOUNDATIONAL;
  if (d === "Advanced") return Difficulty.ADVANCED;
  return Difficulty.INTERMEDIATE;
}

function toDbFormat(t: PracticeQuestion["type"]): QuestionFormat {
  return t === "multiple_choice" ? QuestionFormat.MULTIPLE_CHOICE : QuestionFormat.SHORT_ANSWER;
}

function levelIdFor(competitionSlug: string, level: string): string | undefined {
  const slug = level.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const id = `${competitionSlug}-${slug}`;
  const knownIds = new Set([
    "science-bowl-middle-school",
    "science-bowl-high-school",
    "science-bowl-mixed-bowl-prep",
    "science-olympiad-division-b",
    "science-olympiad-division-c",
    "science-olympiad-event-foundation",
    "math-olympiad-intro-olympiad",
    "math-olympiad-olympiad-builder"
  ]);
  return knownIds.has(id) ? id : undefined;
}

async function main() {
  const prisma = getPrisma();

  const questions = filterCompetition
    ? localPracticeQuestions.filter((q) => q.competitionSlug === filterCompetition)
    : localPracticeQuestions;

  console.log(`sync-local: ${questions.length} local questions${filterCompetition ? ` (${filterCompetition})` : ""}`);
  if (dryRun) console.log("dry-run mode — pass --write to apply changes\n");

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const q of questions) {
    const existing = await prisma.question.findUnique({ where: { id: q.id }, select: { id: true } });
    const format = toDbFormat(q.type);
    const difficulty = toDbDifficulty(q.difficulty);
    const levelId = levelIdFor(q.competitionSlug, q.level);

    const questionData = {
      competitionId: q.competitionSlug,
      levelId: levelId ?? null,
      category: q.category,
      level: q.level,
      difficulty,
      format,
      prompt: q.prompt,
      correctAnswer: q.correctAnswer,
      alternateAnswers: q.alternateAnswers ?? [],
      explanation: q.explanation
    };

    if (!existing) {
      console.log(`  CREATE ${q.id}  (${q.competitionSlug}/${q.category}/${q.type})`);
      if (!dryRun) {
        await prisma.question.create({
          data: { id: q.id, ...questionData }
        });

        if (format === QuestionFormat.MULTIPLE_CHOICE && q.choices) {
          const allChoices = [...new Set([...q.choices])];
          for (const [position, text] of allChoices.entries()) {
            const isCorrect = text.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
            await prisma.answer.upsert({
              where: { questionId_text: { questionId: q.id, text } },
              update: { isCorrect, position },
              create: { id: `${q.id}-a${position}`, questionId: q.id, text, isCorrect, position }
            });
          }
        }
      }
      created++;
    } else {
      console.log(`  UPDATE ${q.id}`);
      if (!dryRun) {
        await prisma.question.update({
          where: { id: q.id },
          data: questionData
        });

        if (format === QuestionFormat.MULTIPLE_CHOICE && q.choices) {
          await prisma.answer.deleteMany({ where: { questionId: q.id } });
          const allChoices = [...new Set([...q.choices])];
          for (const [position, text] of allChoices.entries()) {
            const isCorrect = text.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
            await prisma.answer.create({
              data: { id: `${q.id}-a${position}`, questionId: q.id, text, isCorrect, position }
            });
          }
        }
      }
      updated++;
    }
  }

  console.log(`\nDone: ${created} created, ${updated} updated, ${skipped} skipped`);
  if (dryRun) console.log("(no changes written — pass --write to apply)");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
