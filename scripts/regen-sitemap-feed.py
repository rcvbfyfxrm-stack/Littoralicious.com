#!/usr/bin/env python3
"""Regenerate sitemap.xml and feed.xml from data/articles.json.

Reads article titles/slugs/dates/categories from data/articles.json.
Extracts per-article descriptions from each <meta name="description"> tag in articles/<slug>.html.
Writes sitemap.xml (static pages + all articles, sorted newest first) and feed.xml (RSS 2.0).

Usage: python3 scripts/regen-sitemap-feed.py
Or:    make sitemap
"""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from html import escape
from pathlib import Path

SITE_URL = "https://www.littoralicious.com"
ROOT = Path(__file__).resolve().parent.parent
ARTICLES_JSON = ROOT / "data" / "articles.json"
ARTICLES_DIR = ROOT / "articles"
SITEMAP_OUT = ROOT / "sitemap.xml"
FEED_OUT = ROOT / "feed.xml"

STATIC_PAGES: list[tuple[str, float]] = [
    ("", 1.0),
    ("shore-larder.html", 0.8),
    ("the-method.html", 0.8),
    ("littoral-heritage.html", 0.8),
    ("the-evidence.html", 0.8),
    ("the-bridge.html", 0.8),
    ("community.html", 0.6),
    ("newsletter.html", 0.6),
    ("about.html", 0.6),
    ("founder.html", 0.6),
    ("contact.html", 0.6),
    ("connect.html", 0.5),
]

META_DESC_RE = re.compile(
    r'<meta\s+name="description"\s+content="([^"]*)"', re.IGNORECASE
)


def extract_meta_description(html_path: Path) -> str:
    if not html_path.is_file():
        return ""
    text = html_path.read_text(encoding="utf-8", errors="replace")
    m = META_DESC_RE.search(text)
    return m.group(1).strip() if m else ""


def rfc822(date_str: str) -> str:
    dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    return dt.strftime("%a, %d %b %Y %H:%M:%S +0000")


def build_sitemap(data: dict) -> str:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path, priority in STATIC_PAGES:
        out += [
            "    <url>",
            f"        <loc>{SITE_URL}/{path}</loc>",
            f"        <lastmod>{today}</lastmod>",
            f"        <priority>{priority}</priority>",
            "    </url>",
        ]
    for a in sorted(data["articles"], key=lambda a: a["date"], reverse=True):
        out += [
            "    <url>",
            f'        <loc>{SITE_URL}/articles/{a["slug"]}.html</loc>',
            f'        <lastmod>{a["date"]}</lastmod>',
            "        <priority>0.7</priority>",
            "    </url>",
        ]
    out.append("</urlset>")
    return "\n".join(out) + "\n"


def build_feed(data: dict) -> str:
    categories = data.get("categories", {})
    now = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S +0000")
    out = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        "    <channel>",
        "        <title>Littoralicious</title>",
        f"        <link>{SITE_URL}</link>",
        "        <description>Modern science and regional recipes from the sea. "
        "For yacht chefs and serious culinary practitioners.</description>",
        "        <language>en</language>",
        f"        <lastBuildDate>{now}</lastBuildDate>",
        f'        <atom:link href="{SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>',
        "",
    ]
    for a in sorted(data["articles"], key=lambda a: a["date"], reverse=True):
        slug = a["slug"]
        desc = extract_meta_description(ARTICLES_DIR / f"{slug}.html")
        cat_name = categories.get(a["category"], {}).get("name", a["category"])
        out += [
            "        <item>",
            f'            <title>{escape(a["title"])}</title>',
            f"            <link>{SITE_URL}/articles/{slug}.html</link>",
            f'            <guid isPermaLink="true">{SITE_URL}/articles/{slug}.html</guid>',
            f'            <pubDate>{rfc822(a["date"])}</pubDate>',
            f"            <description>{escape(desc)}</description>",
            f"            <category>{escape(cat_name)}</category>",
            "        </item>",
            "",
        ]
    out += ["    </channel>", "</rss>"]
    return "\n".join(out) + "\n"


def main() -> int:
    data = json.loads(ARTICLES_JSON.read_text())

    sitemap_xml = build_sitemap(data)
    SITEMAP_OUT.write_text(sitemap_xml)
    print(f"wrote {SITEMAP_OUT.name:<12} {sitemap_xml.count('<url>')} URLs")

    feed_xml = build_feed(data)
    FEED_OUT.write_text(feed_xml)
    n_items = feed_xml.count("<item>")
    missing = [a["slug"] for a in data["articles"]
               if not extract_meta_description(ARTICLES_DIR / f"{a['slug']}.html")]
    print(f"wrote {FEED_OUT.name:<12} {n_items} items")
    if missing:
        print(f"  warning: no meta description on {len(missing)} article(s): {', '.join(missing)}",
              file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
