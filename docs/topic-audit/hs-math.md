# Topic Audit — Math / High School

**Summary:** 230 lessons, 10 canonical topics, 20 orphan topics (56 orphaned lessons).

## Clean Topic List (canonical, pedagogical order)

| # | topicSlug | Subtopics (post-remap) | Lessons (post-remap) |
|---|---|---|---|
| 1 | `mathematical-foundations` | 5 (+ Set Theory & Cardinality) | 31 |
| 2 | `algebra` | 4 (+ Inequalities & Optimization) | 33 |
| 3 | `functions` | 4 (unchanged; abs. of new subtopic — see concerns) | 25 |
| 4 | `geometry` | 5 (+ 3D Geometry & Transformations) | 19 |
| 5 | `trigonometry` | 1 | 15 |
| 6 | `precalculus` | 2 (+ Conic Sections) | 21 |
| 7 | `calculus` | 4 (unchanged; Limits absorbs orphan lessons) | 20 |
| 8 | `discrete-math` | 1 (Number Theory absorbs orphans; Graph Theory/Induction absorb orphans) | 20 |
| 9 | `probability-statistics` | 4 (unchanged; each absorbs orphan lessons) | 26 |
| 10 | `competition-math` | 6 | 11 |

Total after remap: 230 lessons (unchanged — this is a reclassification, not a content change).

## Remap Table

| orphan topicSlug | disposition | target topicSlug | target subtopic | lesson IDs | rationale |
|---|---|---|---|---|---|
| `probability-expected-value` | MERGE_INTO_SUBTOPIC | `probability-statistics` | Probability (Conditional Probability & Bayes' Theorem) | 1896, 1897, 1898, 1899 | 1896/1897 titles ("Introduction to Probability", "Conditional Probability") near-duplicate 0729/0731; 1898/1899 (expected value) are a natural extension of the same subtopic, no separate canonical home exists. |
| `number-properties-divisibility` | MERGE_INTO_SUBTOPIC | `discrete-math` | Number Theory (Divisibility, Primes & Modular Arithmetic) | 1900, 1901, 1902, 1903 | Direct content overlap: "Understanding Prime Numbers"/"Divisibility Rules" duplicate 0741 ("Divisibility and Prime Numbers"); GCD/LCM are standard extensions of the same subtopic. |
| `3d-geometry-transformations` | ADD_AS_SUBTOPIC | `geometry` | 3D Geometry & Transformations | 1904, 1905, 1906 | Canonical `geometry` is entirely 2D (proofs, similarity, circles, planar transformations) — no 3D content exists anywhere in the subject. Distinct and legitimate; add as a 5th subtopic. |
| `statistics-averages` | MERGE_INTO_SUBTOPIC | `probability-statistics` | Descriptive Statistics & Statistical Inference | 1907, 1908, 1909 | Mean/median/mode, variance/std-dev, and graph interpretation are exactly what 0737 ("Descriptive Statistics & Data Analysis") already covers; orphan is an intro-level subset. |
| `combinatorial-probability` | MERGE_INTO_SUBTOPIC | `probability-statistics` | Counting Principles (Permutations & Combinations) | 1910, 1911, 1912 | "Calculating Probabilities with Combinations" is the direct intersection of counting + probability already taught in this subtopic (0725–0728); avoids a redundant micro-subtopic. |
| `functions-and-their-properties` | MERGE_INTO_SUBTOPIC | `functions` | Function Notation & Domain/Range | 1913, 1914, 1915 | "Understanding Function Definitions", "Graphing Functions and Transformations", "Analyzing Function Behavior" are covered at more depth by 0642–0649; orphan is an intro-level restatement. |
| `inequalities-and-optimization` | ADD_AS_SUBTOPIC | `algebra` | Inequalities & Optimization | 1916, 1917, 1918 | `algebra`'s "Linear Equations, Inequalities & Systems" (0614–0620) covers basic inequalities but not optimization; content is close enough to fold in, but titles ("Optimization Problems with Inequalities") aren't literal duplicates — safer as an added subtopic than a silent merge. |
| `conic-sections` | ADD_AS_SUBTOPIC | `precalculus` | Conic Sections | 1919, 1920, 1921 | No canonical topic covers parabolas/ellipses/hyperbolas anywhere in HS Math. Conics are standard precalculus content and `precalculus` already covers polar/parametric/vectors — natural home. Only 3 lessons, too thin for NEW_TOPIC. |
| `geometry-of-shapes` | MERGE_INTO_SUBTOPIC | `geometry` | split: 1922→Geometric Proofs & Congruence, 1923→Circles & Coordinate Geometry, 1924→Transformational Geometry | 1922, 1923, 1924 | Each lesson is an intro-level duplicate of an existing subtopic: "Properties of Triangles" overlaps 0662 (congruence), "Circles and Their Measurements" overlaps 0669, "Transformations in Geometry" overlaps 0673/0674. Splitting avoids creating a redundant catch-all subtopic. |
| `graph-theory-basics` | MERGE_INTO_SUBTOPIC | `discrete-math` | Graph Theory | 1925, 1926 | Direct title/content duplicate of 0746 ("Graph Theory") and 0747 ("Graphs, Vertices, and Edges"). |
| `sequences-series` | MERGE_INTO_SUBTOPIC | `precalculus` | Sequences & Series | 1927, 1928 | "Introduction to Arithmetic Sequences" / "Exploring Geometric Series" duplicate 0692 ("Arithmetic and Geometric Sequences") at a more basic level. |
| `limits-and-approximations` | MERGE_INTO_SUBTOPIC | `calculus` | Limits & Continuity | 1929, 1930 | Direct overlap with 0707 ("Understanding Limits: The Idea of Approaching a Value") and 0709 (algebraic/formal limits). |
| `prime-factorization` | MERGE_INTO_SUBTOPIC | `discrete-math` | Number Theory (Divisibility, Primes & Modular Arithmetic) | 1931, 1932 | "Understanding Prime Numbers" is a near-exact title duplicate of orphan 1900 (also merging here) and content duplicate of 0741; consolidate all prime/divisibility orphans into one target subtopic. |
| `graphical-interpretation` | MERGE_INTO_SUBTOPIC | `functions` | Function Transformations | 1933, 1934 | "Interpreting Linear Graphs" / "Analyzing Quadratic Functions" are graph-reading skills already covered by 0652 ("Transformation Applications: Reading Graphs"). |
| `arithmetic-sequences` | MERGE_INTO_SUBTOPIC | `precalculus` | Sequences & Series | 1935, 1936 | Same target as orphan `sequences-series` above — "Understanding Arithmetic Sequences" / "Applications of Arithmetic Sequences" duplicate 0692; two separate orphan topics on the same subject should land in one subtopic. |
| `set-theory-and-cardinality` | MERGE_INTO_SUBTOPIC | `mathematical-foundations` | Sets, Functions & Mathematical Notation | 1937, 1938 | Direct duplicate of 0593 ("Set Theory Fundamentals") and 0599 ("Cardinality and Cantor"). |
| `expected-outcomes-in-games` | MERGE_INTO_SUBTOPIC | `probability-statistics` | Probability (Conditional Probability & Bayes' Theorem) | 1939, 1940 | Expected-value content; same target as orphan `probability-expected-value` (1898/1899) — consolidate rather than leave two near-identical orphan clusters on expected value. |
| `rational-expressions-simplification` | MERGE_INTO_SUBTOPIC | `algebra` | Polynomials, Factoring & Rational Expressions | 1941, 1942 | Direct duplicate of 0623 ("Rational Expressions") in the same canonical topic. |
| `mathematical-induction` | MERGE_INTO_SUBTOPIC | `discrete-math` | Number Theory (Divisibility, Primes & Modular Arithmetic)* | 1943, 1944 | *`discrete-math`'s actual induction content lives in the single flattened subtopic (0748–0750, "Recursion & Mathematical Induction") that the topic dump merges under "Number Theory…" — see Concerns. Direct duplicate of 0750 ("Mathematical Induction") and 0586 in `mathematical-foundations`; chose `discrete-math` since it's the more specific/algorithmic treatment. |
| `infinite-series` | MERGE_INTO_SUBTOPIC | `precalculus` | Sequences & Series | 1945, 1946 | "Convergence and Divergence of Series" / "Power Series and Taylor Series" extend 0703 ("Sequences, Series, and Convergence"); Taylor series is calculus-adjacent but the existing convergence lesson already lives in `precalculus`, so keep the cluster together rather than splitting 2 lessons into `calculus`. |

**Orphans resolved: 20 / 20. NEEDS_HUMAN: 0. NEW_TOPIC: 0.**

## Concerns

1. **`discrete-math` subtopic labeling is misleading in the dump.** The script's grouping shows a single subtopic name "Number Theory (Divisibility, Primes & Modular Arithmetic)" holding 12 lessons that actually span four distinct micro-topics (number theory 0741–0743, Boolean algebra 0744–0745, graph theory 0746–0747, induction/recursion 0748–0750, plus review 0751–0752). This looks like a display/label artifact rather than true data — worth checking whether `subtopic` values in the source JSON are more granular than the dump implies, or whether `discrete-math` itself should be split into named subtopics (Number Theory, Logic, Graph Theory, Induction) as a follow-up cleanup independent of the orphan merge.
2. **Duplicate orphan clusters on the same subject.** Three pairs of orphans cover near-identical ground and were merged to the same target: (a) `probability-expected-value` + `expected-outcomes-in-games` (expected value), (b) `sequences-series` + `arithmetic-sequences` (arithmetic/geometric sequences), (c) `number-properties-divisibility` + `prime-factorization` (primes/divisibility). Recommend flagging these six source lessons for a content/duplication review after remap — some individual lesson bodies may be near-identical and worth pruning rather than just relabeling.
3. **`mathematical-induction` (1943, 1944) has two plausible homes** — `discrete-math` (0748–0750, algorithmic framing) and `mathematical-foundations` (0586, proof-technique framing). I chose `discrete-math` because the orphan lessons ("Introduction to Mathematical Induction", "Applications of Induction in Proofs") read closer to the existing `discrete-math` treatment, but this is a judgment call worth a second look.
4. **`inequalities-and-optimization`** was added as a new subtopic rather than merged because "Optimization Problems with Inequalities" isn't a literal duplicate of anything in `algebra`'s existing inequalities coverage (0616 is linear programming at the intro level) — but there's a real risk of eventual overlap with `algebra`'s 0616 and `competition-math`'s "Mathematical Modeling & Optimization" (0761). Not a blocker, just worth a title-collision check if content bodies are compared later.
5. **No true NEW_TOPIC candidates.** No orphan cluster represented foundational content lacking any canonical home in HS Math (unlike science subjects, e.g. cell biology) — every orphan mapped either as a merge or a subtopic addition to one of the 10 existing canonical topics.
