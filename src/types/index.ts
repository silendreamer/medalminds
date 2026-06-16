export type CompetitionSlug = "science-bowl" | "science-olympiad" | "math-olympiad";

export type QuestionType = "multiple_choice" | "short_answer";

export interface Competition {
  slug: CompetitionSlug;
  name: string;
  description: string;
  shortDescription: string;
  subdomain: string;
  categories: string[];
}

export interface PracticeQuestion {
  id: string;
  competitionSlug: CompetitionSlug;
  category: string;
  level: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced";
  type: QuestionType;
  prompt: string;
  choices?: string[];
  correctAnswer: string;
  alternateAnswers?: string[];
  explanation: string;
}

export interface Lesson {
  id: string;
  slug: string;
  competitionSlug: CompetitionSlug;
  title: string;
  category: string;
  level: string;
  estimatedMinutes: number;
  summary: string;
  keyConcepts: string[];
  contentSections: Array<{
    heading: string;
    body: string;
  }>;
  reviewQuestions: string[];
}

export interface Test {
  id: string;
  slug: string;
  competitionSlug: CompetitionSlug;
  title: string;
  level: string;
  categories: string[];
  timeLimitMinutes: number;
  description: string;
  questionIds: string[];
}

export interface CurriculumTopic {
  id: string;
  title: string;
  sortOrder: number;
}

export interface CurriculumUnit {
  id: string;
  title: string;
  sortOrder: number;
  topics: CurriculumTopic[];
}

export interface CurriculumGrade {
  id: string;
  key: string;
  label: string;
  sortOrder: number;
  units: CurriculumUnit[];
}

export interface CurriculumSubject {
  id: string;
  slug: string;
  competitionSlug: CompetitionSlug;
  levelId?: string;
  name: string;
  shortDescription: string;
  whyItMatters: string;
  highYieldTopics: string[];
  sources: string[];
  sortOrder: number;
  grades: CurriculumGrade[];
}
