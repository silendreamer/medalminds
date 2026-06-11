# PostgreSQL Backend Architecture

This document describes the implemented PostgreSQL/Prisma backend path for MedalMinds. The app still supports local TypeScript data fallback when no database URL is configured, which keeps development and preview builds simple.

## Goals

- Keep the current Next.js app and path-based routing.
- Use database-backed reads when PostgreSQL is configured.
- Keep local TypeScript content arrays as seed data and fallback data.
- Preserve the competition mini-site model for Science Bowl, Science Olympiad, and Math Olympiad.
- Support future admin/content workflows without building an admin dashboard in the first backend pass.
- Make it easy to deploy on Vercel with a hosted PostgreSQL provider.

## Non-Goals For First Backend Pass

- No real-time multiplayer.
- No payments.
- No full admin dashboard.
- No complex team management.
- No mandatory user accounts for browsing practice content.
- No rewrite to another framework.

## Implemented Stack

- **App framework:** Existing Next.js app router.
- **Database:** PostgreSQL.
- **Database host:** Supabase Postgres, Neon, Railway Postgres, or Vercel Postgres.
- **ORM/query layer:** Prisma.
- **Driver adapter:** `@prisma/adapter-pg` with `pg`.
- **Validation:** Zod for request validation once write endpoints exist.
- **Auth later:** Auth.js, Clerk, or Supabase Auth only when user accounts become necessary.

Prisma is recommended because the domain is relational, migrations are straightforward, and the generated TypeScript client fits the current codebase well.

## Architecture

```text
Next.js routes/pages
        |
        v
src/lib/data.ts
        |
        +-- no database URL: local TypeScript arrays
        |
        +-- database URL configured: Prisma-backed reads
                |
                v
          Prisma Client
                |
                v
          PostgreSQL
```

The UI calls helper functions such as `getCompetitionBySlug`, `getQuestionsByCompetition`, `getLessonsByCompetition`, and `getTestsByCompetition`. Those helpers are async and read from PostgreSQL when available.

## Data Model

### competitions

Stores the top-level mini-site configuration.

```sql
id uuid primary key
slug text unique not null
name text not null
description text not null
short_description text not null
subdomain text unique not null
categories text[] not null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

### practice_questions

Stores reusable practice questions and toss-up style prompts.

```sql
id uuid primary key
competition_id uuid not null references competitions(id)
category text not null
level text not null
difficulty text not null
type text not null
prompt text not null
choices jsonb
correct_answer text not null
alternate_answers text[]
explanation text not null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

Recommended indexes:

```sql
create index practice_questions_competition_idx on practice_questions(competition_id);
create index practice_questions_filters_idx on practice_questions(competition_id, category, difficulty, type);
```

### lessons

Stores learning lessons and detail-page content.

```sql
id uuid primary key
competition_id uuid not null references competitions(id)
slug text not null
title text not null
category text not null
level text not null
estimated_minutes integer not null
summary text not null
key_concepts text[] not null
content_sections jsonb not null
review_questions text[] not null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
unique (competition_id, slug)
```

### tests

Stores test metadata.

```sql
id uuid primary key
competition_id uuid not null references competitions(id)
slug text not null
title text not null
level text not null
categories text[] not null
time_limit_minutes integer not null
description text not null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
unique (competition_id, slug)
```

### test_questions

Links tests to practice questions in a stable order.

```sql
test_id uuid not null references tests(id) on delete cascade
question_id uuid not null references practice_questions(id)
position integer not null
primary key (test_id, question_id)
unique (test_id, position)
```

### buzzer_questions

Stores Science Bowl Buzzer Arena question pairs.

```sql
id uuid primary key
competition_id uuid not null references competitions(id)
category text not null
difficulty text not null
tossup_prompt text not null
tossup_answer text not null
tossup_explanation text not null
bonus_prompt text not null
bonus_answer text not null
bonus_explanation text not null
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

Add an application-level rule that buzzer questions are only used for the `science-bowl` competition.

## Future User Progress Tables

Add these only when accounts are introduced.

```text
users
teams
team_members
practice_attempts
test_attempts
test_attempt_answers
buzzer_rounds
buzzer_round_events
```

Do not add these tables until the product needs persistent progress, team visibility, or coach dashboards.

## Prisma Model Sketch

```prisma
model Competition {
  id               String             @id @default(uuid())
  slug             String             @unique
  name             String
  description      String
  shortDescription String
  subdomain        String             @unique
  categories       String[]
  questions        PracticeQuestion[]
  lessons          Lesson[]
  tests            Test[]
  buzzerQuestions  BuzzerQuestion[]
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt
}

model PracticeQuestion {
  id               String       @id @default(uuid())
  competitionId    String
  competition      Competition  @relation(fields: [competitionId], references: [id])
  category         String
  level            String
  difficulty       String
  type             String
  prompt           String
  choices          Json?
  correctAnswer    String
  alternateAnswers String[]
  explanation      String
  tests            TestQuestion[]
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
}

model Lesson {
  id               String      @id @default(uuid())
  competitionId    String
  competition      Competition @relation(fields: [competitionId], references: [id])
  slug             String
  title            String
  category         String
  level            String
  estimatedMinutes Int
  summary          String
  keyConcepts      String[]
  contentSections  Json
  reviewQuestions  String[]
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt

  @@unique([competitionId, slug])
}

model Test {
  id               String         @id @default(uuid())
  competitionId    String
  competition      Competition    @relation(fields: [competitionId], references: [id])
  slug             String
  title            String
  level            String
  categories       String[]
  timeLimitMinutes Int
  description      String
  questions        TestQuestion[]
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt

  @@unique([competitionId, slug])
}

model TestQuestion {
  testId     String
  questionId String
  position   Int
  test       Test             @relation(fields: [testId], references: [id], onDelete: Cascade)
  question   PracticeQuestion @relation(fields: [questionId], references: [id])

  @@id([testId, questionId])
  @@unique([testId, position])
}

model BuzzerQuestion {
  id                 String      @id @default(uuid())
  competitionId      String
  competition        Competition @relation(fields: [competitionId], references: [id])
  category           String
  difficulty         String
  tossupPrompt       String
  tossupAnswer       String
  tossupExplanation  String
  bonusPrompt        String
  bonusAnswer        String
  bonusExplanation   String
  createdAt          DateTime    @default(now())
  updatedAt          DateTime    @updatedAt
}
```

## Repository Layer

The database boundary is centralized in:

```text
src/lib/db.ts
src/lib/data.ts
```

`src/lib/db.ts` lazily creates a Prisma Client only when a database URL exists. This avoids bundling or connecting to PostgreSQL for local fallback builds.

`src/lib/data.ts` is the compatibility repository layer. It uses Prisma reads when configured and local TypeScript data otherwise.

## Route Changes

Most routes can stay the same. The main change is that pages using data helpers will become async database reads.

Examples:

```ts
const competition = await getCompetitionBySlug(competitionSlug);
const questions = await getQuestionsByCompetition(competitionSlug);
```

For interactive client components, keep the current pattern:

1. Server page loads data from PostgreSQL.
2. Server page passes plain JSON-safe props into client components.
3. Client component keeps local interaction state in React.

## API Routes

Do not add API routes for read-only page data in the first backend pass. Server components can read directly through Prisma.

Add API routes later for writes:

```text
POST /api/practice-attempts
POST /api/test-attempts
POST /api/buzzer-rounds
POST /api/feedback
```

Those endpoints should use Zod validation and only be introduced when persistent user progress or feedback is needed.

## Migration Plan

### Phase 1: Database Foundation

Completed:

1. Added Prisma and PostgreSQL connection configuration.
2. Created `prisma/schema.prisma`.
3. Added `prisma.config.ts` for Prisma 7 CLI database URL handling.
4. Added initial migration in `prisma/migrations/0001_init/migration.sql`.
5. Added seed script at `prisma/seed.ts`.
6. Seed script loads:
   - 3 competitions
   - 30 practice questions
   - 30 lessons
   - 30 tests
   - 10 Science Bowl buzzer questions

### Phase 2: Read Path Migration

Completed:

1. Converted route pages to await repository reads.
2. Kept client interaction state unchanged.
3. Kept `src/data/*` as seed inputs and fallback data.
4. Kept client navigation imports on static competition config to avoid bundling PostgreSQL code in the browser.

### Phase 3: Content Operations

1. Add internal seed/update scripts for content.
2. Add CSV or JSON import tooling if content volume grows.
3. Add admin dashboard only after content editing becomes frequent.

### Phase 4: Accounts And Progress

1. Add auth provider.
2. Add user and attempt tables.
3. Persist practice answers, test attempts, and topic accuracy.
4. Add coach/team views.

## Environment Variables

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

For Prisma migrations, some providers also recommend:

```bash
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

Vercel/Supabase integrations often provide:

```bash
POSTGRES_PRISMA_URL="postgresql://USER:PASSWORD@HOST:6543/DATABASE?sslmode=require&pgbouncer=true"
POSTGRES_URL="postgresql://USER:PASSWORD@HOST:6543/DATABASE?sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

Runtime reads prefer `DATABASE_URL`, then `POSTGRES_PRISMA_URL`, then `POSTGRES_URL`, then `POSTGRES_URL_NON_POOLING`.

Prisma migration commands prefer `DIRECT_URL`, then `POSTGRES_URL_NON_POOLING`, then `DATABASE_URL`, then `POSTGRES_PRISMA_URL`, then `POSTGRES_URL`.

Never commit `.env` files.

## Deployment Notes

### Vercel

1. Create or connect a hosted PostgreSQL database.
2. Add the Supabase/Vercel Postgres environment variables in Vercel project settings.
3. Set the Vercel build command to:

   ```bash
   npm run vercel-build
   ```

4. The build command runs migrations, seeds initial content, and then builds Next.js.
5. The app will use PostgreSQL at runtime when those env vars are present.

### Local Development

Use one of:

- Hosted dev database.
- Local PostgreSQL installed on the machine.
- Docker only if the project later chooses to standardize local services. Docker is not required for the current MVP.

## Security Notes

- Use parameterized ORM queries through Prisma.
- Keep database credentials in environment variables.
- Avoid exposing answer-management endpoints until auth exists.
- Rate-limit future write endpoints.
- Treat imported content as untrusted and validate it before insertion.

## Open Decisions

- Database host: Neon, Supabase, Railway, or Vercel Postgres.
- Whether to keep Prisma or use direct SQL with `postgres.js`.
- Whether content editing should be seed-script based or admin-dashboard based.
- When to introduce auth and persistent progress.
