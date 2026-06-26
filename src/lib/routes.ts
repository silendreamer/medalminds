import type { CompetitionSlug } from "@/types";

export const competitionPath = (slug: CompetitionSlug) => `/${slug}`;
export const practicePath = (slug: CompetitionSlug) => `/${slug}/practice`;
export const learningPath = (slug: CompetitionSlug) => `/${slug}/learning`;
export const lessonPath = (slug: CompetitionSlug, lessonSlug: string) =>
  `/${slug}/learning/${lessonSlug}`;
export const testsPath = (slug: CompetitionSlug) => `/${slug}/tests`;
export const testPath = (slug: CompetitionSlug, testSlug: string) =>
  `/${slug}/tests/${testSlug}`;
export const subjectCoursePath = (slug: CompetitionSlug, subjectSlug: string) =>
  `/${slug}/learning/subject/${subjectSlug}`;
export const buzzerPath = () => "/science-bowl/buzzer";
export const scienceBowlInfoPath = () => "/science-bowl/info-session";
