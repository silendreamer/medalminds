---
id: nsb-lesson-0552
title: "Real-World Combustion: Flame Temperature and Product Composition"
level: hs
subject: energy
topic: fossil-fuels-combustion
subtopic: "Combustion Reactions & Stoichiometry"
slug: flame-temperature-product-composition
type: "Application"
estimatedMinutes: 14
keyConcepts: ["Adiabatic flame temperature", "Flue gas composition", "Heat balance", "Exhaust analysis"]
summary: "Predict flame temperature and exhaust gas composition in practical combustion systems."
---
#### Adiabatic Flame Temperature Theory
The adiabatic flame temperature (AFT) is the theoretical maximum temperature achieved when a fuel burns completely with stoichiometric oxygen in an insulated system (no heat loss). In reality, AFT is never reached because heat is lost to surroundings and exhaust. For methane with air at 25°C, AFT ≈ 1,960°C; for acetylene (C₂H₂), AFT ≈ 3,100°C (very hot because of high enthalpy of formation). AFT depends on fuel type, oxygen purity, inlet temperature, and reactants' specific heat capacity. Oxygen-enriched combustion increases AFT (pure O₂ + natural gas ≈ 2,820°C), used in welding and high-temperature processes.

#### Flue Gas Composition Calculation
After combustion of a hydrocarbon with excess air, flue gas contains: CO₂, H₂O, O₂ (excess), N₂ (from air), plus trace gases (Ar, CO, NOₓ, SO₂). Example: methane combustion with 20% excess air (λ = 1.2).

**Balanced stoichiometric equation:**
CH₄ + 2 O₂ → CO₂ + 2 H₂O

**With 20% excess air (λ = 1.2):**
CH₄ + 2.4 O₂ + 9.05 N₂ → CO₂ + 2 H₂O + 0.4 O₂ + 9.05 N₂

(Note: O₂:N₂ ratio in air is 21:79, so 2.4 mol O₂ requires 2.4 × (79/21) = 9.05 mol N₂)

**Total moles of flue gas (dry basis, without H₂O):**
CO₂ + O₂ + N₂ = 1 + 0.4 + 9.05 = 10.45 mol

**Mole fractions (dry):**
CO₂: 1 / 10.45 = 9.6%
O₂: 0.4 / 10.45 = 3.8%
N₂: 9.05 / 10.45 = 86.6%

**Mole fraction of H₂O (wet basis):** 2 / (10.45 + 2) = 16.1%

Practical flue gas analyzers measure CO₂, O₂, and CO (incomplete combustion), from which fuel consumption and efficiency can be inferred.

#### Energy Balance in a Furnace
Consider a methane furnace supplying heat to a water heater. Energy balance:
Heat released by combustion = Heat absorbed by water + Heat lost to surroundings

**Worked example:** Burn 1 kg of methane (ΔHc = −890 kJ/mol) in a furnace to heat 100 L of water from 20°C to 60°C. The furnace is 85% efficient.

Heat required: Q = m × c × ΔT = 100 kg × 4.18 kJ/kg·K × 40 K = 16,720 kJ

Methane burned: n = 1,000 g / 16 g/mol = 62.5 mol

Heat released: 62.5 mol × 890 kJ/mol = 55,625 kJ

Furnace efficiency: 16,720 / 55,625 = 30% → **NOT ACHIEVABLE with 85% furnace efficiency.** Conclusion: less methane is needed.

Adjust: If furnace is 85% efficient, heat delivered = 55,625 × 0.85 = 47,281 kJ (sufficient for heating and excess 30,561 kJ loss).

#### Flame Quenching and Flame Speed
Flame is a self-sustaining exothermic reaction that propagates through a fuel-air mixture. Flame speed (laminar flame velocity) is the rate at which the flame front advances perpendicular to the flow. For methane-air mixtures, flame speed is ~0.35 m/s (stoichiometric) and drops to ~0.1 m/s at lean (λ > 1.3) or rich (λ < 0.7) conditions. Quenching distance (smallest diameter of a tube through which flame can propagate) is ~0.7 mm for methane-air. This explains why finely divided fuels (dust, mist) are explosive—large surface area accelerates flame propagation.

#### Exhaust Gas Recirculation (EGR)
EGR is a technique to reduce NOₓ emissions by recirculating a portion of exhaust gas back to the engine intake. Exhaust gas (mostly N₂ and CO₂) dilutes the fresh charge, reducing peak flame temperature and NO formation rate (NO formation ∝ T^4, strong temperature dependence). EGR rates of 5–15% reduce NOₓ by 20–40% with a small penalty in fuel economy. Modern engines combine EGR with aftertreatment (selective catalytic reduction) for compliance with strict NOₓ limits.

#### Review Questions
1. Calculate the mole fraction of CO₂ in dry flue gas from propane combustion with 30% excess air.
2. A natural gas water heater has an efficiency of 92%. If 50 kg of water is heated from 15°C to 55°C, how much natural gas (by mass) is needed? (Use ΔHc ≈ −890 kJ/mol for methane, Cp = 4.18 kJ/kg·K)
3. Explain why exhaust gas recirculation (EGR) reduces NOₓ emissions, and describe the trade-off with engine performance.

---
