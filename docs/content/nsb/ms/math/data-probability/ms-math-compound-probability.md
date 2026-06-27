---
id: nsb-lesson-1382
title: "Compound Events: Independent and Dependent"
level: ms
subject: math
topic: data-probability
subtopic: "Probability Basics"
slug: ms-math-compound-probability
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["independent events", "dependent events", "multiplication rule", "conditional probability", "\"and\" vs \"or\""]
summary: "Calculate probabilities of compound events using multiplication and addition rules."
---
#### Independent Events: Multiplication Rule
Two events are **independent** if the outcome of one doesn't affect the other. Rule: **P(A and B) = P(A) × P(B)** (for independent events). Example: flipping H and rolling a 3. P(H) = 1/2. P(3) = 1/6. P(H and 3) = 1/2 × 1/6 = **1/12**. Replacement in drawing: if you draw a marble, record it, and put it back → the events are independent (same denominator each time).

#### Dependent Events: Conditional Probability
Events are **dependent** if the outcome of one affects the other. Rule: **P(A and B) = P(A) × P(B|A)**, where P(B|A) is the probability of B given A already occurred. Example: drawing 2 aces from 52 cards without replacement. P(first ace) = 4/52. P(second ace | first ace drawn) = 3/51 (one ace and one card gone). P(two aces) = 4/52 × 3/51 = 12/2652 = **1/221**.

#### The "Or" Rule: Addition
P(A or B) = P(A) + P(B) − P(A and B). This subtracts the overlap (if both happen simultaneously). For **mutually exclusive** events (can't both happen): P(A or B) = P(A) + P(B). Example: rolling a 2 or a 5 on a die → mutually exclusive. P = 1/6 + 1/6 = **2/6 = 1/3**. Example: drawing a king or a heart: P(K) = 4/52, P(H) = 13/52, P(K and H) = 1/52 (king of hearts). P(K or H) = 4/52 + 13/52 − 1/52 = **16/52 = 4/13**.

#### At Least One: Using the Complement
"At least one" problems are most efficiently solved with the complement. P(at least one success) = 1 − P(no successes). Example: P(at least one head in 3 coin flips) = 1 − P(all tails) = 1 − (1/2)³ = 1 − 1/8 = **7/8**. This avoids listing all cases where at least one H appears (HHH, HHT, HTH, THH, HTT, THT, TTH — that's 7 cases manually, same answer).

#### Organized Sample Space
For complex compound events, a table or tree diagram prevents errors. Rolling 2 dice: make a 6×6 table. Each cell (a,b) represents the outcome. Total = 36 cells. P(sum = 7): count cells where a+b=7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 cells → P = **6/36 = 1/6**. Organizing your sample space is worth the 20 seconds it takes — it prevents calculation errors.

#### Review Questions
1. A coin is flipped 3 times. What is the probability of getting exactly 2 heads?
2. A bag has 5 red and 3 blue marbles. Two marbles are drawn without replacement. What is the probability that both are red?
3. What is the probability of rolling a sum of 8 on two standard dice?

---
