---
id: nsb-lesson-0707
title: "Understanding Limits: The Idea of Approaching a Value"
level: hs
subject: math
topic: calculus
subtopic: "Limits & Continuity"
slug: hs-limits-intro
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["limit", "approaching", "left/right-hand limits"]
summary: "A limit describes what value a function approaches as the input gets arbitrarily close to a point — not necessarily what the function equals there."
---
#### What Is a Limit?
The limit of f(x) as x → a is the value L that f(x) gets closer and closer to as x approaches a from both sides. We write lim(x→a) f(x) = L. The function does not need to be defined at x = a for the limit to exist — the limit is about the journey, not the destination. For example, lim(x→2) (x²−4)/(x−2) = lim(x→2)(x+2) = 4, even though the original expression is undefined at x = 2 (0/0 form).

#### One-Sided Limits
The left-hand limit lim(x→a⁻) f(x) is the value approached from values less than a. The right-hand limit lim(x→a⁺) f(x) is the value approached from values greater than a. A two-sided limit exists only when both one-sided limits exist AND are equal. If lim(x→0⁻) f(x) = 3 but lim(x→0⁺) f(x) = 5, then lim(x→0) f(x) does not exist (DNE).

#### Limit Laws
If lim(x→a) f(x) = L and lim(x→a) g(x) = M, then: sum rule → L+M; product rule → L·M; quotient rule → L/M (M≠0); constant multiple → k·L; power rule → Lⁿ. These allow you to evaluate limits of complex expressions by breaking them into parts. Direct substitution works when the function is continuous at the point.

#### Continuity
A function is continuous at x = a if three conditions hold: (1) f(a) is defined; (2) lim(x→a) f(x) exists; (3) lim(x→a) f(x) = f(a). Polynomials are continuous everywhere. Rational functions are continuous everywhere except where the denominator is zero. Understanding continuity is essential because continuous functions obey the Intermediate Value Theorem: if f(a) < 0 and f(b) > 0, then f(c) = 0 for some c between a and b.

#### Indeterminate Forms & Algebraic Techniques
When direct substitution gives 0/0, try: factoring and canceling (most common), multiplying by conjugate (useful for radicals), or recognizing standard limits (lim sin(x)/x as x→0 = 1). L'Hôpital's Rule (for 0/0 or ∞/∞ forms): lim f(x)/g(x) = lim f'(x)/g'(x).

#### Review Questions
1. Evaluate lim(x→3) (x²−9)/(x−3).
2. Does lim(x→0) |x|/x exist? Explain using one-sided limits.
3. State the three conditions for f to be continuous at x = a.

---
