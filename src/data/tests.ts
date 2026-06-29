import type { CompetitionSlug, Test } from "@/types";
import { competitions } from "./competitions";

const testThemes: Record<CompetitionSlug, string[]> = {
  "science-bowl": [
    "Rapid Mixed Science",
    "Biology and Chemistry Sprint",
    "Physics Calculation Warmup",
    "Earth and Space Round",
    "Energy Concepts Check",
    "Math for Science Bowl",
    "High School Recall Set",
    "Middle School Recall Set",
    "Category Balance Drill",
    "Endurance Mini Round"
  ],
  "science-olympiad": [
    "Event Fundamentals",
    "Anatomy and Health Set",
    "Astronomy Data Check",
    "Disease Detectives Drill",
    "Dynamic Planet Field Notes",
    "Forensics Lab Reasoning",
    "Machines Calculation Set",
    "Mixed Event Stations",
    "Diagram Interpretation",
    "Tournament Readiness"
  ],
  "math-olympiad": [
    "Number Theory Starter",
    "Algebra Transformations",
    "Geometry Essentials",
    "Combinatorics Counting",
    "Probability and Logic",
    "Mixed Short Problems",
    "Remainder Strategy",
    "Quadratic Reasoning",
    "Proof Habits",
    "Olympiad Readiness"
  ]
};

const questionIds: Record<CompetitionSlug, string[]> = {
  "science-bowl": Array.from({ length: 10 }, (_, i) => `sb-q${i + 1}`),
  "science-olympiad": Array.from({ length: 10 }, (_, i) => `so-q${i + 1}`),
  "math-olympiad": Array.from({ length: 10 }, (_, i) => `mo-q${i + 1}`)
};

const levels = ["Foundational", "Intermediate", "Advanced"];

export const tests: Test[] = competitions.flatMap((competition) =>
  testThemes[competition.slug].map((theme, index) => {
    const number = index + 1;
    const rotatedIds = [
      ...questionIds[competition.slug].slice(index % 10),
      ...questionIds[competition.slug].slice(0, index % 10)
    ].slice(0, 5 + (index % 3));

    return {
      id: `${competition.slug}-test-${number}`,
      slug: theme.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      competitionSlug: competition.slug,
      title: theme,
      level: levels[index % levels.length],
      subjects: competition.subjects.slice(index % 3, index % 3 + 3),
      timeLimitMinutes: 12 + index * 2,
      description: `A compact ${competition.name} practice test focused on ${theme.toLowerCase()} with instant review after submission.`,
      questionIds: rotatedIds
    };
  })
);
