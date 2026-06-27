# HS Math — Discrete Mathematics
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Number Theory (Divisibility, Primes & Modular Arithmetic)

### Divisibility and Prime Numbers
**Type:** Core Understanding
**Slug:** divisibility-primes
**Estimated time:** 15 min
**Key concepts:** divisors · prime factorization · divisibility rules
**Summary:** Divisibility is the foundation of number theory; primes are the atoms of multiplication.

#### Divisibility Definition and Properties
If a divides b (written a | b), then b = ka for some integer k. Examples: 3 | 12 because 12 = 4·3. Zero divides only itself (0 | 0), and every number divides 0 (since 0 = 0·n for any n). Divisibility is transitive: if a | b and b | c, then a | c. It's also preserved under linear combinations: if a | b and a | c, then a | (mb + nc) for any integers m, n.

#### Prime and Composite Numbers
A prime p is an integer greater than 1 with exactly two positive divisors: 1 and p. The first ten primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. A composite number has more than two divisors; 1 is neither prime nor composite by convention. The Fundamental Theorem of Arithmetic: every integer n > 1 can be uniquely expressed as a product of primes: n = p₁^a₁ · p₂^a₂ · ... · pₖ^aₖ. Example: 60 = 2² · 3 · 5. This factorization is unique (up to order).

#### Divisibility Rules
A number is divisible by 2 if its last digit is even. By 3 if the sum of its digits is divisible by 3. By 5 if its last digit is 0 or 5. By 4 if the last two digits form a number divisible by 4. By 9 if the sum of its digits is divisible by 9. By 11 if the alternating sum of digits is divisible by 11. Example: is 3641 divisible by 11? Alternating sum: 3 − 6 + 4 − 1 = 0, which is divisible by 11, so yes. These rules speed up factorization and are useful in competition contexts.

#### GCD and LCM
The greatest common divisor (GCD) of a and b is the largest integer dividing both. The least common multiple (LCM) is the smallest positive integer divisible by both. Property: GCD(a, b) · LCM(a, b) = a · b. Example: GCD(12, 18) = 6, LCM(12, 18) = 36, and 6 · 36 = 216 = 12 · 18 ✓. The Euclidean algorithm computes GCD: GCD(a, b) = GCD(b, a mod b) until b = 0. Example: GCD(48, 18) = GCD(18, 12) = GCD(12, 6) = GCD(6, 0) = 6.

#### Review Questions
1. Find the prime factorization of 420.
2. Is 1001 prime? (Hint: check divisibility by primes up to √1001 ≈ 31.6.)
3. Find GCD(84, 126) using the Euclidean algorithm.

---

### Modular Arithmetic and Congruences
**Type:** Core Understanding
**Slug:** modular-arithmetic
**Estimated time:** 15 min
**Key concepts:** congruences · modular inverse · Fermat's Little Theorem
**Summary:** Modular arithmetic treats remainders as equivalent; it's the foundation of cryptography and number theory.

#### Congruence Definition
Two integers a and b are congruent modulo n (written a ≡ b (mod n)) if n | (a − b), i.e., a and b have the same remainder when divided by n. Example: 17 ≡ 5 (mod 12) because 17 − 5 = 12, which is divisible by 12. Congruences obey properties like equality: if a ≡ b (mod n) and c ≡ d (mod n), then a + c ≡ b + d (mod n) and ac ≡ bd (mod n). Example: 7 ≡ 2 (mod 5) and 8 ≡ 3 (mod 5), so 7 + 8 ≡ 2 + 3 (mod 5), i.e., 15 ≡ 5 (mod 5), both congruent to 0 mod 5 ✓.

#### Modular Exponentiation
Computing a^b mod n can be done efficiently using binary exponentiation rather than computing a^b and then reducing. Example: find 2^10 mod 7. Method: 2¹ ≡ 2, 2² ≡ 4, 2⁴ ≡ 2 (mod 7), 2⁸ ≡ 4 (mod 7). So 2^10 = 2⁸ · 2² ≡ 4 · 4 ≡ 2 (mod 7). The repeated squaring method is O(log b), far faster than computing 1024 multiplications.

#### Modular Inverse and Division
The modular inverse of a modulo n is a number x such that ax ≡ 1 (mod n). It exists iff GCD(a, n) = 1 (a and n are coprime). Example: find the inverse of 3 modulo 11. We seek x such that 3x ≡ 1 (mod 11). Try x = 4: 3 · 4 = 12 ≡ 1 (mod 11) ✓. So 3⁻¹ ≡ 4 (mod 11). The extended Euclidean algorithm computes inverses efficiently. Division by a modulo n is defined as multiplication by a⁻¹: c/a ≡ c · a⁻¹ (mod n).

#### Fermat's Little Theorem
If p is prime and GCD(a, p) = 1, then a^(p−1) ≡ 1 (mod p). Equivalently, a^p ≡ a (mod p) for any a. Example: 2^4 ≡ 1 (mod 5) (since p−1 = 4). Check: 2⁴ = 16 ≡ 1 (mod 5) ✓. This theorem speeds up modular exponentiation: 2^1000 mod 5 = 2^(4·250) ≡ (2⁴)^250 ≡ 1 (mod 5). Fermat's Little Theorem is the basis of RSA cryptography and primality testing.

#### Review Questions
1. Find 7^100 mod 11 using Fermat's Little Theorem.
2. Solve 2x ≡ 3 (mod 7) for x.
3. Prove that if a ≡ b (mod n), then a² ≡ b² (mod n).

---

### Euler's Theorem and Chinese Remainder Theorem
**Type:** Application
**Slug:** euler-crt
**Estimated time:** 15 min
**Key concepts:** Euler's totient function · Chinese Remainder Theorem · modular systems
**Summary:** Euler's theorem generalizes Fermat; CRT solves systems of congruences.

#### Euler's Totient Function and Euler's Theorem
The Euler totient φ(n) is the count of integers from 1 to n that are coprime to n. For prime p, φ(p) = p − 1. For prime power p^k, φ(p^k) = p^k − p^(k−1) = p^(k−1)(p − 1). For coprime m, n: φ(mn) = φ(m)φ(n). Example: φ(12) = φ(4)φ(3) = 2 · 2 = 4 (the numbers 1, 5, 7, 11 are coprime to 12). Euler's Theorem: if GCD(a, n) = 1, then a^φ(n) ≡ 1 (mod n). This generalizes Fermat (where φ(p) = p − 1). Example: find 5^100 mod 12. Since φ(12) = 4, we have 5⁴ ≡ 1 (mod 12). So 5^100 = 5^(4·25) ≡ 1 (mod 12).

#### Chinese Remainder Theorem (CRT)
If m and n are coprime, then the system x ≡ a (mod m) and x ≡ b (mod n) has a unique solution modulo mn. The solution is x = a · n · (n^(−1) mod m) + b · m · (m^(−1) mod n). Example: solve x ≡ 2 (mod 5) and x ≡ 3 (mod 7). We compute n^(−1) mod m = 7^(−1) mod 5 = 3 (since 7 ≡ 2 (mod 5) and 2 · 3 ≡ 1 (mod 5)... wait: 2 · 3 = 6 ≡ 1 (mod 5), so 2^(−1) ≡ 3, but we want 7^(−1) ≡ 3 (mod 5)? Check: 7 · 3 = 21 ≡ 1 (mod 5) ✓. And m^(−1) mod n = 5^(−1) mod 7: 5 · 3 = 15 ≡ 1 (mod 7) ✓. So x = 2 · 7 · 3 + 3 · 5 · 3 = 42 + 45 = 87. Check: 87 mod 5 = 2 ✓, 87 mod 7 = 3 ✓. The general solution is x ≡ 87 (mod 35).

#### Applications of CRT
CRT is used in cryptography (RSA), solving systems of linear congruences, and reconstructing a large number from its remainders modulo smaller coprime moduli (useful in parallel computing). It reduces a complex problem modulo a composite to simpler problems modulo primes.

#### Review Questions
1. Use CRT to solve x ≡ 1 (mod 3) and x ≡ 2 (mod 5).
2. Compute φ(20) and verify Euler's theorem for a = 3, n = 20.
3. Find the unique solution to x ≡ 4 (mod 9) and x ≡ 5 (mod 7) modulo 63.

---

### Logic & Boolean Algebra

### Boolean Algebra Basics
**Type:** Application
**Slug:** boolean-algebra-basics
**Estimated time:** 15 min
**Key concepts:** truth tables · logical operators · De Morgan's laws
**Summary:** Boolean algebra manipulates true/false values; it's the foundation of digital logic.

#### Boolean Operations and Truth Tables
The three basic operations are AND (∧, multiplication), OR (∨, addition), and NOT (¬, complement). Truth table for AND: 0 ∧ 0 = 0, 0 ∧ 1 = 0, 1 ∧ 0 = 0, 1 ∧ 1 = 1 (true iff both are true). OR: 0 ∨ 0 = 0, 0 ∨ 1 = 1, 1 ∨ 0 = 1, 1 ∨ 1 = 1 (true iff at least one is true). NOT: ¬0 = 1, ¬1 = 0 (reverses truth value). Additional operations: XOR (exclusive or) is true iff the two values differ. NAND is ¬(a ∧ b).

#### Boolean Identities
Commutative: a ∧ b = b ∧ a, a ∨ b = b ∨ a. Associative: (a ∧ b) ∧ c = a ∧ (b ∧ c). Distributive: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c). Identity: a ∧ 1 = a, a ∨ 0 = a. Complement: a ∧ ¬a = 0, a ∨ ¬a = 1. Idempotent: a ∧ a = a, a ∨ a = a. Absorption: a ∧ (a ∨ b) = a, a ∨ (a ∧ b) = a. These simplify Boolean expressions.

#### De Morgan's Laws
¬(a ∧ b) = ¬a ∨ ¬b and ¬(a ∨ b) = ¬a ∧ ¬b. Example: the negation of "it is raining AND cold" is "it is NOT raining OR NOT cold." Applied to logic gates, these laws allow conversion between NAND and NOR gates. Example: (a ∧ b)' = a' ∨ b' (the complement of AND is OR of complements).

#### Simplifying Boolean Expressions
Start with a truth table or an expression and use Boolean identities to simplify. Example: simplify (a ∧ b) ∨ (a ∧ ¬b). Factor out a: a ∧ (b ∨ ¬b) = a ∧ 1 = a. Another: simplify (a ∨ b) ∧ (a ∨ ¬b). Factor: a ∨ (b ∧ ¬b) = a ∨ 0 = a. Karnaugh maps visualize simplification for 2–4 variables by grouping adjacent 1's in a grid.

#### Review Questions
1. Verify De Morgan's law for (a ∨ b)' = a' ∧ b' using truth tables.
2. Simplify (a ∧ b) ∨ (a ∧ b ∧ c).
3. Convert (a ∧ b)' to an expression using only OR and NOT.

---

### Graph Theory

### Graphs, Vertices, and Edges
**Type:** Application
**Slug:** graph-basics
**Estimated time:** 15 min
**Key concepts:** vertices · edges · paths · connectivity
**Summary:** Graphs model networks: social networks, transportation, computer networks, molecules.

#### Graph Definition and Terminology
A graph G = (V, E) consists of vertices (nodes) V and edges E (pairs of vertices). A directed graph has edges with direction (arrows). An undirected graph has edges without direction (lines). A weighted graph assigns a number (weight) to each edge. Degree of a vertex is the number of edges connected to it. In directed graphs, in-degree and out-degree distinguish incoming and outgoing edges. Example: a social network has people as vertices and friendships as edges (undirected). A web graph has pages as vertices and hyperlinks as directed edges.

#### Paths and Cycles
A path is a sequence of vertices where consecutive pairs are connected by edges. A simple path repeats no vertices. A cycle is a path that starts and ends at the same vertex. In an undirected graph, a graph is connected if there's a path between any two vertices. In a directed graph, a graph is strongly connected if there's a directed path from every vertex to every other vertex. Example: cities are vertices, roads are edges; a path represents traveling from city A to city B via intermediate cities.

#### Special Graphs
A complete graph K_n has all possible edges: n vertices and n(n−1)/2 edges. A bipartite graph has vertices split into two sets with edges only between sets, never within. The complete bipartite graph K_{m,n} has m vertices in one set, n in the other, with all possible edges between sets. A tree is a connected acyclic graph (no cycles); it has n vertices and n−1 edges. Example: an organizational chart is a tree (each employee has a unique manager). A forest is a disjoint union of trees.

#### Graph Representations
Adjacency matrix: an n × n matrix where entry (i, j) is 1 if there's an edge from i to j, 0 otherwise. Adjacency list: a list for each vertex containing its neighbors. The matrix is dense (uses O(n²) space) but fast for lookup. The list is sparse (uses O(n+e) space, where e is edges) and efficient for traversal.

#### Review Questions
1. How many edges does a complete graph K_5 have?
2. Is the graph with vertices {A, B, C, D} and edges {AB, BC, CD} connected? Is it a tree?
3. Draw the complete bipartite graph K_{2,3}.

---

### Recursion & Mathematical Induction

### Recursive Definitions and Algorithms
**Type:** Mixed/Review
**Slug:** recursion-algorithms
**Estimated time:** 12 min
**Key concepts:** recursive definition · base case · recurrence relations
**Summary:** Recursive definitions express a function or sequence in terms of itself with a smaller input.

#### Recursive Definition Structure
A recursive definition has a base case (when to stop) and a recursive case (how to reduce). Example: factorial n! is defined as n! = 1 if n = 0 (base), n! = n · (n−1)! if n > 0 (recursive). Fibonacci: F(n) = 1 if n ≤ 1 (base), F(n) = F(n−1) + F(n−2) if n > 1 (recursive). The recursive call must reduce to smaller inputs to eventually reach the base case, avoiding infinite recursion.

#### Recurrence Relations
A recurrence relation defines a sequence where each term depends on previous terms. Example: a_n = 2a_{n−1} with a_1 = 1 gives a_n = 2^(n−1). Another: a_n = a_{n−1} + a_{n−2} with a_1 = a_2 = 1 is the Fibonacci sequence. Solving recurrence relations often involves characteristic equations (for linear recurrences) or recognizing patterns.

#### Algorithmic Recursion: Merge Sort
Merge sort recursively splits a list in half, sorts each half, then merges sorted halves. Base case: a list of 0 or 1 elements is sorted. Recursive case: split list in two, recursively sort each, merge. Time complexity: O(n log n). This divide-and-conquer approach is more efficient than naive sorting (O(n²)) for large lists.

#### Worked Example: Computing GCD Recursively
GCD(a, b) is defined recursively as: GCD(a, 0) = a (base), GCD(a, b) = GCD(b, a mod b) (recursive). Example: GCD(48, 18) = GCD(18, 12) = GCD(12, 6) = GCD(6, 0) = 6. Each step reduces the second argument until it reaches 0.

#### Review Questions
1. Write a recursive definition for the sum of the first n positive integers.
2. Solve the recurrence a_n = 3a_{n−1} with a_1 = 2.
3. Trace the recursive calls for GCD(24, 16).

---

### Mathematical Induction
**Type:** Mixed/Review
**Slug:** mathematical-induction
**Estimated time:** 12 min
**Key concepts:** base case · inductive step · strong induction
**Summary:** Induction proves statements for all integers by proving base case and inductive step.

#### Principle of Mathematical Induction
To prove a statement P(n) for all integers n ≥ n₀: (1) Prove P(n₀) is true (base case). (2) Assume P(k) is true for some k ≥ n₀ (inductive hypothesis). (3) Prove P(k+1) is true (inductive step). If both hold, P(n) is true for all n ≥ n₀.

#### Example Proof by Induction
Prove ∑(i=1 to n) i = n(n+1)/2 for all n ≥ 1. Base case (n=1): ∑(i=1 to 1) i = 1 = 1(1+1)/2 ✓. Inductive step: assume ∑(i=1 to k) i = k(k+1)/2. Then ∑(i=1 to k+1) i = ∑(i=1 to k) i + (k+1) = k(k+1)/2 + (k+1) = (k+1)[k/2 + 1] = (k+1)(k+2)/2, which is the formula for n = k+1 ✓. By induction, the formula holds for all n ≥ 1.

#### Strong Induction
Strong induction allows assuming P(i) for all i ≤ k when proving P(k+1). This is useful when P(k+1) depends on multiple previous values (e.g., Fibonacci). Example: prove every integer n ≥ 2 is either prime or a product of primes. Base case: n = 2 is prime ✓. Inductive step: assume all integers 2 ≤ i ≤ k are prime or products of primes. For n = k+1, if k+1 is prime ✓. If not, k+1 = ab where 1 < a, b < k+1. By the inductive hypothesis, a and b are prime or products of primes, so k+1 is a product of primes ✓.

#### Review Questions
1. Prove ∑(i=1 to n) i² = n(n+1)(2n+1)/6 by induction.
2. Prove 2^n > n for all n ≥ 1.
3. State and prove a base case and inductive step for proving Fibonacci identities.

---

### Discrete Math Problem Solving
**Type:** Mixed/Review
**Slug:** discrete-problem-solving
**Estimated time:** 12 min
**Key concepts:** combining techniques · multi-step logic · real-world applications
**Summary:** Discrete math problems often combine number theory, graph theory, and logic.

#### Pigeonhole Principle
If n + 1 items are placed into n boxes, at least one box contains two or more items. Example: among 13 people, at least two share the same birth month (by pigeonhole, with 13 people and 12 months). Another: if 5 points are placed in a 2×2 square, at least two are within distance √2 of each other (by pigeonhole, dividing the square into 4 unit squares).

#### Combinatorial Counting
Count the number of ways to arrange or select objects. Example: how many 4-digit numbers use distinct digits from {0–9}? The first digit has 9 choices (1–9), the second 9 (0–9 minus the first), the third 8, the fourth 7. Total: 9 · 9 · 8 · 7 = 4536. Another: how many 2-element subsets of a 5-element set? C(5,2) = 10.

#### Graph Coloring and Planar Graphs
The chromatic number is the minimum colors needed to color vertices so no adjacent vertices share a color. The four-color theorem states that any planar graph is 4-colorable. Example: a map of countries is a planar graph where each country is a vertex and edges connect adjacent countries. The chromatic number is at most 4.

#### Worked Example: Network Routing
A router has 6 incoming links and 4 outgoing links. Each incoming link can receive packets from one source, each outgoing link can send to one destination. If we need to route 24 packets from 6 sources to 4 destinations, and each source sends 4 packets to each destination on average, what is the minimum number of times each link must be used? Total packets = 24. Total source capacity = 6 links. Total destination capacity = 4 links. By the min-cut max-flow theorem, the flow is limited by the bottleneck. On average, each source sends 4 packets and each destination receives 6 packets. Each outgoing link must handle 24/4 = 6 packets on average. Some routing topologies may incur congestion; optimal routing minimizes this.

#### Review Questions
1. How many 3-digit numbers have distinct digits?
2. In a group of 25 people, prove at least three share the same birth month.
3. What is the chromatic number of the complete graph K_4?

---

### Discrete Math Competition Problems
**Type:** Competition Extension
**Slug:** discrete-competition
**Estimated time:** 10 min
**Key concepts:** clever counting · hidden structure · rapid verification
**Summary:** Discrete math toss-ups emphasize counting, logic, and recognizing patterns.

#### High-Frequency Toss-Up Patterns
"How many 2×2 matrices with entries in {0, 1} are invertible over the integers?" The matrix must have nonzero determinant. For [a b; c d], det = ad − bc. Count pairs (a, b, c, d) ∈ {0,1}⁴ with ad − bc ≠ 0. By enumeration or inclusion-exclusion, the answer is 6 (or note that out of 16 matrices, 6 are invertible over Z/2Z, and over Z we exclude those with det = 0).

#### Trick: Hidden Symmetry
"In how many ways can you arrange AABBCC if no two adjacent letters are the same?" This looks hard, but recognizing it as a valid tiling problem or using inclusion-exclusion via the principle of derangements speeds it up.

#### Trick: Off-by-One Errors
"How many integers from 1 to 100 are divisible by 3?" The answer is ⌊100/3⌋ = 33, not 34 (students often forget that 1 is not divisible by 3 and 100 isn't either). The divisible integers are 3, 6, 9, ..., 99, which is 33 integers.

#### Toss-Up Example: "For 10 points, how many divisors does 120 have?"
Prime factorization: 120 = 2³ · 3 · 5. Number of divisors = (3+1)(1+1)(1+1) = 4 · 2 · 2 = 16. Trap: forgetting the "+1" in the formula; it's (exponent + 1) for each prime factor.

#### Worked Example: Recurrence Relations in Toss-Ups
"How many binary strings of length n have no two consecutive 1's?" Let a_n be the number. Base: a_1 = 2 (strings 0 and 1). a_2 = 3 (00, 01, 10; not 11). Recurrence: a_n = a_{n−1} + a_{n−2} (a string either ends in 0, allowing any valid (n−1)-length string, or ends in 01, forcing the previous bit to be 0). Recognize this as Fibonacci: a_n = F_{n+2}. For n = 10, a_10 = F_12 = 144. Speed: don't compute all previous values; use Fibonacci tables or matrix exponentiation if needed.

#### Review Questions
1. How many divisors does 2^4 · 3^2 · 7 have?
2. What is C(100, 50) mod 2?
3. How many ways can you tile a 2×10 board with 1×2 dominoes?

---
