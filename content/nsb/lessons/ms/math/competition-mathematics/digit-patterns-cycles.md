---
id: nsb-lesson-1402
title: "Digit Patterns and Cycles"
level: ms
subject: math
topic: competition-mathematics
subtopic: "Pattern Recognition"
slug: digit-patterns-cycles
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["last digit", "cycles", "periodicity", "powers"]
summary: "Powers have repeating patterns in their last digits; recognizing cycles enables quick computation."
---
#### Last Digit of Powers of 2
2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16 (last digit 6), 2⁵ = 32 (last digit 2). Pattern repeats: 2, 4, 8, 6, 2, 4, 8, 6, .... Cycle length is 4. To find the last digit of 2^15: 15 mod 4 = 3, so it's the 3rd in the cycle: 8. (Indeed, 2^15 = 32,768.)

#### Last Digit of Powers of 3
3¹ = 3, 3² = 9, 3³ = 27 (last digit 7), 3⁴ = 81 (last digit 1), 3⁵ = 243 (last digit 3). Pattern: 3, 9, 7, 1, repeating with cycle 4. Last digit of 3^20: 20 mod 4 = 0, so it's the 4th in the cycle: 1.

#### Last Digit of Powers of 7
7¹ = 7, 7² = 49 (last digit 9), 7³ = 343 (last digit 3), 7⁴ = 2,401 (last digit 1), 7⁵ = 16,807 (last digit 7). Pattern: 7, 9, 3, 1, cycle 4. Last digit of 7^100: 100 mod 4 = 0, so it's 1.

#### Last Digit of Powers of 6 and 5
Powers of 6: 6, 36, 216, 1296, ... Last digit always 6 (no cycle, constant). Powers of 5: 5, 25, 125, 625, ... Last digit always 5. Last digit of 6^100 = 6. Last digit of 5^1000 = 5.

#### Cycles of Other Powers
Every integer 0-9 has a repeating pattern in its powers' last digits. Cycle lengths: 1 (digits 0, 1, 5, 6), 2 (digits 4, 9), 4 (digits 2, 3, 7, 8). Knowing these cycles allows instant calculation of large powers' last digits without computing the full power.

#### Review Questions
1. What is the last digit of 2^21?
2. What is the last digit of 3^17?
3. Why is the last digit of 5^n always 5?

---
