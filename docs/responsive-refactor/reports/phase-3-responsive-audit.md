# Phase 3 Responsive Audit — 2026-07-12

**Browser verification DID run.** All findings below were observed live in Chromium
(Playwright 1.61.1) against the running dev server (`npm run dev`, served on
`http://localhost:3000`) at viewports **375**, **768**, **1280**, with spot probes at
320/1024 behavior implied by the same rules. Element geometry, computed styles,
touch-target sizes, scroll/sticky behavior, and console errors were measured
programmatically; full-page screenshots for every route × width are saved in the
session scratchpad (`shots/<name>_<width>.png`). No observation here is static-only.

Discovery notes:
- Valid subject slugs: `biology chemistry physics earth-and-space energy math`.
- Lesson body route keys on the lesson **slug**, not its id
  (`…/learning/scientific-method-observation-to-conclusion`, not `nsb-lesson-0001`).
- Per the Phase 1 note, `…/tests/[testId]` does not exist; the tests runner is
  `…/tests/subject/[subjectSlug]?size=N` (QuickTestRunner).

## Summary

**Issue counts by priority:** P0 = 3 · P1 = 4 · P2 = 5 · **Total = 12**

| ID | Priority | Page(s) | One-line |
|----|----------|---------|----------|
| R1 | P0 | hub, ms/hs, practice, learning | `.hub-header` grid `1fr auto` never collapses on mobile → header + level toggle overflow `.container` and are clipped by `.screen{overflow:hidden}` |
| R2 | P0 | learning/subject/[slug] | `.course-two-pane` fixed `300px 1fr` grid never stacks on mobile; empty content pane overflows to right≈506px and is clipped |
| R3 | P0 | every page (site-wide) | `position: sticky` header and course sidebar are **non-functional** — they scroll away at 768/1280 because `.screen{overflow:hidden}` is their scroll container (F25 verified) |
| R4 | P1 | /science-olympiad, /math-olympiad | `.competition-intro{display:none}` at ≤560px empties the entire coming-soon page (F20 verified) |
| R5 | P1 | hs/ms hub | `.buzzer-band` and `.subjects-grid` overflow `.container` at 375 (min-content wider than 327px track) |
| R6 | P1 | practice, learning | `.subjects-grid` `1fr`-track cards overflow at 375 (subject label + count row min-content > track) |
| R7 | P1 | all pages | breadcrumb links 23px tall — below 44px touch target |
| R8 | P2 | tests (TestBuilder) | `.subject-chip` 31px (375) / 40px (768) tall — below 44px |
| R9 | P2 | learning/subject (CTE) | `.course-topic-btn` 39px tall — below 44px |
| R10 | P2 | practice (PracticeSession) | "Reset" control 17px tall — below 44px |
| R11 | P2 | hub pages | `.hub-header` 640px override uses `flex-direction:column` on a `display:grid` element — a silent no-op (root cause of R1; recorded separately so Phase 4 removes the dead line) |
| R12 | P2 | 404 route | dev-only `pageerror` on `/nonexistent-xyz` (`Performance.measure … negative time stamp`) — Next dev artifact, verify absent in prod build |

**By page:** hub family (R1, R5, R11) and learning/subject (R2, R9) carry the load;
sticky (R3) is global; coming-soon (R4) is isolated but fully broken.

**Good news (no issues found):** `/`, `/science-bowl`, `/science-bowl/info-session`,
`/science-bowl/buzzer` (join screen), QuickTestRunner runner + answered state,
PracticeSession runner + answered state, TestBuilder layout, and the 404 body all
render cleanly at 375/768/1280 with **no horizontal scroll** and no console errors
(404's aside, R12). Answer choices in both runners are ≥44px tall and full-width.

---

## Issues (prioritized)

### R1: `.hub-header` grid never collapses on mobile → header + level toggle clipped
- **Page/route:** `/science-bowl/high-school`, `/science-bowl/middle-school`,
  `/science-bowl/high-school/practice`, `/science-bowl/high-school/learning`
- **Width(s):** 375 (and any width < ~640 where the two tracks no longer fit)
- **Component/selector:** `src/app/globals.css` `.hub-header` (base :4018, 640px
  override :4360, 480px override :4746); markup in
  `ScienceBowlHub`, `[level]/practice/page.tsx:71`, `[level]/learning/page.tsx:85`
- **Priority:** P0 (broken/unusable — primary page content is cut off)
- **Observed:** `.hub-header` is `display:grid; grid-template-columns:1fr auto`.
  `.container` (which is also `display:grid` via class `stack`) is correctly 327px
  wide at a 375 viewport, but `.hub-header` renders **422px wide** (measured
  `left=24 right=446`), overflowing its parent by 95px. Because the hub grid item
  has default `min-width:auto`, it refuses to shrink below its min-content: the
  `auto` track (the `.level-toggle`, 253px, Middle/High buttons) plus the `1fr`
  heading track sum past the container. `.container` doesn't clip, but the
  `.screen{overflow:hidden}` ancestor does — so on the hub pages the level toggle's
  "High School" button, and on practice/learning the H1 + `.subtitle`, are cut off
  the right edge (screenshots `hs-hub_375.png`, `practice_375.png`,
  `learning_375.png`). The 640px override `flex-direction:column` does nothing
  because the element is a grid, not a flexbox (see R11).
  Measured tracks: hub `156.6px 253.4px`; practice `410px 0px` (single child still
  forced to 410).
- **Proposed fix:** In `globals.css` `@media (max-width: 640px)` block (:4360),
  replace the no-op `.hub-header { flex-direction: column }` with
  `.hub-header { grid-template-columns: 1fr; }` (single column so the level toggle
  wraps beneath the heading). Additionally, on the base `.hub-header > div:first-child`
  rule (:4026) the `min-width:0` is already present; add `min-width: 0` to the
  `.level-toggle-wrapper` (:4039) so the toggle track can shrink at intermediate
  widths. Governing breakpoint: **640** (with the existing **480** block for the
  tighter gap already in place). No fixed widths, no new magic numbers.
- **Desktop impact:** none — the override is inside `max-width:640px`; ≥1024 keeps
  `1fr auto` exactly as today (verified identical at 1280).

### R2: `.course-two-pane` fixed two-column grid never stacks on mobile
- **Page/route:** `/science-bowl/high-school/learning/subject/[subjectSlug]`
  (CurriculumTopicExplorer / CourseLayout)
- **Width(s):** 375 (and all widths < ~700 where 300px + content can't coexist)
- **Component/selector:** `src/app/globals.css` `.course-two-pane` (:4817);
  `src/components/CurriculumTopicExplorer.tsx` / `CourseLayout.tsx`
- **Priority:** P0 (layout structurally broken; only survives because the second
  pane is empty on the subject index)
- **Observed:** `.course-two-pane` is `grid-template-columns: 300px 1fr` with **no
  media query anywhere** to collapse it. At 375 the measured grid is
  `300px 155.9px`, and the second pane (`.course-empty-state`, the desktop
  lesson-content column) renders at `left=350 right=506` — 131px off the right edge,
  clipped by `.screen{overflow:hidden}`. The visible sidebar list happens to look
  fine (screenshot `learning-subj_375.png`, `cte_expanded_375.png`), but the layout
  is a clipped two-column grid, not an intentional single-column mobile view; any
  subject that renders content in pane 2 would push it off-screen. Interaction test:
  expanding a topic at 375 still leaves 5 elements clipped past the viewport.
- **Proposed fix:** Add a mobile rule for the CourseLayout grid. There is no existing
  `.course-two-pane` media block, so add one keyed to the dominant **820** collapse
  breakpoint already used for the outer shell (`@media (max-width: 820px)` around
  :4731): `.course-two-pane { grid-template-columns: 1fr; }` and
  `.course-sidebar { position: static; }` (drop sticky on mobile — it can't work
  anyway, see R3). Prefer this over 300px/1fr because it uses a single flexible
  track. Governing breakpoint: **820** (matches where `.screen` already drops its
  desktop chrome).
- **Desktop impact:** none — desktop keeps `300px 1fr`; rule is inside `max-width`.

### R3: `position: sticky` header and sidebar are non-functional (VERIFY of F25)
- **Page/route:** site-wide (`.site-header` on every page; `.course-sidebar` on
  learning/subject; practice/tests right sidebars use the same pattern)
- **Width(s):** all — verified 375 / 768 / 1280
- **Component/selector:** `src/app/globals.css` `.screen{overflow:hidden}` (:141);
  `Header.tsx` `.site-header` (`position:sticky`); `.course-sidebar` (:4824,
  `position:sticky; top:16px`); `practice-page.css:451`, `tests-page.css:192`
- **Priority:** P0 (a declared, expected behavior is silently dead everywhere)
- **Observed:** Scroll test (scroll the page 500–600px and re-measure the sticky
  element's `top`):
  - **Header** — 768: top `1 → -2`; 1280: top `25 → -23` → **scrolls away**. At 375
    it read `1 → 1` only because that page is short (1037px tall, 800px viewport) so
    the header barely moved; on a taller mobile page it fails identically.
  - **Course sidebar** — 375: `165 → -72`; 768: `168 → -100`; 1280: `192 → -124` →
    **scrolls away at every width**.
  Root cause per F25 is confirmed: `.screen` sets `overflow: hidden`, which makes
  `.screen` (not the viewport) the containing scroll box for every sticky descendant,
  so nothing sticks while the body scrolls. Sticky is dead today — meaning **fixing
  it will introduce new behavior**, so Phase 4 must treat this as a behavioral
  change, not a pure bugfix.
- **Proposed fix:** In `globals.css` change `.screen { overflow: hidden }` (:141) to
  `overflow: clip` — `clip` still clips the rounded-corner content (preserving the
  visual shell) but, unlike `hidden`, does **not** establish a scroll container, so
  descendant `position: sticky` resolves against the viewport again. This is the
  single-line fix F25 anticipated. Because it activates real sticky behavior, Phase 4
  must screenshot-verify the header and all three sidebars scrolling before/after at
  375/768/1280. If activating sticky is judged out of scope, the alternative is to
  **remove** the now-dead `position:sticky`/`top` declarations so the code matches
  reality — decide deliberately. Governing rule: base `.screen` (:141), no
  breakpoint. No magic numbers.
- **Desktop impact:** **behavioral** — header/sidebars would begin sticking on
  desktop (they don't today). Visual box unchanged (`clip` keeps the corner
  clipping). Must be verified, not applied blind.

### R4: Coming-soon page is empty on mobile (VERIFY of F20)
- **Page/route:** `/science-olympiad`, `/math-olympiad`
- **Width(s):** ≤560 (verified at 375)
- **Component/selector:** `src/app/globals.css` `.competition-intro { display:none }`
  (:3403 per Phase 1); `[competitionSlug]/page.tsx:103`
- **Priority:** P1 (clearly wrong — the page body is blank)
- **Observed:** At 375 the Science Olympiad page shows only the header and a
  breadcrumb over an entirely empty white body — the `h1`, description paragraph, and
  the "Explore Science Bowl" CTA are all hidden by `.competition-intro{display:none}`
  at ≤560px (screenshot `sci-oly_375.png`). Nothing actionable remains on phones.
- **Proposed fix:** In `globals.css`, remove the `display:none` from
  `.competition-intro` and instead give it mobile-appropriate spacing/typography
  inside the existing **560** block (`@media (max-width:560px)`), e.g.
  `.competition-intro { display:flex; flex-direction:column; gap: var(--space-3); }`
  reusing existing space tokens — so the heading, copy, and CTA remain visible and
  stacked. Governing breakpoint: **560**.
- **Desktop impact:** none — desktop already shows the intro; change is scoped to the
  ≤560 rule.

### R5: `.buzzer-band` and `.subjects-grid` overflow the container at 375 (hub)
- **Page/route:** `/science-bowl/high-school`, `/science-bowl/middle-school`
- **Width(s):** 375
- **Component/selector:** `src/app/globals.css` `.buzzer-band` (:4153) /
  `.buzzer-band-content` (:4161) / `.buzzer-band-left` (:4169); `.subjects-grid`
  (:4249, 640 override :4699)
- **Priority:** P1 (clipped content on a primary page)
- **Observed:** On the hub the widest overflowing leaf is the `.buzzer-band`
  (measured `right=446`, 71px past the 375 viewport) — its `.buzzer-band-left`
  (icon + heading + copy) is a nowrap flex row with no `min-width:0`, so its
  min-content forces the band wider than the 327px container; `.buzzer-band-content`
  already has `flex-wrap:wrap` but the left cluster itself won't shrink. Separately
  `.subjects-grid` measures `196px 215px` (two unequal tracks summing to 422) because
  the `1fr` tracks inflate to the cards' min-content. Both are clipped by
  `.screen{overflow:hidden}` (screenshot `hs-hub_375.png`, right column
  "Chemistry / 1568 c…" cut off).
- **Proposed fix:** (a) In `globals.css` add `min-width: 0` to `.buzzer-band-left`
  (:4169) so it can shrink and the copy wraps; the wrap on `.buzzer-band-content`
  then works. Optionally, in the existing **480** buzzer block (:4755) let
  `.buzzer-band-left` stack (`flex-direction: column` — it's a real flex element
  here, unlike R11). (b) For `.subjects-grid`, change the tracks to
  `repeat(2, minmax(0, 1fr))` in the **640** override (:4699) so tracks can shrink
  below content width. Governing breakpoints: **480** (buzzer band) / **640**
  (subjects grid).
- **Desktop impact:** none — `min-width:0` doesn't change desktop rendering (tracks
  already have room); the `minmax(0,1fr)` change only affects narrow widths.

### R6: `.subjects-grid` cards overflow at 375 on practice/learning
- **Page/route:** `/science-bowl/high-school/practice`,
  `/science-bowl/high-school/learning`
- **Width(s):** 375
- **Component/selector:** `src/app/globals.css` `.subjects-grid` (:4249) + 640
  override (:4699); `.subject-card` (:4255) + 640 override (:4704)
- **Priority:** P1
- **Observed:** Same mechanism as R5's grid half but on the subject-picker pages:
  the 640 override sets `repeat(2, 1fr)`, but the two `1fr` tracks inflate to
  `196px + 215px = 411px` (measured) because a card's icon + label + "1,000+
  questions" count row (row layout on mobile per :4704) has a min-content wider than
  half of 327px. Right column ("Chemistry / Earth and Space / Math" with counts) is
  clipped past the edge (`practice_375.png`, `learning_375.png`).
- **Proposed fix:** In the **640** `.subjects-grid` override (:4699) use
  `grid-template-columns: repeat(2, minmax(0, 1fr))` so tracks shrink; and on the
  **640** `.subject-card` mobile rule (:4704) add `min-width: 0` to the card and let
  the count text wrap or truncate (the count `.subject-card-count` :4725 can take
  `min-width:0`). Consider dropping to single column below **480** if two cards still
  crowd (`@media (max-width:480px){ .subjects-grid{ grid-template-columns:1fr } }`)
  — reuses the existing 480 breakpoint. Governing breakpoints: **640** (primary),
  **480** (fallback to single column).
- **Desktop impact:** none — desktop uses `auto-fill minmax(180px,1fr)`, untouched.

### R7: Breadcrumb links below 44px touch target
- **Page/route:** all pages with `AutoBreadcrumbs` (hub, practice, learning, tests,
  lesson, buzzer, info, coming-soon)
- **Width(s):** all (measured 375 and 768)
- **Component/selector:** `AutoBreadcrumbs` breadcrumb `a` elements (selector
  `nav a` / breadcrumb links); CSS in `globals.css` breadcrumb block
- **Priority:** P1 (accessibility — primary nav affordance on mobile, since the
  header nav is `display:none` < 768)
- **Observed:** Breadcrumb links measure **23px tall** at every width ("Home" 50×23,
  "Science Bowl" 96×23, "High School" 88×23, "Tests" 45×23). Below the 44px
  guideline; on mobile the breadcrumb is the *only* back-navigation, so this matters.
- **Proposed fix:** In `globals.css` breadcrumb rule, give the breadcrumb links a
  larger tap area via padding + inline-flex + `min-height` expressed through
  line-height/padding (not a fixed height), e.g. `.breadcrumb a { display:inline-flex;
  align-items:center; padding-block: 6px; }` so the effective target reaches ~44px
  without changing visual text position materially. Add inside the existing mobile
  breakpoint governing the breadcrumb (confirm which of **560/640** the breadcrumb
  block uses at Phase 4 and amend that block). Governing breakpoint: **560** (mobile
  breadcrumb) — verify at implementation.
- **Desktop impact:** minimal — a few px of vertical padding on breadcrumb links;
  desktop breadcrumb row height grows slightly. If the desktop must stay pixel-exact,
  scope the padding to the mobile breakpoint only.

### R8: TestBuilder `.subject-chip` below 44px touch target
- **Page/route:** `/science-bowl/high-school/tests` (TestBuilder)
- **Width(s):** 375 (31px) and 768 (40px)
- **Component/selector:** `src/app/tests-page.css` `.subject-chip` (:78, per Phase 1
  F8) — note the conflicting practice-page.css copy is dead here
- **Priority:** P2 (polish; chips are tappable, just small)
- **Observed:** Subject chips measure **31px tall at 375** and **40px at 768** — both
  under 44px (`tests_375.png`, interaction test measured 6/6 chips under 44).
- **Proposed fix:** In `tests-page.css` `.subject-chip`, increase vertical padding
  (currently `10px 14px`) to reach ~44px effective height using padding, not a fixed
  height — e.g. `padding-block: 12px`. Keep the change value-driven off existing
  spacing. (Phase 6 is consolidating the duplicate `.subject-chip` per F8 — coordinate
  so the padding lands on the surviving definition.) Governing rule: base
  `.subject-chip` (applies all widths).
- **Desktop impact:** chips grow a few px taller on desktop too; acceptable polish,
  but if strict pixel-parity is required, apply only under the tests-page mobile
  breakpoint (**560/768**).

### R9: CurriculumTopicExplorer `.course-topic-btn` below 44px touch target
- **Page/route:** `/science-bowl/high-school/learning/subject/[subjectSlug]`
- **Width(s):** all (39px measured at 375 and 768)
- **Component/selector:** `src/app/globals.css` `.course-topic-btn` (extracted in
  Phase 2 / F10)
- **Priority:** P2
- **Observed:** Topic buttons measure **39px tall** — just under 44px (8/8 buttons).
  Tappable but tight for a dense list on mobile.
- **Proposed fix:** In `globals.css` `.course-topic-btn`, bump vertical padding to
  reach ~44px (padding-based, no fixed height). Governing rule: base
  `.course-topic-btn`. Consider only applying the extra padding at the mobile
  breakpoint (**820**, where the two-pane collapses per R2) to keep desktop density.
- **Desktop impact:** none if scoped to the ≤820 block; a few px taller if global.

### R10: PracticeSession "Reset" control below 44px
- **Page/route:** `/science-bowl/high-school/practice/[subjectSlug]`
- **Width(s):** all (17px measured)
- **Component/selector:** `PracticeSession.tsx` session-stats "Reset" button;
  `practice-page.css` session-stats block
- **Priority:** P2 (small secondary control)
- **Observed:** The "Reset" affordance in the "This session" card measures **17px
  tall** — well under 44px (`ps_answered_375.png` shows it top-right of the stats
  card). Low-frequency control, hence P2.
- **Proposed fix:** In `practice-page.css`, give the Reset control inline-flex +
  vertical padding to reach a comfortable tap area, or increase its hit area with
  padding without moving the visible label. Governing rule: the session-stats reset
  selector in `practice-page.css`.
- **Desktop impact:** minimal — slightly larger tap area on a small text button.

### R11: `.hub-header` 640 override applies `flex-direction` to a grid (dead line)
- **Page/route:** hub / practice / learning (root cause of R1)
- **Width(s):** ≤640
- **Component/selector:** `src/app/globals.css` `.hub-header` in
  `@media (max-width:640px)` (:4361) — `flex-direction: column`
- **Priority:** P2 (cleanup; the *behavioral* fix is R1)
- **Observed:** `.hub-header` is `display:grid` (base :4019, `!important`), so the
  640-block `flex-direction: column !important` has **no effect** — verified: at 375
  the element is still `display:grid` with two tracks. This dead declaration is why
  the header never collapses (R1).
- **Proposed fix:** Handled by R1 — replace the `flex-direction:column` line with
  `grid-template-columns: 1fr`. Recorded separately so Phase 4 deletes the no-op
  rather than leaving both. Governing breakpoint: **640**.
- **Desktop impact:** none.

### R12: Dev-only `pageerror` on the 404 route
- **Page/route:** `/nonexistent-xyz` (`not-found.tsx`)
- **Width(s):** all
- **Component/selector:** N/A (Next.js dev instrumentation)
- **Priority:** P2 (likely dev-only; confirm)
- **Observed:** The only console errors captured anywhere were on the 404 route: a
  `404 (Not Found)` resource load (expected for a not-found page) and a
  `PAGEERROR: Failed to execute 'measure' on 'Performance': 'CompetitionPage' cannot
  have a negative time stamp.` This is a Next.js dev-mode performance-mark artifact,
  not app code. The 404 body itself renders correctly and responsively
  (`notfound_375.png`).
- **Proposed fix:** No CSS change. Phase 4/7 should confirm the `pageerror` does not
  appear in a **production** build (`npm run build && npm run start`); if it persists
  in prod, investigate the `not-found` render path. No responsive action.
- **Desktop impact:** none.

---

## Cross-cutting note for Phase 4

The dominant failure mode on this site is **hidden overflow, not scroll**:
`.screen { overflow: hidden }` (globals :141) silently clips every element that
exceeds the viewport, so a naive "no horizontal scrollbar" check passes even when
content is cut off (R1, R2, R5, R6 all measured `document.scrollWidth == clientWidth`
while real content sat 70–130px off-screen). Phase 4 must audit for **clipped**
elements (`getBoundingClientRect().right > innerWidth`), not just scrollbars. The
same `overflow:hidden` is what kills sticky (R3). Changing it to `overflow: clip`
(R3) would preserve the rounded shell while (a) still clipping and (b) re-enabling
sticky — but it will surface previously-hidden overflow as real overflow, so R1/R2/
R5/R6 should be fixed in the **same** Phase 4 pass as R3, with a full
375/768/1280 screenshot matrix.

All proposed fixes reuse existing breakpoints (480 / 560 / 640 / 820) and prefer
`grid-template-columns: 1fr`, `minmax(0, 1fr)`, `flex-wrap`, `min-width: 0`, and
padding-based touch targets — no fixed widths/heights, absolute positioning, negative
margins, or new magic numbers were proposed.

---

## Phase 4 disposition

| ID | Status | Notes |
|----|--------|-------|
| R1 | fixed | `globals.css` `@media (max-width:640px)` — replaced dead `flex-direction:column` with `grid-template-columns:1fr`; added `min-width:0` to `.level-toggle-wrapper` base rule |
| R2 | fixed | `globals.css` `@media (max-width:820px)` — added `.course-two-pane { grid-template-columns:1fr }` and `.course-sidebar { position:static }` |
| R3 | skipped (desktop impact) | Desktop impact is **behavioral** (sticky header/sidebars become functional on desktop). `overflow:clip` change would activate sticky everywhere. Hard rule: desktop must be byte-for-byte unchanged. Skipped; recorded for Phase 6 deliberate decision. The dead `position:sticky` declarations remain. |
| R4 | fixed | `globals.css` `@media (max-width:560px)` — replaced `.competition-intro { display:none }` with `display:flex; flex-direction:column; gap:var(--space-3)` |
| R5 | fixed | `globals.css` — added `min-width:0` to `.buzzer-band-left` base rule; changed `.subjects-grid` at 640px to `repeat(2, minmax(0, 1fr))` |
| R6 | fixed | `globals.css` — same `minmax(0,1fr)` fix for `.subjects-grid` at 640px; added `min-width:0` to `.subject-card` and `.subject-card-count` at 640px; added single-column fallback `.subjects-grid { grid-template-columns:1fr }` at 480px |
| R7 | fixed | `globals.css` `@media (max-width:768px)` — added `.breadcrumbs a { display:inline-flex; align-items:center; padding-block:10px }` scoped to mobile only; desktop unchanged |
| R8 | fixed | `tests-page.css` `@media (max-width:768px)` — added `.subject-chip { padding-block:12px }`; updated 560px override to `padding:12px 10px` (was `6px 10px`) |
| R9 | fixed | `globals.css` `@media (max-width:820px)` — added `.course-topic-btn { padding-block:13px }` |
| R10 | fixed | `practice-page.css` `@media (max-width:560px)` — added `.pq-stats-reset { display:inline-flex; align-items:center; padding-block:14px }` |
| R11 | fixed | Handled as part of R1 — the dead `flex-direction:column !important` line replaced with `grid-template-columns:1fr !important` |
| R12 | skipped (no CSS change needed) | Dev-only Next.js performance-mark artifact. `npm run build` passed; prod build not started. Phase 7 should confirm absence in production. |

**New issues noticed (not touched — for future audit):**
- The `.buzzer-band-left` text (h3 + p) has no `min-width:0` or `overflow:hidden` — at very narrow widths the heading text could still refuse to wrap. Added `min-width:0` to the parent `.buzzer-band-left` (R5) which should suffice, but the text containers themselves may benefit from `overflow-wrap:break-word` if long subject names appear.
- `overflow:clip` for R3 remains deferred — Phase 5/6 should decide deliberately whether to activate sticky globally or remove the dead `position:sticky` declarations.
- Browser verification did **not** run in Phase 4 (Playwright/dev server unavailable in this agent session). Fixes were implemented from the precise report proposals. Phase 7 must perform live viewport verification.
