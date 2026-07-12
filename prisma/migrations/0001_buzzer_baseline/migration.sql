-- Baseline migration for MedalMinds Buzzer Arena tables.
-- Written to be idempotent so it can be applied against an existing production
-- DB that already has these objects (CREATE TYPE uses exception handling,
-- CREATE TABLE uses IF NOT EXISTS, etc.).

-- Enums

DO $$ BEGIN
  CREATE TYPE "SchoolLevel" AS ENUM ('MIDDLE_SCHOOL', 'HIGH_SCHOOL', 'MIXED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "BuzzerRoomStatus" AS ENUM (
    'WAITING',
    'READING',
    'RUNNING',
    'BUZZED',
    'BONUS',
    'PAUSED',
    'TIMEOUT',
    'ENDED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "BuzzerRoomEventType" AS ENUM (
    'ROOM_CREATED',
    'SEAT_TAKEN',
    'SEAT_LEFT',
    'ROUND_STARTED',
    'DONE_READING',
    'TIMER_PAUSED',
    'TIMER_RESUMED',
    'BUZZED',
    'BUZZED_DURING_READING',
    'INTERRUPT_CONFIRMED',
    'INTERRUPT_INCORRECT',
    'QUESTION_DEAD',
    'ROUND_CLOCK_EXPIRED',
    'CORRECT',
    'INCORRECT',
    'BONUS_QUEUED',
    'NEXT_QUESTION',
    'RESET',
    'GAME_ENDED'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Tables

CREATE TABLE IF NOT EXISTS "BuzzerRoom" (
    "id"                      TEXT NOT NULL,
    "code"                    TEXT NOT NULL,
    "organizerPassword"       TEXT NOT NULL,
    "status"                  "BuzzerRoomStatus" NOT NULL DEFAULT 'WAITING',
    "version"                 INTEGER NOT NULL DEFAULT 0,
    "schoolLevel"             "SchoolLevel",
    "teamAName"               TEXT NOT NULL DEFAULT 'Team A',
    "teamBName"               TEXT NOT NULL DEFAULT 'Team B',
    "teamAScore"              INTEGER NOT NULL DEFAULT 0,
    "teamBScore"              INTEGER NOT NULL DEFAULT 0,
    "timerStartedAt"          TIMESTAMP(3),
    "timerDurationMs"         INTEGER NOT NULL DEFAULT 15000,
    "timerElapsedMs"          INTEGER NOT NULL DEFAULT 0,
    "questionClockStartedAt"  TIMESTAMP(3),
    "questionClockDurationMs" INTEGER NOT NULL DEFAULT 0,
    "questionClockElapsedMs"  INTEGER NOT NULL DEFAULT 0,
    "buzzedIsInterrupt"       BOOLEAN NOT NULL DEFAULT false,
    "totalRounds"             INTEGER NOT NULL DEFAULT 3,
    "roundNumber"             INTEGER NOT NULL DEFAULT 1,
    "questionNumber"          INTEGER NOT NULL DEFAULT 1,
    "currentQuestionId"       TEXT,
    "buzzedSeatId"            TEXT,
    "expiresAt"               TIMESTAMP(3) NOT NULL,
    "createdAt"               TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"               TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuzzerRoom_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "BuzzerSeat" (
    "id"              TEXT NOT NULL,
    "roomId"          TEXT NOT NULL,
    "team"            TEXT NOT NULL,
    "slot"            TEXT NOT NULL,
    "participantName" TEXT,
    "buzzedAt"        TIMESTAMP(3),
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"       TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuzzerSeat_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "BuzzerRoomEvent" (
    "id"        TEXT NOT NULL,
    "roomId"    TEXT NOT NULL,
    "type"      "BuzzerRoomEventType" NOT NULL,
    "message"   TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuzzerRoomEvent_pkey" PRIMARY KEY ("id")
);

-- Unique constraints (as unique indexes, matching Prisma's convention — the
-- production DB already has these as indexes, so ADD CONSTRAINT would collide)

CREATE UNIQUE INDEX IF NOT EXISTS "BuzzerRoom_code_key" ON "BuzzerRoom"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "BuzzerRoom_buzzedSeatId_key" ON "BuzzerRoom"("buzzedSeatId");
CREATE UNIQUE INDEX IF NOT EXISTS "BuzzerSeat_roomId_team_slot_key" ON "BuzzerSeat"("roomId", "team", "slot");

-- Foreign keys

DO $$ BEGIN
  ALTER TABLE "BuzzerRoom"
    ADD CONSTRAINT "BuzzerRoom_buzzedSeatId_fkey"
    FOREIGN KEY ("buzzedSeatId") REFERENCES "BuzzerSeat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "BuzzerSeat"
    ADD CONSTRAINT "BuzzerSeat_roomId_fkey"
    FOREIGN KEY ("roomId") REFERENCES "BuzzerRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "BuzzerRoomEvent"
    ADD CONSTRAINT "BuzzerRoomEvent_roomId_fkey"
    FOREIGN KEY ("roomId") REFERENCES "BuzzerRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Indexes

CREATE INDEX IF NOT EXISTS "BuzzerRoom_code_idx" ON "BuzzerRoom"("code");
CREATE INDEX IF NOT EXISTS "BuzzerRoom_expiresAt_idx" ON "BuzzerRoom"("expiresAt");
CREATE INDEX IF NOT EXISTS "BuzzerRoom_status_idx" ON "BuzzerRoom"("status");
CREATE INDEX IF NOT EXISTS "BuzzerSeat_roomId_idx" ON "BuzzerSeat"("roomId");
CREATE INDEX IF NOT EXISTS "BuzzerRoomEvent_roomId_createdAt_idx" ON "BuzzerRoomEvent"("roomId", "createdAt");
