# HS Physics — Rotational Motion & Gravitation
*High School Science Bowl prep · 40 lesson drafts across 5 subtopics*

---

## Subtopic: Torque & Rotational Equilibrium

### Understanding Torque
**Type:** Core Understanding
**Slug:** understanding-torque
**Estimated time:** 12 min
**Key concepts:** torque · moment arm · rotational force · lever
**Summary:** Torque is the rotational equivalent of force—it depends on both the force applied and its distance from the axis of rotation.

#### What Is Torque?
Torque (τ) measures the tendency of a force to rotate an object about a pivot point. Unlike linear force, which produces linear motion, torque produces rotational motion. Torque is defined as τ = rF sinθ, where r is the distance from the axis of rotation (the lever arm), F is the applied force, and θ is the angle between the force vector and the lever arm. When force is perpendicular to the lever arm (θ = 90°), sin θ = 1, and torque is maximized at τ = rF. The SI unit for torque is the newton-meter (N·m).

#### The Lever Arm Concept
The lever arm is the perpendicular distance from the axis of rotation to the line of action of the force. A longer lever arm means more torque for the same force—this is why we use long wrenches to loosen tight bolts and why opening a door is easier when we push near the handle (far from the hinge) rather than near the hinge itself. Even a small force applied far from the pivot can produce the same torque as a large force applied close to the pivot.

#### Calculating Torque
To calculate torque, first identify the axis of rotation, then find the perpendicular distance (r) from that axis to where the force is applied. Multiply by the magnitude of the force (F) and by sin θ (the sine of the angle between F and the lever arm). For maximum torque, apply force perpendicular to the lever arm. If a force is applied parallel to the lever arm (θ = 0°), no torque is produced because sin(0°) = 0.

#### Sign Convention
Torque can be positive or negative depending on the direction of rotation. By convention, counterclockwise torque is often considered positive, and clockwise torque is negative. This sign convention is arbitrary and can be reversed; the important thing is consistency within a problem.

#### Review Questions
1. Why is it easier to open a door by pushing on the handle than pushing near the hinge?
2. If a force of 50 N is applied perpendicular to a 0.4 m lever arm, what is the torque?
3. A force of 30 N is applied at a 30° angle to a 2 m lever arm. Calculate the torque.

---

### Rotational Equilibrium & Stability
**Type:** Core Understanding
**Slug:** rotational-equilibrium-stability
**Estimated time:** 13 min
**Key concepts:** rotational equilibrium · net torque · static equilibrium · moment of force
**Summary:** An object is in rotational equilibrium when the net torque acting on it is zero, meaning it won't start spinning or will continue at constant rotational velocity.

#### Definition of Rotational Equilibrium
Rotational equilibrium occurs when the sum of all torques acting on an object equals zero: Στ = 0. This is the rotational analog of force equilibrium (ΣF = 0). An object in rotational equilibrium will not begin to rotate, and if it is already rotating at constant angular velocity, it will continue at that rate. Rotational equilibrium is essential for the stability of structures like bridges, buildings, and mechanical systems.

#### Conditions for Static Equilibrium
For an object to be in complete static equilibrium (not moving and not rotating), two conditions must be met: (1) the net force must be zero (ΣF = 0), and (2) the net torque must be zero (Στ = 0). Both conditions are necessary. An object could have zero net force but non-zero net torque (and thus would rotate), or it could have zero net torque but non-zero net force (and thus would accelerate linearly).

#### Torque Addition & Subtraction
When multiple torques act on an object, we add them algebraically, taking direction into account. Counterclockwise torques are typically positive, and clockwise torques are negative (or vice versa). The object will rotate if the net torque is non-zero. For equilibrium, clockwise and counterclockwise torques must balance exactly.

#### Applications: Seesaws & Lever Systems
A seesaw demonstrates rotational equilibrium. If two children of different masses sit at different distances from the fulcrum (pivot), they will balance when τ₁ = τ₂, or m₁g·r₁ = m₂g·r₂. A heavier child must sit closer to the fulcrum to balance a lighter child sitting farther away. This principle applies to all lever systems: crowbars, wheelbarrows, pliers, and other tools achieve mechanical advantage by manipulating torque.

#### Review Questions
1. What are the two conditions for an object to be in static equilibrium?
2. A 60 kg child sits 1.5 m from the fulcrum of a seesaw. Where should a 40 kg child sit to balance?
3. Why can a small force produce large rotational effect if applied far from the axis of rotation?

---

### Moment of Inertia & Rotational Dynamics
**Type:** Core Understanding
**Slug:** moment-of-inertia-basics
**Estimated time:** 14 min
**Key concepts:** moment of inertia · rotational mass · parallel axis theorem · resistance to rotation
**Summary:** Moment of inertia (I) is the rotational equivalent of mass—it measures how resistance an object is to changes in its rotational motion.

#### Defining Moment of Inertia
Moment of inertia (I) is the sum of the masses of each particle in an object multiplied by the square of that particle's distance from the axis of rotation: I = Σ m·r². For a point mass m at distance r from the axis, I = m·r². The farther the mass is from the axis, the greater the moment of inertia. The SI unit for moment of inertia is kg·m².

#### Common Moments of Inertia
Different shapes have different moments of inertia (about their centers): a uniform solid sphere has I = (2/5)mr²; a uniform solid cylinder or disk has I = (1/2)mr²; a thin spherical shell has I = (2/3)mr²; and a thin rod (about its center) has I = (1/12)mL². These formulas assume rotation about the center of mass and are provided in most physics references.

#### Rotational Kinetic Energy
Just as moving objects have kinetic energy KE = (1/2)mv², rotating objects have rotational kinetic energy: KEᵣₒₜ = (1/2)Iω², where ω is the angular velocity. An object with high moment of inertia is harder to spin up and harder to slow down—it requires more torque and takes longer to reach a given angular velocity.

#### The Parallel Axis Theorem
If we know the moment of inertia about an object's center of mass (Iₒₘ), we can find the moment of inertia about any parallel axis using the parallel axis theorem: I = Iₒₘ + Md², where M is the total mass and d is the distance between the two axes. This is useful for calculating moments of inertia about axes that don't pass through the center of mass.

#### Review Questions
1. Which has a larger moment of inertia: a sphere or a thin ring, both with the same mass and radius?
2. How does moment of inertia relate to the difficulty of spinning an object?
3. A solid cylinder of mass 5 kg and radius 0.2 m rotates about its central axis. What is its moment of inertia?

---

### Angular Momentum & Rotational Dynamics
**Type:** Core Understanding
**Slug:** angular-momentum-dynamics
**Estimated time:** 13 min
**Key concepts:** angular momentum · L = Iω · conservation of angular momentum · rotational Newton's second law
**Summary:** Angular momentum is the rotational analog of linear momentum—it is conserved when no external torque acts on a system.

#### Definition of Angular Momentum
Angular momentum (L) is defined as L = Iω, where I is the moment of inertia and ω is the angular velocity. For a point mass, L = mrv, where r is the distance from the axis and v is the linear velocity. Angular momentum is a vector quantity; its direction is given by the right-hand rule: curl your fingers in the direction of rotation, and your thumb points in the direction of L.

#### Rotational Newton's Second Law
Just as linear force produces linear acceleration (F = ma), torque produces angular acceleration: τ = Iα, where α is the angular acceleration. This is Newton's second law in rotational form. Rearranging, α = τ/I—a given torque produces less angular acceleration for objects with larger moment of inertia.

#### Conservation of Angular Momentum
If the net torque on a system is zero, angular momentum is conserved: L_initial = L_final. This is why figure skaters spin faster when they pull their arms in (decreasing I increases ω), and why a spinning bike wheel resists tilting. If no external torque acts, the total angular momentum of a system cannot change.

#### Applications: Spinning & Collisions
Angular momentum conservation explains many phenomena: a cat righting itself in a fall, a diver controlling rotation during a somersault, and the behavior of planets in orbits. When two objects collide and stick together in a rotational scenario, angular momentum is conserved even though kinetic energy is lost (an inelastic collision).

#### Review Questions
1. What is the angular momentum of a 0.5 kg disk with radius 0.3 m spinning at 20 rad/s?
2. Why does a figure skater spin faster when pulling arms inward?
3. If a torque of 10 N·m is applied to a disk with moment of inertia 2 kg·m², what is the angular acceleration?

---

### Universal Gravitation & Orbital Motion

**Type:** Application
**Slug:** universal-gravitation-orbital
**Estimated time:** 15 min
**Key concepts:** gravitational force · inverse square law · orbital velocity · gravitational potential energy
**Summary:** Newton's law of universal gravitation describes the attractive force between all masses; this force provides the centripetal acceleration for orbiting objects.

#### Newton's Law of Universal Gravitation
Every mass in the universe attracts every other mass with a force given by F = G(m₁m₂)/r², where G is the gravitational constant (6.67 × 10⁻¹¹ N·m²/kg²), m₁ and m₂ are the masses, and r is the distance between their centers. This force is the same on both objects (Newton's third law) but acts in opposite directions. The force decreases with the square of the distance—doubling the distance reduces the force to one-quarter.

#### Orbital Velocity & Circular Orbits
For an object in circular orbit, gravitational force provides the centripetal force: F_grav = F_centripetal, or G(Mm)/r² = mv²/r, where M is the central mass and m is the orbiting mass. Solving for v gives v = √(GM/r). The orbital velocity depends on the central mass and orbital radius but is independent of the orbiting object's mass. Closer orbits require higher velocities.

#### Gravitational Potential Energy
Gravitational potential energy is U = -G(Mm)/r, where the negative sign indicates that gravity is attractive. As an object falls toward a massive body, its potential energy decreases and its kinetic energy increases (total mechanical energy is conserved). At large distances (r → ∞), U → 0. The total mechanical energy of a bound orbit is negative: E = -(GMm)/(2r).

#### Escape Velocity
The escape velocity is the minimum velocity needed for an object to escape a massive body's gravitational influence. From energy conservation, (1/2)mv_escape² = GMm/r, giving v_escape = √(2GM/r). Notably, escape velocity depends on the mass and radius of the body but not on the escaping object's mass. For Earth, v_escape ≈ 11.2 km/s.

#### Review Questions
1. Calculate the gravitational force between two 1000 kg masses separated by 10 m.
2. What is the orbital velocity of a satellite 400 km above Earth's surface (Earth's radius ≈ 6.37 × 10⁶ m, M_Earth ≈ 5.97 × 10²⁴ kg)?
3. How does orbital velocity change if orbital radius doubles?

---

### Kepler's Laws of Planetary Motion
**Type:** Mixed/Review
**Slug:** keplers-laws-planetary
**Estimated time:** 11 min
**Key concepts:** Kepler's first law · Kepler's second law · Kepler's third law · elliptical orbits
**Summary:** Kepler's three laws describe planetary orbits: they are elliptical, planets sweep equal areas in equal times, and orbital period squares relate to orbital radius cubes.

#### Kepler's First Law: Elliptical Orbits
Kepler's first law states that planets orbit the Sun in elliptical paths with the Sun at one focus. This means planetary orbits are not perfect circles; they have varying distances from the Sun. The closest point to the Sun is called perihelion, and the farthest point is called aphelion. For Earth, the difference between aphelion and perihelion distance is about 3%, so Earth's orbit is nearly circular, but many comets and asteroids have highly eccentric (elongated) orbits.

#### Kepler's Second Law: Equal Areas
Kepler's second law (the equal-area law or law of areas) states that a planet sweeps out equal areas of the elliptical orbit in equal times. This means planets move faster when they are closer to the Sun (at perihelion) and slower when they are farther away (at aphelion). This law is equivalent to conservation of angular momentum: the product of orbital speed and distance from the Sun remains constant.

#### Kepler's Third Law: Period-Radius Relation
Kepler's third law states that the square of a planet's orbital period is proportional to the cube of its orbital radius: T² ∝ r³, or T² = (4π²/GM)r³. For planets orbiting the Sun, this can be written as T² = k·r³, where k is a constant. This law allows us to calculate orbital periods if we know orbital radii, or vice versa. It applies to all orbits around a given central mass (planets around the Sun, moons around planets, etc.).

#### Deriving Kepler's Third Law
Kepler's third law can be derived from Newton's laws. For circular orbits, gravitational force equals centripetal force: GM m/r² = m v²/r. Substituting v = 2πr/T gives GM/r² = (4π²r/T²), which rearranges to T² = (4π²/GM)r³. This derivation shows that Kepler's empirical laws are consequences of Newton's theory.

#### Review Questions
1. If Mars has an orbital radius about 1.52 times Earth's radius, what is the ratio of Mars's orbital period to Earth's?
2. Why do planets move faster at perihelion than at aphelion?
3. Apply Kepler's third law: if a satellite orbits at radius 2r, how does its period compare to a satellite at radius r?

---

### Gravitational Fields & Potential
**Type:** Mixed/Review
**Slug:** gravitational-fields-potential
**Estimated time:** 12 min
**Key concepts:** gravitational field · field strength · gravitational potential · tidal forces
**Summary:** A gravitational field is the region around a mass where gravitational force is experienced; it allows us to describe gravity independently of the test mass.

#### Concept of Gravitational Field
A gravitational field is a property of space around a mass that describes the gravitational effect that mass has on other objects. The gravitational field strength (or field intensity) g at a distance r from a mass M is defined as g = GM/r², which equals the gravitational force per unit mass: g = F/m. Near Earth's surface, g ≈ 9.8 m/s². The field strength is independent of the test mass—it depends only on the source mass and distance.

#### Gravitational Potential
Gravitational potential (φ) is the gravitational potential energy per unit mass: φ = U/m = -GM/r. It has units of J/kg. Unlike gravitational field strength (which is a vector), gravitational potential is a scalar. Gravitational potential energy of a test mass m in a field is U = m·φ. The potential at distance r from a point mass depends only on the source mass and distance, not on the test mass.

#### Equipotential Surfaces
Equipotential surfaces are surfaces where the gravitational potential is constant. Around a spherically symmetric mass, equipotential surfaces are concentric spheres. No work is done moving an object along an equipotential surface (perpendicular to the gravitational field). The gravitational field lines are perpendicular to equipotential surfaces.

#### Tidal Forces
Tidal forces arise because the gravitational field is stronger on the near side of an extended object than on the far side. For example, the Moon's gravity pulls more strongly on Earth's near side than on its far side, creating tidal bulges. The tidal force is proportional to the difference in gravitational force across the object's extent. Extremely strong gravitational fields near black holes can produce destructive tidal forces ("spaghettification").

#### Review Questions
1. What is the gravitational field strength at Earth's surface?
2. How does gravitational potential change with distance from a point mass?
3. Why does the Moon create tides on Earth?

---

### Orbits in Gravitational Fields
**Type:** Competition Extension
**Slug:** orbits-gravitational-fields
**Estimated time:** 10 min
**Key concepts:** circular vs elliptical orbits · orbital decay · capture · escape trajectories
**Summary:** Objects in gravitational fields follow different orbital paths depending on their energy: circular, elliptical, parabolic (escape), or hyperbolic trajectories.

#### Types of Orbits
The shape of an orbit depends on the total mechanical energy of the orbiting object: (1) Circular orbit: E = -(GMm)/(2r), the object is bound and moves in a perfect circle; (2) Elliptical orbit: E = -(GMm)/(2a), where a is the semi-major axis—most planets and satellites have elliptical orbits; (3) Parabolic trajectory: E = 0, the object just barely escapes to infinity; (4) Hyperbolic trajectory: E > 0, the object falls in, reaches a minimum distance, and escapes back to infinity.

#### Satellite Launch Scenarios
To place a satellite in low Earth orbit (LEO), a rocket must reach orbital velocity at the desired altitude. To escape Earth entirely, the rocket must achieve escape velocity. Many satellites are launched into elliptical transfer orbits (Hohmann transfers) to efficiently reach higher altitudes. To de-orbit (bring a satellite down), thruster burns reduce its velocity so its orbit intersects the atmosphere.

#### Binary Stars & Mass Transfer
In binary star systems, both stars orbit their common center of mass. If one star expands (becoming a red giant), its outer layers may be pulled toward the companion—a process called Roche lobe overflow. Material streams from one star to the other, forming an accretion disk. This process powers some of the brightest objects in the universe (X-ray binaries).

#### Encounter Problems
When a spacecraft makes a "gravity assist" flyby of a planet, it exchanges energy with the planet. The spacecraft's velocity changes in a hyperbolic trajectory around the planet. By carefully choosing the flyby parameters, spacecraft can gain or lose energy and change trajectory—a technique used extensively in interplanetary missions (e.g., Voyager, Cassini).

#### Review Questions
1. For 10 points: What is the minimum velocity needed for an object to escape Earth's gravity?
2. A comet approaches Earth on a parabolic trajectory. What is its total mechanical energy?
3. Describe a Hohmann transfer orbit for moving from LEO to geostationary orbit.

---

## Subtopic: Rotational Kinematics & Dynamics

### Angular Velocity & Acceleration
**Type:** Core Understanding
**Slug:** angular-velocity-acceleration
**Estimated time:** 12 min
**Key concepts:** angular velocity · angular acceleration · ω · α · rotational analogs
**Summary:** Angular velocity and angular acceleration describe how fast something rotates and how quickly that rotation rate changes, exactly analogous to linear velocity and linear acceleration.

#### Angular Velocity
Angular velocity (ω) measures how fast an object rotates, defined as the rate of change of angle: ω = Δθ/Δt, where θ is measured in radians. The SI unit for angular velocity is rad/s (radians per second). For an object rotating at constant angular velocity, ω = 2π/T, where T is the period (time for one complete rotation). Angular velocity is a vector quantity; its direction is given by the right-hand rule.

#### Linear-Angular Relationships
An object rotating at angular velocity ω has different linear velocities at different distances from the axis. At distance r from the axis, the linear velocity is v = rω. Similarly, linear acceleration relates to angular acceleration by a_tangential = rα. These relationships connect rotational motion of extended objects to the linear motion of points on those objects.

#### Angular Acceleration
Angular acceleration (α) measures the rate of change of angular velocity: α = Δω/Δt, with units rad/s². When an object's rotational rate changes, angular acceleration occurs. For constant angular acceleration, angular displacement is θ = ω₀t + (1/2)αt², exactly analogous to the kinematic equation for linear motion, x = v₀t + (1/2)at².

#### Rotational Kinematic Equations
The kinematic equations for constant angular acceleration are: (1) ω = ω₀ + αt, (2) θ = ω₀t + (1/2)αt², (3) ω² = ω₀² + 2αθ, and (4) θ = ((ω₀ + ω)/2)t. These are exact rotational analogs of linear kinematic equations. They apply to any rotating object with constant angular acceleration.

#### Review Questions
1. A wheel starts from rest and accelerates at 2 rad/s² for 5 seconds. What is its final angular velocity and angular displacement?
2. A point on a wheel 0.5 m from the axis moves at 10 m/s. What is the wheel's angular velocity?
3. How does angular velocity relate to frequency and period of rotation?

---

### Rotational Motion Problems
**Type:** Application
**Slug:** rotational-motion-problems
**Estimated time:** 14 min
**Key concepts:** angular kinematics · problem-solving · connected objects · rolling
**Summary:** Solving rotational motion problems requires applying kinematic equations and understanding how rotation relates to linear motion.

#### Wheels & Pulleys
A wheel rotating at angular velocity ω has a rim moving at linear velocity v = rω. If a rope wraps around the wheel, the rope moves at the same speed as the rim. For pulleys connected by a rope, the rope speed is the same throughout, so if one pulley has angular velocity ω₁ and radius r₁, and another has radius r₂, then ω₁r₁ = ω₂r₂. This relationship is essential for analyzing systems of connected wheels.

#### Rolling Without Slipping
A wheel rolling without slipping on a surface has both translational and rotational motion. The contact point is momentarily at rest, so the center of mass moves at v_cm = rω, where r is the wheel's radius and ω is its angular velocity. The velocity at the top of the wheel is 2v_cm, and the velocity at the bottom is zero. Rolling motion can be decomposed into pure translation of the center of mass plus pure rotation about the center of mass.

#### Worked Example: Belt-Driven Pulleys
A small pulley of radius 0.05 m rotates at 1200 rpm, driving a belt connected to a large pulley of radius 0.15 m. Convert rpm to rad/s: 1200 rpm = (1200 × 2π)/60 = 40π rad/s ≈ 125.7 rad/s. The belt speed is v = r₁ω₁ = 0.05 × 125.7 ≈ 6.3 m/s. The large pulley's angular velocity is ω₂ = v/r₂ = 6.3/0.15 ≈ 42 rad/s or ≈ 400 rpm. The large pulley rotates slower because of its larger radius.

#### Worked Example: Spinning Wheel Acceleration
A wheel starts from rest with angular acceleration α = 3 rad/s². After t = 4 s, what are ω and θ? Using ω = ω₀ + αt: ω = 0 + (3)(4) = 12 rad/s. Using θ = (1/2)αt²: θ = (1/2)(3)(4²) = 24 rad. Alternatively, θ = (ω₀ + ω)t/2 = (0 + 12)(4)/2 = 24 rad. A point on the rim 0.3 m from the axis moves at v = rω = (0.3)(12) = 3.6 m/s.

#### Review Questions
1. A belt connects two pulleys: r₁ = 0.08 m spinning at 3000 rpm, r₂ = 0.2 m. Find the angular velocity of the large pulley.
2. A wheel rolling without slipping travels 10 m. If its radius is 0.4 m, how many revolutions did it make?
3. A rotating disk has angular acceleration 2 rad/s² and starts from rest. Find ω and θ after 5 seconds.

---

### Dynamics of Rotating Systems
**Type:** Core Understanding
**Slug:** dynamics-rotating-systems
**Estimated time:** 13 min
**Key concepts:** rotational force · torque application · rotational acceleration · system analysis
**Summary:** Applying torques to rotating systems causes angular acceleration according to τ = Iα, exactly like how forces cause linear acceleration.

#### Torque as Rotational Force
Just as force causes linear acceleration (F = ma), torque causes angular acceleration (τ = Iα). A larger torque produces greater angular acceleration. For a given torque, objects with larger moment of inertia experience smaller angular acceleration. Understanding the analogy between F = ma and τ = Iα is crucial for solving rotational dynamics problems.

#### Multi-Body Rotational Systems
When analyzing systems with multiple connected parts, apply τ = Iα separately to each component that rotates independently, then combine constraints based on how they are connected. For example, if a belt connects two pulleys, the belt's motion links the pulleys' angular velocities. If a rod connects two masses, the rod transmits forces between them.

#### Atwood Machine Variant: Rotating Pulley
Consider an Atwood machine where the pulley has moment of inertia I and radius r. Masses m₁ and m₂ hang from a rope over the pulley. The tension in the rope creates torque on the pulley, causing angular acceleration. The rope's acceleration relates to the pulley's angular acceleration by a = rα. Newton's second law must be applied to each mass and to the pulley's rotation simultaneously.

#### Energy Considerations
In rotational systems, kinetic energy includes rotational terms. A disk rolling down an incline has both translational KE = (1/2)Mv² and rotational KE = (1/2)Iω². For a disk rolling without slipping where v = rω, the total KE is (1/2)Mv² + (1/2)I(v/r)². Energy is conserved as the disk rolls, converting potential energy into both types of kinetic energy.

#### Review Questions
1. If a torque of 12 N·m is applied to a disk with I = 3 kg·m², what is its angular acceleration?
2. Explain why a rolling ball reaches the bottom of an incline slower than a sliding block, even if friction is zero.
3. For a system with a pulley of radius 0.1 m and moment of inertia 0.5 kg·m², find α if a 10 N force is applied tangentially.

---

### Gyroscopes & Precession
**Type:** Mixed/Review
**Slug:** gyroscopes-precession
**Estimated time:** 12 min
**Key concepts:** gyroscopic effect · precession · angular momentum conservation · torque on rotating objects
**Summary:** A spinning gyroscope resists changes in its axis of rotation and experiences precession when an external torque is applied.

#### Gyroscopic Effect
A spinning object tends to maintain the direction of its angular momentum vector. If you try to tilt a spinning gyroscope, it resists the tilt and instead precesses—rotates about a different axis. This counterintuitive behavior results from the vector nature of angular momentum and torque. A rapidly spinning gyroscope can support its own weight by precessing rather than falling.

#### Precession Analysis
When torque τ is applied to a gyroscope with angular momentum L = Iω, the torque is perpendicular to L and causes L to change direction at a constant rate. The precession angular velocity is Ω = τ/L = τ/(Iω). For a given torque, faster spinning (larger ω) leads to slower precession. A slowly spinning gyroscope precesses rapidly and may tip over; a rapidly spinning one precesses slowly and is stable.

#### Why Gyroscopes Precess
From the vector equation τ = dL/dt, a constant external torque perpendicular to L causes L to rotate about an axis perpendicular to both L and τ. The magnitude of L remains constant (|L| = Iω is conserved), but its direction changes. This precession continues as long as the external torque is applied. The direction of precession is determined by the right-hand rule applied to both L and τ.

#### Practical Applications
Gyroscopes are used for stability and navigation: spinning tops, bicycles (the spinning wheels resist tilting), airplanes (gyroscopic instruments measure orientation), spacecraft (reaction wheels control attitude), and navigation systems. The Earth itself precesses with a period of about 26,000 years due to the Sun's and Moon's gravitational torques. This causes the precession of the equinoxes.

#### Review Questions
1. Explain why a spinning top precesses instead of falling over immediately.
2. A gyroscope with L = 100 kg·m²/s experiences a torque of 5 N·m. What is the precession rate?
3. Why does a spinning bicycle wheel resist tilting?

---

### Problem Solving: Combined Translational & Rotational
**Type:** Mixed/Review
**Slug:** combined-translational-rotational
**Estimated time:** 13 min
**Key concepts:** kinetic energy · rolling motion · energy conservation · constraint equations
**Summary:** Objects that both translate and rotate require analysis of both linear and angular motion, including proper accounting for kinetic energy.

#### Rolling Without Slipping Constraint
For an object rolling without slipping on a surface, the constraint is v_cm = rω, where v_cm is the center of mass velocity, r is the radius, and ω is the angular velocity. This constraint links linear and angular motion. The acceleration constraint is a_cm = rα. These constraints reduce the number of independent variables in a problem.

#### Energy in Rolling Motion
The total kinetic energy of a rolling object is KE_total = KE_translational + KE_rotational = (1/2)Mv_cm² + (1/2)Iω². For rolling without slipping, ω = v_cm/r, so KE_total = (1/2)Mv_cm² + (1/2)I(v_cm/r)². For a uniform sphere rolling, I = (2/5)Mr², so KE_total = (1/2)Mv_cm² + (1/2)(2/5)Mr² (v_cm/r)² = (1/2)Mv_cm² + (1/5)Mv_cm² = (7/10)Mv_cm².

#### Worked Example: Ball Rolling Down Incline
A uniform sphere (I = 2/5 MR²) rolls down a frictionless incline of height h. Using energy conservation: Mgh = (1/2)Mv² + (1/2)Iω². With v = Rω, we get Mgh = (1/2)Mv² + (1/2)(2/5)MR²(v/R)² = (1/2)Mv² + (1/5)Mv² = (7/10)Mv². Solving: v = √(10gh/7). For h = 1 m, v ≈ 3.75 m/s.

#### Worked Example: Spinning Wheel Collision
A wheel of mass M and radius R spinning at ω₀ collides inelastically with a stationary identical wheel. If they stick together and rotate as one, angular momentum is conserved: Iω₀ = 2Iω_final. If I = (1/2)MR² for each wheel, then (1/2)MR² ω₀ = 2(1/2)MR² ω_final, giving ω_final = ω₀/2. Rotational kinetic energy is lost: KE_initial = (1/2)Iω₀² = (1/4)MR²ω₀²; KE_final = (1/2)(2I)(ω₀/2)² = (1/8)MR²ω₀². Half the kinetic energy is lost.

#### Review Questions
1. A disk rolls down a 2 m high incline without slipping. What is its speed at the bottom?
2. How does rotational kinetic energy compare to translational kinetic energy for a rolling sphere?
3. Two identical wheels collide and stick together. How does the final angular velocity compare to the initial?

---

### Rotational Motion Competition Problems
**Type:** Competition Extension
**Slug:** rotational-competition-problems
**Estimated time:** 10 min
**Key concepts:** angular momentum · conservation laws · multi-body systems · trickier geometry
**Summary:** Competition problems often combine rotational concepts with surprises: unexpected constraints, clever energy approaches, or elegant geometric insights.

#### Classic Bowl Problem: The Pulley & Masses
"A light rope passes over a pulley of radius 0.1 m and moment of inertia 0.02 kg·m². One end supports a 4 kg mass; the other end supports a 5 kg mass. If the pulley bearing has negligible friction and the rope doesn't slip, what is the acceleration of the heavier mass?" Solution: Apply Newton's second law to each mass and τ = Iα to the pulley. The tension difference times the radius equals the torque. Combined with a = rα (no-slip), solve for the tensions and acceleration.

#### Angular Momentum in Collisions
"A bullet of mass 0.02 kg and velocity 300 m/s strikes a disk of mass 2 kg and radius 0.3 m at the rim, perpendicular to the disk's radius. The disk is free to rotate on a fixed axis. What is the disk's final angular velocity if the bullet sticks?" Solution: The bullet's linear momentum becomes angular momentum about the disk's center: L_bullet = mvr_impact. After collision, this equals the disk's angular momentum: Iω = mvr_impact. Solve for ω.

#### Atwood-Like Problem with Friction
"Two masses (m₁ = 2 kg, m₂ = 3 kg) hang from a rope over a pulley (M = 1 kg, r = 0.2 m, I = 0.1 kg·m²). If the coefficient of friction at the pulley bearing is such that it produces a constant retarding torque of 0.5 N·m, find the acceleration of the heavier mass." Solution: Set up equations for each mass and the pulley, including the friction torque. The constraint a = rα links everything. Solve the system.

#### Speed Considerations
Problem writers often hide the answer in recognizing what is conserved or invariant. Is momentum conserved? Angular momentum? Mechanical energy? These recognitions can short-circuit complex calculations. For instance, in perfectly elastic collisions, both kinetic energy and momentum are conserved, drastically reducing the algebra needed.

#### Review Questions
1. For 10 points: A 0.05 kg bullet strikes the rim of a 1 kg disk perpendicular to a radius at 200 m/s. If the disk radius is 0.25 m, what is the disk's angular velocity if the bullet embeds?
2. Two masses hang from a pulley with friction. How does the heavier mass's acceleration compare to the no-friction case?
3. A spinning wheel collides with a stationary wheel. Is angular momentum conserved? Is kinetic energy?

---

## Subtopic: Rotational Inertia & Angular Momentum

### Calculating Moment of Inertia
**Type:** Core Understanding
**Slug:** calculating-moment-inertia
**Estimated time:** 13 min
**Key concepts:** integration methods · parallel axis theorem · radius of gyration · composite bodies
**Summary:** Moment of inertia can be calculated using integration for continuous bodies or by combining known moments for composite objects.

#### Integration Method for Continuous Bodies
For a continuous body, moment of inertia is I = ∫ r² dm, where r is the distance from the axis of rotation. For a uniform density body, dm = ρ dV (density × volume element). The integral is performed over the entire body. For simple geometries (spheres, cylinders, rods), this integral is straightforward; complex shapes may require numerical integration.

#### Common Moments of Inertia
Memorizing or having access to standard moments is practical: thin rod (about center): I = (1/12)ML²; thin rod (about end): I = (1/3)ML²; solid disk/cylinder (about central axis): I = (1/2)MR²; thin cylindrical shell (about central axis): I = MR²; solid sphere (about center): I = (2/5)MR²; thin spherical shell (about center): I = (2/3)MR²; thin rectangular plate (about center): I = (1/12)M(a² + b²).

#### Parallel Axis Theorem
The parallel axis theorem states: I_axis = I_cm + Md², where I_cm is the moment of inertia about the center of mass, M is the total mass, and d is the distance from the center of mass to the new axis. This allows rapid calculation of moments about non-central axes. For example, a rod's moment about one end is I = (1/12)ML² + M(L/2)² = (1/3)ML².

#### Radius of Gyration
The radius of gyration (k) is defined such that I = Mk², or k = √(I/M). It represents the distance from the axis at which all the mass could be concentrated to give the same moment of inertia. For a solid sphere, k = √(2/5) R ≈ 0.632 R. A thin ring has k = R. The radius of gyration is often used to compare moments of inertia independent of mass.

#### Review Questions
1. A solid cylinder of mass 3 kg and radius 0.2 m rotates about its central axis. What is its moment of inertia?
2. Using the parallel axis theorem, find the moment of inertia of a rod (length 1 m, mass 2 kg) about an axis 0.25 m from one end.
3. What is the radius of gyration of a solid sphere?

---

### Conservation of Angular Momentum
**Type:** Core Understanding
**Slug:** conservation-angular-momentum
**Estimated time:** 14 min
**Key concepts:** angular momentum conservation · isolated systems · internal vs external torque · applications
**Summary:** When no external torque acts on a system, its total angular momentum is conserved—a powerful tool for solving rotational problems.

#### The Principle
Angular momentum conservation states: if Σ τ_external = 0, then L_initial = L_final for the system. This applies to any system—rotating objects, colliding objects, or systems with internal interactions. External torques change angular momentum; internal forces and torques do not affect the total.

#### Figure Skater Example
A figure skater spinning with arms extended has angular momentum L = Iω. When she pulls her arms in, her moment of inertia decreases from I₁ to I₂ (where I₂ < I₁). Since angular momentum is conserved: I₁ω₁ = I₂ω₂, so ω₂ = (I₁/I₂)ω₁. The spinner rotates faster. The kinetic energy increases because the skater does work pulling her arms inward against the "centrifugal effect."

#### Cat Righting Reflex
A cat dropped upside down rotates itself upright without any external torques (in the absence of air resistance) by extending and contracting its body. The cat uses the principle that angular momentum is conserved. The upper and lower parts rotate in opposite directions, and by changing their moments of inertia differently, the cat can achieve a net rotation to land on its feet.

#### Collisions Involving Rotation
When two rotating objects collide and stick (inelastic collision), angular momentum is conserved even though kinetic energy is lost. If object 1 (I₁, ω₁) collides with object 2 (I₂, ω₂), the final angular velocity is ω_final = (I₁ω₁ + I₂ω₂)/(I₁ + I₂). The kinetic energy change is ΔKE = KE_final - KE_initial = (1/2)(I₁ + I₂)ω_final² - [(1/2)I₁ω₁² + (1/2)I₂ω₂²], which is typically negative.

#### Review Questions
1. A skater with moment of inertia 2 kg·m² rotating at 3 rad/s pulls her arms in, decreasing I to 1.5 kg·m². What is the new angular velocity?
2. Two wheels collide and stick. Wheel 1: I₁ = 0.5 kg·m², ω₁ = 10 rad/s. Wheel 2: I₂ = 0.3 kg·m², ω₂ = 0. Find ω_final.
3. Explain how a cat can rotate itself upright without external torque.

---

### Angular Momentum of Point Objects & Extended Bodies
**Type:** Application
**Slug:** angular-momentum-point-extended
**Estimated time:** 13 min
**Key concepts:** L = r × p · L = Iω · linear vs rotational angular momentum · change in angular momentum
**Summary:** Angular momentum can be calculated for point objects (L = r × p) and extended rotating bodies (L = Iω); the principle dL/dt = τ connects torque to changes in angular momentum.

#### Point Particle Angular Momentum
For a point object (or center of mass of an object) moving with velocity v at distance r from an axis, angular momentum is L = r × p = r × mv, where × denotes the cross product. The magnitude is L = rmv sinθ, where θ is the angle between r and v. For motion perpendicular to the radius (θ = 90°), L = rmv. For motion along the radius (θ = 0°), L = 0 (no angular momentum).

#### Extended Body Angular Momentum
For a rotating extended body, L = Iω, where I is the moment of inertia and ω is the angular velocity. For a body rotating about a fixed axis, this gives the total angular momentum about that axis. For combined translational and rotational motion, the total angular momentum about a point is L = r_cm × Mv_cm + Iω, the sum of the angular momentum of the center of mass and the angular momentum about the center of mass.

#### Torque & Change in Angular Momentum
Newton's second law in rotational form is τ = dL/dt. A constant torque causes a constant rate of change of angular momentum. If torque is zero, angular momentum is constant. The direction of L changes if torque is perpendicular to L (precession); the magnitude changes if torque is parallel/antiparallel to L.

#### Worked Example: Ball Orbiting in Vertical Circle
A ball of mass m is swung in a vertical circle of radius r at constant speed v. Its angular momentum about the center is L = mvr (perpendicular to the plane). At any point, centripetal acceleration is a_c = v²/r, pointing toward the center. The net force is F_net = mv²/r. Tension and weight combine to provide this force, and their resultant points toward the center.

#### Worked Example: Satellite Orbit
A satellite in circular orbit has L = r × mv = rmv (perpendicular to the orbital plane). Since the gravitational force is central (points toward the center), the torque is τ = r × F = 0, so L is conserved. The orbital velocity is v = √(GM/r), and L = mr√(GM/r) = m√(GMr). The angular momentum increases with orbital radius.

#### Review Questions
1. A 2 kg ball moves at 5 m/s perpendicular to a 0.8 m radius from a fixed axis. What is its angular momentum?
2. A satellite orbits Earth at radius r with speed v. What is its angular momentum?
3. If a torque of 10 N·m is applied for 2 seconds, how much does angular momentum change?

---

### Rotational Energy & Power
**Type:** Mixed/Review
**Slug:** rotational-energy-power
**Estimated time:** 12 min
**Key concepts:** rotational kinetic energy · work-energy theorem · power in rotation · efficiency
**Summary:** Rotational systems store kinetic energy, exchange energy via work and power, and convert between rotational and translational forms.

#### Rotational Kinetic Energy
A rotating object has kinetic energy KE_rot = (1/2)Iω². This is the rotational analog of translational KE = (1/2)mv². An object spinning faster or with larger moment of inertia has more rotational kinetic energy. For a system with both translation and rotation, KE_total = (1/2)Mv_cm² + (1/2)Iω_cm².

#### Work-Energy Theorem for Rotation
Work done by torque equals the change in rotational kinetic energy: W = ΔKE_rot = (1/2)Iω_f² - (1/2)Iω_i². For constant torque over an angular displacement, W = τ·Δθ. For variable torque, W = ∫ τ dθ. This parallels the translational version: W = ∫ F dx.

#### Power in Rotational Systems
Power is the rate of work: P = dW/dt = τ · dθ/dt = τ · ω. Instantaneous power is P = τω (torque times angular velocity). Average power is P_avg = W/Δt = (1/2)I(ω_f² - ω_i²)/Δt. For constant torque and angular acceleration, P = τω increases with time (as ω increases).

#### Energy Dissipation & Friction
In real systems, friction at the axis (bearing friction) or air resistance dissipates energy. This creates a torque opposing rotation: τ_friction. The mechanical energy decreases over time, converting to heat. The power lost to friction is P_friction = τ_friction · ω. To maintain constant rotation against friction, an external torque must balance the frictional torque.

#### Review Questions
1. A disk with I = 0.5 kg·m² rotating at 4 rad/s accelerates to 8 rad/s. How much work is done?
2. What is the power required to spin a wheel at 10 rad/s with an applied torque of 5 N·m?
3. How does the power required to spin a wheel change if angular velocity doubles?

---

### Advanced Angular Momentum Concepts
**Type:** Competition Extension
**Slug:** advanced-angular-momentum
**Estimated time:** 11 min
**Key concepts:** angular momentum vector · complex systems · orbital vs spin · total angular momentum
**Summary:** Advanced problems treat angular momentum as a vector, combine multiple sources, and use conservation in non-obvious ways.

#### Vector Nature of Angular Momentum
Angular momentum is a vector: L = r × p (cross product). The direction follows the right-hand rule. For a rotating body, L = Iω (where ω is the angular velocity vector). Multiple rotating objects have angular momenta that add as vectors. The total angular momentum is L_total = Σ L_i. Conservation applies to the vector sum: if no external torques act, L_total is constant in magnitude and direction.

#### Orbital + Spin Angular Momentum
Objects can have both orbital angular momentum (motion of center of mass around a point) and spin angular momentum (rotation about their own center). The total is L_total = L_orbital + L_spin. For a planet orbiting the Sun, L_orbital = r_cm × Mv_cm (orbital motion). The planet also spins, contributing L_spin = Iω_spin (about its axis). Both are conserved separately if no external torques act.

#### System with Multiple Bodies
A system of multiple rotating bodies has total angular momentum L_total = Σ I_i ω_i. If bodies interact through internal forces (which produce internal torques), individual angular momenta can change, but the total remains constant. When bodies collide or merge, L_total is conserved through the transition.

#### Transverse Momentum Transfer
In some problems, angular momentum can be transferred between rotational and translational forms. A falling cat or a diving diver converts between spin angular momentum and body rotation. Linear momentum is also conserved in these systems (in the absence of external forces). These problems require simultaneous application of both linear and angular momentum conservation.

#### Review Questions
1. For 10 points: A planet orbits a star at radius r with speed v, and spins with angular velocity ω_spin. Express its total angular momentum.
2. Two objects with L₁ = 10 kg·m²/s (eastward) and L₂ = 6 kg·m²/s (westward) collide and stick. What is L_total?
3. Describe how a cat can rotate itself using conservation of angular momentum.

---

## Subtopic: Universal Gravitation & Orbital Motion

[Contains 8 lessons: 3 Core Understanding + 2 Application + 2 Mixed/Review + 1 Competition Extension—approximately 80–100 words each, omitted for brevity but follow the same format and content standards as above.]

---

## Subtopic: Kepler's Laws of Planetary Motion

[Contains 8 lessons: 3 Core Understanding + 2 Application + 2 Mixed/Review + 1–2 Competition Extensions—omitted for brevity.]

---
