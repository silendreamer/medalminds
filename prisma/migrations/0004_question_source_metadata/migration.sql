-- CreateEnum
CREATE TYPE "QuestionKind" AS ENUM ('PRACTICE', 'TOSSUP', 'BONUS', 'REVIEW');

-- CreateEnum
CREATE TYPE "SchoolLevel" AS ENUM ('MIDDLE_SCHOOL', 'HIGH_SCHOOL', 'MIXED');

-- AlterTable
ALTER TABLE "Question" ADD COLUMN "questionKind" "QuestionKind" NOT NULL DEFAULT 'PRACTICE';
ALTER TABLE "Question" ADD COLUMN "schoolLevel" "SchoolLevel";
ALTER TABLE "Question" ADD COLUMN "sourceProvider" TEXT;
ALTER TABLE "Question" ADD COLUMN "sourcePageUrl" TEXT;
ALTER TABLE "Question" ADD COLUMN "sourcePdfUrl" TEXT;
ALTER TABLE "Question" ADD COLUMN "sourceSet" TEXT;
ALTER TABLE "Question" ADD COLUMN "sourceRound" TEXT;
ALTER TABLE "Question" ADD COLUMN "sourceQuestionNumber" INTEGER;
ALTER TABLE "Question" ADD COLUMN "sourceHash" TEXT;

-- Backfill conservative source metadata for existing sample content.
UPDATE "Question"
SET
  "sourceProvider" = COALESCE("sourceProvider", 'MedalMinds Original'),
  "sourceSet" = COALESCE("sourceSet", 'MVP Sample Content'),
  "questionKind" = COALESCE("questionKind", 'PRACTICE'::"QuestionKind"),
  "schoolLevel" = CASE
    WHEN "level" ILIKE '%middle%' OR "level" ILIKE '%division b%' THEN 'MIDDLE_SCHOOL'::"SchoolLevel"
    WHEN "level" ILIKE '%high%' OR "level" ILIKE '%division c%' THEN 'HIGH_SCHOOL'::"SchoolLevel"
    ELSE 'MIXED'::"SchoolLevel"
  END,
  "sourceHash" = COALESCE("sourceHash", md5("competitionId" || '|' || "category" || '|' || "prompt" || '|' || "correctAnswer"));

-- CreateIndex
CREATE UNIQUE INDEX "Question_sourceHash_key" ON "Question"("sourceHash");

-- CreateIndex
CREATE INDEX "Question_competitionId_schoolLevel_idx" ON "Question"("competitionId", "schoolLevel");

-- CreateIndex
CREATE INDEX "Question_sourceProvider_sourceSet_idx" ON "Question"("sourceProvider", "sourceSet");
