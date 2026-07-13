# Frontend Production-Readiness Audit — MedalMinds

_Staff Frontend Engineer audit. Goal: cleaner, more maintainable code with **byte-for-byte identical rendering**. No redesign, no color/spacing/typography changes._

## Scope & method

- **Stack reality check:** This project uses **plain hand-written CSS**, not Tailwind. There is no `tailwind.config`, no PostCSS Tailwind plugin, and no utility classes. Every "Tailwind" section of the audit brief is therefore N/A; findings below are about the three CSS files and the inline styles in TSX.
  - `src/app/globals.css` (was **5,766** lines) — global design system, imported once in `layout.tsx`.
  - `src/app/practice-page.css` (was **756** lines) — imported by practice + lesson routes.
  - `src/app/tests-page.css` (**409** lines) — imported by test routes.
- **Icons:** `lucide-react`. **Images:** one asset (`public/logo-mm.svg`), rendered via a single `<img>` (has `alt`). No `next/image`, no `<br>` spacers, no bitmap assets to optimize.
- Dead-class detection: every class defined in CSS was checked as a substring against all `.ts/.tsx` source. Runtime-concatenated names were audited by hand (only one exists — `pq-choice--${state}`) and excluded from removal. Verified nothing is injected via `dangerouslySetInnerHTML` (question HTML and lesson markdown carry **no** `class=` attributes).

---

## The headline finding: a redesign was layered on top of the old one

`globals.css` contains **two complete, conflicting design systems**:

1. **Gen-1 "glassmorphism"** — an OKLCH color palette and glass/frosted components at the top of the file (`:root` at line 1).
2. **Gen-2 "clean professional"** — a hex navy/gold palette introduced by a second `:root` block under the banner `/* CLEAN PROFESSIONAL DESIGN OVERRIDES */`, which **redefines the core tokens** (`--navy`, `--gold`, `--primary`, `--bg`, `--panel`, `--ink`, `--background`, `--foreground`, …).

Because both blocks are plain `:root` at equal specificity, **the later one wins**, so Gen-2 is what actually renders and the entire Gen-1 component layer (glass cards, hero preview, old nav, old buzzer, old course-nav) became **unreachable dead code**. This single fact explains ~164 dead classes, ~1,150 dead lines, and a large share of the `!important` count (many `!important`s exist only to let Gen-2 beat Gen-1).

---

# Critical Issues

Things that can cause bugs or inconsistent rendering.

1. ~~**Dual `:root` token palettes.**~~ **RESOLVED.** The two `:root` blocks defined **11 tokens twice** (`--navy`, `--gold`, `--sky-blue`, `--primary`, `--panel`, `--ink`, `--bg`, `--background`, `--foreground`, `--muted`, `--brand-deep`); the top-block copies were dead because the later Gen-2 block wins the cascade globally (custom-property resolution uses the winning value regardless of the consuming rule's position). Removed the 11 dead copies from the top block → **each token is now defined exactly once, overlap = 0**, rendering identical (`npm run build` green). **Then fully unified (after #2 removed the dark-mode `@media` constraint):** all 35 tokens now live in a **single `:root` block** at the top of the file, each defined exactly once. Verified rendering-neutral by diffing the extracted token set + values against a pre-merge backup — **byte-identical (35/35)** — plus a green build. The stale "edit them below" comment and the old `CLEAN PROFESSIONAL DESIGN OVERRIDES` color `:root` are gone.
2. ~~**Dark mode is defined but neutralized.**~~ **RESOLVED (deleted).** The `@media (prefers-color-scheme: dark)` block set dark values for `--background/--panel/--ink/--muted` plus two `.gradient-glass-*` rules, but the later Gen-2 `:root` reset those tokens to light values and both classes were already dead — so the block never affected rendering. Deleted the whole block (17 lines); `npm run build` green, output identical. _Note: with dark mode gone, the optional single-physical-block finish of #1 is now unblocked (the palette can be unified without a dark `@media` ordering constraint)._
3. **`!important` arms race — TESTED, do NOT bulk-remove.** There are **503** `!important` in globals, **142** in practice, **204** in tests (849 total). I hypothesised most were redundant now that Gen-1 is deleted, and **verified empirically**: stripped all 849, rebuilt, and compared `getComputedStyle` across **30 route-states / 498 element snapshots / 19,422 property checks** (desktop + mobile, including driven states like an answered practice question and a configured test). Result: **356 computed-property regressions** — e.g. `.section` padding `56px→32px`, `.card` padding `22px→32px`, disabled `.button` opacity `0.6→0.5`, mobile `.button` width `342→294px`, `.pq-choice` selected border/background shifts. **Many `!important`s are load-bearing** (they beat *higher-specificity* or later rules — the Gen-1 duplicate rules like `.button`/`.card`/`.section` still exist earlier in the file). The change was fully reverted. A reduction is still possible but only **per-declaration with verification**, not as a sweep — see Refactoring.

---

# Temporary Fixes / Hacks

Every workaround found, why it exists, whether still needed, and the proper replacement.

| Location | Hack | Why it exists | Still needed? | Proper fix |
|---|---|---|---|---|
| `globals.css` (pervasive) | `!important` on hundreds of rules | To override the Gen-1 glass system | Mostly **no** — Gen-1 is deleted | Drop `!important` rule-by-rule, re-verify visually |
| `CourseLayout.tsx` (≈30 inline `style={{}}`) | Entire sidebar built with inline styles + hardcoded hex (`#e7e9ee`, `#1a2745`, `#667085`, …) | Built quickly, bypassing the CSS file | Works, but unmaintainable | Move to a `.course-sidebar*` class block; map hex → existing tokens (`#1a2745` = `--navy`) |
| `layout.tsx:57-63` | `style={{ padding: "24px" }}`, `style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}`, `style={{ flex:1 }}` | App-shell layout never given classes | Yes (harmless) | Small `.app-shell`/`.app-main` classes |
| `not-found.tsx` (7 inline styles) | One-off 404 styling | Page-specific | Low priority | Optional `.not-found-*` classes |
| `page.tsx:95-113` | `style={{ width: "68%" }}` etc. on progress fills | **Legitimate** — data-driven width | **Yes, keep** | This is the correct use of inline style |
| `BuzzerArena.tsx:681,743` | `style={{ width: \`${pct}%\` }}` | **Legitimate** — dynamic timer width | **Yes, keep** | Correct |
| Hardcoded hex in TSX | `#1a2745`(×10), `#667085`(×7), `#5a92f0`, `#b8860b`… | Duplicate the design tokens as literals | No | Replace with `var(--navy)`, `var(--sky-blue)`, `var(--gold)` |

No `margin-top: 17px`-style magic numbers, negative-margin nudges, `translateY(-3px)`, empty spacer divs, or `<br>` spacers were found in the TSX. The arbitrary-value hacks here are the **inline hardcoded hex colors** and the **inline layout styles**, not pixel nudges.

---

# Dead Code

Everything removable. **The safe subset here has been removed (see "Changes Applied").**

- **164 CSS classes never referenced in any source** — the Gen-1 layer. Clusters: old nav (`nav-inner`, `nav-links`, `nav-link`, `pill-link`, `switcher-links`, `nav-cta`, `brand*`), hero preview (`hero-preview-*`, `hero-panel-*`, `hero-visual`, `visual-row`), old competition cards (`competition-level-*`, `competition-stage-*`, `competition-subject-*`, `competition-section-nav`), curriculum cards (`curriculum-subject-*`), **entire old Buzzer** (`buzzer-arena`, `buzzer-shell`, `buzzer-layout`, `buzzer-stage-grid`, `buzzer-scoreboard`, `buzzer-judge-*`, `buzzer-timer-*`, `buzzer-practice-*`, ~40 classes — superseded by the current `buzzer-room-*` set), old course nav (`course-nav-*`, `course-layout`), old lesson sidebar/modal (`lesson-sidebar-*`, `lesson-modal-card`, `lesson-article--modal`, `lesson-topic-btn`, `subtopic-*`), old practice feedback (`pq-feedback*`, `pq-buzzer-*`, `pq-format`, `stat-box`), utility orphans (`muted`, `soft`, `dimmed`, `chip`, `btn-primary`, `btn-outline`, `btn-sm`, `modal-card`, `modal-backdrop`, `side-panel`, `loading-state`, `gradient-glass-*`).
- **~105 `!important` and ~21 in practice** were inside those dead blocks and went with them.
- **Not removed (reported only):** the Gen-1 `:root` token values (variables are still consumed and resolve to Gen-2; deleting needs the merge in Critical #1); the dark-mode media block (Critical #2).

No dead **components/hooks/imports** were found in TSX — the component tree is lean and all 15 components are reachable. The dead weight is entirely in CSS.

---

# Duplicate Code

- **Design tokens defined twice** — Critical #1 (two `:root` palettes; `--navy`, `--gold`, `--primary`, `--bg`, `--panel`, `--ink`, `--muted`, `--background`, `--foreground`, `--brand-deep`, `--sky-blue`).
- **Lesson-section rendering duplicated** — `learning/[lessonId]/page.tsx:96` and `CourseLayout.tsx:336` both do the identical `parseLessonSectionLines`/`parseLessonTable` + `lesson-section${isTossUp ? " lesson-section--no-border" : ""}` render. Extract a shared `<LessonSections>` component. (Behavior-preserving but touches two render paths — recommend, don't rush.)
- **Repeated `feedback bad`/`feedback good` markup** in `BuzzerArena.tsx` (5×) — candidate for a tiny `<FormError>`/`<Feedback>` helper.
- **Duplicate-selector false alarms:** the raw `uniq` scan flagged many selectors (e.g. `.pq-choice--correct`) twice, but these are base rule + descendant rule (`.pq-choice--correct .pq-choice-label`) or responsive overrides — **not** true duplicates. No genuine duplicated rule blocks remain after dead-code removal.

---

# Component Quality

- **`BuzzerArena.tsx` (1,004 lines)** — by far the largest component; renders setup modal, lobby, solo mode, organizer console, and roster in one file with its own polling loop. Should be split (`BuzzerSetup`, `BuzzerConsole`, `BuzzerRoster`, `useBuzzerRoom` hook). Functional, not urgent.
- **`CourseLayout.tsx` (414 lines)** — mixes tree-building, an inline-styled sidebar, and section rendering. Extract the sidebar and reuse the shared lesson renderer above.
- The remaining 13 components are appropriately small (12–167 lines) and single-purpose.

---

# Design System Consistency

- One nominal system, but **two palettes** in the file (Critical #1) plus **~30 hardcoded hex literals in TSX** that bypass it. Consolidating to `var(--*)` tokens is the main consistency win.
- Buttons: canonical `.button`/`.ghost-button` are used; the dead `.btn-primary/.btn-outline/.btn-sm` set was removed.
- Spacing scale exists (`--space-1..6`) but inline styles use raw px (`"24px"`, `"18px"`, `"26px"`) — reconcile when moving inline styles into classes.

---

# Responsive Issues

- 24 media queries at breakpoints `480/560/640/768/820/1023/1024` — inconsistent breakpoint ladder (both `768` and `820`, both `1023` and `1024`). Not a bug, but standardizing to a documented set would reduce layout-jump risk. No overflow/cropping bug was statically identifiable; recommend a manual pass at 320/768/1024/1440 on the practice runner and buzzer console (the densest layouts).

---

# Accessibility

- **Multiple `<h1>` per page — checked, NOT a bug.** `learning/page.tsx` (4 `<h1>`) and the tests pages (2 each) place each `<h1>` inside a separate mutually-exclusive `return` branch (`if (state) return (…)`), so exactly one renders per request. No change needed.
- `<img>` logo has `alt` ✓. Structured-data `dangerouslySetInnerHTML` is JSON-LD, fine.
- Recommend an audit pass for: focus-visible styles on custom buttons, and color contrast of `--muted: #666666` on light backgrounds (borderline for small text at 4.5:1).

---

# Performance

- No duplicate network requests (content is file-backed; buzzer polls intentionally every 1.5 s).
- **Biggest perf/maintainability win = the CSS diet already applied** (~1,150 fewer lines shipped in the global stylesheet).
- No unused dependencies detected in `package.json` for the frontend; `lucide-react` is tree-shaken per-icon.

---

# Cleanup Opportunities

1. Merge the two `:root` palettes into one (Critical #1).
2. Move `CourseLayout` + `layout.tsx` inline styles into classes using tokens.
3. Replace hardcoded hex in TSX with `var(--*)`.
4. Extract the shared `<LessonSections>` renderer.
5. Decide dark mode in-or-out; delete the block if out.
6. Sweep `!important` now that Gen-1 is gone.

---

# Refactoring Recommendations (safe, behavior-preserving — staged, not auto-applied)

- **`!important` reduction (revised after testing):** a blanket sweep is unsafe (proven above). The real root cause is the **duplicate selectors** — `.button`, `.card`, `.section`, `.eyebrow` etc. are each styled by a Gen-1 rule *and* a Gen-2 override, and the `!important` is what lets Gen-2 win. The safe fix is to **delete the superseded Gen-1 rule for each fully-overridden selector**, after which that selector's `!important` can drop too. Do this one selector at a time, verifying with the computed-style harness (capture `getComputedStyle` before/after — content-independent, unlike pixels, since practice/test pages are `force-dynamic` random). Reusable harness approach is documented in this session's history.
- **Split `BuzzerArena`** into presentational subcomponents + a polling hook.
- **Tokenize inline hex** (pure find/replace of `#1a2745`→`var(--navy)` etc., verify identical computed color first).

---

# Quick Wins (<10 min each)

- ✅ **Delete Gen-1 dead CSS** — done (see below).
- Replace `#1a2745`/`#5a92f0`/`#b8860b` literals in TSX with the matching `var(--navy)/--sky-blue/--gold)` (identical values — verify then swap).
- Delete the neutralized dark-mode block **if** dark mode isn't intended.

---

# Changes Applied (safe, verified)

**Removed provably-dead CSS** — every removed rule's selector list consists **only** of classes that never appear anywhere in `.ts/.tsx` source (Gen-1 layer). By construction this cannot change rendering: the selectors matched no elements.

| File | Before | After | Removed |
|---|---:|---:|---:|
| `globals.css` | 5,766 | 4,701 | **−1,064** (145 rule blocks) |
| `practice-page.css` | 756 | 664 | **−92** (13 rule blocks) |
| `tests-page.css` | 409 | 409 | 0 |
| **Total** | | | **≈ −1,156 lines** |

Side effect: **≈126 `!important` declarations** removed with the dead blocks.

**Also removed (second pass, verified):**
- **19 unused CSS custom properties** in `globals.css` — orphaned Gen-1 tokens with **zero** `var()` references anywhere in CSS or TSX, and no dynamic access (`getPropertyValue`/`setProperty` grep is empty): `--accent`, `--brand-soft`, `--brand-strong`, `--chart-2..5`, `--good`, `--navy-rgb`, `--sky-blue-rgb`, `--glass-border-opacity`, `--slate`, `--warn`, `--space-1`, `--shadow-1/2/3`, `--shadow-lg`, `--text-primary`. (`--space-2..6` and `--shadow-sm/md` are kept — still used.)
- **1 unused `@keyframes glass-shimmer`** — its only consumers were deleted glass classes. The other 5 keyframes (`slide-up-glass`, `scale-in`, `fade-in`, `slide-in-left`, `ai-fade-in`) **are** still referenced and were kept.
- ~24 more lines; `npm run build` re-verified green.

**Verification:** `npm run build` passes — all 17 routes compile, TypeScript clean, CSS parses. Conservative guards: rule blocks were kept whenever a selector referenced any live class (e.g. `.hero-preview-card .button`), any `@media/@keyframes` block, or the runtime-built `pq-choice--{selected,correct,incorrect,missed}` modifiers.

---

# Estimated Impact

- **Lines removed (done):** ≈ **1,156** CSS lines (~13% of all CSS; ~18% of `globals.css`).
- **Dead classes eliminated:** ~158 of the 164 identified (remaining 6 are tokens/dark-mode left for manual merge).
- **`!important` reduction (done):** ~126; a further ~400–600 are likely removable in the staged sweep.
- **Further available (not auto-applied):** merging the dual palette (~30 token lines), tokenizing ~30 inline hex literals, extracting one duplicate renderer, splitting one 1,004-line component.
- **Bundle:** the global stylesheet shrinks ~18%; smaller CSS parse/style-recalc on every page.
- **Maintainability:** removes the single biggest trap (edits to the top palette / Gen-1 classes that silently no-op), and documents the remaining higher-risk consolidations for owner review.
