---
id: nsb-lesson-0728
title: "Counting: Competition Extensions"
level: hs
subject: math
topic: probability-statistics
subtopic: "Counting Principles (Permutations & Combinations)"
slug: hs-counting-competition
type: "Competition Extension"
estimatedMinutes: 8
keyConcepts: ["Chicken McNugget theorem", "pigeonhole", "bijections"]
summary: "Competition-level counting adds powerful tools: the Chicken McNugget theorem for Frobenius numbers, pigeonhole arguments, and bijective proofs."
---
#### Chicken McNugget Theorem (Frobenius Coin Problem)
For two coprime positive integers a and b, the largest integer that CANNOT be expressed as xa+yb (x,y ≥ 0) is ab−a−b. Example: nuggets come in 6 and 11. Largest non-purchasable: 6·11−6−11 = 49. Numbers > 49 can all be purchased.

#### Pigeonhole Principle
If n+1 objects are placed in n boxes, at least one box has 2+ objects. Generalized: at least one box has ⌈N/n⌉ objects. Example: In any group of 13 people, at least two share a birth month. Competition use: prove existence of a common property without finding it explicitly.

#### Bijections & Double Counting
To count set A, find a bijection to set B whose size is known. To prove a combinatorial identity, count the same set two ways (both sides count the same objects). Example: Prove C(n,1)+2·C(n,2)+⋯+n·C(n,n) = n·2^(n-1) by counting (element, subset) pairs two ways.

#### Toss-Up Style
"For 10 points, what is the largest integer that cannot be represented as 5a+8b for non-negative integers a, b?" Chicken McNugget: 5·8−5−8 = 27. ANSWER: 27.

#### Review Questions
1. In any group of 367 people, at least two share a birthday (including Feb 29). Why?
2. Find all positive integers not expressible as 4a+7b (a,b ≥ 0).
3. Use double counting to prove Σₖ k·C(n,k) = n·2^(n-1).

---
