---
id: nsb-lesson-0592
title: "Competition Extension: AMC/AIME Proof-Style Problems"
level: hs
subject: math
topic: mathematical-foundations
subtopic: "Mathematical Reasoning, Logic & Proof Techniques"
slug: amc-aime-proof-style-problems
type: "Competition Extension"
estimatedMinutes: 8
keyConcepts: ["modular arithmetic", "parity argument", "pigeonhole"]
summary: "Competition-style proofs at AMC/AIME level use parity, pigeonhole, and modular arithmetic as elegant shortcuts."
---
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
