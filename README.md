# MedalMinds

MedalMinds is a Next.js 16 (App Router) / React 19 site for academic competition prep at `medalminds.com`. It offers practice questions, learning lessons, timed tests, and a real-time Science Bowl Buzzer Arena.

Live product: **Science Bowl** — 25,650 real NSB questions and 2,031 topic lessons covering Biology, Chemistry, Physics, Earth and Space, Energy, and Math for both Middle School and High School levels. Science Olympiad and Math Olympiad are placeholder shells (coming soon).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No database is required to run the app — all Science Bowl content is served from committed JSON and Markdown files.

The Buzzer Arena requires PostgreSQL (see below).

## Routes

```
/                                          # home
/science-bowl                              # competition hub
/science-bowl/middle-school                # level hub
/science-bowl/middle-school/practice
/science-bowl/middle-school/practice/[subject]
/science-bowl/middle-school/learning
/science-bowl/middle-school/learning/[lessonId]
/science-bowl/middle-school/learning/subject/[subjectSlug]
/science-bowl/middle-school/tests
/science-bowl/middle-school/tests/[testId]
/science-bowl/middle-school/tests/subject/[subjectSlug]
/science-bowl/high-school/...              # same structure
/science-bowl/buzzer                       # Buzzer Arena
/science-bowl/info-session                 # info page
```

Use `src/lib/routes.ts` helpers to build URLs; do not hardcode paths.

## Content architecture

All Science Bowl content is committed to the repo — there is no database-backed content layer:

| Source | Contents |
|---|---|
| `docs/nsb/questions.json` | ~24 MB, ~25,650 questions |
| `docs/nsb/lessons.json` | ~1.4 MB, ~2,031 lesson metadata records |
| `docs/content/nsb/**` | 2,107 Markdown lesson body files |

Loaders are in `src/data/nsbQuestions.ts`. The JSON files are dynamically imported and memoized at module scope; lesson bodies are read with `fs.readFile` at request time. All reads are coordinated through `src/lib/data.ts`.

**`next.config.ts` must keep `outputFileTracingIncludes: { "/**": ["./docs/content/**"] }`** so Vercel includes the Markdown files in the serverless bundle. Removing it causes lesson pages to silently render with no content.

Science Olympiad and Math Olympiad content arrays (`src/data/practiceQuestions.ts`, `src/data/lessons.ts`) are intentionally empty.

## Buzzer Arena setup (PostgreSQL required)

The Buzzer Arena (`/science-bowl/buzzer`) stores rooms in PostgreSQL. To run it locally:

1. Copy `.env.example` to `.env.local` and fill in your database URL.
2. Apply the Buzzer Arena schema:

```bash
npm run db:deploy
npm run dev
```

There is no seed script. The schema is in `prisma/schema.prisma`; the single migration is `prisma/migrations/0001_buzzer_baseline/`.

## Commands

```bash
npm run dev            # Next dev server at http://localhost:3000
npm run build          # Typecheck + production build
npm run lint           # ESLint (flat config in eslint.config.mjs)
npm test               # Vitest (single pass, no DB required)
npm run test:watch     # Vitest watch mode
npm run db:generate    # prisma generate (runs automatically on postinstall)
npm run db:migrate     # Create/apply a migration in dev
npm run db:deploy      # Apply existing migrations to prod
npm run vercel-build   # prisma migrate deploy && next build (used by Vercel)
```

## Generate worked answer explanations

The `explainAnswer` field on each question in `docs/nsb/questions.json` holds 2–5 step-by-step solution strings shown after a student checks their answer. To backfill missing explanations using OpenAI:

```bash
# Set OPENAI_API_KEY in .env.local, then:
npm run generate:nsb-answer-explanations -- --limit=10 --dry-run
npm run generate:nsb-answer-explanations -- --limit=10
npm run generate:nsb-answer-explanations            # process all pending
```

Flags: `--limit=N` (cap), `--dry-run` (no writes), `--concurrency=N` (default 10), `--openai-rpm=N` (rate limit, default 300). The script is safely resumable — it skips questions that already have a non-empty `explainAnswer`.

Optional env vars for this script: `OPENAI_MODEL` (default `gpt-4o-mini`), `OPENAI_RPM`, `OPENAI_CONCURRENCY`.

## Add a new competition

1. Add a competition record to `src/data/competitions.ts`.
2. Add the new slug to the `CompetitionSlug` union in `src/types/index.ts`.
3. Add practice questions to `src/data/practiceQuestions.ts` (or a new loader like `src/data/nsbQuestions.ts`).
4. Add lesson metadata to `src/data/lessons.ts` (or a new loader).
5. Wire up the new loader in `src/lib/data.ts` (see the `slug === "science-bowl"` pattern).

## Vercel deployment

Set these environment variables in your Vercel project:

```
DATABASE_URL          # PostgreSQL connection string (required for Buzzer Arena)
NEXT_PUBLIC_SITE_URL  # canonical base URL, e.g. https://medalminds.com
```

Vercel/Supabase integrations may provide `POSTGRES_PRISMA_URL`, `POSTGRES_URL`, or `POSTGRES_URL_NON_POOLING` instead of `DATABASE_URL` — the app reads all of them in that priority order (see `src/lib/db.ts`).

Set the Vercel build command to `npm run vercel-build` (`prisma migrate deploy && next build`).

## Disclaimer

This is an independent educational practice platform. It is not affiliated with or endorsed by the U.S. Department of Energy, the National Science Bowl, or any other official competition organization.
