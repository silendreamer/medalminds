---
id: nsb-lesson-0752
title: "Discrete Math Competition Problems"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: discrete-competition
type: "Competition Extension"
estimatedMinutes: 10
keyConcepts: ["clever counting", "hidden structure", "rapid verification"]
summary: "Discrete math toss-ups emphasize counting, logic, and recognizing patterns."
---
#### High-Frequency Toss-Up Patterns
"How many 2×2 matrices with entries in {0, 1} are invertible over the integers?" The matrix must have nonzero determinant. For [a b; c d], det = ad − bc. Count pairs (a, b, c, d) ∈ {0,1}⁴ with ad − bc ≠ 0. By enumeration or inclusion-exclusion, the answer is 6 (or note that out of 16 matrices, 6 are invertible over Z/2Z, and over Z we exclude those with det = 0).

#### Trick: Hidden Symmetry
"In how many ways can you arrange AABBCC if no two adjacent letters are the same?" This looks hard, but recognizing it as a valid tiling problem or using inclusion-exclusion via the principle of derangements speeds it up.

#### Trick: Off-by-One Errors
"How many integers from 1 to 100 are divisible by 3?" The answer is ⌊100/3⌋ = 33, not 34 (students often forget that 1 is not divisible by 3 and 100 isn't either). The divisible integers are 3, 6, 9, ..., 99, which is 33 integers.

#### Toss-Up Example: "For 10 points, how many divisors does 120 have?"
Prime factorization: 120 = 2³ · 3 · 5. Number of divisors = (3+1)(1+1)(1+1) = 4 · 2 · 2 = 16. Trap: forgetting the "+1" in the formula; it's (exponent + 1) for each prime factor.

#### Worked Example: Recurrence Relations in Toss-Ups
"How many binary strings of length n have no two consecutive 1's?" Let a_n be the number. Base: a_1 = 2 (strings 0 and 1). a_2 = 3 (00, 01, 10; not 11). Recurrence: a_n = a_{n−1} + a_{n−2} (a string either ends in 0, allowing any valid (n−1)-length string, or ends in 01, forcing the previous bit to be 0). Recognize this as Fibonacci: a_n = F_{n+2}. For n = 10, a_10 = F_12 = 144. Speed: don't compute all previous values; use Fibonacci tables or matrix exponentiation if needed.

#### Review Questions
1. How many divisors does 2^4 · 3^2 · 7 have?
2. What is C(100, 50) mod 2?
3. How many ways can you tile a 2×10 board with 1×2 dominoes?

---
