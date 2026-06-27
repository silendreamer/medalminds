---
id: nsb-lesson-0609
title: "Modeling Application: Optimization"
level: hs
subject: math
topic: mathematical-foundations
subtopic: "Mathematical Modeling & Problem-Solving Strategies"
slug: modeling-optimization-application
type: "Application"
estimatedMinutes: 15
keyConcepts: ["objective function", "constraint", "critical point", "boundary analysis"]
summary: "Optimization finds the best value of an objective function subject to constraints — appearing everywhere from calculus to discrete competition problems."
---
#### Worked Example 1: Calculus Optimization
A farmer has 200 m of fencing to enclose a rectangular area against a wall (one side free). Maximize the area.
Let width = x, length = y. Constraint: 2x + y = 200, so y = 200 − 2x. Area A = xy = x(200 − 2x) = 200x − 2x². dA/dx = 200 − 4x = 0 → x = 50. y = 100. A_max = 50 × 100 = 5000 m². Second derivative: −4 < 0, confirms maximum.

#### Worked Example 2: AMC-Style Optimization (No Calculus)
Find the maximum value of 3x + 4y subject to x² + y² ≤ 25.
The max of a linear function on a circle occurs on the boundary. By Cauchy-Schwarz: (3x + 4y)² ≤ (3² + 4²)(x² + y²) = 25 × 25 = 625. So 3x + 4y ≤ 25. Equality when x/3 = y/4, x² + y² = 25 → (x, y) = (15/5, 20/5) = (3, 4). Maximum is 25.

#### Review Questions
1. Use calculus to find the dimensions of the open-top box of maximum volume from a 12×12 cm square (cutting corners of size x).
2. Apply AM-GM to show that for positive x, y with x + y = 10, the maximum of xy is 25.
3. In an AMC problem, why does the maximum of a linear objective on a convex polygon occur at a vertex?

---
