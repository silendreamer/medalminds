# Topic Audit — Energy / Middle School

**Summary:** 128 lessons, 6 canonical topics, 0 orphan topics.

The `dump-subject-topics.mjs` heuristic found no orphan topics for this
subject/level, and a manual check of lesson titles turned up no
near-duplicate/collision candidates and no clusters of foundational content
without a home. This subject is already clean. No MERGE/ADD/NEW_TOPIC actions
are proposed.

## Clean Topic List (already the current state — no changes proposed)

| Topic slug | Subtopics | Lessons |
|---|---|---|
| `principles-of-energy` | 4 | 21 |
| `fossil-fuels` | 4 | 19 |
| `nuclear-energy` | 5* | 26 |
| `renewable-energy-sources` | 4 | 26 |
| `electricity-grid` | 4 | 19 |
| `energy-policy-future` | 4 | 17 |

\* `nuclear-energy` has 5 subtopic labels but really 4 subtopic concepts — see Concerns.

Pedagogical order above: foundational principles → fuel sources (fossil,
nuclear, renewable) → grid/delivery → policy/future. This matches how the
topics are already sequenced in the data; no reordering needed.

## Remap Table

No orphans exist for Energy / Middle School, so there is nothing to remap.

| orphan topicSlug | disposition | target topicSlug | target subtopic | lesson IDs | rationale |
|---|---|---|---|---|---|
| — | — | — | — | — | No orphan topics found. |

## Concerns

- **`nuclear-energy` subtopic split ("continued" artifact, not an orphan-topic issue):**
  The topic has 5 subtopic labels, but "Nuclear Power Plants" (5 lessons) and
  "Nuclear Power Plants (continued)" (1 lesson, `nsb-lesson-1104` —
  "Decommissioning Nuclear Plants") are the same subtopic split by a batch
  naming artifact. This is below the audit's scope (it's a subtopic-naming
  issue inside an already-canonical topic, not an orphan topicSlug), but is
  worth a follow-up cleanup pass: rename/merge "Nuclear Power Plants
  (continued)" into "Nuclear Power Plants" so the sidebar shows one entry
  instead of two, one of which has just a single lesson.
- **No NEEDS_HUMAN items.** Nothing ambiguous to flag.
- **No title collisions** found across any topic/subtopic pair in this
  subject/level.
- **No foundational-content clusters** (e.g. lab-skills, general
  measurement) were found sitting outside the canonical topics, so no
  NEW_TOPIC proposal is warranted.
