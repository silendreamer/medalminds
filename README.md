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

The current backend pass supports read-only content from PostgreSQL. Competitions now have normalized `CompetitionLevel` rows for divisions or grade bands, such as Middle School, High School, Division B, and Division C. Questions use a generic `Question` table with `QuestionFormat`, `QuestionKind`, `SchoolLevel`, source metadata fields, and a dedupe-friendly `sourceHash`. Practice question answers are normalized into an `Answer` table, and difficulty is defined as a PostgreSQL/Prisma enum with `FOUNDATIONAL`, `INTERMEDIATE`, and `ADVANCED`. User accounts, saved progress, admin tools, payments, and real-time features remain out of scope until the core content database is stable.

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
