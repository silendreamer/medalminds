---
id: nsb-lesson-0743
title: "Euler's Theorem and Chinese Remainder Theorem"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: euler-crt
type: "Application"
estimatedMinutes: 15
keyConcepts: ["Euler's totient function", "Chinese Remainder Theorem", "modular systems"]
summary: "Euler's theorem generalizes Fermat; CRT solves systems of congruences."
---
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
