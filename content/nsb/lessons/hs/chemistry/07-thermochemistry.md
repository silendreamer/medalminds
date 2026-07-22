# HS Chemistry — Thermochemistry
*High School Science Bowl prep · 40 lesson drafts across 5 subtopics*

---

## Subtopic: Energy, Heat & Temperature

### What Is Thermal Energy? Distinguishing Heat, Temperature, and Internal Energy
**Type:** Core Understanding
**Slug:** thermal-energy-heat-temperature
**Estimated time:** 12 min
**Key concepts:** thermal energy · heat transfer · temperature vs. heat
**Summary:** Temperature measures average kinetic energy of particles; heat is the transfer of thermal energy between objects at different temperatures.

#### Temperature vs. Heat
Temperature is a measure of the **average kinetic energy** of the particles in a substance — not the total energy. Two objects at the same temperature have particles moving at the same average speed, but a larger object holds more total thermal energy. Heat (symbol *q*) is energy in transit: it flows from hotter to cooler objects until thermal equilibrium is reached. You cannot store "heat" — once transferred, it becomes internal energy of the receiving substance.

#### Units and Sign Convention
Energy in chemistry is measured in **joules (J)** or kilojoules (kJ). Heat is positive (*q* > 0) when a system **absorbs** energy (endothermic) and negative (*q* < 0) when it **releases** energy (exothermic). This sign convention is from the system's perspective — the system is whatever you're studying (a reaction, a substance), and surroundings is everything else.

#### Specific Heat Capacity
The **specific heat capacity** (*c*) of a substance is the energy required to raise 1 gram of that substance by 1°C. Water's specific heat is famously high: 4.184 J/g·°C. This explains why coastal climates are milder than inland ones — the ocean absorbs and releases heat slowly. Metals have much lower specific heats (iron: 0.449 J/g·°C), which is why a metal spoon heats up faster than the soup it's in.

#### Thermal Equilibrium
When two objects at different temperatures are placed in contact, heat flows until they reach the **same temperature** (thermal equilibrium). No net energy transfer occurs at equilibrium. This principle underlies calorimetry: the heat lost by one object equals the heat gained by the other, provided the system is insulated — *q*_lost + *q*_gained = 0.

#### States of Matter and Energy
Phase changes absorb or release energy at **constant temperature**. Melting ice absorbs 334 J/g (heat of fusion) without a temperature change — the energy breaks intermolecular bonds, not accelerate molecules. This is why sweating cools you effectively: evaporation of water requires 2260 J/g (heat of vaporization), drawing thermal energy from your skin.

#### Review Questions
1. A 50 g sample of copper (c = 0.385 J/g·°C) absorbs 500 J of heat. By how much does its temperature rise?
2. Explain why "heat" and "temperature" are not the same thing.
3. Two iron blocks of different masses are at the same temperature. Which has more thermal energy? Which will cool faster if placed in ice water?

---

### The Specific Heat Equation: q = mcΔT
**Type:** Core Understanding
**Slug:** specific-heat-equation
**Estimated time:** 13 min
**Key concepts:** q = mcΔT · specific heat · calorimetry calculation
**Summary:** The equation q = mcΔT quantifies the heat exchanged when a substance changes temperature.

#### The Equation
*q* = *mcΔT* where *m* is mass in grams, *c* is specific heat in J/g·°C, and *ΔT* = T_final − T_initial in °C (or K — the size of a degree is the same). The result *q* is in joules. If ΔT is positive (temperature rose), *q* is positive (heat was absorbed). If ΔT is negative, heat was released.

#### Applying the Equation Step by Step
**Example:** How much heat is needed to warm 200 g of water from 20°C to 80°C?
- *m* = 200 g, *c* = 4.184 J/g·°C, ΔT = 80 − 20 = 60°C
- *q* = (200)(4.184)(60) = **50,208 J = 50.2 kJ**

This is the heat your stove must supply. Notice that water requires a lot of energy for a modest temperature change — this is why cooking takes so long.

#### Common Specific Heats to Know
| Substance | c (J/g·°C) |
|---|---|
| Water (liquid) | 4.184 |
| Ice | 2.09 |
| Steam | 2.01 |
| Ethanol | 2.44 |
| Aluminum | 0.900 |
| Iron | 0.449 |
| Copper | 0.385 |
| Gold | 0.129 |

Notice the trend: metals have low specific heats; water is anomalously high due to hydrogen bonding.

#### Solving for Other Variables
You can rearrange: *c* = q/(mΔT) or ΔT = q/(mc). If a 150 g metal absorbs 1800 J and heats by 20°C, its specific heat is 1800/(150 × 20) = 0.60 J/g·°C — close to aluminum.

#### Mixing Problems
When two substances exchange heat: *q*_hot + *q*_cold = 0, so *m*_hot·*c*_hot·ΔT_hot = −*m*_cold·*c*_cold·ΔT_cold. Solve for the unknown final temperature. Both ΔT values must use the same T_final.

#### Review Questions
1. Calculate the heat released when 500 g of iron cools from 150°C to 25°C (c = 0.449 J/g·°C).
2. A 100 g aluminum block at 80°C is dropped into 200 g of water at 20°C. Find the final temperature (c_Al = 0.900, c_water = 4.184).
3. Why does ocean water moderate coastal temperatures more effectively than a lake of similar size?

---

### Phase Changes and Latent Heat
**Type:** Core Understanding
**Slug:** phase-changes-latent-heat
**Estimated time:** 12 min
**Key concepts:** heat of fusion · heat of vaporization · heating curve
**Summary:** Phase changes absorb or release energy at constant temperature, described by heats of fusion and vaporization.

#### Why Temperature Stays Constant During Phase Changes
When water boils at 100°C, adding more heat doesn't raise the temperature — it breaks intermolecular hydrogen bonds, converting liquid to gas. The kinetic energy (temperature) stays the same; the potential energy (bond configuration) changes. This constant-temperature energy absorption is called **latent heat**.

#### Key Latent Heats for Water
- **Heat of fusion** (melting/freezing): 334 J/g = 6.01 kJ/mol
- **Heat of vaporization** (boiling/condensing): 2260 J/g = 40.7 kJ/mol

Vaporization requires ~7× more energy than fusion because you must completely overcome intermolecular attractions, not just partially disorder them.

#### Calculating Latent Heat
*q* = *m* × ΔH_fus or *q* = *m* × ΔH_vap. To melt 50 g of ice: *q* = 50 × 334 = 16,700 J = 16.7 kJ. This is heat absorbed at exactly 0°C.

#### Reading a Heating Curve
A heating curve for water shows five segments: (1) ice warming (slope = 1/c_ice), (2) ice melting at 0°C (flat), (3) liquid water warming (slope = 1/c_water — shallowest because c is highest), (4) boiling at 100°C (flat, longest), (5) steam warming (steeper slope than liquid). Flat segments = phase changes; sloped segments = temperature change within a phase.

#### Full Calculation: Heating Ice to Steam
To heat 10 g of ice at −20°C to steam at 120°C:
1. Heat ice: q₁ = 10 × 2.09 × 20 = 418 J
2. Melt ice: q₂ = 10 × 334 = 3,340 J
3. Heat water: q₃ = 10 × 4.184 × 100 = 4,184 J
4. Boil water: q₄ = 10 × 2260 = 22,600 J
5. Heat steam: q₅ = 10 × 2.01 × 20 = 402 J
**Total: 30,944 J ≈ 30.9 kJ**

#### Review Questions
1. How much heat is released when 25 g of steam at 100°C condenses to liquid water at 100°C?
2. Sketch a heating curve for water from −30°C to 130°C. Label all five segments.
3. Why does boiling require so much more energy than melting for the same substance?

---

### Coffee Cup Calorimetry: Measuring Heat in Solution
**Type:** Application
**Slug:** coffee-cup-calorimetry
**Estimated time:** 14 min
**Key concepts:** constant-pressure calorimetry · heat of neutralization · q = mcΔT applied
**Summary:** A coffee cup calorimeter measures heat of reaction at constant pressure by tracking the temperature change of water in an insulated cup.

#### The Setup
A Styrofoam coffee cup approximates an **adiabatic system** — one that doesn't exchange heat with the surroundings. When a reaction occurs in aqueous solution, the heat released or absorbed changes the water temperature. Assuming the solution has the density and specific heat of water, you can calculate q_rxn.

#### Lab Procedure and Calculation
**Example:** 50 mL of 1.0 M HCl is mixed with 50 mL of 1.0 M NaOH. Temperature rises from 22.5°C to 29.3°C.
- Total mass of solution = 100 g (100 mL × ~1 g/mL)
- ΔT = 29.3 − 22.5 = +6.8°C
- *q*_soln = (100)(4.184)(6.8) = **+2845 J** (solution gained heat)
- *q*_rxn = −2845 J (reaction released heat; exothermic)
- Moles of reaction: 0.050 L × 1.0 mol/L = 0.050 mol
- ΔH_neutralization = −2845 J / 0.050 mol = **−56,900 J/mol = −56.9 kJ/mol**

The accepted value is −57.3 kJ/mol — excellent agreement!

#### Endothermic Example
Dissolving NH₄NO₃ in water causes a temperature drop (cold packs use this). If 100 mL of water drops 8.5°C: *q*_soln = (100)(4.184)(−8.5) = −3556 J. So *q*_rxn = +3556 J — the reaction absorbed heat from the water.

#### Sources of Error
Real coffee cup calorimeters lose some heat to the cup itself and to the air. Styrofoam minimizes this but doesn't eliminate it. A "calorimeter constant" (heat capacity of the calorimeter) is sometimes measured separately and added to calculations for greater accuracy.

#### Review Questions
1. 100 mL of 0.500 M H₂SO₄ reacts with 100 mL of 1.00 M NaOH. Temperature rises 3.2°C. Calculate q_rxn and ΔH per mole of H₂SO₄.
2. Why is Styrofoam preferred over glass or metal for a simple calorimeter?
3. If the calorimeter absorbs some heat, does q_rxn come out too large or too small in magnitude? Explain.

---

### Bomb Calorimetry: Measuring Combustion Enthalpy
**Type:** Application
**Slug:** bomb-calorimetry
**Estimated time:** 14 min
**Key concepts:** constant-volume calorimetry · heat capacity of calorimeter · combustion enthalpy
**Summary:** A bomb calorimeter measures heat of combustion at constant volume using a sealed steel vessel surrounded by water.

#### Why a Different Setup?
Combustion reactions involve gases (O₂ consumed, CO₂/H₂O produced), so pressure would change in an open system. A bomb calorimeter uses a sealed **steel bomb** (constant volume), which prevents expansion work. The measured heat (*q*_v) differs slightly from ΔH (*q*_p) for reactions involving gases, but the correction is small.

#### Calibration with Benzoic Acid
The calorimeter is first calibrated by burning a known mass of **benzoic acid** (ΔH_comb = −3226.7 kJ/mol, MW = 122.12 g/mol). If 1.000 g of benzoic acid raises water temperature by 5.217°C, the heat capacity of the calorimeter: *C*_cal = q / ΔT = (1.000/122.12)(3226.7 kJ) / 5.217°C = **5.061 kJ/°C**.

#### Measuring an Unknown
**Example:** 0.500 g of glucose is burned; temperature rises 1.195°C.
- *q*_rxn = −*C*_cal × ΔT = −(5.061)(1.195) = **−6.048 kJ** released per 0.500 g
- MW of glucose = 180.16 g/mol; moles burned = 0.500/180.16 = 0.002776 mol
- ΔH_comb = −6.048 / 0.002776 = **−2178 kJ/mol** (accepted: −2803 kJ/mol — simplified example)

#### Application: Food Calories
Food calories (Cal, capital C) are kilocalories. A calorimeter can directly measure the caloric content of food by burning a dried sample. 1 Cal = 4.184 kJ. A 2000 Cal/day diet = 8368 kJ/day of combustion energy.

#### Review Questions
1. A calorimeter has heat capacity 4.73 kJ/°C. Burning 0.750 g of ethanol raises temperature 3.84°C. Calculate ΔH_comb per mole of ethanol (MW = 46.07 g/mol).
2. Why does a bomb calorimeter measure q_v rather than q_p? Under what conditions does q_v ≈ q_p?
3. Why must the calorimeter be calibrated before measuring an unknown substance?

---

### Enthalpy of Reaction and Hess's Law Preview
**Type:** Mixed/Review
**Slug:** enthalpy-reaction-hess-preview
**Estimated time:** 10 min
**Key concepts:** enthalpy · state function · ΔH_rxn
**Summary:** Enthalpy is a state function measuring heat at constant pressure, connecting thermal measurements to the next topic of Hess's Law.

#### Enthalpy as a State Function
Enthalpy (*H*) is defined as H = U + PV, but in practice, what matters is ΔH = H_products − H_reactants. For exothermic reactions, products have lower enthalpy than reactants (ΔH < 0). Because enthalpy is a **state function**, the path doesn't matter — only initial and final states. This is the foundation of Hess's Law.

#### Connecting q and ΔH
At constant pressure (typical lab conditions), q_p = ΔH. At constant volume (bomb calorimeter), q_v = ΔU. The difference: ΔH = ΔU + ΔnRT where Δn = change in moles of gas. For reactions not involving gases, ΔH ≈ ΔU.

#### Standard Enthalpy of Reaction
ΔH°_rxn is ΔH measured at standard conditions: 25°C, 1 atm, 1 M concentration, all substances in standard states. The degree symbol (°) flags standard conditions. Values are tabulated and additive — the key insight behind Hess's Law.

#### Synthesis Question
A student measures −856 kJ released when 2 mol of Mg burns in O₂ to form MgO. (a) Write the balanced equation. (b) State ΔH_rxn. (c) What is ΔH for burning 1 mol of Mg?

#### Review Questions
1. If ΔH = −484 kJ for 2H₂(g) + O₂(g) → 2H₂O(g), what is ΔH when the reaction is reversed? When 1 mol H₂ burns?
2. Explain why enthalpy is a state function but heat is not.
3. A reaction has ΔH = −200 kJ at constant pressure. A bomb calorimeter gives q_v = −198 kJ. What does the difference tell you about Δn_gas?

---

### Energy, Heat & Temperature — High-Speed Bowl Review
**Type:** Mixed/Review
**Slug:** energy-heat-temp-review
**Estimated time:** 8 min
**Key concepts:** q = mcΔT · latent heat · sign convention · calorimetry
**Summary:** Rapid synthesis of all thermal energy concepts with bowl-style practice.

#### Quick-Fire Facts
- q = mcΔT: units are J when m is in g, c in J/g·°C, ΔT in °C
- Water: c = 4.184 J/g·°C; ΔH_fus = 334 J/g; ΔH_vap = 2260 J/g
- Exothermic: ΔH < 0, surroundings warm, products more stable
- Endothermic: ΔH > 0, surroundings cool, products less stable
- Coffee cup = constant pressure; bomb = constant volume
- Phase change = constant temperature; heating/cooling = sloped curve
- Specific heat of metals < specific heat of water (always)

#### Common Bowl Traps
- **Trap 1:** ΔT for phase change is ZERO — don't use q = mcΔT during melting or boiling
- **Trap 2:** Sign of q_rxn is opposite sign of q_soln in calorimetry
- **Trap 3:** Calories (food) are kcal — 1 Cal = 1000 cal = 4184 J
- **Trap 4:** "Heat capacity" (J/°C) vs. "specific heat capacity" (J/g·°C) — different quantities

#### Practice Set
1. 200 g water cools from 100°C to 0°C. How much heat is released? (just cooling, no phase change)
2. Then the water freezes. How much additional heat is released?
3. Which releases more heat: condensing 1 g of steam at 100°C or cooling 1 g of liquid water from 100°C to 0°C?

#### Review Questions
1. A 150 g iron block (c = 0.449) cools from 100°C to 25°C. Calculate q.
2. 50 g of water heats from 20°C to 100°C, then fully evaporates. What is the total heat absorbed?
3. In a calorimetry experiment, the solution temperature rises. Is q_rxn positive or negative?

---

### Thermal Energy Competition Clinic
**Type:** Competition Extension
**Slug:** thermal-energy-competition-clinic
**Estimated time:** 7 min
**Key concepts:** specific heat bowl questions · calorimetry toss-ups · phase change clues
**Summary:** High-yield bowl patterns for thermochemistry's heat and temperature questions.

#### Toss-Up Patterns
**Pattern 1 — Identify the substance by specific heat:**
"For 10 points — a substance has a specific heat of 4.184 joules per gram per degree Celsius and is used to moderate temperature in coastal climates. Name this compound."
→ **Water**

**Pattern 2 — q = mcΔT calculation:**
"For 10 points — how many joules are needed to raise 100 grams of water by 10 degrees Celsius?"
→ 100 × 4.184 × 10 = **4,184 J**

**Pattern 3 — Sign convention:**
"For 10 points — a reaction that releases heat to the surroundings is called this type of reaction."
→ **Exothermic**

**Pattern 4 — Phase change identification:**
"For 10 points — on a heating curve, the flat region at 100 degrees Celsius for water represents what process?"
→ **Vaporization (boiling)**

#### Speed Strategies
- Memorize water's four thermal constants: c_liq = 4.184, c_ice = 2.09, c_steam = 2.01, ΔH_vap = 2260 J/g
- For mixing problems, think conservation: heat lost = heat gained
- "Released" → exothermic → ΔH negative; "absorbed" → endothermic → ΔH positive

#### Review Questions
1. [Bowl-style] For 10 points — what is the heat of vaporization of water in joules per gram?
2. [Bowl-style] For 10 points — a bomb calorimeter operates at constant what? (pressure or volume)
3. [Bowl-style] For 10 points — what equation relates heat, mass, specific heat, and temperature change?

---

## Subtopic: Enthalpy

### Enthalpy: Definition, Sign, and Standard State
**Type:** Core Understanding
**Slug:** enthalpy-definition-sign-standard-state
**Estimated time:** 12 min
**Key concepts:** enthalpy · standard enthalpy · ΔH notation
**Summary:** Enthalpy (H) is the heat content of a system at constant pressure; ΔH quantifies energy changes in chemical reactions.

#### Defining Enthalpy
Enthalpy is defined as H = U + PV, where U is internal energy, P is pressure, and V is volume. In practice, we measure **ΔH = H_products − H_reactants**, the change in enthalpy during a process. At constant pressure (laboratory conditions), ΔH = q_p — the heat exchanged with the surroundings.

#### The Sign of ΔH
- **Exothermic** (ΔH < 0): Energy released; products at lower enthalpy than reactants. Example: combustion of methane, ΔH = −890 kJ/mol.
- **Endothermic** (ΔH > 0): Energy absorbed; products at higher enthalpy than reactants. Example: decomposition of CaCO₃, ΔH = +178 kJ/mol.

#### Standard Conditions
Standard enthalpy (ΔH°) is measured at 25°C (298 K), 1 atm pressure, with all substances in their **standard states** (pure solid, liquid, or 1 atm gas; 1 M for solutions). The degree symbol (°) always signals standard conditions. These are reference conditions, not reaction conditions — reactions can have ΔH° even if they don't occur at 25°C.

#### Enthalpy Is Extensive
ΔH scales with the amount of reaction. If 2H₂ + O₂ → 2H₂O has ΔH = −484 kJ, then burning 4 mol H₂ releases 968 kJ. When you multiply a reaction equation by *n*, multiply ΔH by *n* too.

#### Reversibility
Reversing a reaction changes the sign of ΔH but not the magnitude. If forming water releases 484 kJ, decomposing water requires 484 kJ. This is a direct consequence of enthalpy being a state function.

#### Review Questions
1. CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −890 kJ. What is ΔH for burning 0.5 mol CH₄?
2. What does it mean for a reaction to have ΔH° = +50 kJ/mol?
3. If H₂O(l) → H₂(g) + ½O₂(g) has ΔH = +242 kJ, what is ΔH for H₂(g) + ½O₂(g) → H₂O(l)?

---

### Standard Enthalpies of Formation
**Type:** Core Understanding
**Slug:** standard-enthalpies-formation
**Estimated time:** 13 min
**Key concepts:** ΔH°f · reference elements · ΔH°rxn from ΔH°f
**Summary:** Standard enthalpies of formation define the energy released or absorbed forming 1 mole of a compound from its elements in standard states.

#### Definition
The **standard enthalpy of formation** (ΔH°_f) is ΔH for forming **1 mole of a compound** from its **elements in their standard states**. By definition, ΔH°_f for any element in its standard state is **zero** (e.g., O₂(g), C(graphite), H₂(g) are all zero).

#### Key Values to Know
| Compound | ΔH°_f (kJ/mol) |
|---|---|
| H₂O(l) | −285.8 |
| H₂O(g) | −241.8 |
| CO₂(g) | −393.5 |
| CO(g) | −110.5 |
| NH₃(g) | −46.1 |
| NO(g) | +90.3 |
| C₂H₅OH(l) | −277.7 |
| CH₄(g) | −74.8 |

Note: H₂O(l) vs H₂O(g) differ by the heat of vaporization (44.0 kJ/mol at 25°C).

#### Calculating ΔH°_rxn
**ΔH°_rxn = Σ[ΔH°_f(products)] − Σ[ΔH°_f(reactants)]**

Each term is multiplied by its stoichiometric coefficient. **Example:** CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)
- Products: ΔH°_f(CO₂) + 2×ΔH°_f(H₂O) = −393.5 + 2(−285.8) = −965.1 kJ
- Reactants: ΔH°_f(CH₄) + 2×ΔH°_f(O₂) = −74.8 + 0 = −74.8 kJ
- ΔH°_rxn = −965.1 − (−74.8) = **−890.3 kJ** ✓

#### Review Questions
1. Calculate ΔH°_rxn for 2CO(g) + O₂(g) → 2CO₂(g) using ΔH°_f values above.
2. Why is ΔH°_f for N₂(g) defined as zero?
3. The ΔH°_f for H₂O(g) is less negative than for H₂O(l). Explain in terms of the condensation process.

---

## Subtopic: Hess's Law

### Hess's Law: Enthalpy Is Path-Independent
**Type:** Core Understanding
**Slug:** hess-law-path-independent
**Estimated time:** 13 min
**Key concepts:** Hess's Law · state function · enthalpy addition
**Summary:** Hess's Law states that ΔH for a reaction equals the sum of ΔH values for any series of steps that add up to the same overall reaction.

#### The Law
**Hess's Law:** If a reaction can be expressed as the sum of two or more reactions, then ΔH_overall = ΣΔH_steps. This works because enthalpy is a **state function** — it depends only on initial and final states, not the pathway. The overall enthalpy change is the same whether the reaction happens in one step or many.

#### The Manipulation Rules
To apply Hess's Law, you may:
1. **Reverse** a reaction → multiply ΔH by −1
2. **Multiply** a reaction by a factor *n* → multiply ΔH by *n*
3. **Add** equations together → add ΔH values

Species that appear on both sides cancel (like algebraic cancellation).

#### Classic Example
Find ΔH for: C(s) + ½O₂(g) → CO(g) — cannot be measured directly (CO₂ always forms).

Given:
- (1) C(s) + O₂(g) → CO₂(g), ΔH₁ = −393.5 kJ
- (2) CO(g) + ½O₂(g) → CO₂(g), ΔH₂ = −283.0 kJ

Strategy: Use (1) forward, reverse (2):
- C(s) + O₂(g) → CO₂(g), ΔH = −393.5 kJ
- CO₂(g) → CO(g) + ½O₂(g), ΔH = +283.0 kJ
- **Sum:** C(s) + ½O₂(g) → CO(g), ΔH = −110.5 kJ ✓ (matches tabulated ΔH°_f for CO)

#### Step-by-Step Strategy
1. Identify the **target reaction** you want ΔH for.
2. Find given reactions that contain each species in the target.
3. Manipulate (reverse/multiply) to get each target species on the correct side.
4. Cancel intermediates, verify equation matches target, sum the ΔH values.

#### Review Questions
1. Given: N₂ + O₂ → 2NO, ΔH = +180 kJ; 2NO + O₂ → 2NO₂, ΔH = −113 kJ. Find ΔH for N₂ + 2O₂ → 2NO₂.
2. Why is it impossible to measure the ΔH for C + ½O₂ → CO directly in the lab?
3. If you double all coefficients in a Hess's Law problem, what happens to ΔH?

---

### Applying Hess's Law: Multi-Step Problems
**Type:** Application
**Slug:** hess-law-multi-step
**Estimated time:** 14 min
**Key concepts:** Hess's Law application · enthalpy algebra · intermediate cancellation
**Summary:** Worked examples of using Hess's Law with three or more given equations to find the target ΔH.

#### Three-Step Example
**Target:** 2C(s) + H₂(g) → C₂H₂(g) (formation of acetylene)

**Given:**
- (1) C₂H₂(g) + 5/2 O₂(g) → 2CO₂(g) + H₂O(l), ΔH = −1299.6 kJ
- (2) C(s) + O₂(g) → CO₂(g), ΔH = −393.5 kJ
- (3) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ

**Strategy:**
- Reverse (1): 2CO₂(g) + H₂O(l) → C₂H₂(g) + 5/2 O₂(g), ΔH = +1299.6 kJ
- Multiply (2) × 2: 2C(s) + 2O₂(g) → 2CO₂(g), ΔH = −787.0 kJ
- Use (3) as is: H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ

**Sum:**
2C(s) + H₂(g) + 2CO₂(g) + H₂O(l) + 5/2O₂(g) → C₂H₂(g) + 5/2O₂(g) + 2CO₂(g) + H₂O(l) + 2O₂(g)

Cancel CO₂, H₂O, O₂ on both sides:
**2C(s) + H₂(g) → C₂H₂(g), ΔH = +1299.6 − 787.0 − 285.8 = +226.8 kJ** ✓

#### Common Mistakes
- Forgetting to flip the sign when reversing a reaction
- Not multiplying ΔH when multiplying the equation
- Cancelling species without matching states (CO₂(g) ≠ CO₂(aq))

#### Check Your Work
Always verify: (1) the intermediate species all cancel, (2) the target equation matches exactly, (3) the arithmetic is correct.

#### Review Questions
1. Use Hess's Law to find ΔH for: 4Fe(s) + 3O₂(g) → 2Fe₂O₃(s), given: 2Fe₂O₃ → 4Fe + 3O₂, ΔH = +1648 kJ.
2. A student reverses equation (2) but forgets to change the sign of ΔH. What error results?
3. Can Hess's Law be applied to phase changes as well as chemical reactions? Explain.

---

### Hess's Law Bowl Clinic
**Type:** Competition Extension
**Slug:** hess-law-bowl-clinic
**Estimated time:** 7 min
**Key concepts:** Hess's Law toss-ups · sign flip trap · enthalpy addition speed
**Summary:** Bowl-focused patterns for Hess's Law questions and common answer traps.

#### Toss-Up Patterns
**Pattern 1 — Definition:**
"For 10 points — this law states that the enthalpy change of a reaction is independent of the pathway taken and equals the sum of enthalpy changes for any series of steps."
→ **Hess's Law**

**Pattern 2 — Identify the physicist:**
"For 10 points — Hess's Law is named after which 19th-century Swiss-Russian chemist who established this principle of thermochemistry in 1840?"
→ **Germain Hess**

**Pattern 3 — Quick calculation:**
"For 10 points — if reaction A has ΔH = −100 kJ and reaction B has ΔH = +60 kJ, and the target reaction is A + B, what is ΔH for the target?"
→ **−40 kJ**

#### Speed Tips
- Always reverse the equation that contains your target product on the wrong side
- Track O₂ carefully — it's often the species that balances last
- If ΔH seems too large (>1000 kJ), check if you forgot to adjust for stoichiometry

#### Review Questions
1. [Bowl-style] For 10 points — Hess's Law is a direct consequence of enthalpy being what type of function?
2. [Bowl-style] For 10 points — if you reverse a reaction in a Hess's Law calculation, what happens to ΔH?
3. [Bowl-style] For 10 points — Hess's Law allows chemists to calculate ΔH for reactions that are difficult to do what in the laboratory?

---

## Subtopic: Calorimetry

### Bomb vs. Coffee Cup Calorimetry: Choosing the Right Tool
**Type:** Core Understanding
**Slug:** bomb-vs-coffee-cup
**Estimated time:** 11 min
**Key concepts:** constant pressure vs. constant volume · q_p vs. q_v · calorimeter heat capacity
**Summary:** Coffee cup calorimeters measure q at constant pressure; bomb calorimeters measure q at constant volume; each suits different reaction types.

#### Two Designs, Two Conditions
| Feature | Coffee Cup | Bomb Calorimeter |
|---|---|---|
| Pressure | Constant (atmospheric) | Constant (volume sealed) |
| Measures | q_p = ΔH | q_v = ΔU |
| Best for | Aqueous reactions, neutralization, dissolution | Combustion, food calories, explosives |
| Insulation | Styrofoam cup | Water bath + steel bomb |
| Calibration | Not usually needed | Required (benzoic acid standard) |

#### The Calorimeter Constant
A bomb calorimeter has a **heat capacity** C_cal (units: kJ/°C) that accounts for the steel vessel and thermometer absorbing heat. After calibration: q_rxn = −C_cal × ΔT. In a coffee cup, you usually assume C_cal ≈ 0 (Styrofoam absorbs negligible heat), so all heat goes to solution: q_rxn = −m_soln × c_water × ΔT.

#### Precision Comparison
Bomb calorimeters are far more precise — sealed system, no evaporation, calibrated constant. Coffee cups are sufficient for classroom measurements (±5% accuracy) but inadequate for research. Published ΔH_comb values come from bomb calorimeters.

#### Review Questions
1. A student dissolves NaOH in water in a coffee cup calorimeter. Which quantity is directly measured: ΔH or ΔU?
2. If C_cal = 3.50 kJ/°C and ΔT = 4.25°C, what heat was released in the bomb?
3. Why can't a coffee cup calorimeter be used to measure the heat of combustion of gasoline?

---

### Calorimetry Calculation Workshop
**Type:** Application
**Slug:** calorimetry-calculation-workshop
**Estimated time:** 14 min
**Key concepts:** complete calorimetry calculation · unit tracking · enthalpy per mole
**Summary:** Full worked-example session covering both coffee cup and bomb calorimeter calculations from start to finish.

#### Problem Set 1: Coffee Cup
**Scenario:** 4.00 g of NaOH (MW = 40.00 g/mol) dissolves in 96.0 g of water. Temperature rises from 20.0°C to 34.2°C.
1. Mass of solution: 4.00 + 96.0 = 100.0 g
2. ΔT = 34.2 − 20.0 = +14.2°C
3. q_soln = (100.0)(4.184)(14.2) = +5941 J
4. q_rxn = −5941 J (exothermic)
5. Moles NaOH = 4.00/40.00 = 0.100 mol
6. **ΔH_soln = −5941/0.100 = −59,410 J/mol = −59.4 kJ/mol**

#### Problem Set 2: Bomb Calorimeter
**Scenario:** C_cal = 5.22 kJ/°C. 0.325 g of sucrose (MW = 342.3) is burned; ΔT = 1.25°C.
1. q_rxn = −(5.22)(1.25) = −6.525 kJ released per 0.325 g
2. Moles sucrose = 0.325/342.3 = 9.494 × 10⁻⁴ mol
3. **ΔH_comb = −6.525 / (9.494 × 10⁻⁴) = −6873 kJ/mol**
(Literature: −5640 kJ/mol — this is a simplified scenario with a modified C_cal for illustration)

#### Problem Set 3: Finding Final Temperature
50 g of 80°C water is added to 150 g of 20°C water. Find T_final.
- q_hot = (50)(4.184)(T_f − 80), q_cold = (150)(4.184)(T_f − 20)
- q_hot + q_cold = 0: 50(T_f − 80) + 150(T_f − 20) = 0
- 50T_f − 4000 + 150T_f − 3000 = 0 → 200T_f = 7000 → **T_f = 35°C**

#### Review Questions
1. 0.500 g of benzoic acid (ΔH_comb = −26.38 kJ/g) is burned in a calorimeter. ΔT = 2.76°C. Find C_cal.
2. 100 mL of 0.500 M HNO₃ reacts with 100 mL of 0.500 M KOH in a coffee cup. ΔT = +3.19°C. Find ΔH_neutralization per mole.
3. What two assumptions simplify coffee cup calorimetry? How does each introduce error?

---

### Calorimetry Rapid Review
**Type:** Mixed/Review
**Slug:** calorimetry-rapid-review
**Estimated time:** 8 min
**Key concepts:** calorimetry synthesis · sign convention · unit checking
**Summary:** Mixed practice connecting calorimetry concepts with common bowl-question phrasing.

#### Key Equations at a Glance
- Coffee cup: **q_rxn = −(m_soln)(c_water)(ΔT)**
- Bomb: **q_rxn = −(C_cal)(ΔT)**
- Per mole: **ΔH = q_rxn / n**
- Mixing: **q_lost + q_gained = 0**

#### Concept Checks
1. The solution temperature drops by 5°C. Is q_rxn positive or negative?
2. You double the amount of reagent used. Does ΔH per mole change? Does q_rxn change?
3. A bomb calorimeter and a coffee cup measure the same reaction. Why might they give slightly different ΔH values?

#### Typical Errors to Avoid
- Using mass of one reagent instead of total solution mass
- Forgetting to convert J → kJ when reporting ΔH
- Using ΔT as T_initial − T_final instead of T_final − T_initial
- Not dividing by moles to get ΔH per mole

#### Review Questions
1. 200 mL of solution in a coffee cup cools 3.0°C. Calculate q_rxn (density = 1.00 g/mL).
2. Bomb: C_cal = 4.00 kJ/°C, ΔT = 2.50°C, sample is 0.400 g of ethanol (MW 46.07). Find ΔH_comb per mol.
3. Neutralization of a strong acid and strong base always gives approximately −57 kJ/mol. Why is this consistent regardless of which acid and base?

---

## Subtopic: Entropy & Gibbs Free Energy

### Entropy: Disorder and the Second Law
**Type:** Core Understanding
**Slug:** entropy-second-law
**Estimated time:** 12 min
**Key concepts:** entropy · Second Law · spontaneous processes
**Summary:** Entropy (S) measures the disorder or number of microstates in a system; the Second Law states total entropy always increases for spontaneous processes.

#### What Is Entropy?
Entropy (S) is a measure of the **number of microstates** (arrangements) available to a system. More disorder = more microstates = higher entropy. Units are J/mol·K. Gases have much higher entropy than liquids; liquids higher than solids. Larger molecules have more entropy than smaller ones. Dissolved ions in solution have greater entropy than the crystal lattice.

#### The Second Law of Thermodynamics
"The total entropy of the universe always increases for a spontaneous process." ΔS_universe = ΔS_system + ΔS_surroundings ≥ 0. For reversible processes at equilibrium, ΔS_universe = 0; for all real (irreversible) spontaneous processes, ΔS_universe > 0.

#### Predicting the Sign of ΔS
| Process | ΔS expected |
|---|---|
| Solid → liquid → gas | Positive (more disorder) |
| Fewer moles of gas → more moles of gas | Positive |
| Dissolving most salts | Positive |
| Decrease in temperature | Negative |
| Forming precipitate | Negative |

**Example:** N₂(g) + 3H₂(g) → 2NH₃(g): 4 mol gas → 2 mol gas, ΔS < 0.

#### Third Law Connection
The **Third Law** states that entropy of a perfect crystal at absolute zero is zero. This gives us an absolute reference point — standard molar entropies (S°) are always positive.

#### Review Questions
1. Predict the sign of ΔS for: 2SO₂(g) + O₂(g) → 2SO₃(g)
2. Is melting ice at room temperature spontaneous? What drives it? (ΔH > 0, yet spontaneous)
3. Why does a gas expanding into a vacuum increase entropy spontaneously even though no heat is exchanged?

---

### Gibbs Free Energy: Predicting Spontaneity
**Type:** Core Understanding
**Slug:** gibbs-free-energy-spontaneity
**Estimated time:** 13 min
**Key concepts:** ΔG = ΔH − TΔS · spontaneity · temperature dependence
**Summary:** Gibbs free energy (G) combines enthalpy and entropy to predict whether a reaction is spontaneous at a given temperature.

#### The Gibbs Equation
**ΔG = ΔH − TΔS** (at constant T and P)
- ΔG < 0: reaction is **spontaneous** (thermodynamically favorable)
- ΔG > 0: reaction is **non-spontaneous** (reverse reaction is spontaneous)
- ΔG = 0: system is at **equilibrium**

T is in Kelvin (always!). ΔH is in kJ; ΔS is in J/mol·K — convert ΔS to kJ/K (divide by 1000) before subtracting.

#### Four Thermodynamic Cases
| ΔH | ΔS | ΔG | Spontaneous? |
|---|---|---|---|
| − | + | Always − | Always |
| + | − | Always + | Never |
| − | − | Depends on T | Low T (ΔH dominates) |
| + | + | Depends on T | High T (TΔS dominates) |

#### Example Calculation
For N₂(g) + 3H₂(g) → 2NH₃(g): ΔH = −92 kJ, ΔS = −198 J/mol·K
At 298 K: ΔG = −92 − (298)(−0.198) = −92 + 59.0 = **−33 kJ** (spontaneous)
At 600 K: ΔG = −92 − (600)(−0.198) = −92 + 118.8 = **+26.8 kJ** (non-spontaneous)

The reaction becomes non-spontaneous above ~465 K (where ΔG = 0).

#### Crossover Temperature
Set ΔG = 0: T = ΔH/ΔS. For NH₃ synthesis: T = −92,000 J / (−198 J/K) = **465 K**. Above this, the reaction won't proceed spontaneously; below it, it will.

#### Review Questions
1. ΔH = +40 kJ, ΔS = +120 J/mol·K. At what temperature does ΔG = 0? Above or below this T, is the reaction spontaneous?
2. A reaction has ΔH < 0 and ΔS < 0. Will increasing temperature make it more or less spontaneous?
3. The synthesis of Fe₂O₃ from Fe and O₂ is spontaneous at room temperature. Predict signs of ΔH and ΔS.

---

### Gibbs Free Energy in Industrial Context
**Type:** Application
**Slug:** gibbs-free-energy-industrial
**Estimated time:** 14 min
**Key concepts:** Haber process · ΔG temperature dependence · coupled reactions
**Summary:** Applying Gibbs free energy to real industrial processes shows how chemists optimize conditions for thermodynamically unfavorable reactions.

#### The Haber Process: Thermodynamics vs. Kinetics
N₂ + 3H₂ → 2NH₃: ΔH = −92 kJ, ΔS = −198 J/mol·K. The reaction is thermodynamically spontaneous at low temperatures but reaches equilibrium far to the right only slowly without a catalyst. At high temperatures, ΔG becomes positive (non-spontaneous).

**Industrial compromise:** 400–500°C and 200 atm pressure, with iron catalyst. Thermodynamics says "lower T is better"; kinetics says "higher T is faster." The Haber process balances both: fast enough rate with still-favorable ΔG, then removes NH₃ to drive equilibrium forward (Le Chatelier).

#### Coupled Reactions
Some reactions are non-spontaneous (ΔG > 0) but can be driven by coupling with a favorable reaction. **Example:** Glucose phosphorylation (ΔG = +13.8 kJ/mol) is coupled with ATP hydrolysis (ΔG = −30.5 kJ/mol). Net ΔG = +13.8 − 30.5 = **−16.7 kJ/mol** — spontaneous! This is how cells drive thermodynamically unfavorable biosynthesis.

#### Electrochemistry Connection
The standard Gibbs free energy relates to electrochemical cell voltage: **ΔG° = −nFE°**, where n is moles of electrons and F = 96,485 C/mol (Faraday's constant). A positive E° (spontaneous cell) gives negative ΔG° — consistent.

#### Review Questions
1. For the Haber process at 25°C: ΔH = −92 kJ, ΔS = −198 J/mol·K. Calculate ΔG°. Is the reaction spontaneous?
2. Why do living cells use coupled reactions rather than running every reaction independently?
3. A fuel cell converts H₂ + ½O₂ → H₂O with ΔG° = −237 kJ/mol. Using ΔG° = −nFE°, find the theoretical cell voltage (n = 2).

---

### Entropy and Gibbs Free Energy: Bowl Synthesis
**Type:** Mixed/Review
**Slug:** entropy-gibbs-bowl-synthesis
**Estimated time:** 9 min
**Key concepts:** ΔG = ΔH − TΔS · sign prediction · temperature crossover
**Summary:** Synthesis review of entropy and Gibbs free energy with bowl-style question practice.

#### Quick Decision Tree for Spontaneity
1. If ΔH < 0 AND ΔS > 0 → spontaneous at ALL temperatures
2. If ΔH > 0 AND ΔS < 0 → non-spontaneous at ALL temperatures
3. If ΔH < 0 AND ΔS < 0 → spontaneous only at LOW temperatures
4. If ΔH > 0 AND ΔS > 0 → spontaneous only at HIGH temperatures

#### Crossover Temperature
T_cross = ΔH/ΔS (in consistent units). Always convert ΔS from J to kJ first!

**Practice:** ΔH = −60 kJ, ΔS = −150 J/mol·K
T_cross = −60,000 J / (−150 J/K) = 400 K
Spontaneous below 400 K; non-spontaneous above 400 K (case 3 above).

#### Entropy Trend Check
Rank these by increasing S°: diamond (s), liquid water, water vapor, O₂ gas, octane vapor.
Answer: diamond < liquid water < O₂(g) < water vapor < octane vapor
(More atoms/molecule and higher molecular weight increases S° for gases)

#### Review Questions
1. ΔH = +25 kJ, ΔS = +80 J/mol·K. Calculate ΔG at 500 K. Spontaneous?
2. Rank by entropy: NaCl(s), NaCl(aq), Na⁺(aq) + Cl⁻(aq). Explain.
3. For ΔH = −100 kJ and ΔS = −200 J/mol·K, find the temperature where the reaction becomes non-spontaneous.

---

### Thermochemistry Competition Clinic
**Type:** Competition Extension
**Slug:** thermochemistry-competition-clinic
**Estimated time:** 7 min
**Key concepts:** Gibbs free energy bowl toss-ups · ΔH/ΔS quick reads · thermodynamics clue words
**Summary:** High-yield bowl patterns for Gibbs free energy, entropy, and Hess's Law questions.

#### Toss-Up Patterns
**Pattern 1 — Gibbs definition:**
"For 10 points — this thermodynamic quantity, defined as H minus T times S, is negative for all spontaneous processes at constant temperature and pressure."
→ **Gibbs free energy** (accept: G, ΔG)

**Pattern 2 — Second Law:**
"For 10 points — this law of thermodynamics states that the total entropy of the universe increases in any spontaneous process."
→ **Second Law of Thermodynamics**

**Pattern 3 — Spontaneity case:**
"For 10 points — a reaction with positive ΔH and positive ΔS will be spontaneous under what temperature conditions?"
→ **High temperature** (entropy dominates at high T)

**Pattern 4 — Equation recall:**
"For 10 points — what equation relates Gibbs free energy to enthalpy, temperature, and entropy?"
→ **ΔG = ΔH − TΔS**

#### Bowl-Speed Entropy Heuristics
- More moles of gas on product side → ΔS > 0
- Dissolving → ΔS > 0 (usually)
- Crystallization, precipitation → ΔS < 0
- Cooling → ΔS < 0 for surroundings

#### Review Questions
1. [Bowl-style] For 10 points — a reaction is spontaneous at all temperatures when ΔH is negative and ΔS is what?
2. [Bowl-style] For 10 points — Gibbs free energy equals zero at what condition for a chemical system?
3. [Bowl-style] For 10 points — what scientist's name is given to the thermodynamic potential function G = H − TS?
