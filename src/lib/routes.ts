import type { CompetitionSlug } from "@/types";

export const competitionPath = (slug: CompetitionSlug) => `/${slug}`;
export const competitionLevelPath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}`;

// Level-aware section paths — level is a URL path segment (e.g. "middle-school", "high-school", "grade-5")
export const practicePath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}/practice`;
export const practiceSubjectPath = (slug: CompetitionSlug, level: string, subject: string) =>
  `/${slug}/${level}/practice/${subject.toLowerCase().replace(/[\s&]+/g, "-")}`;
export const learningPath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}/learning`;
export const testsPath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}/tests`;
export const testsSubjectPath = (slug: CompetitionSlug, level: string, subject: string) =>
  `/${slug}/${level}/tests/subject/${subject.toLowerCase().replace(/[\s&]+/g, "-")}`;
export const testPath = (slug: CompetitionSlug, level: string, testSlug: string) =>
  `/${slug}/${level}/tests/${testSlug}`;
export const lessonPath = (slug: CompetitionSlug, level: string, lessonSlug: string) =>
  `/${slug}/${level}/learning/${lessonSlug}`;
export const subjectCoursePath = (slug: CompetitionSlug, level: string, subjectSlug: string) =>
  `/${slug}/${level}/learning/subject/${subjectSlug}`;

export const buzzerPath = () => "/science-bowl/buzzer";
export const scienceBowlInfoPath = () => "/science-bowl/info-session";
