---
id: nsb-lesson-0569
title: "Wind Farm Layout and Wake Effects"
level: hs
subject: energy
topic: renewable-energy-systems
subtopic: "Wind Energy (Aerodynamics & Power Curves)"
slug: wind-farm-layout-wake-effects
type: "Application"
estimatedMinutes: 14
keyConcepts: ["Wake deficit", "Array efficiency", "Optimal spacing", "Farm control"]
summary: "Analyze how turbine spacing affects energy production through wake interactions."
---
#### Wake Deficit and Velocity Recovery
Downwind of a turbine, the wake (region of reduced wind velocity) extends for 5–15 rotor diameters, gradually recovering to free-stream wind speed as turbulent mixing entrain faster-moving air from outside the wake. Wake velocity deficit is typically 30–50% of upstream wind at 1 diameter downwind, 10–20% at 3 diameters, <5% at 10 diameters. For a turbine at 10 m/s upstream, the 3-diameter wake deficit is ~2 m/s, reducing power of a downwind turbine from ~0.4 MW (at 10 m/s) to ~0.15 MW (at 8 m/s), a loss of ~62%. Wake effects are the largest source of inefficiency in wind farms; total farm efficiency is typically 0.80–0.90 of the sum of individual turbine powers (10–20% wake loss).

#### Optimal Turbine Spacing
Turbine spacing involves trade-offs: (1) close spacing reduces land use and transmission infrastructure but increases wake losses; (2) wide spacing reduces wake loss but increases land footprint and capital cost. Typical spacing is 3–5 rotor diameters (3D–5D) in the prevailing wind direction (along-wind) and 5–10D perpendicular (cross-wind). A farm with 2.5 MW turbines (diameter 100 m) might use 4D spacing along-wind (400 m) and 8D cross-wind (800 m), with spacing density ~3–4 MW per km². Offshore farms use tighter spacing (2.5D along, 5D cross) because land cost is not a constraint; the closer spacing increases wake loss but is offset by lower transmission infrastructure cost per unit capacity.

#### Wake Modeling and Farm Efficiency
Wake deficit models predict power loss. The Gaussian wake model assumes wake deficit follows a Gaussian distribution perpendicular to wind direction, recovering with downwind distance according to wake expansion rate (turbulence intensity increases wake expansion and recovery rate). For a turbine in the far wake of an upstream turbine, the velocity deficit at the downstream turbine location is: ΔV = V₀ × (D/d)² × f(x), where D is rotor diameter, d is wake width at distance x, and f(x) accounts for Gaussian profile. Multiple wakes (from multiple upstream turbines) are combined using superposition of kinetic energy deficits (quadratic superposition).

**Example:** A wind farm with 8×8 grid of 2.5 MW turbines (spacing 4D along, 8D cross) in uniform 10 m/s wind. Each turbine at 10 m/s produces ~0.9 MW (40 MW per row, 8 rows). Without wakes: 64 turbines × 0.9 = 57.6 MW. With wakes (farm efficiency ~0.85): 57.6 × 0.85 = 49 MW. Wake loss = 8.6 MW (~15% of total).

#### Active Farm Control and Yaw Steering
Recent research demonstrates that wake effects can be reduced via active control: yawing upstream turbines to deflect wakes laterally, reducing impact on downwind turbines. By reducing the yaw angle (misaligning the rotor with wind), the wake is deflected 5–10 rotor diameters lateral; a downwind turbine gains wind speed at slight cost to the yawed upstream turbine. Optimal control balances farm power: reduce power of a well-positioned upstream turbine (< 5% loss) to increase power of two downwind turbines (> 10% gain each), net benefit +15–20% in the wake zone. Field tests (DTU 10 MW in Denmark, Scaled Wind Farm Technology in Lubbock, Texas) demonstrate 5–10% farm efficiency improvement. Implementation requires: (1) farm-level control algorithm; (2) rapid yaw actuation (motor-driven rotation); (3) real-time wind field estimation (lidar measurement of incoming turbulence).

#### Review Questions
1. Calculate the wake velocity deficit at 2 and 5 rotor diameters downwind of a turbine, using the approximation Δv/v₀ = (D/(2x))², and estimate the power loss for a downwind turbine.
2. Design a wind farm layout for a 100 MW installation (2.5 MW turbines, 100 m rotor diameter) on a square 1 km × 1 km site, with prevailing wind direction assumed North-South. Specify turbine spacing and estimate farm efficiency.
3. Explain how yaw steering reduces wake impact on downwind turbines, and estimate the farm efficiency improvement from active yaw control (5% upstream loss, 15% downwind gain).

---
