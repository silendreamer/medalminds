---
id: nsb-lesson-0620
title: "Competition Extension: Linear Algebra and AMC/AIME"
level: hs
subject: math
topic: algebra
subtopic: "Linear Equations, Inequalities & Systems"
slug: linear-algebra-amc-aime
type: "Competition Extension"
estimatedMinutes: 7
keyConcepts: ["system of equations tricks", "parametric solutions", "integer solutions"]
summary: "Competition problems use linear systems with clever twists — parametric solutions, number-theoretic constraints, and unusual variables."
---
#### AMC-Style Trick
"If a + b = 7, b + c = 11, a + c = 9, find a + b + c."
Add all three: 2(a + b + c) = 27 → a + b + c = 13.5.
Then a = 13.5 − 11 = 2.5, b = 4.5, c = 6.5.

#### AIME-Style: Integer Constraint
"Find all positive integer solutions to 3x + 7y = 100."
x = (100 − 7y)/3. Need 100 − 7y ≡ 0 (mod 3) → 1 − y ≡ 0 (mod 3) → y ≡ 1 (mod 3).
So y = 1, 4, 7, 10, 13 (check x > 0: 100 − 7y > 0 → y < 100/7 ≈ 14.3).
Valid: y ∈ {1, 4, 7, 10, 13} → 5 solutions.

#### Review Questions
1. If x + y = 5 and xy = 3, find x² + y². (Hint: (x+y)² = x² + 2xy + y².)
2. How many positive integer solutions does 2x + 3y = 30 have?
3. Bowl stem: "For 10 points, in a 3×3 system, what is the name of the method that uses the ratio of determinants?" → Cramer's Rule.

---
