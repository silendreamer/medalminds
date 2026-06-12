-- CreateTable
CREATE TABLE "AnswerExplanation" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "shortExplanation" TEXT NOT NULL,
    "detailedExplanation" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnswerExplanation_pkey" PRIMARY KEY ("id")
);

-- Backfill one explanation per existing question from the compatibility explanation field.
INSERT INTO "AnswerExplanation" ("id", "questionId", "shortExplanation", "detailedExplanation", "position", "createdAt", "updatedAt")
SELECT
  "Question"."id" || '-explanation-0',
  "Question"."id",
  "Question"."explanation",
  NULL,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "Question"
WHERE "Question"."explanation" IS NOT NULL
  AND length(trim("Question"."explanation")) > 0
ON CONFLICT DO NOTHING;

-- CreateIndex
CREATE UNIQUE INDEX "AnswerExplanation_questionId_position_key" ON "AnswerExplanation"("questionId", "position");

-- CreateIndex
CREATE INDEX "AnswerExplanation_questionId_idx" ON "AnswerExplanation"("questionId");

-- AddForeignKey
ALTER TABLE "AnswerExplanation" ADD CONSTRAINT "AnswerExplanation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
