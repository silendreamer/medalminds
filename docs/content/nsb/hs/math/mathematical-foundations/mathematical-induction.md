---
id: nsb-lesson-0586
title: "Mathematical Induction"
level: hs
subject: math
topic: mathematical-foundations
subtopic: "Mathematical Reasoning, Logic & Proof Techniques"
slug: mathematical-induction
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["base case", "inductive hypothesis", "inductive step"]
summary: "Induction proves a statement holds for all positive integers by establishing a base case and showing each case implies the next."
---
#### The Principle
Mathematical induction has two steps. (1) Base case: verify P(1) is true. (2) Inductive step: assume P(k) is true (inductive hypothesis), then prove P(k+1) is true. If both succeed, P(n) is true for all positive integers n. Think of it like dominoes: if the first falls and each one knocks down the next, all of them fall.

#### Classic Example: Sum Formula
Prove that 1 + 2 + 3 + … + n = n(n+1)/2. Base case: n = 1, left side = 1, right side = 1(2)/2 = 1. ✓ Inductive step: assume 1 + 2 + … + k = k(k+1)/2. Add (k+1) to both sides: 1 + 2 + … + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k/2 + 1) = (k+1)(k+2)/2. This is exactly the formula with n = k+1. ✓

#### Strong Induction
Sometimes you need to assume P(1), P(2), …, P(k) all hold to prove P(k+1). This "strong induction" is logically equivalent to regular induction. It's useful for sequences defined by multiple previous terms, like the Fibonacci sequence.

#### Review Questions
1. Prove by induction that 1² + 2² + … + n² = n(n+1)(2n+1)/6.
2. What goes wrong if you skip the base case?
3. Use strong induction to prove every integer ≥ 2 is divisible by a prime.

---
