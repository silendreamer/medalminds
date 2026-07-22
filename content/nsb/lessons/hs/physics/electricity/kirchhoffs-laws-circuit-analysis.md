---
id: nsb-lesson-0920
title: "Kirchhoff's Laws and Circuit Analysis"
level: hs
subject: physics
topic: electricity
subtopic: "DC Circuits (Ohm's Law, Kirchhoff's Laws)"
slug: kirchhoffs-laws-circuit-analysis
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["Kirchhoff's current law", "Kirchhoff's voltage law", "loop rule", "junction rule", "series/parallel resistors"]
summary: "Kirchhoff's two laws — junction rule (charge conservation) and loop rule (energy conservation) — provide a systematic method to solve any DC circuit."
---
#### Kirchhoff's Current Law (KCL) — Junction Rule
At any junction (node) in a circuit, the sum of currents entering equals the sum leaving: ΣI_in = ΣI_out. This is charge conservation — current cannot accumulate at a node. In series circuits, the same current flows through all elements.

#### Kirchhoff's Voltage Law (KVL) — Loop Rule
Around any closed loop, the sum of all potential differences is zero: ΣΔV = 0. This is energy conservation — a charge returning to its starting point undergoes no net change in potential. Sign convention: rise across battery (from − to +): +ε. Drop across resistor (in current direction): −IR.

#### Series Resistors
R_series = R₁ + R₂ + R₃ + … Voltages add; current is the same. Voltage divider: V_i = V_total × (R_i / R_total).

#### Parallel Resistors
1/R_parallel = 1/R₁ + 1/R₂ + … Currents add; voltage is the same. For two resistors: R = R₁R₂/(R₁+R₂). Current divider: I_i = I_total × (R_total / R_i).

#### Multi-Loop Example
For a circuit with two loops, two batteries, three resistors — set up KCL at one junction and KVL for two loops. Solve the system of equations. Always define current directions before starting; if a result is negative, the current actually flows in the opposite direction.

#### Review Questions
1. State KCL and KVL in words and write the mathematical statement of each.
2. Three resistors (4 Ω, 6 Ω, 12 Ω) are connected in parallel across 12 V. Find the current through each and the total current.
3. Write the KVL equation for a single loop with a 9 V battery, a 3 Ω resistor, and a 6 Ω resistor in series.

---
