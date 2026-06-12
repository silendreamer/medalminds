import { createHash } from "node:crypto";
import { Difficulty, QuestionFormat, QuestionKind, SchoolLevel } from "@prisma/client";
import { getPrisma } from "../../src/lib/db";
import type { PdfLinkInfo, ParsedQuestion } from "./types";

export const SOURCE_PROVIDER = "U.S. DOE Office of Science / National Science Bowl";
export const DEFAULT_COMPETITION_SLUG = "science-bowl";
export const DEFAULT_COMPETITION_LEVEL_ID = "science-bowl-middle-school";

export interface ImportStats {
  questionsParsed: number;
  questionsInserted: number;
  questionsSkipped: number;
  answersInserted: number;
}

export function computeSourceHash(parsed: ParsedQuestion): string {
  const normalizedPrompt = parsed.prompt.trim().replace(/\s+/g, " ").toLowerCase();
  const sourceQuestionNumber = parsed.sourceQuestionNumber ?? 0;
  return createHash("sha256")
    .update(`${parsed.sourcePdfUrl}|${parsed.questionKind}|${sourceQuestionNumber}|${normalizedPrompt}`)
    .digest("hex");
}

export async function ensureScienceBowlCompetition(): Promise<{ competitionId: string; levelId?: string }> {
  const prisma = getPrisma();

  await prisma.competition.upsert({
    where: { slug: DEFAULT_COMPETITION_SLUG },
    update: {
      name: "Science Bowl",
      description: "Science Bowl competition preparation and sample questions.",
      shortDescription: "Science Bowl practice questions.",
      subdomain: DEFAULT_COMPETITION_SLUG,
      categories: ["Science"]
    },
    create: {
      id: DEFAULT_COMPETITION_SLUG,
      slug: DEFAULT_COMPETITION_SLUG,
      name: "Science Bowl",
      description: "Science Bowl competition preparation and sample questions.",
      shortDescription: "Science Bowl practice questions.",
      subdomain: DEFAULT_COMPETITION_SLUG,
      categories: ["Science"]
    }
  });

  const level = await prisma.competitionLevel.upsert({
    where: {
      competitionId_slug: {
        competitionId: DEFAULT_COMPETITION_SLUG,
        slug: "middle-school"
      }
    },
    update: {
      id: DEFAULT_COMPETITION_LEVEL_ID,
      name: "Middle School",
      description: "Middle School Science Bowl preparation.",
      schoolLevel: SchoolLevel.MIDDLE_SCHOOL,
      sortOrder: 10
    },
    create: {
      id: DEFAULT_COMPETITION_LEVEL_ID,
      competitionId: DEFAULT_COMPETITION_SLUG,
      slug: "middle-school",
      name: "Middle School",
      description: "Middle School Science Bowl preparation.",
      schoolLevel: SchoolLevel.MIDDLE_SCHOOL,
      sortOrder: 10
    }
  });

  return { competitionId: DEFAULT_COMPETITION_SLUG, levelId: level.id };
}

function mapQuestionKind(kind: ParsedQuestion["questionKind"]): QuestionKind {
  return kind === "BONUS" ? QuestionKind.BONUS : QuestionKind.TOSSUP;
}

function mapQuestionFormat(format: ParsedQuestion["format"]): QuestionFormat {
  return format === "MULTIPLE_CHOICE" ? QuestionFormat.MULTIPLE_CHOICE : QuestionFormat.SHORT_ANSWER;
}

function buildAnswerRows(questionId: string, parsed: ParsedQuestion) {
  const answers: Array<{ id: string; questionId: string; text: string; isCorrect: boolean; position: number }> = [];
  const normalize = (value: string) => value.trim();

  if (parsed.format === "SHORT_ANSWER") {
    const values = [parsed.correctAnswer, ...parsed.alternateAnswers].map(normalize).filter(Boolean);
    const unique = Array.from(new Set(values));
    unique.forEach((text, index) => {
      answers.push({
        id: `${questionId}-answer-${index + 1}`,
        questionId,
        text,
        isCorrect: true,
        position: index + 1
      });
    });
    return answers;
  }

  const letterOrder = ["W", "X", "Y", "Z"];
  const choices = parsed.choices ?? [];
  choices.forEach((text, index) => {
    answers.push({
      id: `${questionId}-answer-${index + 1}`,
      questionId,
      text: normalize(text),
      isCorrect: normalize(text) === normalize(parsed.correctAnswer),
      position: index + 1
    });
  });

  return answers;
}

export async function upsertParsedQuestion(parsed: ParsedQuestion, sourcePageUrl: string): Promise<{ inserted: boolean; answersInserted: number; skipped: boolean }> {
  const prisma = getPrisma();
  const sourceHash = computeSourceHash(parsed);
  const questionId = `osti-${sourceHash}`;
  const competitionLevelId = DEFAULT_COMPETITION_LEVEL_ID;

  const questionData = {
    id: questionId,
    competitionId: DEFAULT_COMPETITION_SLUG,
    levelId: competitionLevelId,
    category: parsed.category,
    level: "Middle School",
    difficulty: Difficulty.INTERMEDIATE,
    format: mapQuestionFormat(parsed.format),
    questionKind: mapQuestionKind(parsed.questionKind),
    schoolLevel: SchoolLevel.MIDDLE_SCHOOL,
    sourceProvider: SOURCE_PROVIDER,
    sourcePageUrl,
    sourcePdfUrl: parsed.sourcePdfUrl,
    sourceSet: parsed.sourceSet,
    sourceRound: parsed.sourceRound,
    sourceQuestionNumber: parsed.sourceQuestionNumber,
    sourceHash,
    prompt: parsed.prompt,
    choices: parsed.choices ?? undefined,
    correctAnswer: parsed.correctAnswer,
    alternateAnswers: parsed.alternateAnswers ?? [],
    explanation: parsed.explanation || ""
  };

  const existingQuestion = await prisma.question.findUnique({ where: { sourceHash } });
  const answers = buildAnswerRows(questionId, parsed);

  if (existingQuestion) {
    await prisma.answer.deleteMany({ where: { questionId } });
    const updateData = { ...questionData };
    delete (updateData as { id?: string }).id;
    await prisma.question.update({ where: { sourceHash }, data: updateData });
    await prisma.answer.createMany({ data: answers });
    return { inserted: false, answersInserted: answers.length, skipped: true };
  }

  await prisma.question.create({ data: questionData });
  await prisma.answer.createMany({ data: answers });
  return { inserted: true, answersInserted: answers.length, skipped: false };
}

export async function importPdfQuestions(
  parsedQuestions: ParsedQuestion[],
  sourcePageUrl: string
): Promise<ImportStats> {
  const { competitionId } = await ensureScienceBowlCompetition();
  const stats: ImportStats = { questionsParsed: parsedQuestions.length, questionsInserted: 0, questionsSkipped: 0, answersInserted: 0 };

  for (const parsed of parsedQuestions) {
    const result = await upsertParsedQuestion(parsed, sourcePageUrl);
    if (result.inserted) {
      stats.questionsInserted += 1;
      stats.answersInserted += result.answersInserted;
    } else if (result.skipped) {
      stats.questionsSkipped += 1;
    } else {
      stats.questionsInserted += 0;
      stats.answersInserted += result.answersInserted;
    }
  }

  return stats;
}
