# Topic Audit — Earth and Space, Middle School

**Summary:** 106 lessons, 7 canonical topics, 5 orphans resolved (4 flagged by
the heuristic + 1 unflagged fragment, `optics-binoculars`, that matches the
orphan pattern exactly: single subtopic duplicating the topic name, 2 lessons).

## Clean Topic List (target taxonomy)

| Order | topicSlug | Subtopics (after remap) | Lessons (after remap) |
|---|---|---|---|
| 1 | `earths-structure-rocks` | 8 (was 5) | 27 (was 19) |
| 2 | `plate-tectonics` | 4 | 15 |
| 3 | `atmosphere-weather` | 6 | 18 |
| 4 | `water-systems` | 4 | 15 |
| 5 | `solar-system` | 5 (was 5, +1 merged lesson) | 17 (was 16) |
| 6 | `stars-universe` | 5 (was 4) | 13 (was 11) |
| — | `optics-binoculars` | dissolved into `stars-universe` | — |

Pedagogical order: solid-Earth structure/geology → plate tectonics →
atmosphere/weather → water systems → solar system → stars/universe. This
mirrors the existing canonical ordering (near/local Earth science first,
then progressively more distant astronomy).

## Remap Table

| Orphan topicSlug | Disposition | Target topicSlug | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `geologic-eras-and-periods` | ADD_AS_SUBTOPIC | `earths-structure-rocks` | Geologic Time & Earth's History | 1703, 1704, 1705 | Geologic time scale / eras / periods is the natural companion to the existing "Rock Cycle" subtopic (rocks and fossils are how geologic time is read); no canonical subtopic already covers this, so it's a distinct addition, not a merge. |
| `fossils-and-fossil-fuels` | ADD_AS_SUBTOPIC | `earths-structure-rocks` | Fossils & Fossil Fuels | 1706, 1707, 1708 | Fossil formation and fossil fuel formation are sedimentary-rock/Earth-history topics, pairing with the new Geologic Time subtopic above under the same topic. Not Energy-subject content — these lessons are framed as Earth-science processes (formation, environmental impact), not energy systems, so they stay in Earth and Space. |
| `karst-topography-characteristics` | ADD_AS_SUBTOPIC | `earths-structure-rocks` | Karst Topography | 1709, 1710 | Karst is a rock-weathering/landform process (limestone dissolution) — closest canonical fit is the rocks/minerals/soil-formation cluster in `earths-structure-rocks`, even though groundwater is the dissolving agent. No existing subtopic (in `water-systems` or elsewhere) already covers this landform, so it's additive, not a merge. |
| `astronomy-and-celestial-bodies` | MERGE_INTO_SUBTOPIC (split) | `solar-system` | Planets, Moons & Their Properties (for 1711); Tides, Seasons & Earth's Motions (for 1712) | 1711 → merge into "Planets, Moons & Their Properties"; 1712 → merge into "Tides, Seasons & Earth's Motions" | 1711 "Understanding the Solar System" duplicates the ground already covered by "The Eight Planets: An Overview" (1017). 1712 "Phases of the Moon" is a near-duplicate of "Solstices, Equinoxes, and Lunar Phases" (1025), which already covers lunar phases and eclipses. Both lessons are redundant overviews rather than distinct content — collapse into the matching existing subtopic instead of creating a new one. |
| `optics-binoculars` | ADD_AS_SUBTOPIC | `stars-universe` | Observational Astronomy Tools | 1713, 1714 | Not flagged by the heuristic (labeled canonical) but structurally identical to an orphan: exactly one subtopic, named identically to the topic slug, holding only 2 lessons. Content (light/optics, how binoculars work) is about tools for observing celestial objects, which fits thematically under `stars-universe` (space exploration/observation) better than any Earth-surface topic. No existing subtopic overlaps, so it's additive. |

## Concerns

- **Title/content collisions requiring care during merge:**
  - `nsb-lesson-1711` ("Understanding the Solar System") vs `nsb-lesson-1017`
    ("The Eight Planets: An Overview") — both are intro-level solar-system
    surveys. When merging, dedupe or clearly differentiate scope (e.g. keep
    1017 as the planets-focused overview, keep 1711 only if it adds
    dwarf-planet/celestial-body classification not already in 1019 "Dwarf
    Planets and the Outer Solar System").
  - `nsb-lesson-1712` ("Phases of the Moon") vs `nsb-lesson-1025`
    ("Solstices, Equinoxes, and Lunar Phases") — near-total topical overlap
    (both cover lunar phases and eclipses). Recommend treating 1712 as
    redundant/retireable content once merged rather than keeping both live
    in the same subtopic.

- **No NEEDS_HUMAN cases** — all 5 orphan/fragment topics had a clear
  canonical home once lesson titles and summaries were inspected.

- **No NEW_TOPIC needed** — although geologic time, fossils, and karst
  topography are three separate orphan slugs, none of them independently
  reach the ~4+ lesson threshold that would justify a standalone new
  canonical topic, and all three cluster naturally under the existing
  `earths-structure-rocks` topic (solid-Earth geology/history), which
  already has slots for exactly this kind of content (rock cycle, minerals,
  soil formation). Grouping them there also keeps `earths-structure-rocks`
  from being oddly split from its natural "Earth history" material.

- **Mis-organized canonical topics:** none observed beyond the above. All 7
  canonical topics have sensible subtopic groupings and reasonable lesson
  counts (11–19 lessons, 4–6 subtopics) even before the remap; the merge
  only strengthens `earths-structure-rocks` (19 → 27 lessons, 5 → 8
  subtopics) and `stars-universe` (11 → 13 lessons, 4 → 5 subtopics), both
  still within a healthy range for a topic of this breadth.

- **Post-remap subtopic count check:** `earths-structure-rocks` grows to 8
  subtopics, at the top edge of the stated 4–7 target range. This is
  acceptable given it absorbs three related orphan clusters, but if a
  future pass wants to keep topics tighter, consider splitting
  "Earth's History" (Geologic Time/Eras/Periods + Fossils/Fossil Fuels) out
  as its own topic once more Earth-history lessons are authored — currently
  6 lessons across 2 new subtopics, just under the ~4-lesson-per-subtopic
  norm for a standalone topic today.
