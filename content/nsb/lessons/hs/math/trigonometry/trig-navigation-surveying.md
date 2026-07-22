---
id: nsb-lesson-0690
title: "Trigonometry in Navigation and Surveying"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: trig-navigation-surveying
type: "Competition Extension"
estimatedMinutes: 10
keyConcepts: ["bearings", "triangulation", "angle of elevation/depression"]
summary: "Science Bowl problems often involve navigation bearings, distance measurement, and trigonometric surveying."
---
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
