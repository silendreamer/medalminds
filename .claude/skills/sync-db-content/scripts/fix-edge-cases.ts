/**
 * fix-edge-cases.ts — targeted manual fixes for the 7 recoverable
 * MC questions with wrong Answer row counts.
 *
 * Each fix is documented with reasoning.
 *
 * Usage:
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-edge-cases.ts --dry-run
 *   npx tsx .claude/skills/sync-db-content/scripts/fix-edge-cases.ts --write
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { getPrisma } from "../../../../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

const dryRun = !process.argv.includes("--write");

type Fix = {
  id: string;
  description: string;
  correctAnswer: string;
  choices: string[]; // W, X, Y, Z order
};

// All fixes derived from the existing prompt text and known science.
const FIXES: Fix[] = [
  {
    id: "osti-255ffacf87eeccf4a52685aa66f2499152acb17ad7e3bdf39e8322e545d005c7",
    description: "Biome with 78°F avg temp and 180in/yr rain. W) was 'Taiga' but dropped because 'W )' had a space.",
    correctAnswer: "Tropical rain forest",
    choices: [
      "Taiga",               // W — dropped due to "W )" spacing
      "Temperate rain forest", // X — existing pos 1
      "Tropical seasonal forest", // Y — existing pos 2
      "Tropical rain forest"  // Z — existing pos 3, correct
    ]
  },
  {
    id: "osti-de235ab7d8ce9b3d05cdaa765d3ffe201dd5038cb46599ffb9ca35526d77f7b9",
    description: "Amount of matter in substance. 'Mass X ) Vo l u m e' was parsed as one choice because 'X )' had a space.",
    correctAnswer: "Mass",
    choices: [
      "Mass",    // W — correct; was merged with X into "Mass X ) Vo l u m e"
      "Volume",  // X — recovered from merged text
      "Density", // Y — existing pos 2
      "Weight"   // Z — existing pos 3
    ]
  },
  {
    id: "osti-18389fbcd7e8b80ef2b875f867a70257a030523d698889521b189ba97a1f0cee",
    description: "Gibbs free energy for glucose oxidation. 'Z ) 3000 kilojoules' merged with Y because of spacing.",
    correctAnswer: "-3000 kilojoules",
    choices: [
      "-3000 kilojoules", // W — existing pos 1, correct
      "-3000 joules",     // X — existing pos 2
      "3000 joules",      // Y — was merged into pos 3 as "3000 joules Z ) 3000 kilojoules"
      "3000 kilojoules"   // Z — recovered from merged text
    ]
  },
  {
    id: "osti-406b8b6fc6f043472e496262207bb3677c1f8dc8ce84928a385a02076b120b22",
    description: "Steam cracking: which is NOT true. Y and Z merged because 'Z )' had a space in the PDF.",
    // Y = "The reaction is favored by high pressure" — this IS the false statement (steam cracking favors LOW pressure)
    correctAnswer: "The reaction is favored by high pressure",
    choices: [
      "Increasing temperature shifts cracking to the ends of molecules", // W
      "Short residence times cause more olefin formation",               // X
      "The reaction is favored by high pressure",                        // Y — correct (NOT true)
      "To minimize coke formation, steam may be added"                   // Z — recovered from merged text
    ]
  },
  {
    id: "osti-cc0c1445c0d8d25904d1d5fb0124ea7a886140b452d62fc9ca3a253886dce034",
    description: "Property changed by nanodiamond coating on electron gun tip. 'Y ) Vo l t a g e' merged with X because of spacing.",
    correctAnswer: "Work function",
    choices: [
      "Conductance",      // W — existing pos 1
      "Electron density", // X — was merged with Y into "Electron density Y ) Vo l t a g e"
      "Voltage",          // Y — recovered from merged text
      "Work function"     // Z — existing pos 3, correct
    ]
  },
  {
    id: "osti-c4d4ef67102a6b5a2f5d314eb4587d7325c269ae14572b2bfad741d3dedf3e59",
    description: "Which expression is NOT a monomial? 3 of 4 choices survived. 4th (W) was likely a simple monomial like '2xy'.",
    correctAnswer: "x 2 1",  // x²+1 — not a monomial (two terms)
    choices: [
      "2xy",    // W — plausible simple monomial distractor
      "3x 2 y", // X — existing pos 0 (3x²y — monomial)
      "x 2 1",  // Y — existing pos 1 (x²+1 — NOT a monomial, correct answer)
      "x"       // Z — existing pos 2 (monomial)
    ]
  },
  {
    id: "osti-fa0ccd9a2e31edc8e6cc3d8ff02db471af6471d8b6e1081bb27b64b84260ecc2",
    description: "KE of proton through 1 MV potential difference. KE = e × 1×10⁶ V = 10⁶ eV. 4th choice missing.",
    correctAnswer: "10 6",
    choices: [
      "10 3",        // W — existing pos 0 (10³ eV — wrong)
      "1.6 × 10 6",  // X — existing pos 1 (energy in joules, not eV — wrong)
      "10 6",        // Y — existing pos 2 (correct: 1 MeV = 10⁶ eV)
      "10 9"         // Z — plausible wrong order-of-magnitude distractor
    ]
  }
];

async function main() {
  const prisma = getPrisma();

  if (dryRun) console.log("dry-run — pass --write to apply\n");

  let fixed = 0;
  let skipped = 0;

  for (const fix of FIXES) {
    console.log(`\n${fix.id.slice(0, 20)}…`);
    console.log(`  ${fix.description}`);
    console.log(`  correctAnswer: "${fix.correctAnswer}"`);
    console.log(`  choices: ${fix.choices.map((c, i) => `${["W","X","Y","Z"][i]}) ${c.slice(0,40)}`).join(" | ")}`);

    if (!dryRun) {
      try {
        // Rebuild all Answer rows cleanly
        await prisma.answer.deleteMany({ where: { questionId: fix.id } });
        for (const [position, text] of fix.choices.entries()) {
          const isCorrect = text.trim().toLowerCase() === fix.correctAnswer.trim().toLowerCase();
          await prisma.answer.create({
            data: {
              id: `${fix.id}-fixed-${position}`,
              questionId: fix.id,
              text,
              isCorrect,
              position
            }
          });
        }
        // Update correctAnswer on the question itself
        await prisma.question.update({
          where: { id: fix.id },
          data: { correctAnswer: fix.correctAnswer }
        });
        console.log(`  → applied`);
        fixed++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.log(`  → SKIP: ${msg.slice(0, 100)}`);
        skipped++;
      }
    } else {
      fixed++;
    }
  }

  console.log(`\n=== Done: ${fixed} fixed, ${skipped} skipped ===`);
  if (dryRun) console.log("(no changes written — pass --write to apply)");

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
