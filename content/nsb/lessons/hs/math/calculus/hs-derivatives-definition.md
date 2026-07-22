---
id: nsb-lesson-0713
title: "The Derivative: Definition & Rules"
level: hs
subject: math
topic: calculus
subtopic: "Derivatives & Applications"
slug: hs-derivatives-definition
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["derivative", "difference quotient", "power rule", "chain rule"]
summary: "The derivative measures instantaneous rate of change; its formal definition as a limit of slopes connects geometry to algebra."
---
#### The Limit Definition
f'(x) = lim(h→0) [f(x+h) − f(x)] / h. This is the slope of the tangent line at x. For f(x) = x²: [((x+h)²−x²)/h] = (2xh+h²)/h = 2x+h → 2x. So f'(x) = 2x. Memorizing this process explains WHY rules work, not just that they do.

#### Core Differentiation Rules
Power rule: d/dx[xⁿ] = nxⁿ⁻¹. Sum rule: (f+g)' = f'+g'. Constant multiple: (cf)' = cf'. Product rule: (fg)' = f'g + fg'. Quotient rule: (f/g)' = (f'g − fg')/g². Chain rule: d/dx[f(g(x))] = f'(g(x))·g'(x). Key derivatives: d/dx[sin x]=cos x; d/dx[cos x]=−sin x; d/dx[eˣ]=eˣ; d/dx[ln x]=1/x.

#### Chain Rule in Depth
The chain rule handles composition. d/dx[sin(x²)] = cos(x²)·2x. d/dx[e^(3x)] = e^(3x)·3. d/dx[(2x+1)⁵] = 5(2x+1)⁴·2 = 10(2x+1)⁴. Identify the outer function and inner function, differentiate outer (keeping inner intact), multiply by inner derivative.

#### Higher-Order Derivatives
f''(x) = d/dx[f'(x)] (second derivative). f''(x) > 0 → concave up; f''(x) < 0 → concave down. Inflection points where f''(x) = 0 AND concavity changes. Speed = |v(t)|; acceleration = v'(t) = x''(t) for position function x(t).

#### Review Questions
1. Using the limit definition, find f'(x) for f(x) = 3x+1.
2. Differentiate: f(x) = x⁴ − 3x² + 7, g(x) = e^(2x)·sin(x), h(x) = ln(x²+1).
3. Find the equation of the tangent line to f(x) = x³ at x = 2.

---
