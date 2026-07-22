---
id: nsb-lesson-0715
title: "Applying Derivatives: Worked Problems"
level: hs
subject: math
topic: calculus
subtopic: "Derivatives & Applications"
slug: hs-derivatives-application
type: "Application"
estimatedMinutes: 15
keyConcepts: ["optimization", "motion", "curve sketching"]
summary: "Full worked solutions for the optimization and motion problems most likely to appear in Science Bowl and AP Calculus."
---
#### Problem 1: Box Optimization
An open-top box is made by cutting equal squares from corners of a 12×12 cm sheet. Find the cut size x that maximizes volume. V(x) = x(12−2x)² for 0 < x < 6. V'(x) = (12−2x)² + x·2(12−2x)(−2) = (12−2x)[(12−2x)−4x] = (12−2x)(12−6x). Set V'(x) = 0: x = 6 (endpoint) or x = 2. V(2) = 2(8)² = 128 cm³. V''(2) < 0 → maximum. Cut 2 cm squares.

#### Problem 2: Motion Analysis
A particle has position s(t) = t³−6t²+9t. (a) Find velocity v(t) = 3t²−12t+9 = 3(t−1)(t−3). (b) Particle at rest when v = 0: t = 1, 3. (c) Position at t = 1: s(1) = 1−6+9 = 4. At t = 3: s(3) = 27−54+27 = 0. (d) Total distance traveled 0 to 3: from s(0)=0 to s(1)=4 (distance 4), then back to s(3)=0 (distance 4). Total = 8.

#### Problem 3: Implicit Differentiation
Find dy/dx for x²+y² = 25. Differentiate implicitly: 2x+2y(dy/dx) = 0 → dy/dx = −x/y. At (3, 4): slope = −3/4. Tangent line: y−4 = −(3/4)(x−3).

#### Problem 4: Newton's Method Preview
To find roots numerically: xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ). Starting with x₀ = 2 for f(x) = x²−3: x₁ = 2 − (4−3)/4 = 2 − 0.25 = 1.75. Next iteration: x₂ = 1.75 − (3.0625−3)/(3.5) = 1.75 − 0.018 ≈ 1.732 ≈ √3.

#### Review Questions
1. A farmer has 600m of fencing to enclose a rectangular field against a river (no fence needed on river side). Find maximum area.
2. For s(t) = t³−3t+2, find all times when the particle changes direction and the total distance traveled on [0,3].
3. Find dy/dx for x³+y³ = 6xy (folium of Descartes).

---
