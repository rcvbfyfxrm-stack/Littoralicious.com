# Littoralicious Editorial Workflow

How content goes from idea to published article. Read this before writing anything.

**This document serves [`DNA.md`](DNA.md).** The DNA defines the mission (To Nurture), the three pillars (Grandmother, Scientist, Yacht Chef), and the eight core principles. Every template, every draft, every editorial decision below must pass the DNA test:

> If a chef read this at 11 PM, exhausted, mid-charter — would they feel respected, learn something true, and leave with something they can use?

---

## The Content Pipeline

```
TEMPLATE  ─>  DRAFT  ─>  REVIEW  ─>  PUBLISH
```

| Stage | Location | What Happens |
|-------|----------|--------------|
| **Template** | `content/template/` | 12 category templates define structure, voice, quality gates |
| **Draft** | `content/[category]/` | Write markdown following the template for that category |
| **Review** | `content/review/` | Articles land here for editorial review before publication |
| **Publish** | `articles/` + `data/articles.json` | Hand-author HTML, register metadata, push to main |

There is no static site generator. No markdown-to-HTML conversion. HTML is hand-authored.

---

## The 12 Content Categories

### Editorial (01-05)

| # | Category | Focus | Word Count |
|---|----------|-------|------------|
| 01 | **Shore Larder** | Ingredients: story, tradition, compounds, pairings, surprise science, common mistakes, sourcing, on-board | 700-900 |
| 02 | **The Method** | Techniques with science. One move, precise steps, measurable outcomes | No limit (concise) |
| 03 | **Littoral Heritage** | Coastal dishes — verified origin stories, traditional methods, yacht adaptation | No limit (concise) |
| 04 | **The Evidence** | Peer-reviewed research translated to galley practice. Only indexed journals. | 200-300 |
| 05 | **The Blueprint** | Full science-backed recipes with elevation tiers, troubleshooting, quick reference | 8-15 min read |

### Intelligence (06-08)

| # | Category | Focus | Word Count |
|---|----------|-------|------------|
| 06 | **Signal Fire** | One chef, one idea. Not a profile — a transferable principle to steal. | 500-800 |
| 07 | **The Horizon** | World chef news. Verified achievements, events, policy changes. | 200-400 |
| 08 | **Trade Winds** | Yacht industry intel. Regulations, certifications, hiring, market shifts. | 250-500 |

### Operations (09-11)

| # | Category | Focus | Word Count |
|---|----------|-------|------------|
| 09 | **Tight Ship** | Efficiency protocols. Problem, steps, proof, limitations. Quantified. | 150-250 |
| 10 | **Port Call** | Port provisioning guides. Suppliers, schedules, prices, local gems. | 3,000-5,000 |
| 11 | **The Locker** | Cuisine pantry deep-dives. Brands, tiers, sourcing matrix, starter kits. | 2,500-4,000 |

### Output (12)

| # | Category | Focus | Word Count |
|---|----------|-------|------------|
| 12 | **Weekly Brief** | Digest connecting Shore Larder, Method, Evidence, Heritage, Horizon, Trade Winds. One thread. | 1,500-2,500 |

---

## Weekly Brief Workflow

The Weekly Brief is the primary recurring output. Run it with `make weekly`.

### Steps

1. **`make weekly`** — Creates review folder, prints instructions
2. **Run the agent** — `claude 'Follow agents/Agent - Weekly Brief.md to generate this week's brief.'`
3. **Agent researches** — Finds seasonal ingredient, connects technique + science + heritage + news
4. **Agent writes** — Individual articles saved to `content/review/` + combined digest
5. **Review** — `make review` or `make list-review` to inspect output
6. **Edit** — Manual review and edit of each article
7. **Publish** — Convert to HTML, update `articles.json`, push to main

### Agent Files

| File | Purpose |
|------|---------|
| `agents/Agent - Weekly Brief.md` | Weekly brief generation instructions |
| `agents/Agent - Article.md` | Standalone article generation instructions |
| `BADGES.md` | Badge taxonomy for content tagging |
| `CONTENT-GUIDE.md` | Full editorial standards |

---

## Makefile Commands

```bash
make weekly        # Generate weekly brief (sets up review folder, prints agent command)
make review        # List articles pending review in content/review/
make list-review   # List review articles with their thesaurus badges
make clean-review  # Remove all review articles (destructive — no undo)
make help          # Show available targets
```

---

## Voice and Style Rules

### The Three Pillars (from DNA.md)

Every piece of content carries all three simultaneously:

- **Grandmother** — Warmth, tradition as living wisdom, generosity, nurture. *Would this make someone feel nourished and more capable?*
- **Scientist** — Evidence, precision, follow the money, honesty about uncertainty. *Is every claim sourced? Is the funding disclosed?*
- **Yacht Chef** — Directness, practical above all, irreverence earned through mastery. *Could someone execute this tomorrow?*

When one pillar dominates: too much grandmother = sentimental; too much scientist = clinical; too much chef = aggressive. All three. Always.

### Tone

Direct, technical, irreverent, economical. No hedging. Assume the reader is a professional chef on a yacht, mid-charter, at 11pm. Every sentence earns its place.

- "This works" not "you might consider trying"
- Specific: 165°C not "high heat"
- Confident but not arrogant
- Dry humor when natural, never forced
- Common mistakes: make the reader see themselves, not feel lectured

### Banned Words

"delicious," "yummy," "mouthwatering," "elevated," "curated," "artisanal" (as marketing), "game-changer," "hack your cooking," "superfood," "perhaps," "you might consider"

### Headline Rules

- Must promise specific value
- No exclamation marks
- No questions as headlines
- No listicle framing ("7 Ways to...")

### Numbers

- Always specific with context: "47 minutes (+/-3 for thickness)"
- Tables for comparisons, always
- Metric first. Imperial in parentheses only for US audience.
- Temperatures in Celsius (Fahrenheit in parentheses)

### Sources

DNA Principle 4 — Source Everything. DNA Principle 3 — Follow the Money.

- Tier 1: Peer-reviewed papers, McGee, Myhrvold, López-Alt
- Tier 2: Named chefs with verifiable experience
- Rejected: Blog posts, unsourced claims, "common knowledge"
- **Always check funding disclosure on cited studies. Flag industry-funded research explicitly.**

---

## Design Rules (Hard)

- No gradients
- No rounded corners on content blocks
- No stock photography
- Images monochrome or muted
- Metric units only (Fahrenheit in parentheses for US readers)
- `.temperature` class for temperature values (renders with C)
- `.data` class for monospace numerical data

---

## Publication Format

### articles.json Entry

```json
{
  "slug": "article-slug",
  "title": "Article Title",
  "date": "YYYY-MM-DD",
  "category": "the-evidence",
  "tags": ["tag-1", "tag-2"],
  "read_time": 15,
  "featured": true
}
```

Add to the `articles` array in `data/articles.json`. Update `tags` array if introducing new tags.

### HTML Article Structure

Articles live in `/articles/[slug].html` and follow this structure:

```html
<article>
  <div class="article-header">...</div>
  <div class="article-meta">...</div>
  <div class="article-content">...</div>
</article>
```

Dark mode supported via `[data-theme="dark"]` on `<html>`.

### Category Pages

Category pages (`shore-larder.html`, `the-method.html`, `littoral-heritage.html`, `the-evidence.html`, `the-bridge.html`) hardcode article links. Update the relevant page when adding a new article.

### Deployment

Static hosting via GitHub Pages. CNAME file configured. `git push` to `main` deploys.

---

## Review Article Frontmatter

Articles in `content/review/` use this frontmatter:

```yaml
---
title: "Article Title"
date: YYYY-MM-DD
category: shore-larder
tags: [tag-1, tag-2]
read_time: 2
template: 01
status: review
badges:
  season: winter
  region: mediterranean
  type: seafood
  thesaurus: bottarga
---
```

### File Naming Convention

```
content/review/YYYY-MM-DD-category-slug-[topic].md
```

Examples:
```
content/review/2026-02-08-shore-larder-saffron.md
content/review/2026-02-08-the-method-reverse-basting.md
content/review/2026-02-08-the-evidence-olive-oil-stability.md
content/review/2026-02-08-weekly-brief.md
```

---

## Pre-Publish Checklist

### Accuracy
- [ ] All facts cross-referenced with second source
- [ ] All temperatures verified
- [ ] All historical claims checked (not just repeated)
- [ ] All scientific claims linked to research

### Usefulness
- [ ] Answers "so what?" within the first 50 words
- [ ] Includes specific, actionable information
- [ ] Works in yacht context (space, motion, timing, limited equipment)

### Engagement
- [ ] Opening line earns the second line
- [ ] At least one moment of surprise per section
- [ ] Last line is as good as the first (Peak-End Rule)

### Authenticity
- [ ] Sounds like a chef talking to a chef
- [ ] Zero marketing language
- [ ] Honest about limitations, failures, and what doesn't work

### DNA Compliance
- [ ] All three pillars present (Grandmother: nurtures? Scientist: sourced? Chef: practical?)
- [ ] Funding/conflicts checked on all cited research
- [ ] Common mistakes (where applicable) — reader recognizes themselves, not lectured
- [ ] Passes the DNA test: respected, true, useful
