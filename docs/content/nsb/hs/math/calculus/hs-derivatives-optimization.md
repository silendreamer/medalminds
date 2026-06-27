---
id: nsb-lesson-0714
title: "Derivatives in Context: Optimization & Related Rates"
level: hs
subject: math
topic: calculus
subtopic: "Derivatives & Applications"
slug: hs-derivatives-optimization
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["critical points", "first/second derivative test", "optimization", "related rates"]
summary: "Derivatives identify where functions have maxima and minima, enabling optimization problems and related-rate calculations central to both calculus and competition math."
---
#### Finding Critical Points
Critical points occur where f'(x) = 0 or f'(x) is undefined. First derivative test: if f' changes + to − at c, local max; − to +, local min. Second derivative test: if f'(c) = 0 and f''(c) > 0, local min; f''(c) < 0, local max; f''(c) = 0, inconclusive.

#### Optimization Framework
1. Write the objective function (what to maximize/minimize). 2. Express in one variable using any constraint. 3. Find derivative, set = 0. 4. Verify using second derivative test or endpoints. Example: maximize area of rectangle with perimeter 40. A = xy, constraint 2x+2y = 40 → y = 20−x. A(x) = x(20−x) = 20x−x². A'(x) = 20−2x = 0 → x = 10, y = 10 (square). A''= −2 < 0 → maximum. Max area = 100.

#### Related Rates
Differentiate both sides of an equation with respect to time t. Example: ladder problem. A 10m ladder leans against a wall; bottom slides away at 2 m/s. How fast is top sliding down when bottom is 6m from wall? x²+y² = 100. Differentiate: 2x(dx/dt)+2y(dy/dt) = 0. At x = 6: y = 8. 2(6)(2)+2(8)(dy/dt) = 0 → dy/dt = −3/2 m/s (falling).

#### Mean Value Theorem
If f is continuous on [a,b] and differentiable on (a,b), then there exists c ∈ (a,b) where f'(c) = (f(b)−f(a))/(b−a). Geometrically: the tangent line at some interior point is parallel to the secant line. Rolle's Theorem: if f(a) = f(b), then f'(c) = 0 for some c.

#### Review Questions
1. Find the dimensions of the rectangle of area 100 with minimum perimeter.
2. A spherical balloon is inflated so its volume increases at 50 cm³/s. How fast is the radius increasing when r = 5 cm?
3. State the Mean Value Theorem and give an example of a function that satisfies it on [0, 2].

---
