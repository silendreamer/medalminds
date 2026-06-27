---
id: nsb-lesson-0754
title: "Inclusion-Exclusion Principle"
level: hs
subject: math
topic: competition-math
subtopic: "Advanced Counting & Combinatorics"
slug: inclusion-exclusion
type: "Application"
estimatedMinutes: 15
keyConcepts: ["counting via overlaps", "union of sets", "derangements"]
summary: "Inclusion-exclusion counts members of a union by adding individual sets and subtracting overlaps."
---
#### Statement and Formula
|A₁ ∪ A₂ ∪ ... ∪ A_n| = ∑|A_i| − ∑|A_i ∩ A_j| + ∑|A_i ∩ A_j ∩ A_k| − ... For two sets: |A ∪ B| = |A| + |B| − |A ∩ B|. Example: how many integers from 1 to 100 are divisible by 2 or 3? |A| = ⌊100/2⌋ = 50 (divisible by 2). |B| = ⌊100/3⌋ = 33 (divisible by 3). |A ∩ B| = ⌊100/6⌋ = 16 (divisible by 6). So |A ∪ B| = 50 + 33 − 16 = 67.

#### Counting with Restrictions
How many integers from 1 to 1000 are not divisible by 2, 3, or 5? Use inclusion-exclusion: total = 1000. Subtract those divisible by 2: 500. Divisible by 3: 333. Divisible by 5: 200. Add back those divisible by 2 and 3: 166. By 2 and 5: 100. By 3 and 5: 66. Subtract those divisible by 2, 3, and 5: 33. Answer: 1000 − 500 − 333 − 200 + 166 + 100 + 66 − 33 = 266.

#### Derangements
A derangement is a permutation where no element is in its original position. Using inclusion-exclusion, the number of derangements D_n of n objects is D_n = n! ∑(k=0 to n) (−1)^k/k! ≈ n!/e. For small n: D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44. Example: arrange {1, 2, 3} so 1 is not in position 1, 2 not in position 2, 3 not in position 3. Valid arrangements: (2, 3, 1) and (3, 1, 2). Count = 2 = D_3.

#### Review Questions
1. How many integers from 1 to 100 are divisible by 4 or 6?
2. How many permutations of {1, 2, 3, 4} are derangements?
3. How many 5-digit numbers use each of {1, 2, 3, 4, 5} exactly once and don't have i in position i for any i?

---
