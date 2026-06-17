-- CreateEnum
CREATE TYPE "ClassificationDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "QuestionTopicClassification" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "subtopic" TEXT NOT NULL,
    "keyConcept" TEXT NOT NULL,
    "difficulty" "ClassificationDifficulty" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "needsReview" BOOLEAN NOT NULL DEFAULT false,
    "model" TEXT,
    "promptVersion" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionTopicClassification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTopicClassification_questionId_key" ON "QuestionTopicClassification"("questionId");

-- CreateIndex
CREATE INDEX "QuestionTopicClassification_topic_idx" ON "QuestionTopicClassification"("topic");

-- CreateIndex
CREATE INDEX "QuestionTopicClassification_subtopic_idx" ON "QuestionTopicClassification"("subtopic");

-- CreateIndex
CREATE INDEX "QuestionTopicClassification_confidence_idx" ON "QuestionTopicClassification"("confidence");

-- CreateIndex
CREATE INDEX "QuestionTopicClassification_needsReview_idx" ON "QuestionTopicClassification"("needsReview");

-- AddForeignKey
ALTER TABLE "QuestionTopicClassification" ADD CONSTRAINT "QuestionTopicClassification_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
