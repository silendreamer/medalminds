---
id: nsb-lesson-0689
title: "Trigonometric Equations and Inequalities"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: trig-equations-inequalities
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["solving equations graphically", "inequalities on unit circle", "parametric solutions"]
summary: "Beyond algebraic techniques, graphical and parametric methods solve complex trigonometric inequalities."
---
#### Graphical Solutions
Graph y = 2 sin x and y = 1 on the same axes. The solutions to 2 sin x = 1 occur where the graphs intersect. On [0, 2π], they meet at x = π/6 and x = 5π/6. For inequalities like 2 sin x > 1, shade the region where the sine curve is above the line y = 1. Graphical methods are slower for competitions but provide intuition and catch algebra mistakes.

#### Solving Inequalities on [0, 2π)
Solve sin x < 1/2. From the unit circle, sin x = 1/2 at x = π/6 and x = 5π/6. In quadrants I and II, sine increases from 0 to 1. So sin x < 1/2 when x ∈ [0, π/6) ∪ (5π/6, 2π). Generalizing to all real numbers: x ∈ (5π/6 + 2πk, π/6 + 2π(k+1)) = (5π/6 + 2πk, π/6 + 2πk + 2π) for integer k. Simplify: x ∈ ∪_k [(−∞, π/6 + 2πk) ∪ (5π/6 + 2πk, ∞)].

#### Parametric Approach for Systems
To solve sin x = cos x on [0, 2π), divide by cos x (valid where cos x ≠ 0): tan x = 1, so x = π/4 or x = π/4 + π = 5π/4. Check: sin(π/4) = √2/2 = cos(π/4) ✓, sin(5π/4) = −√2/2 = cos(5π/4) ✓. When the equation involves multiple trig functions, convert to a single function and solve.

#### Complex Inequalities
Solve cos(2x) > cos x on [0, 2π). Using cos(2x) = 2cos²x − 1: 2cos²x − 1 > cos x, so 2cos²x − cos x − 1 > 0. Factor: (2cos x + 1)(cos x − 1) > 0. The product is positive when both factors are positive or both are negative. Case 1: 2cos x + 1 > 0 and cos x − 1 > 0. This gives cos x > −1/2 and cos x > 1, which is impossible (cos x ≤ 1). Case 2: 2cos x + 1 < 0 and cos x − 1 < 0. This gives cos x < −1/2 and cos x < 1 (always true), so cos x < −1/2. On [0, 2π), this occurs at x ∈ (2π/3, 4π/3).

#### Review Questions
1. Solve cos x ≥ 1/2 on [0, 2π).
2. Solve |sin x| = √3/2 on [0, 2π).
3. Solve tan(x/2) > 1 on [0, 2π).

---
