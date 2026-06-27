---
id: nsb-lesson-0709
title: "The Formal ε-δ Definition of a Limit"
level: hs
subject: math
topic: calculus
subtopic: "Limits & Continuity"
slug: hs-limits-epsilon-delta
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["epsilon-delta", "formal proof", "rigorous definition"]
summary: "The ε-δ definition gives limits a precise, proof-ready meaning: for every desired closeness ε in output, we can find a corresponding closeness δ in input."
---
#### The Definition
lim(x→a) f(x) = L means: for every ε > 0, there exists δ > 0 such that if 0 < |x−a| < δ, then |f(x)−L| < ε. In plain terms: no matter how tight an output tolerance ε you demand, we can always find an input neighborhood δ that guarantees f(x) stays within ε of L. The 0 < |x−a| part excludes x = a itself — the limit is about approach, not arrival.

#### Proving a Simple Limit
Claim: lim(x→2) (3x−1) = 5. Proof: Given ε > 0, set δ = ε/3. If 0 < |x−2| < δ, then |(3x−1)−5| = |3x−6| = 3|x−2| < 3·(ε/3) = ε. ✓ The key strategy: work backwards from |f(x)−L| < ε to find what |x−a| < δ requires, then verify forward.

#### Why It Matters for Competition
ε-δ appears in proof-based competition math and AP Calculus. Understanding it lets you verify limit claims rigorously and spot when "intuitive" limits are actually wrong. It also underlies the formal definition of continuity and differentiability.

#### Common Traps
The condition is 0 < |x−a| < δ (strictly greater than 0) — this excludes x = a. The quantifier order matters: "for every ε, there exists δ" — NOT "there exists δ for all ε." δ may depend on ε; that's expected and correct.

#### Review Questions
1. Use the ε-δ definition to prove lim(x→1) (2x+3) = 5.
2. What does it mean for a limit to NOT exist, in ε-δ terms?
3. Why does the definition require 0 < |x−a|, not just |x−a| < δ?

---
