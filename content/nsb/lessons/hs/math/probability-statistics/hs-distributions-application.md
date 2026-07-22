---
id: nsb-lesson-0735
title: "Distributions: Application Problems"
level: hs
subject: math
topic: probability-statistics
subtopic: "Random Variables & Probability Distributions"
slug: hs-distributions-application
type: "Application"
estimatedMinutes: 14
keyConcepts: ["binomial", "normal approximation", "expected value problems"]
summary: "Full worked problems using binomial, normal, and Poisson distributions in real contexts."
---
#### Problem 1: Quality Control
A factory produces items with 5% defect rate. In a batch of 50, what is P(≤ 2 defective)? X ~ Bin(50, 0.05). E[X]=2.5. P(X=0) = (0.95)⁵⁰ ≈ 0.0769. P(X=1) = C(50,1)(0.05)(0.95)⁴⁹ ≈ 0.2025. P(X=2) = C(50,2)(0.05)²(0.95)⁴⁸ ≈ 0.2611. Total ≈ 0.540.

#### Problem 2: Normal Approximation to Binomial
X ~ Bin(100, 0.4). Approximate P(35 ≤ X ≤ 45) using normal. μ = 40, σ = √24 ≈ 4.9. With continuity correction: P(34.5 ≤ Y ≤ 45.5). Z₁ = (34.5−40)/4.9 ≈ −1.12; Z₂ = (45.5−40)/4.9 ≈ 1.12. P(−1.12 ≤ Z ≤ 1.12) ≈ 0.737.

#### Problem 3: Expected Value with Multiple Variables
A game: roll a die, gain that many dollars if ≥ 4, lose $2 otherwise. E[gain] = P(1)·(−2) + P(2)·(−2) + P(3)·(−2) + P(4)·4 + P(5)·5 + P(6)·6 = (1/6)(−2−2−2+4+5+6) = 9/6 = $1.50.

#### Review Questions
1. X ~ Poisson(4). P(X > 2)?
2. Heights are normal with μ = 170cm, σ = 10cm. P(person is between 155 and 185cm)?
3. A fair coin is flipped 400 times. Use normal approximation to find P(190 ≤ # heads ≤ 210).

---
