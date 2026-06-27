---
id: nsb-lesson-0733
title: "Discrete Random Variables & Distributions"
level: hs
subject: math
topic: probability-statistics
subtopic: "Random Variables & Probability Distributions"
slug: hs-distributions-discrete
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["PMF", "expected value", "variance", "binomial distribution"]
summary: "A random variable assigns a number to each outcome; its distribution, mean, and variance characterize its entire probabilistic behavior."
---
#### Probability Mass Functions
A discrete RV X has PMF P(X = x) = p(x) ≥ 0 with Σ p(x) = 1. The CDF F(x) = P(X ≤ x) = Σ_{t≤x} p(t). Expected value: E[X] = Σ x·p(x). Variance: Var(X) = E[(X−μ)²] = E[X²]−(E[X])². Standard deviation σ = √Var(X).

#### Binomial Distribution
X ~ Bin(n, p): n independent trials, each success prob p. P(X=k) = C(n,k)·pᵏ·(1−p)^(n−k). E[X] = np. Var(X) = np(1−p). Example: 10 free throws, 80% success rate. P(exactly 8) = C(10,8)·(0.8)⁸·(0.2)² = 45·0.1678·0.04 ≈ 0.302. E[made] = 8. Conditions: fixed n, binary, independent, same p.

#### Geometric Distribution
X = # trials until first success. P(X=k) = (1−p)^(k−1)·p for k = 1,2,3,… E[X] = 1/p. Var(X) = (1−p)/p². Memoryless property: P(X > m+n | X > m) = P(X > n).

#### Poisson Distribution
X ~ Pois(λ): P(X=k) = e^(−λ)·λᵏ/k! for k = 0,1,2,… E[X] = Var(X) = λ. Models rare events in continuous time/space. Example: Average 3 typos/page. P(0 typos on next page) = e⁻³ ≈ 0.050.

#### Review Questions
1. X ~ Bin(20, 0.3). Find E[X], Var(X), and P(X = 6).
2. A geometric RV has success probability 1/4. Find E[X] and P(X > 4).
3. Calls arrive at a rate of 5/hour (Poisson). P(≥ 2 calls in 1 hour)?

---
