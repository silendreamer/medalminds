---
id: nsb-lesson-0593
title: "Set Theory Fundamentals"
level: hs
subject: math
topic: mathematical-foundations
subtopic: "Sets, Functions & Mathematical Notation"
slug: set-theory-fundamentals
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["set", "subset", "union", "intersection", "complement"]
summary: "A set is an unordered collection of distinct objects; set operations build new sets from existing ones."
---
#### Basic Definitions
A set is defined by its elements. Notation: A = {1, 2, 3} or A = {x | x is a positive integer less than 4}. The empty set ∅ contains nothing. |A| denotes the cardinality (number of elements). x ∈ A means x is in A; x ∉ A means it is not. A ⊆ B (A is a subset of B) means every element of A is in B. A = B iff A ⊆ B and B ⊆ A.

#### Operations
Union: A ∪ B = {x | x ∈ A or x ∈ B}. Intersection: A ∩ B = {x | x ∈ A and x ∈ B}. Complement: Aᶜ = {x ∈ U | x ∉ A}. Difference: A \ B = {x ∈ A | x ∉ B}. Symmetric difference: A △ B = (A ∪ B) \ (A ∩ B). The power set P(A) is the set of all subsets; |P(A)| = 2^|A|.

#### Inclusion-Exclusion
|A ∪ B| = |A| + |B| − |A ∩ B|. For three sets: |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|. This is the inclusion-exclusion principle, critical in counting problems.

#### Review Questions
1. If |A| = 10, |B| = 15, and |A ∩ B| = 4, find |A ∪ B|.
2. How many subsets does a set with 5 elements have?
3. Is A ⊆ A always true? Is ∅ ⊆ A always true?

---
