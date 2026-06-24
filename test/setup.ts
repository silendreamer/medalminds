// Force the data layer onto its hermetic local-TypeScript path so the test
// suite never depends on a live PostgreSQL connection. `src/lib/db.ts`
// resolves `hasDatabaseUrl` from these env vars at import time, so they must be
// cleared before any module under test is imported (setupFiles run first).
for (const key of [
  "DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_HOST",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE"
]) {
  delete process.env[key];
}
