export type SchoolLevelFilter = "MIDDLE_SCHOOL" | "HIGH_SCHOOL";

/**
 * Convert a display-format level string ("Middle School", "High School") to a
 * URL-level slug ("middle-school", "high-school"). Falls back to a lowercased,
 * hyphenated version of the input for unrecognised values.
 */
export function normalizeLevel(level: string): string {
  const l = level.toLowerCase();
  if (l.includes("middle")) return "middle-school";
  if (l.includes("high")) return "high-school";
  return l.replace(/\s+/g, "-");
}

/**
 * Parse a URL-level string (e.g. "middle-school") into the internal SchoolLevelFilter enum.
 * Returns undefined for unrecognized values.
 */
export function parseSchoolLevel(level: string): SchoolLevelFilter | undefined {
  if (level === "middle-school") return "MIDDLE_SCHOOL";
  if (level === "high-school") return "HIGH_SCHOOL";
  return undefined;
}

/**
 * Human-readable label for a URL-level string.
 * Returns "" for unrecognized values (callers that need a different default should use || "Fallback").
 */
export function schoolLevelLabel(level: string): string {
  if (level === "middle-school") return "Middle School";
  if (level === "high-school") return "High School";
  return "";
}

/**
 * Human-readable label for the internal SchoolLevelFilter enum.
 */
export function schoolLevelDisplay(filter: SchoolLevelFilter): string {
  return filter === "MIDDLE_SCHOOL" ? "Middle School" : "High School";
}
