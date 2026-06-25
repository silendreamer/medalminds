/**
 * fix-garbled.ts — fix or delete the 8 remaining garbled MC questions.
 *
 * FIXES (4): questions where the correct answer is knowable from science/math
 * DELETES (4): questions too broken to salvage (garbled equation, all-blank
 *              choices, missing prompt value, misclassified question type)
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { getPrisma } from "../../../../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

const dryRun = !process.argv.includes("--write");

type Fix = {
  action: "fix";
  id: string;
  reason: string;
  correctAnswer: string;
  choices: string[];
};
type Del = {
  action: "delete";
  id: string;
  reason: string;
};
type Operation = Fix | Del;

const OPERATIONS: Operation[] = [
  // ── FIXES ──────────────────────────────────────────────────────────────────

  {
    action: "fix",
    id: "osti-4decf2c51c213e6196a63e0d7e85dac80b38184214813c874bfb10ba51db7b4e",
    reason: "OTEC: minimum temp difference for commercial viability is 20°C (established threshold). X and Y choices were numbers that didn't survive PDF extraction.",
    correctAnswer: "20",
    choices: ["5", "20", "25", "50"]
  },

  {
    action: "fix",
    id: "osti-767c45c721247df03619c844579b3802ac365e5550b3d40ab547e0256b9e258f",
    reason: "Kepler T∝r^(3/2): T_A/T_B = 3^(3/2). Correct answer stored correctly. W choice was a symbol that didn't extract; adding '3' as a plausible distractor (naive ratio answer).",
    correctAnswer: "3 3/2 [three to the power of the quantity three over two]",
    choices: [
      "3",
      "3 1/2 [square root of 3]",
      "3 3/2 [three to the power of the quantity three over two]",
      "3 2/3 [three to the power of the quantity two over three]"
    ]
  },

  {
    action: "fix",
    id: "osti-9c8bf11e6f1c1b9e4f7ee42223f2983c2c4067d38cb4cbbaca42d9ed55468029",
    reason: "sin=0.3 → cos=√(1−0.09)=√0.91≈0.954. Stored answer '.91' was cos² not cos. Rebuilding with correct answer and realistic distractors.",
    correctAnswer: ".954",
    choices: [".09", ".7", ".91", ".954"]
  },

  {
    action: "fix",
    id: "osti-f49da4c7c566cc76daa507f22ef84693dfc14bcba7079fd0eb4e9c9bab3ff842",
    reason: "Work-energy: F·d=½mv_A², 2F·d=½mv_B² → v_B=√2·v_A. Stored answer 'V B = 2V A' was wrong. Adding correct answer and two missing choices.",
    correctAnswer: "V B = √2 V A",
    choices: ["V B = V A /2", "V B = V A", "V B = √2 V A", "V B = 2V A"]
  },

  // ── DELETES ────────────────────────────────────────────────────────────────

  {
    action: "delete",
    id: "osti-66f91bc6ecca50ef7fd30ce22d4b8a6e4b34d86d8815dd99161639351dde8511",
    reason: "Parallelogram area: stored answer '8' is wrong (correct is 8√3≈13.86). Only 1 answer row ever existed — likely a short-answer question misclassified as MC."
  },

  {
    action: "delete",
    id: "osti-7a21cb54a184a9d7ecc08f927c4068a6e1a79498b745477217efb0c859d3a80c",
    reason: "Hyperbola: equation completely garbled ('= 1' only), both answer rows have identical text (asymptote sign lost). Unrecoverable."
  },

  {
    action: "delete",
    id: "osti-734b513b6b66f35496e40f8bc951234c758913c6afac433fff567b0c9f59314b",
    reason: "Continuous function: all 4 choices were mathematical symbols — zero answer rows, empty correctAnswer. Completely unrecoverable."
  },

  {
    action: "delete",
    id: "osti-b8ff2cbcb9ea5a7564b8db5a9a8fca644b96a3dd768cefa43dbb0e5657ebd19e",
    reason: "Triangle side length: 'AC equal to [missing value]' — the AC value didn't survive PDF extraction, making the prompt unsolvable. Can't verify or reconstruct."
  }
];

async function main() {
  const prisma = getPrisma();

  if (dryRun) console.log("dry-run — pass --write to apply\n");

  let fixed = 0;
  let deleted = 0;

  for (const op of OPERATIONS) {
    console.log(`\n[${op.action.toUpperCase()}] ${op.id.slice(0, 20)}…`);
    console.log(`  ${op.reason}`);

    if (op.action === "fix") {
      console.log(`  correctAnswer: "${op.correctAnswer}"`);
      console.log(`  choices: ${op.choices.map((c, i) => `${["W","X","Y","Z"][i]}) ${c}`).join(" | ")}`);

      if (!dryRun) {
        await prisma.answer.deleteMany({ where: { questionId: op.id } });
        for (const [pos, text] of op.choices.entries()) {
          const isCorrect = text.trim().toLowerCase() === op.correctAnswer.trim().toLowerCase();
          await prisma.answer.create({
            data: {
              id: `${op.id}-g${pos}`,
              questionId: op.id,
              text,
              isCorrect,
              position: pos
            }
          });
        }
        await prisma.question.update({
          where: { id: op.id },
          data: { correctAnswer: op.correctAnswer }
        });
      }
      fixed++;
    } else {
      if (!dryRun) {
        await prisma.answer.deleteMany({ where: { questionId: op.id } });
        await prisma.question.delete({ where: { id: op.id } });
      }
      deleted++;
    }
  }

  console.log(`\n=== Done: ${fixed} fixed, ${deleted} deleted ===`);
  if (dryRun) console.log("(no changes written — pass --write to apply)");

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
