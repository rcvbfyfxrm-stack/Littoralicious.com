# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Littoralicious is a free, independent digital publication that exists **to nurture** professional yacht chefs and serious culinary practitioners. No ads, no sponsors, no paywalls. Static HTML/CSS/JS — no build step, no dependencies, no framework. Open `index.html` in a browser and it works.

## Governing Documents

Read these before creating or editing any content:

1. **[`DNA.md`](DNA.md)** — The soul. Three pillars (Grandmother, Scientist, Yacht Chef), eight core principles, the mission. **Every editorial decision answers to the DNA first.**
2. **[`AGENTS.md`](AGENTS.md)** — Operational standards. Voice, content rules, decision framework. Serves the DNA.
3. **[`CONTENT-GUIDE.md`](CONTENT-GUIDE.md)** — Detailed editorial standards, formatting, source tiers.
4. **[`EDITORIAL-WORKFLOW.md`](EDITORIAL-WORKFLOW.md)** — 12 content categories, templates, pipeline.

## Local Development

```bash
npx live-server
```

Content operations via `Makefile`: `make weekly`, `make review`, `make list-review`, `make clean-review`.

## Architecture

**Static site with manual content pipeline.** There is no static site generator.

### Content Flow

1. Markdown source lives in `/content/` (articles organized by category)
2. Content templates in `/content/template/` (flat directory, category-prefixed filenames)
3. Metadata is registered in `/data/articles.json` (slug, title, date, category, tags, read_time, featured)
4. HTML is hand-authored in `/articles/` — there is no automated markdown-to-HTML conversion
5. Category pages (`shore-larder.html`, `the-method.html`, `littoral-heritage.html`, `the-evidence.html`, `the-bridge.html`) hardcode links to articles

### Key Files

- `assets/css/style.css` — Complete design system (colors, typography, layout, dark mode)
- `assets/js/main.js` — Vanilla JS: theme toggle (localStorage), reading progress bar, code copy buttons, external link handling, newsletter form
- `data/articles.json` — Master content index with articles array, dispatches array, categories object, and tags taxonomy
- `index.html` — Homepage with featured articles and weekly picks

### Adding a New Article

1. Write `.md` in `/content/[category]/`
2. Add entry to `data/articles.json`
3. Create HTML page in `/articles/` following existing article HTML structure
4. Add link to the relevant category page

### HTML Conventions

- `.temperature` class for temperature values (renders with °C)
- `.data` class for monospace numerical data
- Articles follow a consistent template: `<article>` with `.article-header`, `.article-meta`, `.article-content`
- Dark mode via `[data-theme="dark"]` attribute on `<html>`, toggled by JS

## Design System (Enforced)

### Colors

```
--color-ink: #0a0a0a        --color-paper: #fafafa
--color-sea: #2d4a5e        --color-salt: #94a3b8
--color-border: #e2e2e2     --color-muted: #6b7280
```

### Typography

- Serif (Georgia) for headlines — authority
- System sans-serif for body — legibility
- Monospace (SF Mono/Consolas) for data
- Scale: Perfect Fourth (1.333 ratio)

### Hard Rules

- No gradients
- No rounded corners on content blocks
- No stock photography
- Images monochrome or muted
- Metric units only (Fahrenheit in parentheses for US readers)

## Editorial Voice

Defined by three pillars (see `DNA.md`): the warmth of a grandmother who wants you to succeed, the precision of a scientist who refuses comfortable lies, and the directness of a chef who has no time for anything that doesn't make the plate better. All three — always — in everything.

Direct, technical, irreverent, economical. No hedging. See `CONTENT-GUIDE.md` for full standards.

### The DNA Test

> If a chef read this at 11 PM, exhausted, mid-charter — would they feel respected, learn something true, and leave with something they can use?

### Banned Words

"delicious," "yummy," "mouthwatering," "elevated," "curated," "artisanal" (as marketing), "superfood," "game-changer," "hack"

### Headline Rules

- Must promise specific value
- No exclamation marks
- No questions as headlines
- No "7 Ways to..." listicle framing

## Deployment

Static hosting via GitHub Pages (see `CNAME` file). Git push to `main` deploys.
