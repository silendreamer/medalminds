# Claude Redesign Prompt for Medal Minds

## Overview
Redesign the Medal Minds homepage and component library to be **modern, clean, and professional**. The current design feels cluttered with excessive glassmorphism and unclear visual hierarchy. Target outcome: a cohesive, spacious design that scales beautifully across mobile, tablet, and desktop (up to 1920px).

---

## Design Principles

1. **Clarity over trends** — Remove glassmorphism; use solid, well-lit cards with subtle shadows
2. **Breathing room** — Increase padding and gaps; less visual noise
3. **Hierarchy** — Heading sizes should be dramatically smaller; body text should be primary (not muted)
4. **Consistency** — One font scale, one gap system, one color story
5. **Professional tone** — This is an educational platform, not a startup landing page

---

## Color System (Simplified)

### Primary Colors
- **Navy:** `oklch(0.12 0.04 275)` — All body text, icons, and primary CTAs
- **Sky Blue:** `oklch(0.55 0.18 253)` — Link hovers, secondary buttons, accents
- **White:** `oklch(0.99 0.01 92)` — Card backgrounds, safe backgrounds

### Accent
- **Gold:** `oklch(0.72 0.1 88)` — Trust badges, stat highlights, special states

### Neutral
- **Border:** Light gray `oklch(0.92 0.01 170)` — Card borders, rules
- **Disabled/Secondary text:** `oklch(0.65 0.02 170)` — Captions, timestamps, metadata only

### Remove
- All other oklch vars (–brand, –primary, –slate, –muted, etc.)
- All gradient-glass-* variables
- Stop using rgba() for transparency (use oklch with alpha instead)

---

## Typography Scale (Responsive)

**Desktop (1200px+):**
| Use | Size | Weight | Font |
|-----|------|--------|------|
| h1 | 48px | 700 | Poppins |
| h2 | 36px | 700 | Poppins |
| h3 | 24px | 600 | Poppins |
| Body (p, li, span) | 16px | 400 | Open Sans |
| Small/caption | 14px | 400 | Open Sans |
| Eyebrow/label | 12px | 600 | Open Sans |

**Tablet (768px–1199px):**
- h1: 36px
- h2: 28px
- h3: 20px
- Body: 16px

**Mobile (< 768px):**
- h1: 28px
- h2: 20px
- h3: 18px
- Body: 15px

**Remove clamp() entirely.** Use CSS media queries instead.

---

## Spacing System

Replace all spacing variables with this 5-step scale:

```
--space-xs:  8px    (icon gaps, very tight)
--space-sm: 16px    (component padding, section gaps)
--space-md: 24px    (section padding, grid gaps)
--space-lg: 32px    (major section gaps)
--space-xl: 48px    (hero padding, dramatic breaks)
```

Apply consistently:
- Card padding: `--space-md`
- Grid gaps: `--space-md` (not 18px, 10px, 12px, etc.)
- Section top/bottom: `--space-lg`
- Hero section: `--space-xl`

---

## Component Redesign Specs

### Header / Navigation
**Change from:** Pill-styled nav links with heavy branding subtitle  
**Change to:**
- Logo (44×44) + "Medal Minds" (bold, single line, 18px weight-600)
- Nav items: plain text, 14px weight-600, navy
- Hover: underline (sky-blue), no background
- Header height: 64px (tighter)
- Border-bottom: 1px solid border-color (not frosted glass)
- Background: solid white (no gradient, no blur)

---

### Hero Section

**Remove:**
- The entire hero-panel (too dense, too much info)
- Trust pills (redundant with copy)
- All nested preview cards and progress bars

**Keep simple:**
- Left side: Eyebrow (12px, gold) → h1 (36–48px) → subtitle (16px, navy) → 2 buttons
- Right side: REMOVE entirely, or replace with a single static illustration (not a data preview)

**Hero panel replacement:**
If you want visual interest on the right:
- Use a subtle background pattern or gradient (NOT glassmorphism)
- Or show a zoomed-out mockup of the dashboard (single flat image, not interactive)

**Buttons:**
- Primary: navy background, white text, 14px weight-600, 44px min-height, rounded 8px
- Secondary: white background, navy text, 1px navy border, 44px min-height, rounded 8px
- No hover transforms; use opacity + background-color shifts only

---

### Competition Cards

**Current issues:**
- Too much information (icon, title, copy, 2×2 stat grid, button)
- Glassmorphic border clutters the card

**Redesign:**
```
[Icon in navy circle]
Title (h3, 24px)
Description (p, 16px navy)
[stat 1 | stat 2]
[CTA Button]
```

Details:
- Card: white background, 1px border (light gray), 8px border-radius, 1px solid shadow (0 2px 8px rgba(0,0,0,0.08))
- Stat row: flex with gap-md, two spans showing number + label stacked
- Hover: translate up 2px, shadow increase to 0 4px 16px rgba(0,0,0,0.12)

---

### Feature Cards (4-column "Why Medal Minds")

**Current issues:**
- Glassmorphic, overly complex

**Redesign:**
- Icon: navy background (instead of sky-blue tint), 40×40, rounded 8px, white icon
- Title: h3 (20–24px), navy weight-600
- Copy: p (16px), navy
- Card: white, 1px light-gray border, 8px radius, 16px padding
- No "gradient overlay" or gradient-glass effects

---

### Spacing & Layout Issues

**Hero grid:**
- Currently: `grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr)`
- Fix to: `1fr 1fr` (balanced), and hide right column on tablet with `@media (max-width: 1024px) { display: none }`

**Competition grid:**
- Currently: `grid-template-columns: repeat(3, minmax(0, 1fr))`
- Add breakpoints:
  ```css
  @media (min-width: 1200px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 1199px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px) { grid-template-columns: 1fr; }
  ```

**Feature grid:**
- Currently: `grid-template-columns: repeat(4, minmax(0, 1fr))`
- Add breakpoints:
  ```css
  @media (min-width: 1200px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 1199px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px) { grid-template-columns: 1fr; }
  ```

**Container width:**
- Change from `min(1120px, calc(100% - 32px))` to `min(1200px, calc(100% - 48px))` for better desktop use
- Or: `width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px;` (clearer)

---

## Specific CSS Changes

### Remove entirely:
```css
--gradient-glass-light
--gradient-glass-frosted
--glass-backdrop
--glass-backdrop-mobile
--glass-shadow-sm / md / lg
--glass-border-opacity
--brand-soft
--brand-strong
--brand-deep (keep, use for navy text)
--muted (keep as oklch(0.65 0.02 170))
--warn, --bad
```

### Replace with:
```css
--shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.08);
--shadow-md: 0 4px 16px rgba(15, 23, 42, 0.12);
--shadow-lg: 0 8px 24px rgba(15, 23, 42, 0.16);
--border-color: oklch(0.92 0.01 170);
--text-primary: var(--navy);
--text-secondary: oklch(0.65 0.02 170);
--bg-white: oklch(0.99 0.01 92);
--bg-light: oklch(0.97 0.005 170);
```

### Global button styles:
```css
.button {
  background: var(--navy);
  color: white;
  border: 1px solid var(--navy);
  border-radius: 8px;
  padding: 12px 20px;
  min-height: 44px;
  font-weight: 600;
  transition: background 150ms ease, box-shadow 150ms ease;
}

.button:hover {
  background: oklch(0.15 0.05 280);  /* navy slightly darker */
  box-shadow: var(--shadow-md);
}

.button-secondary {
  background: var(--bg-white);
  color: var(--navy);
  border: 1px solid var(--border-color);
}

.button-secondary:hover {
  background: var(--bg-light);
  border-color: var(--navy);
}
```

---

## Responsive Breakpoints (Add to CSS)

```css
/* Mobile first — then enhance */
@media (min-width: 640px) {
  /* Tablet and up */
}

@media (min-width: 1024px) {
  /* Desktop and up */
}

@media (min-width: 1440px) {
  /* Large desktop — adjust container width or add more columns */
}
```

---

## Hero Section Redesign (Detailed)

Current hero is too information-dense. Simplify:

```html
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <span class="eyebrow">High-yield competition prep</span>
      <h1>Stop studying everything. Study what actually gets asked.</h1>
      <p>Medal Minds turns 20,000+ competition questions into focused lessons, high-yield practice, and buzzer drills for Science Bowl, Science Olympiad, and Math competitions.</p>
      <div class="button-group">
        <button class="button">Start Science Bowl Prep</button>
        <button class="button button-secondary">See How It Works</button>
      </div>
    </div>
    <!-- Optional: Right side with simple image or pattern, NOT interactive -->
  </div>
</section>
```

**CSS:**
```css
.hero {
  padding: var(--space-xl) 0;
  background: linear-gradient(135deg, var(--bg-white) 0%, var(--bg-light) 100%);
}

.hero-content {
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.button-group {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-lg) 0;
  }
  
  .button-group {
    flex-direction: column;
  }
}
```

---

## Footer & Other Components

**Footer:**
- Audit alignment (currently not inspected)
- Use same spacing system (`--space-md` gaps, `--space-lg` sections)
- Logo + copyright on left, links on right (desktop) → stacked (mobile)

**Not-found page:**
- Inherits header/footer, center content, simple CTA

---

## Implementation Steps (for Claude)

1. **Update globals.css:**
   - Simplify color vars (remove all glass/gradient vars)
   - Replace type scale (no clamp)
   - Replace spacing (use --space-xs to --space-xl only)
   - Add responsive breakpoints

2. **Update page.tsx (home):**
   - Remove hero-panel entirely, or replace with static content
   - Simplify hero grid (remove right-side info preview)
   - Keep competition cards, feature cards, but simplified

3. **Update Header component:**
   - Remove pill styling from nav links
   - Simplify branding (one line, no subtitle)
   - Solid white background, border-bottom only

4. **Update CompetitionCard component:**
   - Remove stat grid (2×2)
   - Show only: icon + title + description + 2 stats (inline) + button
   - White card, light border, subtle shadow

5. **Update feature card styling:**
   - Remove gradient overlay
   - Navy icon background (not sky-blue tint)
   - Simple white card

6. **Test responsiveness:**
   - Mobile (375px), tablet (768px), desktop (1440px)
   - Verify no horizontal scroll
   - Verify button sizes are 44px+ (touch targets)

---

## Visual Tone

**Old:** Trendy, playful, glassmorphic (feels 2023–outdated)  
**New:** Modern, professional, spacious, readable (timeless 2024+)

Think: educational platform for serious students, not a social app.

---

## Success Criteria

✅ No glassmorphism (or minimal: header only)  
✅ Hero section fits on desktop without scrolling  
✅ Typography scale is consistent (no random sizes)  
✅ Spacing uses 5-point system  
✅ Cards have clear visual hierarchy (title > description > metadata)  
✅ Responsive grid breakpoints work (mobile 1-col, tablet 2-col, desktop 3-4 col)  
✅ All text is navy (not muted gray)  
✅ Gold accent used sparingly (5–10% of accents)  
✅ Button hover states are smooth (no jarring transforms)  
✅ Footer aligns properly on all screen sizes  
✅ No horizontal scroll on any device

