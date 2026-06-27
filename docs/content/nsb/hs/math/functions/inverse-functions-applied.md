---
id: nsb-lesson-0656
title: "Inverse Functions: Applied Problems"
level: hs
subject: math
topic: functions
subtopic: "Composition & Inverse Functions"
slug: inverse-functions-applied
type: "Application"
estimatedMinutes: 13
keyConcepts: ["inverse in context", "temperature conversion", "decoding functions"]
summary: "Inverses arise naturally when you need to \"undo\" a process — from converting units to decoding encoded messages."
---
#### Temperature Conversion
F = (9/5)C + 32 converts Celsius to Fahrenheit. The inverse converts Fahrenheit to Celsius. Swap C and F: C = (9/5)F + 32. Solve for F (now our output): C − 32 = (9/5)F → F = (5/9)(C−32). So Celsius to Fahrenheit: F = (9/5)C + 32. Fahrenheit to Celsius: C = (5/9)(F−32). These are inverses of each other. Use C = (5/9)(212−32) = (5/9)(180) = 100°C for boiling water. ✓

#### Compound Interest Inversion
A = P·e^(rt) gives the amount after t years (continuous compounding). To find t given A: t = ln(A/P)/r. This is the inverse function with t as the output. If P = $1000, r = 0.06, and you want A = $2000: t = ln(2)/0.06 ≈ 11.55 years. The inverse "undoes" the exponential growth to find time.

#### Supply/Demand Inverse
A demand function gives quantity demanded as a function of price: Q = 100 − 2P. The inverse gives price as a function of quantity (the "inverse demand" in economics): 2P = 100 − Q → P = 50 − Q/2. Economists frequently work with the inverse demand curve — same information, different variable solved for.

#### Composition as Verification in Context
Fahrenheit → Kelvin: K = F·(5/9) + 255.37 (approximately). Kelvin → Fahrenheit: F = (K − 255.37)·(9/5). Compose them to verify: F → K → F should return the original F. ([(F·5/9+255.37) − 255.37]·9/5 = F·5/9·9/5 = F. ✓) Composition verification is the rigorous check.

#### Review Questions
1. The function V(t) = 5000(0.85)^t gives a car's value after t years. Find t when V = 2000. What does the inverse function V⁻¹ mean in context?
2. A code shifts each letter by k positions in the alphabet. Write the encoding function and its inverse.
3. If f(x) = 2x + 1 and g is the inverse of f, compute g(f(g(7))).

---
