---
id: nsb-lesson-0726
title: "Combinations in Depth: Pascal's Triangle & Identities"
level: hs
subject: math
topic: probability-statistics
subtopic: "Counting Principles (Permutations & Combinations)"
slug: hs-counting-combinations-deep
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["Pascal's triangle", "binomial coefficient identities", "stars and bars"]
summary: "Pascal's triangle encodes all binomial coefficients; its identities — especially Pascal's identity and symmetry — appear constantly in competition counting."
---
#### Pascal's Triangle & Pascal's Identity
Row n of Pascal's triangle gives C(n,0), C(n,1), …, C(n,n). Pascal's Identity: C(n,r) = C(n−1,r−1) + C(n−1,r). Proof: choosing r from n either includes object A (then choose r−1 from n−1) or excludes it (choose r from n−1). This recursive structure means C(n,r) can be computed without full factorials.

#### Key Identities
Symmetry: C(n,r) = C(n,n−r). Sum of row: Σᵣ C(n,r) = 2ⁿ. Vandermonde: C(m+n,r) = Σₖ C(m,k)·C(n,r−k). Hockey stick: Σᵢ₌ᵣⁿ C(i,r) = C(n+1,r+1). These appear in AMC/AIME and Science Bowl. Memorize the sum-of-row identity: 2ⁿ counts all subsets of an n-element set.

#### Stars and Bars
Number of non-negative integer solutions to x₁+x₂+⋯+xₖ = n is C(n+k−1, k−1). Example: ways to distribute 10 identical candies to 3 kids (each can get 0): C(10+3−1, 3−1) = C(12,2) = 66. If each must get at least 1: substitute yᵢ = xᵢ−1, so y₁+y₂+y₃ = 7: C(9,2) = 36.

#### Circular Permutations & Necklaces
Circular arrangements of n distinct objects: (n−1)! (fix one, arrange rest). Necklaces (can flip): (n−1)!/2. Example: 6 people around a circular table: 5! = 120 arrangements.

#### Review Questions
1. Prove C(n, 2) + C(n, 1) = C(n+1, 2) using Pascal's identity.
2. In how many ways can you choose 3 books from 8 if two specific books cannot both be chosen?
3. How many ways can 10 identical balls be placed in 4 distinct boxes?

---
