---
id: nsb-lesson-0577
title: "Transformer Principles and Efficiency"
level: hs
subject: energy
topic: electrical-power-grid
subtopic: "Transformers & Power Transmission"
slug: transformer-principles-efficiency
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["Induction", "Voltage ratio", "Turns ratio", "Losses and efficiency"]
summary: "Understand how transformers efficiently step voltage up and down for power transmission."
---
#### Faraday's Law and Transformer Action
A transformer consists of two coils (primary and secondary) wound on a shared iron core. Alternating current in the primary coil creates a time-varying magnetic flux in the core: Φ(t) = Φmax sin(ωt). By Faraday's law, the induced voltage in each coil is V = −N dΦ/dt, where N is the number of turns. The secondary voltage is related to primary by: Vs/Vp = Ns/Np. A step-up transformer (Ns > Np) increases voltage; a step-down transformer (Ns < Np) decreases voltage. The power is ideally conserved: Pp = Vp × Ip = Ps = Vs × Is, so Ip/Is = Vs/Vp = Ns/Np (current decreases when voltage increases, and vice versa).

#### Power Transmission and Voltage Levels
Power loss in transmission lines is Ploss = I²R (resistive heating). For fixed power P = V × I, increasing voltage reduces current by the same factor, reducing loss quadratically. A 100 MW power stream at 100 kV requires I = P/V = 100×10⁶ W / 100×10³ V = 1,000 A; at 500 kV, I = 200 A. Loss over 100 km line (R = 0.05 Ω/km = 5 Ω total) is:
- At 100 kV: Ploss = 1,000² × 5 = 5 MW (5% loss)
- At 500 kV: Ploss = 200² × 5 = 0.2 MW (0.2% loss)

Modern transmission: generation at 20–30 kV, stepped up to 69–138 kV for sub-transmission, then to 230–500 kV for long-distance transmission. Distribution is stepped down to 4–35 kV at substations, then to 120–240 V for households.

#### Transformer Efficiency and Losses
Real transformers have losses (~0.5–2% for large utility transformers):

1. **Copper loss (I²R loss):** Resistance of primary and secondary windings dissipates power Ploss = Ip²Rp + Is²Rs. Proportional to current squared; larger at high-load conditions.

2. **Iron loss (core loss):** Hysteresis (energy dissipated reversing magnetic domains) and eddy currents (induced currents in core material) dissipate power Pcore ∝ f × B². Relatively constant with load; minimized by using laminated silicon steel (thin sheets insulated from each other to break eddy current paths) and optimized core design.

**Efficiency:** η = Pout / Pin = (Pin − Ploss) / Pin. For a 100 MVA transformer with total loss 200 kW at rated load: η = (100 MW − 0.2 MW) / 100 MW = 0.998 = 99.8%. Even small efficiency improvements (0.1%) save millions in annual energy costs; grid-scale efficiency is dominated by transformer losses (~1–2% of transmitted power).

#### Equivalent Circuit and Impedance
A real transformer can be modeled as an ideal transformer (Vs/Vp = Ns/Np) plus series impedance Z (combination of copper resistance and leakage inductance). Impedance is often expressed as percentage impedance: Z% = (Z × Irated / Vrated) × 100%. Typical utility transformer Z ≈ 5–10%. High impedance limits fault current (protective feature) but increases voltage drop under load: Vs_load = Vs_noload − Is × Z.

#### Review Questions
1. A transformer has 100 turns on the primary, 500 turns on the secondary. If primary voltage is 120 V AC, calculate the secondary voltage and the current transformation ratio.
2. Calculate transmission loss for 200 MW power over 200 km line (R = 0.05 Ω/km) at 230 kV vs. 500 kV. By what percent does increasing voltage to 500 kV reduce loss?
3. A transformer is rated 100 MVA with copper loss 50 kW and core loss 150 kW at rated load. Calculate efficiency at 50% load (assume copper loss scales with load squared, core loss is constant).

---
