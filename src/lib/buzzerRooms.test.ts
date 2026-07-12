import { describe, expect, it } from "vitest";
import {
  clampInteger,
  clampText,
  effectiveStatus,
  formatSeatLabel,
  isBonus,
  questionClockDurationFor,
  questionClockRemaining,
  resumeStatus,
  timeRemaining
} from "./buzzerRooms";

// RoomWithRelations is a Prisma-generated type; we construct minimal shapes and
// cast to avoid requiring a live DB connection.  test/setup.ts clears all DB env
// vars so getPrisma() is never called at module load.

type MinRoom = {
  status: string;
  timerDurationMs: number;
  timerElapsedMs: number;
  timerStartedAt: Date | null;
  questionClockDurationMs: number;
  questionClockElapsedMs: number;
  questionClockStartedAt: Date | null;
  buzzedSeatId: string | null;
  buzzedIsInterrupt: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function room(overrides: Partial<MinRoom> = {}): any {
  return {
    status: "READING",
    timerDurationMs: 10_000,
    timerElapsedMs: 0,
    timerStartedAt: null,
    questionClockDurationMs: 0,
    questionClockElapsedMs: 0,
    questionClockStartedAt: null,
    buzzedSeatId: null,
    buzzedIsInterrupt: false,
    ...overrides
  };
}

// ---------------------------------------------------------------------------
// clampInteger
// ---------------------------------------------------------------------------
describe("clampInteger", () => {
  it("returns fallback for NaN input", () => {
    expect(clampInteger("abc", 5, 1, 10)).toBe(5);
  });

  it("returns fallback for undefined input", () => {
    expect(clampInteger(undefined, 7, 1, 20)).toBe(7);
  });

  it("returns fallback for Infinity", () => {
    expect(clampInteger(Infinity, 3, 1, 10)).toBe(3);
  });

  it("clamps to min when value is too low", () => {
    expect(clampInteger(0, 5, 1, 10)).toBe(1);
  });

  it("clamps to max when value is too high", () => {
    expect(clampInteger(100, 5, 1, 10)).toBe(10);
  });

  it("passes through a value within bounds", () => {
    expect(clampInteger(7, 5, 1, 10)).toBe(7);
  });

  it("truncates floats (does not round)", () => {
    expect(clampInteger(3.9, 5, 1, 10)).toBe(3);
  });

  it("accepts numeric strings", () => {
    expect(clampInteger("8", 5, 1, 10)).toBe(8);
  });
});

// ---------------------------------------------------------------------------
// clampText
// ---------------------------------------------------------------------------
describe("clampText", () => {
  it("returns fallback when value is empty string", () => {
    expect(clampText("", "default")).toBe("default");
  });

  it("returns fallback when value is only whitespace", () => {
    expect(clampText("   ", "default")).toBe("default");
  });

  it("trims leading/trailing whitespace", () => {
    expect(clampText("  hello  ", "default")).toBe("hello");
  });

  it("slices to maxLength after trimming", () => {
    expect(clampText("abcdefghij", "default", 5)).toBe("abcde");
  });

  it("uses default maxLength of 24", () => {
    const longString = "a".repeat(30);
    expect(clampText(longString, "default")).toBe("a".repeat(24));
  });

  it("returns the value when it fits within maxLength", () => {
    expect(clampText("hi", "default", 5)).toBe("hi");
  });

  it("handles undefined by returning fallback", () => {
    expect(clampText(undefined, "fallback")).toBe("fallback");
  });
});

// ---------------------------------------------------------------------------
// formatSeatLabel
// ---------------------------------------------------------------------------
describe("formatSeatLabel", () => {
  it("maps a1 -> A1", () => expect(formatSeatLabel("a1")).toBe("A1"));
  it("maps a2 -> AC", () => expect(formatSeatLabel("a2")).toBe("AC"));
  it("maps a3 -> A2", () => expect(formatSeatLabel("a3")).toBe("A2"));
  it("maps a4 -> A3", () => expect(formatSeatLabel("a4")).toBe("A3"));
  it("maps b1 -> B1", () => expect(formatSeatLabel("b1")).toBe("B1"));
  it("maps b2 -> BC", () => expect(formatSeatLabel("b2")).toBe("BC"));
  it("maps b3 -> B2", () => expect(formatSeatLabel("b3")).toBe("B2"));
  it("maps b4 -> B3", () => expect(formatSeatLabel("b4")).toBe("B3"));
  it("uppercases unknown slots", () => expect(formatSeatLabel("c5")).toBe("C5"));
  it("is case-insensitive for known slots", () => expect(formatSeatLabel("A1")).toBe("A1"));
  it("trims before matching", () => expect(formatSeatLabel(" a2 ")).toBe("AC"));
});

// ---------------------------------------------------------------------------
// questionClockDurationFor
// ---------------------------------------------------------------------------
describe("questionClockDurationFor", () => {
  it("returns 20000ms for bonus questions", () => {
    expect(questionClockDurationFor(true)).toBe(20_000);
  });

  it("returns 5000ms for tossup questions", () => {
    expect(questionClockDurationFor(false)).toBe(5_000);
  });
});

// ---------------------------------------------------------------------------
// timeRemaining
// ---------------------------------------------------------------------------
describe("timeRemaining", () => {
  it("returns duration minus elapsedMs when PAUSED (no live clock)", () => {
    const r = room({ status: "PAUSED", timerDurationMs: 10_000, timerElapsedMs: 3_000 });
    expect(timeRemaining(r)).toBe(7_000);
  });

  it("returns duration minus elapsedMs when timerStartedAt is null", () => {
    const r = room({ timerDurationMs: 10_000, timerElapsedMs: 4_000, timerStartedAt: null });
    expect(timeRemaining(r)).toBe(6_000);
  });

  it("subtracts live wall-clock time when timerStartedAt is set", () => {
    const startedAt = new Date(Date.now() - 3_000); // 3 seconds ago
    const r = room({ timerDurationMs: 10_000, timerElapsedMs: 0, timerStartedAt: startedAt });
    const result = timeRemaining(r);
    // Should be close to 7000 but allow 500ms of wall-clock drift
    expect(result).toBeGreaterThanOrEqual(6_000);
    expect(result).toBeLessThanOrEqual(8_000);
  });

  it("clamps to 0 when timer has expired", () => {
    const startedAt = new Date(Date.now() - 20_000); // well past the 10s timer
    const r = room({ timerDurationMs: 10_000, timerElapsedMs: 0, timerStartedAt: startedAt });
    expect(timeRemaining(r)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// questionClockRemaining
// ---------------------------------------------------------------------------
describe("questionClockRemaining", () => {
  it("returns 0 when questionClockDurationMs is 0", () => {
    const r = room({ questionClockDurationMs: 0 });
    expect(questionClockRemaining(r)).toBe(0);
  });

  it("returns duration minus elapsed when questionClockStartedAt is null", () => {
    const r = room({ questionClockDurationMs: 5_000, questionClockElapsedMs: 2_000, questionClockStartedAt: null });
    expect(questionClockRemaining(r)).toBe(3_000);
  });

  it("subtracts live clock time when questionClockStartedAt is set", () => {
    const startedAt = new Date(Date.now() - 1_000); // 1 second ago
    const r = room({ questionClockDurationMs: 5_000, questionClockElapsedMs: 0, questionClockStartedAt: startedAt });
    const result = questionClockRemaining(r);
    expect(result).toBeGreaterThanOrEqual(3_500);
    expect(result).toBeLessThanOrEqual(4_500);
  });

  it("clamps to 0 when the question clock has expired", () => {
    const startedAt = new Date(Date.now() - 10_000); // well past 5s duration
    const r = room({ questionClockDurationMs: 5_000, questionClockElapsedMs: 0, questionClockStartedAt: startedAt });
    expect(questionClockRemaining(r)).toBe(0);
  });

  it("PAUSED: uses elapsed snapshot, not live clock", () => {
    // When status is PAUSED the questionClock was frozen; elapsed captures the pause point.
    // With startedAt null (clock already paused/null'd) it returns duration - elapsed.
    const r = room({
      status: "PAUSED",
      questionClockDurationMs: 5_000,
      questionClockElapsedMs: 2_000,
      questionClockStartedAt: null
    });
    expect(questionClockRemaining(r)).toBe(3_000);
  });
});

// ---------------------------------------------------------------------------
// effectiveStatus
// ---------------------------------------------------------------------------
describe("effectiveStatus", () => {
  it("ENDED stays ENDED regardless of clocks", () => {
    const r = room({ status: "ENDED" });
    expect(effectiveStatus(r)).toBe("ENDED");
  });

  it("returns TIMEOUT when question clock is past duration and not PAUSED", () => {
    const pastStart = new Date(Date.now() - 10_000);
    const r = room({
      status: "RUNNING",
      questionClockDurationMs: 5_000,
      questionClockElapsedMs: 0,
      questionClockStartedAt: pastStart,
      timerDurationMs: 60_000,
      timerElapsedMs: 0,
      timerStartedAt: new Date(Date.now() - 1_000) // still running
    });
    expect(effectiveStatus(r)).toBe("TIMEOUT");
  });

  it("preserves PAUSED even when question clock elapsed time would appear expired", () => {
    // When status is PAUSED the questionClockStartedAt should be null (paused),
    // so no TIMEOUT fires — effectiveStatus returns the stored status.
    const r = room({
      status: "PAUSED",
      questionClockDurationMs: 5_000,
      questionClockElapsedMs: 6_000, // more than duration, but clock is null
      questionClockStartedAt: null
    });
    expect(effectiveStatus(r)).toBe("PAUSED");
  });

  it("returns the raw status when no timers have expired", () => {
    const r = room({ status: "READING", timerDurationMs: 60_000, timerElapsedMs: 0, timerStartedAt: null });
    expect(effectiveStatus(r)).toBe("READING");
  });

  it("returns TIMEOUT when the round timer has expired (no question clock active)", () => {
    const pastStart = new Date(Date.now() - 70_000); // 70s into a 60s timer
    const r = room({
      status: "READING",
      timerDurationMs: 60_000,
      timerElapsedMs: 0,
      timerStartedAt: pastStart,
      questionClockDurationMs: 0,
      questionClockStartedAt: null
    });
    expect(effectiveStatus(r)).toBe("TIMEOUT");
  });
});

// ---------------------------------------------------------------------------
// isBonus
// ---------------------------------------------------------------------------
describe("isBonus", () => {
  it("returns true when status is BONUS", () => {
    expect(isBonus(room({ status: "BONUS" }))).toBe(true);
  });

  it("returns false for READING status", () => {
    expect(isBonus(room({ status: "READING" }))).toBe(false);
  });

  it("returns false for BUZZED status", () => {
    expect(isBonus(room({ status: "BUZZED" }))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// resumeStatus
// ---------------------------------------------------------------------------
describe("resumeStatus", () => {
  it("returns BONUS when status is BONUS", () => {
    expect(resumeStatus(room({ status: "BONUS" }))).toBe("BONUS");
  });

  it("returns BUZZED when buzzedSeatId is set (and not BONUS)", () => {
    const r = room({ status: "PAUSED", buzzedSeatId: "seat_abc" });
    expect(resumeStatus(r)).toBe("BUZZED");
  });

  it("returns RUNNING when questionClockStartedAt is set (no buzz, not bonus)", () => {
    const r = room({ status: "PAUSED", buzzedSeatId: null, questionClockStartedAt: new Date(), questionClockDurationMs: 5_000 });
    expect(resumeStatus(r)).toBe("RUNNING");
  });

  it("returns READING when no clock is running and no buzz", () => {
    const r = room({ status: "PAUSED", buzzedSeatId: null, questionClockStartedAt: null });
    expect(resumeStatus(r)).toBe("READING");
  });
});
