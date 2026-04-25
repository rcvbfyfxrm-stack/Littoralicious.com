#!/usr/bin/env python3
"""
Sanity-check data/articles.json against the filesystem.

Catches the drift class: articles.json references a slug whose HTML is missing,
HTML exists in articles/ but has no JSON entry, duplicate slugs, tag taxonomy
drift, or unknown categories.

Usage:
    python3 scripts/validate-articles-json.py

Exit codes:
    0 — clean
    1 — drift detected (report printed)
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "data" / "articles.json"
ARTICLES_DIR = ROOT / "articles"


def main() -> int:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    articles = data.get("articles", [])
    categories = set(data.get("categories", {}).keys()) if isinstance(data.get("categories"), dict) else set()
    known_tags = set(data.get("tags", [])) if isinstance(data.get("tags"), list) else set()

    json_slugs = [a["slug"] for a in articles]
    json_slug_set = set(json_slugs)
    html_slugs = {p.stem for p in ARTICLES_DIR.glob("*.html")}

    issues: list[str] = []

    # Duplicate slugs
    if len(json_slugs) != len(json_slug_set):
        dupes = sorted({s for s in json_slugs if json_slugs.count(s) > 1})
        issues.append(f"Duplicate slugs in articles.json: {dupes}")

    # JSON entry without matching HTML file
    missing_html = sorted(json_slug_set - html_slugs)
    if missing_html:
        issues.append(f"JSON entries with no HTML file in articles/: {missing_html}")

    # HTML file without JSON entry (exclude index-y or special pages if any slip in)
    orphan_html = sorted(html_slugs - json_slug_set)
    if orphan_html:
        issues.append(f"HTML files in articles/ with no JSON entry: {orphan_html}")

    # Unknown categories
    for a in articles:
        if categories and a.get("category") not in categories:
            issues.append(f"Unknown category on {a['slug']!r}: {a.get('category')}")

    # Missing required fields
    required = {"slug", "title", "date", "category", "tags", "read_time"}
    for a in articles:
        missing = required - set(a.keys())
        if missing:
            issues.append(f"Missing fields on {a.get('slug','?')!r}: {sorted(missing)}")

    # Unknown tags (soft warn — many legit tags may not be in the taxonomy yet)
    if known_tags:
        unknown: dict[str, list[str]] = {}
        for a in articles:
            for tag in a.get("tags", []) or []:
                if tag not in known_tags:
                    unknown.setdefault(tag, []).append(a["slug"])
        if unknown:
            print("Soft warn — tags used but not in articles.json 'tags' taxonomy:")
            for tag, slugs in sorted(unknown.items()):
                print(f"  - {tag} → {slugs[:3]}{'…' if len(slugs) > 3 else ''}")

    # Date format
    for a in articles:
        d = a.get("date", "")
        if not (len(d) == 10 and d[4] == "-" and d[7] == "-"):
            issues.append(f"Bad date format on {a.get('slug','?')!r}: {d!r}")

    if issues:
        print("articles.json validation — FAIL")
        for i in issues:
            print(f"  - {i}")
        return 1
    print(f"articles.json validation — OK  ({len(articles)} entries, {len(html_slugs)} HTML files)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
