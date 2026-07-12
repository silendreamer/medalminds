/**
 * Normalize an answer string for comparison: trim, lowercase, collapse internal whitespace.
 */
export function normalizeAnswer(v: string): string {
  return v.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Check whether `answer` matches the question's correct answer or any of its alternateAnswers.
 * Comparison is case-insensitive and whitespace-collapsed.
 */
export function isAnswerCorrect(
  question: { correctAnswer: string; alternateAnswers?: string[] },
  answer: string
): boolean {
  const accepted = [question.correctAnswer, ...(question.alternateAnswers ?? [])].map(normalizeAnswer);
  return accepted.includes(normalizeAnswer(answer));
}
