---
id: nsb-lesson-0741
title: "Divisibility and Prime Numbers"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: divisibility-primes
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["divisors", "prime factorization", "divisibility rules"]
summary: "Divisibility is the foundation of number theory; primes are the atoms of multiplication."
---
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
