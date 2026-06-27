---
id: nsb-lesson-0701
title: "Vector Operations and Applications"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: vector-operations
type: "Application"
estimatedMinutes: 15
keyConcepts: ["dot product", "cross product", "vector projections", "magnitude"]
summary: "Vectors are quantities with magnitude and direction; they're essential in physics and engineering."
---
#### Vector Notation and Magnitude
A vector **v** = (v_x, v_y) in 2D or (v_x, v_y, v_z) in 3D. Its magnitude is |**v**| = √(v_x² + v_y²) or √(v_x² + v_y² + v_z²). Example: **v** = (3, 4) has |**v**| = 5. A unit vector has magnitude 1; the unit vector in the direction of **v** is **v̂** = **v**/|**v**| = (3/5, 4/5). Vector addition: **u** + **v** = (u_x+v_x, u_y+v_y). Scalar multiplication: c**v** = (cv_x, cv_y) scales the magnitude by |c|. If c < 0, the direction reverses.

#### Dot Product
The dot product **u** · **v** = u_x v_x + u_y v_y = |**u**| |**v**| cos θ, where θ is the angle between the vectors. Example: **u** = (1, 0) and **v** = (0, 1) are perpendicular: **u** · **v** = 0. If **u** = (2, 3) and **v** = (1, 4), then **u** · **v** = 2·1 + 3·4 = 14. The dot product is zero iff the vectors are perpendicular. It's used to compute work in physics: W = **F** · **d**, where **F** is force and **d** is displacement.

#### Cross Product (3D)
The cross product **u** × **v** produces a vector perpendicular to both **u** and **v**, with magnitude |**u**| |**v**| sin θ. In component form: **u** × **v** = (u_y v_z − u_z v_y, u_z v_x − u_x v_z, u_x v_y − u_y v_x). Example: **i** × **j** = **k** (the unit vectors along x, y, z axes). The cross product is used to compute torque: τ = **r** × **F**, where **r** is position and **F** is force. Note: **u** × **v** ≠ **v** × **u**; instead, **v** × **u** = −(**u** × **v**).

#### Vector Projections
The projection of **u** onto **v** is proj_**v**(**u**) = [(**u** · **v**) / |**v**|²] **v**. Its magnitude is |**u**| cos θ, where θ is the angle between them. Example: project **u** = (3, 4) onto **v** = (1, 0). **u** · **v** = 3, |**v**|² = 1, so proj = 3**v** = (3, 0). This represents the component of **u** in the direction of **v**.

#### Review Questions
1. Find the angle between **u** = (1, 1) and **v** = (1, 0).
2. Compute **a** × **b** for **a** = (1, 0, 0) and **b** = (0, 1, 0).
3. Project **v** = (4, 3) onto **w** = (1, 0).

---
