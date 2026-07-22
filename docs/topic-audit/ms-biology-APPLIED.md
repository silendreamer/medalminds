# MS Biology — Reorganization APPLIED

Branch: `reorg-ms-biology-topics`. Script: `scripts/reorg-ms-biology.mjs`.
Result: **19 messy topics → 6 clean topics, 0 orphans.** 183 → 170 lessons
(13 duplicate lessons removed).

## Final topic structure (course order)

1. **Cells & the Study of Life** (`foundations-of-life`, 8 lessons) — NEW opening unit
   - Scientific Method & Experiments (3)
   - Cell Structure & Function (5)  ← incl. Metabolism Overview
2. **Ecology** (30) — added *Symbiotic Relationships* (2)
3. **Plant Biology** (30) — unchanged
4. **Genetics & Heredity** (31) — unchanged
5. **Human Body Systems** (36) — added *Immunity & Infectious Disease* (6: microbiology + viral); intro lesson pinned first
6. **Evolution & Classification** (35) — added *Kingdoms & Diversity of Life* (4: fungi + phyla + kingdoms) and *Animal Behavior & Learning* (2); Human Evolution folded into Speciation

## Teaching rationale

The original curriculum (IDs 1167–1312) was a sound 5-unit course but **opened at
genetics** — it never taught cells or the scientific method first. A later backfill
(IDs 1641–1675) supplied that missing foundation **plus** thinner duplicate lessons
re-teaching units the original already covered. This reorg promotes the foundation
to an opening unit, folds the other genuinely-new content into the right units, and
removes the duplicates.

## Lessons removed (duplicate of a better original)

| dropped | title | duplicate of |
|---|---|---|
| 1651 | Introduction to DNA Structure | 1167 DNA: The Blueprint of Life |
| 1652 | Mendelian Genetics Basics | 1177 Mendel's Laws |
| 1653 | Genetic Variation and Mutations | 1190–1197 Mutations subtopic |
| 1654 | Basics of Nutrition | 1208 Nutrition |
| 1656 | Digestion Process | 1206 How Digestion Works |
| 1657 | Basics of Evolution | 1227 What Is Natural Selection? |
| 1658 | Evidence for Evolution | 1237 Fossils as Evidence |
| 1662 | Ecosystems and Their Components | 1255 Producers/Consumers/Decomposers |
| 1663 | Human Impact on Ecosystems | 1276 How Humans Change Ecosystems |
| 1668 | Introduction to Taxonomy | 1242 Why We Classify |
| 1669 | Levels of Classification | 1243 Three Domains of Life |
| 1670 | Introduction to Plant Hormones | 1305 Plant Hormones and Their Functions |
| 1671 | Plant Hormones and Growth Responses | 1305 Plant Hormones and Their Functions |

Kept borderline case: **1655 Metabolism Overview** (catabolism/anabolism/ATP goes
slightly beyond the original nutrition lessons) — relocated to the foundations unit
rather than dropped.

Verification: `npm run build` passes; 0 practice questions referenced any dropped
lesson; both relocated files (1655, 1659) still resolve.

Also added: topic display-name overrides in `src/lib/data.ts` so
`foundations-of-life` renders as "Cells & the Study of Life".
