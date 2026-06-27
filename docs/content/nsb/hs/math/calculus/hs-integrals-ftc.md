---
id: nsb-lesson-0717
title: "The Definite Integral & Fundamental Theorem of Calculus"
level: hs
subject: math
topic: calculus
subtopic: "Integrals & Applications"
slug: hs-integrals-ftc
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["Riemann sum", "definite integral", "Fundamental Theorem"]
summary: "Integration accumulates change; the Fundamental Theorem of Calculus reveals that differentiation and integration are inverse operations."
---
#### The Definite Integral as Area
∫ₐᵇ f(x) dx = lim(n→∞) Σᵢ f(xᵢ)·Δx, where Δx = (b−a)/n and xᵢ = a+iΔx. This Riemann sum approximates area under the curve. When f(x) ≥ 0, the integral gives area. When f(x) < 0, it gives negative area (below x-axis). The net signed area between a and b can be computed as total area above minus total area below.

#### Fundamental Theorem of Calculus (FTC)
Part 1: If F(x) = ∫ₐˣ f(t) dt, then F'(x) = f(x). Antiderivative of an integral is the integrand. Part 2: ∫ₐᵇ f(x) dx = F(b) − F(a), where F is any antiderivative of f. Example: ∫₀³ x² dx = [x³/3]₀³ = 9 − 0 = 9. FTC bridges the two definitions of calculus: the geometric (area) and the algebraic (antiderivative).

#### Basic Antiderivative Rules
∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ −1). ∫1/x dx = ln|x| + C. ∫eˣ dx = eˣ + C. ∫sin x dx = −cos x + C. ∫cos x dx = sin x + C. ∫sec²x dx = tan x + C. Always add +C for indefinite integrals.

#### U-Substitution
Reverses the chain rule. Let u = g(x), du = g'(x)dx. ∫f(g(x))·g'(x) dx = ∫f(u) du. Example: ∫2x·cos(x²) dx. Let u = x², du = 2x dx. → ∫cos(u) du = sin(u)+C = sin(x²)+C.

#### Review Questions
1. Evaluate ∫₁⁴ (2x−3) dx using FTC Part 2.
2. Find the antiderivative of f(x) = 3x²+sin(x)+eˣ.
3. Use u-substitution to evaluate ∫x√(x²+1) dx.

---
