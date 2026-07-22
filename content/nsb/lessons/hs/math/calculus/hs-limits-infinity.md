---
id: nsb-lesson-0708
title: "Limits at Infinity & Asymptotic Behavior"
level: hs
subject: math
topic: calculus
subtopic: "Limits & Continuity"
slug: hs-limits-infinity
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["limits at infinity", "horizontal asymptotes", "end behavior"]
summary: "Limits at infinity describe what a function approaches as x grows without bound, revealing horizontal asymptotes and long-run behavior."
---
#### Limits at Infinity for Rational Functions
For rational functions p(x)/q(x), end behavior depends on comparing degrees. If deg(p) < deg(q): limit = 0 (horizontal asymptote y = 0). If deg(p) = deg(q): limit = ratio of leading coefficients. If deg(p) > deg(q): limit = ±∞ (no horizontal asymptote). Example: lim(x→∞) (3x²+2x)/(5x²−1) = 3/5 because the leading terms dominate.

#### Infinite Limits & Vertical Asymptotes
lim(x→a) f(x) = ∞ means f grows without bound as x → a. Vertical asymptotes occur at zeros of the denominator that don't cancel. For f(x) = 1/(x−2): as x → 2⁺, f → +∞; as x → 2⁻, f → −∞. The sign depends on whether the numerator and denominator have matching or opposite signs near the asymptote.

#### Standard Limits to Know
lim(x→∞) (1 + 1/n)ⁿ = e ≈ 2.718. lim(x→0) sin(x)/x = 1 (the most important trig limit). lim(x→0) (1−cos x)/x = 0. lim(x→0) (eˣ−1)/x = 1. These appear constantly in derivative definitions and competition problems.

#### Squeeze Theorem
If g(x) ≤ f(x) ≤ h(x) near a and lim g(x) = lim h(x) = L, then lim f(x) = L. Classic use: lim(x→0) x²·sin(1/x) = 0, because −x² ≤ x²·sin(1/x) ≤ x² and both bounds → 0.

#### Review Questions
1. Find lim(x→∞) (2x³−x)/(4x³+7).
2. Identify any horizontal or vertical asymptotes of f(x) = (x+1)/(x²−1).
3. Use the squeeze theorem to find lim(x→0) x·cos(1/x).

---
