---
id: nsb-lesson-0694
title: "Summation Notation and Telescoping Series"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: summation-telescoping
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["sigma notation", "index manipulation", "cancellation"]
summary: "Summation notation ∑ compresses long sums; telescoping series exploit cancellation."
---
#### Sigma Notation
∑(i=1 to n) a_i means a₁ + a₂ + ... + a_n. The index i runs from 1 to n. Changing the start and end points: ∑(i=2 to n) a_i = a₂ + a₃ + ... + a_n (omits the first term). ∑(k=0 to n) a_k starts the index at 0. The properties: ∑(i=1 to n) c·a_i = c·∑(i=1 to n) a_i (factor out constants), ∑(i=1 to n) (a_i + b_i) = ∑(i=1 to n) a_i + ∑(i=1 to n) b_i (sum of sums). Using these, evaluate ∑(i=1 to 100) (3i+2) = 3·∑(i=1 to 100) i + 2·∑(i=1 to 100) 1 = 3·(100·101/2) + 2·100 = 15150 + 200 = 15350.

#### Telescoping Series
In a telescoping series, consecutive terms cancel. Example: ∑(i=1 to n) [1/i − 1/(i+1)] = [1/1 − 1/2] + [1/2 − 1/3] + ... + [1/n − 1/(n+1)] = 1 − 1/(n+1). The middle terms (−1/2, +1/2), (−1/3, +1/3), etc. cancel, leaving only the first and last terms. Another example: ∑(i=1 to n) 1/(i(i+1)) = ∑(i=1 to n) [1/i − 1/(i+1)] = 1 − 1/(n+1). As n → ∞, the sum approaches 1.

#### Partial Fraction Decomposition
To telescope a fraction, use partial fractions. Decompose 1/(i(i+1)) as A/i + B/(i+1). Multiply by i(i+1): 1 = A(i+1) + Bi. Setting i=0: 1 = A, so A = 1. Setting i=−1: 1 = −B, so B = −1. Thus 1/(i(i+1)) = 1/i − 1/(i+1), which telescopes. For more complex fractions like 2/(i(i+2)), decompose: 2/(i(i+2)) = A/i + B/(i+2). Multiply: 2 = A(i+2) + Bi. Setting i=0: 2 = 2A → A = 1. Setting i=−2: 2 = −2B → B = −1. So 2/(i(i+2)) = 1/i − 1/(i+2), which telescopes with step 2.

#### Finite Arithmetic and Geometric Sums via Telescoping
Revisit S_n = ∑(i=1 to n) i = n(n+1)/2. This can be derived by noting 2S_n = ∑(i=1 to n) (i + (n+1−i)) = ∑(i=1 to n) (n+1) = n(n+1), so S_n = n(n+1)/2. Or, recognize that ∑(i=1 to n) i can be computed using the formula for an arithmetic series directly.

#### Review Questions
1. Evaluate ∑(i=2 to 10) 1/(i²−1).
2. Find ∑(i=1 to 50) i in two ways: using the formula and using sigma notation rules.
3. Simplify ∑(i=1 to n) [i² − (i−1)²].

---
