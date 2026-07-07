# Littoralicious — Editorial DNA

> **Inherits `NEXUS/OS/HOUSE-STANDARD.md` + the cross-vault `OS/ATTENTION-PLAYBOOK.md`** (focus engine + make-every-post-unique distinctiveness engine + pre-publish checklist) — inherited, not re-pasted; localise only the devices. The repo `content/ATTENTION-PLAYBOOK.md` mirrors it for the auto-draft routine.


> The source of truth your writing agents read before drafting. Voice + templates are
> canon (from Arnaud's stated rules); the workflow section reflects the 2026-06 rebuild.

## THE FIRST LAW — never lose focus

**The reader must never lose focus. Not for a sentence.** Whatever they are reading, every
line has one job: pull them to the next. This is the single measure of whether a piece is
good enough to publish — above cleverness, above completeness. If attention can drift, it
isn't finished. *Think of everything you produce this way: if the reader's eye can wander,
you haven't earned the next line yet.*

**How we engineer focus** (every article, built only from the locked components):

- **Open with the payoff.** A `.summary-box` up top — what they'll walk away with, in three
  scannable lines. Nobody reads on for a promise they can't see.
- **One idea per section.** `<h2>` headings that promise value; short paragraphs; bold
  lead-ins. No walls of text — a wall is where focus dies.
- **Re-hook the eye.** Break long stretches with a `.note--quote` pull-quote — one striking line.
- **Land the insight where it's earned.** `.note--key` ("Key Point") at each decision point;
  `.note--science` for the mechanism, exactly where it bites.
- **Make it usable mid-read.** `.note--action` for the move; `.note--warning` for the failure mode.
- **Never stall the reader.** Define jargon inline with `.term` — they never leave the page to look something up.
- **Close on one thing.** End on the single takeaway they keep.

**The focus test:** read it as a tired chef at 11 PM, mid-charter. If your eye drifts even
once — cut, tighten, or add a hook. Ship only when it doesn't.

## Captivating design — the toolkit

Plain prose loses people. **Every article is designed to be read** — boxes, highlights, and
visual beats that hold the eye the whole way down. Reach for these (all locked CSS, no new styling):

**Boxes / callouts** (each auto-labels itself):
- `<div class="summary-box"><strong>What you'll get</strong><ul>…</ul></div>` — the opening promise.
- `<div class="note note--key"><p>…</p></div>` → **Key Point** · `note--science` → **The Science** ·
  `note--action` → **Takeaway** · `note--warning` → **Warning** · `note--quote` → pull-quote.
- **Custom-labeled box** (clever, use it): `<div class="note" data-label="The Number"><p>…</p></div>`
  — any label you invent: `data-label="Myth"`, `"At Sea"`, `"Field Test"`, `"In One Line"`.

**Highlighting (surlignement)** — pull the eye to the words that matter:
- `<mark>key phrase</mark>` or `<span class="highlight">…</span>` — yellow highlight on the
  one phrase per section that must land. `<span class="term">jargon</span>` for inline defs.
  Bold the lead-in of a paragraph so a skimmer still gets the point.

**Visual blocks** (vary them so no two pieces feel identical):
- The dark **Identity Card** (ingredient facts), the green **Science callout** (chemistry list),
  the wheat **Pairing grid**, the **At-a-Glance** stats grid, labelled `<div class="divider">`s.
- A **"one big number"** stat, a **before/after** two-column, a **myth-vs-mechanism** pair.

**Clever patterns:**
- **The scannable spine:** someone reading ONLY the boxes, `<mark>`s, bold lead-ins and `<h2>`s
  should still get the entire argument. Build that skim-path on purpose.
- **One hook per screen:** never more than ~150 words of unbroken prose before a box, highlight,
  pull-quote, or divider re-grabs the eye.
- **Vary the rhythm:** rotate which devices you use piece to piece — predictable = invisible.
- Lead a section with the payoff, not the wind-up. Close on a single takeaway box.

Design serves focus, never decoration. If a box doesn't earn attention, cut it.

## Mission

**To Nurture.** From the Latin *nutrire* — to feed, nourish, and educate. Every recipe,
technique, and piece of science exists to help the reader nourish the people they feed —
and themselves. *One purpose: Nurture. For those who feed others with intention.*

## The three pillars (all three, always, in every piece)

1. **Grandmother** — warmth, tradition, generosity. The reason to cook at all.
2. **Scientist** — precision, sourcing, follow-the-money. Every claim traceable.
3. **Yacht Chef** — directness, practicality at sea, perfection as discipline.

A piece that is only science is cold; only warmth is soft; only practical is thin. Hold all three.

## The DNA test (apply to every draft)

> *"If a chef read this at 11 PM, exhausted, mid-charter — would they feel respected,
> learn something true, and leave with something they can use?"*

If no, it isn't ready.

## Audience

Working **yacht / superyacht chefs** first — cooking in a moving 4 m² galley, on charter,
for demanding guests, under real constraints (space, swell, provisioning, holding temp).
Then serious cooks who want the *why*. Write to a competent professional; never down to a beginner.

## Voice & tone

- **Science is in the method, not in a sidebar you'll skip.** Explain the mechanism inline,
  at the moment it matters — the compound, the temperature, the reaction.
- **Direct.** "Do this," not "you might consider." Specific: numbers, °C, times.
- **Honest about uncertainty.** "Worked 14 of 16 trials," not false certainty.
- **Sourced, not asserted.** The blueprint signature: *"Three modifications. Five sources. One [dish]."*
- **Tested at sea.** Practicality is the proof; sign-off *"Tested at sea."*
- **Warm underneath the rigour.** Nurture, not flex.
- No padding, no hype, **no emoji anywhere** — not in body, not in template chrome, not in box labels. Emoji read as AI and break the human-publication voice. Lean on the locked CSS components for visual beats instead. (Functional UI glyphs in a separate tool — ★/✓/⚠ in Port Call, crew-catalog — are tolerated; decorative emoji are not.) Respect the reader's competence.
- **Spelling:** house style leans British for cooking terms (flavour, colour, caramelise).

### Source rule

Every claim traceable: peer-reviewed journals, named books, documented experience. No
"they say." No "studies show" without naming the study. Funding/conflicts disclosed.
**The evidence bar:** every science claim rests on a **primary peer-reviewed source** with a
visible **Evidence Grade** in a `citation-card` (dual grade — absorption · clinical — where
relevant); reference books (McGee, Modernist) may support but never stand alone.

### Banned words

delicious · yummy · mouthwatering · elevated · curated · artisanal (as marketing) ·
superfood · game-changer · hack.

### Headline rules

Promise specific value. No exclamation marks. No questions. No "7 Ways to…" listicle framing.

## Brand lexicon (verbatim — locked)

Wordmark **LITTORALICIOUS** (all-caps). Taglines: *Modern Science · Regional Recipes ·
From the Sea* · *Sailing Around The Plate* · *Littoraly Delicious* · *One purpose: Nurture.*
· *For those who feed others with intention.* Footer: *© Littoralicious. No rights reserved.
Information wants to be free.* Mark: a single **flame** in a ring (fire/air/water/earth) — minimal, monochrome.

## The five sections

| Section | For |
|---|---|
| **Shore Larder** | Ingredient deep-dives — science, sourcing, history of one ingredient. |
| **The Method** | Techniques, recipe blueprints, galley-efficiency, equipment, galley tech/AI. |
| **Littoral Heritage** | Coastal traditions, the culture and stories behind the dishes. |
| **The Evidence** | Food science proper — compounds, mechanisms, research. |
| **The Bridge** | Essays, forecasts, supply intel, manifesto — cooking at sea meets the wider world. |

## The 14 templates (12 named formats + the Deep-Dive variant + the standard fallback) — pick one, never invent

Every piece must fit one existing template. If it doesn't fit, narrow scope or split — do
not create a new format. **Auto-select the template** — infer it from what the article is
(ingredient → Shore Larder, recipe → The Blueprint, technique → The Method, study → The
Evidence, city → Port Call, gear → The Locker, career → Trade Winds, galley ops → Tight
Ship, sourcing → Signal Fire, culture → Littoral Heritage, forecast → The Horizon, digest →
Weekly Brief, experiment → The Lab). **Never ask which template** — pick it, state the fit in
one line (e.g. *"Template fit: The Method (02)"*), and proceed.

| # | Template | Section | Length | Use for |
|---|---|---|---|---|
| 01 | Shore Larder | Larder | 12–18 min | Ingredient deep-dive |
| 01b | Shore Larder Deep-Dive | Larder | 14–22 min | MAX ingredient profile: 8-cell Identity Card (Species, Origin, Season, Flavour Profile, Key Compounds, Quality Tell, Conservation, Best For) → History (origin + how it developed in the culture) → Science → **Four Ways to Use It** (Traditional / Modern / Frontier / Poetic) → Pairing → Flavour-Compounding (shared-molecule bridges, no row cap) → Quality good-vs-bad → Conservation (if peculiar) → Galley Intel → Stories → Quick Reference. Several examples only where notable. |
| 02 | The Method | Method | 8–15 min | Technique brief — Provoke → Instruct → Prove |
| 03 | Littoral Heritage | Heritage | 10–20 min | Culture & history |
| 04 | The Evidence | Evidence | 1–2 min | Single-study translation |
| 05 | The Blueprint | Method | 8–15 min | Full recipe with science |
| 06 | Signal Fire | Bridge | 4–8 min | Sourcing & supply intel |
| 07 | The Horizon | Bridge | 5–10 min | Forecast & macro |
| 08 | Trade Winds | Bridge | 4–8 min | Regional shifts / career & industry |
| 09 | Tight Ship | Method | 6–12 min | Galley operations |
| 10 | Port Call | Bridge | 10–20 min | City provisioning guide (Quick Map text table — never a graphic map) |
| 11 | The Locker | Method | 4–10 min | Equipment review |
| 12 | Weekly Brief | Bridge | 3–5 min | Digest |
| 13 | The Lab | Method | varies | Experimental / lab notes |

**Length:** prefer the ruthless 8–12 minute cut. Formats listed longer (Deep-Dive, Heritage,
Port Call) must open with the two-minute-version block so depth is opt-in.

**Warmth is mandatory in food-facing templates** (Shore Larder, Deep-Dive, Heritage,
Blueprint, Evidence, Method): every piece carries at least one tradition/people beat — the
Grandmother pillar must be visible, not implied.

Social posts have their own canon: `content/SOCIAL-POSTS.md` (max 3 posts per article, every
post teaches — substance before volume).

Manifesto / framework pieces use **The Bridge** category with a Method or Signal Fire
structure — there is no free-form essay format.

## Design identity (the lock)

Refined light **journal**. Tokens: paper `#fafafa`, ink `#0a0a0a`, sea `#2d4a5e`, salt
`#94a3b8`; Georgia serif headlines, system sans body, SF Mono for data; Perfect-Fourth
scale (1.333). No gradients, no rounded corners on content blocks, no stock photography,
monochrome images. Metric units (Fahrenheit in parens). The sealed CSS is
`assets/css/style.css` — match the latest file, never improvise the look.
Motion serves focus, never decoration — the only sanctioned animation is the
technical-pencil draw-on figure (see DESIGN-LOCK Motion).

## Off-brand / forbidden

- **No Terroir-style maps, no gazette hub-grids, no dark-terminal styling.** (Those are
  other NEXUS publications.)
- **Editorial firewall:** does NOT pull from TheWorldAffair except via its *gastronomie*
  domain; Littoralicious content never enters a TWA edition.
- **Sextant (`/game/`) is not part of the publication** — it only rides the host.
- **Never use real names from WhatsApp/private chats** — anonymise ("one chef," "a crew member").
