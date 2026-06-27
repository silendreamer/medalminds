# HS Math — Precalculus
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Sequences & Series

### Arithmetic and Geometric Sequences
**Type:** Core Understanding
**Slug:** arithmetic-geometric-sequences
**Estimated time:** 15 min
**Key concepts:** common difference · common ratio · nth-term formulas
**Summary:** Sequences are ordered lists of numbers; arithmetic and geometric are the two most common types.

#### Arithmetic Sequences
An arithmetic sequence has a constant difference d between consecutive terms. The nth term is a_n = a₁ + (n−1)d. Example: 3, 7, 11, 15, ... has d = 4 and a_n = 3 + (n−1)·4 = 4n − 1. The 10th term is a₁₀ = 4(10) − 1 = 39. The sum of the first n terms is S_n = n(a₁ + a_n)/2 = n[2a₁ + (n−1)d]/2. For the example, S₁₀ = 10(3+39)/2 = 210. Arithmetic sequences model linear growth: position, velocity (if acceleration is zero), and simple interest.

#### Geometric Sequences
A geometric sequence has a constant ratio r between consecutive terms. The nth term is a_n = a₁·r^(n−1). Example: 2, 6, 18, 54, ... has r = 3 and a_n = 2·3^(n−1). The 5th term is a₅ = 2·3⁴ = 162. The sum of the first n terms is S_n = a₁(1−r^n)/(1−r) for r ≠ 1. For the example, S₅ = 2(1−3⁵)/(1−3) = 2(−242)/(−2) = 242. Geometric sequences model exponential growth: population, compound interest, radioactive decay.

#### Infinite Geometric Series
If |r| < 1, the infinite sum converges: ∑(n=1 to ∞) a₁·r^(n−1) = a₁/(1−r). Example: 1 + 1/2 + 1/4 + 1/8 + ... = 1/(1−1/2) = 2. This represents the sum of an infinite repeating decimal 0.999... = 9/10 · 1/(1−1/10) = (9/10)·(10/9) = 1. If |r| ≥ 1, the series diverges (does not converge to a finite sum).

#### Distinguishing and Mixing Sequences
Given the first few terms, identify the type. For 5, 10, 15, 20, ..., d = 5 (arithmetic). For 5, 10, 20, 40, ..., r = 2 (geometric). For 1, 1, 2, 3, 5, 8, ... (Fibonacci), neither—each term is the sum of the previous two. Science Bowl mixing problems combine arithmetic and geometric sequences: find the sum of the first 5 terms of an arithmetic sequence, multiply by the first term of a geometric sequence, etc.

#### Review Questions
1. Find the 15th term of the sequence 4, 9, 14, 19, ...
2. Find the sum of the first 8 terms of the geometric sequence 3, 6, 12, 24, ...
3. A ball bounces to 2/3 of its previous height. If dropped from 10 m, what is the total distance traveled (up and down) before it stops?

---

### Arithmetic and Geometric Series Sums

### Summation Notation and Telescoping Series
**Type:** Core Understanding
**Slug:** summation-telescoping
**Estimated time:** 15 min
**Key concepts:** sigma notation · index manipulation · cancellation
**Summary:** Summation notation ∑ compresses long sums; telescoping series exploit cancellation.

#### Sigma Notation
∑(i=1 to n) a_i means a₁ + a₂ + ... + a_n. The index i runs from 1 to n. Changing the start and end points: ∑(i=2 to n) a_i = a₂ + a₃ + ... + a_n (omits the first term). ∑(k=0 to n) a_k starts the index at 0. The properties: ∑(i=1 to n) c·a_i = c·∑(i=1 to n) a_i (factor out constants), ∑(i=1 to n) (a_i + b_i) = ∑(i=1 to n) a_i + ∑(i=1 to n) b_i (sum of sums). Using these, evaluate ∑(i=1 to 100) (3i+2) = 3·∑(i=1 to 100) i + 2·∑(i=1 to 100) 1 = 3·(100·101/2) + 2·100 = 15150 + 200 = 15350.

#### Telescoping Series
In a telescoping series, consecutive terms cancel. Example: ∑(i=1 to n) [1/i − 1/(i+1)] = [1/1 − 1/2] + [1/2 − 1/3] + ... + [1/n − 1/(n+1)] = 1 − 1/(n+1). The middle terms (−1/2, +1/2), (−1/3, +1/3), etc. cancel, leaving only the first and last terms. Another example: ∑(i=1 to n) 1/(i(i+1)) = ∑(i=1 to n) [1/i − 1/(i+1)] = 1 − 1/(n+1). As n → ∞, the sum approaches 1.

#### Partial Fraction Decomposition
To telescope a fraction, use partial fractions. Decompose 1/(i(i+1)) as A/i + B/(i+1). Multiply by i(i+1): 1 = A(i+1) + Bi. Setting i=0: 1 = A, so A = 1. Setting i=−1: 1 = −B, so B = −1. Thus 1/(i(i+1)) = 1/i − 1/(i+1), which telescopes. For more complex fractions like 2/(i(i+2)), decompose: 2/(i(i+2)) = A/i + B/(i+2). Multiply: 2 = A(i+2) + Bi. Setting i=0: 2 = 2A → A = 1. Setting i=−2: 2 = −2B → B = −1. So 2/(i(i+2)) = 1/i − 1/(i+2), which telescopes with step 2.

#### Finite Arithmetic and Geometric Sums via Telescoping
Revisit S_n = ∑(i=1 to n) i = n(n+1)/2. This can be derived by noting 2S_n = ∑(i=1 to n) (i + (n+1−i)) = ∑(i=1 to n) (n+1) = n(n+1), so S_n = n(n+1)/2. Or, recognize that ∑(i=1 to n) i can be computed using the formula for an arithmetic series directly.

#### Review Questions
1. Evaluate ∑(i=2 to 10) 1/(i²−1).
2. Find ∑(i=1 to 50) i in two ways: using the formula and using sigma notation rules.
3. Simplify ∑(i=1 to n) [i² − (i−1)²].

---

### Binomial Theorem and Polynomial Expansion

### The Binomial Theorem
**Type:** Core Understanding
**Slug:** binomial-theorem
**Estimated time:** 15 min
**Key concepts:** binomial expansion · binomial coefficients · Pascal's triangle
**Summary:** The binomial theorem expands (x+y)^n into a sum of terms with binomial coefficients.

#### Statement and Formula
(x+y)^n = ∑(k=0 to n) C(n,k) x^(n−k) y^k, where C(n,k) = n! / (k!(n−k)!) is the binomial coefficient "n choose k." Example: (x+y)³ = C(3,0)x³y⁰ + C(3,1)x²y¹ + C(3,2)x¹y² + C(3,3)x⁰y³ = x³ + 3x²y + 3xy² + y³. The binomial coefficients form Pascal's triangle: each entry is the sum of the two above it. Row n of Pascal's triangle gives the coefficients for (x+y)^n.

#### Computing Binomial Coefficients
C(n,k) = n! / (k!(n−k)!) = n(n−1)···(n−k+1) / k!. Example: C(7,3) = 7·6·5 / (3·2·1) = 210/6 = 35. Alternatively, use Pascal's triangle: row 7 is 1, 7, 21, 35, 35, 21, 7, 1, so C(7,3) = 35. Symmetry: C(n,k) = C(n,n−k). Thus C(10,2) = C(10,8) = 45.

#### Applications
Expand (2x − 3)⁴: use (a+b)⁴ with a = 2x and b = −3. (2x−3)⁴ = ∑(k=0 to 4) C(4,k) (2x)^(4−k) (−3)^k = (2x)⁴ + 4(2x)³(−3) + 6(2x)²(−3)² + 4(2x)(−3)³ + (−3)⁴ = 16x⁴ − 96x³ + 216x² − 216x + 81. The binomial theorem also proves combinatorial identities: for instance, (1+1)^n = ∑(k=0 to n) C(n,k) = 2^n, showing that the number of subsets of an n-element set is 2^n.

#### Extracting a Specific Term
Find the term containing x⁵ in (x² − 1/x)⁶. In the expansion, the general term is C(6,k) (x²)^(6−k) (−1/x)^k = C(6,k) (−1)^k x^(12−2k−k) = C(6,k) (−1)^k x^(12−3k). For x⁵, set 12 − 3k = 5 → k = 7/3, which is not an integer. So no term contains exactly x⁵. If asked for the coefficient of x⁶, set 12 − 3k = 6 → k = 2. The term is C(6,2) (−1)² x⁶ = 15x⁶, so the coefficient is 15.

#### Review Questions
1. Expand (a + 2b)⁴.
2. Find the term containing x³ in (3x + 1)⁶.
3. Use the binomial theorem to verify (1 + x)² = 1 + 2x + x².

---

### Polar Coordinates and Parametric Equations

### Converting Between Cartesian and Polar Coordinates
**Type:** Core Understanding
**Slug:** polar-cartesian-conversion
**Estimated time:** 15 min
**Key concepts:** polar coordinates (r, θ) · conversion formulas · graphs in polar form
**Summary:** Polar coordinates (r, θ) represent position as distance from origin and angle from positive x-axis.

#### Conversion Formulas
Cartesian (x, y) ↔ Polar (r, θ): x = r cos θ, y = r sin θ, r = √(x² + y²), tan θ = y/x (with care for quadrant). Example: (x, y) = (3, 4) → r = √(9+16) = 5, θ = arctan(4/3) ≈ 53.1° ≈ 0.927 rad. Conversely, (r, θ) = (5, π/6) → x = 5 cos(π/6) = 5·√3/2 ≈ 4.33, y = 5 sin(π/6) = 5·(1/2) = 2.5.

#### Polar Curves and Their Shapes
r = a is a circle centered at the origin with radius a. r = a θ (spiral of Archimedes) winds outward as θ increases. r = a + b cos θ (cardioid if a=b, limacon if a≠b) is heart-shaped. r = a cos(nθ) is a rose curve with n petals (if n is odd) or 2n petals (if n is even). θ = c is a ray from the origin at angle c. These polar curves often have simpler equations than their Cartesian counterparts.

#### Plotting Polar Curves
To plot r = 2 + 2cos θ (cardioid), compute r for θ = 0°, 30°, 60°, 90°, 120°, 150°, 180°. At θ=0°, r=4 (farthest from origin). At θ=90°, r=2. At θ=180°, r=0 (cusp at origin). The curve is symmetric about the positive x-axis because cos(−θ) = cos θ. Negative r values are plotted in the opposite direction: (r, θ) with r < 0 is equivalent to (|r|, θ + π). Learners often find sketching polar curves easier than Cartesian curves because symmetry is immediately visible.

#### Area in Polar Coordinates
The area enclosed by a polar curve r = f(θ) from θ = α to θ = β is A = ½ ∫(α to β) r² dθ. Example: area enclosed by r = 3 from θ = 0 to θ = 2π is A = ½ ∫(0 to 2π) 9 dθ = (9/2)·2π = 9π, a circle of radius 3 with area πr² = 9π ✓. For r = θ on [0, 2π], A = ½ ∫(0 to 2π) θ² dθ = (1/2)·[θ³/3] from 0 to 2π = (1/6)·8π³ = 4π³/3 ≈ 39.5.

#### Review Questions
1. Convert (6, 2π/3) from polar to Cartesian coordinates.
2. Convert (−3, 4) from Cartesian to polar coordinates.
3. Describe the curve r = 4 sin θ and find its area.

---

### Parametric Equations and Curves
**Type:** Application
**Slug:** parametric-equations
**Estimated time:** 15 min
**Key concepts:** parametrization · eliminating the parameter · velocity and tangent
**Summary:** Parametric equations x = f(t), y = g(t) trace a curve as parameter t varies.

#### Parametric Representation of Common Curves
A circle of radius a centered at (h, k) is x = h + a cos t, y = k + a sin t for t ∈ [0, 2π]. Example: x = 2 + 3cos t, y = 1 + 3sin t traces a circle centered at (2, 1) with radius 3. An ellipse with semi-major axis a and semi-minor axis b is x = a cos t, y = b sin t. A line through (x₀, y₀) in direction (dx, dy) is x = x₀ + dx·t, y = y₀ + dy·t. A parabola y = x² is x = t, y = t². This parametrization makes it easy to compute arc length and trace motion at varying speeds.

#### Eliminating the Parameter
From x = 2 cos t and y = 3 sin t, derive the Cartesian equation. Rearrange: cos t = x/2 and sin t = y/3. Use sin²t + cos²t = 1: (y/3)² + (x/2)² = 1 → x²/4 + y²/9 = 1, an ellipse. From x = t + 1 and y = t² − 1, eliminate t: t = x − 1, so y = (x−1)² − 1 = x² − 2x. For parametric curves that loop or have multiple branches, eliminating the parameter can lose information about the direction and extent of the curve.

#### Velocity and Tangent Line
The velocity vector is v(t) = (dx/dt, dy/dt). Example: for x = cos t, y = sin t (unit circle), v(t) = (−sin t, cos t). At t = π/6, v = (−1/2, √3/2), pointing northwest along the circle. The slope of the tangent line is dy/dx = (dy/dt) / (dx/dt). At t = π/6, dy/dx = (√3/2) / (−1/2) = −√3. The speed is |v| = √[(dx/dt)² + (dy/dt)²]. For the circle, |v| = √(sin²t + cos²t) = 1 (constant), so the particle moves at unit speed around the circle.

#### Worked Example: Cycloid
A wheel of radius 1 rolling along the x-axis traces a cycloid: x = t − sin t, y = 1 − cos t, where t is the angle through which the wheel has rotated. At t = 0, (x, y) = (0, 0) (starting at origin). At t = π, (x, y) = (π, 2) (particle has risen to height 2, then descended). At t = 2π, (x, y) = (2π, 0) (particle returns to x-axis after one complete rotation). The velocity is v = (1 − cos t, sin t). At t = 0, v = (0, 0) (the wheel's contact point is instantaneously at rest). At t = π, v = (2, 0) (maximum horizontal speed, twice the wheel's center speed).

#### Review Questions
1. Find the Cartesian equation for x = t³, y = t² for t ≥ 0.
2. Parametrize the line through (1, 2) and (4, 5).
3. For the curve x = 2 + cos t, y = 3 + sin t, find dy/dx at t = π/4.

---

### Vectors and Complex Numbers

### Vector Operations and Applications
**Type:** Application
**Slug:** vector-operations
**Estimated time:** 15 min
**Key concepts:** dot product · cross product · vector projections · magnitude
**Summary:** Vectors are quantities with magnitude and direction; they're essential in physics and engineering.

#### Vector Notation and Magnitude
A vector **v** = (v_x, v_y) in 2D or (v_x, v_y, v_z) in 3D. Its magnitude is |**v**| = √(v_x² + v_y²) or √(v_x² + v_y² + v_z²). Example: **v** = (3, 4) has |**v**| = 5. A unit vector has magnitude 1; the unit vector in the direction of **v** is **v̂** = **v**/|**v**| = (3/5, 4/5). Vector addition: **u** + **v** = (u_x+v_x, u_y+v_y). Scalar multiplication: c**v** = (cv_x, cv_y) scales the magnitude by |c|. If c < 0, the direction reverses.

#### Dot Product
The dot product **u** · **v** = u_x v_x + u_y v_y = |**u**| |**v**| cos θ, where θ is the angle between the vectors. Example: **u** = (1, 0) and **v** = (0, 1) are perpendicular: **u** · **v** = 0. If **u** = (2, 3) and **v** = (1, 4), then **u** · **v** = 2·1 + 3·4 = 14. The dot product is zero iff the vectors are perpendicular. It's used to compute work in physics: W = **F** · **d**, where **F** is force and **d** is displacement.

#### Cross Product (3D)
The cross product **u** × **v** produces a vector perpendicular to both **u** and **v**, with magnitude |**u**| |**v**| sin θ. In component form: **u** × **v** = (u_y v_z − u_z v_y, u_z v_x − u_x v_z, u_x v_y − u_y v_x). Example: **i** × **j** = **k** (the unit vectors along x, y, z axes). The cross product is used to compute torque: τ = **r** × **F**, where **r** is position and **F** is force. Note: **u** × **v** ≠ **v** × **u**; instead, **v** × **u** = −(**u** × **v**).

#### Vector Projections
The projection of **u** onto **v** is proj_**v**(**u**) = [(**u** · **v**) / |**v**|²] **v**. Its magnitude is |**u**| cos θ, where θ is the angle between them. Example: project **u** = (3, 4) onto **v** = (1, 0). **u** · **v** = 3, |**v**|² = 1, so proj = 3**v** = (3, 0). This represents the component of **u** in the direction of **v**.

#### Review Questions
1. Find the angle between **u** = (1, 1) and **v** = (1, 0).
2. Compute **a** × **b** for **a** = (1, 0, 0) and **b** = (0, 1, 0).
3. Project **v** = (4, 3) onto **w** = (1, 0).

---

### De Moivre's Theorem and Complex Numbers in Polar Form
**Type:** Application
**Slug:** de-moivre-theorem
**Estimated time:** 15 min
**Key concepts:** complex polar form · De Moivre's theorem · powers and roots
**Summary:** Complex numbers in polar form z = r(cos θ + i sin θ) simplify exponentiation.

#### Polar Form of Complex Numbers
A complex number z = x + iy can be written in polar form z = r(cos θ + i sin θ) = r cis θ, where r = |z| = √(x²+y²) and θ = arg(z) = arctan(y/x) (adjusted for quadrant). Example: z = 1 + i has r = √2 and θ = π/4, so z = √2 cis(π/4) = √2(cos(π/4) + i sin(π/4)).

#### De Moivre's Theorem
For any positive integer n, (r cis θ)^n = r^n cis(nθ). Example: (1+i)^8 = (√2 cis(π/4))^8 = (√2)^8 cis(8π/4) = 16 cis(2π) = 16(cos(2π) + i sin(2π)) = 16·1 = 16. This is far faster than expanding (1+i)^8 algebraically. For negative n, (z)^(−n) = 1/z^n. For fractional n = p/q, z^(p/q) represents the q-th root(s) of z^p.

#### Finding Roots of Complex Numbers
The n-th roots of z = r cis θ are z^(1/n) = r^(1/n) cis((θ + 2πk)/n) for k = 0, 1, ..., n−1. Example: find the cube roots of 8. Here, 8 = 8 cis(0), r = 8, θ = 0. The cube roots are: 2 cis(0) = 2, 2 cis(2π/3) = 2(−1/2 + i√3/2) = −1 + i√3, and 2 cis(4π/3) = 2(−1/2 − i√3/2) = −1 − i√3. These three values have product 2·(−1+i√3)·(−1−i√3) = 2·2 = 8 ... wait, that's not right; let me recalculate. Actually, their product is 8 and their sum is 0. In polar form, finding roots is straightforward; in Cartesian form, it requires solving cubic equations.

#### Euler's Formula and Exponential Form
Euler's formula states e^(iθ) = cos θ + i sin θ. So z = r cis θ can be written z = r e^(iθ). De Moivre becomes z^n = r^n e^(inθ). This exponential notation is more compact and makes differentiation and integration of complex functions natural. The identity e^(iπ) + 1 = 0 is one of mathematics' most beautiful equations.

#### Review Questions
1. Convert 3 − 3i to polar form.
2. Compute (1 + i)^6 using De Moivre's theorem.
3. Find all fourth roots of −1 and express them in Cartesian form.

---

### Sequences, Series, and Convergence
**Type:** Mixed/Review
**Slug:** sequences-convergence
**Estimated time:** 12 min
**Key concepts:** limits of sequences · convergence · divergence tests
**Summary:** Sequences can converge to a limit, diverge to infinity, or oscillate.

#### Convergence of Sequences
A sequence {a_n} converges to a limit L (written lim(n→∞) a_n = L) if for every ε > 0, there exists N such that |a_n − L| < ε for all n > N. Intuitively, the terms get arbitrarily close to L for large n. Example: a_n = 1/n converges to 0. For any ε > 0, choose N = 1/ε. Then for n > N, |1/n − 0| = 1/n < 1/N = ε. Sequences that don't converge diverge. a_n = n diverges to ∞. a_n = (−1)^n oscillates and doesn't converge.

#### Convergence of Infinite Series
An infinite series ∑(n=1 to ∞) a_n converges to a sum S if the partial sums S_N = ∑(n=1 to N) a_n converge to S as N → ∞. Example: the geometric series ∑(n=0 to ∞) r^n = 1/(1−r) for |r| < 1. The partial sum is S_N = (1−r^(N+1))/(1−r). As N → ∞ and |r| < 1, r^(N+1) → 0, so S_N → 1/(1−r).

#### Divergence Tests
If lim(n→∞) a_n ≠ 0, then ∑ a_n diverges (the n-th term test). Example: ∑ n/(n+1) diverges because lim(n→∞) n/(n+1) = 1 ≠ 0. For geometric series, ∑ r^n converges iff |r| < 1. For p-series, ∑ 1/n^p converges iff p > 1. The comparison and ratio tests further determine convergence.

#### Review Questions
1. Does the sequence a_n = (n+1)/n converge? If so, to what limit?
2. Does the series ∑(n=1 to ∞) 1/(2^n) converge?
3. For which values of x does ∑(n=0 to ∞) x^n converge?

---

### Binomial Series and Generating Functions
**Type:** Mixed/Review
**Slug:** binomial-series-generating
**Estimated time:** 12 min
**Key concepts:** generalized binomial theorem · series expansion · combinatorial generating
**Summary:** The binomial theorem extends to non-integer exponents as a power series.

#### Generalized Binomial Theorem
For any real α (not necessarily a positive integer), (1+x)^α = ∑(n=0 to ∞) C(α,n) x^n, where C(α,n) = α(α−1)···(α−n+1) / n!. This converges for |x| < 1. Example: (1+x)^(−1) = ∑(n=0 to ∞) (−1)^n x^n = 1 − x + x² − x³ + ... (the geometric series with r = −x). Another: √(1+x) = (1+x)^(1/2) = 1 + (1/2)x − (1/8)x² + (1/16)x³ − ...

#### Generating Functions for Combinatorial Sequences
The generating function for the Fibonacci sequence {F_n} is G(x) = ∑(n=0 to ∞) F_n x^n = x / (1 − x − x²). For the sequence a_n = 2^n, the generating function is G(x) = ∑(n=0 to ∞) 2^n x^n = 1/(1−2x) for |x| < 1/2. Generating functions encode combinatorial information and simplify counting arguments. For instance, the coefficient of x^n in (1+x)^k is C(k,n), the number of ways to choose n items from k.

#### Review Questions
1. Expand (1−x)^(−2) using the generalized binomial theorem.
2. Find the generating function for the sequence a_n = n.
3. Use generating functions to prove ∑(k=0 to n) C(n,k) = 2^n.

---

### Precalculus Problem Solving (Mixed Review)
**Type:** Mixed/Review
**Slug:** precalc-problem-solving
**Estimated time:** 12 min
**Key concepts:** multi-step problems · combining techniques · real-world applications
**Summary:** Complex precalculus problems often combine sequences, series, polar coordinates, and complex numbers.

#### Problem-Solving Strategy
Identify what's given and what's asked. Translate to mathematical notation. Choose techniques (sequence formula? series sum? polar conversion? complex arithmetic?). Solve step-by-step, checking each step for errors. Verify the answer makes sense (e.g., a probability should be between 0 and 1; a distance should be positive).

#### Worked Example: Compound Interest and Annuities
An investment starts with $1000 and earns 5% annually. After 10 years, how much will it be worth? If you add $100 at the end of each year, what's the total after 10 years? The first part is compound interest: A = P(1+r)^t = 1000(1.05)^10 ≈ $1628.89. The second part is an annuity: the additional payments form a geometric series. Each $100 earns interest for the remaining years: the first additional $100 earns interest for 9 years: 100(1.05)^9; the second for 8 years: 100(1.05)^8; ...; the last for 0 years: 100. The sum is 100[1.05 + 1.05² + ... + 1.05^9] = 100·1.05·(1−1.05^9)/(1−1.05) ≈ $1268. Total after 10 years: $1628.89 + $1268 ≈ $2897.

#### Worked Example: Navigation with Complex Numbers
Two ships start at the origin. Ship A travels in direction e^(iπ/6) (60° in complex plane) at speed 3 units/hour. Ship B travels in direction e^(iπ/3) (30°) at speed 4 units/hour. After 2 hours, find the distance between them. Ship A is at position 2·3·e^(iπ/6) = 6e^(iπ/6) = 6(√3/2 + i/2) = 3√3 + 3i. Ship B is at 2·4·e^(iπ/3) = 8e^(iπ/3) = 8(1/2 + i√3/2) = 4 + 4√3 i. Distance: |A − B| = |(3√3−4) + i(3−4√3)| = √[(3√3−4)² + (3−4√3)²] = √[27 − 24√3 + 16 + 9 − 24√3 + 48] = √[100 − 48√3] ≈ √[16.87] ≈ 4.1 units.

#### Review Questions
1. A savings account has $5000 initially and adds $200/month with 0.5% monthly interest. How much after 3 years?
2. In polar coordinates, two points are at (5, 0) and (3, π/2). Find the distance between them.
3. Solve for z: |z| = 2 and z^3 = 8i.

---

### Precalculus Competition Problems
**Type:** Competition Extension
**Slug:** precalc-competition-problems
**Estimated time:** 10 min
**Key concepts:** clever factoring · hidden patterns · rapid mental calculation
**Summary:** Competition problems often require recognizing patterns and using elegant techniques.

#### Pattern Recognition in Sequences
"Find the sum 1 + 2 + 4 + 8 + ... + 2^99." Recognize it as a geometric series: S = ∑(k=0 to 99) 2^k = (1−2^100)/(1−2) = 2^100 − 1. Direct calculation would take forever. Another: "Find the sum 1 + 1/2 + 1/4 + 1/8 + ..." This is a geometric series with r = 1/2: S = 1/(1−1/2) = 2.

#### Clever Binomial Expansion Tricks
"Expand (x+y)^n and find the sum of coefficients." Setting x = y = 1: (1+1)^n = 2^n = ∑(k=0 to n) C(n,k). So the sum of binomial coefficients is 2^n. Another: "Find the coefficient of x^3 in (2x − 1/x)^5." Use the binomial theorem: the general term is C(5,k)(2x)^(5−k)(−1/x)^k = C(5,k)(−1)^k 2^(5−k) x^(5−2k). For x³, set 5 − 2k = 3 → k = 1. Coefficient: C(5,1)(−1)^1 2^4 = 5·(−1)·16 = −80.

#### Telescoping and Cancellation Tricks
"Compute ∑(k=1 to 100) 1/(k(k+1))." Recognize 1/(k(k+1)) = 1/k − 1/(k+1), which telescopes: ∑ = 1 − 1/101 = 100/101. Trap: not recognizing the telescoping and attempting to compute 100 terms.

#### Complex Number Speed Tricks
"Find (1+i)^2024." Convert to polar: 1+i = √2 e^(iπ/4). (1+i)^2024 = (√2)^2024 e^(i·2024π/4) = 2^1012 e^(i·506π) = 2^1012 e^(0) = 2^1012 (since e^(i·506π) = cos(506π) + i sin(506π) = 1 because 506 is even). Trap: computing 1024 multiplications instead of recognizing the pattern.

#### Toss-Up Example: "For 10 points, what is the sum of the infinite series 1/2 + 1/4 + 1/8 + 1/16 + ...?"
Answer: This is a geometric series with a = 1/2 and r = 1/2, so S = (1/2)/(1−1/2) = 1. Alternatively, recognize 1/2 + 1/4 + ... = (1 − 1/2) = 1 (the sum represents all values between 0 and 1 in binary: 0.111... = 1 in decimal).

#### Review Questions
1. Find ∑(k=1 to 50) [k² − (k−1)²].
2. Simplify (−1 + i√3)^12.
3. Prove ∑(k=1 to n) k/(k+1)! = 1 − 1/(n+1)!.

---
