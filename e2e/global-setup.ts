import path from "node:path";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "better-auth/crypto";

// AUTH-072: seeds ONE verified test user directly via Prisma so the e2e spec
// never has to drive the email-verification loop (that loop is covered by
// the manual QA script, AUTH-073, against the console email transport).
//
// This talks to a REAL local PostgreSQL database — it is intentionally not
// part of `npm test` (see test/setup.ts, which deletes all DB env vars for
// the hermetic Vitest suite). Run only via `npm run test:e2e`.
//
// Password hashing: Better Auth's scrypt hasher is exported from the
// `better-auth/crypto` subpath as `hashPassword`. Using this (rather than a
// hand-rolled hash) guarantees the seeded row is verifiable by the real
// sign-in flow, and keeps us honest to AUTH_SECURITY_PLAN.md §1 ("MUST NOT
// configure a custom/weaker hasher") even in test fixtures.
export const E2E_TEST_USER = {
  email: "e2e-test@medalminds.local",
  password: "E2E-Test-Password-1",
  name: "E2E Test User",
};

async function globalSetup() {
  // `next dev` (started by Playwright's webServer) loads .env.local on its
  // own via Next's built-in env loading. This script runs outside of Next,
  // so it needs to load the same file itself to find DATABASE_URL.
  dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

  const databaseUrl =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_NON_POOLING;

  if (!databaseUrl) {
    throw new Error(
      "e2e/global-setup.ts: no DATABASE_URL (or POSTGRES_* fallback) found in .env.local. " +
        "The e2e suite requires a real local PostgreSQL database — see AUTH_TEST_PLAN.md Layer 2."
    );
  }

  // Mirror src/lib/db.ts::getPrisma(): strip `sslmode` from the connection
  // string before handing it to `pg`'s Pool (the pg driver's own sslmode
  // parsing disagrees with some hosted Postgres providers' certs) and only
  // relax certificate verification when explicitly opted in.
  const poolConnectionString = new URL(databaseUrl);
  poolConnectionString.searchParams.delete("sslmode");
  const poolOptions: import("pg").PoolConfig = { connectionString: poolConnectionString.toString() };
  if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
    poolOptions.ssl = { rejectUnauthorized: false };
  }

  const { Pool } = await import("pg");
  const adapter = new PrismaPg(new Pool(poolOptions));
  const prisma = new PrismaClient({ adapter });

  try {
    const passwordHash = await hashPassword(E2E_TEST_USER.password);

    const user = await prisma.user.upsert({
      where: { email: E2E_TEST_USER.email },
      update: {
        name: E2E_TEST_USER.name,
        emailVerified: true,
        role: "STUDENT",
      },
      create: {
        id: crypto.randomUUID(),
        email: E2E_TEST_USER.email,
        name: E2E_TEST_USER.name,
        emailVerified: true,
        role: "STUDENT",
      },
    });

    // Clear out any stale sessions from a previous run so each e2e run
    // starts from a clean "logged out" state, and reset any prior password.
    await prisma.session.deleteMany({ where: { userId: user.id } });

    await prisma.account.upsert({
      where: { providerId_accountId: { providerId: "credential", accountId: user.id } },
      update: { password: passwordHash },
      create: {
        id: crypto.randomUUID(),
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: passwordHash,
      },
    });

    console.log(`[e2e/global-setup] seeded verified test user: ${E2E_TEST_USER.email}`);
  } finally {
    await prisma.$disconnect();
  }
}

export default globalSetup;
