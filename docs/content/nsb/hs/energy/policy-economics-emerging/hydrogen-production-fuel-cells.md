---
id: nsb-lesson-0583
title: "Hydrogen Production and Fuel Cell Technology"
level: hs
subject: energy
topic: policy-economics-emerging
subtopic: "Hydrogen Economy & Fuel Cells"
slug: hydrogen-production-fuel-cells
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["Hydrogen production", "Fuel cell chemistry", "Efficiency", "Hydrogen economy"]
summary: "Understand hydrogen as an energy vector and fuel cell technology."
---
#### Hydrogen Production Routes
Hydrogen (H₂) is an energy carrier, not a primary energy source; it must be produced from another energy source.

1. **Steam methane reforming (SMR):** CH₄ + H₂O → CO + 3 H₂ (at 700–900°C, Ni catalyst). Current dominant route (~95% global H₂). ΔH = +206 kJ/mol (endothermic, requires heat input). Efficiency ~75–80% (energy in H₂ product / energy in methane feed + heat). CO is further oxidized to CO₂: CO + H₂O → CO₂ + H₂ (water-gas shift reaction, exothermic). Net: CH₄ + 2 H₂O → CO₂ + 4 H₂.

2. **Electrolysis:** 2 H₂O + electricity → 2 H₂ + O₂. Current: ~5% of global H₂, growing. Electrolyzers: alkaline (30–50 MW units, $400–600/kW), PEM (proton exchange membrane, <10 MW units, $500–1,000/kW), solid oxide (experimental, <1 MW). Efficiency ~65–75% (electrical energy in / chemical energy in H₂). At $60/MWh electricity, H₂ cost ~$1.5–2.5/kg (competitive with blue hydrogen at high carbon prices ~$100/ton CO₂).

3. **Thermochemical cycles:** Sulfur-iodine cycle, calcium-bromine cycle use high-temperature heat (>800°C, from concentrated solar or nuclear) to split water without electricity. Efficiency ~40–50%; still experimental. Advantage: if driven by renewable heat (concentrated solar, geothermal), H₂ is fully renewable.

4. **Photoelectrochemical:** Direct splitting of water using semiconductors (band-gap ~2–2.5 eV for visible light absorption) + catalyst. Efficiency potential ~15–20%, but lab-stage technology.

#### Fuel Cell Operation and Efficiency
Fuel cells electrochemically oxidize hydrogen in a controlled manner, producing electricity without combustion. A proton exchange membrane (PEM) fuel cell:

Anode: 2 H₂ → 4 H⁺ + 4 e⁻ (oxidation, loses electrons)
Cathode: O₂ + 4 H⁺ + 4 e⁻ → 2 H₂O (reduction, gains electrons)
Overall: 2 H₂ + O₂ → 2 H₂O

Electrode potential: Ecell = Eocell − (RT/nF) ln(Q), where Eocell ≈ 1.23 V (theoretical). At 1 A/cm² current density (practical operation), voltage drops to ~0.6–0.7 V due to overpotential losses. Stack voltage = Ecell × N_cells; 80 cells (80 V) is typical for automotive fuel cells.

**Efficiency:** Theoretical efficiency (at Eocell, 1.23 V) is ηth = (ΔG)/(ΔH) ≈ 83% (ratio of Gibbs free energy to enthalpy for H₂ oxidation). Practical efficiency at full load is 50–60% (automotive); at part-load, efficiency improves to 70–75%. Compare to internal combustion engine (25–30% efficiency) or battery electric vehicle (85–90% drivetrain efficiency but sourced from grid electricity, which is 30–50% efficient from fossil fuels, net 15–45%).

#### Hydrogen Storage and Distribution
Hydrogen is challenging to store due to low density:

- **Gaseous H₂:** 0.08 kg/m³ at 1 atm, 20°C. Requires high-pressure tanks (350 bar, 70 MPa for vehicles); 1 liter stores ~0.006 kg H₂ (vs. ~0.8 kg gasoline). Tank cost ~$2–3/liter usable H₂.
- **Liquid H₂:** 71 kg/m³ at −253°C (boiling point). Requires cryogenic insulation; boil-off losses ~0.3–1%/day. Used for spacecraft; impractical for vehicles/grid.
- **Solid storage:** Metal hydrides (MgH₂, LaNi₅H₆) store 5–10% H₂ by weight; release H₂ when heated. Reversibility and cost remain challenges; lab-stage.
- **Synthetic storage:** Convert H₂ to liquid (methanol, ammonia, synthetic hydrocarbons) for dense storage and existing fuel infrastructure. Efficiency loss: H₂ → X → electricity or heat, ~60–70% round-trip for methanol.

**Distribution:** Hydrogen is produced at large reformers (~100 MW scale) and transported by pipeline (~1,600 km pipeline in North America/Europe). Delivery cost ~$3–5/kg H₂. Fueling stations (~500 globally, mostly Japan, Germany, California) dispense compressed H₂ at 350–700 bar to vehicles at cost ~$8–14/kg H₂ (2024).

#### Hydrogen Economy Projections
"Hydrogen economy" envisions H₂ replacing fossil fuels in hard-to-decarbonize sectors (heavy industry, aviation, shipping). Global H₂ production is ~120 million tons/year (~$170 B market); ~50% goes to ammonia production (fertilizer, explosives), ~30% to refining (hydrocracking), ~20% to chemicals (methanol, etc.). Energy applications (fuel cells, power generation) are <1% currently.

Projections (IEA Net Zero 2050 scenario): H₂ grows to 300 million tons/year by 2050, with 80% from electrolysis (driven by renewable electricity). Cost target: $1.5–2.5/kg H₂ (goal: parity with fossil fuels on carbon-adjusted basis). Challenges: building electrolyzer capacity (5–10 TW by 2050, equivalent to current global electricity), sourcing renewable electricity, developing storage/transport infrastructure.

#### Review Questions
1. Compare steam methane reforming (SMR) vs. electrolysis for hydrogen production in terms of energy input, efficiency, and CO₂ emissions.
2. Calculate the efficiency of a fuel cell operating at 0.65 V per cell, 80 cells, 50 A current, with hydrogen energy content 286 kJ/mol.
3. Estimate the cost of hydrogen delivered to an automotive fuel station ($60/MWh electricity, $3.5/kg green H₂ production + $5/kg transport). Compare to gasoline at $3/gallon (0.8 kg/gallon).

---
