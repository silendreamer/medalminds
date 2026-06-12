import { fetchIndexHtml } from "./osti/fetchIndex";
import { discoverPdfLinks } from "./osti/discoverPdfLinks";
import { downloadPdf, sleep } from "./osti/downloadPdf";
import { extractTextFromPdf, parseScienceBowlPdfText } from "./osti/parseScienceBowlPdf";
import { importPdfQuestions } from "./osti/importQuestions";
import { exportQuestions, type OutputFormat } from "./osti/exporter";
import type { PdfLinkInfo, ParsedQuestion } from "./osti/types";

const DEFAULT_SOURCE_URL = "https://science.osti.gov/wdts/nsb/Regional-Competitions/Resources/MS-Sample-Questions";

interface Options {
  dryRun: boolean;
  maxPdfs?: number;
  sampleSet?: number;
  round?: number;
  sourceUrl: string;
  refresh: boolean;
  outputFormat: OutputFormat;
  outputPath?: string;
}

function parseArgs(argv: string[]): Options {
  const options: Options = {
    dryRun: false,
    sourceUrl: DEFAULT_SOURCE_URL,
    refresh: false,
    outputFormat: "postgres"
  };

  let index = 0;
  while (index < argv.length) {
    let arg = argv[index];
    let value: string | undefined;

    if (arg.includes("=")) {
      const [key, rawValue] = arg.split("=", 2);
      arg = key;
      value = rawValue;
    }

    switch (arg) {
      case "--dry-run":
        options.dryRun = true;
        index += 1;
        break;
      case "--max-pdfs": {
        if (value !== undefined) {
          options.maxPdfs = Number(value);
          index += 1;
        } else {
          index += 1;
          options.maxPdfs = Number(argv[index] ?? "");
          index += 1;
        }
        break;
      }
      case "--set": {
        if (value !== undefined) {
          options.sampleSet = Number(value);
          index += 1;
        } else {
          index += 1;
          options.sampleSet = Number(argv[index] ?? "");
          index += 1;
        }
        break;
      }
      case "--round": {
        if (value !== undefined) {
          options.round = Number(value);
          index += 1;
        } else {
          index += 1;
          options.round = Number(argv[index] ?? "");
          index += 1;
        }
        break;
      }
      case "--source-url": {
        if (value !== undefined) {
          options.sourceUrl = value;
          index += 1;
        } else {
          index += 1;
          options.sourceUrl = argv[index] ?? DEFAULT_SOURCE_URL;
          index += 1;
        }
        break;
      }
      case "--refresh":
        options.refresh = true;
        index += 1;
        break;
      case "--output-format": {
        if (value !== undefined) {
          options.outputFormat = value as OutputFormat;
          index += 1;
        } else {
          index += 1;
          options.outputFormat = (argv[index] as OutputFormat) ?? "postgres";
          index += 1;
        }
        break;
      }
      case "--output-path": {
        if (value !== undefined) {
          options.outputPath = value;
          index += 1;
        } else {
          index += 1;
          options.outputPath = argv[index];
          index += 1;
        }
        break;
      }
      default:
        console.warn(`Unknown option: ${arg}`);
        index += 1;
    }
  }

  return options;
}

function filterLinks(links: PdfLinkInfo[], options: Options): PdfLinkInfo[] {
  return links.filter((link) => {
    const matchesSet = options.sampleSet === undefined || link.sampleSetNumber === options.sampleSet;
    const matchesRound = options.round === undefined || link.roundNumber === options.round;
    return matchesSet && matchesRound;
  });
}

function formatExample(parsed: ParsedQuestion): string {
  return [
    `kind=${parsed.questionKind}`,
    `set=${parsed.sourceSet ?? "unknown"}`,
    `round=${parsed.sourceRound ?? "unknown"}`,
    `category=${parsed.category}`,
    `format=${parsed.format}`,
    `prompt=${parsed.prompt.slice(0, 120)}${parsed.prompt.length > 120 ? "..." : ""}`
  ].join(" | ");
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

async function processPdfLink(entry: PdfLinkInfo, options: Options): Promise<{ parsedQuestions: ParsedQuestion[]; warnings: string[]; pdfInfo: PdfLinkInfo }> {
  console.log(`Downloading PDF: ${entry.sourcePdfUrl}`);
  const buffer = await downloadPdf(entry.sourcePdfUrl, options.refresh);
  await sleep(400);

  console.log(`Extracting text from PDF: ${entry.sourcePdfUrl}`);
  const rawText = await extractTextFromPdf(buffer);
  const parsed = parseScienceBowlPdfText(rawText, entry.sourcePdfUrl);
  const enriched = parsed.questions.map((question) => ({
    ...question,
    sourcePageUrl: entry.sourcePageUrl,
    sourceSet: entry.sourceSet,
    sourceRound: entry.sourceRound,
    sampleSetNumber: entry.sampleSetNumber,
    sampleSetYear: entry.sampleSetYear,
    sourceTitle: entry.sourceTitle
  }));

  return { parsedQuestions: enriched, warnings: parsed.warnings, pdfInfo: entry };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  console.log("OSTI Science Bowl importer starting.");
  console.log(`Source URL: ${options.sourceUrl}`);

  const html = await fetchIndexHtml(options.sourceUrl);
  const discoveredLinks = discoverPdfLinks(html, options.sourceUrl);
  console.log(`Discovered ${discoveredLinks.length} PDF links from the source page.`);

  const selectedLinks = filterLinks(discoveredLinks, options);
  if (options.maxPdfs && selectedLinks.length > options.maxPdfs) {
    selectedLinks.splice(options.maxPdfs);
  }

  console.log(`Selected ${selectedLinks.length} PDF files for processing.`);
  if (selectedLinks.length === 0) {
    console.warn("No PDFs selected after applying filters. Exiting.");
    process.exit(0);
  }

  const pdfResults = await mapWithConcurrency(selectedLinks, 2, async (link) => {
    try {
      return await processPdfLink(link, options);
    } catch (error) {
      console.warn(`Failed to process PDF ${link.sourcePdfUrl}: ${(error as Error).message}`);
      return { parsedQuestions: [], warnings: [(error as Error).message], pdfInfo: link };
    }
  });

  const allParsedQuestions = pdfResults.flatMap((result) => result.parsedQuestions);
  const allWarnings = pdfResults.flatMap((result) => result.warnings.map((warning) => `${result.pdfInfo.sourcePdfUrl}: ${warning}`));
  console.log(`Parsed ${allParsedQuestions.length} questions from ${selectedLinks.length} PDFs.`);

  if (options.dryRun) {
    console.log("Dry run mode - no database changes will be made.");
    console.log(`  output-format: ${options.outputFormat}`);
    if (options.outputPath) {
      console.log(`  output-path: ${options.outputPath}`);
    }
    const categories = Array.from(new Set(allParsedQuestions.map((question) => question.category))).sort();
    const kindCounts = allParsedQuestions.reduce(
      (acc, question) => {
        acc[question.questionKind] = (acc[question.questionKind] ?? 0) + 1;
        acc[question.format] = (acc[question.format] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log("Dry-run summary:");
    console.log(`  PDFs discovered: ${discoveredLinks.length}`);
    console.log(`  PDFs selected: ${selectedLinks.length}`);
    console.log(`  questions parsed: ${allParsedQuestions.length}`);
    console.log(`  tossup count: ${kindCounts.TOSSUP ?? 0}`);
    console.log(`  bonus count: ${kindCounts.BONUS ?? 0}`);
    console.log(`  multiple choice count: ${kindCounts.MULTIPLE_CHOICE ?? 0}`);
    console.log(`  short answer count: ${kindCounts.SHORT_ANSWER ?? 0}`);
    console.log(`  categories: ${categories.join(", ")}`);
    console.log(`  warnings: ${allWarnings.length}`);

    if (allParsedQuestions.length > 0) {
      console.log("Example parsed questions:");
      allParsedQuestions.slice(0, 3).forEach((question, index) => {
        console.log(`  ${index + 1}. ${formatExample(question)}`);
      });
    }

    allWarnings.slice(0, 10).forEach((warning) => {
      console.warn(`WARNING: ${warning}`);
    });
    return;
  }

  const effectiveOutputPath = options.outputPath ??
    (options.outputFormat === "sqlite"
      ? ".cache/osti-science-bowl/osti-science-bowl.sqlite"
      : ".cache/osti-science-bowl/export");

  if (options.outputFormat !== "postgres") {
    const result = await exportQuestions(allParsedQuestions, options.outputFormat, effectiveOutputPath);

    console.log("OSTI Middle School Science Bowl Export Complete");
    console.log(`  Source page: ${options.sourceUrl}`);
    console.log(`  PDFs discovered: ${discoveredLinks.length}`);
    console.log(`  PDFs processed: ${selectedLinks.length}`);
    console.log(`  Questions parsed: ${allParsedQuestions.length}`);
    console.log(`  Questions exported: ${result.questionsCount}`);
    console.log(`  Answers exported: ${result.answersCount}`);
    console.log(`  output-format: ${options.outputFormat}`);
    console.log(`  output-path: ${effectiveOutputPath}`);
    console.log(`  Warnings: ${allWarnings.length}`);
    allWarnings.slice(0, 20).forEach((warning) => {
      console.warn(`WARNING: ${warning}`);
    });
    return;
  }

  if (!process.env.DATABASE_URL && !process.env.POSTGRES_PRISMA_URL && !process.env.POSTGRES_URL && !process.env.POSTGRES_URL_NON_POOLING) {
    throw new Error("No database URL is configured. Set DATABASE_URL or another supported env var before running the importer.");
  }

  const importResult = await importPdfQuestions(allParsedQuestions, options.sourceUrl);

  console.log("OSTI Middle School Science Bowl Import Complete");
  console.log(`  Source page: ${options.sourceUrl}`);
  console.log(`  PDFs discovered: ${discoveredLinks.length}`);
  console.log(`  PDFs processed: ${selectedLinks.length}`);
  console.log(`  Questions parsed: ${importResult.questionsParsed}`);
  console.log(`  Questions inserted: ${importResult.questionsInserted}`);
  console.log(`  Questions skipped as duplicates: ${importResult.questionsSkipped}`);
  console.log(`  Answers inserted: ${importResult.answersInserted}`);
  console.log(`  Warnings: ${allWarnings.length}`);
  allWarnings.slice(0, 20).forEach((warning) => {
    console.warn(`WARNING: ${warning}`);
  });
}

main().catch((error) => {
  console.error("Import failed:", (error as Error).message);
  process.exit(1);
});
