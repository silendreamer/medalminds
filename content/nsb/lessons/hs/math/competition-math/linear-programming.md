---
id: nsb-lesson-0761
title: "Linear Programming and Optimization"
level: hs
subject: math
topic: competition-math
subtopic: "Mathematical Modeling & Optimization"
slug: linear-programming
type: "Application"
estimatedMinutes: 15
keyConcepts: ["objective function", "constraints", "feasible region"]
summary: "Linear programming maximizes or minimizes a linear objective subject to linear constraints."
---
#### Linear Programming Setup
Maximize (or minimize) c₁x₁ + c₂x₂ + ... subject to a₁₁x₁ + a₁₂x₂ + ... ≤ b₁, ... and x_i ≥ 0. The feasible region is a convex polytope. The optimum occurs at a vertex. Example: maximize 3x + 2y subject to x + 2y ≤ 4, 2x + y ≤ 5, x, y ≥ 0. Vertices: (0,0), (0,2), (2,1), (5/2, 0). Objective values: 0, 4, 8, 7.5. Maximum = 8 at (2, 1).

#### Graphical Method
For two variables, sketch the constraints and identify the feasible region. Find vertices and evaluate the objective. For more variables, use the simplex algorithm (computational). In competitions, problems are often set to have nice integer solutions.

#### Worked Example: Production Optimization
A factory makes chairs and tables. Each chair requires 2 hours of labor and 10 board-feet of wood; profit $40. Each table requires 3 hours and 20 board-feet; profit $50. Available: 60 hours, 400 board-feet. Maximize profit. Variables: c = chairs, t = tables. Maximize 40c + 50t subject to 2c + 3t ≤ 60, 10c + 20t ≤ 400, c, t ≥ 0. Vertices: (0,0), (0,20), (40/3, 40/3)≈(13.3, 13.3), (30,0). Profits: 0, 1000, 1533, 1200. Optimum: t = 20 (all tables), profit $1000.

#### Review Questions
1. Maximize x + 2y subject to x + y ≤ 3, 2x + y ≤ 4, x, y ≥ 0.
2. In the production problem, if table profit increases to $60, what is the new optimum?
3. What is the feasible region for x + y ≥ 1, x − y ≤ 2, x ≥ 0?

---
