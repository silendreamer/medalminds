---
id: nsb-lesson-0556
title: "Post-Combustion CO₂ Capture Technologies"
level: hs
subject: energy
topic: fossil-fuels-combustion
subtopic: "Carbon Capture, Utilization & Storage (CCUS)"
slug: post-combustion-co2-capture
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["Chemical solvents", "Sorbent materials", "Regeneration", "Capture cost"]
summary: "Understand the chemistry and engineering of CO₂ separation from flue gas."
---
#### Amine-Based Solvent Absorption
The most mature CO₂ capture technology uses aqueous solutions of amines (organic bases) that react with CO₂:

Primary amine (e.g., monoethanolamine, MEA):
2 R-NH₂ + CO₂ + H₂O → R-NH₃⁺ + R-NH-CO₂⁻

The carbamate (R-NH-CO₂⁻) is stable at room temperature and high CO₂ partial pressure. To release CO₂, the solution is heated to 120–150°C:

R-NH-CO₂⁻ + heat → R-NH₂ + CO₂ (regeneration)

The regenerated amine solution is recycled. Typical capacity is ~0.3 mol CO₂ per liter amine solution. Drawbacks: MEA is volatile (evaporates from solution, ~1–2 kg MEA loss per ton CO₂), degrades under oxidative conditions (producing heat-stable salts that reduce capacity), and requires ~3–4 MJ of heat per kg CO₂ for regeneration (high energy penalty).

Improved solvents (e.g., piperazine, advanced blends) reduce thermal penalty to ~2–3 MJ/kg CO₂ but remain more expensive than MEA. Industrial deployment: Petra Nova (Texas, coal plant, 90 MW, 5,000 ton CO₂/day), Boundary Dam (Saskatchewan, coal plant, 150 MW, 9,000 ton CO₂/day).

#### Solid Sorbent Systems
Solid sorbents (porous materials) physically or chemically absorb CO₂ without a liquid phase, enabling cyclic operation:

1. **Adsorption:** CO₂ adheres to the surface of a solid (e.g., zeolite, MOF, activated carbon). Binding energy is 15–40 kJ/mol (weak physisorption) or 40–100 kJ/mol (chemisorption).
2. **Pressure/temperature swing:** Raising temperature or reducing pressure releases CO₂.

**Zeolites** (microporous aluminosilicates) have high capacity (~50 mmol CO₂/g at high partial pressure) but are not very selective for CO₂ in the presence of H₂O and N₂. Water vapor in flue gas interferes with CO₂ binding.

**Metal-organic frameworks (MOFs)** are crystalline porous polymers with high selectivity and capacity. Example: MOF-74 (Mg) has capacity ~500 mmol CO₂/g and selectivity CO₂:N₂ > 100:1. Challenges: stability, cost ($500–5,000/kg MOF), and regeneration temperature (180–220°C).

**Activated carbon** has lower capacity (~10 mmol CO₂/g) but is inexpensive ($1–10/kg) and already used industrially. Selectivity is poor; heating to 120–150°C releases CO₂.

#### Flue Gas Characteristics and Challenges
Coal power plant flue gas composition (after particulate removal):
- CO₂: 3–15% (depends on fuel, excess air; coal ~12%, gas ~8%, oil ~10%)
- H₂O: 5–10% (high humidity from combustion)
- N₂: 70–80% (majority)
- O₂: 2–5% (excess air)
- NOₓ: 100–500 ppm
- SOₓ: 100–500 ppm (if unfluored)

Challenges for capture:
- **Low CO₂ partial pressure (~0.03–0.15 atm):** Sorbents designed for high-pressure CO₂ (e.g., 1 atm in cement kiln) are inefficient. Capture cost increases with 1/ln(pCO₂).
- **Moisture:** 5–10% water vapor competes for binding sites and increases regeneration energy (latent heat of vaporization ~2,450 kJ/kg H₂O).
- **NOₓ and SOₓ:** Can degrade solvents (oxidative degradation) and block sorbent pores.

Pre-treatment (dehydration, SOₓ removal) adds cost and complexity.

#### Energy Penalty and Capture Cost
Post-combustion CO₂ capture requires ~3–4 MJ thermal energy per kg CO₂ (solvent regeneration) plus electricity for cooling, compression, and blowers. At a modern coal plant (~40% thermal efficiency), this penalty reduces net efficiency to ~32–35% and increases electricity cost by ~$30–50/MWh. Total cost is ~$50–150/ton CO₂ (2024), depending on location, labor, and energy prices. This cost exceeds the social cost of carbon (~$50–200/ton CO₂, highly uncertain) in most scenarios, making voluntary CCS uneconomical unless subsidies (e.g., 45Q tax credit in U.S., $180/ton captured) or carbon pricing (~$100+/ton) is available.

#### Avoided Emissions and Lifecycle Analysis
Comparing CCS-equipped power plant to equivalent gas plant without CCS:
- Coal plant with CCS: ~50 g CO₂/kWh (90% capture, plant CO₂ = 800 g/kWh, CCS capture = 720 g/kWh)
- Natural gas plant: ~400 g CO₂/kWh (no capture)

At 90% capture efficiency, CCS on coal reduces emissions 18× below unabated coal (900 g CO₂/kWh) but exceeds unabated gas by 125%. Lifecycle analysis includes equipment manufacturing (cement, steel) and transport energy; CCS reduces net benefit by ~20–30%, bringing cost-effectiveness into question unless combined with renewable electricity for regeneration.

#### Review Questions
1. Write the reaction mechanism for CO₂ absorption in monoethanolamine (MEA) solution, and explain how heat regenerates the amine.
2. Compare the advantages and disadvantages of amine solvents vs. solid sorbents (zeolites, MOFs) for post-combustion CO₂ capture.
3. A coal power plant captures CO₂ at a cost of $80/ton with 90% efficiency. If the unabated emissions are 800 g CO₂/kWh and the plant operates at 70% capacity factor, calculate the annual cost of CCS for a 1,000 MW plant.

---
