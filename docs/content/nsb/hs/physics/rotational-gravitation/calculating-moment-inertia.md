---
id: nsb-lesson-0863
title: "Calculating Moment of Inertia"
level: hs
subject: physics
topic: rotational-gravitation
subtopic: "Rotational Inertia & Angular Momentum"
slug: calculating-moment-inertia
type: "Core Understanding"
estimatedMinutes: 13
keyConcepts: ["integration methods", "parallel axis theorem", "radius of gyration", "composite bodies"]
summary: "Moment of inertia can be calculated using integration for continuous bodies or by combining known moments for composite objects."
---
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
