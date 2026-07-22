---
id: nsb-lesson-0703
title: "Sequences, Series, and Convergence"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: sequences-convergence
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["limits of sequences", "convergence", "divergence tests"]
summary: "Sequences can converge to a limit, diverge to infinity, or oscillate."
---
#### Convergence of Sequences
A sequence {a_n} converges to a limit L (written lim(n→∞) a_n = L) if for every ε > 0, there exists N such that |a_n − L| < ε for all n > N. Intuitively, the terms get arbitrarily close to L for large n. Example: a_n = 1/n converges to 0. For any ε > 0, choose N = 1/ε. Then for n > N, |1/n − 0| = 1/n < 1/N = ε. Sequences that don't converge diverge. a_n = n diverges to ∞. a_n = (−1)^n oscillates and doesn't converge.

#### Convergence of Infinite Series
An infinite series ∑(n=1 to ∞) a_n converges to a sum S if the partial sums S_N = ∑(n=1 to N) a_n converge to S as N → ∞. Example: the geometric series ∑(n=0 to ∞) r^n = 1/(1−r) for |r| < 1. The partial sum is S_N = (1−r^(N+1))/(1−r). As N → ∞ and |r| < 1, r^(N+1) → 0, so S_N → 1/(1−r).

#### Divergence Tests
If lim(n→∞) a_n ≠ 0, then ∑ a_n diverges (the n-th term test). Example: ∑ n/(n+1) diverges because lim(n→∞) n/(n+1) = 1 ≠ 0. For geometric series, ∑ r^n converges iff |r| < 1. For p-series, ∑ 1/n^p converges iff p > 1. The comparison and ratio tests further determine convergence.

#### Review Questions
1. Does the sequence a_n = (n+1)/n converge? If so, to what limit?
2. Does the series ∑(n=1 to ∞) 1/(2^n) converge?
3. For which values of x does ∑(n=0 to ∞) x^n converge?

---
