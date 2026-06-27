---
id: nsb-lesson-0615
title: "Systems of Linear Equations"
level: hs
subject: math
topic: algebra
subtopic: "Linear Equations, Inequalities & Systems"
slug: systems-linear-equations
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["substitution", "elimination", "Gaussian elimination", "matrix"]
summary: "Systems of linear equations are solved by elimination, substitution, or matrix methods — the solution is the intersection of the corresponding lines (or planes in 3D)."
---
#### Two-Variable Systems
Three outcomes: unique solution (lines intersect), no solution (parallel lines, inconsistent), infinitely many (same line, dependent). Methods: (1) **Substitution:** solve one equation for one variable, substitute. (2) **Elimination (addition/subtraction):** add multiples of equations to eliminate a variable.

Example: 2x + y = 5 and x − y = 1. Add: 3x = 6, x = 2, y = 1.

#### Matrix Form and Gaussian Elimination
System ax + by = e, cx + dy = f becomes [a b | e; c d | f]. Row reduce to echelon form. For n equations in n unknowns, Gaussian elimination runs in O(n³). Row operations: swap rows, multiply row by nonzero constant, add multiple of one row to another.

#### Three-Variable Systems
3 equations in 3 unknowns: reduce to 2×2 by eliminating one variable, then solve. Check answer by substituting back into all 3 original equations.

#### Review Questions
1. Solve the system: 3x − 2y = 4 and x + 4y = 10.
2. When does a 2×2 linear system have no solution? Infinitely many?
3. Write the system x + y + z = 6, 2x + y = 5, 3z = 9 as an augmented matrix.

---
