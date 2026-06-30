---
id: nsb-lesson-1584
title: "Fluid Dynamics and Bernoulli's Equation"
level: hs
subject: physics
topic: fluids
subtopic: "Fluid Dynamics and Bernoulli's Equation"
slug: fluid-dynamics-bernoulli
type: "Application"
estimatedMinutes: 13
keyConcepts: ["continuity equation", "Bernoulli's equation", "flow speed and pressure"]
summary: "Relate fluid speed, pressure, and height using the continuity equation and Bernoulli's equation."
---
#### Ideal Fluid Assumptions

Fluid dynamics is simplified by treating fluids as **ideal**: incompressible (constant density), non-viscous (no internal friction), and in steady **laminar flow** (streamlines do not cross). Real fluids deviate from these assumptions — viscosity causes energy loss, and high speeds produce **turbulent flow** — but ideal-fluid models give accurate results in many engineering and competition contexts.

#### The Continuity Equation

For an incompressible fluid flowing through a pipe of varying cross-section, conservation of mass requires that the volume flow rate Q = A·v remains constant along the pipe. This gives the **continuity equation**: **A1·v1 = A2·v2**, where A is the cross-sectional area and v is the fluid speed at each point. A narrowing pipe (A2 < A1) must carry fluid faster (v2 > v1); a widening pipe slows the flow. This is why water speeds up through a nozzle and why rivers run faster through narrow gorges.

#### Bernoulli's Equation

**Bernoulli's equation** is the energy-conservation statement for an ideal fluid along a streamline: **P + (1/2)·rho·v² + rho·g·h = constant**. Here P is the local fluid pressure, (1/2)·rho·v² is the kinetic energy per unit volume, and rho·g·h is the gravitational potential energy per unit volume. The sum is the same at any two points along a streamline: **P1 + (1/2)·rho·v1² + rho·g·h1 = P2 + (1/2)·rho·v2² + rho·g·h2**.

#### Consequences: Speed Increases, Pressure Drops

A key result of Bernoulli's equation at constant height (h1 = h2) is **P1 + (1/2)·rho·v1² = P2 + (1/2)·rho·v2²**: where speed is high, pressure is low, and vice versa. This explains the **Venturi effect** (pressure drop in a constriction), **airfoil lift** (faster airflow over the curved top surface lowers pressure relative to the bottom), and the curve of a spinning baseball. A **Pitot tube** exploits Bernoulli's equation to measure airspeed by comparing static and stagnation pressure.

#### Torricelli's Theorem

For a large open tank with a small hole at depth h below the surface, Bernoulli's equation (with v_top ≈ 0 and both surfaces at atmospheric pressure) gives the exit speed **v = sqrt(2·g·h)** — identical to the speed an object acquires falling freely through height h. This result, called **Torricelli's theorem**, underlies the design of orifice flow meters and dam spillways.

#### Review Questions
1. Water flows through a pipe that narrows from a cross-sectional area of 0.04 m² to 0.01 m². If the speed in the wide section is 2 m/s, what is the speed in the narrow section?
2. In a horizontal pipe, water (rho = 1000 kg/m³) moves at 3 m/s where the pressure is 2 × 10⁵ Pa, then speeds up to 6 m/s in a constriction. What is the pressure in the constriction?
3. A large water tank has a small hole 5 m below the water surface. Using Torricelli's theorem, what is the speed of water exiting the hole? (g = 9.8 m/s²)

---
