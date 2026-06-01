# CLAUDE.md — Littoralicious

Operating guide for Claude Code in this repo. Littoralicious is a static, Firebase-hosted
yacht-chef food-science **publication** (https://www.littoralicious.com). Read this and
`content/DNA.md` before writing or changing anything.

## Before you start

1. Read **`content/DNA.md`** — mission (Nurture), the three pillars (Grandmother /
   Scientist / Yacht Chef), the DNA test, voice, banned words, sections, and the 12 templates.
2. **Match the design lock.** The look is sealed in `assets/css/style.css` (refined light
   journal; Georgia serif + system sans; paper `#fafafa`, ink `#0a0a0a`, sea `#2d4a5e`).
   Copy markup from the most recent equivalent file — never improvise the look.
3. **Never invent an article template.** Pick one of the 12 fixed templates (see DNA.md);
   fill the body only.

## Writing editorial — rules-first

**The first law (DNA.md): never lose focus.** Every line must pull the reader to the next —
that is the bar for publishing. Build focus in with the locked components: a `.summary-box`
promise up top, `.note--quote` pull-quotes to re-hook, `.note--key`/`.note--science` insights
where earned, `.term` for inline jargon, one takeaway to close.

Before drafting any article/page, open the response with **two things**, in order:
1. A compact **rules summary** (~150 words): the first law (never lose focus), mission, the
   three pillars, the DNA test, source rule, banned words, design tokens, editorial firewall.
2. A **"Template fit:"** line naming one of the 12 templates with a one-line rationale
   (e.g. *"Template fit: The Blueprint (05) — full recipe with science"*).

Then write. If the piece fits no template, stop and propose narrowing or splitting — never
invent a format. (Skip the summary only on a tiny fix, or when Arnaud says to.)

**Template files.** Each of the 12 templates should be a file in `templates/` named for it
(e.g. `templates/the-blueprint.html`), used via `npm run new -- --template the-blueprint`.
Today `recipe-blueprint.html` ≈ The Blueprint (05), `standard.html` is a generic fallback,
and `section.html` builds the section index pages. Add the remaining canonical bodies as
files — keep the masthead, footer, head-generation, and tokens identical; vary only the BODY.

## How publishing works (the whole job)

`data/articles.json` is the **single source of truth**. A zero-dependency Node build
regenerates everything else. You never hand-edit the homepage cards, section lists,
sitemap, RSS, or article `<head>` tags.

```bash
# 1. Scaffold (creates articles/<slug>.html + a draft entry in articles.json)
npm run new -- --slug <slug> --title "<title>" --category <cat> --subtag "<kind>" --template <name>

# 2. Write the body between BODY:BEGIN / BODY:END; fill date/tags/read_time/lede in articles.json
npm run preview            # build + local server at http://localhost:8080

# 3. Go live: remove "draft": true from the entry, then
npm run publish            # build → validate → firebase deploy
```

- `npm run build` regenerates: homepage card block (`HOMEPAGE-ARTICLES` markers),
  section pages (`CATEGORY-ARTICLES` markers), `sitemap.xml`, `feed.xml`, `data/draft-articles.json`.
- `npm run validate` blocks deploys on drift: a live article with no HTML, a broken
  internal link, a duplicate slug, a missing referenced asset. **If validate fails, nothing ships.**
- `draft: true` → appears only on the work-in-progress surface (robots-blocked), kept off
  the homepage / sitemap / feed. Remove the flag to publish. Drafts are a **flag, not a branch.**
- A new article's `<head>` (title, canonical, Open Graph, Twitter, JSON-LD Recipe/Article)
  is generated from its `articles.json` entry — don't hand-write it.

## Repository map

```
data/articles.json     SINGLE SOURCE OF TRUTH (one entry per article)
articles/<slug>.html   article bodies (you write the BODY; head is generated)
tools/*.mjs            build · validate · new · lib   (build-time only, not deployed)
templates/*.html       fixed article + section templates  (not deployed)
content/DNA.md         editorial DNA  (not deployed)
assets/css/style.css   the sealed design system
assets/js/             main.js (site behaviour) · community.js (Firestore comments) · firebase-config.js
index.html             homepage (generated card block)
<section>.html         shore-larder · the-method · littoral-heritage · the-evidence · the-bridge
sitemap.xml feed.xml   generated — never hand-edit
galleyorder/ menu/ game/   live tools on the site (see below) — NOT publication editorial
```

## Hosting & branch model

- **One hosting target: Firebase** (`firebase.json`, project `littoralicious-web-eceed`).
  Firestore backs the on-page comments (`community.js`). Deploy: `npm run publish`.
- **One branch is the truth and deploys: `main`.** No drafts branch, no parallel worktrees
  for published state. Use the `draft` flag for work in progress.
- `firebase.json` deploys the site but ignores build-time files (`tools/`, `templates/`,
  `scripts/`, `*.md`, `content/`, `data/draft-articles.json`).

## The tools stay on the site

`galleyorder/` (provisioning), `menu/` (menu builder), and `game/` (Sextant) are part of
littoralicious.com at their own paths and **deploy with the site** — do not remove them.
They are *not* publication editorial and don't appear in `articles.json`. (If git clones
get slow from their heavy data, move just the big files to git-lfs; URLs never change.)

## Hard rules (these override convenience)

- **Editorial firewall — TheWorldAffair is a SEPARATE publication.** It shares the host at
  `/theworldaffair/`. The only bridge: TWA's *gastronomie* domain may seed a Littoralicious
  article when genuinely useful to a yacht chef. No other TWA domain is a source, and
  Littoralicious content (Port Calls, Recipe Cards, Method articles) never enters a TWA edition.
- **Sextant (`/game/`) is not part of the publication** — it only rides the host. Never link
  or mix its identity editorially. (See NEXUS rule: Sextant ↔ Littoralicious separation.)
- **Never publish real names from WhatsApp / private chats.** Anonymise: "one chef," "a crew member."
- **No version numbers in active filenames.** No `style-v2.css`. Drafts use the `draft` flag.
- **Port Call uses the Quick Map text table** — never a graphical map (that's the Terroir
  system, which must not blend in here).
- **Don't hand-edit generated files** (homepage card block, section lists, sitemap.xml,
  feed.xml, draft-articles.json). Change `articles.json` + the body, then `npm run build`.

## Health checks

- `npm run validate` must be green before any deploy.
- After editing `articles.json` or any article, run `npm run build` so indexes/sitemap/feed stay in sync.
- Keep `data/articles.json` complete: every published piece has an entry; every entry has a file.
