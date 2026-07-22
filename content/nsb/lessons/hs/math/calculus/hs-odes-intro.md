---
id: nsb-lesson-0721
title: "What Is a Differential Equation?"
level: hs
subject: math
topic: calculus
subtopic: "Differential Equations (Introduction)"
slug: hs-odes-intro
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["differential equation", "general solution", "initial condition"]
summary: "A differential equation relates a function to its derivatives; solving one means finding the family of functions that satisfies the relationship."
---
#### Differential Equations in Context
A differential equation (DE) involves an unknown function y and its derivatives (y', y'', etc.). Order = highest derivative present. A general solution contains arbitrary constants; an initial condition pins the particular solution. DEs model exponential growth (population, compound interest), radioactive decay, cooling, and spring motion — all Science Bowl favorites.

#### Separable Equations
A first-order DE of the form dy/dx = f(x)·g(y) is separable. Separate variables: dy/g(y) = f(x) dx, then integrate both sides. Example: dy/dx = 2xy. → dy/y = 2x dx → ln|y| = x² + C → y = Ae^(x²), where A = ±eᶜ. Initial condition y(0) = 3: 3 = A·e⁰ = A → y = 3e^(x²).

#### Exponential Growth & Decay
dy/dt = ky has solution y = y₀eᵏᵗ. If k > 0: growth (population, compound interest). If k < 0: decay (radioactive decay, Newton's law of cooling). Half-life: t_{1/2} = ln(2)/|k|. Example: Radioactive substance with half-life 10 years. y₀ = 100g, find amount after 30 years. k = −ln2/10. y(30) = 100·e^(−3ln2) = 100/8 = 12.5g.

#### Newton's Law of Cooling
dT/dt = −k(T−T_env). Solution: T(t) = T_env + (T₀−T_env)e^(−kt). A cup at 90°C cools in 20°C air; after 5 min it's 70°C. Find T after 15 min. 70 = 20+70e^(−5k) → e^(−5k) = 50/70 = 5/7 → k = ln(7/5)/5. T(15) = 20+70·(5/7)³ = 20+70·(125/343) ≈ 20+25.5 ≈ 45.5°C.

#### Review Questions
1. Solve dy/dx = y/x with initial condition y(1) = 2.
2. A population grows at 5% per year. Starting with 1000, when does it reach 4000?
3. Distinguish between a general solution and a particular solution of a DE.

---
