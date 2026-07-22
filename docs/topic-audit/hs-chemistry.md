# Topic Audit — Chemistry / High School

**Summary:** 264 lessons · 15 canonical topics · 27 orphan topics (all 27 resolved; 0 NEEDS_HUMAN; 0 NEW_TOPIC).

## Clean topic list (canonical, pedagogical order)

| # | topicSlug | Subtopics (post-merge) | Lessons (pre-merge) |
|---|---|---|---|
| 1 | `scientific-inquiry` | 4 | 23 |
| 2 | `matter-properties` | 3 | 16 |
| 3 | `atomic-theory-periodic-trends` | 5 | 31 |
| 4 | `chemical-bonding` | 7 | 37 |
| 5 | `stoichiometry` | 3 | 21 |
| 6 | `gas-behavior` | 7 | 17 |
| 7 | `thermochemistry` | 5 | 21 |
| 8 | `solutions` | 3 | 9 |
| 9 | `chemical-equilibrium` | 5 | 6 |
| 10 | `acids-bases` | 5 | 5 |
| 11 | `reaction-kinetics` | 4 | 4 |
| 12 | `electrochemistry` | 4 | 4 |
| 13 | `organic-chemistry` | 5 | 5 |
| 14 | `descriptive-chemistry` | 3 | 3 |
| 15 | `entropy-disorder` | 1 | 2 |

Subtopic counts above are the existing canonical counts; see remap table for which orphan subtopics land where (most MERGE into an existing subtopic without adding a new row; ADD_AS_SUBTOPIC entries add one row each).

## Remap table (27 orphans)

| Orphan topicSlug | Disposition | Target topicSlug | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `quantum-mechanics-and-molecular-orbitals` | MERGE_INTO_SUBTOPIC | `atomic-theory-periodic-trends` | Electron Configuration & Orbital Theory | 1723, 1724, 1725 | Quantum numbers / orbital-filling content overlaps directly with the canonical subtopic; MO theory is the natural capstone lesson there. |
| `thermodynamics-and-enthalpy` | MERGE_INTO_SUBTOPIC | `thermochemistry` | Hess's Law | 1726, 1727, 1728 | Lesson 1728 explicitly duplicates "Applying Hess's Law"; 1726/1727 are intro thermo/enthalpy content that fits the same subtopic (canonical `Enthalpy` subtopic also viable, but Hess's Law is the closer thematic fit given 1728). |
| `kinetics-and-reaction-rates` | MERGE_INTO_SUBTOPIC | `reaction-kinetics` | Rate Laws and Reaction Order | 1729, 1730, 1731 | "Rate Laws and Reaction Order" (1730) is a verbatim title collision with the canonical subtopic name/lesson; 1729/1731 (factors affecting rate, collision theory) map to the same canonical topic's other subtopics but the group is small enough to fold into one subtopic bucket. |
| `acid-base-equilibria` | MERGE_INTO_SUBTOPIC | `acids-bases` | Buffers | 1732, 1733, 1734 | Buffer solutions + Le Chatelier-in-acids + pH/pKa are all downstream of the canonical `acids-bases` topic; grouped under Buffers since 1734 is a direct match and the topic is thin (5 lessons, 1 each) — this triples it into a fuller subtopic. |
| `spectroscopy-and-absorption` | ADD_AS_SUBTOPIC | `atomic-theory-periodic-trends` | Spectroscopy and Absorption | 1735, 1736, 1737 | Emission/absorption spectra tie directly to electron transitions covered under atomic theory; no existing subtopic covers spectroscopy, so add as new subtopic rather than force a merge. |
| `coordination-chemistry` | MERGE_INTO_SUBTOPIC | `chemical-bonding` | Coordination Compounds | 1738, 1739, 1740 | Canonical `chemical-bonding` already has a single-lesson "Coordination Compounds" subtopic; these 3 lessons (intro, nomenclature, applications) round it out into a proper subtopic. |
| `chemical-reactions-and-stoichiometry` | MERGE_INTO_SUBTOPIC | `stoichiometry` | Reaction Types & Stoichiometric Ratios | 1741, 1742, 1743 | "Types of Chemical Reactions" and "Balancing Chemical Equations" duplicate canonical `stoichiometry` subtopic content nearly verbatim (title collisions with `Reaction Types & Stoichiometric Ratios` and `Balancing Chemical Equations`). |
| `molecular-geometry-and-vsepr` | MERGE_INTO_SUBTOPIC | `chemical-bonding` | VSEPR Theory & Molecular Geometry | 1744, 1745, 1746 | Direct subject-matter duplicate of the canonical VSEPR subtopic under `chemical-bonding`. |
| `phase-changes-and-phase-diagrams` | MERGE_INTO_SUBTOPIC | `matter-properties` | States of Matter | 1747, 1748 | Canonical `States of Matter` subtopic already covers phase changes/vapor pressure/phase diagrams extensively; these 2 lessons duplicate that ground. |
| `solubility-and-concentration` | MERGE_INTO_SUBTOPIC | `solutions` | Solution Formation & Solubility | 1749, 1750 | Canonical subtopic already covers solubility principles and concentration units (molarity/molality); direct duplicate. |
| `isomerism-and-stereochemistry` | MERGE_INTO_SUBTOPIC | `organic-chemistry` | Isomerism | 1751, 1752 | Canonical `organic-chemistry` has a single-lesson "Isomerism" subtopic; structural/stereoisomer lessons extend it directly. |
| `electronegativity-and-bond-character` | MERGE_INTO_SUBTOPIC | `chemical-bonding` | Ionic & Covalent Bonding | 1753, 1754 | Electronegativity trends and bond character (ionic vs. covalent character) are core to the canonical Ionic & Covalent Bonding subtopic (periodic-trends electronegativity is also covered under `atomic-theory-periodic-trends`, but the bond-character framing fits bonding better). |
| `radical-chemistry` | ADD_AS_SUBTOPIC | `organic-chemistry` | Radical Chemistry | 1755, 1756 | Free radicals and radical reactions are organic-reaction-mechanism content with no existing canonical subtopic match; add as a new subtopic under `organic-chemistry`. |
| `electrochemistry-galvanic-cells` | MERGE_INTO_SUBTOPIC | `electrochemistry` | Galvanic Cells | 1757, 1758 | Canonical `electrochemistry` already has a single-lesson "Galvanic Cells" subtopic; these 2 lessons (intro + cell potential calc) duplicate/extend it directly. |
| `polymer-chemistry` | MERGE_INTO_SUBTOPIC | `organic-chemistry` | Organic Reactions and Polymers | 1759, 1760 | Canonical `organic-chemistry` already has an "Organic Reactions and Polymers" subtopic covering exactly this content. |
| `intermolecular-forces-and-hydrogen-bonding` | MERGE_INTO_SUBTOPIC | `chemical-bonding` | Intermolecular Forces | 1761, 1762 | Title collision: "Types of Intermolecular Forces" (1761) duplicates the existing canonical lesson of the same title under `chemical-bonding`'s Intermolecular Forces subtopic; hydrogen bonding is a subset of the same subtopic. |
| `thermal-properties-of-gases` | MERGE_INTO_SUBTOPIC | `gas-behavior` | Kinetic Molecular Theory | 1763, 1764 | KMT overview and gas-laws/temperature content directly duplicates the canonical `gas-behavior` → Kinetic Molecular Theory subtopic. |
| `mass-spectrometry-basics` | ADD_AS_SUBTOPIC | `atomic-theory-periodic-trends` | Mass Spectrometry | 1767 | Mass spec (isotope abundance, m/z) is an atomic-structure/isotopes application; no canonical subtopic covers instrumentation, so add new. Merge with the sibling orphan below first (same subtopic name, split across two topicSlugs — a data artifact). |
| `mass-spectrometry-applications` | ADD_AS_SUBTOPIC | `atomic-theory-periodic-trends` | Mass Spectrometry | 1768 | Same subtopic name ("Mass Spectrometry") as `mass-spectrometry-basics` but stored under a different topicSlug — clearly meant to be one 2-lesson subtopic split by a data bug. Combine both lessons (1767, 1768) into a single new "Mass Spectrometry" subtopic under `atomic-theory-periodic-trends`. |
| `nmr-spectroscopy` | ADD_AS_SUBTOPIC | `atomic-theory-periodic-trends` | NMR Spectroscopy | 1769, 1770 | Spectroscopic technique content; pairs naturally with the new "Spectroscopy and Absorption" subtopic added above under the same canonical topic — group both spectroscopy orphans under `atomic-theory-periodic-trends`. |
| `gas-laws-and-real-gases` | MERGE_INTO_SUBTOPIC | `gas-behavior` | Ideal Gas Law | 1771, 1772 | "Ideal Gas Law Fundamentals" and "Real Gases and Deviations" duplicate the canonical `Ideal Gas Law` and `Real Gases and the van der Waals Equation` subtopics; folded into Ideal Gas Law as the closer/larger existing bucket. |
| `born-haber-cycles` | ADD_AS_SUBTOPIC | `thermochemistry` | Born-Haber Cycles | 1773, 1774 | Lattice energy / Born-Haber cycle content is a legitimate thermochemistry extension with no existing subtopic match; add as new subtopic. |
| `nuclear-chemistry` | MERGE_INTO_SUBTOPIC | `atomic-theory-periodic-trends` | Isotopes, Radioactivity & Nuclear Chemistry | 1775, 1776 | Direct duplicate of the canonical subtopic — "Radioactive Decay and Half-Life" and "Nuclear Reactions and Fission" both restate canonical lesson content ("Radioactive Decay: Alpha, Beta, Gamma", "Nuclear Fission, Fusion, and Binding Energy"). |
| `thermal-stability-and-decomposition` | MERGE_INTO_SUBTOPIC | `matter-properties` | Physical & Chemical Changes | 1777, 1778 | Decomposition reactions and thermal stability are chemical-change content matching the canonical `Physical & Chemical Changes` subtopic (which already covers "Reaction Types: Recognizing Chemical Change Patterns"). |
| `hydration-and-hydration-energy` | MERGE_INTO_SUBTOPIC | `solutions` | Solution Formation & Solubility | 1779, 1780 | Hydration/hydration energy in solution formation fits directly under the canonical Solution Formation & Solubility subtopic. |
| `diels-alder-reactions` | ADD_AS_SUBTOPIC | `organic-chemistry` | Diels-Alder Reactions | 1783, 1784 | Specific named organic reaction mechanism; distinct from the general "Organic Reactions and Polymers" subtopic and substantial enough (2 lessons, mechanism + applications) to stand as its own subtopic under `organic-chemistry`. |
| `thermal-conductivity-and-heat-transfer` | MERGE_INTO_SUBTOPIC | `thermochemistry` | Energy, Heat & Temperature | 1785, 1786 | Heat transfer mechanisms and thermal conductivity are core "Energy, Heat & Temperature" content, the largest and most general subtopic in `thermochemistry`. |

## Concerns

- **Lesson-ID gap (1765–1766, 1781–1782 already used, 1787+ unseen):** IDs 1765/1766 do not appear anywhere in the dump output — likely lessons belonging to a different subject/level, not a gap in this audit; no action needed but flagging for awareness since it looked like a discontinuity between `nmr-spectroscopy` (1769–1770) and the `mass-spectrometry-*` pair (1767–1768).
- **Split subtopic across two topicSlugs:** `mass-spectrometry-basics` and `mass-spectrometry-applications` both use the subtopic name "Mass Spectrometry" but are stored as two separate orphan `topicSlug`s (data artifact, likely a generation bug where each lesson got its own topicSlug instead of sharing one). Recommend merging into a single new subtopic, not two.
- **Existing in-topic duplication (not an orphan, flagged for awareness only):** canonical `chemical-equilibrium` already contains a catch-all subtopic literally named "Chemical Equilibrium" (lessons 1781–1782, "Le Chatelier's Principle" and "Equilibrium Constant (K)") that duplicates the topic's own dedicated "Le Chatelier's Principle" and "Equilibrium Constant" subtopics almost title-for-title. This wasn't in scope as an orphan `topicSlug` (it's nested correctly under `chemical-equilibrium`) but is a near-identical content duplicate worth a human cleanup pass alongside this audit.
- **Title collisions confirmed during merge:** `kinetics-and-reaction-rates` → "Rate Laws and Reaction Order" collides verbatim with the canonical `reaction-kinetics` lesson of the same title; `chemical-reactions-and-stoichiometry` → "Balancing Chemical Equations" and "Types of Chemical Reactions" both collide with canonical `stoichiometry` content; `intermolecular-forces-and-hydrogen-bonding` → "Types of Intermolecular Forces" collides verbatim with the canonical `chemical-bonding` lesson. All three were routed to MERGE_INTO_SUBTOPIC; if lessons are physically merged later, de-duplicate identical titles rather than keeping both.
- **No NEEDS_HUMAN cases and no NEW_TOPIC cases.** Every orphan cluster had a clear canonical home (7 ADD_AS_SUBTOPIC, 20 MERGE_INTO_SUBTOPIC) — unlike some subjects, HS Chemistry's canonical taxonomy is broad enough (15 topics) that no foundational cluster (e.g. spectroscopy, mass spec) needed a brand-new top-level topic; spectroscopy/mass-spec content was placed under `atomic-theory-periodic-trends` since it stems from electron/atomic-structure concepts.
- **Thin canonical topics worth a later look:** `descriptive-chemistry` (3 lessons, 1 each), `entropy-disorder` (2 lessons) and post-merge `electrochemistry`/`reaction-kinetics`/`acids-bases`/`organic-chemistry` (4–8 lessons each even after merges) remain much smaller than the "canonical" pattern (~4–8 lessons per subtopic, 4–7 subtopics per topic) seen in `chemical-bonding` or `atomic-theory-periodic-trends`. They aren't orphans, but they read as underdeveloped canonical topics — worth flagging to content team as expansion candidates rather than reclassification here.
