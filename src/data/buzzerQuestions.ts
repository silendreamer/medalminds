export interface BuzzerQuestion {
  id: string;
  competitionSlug: "science-bowl";
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tossupPrompt: string;
  tossupAnswer: string;
  tossupExplanation: string;
  bonusPrompt: string;
  bonusAnswer: string;
  bonusExplanation: string;
}

export const buzzerQuestions: BuzzerQuestion[] = [
  {
    id: "bb-sb-1",
    competitionSlug: "science-bowl",
    category: "Biology",
    difficulty: "EASY",
    tossupPrompt: "What organelle is the primary site of ATP production during aerobic respiration?",
    tossupAnswer: "mitochondrion",
    tossupExplanation: "Mitochondria carry out the later stages of cellular respiration and generate most ATP in eukaryotic cells.",
    bonusPrompt: "What molecule accepts electrons at the end of the electron transport chain in aerobic respiration?",
    bonusAnswer: "oxygen",
    bonusExplanation: "Oxygen is the final electron acceptor and combines with electrons and protons to form water."
  },
  {
    id: "bb-sb-2",
    competitionSlug: "science-bowl",
    category: "Chemistry",
    difficulty: "MEDIUM",
    tossupPrompt: "What type of bond forms when atoms share pairs of electrons?",
    tossupAnswer: "covalent bond",
    tossupExplanation: "Covalent bonds involve shared electron pairs, unlike ionic bonds that involve electron transfer.",
    bonusPrompt: "What is the molecular geometry of methane, CH4?",
    bonusAnswer: "tetrahedral",
    bonusExplanation: "Methane has four bonding pairs around carbon, giving a tetrahedral geometry."
  },
  {
    id: "bb-sb-3",
    competitionSlug: "science-bowl",
    category: "Physics",
    difficulty: "EASY",
    tossupPrompt: "What quantity is equal to mass times acceleration according to Newton's second law?",
    tossupAnswer: "force",
    tossupExplanation: "Newton's second law is F = ma, so net force equals mass times acceleration.",
    bonusPrompt: "What is the SI unit of force?",
    bonusAnswer: "newton",
    bonusExplanation: "One newton is the force needed to accelerate one kilogram at one meter per second squared."
  },
  {
    id: "bb-sb-4",
    competitionSlug: "science-bowl",
    category: "Earth & Space",
    difficulty: "MEDIUM",
    tossupPrompt: "What type of galaxy contains the Milky Way's flat disk and spiral arms?",
    tossupAnswer: "spiral galaxy",
    tossupExplanation: "The Milky Way is a barred spiral galaxy with a disk, central bulge, and spiral arms.",
    bonusPrompt: "What force keeps planets in orbit around the Sun?",
    bonusAnswer: "gravity",
    bonusExplanation: "Gravity provides the centripetal force that bends planetary motion into orbits."
  },
  {
    id: "bb-sb-5",
    competitionSlug: "science-bowl",
    category: "Energy",
    difficulty: "EASY",
    tossupPrompt: "What energy transformation occurs when a solar panel produces electricity from sunlight?",
    tossupAnswer: "light energy to electrical energy",
    tossupExplanation: "Photovoltaic cells convert radiant energy from sunlight into electrical energy.",
    bonusPrompt: "What renewable energy source uses moving air to spin turbine blades?",
    bonusAnswer: "wind energy",
    bonusExplanation: "Wind turbines convert kinetic energy from moving air into electrical energy."
  },
  {
    id: "bb-sb-6",
    competitionSlug: "science-bowl",
    category: "Math",
    difficulty: "MEDIUM",
    tossupPrompt: "What is the value of 3 squared plus 4 squared?",
    tossupAnswer: "25",
    tossupExplanation: "3 squared is 9 and 4 squared is 16, so their sum is 25.",
    bonusPrompt: "What is the square root of that sum?",
    bonusAnswer: "5",
    bonusExplanation: "The square root of 25 is 5, matching the 3-4-5 right triangle."
  },
  {
    id: "bb-sb-7",
    competitionSlug: "science-bowl",
    category: "Biology",
    difficulty: "HARD",
    tossupPrompt: "What process produces RNA from a DNA template?",
    tossupAnswer: "transcription",
    tossupExplanation: "Transcription copies information from DNA into RNA using RNA polymerase.",
    bonusPrompt: "In eukaryotes, where does transcription occur?",
    bonusAnswer: "nucleus",
    bonusExplanation: "Eukaryotic DNA is housed in the nucleus, where transcription occurs before RNA processing and export."
  },
  {
    id: "bb-sb-8",
    competitionSlug: "science-bowl",
    category: "Chemistry",
    difficulty: "HARD",
    tossupPrompt: "What principle states that a stressed equilibrium shifts to reduce the stress?",
    tossupAnswer: "Le Chatelier's principle",
    tossupExplanation: "Le Chatelier's principle predicts how equilibrium systems respond to changes in concentration, pressure, or temperature.",
    bonusPrompt: "For an exothermic reaction at equilibrium, adding heat shifts the equilibrium toward which side?",
    bonusAnswer: "reactants",
    bonusExplanation: "Heat acts like a product in an exothermic reaction, so adding heat shifts equilibrium toward reactants."
  },
  {
    id: "bb-sb-9",
    competitionSlug: "science-bowl",
    category: "Physics",
    difficulty: "MEDIUM",
    tossupPrompt: "What circuit quantity is measured in ohms?",
    tossupAnswer: "resistance",
    tossupExplanation: "Resistance opposes electric current and is measured in ohms.",
    bonusPrompt: "According to Ohm's law, voltage equals current multiplied by what quantity?",
    bonusAnswer: "resistance",
    bonusExplanation: "Ohm's law is V = IR, where R is resistance."
  },
  {
    id: "bb-sb-10",
    competitionSlug: "science-bowl",
    category: "Earth & Space",
    difficulty: "EASY",
    tossupPrompt: "What layer of Earth's atmosphere contains most weather?",
    tossupAnswer: "troposphere",
    tossupExplanation: "The troposphere is the lowest atmospheric layer and contains most clouds and weather systems.",
    bonusPrompt: "What atmospheric layer contains the ozone layer that absorbs much ultraviolet radiation?",
    bonusAnswer: "stratosphere",
    bonusExplanation: "The ozone layer is located mainly in the stratosphere."
  }
];
