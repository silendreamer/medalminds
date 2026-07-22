---
id: nsb-lesson-0570
title: "Wind Resource Assessment and Site Selection"
level: hs
subject: energy
topic: renewable-energy-systems
subtopic: "Wind Energy (Aerodynamics & Power Curves)"
slug: wind-resource-assessment-site-selection
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["Weibull distribution", "Wind shear", "Terrain effects", "Capacity factor prediction"]
summary: "Evaluate wind resources and predict energy production for a proposed site."
---
#### Weibull Wind Speed Distribution
Wind speed at a site is typically characterized by a Weibull probability distribution: P(v) = (k/λ) × (v/λ)^(k−1) × exp(−(v/λ)^k), where k is shape parameter (typical range 1.5–2.5) and λ is scale parameter (related to mean wind speed). k = 2 gives a Rayleigh distribution (special case used for rough approximations); k > 2 indicates narrower, more predictable winds; k < 2 indicates highly variable winds. Mean wind speed ⟨v⟩ is related to λ by: ⟨v⟩ = λ × Γ(1 + 1/k), where Γ is the gamma function. For k = 2 (Rayleigh), ⟨v⟩ ≈ 0.886 × λ.

Annual energy production is calculated by integrating power over the Weibull distribution: AEP = ∫ P(v) × Pturbine(v) dv. This requires the turbine power curve P(v) and wind speed distribution P(v). For a 2 MW turbine with Weibull parameters k = 2, λ = 10 m/s (mean wind = 8.9 m/s), AEP ≈ 2 × 8,760 × 0.32 ≈ 5,600 MWh/year (capacity factor ~32%).

#### Wind Shear and Vertical Variation
Wind speed increases with height due to surface friction. The vertical wind profile is commonly approximated by the power law: v(z) = v₀ × (z/z₀)^α, where v₀ is wind speed at reference height z₀, and α is surface roughness exponent (typical range 0.1–0.3; α ≈ 0.1 for smooth ocean, 0.2 for grassland, 0.3 for forests/urban). A turbine at hub height 100 m in grassland (z₀ = 0.1 m) experiences wind speed ~1.4× higher than at 10 m height. This "wind shear" is exploited by tall towers (80–120 m heights typical; new onshore machines use 150+ m towers).

#### Terrain and Sheltering Effects
Terrain (hills, valleys, forests) dramatically affects wind resources. Hilltops have ~30–50% higher wind speed due to acceleration over the peak; valleys have lower wind speeds due to sheltering and flow separation. Forests and urban areas increase surface roughness, reducing wind speed and increasing wind shear. Wind flow around buildings and obstacles is complex (computational fluid dynamics required for precise prediction); empirical rules estimate sheltering effects: wind speed reduced 20–40% within 10 tree heights downwind of a forest.

Terrain classification for resource assessment:
- **Class I (excellent):** Open ocean, very flat terrain, mean wind ~10–12 m/s at 10 m height. Capacity factor ~40–50%.
- **Class II (good):** Grassland, gentle slope, mean wind ~8–10 m/s. Capacity factor ~30–40%.
- **Class III (fair):** Rough terrain, forests, mean wind ~6–8 m/s. Capacity factor ~20–30%.
- **Class IV (poor):** Urban, heavily forested, mean wind <6 m/s. Capacity factor <20%.

#### Worked Example: Site Assessment and AEP Prediction
A proposed onshore wind farm site has measured winds: 10 m height anemometer data giving mean wind speed 8.5 m/s, k = 2.1 (Weibull shape). Hub height of turbines is 100 m, site terrain is grassland (α = 0.2). Design a 50 MW farm (20 turbines of 2.5 MW each) and estimate annual energy production.

**Solution:**
1. **Adjust wind speed to hub height:**
v(100 m) = 8.5 × (100/10)^0.2 = 8.5 × 1.585 = 13.5 m/s (approximately; actual profile is more complex).

2. **Update Weibull parameters:**
λ = ⟨v⟩ / Γ(1 + 1/k) = 13.5 / Γ(1.476) ≈ 13.5 / 0.886 ≈ 15.2 m/s (for k = 2.1).

3. **Estimate capacity factor using power curve:**
At mean wind 13.5 m/s, turbine is near or at rated power (typical rated wind 10–12 m/s). For a conservative estimate, assume CF ≈ 0.35 (between the 0.30–0.40 range for Class II sites).

4. **Calculate AEP:**
AEP = 50 MW × 8,760 hr/year × 0.35 = 153,300 MWh/year (or 153.3 GWh/year).

5. **Economic assessment:**
At $30/MWh (wholesale market price), revenue = 153.3 × $30 = $4.6 million/year. With capital cost ~$100–150M (for 50 MW farm, $2–3/W), payback period ~25–30 years, within typical project lifetime (20–25 years) but with tight margins. Sensitivity: 10% higher wind (CF = 0.38) improves revenue by ~$0.4M/year, making project viable.

#### Review Questions
1. Derive the relationship between mean wind speed and Weibull parameters (k, λ), and calculate λ for a site with mean wind 9 m/s and k = 2.0.
2. A site has wind data at 10 m height: mean = 8 m/s, k = 1.9. Calculate the mean wind speed at 80 m height in grassland (α = 0.2).
3. Design a 20 MW wind farm (8 turbines of 2.5 MW each) with Weibull parameters k = 2.1, λ = 12 m/s at hub height. Estimate the capacity factor and annual energy production, assuming turbine rated power at 11 m/s.

---
