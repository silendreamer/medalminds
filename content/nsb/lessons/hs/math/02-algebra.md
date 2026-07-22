# HS Math — Algebra
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Linear Equations, Inequalities & Systems

### Linear Equations and Their Solutions
**Type:** Core Understanding
**Slug:** linear-equations-solutions
**Estimated time:** 11 min
**Key concepts:** linear equation · solution · equivalent equations
**Summary:** A linear equation in one variable has exactly one solution, no solution, or infinitely many — determined by algebraic structure, not trial.

#### What Makes an Equation Linear?
A linear equation in variable x has the form ax + b = c where a, b, c are constants (a ≠ 0). "Linear" because the graph y = ax + b is a straight line. To solve: isolate x by applying inverse operations (add/subtract the same quantity to both sides; multiply/divide by nonzero constant). Solution: x = (c − b)/a.

#### One, Zero, or Infinitely Many Solutions
- One solution: 2x + 3 = 7 → x = 2.
- No solution (contradiction): 2x + 3 = 2x + 5 → 3 = 5. False for all x.
- Infinitely many solutions (identity): 2x + 4 = 2(x + 2) → 4 = 4. True for all x.
These cases arise in systems when lines are intersecting, parallel, or coincident.

#### Inequalities
Same rules as equations, except: **multiply or divide by a negative number reverses the inequality sign.** 2x + 3 > 7 → 2x > 4 → x > 2. For compound inequalities: −3 < 2x + 1 ≤ 9 → −4 < 2x ≤ 8 → −2 < x ≤ 4. Solution sets for inequalities are intervals, not points.

#### Review Questions
1. Solve: 3(2x − 4) = 6x − 12. How many solutions?
2. Solve and graph: −5 ≤ 3x + 1 < 10.
3. For what value of k does 2x + k = 2x + 5 have no solution?

---

### Systems of Linear Equations
**Type:** Core Understanding
**Slug:** systems-linear-equations
**Estimated time:** 13 min
**Key concepts:** substitution · elimination · Gaussian elimination · matrix
**Summary:** Systems of linear equations are solved by elimination, substitution, or matrix methods — the solution is the intersection of the corresponding lines (or planes in 3D).

#### Two-Variable Systems
Three outcomes: unique solution (lines intersect), no solution (parallel lines, inconsistent), infinitely many (same line, dependent). Methods: (1) **Substitution:** solve one equation for one variable, substitute. (2) **Elimination (addition/subtraction):** add multiples of equations to eliminate a variable.

Example: 2x + y = 5 and x − y = 1. Add: 3x = 6, x = 2, y = 1.

#### Matrix Form and Gaussian Elimination
System ax + by = e, cx + dy = f becomes [a b | e; c d | f]. Row reduce to echelon form. For n equations in n unknowns, Gaussian elimination runs in O(n³). Row operations: swap rows, multiply row by nonzero constant, add multiple of one row to another.

#### Three-Variable Systems
3 equations in 3 unknowns: reduce to 2×2 by eliminating one variable, then solve. Check answer by substituting back into all 3 original equations.

#### Review Questions
1. Solve the system: 3x − 2y = 4 and x + 4y = 10.
2. When does a 2×2 linear system have no solution? Infinitely many?
3. Write the system x + y + z = 6, 2x + y = 5, 3z = 9 as an augmented matrix.

---

### Linear Inequalities and Linear Programming
**Type:** Core Understanding
**Slug:** linear-inequalities-linear-programming
**Estimated time:** 12 min
**Key concepts:** feasible region · objective function · vertex · corner point theorem
**Summary:** Linear programming maximizes or minimizes a linear objective over a convex polygonal feasible region — the optimum always occurs at a vertex.

#### Graphing Systems of Inequalities
Each linear inequality defines a half-plane. The feasible region is the intersection of all half-planes — a convex polygon (or unbounded region). Steps: (1) Graph each boundary line (solid for ≤ or ≥, dashed for < or >). (2) Shade the correct half-plane (test a point). (3) Identify the feasible region as the overlap.

#### Corner Point Theorem
For a bounded feasible region, the maximum and minimum of any linear objective function Z = ax + by occur at a vertex (corner point) of the feasible region. Strategy: identify vertices, evaluate Z at each, choose the extremum.

#### Worked Example
Maximize Z = 3x + 2y subject to: x + y ≤ 4, x ≥ 0, y ≥ 0, 2x + y ≤ 6.
Vertices: (0,0), (3,0), (2,2), (0,4).
Z values: 0, 9, 10, 8. Maximum Z = 10 at (2, 2).

#### Review Questions
1. Graph the feasible region: x + y ≤ 5, x ≥ 1, y ≥ 0.
2. Maximize P = 4x + y over the region with vertices (0,0), (5,0), (3,2), (0,4).
3. Why does the maximum always occur at a vertex?

---

### Systems and Inequalities Applications
**Type:** Application
**Slug:** systems-inequalities-applications
**Estimated time:** 14 min
**Key concepts:** mixture · rate · break-even
**Summary:** Linear systems model real-world mixture, rate, and break-even problems — set up equations from word problem structure.

#### Worked Example 1: Mixture Problem
A chemist needs 100 mL of a 25% acid solution. She has a 10% and a 40% solution. How much of each?
Let x = mL of 10%, y = mL of 40%.
System: x + y = 100 (volume), 0.10x + 0.40y = 25 (acid).
From first: x = 100 − y. Substitute: 0.10(100−y) + 0.40y = 25 → 10 − 0.10y + 0.40y = 25 → 0.30y = 15 → y = 50, x = 50.

#### Worked Example 2: Break-Even
Revenue = 15q, Cost = 500 + 8q. Break-even: 15q = 500 + 8q → 7q = 500 → q ≈ 72 units.
Profit P = 7q − 500 > 0 when q > 72.

#### Worked Example 3: Current/Boat Problem
A boat travels 30 km downstream in 2 hours and 30 km upstream in 3 hours. Find the boat speed b and current c.
(b + c) = 15 (downstream), (b − c) = 10 (upstream). Add: 2b = 25, b = 12.5 km/h, c = 2.5 km/h.

#### Review Questions
1. A store sells two products. Product A costs $4 to make, Product B costs $7. Total cost is $370 for 70 items. How many of each?
2. A plane flies 2400 km with a tailwind in 4 hours, and against the wind in 6 hours. Find wind speed.
3. At what quantity does a business break even if fixed cost = $200, variable cost = $3/unit, price = $8/unit?

---

### Linear Equations Mixed Review
**Type:** Mixed/Review
**Slug:** linear-equations-mixed-review
**Estimated time:** 8 min
**Key concepts:** equation solving · system classification · inequality intervals
**Summary:** Rapid review of linear equation types, system classification, and inequality notation for bowl pacing.

#### Quick Classification
System 2x + 3y = 5 and 4x + 6y = 10: multiply first by 2 → identical. **Infinitely many solutions** (dependent).
System 2x + y = 3 and 2x + y = 5: same LHS, different RHS. **No solution** (inconsistent).
System x + y = 3 and x − y = 1: different slopes. **Unique solution** (x = 2, y = 1).

#### Interval Notation
- x > 2: (2, ∞)
- −1 ≤ x < 4: [−1, 4)
- All reals: (−∞, ∞)
- No solution: ∅

#### Speed Drill
1. Solve: 5 − 3(x − 2) = 2x + 1. (x = 8/5 = 1.6)
2. Solve: |2x − 3| = 5. (x = 4 or x = −1)
3. Solve: 2x − 1 > 3 and x + 4 < 7. (1 < x < 3)

#### Review Questions
1. How many solutions does the system 3x − 6y = 9 and x − 2y = 3 have?
2. Solve |x + 2| < 5 and express in interval notation.
3. Solve and check: 2(x − 3) + 4 = x + 5.

---

### Linear Algebra Bowl Review
**Type:** Mixed/Review
**Slug:** linear-algebra-bowl-review
**Estimated time:** 9 min
**Key concepts:** determinant · Cramer's rule · consistency
**Summary:** Bowl questions on linear systems often test determinant conditions and Cramer's rule — systematic application wins points.

#### Determinant of a 2×2 Matrix
|a b; c d| = ad − bc. If det ≠ 0, the system has a unique solution. If det = 0, the system is either inconsistent or dependent.

#### Cramer's Rule
For ax + by = e, cx + dy = f:
x = (ed − bf)/(ad − bc), y = (af − ce)/(ad − bc).

#### Bowl Patterns
"The determinant of [3 2; 6 4] is..." → 3×4 − 2×6 = 12 − 12 = 0 → system is not uniquely solvable.
"For what value of k does the system 2x + ky = 3, 4x + 2y = 6 have infinitely many solutions?" → Need det = 0 AND consistent: det = 4 − 4k = 0 → k = 1. Check: k=1 makes lines identical. ✓

#### Review Questions
1. Compute det[5 3; 2 7].
2. Use Cramer's rule to solve: x + 2y = 4, 3x − y = 5.
3. For what value of k does 2x + ky = 1 and 6x + 3y = 3 have infinitely many solutions?

---

### Competition Extension: Linear Algebra and AMC/AIME
**Type:** Competition Extension
**Slug:** linear-algebra-amc-aime
**Estimated time:** 7 min
**Key concepts:** system of equations tricks · parametric solutions · integer solutions
**Summary:** Competition problems use linear systems with clever twists — parametric solutions, number-theoretic constraints, and unusual variables.

#### AMC-Style Trick
"If a + b = 7, b + c = 11, a + c = 9, find a + b + c."
Add all three: 2(a + b + c) = 27 → a + b + c = 13.5.
Then a = 13.5 − 11 = 2.5, b = 4.5, c = 6.5.

#### AIME-Style: Integer Constraint
"Find all positive integer solutions to 3x + 7y = 100."
x = (100 − 7y)/3. Need 100 − 7y ≡ 0 (mod 3) → 1 − y ≡ 0 (mod 3) → y ≡ 1 (mod 3).
So y = 1, 4, 7, 10, 13 (check x > 0: 100 − 7y > 0 → y < 100/7 ≈ 14.3).
Valid: y ∈ {1, 4, 7, 10, 13} → 5 solutions.

#### Review Questions
1. If x + y = 5 and xy = 3, find x² + y². (Hint: (x+y)² = x² + 2xy + y².)
2. How many positive integer solutions does 2x + 3y = 30 have?
3. Bowl stem: "For 10 points, in a 3×3 system, what is the name of the method that uses the ratio of determinants?" → Cramer's Rule.

---

## Subtopic: Polynomials, Factoring & Rational Expressions

### Polynomial Fundamentals
**Type:** Core Understanding
**Slug:** polynomial-fundamentals
**Estimated time:** 12 min
**Key concepts:** degree · leading coefficient · end behavior · synthetic division
**Summary:** Polynomials are the simplest class of functions; their degree determines end behavior, and division algorithms reveal roots and factors.

#### Definitions
A polynomial P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₀ has degree n (the highest power) and leading coefficient aₙ. End behavior: if aₙ > 0 and n is even, both ends go up; if n is odd, left goes down and right goes up; reverse for aₙ < 0. The zero polynomial has no degree.

#### Division Algorithm and Remainder Theorem
For any polynomial P(x) and divisor d(x): P(x) = d(x)·Q(x) + R(x) where deg(R) < deg(d). Remainder Theorem: P(a) = R when dividing by (x − a). Factor Theorem: (x − a) is a factor of P(x) iff P(a) = 0.

#### Synthetic Division
Shortcut for dividing P(x) by (x − c): write coefficients in a row, bring down the leading coefficient, multiply by c and add to next coefficient, repeat. Outputs the quotient coefficients and remainder.

#### Review Questions
1. Divide 2x³ − 5x² + 3x − 1 by (x − 2) using synthetic division.
2. Find P(3) for P(x) = x⁴ − 2x² + x − 6 using the Remainder Theorem.
3. Is (x + 1) a factor of x³ + 2x² − x − 2?

---

### Factoring Strategies
**Type:** Core Understanding
**Slug:** factoring-strategies
**Estimated time:** 13 min
**Key concepts:** GCF · trinomial factoring · difference of squares · sum/difference of cubes
**Summary:** Factoring is the reverse of multiplication — master the standard patterns and the systematic approach guarantees success.

#### Factoring Checklist
Always check in order: (1) GCF first. (2) Count terms: 2 terms → difference of squares or sum/difference of cubes. 3 terms → trinomial factoring (ac-method or trial). 4 terms → grouping. (3) Check if factors can be factored further.

#### Key Patterns
- a² − b² = (a + b)(a − b)
- a² + 2ab + b² = (a + b)²
- a³ − b³ = (a − b)(a² + ab + b²)
- a³ + b³ = (a + b)(a² − ab + b²)

#### Trinomial Factoring (ac-method)
To factor ax² + bx + c: find two numbers with product ac and sum b. Example: 6x² + 7x − 3. ac = −18; find m, n: m + n = 7, mn = −18 → m = 9, n = −2. Rewrite: 6x² + 9x − 2x − 3 = 3x(2x + 3) − 1(2x + 3) = (3x − 1)(2x + 3).

#### Review Questions
1. Factor completely: 4x² − 25.
2. Factor: x³ − 8.
3. Factor: 6x² − x − 12.

---

### Rational Expressions
**Type:** Core Understanding
**Slug:** rational-expressions
**Estimated time:** 12 min
**Key concepts:** domain restriction · simplification · LCD · complex fraction
**Summary:** Rational expressions are polynomial fractions; operations follow the same rules as numerical fractions, but domain restrictions must be tracked throughout.

#### Domain
The domain excludes values that make the denominator zero. For (x² − 4)/(x − 2) = (x+2)(x−2)/(x−2), cancel to get x + 2 — but x ≠ 2 remains a restriction even after cancellation (the original expression has a hole at x = 2).

#### Operations
Add/subtract: find LCD, rewrite, combine numerators. Multiply: factor all, cancel, multiply. Divide: multiply by reciprocal. Simplify complex fractions: find LCD of all inner fractions, multiply numerator and denominator of the complex fraction by this LCD.

#### Partial Fractions
Decompose (2x + 3)/[(x+1)(x−2)] = A/(x+1) + B/(x−2). Multiply both sides by (x+1)(x−2): 2x + 3 = A(x−2) + B(x+1). Set x = 2: 7 = 3B → B = 7/3. Set x = −1: 1 = −3A → A = −1/3.

#### Review Questions
1. Simplify: (x² − 9)/(x² + 5x + 6).
2. Find LCD of 1/(x² − 1) and 1/(x² + x − 2).
3. Decompose: (5x − 1)/[(x−1)(x+2)] into partial fractions.

---

### Polynomial and Rational Applications
**Type:** Application
**Slug:** polynomial-rational-applications
**Estimated time:** 14 min
**Key concepts:** rational equations · extraneous solutions · optimization · Vieta's formulas
**Summary:** Polynomial and rational equations model real-world situations; Vieta's formulas connect roots to coefficients elegantly.

#### Worked Example 1: Rational Equation
Solve 1/(x−2) + 3/(x+1) = 4/[(x−2)(x+1)].
Multiply both sides by (x−2)(x+1): (x+1) + 3(x−2) = 4.
x + 1 + 3x − 6 = 4 → 4x − 5 = 4 → x = 9/4.
Check: x ≠ 2 and x ≠ −1. ✓ No extraneous solutions.

#### Worked Example 2: Vieta's Formulas
For ax² + bx + c = 0 with roots r₁ and r₂:
r₁ + r₂ = −b/a, r₁r₂ = c/a.
For x² − 5x + 6 = 0 (roots 2 and 3): sum = 5 = 5/1 ✓, product = 6 = 6/1 ✓.
Use: if r₁ + r₂ = 7 and r₁r₂ = 10, the polynomial is x² − 7x + 10.

#### Worked Example 3: Work Rate Problem
Pipe A fills a tank in 4 hours, Pipe B in 6 hours. Together: 1/4 + 1/6 = 3/12 + 2/12 = 5/12 tank/hour. Time = 12/5 = 2.4 hours.

#### Review Questions
1. Solve: 2/(x+3) − 1/(x−1) = 0. Check for extraneous solutions.
2. Using Vieta's formulas, find the sum and product of roots of 3x² − 7x + 2 = 0.
3. Two workers complete a job in 6 hours together. One alone takes 10 hours. How long for the other alone?

---

### Polynomial Factoring Mixed Review
**Type:** Mixed/Review
**Slug:** polynomial-factoring-mixed-review
**Estimated time:** 9 min
**Key concepts:** factor theorem · rational root test · complete factorization
**Summary:** Quick-fire factoring exercises synthesize GCF, factoring by grouping, special products, and the rational root test.

#### Rational Root Theorem
If P(x) = aₙxⁿ + … + a₀ has a rational root p/q (in lowest terms), then p | a₀ and q | aₙ. For P(x) = 2x³ − 3x² − 11x + 6: possible rational roots: ±{1,2,3,6,1/2,3/2}. Test x = 3: 2(27) − 3(9) − 33 + 6 = 54 − 27 − 33 + 6 = 0. ✓ Factor out (x − 3): 2x³ − 3x² − 11x + 6 = (x − 3)(2x² + 3x − 2) = (x − 3)(2x − 1)(x + 2).

#### Speed Drill
1. Factor: x⁴ − 16. → (x² + 4)(x + 2)(x − 2)
2. Factor: x³ + 27. → (x + 3)(x² − 3x + 9)
3. Factor: 2x² + 5x + 3. → (2x + 3)(x + 1)

#### Review Questions
1. Find all rational roots of P(x) = x³ − 6x² + 11x − 6.
2. Factor: x⁴ − 5x² + 4.
3. If P(2) = 0, state one factor of P(x).

---

### Polynomials Bowl Speed Review
**Type:** Mixed/Review
**Slug:** polynomials-bowl-speed-review
**Estimated time:** 8 min
**Key concepts:** Vieta's formulas · roots · coefficients
**Summary:** Bowl questions on polynomials frequently ask about root sums/products via Vieta's formulas — build instant recall.

#### Vieta's Formulas for Degree n
For P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₀ with roots r₁, …, rₙ:
- Σrᵢ = −aₙ₋₁/aₙ
- Σᵢ<ⱼ rᵢrⱼ = aₙ₋₂/aₙ
- r₁r₂…rₙ = (−1)ⁿ a₀/aₙ

For cubic x³ + px² + qx + r: r₁ + r₂ + r₃ = −p, r₁r₂ + r₁r₃ + r₂r₃ = q, r₁r₂r₃ = −r.

#### Bowl Toss-Ups
"For 10 points, the sum of roots of 2x³ − 6x² + x − 4 = 0 is..." → −(−6)/2 = 3.
"For 10 points, if r₁ and r₂ are roots of x² − 5x + 3 = 0, find r₁² + r₂²." → (r₁ + r₂)² − 2r₁r₂ = 25 − 6 = 19.

#### Review Questions
1. For x³ − 7x + 6 = 0, find the product of roots.
2. Construct a monic quadratic with roots 3 + √2 and 3 − √2.
3. If one root of x² + bx + 12 = 0 is 3, find the other root and b.

---

### Competition Extension: Polynomial Competition Problems
**Type:** Competition Extension
**Slug:** polynomial-competition-problems
**Estimated time:** 8 min
**Key concepts:** symmetric polynomials · Newton's identities · polynomial tricks
**Summary:** Competition problems use Vieta's formulas and symmetric polynomials to evaluate expressions without finding individual roots.

#### Newton's Identities (Power Sums)
Let pₖ = r₁ᵏ + r₂ᵏ + … For a quadratic x² − sx + q = 0 (s = sum, q = product):
p₁ = s, p₂ = s² − 2q, p₃ = s·p₂ − q·p₁ = s³ − 3sq.

Example: Roots of x² − 3x + 1 = 0. Find r₁³ + r₂³.
p₁ = 3, p₂ = 9 − 2 = 7, p₃ = 3·7 − 1·3 = 21 − 3 = 18.

#### AMC-Style Problem
If r and s are roots of x² − 3x + 1 = 0, find r⁴ + s⁴.
p₁ = 3, p₂ = 7, p₃ = 18, p₄ = 3·18 − 1·7 = 54 − 7 = 47.

#### Review Questions
1. Roots of x² − 4x + 1 = 0 are r₁, r₂. Find r₁² + r₂².
2. Bowl stem: "For 10 points, by this theorem, every polynomial over ℂ of degree n has exactly n roots counting multiplicity." → Fundamental Theorem of Algebra.
3. If r₁ + r₂ + r₃ = 6 and r₁r₂ + r₁r₃ + r₂r₃ = 11, r₁r₂r₃ = 6, identify the monic cubic.

---

## Subtopic: Radical Expressions & Equations

### Radicals and Rational Exponents
**Type:** Core Understanding
**Slug:** radicals-rational-exponents
**Estimated time:** 11 min
**Key concepts:** nth root · rational exponent · principal root · simplification
**Summary:** Radicals and rational exponents are two notations for the same concept — mastering their equivalence unlocks powerful simplification techniques.

#### Definitions
ⁿ√a = a^{1/n}: the principal (non-negative) nth root of a. a^{m/n} = (ⁿ√a)^m = ⁿ√(aᵐ). Domain: for even n, a must be ≥ 0 (in ℝ). Odd roots are defined for all real a. Key: √(a²) = |a|, not just a.

#### Properties and Simplification
- √(ab) = √a · √b (both non-negative)
- √(a/b) = √a / √b
- ⁿ√(aᵐ) = a^{m/n}
- Rationalize denominators: 1/√a = √a/a; 1/(√a + √b) = (√a − √b)/(a − b).

Simplify: √72 = √(36·2) = 6√2. ³√54 = ³√(27·2) = 3³√2.

#### Review Questions
1. Simplify: √(50x³y⁴).
2. Write 8^{2/3} in simplest radical and integer form.
3. Rationalize: 3/(√5 − √2).

---

### Solving Radical Equations
**Type:** Core Understanding
**Slug:** solving-radical-equations
**Estimated time:** 12 min
**Key concepts:** isolation · squaring both sides · extraneous solutions
**Summary:** Radical equations are solved by isolating the radical and raising both sides to a power — always check for extraneous solutions introduced by squaring.

#### Procedure
(1) Isolate the radical. (2) Raise both sides to the nth power to eliminate the radical. (3) Solve the resulting polynomial equation. (4) Check ALL solutions in the original equation (squaring can introduce extraneous roots).

#### Example 1: Basic Radical Equation
√(2x + 3) = x − 1. Square both sides: 2x + 3 = x² − 2x + 1 → x² − 4x − 2 = 0 → x = (4 ± √(16+8))/2 = 2 ± √6.
Check x = 2 + √6 ≈ 4.45: √(2·4.45 + 3) = √11.9 ≈ 3.45 = 4.45 − 1. ✓
Check x = 2 − √6 ≈ −0.45: LHS = √(2·(−0.45)+3) = √2.1 ≈ 1.45. RHS = −0.45 − 1 = −1.45. LHS ≠ RHS. Extraneous. ✗

#### Example 2: Two Radicals
√(x + 1) + √(x − 1) = √(4x − 2). Square: (x+1) + 2√(x²−1) + (x−1) = 4x − 2 → 2x + 2√(x²−1) = 4x − 2 → 2√(x²−1) = 2x − 2 → √(x²−1) = x − 1. Square again: x²−1 = x²−2x+1 → 2x = 2 → x = 1. Check: √2 + 0 = √2. ✓

#### Review Questions
1. Solve √(3x − 2) = 4. Check for extraneous solutions.
2. Solve √(x + 3) − √(x − 2) = 1.
3. Why must you check solutions after squaring both sides of a radical equation?

---

### Complex Radicals and Fractional Exponents
**Type:** Core Understanding
**Slug:** complex-radicals-fractional-exponents
**Estimated time:** 11 min
**Key concepts:** cube roots of negatives · nested radicals · exponent laws
**Summary:** Extending radicals to all real exponents and to complex numbers requires careful attention to principal value conventions.

#### Cube Roots of Negatives
³√(−8) = −2 because (−2)³ = −8. Odd roots are defined for negative reals. Even roots of negatives require complex numbers: √(−4) = 2i. In general, √(−a) = i√a for a > 0.

#### Exponent Laws Review
- a^m · a^n = a^{m+n}
- (a^m)^n = a^{mn}
- (ab)^n = a^n · b^n
- a^{−n} = 1/a^n
- a^0 = 1 (a ≠ 0)

Simplify: (27x⁶)^{2/3} = 27^{2/3} · x⁴ = 9x⁴.

#### Nested Radicals
√(5 + 2√6) = √3 + √2. Verify: (√3 + √2)² = 3 + 2√6 + 2 = 5 + 2√6. ✓ Technique: guess form √a + √b, match a + b and 4ab.

#### Review Questions
1. Simplify: (−32)^{3/5}.
2. Simplify: √(8 + 4√3). Hint: try form √a + √b.
3. For what values of x is x^{1/2} a real number? What about x^{1/3}?

---

### Radical Applications: Geometry and Physics
**Type:** Application
**Slug:** radical-applications-geometry-physics
**Estimated time:** 14 min
**Key concepts:** Pythagorean theorem · distance formula · pendulum period
**Summary:** Radicals arise naturally in geometric distance formulas and physics — connect algebraic skill to these applied contexts.

#### Worked Example 1: Distance Formula
The distance between (x₁, y₁) and (x₂, y₂) is d = √[(x₂−x₁)² + (y₂−y₁)²]. For (−1, 2) and (5, −6): d = √[(5−(−1))² + (−6−2)²] = √[36 + 64] = √100 = 10.

#### Worked Example 2: Pythagorean Theorem Application
A 10-meter ladder leans against a wall, its foot 4 m from the base. How high does it reach? h = √(10² − 4²) = √(100 − 16) = √84 = 2√21 ≈ 9.17 m.

#### Worked Example 3: Pendulum Period
T = 2π√(L/g) where L is length (m), g = 9.8 m/s². For L = 1 m: T = 2π√(1/9.8) = 2π × 0.319 ≈ 2.01 s. If L quadruples, T doubles (T ∝ √L).

#### Review Questions
1. Find the distance between (3, −4) and (−1, 8).
2. The diagonal of a square is 10. What is the side length?
3. A pendulum has period 3 s. How long is it? (Use g = 10 m/s².)

---

### Radicals Mixed Review
**Type:** Mixed/Review
**Slug:** radicals-mixed-review
**Estimated time:** 8 min
**Key concepts:** simplification · rationalization · equation solving
**Summary:** Speed review of radical simplification, rationalization, and equation solving under timed conditions.

#### Simplification Sprint
1. √(180) = 6√5
2. ⁴√(48) = ⁴√(16·3) = 2·⁴√3
3. (2√3)(5√6) = 10√18 = 30√2
4. √3/(√3 − 1) = √3(√3+1)/((√3)²−1²) = (3+√3)/2

#### Equation Sprint
1. √(x + 5) = 3 → x = 4
2. ³√(2x − 1) = 3 → 2x − 1 = 27 → x = 14
3. √(x²− 4) = x − 1: square → x²−4 = x²−2x+1 → 2x = 5 → x = 5/2. Check: √(25/4−4) = √(9/4) = 3/2 and 5/2−1 = 3/2. ✓

#### Review Questions
1. Solve: √(5x + 1) + 1 = x.
2. Simplify: (√5 + √3)(√5 − √3).
3. For what positive x does √(x) + 1/√(x) achieve its minimum?

---

### Radicals Bowl Competition Review
**Type:** Mixed/Review
**Slug:** radicals-bowl-competition-review
**Estimated time:** 8 min
**Key concepts:** rationalizing · conjugates · bowl traps
**Summary:** Bowl questions on radicals test conjugate multiplication, simplification patterns, and extraneous-solution awareness.

#### Bowl Traps
- √(x²) = |x|, NOT x. For x = −3: √(9) = 3 ≠ −3.
- (√a)² = a only when a ≥ 0. (√(−4))² ≠ −4 in ℝ; it's undefined in ℝ.
- After squaring, ALWAYS check. √(x+3) = x − 3: squaring gives x+3 = x²−6x+9, which has solutions; but only ones where x − 3 ≥ 0 (i.e., x ≥ 3) are valid.

#### Speed Patterns
- "Rationalize √(a) + √(b) in the denominator" → multiply by √(a) − √(b)
- "Simplify √(a + 2√(ab) + b)" → (√a + √b) (perfect square)
- "Simplify a^{3/2}" → a · √a

#### Review Questions
1. Rationalize the denominator: 6/(2 + √3).
2. Solve: √(2x − 1) = √(x + 3). Are there extraneous solutions?
3. Bowl stem: "For 10 points, what is the principal square root of 169?" → 13.

---

### Competition Extension: Nested Radicals and Continued Fractions
**Type:** Competition Extension
**Slug:** nested-radicals-continued-fractions
**Estimated time:** 8 min
**Key concepts:** fixed-point equation · continued fraction · golden ratio
**Summary:** Infinite nested radicals and continued fractions evaluate to exact values via fixed-point equations — an elegant competition technique.

#### Infinite Nested Radical
Find x = √(2 + √(2 + √(2 + …))).
Set x = √(2 + x). Then x² = 2 + x → x² − x − 2 = 0 → (x−2)(x+1) = 0 → x = 2 (taking positive root). Verify: the sequence converges to 2.

#### Golden Ratio as Continued Fraction
φ = 1 + 1/(1 + 1/(1 + …)) = (1 + √5)/2. Set φ = 1 + 1/φ → φ² = φ + 1 → φ² − φ − 1 = 0 → φ = (1 + √5)/2 ≈ 1.618.

#### Bowl Stem
"For 10 points, this value, equal to (1 + √5)/2, is the positive root of x² − x − 1 = 0 and appears in Fibonacci ratios." → **The golden ratio** (φ).

#### Review Questions
1. Evaluate: x = ∛(6 + ∛(6 + ∛(6 + …))).
2. The golden ratio satisfies 1/φ = φ − 1. Verify this.
3. Find the value of 1 + 1/(2 + 1/(2 + 1/(2 + …))). (Hint: set it equal to x and solve.)

---

## Subtopic: Exponential & Logarithmic Functions

### Exponential Functions
**Type:** Core Understanding
**Slug:** exponential-functions
**Estimated time:** 12 min
**Key concepts:** base · growth/decay · natural exponential · half-life
**Summary:** Exponential functions model constant-percentage-rate change — the hallmark of compound interest, population growth, radioactive decay, and cooling.

#### Definition and Properties
f(x) = bˣ where b > 0, b ≠ 1. Domain: all reals; range: (0, ∞). y-intercept always at (0, 1). If b > 1: increasing (growth). If 0 < b < 1: decreasing (decay). The natural base e ≈ 2.71828 is the unique base where the rate of change of eˣ equals eˣ itself. Key identity: eˣ · eʸ = eˣ⁺ʸ.

#### Half-Life and Doubling Time
Exponential decay: A(t) = A₀(1/2)^{t/h} where h is the half-life. Exponential growth: A(t) = A₀·2^{t/d} where d is the doubling time. General form: A(t) = A₀ · e^{kt}; k > 0 for growth, k < 0 for decay.

#### Review Questions
1. A culture of 100 bacteria doubles every 2 hours. Write A(t) and find A(7).
2. Carbon-14 has a half-life of 5730 years. What fraction remains after 11460 years?
3. Graph f(x) = 2ˣ and g(x) = (1/2)ˣ on the same axes. How are they related?

---

### Logarithmic Functions
**Type:** Core Understanding
**Slug:** logarithmic-functions
**Estimated time:** 13 min
**Key concepts:** logarithm · natural log · common log · change of base
**Summary:** Logarithms are the inverse of exponentials — they answer "what exponent?" and obey three fundamental laws.

#### Definition and Inverse Relationship
log_b(x) = y ⟺ b^y = x. So log_b(bˣ) = x and b^{log_b(x)} = x. Common log: log₁₀(x) = log(x). Natural log: log_e(x) = ln(x). Domain: (0, ∞); range: all reals.

#### Logarithm Laws
- log_b(mn) = log_b(m) + log_b(n)
- log_b(m/n) = log_b(m) − log_b(n)
- log_b(mⁿ) = n · log_b(m)
- Change of base: log_b(x) = ln(x)/ln(b) = log(x)/log(b)

#### Solving Logarithmic Equations
log₂(x) + log₂(x − 2) = 3 → log₂(x(x−2)) = 3 → x(x−2) = 8 → x² − 2x − 8 = 0 → (x−4)(x+2) = 0 → x = 4 (reject x = −2 since domain requires x > 0 and x > 2).

#### Review Questions
1. Evaluate: log₃(81) − log₃(9).
2. Solve: 2^{x+1} = 5. Give exact and decimal answer.
3. Prove: log_b(1/x) = −log_b(x).

---

### Exponential and Logarithmic Equations
**Type:** Core Understanding
**Slug:** exponential-logarithmic-equations
**Estimated time:** 12 min
**Key concepts:** exponential equation · logarithmic equation · natural log solution · extraneous solutions
**Summary:** Solving exponential equations uses logarithms; logarithmic equations convert to exponential form — both require checking for domain restrictions.

#### Exponential Equations
Two methods: (1) Make bases equal: 4^x = 8 → (2²)^x = 2³ → 2x = 3 → x = 3/2. (2) Take logarithm of both sides: 5^x = 20 → x·ln5 = ln20 → x = ln20/ln5.

#### Logarithmic Equations
Convert to exponential form or use log laws to combine. log₃(x + 4) + log₃(x − 2) = 2 → log₃[(x+4)(x−2)] = 2 → (x+4)(x−2) = 9 → x² + 2x − 8 = 9 → x² + 2x − 17 = 0 → x = (−2 ± √72)/2 = −1 ± 3√2. Take positive: x = −1 + 3√2. Check domain (x > 2): 3√2 ≈ 4.24, x ≈ 3.24 > 2. ✓

#### Review Questions
1. Solve: 3^{2x−1} = 27. 
2. Solve: ln(x) + ln(x + 2) = ln(15).
3. Solve: e^{2x} − 5eˣ + 6 = 0. (Hint: let u = eˣ.)

---

### Exponential Modeling Applications
**Type:** Application
**Slug:** exponential-modeling-applications
**Estimated time:** 15 min
**Key concepts:** compound interest · continuous growth · logistic model
**Summary:** Exponential and logarithmic functions are the core models for finance, population biology, chemistry, and physics.

#### Worked Example 1: Compound Interest
$1000 invested at 6% annual interest. Simple: A = 1000(1 + 0.06t). Compound annually: A = 1000(1.06)^t. Compound monthly: A = 1000(1 + 0.06/12)^{12t}. Continuous: A = 1000e^{0.06t}. After 10 years continuous: A = 1000e^{0.6} ≈ $1822.

#### Worked Example 2: Radioactive Decay
A 200g sample has half-life of 14 days. Find (a) the decay equation and (b) how long until 25g remain.
(a) A(t) = 200·(1/2)^{t/14}.
(b) 25 = 200·(1/2)^{t/14} → (1/2)^{t/14} = 1/8 = (1/2)³ → t/14 = 3 → t = 42 days.

#### Worked Example 3: Newton's Law of Cooling
T(t) = T_ambient + (T₀ − T_ambient)·e^{−kt}. A coffee at 90°C cools to 70°C in 5 minutes in a 20°C room. Find k: 70 = 20 + 70e^{−5k} → 50/70 = e^{−5k} → k = −ln(5/7)/5 ≈ 0.0673. Time to reach 40°C: 40 = 20 + 70e^{−0.0673t} → 20/70 = e^{−0.0673t} → t = ln(70/20)/0.0673 ≈ 18.9 min.

#### Review Questions
1. How long does it take $500 to double at 8% compounded continuously?
2. A radioactive element decays to 30% of its original amount in 100 years. Find the half-life.
3. A population grows logistically from 100 to 500 to 900 (capacity K = 1000). Sketch the S-curve and identify the inflection point.

---

### Exponential and Log Mixed Review
**Type:** Mixed/Review
**Slug:** exponential-log-mixed-review
**Estimated time:** 9 min
**Key concepts:** log laws · equation solving · graph transformations
**Summary:** Rapid review of exponential and logarithmic expressions, equations, and graph transformations.

#### Flash Evaluations
- ln(e³) = 3
- log₄(64) = 3 (since 4³ = 64)
- log₂(1/8) = −3
- e^{ln 7} = 7
- log(10000) = 4

#### Equation Speed Drill
1. 5^x = 125 → x = 3
2. log_x(81) = 4 → x = 3
3. ln(x² − 3) = ln(x + 1) → x² − 3 = x + 1 → x² − x − 4 = 0 → x = (1 ± √17)/2

#### Graph Transformations
f(x) = e^x: horizontal shift left 2 → f(x) = e^{x+2}; vertical shift up 3 → f(x) = e^x + 3; reflection over x-axis → f(x) = −e^x; vertical stretch by 2 → f(x) = 2e^x.

#### Review Questions
1. Simplify: log₆(12) + log₆(3).
2. Solve: 4^x = 8^{x−1}.
3. The graph of y = log(x) shifted right 3 and up 1 is y = ?

---

### Exponential Equations Bowl Competition
**Type:** Mixed/Review
**Slug:** exponential-equations-bowl-competition
**Estimated time:** 8 min
**Key concepts:** bowl vocabulary · e · ln · interest formulas
**Summary:** Timed practice on the computation patterns and vocabulary that appear most in Science Bowl exponential/log questions.

#### High-Yield Bowl Facts
- e ≈ 2.718; lim_{n→∞}(1 + 1/n)^n = e
- ln(1) = 0; ln(e) = 1; ln(0⁺) → −∞
- Continuously compounded: A = Pe^{rt}
- Doubling time formula: t = ln(2)/k where A = A₀e^{kt}
- pH = −log[H⁺]; logarithmic scale (Richter scale, decibels)

#### Bowl Toss-Up Stems
"For 10 points, the continuous growth formula for initial amount P, rate r, and time t is..." → A = Pe^{rt}.
"For 10 points, if a population doubles every 10 years, find the annual growth rate." → 2 = e^{10k} → k = ln2/10 ≈ 0.0693 or 6.93%.
"For 10 points, this constant, approximately 2.718, is the base of the natural logarithm." → e (Euler's number).

#### Review Questions
1. At 5% continuous interest, how long to triple an investment?
2. pH of a solution with [H⁺] = 10⁻⁸. → pH = 8.
3. If log_b(16) = 4/3, find b.

---

### Competition Extension: Logarithms in Competition Math
**Type:** Competition Extension
**Slug:** logarithms-competition-math
**Estimated time:** 8 min
**Key concepts:** Richter scale · pH · telescoping logs · floor of log
**Summary:** Competition and real-world problems use logarithms in telescoping sums, floor functions, and scale problems — classic AIME/AMC territory.

#### Telescoping Log Sum
Evaluate Σₖ₌₂¹⁰⁰ log_k(k+1) = log₂(3) · log₃(4) · … · log₁₀₀(101).
By change of base: each log_k(k+1) = ln(k+1)/ln(k). Product telescopes: ln(101)/ln(2) = log₂(101).

#### Number of Digits
The number of digits of a positive integer n is ⌊log₁₀(n)⌋ + 1. Digits of 2¹⁰ = 1024: ⌊log₁₀(1024)⌋ + 1 = ⌊3.01⌋ + 1 = 4. ✓

#### AMC-Style Problem
How many integers n satisfy log₅(n) + log₅(n+1) < 2?
log₅(n(n+1)) < 2 → n(n+1) < 25 → n² + n − 25 < 0. Roots ≈ −5.5 and 4.5. For positive integers: n = 1, 2, 3, 4. That's 4 integers.

#### Review Questions
1. Evaluate log₂(3)·log₃(4)·log₄(8). (Use chain of change-of-base.)
2. How many digits does 3²⁰ have? (log₁₀(3) ≈ 0.4771)
3. Solve: log₂(log₃(x)) = 2.
