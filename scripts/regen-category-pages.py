#!/usr/bin/env python3
"""
Regenerate the article-list block of each category page from data/articles.json.

Each article's short description is extracted from its HTML `<meta name="description">`
(same pattern as scripts/regen-sitemap-feed.py) so category pages stay in sync with
what's published on each article.

Non-destructive: only rewrites content between the markers:
    <!-- ARTICLES:BEGIN --> ... <!-- ARTICLES:END -->

A page without those markers is skipped with a note.

Usage:
    python3 scripts/regen-category-pages.py
"""
from __future__ import annotations

import html
import json
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "data" / "articles.json"
ARTICLES_DIR = ROOT / "articles"

CATEGORY_PAGES = {
    "shore-larder": "shore-larder.html",
    "the-method": "the-method.html",
    "littoral-heritage": "littoral-heritage.html",
    "the-evidence": "the-evidence.html",
    "the-bridge": "the-bridge.html",
    "port-call": "port-call.html",
    "signal-fire": "signal-fire.html",
    "the-locker": "the-locker.html",
    "trade-winds": "trade-winds.html",
    "tight-ship": "tight-ship.html",
    "the-horizon": "the-horizon.html",
    "recipe": "recipes.html",
}

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
    "recipe": "The Blueprint",
}

MARK_RE = re.compile(
    r"(<!--\s*ARTICLES:BEGIN\s*-->)(.*?)(<!--\s*ARTICLES:END\s*-->)",
    re.DOTALL,
)
META_DESC_RE = re.compile(
    r'<meta\s+name=["\']description["\']\s+content=(["\'])(.*?)\1',
    re.IGNORECASE | re.DOTALL,
)


def pretty_date(iso: str) -> str:
    try:
        return datetime.strptime(iso, "%Y-%m-%d").strftime("%B %-d, %Y")
    except ValueError:
        return iso


def description_for(slug: str) -> str:
    html_path = ARTICLES_DIR / f"{slug}.html"
    if not html_path.exists():
        return ""
    m = META_DESC_RE.search(html_path.read_text(encoding="utf-8", errors="replace"))
    if not m:
        return ""
    # m.group(1) is the quote char, m.group(2) is the actual content.
    # HTML entities like &mdash; pass through; Arnaud's existing pages use them liberally.
    return m.group(2).strip()


def render_dispatch(article: dict, category_label: str, first: bool) -> str:
    slug = article["slug"]
    title = html.escape(article["title"])
    date = pretty_date(article["date"])
    read_time = article.get("read_time", "")
    desc = description_for(slug)
    style = "" if first else ' style="margin-top: var(--space-6);"'
    rt_html = f'<span class="article__reading-time">{read_time} min read</span>' if read_time else ""
    desc_html = f"""                    <div class="dispatch__body">
                        <p>{desc}</p>
                    </div>
""" if desc else ""
    return (
        f'                <article class="dispatch"{style}>\n'
        f'                    <span class="article__category">{category_label}</span>\n'
        f'                    <h3 class="dispatch__title"><a href="articles/{slug}.html">{title}</a></h3>\n'
        + desc_html
        + f'                    <div class="article__meta" style="margin-top: var(--space-2);">\n'
        f'                        <time class="article__date">{date}</time>\n'
        + (f'                        {rt_html}\n' if rt_html else "")
        + f'                    </div>\n'
        f'                </article>'
    )


def render_block(articles: list[dict], category: str) -> str:
    label = CATEGORY_LABELS.get(category, category.replace("-", " ").title())
    if not articles:
        return "\n                <!-- no articles yet -->\n            "
    parts = []
    for i, a in enumerate(articles):
        parts.append(render_dispatch(a, label, first=(i == 0)))
    return "\n" + "\n\n".join(parts) + "\n            "


def main() -> int:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    articles = sorted(data.get("articles", []), key=lambda a: a.get("date", ""), reverse=True)

    updated: list[str] = []
    skipped: list[str] = []
    missing: list[str] = []

    for cat, page_name in CATEGORY_PAGES.items():
        page_path = ROOT / page_name
        if not page_path.exists():
            missing.append(page_name)
            continue

        cat_articles = [a for a in articles if a.get("category") == cat]
        html_src = page_path.read_text(encoding="utf-8")
        if not MARK_RE.search(html_src):
            skipped.append(page_name)
            continue

        new_block = render_block(cat_articles, cat)
        new_html = MARK_RE.sub(
            lambda m: f"{m.group(1)}{new_block}{m.group(3)}",
            html_src,
        )
        if new_html != html_src:
            page_path.write_text(new_html, encoding="utf-8")
            updated.append(f"{page_name} ({len(cat_articles)} articles)")

    if updated:
        print("Updated:")
        for u in updated:
            print(f"  ✓ {u}")
    if skipped:
        print("\nSkipped (no ARTICLES:BEGIN/END markers):")
        for s in skipped:
            print(f"  - {s}")
        print("  → add the markers once in each page to enable auto-regen.")
    if missing:
        print("\nMissing (page not found in repo root):")
        for m in missing:
            print(f"  - {m}")

    if not (updated or skipped or missing):
        print("Nothing to do.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
