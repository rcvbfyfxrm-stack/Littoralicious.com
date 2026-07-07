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

### Galley plan — `galley-plan` (NEW — the Tight Ship signature: station-map wrapper around a `data-table`)
```html
<div class="galley-plan">
  <table class="data-table"><thead>…</thead><tbody><!-- stations / zones / roles --></tbody></table>
</div>
```
*Tight Ship only — the protocol laid out as parallel stations. Never wrap a non-operational table in it.*

### Section kicker — `p.kicker` (NEW — one-line value promise under an `<h2>`)
```html
<h2>The System</h2>
<p class="kicker">One-line value promise under the h2 — what this section buys the reader.</p>
```

### Science box — `science-box` (labelled evidence panel; alternative vessel to `note--science`)
```html
<div class="science-box">
  <div class="science-box__label">Evidence</div>
  <div class="science-box__title">The mechanism, named</div>
  <div class="science-box__content"><p>Two or three sentences, cause → effect.</p></div>
</div>
```

### Article TOC — `article-toc` (in-page contents, anchor links)
```html
<div class="article-toc">
  <p class="article-toc__title">In This Article</p>
  <ul><li><a href="#job">The Job It Has to Do</a></li><!-- repeat --></ul>
</div>
```

### Article sources — `article-sources` (closing source strip)
```html
<div class="article-sources">
  <p><strong>Sources</strong></p>
  <p>Named source 1 | Named source 2 | Named source 3</p>
</div>
```

### Signal Board — `signal-board` (Signal Fire signature: present-tense number / direction / window, pinned under the lede)
```html
<div class="signal-board">
  <span class="board-eyebrow">Signal</span>
  <div class="signal-board__grid">
    <div><span class="signal-board__num">00%</span><span class="signal-board__label">the number that moved</span></div>
    <div><span class="signal-board__num">Rising</span><span class="signal-board__label">direction (rising / falling / holding)</span></div>
    <div><span class="signal-board__num">0&ndash;0 wks</span><span class="signal-board__label">window to act</span></div>
  </div>
</div>
```
*Three cells, no fourth — that is the silhouette. Pairs with the evidence ledger:*
```html
<ol class="signal-ledger">
  <li>What is moving, the figure, the named source. <span class="signal-ledger__points">&rarr; points to: how it nudges the call.</span></li>
</ol>
```

### Forecast scorecard — `forecast-scorecard` (The Horizon signature: future-tense call + falsify line; Bridge forecasts only)
```html
<div class="forecast-scorecard">
  <span class="board-eyebrow">Forecast</span>
  <div class="forecast-scorecard__grid">
    <div><span class="forecast-scorecard__num">The call</span><span class="forecast-scorecard__label">direction + magnitude, one line</span></div>
    <div><span class="forecast-scorecard__num">20XX</span><span class="forecast-scorecard__label">horizon date</span></div>
    <div><span class="forecast-scorecard__num">Watching</span><span class="forecast-scorecard__label">confidence (likely / watching / firm)</span></div>
  </div>
  <p class="forecast-scorecard__falsify"><strong>Falsifies if:</strong> the one observable that kills this call.</p>
</div>
```

### Trade Winds rack — `tw-case-grid` / `tw-hub-grid` / `tw-band-ladder` (Trade Winds only; per-card accent = inline `--tw-accent` var, the one lock-safe inline)
```html
<div class="tw-case-grid">
  <div class="tw-case-grid__card" style="--tw-accent:#1a1a1a;"><strong>Case A</strong><p>…the test, the catch, what crew must do…</p></div>
</div>
<div class="tw-hub-grid">
  <div class="tw-hub-grid__hub" style="--tw-accent:var(--color-sea);"><strong>Hub One</strong><p>…named centres, known for, season…</p></div>
</div>
<div class="tw-band-ladder">
  <div class="tw-band-ladder__row"><div class="tw-band-ladder__amount"><span>Band</span><strong>$X&ndash;XK</strong></div><div class="tw-band-ladder__note">…what this band demands…</div></div>
  <div class="tw-band-ladder__row tw-band-ladder__row--top"><div class="tw-band-ladder__amount"><span>Top</span><strong>$X&ndash;XK+</strong></div><div class="tw-band-ladder__note">…the ceiling…</div></div>
</div>
```

### Recipe engine — `rcp-*` (The Blueprint's interactive recipe kit — one contract, copy from `templates/recipe-blueprint.html`)
The full class family: `rcp-story(__kicker)` origin beat · `rcp-stats` `<dl>` strip · `rcp-card(__btn)` PDF links (Metric + cups / lb-oz + cups) ·
`rcp-ratio(__body)` baker's-% `<details>` · `rcp-scaler` (`data-base-yield`/`data-yield-unit`) · `rcp-group` + `rcp-ings`/`rcp-ing(__q/__n/__note)`
checkbox list (`data-qty`/`data-unit`) · `rcp-progress` + `rcp-steps`/`rcp-step(__check/__body)` · `rcp-why(__body)` cited `<details>` ·
`rcp-fold(__body)` bottom folds · `rcp-meta` reset row. **Contract:** never re-order `.rcp-ing`/`.rcp-step` after publish (ticks persist by DOM
index); `rcp-why`/`rcp-ratio`/`rcp-fold` are native `<details>` — no JS; copy the markup from the template, never re-derive it.

### Port Call set — `assets/css/port-call-content.css` (Port Call template only)
Port Call's components live in their own stylesheet, not `style.css`: `pc-quicknav` (anchor nav) · `pc-funfact` (hard-fact bar) ·
`pc-quickmap` (the text-table map — never a graphic) · `pc-kicker` (section kicker) · `pc-pullq` (flat pull-quote) ·
`three-berths` + `tb-col` (berth trio) · `pfold` / `sfold` (supplier/section `<details>` folds, `pfold__name/__hook/__chev/__body`) ·
`cau cau--high/--med` caution pills (`data-fix` carries the workaround). Copy exact markup from `templates/port-call.html`;
the same never-hand-roll rule applies.

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
6. Banned words (DNA): delicious · yummy · mouthwatering · elevated · curated · artisanal (as marketing) ·
   superfood · game-changer · hack. No emoji (functional ★/✓/⚠ glyphs tolerated).
7. **Never use a bright box fill.** Use the theme-aware locked classes (`note--*`, `summary-box`) — they auto-dim
   in dark mode and stay faint in light. If you must use an inline `style="background: #…"`, only the colour CUE
   matters; the stylesheet now lays a paper veil over every light inline fill (`#a..`–`#f..`) in light mode and
   retints it to a dark panel in dark mode, so it can never glare on a phone. Don't fight this with inline
   `!important`, and don't add hex-by-hex overrides to the CSS — the rule is structural and covers all colours.

*Reference draft using the full set: `_drafts/draft-the-pairing-does-the-healing.html`.*

---

## Motion lock

Motion is **opt-in and single-purpose**. The whole grammar:

- A technical drawing may **draw itself ONCE** (≤2.5 s, ease-out) when it enters the viewport, then rest.
- **Interactive figures may re-render on scrub** — motion in direct response to the reader's hand, nothing else.
- Everything **pauses off-screen** (IntersectionObserver) and **collapses to the final frame** under
  `prefers-reduced-motion`.
- **No loops, no parallax, no autoplay video.**
- Pencil figures: ink `#131312` on paper `#F6F5F1`.
- The shared helper is `assets/js/litto-sketch.js` — use it; don't re-implement the draw-on.

---

## Anti-drift — keep this file true (re-verify)
> This is a **snapshot** of a stylesheet that keeps shipping. It is only trustworthy if re-synced. **Last
> verified against the live `style.css` on 2026-07-03.** If you've edited the design
> system, or it's been a while, re-verify before trusting the markup above:

```bash
# 1. pull the live stylesheet
curl -fsSL https://www.littoralicious.com/assets/css/style.css -o /tmp/litt-live.css

# 2. list every locked component class still present (should match this doc)
grep -oE '\.(summary-box|note|glance|id-card|citation-card|divider|register-ladder|heritage-timeline|cook-this-port|data-table|term|highlight|kicker|galley-plan|science-box|article-toc|article-sources|signal-board|signal-ledger|forecast-scorecard|tw-case-grid|tw-hub-grid|tw-band-ladder|rcp-[a-z]+)[a-z0-9_-]*(__[a-z-]+)?(--[a-z-]+)?' /tmp/litt-live.css | sort -u
# (Port Call classes live in assets/css/port-call-content.css — check that file, not style.css)

# 3. confirm the auto-labels haven't changed
grep -A1 -E '\.note--(key|science|action|warning)::before' /tmp/litt-live.css | grep content:
```
If a class was renamed/removed or a label changed, **the live stylesheet wins** — update this file and bump
the "Last verified" date. If a *new* block appears in the CSS, add its markup here. Never let a draft use a
class this file can't confirm exists live.
