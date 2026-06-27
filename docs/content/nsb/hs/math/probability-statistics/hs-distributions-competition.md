---
id: nsb-lesson-0736
title: "Distributions: Competition Extensions"
level: hs
subject: math
topic: probability-statistics
subtopic: "Random Variables & Probability Distributions"
slug: hs-distributions-competition
type: "Competition Extension"
estimatedMinutes: 8
keyConcepts: ["negative binomial", "expected value linearity tricks", "competition distribution problems"]
summary: "Competition probability loves linearity of expectation, indicator variables, and the negative binomial — faster than brute-force enumeration."
---
#### Indicator Variable Trick
E[X] where X counts events: write X = I₁+I₂+⋯, where Iₖ = 1 if event k occurs. Then E[X] = E[I₁]+⋯ = P(event 1)+⋯. Example: E[# pairs of people with same birthday in group of 30]. Number of pairs = C(30,2) = 435. P(any pair matches) = 1/365. E[# matching pairs] = 435/365 ≈ 1.19.

#### Negative Binomial
X = # trials until rth success. E[X] = r/p. Example: # cards drawn (without replacement) until 3 aces: E = 3·(52/4) but this needs careful adjustment for without-replacement setting.

#### Toss-Up
"For 10 points, what is the expected number of times you roll a fair die until you have rolled each number at least once?" This is the Coupon Collector problem: E = 6·(1/1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6) = 6·49/20 = 14.7.

#### Review Questions
1. 10 people in a room. E[# pairs sharing a birthday]?
2. Roll a die until you see a 5. E[# rolls]?
3. X ~ Bin(n, p). Show Var(X) = np(1−p) using indicator variables.

---
