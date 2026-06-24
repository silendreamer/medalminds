/**
 * validate.ts — AI-assisted answer correctness check.
 *
 * For each sampled question, asks OpenAI: "Is this correctAnswer right for this prompt?"
 * Flags any question where the model is uncertain or disagrees.
 * Output is a JSON report at the end showing flagged questions.
 *
 * Uses the same approach as scripts/generate-answer-explanations.ts.
 *
 * Usage:
 *   npx tsx .claude/skills/sync-db-content/scripts/validate.ts --dry-run
 *   npx tsx .claude/skills/sync-db-content/scripts/validate.ts --limit=50
 *   npx tsx .claude/skills/sync-db-content/scripts/validate.ts --limit=200 --competition=science-bowl --model=gpt-4o-mini
 *
 * Env required:
 *   OPENAI_API_KEY
 *   DATABASE_URL (or equivalent)
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

const dryRun = process.argv.includes("--dry-run");
const filterCompetition = readArg("competition");
const limitArg = readArg("limit");
const LIMIT = limitArg ? parseInt(limitArg, 10) : 50;
const MODEL = readArg("model") ?? "gpt-4o-mini";

type ValidationResult = {
  correct: boolean;
  confidence: "high" | "medium" | "low";
  issue?: string;
  needsReview: boolean;
};

function buildPrompt(question: {
  competitionId: string;
  category: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
}): string {
  return `You are fact-checking answer keys for Medal Minds, an academic competition prep platform.

Determine whether the provided correctAnswer is actually correct for this question.

Question:
- Competition: ${question.competitionId}
- Category: ${question.category}
- Prompt: ${question.prompt}
${question.choices.length > 0 ? `- Choices: ${question.choices.map((c, i) => `${["W","X","Y","Z"][i]}) ${c}`).join(", ")}` : ""}
- Correct Answer: ${question.correctAnswer}

Instructions:
- Verify the factual accuracy of correctAnswer against the question prompt.
- If it is a multiple choice question, also confirm the answer is one of the provided choices.
- If the answer is a letter (W/X/Y/Z), map it to the choice text and verify that choice is correct.
- Set needsReview to true if you are unsure or if the answer seems wrong.
- Output only valid JSON.

Output schema:
{
  "correct": boolean,
  "confidence": "high" | "medium" | "low",
  "issue": string | null,
  "needsReview": boolean
}`;
}

async function validateQuestion(question: {
  id: string;
  competitionId: string;
  category: string;
  prompt: string;
  choices: string[];
  correctAnswer: string;
}): Promise<ValidationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You fact-check academic competition answer keys. Respond only with JSON."
        },
        {
          role: "user",
          content: buildPrompt(question)
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "validation_result",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["correct", "confidence", "issue", "needsReview"],
            properties: {
              correct: { type: "boolean" },
              confidence: { type: "string", enum: ["high", "medium", "low"] },
              issue: { type: ["string", "null"] },
              needsReview: { type: "boolean" }
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  return JSON.parse(content) as ValidationResult;
}

async function main() {
  const prisma = getPrisma();

  if (dryRun) console.log("dry-run mode — will show questions but not call OpenAI\n");
  console.log(`Validating up to ${LIMIT} questions with ${MODEL}${filterCompetition ? ` (${filterCompetition})` : ""}...\n`);

  const questions = await prisma.question.findMany({
    where: {
      ...(filterCompetition ? { competitionId: filterCompetition } : {})
    },
    include: {
      answers: { where: { isCorrect: false }, orderBy: { position: "asc" } }
    },
    take: LIMIT,
    orderBy: { createdAt: "asc" }
  });

  type FlaggedItem = {
    id: string;
    competitionId: string;
    category: string;
    prompt: string;
    correctAnswer: string;
    result: ValidationResult;
  };

  const flagged: FlaggedItem[] = [];
  let checked = 0;
  let errors = 0;

  for (const q of questions) {
    const choices = q.format === QuestionFormat.MULTIPLE_CHOICE
      ? q.answers.map((a) => a.text)
      : [];

    if (dryRun) {
      console.log(`[dry-run] ${q.id} — "${q.prompt.slice(0, 80)}..." → ${q.correctAnswer}`);
      checked++;
      continue;
    }

    process.stdout.write(`  Checking ${q.id}... `);
    try {
      const result = await validateQuestion({
        id: q.id,
        competitionId: q.competitionId,
        category: q.category,
        prompt: q.prompt,
        choices,
        correctAnswer: q.correctAnswer
      });

      if (!result.correct || result.needsReview || result.confidence === "low") {
        process.stdout.write(`⚠ FLAG (${result.confidence}, correct=${result.correct})\n`);
        flagged.push({ id: q.id, competitionId: q.competitionId, category: q.category, prompt: q.prompt, correctAnswer: q.correctAnswer, result });
      } else {
        process.stdout.write(`✓\n`);
      }
      checked++;
    } catch (err) {
      process.stdout.write(`ERROR: ${err}\n`);
      errors++;
    }

    // Brief pause to respect rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nChecked: ${checked}, Flagged: ${flagged.length}, Errors: ${errors}`);

  if (flagged.length > 0) {
    console.log("\n=== Flagged Questions ===");
    for (const item of flagged) {
      console.log(`\n${item.id} (${item.competitionId}/${item.category})`);
      console.log(`  Prompt: ${item.prompt.slice(0, 120)}`);
      console.log(`  Correct answer: ${item.correctAnswer}`);
      console.log(`  AI verdict: correct=${item.result.correct}, confidence=${item.result.confidence}`);
      if (item.result.issue) console.log(`  Issue: ${item.result.issue}`);
    }
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
