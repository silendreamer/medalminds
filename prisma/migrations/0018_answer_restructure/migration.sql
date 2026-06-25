-- Migration 0018: Restructure Answer table into MultipleChoice + Answer
--
-- OLD design: Answer table mixed two concerns:
--   MC questions  → 4 rows per question, one marked isCorrect=true
--   SA questions  → 1 row marked isCorrect=true with the answer text
--
-- NEW design:
--   MultipleChoice → stores the 4 options for MC questions (no isCorrect)
--   Answer         → stores only the correct answer:
--                      MC: mcId pointing to the correct MultipleChoice row
--                      SA: text field with the answer string
--
-- Answer_old is kept as a backup until Phase 5 cleanup (migration 0020).

BEGIN;

-- 1. Rename existing Answer table to preserve data
ALTER TABLE "Answer" RENAME TO "Answer_old";

-- 2. Create MultipleChoice table
CREATE TABLE "MultipleChoice" (
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
CREATE INDEX "MultipleChoice_questionId_idx" ON "MultipleChoice"("questionId");

-- 3. Create new Answer table
CREATE TABLE "Answer" (
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
CREATE INDEX "Answer_questionId_idx" ON "Answer"("questionId");

-- 4. Populate MultipleChoice from old MC Answer rows
INSERT INTO "MultipleChoice" ("id", "questionId", "text", "position", "createdAt")
SELECT
    'mc-' || a.id,
    a."questionId",
    a.text,
    a.position,
    a."createdAt"
FROM "Answer_old" a
JOIN "Question" q ON q.id = a."questionId"
WHERE q.format = 'MULTIPLE_CHOICE';

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
  AND a."isCorrect" = true;

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
  AND a."isCorrect" = true;

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
    SELECT COUNT(*) INTO mc_q   FROM "Question" WHERE format='MULTIPLE_CHOICE' AND "deletedAt" IS NULL;
    SELECT COUNT(*) INTO sa_q   FROM "Question" WHERE format='SHORT_ANSWER'    AND "deletedAt" IS NULL;
    SELECT COUNT(*) INTO mc_opts FROM "MultipleChoice";
    SELECT COUNT(*) INTO mc_ans  FROM "Answer" WHERE "mcId"  IS NOT NULL;
    SELECT COUNT(*) INTO sa_ans  FROM "Answer" WHERE "text"  IS NOT NULL;
    SELECT COUNT(*) INTO mc_noans
        FROM "Question" q WHERE q.format='MULTIPLE_CHOICE' AND q."deletedAt" IS NULL
        AND NOT EXISTS (SELECT 1 FROM "Answer" a WHERE a."questionId"=q.id);
    SELECT COUNT(*) INTO sa_noans
        FROM "Question" q WHERE q.format='SHORT_ANSWER' AND q."deletedAt" IS NULL
        AND NOT EXISTS (SELECT 1 FROM "Answer" a WHERE a."questionId"=q.id);
    RAISE NOTICE 'MC questions: %  SA questions: %', mc_q, sa_q;
    RAISE NOTICE 'MultipleChoice rows: %  (expect ~% for 4-choice MC)', mc_opts, mc_q*4;
    RAISE NOTICE 'MC Answer rows: %  (expect ~= MC questions %)', mc_ans, mc_q;
    RAISE NOTICE 'SA Answer rows: %  (expect ~= SA questions %)', sa_ans, sa_q;
    RAISE NOTICE 'MC with no Answer row: %  SA with no Answer row: %', mc_noans, sa_noans;
END $$;

COMMIT;

-- Answer_old is kept as a safety backup until Phase 5 (migration 0020).
-- Drop it there after verifying counts are correct.
