# HS Math — Geometry
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Geometric Proofs & Congruence

### Foundations of Geometric Proof
**Type:** Core Understanding
**Slug:** geometric-proof-foundations
**Estimated time:** 13 min
**Key concepts:** axiomatic system · two-column proof · deductive reasoning
**Summary:** Geometric proof converts intuition into rigorous deductive argument — understanding the structure unlocks all proof-based geometry.

#### Definitions, Postulates, and Theorems
Geometry rests on an axiomatic system. **Definitions** establish what terms mean precisely (e.g., "a midpoint divides a segment into two equal parts"). **Postulates** (axioms) are accepted without proof (e.g., "through any two points there is exactly one line"). **Theorems** are statements proven from definitions and postulates using deductive reasoning. The chain is: postulates → proven theorems → more theorems.

#### Structure of a Two-Column Proof
Left column: **Statements** (what is claimed at each step). Right column: **Reasons** (the justification: definition, postulate, or previously proven theorem). The proof moves logically from the given information to the conclusion. Each step must be fully justified — you cannot skip steps. Common reasons: "given," "definition of midpoint," "reflexive property," "SAS congruence postulate," "CPCTC."

#### Properties Used in Proofs
Reflexive: a = a (a segment or angle equals itself). Symmetric: if a = b then b = a. Transitive: if a = b and b = c then a = c. Addition/Subtraction Properties: equals added to equals are equal. Substitution: if a = b, replace a with b anywhere. These algebraic properties apply to geometric measurements (lengths, angle measures).

#### CPCTC
"Corresponding Parts of Congruent Triangles are Congruent" — this is the final step in many triangle proofs. First prove triangles congruent (via SSS, SAS, ASA, AAS), then conclude that specific corresponding sides or angles are congruent. CPCTC is not a congruence postulate — it follows from it.

#### Proof by Contradiction (Indirect Proof)
Assume the opposite of what you want to prove. Derive a contradiction (an impossible conclusion). Conclude the assumption was false, so the original statement must be true. Example: to prove "if a triangle has two equal angles, it has two equal sides" by contradiction — assume the sides are unequal and show this forces the angles to be unequal, contradicting the hypothesis.

#### Review Questions
1. What is the difference between a postulate and a theorem?
2. In a two-column proof, what goes in the right column?
3. Why is CPCTC not a reason you can use before proving triangles congruent?

---

### Triangle Congruence: SSS, SAS, ASA, AAS
**Type:** Core Understanding
**Slug:** triangle-congruence-postulates
**Estimated time:** 13 min
**Key concepts:** SSS · SAS · ASA · AAS · congruence shortcuts
**Summary:** These four congruence shortcuts tell you when triangles are guaranteed to be identical — know when each applies and when it doesn't.

#### SSS (Side-Side-Side)
If all three pairs of corresponding sides are equal, the triangles are congruent. SSS is the most intuitive: a triangle's shape is fully determined by its three side lengths (up to reflection). No angle information is needed. Given: AB = DE, BC = EF, AC = DF → △ABC ≅ △DEF by SSS.

#### SAS (Side-Angle-Side)
Two sides and the **included** angle (between those sides) determine a triangle. The angle must be between the two sides — this is crucial. SSA (side-side-angle, where the angle is not included) does NOT prove congruence — it's the "ambiguous case." SAS: given AB = DE, ∠B = ∠E, BC = EF → △ABC ≅ △DEF.

#### ASA and AAS
ASA (Angle-Side-Angle): two angles and the included side. AAS (Angle-Angle-Side): two angles and a non-included side. Note: if two angles of a triangle are known, the third is determined (angles sum to 180°), so AAS effectively uses all three angles — AAS and ASA are very similar in power. They're not identical because the "side" position differs.

#### HL (Hypotenuse-Leg) for Right Triangles
A special case: if two right triangles have equal hypotenuses and one pair of equal legs, they're congruent. HL is a theorem (provable from other postulates), not a separate postulate. It only applies when you know both triangles are right triangles.

#### What Doesn't Work
SSA (not a congruence criterion — two different triangles can satisfy SSA). AAA (proves similarity, not congruence — triangles could be different sizes).

#### Review Questions
1. △ABC has AB = 5, BC = 7, AC = 9. △DEF has DE = 5, EF = 7, DF = 9. Are they congruent? By what postulate?
2. What is wrong with using SSA as a congruence criterion?
3. In a proof, you've shown △PQR ≅ △XYZ by ASA. A student claims ∠P = ∠X. Is this valid and why?

---

### Applying Congruence in Proofs
**Type:** Application
**Slug:** congruence-proofs-applied
**Estimated time:** 14 min
**Key concepts:** proof strategy · CPCTC · auxiliary lines
**Summary:** Execute multi-step triangle congruence proofs using strategic reasoning and standard proof techniques.

#### Worked Proof: Parallel Lines and Congruence
Given: AB ∥ CD, AB = CD. Prove: AC = BD (where ABDC is a trapezoid). 

Draw diagonal BC. 
1. AB ∥ CD → ∠ABC = ∠DCB (alternate interior angles, AB ∥ CD). [Given, Alt. Int. Angles Theorem]
2. AB = CD. [Given]
3. BC = BC. [Reflexive Property]
4. △ABC ≅ △DCB. [SAS: steps 2, 1, 3]
5. AC = DB. [CPCTC]

#### Auxiliary Lines
Sometimes you must draw a line not in the original figure to create triangles to work with. This is called an **auxiliary line**. It must be justified: "draw line through A parallel to BC" (justified by the Parallel Postulate). Auxiliary lines are a powerful proof strategy — when stuck, consider what line would create the triangles or angles you need.

#### Overlapping Triangles
Many proofs involve triangles sharing sides or angles. If △ABD and △CBD overlap, BD is a shared side (use Reflexive Property). If ∠ACD is shared by two triangles, note it explicitly. The shared element is often the key to applying a congruence postulate.

#### Isoceles Triangle Theorem
If two sides of a triangle are equal (isosceles), then the base angles are equal. Proof strategy: draw the angle bisector of the apex angle. It creates two triangles with SAS (two equal sides + bisected angle), so base angles are equal by CPCTC. The converse is also true: equal base angles → equal sides.

#### Review Questions
1. Given: M is the midpoint of both AC and BD (a quadrilateral's diagonals). Prove: AB = CD.
2. In △ABC, AB = AC. D is the midpoint of BC. Prove AD ⊥ BC.
3. What auxiliary construction would help prove that the diagonals of a rectangle are equal?

---

### Congruence and Proof Quick Review
**Type:** Mixed/Review
**Slug:** congruence-proof-quick-review
**Estimated time:** 9 min
**Key concepts:** congruence criteria · proof structure · CPCTC
**Summary:** Rapid synthesis of triangle congruence and proof skills.

#### Quick Classification
Given information about two triangles — which congruence criterion (if any) applies?
- Two sides of △ABC equal two sides of △DEF, and the angles between those sides are equal: **SAS**
- All three corresponding angles equal: **AAA** — similarity only, NOT congruence
- Two angles and the side between them: **ASA**
- Right triangles with equal hypotenuses and one equal leg: **HL**
- Three corresponding sides equal: **SSS**
- Two sides and a non-included angle: **Not sufficient** (SSA fails)

#### Proof Completion
Fill in the reason: "AB = CD (given), ∠A = ∠D (given), AD = DA (_?_)." The blank is: **Reflexive Property**. This is extremely common in proofs — the shared segment equals itself.

#### CPCTC Usage
CPCTC can only be invoked AFTER the triangles are proven congruent. The logic: prove congruence → conclude corresponding parts are equal. Never use CPCTC as a step toward proving congruence (circular reasoning).

#### Review Questions
1. List the four valid triangle congruence criteria and state which parts must be corresponding.
2. In a proof, a student writes CPCTC before establishing congruence. Identify the error.
3. Two triangles have angles 40°, 60°, 80° each. Are they congruent? What else would you need to know?

---

## Subtopic: Similarity & Right Triangle Geometry

### Triangle Similarity: AA, SAS, SSS
**Type:** Core Understanding
**Slug:** triangle-similarity-criteria
**Estimated time:** 13 min
**Key concepts:** AA similarity · scale factor · proportional sides
**Summary:** Similar triangles have the same shape but possibly different sizes — they share angle measures and have proportional sides.

#### Definition of Similarity
Two triangles are similar (~) if their corresponding angles are equal AND their corresponding sides are proportional. The ratio of corresponding sides is the **scale factor**. If △ABC ~ △DEF with scale factor k: DE = k·AB, EF = k·BC, DF = k·AC, and ∠A = ∠D, ∠B = ∠E, ∠C = ∠F.

#### AA (Angle-Angle) Criterion
If two angles of one triangle equal two angles of another, the triangles are similar. (The third angles are automatically equal since all three sum to 180°.) AA is the most commonly used similarity criterion. Example: two triangles share a vertex angle, and one pair of base angles is equal → AA → similar.

#### SAS and SSS Similarity
SAS similarity: if two sides are proportional AND the included angles are equal, the triangles are similar. SSS similarity: if all three pairs of sides are proportional, the triangles are similar. These mirror congruence criteria but use proportionality instead of equality.

#### Applications of Similarity
Similar triangles appear constantly: parallel lines cut by transversals create similar triangles, altitude to the hypotenuse creates similar triangles, and shadow/height problems use similarity. Key setup: identify the two triangles, establish which angles are equal, write the proportion, solve.

#### Proportionality Theorems
Triangle Proportionality Theorem: if a line is parallel to one side of a triangle and intersects the other two sides, it divides them proportionally. If DE ∥ BC in △ABC, then AD/DB = AE/EC.

Midsegment Theorem: the segment connecting midpoints of two sides of a triangle is parallel to the third side and half its length.

#### Review Questions
1. △ABC has angles 50°, 70°, 60°. △DEF has angles 50°, 70°, 60° with DE = 2·AB. What is the scale factor?
2. If △PQR ~ △XYZ and PQ/XY = 3/5, find QR if YZ = 15.
3. An 8-foot pole casts a 6-foot shadow. A tree casts a 30-foot shadow at the same time. How tall is the tree?

---

### Right Triangle Trigonometry and the Pythagorean Theorem
**Type:** Core Understanding
**Slug:** right-triangle-trig-pythagoras
**Estimated time:** 14 min
**Key concepts:** Pythagorean theorem · SOH-CAH-TOA · special right triangles
**Summary:** Right triangles are the foundation of all trigonometry — master the Pythagorean theorem, special triangles, and basic trig ratios.

#### The Pythagorean Theorem
For a right triangle with legs a, b and hypotenuse c: a² + b² = c². The converse is also a theorem: if a² + b² = c², the triangle is a right triangle. Common Pythagorean triples: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), and their multiples (6, 8, 10), (9, 12, 15), etc. Recognizing these saves time in competition.

#### Trigonometric Ratios
In a right triangle with angle θ: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent. Mnemonic: **SOH-CAH-TOA**. For the other three ratios: csc = 1/sin, sec = 1/cos, cot = 1/tan. To find a side: set up the ratio with the known angle and two sides (one known, one unknown), then solve.

#### Special Right Triangles
45°-45°-90°: legs are equal (ratio 1:1:√2). If leg = x, hypotenuse = x√2. sin 45° = cos 45° = 1/√2 = √2/2.
30°-60°-90°: sides in ratio 1:√3:2 (short leg : long leg : hypotenuse). If short leg = x: long leg = x√3, hypotenuse = 2x. sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3 = √3/3. sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3.

#### Altitude to the Hypotenuse
Drawing the altitude from the right angle to the hypotenuse creates three similar triangles. If the legs are a and b, hypotenuse c, and altitude h: h² = pq where p and q are the two segments of the hypotenuse (p + q = c). Also: a² = p·c and b² = q·c (geometric mean relationships).

#### Solving Right Triangles
"Solving" means finding all missing sides and angles. Strategy: (1) Use trig ratios with known angle to find sides. (2) Use Pythagorean theorem to find missing side. (3) Use inverse trig (arcsin, arccos, arctan) to find missing angles. Always verify: angles should sum to 90° (excluding the right angle).

#### Review Questions
1. A 13-foot ladder leans against a wall, touching it at 12 feet high. How far is the base from the wall?
2. In a 30-60-90 triangle, the hypotenuse is 10. Find both legs.
3. From a 50-meter height, an observer looks down at 35° below horizontal. How far away (horizontally) is the object?

---

### Applied Similarity and Right Triangle Problems
**Type:** Application
**Slug:** similarity-right-triangle-applications
**Estimated time:** 13 min
**Key concepts:** indirect measurement · geometric mean · similar triangle setup
**Summary:** Apply similarity and right triangle relationships to solve measurement and proof problems step by step.

#### Indirect Measurement with Shadows
A surveyor wants to find the height of a cliff. She stands 50 m from the base, measures the angle of elevation at 32°. Height = 50 · tan(32°) ≈ 50 · 0.6249 ≈ 31.2 m. Alternatively, using similar triangles: set up two similar triangles with a known reference (a measuring rod of known height and measured shadow length).

#### Geometric Mean Applications
The altitude h to the hypotenuse of a right triangle is the geometric mean of the two hypotenuse segments: h = √(pq). If p = 4 and q = 9, then h = √36 = 6. The geometric mean of two numbers a and b is √(ab) — it appears in right triangle altitude problems and in proportions.

In proportions: if a/b = b/c, then b = √(ac) is the geometric mean of a and c. Science Bowl sometimes frames this as "find the geometric mean of 5 and 20" → √100 = 10.

#### Map Scale Problems
A map uses scale 1:50,000 (1 cm = 500 m). Two cities are 4.3 cm apart on the map. Actual distance: 4.3 × 500 = 2150 m = 2.15 km. Map problems use ratio-proportion directly from similarity: (map distance)/(map scale) = (actual distance)/(1).

#### Angle of Elevation and Depression
Angle of elevation: measured upward from horizontal to a point above. Angle of depression: measured downward from horizontal to a point below. They form alternate interior angles when the observer and object lines are parallel, so elevation angle = depression angle in symmetric setups.

Problem: From a tower 80 m tall, the angle of depression to a boat is 28°. Distance from tower base to boat: tan(28°) = 80/d → d = 80/tan(28°) ≈ 80/0.5317 ≈ 150.5 m.

#### Review Questions
1. A pole 6 m tall casts a 4 m shadow. A nearby building casts a 30 m shadow. How tall is the building?
2. In right triangle ABC (right angle at C), altitude CD is drawn to hypotenuse AB. If AD = 3 and DB = 12, find CD and AC.
3. Two buildings are 40 m apart. From the top of the shorter building (30 m), the angle of elevation to the top of the taller building is 20°. Find the height of the taller building.

---

### Right Triangle and Similarity Review
**Type:** Mixed/Review
**Slug:** right-triangle-similarity-review
**Estimated time:** 8 min
**Key concepts:** Pythagorean triples · similarity ratios · trig ratios
**Summary:** Speed drill on Pythagorean theorem, special triangles, similarity, and basic trig.

#### Quick Drills
Find the hypotenuse: legs 5 and 12. Answer: 13 (Pythagorean triple).
Find the missing leg: hypotenuse 25, one leg 24. Answer: 7 (check: 7²+24²=49+576=625=25²).
30-60-90: hypotenuse = 14. Short leg = 7, long leg = 7√3.
45-45-90: leg = 6. Hypotenuse = 6√2.
Similarity ratio 3:5. If one perimeter is 24, find the other. Perimeters scale by same ratio: 3/5 = 24/x → x = 40.

#### Trig Value Recall
sin 30° = ½, cos 30° = √3/2, tan 30° = √3/3.
sin 45° = cos 45° = √2/2, tan 45° = 1.
sin 60° = √3/2, cos 60° = ½, tan 60° = √3.
sin 90° = 1, cos 90° = 0, sin 0° = 0, cos 0° = 1. Know these by heart.

#### Similarity Proportions
In △ABC ~ △DEF (same order), AB/DE = BC/EF = AC/DF = k (scale factor). Area scales by k². Volume of similar 3D figures scales by k³. If linear scale = 3/4, area scale = 9/16, volume scale = 27/64.

#### Review Questions
1. Two similar triangles have corresponding sides 8 and 12. What is the ratio of their areas?
2. In a right triangle, one acute angle is 55°. Find the other acute angle and use trig to find the side opposite 55° if the hypotenuse is 20.
3. The legs of a right triangle are in ratio 3:4. The hypotenuse is 25. Find the legs.

---

## Subtopic: Circles & Coordinate Geometry

### Circle Theorems
**Type:** Core Understanding
**Slug:** circle-theorems
**Estimated time:** 14 min
**Key concepts:** inscribed angle theorem · central angle · arc · chord · tangent
**Summary:** A circle's angle and arc relationships follow elegant theorems that appear repeatedly in geometry and competition math.

#### Central and Inscribed Angles
A **central angle** has its vertex at the center; its measure equals the intercepted arc. An **inscribed angle** has its vertex on the circle; its measure is **half** the intercepted arc. So an inscribed angle is always half the central angle that intercepts the same arc. Consequence: all inscribed angles that intercept the same arc are equal.

Inscribed angle in a semicircle (intercepting a 180° arc): the angle is 90°. This is Thales' theorem: any triangle inscribed in a circle with one side as the diameter is a right triangle.

#### Angles Formed by Chords, Secants, and Tangents
Angle formed by two chords intersecting inside a circle = half the sum of the two intercepted arcs: ∠1 = (arc₁ + arc₂)/2.

Angle formed by two secants (or secant and tangent, or two tangents) from an external point = half the difference of the intercepted arcs: ∠ = (far arc − near arc)/2.

#### Chord, Secant, and Tangent Length Relationships
Two chords intersecting inside: (AE)(EB) = (CE)(ED) — products of segments are equal (power of a point).
Two secants from external point: (whole₁)(external₁) = (whole₂)(external₂).
Tangent-secant from external point: tangent² = (whole secant)(external secant). If tangent length is t and secant (whole) = s with external segment e: t² = s·e.

#### Circle Equation
Standard form: (x−h)² + (y−k)² = r², center (h, k), radius r. General form: x² + y² + Dx + Ey + F = 0. To convert: complete the square in both x and y.

Example: x² + y² − 6x + 4y − 3 = 0. Complete: (x−3)² − 9 + (y+2)² − 4 − 3 = 0 → (x−3)² + (y+2)² = 16. Center (3, −2), radius 4.

#### Arc Length and Sector Area
Arc length = (θ/360°)·2πr (for central angle θ in degrees). Sector area = (θ/360°)·πr². In radians: arc length = rθ, sector area = (1/2)r²θ.

#### Review Questions
1. An inscribed angle intercepts an arc of 140°. What is the angle's measure?
2. Two chords intersect inside a circle. The segments of one chord are 4 and 9. The external segment of the other is 3. Find the full second chord length.
3. Find the center and radius: x² + y² + 8x − 2y + 1 = 0.

---

### Coordinate Geometry: Distance, Midpoint, Slope
**Type:** Core Understanding
**Slug:** coordinate-geometry-foundations
**Estimated time:** 12 min
**Key concepts:** distance formula · midpoint formula · slope · equations of lines
**Summary:** Coordinate geometry translates geometric figures into algebra — master the fundamental formulas that underpin analytic geometry.

#### Distance Formula
The distance between (x₁, y₁) and (x₂, y₂) is √[(x₂−x₁)² + (y₂−y₁)²]. This is just the Pythagorean theorem applied to coordinates. To find whether three points form a right triangle: compute all three distances, check if a² + b² = c².

#### Midpoint Formula
The midpoint of a segment with endpoints (x₁, y₁) and (x₂, y₂) is ((x₁+x₂)/2, (y₁+y₂)/2) — average the coordinates. To find an endpoint given the midpoint: use midpoint = average, set up and solve for the unknown coordinate.

#### Slope
Slope m = (y₂−y₁)/(x₂−x₁) = rise/run. Parallel lines have equal slopes. Perpendicular lines have slopes that are negative reciprocals: m₁·m₂ = −1. A horizontal line has slope 0; a vertical line has undefined slope.

#### Equations of Lines
Slope-intercept: y = mx + b. Point-slope: y − y₁ = m(x − x₁). Standard form: Ax + By = C. The equation of a line through (3, 5) with slope 2: y − 5 = 2(x − 3) → y = 2x − 1.

Distance from point (x₀, y₀) to line Ax + By + C = 0: d = |Ax₀ + By₀ + C| / √(A²+B²). This formula is high-yield for competition math.

#### Coordinate Proof Strategy
Place figures on coordinate axes strategically (e.g., put one vertex at the origin, one side along an axis) to simplify calculations. Use the distance, midpoint, and slope formulas to prove geometric properties algebraically. This is often faster than synthetic proof.

#### Review Questions
1. Find the distance between (−3, 4) and (5, −2).
2. The midpoint of AB is (2, 7) and A = (−1, 3). Find B.
3. Find the equation of the line perpendicular to y = 3x + 1 that passes through (6, 2).

---

### Circles and Coordinate Geometry: Competition Problems
**Type:** Competition Extension
**Slug:** circles-coordinate-competition
**Estimated time:** 7 min
**Key concepts:** power of a point · circle equation · intersecting circles
**Summary:** High-yield circle and coordinate geometry for Science Bowl competition — the problem types that appear most frequently.

#### Power of a Point
For any point P inside or outside a circle, the product of the signed lengths from P to the two intersection points with any line through P is constant. Inside: (PA)(PB) = (PC)(PD) for any two chords. Outside: (PA)(PB) = (PC)(PD) for any two secants, or tangent² = secant·external. This constant is the "power" of the point. A point on the circle has power 0.

#### Toss-Up Style Problems
"For 10 points — a tangent from external point P has length 8, and a secant from P has an external segment of 4. Find the full length of the secant." → 8² = 4·L → 64 = 4L → L = 16.

"For 10 points — a chord is 8 cm long and is 3 cm from the center of a circle. Find the radius." → The perpendicular from the center bisects the chord. Half-chord = 4. r² = 4² + 3² = 25 → r = 5.

#### Intersecting Circles
Two circles intersect if the distance between centers d satisfies |r₁ − r₂| < d < r₁ + r₂. They are tangent externally if d = r₁ + r₂ (one point of intersection), tangent internally if d = |r₁ − r₂|. Determining the type of relationship: compare d to the sum and difference of radii.

#### Coordinate Geometry Bowl Traps
- "The midpoint is given — find the other endpoint" (use midpoint formula backward, not forward).
- "Prove ABCD is a parallelogram" in coordinate geometry: show both pairs of opposite sides have equal slope (parallel) AND equal length. Alternatively, show diagonals bisect each other.

#### Review Questions
1. Two chords intersect inside a circle. One has segments 3 and 12; the other has one segment of length 9. Find the other segment.
2. Find the intersection points of x² + y² = 25 and y = x + 1.
3. Determine whether the circles (x−1)² + (y−2)² = 9 and (x−5)² + (y−2)² = 4 intersect.

---

### Geometry Synthesis Review
**Type:** Mixed/Review
**Slug:** geometry-synthesis-review
**Estimated time:** 9 min
**Key concepts:** all geometry topics · coordinate geometry · circle theorems
**Summary:** Full geometry synthesis — cover congruence, similarity, circles, and coordinate geometry together in Science Bowl competition format.

#### Speed Recall
Inscribed angle = half the arc it intercepts.
Tangent to circle is perpendicular to radius at the point of tangency.
Sum of interior angles of n-gon = (n−2)·180°.
Exterior angle of a triangle = sum of the two non-adjacent interior angles.
Parallel lines cut by a transversal: alternate interior angles are equal; co-interior angles are supplementary.

#### Coordinate Proof: Rectangle Diagonals
Vertices: A(0,0), B(a,0), C(a,b), D(0,b). Diagonal AC: from (0,0) to (a,b), midpoint = (a/2, b/2). Diagonal BD: from (a,0) to (0,b), midpoint = (a/2, b/2). Equal midpoints → diagonals bisect each other. Both diagonals have length √(a²+b²) — equal lengths. A rectangle's diagonals bisect each other and are equal.

#### Mixed Quick Problems
What is the central angle corresponding to an inscribed angle of 35°? → 70°.
In △ABC ~ △DEF with ratio 5:3, area of △ABC = 50. Area of △DEF = ? → (3/5)² × 50 = 9/25 × 50 = 18.
Point (4, 7) is equidistant from (1, 3) and (7, k). Find k. → Distances equal: √(9+16) = √(9+(k−7)²) → 25 = 9 + (k−7)² → (k−7)² = 16 → k = 11 or k = 3.

#### Review Questions
1. Find the area of the triangle with vertices (0,0), (6,0), (3,8).
2. A quadrilateral has vertices A(0,0), B(4,0), C(5,3), D(1,3). What type of quadrilateral is it? Justify.
3. An arc of 120° has length 8π. What is the circle's radius?

---

## Subtopic: Transformational Geometry

### Rigid Motions: Translations, Reflections, Rotations
**Type:** Core Understanding
**Slug:** rigid-motions-translations-reflections-rotations
**Estimated time:** 13 min
**Key concepts:** isometry · translation vector · reflection line · rotation center
**Summary:** Rigid motions (isometries) preserve distances and angles — they move figures without changing their shape or size.

#### What Is an Isometry?
A transformation of the plane is an **isometry** if it preserves distances (and hence all angles and shapes). The three basic isometries are translation, reflection, and rotation. A fourth, glide reflection (translate then reflect over the line of translation), is also an isometry. Any isometry is a composition of at most three reflections.

#### Translations
A translation slides every point by the same vector (Δx, Δy). Point (x, y) → (x + Δx, y + Δy). Notation: T_(Δx, Δy). Translations preserve orientation (right-hand turns remain right-hand turns). Two reflections over parallel lines = a translation with vector twice the distance between the lines.

#### Reflections
Reflection over y-axis: (x, y) → (−x, y). Over x-axis: (x, y) → (x, −y). Over y = x: (x, y) → (y, x). Over y = −x: (x, y) → (−y, −x). Over horizontal line y = k: (x, y) → (x, 2k−y). Over vertical line x = h: (x, y) → (2h−x, y). Reflections reverse orientation.

#### Rotations
Rotation by 90° counterclockwise about origin: (x, y) → (−y, x). By 180°: (x, y) → (−x, −y). By 270° CCW (= 90° CW): (x, y) → (y, −x). Two reflections over intersecting lines = a rotation about their intersection point, by twice the angle between the lines.

#### Compositions of Isometries
Any composition of isometries is an isometry. Compositions of two reflections: if the reflection lines are parallel → translation; if they intersect → rotation. A composition of an odd number of reflections reverses orientation; even number preserves orientation.

#### Review Questions
1. Reflect (3, −5) over the line y = x.
2. Rotate (4, 2) by 90° counterclockwise about the origin.
3. A shape is reflected over x = 2 then over x = 7. What single transformation is equivalent?

---

### Dilations and Similarity Transformations
**Type:** Core Understanding
**Slug:** dilations-similarity-transformations
**Estimated time:** 12 min
**Key concepts:** dilation · scale factor · center of dilation · similarity transformation
**Summary:** Dilations scale figures while preserving shape — understanding them unifies similarity and transformational geometry.

#### What Is a Dilation?
A dilation with center O and scale factor k maps each point P to a point P' on ray OP such that OP' = k·OP. If k > 1: enlargement. If 0 < k < 1: reduction. If k < 0: the image is on the opposite side of O (equivalent to dilation by |k| followed by a 180° rotation about O). The center O maps to itself.

#### Coordinate Dilation
Dilation about the origin by factor k: (x, y) → (kx, ky). Dilation about point (h, k_) by scale factor k: translate so (h, k_) → origin, dilate, translate back. Result: (x, y) → (h + k(x−h), k_ + k(y−k_)).

#### Properties of Dilations
- Parallel lines map to parallel lines (or the same line)
- Angles are preserved (dilations are conformal)
- Lengths scale by |k|; areas scale by k²
- A dilation is NOT an isometry (unless |k| = 1)

#### Similarity Transformation
A similarity transformation is a composition of an isometry and a dilation. Two figures are similar if and only if one is the image of the other under a similarity transformation. This gives a transformation-based definition of similarity that connects to the angle-side criteria.

#### Finding the Center and Scale Factor
Given an original and image triangle, find the center of dilation: draw lines through corresponding vertices. They meet at the center of dilation. Scale factor = (side length of image)/(corresponding side length of original). Verify with another pair of sides.

#### Review Questions
1. Triangle ABC has vertices A(2,2), B(4,2), C(2,6). It is dilated about the origin by factor 3. Find the image vertices.
2. The image of a figure after dilation has area 36 cm². The original had area 4 cm². What is the scale factor?
3. Two similar pentagons have perimeters 30 and 50. What is the ratio of their areas?

---

### Transformations: Applied Problem Solving
**Type:** Application
**Slug:** transformations-applied-problems
**Estimated time:** 12 min
**Key concepts:** composition of transformations · symmetry · transformation identification
**Summary:** Apply transformational reasoning to identify symmetries, compose transformations, and solve geometry problems.

#### Identifying Symmetry
A figure has **line symmetry** if reflection over some line maps it to itself. A regular n-gon has n lines of symmetry. A figure has **rotational symmetry** of order n if rotation by 360°/n maps it to itself. A regular hexagon has rotational symmetry of order 6 (60° rotations). Point symmetry is rotational symmetry of order 2 (180° rotation).

#### Composition Problem
Reflect △ABC over the line x = 1, then over the line x = 4. These are parallel vertical lines 3 units apart. The composition is a translation of 2×3 = 6 units to the right (in the direction perpendicular to the lines, away from the first and toward the second). Translation vector: (6, 0).

#### Transformation Identification from Image
Given an original and image: (1) If orientation preserved and one fixed point → rotation. (2) If orientation preserved and no fixed point → translation. (3) If orientation reversed and exactly one line of fixed points → reflection. (4) If orientation reversed and no fixed points → glide reflection. Check orientation by seeing if a clockwise-oriented triangle remains clockwise (preserved) or becomes counterclockwise (reversed).

#### Tessellations
A tessellation is a tiling of the plane with no gaps or overlaps. Any triangle and any quadrilateral can tessellate. Of the regular polygons, only equilateral triangles (360°/60°=6), squares (4), and regular hexagons (3) tessellate the plane. This is because the interior angles must divide evenly into 360°.

#### Review Questions
1. The vertices of △ABC are A(1,2), B(3,2), C(2,5). Apply reflection over the y-axis, then rotation 90° CCW about the origin. Find the final image of B.
2. A figure is reflected over y = 3, then over y = 7. Describe the equivalent single transformation.
3. Why can a regular pentagon not tessellate the plane? (The interior angle of a regular pentagon is 108°.)

---

### Transformational Geometry Review
**Type:** Mixed/Review
**Slug:** transformational-geometry-review
**Estimated time:** 8 min
**Key concepts:** isometry rules · dilation · composition · symmetry
**Summary:** Fast synthesis review of all transformational geometry topics.

#### Transformation Rules Quick Reference
Translation (a,b): (x,y) → (x+a, y+b).
Reflection over x-axis: (x,y) → (x,−y).
Reflection over y-axis: (x,y) → (−x,y).
Reflection over y=x: (x,y) → (y,x).
Rotation 90° CCW: (x,y) → (−y,x).
Rotation 180°: (x,y) → (−x,−y).
Dilation by k about origin: (x,y) → (kx,ky).

#### Key Facts for Bowl
Every isometry is a composition of at most 3 reflections. A composition of 2 reflections over parallel lines = translation. Over intersecting lines = rotation. Dilations preserve angles but not distances. If scale factor k = 1, dilation is the identity. A negative scale factor causes a reflection through the center.

#### Quick Classification
"A figure's image has the same orientation and no fixed points" → translation.
"Image has reversed orientation with a line of fixed points" → reflection.
"Image has same orientation with exactly one fixed point" → rotation.
"Image has same shape but different size" → dilation (non-isometry).

#### Review Questions
1. Point P(3, −2) is transformed by R₉₀ ∘ ry=x (reflection over y=x, then rotation 90° CCW). Find the image.
2. A regular octagon has how many lines of symmetry and what order of rotational symmetry?
3. Under what condition is a dilation an isometry?
