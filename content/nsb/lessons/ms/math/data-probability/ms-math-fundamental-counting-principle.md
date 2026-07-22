---
id: nsb-lesson-1385
title: "The Fundamental Counting Principle"
level: ms
subject: math
topic: data-probability
subtopic: "Counting Principles (Fundamental Counting Theorem)"
slug: ms-math-fundamental-counting-principle
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["Fundamental Counting Principle", "tree diagram", "multiplication rule", "ordered choices"]
summary: "Apply the Fundamental Counting Principle to count outcomes of multi-step processes."
---
#### The Principle
The **Fundamental Counting Principle** (FCP): if a process has multiple independent steps, the total number of outcomes equals the **product** of the choices at each step. If Step 1 has m choices and Step 2 has n choices, there are m × n total outcomes. Example: a restaurant offers 3 soups, 5 entrees, and 4 desserts. Total meal combinations = 3 × 5 × 4 = **60**. This extends to any number of steps: just multiply all the choice counts.

#### Tree Diagrams
A **tree diagram** visually shows all possible outcomes by branching at each choice. Start with the first choice, branch for each option, then branch again for the next choice, and so on. For flipping 2 coins: first flip (H/T) gives 2 branches. Each branches into H/T → 4 total outcomes (HH, HT, TH, TT). Tree diagrams confirm the FCP and help when the number of outcomes is small enough to list. For large counts, use the FCP directly.

#### Applying FCP with Restrictions
Sometimes choices are restricted. Example: a 3-digit number using digits 1–9 (no repetition). First digit: 9 choices. Second digit: 8 choices (one used). Third digit: 7 choices. Total = 9 × 8 × 7 = **504**. If repetition IS allowed: 9 × 9 × 9 = 729. Always read whether repetition is allowed or not — it fundamentally changes the calculation.

#### FCP for Passwords and Codes
A PIN code uses 4 digits (0–9), repetition allowed. Total PINs = 10 × 10 × 10 × 10 = 10⁴ = **10,000**. A license plate has 3 letters followed by 3 digits (repetition allowed). Total = 26³ × 10³ = 17,576 × 1,000 = **17,576,000**. FCP is the foundation for all counting problems — get this principle solid before moving to permutations and combinations.

#### When FCP Applies vs. When It Doesn't
FCP applies when: choices at each step are independent, and order matters (or you're simply counting sequences). FCP does NOT apply directly when: you're choosing without regard to order (use combinations), or the choices at later steps depend on which was chosen earlier (adjust the count at each step). For most MS-level counting problems, FCP or a simple adjustment to it is sufficient.

#### Review Questions
1. A school offers 4 language classes, 3 science classes, and 2 math classes. If a student chooses one of each, how many combinations are possible?
2. How many 4-letter "words" (arrangements of letters) can be formed using the letters A, B, C, D, E with no repetition?
3. A die is rolled 3 times. How many possible outcomes are there?

---
