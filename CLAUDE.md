# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Littoralicious is a static HTML/CSS/JS digital publication for professional yacht chefs. No build step, no dependencies, no framework. Open `index.html` in a browser and it works.

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

Direct, technical, irreverent, economical. No hedging. See `CONTENT-GUIDE.md` for full standards.

### Banned Words

"delicious," "yummy," "mouthwatering," "elevated," "curated," "artisanal" (as marketing)

### Headline Rules

- Must promise specific value
- No exclamation marks
- No questions as headlines
- No "7 Ways to..." listicle framing

## Deployment

Static hosting via GitHub Pages (see `CNAME` file). Git push to `main` deploys.
