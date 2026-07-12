import { describe, expect, it } from "vitest";
import { normalizeAnswer, isAnswerCorrect } from "./grading";

describe("normalizeAnswer", () => {
  it("trims leading/trailing whitespace", () => {
    expect(normalizeAnswer("  hello  ")).toBe("hello");
  });

  it("lowercases", () => {
    expect(normalizeAnswer("PHOTOSYNTHESIS")).toBe("photosynthesis");
  });

  it("collapses internal whitespace", () => {
    expect(normalizeAnswer("kinetic  energy")).toBe("kinetic energy");
  });

  it("handles mixed whitespace and casing", () => {
    expect(normalizeAnswer("  Kinetic   Energy  ")).toBe("kinetic energy");
  });
});

describe("isAnswerCorrect", () => {
  const question = {
    correctAnswer: "Photosynthesis",
    alternateAnswers: ["photo synthesis", "light reaction"],
  };

  it("accepts the correct answer (case-insensitive)", () => {
    expect(isAnswerCorrect(question, "photosynthesis")).toBe(true);
    expect(isAnswerCorrect(question, "PHOTOSYNTHESIS")).toBe(true);
  });

  it("accepts alternateAnswers", () => {
    expect(isAnswerCorrect(question, "photo synthesis")).toBe(true);
    expect(isAnswerCorrect(question, "Light Reaction")).toBe(true);
  });

  it("rejects wrong answer", () => {
    expect(isAnswerCorrect(question, "cellular respiration")).toBe(false);
  });

  it("rejects empty answer", () => {
    expect(isAnswerCorrect(question, "")).toBe(false);
  });

  it("works without alternateAnswers", () => {
    const q = { correctAnswer: "ATP" };
    expect(isAnswerCorrect(q, "atp")).toBe(true);
    expect(isAnswerCorrect(q, "ADP")).toBe(false);
  });

  it("whitespace-normalizes before comparing", () => {
    expect(isAnswerCorrect(question, "  photosynthesis  ")).toBe(true);
    expect(isAnswerCorrect({ correctAnswer: "kinetic energy" }, "kinetic  energy")).toBe(true);
  });
});
