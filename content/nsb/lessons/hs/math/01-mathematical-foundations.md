# HS Math — Mathematical Foundations
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Mathematical Reasoning, Logic & Proof Techniques

### What Is Mathematical Proof?
**Type:** Core Understanding
**Slug:** what-is-mathematical-proof
**Estimated time:** 12 min
**Key concepts:** proof · theorem · axiom
**Summary:** A proof is a logically airtight argument that a mathematical statement is always true.

#### Axioms, Definitions, and Theorems
Mathematics is built on axioms — statements accepted without proof — and definitions that give precise meaning to terms. A theorem is a statement proved from axioms and previously established results. A lemma is a small helper theorem; a corollary follows easily from a theorem. Understanding this hierarchy is essential: you cannot prove something using a result that hasn't itself been established.

#### Direct Proof
The most straightforward proof technique: assume the hypothesis is true, then reason forward to the conclusion. Example: prove that the sum of two even integers is even. Let m = 2a and n = 2b. Then m + n = 2a + 2b = 2(a + b), which is even by definition. Every step follows from a definition or prior established fact.

#### Contrapositive and Contradiction
To prove "if P then Q," you can instead prove its contrapositive: "if not Q then not P" — logically equivalent. Proof by contradiction assumes both P and not-Q, then derives a contradiction. Classic example: suppose √2 = p/q in lowest terms; then 2 = p²/q², so p² = 2q², meaning p is even, so p = 2k, giving 4k² = 2q², so q² = 2k², meaning q is also even — contradicting lowest-terms assumption.

#### Review Questions
1. What is the difference between a theorem and an axiom?
2. Prove that if n² is even, then n is even (use contrapositive).
3. Why is "proof by example" not a valid proof technique for universal statements?

---

### Mathematical Induction
**Type:** Core Understanding
**Slug:** mathematical-induction
**Estimated time:** 14 min
**Key concepts:** base case · inductive hypothesis · inductive step
**Summary:** Induction proves a statement holds for all positive integers by establishing a base case and showing each case implies the next.

#### The Principle
Mathematical induction has two steps. (1) Base case: verify P(1) is true. (2) Inductive step: assume P(k) is true (inductive hypothesis), then prove P(k+1) is true. If both succeed, P(n) is true for all positive integers n. Think of it like dominoes: if the first falls and each one knocks down the next, all of them fall.

#### Classic Example: Sum Formula
Prove that 1 + 2 + 3 + … + n = n(n+1)/2. Base case: n = 1, left side = 1, right side = 1(2)/2 = 1. ✓ Inductive step: assume 1 + 2 + … + k = k(k+1)/2. Add (k+1) to both sides: 1 + 2 + … + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k/2 + 1) = (k+1)(k+2)/2. This is exactly the formula with n = k+1. ✓

#### Strong Induction
Sometimes you need to assume P(1), P(2), …, P(k) all hold to prove P(k+1). This "strong induction" is logically equivalent to regular induction. It's useful for sequences defined by multiple previous terms, like the Fibonacci sequence.

#### Review Questions
1. Prove by induction that 1² + 2² + … + n² = n(n+1)(2n+1)/6.
2. What goes wrong if you skip the base case?
3. Use strong induction to prove every integer ≥ 2 is divisible by a prime.

---

### Logical Connectives and Truth Tables
**Type:** Core Understanding
**Slug:** logical-connectives-truth-tables
**Estimated time:** 10 min
**Key concepts:** AND · OR · NOT · implication · biconditional
**Summary:** Logical connectives combine propositions; truth tables systematically list when compound statements are true or false.

#### The Five Connectives
Given propositions P and Q: (1) P ∧ Q (AND) is true only when both are true. (2) P ∨ Q (OR) is true when at least one is true. (3) ¬P (NOT) flips truth value. (4) P → Q (implication, "if P then Q") is false only when P is true and Q is false. (5) P ↔ Q (biconditional) is true when P and Q have the same truth value. The implication is the trickiest: "if it rains, I get wet" is not violated on dry days — a false hypothesis makes the whole implication vacuously true.

#### Logical Equivalence
Two statements are logically equivalent if they always have the same truth value. Key equivalences: De Morgan's Laws: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q and ¬(P ∨ Q) ≡ ¬P ∧ ¬Q. The contrapositive P → Q ≡ ¬Q → ¬P. The converse Q → P is NOT equivalent to P → Q.

#### Review Questions
1. Build the truth table for (P → Q) ∧ (Q → P).
2. State the contrapositive and converse of "If a number is divisible by 4, then it is divisible by 2."
3. Is ¬(P → Q) ≡ P ∧ ¬Q? Verify with a truth table.

---

### Applying Proof Techniques: Worked Examples
**Type:** Application
**Slug:** applying-proof-techniques
**Estimated time:** 15 min
**Key concepts:** divisibility · parity · rationality
**Summary:** Practice selecting and executing the right proof strategy for classic number-theory and algebra propositions.

#### Worked Example 1: Divisibility
**Claim:** If a | b and a | c, then a | (b + c).
**Proof:** Since a | b, there exists integer k with b = ak. Since a | c, there exists integer m with c = am. Then b + c = ak + am = a(k + m). Since k + m is an integer, a | (b + c). □

Full solution highlights: the proof is entirely definitional — translate divisibility into multiplication, factor, recognize the form.

#### Worked Example 2: Irrationality
**Claim:** √3 is irrational.
**Proof:** Suppose √3 = p/q in lowest terms, so 3 = p²/q², giving p² = 3q². Then 3 | p², and since 3 is prime, 3 | p. Write p = 3k: 9k² = 3q², so q² = 3k², meaning 3 | q. But then 3 | gcd(p, q), contradicting lowest-terms assumption. □

#### Worked Example 3: Induction on Inequality
**Claim:** 2ⁿ > n² for all n ≥ 5.
**Base case:** 2⁵ = 32 > 25 = 5². ✓
**Inductive step:** Assume 2ᵏ > k² for some k ≥ 5. Then 2ᵏ⁺¹ = 2·2ᵏ > 2k². Need to show 2k² ≥ (k+1)² = k² + 2k + 1, i.e., k² ≥ 2k + 1, i.e., k² - 2k - 1 ≥ 0. For k ≥ 5: k² - 2k - 1 ≥ 25 - 10 - 1 = 14 > 0. ✓

#### Review Questions
1. Prove: the product of any two odd integers is odd.
2. Prove by contradiction: there is no largest prime.
3. Prove by induction: 3ⁿ ≥ 1 + 2n for all n ≥ 0.

---

### Logic in Science Bowl: Speed Recognition
**Type:** Mixed/Review
**Slug:** logic-science-bowl-review
**Estimated time:** 8 min
**Key concepts:** contrapositive · negation · equivalence
**Summary:** Bowl math questions test logical equivalences and negation — build instant recall for the patterns that appear most often.

#### High-Frequency Patterns
Science Bowl logic questions fall into categories: (1) Identify the contrapositive. (2) Negate a quantified statement (¬∀x P(x) ≡ ∃x ¬P(x)). (3) Identify logical equivalences. (4) Spot a flawed inference (affirming the consequent: P → Q, Q true, therefore P — invalid).

Flash recognition:
- Converse of (P → Q): Q → P (NOT equivalent)
- Inverse of (P → Q): ¬P → ¬Q (NOT equivalent)
- Contrapositive: ¬Q → ¬P (equivalent)
- Negation of P → Q: P ∧ ¬Q

#### Quick-Fire Practice
Q: The negation of "All triangles have three sides" is — A: "There exists a triangle that does not have three sides."
Q: The contrapositive of "If x > 0, then x² > 0" is — A: "If x² ≤ 0, then x ≤ 0."
Q: Which is logically equivalent to P → Q? (a) Q → P (b) ¬Q → ¬P (c) ¬P → ¬Q — A: (b).

#### Review Questions
1. State the contrapositive of "If a polygon is a square, then it has four equal sides."
2. Negate: "There exists a real number x such that x² = −1."
3. Which inference rule is this: P → Q; P is true; therefore Q is true?

---

### Proof Techniques Mixed Review
**Type:** Mixed/Review
**Slug:** proof-techniques-mixed-review
**Estimated time:** 10 min
**Key concepts:** direct proof · induction · contradiction
**Summary:** Synthesize all proof strategies with a set of short exercises calibrated to Science Bowl pacing.

#### Strategy Selection Guide
Given a claim, choose: (1) **Direct proof** when the hypothesis leads cleanly to the conclusion through definitions. (2) **Contrapositive** when the conclusion negated gives a cleaner hypothesis to work with. (3) **Contradiction** when negating the conclusion leads to an obvious impossibility. (4) **Induction** when the claim involves all natural numbers or a recursive structure.

#### Mixed Exercises
1. Prove: if n³ is odd, then n is odd. *(Use contrapositive: if n is even, n³ is even.)*
2. Prove: for all n ≥ 1, 5 | (n⁵ − n). *(Induction or direct via Fermat's little theorem.)*
3. Prove: log₂(3) is irrational. *(Contradiction: if log₂(3) = p/q, then 2^p = 3^q; left is even, right is odd — contradiction.)*
4. Prove: 1·1! + 2·2! + … + n·n! = (n+1)! − 1. *(Induction.)*

#### Bowl Timing Tip
For a 10-point toss-up about what proof technique to use: read the claim structure. "For all n ≥ 1" → induction. "If P then Q, prove Q → P" → that's asking for the converse, not proof. "Suppose not..." → contradiction setup.

#### Review Questions
1. Which proof technique is best for showing "if n² is divisible by 3, then n is divisible by 3"?
2. Prove by induction: the sum of the first n odd numbers equals n².
3. Why does proof by contradiction of "√2 is irrational" begin with "suppose √2 = p/q in lowest terms"?

---

### Competition Extension: Proof Elegance and Bowl Traps
**Type:** Competition Extension
**Slug:** proof-elegance-bowl-traps
**Estimated time:** 7 min
**Key concepts:** elegant proof · common errors · bowl toss-up
**Summary:** Bowl questions on logic and proof test vocabulary precision — know the traps that eliminate teams.

#### Bowl Toss-Up Stems
"For 10 points, what proof technique begins by assuming the negation of what you want to prove?" → **Proof by contradiction** (not contrapositive — contrapositive doesn't assume negation; it proves a different equivalent statement).

"For 10 points, name the logical fallacy where P → Q and Q is true are used to conclude P." → **Affirming the consequent.**

"For 10 points, the statement 'there exists an x such that P(x)' is the negation of what statement?" → **For all x, not P(x)** (¬∀x P(x)).

#### Common Trap: Induction Errors
Teams lose points for: forgetting the base case, writing "assume the statement is true for all k ≤ n" when you only need k, and not verifying the inductive step closes correctly (showing P(k) → P(k+1), not just assuming it).

#### Review Questions
1. What is the name for a small theorem used as a stepping stone in a larger proof?
2. State De Morgan's law for negating (P ∨ Q).
3. Is the statement "All unicorns have wings" true or false in classical logic? Explain.

---

### Competition Extension: AMC/AIME Proof-Style Problems
**Type:** Competition Extension
**Slug:** amc-aime-proof-style-problems
**Estimated time:** 8 min
**Key concepts:** modular arithmetic · parity argument · pigeonhole
**Summary:** Competition-style proofs at AMC/AIME level use parity, pigeonhole, and modular arithmetic as elegant shortcuts.

#### Parity Arguments
Parity (even/odd) is a powerful one-bit invariant. Example: In any set of 5 integers, are there two with the same parity? By pigeonhole (2 parities, 5 integers), yes. AIME tip: if a sum must be a specific parity, check if the terms can produce it.

#### Pigeonhole Principle
If n+1 objects are placed into n boxes, some box contains at least 2. Applications: among 13 people, two share a birth month; among any 5 integers, two have the same remainder mod 4.

#### Sample AIME-Style Problem
*Among any 5 points chosen inside a unit square, show some two are within distance √2/2 of each other.* Divide the unit square into 4 subsquares of side 1/2. By pigeonhole, two of the 5 points lie in the same subsquare. The maximum distance within a subsquare of side 1/2 is the diagonal: √((1/2)² + (1/2)²) = √(1/2) = √2/2. ✓

#### Review Questions
1. Use pigeonhole to show: among any 10 integers, two have the same ones digit.
2. Prove that in any sequence of n² + 1 distinct real numbers, there is either an increasing or decreasing subsequence of length n + 1. (Erdős–Szekeres theorem.)
3. A bowl question asks which principle guarantees two of 367 people share a birthday — name it.

---

## Subtopic: Sets, Functions & Mathematical Notation

### Set Theory Fundamentals
**Type:** Core Understanding
**Slug:** set-theory-fundamentals
**Estimated time:** 12 min
**Key concepts:** set · subset · union · intersection · complement
**Summary:** A set is an unordered collection of distinct objects; set operations build new sets from existing ones.

#### Basic Definitions
A set is defined by its elements. Notation: A = {1, 2, 3} or A = {x | x is a positive integer less than 4}. The empty set ∅ contains nothing. |A| denotes the cardinality (number of elements). x ∈ A means x is in A; x ∉ A means it is not. A ⊆ B (A is a subset of B) means every element of A is in B. A = B iff A ⊆ B and B ⊆ A.

#### Operations
Union: A ∪ B = {x | x ∈ A or x ∈ B}. Intersection: A ∩ B = {x | x ∈ A and x ∈ B}. Complement: Aᶜ = {x ∈ U | x ∉ A}. Difference: A \ B = {x ∈ A | x ∉ B}. Symmetric difference: A △ B = (A ∪ B) \ (A ∩ B). The power set P(A) is the set of all subsets; |P(A)| = 2^|A|.

#### Inclusion-Exclusion
|A ∪ B| = |A| + |B| − |A ∩ B|. For three sets: |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|. This is the inclusion-exclusion principle, critical in counting problems.

#### Review Questions
1. If |A| = 10, |B| = 15, and |A ∩ B| = 4, find |A ∪ B|.
2. How many subsets does a set with 5 elements have?
3. Is A ⊆ A always true? Is ∅ ⊆ A always true?

---

### Function Fundamentals: Domain, Codomain, Range
**Type:** Core Understanding
**Slug:** function-domain-codomain-range
**Estimated time:** 12 min
**Key concepts:** function · domain · codomain · range · injection · surjection · bijection
**Summary:** A function assigns exactly one output to each input; injections, surjections, and bijections describe how completely and how faithfully this assignment works.

#### Definition
A function f: A → B assigns to each element of the domain A exactly one element of the codomain B. The range (or image) is {f(x) | x ∈ A} ⊆ B. Two functions are equal iff they have the same domain, codomain, and rule. A relation that assigns more than one output to some input is NOT a function (fails the vertical-line test for graphs).

#### Injection, Surjection, Bijection
**Injection (one-to-one):** f(x₁) = f(x₂) implies x₁ = x₂ — distinct inputs give distinct outputs. **Surjection (onto):** for every b ∈ B, there exists a ∈ A with f(a) = b — every codomain element is hit. **Bijection:** both injective and surjective — establishes a perfect pairing. Bijections between finite sets require |A| = |B|. A function has an inverse iff it is a bijection.

#### Review Questions
1. Is f: ℝ → ℝ given by f(x) = x² injective? Surjective?
2. Give an example of a bijection from {1, 2, 3} to {a, b, c}.
3. What is the range of f(x) = sin(x) as a function from ℝ to ℝ?

---

### Notation and Mathematical Language
**Type:** Core Understanding
**Slug:** notation-mathematical-language
**Estimated time:** 10 min
**Key concepts:** quantifiers · summation · product · floor · ceiling
**Summary:** Mastering standard notation lets you read and write mathematics precisely and parse bowl questions without ambiguity.

#### Quantifiers
∀ means "for all"; ∃ means "there exists"; ∃! means "there exists exactly one." Example: ∀ε > 0, ∃δ > 0 such that |x − a| < δ implies |f(x) − L| < ε (the ε-δ definition of limit). Order matters: ∀x ∃y (y > x) is different from ∃y ∀x (y > x) — the first is true for ℝ, the second is false.

#### Summation and Product Notation
Σᵢ₌₁ⁿ i = n(n+1)/2. Πᵢ₌₁ⁿ i = n! (n factorial). Changing index: Σᵢ₌₀ⁿ⁻¹ f(i) = Σⱼ₌₁ⁿ f(j−1). The floor function ⌊x⌋ = greatest integer ≤ x; ceiling ⌈x⌉ = smallest integer ≥ x. |x| = absolute value. These appear constantly in combinatorics and number theory.

#### Review Questions
1. Evaluate Σᵢ₌₁⁵ (2i − 1).
2. What does ∃x ∈ ℤ, x² = 2 assert? Is it true?
3. Compute ⌊3.7⌋, ⌈−2.1⌉, and |−5|.

---

### Set Theory in Counting Problems
**Type:** Application
**Slug:** set-theory-counting-problems
**Estimated time:** 14 min
**Key concepts:** inclusion-exclusion · Venn diagram · complement counting
**Summary:** Inclusion-exclusion and complement counting are the go-to strategies for bowl-style counting questions involving overlapping conditions.

#### Worked Example 1: Three-Set Inclusion-Exclusion
In a class of 100 students: 60 take math (M), 45 take science (S), 30 take history (H). 25 take M ∩ S, 20 take M ∩ H, 15 take S ∩ H, and 10 take all three. How many take at least one?
|M ∪ S ∪ H| = 60 + 45 + 30 − 25 − 20 − 15 + 10 = 85.

#### Worked Example 2: Complement Counting
How many integers from 1 to 100 are divisible by 2 or 3?
|div by 2| = 50, |div by 3| = 33, |div by 6| = 16.
|div by 2 or 3| = 50 + 33 − 16 = 67.
Complement: 100 − 67 = 33 integers are divisible by neither 2 nor 3.

#### Worked Example 3: Functions and Counting
How many functions are there from {1, 2, 3} to {a, b, c}?
Each of the 3 inputs has 3 choices independently → 3³ = 27 total functions.
How many are injections? 3 × 2 × 1 = 6 (assign distinct outputs: 3 choices for f(1), 2 for f(2), 1 for f(3)).

#### Review Questions
1. Among integers 1–200, how many are divisible by 3 or 5?
2. A survey finds 70% like apples, 60% like bananas, 40% like both. What percent like neither?
3. How many surjections are there from a 4-element set to a 2-element set?

---

### Set and Function Notation Review
**Type:** Mixed/Review
**Slug:** set-function-notation-review
**Estimated time:** 8 min
**Key concepts:** function composition · inverse · set operations
**Summary:** Quick synthesis of set and function concepts with bowl-paced exercises.

#### Flash Cards
- |P(A)| = 2^|A|
- f is bijective ↔ f has a two-sided inverse
- (f ∘ g)(x) = f(g(x)); domain requires g(x) to be in domain of f
- A ∩ Aᶜ = ∅; A ∪ Aᶜ = U; (Aᶜ)ᶜ = A
- (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ (De Morgan); (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ

#### Practice Problems
1. If f(x) = 2x + 1 and g(x) = x², find (f ∘ g)(3) and (g ∘ f)(3).
2. A = {1, 2, 3, 4}, B = {3, 4, 5, 6}. Find A △ B.
3. A function f: A → B is injective and |A| = 5. What can you say about |B|?

#### Review Questions
1. True or false: every bijection is a surjection.
2. If f: ℝ → ℝ by f(x) = eˣ, what is the range? Is f surjective onto ℝ?
3. For sets A and B, simplify (A \ B) ∪ (A ∩ B).

---

### Sets, Functions & Bowl Vocabulary
**Type:** Mixed/Review
**Slug:** sets-functions-bowl-vocabulary
**Estimated time:** 9 min
**Key concepts:** cardinality · Cartesian product · relation
**Summary:** Bowl questions often test precise vocabulary — these are the definitions that most often distinguish correct from incorrect answers.

#### Cartesian Product
A × B = {(a, b) | a ∈ A, b ∈ B}. |A × B| = |A| · |B|. A relation from A to B is any subset of A × B. A function is a relation where every element of A appears as a first coordinate exactly once.

#### Cardinality and Infinite Sets
Finite sets: |A| = number of elements. For infinite sets, two sets have the same cardinality iff there exists a bijection between them. ℕ, ℤ, ℚ all have cardinality ℵ₀ (countable). ℝ has cardinality 2^ℵ₀ (uncountable). These distinctions are tested in competition math contexts.

#### Bowl Quick-Hits
- "One-to-one correspondence" = bijection
- "Onto" = surjection
- "Proper subset": A ⊊ B means A ⊆ B and A ≠ B
- The image of a function = its range

#### Review Questions
1. |A| = 3, |B| = 4. How many elements in A × B?
2. Is the relation "x divides y" on ℤ⁺ a function?
3. Give an example of an injection from ℕ to ℤ.

---

### Competition Extension: Cardinality and Cantor
**Type:** Competition Extension
**Slug:** cardinality-cantor-competition
**Estimated time:** 7 min
**Key concepts:** countable · uncountable · Cantor diagonalization
**Summary:** Cantor's diagonalization is a classic proof by contradiction showing ℝ is strictly larger than ℕ — a favorite for competition exposition questions.

#### Cantor's Diagonal Argument
Suppose ℝ between 0 and 1 is countable: list as r₁, r₂, r₃, … Write each in decimal. Construct x where the nth digit of x differs from the nth digit of rₙ. Then x ≠ rₙ for all n — x is not on the list. Contradiction: ℝ is uncountable.

#### Bowl Applications
"For 10 points, Georg Cantor proved this set is uncountable by his diagonal argument." → **The real numbers** (or (0,1)).
"For 10 points, this concept describes two sets having a bijection between them." → **Same cardinality** (or equinumerous).

#### Review Questions
1. Is the set of all even integers countable? Justify briefly.
2. Name the mathematician whose diagonal argument proved ℝ is uncountable.
3. What is ℵ₀?

---

## Subtopic: Number Systems (Natural, Integer, Rational, Real & Complex)

### The Number Line: From ℕ to ℝ
**Type:** Core Understanding
**Slug:** number-line-natural-to-real
**Estimated time:** 12 min
**Key concepts:** natural numbers · integers · rationals · irrationals · reals
**Summary:** The real number system is built in stages, each extending the previous to fill in missing solutions.

#### The Extension Chain
ℕ = {1, 2, 3, …} (or {0, 1, 2, …} depending on convention). ℤ = {…, −2, −1, 0, 1, 2, …} — extends ℕ to allow subtraction. ℚ = {p/q | p, q ∈ ℤ, q ≠ 0} — extends ℤ to allow division. ℝ = ℚ ∪ irrationals — fills the "gaps" (like √2, π, e) via the completeness property (every Cauchy sequence converges). Each extension preserves the arithmetic of the previous system while enabling new operations.

#### Density and Completeness
Between any two rationals there is another rational (ℚ is dense in ℝ). Yet ℚ has "holes" — e.g., √2 ∈ ℝ \ ℚ. The real numbers are complete: every bounded, increasing sequence has a limit in ℝ. This completeness is what makes calculus work.

#### Review Questions
1. Is 0.333… = 1/3 rational? Justify.
2. Prove √2 is not rational (use contradiction).
3. Give an example of an irrational number that is not a square root.

---

### Complex Numbers: Algebra and Geometry
**Type:** Core Understanding
**Slug:** complex-numbers-algebra-geometry
**Estimated time:** 14 min
**Key concepts:** imaginary unit · modulus · argument · polar form
**Summary:** Complex numbers extend ℝ to solve all polynomial equations; their geometry lives in the plane.

#### Definitions and Algebra
i = √(−1), so i² = −1, i³ = −i, i⁴ = 1 (period 4). A complex number z = a + bi has real part Re(z) = a and imaginary part Im(z) = b. Addition: (a + bi) + (c + di) = (a+c) + (b+d)i. Multiplication: (a + bi)(c + di) = (ac − bd) + (ad + bc)i. The conjugate z̄ = a − bi. |z|² = zz̄ = a² + b² (modulus squared).

#### Polar Form and Euler's Formula
Every z ≠ 0 can be written as z = r(cos θ + i sin θ) = re^{iθ}, where r = |z| and θ = arg(z). Euler's formula: e^{iθ} = cos θ + i sin θ. Special case: e^{iπ} + 1 = 0 (Euler's identity). Multiplication in polar form: r₁e^{iθ₁} · r₂e^{iθ₂} = r₁r₂e^{i(θ₁+θ₂)} — multiply moduli, add arguments.

#### Review Questions
1. Compute (2 + 3i)(1 − i) and express in a + bi form.
2. Find |3 + 4i| and the argument of i.
3. Use Euler's formula to derive cos 2θ in terms of cos θ and sin θ.

---

### De Moivre's Theorem and Roots of Unity
**Type:** Core Understanding
**Slug:** de-moivre-roots-of-unity
**Estimated time:** 13 min
**Key concepts:** De Moivre's theorem · nth roots of unity · regular polygons
**Summary:** De Moivre's theorem powers up complex-number exponentiation and reveals that nth roots of unity form perfect polygons in the complex plane.

#### De Moivre's Theorem
(cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ) for all integers n. Applications: compute high powers of complex numbers quickly; derive multiple-angle formulas. Example: (cos 30° + i sin 30°)⁴ = cos 120° + i sin 120° = −1/2 + i√3/2.

#### nth Roots of Unity
The equation zⁿ = 1 has exactly n solutions: ωₖ = e^{2πik/n} for k = 0, 1, …, n−1. These are the nth roots of unity, evenly spaced on the unit circle. For n = 4: 1, i, −1, −i. Their sum is always 0 (for n ≥ 2). They form a regular n-gon. The primitive nth root of unity is ω = e^{2πi/n}.

#### Review Questions
1. Use De Moivre's to compute (1 + i)^8.
2. List all cube roots of unity in rectangular form.
3. Prove that the sum of all nth roots of unity equals 0 for n ≥ 2.

---

### Complex Numbers in Competition Problems
**Type:** Application
**Slug:** complex-numbers-competition-problems
**Estimated time:** 15 min
**Key concepts:** conjugate roots · polynomial roots · modulus inequalities
**Summary:** Complex numbers appear in polynomial root problems, triangle inequalities in the plane, and spiral symmetry arguments.

#### Worked Example 1: Polynomial Roots
By the Conjugate Root Theorem, if a polynomial with real coefficients has root z = a + bi (b ≠ 0), then z̄ = a − bi is also a root. Find a degree-4 polynomial with roots 2 + i and 3 − 2i.
Also has roots 2 − i and 3 + 2i. Factors: [(x − (2+i))(x − (2−i))] = x² − 4x + 5 and [(x − (3+2i))(x − (3−2i))] = x² − 6x + 13. Product: (x² − 4x + 5)(x² − 6x + 13).

#### Worked Example 2: Triangle Inequality
|z₁ + z₂| ≤ |z₁| + |z₂| (triangle inequality). Find the maximum of |z + 1/z| when |z| = 2.
|z + 1/z| ≤ |z| + |1/z| = 2 + 1/2 = 5/2. Maximum 5/2 achieved when z = 2 and 1/z = 1/2 (same argument).

#### Worked Example 3: Roots of Unity Filter
Find Σ_{k=0}^{n-1} ωᵏ for ω = e^{2πi/n}. This is a geometric series: (ωⁿ − 1)/(ω − 1) = 0 since ωⁿ = 1 and ω ≠ 1. Roots of unity filter technique: extract every mth coefficient of a polynomial using sum over mth roots of unity.

#### Review Questions
1. If 1 − 2i is a root of a polynomial with real coefficients, name another root.
2. Compute |(2 + 3i)/(1 − i)|.
3. For |z| = 1, what are all possible values of |z + 1|?

---

### Number Systems Mixed Review
**Type:** Mixed/Review
**Slug:** number-systems-mixed-review
**Estimated time:** 9 min
**Key concepts:** real number properties · complex arithmetic · classification
**Summary:** Flash review of number system properties, classification questions, and complex arithmetic at bowl speed.

#### Classification Flash Quiz
- Is 0.101001000100001… rational? → No (non-repeating, non-terminating)
- Is π algebraic? → No (transcendental)
- Is e^{iπ} real? → Yes, e^{iπ} = −1
- Is √(−4) a real number? → No, it equals 2i
- Every rational number is also: integer? → Not necessarily. Real? → Yes.

#### Complex Arithmetic Drills
(3 + 4i)/(1 + 2i): multiply by conjugate → (3 + 4i)(1 − 2i)/|1 + 2i|² = (3 + 8 + (4 − 6)i)/5 = (11 − 2i)/5.
(cos 45° + i sin 45°)⁸ = cos 360° + i sin 360° = 1.
|2 − 2i| = √(4 + 4) = 2√2.

#### Review Questions
1. Simplify i²⁵.
2. Find the real and imaginary parts of (1 + i)^4.
3. Which of ℕ, ℤ, ℚ, ℝ, ℂ is the smallest set containing the solution to x² + 1 = 0?

---

### Number Systems Bowl Competition
**Type:** Mixed/Review
**Slug:** number-systems-bowl-competition
**Estimated time:** 8 min
**Key concepts:** Gaussian integers · field properties · completeness
**Summary:** Review the exact vocabulary and theorems that appear in bowl exposition and computation questions about number systems.

#### Bowl Vocabulary
- **Field:** set with + and × satisfying commutativity, associativity, distributivity, identities, and inverses for all nonzero elements. ℚ, ℝ, and ℂ are fields; ℤ is NOT (no multiplicative inverse for 2 in ℤ).
- **Gaussian integers:** ℤ[i] = {a + bi | a, b ∈ ℤ} — a ring, not a field.
- **Algebraic number:** root of a polynomial with integer coefficients. √2 is algebraic; π and e are transcendental.
- **Completeness:** every Cauchy sequence in ℝ converges in ℝ; ℚ is NOT complete.

#### Bowl Toss-Up Stems
"For 10 points, this mathematician proved π is transcendental." → **Lindemann** (1882).
"For 10 points, identify the number system that is a field but not algebraically closed." → **The real numbers ℝ** (ℂ is algebraically closed; ℝ is not, since x² + 1 = 0 has no real solution).

#### Review Questions
1. Is ℤ a field? Why or why not?
2. Name one transcendental number.
3. What is the Fundamental Theorem of Algebra's claim about ℂ?

---

### Competition Extension: Gaussian Integers and Algebraic Numbers
**Type:** Competition Extension
**Slug:** gaussian-integers-algebraic-numbers
**Estimated time:** 8 min
**Key concepts:** Gaussian primes · algebraic extension · Fundamental Theorem of Algebra
**Summary:** Gaussian integers and algebraic numbers bridge number theory and complex analysis — a favorite topic in Science Bowl energy/math cross-over questions.

#### Gaussian Primes
An ordinary prime p is either a Gaussian prime or splits into two Gaussian primes. p splits in ℤ[i] iff p ≡ 1 (mod 4) (e.g., 5 = (2+i)(2−i)). p remains prime in ℤ[i] iff p ≡ 3 (mod 4) (e.g., 3 is still Gaussian prime). p = 2 = −i(1+i)² (ramified). This is a consequence of Fermat's theorem on sums of two squares.

#### Fundamental Theorem of Algebra
Every non-constant polynomial with complex coefficients has at least one root in ℂ. Equivalently, every degree-n polynomial over ℂ has exactly n roots (counting multiplicity). The reals fail this: x² + 1 = 0 has no real root.

#### Bowl Stem
"For 10 points, this theorem states every polynomial over the complex numbers has a root." → **The Fundamental Theorem of Algebra.**

#### Review Questions
1. Is 5 a Gaussian prime? If not, factor it.
2. How many roots does x⁵ − 1 = 0 have in ℂ?
3. Name the theorem guaranteeing any degree-n polynomial over ℂ splits into n linear factors.

---

## Subtopic: Mathematical Modeling & Problem-Solving Strategies

### Building Mathematical Models
**Type:** Core Understanding
**Slug:** building-mathematical-models
**Estimated time:** 13 min
**Key concepts:** variables · assumptions · validation · sensitivity
**Summary:** Mathematical modeling translates a real-world problem into mathematical language, solves it, then interprets the answer back in context.

#### The Modeling Cycle
(1) **Identify** variables and parameters. (2) **Formulate** relationships (equations, inequalities, functions). (3) **Solve** the mathematical system. (4) **Interpret** the solution in real-world terms. (5) **Validate** against data or common sense. (6) **Refine** if needed. A model is always a simplification — the art is choosing which details to include.

#### Linear vs. Nonlinear Models
Linear models: y = mx + b. Growth proportional to quantity → exponential: y = y₀eᵏᵗ. Proportional to remaining capacity → logistic: dy/dt = ry(1 − y/K). Oscillatory → sinusoidal. Choosing the right family of functions is the first modeling decision.

#### Review Questions
1. A population doubles every 3 hours. Write an exponential model P(t) where P(0) = 100.
2. What does the carrying capacity K represent in a logistic model?
3. Name two real-world quantities that grow approximately linearly.

---

### Problem-Solving Heuristics
**Type:** Core Understanding
**Slug:** problem-solving-heuristics
**Estimated time:** 11 min
**Key concepts:** Polya's method · pattern recognition · working backwards
**Summary:** Polya's four-step framework gives a systematic approach to problems when the path forward isn't obvious.

#### Polya's Four Steps
(1) **Understand the problem** — what is given? What is asked? Can you draw a diagram? (2) **Devise a plan** — have you seen a similar problem? Can you use a formula, pattern, or auxiliary construction? (3) **Carry out the plan** — execute carefully, check each step. (4) **Look back** — does the answer make sense? Can you verify it? Is there a simpler solution?

#### Key Heuristics
- **Work backwards:** know the answer's form, derive constraints.
- **Simplify:** solve a smaller case first (n = 1, 2, 3) to spot the pattern.
- **Draw a diagram:** for geometry, coordinate geometry, or combinatorics.
- **Change representation:** convert between algebra, geometry, and number theory.
- **Use symmetry:** symmetric situations often admit symmetric solutions.

#### Review Questions
1. What is Polya's first step when approaching a new problem?
2. You want to count paths in a grid. Which heuristic do you try first?
3. A sum formula works for n = 1, 2, 3. What do you do next?

---

### Modeling Application: Optimization
**Type:** Application
**Slug:** modeling-optimization-application
**Estimated time:** 15 min
**Key concepts:** objective function · constraint · critical point · boundary analysis
**Summary:** Optimization finds the best value of an objective function subject to constraints — appearing everywhere from calculus to discrete competition problems.

#### Worked Example 1: Calculus Optimization
A farmer has 200 m of fencing to enclose a rectangular area against a wall (one side free). Maximize the area.
Let width = x, length = y. Constraint: 2x + y = 200, so y = 200 − 2x. Area A = xy = x(200 − 2x) = 200x − 2x². dA/dx = 200 − 4x = 0 → x = 50. y = 100. A_max = 50 × 100 = 5000 m². Second derivative: −4 < 0, confirms maximum.

#### Worked Example 2: AMC-Style Optimization (No Calculus)
Find the maximum value of 3x + 4y subject to x² + y² ≤ 25.
The max of a linear function on a circle occurs on the boundary. By Cauchy-Schwarz: (3x + 4y)² ≤ (3² + 4²)(x² + y²) = 25 × 25 = 625. So 3x + 4y ≤ 25. Equality when x/3 = y/4, x² + y² = 25 → (x, y) = (15/5, 20/5) = (3, 4). Maximum is 25.

#### Review Questions
1. Use calculus to find the dimensions of the open-top box of maximum volume from a 12×12 cm square (cutting corners of size x).
2. Apply AM-GM to show that for positive x, y with x + y = 10, the maximum of xy is 25.
3. In an AMC problem, why does the maximum of a linear objective on a convex polygon occur at a vertex?

---

### Problem-Solving Mixed Review
**Type:** Mixed/Review
**Slug:** problem-solving-mixed-review
**Estimated time:** 9 min
**Key concepts:** multiple strategies · cross-topic synthesis · bowl pacing
**Summary:** Practice selecting and executing the best strategy under timed conditions across number theory, algebra, and geometry.

#### Strategy Selection by Problem Type
- Sum of series → look for telescoping, geometric series formula, or induction
- Divisibility claim → parity, modular arithmetic, or unique factorization
- Maximum/minimum → AM-GM, Cauchy-Schwarz, or calculus (if continuous)
- Count arrangements → multiplication principle, permutations/combinations, or inclusion-exclusion
- Geometric result → coordinate proof, synthetic geometry, or complex numbers

#### Rapid-Fire Problems
1. Find the sum 1/1·2 + 1/2·3 + … + 1/99·100. *(Telescoping: 1 − 1/100 = 99/100.)*
2. For how many integers n is n² < 100? *(n from −9 to 9 = 19 values.)*
3. The AM-GM inequality states a + b ≥ 2√(ab). Use it to minimize x + 4/x for x > 0. *(Min at x = 2, value 4.)*

#### Review Questions
1. Find all n such that n² − 7n + 12 = 0 by factoring.
2. A 3×3 grid has how many rectangles (including squares)?
3. What strategy most naturally solves: "Find the number of ways to write 10 as an ordered sum of positive integers."

---

### Mathematical Modeling Bowl Competition
**Type:** Mixed/Review
**Slug:** mathematical-modeling-bowl-competition
**Estimated time:** 8 min
**Key concepts:** dimensional analysis · scaling · estimation
**Summary:** Bowl questions on modeling test dimensional analysis, proportional reasoning, and Fermi estimation.

#### Dimensional Analysis Drill
Every equation must be dimensionally consistent. Speed = Distance / Time → [m/s] = [m] / [s]. Energy = (1/2)mv² → [kg·m²/s²] = [J]. Check: if a formula gives units of kg/s for a power, something is wrong.

#### Scaling Arguments
If you double the radius of a sphere, volume increases by factor 8 (scales as r³). Area of a circle scales as r²; circumference as r¹. In physics and engineering models, understanding scaling exponents is more important than precise coefficients.

#### Fermi Estimation
Estimate the number of piano tuners in Chicago. Population ~3M, ~2 people per household = 1.5M households; ~1/20 own a piano = 75,000 pianos; each needs tuning once a year; a tuner does ~4 pianos/day × 250 days = 1000 pianos/year; so ~75 tuners. (Actual: ~50–100.) Bowl may ask: what ORDER OF MAGNITUDE?

#### Review Questions
1. A force F = ma. If m doubles and a triples, by what factor does F change?
2. A cylinder's volume scales with radius squared and height. If radius doubles and height halves, what happens to volume?
3. Estimate the number of golf balls in a school bus. Show your reasoning in ≤ 3 steps.

---

### Competition Extension: Olympiad Problem-Solving
**Type:** Competition Extension
**Slug:** olympiad-problem-solving-strategies
**Estimated time:** 8 min
**Key concepts:** invariants · extremal principle · coloring arguments
**Summary:** Olympiad-level strategies — invariants, extremal principle, coloring — provide elegant solutions to competition problems that brute force cannot crack.

#### Invariants
Find a quantity that doesn't change under the allowed operations. Example: start with 1, 5, and 9 on a board; you can replace two numbers a, b with a+b and a−b. Prove you can never reach 1, 2, 3. Invariant: the sum a + b + c. Under the operation, new sum = (a+b) + (a−b) + c = 2a + c. Sum changes! Try parity: all three numbers start odd; the operation replaces two odds with an even and an even — changes parity. The target 1, 2, 3 has two odd numbers — different parity configuration. Impossible.

#### Extremal Principle
Consider the extreme case (maximum or minimum). Proof that any polygon can be triangulated: take the vertex with the smallest x-coordinate — it must be connected to the rest by a diagonal inside the polygon.

#### Coloring Arguments
Color a chessboard in two colors. Placing a domino always covers one black and one white square. If two opposite corners are removed from a chessboard, can you tile the rest? No: removed squares are the same color, leaving 32 of one color and 30 of the other — unequal, so no tiling exists.

#### Review Questions
1. What is an invariant in a mathematical game or process?
2. Describe the extremal principle in one sentence.
3. A 2×n chessboard tiling with dominoes: use a coloring argument to show it's always possible.

---

### Competition Extension: Speed Computation for Bowl Math
**Type:** Competition Extension
**Slug:** speed-computation-bowl-math
**Estimated time:** 7 min
**Key concepts:** mental arithmetic · shortcuts · pattern recognition
**Summary:** Science Bowl math rewards the team that computes correct answers fastest — these techniques cut computation time by 50–80%.

#### Key Speed Techniques
- **Casting out 9s:** check arithmetic by replacing each number with its digit sum mod 9.
- **Multiplying near round numbers:** 97 × 103 = (100−3)(100+3) = 10000 − 9 = 9991.
- **Sum of AP:** n/2 × (first + last). For 1 + 2 + … + 100: 50 × 101 = 5050.
- **Powers of 2:** memorize 2¹ through 2¹⁰ (1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024).
- **Fraction shortcuts:** 1/7 = 0.142857 repeating; 1/9 = 0.111…; 1/11 = 0.0909…

#### Bowl Math Toss-Up Patterns
"For 10 points, evaluate Σᵢ₌₁¹⁰⁰ i." → 5050.
"For 10 points, find the last digit of 7²⁰²⁶." → Last digits of 7ⁿ cycle: 7, 9, 3, 1 (period 4). 2026 mod 4 = 2, so last digit is 9.
"For 10 points, how many zeros end 100!?" → floor(100/5) + floor(100/25) = 20 + 4 = 24.

#### Review Questions
1. Without a calculator: 98 × 102.
2. Find the units digit of 3^100.
3. How many trailing zeros does 50! have?
