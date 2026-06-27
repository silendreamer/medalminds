---
id: nsb-lesson-0557
title: "Pre-combustion and Oxy-fuel Capture Strategies"
level: hs
subject: energy
topic: fossil-fuels-combustion
subtopic: "Carbon Capture, Utilization & Storage (CCUS)"
slug: precombustion-oxyfuel-capture
type: "Application"
estimatedMinutes: 14
keyConcepts: ["Hydrogen production", "Oxy-fuel combustion", "CO₂-rich exhaust", "Integrated gasification"]
summary: "Explore alternative CO₂ capture approaches integrated into fuel production or combustion."
---
#### Pre-combustion CO₂ Removal
Pre-combustion capture removes carbon before combustion, enabling hydrogen production while capturing CO₂. Process:

1. **Fuel reformation:** Fossil fuel (natural gas, coal) is reacted with steam:
   CH₄ + H₂O → CO + 3 H₂ (at 700–900°C, with catalyst)
   C + H₂O → CO + H₂ (water-gas reaction)

2. **Water-gas shift:** CO is oxidized by steam:
   CO + H₂O ↔ CO₂ + H₂ (at 200–400°C, iron-chromium catalyst)
   
   This shifts the equilibrium toward CO₂ and H₂; hydrogen is extracted, leaving CO₂ for capture.

3. **CO₂ separation:** CO₂ (now ~40% of output after shift) is removed by amine absorption or pressure swing adsorption (PSA).

4. **H₂ combustion:** Pure hydrogen (>99%) burns cleanly:
   2 H₂ + O₂ → 2 H₂O (flame temperature ~2,800°C)

Advantages: H₂ has no CO₂ emissions at point of use; CO₂ is at higher partial pressure (~0.4 atm), reducing capture cost to ~$30–50/ton; can be combined with CCS on the coal/gas used for H₂ production ("Blue Hydrogen").

Disadvantages: Energy losses in each step (reformation, shift, separation) reduce overall efficiency by ~20–30%; hydrogen lacks infrastructure (pipelines, storage, distribution networks); requires capital-intensive plants ($500M–$1B+ for large-scale production).

#### Oxy-fuel Combustion
Oxy-fuel (or oxycombustion) burns fuel in pure oxygen instead of air, producing exhaust rich in CO₂ and H₂O:

CH₄ + 2 O₂ → CO₂ + 2 H₂O

After condensing H₂O (cooling exhaust to ~50°C), exhaust is ~85% CO₂, ~10% O₂ (excess), ~5% inerts (Ar, N₂). This high CO₂ concentration (vs. ~12% in conventional coal combustion) makes subsequent CO₂ separation trivial (cooling alone concentrates CO₂ to >99%).

**Process:** Pure oxygen is produced by air separation (cryogenic distillation of liquid nitrogen/oxygen or pressure swing adsorption). Burners and piping are modified for pure O₂ (fire hazard). Some recirculated flue gas is mixed with fresh O₂ to control flame temperature (prevents furnace damage from high-temperature oxy-fuel flame ~3,200°C).

Advantages: High CO₂ purity (>99%) in exhaust; no complex CO₂ separation required; CO₂ easily liquefied and transported.

Disadvantages: Air separation units (ASUs) consume ~25% of power plant output, reducing net efficiency dramatically. Capital cost is high (~$200M+ for large ASU). Demonstration plants have struggled with economics (FGCU Gussing plant in Austria shut down in 2013 due to cost overruns).

#### Integrated Gasification Combined Cycle (IGCC) with CCS
IGCC gasifies coal or biomass in an oxygen-blown entrained-bed reactor, producing synthesis gas (syngas: ~40% CO, ~30% H₂, ~20% CO₂, ~10% H₂O, <1% impurities). Syngas is cleaned (particulates, sulfur, mercury removed) and then:

1. **Water-gas shift:** CO is converted to CO₂ and H₂.
2. **CO₂ separation:** Selexol (dimethyl ether of polyethylene glycol) absorbs CO₂ from syngas at high pressure (~2–4 MPa); >99% CO₂ capture is achievable.
3. **H₂ combustion:** Pure H₂ fuels a gas turbine.
4. **Steam cycle:** Waste heat from turbine exhaust generates steam for a steam turbine (combined cycle).

Advantages: High thermodynamic efficiency (45–50%); high CO₂ capture efficiency (>95%); can gasify coal or biomass with same plant; syngas is valuable feedstock (chemicals, synthetic fuels).

Disadvantages: Capital cost is ~$2,000–3,000/kW (coal IGCC), 2–3× that of conventional coal plants. Only ~20 commercial IGCC plants operating globally; several high-profile failures (Tampa IGCC, U.S., cancelled; Wabash River IGCC, shut down in 2012 despite technical success due to economic factors).

#### Worked Example: Blue Hydrogen Production with CCS
Calculate the CO₂ emissions from producing 1 ton of H₂ by steam reforming natural gas with 90% CCS.

**Reaction:** CH₄ + 2 H₂O → CO₂ + 4 H₂ (simplified; actual process is more complex)

**Step 1: Moles of H₂ produced** = 1,000 kg / 2 kg/mol = 500 mol
**Step 2: Stoichiometry** 4 mol H₂ requires 1 mol CH₄ and produces 1 mol CO₂
Moles of CO₂ = 500 / 4 = 125 mol
**Step 3: Mass of CO₂** = 125 mol × 44 g/mol = 5,500 kg CO₂
**Step 4: With 90% CCS** captured CO₂ = 5,500 × 0.9 = 4,950 kg CO₂ (stored)
Emitted CO₂ = 5,500 × 0.1 = 550 kg CO₂
**Step 5: Additional emissions** from electricity for ASU, compression, logistics: ~200 kg CO₂
**Total emitted:** ~750 kg CO₂ per ton H₂ (~1.5 kg CO₂/kg H₂ or ~60 g CO₂/MJ)

Compare: Gray hydrogen (without CCS) ~10 kg CO₂/kg H₂; green hydrogen (from renewables) ~0.1 kg CO₂/kg H₂ (manufacturing of electrolyzer).

#### Review Questions
1. Sketch the process flow for pre-combustion CO₂ capture from natural gas, identifying the key reactions and equipment.
2. Explain why oxy-fuel combustion produces high-purity CO₂ in exhaust, and why this reduces CO₂ separation cost.
3. Compare the economics and efficiency of blue hydrogen (SMR + CCS) vs. green hydrogen (electrolysis), assuming natural gas costs $5/MMBtu and electricity costs $60/MWh.

---
