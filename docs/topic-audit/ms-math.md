# Topic Audit — Math, Middle School

**Summary:** 111 lessons total · 6 canonical topics · 4 orphan topics (all 2-lesson fragments).

## Clean Topic List (canonical, pedagogical order)

| # | topicSlug | Subtopics | Lessons |
|---|-----------|-----------|---------|
| 1 | `number-sense-operations` | 4 (Fractions/Decimals/Percents; Ratios/Rates/Proportions; Exponents/Roots/Sci. Notation; Order of Operations) | 26 |
| 2 | `algebra-foundations` | 3 (Variables/Expressions/Equations; Linear Equations & Inequalities; Patterns/Sequences/Functions) | 18 |
| 3 | `geometry` | 4 (Angles/Lines/Polygons; Area/Perimeter/Volume; Coordinate Geometry; Transformations) | 20 |
| 4 | `data-probability` | 4 (Mean/Median/Mode/Range; Probability Basics; Counting Principles; Reading & Interpreting Graphs) | 16 |
| 5 | `measurement-units` | 3 (Metric System & SI Units; Metric Prefixes/Powers of Ten; Unit Conversions & Dimensional Analysis) | 3 |
| 6 | `competition-mathematics` | 4 (Mental Math & Estimation; Number Theory Basics; Pattern Recognition; Multi-Step Problem Solving) | 20 |

(`measurement-units` has only 3 subtopics and 1 lesson each — well below the 4–7 subtopic / 4–8 lesson canonical shape. Flagged in Concerns; no orphan lessons found to backfill it, so left as-is rather than merged, since no canonical topic is a better fit for unit-conversion content.)

## Remap Table

| Orphan topicSlug | Disposition | Target topicSlug | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `exponents-and-powers` | **MERGE_INTO_SUBTOPIC** | `number-sense-operations` | Exponents, Roots & Scientific Notation | nsb-lesson-1717, nsb-lesson-1718 | "Understanding Exponents Basics" / "Applying Exponent Rules" cover base/exponent, negative/zero exponent rules, product/power/quotient rules — identical scope to the existing 7-lesson subtopic (which already opens with "Exponents: Power, Base, and Meaning"). No title collision, but heavy conceptual overlap; folding in avoids a redundant intro-exponents track. |
| `inequalities-and-intervals` | **MERGE_INTO_SUBTOPIC** | `algebra-foundations` | Linear Equations & Inequalities | nsb-lesson-1719, nsb-lesson-1720 | "Understanding Inequalities" and "Working with Interval Notation" extend the inequality content already in this subtopic ("Solving and Graphing Inequalities"). Interval notation is a natural add-on lesson, not a new subtopic. |
| `computer-science-basics` | **NEEDS_HUMAN** | — | — | nsb-lesson-1715, nsb-lesson-1716 | Algorithms/pseudocode/flowcharts and programming-language basics are CS content with no clean canonical Math home. Only 2 lessons — too few to justify a `NEW_TOPIC` (algorithmic-thinking topics elsewhere in the taxonomy run 4+ subtopics). Options: (a) `ADD_AS_SUBTOPIC` under `competition-mathematics` as a loosely-related "Algorithmic & Logical Thinking" subtopic (weak fit — that topic is about arithmetic/number-theory/pattern speed skills, not programming); (b) leave orphaned pending more CS lessons that could justify a genuine `NEW_TOPIC`; (c) confirm whether Science Bowl Math actually wants CS content at all (it's arguably out of scope for a Math subject and might belong better as a cross-subject or Energy/Physics "Computational Thinking" topic instead). |
| `atomic-structure-and-electron-configuration` | **NEEDS_HUMAN** | — | — | nsb-lesson-1721, nsb-lesson-1722 | This is pure Chemistry content (subatomic particles, atomic number, electron shells, Aufbau principle) mistagged with `subject: "Math"`. No canonical Math topic fits it at all. Correct fix is almost certainly a **subject re-tag** to Chemistry (where a matching `atomic-structure` topic likely already exists), not a taxonomy merge — flagging for human decision since re-tagging is outside this audit's scope (report-only, single-subject). |

No orphan cluster reached the ~3-lesson threshold for a `NEW_TOPIC` recommendation — both ambiguous orphans are isolated 2-lesson pairs.

## Concerns

- **Subject mistagging:** `atomic-structure-and-electron-configuration` (2 lessons) is Chemistry content living under `subject: "Math"`. This isn't a taxonomy problem — it's a data error. Recommend checking Chemistry MS/HS for an existing `atomic-structure` topic before deciding whether to retag or leave as a Math NEEDS_HUMAN item.
- **Out-of-scope subject matter:** `computer-science-basics` (2 lessons) covers programming/algorithms, which arguably doesn't belong in a Science Bowl Math track at all (Science Bowl Math rounds don't test CS). Worth a product-level question, not just a taxonomy merge.
- **Thin canonical topic:** `measurement-units` has only 3 subtopics with exactly 1 lesson each (3 lessons total) — far short of the canonical 4–7 subtopic / 4–8 lesson-per-subtopic shape. No orphan content was suitable to pad it out (metric-system content doesn't overlap with the exponents/inequalities/CS/atomic-structure orphans). Recommend either commissioning more lessons for this topic or reconsidering whether it should be folded into `number-sense-operations` as a fifth subtopic ("Metric System & Unit Conversions") — flagging as a design question rather than acting on it, since it's canonical, not an orphan, and the instructions scope this audit to orphan dispositions.
- **No title collisions** were found between orphan lessons and existing canonical-topic lesson titles (checked `exponents-and-powers` against `number-sense-operations` and `inequalities-and-intervals` against `algebra-foundations` — all titles are distinct strings, just thematically overlapping).
