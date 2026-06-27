# Littoralicious — DESIGN LOCK (component contracts)

> **LOCKED 2026-06-25.** The sealed design system lives in `assets/css/style.css`. These are the canonical
> components and their **exact markup** — verbatim from the live stylesheet (littoralicious.com). **Use these
> classes; never hand-roll an inline card or invent CSS.** Pairs with `DNA.md` → *Captivating design*. To use:
> build the BODY only from the blocks below; head/masthead/footer are generated at publish.

## Tokens (do not change)
- Paper `#fafafa` · ink `#0a0a0a` · sea `#2d4a5e` · salt `#94a3b8`. Identity-card navy `#1a2a3a` + gold `#c4a35a`.
- Georgia serif headlines · system sans body · SF Mono (`--font-mono`) for data/labels. Perfect-Fourth scale (1.333).
- No gradients, no rounded corners on content blocks, no stock photography, monochrome images. Metric units (°F in parens).

---

## The locked component library

### Opening promise — `summary-box`
```html
<div class="summary-box"><strong>What you'll get</strong><ul><li>…</li></ul></div>
```

### Callout notes — `note` + modifier (each auto-labels via ::before)
- `note--key` → **Key Point** · `note--science` → **The Science** · `note--action` → **Takeaway** ·
  `note--warning` → **Warning** · `note--quote` → pull-quote (no label).
```html
<div class="note note--science"><p>…the mechanism, where it bites…</p></div>
<div class="note note--quote"><p>One striking line.</p></div>
```
- **Custom-labelled box** (invent the label): `<div class="note" data-label="The Number"><p>…</p></div>`

### Inline emphasis
- `<mark>key phrase</mark>` · `<span class="highlight">…</span>` · `<span class="term">jargon</span>` (inline def) ·
  `<span class="highlight highlight--term">…</span>`.

### At-a-Glance stat grid — `glance` (light, mid-piece, scannable numbers)
```html
<div class="glance">
  <div class="glance__cell"><span class="glance__num">8</span><span class="glance__label">Pairings</span></div>
  <!-- repeat cells; mono numerals in sea-blue, auto-fit grid -->
</div>
```

### Identity Card — `id-card` (dark navy/gold vitals; `--origin` = tradition variant)
```html
<div class="id-card id-card--origin">
  <h3 class="id-card__title">The Keystone Pairing</h3>
  <div class="id-card__grid">
    <div><span class="id-card__label">The compound</span><span class="id-card__value">Curcumin</span></div>
    <!-- repeat label/value pairs -->
  </div>
</div>
```
*Use for: Shore Larder ingredient vitals, Port Call vitals, a hero fact-block. `--origin` labels lean Born / Of necessity / The constraint / First cooked by / Now defended by.*

### Labelled section rail — `divider`
```html
<div class="divider"><span class="divider__text">The anti-pairings</span></div>
```

### Citation card — `citation-card` (sourced claim, with grade chip)
```html
<div class="citation-card">
  <span class="citation-card__eyebrow">The foundational paper</span>
  Author A, Author B. "Title." <span class="citation-card__journal">Journal</span>, Year.
  <span class="citation-card__doi">doi:…</span>
  <span class="citation-card__grade">Grade A · absorption</span>
</div>
```

### Register Ladder — `register-ladder` (Shore Larder Deep-Dive four-stop rail)
```html
<div class="register-ladder">
  <div class="register-ladder__stop register-ladder__stop--trad">Traditional<span>…</span></div>
  <div class="register-ladder__stop register-ladder__stop--modern">Modern<span>…</span></div>
  <div class="register-ladder__stop register-ladder__stop--frontier">Frontier<span>…</span></div>
  <div class="register-ladder__stop register-ladder__stop--poetic">Poetic<span>…</span></div>
</div>
```

### Heritage Timeline — `heritage-timeline` (slim dated lineage ribbon)
```html
<div class="heritage-timeline">
  <div class="heritage-timeline__stop"><span class="heritage-timeline__date">1789</span><span class="heritage-timeline__label">…</span></div>
  <!-- repeat stops; horizontal grid -->
</div>
```

### Cook-This-Port — `cook-this-port` (Port Call action grid)
```html
<div class="cook-this-port">
  <div><span class="cook-this-port__label">Buy</span> …</div>
  <!-- repeat cells -->
</div>
```

### Data table — `data-table`
```html
<table class="data-table"><thead>…</thead><tbody>…</tbody></table>
```

### Forecast scorecard — `forecast-scorecard` (The Horizon; `__grid __label __num __falsify`) — Bridge forecasts only.

---

## Rules of use (the lock)
1. **Never hand-roll a card or invent a class.** If a block doesn't exist above, use the closest locked one or a
   plain `<p>` — do not improvise inline styles. (The 2026-06-19 founder ruling: use the locked depth-block classes,
   never hand-roll.)
2. **One idea per block; SIGNAL only.** No stacked boxes; short stays short. Build the scannable spine (boxes +
   bold lead-ins + h2s alone tell the whole story); ≤~150 words of prose before a visual beat re-grabs the eye.
3. **Vary the devices piece to piece** — predictable = invisible. Rotate which blocks you use.
4. **Evidence:** primary peer-reviewed source + visible grade in a `citation-card`; never reference books alone.
   Dual grade where it applies (absorption · clinical).
5. **Match the latest `style.css`** — if a class here ever changes live, the live stylesheet wins; re-capture and
   update this file. Don't fork the look.
6. Banned words (DNA): delicious · elevated · curated · artisanal · superfood · game-changer · hack. No emoji
   (functional ★/✓/⚠ glyphs tolerated).
7. **Never use a bright box fill.** Use the theme-aware locked classes (`note--*`, `summary-box`) — they auto-dim
   in dark mode and stay faint in light. If you must use an inline `style="background: #…"`, only the colour CUE
   matters; the stylesheet now lays a paper veil over every light inline fill (`#a..`–`#f..`) in light mode and
   retints it to a dark panel in dark mode, so it can never glare on a phone. Don't fight this with inline
   `!important`, and don't add hex-by-hex overrides to the CSS — the rule is structural and covers all colours.

*Reference draft using the full set: `_drafts/draft-the-pairing-does-the-healing.html`.*

---

## Anti-drift — keep this file true (re-verify)
> This is a **snapshot** of a stylesheet that keeps shipping. It is only trustworthy if re-synced. **Last
> verified against the live `style.css` on 2026-06-25** (live file ≈71.6 KB). If you've edited the design
> system, or it's been a while, re-verify before trusting the markup above:

```bash
# 1. pull the live stylesheet
curl -fsSL https://www.littoralicious.com/assets/css/style.css -o /tmp/litt-live.css

# 2. list every locked component class still present (should match this doc)
grep -oE '\.(summary-box|note|glance|id-card|citation-card|divider|register-ladder|heritage-timeline|cook-this-port|data-table|term|highlight)[a-z0-9_-]*(__[a-z-]+)?(--[a-z-]+)?' /tmp/litt-live.css | sort -u

# 3. confirm the auto-labels haven't changed
grep -A1 -E '\.note--(key|science|action|warning)::before' /tmp/litt-live.css | grep content:
```
If a class was renamed/removed or a label changed, **the live stylesheet wins** — update this file and bump
the "Last verified" date. If a *new* block appears in the CSS, add its markup here. Never let a draft use a
class this file can't confirm exists live.
