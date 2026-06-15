import { Prisma, QuestionKind } from "@prisma/client";
import type { PracticeQuestion } from "@/types";
import { getPrisma } from "./db";

export type BuzzerRole = "organizer" | "participant";
export type BuzzerTeam = "A" | "B";
export type BuzzerRoomAction =
  | { type: "sit"; participantName: string; team: BuzzerTeam; slot: string }
  | { type: "stand"; seatId: string; participantName?: string }
  | { type: "start"; organizerPassword: string }
  | { type: "toggleTimer"; organizerPassword: string }
  | { type: "buzz"; seatId: string; participantName?: string }
  | { type: "judge"; organizerPassword: string; result: "correct" | "incorrect" }
  | { type: "nextQuestion"; organizerPassword: string }
  | { type: "reset"; organizerPassword: string };

export type BuzzerRoomSetup = {
  teamAName: string;
  teamBName: string;
  totalRounds: number;
  timerMinutes: number;
};

const ROOM_TTL_HOURS = 12;
const TIMER_DURATION_MS = 10 * 60 * 1000;
const SEATS: Array<{ team: BuzzerTeam; slot: string }> = [
  { team: "A", slot: "a1" },
  { team: "A", slot: "a2" },
  { team: "A", slot: "a3" },
  { team: "A", slot: "a4" },
  { team: "B", slot: "b1" },
  { team: "B", slot: "b2" },
  { team: "B", slot: "b3" },
  { team: "B", slot: "b4" }
];

const passwordWords = [
  "comet",
  "juno",
  "helix",
  "nova",
  "orbit",
  "kepler",
  "atlas",
  "quark",
  "vector",
  "lunar",
  "pioneer",
  "signal",
  "rocket",
  "cinder",
  "harbor",
  "mosaic",
  "summit",
  "brisk",
  "ember",
  "tidal"
];
const choiceLetters = ["W", "X", "Y", "Z"];

type RoomWithRelations = Prisma.BuzzerRoomGetPayload<{
  include: {
    seats: { orderBy: [{ team: "asc" }, { slot: "asc" }] };
    events: { orderBy: { createdAt: "desc" }; take: 8 };
    currentQuestion: { include: { answers: { orderBy: { position: "asc" } } } };
  };
}>;

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function randomItem(items: string[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function makeCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function makePassword() {
  return randomItem(passwordWords);
}

function id(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function timeRemaining(room: RoomWithRelations) {
  if (room.status === "PAUSED") {
    return Math.max(0, room.timerDurationMs - room.timerElapsedMs);
  }

  if (!room.timerStartedAt) {
    return Math.max(0, room.timerDurationMs - room.timerElapsedMs);
  }

  const elapsed = room.timerElapsedMs + (Date.now() - room.timerStartedAt.getTime());
  return Math.max(0, room.timerDurationMs - elapsed);
}

function stripInlineMultipleChoiceOptions(prompt: string) {
  const stripped = prompt
    .replace(/\s+W\)\s+[\s\S]*?\s+X\)\s+[\s\S]*?\s+Y\)\s+[\s\S]*?\s+Z\)\s+[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return stripped || prompt;
}

function effectiveStatus(room: RoomWithRelations) {
  if (room.status !== "PAUSED" && room.timerStartedAt && timeRemaining(room) <= 0) return "TIMEOUT";
  return room.status;
}

function questionKindLabel(value: QuestionKind | string | null | undefined) {
  if (value === QuestionKind.BONUS || value === "BONUS") return "BONUS";
  if (value === QuestionKind.TOSSUP || value === "TOSSUP") return "TOSS-UP";
  if (value === QuestionKind.REVIEW || value === "REVIEW") return "REVIEW";
  return "PRACTICE";
}

function formatLabel(value: string | null | undefined) {
  return value === "MULTIPLE_CHOICE" ? "Multiple Choice" : "Short Answer";
}

function clampText(value: unknown, fallback: string) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function clampInteger(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}

function questionForOrganizer(room: RoomWithRelations): (PracticeQuestion & { correctLetter: string | null; questionKind: string; format: string }) | null {
  const question = room.currentQuestion;
  if (!question) return null;
  const choices = question.answers.slice(0, 4).map((answer) => answer.text);
  const correctIndex = question.answers.slice(0, 4).findIndex((answer) => answer.isCorrect);
  const correctText = question.answers.slice(0, 4)[correctIndex]?.text ?? question.correctAnswer;
  const type = question.format === "MULTIPLE_CHOICE" ? "multiple_choice" : "short_answer";

  return {
    id: question.id,
    competitionSlug: "science-bowl",
    category: question.category,
    level: question.level,
    difficulty:
      question.difficulty === "FOUNDATIONAL"
        ? "Foundational"
        : question.difficulty === "ADVANCED"
        ? "Advanced"
        : "Intermediate",
    type,
    prompt: stripInlineMultipleChoiceOptions(question.prompt),
    choices: type === "multiple_choice" ? choices : undefined,
    correctAnswer: correctText,
    alternateAnswers: [],
    explanation: question.explanation,
    correctLetter: correctIndex >= 0 ? choiceLetters[correctIndex] : null,
    questionKind: questionKindLabel(question.questionKind),
    format: formatLabel(question.format)
  };
}

export function serializeBuzzerRoom(room: RoomWithRelations, role: BuzzerRole) {
  const buzzedSeat = room.buzzedSeatId ? room.seats.find((seat) => seat.id === room.buzzedSeatId) ?? null : null;

  return {
    code: room.code,
    role,
    status: effectiveStatus(room),
    roundNumber: room.roundNumber,
    questionNumber: room.questionNumber,
    totalRounds: room.totalRounds,
    teamAName: room.teamAName,
    teamBName: room.teamBName,
    teamAScore: room.teamAScore,
    teamBScore: room.teamBScore,
    timerDurationMs: room.timerDurationMs,
    timerElapsedMs: room.timerElapsedMs,
    remainingMs: timeRemaining(room),
    expiresAt: room.expiresAt.toISOString(),
    buzzedSeatId: room.buzzedSeatId,
    buzzedSeat: buzzedSeat
      ? {
          id: buzzedSeat.id,
          team: buzzedSeat.team,
          slot: buzzedSeat.slot,
          participantName: buzzedSeat.participantName
        }
      : null,
    seats: room.seats.map((seat) => ({
      id: seat.id,
      team: seat.team,
      slot: seat.slot,
      participantName: seat.participantName,
      buzzedAt: seat.buzzedAt?.toISOString() ?? null
    })),
    events: room.events.map((event) => ({
      id: event.id,
      type: event.type,
      message: event.message,
      createdAt: event.createdAt.toISOString()
    })),
    question: role === "organizer" ? questionForOrganizer(room) : null
  };
}

async function randomScienceBowlQuestionId() {
  const prisma = getPrisma();
  const rows = await prisma.$queryRaw<Array<{ id: string }>>(
    Prisma.sql`
      SELECT q.id
      FROM "Question" q
      INNER JOIN "Competition" c ON c.id = q."competitionId"
      WHERE c.slug = 'science-bowl'
        AND q."questionKind" = 'TOSSUP'
        AND (
          SELECT count(*)
          FROM "Answer" a
          WHERE a."questionId" = q.id
        ) >= CASE WHEN q.format = 'MULTIPLE_CHOICE' THEN 4 ELSE 1 END
      ORDER BY random()
      LIMIT 1
    `
  );
  return rows[0]?.id ?? null;
}

async function pairedBonusQuestionId(questionId: string) {
  const prisma = getPrisma();
  const current = await prisma.question.findUnique({
    where: { id: questionId },
    select: {
      competitionId: true,
      sourcePdfUrl: true,
      sourceSet: true,
      sourceRound: true,
      sourceQuestionNumber: true,
      category: true,
      schoolLevel: true
    }
  });

  if (!current) return null;

  const bonus = await prisma.question.findFirst({
    where: {
      competitionId: current.competitionId,
      questionKind: QuestionKind.BONUS,
      sourcePdfUrl: current.sourcePdfUrl,
      sourceSet: current.sourceSet,
      sourceRound: current.sourceRound,
      sourceQuestionNumber: current.sourceQuestionNumber,
      category: current.category,
      schoolLevel: current.schoolLevel
    },
    select: { id: true }
  });

  return bonus?.id ?? null;
}

async function includeRoom(code: string) {
  return getPrisma().buzzerRoom.findFirst({
    where: { code: code.toUpperCase(), expiresAt: { gt: new Date() } },
    include: {
      seats: { orderBy: [{ team: "asc" }, { slot: "asc" }] },
      events: { orderBy: { createdAt: "desc" }, take: 8 },
      currentQuestion: { include: { answers: { orderBy: { position: "asc" } } } }
    }
  });
}

export async function createBuzzerRoom(setup?: Partial<BuzzerRoomSetup>) {
  const prisma = getPrisma();
  const currentQuestionId = await randomScienceBowlQuestionId();
  if (!currentQuestionId) throw new Error("No Science Bowl toss-up questions are available.");
  const teamAName = clampText(setup?.teamAName, "Team A");
  const teamBName = clampText(setup?.teamBName, "Team B");
  const totalRounds = clampInteger(setup?.totalRounds, 3, 1, 20);
  const timerMinutes = clampInteger(setup?.timerMinutes, 10, 1, 60);
  const timerDurationMs = timerMinutes * 60 * 1000;

  let code = makeCode();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const existing = await prisma.buzzerRoom.findUnique({ where: { code } });
    if (!existing) break;
    code = makeCode();
  }

  await prisma.buzzerRoom.create({
    data: {
      id: id("room"),
      code,
      organizerPassword: makePassword(),
      teamAName,
      teamBName,
      totalRounds,
      questionNumber: 1,
      currentQuestionId,
      timerDurationMs,
      timerElapsedMs: 0,
      expiresAt: addHours(new Date(), ROOM_TTL_HOURS),
      seats: {
        create: SEATS.map((seat) => ({
          id: id("seat"),
          team: seat.team,
          slot: seat.slot
        }))
      },
      events: {
        create: {
          id: id("event"),
          type: "ROOM_CREATED",
          message: "Game room created."
        }
      }
    }
  });

  const room = await includeRoom(code);
  if (!room) throw new Error("Failed to create room.");
  return room;
}

export async function getBuzzerRoom(code: string) {
  return includeRoom(code);
}

export async function roleForRoom(code: string, organizerPassword?: string | null): Promise<BuzzerRole> {
  if (!organizerPassword) return "participant";
  const room = await getPrisma().buzzerRoom.findFirst({
    where: { code: code.toUpperCase(), organizerPassword, expiresAt: { gt: new Date() } },
    select: { id: true }
  });
  return room ? "organizer" : "participant";
}

function requireOrganizer(room: RoomWithRelations, organizerPassword?: string) {
  if (!organizerPassword || organizerPassword !== room.organizerPassword) {
    throw new Error("Organizer password is required.");
  }
}

export async function applyBuzzerAction(code: string, action: BuzzerRoomAction) {
  const prisma = getPrisma();
  const room = await includeRoom(code);
  if (!room) throw new Error("Room not found.");

  const roomCode = room.code;

  if (action.type === "sit") {
    const participantName = String(action.participantName ?? "").trim().slice(0, 40);
    if (!participantName) throw new Error("Participant name is required.");
    const team = action.team === "B" ? "B" : "A";
    const slot = String(action.slot ?? "").toLowerCase();
    const result = await prisma.buzzerSeat.updateMany({
      where: { roomId: room.id, team, slot, participantName: null },
      data: { participantName }
    });
    if (!result.count) throw new Error("That seat is no longer available.");
    await prisma.buzzerRoomEvent.create({
      data: { id: id("event"), roomId: room.id, type: "SEAT_TAKEN", message: `${participantName} sat in ${slot.toUpperCase()}.` }
    });
  }

  if (action.type === "stand") {
    const seat = room.seats.find((item) => item.id === action.seatId);
    const participantName = String(action.participantName ?? "").trim();
    if (seat && (!participantName || participantName === seat.participantName)) {
      await prisma.buzzerSeat.update({ where: { id: seat.id }, data: { participantName: null, buzzedAt: null } });
      await prisma.buzzerRoomEvent.create({
        data: { id: id("event"), roomId: room.id, type: "SEAT_LEFT", message: `${seat.slot.toUpperCase()} is now open.` }
      });
    }
  }

  if (action.type === "start") {
    requireOrganizer(room, action.organizerPassword);
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: { status: "RUNNING", timerStartedAt: new Date(), timerElapsedMs: 0, buzzedSeatId: null }
    });
    await prisma.buzzerSeat.updateMany({ where: { roomId: room.id }, data: { buzzedAt: null } });
    await prisma.buzzerRoomEvent.create({
      data: { id: id("event"), roomId: room.id, type: "ROUND_STARTED", message: `Question ${room.questionNumber} started.` }
    });
  }

  if (action.type === "toggleTimer") {
    requireOrganizer(room, action.organizerPassword);
    const now = new Date();
    if (room.status === "PAUSED") {
      await prisma.buzzerRoom.update({
        where: { id: room.id },
        data: { status: "RUNNING", timerStartedAt: now }
      });
      await prisma.buzzerRoomEvent.create({
        data: { id: id("event"), roomId: room.id, type: "TIMER_RESUMED", message: "Timer resumed." }
      });
    } else {
      const elapsed = room.timerStartedAt ? room.timerElapsedMs + (now.getTime() - room.timerStartedAt.getTime()) : room.timerElapsedMs;
      await prisma.buzzerRoom.update({
        where: { id: room.id },
        data: { status: "PAUSED", timerStartedAt: null, timerElapsedMs: elapsed }
      });
      await prisma.buzzerRoomEvent.create({
        data: { id: id("event"), roomId: room.id, type: "TIMER_PAUSED", message: "Timer paused." }
      });
    }
  }

  if (action.type === "buzz") {
    const seat = room.seats.find((item) => item.id === action.seatId && item.participantName);
    const participantName = String(action.participantName ?? "").trim();
    if (seat && participantName && participantName !== seat.participantName) throw new Error("Seat owner does not match.");
    if (!seat || room.status !== "RUNNING" || timeRemaining(room) <= 0) throw new Error("Buzz is not available.");
    const result = await prisma.buzzerRoom.updateMany({
      where: { id: room.id, buzzedSeatId: null, status: "RUNNING" },
      data: { buzzedSeatId: seat.id, status: "BUZZED" }
    });
    if (result.count) {
      await prisma.buzzerSeat.update({ where: { id: seat.id }, data: { buzzedAt: new Date() } });
      await prisma.buzzerRoomEvent.create({
        data: {
          id: id("event"),
          roomId: room.id,
          type: "BUZZED",
          message: `${seat.participantName} buzzed in for Team ${seat.team}.`
        }
      });
    }
  }

  if (action.type === "judge") {
    requireOrganizer(room, action.organizerPassword);
    const buzzedSeat = room.buzzedSeatId ? room.seats.find((seat) => seat.id === room.buzzedSeatId) : null;
    if (!buzzedSeat) throw new Error("No buzzed participant to judge.");
    const correct = action.result === "correct";
    const currentKind = room.currentQuestion?.questionKind;
    const isTossup = currentKind === QuestionKind.TOSSUP;
    const isBonus = currentKind === QuestionKind.BONUS;
    const bonusQuestionId = correct && isTossup ? await pairedBonusQuestionId(room.currentQuestionId ?? "") : null;
    const nextQuestionId = correct && bonusQuestionId ? bonusQuestionId : await randomScienceBowlQuestionId();
    const keepBuzzedSeat = Boolean(correct && bonusQuestionId);
    const points = correct ? (isBonus ? 10 : 4) : 0;
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: {
        status: correct && bonusQuestionId ? "BONUS" : "RUNNING",
        buzzedSeatId: keepBuzzedSeat ? room.buzzedSeatId : null,
        currentQuestionId: isBonus || !correct || !bonusQuestionId ? nextQuestionId : bonusQuestionId,
        questionNumber: { increment: 1 },
        ...(correct && points > 0 && buzzedSeat.team === "A" ? { teamAScore: { increment: points } } : {}),
        ...(correct && points > 0 && buzzedSeat.team === "B" ? { teamBScore: { increment: points } } : {})
      }
    });
    if (!keepBuzzedSeat) {
      await prisma.buzzerSeat.updateMany({ where: { roomId: room.id }, data: { buzzedAt: null } });
    }
    await prisma.buzzerRoomEvent.create({
      data: {
        id: id("event"),
        roomId: room.id,
        type: correct ? (bonusQuestionId ? "BONUS_QUEUED" : "CORRECT") : "INCORRECT",
        message: correct
          ? bonusQuestionId
            ? `${buzzedSeat.participantName ?? buzzedSeat.slot.toUpperCase()} - Correct (+${points}). Bonus question loaded.`
            : `${buzzedSeat.participantName ?? buzzedSeat.slot.toUpperCase()} - Correct (+${points}).`
          : `${buzzedSeat.participantName ?? buzzedSeat.slot.toUpperCase()} - Incorrect.`
      }
    });
  }

  if (action.type === "nextQuestion") {
    requireOrganizer(room, action.organizerPassword);
    const nextQuestionId = await randomScienceBowlQuestionId();
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: {
        currentQuestionId: nextQuestionId,
        status: room.status === "PAUSED" ? "PAUSED" : "RUNNING",
        buzzedSeatId: null,
        questionNumber: { increment: 1 }
      }
    });
    await prisma.buzzerSeat.updateMany({ where: { roomId: room.id }, data: { buzzedAt: null } });
    await prisma.buzzerRoomEvent.create({
      data: {
        id: id("event"),
        roomId: room.id,
        type: "NEXT_QUESTION",
        message: `Advanced to question ${room.questionNumber + 1}.`
      }
    });
  }

  if (action.type === "reset") {
    requireOrganizer(room, action.organizerPassword);
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: { status: "WAITING", timerStartedAt: null, timerElapsedMs: 0, buzzedSeatId: null }
    });
    await prisma.buzzerSeat.updateMany({ where: { roomId: room.id }, data: { buzzedAt: null } });
    await prisma.buzzerRoomEvent.create({
      data: { id: id("event"), roomId: room.id, type: "RESET", message: "Buzzer cleared." }
    });
  }

  const updated = await includeRoom(roomCode);
  if (!updated) throw new Error("Room not found.");
  return updated;
}
