# Duplicate-lesson worklist (deferred editorial dedup)

The HS reorg (see `REORG-SUMMARY.md`) moved every orphan lesson into a clean
canonical topic **without deleting anything**. Many of those moved lessons
overlap an existing canonical lesson — the audits flagged these as near/exact
duplicates. This file is the worklist for a follow-up editorial pass: for each
pair, an editor should compare the two lessons and either **cut** the weaker
one or **merge** their content, then remove the redundant record + markdown
file.

MS Biology was handled differently (13 verified duplicates already deleted in
`scripts/reorg-ms-biology.mjs`), so it is not listed here.

Per-subject collision details live in each report's **Concerns** section:
`docs/topic-audit/<subject>.md`. High-priority clusters:

## HS Biology (worst offender: protein/enzyme taught 4×)
- **Protein/Enzyme cluster** — `0013`, `1577`, `1814`–`1816`, `1820`–`1822` all
  cover overlapping protein/enzyme structure-function ground. Consolidate into
  two clean subtopics (Proteins; Enzymes). **This is the top priority.**
- `1804` vs `0081` — Blood Type Genetics (same ABO/Rh/codominance).
- `1798` vs `0163`–`0165` — Energy Flow in Ecosystems / trophic levels.
- `1799`/`1800`/`1801` vs `0016`–`0021`/`0040` — cell structure, organelles, cell cycle.
- `1811`–`1813` vs `0121`–`0122` — neuron structure, action potentials, neurotransmitters.
- `1817`/`1819` vs `0092`–`0099`; `1818` vs `0100`–`0103` — natural selection, speciation.
- `1823`/`1824` vs `0026`–`0029` — cell signaling / receptor types.
- `1829`/`1830` vs `0135` — antibody structure/function.
- `1831`/`1832` vs `0147`–`0151` — plant structure.
- `1833`/`1834` vs `0040` — cell cycle.
- `1835` vs `0116` — homeostasis.

## HS Chemistry
- `mass-spectrometry-basics`/`-applications` (`1767`/`1768`) — one 2-lesson subtopic split across two topicSlugs by a data bug; now merged into one "Mass Spectrometry" subtopic — verify no duplication.
- Verbatim title collisions routed to merge: "Rate Laws and Reaction Order" (`1730`), "Types of Intermolecular Forces" (`1761`), "Balancing Chemical Equations" (`1741`–`1743`), nuclear-chemistry (`1775`/`1776`) — dedupe against the canonical lessons of the same names.
- Pre-existing: `chemical-equilibrium` has an internal duplicate subtopic literally named "Chemical Equilibrium".

## HS Physics (triple-taught angular momentum)
- **"Conservation of Angular Momentum"** appears 3×: `0864`, `1846`, `1873` — all now under `rotational-gravitation`/Rotational Inertia & Angular Momentum. Cut to one.
- "Electromagnetic Induction" `1869` duplicates `0928`.
- Other merges with near-exact titles: relativity (`1886`–`1888` vs `0932`), tension (`1892`/`1893` vs `0830`).

## HS Earth and Space
- `1954`/`1955` vs `0462` (mineral ID); `1958` vs `0437` (spectral classification); `1967` vs `0394` (volcanic hazards); `1978` vs `0454` (CMB); `1975` vs `0425` (tidal forces); `1980`/`1981` vs `0424`/`0426` (waves/coastal); `1960` vs `0470` (water cycle).

## HS Math
- Prime/divisibility taught across `1900`–`1903`, `1931`/`1932` and `0741` — now all under Number Theory; dedupe.
- Sequences: `sequences-series` (`1927`/`1928`) + `arithmetic-sequences` (`1935`/`1936`) both vs `0692`.
- Expected value: `1898`/`1899` + `1939`/`1940` both landed in the same Probability subtopic.
- Others: `1907`–`1909` vs `0737`; `1913`–`1915` vs `0642`–`0649`; `1937`/`1938` vs `0593`/`0599`.

## MS (light — mostly already resolved)
- MS Chemistry: `1618`–`1620` electron-config may overlap "Chemical Bonding Basics" (octet); `mixtures` dups already dropped.
- MS Earth & Space: `astronomy-and-celestial-bodies` dups (`1711`/`1712`) already dropped.

---

**Also flagged (thin canonical topics needing content, not dedup):**
- HS Biology `biochemistry-cell-biology`: "Biological Macromolecules" and "Cellular Respiration" are 1-lesson subtopics.
- MS Math `measurement-units`: 3 subtopics × 1 lesson — consider folding into `number-sense-operations` or commissioning lessons.
- HS Chemistry `descriptive-chemistry`, `entropy-disorder` remain thin.
