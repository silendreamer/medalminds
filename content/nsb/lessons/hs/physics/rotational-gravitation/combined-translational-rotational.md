---
id: nsb-lesson-0861
title: "Problem Solving: Combined Translational & Rotational"
level: hs
subject: physics
topic: rotational-gravitation
subtopic: "Rotational Kinematics & Dynamics"
slug: combined-translational-rotational
type: "Mixed/Review"
estimatedMinutes: 13
keyConcepts: ["kinetic energy", "rolling motion", "energy conservation", "constraint equations"]
summary: "Objects that both translate and rotate require analysis of both linear and angular motion, including proper accounting for kinetic energy."
---
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
