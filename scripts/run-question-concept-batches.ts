import { spawn } from "node:child_process";
import { mkdirSync, createWriteStream } from "node:fs";
import { join } from "node:path";
import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { type Prisma } from "@prisma/client";
import { getPrisma } from "../src/lib/db";

loadDotenv({ path: ".env.local", override: false, quiet: true });

type Partition = {
  category: string;
  schoolLevel: string | null;
  count: number;
};

function readArg(name: string) {
  const prefix = `--${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function getPartitions(competitionSlug: string) {
  const prisma = getPrisma();
  const rows = await prisma.question.findMany({
    where: {
      competition: { slug: competitionSlug },
      concepts: { none: { isPrimary: true } }
    },
    select: {
      category: true,
      schoolLevel: true
    }
  });
  await prisma.$disconnect();

  const counts = new Map<string, Partition>();
  for (const row of rows) {
    const key = `${row.schoolLevel ?? "MIXED"}::${row.category}`;
    const current = counts.get(key);
    if (current) {
      current.count += 1;
    } else {
      counts.set(key, {
        category: row.category,
        schoolLevel: row.schoolLevel,
        count: 1
      });
    }
  }

  return Array.from(counts.values())
    .filter((row) => row.count > 0);
}

function workerCommand(competitionSlug: string, partition: Partition, maxNewConcepts: number) {
  const args = [
    "run",
    "generate:question-concepts",
    "--",
    `--competition=${competitionSlug}`,
    `--category=${partition.category}`,
    `--school-level=${partition.schoolLevel === "MIDDLE_SCHOOL" ? "middle-school" : partition.schoolLevel === "HIGH_SCHOOL" ? "high-school" : ""}`,
    `--limit=${partition.count}`,
    `--max-new-concepts=${maxNewConcepts}`,
    "--write",
    "--delay-ms=0"
  ].filter(Boolean);

  return args;
}

function safeLabel(partition: Partition) {
  const level = partition.schoolLevel ? partition.schoolLevel.toLowerCase() : "mixed";
  return `${slugify(level)}-${slugify(partition.category)}`;
}

async function runWorker(competitionSlug: string, partition: Partition, maxNewConcepts: number, logsDir: string) {
  return await new Promise<boolean>((resolve) => {
    const label = safeLabel(partition);
    const outStream = createWriteStream(join(logsDir, `${label}.out.log`), { flags: "a" });
    const errStream = createWriteStream(join(logsDir, `${label}.err.log`), { flags: "a" });
    const child = spawn(
      process.platform === "win32" ? "cmd.exe" : "npm",
      process.platform === "win32"
        ? ["/c", "npm.cmd", ...workerCommand(competitionSlug, partition, maxNewConcepts)]
        : workerCommand(competitionSlug, partition, maxNewConcepts),
      {
        env: {
          ...process.env,
          NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED ?? "0"
        },
        shell: false,
        windowsHide: true
      }
    );

    console.log(`[${label}] started`);

    child.stdout.on("data", (chunk) => {
      outStream.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      errStream.write(chunk);
    });
    child.on("error", (error) => {
      console.error(`[${label}] spawn error:`, error);
      outStream.end();
      errStream.end();
      resolve(false);
    });
    child.on("close", (code) => {
      outStream.end();
      errStream.end();
      if (code === 0) {
        console.log(`[${label}] done`);
        resolve(true);
      } else {
        console.error(`[${label}] exited with code ${code}`);
        resolve(false);
      }
    });
  });
}

async function main() {
  const competitionSlug = readArg("competition") ?? "science-bowl";
  const concurrency = parsePositiveInt(readArg("concurrency"), 4);
  const maxNewConcepts = parsePositiveInt(readArg("max-new-concepts"), 5000);
  const logsDir = join(process.cwd(), "concept-batch-logs");
  mkdirSync(logsDir, { recursive: true });

  const partitions = await getPartitions(competitionSlug);
  console.log(JSON.stringify({ competitionSlug, concurrency, maxNewConcepts, partitions }, null, 2));

  let cursor = 0;
  let failures = 0;
  const workers = Array.from({ length: Math.min(concurrency, partitions.length) }, async () => {
    while (cursor < partitions.length) {
      const index = cursor;
      cursor += 1;
      const partition = partitions[index];
      if (!partition) return;
      const ok = await runWorker(competitionSlug, partition, maxNewConcepts, logsDir);
      if (!ok) {
        failures += 1;
      }
    }
  });

  await Promise.all(workers);
  console.log(JSON.stringify({ done: true, failures }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
