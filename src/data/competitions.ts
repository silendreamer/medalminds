import type { Competition } from "@/types";

export const competitions: Competition[] = [
  {
    slug: "science-bowl",
    name: "Science Bowl",
    shortDescription: "Fast-paced quiz practice across science and math topics.",
    description:
      "Train for buzzer-style science rounds with concise explanations, mixed categories, and quick recall drills.",
    subdomain: "science-bowl",
    subjects: ["Biology", "Chemistry", "Physics", "Earth and Space", "Energy", "Math"]
  },
  {
    slug: "science-olympiad",
    name: "Science Olympiad",
    shortDescription: "Event-oriented learning for applied science competition prep.",
    description:
      "Build concept fluency for lab, field, engineering, and analysis events through structured lessons and checks.",
    subdomain: "science-olympiad",
    subjects: ["Anatomy", "Astronomy", "Disease Detectives", "Dynamic Planet", "Forensics", "Machines"]
  },
  {
    slug: "math-olympiad",
    name: "Math Olympiad",
    shortDescription: "Proof-minded problem solving for olympiad-style math.",
    description:
      "Practice number theory, algebra, geometry, combinatorics, probability, and logic with step-by-step reasoning.",
    subdomain: "math-olympiad",
    subjects: ["Number Theory", "Algebra", "Geometry", "Combinatorics", "Probability", "Logic"]
  }
];
