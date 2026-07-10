// Shared helpers for rendering NSB lesson content sections
// (see src/data/nsbQuestions.ts getNsbLessonContent, which splits raw
// markdown into { heading, body } sections but does not parse markdown
// tables — some lesson bodies use "| Clue | Answer |" tables instead of
// plain numbered lists).

const TABLE_SEPARATOR_ROW = /^\|[\s:|-]+\|$/;

function isTableRow(line: string): boolean {
  return line.startsWith("|") && line.endsWith("|");
}

function tableRowToClue(line: string): string {
  const cells = line
    .slice(1, -1)
    .split("|")
    .map((c) => c.trim());
  return cells.join(" — ");
}

// Splits a content-section body into display lines, turning markdown table
// data rows into "cell — cell" text. Drops the table header row and its
// "|---|---|" separator so a "| Clue phrase | Answer |" heading never
// renders as its own clue/fact card.
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

    result.push(isTableRow(line) ? tableRowToClue(line) : line.replace(/^\d+\.\s*/, ""));
  }
  return result;
}
