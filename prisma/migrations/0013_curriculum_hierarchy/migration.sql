-- CreateTable
CREATE TABLE "CurriculumSubject" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "levelId" TEXT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "whyItMatters" TEXT NOT NULL,
    "highYieldTopics" TEXT[] NOT NULL,
    "sources" TEXT[] NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurriculumSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumGrade" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurriculumGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumUnit" (
    "id" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurriculumUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumTopic" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurriculumTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumTopicLesson" (
    "topicId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CurriculumTopicLesson_pkey" PRIMARY KEY ("topicId","lessonId")
);

-- CreateTable
CREATE TABLE "CurriculumTopicQuestion" (
    "topicId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CurriculumTopicQuestion_pkey" PRIMARY KEY ("topicId","questionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumSubject_competitionId_levelId_slug_key" ON "CurriculumSubject"("competitionId", "levelId", "slug");

-- CreateIndex
CREATE INDEX "CurriculumSubject_competitionId_idx" ON "CurriculumSubject"("competitionId");

-- CreateIndex
CREATE INDEX "CurriculumSubject_levelId_idx" ON "CurriculumSubject"("levelId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumGrade_subjectId_key_key" ON "CurriculumGrade"("subjectId", "key");

-- CreateIndex
CREATE INDEX "CurriculumGrade_subjectId_idx" ON "CurriculumGrade"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumUnit_gradeId_title_key" ON "CurriculumUnit"("gradeId", "title");

-- CreateIndex
CREATE INDEX "CurriculumUnit_gradeId_idx" ON "CurriculumUnit"("gradeId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumTopic_unitId_title_key" ON "CurriculumTopic"("unitId", "title");

-- CreateIndex
CREATE INDEX "CurriculumTopic_unitId_idx" ON "CurriculumTopic"("unitId");

-- CreateIndex
CREATE INDEX "CurriculumTopicLesson_lessonId_idx" ON "CurriculumTopicLesson"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumTopicLesson_topicId_position_key" ON "CurriculumTopicLesson"("topicId", "position");

-- CreateIndex
CREATE INDEX "CurriculumTopicQuestion_questionId_idx" ON "CurriculumTopicQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumTopicQuestion_topicId_position_key" ON "CurriculumTopicQuestion"("topicId", "position");

-- AddForeignKey
ALTER TABLE "CurriculumSubject" ADD CONSTRAINT "CurriculumSubject_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumSubject" ADD CONSTRAINT "CurriculumSubject_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "CompetitionLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumGrade" ADD CONSTRAINT "CurriculumGrade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "CurriculumSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumUnit" ADD CONSTRAINT "CurriculumUnit_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "CurriculumGrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTopic" ADD CONSTRAINT "CurriculumTopic_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "CurriculumUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTopicLesson" ADD CONSTRAINT "CurriculumTopicLesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "CurriculumTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTopicLesson" ADD CONSTRAINT "CurriculumTopicLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTopicQuestion" ADD CONSTRAINT "CurriculumTopicQuestion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "CurriculumTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumTopicQuestion" ADD CONSTRAINT "CurriculumTopicQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
