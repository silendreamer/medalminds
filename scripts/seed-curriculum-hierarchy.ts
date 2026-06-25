/**
 * seed-curriculum-hierarchy.ts
 *
 * Seeds the Subject → Topic → SubTopic hierarchy for the Science Bowl
 * competition from the lesson plan tree.
 *
 * Usage:
 *   npx tsx scripts/seed-curriculum-hierarchy.ts            # dry run
 *   npx tsx scripts/seed-curriculum-hierarchy.ts --write    # apply
 *
 * Idempotent: uses upsert on every row, safe to re-run.
 */

import "dotenv/config";
import { config as loadDotenv } from "dotenv";
import { getPrisma } from "../src/lib/db";

loadDotenv({ path: ".env.local", override: false });

const dryRun = !process.argv.includes("--write");

// ── Helper ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function id(...parts: string[]): string {
  return parts.map(slugify).join("--");
}

// ── Lesson plan tree ─────────────────────────────────────────────────────────
// Structure: Subject → Topic[] → SubTopic[]

type Tree = {
  name: string;
  topics: {
    name: string;
    subTopics: string[];
  }[];
}[];

const TREE: Tree = [
  {
    name: "Life Science",
    topics: [
      {
        name: "Cells: The Fundamental Unit of Life",
        subTopics: [
          "Cell Structure & Function",
          "Cell Membrane & Transport",
          "Photosynthesis",
          "Cellular Respiration",
        ],
      },
      {
        name: "Genetics & Heredity",
        subTopics: [
          "DNA & Genes",
          "Traits & Inheritance",
          "Punnett Squares",
          "Genetic Variation",
        ],
      },
      {
        name: "Human Body Systems",
        subTopics: [
          "Circulatory System",
          "Respiratory System",
          "Digestive System",
          "Nervous System",
        ],
      },
      {
        name: "Evolution & Natural Selection",
        subTopics: [
          "Adaptations",
          "Fossil Evidence",
          "Survival & Reproduction",
          "Speciation Basics",
        ],
      },
      {
        name: "Ecology",
        subTopics: [
          "Ecosystems",
          "Food Chains & Food Webs",
          "Energy Flow",
          "Population Dynamics",
        ],
      },
      {
        name: "Plant Biology",
        subTopics: [
          "Plant Structures",
          "Photosynthesis",
          "Reproduction",
          "Adaptations",
        ],
      },
    ],
  },
  {
    name: "Physical Science",
    topics: [
      {
        name: "Matter & Atomic Theory",
        subTopics: ["Atoms", "Elements", "Compounds", "Periodic Table Patterns"],
      },
      {
        name: "Chemical Reactions",
        subTopics: [
          "Reactants & Products",
          "Conservation of Mass",
          "Acids & Bases",
          "Energy Changes",
        ],
      },
      {
        name: "Forces & Motion",
        subTopics: [
          "Newton's Laws",
          "Velocity & Acceleration",
          "Friction",
          "Momentum",
        ],
      },
      {
        name: "Energy Fundamentals",
        subTopics: [
          "Kinetic Energy",
          "Potential Energy",
          "Work & Power",
          "Conservation of Energy",
        ],
      },
      {
        name: "Waves",
        subTopics: [
          "Frequency",
          "Wavelength",
          "Sound Waves",
          "Electromagnetic Waves",
        ],
      },
      {
        name: "Electricity & Magnetism",
        subTopics: [
          "Electric Charge",
          "Current & Voltage",
          "Circuits",
          "Magnetism",
        ],
      },
    ],
  },
  {
    name: "Earth & Space Science",
    topics: [
      {
        name: "Earth's Structure",
        subTopics: ["Crust", "Mantle", "Core", "Rock Cycle"],
      },
      {
        name: "Plate Tectonics",
        subTopics: [
          "Continental Drift",
          "Earthquakes",
          "Volcanoes",
          "Mountain Formation",
        ],
      },
      {
        name: "Weather & Climate",
        subTopics: [
          "Atmosphere",
          "Air Masses",
          "Storm Systems",
          "Climate Patterns",
        ],
      },
      {
        name: "Water Systems",
        subTopics: [
          "Water Cycle",
          "Oceans",
          "Currents",
          "Freshwater Systems",
        ],
      },
      {
        name: "Solar System",
        subTopics: ["Sun", "Planets", "Moons", "Small Bodies"],
      },
      {
        name: "Universe & Astronomy",
        subTopics: ["Stars", "Galaxies", "Gravity", "Cosmology Basics"],
      },
    ],
  },
  {
    name: "Energy",
    topics: [
      {
        name: "Energy Principles",
        subTopics: [
          "Forms of Energy",
          "Energy Transfer",
          "Conservation Laws",
          "Efficiency",
        ],
      },
      {
        name: "Renewable Energy",
        subTopics: ["Solar Power", "Wind Power", "Hydropower", "Geothermal"],
      },
      {
        name: "Nuclear Energy",
        subTopics: ["Atomic Structure", "Fission", "Fusion", "Reactor Basics"],
      },
      {
        name: "Fossil Fuels",
        subTopics: ["Coal", "Oil", "Natural Gas", "Environmental Impact"],
      },
      {
        name: "Electrical Grid",
        subTopics: ["Power Generation", "Transmission", "Distribution", "Storage"],
      },
      {
        name: "Future Energy Systems",
        subTopics: [
          "Batteries",
          "Hydrogen",
          "Smart Grids",
          "DOE Research Areas",
        ],
      },
    ],
  },
  {
    name: "Mathematics",
    topics: [
      {
        name: "Number Sense",
        subTopics: ["Fractions", "Decimals", "Percentages", "Mental Math"],
      },
      {
        name: "Ratios & Proportional Reasoning",
        subTopics: ["Ratios", "Rates", "Scale Factors", "Unit Conversions"],
      },
      {
        name: "Algebra Foundations",
        subTopics: ["Expressions", "Equations", "Inequalities", "Functions"],
      },
      {
        name: "Geometry Essentials",
        subTopics: ["Angles", "Triangles", "Circles", "Coordinate Geometry"],
      },
      {
        name: "Counting & Probability",
        subTopics: [
          "Basic Counting",
          "Permutations",
          "Combinations",
          "Probability",
        ],
      },
      {
        name: "Data & Statistics",
        subTopics: ["Mean", "Median", "Variability", "Data Interpretation"],
      },
      {
        name: "Competition Problem Solving",
        subTopics: [
          "Pattern Recognition",
          "Logic Problems",
          "Mathematical Modeling",
          "Multi-Step Reasoning",
        ],
      },
      {
        name: "Speed Mathematics",
        subTopics: [
          "Mental Computation",
          "Estimation",
          "Shortcut Techniques",
          "Contest Strategies",
        ],
      },
    ],
  },
];

// ── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  const prisma = getPrisma();

  if (dryRun) {
    console.log("dry-run — pass --write to apply\n");
  }

  const COMPETITION_ID = "science-bowl";

  let subjectCount = 0;
  let topicCount = 0;
  let subTopicCount = 0;

  for (const [subjectOrder, subject] of TREE.entries()) {
    const subjectSlug = slugify(subject.name);
    const subjectId = id("subj", subject.name);

    console.log(`\n[Subject ${subjectOrder + 1}] ${subject.name}  (${subjectId})`);

    if (!dryRun) {
      await prisma.subject.upsert({
        where: { id: subjectId },
        create: {
          id: subjectId,
          competitionId: COMPETITION_ID,
          name: subject.name,
          slug: subjectSlug,
          order: subjectOrder,
        },
        update: {
          name: subject.name,
          slug: subjectSlug,
          order: subjectOrder,
          updatedAt: new Date(),
        },
      });
    }
    subjectCount++;

    for (const [topicOrder, topic] of subject.topics.entries()) {
      const topicSlug = slugify(topic.name);
      const topicId = id("topic", subject.name, topic.name);

      console.log(`  [Topic ${topicOrder + 1}] ${topic.name}`);

      if (!dryRun) {
        await prisma.topic.upsert({
          where: { id: topicId },
          create: {
            id: topicId,
            subjectId: subjectId,
            name: topic.name,
            slug: topicSlug,
            order: topicOrder,
          },
          update: {
            name: topic.name,
            slug: topicSlug,
            order: topicOrder,
            updatedAt: new Date(),
          },
        });
      }
      topicCount++;

      for (const [stOrder, stName] of topic.subTopics.entries()) {
        const stSlug = slugify(stName);
        const stId = id("st", subject.name, topic.name, stName);

        console.log(`    [SubTopic ${stOrder + 1}] ${stName}`);

        if (!dryRun) {
          await prisma.subTopic.upsert({
            where: { id: stId },
            create: {
              id: stId,
              topicId: topicId,
              name: stName,
              slug: stSlug,
              order: stOrder,
            },
            update: {
              name: stName,
              slug: stSlug,
              order: stOrder,
              updatedAt: new Date(),
            },
          });
        }
        subTopicCount++;
      }
    }
  }

  console.log("\n=== Summary ===");
  console.log(`  Subjects:  ${subjectCount}`);
  console.log(`  Topics:    ${topicCount}`);
  console.log(`  SubTopics: ${subTopicCount}`);

  if (dryRun) {
    console.log("\n(no changes written — pass --write to apply)");
  } else {
    console.log("\nDone.");
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
