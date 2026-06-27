---
id: nsb-lesson-0567
title: "Solar Thermal and Concentrated Solar Power"
level: hs
subject: energy
topic: renewable-energy-systems
subtopic: "Solar Energy (Photovoltaics & Solar Thermal)"
slug: solar-thermal-concentrated-solar-power
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["Heat collectors", "Thermal storage", "Concentrating systems", "Tower power plants"]
summary: "Understand how concentrated solar energy is converted to electricity via thermal cycles."
---
#### Solar Thermal Collectors
Solar thermal systems capture sunlight and convert it directly to heat (no electricity intermediate), useful for space heating, water heating, and industrial process heat. Flat-plate collectors consist of: (1) absorber plate (copper or aluminum, dark-painted to maximize absorption); (2) transparent cover (glass); (3) insulated backing. Heat is transferred to working fluid (water or heat-transfer oil) circulating through tubes bonded to the absorber. Efficiency of flat-plate collectors is 50–70% (ratio of heat extracted to incident solar irradiance). Unlike photovoltaic cells, thermal efficiency improves at higher temperatures (up to a limit), making thermal useful for high-temperature applications (~100–150°C).

#### Concentrated Solar Power (CSP)
CSP uses mirrors to concentrate sunlight onto a small receiver, achieving temperatures >1,000°C, suitable for power generation. Concentrating ratio (CR) is the ratio of mirror area to receiver area; typical CSP plants have CR = 100–1,000. At CR = 800, a 1 m² receiver receives power equivalent to ~800 m² of mirrors. Four main CSP technologies:

1. **Parabolic trough:** Linear parabolic mirrors focus sunlight onto an evacuated tube receiver. Operating temperature ~390°C. Most mature technology; ~7 GW deployed globally.
2. **Linear Fresnel:** Flat mirrors with fixed receiver (less efficient than trough but simpler). ~0.5 GW deployed.
3. **Heliostat field (tower):** Individual mirrors (heliostats) track the sun, focusing light onto a central tower receiver. Operating temperature >700°C (some experimental >1,200°C). Enables high efficiency (~35–40% solar-to-electric) but complex and capital-intensive. ~0.5 GW deployed.
4. **Dish-Stirling:** Parabolic dish (focused spotlight) drives a Stirling heat engine. Lab efficiency >30%; limited deployment due to cost (~$3–5/W vs. $1–2/W for parabolic trough).

#### Thermal Energy Storage
CSP requires energy storage to generate electricity at night or during cloudy periods. Thermal storage systems:

1. **Molten salt:** Mixture of sodium nitrate (60%) and potassium nitrate (40) heated to 550°C in the receiver, then stored in insulated tanks. At night, molten salt releases heat to drive a steam turbine. Energy density: ~250 kWh/m³ (high volumetric density). Cost: ~$20–40/kWh stored. Deployment: 6-hour, 10-hour, and 15-hour storage at facilities like Solana (Arizona, 280 MW + 10-hour storage) and Noor (Morocco, 510 MW + 7.5-hour storage).

2. **Sensible heat (packed bed):** Rocks or concrete store heat; temperature range typically 200–600°C. Lower energy density (~100 kWh/m³) but simpler and cheaper.

3. **Latent heat (phase-change materials):** Salt eutectics (e.g., NaCl-MgCl₂ at 714°C) store energy during melting/solidification. High energy density (~200–400 kWh/m³) but still experimental.

#### Cycle Efficiency and Practical Considerations
CSP converts concentrated solar energy (Qsolar) to heat in the receiver (Qreceiver = ηabsorber × Qsolar), then drives a thermodynamic cycle (Rankine cycle for steam, Brayton for gas). Cycle efficiency is limited by Carnot: ηcycle = 1 − Thot/Tcold. A solar-driven Rankine cycle operating between Thot = 550°C (molten salt) and Tcold = 30°C (cooling tower) has ηcycle = 1 − (303 K)/(823 K) ≈ 63% theoretical. In practice, real cycles achieve 35–45% due to irreversibilities. Receiver efficiency (absorber losses, radiation cooling) is typically 75–85%. Overall solar-to-electric efficiency: 0.50 × 0.80 × 0.40 ≈ 16% (realistic for trough with molten salt storage). This is competitive with high-efficiency photovoltaics (~20%) and has the advantage of dispatchable power (thermal storage).

#### Advantages and Deployment
CSP advantages: (1) high efficiency at scale; (2) thermal storage enables firm, dispatchable power; (3) industrial process heat applications (desalination, food processing). Disadvantages: (1) capital-intensive (~$2–4/W for solar + storage); (2) requires dry climate (water for cooling, dust reduces mirror reflectivity); (3) land-intensive (typical 5–10 hectares per MW). Global CSP capacity is ~6 GW (2024), concentrated in Spain, U.S., China, and Middle East. Growth is slower than photovoltaics due to higher cost and complexity, but interest in high-temperature CSP for industrial decarbonization (cement, steel, chemicals) is rising.

#### Review Questions
1. Calculate the Carnot efficiency of a solar thermal power cycle operating between Thot = 700°C (heliostat tower) and Tcold = 25°C cooling tower.
2. Compare the energy density (kWh/m³) of molten salt (550°C) to rock bed thermal storage (400°C), assuming specific heat capacity = 2.5 kJ/kg·K and density ~1,800 kg/m³.
3. Explain why CSP with molten salt storage is more dispatchable than photovoltaics with battery storage, and compare the cost and duration of storage for each technology.

---
