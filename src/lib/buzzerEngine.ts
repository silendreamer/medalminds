export type BuzzerMode = "solo" | "teams";
export type BuzzerTeam = "A" | "B";
export type BuzzerPhase = "idle" | "question" | "buzzed" | "judging" | "bonus" | "complete";
export type BuzzerTossupMark = "correct" | "incorrect" | null;
export type BuzzerBonusMark = "correct" | "incorrect" | null;

export type BuzzerEventType =
  | "start-question"
  | "solo-buzz"
  | "solo-answer"
  | "team-buzz"
  | "tossup-correct"
  | "tossup-incorrect"
  | "bonus-correct"
  | "bonus-incorrect"
  | "next-question"
  | "reset-round"
  | "mode-change";

export interface BuzzerEvent {
  id: string;
  type: BuzzerEventType;
  label: string;
  detail: string;
  elapsedMs: number;
}

export interface BuzzerTeamScores {
  A: number;
  B: number;
}

export interface BuzzerState {
  mode: BuzzerMode;
  index: number;
  phase: BuzzerPhase;
  timerRunning: boolean;
  timerStartedAtMs: number | null;
  elapsedMs: number;
  started: boolean;
  soloBuzzed: boolean;
  soloAnswer: string;
  soloResult: "correct" | "incorrect" | null;
  buzzedTeam: BuzzerTeam | null;
  tossupMarked: BuzzerTossupMark;
  bonusMarked: BuzzerBonusMark;
  teamScores: BuzzerTeamScores;
  sessionLog: BuzzerEvent[];
}

export type BuzzerAction =
  | { type: "set_mode"; mode: BuzzerMode; nowMs: number }
  | { type: "start_question"; nowMs: number }
  | { type: "solo_buzz"; nowMs: number }
  | { type: "set_solo_answer"; answer: string }
  | { type: "submit_solo_answer"; isCorrect: boolean; nowMs: number }
  | { type: "team_buzz"; team: BuzzerTeam; nowMs: number }
  | { type: "mark_tossup"; result: "correct" | "incorrect"; nowMs: number }
  | { type: "mark_bonus"; result: "correct" | "incorrect"; nowMs: number }
  | { type: "tick"; nowMs: number }
  | { type: "next_question"; nowMs: number }
  | { type: "reset_round"; nowMs: number };

function newEvent(
  type: BuzzerEventType,
  elapsedMs: number,
  label: string,
  detail: string,
  idSeed: number
): BuzzerEvent {
  return {
    id: `${type}-${idSeed}-${Math.round(elapsedMs)}`,
    type,
    label,
    detail,
    elapsedMs
  };
}

function appendEvent(
  state: BuzzerState,
  event: Omit<BuzzerEvent, "id">,
  idSeed: number
): BuzzerState {
  const logEntry = newEvent(event.type, event.elapsedMs, event.label, event.detail, idSeed);
  return {
    ...state,
    sessionLog: [logEntry, ...state.sessionLog].slice(0, 24)
  };
}

function resetRoundState(nextMode: BuzzerMode, nowMs: number, index = 0): BuzzerState {
  return {
    mode: nextMode,
    index,
    phase: "idle",
    timerRunning: false,
    timerStartedAtMs: null,
    elapsedMs: 0,
    started: false,
    soloBuzzed: false,
    soloAnswer: "",
    soloResult: null,
    buzzedTeam: null,
    tossupMarked: null,
    bonusMarked: null,
    teamScores: { A: 0, B: 0 },
    sessionLog: [
      newEvent("reset-round", 0, "Round reset", "The buzzer round was reset.", nowMs)
    ]
  };
}

export function createInitialBuzzerState(nowMs = Date.now()): BuzzerState {
  return resetRoundState("teams", nowMs, 0);
}

export function formatBuzzerElapsed(ms: number) {
  const totalTenths = Math.max(0, Math.round(ms / 100));
  const seconds = Math.floor(totalTenths / 10);
  const tenths = totalTenths % 10;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}.${tenths}`;
  }

  return `${remainingSeconds}.${tenths}s`;
}

export function getPhaseLabel(state: BuzzerState) {
  if (!state.started) return "Ready";
  if (state.mode === "solo" && state.soloBuzzed && !state.soloResult) return "Awaiting answer";
  if (state.mode === "teams" && state.buzzedTeam && !state.tossupMarked) return "Moderator judging";
  if (state.mode === "teams" && state.tossupMarked === "correct" && !state.bonusMarked) return "Bonus in play";
  if (state.phase === "complete") return "Review";
  return "Live";
}

export function buzzerReducer(state: BuzzerState, action: BuzzerAction): BuzzerState {
  const seed = Date.now();

  switch (action.type) {
    case "set_mode": {
      return {
        ...resetRoundState(action.mode, action.nowMs, 0),
        mode: action.mode,
        sessionLog: [
          newEvent("mode-change", 0, `Mode changed to ${action.mode === "solo" ? "solo practice" : "two-team local"}`, "The arena switched modes.", seed)
        ]
      };
    }

    case "start_question": {
      if (state.started) return state;
      const nextState: BuzzerState = {
        ...state,
        started: true,
        phase: "question",
        timerRunning: true,
        timerStartedAtMs: action.nowMs,
        elapsedMs: 0,
        soloBuzzed: false,
        soloAnswer: "",
        soloResult: null,
        buzzedTeam: null,
        tossupMarked: null,
        bonusMarked: null
      };
      return appendEvent(
        nextState,
        {
          type: "start-question",
          elapsedMs: 0,
          label: "Question started",
          detail: "The toss-up has been revealed and the clock is running."
        },
        seed
      );
    }

    case "solo_buzz": {
      if (state.mode !== "solo" || !state.started || state.soloBuzzed) return state;
      const elapsedMs = state.elapsedMs;
      const nextState: BuzzerState = {
        ...state,
        phase: "buzzed",
        timerRunning: false,
        timerStartedAtMs: null,
        elapsedMs,
        soloBuzzed: true
      };
      return appendEvent(
        nextState,
        {
          type: "solo-buzz",
          elapsedMs,
          label: "Solo buzz",
          detail: `The buzzer was pressed at ${formatBuzzerElapsed(elapsedMs)}.`
        },
        seed
      );
    }

    case "set_solo_answer":
      return { ...state, soloAnswer: action.answer };

    case "submit_solo_answer": {
      if (state.mode !== "solo" || !state.soloBuzzed || state.soloResult) return state;
      const result = action.isCorrect ? "correct" : "incorrect";
      const nextState: BuzzerState = {
        ...state,
        phase: "complete",
        timerRunning: false,
        timerStartedAtMs: null,
        soloResult: result
      };
      return appendEvent(
        nextState,
        {
          type: "solo-answer",
          elapsedMs: state.elapsedMs,
          label: `Solo answer marked ${result}`,
          detail: `The submitted answer was judged ${result}.`
        },
        seed
      );
    }

    case "team_buzz": {
      if (state.mode !== "teams" || !state.started || state.buzzedTeam || state.phase === "complete") return state;
      const nextState: BuzzerState = {
        ...state,
        phase: "judging",
        timerRunning: false,
        timerStartedAtMs: null,
        buzzedTeam: action.team
      };
      return appendEvent(
        nextState,
        {
          type: "team-buzz",
          elapsedMs: state.elapsedMs,
          label: `Team ${action.team} buzzed`,
          detail: `Team ${action.team} locked out the round at ${formatBuzzerElapsed(state.elapsedMs)}.`
        },
        seed
      );
    }

    case "mark_tossup": {
      if (state.mode !== "teams" || !state.buzzedTeam || state.tossupMarked) return state;
      const nextScores =
        action.result === "correct" && state.buzzedTeam
          ? { ...state.teamScores, [state.buzzedTeam]: state.teamScores[state.buzzedTeam] + 4 }
          : state.teamScores;
      const nextPhase = action.result === "correct" ? "bonus" : "complete";
      const nextState: BuzzerState = {
        ...state,
        phase: nextPhase,
        teamScores: nextScores,
        tossupMarked: action.result,
        bonusMarked: action.result === "correct" ? null : state.bonusMarked
      };
      return appendEvent(
        nextState,
        {
          type: action.result === "correct" ? "tossup-correct" : "tossup-incorrect",
          elapsedMs: state.elapsedMs,
          label: `Toss-up ${action.result}`,
          detail:
            action.result === "correct"
              ? `Team ${state.buzzedTeam} earned 4 points.`
              : `No points were awarded on the toss-up.`
        },
        seed
      );
    }

    case "mark_bonus": {
      if (state.mode !== "teams" || state.tossupMarked !== "correct" || state.bonusMarked) return state;
      const nextScores =
        action.result === "correct" && state.buzzedTeam
          ? { ...state.teamScores, [state.buzzedTeam]: state.teamScores[state.buzzedTeam] + 10 }
          : state.teamScores;
      const nextState: BuzzerState = {
        ...state,
        phase: "complete",
        teamScores: nextScores,
        bonusMarked: action.result
      };
      return appendEvent(
        nextState,
        {
          type: action.result === "correct" ? "bonus-correct" : "bonus-incorrect",
          elapsedMs: state.elapsedMs,
          label: `Bonus ${action.result}`,
          detail:
            action.result === "correct"
              ? `Team ${state.buzzedTeam} earned 10 bonus points.`
              : "The bonus was marked incorrect."
        },
        seed
      );
    }

    case "tick": {
      if (!state.timerRunning || state.timerStartedAtMs === null) return state;
      const elapsedMs = Math.max(0, action.nowMs - state.timerStartedAtMs);
      return { ...state, elapsedMs };
    }

    case "next_question": {
      const nextIndex = state.index + 1;
      const nextState: BuzzerState = {
        ...state,
        index: nextIndex,
        phase: "idle",
        started: false,
        timerRunning: false,
        timerStartedAtMs: null,
        elapsedMs: 0,
        soloBuzzed: false,
        soloAnswer: "",
        soloResult: null,
        buzzedTeam: null,
        tossupMarked: null,
        bonusMarked: null
      };
      return appendEvent(
        nextState,
        {
          type: "next-question",
          elapsedMs: 0,
          label: "Next question",
          detail: "Moved to the next practice question."
        },
        seed
      );
    }

    case "reset_round":
      return resetRoundState(state.mode, action.nowMs, 0);

    default:
      return state;
  }
}
