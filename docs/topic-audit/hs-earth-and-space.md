# Topic Audit — Earth and Space / High School

**Summary:** 186 lessons, 8 canonical topics, 13 orphan topics (37 orphan lessons).

## Clean topic list (after remap)

| Order | topicSlug | Subtopics (after merge) | Lessons (after merge) |
|---|---|---|---|
| 1 | `geosphere` | 4 | 27 |
| 2 | `plate-tectonics-geodynamics` | 4 | 20 |
| 3 | `geochemistry` | 6 | 24 |
| 4 | `geologic-time` | 4 | 18 |
| 5 | `atmosphere-climate` | 7 | 22 |
| 6 | `oceanography` | 5 | 22 |
| 7 | `astronomy-astrophysics` | 6 | 36 |
| 8 | `resources-hazards` | 4 | 12 |
| 9 | `planetary-science-astrobiology` *(NEW)* | 3 | 8 |

Pedagogical order: solid-earth topics first (structure → tectonics → chemistry →
time), then fluid-earth (atmosphere, ocean), then astronomy, then applied
(resources/hazards), then the new planetary-science/astrobiology topic.

## Remap table

| Orphan topicSlug | Disposition | Target topic | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `mineral-identification-properties` | MERGE_INTO_SUBTOPIC | `geochemistry` | Mineralogy & Crystal Formation | 1954, 1955, 1956 | Duplicates existing "Mineral Identification and Properties" (nsb-lesson-0462) and Mohs-scale content (nsb-lesson-1590 "Mohs Hardness and Mineral ID"). Title collision risk: 1954/1955 vs 0462 — dedupe or fold as intro-tier variants before merge. |
| `stellar-properties-classification` | MERGE_INTO_SUBTOPIC | `astronomy-astrophysics` | Stellar Evolution & H-R Diagram | 1957, 1958, 1959 | Spectral classification/luminosity/mass duplicate "Stellar Spectra and the Classification System" (0437) and the H-R diagram cluster. Collision: 1958 "Spectral Classification of Stars" vs 0437 — near-identical, dedupe on merge. |
| `volcanic-processes-and-eruptions` | MERGE_INTO_SUBTOPIC | `plate-tectonics-geodynamics` | Volcanism & Magma Formation | 1966, 1967, 1968 | Eruption types/hazards/monitoring duplicate 0392 (Eruption Styles and Products) and 0394 (Volcanic Hazards and Monitoring). Collision: 1967 "Volcanic Hazards and Mitigation" vs 0394 — near-duplicate, dedupe. |
| `galactic-dynamics-structure` | MERGE_INTO_SUBTOPIC | `astronomy-astrophysics` | Galaxies & Galactic Structure | 1969, 1970, 1971 | Structure/formation/interaction duplicate 0446 (Milky Way Structure), 0448 (Dark Matter and Galaxy Formation). No exact title collision but strong topical overlap — treat as deeper/alt-level coverage of same subtopic. |
| `cosmic-microwave-background` | MERGE_INTO_SUBTOPIC | `astronomy-astrophysics` | Cosmology (Big Bang, CMB, expansion of universe) | 1978, 1979 | Direct collision: "The Cosmic Microwave Background" already exists as 0454. Merge both as supplementary CMB material within the same subtopic; drop or rename 1978 to avoid a duplicate title. |
| `tides-and-oceanography` | MERGE_INTO_SUBTOPIC | `oceanography` | Waves, Tides & Coastal Processes / Ocean Circulation | 1975 → Waves, Tides & Coastal Processes; 1976 → Ocean Circulation (Surface & Thermohaline); 1977 → Marine Ecosystems | Collision: "Understanding Tidal Forces" (1975) vs "Tides and Tidal Forces" (0425) — near-duplicate. "Ocean Currents and Climate" (1976) fits circulation; "Tides and Marine Life" (1977) fits marine ecosystems better than a second tides bucket. |
| `wave-dynamics-coastal-processes` | MERGE_INTO_SUBTOPIC | `oceanography` | Waves, Tides & Coastal Processes | 1980, 1981 | Collisions: "Wave Properties and Behavior" (1980) vs "Wave Mechanics and Propagation" (0424); "Coastal Erosion and Deposition" (1981) vs "Coastal Erosion and Sediment Transport" (0426). Near-identical pairs — dedupe on merge. |
| `geological-features-processes` | MERGE_INTO_SUBTOPIC | split: `geochemistry` (Rock Cycle) / `plate-tectonics-geodynamics` (Plate Boundaries + Earthquakes) / `plate-tectonics-geodynamics` (Volcanism & Magma Formation) | 1951 → Rock Cycle (Igneous, Sedimentary, Metamorphic); 1952 → Plate Boundaries (Divergent, Convergent, Transform); 1953 → Volcanism & Magma Formation | Grab-bag orphan whose 3 lessons are each an intro-level restatement of an existing subtopic ("Types of Rocks and Their Formation" ~ Rock Cycle overview 0457; "Plate Tectonics and Earthquakes" ~ Plate Boundaries/Earthquakes cluster; "Volcanic Activity and Landforms" ~ Volcanic Landforms 0393). No single target fits all three — split by lesson. |
| `meteorology-and-atmospheric-phenomena` | ADD_AS_SUBTOPIC | `atmosphere-climate` | Meteorology & Weather Basics *(new subtopic)* | 1947, 1948, 1949, 1950 | Content (basic weather systems, precipitation types, severe weather, climate/weather linkage) is a coherent intro-tier cluster distinct from the more advanced "Weather Systems & Storm Formation" (fronts/cyclones) and "Climate Change" subtopics already present. No title collisions. Keeping it as its own subtopic avoids awkwardly stuffing precipitation-type content into storm-formation. |
| `hydrology-water-systems` | split: ADD_AS_SUBTOPIC + MERGE | `resources-hazards` (new subtopic "Hydrology & Water Systems") for 1961, 1962; `geochemistry` → Biogeochemical Cycles for 1960 | Hydrology & Water Systems (new) / Biogeochemical Cycles | 1961, 1962 → resources-hazards (new subtopic); 1960 → geochemistry | "Groundwater and Aquifers" and "Surface Water and Watersheds" have no existing home — closest fit is `resources-hazards`, which already covers "Water Resources and Freshwater Availability" (0475), making a natural sibling subtopic. "The Water Cycle Explained" (1960) collides with existing "The Water Cycle" (0470) under geochemistry's Biogeochemical Cycles — merge there instead. |
| `planetary-geology-surface-processes` | NEW_TOPIC | `planetary-science-astrobiology` *(new topic)* | Planetary Surfaces & Geology | 1963, 1964, 1965 | Content covers other-worlds geology (Mars, terrestrial planets) — no canonical topic addresses planetary bodies besides Earth. Clusters with the two orphans below into a coherent new topic. |
| `solar-system-formation-evolution` | NEW_TOPIC | `planetary-science-astrobiology` *(new topic)* | Solar System Formation & Evolution | 1972, 1973, 1974 | Nebular hypothesis / planetary differentiation / solar system dynamics is foundational planetary-science content with no existing home in `astronomy-astrophysics` (which is stellar/galactic/cosmological, not solar-system-focused) or `geosphere` (Earth-only). |
| `astrobiology-and-early-life` | NEW_TOPIC | `planetary-science-astrobiology` *(new topic)* | Astrobiology & Origins of Life | 1982, 1983 | Origins of life / extremophiles content has no canonical home; pairs naturally with planetary geology and solar-system topics under a single new "Planetary Science & Astrobiology" topic (8 lessons, 3 subtopics — in range). |

## Proposed NEW_TOPIC detail

**`planetary-science-astrobiology`** (8 lessons, 3 subtopics — combines three orphans that each independently sit below the 4-lesson minimum but together form a well-formed topic):

- Planetary Surfaces & Geology (3): Volcanism on Terrestrial Planets, Impact Cratering Processes, Erosion and Weathering on Mars
- Solar System Formation & Evolution (3): Nebular Hypothesis Overview, Planetary Differentiation and Composition, Impact of Solar System Dynamics
- Astrobiology & Origins of Life (2): Origins of Life on Earth, Extremophiles and Life's Adaptations

This is below the "4–7 subtopics" canonical guideline (3 subtopics) and one
subtopic is thin (2 lessons), so flag for a follow-up content pass to add
1-2 more lessons to Astrobiology (e.g., habitability/exoplanets) rather than
treating this as fully mature on day one — but it's a materially better home
than force-merging planetary/astrobiology content into Earth-only topics.

## Concerns

1. **Title collisions requiring dedup, not blind merge** (7 pairs): 1954/1955
   vs 0462 (mineral ID); 1958 vs 0437 (spectral classification); 1967 vs 0394
   (volcanic hazards); 1978 vs 0454 (CMB); 1975 vs 0425 (tidal forces); 1980
   vs 0424 (wave mechanics); 1981 vs 0426 (coastal erosion); 1960 vs 0470
   (water cycle). Each merge above should be implemented as a content review,
   not a blind slug rewrite — decide per pair whether to drop the orphan
   lesson, keep both as basic/advanced variants, or fold content together.
2. **`geological-features-processes` had no single clean target** — its 3
   lessons are generic restatements of rock cycle / plate tectonics /
   volcanism content already covered elsewhere; split across 3 target
   subtopics rather than one merge. Worth double-checking after merge that
   none of the 3 destination subtopics balloon past the ~8-lesson guideline
   (Rock Cycle → 6, Plate Boundaries → 7, Volcanism & Magma Formation → 5,
   all still in range once the other splits above are also applied — see
   totals in the clean topic list).
3. **No NEEDS_HUMAN cases** — every orphan had either a clear duplicate
   subtopic, a clear canonical-topic fit, or clustered into a well-motivated
   new topic. The closest call was `hydrology-water-systems`, which is
   split 2/3 to a new subtopic and 1/3 merged for a title collision; flagging
   here in case reviewers prefer keeping all 3 lessons together under one
   disposition rather than split.
4. **`resources-hazards` remains the smallest canonical topic** even after
   gaining the hydrology subtopic (4 subtopics / 12 lessons) — still within
   the 4–7 subtopic guideline but worth a future content pass to round out
   Resource Extraction & Sustainability (currently 2 lessons) and the new
   Hydrology & Water Systems subtopic (2 lessons after merge) to the 4-lesson
   floor.
5. **No canonical topic looked mis-organized on its own** — geosphere,
   plate-tectonics-geodynamics, geochemistry, geologic-time, atmosphere-climate,
   oceanography, and astronomy-astrophysics all have sensible, non-overlapping
   subtopic sets independent of the orphan cleanup.
