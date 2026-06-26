import "dotenv/config";
import { config as loadDotenv } from "dotenv";
loadDotenv({ path: ".env.local", override: false });
import { getPrisma } from "../src/lib/db";

const CATEGORY_TO_SUBJECT: Record<string, string> = {
  "Biology": "Life Science", "Life Science": "Life Science",
  "Chemistry": "Physical Science", "Physics": "Physical Science", "Physical Science": "Physical Science",
  "Earth and Space Science": "Earth and Space Science", "Earth & Space Science": "Earth and Space Science",
  "Energy": "Energy",
  "Math": "Math",
  "General Science": "General Science",
};

async function main() {
  const prisma = getPrisma();
  const rows = await prisma.$queryRawUnsafe<{ category: string; total: bigint; linked: bigint }[]>(
    `SELECT category, COUNT(*) as total, COUNT("subTopicId") as linked
     FROM "Question"
     WHERE "competitionId" = 'science-bowl' AND "deletedAt" IS NULL
     GROUP BY category ORDER BY category`
  );

  const bySubject: Record<string, { total: number; linked: number }> = {};
  for (const r of rows) {
    const subj = CATEGORY_TO_SUBJECT[r.category] ?? `Unknown (${r.category})`;
    if (!bySubject[subj]) bySubject[subj] = { total: 0, linked: 0 };
    bySubject[subj].total  += Number(r.total);
    bySubject[subj].linked += Number(r.linked);
  }

  let grandTotal = 0, grandLinked = 0;
  for (const [subj, { total, linked }] of Object.entries(bySubject).sort()) {
    const pct = total > 0 ? Math.round(linked / total * 100) : 0;
    console.log(`${subj.padEnd(26)} ${String(linked).padStart(5)} / ${total}  (${pct}%)`);
    grandTotal += total; grandLinked += linked;
  }
  console.log("─".repeat(50));
  const totalPct = grandTotal > 0 ? Math.round(grandLinked / grandTotal * 100) : 0;
  console.log(`${"TOTAL".padEnd(26)} ${String(grandLinked).padStart(5)} / ${grandTotal}  (${totalPct}%)`);
  await prisma.$disconnect();
}

main().catch(console.error);
