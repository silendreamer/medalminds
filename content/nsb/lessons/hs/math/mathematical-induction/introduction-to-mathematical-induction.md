---
id: nsb-lesson-1943
title: "Introduction to Mathematical Induction"
level: hs
subject: math
topic: mathematical-induction
subtopic: "Mathematical Induction"
slug: introduction-to-mathematical-induction
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["base case", "inductive step", "principle of induction"]
summary: "Students will understand the fundamental principles of mathematical induction and how to apply them to prove statements about integers."
---
### What is Mathematical Induction?

Mathematical induction is a powerful proof technique used to establish the truth of an infinite number of statements, typically those concerning integers. It is particularly useful for proving formulas involving sequences, sums, or inequalities. The method consists of two main steps: the base case and the inductive step, which together demonstrate that if a statement holds for one integer, it holds for all integers greater than or equal to that integer.

### The Base Case

The base case is the initial step in the process of mathematical induction. It involves verifying that the statement in question is true for the smallest integer in the domain, usually \( n = 1 \). Establishing the base case is crucial, as it serves as the foundation upon which the inductive step builds. If the base case fails, the entire proof collapses, and the statement cannot be considered true for all integers.

### The Inductive Step

The inductive step is where the core of mathematical induction takes place. In this step, we assume that the statement holds for some arbitrary integer \( k \) (this assumption is called the inductive hypothesis). We then use this hypothesis to prove that the statement must also hold for the next integer, \( k + 1 \). Successfully completing this step demonstrates that if the statement is true for \( k \), it must also be true for \( k + 1 \), thereby extending the truth of the statement to all integers greater than or equal to the base case.

### The Principle of Induction

The principle of induction can be summarized as follows: If a statement is true for the base case and the inductive step shows that the truth of the statement for \( k \) implies its truth for \( k + 1 \), then the statement is true for all integers \( n \) greater than or equal to the base case. This principle relies on the well-ordering property of the integers, which states that every non-empty set of positive integers has a least element. Induction effectively allows us to "climb" through the integers, proving the statement for each successive integer.

### Examples of Mathematical Induction

A classic example of mathematical induction is proving the formula for the sum of the first \( n \) integers, \( S(n) = \frac{n(n + 1)}{2} \). First, we verify the base case for \( n = 1 \): \( S(1) = \frac{1(1 + 1)}{2} = 1 \), which is true. Next, we assume \( S(k) = \frac{k(k + 1)}{2} \) holds for some integer \( k \) and show that \( S(k + 1) = S(k) + (k + 1) \) leads to the same formula for \( k + 1 \). This process confirms the formula for all integers \( n \geq 1 \).

### Common Pitfalls in Induction

Students often make errors in mathematical induction by neglecting the base case or incorrectly applying the inductive hypothesis. It is essential to ensure that the base case is clearly stated and verified before proceeding to the inductive step. Additionally, when assuming the statement holds for \( k \), students must be careful to apply this assumption correctly when proving it for \( k + 1 \). Missteps in logic or arithmetic can lead to incorrect conclusions, so careful attention is necessary throughout the proof.

### Review Questions

1. What are the two main components of a proof by mathematical induction?
2. In the context of mathematical induction, what is the inductive hypothesis?
3. Why is it important to verify the base case in a proof by induction?

---
