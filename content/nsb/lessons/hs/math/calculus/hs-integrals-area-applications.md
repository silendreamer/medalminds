---
id: nsb-lesson-0718
title: "Area, Accumulation & Applications of Integration"
level: hs
subject: math
topic: calculus
subtopic: "Integrals & Applications"
slug: hs-integrals-area-applications
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["area between curves", "average value", "displacement vs. distance"]
summary: "Integration computes areas between curves, average values, net displacement, and accumulated quantities — the bridge from calculus to physics."
---
#### Area Between Two Curves
Area = ∫ₐᵇ [f(x)−g(x)] dx, where f(x) ≥ g(x) on [a,b]. Find intersection points first (set f = g). Example: Area between y = x² and y = x. Intersect at x = 0, 1. Area = ∫₀¹ (x−x²) dx = [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6.

#### Average Value of a Function
f_avg = (1/(b−a)) ∫ₐᵇ f(x) dx. Example: Average value of sin(x) on [0,π]: (1/π)∫₀^π sin x dx = (1/π)[−cos x]₀^π = (1/π)(1+1) = 2/π ≈ 0.637.

#### Displacement vs. Total Distance
For velocity v(t): Net displacement = ∫ₐᵇ v(t) dt. Total distance = ∫ₐᵇ |v(t)| dt. If v changes sign, split the integral at zeros. Example: v(t) = t²−4 on [0,3]. Zeros at t = 2. Distance = ∫₀² (4−t²) dt + ∫₂³ (t²−4) dt = [4t−t³/3]₀² + [t³/3−4t]₂³ = 16/3 + 7/3 = 23/3.

#### Volume of Revolution (Shell/Disk Method)
Disk method: V = π∫ₐᵇ [f(x)]² dx (rotation around x-axis). Shell method: V = 2π∫ₐᵇ x·f(x) dx (rotation around y-axis). Example: Rotate y = √x about x-axis from x = 0 to 4. V = π∫₀⁴ x dx = π[x²/2]₀⁴ = 8π.

#### Review Questions
1. Find the area enclosed by y = x² and y = 2x+3.
2. What is the average value of f(x) = x³ on [0, 2]?
3. A particle has v(t) = t²−2t. Find displacement and total distance on [0, 3].

---
