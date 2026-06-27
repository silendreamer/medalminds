---
id: nsb-lesson-0680
title: "Solving Trigonometric Equations"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: solving-trig-equations
type: "Application"
estimatedMinutes: 15
keyConcepts: ["general solutions", "inverse trig functions", "algebraic techniques"]
summary: "Trigonometric equations require finding all angles (in degrees or radians) that satisfy the equation."
---
#### Finding All Solutions in an Interval
When solving sin x = ½ on [0, 2π), identify one reference solution: x = π/6. Then apply the periodicity and symmetry: sine equals ½ in quadrants I and II, so x = π/6 (QI) and x = π − π/6 = 5π/6 (QII). If the interval were [0, 4π), add one more period: x = π/6 + 2π = 13π/6 and x = 5π/6 + 2π = 17π/6. Always sketch the unit circle or a sine curve to visualize where the solution lies; this prevents sign errors.

#### Using Inverse Functions
The inverse functions sin⁻¹, cos⁻¹, tan⁻¹ return a single value: sin⁻¹(½) = π/6, cos⁻¹(−1) = π, tan⁻¹(−√3) = −π/3. These are the "principal values" in their restricted ranges: [−π/2, π/2] for sin⁻¹, [0, π] for cos⁻¹, (−π/2, π/2) for tan⁻¹. From the principal value, use periodicity to find all solutions. Example: cos x = −√3/2 gives x = cos⁻¹(−√3/2) = 5π/6 as one solution; the general solution is x = 5π/6 + 2πk or x = 2π − 5π/6 + 2πk = 7π/6 + 2πk for any integer k.

#### Algebraic Techniques
Trigonometric equations often require algebra first. For sin²x − sin x − 2 = 0, let u = sin x: u² − u − 2 = (u−2)(u+1) = 0, so u = 2 or u = −1. Since sin x ∈ [−1, 1], only u = −1 is valid, giving sin x = −1, so x = 3π/2 + 2πk. If the equation involves multiple trig functions (e.g., sin x + cos x = 1), use identities to convert to a single function, then solve.

#### Worked Example: 2cos²x − cos x = 1
Rearrange: 2cos²x − cos x − 1 = 0. Factor (or use the quadratic formula with u = cos x): (2cos x + 1)(cos x − 1) = 0. Solutions: cos x = −½ or cos x = 1. For cos x = 1: x = 0 + 2πk = 2πk. For cos x = −½: x = 2π/3 + 2πk or x = 4π/3 + 2πk. General solution: x ∈ {2πk, 2π/3 + 2πk, 4π/3 + 2πk}.

#### Review Questions
1. Solve tan x = 1 for x in [0, 2π).
2. Find all solutions to sin(2x) = √3/2 in [0, 2π).
3. Solve cos²x = sin x for x in [0, 2π).

---
