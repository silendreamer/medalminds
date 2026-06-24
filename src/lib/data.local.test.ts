import { describe, expect, it } from "vitest";
import {
  getCompetitionBySlug,
  getCompetitions,
  getContentCounts,
  getLessonBySlug,
  getLessonsByCompetition,
  getQuestionsByCompetition,
  getRandomMultipleChoiceQuestions,
  getRandomQuestionByCompetition,
  getTestBySlug,
  getTestsByCompetition,
  isCompetitionSlug,
  lessons as localLessons,
  practiceQuestions as localPracticeQuestions
} from "./data";

// These tests pin the behaviour of the local-data (no-database) path of the
// content readers. They are the safety net for the caching refactor (Phase 1),
// which wraps these same readers — the contract they verify must not change.
// test/setup.ts clears all DB env vars so `hasDatabaseUrl` is false here.

describe("isCompetitionSlug", () => {
  it("accepts known slugs and rejects unknown ones", () => {
    expect(isCompetitionSlug("science-bowl")).toBe(true);
    expect(isCompetitionSlug("science-olympiad")).toBe(true);
    expect(isCompetitionSlug("not-a-competition")).toBe(false);
  });
});

describe("getCompetitions / getCompetitionBySlug", () => {
  it("returns all competitions", async () => {
    const competitions = await getCompetitions();
    expect(competitions.length).toBeGreaterThanOrEqual(3);
    expect(competitions.map((c) => c.slug)).toContain("science-bowl");
  });

  it("looks a competition up by slug and returns undefined for unknown", async () => {
    expect((await getCompetitionBySlug("science-bowl"))?.slug).toBe("science-bowl");
    expect(await getCompetitionBySlug("nope")).toBeUndefined();
  });
});

describe("getQuestionsByCompetition", () => {
  it("returns only questions for the requested competition", async () => {
    const questions = await getQuestionsByCompetition("science-bowl");
    const expected = localPracticeQuestions.filter((q) => q.competitionSlug === "science-bowl").length;
    expect(questions.length).toBe(expected);
    expect(questions.every((q) => q.competitionSlug === "science-bowl")).toBe(true);
  });
});

describe("getRandomQuestionByCompetition", () => {
  it("returns a question belonging to the competition", async () => {
    const question = await getRandomQuestionByCompetition("science-bowl");
    expect(question?.competitionSlug).toBe("science-bowl");
  });

  it("respects a subject filter", async () => {
    const question = await getRandomQuestionByCompetition("science-bowl", "Biology");
    if (question) expect(question.category).toBe("Biology");
  });
});

describe("getRandomMultipleChoiceQuestions", () => {
  it("returns only multiple-choice questions, capped at the requested count", async () => {
    const result = await getRandomMultipleChoiceQuestions("science-bowl", null, 5);
    expect(result.length).toBeLessThanOrEqual(5);
    expect(result.every((q) => q.type === "multiple_choice")).toBe(true);
    expect(result.every((q) => q.competitionSlug === "science-bowl")).toBe(true);
  });
});

describe("getLessonsByCompetition subject aliasing", () => {
  it("treats 'Life Science' as an alias of 'Biology'", async () => {
    const biology = await getLessonsByCompetition("science-bowl", "Biology");
    const lifeScience = await getLessonsByCompetition("science-bowl", "Life Science");
    expect(biology.length).toBeGreaterThan(0);
    expect(lifeScience.map((l) => l.id).sort()).toEqual(biology.map((l) => l.id).sort());
  });
});

describe("getContentCounts", () => {
  it("matches the underlying local data", async () => {
    const counts = await getContentCounts("science-bowl");
    expect(counts.questions).toBe(localPracticeQuestions.filter((q) => q.competitionSlug === "science-bowl").length);
    expect(counts.lessons).toBe(localLessons.filter((l) => l.competitionSlug === "science-bowl").length);
  });
});

describe("by-slug readers round-trip the list readers", () => {
  it("getLessonBySlug finds a lesson returned by getLessonsByCompetition", async () => {
    const [lesson] = await getLessonsByCompetition("science-bowl");
    expect(lesson).toBeDefined();
    expect((await getLessonBySlug("science-bowl", lesson.slug))?.slug).toBe(lesson.slug);
  });

  it("getTestBySlug finds a test returned by getTestsByCompetition", async () => {
    const [test] = await getTestsByCompetition("science-bowl");
    expect(test).toBeDefined();
    expect((await getTestBySlug("science-bowl", test.slug))?.slug).toBe(test.slug);
  });
});
