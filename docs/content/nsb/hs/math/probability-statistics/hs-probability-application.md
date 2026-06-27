---
id: nsb-lesson-0731
title: "Conditional Probability: Applications"
level: hs
subject: math
topic: probability-statistics
subtopic: "Probability (Conditional Probability & Bayes' Theorem)"
slug: hs-probability-application
type: "Application"
estimatedMinutes: 14
keyConcepts: ["Bayes", "false positives", "conditional chain calculations"]
summary: "Worked problems applying Bayes' theorem, conditional chains, and the false-positive paradox to realistic scenarios."
---
#### Problem 1: Monty Hall
Three doors; car behind one, goats behind two. You pick door 1. Host opens door 3 (goat). Should you switch? P(car behind door 2 | host opens 3) = P(host opens 3 | car behind 2)·P(car behind 2) / P(host opens 3). P(host opens 3|car behind 1) = 1/2 (arbitrary choice). P(host opens 3|car behind 2) = 1 (must open 3). P(host opens 3|car behind 3) = 0. P(host opens 3) = 1/2·1/3 + 1·1/3 = 1/2. P(car behind 2|host opens 3) = (1·1/3)/(1/2) = 2/3. SWITCH!

#### Problem 2: Sequential Draws
Urn has 4 red, 6 blue. Draw 3 without replacement. P(exactly 2 red) = C(4,2)·C(6,1)/C(10,3) = 6·6/120 = 36/120 = 3/10.

#### Problem 3: Conditional Chain
P(A) = 0.6, P(B|A) = 0.7, P(B|Aᶜ) = 0.3. Find P(A|B). P(B) = 0.7·0.6+0.3·0.4 = 0.42+0.12 = 0.54. P(A|B) = 0.42/0.54 = 7/9 ≈ 0.778.

#### Review Questions
1. Three friends A, B, C each flip a coin. If at least one gets heads, what is P(all three get heads)?
2. In a class, 60% study math, 40% study English, 30% study both. Given a student studies math, P(also studies English)?
3. Solve the Sleeping Beauty problem: probability of heads given she is awakened on Monday?

---
