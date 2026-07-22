---
id: nsb-lesson-0596
title: "Set Theory in Counting Problems"
level: hs
subject: math
topic: mathematical-foundations
subtopic: "Sets, Functions & Mathematical Notation"
slug: set-theory-counting-problems
type: "Application"
estimatedMinutes: 14
keyConcepts: ["inclusion-exclusion", "Venn diagram", "complement counting"]
summary: "Inclusion-exclusion and complement counting are the go-to strategies for bowl-style counting questions involving overlapping conditions."
---
#### Worked Example 1: Three-Set Inclusion-Exclusion
In a class of 100 students: 60 take math (M), 45 take science (S), 30 take history (H). 25 take M ∩ S, 20 take M ∩ H, 15 take S ∩ H, and 10 take all three. How many take at least one?
|M ∪ S ∪ H| = 60 + 45 + 30 − 25 − 20 − 15 + 10 = 85.

#### Worked Example 2: Complement Counting
How many integers from 1 to 100 are divisible by 2 or 3?
|div by 2| = 50, |div by 3| = 33, |div by 6| = 16.
|div by 2 or 3| = 50 + 33 − 16 = 67.
Complement: 100 − 67 = 33 integers are divisible by neither 2 nor 3.

#### Worked Example 3: Functions and Counting
How many functions are there from {1, 2, 3} to {a, b, c}?
Each of the 3 inputs has 3 choices independently → 3³ = 27 total functions.
How many are injections? 3 × 2 × 1 = 6 (assign distinct outputs: 3 choices for f(1), 2 for f(2), 1 for f(3)).

#### Review Questions
1. Among integers 1–200, how many are divisible by 3 or 5?
2. A survey finds 70% like apples, 60% like bananas, 40% like both. What percent like neither?
3. How many surjections are there from a 4-element set to a 2-element set?

---
