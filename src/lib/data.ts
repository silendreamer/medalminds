import { competitions } from "@/data/competitions";
import { buzzerQuestions } from "@/data/buzzerQuestions";
import { lessons } from "@/data/lessons";
import { practiceQuestions } from "@/data/practiceQuestions";
import { tests } from "@/data/tests";
import type { CompetitionSlug } from "@/types";

export function getCompetitionBySlug(slug: string) {
  return competitions.find((competition) => competition.slug === slug);
}

export function isCompetitionSlug(slug: string): slug is CompetitionSlug {
  return competitions.some((competition) => competition.slug === slug);
}

export function getQuestionsByCompetition(slug: CompetitionSlug) {
  return practiceQuestions.filter((question) => question.competitionSlug === slug);
}

export function getLessonsByCompetition(slug: CompetitionSlug) {
  return lessons.filter((lesson) => lesson.competitionSlug === slug);
}

export function getTestsByCompetition(slug: CompetitionSlug) {
  return tests.filter((test) => test.competitionSlug === slug);
}

export function getLessonBySlug(slug: CompetitionSlug, lessonSlug: string) {
  return lessons.find((lesson) => lesson.competitionSlug === slug && lesson.slug === lessonSlug);
}

export function getTestBySlug(slug: CompetitionSlug, testSlug: string) {
  return tests.find((test) => test.competitionSlug === slug && test.slug === testSlug);
}

export function getQuestionsForTest(questionIds: string[]) {
  return questionIds
    .map((id) => practiceQuestions.find((question) => question.id === id))
    .filter((question): question is NonNullable<typeof question> => Boolean(question));
}

export function getContentCounts(slug: CompetitionSlug) {
  return {
    questions: getQuestionsByCompetition(slug).length,
    lessons: getLessonsByCompetition(slug).length,
    tests: getTestsByCompetition(slug).length
  };
}

export function getBuzzerQuestions() {
  return buzzerQuestions;
}

export { buzzerQuestions, competitions, lessons, practiceQuestions, tests };
