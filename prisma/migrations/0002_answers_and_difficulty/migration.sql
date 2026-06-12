-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('FOUNDATIONAL', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "PracticeQuestion"
  ALTER COLUMN "difficulty" TYPE "Difficulty"
  USING (
    CASE "difficulty"
      WHEN 'Foundational' THEN 'FOUNDATIONAL'::"Difficulty"
      WHEN 'Intermediate' THEN 'INTERMEDIATE'::"Difficulty"
      WHEN 'Advanced' THEN 'ADVANCED'::"Difficulty"
      ELSE 'INTERMEDIATE'::"Difficulty"
    END
  );

-- AlterTable
ALTER TABLE "BuzzerQuestion"
  ALTER COLUMN "difficulty" TYPE "Difficulty"
  USING (
    CASE "difficulty"
      WHEN 'Foundational' THEN 'FOUNDATIONAL'::"Difficulty"
      WHEN 'Intermediate' THEN 'INTERMEDIATE'::"Difficulty"
      WHEN 'Advanced' THEN 'ADVANCED'::"Difficulty"
      ELSE 'INTERMEDIATE'::"Difficulty"
    END
  );

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "explanation" TEXT,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_questionId_text_key" ON "Answer"("questionId", "text");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_questionId_position_key" ON "Answer"("questionId", "position");

-- CreateIndex
CREATE INDEX "Answer_questionId_idx" ON "Answer"("questionId");

-- Backfill answers from existing practice question data.
INSERT INTO "Answer" ("id", "questionId", "text", "isCorrect", "explanation", "position", "createdAt", "updatedAt")
SELECT
  "PracticeQuestion"."id" || '-answer-0',
  "PracticeQuestion"."id",
  "PracticeQuestion"."correctAnswer",
  true,
  "PracticeQuestion"."explanation",
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "PracticeQuestion";

INSERT INTO "Answer" ("id", "questionId", "text", "isCorrect", "explanation", "position", "createdAt", "updatedAt")
SELECT
  "PracticeQuestion"."id" || '-answer-alt-' || alt.ordinality,
  "PracticeQuestion"."id",
  alt.value,
  true,
  "PracticeQuestion"."explanation",
  alt.ordinality,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "PracticeQuestion"
CROSS JOIN LATERAL unnest("PracticeQuestion"."alternateAnswers") WITH ORDINALITY AS alt(value, ordinality)
ON CONFLICT ("questionId", "text") DO NOTHING;

INSERT INTO "Answer" ("id", "questionId", "text", "isCorrect", "explanation", "position", "createdAt", "updatedAt")
SELECT
  "PracticeQuestion"."id" || '-answer-choice-' || choice.ordinality,
  "PracticeQuestion"."id",
  choice.value #>> '{}',
  false,
  NULL,
  100 + choice.ordinality,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "PracticeQuestion"
CROSS JOIN LATERAL jsonb_array_elements("PracticeQuestion"."choices") WITH ORDINALITY AS choice(value, ordinality)
WHERE "PracticeQuestion"."choices" IS NOT NULL
  AND choice.value #>> '{}' <> "PracticeQuestion"."correctAnswer"
ON CONFLICT ("questionId", "text") DO NOTHING;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "PracticeQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
