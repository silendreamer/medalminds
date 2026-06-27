---
id: nsb-lesson-0702
title: "De Moivre's Theorem and Complex Numbers in Polar Form"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: de-moivre-theorem
type: "Application"
estimatedMinutes: 15
keyConcepts: ["complex polar form", "De Moivre's theorem", "powers and roots"]
summary: "Complex numbers in polar form z = r(cos θ + i sin θ) simplify exponentiation."
---
#### Polar Form of Complex Numbers
A complex number z = x + iy can be written in polar form z = r(cos θ + i sin θ) = r cis θ, where r = |z| = √(x²+y²) and θ = arg(z) = arctan(y/x) (adjusted for quadrant). Example: z = 1 + i has r = √2 and θ = π/4, so z = √2 cis(π/4) = √2(cos(π/4) + i sin(π/4)).

#### De Moivre's Theorem
For any positive integer n, (r cis θ)^n = r^n cis(nθ). Example: (1+i)^8 = (√2 cis(π/4))^8 = (√2)^8 cis(8π/4) = 16 cis(2π) = 16(cos(2π) + i sin(2π)) = 16·1 = 16. This is far faster than expanding (1+i)^8 algebraically. For negative n, (z)^(−n) = 1/z^n. For fractional n = p/q, z^(p/q) represents the q-th root(s) of z^p.

#### Finding Roots of Complex Numbers
The n-th roots of z = r cis θ are z^(1/n) = r^(1/n) cis((θ + 2πk)/n) for k = 0, 1, ..., n−1. Example: find the cube roots of 8. Here, 8 = 8 cis(0), r = 8, θ = 0. The cube roots are: 2 cis(0) = 2, 2 cis(2π/3) = 2(−1/2 + i√3/2) = −1 + i√3, and 2 cis(4π/3) = 2(−1/2 − i√3/2) = −1 − i√3. These three values have product 2·(−1+i√3)·(−1−i√3) = 2·2 = 8 ... wait, that's not right; let me recalculate. Actually, their product is 8 and their sum is 0. In polar form, finding roots is straightforward; in Cartesian form, it requires solving cubic equations.

#### Euler's Formula and Exponential Form
Euler's formula states e^(iθ) = cos θ + i sin θ. So z = r cis θ can be written z = r e^(iθ). De Moivre becomes z^n = r^n e^(inθ). This exponential notation is more compact and makes differentiation and integration of complex functions natural. The identity e^(iπ) + 1 = 0 is one of mathematics' most beautiful equations.

#### Review Questions
1. Convert 3 − 3i to polar form.
2. Compute (1 + i)^6 using De Moivre's theorem.
3. Find all fourth roots of −1 and express them in Cartesian form.

---
