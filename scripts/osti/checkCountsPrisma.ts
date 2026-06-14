import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED ?? '0';
import { getPrisma } from '../../src/lib/db';

async function main() {
  const prisma = getPrisma();
  try {
    const qCount = await prisma.question.count();
    const aCount = await prisma.answer.count();
    console.log('prisma counts -> questions:', qCount, 'answers:', aCount);
    process.exit(0);
  } catch (e) {
    console.error('Prisma query error:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
