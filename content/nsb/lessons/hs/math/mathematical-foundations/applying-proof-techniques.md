---
id: nsb-lesson-0588
title: "Applying Proof Techniques: Worked Examples"
level: hs
subject: math
topic: mathematical-foundations
subtopic: "Mathematical Reasoning, Logic & Proof Techniques"
slug: applying-proof-techniques
type: "Application"
estimatedMinutes: 15
keyConcepts: ["divisibility", "parity", "rationality"]
summary: "Practice selecting and executing the right proof strategy for classic number-theory and algebra propositions."
---
#### Worked Example 1: Divisibility
**Claim:** If a | b and a | c, then a | (b + c).
**Proof:** Since a | b, there exists integer k with b = ak. Since a | c, there exists integer m with c = am. Then b + c = ak + am = a(k + m). Since k + m is an integer, a | (b + c). □

Full solution highlights: the proof is entirely definitional — translate divisibility into multiplication, factor, recognize the form.

#### Worked Example 2: Irrationality
**Claim:** √3 is irrational.
**Proof:** Suppose √3 = p/q in lowest terms, so 3 = p²/q², giving p² = 3q². Then 3 | p², and since 3 is prime, 3 | p. Write p = 3k: 9k² = 3q², so q² = 3k², meaning 3 | q. But then 3 | gcd(p, q), contradicting lowest-terms assumption. □

#### Worked Example 3: Induction on Inequality
**Claim:** 2ⁿ > n² for all n ≥ 5.
**Base case:** 2⁵ = 32 > 25 = 5². ✓
**Inductive step:** Assume 2ᵏ > k² for some k ≥ 5. Then 2ᵏ⁺¹ = 2·2ᵏ > 2k². Need to show 2k² ≥ (k+1)² = k² + 2k + 1, i.e., k² ≥ 2k + 1, i.e., k² - 2k - 1 ≥ 0. For k ≥ 5: k² - 2k - 1 ≥ 25 - 10 - 1 = 14 > 0. ✓

#### Review Questions
1. Prove: the product of any two odd integers is odd.
2. Prove by contradiction: there is no largest prime.
3. Prove by induction: 3ⁿ ≥ 1 + 2n for all n ≥ 0.

---
