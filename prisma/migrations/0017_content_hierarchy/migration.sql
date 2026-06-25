-- Migration 0017: Content hierarchy (Subject → Topic → SubTopic)
--
-- Adds three new tables that represent the lesson plan tree:
--   Subject   = top-level area (Life Science, Physical Science, …)
--   Topic     = chapter within a subject (Cells, Forces & Motion, …)
--   SubTopic  = unit within a topic (Cell Structure & Function, …)
--
-- Lesson and Question gain a nullable subTopicId FK so content can be
-- progressively linked to the hierarchy without breaking existing rows.
-- Nothing is dropped or modified here — this is purely additive.

-- ── Subject ────────────────────────────────────────────────────────────────

CREATE TABLE "Subject" (
    "id"            TEXT        NOT NULL,
    "competitionId" TEXT        NOT NULL,
    "name"          TEXT        NOT NULL,
    "slug"          TEXT        NOT NULL,
    "order"         INTEGER     NOT NULL DEFAULT 0,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Subject_competitionId_fkey"
        FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE,
    CONSTRAINT "Subject_competitionId_slug_key"
        UNIQUE ("competitionId", "slug")
);

CREATE INDEX "Subject_competitionId_idx" ON "Subject"("competitionId");

-- ── Topic ──────────────────────────────────────────────────────────────────

CREATE TABLE "Topic" (
    "id"        TEXT        NOT NULL,
    "subjectId" TEXT        NOT NULL,
    "name"      TEXT        NOT NULL,
    "slug"      TEXT        NOT NULL,
    "order"     INTEGER     NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Topic_subjectId_fkey"
        FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE,
    CONSTRAINT "Topic_subjectId_slug_key"
        UNIQUE ("subjectId", "slug")
);

CREATE INDEX "Topic_subjectId_idx" ON "Topic"("subjectId");

-- ── SubTopic ───────────────────────────────────────────────────────────────

CREATE TABLE "SubTopic" (
    "id"        TEXT        NOT NULL,
    "topicId"   TEXT        NOT NULL,
    "name"      TEXT        NOT NULL,
    "slug"      TEXT        NOT NULL,
    "order"     INTEGER     NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubTopic_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "SubTopic_topicId_fkey"
        FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE,
    CONSTRAINT "SubTopic_topicId_slug_key"
        UNIQUE ("topicId", "slug")
);

CREATE INDEX "SubTopic_topicId_idx" ON "SubTopic"("topicId");

-- ── Nullable FK on Lesson and Question ────────────────────────────────────
-- Non-breaking: existing rows keep NULL until Phase 4 links them.

ALTER TABLE "Lesson"
    ADD COLUMN "subTopicId" TEXT,
    ADD CONSTRAINT "Lesson_subTopicId_fkey"
        FOREIGN KEY ("subTopicId") REFERENCES "SubTopic"("id") ON DELETE SET NULL;

ALTER TABLE "Question"
    ADD COLUMN "subTopicId" TEXT,
    ADD CONSTRAINT "Question_subTopicId_fkey"
        FOREIGN KEY ("subTopicId") REFERENCES "SubTopic"("id") ON DELETE SET NULL;

CREATE INDEX "Lesson_subTopicId_idx"   ON "Lesson"("subTopicId");
CREATE INDEX "Question_subTopicId_idx" ON "Question"("subTopicId");
