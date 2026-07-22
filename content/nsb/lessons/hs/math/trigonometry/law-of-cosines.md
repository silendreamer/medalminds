---
id: nsb-lesson-0683
title: "The Law of Cosines"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: law-of-cosines
type: "Core Understanding"
estimatedMinutes: 15
keyConcepts: ["cosine rule", "SAS and SSS cases", "generalization"]
summary: "The Law of Cosines generalizes the Pythagorean theorem to any triangle: c² = a² + b² − 2ab cos C."
---
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
