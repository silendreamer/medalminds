---
id: nsb-lesson-0502
title: "Improving Real Engine Efficiency: Engineering Approaches"
level: hs
subject: energy
topic: thermodynamics-energy-laws
subtopic: "Heat Engines, Carnot Cycle & Efficiency"
slug: improving-real-engine-efficiency
type: "Application"
estimatedMinutes: 13
keyConcepts: ["superheat", "reheat", "regeneration", "intercooling"]
summary: "Explore the engineering techniques used in real power plants to approach the Carnot limit — from supercritical steam to combined-cycle design."
---
#### Superheating and Reheat
In a basic Rankine cycle, steam is generated and sent directly to the turbine. Superheating raises steam temperature above saturation at the same pressure, increasing the average temperature at which heat is added (pushing average T_H higher, closer to Carnot limit). Reheat takes partially expanded steam, returns it to the boiler for reheating, then expands it further. Superheat + reheat together can add 4–8 percentage points of efficiency over a basic Rankine cycle. Modern supercritical plants operate at ~600°C and 25–35 MPa, with efficiencies of 45–47%.

#### Regeneration
Regeneration uses exhaust heat (that would otherwise be wasted in the condenser) to preheat the working fluid before it enters the boiler. In a Rankine cycle, steam bled from intermediate stages of the turbine preheats the feedwater in heat exchangers called feedwater heaters. This reduces the amount of external heat (Q_H) needed, increasing efficiency. The ideal regenerative Rankine cycle with infinite feedwater heaters approaches Carnot efficiency. Practical plants use 5–8 feedwater heaters, gaining 5–10 percentage points of efficiency.

#### Intercooling and Multi-Stage Compression
In Brayton cycle gas turbines, compression generates significant heat. Intercooling splits compression into stages with intermediate cooling, reducing the work required for compression (approaching isothermal compression, which requires less work than adiabatic). This allows more net work output for the same fuel input. Combined with regeneration (using turbine exhaust heat to preheat combustor inlet air), intercooled regenerative Brayton cycles can approach 55% efficiency as simple-cycle systems.

#### Combined Cycle: The Practical Leader
Combined-cycle gas turbine (CCGT) plants are today's most efficient large-scale power generation technology. A gas turbine (Brayton cycle, ~40% efficiency) exhausts at ~600°C; a heat recovery steam generator (HRSG) captures this exhaust and drives a steam turbine (Rankine cycle, ~30% efficiency from the remaining heat). Together: efficiency ≈ 0.40 + (1 − 0.40) × 0.30 = 58–62%. GE's 7HA and Siemens SGT5-9000HL gas turbines power the most efficient commercial CCGTs, with demonstrated efficiencies above 63%.

#### DOE's Role in Efficiency R&D
DOE's Office of Fossil Energy funds the Turbine Technology program, which develops turbine blade materials (nickel superalloys, thermal barrier coatings, ceramic matrix composites) enabling higher firing temperatures. Each 100°C increase in turbine inlet temperature (TIT) adds approximately 1.5% efficiency. DOE also funds research on supercritical CO₂ (sCO₂) Brayton cycles, which may achieve >50% efficiency with a smaller, cheaper turbine than steam.

#### Review Questions
1. Why does superheat improve Rankine cycle efficiency in terms of the Carnot argument (average T_H)?
2. How does regeneration differ from reheat in a Rankine cycle? What does each technique improve?
3. Calculate the approximate combined-cycle efficiency if the gas turbine achieves 38% and the bottoming steam cycle achieves 28% of the remaining heat.

---
