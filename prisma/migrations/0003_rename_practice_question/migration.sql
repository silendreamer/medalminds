-- CreateEnum
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname ILIKE 'questionformat') THEN
    CREATE TYPE "QuestionFormat" AS ENUM ('MULTIPLE_CHOICE', 'SHORT_ANSWER');
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='PracticeQuestion') THEN
    EXECUTE 'ALTER TABLE "PracticeQuestion" RENAME TO "Question"';
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PracticeQuestion_pkey') THEN
    EXECUTE 'ALTER TABLE "Question" RENAME CONSTRAINT "PracticeQuestion_pkey" TO "Question_pkey"';
  END IF;
END $$;

ALTER TABLE "Question" DROP CONSTRAINT IF EXISTS "PracticeQuestion_competitionId_fkey";
ALTER TABLE "TestQuestion" DROP CONSTRAINT IF EXISTS "TestQuestion_questionId_fkey";
ALTER TABLE "Answer" DROP CONSTRAINT IF EXISTS "Answer_questionId_fkey";

ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "format" "QuestionFormat";

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='Question' AND column_name='type') THEN
    EXECUTE 'UPDATE "Question" SET "format" = CASE "type" WHEN ''multiple_choice'' THEN ''MULTIPLE_CHOICE''::"QuestionFormat" WHEN ''short_answer'' THEN ''SHORT_ANSWER''::"QuestionFormat" ELSE ''SHORT_ANSWER''::"QuestionFormat" END';
    EXECUTE 'ALTER TABLE "Question" ALTER COLUMN "format" SET NOT NULL';
    EXECUTE 'ALTER TABLE "Question" DROP COLUMN IF EXISTS "type"';
  ELSE
    EXECUTE 'ALTER TABLE "Question" ALTER COLUMN "format" SET NOT NULL';
  END IF;
END $$;

DROP INDEX IF EXISTS "PracticeQuestion_competitionId_idx";
CREATE INDEX IF NOT EXISTS "Question_competitionId_idx" ON "Question"("competitionId");
DROP INDEX IF EXISTS "PracticeQuestion_competitionId_category_difficulty_type_idx";
CREATE INDEX IF NOT EXISTS "Question_competitionId_category_difficulty_format_idx" ON "Question"("competitionId", "category", "difficulty", "format");

ALTER TABLE "Question" ADD CONSTRAINT "Question_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
