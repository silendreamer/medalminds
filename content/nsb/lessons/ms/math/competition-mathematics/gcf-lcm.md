---
id: nsb-lesson-1398
title: "Greatest Common Factor and Least Common Multiple"
level: ms
subject: math
topic: competition-mathematics
subtopic: "Number Theory Basics"
slug: gcf-lcm
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["GCF", "LCM", "Euclidean algorithm", "factor trees"]
summary: "GCF and LCM are fundamental for fraction manipulation and solving problems."
---
#### Finding GCF by Prime Factorization
To find GCF(48, 36): factor both. 48 = 2⁴ × 3. 36 = 2² × 3². GCF is the product of common prime factors with their lowest powers: 2² × 3 = 12. Check: 48 ÷ 12 = 4, 36 ÷ 12 = 3. GCF(48, 36) = 12 ✓.

#### Euclidean Algorithm
An alternative method: repeatedly apply the division algorithm. GCF(48, 36): 48 = 36 × 1 + 12. Then GCF(36, 12): 36 = 12 × 3 + 0. When remainder is 0, the GCF is the last divisor: GCF(48, 36) = 12. This is faster for large numbers.

#### Finding LCM by Prime Factorization
LCM(48, 36): take the highest powers of all primes. LCM = 2⁴ × 3² = 16 × 9 = 144. Check: 144 ÷ 48 = 3, 144 ÷ 36 = 4. LCM(48, 36) = 144 ✓.

#### Relationship: GCF × LCM = a × b
For any two numbers a and b: GCF(a, b) × LCM(a, b) = a × b. So if GCF(48, 36) = 12, then LCM = (48 × 36) ÷ 12 = 1,728 ÷ 12 = 144. This relationship is useful when one is known and you need the other.

#### Applications in Fractions
To add 5/12 + 7/18, find LCM(12, 18) = 36. Convert: 5/12 = 15/36, 7/18 = 14/36. Sum: 29/36. GCF simplifies fractions: 24/36 = (24 ÷ 12)/(36 ÷ 12) = 2/3 because GCF(24, 36) = 12.

#### Review Questions
1. What is GCF(48, 36)?
2. What is LCM(48, 36)?
3. How does the Euclidean algorithm work?

---
