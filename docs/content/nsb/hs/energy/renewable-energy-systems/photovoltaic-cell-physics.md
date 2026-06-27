---
id: nsb-lesson-0566
title: "Photovoltaic Cell Physics and Operation"
level: hs
subject: energy
topic: renewable-energy-systems
subtopic: "Solar Energy (Photovoltaics & Solar Thermal)"
slug: photovoltaic-cell-physics
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["Photon absorption", "Electron-hole pairs", "P-N junction", "Photocurrent"]
summary: "Understand how photons create electricity in solar cells through semiconductor physics."
---
#### The Photovoltaic Effect
When photons strike a semiconductor (typically silicon), energy is transferred to electrons, promoting them from the valence band (bound to atoms) to the conduction band (free to move). This creates an electron-hole pair. The bandgap energy (Eg) determines the minimum photon energy required: Eg = hν, where h = 6.626×10⁻³⁴ J·s (Planck constant) and ν is photon frequency. Silicon has Eg ≈ 1.1 eV (electron-volts); photons with energy >1.1 eV (wavelength <1,100 nm) can be absorbed. Visible and near-infrared light (300–1,100 nm) correspond to ~80% of solar energy reaching Earth's surface. Infrared photons with energy <1.1 eV pass through silicon unabsorbed (heat loss). Ultraviolet photons with energy >1.1 eV are absorbed, but excess energy (E_photon − Eg) is lost as heat through thermalization (electron relaxation to band edge).

#### P-N Junction and Built-in Electric Field
A solar cell is a thin p-n junction: a layer of p-type semiconductor (dopants accepting electrons, creating holes) in contact with n-type semiconductor (dopants donating electrons). At the interface, electrons diffuse from n to p, and holes diffuse from p to n. This charge transfer creates a built-in electric field (reverse bias, ~0.6 V for silicon) pointing from n to p, preventing further diffusion. The region with depleted mobile charge carriers is the depletion region (width ~1 μm). This field is crucial: it sweeps photogenerated electrons toward the n-layer and holes toward the p-layer, preventing recombination and generating a photocurrent.

#### Short-circuit Current and Open-circuit Voltage
**Short-circuit current (Isc):** When the cell is short-circuited (externally connected with zero resistance), all photogenerated charge carriers reach the external circuit. Isc is proportional to the number of absorbed photons (photon current Iph): Isc ≈ Iph = q × Φ, where q = 1.6×10⁻¹⁹ C (elementary charge) and Φ is photon flux (photons/s·cm²). For standard test conditions (1 kW/m² irradiance, AM 1.5 spectrum), silicon cells produce Isc ~40 mA/cm².

**Open-circuit voltage (Voc):** When the cell is open-circuited (no current flows), a voltage develops opposing the photocurrent. At equilibrium, Iph = Io(e^(qVoc/kT) − 1), where Io is saturation current (leakage), k = 1.38×10⁻²³ J/K (Boltzmann constant), T is temperature (K). Solving for Voc: Voc = (kT/q) × ln(Iph/Io + 1). At T = 300 K, kT/q ≈ 26 mV. For Iph = 40 mA/cm² and Io = 10⁻¹² A/cm², Voc ≈ 0.6 V. High-efficiency cells achieve Voc ~0.65–0.75 V; Voc increases logarithmically with Iph but is limited by Io (lower defects → lower Io → higher Voc).

#### Efficiency and Fill Factor
Maximum power (Pmax) is generated at an intermediate voltage/current point (Vm, Im) where P = V × I is maximized. The fill factor (FF) is the ratio of maximum power to theoretical maximum: FF = Vm × Im / (Voc × Isc). For high-quality silicon cells, FF ~0.75–0.82. Efficiency is: η = Pmax / P_in = (FF × Voc × Isc) / P_in, where P_in = 1,000 W/m² (standard test irradiance). Typical silicon cell efficiency is 15–20%; laboratory prototypes reach 22%; theoretical maximum for single-junction silicon is ~29% (Shockley-Queisser limit, accounting for bandgap mismatch with solar spectrum).

#### Spectral Response and Temperature Effects
Spectral response (SR) quantifies the photocurrent generated per unit irradiance at each wavelength: SR(λ) = Iph/Φ(λ). Silicon's SR peaks at ~900 nm (near-infrared) because that wavelength has optimal absorption depth (balance between generation depth and collection efficiency). Temperature increases reduce efficiency because Voc decreases with T (temperature coefficient ~−0.5%/K for silicon). At 60°C (typical operating temperature in full sun), efficiency drops ~10% from the 25°C rating. This explains why desert solar installations (high irradiance, high temperature) have lower efficiency than temperate regions with cooler conditions despite higher irradiance.

#### Review Questions
1. Why do silicon solar cells not absorb photons with wavelength >1,100 nm (infrared), and explain the fate of ultraviolet photons with energy >3 eV?
2. Derive the relationship between short-circuit current and photon flux, and explain why Isc increases linearly with irradiance.
3. A silicon cell produces Isc = 38 mA/cm², Voc = 0.58 V, and FF = 0.77. Calculate the efficiency under standard test conditions (1 kW/m² irradiance).

---
