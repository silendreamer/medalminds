---
id: nsb-lesson-0682
title: "The Law of Sines"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: law-of-sines
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["sine rule", "ambiguous case", "area formula"]
summary: "The Law of Sines relates the sides and angles of any triangle: a/sin A = b/sin B = c/sin C."
---
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
