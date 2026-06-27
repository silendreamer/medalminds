---
id: nsb-lesson-0730
title: "Bayes' Theorem"
level: hs
subject: math
topic: probability-statistics
subtopic: "Probability (Conditional Probability & Bayes' Theorem)"
slug: hs-probability-bayes
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["Bayes' theorem", "prior/posterior", "law of total probability"]
summary: "Bayes' theorem reverses conditional probability — given that an effect occurred, it computes the probability of each possible cause."
---
#### The Law of Total Probability
If B₁, B₂, …, Bₙ partition the sample space, then P(A) = Σ P(A|Bᵢ)·P(Bᵢ). This lets you compute P(A) by conditioning on which Bᵢ occurred. Example: Medical test for a disease with P(disease) = 0.01. Test is 99% sensitive (P(+|disease) = 0.99) and 99% specific (P(−|no disease) = 0.99). P(+) = P(+|D)·P(D) + P(+|Dᶜ)·P(Dᶜ) = 0.99·0.01 + 0.01·0.99 = 0.0198.

#### Bayes' Theorem
P(B|A) = P(A|B)·P(B)/P(A). Using total probability: P(Bᵢ|A) = [P(A|Bᵢ)·P(Bᵢ)] / Σⱼ[P(A|Bⱼ)·P(Bⱼ)]. The medical test example: given a positive test, P(disease|+) = P(+|D)·P(D)/P(+) = (0.99·0.01)/0.0198 = 0.0099/0.0198 = 0.5. Surprising: even a 99% accurate test gives only 50% probability of disease when the base rate is 1%!

#### Prior and Posterior
"Prior" = initial belief P(Bᵢ). "Posterior" = updated belief P(Bᵢ|A) after observing A. Bayes' theorem is the mathematical mechanism for rational belief updating. The prior matters hugely: rare events stay improbable even after positive tests because of base rate (Bayes factor) considerations.

#### Classic Bayes Problems
Box 1 has 3 red, 7 blue; Box 2 has 6 red, 4 blue. Pick a box at random, draw a ball — it's red. P(Box 1 | red) = P(red|Box1)·P(Box1) / P(red) = (0.3·0.5) / (0.3·0.5+0.6·0.5) = 0.15/0.45 = 1/3.

#### Review Questions
1. 3 identical boxes: box A has 2 gold coins, B has 1 gold 1 silver, C has 2 silver. Random box, random coin — it's gold. P(other coin in box is gold)?
2. Disease prevalence 2%. Test is 95% sensitive, 90% specific. Given positive test, P(disease)?
3. Explain why base rate matters more than test accuracy for rare diseases.

---
