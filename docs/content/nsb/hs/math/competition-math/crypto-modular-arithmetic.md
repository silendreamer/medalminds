---
id: nsb-lesson-0759
title: "Modular Arithmetic and Cryptography"
level: hs
subject: math
topic: competition-math
subtopic: "Number Theory Problem Solving"
slug: crypto-modular-arithmetic
type: "Application"
estimatedMinutes: 15
keyConcepts: ["RSA", "encryption", "Euler's theorem application"]
summary: "Modern cryptography relies on number-theoretic problems; understanding modular arithmetic reveals security principles."
---
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
