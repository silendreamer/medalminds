---
id: nsb-lesson-0551
title: "Balancing Combustion Equations and Stoichiometric Calculations"
level: hs
subject: energy
topic: fossil-fuels-combustion
subtopic: "Combustion Reactions & Stoichiometry"
slug: balancing-combustion-stoichiometry
type: "Application"
estimatedMinutes: 14
keyConcepts: ["Balancing equations", "Stoichiometry", "Air-to-fuel ratios", "Excess oxygen"]
summary: "Apply stoichiometric principles to real combustion scenarios with worked numerical examples."
---
#### Worked Example 1: Octane Combustion
Balance the combustion of octane (C₈H₁₈), a major component of gasoline.

**Step 1: Write the unbalanced equation:**
C₈H₁₈ + O₂ → CO₂ + H₂O

**Step 2: Balance carbon atoms.** Octane has 8 carbons; each CO₂ contains 1 carbon. Coefficient for CO₂ is 8:
C₈H₁₈ + O₂ → 8 CO₂ + H₂O

**Step 3: Balance hydrogen atoms.** Octane has 18 hydrogens; each H₂O contains 2 hydrogens. Coefficient for H₂O is 9:
C₈H₁₈ + O₂ → 8 CO₂ + 9 H₂O

**Step 4: Balance oxygen atoms.** Right side has 8×2 + 9×1 = 25 oxygen atoms. Left side needs 25/2 = 12.5 O₂ molecules:
C₈H₁₈ + 12.5 O₂ → 8 CO₂ + 9 H₂O

**Step 5 (optional): Clear fractions** by multiplying all coefficients by 2:
2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O

#### Stoichiometric Air-to-Fuel Ratio Calculation
Calculate the stoichiometric air-to-fuel ratio (A/F) for octane combustion.

**Given:** Balanced equation: C₈H₁₈ + 12.5 O₂ → 8 CO₂ + 9 H₂O
Molar mass of C₈H₁₈ = 8(12) + 18(1) = 114 g/mol
Molar mass of O₂ = 32 g/mol
Air is 21% O₂ and 79% N₂ by volume

**Calculation:**
Moles of O₂ per mole of octane = 12.5
Mass of O₂ per gram of octane = (12.5 mol O₂ / 1 mol C₈H₁₈) × (32 g O₂ / mol O₂) / (114 g C₈H₁₈ / mol) = 3.51 g O₂ / g octane

Mass of air per gram of octane = 3.51 / 0.21 = 16.7 g air / g octane

**Stoichiometric A/F ratio = 15.1:1** (standard approximation for gasoline)

#### Excess Air and Lambda (λ) Factor
In practice, engines operate with excess air to ensure complete combustion. The lambda (λ) factor relates actual A/F to stoichiometric A/F:
λ = (actual A/F) / (stoichiometric A/F)

For octane with stoichiometric A/F = 15.1:
- If actual A/F = 16.7, then λ = 16.7 / 15.1 = 1.1 (10% excess air, lean operation)
- If actual A/F = 13.6, then λ = 13.6 / 15.1 = 0.9 (10% deficiency, rich operation)

Gasoline engines typically operate at λ ≈ 0.98–1.02 (nearly stoichiometric) with three-way catalytic converters for optimal emissions control. Diesel engines operate at λ ≈ 1.3–1.5 (lean) due to diffusion-controlled combustion and direct injection.

#### Worked Example 2: Propane Heater Efficiency
A propane (C₃H₈) heater operates at 90% efficiency. Calculate the amount of heat generated when burning 1 kg of propane.

**Step 1: Balance the combustion of propane:**
C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O

**Step 2: Look up the enthalpy of combustion** (from thermodynamic tables):
ΔHc(C₃H₈) = −2,220 kJ/mol

**Step 3: Calculate molar mass of propane:**
Molar mass = 3(12) + 8(1) = 44 g/mol

**Step 4: Calculate theoretical heat release per kg:**
Moles of propane in 1 kg = 1,000 g / 44 g/mol = 22.73 mol
Theoretical heat = 22.73 mol × 2,220 kJ/mol = 50,470 kJ

**Step 5: Apply efficiency:**
Actual heat output = 50,470 kJ × 0.90 = **45,423 kJ ≈ 45.4 MJ**

#### Combustion Stoichiometry in Industrial Furnaces
Large-scale combustion systems (power plants, refineries) operate with controlled excess air (typically 3–5% excess, λ ≈ 1.03–1.05). Flue gas from complete combustion contains CO₂, H₂O, N₂ (from air), and O₂ (excess). Incomplete combustion produces CO, unburned hydrocarbons, and soot. Furnace design ensures adequate residence time, mixing, and temperature to drive reactions to completion. Emission control requires temperature >1,200°C and sufficient oxygen; at lower temperatures, CO formation increases exponentially.

#### Staged Combustion and NOₓ Control
Modern furnaces use staged combustion to reduce NOₓ formation. Fuel and air are not fully mixed in the primary stage; combustion occurs at cooler temperatures (reducing NOₓ) and substoichiometric oxygen (reducing CO₂ oxidation from N₂). Secondary air is added downwind to complete oxidation. This "two-stage" approach reduces NOₓ by 40–60% compared to conventional single-stage burners.

#### Review Questions
1. Balance the combustion equation for methane (CH₄) and calculate the stoichiometric air-to-fuel ratio by mass.
2. A diesel engine operates at λ = 1.35 with stoichiometric A/F = 14.8:1. Calculate the actual A/F and the excess air percentage.
3. A natural gas furnace burns methane with 95% efficiency. If the enthalpy of combustion is −890 kJ/mol, calculate the heat output per kilogram of methane.

---
