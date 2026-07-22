---
id: nsb-lesson-1403
title: "Combinatorial Patterns and Growth"
level: ms
subject: math
topic: competition-mathematics
subtopic: "Pattern Recognition"
slug: combinatorial-patterns-and-growth
type: "Application"
estimatedMinutes: 12
keyConcepts: ["exponential growth", "factorials", "counting", "rates of change"]
summary: "Recognizing exponential and factorial growth helps estimate quantities and identify patterns."
---
#### Linear vs. Exponential Growth
Linear: y = mx + b (growth rate constant). Example: y = 2x gives 2, 4, 6, 8, 10, .... Exponential: y = ab^x (growth rate proportional to current value). Example: y = 2(2^x) gives 2, 4, 8, 16, 32, .... Exponential grows much faster. After 10 steps: linear = 20, exponential = 1,024.

#### Factorial Growth
Factorials grow faster than exponentials for large n. 5! = 120, 10! = 3,628,800, 20! ≈ 2.4 × 10^18. Factorials appear in permutations and combinations. A 20-item permutation has 20! arrangements — unimaginably large. This is why exhaustive search is impossible for large combinatorial problems.

#### Doubling Time
If something doubles every time period, how long to reach a target? Doubling time formula: t = ln(target/initial) / ln(2). If a population starts at 1,000 and doubles every 2 years, when does it reach 1 million? t = ln(1,000) / ln(2) = 9.97 doublings ≈ 10 doublings = 20 years.

#### Rule of 70 (Approximation)
For exponential growth at rate r%, the doubling time ≈ 70/r years. If an economy grows 3.5% annually, doubling time ≈ 70/3.5 = 20 years. This quick approximation helps estimate long-term exponential effects without calculators.

#### Inverse Relationships
If one quantity grows exponentially, its inverse shrinks exponentially. Radioactive decay follows A(t) = A_0 (½)^(t/t_half), an exponential with decay rate -ln(2)/t_half. After 5 half-lives, 1/32 of the original remains. Exponential decay appears in cooling (Newton's law), chemical reactions, and many natural processes.

#### Review Questions
1. Which grows faster, linear or exponential?
2. What is 10 factorial?
3. What is the doubling time for 2% annual growth?

---
