#!/usr/bin/env python3
"""
Regenerate the homepage article-list from data/articles.json.

The homepage currently hand-codes 27 article cards between
`<div id="article-list">` and its closing `</div>`. Auto-regen keeps every
published article present without drift — same pattern as category pages.

Enable on first run by wrapping the existing list with:
    <!-- HOMEPAGE-ARTICLES:BEGIN -->
    ...
    <!-- HOMEPAGE-ARTICLES:END -->

Re-running will reproduce all cards from articles.json; hand-curated
data-tags are regenerated from the articles.json `tags` field.

Usage:
    python3 scripts/regen-homepage.py
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "data" / "articles.json"
INDEX_PATH = ROOT / "index.html"

CATEGORY_LABELS = {
    "shore-larder": "Shore Larder",
    "the-method": "The Method",
    "littoral-heritage": "Littoral Heritage",
    "the-evidence": "The Evidence",
    "the-bridge": "The Bridge",
    "port-call": "Port Call",
    "signal-fire": "Signal Fire",
    "the-locker": "The Locker",
    "trade-winds": "Trade Winds",
    "tight-ship": "Tight Ship",
    "the-horizon": "The Horizon",
    "recipe": "The Method",  # recipes show under The Method on the homepage
}

MARK_RE = re.compile(
    r"(<!--\s*HOMEPAGE-ARTICLES:BEGIN\s*-->)(.*?)(<!--\s*HOMEPAGE-ARTICLES:END\s*-->)",
    re.DOTALL,
)


def render_card(a: dict) -> str:
    slug = a["slug"]
    title = html.escape(a["title"])
    cat_slug = a.get("category", "")
    cat_label = CATEGORY_LABELS.get(cat_slug, cat_slug.replace("-", " ").title())
    read_time = a.get("read_time", "")
    tags_list = a.get("tags", []) or []
    data_tags = html.escape(" ".join(tags_list))
    return (
        f'                <article class="article-card" data-category="{cat_label}" data-tags="{data_tags}">'
        f'<div class="article-card__meta"><span class="article-card__category">{cat_label}</span>'
        f'<span>{read_time} min</span></div>'
        f'<h3 class="article-card__title"><a href="articles/{slug}.html">{title}</a></h3>'
        f'</article>'
    )


def main() -> int:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    articles = sorted(data.get("articles", []), key=lambda a: a.get("date", ""), reverse=True)

    html_src = INDEX_PATH.read_text(encoding="utf-8")
    if not MARK_RE.search(html_src):
        print("index.html has no <!-- HOMEPAGE-ARTICLES:BEGIN --> markers.", file=sys.stderr)
        print("Add them once around the <div id=\"article-list\">…</div> content, then re-run.", file=sys.stderr)
        return 2

    block = "\n" + "\n".join(render_card(a) for a in articles) + "\n            "
    new_html = MARK_RE.sub(
        lambda m: f"{m.group(1)}{block}{m.group(3)}",
        html_src,
    )
    if new_html == html_src:
        print("no change.")
        return 0
    INDEX_PATH.write_text(new_html, encoding="utf-8")
    print(f"✓ index.html regenerated ({len(articles)} articles)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
