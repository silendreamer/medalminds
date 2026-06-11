# PostgreSQL Backend Plan

This document outlines how MedalMinds can move from local TypeScript data files to a PostgreSQL-backed application without changing the current route structure or adding unnecessary platform complexity too early.

## Goals

- Keep the current Next.js app and path-based routing.
- Replace local TypeScript content arrays with database-backed reads.
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

## Recommended Stack

- **App framework:** Existing Next.js app router.
- **Database:** PostgreSQL.
- **Database host:** Neon, Supabase Postgres, Railway Postgres, or Vercel Postgres.
- **ORM/query layer:** Prisma for the first production backend.
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
        +-- MVP now: local TypeScript arrays
        |
        +-- Backend phase: database repository functions
                |
                v
          Prisma Client
                |
                v
          PostgreSQL
```

The current UI should continue calling helper functions such as `getCompetitionBySlug`, `getQuestionsByCompetition`, `getLessonsByCompetition`, and `getTestsByCompetition`. During the migration, those helpers become async and read from PostgreSQL.

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

Create a database-backed repository layer instead of querying Prisma directly in page components.

Suggested structure:

```text
src/lib/db.ts
src/lib/repositories/competitions.ts
src/lib/repositories/questions.ts
src/lib/repositories/lessons.ts
src/lib/repositories/tests.ts
src/lib/repositories/buzzer.ts
```

Then update `src/lib/data.ts` to either:

- re-export repository functions, or
- become a compatibility layer while the UI migrates to async database functions.

Example:

```ts
export async function getCompetitionBySlug(slug: string) {
  return prisma.competition.findUnique({ where: { slug } });
}
```

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

1. Add Prisma and PostgreSQL connection configuration.
2. Create `prisma/schema.prisma`.
3. Add `DATABASE_URL` to local `.env`.
4. Create initial migration.
5. Add seed script that imports current local TypeScript content.
6. Verify seeded counts match the MVP:
   - 3 competitions
   - 30 practice questions
   - 30 lessons
   - 30 tests
   - 10 Science Bowl buzzer questions

### Phase 2: Read Path Migration

1. Create repository functions.
2. Convert route pages to await repository reads.
3. Keep client interaction state unchanged.
4. Remove direct UI imports from `src/data/*`.
5. Keep `src/data/*` temporarily as seed inputs.

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

Never commit `.env` files.

## Deployment Notes

### Vercel

1. Create a hosted PostgreSQL database.
2. Add `DATABASE_URL` in Vercel project settings.
3. Run migrations during deployment or through a controlled CI step.
4. Run seed scripts manually for initial content.

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
