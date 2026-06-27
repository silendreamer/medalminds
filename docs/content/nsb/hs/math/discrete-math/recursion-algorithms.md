---
id: nsb-lesson-0749
title: "Recursive Definitions and Algorithms"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: recursion-algorithms
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["recursive definition", "base case", "recurrence relations"]
summary: "Recursive definitions express a function or sequence in terms of itself with a smaller input."
---
#### Recursive Definition Structure
A recursive definition has a base case (when to stop) and a recursive case (how to reduce). Example: factorial n! is defined as n! = 1 if n = 0 (base), n! = n · (n−1)! if n > 0 (recursive). Fibonacci: F(n) = 1 if n ≤ 1 (base), F(n) = F(n−1) + F(n−2) if n > 1 (recursive). The recursive call must reduce to smaller inputs to eventually reach the base case, avoiding infinite recursion.

#### Recurrence Relations
A recurrence relation defines a sequence where each term depends on previous terms. Example: a_n = 2a_{n−1} with a_1 = 1 gives a_n = 2^(n−1). Another: a_n = a_{n−1} + a_{n−2} with a_1 = a_2 = 1 is the Fibonacci sequence. Solving recurrence relations often involves characteristic equations (for linear recurrences) or recognizing patterns.

#### Algorithmic Recursion: Merge Sort
Merge sort recursively splits a list in half, sorts each half, then merges sorted halves. Base case: a list of 0 or 1 elements is sorted. Recursive case: split list in two, recursively sort each, merge. Time complexity: O(n log n). This divide-and-conquer approach is more efficient than naive sorting (O(n²)) for large lists.

#### Worked Example: Computing GCD Recursively
GCD(a, b) is defined recursively as: GCD(a, 0) = a (base), GCD(a, b) = GCD(b, a mod b) (recursive). Example: GCD(48, 18) = GCD(18, 12) = GCD(12, 6) = GCD(6, 0) = 6. Each step reduces the second argument until it reaches 0.

#### Review Questions
1. Write a recursive definition for the sum of the first n positive integers.
2. Solve the recurrence a_n = 3a_{n−1} with a_1 = 2.
3. Trace the recursive calls for GCD(24, 16).

---
