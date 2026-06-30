---
id: nsb-lesson-1946
title: "Power Series and Taylor Series"
level: hs
subject: math
topic: infinite-series
subtopic: "Infinite Series"
slug: power-taylor-series
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["power series", "radius of convergence", "Taylor series", "Maclaurin series"]
summary: "Students will learn how to represent functions as power series and understand their convergence properties."
---
### Introduction to Power Series

A power series is an infinite series of the form \( \sum_{n=0}^{\infty} a_n (x - c)^n \), where \( a_n \) represents the coefficients, \( c \) is the center of the series, and \( x \) is a variable. Power series can be used to represent a wide variety of functions, including polynomials, exponential functions, and trigonometric functions. The convergence of a power series depends on the value of \( x \) and is characterized by its radius of convergence, which determines the interval within which the series converges to a function.

### Radius of Convergence

The radius of convergence \( R \) of a power series is found using the formula \( R = \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}} \). This radius indicates the distance from the center \( c \) within which the series converges. If \( |x - c| < R \), the series converges; if \( |x - c| > R \), it diverges; and if \( |x - c| = R \), the convergence must be tested separately. Understanding the radius of convergence is crucial for determining the validity of the power series representation of a function.

### Taylor Series

A Taylor series is a specific type of power series that represents a function \( f(x) \) around a point \( c \) using its derivatives at that point. The Taylor series is given by the formula \( f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(c)}{n!} (x - c)^n \), where \( f^{(n)}(c) \) is the \( n \)-th derivative of \( f \) evaluated at \( c \). This series provides a polynomial approximation of the function, and the more terms included, the closer the approximation is to the actual function within the radius of convergence.

### Maclaurin Series

The Maclaurin series is a special case of the Taylor series where the center \( c \) is zero. It is expressed as \( f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!} x^n \). This series is particularly useful for approximating functions near the origin and is commonly used for functions like \( e^x \), \( \sin(x) \), and \( \cos(x) \). The Maclaurin series can simplify calculations and provide insights into the behavior of functions near zero.

### Convergence of Power Series

The convergence of power series can be analyzed using various tests, such as the Ratio Test and the Root Test. The Ratio Test involves examining the limit \( L = \lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| \); if \( L < 1 \), the series converges absolutely. The Root Test, on the other hand, looks at \( L = \lim_{n \to \infty} \sqrt[n]{|a_n|} \) and provides similar conclusions regarding convergence. Understanding these tests is essential for determining the behavior of power series in different contexts.

### Applications of Power Series

Power series and their derivatives are widely used in mathematics and applied sciences. They allow for the approximation of complex functions, making them invaluable in numerical methods, physics, and engineering. For example, power series can be used to solve differential equations, model physical phenomena, and perform calculations in calculus. Mastery of power series enables students to tackle a variety of problems across different scientific disciplines.

### Review Questions

1. What is the general form of a power series?
2. How is the radius of convergence calculated for a power series?
3. What is the difference between a Taylor series and a Maclaurin series?

---
