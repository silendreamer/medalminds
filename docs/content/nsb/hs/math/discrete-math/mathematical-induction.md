---
id: nsb-lesson-0750
title: "Mathematical Induction"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: mathematical-induction
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["base case", "inductive step", "strong induction"]
summary: "Induction proves statements for all integers by proving base case and inductive step."
---
#### Principle of Mathematical Induction
To prove a statement P(n) for all integers n ≥ n₀: (1) Prove P(n₀) is true (base case). (2) Assume P(k) is true for some k ≥ n₀ (inductive hypothesis). (3) Prove P(k+1) is true (inductive step). If both hold, P(n) is true for all n ≥ n₀.

#### Example Proof by Induction
Prove ∑(i=1 to n) i = n(n+1)/2 for all n ≥ 1. Base case (n=1): ∑(i=1 to 1) i = 1 = 1(1+1)/2 ✓. Inductive step: assume ∑(i=1 to k) i = k(k+1)/2. Then ∑(i=1 to k+1) i = ∑(i=1 to k) i + (k+1) = k(k+1)/2 + (k+1) = (k+1)[k/2 + 1] = (k+1)(k+2)/2, which is the formula for n = k+1 ✓. By induction, the formula holds for all n ≥ 1.

#### Strong Induction
Strong induction allows assuming P(i) for all i ≤ k when proving P(k+1). This is useful when P(k+1) depends on multiple previous values (e.g., Fibonacci). Example: prove every integer n ≥ 2 is either prime or a product of primes. Base case: n = 2 is prime ✓. Inductive step: assume all integers 2 ≤ i ≤ k are prime or products of primes. For n = k+1, if k+1 is prime ✓. If not, k+1 = ab where 1 < a, b < k+1. By the inductive hypothesis, a and b are prime or products of primes, so k+1 is a product of primes ✓.

#### Review Questions
1. Prove ∑(i=1 to n) i² = n(n+1)(2n+1)/6 by induction.
2. Prove 2^n > n for all n ≥ 1.
3. State and prove a base case and inductive step for proving Fibonacci identities.

---
