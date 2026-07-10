// Shared helpers for rendering NSB lesson content sections
// (see src/data/nsbQuestions.ts getNsbLessonContent, which splits raw
// markdown into { heading, body } sections but does not parse markdown
// tables — some lesson bodies use "| Clue | Answer |" tables instead of
// plain numbered lists).

const TABLE_SEPARATOR_ROW = /^\|[\s:|-]+\|$/;

function isTableRow(line: string): boolean {
  return line.startsWith("|") && line.endsWith("|");
}

function splitTableRow(line: string): string[] {
  return line
    .slice(1, -1)
    .split("|")
    .map((c) => c.trim());
}

export interface LessonTable {
  header: string[];
  rows: string[][];
}

// If a section body is (or starts with) a markdown table, returns its
// header + data rows plus any remaining non-table lines after it.
// Otherwise returns null.
export function parseLessonTable(body: string): { table: LessonTable; rest: string[] } | null {
  const rawLines = body
    .replace(/\n?---\s*$/, "")
    .trim()
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (rawLines.length < 2 || !isTableRow(rawLines[0]) || !TABLE_SEPARATOR_ROW.test(rawLines[1])) {
    return null;
  }

  const header = splitTableRow(rawLines[0]);
  const rows: string[][] = [];
  let i = 2;
  for (; i < rawLines.length; i++) {
    if (!isTableRow(rawLines[i])) break;
    rows.push(splitTableRow(rawLines[i]));
  }

  const rest = rawLines.slice(i).map((l) => l.replace(/^\d+\.\s*/, ""));
  return { table: { header, rows }, rest };
}

// Splits a content-section body into display lines, turning markdown table
// data rows into "cell — cell" text. Drops the table header row and its
// "|---|---|" separator. Used for sections that aren't rendered as a real
// table (see parseLessonTable for that case).
export function parseLessonSectionLines(body: string): string[] {
  const rawLines = body
    .replace(/\n?---\s*$/, "")
    .trim()
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const result: string[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const nextIsSeparator = TABLE_SEPARATOR_ROW.test(rawLines[i + 1] ?? "");

    if (TABLE_SEPARATOR_ROW.test(line)) continue;
    if (isTableRow(line) && nextIsSeparator) continue; // table header row

    result.push(isTableRow(line) ? splitTableRow(line).join(" — ") : line.replace(/^\d+\.\s*/, ""));
  }
  return result;
}
