# HS Math — Competition Mathematics
*High School Science Bowl prep · 48 lesson drafts across 6 subtopics*

---

## Subtopic: Advanced Counting & Combinatorics

### Stars and Bars
**Type:** Core Understanding
**Slug:** stars-and-bars
**Estimated time:** 15 min
**Key concepts:** distributing identical items · non-negative integers · combinatorial method
**Summary:** Stars and bars counts the ways to distribute n identical items into k distinct groups.

#### The Stars and Bars Formula
To distribute n identical items into k distinct groups (allowing empty groups), arrange n stars and k−1 bars in a line. Each arrangement corresponds to a distribution. For example, distributing 5 stars into 3 groups with 2 bars: * * | * | * * means 2 items in group 1, 1 in group 2, 2 in group 3. The number of arrangements is C(n+k−1, k−1) = (n+k−1)! / (n!(k−1)!). For n = 5, k = 3: C(7, 2) = 21.

#### Applications
How many non-negative integer solutions does x₁ + x₂ + x₃ = 10 have? This is equivalent to distributing 10 identical items into 3 distinct groups. Answer: C(10+3−1, 3−1) = C(12, 2) = 66. How many ways can you buy 5 items from a store with 4 types (allowing multiple of each type)? Answer: C(5+4−1, 4−1) = C(8, 3) = 56.

#### Inclusion-Exclusion with Stars and Bars
If there are restrictions (e.g., each group has at least 1 item), substitute y_i = x_i − 1 ≥ 0. Then y₁ + y₂ + y₃ = 7, giving C(7+2, 2) = 36 solutions. If x₁ > x₂, use a bijection or generating functions to count more complex constraints.

#### Review Questions
1. How many ways can 8 identical apples be distributed among 3 children?
2. How many non-negative integer solutions does x + y + z + w = 20 have?
3. How many ways can you choose 10 identical balls from a supply with 4 colors?

---

### Inclusion-Exclusion Principle
**Type:** Application
**Slug:** inclusion-exclusion
**Estimated time:** 15 min
**Key concepts:** counting via overlaps · union of sets · derangements
**Summary:** Inclusion-exclusion counts members of a union by adding individual sets and subtracting overlaps.

#### Statement and Formula
|A₁ ∪ A₂ ∪ ... ∪ A_n| = ∑|A_i| − ∑|A_i ∩ A_j| + ∑|A_i ∩ A_j ∩ A_k| − ... For two sets: |A ∪ B| = |A| + |B| − |A ∩ B|. Example: how many integers from 1 to 100 are divisible by 2 or 3? |A| = ⌊100/2⌋ = 50 (divisible by 2). |B| = ⌊100/3⌋ = 33 (divisible by 3). |A ∩ B| = ⌊100/6⌋ = 16 (divisible by 6). So |A ∪ B| = 50 + 33 − 16 = 67.

#### Counting with Restrictions
How many integers from 1 to 1000 are not divisible by 2, 3, or 5? Use inclusion-exclusion: total = 1000. Subtract those divisible by 2: 500. Divisible by 3: 333. Divisible by 5: 200. Add back those divisible by 2 and 3: 166. By 2 and 5: 100. By 3 and 5: 66. Subtract those divisible by 2, 3, and 5: 33. Answer: 1000 − 500 − 333 − 200 + 166 + 100 + 66 − 33 = 266.

#### Derangements
A derangement is a permutation where no element is in its original position. Using inclusion-exclusion, the number of derangements D_n of n objects is D_n = n! ∑(k=0 to n) (−1)^k/k! ≈ n!/e. For small n: D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44. Example: arrange {1, 2, 3} so 1 is not in position 1, 2 not in position 2, 3 not in position 3. Valid arrangements: (2, 3, 1) and (3, 1, 2). Count = 2 = D_3.

#### Review Questions
1. How many integers from 1 to 100 are divisible by 4 or 6?
2. How many permutations of {1, 2, 3, 4} are derangements?
3. How many 5-digit numbers use each of {1, 2, 3, 4, 5} exactly once and don't have i in position i for any i?

---

### Generating Functions and Recurrence Solutions
**Type:** Mixed/Review
**Slug:** generating-functions-recurrence
**Estimated time:** 12 min
**Key concepts:** ordinary generating functions · recurrence relations · solving for sequences
**Summary:** Generating functions convert recurrence relations into algebraic equations.

#### Generating Functions Definition
The ordinary generating function (OGF) for a sequence {a_n} is G(x) = ∑(n=0 to ∞) a_n x^n. For the Fibonacci sequence, F_0 = 0, F_1 = 1, F_n = F_{n−1} + F_{n−2}, the OGF is G(x) = x / (1 − x − x²). The coefficients of the power series expansion give the Fibonacci numbers. Extracting coefficients from known generating functions (like 1/(1−x) = ∑ x^n) reveals sequence formulas.

#### Solving Recurrences with Generating Functions
For a_n = c₁a_{n−1} + c₂a_{n−2} with initial conditions, multiply by x^n and sum to get an equation for G(x). Solve for G(x), then expand to extract coefficients. Example: a_n = 2a_{n−1} with a_0 = 1. Then G(x) = ∑ a_n x^n = a_0 + a_1 x + a_2 x² + ... = 1 + 2x + 4x² + ... = 1/(1−2x). Extract coefficients: a_n = 2^n.

#### Review Questions
1. Find the generating function for a_n = n.
2. Solve the recurrence a_n = 3a_{n−1} − 2a_{n−2} with a_0 = 1, a_1 = 1 using generating functions.

---

## Subtopic: Functional Equations & Algebraic Manipulation

### Functional Equations
**Type:** Core Understanding
**Slug:** functional-equations
**Estimated time:** 15 min
**Key concepts:** solving for unknown functions · substitution strategies · establishing values
**Summary:** Functional equations express relationships that a function must satisfy; solving requires clever substitutions.

#### Strategy: Finding Special Values
Given f(x+y) = f(x) + f(y), find f(0). Set x = y = 0: f(0) = f(0) + f(0) → f(0) = 0. This reveals that additive functions pass through the origin. Another: given f(xy) = f(x)f(y), find f(1). Set x = y = 1: f(1) = f(1)² → f(1) = 0 or 1.

#### Cauchy's Functional Equations
The additive Cauchy equation f(x+y) = f(x) + f(y) has solutions f(x) = cx for linear functions (continuous or monotonic). The multiplicative version f(xy) = f(x)f(y) has solutions f(x) = x^c or f(x) = 0. The power law f(x^n) = [f(x)]^n follows from repeated multiplication. These appear in competition problems as constraints on unknown functions.

#### Solved Example: f(x) + f(y) = f(x+y)
Assume f is differentiable. Differentiate both sides with respect to x: f'(x) = f'(x+y). This holds for all y, so f' is constant: f'(x) = c. Thus f(x) = cx + d. Using f(x) + f(y) = f(x+y): cx + d + cy + d = c(x+y) + d → d = 0, so f(x) = cx.

#### Worked Example: Olympiad Functional Equation
Find f: ℝ → ℝ such that f(x² + f(y)) = y + [f(x)]². Substitute x = 0: f(f(y)) = y + [f(0)]². Let f(0) = c. Then f(f(y)) = y + c². If c = 0, f(f(y)) = y (f is an involution). Testing f(x) = x: f(x² + y) = y + x², true ✓. Testing f(x) = −x: f(x² − y) = y + x², giving x² − y = y + x² → −y = y, true only for y = 0, invalid. Solution: f(x) = x (or check that f(x) = −x fails; more solutions may exist under relaxed conditions).

#### Review Questions
1. Find all functions f: ℝ → ℝ such that f(2x) = 2f(x).
2. Solve f(x−y) = f(x)/f(y) for f.
3. If f(x) + f(1−x) = 1 for all x, what is f(1/2)?

---

## Subtopic: Olympiad Geometry

### Angle Chasing and Triangle Centers
**Type:** Core Understanding
**Slug:** angle-chasing-triangle-centers
**Estimated time:** 15 min
**Key concepts:** angle calculations · cevians · triangle centers
**Summary:** Angle chasing uses angle relationships to solve geometric problems; triangle centers are special points.

#### Triangle Centers
The centroid G divides each median in ratio 2:1 from vertex to midpoint. The circumcenter O is equidistant from all vertices. The incenter I is equidistant from all sides and lies on angle bisectors. The orthocenter H is the intersection of altitudes. Euler line: for non-equilateral triangles, H, G, O are collinear with HG:GO = 2:1. These centers have properties useful in competition proofs.

#### Angle-Chasing Strategy
Label angles using variables (e.g., ∠BAC = α) and use angle sum properties (triangle: 180°, cyclic quadrilateral: opposite angles sum to 180°) to establish relationships. Example: in triangle ABC with angle bisectors meeting at I, ∠BIC = 90° + ∠A/2. Proof: ∠IBC = ∠B/2, ∠ICB = ∠C/2, so ∠BIC = 180° − (∠B + ∠C)/2 = 180° − (180° − ∠A)/2 = 90° + ∠A/2.

#### Ceva's and Menelaus's Theorems
Ceva's theorem: concurrent cevians AD, BE, CF (from vertices to opposite sides) satisfy (AF/FB)·(BD/DC)·(CE/EA) = 1. Menelaus's theorem: a line crossing sides (or extensions) of triangle ABC at points D, E, F (on BC, CA, AB) satisfies (AF/FB)·(BD/DC)·(CE/EA) = −1 (with signed ratios). These provide elegant condition for collinearity or concurrency without coordinate geometry.

#### Review Questions
1. In triangle ABC, the angle bisectors from B and C meet at I. Prove ∠BIC = 90° + ∠A/2.
2. Use Ceva's theorem to prove medians are concurrent.
3. If a line crosses the sides of triangle ABC extended, when are three points collinear?

---

### Trigonometric and Coordinate Geometry
**Type:** Application
**Slug:** trig-coordinate-geometry
**Estimated time:** 15 min
**Key concepts:** coordinate setup · trigonometric identities · complex numbers for geometry
**Summary:** Trigonometry and coordinates simplify geometric calculations; complex numbers offer elegant solutions.

#### Coordinate Geometry Strategy
Place the figure in a coordinate system to convert geometric conditions to algebraic equations. Example: prove the diagonals of a rectangle are equal. Place rectangle with vertices at (0,0), (a,0), (a,b), (0,b). Diagonals: from (0,0) to (a,b) has length √(a²+b²); from (a,0) to (0,b) has length √(a²+b²). Equal ✓.

#### Complex Numbers in Geometry
A point in the plane is represented as a complex number z = x + iy. Rotation by angle θ around the origin: z' = e^(iθ) · z. Translation by a: z' = z + a. A triangle with vertices at complex numbers z₁, z₂, z₃ is equilateral iff z₁ + ωz₂ + ω²z₃ = 0, where ω = e^(2πi/3) (a cube root of unity). This elegant characterization avoids side-length calculations.

#### Trigonometric Proofs in Geometry
Law of sines: a/sin A = b/sin B = c/sin C = 2R (circumradius). Law of cosines: c² = a² + b² − 2ab cos C. These relate side lengths to angles, useful in competition proofs. Example: in a triangle with sides a, b, c and area K, prove K = (1/2)ab sin C. This is immediate from the formula K = (1/2) · base · height = (1/2)ab sin C.

#### Review Questions
1. Use coordinates to prove that the perpendicular bisectors of a triangle are concurrent.
2. Prove that a quadrilateral inscribed in a circle has opposite angles summing to 180°.
3. If z₁, z₂, z₃ represent vertices of an equilateral triangle in the complex plane, what is z₁ + z₂ + z₃ if the triangle is centered at the origin?

---

## Subtopic: Number Theory Problem Solving

### Modular Arithmetic and Cryptography
**Type:** Application
**Slug:** crypto-modular-arithmetic
**Estimated time:** 15 min
**Key concepts:** RSA · encryption · Euler's theorem application
**Summary:** Modern cryptography relies on number-theoretic problems; understanding modular arithmetic reveals security principles.

#### RSA Encryption Basics
Choose large primes p and q. Compute n = pq and φ(n) = (p−1)(q−1). Choose e coprime to φ(n). Compute d such that ed ≡ 1 (mod φ(n)) using the extended Euclidean algorithm. Public key: (n, e). Private key: d. Encryption: C ≡ M^e (mod n). Decryption: M ≡ C^d (mod n). By Euler's theorem, C^d ≡ (M^e)^d ≡ M^(ed) ≡ M^(1 + kφ(n)) ≡ M (mod n) ✓.

#### Worked Example: Small RSA
Let p = 61, q = 53, so n = 3233, φ(n) = 60·52 = 3120. Choose e = 17 (coprime to 3120). Compute d: 17d ≡ 1 (mod 3120) → d = 2753 (by extended GCD). To encrypt M = 65: C ≡ 65^17 (mod 3233) ≈ 2790. To decrypt: M ≡ 2790^2753 (mod 3233) = 65 ✓. (Actual computation requires fast modular exponentiation.)

#### Security via Factorization Hardness
Cracking RSA requires factoring n = pq. For large primes (hundreds of digits), no polynomial-time factorization algorithm is known. This hardness assumption secures RSA. Shor's algorithm (quantum computing) can factor in polynomial time, motivating post-quantum cryptography research.

#### Review Questions
1. In RSA, if n = 77 = 7·11, compute φ(n) and find e and d.
2. What is the encrypted message C for M = 10, e = 7, n = 77?
3. Decrypt C = 37 using d = 23, n = 77.

---

### Diophantine Equations
**Type:** Mixed/Review
**Slug:** diophantine-equations
**Estimated time:** 12 min
**Key concepts:** linear Diophantine equations · Pell equation · parametric solutions
**Summary:** Diophantine equations seek integer (or rational) solutions; they range from simple to unsolved problems.

#### Linear Diophantine Equations
The equation ax + by = c has integer solutions iff gcd(a, b) | c. If gcd(a, b) = 1, a solution exists. The extended Euclidean algorithm finds one solution (x₀, y₀), and the general solution is x = x₀ + (b/gcd(a,b))t, y = y₀ − (a/gcd(a,b))t for any integer t. Example: 3x + 5y = 1. The extended GCD gives (x₀, y₀) = (2, −1) (since 3·2 + 5·(−1) = 1). General solution: x = 2 + 5t, y = −1 − 3t.

#### Pell Equation
x² − Dy² = 1 (where D is not a perfect square) has infinitely many positive integer solutions. The fundamental solution (x₁, y₁) is the smallest, and all others are generated by (x_n, y_n) where x_n + y_n√D = (x₁ + y₁√D)^n. Example: x² − 2y² = 1. Fundamental solution (3, 2) (since 3² − 2·2² = 1). Next: (3 + 2√2)² = 17 + 12√2, so (17, 12) is a solution (17² − 2·12² = 289 − 288 = 1 ✓).

#### Review Questions
1. Solve 2x + 7y = 3 for integer x, y.
2. Find the fundamental solution to x² − 3y² = 1.
3. Are there integer solutions to 2x + 4y = 3?

---

## Subtopic: Mathematical Modeling & Optimization

### Linear Programming and Optimization
**Type:** Application
**Slug:** linear-programming
**Estimated time:** 15 min
**Key concepts:** objective function · constraints · feasible region
**Summary:** Linear programming maximizes or minimizes a linear objective subject to linear constraints.

#### Linear Programming Setup
Maximize (or minimize) c₁x₁ + c₂x₂ + ... subject to a₁₁x₁ + a₁₂x₂ + ... ≤ b₁, ... and x_i ≥ 0. The feasible region is a convex polytope. The optimum occurs at a vertex. Example: maximize 3x + 2y subject to x + 2y ≤ 4, 2x + y ≤ 5, x, y ≥ 0. Vertices: (0,0), (0,2), (2,1), (5/2, 0). Objective values: 0, 4, 8, 7.5. Maximum = 8 at (2, 1).

#### Graphical Method
For two variables, sketch the constraints and identify the feasible region. Find vertices and evaluate the objective. For more variables, use the simplex algorithm (computational). In competitions, problems are often set to have nice integer solutions.

#### Worked Example: Production Optimization
A factory makes chairs and tables. Each chair requires 2 hours of labor and 10 board-feet of wood; profit $40. Each table requires 3 hours and 20 board-feet; profit $50. Available: 60 hours, 400 board-feet. Maximize profit. Variables: c = chairs, t = tables. Maximize 40c + 50t subject to 2c + 3t ≤ 60, 10c + 20t ≤ 400, c, t ≥ 0. Vertices: (0,0), (0,20), (40/3, 40/3)≈(13.3, 13.3), (30,0). Profits: 0, 1000, 1533, 1200. Optimum: t = 20 (all tables), profit $1000.

#### Review Questions
1. Maximize x + 2y subject to x + y ≤ 3, 2x + y ≤ 4, x, y ≥ 0.
2. In the production problem, if table profit increases to $60, what is the new optimum?
3. What is the feasible region for x + y ≥ 1, x − y ≤ 2, x ≥ 0?

---

## Subtopic: Speed Computation & Mental Math

### Mental Arithmetic Techniques
**Type:** Competition Extension
**Slug:** mental-arithmetic
**Estimated time:** 10 min
**Key concepts:** squaring · multiplication tricks · estimation · decomposition
**Summary:** Science Bowl rewards speed; these techniques accelerate calculations without a calculator.

#### Squaring Two-Digit Numbers
(50 + d)² = 2500 + 100d + d² = 2500 + d(100 + d). Example: 58² = 2500 + 8(108) = 2500 + 864 = 3364. For 49²: use (50−1)² = 2500 − 100 + 1 = 2401. For arbitrary n = 10a + b: n² = 100a² + 20ab + b² = 100a(a+1) + (b² + 20ab) = 100a(a+1) + b(b + 20a). Mental practice makes this instant.

#### Multiplication by 11
12 × 11 = 132: add digits 1+2=3, place between them: 1[3]2. 34 × 11 = 374: 3 + 4 = 7: 3[7]4. For 76 × 11 = 836: 7 + 6 = 13, carry: 7[1]3 but remember the carry → 8[3]6. Works up to 99 × 11 with care.

#### Multiplying Close Numbers
99 × 98 = (100−1)(100−2) = 10000 − 200 − 100 + 2 = 9702. General: (a−x)(a−y) = a² − a(x+y) + xy. For 23 × 24 (near 25): use 25 × 23 = 575, then subtract 24: wait, this doesn't directly apply. Instead: 23 × 24 = 20 × 20 + 20 × 4 + 3 × 20 + 3 × 4 = 400 + 80 + 60 + 12 = 552. Or: (25−2)(25−1) = 625 − 25 − 50 + 2 = 552 ✓.

#### Estimation and Rounding
78 × 52 ≈ 80 × 50 = 4000. Exact: (80−2)(50+2) = 4000 + 160 − 100 − 4 = 4056. For 1/0.49, use 1/(1−0.01) ≈ 1 + 0.01 = 1.0101 (via binomial approximation). These estimates are useful for checking answers or eliminating wrong choices in multiple-choice.

#### Review Questions
1. Compute 43² mentally.
2. Compute 67 × 11 mentally.
3. Estimate 19 × 21.

---

### Common Competition Tactics and Traps
**Type:** Competition Extension
**Slug:** competition-tactics-traps
**Estimated time:** 8 min
**Key concepts:** common pitfalls · verification strategies · time management
**Summary:** Awareness of tricks and time-wasters prevents lost points.

#### Off-by-One Errors
"How many integers are there from 10 to 20 inclusive?" The answer is 20 − 10 + 1 = 11, not 10. Students forget the "+1" for inclusive counting. Another: "How many terms in the sequence 5, 10, 15, ..., 100?" The answer is 100/5 = 20, not 19.

#### Misreading the Question
Toss-ups sometimes ask for "the number of" vs. "the value." Example: "How many integers satisfy x² < 10?" vs. "What is the largest integer satisfying x² < 10?" Careless reading loses points. Always reread the question before submitting.

#### Verification Before Time Expires
Plug the answer back into the original problem. Example: if you compute the roots of x² − 5x + 6 = 0 as x = 2, 3, verify: 2² − 5(2) + 6 = 4 − 10 + 6 = 0 ✓, 3² − 5(3) + 6 = 9 − 15 + 6 = 0 ✓. Quick checks catch algebra errors.

#### Time Management
Spend ~30 seconds on a toss-up. If stuck, note the problem and move on; return if time permits. Rushing leads to careless errors; pacing prevents panic. In a 10-point round, allocate ~1 minute per problem.

#### Worked Trap Example
"For 10 points, what is 0^0?" Some say 1 (following combinatorial convention), others say undefined (indeterminate form in calculus). In competition contexts, check the problem source and competition rules. Science Bowl typically expects 1 (in combinatorics) or undefined (in calculus).

#### Review Questions
1. What is 2 + 2 × 3? (Order of operations; answer 8, not 12.)
2. How many integers from 1 to 100 inclusive? (Answer 100, not 99.)
3. Verify: Is x = 3 a solution to 2(x−1) = 4?

---
