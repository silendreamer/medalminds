import pdfParse from "pdf-parse";
import { createHash } from "node:crypto";
import { ParseResult, ParsedQuestion, QuestionFormatType, QuestionKindType } from "./types";

const CATEGORY_MAP: Record<string, string> = {
  "LIFE SCIENCE": "Life Science",
  "PHYSICAL SCIENCE": "Physical Science",
  "EARTH SCIENCE": "Earth Science",
  "EARTH AND SPACE": "Earth & Space Science",
  "EARTH AND SPACE SCIENCE": "Earth & Space Science",
  "GENERAL SCIENCE": "General Science",
  MATH: "Math",
  "MAT H": "Math",
  MATHEMATICS: "Math",
  ASTRONOMY: "Astronomy",
  BIOLOGY: "Biology",
  CHEMISTRY: "Chemistry",
  PHYSICS: "Physics",
  ENERGY: "Energy"
};
const CATEGORY_HEADER_PATTERN = "EARTH AND SPACE SCIENCE|EARTH AND SPACE|LIFE SCIENCE|PHYSICAL SCIENCE|EARTH SCIENCE|GENERAL SCIENCE|MATHEMATICS|ASTRONOMY|CHEMISTRY|BIOLOGY|PHYSICS|MAT H|MATH|ENERGY";

const FORMAT_MAP: Record<string, QuestionFormatType> = {
  "SHORT ANSWER": "SHORT_ANSWER",
  "MULTIPLE CHOICE": "MULTIPLE_CHOICE"
};

function normalizeText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeCategory(rawCategory: string): string {
  const normalized = rawCategory.trim().toUpperCase();
  return CATEGORY_MAP[normalized] ?? titleCase(normalized.toLowerCase());
}

function parseAnswerLineForShortAnswer(answerLine: string): { correctAnswer: string; alternateAnswers: string[] } | null {
  const normalized = answerLine.replace(/^ANSWER\s*:\s*/i, "").trim();
  if (!normalized) return null;

  const acceptMatch = normalized.match(/^(.*?)\s*\((?:ACCEPT|Accept)\s*:\s*(.*?)\)\s*$/i);
  if (acceptMatch) {
    const primary = acceptMatch[1].trim();
    const alternateText = acceptMatch[2].trim();
    const alternates = alternateText
      .split(/[,;\/]+/)
      .map((alt) => alt.trim())
      .filter(Boolean);
    return { correctAnswer: primary, alternateAnswers: alternates };
  }

  return { correctAnswer: normalized, alternateAnswers: [] };
}

function parseMultipleChoiceAnswer(answerLine: string) {
  let letterMatch = answerLine.match(/ANSWER\s*:\s*([WXYZ])\)?/i);
  if (letterMatch) {
    return letterMatch[1].toUpperCase();
  }

  const letterSearch = answerLine.match(/\b([WXYZ])\)/i);
  return letterSearch ? letterSearch[1].toUpperCase() : null;
}

function extractBlocks(text: string): string[] {
  const normalized = normalizeText(text);
  const lines = normalized.split("\n");
  const blocks: string[] = [];
  let currentBlock: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^\s*(TOSS-UP|BONUS)\s*$/i);
    if (headingMatch) {
      if (currentBlock.length > 0) {
        blocks.push(currentBlock.join("\n"));
      }
      currentBlock = [headingMatch[1].toUpperCase()];
      continue;
    }

    if (currentBlock.length > 0) {
      currentBlock.push(line);
    }
  }

  if (currentBlock.length > 0) {
    blocks.push(currentBlock.join("\n"));
  }

  return blocks;
}

function cleanPromptLines(lines: string[]) {
  return lines.map((line) => line.trim()).filter(Boolean).join(" ").trim();
}

function parseQuestionBlock(block: string, sourcePdfUrl: string): { question?: ParsedQuestion; warning?: string } {
  const kindMatch = block.match(/^\s*(TOSS-UP|BONUS)/i);
  if (!kindMatch) {
    return { warning: `Unable to detect question kind in block for ${sourcePdfUrl}` };
  }

  const kind = (kindMatch[1].toUpperCase() === "TOSS-UP" ? "TOSSUP" : "BONUS") as QuestionKindType;
  const content = block.replace(/^\s*(TOSS-UP|BONUS)\s*/i, "").trim();
  const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) {
    return { warning: `Empty question block after ${kind} heading in ${sourcePdfUrl}` };
  }

  const headerLine = lines[0];
  const flexibleHeaderRegex = new RegExp(
    `^\\s*\\*?\\s*(\\d+)\\s*[\\).]?\\s*(${CATEGORY_HEADER_PATTERN})(?:\\s*(?:[–-]\\s*)?(?:(Short Answer|Multiple Choice)\\b\\s*)?(.*))?\\s*$`,
    "i"
  );
  const headerMatch = headerLine.match(flexibleHeaderRegex);
  let questionNumber: number | undefined;
  let rawCategory: string | undefined;
  let format: QuestionFormatType | undefined;
  let promptLines: string[] = [];

  if (headerMatch) {
    questionNumber = Number(headerMatch[1]);
    rawCategory = headerMatch[2].trim();
    format = headerMatch[3] ? FORMAT_MAP[headerMatch[3].toUpperCase()] as QuestionFormatType : undefined;
    const remainder = headerMatch[4]?.trim();
    if (remainder) {
      promptLines = [remainder, ...lines.slice(1)];
    } else {
      promptLines = lines.slice(1);
    }
  } else {
    const fallbackHeaderMatch = headerLine.match(/^\s*(\d+)\)\s*([A-Z0-9 &\/-]+?)\s*$/i);
    if (fallbackHeaderMatch && lines.length > 1) {
      questionNumber = Number(fallbackHeaderMatch[1]);
      rawCategory = fallbackHeaderMatch[2].trim();
      const secondLineMatch = lines[1].match(/^(Short Answer|Multiple Choice)\b\s*(.*)$/i);
      if (secondLineMatch) {
        format = FORMAT_MAP[secondLineMatch[1].toUpperCase()] as QuestionFormatType;
        promptLines = [secondLineMatch[2]?.trim(), ...lines.slice(2)].filter(Boolean);
      } else {
        promptLines = lines.slice(1);
      }
    }
  }

  if (!rawCategory) {
    return { warning: `Unable to detect category in question header: ${headerLine}` };
  }

  const parsedCategory = normalizeCategory(rawCategory);
  const answerIndex = promptLines.findIndex((line) => /^ANSWER\s*:/i.test(line));
  const promptText = cleanPromptLines(
    answerIndex >= 0 ? promptLines.slice(0, answerIndex) : promptLines
  );
  if (!promptText) {
    return { warning: `Missing prompt text for question ${questionNumber ?? "?"} in ${sourcePdfUrl}` };
  }

  const answerTextLines = answerIndex >= 0 ? promptLines.slice(answerIndex) : [];
  let answerLine = answerTextLines.find((line) => /^ANSWER\s*:/i.test(line)) ?? "";
  let explanationLines = answerTextLines.slice(answerTextLines.indexOf(answerLine) + 1);

  if (/^ANSWER\s*:\s*$/i.test(answerLine) && explanationLines.length > 0) {
    const blankLineIndex = explanationLines.findIndex((line) => line.trim() === "");
    const continuationLines = explanationLines.slice(0, blankLineIndex === -1 ? explanationLines.length : blankLineIndex);
    if (continuationLines.length > 0) {
      answerLine = `ANSWER: ${continuationLines.join(" ").trim()}`;
      explanationLines = explanationLines.slice(continuationLines.length);
    }
  }

  if (!answerLine && answerTextLines.length > 0) {
    answerLine = answerTextLines[0];
  }

  const explanation = cleanPromptLines(explanationLines).trim();

  if (!format) {
    const hasChoiceLines = promptLines.some((line) => /^([WXYZ])\)\s*(.*)$/i.test(line));
    const hasChoiceAnswer = parseMultipleChoiceAnswer(answerLine) !== null;
    format = hasChoiceLines || hasChoiceAnswer ? "MULTIPLE_CHOICE" : "SHORT_ANSWER";
  }

  if (format === "SHORT_ANSWER") {
    if (!answerLine) {
      return { warning: `Missing ANSWER line for short-answer question ${questionNumber ?? "?"} in ${sourcePdfUrl}` };
    }

    const parsed = parseAnswerLineForShortAnswer(answerLine);
    if (!parsed) {
      return { warning: `Unable to parse short-answer ANSWER line: ${answerLine}` };
    }

    return {
      question: {
        sourcePdfUrl,
        sourcePageUrl: "",
        sourceSet: undefined,
        sourceRound: undefined,
        sampleSetNumber: undefined,
        sampleSetYear: null,
        roundNumber: undefined,
        sourceQuestionNumber: questionNumber,
        sourceTitle: "",
        questionKind: kind,
        category: parsedCategory,
        format,
        prompt: promptText,
        correctAnswer: parsed.correctAnswer,
        alternateAnswers: parsed.alternateAnswers,
        explanation: explanation || "",
        choices: undefined
      }
    };
  }

  // Multiple choice parsing
  const choiceResults: Array<{ letter: string; text: string }> = [];
  let currentChoice: { letter: string; text: string } | null = null;
  const bodyLines = promptLines.slice();

  for (const line of bodyLines) {
    const choiceMatch = line.match(/^([WXYZ])\)\s*(.*)$/i);
    if (choiceMatch) {
      if (currentChoice) {
        choiceResults.push(currentChoice);
      }
      currentChoice = { letter: choiceMatch[1].toUpperCase(), text: choiceMatch[2].trim() };
      continue;
    }

    if (currentChoice) {
      currentChoice.text = `${currentChoice.text} ${line}`.trim();
    }
  }

  if (currentChoice) {
    choiceResults.push(currentChoice);
  }

  if (choiceResults.length === 0) {
    return { warning: `No multiple-choice options found for question ${questionNumber ?? "?"} in ${sourcePdfUrl}` };
  }

  if (!answerLine) {
    return { warning: `Missing ANSWER line for multiple-choice question ${questionNumber ?? "?"} in ${sourcePdfUrl}` };
  }

  const correctLetter = parseMultipleChoiceAnswer(answerLine);
  if (!correctLetter) {
    return { warning: `Unable to parse correct multiple-choice letter from ${answerLine}` };
  }

  const correctChoice = choiceResults.find((choice) => choice.letter === correctLetter);
  if (!correctChoice) {
    return { warning: `Correct choice letter ${correctLetter} not found in options for question ${questionNumber ?? "?"}` };
  }

  return {
    question: {
      sourcePdfUrl,
      sourcePageUrl: "",
      sourceSet: undefined,
      sourceRound: undefined,
      sampleSetNumber: undefined,
      sampleSetYear: null,
      roundNumber: undefined,
      sourceQuestionNumber: questionNumber,
      sourceTitle: "",
      questionKind: kind,
      category: parsedCategory,
      format,
      prompt: promptText,
      correctAnswer: correctChoice.text,
      alternateAnswers: [],
      explanation: explanation || "",
      choices: choiceResults.map((choice) => choice.text)
    }
  };
}

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const parsed = await pdfParse(buffer);
  if (!parsed?.text) {
    throw new Error("PDF text extraction failed or returned empty text.");
  }
  return String(parsed.text);
}

export function parseScienceBowlPdfText(text: string, sourcePdfUrl: string): ParseResult {
  const blocks = extractBlocks(text);
  const warnings: string[] = [];
  const questions: ParsedQuestion[] = [];

  for (const block of blocks) {
    const result = parseQuestionBlock(block, sourcePdfUrl);
    if (result.warning) {
      warnings.push(result.warning);
      continue;
    }
    if (result.question) {
      questions.push(result.question);
    }
  }

  return { questions, warnings };
}
