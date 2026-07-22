---
id: nsb-lesson-0696
title: "The Binomial Theorem"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: binomial-theorem
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["binomial expansion", "binomial coefficients", "Pascal's triangle"]
summary: "The binomial theorem expands (x+y)^n into a sum of terms with binomial coefficients."
---
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
