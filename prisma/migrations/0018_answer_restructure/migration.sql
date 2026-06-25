-- Migration 0018: Restructure Answer table into MultipleChoice + Answer
--
-- OLD: Answer mixed two concerns (4 choice rows per MC question with isCorrect flag)
-- NEW: MultipleChoice stores options; Answer stores only the correct answer
--       MC → Answer.mcId points to the correct MultipleChoice row
--       SA → Answer.text holds the answer string
--
-- Fully idempotent: safe to re-run if a previous attempt partially completed.
-- Answer_old is kept as backup until Phase 5 (migration 0020).

-- 1. Rename existing Answer table (skip if already renamed)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'Answer'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'Answer_old'
  ) THEN
    ALTER TABLE "Answer" RENAME TO "Answer_old";
  END IF;
  -- Rename the primary key index so it doesn't conflict with the new Answer table
  IF EXISTS (
    SELECT 1 FROM pg_class WHERE relname = 'Answer_pkey' AND relkind = 'i'
  ) THEN
    ALTER INDEX "Answer_pkey" RENAME TO "Answer_old_pkey";
  END IF;
END $$;

-- 2. Create MultipleChoice table
CREATE TABLE IF NOT EXISTS "MultipleChoice" (
    "id"         TEXT         NOT NULL,
    "questionId" TEXT         NOT NULL,
    "text"       TEXT         NOT NULL,
    "position"   INTEGER      NOT NULL DEFAULT 0,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MultipleChoice_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "MultipleChoice_questionId_fkey"
        FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE,
    CONSTRAINT "MultipleChoice_questionId_position_key"
        UNIQUE ("questionId", "position")
);
CREATE INDEX IF NOT EXISTS "MultipleChoice_questionId_idx" ON "MultipleChoice"("questionId");

-- 3. Create new Answer table
CREATE TABLE IF NOT EXISTS "Answer" (
    "id"         TEXT         NOT NULL,
    "questionId" TEXT         NOT NULL,
    "mcId"       TEXT,
    "text"       TEXT,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Answer_questionId_fkey"
        FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE,
    CONSTRAINT "Answer_mcId_fkey"
        FOREIGN KEY ("mcId") REFERENCES "MultipleChoice"("id") ON DELETE CASCADE,
    CONSTRAINT "Answer_mcId_key" UNIQUE ("mcId"),
    CONSTRAINT "Answer_type_check" CHECK (
        ("mcId" IS NOT NULL AND "text" IS NULL) OR
        ("mcId" IS NULL AND "text" IS NOT NULL)
    )
);
CREATE INDEX IF NOT EXISTS "Answer_questionId_idx" ON "Answer"("questionId");

-- 4. Populate MultipleChoice from old MC Answer rows (skip rows already inserted)
INSERT INTO "MultipleChoice" ("id", "questionId", "text", "position", "createdAt")
SELECT
    'mc-' || a.id,
    a."questionId",
    a.text,
    a.position,
    a."createdAt"
FROM "Answer_old" a
JOIN "Question" q ON q.id = a."questionId"
WHERE q.format = 'MULTIPLE_CHOICE'
ON CONFLICT DO NOTHING;

-- 5. Populate new Answer for MC questions (correct option only)
INSERT INTO "Answer" ("id", "questionId", "mcId", "text", "createdAt")
SELECT
    'ans-' || a.id,
    a."questionId",
    'mc-' || a.id,
    NULL,
    NOW()
FROM "Answer_old" a
JOIN "Question" q ON q.id = a."questionId"
WHERE q.format = 'MULTIPLE_CHOICE'
  AND a."isCorrect" = true
ON CONFLICT DO NOTHING;

-- 6. Populate new Answer for SA questions (isCorrect=true rows only)
INSERT INTO "Answer" ("id", "questionId", "mcId", "text", "createdAt")
SELECT
    'ans-' || a.id,
    a."questionId",
    NULL,
    a.text,
    NOW()
FROM "Answer_old" a
JOIN "Question" q ON q.id = a."questionId"
WHERE q.format = 'SHORT_ANSWER'
  AND a."isCorrect" = true
ON CONFLICT DO NOTHING;

-- 7. Verification counts (visible in Postgres logs)
DO $$
DECLARE
    mc_q      BIGINT;
    sa_q      BIGINT;
    mc_opts   BIGINT;
    mc_ans    BIGINT;
    sa_ans    BIGINT;
    mc_noans  BIGINT;
    sa_noans  BIGINT;
BEGIN
    SELECT COUNT(*) INTO mc_q    FROM "Question" WHERE format='MULTIPLE_CHOICE' AND "deletedAt" IS NULL;
    SELECT COUNT(*) INTO sa_q    FROM "Question" WHERE format='SHORT_ANSWER'    AND "deletedAt" IS NULL;
    SELECT COUNT(*) INTO mc_opts FROM "MultipleChoice";
    SELECT COUNT(*) INTO mc_ans  FROM "Answer" WHERE "mcId" IS NOT NULL;
    SELECT COUNT(*) INTO sa_ans  FROM "Answer" WHERE "text" IS NOT NULL;
    SELECT COUNT(*) INTO mc_noans
        FROM "Question" q WHERE q.format='MULTIPLE_CHOICE' AND q."deletedAt" IS NULL
        AND NOT EXISTS (SELECT 1 FROM "Answer" a WHERE a."questionId"=q.id);
    SELECT COUNT(*) INTO sa_noans
        FROM "Question" q WHERE q.format='SHORT_ANSWER' AND q."deletedAt" IS NULL
        AND NOT EXISTS (SELECT 1 FROM "Answer" a WHERE a."questionId"=q.id);
    RAISE NOTICE 'MC questions: %  SA questions: %', mc_q, sa_q;
    RAISE NOTICE 'MultipleChoice rows: %  (expect ~% for 4-choice MC)', mc_opts, mc_q*4;
    RAISE NOTICE 'MC Answer rows: %  (expect ~= %)', mc_ans, mc_q;
    RAISE NOTICE 'SA Answer rows: %  (expect ~= %)', sa_ans, sa_q;
    RAISE NOTICE 'MC with no Answer row: %  SA with no Answer row: %', mc_noans, sa_noans;
END $$;
