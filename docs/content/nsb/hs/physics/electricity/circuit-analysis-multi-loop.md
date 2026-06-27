---
id: nsb-lesson-0921
title: "Circuit Analysis: Multi-Loop Problem"
level: hs
subject: physics
topic: electricity
subtopic: "DC Circuits (Ohm's Law, Kirchhoff's Laws)"
slug: circuit-analysis-multi-loop
type: "Application"
estimatedMinutes: 15
keyConcepts: ["KVL", "KCL", "simultaneous equations", "multi-loop circuit", "internal resistance"]
summary: "A two-loop circuit requires simultaneous application of KCL and KVL to find all unknown currents."
---
#### Setup
Two batteries and three resistors: ε₁ = 12 V (internal resistance r₁ = 1 Ω) in the left branch; ε₂ = 6 V (r₂ = 0.5 Ω) in the right branch; R = 10 Ω in the middle branch. Assign currents: I₁ (left branch, downward), I₂ (right branch, downward), I₃ (middle branch).

#### KCL at Top Node
I₁ + I₂ = I₃ (or I₃ flows downward, I₁ and I₂ are the sources)

#### KVL — Left Loop (clockwise)
ε₁ − I₁r₁ − I₃R = 0 → 12 − I₁(1) − 10I₃ = 0

#### KVL — Right Loop (clockwise)
ε₂ − I₂r₂ − I₃R = 0 → 6 − 0.5I₂ − 10I₃ = 0

#### Solving the System
From KCL: I₃ = I₁ + I₂. Substitute into the two KVL equations:
12 = I₁ + 10(I₁+I₂) = 11I₁ + 10I₂ … (1)
6 = 0.5I₂ + 10(I₁+I₂) = 10I₁ + 10.5I₂ … (2)
From (2): I₁ = (6 − 10.5I₂)/10. Substitute into (1): 12 = 11(6−10.5I₂)/10 + 10I₂.
Solving: I₂ ≈ 0.364 A; I₁ ≈ 0.218 A; I₃ ≈ 0.582 A.

#### Review Questions
1. Verify the solution by substituting back into both KVL equations.
2. What terminal voltage does each battery deliver (V_terminal = ε − Ir)?
3. How much power is dissipated in the 10 Ω resistor?

---
