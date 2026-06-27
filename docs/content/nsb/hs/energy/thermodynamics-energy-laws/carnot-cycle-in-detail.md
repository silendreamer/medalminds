---
id: nsb-lesson-0501
title: "The Carnot Cycle in Detail"
level: hs
subject: energy
topic: thermodynamics-energy-laws
subtopic: "Heat Engines, Carnot Cycle & Efficiency"
slug: carnot-cycle-in-detail
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["Carnot cycle stages", "reversibility", "maximum efficiency proof"]
summary: "Examine the Carnot cycle stage by stage to understand why it defines the absolute maximum efficiency and why real engines can never match it."
---
#### The Four Carnot Stages
Stage 1 — Isothermal expansion at T_H: Working fluid absorbs Q_H from the hot reservoir at constant temperature. All absorbed heat is converted to work (ΔU = 0 at constant T for ideal gas). Stage 2 — Adiabatic expansion: Fluid expands with no heat exchange; temperature drops from T_H to T_C; internal energy decreases as work is done. Stage 3 — Isothermal compression at T_C: Fluid is compressed at constant temperature; heat Q_C is rejected to the cold reservoir. Stage 4 — Adiabatic compression: Fluid is compressed adiabatically; temperature rises from T_C back to T_H, completing the cycle.

#### Why Carnot Is the Theoretical Maximum
The Carnot engine is the only reversible heat engine — every step is thermodynamically reversible (ΔS_universe = 0). Any irreversible engine generates entropy, destroying work potential and reducing efficiency below Carnot. This is provable by the Clausius inequality: for any real (irreversible) engine, Q_C/Q_H > T_C/T_H, so efficiency = 1 − Q_C/Q_H < 1 − T_C/T_H. No engine, regardless of design, can exceed Carnot efficiency between the same two temperatures.

#### Carnot Efficiency Depends Only on Temperatures
η_Carnot = 1 − T_C/T_H — no material properties, no working fluid, no cycle design appears. This means: (1) The only ways to improve Carnot efficiency are to raise T_H or lower T_C; (2) All reversible engines operating between the same T_H and T_C have identical efficiency; (3) The working fluid (steam, CO₂, helium, argon) doesn't matter at the Carnot level, only at the practical implementation level.

#### Practical Limits on T_H and T_C
Raising T_H is limited by material strength at high temperatures. Steel loses strength above ~600°C; nickel superalloys allow ~1,000°C; advanced ceramics can reach ~1,400°C. Lowering T_C is limited by ambient temperature — you can't reject heat below the environment's temperature without additional work (refrigeration). The coldest available sink is typically river water (~15°C = 288 K), seawater (~12°C = 285 K), or the atmosphere (~25°C = 298 K). Space radiators can reach ~3 K (space temperature), which is why space reactors can theoretically achieve very high Carnot efficiency.

#### The Carnot Refrigerator (Reverse Carnot Cycle)
Running the Carnot cycle in reverse creates the ideal refrigerator/heat pump. COP_Carnot_refrig = T_C/(T_H − T_C); COP_Carnot_HP = T_H/(T_H − T_C). Just as the Carnot engine sets the maximum efficiency for heat engines, the Carnot refrigerator/heat pump sets the maximum COP for cooling/heating devices.

#### Review Questions
1. Describe all four stages of the Carnot cycle, noting what happens to temperature, heat, and work in each.
2. A Carnot engine operates between 1,000 K and 300 K. What is its efficiency? If the hot reservoir temperature is raised to 1,200 K (same cold reservoir), what is the new efficiency?
3. Why is the Carnot engine not used in practice even though it's the most efficient?

---
