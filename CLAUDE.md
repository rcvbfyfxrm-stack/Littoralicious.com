# CLAUDE.md — Littoralicious

Operating guide for Claude Code in this repo. Littoralicious is a static, Firebase-hosted
yacht-chef food-science **publication** (https://www.littoralicious.com). Read this and
`content/DNA.md` before writing or changing anything.

## Before you start

1. Read **`content/DNA.md`** — mission (Nurture), the three pillars (Grandmother /
   Scientist / Yacht Chef), the DNA test, voice, banned words, sections, and the 14 templates.
2. **Match the design lock.** The look is sealed in `assets/css/style.css` (refined light
   journal; Georgia serif + system sans; paper `#fafafa`, ink `#0a0a0a`, sea `#2d4a5e`).
   Copy markup from the most recent equivalent file — never improvise the look.
3. **Never invent an article template.** Pick one of the 14 fixed templates (see DNA.md);
   fill the body only.

## Writing editorial — rules-first

**The first law (DNA.md): never lose focus.** Every line must pull the reader to the next —
that is the bar for publishing. Build focus in with the locked components: a `.summary-box`
promise up top, `.note--quote` pull-quotes to re-hook, `.note--key`/`.note--science` insights
where earned, `.term` for inline jargon, one takeaway to close.

Before drafting any article/page, open the response with **two things**, in order:
1. A compact **rules summary** (~150 words): the first law (never lose focus), mission, the
   three pillars, the DNA test, source rule, banned words, design tokens, editorial firewall.
2. A **"Template fit:"** line — **auto-select** the matching template (never ask which);
   infer it from what the piece is and state it in one line (e.g. *"Template fit: The
   Blueprint (05)"*). Then scaffold with `npm run new -- --template <name> …`.

Then write — and **design it to captivate**: boxes (`summary-box`, `note--key/science/action/
warning`, custom `note[data-label]`), highlighting (`<mark>` / `.highlight` / `.term`), pull-quotes,
stat grids, labelled dividers. Build a **scannable spine** (boxes + bold lead-ins + h2s alone
tell the whole story); never more than ~150 words of unbroken prose before a visual beat re-grabs
the eye; vary the devices piece to piece. See DNA.md → *Captivating design*. If the piece fits no
template, stop and propose narrowing or splitting — never invent a format. (Skip the summary only
on a tiny fix, or when Arnaud says to.)

**Template files.** All 14 template bodies exist in `templates/`, each named for its format
and used via `npm run new -- --template <name>`: `shore-larder`, `shore-larder-deep-dive`,
`the-method-technique`, `littoral-heritage-article`, `the-evidence`, `recipe-blueprint`
(= The Blueprint, 05), `signal-fire`, `the-horizon`, `trade-winds`, `tight-ship`,
`port-call`, `the-locker`, `weekly-brief`, `the-lab`. Shell helpers (not article types):
`standard.html` (generic fallback), `section.html` (section index pages), `og-image.html`.
Keep the masthead, footer, head-generation, and tokens identical across them; vary only the BODY.

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

**Pipeline tools** (the automated draft → gate → live loop): `tools/draft.mjs` scaffolds an
article and writes a drafting brief (template structure + DNA + source) for an agent, then
`--apply` splices the written body and lints it. `tools/rewrite.mjs` is the annotate→rewrite
half: it bundles Studio review notes into a rewrite brief, `--apply` splices the new body and
re-lints. `tools/undraft.mjs` is the gated promotion to live — a draft is blocked while it has
lint errors or a queued rewrite (atomic: one blocked slug blocks the whole batch; `--force`
overrides loudly). `tools/review.mjs` deploys a draft to the Firebase preview channel and reads
back review notes. `npm run lint` is the editorial gate (emoji, banned words, headline rules,
summary-box, spine, British spelling) — distinct from `npm run validate`, the structure gate.
CI (the live deploy Action) runs `npm run validate` and deploys `firestore.rules` before hosting.

## Repository map

```
data/articles.json     SINGLE SOURCE OF TRUTH (one entry per article)
articles/<slug>.html   article bodies (you write the BODY; head is generated)
tools/*.mjs            build · validate · lint · new · draft · rewrite · undraft · review · lib  (not deployed)
templates/*.html       fixed article + section templates  (DEPLOYED — the Studio reads them live)
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
- `firebase.json` deploys the site but ignores build-time files (`tools/`, `scripts/`,
  `content/`, `*.md`). **`templates/` and `data/draft-articles.json` DO deploy** — the
  Studio reads both from the live site; don't add them to the ignore list.

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
