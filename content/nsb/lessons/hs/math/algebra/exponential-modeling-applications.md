---
id: nsb-lesson-0638
title: "Exponential Modeling Applications"
level: hs
subject: math
topic: algebra
subtopic: "Exponential & Logarithmic Functions"
slug: exponential-modeling-applications
type: "Application"
estimatedMinutes: 15
keyConcepts: ["compound interest", "continuous growth", "logistic model"]
summary: "Exponential and logarithmic functions are the core models for finance, population biology, chemistry, and physics."
---
#### Worked Example 1: Compound Interest
$1000 invested at 6% annual interest. Simple: A = 1000(1 + 0.06t). Compound annually: A = 1000(1.06)^t. Compound monthly: A = 1000(1 + 0.06/12)^{12t}. Continuous: A = 1000e^{0.06t}. After 10 years continuous: A = 1000e^{0.6} ≈ $1822.

#### Worked Example 2: Radioactive Decay
A 200g sample has half-life of 14 days. Find (a) the decay equation and (b) how long until 25g remain.
(a) A(t) = 200·(1/2)^{t/14}.
(b) 25 = 200·(1/2)^{t/14} → (1/2)^{t/14} = 1/8 = (1/2)³ → t/14 = 3 → t = 42 days.

#### Worked Example 3: Newton's Law of Cooling
T(t) = T_ambient + (T₀ − T_ambient)·e^{−kt}. A coffee at 90°C cools to 70°C in 5 minutes in a 20°C room. Find k: 70 = 20 + 70e^{−5k} → 50/70 = e^{−5k} → k = −ln(5/7)/5 ≈ 0.0673. Time to reach 40°C: 40 = 20 + 70e^{−0.0673t} → 20/70 = e^{−0.0673t} → t = ln(70/20)/0.0673 ≈ 18.9 min.

#### Review Questions
1. How long does it take $500 to double at 8% compounded continuously?
2. A radioactive element decays to 30% of its original amount in 100 years. Find the half-life.
3. A population grows logistically from 100 to 500 to 900 (capacity K = 1000). Sketch the S-curve and identify the inflection point.

---
