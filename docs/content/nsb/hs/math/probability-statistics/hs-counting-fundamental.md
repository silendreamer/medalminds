---
id: nsb-lesson-0725
title: "Fundamental Counting Principle & Factorials"
level: hs
subject: math
topic: probability-statistics
subtopic: "Counting Principles (Permutations & Combinations)"
slug: hs-counting-fundamental
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["multiplication principle", "factorial", "counting sequences"]
summary: "The Fundamental Counting Principle — multiply choices at each independent step — underpins all of combinatorics."
---
#### The Multiplication Principle
If task A can be done in m ways and task B in n ways (independently), the combined task can be done in m×n ways. Extend to any number of steps. Example: A 3-digit lock with digits 0–9 on each ring has 10³ = 1000 combinations. A committee selects a president, VP, and secretary from 10 people (different people each role): 10×9×8 = 720 ways.

#### Factorials
n! = n×(n−1)×⋯×2×1. Counts the number of ways to arrange n distinct objects. 0! = 1 (by convention — one way to arrange nothing). Key values: 5! = 120, 6! = 720, 7! = 5040, 10! = 3,628,800. Factorials grow extremely fast — crucial to recognize when an answer should be in factorial form.

#### Permutations: Ordered Arrangements
P(n, r) = n!/(n−r)! = n×(n−1)×⋯×(n−r+1). Number of ways to choose r objects from n and arrange them (order matters). Example: Number of 3-letter "words" from {A,B,C,D,E} with no repeats: P(5,3) = 5×4×3 = 60.

#### Combinations: Unordered Selections
C(n, r) = n!/(r!(n−r)!) = "n choose r." Order does NOT matter. Example: 5-card hands from 52-card deck: C(52,5) = 2,598,960. Relationship: C(n,r) = P(n,r)/r! — divide out the r! orderings within each group.

#### Review Questions
1. How many 4-digit PINs can be formed using digits 1–9 with no repetition?
2. In how many ways can 8 runners finish a race (1st, 2nd, 3rd, no ties)?
3. A club has 12 members. How many ways can a 4-person committee be formed?

---
