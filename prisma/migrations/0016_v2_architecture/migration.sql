-- Migration 0016: v2 architecture
-- Fully idempotent — safe to re-run if a previous attempt partially completed.

-- ── Enums ──────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "BuzzerRoomStatus" AS ENUM ('WAITING', 'READING', 'RUNNING', 'BUZZED', 'BONUS', 'PAUSED', 'TIMEOUT', 'ENDED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "BuzzerRoomEventType" AS ENUM ('ROOM_CREATED', 'SEAT_TAKEN', 'SEAT_LEFT', 'ROUND_STARTED', 'DONE_READING', 'TIMER_PAUSED', 'TIMER_RESUMED', 'BUZZED', 'BUZZED_DURING_READING', 'INTERRUPT_CONFIRMED', 'INTERRUPT_INCORRECT', 'QUESTION_DEAD', 'ROUND_CLOCK_EXPIRED', 'CORRECT', 'INCORRECT', 'BONUS_QUEUED', 'NEXT_QUESTION', 'RESET', 'GAME_ENDED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── New columns ─────────────────────────────────────────────────────────────

ALTER TABLE "Question"   ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
ALTER TABLE "BuzzerRoom" ADD COLUMN IF NOT EXISTS "version"   INTEGER NOT NULL DEFAULT 0;

-- Allow level and correctAnswer to be empty for BuzzerQuestion rows (both dropped below)
ALTER TABLE "Question" ALTER COLUMN "level"         SET DEFAULT '';
ALTER TABLE "Question" ALTER COLUMN "correctAnswer" SET DEFAULT '';

-- ── New tables ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "BuzzerQuestionPair" (
    "id"        TEXT NOT NULL,
    "tossupId"  TEXT NOT NULL,
    "bonusId"   TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BuzzerQuestionPair_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "BuzzerQuestionPair_tossupId_key" ON "BuzzerQuestionPair"("tossupId");
CREATE UNIQUE INDEX IF NOT EXISTS "BuzzerQuestionPair_bonusId_key"  ON "BuzzerQuestionPair"("bonusId");

CREATE TABLE IF NOT EXISTS "User" (
    "id"          TEXT NOT NULL,
    "email"       TEXT NOT NULL,
    "displayName" TEXT,
    "avatarUrl"   TEXT,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "PracticeAttempt" (
    "id"          TEXT        NOT NULL,
    "userId"      TEXT        NOT NULL,
    "questionId"  TEXT        NOT NULL,
    "answer"      TEXT        NOT NULL,
    "isCorrect"   BOOLEAN     NOT NULL,
    "timeSpentMs" INTEGER,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PracticeAttempt_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "TestAttempt" (
    "id"               TEXT        NOT NULL,
    "userId"           TEXT        NOT NULL,
    "testId"           TEXT        NOT NULL,
    "startedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt"      TIMESTAMP(3),
    "timeLimitMinutes" INTEGER     NOT NULL,
    "score"            INTEGER,
    "totalQuestions"   INTEGER     NOT NULL,
    CONSTRAINT "TestAttempt_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "TestAttemptAnswer" (
    "id"          TEXT    NOT NULL,
    "attemptId"   TEXT    NOT NULL,
    "questionId"  TEXT    NOT NULL,
    "answer"      TEXT    NOT NULL,
    "isCorrect"   BOOLEAN NOT NULL,
    "timeSpentMs" INTEGER,
    CONSTRAINT "TestAttemptAnswer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "TestAttemptAnswer_attemptId_questionId_key"
    ON "TestAttemptAnswer"("attemptId", "questionId");

-- ── Data migrations ─────────────────────────────────────────────────────────

-- SA questions: create Answer rows from correctAnswer if not already present
INSERT INTO "Answer" ("id", "questionId", "text", "isCorrect", "position", "createdAt", "updatedAt")
SELECT
    'sa-' || q."id",
    q."id",
    q."correctAnswer",
    true,
    0,
    NOW(),
    NOW()
FROM "Question" q
WHERE q."format" = 'SHORT_ANSWER'
  AND q."correctAnswer" IS NOT NULL
  AND q."correctAnswer" <> ''
  AND NOT EXISTS (
    SELECT 1 FROM "Answer" a WHERE a."questionId" = q."id" AND a."isCorrect" = true
  )
ON CONFLICT DO NOTHING;

-- BuzzerQuestion → Question (tossup)
INSERT INTO "Question" ("id", "competitionId", "category", "difficulty", "format", "questionKind", "prompt", "alternateAnswers", "explanation", "createdAt", "updatedAt")
SELECT
    'bq-tossup-' || "id",
    "competitionId",
    "category",
    "difficulty",
    'SHORT_ANSWER'::"QuestionFormat",
    'TOSSUP'::"QuestionKind",
    "tossupPrompt",
    ARRAY[]::TEXT[],
    "tossupExplanation",
    "createdAt",
    NOW()
FROM "BuzzerQuestion"
ON CONFLICT DO NOTHING;

INSERT INTO "Answer" ("id", "questionId", "text", "isCorrect", "position", "createdAt", "updatedAt")
SELECT
    'bq-tossup-ans-' || "id",
    'bq-tossup-' || "id",
    "tossupAnswer",
    true,
    0,
    NOW(),
    NOW()
FROM "BuzzerQuestion"
ON CONFLICT DO NOTHING;

-- BuzzerQuestion → Question (bonus)
INSERT INTO "Question" ("id", "competitionId", "category", "difficulty", "format", "questionKind", "prompt", "alternateAnswers", "explanation", "createdAt", "updatedAt")
SELECT
    'bq-bonus-' || "id",
    "competitionId",
    "category",
    "difficulty",
    'SHORT_ANSWER'::"QuestionFormat",
    'BONUS'::"QuestionKind",
    "bonusPrompt",
    ARRAY[]::TEXT[],
    "bonusExplanation",
    "createdAt",
    NOW()
FROM "BuzzerQuestion"
ON CONFLICT DO NOTHING;

INSERT INTO "Answer" ("id", "questionId", "text", "isCorrect", "position", "createdAt", "updatedAt")
SELECT
    'bq-bonus-ans-' || "id",
    'bq-bonus-' || "id",
    "bonusAnswer",
    true,
    0,
    NOW(),
    NOW()
FROM "BuzzerQuestion"
ON CONFLICT DO NOTHING;

-- BuzzerQuestionPair rows for migrated BuzzerQuestion data
INSERT INTO "BuzzerQuestionPair" ("id", "tossupId", "bonusId", "createdAt", "updatedAt")
SELECT
    'bqp-' || "id",
    'bq-tossup-' || "id",
    'bq-bonus-' || "id",
    NOW(),
    NOW()
FROM "BuzzerQuestion"
ON CONFLICT DO NOTHING;

-- BuzzerQuestionPair rows for existing OSTI TOSSUP+BONUS pairs
INSERT INTO "BuzzerQuestionPair" ("id", "tossupId", "bonusId", "createdAt", "updatedAt")
SELECT
    'bqp-osti-' || t."id",
    t."id",
    b."id",
    NOW(),
    NOW()
FROM "Question" t
JOIN "Question" b ON (
    t."competitionId" = b."competitionId"
    AND (t."sourcePdfUrl" = b."sourcePdfUrl" OR (t."sourcePdfUrl" IS NULL AND b."sourcePdfUrl" IS NULL))
    AND (t."sourceSet"   = b."sourceSet"   OR (t."sourceSet"   IS NULL AND b."sourceSet"   IS NULL))
    AND (t."sourceRound" = b."sourceRound" OR (t."sourceRound" IS NULL AND b."sourceRound" IS NULL))
    AND t."sourceQuestionNumber" = b."sourceQuestionNumber"
    AND t."category" = b."category"
    AND (t."schoolLevel" = b."schoolLevel" OR (t."schoolLevel" IS NULL AND b."schoolLevel" IS NULL))
)
WHERE t."questionKind" = 'TOSSUP'
  AND b."questionKind" = 'BONUS'
  AND NOT EXISTS (SELECT 1 FROM "BuzzerQuestionPair" p WHERE p."tossupId" = t."id")
  AND NOT EXISTS (SELECT 1 FROM "BuzzerQuestionPair" p WHERE p."bonusId"  = b."id")
ON CONFLICT DO NOTHING;

-- ── Convert BuzzerRoom.status to enum (skip if already converted) ───────────

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'BuzzerRoom' AND column_name = 'status'
      AND data_type = 'character varying'
  ) THEN
    ALTER TABLE "BuzzerRoom" ALTER COLUMN "status" TYPE "BuzzerRoomStatus"
      USING "status"::"BuzzerRoomStatus";
  END IF;
END $$;
ALTER TABLE "BuzzerRoom" ALTER COLUMN "status" SET DEFAULT 'WAITING'::"BuzzerRoomStatus";

-- ── Convert BuzzerRoomEvent.type to enum (skip if already converted) ────────

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'BuzzerRoomEvent' AND column_name = 'type'
      AND data_type = 'character varying'
  ) THEN
    ALTER TABLE "BuzzerRoomEvent" ALTER COLUMN "type" TYPE "BuzzerRoomEventType"
      USING "type"::"BuzzerRoomEventType";
  END IF;
END $$;

-- ── Foreign keys (idempotent) ────────────────────────────────────────────────

CREATE UNIQUE INDEX IF NOT EXISTS "BuzzerRoom_buzzedSeatId_key" ON "BuzzerRoom"("buzzedSeatId");

DO $$ BEGIN
  ALTER TABLE "BuzzerRoom" ADD CONSTRAINT "BuzzerRoom_buzzedSeatId_fkey"
    FOREIGN KEY ("buzzedSeatId") REFERENCES "BuzzerSeat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "BuzzerQuestionPair" ADD CONSTRAINT "BuzzerQuestionPair_tossupId_fkey"
    FOREIGN KEY ("tossupId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "BuzzerQuestionPair" ADD CONSTRAINT "BuzzerQuestionPair_bonusId_fkey"
    FOREIGN KEY ("bonusId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "PracticeAttempt" ADD CONSTRAINT "PracticeAttempt_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "PracticeAttempt" ADD CONSTRAINT "PracticeAttempt_questionId_fkey"
    FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_testId_fkey"
    FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "TestAttemptAnswer" ADD CONSTRAINT "TestAttemptAnswer_attemptId_fkey"
    FOREIGN KEY ("attemptId") REFERENCES "TestAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "TestAttemptAnswer" ADD CONSTRAINT "TestAttemptAnswer_questionId_fkey"
    FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Drop old columns ─────────────────────────────────────────────────────────

ALTER TABLE "Question" DROP COLUMN IF EXISTS "correctAnswer";
ALTER TABLE "Question" DROP COLUMN IF EXISTS "choices";
ALTER TABLE "Question" DROP COLUMN IF EXISTS "level";
ALTER TABLE "Lesson"   DROP COLUMN IF EXISTS "level";
ALTER TABLE "Test"     DROP COLUMN IF EXISTS "level";

-- ── Drop old table ───────────────────────────────────────────────────────────

DROP TABLE IF EXISTS "BuzzerQuestion";

-- ── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS "Question_difficulty_idx"   ON "Question"("difficulty");
CREATE INDEX IF NOT EXISTS "Question_format_idx"       ON "Question"("format");
CREATE INDEX IF NOT EXISTS "Question_questionKind_idx" ON "Question"("questionKind");
CREATE INDEX IF NOT EXISTS "Question_deletedAt_idx"    ON "Question"("deletedAt");
CREATE INDEX IF NOT EXISTS "BuzzerRoom_status_idx"     ON "BuzzerRoom"("status");
CREATE INDEX IF NOT EXISTS "Lesson_category_idx"       ON "Lesson"("category");

CREATE INDEX IF NOT EXISTS "PracticeAttempt_userId_idx"            ON "PracticeAttempt"("userId");
CREATE INDEX IF NOT EXISTS "PracticeAttempt_questionId_idx"        ON "PracticeAttempt"("questionId");
CREATE INDEX IF NOT EXISTS "PracticeAttempt_userId_questionId_idx" ON "PracticeAttempt"("userId", "questionId");
CREATE INDEX IF NOT EXISTS "PracticeAttempt_createdAt_idx"         ON "PracticeAttempt"("createdAt");
CREATE INDEX IF NOT EXISTS "TestAttempt_userId_idx"                ON "TestAttempt"("userId");
CREATE INDEX IF NOT EXISTS "TestAttempt_testId_idx"                ON "TestAttempt"("testId");
CREATE INDEX IF NOT EXISTS "TestAttemptAnswer_attemptId_idx"       ON "TestAttemptAnswer"("attemptId");
