---
id: nsb-lesson-1930
title: "Calculating Limits Algebraically"
level: hs
subject: math
topic: limits-and-approximations
subtopic: "Limits & Approximations"
slug: calculating-limits-algebraically
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["algebraic manipulation", "L'Hôpital's rule", "squeeze theorem", "indeterminate forms"]
summary: "Students will learn how to compute limits algebraically using various techniques including L'Hôpital's rule and the squeeze theorem."
---
### Understanding Limits

Limits are fundamental concepts in calculus that describe the behavior of functions as they approach a certain point. They are essential for understanding continuity, derivatives, and integrals. A limit can be approached from the left (denoted as \( \lim_{x \to c^-} f(x) \)) or from the right (denoted as \( \lim_{x \to c^+} f(x) \)). The overall limit exists if both one-sided limits are equal.

### Indeterminate Forms

When calculating limits, certain expressions can lead to indeterminate forms, such as \( \frac{0}{0} \) or \( \frac{\infty}{\infty} \). These forms indicate that further analysis is needed to determine the limit's value. Recognizing these forms is crucial, as they signal the potential need for algebraic manipulation or the application of L'Hôpital's rule. Other indeterminate forms include \( 0 \cdot \infty \), \( \infty - \infty \), \( 0^0 \), \( 1^\infty \), and \( \infty^0 \).

### Algebraic Manipulation Techniques

One of the primary methods for calculating limits is through algebraic manipulation. This can involve factoring polynomials, simplifying rational expressions, or rationalizing the numerator or denominator. For example, if you encounter a limit that results in \( \frac{0}{0} \), factoring the numerator and denominator may allow for cancellation of common terms, simplifying the expression to evaluate the limit. 

### L'Hôpital's Rule

L'Hôpital's rule is a powerful tool for resolving indeterminate forms. It states that if \( \lim_{x \to c} f(x) = 0 \) and \( \lim_{x \to c} g(x) = 0 \) (or both approach infinity), then \( \lim_{x \to c} \frac{f(x)}{g(x)} = \lim_{x \to c} \frac{f'(x)}{g'(x)} \), provided the limit on the right exists. This rule can be applied repeatedly if the resulting limit still yields an indeterminate form. It is particularly useful for functions that are difficult to manipulate algebraically.

### The Squeeze Theorem

The squeeze theorem is another method for evaluating limits, especially when direct substitution leads to indeterminate forms. If you can find two functions, \( g(x) \) and \( h(x) \), such that \( g(x) \leq f(x) \leq h(x) \) for all \( x \) near \( c \), and if \( \lim_{x \to c} g(x) = \lim_{x \to c} h(x) = L \), then \( \lim_{x \to c} f(x) = L \). This theorem is particularly useful for functions that oscillate between two bounds, such as \( \sin(x) \) or \( \cos(x) \).

### Practical Examples

To solidify understanding, consider the limit \( \lim_{x \to 0} \frac{\sin(x)}{x} \). Direct substitution gives \( \frac{0}{0} \), an indeterminate form. Using the squeeze theorem, since \( -1 \leq \frac{\sin(x)}{x} \leq 1 \) for \( x \) near 0, we can conclude that the limit is 1. Another example is \( \lim_{x \to 1} \frac{x^2 - 1}{x - 1} \), which simplifies to \( \lim_{x \to 1} (x + 1) = 2 \) after factoring.

### Review Questions

1. What is the definition of an indeterminate form in the context of limits?
2. State L'Hôpital's rule and its conditions for application.
3. Describe the squeeze theorem and provide a scenario where it might be used to evaluate a limit.

---
