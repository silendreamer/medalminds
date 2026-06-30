---
id: nsb-lesson-1902
title: "Greatest Common Divisor (GCD)"
level: hs
subject: math
topic: number-properties-divisibility
subtopic: "Number Properties & Divisibility"
slug: greatest-common-divisor
type: "Application"
estimatedMinutes: 14
keyConcepts: ["finding GCD", "Euclidean algorithm", "applications of GCD"]
summary: "Students will apply methods to find the GCD of two or more numbers and understand its applications."
---
### Introduction to GCD

The Greatest Common Divisor (GCD) of two or more integers is the largest positive integer that divides each of the numbers without leaving a remainder. Understanding the GCD is crucial in various mathematical applications, including simplifying fractions, finding least common multiples, and solving problems in number theory. The GCD can be found using several methods, with the most efficient being the Euclidean algorithm, which leverages the properties of divisibility.

### Methods for Finding GCD

One common method for finding the GCD is the prime factorization approach, where each number is expressed as a product of its prime factors. The GCD is then determined by multiplying the lowest powers of all prime factors common to both numbers. However, this method can be cumbersome for larger numbers, making the Euclidean algorithm a more practical choice, especially in competitive settings like the Science Bowl.

### The Euclidean Algorithm

The Euclidean algorithm is an efficient technique for computing the GCD of two integers, \( a \) and \( b \). It is based on the principle that the GCD of two numbers also divides their difference. The algorithm involves repeated division: divide \( a \) by \( b \), take the remainder \( r \), and replace \( a \) with \( b \) and \( b \) with \( r \). This process is repeated until \( b \) becomes zero; at that point, \( a \) will be the GCD.

### Applications of GCD

The GCD has several practical applications in mathematics and real-world problems. One significant application is in simplifying fractions, where the numerator and denominator are divided by their GCD to reduce the fraction to its simplest form. Additionally, the GCD is used in solving problems involving ratios, determining the largest size of identical groups that can be formed from a set of items, and in cryptography, particularly in algorithms like RSA.

### Properties of GCD

The GCD has several important properties that can simplify calculations. Firstly, the GCD is commutative, meaning \( \text{GCD}(a, b) = \text{GCD}(b, a) \). Secondly, it is associative, so \( \text{GCD}(a, \text{GCD}(b, c)) = \text{GCD}(\text{GCD}(a, b), c) \). Lastly, if \( a \) divides \( b \), then \( \text{GCD}(a, b) = a \). These properties can be leveraged to simplify complex GCD calculations.

### Practice Problems

To reinforce understanding, students should practice finding the GCD using both the prime factorization method and the Euclidean algorithm. For example, students can be given pairs of numbers such as (48, 180) and (56, 98) and asked to find their GCD using both methods. Additionally, students should explore real-life scenarios where GCD is applicable, such as determining the maximum number of equal-sized containers that can be filled with different volumes of liquid.

### Review Questions

1. What is the GCD of 56 and 98?
2. Describe the first step of the Euclidean algorithm when finding the GCD of 48 and 18.
3. If the GCD of two numbers is 1, what does this indicate about those numbers?

---
