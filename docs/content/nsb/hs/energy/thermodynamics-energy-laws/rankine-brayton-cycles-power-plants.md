---
id: nsb-lesson-0506
title: "The Rankine and Brayton Cycles: Power Plant Thermodynamics"
level: hs
subject: energy
topic: thermodynamics-energy-laws
subtopic: "Thermodynamic Cycles (Otto, Diesel, Brayton, Rankine)"
slug: rankine-brayton-cycles-power-plants
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["Rankine cycle details", "Brayton cycle details", "efficiency comparison"]
summary: "Master the two cycles that power the world's electricity grid — the Rankine steam cycle and the Brayton gas turbine cycle — with quantitative depth appropriate for Science Bowl."
---
#### Rankine Cycle: Deep Dive
The Rankine cycle operates on a condensable working fluid (usually water). The four stages on a T-s diagram: (1) 1→2: Pump — liquid water is compressed isentropically (adiabatically, reversibly) from condenser pressure to boiler pressure; tiny work input (liquid is nearly incompressible). (2) 2→3: Boiler — water is heated at constant pressure: first as subcooled liquid, then as two-phase mixture (boiling), then as superheated steam; large Q_H input. (3) 3→4: Turbine — steam expands isentropically, doing work; temperature and pressure drop. (4) 4→1: Condenser — exhaust steam condenses at constant pressure, rejecting Q_C. Efficiency = W_net / Q_H = (W_turbine − W_pump) / Q_H.

#### Ideal Rankine Efficiency Calculation
For a simple Rankine cycle with steam entering the turbine at 500°C, 10 MPa and condensing at 50°C (0.012 MPa): using steam tables, h₁ ≈ 209 kJ/kg, h₂ ≈ 220 kJ/kg, h₃ ≈ 3,374 kJ/kg, h₄ ≈ 2,240 kJ/kg. W_turbine = h₃ − h₄ = 1,134 kJ/kg. W_pump = h₂ − h₁ = 11 kJ/kg. Q_H = h₃ − h₂ = 3,154 kJ/kg. η = (1,134 − 11)/3,154 = 35.6%. Compare to Carnot: 1 − 323/773 = 58.2%. The gap illustrates real losses from irreversibilities and condensation considerations.

#### Brayton Cycle: Deep Dive
Brayton cycle on a T-s diagram: (1) 1→2: Compressor — air is compressed isentropically; temperature rises from T₁ to T₂. (2) 2→3: Combustor — fuel burns at constant pressure, raising temperature from T₂ to T₃ (turbine inlet temperature, TIT). (3) 3→4: Turbine — combustion products expand isentropically, driving both the compressor and generator; temperature drops from T₃ to T₄. (4) 4→1: Exhaust (or regenerator) — hot exhaust exits. Brayton efficiency: η = 1 − T₁/T₂ = 1 − 1/r_p^((γ−1)/γ), where r_p is the pressure ratio. Higher pressure ratio → higher efficiency (for simple Brayton); higher TIT → more work for same pressure ratio.

#### Temperature Relationships in Brayton
For isentropic compression: T₂/T₁ = (P₂/P₁)^((γ−1)/γ). With r_p = 15 (typical gas turbine) and γ = 1.4: T₂/T₁ = 15^0.286 = 2.17. If T₁ = 300 K, then T₂ = 651 K — the air exiting the compressor is already at 378°C before fuel is added. TIT for modern gas turbines reaches 1,400–1,600°C (1,673–1,873 K), enabled by blade cooling with compressed air and thermal barrier coatings.

#### Backwork Ratio
A key Brayton characteristic: the backwork ratio = W_compressor / W_turbine. For air (γ = 1.4), this ratio is typically 40–60% — the compressor consumes a huge fraction of turbine output. For steam (Rankine), the pump backwork ratio is < 1% because pumping liquid requires far less work than compressing a gas. This is why Brayton cycles need very high TIT to produce net work, while Rankine cycles are efficient at lower temperature ranges.

#### Review Questions
1. Why does the Rankine cycle use a pump rather than a compressor to pressurize its working fluid, and what is the thermodynamic advantage?
2. A Brayton cycle has a pressure ratio of 12 and intake temperature of 300 K. Calculate the temperature after isentropic compression (γ = 1.4).
3. What is backwork ratio, and why is it much higher in Brayton than Rankine cycles?

---
