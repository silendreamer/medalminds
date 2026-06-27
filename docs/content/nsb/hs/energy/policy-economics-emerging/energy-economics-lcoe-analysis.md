---
id: nsb-lesson-0582
title: "Levelized Cost of Energy Analysis"
level: hs
subject: energy
topic: policy-economics-emerging
subtopic: "Energy Economics & LCOE"
slug: energy-economics-lcoe-analysis
type: "Application"
estimatedMinutes: 14
keyConcepts: ["Capital cost", "Capacity factor", "LCOE formula", "Technology comparison"]
summary: "Analyze the economic competitiveness of energy technologies."
---
#### LCOE Formula and Inputs
Levelized Cost of Energy (LCOE) is the average cost per unit energy over a project lifetime, accounting for all capital, operating, and decommissioning costs discounted to present value. Formula:

LCOE = (ΣCapital + ΣO&M + Decommissioning) / (Σ Energy_produced) [$/kWh]

More precisely, using net present value discounting at rate r over project lifetime T years:

LCOE = Σ_{t=0}^{T} [(Capex_t + O&M_t) / (1+r)^t] / Σ_{t=0}^{T} [Energy_t / (1+r)^t]

Simplified version (constant annual costs, perpetual life):

LCOE = (Capex × CRF + O&M) / (Energy/year) ≈ (Capex × 0.067 + O&M) / (8.76 × CF × Prated)

where CRF = 0.067 is capital recovery factor (for 20-year life, 7% discount rate), O&M is annual operating cost ($/kW/year), Energy/year = 8.76 MWh/kW/year × Capacity Factor (CF).

#### LCOE Comparison Across Technologies
2024 LCOE estimates (U.S., $/kWh, including transmission connection, capacity reserves):

| Technology | Capex ($/kW) | O&M ($/kW/yr) | CF | LCOE ($/kWh) |
|---|---|---|---|---|
| Utility solar PV | 800–1,200 | 10–15 | 0.25 | 0.02–0.04 |
| Onshore wind | 1,200–1,600 | 40–50 | 0.35 | 0.03–0.06 |
| Offshore wind | 2,500–4,000 | 80–120 | 0.45 | 0.07–0.12 |
| Natural gas (new) | 500–800 | 30–40 | 0.50 | 0.04–0.08 |
| Coal (new, rare) | 2,500–3,500 | 50–70 | 0.80 | 0.08–0.15 |
| Nuclear (new) | 6,000–9,000 | 100–150 | 0.90 | 0.12–0.19 |
| Hydropower | 1,500–5,000 | 20–50 | 0.40 | 0.04–0.15 |
| Geothermal | 2,500–4,000 | 100–200 | 0.80 | 0.07–0.12 |

Solar and wind have achieved parity with fossil fuels on LCOE; however, LCOE does not account for system costs (storage, grid, reserve capacity), which favor dispatchable sources (nuclear, hydro, natural gas).

#### Sensitivity and Scenarios
LCOE is sensitive to key assumptions:

1. **Capacity factor:** 10% change in CF changes LCOE by ~10% (inverse relationship). Wind LCOE depends strongly on site quality (good sites CF=0.40, poor sites CF=0.20).
2. **Discount rate:** 7% → 8% increases LCOE by ~15% for capital-intensive technologies (nuclear, wind). Low discount rates favor high-capital projects.
3. **Lifetime:** 20 years vs. 30 years for wind reduces LCOE by ~15% (amortization over longer period). Actual plant life may be 25–50 years; book value vs. true economic cost matters for policy.
4. **Learning and cost reduction:** Solar PV LCOE declined 90% from 2010–2023 ($0.40/kWh → $0.04/kWh); continued cost reduction expected as markets scale. Conversely, nuclear cost has increased (regulation, labor) and is unfavorable to LCOE improvement.

#### System Costs and Grid Integration
LCOE compares busbar cost (plant-gate); system costs add transmission, interconnection, grid balancing, storage. For high wind/solar penetration (>50%), system costs increase significantly:

- **Transmission:** $50–200/kW to connect remote wind sites to load centers.
- **Storage:** $100–300/kWh battery (capital) + ~$0.05/kWh (annual O&M for 4-hour storage).
- **Overbuilding and curtailment:** Excess generation during low-demand hours may be curtailed (wasted) if storage is insufficient. In high-renewable grids, ~5–20% renewable generation is curtailed.

Fully-loaded system LCOE (including storage for firm power) for 100% renewable is ~$0.08–0.15/kWh (2024 estimates, declining). This exceeds fossil baseline but improves with cost reduction and grid efficiency innovations.

#### Worked Example: Wind vs. Gas Generation Comparison
Compare a 100 MW onshore wind farm vs. a 100 MW natural gas plant. Assume 20-year project life, 7% discount rate.

**Wind inputs:**
- Capex: $1,400/kW → $140 M total
- O&M: $45/kW/year → $4.5 M/year
- CF: 0.35
- Energy/year: 100 MW × 8.76 MWh/MW/year × 0.35 = 306.6 GWh/year

**Gas inputs:**
- Capex: $650/kW → $65 M total
- O&M: $35/kW/year → $3.5 M/year (fixed) + variable fuel cost (see below)
- CF: 0.50 (economic operation at 50% capacity on average)
- Fuel cost: Natural gas $5/MMBtu, efficiency 45% → fuel cost $11/MWh (variable)
- Energy/year: 100 MW × 8.76 × 0.50 = 438 GWh/year

**LCOE calculation:**

Wind LCOE:
- Capital cost amortized: $140 M × 0.067 = $9.38 M/year
- O&M: $4.5 M/year
- Total cost: $13.88 M/year
- LCOE = $13.88 M / 306.6 GWh = **$0.0453/kWh** (~$45.3/MWh)

Gas LCOE:
- Capital cost amortized: $65 M × 0.067 = $4.36 M/year
- O&M (fixed): $3.5 M/year
- O&M (fuel variable): 438 GWh × $11/MWh = $4.82 M/year
- Total cost: $12.68 M/year
- LCOE = $12.68 M / 438 GWh = **$0.0290/kWh** (~$29.0/MWh)

**Conclusion:** Gas has lower LCOE on busbar basis (~$29/MWh vs. $45/MWh for wind). However, if natural gas price increases to $7/MMBtu, fuel cost rises to ~$15.4/MWh, increasing gas LCOE to ~$0.0380/kWh, approaching wind. And wind has zero fuel cost risk.

#### Review Questions
1. Calculate LCOE for a 50 MW solar farm: Capex $900/kW, O&M $12/kW/year, CF 0.25, 20-year life, 7% discount rate.
2. A new coal plant costs $3,000/kW, $60/kW/year O&M, CF 0.80. Calculate LCOE and compare to your solar result from Q1. What explains the difference?
3. Explain why system costs (storage, transmission, balancing) are not included in LCOE, and why system LCOE is relevant for policy decisions on high-renewable scenarios.

---
