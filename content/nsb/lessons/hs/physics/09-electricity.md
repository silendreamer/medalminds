# HS Physics — Electricity
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Electric Charge & Coulomb's Law

### Electric Charge: Fundamentals
**Type:** Core Understanding
**Slug:** electric-charge-fundamentals
**Estimated time:** 12 min
**Key concepts:** electric charge · proton · electron · conservation of charge · quantization
**Summary:** Electric charge is a fundamental property of matter, existing in discrete quanta, conserved in all interactions, and responsible for electromagnetic forces.

#### The Nature of Electric Charge
Electric charge comes in two types: positive (protons, q = +1.602 × 10⁻¹⁹ C) and negative (electrons, q = −1.602 × 10⁻¹⁹ C). The elementary charge e = 1.602 × 10⁻¹⁹ C is the smallest free charge. Like charges repel; opposite charges attract. Neutrons are electrically neutral. Charge is a Lorentz-invariant scalar — all observers agree on an object's charge.

#### Conservation of Charge
In any isolated system, the total electric charge is conserved. Charges can transfer between objects (charging by conduction), be redistributed within an object, or be created in particle-antiparticle pairs (but a particle and its antiparticle have equal and opposite charges, so net charge remains zero). No experiment has ever observed a violation of charge conservation.

#### Quantization of Charge
All observable charges are integer multiples of e: Q = ne, n = 0, ±1, ±2, … Quarks carry fractional charges (±e/3, ±2e/3) but are never observed in isolation (confinement). For all practical purposes in Science Bowl and AP Physics, charge is quantized in units of e.

#### Conductors, Insulators, and Semiconductors
- **Conductors** (metals): free electrons move easily → charge distributes rapidly on surface
- **Insulators** (rubber, glass): electrons bound to atoms → charge stays where placed
- **Semiconductors** (silicon, germanium): intermediate; conductivity adjustable by doping

#### Review Questions
1. A glass rod rubbed with silk becomes positively charged. What happened at the microscopic level?
2. An object has a charge of −3.2 × 10⁻¹⁸ C. How many excess electrons does it have?
3. Why does charge reside on the surface of a conductor in electrostatic equilibrium?

---

### Coulomb's Law: The Electric Force
**Type:** Core Understanding
**Slug:** coulombs-law-electric-force
**Estimated time:** 13 min
**Key concepts:** Coulomb's Law · electric force · Coulomb's constant · inverse-square law · superposition
**Summary:** Coulomb's Law quantifies the force between two point charges, following an inverse-square relationship analogous to Newton's Law of Gravitation.

#### Coulomb's Law
F = kq₁q₂/r², where k = 8.99 × 10⁹ N·m²/C² (Coulomb's constant) = 1/(4πε₀), ε₀ = 8.85 × 10⁻¹² C²/N·m² (permittivity of free space). F is in newtons; q in coulombs; r in meters. The force is along the line connecting the charges: repulsive if same sign, attractive if opposite sign.

#### Comparison to Gravity
Both follow inverse-square laws. Key differences: (1) Gravity is always attractive; electric force can repel. (2) Electric force is ~10³⁶ times stronger than gravity for an electron-proton pair. (3) Gravity depends on mass; electric force on charge.

#### Superposition Principle
The net electric force on a charge is the vector sum of individual forces from all other charges. Forces add as vectors — direction matters. On a line, same-sign forces point away; opposite-sign forces point toward. In 2D, resolve into components and add.

#### Worked Example
Two charges: q₁ = +3 μC at origin; q₂ = −5 μC at x = 0.3 m. Force on q₂ from q₁: F = (8.99×10⁹)(3×10⁻⁶)(5×10⁻⁶)/(0.3)² = 8.99×10⁹ × 1.5×10⁻¹¹/0.09 = 1.50 N. Direction: attractive (toward q₁, i.e., in the −x direction).

#### Review Questions
1. Two identical charges separated by 0.5 m experience a repulsive force of 9 N. What is the magnitude of each charge?
2. If the separation between two charges is tripled, by what factor does the force change?
3. Three charges are collinear: +2 μC at x = 0, −3 μC at x = 1 m, +1 μC at x = 2 m. Find the direction of the net force on the middle charge.

---

### Coulomb's Law Problem: Three Charges
**Type:** Application
**Slug:** coulombs-law-three-charges
**Estimated time:** 14 min
**Key concepts:** Coulomb's Law · vector superposition · net force · geometry
**Summary:** A step-by-step application of Coulomb's Law to three charges arranged in a triangle, requiring vector decomposition.

#### Setup
Three point charges are at the vertices of a right triangle: q₁ = +4 μC at (0, 0); q₂ = −2 μC at (0.3 m, 0); q₃ = +3 μC at (0, 0.4 m). Find the net force on q₂.

#### Force from q₁ on q₂
r₁₂ = 0.3 m. F₁₂ = (8.99×10⁹)(4×10⁻⁶)(2×10⁻⁶)/(0.3)² = 8.99×10⁹ × 8×10⁻¹² / 0.09 = 0.799 N. Direction: q₁ is positive, q₂ is negative → attractive → F₁₂ points in −x direction (toward q₁).

#### Force from q₃ on q₂
r₂₃ = √(0.3² + 0.4²) = 0.5 m. F₂₃ = (8.99×10⁹)(3×10⁻⁶)(2×10⁻⁶)/(0.5)² = 8.99×10⁹ × 6×10⁻¹² / 0.25 = 0.216 N. Direction: q₃ is positive, q₂ is negative → attractive. The vector from q₂ to q₃ points from (0.3, 0) to (0, 0.4): Δx = −0.3, Δy = +0.4. Unit vector: (−0.6, +0.8). Force components: F₂₃ₓ = 0.216(−0.6) = −0.130 N; F₂₃ᵧ = 0.216(+0.8) = +0.173 N.

#### Net Force on q₂
Fₓ = −0.799 + (−0.130) = −0.929 N; Fᵧ = 0 + 0.173 = +0.173 N.
|F_net| = √(0.929² + 0.173²) = √(0.863 + 0.030) = 0.945 N.
Direction: arctan(0.173/0.929) ≈ 10.6° above the −x axis.

#### Review Questions
1. Redo the problem with q₂ changed to +2 μC. How do the force directions change?
2. If all three charges are positive, which charge experiences the largest net force? (Justify qualitatively.)
3. Write the x- and y-components of force on q₁ due to both q₂ and q₃.

---

### Charge and Coulomb's Law: Mixed Review
**Type:** Mixed/Review
**Slug:** charge-coulombs-law-review
**Estimated time:** 9 min
**Key concepts:** Coulomb's Law · superposition · charge conservation · conductors
**Summary:** Integrates charge concepts, Coulomb's Law, and superposition through multi-step synthesis problems.

#### Rapid-Fire Concepts
1. The elementary charge is 1.602 × 10⁻¹⁹ C → number of electrons in 1 C: n = 1/(1.602×10⁻¹⁹) ≈ 6.24 × 10¹⁸ electrons
2. Coulomb's Law and Newton's gravity both follow inverse-square law — but gravity is ~10³⁶× weaker for fundamental particles
3. In a conductor: E_inside = 0 at equilibrium; all charge on surface; charges free to move

#### Inverse-Square Traps
"Doubling the charge on one object doubles the force" — TRUE.
"Doubling the distance halves the force" — FALSE. Doubling r reduces F by factor of 4 (F ∝ 1/r²).

#### Mixed Problem
Two charges q₁ = +6 μC and q₂ = +6 μC are 0.2 m apart. (a) Find the force. (b) A third charge q₃ = −6 μC is placed midway. Find the force on q₃.

Solution (a): F = (8.99×10⁹)(6×10⁻⁶)²/(0.2)² = 8.99×10⁹ × 3.6×10⁻¹¹/0.04 = 8.1 N (repulsive).
Solution (b): q₃ at center (0.1 m from each). F from q₁ on q₃: attractive, toward q₁ (−x direction), magnitude = (8.99×10⁹)(6×10⁻⁶)²/(0.1)² = 32.4 N. F from q₂ on q₃: attractive, toward q₂ (+x direction), same magnitude. Net force = 0 (by symmetry). But this equilibrium is unstable — a small displacement in x creates a net restoring force.

#### Review Questions
1. Two protons are 10⁻¹⁵ m apart (nuclear scale). Find the Coulomb force between them.
2. Why doesn't charge accumulate in the interior of a conductor in electrostatic equilibrium? Use Gauss's Law (qualitative).
3. Distinguish charging by conduction from charging by induction.

---

## Subtopic: Electric Fields & Electric Potential

### Electric Fields
**Type:** Core Understanding
**Slug:** electric-fields
**Estimated time:** 13 min
**Key concepts:** electric field · field lines · E = F/q · E = kq/r² · superposition
**Summary:** The electric field is a vector field that represents the force per unit positive test charge at each point in space, visualized through field lines.

#### Defining the Electric Field
E = F/q₀, where F is the force on a positive test charge q₀. Units: N/C = V/m. The field exists in space regardless of whether a test charge is present — it is a property of the source charges. Convention: field lines point away from positive charges, toward negative charges.

#### Point Charge Field
For a point charge Q: E = kQ/r² (magnitude), directed radially outward (Q > 0) or inward (Q < 0). The field decreases as 1/r² — an inverse-square field, just like gravitational field g = GM/r².

#### Superposition
The net electric field at a point is the vector sum of all individual fields. For multiple point charges, calculate E from each source and add vectors. This is the principle behind electric dipoles: two equal and opposite charges separated by distance d; the field along the dipole axis decays as 1/r³ at large distances.

#### Uniform Fields
Between parallel conducting plates (separation d, potential difference V): E = V/d, uniform and perpendicular to plates. This is the geometry of capacitors. A charge in a uniform field experiences constant force F = qE, analogous to a mass in a uniform gravitational field.

#### Review Questions
1. A charge of +2 μC experiences a force of 0.04 N at a point. What is the electric field magnitude there?
2. Sketch the electric field lines for two equal positive charges side by side.
3. What is the electric field 0.3 m from a +5 μC point charge?

---

### Electric Potential and Potential Energy
**Type:** Core Understanding
**Slug:** electric-potential-energy
**Estimated time:** 13 min
**Key concepts:** electric potential · V = kq/r · potential energy · work-energy theorem · equipotential surfaces
**Summary:** Electric potential is potential energy per unit charge, a scalar quantity that simplifies energy calculations in electric fields.

#### Electric Potential V
V = U/q₀ = kQ/r for a point charge Q. Units: volts (V = J/C). Potential is a scalar — no direction. The potential at a point due to multiple charges is the algebraic (not vector) sum of individual potentials.

#### Potential Energy of a System
U = qV = kq₁q₂/r for two point charges. If both positive, U > 0 (repulsive, potential energy stored). If opposite signs, U < 0 (attractive, bound system). Work done moving charge q through potential difference ΔV: W = qΔV. If W > 0, electric field does positive work on charge.

#### Equipotential Surfaces
Equipotential surfaces connect all points at the same potential. They are always perpendicular to field lines. Moving a charge along an equipotential requires zero work (ΔV = 0 → W = qΔV = 0). Around a point charge, equipotentials are concentric spheres.

#### Potential Difference (Voltage)
ΔV = V_B − V_A = −∫E·dr. In a uniform field: ΔV = −Ed (taking displacement in the field direction). An electron accelerated through 100 V gains kinetic energy: ΔKE = eΔV = (1.602×10⁻¹⁹)(100) = 1.602×10⁻¹⁷ J = 100 eV (electron-volts). The eV is a convenient unit: 1 eV = 1.602×10⁻¹⁹ J.

#### Review Questions
1. Find the electric potential 0.2 m from a +4 μC charge.
2. How much work is done moving a +2 μC charge from V = 100 V to V = 400 V?
3. Why is electric potential a scalar while electric field is a vector?

---

### Particle Accelerator: Potential and Energy
**Type:** Application
**Slug:** particle-accelerator-potential-energy
**Estimated time:** 14 min
**Key concepts:** potential difference · work-energy theorem · kinetic energy · electron-volt
**Summary:** A linear accelerator uses potential differences to accelerate charged particles; energy calculations use ΔKE = qΔV.

#### The Linear Accelerator
A proton (q = 1.602×10⁻¹⁹ C, m = 1.673×10⁻²⁷ kg) starts from rest and is accelerated through a potential difference of 5.0 MV (5 × 10⁶ V). Find: (a) the energy gained; (b) the final speed.

#### Energy Calculation
ΔKE = qΔV = (1.602×10⁻¹⁹)(5×10⁶) = 8.01×10⁻¹³ J = 5.0 MeV.
In MeV directly: proton charge = 1e, so ΔKE = 1 × 5 MV = 5 MeV.

#### Speed Calculation (Non-relativistic check)
½mv² = 8.01×10⁻¹³ J → v² = 2 × 8.01×10⁻¹³ / 1.673×10⁻²⁷ = 9.58×10¹⁴ → v = 3.09×10⁷ m/s ≈ 0.103c. At ~10% the speed of light, relativistic corrections are small but not negligible. A full relativistic treatment uses: KE = (γ−1)mc².

#### Cyclotron Connection
In a cyclotron, particles are accelerated repeatedly through potential differences in a spiral path. Each crossing of the "dee" gap adds ΔKE = qΔV. After N crossings: total KE = NqΔV. The radius of circular motion in the magnetic field grows with speed: r = mv/(qB), so the spiral grows outward.

#### Review Questions
1. An electron (m = 9.11×10⁻³¹ kg) is accelerated from rest through 10,000 V. Find its final speed. Is a relativistic correction needed?
2. A proton is accelerated through the same 5 MV as above. Compare its final speed to the result above using the ratio of masses.
3. Why is the electron-volt a convenient unit for particle physics?

---

### Electric Field and Potential: Mixed Review
**Type:** Mixed/Review
**Slug:** electric-field-potential-review
**Estimated time:** 9 min
**Key concepts:** E-field · potential · equipotentials · work · field lines
**Summary:** Connects electric field, potential, energy, and field lines through synthesis problems.

#### Key Relationships
- E = −dV/dr (field is negative gradient of potential)
- V = kq/r; E = kq/r² → E = V/r only for point charge at distance r
- Between parallel plates: E = V/d (uniform)
- Work: W = qΔV; units check: (C)(J/C) = J ✓

#### Cross-Concept Problem
A +3 μC charge is at the origin. (a) Find V and E at r = 0.5 m. (b) How much work moves a −1 μC charge from r = 0.5 m to r = 0.1 m?

(a) V = kq/r = (8.99×10⁹)(3×10⁻⁶)/0.5 = 53,940 V ≈ 54.0 kV. E = kq/r² = 53,940/0.5 = 107,880 N/C ≈ 108 kN/C.
(b) V₁ = 54.0 kV; V₂ = kq/0.1 = 269.7 kV. W = qΔV = (−1×10⁻⁶)(269,700−53,940) = −0.216 J. The electric field does negative work moving a negative charge toward a positive source (the charge moves "against" the field, gaining potential energy).

#### Conceptual Checks
- "E = 0 means V = 0" — FALSE. E = 0 at midpoint between equal charges; V ≠ 0 there.
- "V = 0 means E = 0" — FALSE. At center of electric dipole, V = 0 but E ≠ 0.
- Field lines can never cross (that would mean two different E directions at one point).

#### Review Questions
1. The potential along the x-axis is V(x) = 200 − 50x (V, x in meters). What is the electric field in the x-direction?
2. Two equal positive charges are at (±d, 0). Where is V = 0? Where is E = 0?
3. An equipotential surface near a charged sphere is spherical. What does this imply about the field?

---

## Subtopic: Capacitance

### Capacitors and Capacitance
**Type:** Core Understanding
**Slug:** capacitors-capacitance
**Estimated time:** 12 min
**Key concepts:** capacitance · C = Q/V · parallel plate capacitor · dielectric · energy stored
**Summary:** A capacitor stores electric charge and energy; its capacitance depends on geometry and the material between its plates.

#### Definition of Capacitance
C = Q/V, where Q is the charge on one plate (C) and V is the potential difference between plates (V). Unit: farad (F = C/V). Capacitance depends only on geometry and material — not on charge or voltage. Typical values: pF (10⁻¹²) to μF (10⁻⁶) for practical capacitors; F for supercapacitors.

#### Parallel Plate Capacitor
C = ε₀A/d (no dielectric), where A is plate area (m²) and d is separation (m). With a dielectric: C = κε₀A/d, where κ is the dielectric constant (κ ≥ 1). Inserting a dielectric increases C by factor κ because the dielectric reduces the electric field (and hence voltage) for the same stored charge.

#### Energy Stored in a Capacitor
U = ½QV = ½CV² = Q²/(2C). This energy is stored in the electric field between the plates. Energy density of the field: u = ½ε₀E² (J/m³).

#### Dielectrics and Breakdown
Dielectrics (insulators) increase C and resist breakdown. Dielectric strength (V/m) is the maximum field before the insulator conducts. Air breaks down at ~3×10⁶ V/m. Higher dielectric strength → capacitor can store more energy. Common dielectrics: paper (κ ≈ 3.5), Teflon (κ ≈ 2.1), water (κ ≈ 80).

#### Review Questions
1. A parallel plate capacitor has A = 0.01 m², d = 0.001 m. Find C (ε₀ = 8.85×10⁻¹² F/m).
2. A 50 μF capacitor is charged to 12 V. How much energy is stored?
3. A dielectric with κ = 4 is inserted between the plates of a 10 nF capacitor. What is the new capacitance?

---

### Series and Parallel Capacitors
**Type:** Core Understanding
**Slug:** series-parallel-capacitors
**Estimated time:** 13 min
**Key concepts:** series capacitors · parallel capacitors · equivalent capacitance · charge sharing · voltage division
**Summary:** Capacitors in parallel add directly; in series, reciprocals add — opposite to the rules for resistors.

#### Parallel Capacitors
When capacitors share both terminals: V is the same across all. Total charge: Q_total = Q₁ + Q₂ + … = (C₁ + C₂ + …)V. Equivalent capacitance: C_parallel = C₁ + C₂ + C₃ + … Parallel adds capacitance (like adding more plate area).

#### Series Capacitors
Connected end-to-end; same charge Q on each. Voltages add: V_total = V₁ + V₂ = Q/C₁ + Q/C₂. Equivalent: 1/C_series = 1/C₁ + 1/C₂ + … For two capacitors: C_series = C₁C₂/(C₁+C₂). Series reduces effective capacitance (like increasing separation).

#### Memory Aid
Series/Parallel rules for C are opposite to those for R:
- Resistors in series: R_total = R₁ + R₂ (adds)
- Resistors in parallel: 1/R = 1/R₁ + 1/R₂ (reciprocals add)
- Capacitors in parallel: C = C₁ + C₂ (adds) — REVERSED
- Capacitors in series: 1/C = 1/C₁ + 1/C₂ (reciprocals add) — REVERSED

#### Worked Example
Find equivalent capacitance: C₁ = 4 μF and C₂ = 12 μF in series, then that combination in parallel with C₃ = 8 μF.
Step 1: C_series = (4×12)/(4+12) = 48/16 = 3 μF.
Step 2: C_total = 3 + 8 = 11 μF.

#### Review Questions
1. Two capacitors (6 μF and 3 μF) are connected in series across 12 V. Find the charge on each and the voltage across each.
2. Three 6 μF capacitors are connected in parallel. Find the equivalent capacitance and total charge if connected to 9 V.
3. Why does connecting capacitors in series reduce the equivalent capacitance?

---

### Capacitor Energy in a Defibrillator
**Type:** Application
**Slug:** capacitor-defibrillator
**Estimated time:** 13 min
**Key concepts:** capacitor energy · U = ½CV² · charge and discharge · biomedical physics
**Summary:** A cardiac defibrillator uses a capacitor charged to high voltage; energy calculations determine the joules delivered to a patient.

#### The Defibrillator Capacitor
A defibrillator stores energy in a capacitor and delivers it as a brief pulse to restore normal heart rhythm. A typical device: C = 150 μF, charged to V = 2500 V.

#### Energy Stored
U = ½CV² = ½(150×10⁻⁶)(2500)² = ½(150×10⁻⁶)(6.25×10⁶) = 468.75 J ≈ 470 J.

#### Charge Stored
Q = CV = (150×10⁻⁶)(2500) = 0.375 C.

#### Delivery Analysis
The capacitor discharges through the patient (effective resistance R ≈ 50 Ω) over a time τ = RC = (150×10⁻⁶)(50) = 7.5 ms. Most energy is delivered in the first few time constants. The shock stops the chaotic ventricular fibrillation (all cells fire at once), then the heart's natural pacemaker (SA node) re-establishes rhythm.

#### Design Trade-offs
Higher voltage → more energy, but increases risk of tissue damage. Larger C → same energy at lower voltage (safer), but C is heavy and bulky. Modern devices use biphasic waveforms (positive then negative pulse) that work at lower energy (~150–200 J vs. old 360 J monophasic).

#### Review Questions
1. A newer defibrillator uses C = 200 μF and V = 2000 V. Calculate the energy stored and compare to the example above.
2. How does the discharge time constant τ = RC affect how quickly the energy is delivered?
3. Why might a very short discharge (very low R) be more damaging even at the same total energy?

---

### Capacitance: Mixed Review
**Type:** Mixed/Review
**Slug:** capacitance-mixed-review
**Estimated time:** 8 min
**Key concepts:** capacitance · series · parallel · energy · dielectrics
**Summary:** Synthesis of capacitor concepts through network analysis and energy calculations.

#### Synthesis Problem
A circuit has C₁ = 2 μF, C₂ = 3 μF in series, connected in parallel with C₃ = 5 μF. The whole network is connected to 12 V.

1. C_series = (2×3)/(2+3) = 1.2 μF
2. C_total = 1.2 + 5 = 6.2 μF
3. Total charge: Q_total = C_total × V = 6.2×10⁻⁶ × 12 = 74.4 μC
4. Energy: U = ½C_total V² = ½(6.2×10⁻⁶)(144) = 446.4 μJ

#### Dielectric Effect
A parallel plate capacitor (C₀ = 10 nF) is connected to a 6 V battery, then disconnected. A dielectric (κ = 3) is inserted. New C = 30 nF. Charge is unchanged (Q = C₀V = 60 nC, no path to change). New V = Q/C_new = 60 nC/30 nF = 2 V. Energy: U_before = ½C₀V² = 180 nJ; U_after = ½Q²/C_new = ½(60×10⁻⁹)²/(30×10⁻⁹) = 60 nJ. Energy decreased — where did it go? Into polarizing the dielectric molecules.

#### Review Questions
1. Why does the energy decrease when a dielectric is inserted into a disconnected capacitor?
2. If the capacitor in the dielectric problem had remained connected to the battery, would the charge or voltage remain constant? What would happen to energy?
3. Three 12 μF capacitors can be arranged in 4 distinct configurations (all parallel, all series, 2 parallel + 1 series, etc.). Calculate the equivalent C for each.

---

## Subtopic: DC Circuits (Ohm's Law, Kirchhoff's Laws)

### Resistance, Ohm's Law, and Power
**Type:** Core Understanding
**Slug:** resistance-ohms-law-power
**Estimated time:** 13 min
**Key concepts:** Ohm's Law · resistance · V = IR · resistivity · power P = IV
**Summary:** Ohm's Law relates voltage, current, and resistance; resistivity characterizes how materials impede current flow; power formulas describe energy dissipation.

#### Ohm's Law
V = IR, where V is potential difference (V), I is current (A), R is resistance (Ω). Valid for ohmic materials where R is constant. Current I = charge flow per unit time: I = ΔQ/Δt (A = C/s). Conventional current flows from + to − (opposite to electron flow).

#### Resistivity
R = ρL/A, where ρ is resistivity (Ω·m), L is length (m), A is cross-sectional area (m²). Long, thin, resistive wires have high R. Copper: ρ = 1.7×10⁻⁸ Ω·m (excellent conductor). Nichrome: ρ = 1.0×10⁻⁶ Ω·m (heating wire). Silicon: ρ ≈ 640 Ω·m (semiconductor).

#### Power Dissipation
P = IV = I²R = V²/R. Units: watts (W = J/s). A resistor converts electrical energy to heat (Joule heating). The formula P = I²R shows that high current in a resistance dissipates enormous power — the basis of electrical fuses and circuit breakers.

#### Energy in Circuits
E = Pt = IVt = I²Rt. Utility bills measure energy in kilowatt-hours: 1 kWh = 3.6×10⁶ J. A 100 W lightbulb on for 10 hours uses 1 kWh.

#### Review Questions
1. A 12 V battery drives 3 A through a resistor. Find the resistance and power dissipated.
2. A copper wire (ρ = 1.7×10⁻⁸ Ω·m) is 100 m long and 1 mm in diameter. Find its resistance.
3. Why does a fuse blow when current exceeds its rating?

---

### Kirchhoff's Laws and Circuit Analysis
**Type:** Core Understanding
**Slug:** kirchhoffs-laws-circuit-analysis
**Estimated time:** 14 min
**Key concepts:** Kirchhoff's current law · Kirchhoff's voltage law · loop rule · junction rule · series/parallel resistors
**Summary:** Kirchhoff's two laws — junction rule (charge conservation) and loop rule (energy conservation) — provide a systematic method to solve any DC circuit.

#### Kirchhoff's Current Law (KCL) — Junction Rule
At any junction (node) in a circuit, the sum of currents entering equals the sum leaving: ΣI_in = ΣI_out. This is charge conservation — current cannot accumulate at a node. In series circuits, the same current flows through all elements.

#### Kirchhoff's Voltage Law (KVL) — Loop Rule
Around any closed loop, the sum of all potential differences is zero: ΣΔV = 0. This is energy conservation — a charge returning to its starting point undergoes no net change in potential. Sign convention: rise across battery (from − to +): +ε. Drop across resistor (in current direction): −IR.

#### Series Resistors
R_series = R₁ + R₂ + R₃ + … Voltages add; current is the same. Voltage divider: V_i = V_total × (R_i / R_total).

#### Parallel Resistors
1/R_parallel = 1/R₁ + 1/R₂ + … Currents add; voltage is the same. For two resistors: R = R₁R₂/(R₁+R₂). Current divider: I_i = I_total × (R_total / R_i).

#### Multi-Loop Example
For a circuit with two loops, two batteries, three resistors — set up KCL at one junction and KVL for two loops. Solve the system of equations. Always define current directions before starting; if a result is negative, the current actually flows in the opposite direction.

#### Review Questions
1. State KCL and KVL in words and write the mathematical statement of each.
2. Three resistors (4 Ω, 6 Ω, 12 Ω) are connected in parallel across 12 V. Find the current through each and the total current.
3. Write the KVL equation for a single loop with a 9 V battery, a 3 Ω resistor, and a 6 Ω resistor in series.

---

### Circuit Analysis: Multi-Loop Problem
**Type:** Application
**Slug:** circuit-analysis-multi-loop
**Estimated time:** 15 min
**Key concepts:** KVL · KCL · simultaneous equations · multi-loop circuit · internal resistance
**Summary:** A two-loop circuit requires simultaneous application of KCL and KVL to find all unknown currents.

#### Setup
Two batteries and three resistors: ε₁ = 12 V (internal resistance r₁ = 1 Ω) in the left branch; ε₂ = 6 V (r₂ = 0.5 Ω) in the right branch; R = 10 Ω in the middle branch. Assign currents: I₁ (left branch, downward), I₂ (right branch, downward), I₃ (middle branch).

#### KCL at Top Node
I₁ + I₂ = I₃ (or I₃ flows downward, I₁ and I₂ are the sources)

#### KVL — Left Loop (clockwise)
ε₁ − I₁r₁ − I₃R = 0 → 12 − I₁(1) − 10I₃ = 0

#### KVL — Right Loop (clockwise)
ε₂ − I₂r₂ − I₃R = 0 → 6 − 0.5I₂ − 10I₃ = 0

#### Solving the System
From KCL: I₃ = I₁ + I₂. Substitute into the two KVL equations:
12 = I₁ + 10(I₁+I₂) = 11I₁ + 10I₂ … (1)
6 = 0.5I₂ + 10(I₁+I₂) = 10I₁ + 10.5I₂ … (2)
From (2): I₁ = (6 − 10.5I₂)/10. Substitute into (1): 12 = 11(6−10.5I₂)/10 + 10I₂.
Solving: I₂ ≈ 0.364 A; I₁ ≈ 0.218 A; I₃ ≈ 0.582 A.

#### Review Questions
1. Verify the solution by substituting back into both KVL equations.
2. What terminal voltage does each battery deliver (V_terminal = ε − Ir)?
3. How much power is dissipated in the 10 Ω resistor?

---

### DC Circuits: Mixed Review
**Type:** Mixed/Review
**Slug:** dc-circuits-mixed-review
**Estimated time:** 9 min
**Key concepts:** Ohm's Law · KVL · KCL · series/parallel · power
**Summary:** Mixed synthesis of all DC circuit concepts through rapid-fire problems and conceptual checks.

#### Rapid Calculations
1. A 60 W, 120 V lightbulb: R = V²/P = 14,400/60 = 240 Ω; I = P/V = 0.5 A.
2. Three resistors (2 Ω, 3 Ω, 6 Ω) in parallel: 1/R = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 1 → R = 1 Ω.
3. Voltage divider: 9 V across 3 Ω + 6 Ω in series → V_6Ω = 9 × (6/9) = 6 V.

#### Common Traps
- "Current through a battery is I = ε/R only if internal resistance is negligible."
- "Shorting a battery (R = 0) gives infinite current — limited only by internal resistance."
- "Kirchhoff's laws apply to instantaneous values, not just DC steady state."

#### Conceptual Checks
1. In parallel circuits, adding more resistors lowers total resistance → total current increases.
2. In series circuits, adding more resistors increases total resistance → current decreases.
3. The brightest bulb in series is the one with HIGHEST resistance (P = I²R, same I).
4. The brightest bulb in parallel is the one with LOWEST resistance (P = V²/R, same V).

#### Review Questions
1. A 6 V battery with 2 Ω internal resistance drives a 4 Ω external resistor. Find I, V_terminal, P_resistor, and P_internal.
2. In a series string of Christmas lights, one bulb burns out and the rest go out too. Explain using circuit theory.
3. Rank these four configurations of three 6 Ω resistors by equivalent resistance from lowest to highest: (a) all parallel, (b) all series, (c) one parallel pair + one in series, (d) one series pair + one in parallel.

---

### DC Circuits Bowl Toss-Up Patterns
**Type:** Competition Extension
**Slug:** dc-circuits-bowl-toss-up
**Estimated time:** 7 min
**Key concepts:** Ohm's Law · Kirchhoff · series/parallel · power · capacitors
**Summary:** The highest-frequency electricity toss-up patterns in Science Bowl, covering Ohm's Law, Kirchhoff's Laws, and capacitor rules.

#### Top Toss-Up Stems
- "For 10 points, state the law relating voltage, current, and resistance." → **Ohm's Law (V = IR)**
- "What is the equivalent resistance of three 6 Ω resistors in parallel?" → **2 Ω** (1/R = 1/6+1/6+1/6 = 1/2)
- "Name the circuit rule based on conservation of energy at a loop." → **Kirchhoff's Voltage Law / Loop Rule**
- "What is the power dissipated by a 10 Ω resistor carrying 3 A?" → **90 W** (P = I²R = 9×10 = 90)
- "For capacitors in series, what quantity is the same on each capacitor?" → **charge (Q)**
- "For capacitors in parallel, what quantity is the same?" → **voltage (V)**

#### Calculation Shortcuts
- Parallel resistors: always smaller than the smallest individual R
- Series capacitors: always smaller than the smallest individual C
- Power: P = I²R (use when you know I and R); P = V²/R (when you know V and R)
- R and C series/parallel rules are reversed from each other — this is a common trap

#### Quick Reference
| | Series | Parallel |
|---|---|---|
| Resistors | R = R₁+R₂ | 1/R = 1/R₁+1/R₂ |
| Capacitors | 1/C = 1/C₁+1/C₂ | C = C₁+C₂ |
| Voltage | Divides | Same |
| Current | Same | Divides |

#### Review Questions
1. For 10 points — a circuit has a 12 V battery and two 6 Ω resistors in parallel. What is the total current drawn from the battery?
2. For 10 points — what is the energy stored in a 100 μF capacitor charged to 50 V?
3. State KCL (junction rule) and give the physical principle it is based on.
