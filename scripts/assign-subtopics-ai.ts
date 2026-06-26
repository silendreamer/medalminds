/**
 * assign-subtopics-ai.ts
 *
 * Directly assigns subTopicId on Question rows by showing the AI our exact
 * 128 SubTopic catalog and asking it to pick the best match.
 *
 * Bypasses the lossy QuestionTopicClassification → token-overlap path;
 * the AI receives the real SubTopic IDs and returns them directly.
 *
 * Usage:
 *   npx tsx scripts/assign-subtopics-ai.ts               # dry run, 100 questions
 *   npx tsx scripts/assign-subtopics-ai.ts --write       # apply (default limit 500)
 *   npx tsx scripts/assign-subtopics-ai.ts --write --limit=5000
 *   npx tsx scripts/assign-subtopics-ai.ts --write --subject="Biology"
 *   npx tsx scripts/assign-subtopics-ai.ts --write --reset  # clear + re-assign all
 *
 * Flags:
 *   --write               Apply changes (default: dry run)
 *   --limit=N             Max questions to process (default: 100 dry / 500 write)
 *   --subject=NAME        Filter by question.category (e.g. "Biology")
 *   --batch-size=N        Questions per API call (default 15)
 *   --concurrency=N       Parallel API calls (default 4)
 *   --model=NAME          OpenAI model (default gpt-4o-mini)
 *   --reset               Also re-process questions that already have a subTopicId
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import type { Prisma } from "@prisma/client";
import { getPrisma } from "../src/lib/db";

loadDotenv({ path: ".env.local", override: false });

// ── CLI helpers ───────────────────────────────────────────────────────────────

function readArg(name: string) {
  const prefix = `--${name}=`;
  const inline = process.argv.find((a) => a.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const idx = process.argv.indexOf(`--${name}`);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}

function hasFlag(name: string) {
  return process.argv.includes(`--${name}`);
}

function parsePositiveInt(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Category → subject id ─────────────────────────────────────────────────────

const CATEGORY_TO_SUBJECT: Record<string, string> = {
  "Biology":                  "subj--life-science",
  "Life Science":             "subj--life-science",
  "Chemistry":                "subj--physical-science",
  "Physics":                  "subj--physical-science",
  "Physical Science":         "subj--physical-science",
  "Earth and Space Science":  "subj--earth-space-science",
  "Earth & Space Science":    "subj--earth-space-science",
  "Energy":                   "subj--energy",
  "Math":                     "subj--mathematics",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type SubTopicWithChain = {
  id: string;
  name: string;
  topic: { name: string; subject: { id: string; name: string } };
};

type QuestionRow = Prisma.QuestionGetPayload<{
  select: {
    id: true;
    category: true;
    schoolLevel: true;
    format: true;
    prompt: true;
    answers: { include: { mc: true } };
  };
}>;

type Assignment = { questionId: string; subTopicId: string | null };

// ── Catalog builder ───────────────────────────────────────────────────────────

function buildCatalog(subTopics: SubTopicWithChain[]): string {
  // Group by subject → topic
  const bySubject = new Map<string, Map<string, SubTopicWithChain[]>>();
  for (const st of subTopics) {
    const subjectName = st.topic.subject.name;
    const topicName = st.topic.name;
    if (!bySubject.has(subjectName)) bySubject.set(subjectName, new Map());
    const byTopic = bySubject.get(subjectName)!;
    if (!byTopic.has(topicName)) byTopic.set(topicName, []);
    byTopic.get(topicName)!.push(st);
  }

  const lines: string[] = [];
  for (const [subject, topics] of bySubject) {
    lines.push(`\n${subject}:`);
    for (const [topic, sts] of topics) {
      lines.push(`  ${topic}:`);
      for (const st of sts) {
        lines.push(`    ${st.id} → "${st.name}"`);
      }
    }
  }
  return lines.join("\n");
}

// ── Prompt ────────────────────────────────────────────────────────────────────

function buildPrompt(
  questions: QuestionRow[],
  catalog: string
): string {
  const qList = questions.map((q) => {
    const answer = q.answers[0];
    const answerText = answer?.mc?.text ?? answer?.text ?? "";
    return {
      questionId: q.id,
      category: q.category,
      schoolLevel: q.schoolLevel,
      prompt: q.prompt.slice(0, 500),
      answer: answerText.slice(0, 200),
    };
  });

  return `You assign Science Bowl questions to the most relevant subtopic from a fixed catalog.

SUBTOPIC CATALOG (id → Subject > Topic > "SubTopic name"):
${catalog}

RULES:
- Pick the subtopic whose name best matches the SPECIFIC scientific concept in the question.
- Prefer narrower subtopic matches over broad topic-level matches.
- If no subtopic fits with confidence ≥ 0.6, return null.
- Return null rather than forcing a bad match.
- Return the exact subtopic ID string from the catalog, not the name.

QUESTIONS:
${JSON.stringify(qList, null, 2)}`;
}

// ── OpenAI call ───────────────────────────────────────────────────────────────

async function fetchJsonWithRetry(url: string, init: RequestInit, attempts = 4) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, init);
      if (res.ok) return res;
      if (res.status === 429 || res.status >= 500) {
        lastError = new Error(`HTTP ${res.status}`);
        const retryAfter = res.headers.get("retry-after");
        const delay = retryAfter ? Number(retryAfter) * 1000 : 0;
        if (attempt < attempts && delay > 0) {
          await sleep(Math.min(delay, 15000));
          continue;
        }
      } else {
        return res;
      }
    } catch (e) {
      lastError = e;
    }
    if (attempt < attempts) await sleep(500 * attempt * attempt);
  }
  throw lastError instanceof Error ? lastError : new Error("Request failed");
}

async function requestAssignments(
  questions: QuestionRow[],
  catalog: string,
  model: string
): Promise<Assignment[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required");

  const res = await fetchJsonWithRetry("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.0,
      messages: [
        {
          role: "system",
          content:
            "You assign academic competition questions to subtopics. Return only valid JSON matching the required schema.",
        },
        { role: "user", content: buildPrompt(questions, catalog) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "subtopic_assignments",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["items"],
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["questionId", "subTopicId"],
                  properties: {
                    questionId: { type: "string" },
                    subTopicId: { type: ["string", "null"] },
                  },
                },
              },
            },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body}`);
  }

  const payload = (await res.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI response");

  const parsed = JSON.parse(content) as { items: Array<{ questionId: string; subTopicId: unknown }> };
  return (parsed.items ?? []).map((item) => ({
    questionId: item.questionId,
    // Normalize the string "null" that some models return instead of JSON null
    subTopicId: item.subTopicId === "null" || item.subTopicId === "" || item.subTopicId == null
      ? null
      : String(item.subTopicId),
  }));
}

// ── Concurrency helper ────────────────────────────────────────────────────────

async function mapWithConcurrency<T, U>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<U>
): Promise<U[]> {
  const results: U[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      results[i] = await mapper(items[i]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  );
  return results;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const prisma = getPrisma();
  const writeMode = hasFlag("write");
  const doReset   = hasFlag("reset");
  const subject   = readArg("subject");
  const model     = readArg("model") ?? "gpt-4o-mini";
  const batchSize = parsePositiveInt(readArg("batch-size"), 15);
  const concurrency = parsePositiveInt(readArg("concurrency"), 4);
  const defaultLimit = writeMode ? 500 : 100;
  const limit = parsePositiveInt(readArg("limit"), defaultLimit);

  console.log(
    JSON.stringify({ mode: writeMode ? "write" : "dry-run", model, limit, batchSize, concurrency, subject: subject ?? "all", reset: doReset }, null, 2)
  );

  // ── Load all SubTopics ──────────────────────────────────────────────────────

  const allSubTopics: SubTopicWithChain[] = await prisma.subTopic.findMany({
    include: { topic: { include: { subject: true } } },
    orderBy: [{ topic: { subject: { order: "asc" } } }, { topic: { order: "asc" } }, { order: "asc" }],
  });

  const validSubTopicIds = new Set(allSubTopics.map((st) => st.id));
  const subTopicsBySubject = new Map<string, SubTopicWithChain[]>();
  for (const st of allSubTopics) {
    const sid = st.topic.subject.id;
    if (!subTopicsBySubject.has(sid)) subTopicsBySubject.set(sid, []);
    subTopicsBySubject.get(sid)!.push(st);
  }

  // Full catalog (used for "General Science" etc.)
  const fullCatalog = buildCatalog(allSubTopics);

  // Per-subject catalogs
  const catalogBySubject = new Map<string, string>();
  for (const [sid, sts] of subTopicsBySubject) {
    catalogBySubject.set(sid, buildCatalog(sts));
  }

  // ── Reset if requested ──────────────────────────────────────────────────────

  if (doReset && writeMode) {
    console.log("\nResetting subTopicId on science-bowl questions…");
    await prisma.question.updateMany({
      where: { competitionId: "science-bowl", deletedAt: null },
      data: { subTopicId: null },
    });
    console.log("Reset done.\n");
  }

  // ── Fetch questions to process ──────────────────────────────────────────────

  const where: Prisma.QuestionWhereInput = {
    competitionId: "science-bowl",
    deletedAt: null,
    ...(subject ? { category: subject } : {}),
    ...(doReset ? {} : { subTopicId: null }),
  };

  const questions = await prisma.question.findMany({
    where,
    select: {
      id: true,
      category: true,
      schoolLevel: true,
      format: true,
      prompt: true,
      answers: { include: { mc: true } },
    },
    orderBy: [{ category: "asc" }, { id: "asc" }],
    take: limit,
  });

  console.log(`\nQuestions to process: ${questions.length}`);

  if (questions.length === 0) {
    console.log("Nothing to do.");
    await prisma.$disconnect();
    return;
  }

  // ── Process in batches ──────────────────────────────────────────────────────

  const batches: QuestionRow[][] = [];
  for (let i = 0; i < questions.length; i += batchSize) {
    batches.push(questions.slice(i, i + batchSize) as QuestionRow[]);
  }

  let processed = 0;
  let assigned  = 0;
  let nulled    = 0;
  let failed    = 0;
  let badId     = 0;

  await mapWithConcurrency(batches, concurrency, async (batch) => {
    // Pick the catalog based on the batch's predominant subject
    // (batches are ordered by category so within-batch subjects are usually uniform)
    const batchCategory = batch[0].category;
    const subjectId = CATEGORY_TO_SUBJECT[batchCategory];
    const catalog = subjectId
      ? (catalogBySubject.get(subjectId) ?? fullCatalog)
      : fullCatalog;

    try {
      const assignments = await requestAssignments(batch, catalog, model);
      const byId = new Map(assignments.map((a) => [a.questionId, a.subTopicId]));

      const updates: { id: string; subTopicId: string | null }[] = [];
      for (const q of batch) {
        const stId = byId.get(q.id);
        if (stId === undefined) {
          // AI didn't return an entry for this question
          failed++;
          console.error(`  MISS: ${q.id} (${q.category}) — not in AI response`);
          continue;
        }
        if (stId !== null && !validSubTopicIds.has(stId)) {
          // AI hallucinated a non-existent ID
          badId++;
          console.error(`  BAD-ID: ${q.id} → "${stId}" (not in catalog)`);
          continue;
        }
        processed++;
        if (stId) {
          assigned++;
          updates.push({ id: q.id, subTopicId: stId });
        } else {
          nulled++;
        }
        console.log(`  ${q.id} [${q.category}] → ${stId ?? "null"}`);
      }

      if (writeMode && updates.length > 0) {
        await prisma.$transaction(
          updates.map((u) =>
            prisma.question.update({ where: { id: u.id }, data: { subTopicId: u.subTopicId } })
          )
        );
      }
    } catch (err) {
      failed += batch.length;
      console.error(`  BATCH ERROR (${batch[0].id}…): ${err instanceof Error ? err.message : String(err)}`);
    }
  });

  console.log("\n=== Summary ===");
  console.log(`  Processed:       ${processed}`);
  console.log(`  Assigned:        ${assigned}  (got a subtopic)`);
  console.log(`  Skipped (null):  ${nulled}  (AI said no good match)`);
  console.log(`  Failed:          ${failed}  (API errors or missing response)`);
  if (badId > 0) console.log(`  Bad IDs:         ${badId}  (AI hallucinated IDs — not written)`);
  if (!writeMode) console.log("\n(dry run — pass --write to apply)");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
