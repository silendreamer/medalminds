---
id: nsb-lesson-0568
title: "Wind Turbine Aerodynamics and Power"
level: hs
subject: energy
topic: renewable-energy-systems
subtopic: "Wind Energy (Aerodynamics & Power Curves)"
slug: wind-turbine-aerodynamics-power
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["Betz limit", "Power coefficient", "Lift and drag", "Power curve"]
summary: "Understand how wind turbines extract energy from moving air and convert it to electricity."
---
#### Kinetic Energy of Wind and Theoretical Limits
Wind is moving air with kinetic energy KE = ½ m v². The power in wind (power per unit area) is: Pwind = ½ ρ A v³, where ρ = 1.225 kg/m³ (air density at sea level), A = rotor swept area (m²), v = wind speed (m/s). A 1 MW turbine with rotor diameter 63 m (swept area 3,118 m²) in 10 m/s wind receives Pwind = ½ × 1.225 × 3,118 × 10³ ≈ 1,900 kW. Notably, power scales with v³—doubling wind speed increases power 8×, explaining why wind turbines are sited in high-wind locations (mountain passes, offshore, coastal bluffs).

#### The Betz Limit
Extracting energy from wind slows the air downstream. The theoretical maximum power coefficient (Cp) is derived by analyzing the momentum and energy change in the wind stream passing through the rotor. The Betz limit states that Cp,max ≈ 0.593 (59.3%), achieved when the air velocity downstream is reduced to 1/3 of the upstream value. This means ~40% of wind energy always escapes downstream (unavoidable thermodynamically). Real turbines achieve Cp ≈ 0.35–0.45 (35–45%), with modern high-efficiency machines approaching 0.48 (still below Betz limit).

#### Lift-Based Turbine Design
Modern horizontal-axis wind turbines (HAWTs) use airfoil-shaped blades that generate lift perpendicular to the wind, causing rotation. Lift is generated when air flows over a curved airfoil; pressure is lower on the curved (suction) side, creating a force perpendicular to flow. Lift force = ½ ρ v² A CL, where CL is lift coefficient (~0.8–1.2 for typical airfoils at optimal angle of attack). Blades are twisted (pitch angle varies from hub to tip) so that local angle of attack remains optimal across the rotor disk despite varying tip speed and wind speed (tip speed can exceed 60 m/s, ~215 km/h). Drag (force parallel to wind) also acts on blades and is minimized through aerodynamic design; drag force = ½ ρ v² A CD, where CD is typically 0.01–0.02 (much smaller than CL).

#### Power Curve and Wind Speed Dependence
A turbine's power curve is Pturbine(v) = η × Pwind × Cp(v) = η × ½ ρ A v³ × Cp(v), where η is mechanical efficiency (~0.95), Cp depends on wind speed and pitch angle (active control optimizes Cp), and A is rotor area. A typical 2 MW turbine power curve:

- Cut-in wind speed (3–4 m/s): Minimum wind to generate power; below this, parasitic losses exceed generation.
- Rated power (25–35% of Pwind) achieved at ~10–12 m/s wind speed.
- Rated power plateau (10–12 m/s to ~25 m/s): Pitch control keeps power constant by reducing blade angle of attack as wind speed increases, holding Cp constant or decreasing it with increasing v (to keep P constant despite v³ increase).
- Cut-out wind speed (~25 m/s): Emergency shutdown to prevent over-torque and catastrophic failure.

At 10 m/s, the power curve typically shows Pturbine/Pwind ≈ 0.35 (Cp ≈ 0.35). At 15 m/s, rated power is maintained (pitch control reduces Cp to keep power constant).

#### Capacity Factor and Energy Production
Capacity factor (CF) is the ratio of average power output to rated power over a year: CF = ⟨P⟩ / Prated. Wind resources vary: onshore CF ≈ 0.25–0.35 (excellent sites ~0.40); offshore CF ≈ 0.40–0.50 (less wind shear, higher average wind). Annual energy production (AEP) = Prated × 8,760 hours × CF. A 2 MW turbine in a moderate wind resource (CF = 0.30) produces 2 × 8,760 × 0.30 = 5,256 MWh/year. At $0.03/kWh (typical wholesale price), revenue is ~$158,000/year, with capital cost ~$2–3M (amortized ~$200k/year assuming 20-year lifetime). This low margin explains why wind farms must be developed at scale (50–300 MW) to achieve economic viability.

#### Review Questions
1. Derive the power in wind as a function of rotor area and wind speed, and explain why power scales with wind speed cubed (v³).
2. Explain the Betz limit and why real turbines cannot achieve it, using momentum and energy balance arguments.
3. Calculate the capacity factor of a 3 MW turbine with the following annual wind distribution: 10% of hours at 8 m/s, 20% at 10 m/s, 40% at 12 m/s, 20% at 14 m/s, 10% at 16 m/s (use power curve to estimate power at each speed).

---
