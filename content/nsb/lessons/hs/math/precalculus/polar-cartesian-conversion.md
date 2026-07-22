---
id: nsb-lesson-0698
title: "Converting Between Cartesian and Polar Coordinates"
level: hs
subject: math
topic: precalculus
subtopic: "Sequences & Series"
slug: polar-cartesian-conversion
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["polar coordinates (r, θ)", "conversion formulas", "graphs in polar form"]
summary: "Polar coordinates (r, θ) represent position as distance from origin and angle from positive x-axis."
---
#### Conversion Formulas
Cartesian (x, y) ↔ Polar (r, θ): x = r cos θ, y = r sin θ, r = √(x² + y²), tan θ = y/x (with care for quadrant). Example: (x, y) = (3, 4) → r = √(9+16) = 5, θ = arctan(4/3) ≈ 53.1° ≈ 0.927 rad. Conversely, (r, θ) = (5, π/6) → x = 5 cos(π/6) = 5·√3/2 ≈ 4.33, y = 5 sin(π/6) = 5·(1/2) = 2.5.

#### Polar Curves and Their Shapes
r = a is a circle centered at the origin with radius a. r = a θ (spiral of Archimedes) winds outward as θ increases. r = a + b cos θ (cardioid if a=b, limacon if a≠b) is heart-shaped. r = a cos(nθ) is a rose curve with n petals (if n is odd) or 2n petals (if n is even). θ = c is a ray from the origin at angle c. These polar curves often have simpler equations than their Cartesian counterparts.

#### Plotting Polar Curves
To plot r = 2 + 2cos θ (cardioid), compute r for θ = 0°, 30°, 60°, 90°, 120°, 150°, 180°. At θ=0°, r=4 (farthest from origin). At θ=90°, r=2. At θ=180°, r=0 (cusp at origin). The curve is symmetric about the positive x-axis because cos(−θ) = cos θ. Negative r values are plotted in the opposite direction: (r, θ) with r < 0 is equivalent to (|r|, θ + π). Learners often find sketching polar curves easier than Cartesian curves because symmetry is immediately visible.

#### Area in Polar Coordinates
The area enclosed by a polar curve r = f(θ) from θ = α to θ = β is A = ½ ∫(α to β) r² dθ. Example: area enclosed by r = 3 from θ = 0 to θ = 2π is A = ½ ∫(0 to 2π) 9 dθ = (9/2)·2π = 9π, a circle of radius 3 with area πr² = 9π ✓. For r = θ on [0, 2π], A = ½ ∫(0 to 2π) θ² dθ = (1/2)·[θ³/3] from 0 to 2π = (1/6)·8π³ = 4π³/3 ≈ 39.5.

#### Review Questions
1. Convert (6, 2π/3) from polar to Cartesian coordinates.
2. Convert (−3, 4) from Cartesian to polar coordinates.
3. Describe the curve r = 4 sin θ and find its area.

---
