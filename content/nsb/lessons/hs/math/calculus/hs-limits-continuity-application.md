---
id: nsb-lesson-0710
title: "Applying Limits: Continuity Problems & IVT"
level: hs
subject: math
topic: calculus
subtopic: "Limits & Continuity"
slug: hs-limits-continuity-application
type: "Application"
estimatedMinutes: 13
keyConcepts: ["piecewise continuity", "Intermediate Value Theorem", "root-finding"]
summary: "Continuity testing and the IVT turn abstract limit ideas into tools for proving existence of solutions — a staple of both AP Calculus and Science Bowl."
---
#### Problem: Piecewise Continuity
Find the value of k that makes f continuous everywhere, where f(x) = {3x+2 for x < 1; kx²−1 for x ≥ 1}. At x = 1: left limit = 3(1)+2 = 5; right limit = k(1)²−1 = k−1. For continuity: k−1 = 5, so k = 6. Check: f(1) = 6(1)−1 = 5 ✓.

#### Problem: Using the IVT
Show that f(x) = x³−2x−5 has a root between x = 2 and x = 3. f(2) = 8−4−5 = −1 < 0. f(3) = 27−6−5 = 16 > 0. Since f is continuous and changes sign on [2,3], by IVT there exists c ∈ (2,3) where f(c) = 0.

#### Problem: Removing Discontinuities
f(x) = (x²−4)/(x−2) has a removable discontinuity at x = 2. Factor: (x−2)(x+2)/(x−2) = x+2 for x ≠ 2. Redefine f(2) = 4 to make f continuous at 2. Jump discontinuities (different one-sided limits) and infinite discontinuities (vertical asymptote) cannot be removed.

#### Problem: Evaluating Tricky Limits
lim(x→0) (√(x+4) − 2)/x. Multiply by conjugate: [(√(x+4)−2)(√(x+4)+2)] / [x(√(x+4)+2)] = x / [x(√(x+4)+2)] = 1/(√(x+4)+2) → 1/(2+2) = 1/4.

#### Review Questions
1. For f(x) = {x²+1 for x ≤ 2; ax−1 for x > 2}, find a so f is continuous.
2. Show f(x) = cos(x) − x has a solution in [0, π/2] using IVT.
3. Classify each discontinuity of f(x) = (x²−1)/((x−1)(x+2)) as removable, jump, or infinite.

---
