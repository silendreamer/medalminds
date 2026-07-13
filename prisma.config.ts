import path from "node:path";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma 7 CLI commands (migrate/validate/studio) no longer read a
// datasource `url` from schema.prisma — that block intentionally has none
// (see AUTH_DATABASE_PLAN.md; the URL flows through the pg driver adapter
// at runtime via src/lib/db.ts::getPrisma()). This file supplies a URL for
// CLI/migration purposes only; it does not affect the runtime client.
dotenv.config({ path: path.join(__dirname, ".env.local") });

// Prefer a direct (non-pooling) connection for migrations: DDL statements
// and advisory locks used by `prisma migrate` are unreliable through a
// transaction pooler (e.g. Supabase pgbouncer on :6543).
const migrationUrl =
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL;

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: migrationUrl ? { url: migrationUrl } : undefined,
});
