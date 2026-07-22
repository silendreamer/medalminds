---
id: nsb-lesson-0579
title: "Inverters and Rectifiers for Grid Integration"
level: hs
subject: energy
topic: electrical-power-grid
subtopic: "Power Electronics & Conversion"
slug: inverters-rectifiers-grid-integration
type: "Application"
estimatedMinutes: 14
keyConcepts: ["Power conversion", "Switching frequency", "Harmonic distortion", "Grid codes"]
summary: "Understand how power electronic converters enable renewable integration."
---
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
