---
id: nsb-lesson-0929
title: "Applications of Electromagnetic Induction"
level: hs
subject: physics
topic: magnetism-electromagnetism
subtopic: "Electromagnetic Induction"
slug: applications-induction
type: "Application"
estimatedMinutes: 14
keyConcepts: ["transformers", "generators", "eddy currents", "magnetic damping", "practical induction"]
summary: "Electromagnetic induction is the basis for transformers, generators, and many practical devices that convert between electrical and mechanical energy."
---
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
