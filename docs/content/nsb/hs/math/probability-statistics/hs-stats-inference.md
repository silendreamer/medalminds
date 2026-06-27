---
id: nsb-lesson-0738
title: "Statistical Inference: Confidence Intervals & Hypothesis Tests"
level: hs
subject: math
topic: probability-statistics
subtopic: "Descriptive Statistics & Statistical Inference"
slug: hs-stats-inference
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["confidence interval", "p-value", "Type I/II error", "significance"]
summary: "Statistical inference uses sample data to make probabilistic statements about populations; confidence intervals and hypothesis tests are the two main tools."
---
#### Confidence Intervals
CI for population mean (known σ): x̄ ± z*(σ/√n). z* = 1.645 (90%), 1.96 (95%), 2.576 (99%). CI for proportion: p̂ ± z*·√(p̂(1−p̂)/n). Interpretation: "We are 95% confident the true parameter lies in this interval." NOT "95% probability the parameter is in this interval" — the parameter is fixed, the interval is random.

#### Hypothesis Testing Framework
H₀: null hypothesis (status quo). Hₐ: alternative hypothesis. p-value = P(observing data this extreme or more | H₀ true). Reject H₀ if p-value < α (significance level, usually 0.05). Test statistic: z = (x̄−μ₀)/(σ/√n). Two-tailed test: p-value = 2·P(Z > |z|).

#### Type I & Type II Errors
Type I (false positive): reject H₀ when true. P(Type I) = α. Type II (false negative): fail to reject H₀ when false. P(Type II) = β. Power = 1−β = P(correctly reject H₀). Increasing sample size reduces both errors. Increasing α reduces Type II but increases Type I.

#### Correlation vs. Causation
Correlation r measures linear association: r ∈ [−1, 1]. r² = coefficient of determination (% variance explained by linear model). Correlation does NOT imply causation — lurking variables, reverse causation, coincidence. Example: ice cream sales and drowning deaths are correlated (both driven by summer).

#### Review Questions
1. Sample of 36 students, x̄ = 72, σ = 12. Construct a 95% CI for the population mean.
2. H₀: μ = 50, σ = 10, n = 25, x̄ = 54. Compute the z-statistic and p-value (two-tailed).
3. Explain why "correlation implies causation" is a logical fallacy, with an example.

---
