# Topic Audit — Physics, Middle School

**Summary:** 107 lessons · 5 canonical topics · 13 orphan topics (all 2–3 lessons each, 27 lessons total).

## Clean Topic List (canonical, pedagogical order)

| Topic (topicSlug) | Subtopics (after remap) | Lessons (after remap) |
|---|---|---|
| `measurement-and-scientific-method` *(NEW)* | 4 | 9 |
| `forces-motion` | 8 | 33 |
| `fluids-pressure` | 1 | 1 |
| `thermal-energy` | 3 | 4 |
| `electricity-magnetism` | 6 | 27 |
| `waves-sound-light` | 8 | 29 |
| — unresolved (see Concerns) | — | 4 |

Notes:
- `fluids-pressure` remains a 1-subtopic/1-lesson topic after remap — no orphan content fit it (phase-changes content leans thermal, not fluids). Flagged below as a mis-organized canonical topic.
- Row "unresolved" = `chemical-properties-and-reactions` (2) and `nuclear-decay-and-reactions` (2), both NEEDS_HUMAN — not placed in any topic above.

## Remap Table

| Orphan topicSlug | Disposition | Target topicSlug | Target subtopic | Lesson IDs | Rationale |
|---|---|---|---|---|---|
| `measurement-and-significant-figures` | NEW_TOPIC | `measurement-and-scientific-method` | Measurement and Significant Figures | 1676, 1677, 1678 | Foundational lab-skills content; no canonical Physics topic covers measurement/units/method. Clusters with 3 other orphans below. |
| `units-of-measurement` | NEW_TOPIC | `measurement-and-scientific-method` | Units of Measurement | 1679, 1680 | Same cluster as above — SI units/tools is a natural second subtopic alongside sig-figs. |
| `hypothesis-and-scientific-method` | NEW_TOPIC | `measurement-and-scientific-method` | Hypothesis and Scientific Method | 1693, 1694 | Same cluster — scientific method belongs with measurement as foundational skills content. |
| `experimental-design-and-variables` | NEW_TOPIC | `measurement-and-scientific-method` | Experimental Design and Variables | 1689, 1690 | Same cluster — completes a coherent 4-subtopic, 9-lesson "intro skills" topic. |
| `wave-interference-and-superposition` | ADD_AS_SUBTOPIC | `waves-sound-light` | Wave Interference and Superposition | 1681, 1682 | Core wave-physics content; canonical topic already covers wave properties, sound, light, EM spectrum — interference is the natural missing piece. No title collision. |
| `sound-intensity-and-decibels` | ADD_AS_SUBTOPIC | `waves-sound-light` | Sound Intensity and Decibels | 1691, 1692 | Direct extension of the existing "Sound Waves & the Doppler Effect" subtopic; distinct lesson titles, no collision. |
| `analog-vs-digital-signals` | ADD_AS_SUBTOPIC | `waves-sound-light` | Analog vs Digital Signals | 1685, 1686 | Signal content (analog waveforms vs. digital encoding) is a wave-properties application; best home is `waves-sound-light`. |
| `phase-changes-states-of-matter` | ADD_AS_SUBTOPIC | `thermal-energy` | Phase Changes and States of Matter | 1683, 1684 | Content is heat-driven phase transitions (melting, boiling); pairs naturally with existing "Heat and Temperature" / "Heat Transfer" subtopics. |
| `collision-types-and-dynamics` | ADD_AS_SUBTOPIC | `forces-motion` | Collision Types and Dynamics | 1695, 1696 | Distinct from the existing single-lesson "Momentum and Collisions" subtopic (different titles: "Types of Collisions Explained" / "Momentum Conservation in Collisions" vs. existing "Momentum and Collisions") — adds depth rather than duplicating. Checked for title collision: none. |
| `tangential-speed-and-circular-motion` | ADD_AS_SUBTOPIC | `forces-motion` | Tangential Speed and Circular Motion | 1697, 1698 | Circular-motion kinematics is a direct extension of "Speed, Velocity & Acceleration"; `forces-motion` is the only canonical topic covering motion/kinematics. |
| `spintronics-and-advanced-materials` | ADD_AS_SUBTOPIC | `electricity-magnetism` | Spintronics and Advanced Materials | 1701, 1702 | Content is electron spin + magnetic-material interaction — squarely a magnetism topic; fits alongside "Magnetism & Electromagnetism." Advanced/enrichment framing, but the physics content is E&M. |
| `chemical-properties-and-reactions` | NEEDS_HUMAN | — | — | 1687, 1688 | Content (reactants/products, conservation of mass, chemical bonds) is Chemistry subject matter, not Physics. No canonical Physics MS topic fits. Likely a subject-tagging error upstream; recommend either (a) re-tag `subject` to Chemistry and merge into that subject's audit, or (b) if Physics MS wants basic chem-physics overlap content, spin up a small "matter & materials" topic. Out of scope to decide here. |
| `nuclear-decay-and-reactions` | NEEDS_HUMAN | — | — | 1699, 1700 | Genuine atomic/nuclear physics (alpha/beta decay, half-life) with no canonical MS Physics home — doesn't fit forces-motion, E&M, waves, thermal, or fluids. Only 2 lessons, too small to justify its own NEW_TOPIC alone. Options: (a) leave as its own small canonical topic (`nuclear-decay-and-reactions`) since it's legitimate distinct physics content, accepting it stays thin until more lessons are authored; (b) fold into a broader future "matter & atomic structure" topic if one gets created (see chemical-properties note above) — would let nuclear decay and chemical properties share a home. Recommend human call on whether nuclear/atomic physics is in-scope for MS Physics at all. |

## Concerns

1. **Subject-tagging risk (`chemical-properties-and-reactions`):** lesson content is straightforward Chemistry curriculum (reactants/products, conservation of mass) but tagged `subject: physics`. This may indicate a batch-generation tagging bug worth checking against other subjects' orphan batches (ids 1676–1702 look like one contiguous auto-generated batch — worth spot-checking Chemistry/Earth-and-Space MS audits for the mirror-image problem, e.g. physics content mistagged as Chemistry).
2. **`nuclear-decay-and-reactions` and `chemical-properties-and-reactions` share the same orphan-batch ID range (1676–1702)** as the rest of this cluster — both NEEDS_HUMAN topics plus the NEW_TOPIC cluster all came from one generation pass. Suggests a coordinated fix (e.g., deciding on a subject-wide "Matter, Atoms & Chemistry Basics" topic) may be more efficient than resolving each in isolation.
3. **`fluids-pressure` is a thin canonical topic** (1 subtopic, 1 lesson: "Density, Pressure, and Buoyancy"). No orphan content fit it. Flagging for visibility — it wasn't in scope to fix (no orphan matched), but it's underdeveloped relative to other canonical topics (4-7 subtopics expected) and may need dedicated content authoring rather than a remap.
4. **No title collisions found** between orphan lesson titles and existing canonical-topic lesson titles in the target subtopics (`forces-motion`, `waves-sound-light`, `thermal-energy`, `electricity-magnetism`) — verified each ADD_AS_SUBTOPIC case individually (see rationale column).
5. **Proposed NEW_TOPIC `measurement-and-scientific-method`** (4 subtopics, 9 lessons) is intentionally placed first in the clean topic list as foundational/prerequisite content, consistent with typical intro-to-physics course sequencing.
