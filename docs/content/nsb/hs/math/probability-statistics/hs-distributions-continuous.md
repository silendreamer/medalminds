---
id: nsb-lesson-0734
title: "Continuous Distributions & Normal Distribution"
level: hs
subject: math
topic: probability-statistics
subtopic: "Random Variables & Probability Distributions"
slug: hs-distributions-continuous
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["PDF", "CDF", "normal distribution", "Z-score"]
summary: "Continuous random variables have probability density functions; the normal distribution underpins all of statistics and the Central Limit Theorem."
---
#### Probability Density Functions
For continuous X, P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx, where f(x) ≥ 0 and ∫_{-∞}^{∞} f(x) dx = 1. P(X = a) = 0 for any single value. E[X] = ∫_{-∞}^{∞} x·f(x) dx. The CDF F(x) = P(X ≤ x) = ∫_{-∞}^{x} f(t) dt, and F'(x) = f(x).

#### Uniform Distribution
X ~ Uniform(a, b): f(x) = 1/(b−a) on [a,b]. E[X] = (a+b)/2. Var(X) = (b−a)²/12. Example: Bus arrives uniformly in [0,10] minutes. E[wait] = 5 min. P(wait > 7) = 3/10.

#### Normal Distribution
X ~ N(μ, σ²): bell curve, symmetric about μ. Standard normal Z ~ N(0,1). Standardize: Z = (X−μ)/σ. The 68-95-99.7 rule: P(|X−μ| < σ) ≈ 0.68; < 2σ: 0.95; < 3σ: 0.997. Lookup probabilities from Z-table or use symmetry P(Z < −z) = P(Z > z) = 1−P(Z < z).

#### Central Limit Theorem
Sample mean X̄ of n iid samples from any distribution with mean μ and variance σ² approaches N(μ, σ²/n) as n → ∞. SE(X̄) = σ/√n. Allows inference about populations using normal probabilities even when underlying distribution is unknown.

#### Review Questions
1. X ~ N(50, 16). Find P(46 < X < 58) using Z-scores and the 68-95-99.7 rule.
2. X ~ Uniform(2, 8). Find P(3 < X < 6) and Var(X).
3. State the CLT in plain language. Why does it matter for statistics?

---
