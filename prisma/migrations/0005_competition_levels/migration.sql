-- CreateTable
CREATE TABLE "CompetitionLevel" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "schoolLevel" "SchoolLevel",
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitionLevel_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Question" ADD COLUMN "levelId" TEXT;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN "levelId" TEXT;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN "levelId" TEXT;

-- Seed known competition levels from existing content labels.
INSERT INTO "CompetitionLevel" ("id", "competitionId", "slug", "name", "description", "schoolLevel", "sortOrder", "createdAt", "updatedAt")
VALUES
  ('science-bowl-middle-school', 'science-bowl', 'middle-school', 'Middle School', 'Science Bowl preparation for grades 6-8.', 'MIDDLE_SCHOOL', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('science-bowl-high-school', 'science-bowl', 'high-school', 'High School', 'Science Bowl preparation for grades 9-12.', 'HIGH_SCHOOL', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('science-bowl-mixed-bowl-prep', 'science-bowl', 'mixed-bowl-prep', 'Mixed Bowl Prep', 'Science Bowl lessons that apply across middle and high school prep.', 'MIXED', 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('science-olympiad-division-b', 'science-olympiad', 'division-b', 'Division B', 'Science Olympiad middle school division preparation.', 'MIDDLE_SCHOOL', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('science-olympiad-division-c', 'science-olympiad', 'division-c', 'Division C', 'Science Olympiad high school division preparation.', 'HIGH_SCHOOL', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('science-olympiad-event-foundation', 'science-olympiad', 'event-foundation', 'Event Foundation', 'Science Olympiad event-based conceptual foundation.', 'MIXED', 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('math-olympiad-intro-olympiad', 'math-olympiad', 'intro-olympiad', 'Intro Olympiad', 'Entry-level olympiad problem-solving preparation.', 'MIXED', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('math-olympiad-olympiad-builder', 'math-olympiad', 'olympiad-builder', 'Olympiad Builder', 'Intermediate olympiad problem-solving preparation.', 'MIXED', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Backfill level relations from legacy level labels.
UPDATE "Question"
SET "levelId" = "competitionId" || '-' || lower(regexp_replace("level", '[^a-zA-Z0-9]+', '-', 'g'))
WHERE "levelId" IS NULL;

UPDATE "Lesson"
SET "levelId" = "competitionId" || '-' || lower(regexp_replace("level", '[^a-zA-Z0-9]+', '-', 'g'))
WHERE "levelId" IS NULL;

UPDATE "Test"
SET "levelId" = "competitionId" || '-' || lower(regexp_replace("level", '[^a-zA-Z0-9]+', '-', 'g'))
WHERE "levelId" IS NULL
  AND EXISTS (
    SELECT 1
    FROM "CompetitionLevel"
    WHERE "CompetitionLevel"."id" = "Test"."competitionId" || '-' || lower(regexp_replace("Test"."level", '[^a-zA-Z0-9]+', '-', 'g'))
  );

-- Normalize possible trailing dashes from regexp replacement.
UPDATE "Question" SET "levelId" = trim(both '-' from "levelId") WHERE "levelId" IS NOT NULL;
UPDATE "Lesson" SET "levelId" = trim(both '-' from "levelId") WHERE "levelId" IS NOT NULL;
UPDATE "Test" SET "levelId" = trim(both '-' from "levelId") WHERE "levelId" IS NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionLevel_competitionId_slug_key" ON "CompetitionLevel"("competitionId", "slug");

-- CreateIndex
CREATE INDEX "CompetitionLevel_competitionId_idx" ON "CompetitionLevel"("competitionId");

-- CreateIndex
CREATE INDEX "Question_levelId_idx" ON "Question"("levelId");

-- CreateIndex
CREATE INDEX "Lesson_levelId_idx" ON "Lesson"("levelId");

-- CreateIndex
CREATE INDEX "Test_levelId_idx" ON "Test"("levelId");

-- AddForeignKey
ALTER TABLE "CompetitionLevel" ADD CONSTRAINT "CompetitionLevel_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "CompetitionLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "CompetitionLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "CompetitionLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
