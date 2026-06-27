# HS Physics — Magnetism & Electromagnetism
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Magnetic Fields & Magnetic Forces

### Magnetic Fields & the Lorentz Force
**Type:** Core Understanding
**Slug:** magnetic-fields-lorentz-force
**Estimated time:** 12 min
**Key concepts:** magnetic field B · Lorentz force · charge motion · right-hand rule
**Summary:** A magnetic field exerts a force on moving charged particles perpendicular to both the velocity and the field direction.

#### Magnetic Field Definition
A magnetic field B is a vector field that exerts a force on moving charges and magnetic dipoles. The SI unit is the tesla (T), or kg/(A·s²). A moving charge q with velocity v in a magnetic field B experiences a Lorentz force: F = q(v × B). The force is perpendicular to both v and B (given by the cross product). The magnitude is F = qvB sin(θ), where θ is the angle between v and B. When v is parallel to B (θ = 0°), the force is zero. When perpendicular (θ = 90°), the force is maximum: F = qvB.

#### Right-Hand Rule for Force
To find the direction of the Lorentz force on a positive charge: point your fingers in the direction of v, curl them toward B, and your thumb points in the direction of F. For negative charges, reverse the direction. This rule applies to the cross product v × B. Magnetic forces do no work (F ⊥ v), so they do not change the speed of a particle, only its direction.

#### Circular Motion in a Magnetic Field
A charged particle moving perpendicular to a uniform magnetic field experiences a constant perpendicular force, causing circular motion. The magnetic force provides centripetal acceleration: qvB = mv²/r. Solving for r: r = mv/(qB). The radius increases with momentum and decreases with charge and field strength. The period of revolution is T = 2πm/(qB), independent of velocity—this property is used in cyclotrons.

#### Cyclotron & Mass Spectrometer
A cyclotron accelerates charged particles using a rotating magnetic field. Particles spiral outward, gaining energy each time they cross an accelerating gap. A mass spectrometer uses magnetic fields to separate isotopes by their mass-to-charge ratio (m/q): ions with different m/q follow different circular paths and can be detected separately.

#### Review Questions
1. A proton moves at 10⁷ m/s perpendicular to a 0.5 T magnetic field. What is the radius of its circular path?
2. Explain why a magnetic force does no work on a charged particle.
3. What is the period of a proton orbiting in a 1 T magnetic field?

---

### Current-Carrying Conductors in Magnetic Fields
**Type:** Core Understanding
**Slug:** current-carrying-conductors
**Estimated time:** 13 min
**Key concepts:** force on current · magnetic field from current · Ampere's force law · motor effect
**Summary:** Current-carrying wires in magnetic fields experience a force; conversely, currents produce magnetic fields.

#### Force on a Current-Carrying Wire
A straight wire of length L carrying current I in a magnetic field B experiences a force F = IL × B. The magnitude is F = ILB sin(θ). The direction is given by the right-hand rule: point fingers along the current direction, curl toward B, and the thumb points in the direction of force. This is the motor effect—the basis for electric motors. The force is maximum when current is perpendicular to the field (θ = 90°).

#### Magnetic Field from a Straight Wire
A long straight wire carrying current I produces a magnetic field at distance r: B = μ₀I/(2πr), where μ₀ = 4π × 10⁻⁷ T·m/A is the permeability of free space. The field circles the wire according to the right-hand rule: thumb along current, fingers curl in the direction of B. The field strength decreases inversely with distance.

#### Magnetic Field from a Loop
A circular loop of radius R carrying current I produces a magnetic field at the center: B_center = μ₀I/(2R). At the center of a solenoid (a tightly wound coil) with n turns per unit length, B = μ₀nI. The field is uniform inside and approximately zero outside (for an ideal infinite solenoid).

#### Ampere's Law
Ampere's law relates the circulation of the magnetic field around a closed loop to the current enclosed: ∮ B · dl = μ₀I_enclosed. For a long straight wire, integrating around a circle of radius r centered on the wire gives B(2πr) = μ₀I, recovering B = μ₀I/(2πr). Ampere's law is analogous to Gauss's law for electric fields.

#### Review Questions
1. A 50 cm wire carrying 2 A is perpendicular to a 0.3 T field. What force does it experience?
2. What is the magnetic field at the center of a circular loop of radius 0.1 m carrying 5 A?
3. What does Ampere's law relate to each other?

---

### Magnetic Properties of Matter
**Type:** Application
**Slug:** magnetic-properties-matter
**Estimated time:** 12 min
**Key concepts:** ferromagnetism · paramagnetism · diamagnetism · magnetic moment · hysteresis
**Summary:** Materials respond to magnetic fields in different ways depending on their atomic and magnetic properties.

#### Magnetic Moment
An atom or molecule has a magnetic moment μ associated with orbital and spin angular momentum of its electrons. In an external field, the magnetic moment experiences a torque τ = μ × B, tending to align with the field. The interaction energy is U = −μ · B. Aligned moments have lower energy; anti-aligned have higher energy.

#### Diamagnetism, Paramagnetism, Ferromagnetism
- Diamagnetic materials (no unpaired electrons) are weakly repelled by magnetic fields. Examples: bismuth, copper, water. χ < 0 (negative susceptibility).
- Paramagnetic materials (unpaired electrons) are weakly attracted to magnetic fields. Alignment increases energy, so thermal motion keeps them disordered. Examples: aluminum, chromium, oxygen. χ > 0 (positive).
- Ferromagnetic materials (iron, cobalt, nickel, alloys) have strong permanent magnetism due to parallel alignment of atomic magnetic moments. χ >> 1 (very large). They retain magnetization after the external field is removed.

#### Hysteresis in Ferromagnets
When a ferromagnetic material is subjected to a varying magnetic field, its magnetization lags behind the field (hysteresis). The B-H curve shows that magnetization increases nonlinearly with applied field, reaches saturation, and does not return to zero when the field is removed. The area of the hysteresis loop represents energy lost per cycle, converted to heat. Hard ferromagnets (high remanence) are used for permanent magnets; soft ferromagnets (low remanence) are used for electromagnets.

#### Curie Temperature
Above the Curie temperature T_c, thermal motion overcomes magnetic ordering, and a ferromagnet becomes paramagnetic. For iron, T_c ≈ 770 K. This explains why heating can destroy permanent magnetism. Rare-earth magnets (with higher Curie temperatures) retain magnetism at higher temperatures.

#### Review Questions
1. Distinguish diamagnetic, paramagnetic, and ferromagnetic materials.
2. What is the Curie temperature, and why is it significant?
3. Why does heating a permanent magnet weaken its magnetism?

---

### Magnetic Forces Between Currents
**Type:** Mixed/Review
**Slug:** magnetic-forces-between-currents
**Estimated time:** 11 min
**Key concepts:** force between parallel wires · motor effect · Ampere force · torque on loops
**Summary:** Parallel current-carrying wires attract or repel depending on current directions; loops in fields experience torque.

#### Force Between Parallel Wires
Two long parallel wires carrying currents I₁ and I₂ separated by distance r exert forces on each other. Wire 1 creates a field at wire 2's location: B₁ = μ₀I₁/(2πr). The force on wire 2 (length L) is F = I₂LB₁ = μ₀I₁I₂L/(2πr). If currents are in the same direction, the forces are attractive; if opposite, repulsive. This principle is used to define the ampere: 1 A is defined such that two wires 1 m apart carrying 1 A each experience a force of 2 × 10⁻⁷ N per meter.

#### Torque on a Current Loop
A rectangular loop of area A carrying current I in a uniform magnetic field B experiences a torque τ = IAB sin(θ), where θ is the angle between the normal to the loop (right-hand rule with fingers along current) and B. The torque is maximum (τ = IAB) when the plane of the loop is parallel to B (θ = 90°). This torque on a loop is the principle behind electric motors and galvanometers.

#### Electric Motors
An electric motor consists of a coil (loop) rotating in a magnetic field. As the coil rotates, the torque τ = IAB sin(θ) varies. A commutator (split ring) reverses current direction each half-turn, so the torque always pushes the coil in the same rotational direction. The motor effect converts electrical energy to mechanical energy.

#### Magnetic Dipole Moment
The magnetic dipole moment of a current loop is m = IA (current times area). A magnetic dipole in a non-uniform field experiences a force F ∝ ∇(m · B). Dipoles are attracted to regions of stronger field. This is used to demonstrate paramagnetism (paramagnetic materials move toward stronger field regions in a non-uniform field).

#### Review Questions
1. Two parallel wires 0.1 m apart carry 10 A each in the same direction. What is the force per unit length between them?
2. A rectangular loop (area 0.02 m²) carries 5 A and is placed in a 0.4 T field. What is the maximum torque?
3. Explain how a commutator allows continuous rotation in an electric motor.

---

## Subtopic: Electromagnetic Induction

### Faraday's Law & Induced EMF
**Type:** Core Understanding
**Slug:** faraday-law-induced-emf
**Estimated time:** 13 min
**Key concepts:** magnetic flux · Faraday's law · induced EMF · Lenz's law · rate of change
**Summary:** A changing magnetic flux through a loop induces an electromotive force (EMF); the induced EMF opposes the change in flux.

#### Magnetic Flux
Magnetic flux (Φ) through a surface is Φ = B · A = BA cos(θ), where B is the magnetic field, A is the area, and θ is the angle between B and the normal to the surface. The SI unit is the weber (Wb), equal to T·m². Flux measures the total magnetic field passing through a surface. When flux through a loop changes, an EMF is induced.

#### Faraday's Law
Faraday's law of induction states that the magnitude of the induced EMF is equal to the rate of change of magnetic flux: ε = −dΦ/dt. The negative sign is Lenz's law (see below). The induced EMF drives current through the loop if it's a closed conductor. The SI unit for EMF is the volt (V). An EMF can be induced by: (1) changing the magnetic field strength, (2) changing the area of the loop, (3) changing the angle between B and the normal to the loop, or (4) moving the loop into/out of the field.

#### Lenz's Law
Lenz's law states that the induced EMF (and induced current) opposes the change that caused it. If flux through a loop increases, the induced current creates a magnetic field opposing the increase. If flux decreases, the induced current creates a field reinforcing it. Mathematically, the negative sign in ε = −dΦ/dt embodies Lenz's law. Lenz's law is consistent with energy conservation: the induced current opposes the change, so work must be done to change the flux.

#### Motional EMF
When a conductor moves through a magnetic field, charges within it experience a Lorentz force, creating a separation of charge and an EMF. For a straight conductor of length L moving perpendicular to a field B with velocity v: ε = BLv. This motional EMF is the basis for electromagnetic generators.

#### Review Questions
1. A magnetic flux through a loop is 0.5 Wb and decreases to 0.1 Wb in 0.1 s. What is the induced EMF?
2. State Lenz's law and explain why it is consistent with energy conservation.
3. What motional EMF is induced in a 0.5 m conductor moving at 10 m/s perpendicular to a 0.3 T field?

---

### Applications of Electromagnetic Induction
**Type:** Application
**Slug:** applications-induction
**Estimated time:** 14 min
**Key concepts:** transformers · generators · eddy currents · magnetic damping · practical induction
**Summary:** Electromagnetic induction is the basis for transformers, generators, and many practical devices that convert between electrical and mechanical energy.

#### AC Generators
An AC generator consists of a coil rotating in a magnetic field. As the coil rotates, the flux through it varies as Φ(t) = BA cos(ωt). The induced EMF is ε = −dΦ/dt = BAω sin(ωt) = ε₀ sin(ωt), where ε₀ = BAω is the peak EMF. The output is sinusoidal AC voltage. The frequency of the AC is f = ω/(2π), and the RMS voltage is ε_rms = ε₀/√2.

#### Transformers
A transformer consists of two coils (primary and secondary) wound around an iron core. An AC current in the primary coil creates a changing magnetic field in the core, inducing an EMF in the secondary. The voltage ratio is V_s/V_p = N_s/N_p (number of turns ratio). A step-up transformer (N_s > N_p) increases voltage. A step-down transformer decreases voltage. Power is conserved: V_p I_p ≈ V_s I_s (in an ideal transformer, ignoring losses).

#### Eddy Currents
When a conductor moves through a non-uniform magnetic field, induced currents (eddy currents) flow within the conductor. These currents dissipate energy as heat and create forces opposing the motion. Eddy current braking is used in some transportation systems. Eddy currents are minimized in transformer cores using laminated (layered) iron cores, which interrupt the current paths.

#### Magnetic Damping
A conductor moving through a magnetic field experiences a retarding force due to induced currents (Lenz's law). This magnetic damping is used in some instruments for smooth, controlled motion. Swinging a magnet near a metal plate experiences damping as eddy currents in the plate create an opposing force.

#### Worked Example: Transformer
A step-down transformer has N_p = 5000 turns and N_s = 250 turns. The primary voltage is 2000 V. What is the secondary voltage? Using V_s/V_p = N_s/N_p: V_s = (250/5000) × 2000 = 100 V. If the secondary current is 20 A, the primary current is I_p = (N_s/N_p) × I_s = (250/5000) × 20 = 1 A. Power is conserved: V_p I_p = 2000 × 1 = 2000 W; V_s I_s = 100 × 20 = 2000 W.

#### Review Questions
1. An AC generator rotates at 60 Hz in a 0.5 T field with a coil area of 0.1 m² and 100 turns. What is the peak EMF?
2. A transformer has 1000 turns in the primary and 100 in the secondary. Input voltage is 120 V. Output voltage?
3. Explain how eddy currents cause magnetic damping.

---

### Electromagnetic Induction Competition Problems
**Type:** Competition Extension
**Slug:** induction-competition-problems
**Estimated time:** 10 min
**Key concepts:** complex scenarios · energy methods · Lenz's law applications · unusual geometry
**Summary:** Competition problems combine Faraday's law, Lenz's law, and circuit analysis in non-obvious ways.

#### Moving Loop in a Magnetic Field
"A rectangular loop of area A and resistance R is pulled from a region of uniform magnetic field B (pointing out of the page). If the leading edge is pulled at constant velocity v, what is the induced current?" Solution: As the loop exits, flux decreases: Φ = B × (area still in field). The rate of change depends on the velocity: the EMF is ε = Blv (where l is the length of the edge in the field). Current I = ε/R = Blv/R. By Lenz's law, this current creates a field reinforcing the departing field (opposing the decrease).

#### Nested Coils
"Two coils are coaxial. The primary carries an AC current I(t) = I₀ sin(ωt), and the secondary is open-circuited. What is the induced EMF in the secondary?" Solution: The primary creates a flux through the secondary Φ = M·I(t), where M is the mutual inductance. The induced EMF is ε = −dΦ/dt = −M·dI/dt = −M·I₀ω cos(ωt). The amplitude of the secondary EMF depends on the mutual inductance, frequency, and primary current amplitude.

#### Falling Magnet in a Pipe
"A magnet falls through a vertical pipe. As it falls, eddy currents in the pipe oppose its motion. How does terminal velocity arise?" Solution: Initially, the magnet accelerates under gravity. As it speeds up, the rate of flux change through the pipe increases, inducing larger eddy currents and larger opposing forces. Eventually, the upward magnetic force equals the weight, and the magnet reaches terminal velocity. The faster the magnet moves, the larger the damping force.

#### Rail Gun Problem
"A conducting bar slides on two parallel rails in a perpendicular magnetic field. The rails are connected to a power supply. What is the bar's acceleration?" Solution: Current I flows through the bar, creating a force F = BIL (where L is the bar's length). As the bar moves, it generates a back-EMF ε_back = BLv that opposes the applied voltage. The net voltage drives current, which depends on velocity. The equation of motion m(dv/dt) = BIL couples with the circuit equation, giving acceleration that decreases as velocity increases.

#### Review Questions
1. For 10 points: A 10 cm edge of a loop exits a 0.5 T field at 2 m/s. If resistance is 1 Ω, what is the induced current?
2. Explain how the terminal velocity of a falling magnet arises from electromagnetic induction.
3. Describe how a changing current in the primary coil induces an EMF in a secondary coil.

---

## Subtopic: Electromagnetic Waves

### Maxwell Equations & EM Waves
**Type:** Core Understanding
**Slug:** maxwell-equations-em-waves
**Estimated time:** 13 min
**Key concepts:** Maxwell equations · wave equation · c = 3×10⁸ m/s · light as EM radiation
**Summary:** Maxwell's equations describe how electric and magnetic fields interact; from them emerges the prediction that EM waves exist and travel at light speed.

#### The Four Maxwell Equations
(1) Gauss's law: ∮ E · dA = Q_enclosed/ε₀ (electric field from charges). (2) No magnetic monopoles: ∮ B · dA = 0 (no isolated magnetic poles). (3) Faraday's law: ∮ E · dl = −dΦ_B/dt (changing magnetic flux induces electric field). (4) Ampère-Maxwell law: ∮ B · dl = μ₀(I_enclosed + ε₀ dΦ_E/dt) (current and changing electric flux create magnetic field). These four equations completely describe electromagnetism.

#### Derivation of the Wave Equation
Combining Faraday's and Ampère-Maxwell laws in free space (no charges or currents) yields a wave equation for E and B fields: ∂²E/∂t² = (1/(μ₀ε₀)) ∂²E/∂x². Solving this shows that E and B oscillate as waves, with speed v = 1/√(μ₀ε₀). Substituting constants gives v = c ≈ 3 × 10⁸ m/s—the speed of light. This predicted that light is an electromagnetic wave, a remarkable unification of optics and electromagnetism.

#### Properties of EM Waves
In an EM wave: (1) E and B fields oscillate perpendicular to each other and to the propagation direction. (2) E and B oscillate in phase (peaks aligned). (3) E/B = c at every point. (4) The Poynting vector S = (1/μ₀) E × B points in the direction of propagation and gives energy density flux (power per unit area). The average intensity is I = (1/2) ε₀ c E₀² (where E₀ is the peak E-field).

#### Polarization & Linear Momentum
EM waves carry linear momentum p = E/c for light. Radiation pressure on a surface is the momentum transfer rate. A perfectly absorbing surface experiences pressure P = I/c; a perfectly reflecting surface experiences P = 2I/c. This momentum and pressure are measurable (e.g., in solar sails for spacecraft).

#### Review Questions
1. What are Maxwell's four equations in words?
2. Show how Maxwell's equations predict the existence of EM waves.
3. What is the relationship between E and B in an EM wave?

---

[Remaining content: EM Wave Properties (3 more lessons), Speed of Light & Fundamental Constants (3 lessons), Radiation & Antenna Theory (3 lessons), EM Competition Problems (1 lesson) follow the same format, omitted for brevity.]

---
