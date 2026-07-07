# Article templates

Each file is one of the publication's **fixed templates**. You never invent a layout —
pick a template, fill the body, ship. `node tools/new.mjs --template <name>` copies the
file, generates the `<head>` (canonical + OG + Twitter + JSON-LD), fills the meta strip,
and adds a draft entry to `data/articles.json` (category + subtag default per template).

## The first law is built in

Every template is **focus-engineered** (see `content/DNA.md` → *Never lose focus*). Each one
ships with: a `summary-box` "What you'll get" promise up top, labelled `divider` section
breaks, a one-line value kicker under each `<h2>`, `note--quote` pull-quotes to re-hook,
`note--key` / `note--science` / `note--action` / `note--warning` callouts where they belong,
inline `term` definitions, and a closing takeaway. Keep these when you write — they are what
stop the reader's eye from drifting. Fill the placeholders; don't strip the structure.

The `<h2>` kicker is the styled `p.kicker` beat (one-line value promise under the heading), and
Tight Ship's station-map table wraps in `.galley-plan` — both locked in `content/DESIGN-LOCK.md`.

## The 14 templates (+ shell helpers)

| `--template` | # | Section | For |
|---|---|---|---|
| `shore-larder` | 01 | Shore Larder | Ingredient deep-dive |
| `shore-larder-deep-dive` | 01b | Shore Larder | Extended deep-dive (identity card + 9 sections) |
| `the-method-technique` | 02 | The Method | Technique brief — Provoke → Instruct → Prove |
| `littoral-heritage-article` | 03 | Littoral Heritage | Culture & history |
| `the-evidence` | 04 | The Evidence | Single-study translation |
| `recipe-blueprint` | 05 | The Method | Full recipe with science (The Blueprint) |
| `signal-fire` | 06 | The Bridge | Sourcing & supply intel |
| `the-horizon` | 07 | The Bridge | Forecast & macro |
| `trade-winds` | 08 | The Bridge | Career & industry / regional shifts |
| `tight-ship` | 09 | The Method | Galley operations |
| `port-call` | 10 | The Bridge | City provisioning guide (Quick Map text table) |
| `the-locker` | 11 | The Method | Equipment review |
| `weekly-brief` | 12 | The Bridge | Digest |
| `the-lab` | 13 | The Method | Experimental / lab notes |

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
