---
id: nsb-lesson-0704
title: "Binomial Series and Generating Functions"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: binomial-series-generating
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["generalized binomial theorem", "series expansion", "combinatorial generating"]
summary: "The binomial theorem extends to non-integer exponents as a power series."
---
#### Generalized Binomial Theorem
For any real α (not necessarily a positive integer), (1+x)^α = ∑(n=0 to ∞) C(α,n) x^n, where C(α,n) = α(α−1)···(α−n+1) / n!. This converges for |x| < 1. Example: (1+x)^(−1) = ∑(n=0 to ∞) (−1)^n x^n = 1 − x + x² − x³ + ... (the geometric series with r = −x). Another: √(1+x) = (1+x)^(1/2) = 1 + (1/2)x − (1/8)x² + (1/16)x³ − ...

#### Generating Functions for Combinatorial Sequences
The generating function for the Fibonacci sequence {F_n} is G(x) = ∑(n=0 to ∞) F_n x^n = x / (1 − x − x²). For the sequence a_n = 2^n, the generating function is G(x) = ∑(n=0 to ∞) 2^n x^n = 1/(1−2x) for |x| < 1/2. Generating functions encode combinatorial information and simplify counting arguments. For instance, the coefficient of x^n in (1+x)^k is C(k,n), the number of ways to choose n items from k.

#### Review Questions
1. Expand (1−x)^(−2) using the generalized binomial theorem.
2. Find the generating function for the sequence a_n = n.
3. Use generating functions to prove ∑(k=0 to n) C(n,k) = 2^n.

---
