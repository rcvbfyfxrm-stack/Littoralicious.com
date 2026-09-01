# Article templates

Each file is one of the publication's **fixed templates**. You never invent a layout —
pick a template, fill the body, ship. `node tools/new.mjs --template <name>` copies the
file, generates the `<head>` (canonical + OG + Twitter + JSON-LD), fills the meta strip,
and adds a draft entry to `data/articles.json` (category + subtag default per template).

## The first law is built in

Every template is **focus-engineered** (see `content/DNA.md` → *Never lose focus*). Each one
ships with: the `article-toc` sum-up (one-line description per section) after the intro — no promise box since 2026-08-26 — labelled `divider` section
breaks, a one-line value kicker under each `<h2>`, `note--quote` pull-quotes to re-hook,
`note--key` / `note--science` / `note--action` / `note--warning` callouts where they belong,
inline `term` definitions, and a closing takeaway. Keep these when you write — they are what
stop the reader's eye from drifting. Fill the placeholders; don't strip the structure.

The `<h2>` kicker is the styled `p.kicker` beat (one-line value promise under the heading), and
the Galley Operations (tight-ship) station-map table wraps in `.galley-plan` — both locked in `content/DESIGN-LOCK.md`.

## The 14 templates (+ shell helpers)

| `--template` | # | Section | For |
|---|---|---|---|
| `shore-larder` | 01 | Ingredients | Ingredient Profile — one ingredient, fast and warm |
| `shore-larder-deep-dive` | 01b | Ingredients | Ingredient Deep-Dive (identity card + 9 sections) |
| `the-method-technique` | 02 | Techniques & Recipes | Technique brief — Provoke → Instruct → Prove |
| `littoral-heritage-article` | 03 | Heritage | Culture & history |
| `the-evidence` | 04 | Food Science | Study Decoded — single-study translation |
| `recipe-blueprint` | 05 | Techniques & Recipes | Full recipe with science (Recipe Blueprint) |
| `signal-fire` | 06 | Industry & Ports | Supply Alert — sourcing intel, act this week |
| `the-horizon` | 07 | Industry & Ports | Forecast & macro |
| `trade-winds` | 08 | Industry & Ports | Career & industry / regional shifts |
| `tight-ship` | 09 | Techniques & Recipes | Galley operations |
| `port-call` | 10 | Industry & Ports | City provisioning guide by dwell time — hours / days / a week (Quick Map text table) |
| `the-locker` | 11 | Techniques & Recipes | Equipment review |
| `weekly-brief` | 12 | Industry & Ports | Digest |
| `the-lab` | 13 | Techniques & Recipes | Experimental / lab notes |

Shell helpers (not article types): `standard.html` (generic fallback), `section.html`
(builds the section index pages), `og-image.html` (the social-image source).

## Placeholders the scaffolder fills

`{{HEAD}}` (generated SEO head) · `{{TITLE}}` · `{{SUBTAG}}` (shown in the article meta) ·
`{{DATE}}` · `{{READ}}` · `{{LEDE}}` · `{{SLUG}}`. Everything between `BODY:BEGIN` / `BODY:END`
is yours to write. Keep the masthead, footer, head tokens, and design tokens identical across
templates — only the BODY differs.

## Example

```bash
npm run new -- --slug pizza-napoletana --title "Pizza Napoletana: Poolish, 48h Cold Ferment" \
  --template recipe-blueprint --read 11
# category + subtag auto-set from the template; write the body, fill the json, npm run publish
```

## The second pass (2026-08-26/27) — which templates carry which rule

Three rules came out of the Shore Larder review. They are not all universal; each has a domain, and
forcing one outside it makes the piece worse.

| Rule | Where it lives | Where it deliberately does not |
|---|---|---|
| **The taste closes on the hand** — the last line of the taste beat is what the ingredient does when you break, crush or cut it; it never sits in the opening scene | `shore-larder`, `shore-larder-deep-dive` | every template without a taste beat |
| **The options are cards** — a set of named things becomes `pair-cards`, three beats in the body: the profile · best for · a little story told nowhere else. The `pair-card__reg` chip is a verdict, not a category | `shore-larder` (varieties), `shore-larder-deep-dive` (grades), `the-locker` (alternatives) | tables you scan down a column: `port-call` (minutes from berth), `signal-fire`, `the-evidence`, `the-lab`, `the-method-technique`, `tight-ship`. `littoral-heritage-article`'s Tradition Ledger stays a table — those three columns *are* the template's signature. `trade-winds` already owns its `tw-*` racks |
| **The Pairing Wheel line** — one line closing a pairing beat, pointing at the wheel in the Spoon Lab and saying it is simmering, never a date | `shore-larder`, `shore-larder-deep-dive`, `littoral-heritage-article` | every template with no pairing beat |

**The specimen case — the sketch on the glass with the name and the origin folded inside — is template 01's device only.** The deep-dive keeps the sketch set into the column and History as a full section by
design; do not fold it.

**`[data-open-lab]`** — any article can point at a Spoon Lab tool that has no page yet:
`<a href="#some-id" data-open-lab>Pairing Wheel</a>` opens the lab panel. The handler lives in
`assets/js/tools-widget.js`; the `href` is the no-JS fallback, so make it a same-page anchor and the
reader stays where they are. Inline links in article prose carry **no decoration site-wide** — wrap a
link the reader is meant to find in `<strong>`.

## The ingredient standard (locked 2026-08-26)

`shore-larder.html` is **the** ingredient template; `shore-larder-deep-dive.html` is the long form of the
same spine. Both carry the 26 Aug second pass: the taste closes on what the ingredient
does in the hand, the grades/varieties are cards (flavour profile · best for · a little story), and the
pairings close on the Pairing Wheel line. The deep-dive keeps History as a full section — the folded origin
is template 01's device, not its own. The reference build is `articles/bay-leaf.html` — read it before writing a new ingredient piece.

Spine (revised 2026-09-01): **1–3 lines of encounter → the specimen case (`details.fold.fold--specimen`: the
sketch on the glass, the Latin name + a one-line hint as its label; inside, the name and the origin around one
`note--key`) → the taste ("In the mouth"), always visible, closing on what it does in the hand → the sum-up,
outside the case → the old habit, teased, linking to #science → The Science (the four numbers, the
Blind Spot, the chemistry, then **Is it a remedy?**) → The Pairings (cards, four registers, 2–5 ingredients
each, then the Pairing Wheel line) → Galley Intel (the carreaux tiles) → How to Buy (the varieties as cards)
→ the one thing → Sources.**

Standing rules: no promise box · no Cook's Reason box · no Stories section (tales inline or behind the word)
· no Quick Reference · no Galley Batch Prep unless the procedure is genuinely something a pro would not know
· the numbers live with the mechanism, not in the intro · every rare word carries `data-def` · pairings carry
a register chip and never more than five ingredients · the sum-up never sits inside the fold · the varieties
are cards, each with flavour profile, best for and a little story told nowhere else in the piece · if the remedy beat lands on something real, it is
followed by **how to use it that way** (where, how much, how often, the honest limit) · say it once.

Components: `details.fold.fold--specimen` (the specimen case — the glass read-more with the sketch on it; `.specimen` floated stays for 01b), `.article-toc` +
`article-toc__desc` (the sum-up), `.pair-cards` / `.pair-card__reg` (pairings AND varieties), `.tiles` / `.tile` with the inline `--t`
hue, `.term[data-def]` (click-to-define, `data-kind="story"` for a tale). Sketch generator:
`_pencil-art/galley-sketches/sketch.py`.
