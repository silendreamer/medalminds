import type { PracticeQuestion } from "@/types";

export function getDisplayText(question: PracticeQuestion): string {
  return question.displayText ?? question.prompt;
}

export function getDisplayChoices(question: PracticeQuestion): string[] {
  if (question.displayChoices && question.displayChoices.length > 0) {
    return question.displayChoices;
  }
  return question.choices ?? [];
}

export function getDisplayChoice(question: PracticeQuestion, index: number): string {
  const choices = getDisplayChoices(question);
  return choices[index] ?? question.choices?.[index] ?? "";
}

export function getDisplayCorrectAnswer(question: PracticeQuestion): string {
  if (question.displayChoices && question.choices) {
    const idx = question.choices.indexOf(question.correctAnswer);
    if (idx !== -1 && question.displayChoices[idx]) {
      return question.displayChoices[idx];
    }
  }
  return question.correctAnswer;
}
