-- CreateTable
CREATE TABLE "Concept" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "schoolLevel" "SchoolLevel",
    "shortDescription" TEXT NOT NULL,
    "aliases" TEXT[] NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionConcept" (
    "questionId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionConcept_pkey" PRIMARY KEY ("questionId","conceptId")
);

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN "conceptId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Concept_competitionId_slug_category_schoolLevel_key" ON "Concept"("competitionId", "slug", "category", "schoolLevel");

-- CreateIndex
CREATE INDEX "Concept_competitionId_idx" ON "Concept"("competitionId");

-- CreateIndex
CREATE INDEX "Concept_competitionId_category_schoolLevel_idx" ON "Concept"("competitionId", "category", "schoolLevel");

-- CreateIndex
CREATE INDEX "QuestionConcept_conceptId_idx" ON "QuestionConcept"("conceptId");

-- CreateIndex
CREATE INDEX "QuestionConcept_questionId_isPrimary_idx" ON "QuestionConcept"("questionId", "isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionConcept_one_primary_per_question_idx" ON "QuestionConcept"("questionId") WHERE "isPrimary" = true;

-- CreateIndex
CREATE INDEX "Lesson_conceptId_idx" ON "Lesson"("conceptId");

-- AddForeignKey
ALTER TABLE "Concept" ADD CONSTRAINT "Concept_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionConcept" ADD CONSTRAINT "QuestionConcept_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionConcept" ADD CONSTRAINT "QuestionConcept_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("id") ON DELETE SET NULL ON UPDATE CASCADE;
