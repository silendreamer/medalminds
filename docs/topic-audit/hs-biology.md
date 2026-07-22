# Topic Audit — Biology / High School

**Summary:** 221 lessons, 10 canonical topics, 19 orphan topics (54 lessons). All 19 orphans resolved (0 NEEDS_HUMAN as a hard blocker; 1 flagged for a follow-up human call on placement only — see Concerns).

## Clean Topic List (after remap)

| # | topicSlug | Subtopics (after remap) | Lessons (after remap) |
|---|---|---|---|
| 1 | `scientific-inquiry` | 1 | 8 |
| 2 | `biochemistry-cell-biology` | 6 (Water & Biological Chemistry, Cell Structure & Organelle Functions, Membrane Structure & Transport, Biological Macromolecules, **Protein Structure & Function** [expanded], **Enzymes: Catalysis and Regulation** [expanded], Cellular Respiration) | 20 → 29 |
| 3 | `cell-communication` | 4 (Cell Signaling & Receptors [expanded], Signal Transduction Pathways, Cell Cycle Regulation [expanded], Apoptosis) | 24 → 29 |
| 4 | `molecular-biology` | 6 | 18 |
| 5 | `genetics-heredity` | 6 (+ **Genetic Mutations & Variation** [new]) | 24 → 30 |
| 6 | `evolution-biodiversity` | 5 (Evidence for Evolution & Natural Selection [expanded], Speciation & Reproductive Isolation [expanded], + others) | 24 → 30 |
| 7 | `animal-physiology` | 9 (7 existing + **Muscle Physiology & Contraction** [new] + **Developmental Biology & Embryology** [new]; Immune System expanded) | 31 → 42 |
| 8 | `plant-biology` | 3 (+ **Plant Hormones & Growth Responses** [new]; Plant Structure & Organization expanded) | 10 → 15 |
| 9 | `ecology` | 5 (3 existing + **Ecological Interactions & Biomes** [new] + **Biogeochemical Cycles & Nutrient Cycling** [new]; Ecosystem Energy Flow expanded) | 9 → 19 |
| 10 | `microbiology-diversity` | 3 | 3 |

Note: table shows target-state subtopic/lesson counts assuming all MERGE/ADD dispositions below are executed; this audit does not perform the edits.

One item (`learning-and-behavior`, 2 lessons) has no clean canonical home — see Concerns; it is not counted in the table above.

## Remap Table

| orphan topicSlug | disposition | target topicSlug | target subtopic | lesson IDs | rationale |
|---|---|---|---|---|---|
| `animal-physiology-muscle-contraction` | ADD_AS_SUBTOPIC | `animal-physiology` | Muscle Physiology & Contraction | 1787, 1788, 1789 | Musculoskeletal physiology has no home in any canonical subtopic; fits naturally alongside Cardiovascular/Nervous subtopics in the physiology survey topic. |
| `plant-hormones-growth-responses` | ADD_AS_SUBTOPIC | `plant-biology` | Plant Hormones & Growth Responses | 1790, 1791, 1792 | Distinct from Plant Structure & Organization and Photosynthesis; plant hormones/tropisms are standard third plant-biology subtopic. |
| `genetic-mutations-inheritance` | ADD_AS_SUBTOPIC | `genetics-heredity` | Genetic Mutations & Variation | 1793, 1794, 1795 | No existing subtopic covers mutation types/inheritance/evolutionary impact as a unit; Chromosomal Genetics covers only large-scale aberrations, not point/frameshift mutations. Distinct from molecular-biology's DNA Structure/Repair (mechanism-level, not inheritance-level). |
| `ecological-interactions-biomes` | SPLIT: MERGE + ADD_AS_SUBTOPIC | `ecology` | 1796–1797 → new subtopic "Ecological Interactions & Biomes"; 1798 → MERGE into existing "Ecosystem Energy Flow & Productivity" | 1796, 1797 (add); 1798 (merge) | `nsb-lesson-1798` ("Energy Flow in Ecosystems") duplicates the existing trophic-level/10%-rule content in lessons 0163–0165 — collision. Lessons 1796 (interaction types) and 1797 (biomes) are genuinely new content ecology currently lacks entirely. |
| `cellular-structures-functions` | MERGE (split 3 ways) | `biochemistry-cell-biology` / `cell-communication` | 1799 → "Cell Structure & Organelle Functions" (membrane portion) / Membrane Structure & Transport; 1800 → "Cell Structure & Organelle Functions"; 1801 → `cell-communication`/"Cell Cycle Regulation" | 1799, 1800, 1801 | Direct duplicates: 1799 (cell membrane) overlaps 0021 Fluid Mosaic Model; 1800 (organelles) overlaps 0016–0020; 1801 (cell cycle) overlaps 0040 "The Cell Cycle: Phases and Control Points." All three collide with existing canonical content almost 1:1. |
| `blood-types-and-transfusions` | SPLIT: ADD_AS_SUBTOPIC + MERGE | `animal-physiology` (1802, 1803) / `genetics-heredity` (1804) | 1802, 1803 → new subtopic "Blood Types & Transfusion Physiology" under Immune System area; 1804 → MERGE into "Non-Mendelian Inheritance (Codominance, Multiple Alleles, Sex-Linked)" | 1802, 1803, 1804 | `nsb-lesson-1804` ("Blood Type Genetics and Testing") duplicates `nsb-lesson-0081` ("Blood Type Genetics: Multiple Alleles") — same ABO/Rh/codominance content, near-identical keyConcepts. 1802/1803 cover antigen/antibody physiology and transfusion compatibility — clinical/immunology content not present anywhere in Immune System subtopic; best added there as a short applied subtopic. |
| `developmental-biology-embryology` | ADD_AS_SUBTOPIC | `animal-physiology` | Developmental Biology & Embryology | 1805, 1806, 1807 | Partial thematic overlap with Reproductive System's `nsb-lesson-0145` (fertilization/early development) but distinct focus (comparative embryology, evo-devo, gene regulation of development) — not a title/content collision. No canonical topic besides animal-physiology plausibly houses developmental biology; keeping it under the physiology survey topic (adjacent to Reproductive System) is the natural fit. |
| `microbial-ecology-biogeochemical-cycles` | ADD_AS_SUBTOPIC (merge with `nutrient-cycling-soil-chemistry`) | `ecology` | Biogeochemical Cycles & Nutrient Cycling | 1808, 1809, 1810 | No canonical subtopic covers biogeochemical cycles or microbial ecosystem roles. Content is complementary to (not duplicating) `nutrient-cycling-soil-chemistry` below — combine both orphans into one new ecology subtopic. |
| `neurobiology-signal-transmission` | MERGE | `animal-physiology` | Nervous System & Signal Transduction | 1811, 1812, 1813 | Direct duplicates: 1811 (neuron structure) ≈ 0121, 1812 (action potentials/synapses) ≈ 0121/0122, 1813 (neurotransmitters) ≈ 0122. Same subject matter, different lesson IDs. |
| `protein-structure-function` | MERGE | `biochemistry-cell-biology` | Water & Biological Chemistry (protein content) | 1814, 1815 | 1814 ("Levels of Protein Structure") and 1815 ("Protein Folding and Stability") duplicate the scope of existing `nsb-lesson-0013` "Proteins: Structure and Function." Fold as supplementary detail lessons under the same subtopic. |
| `protein-structure-function` (cont.) | MERGE | `biochemistry-cell-biology` | Enzymes: Catalysis and Regulation | 1816 | "Enzyme Function and Mechanism" duplicates `nsb-lesson-1577` "Enzymes: Catalysis and Regulation" (already a canonical but 1-lesson-thin subtopic). |
| `evolutionary-biology-speciation` | MERGE (split 2 ways) | `evolution-biodiversity` | 1817, 1819 → "Evidence for Evolution & Natural Selection"; 1818 → "Speciation & Reproductive Isolation" | 1817, 1818, 1819 | 1817 ("Natural Selection Mechanisms") and 1819 ("Evidence for Evolution") duplicate 0092–0099 scope directly; 1818 ("Types of Speciation") duplicates 0100–0103 scope directly. Title-level collisions throughout. |
| `enzyme-function-regulation` | MERGE | `biochemistry-cell-biology` | Enzymes: Catalysis and Regulation | 1820, 1821, 1822 | Same collision as above — this orphan and `protein-structure-function`'s lesson 1816 both duplicate the single canonical "Enzymes: Catalysis and Regulation" lesson (1577). Consolidating all four lessons (1577, 1816, 1820–1822) under one expanded subtopic turns a 1-lesson stub into a proper 4-lesson subtopic. |
| `cellular-communication-receptors` | MERGE | `cell-communication` | Cell Signaling & Receptors | 1823, 1824 | 1823 ("Types of Cell Signaling") duplicates `nsb-lesson-0026` title almost verbatim; 1824 ("Receptor Types and Functions") duplicates the GPCR/RTK/ion-channel scope of 0027–0029. |
| `nutrient-cycling-soil-chemistry` | ADD_AS_SUBTOPIC (merge with `microbial-ecology-biogeochemical-cycles`) | `ecology` | Biogeochemical Cycles & Nutrient Cycling | 1825, 1826 | See `microbial-ecology-biogeochemical-cycles` above — combine into one subtopic (5 lessons total: 1808–1810, 1825–1826) rather than two adjacent 2–3 lesson orphan topics on the same theme. |
| `learning-and-behavior` | NEEDS_HUMAN | — | — | 1827, 1828 | See Concerns. Only 2 lessons (classical/operant conditioning); no canonical topic covers animal behavior/ethology. Too small to justify a NEW_TOPIC alone, and doesn't cleanly fit physiology (organ-systems focus) or ecology (population/community/energy focus) as currently scoped. |
| `antibody-structure-function` | MERGE | `animal-physiology` | Immune System | 1829, 1830 | Both lessons duplicate the "Adaptive Immunity: B Cells, T Cells, and Antibodies" scope of `nsb-lesson-0135`. |
| `plant-structure-adaptations` | MERGE | `plant-biology` | Plant Structure & Organization | 1831, 1832 | 1831 ("Plant Cell Structure and Function") and 1832 ("Adaptations of Plant Systems") overlap the meristems/vascular tissue/roots/leaves scope of 0147–0151. |
| `cell-cycle-division` | MERGE | `cell-communication` | Cell Cycle Regulation | 1833, 1834 | Direct duplicate of "The Cell Cycle: Phases and Control Points" (0040) and general mitosis/meiosis comparison content already implicit in genetics-heredity's Meiosis subtopic; closest and least redundant home is Cell Cycle Regulation. |
| `physiological-responses-environment` | MERGE | `animal-physiology` | Homeostasis | 1835, 1836 | "Homeostasis and Feedback Mechanisms" (1835) duplicates `nsb-lesson-0116` title/scope almost exactly; "Adaptations to Environmental Stressors" (1836) is a natural extension of the same Homeostasis subtopic. |

**Totals:** 19 orphans → 15 fully resolved as MERGE/ADD_AS_SUBTOPIC (12 clean + 3 split-disposition topics), 1 resolved as NEEDS_HUMAN. No orphan qualified for KEEP_AS_TOPIC or a true NEW_TOPIC (all foundational clusters found a plausible canonical home once split at the lesson level).

## Concerns

**Title/content collisions requiring lesson-level dedup, not just topic merge** (highest priority — these are near-duplicate lessons, not just similar subtopics):
- `nsb-lesson-1804` vs `nsb-lesson-0081` — both "Blood Type Genetics," same ABO/Rh/codominance scope.
- `nsb-lesson-1798` vs `nsb-lesson-0163`–`0165` — "Energy Flow in Ecosystems" vs. "Energy Flow Through Trophic Levels."
- `nsb-lesson-1799`/`1800`/`1801` vs `0016`–`0021`/`0040` — cell structure, organelles, and cell cycle all re-taught.
- `nsb-lesson-1811`–`1813` vs `0121`–`0122` — neuron structure, action potentials, neurotransmitters re-taught.
- `nsb-lesson-1814`–`1816` and `1820`–`1822` vs `0013` and `1577` — protein/enzyme structure-function re-taught **four times over** (0013, 1577, 1814-1816, 1820-1822 all cover overlapping protein/enzyme ground). This cluster is the worst offender in the subject — recommend a human editorial pass to consolidate into 2 clean subtopics (Proteins; Enzymes) rather than a straight merge, since simply appending all lessons would leave heavy internal redundancy.
- `nsb-lesson-1817`/`1819` vs `0092`–`0099`, and `1818` vs `0100`–`0103` — natural selection and speciation re-taught.
- `nsb-lesson-1823`/`1824` vs `0026`–`0029` — cell signaling/receptor types re-taught.
- `nsb-lesson-1829`/`1830` vs `0135` — antibody structure/function re-taught.
- `nsb-lesson-1831`/`1832` vs `0147`–`0151` — plant structure re-taught.
- `nsb-lesson-1833`/`1834` vs `0040` — cell cycle re-taught.
- `nsb-lesson-1835` vs `0116` — homeostasis re-taught.

In all of these cases the MERGE disposition above assumes the orphan lessons are folded in as *additional* lessons within the subtopic (increasing depth), which is workable content-wise, but an editor should scan for exact redundancy before publishing — some of these orphan lessons may be near-verbatim rewrites of the canonical lesson and could be cut entirely rather than kept as "extra" lessons.

**NEEDS_HUMAN:**
- `learning-and-behavior` (1827, 1828 — classical/operant conditioning). Two clean options: (a) fold into `animal-physiology` as a small "Learning & Behavior" subtopic alongside Nervous System (behavior is downstream of neurobiology), or (b) hold until 1-2 more behavior/ethology lessons are authored and spin up a proper subtopic. Not urgent — only 2 lessons, no collision risk either way.

**Mis-organized canonical topics:**
- `biochemistry-cell-biology`'s three newest subtopics — "Biological Macromolecules" (1 lesson), "Enzymes: Catalysis and Regulation" (1 lesson), "Cellular Respiration" (1 lesson) — are themselves thin, orphan-shaped fragments that the dump script's heuristic missed only because they share a topicSlug with a well-formed canonical topic. They read like the same later "batch" that produced the 1576-1836 orphan range (sequential IDs 1576-1581 immediately precede the orphan block). Recommend treating "Enzymes: Catalysis and Regulation" as the merge target for `enzyme-function-regulation` + the enzyme lesson from `protein-structure-function` (as done above), which fixes this in the same pass. "Biological Macromolecules" and "Cellular Respiration" remain single-lesson subtopics with no orphan content to absorb into them in this batch — flagging for a future content pass (out of scope for this audit).
- `ecology` is the thinnest canonical topic pre-merge (3 subtopics, 9 lessons) relative to its peers (18-31 lessons each); the two new subtopics proposed here (Ecological Interactions & Biomes; Biogeochemical Cycles & Nutrient Cycling) bring it to a healthier 5 subtopics / 19 lessons, roughly in line with `plant-biology` and `microbiology-diversity`.
- `animal-physiology` becomes the largest topic after remap (9 subtopics / 42 lessons) — still coherent (it's a broad organ-systems survey), but worth a future look at whether it should split (e.g., "Human Physiology" core systems vs. a separate "Development & Behavior" topic) if more foundational lessons land there later.
