export type SchoolLevelFilter = "MIDDLE_SCHOOL" | "HIGH_SCHOOL";

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
