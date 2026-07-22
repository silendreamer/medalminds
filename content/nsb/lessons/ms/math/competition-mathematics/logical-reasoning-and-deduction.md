---
id: nsb-lesson-1410
title: "Logical Reasoning and Deduction"
level: ms
subject: math
topic: competition-mathematics
subtopic: "Multi-Step Problem Solving"
slug: logical-reasoning-and-deduction
type: "Mixed/Review"
estimatedMinutes: 11
keyConcepts: ["logic", "deduction", "constraints", "proof"]
summary: "Logic puzzles require careful deduction; constraintprogramming mimics human reasoning."
---
#### Truth Tables and Boolean Logic
In logic, propositions are true or false. AND: both must be true. OR: at least one is true. NOT: negates truth value. Example: "It's raining AND I have an umbrella" is true only if both are true. "It's raining OR I have an umbrella" is true if at least one is true.

#### Deduction Puzzles
Problem: "Alice, Bob, and Carol each eat one fruit (apple, banana, cherry). Alice doesn't eat apples. Bob eats the banana. What does Carol eat?" Deduction: Bob eats banana. Alice doesn't eat apple, so Alice eats cherry. Carol eats apple. This requires systematic elimination.

#### Constraint Satisfaction
Problems with multiple constraints require finding solutions satisfying all. "There are 5 houses of different colors. The person in house 3 drinks milk. The green house is immediately to the left of the white house. ..." These puzzles are solved by iterating through possibilities and eliminating invalid combinations.

#### Proof by Contradiction
Assume the opposite of what you want to prove. If it leads to a contradiction, the original must be true. Example: "Prove √2 is irrational." Assume √2 = p/q (rational). Then 2q² = p², so p² is even, thus p is even. Let p = 2m. Then 2q² = 4m², so q² = 2m², meaning q² is even, so q is even. But if both p and q are even, they share a factor, contradicting p/q being in lowest terms. Therefore, √2 is irrational.

#### Mathematical Induction
To prove a statement for all positive integers n: (1) prove it for n=1 (base case), (2) assume it's true for n=k, then prove for n=k+1 (inductive step). Example: Prove 1 + 2 + ... + n = n(n+1)/2. Base: n=1, 1 = 1(2)/2 ✓. Inductive: assume 1+...+k = k(k+1)/2. Then 1+...+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2 ✓.

#### Review Questions
1. What is AND, OR, NOT in Boolean logic?
2. Solve a basic deduction puzzle.
3. What is proof by contradiction?

---
