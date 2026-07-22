# HS Math — Calculus
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Limits & Continuity

### Understanding Limits: The Idea of Approaching a Value
**Type:** Core Understanding
**Slug:** hs-limits-intro
**Estimated time:** 14 min
**Key concepts:** limit · approaching · left/right-hand limits
**Summary:** A limit describes what value a function approaches as the input gets arbitrarily close to a point — not necessarily what the function equals there.

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

### Limits at Infinity & Asymptotic Behavior
**Type:** Core Understanding
**Slug:** hs-limits-infinity
**Estimated time:** 12 min
**Key concepts:** limits at infinity · horizontal asymptotes · end behavior
**Summary:** Limits at infinity describe what a function approaches as x grows without bound, revealing horizontal asymptotes and long-run behavior.

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

### The Formal ε-δ Definition of a Limit
**Type:** Core Understanding
**Slug:** hs-limits-epsilon-delta
**Estimated time:** 15 min
**Key concepts:** epsilon-delta · formal proof · rigorous definition
**Summary:** The ε-δ definition gives limits a precise, proof-ready meaning: for every desired closeness ε in output, we can find a corresponding closeness δ in input.

#### The Definition
lim(x→a) f(x) = L means: for every ε > 0, there exists δ > 0 such that if 0 < |x−a| < δ, then |f(x)−L| < ε. In plain terms: no matter how tight an output tolerance ε you demand, we can always find an input neighborhood δ that guarantees f(x) stays within ε of L. The 0 < |x−a| part excludes x = a itself — the limit is about approach, not arrival.

#### Proving a Simple Limit
Claim: lim(x→2) (3x−1) = 5. Proof: Given ε > 0, set δ = ε/3. If 0 < |x−2| < δ, then |(3x−1)−5| = |3x−6| = 3|x−2| < 3·(ε/3) = ε. ✓ The key strategy: work backwards from |f(x)−L| < ε to find what |x−a| < δ requires, then verify forward.

#### Why It Matters for Competition
ε-δ appears in proof-based competition math and AP Calculus. Understanding it lets you verify limit claims rigorously and spot when "intuitive" limits are actually wrong. It also underlies the formal definition of continuity and differentiability.

#### Common Traps
The condition is 0 < |x−a| < δ (strictly greater than 0) — this excludes x = a. The quantifier order matters: "for every ε, there exists δ" — NOT "there exists δ for all ε." δ may depend on ε; that's expected and correct.

#### Review Questions
1. Use the ε-δ definition to prove lim(x→1) (2x+3) = 5.
2. What does it mean for a limit to NOT exist, in ε-δ terms?
3. Why does the definition require 0 < |x−a|, not just |x−a| < δ?

---

### Applying Limits: Continuity Problems & IVT
**Type:** Application
**Slug:** hs-limits-continuity-application
**Estimated time:** 13 min
**Key concepts:** piecewise continuity · Intermediate Value Theorem · root-finding
**Summary:** Continuity testing and the IVT turn abstract limit ideas into tools for proving existence of solutions — a staple of both AP Calculus and Science Bowl.

#### Problem: Piecewise Continuity
Find the value of k that makes f continuous everywhere, where f(x) = {3x+2 for x < 1; kx²−1 for x ≥ 1}. At x = 1: left limit = 3(1)+2 = 5; right limit = k(1)²−1 = k−1. For continuity: k−1 = 5, so k = 6. Check: f(1) = 6(1)−1 = 5 ✓.

#### Problem: Using the IVT
Show that f(x) = x³−2x−5 has a root between x = 2 and x = 3. f(2) = 8−4−5 = −1 < 0. f(3) = 27−6−5 = 16 > 0. Since f is continuous and changes sign on [2,3], by IVT there exists c ∈ (2,3) where f(c) = 0.

#### Problem: Removing Discontinuities
f(x) = (x²−4)/(x−2) has a removable discontinuity at x = 2. Factor: (x−2)(x+2)/(x−2) = x+2 for x ≠ 2. Redefine f(2) = 4 to make f continuous at 2. Jump discontinuities (different one-sided limits) and infinite discontinuities (vertical asymptote) cannot be removed.

#### Problem: Evaluating Tricky Limits
lim(x→0) (√(x+4) − 2)/x. Multiply by conjugate: [(√(x+4)−2)(√(x+4)+2)] / [x(√(x+4)+2)] = x / [x(√(x+4)+2)] = 1/(√(x+4)+2) → 1/(2+2) = 1/4.

#### Review Questions
1. For f(x) = {x²+1 for x ≤ 2; ax−1 for x > 2}, find a so f is continuous.
2. Show f(x) = cos(x) − x has a solution in [0, π/2] using IVT.
3. Classify each discontinuity of f(x) = (x²−1)/((x−1)(x+2)) as removable, jump, or infinite.

---

### Limits in Competition Problems
**Type:** Competition Extension
**Slug:** hs-limits-competition
**Estimated time:** 8 min
**Key concepts:** indeterminate forms · competition limit tricks · L'Hôpital
**Summary:** Science Bowl and AMC limit questions favor recognizable forms — here are the patterns and speed strategies that separate prepared contestants.

#### High-Yield Forms
1. lim sin(kx)/(kx) = 1 as x→0 (any constant k). 2. lim(x→∞)(1+k/x)^x = eᵏ. 3. 0/0 after factoring → cancel. 4. ∞−∞ → rationalize or factor out dominant term. 5. For rational limits at ∞: divide numerator and denominator by highest power of x.

#### Competition Toss-Up Style
"For 10 points, evaluate: lim(x→0) (sin 3x)/(sin 5x)." Answer: rewrite as [sin(3x)/(3x)] · (3x) / ([sin(5x)/(5x)] · (5x)) = 1·3x / (1·5x) = 3/5.

#### Speed Strategy: Degrees
For rational p(x)/q(x) as x→∞ — compare leading terms only. Ignore lower-degree terms. Practice doing this in under 5 seconds for 3 common degree comparisons.

#### Review Questions
1. Evaluate lim(x→0) (tan 4x)/(sin 6x).
2. Find lim(x→∞) (3x²−2x+1)/(5x²+x−4).
3. Use L'Hôpital's Rule to find lim(x→0) (eˣ−1−x)/x².

---

### Mixed Review: Limits & Continuity
**Type:** Mixed/Review
**Slug:** hs-limits-review
**Estimated time:** 10 min
**Key concepts:** limit laws · continuity · asymptotes · IVT
**Summary:** Rapid-fire synthesis of all key limit and continuity concepts, timed-practice style.

#### Quick Recall
1. lim(x→2) (x²−3x+2)/(x−2) = ? Factor: (x−1)(x−2)/(x−2) = x−1 → 1. 2. Does f(x) = 1/(x−3) have a vertical asymptote? Yes, at x = 3. 3. Horizontal asymptote of (2x+1)/(3x−2)? y = 2/3. 4. Is f(x) = |x| continuous at x = 0? Yes. Differentiable? No.

#### Synthesis Problem
f(x) = {(x²−9)/(x−3) for x ≠ 3; k for x = 3}. (a) Find lim(x→3) f(x). (b) Find k so f is continuous at 3. (c) Is f differentiable at 3? Solution: (a) Factor → x+3 → 6. (b) k = 6. (c) Yes — the redefined function f(x) = x+3 is differentiable everywhere.

#### Review Questions
1. Evaluate all limits: (a) lim(x→∞)(5x³)/(2x³+1) (b) lim(x→4)(√x−2)/(x−4) (c) lim(x→0) x/sin(x)
2. Prove f(x) = x⁵−3x+1 has at least two real roots using IVT.
3. Find all discontinuities of f(x) = (x²+x−6)/((x−2)(x+4)) and classify each.

---

## Subtopic: Derivatives & Applications

### The Derivative: Definition & Rules
**Type:** Core Understanding
**Slug:** hs-derivatives-definition
**Estimated time:** 14 min
**Key concepts:** derivative · difference quotient · power rule · chain rule
**Summary:** The derivative measures instantaneous rate of change; its formal definition as a limit of slopes connects geometry to algebra.

#### The Limit Definition
f'(x) = lim(h→0) [f(x+h) − f(x)] / h. This is the slope of the tangent line at x. For f(x) = x²: [((x+h)²−x²)/h] = (2xh+h²)/h = 2x+h → 2x. So f'(x) = 2x. Memorizing this process explains WHY rules work, not just that they do.

#### Core Differentiation Rules
Power rule: d/dx[xⁿ] = nxⁿ⁻¹. Sum rule: (f+g)' = f'+g'. Constant multiple: (cf)' = cf'. Product rule: (fg)' = f'g + fg'. Quotient rule: (f/g)' = (f'g − fg')/g². Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x). Key derivatives: d/dx[sin x]=cos x; d/dx[cos x]=−sin x; d/dx[eˣ]=eˣ; d/dx[ln x]=1/x.

#### Chain Rule in Depth
The chain rule handles composition. d/dx[sin(x²)] = cos(x²)·2x. d/dx[e^(3x)] = e^(3x)·3. d/dx[(2x+1)⁵] = 5(2x+1)⁴·2 = 10(2x+1)⁴. Identify the outer function and inner function, differentiate outer (keeping inner intact), multiply by inner derivative.

#### Higher-Order Derivatives
f''(x) = d/dx[f'(x)] (second derivative). f''(x) > 0 → concave up; f''(x) < 0 → concave down. Inflection points where f''(x) = 0 AND concavity changes. Speed = |v(t)|; acceleration = v'(t) = x''(t) for position function x(t).

#### Review Questions
1. Using the limit definition, find f'(x) for f(x) = 3x+1.
2. Differentiate: f(x) = x⁴ − 3x² + 7, g(x) = e^(2x)·sin(x), h(x) = ln(x²+1).
3. Find the equation of the tangent line to f(x) = x³ at x = 2.

---

### Derivatives in Context: Optimization & Related Rates
**Type:** Core Understanding
**Slug:** hs-derivatives-optimization
**Estimated time:** 14 min
**Key concepts:** critical points · first/second derivative test · optimization · related rates
**Summary:** Derivatives identify where functions have maxima and minima, enabling optimization problems and related-rate calculations central to both calculus and competition math.

#### Finding Critical Points
Critical points occur where f'(x) = 0 or f'(x) is undefined. First derivative test: if f' changes + to − at c, local max; − to +, local min. Second derivative test: if f'(c) = 0 and f''(c) > 0, local min; f''(c) < 0, local max; f''(c) = 0, inconclusive.

#### Optimization Framework
1. Write the objective function (what to maximize/minimize). 2. Express in one variable using any constraint. 3. Find derivative, set = 0. 4. Verify using second derivative test or endpoints. Example: maximize area of rectangle with perimeter 40. A = xy, constraint 2x+2y = 40 → y = 20−x. A(x) = x(20−x) = 20x−x². A'(x) = 20−2x = 0 → x = 10, y = 10 (square). A''= −2 < 0 → maximum. Max area = 100.

#### Related Rates
Differentiate both sides of an equation with respect to time t. Example: ladder problem. A 10m ladder leans against a wall; bottom slides away at 2 m/s. How fast is top sliding down when bottom is 6m from wall? x²+y² = 100. Differentiate: 2x(dx/dt)+2y(dy/dt) = 0. At x = 6: y = 8. 2(6)(2)+2(8)(dy/dt) = 0 → dy/dt = −3/2 m/s (falling).

#### Mean Value Theorem
If f is continuous on [a,b] and differentiable on (a,b), then there exists c ∈ (a,b) where f'(c) = (f(b)−f(a))/(b−a). Geometrically: the tangent line at some interior point is parallel to the secant line. Rolle's Theorem: if f(a) = f(b), then f'(c) = 0 for some c.

#### Review Questions
1. Find the dimensions of the rectangle of area 100 with minimum perimeter.
2. A spherical balloon is inflated so its volume increases at 50 cm³/s. How fast is the radius increasing when r = 5 cm?
3. State the Mean Value Theorem and give an example of a function that satisfies it on [0, 2].

---

### Applying Derivatives: Worked Problems
**Type:** Application
**Slug:** hs-derivatives-application
**Estimated time:** 15 min
**Key concepts:** optimization · motion · curve sketching
**Summary:** Full worked solutions for the optimization and motion problems most likely to appear in Science Bowl and AP Calculus.

#### Problem 1: Box Optimization
An open-top box is made by cutting equal squares from corners of a 12×12 cm sheet. Find the cut size x that maximizes volume. V(x) = x(12−2x)² for 0 < x < 6. V'(x) = (12−2x)² + x·2(12−2x)(−2) = (12−2x)[(12−2x)−4x] = (12−2x)(12−6x). Set V'(x) = 0: x = 6 (endpoint) or x = 2. V(2) = 2(8)² = 128 cm³. V''(2) < 0 → maximum. Cut 2 cm squares.

#### Problem 2: Motion Analysis
A particle has position s(t) = t³−6t²+9t. (a) Find velocity v(t) = 3t²−12t+9 = 3(t−1)(t−3). (b) Particle at rest when v = 0: t = 1, 3. (c) Position at t = 1: s(1) = 1−6+9 = 4. At t = 3: s(3) = 27−54+27 = 0. (d) Total distance traveled 0 to 3: from s(0)=0 to s(1)=4 (distance 4), then back to s(3)=0 (distance 4). Total = 8.

#### Problem 3: Implicit Differentiation
Find dy/dx for x²+y² = 25. Differentiate implicitly: 2x+2y(dy/dx) = 0 → dy/dx = −x/y. At (3, 4): slope = −3/4. Tangent line: y−4 = −(3/4)(x−3).

#### Problem 4: Newton's Method Preview
To find roots numerically: xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ). Starting with x₀ = 2 for f(x) = x²−3: x₁ = 2 − (4−3)/4 = 2 − 0.25 = 1.75. Next iteration: x₂ = 1.75 − (3.0625−3)/(3.5) = 1.75 − 0.018 ≈ 1.732 ≈ √3.

#### Review Questions
1. A farmer has 600m of fencing to enclose a rectangular field against a river (no fence needed on river side). Find maximum area.
2. For s(t) = t³−3t+2, find all times when the particle changes direction and the total distance traveled on [0,3].
3. Find dy/dx for x³+y³ = 6xy (folium of Descartes).

---

### Derivative Review: Speed Round
**Type:** Mixed/Review
**Slug:** hs-derivatives-review
**Estimated time:** 10 min
**Key concepts:** differentiation rules · critical points · applications
**Summary:** Timed synthesis across all differentiation topics — identify the rule, differentiate, interpret.

#### Flash Derivatives (30 seconds each)
1. f(x) = 7x⁵−3x²+x → f'(x) = 35x⁴−6x+1
2. g(x) = sin(3x²) → g'(x) = 6x cos(3x²)
3. h(x) = eˣ/x → h'(x) = (xeˣ−eˣ)/x² = eˣ(x−1)/x²
4. k(x) = ln(sin x) → k'(x) = cos x / sin x = cot x
5. p(x) = (x²+1)¹⁰ → p'(x) = 20x(x²+1)⁹

#### Synthesis Problem
f(x) = x/(x²+1). (a) Find critical points. (b) Determine local max/min. (c) Find inflection points. f'(x) = (x²+1−2x²)/(x²+1)² = (1−x²)/(x²+1)². Critical points: x = ±1. f'(±1) = 0. At x = 1: f changes + to −, local max f(1) = 1/2. At x = −1: − to +, local min f(−1) = −1/2.

#### Review Questions
1. Compute (d/dx)[arctan(x)] using implicit differentiation of tan(y) = x.
2. A function f has f(2)=3, f'(2)=−1, f''(2)=4. Is x=2 a local max, min, or neither?
3. Verify the product rule on f(x)=x²·eˣ by differentiating directly and comparing.

---

## Subtopic: Integrals & Applications

### The Definite Integral & Fundamental Theorem of Calculus
**Type:** Core Understanding
**Slug:** hs-integrals-ftc
**Estimated time:** 14 min
**Key concepts:** Riemann sum · definite integral · Fundamental Theorem
**Summary:** Integration accumulates change; the Fundamental Theorem of Calculus reveals that differentiation and integration are inverse operations.

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

### Area, Accumulation & Applications of Integration
**Type:** Core Understanding
**Slug:** hs-integrals-area-applications
**Estimated time:** 13 min
**Key concepts:** area between curves · average value · displacement vs. distance
**Summary:** Integration computes areas between curves, average values, net displacement, and accumulated quantities — the bridge from calculus to physics.

#### Area Between Two Curves
Area = ∫ₐᵇ [f(x)−g(x)] dx, where f(x) ≥ g(x) on [a,b]. Find intersection points first (set f = g). Example: Area between y = x² and y = x. Intersect at x = 0, 1. Area = ∫₀¹ (x−x²) dx = [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6.

#### Average Value of a Function
f_avg = (1/(b−a)) ∫ₐᵇ f(x) dx. Example: Average value of sin(x) on [0,π]: (1/π)∫₀^π sin x dx = (1/π)[−cos x]₀^π = (1/π)(1+1) = 2/π ≈ 0.637.

#### Displacement vs. Total Distance
For velocity v(t): Net displacement = ∫ₐᵇ v(t) dt. Total distance = ∫ₐᵇ |v(t)| dt. If v changes sign, split the integral at zeros. Example: v(t) = t²−4 on [0,3]. Zeros at t = 2. Distance = ∫₀² (4−t²) dt + ∫₂³ (t²−4) dt = [4t−t³/3]₀² + [t³/3−4t]₂³ = 16/3 + 7/3 = 23/3.

#### Volume of Revolution (Shell/Disk Method)
Disk method: V = π∫ₐᵇ [f(x)]² dx (rotation around x-axis). Shell method: V = 2π∫ₐᵇ x·f(x) dx (rotation around y-axis). Example: Rotate y = √x about x-axis from x = 0 to 4. V = π∫₀⁴ x dx = π[x²/2]₀⁴ = 8π.

#### Review Questions
1. Find the area enclosed by y = x² and y = 2x+3.
2. What is the average value of f(x) = x³ on [0, 2]?
3. A particle has v(t) = t²−2t. Find displacement and total distance on [0, 3].

---

### Integration Worked Problems
**Type:** Application
**Slug:** hs-integrals-application
**Estimated time:** 15 min
**Key concepts:** u-substitution · integration by parts · definite integrals
**Summary:** Step-by-step solutions to the integration problems most likely to appear in advanced HS math and Science Bowl.

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

### Integration Review: Mixed Problems
**Type:** Mixed/Review
**Slug:** hs-integrals-review
**Estimated time:** 10 min
**Key concepts:** antiderivatives · FTC · area · volume
**Summary:** Mixed set combining all integration techniques — identify approach, execute, verify.

#### Technique Identification
Identify the best technique for each: (a) ∫e^(x²)·2x dx → u-sub (u=x²). (b) ∫x·cos x dx → IBP. (c) ∫(x+1)/(x²+2x) dx → u-sub (u=x²+2x) → (1/2)ln|x²+2x|+C. (d) ∫sin x·eˣ dx → IBP twice (or use formula). (e) ∫₀² x² dx → FTC → 8/3.

#### Synthesis
A function f satisfies f'(x) = 3x²−6x and f(0) = 4. Find f(x). Integrate: f(x) = x³−3x²+C. f(0) = 4 → C = 4. f(x) = x³−3x²+4. Local min at x = 2 (f'=0, f''>0): f(2) = 8−12+4 = 0.

#### Review Questions
1. If F'(x) = cos(x²)·2x and F(0) = 1, find F(π).
2. By FTC Part 1, find d/dx[∫₁^(x³) sin(t²) dt].
3. Set up (but don't evaluate) the volume of the solid formed by rotating y=x²+1 about the x-axis from x=−1 to x=1.

---

## Subtopic: Differential Equations (Introduction)

### What Is a Differential Equation?
**Type:** Core Understanding
**Slug:** hs-odes-intro
**Estimated time:** 13 min
**Key concepts:** differential equation · general solution · initial condition
**Summary:** A differential equation relates a function to its derivatives; solving one means finding the family of functions that satisfies the relationship.

#### Differential Equations in Context
A differential equation (DE) involves an unknown function y and its derivatives (y', y'', etc.). Order = highest derivative present. A general solution contains arbitrary constants; an initial condition pins the particular solution. DEs model exponential growth (population, compound interest), radioactive decay, cooling, and spring motion — all Science Bowl favorites.

#### Separable Equations
A first-order DE of the form dy/dx = f(x)·g(y) is separable. Separate variables: dy/g(y) = f(x) dx, then integrate both sides. Example: dy/dx = 2xy. → dy/y = 2x dx → ln|y| = x² + C → y = Ae^(x²), where A = ±eᶜ. Initial condition y(0) = 3: 3 = A·e⁰ = A → y = 3e^(x²).

#### Exponential Growth & Decay
dy/dt = ky has solution y = y₀eᵏᵗ. If k > 0: growth (population, compound interest). If k < 0: decay (radioactive decay, Newton's law of cooling). Half-life: t_{1/2} = ln(2)/|k|. Example: Radioactive substance with half-life 10 years. y₀ = 100g, find amount after 30 years. k = −ln2/10. y(30) = 100·e^(−3ln2) = 100/8 = 12.5g.

#### Newton's Law of Cooling
dT/dt = −k(T−T_env). Solution: T(t) = T_env + (T₀−T_env)e^(−kt). A cup at 90°C cools in 20°C air; after 5 min it's 70°C. Find T after 15 min. 70 = 20+70e^(−5k) → e^(−5k) = 50/70 = 5/7 → k = ln(7/5)/5. T(15) = 20+70·(5/7)³ = 20+70·(125/343) ≈ 20+25.5 ≈ 45.5°C.

#### Review Questions
1. Solve dy/dx = y/x with initial condition y(1) = 2.
2. A population grows at 5% per year. Starting with 1000, when does it reach 4000?
3. Distinguish between a general solution and a particular solution of a DE.

---

### Differential Equations: Applications
**Type:** Application
**Slug:** hs-odes-application
**Estimated time:** 13 min
**Key concepts:** exponential decay · logistic growth · initial value problems
**Summary:** Differential equations model real-world phenomena; these worked examples cover radioactive decay, population dynamics, and mixing problems.

#### Problem 1: Carbon-14 Dating
Carbon-14 decays with half-life 5,730 years. A fossil has 1/4 of its original C-14. How old is it? k = ln(2)/5730. y = y₀e^(−kt). 1/4 = e^(−kt) → kt = ln4 = 2ln2 → t = 2ln2/k = 2·5730 = 11,460 years. Intuition: each half-life cuts C-14 in half; two half-lives → 1/4 remains.

#### Problem 2: Logistic Growth
Logistic DE: dP/dt = rP(1−P/K), where K = carrying capacity. Solution: P(t) = K/(1 + ((K−P₀)/P₀)·e^(−rt)). As t→∞, P → K. Inflection point (fastest growth) occurs at P = K/2. Models real populations that saturate at an environmental limit — distinguishes from unbounded exponential growth.

#### Problem 3: Mixing Problem
A tank holds 100L of water with 10g of salt. Brine with 0.5g/L enters at 4L/min; well-mixed solution exits at 4L/min. Find salt amount Q(t). dQ/dt = rate in − rate out = 0.5·4 − (Q/100)·4 = 2 − Q/25. This is linear: dQ/dt + Q/25 = 2. Integrating factor: e^(t/25). Solution: Q(t) = 50 + (Q₀−50)e^(−t/25) = 50−40e^(−t/25). As t→∞, Q→50g (equilibrium).

#### Review Questions
1. A radioactive element has half-life 8 days. Starting with 500g, find the amount remaining after 24 days.
2. A culture starts with 100 bacteria and doubles every 3 hours. When will it reach 10,000?
3. Explain the difference between logistic and exponential growth in terms of the DE.

---

### Differential Equations: Competition Problems
**Type:** Competition Extension
**Slug:** hs-odes-competition
**Estimated time:** 8 min
**Key concepts:** separable DEs · exponential models · Science Bowl DE patterns
**Summary:** Science Bowl and AP Calculus DE questions cluster around these four patterns — master the form and solve in under 90 seconds.

#### The Four Competition Patterns
1. Exponential: dy/dt = ky → y = y₀eᵏᵗ (know by heart). 2. Decay word problem: half-life/doubling time → find k, then evaluate. 3. Separable general: separate, integrate, apply IC. 4. Related DEs: given dy/dt in terms of y, substitute and use equilibrium.

#### Toss-Up Examples
"For 10 points, if a population grows according to dP/dt = 0.1P and starts at 500, what is the population after 10 years?" Answer: P = 500e^(0.1·10) = 500e ≈ 1359.

"For 10 points, what is the particular solution to dy/dx = xy with y(0) = 1?" Answer: y = e^(x²/2).

#### Speed Strategy
For y' = ky problems: write answer immediately as Aeᵏˣ, apply IC to find A. No algebra needed. For half-life: half-life T means k = ln2/T. After n half-lives: y = y₀/2ⁿ.

#### Review Questions
1. Solve dy/dx = 3y²x with y(0) = 1.
2. The temperature of an object drops from 80°C to 60°C in 5 min in a 20°C room. Find T(t).
3. Write the logistic DE and identify what each parameter represents physically.

---

### Calculus Review: Full-Topic Synthesis
**Type:** Mixed/Review
**Slug:** hs-calculus-full-review
**Estimated time:** 12 min
**Key concepts:** limits · derivatives · integrals · differential equations
**Summary:** Cross-topic synthesis tying all four calculus subtopics together, with problems requiring multiple concepts.

#### Multi-Step Problem
f(x) = ∫₀ˣ (t²−1) dt. (a) Find f(x). (b) Find f'(x). (c) Find critical points of f. (d) Is x=1 a local max or min of f? Solution: (a) [t³/3−t]₀ˣ = x³/3−x. (b) By FTC: f'(x) = x²−1. (c) x²−1=0 → x=±1. (d) f''(x)=2x; f''(1)=2>0 → local min.

#### Connecting Concepts
If dy/dx = 2y and the area under y from x=0 to x=3 equals 100, find y(0). dy/dx = 2y → y = Ae^(2x). ∫₀³ Ae^(2x) dx = A[e^(2x)/2]₀³ = (A/2)(e⁶−1) = 100. A = 200/(e⁶−1) ≈ 200/402.4 ≈ 0.497.

#### Review Questions
1. Find the area between f(x) = x³−x and g(x) = 0 over [−1, 1] (use absolute value reasoning).
2. Given v(t) = 3e^(−t) and x(0) = 2, find the position function x(t) and lim(t→∞) x(t).
3. A curve passes through (0, 1) and has slope at (x,y) equal to y·cos(x). Find the equation.
