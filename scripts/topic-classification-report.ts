import "dotenv/config";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getPrisma } from "../src/lib/db";

type ReportRow = {
  subject: string;
  topic: string;
  subtopic: string;
  keyConcept: string;
  difficulty: string;
  confidence: number;
  needsReview: boolean;
  questionId: string;
};

function readArg(name: string) {
  const prefix = `--${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function parseOutputDir(value: string | undefined) {
  return value?.trim() || "reports";
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function groupCounts(rows: ReportRow[], keySelector: (row: ReportRow) => string) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = keySelector(row);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((left, right) => right.count - left.count || left.key.localeCompare(right.key));
}

async function main() {
  const prisma = getPrisma();
  const competition = readArg("competition") ?? "science-bowl";
  const outputDir = parseOutputDir(readArg("out-dir"));
  const subject = readArg("subject");
  await mkdir(outputDir, { recursive: true });

  const classifications = await prisma.questionTopicClassification.findMany({
    where: {
      question: {
        competition: { slug: competition },
        ...(subject ? { category: subject } : {})
      }
    },
    include: {
      question: {
        select: {
          id: true,
          category: true,
          schoolLevel: true,
          prompt: true
        }
      }
    },
    orderBy: [{ question: { category: "asc" } }, { confidence: "desc" }, { updatedAt: "asc" }]
  });

  const rows: ReportRow[] = classifications.map((item) => ({
    subject: item.question.category,
    topic: item.topic,
    subtopic: item.subtopic,
    keyConcept: item.keyConcept,
    difficulty: item.difficulty,
    confidence: item.confidence,
    needsReview: item.needsReview,
    questionId: item.questionId
  }));

  const bySubject = new Map<string, ReportRow[]>();
  for (const row of rows) {
    const list = bySubject.get(row.subject) ?? [];
    list.push(row);
    bySubject.set(row.subject, list);
  }

  const topicCountsBySubject = [...bySubject.entries()].map(([subjectName, items]) => ({
    subject: subjectName,
    topics: groupCounts(items, (row) => row.topic)
  }));

  const subtopicCountsBySubject = [...bySubject.entries()].map(([subjectName, items]) => ({
    subject: subjectName,
    subtopics: groupCounts(items, (row) => `${row.topic} :: ${row.subtopic}`)
  }));

  const lowConfidence = rows
    .filter((row) => row.confidence < 0.75)
    .sort((a, b) => a.confidence - b.confidence || a.subject.localeCompare(b.subject));

  const needsReview = rows.filter((row) => row.needsReview || row.topic === "Needs Review" || row.subtopic === "Needs Review");

  const eightyTwentySuggestions = [...bySubject.entries()].map(([subjectName, items]) => {
    const topics = groupCounts(items, (row) => row.topic)
      .slice(0, 10)
      .map((entry) => {
        const topicRows = items.filter((row) => row.topic === entry.key);
        const avgConfidence = topicRows.length
          ? topicRows.reduce((sum, row) => sum + row.confidence, 0) / topicRows.length
          : 0;
        const support = groupCounts(topicRows, (row) => row.subtopic)
          .slice(0, 4)
          .map((entry) => ({ subtopic: entry.key, count: entry.count }));

        return {
          topic: entry.key,
          count: entry.count,
          averageConfidence: round(avgConfidence),
          subtopics: support
        };
      });

    return {
      subject: subjectName,
      topics
    };
  });

  const report = {
    generatedAt: new Date().toISOString(),
    competition,
    totalClassifications: rows.length,
    topicCountsBySubject,
    subtopicCountsBySubject,
    lowConfidence,
    needsReview,
    suggested8020CurriculumTopics: eightyTwentySuggestions
  };

  const markdownLines = [
    `# Question Topic Classification Report`,
    ``,
    `Generated: ${report.generatedAt}`,
    `Competition: ${competition}`,
    `Total classifications: ${rows.length}`,
    ``,
    `## Topic counts by subject`,
    ...topicCountsBySubject.flatMap((subjectReport) => [
      `### ${subjectReport.subject}`,
      ...subjectReport.topics.map((entry) => `- ${entry.key}: ${entry.count}`)
    ]),
    ``,
    `## Subtopic counts by subject`,
    ...subtopicCountsBySubject.flatMap((subjectReport) => [
      `### ${subjectReport.subject}`,
      ...subjectReport.subtopics.map((entry) => `- ${entry.key}: ${entry.count}`)
    ]),
    ``,
    `## Low-confidence classifications`,
    ...lowConfidence.map((row) => `- ${row.subject} | ${row.topic} / ${row.subtopic} | confidence ${round(row.confidence)} | ${row.questionId}`),
    ``,
    `## Needs Review classifications`,
    ...needsReview.map((row) => `- ${row.subject} | ${row.topic} / ${row.subtopic} | ${row.questionId}`),
    ``,
    `## Suggested 80/20 curriculum topics`,
    ...eightyTwentySuggestions.flatMap((subjectReport) => [
      `### ${subjectReport.subject}`,
      ...subjectReport.topics.map((topic) => `- ${topic.topic}: ${topic.count} questions, avg confidence ${topic.averageConfidence}`)
    ])
  ];

  await writeFile(path.join(outputDir, "question-topic-classification-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(path.join(outputDir, "question-topic-classification-report.md"), `${markdownLines.join("\n")}\n`, "utf8");

  console.log(JSON.stringify(report, null, 2));
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  try {
    await getPrisma().$disconnect();
  } catch {
    // Ignore disconnect errors during failure handling.
  }
  process.exit(1);
});
