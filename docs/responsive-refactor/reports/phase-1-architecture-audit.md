# Phase 1 Architecture Audit — 2026-07-12

Auditor notes:
- Every file in `src/components/` (15 components), every `page.tsx`/`layout.tsx` under `src/app/` (15 files), and all three CSS files were read in full.
- All dead-CSS and unused-component claims below were verified with Grep across `src/**/*.tsx` before being listed.
- Inline-style count verified: exactly **55 `style={{...}}` occurrences across 11 files** (CourseLayout 22, Footer 6, Header 6, not-found 6, page.tsx 5, layout.tsx 3, BuzzerArena 2, subject-course page 2, CompetitionCard 1, PracticeSession 1, lessonId page 1).
- Route-list discrepancy: `00-OVERVIEW.md` lists `…/tests/[testId]/page.tsx`, but **that file does not exist** (verified with Glob). The tests flow is `tests/page.tsx` → `tests/subject/[subjectSlug]/page.tsx?size=N`. Later phases should not go looking for it.
- `globals.css` is 4,651 lines. Roughly lines 3,493–3,889 are a "CLEAN PROFESSIONAL DESIGN OVERRIDES" layer that exists to cancel the glassmorphism base styles above it — this structure is the root cause of most `!important` usage.

## Summary

| Category | Findings |
|---|---|
| dead-css | F3, F4, F5, F6, F7, F27, F34, F38 |
| duplicate-layout / duplicate-rule | F1, F2, F8, F9, F12, F15, F16, F29 |
| inline-style | F10, F11, F13, F14, F26, F28, F30 |
| unused-code | F17, F18, F19, F20 |
| magic-number / fixed-dimension | F21, F22, F23, F24 |
| z-index / absolute-positioning / overflow hack | F25, F31 |
| hidden-element | F32, F33 |
| performance / cascade hazard | F1, F2, F35 |

**Top 5 worst files**
1. `src/app/globals.css` — override-layer architecture, ~40% dead selectors, ~500 `!important` declarations, undefined custom properties
2. `src/components/CourseLayout.tsx` — 22 inline style objects, fixed non-responsive grid, dead sibling CSS
3. `src/app/practice-page.css` — every rule `!important`; ~half the file is dead selectors
4. `src/app/tests-page.css` — every rule `!important`; duplicate `.subject-chip` definition conflicting with practice-page.css
5. `src/components/Header.tsx` / `src/components/Footer.tsx` — fully inline-styled while dead stylesheet equivalents remain in globals.css

---

## Findings

### F1: Glassmorphism base + "CLEAN PROFESSIONAL" override layer cancel each other
- **File:** src/app/globals.css:1-3491 (base) vs 3493-3889 (overrides)
- **Category:** duplicate-layout
- **Severity:** high
- **Detail:** The file first defines a full glass design system (`.button` :187, `.card` :858, `.eyebrow` :555, `.feature-card` :783, `.competition-card` :641, `.cta-band` :818, `.competition-card-icon` :707, `.feature-icon` :806, `h1,h2,h3` colors :563-586), then a second section re-declares the same selectors with `!important` to erase the glass styles (`.button` :3499, `.eyebrow` :3549, `h1,h2,h3` :3558, `.competition-card` :3642, `.feature-card` :3690, `.cta-band` :3723, `.card` :3786). `.feature-icon` and `.competition-card-icon` are each defined **three** times (:806/:3708/:3872 and :707/:3664/:3859) with the later two contradicting each other (sky-blue-on-tint vs navy-filled). The rendered output is only the final override; everything the overrides cancel is dead weight and forces `!important` everywhere downstream.
- **Suggested fix:** Phase 5/6: collapse each selector to its single effective declaration (the last-winning one) and delete the glass base + intermediate overrides; Phase 2 must not touch this.
- **Visual risk:** high (Phase 2 must skip; Phase 5 must diff computed styles before/after)

### F2: `.card` triple definition breaks `.card.spacious`
- **File:** src/app/globals.css:858, 3786, 4358
- **Category:** duplicate-layout
- **Severity:** high
- **Detail:** `.card` is defined three times. The last (:4358) sets `padding: 22px !important`, which defeats `.card.spacious { padding: var(--space-4) }` (:880, no `!important`) — so `spacious` currently does nothing for padding on any card. Widely used (`card spacious` appears throughout buzzer, info-session, learning pages).
- **Suggested fix:** Merge into one `.card` rule without `!important`; decide deliberately whether spacious padding (32px) or 22px is the shipped look (today's rendered value is 22px — keep that to stay visually identical).
- **Visual risk:** high if "fixed" naively (restoring `spacious` would change desktop) — consolidate to current rendered values only

### F3: ~40% of globals.css selectors match no TSX (verified by grep)
- **File:** src/app/globals.css (line refs below)
- **Category:** dead-css
- **Severity:** high
- **Detail:** The following selector families appear in **no** TSX file (each grepped individually):
  - Old header/nav markup: `.nav-inner` :147, `.brand-copy` :153-163, `.brand-mark` :165, `.nav-link` / `.pill-link` :172+, `.nav-links`/`.nav-cta` :3369, `.site-header` :3311, `.brand` :3354 — Header.tsx is fully inline-styled and only uses `.header-nav`.
  - Old footer markup: `.footer` :3039-3062 and :3770-3783, `.footer-inner`/`.footer-brand`/`.footer-brand-row` :3284-3294, `.disclaimer` :3064 — Footer.tsx is fully inline-styled and classless.
  - Old hero panel: `.hero` :279, `.hero-panel` :338-363, `.hero-panel-dots` :364, `.hero-preview-header` :493-501, `.hero-preview-progress-bar` :503, `.hero-preview-progress-labels` :512-520, `.hero-panel-row` :522-536, `.hero-panel-subject-dot` :538, `.hero-preview-card` :543-553, `.hero-visual` :3208, `.hero-preview-stack` :3381, `.hero-panel-list` :3376 — home hero now uses `.dashboard-mockup*` (which IS used).
  - `.mini-stat-list` :748-781 and :3673-3687, `.question-nav` :1627-1640, `.competition-section-nav` :1642-1658, `.competition-stage-card`/`.competition-level-card`/`.competition-subject-card` :1669, `.side-panel` :1071 & :3220, `.test-layout` :1063-1069, `.content-section` :1331, `.selected-context` :3407-3425, `.subtopic-panel` :3086-3094, `.modal-card` :1150, `.grid.four` :633 (+3 media rules), `.filter-bar`/`.action-row`/`.answer-actions` tokens inside the group selector :929-938.
  - Buzzer v1 (pre-rewrite) styles: `.buzzer-banner` :1858-1876 & :3233+, `.buzzer-mode-toggle` :1878-1893, `.buzzer-scoreboard` :1895-1916, `.buzzer-team-buttons` :1990-2038, `.buzzer-judge-button` :2040-2046, `.buzzer-progress` :2048, `.buzzer-status-card` :2055 & :2068, `.buzzer-timer` :2059-2066, `.buzzer-timer-track` :2097-2115, `.buzzer-hidden-prompt` :2117, `.buzzer-choice-button` :2122-2147, `.buzzer-organizer-sheet` :2149-2157, `.buzzer-practice-footer` :2159, `.buzzer-log-meta` :2086-2095 & :3265, `.buzzer-start-card` :2351-2358, `.buzzer-start-icon` :2360, `.buzzer-room-modal` :2374 (only `-header` variant is used), `.buzzer-mode-panel`/`.buzzer-layout`/`.buzzer-stage-grid`/`.buzzer-foot-card`/`.buzzer-foot-row`/`.buzzer-countdown` in media blocks :3225-3277, :3427-3431, `.buzzer-controls` :1986 & :2006, `.buzzer-team-card.active` :1932.
  - Course layout v1: `.course-layout` :3098-3103, `.course-nav-subject` :3105, `.course-nav-chevron` :3111, `.course-nav-lesson` :3116-3123, `.course-nav` :3162, `.course-content` :3125 & :3169 (`.course-content-empty` :3130 IS used — keep).
  - Lesson sidebar v1: `.lesson-detail-layout` :4297-4302 & :4369-4388, `.lesson-sidebar-subject-icon` :4304, `.lesson-sidebar-header` :4308-4319, `.lesson-list` :4321, `.lesson-item` :4325, `.lesson-sidebar`/`.lesson-content` :4380-4387 — superseded by CourseLayout's inline styles (see F10).
  - Orphan utilities: `.chip` :4330, `.btn` :4342, `.small` :4365.
  - Practice mobile-drawer that was never wired: `.practice-sidebar-scrim` :4419-4430, `.practice-filters-toggle` :4432-4452, `.practice-sidebar.sidebar-open` :4406-4417, `@keyframes slide-in-left` :4455 — no TSX toggles `sidebar-open`.
  - State variants never set by components: `.choice.correct`/`.choice.incorrect` :1102-1112 (QuickTestRunner only sets `selected`).
- **Suggested fix:** Phase 6: delete listed blocks after re-grepping each name at implementation time.
- **Visual risk:** none (verified unused), except keep `.course-content-empty` and `.buzzer-room-modal-header`

### F4: Custom properties referenced but never defined
- **File:** src/app/globals.css:489, 826, 1912, 1946, 1997, 2035, 2061, 2223, 2670, 2739; src/app/not-found.tsx:5-13
- **Category:** dead-css
- **Severity:** high
- **Detail:** Verified by grep — no definitions exist for: `--text-secondary` (`.hero-note` color :489, not-found.tsx), `--space-xl/--space-lg/--space-md/--space-sm/--space-xs` (`.cta-band` padding :826 — masked by the `!important` override at :3729 — and four inline styles in not-found.tsx whose margins silently resolve to nothing), `--font-space-grotesk` and `--font-dm-sans` (8 buzzer `font-family` declarations silently fall back to Arial — the intended display font never loads). Only `--font-poppins`/`--font-open-sans` are defined (layout.tsx) and `--space-2…6` exist.
- **Suggested fix:** Phase 2: replace undefined var references with existing tokens (`--space-3` etc., `--muted`); decide whether buzzer should use Poppins or keep the current Arial fallback (keeping Arial = visually identical).
- **Visual risk:** low if replaced with values that match today's fallback behavior; high if fonts are "fixed" to a new typeface

### F5: `.tests-page-section` / `.practice-page-section` padding rules are dead in effect
- **File:** src/app/practice-page.css:3-5; src/app/tests-page.css:3-5; src/app/globals.css:3718-3720
- **Category:** dead-css
- **Severity:** low
- **Detail:** `.section { padding: 56px 0 !important }` (globals :3718) beats both page-section padding rules (`var(--space-4) 0`, no `!important`) since the classes sit on the same element. The rules have no effect.
- **Suggested fix:** Delete the two no-op rules (Phase 6) or drop the `!important` from `.section` during consolidation.
- **Visual risk:** none (rules already have no effect)

### F6: `.stats-card` class has no CSS definition; `StatsCard` component is unused
- **File:** src/components/StatsCard.tsx:1-22
- **Category:** unused-code
- **Severity:** medium
- **Detail:** Grep shows `StatsCard` is imported nowhere. Its `stats-card` class is also defined in no stylesheet. The `.stat-row`/`.stat` rules in globals.css :897-927 exist only to serve this unused component (no other TSX uses them).
- **Suggested fix:** Phase 2: delete `src/components/StatsCard.tsx`; Phase 6: delete `.stat`/`.stat-row` in globals.css :897-927 and the `.stat-row` media entries (:3215).
- **Visual risk:** none

### F7: `.competition-card-content h2` targets an element that doesn't exist
- **File:** src/app/globals.css:739-741
- **Category:** dead-css
- **Severity:** low
- **Detail:** CompetitionCard renders `<h3>` (CompetitionCard.tsx:35); the `h2` rule matches nothing.
- **Suggested fix:** Delete rule (Phase 6).
- **Visual risk:** none

### F8: `.subject-chip` defined in two stylesheets with conflicting `!important` rules
- **File:** src/app/practice-page.css:406-432 vs src/app/tests-page.css:78-106
- **Category:** duplicate-layout
- **Severity:** high
- **Detail:** Next.js page-level CSS imports are global — both files ship on any visit that touches both routes in a session. The two `.subject-chip` definitions differ (padding `8px 14px` vs `10px 14px`, border `1px` vs `1.5px`, `width:100%` only in tests version, different mobile rules) and both are fully `!important`, so which wins depends on stylesheet emission order, not intent. The practice-page.css copy is additionally dead on its own pages (no practice TSX renders `subject-chip` — only TestBuilder does).
- **Suggested fix:** Phase 6: keep one definition (the tests-page.css one, which matches the rendered TestBuilder) and delete the practice-page.css copy.
- **Visual risk:** low (practice copy is unused; verify TestBuilder chips at 375/768/1280 after removal)

### F9: `.stat-row` triple definition across files
- **File:** src/app/globals.css:897 vs src/app/practice-page.css:471-480, 609-612, 656-659
- **Category:** duplicate-layout
- **Severity:** medium
- **Detail:** Same class defined in two files (plus media re-definitions), one with `!important`. All consumers are the unused StatsCard (F6), so the whole family is removable.
- **Suggested fix:** Delete along with F6.
- **Visual risk:** none

### F10: CourseLayout.tsx — 22 inline style objects implement the whole course sidebar
- **File:** src/components/CourseLayout.tsx:129-296, 405-409
- **Category:** inline-style
- **Severity:** high
- **Detail:** The entire two-pane layout is inline: root grid `gridTemplateColumns: "300px 1fr"` (:129), sticky sidebar with `maxHeight: calc(100vh - 120px)` (:131, :160), topic/subtopic/lesson rows with per-render style objects including hover-less buttons and computed colors (`${subjectColor}15` alpha-hex trick :179), and the empty-state block (:405-409). Because these are inline, **no media query can reach them** — the page is a fixed 300px+1fr grid at 320px wide (the dead `.course-layout` CSS in globals :3142-3150 had an 820px collapse that can no longer apply). This is the single biggest blocker for the responsive phases.
- **Suggested fix:** Phase 2: move all static styles to semantic classes in globals.css (`.course-layout`, `.course-sidebar`, `.course-topic-btn`, etc. — reuse/replace the dead v1 names), keeping only the dynamic `subjectColor` pieces as inline `style`/CSS variables; desktop values must be copied exactly.
- **Visual risk:** low (mechanical extraction, same computed values) — but verify sticky behavior and active-lesson highlight after extraction

### F11: Header.tsx fully inline-styled; mobile has no navigation at all
- **File:** src/components/Header.tsx:22-108; src/app/globals.css:957-968
- **Category:** inline-style
- **Severity:** high
- **Detail:** 6 inline style objects define the sticky header, brand, and nav pills; the only class is `.header-nav`, which is `display:none` under 768px with **no hamburger/alternative**, so mobile users cannot reach Science Olympiad/Math Olympiad (acceptable — they're coming-soon) but also lose the Science Bowl nav affordance entirely. Colors `#1a2745`, `#5a92f0`, `#c0c7d4` duplicate `--navy`/`--sky-blue` tokens. Note: `position: sticky` on the header is likely defeated anyway by `.screen { overflow: hidden }` (see F30).
- **Suggested fix:** Phase 2: extract inline styles to classes (`.site-header`, `.header-inner`, `.header-brand`, `.header-nav-link` — the `.site-header` name is currently dead and reusable). The missing-mobile-nav design decision belongs to Phase 3/4, not Phase 2.
- **Visual risk:** low for extraction; high for any mobile-nav addition (defer to Phase 4)

### F12: Footer.tsx fully inline-styled while dead `.footer` CSS remains
- **File:** src/components/Footer.tsx:1-60; src/app/globals.css:3039-3062, 3770-3783
- **Category:** inline-style
- **Severity:** medium
- **Detail:** 6 inline style objects, including three identical link style objects repeated verbatim (:26-55). Two dead `.footer` blocks in globals.css describe a different footer that no longer exists. Also links are `href="#"` placeholders.
- **Suggested fix:** Phase 2: extract to `.site-footer`, `.site-footer-inner`, `.site-footer-links a` classes; delete dead `.footer` blocks in Phase 6.
- **Visual risk:** none

### F13: layout.tsx inline styles force the `!important` mobile unwrap hack
- **File:** src/app/layout.tsx:57-63; src/app/globals.css:4612-4624
- **Category:** inline-style
- **Severity:** medium
- **Detail:** `.page-shell` gets inline `padding: 24px` and `.screen` gets inline flex column — because the padding is inline, the mobile rule needs `@media (max-width:820px) .page-shell { padding: 0 !important }`. Moving the padding into the `.page-shell` rule (it already exists at :129) removes the need for `!important`.
- **Suggested fix:** Phase 2: move both inline objects into the existing `.page-shell`/`.screen` rules; drop `!important` from the 820px override.
- **Visual risk:** none

### F14: not-found.tsx — 6 inline styles, four of which reference undefined variables
- **File:** src/app/not-found.tsx:5-14
- **Category:** inline-style
- **Severity:** medium
- **Detail:** `var(--space-xl)`, `var(--space-sm)`, `var(--space-xs)`, `var(--space-md)`, `var(--text-secondary)` are all undefined (F4) — those margin/padding/color declarations silently do nothing today. The rendered page is therefore just `.section` + `.stack` defaults plus the 4rem "404" span.
- **Suggested fix:** Phase 2: replace with a small `.not-found` class block using defined tokens that reproduces the *current rendered* output (i.e., without inventing the margins that never applied).
- **Visual risk:** none if current rendered state is reproduced; low if the never-applied margins get "restored"

### F15: Lesson content rendering duplicated ~50 lines in two places
- **File:** src/components/CourseLayout.tsx:332-380 vs src/app/[competitionSlug]/[level]/learning/[lessonId]/page.tsx:92-140
- **Category:** duplicate-layout
- **Severity:** high
- **Detail:** The clue-table / buzz-fact / review-list / body-section rendering (including the identical `isReview`/`isTossUp` regexes, identical class names, and the identical inline `style={{ display: "grid", gap: "10px" }}` wrapper) is copy-pasted. The meta-bar/title-block/badges/concepts-box header markup (CourseLayout :301-329 vs lessonId page :62-89) is also duplicated. Divergence risk: lessonId page has its own `parseReviewBody` (:47-55) while CourseLayout uses `parseLessonSectionLines` — same intent, different code.
- **Suggested fix:** Phase 2: extract a shared `<LessonArticle lesson={...}>` (or at minimum `<LessonSections>`) component used by both; replace the inline grid style with a `.lesson-clue-stack` class.
- **Visual risk:** none (same markup and classes emitted)

### F16: Duplicated helpers across components/pages
- **File:** src/components/LessonCard.tsx:5-10 and src/components/CurriculumTopicExplorer.tsx:5-10 (`normalizeLevel`); level-label ternaries in [level]/page.tsx:22, learning/page.tsx:88, practice/page.tsx:66, tests/page.tsx:62, tests/subject/[subjectSlug]/page.tsx:65, learning/[lessonId]/page.tsx:17, learning/subject/[subjectSlug]/page.tsx:64
- **Category:** unused-code (duplication)
- **Severity:** medium
- **Detail:** `normalizeLevel()` is copy-pasted verbatim in two components; the `level === "middle-school" ? "Middle School" : …` label ternary is re-implemented in 7 pages with three subtly different fallbacks (`""`, `"Practice"`, `"Middle School"`).
- **Suggested fix:** Phase 2: add `normalizeLevel()` and `levelLabel()` to `src/lib/levels.ts` and import everywhere; preserve each page's current fallback string.
- **Visual risk:** none

### F17: Dead code inside components
- **File:** src/components/CourseLayout.tsx:23-36 (`prevLesson`), src/app/[competitionSlug]/[level]/learning/[lessonId]/page.tsx:24,42 (`prevLesson`), src/components/BuzzerArena.tsx:364-370 (`nextStep`/`previousStep` no-op ternaries `current === 1 ? 2 : 2`), src/components/QuestionText.tsx:5 (`className` prop never passed by any caller)
- **Category:** unused-code
- **Severity:** low
- **Detail:** `prevLesson` is computed in both lesson views but never rendered (only "Next" is shown). The BuzzerArena step functions contain ternaries that always return the same value. `QuestionText`'s `className` prop is unused by all 4 call sites (harmless; keep the prop).
- **Suggested fix:** Phase 2: delete `prevLesson` computations; simplify `nextStep`/`previousStep` to `setSetupStep(2)`/`setSetupStep(1)`.
- **Visual risk:** none

### F18: TestBuilder "Options" checkboxes are decorative
- **File:** src/components/TestBuilder.tsx:100-120
- **Category:** unused-code
- **Severity:** medium
- **Detail:** The three checkboxes (Timed mode, Show explanations after, Bonus questions) have no state, no name, and are never read — `handleStart` ignores them. Users can check boxes that do nothing.
- **Suggested fix:** Do NOT silently delete (visible UI). Flag to the user: either wire them up or remove the section — this is a product decision outside Phase 2's remit.
- **Visual risk:** high (removing changes visible desktop UI — must skip and flag)

### F19: CompetitionCard disabled button styles duplicated inline
- **File:** src/components/CompetitionCard.tsx:60-70; src/app/globals.css:691-694
- **Category:** inline-style
- **Severity:** low
- **Detail:** The inline `opacity/cursor/pointerEvents` object duplicates the `.button-disabled` class already on the element (globals :691 sets opacity/cursor with `!important`; only `pointer-events` is missing from the class).
- **Suggested fix:** Phase 2: add `pointer-events: none` to `.button-disabled` and remove the inline style.
- **Visual risk:** none

### F20: `.competition-intro { display:none }` hides the entire coming-soon page header on mobile
- **File:** src/app/globals.css:3403-3405; src/app/[competitionSlug]/page.tsx:103
- **Category:** hidden-element
- **Severity:** medium
- **Detail:** At ≤560px the coming-soon pages (`/science-olympiad`, `/math-olympiad`) lose their `h1`, description, and the "Explore Science Bowl" CTA — the page body becomes essentially empty on phones.
- **Suggested fix:** Phase 4: remove the `display:none` and style the intro for mobile instead.
- **Visual risk:** none on desktop; changes mobile (that's the point — record as Phase 3/4 item)

### F21: Fixed heights and widths that will fight small viewports
- **File:** src/app/globals.css:2001 (`.buzzer-big-button min-height:138px` → :3000 `210px`, mobile `170px`), :2532 (`.buzzer-setup-card min-height:180px`), :2293 (`.buzzer-hub-card min-height:200px`), :2863 (`.buzzer-question-text min-height:112px`), :2762 (`.buzzer-buzzed-panel min-height:156px`), :2811+2832 (`.buzzer-answer-clock min-width:180px ×2`), :2715 (`.buzzer-console-grid` fixed `360px` column), :2950 (`.buzzer-participant-grid` fixed `320px` column), :574 (`h1 { max-width:13ch }` global cap, patched per-page with `max-width:none !important` at :3583 and :3917); src/components/CourseLayout.tsx:129 (`300px` sidebar), :160 (`maxHeight: calc(100vh - 120px)`); src/app/practice-page.css:437 (`260px` sidebar), tests-page.css:29 (`280px` sidebar), practice-page.css:452 + tests-page.css:193 (`top: 88px` sticky offsets assuming header height)
- **Category:** fixed-dimension
- **Severity:** medium
- **Detail:** Repeated magic dimensions, several duplicated with different values at different breakpoints, and two sticky offsets (`88px`/`80px`) hard-coded to an assumed header height. The global `h1 { max-width:13ch }` is a trap: every new page needs an override (two already exist).
- **Suggested fix:** Phase 4/6: replace sidebar widths and sticky offsets with shared custom properties; scope the 13ch cap to the home hero instead of global `h1`.
- **Visual risk:** low if values are tokenized without change; high for the `h1` scoping (audit every h1 first)

### F22: Inconsistent breakpoint set
- **File:** src/app/globals.css (480, 560, 640, 768, 820, 1023, 1024), practice-page.css (560, 768, 1024), tests-page.css (560, 768, 1024)
- **Category:** magic-number
- **Severity:** medium
- **Detail:** 24 media queries in globals.css across 7 distinct breakpoints, plus `min-width:1024` / `max-width:1023` pairs. The tier model (767/1023) matches none of the dominant `max-width:820px` usage. Confirmed Phase 5/6 concern; earlier phases must reuse whatever the surrounding block already uses.
- **Suggested fix:** Phase 5: propose target set (e.g. 767 / 1023) with a per-rule migration table; Phase 6 implements.
- **Visual risk:** high (any breakpoint move changes rendering between old/new values — needs screenshot matrix)

### F23: Token system exists but hex/shadow literals are pasted everywhere
- **File:** src/app/practice-page.css + tests-page.css + globals.css hub section (examples: `#1a2745` ≈90 occurrences, `#667085` ≈50, `border: 1px solid #e7e9ee` ≈20, `box-shadow: 0 2px 8px rgba(15,23,42,0.05)` in pq-card :15, pq-stats-card :244, session-stats-card :461, tests-section :45, your-test-card :202; `0 10px 28px rgba(15,23,42,.12)` hover shadow ×3 :2297/:3988/:4151)
- **Category:** magic-number
- **Severity:** medium
- **Detail:** `--navy`, `--muted`, `--border-color`, `--shadow-sm` exist as tokens but the newer CSS (hub, practice, tests, buzzer v2) uses raw literals, plus a parallel border color `#e7e9ee` that isn't the token value (`#e0e0e0`). Two shadow scales coexist.
- **Suggested fix:** Phase 6: alias the actually-used values as tokens (`--border-soft: #e7e9ee`, `--shadow-card`) and substitute; do not change rendered values.
- **Visual risk:** none if substitution is value-identical

### F24: `.subject-card:nth-child(1..6)` — color coding by DOM position
- **File:** src/app/globals.css:4173-4224
- **Category:** magic-number
- **Severity:** medium
- **Detail:** Subject tint/icon gradients are keyed to grid position, not subject identity. The learning page filters to `visibleSubjects` (learning/page.tsx:80), so when a subject has zero lessons the colors shift onto the wrong subjects. Practice/hub pages render all six, masking the bug.
- **Suggested fix:** Phase 2: emit a modifier class from `subjectEmoji`-style mapping (e.g. `subject-card--biology`) and key CSS to it.
- **Visual risk:** low (same colors, now stable); fixes a latent mis-coloring on filtered lists

### F25: Sticky header + sticky sidebars sit inside `overflow:hidden` ancestor
- **File:** src/app/globals.css:141 (`.screen { overflow:hidden }`); src/components/Header.tsx:27 (`position:sticky`); src/components/CourseLayout.tsx:131; practice-page.css:451; tests-page.css:192
- **Category:** overflow hack
- **Severity:** medium
- **Detail:** `.screen` (the white rounded shell) sets `overflow: hidden`, which makes it the containing scroll box for every `position: sticky` descendant — the header and the practice/tests/course sidebars cannot actually stick to the viewport while the body scrolls. Either sticky is silently broken today (likely, worth confirming in Phase 3 with a scroll test) or removal of `overflow:hidden` would suddenly activate it and change behavior.
- **Suggested fix:** Phase 3: verify actual sticky behavior in-browser at all three widths and record it; Phase 4 decides (`overflow: clip` on `.screen` would preserve the rounded-corner clipping while allowing sticky).
- **Visual risk:** high (activating sticky changes scroll behavior — audit first, don't fix blind)

### F26: Home page CTA section uses inline layout styles duplicating `.cta-band` CSS
- **File:** src/app/page.tsx:180-189
- **Category:** inline-style
- **Severity:** low
- **Detail:** `style={{ textAlign: "center", alignItems: "center" }}` on the container and `style={{ display: "flex", justifyContent: "center" }}` on the button wrapper duplicate centering that `.cta-band` CSS already half-declares (`text-align:center` on h2 :3737, `margin: 0 auto` on p :3743). The extra button wrapper div exists only to center one link.
- **Suggested fix:** Phase 2: add the centering to `.cta-band .container` in CSS, drop both inline styles and the wrapper div.
- **Visual risk:** none

### F27: learning/subject page rebuilds `.section`/`.container` with inline styles + fragment wrapper
- **File:** src/app/[competitionSlug]/[level]/learning/subject/[subjectSlug]/page.tsx:83-96
- **Category:** inline-style
- **Severity:** medium
- **Detail:** `<><div style={{ paddingLeft:24, paddingRight:24, paddingTop:18, paddingBottom:44 }}><div style={{ maxWidth:1200, margin:"0 auto" }}>` re-implements the existing `.section > .container` pattern with slightly different padding, plus a pointless fragment wrapper. Being inline, mobile padding cannot be adjusted by media query.
- **Suggested fix:** Phase 2: replace with `<section className="section course-section"><div className="container">` and a small `.course-section` padding rule matching today's values (18px top / 44px bottom).
- **Visual risk:** low (match padding exactly)

### F28: PracticeSession / SimplePracticeQuestion progress-fill inline width
- **File:** src/components/PracticeSession.tsx:118; src/components/BuzzerArena.tsx:681, 743; src/app/page.tsx:95,104,113
- **Category:** inline-style
- **Severity:** low
- **Detail:** `style={{ width: pct% }}` occurrences are **legitimately dynamic** — listed here so Phase 2 knows they are exempt and should NOT be extracted.
- **Suggested fix:** none — keep as-is.
- **Visual risk:** none

### F29: Practice/tests sidebar layouts are parallel implementations
- **File:** src/app/practice-page.css:435-453 (`.practice-layout`) vs src/app/tests-page.css:27-37 (`.tests-layout`) vs dead globals `.practice-layout,.test-layout` :1063-1069
- **Category:** duplicate-layout
- **Severity:** medium
- **Detail:** Three definitions of the same "main + right sidebar" grid exist: globals.css `.practice-layout, .test-layout { grid-template-columns: 250px minmax(0,1fr) }` (sidebar LEFT — contradicts the shipped layout and is overridden by the `!important` page files), practice-page.css (`1fr 260px`), tests-page.css (`1fr 280px`). The globals copy is dead-in-effect but still matches `.practice-layout`, so it silently loses only because of `!important` in the page file.
- **Suggested fix:** Phase 6: delete the globals `.practice-layout,.test-layout` rule; later consider one shared `.sidebar-layout` with a width variable.
- **Visual risk:** none for deleting the globals rule (verified overridden); low for consolidation

### F30: Mobile `* { backdrop-filter: blur(12px) !important }`
- **File:** src/app/globals.css:3315-3318
- **Category:** performance / magic-number
- **Severity:** high
- **Detail:** At ≤560px, a universal selector applies `backdrop-filter: var(--glass-backdrop-mobile)` (= `blur(12px)`) to **every element on the page**. Intended to "reduce glass blur on mobile," but since the CLEAN overrides removed glass everywhere, it now only forces compositing layers on hundreds of elements — a real scroll-performance hazard on low-end phones — and is visually inert on opaque backgrounds. The redundant follow-up list (:3320-3339) re-applies the same value to specific selectors.
- **Suggested fix:** Phase 6: delete the universal rule and the redundant list; confirm no visible change at 375px (elements with translucent backgrounds: `.buzzer-overlay-backdrop` has its own blur(4px), unaffected).
- **Visual risk:** low (verify translucent elements: trust-strip, ghost-button, empty)

### F31: Buzzer overlay/backdrop absolute positioning is correct but `z-index: 200` collides with practice drawer
- **File:** src/app/globals.css:2379-2401 (`.buzzer-overlay z-index:200`), :4409 (`.practice-sidebar.sidebar-open z-index:200`), :4424 (scrim 199); Header.tsx:29 (`zIndex:10`)
- **Category:** z-index
- **Severity:** low
- **Detail:** The modal overlay usage itself is legitimate (true modal). The z-index scale (10 / 199 / 200 / 200) is ad-hoc; the 199/200 pair belongs to the dead practice-drawer feature (F3) and can go with it.
- **Suggested fix:** Phase 6: after removing the dead drawer, document the remaining scale (header 10, modal 200) as two tokens.
- **Visual risk:** none

### F32: Unstyled class names emitted by TSX
- **File:** src/app/[competitionSlug]/[level]/learning/page.tsx:126 (`curriculum-value-copy`), src/components/StatsCard.tsx:11 (`stats-card`)
- **Category:** dead-css (inverse — class with no rule)
- **Severity:** low
- **Detail:** `curriculum-value-copy` and `stats-card` appear in JSX but have no CSS anywhere; they render as plain elements.
- **Suggested fix:** Phase 2: remove the class names (or leave `curriculum-value-copy` if a rule is planned) — zero visual impact.
- **Visual risk:** none

### F33: Level toggle only rendered on hub pages; `?level=` query variant on `/science-bowl` duplicates the path-based route
- **File:** src/app/[competitionSlug]/page.tsx:53-96 vs src/app/[competitionSlug]/[level]/page.tsx
- **Category:** duplicate-layout
- **Severity:** low
- **Detail:** `/science-bowl?level=high-school` and `/science-bowl/high-school` render the same `ScienceBowlHub` through two different data paths (the query variant recomputes counts for BOTH levels, :60-65, then uses one). Not a layout bug, but a maintenance duplication the cleanup phase should know about; also the `?action=buzzer` redirect (:79-81) happens *after* all count fetching — wasted work before a redirect.
- **Suggested fix:** Phase 2 (optional, low risk): hoist the redirect above the count fetching; leave route duplication alone (SEO-relevant).
- **Visual risk:** none

### F34: `header-nav` mobile hide leaves 26px gap token unused; `NAV_EMOJIS` duplicates CompetitionCard emoji map
- **File:** src/components/Header.tsx:8-12 vs src/components/CompetitionCard.tsx:22-27 vs src/lib/subjects.ts (`subjectEmoji`)
- **Category:** unused-code (duplication)
- **Severity:** low
- **Detail:** The competition-emoji mapping (`🧪/🔬/∑`) is hard-coded in two components while a subject-emoji helper already lives in `src/lib/subjects.ts`.
- **Suggested fix:** Phase 2: add `competitionEmoji(slug)` to `src/lib/subjects.ts` (or a new `competitions` helper) and use it in both.
- **Visual risk:** none

### F35: `!important` saturation in page CSS files
- **File:** src/app/practice-page.css:376-664 (every declaration from :376 on), src/app/tests-page.css:8-408 (every declaration), src/app/globals.css hub/lesson sections :3895-4340 (nearly every declaration)
- **Category:** duplicate-rule (cascade abuse)
- **Severity:** high
- **Detail:** Several hundred declarations carry `!important` with nothing to override (the selectors are unique to their components). This blocks all future cascade work — every media query in these files must also be `!important`, and any Phase 4 responsive rule will be forced into the same arms race.
- **Suggested fix:** Phase 6: strip `!important` file-wide in practice-page.css/tests-page.css and the hub section, then fix the handful of real conflicts exposed (F2, F5, F8, F29) properly. Must be done as one pass with screenshot comparison.
- **Visual risk:** high (cascade order changes — needs full before/after screenshot matrix; that is exactly what Phase 5's audit + Phase 6's implementation are for)

---

## Notes for Phase 2 (implementation scope guidance)

Safe to implement in Phase 2 (visual risk none/low): F6, F7 (CSS deletion can wait for P6), F10, F11 (extraction only), F12, F13, F14, F15, F16, F17, F19, F24, F26, F27, F32, F33, F34.

Must SKIP and leave for later phases: F1, F2, F3 (Phase 6), F5, F8, F9 (Phase 6), F18 (product decision — flag to user), F20 (Phase 4), F21, F22 (Phase 5/6), F23 (Phase 6), F25 (Phase 3 verify first), F29, F30, F31, F35 (Phase 6).

---

## Phase 2 disposition

| Finding | Status | Notes |
|---------|--------|-------|
| F1 | skipped (visual risk: high) | Glassmorphism base + override layer collapse — deferred to Phase 5/6 |
| F2 | skipped (visual risk: high) | `.card` triple definition — deferred to Phase 5/6 |
| F3 | skipped (Phase 6) | Dead CSS selectors — bulk deletion deferred to Phase 6 |
| F4 | skipped (Phase 6) | Undefined CSS variables — some are in dead CSS blocks being removed in Phase 6; buzzer font fallback is intentionally keeping Arial (visually identical) |
| F5 | skipped (Phase 6) | Dead `!important` padding rules — deferred to Phase 6 |
| F6 | done | Deleted `src/components/StatsCard.tsx` (confirmed no imports) |
| F7 | skipped (Phase 6) | Dead `.competition-card-content h2` rule — CSS deletion deferred to Phase 6 |
| F8 | skipped (Phase 6) | Duplicate `.subject-chip` definitions — deferred to Phase 6 |
| F9 | skipped (Phase 6) | `.stat-row` triple definition — removed with F6 at Phase 6 |
| F10 | done | Extracted all 22 CourseLayout inline styles to semantic CSS classes (`.course-two-pane`, `.course-sidebar`, `.course-sidebar-header`, `.course-sidebar-nav`, `.course-topic-btn`, `.course-subtopic-btn`, `.course-lesson-link`, `.course-empty-state`, etc.); only dynamic `subjectColor` values remain inline |
| F11 | done | Extracted Header.tsx 6 inline styles to `.site-header`, `.site-header-inner`, `.site-header-brand`, `.site-header-logo`, `.site-header-nav-link`, `.site-header-nav-icon` classes; replaced `NAV_EMOJIS` with `competitionEmoji()` import (F34) |
| F12 | done | Extracted Footer.tsx 6 inline styles to `.site-footer`, `.site-footer-inner`, `.site-footer-links` classes |
| F13 | done | Moved `padding: 24px` from layout.tsx inline to `.page-shell` CSS; moved `display:flex; flexDirection:column` to `.screen` CSS; moved `flex:1` to `.page-main` class; removed `!important` from 820px `.page-shell { padding: 0 }` override |
| F14 | done | Replaced 6 inline styles (including 4 undefined variable references) with `.not-found-section`, `.not-found-inner`, `.not-found-code`, `.not-found-message` classes matching current rendered output |
| F15 | done | Replaced `style={{ display: "grid", gap: "10px" }}` in CourseLayout and lessonId page with `.lesson-clue-stack` class; both files now share the same class name |
| F16 | done | Added `normalizeLevel()` to `src/lib/levels.ts`; removed duplicate function from LessonCard.tsx and CurriculumTopicExplorer.tsx; both now import from shared location. Note: `levelLabel` ternaries in 7 pages left as-is since they have subtly different fallbacks and `schoolLevelLabel()` already exists in levels.ts for any Phase 3+ callers |
| F17 | done | Removed `prevLesson` computations from CourseLayout.tsx and lessonId page (only "Next" is ever rendered); simplified BuzzerArena `nextStep`/`previousStep` from always-same-value ternaries to direct `setSetupStep(2)` / `setSetupStep(1)` |
| F18 | skipped (product decision) | TestBuilder decorative checkboxes — Timed mode, Show explanations after, Bonus questions have no state and are never read. Product decision required: either wire them up or remove the section. Do NOT silently delete. |
| F19 | done | Added `pointer-events: none` to `.button-disabled` in globals.css; removed redundant inline `opacity/cursor/pointerEvents` object from CompetitionCard.tsx (opacity/cursor were already covered by existing `!important` rules) |
| F20 | skipped (Phase 4) | `.competition-intro { display:none }` on mobile — mobile layout fix deferred to Phase 4 |
| F21 | skipped (Phase 5/6) | Fixed heights/widths and sticky offsets — deferred to Phase 5/6 |
| F22 | skipped (Phase 5/6) | Inconsistent breakpoint set — deferred to Phase 5/6 |
| F23 | skipped (Phase 6) | Hex literals / shadow literals not tokenized — deferred to Phase 6 |
| F24 | done | Replaced `:nth-child(1..6)` subject-card color selectors with subject-identity modifier classes (`.subject-card--biology`, `--chemistry`, `--physics`, `--earth-and-space`, `--energy`, `--math`); updated learning/page.tsx and practice/page.tsx to emit the modifier class; colors are now stable when `visibleSubjects` filters out empty subjects |
| F25 | skipped (Phase 3) | `overflow: hidden` on `.screen` defeating sticky — Phase 3 must verify actual sticky behavior before Phase 4 fixes it |
| F26 | done | Removed two inline style objects and wrapper div from home page CTA section; added `.cta-band-content` class with `text-align: center; align-items: center` |
| F27 | done | Replaced inline wrapper div with `<section className="section course-section"><div className="container">` in learning/subject/[subjectSlug]/page.tsx; added `.course-section { padding-top: 18px; padding-bottom: 44px }` to match previous rendered values |
| F28 | skipped (legitimate) | Dynamic `style={{ width: pct% }}` — confirmed exempt, left as-is |
| F29 | skipped (Phase 6) | Parallel practice/tests sidebar layout definitions — CSS deletion deferred to Phase 6 |
| F30 | skipped (Phase 6) | Universal backdrop-filter on mobile — deferred to Phase 6 |
| F31 | skipped (Phase 6) | z-index scale — deferred to Phase 6 after dead drawer removal |
| F32 | done | Removed `curriculum-value-copy` class name from learning/page.tsx (class had no CSS rule anywhere) |
| F33 | done | Hoisted `?action=buzzer` redirect above all data fetching in `[competitionSlug]/page.tsx` |
| F34 | done | Added `competitionEmoji(slug)` to `src/lib/subjects.ts`; Header.tsx now uses it instead of local `NAV_EMOJIS`; CompetitionCard.tsx now uses it instead of its local ternary |
| F35 | skipped (Phase 6) | `!important` saturation — must be stripped as one coordinated pass in Phase 6 |
