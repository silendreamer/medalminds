---
id: nsb-lesson-0756
title: "Functional Equations"
level: hs
subject: math
topic: competition-math
subtopic: "Functional Equations & Algebraic Manipulation"
slug: functional-equations
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["solving for unknown functions", "substitution strategies", "establishing values"]
summary: "Functional equations express relationships that a function must satisfy; solving requires clever substitutions."
---
#### Strategy: Finding Special Values
Given f(x+y) = f(x) + f(y), find f(0). Set x = y = 0: f(0) = f(0) + f(0) → f(0) = 0. This reveals that additive functions pass through the origin. Another: given f(xy) = f(x)f(y), find f(1). Set x = y = 1: f(1) = f(1)² → f(1) = 0 or 1.

#### Cauchy's Functional Equations
The additive Cauchy equation f(x+y) = f(x) + f(y) has solutions f(x) = cx for linear functions (continuous or monotonic). The multiplicative version f(xy) = f(x)f(y) has solutions f(x) = x^c or f(x) = 0. The power law f(x^n) = [f(x)]^n follows from repeated multiplication. These appear in competition problems as constraints on unknown functions.

#### Solved Example: f(x) + f(y) = f(x+y)
Assume f is differentiable. Differentiate both sides with respect to x: f'(x) = f'(x+y). This holds for all y, so f' is constant: f'(x) = c. Thus f(x) = cx + d. Using f(x) + f(y) = f(x+y): cx + d + cy + d = c(x+y) + d → d = 0, so f(x) = cx.

#### Worked Example: Olympiad Functional Equation
Find f: ℝ → ℝ such that f(x² + f(y)) = y + [f(x)]². Substitute x = 0: f(f(y)) = y + [f(0)]². Let f(0) = c. Then f(f(y)) = y + c². If c = 0, f(f(y)) = y (f is an involution). Testing f(x) = x: f(x² + y) = y + x², true ✓. Testing f(x) = −x: f(x² − y) = y + x², giving x² − y = y + x² → −y = y, true only for y = 0, invalid. Solution: f(x) = x (or check that f(x) = −x fails; more solutions may exist under relaxed conditions).

#### Review Questions
1. Find all functions f: ℝ → ℝ such that f(2x) = 2f(x).
2. Solve f(x−y) = f(x)/f(y) for f.
3. If f(x) + f(1−x) = 1 for all x, what is f(1/2)?

---
