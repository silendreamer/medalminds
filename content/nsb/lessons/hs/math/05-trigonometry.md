# HS Math — Trigonometry
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Trigonometric Functions & Unit Circle

### The Unit Circle Foundation
**Type:** Core Understanding
**Slug:** unit-circle-foundation
**Estimated time:** 15 min
**Key concepts:** unit circle · radian measure · reference angles
**Summary:** The unit circle is a circle of radius 1 centered at the origin; it's the foundation for understanding trigonometric functions.

#### What is the Unit Circle?
The unit circle has radius 1 and its equation is x² + y² = 1. Every point (cos θ, sin θ) on the unit circle represents the angle θ measured counterclockwise from the positive x-axis. Radians measure angle as arc length on the unit circle: one full rotation = 2π radians = 360°. Key conversions: π/6 rad = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°. The unit circle lets you visualize why sine and cosine are periodic with period 2π.

#### Special Angles and Exact Values
Six angles appear constantly in Science Bowl: 0°, 30°, 45°, 60°, 90°, 180°, 270°, 360°. At these angles, sine and cosine take exact rational or radical values. sin(30°)=½, sin(45°)=√2/2, sin(60°)=√3/2; cos(30°)=√3/2, cos(45°)=√2/2, cos(60°)=½. Memorize these six angles in both degrees and radians. Tangent is sine/cosine, so tan(45°)=1, tan(60°)=√3, tan(30°)=1/√3. These exact values eliminate the need for a calculator and are critical for competition speed.

#### Periodic Behavior and Symmetry
Sine and cosine repeat every 2π radians. Within one period, sine is positive in quadrants I and II (0 to π), negative in III and IV (π to 2π). Cosine is positive in I and IV, negative in II and III. Reference angles help you find sine/cosine of any angle: use the acute angle between the terminal side and the x-axis, then apply the quadrant's sign rule. For example, sin(150°) = sin(180°−150°) = sin(30°) with quadrant II's positive sign = +½.

#### Why Radians Matter
Calculus requires radians because derivatives of sin(x) and cos(x) simplify to cos(x) and −sin(x) only when x is in radians. The small-angle approximation sin(x) ≈ x also holds only for x in radians. Science Bowl problems often mix degrees and radians; always convert to radians before taking derivatives or using small-angle approximations.

#### Review Questions
1. What is sin(5π/6) in exact form?
2. Convert 225° to radians and identify its reference angle.
3. Explain why cos(2π−θ) = cos(θ).

---

### Trigonometric Identities & Equations

### Fundamental Trigonometric Identities
**Type:** Core Understanding
**Slug:** fundamental-trig-identities
**Estimated time:** 15 min
**Key concepts:** Pythagorean identities · reciprocal identities · quotient identities
**Summary:** Trigonometric identities are equations that hold for all angles; they're algebraic tools for simplifying and solving.

#### The Pythagorean Identity
The most important identity is sin²θ + cos²θ = 1, which follows directly from the Pythagorean theorem on the unit circle. Rearranging gives cos²θ = 1 − sin²θ and sin²θ = 1 − cos²θ. Dividing through by cos²θ yields 1 + tan²θ = sec²θ. These three Pythagorean identities appear in nearly every trigonometric simplification. Practice using them to convert between sin and cos, and between sine/cosine and tangent. Memorize all three forms.

#### Reciprocal and Quotient Identities
Six fundamental functions exist: sin, cos, tan, cot, sec, csc. The reciprocals are csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ. The quotient identities are tan θ = sin θ/cos θ and cot θ = cos θ/sin θ. These identities let you rewrite expressions in a single trigonometric function. For instance, to solve csc θ = 2, rewrite as 1/sin θ = 2, so sin θ = ½, giving θ = π/6 or 5π/6 in [0, 2π).

#### Sum and Difference Formulas
The angle addition formulas are sin(A±B) = sin A cos B ± cos A sin B and cos(A±B) = cos A cos B ∓ sin A sin B. These allow you to find exact values for non-standard angles. Example: sin(75°) = sin(45°+30°) = sin 45° cos 30° + cos 45° sin 30° = (√2/2)(√3/2) + (√2/2)(½) = (√6+√2)/4. The tangent formula tan(A±B) = (tan A ± tan B)/(1 ∓ tan A tan B) is useful but harder to remember; derive it from the sine and cosine formulas if needed.

#### Double and Half-Angle Formulas
sin(2θ) = 2 sin θ cos θ, cos(2θ) = cos²θ − sin²θ = 2cos²θ − 1 = 1 − 2sin²θ. Three forms of cos(2θ) let you choose based on what functions appear in your problem. The half-angle formulas are sin(θ/2) = ±√[(1−cos θ)/2] and cos(θ/2) = ±√[(1+cos θ)/2]. The sign depends on the quadrant of θ/2. These formulas solve equations like sin²(x/2) + cos x = 1.

#### Review Questions
1. Simplify (1 + sin θ)(1 − sin θ) using a Pythagorean identity.
2. Find the exact value of cos(105°) using a sum formula.
3. Solve sin(2x) = cos x for x in [0, 2π).

---

### Solving Trigonometric Equations
**Type:** Application
**Slug:** solving-trig-equations
**Estimated time:** 15 min
**Key concepts:** general solutions · inverse trig functions · algebraic techniques
**Summary:** Trigonometric equations require finding all angles (in degrees or radians) that satisfy the equation.

#### Finding All Solutions in an Interval
When solving sin x = ½ on [0, 2π), identify one reference solution: x = π/6. Then apply the periodicity and symmetry: sine equals ½ in quadrants I and II, so x = π/6 (QI) and x = π − π/6 = 5π/6 (QII). If the interval were [0, 4π), add one more period: x = π/6 + 2π = 13π/6 and x = 5π/6 + 2π = 17π/6. Always sketch the unit circle or a sine curve to visualize where the solution lies; this prevents sign errors.

#### Using Inverse Functions
The inverse functions sin⁻¹, cos⁻¹, tan⁻¹ return a single value: sin⁻¹(½) = π/6, cos⁻¹(−1) = π, tan⁻¹(−√3) = −π/3. These are the "principal values" in their restricted ranges: [−π/2, π/2] for sin⁻¹, [0, π] for cos⁻¹, (−π/2, π/2) for tan⁻¹. From the principal value, use periodicity to find all solutions. Example: cos x = −√3/2 gives x = cos⁻¹(−√3/2) = 5π/6 as one solution; the general solution is x = 5π/6 + 2πk or x = 2π − 5π/6 + 2πk = 7π/6 + 2πk for any integer k.

#### Algebraic Techniques
Trigonometric equations often require algebra first. For sin²x − sin x − 2 = 0, let u = sin x: u² − u − 2 = (u−2)(u+1) = 0, so u = 2 or u = −1. Since sin x ∈ [−1, 1], only u = −1 is valid, giving sin x = −1, so x = 3π/2 + 2πk. If the equation involves multiple trig functions (e.g., sin x + cos x = 1), use identities to convert to a single function, then solve.

#### Worked Example: 2cos²x − cos x = 1
Rearrange: 2cos²x − cos x − 1 = 0. Factor (or use the quadratic formula with u = cos x): (2cos x + 1)(cos x − 1) = 0. Solutions: cos x = −½ or cos x = 1. For cos x = 1: x = 0 + 2πk = 2πk. For cos x = −½: x = 2π/3 + 2πk or x = 4π/3 + 2πk. General solution: x ∈ {2πk, 2π/3 + 2πk, 4π/3 + 2πk}.

#### Review Questions
1. Solve tan x = 1 for x in [0, 2π).
2. Find all solutions to sin(2x) = √3/2 in [0, 2π).
3. Solve cos²x = sin x for x in [0, 2π).

---

### Law of Sines & Law of Cosines

### The Law of Sines
**Type:** Core Understanding
**Slug:** law-of-sines
**Estimated time:** 15 min
**Key concepts:** sine rule · ambiguous case · area formula
**Summary:** The Law of Sines relates the sides and angles of any triangle: a/sin A = b/sin B = c/sin C.

#### Statement and Derivation
In any triangle with sides a, b, c opposite angles A, B, C, the ratios of side to opposite angle sine are equal: a/sin A = b/sin B = c/sin C. This ratio also equals 2R, where R is the circumradius (radius of the circle through all three vertices). Derivation: the area of a triangle is ½ab sin C = ½bc sin A = ½ac sin B. From these three expressions, dividing by ½ sin A sin B sin C yields the Law of Sines. The law solves "two angles and a side" (AAS or ASA) problems directly.

#### Solving AAS and ASA Cases
Given two angles and any side, find the remaining sides and angles. Example: A = 30°, B = 45°, a = 10. Find b. From the Law of Sines: 10/sin 30° = b/sin 45°, so b = 10·sin 45°/sin 30° = 10·(√2/2)/0.5 = 10√2. Then C = 180° − 30° − 45° = 105°, and c/sin 105° = 10/sin 30° gives c = 10·sin 105°/0.5 = 20 sin 105° ≈ 20(0.966) ≈ 19.3. No ambiguity arises when two angles are given: the triangle is uniquely determined.

#### The Ambiguous Case (SSA)
When two sides and an angle opposite one of them are given (SSA), zero, one, or two triangles may exist—the "ambiguous case." Given sides a, b and angle A opposite side a: if a < b sin A, no triangle exists; if a = b sin A, exactly one right triangle exists; if b sin A < a < b, two triangles exist (one acute, one obtuse); if a ≥ b, exactly one triangle exists. Draw a sketch to visualize: drop a perpendicular from C to side c. The ambiguity arises because sin θ = sin(π−θ), so two angles in (0, π) can have the same sine. Always check whether both solutions are valid by verifying that the sum of angles is less than 180°.

#### The Area Formula
The area of a triangle is K = ½ab sin C = ½bc sin A = ½ac sin B. These formulas relate area to two sides and their included angle. Combined with the Law of Sines, they provide multiple ways to compute area depending on what information is given. Example: if a = 8, b = 6, C = 120°, then K = ½(8)(6)sin 120° = 24·(√3/2) = 12√3 ≈ 20.8.

#### Review Questions
1. In triangle ABC, A = 60°, B = 75°, a = 10. Find b.
2. Given sides a = 5, b = 7, and angle A = 40°, determine how many triangles exist.
3. Find the area of a triangle with sides p = 9, q = 12, and included angle R = 45°.

---

### The Law of Cosines
**Type:** Core Understanding
**Slug:** law-of-cosines
**Estimated time:** 15 min
**Key concepts:** cosine rule · SAS and SSS cases · generalization
**Summary:** The Law of Cosines generalizes the Pythagorean theorem to any triangle: c² = a² + b² − 2ab cos C.

#### Statement and Relation to Pythagorean Theorem
In any triangle, c² = a² + b² − 2ab cos C. When C = 90°, cos C = 0, and this reduces to c² = a² + b², the Pythagorean theorem. The −2ab cos C term is a correction for non-right angles. If C is acute (cos C > 0), the side c is shorter than it would be in the right-angle case. If C is obtuse (cos C < 0), the side c is longer. Rearranging for the angle: cos C = (a² + b² − c²)/(2ab). This symmetric form allows you to solve for any angle given all three sides.

#### Solving SAS Cases (Side-Angle-Side)
When two sides and their included angle are known, the Law of Cosines directly finds the third side. Example: a = 5, b = 7, C = 60°. Then c² = 5² + 7² − 2(5)(7)cos 60° = 25 + 49 − 70(0.5) = 74 − 35 = 39, so c = √39 ≈ 6.24. Once all three sides are known, use the Law of Cosines again (in its angle form) to find the remaining angles: cos A = (b² + c² − a²)/(2bc). This approach is systematic and always works.

#### Solving SSS Cases (Side-Side-Side)
When all three sides are given, use the Law of Cosines in the angle form to find all angles. Example: a = 3, b = 4, c = 5. Find C. cos C = (3² + 4² − 5²)/(2·3·4) = (9 + 16 − 25)/24 = 0/24 = 0, so C = 90°. This is a right triangle (the 3-4-5 Pythagorean triple). For non-right triangles, always compute cos C, cos A, cos B using the formula; then find the angles using inverse cosine.

#### Numerical Example: Navigation Problem
A ship is at point A. It travels 50 km to point B, then turns 120° (exterior angle, so interior angle is 60°) and travels 60 km to point C. How far is it from A to C? Using the Law of Cosines with a = 60, b = 50, C = 60°: c² = 50² + 60² − 2(50)(60)cos 60° = 2500 + 3600 − 6000(0.5) = 6100 − 3000 = 3100, so c = √3100 = 10√31 ≈ 55.7 km.

#### Review Questions
1. Find the third side of a triangle with sides 8 and 10 and included angle 75°.
2. In triangle XYZ, x = 6, y = 8, z = 10. Find angle Z.
3. A surveyor measures angles: from point P, the angle of elevation to a tower is 30°, and the distance is 100 m. From point Q (50 m away on level ground from P), the angle is 45°. Find the height of the tower using the Law of Cosines.

---

### Applications of Trigonometry

### Modeling Periodic Phenomena
**Type:** Application
**Slug:** periodic-phenomena-modeling
**Estimated time:** 15 min
**Key concepts:** amplitude · period · phase shift · sinusoidal models
**Summary:** Many real phenomena (tides, sound, light, population cycles) are modeled by sinusoidal functions.

#### Sinusoidal Function Form
A general sinusoidal function is y = A sin(B(x − C)) + D or y = A cos(B(x − C)) + D. The amplitude |A| is the maximum displacement from the center line y = D. The period is 2π/B (for radians) or 360°/B (for degrees). The phase shift C moves the graph horizontally (right if C > 0, left if C < 0). The vertical shift D centers the oscillation. Example: y = 3 sin(2(x − π/4)) + 5 has amplitude 3, period π, phase shift π/4 to the right, and center line at y = 5.

#### Modeling Ocean Tides
The depth of water in a harbor varies sinusoidally over about 12.4 hours (one tidal cycle). If the mean depth is 10 m, the maximum depth is 13 m (at high tide), and high tide occurs at t = 2 hours, model the depth as d(t) = 10 + 3 cos(2π(t−2)/12.4), where t is in hours and amplitude is 3 m. At t = 2, d(2) = 10 + 3 cos(0) = 13 m (high tide). At t = 8.2 (half period later), d(8.2) = 10 + 3 cos(π) = 7 m (low tide). Use this model to predict depths at any time.

#### Modeling Sound and Light Waves
A sound wave is y = A sin(2πft + φ), where A is amplitude (loudness), f is frequency (in Hz), t is time (in seconds), and φ is phase. A 440 Hz tone (concert A) with amplitude 0.05 and no phase shift is y = 0.05 sin(2π·440·t) = 0.05 sin(880πt). The period is 1/440 ≈ 2.27 ms. Light waves follow the same model but with frequencies in the range 10¹⁴ to 10¹⁵ Hz. Interference (adding two waves) produces resonance (when phases align) or cancellation (when phases oppose by π). This principle underlies tuning instruments and detecting signals.

#### Worked Example: Temperature Cycles
Daily temperature in a location varies from a minimum of 5°C at 6 AM to a maximum of 20°C at 6 PM. Model the temperature T(t) where t = 0 at midnight. The mean is (5+20)/2 = 12.5°C, amplitude is (20−5)/2 = 7.5°C. The minimum occurs 6 hours after midnight (6 AM), so the phase shift is 6. Using cosine (which starts at a max), we shift to start at a min: T(t) = 12.5 − 7.5 cos(2π(t−6)/24) = 12.5 − 7.5 cos(π(t−6)/12). Check: T(6) = 12.5 − 7.5 cos(0) = 5°C ✓. T(18) = 12.5 − 7.5 cos(π) = 20°C ✓.

#### Review Questions
1. A pendulum oscillates with period 1 second and amplitude 10 cm. Write its position as a function of time.
2. A rotating wheel completes 5 revolutions per second and has radius 2 m. If the starting angle is 45°, express the height of a point on the rim as a function of time.
3. Model the hours of daylight at a location where winter has 9 hours and summer has 15 hours (6 months apart).

---

### Inverse Trigonometric Functions
**Type:** Application
**Slug:** inverse-trig-applications
**Estimated time:** 15 min
**Key concepts:** arcsin · arccos · arctan · principal values · solving for angles
**Summary:** Inverse trig functions return the angle that produced a given sine, cosine, or tangent value.

#### Definitions and Ranges
sin⁻¹(x) or arcsin(x) returns an angle θ ∈ [−π/2, π/2] such that sin θ = x. cos⁻¹(x) returns θ ∈ [0, π] such that cos θ = x. tan⁻¹(x) returns θ ∈ (−π/2, π/2) such that tan θ = x. These ranges ensure the function is one-to-one. Note: sin⁻¹(x) ≠ 1/sin(x); use csc(x) for the reciprocal. Similarly, tan⁻¹ means arctan, not 1/tan.

#### Solving Right Triangle Applications
From a point 100 m from a building's base, the angle of elevation to the top is 35°. Find the building's height. Let h be the height. Then tan(35°) = h/100, so h = 100 tan(35°) ≈ 100(0.7) ≈ 70 m. Conversely, if the building is 70 m tall and you are 100 m away, the angle of elevation is arctan(70/100) = arctan(0.7) ≈ 35°. Inverse trig functions convert from side ratios back to angles.

#### Evaluating Expressions
Expressions like sin(arctan(2/3)) require careful evaluation. Let θ = arctan(2/3), so tan θ = 2/3 with θ ∈ (−π/2, π/2). From the right triangle with opposite 2 and adjacent 3, the hypotenuse is √(4+9) = √13. Thus sin θ = 2/√13 = 2√13/13. Practice: cos(arcsin(3/5)) = 4/5 (since arcsin returns an angle in the first quadrant where sin is 3/5 and cos is 4/5).

#### Worked Example: Navigation Bearing
A ship at point A needs to reach point B located 80 km east and 60 km north. What bearing (angle from north, measured clockwise) should the captain set? The displacement vector is (80, 60) in (east, north) coordinates. The angle from the positive north axis (measured clockwise) is arctan(80/60) = arctan(4/3) ≈ 53°. So the bearing is N 53° E or 53° clockwise from north.

#### Review Questions
1. Evaluate sin(arccos(−1/2)).
2. Find arctan(√3) in degrees and radians.
3. A ladder leans against a wall, with the base 3 m from the wall and the top 4 m up the wall. What angle does the ladder make with the ground?

---

### Trigonometry in Physics (Waves and Harmonic Motion)
**Type:** Mixed/Review
**Slug:** trig-physics-waves
**Estimated time:** 12 min
**Key concepts:** simple harmonic motion · damped oscillations · wave superposition
**Summary:** Trigonometry models oscillatory motion: springs, pendulums, electromagnetic waves, and sound.

#### Simple Harmonic Motion
A mass on a spring obeys x(t) = A cos(ωt + φ), where A is amplitude, ω = √(k/m) is angular frequency (radians per second), and φ is phase. The period is T = 2π/ω. Example: a mass of 0.5 kg on a spring with k = 20 N/m starts at x = 2 m with zero velocity. Then ω = √(20/0.5) = 2√10 rad/s ≈ 6.32 rad/s, T ≈ 1 s. At equilibrium x = 0, all energy is kinetic: KE_max = ½kA² = ½(20)(4) = 40 J. The trigonometric form gives exact position, velocity (v = dx/dt = −Aω sin(ωt+φ)), and acceleration (a = −ω²x) at any instant.

#### Damped Oscillations
Real oscillators lose energy due to friction. The amplitude decays as x(t) = A e^(−γt) cos(ωt+φ), where γ is the damping coefficient. The system oscillates more slowly (smaller ω) as damping increases. Three regimes: underdamped (oscillates while decaying), critically damped (returns to equilibrium in minimum time without overshooting), and overdamped (creeps back without oscillating). Engineers tune γ to achieve critical damping in shock absorbers and door closers.

#### Superposition and Beats
When two waves of slightly different frequencies overlap, their sum exhibits beats: a slow modulation of a faster oscillation. Example: y = sin(100πt) + sin(102πt). Using sum-to-product formulas, this becomes y = 2 cos(πt) sin(101πt), a rapidly oscillating wave (at 101π rad/s ≈ 101 Hz) with amplitude modulated by 2 cos(πt). The beat frequency is |f₁ − f₂| = 1 Hz. Musicians use this to tune instruments: when two notes produce slow beats, they're close to the same frequency.

#### Pendulum Approximation
A simple pendulum's period is T = 2π√(L/g) for small angles. For larger angles, the exact form involves an elliptic integral, but the small-angle approximation suffices for most cases. The angle satisfies θ(t) = θ₀ cos(√(g/L) t), where θ₀ is the initial angle in radians. As long as θ₀ < 0.2 rad (≈11°), the approximation is accurate to within 1%.

#### Review Questions
1. A spring-mass system has m = 2 kg, k = 8 N/m, and starts from rest at x = 1 m. Find the period and amplitude.
2. Two sound waves of frequencies 256 Hz and 260 Hz interfere. What is the beat frequency?
3. For a pendulum with period 2 seconds, find the pendulum length on Earth (g = 9.8 m/s²).

---

### Trigonometry Identities and Proofs
**Type:** Mixed/Review
**Slug:** trig-identities-proofs
**Estimated time:** 12 min
**Key concepts:** proving identities · algebraic manipulation · substitution techniques
**Summary:** Proving trigonometric identities strengthens algebraic skills and deepens understanding.

#### Strategy for Proving Identities
Simplify the more complex side to match the simpler side. Avoid cross-multiplying or squaring (which can introduce extraneous solutions). Use established identities: Pythagorean, reciprocal, quotient, sum/difference, double/half-angle. Convert everything to sin and cos if stuck. Combine fractions over a common denominator. Factor when possible. Example: prove (1 + cos θ)/sin θ = sin θ/(1 − cos θ). Cross-multiply: (1+cos θ)² = sin²θ · (1 − cos θ)... Actually, don't. Instead, simplify the left side using the Pythagorean identity: multiply numerator and denominator by (1−cos θ): [(1+cos θ)(1−cos θ)] / [sin θ(1−cos θ)] = (1−cos²θ) / [sin θ(1−cos θ)] = sin²θ / [sin θ(1−cos θ)] = sin θ / (1−cos θ). ✓

#### Proving with Sum Formulas
Prove: sin(A+B) + sin(A−B) = 2 sin A cos B. Expand the left side: [sin A cos B + cos A sin B] + [sin A cos B − cos A sin B] = 2 sin A cos B. ✓ These proofs build fluency with the formulas and prepare for integration in calculus (where sum-to-product converts are essential).

#### Proving Double-Angle Identities from Sum Formulas
Prove: cos(2θ) = 2cos²θ − 1. Start with the sum formula cos(2θ) = cos(θ+θ) = cos θ cos θ − sin θ sin θ = cos²θ − sin²θ. Use the Pythagorean identity sin²θ = 1 − cos²θ: cos²θ − (1−cos²θ) = 2cos²θ − 1. ✓ This shows how identities connect and reinforce each other.

#### Proving Inverse Function Properties
Prove: sin⁻¹(x) + cos⁻¹(x) = π/2 for x ∈ [−1, 1]. Let α = sin⁻¹(x), so sin α = x and α ∈ [−π/2, π/2]. Consider β = π/2 − α. Then cos β = cos(π/2 − α) = sin α = x (by the cofunction identity). Since β = π/2 − α and α ∈ [−π/2, π/2], we have β ∈ [0, π]. Thus β = cos⁻¹(x). Therefore, π/2 − α = cos⁻¹(x), so α + cos⁻¹(x) = π/2, i.e., sin⁻¹(x) + cos⁻¹(x) = π/2. ✓

#### Review Questions
1. Prove: tan²θ + 1 = sec²θ.
2. Prove: sin(3θ) = 3 sin θ − 4 sin³θ.
3. Prove: (sin θ + cos θ)² + (sin θ − cos θ)² = 2.

---

### Trigonometric Equations and Inequalities
**Type:** Mixed/Review
**Slug:** trig-equations-inequalities
**Estimated time:** 12 min
**Key concepts:** solving equations graphically · inequalities on unit circle · parametric solutions
**Summary:** Beyond algebraic techniques, graphical and parametric methods solve complex trigonometric inequalities.

#### Graphical Solutions
Graph y = 2 sin x and y = 1 on the same axes. The solutions to 2 sin x = 1 occur where the graphs intersect. On [0, 2π], they meet at x = π/6 and x = 5π/6. For inequalities like 2 sin x > 1, shade the region where the sine curve is above the line y = 1. Graphical methods are slower for competitions but provide intuition and catch algebra mistakes.

#### Solving Inequalities on [0, 2π)
Solve sin x < 1/2. From the unit circle, sin x = 1/2 at x = π/6 and x = 5π/6. In quadrants I and II, sine increases from 0 to 1. So sin x < 1/2 when x ∈ [0, π/6) ∪ (5π/6, 2π). Generalizing to all real numbers: x ∈ (5π/6 + 2πk, π/6 + 2π(k+1)) = (5π/6 + 2πk, π/6 + 2πk + 2π) for integer k. Simplify: x ∈ ∪_k [(−∞, π/6 + 2πk) ∪ (5π/6 + 2πk, ∞)].

#### Parametric Approach for Systems
To solve sin x = cos x on [0, 2π), divide by cos x (valid where cos x ≠ 0): tan x = 1, so x = π/4 or x = π/4 + π = 5π/4. Check: sin(π/4) = √2/2 = cos(π/4) ✓, sin(5π/4) = −√2/2 = cos(5π/4) ✓. When the equation involves multiple trig functions, convert to a single function and solve.

#### Complex Inequalities
Solve cos(2x) > cos x on [0, 2π). Using cos(2x) = 2cos²x − 1: 2cos²x − 1 > cos x, so 2cos²x − cos x − 1 > 0. Factor: (2cos x + 1)(cos x − 1) > 0. The product is positive when both factors are positive or both are negative. Case 1: 2cos x + 1 > 0 and cos x − 1 > 0. This gives cos x > −1/2 and cos x > 1, which is impossible (cos x ≤ 1). Case 2: 2cos x + 1 < 0 and cos x − 1 < 0. This gives cos x < −1/2 and cos x < 1 (always true), so cos x < −1/2. On [0, 2π), this occurs at x ∈ (2π/3, 4π/3).

#### Review Questions
1. Solve cos x ≥ 1/2 on [0, 2π).
2. Solve |sin x| = √3/2 on [0, 2π).
3. Solve tan(x/2) > 1 on [0, 2π).

---

### Trigonometry in Navigation and Surveying
**Type:** Competition Extension
**Slug:** trig-navigation-surveying
**Estimated time:** 10 min
**Key concepts:** bearings · triangulation · angle of elevation/depression
**Summary:** Science Bowl problems often involve navigation bearings, distance measurement, and trigonometric surveying.

#### Bearings and Compass Directions
Bearings are angles measured clockwise from north. North is 0° (or 360°), east is 90°, south is 180°, west is 270°. A bearing of 135° is southeast (between south and east). To convert to standard mathematical angle (counterclockwise from east): θ_math = 90° − bearing. Example: bearing 60° (northeast) → θ_math = 90° − 60° = 30° (standard angle in QI). Displacement vectors in navigation use (east, north) coordinates. If a ship travels 50 km on bearing 120° (southeast), its displacement is Δx = 50 sin(120°) = 50·(√3/2) ≈ 43.3 km east, Δy = 50 cos(120°) = 50·(−1/2) = −25 km south.

#### Triangulation for Distance Measurement
To find the distance across a river without crossing it, surveyors use triangulation. Mark two points A and B on one bank 100 m apart. Measure the angle ∠CAB = 40° and ∠CBA = 60° to a point C on the opposite bank. Using the Law of Sines: AB/sin C = AC/sin B = BC/sin A. Here, C = 180° − 40° − 60° = 80°. So AC/sin 60° = 100/sin 80°, giving AC = 100·sin 60°/sin 80° ≈ 100·0.866/0.985 ≈ 88 m. The height from C perpendicular to AB is h = AC·sin(40°) ≈ 88·0.643 ≈ 57 m, the river width.

#### Angle of Elevation and Depression
From ground level 50 m from a building's base, the angle of elevation to the roof is 35°. The height is h = 50·tan(35°) ≈ 35 m. From the roof, the angle of depression to a point on the ground 100 m away horizontally is θ such that tan θ = 35/100 = 0.35, so θ ≈ 19°. Note: angle of depression from point P to point Q equals the angle of elevation from Q to P (alternate interior angles with parallel horizontal lines).

#### Worked Example: Three-Point Triangulation
A surveyor at point P observes a landmark L at bearing 45° and distance 500 m. Moving 300 m to point Q on bearing 90° (due east) from P, the landmark is now at bearing 350° (nearly north). Find Q's position and verify the distance from Q to L. At P, L is at angle 90° − 45° = 45° in standard coords, so L_x = P_x + 500 cos(45°) ≈ P_x + 354, L_y = P_y + 500 sin(45°) ≈ P_y + 354. At Q (which is 300 m east of P), the bearing to L is 350°, i.e., angle 90° − 350° = −260° ≡ 100° (standard). So L is at distance d from Q at angle 100°: L_x = Q_x + d cos(100°), L_y = Q_y + d sin(100°). Equating and solving: d ≈ 353 m.

#### Review Questions
1. A ship at point A travels 100 km on bearing 60°, then 150 km on bearing 150°. How far is it from the starting point?
2. From two points 200 m apart on a baseline, the angle of elevation to a tower is 30° and 45° respectively. Find the height of the tower.
3. An airplane flies from airport A (origin) on bearing 120° at 500 km/h for 2 hours. Where is it? If another airplane leaves on bearing 210° at 400 km/h for 2 hours, what is the distance between them?

---

### Competition Toss-Up Practice: Trigonometry
**Type:** Competition Extension
**Slug:** comp-toss-up-trig
**Estimated time:** 8 min
**Key concepts:** rapid mental calculation · common tricks · trick avoidance
**Summary:** Science Bowl toss-ups emphasize exact values, special angles, and clever identities.

#### High-Frequency Exact Values
Memorize sin and cos of 0°, 30°, 45°, 60°, 90° by sight. tan(0°) = 0, tan(30°) = 1/√3, tan(45°) = 1, tan(60°) = √3, tan(90°) = undefined. These appear in at least half of trigonometry toss-ups. Toss-ups never ask for decimal approximations—always exact form. Example: "For 10 points, if sin θ = 2/3 and θ is in the first quadrant, what is cos θ?" Answer: √5/3 (from sin²θ + cos²θ = 1 → 4/9 + cos²θ = 1 → cos²θ = 5/9 → cos θ = √5/3 in QI).

#### Trick: Reference Angles
Toss-ups often disguise reference angles: "Find sin(150°)." The naive answer is sometimes −sin(30°), but the correct answer is sin(30°) = 1/2 because 150° is in QII where sine is positive. The reference angle is 180° − 150° = 30°. Trap: confusing which trig functions are positive in each quadrant (All Students Take Calculus: all positive in QI, sin in QII, tan in QIII, cos in QIV).

#### Trick: Coterminal and Periodic Angles
"Evaluate sin(7π/6)." Note: 7π/6 = π + π/6. In QIII, sine is negative, and the reference angle is π/6. So sin(7π/6) = −sin(π/6) = −1/2. Alternatively, 7π/6 + 2π = 19π/6 is coterminal; both have the same sine.

#### Trick: Sum Formulas for Non-Standard Angles
"Find sin(15°)." Recognize 15° = 45° − 30°: sin(15°) = sin(45°−30°) = sin 45° cos 30° − cos 45° sin 30° = (√2/2)(√3/2) − (√2/2)(1/2) = (√6 − √2)/4. A direct calculation would be slow; using sum formulas is essential.

#### Trick: Inverse Function Ranges
"If cos⁻¹(x) = 2π/3, what is x?" Inverse cosine returns angles in [0, π]. Since 2π/3 ∈ [0, π], we compute x = cos(2π/3). In QII, cos is negative: x = −cos(π − 2π/3) = −cos(π/3) = −1/2. Trap: forgetting that cos⁻¹ returns angles in [0, π], not (−π/2, π/2).

#### Worked Toss-Up: "For 10 points, simplify cos⁴θ − sin⁴θ."
Factor: (cos²θ + sin²θ)(cos²θ − sin²θ) = 1·(cos²θ − sin²θ) = cos(2θ). Trap: not recognizing the difference of squares; direct expansion is slow.

#### Review Questions
1. Evaluate tan(5π/12). (Hint: 5π/12 = π/3 + π/12 or π/4 + π/6.)
2. If tan θ = 4/3 and θ is in QIII, find sin θ.
3. Simplify: (1 − cos 2θ) / (1 + cos 2θ).

---
