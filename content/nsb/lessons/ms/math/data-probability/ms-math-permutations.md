---
id: nsb-lesson-1386
title: "Permutations: Order Matters"
level: ms
subject: math
topic: data-probability
subtopic: "Counting Principles (Fundamental Counting Theorem)"
slug: ms-math-permutations
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["permutation", "factorial", "nPr", "arrangements", "order matters"]
summary: "Count ordered arrangements using permutations and factorial notation."
---
#### Factorial Notation
The **factorial** of n (written n!) = n × (n−1) × (n−2) × ... × 2 × 1. It counts all ways to arrange n distinct items in a line. Values: 1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720. By definition, 0! = 1. Factorial grows extremely fast. Example: arranging 5 books on a shelf: 5! = **120** ways. Each position is filled one at a time: 5 choices for first, 4 for second, 3 for third, 2 for fourth, 1 for last.

#### Permutations: Choosing and Arranging
A **permutation** selects r items from n distinct items and arranges them in order. Formula: **nPr = n! / (n−r)!**. Example: how many ways can 3 people be chosen from 8 and arranged in a line (1st, 2nd, 3rd place)? ₈P₃ = 8!/(8−3)! = 8!/5! = 8×7×6 = **336**. You can also think of it as: 8 choices for 1st, 7 for 2nd, 6 for 3rd = 8×7×6 = 336. Both approaches give the same answer.

#### When Order Matters vs. Doesn't
The key question: does swapping the items create a different outcome? If YES → permutation. If NO → combination (next subtopic). Examples where order MATTERS: race results (1st, 2nd, 3rd), phone numbers, passwords, arranging books on a shelf. Examples where order DOESN'T matter: selecting a committee, choosing toppings for a pizza, drawing cards (if only the set matters).

#### Special Cases
(1) **Arrangements with repetition**: if some items are identical, divide by the factorial of the number of repetitions. For ABBC (B appears twice): arrangements = 4!/2! = 12. (2) **Circular permutations**: arranging n people in a circle = (n−1)! (fix one person, arrange the rest). 4 people at a round table = 3! = **6** ways.

#### Practice: Recognizing Permutation Problems
"In how many ways can 5 runners finish a race?" = 5! = 120. "In how many ways can a president, VP, and secretary be chosen from 10 people?" = 10×9×8 = 720. "How many 3-digit numbers can be formed from {1,2,3,4,5} with no repetition?" = 5×4×3 = 60. All of these are permutation problems — order matters in each case.

#### Review Questions
1. In how many ways can the letters in the word MATH be arranged?
2. A race has 6 runners. In how many ways can 1st, 2nd, and 3rd place be awarded?
3. In how many ways can 7 people sit in a row?

---
