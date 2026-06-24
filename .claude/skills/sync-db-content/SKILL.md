---
name: sync-db-content
description: >
  Use this skill whenever the user wants to audit, sync, or fix content in the
  MedalMinds PostgreSQL database — specifically questions and lessons. Triggers
  include: "check what's missing from the database", "sync local questions to DB",
  "fix multiple choice formatting", "the answer choices look wrong", "validate
  answers", "add missing content", or any request to compare the local TypeScript
  data files against what's in the database. Also use for requests to update or
  fix individual questions, answer choices, or explanations in the DB.
---

## Overview

MedalMinds has two content sources:

1. **Local TypeScript files** (`src/data/practiceQuestions.ts`, `src/data/lessons.ts`) — a small hand-authored set, always present.
2. **PostgreSQL** — the bulk content (20 000+ Science Bowl questions from OSTI imports). The app uses DB when `DATABASE_URL` is set, local files otherwise.

The scripts in this skill live at `.claude/skills/sync-db-content/scripts/` and are run with `npx tsx`.

## Prerequisites

- `.env.local` must contain a working `DATABASE_URL` (or `POSTGRES_PRISMA_URL` / `POSTGRES_URL`).
- `OPENAI_API_KEY` in `.env.local` — only needed for `validate.ts`.
- Dev dependencies already installed (`npm install` done).

## Workflow

Run in this order:

### Step 1 — Audit (always start here)

```bash
npx tsx .claude/skills/sync-db-content/scripts/audit.ts
```

Optional flags:
- `--competition=science-bowl` — filter to one competition
- `--limit=1000` — how many MC questions to scan (default 2000)

Output is a summary table with six checks:
1. Local questions missing from DB
2. Local lessons missing from DB
3. MC questions with wrong Answer row count (not 4)
4. MC questions with "Answer:" label in answer text
5. MC questions with inline W/X/Y/Z choices still in prompt
6. MC questions where `correctAnswer` doesn't match any Answer row

### Step 2 — Sync missing local questions

If audit shows local questions missing:

```bash
# Preview first
npx tsx .claude/skills/sync-db-content/scripts/sync-local.ts --dry-run

# Apply
npx tsx .claude/skills/sync-db-content/scripts/sync-local.ts --write
npx tsx .claude/skills/sync-db-content/scripts/sync-local.ts --write --competition=science-bowl
```

Lessons are synced by `npm run db:seed` — run that for missing lessons.

### Step 3 — Fix MC formatting

If audit shows problems in checks 3, 4, or 5:

```bash
# Preview
npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --dry-run --limit=100

# Apply (batch, can re-run safely)
npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write --limit=500
npx tsx .claude/skills/sync-db-content/scripts/fix-mc.ts --write --competition=science-bowl --limit=1000
```

What it fixes:
- **Fix A** — strips "Answer: X" labels from Answer row text
- **Fix B** — when a prompt has inline W/X/Y/Z and fewer than 4 Answer rows, parses the block into proper Answer rows and strips it from the prompt

After running, re-run `audit.ts` to confirm counts dropped to zero.

### Step 4 — Validate answer correctness (spot-check)

Uses OpenAI to flag questions where the `correctAnswer` may be wrong:

```bash
# Preview — shows questions without calling OpenAI
npx tsx .claude/skills/sync-db-content/scripts/validate.ts --dry-run --limit=20

# Run on a sample
npx tsx .claude/skills/sync-db-content/scripts/validate.ts --limit=50 --model=gpt-4o-mini

# Larger batch
npx tsx .claude/skills/sync-db-content/scripts/validate.ts --limit=200 --competition=science-bowl
```

Flagged questions are printed with the AI's stated issue. Fix them manually via Prisma queries or psql.

## Fixing individual questions manually

When you need to correct a specific question:

```typescript
// Quick one-off fix via tsx REPL or a scratch script
import { getPrisma } from "./src/lib/db";
const prisma = getPrisma();

// Update correctAnswer
await prisma.question.update({
  where: { id: "osti-abc123" },
  data: { correctAnswer: "New correct text" }
});

// Update an Answer row
await prisma.answer.update({
  where: { questionId_text: { questionId: "osti-abc123", text: "Old choice text" } },
  data: { text: "Corrected choice text", isCorrect: true }
});
```

## After making changes

Clear the Next.js content cache so the app picks up changes:

```bash
# If REVALIDATE_SECRET is set in .env.local:
curl -X POST "http://localhost:3000/api/revalidate?secret=$REVALIDATE_SECRET&tag=content:science-bowl"
```

Or restart the dev server — it re-fetches from DB on next request.

## Gotchas

- **MC choices shuffle on every request** — `toPracticeQuestion()` in `src/lib/data.ts` shuffles `answers` before returning them. This is intentional; it's not a bug in the choices.
- **Inline W/X/Y/Z pattern** — OSTI PDFs encode multiple choice as `W) ... X) ... Y) ... Z) ...` inline in the prompt. The `fix-mc.ts` script parses this block. Some questions use lowercase or non-standard labels — those are logged as "SKIP" and need manual handling.
- **correctAnswer may be a letter (W/X/Y/Z) not the choice text** — `fix-mc.ts` maps the letter to the full choice text and updates `correctAnswer` to match. After fixing, `correctAnswer` should always be the full text of the correct choice, not a letter.
- **DB seed vs this skill** — `npm run db:seed` covers competitions, lessons, competition levels, tests, buzzer questions, and curriculum. This skill covers practice questions and MC formatting. Don't use seed to fix individual question issues.
- **Prisma adapter** — the project uses `@prisma/adapter-pg` (Postgres over a connection pool). `getPrisma()` from `src/lib/db` handles this; don't instantiate PrismaClient directly in scripts.
