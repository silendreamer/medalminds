---
id: nsb-lesson-0706
title: "Precalculus Competition Problems"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: precalc-competition-problems
type: "Competition Extension"
estimatedMinutes: 10
keyConcepts: ["clever factoring", "hidden patterns", "rapid mental calculation"]
summary: "Competition problems often require recognizing patterns and using elegant techniques."
---
#### Pattern Recognition in Sequences
"Find the sum 1 + 2 + 4 + 8 + ... + 2^99." Recognize it as a geometric series: S = ∑(k=0 to 99) 2^k = (1−2^100)/(1−2) = 2^100 − 1. Direct calculation would take forever. Another: "Find the sum 1 + 1/2 + 1/4 + 1/8 + ..." This is a geometric series with r = 1/2: S = 1/(1−1/2) = 2.

#### Clever Binomial Expansion Tricks
"Expand (x+y)^n and find the sum of coefficients." Setting x = y = 1: (1+1)^n = 2^n = ∑(k=0 to n) C(n,k). So the sum of binomial coefficients is 2^n. Another: "Find the coefficient of x^3 in (2x − 1/x)^5." Use the binomial theorem: the general term is C(5,k)(2x)^(5−k)(−1/x)^k = C(5,k)(−1)^k 2^(5−k) x^(5−2k). For x³, set 5 − 2k = 3 → k = 1. Coefficient: C(5,1)(−1)^1 2^4 = 5·(−1)·16 = −80.

#### Telescoping and Cancellation Tricks
"Compute ∑(k=1 to 100) 1/(k(k+1))." Recognize 1/(k(k+1)) = 1/k − 1/(k+1), which telescopes: ∑ = 1 − 1/101 = 100/101. Trap: not recognizing the telescoping and attempting to compute 100 terms.

#### Complex Number Speed Tricks
"Find (1+i)^2024." Convert to polar: 1+i = √2 e^(iπ/4). (1+i)^2024 = (√2)^2024 e^(i·2024π/4) = 2^1012 e^(i·506π) = 2^1012 e^(0) = 2^1012 (since e^(i·506π) = cos(506π) + i sin(506π) = 1 because 506 is even). Trap: computing 1024 multiplications instead of recognizing the pattern.

#### Toss-Up Example: "For 10 points, what is the sum of the infinite series 1/2 + 1/4 + 1/8 + 1/16 + ...?"
Answer: This is a geometric series with a = 1/2 and r = 1/2, so S = (1/2)/(1−1/2) = 1. Alternatively, recognize 1/2 + 1/4 + ... = (1 − 1/2) = 1 (the sum represents all values between 0 and 1 in binary: 0.111... = 1 in decimal).

#### Review Questions
1. Find ∑(k=1 to 50) [k² − (k−1)²].
2. Simplify (−1 + i√3)^12.
3. Prove ∑(k=1 to n) k/(k+1)! = 1 − 1/(n+1)!.

---
