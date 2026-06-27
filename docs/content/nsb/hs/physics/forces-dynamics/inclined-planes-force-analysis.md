---
id: nsb-lesson-0826
title: "Inclined Planes: Force Analysis"
level: hs
subject: physics
topic: forces-dynamics
subtopic: "Friction, Normal Force & Inclined Planes"
slug: inclined-planes-force-analysis
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["inclined plane", "component resolution", "angle of incline"]
summary: "Inclined plane problems resolve gravity into components parallel and perpendicular to the surface, then apply Newton's Second Law along and normal to the incline."
---
#### Tilted Coordinate System
The key trick: align coordinate axes WITH the incline. Let x point down the slope, y point perpendicular out of the surface. Now resolve gravity:
- mg·sinθ → along the slope (down the incline, positive x direction)
- mg·cosθ → perpendicular to slope (into the surface, negative y direction)

Normal force N acts in the positive y direction. On a frictionless surface: ΣFy = 0 → N = mg·cosθ. Net force along slope: ΣFx = mg·sinθ → a = g·sinθ (frictionless incline).

#### With Friction
Friction opposes motion: if block slides down, friction acts up the incline.
- ΣFy = 0 → N = mg·cosθ
- fk = μkN = μkmg·cosθ
- ΣFx = mg·sinθ − fk = ma → a = g(sinθ − μkcosθ)

The block slides if mg·sinθ > μsmg·cosθ, i.e., tanθ > μs. The angle of incline where the block just starts to slide: θ = arctan(μs).

#### Pushed Up the Incline
If an applied force F pushes the block up the incline, friction now acts down (opposing upward motion):
- ΣFx = F − mg·sinθ − μkmg·cosθ = ma

#### Worked Example
A 5 kg block on a 30° incline, μk = 0.2. Find acceleration (sliding down).
- N = 5(9.8)cos30° = 42.4 N
- fk = 0.2(42.4) = 8.48 N (up slope)
- ΣF = 5(9.8)sin30° − 8.48 = 24.5 − 8.48 = 16.02 N
- a = 16.02/5 = 3.2 m/s² (down slope)

#### Review Questions
1. A 3 kg block slides down a frictionless 45° ramp. What is its acceleration?
2. A 6 kg block is on a 25° incline with μs = 0.3. Does the block slide? (Compare mg·sinθ with μs·mg·cosθ)
3. A 4 kg block is pushed up a 20° incline by a 40 N force along the surface. μk = 0.25. Find the acceleration.

---
