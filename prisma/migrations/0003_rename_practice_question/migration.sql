-- CreateEnum
CREATE TYPE "QuestionFormat" AS ENUM ('MULTIPLE_CHOICE', 'SHORT_ANSWER');

-- RenameTable
ALTER TABLE "PracticeQuestion" RENAME TO "Question";

-- Rename primary key constraint
ALTER TABLE "Question" RENAME CONSTRAINT "PracticeQuestion_pkey" TO "Question_pkey";

-- Drop old foreign key names before recreating them with Question names.
ALTER TABLE "Question" DROP CONSTRAINT "PracticeQuestion_competitionId_fkey";
ALTER TABLE "TestQuestion" DROP CONSTRAINT "TestQuestion_questionId_fkey";
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- Replace free-text type with enum-backed format.
ALTER TABLE "Question" ADD COLUMN "format" "QuestionFormat";

UPDATE "Question"
SET "format" = CASE "type"
  WHEN 'multiple_choice' THEN 'MULTIPLE_CHOICE'::"QuestionFormat"
  WHEN 'short_answer' THEN 'SHORT_ANSWER'::"QuestionFormat"
  ELSE 'SHORT_ANSWER'::"QuestionFormat"
END;

ALTER TABLE "Question" ALTER COLUMN "format" SET NOT NULL;
ALTER TABLE "Question" DROP COLUMN "type";

-- Rename indexes from PracticeQuestion to Question naming.
ALTER INDEX "PracticeQuestion_competitionId_idx" RENAME TO "Question_competitionId_idx";
DROP INDEX "PracticeQuestion_competitionId_category_difficulty_type_idx";
CREATE INDEX "Question_competitionId_category_difficulty_format_idx" ON "Question"("competitionId", "category", "difficulty", "format");

-- Recreate foreign keys with generic Question table names.
ALTER TABLE "Question" ADD CONSTRAINT "Question_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
