import type { PracticeQuestion } from "@/types";

// Dynamically import the NSB questions JSON
// This allows the data layer to use the linked lesson data
// Note: This is loaded at build time and memoized in memory
let nsbQuestionsCache: PracticeQuestion[] | null = null;

export async function getNsbQuestions(): Promise<PracticeQuestion[]> {
  if (nsbQuestionsCache) {
    return nsbQuestionsCache;
  }

  try {
    // Import the JSON file dynamically
    const { default: rawQuestions } = await import("../../docs/nsb/questions.json");

    // Convert raw JSON to PracticeQuestion format
    nsbQuestionsCache = rawQuestions.map((q: any) => ({
      id: q.id,
      competitionSlug: q.competitionSlug as "science-bowl",
      category: q.category,
      level: q.schoolLevel === "MIDDLE_SCHOOL" ? "Middle School" : "High School",
      difficulty: q.difficulty === "FOUNDATIONAL" ? "Foundational" : q.difficulty === "ADVANCED" ? "Advanced" : "Intermediate",
      type: q.format === "multiple_choice" ? "multiple_choice" : "short_answer",
      prompt: q.text,
      choices: q.choices && q.choices.length > 0 ? q.choices : undefined,
      correctAnswer: q.answer,
      explanation: "", // NSB JSON doesn't have explanations; we could add them separately
      lessonIds: q.lessonIds || []
    }));

    return nsbQuestionsCache;
  } catch (error) {
    console.warn("Failed to load NSB questions from JSON:", error);
    return [];
  }
}

export async function getNsbLessons() {
  try {
    const { default: rawLessons } = await import("../../docs/nsb/lessons.json");
    return rawLessons;
  } catch (error) {
    console.warn("Failed to load NSB lessons from JSON:", error);
    return [];
  }
}
