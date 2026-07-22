---
id: nsb-lesson-0505
title: "The Otto Cycle: How Gasoline Engines Work"
level: hs
subject: energy
topic: thermodynamics-energy-laws
subtopic: "Thermodynamic Cycles (Otto, Diesel, Brayton, Rankine)"
slug: otto-cycle-gasoline-engines
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["Otto cycle stages", "compression ratio", "thermal efficiency"]
summary: "Understand the four-stroke gasoline engine through the lens of the Otto thermodynamic cycle and learn what controls its efficiency."
---
#### The Four-Stroke Otto Cycle
The Otto cycle models the 4-stroke gasoline (spark-ignition) engine. Ideal Otto cycle: (1) Intake stroke — not part of the thermodynamic cycle; fresh air-fuel mixture enters. (2) Compression stroke — adiabatic compression from V_max to V_min; temperature and pressure rise sharply. (3) Power (expansion) stroke — spark ignites fuel; heat added at nearly constant volume (very rapid combustion); gas expands adiabatically, pushing piston down. (4) Exhaust stroke — exhaust valve opens; burnt gas exits at constant volume (idealized heat rejection); piston returns to start. The cycle repeats at 1,000–8,000 RPM in a car engine.

#### Compression Ratio and Efficiency
Otto cycle thermal efficiency: η_Otto = 1 − 1/r^(γ−1), where r = compression ratio (V_max/V_min) and γ = heat capacity ratio (≈1.4 for air). Higher compression ratio → higher efficiency. A typical gasoline engine has r ≈ 10, giving η ≈ 1 − 1/10^0.4 = 1 − 1/2.51 ≈ 60% — but this is the ideal Otto efficiency. Real gasoline engines achieve only 25–35% due to friction, heat losses, imperfect combustion, and non-ideal gas behavior. Compression ratio is limited by "knock" (pre-ignition), which damages the engine; higher octane fuel resists knock, allowing higher r.

#### Comparing Otto to Diesel
The Diesel cycle adds heat at constant pressure (not constant volume like Otto) and has no spark plug — it relies on compression heating to ignite fuel. Diesel engines use higher compression ratios (r ≈ 16–22 vs. 10–12 for gasoline), giving higher ideal efficiency. Ideal Diesel efficiency: η_Diesel = 1 − (1/r^(γ−1)) × [(r_c^γ − 1)/(γ(r_c − 1))], where r_c is the cutoff ratio (fraction of stroke over which combustion occurs). For the same compression ratio, Otto is more efficient, but Diesel's higher achievable r wins in practice: real diesel engines achieve 35–45%, vs. 25–35% for gasoline.

#### Real Engine Losses
Gap between ideal Otto and real engine: friction in pistons and bearings (~5-10%), heat loss through cylinder walls (~20%), incomplete combustion (~5%), pumping losses (~5%). Engineers reduce these through: low-friction coatings, cylinder deactivation on partial load, turbocharging (raises effective compression ratio), direct fuel injection, and variable valve timing. Modern high-efficiency gasoline engines (Atkinson/Miller cycle) can exceed 40% peak efficiency.

#### Bowl Notes
Science Bowl questions on internal combustion engines often test: which cycle (Otto vs. Diesel), what controls efficiency (compression ratio, γ), and the four strokes. Know: Otto = constant volume combustion = spark ignition = gasoline. Diesel = constant pressure combustion = compression ignition = diesel fuel.

#### Review Questions
1. Calculate the ideal Otto cycle efficiency for a compression ratio of 8 (assume γ = 1.4).
2. Why can diesel engines use higher compression ratios than gasoline engines? How does this affect their efficiency?
3. List three sources of loss that cause real gasoline engines to perform far below their ideal Otto efficiency.

---
