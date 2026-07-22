# Topic Audit — Energy / High School

**Summary:** 151 lessons · 7 canonical topics (1 of which, `genetics-molecular-biology`, is actually pollution mislabeled canonical) · 18 orphan topics flagged by the script.

## Clean topic list (canonical, pedagogical order)

| # | topicSlug | Subtopics (after remap) | Lessons (after remap) |
|---|---|---|---|
| 1 | `thermodynamics-energy-laws` | 7 (5 existing + 2 new) | 32 |
| 2 | `nuclear-physics-energy` | 6 | 40 |
| 3 | `electrical-power-grid` | 5 (4 existing + 1 new) | 6 |
| 4 | `fossil-fuels-combustion` | 7 | 22 |
| 5 | `renewable-energy-systems` | 5 | 10 |
| 6 | `policy-economics-emerging` | 5 | 5 |

`genetics-molecular-biology` is removed from the "canonical" list — see Concerns. 12 orphan clusters (27 lessons) are held out pending human review (see Concerns) and not placed into any topic above.

## Remap table

| orphan topicSlug | disposition | target topicSlug | target subtopic | lesson IDs | rationale |
|---|---|---|---|---|---|
| `thermodynamics-phase-transitions` | ADD_AS_SUBTOPIC | `thermodynamics-energy-laws` | **new:** "Foundations: Laws of Thermodynamics & Phase Changes" | nsb-lesson-2014, 2015 | Intro-level laws/phase-change content; no exact-title overlap with existing subtopics (which are more applied/exam-prep framed), but clearly belongs in the thermo topic as a foundational on-ramp. |
| `statistical-mechanics-entropy` | ADD_AS_SUBTOPIC | `thermodynamics-energy-laws` | **new:** "Statistical Mechanics & Entropy" | nsb-lesson-2016, 2017 | Microscopic/statistical treatment of entropy is a distinct angle from the existing "Entropy & Second Law" subtopic (which is macroscopic/engineering-framed); adds depth rather than duplicating. |
| `electromagnetism-and-charge-transport` | ADD_AS_SUBTOPIC | `electrical-power-grid` | **new:** "Electromagnetism & Circuit Fundamentals" | nsb-lesson-2018, 2019 | Basic charge/circuit content is a prerequisite for the topic's existing AC/DC, transformer, and grid subtopics; no current intro-circuits subtopic exists there. |
| `nuclear-physics-radioactivity` | MERGE_INTO_SUBTOPIC | `nuclear-physics-energy` | "Nuclear Structure & Binding Energy" (nsb-lesson-2028) / "Radioactive Decay & Half-Life" (nsb-lesson-2029) | nsb-lesson-2028, 2029 | Titles ("Basics of Nuclear Structure", "Radioactive Decay Processes") are intro-level duplicates of subject matter already covered by `nuclear-physics-energy`'s two largest subtopics; splitting the 2 lessons across the two matching subtopics avoids a redundant new subtopic. |
| `environmental-chemistry-pollution` | MERGE_INTO_SUBTOPIC | `fossil-fuels-combustion` | "Emissions, Air Pollution & Environmental Impact" | nsb-lesson-2020, 2021 | Direct topical overlap: target subtopic already has "Acid Rain and Sulfur Chemistry" and "Carbon Dioxide and Climate Impact" lessons; "Acid Rain Formation and Effects" and "Greenhouse Gases and Climate Change" are near-duplicate content on the same fossil-fuel emissions theme. |
| `biological-processes-metabolism` | NEEDS_HUMAN | — | — | nsb-lesson-1984, 1985, 1986 | Photosynthesis/cellular respiration/metabolism — pure Biology content, no Energy-subject relevance beyond a loose "energy in living systems" analogy already covered by `thermodynamics-energy-laws`'s "First Law in Living Systems" lesson. Likely mis-tagged `subject` at ingestion, not a taxonomy problem. |
| `spectroscopy-characterization-techniques` | NEEDS_HUMAN | — | — | nsb-lesson-1987, 1988, 1989 | Generic analytical-chemistry technique content; no tie to energy systems, fuels, or nuclear/thermal topics. |
| `chemical-kinetics-reaction-mechanisms` | NEEDS_HUMAN | — | — | nsb-lesson-1990, 1991, 1992 | General chemistry (reaction rates/mechanisms), not energy-specific; doesn't fit combustion stoichiometry subtopics either (those are about combustion products/energy release, not kinetics). |
| `quantum-computing-information` | NEEDS_HUMAN | — | — | nsb-lesson-1993, 1994, 1995 | Computer science / quantum information, unrelated to any Energy canonical topic. |
| `astrophysics-cosmology` | NEEDS_HUMAN | — | — | nsb-lesson-1996, 1997, 1998 | Belongs in Earth and Space, not Energy; stellar fusion is only tangentially related to `nuclear-physics-energy`'s fusion subtopic and titles don't match. |
| `microbiology-pathogen-interactions` | NEEDS_HUMAN | — | — | nsb-lesson-1999, 2000, 2001 | Pure Biology (pathogens, antibiotics); no Energy relevance. |
| `nanotechnology-materials-science` | NEEDS_HUMAN | — | — | nsb-lesson-2002, 2003, 2004 | Mixed cluster: nsb-lesson-2004 ("Applications of Nanotechnology in Energy" — solar cells, batteries) is genuinely energy-relevant, but nsb-lesson-2002/2003 are generic materials-science intro content. Splitting the subtopic is possible but leaves an awkward 1-lesson fragment; recommend human call on whether to extract just 2004 into `renewable-energy-systems` or leave the cluster intact. |
| `polymer-chemistry-synthesis` | NEEDS_HUMAN | — | — | nsb-lesson-2008, 2009, 2010 | General polymer chemistry; no energy-system tie (not even battery/solar materials framing). |
| `enzyme-catalysis-biochemistry` | NEEDS_HUMAN | — | — | nsb-lesson-2011, 2012, 2013 | Pure biochemistry; unrelated to Energy canonical topics. |
| `computational-biology-bioinformatics` | NEEDS_HUMAN | — | — | nsb-lesson-2026, 2027 | Pure bioinformatics; unrelated to Energy. |
| `metallurgy-alloy-formation` | NEEDS_HUMAN | — | — | nsb-lesson-2030, 2031 | Materials science; only loosely touches reactor materials but titles are generic ("Introduction to Metallurgy") with no nuclear/energy framing. |
| `optics-and-photonics` | NEEDS_HUMAN | — | — | nsb-lesson-2022, 2023 | General optics; no tie to solar PV, fusion lasers, or any canonical Energy subtopic despite thematic adjacency. |
| `graphene-and-two-dimensional-materials` | NEEDS_HUMAN | — | — | nsb-lesson-2024, 2025 | Generic materials science; no energy-storage/solar framing in the titles to justify a `renewable-energy-systems` merge. |
| `genetics-molecular-biology` *(flagged canonical by script)* | NEEDS_HUMAN | — | — | nsb-lesson-2005, 2006, 2007 | Structurally identical to the orphan pattern (topic slug = subtopic name, 3 lessons, single subtopic) — the script's canonical heuristic mis-scored it. Pure genetics content (DNA structure, gene expression, Mendelian genetics); no Energy relevance. Recommend demoting from "canonical" and treating as part of the same mis-tagged-subject batch as the other 11 clusters above. |

## Concerns

1. **Systemic mis-subject-tagging, not a taxonomy problem.** 12 clusters (27 lessons, including the mis-flagged "canonical" `genetics-molecular-biology`) are coherent, well-formed 2–3-lesson mini-topics on Biology, Chemistry, Physics, Earth/Space, and CS subject matter that has **no plausible home under Energy**. Unlike a typical orphan (a stray subtopic of an otherwise-covered theme), these look like an entire filler batch that was tagged `subject: "Energy"` in error at ingestion. Recommend checking whether identical lesson titles/IDs-adjacent content exist correctly tagged under Biology/Chemistry/Physics/Earth and Space at HS level before deciding whether to re-tag `subject` (out of scope for a topicSlug remap) or delete as duplicate filler. All routed to NEEDS_HUMAN rather than forced NEW_TOPIC, since NEW_TOPIC is meant for foundational content that genuinely belongs in-subject.
2. **`genetics-molecular-biology` should not be treated as canonical.** It passed the script's heuristic (likely a lesson-count threshold) but has the exact orphan shape: topicSlug equals its one subtopic, 3 lessons. Treat as an orphan/NEEDS_HUMAN, not part of the clean topic list.
3. **Pre-existing near-duplication inside `fossil-fuels-combustion` (not caused by this audit).** The topic already contains two subtopics that overlap heavily: "Hydrocarbons & Petroleum Refining" (has "Petroleum Refining and Fractionation") and "Petroleum Refining and Industrial Applications" (has "Petroleum Refining Economics and Optimization") — different lessons, same theme, arguably splittable/mergeable. Also "Oil Spills and Environmental Remediation" is a small, self-contained 3-lesson subtopic that reads like a later-added fragment (similar drift pattern to the orphans) even though it's already nested correctly under the canonical topic. No action taken since it's already a subtopic of a canonical topic and out of scope for orphan remapping, but flagging for a future pass.
4. **No title collisions found** among the 5 merge/add dispositions above — checked each orphan's lesson titles against its target topic's full lesson list before assigning.
5. **`nanotechnology-materials-science` split option.** If a human reviewer wants partial credit: nsb-lesson-2004 ("Applications of Nanotechnology in Energy") could be pulled out and ADD_AS_SUBTOPIC'd into `renewable-energy-systems` as a new "Advanced & Nanostructured Materials" subtopic, leaving nsb-lesson-2002/2003 in the NEEDS_HUMAN bucket. Not done automatically because it fragments a 3-lesson orphan into a 1-lesson subtopic, which itself becomes a new orphan-like fragment.
