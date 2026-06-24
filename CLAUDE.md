# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MedalMinds (`medalminds.com`) is a Next.js 16 (App Router) / React 19 MVP for academic competition prep: Science Bowl, Science Olympiad, and Math Olympiad. It offers practice questions, learning lessons, timed tests, and a real-time Science Bowl Buzzer Arena.

## Commands

```bash
npm run dev            # Next dev server at http://localhost:3000
npm run build          # next build (use this to typecheck a change)
npm run lint           # eslint . (flat config in eslint.config.mjs)
npm test               # vitest run (single pass)
npm run test:watch     # vitest watch mode
```

Tests use **Vitest**. `test/setup.ts` clears all DB env vars so the suite runs against the hermetic local-data path (no PostgreSQL needed) — see `src/lib/data.local.test.ts`. Run a single file with `npx vitest run src/lib/data.local.test.ts`.

Database (Prisma + PostgreSQL):

```bash
npm run db:migrate     # prisma migrate dev (create/apply a migration in dev)
npm run db:deploy      # prisma migrate deploy (apply existing migrations)
npm run db:seed        # tsx prisma/seed.ts
npm run db:generate    # prisma generate (also runs automatically on postinstall)
```

Vercel build command is `npm run vercel-build` (= `prisma migrate deploy && prisma db seed && next build`).

Prisma config lives in `prisma.config.ts` (not `package.json` for config). The `prisma/seed.ts` script is registered both there and under the `prisma.seed` key.

## The dual-source data layer (most important architectural concept)

**All content reads go through `src/lib/data.ts`.** Every exported reader (`getQuestionsByCompetition`, `getLessonsByCompetition`, `getTestBySlug`, `getBuzzerQuestions`, etc.) has two code paths selected by `isDbEnabled()`:

- **No database URL configured** → reads from local TypeScript data files in `src/data/` (`competitions.ts`, `practiceQuestions.ts`, `lessons.ts`, `tests.ts`, `buzzerQuestions.ts`, `scienceBowlMiddleSchoolCurriculum.ts`).
- **Database URL configured** → reads from PostgreSQL via Prisma, then maps DB rows back to the same local TypeScript types (`PracticeQuestion`, `Lesson`, `Test`, etc. from `src/types/index.ts`) using the `toX()` mapper functions.

When adding or changing a content reader, **you must keep both branches in sync** and return the same shape from each. The DB branch maps enums/relations back into the local-data vocabulary (e.g. `fromDbDifficulty`, `fromDbQuestionFormat`, `subjectAliases` for cross-naming subjects like "Biology"/"Life Science").

`hasDatabaseUrl` / `getDatabaseUrl()` in `src/lib/db.ts` resolve the connection from a priority chain: `DATABASE_URL` → `POSTGRES_PRISMA_URL` → `POSTGRES_URL` → `POSTGRES_URL_NON_POOLING` → assembled from `POSTGRES_HOST`/`USER`/`PASSWORD`/`DATABASE`. Prisma client + pg `Pool` are memoized on `globalThis` to survive dev hot-reload.

**Caching:** deterministic readers (lists, counts, by-slug) are wrapped in `cachedContent()`, which uses `unstable_cache` tagged `content:<slug>` with a 1h revalidate when a DB is configured, and is a **no-op on the local-data path** (so tests run offline). The random/`getQuestionById` readers are intentionally *not* cached. After an admin script writes content, purge with `POST /api/revalidate?secret=$REVALIDATE_SECRET&tag=content:<slug>`.

## Routing

Routes are **dynamic by competition slug** under `src/app/[competitionSlug]/` — `page.tsx`, `practice/`, `learning/` + `learning/[lessonId]/`, `tests/` + `tests/[testId]/`, `buzzer/`. One set of route files serves all three competitions; the slug drives the data lookup. `src/app/science-bowl/` holds Science-Bowl-only pages (e.g. `info-session`). Build URLs with the helpers in `src/lib/routes.ts` rather than hardcoding paths. Valid slugs are validated by `isCompetitionSlug()` against local competition data.

**Adding a new competition:** add a record to `src/data/competitions.ts`, add the slug to the `CompetitionSlug` union in `src/types/index.ts`, then add content in `practiceQuestions.ts` / `lessons.ts` / `tests.ts`. Dynamic routes then work automatically.

## Buzzer Arena (real-time)

The Buzzer Arena is DB-backed and **requires PostgreSQL** (`BuzzerRoom`, `BuzzerSeat`, `BuzzerRoomEvent` models). Game logic lives in `src/lib/buzzerRooms.ts`; the API is in `src/app/api/buzzer/rooms/` (route handlers marked `dynamic = "force-dynamic"`). Clients drive the game by POSTing `BuzzerRoomAction` messages (`sit`, `buzz`, `judge`, `nextQuestion`, etc.) — organizer-only actions carry `organizerPassword`. There is no websocket; the client polls the room route.

## Admin / content-pipeline scripts (`scripts/`, run via tsx)

These are **explicit local admin operations against the production Postgres DB — not part of any build**. They typically support `--dry-run`/`--list-only` vs `--write`, `--limit`, and subject/level filters, and several call OpenAI (needs `OPENAI_API_KEY`). See the README for full flag docs.

- `import:osti-ms-science-bowl` — scrape/parse DOE/OSTI Science Bowl sample-question PDFs into `Question`/`Answer`. Dedupes via a stable `sourceHash`; caches PDFs in `.cache/osti-science-bowl/`.
- `import:osti-sqlite` — load the prebuilt SQLite exports into Prisma/Postgres.
- `generate:answer-explanations` — fill `AnswerExplanation.shortExplanation` (shown after "Check answer"; falls back to legacy `Question.explanation`).
- `generate:question-concepts` / `expand:concept-lessons` / `batch:question-concepts` — group questions into reusable `Concept`/`Lesson` rows (default safety cap `--max-new-concepts=3`).
- `classify:question-topics` / `report:question-topics` — write `QuestionTopicClassification` rows (topic/subtopic/difficulty/confidence) without mutating questions; reports land in `reports/`.

The loose `.js` files in `scripts/` (`check*.js`, `inspect*.js`, `showMigrations.js`, etc.) are ad-hoc DB inspection/migration helpers.

## Conventions

- Path alias `@/*` → `src/*` (see `tsconfig.json`).
- Difficulty in the DB is the Prisma enum `FOUNDATIONAL`/`INTERMEDIATE`/`ADVANCED`; in local types it's the strings `Foundational`/`Intermediate`/`Advanced`. Question format DB enum `MULTIPLE_CHOICE`/`SHORT_ANSWER` ↔ local `multiple_choice`/`short_answer`. School level is `MIDDLE_SCHOOL`/`HIGH_SCHOOL`/`MIXED`.
- Never commit `.env.local` or Supabase service-role keys.

The detailed PostgreSQL backend design lives in `docs/postgres-backend-plan.md`.
