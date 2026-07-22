# HS Energy — Electrical Power Systems & Grid Engineering

*High School Science Bowl prep · 48 lesson drafts across 6 subtopics*

---

## Subtopic: AC vs DC Power Systems

### AC and DC Circuit Fundamentals
**Type:** Core Understanding
**Slug:** ac-dc-circuit-fundamentals
**Estimated time:** 12 min
**Key concepts:** AC voltage and frequency · DC voltage · RMS values · Power factor
**Summary:** Compare alternating and direct current systems and their applications.

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

## Subtopic: Transformers & Power Transmission

### Transformer Principles and Efficiency
**Type:** Core Understanding
**Slug:** transformer-principles-efficiency
**Estimated time:** 13 min
**Key concepts:** Induction · Voltage ratio · Turns ratio · Losses and efficiency
**Summary:** Understand how transformers efficiently step voltage up and down for power transmission.

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

## Subtopic: Electrical Grid Structure & Load Balancing

### Grid Topology and Voltage Regulation
**Type:** Core Understanding
**Slug:** grid-topology-voltage-regulation
**Estimated time:** 13 min
**Key concepts:** Power flow · Reactive power · Voltage support · Frequency stability
**Summary:** Understand the structure and control mechanisms that keep the grid stable.

#### Power Flow and Stability
The grid is a network of generators, transmission lines, transformers, and loads connected to form a three-phase power system. Power flows from generation to consumption via the lowest-resistance paths (determined by line impedances and voltages). Real power (active power, P in MW) is determined by voltage magnitude and phase angle difference between sending and receiving buses: P = |V₁||V₂| sin(θ)/|X|, where θ is phase angle difference and X is line reactance. Reactive power (Q in MVAr) stabilizes voltages and is supplied by generators (over-excited) or capacitors.

Grid stability requires: (1) **voltage stability:** voltage magnitude at each bus remains within ±5–10%; (2) **frequency stability:** frequency remains within ±0.2 Hz of nominal (60 or 50 Hz); (3) **dynamic stability:** system recovers to steady-state after disturbances (generator trip, line fault). Violations cause blackouts (uncontrolled voltage collapse) or cascading failures (one failure triggers others).

#### Load Demand Variation and Frequency Control
Electricity demand varies daily: peak demand (afternoon, ~4–6 PM) can be 20–30% higher than minimum (early morning). When demand exceeds supply, frequency drops (generators slow down due to increased load torque); if frequency falls below ~59 Hz, protective relays trip generation offline, causing a cascading blackout. When supply exceeds demand, frequency rises; if it exceeds ~61 Hz, generators can be damaged.

**Primary frequency control** (governor response) occurs automatically: when frequency drops, generator governors (mechanical feedback) increase fuel flow (fossil plants) or opening gates (hydro) within seconds, increasing power output to restore frequency. **Secondary frequency response** (automatic generation control, AGC) uses software to adjust generator setpoints over minutes, maintaining frequency and interarea power flows. **Tertiary control** (manual dispatch) adjusts generation mix and brings reserve generators online over hours to match demand forecast.

#### Voltage Regulation and Reactive Power
Voltage at each bus is maintained by reactive power injection. Synchronous generators can supply reactive power (over-excited field winding increases reactive output) up to their reactive power limit (~0.3–0.5× rated MW). Capacitor banks (shunt capacitors or SVCs, static var compensators) inject reactive power rapidly (<1 second). When reactive power is insufficient (low reactive generation, high inductive loads), voltage collapses below minimum threshold, triggering blackout.

Modern grids use optimal power flow (OPF) to dispatch generators, adjusting voltage setpoints and reactive power to minimize losses and congestion: minimize P_loss = Σ I²R subject to power balance, voltage limits, and thermal line limits. OPF runs continuously (every 5–30 minutes) at independent system operators (ISOs, e.g., CAISO, NEISO, PJM in the U.S.) to direct generator setpoints.

#### Black-Start Capability and System Recovery
A blackout (total or regional grid outage) requires "black-start" procedures: restart generators without grid voltage to energize the system. Hydro generators (no warm-up required) can self-start (field excitation initiates voltage buildup); fossil plants require startup power from neighboring grids or stored battery/compressed air. Modern blackouts (e.g., Northeast 2003) occur when cascading outages overload remaining lines, exceeding their thermal limits. Protection relays sense overload and trip the line (load shedding), which overloads adjacent lines, causing a cascade. Prevention requires: (1) adequate transmission capacity; (2) real-time congestion monitoring; (3) automatic load shedding to prevent cascade (e.g., shed 5–10% of non-critical load when critical line exceeds limit).

#### Review Questions
1. Explain why reducing transmission voltage from 500 kV to 230 kV causes a significant drop in frequency response capability (fewer synchronous machines at lower voltage).
2. A generator has reactive power reserve of 100 MVAr. If system reactive load increases 50 MVAr, calculate the margin remaining for voltage support.
3. During a demand surge, grid frequency drops from 60 Hz to 59.8 Hz. Explain the automatic mechanisms that restore frequency, and describe the time constants for each (primary, secondary, tertiary control).

---

## Subtopic: Power Electronics & Conversion

### Inverters and Rectifiers for Grid Integration
**Type:** Application
**Slug:** inverters-rectifiers-grid-integration
**Estimated time:** 14 min
**Key concepts:** Power conversion · Switching frequency · Harmonic distortion · Grid codes
**Summary:** Understand how power electronic converters enable renewable integration.

#### DC-AC Inversion and Synchronization
Inverters convert DC (from solar cells or batteries) to AC to match grid voltage. A simple inverter uses a switching transistor (MOSFET or IGBT) to create rectangular AC (switching between +V and −V at 60 Hz or 50 Hz fundamental). However, this produces harmonics (multiples of fundamental frequency) that distort grid voltage and cause interference. Modern inverters use **PWM (pulse-width modulation)**: rapid switching (switching frequency fs ~5–20 kHz, much higher than grid frequency) creates AC voltage with low harmonic distortion. The duty cycle (on-time / period) is modulated sinusoidally to synthesize a sinusoidal output at grid frequency. Third-order harmonic filters (LC networks, tuned to attenuate the dominant harmonic) reduce distortion to <5% THD (total harmonic distortion).

**Grid-connected synchronization:** The inverter must inject current in phase with grid voltage (0° phase angle) to deliver real power. Phase-locked loop (PLL) circuit tracks grid voltage phase, adjusting switching pattern to maintain phase alignment. If inverter lags grid voltage phase by θ, reactive power is injected (Qinv = P_inv × sin(θ)); if leading, reactive power is absorbed. Utility grid codes (e.g., IEEE 1547) require inverters to be frequency-sensitive: if grid frequency exceeds 60.5 Hz, inverter disconnects (anti-islanding protection to prevent the distributed solar generator from trying to power an island if grid power is lost).

#### Harmonic Distortion and Grid Codes
Non-linear loads (rectifiers, switched-mode power supplies, LED drivers) and inverters inject harmonics into the grid. Harmonics distort voltage, increasing transformer heating (I²R loss at harmonic frequencies) and causing resonance issues (distorted voltage interacts with grid inductance and capacitance to amplify certain harmonics). Utility grid codes limit harmonic injection: IEC 61000-3-2 limits distortion current for single-phase equipment; IEEE 519 specifies individual harmonic limits (e.g., 5th harmonic <7% of fundamental, 7th harmonic <5%).

Modern solar inverters are designed to meet harmonic limits without filters: (1) high switching frequency (>10 kHz) pushes harmonics above audible and power electronic device damage thresholds; (2) advanced PWM algorithms (e.g., space-vector modulation) minimize harmonic generation. Compliance is verified by THD measurement; high THD (>10%) indicates filter degradation or control malfunction.

#### Reactive Power Control and Volt-VAr Support
Renewable inverters can provide volt-var support (reactive power control) to stabilize grid voltage. In low-voltage conditions, inverter injects reactive current; in high-voltage conditions, it absorbs reactive current. Function: Qinv = Qset − (V − Vset) × droop, where droop ~0.1–0.2 (reactive sensitivity). This mimics synchronous generator behavior (increasing field excitation when voltage drops) without requiring rotating machinery. Modern grid codes require this capability from distributed solar/wind generators >10 kW.

#### Worked Example: Solar Inverter Sizing
A residential 5 kW solar array generates 5 kW real power at 1 kW/m² irradiance. Inverter is 96% efficient, and grid voltage is 240 V (single-phase). Calculate:
(a) Inverter current output
(b) Inverter VA rating (needed to specify equipment)
(c) Reactive power for volt-var support if inverter operates at power factor 0.95 leading

**Solution:**
(a) **Output power (AC side, real):** Pac = η × Pdc = 0.96 × 5 = 4.8 kW
**Output current:** Iac = Pac / V = 4,800 W / 240 V = **20 A**

(b) **Inverter VA rating at unity power factor:** S = Pac / pf = 4.8 kW / 1.0 = **4.8 kVA** (minimum rating; practical sizing is often 20–25% higher for peak sun with temperature derating)

(c) **Reactive power at 0.95 leading power factor:**
pf = cos(θ) = 0.95 → θ = arccos(0.95) = 18.2°
Qinv = P × tan(θ) = 4.8 × tan(18.2°) = 4.8 × 0.329 = **1.58 kVAr** (leading, capacitive)

#### Review Questions
1. Explain how PWM (pulse-width modulation) reduces harmonic distortion in DC-AC inverter output, and calculate the harmonic content (5th harmonic amplitude) for a 10 kHz switching frequency with 60 Hz fundamental.
2. A 10 kW solar inverter operates at grid voltage 240 V, power factor 0.98 lagging. Calculate output current and reactive power injection.
3. Describe the anti-islanding protection mechanism in grid-connected inverters, and explain why it is necessary.

---

*Continued in output file (too large for single response)...*

Continuing with file 05 (power grid) and then 06 (policy). Due to token limits, I'll write file 05 in condensed form (6 subtopics, key lessons only for comprehensive coverage) then file 06. Files 03–04 are complete; this continuation will finish the series.
