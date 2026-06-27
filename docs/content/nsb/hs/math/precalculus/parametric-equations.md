---
id: nsb-lesson-0699
title: "Parametric Equations and Curves"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: parametric-equations
type: "Application"
estimatedMinutes: 15
keyConcepts: ["parametrization", "eliminating the parameter", "velocity and tangent"]
summary: "Parametric equations x = f(t), y = g(t) trace a curve as parameter t varies."
---
#### Parametric Representation of Common Curves
A circle of radius a centered at (h, k) is x = h + a cos t, y = k + a sin t for t ∈ [0, 2π]. Example: x = 2 + 3cos t, y = 1 + 3sin t traces a circle centered at (2, 1) with radius 3. An ellipse with semi-major axis a and semi-minor axis b is x = a cos t, y = b sin t. A line through (x₀, y₀) in direction (dx, dy) is x = x₀ + dx·t, y = y₀ + dy·t. A parabola y = x² is x = t, y = t². This parametrization makes it easy to compute arc length and trace motion at varying speeds.

#### Eliminating the Parameter
From x = 2 cos t and y = 3 sin t, derive the Cartesian equation. Rearrange: cos t = x/2 and sin t = y/3. Use sin²t + cos²t = 1: (y/3)² + (x/2)² = 1 → x²/4 + y²/9 = 1, an ellipse. From x = t + 1 and y = t² − 1, eliminate t: t = x − 1, so y = (x−1)² − 1 = x² − 2x. For parametric curves that loop or have multiple branches, eliminating the parameter can lose information about the direction and extent of the curve.

#### Velocity and Tangent Line
The velocity vector is v(t) = (dx/dt, dy/dt). Example: for x = cos t, y = sin t (unit circle), v(t) = (−sin t, cos t). At t = π/6, v = (−1/2, √3/2), pointing northwest along the circle. The slope of the tangent line is dy/dx = (dy/dt) / (dx/dt). At t = π/6, dy/dx = (√3/2) / (−1/2) = −√3. The speed is |v| = √[(dx/dt)² + (dy/dt)²]. For the circle, |v| = √(sin²t + cos²t) = 1 (constant), so the particle moves at unit speed around the circle.

#### Worked Example: Cycloid
A wheel of radius 1 rolling along the x-axis traces a cycloid: x = t − sin t, y = 1 − cos t, where t is the angle through which the wheel has rotated. At t = 0, (x, y) = (0, 0) (starting at origin). At t = π, (x, y) = (π, 2) (particle has risen to height 2, then descended). At t = 2π, (x, y) = (2π, 0) (particle returns to x-axis after one complete rotation). The velocity is v = (1 − cos t, sin t). At t = 0, v = (0, 0) (the wheel's contact point is instantaneously at rest). At t = π, v = (2, 0) (maximum horizontal speed, twice the wheel's center speed).

#### Review Questions
1. Find the Cartesian equation for x = t³, y = t² for t ≥ 0.
2. Parametrize the line through (1, 2) and (4, 5).
3. For the curve x = 2 + cos t, y = 3 + sin t, find dy/dx at t = π/4.

---
