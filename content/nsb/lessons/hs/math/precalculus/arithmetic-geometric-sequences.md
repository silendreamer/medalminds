---
id: nsb-lesson-0692
title: "Arithmetic and Geometric Sequences"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: arithmetic-geometric-sequences
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["common difference", "common ratio", "nth-term formulas"]
summary: "Sequences are ordered lists of numbers; arithmetic and geometric are the two most common types."
---
#### Arithmetic Sequences
An arithmetic sequence has a constant difference d between consecutive terms. The nth term is a_n = a₁ + (n−1)d. Example: 3, 7, 11, 15, ... has d = 4 and a_n = 3 + (n−1)·4 = 4n − 1. The 10th term is a₁₀ = 4(10) − 1 = 39. The sum of the first n terms is S_n = n(a₁ + a_n)/2 = n[2a₁ + (n−1)d]/2. For the example, S₁₀ = 10(3+39)/2 = 210. Arithmetic sequences model linear growth: position, velocity (if acceleration is zero), and simple interest.

#### Geometric Sequences
A geometric sequence has a constant ratio r between consecutive terms. The nth term is a_n = a₁·r^(n−1). Example: 2, 6, 18, 54, ... has r = 3 and a_n = 2·3^(n−1). The 5th term is a₅ = 2·3⁴ = 162. The sum of the first n terms is S_n = a₁(1−r^n)/(1−r) for r ≠ 1. For the example, S₅ = 2(1−3⁵)/(1−3) = 2(−242)/(−2) = 242. Geometric sequences model exponential growth: population, compound interest, radioactive decay.

#### Infinite Geometric Series
If |r| < 1, the infinite sum converges: ∑(n=1 to ∞) a₁·r^(n−1) = a₁/(1−r). Example: 1 + 1/2 + 1/4 + 1/8 + ... = 1/(1−1/2) = 2. This represents the sum of an infinite repeating decimal 0.999... = 9/10 · 1/(1−1/10) = (9/10)·(10/9) = 1. If |r| ≥ 1, the series diverges (does not converge to a finite sum).

#### Distinguishing and Mixing Sequences
Given the first few terms, identify the type. For 5, 10, 15, 20, ..., d = 5 (arithmetic). For 5, 10, 20, 40, ..., r = 2 (geometric). For 1, 1, 2, 3, 5, 8, ... (Fibonacci), neither—each term is the sum of the previous two. Science Bowl mixing problems combine arithmetic and geometric sequences: find the sum of the first 5 terms of an arithmetic sequence, multiply by the first term of a geometric sequence, etc.

#### Review Questions
1. Find the 15th term of the sequence 4, 9, 14, 19, ...
2. Find the sum of the first 8 terms of the geometric sequence 3, 6, 12, 24, ...
3. A ball bounces to 2/3 of its previous height. If dropped from 10 m, what is the total distance traveled (up and down) before it stops?

---
