-- CreateTable
CREATE TABLE "BuzzerRoom" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "organizerPassword" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "teamAScore" INTEGER NOT NULL DEFAULT 0,
    "teamBScore" INTEGER NOT NULL DEFAULT 0,
    "timerStartedAt" TIMESTAMP(3),
    "timerDurationMs" INTEGER NOT NULL DEFAULT 15000,
    "roundNumber" INTEGER NOT NULL DEFAULT 1,
    "currentQuestionId" TEXT,
    "buzzedSeatId" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuzzerRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuzzerSeat" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "participantName" TEXT,
    "buzzedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuzzerSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuzzerRoomEvent" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuzzerRoomEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuzzerRoom_code_key" ON "BuzzerRoom"("code");

-- CreateIndex
CREATE INDEX "BuzzerRoom_code_idx" ON "BuzzerRoom"("code");

-- CreateIndex
CREATE INDEX "BuzzerRoom_expiresAt_idx" ON "BuzzerRoom"("expiresAt");

-- CreateIndex
CREATE INDEX "BuzzerRoom_currentQuestionId_idx" ON "BuzzerRoom"("currentQuestionId");

-- CreateIndex
CREATE INDEX "BuzzerSeat_roomId_idx" ON "BuzzerSeat"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "BuzzerSeat_roomId_team_slot_key" ON "BuzzerSeat"("roomId", "team", "slot");

-- CreateIndex
CREATE INDEX "BuzzerRoomEvent_roomId_createdAt_idx" ON "BuzzerRoomEvent"("roomId", "createdAt");

-- AddForeignKey
ALTER TABLE "BuzzerRoom" ADD CONSTRAINT "BuzzerRoom_currentQuestionId_fkey" FOREIGN KEY ("currentQuestionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuzzerSeat" ADD CONSTRAINT "BuzzerSeat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "BuzzerRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuzzerRoomEvent" ADD CONSTRAINT "BuzzerRoomEvent_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "BuzzerRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
