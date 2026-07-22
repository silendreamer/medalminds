---
id: nsb-lesson-0753
title: "Stars and Bars"
level: hs
subject: math
topic: competition-math
subtopic: "Advanced Counting & Combinatorics"
slug: stars-and-bars
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["distributing identical items", "non-negative integers", "combinatorial method"]
summary: "Stars and bars counts the ways to distribute n identical items into k distinct groups."
---
#### The Stars and Bars Formula
To distribute n identical items into k distinct groups (allowing empty groups), arrange n stars and k−1 bars in a line. Each arrangement corresponds to a distribution. For example, distributing 5 stars into 3 groups with 2 bars: * * | * | * * means 2 items in group 1, 1 in group 2, 2 in group 3. The number of arrangements is C(n+k−1, k−1) = (n+k−1)! / (n!(k−1)!). For n = 5, k = 3: C(7, 2) = 21.

#### Applications
How many non-negative integer solutions does x₁ + x₂ + x₃ = 10 have? This is equivalent to distributing 10 identical items into 3 distinct groups. Answer: C(10+3−1, 3−1) = C(12, 2) = 66. How many ways can you buy 5 items from a store with 4 types (allowing multiple of each type)? Answer: C(5+4−1, 4−1) = C(8, 3) = 56.

#### Inclusion-Exclusion with Stars and Bars
If there are restrictions (e.g., each group has at least 1 item), substitute y_i = x_i − 1 ≥ 0. Then y₁ + y₂ + y₃ = 7, giving C(7+2, 2) = 36 solutions. If x₁ > x₂, use a bijection or generating functions to count more complex constraints.

#### Review Questions
1. How many ways can 8 identical apples be distributed among 3 children?
2. How many non-negative integer solutions does x + y + z + w = 20 have?
3. How many ways can you choose 10 identical balls from a supply with 4 colors?

---
