---
id: nsb-lesson-0722
title: "Differential Equations: Applications"
level: hs
subject: math
topic: calculus
subtopic: "Differential Equations (Introduction)"
slug: hs-odes-application
type: "Application"
estimatedMinutes: 13
keyConcepts: ["exponential decay", "logistic growth", "initial value problems"]
summary: "Differential equations model real-world phenomena; these worked examples cover radioactive decay, population dynamics, and mixing problems."
---
#### Problem 1: Carbon-14 Dating
Carbon-14 decays with half-life 5,730 years. A fossil has 1/4 of its original C-14. How old is it? k = ln(2)/5730. y = y₀e^(−kt). 1/4 = e^(−kt) → kt = ln4 = 2ln2 → t = 2ln2/k = 2·5730 = 11,460 years. Intuition: each half-life cuts C-14 in half; two half-lives → 1/4 remains.

#### Problem 2: Logistic Growth
Logistic DE: dP/dt = rP(1−P/K), where K = carrying capacity. Solution: P(t) = K/(1 + ((K−P₀)/P₀)·e^(−rt)). As t→∞, P → K. Inflection point (fastest growth) occurs at P = K/2. Models real populations that saturate at an environmental limit — distinguishes from unbounded exponential growth.

#### Problem 3: Mixing Problem
A tank holds 100L of water with 10g of salt. Brine with 0.5g/L enters at 4L/min; well-mixed solution exits at 4L/min. Find salt amount Q(t). dQ/dt = rate in − rate out = 0.5·4 − (Q/100)·4 = 2 − Q/25. This is linear: dQ/dt + Q/25 = 2. Integrating factor: e^(t/25). Solution: Q(t) = 50 + (Q₀−50)e^(−t/25) = 50−40e^(−t/25). As t→∞, Q→50g (equilibrium).

#### Review Questions
1. A radioactive element has half-life 8 days. Starting with 500g, find the amount remaining after 24 days.
2. A culture starts with 100 bacteria and doubles every 3 hours. When will it reach 10,000?
3. Explain the difference between logistic and exponential growth in terms of the DE.

---
