---
name: publish-article
description: Publish a Littoralicious draft — runs DNA lint, converts markdown to HTML matching the existing article template, appends to data/articles.json, regenerates sitemap + feed, moves the draft to content/published/. Never overwrites an existing article HTML file without confirmation.
---

# /publish-article

End-to-end publishing for a single draft. Replaces the 90-minute manual workflow (write → hand-convert to HTML → update JSON → update sitemap → update category page) with a lint-gated pipeline.

## Usage

```
/publish-article content/review/<draft-filename>.md
```

If no path is given, list all drafts in `content/review/` and ask which to publish.

## Pipeline

1. **Lint** — `python3 scripts/dna-lint.py <path>`.
   - If exit code is non-zero: stop, print the report, do nothing else.
   - If WARN-only: print the report, ask the user to confirm before proceeding.
2. **Slug + metadata** — read the frontmatter. Slug = frontmatter `slug` if present, else derive from `title` (lowercase, hyphenated, stripped of punctuation). Confirm the slug with the user if it differs from any existing article.
3. **HTML conversion** — run `python3 scripts/md-to-html.py <path> --out articles/<slug>.html`. The script uses the canonical article template (same structure as `articles/garlic-the-immortal-bulb.html`) and wires:
   - `<meta name="description">` from frontmatter `description` (or the lede if missing — ask the user if unclear).
   - `<title>`, OG tags, category label, date, reading time.
   - Body rendered from markdown with the existing annotation-box classes (`note--science`, `note--key`, `note--action`, `note--warning`, `note--quote`).
4. **articles.json** — append a new entry to the `articles[]` array:
   ```json
   {
     "slug": "...",
     "title": "...",
     "date": "YYYY-MM-DD",
     "category": "...",
     "tags": [...],
     "read_time": <int>,
     "featured": false
   }
   ```
   Preserve the existing ordering (newest first). Do NOT touch `dispatches`, `categories`, `themes`, or `tags` unless the draft introduces a new tag — in that case ask first.
5. **Sitemap + feed** — run `make sitemap`.
6. **Move draft** — `mv content/review/<file>.md content/published/<file>.md`. Create `content/published/` if it doesn't exist.
7. **Commit** — stage `articles/<slug>.html`, `data/articles.json`, `sitemap.xml`, `feed.xml`, the moved markdown. Commit message:
   ```
   publish: <title>

   Category: <category>
   Template: <template number>
   Word count: <n>
   ```
   **Do not push.** Arnaud reviews and pushes manually.

## Safety rails

- **Never overwrite** an existing `articles/<slug>.html`. If present, stop and ask whether this is a republish.
- **Never edit** an already-published article through this skill — it's publish-only.
- **Never bypass lint** with hard failures. If Arnaud asks to bypass, tell him to fix the lint findings first.
- **Dry-run mode**: if the user says "dry run" in the command, do everything except the `mv` and the commit.

## On failure

- Lint FAIL: show full report, stop.
- HTML conversion error: leave everything in place, print the traceback.
- JSON append error: leave the generated HTML in place but do NOT move the draft; print which step failed.

## See also

- `.claude/agents/dna-lint.md` — the lint agent invoked in step 1.
- `scripts/dna-lint.py` — the fast deterministic check.
- `scripts/md-to-html.py` — the HTML conversion (scaffold at time of writing).
- `scripts/regen-sitemap-feed.py` — already in the repo.
- `IMPLEMENTATION-PLAN.md` — context and priority tiers (L1 is this skill).
