---
id: nsb-lesson-0742
title: "Modular Arithmetic and Congruences"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: modular-arithmetic
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["congruences", "modular inverse", "Fermat's Little Theorem"]
summary: "Modular arithmetic treats remainders as equivalent; it's the foundation of cryptography and number theory."
---
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
