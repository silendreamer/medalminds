# HS Math — Functions
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Function Notation & Domain/Range

### What Is a Function? Definitions and Notation
**Type:** Core Understanding
**Slug:** function-notation-definitions
**Estimated time:** 12 min
**Key concepts:** function definition · f(x) notation · vertical line test
**Summary:** A function assigns exactly one output to every input — understanding this precisely unlocks all of function analysis.

#### Defining a Function
A function is a rule that assigns to each element of the **domain** exactly one element of the **range**. The domain is the set of all valid inputs; the range is the set of all actual outputs. If any input maps to two different outputs, the relation is not a function. We write f(x) to mean "the output of function f when the input is x." So f(3) means "evaluate f at x = 3." The letter f is conventional but arbitrary — g, h, or any letter works.

#### The Vertical Line Test
A graph represents a function if and only if every vertical line crosses the graph at most once. A circle fails this test (a vertical line through its interior hits it twice). A parabola opening up or down passes. This test is a visual shortcut for the definition: two points on the same vertical line would share an x-value but have different y-values — violating the "one output per input" rule.

#### Domain Conventions
When no domain is specified, assume the **natural domain**: all real x for which the expression is defined. Two common restrictions: (1) denominators cannot be zero, so exclude those x values; (2) square roots (or even roots) require non-negative radicands. Example: f(x) = 1/(x−2) has domain all reals except x = 2. g(x) = √(x+5) has domain x ≥ −5.

#### Range Identification
Finding the range means asking: what y-values can the function actually output? For f(x) = x², the domain is all reals but the range is y ≥ 0 (squares are never negative). For f(x) = 2x + 1, the range is all reals (a non-horizontal line covers all y). Graphing helps: the range is the set of y-values the curve actually reaches.

#### Evaluating and Substituting
To evaluate f(x) = 3x² − 2x + 1 at x = −2: replace every x with −2. f(−2) = 3(−2)² − 2(−2) + 1 = 3(4) + 4 + 1 = 17. For function notation with expressions: f(a+1) = 3(a+1)² − 2(a+1) + 1 — expand carefully. This skill appears in every subsequent topic.

#### Review Questions
1. What is the domain of f(x) = √(4 − x²)?
2. Does the graph of x = y² represent a function of x? Explain.
3. If f(x) = x² + 3, find f(t − 1) and simplify.

---

### Domain and Range: Finding and Expressing Them
**Type:** Core Understanding
**Slug:** domain-range-finding
**Estimated time:** 11 min
**Key concepts:** interval notation · natural domain · range analysis
**Summary:** Systematically determine what inputs are allowed and what outputs are achievable for any function.

#### Interval Notation Review
Express domains and ranges using interval notation: (a, b) means a < x < b (open, endpoints excluded); [a, b] means a ≤ x ≤ b (closed); (a, b] mixes. Use ∞ for unbounded: (−∞, ∞) is all reals. A union symbol ∪ joins disconnected intervals: (−∞, 2) ∪ (2, ∞) means all reals except 2.

#### Rational Function Domains
For f(x) = (x+1)/((x−3)(x+5)): set each factor in the denominator ≠ 0. x ≠ 3 and x ≠ −5. Domain: (−∞, −5) ∪ (−5, 3) ∪ (3, ∞). Notice you exclude the zeros of the denominator, not the numerator. (Zeros of the numerator are just x-intercepts.)

#### Square Root Domains
For g(x) = √(2x − 6): the radicand must be ≥ 0. So 2x − 6 ≥ 0 → x ≥ 3. Domain: [3, ∞). Range: since √(2x−6) ≥ 0 and grows without bound, range is [0, ∞). For h(x) = √(9 − x²): need 9 − x² ≥ 0 → x² ≤ 9 → −3 ≤ x ≤ 3. Domain: [−3, 3]. This is the top half of a circle of radius 3.

#### Logarithmic Domains
log(x) requires x > 0 (strictly). ln(x − 4) requires x − 4 > 0, so x > 4. Domain: (4, ∞). log(x² + 1): since x² + 1 ≥ 1 > 0 for all real x, domain is all reals (−∞, ∞). This is a common trap — don't reflexively restrict log domains.

#### Range from Graphs and Analysis
For f(x) = −(x − 2)² + 5: this is a downward parabola with vertex at (2, 5). The maximum y-value is 5, and the parabola goes down to −∞. Range: (−∞, 5]. For f(x) = e^x, domain is all reals, range is (0, ∞) — exponentials are always positive and approach 0 asymptotically.

#### Review Questions
1. Find the domain of f(x) = ln(x² − 9).
2. What is the range of g(x) = 3/(x² + 1)?
3. A function has domain [−2, 5]. Its graph is a line segment with endpoints (−2, 4) and (5, −3). What is the range?

---

### Piecewise Functions and Absolute Value
**Type:** Core Understanding
**Slug:** piecewise-absolute-value
**Estimated time:** 12 min
**Key concepts:** piecewise definition · absolute value as piecewise · evaluating cases
**Summary:** Many real functions behave differently on different parts of their domain — piecewise notation captures this precisely.

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

### Applying Domain/Range: Real-World Functions
**Type:** Application
**Slug:** domain-range-real-world
**Estimated time:** 13 min
**Key concepts:** contextual domain · interpreting range · function modeling
**Summary:** Real applications restrict domain and range based on physical meaning, not just algebraic constraints.

#### Setting Up a Contextual Function
A farmer has 200 meters of fencing to enclose a rectangular field along a river (no fencing needed on the river side). If x is the width perpendicular to the river, the length is 200 − 2x. Area A(x) = x(200 − 2x) = 200x − 2x². Algebraically, this is defined for all x, but physically x must be positive and the length must be positive: 200 − 2x > 0 → x < 100. So the contextual domain is (0, 100). The range is (0, 5000] — the maximum area is A(50) = 5000 m².

#### Population Models
A bacterial population grows as P(t) = 1000 · 2^(t/3), where t is hours since start. Domain: t ≥ 0 (time doesn't go backwards in this context). Range: P ≥ 1000 (the population starts at 1000 and only grows). At t = 6: P(6) = 1000 · 2² = 4000 bacteria. The algebraic function is defined for all t, but the model is only valid while the food supply lasts — a typical real-world constraint not captured algebraically.

#### Projectile Height Function
A ball is launched from height 1.5 m with vertical velocity 20 m/s. Height: h(t) = −4.9t² + 20t + 1.5. Domain: 0 ≤ t ≤ time when h = 0. Solving −4.9t² + 20t + 1.5 = 0 gives t ≈ 4.15 s. So contextual domain is [0, 4.15]. Range: [0, h_max]. Vertex at t = 20/(9.8) ≈ 2.04 s: h_max ≈ −4.9(2.04)² + 20(2.04) + 1.5 ≈ 21.9 m. Range: [0, 21.9] approximately.

#### Interpreting Function Values
If C(x) = 50 + 12x gives the cost in dollars for printing x posters, then C(0) = 50 is the fixed setup cost. C(100) = 1250 means printing 100 posters costs $1250. The domain is positive integers (you can't print −3 or 2.7 posters), making this a discrete function on a practical level even if the formula is continuous.

#### Review Questions
1. A box is formed by cutting squares of side x from each corner of a 10×10 cm sheet and folding up the sides. Express volume V as a function of x and state its contextual domain.
2. The contextual domain of a spring's stretch function is [0, 0.3] meters. What does this restriction represent physically?
3. If profit P(x) = −2x² + 80x − 300, what x-values give positive profit?

---

### Composition and Inverse: First Look
**Type:** Application
**Slug:** composition-inverse-first-look
**Estimated time:** 14 min
**Key concepts:** f(g(x)) · inverse function · domain of composition
**Summary:** Combining functions through composition and "undoing" them through inverses are core function operations.

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

### Mixed Review: Domain, Range, and Notation
**Type:** Mixed/Review
**Slug:** functions-domain-range-review
**Estimated time:** 9 min
**Key concepts:** domain · range · function evaluation · notation
**Summary:** Rapid review of function fundamentals — evaluation, domain/range, notation — in Science Bowl format.

#### Quick Checks
f(x) = (x−1)/(x²−4): domain excludes x = ±2. Is x = 1 in the domain? Yes — x = 1 makes the numerator 0, but the function is defined (it equals 0). f(1) = 0. Domain: all reals except ±2. Range requires more analysis (rational function with holes at ±2).

For g(x) = √(x²−9): need x²−9 ≥ 0 → x² ≥ 9 → |x| ≥ 3. Domain: (−∞,−3] ∪ [3,∞). At x = 3: g(3) = 0. As x → ∞, g → ∞. Range: [0,∞).

#### Notation Traps
f⁻¹(x) is the inverse function, not 1/f(x). (f∘g)(x) = f(g(x)), not f(x)·g(x). [f(x)]² ≠ f(x²) in general. f(2x) ≠ 2f(x) unless f is linear. These are the most commonly confused notations in Science Bowl math.

#### Piecewise Evaluation
h(x) = {2x if x < −1; x² − 1 if −1 ≤ x ≤ 2; 5 if x > 2}. Find h(−3), h(0), h(2), h(7). h(−3) = 2(−3) = −6. h(0) = 0²−1 = −1. h(2) = 2²−1 = 3. h(7) = 5. Note at x = 2 the middle case applies (≤ 2), not the bottom.

#### Review Questions
1. If f(x) = x/(x+1), find f(1/x) and simplify completely.
2. For what values of k does g(x) = √(kx−4) have domain [2/k, ∞), assuming k > 0?
3. Is f(x) = x³ one-to-one? Does it have an inverse? What is it?

---

### Piecewise and Absolute Value Sprint
**Type:** Mixed/Review
**Slug:** piecewise-absolute-sprint
**Estimated time:** 8 min
**Key concepts:** absolute value equations · piecewise graphs · case analysis
**Summary:** Fast-paced review of piecewise functions and absolute value — the problem types most likely to appear in a Science Bowl math round.

#### Absolute Value Speed Drill
|5x − 10| = 20: case 1: 5x−10 = 20 → x = 6. Case 2: 5x−10 = −20 → x = −2. Both solutions: x ∈ {−2, 6}.
|x² − 5| = 4: x²−5 = 4 → x² = 9 → x = ±3. Or x²−5 = −4 → x² = 1 → x = ±1. Four solutions: ±1, ±3.
|2x + 1| < 7: −7 < 2x+1 < 7 → −8 < 2x < 6 → −4 < x < 3. Interval: (−4, 3).

#### Graphing Strategy
For g(x) = |x − 3| − 2: this is the absolute value parent function shifted right 3 and down 2. Vertex at (3, −2). Opens upward. x-intercepts where |x−3| = 2: x = 1 or x = 5. y-intercept: |0−3|−2 = 1.

#### Competition Speed Tips
For |ax + b| = c with c > 0: always two solutions (set equal to +c and −c). For c = 0: exactly one solution. For c < 0: no solution (absolute value is never negative). Memorize these cases — you need them in 30 seconds.

#### Review Questions
1. Solve |3x − 9| = |x + 1|.
2. For what x-values is |x² − 4| = x² − 4?
3. If f(x) = |x|/x for x ≠ 0, what are the only two values in the range of f?

---

### Science Bowl Functions Sprint
**Type:** Competition Extension
**Slug:** functions-bowl-sprint
**Estimated time:** 7 min
**Key concepts:** bowl toss-up format · function evaluation · domain traps
**Summary:** High-speed function problems in Science Bowl toss-up format — train recognition of the most frequently tested function question types.

#### Toss-Up Patterns
"For 10 points — what is the domain of f of x equals the square root of quantity 6 minus 2x?" → Set 6−2x ≥ 0 → x ≤ 3. Domain: (−∞, 3]. Answer: **x ≤ 3** or **(−∞, 3]**.

"For 10 points — if f of x equals 2x plus 3 and g of x equals x squared, what is f of g of 2?" → g(2) = 4, then f(4) = 11. Answer: **11**.

"For 10 points — what value is NOT in the domain of f of x equals 1 over the quantity x squared minus 9?" → x² = 9 → x = ±3. The values are **3 and −3** (or just answer whichever is asked).

#### High-Yield Facts for Bowl
- f(g(x)) ≠ g(f(x)) in general — order matters
- Inverse of f(x) = mx + b is f⁻¹(x) = (x−b)/m
- A function and its inverse are reflections over y = x
- If f(a) = 0, then a is a zero (x-intercept) of f
- |f(x)| ≥ 0 always; |f(x)| = 0 iff f(x) = 0

#### Review Questions
1. Toss-up style: f(x) = (x+2)/(x²−x−6). Name all values excluded from the domain.
2. If f(f(x)) = x for all x, what does this say about f and f⁻¹?
3. g(x) = 3^x. What is g⁻¹(27)?

---

## Subtopic: Function Transformations

### Parent Functions and the Transformation Framework
**Type:** Core Understanding
**Slug:** parent-functions-transformations-framework
**Estimated time:** 13 min
**Key concepts:** parent functions · vertical/horizontal shifts · reflections
**Summary:** Every common function is a transformed version of a small family of parent functions — mastering the transformation rules unlocks rapid graphing.

#### The Parent Function Library
Know these graphs cold: f(x) = x (linear), x² (parabola), x³ (cubic), √x (square root), |x| (absolute value), 1/x (reciprocal), e^x (exponential), ln(x) (logarithm), sin(x), cos(x). Each has a characteristic shape, key points, domain, and range. Transformations move, stretch, or flip these shapes without changing their fundamental character.

#### Vertical and Horizontal Shifts
f(x) + k shifts the graph **up** by k (down if k < 0). f(x − h) shifts the graph **right** by h (left if h < 0). Note the counterintuitive sign: f(x − 3) shifts right by 3, not left. Think: to get the same y-value, x must be 3 larger. Combined: f(x − h) + k shifts the vertex/key point to (h, k).

Example: g(x) = (x − 2)² + 3 is the parabola y = x² shifted right 2, up 3. Vertex at (2, 3). Opens upward. No horizontal stretch.

#### Vertical and Horizontal Stretches/Compressions
a · f(x): multiplies all y-values by a. If |a| > 1, vertical stretch; if 0 < |a| < 1, vertical compression. f(bx): if |b| > 1, horizontal compression (graph narrows); if 0 < |b| < 1, horizontal stretch. The horizontal case is counterintuitive: f(2x) compresses by factor 2 (points move closer to y-axis).

#### Reflections
−f(x) reflects over the **x-axis** (flips vertically). f(−x) reflects over the **y-axis** (flips horizontally). −f(−x) reflects over both (180° rotation about the origin). Combined with shifts: y = −(x+1)² + 4 is a downward parabola with vertex at (−1, 4).

#### Order of Transformations
Apply in this order: (1) horizontal shifts inside the function, (2) horizontal stretches/compressions, (3) reflections over y-axis, (4) vertical stretches/compressions, (5) reflections over x-axis, (6) vertical shifts. For g(x) = −2f(3x − 6) + 1: rewrite as −2f(3(x−2)) + 1. Shift right 2, compress horizontally by 1/3, stretch vertically by 2, reflect over x-axis, shift up 1.

#### Review Questions
1. Describe the transformations mapping y = x² to y = −3(x+4)² + 1.
2. Write the equation of √x shifted left 5, reflected over x-axis, and shifted up 2.
3. If f(3) = 7, what is the corresponding point on the graph of y = f(x−1) + 4?

---

### Stretches, Compressions, and Combined Transformations
**Type:** Core Understanding
**Slug:** stretches-compressions-combined
**Estimated time:** 12 min
**Key concepts:** vertical stretch · horizontal compression · combined transformations
**Summary:** Quantify how transformations scale the graph and apply multiple transformations correctly in sequence.

#### Vertical Stretches in Detail
For y = a·f(x): if a > 1, every y-value is multiplied by a — the graph appears taller. If 0 < a < 1, every y-value shrinks — the graph appears flatter. If a < 0, the graph also reflects over the x-axis. Key points: (x, y) on f(x) maps to (x, ay) on a·f(x). The x-intercepts (where y = 0) don't move; everything else stretches.

Example: y = 3|x| vs y = |x|. The point (2, 2) maps to (2, 6). The point (−1, 1) maps to (−1, 3). The vertex (0, 0) stays fixed.

#### Horizontal Stretches in Detail
For y = f(bx): the x-value needed to produce the same output changes. If b = 2, x is replaced by 2x — you need half the x to get the same input to f — so the graph compresses horizontally by factor 1/2. If b = 1/2, the graph stretches horizontally by factor 2. Key mapping: (x, y) on f(x) → (x/b, y) on f(bx).

Example: y = sin(2x) completes a full cycle in π (half the usual 2π period). y = sin(x/2) has period 4π.

#### Complex Example Walkthrough
Graph y = −2√(x+3) − 1 step by step. Parent: y = √x. Step 1: √(x+3) — shift left 3. Step 2: 2√(x+3) — stretch vertically by 2. Step 3: −2√(x+3) — reflect over x-axis. Step 4: −2√(x+3) − 1 — shift down 1. Key point: the corner of √x at (0, 0) maps to (−3, −1). Domain: x ≥ −3. Range: y ≤ −1.

#### Identifying Transformations from Equations
Given g(x) = (1/2)|3x − 9| + 2: rewrite as (1/2)|3(x−3)| + 2. Compared to y = |x|: horizontal shift right 3, horizontal compression by 1/3, vertical compression by 1/2, shift up 2.

#### Review Questions
1. The graph of y = f(x) passes through (4, −2). Where does y = 3f(x/2) pass?
2. What is the period of y = cos(πx/4)?
3. Describe all transformations from y = e^x to y = 2e^(−x+1) − 3.

---

### Transformation Applications: Reading Graphs
**Type:** Application
**Slug:** transformation-applications-graphs
**Estimated time:** 12 min
**Key concepts:** reading transformed graphs · key point tracking · writing equations from graphs
**Summary:** Given a transformed graph, identify the equation and use point-tracking to read off values.

#### Reading Key Points
If you see a parabola with vertex at (3, −2) opening downward with a vertical stretch, write: y = −a(x−3)² − 2. To find a, use another point. If it passes through (1, −10): −10 = −a(1−3)² − 2 = −4a − 2, so −8 = −4a, a = 2. Equation: y = −2(x−3)² − 2. This is the standard approach for "find the equation from the graph."

#### Point Tracking Through Multiple Transformations
Given that f(x) contains the point (2, 5), find the corresponding point on g(x) = 3f(x+1) − 4. The transformation maps x → x − 1 (horizontal shift left 1) and y → 3y − 4 (vertical stretch then shift). So (2, 5) maps to (2−1, 3·5−4) = (1, 11). Always apply horizontal transformations by moving x in the opposite direction, and vertical transformations directly.

#### Building the Equation from a Description
"The absolute value function stretched vertically by 4, reflected over the x-axis, shifted right 7 and up 2." Build piece by piece: start with |x|. Shift right 7: |x−7|. Reflect and stretch: −4|x−7|. Shift up 2: y = −4|x−7| + 2. Vertex at (7, 2), opens downward, slope ±4.

#### Matching Graphs to Equations
Common exam strategy: identify (a) the parent function shape, (b) where key points (vertex, intercepts, asymptotes) moved, (c) whether there's a reflection. Then write the equation. For rational functions, shifted asymptotes tell you the horizontal and vertical shifts directly.

#### Review Questions
1. A parabola has vertex (−1, 4) and passes through (1, 0). Find its equation.
2. The graph of y = f(x) has a point (3, 6). If y = (1/2)f(2x), what point corresponds?
3. Describe the transformation that maps y = 1/x to y = (3/(x−5)) + 2.

---

### Transformation Synthesis
**Type:** Mixed/Review
**Slug:** transformation-synthesis-review
**Estimated time:** 9 min
**Key concepts:** transformation identification · equation writing · point tracking
**Summary:** Synthesize transformation knowledge through rapid-fire problems combining identification, point tracking, and equation writing.

#### Rapid Identification
y = √(−x): reflect y = √x over y-axis. Domain: x ≤ 0.
y = −|x+2|: reflect y = |x| over x-axis and shift left 2. Vertex at (−2, 0), opens downward.
y = 3/(x−1) + 2: shift y = 1/x right 1 and up 2. Vertical asymptote x = 1, horizontal asymptote y = 2.
y = e^(2x): y = e^x compressed horizontally by factor 2.

#### Common Mistakes
Confusing f(x−3) (shift RIGHT) with f(x+3) (shift LEFT). The sign in the argument is opposite the shift direction. Also: a · f(x) with |a| > 1 is a VERTICAL stretch, not horizontal. Horizontal transformations affect x; vertical affect y. These errors are extremely common.

#### Mixed Problems
If g(x) = |x² − 4| (absolute value of a quadratic): graph y = x²−4 first, then reflect any portion below the x-axis upward. x-intercepts of x²−4 are ±2, so the graph dips below the x-axis between −2 and 2 — that part gets reflected up. The result has zeros at ±2 and a local maximum of 4 at x = 0 (where the original had a minimum of −4).

#### Review Questions
1. y = sin(x) has a zero at x = 0 and period 2π. Where are the zeros of y = sin(2x+π)?
2. Given f(x) = x², write the equation for the graph shifted left 3, reflected over the x-axis, and shifted up 5.
3. The graph of y = f(x) is symmetric about x = 2. Is f(x) even, odd, or neither? Explain.

---

## Subtopic: Composition & Inverse Functions

### Function Composition: Deep Dive
**Type:** Core Understanding
**Slug:** function-composition-deep-dive
**Estimated time:** 13 min
**Key concepts:** f∘g · domain of composition · decomposing functions
**Summary:** Composition is the fundamental operation for building complex functions from simple ones — understand it mechanically and conceptually.

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

### Inverse Functions: Finding and Verifying
**Type:** Core Understanding
**Slug:** inverse-functions-finding-verifying
**Estimated time:** 13 min
**Key concepts:** inverse function · horizontal line test · verifying inverses
**Summary:** The inverse of a function precisely undoes it — learn to find, verify, and interpret inverses algebraically and graphically.

#### Finding Inverses Algebraically
Step 1: Write y = f(x). Step 2: Swap x and y. Step 3: Solve for y. Step 4: Write y = f⁻¹(x). Example: f(x) = (3x−1)/(2x+5). Write y = (3x−1)/(2x+5). Swap: x = (3y−1)/(2y+5). Solve: x(2y+5) = 3y−1 → 2xy + 5x = 3y − 1 → 2xy − 3y = −5x − 1 → y(2x−3) = −5x−1 → y = (−5x−1)/(2x−3). So f⁻¹(x) = (−5x−1)/(2x−3).

#### Verifying Inverses
Verify by checking both f(f⁻¹(x)) = x and f⁻¹(f(x)) = x. Both must hold. If only one holds, there may be a domain restriction issue. Example: f(x) = x² (x ≥ 0) and g(x) = √x. f(g(x)) = (√x)² = x for x ≥ 0. ✓ g(f(x)) = √(x²) = |x| = x for x ≥ 0 (since we restricted x ≥ 0). ✓

#### Graphical Relationship
The graph of f⁻¹ is the reflection of f over the line y = x. If (a, b) is on f, then (b, a) is on f⁻¹. This means: x-intercepts of f become y-intercepts of f⁻¹, and vice versa. Asymptotes also reflect: a vertical asymptote of f at x = a becomes a horizontal asymptote of f⁻¹ at y = a.

#### Domain and Range Swap
The domain of f⁻¹ equals the range of f. The range of f⁻¹ equals the domain of f. This is fundamental — the inverse swaps inputs and outputs, so it swaps domain and range. If f has domain [−2, 5] and range [0, 10], then f⁻¹ has domain [0, 10] and range [−2, 5].

#### Review Questions
1. Find f⁻¹(x) for f(x) = e^(2x) − 1.
2. Verify that f(x) = (x+1)/(x−2) and g(x) = (2x+1)/(x−1) are inverses.
3. f has a horizontal asymptote at y = 3. What does f⁻¹ have and where?

---

### Inverse Functions: Applied Problems
**Type:** Application
**Slug:** inverse-functions-applied
**Estimated time:** 13 min
**Key concepts:** inverse in context · temperature conversion · decoding functions
**Summary:** Inverses arise naturally when you need to "undo" a process — from converting units to decoding encoded messages.

#### Temperature Conversion
F = (9/5)C + 32 converts Celsius to Fahrenheit. The inverse converts Fahrenheit to Celsius. Swap C and F: C = (9/5)F + 32. Solve for F (now our output): C − 32 = (9/5)F → F = (5/9)(C−32). So Celsius to Fahrenheit: F = (9/5)C + 32. Fahrenheit to Celsius: C = (5/9)(F−32). These are inverses of each other. Use C = (5/9)(212−32) = (5/9)(180) = 100°C for boiling water. ✓

#### Compound Interest Inversion
A = P·e^(rt) gives the amount after t years (continuous compounding). To find t given A: t = ln(A/P)/r. This is the inverse function with t as the output. If P = $1000, r = 0.06, and you want A = $2000: t = ln(2)/0.06 ≈ 11.55 years. The inverse "undoes" the exponential growth to find time.

#### Supply/Demand Inverse
A demand function gives quantity demanded as a function of price: Q = 100 − 2P. The inverse gives price as a function of quantity (the "inverse demand" in economics): 2P = 100 − Q → P = 50 − Q/2. Economists frequently work with the inverse demand curve — same information, different variable solved for.

#### Composition as Verification in Context
Fahrenheit → Kelvin: K = F·(5/9) + 255.37 (approximately). Kelvin → Fahrenheit: F = (K − 255.37)·(9/5). Compose them to verify: F → K → F should return the original F. ([(F·5/9+255.37) − 255.37]·9/5 = F·5/9·9/5 = F. ✓) Composition verification is the rigorous check.

#### Review Questions
1. The function V(t) = 5000(0.85)^t gives a car's value after t years. Find t when V = 2000. What does the inverse function V⁻¹ mean in context?
2. A code shifts each letter by k positions in the alphabet. Write the encoding function and its inverse.
3. If f(x) = 2x + 1 and g is the inverse of f, compute g(f(g(7))).

---

### Composition and Inverse Mixed Review
**Type:** Mixed/Review
**Slug:** composition-inverse-mixed-review
**Estimated time:** 9 min
**Key concepts:** composition · inverse · domain · verification
**Summary:** Fast synthesis of composition and inverse function skills — the full toolkit tested together.

#### Combined Problems
f(x) = √(x−1), g(x) = x² + 1. Find f∘g and g∘f. (f∘g)(x) = f(x²+1) = √(x²+1−1) = √(x²) = |x|. Domain: all reals. (g∘f)(x) = g(√(x−1)) = (√(x−1))² + 1 = (x−1) + 1 = x, for x ≥ 1. Interesting: g∘f is the identity on [1, ∞) — g and f are inverses of each other on this domain!

#### Self-Inverse Functions
A function that equals its own inverse: f(f(x)) = x. Examples: f(x) = 1/x, f(x) = −x, f(x) = (a−x)/(something). These are called **involutions**. On a graph, they are symmetric over y = x (they are their own reflections over y = x).

#### Inverse of Compositions
(f∘g)⁻¹ = g⁻¹ ∘ f⁻¹ (reverse order!). Intuition: if f∘g encodes first by g then by f, you decode by undoing f first, then g. Example: f(x) = 2x, g(x) = x+3. (f∘g)(x) = 2(x+3) = 2x+6. Inverse: (y−6)/2 = y/2 − 3. Check: g⁻¹(f⁻¹(x)) = g⁻¹(x/2) = x/2 − 3. ✓

#### Review Questions
1. f(x) = 3x − 2 and g(x) = (x+2)/3. Compute (f∘g)(x) and (g∘f)(x). What relationship does this reveal?
2. Find the inverse of h(x) = 5/(x+2) − 3.
3. If f is one-to-one and f(2) = 7, what is f⁻¹(7)? What is f(f⁻¹(7))?

---

## Subtopic: Polynomial, Rational, Exponential & Logarithmic Functions

### Polynomial Functions: Zeros, End Behavior, and Graphs
**Type:** Core Understanding
**Slug:** polynomial-zeros-end-behavior
**Estimated time:** 14 min
**Key concepts:** zeros · multiplicity · end behavior · Factor Theorem
**Summary:** Polynomial graphs are determined by their zeros and their degree — understand these connections to graph and analyze any polynomial.

#### Zeros and the Factor Theorem
If f(c) = 0, then c is a **zero** of f, and (x−c) is a **factor** of f(x). The Factor Theorem says the converse too: if (x−c) is a factor, then f(c) = 0. To factor f(x) = x³ − 6x² + 11x − 6: test x=1: 1−6+11−6=0. ✓ So (x−1) is a factor. Divide: (x−1)(x²−5x+6) = (x−1)(x−2)(x−3). Zeros: 1, 2, 3.

#### Multiplicity and Graph Behavior
The multiplicity of a zero determines how the graph behaves at that x-intercept. Odd multiplicity (1, 3, 5, ...): graph **crosses** the x-axis. Even multiplicity (2, 4, ...): graph **touches** the x-axis and turns back (bounces). For f(x) = (x−1)²(x+2): zero at x=1 with multiplicity 2 (graph touches), zero at x=−2 with multiplicity 1 (graph crosses).

#### End Behavior
Determined by the leading term (highest degree term). For a·xⁿ: if a > 0 and n even → both ends go up. If a < 0 and n even → both ends go down. If a > 0 and n odd → left end down, right end up. If a < 0 and n odd → left end up, right end down. These are fixed — they don't change regardless of other terms.

#### Sketching a Polynomial
Steps: (1) Identify all zeros and their multiplicities. (2) Determine end behavior. (3) Find y-intercept (set x = 0). (4) Plot and connect, respecting crossings vs. touches at each zero. A degree-n polynomial has at most n−1 turning points and exactly n zeros (counting multiplicity, over the complex numbers).

#### Rational Root Theorem
For polynomial with integer coefficients, rational roots p/q satisfy: p divides the constant term and q divides the leading coefficient. For 2x³ − 3x² − 11x + 6: possible rational roots are ±1, ±2, ±3, ±6, ±1/2, ±3/2. Test each to find actual zeros.

#### Review Questions
1. Find all real zeros of f(x) = x⁴ − 5x² + 4.
2. Graph the behavior of f(x) = −2(x+1)³(x−3)² near each zero and describe end behavior.
3. Use the Rational Root Theorem to find all rational zeros of 3x³ + 2x² − 7x + 2.

---

### Rational Functions: Asymptotes and Graphs
**Type:** Core Understanding
**Slug:** rational-functions-asymptotes
**Estimated time:** 13 min
**Key concepts:** vertical asymptotes · horizontal asymptotes · holes · oblique asymptotes
**Summary:** Rational functions have rich graph structure driven by asymptotes and holes — understand each type and how to find them.

#### Vertical Asymptotes
Occur where the denominator equals zero AND the numerator is not also zero at that point. For f(x) = (x+1)/((x−3)(x+2)): VA at x = 3 and x = −2. Behavior near a VA: the function approaches +∞ or −∞ (check sign). If both numerator and denominator have a zero at the same point, that's a **hole**, not a VA.

#### Holes (Removable Discontinuities)
f(x) = (x²−4)/(x−2) = (x+2)(x−2)/(x−2). Cancel the (x−2): g(x) = x+2, but f has a hole at x = 2 (not defined there). The hole is at (2, 4) — plug x = 2 into the simplified form. On a graph, draw an open circle at that point.

#### Horizontal Asymptotes
Compare degrees of numerator (n) and denominator (m). If n < m: HA at y = 0. If n = m: HA at y = (leading coefficient of numerator)/(leading coefficient of denominator). If n > m by 1: oblique asymptote (do polynomial long division). If n > m by more: no horizontal or oblique asymptote.

Example: (3x² + 2x)/(x² − 1): degrees equal, HA at y = 3/1 = 3.

#### Oblique Asymptotes
When degree of numerator is exactly 1 more than denominator: divide and the quotient (linear part) is the oblique asymptote. For (x² + 3x + 5)/(x + 1): divide: x + 2 + 3/(x+1). As x → ±∞, the 3/(x+1) → 0. Oblique asymptote: y = x + 2.

#### Graphing Strategy
(1) Find domain (exclude zeros of denominator). (2) Find holes. (3) Find VA, HA/oblique asymptotes. (4) Find x- and y-intercepts. (5) Check signs in each region between VAs.

#### Review Questions
1. Find all asymptotes and holes of f(x) = (x²−9)/(x²+x−12).
2. For g(x) = (2x³−x)/(x²+1), find the oblique asymptote.
3. Sketch the key features of h(x) = (x+2)/((x−1)(x+3)).

---

### Exponential and Logarithmic Functions in Science Bowl
**Type:** Competition Extension
**Slug:** exp-log-science-bowl
**Estimated time:** 7 min
**Key concepts:** exponential growth/decay · logarithm laws · change of base
**Summary:** Exponential and logarithmic functions are high-frequency Science Bowl targets — drill the key formulas and toss-up recognition patterns.

#### High-Yield Formulas
log_b(xy) = log_b(x) + log_b(y). log_b(x/y) = log_b(x) − log_b(y). log_b(xⁿ) = n·log_b(x). Change of base: log_b(x) = log(x)/log(b) = ln(x)/ln(b). log_b(b) = 1. log_b(1) = 0. b^(log_b(x)) = x. log_b(b^x) = x. These are the fundamental identities — know them instantly.

#### Common Bowl Question Types
"Simplify log_2(8) + log_2(4)": log_2(32) = 5.
"Solve 2^(3x) = 64": 64 = 2^6, so 3x = 6, x = 2.
"Solve log(x) + log(x−3) = 1": log(x(x−3)) = 1 → x(x−3) = 10 → x²−3x−10 = 0 → (x−5)(x+2) = 0. x = 5 (x = −2 rejected since log of negative is undefined).

#### Half-Life and Growth
N(t) = N₀·(1/2)^(t/h) for half-life h. N(t) = N₀·e^(rt) for continuous growth rate r. "At what time does the population double?" → 2 = e^(rt) → t = ln(2)/r ≈ 0.693/r. Doubling time formula: T₂ = ln(2)/r. Rule of 70: T₂ ≈ 70/r% (for percent rate r).

#### Toss-Up Stems
"For 10 points — solve for x in the equation log base 3 of x plus log base 3 of quantity x minus 6 equals 3." → log₃(x(x−6)) = 3 → x(x−6) = 27 → x²−6x−27=0 → (x−9)(x+3)=0 → x = 9.

#### Review Questions
1. Simplify: log₅(25√5).
2. Solve: 3^(x+2) = 5^x. Express x in terms of logarithms.
3. A substance has a half-life of 12 years. What fraction remains after 36 years?

---
