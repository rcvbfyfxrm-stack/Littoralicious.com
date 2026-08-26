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

## The ingredient standard (locked 2026-08-26)

`shore-larder.html` is **the** ingredient template; `shore-larder-deep-dive.html` is the long form of the
same spine. The reference build is `articles/bay-leaf.html` — read it before writing a new ingredient piece.

Spine: **1–3 lines of encounter → the specimen sketch, set into the column → the name → the taste ("In the
mouth"), closing on what it does in the hand → the origin, folded, as a card directly under the taste → the
old habit, teased, linking to #science → the sum-up, outside the fold → The Science (the four numbers, the
Blind Spot, the chemistry, then **Is it a remedy?**) → The Pairings (cards, four registers, 2–5 ingredients
each, then the Pairing Wheel line) → Galley Intel (the carreaux tiles) → How to Buy (the varieties as cards)
→ the one thing → Sources.**

Standing rules: no promise box · no Cook's Reason box · no Stories section (tales inline or behind the word)
· no Quick Reference · no Galley Batch Prep unless the procedure is genuinely something a pro would not know
· the numbers live with the mechanism, not in the intro · every rare word carries `data-def` · pairings carry
a register chip and never more than five ingredients · the sum-up never sits inside the fold · the varieties
are cards, each with flavour profile, best for and a little story told nowhere else in the piece · if the remedy beat lands on something real, it is
followed by **how to use it that way** (where, how much, how often, the honest limit) · say it once.

Components: `.specimen` (the sketch, floated), `details.fold` (the glass read-more), `.article-toc` +
`article-toc__desc` (the sum-up), `.pair-cards` / `.pair-card__reg` (pairings AND varieties), `.tiles` / `.tile` with the inline `--t`
hue, `.term[data-def]` (click-to-define, `data-kind="story"` for a tale). Sketch generator:
`_pencil-art/galley-sketches/sketch.py`.
