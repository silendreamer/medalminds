# Learning-taxonomy reorg — full summary (all 12 subject×levels)

Branch: `reorg-ms-biology-topics`. All changes git-tracked and reversible.

## Result: 0 orphan topics remain across the entire catalog.

Before: the learning taxonomy mixed a clean canonical topic list with a large
later batch of "orphan" topics (single-subtopic fragments duplicating their own
name) plus a block of lessons mis-tagged into the wrong subject. After: every
subject presents a clean topic → subtopic → lesson tree.

| Subject | Level | Lessons | Topics | Orphans |
|---|---|---|---|---|
| Biology | MS | 170 | 6 | 0 |
| Chemistry | MS | 95 | 4 | 0 |
| Physics | MS | 105 | 7 | 0 |
| Earth and Space | MS | 104 | 6 | 0 |
| Energy | MS | 128 | 6 | 0 |
| Math | MS | 109 | 6 | 0 |
| Biology | HS | 235 | 10 | 0 |
| Chemistry | HS | 275 | 15 | 0 |
| Physics | HS | 261 | 12 | 0 |
| Earth and Space | HS | 189 | 9 | 0 |
| Energy | HS | 113 | 6 | 0 |
| Math | HS | 230 | 13 | 0 |

## What was done

1. **MS Biology** (done first, hand-verified): 19→6 topics, **13 verified
   duplicate lessons deleted**, new opening topic "Cells & the Study of Life".
   See `ms-biology-APPLIED.md`.
2. **Other 11 subjects**: audited by the `topic-audit` subagent (reports in this
   folder), then reorganized via a data-driven engine.
3. **Duplicates**: MS drops were hand-verified (4 more removed: 2 MS Chemistry
   mixtures, 2 MS Earth&Space astronomy). HS was reorganized **without deletion**
   — overlapping lessons were relocated into clean topics and logged in
   `DUPLICATE-WORKLIST.md` for a follow-up editorial dedup pass (the audits
   warned several "duplicates" are overlapping-not-identical).
4. **Mis-tagged subject** (~40 lessons): re-tagged to their true subject.
   - HS Energy held 38 lessons that were actually Bio/Chem/Physics/Earth&Space/CS
     content tagged `subject: "Energy"` at ingestion (IDs 1984–2031) → re-homed.
     HS Energy went 151→113 lessons; the destination subjects grew accordingly.
   - MS Math: 2 Chemistry lessons (atomic structure) → MS Chemistry.
   - MS Physics: 2 Chemistry lessons (chemical properties) → MS Chemistry.
5. **New topics created**: `foundations-of-life` (MS Bio),
   `measurement-and-scientific-method` + `atomic-nuclear-physics` (MS Physics),
   `planetary-science-astrobiology` (HS Earth & Space). Display names set via
   `TOPIC_NAME_OVERRIDES` in `src/lib/data.ts`.

## Tooling (all committed, re-runnable)

- `scripts/dump-subject-topics.mjs` — inspect any subject's tree / orphan flags.
- `.claude/agents/topic-audit.md` — the reusable audit agent.
- `scripts/reorg-topics.mjs` + `scripts/reorg-specs.mjs` — data-driven reorg
  engine; every reassignment/drop/re-tag is declared in the spec file.
- `scripts/reorg-ms-biology.mjs` — the original MS Biology transform.

## Verification

- `npm run build` — compiles clean.
- All 2014 lesson content files resolve; 0 duplicate IDs.
- 0 dangling `lessonIds` references from practice questions.
- 0 orphan topics across all 12 subject×levels.

## Deferred (not done here)

- Editorial lesson-level dedup — see `DUPLICATE-WORKLIST.md`.
- Thin canonical topics that need more content (listed in the worklist).
