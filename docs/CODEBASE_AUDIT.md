# MedalMinds Codebase Audit — Master Implementation Plan

**Date:** 2026-07-11 · **Auditor:** Claude (Fable 5), Staff-engineer audit · **Verified against:** `npm test` (11/11 pass), `npm run build` (pass), `npx eslint src` (18 errors after `.claude/**` ignore added — 16 `no-explicit-any` + 2 `react-hooks/immutability`, all pre-existing), full source read.

This document is the execution plan for a follow-up Claude (Sonnet/Opus) session. Every finding cites real files. Tasks are ordered to minimize risk and merge conflicts.

---

## 1. Executive Summary

MedalMinds is in good functional shape for its live scope — Science Bowl practice/learning/tests plus a real-time Buzzer Arena — but the repository's **documentation describes an architecture that no longer exists**, several **advertised features are dead or broken** (prebuilt tests, Sign In, the two non-Science-Bowl competitions), and there are **three deployment-level risks**: no Prisma migrations exist despite `vercel-build` running `prisma migrate deploy`; lesson markdown is read from `docs/` at runtime without Next.js file-tracing configuration (likely empty lesson bodies on Vercel); and a 24 MB JSON file is loaded into every server instance.

The Buzzer Arena's game logic is careful and largely correct (optimistic guards on `buzz`/`sit`, sensible timeout handling, NSB-accurate scoring), but its access control is decorative: room codes come from `Math.random()` and the organizer password is one of 20 dictionary words, with no rate limiting — any participant can hijack a room and read the answers in ~20 guesses.

There is no CI, one test file, and `npm run lint` fails. The highest-leverage work is not a rewrite; it is: fix the deploy/provisioning story, fix or remove the dead features, harden buzzer auth, deduplicate ~6 copy-pasted helpers that have already diverged into bugs, and bring CLAUDE.md/README back in line with reality so future agent sessions don't act on false premises.

**2026-07-11 update:** All three P0s (Prisma baseline, file tracing, 404 removal), all §6 quick wins, the docs rewrite (P1-5/Task J), buzzer auth hardening (P1-1/Task E), and dead-code removal (P1-3/Task G) completed via subagent execution.

**2026-07-12 update:** Tasks A (CI workflow), F (helper dedup + NSB typing — `eslint src` now 0 errors, +36 unit tests), H (hub dedup via shared `ScienceBowlHub` component, URLs preserved), and I (buzzer judge/nextQuestion concurrency guards + 49 helper tests) completed. **All roadmap items B–J plus A are now done.** Remaining are the explicitly-deferred lower-priority items only: P1-2 (24 MB `questions.json` still bundled — split/lazy-load), P2-5 (non-functional TestBuilder checkboxes), P2-6 (full-page-reload nav in PracticeSession), the P3 list, seat-label dedup, and the `roundNumber` product decision. Verified end-to-end: `npm run lint` (0 errors), `npm test` (95 pass), `npm run build` (green), plus live buzzer auth + concurrency smoke tests.

## 2. Architecture Assessment (Phase 1 — how the system actually works)

**Purpose.** Next.js 16 (App Router, Turbopack) + React 19 site for academic-competition prep. Live product = National Science Bowl: 25,650 real questions and 2,031 lessons. Science Olympiad and Math Olympiad are placeholder shells with **zero content** (`src/data/practiceQuestions.ts` and `src/data/lessons.ts` are empty arrays).

**⚠️ CLAUDE.md was wrong.** Commit `53acdcd` ("website-only branch") removed the dual-source data layer, all Prisma content models, all migrations, the seed, and the content pipeline. CLAUDE.md has since been rewritten to match (✅ DONE 2026-07-11). Current architecture:

- **Content source:** committed JSON + markdown, not Postgres.
  - `docs/nsb/questions.json` (24 MB, 25,650 questions) and `docs/nsb/lessons.json` (1.4 MB, 2,031 lessons), loaded via dynamic `import()` and memoized at module scope in `src/data/nsbQuestions.ts`.
  - Lesson bodies: 2,107 markdown files under `docs/content/nsb/**`, read with `fs.readFile` at request time (`getNsbLessonContent`).
- **Data facade:** `src/lib/data.ts` (504 lines). Every reader special-cases `slug === "science-bowl"` (NSB JSON) with a fallback to the (empty) local arrays. No DB branch, no `unstable_cache`. `contentTag()` and `/api/revalidate` have been removed (✅ DONE 2026-07-11).
- **Database (Prisma + pg adapter):** used **only** by the Buzzer Arena (`BuzzerRoom`, `BuzzerSeat`, `BuzzerRoomEvent`). Engine in `src/lib/buzzerRooms.ts` (704 lines); API in `src/app/api/buzzer/rooms/**` (3 handlers, `force-dynamic`). No websockets — `BuzzerArena.tsx` polls `GET /api/buzzer/rooms/[code]` every **1500 ms** (skipping when `document.hidden`).
- **Routing:** `/[competitionSlug]/[level]/{practice,learning,tests}/...` — note the `[level]` segment that CLAUDE.md doesn't mention. `[level]/page.tsx` 404s for anything that isn't science-bowl + middle-school/high-school. Static pages: `/science-bowl/buzzer`, `/science-bowl/info-session`.
- **Request lifecycle:** practice/tests/buzzer pages are `force-dynamic`; each request filters the in-memory 25k-question array. Server holds the parsed 24 MB JSON per instance.
- **Client state:** `useState` + `sessionStorage` (practice stats in `PracticeSession`) + `localStorage` (visited lessons in `CourseLayout`). Navigation between practice questions uses `window.location.href` (full page reload).
- **Build/deploy:** `vercel-build: prisma migrate deploy && next build` — `prisma/migrations/0001_buzzer_baseline/` now exists with an idempotent SQL baseline (✅ DONE 2026-07-11). No CI. Tests: Vitest, 1 file (`src/lib/data.local.test.ts`, 11 tests). Playwright is in devDependencies with **no config and no tests**.

**Quality of what exists:** layering is reasonable (pages → `lib/data` → data files; API → `lib/buzzerRooms` → Prisma). No circular dependencies observed. The main structural problems are duplication (the Science Bowl hub page exists twice; ~6 helpers copy-pasted 2–6× each) and `any`-typed seams around the NSB lesson JSON.

## 3. Prioritized Issue List (Phases 2–3)

Severity: P0 critical · P1 high · P2 medium · P3 nice-to-have. Effort: S (<1 h), M (1–4 h), L (day+). Risk = chance the fix breaks something.

### P0 — Critical

**P0-1. No Prisma migrations, but the deploy runs `prisma migrate deploy`.** ✅ DONE (2026-07-11)
- `prisma/migrations/0001_buzzer_baseline/migration.sql` and `migration_lock.toml` created. SQL is idempotent (guarded enums/tables, `CREATE UNIQUE INDEX IF NOT EXISTS`, guarded FKs) — no-ops against the existing prod DB and provisions a fresh one. No `migrate resolve` step needed.
- Files: `package.json` (`vercel-build`), `prisma/` (only `schema.prisma` remains; migrations `0001`–`0020` deleted in `53acdcd`).
- Why: A fresh database **cannot be provisioned from this repo** — nothing creates the buzzer tables. Against the existing prod DB, `migrate deploy` behavior depends on `_prisma_migrations` rows that reference migrations missing from disk (Prisma warns or errors on this). Disaster recovery is currently impossible; any future schema change has no path to prod.
- Effort: S–M. Risk: low (additive).

**P0-2. Lesson markdown is likely missing in production (Vercel).** ✅ DONE (2026-07-11) — pending one-time verification on a production/preview deploy.
- `next.config.ts` now has `outputFileTracingIncludes: { "/**": ["./docs/content/**"] }`.
- Files: `src/data/nsbQuestions.ts:120-180` (`getNsbLessonContent` → `fs.readFile(path.join(process.cwd(), "docs", contentPath))`), `next.config.ts`.
- Why: the path is dynamic, so Next's file tracer cannot include `docs/content/**` in the serverless bundle. The function catches the error and returns `[]`, so lesson pages would silently render with **no content sections**. The two JSON files are safe (statically-analyzable `import()`), but the 2,107 markdown files are not. Must be verified against prod and fixed regardless.
- Effort: S. Risk: low.

**P0-3. Advertised routes that 404.** ✅ DONE (2026-07-11) — user action remaining: set `NEXT_PUBLIC_SITE_URL=https://medalminds.com` in Vercel.
- Sign In links removed from `Header.tsx` and `src/app/page.tsx` hero. `sitemap.ts` uses `siteUrl` and no longer lists olympiad sub-routes. Placeholder competitions render as coming-soon (`CompetitionCard` `comingSoon` prop; `[competitionSlug]/page.tsx` coming-soon hero replaces the legacy flow).
- (a) Header "Sign In" → `/api/auth/signin` — **no auth exists anywhere** (`src/components/Header.tsx:118`). Every page shows a button that 404s.
- (b) Science Olympiad / Math Olympiad: hub pages render action cards linking to `/science-olympiad/learning` etc.; those URLs are captured by `[level]/page.tsx` which calls `notFound()` for non-science-bowl (`src/app/[competitionSlug]/[level]/page.tsx:45`). `src/app/sitemap.ts:44-50` **advertises these 404 URLs to search engines**.
- (c) Both competitions have zero content anyway (`practiceQuestions.ts`/`lessons.ts` empty), so even fixed links lead to "No questions are available yet."
- Effort: S–M. Risk: low.

### P1 — High

**P1-1. Buzzer Arena access control is trivially defeated.** ✅ DONE (2026-07-11) — crypto-random codes (unambiguous alphabet) + 8-hex-char passwords, constant-time comparison, password moved to `x-organizer-password` header (query param kept as deprecated fallback), `roleForRoom` extra query eliminated. Verified with a live API smoke test (role gating, 400 on wrong password, legacy back-compat).
- Files: `src/lib/buzzerRooms.ts:42-47` (`passwordWords`, 20 entries), `:77-83` (`makeCode`/`makePassword` via `Math.random()`), `:400-413` (`roleForRoom`, `requireOrganizer` — plain compare, no rate limit), `src/app/api/buzzer/rooms/[code]/route.ts` (password sent as a **GET query param**, so it lands in server/proxy logs).
- Why: anyone with a room code becomes organizer in ≤20 guesses — organizer serialization includes `correctAnswer` (`serializeBuzzerRoom` → `questionForOrganizer`), and organizer actions control scores. `Math.random()` codes are also enumerable. Stakes are low (a practice game) but the fix is one hour.
- Effort: S. Risk: low.

**P1-2. 24 MB `questions.json` bundled into every server function; 47 MB of redundant copies in/near the repo.** Partially done (2026-07-11): `questions_backup.json` deleted from git; `docs/nsb/by_subject/` gitignored. The 24 MB `questions.json` itself is still bundled into the server — that part remains open.
- Files: `docs/nsb/questions.json` (24 MB, imported into the server bundle), `docs/nsb/questions_backup.json` (committed, unused by code), `docs/nsb/by_subject/` (23 MB, untracked, unused by code).
- Why: slow cold starts and high memory per serverless instance; repo bloat; risk someone edits the backup instead of the real file. Also note `docs/nsb/questions.json` has **uncommitted modifications** right now — commit or revert deliberately.
- Effort: M (split/slim the JSON) / S (just remove the copies). Risk: medium if restructuring the JSON (touches `nsbQuestions.ts` loaders) — do the deletions first, restructure later.

**P1-3. The prebuilt "tests" feature is entirely dead.** ✅ DONE (2026-07-11) — `[testId]` route, `tests.ts`, `TestCard`/`TestRunner` + 4 other zero-importer components, dead `data.ts` readers/re-exports, `testPath`, and the `Test` type all removed (grep-verified per deletion).
- Files: `src/data/tests.ts` (30 synthetic tests whose `questionIds` = `sb-q1…`, `so-q1…` — IDs that exist nowhere), `src/lib/data.ts:428-432` (`getQuestionsForTest` searches only the empty `localPracticeQuestions`), `src/app/[competitionSlug]/[level]/tests/[testId]/page.tsx` (always renders "This test has no questions."), `src/components/TestCard.tsx` (zero importers).
- Why: dead weight that misleads maintainers; a reachable route that can only show an empty state.
- Effort: S (remove) or L (implement real fixed tests). Recommend remove now.

**P1-4. `npm run lint` fails (132 errors) and there is no CI.** Partially done (2026-07-11): `eslint.config.mjs` now ignores `.claude/**`; stale worktree `agent-a50c4832ecf462011` removed (a second one, `agent-aca88ef32490acb2e`, still exists). `npx eslint src` is down to 18 pre-existing errors (16 `no-explicit-any` + 2 `react-hooks/immutability` in CourseLayout), all deferred to Task F. ✅ DONE (2026-07-12): Task F eliminated the last 16 errors (typed the NSB JSON seams, reordered CourseLayout state); `npx eslint src` is now 0 errors (14 warnings). Task A added `.github/workflows/ci.yml` (lint+test+build on push/PR to main). CI now exists and lint is clean.
- Files: `eslint.config.mjs` (ignores lack `.claude/**` — a stale agent worktree at `.claude/worktrees/agent-a50c…` plus `.claude/skills/**` scripts contribute ~115 of the 132 errors); real `src/` errors: 15 × `no-explicit-any` (`src/lib/data.ts`, `src/data/nsbQuestions.ts`), unused vars (`BuzzerRoomEventType` in `buzzerRooms.ts:1`, `subject` in `PracticeSession` caller, etc.).
- Why: a failing lint gate is worse than none — it trains everyone to ignore it. No CI means the passing build/tests are luck, not policy.
- Effort: S (ignores + unused vars) + M (type the NSB lesson shape to kill the `any`s) + S (GitHub Actions workflow). Risk: low.

**P1-5. CLAUDE.md / README / `.env.example` describe a deleted architecture.** ✅ DONE (2026-07-11)
- CLAUDE.md, README.md, and `.env.example` fully rewritten to match the current codebase.
- CLAUDE.md: dual-source data layer, `cachedContent`, DB-backed readers, `db:seed`, admin scripts, old route structure — all gone or changed. `.env.example` documents `POST /api/ai/explain` (Groq) — **that route does not exist** (removed after `4605468`). README likewise stale.
- Why: this repo is developed with AI agents; wrong instructions actively cause wrong changes (CLAUDE.md says "keep both branches in sync" for branches that don't exist).
- Effort: M. Risk: none.

### P2 — Medium

**P2-1. Science Bowl hub duplicated (~150 lines × 2).** `src/app/[competitionSlug]/page.tsx` (science-bowl branch) vs `src/app/[competitionSlug]/[level]/page.tsx` — near-identical JSX. Simplest fix: `/science-bowl` redirects to `/science-bowl/middle-school` (or the level page renders a shared component). Effort M, risk low.

**P2-2. Copy-pasted helpers that have already diverged into bugs.**
- `normalize`/`isCorrect` ×3: `SimplePracticeQuestion.tsx`, `TestRunner.tsx` (both accept `alternateAnswers`) vs `QuickTestRunner.tsx` (**does not** — a user choosing a listed alternate answer is marked wrong).
- Question prompt rendering: `SimplePracticeQuestion` uses `<QuestionText>` (renders `<sup>/<sub>` HTML); `QuickTestRunner.tsx:78` and `TestRunner.tsx` render `{item.prompt}` as plain text — **literal `<sup>2</sup>` shows on screen** for formatted questions.
- `emojiMap` ×5 pages with inconsistent keys: `"Earth & Space"` → `"Earth and Space"` fixed in 4 files ✅ DONE (2026-07-11). (`buzzerQuestions.ts` local fallback data still uses `"Earth & Space"` but is unreachable.)
- `formatSeatLabel` duplicated in `buzzerRooms.ts:49` and `BuzzerArena.tsx:23`.
- `shuffle` twice in `data.ts` (module-level `:33` and nested inside `getQuestionsForLesson` `:377`).
- level-string → `SchoolLevelFilter` parsing repeated in ~6 pages.
- NSB-lesson→`Lesson` mapping duplicated in `getLessonsByCompetition` and `getLessonsByIds` (`data.ts:307-321`, `:340-354`).
- Subject slugification: 4 variants (`routes.ts` `[\s&]+`, `data.ts:131` `[^a-z0-9]+`, learning page `\s+`, `sitemap.ts` `[\s&]+`) — currently agree for the 6 real subjects, latent divergence.
- Effort: M total. Risk: low-medium (behavior of QuickTestRunner grading changes — that's the point).

**P2-3. Lesson lookup ignores school level.** Partially done (2026-07-11): `levelHint` is now passed in `learning/[lessonId]/page.tsx` (line 18) and the sibling lookup prefers the level match. The `generateMetadata` path bug in `learning/subject/[subjectSlug]/page.tsx:25` (missing `/${level}/` segment) is NOT fixed yet. Effort S. Risk: low.

**P2-4. Buzzer `judge`/`nextQuestion` race.** `applyBuzzerAction` re-reads the room then `update`s unconditionally for `judge` (`buzzerRooms.ts:588-632`) — two concurrent judge requests can both award points (the schema's `version Int` field exists for optimistic locking but is **never used**). `buzz` and `sit` already use guarded `updateMany` — extend that pattern. Effort S–M. Risk: medium (core game flow — needs manual testing).

**P2-5. Non-functional UI controls shipped to users.** `TestBuilder.tsx:100-117`: "Timed mode / Show explanations / Bonus questions" checkboxes are wired to nothing. `TestRunner` displays "X minute limit" but has no timer. Either implement or remove the controls. Effort S (remove) / M (implement timed mode). Risk: low.

**P2-6. Full-page reload navigation.** `PracticeSession.handleNext/handleSkip` and `TestBuilder.handleStart` use `window.location.href`; every next-question click re-downloads the app. Use `router.push`/`router.refresh`. Note the practice stats flow (state + sessionStorage dual-write) only works **because** of the reload — switching to client nav must keep stats in sync (this also resolves the `set-state-in-effect` lint warnings in `PracticeSession`). Effort M. Risk: medium (easy to introduce stale-question bugs — the page must refetch a new random question on nav).

**P2-7. Orphaned cache machinery.** ✅ DONE (2026-07-11) — `/api/revalidate` route and `contentTag()` deleted.

**P2-8. Polling load.** Partially done (2026-07-11): polling interval raised to 1500 ms and `document.hidden` skip added (`BuzzerArena.tsx:249-251`). The `roleForRoom` extra-query consolidation (returning role from the already-fetched room) remains open. Each `GET` = up to 4 Prisma queries (`includeRoomWithTimeout` reads room, maybe writes timeout + events, re-reads; then `roleForRoom` queries again). 8 players + organizer ≈ 6 req/s ≈ 15–25 queries/s per room on serverless. Effort S–M. Risk: low.

**P2-9. Repo hygiene.** Stale `.claude/worktrees/agent-a50c…` directory; uncommitted `docs/nsb/questions.json` modification; untracked `docs/nsb/by_subject/` (23 MB); `sitemap.ts` hardcodes `medalminds.vercel.app` while `seo.ts` honors `NEXT_PUBLIC_SITE_URL` (prod domain is medalminds.com — canonicals/sitemap may point at the wrong host; set the env var and use `siteUrl` in the sitemap). Effort S. Risk: low.

### P3 — Nice to have

- **Dead code:** components `TestCard`, `Breadcrumbs`, `MedalMark`, `PracticeQuestionCard`, `CompetitionSwitcher` (zero importers); `data.ts` exports `getLessonsByIds`, `getBuzzerQuestions` (unused); `BuzzerRoom.version` and `roundNumber` (never incremented — "rounds" are configured in setup but never advance); `src/data/buzzerQuestions.ts` local fallback is unreachable while the NSB pool loads.
- **`QuestionText` hardening:** `dangerouslySetInnerHTML` trusting pipeline-written HTML; add a whitelist strip (`<sup>/<sub>` only) as defense-in-depth.
- **Header:** inline-styles → CSS, `<img>` → `next/image` (2 lint warnings).
- **Playwright:** unused devDependency (+ `@playwright/test`) — remove, or add one smoke e2e and CI job (preferred given zero component test coverage).
- **`/api/revalidate` secret:** query-param secret (logged) + non-constant-time compare — move to header + `timingSafeEqual` if the route survives P2-7.
- **`createBuzzerRoom` code-collision loop** gives up after 5 tries and inserts anyway → unhandled unique-constraint 500 (astronomically rare; fold into P1-1's crypto-random change).
- **Testing depth:** no tests for `buzzerRooms` state machine (the most complex logic in the repo), `lessonContent` parsers, or any component. Priority order if adding: `applyBuzzerAction` transitions > `parseLessonTable`/`parseLessonSectionLines` > grading helpers.

## 4. Implementation Roadmap (Phase 4)

Ordered to minimize risk and conflicts. Steps 1–4 are independent; 5–8 touch shared files, do sequentially.

| # | Step | Files | Depends on | Risk | Validation |
|---|------|-------|-----------|------|-----------|
| 1 | Repo/config hygiene: eslint ignore `.claude/**`, delete stale worktree, remove `questions_backup.json` + decide `by_subject/`, commit/revert `questions.json` drift, remove playwright *or* add smoke test | `eslint.config.mjs`, `docs/nsb/*`, `package.json` | — | none | `npm run lint` errors drop to src-only; `git status` clean |
| 2 | ✅ DONE (2026-07-11) Prisma baseline migration + fix `vercel-build` | `prisma/migrations/`, `package.json` | — | low | `prisma migrate deploy` against a scratch DB creates buzzer tables; prod deploy stays green |
| 3 | ✅ DONE (2026-07-11) `outputFileTracingIncludes` for `docs/**` + verify lesson bodies in prod (pending prod-deploy verification) | `next.config.ts` | — | low | deploy preview → lesson page shows content sections |
| 4 | ✅ DONE (2026-07-11) Kill public 404s: remove Sign In button, gate placeholder competitions (or label "coming soon" without links), trim sitemap to real routes, fix sitemap/seo base URL (pending: set `NEXT_PUBLIC_SITE_URL` in Vercel) | `Header.tsx`, `sitemap.ts`, `page.tsx` (home), `[competitionSlug]/page.tsx` | — | low | crawl: no internal link 404s |
| 5 | ✅ DONE (2026-07-11) — Buzzer auth hardening: `crypto.randomBytes` codes, 2–3-word or hex password, drop password from GET query (use header), reuse fetched room for role | `buzzerRooms.ts`, `api/buzzer/**`, `BuzzerArena.tsx` | — | low-med | create/join/organize flows manually; old rooms still joinable |
| 6 | ✅ DONE (2026-07-11) — Remove dead tests feature + dead components/exports | `src/data/tests.ts`, `tests/[testId]/`, `TestCard/Breadcrumbs/MedalMark/PracticeQuestionCard/CompetitionSwitcher`, `data.ts` | 1 | low | `npm run build`; grep zero references |
| 7 | ✅ DONE (2026-07-12) — Dedup shared helpers into `src/lib/`: grading (`isCorrect` w/ alternates), `QuestionText` in all runners, `subjectEmoji`, `parseSchoolLevel`, one `slugifySubject`, one `shuffle`, one NSB-lesson mapper (typed — kills the `any`s), `formatSeatLabel` | `src/lib/*`, 3 runners, 5 pages, `data.ts`, `nsbQuestions.ts` | 6 | med | tests + new unit tests for grading/slugify; visual check of `<sup>` rendering |
| 8 | ✅ DONE (2026-07-12) — Hub dedup via shared `ScienceBowlHub` component (URLs preserved, not redirected); `levelHint` confirmed; subject-course metadata path fixed | `[competitionSlug]/page.tsx`, `[level]/**` | 4 | low | routes render; canonical URLs correct |
| 9 | ✅ DONE (2026-07-12) — Buzzer correctness: guarded `updateMany` for judge/next; poll 1.5 s + hidden-tab skip; `roundNumber` deferred (product decision) | `buzzerRooms.ts`, `BuzzerArena.tsx` | 5 | med | two-browser manual game; double-judge test |
| 10 | UX wiring: TestBuilder checkboxes (implement timed mode or delete), router.push navigation in PracticeSession/TestBuilder | `TestBuilder.tsx`, `TestRunner.tsx`, `PracticeSession.tsx` | 7 | med | manual practice/test flows; stats survive navigation |
| 11 | ✅ DONE (2026-07-12) — CI: GitHub Actions lint+test+build on push/PR to main | `.github/workflows/ci.yml` | 1 | none | green run on PR |
| 12 | ✅ DONE (2026-07-11) Rewrite CLAUDE.md + README + `.env.example` to match reality | docs | after 2–10 land | none | review |

## 5. Execution Tasks for Sonnet/Opus (Phase 5)

Each task is self-contained; do them in roadmap order but 1–5 can be parallel branches.

---

**TASK A — Lint gate + repo hygiene** *(roadmap 1, 11)* ✅ DONE (2026-07-12): eslint ignores + worktree cleanup done earlier; `.github/workflows/ci.yml` created (Node 22, `npm ci → lint → test → build`, concurrency-cancel). Lint is 0 errors after Task F, so CI enforces it cleanly.
- Objective: `npm run lint` exits 0; CI enforces lint+test+build.
- Modify: `eslint.config.mjs` (add `".claude/**"` to ignores), delete `.claude/worktrees/agent-a50c4832ecf462011/`, `git rm docs/nsb/questions_backup.json`, delete or `.gitignore` `docs/nsb/by_subject/`, fix `src/` unused-vars (`BuzzerRoomEventType` import in `buzzerRooms.ts:1`, `subject` in learning page, etc.), add `.github/workflows/ci.yml` (node 22, `npm ci && npm run lint && npm test && npm run build`).
- Do **not** fix the `no-explicit-any` errors here (Task F retypes those seams); temporarily leave them or scope the rule — prefer leaving and letting Task F finish the job before CI gains lint. Acceptance: `npx eslint src` clean except documented any-warnings; CI green.
- Pitfall: don't delete `.claude/skills/` (active tooling) — only ignore it in lint. Don't commit the `questions.json` content drift blindly — inspect `git diff --stat docs/nsb/questions.json` and ask the user if the change looks unintentional.

**TASK B — Prisma provisioning** *(roadmap 2)* ✅ DONE (2026-07-11)
- Objective: a fresh Postgres can be fully provisioned from the repo; deploys are deterministic.
- Steps: `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0001_buzzer_baseline/migration.sql`; add `migration_lock.toml` (`provider = "postgresql"`). Verify against a scratch DB. For prod: check `_prisma_migrations` — if old rows exist, `prisma migrate resolve --applied 0001_buzzer_baseline` must be run once against prod (document this in the PR; do not run it automatically).
- Acceptance: `prisma migrate deploy` on empty DB creates the 3 buzzer tables + enums; `prisma migrate status` clean.
- Pitfall: `schema.prisma` has no `url` in the datasource (adapter-based). `migrate` needs `DATABASE_URL`; confirm `.env` handling before running anything against prod. **Never run `migrate reset`.**

**TASK C — Production content tracing** *(roadmap 3)* ✅ DONE (2026-07-11) — pending one-time verification on a production/preview deploy.
- Objective: lesson markdown ships to Vercel functions.
- Modify `next.config.ts`: `outputFileTracingIncludes: { "/[competitionSlug]/[level]/learning/**": ["./docs/content/**"] }` (and the subject-course route which also renders lesson content via `getLessonBySlug`). Simplest safe form: apply to `"/**"`.
- Acceptance: `npm run build` then inspect `.next` trace output includes docs/content; deploy preview shows lesson sections. Add a unit test for `getNsbLessonContent` against a real file in `docs/content/`.
- Pitfall: key syntax is route-pattern → glob array, relative to project root; test on a preview deploy, not just locally (local always works because the files exist on disk).

**TASK D — Remove public 404s and placeholder rot** *(roadmap 4)* ✅ DONE (2026-07-11) — user action remaining: set `NEXT_PUBLIC_SITE_URL=https://medalminds.com` in Vercel.
- Objective: no internal link or sitemap entry 404s.
- Changes: delete the Sign In `<Link>` in `Header.tsx` (auth doesn't exist); in `sitemap.ts` drop the science-olympiad/math-olympiad section routes and replace `BASE_URL` with `siteUrl` from `@/lib/seo`; on the home page and `[competitionSlug]/page.tsx`, make the two placeholder competitions non-navigable "Coming soon" cards (Header already does this pattern); set `NEXT_PUBLIC_SITE_URL=https://medalminds.com` in Vercel env (document in `.env.example`).
- Acceptance: crawling `/` recursively yields no 404; sitemap contains only 200 routes; canonical URLs use the prod domain.
- Pitfall: keep `/science-olympiad` and `/math-olympiad` hub pages reachable (they're indexed); just stop linking to their broken sub-routes.

**TASK E — Buzzer auth hardening** *(roadmap 5)* ✅ DONE (2026-07-11)
- Objective: room codes and organizer passwords are unguessable; password not in URLs.
- Changes in `buzzerRooms.ts`: `makeCode()` → `crypto.randomBytes`-derived 6-char alphanumeric (exclude ambiguous chars); `makePassword()` → three words joined (`comet-helix-nova`) or 8-char random; keep the collision retry loop but make it a `while` with unique-violation catch. In `api/buzzer/rooms/[code]/route.ts`: accept password via `x-organizer-password` header (keep query param working for one release for open rooms). In `[code]/actions/route.ts` and `applyBuzzerAction`, pass the already-loaded room into role determination instead of `roleForRoom`'s extra query. In `BuzzerArena.tsx`: send the header in `fetchRoom`.
- Acceptance: create room → password format new; wrong password → participant role; organizer actions still work; existing DB rooms unaffected (passwords are stored per-room).
- Pitfall: `roleForRoom` compares against `expiresAt` — preserve that. Don't touch scoring/timeout logic in this task.

**TASK F — Deduplicate helpers + type the NSB seams** *(roadmap 7, biggest task)* ✅ DONE (2026-07-12) — new `src/lib/{grading,subjects,levels,shuffle}.ts` + typed `NsbLesson`/`NsbRawQuestion` + `toLesson` mapper; `QuestionText` now used in QuickTestRunner; alternate-answer grading fixed. 36 new unit tests pin slugs/grading/levels. `eslint src` 0 errors. (One follow-up type cast in `nsbQuestions.ts` applied centrally during build verification.)
- Objective: one implementation each for grading, slugification, level parsing, emoji lookup, seat labels, shuffle, NSB lesson mapping; zero `no-explicit-any` errors in `src/`.
- Create: `src/lib/grading.ts` (`normalizeAnswer`, `isAnswerCorrect(question, answer)` — **with** `alternateAnswers`), `src/lib/subjects.ts` (`slugifySubject`, `subjectEmoji`), `src/lib/levels.ts` (`parseSchoolLevel(level: string): SchoolLevelFilter | undefined`, `schoolLevelLabel`), `src/lib/shuffle.ts`. Add `NsbLesson` type in `nsbQuestions.ts` matching `lessons.json` fields and a single `toLesson(nsbLesson): Lesson` mapper used by `getLessonsByCompetition`, `getLessonsByIds`, `getLessonBySlug`.
- Replace usages in: `SimplePracticeQuestion`, `QuickTestRunner`, `TestRunner` (also switch their prompt/choice/answer rendering to `<QuestionText>`), the 5 pages with `emojiMap`, `routes.ts`/`sitemap.ts`/`data.ts` slugify, 6 pages' level parsing, `BuzzerArena`+`buzzerRooms` `formatSeatLabel` (export from a shared module — careful: `buzzerRooms` is server-only; put the label fn in `src/lib/seatLabels.ts` importable by both).
- Tests required: unit tests for `isAnswerCorrect` (alternates, whitespace, case), `slugifySubject` (all 18 real subject names across 3 competitions → current slugs unchanged), `parseSchoolLevel`.
- Acceptance: `npx eslint src` → 0 errors; `npm test` green; a question containing `<sup>` renders formatted in QuickTestRunner; picking an alternate answer in a quick test scores correct.
- Pitfall: `slugifySubject` must reproduce today's URLs exactly (`"Earth and Space"` → `earth-and-space`) or existing links/SEO break — pin with the test before refactoring.

**TASK G — Remove the dead tests feature** *(roadmap 6)* ✅ DONE (2026-07-11)
- Objective: no dead routes/data for prebuilt tests.
- Delete: `src/data/tests.ts` contents (or the file + fix imports), `src/app/[competitionSlug]/[level]/tests/[testId]/`, `src/components/TestCard.tsx`, `TestRunner.tsx` (only used by testId page), `getTestsByCompetition`/`getTestBySlug`/`getQuestionsForTest` from `data.ts`, related cases from `data.local.test.ts`, plus dead components `Breadcrumbs.tsx`, `MedalMark.tsx`, `PracticeQuestionCard.tsx`, `CompetitionSwitcher.tsx` and dead exports `getLessonsByIds`, `getBuzzerQuestions` (verify zero importers first with grep).
- Acceptance: build + tests green; `/science-bowl/middle-school/tests` (TestBuilder flow) still works.
- Pitfall: `AutoBreadcrumbs` is the live breadcrumb component — `Breadcrumbs.tsx` is the dead one; confirm before deleting. `data.local.test.ts` is described as a contract — updating it is expected here since the removed readers are gone, but do not weaken the surviving assertions.

**TASK H — Hub dedup + level-aware lessons** *(roadmap 8)* ✅ DONE (2026-07-12) — chose a shared `ScienceBowlHub` component over a redirect (preserves the indexed `/science-bowl` URL); metadata canonical path fixed to include `[level]`; lesson `levelHint` confirmed already wired. Both hub URLs verified to render identically (info-session link present on level pages, absent on `/science-bowl`).
- Objective: single source for the Science Bowl hub; lesson URLs respect level.
- Changes: in `[competitionSlug]/page.tsx`, for science-bowl `redirect(competitionLevelPath(slug, level === "high-school" ? "high-school" : "middle-school"))` (preserving the `?level=` query) and delete the duplicated hub JSX; in `learning/[lessonId]/page.tsx`, pass `level === "middle-school" ? "Middle School" : "High School"` as `levelHint` to `getLessonBySlug`, and filter the sibling lookup by the same level; fix `generateMetadata` in `learning/subject/[subjectSlug]/page.tsx` to include `/${level}/`.
- Acceptance: `/science-bowl` 307→`/science-bowl/middle-school`; `/science-bowl?level=high-school` → high-school; an MS/HS slug-colliding lesson opens the right one from each level path.
- Pitfall: the legacy non-science-bowl flow in `[competitionSlug]/page.tsx` must keep working (searchParams-driven) — only the science-bowl branch is removed.

**TASK I — Buzzer concurrency + polling economy** *(roadmap 9)* ✅ DONE (2026-07-12) — `judge` and `nextQuestion` now use guarded `updateMany` (WHERE re-asserts buzzedSeatId/status and questionNumber), gating score+event writes on `count`. Live double-judge test confirmed +4 once, one event. Polling economy done earlier. 49 buzzer helper unit tests added. Rounds `roundNumber` left as a deferred product decision (not removed).
- Objective: judge/nextQuestion can't double-apply; polling costs less.
- Changes in `buzzerRooms.ts`: convert `judge`'s `update` to `updateMany({ where: { id, buzzedSeatId: room.buzzedSeatId, status: room.status } , data: …})` and skip event+score writes when `count === 0`; same guard idea for `nextQuestion` (`where: { id, questionNumber: room.questionNumber }`). Either delete `roundNumber`/`totalRounds` display or implement round advancement — recommend deleting the "Round" concept from serialization + UI until designed. In `BuzzerArena.tsx`: poll interval 750→1500 ms, skip fetch when `document.visibilityState === "hidden"`.
- Tests: add `src/lib/buzzerRooms.test.ts` unit tests for the pure helpers (`timeRemaining`, `questionClockRemaining`, `effectiveStatus`, `resumeStatus`, `clampInteger`, `clampText`) — export them or test via a small refactor; full-engine tests need a DB and are out of scope.
- Acceptance: two rapid judge POSTs award once (manual two-tab test); game flow (read→buzz→judge→bonus→next) unchanged.
- Pitfall: this is the riskiest task — the timeout/pause state machine is subtle and **correct today**; do not restructure it, only add guards.

**TASK J — Docs truth pass** *(roadmap 12, last)* ✅ DONE (2026-07-11)
- Objective: CLAUDE.md, README, `.env.example` describe the current system.
- Rewrite CLAUDE.md: content = committed JSON/markdown under `docs/` (loaders in `src/data/nsbQuestions.ts`), DB = buzzer-only, route structure with `[level]`, commands (no `db:seed`), test strategy, the `outputFileTracingIncludes` requirement, and the P1-2 note about `questions.json` size. Purge from `.env.example`: `OPENAI_*`, `GROQ_*`, `REVALIDATE_SECRET` (if `/api/revalidate` was removed in P2-7), `DIRECT_URL` if unused. Update README's script/architecture sections.
- Acceptance: every command in CLAUDE.md runs; every referenced file exists.

## 6. Quick Wins (under an hour each)

**All 8 completed ✅ (2026-07-11)**

1. `eslint.config.mjs` ignore `.claude/**` → lint errors 132→18 (18 remaining are pre-existing `src/` errors deferred to Task F).
2. Remove Sign In button (`Header.tsx` and `src/app/page.tsx` hero).
3. `git rm docs/nsb/questions_backup.json` (−24 MB).
4. Fix `emojiMap` key `"Earth & Space"` → `"Earth and Space"` (or ship Task F).
5. `sitemap.ts`: use `siteUrl`, drop 404 routes.
6. Pass `levelHint` in `learning/[lessonId]/page.tsx`.
7. Poll interval 750→1500 ms + hidden-tab skip.
8. Delete `/api/revalidate` + `contentTag` (orphaned).

## 7. Long-Term Improvements (not in this plan's scope)
- Replace polling with SSE or a realtime provider for the Buzzer Arena.
- Split `questions.json` per level/subject with lazy loading (halves server memory; enables static generation of count pages).
- Real timed-test engine (persisted attempts) — prerequisite for the "Personalized Path" the homepage promises.
- Auth + user progress (the removed Sign In should return only with a real auth story).
- Restore an AI-explanation endpoint (the Groq route was removed but `.env.example`/UI copy still gesture at it) — decide product intent first.
- Component/e2e test coverage (Playwright is already installed).

## 8. Do NOT Change
- **`buzzerRooms.ts` scoring rules** (+4 toss-up, +10 bonus, +4 to the opposing team on incorrect interrupt) — matches NSB rules; verified intentional.
- **`includeRoomWithTimeout` timeout mechanics** and the guarded `updateMany` in `buzz`/`sit` — subtle, correct, load-bearing.
- **`docs/nsb/questions.json` / `lessons.json` content** and `docs/content/**` markdown — pipeline-generated; edits belong upstream (relocation/renaming per P1-2 is fine, content edits are not).
- **`getNsbLessonContent`'s section parser** and `lessonContent.ts` table parsers — tuned to the real corpus; only touch with corpus-backed tests.
- **`src/lib/data.local.test.ts` surviving assertions** — the behavioral contract for the readers (Task G may remove cases for deleted readers only).
- **`prisma/schema.prisma` buzzer models** — no schema changes in this plan (baseline migration only).
- **URL structure** `/{competition}/{level}/{section}` — indexed by search engines; the sitemap depends on it.

## 9. Final Implementation Checklist
- [x] A: eslint ignores + hygiene + CI workflow ✅ (2026-07-12); `eslint src` 0 errors after Task F
- [x] B: Prisma baseline migration created ✅ (2026-07-11); idempotent, no `migrate resolve` needed
- [x] C: `outputFileTracingIncludes` added ✅ (2026-07-11); pending prod-deploy verification
- [x] D: 404 removal (Sign In, sitemap, placeholder links) ✅ (2026-07-11); pending: set `NEXT_PUBLIC_SITE_URL=https://medalminds.com` in Vercel
- [x] E: buzzer auth ✅ (2026-07-11) — crypto codes/passwords, header transport, single role query; live-smoke-tested
- [x] F: shared grading/slugify/level/emoji/shuffle + typed NSB seams + `<QuestionText>` ✅ (2026-07-12); seat-label dedup deferred (kept 2 copies to avoid buzzer-file conflict)
- [x] G: dead tests feature + dead components/exports removed ✅ (2026-07-11)
- [x] H: hub dedup (shared component, URLs preserved) + level-aware lessons + metadata path fix ✅ (2026-07-12)
- [x] I: judge/nextQuestion guards + polling economy + buzzer helper tests ✅ (2026-07-12); rounds decision deferred
- [x] J: CLAUDE.md / README / `.env.example` rewritten ✅ (2026-07-11)
- [x] Post-plan: lint (0 errors) / test (95 pass) / build (green) re-run ✅ (2026-07-12); route 404 crawl + buzzer auth & double-judge smoke tests passed. STILL PENDING (needs prod/human): preview-deploy lesson-content check (P0-2), set `NEXT_PUBLIC_SITE_URL` in Vercel (P0-3), Prisma `migrate resolve` decision on prod (P0-1/Task B), and a real two-browser buzzer game.
