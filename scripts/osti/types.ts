export interface PdfLinkInfo {
  sourcePageUrl: string;
  sourcePdfUrl: string;
  sourceTitle: string;
  sourceSet?: string;
  sourceRound?: string;
  sampleSetNumber?: number;
  sampleSetYear?: string | null;
  roundNumber?: number | null;
}

export type QuestionKindType = "TOSSUP" | "BONUS";
export type QuestionFormatType = "SHORT_ANSWER" | "MULTIPLE_CHOICE";

export interface ParsedQuestion {
  sourcePdfUrl: string;
  sourcePageUrl: string;
  sourceSet?: string;
  sourceRound?: string;
  sampleSetNumber?: number;
  sampleSetYear?: string | null;
  roundNumber?: number | null;
  sourceQuestionNumber?: number;
  sourceTitle: string;
  questionKind: QuestionKindType;
  category: string;
  format: QuestionFormatType;
  prompt: string;
  correctAnswer: string;
  alternateAnswers: string[];
  choices?: string[];
  explanation: string;
}

export interface ParseResult {
  questions: ParsedQuestion[];
  warnings: string[];
}
