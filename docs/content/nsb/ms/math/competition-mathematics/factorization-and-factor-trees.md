---
id: nsb-lesson-1400
title: "Factorization and Factor Trees"
level: ms
subject: math
topic: competition-mathematics
subtopic: "Number Theory Basics"
slug: factorization-and-factor-trees
type: "Application"
estimatedMinutes: 12
keyConcepts: ["prime factorization", "factor trees", "unique factorization", "efficiency"]
summary: "Every integer has a unique prime factorization; factor trees visually show the process."
---
#### Prime Factorization Method
To factor 72: 72 = 8 × 9 = 2³ × 3². Use a factor tree: 72 splits into 8 and 9, 8 splits into 2, 2, 2, and 9 splits into 3, 3. Collecting: 2³ × 3² = 72.

#### Systematic Factorization
Divide by smallest primes repeatedly. 210 ÷ 2 = 105. 105 ÷ 3 = 35. 35 ÷ 5 = 7. 7 is prime. So 210 = 2 × 3 × 5 × 7. This systematic approach ensures you don't miss factors.

#### Number of Divisors Formula
If n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ, the number of divisors is (a₁ + 1)(a₂ + 1)...(aₖ + 1). Example: 72 = 2³ × 3² has (3 + 1)(2 + 1) = 12 divisors. They are: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72. Check: 12 divisors ✓.

#### Sum of Divisors Formula
The sum of divisors is (p₁^(a₁+1) - 1)/(p₁ - 1) × (p₂^(a₂+1) - 1)/(p₂ - 1) × .... For 72 = 2³ × 3²: sum = [(2⁴ - 1)/(2 - 1)] × [(3³ - 1)/(3 - 1)] = 15 × 13 = 195. Indeed: 1+2+3+4+6+8+9+12+18+24+36+72 = 195 ✓.

#### Review Questions
1. What is the prime factorization of 210?
2. How many divisors does 72 have?
3. What is the sum of divisors of 72?

---
