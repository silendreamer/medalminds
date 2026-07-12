import type { PracticeQuestion } from "@/types";

/** Shape of each record in docs/nsb/questions.json */
export type NsbRawQuestion = {
  id: string;
  competitionSlug: string;
  category: string;
  schoolLevel: "MIDDLE_SCHOOL" | "HIGH_SCHOOL";
  difficulty: string;
  format: string;
  displayText?: string;
  text: string;
  choices?: string[];
  answerIndex?: number | null;
  answer: string;
  explainAnswer?: string[];
  lessonIds?: string[];
  subtopic?: string;
  questionKind?: "TOSS_UP" | "BONUS";
  bonusQuestionId?: string;
};

/** Shape of each record in docs/nsb/lessons.json */
export type NsbLesson = {
  id: string;
  slug: string;
  competitionSlug?: string;
  title: string;
  subject: string;
  level: string;
  topicSlug: string;
  subtopic: string;
  estimatedMinutes?: number;
  summary?: string;
  keyConcepts?: string[];
  contentPath: string;
};

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
    nsbQuestionsCache = (rawQuestions as NsbRawQuestion[]).map((q) => ({
      id: q.id,
      competitionSlug: q.competitionSlug as "science-bowl",
      subject: q.category,
      level: q.schoolLevel === "MIDDLE_SCHOOL" ? "Middle School" : "High School",
      difficulty: q.difficulty as "EASY" | "MEDIUM" | "HARD",
      type: q.format as "multiple_choice" | "short_answer",
      prompt: q.displayText || q.text,
      choices: q.choices && q.choices.length > 0 ? q.choices : undefined,
      correctAnswer: (q.choices && q.answerIndex != null) ? q.choices[q.answerIndex] : q.answer,
      explanation: "",
      explainAnswer: q.explainAnswer && q.explainAnswer.length > 0 ? q.explainAnswer : undefined,
      lessonIds: q.lessonIds || [],
      subtopic: q.subtopic,
    }));

    return nsbQuestionsCache;
  } catch (error) {
    console.warn("Failed to load NSB questions from JSON:", error);
    return [];
  }
}

export type NsbBuzzerQuestion = {
  id: string;
  category: string;
  schoolLevel: "MIDDLE_SCHOOL" | "HIGH_SCHOOL";
  format: "multiple_choice" | "short_answer";
  text: string;
  choices?: string[];
  answerIndex?: number;
  answer: string;
  questionKind?: "TOSS_UP" | "BONUS";
  bonusQuestionId?: string;
};

export type NsbBuzzerPool = {
  byId: Map<string, NsbBuzzerQuestion>;
  tossupIds: Record<"MIDDLE_SCHOOL" | "HIGH_SCHOOL", string[]>;
};

let nsbBuzzerPoolCache: NsbBuzzerPool | null = null;

// Pool for the Buzzer Arena: real Science Bowl toss-ups paired with their
// bonus question (recovered from the original round PDFs by
// scripts/derive-question-kind.mjs).
export async function getNsbBuzzerPool(): Promise<NsbBuzzerPool | null> {
  if (nsbBuzzerPoolCache) {
    return nsbBuzzerPoolCache;
  }

  try {
    const { default: rawQuestions } = await import("../../docs/nsb/questions.json");

    const byId = new Map<string, NsbBuzzerQuestion>();
    const tossupIds: NsbBuzzerPool["tossupIds"] = { MIDDLE_SCHOOL: [], HIGH_SCHOOL: [] };

    for (const q of rawQuestions as NsbRawQuestion[]) {
      const question: NsbBuzzerQuestion = {
        id: q.id,
        category: q.category,
        schoolLevel: q.schoolLevel,
        format: q.format as "multiple_choice" | "short_answer",
        text: q.displayText || q.text,
        choices: q.choices && q.choices.length > 0 ? q.choices : undefined,
        answerIndex: q.answerIndex ?? undefined,
        answer: (q.choices && q.answerIndex != null) ? q.choices[q.answerIndex] : q.answer,
        questionKind: q.questionKind,
        bonusQuestionId: q.bonusQuestionId
      };
      byId.set(question.id, question);
    }

    for (const question of byId.values()) {
      if (
        question.questionKind === "TOSS_UP" &&
        question.bonusQuestionId &&
        byId.has(question.bonusQuestionId) &&
        (question.schoolLevel === "MIDDLE_SCHOOL" || question.schoolLevel === "HIGH_SCHOOL")
      ) {
        tossupIds[question.schoolLevel].push(question.id);
      }
    }

    nsbBuzzerPoolCache = { byId, tossupIds };
    return nsbBuzzerPoolCache;
  } catch (error) {
    console.warn("Failed to load NSB buzzer pool from JSON:", error);
    return null;
  }
}

export async function getNsbLessons(): Promise<NsbLesson[]> {
  try {
    const { default: rawLessons } = await import("../../docs/nsb/lessons.json");
    return rawLessons as NsbLesson[];
  } catch (error) {
    console.warn("Failed to load NSB lessons from JSON:", error);
    return [];
  }
}

export async function getNsbLessonContent(contentPath: string): Promise<Array<{ heading: string; body: string }>> {
  try {
    // contentPath is like "content/nsb/hs/biology/scientific-inquiry/scientific-method-observation-to-conclusion.md"
    // We need to load it from docs/
    const fs = await import("fs/promises");
    const path = await import("path");

    const fullPath = path.join(process.cwd(), "docs", contentPath);
    const markdown = await fs.readFile(fullPath, "utf-8");

    // Remove frontmatter (YAML between --- markers)
    let content = markdown;
    if (content.startsWith("---")) {
      const endIndex = content.indexOf("---", 3);
      if (endIndex !== -1) {
        content = content.substring(endIndex + 3);
      }
    }

    // Parse by h4 headers (#### ) and h3 headers (### )
    const sections: Array<{ heading: string; body: string }> = [];
    const lines = content.split("\n");

    let currentSection: { heading: string; body: string } | null = null;

    for (const line of lines) {
      // Match #### or ### headers
      const h4Match = line.match(/^#### (.+)/);
      const h3Match = line.match(/^### (.+)/);

      if (h4Match || h3Match) {
        // Save previous section if it exists
        if (currentSection) {
          currentSection.body = currentSection.body.trim();
          if (currentSection.body) {
            sections.push(currentSection);
          }
        }
        // Start new section
        const heading = (h4Match || h3Match)?.[1]?.trim() || "";
        currentSection = { heading, body: "" };
      } else if (currentSection && line.trim()) {
        // Skip empty lines at the start of a section
        if (currentSection.body || line.trim()) {
          currentSection.body += line + "\n";
        }
      }
    }

    // Don't forget the last section
    if (currentSection && currentSection.body.trim()) {
      currentSection.body = currentSection.body.trim();
      sections.push(currentSection);
    }

    return sections;
  } catch (error) {
    console.warn(`Failed to load NSB lesson content from ${contentPath}:`, error);
    return [];
  }
}
