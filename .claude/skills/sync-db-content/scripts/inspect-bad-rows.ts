import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { QuestionFormat } from "@prisma/client";
import { getPrisma } from "../../../../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

async function main() {
  const prisma = getPrisma();

  const bad = await prisma.question.findMany({
    where: { format: QuestionFormat.MULTIPLE_CHOICE },
    select: {
      id: true,
      prompt: true,
      correctAnswer: true,
      answers: { select: { id: true, text: true, isCorrect: true, position: true }, orderBy: { position: "asc" } }
    },
    orderBy: { createdAt: "asc" },
    take: 10000
  });

  const wrong = bad.filter(q => q.answers.length !== 4);
  console.log(`Total with wrong answer count: ${wrong.length}\n`);

  for (const q of wrong) {
    console.log(`=== ${q.id} ===`);
    console.log(`prompt: ${q.prompt.slice(0, 300)}`);
    console.log(`correctAnswer: ${JSON.stringify(q.correctAnswer)}`);
    console.log(`answers (${q.answers.length}):`);
    for (const a of q.answers) {
      console.log(`  [${a.position}] isCorrect=${a.isCorrect} text=${JSON.stringify(a.text.slice(0, 80))}`);
    }
    console.log();
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
