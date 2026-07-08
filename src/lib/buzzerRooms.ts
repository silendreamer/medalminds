import { BuzzerRoomEventType, BuzzerRoomStatus, Prisma } from "@prisma/client";
import type { PracticeQuestion } from "@/types";
import { buzzerQuestions, type BuzzerQuestion } from "@/data/buzzerQuestions";
import { getNsbBuzzerPool, type NsbBuzzerQuestion } from "@/data/nsbQuestions";
import { getPrisma } from "./db";

export type BuzzerRole = "organizer" | "participant";
export type BuzzerTeam = "A" | "B";
export type BuzzerRoomAction =
  | { type: "sit"; participantName: string; team: BuzzerTeam; slot: string }
  | { type: "stand"; seatId: string; participantName?: string }
  | { type: "start"; organizerPassword: string }
  | { type: "toggleTimer"; organizerPassword: string }
  | { type: "doneReading"; organizerPassword: string }
  | { type: "markInterrupt"; organizerPassword: string }
  | { type: "buzz"; seatId: string; participantName?: string }
  | { type: "judge"; organizerPassword: string; result: "correct" | "incorrect" }
  | { type: "nextQuestion"; organizerPassword: string }
  | { type: "endGame"; organizerPassword: string }
  | { type: "reset"; organizerPassword: string };

export type BuzzerRoomSetup = {
  teamAName: string;
  teamBName: string;
  totalRounds: number;
  timerMinutes: number;
  schoolLevel?: string | null;
};

const ROOM_TTL_HOURS = 12;
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
  "comet", "juno", "helix", "nova", "orbit", "kepler", "atlas", "quark",
  "vector", "lunar", "pioneer", "signal", "rocket", "cinder", "harbor",
  "mosaic", "summit", "brisk", "ember", "tidal"
];
const choiceLetters = ["W", "X", "Y", "Z"];

function formatSeatLabel(slot: string) {
  const value = slot.trim().toLowerCase();
  if (value === "a1") return "A1";
  if (value === "a2") return "AC";
  if (value === "a3") return "A2";
  if (value === "a4") return "A3";
  if (value === "b1") return "B1";
  if (value === "b2") return "BC";
  if (value === "b3") return "B2";
  if (value === "b4") return "B3";
  return slot.toUpperCase();
}

type RoomWithRelations = Prisma.BuzzerRoomGetPayload<{
  include: {
    seats: { orderBy: [{ team: "asc" }, { slot: "asc" }] };
    events: { orderBy: { createdAt: "desc" }; take: 8 };
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

function isBonus(room: RoomWithRelations) {
  return room.status === "BONUS";
}

function questionClockDurationFor(bonus: boolean) {
  return bonus ? 20_000 : 5_000;
}

function startQuestionClockData(room: RoomWithRelations, forceInterrupt: boolean) {
  const bonus = isBonus(room);
  const status: BuzzerRoomStatus = bonus ? BuzzerRoomStatus.BONUS : room.buzzedSeatId ? BuzzerRoomStatus.BUZZED : BuzzerRoomStatus.RUNNING;
  return {
    status,
    questionClockStartedAt: new Date(),
    questionClockDurationMs: questionClockDurationFor(bonus),
    questionClockElapsedMs: 0,
    buzzedIsInterrupt: forceInterrupt
  };
}

function questionClockRemaining(room: RoomWithRelations) {
  if (!room.questionClockDurationMs) return 0;
  if (!room.questionClockStartedAt) return Math.max(0, room.questionClockDurationMs - room.questionClockElapsedMs);
  const elapsed = room.questionClockElapsedMs + (Date.now() - room.questionClockStartedAt.getTime());
  return Math.max(0, room.questionClockDurationMs - elapsed);
}

function effectiveStatus(room: RoomWithRelations) {
  if (room.status === "ENDED") return "ENDED";
  if (room.questionClockStartedAt && questionClockRemaining(room) <= 0 && room.status !== "PAUSED") return "TIMEOUT";
  if (room.status !== "PAUSED" && room.timerStartedAt && timeRemaining(room) <= 0) return "TIMEOUT";
  return room.status;
}

function resumeStatus(room: RoomWithRelations): BuzzerRoomStatus {
  if (isBonus(room)) return BuzzerRoomStatus.BONUS;
  if (room.buzzedSeatId) return BuzzerRoomStatus.BUZZED;
  if (room.questionClockStartedAt) return BuzzerRoomStatus.RUNNING;
  return BuzzerRoomStatus.READING;
}

function findLocalQuestion(questionId: string | null | undefined): BuzzerQuestion | null {
  if (!questionId) return null;
  return buzzerQuestions.find((q) => q.id === questionId) ?? null;
}

async function randomQuestionId(schoolLevel?: string | null): Promise<string | null> {
  const pool = await getNsbBuzzerPool();
  if (pool) {
    const ids =
      schoolLevel === "MIDDLE_SCHOOL" || schoolLevel === "HIGH_SCHOOL"
        ? pool.tossupIds[schoolLevel]
        : [...pool.tossupIds.MIDDLE_SCHOOL, ...pool.tossupIds.HIGH_SCHOOL];
    if (ids.length) {
      return ids[Math.floor(Math.random() * ids.length)];
    }
  }
  if (!buzzerQuestions.length) return null;
  const index = Math.floor(Math.random() * buzzerQuestions.length);
  return buzzerQuestions[index].id;
}

type OrganizerQuestion = PracticeQuestion & { correctLetter: string | null; questionKind: string; format: string };

function organizerQuestionFromPool(question: NsbBuzzerQuestion, bonus: boolean): OrganizerQuestion {
  const isMultipleChoice = question.format === "multiple_choice" && Boolean(question.choices?.length);
  const correctLetter =
    isMultipleChoice && question.answerIndex != null ? choiceLetters[question.answerIndex] ?? null : null;

  return {
    id: question.id,
    competitionSlug: "science-bowl",
    subject: question.category,
    level: "",
    difficulty: "MEDIUM",
    type: question.format,
    prompt: question.text,
    choices: isMultipleChoice ? question.choices : undefined,
    correctAnswer: question.answer,
    alternateAnswers: [],
    explanation: "",
    correctLetter,
    questionKind: bonus ? "BONUS" : "TOSS-UP",
    format: isMultipleChoice ? "Multiple Choice" : "Short Answer"
  };
}

async function questionForOrganizer(room: RoomWithRelations): Promise<OrganizerQuestion | null> {
  if (!room.currentQuestionId) return null;
  const bonus = isBonus(room);

  const pool = await getNsbBuzzerPool();
  const tossup = pool?.byId.get(room.currentQuestionId);
  if (tossup) {
    const active = bonus && tossup.bonusQuestionId ? pool?.byId.get(tossup.bonusQuestionId) ?? tossup : tossup;
    return organizerQuestionFromPool(active, bonus);
  }

  const pair = findLocalQuestion(room.currentQuestionId);
  if (!pair) return null;
  const prompt = bonus ? pair.bonusPrompt : pair.tossupPrompt;
  const correctAnswer = bonus ? pair.bonusAnswer : pair.tossupAnswer;
  const explanation = bonus ? pair.bonusExplanation : pair.tossupExplanation;

  return {
    id: pair.id,
    competitionSlug: "science-bowl",
    subject: pair.category,
    level: "",
    difficulty: pair.difficulty,
    type: "short_answer",
    prompt,
    choices: undefined,
    correctAnswer,
    alternateAnswers: [],
    explanation,
    correctLetter: null,
    questionKind: bonus ? "BONUS" : "TOSS-UP",
    format: "Short Answer"
  };
}

export async function serializeBuzzerRoom(room: RoomWithRelations, role: BuzzerRole) {
  const buzzedSeat = room.buzzedSeatId ? room.seats.find((seat) => seat.id === room.buzzedSeatId) ?? null : null;

  return {
    code: room.code,
    role,
    status: effectiveStatus(room),
    schoolLevel: room.schoolLevel ?? null,
    roundNumber: room.roundNumber,
    questionNumber: room.questionNumber,
    totalRounds: room.totalRounds,
    teamAName: room.teamAName,
    teamBName: room.teamBName,
    teamAScore: room.teamAScore,
    teamBScore: room.teamBScore,
    timerDurationMs: room.timerDurationMs,
    timerElapsedMs: room.timerElapsedMs,
    questionClockDurationMs: room.questionClockDurationMs,
    questionClockRemainingMs: questionClockRemaining(room),
    buzzedIsInterrupt: room.buzzedIsInterrupt,
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
    question: role === "organizer" ? await questionForOrganizer(room) : null
  };
}

async function includeRoom(code: string) {
  return getPrisma().buzzerRoom.findFirst({
    where: { code: code.toUpperCase(), expiresAt: { gt: new Date() } },
    include: {
      seats: { orderBy: [{ team: "asc" }, { slot: "asc" }] },
      events: { orderBy: { createdAt: "desc" }, take: 8 }
    }
  });
}

async function includeRoomWithTimeout(code: string) {
  const prisma = getPrisma();
  const room = await includeRoom(code);
  if (!room) return null;

  const questionTimerExpired = Boolean(room.questionClockStartedAt) && questionClockRemaining(room) <= 0 && room.status !== "PAUSED";
  const roundTimerExpired = Boolean(room.timerStartedAt) && timeRemaining(room) <= 0 && room.status !== "PAUSED";

  if (questionTimerExpired || roundTimerExpired) {
    const update = await prisma.buzzerRoom.updateMany({
      where: {
        id: room.id,
        status: { not: BuzzerRoomStatus.ENDED },
        ...(questionTimerExpired
          ? { questionClockStartedAt: { not: null } }
          : { timerStartedAt: { not: null } })
      },
      data: {
        status: BuzzerRoomStatus.TIMEOUT,
        buzzedSeatId: null,
        questionClockStartedAt: null,
        questionClockElapsedMs: 0,
        questionClockDurationMs: 0
      }
    });

    if (update.count && questionTimerExpired) {
      const label = isBonus(room) ? "Bonus" : "Tossup";
      await prisma.buzzerRoomEvent.create({
        data: {
          id: id("event"),
          roomId: room.id,
          type: "QUESTION_DEAD",
          message: `${label} #${room.questionNumber} marked dead.`
        }
      });
    }

    if (update.count && roundTimerExpired) {
      await prisma.buzzerRoomEvent.create({
        data: {
          id: id("event"),
          roomId: room.id,
          type: "ROUND_CLOCK_EXPIRED",
          message: "Round clock expired."
        }
      });
    }
  }

  return includeRoom(code);
}

export async function createBuzzerRoom(setup?: Partial<BuzzerRoomSetup>) {
  const prisma = getPrisma();
  const schoolLevel = setup?.schoolLevel === "MIDDLE_SCHOOL" || setup?.schoolLevel === "HIGH_SCHOOL"
    ? setup.schoolLevel
    : null;
  if (!schoolLevel) throw new Error("A school level (Middle School or High School) is required.");
  const currentQuestionId = await randomQuestionId(schoolLevel);
  if (!currentQuestionId) throw new Error("No Science Bowl questions are available.");
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
      schoolLevel,
      teamAName,
      teamBName,
      totalRounds,
      questionNumber: 1,
      currentQuestionId,
      timerDurationMs,
      timerElapsedMs: 0,
      questionClockStartedAt: null,
      questionClockDurationMs: 0,
      questionClockElapsedMs: 0,
      buzzedIsInterrupt: false,
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
  return includeRoomWithTimeout(code);
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

function clampText(value: unknown, fallback: string) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function clampInteger(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}

export async function applyBuzzerAction(code: string, action: BuzzerRoomAction) {
  const prisma = getPrisma();
  const room = await includeRoomWithTimeout(code);
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
      data: { id: id("event"), roomId: room.id, type: "SEAT_TAKEN", message: `${participantName} sat in ${formatSeatLabel(slot)}.` }
    });
  }

  if (action.type === "stand") {
    const seat = room.seats.find((item) => item.id === action.seatId);
    const participantName = String(action.participantName ?? "").trim();
    if (seat && (!participantName || participantName === seat.participantName)) {
      await prisma.buzzerSeat.update({ where: { id: seat.id }, data: { participantName: null, buzzedAt: null } });
      await prisma.buzzerRoomEvent.create({
        data: { id: id("event"), roomId: room.id, type: "SEAT_LEFT", message: `${formatSeatLabel(seat.slot)} is now open.` }
      });
    }
  }

  if (action.type === "start") {
    requireOrganizer(room, action.organizerPassword);
    const resumeQuestionClock = room.questionClockDurationMs > 0 && room.questionClockElapsedMs > 0;
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: {
        status: room.status === "PAUSED" ? resumeStatus(room) : BuzzerRoomStatus.READING,
        timerStartedAt: room.status === "PAUSED" && room.timerStartedAt ? room.timerStartedAt : new Date(),
        timerElapsedMs: room.status === "PAUSED" ? room.timerElapsedMs : 0,
        buzzedSeatId: room.status === "PAUSED" ? room.buzzedSeatId : null,
        buzzedIsInterrupt: room.status === "PAUSED" ? room.buzzedIsInterrupt : false,
        questionClockStartedAt: room.status === "PAUSED" && resumeQuestionClock ? new Date() : null,
        questionClockDurationMs: room.status === "PAUSED" ? room.questionClockDurationMs : 0,
        questionClockElapsedMs: room.status === "PAUSED" ? room.questionClockElapsedMs : 0
      }
    });
    await prisma.buzzerRoomEvent.create({
      data: { id: id("event"), roomId: room.id, type: "ROUND_STARTED", message: `Question ${room.questionNumber} started.` }
    });
  }

  if (action.type === "toggleTimer") {
    requireOrganizer(room, action.organizerPassword);
    const now = new Date();
    if (room.status === "PAUSED") {
      const resumedStatus = resumeStatus(room);
      const resumeQuestionClock = room.questionClockDurationMs > 0 && room.questionClockElapsedMs > 0;
      const questionClockElapsed = room.questionClockStartedAt
        ? room.questionClockElapsedMs + (now.getTime() - room.questionClockStartedAt.getTime())
        : room.questionClockElapsedMs;
      await prisma.buzzerRoom.update({
        where: { id: room.id },
        data: {
          status: resumedStatus,
          timerStartedAt: now,
          questionClockStartedAt: resumeQuestionClock ? now : null,
          questionClockElapsedMs: room.questionClockStartedAt ? questionClockElapsed : room.questionClockElapsedMs
        }
      });
      await prisma.buzzerRoomEvent.create({
        data: { id: id("event"), roomId: room.id, type: "TIMER_RESUMED", message: "Timer resumed." }
      });
    } else {
      const elapsed = room.timerStartedAt ? room.timerElapsedMs + (now.getTime() - room.timerStartedAt.getTime()) : room.timerElapsedMs;
      const questionClockElapsed = room.questionClockStartedAt
        ? room.questionClockElapsedMs + (now.getTime() - room.questionClockStartedAt.getTime())
        : room.questionClockElapsedMs;
      await prisma.buzzerRoom.update({
        where: { id: room.id },
        data: {
          status: BuzzerRoomStatus.PAUSED,
          timerStartedAt: null,
          timerElapsedMs: elapsed,
          questionClockStartedAt: null,
          questionClockElapsedMs: questionClockElapsed
        }
      });
      await prisma.buzzerRoomEvent.create({
        data: { id: id("event"), roomId: room.id, type: "TIMER_PAUSED", message: "Timer paused." }
      });
    }
  }

  if (action.type === "doneReading") {
    requireOrganizer(room, action.organizerPassword);
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: startQuestionClockData(room, false)
    });
    await prisma.buzzerRoomEvent.create({
      data: {
        id: id("event"),
        roomId: room.id,
        type: "DONE_READING",
        message: `Done reading. ${isBonus(room) ? "Bonus" : "Tossup"} clock started.`
      }
    });
  }

  if (action.type === "markInterrupt") {
    requireOrganizer(room, action.organizerPassword);
    if (!room.buzzedSeatId) throw new Error("No buzzed participant to classify.");
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: startQuestionClockData(room, true)
    });
    await prisma.buzzerRoomEvent.create({
      data: {
        id: id("event"),
        roomId: room.id,
        type: "INTERRUPT_CONFIRMED",
        message: "Buzz counted as interrupt."
      }
    });
  }

  if (action.type === "buzz") {
    const seat = room.seats.find((item) => item.id === action.seatId && item.participantName);
    const participantName = String(action.participantName ?? "").trim();
    if (seat && participantName && participantName !== seat.participantName) throw new Error("Seat owner does not match.");
    if (!seat || isBonus(room) || !["READING", "RUNNING"].includes(room.status) || timeRemaining(room) <= 0)
      throw new Error("Buzz is not available.");
    const result = await prisma.buzzerRoom.updateMany({
      where: { id: room.id, buzzedSeatId: null, status: { in: [BuzzerRoomStatus.READING, BuzzerRoomStatus.RUNNING] } },
      data: { buzzedSeatId: seat.id, status: BuzzerRoomStatus.BUZZED, buzzedIsInterrupt: false }
    });
    if (result.count) {
      await prisma.buzzerSeat.update({ where: { id: seat.id }, data: { buzzedAt: new Date() } });
      await prisma.buzzerRoomEvent.create({
        data: {
          id: id("event"),
          roomId: room.id,
          type: room.status === "READING" ? "BUZZED_DURING_READING" : "BUZZED",
          message: room.status === "READING"
            ? `${seat.participantName} buzzed during reading for Team ${seat.team}.`
            : `${seat.participantName} buzzed in for Team ${seat.team}.`
        }
      });
    }
  }

  if (action.type === "judge") {
    requireOrganizer(room, action.organizerPassword);
    const buzzedSeat = room.buzzedSeatId ? room.seats.find((seat) => seat.id === room.buzzedSeatId) : null;
    if (!buzzedSeat) throw new Error("No buzzed participant to judge.");
    const correct = action.result === "correct";
    const currentIsBonus = isBonus(room);
    const bonusAvailable = correct && !currentIsBonus;
    const nextQuestionId = bonusAvailable ? room.currentQuestionId : await randomQuestionId(room.schoolLevel);
    const points = correct ? (currentIsBonus ? 10 : 4) : room.buzzedIsInterrupt ? 4 : 0;
    const pointsTeam = correct
      ? buzzedSeat.team
      : room.buzzedIsInterrupt
      ? buzzedSeat.team === "A" ? "B" : "A"
      : null;
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: {
        status: bonusAvailable ? BuzzerRoomStatus.BONUS : BuzzerRoomStatus.READING,
        buzzedSeatId: null,
        currentQuestionId: nextQuestionId,
        ...(!bonusAvailable ? { questionNumber: { increment: 1 } } : {}),
        questionClockStartedAt: null,
        questionClockDurationMs: 0,
        questionClockElapsedMs: 0,
        buzzedIsInterrupt: false,
        ...(points > 0 && pointsTeam === "A" ? { teamAScore: { increment: points } } : {}),
        ...(points > 0 && pointsTeam === "B" ? { teamBScore: { increment: points } } : {})
      }
    });
    await prisma.buzzerSeat.updateMany({ where: { roomId: room.id }, data: { buzzedAt: null } });
    await prisma.buzzerRoomEvent.create({
      data: {
        id: id("event"),
        roomId: room.id,
        type: correct ? (bonusAvailable ? "BONUS_QUEUED" : "CORRECT") : room.buzzedIsInterrupt ? "INTERRUPT_INCORRECT" : "INCORRECT",
        message: correct
          ? bonusAvailable
            ? `${buzzedSeat.participantName ?? formatSeatLabel(buzzedSeat.slot)} - Correct (+${points}). Bonus question loaded.`
            : `${buzzedSeat.participantName ?? formatSeatLabel(buzzedSeat.slot)} - Correct (+${points}).`
          : room.buzzedIsInterrupt
          ? `${buzzedSeat.participantName ?? formatSeatLabel(buzzedSeat.slot)} interrupted incorrectly. +4 to ${buzzedSeat.team === "A" ? room.teamBName : room.teamAName}.`
          : `${buzzedSeat.participantName ?? formatSeatLabel(buzzedSeat.slot)} - Incorrect.`
      }
    });
  }

  if (action.type === "nextQuestion") {
    requireOrganizer(room, action.organizerPassword);
    const nextQuestionId = await randomQuestionId(room.schoolLevel);
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: {
        currentQuestionId: nextQuestionId,
        status: room.status === "PAUSED" ? BuzzerRoomStatus.PAUSED : BuzzerRoomStatus.READING,
        buzzedSeatId: null,
        buzzedIsInterrupt: false,
        questionClockStartedAt: null,
        questionClockDurationMs: 0,
        questionClockElapsedMs: 0,
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
      data: {
        status: BuzzerRoomStatus.WAITING,
        timerStartedAt: null,
        timerElapsedMs: 0,
        questionClockStartedAt: null,
        questionClockDurationMs: 0,
        questionClockElapsedMs: 0,
        buzzedSeatId: null,
        buzzedIsInterrupt: false
      }
    });
    await prisma.buzzerSeat.updateMany({ where: { roomId: room.id }, data: { buzzedAt: null } });
    await prisma.buzzerRoomEvent.create({
      data: { id: id("event"), roomId: room.id, type: "RESET", message: "Buzzer cleared." }
    });
  }

  if (action.type === "endGame") {
    requireOrganizer(room, action.organizerPassword);
    await prisma.buzzerRoom.update({
      where: { id: room.id },
      data: {
        status: BuzzerRoomStatus.ENDED,
        timerStartedAt: null,
        questionClockStartedAt: null,
        questionClockDurationMs: 0,
        questionClockElapsedMs: 0,
        buzzedSeatId: null,
        buzzedIsInterrupt: false
      }
    });
    await prisma.buzzerRoomEvent.create({
      data: { id: id("event"), roomId: room.id, type: "GAME_ENDED", message: "Game ended." }
    });
  }

  const updated = await includeRoomWithTimeout(roomCode);
  if (!updated) throw new Error("Room not found.");
  return updated;
}
