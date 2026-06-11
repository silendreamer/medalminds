import type { PracticeQuestion } from "@/types";

const scienceBowlQuestions: PracticeQuestion[] = [
  {
    id: "sb-q1",
    competitionSlug: "science-bowl",
    category: "Biology",
    level: "Middle School",
    difficulty: "Foundational",
    type: "multiple_choice",
    prompt: "Which organelle is the main site of ATP production in a eukaryotic cell?",
    choices: ["Ribosome", "Mitochondrion", "Golgi apparatus", "Nucleus"],
    correctAnswer: "Mitochondrion",
    explanation: "Mitochondria convert energy from food molecules into ATP through cellular respiration."
  },
  {
    id: "sb-q2",
    competitionSlug: "science-bowl",
    category: "Chemistry",
    level: "Middle School",
    difficulty: "Intermediate",
    type: "short_answer",
    prompt: "What is the pH of a neutral aqueous solution at 25 degrees Celsius?",
    correctAnswer: "7",
    alternateAnswers: ["seven", "pH 7"],
    explanation: "At 25 degrees Celsius, neutral water has equal hydrogen and hydroxide ion concentrations, giving pH 7."
  },
  {
    id: "sb-q3",
    competitionSlug: "science-bowl",
    category: "Physics",
    level: "High School",
    difficulty: "Foundational",
    type: "multiple_choice",
    prompt: "If net force on an object is zero, which quantity must remain constant?",
    choices: ["Velocity", "Acceleration", "Kinetic energy", "Mass density"],
    correctAnswer: "Velocity",
    explanation: "Zero net force means zero acceleration, so velocity remains constant unless another force acts."
  },
  {
    id: "sb-q4",
    competitionSlug: "science-bowl",
    category: "Earth & Space",
    level: "Middle School",
    difficulty: "Foundational",
    type: "multiple_choice",
    prompt: "Which layer of Earth is liquid and helps generate the magnetic field?",
    choices: ["Crust", "Mantle", "Outer core", "Inner core"],
    correctAnswer: "Outer core",
    explanation: "Motion of liquid iron-rich material in the outer core contributes to Earth's magnetic field."
  },
  {
    id: "sb-q5",
    competitionSlug: "science-bowl",
    category: "Energy",
    level: "High School",
    difficulty: "Intermediate",
    type: "short_answer",
    prompt: "Name the energy stored in an object because of its height in a gravitational field.",
    correctAnswer: "gravitational potential energy",
    alternateAnswers: ["potential energy"],
    explanation: "Gravitational potential energy depends on mass, gravitational field strength, and height."
  },
  {
    id: "sb-q6",
    competitionSlug: "science-bowl",
    category: "Math",
    level: "Middle School",
    difficulty: "Foundational",
    type: "short_answer",
    prompt: "What is 15 percent of 80?",
    correctAnswer: "12",
    alternateAnswers: ["twelve"],
    explanation: "15 percent is 0.15, and 0.15 times 80 equals 12."
  },
  {
    id: "sb-q7",
    competitionSlug: "science-bowl",
    category: "Biology",
    level: "High School",
    difficulty: "Advanced",
    type: "multiple_choice",
    prompt: "During transcription, DNA is used as a template to produce which molecule?",
    choices: ["Protein", "mRNA", "Lipid", "Glycogen"],
    correctAnswer: "mRNA",
    explanation: "Transcription copies genetic information from DNA into messenger RNA."
  },
  {
    id: "sb-q8",
    competitionSlug: "science-bowl",
    category: "Chemistry",
    level: "High School",
    difficulty: "Intermediate",
    type: "multiple_choice",
    prompt: "A catalyst speeds a reaction mainly by lowering what?",
    choices: ["Atomic number", "Activation energy", "Final product mass", "Conservation of charge"],
    correctAnswer: "Activation energy",
    explanation: "Catalysts provide an alternate pathway with lower activation energy."
  },
  {
    id: "sb-q9",
    competitionSlug: "science-bowl",
    category: "Physics",
    level: "Middle School",
    difficulty: "Foundational",
    type: "short_answer",
    prompt: "What simple machine is a ramp an example of?",
    correctAnswer: "inclined plane",
    alternateAnswers: ["an inclined plane"],
    explanation: "A ramp reduces the force needed to raise an object by increasing the distance over which work is done."
  },
  {
    id: "sb-q10",
    competitionSlug: "science-bowl",
    category: "Earth & Space",
    level: "High School",
    difficulty: "Advanced",
    type: "multiple_choice",
    prompt: "Which stellar property is plotted against luminosity on an H-R diagram?",
    choices: ["Surface temperature", "Orbital radius", "Magnetic polarity", "Age only"],
    correctAnswer: "Surface temperature",
    explanation: "Hertzsprung-Russell diagrams compare stellar luminosity with surface temperature or spectral class."
  }
];

const scienceOlympiadQuestions: PracticeQuestion[] = [
  {
    id: "so-q1",
    competitionSlug: "science-olympiad",
    category: "Anatomy",
    level: "Division B",
    difficulty: "Foundational",
    type: "multiple_choice",
    prompt: "Which chamber pumps oxygenated blood into the aorta?",
    choices: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
    correctAnswer: "Left ventricle",
    explanation: "The left ventricle has thick muscle that pumps oxygenated blood to the body through the aorta."
  },
  {
    id: "so-q2",
    competitionSlug: "science-olympiad",
    category: "Astronomy",
    level: "Division C",
    difficulty: "Intermediate",
    type: "short_answer",
    prompt: "What instrument separates starlight into wavelengths for composition analysis?",
    correctAnswer: "spectroscope",
    alternateAnswers: ["spectrometer"],
    explanation: "A spectroscope or spectrometer reveals absorption and emission lines linked to elements."
  },
  {
    id: "so-q3",
    competitionSlug: "science-olympiad",
    category: "Disease Detectives",
    level: "Division B",
    difficulty: "Foundational",
    type: "multiple_choice",
    prompt: "In an outbreak investigation, which measure describes new cases over a time period?",
    choices: ["Prevalence", "Incidence", "Latency", "Specificity"],
    correctAnswer: "Incidence",
    explanation: "Incidence tracks newly occurring cases during a defined interval."
  },
  {
    id: "so-q4",
    competitionSlug: "science-olympiad",
    category: "Dynamic Planet",
    level: "Division C",
    difficulty: "Intermediate",
    type: "multiple_choice",
    prompt: "Which plate boundary most often creates mid-ocean ridges?",
    choices: ["Convergent", "Divergent", "Transform", "Passive"],
    correctAnswer: "Divergent",
    explanation: "At divergent boundaries, plates move apart and magma rises to form new oceanic crust."
  },
  {
    id: "so-q5",
    competitionSlug: "science-olympiad",
    category: "Forensics",
    level: "Division C",
    difficulty: "Intermediate",
    type: "short_answer",
    prompt: "What chromatography value is calculated as distance traveled by solute divided by distance traveled by solvent front?",
    correctAnswer: "Rf",
    alternateAnswers: ["retention factor", "relative front"],
    explanation: "The Rf value helps compare substances under the same chromatography conditions."
  },
  {
    id: "so-q6",
    competitionSlug: "science-olympiad",
    category: "Machines",
    level: "Division B",
    difficulty: "Foundational",
    type: "multiple_choice",
    prompt: "Ideal mechanical advantage of a lever depends on which ratio?",
    choices: ["Effort arm to resistance arm", "Mass to volume", "Velocity to time", "Heat to work"],
    correctAnswer: "Effort arm to resistance arm",
    explanation: "For an ideal lever, mechanical advantage is the effort arm length divided by resistance arm length."
  },
  {
    id: "so-q7",
    competitionSlug: "science-olympiad",
    category: "Anatomy",
    level: "Division C",
    difficulty: "Advanced",
    type: "short_answer",
    prompt: "What tiny air sacs are the main sites of gas exchange in the lungs?",
    correctAnswer: "alveoli",
    alternateAnswers: ["alveolus"],
    explanation: "Alveoli provide large surface area and thin walls for oxygen and carbon dioxide exchange."
  },
  {
    id: "so-q8",
    competitionSlug: "science-olympiad",
    category: "Astronomy",
    level: "Division B",
    difficulty: "Intermediate",
    type: "multiple_choice",
    prompt: "A planet crossing in front of its star can be detected by which change?",
    choices: ["Brief dimming", "Permanent color loss", "Sudden mass gain", "Crust folding"],
    correctAnswer: "Brief dimming",
    explanation: "The transit method detects small dips in stellar brightness when a planet passes in front."
  },
  {
    id: "so-q9",
    competitionSlug: "science-olympiad",
    category: "Dynamic Planet",
    level: "Division B",
    difficulty: "Foundational",
    type: "short_answer",
    prompt: "What scale is commonly used to describe mineral hardness from 1 to 10?",
    correctAnswer: "Mohs scale",
    alternateAnswers: ["Mohs hardness scale"],
    explanation: "The Mohs scale ranks minerals by scratch resistance."
  },
  {
    id: "so-q10",
    competitionSlug: "science-olympiad",
    category: "Forensics",
    level: "Division C",
    difficulty: "Advanced",
    type: "multiple_choice",
    prompt: "Which evidence class is usually individual rather than class evidence?",
    choices: ["Blood type", "Shoe size", "DNA profile", "Fiber color"],
    correctAnswer: "DNA profile",
    explanation: "A DNA profile can strongly distinguish an individual, while the others usually group people."
  }
];

const mathOlympiadQuestions: PracticeQuestion[] = [
  {
    id: "mo-q1",
    competitionSlug: "math-olympiad",
    category: "Number Theory",
    level: "Intro Olympiad",
    difficulty: "Foundational",
    type: "short_answer",
    prompt: "What is the greatest common divisor of 84 and 126?",
    correctAnswer: "42",
    alternateAnswers: ["forty-two", "forty two"],
    explanation: "84 = 2 x 42 and 126 = 3 x 42, so 42 is the largest shared divisor."
  },
  {
    id: "mo-q2",
    competitionSlug: "math-olympiad",
    category: "Algebra",
    level: "Intro Olympiad",
    difficulty: "Foundational",
    type: "multiple_choice",
    prompt: "If x + 1/x = 3, what is x^2 + 1/x^2?",
    choices: ["5", "7", "9", "11"],
    correctAnswer: "7",
    explanation: "Square both sides: x^2 + 2 + 1/x^2 = 9, so x^2 + 1/x^2 = 7."
  },
  {
    id: "mo-q3",
    competitionSlug: "math-olympiad",
    category: "Geometry",
    level: "Intro Olympiad",
    difficulty: "Foundational",
    type: "short_answer",
    prompt: "What is the sum of the interior angles of a hexagon, in degrees?",
    correctAnswer: "720",
    alternateAnswers: ["720 degrees"],
    explanation: "An n-gon has angle sum (n - 2) x 180. For n = 6, that is 4 x 180 = 720."
  },
  {
    id: "mo-q4",
    competitionSlug: "math-olympiad",
    category: "Combinatorics",
    level: "Intro Olympiad",
    difficulty: "Intermediate",
    type: "multiple_choice",
    prompt: "How many ways can 3 students be chosen from 7 students?",
    choices: ["21", "35", "42", "210"],
    correctAnswer: "35",
    explanation: "Use combinations: C(7,3) = 7 x 6 x 5 / (3 x 2 x 1) = 35."
  },
  {
    id: "mo-q5",
    competitionSlug: "math-olympiad",
    category: "Probability",
    level: "Intro Olympiad",
    difficulty: "Foundational",
    type: "short_answer",
    prompt: "A fair die is rolled once. What is the probability of rolling an even number?",
    correctAnswer: "1/2",
    alternateAnswers: ["0.5", "50%", "one half"],
    explanation: "The even outcomes are 2, 4, and 6, giving 3 favorable outcomes out of 6."
  },
  {
    id: "mo-q6",
    competitionSlug: "math-olympiad",
    category: "Logic",
    level: "Intro Olympiad",
    difficulty: "Intermediate",
    type: "multiple_choice",
    prompt: "If every A is B and no B is C, which statement must be true?",
    choices: ["Some A is C", "No A is C", "Every C is A", "Some B is A"],
    correctAnswer: "No A is C",
    explanation: "All A objects lie inside B, and B has no overlap with C, so A cannot overlap C."
  },
  {
    id: "mo-q7",
    competitionSlug: "math-olympiad",
    category: "Number Theory",
    level: "Olympiad Builder",
    difficulty: "Advanced",
    type: "short_answer",
    prompt: "What is the remainder when 2^10 is divided by 7?",
    correctAnswer: "2",
    alternateAnswers: ["remainder 2"],
    explanation: "Powers of 2 mod 7 cycle 2, 4, 1. Since 10 leaves remainder 1 when divided by 3, 2^10 has remainder 2."
  },
  {
    id: "mo-q8",
    competitionSlug: "math-olympiad",
    category: "Algebra",
    level: "Olympiad Builder",
    difficulty: "Intermediate",
    type: "multiple_choice",
    prompt: "For real x, what is the minimum value of x^2 - 6x + 13?",
    choices: ["1", "3", "4", "13"],
    correctAnswer: "4",
    explanation: "Complete the square: x^2 - 6x + 13 = (x - 3)^2 + 4, whose minimum is 4."
  },
  {
    id: "mo-q9",
    competitionSlug: "math-olympiad",
    category: "Geometry",
    level: "Olympiad Builder",
    difficulty: "Intermediate",
    type: "short_answer",
    prompt: "A right triangle has legs 9 and 12. What is its hypotenuse?",
    correctAnswer: "15",
    alternateAnswers: ["15 units"],
    explanation: "By the Pythagorean theorem, c^2 = 9^2 + 12^2 = 225, so c = 15."
  },
  {
    id: "mo-q10",
    competitionSlug: "math-olympiad",
    category: "Combinatorics",
    level: "Olympiad Builder",
    difficulty: "Advanced",
    type: "multiple_choice",
    prompt: "How many subsets of a 5-element set have an odd number of elements?",
    choices: ["8", "12", "16", "20"],
    correctAnswer: "16",
    explanation: "Exactly half of all 2^5 subsets have odd size, so the answer is 16."
  }
];

export const practiceQuestions: PracticeQuestion[] = [
  ...scienceBowlQuestions,
  ...scienceOlympiadQuestions,
  ...mathOlympiadQuestions
];
