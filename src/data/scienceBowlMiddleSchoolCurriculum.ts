export type ScienceBowlCurriculumGrade = {
  key: "grade-6" | "grade-7" | "grade-8";
  label: "6th Grade Foundation" | "7th Grade Intermediate" | "8th Grade Advanced";
  units: Array<{
    title: string;
    topics: string[];
  }>;
};

export type ScienceBowlCurriculumSubject = {
  slug: string;
  name: string;
  shortDescription: string;
  whyItMatters: string;
  highYieldTopics: string[];
  sources: string[];
  grades: ScienceBowlCurriculumGrade[];
};

export const scienceBowlMiddleSchoolSubjects: ScienceBowlCurriculumSubject[] = [
  {
    slug: "biology",
    name: "Biology",
    shortDescription: "Cells, genetics, physiology, ecology, and the living systems students see most often in middle-school rounds.",
    whyItMatters: "Biology tends to provide a large share of accessible middle-school Science Bowl points, especially for teams building confidence early.",
    highYieldTopics: ["Cells", "Photosynthesis", "Genetics", "Immune system", "Human physiology"],
    sources: ["Focus on Life Science", "Glencoe Biology", "Campbell Biology", "Raven Biology", "Sadava Life"],
    grades: [
      {
        key: "grade-6",
        label: "6th Grade Foundation",
        units: [
          { title: "Living Things", topics: ["Characteristics of life", "Classification of organisms"] },
          { title: "Cells", topics: ["Cell structure and function", "Plant vs animal cells"] },
          { title: "Energy in Living Systems", topics: ["Photosynthesis", "Cellular respiration"] },
          { title: "Ecology Basics", topics: ["Ecosystems", "Food chains and food webs"] },
          { title: "Human Body Overview", topics: ["Human body systems overview"] }
        ]
      },
      {
        key: "grade-7",
        label: "7th Grade Intermediate",
        units: [
          { title: "Cell Reproduction and Genetics", topics: ["Cell division (mitosis)", "DNA basics", "Genetics and heredity"] },
          { title: "Evolution", topics: ["Evolution and natural selection"] },
          { title: "Ecology and Environment", topics: ["Biomes", "Population ecology"] },
          { title: "Health and Defense", topics: ["Immune system", "Microbiology"] }
        ]
      },
      {
        key: "grade-8",
        label: "8th Grade Advanced",
        units: [
          { title: "Molecular Biology", topics: ["Protein synthesis", "Molecular genetics"] },
          { title: "Advanced Human Physiology", topics: ["Advanced physiology", "Nervous system", "Endocrine system", "Circulatory system"] },
          { title: "Diversity and Evolution", topics: ["Taxonomy", "Evolutionary biology"] }
        ]
      }
    ]
  },
  {
    slug: "chemistry",
    name: "Chemistry",
    shortDescription: "Matter, atomic structure, periodic trends, reactions, and the chemical concepts that appear most in middle-school Science Bowl.",
    whyItMatters: "Chemistry questions reward teams that can quickly recall periodic table facts, reaction types, and acid-base concepts under buzzer pressure.",
    highYieldTopics: ["Atoms and elements", "Periodic table", "Chemical reactions", "Acids and bases", "States of matter"],
    sources: [
      "Zumdahl Chemistry",
      "Physical Science (McGraw-Hill)",
      "Modern Chemistry (Holt)",
      "CK-12 Chemistry"
    ],
    grades: [
      {
        key: "grade-6",
        label: "6th Grade Foundation",
        units: [
          { title: "Matter and Its Properties", topics: ["States of matter", "Physical vs chemical changes", "Density", "Mixtures and solutions"] },
          { title: "Elements and Atoms", topics: ["Atoms", "Elements", "Periodic table basics"] }
        ]
      },
      {
        key: "grade-7",
        label: "7th Grade Intermediate",
        units: [
          { title: "Bonding and Compounds", topics: ["Molecules", "Compounds", "Ionic vs covalent bonds"] },
          { title: "Chemical Reactions", topics: ["Reaction types", "Balancing equations", "Conservation of mass"] }
        ]
      },
      {
        key: "grade-8",
        label: "8th Grade Advanced",
        units: [
          { title: "Atomic Structure and Trends", topics: ["Atomic structure", "Periodic trends", "Electron configuration basics"] },
          { title: "Advanced Reactions", topics: ["Acids and bases", "pH scale", "Reaction rates", "Catalysts"] }
        ]
      }
    ]
  },
  {
    slug: "physics",
    name: "Physics",
    shortDescription: "Motion, forces, waves, electricity, and the core mechanics and fields concepts that dominate middle-school Physics questions.",
    whyItMatters: "Physics is a high-frequency subject in Science Bowl. Teams that master Newton's Laws, energy, and wave properties can reliably score across rounds.",
    highYieldTopics: ["Forces and Newton's Laws", "Energy and work", "Waves and sound", "Electricity and circuits", "Simple machines"],
    sources: [
      "Hewitt Conceptual Physical Science",
      "Giancoli Physics",
      "Physical Science (McGraw-Hill)",
      "CK-12 Physics"
    ],
    grades: [
      {
        key: "grade-6",
        label: "6th Grade Foundation",
        units: [
          { title: "Motion and Forces", topics: ["Motion", "Speed and velocity", "Forces", "Newton's Laws"] },
          { title: "Energy and Work", topics: ["Energy", "Work and power", "Simple machines"] }
        ]
      },
      {
        key: "grade-7",
        label: "7th Grade Intermediate",
        units: [
          { title: "Waves and Light", topics: ["Waves", "Sound", "Light", "Electromagnetic spectrum"] },
          { title: "Electricity and Magnetism", topics: ["Electricity", "Magnetism", "Circuits"] }
        ]
      },
      {
        key: "grade-8",
        label: "8th Grade Advanced",
        units: [
          { title: "Advanced Mechanics", topics: ["Momentum", "Gravity", "Energy conservation", "Projectile motion"] },
          { title: "Advanced Electricity", topics: ["Advanced electricity", "Electromagnetic induction", "Nuclear physics basics"] }
        ]
      }
    ]
  },
  {
    slug: "earth-and-space",
    name: "Earth & Space",
    shortDescription: "Earth systems, geology, atmosphere, and astronomy — the standard middle-school survey topics that show up across Science Bowl rounds.",
    whyItMatters: "Earth & Space is one of the easiest areas for teams to turn broad school knowledge into real Science Bowl points quickly.",
    highYieldTopics: ["Plate tectonics", "Weather vs climate", "Solar system", "Stars", "Geologic time scale"],
    sources: ["Heath Earth Science", "Glencoe Earth Science", "Tarbuck & Lutgens", "SEEDS Foundations of Astronomy"],
    grades: [
      {
        key: "grade-6",
        label: "6th Grade Foundation",
        units: [
          { title: "Earth Materials and Cycles", topics: ["Earth's layers", "Rocks and minerals", "Rock cycle", "Water cycle", "Weather vs climate"] },
          { title: "Space Basics", topics: ["Solar system", "Moon phases", "Seasons", "Constellations"] }
        ]
      },
      {
        key: "grade-7",
        label: "7th Grade Intermediate",
        units: [
          { title: "Dynamic Earth", topics: ["Plate tectonics", "Earthquakes", "Volcanoes", "Atmospheric layers", "Ocean currents"] },
          { title: "Observing Space", topics: ["Stars", "Galaxies", "Telescopes", "Space exploration"] }
        ]
      },
      {
        key: "grade-8",
        label: "8th Grade Advanced",
        units: [
          { title: "Earth History and Systems", topics: ["Geologic time scale", "Mineral identification", "Climate science", "Earth systems interactions"] },
          { title: "Modern Astronomy", topics: ["Stellar evolution", "Black holes", "Cosmology", "Modern astronomy"] }
        ]
      }
    ]
  },
  {
    slug: "energy",
    name: "Energy",
    shortDescription: "The most underprepared subject area for many teams, covering energy sources, electricity generation, and modern systems.",
    whyItMatters: "Energy is disproportionately valuable because many middle-school teams underprepare it even though the content can be highly learnable with the right structure.",
    highYieldTopics: ["Forms of energy", "Electricity generation", "Nuclear energy", "Power grids", "Fusion vs fission"],
    sources: ["U.S. Department of Energy materials", "National Lab educational resources"],
    grades: [
      {
        key: "grade-6",
        label: "6th Grade Foundation",
        units: [
          { title: "Energy Basics", topics: ["Forms of energy", "Renewable vs nonrenewable energy", "Fossil fuels"] }
        ]
      },
      {
        key: "grade-7",
        label: "7th Grade Intermediate",
        units: [
          { title: "Energy Production", topics: ["Electricity generation", "Nuclear energy", "Solar energy", "Wind energy", "Hydroelectric power"] }
        ]
      },
      {
        key: "grade-8",
        label: "8th Grade Advanced",
        units: [
          { title: "Advanced Energy Systems", topics: ["Energy efficiency", "Power grids", "Fusion vs fission", "National laboratory research", "Emerging energy technologies"] }
        ]
      }
    ]
  },
  {
    slug: "math",
    name: "Math",
    shortDescription: "Middle-school competition math built around the computation, algebra, geometry, and interpretation skills that show up most often in Science Bowl.",
    whyItMatters: "Math questions reward teams that are fast, calm, and fluent with scientific notation, algebra, geometry, and unit-based reasoning.",
    highYieldTopics: ["Scientific notation", "Unit conversions", "Linear equations", "Geometry", "Advanced problem solving"],
    sources: ["Algebra 1", "Geometry", "Algebra 2"],
    grades: [
      {
        key: "grade-6",
        label: "6th Grade Foundation",
        units: [
          { title: "Number Skills", topics: ["Fractions", "Decimals", "Percentages", "Ratios"] },
          { title: "Science Bowl Math Tools", topics: ["Scientific notation", "Unit conversions"] }
        ]
      },
      {
        key: "grade-7",
        label: "7th Grade Intermediate",
        units: [
          { title: "Algebra Foundations", topics: ["Linear equations", "Exponents", "Square roots"] },
          { title: "Data and Chance", topics: ["Graph interpretation", "Basic probability"] }
        ]
      },
      {
        key: "grade-8",
        label: "8th Grade Advanced",
        units: [
          { title: "Algebra and Geometry", topics: ["Algebra I mastery", "Geometry fundamentals", "Coordinate geometry"] },
          { title: "Advanced Problem Solving", topics: ["Statistics", "Advanced problem solving"] }
        ]
      }
    ]
  }
];

export function getScienceBowlMiddleSchoolSubjectByName(name?: string | null) {
  if (!name) return undefined;
  const normalized = name.trim().toLowerCase();
  return scienceBowlMiddleSchoolSubjects.find(
    (subject) =>
      subject.name.toLowerCase() === normalized ||
      subject.slug === normalized.replace(/\s+/g, "-") ||
      // backward compat: old PDF names
      (subject.slug === "biology" && normalized === "life science") ||
      (subject.slug === "chemistry" && normalized === "physical science") ||
      (subject.slug === "physics" && normalized === "physical science") ||
      (subject.slug === "earth-and-space" && (normalized === "earth and space science" || normalized === "earth & space science"))
  );
}
