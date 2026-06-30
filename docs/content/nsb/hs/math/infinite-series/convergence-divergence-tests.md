---
id: nsb-lesson-1945
title: "Convergence and Divergence of Series"
level: hs
subject: math
topic: infinite-series
subtopic: "Infinite Series"
slug: convergence-divergence-tests
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["convergence tests", "divergence tests", "geometric series", "p-series"]
summary: "Students will understand how to determine the convergence or divergence of infinite series using various tests."
---
### Introduction to Infinite Series

An infinite series is the sum of the terms of an infinite sequence. Mathematically, it is expressed as \( S = a_1 + a_2 + a_3 + \ldots \), where \( a_n \) represents the terms of the sequence. Understanding whether an infinite series converges (approaches a finite limit) or diverges (grows without bound) is crucial in calculus and higher mathematics. This lesson will explore various convergence and divergence tests to help students analyze infinite series effectively.

### Convergence Tests

To determine if an infinite series converges, several tests can be applied. The **Ratio Test** examines the limit of the absolute value of the ratio of consecutive terms, \( L = \lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| \). If \( L < 1 \), the series converges; if \( L > 1 \) or \( L = \infty \), it diverges; and if \( L = 1 \), the test is inconclusive. Other tests include the **Root Test**, **Comparison Test**, and **Limit Comparison Test**, each suited for different types of series.

### Divergence Tests

Before applying more complex tests, the **Divergence Test** (or nth-term test) is a fundamental tool. It states that if the limit of the terms \( a_n \) does not approach zero as \( n \) approaches infinity, i.e., \( \lim_{n \to \infty} a_n \neq 0 \), then the series diverges. This test is simple yet powerful, as it can quickly eliminate many series from consideration. However, if the limit does equal zero, the series may still converge or diverge, necessitating further testing.

### Geometric Series

A geometric series is a specific type of infinite series where each term is a constant multiple of the previous term, expressed as \( S = a + ar + ar^2 + ar^3 + \ldots \). The series converges if the absolute value of the common ratio \( r \) is less than 1, with the sum given by \( S = \frac{a}{1 - r} \). If \( |r| \geq 1 \), the series diverges. Recognizing geometric series is essential for quickly determining convergence and calculating sums.

### p-Series

A **p-series** is another important category of infinite series defined as \( S = \sum_{n=1}^{\infty} \frac{1}{n^p} \), where \( p \) is a positive constant. The convergence of a p-series depends on the value of \( p \): it converges if \( p > 1 \) and diverges if \( p \leq 1 \). This property makes p-series a useful benchmark for comparison tests, allowing students to analyze more complex series by relating them to p-series.

### Summary of Tests

In summary, understanding the various tests for convergence and divergence is crucial for analyzing infinite series. The Divergence Test provides a quick check for divergence, while the Ratio and Root Tests are effective for series with factorials or exponentials. Geometric and p-series offer specific cases that simplify the process of determining convergence. Mastery of these concepts equips students with the tools necessary for tackling problems in calculus and beyond.

### Review Questions

1. What is the condition for a geometric series to converge?
2. State the Divergence Test and its implication for an infinite series.
3. For a p-series, what value of \( p \) indicates divergence?

---
