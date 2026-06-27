---
id: nsb-lesson-0576
title: "AC and DC Circuit Fundamentals"
level: hs
subject: energy
topic: electrical-power-grid
subtopic: "AC vs DC Power Systems"
slug: ac-dc-circuit-fundamentals
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["AC voltage and frequency", "DC voltage", "RMS values", "Power factor"]
summary: "Compare alternating and direct current systems and their applications."
---
#### Alternating Current (AC)
Alternating current oscillates sinusoidally: V(t) = Vmax sin(ωt + φ), where Vmax is peak voltage, ω = 2πf (angular frequency), f is frequency (Hz), t is time (s), and φ is phase angle. In North America, utility AC is 60 Hz, 120 V RMS (root mean square, equivalent DC voltage that dissipates same power in a resistor). RMS voltage is Vrms = Vmax/√2. The RMS value is preferred for power calculations: P = Vrms × Irms × cos(θ), where cos(θ) is power factor (accounts for phase lag between voltage and current due to inductors and capacitors).

**Advantages of AC:** (1) easy voltage transformation via transformers (allowing efficient long-distance transmission at high voltage, low current); (2) efficient motor design (induction motors); (3) matched to generator design (rotating conductors in magnetic field naturally produce AC). **Disadvantages:** (1) power loss in transmission increases with resistance R and current I (loss = I²R); (2) reactive power (stored in inductors, capacitors) doesn't contribute to useful work but stresses the grid.

Reactance (opposition to AC current beyond resistance) is X = 2πfL for inductors (L in henries), X = 1/(2πfC) for capacitors (C in farads). Impedance is Z = √(R² + X²). Power factor cos(φ) = R/Z ranges from 0 (purely reactive) to 1 (purely resistive). Low power factor (e.g., 0.8 with inductive motors) requires utility to supply extra current to reach the same real power, increasing transmission losses.

#### Direct Current (DC)
Direct current is constant voltage (no oscillation). Batteries, solar cells, and electrochemistry naturally produce DC. DC circuits: V = constant, Power P = V × I (no power factor).

**Advantages of DC:** (1) simpler electronics (no frequency issues); (2) no reactive power losses (all voltage drop is real power); (3) better for energy storage (batteries discharge DC). **Disadvantages:** (1) difficult to transform voltage (requires DC-DC converters with switching power electronics, less efficient than transformers); (2) challenging motor design (brushed DC motors less efficient than AC induction); (3) difficult to interconect multiple sources.

#### Utility AC Generation
Synchronous generators (alternators) produce AC by rotating a coil in a magnetic field at constant speed (synchronized to grid frequency). A 60 Hz grid requires turbine speed of 3,600 rpm (2-pole) or 1,800 rpm (4-pole). Generator voltage (e.g., 22 kV) is stepped up to transmission voltage (69–500 kV) by transformer. Utility AC voltage and frequency must remain within strict tolerances: voltage ±10%, frequency ±0.1 Hz. Deviations trigger protective relays (automatic circuit breakers) to prevent equipment damage and grid instability.

#### DC Applications and Modern Trends
HVDC (high-voltage DC) transmission is used for long-distance power transfer: DC lines have lower loss than AC (half the loss for same power over same distance, because DC current is constant while AC current varies sinusoidally, and loss = I²R where I_RMS = I_peak/√2). HVDC enables interconnection of non-synchronous grids (e.g., Europe–Africa subsea cable, or regions with different 50/60 Hz standards). However, HVDC requires expensive power electronic converters at both ends (~$100M+ for 1,000 MW, $100–200/kW).

DC microgrids (e.g., solar + battery + loads) operate at low voltage (12–48 V DC, safer than AC). DC distribution within buildings is emerging (datacenters, modular power systems) as renewable generation (solar PV) is naturally DC.

#### Review Questions
1. Calculate the RMS voltage for a 120 V peak sinusoidal AC waveform, and the power dissipated in a 10 Ω resistor at this RMS voltage.
2. Explain why transformers (used in AC systems) cannot step up DC voltage, and describe the alternative (DC-DC converter).
3. Compare transmission losses for AC (f = 60 Hz, Irms = 100 A) vs. DC (I = 100 A) over 100 km of copper wire (R = 0.05 Ω/km per conductor). Which has lower loss?

---
