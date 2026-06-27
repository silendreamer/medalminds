---
id: nsb-lesson-0645
title: "Applying Domain/Range: Real-World Functions"
level: hs
subject: math
topic: functions
subtopic: "Function Notation & Domain/Range"
slug: domain-range-real-world
type: "Application"
estimatedMinutes: 13
keyConcepts: ["contextual domain", "interpreting range", "function modeling"]
summary: "Real applications restrict domain and range based on physical meaning, not just algebraic constraints."
---
#### Setting Up a Contextual Function
A farmer has 200 meters of fencing to enclose a rectangular field along a river (no fencing needed on the river side). If x is the width perpendicular to the river, the length is 200 − 2x. Area A(x) = x(200 − 2x) = 200x − 2x². Algebraically, this is defined for all x, but physically x must be positive and the length must be positive: 200 − 2x > 0 → x < 100. So the contextual domain is (0, 100). The range is (0, 5000] — the maximum area is A(50) = 5000 m².

#### Population Models
A bacterial population grows as P(t) = 1000 · 2^(t/3), where t is hours since start. Domain: t ≥ 0 (time doesn't go backwards in this context). Range: P ≥ 1000 (the population starts at 1000 and only grows). At t = 6: P(6) = 1000 · 2² = 4000 bacteria. The algebraic function is defined for all t, but the model is only valid while the food supply lasts — a typical real-world constraint not captured algebraically.

#### Projectile Height Function
A ball is launched from height 1.5 m with vertical velocity 20 m/s. Height: h(t) = −4.9t² + 20t + 1.5. Domain: 0 ≤ t ≤ time when h = 0. Solving −4.9t² + 20t + 1.5 = 0 gives t ≈ 4.15 s. So contextual domain is [0, 4.15]. Range: [0, h_max]. Vertex at t = 20/(9.8) ≈ 2.04 s: h_max ≈ −4.9(2.04)² + 20(2.04) + 1.5 ≈ 21.9 m. Range: [0, 21.9] approximately.

#### Interpreting Function Values
If C(x) = 50 + 12x gives the cost in dollars for printing x posters, then C(0) = 50 is the fixed setup cost. C(100) = 1250 means printing 100 posters costs $1250. The domain is positive integers (you can't print −3 or 2.7 posters), making this a discrete function on a practical level even if the formula is continuous.

#### Review Questions
1. A box is formed by cutting squares of side x from each corner of a 10×10 cm sheet and folding up the sides. Express volume V as a function of x and state its contextual domain.
2. The contextual domain of a spring's stretch function is [0, 0.3] meters. What does this restriction represent physically?
3. If profit P(x) = −2x² + 80x − 300, what x-values give positive profit?

---
