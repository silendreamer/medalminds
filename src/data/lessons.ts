import type { CompetitionSlug, Lesson } from "@/types";

const topics: Record<CompetitionSlug, Array<{ title: string; category: string; concept: string }>> = {
  "science-bowl": [
    { title: "Cell Energy in Quick Recall", category: "Biology", concept: "ATP and organelles" },
    { title: "Acids, Bases, and Fast pH Reasoning", category: "Chemistry", concept: "pH scale" },
    { title: "Newton's Laws for Toss-Ups", category: "Physics", concept: "force and motion" },
    { title: "Earth Layers and Magnetic Fields", category: "Earth & Space", concept: "Earth structure" },
    { title: "Energy Forms and Transfers", category: "Energy", concept: "energy conservation" },
    { title: "Mental Percent Math", category: "Math", concept: "percent shortcuts" },
    { title: "DNA to RNA Essentials", category: "Biology", concept: "transcription" },
    { title: "Catalysts and Reaction Pathways", category: "Chemistry", concept: "activation energy" },
    { title: "Simple Machines Under Pressure", category: "Physics", concept: "mechanical advantage" },
    { title: "Reading Stellar Diagrams", category: "Earth & Space", concept: "stellar luminosity" }
  ],
  "science-olympiad": [
    { title: "Cardiovascular Flow Map", category: "Anatomy", concept: "heart circulation" },
    { title: "Spectra as Evidence", category: "Astronomy", concept: "light analysis" },
    { title: "Incidence, Prevalence, and Outbreak Clues", category: "Disease Detectives", concept: "epidemiology measures" },
    { title: "Plate Boundaries in Event Diagrams", category: "Dynamic Planet", concept: "tectonic motion" },
    { title: "Chromatography Notes for Labs", category: "Forensics", concept: "Rf values" },
    { title: "Lever Systems and Mechanical Advantage", category: "Machines", concept: "simple machines" },
    { title: "Respiratory Exchange Models", category: "Anatomy", concept: "alveoli" },
    { title: "Transit Method Basics", category: "Astronomy", concept: "exoplanet detection" },
    { title: "Mineral ID by Hardness", category: "Dynamic Planet", concept: "Mohs scale" },
    { title: "Class vs Individual Evidence", category: "Forensics", concept: "evidence comparison" }
  ],
  "math-olympiad": [
    { title: "GCD Strategy and Prime Factors", category: "Number Theory", concept: "divisibility" },
    { title: "Symmetric Expressions", category: "Algebra", concept: "squaring substitutions" },
    { title: "Polygon Angle Sums", category: "Geometry", concept: "triangulation" },
    { title: "Counting Without Order", category: "Combinatorics", concept: "combinations" },
    { title: "Probability as Favorable Over Total", category: "Probability", concept: "sample spaces" },
    { title: "Set Logic with Diagrams", category: "Logic", concept: "deduction" },
    { title: "Modular Cycles", category: "Number Theory", concept: "remainders" },
    { title: "Completing the Square", category: "Algebra", concept: "quadratic minima" },
    { title: "Right Triangle Recognition", category: "Geometry", concept: "Pythagorean triples" },
    { title: "Parity in Subset Counts", category: "Combinatorics", concept: "bijections" }
  ]
};

const levelByCompetition: Record<CompetitionSlug, string> = {
  "science-bowl": "Mixed Bowl Prep",
  "science-olympiad": "Event Foundation",
  "math-olympiad": "Olympiad Builder"
};

const sectionVoice: Record<CompetitionSlug, string> = {
  "science-bowl": "Keep the definition crisp, then connect it to one common clue phrase that might appear in a quick question.",
  "science-olympiad": "Start with the event task, identify what evidence matters, and translate the concept into a diagram or table.",
  "math-olympiad": "Write the known facts, choose a compact strategy, and justify each step before calculating."
};

export const lessons: Lesson[] = (Object.keys(topics) as CompetitionSlug[]).flatMap((competitionSlug) =>
  topics[competitionSlug].map((topic, index) => {
    const number = index + 1;
    const slug = topic.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: `${competitionSlug}-lesson-${number}`,
      slug,
      competitionSlug,
      title: topic.title,
      category: topic.category,
      level: levelByCompetition[competitionSlug],
      estimatedMinutes: 8 + (index % 5) * 3,
      summary: `A focused lesson on ${topic.concept} for ${topic.category} preparation.`,
      keyConcepts: [
        topic.concept,
        `Common ${topic.category} vocabulary`,
        "When to use the idea in a timed setting"
      ],
      contentSections: [
        {
          heading: "Core Idea",
          body: `${topic.concept} becomes easier when you name the quantities, units, or structures involved before solving. ${sectionVoice[competitionSlug]}`
        },
        {
          heading: "Practice Move",
          body: `Build a one-line checklist for ${topic.category}: identify the prompt clue, select the relevant rule, then verify the answer against the context.`
        },
        {
          heading: "Common Trap",
          body: `Do not stop at a memorized keyword. Confirm that the answer matches the requested direction, scale, or comparison in the question.`
        }
      ],
      reviewQuestions: [
        `What clue would tell you this is a ${topic.concept} problem?`,
        `What is one mistake students make in ${topic.category}?`,
        "How would you check your answer under time pressure?"
      ]
    };
  })
);
