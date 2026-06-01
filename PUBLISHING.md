# Publishing a Littoralicious article

> **The whole job, every time:** scaffold → write → `npm run publish`.
> One source of truth (`data/articles.json`), one command. No hand-editing the
> homepage, category pages, sitemap, RSS, or `<head>` tags ever again.

## Publish a new article

```bash
# 1. Scaffold from a template (creates the file + a draft entry in articles.json)
npm run new -- --slug pizza-napoletana --title "Pizza Napoletana: Poolish, 48h Cold Ferment" \
  --category the-method --subtag "Recipe Blueprint" --template recipe-blueprint

# 2. Write the body in articles/pizza-napoletana.html (between BODY:BEGIN / BODY:END)
#    and fill date / subtag / tags / read_time / a one-line lede in data/articles.json.

# 3. Preview locally
npm run preview            # builds, then serves http://localhost:8080

# 4. Go live: in data/articles.json remove  "draft": true,  then:
npm run publish            # build → validate → firebase deploy
```

If `validate` finds a problem (missing file, broken link, duplicate slug, missing
sitemap) it **stops and deploys nothing**, and tells you exactly what to fix.

## What each command does

| Command | Does |
|---------|------|
| `npm run new -- …` | scaffolds `articles/<slug>.html` + adds a draft entry to `articles.json` |
| `npm run build` | regenerates homepage cards, category pages (opt-in), `sitemap.xml`, `feed.xml`, `draft-articles.json` |
| `npm run validate` | fails loudly on drift before you deploy |
| `npm run preview` | build + local server |
| `npm run publish` | build → validate → `firebase deploy` |

## The single source of truth

`data/articles.json` — one entry per article:

```json
{
  "slug": "pizza-napoletana",
  "title": "Pizza Napoletana: Poolish, 48h Cold Ferment",
  "date": "2026-06-01",
  "category": "the-method",
  "subtag": "Recipe Blueprint",
  "tags": ["recipe", "pizza", "fermentation"],
  "read_time": 11,
  "featured": false,
  "draft": true
}
```

- `draft: true` → shows on `/drafts.html` only (blocked from Google), kept off the homepage/sitemap/feed.
- Remove `draft` → it's live: homepage, its category page, sitemap, and RSS all update on the next `npm run build`.
- The article's **lede** comes from its `<meta name="description">` (or an optional `"description"` field) — written once, reused everywhere.

## Generated — never hand-edit

`index.html` card block (between the `HOMEPAGE-ARTICLES` markers), the category
index lists (between `CATEGORY-ARTICLES` markers), `sitemap.xml`, `feed.xml`, and
`data/draft-articles.json`. Edit `articles.json` and the body; let the build do the rest.

## One-time setup notes

- **No `npm install` needed** — the tools are pure Node (≥18), zero dependencies.
- Hosting is **Firebase** (`firebase.json` here). `npm run publish` runs `firebase deploy`.
- To let a category page (e.g. `the-method.html`) auto-list its articles, paste
  `<!-- CATEGORY-ARTICLES:BEGIN --><!-- CATEGORY-ARTICLES:END -->` where the list
  should go; the build fills it. Until then the page is left exactly as written.
