# Topic Audit — Middle School Biology

**Summary:** 183 lessons · 5 true canonical topics · 14 orphan/fragment topics (the tool flagged 11 orphans + 3 small "canonical" topics that are also fragments).

The dump script marks 8 topics "canonical," but three of them — `fungi-mycology`, `anatomy-physiology`, `taxonomy-classification-basics` — are single-subtopic fragments (2 lessons each, IDs in the 1664–1669 backfill range) that duplicate their own name exactly like the flagged orphans. Trusting the data over the flag, this audit treats them as orphans. The 5 genuine canonical topics each have 4 well-formed subtopics of 5–9 lessons.

Note: `evolution-classification` itself carries two internal fragment subtopics — **Major Animal Phyla** (1 lesson, nsb-lesson-1592) and **Kingdoms of Life** (1 lesson, nsb-lesson-1593) — flagged in Concerns.

---

## Clean topic list (canonical only, pedagogical order)

| # | topicSlug | Topic | Subtopics | Lessons |
|---|-----------|-------|-----------|---------|
| 1 | `genetics-heredity` | Genetics & Heredity | 4 | 31 |
| 2 | `evolution-classification` | Evolution & Classification | 4 (+2 fragment subtopics) | 30 |
| 3 | `plant-biology` | Plant Biology | 4 | 30 |
| 4 | `human-body-systems` | Human Body Systems | 4 | 29 |
| 5 | `ecology` | Ecology | 4 | 28 |

The 5 canonical topics hold 148 lessons. The remaining 35 lessons live in 14 fragment topics remapped below.

---

## REMAP table

| Orphan topicSlug | Disposition | Target topicSlug | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `evolution-natural-history` | MERGE_INTO_SUBTOPIC | `evolution-classification` | Natural Selection & Adaptations | 1657, 1658, 1659 | "Basics of Evolution / Evidence for Evolution / Human Evolution" are core evolution intro content; Fossil Evidence subtopic already covers "evidence," Natural Selection is the intro home. No title collisions. |
| `ecology-and-environmental-impact` | MERGE_INTO_SUBTOPIC | `ecology` | Human Impact on Ecosystems | 1662, 1663 | 1663 "Human Impact on Ecosystems" duplicates the subtopic name exactly; 1662 "Ecosystems and Their Components" fits the same subtopic. See Concerns: 1663 title collides with existing nsb-lesson-1276. |
| `symbiotic-relationships` | ADD_AS_SUBTOPIC | `ecology` | Symbiotic Relationships | 1660, 1661 | Distinct ecology content (types of symbiosis, impact on ecosystems) not covered by any existing ecology subtopic. Legitimate new subtopic under Ecology. |
| `plant-hormones-growth` | MERGE_INTO_SUBTOPIC | `plant-biology` | Plant Responses & Tropisms | 1670, 1671 | Plant hormones/growth responses are the exact theme of existing lesson 1305 "Plant Hormones and Their Functions." Watch collision (see Concerns). |
| `animal-behavior-learning` | ADD_AS_SUBTOPIC | `evolution-classification` | Animal Behavior & Learning | 1672, 1673 | Animal behavior (instinct/learned, learning in animals) has no home; closest canonical topic is Evolution & Classification (behavioral adaptation). Add as new subtopic. Alt home discussed in Concerns. |
| `nutrition-and-metabolism` | MERGE_INTO_SUBTOPIC | `human-body-systems` | Digestive & Excretory Systems | 1654, 1655, 1656 | "Nutrition / Metabolism / Digestion" map to the Digestive subtopic, which already has 1206 (digestion), 1208 (nutrition). Collision risk on nutrition/digestion (see Concerns). |
| `microbiology-infectious-diseases` | ADD_AS_SUBTOPIC | `human-body-systems` | Immune System & Infectious Disease | 1641, 1642, 1643, 1644 | Immune system, disease spread, antibiotics — no immunology subtopic exists anywhere. Body Systems is the best canonical fit; add as a new subtopic. Could also anchor a KEEP microbiology topic (see Concerns). |
| `viral-biology` | MERGE_INTO_SUBTOPIC | `human-body-systems` | Immune System & Infectious Disease | 1674, 1675 | Virus structure/replication/infection belongs with microbiology/infectious-disease content; fold into the new subtopic created from `microbiology-infectious-diseases`. |
| `genetics-and-heredity` | MERGE_INTO_SUBTOPIC | `genetics-heredity` | (split, see rationale) | 1651, 1652, 1653 | Exact duplicate of canonical topic. 1651 "Intro to DNA Structure" → DNA Structure & Function; 1652 "Mendelian Genetics" → Traits & Inheritance; 1653 "Genetic Variation and Mutations" → Mutations & Genetic Variation. All three collide with existing lessons (see Concerns). |
| `taxonomy-classification-basics` | MERGE_INTO_SUBTOPIC | `evolution-classification` | Taxonomy & Classification | 1668, 1669 | "Intro to Taxonomy / Levels of Classification" duplicate the existing Taxonomy & Classification subtopic (1242 "Why We Classify," 1243 domains). Straight merge. |
| `evolution-classification` internal → `Kingdoms of Life` | MERGE_INTO_SUBTOPIC | `evolution-classification` | Taxonomy & Classification | 1593 | Single-lesson fragment subtopic; "Kingdoms of Life" is classification content — fold into the Taxonomy & Classification subtopic. |
| `evolution-classification` internal → `Major Animal Phyla` | MERGE_INTO_SUBTOPIC | `evolution-classification` | Taxonomy & Classification | 1592 | Single-lesson fragment subtopic; animal phyla is classification content — fold into Taxonomy & Classification. |
| `fungi-mycology` | ADD_AS_SUBTOPIC | `evolution-classification` | Kingdoms & Diversity of Life | 1664, 1665 | Fungi as a kingdom has no home; group with taxonomy/kingdom diversity content. NEEDS_HUMAN alternative below. |
| `cell-structure-function` | NEEDS_HUMAN | — | — | 1648, 1649, 1650 | Cell theory/organelles/membrane is foundational biology with NO canonical home in MS Biology (no cell-biology topic exists). See Concerns. |
| `experimental-design-methodology` | NEEDS_HUMAN | — | — | 1645, 1646, 1647 | Scientific method / variables / controlled experiments is cross-cutting lab-skills content, not a biology topic. No canonical home. See Concerns. |
| `anatomy-physiology` | NEEDS_HUMAN | — | — | 1666, 1667 | Must be split: 1666 "Intro to Human Body Systems" → `human-body-systems`; 1667 "Cells: Building Blocks of Life" → the unresolved cell-structure question. See Concerns. |

---

## Concerns

### Title collisions (must resolve before any merge)
- **`genetics-and-heredity` (1651–1653) → `genetics-heredity`:** every lesson near-duplicates an existing one.
  - 1651 "Introduction to DNA Structure" ≈ 1167 "DNA: The Blueprint of Life."
  - 1652 "Mendelian Genetics Basics" ≈ 1177 "Mendel's Laws."
  - 1653 "Genetic Variation and Mutations" ≈ 1190/1192. These are likely redundant, not additive — recommend deduping (drop or rewrite) rather than a raw merge.
- **`ecology-and-environmental-impact` 1663 "Human Impact on Ecosystems"** is a verbatim duplicate of existing **1276 "How Humans Change Ecosystems"** subtopic content and the subtopic name itself. Merge only after confirming 1663 isn't a straight dupe of 1276.
- **`plant-hormones-growth` (1670, 1671)** overlaps existing plant lesson **1305 "Plant Hormones and Their Functions."** Check 1670 "Introduction to Plant Hormones" vs 1305 before merging.
- **`nutrition-and-metabolism`:** 1656 "Digestion Process" ≈ 1206 "How Digestion Works"; 1654 "Basics of Nutrition" ≈ 1208 "Nutrition: Connecting Food to Body Function." Merge risks two near-identical lessons in one subtopic.

### NEEDS_HUMAN orphans (3, + the split)
- **`cell-structure-function` (1648–1650)** and **`anatomy-physiology`/1667 "Cells"**: MS Biology has **no cell-biology topic at all** — a real taxonomy gap. Options: (a) create a new canonical `cell-biology` topic seeded by 1648–1650 + 1667 (only ~4 lessons, thin for a topic); (b) add a "Cell Structure & Function" subtopic under `genetics-heredity` (DNA lives there, cells are adjacent) — imperfect but keeps it out of the sidebar as an orphan. Human should decide whether cells warrant a top-level topic.
- **`experimental-design-methodology` (1645–1647)**: scientific-method/lab-skills content that isn't biology-specific. It may belong to a cross-subject "Science Skills" area rather than Biology, or be dropped from the Biology sidebar. No biology canonical home.
- **`anatomy-physiology` (1666, 1667)** must be split, not merged whole: 1666 → `human-body-systems` (clean fit), 1667 → the cell-biology decision above.
- **`fungi-mycology` (1664, 1665)** and **`microbiology-infectious-diseases`/`viral-biology`**: an alternative to the proposed merges is to KEEP a single new canonical **"Microbiology & Diversity of Life"** topic seeded by fungi (1664–1665) + microbiology (1641–1644) + viral (1674–1675) = 8 lessons, which is a well-sized topic. That is arguably cleaner than scattering them into Evolution and Body Systems. Flagged for human choice; proposed dispositions above take the "merge into existing" path per the audit's default preference for not inventing topics.

### Mis-organized canonical topic
- **`evolution-classification`** contains two 1-lesson fragment subtopics (**Major Animal Phyla** 1592, **Kingdoms of Life** 1593) that were appended to an otherwise clean 4-subtopic topic. Both are classification content and should be folded into the **Taxonomy & Classification** subtopic (remapped above) so the topic returns to 4 clean subtopics.

---

## Disposition tally
- Orphans/fragments resolved (MERGE or ADD): **11** — `evolution-natural-history`, `ecology-and-environmental-impact`, `symbiotic-relationships`, `plant-hormones-growth`, `animal-behavior-learning`, `nutrition-and-metabolism`, `microbiology-infectious-diseases`, `viral-biology`, `genetics-and-heredity`, `taxonomy-classification-basics`, `fungi-mycology` (plus the 2 internal fragment subtopics 1592/1593).
- NEEDS_HUMAN: **3** — `cell-structure-function`, `experimental-design-methodology`, `anatomy-physiology` (the latter partly resolvable: 1666→body-systems, 1667 pending the cell-biology decision).
- KEEP_AS_TOPIC: 0 proposed (a microbiology/diversity KEEP is offered as an alternative in Concerns).
