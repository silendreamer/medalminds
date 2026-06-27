---
id: nsb-lesson-0719
title: "Integration Worked Problems"
level: hs
subject: math
topic: calculus
subtopic: "Integrals & Applications"
slug: hs-integrals-application
type: "Application"
estimatedMinutes: 15
keyConcepts: ["u-substitution", "integration by parts", "definite integrals"]
summary: "Step-by-step solutions to the integration problems most likely to appear in advanced HS math and Science Bowl."
---
#### Problem 1: Integration by Parts
∫xeˣ dx. Use IBP: ∫u dv = uv − ∫v du. Let u = x (simpler when differentiated), dv = eˣ dx. Then du = dx, v = eˣ. → xeˣ − ∫eˣ dx = xeˣ − eˣ + C = eˣ(x−1) + C. Verify: d/dx[eˣ(x−1)] = eˣ(x−1)+eˣ = xeˣ ✓. Rule of thumb for u: LIATE (Logs, Inverse trig, Algebraic, Trig, Exponential) — choose u from leftmost category.

#### Problem 2: Definite Integral with Substitution
∫₀¹ x/(x²+1) dx. Let u = x²+1, du = 2x dx → x dx = du/2. When x=0: u=1; when x=1: u=2. → (1/2)∫₁² (1/u) du = (1/2)[ln u]₁² = (1/2)(ln 2 − ln 1) = (ln 2)/2.

#### Problem 3: Trigonometric Integral
∫sin²(x) dx. Use identity: sin²x = (1−cos 2x)/2. → ∫(1−cos 2x)/2 dx = x/2 − (sin 2x)/4 + C.

#### Problem 4: Area Under a Curve (Numerical Setup)
Find the area between y = sin x and y = cos x from x = π/4 to x = 5π/4. At these bounds the functions intersect. On [π/4, 5π/4]: sin x ≥ cos x. Area = ∫_{π/4}^{5π/4} (sin x − cos x) dx = [−cos x − sin x]_{π/4}^{5π/4}. At 5π/4: −(−√2/2)−(−√2/2) = √2. At π/4: −√2/2−√2/2 = −√2. Area = √2−(−√2) = 2√2.

#### Review Questions
1. Evaluate ∫x·ln(x) dx using integration by parts.
2. Find ∫₀^(π/2) sin³(x) dx.
3. Compute the area enclosed by y = eˣ, y = 0, x = 0, x = 2.

---
