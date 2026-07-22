---
id: nsb-lesson-1928
title: "Exploring Geometric Series"
level: hs
subject: math
topic: sequences-series
subtopic: "Sequences & Series"
slug: exploring-geometric-series
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["common ratio", "geometric series formula", "infinite series convergence"]
summary: "Students will learn to analyze geometric series and apply formulas to find sums and determine convergence."
---
### Introduction to Geometric Series

A geometric series is a series of terms in which each term after the first is found by multiplying the previous term by a fixed, non-zero number called the common ratio (r). The general form of a geometric series can be expressed as \( a, ar, ar^2, ar^3, \ldots \), where \( a \) is the first term. Understanding geometric series is crucial in various fields such as finance, physics, and computer science, where exponential growth or decay is modeled.

### The Geometric Series Formula

The sum \( S_n \) of the first \( n \) terms of a geometric series can be calculated using the formula:

\[
S_n = a \frac{1 - r^n}{1 - r} \quad \text{(if } r \neq 1\text{)}
\]

In this formula, \( a \) represents the first term, \( r \) is the common ratio, and \( n \) is the number of terms. If the common ratio \( r \) is equal to 1, the series simply sums to \( n \times a \). This formula allows for quick calculations of sums without needing to add each term individually.

### Infinite Geometric Series

An infinite geometric series occurs when the number of terms approaches infinity. The sum \( S \) of an infinite geometric series can be computed if the absolute value of the common ratio \( |r| < 1 \) using the formula:

\[
S = \frac{a}{1 - r}
\]

In this case, the series converges to a finite value. If \( |r| \geq 1 \), the series diverges, meaning it does not approach a finite limit as more terms are added.

### Convergence and Divergence

The concept of convergence is essential in understanding the behavior of geometric series. A series converges if the sum approaches a specific value as the number of terms increases. For geometric series, if the common ratio \( r \) lies between -1 and 1 (i.e., \( -1 < r < 1 \)), the series converges to a finite sum. Conversely, if \( r \) is outside this range, the series diverges, leading to sums that grow indefinitely.

### Applications of Geometric Series

Geometric series have numerous applications in real-world scenarios. For example, they are used in calculating the present value of annuities in finance, modeling population growth, and analyzing algorithms in computer science. Understanding how to manipulate and apply geometric series can provide valuable insights into exponential growth patterns and their implications in various fields.

### Example Problems

To solidify understanding, consider the following example: If the first term of a geometric series is 5 and the common ratio is 2, what is the sum of the first 4 terms? Using the formula:

\[
S_4 = 5 \frac{1 - 2^4}{1 - 2} = 5 \frac{1 - 16}{-1} = 5 \times 15 = 75
\]

This example illustrates the application of the geometric series formula effectively. Another example could involve an infinite series where \( a = 3 \) and \( r = \frac{1}{2} \). The sum would be:

\[
S = \frac{3}{1 - \frac{1}{2}} = 3 \times 2 = 6
\]

### Review Questions

1. What is the formula for the sum of the first \( n \) terms of a geometric series?
2. Under what condition does an infinite geometric series converge?
3. If the first term of a geometric series is 4 and the common ratio is 3, what is the sum of the first 3 terms?

---
