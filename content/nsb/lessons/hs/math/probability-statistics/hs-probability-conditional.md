---
id: nsb-lesson-0729
title: "Probability Fundamentals & Conditional Probability"
level: hs
subject: math
topic: probability-statistics
subtopic: "Probability (Conditional Probability & Bayes' Theorem)"
slug: hs-probability-conditional
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["probability space", "conditional probability", "independence"]
summary: "Conditional probability P(A|B) restricts the sample space to event B, revealing how knowing B changes our assessment of A — the foundation of statistical reasoning."
---
#### Sample Space & Basic Probability
P(A) = (# favorable outcomes)/(# total outcomes) for uniform sample spaces. Complement rule: P(Aᶜ) = 1−P(A). Addition rule: P(A∪B) = P(A)+P(B)−P(A∩B). Mutually exclusive events: P(A∩B) = 0. Always verify 0 ≤ P(A) ≤ 1.

#### Conditional Probability
P(A|B) = P(A∩B)/P(B). Read: "probability of A given B." Knowing B occurred restricts us to the B-world. Example: Card drawn from standard deck. P(Ace | Red card) = P(Ace AND Red)/P(Red) = (2/52)/(26/52) = 2/26 = 1/13.

#### Independence
Events A and B are independent if P(A∩B) = P(A)·P(B), equivalently P(A|B) = P(A) — knowing B doesn't change A's probability. Example: Rolling two dice. Getting 6 on die 1 and getting 6 on die 2 are independent: P(both 6) = 1/6·1/6 = 1/36. Independence ≠ mutual exclusivity: independent events CAN both occur.

#### Multiplication Rule
P(A∩B) = P(A|B)·P(B) = P(B|A)·P(A). For independent events: P(A∩B) = P(A)·P(B). Example: Bag has 5 red and 3 blue. Draw two without replacement. P(both red) = P(1st red)·P(2nd red|1st red) = (5/8)·(4/7) = 20/56 = 5/14.

#### Review Questions
1. Two fair dice. Given the sum is at least 8, what is the probability the sum is exactly 10?
2. P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Are A and B independent?
3. Draw 3 cards without replacement. P(all hearts)?

---
