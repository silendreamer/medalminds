# Topic Audit — Physics / High School

**Summary:** 251 lessons across 32 `topicSlug` values — 12 canonical topics, 20 orphan topics (all flagged by the heuristic; all confirmed genuine orphans on inspection — none warranted `KEEP_AS_TOPIC`).

## Clean topic list (target taxonomy)

| Order | topicSlug | Subtopics (after remap) | Lessons (after remap) |
|---|---|---|---|
| 1 | `scientific-inquiry` | 4 | 27 |
| 2 | `kinematics` | 4 + 1 new | 26 |
| 3 | `forces-dynamics` | 4 + 2 new | 24 |
| 4 | `rotational-gravitation` | 3 + 1 new | 25 |
| 5 | `work-energy-momentum` | 5 | 22 |
| 6 | `oscillations-waves` | 4 | 22 |
| 7 | `fluids` | 3 | 8 |
| 8 | `thermodynamics` | 4 + 1 new | 27 |
| 9 | `electricity` | 4 + 2 new | 26 |
| 10 | `magnetism-electromagnetism` | 3 | 14 |
| 11 | `optics` | 4 | 12 |
| 12 | `modern-physics` | 4 + 1 new | 28 |

Total after remap: 251 (unchanged — audit only reassigns homes, doesn't drop lessons).

## Remap table

| Orphan topicSlug | Disposition | Target topic | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `quantum-mechanics-and-particle-physics` | ADD_AS_SUBTOPIC | `modern-physics` | Quantum Mechanics & Particle Physics | 1837–1840 | Standard Model / fundamental particles/forces content isn't covered by existing "Atomic Models & Quantum Theory"; distinct enough to be its own subtopic under modern-physics rather than merged. |
| `electromagnetic-radiation-and-waves` | MERGE_INTO_SUBTOPIC | `magnetism-electromagnetism` | Electromagnetic Waves | 1841–1843 | Existing subtopic "Electromagnetic Waves" has only 1 lesson (Maxwell's Equations, #0931); these 3 (EM wave basics, light-matter interaction, applications) round it out to 4 without duplicating it. |
| `kinematics-dynamics-rotational-motion` | MERGE_INTO_SUBTOPIC | `rotational-gravitation` | Rotational Kinematics & Dynamics / Rotational Inertia & Angular Momentum | 1844, 1845 → "Rotational Kinematics & Dynamics"; 1846 → "Rotational Inertia & Angular Momentum" | 1844 (angular displacement/velocity) and 1845 (Newton's laws in rotation) match the kinematics/dynamics subtopic; 1846 "Conservation of Angular Momentum" is an **exact title duplicate** of existing lesson #0864 in the Rotational Inertia & Angular Momentum subtopic — flag as likely redundant content, route there anyway per subtopic match. |
| `optics-and-light-behavior` | MERGE_INTO_SUBTOPIC | `optics` | Reflection & Mirrors / Refraction & Snell's Law | 1847 → Reflection & Mirrors; 1848 → Refraction & Snell's Law; 1849 → Wave Properties of Light (new, see concerns) | 1847 "Reflection and Mirrors" near-duplicates existing subtopic name and lessons (#0879–0882); 1848 "Refraction and Lenses" overlaps "Refraction & Snell's Law" (#0883–0885). 1849 "Wave Properties of Light" has no clean optics home — closest fit is still Refraction & Snell's Law subtopic given wave-optics framing, but see Concerns re: possible overlap with oscillations-waves "Wave Properties". |
| `ac-circuits-and-impedance` | ADD_AS_SUBTOPIC | `electricity` | AC Circuits & Impedance | 1850–1852 | `electricity` only covers DC circuits (Ohm's/Kirchhoff's laws); AC circuit analysis and impedance are genuinely uncovered content, not a duplicate — new subtopic under the existing topic. |
| `fluid-mechanics-hydrostatics` | MERGE_INTO_SUBTOPIC | `fluids` | Fluid Statics and Pressure / Fluid Dynamics and Bernoulli's Equation | 1853 → Fluid Statics and Pressure; 1854 → Fluid Dynamics and Bernoulli's Equation; 1855 → Fluid Dynamics and Bernoulli's Equation (viscosity) | 1853/1854 directly duplicate the single-lesson canonical subtopics by name; 1855 (viscosity/flow) extends fluid dynamics naturally into the same subtopic. |
| `simple-harmonic-motion-and-oscillations` | MERGE_INTO_SUBTOPIC | `oscillations-waves` | Simple Harmonic Motion | 1856–1858 | Canonical "Simple Harmonic Motion" subtopic already covers SHM basics, pendulum, driven oscillations/resonance; these 3 (SHM basics, energy in oscillators, damped/driven) are close duplicates in scope — merge to avoid two competing SHM homes. |
| `thermodynamics-and-heat-transfer` | MERGE_INTO_SUBTOPIC | `thermodynamics` | Laws of Thermodynamics / Heat Transfer (Conduction, Convection & Radiation) / Temperature, Heat & Thermal Expansion | 1859 → Laws of Thermodynamics; 1860 → Heat Transfer (Conduction, Convection & Radiation); 1861 → Temperature, Heat & Thermal Expansion | Titles are near-exact restatements of existing canonical subtopic names — direct merge, one lesson to each matching subtopic. |
| `wave-particle-duality-quantum-effects` | MERGE_INTO_SUBTOPIC | `modern-physics` | Photoelectric Effect & Wave-Particle Duality | 1862–1864 | Canonical subtopic already titled "Photoelectric Effect & Wave-Particle Duality"; these 3 lessons (intro to duality, demonstrating experiments, quantum tech applications) are the same subject matter restated. |
| `work-energy-power-systems` | MERGE_INTO_SUBTOPIC | `work-energy-momentum` | Work, Power & the Work-Energy Theorem / Conservation of Energy | 1865 → Work, Power & the Work-Energy Theorem; 1866 → Work, Power & the Work-Energy Theorem; 1867 → Conservation of Energy | Direct topical duplicates of existing subtopics (work/energy basics, power calculations, conservation of energy). |
| `magnetism-and-electromagnetic-forces` | MERGE_INTO_SUBTOPIC | `magnetism-electromagnetism` | Magnetic Fields & Magnetic Forces / Electromagnetic Induction | 1868 → Magnetic Fields & Magnetic Forces; 1869 → Electromagnetic Induction; 1870 → Magnetic Fields & Magnetic Forces | 1869 "Electromagnetic Induction" is an **exact title duplicate** of existing lesson #0928; 1868/1870 (fundamentals of magnetism, forces on charges) fit Magnetic Fields & Magnetic Forces. |
| `conservation-laws-in-physics` | MERGE_INTO_SUBTOPIC | `work-energy-momentum` (energy/momentum) + `rotational-gravitation` (angular momentum) | Conservation of Energy; Momentum, Impulse & Collisions; Rotational Inertia & Angular Momentum | 1871 → Conservation of Energy; 1872 → Momentum, Impulse & Collisions; 1873 → Rotational Inertia & Angular Momentum | Split by physical quantity conserved — each lesson matches an existing canonical subtopic exactly. 1873 is an **exact title duplicate** of existing lesson #0864 ("Conservation of Angular Momentum") and near-duplicate of 1846 from the rotational orphan above — three copies of the same lesson concept now converge on one subtopic; flagged in Concerns. |
| `gravitational-potential-energy-escape-velocity` | ADD_AS_SUBTOPIC | `rotational-gravitation` | Gravitational Potential Energy & Escape Velocity | 1874–1876 | `rotational-gravitation` covers universal gravitation, orbital motion, gravitational fields/potential (under the oversized "Torque & Rotational Equilibrium" subtopic) but escape velocity specifically isn't covered — legitimate new subtopic, not a duplicate. |
| `statistical-mechanics-and-thermodynamic-probability` | ADD_AS_SUBTOPIC | `thermodynamics` | Statistical Mechanics & Thermodynamic Probability | 1877–1879 | Kinetic theory (Ideal Gases & Kinetic Molecular Theory) touches molecular motion but not statistical/probabilistic treatment of entropy — distinct, legitimate addition. |
| `mechanical-advantage-and-simple-machines` | ADD_AS_SUBTOPIC | `forces-dynamics` | Mechanical Advantage & Simple Machines | 1880–1882 | No existing subtopic covers levers/pulleys/inclined-plane mechanical advantage as a topic in its own right (Friction/Inclined Planes covers force analysis, not machine mechanical advantage) — legitimate new subtopic. |
| `sound-waves-and-doppler-effect` | MERGE_INTO_SUBTOPIC | `oscillations-waves` | Sound and the Doppler Effect | 1883–1885 | Canonical subtopic "Sound and the Doppler Effect" currently has only 1 lesson; these 3 (sound wave basics, Doppler effect, applications) are the same subject and round it out — avoids a second sound/Doppler home. |
| `relativity-and-time-dilation` | MERGE_INTO_SUBTOPIC | `modern-physics` | Special Relativity | 1886–1888 | Direct duplicate of canonical "Special Relativity" subtopic (Einstein's postulates & time dilation already covered by lesson #0932); merge to avoid two relativity homes. |
| `charge-distribution-and-electric-fields` | MERGE_INTO_SUBTOPIC | `electricity` | Electric Fields & Electric Potential / Electric Charge & Coulomb's Law | 1889 → Electric Charge & Coulomb's Law; 1890 → Electric Fields & Electric Potential; 1891 → Electric Fields & Electric Potential | Charge distribution and field concepts map directly onto the two existing electrostatics subtopics. |
| `tension-and-forces-in-strings` | MERGE_INTO_SUBTOPIC | `forces-dynamics` | Tension, Springs & Hooke's Law | 1892–1893 | Canonical subtopic already includes "Tension in Strings and Ropes" (#0830); these 2 lessons are the same concept restated — merge. |
| `surface-tension-fluid-dynamics` | MERGE_INTO_SUBTOPIC | `fluids` | Fluid Dynamics and Bernoulli's Equation | 1894–1895 | Fluid dynamics basics is a near-duplicate of the existing single-lesson subtopic; surface tension is a small extension best folded into the same subtopic rather than standing alone at 1–2 lessons. |

**Disposition totals:** 15 MERGE_INTO_SUBTOPIC, 5 ADD_AS_SUBTOPIC, 0 KEEP_AS_TOPIC, 0 NEW_TOPIC, 0 NEEDS_HUMAN.

No NEW_TOPIC candidates emerged — every orphan cluster maps onto an existing canonical Physics topic; nothing here (e.g. no cluster like "lab skills" or "intro mechanics") lacked a canonical home the way the instructions anticipate for Biology-style orphans.

## Concerns

**Likely duplicate lesson content (near-identical titles/scope), for content-team review before any merge is executed:**
- "Conservation of Angular Momentum" appears **three times**: canonical #0864 (Rotational Inertia & Angular Momentum), orphan #1846 (`kinematics-dynamics-rotational-motion`), orphan #1873 (`conservation-laws-in-physics`). All three route to the same subtopic under this plan — recommend the content team dedupe/consolidate rather than keep all three once merged.
- "Electromagnetic Induction" appears twice with identical title: canonical #0928 and orphan #1869 (`magnetism-and-electromagnetic-forces`) — both land in the same subtopic.
- Reflection/Mirrors and Refraction/Lenses content is duplicated near-verbatim between canonical `optics` (#0879–0885) and orphan `optics-and-light-behavior` (#1847–1848).
- Thermodynamics laws/heat-transfer/temperature content in `thermodynamics-and-heat-transfer` (#1859–1861) closely restates the canonical subtopic scope with generic, less-specific lesson titles than the canonical versions.
- Work/power/conservation-of-energy content in `work-energy-power-systems` (#1865–1867) restates canonical `work-energy-momentum` subtopics.
- Sound/Doppler content in `sound-waves-and-doppler-effect` (#1883–1885) restates the single canonical lesson (#1585) at greater length — after merge this subtopic goes from 1 to 4 lessons, worth a content-team pass to ensure no redundant coverage.
- Special Relativity content in `relativity-and-time-dilation` (#1886–1888) restates canonical Special Relativity subtopic (Einstein's postulates, time dilation already covered by #0932).

**Mis-shaped canonical topic:**
- `rotational-gravitation`'s "Torque & Rotational Equilibrium" subtopic is overloaded (8 lessons) and actually contains two distinct strands — torque/rotational-equilibrium (#0849–0852) and gravitation/orbital-mechanics (#0853–0856, Universal Gravitation, Kepler's Laws, Gravitational Fields, Orbits). Recommend the content team consider splitting this into "Torque & Rotational Equilibrium" and "Gravitation & Orbital Motion" subtopics — orthogonal to this audit but relevant since the new `gravitational-potential-energy-escape-velocity` subtopic being added here would sit naturally next to a split-out gravitation subtopic rather than beside torque.
- `oscillations-waves`'s "Wave Properties" subtopic (6 lessons, canonical) already contains a lesson titled "Electromagnetic Waves" (#0877) and "Sound Waves & Acoustics" (#0876) — overlapping in scope with both the `magnetism-electromagnetism` → Electromagnetic Waves merge target and the `oscillations-waves` → Sound and the Doppler Effect merge target above. Not a blocking issue but worth a look — EM waves and sound are covered in two places within/across canonical topics even before adding orphans.

**NEEDS_HUMAN:** none — all 20 orphans resolved to MERGE or ADD dispositions with reasonable confidence.

---

Report path: `docs/topic-audit/hs-physics.md`
