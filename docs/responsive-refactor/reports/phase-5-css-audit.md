# Phase 5 CSS Audit — 2026-07-12

Auditor notes:
- All three in-scope files were re-read in full at their **current** line numbers (globals.css was substantially edited in Phases 2 & 4 — Phase 1's line refs are stale and are NOT reused here).
- Every dead-CSS claim below was grep-verified against `src/**/*.tsx` at audit time; the exact grep evidence is quoted in each finding.
- The Phase 1 "glass base vs CLEAN override" split (F1) is **still present**: globals.css lines ~52–3618 are the glass base + the responsive blocks, and lines 3620–4015 are the `CLEAN PROFESSIONAL DESIGN OVERRIDES` layer that cancels it with `!important`. The design-token `:root` block (5–46) was consolidated in an earlier phase (single source of truth), so token *duplication* is largely gone; the *override-layer* duplication is not.
- Scope is exactly `globals.css`, `practice-page.css`, `tests-page.css`. No code was changed.

## Summary

| File | Lines | Bytes | `!important` |
|---|---|---|---|
| `src/app/globals.css` | 5,029 | 100,901 (~98.5 KB) | 510 |
| `src/app/practice-page.css` | 671 | 12,249 (~12 KB) | 145 |
| `src/app/tests-page.css` | 413 | 8,546 (~8.3 KB) | 205 |
| **Total** | **6,113** | **~121.7 KB** | **860** |

### Counts per category

| Category | Findings | Count |
|---|---|---|
| dead-css | C1, C2, C3, C4, C5, C6, C7, C8 | 8 |
| conflicting-selector | C9, C10, C11, C12, C13 | 5 |
| duplicate-variable / unused-variable | C14, C15 | 2 |
| unused-keyframes | C16 | 1 |
| duplicate-media-query | C17, C18 | 1–2 |
| important (saturation) | C19, C20 | 2 |
| breakpoint | C21 | 1 |
| overflow / R3 carry-over | C22 | 1 |

### Estimated removable KB

| Bucket | Est. removable |
|---|---|
| Dead glass base + hero-panel + buzzer-v1 + course-v1 + lesson-sidebar-v1 + orphan utils (C1–C6) | ~10–12 KB |
| Dead practice mobile-drawer + `.subtopic-panel` + keyframes (C7, C16) | ~1.2 KB |
| Dead `.footer`/`.disclaimer` blocks (C5) | ~0.6 KB |
| Collapsing the glass-base → override duplicate pairs to one rule each (C9–C13) | ~4–6 KB net |
| `!important` stripping (C19/C20) — byte reduction is small (~9 chars × ~700 resolvable), ~5–6 KB, but the real win is cascade sanity | ~5 KB |
| Unused/duplicate vars + no-op rules (C8, C14, C15) | ~0.2 KB |
| **Total realistic removable** | **~20–25 KB (~17–20 % of 121.7 KB)** |

Conservative "safe deletion only" figure (dead CSS + no-op rules, no cascade rewrite): **~12–14 KB**.

---

## Findings

### C1: Dead glass hero-panel family (base rules superseded by `hero-panel-wrapper`)
- **File/lines:** src/app/globals.css:346–377 (`.hero-panel`, `.hero-panel::after`, `.hero-panel-dots span`), 495–561 (`.hero-note` aside, `.hero-preview-header/*`, `.hero-preview-progress-*`, `.hero-panel-row*`, `.hero-panel-subject-dot*`, `.hero-preview-card*`), plus the `@media (max-width:820px)` `.hero-panel`/`.hero-visual` rules at 3328–3335 and the `@media (max-width:560px)` `.hero-panel-row`/`.hero-preview-*`/`.hero-panel-list`/`.hero-preview-stack` rules at 3506–3518
- **Category:** dead-css
- **Severity:** high
- **Detail:** The home hero right column renders `<div className="hero-panel-wrapper">` (page.tsx:82) which contains `.dashboard-mockup*` markup — NOT `.hero-panel`. Grep for the panel classes:
  ```
  rg 'className="[^"]*\b(hero-panel|hero-preview|hero-visual|hero-panel-dots|hero-panel-row|hero-panel-list|hero-preview-stack)\b' src/**/*.tsx  → (no matches)
  rg 'hero-panel-wrapper' → src/app/page.tsx:82   (the wrapper IS used; styled only by the CLEAN override at :3744-3754)
  ```
  `.hero-note` (495) and `.dashboard-mockup*` (380–493) ARE used — keep those. Everything keyed to `.hero-panel*` / `.hero-preview*` / `.hero-visual` is dead.
- **Recommendation:** Delete the listed `.hero-panel*` / `.hero-preview*` / `.hero-visual` rules (base + both media blocks). Keep `.hero-note`, `.dashboard-mockup*`, and the `.hero-panel-wrapper` show/hide rules at 3744–3754.
- **Visual risk:** none (grep-verified unused)

### C2: Dead `.hero` base, `.grid.four`, `.question-nav`, `.competition-section-nav`, `.competition-*-card h2`, `.side-panel`, `.content-section`, `.choice.correct/.incorrect`
- **File/lines:** src/app/globals.css:287–289 (`.hero`), 641–643 (`.grid.four`) + media at 3339 & 3933–3935 & 4398, 1196–1200 (`.side-panel.card`) + 3345–3348, 1227–1237 (`.choice.correct`, `.choice.incorrect`), 1456–1459 (`.content-section`), 1752–1765 (`.question-nav`), 1767–1783 (`.competition-section-nav`), 1794–1798 (`.competition-stage-card h2`, `.competition-level-card h2`, `.competition-subject-card h2`)
- **Category:** dead-css
- **Severity:** medium
- **Detail:** Grep evidence:
  ```
  rg 'className="[^"]*\bhero\b'      → only `home-hero`, `hero-grid`, `hero-copy`, `hero-actions`, `hero-note`, `hero-panel-wrapper`, `info-hero*` (no bare `.hero`)
  rg 'grid four' src/**/*.tsx        → (none;  only "grid two" and "grid three" are rendered)
  rg 'side-panel|content-section|question-nav|competition-section-nav|competition-stage-card|competition-level-card|competition-subject-card' src/**/*.tsx → (none)
  ```
  `.choice.correct`/`.choice.incorrect`: QuickTestRunner/SimplePracticeQuestion set only `.choice.selected` (and practice uses its own `.pq-choice--correct/--incorrect`), never `.choice.correct`. Grep `'choice correct'|'choice incorrect'` → (none).
- **Recommendation:** Delete all listed rules and their media-query entries (the three `.grid.four` media rules included).
- **Visual risk:** none

### C3: Dead Buzzer v1 selectors (pre-room-rewrite)
- **File/lines:** src/app/globals.css:1983–2018 (`.buzzer-banner*`, `.buzzer-mode-toggle*`), 2020–2041 (`.buzzer-scoreboard*`), 2057–2059 (`.buzzer-team-card.active`), 2115–2172 (`.buzzer-team-buttons*`, `.buzzer-judge-button*`), 2173–2178 (`.buzzer-progress span`), 2180–2182 (`.buzzer-status-card p`), 2184–2191 (`.buzzer-timer`), 2222–2240 (`.buzzer-timer-track*`), 2242–2245 (`.buzzer-hidden-prompt h2`), 2247–2272 (`.buzzer-choice-button*`), 2274–2286 (`.buzzer-organizer-sheet*`, `.buzzer-practice-footer*`), 2476–2483 (`.buzzer-start-card*`); plus the dead-selector entries inside the 820px block at 3350–3402 (`.buzzer-mode-panel`, `.buzzer-layout`, `.buzzer-stage-grid`, `.buzzer-foot-card`, `.buzzer-foot-row`, `.buzzer-countdown`, `.buzzer-controls`), and 560px `.buzzer-foot-row` at 3554–3559
- **Category:** dead-css
- **Severity:** high
- **Detail:** BuzzerArena.tsx was rewritten to the room-based UI. Grep:
  ```
  rg 'buzzer-banner|buzzer-mode-toggle|buzzer-scoreboard|buzzer-team-buttons|buzzer-judge-button|buzzer-progress|buzzer-timer-track|"buzzer-timer"|buzzer-hidden-prompt|buzzer-choice-button|buzzer-organizer-sheet|buzzer-practice-footer|buzzer-start-card|buzzer-controls|buzzer-layout|buzzer-stage-grid|buzzer-foot|buzzer-countdown|buzzer-mode-panel' src/**/*.tsx
    → (no matches)
  ```
  Still-USED buzzer classes (do NOT delete): `.buzzer-team-card` (+ `.team-b`), `.buzzer-roster*`, `.buzzer-big-button`, `.buzzer-log*`, `.buzzer-timer-panel`, `.buzzer-room-timer`, `.buzzer-buzzed-panel`, `.buzzer-answer-clock*`, `.buzzer-question-text`, `.buzzer-choice-grid/stack/label`, `.buzzer-participant*`, `.buzzer-console-*`, `.buzzer-buzz-card`, `.buzzer-hub-card`, `.buzzer-setup-*`, `.buzzer-level-*`, `.buzzer-step*`, `.buzzer-room-modal(-header)`, `.buzzer-band*`, `.buzzer-icon`, `.buzzer-btn`, `.buzzer-start-icon`/`.buzzer-team-letter` (grep confirms `buzzer-team-letter` at BuzzerArena.tsx:455,467). Note `.buzzer-team-card.active` is dead (only `.team-b` variant is emitted) even though `.buzzer-team-card` itself is live.
- **Recommendation:** Delete the listed v1 selectors and their media entries; re-grep each name at implementation time (buzzer names cluster, so a blind block-delete is unsafe).
- **Visual risk:** none (verified unused), provided the still-used list above is preserved.

### C4: Dead Course-layout v1 and Lesson-sidebar v1 (superseded by Phase-2 `.course-two-pane`/`.course-sidebar`)
- **File/lines:** src/app/globals.css:3223–3253 (`.course-layout`, `.course-nav-subject strong`, `.course-nav-chevron.open`, `.course-nav-lesson.active*`, `.course-content`), the 820px `.course-nav`/`.course-content` at 3287–3296, and the entire "LESSON DETAIL PAGE" block 4426–4517 (`.lesson-detail-layout`, `.lesson-sidebar-subject-icon`, `.lesson-sidebar-header*`, `.lesson-list`, `.lesson-item`, `.lesson-sidebar`, `.lesson-content`, plus their 1024px/820px media rules)
- **Category:** dead-css
- **Severity:** high
- **Detail:** Phase 2 (F10) extracted CourseLayout to `.course-two-pane`/`.course-sidebar*`/`.course-topic-btn`/`.course-lesson-*`/`.course-empty-state` (globals 4846–5028, all live). The v1 `.course-layout`/`.course-nav*`/`.lesson-detail-layout`/`.lesson-sidebar*` markup no longer exists. Grep:
  ```
  rg 'className="[^"]*\b(course-layout|course-nav|course-content|lesson-detail-layout|lesson-sidebar|lesson-list|lesson-item|lesson-content)\b' src/**/*.tsx
    → (no matches)
  rg 'course-lesson-list|course-content-empty|course-empty-state' → USED (CourseLayout.tsx:202,344; subject page:51)
  ```
  Keep `.course-content-empty` (4426? no — `.course-content-empty` is at 3255–3265, USED by subject page:51) and all `.course-two-pane`/`.course-*` Phase-2 classes. `.course-content` (3250, v1) is dead but `.course-content-empty` (3255) is live — delete carefully.
- **Recommendation:** Delete the v1 `.course-layout`/`.course-nav*`/`.course-content` (3223–3253, keeping `.course-content-empty` 3255–3265) and the whole 4426–4517 lesson-sidebar-v1 block + its media rules.
- **Visual risk:** none

### C5: Dead `.footer` / `.disclaimer` blocks (Footer.tsx uses `.site-footer*`)
- **File/lines:** src/app/globals.css:3164–3197 (`.footer`, `.footer p/a`, `.footer .brand-mark`, `.footer .brand-copy`, `.disclaimer`), the 820px `.footer*`/`.footer-inner`/`.footer-brand*` at 3404–3432, the 560px `.footer*` at 3597–3617, and the CLEAN-override `.footer` block at 3896–3910
- **Category:** dead-css
- **Severity:** medium
- **Detail:** Footer.tsx renders `.site-footer` / `.site-footer-inner` / `.site-footer-links` (Phase 2, F12), styled at globals 1058–1087. The old `.footer`/`.disclaimer`/`.footer-inner`/`.footer-brand*`/`.brand-copy`/`.brand-mark` markup is gone. Grep:
  ```
  rg 'className="[^"]*\b(footer|disclaimer|footer-inner|footer-brand|brand-copy|brand-mark|nav-inner)\b' src/**/*.tsx → (no matches; Footer uses site-footer*)
  ```
  Also dead by the same token: `.nav-inner`/`.brand-copy`/`.brand-mark`/`.nav-link`/`.pill-link` base rules (globals 155–193, 1713? — `.nav-link` also re-declared in CLEAN override 3713–3722) and the 560px `.nav-inner`/`.brand*`/`.nav-links`/`.nav-cta` rules (3473–3497). Header.tsx uses `.site-header*` and `.header-nav` only.
- **Recommendation:** Delete all `.footer*`/`.disclaimer`/`.nav-inner`/`.brand*`/`.nav-link`/`.pill-link`/`.nav-links`/`.nav-cta` rules (base + CLEAN override + media). Keep `.site-footer*`, `.site-header*`, `.header-nav`.
- **Visual risk:** none. (One nuance: `.nav-link,.pill-link,.button,.ghost-button` share a base rule at 180–193 — when removing the dead `.nav-link,.pill-link` selectors, leave `.button,.ghost-button`.)

### C6: Orphan utility classes `.chip` `.btn` `.small` and `.selected-context`
- **File/lines:** src/app/globals.css:4459–4496 (`.chip`, `.btn`, `.small`), 3534–3552 (`.selected-context*` inside 560px block)
- **Category:** dead-css
- **Severity:** low
- **Detail:**
  ```
  rg 'className="[^"]*\b(chip|btn|small|selected-context)\b' src/**/*.tsx → (no matches; the live analogues are hub-card-chip, buzzer-btn, course-*)
  ```
  `.chip`/`.btn`/`.small` are generic orphans (their live cousins are `.hub-card-chip`, `.buzzer-btn`, etc.). `.selected-context` matches no TSX.
- **Recommendation:** Delete.
- **Visual risk:** none

### C7: Dead practice mobile-drawer (never wired) + `.subtopic-panel`
- **File/lines:** src/app/globals.css:4525–4587 (the `@media (max-width:820px)` block: `.practice-sidebar.sidebar-open`, `.practice-sidebar-scrim`, `.practice-filters-toggle`) and the `@keyframes slide-in-left` at 4584–4587; `.subtopic-panel` at 3211–3219
- **Category:** dead-css
- **Severity:** medium
- **Detail:** No TSX toggles `sidebar-open` or renders the scrim/toggle. Grep:
  ```
  rg 'sidebar-open|practice-sidebar-scrim|practice-filters-toggle|subtopic-panel' src/**/*.tsx → (no matches)
  ```
  NOTE the same 820px block also contains LIVE rules: `.practice-layout { display:block }` and `.practice-sidebar { display:none }`. **Those are load-bearing** — only the `.sidebar-open` / `-scrim` / `-toggle` sub-rules are dead. `.subtopic-panel` is the sole consumer of `@keyframes scale-in` (see C16).
- **Recommendation:** Delete `.practice-sidebar.sidebar-open`, `.practice-sidebar-scrim`, `.practice-filters-toggle` (+ its `:hover`) and `@keyframes slide-in-left`; keep `.practice-layout`/`.practice-sidebar` display rules. Delete `.subtopic-panel`.
- **Visual risk:** none (verify practice page at 375/768 after removal — the surviving `.practice-sidebar{display:none}` must remain).

### C8: No-op rules (already overridden / target nonexistent element)
- **File/lines:** src/app/practice-page.css:3–5 (`.practice-page-section`), src/app/tests-page.css:3–5 (`.tests-page-section`), src/app/globals.css:747–749 (`.competition-card-content h2`), 969–970 & 3437–3438 (`.site-header{position:sticky}` declared twice)
- **Category:** dead-css / conflicting-selector
- **Severity:** low
- **Detail:**
  - `.practice-page-section` / `.tests-page-section` set `padding: var(--space-4) 0` but `.section { padding:56px 0 !important }` (globals :3845) wins on the same element → no effect. Grep confirms both classes co-occur with `section` on the page wrappers.
  - `.competition-card-content h2` — CompetitionCard renders `<h3>` (grep `competition-card-content` → CompetitionCard.tsx:27 wraps h3/spans, no h2). Rule matches nothing.
  - `.site-header` sets `position:sticky` at 969 (base) and again at 3437 inside `@media (max-width:560px)` — the mobile re-declaration is redundant (base already sticky at all widths).
- **Recommendation:** Delete the two `*-page-section` rules and `.competition-card-content h2`; drop the redundant `.site-header{position:sticky}` at 3437 (leave the base at 969).
- **Visual risk:** none (all already inert)

### C9: `.card` triple definition — `.card.spacious` padding is dead
- **File/lines:** src/app/globals.css:866–876 (base, `padding: var(--space-3)`), 888–890 (`.card.spacious { padding: var(--space-4) }`), 3913–3919 (CLEAN override, no padding but `!important` bg/border/radius/shadow), 4487–4492 (`.card { padding: 22px !important }`)
- **Category:** conflicting-selector
- **Severity:** high
- **Detail:** The last `.card` at 4487 sets `padding: 22px !important`, which defeats `.card.spacious { padding: var(--space-4) /* 32px */ }` (888, no `!important`). So `spacious` currently contributes **nothing to padding** — rendered padding on every card, spacious or not, is 22px. `card spacious` is used widely (info-session, learning, buzzer). The base `.card` (866) glass background/border/animation is fully overridden by 3913 + 4487.
- **Recommendation:** Collapse to a single `.card` rule with the **currently rendered** values (`padding:22px`, `background:#fff`, `border:1px solid #e7e9ee`, `border-radius:12px`, `box-shadow:var(--shadow-sm)`, keep `animation:slide-up-glass 300ms`) and drop `!important`. Decide deliberately what `.card.spacious` should do — today it does nothing for padding, so to stay pixel-identical either delete `.card.spacious` or give it a value that equals 22px. Do NOT "restore" 32px (that changes desktop).
- **Visual risk:** high (must diff computed padding on `.card` and `.card.spacious` before/after)

### C10: `.competition-card-icon` and `.feature-icon` — triple definition, last wins
- **File/lines:** `.competition-card-icon` at 715–726 (glass), 3791–3797 (CLEAN, sky-on-tint), 3986–3997 (mockup, navy-filled 48px); `.feature-icon` at 814–824 (glass), 3835–3842 (CLEAN, 44px sky-on-tint), 3999–4010 (mockup, navy-filled 48px)
- **Category:** conflicting-selector
- **Severity:** high
- **Detail:** Each icon is declared three times; the mockup rules (3986/3999) win — 48×48, `background:#1a2745`, white glyph. The two earlier declarations (glass + CLEAN sky-blue) are fully cancelled dead weight and the reason the whole family needs `!important`. The CompetitionCard `.competition-card-icon` and feature `.feature-icon` markup exists (used).
- **Recommendation:** Collapse each to the single last-winning (navy-filled 48px) rule and delete the two superseded copies; drop `!important` once the earlier copies are gone.
- **Visual risk:** high (verify the rendered navy icon is unchanged on home + hub)

### C11: Glass base → CLEAN override duplicate pairs (`.button`, `.eyebrow`, `h1/h2/h3`, `.cta-band`, `.competition-card`, `.feature-card`, `.trust-strip span`, `.mini-stat-list span`, `.home-hero`, `.section`, `p`)
- **File/lines (base vs override):** `.button` 195–201 vs 3626–3638; `.button-lg` 277–281 vs 3651–3655; `.ghost-button` 209–215 vs 3657–3667; `.eyebrow` 563–569 vs 3676–3682; `h1,h2,h3` 571–594 vs 3685–3687; `p` 596–600 vs 3690–3700; `.competition-card` 649–658 vs 3769–3775; `.feature-card` 791–802 vs 3817–3824; `.trust-strip span` 334–344 vs 3757–3766; `.mini-stat-list span` 756–770 vs 3800–3808; `.home-hero` 291–305 vs 3725–3732; `.cta-band` 826–835 vs 3850–3857; `.section` 608–610 vs 3845–3847
- **Category:** conflicting-selector
- **Severity:** high
- **Detail:** This is Phase 1's F1, still live. Each pair defines a glass look, then an `!important` override erases it to the flat "clean professional" look that actually ships. The base declarations are inert; they exist only to be cancelled, and they force `!important` on every override and on every downstream responsive rule.
- **Recommendation:** For each selector, collapse to a single rule carrying the **override's** (currently rendered) values and delete the glass base declaration; then drop `!important`. This must be one coordinated pass with a full 375/768/1280 screenshot diff (pairs with `::before` content:none — `.competition-card::before`, `.feature-card::before`, `.card::before` — should keep `content:none` as the single truth).
- **Visual risk:** high (cascade rewrite — screenshot matrix mandatory)

### C12: `.subject-chip` defined in two page stylesheets with conflicting `!important`
- **File/lines:** src/app/practice-page.css:406–432 vs src/app/tests-page.css:78–106
- **Category:** conflicting-selector
- **Severity:** high
- **Detail:** Both are page-level global imports, so both ship whenever a session touches either route. They differ: padding `8px 14px` vs `10px 14px`, border `1px` vs `1.5px`, `justify-content`/`width:100%`/`text-align:center` only in the tests copy; different mobile rules. Both fully `!important`, so the winner depends on emission order. Grep shows **only TestBuilder renders `.subject-chip`** (`subject-chip` appears in TestBuilder via TestBuilder's subject grid; practice pages use `.pq-choice`/`.subject-card`, not `.subject-chip`):
  ```
  rg 'subject-chip' src/**/*.tsx → TestBuilder.tsx (subject selection chips) only
  ```
  → the **practice-page.css copy is dead on its own routes**.
- **Recommendation:** Delete the practice-page.css `.subject-chip` block (406–432) and its mobile overrides (587–591, 640–644); keep the tests-page.css definition (which matches rendered TestBuilder). Coordinate with R8 (the 44px padding must land on the surviving tests-page copy).
- **Visual risk:** low (practice copy is unused; verify TestBuilder chips at 375/768/1280 after removal)

### C13: `.stat-row` triple definition across files (all consumers dead/limited)
- **File/lines:** src/app/globals.css:905–910 (+ 820px media at 3340), src/app/practice-page.css:471–480, 609–612, 656–659
- **Category:** conflicting-selector
- **Severity:** medium
- **Detail:** `.stat-row` is defined in globals (glass `.stat`/`.stat-row` family, 905–935) and three times in practice-page.css with `!important`. The globals `.stat`/`.stat-row`/`.stat strong`/`.stat span` family (905–935) served the deleted `StatsCard` (removed in Phase 2/F6) — grep:
  ```
  rg 'className="[^"]*\bstat-row\b|\bstat-box\b|"stat"' src/**/*.tsx → stat-box/stat-row appear only in PracticeSession session-stats markup (practice-page.css)
  ```
  So the **globals `.stat`/`.stat-row` family (905–935) is dead** (its StatsCard consumer is gone); the practice-page.css `.stat-row`/`.stat-box`/`.stat-label` rules are live (PracticeSession).
- **Recommendation:** Delete the globals `.stat`, `.stat:hover`, `.stat strong`, `.stat span`, `.stat-row` rules (905–935) and the `.stat-row` entry in the 820px media list (3340). Keep the practice-page.css `.stat-row`/`.stat-box`/`.stat-label` rules.
- **Visual risk:** none for the globals deletion (verify PracticeSession stats card unaffected).

### C14: Unused custom property `--background`; effectively-unused `--gold-soft`, `--bg`, `--gradient-glass-frosted`
- **File/lines:** src/app/globals.css:44 (`--background`), 11 (`--gold-soft`), 40 (`--bg`), 27 (`--gradient-glass-frosted`)
- **Category:** unused-variable
- **Severity:** low
- **Detail:** Grep of `var(--token)` across globals.css:
  - `--background` → **0** references (defined at :44, never used).
  - `--gold-soft` → 1 reference, at `.competition-section-nav a:hover` (:1781) — a **dead** selector (C2). Once C2 is removed, `--gold-soft` is unused.
  - `--bg` → 1 reference, at `.footer` (:3168) — a **dead** selector (C5). Once C5 is removed, `--bg` is unused.
  - `--gradient-glass-frosted` → 1 reference, at `.hero-panel` (:352) — **dead** (C1). Once C1 is removed, it is unused.
- **Recommendation:** Delete `--background` now. Delete `--gold-soft`, `--bg`, `--gradient-glass-frosted` after C1/C2/C5 removals (re-grep to confirm 0 references first).
- **Visual risk:** none (verify 0 references at implementation time)

### C15: Custom properties referenced but never defined
- **File/lines:** src/app/globals.css:497 (`--text-secondary`), 834 (`--space-xl`, `--space-lg`); font vars at 2037/2071/2186/2348/2864 (`--font-space-grotesk`) and 2122/2160/2795 (`--font-dm-sans`)
- **Category:** unused-variable (undefined reference)
- **Severity:** medium
- **Detail:** The `:root` block (5–46) defines `--space-2..6` but NOT `--space-xl/lg/md/sm/xs`, and does NOT define `--text-secondary`, `--font-space-grotesk`, or `--font-dm-sans`. Grep:
  ```
  rg -- '--text-secondary|--space-xl|--space-lg|--font-space-grotesk|--font-dm-sans' src/**/*.css
    → globals.css:497 color:var(--text-secondary)  [.hero-note — LIVE element, so color silently resolves to nothing]
    → globals.css:834 padding:var(--space-xl) var(--space-lg)  [.cta-band — masked by CLEAN override :3856 padding:64px 32px !important]
    → 8 font-family lines fall back to Arial (the intended display font never loads)
  ```
  `--font-poppins`/`--font-open-sans` ARE defined (via next/font in layout.tsx). `--space-md/sm/xs` do not appear in the CSS anymore (they were only in the not-found inline styles Phase 2 replaced).
- **Recommendation:**
  - `.hero-note` color (:497) → replace `var(--text-secondary)` with `var(--muted)` (matches the intended grey; `.hero-note` is visible on the home hero).
  - `.cta-band` padding (:834) → the reference is already masked by the override; when C11 collapses `.cta-band`, drop the undefined-var padding and keep `64px 32px`.
  - buzzer `--font-space-grotesk`/`--font-dm-sans` → keep as-is (Arial fallback is the current rendered state; "fixing" to a real typeface changes the look). Optionally alias them to `var(--font-poppins)` only if a deliberate font change is wanted (out of scope — flag).
- **Visual risk:** low for the `.hero-note` → `--muted` swap (verify it renders the same grey); high if the buzzer fonts are changed.

### C16: `@keyframes scale-in` becomes unused (and `slide-in-left`/`fade-in` are already dead-in-effect)
- **File/lines:** src/app/globals.css:63–72 (`@keyframes scale-in`), 74–81 (`@keyframes fade-in`), 4584–4587 (`@keyframes slide-in-left`)
- **Category:** unused-keyframes
- **Severity:** low
- **Detail:** `animation:` references in the three files:
  ```
  slide-up-glass → :360 (.hero-panel, dead C1) AND :875 (.card base — .card element is live, animation still applies) → KEEP
  scale-in       → :3218 (.subtopic-panel — dead, C7) → UNUSED once C7 removed
  slide-in-left  → :4545 (.practice-sidebar.sidebar-open — dead, C7) → UNUSED once C7 removed
  fade-in        → :4554 (.practice-sidebar-scrim.open — dead, C7) → UNUSED once C7 removed
  ai-fade-in     → practice-page.css:161 (.ai-explain-card — LIVE) → KEEP
  ```
- **Recommendation:** After C7 removal, delete `@keyframes scale-in`, `@keyframes fade-in`, `@keyframes slide-in-left`. Keep `slide-up-glass`, `ai-fade-in`, and the `prefers-reduced-motion` block.
- **Visual risk:** none (all three consumers are dead)

### C17: Fragmented `@media (max-width: 820px)` blocks — 5 separate blocks
- **File/lines:** src/app/globals.css:3267 (glass responsive), 3926 (CLEAN override mobile), 3947 (`.grid.three`), 4386 (hub grids), 4504 (lesson-sidebar-v1 — dead, C4), 4525 (mobile improvements — partly dead, C7), 4629 (mobile-hero-stats), 4747 (outer container unwrap)
- **Category:** duplicate-media-query
- **Severity:** low
- **Detail:** `@media (max-width:820px)` is opened **8 times** in globals.css; `@media (max-width:640px)` **4 times** (4370, 4396, 4693, 4712); `@media (max-width:560px)` **3 times** (3435, and via page files); `@media (max-width:480px)` **3 times** (4701, 4776). Not a bug (CSS merges them), but it fragments the mental model and each block re-lists selectors. Several bodies are dead (4504 lesson-sidebar, part of 4525 drawer).
- **Recommendation:** In Phase 6, after the dead-block deletions (C4, C7), consolidate the remaining same-breakpoint blocks into one block per breakpoint, preserving source order of surviving rules. Low priority — do it only if it does not reorder any live override.
- **Visual risk:** low (merging blocks can change cascade order — keep surviving rules in the same relative order; screenshot-verify)

### C18: Duplicate `.subjects-grid` / `.subject-card` overrides across breakpoints (640 twice)
- **File/lines:** src/app/globals.css:4391–4393 (`.subjects-grid` 820px → 3 cols), 4396–4401 (640px generic grids → 1fr), 4706–4708 (480px `.subjects-grid` → 1fr), 4712–4744 (640px `.subjects-grid` → 2col + `.subject-card` row layout)
- **Category:** duplicate-media-query
- **Severity:** low
- **Detail:** `.subjects-grid` gets a 640px rule at 4396 (as part of `.grid,.grid.four,.grid.three` → 1fr — note `.subjects-grid` is NOT in that selector, so no conflict) and again a dedicated 640px rule at 4713 (`repeat(2, minmax(0,1fr))`). The 480px rule (4707) then forces 1fr. This is the Phase-4 R5/R6 fix and is correct, but the two 640px `@media` blocks (4396, 4712) are adjacent-duplicated and could merge.
- **Recommendation:** Merge the two `@media (max-width:640px)` blocks (4396 and 4712) into one. No value changes.
- **Visual risk:** none (identical values, just block consolidation)

### C19: `!important` saturation in page CSS (practice-page.css 145×, tests-page.css 205×)
- **File/lines:** src/app/practice-page.css:376–671 (every declaration from `.practice-page-hero` onward), src/app/tests-page.css:8–413 (every declaration)
- **Category:** important
- **Severity:** high
- **Detail:** These selectors are **component-unique** (`.tests-layout`, `.your-test-card`, `.size-chip`, `.practice-layout`, `.session-stats-card`, etc.) and have nothing in globals.css to override — the `!important` is pure noise inherited from the original authoring style. The pattern in the `.pq-*` block (practice-page.css 1–374) is the counter-example: it carries **zero** `!important` and renders fine, proving the rest do not need it. The only genuine conflicts these files paper over are `.subject-chip` (C12, cross-file) and `.stat-row` (C13). Resolution: none of the specificity conflicts are real except C12/C13 — every other `!important` here is resolvable by simple removal.
- **Recommendation:** In Phase 6, strip `!important` file-wide from both page files in one pass, then fix only the two real conflicts (C12 by deletion, C13 by deletion of the globals copy). Run the full screenshot matrix.
- **Visual risk:** high (cascade order changes — needs 375/768/1280 before/after diff)

### C20: `!important` saturation + universal-selector abuse in globals CLEAN/hub/lesson sections
- **File/lines:** src/app/globals.css:3626–4517 (CLEAN overrides, hub, lesson-v1 — nearly every declaration `!important`), and specifically the universal rule at 3441–3443
- **Category:** important
- **Severity:** high
- **Detail:** `@media (max-width:560px){ * { backdrop-filter: var(--glass-backdrop-mobile) !important } }` (3441–3443) applies a compositing blur to **every element** at ≤560px. Because the CLEAN overrides already set `backdrop-filter:none` on the glass surfaces, this universal rule is visually inert on opaque backgrounds but forces GPU layers on hundreds of nodes — a scroll-perf hazard on low-end phones. The follow-up explicit list (3445–3464) re-applies the same value redundantly. The hub section (4022–4364) and CLEAN section (3626–4015) carry ~470 `!important`s; most only exist because the glass base (C11) still contends — once C9–C13 collapse the base/override pairs, the vast majority of these `!important`s become removable.
- **Recommendation:** (a) Delete the universal `*{backdrop-filter…!important}` rule (3441–3443) and the redundant explicit list (3445–3464); confirm no visible change at 375px (the only truly translucent element, `.buzzer-overlay-backdrop` :2514, has its own `blur(4px)` and is unaffected). (b) After C9–C13 collapse the base layer, strip the now-orphaned `!important`s in the CLEAN/hub sections as a coordinated pass.
- **Visual risk:** high overall (do (a) first — low risk, immediate win; then (b) with screenshots).

### C21: Breakpoint fragmentation — 7 max-width breakpoints + 1 min-width
- **File/lines:** globals.css (480, 560, 640, 768, 820, 1023, 1024 / min-1024), practice-page.css (560, 768, 1024), tests-page.css (560, 768, 1024)
- **Category:** breakpoint
- **Severity:** medium
- **Detail:** globals.css uses seven distinct max-width values plus `min-width:1024`. The site's tier model (mobile ≤767, tablet 768–1023, desktop ≥1024) matches none of the dominant `820` collapse used across globals. Canonical target recommended: **560 / 768 / 1024** (page files already use exactly these). The migration table below states, per existing block, whether it can move to a canonical value without a visual change. **Any block whose current breakpoint sits between the old and new value changes which widths get which rule — those are marked Safe? = no.**
- **Recommendation:** Adopt 560 / 768 / 1024 as canonical. Migrate only the `Safe? = yes` blocks in Phase 6; leave `820` and `640` blocks that would shift rendering. Do NOT globally rename 820→768 (it moves the container-unwrap and course/practice collapse points by 52px — visible).
- **Visual risk:** high for any non-safe move (needs a screenshot matrix at 480/560/640/768/820/1024).

### C22: R3 carry-over — `.screen { overflow: hidden }` still defeats sticky (candidate for Phase 6)
- **File/lines:** src/app/globals.css:145 (`.screen { overflow: hidden }`); dependent sticky decls at 969 (`.site-header`), 4858 (`.course-sidebar`), practice-page.css:451 (`.practice-sidebar`), tests-page.css:192 (`.tests-sidebar`)
- **Category:** overflow (behavioral)
- **Severity:** medium
- **Detail:** Confirmed unchanged since Phase 3/4: `.screen` sets `overflow: hidden`, making it the scroll container for every `position: sticky` descendant, so the header and all three sidebars scroll away instead of sticking (Phase 3 R3 measured this live). Phase 4 SKIPPED the fix as a desktop-behavioral change; the dead `position:sticky`/`top` declarations remain. Two mutually exclusive dispositions:
  1. **Activate sticky:** change `.screen { overflow: hidden }` → `overflow: clip`. `clip` preserves the rounded-corner clipping (visual box unchanged) but does NOT establish a scroll container, so `position:sticky` resolves against the viewport again. This makes the header + sidebars begin sticking on desktop and tablet — a **behavioral** change, not visual. Must screenshot-scroll-verify at 375/768/1280.
  2. **Match code to reality:** keep `overflow:hidden` and DELETE the now-inert `position:sticky`/`top` declarations (globals 969, 4858–4859; practice-page.css 451–452; tests-page.css 192–193) so the CSS no longer lies.
- **Recommendation:** My recommendation is **option 1 (`overflow:hidden` → `overflow:clip`)** — it delivers the intended sticky UX the code already asks for, keeps the visual box identical, and is a single-line change. Gate it behind a scroll-screenshot check at all three widths in Phase 6; if the sticky header/sidebar behavior is judged undesirable or risky, fall back to option 2 (delete the dead sticky decls). Do not ship both. Note the `.course-sidebar` and `.practice/.tests-sidebar` already drop to `position:static` under 820/768px (Phase 4), so sticky only newly activates ≥ those widths.
- **Visual risk:** **high** (behavioral: sticky activates on desktop/tablet with option 1). The visual *box* is unchanged under `clip`; the *scroll behavior* changes. Must be verified live, never applied blind.

---

## Breakpoint migration table

Canonical target set: **560 / 768 / 1024**. `Safe? = yes` means the block can move to the nearest canonical breakpoint with no rendering change at any width; `no` means moving it shifts which widths receive the rule (visible) and it must stay.

| Current block | File:lines | Proposed | Safe? | Notes |
|---|---|---|---|---|
| `@media (min-width:1024)` hero-grid 2col | globals.css:3735–3741 | 1024 (keep) | yes | Already canonical. |
| `@media (max-width:1023)` hero-panel hide | globals.css:3744–3748 | 1024 → keep as `max-width:1023` | yes | 1023/1024 pair is the canonical desktop boundary; keep as-is. |
| `@media (min-width:1024)` hero-panel show | globals.css:3750–3754 | 1024 (keep) | yes | Pairs with the 1023 hide. |
| `@media (max-width:1024)` lesson-detail-v1 280px | globals.css:4498–4502 | delete | n/a | Dead (C4) — remove entirely, don't migrate. |
| `@media (max-width:820)` glass responsive | globals.css:3267–3433 | **stay 820** | no | Governs container-unwrap-adjacent layout (hero/info/curriculum/practice/course collapse). Moving to 768 shifts collapse 52px — visible. |
| `@media (max-width:820)` CLEAN card/grid | globals.css:3926–3940 | stay 820 | no | `.grid.four`→2col, `.cta-band` pad — tied to 820 layout. |
| `@media (max-width:820)` `.grid.three`→2col | globals.css:3947–3951 | stay 820 | no | Same rationale. |
| `@media (max-width:820)` hub/subjects grids | globals.css:4386–4394 | stay 820 | no | Hub 2-col + subjects 3-col at 820 — moving changes card counts per row at 768–820. |
| `@media (max-width:820)` lesson-sidebar-v1 | globals.css:4504–4517 | delete | n/a | Dead (C4). |
| `@media (max-width:820)` practice drawer | globals.css:4525–4582 | partial delete | no | Delete dead drawer sub-rules (C7); keep `.practice-layout`/`.practice-sidebar` at 820 (stay). |
| `@media (max-width:820)` mobile-hero-stats | globals.css:4629–4655 | stay 820 | no | Shows the mobile stat strip below 820; tied to hero collapse. |
| `@media (max-width:820)` container unwrap | globals.css:4747–4773 | stay 820 | no | The rounded `.screen` shell is removed at ≤820; this is the site's primary "mobile chrome" line. Anchor breakpoint — must not move. |
| `@media (max-width:768)` header-nav hide | globals.css:1052–1056 | 768 (keep) | yes | Already canonical. |
| `@media (max-width:768)` breadcrumb truncate + R7 tap | globals.css:1100–1118 | 768 (keep) | yes | Canonical; Phase-4 R7 lives here. |
| `@media (max-width:768)` home-hero tighten | globals.css:4590–4622 | 768 (keep) | yes | Canonical. |
| `@media (max-width:640)` hub/subjects single-col | globals.css:4370–4384 | **stay 640** | no | Intermediate 2→1 col step; moving to 560 or 768 changes card layout at 561–640. |
| `@media (max-width:640)` generic grids→1fr | globals.css:4396–4413 | stay 640 | no | Same. |
| `@media (max-width:640)` section pad | globals.css:4693–4698 | stay 640 | no | Tied to the 640 grid step for consistent rhythm. |
| `@media (max-width:640)` subject-card row layout | globals.css:4712–4744 | stay 640 | no | Phase-4 R6 fix; card becomes horizontal at ≤640. |
| `@media (max-width:560)` glass/blur + hub/buzzer | globals.css:3435–3618 | 560 (keep) | yes | Already canonical. (Delete the universal `*{}` rule per C20 regardless.) |
| `@media (max-width:480)` hub/subjects single-col | globals.css:4701–4709 | **stay 480** | no | Final single-col step; 480≠canonical but moving to 560 changes 481–560 rendering. |
| `@media (max-width:480)` hub-header gap + buzzer | globals.css:4776–4799 | stay 480 | no | Same. |
| practice `@media (max-width:1024)` | practice-page.css:556–570 | 1024 (keep) | yes | Canonical. |
| practice `@media (max-width:768)` | practice-page.css:572–613 | 768 (keep) | yes | Canonical. |
| practice `@media (max-width:560)` | practice-page.css:615–671 | 560 (keep) | yes | Canonical; R10 lives here. |
| tests `@media (max-width:1024)` | tests-page.css:287–301 | 1024 (keep) | yes | Canonical. |
| tests `@media (max-width:768)` | tests-page.css:303–340 | 768 (keep) | yes | Canonical; R8 lives here. |
| tests `@media (max-width:560)` | tests-page.css:342–413 | 560 (keep) | yes | Canonical. |

**Net:** the two page files are already on the canonical 560/768/1024 set (all `Safe? = yes`). globals.css's `768`/`560`/`1023`/`1024` blocks are canonical; its `820`, `640`, and `480` blocks are load-bearing intermediate steps and must **stay** (moving them is visible). So "consolidate to 560/768/1024" is achievable only for the page files and the already-canonical globals blocks — globals will retain 480/640/820 as legitimate extra steps. Recommend documenting 480/640/820 as intentional sub-steps rather than trying to eliminate them.

---

## Phase 6 disposition

Implemented 2026-07-12. Scope: `src/app/globals.css`, `src/app/practice-page.css`, `src/app/tests-page.css` only.

### Before/After byte sizes

| File | Before | After | Delta |
|---|---|---|---|
| `globals.css` | 100,901 B | 83,171 B | −17,730 B |
| `practice-page.css` | 12,249 B | 12,192 B | −57 B |
| `tests-page.css` | 8,546 B | 8,492 B | −54 B |
| **Total** | **121,696 B** | **103,855 B** | **−17,841 B** |

### Finding disposition

| ID | Status | Notes |
|---|---|---|
| C1 | done | Deleted `.hero-panel`, `.hero-panel::after`, `.hero-panel-dots span` base rules; deleted `.hero-preview-header`, `.hero-preview-progress-*`, `.hero-panel-row*`, `.hero-panel-subject-dot*`, `.hero-preview-card*` rules; removed dead entries from 820px and 560px media blocks. `hero-panel-wrapper` show/hide rules (CLEAN overrides) preserved. Also fixed C15 sub-item: `.hero-note` color changed from undefined `var(--text-secondary)` to `var(--muted)`. |
| C2 | done | Deleted `.hero`, `.grid.four` (base + all media entries), `.side-panel.card`, `.choice.correct`, `.choice.incorrect`, `.content-section`, `.question-nav*`, `.competition-section-nav*`, `.competition-stage-card h2 / -level-card h2 / -subject-card h2`. Removed `.nav-link`/`.pill-link` from combined selectors (base rule, focus rule, transition list). Also removed the dead CLEAN-override `.nav-link` / `.nav-link.active` block (C5 overlap). |
| C3 | done | Deleted `.buzzer-banner*`, `.buzzer-mode-toggle*`, `.buzzer-scoreboard*`, `.buzzer-team-card.active`, `.buzzer-team-buttons*`, `.buzzer-judge-button*`, `.buzzer-progress span`, `.buzzer-status-card p`, `.buzzer-timer`, `.buzzer-timer-track*`, `.buzzer-hidden-prompt h2`, `.buzzer-choice-button*`, `.buzzer-organizer-sheet*`, `.buzzer-practice-footer*`, `.buzzer-start-card*`. Combined selector `.buzzer-big-button, .buzzer-team-buttons button` split to `.buzzer-big-button` only (live). Removed `buzzer-mode-panel`, `buzzer-layout`, `buzzer-stage-grid`, `buzzer-foot-card`, `buzzer-countdown`, `buzzer-controls` dead entries from 820px and 560px blocks. |
| C4 | done | Deleted `.course-layout`, `.course-nav*`, `.course-content` (v1), keeping `.course-content-empty`. Deleted entire "LESSON DETAIL PAGE (Screen 04)" block including `.lesson-detail-layout`, `.lesson-sidebar*`, `.lesson-list`, `.lesson-item`, `.lesson-content` + their 1024px/820px media rules. Phase-2 `.course-two-pane`/`.course-sidebar*` classes preserved. |
| C5 | done | Deleted `.footer*`/`.disclaimer` base rules, 820px media entries, 560px media entries, and CLEAN-override `.footer*` block. Removed `.nav-inner` (kept `.container` which shared the selector), `.brand-copy*`, `.brand-mark*`, `.nav-links`, `.nav-cta` from base + media blocks. |
| C6 | done | Deleted `.chip`, `.btn`, `.small` (from lesson-sidebar-v1 block, co-deleted with C4). Deleted `.selected-context*` from 560px block. |
| C7 | done | Deleted `.practice-sidebar.sidebar-open`, `.practice-sidebar-scrim*`, `.practice-filters-toggle*` from 820px block. Kept `.practice-layout{display:block}` and `.practice-sidebar{display:none}` in that block (load-bearing). Deleted `.subtopic-panel`. Also deleted `@keyframes slide-in-left` (C16 overlap). |
| C8 | done | Deleted `.practice-page-section` (practice-page.css:3-4), `.tests-page-section` (tests-page.css:3-4), `.competition-card-content h2` (globals ~747). Deleted redundant `.site-header{position:sticky}` from 560px block (kept base declaration at ~969). |
| C9 | skipped (Visual risk: high) | `.card` triple / `.card.spacious` padding analysis requires screenshot diff. Left for Phase 7 or user decision. |
| C10 | skipped (Visual risk: high) | `.competition-card-icon` / `.feature-icon` triple collapse requires screenshot diff. |
| C11 | skipped (Visual risk: high) | Glass-base → CLEAN override duplicate pairs: coordinated cascade rewrite with full screenshot matrix required. |
| C12 | skipped (Visual risk: high per audit) | `.subject-chip` cross-file conflict. Audit marked low but noted a verified-unused deletion in practice-page.css. Deferred to Phase 7 for user decision. |
| C13 | done | Deleted globals `.stat`, `.stat:hover`, `.stat strong`, `.stat span`, `.stat-row` family (was at ~905–935). The `.stat-row` 820px media entry was also removed as part of the 820px block cleanup (C3/C5 work). Practice-page.css `.stat-row`/`.stat-box`/`.stat-label` preserved (live in PracticeSession). |
| C14 | done | Deleted `--background` from `:root`. After C1/C2/C5 removals, confirmed 0 references to `--gold-soft`, `--bg`, `--gradient-glass-frosted`; deleted all three from `:root`. |
| C15 | partial | `.hero-note` color fixed: `var(--text-secondary)` → `var(--muted)` (done). `.cta-band` undefined-var padding masked by override — left as-is (will resolve naturally if C11 is done). Buzzer `--font-space-grotesk`/`--font-dm-sans` left as-is (Arial fallback is current rendered state; font change would alter appearance). |
| C16 | done | Deleted `@keyframes scale-in` (consumer `.subtopic-panel` removed in C7). Deleted `@keyframes fade-in` (consumer `.practice-sidebar-scrim.open` removed in C7). Deleted `@keyframes slide-in-left` (consumer `.practice-sidebar.sidebar-open` removed in C7). `@keyframes slide-up-glass` and `ai-fade-in` preserved (live consumers). |
| C17 | skipped (low severity, low risk) | Fragmented 820px blocks: the dead sub-blocks (C4 lesson-sidebar, C7 drawer) are now removed, which eliminates the worst fragmentation. Full consolidation (merging remaining same-breakpoint blocks) is a Phase 7 cosmetic task — skipped to keep this diff reviewable. |
| C18 | skipped (low severity, low risk) | Duplicate `.subjects-grid` 640px blocks: safe merge, but deferred to Phase 7 as cosmetic. No rendering change. |
| C19 | skipped (Visual risk: high) | `!important` strip file-wide from practice-page.css and tests-page.css requires full screenshot matrix. |
| C20a | done | Deleted universal `*{backdrop-filter:var(--glass-backdrop-mobile)!important}` rule from 560px block. Deleted the redundant explicit selector list that followed it (`.site-header`, `.card`, `.ghost-button`, `.competition-card`, `.hero-panel`, `.feature-card`, `.trust-strip span`, `.input`, `.select`, `.choice`, `.hero-preview-card`, `.hero-panel-row`, `.mini-stat-list span`, `.curriculum-subject-card`, `.curriculum-unit-card`, `.info-fact-card`, `.info-timeline-row`, `.curriculum-hero`). |
| C20b | skipped (Visual risk: high) | Remaining `!important` stripping in CLEAN/hub sections requires C9–C13 cascade rewrite first. |
| C21 | skipped (no safe migrations remaining) | Breakpoint migration table: all `Safe? = yes` blocks are already canonical. All non-canonical blocks (480/640/820) are marked `Safe? = no` and must stay. Nothing to do. |
| C22 / R3 | skipped — FLAGGED FOR USER | `.screen{overflow:hidden}` vs sticky: both options (overflow:clip OR delete dead sticky decls) are behavioral/product decisions. **Not implemented.** See detail below. |

### C22 / R3 — left for user decision

The `.screen { overflow: hidden }` rule at globals.css still defeats all `position: sticky` descendants (site header, course sidebar, practice sidebar, tests sidebar). Two options remain mutually exclusive:

1. **Activate sticky** (`overflow: hidden` → `overflow: clip`): single-line change; visual box unchanged; scroll behaviour changes (header + sidebars begin sticking on desktop/tablet). Must be scroll-screenshot verified at 375/768/1280.
2. **Match code to reality** (keep `overflow: hidden`, delete the now-inert `position: sticky`/`top` declarations at globals.css `.site-header` and `.course-sidebar`, practice-page.css `.practice-sidebar`, tests-page.css `.tests-sidebar`): no behaviour change, code honesty gain.

Neither option was applied. Phase 7 should present both to the user for a deliberate decision before shipping.
