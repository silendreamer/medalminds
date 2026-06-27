---
id: nsb-lesson-0727
title: "Counting in Competition: Overcounting & Casework"
level: hs
subject: math
topic: probability-statistics
subtopic: "Counting Principles (Permutations & Combinations)"
slug: hs-counting-application
type: "Application"
estimatedMinutes: 14
keyConcepts: ["inclusion-exclusion", "casework", "overcounting correction"]
summary: "Most hard counting problems require either inclusion-exclusion to correct overcounting or careful casework to split into manageable pieces."
---
#### Inclusion-Exclusion Principle
|A ∪ B| = |A| + |B| − |A ∩ B|. For three sets: |A∪B∪C| = |A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|. Example: How many integers from 1 to 100 are divisible by 2 or 3? |A|=50, |B|=33, |A∩B|=16 (div by 6). Answer: 50+33−16 = 67.

#### Casework Strategy
Break the problem into mutually exclusive, exhaustive cases. Example: How many 4-digit numbers have digit sum 10, where each digit is 1–4? Cases by first digit: 1 (remaining three sum to 9 from {1–4}), 2 (→8), 3 (→7), 4 (→6). Enumerate each case systematically.

#### Complementary Counting
Count total minus bad. Example: 5-digit strings with digits 0–9, at least one digit = 7. Total: 10⁵. No 7s: 9⁵. Answer: 10⁵−9⁵ = 100000−59049 = 40951.

#### Division for Symmetry
If n identical objects are distributed and order doesn't matter, divide by symmetry factor. Example: Number of ways to seat 4 couples at a circular table (couples must sit together): treat each couple as a unit → (4−1)! = 6 circular arrangements, then each couple can internally swap → ×2⁴ = 16. Total: 6×16 = 96.

#### Review Questions
1. How many integers 1–500 are divisible by 3, 5, or 7?
2. Count 5-letter words (A–Z) with at least 2 vowels (A, E, I, O, U).
3. How many ways can 3 identical red and 4 identical blue balls be arranged in a row?

---
