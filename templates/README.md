# Article templates

Each file here is one of the publication's **fixed article templates**. You never
invent a new layout while writing — you pick a template, then fill the body.

`node tools/new.mjs --template <name>` copies `templates/<name>.html`, generates a
correct `<head>` (title, canonical, Open Graph, Twitter, JSON-LD), fills the meta
strip, and adds a draft entry to `data/articles.json`.

## Placeholders the scaffolder fills

| Token | Source |
|-------|--------|
| `{{HEAD}}` | generated from the `articles.json` entry (SEO + JSON-LD) |
| `{{TITLE}}` `{{CATEGORY_LABEL}}` `{{SUBTAG}}` `{{DATE}}` `{{READ}}` `{{LEDE}}` `{{SLUG}}` | the `articles.json` entry |

Everything between `<!-- BODY:BEGIN -->` and `<!-- BODY:END -->` is yours to write.

## Templates in this folder

- `standard.html` — essay / deep-dive / report (the default).
- `recipe-blueprint.html` — recipe with ingredients → method → science → charter notes.

## Adding the rest of your 12

Drop one HTML file per template name (e.g. `ingredient-deep-dive.html`,
`port-call.html`, `the-bridge.html`). Keep the masthead/footer and the
`{{...}}` tokens identical to `standard.html` so `<head>` generation and the
index/sitemap builders keep working. Only the BODY section differs per template.
