-- CreateEnum
CREATE TYPE "BuzzerRoomStatus" AS ENUM ('WAITING', 'READING', 'RUNNING', 'BUZZED', 'BONUS', 'PAUSED', 'TIMEOUT', 'ENDED');

-- CreateEnum
CREATE TYPE "BuzzerRoomEventType" AS ENUM ('ROOM_CREATED', 'SEAT_TAKEN', 'SEAT_LEFT', 'ROUND_STARTED', 'DONE_READING', 'TIMER_PAUSED', 'TIMER_RESUMED', 'BUZZED', 'BUZZED_DURING_READING', 'INTERRUPT_CONFIRMED', 'INTERRUPT_INCORRECT', 'QUESTION_DEAD', 'ROUND_CLOCK_EXPIRED', 'CORRECT', 'INCORRECT', 'BONUS_QUEUED', 'NEXT_QUESTION', 'RESET', 'GAME_ENDED');

-- AlterTable: add non-breaking columns
ALTER TABLE "Question" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "BuzzerRoom" ADD COLUMN "version" INTEGER NOT NULL DEFAULT 0;

-- CreateTable: BuzzerQuestionPair
CREATE TABLE "BuzzerQuestionPair" (
    "id" TEXT NOT NULL,
    "tossupId" TEXT NOT NULL,
    "bonusId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BuzzerQuestionPair_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "BuzzerQuestionPair_tossupId_key" ON "BuzzerQuestionPair"("tossupId");
CREATE UNIQUE INDEX "BuzzerQuestionPair_bonusId_key" ON "BuzzerQuestionPair"("bonusId");

-- CreateTable: User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateTable: PracticeAttempt
CREATE TABLE "PracticeAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeSpentMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PracticeAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable: TestAttempt
CREATE TABLE "TestAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "timeLimitMinutes" INTEGER NOT NULL,
    "score" INTEGER,
    "totalQuestions" INTEGER NOT NULL,
    CONSTRAINT "TestAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable: TestAttemptAnswer
CREATE TABLE "TestAttemptAnswer" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeSpentMs" INTEGER,
    CONSTRAINT "TestAttemptAnswer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "TestAttemptAnswer_attemptId_questionId_key" ON "TestAttemptAnswer"("attemptId", "questionId");

-- DATA MIGRATION: Create Answer rows for SA questions that have correctAnswer but no isCorrect Answer row
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

-- DATA MIGRATION: Migrate BuzzerQuestion tossup rows to Question
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

-- DATA MIGRATION: Create Answer rows for migrated tossup questions
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

-- DATA MIGRATION: Migrate BuzzerQuestion bonus rows to Question
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

-- DATA MIGRATION: Create Answer rows for migrated bonus questions
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

-- DATA MIGRATION: Create BuzzerQuestionPair rows for migrated BuzzerQuestion data
INSERT INTO "BuzzerQuestionPair" ("id", "tossupId", "bonusId", "createdAt", "updatedAt")
SELECT
    'bqp-' || "id",
    'bq-tossup-' || "id",
    'bq-bonus-' || "id",
    NOW(),
    NOW()
FROM "BuzzerQuestion"
ON CONFLICT DO NOTHING;

-- DATA MIGRATION: Pair existing OSTI TOSSUP+BONUS questions via source metadata
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
    AND (t."sourceSet" = b."sourceSet" OR (t."sourceSet" IS NULL AND b."sourceSet" IS NULL))
    AND (t."sourceRound" = b."sourceRound" OR (t."sourceRound" IS NULL AND b."sourceRound" IS NULL))
    AND t."sourceQuestionNumber" = b."sourceQuestionNumber"
    AND t."category" = b."category"
    AND (t."schoolLevel" = b."schoolLevel" OR (t."schoolLevel" IS NULL AND b."schoolLevel" IS NULL))
)
WHERE t."questionKind" = 'TOSSUP'
  AND b."questionKind" = 'BONUS'
  AND NOT EXISTS (SELECT 1 FROM "BuzzerQuestionPair" p WHERE p."tossupId" = t."id")
  AND NOT EXISTS (SELECT 1 FROM "BuzzerQuestionPair" p WHERE p."bonusId" = b."id")
ON CONFLICT DO NOTHING;

-- AlterTable: Convert BuzzerRoom.status from VARCHAR to BuzzerRoomStatus enum
ALTER TABLE "BuzzerRoom" ALTER COLUMN "status" TYPE "BuzzerRoomStatus" USING "status"::"BuzzerRoomStatus";
ALTER TABLE "BuzzerRoom" ALTER COLUMN "status" SET DEFAULT 'WAITING'::"BuzzerRoomStatus";

-- AlterTable: Convert BuzzerRoomEvent.type from VARCHAR to BuzzerRoomEventType enum
ALTER TABLE "BuzzerRoomEvent" ALTER COLUMN "type" TYPE "BuzzerRoomEventType" USING "type"::"BuzzerRoomEventType";

-- AddForeignKey: BuzzerRoom.buzzedSeatId → BuzzerSeat.id (unique: each seat can be buzzed in at most one room)
CREATE UNIQUE INDEX "BuzzerRoom_buzzedSeatId_key" ON "BuzzerRoom"("buzzedSeatId");
ALTER TABLE "BuzzerRoom" ADD CONSTRAINT "BuzzerRoom_buzzedSeatId_fkey" FOREIGN KEY ("buzzedSeatId") REFERENCES "BuzzerSeat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey: BuzzerQuestionPair
ALTER TABLE "BuzzerQuestionPair" ADD CONSTRAINT "BuzzerQuestionPair_tossupId_fkey" FOREIGN KEY ("tossupId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BuzzerQuestionPair" ADD CONSTRAINT "BuzzerQuestionPair_bonusId_fkey" FOREIGN KEY ("bonusId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: PracticeAttempt
ALTER TABLE "PracticeAttempt" ADD CONSTRAINT "PracticeAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PracticeAttempt" ADD CONSTRAINT "PracticeAttempt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: TestAttempt
ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: TestAttemptAnswer
ALTER TABLE "TestAttemptAnswer" ADD CONSTRAINT "TestAttemptAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "TestAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TestAttemptAnswer" ADD CONSTRAINT "TestAttemptAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropColumn: redundant denormalized fields (data already migrated above)
ALTER TABLE "Question" DROP COLUMN "correctAnswer";
ALTER TABLE "Question" DROP COLUMN "choices";
ALTER TABLE "Question" DROP COLUMN "level";
ALTER TABLE "Lesson" DROP COLUMN "level";
ALTER TABLE "Test" DROP COLUMN "level";

-- DropTable: BuzzerQuestion (data migrated to Question + BuzzerQuestionPair above)
DROP TABLE "BuzzerQuestion";

-- CreateIndex: missing indexes on Question
CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty");
CREATE INDEX "Question_format_idx" ON "Question"("format");
CREATE INDEX "Question_questionKind_idx" ON "Question"("questionKind");
CREATE INDEX "Question_deletedAt_idx" ON "Question"("deletedAt");

-- CreateIndex: missing index on BuzzerRoom.status
CREATE INDEX "BuzzerRoom_status_idx" ON "BuzzerRoom"("status");

-- CreateIndex: missing index on Lesson.category
CREATE INDEX "Lesson_category_idx" ON "Lesson"("category");

-- CreateIndex: indexes on new tables
CREATE INDEX "PracticeAttempt_userId_idx" ON "PracticeAttempt"("userId");
CREATE INDEX "PracticeAttempt_questionId_idx" ON "PracticeAttempt"("questionId");
CREATE INDEX "PracticeAttempt_userId_questionId_idx" ON "PracticeAttempt"("userId", "questionId");
CREATE INDEX "PracticeAttempt_createdAt_idx" ON "PracticeAttempt"("createdAt");
CREATE INDEX "TestAttempt_userId_idx" ON "TestAttempt"("userId");
CREATE INDEX "TestAttempt_testId_idx" ON "TestAttempt"("testId");
CREATE INDEX "TestAttemptAnswer_attemptId_idx" ON "TestAttemptAnswer"("attemptId");
