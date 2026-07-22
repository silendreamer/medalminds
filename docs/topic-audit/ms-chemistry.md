# Topic Audit — Chemistry, Middle School

**Summary:** 93 lessons total, 4 canonical topics, 9 orphan topics (24 lessons) flagged for remap.

## Clean Topic List (canonical, target state)

| Order | topicSlug | Subtopics (after remap) | Lessons (after remap) |
|---|---|---|---|
| 1 | `lab-skills` | 2 → 3 | 2 → 5 |
| 2 | `matter-properties` | 7 → 8 | 26 → 30 |
| 3 | `atoms-periodic-table` | 6 → 10 | 21 → 33 |
| 4 | `chemical-reactions` | 7 → 8 | 21 → 25 |

Notes on order: lab-skills first (foundational method/safety), then matter properties (macroscopic), then atomic structure (microscopic model), then reactions (applying both). This mirrors the existing HS Chemistry `scientific-inquiry`-first pattern and MS Physics's `hypothesis-and-scientific-method` pattern.

`lab-skills` remains thin (5 lessons across 3 subtopics) even after remap — flagged in Concerns below; it's likely intentionally small (a "how to do chemistry" primer) rather than mis-organized, but is worth a second look if more foundational content surfaces later.

## Remap Table

| Orphan topicSlug | Disposition | Target topicSlug | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `laboratory-safety-best-practices` | MERGE_INTO_SUBTOPIC | `lab-skills` | Lab Tools, Measurement, and Safety | 1624, 1625, 1626 | Direct duplicate of existing subtopic's theme (safety equipment, chemical handling, emergency procedures vs. "lab tools, measurement, and safety"); no title collision, content is complementary detail. |
| `mixtures-and-their-properties` | MERGE_INTO_SUBTOPIC | `matter-properties` | Mixtures & Solutions | 1630, 1631, 1632 | Same subject as existing subtopic. **Near-duplicate flag:** existing lesson "Types of Mixtures and Separation Methods" substantially overlaps orphan's "Types of Mixtures" + "Separation Techniques" — dedupe/consolidate content during actual merge, don't just append. |
| `thermodynamics-heat-content` | MERGE_INTO_SUBTOPIC | `matter-properties` | Heat, Temperature, and Thermal Energy | 1633, 1634 | That subtopic currently holds one generic synthesis lesson; orphan's "Heat Transfer" and "Heat Capacity" lessons are specific complements, not duplicates — good fit, no collision. |
| `chemical-reactions-in-electrochemistry` | ADD_AS_SUBTOPIC | `chemical-reactions` | Electrochemistry | 1621, 1622, 1623 | Redox reactions, galvanic/electrolytic cells — squarely "types of chemical reactions" content, distinct from existing subtopics (balancing, conservation of mass, acids/bases, exo/endothermic). No overlap. |
| `electron-configuration-and-valence-electrons` | ADD_AS_SUBTOPIC | `atoms-periodic-table` | Electron Configuration and Valence Electrons | 1618, 1619, 1620 | Extends "Atomic Structure" (protons/neutrons/electrons, atomic models) with the next logical layer (Aufbau principle, shells/sublevels, noble gas notation). Distinct from existing subtopics — no collision, though watch for conceptual overlap with "Chemical Bonding Basics" (octet rule) during content review. |
| `molecular-geometry-and-structure` | ADD_AS_SUBTOPIC | `atoms-periodic-table` | Molecular Geometry and Structure | 1637, 1638 | Directly extends "Chemical Bonding Basics" (electron pairs, polarity) into 3D shape/VSEPR-adjacent content. No title collision. |
| `empirical-formulas-and-chemical-composition` | ADD_AS_SUBTOPIC | `atoms-periodic-table` | Empirical Formulas and Chemical Composition | 1635, 1636 | Percent composition / empirical formulas are compound-composition calculations, the natural next step after "Elements & Compounds." Could also fit `chemical-reactions` (stoichiometry), but content emphasizes compound composition over reaction balancing — atoms-periodic-table is the closer match. |
| `organic-molecules-and-polymers` | ADD_AS_SUBTOPIC | `atoms-periodic-table` | Organic Molecules and Polymers | 1627, 1628, 1629 | Carbon-based compounds and bonding (functional groups, polymer formation) — extends "Elements & Compounds" / "Chemical Bonding Basics." No canonical MS Chemistry topic covers organic chemistry directly; this is the closest fit and keeps a 3-lesson fragment from becoming an awkward standalone topic. |
| `historical-chemistry-practices` | NEEDS_HUMAN | — | — | 1639, 1640 | Only 2 lessons (alchemy, scientific revolution) — historical/narrative content, not lab practice or core chemistry concepts. No canonical MS Chemistry topic fits (checked all subjects/levels — no "history of science" canonical topic exists anywhere in the corpus, so this isn't a matter of an obvious missing home). Options: (a) force into `lab-skills` as a "History & Nature of Science" subtopic despite thematic mismatch, (b) `KEEP_AS_TOPIC` as-is since it's genuinely a different genre of content, or (c) drop/deprioritize since 2 lessons is below both the canonical-topic floor (~4 subtopics) and the NEW_TOPIC cluster threshold (~3+ lessons). Recommend human call on whether this content pulls its weight in the curriculum at all. |

## Concerns

1. **`historical-chemistry-practices` — NEEDS_HUMAN** (see table above). Too small and thematically orphaned to confidently place.
2. **Near-duplicate content risk on `mixtures-and-their-properties` merge**: existing `matter-properties` → "Mixtures & Solutions" lesson "Types of Mixtures and Separation Methods" overlaps heavily with orphan lessons "Types of Mixtures" and "Separation Techniques." A straight append would create redundant coverage — recommend a content consolidation pass (possibly dropping/merging one lesson) rather than a mechanical merge.
3. **`lab-skills` stays thin**: even after absorbing `laboratory-safety-best-practices` (2→5 lessons, 2→3 subtopics), it's still well below the ~4-7 subtopic / ~4-8 lesson-per-subtopic canonical target. Not blocking, but worth flagging — either more lab-skills content is planned, or this topic may eventually need lessons pulled in from elsewhere (e.g., "Separating Mixtures" already straddles lab-skills and matter-properties).
4. **`atoms-periodic-table` absorbs 4 of 9 orphans** (12 of 24 orphaned lessons), growing from 6 to 10 subtopics — on the high end of the target 4-7 subtopic range. This is a reasonable outcome given the subject matter clustering (electron config, bonding/geometry, composition, organic chemistry all genuinely relate to atomic/molecular structure), but if a human wants to keep topics tighter, `empirical-formulas-and-chemical-composition` is the best candidate to instead route into `chemical-reactions` (stoichiometry angle) to rebalance.
5. **No title collisions** found for `laboratory-safety-best-practices`, `thermodynamics-heat-content`, `chemical-reactions-in-electrochemistry`, `electron-configuration-and-valence-electrons`, `molecular-geometry-and-structure`, `empirical-formulas-and-chemical-composition`, or `organic-molecules-and-polymers` — only the mixtures merge (#2 above) has an overlap concern.
