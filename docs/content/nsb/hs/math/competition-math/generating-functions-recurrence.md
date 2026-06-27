---
id: nsb-lesson-0755
title: "Generating Functions and Recurrence Solutions"
level: hs
subject: math
topic: competition-math
subtopic: "Advanced Counting & Combinatorics"
slug: generating-functions-recurrence
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["ordinary generating functions", "recurrence relations", "solving for sequences"]
summary: "Generating functions convert recurrence relations into algebraic equations."
---
#### Generating Functions Definition
The ordinary generating function (OGF) for a sequence {a_n} is G(x) = ∑(n=0 to ∞) a_n x^n. For the Fibonacci sequence, F_0 = 0, F_1 = 1, F_n = F_{n−1} + F_{n−2}, the OGF is G(x) = x / (1 − x − x²). The coefficients of the power series expansion give the Fibonacci numbers. Extracting coefficients from known generating functions (like 1/(1−x) = ∑ x^n) reveals sequence formulas.

#### Solving Recurrences with Generating Functions
For a_n = c₁a_{n−1} + c₂a_{n−2} with initial conditions, multiply by x^n and sum to get an equation for G(x). Solve for G(x), then expand to extract coefficients. Example: a_n = 2a_{n−1} with a_0 = 1. Then G(x) = ∑ a_n x^n = a_0 + a_1 x + a_2 x² + ... = 1 + 2x + 4x² + ... = 1/(1−2x). Extract coefficients: a_n = 2^n.

#### Review Questions
1. Find the generating function for a_n = n.
2. Solve the recurrence a_n = 3a_{n−1} − 2a_{n−2} with a_0 = 1, a_1 = 1 using generating functions.

---
