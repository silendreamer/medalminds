# HS Physics — Thermodynamics
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Temperature, Heat & Thermal Expansion

### What Is Temperature? Kinetic Energy and the Kelvin Scale
**Type:** Core Understanding
**Slug:** temperature-kinetic-energy-kelvin
**Estimated time:** 12 min
**Key concepts:** temperature · kinetic energy · Kelvin scale · absolute zero
**Summary:** Temperature measures the average kinetic energy of particles; the Kelvin scale starts at absolute zero, where molecular motion ceases.

#### Temperature as Average Kinetic Energy
Temperature is not heat — it is a measure of the average translational kinetic energy of the particles in a substance. A hot gas has faster-moving molecules on average than a cold gas. This distinction matters: two objects can have the same temperature but very different amounts of internal energy if they differ in mass or specific heat capacity.

#### The Kelvin Scale
The Kelvin scale (SI unit: K) begins at absolute zero (0 K = −273.15 °C), where classical molecular motion would cease. Conversion: K = °C + 273.15. Kelvin must be used in all gas-law calculations. The Celsius scale shifts zero to water's freezing point; the Fahrenheit scale has different-sized degrees. Science Bowl questions frequently test K ↔ °C conversion.

#### Thermal Equilibrium and the Zeroth Law
The Zeroth Law of Thermodynamics states: if object A is in thermal equilibrium with object B, and B is in equilibrium with C, then A and C are also in equilibrium. This law justifies the existence of thermometers and defines temperature as a transitive, measurable property.

#### Thermal Expansion
Most materials expand when heated: ΔL = αL₀ΔT (linear); ΔV = βV₀ΔT (volumetric), where α is the linear expansion coefficient and β ≈ 3α. Water is an important exception — it is densest at 4 °C and expands when frozen, which is why ice floats.

#### Why This Matters for Competition
Bowl questions test: converting Celsius to Kelvin (add 273), identifying absolute zero (0 K = −273.15 °C), and explaining why water's expansion on freezing is anomalous. The statement "temperature measures average kinetic energy" appears in multiple-choice distractors.

#### Review Questions
1. Convert 27 °C to Kelvin.
2. Why must temperature be expressed in Kelvin when using the ideal gas law?
3. A steel bridge is 500 m long at 20 °C. If α_steel = 12 × 10⁻⁶ /°C, how much does it expand when heated to 40 °C?

---

### Heat Transfer: Calorimetry and Specific Heat
**Type:** Core Understanding
**Slug:** heat-transfer-calorimetry-specific-heat
**Estimated time:** 13 min
**Key concepts:** heat · specific heat capacity · Q = mcΔT · calorimetry
**Summary:** Heat is energy transferred due to a temperature difference, quantified by Q = mcΔT, where specific heat capacity c measures a material's resistance to temperature change.

#### Heat vs. Temperature
Heat (Q) is energy in transit — it flows from higher to lower temperature until equilibrium. It is measured in joules (J) or calories (1 cal = 4.186 J). Temperature is a state property; heat is a process quantity. Once transferred, the energy becomes internal energy of the object — not "heat stored."

#### Specific Heat Capacity
Q = mcΔT, where m is mass (kg), c is specific heat capacity (J/kg·K), and ΔT is temperature change. Water has an unusually high specific heat (c ≈ 4186 J/kg·K), making it an excellent thermal buffer. Metals have much lower values (copper ≈ 385, aluminum ≈ 900, iron ≈ 450 J/kg·K). High specific heat means more energy is needed per degree of temperature rise.

#### Calorimetry
In an insulated calorimeter, heat lost by the hot object equals heat gained by the cold object: m₁c₁ΔT₁ = m₂c₂ΔT₂. This conservation equation assumes no heat loss to the surroundings — the standard assumption on exams. Phase changes (melting, boiling) use Q = mL (latent heat) rather than Q = mcΔT, since ΔT = 0 during the phase change.

#### Latent Heat
During a phase transition, temperature stays constant while energy goes into changing state. Latent heat of fusion for water: L_f = 334 kJ/kg. Latent heat of vaporization: L_v = 2260 kJ/kg — far larger because bonds must be broken to separate liquid molecules entirely.

#### Review Questions
1. How much heat is required to raise 2 kg of water from 20 °C to 100 °C? (c_water = 4186 J/kg·K)
2. 0.5 kg of copper at 200 °C is dropped into 1 kg of water at 20 °C. Find the final equilibrium temperature. (c_Cu = 385, c_water = 4186 J/kg·K)
3. Why does water have such a large latent heat of vaporization compared to its latent heat of fusion?

---

### Phases of Matter and Phase Diagrams
**Type:** Core Understanding
**Slug:** phases-matter-phase-diagrams
**Estimated time:** 12 min
**Key concepts:** phases of matter · phase diagram · triple point · critical point · sublimation
**Summary:** Phase diagrams map the conditions under which a substance exists as solid, liquid, or gas, with special points marking unique thermodynamic states.

#### The Three Phases and Transitions
Matter exists as solid (fixed shape and volume), liquid (fixed volume, variable shape), or gas (variable shape and volume). Transitions between phases: melting (solid→liquid), freezing (liquid→solid), vaporization (liquid→gas), condensation (gas→liquid), sublimation (solid→gas), and deposition (gas→solid). Each transition has an associated latent heat.

#### Reading a Phase Diagram
A phase diagram plots pressure (y-axis) vs. temperature (x-axis). The boundaries between regions are phase equilibrium lines. The triple point is where all three phases coexist simultaneously (for water: 0.006 atm, 0.01 °C). The critical point marks where liquid and gas phases become indistinguishable; above it, the substance is a supercritical fluid.

#### Sublimation
At pressures below the triple-point pressure, a solid converts directly to gas without passing through liquid. Dry ice (solid CO₂) sublimes at atmospheric pressure because CO₂'s triple-point pressure (5.11 atm) is above 1 atm.

#### Water's Unusual Phase Diagram
The solid-liquid boundary for water has a negative slope — increasing pressure lowers the melting point. This is due to water being less dense than ice. This anomaly allows ice skating (pressure melts ice) and contributes to glacier movement.

#### Review Questions
1. What is the triple point and what is special about it?
2. Why does dry ice sublime rather than melt at room pressure?
3. How does water's solid-liquid phase boundary differ from most substances, and why?

---

### Calorimetry Problem: Coffee Cooling
**Type:** Application
**Slug:** calorimetry-coffee-cooling
**Estimated time:** 14 min
**Key concepts:** Q = mcΔT · heat exchange · thermal equilibrium · specific heat
**Summary:** A step-by-step calorimetry calculation determines the final temperature when hot coffee mixes with cold cream.

#### Setup
A student pours 200 mL of coffee (assume water, c = 4186 J/kg·K, density ≈ 1 kg/L) at 95 °C into a cup that already contains 50 mL of cream (also approximate as water) at 5 °C. Find the final equilibrium temperature. Assume no heat loss to the surroundings or cup.

#### Solution
Mass of coffee: m₁ = 0.200 kg; mass of cream: m₂ = 0.050 kg. Set heat lost = heat gained:
m₁c(T_f − 95) + m₂c(T_f − 5) = 0
Since both c values are equal, divide by c:
0.200(T_f − 95) + 0.050(T_f − 5) = 0
0.200 T_f − 19 + 0.050 T_f − 0.25 = 0
0.250 T_f = 19.25
T_f = 77 °C

#### Interpreting the Result
The final temperature is much closer to the coffee's initial temperature than the cream's because the coffee has four times the mass. This illustrates that equilibrium temperature is a mass-weighted average: T_f = (m₁T₁ + m₂T₂)/(m₁ + m₂) — valid when c is the same for both.

#### Extensions
If the cup itself has mass 0.150 kg and specific heat 900 J/kg·K (ceramic) and starts at 20 °C, the cup absorbs heat too. Re-solve: 0.200·4186(T_f−95) + 0.050·4186(T_f−5) + 0.150·900(T_f−20) = 0. The cup lowers the final temperature to ~72 °C.

#### Review Questions
1. Redo the calculation if the coffee mass is doubled to 400 mL — qualitatively, is T_f closer to 95 °C or 5 °C?
2. Why is the c value for cream approximated as that of water in this problem?
3. If you add ice instead of cold cream, which latent heat must you include, and how does that change the equation?

---

### Thermal Expansion Application: Engineering Design
**Type:** Application
**Slug:** thermal-expansion-engineering
**Estimated time:** 13 min
**Key concepts:** linear expansion · ΔL = αL₀ΔT · thermal stress · engineering joints
**Summary:** Engineers account for thermal expansion in bridges, pipelines, and rails through expansion joints and careful material selection.

#### The Problem of Thermal Expansion
A steel rail 10 m long at 0 °C (α_steel = 1.2 × 10⁻⁵ /°C) expands by: ΔL = αL₀ΔT = (1.2×10⁻⁵)(10)(40) = 4.8 × 10⁻³ m = 4.8 mm when temperature rises 40 °C in summer. If no gap is left between rails, the force generated by constrained expansion can buckle the track (thermal stress = YαΔT, where Y is Young's modulus).

#### Expansion Joints
Expansion joints (small gaps) in bridges, sidewalks, and pipelines allow materials to expand freely. For a 1000 m bridge over a 60 °C seasonal range, total expansion is (1.2×10⁻⁵)(1000)(60) = 0.72 m — nearly 72 cm. Without joints, stresses would be enormous.

#### Bimetallic Strips
A bimetallic strip bonds two metals with different α values. Heating causes the strip to curve toward the metal with smaller α (which expands less). This is the operating principle of mechanical thermostats. If brass (α = 1.9×10⁻⁵) is bonded to steel (α = 1.2×10⁻⁵), the strip curves toward the steel side when heated.

#### Liquid Expansion in Thermometers
Mercury (β = 1.82 × 10⁻⁴ /°C) expands more than glass (β ≈ 2.5 × 10⁻⁵ /°C). The differential expansion pushes mercury up the narrow capillary tube, providing a readable temperature reading. Volume expansion: ΔV = βV₀ΔT.

#### Review Questions
1. A concrete highway slab is 12 m long at 10 °C (α = 1.2×10⁻⁵ /°C). What minimum gap must be left at each end for a summer high of 50 °C?
2. In a bimetallic strip, which material is on the outer curve when heated — the one with higher or lower α?
3. Why do thermometer capillaries need to be very narrow?

---

### Temperature and Heat: Mixed Review
**Type:** Mixed/Review
**Slug:** temperature-heat-mixed-review
**Estimated time:** 10 min
**Key concepts:** Q = mcΔT · latent heat · Kelvin conversion · calorimetry
**Summary:** Integrates specific heat, latent heat, unit conversion, and calorimetry in multi-step problems.

#### Review Problem 1 — Full Heating Curve
How much total heat is needed to convert 0.5 kg of ice at −20 °C to steam at 120 °C? (c_ice = 2090, c_water = 4186, c_steam = 2010 J/kg·K; L_f = 334,000, L_v = 2,260,000 J/kg)
- Warm ice: Q₁ = 0.5 × 2090 × 20 = 20,900 J
- Melt ice: Q₂ = 0.5 × 334,000 = 167,000 J
- Warm water: Q₃ = 0.5 × 4186 × 100 = 209,300 J
- Boil water: Q₄ = 0.5 × 2,260,000 = 1,130,000 J
- Warm steam: Q₅ = 0.5 × 2010 × 20 = 20,100 J
Total: ≈ 1,547,300 J ≈ 1.55 MJ

#### Review Problem 2 — Thermal Expansion
An aluminum rod (α = 2.4×10⁻⁵ /°C) is 2.0 m long at 25 °C. At what temperature will it be 2.001 m? ΔL = 0.001 m; ΔT = ΔL/(αL₀) = 0.001/(2.4×10⁻⁵ × 2.0) = 20.8 °C → T_f = 45.8 °C.

#### Key Concept Summary
| Quantity | Equation | Notes |
|---|---|---|
| Sensible heat | Q = mcΔT | T changes |
| Latent heat | Q = mL | T constant |
| Linear expansion | ΔL = αL₀ΔT | — |
| Volume expansion | ΔV = βV₀ΔT | β ≈ 3α |

#### Review Questions
1. A 1 kg block of copper at 300 °C is placed in 2 kg of water at 20 °C. Find T_f without looking up c values — what additional information do you need?
2. On a heating curve, which segment requires the most energy per kilogram of water, and why?
3. Define absolute zero in two ways: (a) in °C and (b) in terms of molecular motion.

---

### Thermal Physics Concept Map
**Type:** Mixed/Review
**Slug:** thermal-physics-concept-map
**Estimated time:** 9 min
**Key concepts:** temperature · heat · specific heat · thermal expansion · phase transitions
**Summary:** Synthesizes all subtopic 1 concepts through a visual concept map and rapid-fire questions.

#### Concept Connections
- Temperature (K) → defines average KE of particles
- Temperature difference → drives heat flow Q = mcΔT
- Q + phase transition → Q = mL (T constant)
- Heating changes T → ΔL = αL₀ΔT (expansion)
- All heat exchange conserved: Q_lost + Q_gained = 0

#### Quick Concept Checks
1. Two blocks — same mass, same temperature, different materials — do they have the same thermal energy? (No — internal energy depends on specific heat and structure, not just temperature)
2. Is it possible to add heat to a substance without raising its temperature? (Yes — during a phase change)
3. A substance shrinks when heated. Is this possible? (Yes — rubber shrinks when heated due to polymer entropic elasticity; water between 0–4 °C also contracts)

#### Competition Vocabulary Drill
- Zeroth Law → thermal equilibrium is transitive
- Specific heat of water → 4186 J/kg·K (or 1 cal/g·°C)
- Triple point of water → 0.01 °C, 611.7 Pa
- Absolute zero → 0 K = −273.15 °C

#### Review Questions
1. Rank the energy required to raise 1 kg of each by 10 °C: water, copper, aluminum.
2. Sketch a complete heating curve for water from −20 °C to 120 °C, labeling each segment with the appropriate equation.
3. A platinum resistance thermometer reads higher resistance at higher temperature. What property of temperature is it exploiting?

---

### High-Yield Thermodynamics Bowl Facts
**Type:** Competition Extension
**Slug:** thermodynamics-bowl-facts
**Estimated time:** 7 min
**Key concepts:** bowl toss-up patterns · specific heats · latent heats · Kelvin scale
**Summary:** The most frequently tested thermodynamics facts in Science Bowl, with toss-up stem patterns and traps to avoid.

#### Top Bowl Toss-Up Patterns
- "For 10 points, what is the SI unit of heat?" → **joule** (not calorie; calorie is non-SI)
- "Name the temperature at which molecular motion theoretically ceases." → **absolute zero** (accept 0 Kelvin or −273.15 °C)
- "What law of thermodynamics states that two systems in thermal equilibrium with a third are in equilibrium with each other?" → **Zeroth Law**
- "What term describes the energy required to melt 1 kg of a solid at constant temperature?" → **latent heat of fusion**

#### Number Facts to Memorize
| Fact | Value |
|---|---|
| Specific heat of water | 4186 J/kg·K ≈ 4.186 J/g·K |
| Latent heat of fusion (water) | 334 kJ/kg |
| Latent heat of vaporization (water) | 2260 kJ/kg |
| Absolute zero | −273.15 °C = 0 K |
| Triple point of water | 0.01 °C, 611.7 Pa |

#### Common Traps
- "Heat" and "temperature" are not interchangeable — heat is energy, temperature is a property.
- Latent heat involves no temperature change — do not add mcΔT during a phase change.
- Celsius and Kelvin have the same degree size; Fahrenheit degrees are smaller.

#### Review Questions
1. For 10 points — what is the specific heat capacity of water in SI units?
2. For 10 points — what type of heat describes the energy absorbed or released during a phase transition?
3. Which requires more energy: melting 1 kg of ice (L_f = 334 kJ/kg) or vaporizing the same 1 kg of water (L_v = 2260 kJ/kg)?

---

## Subtopic: Heat Transfer (Conduction, Convection & Radiation)

### Conduction: Heat Flow Through Solids
**Type:** Core Understanding
**Slug:** conduction-heat-flow-solids
**Estimated time:** 12 min
**Key concepts:** thermal conduction · Fourier's Law · thermal conductivity · thermal resistance
**Summary:** Conduction transfers heat through direct particle collisions in a material; rate depends on material conductivity, cross-sectional area, and temperature gradient.

#### Fourier's Law of Conduction
The rate of heat transfer by conduction: Q/t = kA(ΔT/L), where k is thermal conductivity (W/m·K), A is cross-sectional area (m²), ΔT is temperature difference (K), and L is thickness (m). High k → good conductor (metals: copper k ≈ 400, aluminum ≈ 205 W/m·K). Low k → good insulator (glass wool k ≈ 0.04, air k ≈ 0.024 W/m·K).

#### Microscopic Mechanism
In metals, conduction is dominated by free electrons that carry kinetic energy rapidly through the lattice — this is why metals are both good electrical and thermal conductors. In non-metals, conduction occurs through phonon vibrations (lattice waves). Diamond has exceptionally high k (≈ 2000 W/m·K) due to its rigid covalent lattice, despite being electrically insulating.

#### Thermal Resistance (R-value)
Thermal resistance R = L/kA (or R = L/k per unit area). In building science, R-values are used to rate insulation — higher R means better insulation. Materials in series have additive R-values; the material with the highest R dominates heat loss.

#### Worked Example
A glass window (k = 0.96 W/m·K) is 1.5 m × 1.0 m and 6 mm thick. ΔT = 20 °C (inside vs. outside). Heat loss rate: Q/t = (0.96)(1.5)(20)/(0.006) = 4800 W. This is substantial — double-pane windows add an air gap (k_air ≈ 0.024) to dramatically reduce conduction.

#### Review Questions
1. Write Fourier's Law and define each variable with units.
2. Why are metals better thermal conductors than non-metals?
3. Two slabs (L₁ = 2 cm, k₁ = 1 W/m·K) and (L₂ = 1 cm, k₂ = 0.5 W/m·K) are in series. Which provides more thermal resistance?

---

### Convection and Radiation
**Type:** Core Understanding
**Slug:** convection-radiation-heat-transfer
**Estimated time:** 13 min
**Key concepts:** convection · radiation · Stefan-Boltzmann Law · blackbody · emissivity
**Summary:** Convection transfers heat through fluid movement; radiation transfers heat as electromagnetic waves and is governed by the Stefan-Boltzmann Law.

#### Convection
Convection requires a fluid (liquid or gas). Natural (free) convection is driven by density differences due to temperature: warm fluid rises, cool fluid sinks, forming circulation cells. Forced convection uses external agents (fans, pumps). Newton's Law of Cooling approximates convective heat loss: Q/t ≈ hAΔT, where h is the convective heat transfer coefficient (W/m²·K).

#### Radiation
All objects with temperature above 0 K emit electromagnetic radiation. Unlike conduction and convection, radiation requires no medium — it travels through vacuum (hence solar energy reaching Earth). Power radiated: P = εσAT⁴ (Stefan-Boltzmann Law), where σ = 5.67 × 10⁻⁸ W/m²·K⁴, ε is emissivity (0 ≤ ε ≤ 1), A is surface area, and T is temperature in Kelvin.

#### Blackbodies and Emissivity
A perfect blackbody (ε = 1) absorbs all incident radiation and emits at the maximum possible rate. Real surfaces have ε < 1. A shiny silver surface has very low ε (≈ 0.02) and thus radiates very little — why Mylar blankets keep heat in. Darker, rougher surfaces have ε closer to 1.

#### Wien's Displacement Law
The peak wavelength of blackbody radiation: λ_max = b/T, where b = 2.898 × 10⁻³ m·K. The Sun (T ≈ 5778 K) peaks in visible light (≈ 500 nm). A human body (T ≈ 310 K) peaks in infrared (≈ 9.4 μm) — the basis of thermal imaging cameras.

#### Review Questions
1. Why can radiation transfer heat through a vacuum but conduction cannot?
2. If a blackbody's temperature doubles, by what factor does its radiated power increase?
3. A star has surface temperature 10,000 K. Calculate its peak emission wavelength using Wien's Law.

---

### Heat Transfer in Engineering: Insulation and Thermos Design
**Type:** Application
**Slug:** heat-transfer-engineering-insulation
**Estimated time:** 14 min
**Key concepts:** all three heat transfer modes · R-value · vacuum insulation · radiation shields
**Summary:** A thermos eliminates all three heat transfer mechanisms through specific engineering choices, illustrating each mode's mitigation strategy.

#### The Thermos Design Challenge
A thermos must keep hot coffee hot (or cold drinks cold) for hours. Heat can escape via conduction, convection, and radiation. The thermos engineers address each separately.

#### Conduction: Double Wall with Vacuum
The space between the inner and outer glass walls is evacuated to near-vacuum (≈ 10⁻³ Pa). With no molecules, conduction and convection are eliminated. The thin glass itself conducts very little; the only remaining conduction path is through the thin metal neck/seal.

#### Convection: Eliminated by Vacuum
No fluid → no convection. Forced convection is also eliminated once the stopper is in place.

#### Radiation: Silvered Walls
The glass walls are silvered (ε ≈ 0.02). By Stefan-Boltzmann: P ∝ εT⁴. With ε = 0.02 instead of ε = 1, radiation loss is reduced by 98%. The small ε also means the thermos absorbs less radiation from the surroundings.

#### Quantitative Comparison
At 80 °C in a 20 °C room (ΔT = 60 K): A thermos (A ≈ 0.04 m²) with silvered walls (ε = 0.02): P_rad ≈ 0.02 × 5.67×10⁻⁸ × 0.04 × (353⁴ − 293⁴) ≈ 0.02 × 5.67×10⁻⁸ × 0.04 × 3.38×10⁹ ≈ 0.15 W. A non-silvered version (ε = 0.9) would lose ≈ 6.9 W by radiation alone — 46× more.

#### Review Questions
1. List the three modes of heat transfer and identify which physical change in the thermos eliminates each.
2. Explain why the stopper at the top of a thermos is often the weakest thermal link.
3. Double-pane windows have a gas (argon) filling instead of vacuum. Which modes does this reduce, and which does it not?

---

### Heat Transfer: Mixed Review
**Type:** Mixed/Review
**Slug:** heat-transfer-mixed-review
**Estimated time:** 9 min
**Key concepts:** conduction · convection · radiation · Stefan-Boltzmann Law
**Summary:** Rapid synthesis of all three heat transfer modes with cross-concept problems.

#### Problem Set
1. **Radiation power:** A sphere of radius 0.1 m at 500 K (ε = 0.8) emits: P = 0.8 × 5.67×10⁻⁸ × 4π(0.1)² × 500⁴ = 0.8 × 5.67×10⁻⁸ × 0.1257 × 6.25×10¹⁰ ≈ 35.7 W.
2. **Conduction through composite wall:** Brick (k = 0.7, L = 10 cm) + insulation (k = 0.04, L = 5 cm) in series: R_brick = 0.10/0.7 = 0.143; R_insul = 0.05/0.04 = 1.25. Total R = 1.393. For A = 10 m², ΔT = 30 K: Q/t = 30/(1.393/10) ≈ 215 W.
3. **Mode identification:** A pot of water boiling on a stove involves all three modes: conduction through pot metal, convection within the water, radiation from the red burner coil.

#### Key Comparisons
| Mode | Medium needed? | Equation | Speed |
|---|---|---|---|
| Conduction | Solid or fluid | Q/t = kAΔT/L | Slow |
| Convection | Fluid | Q/t ≈ hAΔT | Medium |
| Radiation | None | P = εσAT⁴ | Speed of light |

#### Review Questions
1. Why does radiation dominate at very high temperatures (e.g., inside a furnace)?
2. A person in a cold room feels warmer near other people even without touching them. Which heat transfer mode explains this?
3. Explain why a concrete floor feels colder to bare feet than a carpet at the same temperature.

---

## Subtopic: Ideal Gases & Kinetic Molecular Theory

### The Ideal Gas Law: PV = nRT
**Type:** Core Understanding
**Slug:** ideal-gas-law-pv-nrt
**Estimated time:** 13 min
**Key concepts:** ideal gas law · PV = nRT · moles · pressure · universal gas constant
**Summary:** The ideal gas law unifies Boyle's, Charles's, and Gay-Lussac's laws into a single equation relating pressure, volume, amount, and temperature of an ideal gas.

#### The Four Gas Variables
- Pressure P (Pa = N/m²; also atm: 1 atm = 101,325 Pa)
- Volume V (m³; note 1 L = 10⁻³ m³)
- Amount n (moles; 1 mol = 6.022 × 10²³ particles)
- Temperature T (must be in Kelvin!)

#### PV = nRT
R = 8.314 J/mol·K (universal gas constant). For an ideal gas: PV = nRT. This assumes point-particle molecules with no intermolecular forces and perfectly elastic collisions — valid for most real gases at moderate conditions. Rearrangements: P = nRT/V (pressure increases with T or n, decreases with V); V = nRT/P.

#### Derived Laws
- Boyle's Law (constant T, n): PV = const → P₁V₁ = P₂V₂
- Charles's Law (constant P, n): V/T = const → V₁/T₁ = V₂/T₂
- Gay-Lussac's Law (constant V, n): P/T = const → P₁/T₁ = P₂/T₂
- Combined: P₁V₁/T₁ = P₂V₂/T₂ (constant n)
- Avogadro's Law (constant T, P): V/n = const → equal volumes of any ideal gas at same T, P contain equal numbers of molecules

#### Standard Molar Volume
At STP (0 °C = 273.15 K, 1 atm), 1 mol of ideal gas occupies 22.4 L. At SATP (25 °C, 1 bar), it occupies 24.8 L.

#### Review Questions
1. A gas at 2 atm and 5 L is heated at constant pressure until its volume is 8 L. What is the final temperature if the initial temperature was 300 K?
2. 0.5 mol of ideal gas occupies 11.2 L at 273 K. What is its pressure? (Verify using PV = nRT)
3. Why must temperature be in Kelvin, not Celsius, in all gas law calculations?

---

### Kinetic Molecular Theory
**Type:** Core Understanding
**Slug:** kinetic-molecular-theory
**Estimated time:** 13 min
**Key concepts:** kinetic molecular theory · root-mean-square speed · average kinetic energy · Maxwell-Boltzmann distribution
**Summary:** Kinetic molecular theory derives macroscopic gas behavior from microscopic particle motion, connecting temperature to molecular kinetic energy.

#### The Five Postulates
1. A gas consists of a large number of molecules separated by distances much larger than their size.
2. Molecules are in constant, random motion.
3. Collisions between molecules and the walls are elastic (kinetic energy conserved).
4. There are no intermolecular forces between molecules except during collisions.
5. The average kinetic energy per molecule is proportional to temperature: KE_avg = (3/2)k_BT, where k_B = 1.38 × 10⁻²³ J/K (Boltzmann's constant).

#### Root-Mean-Square Speed
v_rms = √(3k_BT/m) = √(3RT/M), where m is molecular mass (kg) and M is molar mass (kg/mol). Lighter molecules move faster at the same temperature: hydrogen (M = 0.002 kg/mol) moves much faster than oxygen (M = 0.032 kg/mol) at the same T.

#### Maxwell-Boltzmann Distribution
The distribution of molecular speeds in a gas follows the Maxwell-Boltzmann distribution — a skewed curve with v_mp < v_avg < v_rms. At higher temperatures, the peak shifts right and the distribution broadens. This explains evaporative cooling: the fastest molecules escape, lowering the average kinetic energy (and thus temperature) of the remaining liquid.

#### Pressure from Kinetic Theory
From KMT, pressure arises from molecular collisions with walls: P = (1/3)(Nm/V)v_rms², which combined with PV = nRT gives KE_avg = (3/2)k_BT — consistent with both macroscopic and microscopic views.

#### Review Questions
1. What is the rms speed of nitrogen molecules (M = 0.028 kg/mol) at 300 K?
2. If temperature doubles (in Kelvin), by what factor does v_rms change?
3. Why does evaporation cause cooling, and how does KMT explain it?

---

### Gas Laws in Action: Weather Balloons
**Type:** Application
**Slug:** gas-laws-weather-balloons
**Estimated time:** 14 min
**Key concepts:** combined gas law · Boyle's Law · Charles's Law · atmospheric pressure
**Summary:** Weather balloon ascent illustrates how decreasing atmospheric pressure and temperature affect gas volume at high altitude.

#### The System
A weather balloon is filled with 1.5 m³ of helium at ground level (T₁ = 20 °C = 293 K, P₁ = 1.0 atm). It ascends to 30 km altitude where P₂ = 0.01 atm and T₂ = −40 °C = 233 K. Find the new volume.

#### Using the Combined Gas Law
P₁V₁/T₁ = P₂V₂/T₂
V₂ = V₁ × (P₁/P₂) × (T₂/T₁)
V₂ = 1.5 × (1.0/0.01) × (233/293)
V₂ = 1.5 × 100 × 0.795
V₂ ≈ 119 m³

The volume grows ~80-fold. The balloon is intentionally under-filled at launch to leave room for expansion, otherwise it would burst before reaching the target altitude.

#### Burst Altitude
As the balloon expands, its skin stretches until it reaches maximum volume and bursts. The payload (sensors, GPS) then parachutes back to Earth. Engineers calculate burst altitude using gas laws and material tensile strength.

#### Graham's Law Connection
Helium leaks through rubber faster than air (Graham's Law: effusion rate ∝ 1/√M). Helium (M = 4) effuses 2.7× faster than nitrogen (M = 28). This means weather balloons lose helium over time — engineers account for this in flight-time calculations.

#### Review Questions
1. Redo the calculation if the balloon launches with 2.0 m³ instead of 1.5 m³.
2. Why is helium used rather than hydrogen in modern weather balloons?
3. If only Boyle's Law applied (constant T), what would the volume be at 30 km?

---

### Kinetic Theory and Gas Laws: Mixed Review
**Type:** Mixed/Review
**Slug:** kinetic-theory-gas-laws-review
**Estimated time:** 9 min
**Key concepts:** PV = nRT · KMT · rms speed · Maxwell-Boltzmann
**Summary:** Bridges kinetic molecular theory to the ideal gas law through synthesis problems.

#### Connecting Macro to Micro
From PV = nRT and KE_avg = (3/2)k_BT:
- PV = (2/3)N × KE_avg (derived)
- At fixed V, doubling T doubles P because molecules hit walls twice as fast (v_rms ∝ √T) and with more energy.
- At fixed T, doubling n doubles P (twice as many collisions per second).

#### Speed Comparison Problems
At 300 K, compare v_rms of: H₂ (M = 0.002), N₂ (M = 0.028), CO₂ (M = 0.044):
- v_rms = √(3RT/M) → ratios go as 1/√M
- H₂ : N₂ : CO₂ = 1/√0.002 : 1/√0.028 : 1/√0.044 = 22.4 : 5.97 : 4.77

#### Conceptual Traps
- "Higher temperature means all molecules move faster" — false. The distribution broadens; some molecules at high T still move slowly.
- Pressure in the ideal gas law must be in Pa (or consistent units with R).
- "Ideal gas" fails at very high pressure (molecules are close together, forces matter) and very low temperature (condensation occurs).

#### Review Questions
1. Two balloons contain He and Ar at the same T and P. Compare their average kinetic energies and rms speeds.
2. A sealed rigid container of gas is heated from 200 K to 400 K. What happens to P, V, and the rms speed?
3. Which gas effuses faster: CH₄ (M = 16) or SO₂ (M = 64)? By what factor?

---

## Subtopic: Laws of Thermodynamics

### First Law of Thermodynamics: Energy Conservation
**Type:** Core Understanding
**Slug:** first-law-thermodynamics
**Estimated time:** 13 min
**Key concepts:** First Law of Thermodynamics · internal energy · ΔU = Q - W · work done by gas
**Summary:** The First Law states that the change in internal energy of a system equals heat added minus work done by the system, embodying conservation of energy.

#### Statement of the First Law
ΔU = Q − W
- ΔU = change in internal energy (J)
- Q = heat added to the system (positive if absorbed, negative if released)
- W = work done by the system on surroundings (positive if gas expands)

This is simply conservation of energy applied to thermodynamic systems. Energy in (heat) minus energy out (work) equals stored energy (ΔU).

#### Work Done by a Gas
For a gas expanding against constant pressure: W = PΔV. On a PV diagram, work equals the area under the process curve. Positive work: gas expands (volume increases). Negative work: gas is compressed (volume decreases).

#### Thermodynamic Processes
- **Isothermal** (constant T): ΔU = 0 (for ideal gas), so Q = W
- **Adiabatic** (no heat exchange, Q = 0): ΔU = −W
- **Isochoric** (constant volume, W = 0): ΔU = Q
- **Isobaric** (constant pressure): W = PΔV; ΔU = Q − PΔV

#### Sign Convention
"Q > 0" means heat flows into the system. "W > 0" means the system does work on surroundings (gas expands). If a gas is compressed (W < 0), the surroundings do work on the gas, which increases ΔU.

#### Review Questions
1. 500 J of heat is added to a gas that simultaneously expands, doing 200 J of work. Find ΔU.
2. In an adiabatic compression, is the temperature of the gas higher or lower after compression? Explain using the First Law.
3. On a PV diagram, what does a closed loop represent, and what does the area inside the loop equal?

---

### Second Law and Entropy
**Type:** Core Understanding
**Slug:** second-law-entropy
**Estimated time:** 13 min
**Key concepts:** Second Law of Thermodynamics · entropy · irreversibility · Carnot efficiency
**Summary:** The Second Law states that entropy of an isolated system never decreases, setting a direction for natural processes and limiting the efficiency of heat engines.

#### Statement of the Second Law
Several equivalent statements: (1) Heat spontaneously flows from hot to cold, never the reverse. (2) No heat engine can be 100% efficient. (3) The entropy of an isolated system never decreases: ΔS ≥ 0. Entropy S (J/K) measures the disorder or number of microstates: ΔS = Q_rev/T for a reversible process.

#### Why Processes Are Irreversible
Irreversible processes generate entropy. Mixing hot and cold water, free expansion of a gas into vacuum, friction — all increase total entropy of the universe. The reverse processes would violate the Second Law even though they'd conserve energy (and thus be allowed by the First Law). The Second Law gives time a direction — the "arrow of time."

#### Carnot Efficiency
The Carnot engine is the most efficient possible engine operating between reservoirs at T_hot and T_cold: η_Carnot = 1 − T_cold/T_hot (temperatures in Kelvin). No real engine exceeds this. Example: a steam turbine with T_hot = 800 K and T_cold = 300 K has max efficiency = 1 − 300/800 = 62.5%.

#### Refrigerators and Heat Pumps
A refrigerator does work to move heat from cold reservoir to hot — it runs a heat engine in reverse. The coefficient of performance: COP_refrigerator = Q_cold/W = T_cold/(T_hot − T_cold) (Carnot). This is why it costs energy to keep a refrigerator cold, even if you have a perfect machine.

#### Review Questions
1. A Carnot engine operates between 500 K and 300 K. What is its maximum efficiency?
2. Which process increases entropy more: boiling water or freezing it? Explain using molecular disorder.
3. State the Second Law in terms of entropy and explain what it means for the ultimate fate of an isolated system.

---

### Heat Engines and the Carnot Cycle
**Type:** Application
**Slug:** heat-engines-carnot-cycle
**Estimated time:** 14 min
**Key concepts:** Carnot cycle · heat engine efficiency · PV diagram · thermodynamic cycles
**Summary:** The Carnot cycle traces the most efficient possible heat engine on a PV diagram through four reversible steps, setting the ultimate limit on efficiency.

#### The Four Steps of the Carnot Cycle
1. **Isothermal expansion** (A→B): gas absorbs Q_H from hot reservoir at T_H; expands, doing work W₁ = Q_H.
2. **Adiabatic expansion** (B→C): gas expands further with no heat exchange; temperature drops from T_H to T_C.
3. **Isothermal compression** (C→D): gas releases Q_C to cold reservoir at T_C; compressed by surroundings.
4. **Adiabatic compression** (D→A): gas compressed back to original state; temperature rises from T_C to T_H.

#### Efficiency Calculation
Net work: W_net = Q_H − Q_C. Efficiency: η = W_net/Q_H = 1 − Q_C/Q_H = 1 − T_C/T_H (Carnot result).
Example: Q_H = 1000 J, T_H = 600 K, T_C = 300 K → η = 0.50 → W_net = 500 J, Q_C = 500 J.

#### Real Engines vs. Carnot
Real engines (gasoline, diesel, steam) are always less efficient than Carnot because of: friction, incomplete combustion, heat loss to environment, and non-reversible processes. Typical gasoline engine: 25–30% efficient. Power plant turbines: 35–45%.

#### PV Diagram Area
On a PV diagram, the area enclosed by the Carnot cycle (or any thermodynamic cycle) equals the net work done per cycle. For clockwise cycles, the engine does positive net work (heat engine). For counter-clockwise cycles, net work is done on the system (refrigerator or heat pump).

#### Review Questions
1. A Carnot engine absorbs 800 J from a hot reservoir at 400 K and rejects heat to a cold reservoir at 200 K. How much work does it produce?
2. Why can't any real engine achieve Carnot efficiency?
3. On a PV diagram, what distinguishes a heat engine cycle from a refrigerator cycle in terms of direction?

---

### Laws of Thermodynamics: Mixed Review
**Type:** Mixed/Review
**Slug:** laws-thermodynamics-mixed-review
**Estimated time:** 9 min
**Key concepts:** First Law · Second Law · Carnot · entropy · heat engines
**Summary:** Synthesis of all four laws of thermodynamics through rapid-fire problems and conceptual checks.

#### The Four Laws at a Glance
- **Zeroth Law:** Thermal equilibrium is transitive → temperature is measurable
- **First Law:** ΔU = Q − W → energy conservation
- **Second Law:** ΔS_universe ≥ 0 → irreversibility and efficiency limits
- **Third Law:** As T → 0 K, S → 0 (for perfect crystals) → absolute zero unattainable

#### Synthesis Problem
An engine absorbs 600 J at T_H = 900 K, produces 200 J of work, and rejects the remainder to T_C = 300 K. (a) What is its actual efficiency? (b) What is the Carnot efficiency? (c) Is this engine physically possible?

Solution: η_actual = 200/600 = 33.3%. η_Carnot = 1 − 300/900 = 66.7%. Since 33.3% < 66.7%, the engine is possible (doesn't violate Second Law).

#### Second Law Traps
- "Maxwell's demon" — a thought experiment where a tiny demon sorts molecules to decrease entropy. It fails because the demon's information-erasure increases entropy elsewhere (Landauer's principle).
- A refrigerator decreases local entropy (inside) but increases total entropy (surroundings gain more heat than fridge loses).

#### Review Questions
1. Which of these violates the Second Law? (a) Heat flows from cold to hot with work input. (b) Heat flows from hot to cold spontaneously. (c) An engine converts heat entirely to work in a cycle.
2. State the Third Law and explain why absolute zero is unattainable.
3. A gas undergoes a cycle: isothermal expansion, then isochoric cooling, then isobaric compression back to start. Does the cycle do net work? (Hint: calculate area on PV diagram.)

---

### Thermodynamics Bowl Toss-Up Patterns
**Type:** Competition Extension
**Slug:** thermodynamics-bowl-toss-up-patterns
**Estimated time:** 7 min
**Key concepts:** bowl stems · Carnot efficiency · First Law · entropy · thermodynamic laws
**Summary:** The highest-frequency thermodynamics toss-up patterns in Science Bowl, with stem clues and answer recognition strategies.

#### Top Toss-Up Stems
- "For 10 points, name the law of thermodynamics that is equivalent to conservation of energy." → **First Law**
- "What quantity, measured in joules per kelvin, measures the disorder of a thermodynamic system?" → **entropy**
- "Name the most efficient possible heat engine operating between two temperature reservoirs." → **Carnot engine**
- "State the law that says heat never spontaneously flows from a cold object to a hot object." → **Second Law of Thermodynamics**
- "What is the efficiency of a Carnot engine operating between 500 K and 250 K?" → **50%** (η = 1 − 250/500)

#### Calculation Shortcuts
- Carnot efficiency: η = 1 − T_C/T_H → always use Kelvin
- If η_Carnot = 1 (100%), then T_C = 0 K — impossible
- Net work = Q_H − Q_C = η × Q_H

#### Trap: "Third Law"
Third Law states entropy approaches zero as T → 0 K (for pure crystals). It does NOT say entropy of the universe decreases — that would violate the Second Law. Bowl questions sometimes confuse Third Law with Second Law.

#### Review Questions
1. For 10 points — what process involves no heat exchange between system and surroundings?
2. For 10 points — what is the maximum efficiency of a heat engine operating between 800 K and 400 K?
3. Name three equivalent statements of the Second Law of Thermodynamics.
