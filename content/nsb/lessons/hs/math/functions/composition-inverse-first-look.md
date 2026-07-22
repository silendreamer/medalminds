---
id: nsb-lesson-0646
title: "Composition and Inverse: First Look"
level: hs
subject: math
topic: functions
subtopic: "Function Notation & Domain/Range"
slug: composition-inverse-first-look
type: "Application"
estimatedMinutes: 14
keyConcepts: ["f(g(x))", "inverse function", "domain of composition"]
summary: "Combining functions through composition and \"undoing\" them through inverses are core function operations."
---
#### Composition Step by Step
Given f(x) = 2x + 1 and g(x) = x², find f(g(x)) and g(f(x)). f(g(x)) = f(x²) = 2x² + 1. g(f(x)) = g(2x+1) = (2x+1)² = 4x² + 4x + 1. The order matters — composition is not commutative in general. To evaluate (f∘g)(3): first g(3) = 9, then f(9) = 19. Alternatively, use the formula: 2(3²)+1 = 19. ✓

#### Domain of a Composition
The domain of f(g(x)) requires: (1) x is in the domain of g, AND (2) g(x) is in the domain of f. If g(x) = √x (domain x ≥ 0) and f(x) = 1/(x−2) (domain x ≠ 2), then f(g(x)) = 1/(√x − 2). We need x ≥ 0 AND √x ≠ 2, so x ≠ 4. Domain: [0, 4) ∪ (4, ∞). Don't just substitute blindly — check both conditions.

#### Inverse Functions
The inverse function f⁻¹ "undoes" f: if f(a) = b, then f⁻¹(b) = a. Formally, f(f⁻¹(x)) = x and f⁻¹(f(x)) = x. To find f⁻¹: write y = f(x), swap x and y, solve for y. For f(x) = 2x + 1: y = 2x+1 → x = 2y+1 → y = (x−1)/2. So f⁻¹(x) = (x−1)/2. The graph of f⁻¹ is the reflection of f over the line y = x.

#### Existence of Inverses
A function has an inverse if and only if it is **one-to-one** — each output comes from exactly one input. Graphically: the horizontal line test. f(x) = x² fails (f(2) = f(−2) = 4), so it has no inverse on all reals. But restricted to x ≥ 0, it passes — the inverse is √x. This is why we restrict domains for square root inverses.

#### Review Questions
1. If f(x) = 3x − 5 and g(x) = (x+5)/3, verify these are inverses by computing f(g(x)) and g(f(x)).
2. Find f⁻¹ for f(x) = (2x+1)/(x−3). State its domain.
3. If h(x) = f(g(x)) where g(x) = x² + 2 and f(x) = ln(x), what is the domain of h?

---
