---
id: nsb-lesson-1399
title: "Modular Arithmetic and Remainders"
level: ms
subject: math
topic: competition-mathematics
subtopic: "Number Theory Basics"
slug: modular-arithmetic
type: "Core Understanding"
estimatedMinutes: 11
keyConcepts: ["modulo", "remainder", "congruence", "mod inverse"]
summary: "Modular arithmetic tracks remainders and has applications in cryptography, calendars, and number theory."
---
#### Modulo Operation
a mod n is the remainder when a is divided by n. Examples: 17 mod 5 = 2 (since 17 = 5 × 3 + 2). 23 mod 7 = 2 (since 23 = 7 × 3 + 2). We write 17 ≡ 2 (mod 5), meaning "17 is congruent to 2 modulo 5."

#### Modular Arithmetic Properties
If a ≡ b (mod n) and c ≡ d (mod n), then: a + c ≡ b + d (mod n) and a × c ≡ b × d (mod n). Example: 7 ≡ 2 (mod 5) and 8 ≡ 3 (mod 5). So 7 + 8 = 15 ≡ 2 + 3 = 5 ≡ 0 (mod 5). And 7 × 8 = 56 ≡ 2 × 3 = 6 ≡ 1 (mod 5).

#### Clock Arithmetic
Clock arithmetic is mod 12. If it's 9 AM and you wait 7 hours, it's 4 PM. (9 + 7 = 16 ≡ 4 (mod 12)). Day of week arithmetic is mod 7. If today is Wednesday (day 3) and we add 10 days, 3 + 10 = 13 ≡ 6 (mod 7) = Saturday.

#### Fermat's Little Theorem
If p is prime and a is not divisible by p, then a^(p-1) ≡ 1 (mod p). Example: 2^4 ≡ 1 (mod 5) because 2^4 = 16 ≡ 1 (mod 5). This theorem has applications in cryptography (RSA encryption uses similar ideas).

#### Modular Inverse
The modular inverse of a modulo n is a number b such that a × b ≡ 1 (mod n). Example: the inverse of 3 modulo 7 is 5 because 3 × 5 = 15 ≡ 1 (mod 7). Modular inverses are essential for solving modular equations (a × x ≡ c (mod n) can be solved by multiplying by a's inverse).

#### Review Questions
1. What is 23 mod 7?
2. How does clock arithmetic use mod 12?
3. What is Fermat's Little Theorem?

---
