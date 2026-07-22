---
id: nsb-lesson-0644
title: "Piecewise Functions and Absolute Value"
level: hs
subject: math
topic: functions
subtopic: "Function Notation & Domain/Range"
slug: piecewise-absolute-value
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["piecewise definition", "absolute value as piecewise", "evaluating cases"]
summary: "Many real functions behave differently on different parts of their domain — piecewise notation captures this precisely."
---
#### Defining Piecewise Functions
A piecewise function uses different formulas on different subdomains. The standard notation lists cases with conditions: f(x) = {x² if x < 0; 2x+1 if x ≥ 0}. To evaluate, determine which case applies first, then compute. f(−3) uses x² since −3 < 0: f(−3) = 9. f(4) uses 2x+1 since 4 ≥ 0: f(4) = 9. Coincidence here — the outputs match, though the rules differ.

#### Continuity at Breakpoints
Check whether a piecewise function is continuous at its boundary point by comparing the left and right limits. For the example above at x = 0: approaching from the left (x → 0⁻): x² → 0. Approaching from the right (x → 0⁺): 2x+1 → 1. The limits differ, so the function is discontinuous at x = 0 (there's a jump).

#### Absolute Value as Piecewise
|x| = {x if x ≥ 0; −x if x < 0}. This definition lets you solve absolute value equations systematically: |2x − 3| = 7 means either 2x − 3 = 7 (x = 5) or 2x − 3 = −7 (x = −2). For inequalities: |x − 4| < 2 means −2 < x − 4 < 2, so 2 < x < 6. These split into cases based on the same piecewise idea.

#### Graphing Piecewise Functions
Plot each piece on its interval, paying careful attention to open vs. closed endpoints (open circle for excluded endpoints, filled for included). A piecewise function can be continuous (no gaps or jumps), have jump discontinuities (gap in y), or have removable discontinuities (a single "hole"). Each piece is graphed only on its stated domain.

#### The Floor and Ceiling Functions
⌊x⌋ (floor) gives the greatest integer ≤ x: ⌊3.7⌋ = 3, ⌊−1.2⌋ = −2. ⌈x⌉ (ceiling) gives the least integer ≥ x. These are step functions — constant on each interval [n, n+1) — and appear in Science Bowl discrete math questions.

#### Review Questions
1. Let f(x) = {3x+2 if x ≤ 1; x² if x > 1}. Find f(1) and f(3). Is f continuous at x = 1?
2. Solve |3x + 6| = 15.
3. What is ⌊−2.3⌋ + ⌈1.7⌉?

---
