/**
 * Canonical subject-slug formula shared across routes, sitemap, and data readers.
 * Matches the dominant existing pattern: `name.toLowerCase().replace(/[\s&]+/g, "-")`
 *
 * NOTE: This MUST produce the same output as before for all real subject names
 * (verified by src/lib/subjects.test.ts) so that existing indexed URLs remain stable.
 */
export function slugifySubject(name: string): string {
  return name.toLowerCase().replace(/[\s&]+/g, "-");
}

const SUBJECT_EMOJI: Record<string, string> = {
  "Biology": "🧬",
  "Chemistry": "⚗️",
  "Physics": "⚛️",
  "Earth and Space": "🌍",
  "Energy": "⚡",
  "Math": "∑",
};

/**
 * Emoji for the six canonical Science Bowl subjects. Returns "📚" for anything else.
 */
export function subjectEmoji(name: string): string {
  return SUBJECT_EMOJI[name] ?? "📚";
}

const COMPETITION_EMOJI: Record<string, string> = {
  "science-bowl": "🧪",
  "science-olympiad": "🔬",
  "math-olympiad": "∑",
};

/**
 * Emoji for a competition slug. Returns "🏆" for unrecognised slugs.
 */
export function competitionEmoji(slug: string): string {
  return COMPETITION_EMOJI[slug] ?? "🏆";
}
