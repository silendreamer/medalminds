---
id: nsb-lesson-0641
title: "Competition Extension: Logarithms in Competition Math"
level: hs
subject: math
topic: algebra
subtopic: "Exponential & Logarithmic Functions"
slug: logarithms-competition-math
type: "Competition Extension"
estimatedMinutes: 8
keyConcepts: ["Richter scale", "pH", "telescoping logs", "floor of log"]
summary: "Competition and real-world problems use logarithms in telescoping sums, floor functions, and scale problems — classic AIME/AMC territory."
---
#### Telescoping Log Sum
Evaluate Σₖ₌₂¹⁰⁰ log_k(k+1) = log₂(3) · log₃(4) · … · log₁₀₀(101).
By change of base: each log_k(k+1) = ln(k+1)/ln(k). Product telescopes: ln(101)/ln(2) = log₂(101).

#### Number of Digits
The number of digits of a positive integer n is ⌊log₁₀(n)⌋ + 1. Digits of 2¹⁰ = 1024: ⌊log₁₀(1024)⌋ + 1 = ⌊3.01⌋ + 1 = 4. ✓

#### AMC-Style Problem
How many integers n satisfy log₅(n) + log₅(n+1) < 2?
log₅(n(n+1)) < 2 → n(n+1) < 25 → n² + n − 25 < 0. Roots ≈ −5.5 and 4.5. For positive integers: n = 1, 2, 3, 4. That's 4 integers.

#### Review Questions
1. Evaluate log₂(3)·log₃(4)·log₄(8). (Use chain of change-of-base.)
2. How many digits does 3²⁰ have? (log₁₀(3) ≈ 0.4771)
3. Solve: log₂(log₃(x)) = 2.
