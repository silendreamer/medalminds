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
      subject: q.category,
      level: q.schoolLevel === "MIDDLE_SCHOOL" ? "Middle School" : "High School",
      difficulty: q.difficulty as "EASY" | "MEDIUM" | "HARD",
      type: q.format as "multiple_choice" | "short_answer",
      prompt: q.text,
      choices: q.choices && q.choices.length > 0 ? q.choices : undefined,
      correctAnswer: (q.choices && q.answerIndex != null) ? q.choices[q.answerIndex] : q.answer,
      explanation: "",
      lessonIds: q.lessonIds || [],
      subtopic: q.subtopic,
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
