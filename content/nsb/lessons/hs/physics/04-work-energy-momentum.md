# HS Physics — Work, Energy & Momentum
*High School Science Bowl prep · 40 lesson drafts across 5 subtopics*

---

## Subtopic: Work, Power & the Work-Energy Theorem

### What Is Work in Physics?
**Type:** Core Understanding
**Slug:** work-definition-physics
**Estimated time:** 12 min
**Key concepts:** work · force · displacement · angle
**Summary:** Work is the energy transferred by a force through a displacement; it equals F·d·cosθ and can be positive, negative, or zero.

#### The Physics Definition of Work
**W = F·d·cosθ** — work done by a force F over displacement d, where θ is the angle between the force and displacement vectors. Work is a *scalar* (not a vector), measured in Joules (J = N·m). Three key cases: (1) force parallel to displacement (θ = 0°) → W = Fd (maximum positive work); (2) force perpendicular to displacement (θ = 90°) → W = 0 (no work done); (3) force antiparallel to displacement (θ = 180°) → W = −Fd (negative work).

#### When No Work Is Done
A centripetal force (like in circular motion) does zero work because it always points perpendicular to velocity (displacement). Carrying a heavy box horizontally does zero work in the vertical direction — the normal force of the box on your hands is vertical, displacement is horizontal → cosθ = 0 → W = 0 (though your muscles do internal work). A wall exerts a normal force on a leaning object but does zero work (no displacement of wall).

#### Positive and Negative Work
Positive work: force has a component in the direction of motion (speeds the object up or transfers energy in). Negative work: force has a component opposing motion (friction does negative work, slowing the object, removing energy from it). Net work = total work done by all forces = sum of individual works.

#### Work on a Graph
For a constant force: W = area under F vs. d graph (a rectangle). For a variable force (like a spring): W = area under F vs. x curve (a triangle for a spring: W = ½kx²). This is why elastic PE = ½kx².

#### Review Questions
1. A 50 N force is applied at 30° to the horizontal to push a box 4 m along a level floor. How much work does the applied force do?
2. A 30 N normal force acts on a box sliding horizontally. How much work does the normal force do? Explain.
3. A string pulls a 2 kg ball in a horizontal circle at constant speed. How much work does the string tension do per revolution?

---

### Power: Rate of Energy Transfer
**Type:** Core Understanding
**Slug:** power-rate-energy-transfer
**Estimated time:** 11 min
**Key concepts:** power · watt · work per time · P = Fv
**Summary:** Power is the rate of doing work or transferring energy, measured in watts; it relates to force and velocity by P = Fv.

#### Power Defined
**P = W/t = ΔE/t**. Power measures how *quickly* work is done. Same work done in half the time requires double the power. Units: 1 Watt = 1 J/s = 1 N·m/s. Also: 1 horsepower = 746 W (useful to know for context). An alternative form: **P = Fv** — power equals force times velocity (for a constant force in the direction of motion). This form is used when time is not given.

#### P = Fv Applications
A car engine exerts 4000 N of driving force at 20 m/s → P = 4000 × 20 = 80,000 W = 80 kW. This is why cars require more power to maintain high speeds (greater air resistance) and why low gears (more force) are used for climbing.

#### Efficiency
Efficiency = useful power output / total power input × 100%. An engine that converts 60 kJ of fuel energy per second into 42 kJ of useful mechanical energy: efficiency = 42/60 × 100% = 70%. The rest (18 kJ) becomes heat.

#### Review Questions
1. A motor does 12,000 J of work in 40 seconds. What is its power output?
2. A 70 kg person runs up stairs (height 3 m) in 5 seconds. Calculate the person's power output.
3. A car moves at 30 m/s with an engine force of 3000 N. What is the engine's power output in watts and kilowatts?

---

### The Work-Energy Theorem
**Type:** Core Understanding
**Slug:** work-energy-theorem
**Estimated time:** 13 min
**Key concepts:** work-energy theorem · net work · kinetic energy change
**Summary:** The work-energy theorem states that the net work done on an object equals the change in its kinetic energy: W_net = ΔKE.

#### The Theorem
**W_net = ΔKE = KE_final − KE_initial = ½mv_f² − ½mv_i²**. This follows directly from Newton's Second Law: F = ma → F = m(Δv/Δt) → FΔx = m·v·Δv → W = ΔKE. The theorem links force and displacement (work) to speed change (kinetic energy). It works for any net force — no need to separate individual forces.

#### Using the Theorem
Given: a 2 kg box starts from rest, pushed by net force 10 N over 5 m. Find final speed. W_net = FΔx = 10 × 5 = 50 J. W_net = ΔKE → 50 = ½(2)v² − 0 → v² = 50 → v = 7.07 m/s.

#### When Negative Work Applies
Friction does negative work. A 3 kg box slides 4 m with initial speed 6 m/s. Friction force = 9 N. W_net = W_friction = −9 × 4 = −36 J. ΔKE = −36 → ½(3)v_f² − ½(3)(36) = −36 → 1.5v_f² = 54 − 36 = 18 → v_f² = 12 → v_f = 3.46 m/s.

#### Relationship to Energy Conservation
Work-energy theorem handles systems with non-conservative forces (friction). Energy conservation (PE + KE = constant) is the special case when no non-conservative forces do work. Both stem from the same physics; use work-energy when friction or other dissipative forces are present.

#### Review Questions
1. A net force of 20 N acts on a 4 kg object over 8 m (starting from rest). Find the final speed using the work-energy theorem.
2. A 1000 kg car moving at 25 m/s applies brakes and stops in 50 m. What is the average braking force?
3. Explain why a centripetal force does not change an object's speed, using the work-energy theorem.

---

### Work-Energy Applications: Ramps, Pulleys, and Friction
**Type:** Application
**Slug:** work-energy-applications-ramps
**Estimated time:** 14 min
**Key concepts:** work-energy theorem · friction work · ramp geometry
**Summary:** Apply the work-energy theorem to find speeds, forces, or distances in complex systems involving inclines and friction.

#### Problem 1: Block Down a Ramp
A 5 kg block starts from rest and slides 3 m down a 30° frictionless incline. Find its speed at the bottom.
- Work by gravity: W_grav = mgd·sinθ = 5(9.8)(3)(0.5) = 73.5 J
- Work by normal force: 0 (perpendicular to motion)
- W_net = 73.5 J = ΔKE = ½(5)v² → v² = 29.4 → v = 5.42 m/s

#### Problem 2: With Friction
Same setup but μk = 0.2. N = mg·cosθ = 5(9.8)(0.866) = 42.4 N. fk = 0.2(42.4) = 8.48 N.
- W_grav = 73.5 J; W_friction = −8.48 × 3 = −25.4 J
- W_net = 73.5 − 25.4 = 48.1 J = ½(5)v² → v² = 19.2 → v = 4.39 m/s

#### Problem 3: Atwood Machine via Energy
Atwood machine: m₁ = 4 kg, m₂ = 6 kg. They start from rest. Find speed after m₂ drops 0.5 m.
- W_net = W_grav,1 + W_grav,2 = −m₁gh + m₂gh = (m₂−m₁)gh = 2(9.8)(0.5) = 9.8 J
- Both masses have same speed: W_net = ½(m₁+m₂)v² → 9.8 = ½(10)v² → v = 1.4 m/s

#### Review Questions
1. A 2 kg block slides 5 m down a 37° ramp (μk = 0.3). Find its final speed from rest.
2. A 1200 kg car coasts down a 5° hill for 200 m (μk = 0.04 between tires and road). Starting at 10 m/s, find its final speed.
3. Using energy methods, find the speed of the lighter mass in an Atwood machine (m₁ = 3 kg, m₂ = 5 kg) after 0.8 m of descent.

---

### Power and Work-Energy Competition Prep
**Type:** Competition Extension
**Slug:** power-work-energy-competition
**Estimated time:** 7 min
**Key concepts:** W = Fd cosθ · P = W/t = Fv · W_net = ΔKE
**Summary:** Formula recall and bowl toss-up patterns for work, power, and the work-energy theorem.

#### Quick Reference
- W = Fd cosθ (J); P = W/t (W); P = Fv
- KE = ½mv²; W_net = ΔKE
- 1 hp = 746 W; 1 J = 1 N·m = 1 kg·m²/s²
- Work done against gravity = mgh (= gravitational PE gain)
- Friction work = −fk × d (always negative; removes energy)

#### Bowl Toss-Up Patterns
- "For 10 points, what theorem states that the net work done on an object equals the change in its kinetic energy?"
- "For 10 points, measured in watts, what is the rate at which work is done?"
- "For 10 points, a 2 kg object moving at 6 m/s — what is its kinetic energy?"

#### Review Questions
1. A 3 kW motor lifts a 200 kg crate. How fast can it lift the crate at constant speed?
2. A 5 kg ball moving at 10 m/s has what kinetic energy?
3. State the work-energy theorem in equation form.

---

## Subtopic: Kinetic & Potential Energy

### Kinetic Energy
**Type:** Core Understanding
**Slug:** kinetic-energy-fundamentals
**Estimated time:** 11 min
**Key concepts:** kinetic energy · mass · velocity squared
**Summary:** Kinetic energy is the energy of motion: KE = ½mv², proportional to mass and the square of velocity.

#### KE = ½mv²
Kinetic energy depends on *mass* and the *square* of speed. Doubling mass doubles KE; doubling speed quadruples KE. Units: joules. A 1 kg object at 1 m/s has KE = 0.5 J. A 2000 kg car at 30 m/s has KE = ½(2000)(900) = 900,000 J = 900 kJ.

#### Speed Doubles → KE Quadruples
This quadratic relationship has profound safety implications. A car at 60 mph has 4× the KE of a car at 30 mph. Braking force must do 4× as much work → stopping distance is 4×. This is why highway speed limits have dramatic safety effects.

#### Rotational KE
For a rotating object: KE_rot = ½Iω². Combined translational + rotational: KE_total = ½mv² + ½Iω². A rolling ball has more total KE than a sliding ball at the same translational speed because it also has rotational KE.

#### Review Questions
1. Calculate the KE of a 0.145 kg baseball thrown at 40 m/s (≈ 90 mph).
2. A 1500 kg car doubles its speed from 15 m/s to 30 m/s. By what factor does KE change?
3. What speed must a 0.01 kg bullet have to possess the same KE as a 1500 kg car at 20 m/s?

---

### Gravitational and Elastic Potential Energy
**Type:** Core Understanding
**Slug:** potential-energy-gravitational-elastic
**Estimated time:** 12 min
**Key concepts:** gravitational PE · elastic PE · reference height · stored energy
**Summary:** Potential energy is stored energy — gravitational PE = mgh depends on height, and elastic PE = ½kx² depends on spring compression.

#### Gravitational PE
**PE_grav = mgh** — depends on mass, gravitational field strength (g), and height h above a chosen reference. The reference is arbitrary; only *changes* in PE matter. A 5 kg book on a 2 m shelf: PE = 5(9.8)(2) = 98 J (relative to floor). If the floor is the reference, placing it on the ground means PE = 0 — the 98 J converts to KE as it falls.

#### Elastic PE
**PE_spring = ½kx²** — energy stored in a deformed spring. Always positive (regardless of stretch or compression direction). A spring (k = 200 N/m) compressed 0.1 m: PE = ½(200)(0.01) = 1 J. This energy converts entirely to KE (frictionless) when released.

#### Gravitational PE Near Earth vs. Universal
Near Earth's surface (small height changes), PE_grav = mgh works well. For satellites and planetary orbits, use the universal formula: PE = −GMm/r (negative because bound gravitational systems have negative total energy). The difference matters at large distances from Earth.

#### Review Questions
1. A 3 kg book is lifted from the floor to a shelf 1.5 m high. Calculate the change in gravitational PE.
2. A spring (k = 400 N/m) is stretched 0.06 m. What is the elastic PE stored?
3. A 10 kg block is at rest 4 m above the ground. What is its total mechanical energy (KE + PE) relative to the ground?

---

### Energy Transformations: KE ↔ PE
**Type:** Application
**Slug:** energy-transformations-ke-pe
**Estimated time:** 13 min
**Key concepts:** conservation of mechanical energy · energy transformation · height and speed
**Summary:** On frictionless systems, total mechanical energy (KE + PE) is conserved — energy converts back and forth between forms without loss.

#### Conservation of Mechanical Energy (No Friction)
On a frictionless roller coaster, KE + PE = constant. At the top: mostly PE, little KE. At the bottom: mostly KE, little PE. Mathematically: ½mv₁² + mgh₁ = ½mv₂² + mgh₂. The mass cancels! The speed at any height depends only on the height difference: **v = √(2gΔh)** for an object starting from rest.

#### Roller Coaster Problem
A roller coaster car starts from rest at height 20 m. Find speed at height 5 m (frictionless).
ΔKE = ΔPE: ½mv² = mg(20−5) = mg(15) → v² = 2g(15) = 2(9.8)(15) = 294 → v = 17.1 m/s.

#### Pendulum Problem
A pendulum of length 1.5 m is released from 30° from vertical. Find speed at the bottom.
Height drop: h = L − L·cosθ = 1.5(1 − cos30°) = 1.5(1 − 0.866) = 0.201 m.
v = √(2gh) = √(2 × 9.8 × 0.201) = √3.94 = 1.98 m/s.

#### Review Questions
1. A ball is thrown straight up with initial speed 15 m/s. Using energy conservation, find the maximum height (ignore air resistance).
2. A 2 kg ball slides down a frictionless curved track from height 3 m to height 0.5 m. Find its speed at the lower point.
3. A spring launches a 0.3 kg ball horizontally. The spring (k = 500 N/m) was compressed 0.2 m. Find the ball's launch speed.

---

## Subtopic: Conservation of Energy

### Conservation of Energy: The Full Statement
**Type:** Core Understanding
**Slug:** conservation-energy-full-statement
**Estimated time:** 12 min
**Key concepts:** conservation of energy · internal energy · non-conservative forces
**Summary:** Energy is always conserved; non-conservative forces like friction convert mechanical energy into thermal energy (heat).

#### The Full Energy Conservation Law
Energy cannot be created or destroyed, only converted between forms. **Total energy is always conserved.** In mechanics: E_total = KE + PE + E_thermal + E_other = constant. When friction acts: mechanical energy decreases, but thermal energy increases by the same amount. ΔKE + ΔPE + ΔE_thermal = 0.

#### Friction Converts Energy to Heat
When friction does work on an object: |W_friction| = μk·N·d = thermal energy generated. A 3 kg block slides 5 m with μk = 0.3. Thermal energy = fk × d = 0.3(3)(9.8)(5) = 44.1 J. This energy is "lost" from mechanical energy but appears as heat in the block and surface.

#### Closed vs. Open Systems
In a closed system (no energy enters or leaves), total energy is strictly conserved. For a falling ball in air: KE + PE + ΔE_air = constant. Without air: KE + PE = constant (simpler). Choosing the right system boundary matters for analysis.

#### Power Dissipation by Friction
Power dissipated = fk × v = μk·N·v. A car at 30 m/s with rolling friction coefficient 0.02 on 1500 kg: f = 0.02(1500)(9.8) = 294 N → P = 294 × 30 = 8820 W = 8.82 kW just for rolling resistance.

#### Review Questions
1. A 4 kg block slides down a 2 m ramp (30° incline, μk = 0.25) and reaches the bottom. How much heat is generated by friction?
2. A 1200 kg car moves at 20 m/s and brakes to a stop. How much thermal energy is generated in the brakes?
3. A spring (k = 300 N/m) compressed 0.4 m launches a 0.5 kg block along a surface with μk = 0.2. How far does the block travel before stopping?

---

### Energy Conservation Applied: Complex Problems
**Type:** Application
**Slug:** energy-conservation-complex-problems
**Estimated time:** 15 min
**Key concepts:** energy conservation · system analysis · combining PE KE and friction
**Summary:** Multi-stage energy problems track energy through transformations with both conservative and non-conservative forces.

#### Ski Jump Problem
A 70 kg skier starts from rest at the top of a 30 m hill. At the bottom (h = 0), the slope transitions to a 20 m ramp at 45°. The skier then becomes a projectile. Friction removed 8000 J of energy on the slope. Find launch speed.
- Energy at top: PE = 70(9.8)(30) = 20,580 J; KE = 0
- Energy at bottom: 20,580 − 8000 = 12,580 J = ½(70)v² → v² = 359.4 → v = 19.0 m/s

#### Spring and Loop Problem
A spring (k = 1200 N/m) launches a 0.4 kg ball around a loop-the-loop (radius 0.5 m). Spring compressed 0.3 m. Is there enough energy to complete the loop? Minimum speed at top: v_min = √(gr) = √(9.8 × 0.5) = 2.21 m/s; KE_min = ½(0.4)(2.21²) = 0.979 J. PE_gain = mgh = 0.4(9.8)(2 × 0.5) = 3.92 J. Total energy needed: 0.979 + 3.92 = 4.90 J. Spring PE: ½(1200)(0.09) = 54 J >> 4.90 J. Yes, easily completed.

#### Review Questions
1. A 2 kg ball on a string (length 1.2 m) is released from horizontal. Find the speed at the bottom and the tension in the string at the bottom.
2. A roller coaster car (mass 500 kg) tops a loop (radius 8 m). What minimum height must the starting hill be for the car to maintain contact at the top?
3. A 3 kg block slides from rest down a curved surface from h = 1.5 m, then along a 4 m friction surface (μk = 0.2), then up a frictionless ramp. How high does it go?

---

## Subtopic: Momentum, Impulse & Collisions

### Linear Momentum and Impulse
**Type:** Core Understanding
**Slug:** momentum-impulse-fundamentals
**Estimated time:** 12 min
**Key concepts:** momentum · impulse · Δp = FΔt
**Summary:** Momentum (p = mv) measures mass in motion; impulse (J = FΔt) equals the change in momentum.

#### Momentum Defined
**p = mv** — momentum is mass times velocity (a vector, same direction as velocity). Units: kg·m/s. Momentum depends on both mass and velocity: a slow, heavy truck and a fast, light car might have the same momentum. A system's total momentum = vector sum of individual momenta.

#### Impulse
**J = FΔt = Δp** — impulse is the product of average force and the time interval over which it acts. Impulse equals the change in momentum. This is derived directly from Newton's Second Law: F = ma = m(Δv/Δt) → FΔt = mΔv = Δp. Impulse is also a vector (same direction as F).

#### The Impulse-Momentum Theorem in Practice
Airbags increase the collision time Δt, which reduces the average force F for the same Δp (same change in momentum). F = Δp/Δt — longer time → smaller force → less injury. Similarly, following through in sports (bat stays in contact with ball longer) increases impulse → greater Δp → more speed.

#### Graphical Impulse
Impulse = area under F vs. t graph. Even a varying force can be analyzed: integrate the force-time curve to get total impulse = total Δp.

#### Review Questions
1. A 0.15 kg baseball moving at 40 m/s is hit by a bat and returns at 50 m/s in the opposite direction. Find the impulse exerted by the bat.
2. A 1200 kg car changes velocity from 20 m/s to 0 in 0.8 s. What average force acted on the car?
3. Why does jumping onto a thick foam mat feel less painful than jumping onto concrete, even though the impulse (Δp) is the same?

---

### Conservation of Momentum
**Type:** Core Understanding
**Slug:** conservation-of-momentum
**Estimated time:** 13 min
**Key concepts:** conservation of momentum · isolated system · total momentum
**Summary:** In an isolated system (no external net force), the total momentum is conserved: p_initial = p_final.

#### The Law
If ΣF_external = 0 on a system, then **Δp_total = 0 → p_initial = p_final**. This applies in all directions independently. Even when a collision involves enormous internal forces between objects, those forces are equal and opposite (Third Law) and cancel in the system total. Conservation of momentum is more fundamental than conservation of energy — it holds even when energy is not conserved (inelastic collisions).

#### Applying the Law
Steps: (1) identify the system; (2) verify no external net force (or external impulse negligible); (3) write p_before = p_after as a vector equation; (4) solve for the unknown.

#### Explosion Problems
A stationary 5 kg firecracker explodes into two pieces: 2 kg piece flies left at 6 m/s. Find velocity of 3 kg piece. Before: p = 0. After: 0 = 2(−6) + 3v → 3v = 12 → v = 4 m/s (right). The total momentum is still zero.

#### Recoil
When a 2 kg gun fires a 0.01 kg bullet at 400 m/s, find recoil speed of gun. 0 = 0.01(400) + 2(-v_gun) → v_gun = 2 m/s. Note: the gun-bullet system had zero momentum before (both at rest), and zero after (equal and opposite momenta).

#### Review Questions
1. A 60 kg skater at rest pushes off a 90 kg skater. The 90 kg skater moves at 2 m/s. Find the 60 kg skater's speed.
2. A 5000 kg truck moving at 10 m/s rear-ends a stationary 1000 kg car. After the collision they stick together. Find their common velocity.
3. A 70 kg astronaut floating in space throws a 2 kg wrench at 8 m/s. What happens to the astronaut?

---

### Types of Collisions: Elastic and Inelastic
**Type:** Core Understanding
**Slug:** elastic-inelastic-collisions
**Estimated time:** 14 min
**Key concepts:** elastic collision · inelastic collision · perfectly inelastic · coefficient of restitution
**Summary:** Elastic collisions conserve both KE and momentum; inelastic conserve only momentum; perfectly inelastic objects stick together.

#### Classification
**Perfectly elastic**: KE and momentum both conserved. Objects bounce with no energy loss. Only truly achieved at atomic/subatomic scales (billiard balls are approximately elastic). **Inelastic**: momentum conserved; some KE converted to heat, deformation, sound. Most real collisions. **Perfectly inelastic**: objects stick together after collision — maximum KE loss (some KE always remains unless CM is stationary).

#### Elastic Collision Equations
Two objects, m₁ initial v₁, m₂ at rest. After collision:
- v₁' = (m₁−m₂)/(m₁+m₂) × v₁
- v₂' = 2m₁/(m₁+m₂) × v₁
Special cases: equal masses → v₁' = 0, v₂' = v₁ (complete transfer). Very heavy hitting very light: light rebounds at ~2v₁. Very light hitting very heavy: light rebounds at ~−v₁.

#### Perfectly Inelastic Worked Example
A 3 kg ball at 8 m/s collides with and sticks to a 5 kg ball at rest. Find final velocity.
p_before = 3(8) = 24 kg·m/s. p_after = (3+5)v → 8v = 24 → v = 3 m/s.
KE_before = ½(3)(64) = 96 J. KE_after = ½(8)(9) = 36 J. Energy lost = 60 J (became heat and deformation).

#### Review Questions
1. A 2 kg ball moving at 5 m/s collides elastically with an identical 2 kg ball at rest. Describe the outcome.
2. A 4 kg object at 6 m/s collides perfectly inelastically with a 2 kg object at rest. Find final velocity and KE lost.
3. Why is it impossible for a perfectly inelastic collision to conserve kinetic energy (unless the objects were initially at the same velocity)?

---

### Collision Problems: Application
**Type:** Application
**Slug:** collision-problems-application
**Estimated time:** 14 min
**Key concepts:** conservation of momentum · ballistic pendulum · 2D collisions
**Summary:** Apply collision conservation laws to realistic scenarios including 2D collisions and ballistic pendulum measurements.

#### Ballistic Pendulum
A 0.01 kg bullet moving at v₀ embeds in a 1.99 kg block, which swings up height h = 0.2 m. Find v₀.
Step 1 (collision): m₁v₀ = (m₁+m₂)v → 0.01·v₀ = 2.00·v → v = 0.005v₀
Step 2 (energy conservation in swing): ½(2)v² = 2(9.8)(0.2) → v² = 3.92 → v = 1.98 m/s
Step 3: v₀ = v/0.005 = 396 m/s.

#### 2D Collision
A 2 kg ball moving east at 6 m/s collides with a 3 kg ball moving north at 4 m/s. They stick together. Find final velocity.
x: p_x = 2(6) = 12 kg·m/s; y: p_y = 3(4) = 12 kg·m/s.
Final: v_x = 12/5 = 2.4 m/s east; v_y = 12/5 = 2.4 m/s north.
Speed = √(2.4² + 2.4²) = 2.4√2 = 3.39 m/s at 45° NE.

#### Review Questions
1. A 0.02 kg bullet at 300 m/s embeds in a 2.98 kg block on a frictionless surface. Find the block's velocity.
2. A 1500 kg car moving east at 15 m/s collides with a 1000 kg car moving north at 20 m/s (perfectly inelastic). Find the final speed and direction.
3. In a pool break shot, the cue ball (0.17 kg) moving at 3 m/s strikes the 8-ball (0.17 kg) at rest. After the collision, the 8-ball moves at 2.5 m/s in the original direction. Find the cue ball's velocity and classify the collision.

---

## Subtopic: Center of Mass

### Center of Mass: Definition and Location
**Type:** Core Understanding
**Slug:** center-of-mass-definition
**Estimated time:** 11 min
**Key concepts:** center of mass · weighted average · system of particles
**Summary:** The center of mass is the weighted average position of a system's mass; it moves as if all the mass were concentrated there.

#### Definition
For a system of particles: **x_cm = Σ(mᵢxᵢ)/Σmᵢ** and similarly for y_cm and z_cm. For two objects: x_cm = (m₁x₁ + m₂x₂)/(m₁+m₂). The center of mass (CM) is the point where the system's total mass can be treated as concentrated for translational purposes. External forces act as if applied at the CM.

#### Example: Two Masses
A 3 kg mass at x = 1 m and a 7 kg mass at x = 5 m. x_cm = (3×1 + 7×5)/(3+7) = (3+35)/10 = 38/10 = 3.8 m — closer to the heavier mass.

#### Newton's Second Law for a System
ΣF_external = M_total × a_cm. The center of mass accelerates as if it were a single particle of total mass M subject to all external forces. Internal forces (Third Law pairs) cancel and don't affect CM motion.

#### CM and Explosions
When a firecracker explodes in mid-air (ignoring gravity for an instant), the CM continues along the original trajectory — because the explosion forces are internal. Gravity acts on CM as a whole.

#### Review Questions
1. Two masses: 4 kg at x = 0 and 6 kg at x = 10 m. Find the center of mass location.
2. A 60 kg person stands at one end of a 3 m, 20 kg plank on frictionless ice. Where is the CM of the system?
3. If an astronaut inside a floating spacecraft moves toward the front, what happens to the CM of the spacecraft-astronaut system?

---

### Center of Mass: Competition Prep
**Type:** Competition Extension
**Slug:** center-of-mass-competition
**Estimated time:** 6 min
**Key concepts:** CM formula · CM motion · internal forces
**Summary:** Bowl-ready center of mass facts, formulas, and toss-up patterns.

#### High-Yield Facts
- x_cm = Σmᵢxᵢ / Σmᵢ
- External forces → CM accelerates (ΣF = Ma_cm)
- Internal forces do NOT move the CM
- In an explosion, CM continues along original path
- For a uniform object, CM is at geometric center

#### Toss-Up Stems
- "For 10 points, what point of a system moves as though all the system's mass were concentrated there?"
- "For 10 points, give the formula for the x-coordinate of the center of mass of a two-body system."

#### Review Questions
1. Three masses: 1 kg at x=0, 2 kg at x=3 m, 3 kg at x=6 m. Find x_cm.
2. In an elastic collision between equal masses where one is initially at rest, describe what happens to the CM velocity.
3. A 5 kg object at rest explodes into a 2 kg piece moving east at 10 m/s and a 3 kg piece. Find the 3 kg piece's velocity.
