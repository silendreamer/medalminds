import fs from "node:fs/promises";
import path from "node:path";
import { computeSourceHash } from "./importQuestions";
import type { ParsedQuestion } from "./types";

export type OutputFormat = "postgres" | "csv" | "sql" | "sqlite";

interface ExportQuestionRow {
  id: string;
  competitionId: string;
  levelId: string;
  category: string;
  level: string;
  difficulty: string;
  format: string;
  questionKind: string;
  schoolLevel: string;
  sourceProvider: string;
  sourcePageUrl: string;
  sourcePdfUrl: string;
  sourceSet?: string | null;
  sourceRound?: string | null;
  sourceQuestionNumber?: number;
  sourceHash: string;
  prompt: string;
  choices: string[] | null;
  correctAnswer: string;
  alternateAnswers: string[] | null;
  explanation: string;
}

interface ExportAnswerRow {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  explanation?: string | null;
  position: number;
}

function normalizeJson(value: unknown): string {
  return JSON.stringify(value ?? null);
}

function escapeCsv(value: string): string {
  const stringValue = value ?? "";
  const escaped = stringValue.replace(/"/g, '""');
  if (/[",\n\r]/.test(stringValue)) {
    return `"${escaped}"`;
  }
  return escaped;
}

function sqlEscape(value: string | null | undefined): string {
  if (value == null) return "NULL";
  return `'${value.replace(/'/g, "''")}'`;
}

function arraySql(value: string[] | null | undefined) {
  if (!value?.length) return "ARRAY[]::text[]";
  const escaped = value.map((item) => `'${item.replace(/'/g, "''")}'`).join(",");
  return `ARRAY[${escaped}]::text[]`;
}

function buildRows(parsedQuestions: ParsedQuestion[]) {
  const questions: ExportQuestionRow[] = [];
  const answers: ExportAnswerRow[] = [];

  for (const parsed of parsedQuestions) {
    const isHighSchool = /HS-Sample-Questions/i.test(parsed.sourcePdfUrl) || /HS-Sample-Questions/i.test(parsed.sourcePageUrl);
    const levelId = isHighSchool ? "science-bowl-high-school" : "science-bowl-middle-school";
    const level = isHighSchool ? "High School" : "Middle School";
    const schoolLevel = isHighSchool ? "HIGH_SCHOOL" : "MIDDLE_SCHOOL";
    const sourceHash = computeSourceHash(parsed);
    const questionId = `osti-${sourceHash}`;
    const questionRow: ExportQuestionRow = {
      id: questionId,
      competitionId: "science-bowl",
      levelId,
      category: parsed.category,
      level,
      difficulty: "INTERMEDIATE",
      format: parsed.format,
      questionKind: parsed.questionKind,
      schoolLevel,
      sourceProvider: "U.S. DOE Office of Science / National Science Bowl",
      sourcePageUrl: parsed.sourcePageUrl,
      sourcePdfUrl: parsed.sourcePdfUrl,
      sourceSet: parsed.sourceSet ?? null,
      sourceRound: parsed.sourceRound ?? null,
      sourceQuestionNumber: parsed.sourceQuestionNumber,
      sourceHash,
      prompt: parsed.prompt,
      choices: parsed.choices ?? null,
      correctAnswer: parsed.correctAnswer,
      alternateAnswers: parsed.alternateAnswers?.length ? parsed.alternateAnswers : null,
      explanation: parsed.explanation
    };

    questions.push(questionRow);

    const normalizedAnswers = parsed.format === "SHORT_ANSWER"
      ? [parsed.correctAnswer, ...(parsed.alternateAnswers ?? [])].map((text, index) => ({
          id: `${questionId}-answer-${index + 1}`,
          questionId,
          text: text.trim(),
          isCorrect: true,
          explanation: null,
          position: index + 1
        }))
      : (parsed.choices ?? []).map((choiceText, index) => ({
          id: `${questionId}-answer-${index + 1}`,
          questionId,
          text: choiceText.trim(),
          isCorrect: choiceText.trim() === parsed.correctAnswer.trim(),
          explanation: null,
          position: index + 1
        }));

    answers.push(...normalizedAnswers);
  }

  return { questions, answers };
}

async function ensureDirectory(directory: string) {
  await fs.mkdir(directory, { recursive: true });
}

export async function writeCsvExport(parsedQuestions: ParsedQuestion[], outputDirectory: string) {
  const { questions, answers } = buildRows(parsedQuestions);
  await ensureDirectory(outputDirectory);

  const questionHeaders = [
    "id",
    "competitionId",
    "levelId",
    "category",
    "level",
    "difficulty",
    "format",
    "questionKind",
    "schoolLevel",
    "sourceProvider",
    "sourcePageUrl",
    "sourcePdfUrl",
    "sourceSet",
    "sourceRound",
    "sourceQuestionNumber",
    "sourceHash",
    "prompt",
    "choices",
    "correctAnswer",
    "alternateAnswers",
    "explanation"
  ];

  const questionsCsv = [questionHeaders.join(",")].concat(
    questions.map((question) =>
      [
        question.id,
        question.competitionId,
        question.levelId,
        question.category,
        question.level,
        question.difficulty,
        question.format,
        question.questionKind,
        question.schoolLevel,
        question.sourceProvider,
        question.sourcePageUrl,
        question.sourcePdfUrl,
        question.sourceSet ?? "",
        question.sourceRound ?? "",
        String(question.sourceQuestionNumber ?? ""),
        question.sourceHash,
        question.prompt,
        question.choices ? normalizeJson(question.choices) : "",
        question.correctAnswer,
        question.alternateAnswers ? normalizeJson(question.alternateAnswers) : "",
        question.explanation
      ]
        .map(escapeCsv)
        .join(",")
    )
  ).join("\n");

  const answerHeaders = ["id", "questionId", "text", "isCorrect", "explanation", "position"];
  const answersCsv = [answerHeaders.join(",")].concat(
    answers.map((answer) =>
      [
        answer.id,
        answer.questionId,
        answer.text,
        answer.isCorrect ? "true" : "false",
        answer.explanation ?? "",
        answer.position.toString()
      ]
        .map(escapeCsv)
        .join(",")
    )
  ).join("\n");

  const questionsPath = path.join(outputDirectory, "questions.csv");
  const answersPath = path.join(outputDirectory, "answers.csv");
  await fs.writeFile(questionsPath, questionsCsv + "\n", "utf8");
  await fs.writeFile(answersPath, answersCsv + "\n", "utf8");

  return { questionsPath, answersPath, questionsCount: questions.length, answersCount: answers.length };
}

export async function writeSqlExport(parsedQuestions: ParsedQuestion[], outputDirectory: string) {
  const { questions, answers } = buildRows(parsedQuestions);
  await ensureDirectory(outputDirectory);

  const questionColumns = [
    "id",
    "competitionId",
    "levelId",
    "category",
    "level",
    "difficulty",
    "format",
    "questionKind",
    "schoolLevel",
    "sourceProvider",
    "sourcePageUrl",
    "sourcePdfUrl",
    "sourceSet",
    "sourceRound",
    "sourceQuestionNumber",
    "sourceHash",
    "prompt",
    "choices",
    "correctAnswer",
    "alternateAnswers",
    "explanation"
  ];

  const questionInserts = questions.map((question) => {
    const values = [
      sqlEscape(question.id),
      sqlEscape(question.competitionId),
      sqlEscape(question.levelId),
      sqlEscape(question.category),
      sqlEscape(question.level),
      sqlEscape(question.difficulty),
      sqlEscape(question.format),
      sqlEscape(question.questionKind),
      sqlEscape(question.schoolLevel),
      sqlEscape(question.sourceProvider),
      sqlEscape(question.sourcePageUrl),
      sqlEscape(question.sourcePdfUrl),
      question.sourceSet ? sqlEscape(question.sourceSet) : "NULL",
      question.sourceRound ? sqlEscape(question.sourceRound) : "NULL",
      question.sourceQuestionNumber != null ? question.sourceQuestionNumber.toString() : "NULL",
      sqlEscape(question.sourceHash),
      sqlEscape(question.prompt),
      question.choices ? `${sqlEscape(normalizeJson(question.choices))}::json` : "NULL",
      sqlEscape(question.correctAnswer),
      question.alternateAnswers ? arraySql(question.alternateAnswers) : "ARRAY[]::text[]",
      sqlEscape(question.explanation)
    ];

    return `INSERT INTO question (${questionColumns.join(", ")}) VALUES (${values.join(", ")});`;
  });

  const answerColumns = ["id", "questionId", "text", "isCorrect", "explanation", "position"];
  const answerInserts = answers.map((answer) => {
    const values = [
      sqlEscape(answer.id),
      sqlEscape(answer.questionId),
      sqlEscape(answer.text),
      answer.isCorrect ? "TRUE" : "FALSE",
      answer.explanation ? sqlEscape(answer.explanation) : "NULL",
      answer.position.toString()
    ];
    return `INSERT INTO answer (${answerColumns.join(", ")}) VALUES (${values.join(", ")});`;
  });

  const filePath = path.join(outputDirectory, "import.sql");
  await fs.writeFile(filePath, [...questionInserts, ...answerInserts].join("\n") + "\n", "utf8");
  return { sqlPath: filePath, questionsCount: questions.length, answersCount: answers.length };
}

export async function writeSqliteExport(parsedQuestions: ParsedQuestion[], outputFile: string) {
  const { questions, answers } = buildRows(parsedQuestions);
  await fs.mkdir(path.dirname(outputFile), { recursive: true });

  const module = await import("better-sqlite3");
  const BetterSqlite3 = module.default ?? module;
  const db = new BetterSqlite3(outputFile);

  try {
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec(`CREATE TABLE IF NOT EXISTS question (
      id TEXT PRIMARY KEY,
      competitionId TEXT NOT NULL,
      levelId TEXT,
      category TEXT NOT NULL,
      level TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      format TEXT NOT NULL,
      questionKind TEXT NOT NULL,
      schoolLevel TEXT,
      sourceProvider TEXT,
      sourcePageUrl TEXT,
      sourcePdfUrl TEXT,
      sourceSet TEXT,
      sourceRound TEXT,
      sourceQuestionNumber INTEGER,
      sourceHash TEXT UNIQUE,
      prompt TEXT NOT NULL,
      choices TEXT,
      correctAnswer TEXT NOT NULL,
      alternateAnswers TEXT,
      explanation TEXT
    );`);

    db.exec(`CREATE TABLE IF NOT EXISTS answer (
      id TEXT PRIMARY KEY,
      questionId TEXT NOT NULL,
      text TEXT NOT NULL,
      isCorrect INTEGER NOT NULL,
      explanation TEXT,
      position INTEGER NOT NULL,
      FOREIGN KEY(questionId) REFERENCES question(id)
    );`);

    const insertQuestion = db.prepare(`INSERT OR REPLACE INTO question (
      id, competitionId, levelId, category, level, difficulty, format, questionKind, schoolLevel,
      sourceProvider, sourcePageUrl, sourcePdfUrl, sourceSet, sourceRound, sourceQuestionNumber,
      sourceHash, prompt, choices, correctAnswer, alternateAnswers, explanation
    ) VALUES (
      @id, @competitionId, @levelId, @category, @level, @difficulty, @format, @questionKind, @schoolLevel,
      @sourceProvider, @sourcePageUrl, @sourcePdfUrl, @sourceSet, @sourceRound, @sourceQuestionNumber,
      @sourceHash, @prompt, @choices, @correctAnswer, @alternateAnswers, @explanation
    );`);

    const insertAnswer = db.prepare(`INSERT OR REPLACE INTO answer (
      id, questionId, text, isCorrect, explanation, position
    ) VALUES (
      @id, @questionId, @text, @isCorrect, @explanation, @position
    );`);

    const transaction = db.transaction(() => {
      for (const question of questions) {
        insertQuestion.run({
          ...question,
          choices: question.choices ? normalizeJson(question.choices) : null,
          alternateAnswers: question.alternateAnswers ? normalizeJson(question.alternateAnswers) : null,
          sourceQuestionNumber: question.sourceQuestionNumber ?? null
        });
      }
      for (const answer of answers) {
        insertAnswer.run({
          ...answer,
          isCorrect: answer.isCorrect ? 1 : 0
        });
      }
    });
    transaction();
  } finally {
    db.close();
  }

  return { sqlitePath: outputFile, questionsCount: questions.length, answersCount: answers.length };
}

export async function exportQuestions(parsedQuestions: ParsedQuestion[], format: OutputFormat, outputPath: string) {
  if (format === "csv") {
    return await writeCsvExport(parsedQuestions, outputPath);
  }
  if (format === "sql") {
    return await writeSqlExport(parsedQuestions, outputPath);
  }
  if (format === "sqlite") {
    return await writeSqliteExport(parsedQuestions, outputPath);
  }
  throw new Error(`Unsupported export format: ${format}`);
}
