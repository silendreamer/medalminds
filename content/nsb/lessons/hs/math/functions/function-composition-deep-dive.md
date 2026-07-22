---
id: nsb-lesson-0654
title: "Function Composition: Deep Dive"
level: hs
subject: math
topic: functions
subtopic: "Composition & Inverse Functions"
slug: function-composition-deep-dive
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["f∘g", "domain of composition", "decomposing functions"]
summary: "Composition is the fundamental operation for building complex functions from simple ones — understand it mechanically and conceptually."
---
#### Composition Mechanics
(f∘g)(x) = f(g(x)): evaluate g first, feed the result to f. (g∘f)(x) = g(f(x)): evaluate f first, feed to g. These are different. Notation: (f∘g)(x) is read "f composed with g of x" or "f of g of x." The inner function (g here) is applied first.

Example: f(x) = x² + 1, g(x) = 2x − 3. (f∘g)(x) = f(2x−3) = (2x−3)² + 1 = 4x² − 12x + 10. (g∘f)(x) = g(x²+1) = 2(x²+1) − 3 = 2x² − 1. Clearly different.

#### Domain of f∘g
Domain of (f∘g) = {x : x ∈ dom(g) AND g(x) ∈ dom(f)}. Work through both conditions: x must be legal for g, and the output of g must be legal for f. If g(x) = √x and f(x) = 1/(x−3): domain of g is x ≥ 0. f(g(x)) = 1/(√x − 3): need √x ≠ 3 → x ≠ 9. Domain: [0, 9) ∪ (9, ∞). Note: even though f is undefined at x = 3, what matters is g(x) ≠ 3.

#### Decomposing Composite Functions
Given h(x) = (3x+2)⁵, write h = f∘g. Natural decomposition: g(x) = 3x+2 (the inner expression), f(x) = x⁵ (the outer operation). Verify: f(g(x)) = (3x+2)⁵. ✓ Decomposition is not unique — (f∘g∘k) could work with k(x) = x, g(x) = 3x+2, f(x) = x⁵. But the "natural" split is what chain rule in calculus uses.

#### Three-Function Composition
(f∘g∘h)(x) = f(g(h(x))): apply h, then g, then f. Example: f(x) = √x, g(x) = x+1, h(x) = x². (f∘g∘h)(x) = f(g(x²)) = f(x²+1) = √(x²+1). Domain: all reals (x²+1 ≥ 1 > 0).

#### Review Questions
1. f(x) = 1/x and g(x) = x + 2. Find (f∘g)(x) and (g∘f)(x). Are they equal?
2. h(x) = √(x²−4). Write h as f(g(x)) for appropriate f and g. State the domain.
3. If (f∘g)(x) = 5x² + 3 and g(x) = x², find f(x).

---
