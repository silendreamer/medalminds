---
id: nsb-lesson-0688
title: "Trigonometry Identities and Proofs"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: trig-identities-proofs
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["proving identities", "algebraic manipulation", "substitution techniques"]
summary: "Proving trigonometric identities strengthens algebraic skills and deepens understanding."
---
#### Strategy for Proving Identities
Simplify the more complex side to match the simpler side. Avoid cross-multiplying or squaring (which can introduce extraneous solutions). Use established identities: Pythagorean, reciprocal, quotient, sum/difference, double/half-angle. Convert everything to sin and cos if stuck. Combine fractions over a common denominator. Factor when possible. Example: prove (1 + cos θ)/sin θ = sin θ/(1 − cos θ). Cross-multiply: (1+cos θ)² = sin²θ · (1 − cos θ)... Actually, don't. Instead, simplify the left side using the Pythagorean identity: multiply numerator and denominator by (1−cos θ): [(1+cos θ)(1−cos θ)] / [sin θ(1−cos θ)] = (1−cos²θ) / [sin θ(1−cos θ)] = sin²θ / [sin θ(1−cos θ)] = sin θ / (1−cos θ). ✓

#### Proving with Sum Formulas
Prove: sin(A+B) + sin(A−B) = 2 sin A cos B. Expand the left side: [sin A cos B + cos A sin B] + [sin A cos B − cos A sin B] = 2 sin A cos B. ✓ These proofs build fluency with the formulas and prepare for integration in calculus (where sum-to-product converts are essential).

#### Proving Double-Angle Identities from Sum Formulas
Prove: cos(2θ) = 2cos²θ − 1. Start with the sum formula cos(2θ) = cos(θ+θ) = cos θ cos θ − sin θ sin θ = cos²θ − sin²θ. Use the Pythagorean identity sin²θ = 1 − cos²θ: cos²θ − (1−cos²θ) = 2cos²θ − 1. ✓ This shows how identities connect and reinforce each other.

#### Proving Inverse Function Properties
Prove: sin⁻¹(x) + cos⁻¹(x) = π/2 for x ∈ [−1, 1]. Let α = sin⁻¹(x), so sin α = x and α ∈ [−π/2, π/2]. Consider β = π/2 − α. Then cos β = cos(π/2 − α) = sin α = x (by the cofunction identity). Since β = π/2 − α and α ∈ [−π/2, π/2], we have β ∈ [0, π]. Thus β = cos⁻¹(x). Therefore, π/2 − α = cos⁻¹(x), so α + cos⁻¹(x) = π/2, i.e., sin⁻¹(x) + cos⁻¹(x) = π/2. ✓

#### Review Questions
1. Prove: tan²θ + 1 = sec²θ.
2. Prove: sin(3θ) = 3 sin θ − 4 sin³θ.
3. Prove: (sin θ + cos θ)² + (sin θ − cos θ)² = 2.

---
