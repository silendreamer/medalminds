# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MedalMinds (`medalminds.com`) is a Next.js 16 (App Router) / React 19 site for academic competition prep: Science Bowl, Science Olympiad, and Math Olympiad. Live product = Science Bowl only; Science Olympiad and Math Olympiad are placeholder shells with zero content and are gated as "coming soon" in the UI.

See `docs/CODEBASE_AUDIT.md` for the current architecture audit and implementation roadmap.

## Commands

```bash
npm run dev            # Next dev server at http://localhost:3000
npm run build          # next build (use this to typecheck a change)
npm run start          # next start (production server)
npm run lint           # eslint . (flat config in eslint.config.mjs)
npm test               # vitest run (single pass)
npm run test:watch     # vitest watch mode
```

Database (Prisma — Buzzer Arena only):

```bash
npm run db:generate    # prisma generate (also runs automatically on postinstall)
npm run db:migrate     # prisma migrate dev (create/apply a migration in dev)
npm run db:deploy      # prisma migrate deploy (apply existing migrations)
```

Vercel build command is `npm run vercel-build` (= `prisma migrate deploy && next build`). There is no seed script.

Content script (run locally against `.env.local`):

```bash
npm run generate:nsb-answer-explanations  # backfill explainAnswer in docs/nsb/questions.json via OpenAI
```

## Content architecture (most important concept)

**All content is committed files — there is no database-backed content layer.**

- `docs/nsb/questions.json` — ~24 MB, ~25,650 Science Bowl questions
- `docs/nsb/lessons.json` — ~1.4 MB, ~2,031 lesson metadata records
- `docs/content/nsb/**` — 2,107 markdown lesson body files, read at request time via `fs.readFile`

Loaders live in `src/data/nsbQuestions.ts`. `getNsbQuestions()` and `getNsbBuzzerPool()` do dynamic `import()` of the JSON and memoize at module scope. `getNsbLessonContent()` calls `fs.readFile` at request time — this is why `next.config.ts` must keep `outputFileTracingIncludes: { "/**": ["./docs/content/**"] }`. **Never remove that entry** or lesson bodies will silently disappear on Vercel (the function catches the error and returns `[]`).

**All content reads go through `src/lib/data.ts`.** Every reader special-cases `competitionSlug === "science-bowl"` (NSB JSON path) and falls back to local TypeScript arrays in `src/data/` for other competitions. Those arrays are intentionally empty (`practiceQuestions.ts`, `lessons.ts`). There is no database branch, no caching layer, and no `/api/revalidate` endpoint.

## Database (Buzzer Arena only)

PostgreSQL (Prisma + `@prisma/adapter-pg` + `pg` Pool, memoized on `globalThis` in `src/lib/db.ts`) is used **only** by the Buzzer Arena:

- Models: `BuzzerRoom`, `BuzzerSeat`, `BuzzerRoomEvent` in `prisma/schema.prisma`
- One baseline migration: `prisma/migrations/0001_buzzer_baseline/` (idempotent — safe against an existing prod DB and able to provision a fresh one)
- Game engine: `src/lib/buzzerRooms.ts`
- API: `src/app/api/buzzer/rooms/` (3 route handlers, `force-dynamic`)
- No websocket — `src/components/BuzzerArena.tsx` polls `GET /api/buzzer/rooms/[code]` every 1.5 s and drives the game by POSTing `BuzzerRoomAction` messages; organizer-only actions carry `organizerPassword`

`src/lib/db.ts` resolves the connection from a priority chain: `DATABASE_URL` → `POSTGRES_PRISMA_URL` → `POSTGRES_URL` → `POSTGRES_URL_NON_POOLING` → assembled from `POSTGRES_HOST`/`POSTGRES_USER`/`POSTGRES_PASSWORD`/`POSTGRES_DATABASE`. Set `NODE_TLS_REJECT_UNAUTHORIZED=0` only for local providers with self-signed certs; never set it in production.

## Routing

Routes are under `src/app/[competitionSlug]/[level]/` where `[level]` is `middle-school` or `high-school` (only valid for science-bowl; the level page calls `notFound()` for other competitions). Sub-routes: `practice/`, `practice/[subjectSlug]`, `learning/`, `learning/[lessonId]`, `learning/subject/[subjectSlug]`, `tests/`, `tests/[testId]`, `tests/subject/[subjectSlug]`. Static: `src/app/science-bowl/{buzzer,info-session}`. Build URLs with helpers in `src/lib/routes.ts`; validate slugs with `isCompetitionSlug()` in `src/lib/data.ts`.

## Tests

Vitest, config in `vitest.config.ts`, setup in `test/setup.ts` (clears all DB env vars so the suite is hermetic — no PostgreSQL needed). Run a single file with `npx vitest run <path>`. One suite: `src/lib/data.local.test.ts`.

## Conventions

- Path alias `@/*` → `src/*` (see `tsconfig.json`).
- NSB question categories are exactly: `Biology`, `Chemistry`, `Physics`, `Earth and Space`, `Energy`, `Math`. Use those exact strings (e.g. `"Earth and Space"`, not `"Earth & Space"`).
- Question difficulty strings in the JSON are `EASY`/`MEDIUM`/`HARD`; school level values are `"Middle School"`/`"High School"`.
- eslint ignores: `.next/**`, `node_modules/**`, `scripts/**`, `prisma/**`, `tmp/**`, `reports/**`, `.claude/**`.
- The `scripts/` folder contains legacy content-pipeline `.mjs` helpers and ad-hoc `.ts` export/parse scripts; they are unlinted and not part of any build.
- Never commit `.env*` files (gitignored except `.env.example`).
