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
npm run generate:nsb-answer-explanations  # backfill explainAnswer in content/nsb/json/questions.json via OpenAI
```

## Content architecture (most important concept)

**All content is committed files — there is no database-backed content layer.**

- `content/nsb/json/questions.json` — ~24 MB, ~25,650 Science Bowl questions
- `content/nsb/json/lessons.json` — ~1.4 MB, ~2,031 lesson metadata records
- `content/nsb/lessons/**` — markdown lesson body files, read at request time via `fs.readFile`

Loaders live in `src/data/nsbQuestions.ts`. `getNsbQuestions()` and `getNsbBuzzerPool()` do dynamic `import()` of the JSON and memoize at module scope. `getNsbLessonContent()` calls `fs.readFile` at request time — this is why `next.config.ts` must keep `outputFileTracingIncludes: { "/**": ["./content/nsb/lessons/**"] }`. **Never remove that entry** or lesson bodies will silently disappear on Vercel (the function catches the error and returns `[]`). `contentPath` in `lessons.json` is repo-root-relative (`content/nsb/lessons/{hs,ms}/...`) and is resolved via `path.join(process.cwd(), contentPath)`.

**All content reads go through `src/lib/data.ts`.** Every reader special-cases `competitionSlug === "science-bowl"` (NSB JSON path) and falls back to local TypeScript arrays in `src/data/` for other competitions. Those arrays are intentionally empty (`practiceQuestions.ts`, `lessons.ts`). There is no database branch, no caching layer, and no `/api/revalidate` endpoint.

## Database (Buzzer Arena only)

PostgreSQL (Prisma + `@prisma/adapter-pg` + `pg` Pool, memoized on `globalThis` in `src/lib/db.ts`) is used **only** by the Buzzer Arena:

- Models: `BuzzerRoom`, `BuzzerSeat`, `BuzzerRoomEvent` in `prisma/schema.prisma`
- One baseline migration: `prisma/migrations/0001_buzzer_baseline/` (idempotent — safe against an existing prod DB and able to provision a fresh one)
- Game engine: `src/lib/buzzerRooms.ts`
- API: `src/app/api/buzzer/rooms/` (3 route handlers, `force-dynamic`)
- No websocket — `src/components/BuzzerArena.tsx` polls `GET /api/buzzer/rooms/[code]` every 1.5 s and drives the game by POSTing `BuzzerRoomAction` messages; organizer-only actions carry `organizerPassword`

`src/lib/db.ts` resolves the connection from a priority chain: `DATABASE_URL` → `POSTGRES_PRISMA_URL` → `POSTGRES_URL` → `POSTGRES_URL_NON_POOLING` → assembled from `POSTGRES_HOST`/`POSTGRES_USER`/`POSTGRES_PASSWORD`/`POSTGRES_DATABASE`. Set `NODE_TLS_REJECT_UNAUTHORIZED=0` only for local providers with self-signed certs; never set it in production.

## Authentication

Better Auth (`better-auth`, email+password + Prisma adapter) backs `/login`, `/signup`, `/account/**`. **PostgreSQL is now required for auth**, in addition to the Buzzer Arena — content routes still need no DB.

- Config: `src/lib/auth.ts` — lazy `getAuth()` memoized on `globalThis` (same pattern as `getPrisma()`), so importing this module never throws in DB-less environments; only *calling* `getAuth()` touches the DB.
- Server session reads: `src/lib/session.ts` (`getSession()` never throws — returns `null` on any failure; `requireSession()` redirects to `/login?next=…`; `requireRole()` calls `notFound()` on mismatch, not a 403).
- Client entry point: `src/lib/authClient.ts` (`createAuthClient` from `better-auth/react` + `inferAdditionalFields<Auth>()` for a typed `role` field). Note: the installed `better-auth@1.6.23` has no `forgetPassword` method — the real call is `authClient.requestPasswordReset` (see `src/components/auth/ForgotPasswordForm.tsx`).
- Email: `src/lib/email/sendEmail.ts` (Resend when `RESEND_API_KEY` is set, console fallback otherwise — safe for dev/test), `templates.ts` (pure HTML/text builders), `authEmails.ts` (the contract module `auth.ts` imports by name).
- API route: `src/app/api/auth/[...all]/route.ts` — `toNextJsHandler(getAuth())`, called lazily inside each handler, `force-dynamic`.
- Edge gate: `src/proxy.ts` (Next 16's `middleware.ts` successor — this is the actual shipped filename) — optimistic cookie check (`getSessionCookie`, cookie prefix `medalminds`, matcher `/account/:path*`) redirects to `/login?next=…`; the real check is `src/app/account/layout.tsx` calling `requireSession("/account")`.
- Account area: `src/app/account/**` (profile, settings, security — change password, session list/revoke, delete account) and auth pages under the `src/app/(auth)/**` route group (login, signup, forgot-password, reset-password, verify-email).

Role model: `UserRole { STUDENT PARENT ADMIN }` (`prisma/schema.prisma`). Signup can only ever produce `STUDENT`/`PARENT` — `additionalFields.role` is declared `input: true`, but a `databaseHooks.user.create.before` hook in `src/lib/auth.ts` clamps any other value (including `"ADMIN"`) to `STUDENT` before the row is created. `ADMIN` has no client-reachable path; it's assigned only via direct SQL (see `docs/AUTH.md`).

Hermetic-test guarantee is preserved: `test/setup.ts` still clears all DB env vars, and every auth entry point (`getAuth()`, `getSession()`, the catch-all route) is designed to fail closed rather than throw at import time.

Operations (secret generation/rotation, Resend setup, promoting an admin, revoking sessions, cleanup): `docs/AUTH.md`. Manual end-to-end verification script: `e2e/MANUAL_QA.md`.

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
