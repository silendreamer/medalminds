---
id: nsb-lesson-0705
title: "Precalculus Problem Solving (Mixed Review)"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: precalc-problem-solving
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["multi-step problems", "combining techniques", "real-world applications"]
summary: "Complex precalculus problems often combine sequences, series, polar coordinates, and complex numbers."
---
#### Problem-Solving Strategy
Identify what's given and what's asked. Translate to mathematical notation. Choose techniques (sequence formula? series sum? polar conversion? complex arithmetic?). Solve step-by-step, checking each step for errors. Verify the answer makes sense (e.g., a probability should be between 0 and 1; a distance should be positive).

#### Worked Example: Compound Interest and Annuities
An investment starts with $1000 and earns 5% annually. After 10 years, how much will it be worth? If you add $100 at the end of each year, what's the total after 10 years? The first part is compound interest: A = P(1+r)^t = 1000(1.05)^10 ≈ $1628.89. The second part is an annuity: the additional payments form a geometric series. Each $100 earns interest for the remaining years: the first additional $100 earns interest for 9 years: 100(1.05)^9; the second for 8 years: 100(1.05)^8; ...; the last for 0 years: 100. The sum is 100[1.05 + 1.05² + ... + 1.05^9] = 100·1.05·(1−1.05^9)/(1−1.05) ≈ $1268. Total after 10 years: $1628.89 + $1268 ≈ $2897.

#### Worked Example: Navigation with Complex Numbers
Two ships start at the origin. Ship A travels in direction e^(iπ/6) (60° in complex plane) at speed 3 units/hour. Ship B travels in direction e^(iπ/3) (30°) at speed 4 units/hour. After 2 hours, find the distance between them. Ship A is at position 2·3·e^(iπ/6) = 6e^(iπ/6) = 6(√3/2 + i/2) = 3√3 + 3i. Ship B is at 2·4·e^(iπ/3) = 8e^(iπ/3) = 8(1/2 + i√3/2) = 4 + 4√3 i. Distance: |A − B| = |(3√3−4) + i(3−4√3)| = √[(3√3−4)² + (3−4√3)²] = √[27 − 24√3 + 16 + 9 − 24√3 + 48] = √[100 − 48√3] ≈ √[16.87] ≈ 4.1 units.

#### Review Questions
1. A savings account has $5000 initially and adds $200/month with 0.5% monthly interest. How much after 3 years?
2. In polar coordinates, two points are at (5, 0) and (3, π/2). Find the distance between them.
3. Solve for z: |z| = 2 and z^3 = 8i.

---
