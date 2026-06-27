---
id: nsb-lesson-0745
title: "Boolean Algebra Basics"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: boolean-algebra-basics
type: "Application"
estimatedMinutes: 15
keyConcepts: ["truth tables", "logical operators", "De Morgan's laws"]
summary: "Boolean algebra manipulates true/false values; it's the foundation of digital logic."
---
#### Boolean Operations and Truth Tables
The three basic operations are AND (∧, multiplication), OR (∨, addition), and NOT (¬, complement). Truth table for AND: 0 ∧ 0 = 0, 0 ∧ 1 = 0, 1 ∧ 0 = 0, 1 ∧ 1 = 1 (true iff both are true). OR: 0 ∨ 0 = 0, 0 ∨ 1 = 1, 1 ∨ 0 = 1, 1 ∨ 1 = 1 (true iff at least one is true). NOT: ¬0 = 1, ¬1 = 0 (reverses truth value). Additional operations: XOR (exclusive or) is true iff the two values differ. NAND is ¬(a ∧ b).

#### Boolean Identities
Commutative: a ∧ b = b ∧ a, a ∨ b = b ∨ a. Associative: (a ∧ b) ∧ c = a ∧ (b ∧ c). Distributive: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c). Identity: a ∧ 1 = a, a ∨ 0 = a. Complement: a ∧ ¬a = 0, a ∨ ¬a = 1. Idempotent: a ∧ a = a, a ∨ a = a. Absorption: a ∧ (a ∨ b) = a, a ∨ (a ∧ b) = a. These simplify Boolean expressions.

#### De Morgan's Laws
¬(a ∧ b) = ¬a ∨ ¬b and ¬(a ∨ b) = ¬a ∧ ¬b. Example: the negation of "it is raining AND cold" is "it is NOT raining OR NOT cold." Applied to logic gates, these laws allow conversion between NAND and NOR gates. Example: (a ∧ b)' = a' ∨ b' (the complement of AND is OR of complements).

#### Simplifying Boolean Expressions
Start with a truth table or an expression and use Boolean identities to simplify. Example: simplify (a ∧ b) ∨ (a ∧ ¬b). Factor out a: a ∧ (b ∨ ¬b) = a ∧ 1 = a. Another: simplify (a ∨ b) ∧ (a ∨ ¬b). Factor: a ∨ (b ∧ ¬b) = a ∨ 0 = a. Karnaugh maps visualize simplification for 2–4 variables by grouping adjacent 1's in a grid.

#### Review Questions
1. Verify De Morgan's law for (a ∨ b)' = a' ∧ b' using truth tables.
2. Simplify (a ∧ b) ∨ (a ∧ b ∧ c).
3. Convert (a ∧ b)' to an expression using only OR and NOT.

---
