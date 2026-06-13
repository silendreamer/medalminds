# MedalMinds

MedalMinds is a simple Next.js MVP for academic competition prep at `medalminds.com`. It uses local TypeScript data files and dynamic routing to create mini-sites for:

- Science Bowl
- Science Olympiad
- Math Olympiad

The app includes practice questions, learning lessons, test-taking flows, and a Science Bowl Buzzer Arena. It can run from local TypeScript data for development, or from PostgreSQL when database environment variables are configured.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Without database variables, the app automatically uses the local TypeScript sample data. To run against PostgreSQL, copy `.env.example` to `.env.local`, set the database URL values, then run:

```bash
npm run db:deploy
npm run db:seed
npm run dev
```

## Routes

- `/`
- `/science-bowl`
- `/science-bowl/practice`
- `/science-bowl/buzzer`
- `/science-bowl/learning`
- `/science-bowl/learning/[lessonId]`
- `/science-bowl/tests`
- `/science-bowl/tests/[testId]`

The same structure is available for `/science-olympiad` and `/math-olympiad`.

## Data files

Local content lives in:

- `src/data/competitions.ts`
- `src/data/practiceQuestions.ts`
- `src/data/lessons.ts`
- `src/data/tests.ts`
- `src/data/buzzerQuestions.ts`

Shared types live in `src/types/index.ts`. Data lookup helpers live in `src/lib/data.ts`.

## Import DOE/OSTI Science Bowl Sample Questions

This repo includes scripted importers for DOE/OSTI Science Bowl sample question PDFs.

- Source page: `https://science.osti.gov/wdts/nsb/Regional-Competitions/Resources/MS-Sample-Questions`
- Source page: `https://science.osti.gov/wdts/nsb/Regional-Competitions/Resources/HS-Sample-Questions`
- The importer discovers sample-round PDF links automatically from that page.
- It downloads each PDF, extracts text, parses toss-up and bonus questions, and writes records into `Question` and `Answer` tables.
- The importer stores source metadata like `sourcePdfUrl`, `sourceSet`, `sourceRound`, and `sourceHash`.
- Duplicate prevention is implemented using a stable source hash based on the PDF URL, question kind, question number, and normalized prompt.

Run a dry run first:

```bash
npm run import:osti-ms-science-bowl -- --dry-run --max-pdfs 2
```

Export parsed data instead of writing to Postgres:

```bash
npm run import:osti-ms-science-bowl -- --output-format=csv --max-pdfs 2
```

```bash
npm run import:osti-ms-science-bowl -- --output-format=sql --max-pdfs 2
```

```bash
npm run import:osti-ms-science-bowl -- --output-format=sqlite --max-pdfs 2
```

Import into the database:

```bash
DATABASE_URL="postgres://..." npm run import:osti-ms-science-bowl
```

Import the already-generated middle school and high school SQLite exports into the configured Prisma/PostgreSQL database:

```bash
npm run import:osti-sqlite
```

This command removes the old MedalMinds placeholder practice rows, reloads the DOE/OSTI Science Bowl rows from `.cache/osti-science-bowl/osti-ms-all-sets.sqlite` and `.cache/osti-science-bowl/osti-hs-all-sets.sqlite`, and creates `AnswerExplanation` rows for each imported question. Keep it as an explicit admin import, not part of the Vercel build command.

Limit import scope:

```bash
npm run import:osti-ms-science-bowl -- --set 1 --round 1
```

Notes:

- The script caches downloaded PDFs in `.cache/osti-science-bowl/` unless `--refresh` is passed.
- The source page warns that answers may change as science advances.
- If PostgreSQL environment variables are not configured, the importer will not execute database writes.

What tables are populated:

- `Question`
- `Answer`
- `AnswerExplanation`

## Generate worked answer explanations

The app displays `AnswerExplanation.shortExplanation` after a student checks an answer. If that row is missing, it falls back to the legacy `Question.explanation` field. To replace imported placeholder explanations with generated worked solutions, configure `OPENAI_API_KEY` in `.env.local` and run the admin script locally against the same Postgres database used by Vercel.

Dry run a small batch first:

```bash
npm run generate:answer-explanations -- --limit=3 --list-only
npm run generate:answer-explanations -- --limit=3
```

Write a small batch:

```bash
npm run generate:answer-explanations -- --limit=3 --write
```

Useful filters:

```bash
npm run generate:answer-explanations -- --school-level=middle-school --category=Physics --limit=5 --write
npm run generate:answer-explanations -- --question-id=QUESTION_ID --write
```

The script prints a `verificationPath` for each generated row, such as:

```text
/science-bowl/practice?level=middle-school&subject=Physics&q=QUESTION_ID
```

After Vercel redeploys this code, open `https://medalminds.vercel.app` plus that path to inspect the exact question and confirm the generated solution appears after tapping `Check answer`.

## Group questions into reusable learn-more concepts

Use concepts to avoid generating one lesson per question. The concept generator prefers an existing concept in the same competition/category/school level, links the question to that concept, and creates a new concept lesson only when no existing concept fits. The default write safety cap is `--max-new-concepts=3`.

Inspect candidates without using OpenAI tokens:

```bash
npm run generate:question-concepts -- --limit=5 --list-only
```

Dry run AI decisions without writing:

```bash
npm run generate:question-concepts -- --limit=5
```

Write links and allow at most three new concept lessons:

```bash
npm run generate:question-concepts -- --limit=5 --write
```

Useful filters:

```bash
npm run generate:question-concepts -- --school-level=middle-school --category=Math --limit=10 --write
npm run generate:question-concepts -- --question-id=QUESTION_ID --write
npm run generate:question-concepts -- --limit=50 --max-new-concepts=10 --write
```

Do not run with a very high `--max-new-concepts` unless you intentionally want to expand the lesson library. Existing concepts should absorb similar questions.

The importer reuses the existing Prisma schema and does not introduce a new ORM.

## Add a new competition

1. Add a competition record to `src/data/competitions.ts`.
2. Add the new slug to the `CompetitionSlug` union in `src/types/index.ts`.
3. Add practice questions in `src/data/practiceQuestions.ts`.
4. Add lesson topics in `src/data/lessons.ts`.
5. Add test themes and question IDs in `src/data/tests.ts`.

Because the route structure is dynamic, pages for the new competition will work once the data exists.

## Add questions, lessons, and tests

Questions should include `id`, `competitionSlug`, `category`, `level`, `difficulty`, `type`, `prompt`, `correctAnswer`, and `explanation`. Multiple choice questions also include `choices`; short answer questions can include `alternateAnswers`.

Lessons include a slug, metadata, key concepts, content sections, and mini review questions.

Tests include metadata and a `questionIds` array. The test runner loads those local questions, shows one question at a time, allows navigation, and displays a scored review after submit.

## PostgreSQL backend plan

This MVP now includes a PostgreSQL/Prisma backend path. The data helpers in `src/lib/data.ts` read from PostgreSQL when a supported database URL is configured, and fall back to local TypeScript data when no database URL is present.

The backend architecture, schema, migration details, and deployment notes live in [`docs/postgres-backend-plan.md`](docs/postgres-backend-plan.md).

Implemented backend stack:

- PostgreSQL
- Prisma
- `@prisma/adapter-pg` with `pg`
- Hosted database provider such as Supabase Postgres, Neon, Railway Postgres, or Vercel Postgres
- Server-side repository functions called from the existing Next.js routes

The current backend pass supports read-only content from PostgreSQL. Competitions now have normalized `CompetitionLevel` rows for divisions or grade bands, such as Middle School, High School, Division B, and Division C. Questions use a generic `Question` table with `QuestionFormat`, `QuestionKind`, `SchoolLevel`, source metadata fields, and a dedupe-friendly `sourceHash`. Practice question answers are normalized into an `Answer` table, answer reveal explanations are normalized into an `AnswerExplanation` table, and difficulty is defined as a PostgreSQL/Prisma enum with `FOUNDATIONAL`, `INTERMEDIATE`, and `ADVANCED`. User accounts, saved progress, admin tools, payments, and real-time features remain out of scope until the core content database is stable.

## Vercel deployment

For Vercel with Supabase Postgres, add the Supabase/Vercel integration environment variables to the project. The app recognizes:

- `DATABASE_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL`
- `POSTGRES_URL_NON_POOLING`
- `DIRECT_URL`

Runtime reads prefer `DATABASE_URL`, then `POSTGRES_PRISMA_URL`, then `POSTGRES_URL`. Prisma migrations prefer `DIRECT_URL` or `POSTGRES_URL_NON_POOLING`.

Set the Vercel build command to:

```bash
npm run vercel-build
```

That command runs:

1. `prisma migrate deploy`
2. `prisma db seed`
3. `next build`

Do not commit `.env.local` or any Supabase service role keys.

Subdomain routing can also be added later by mapping hostnames like `science-bowl.medalminds.com` to the same competition slugs currently used in path-based routes.

## Disclaimer

This is an independent educational practice platform. It is not affiliated with or endorsed by any official competition organization.
