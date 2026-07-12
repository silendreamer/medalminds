import type { CompetitionSlug } from "@/types";
import { slugifySubject } from "@/lib/subjects";

export const competitionPath = (slug: CompetitionSlug) => `/${slug}`;
export const competitionLevelPath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}`;

// Level-aware section paths — level is a URL path segment (e.g. "middle-school", "high-school", "grade-5")
export const practicePath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}/practice`;
export const practiceSubjectPath = (slug: CompetitionSlug, level: string, subject: string) =>
  `/${slug}/${level}/practice/${slugifySubject(subject)}`;
export const learningPath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}/learning`;
export const testsPath = (slug: CompetitionSlug, level: string) => `/${slug}/${level}/tests`;
export const testsSubjectPath = (slug: CompetitionSlug, level: string, subject: string) =>
  `/${slug}/${level}/tests/subject/${slugifySubject(subject)}`;
export const lessonPath = (slug: CompetitionSlug, level: string, lessonSlug: string) =>
  `/${slug}/${level}/learning/${lessonSlug}`;
export const subjectCoursePath = (slug: CompetitionSlug, level: string, subjectSlug: string) =>
  `/${slug}/${level}/learning/subject/${subjectSlug}`;

export const buzzerPath = () => "/science-bowl/buzzer";
export const scienceBowlInfoPath = () => "/science-bowl/info-session";
