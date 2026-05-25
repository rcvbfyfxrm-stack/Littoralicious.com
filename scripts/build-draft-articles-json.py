#!/usr/bin/env python3
"""Auto-generate data/draft-articles.json from the filesystem.

Replaces the hand-maintained file. Single source of truth = what actually exists
in articles/ (draft-*.html, preview-*.html) plus any entry in data/articles.json
with "draft": true.

For each draft, the script extracts:
- slug                from filename
- title               from <title>...— LITTORALICIOUS</title>  (or articles.json)
- lede                from <meta name="description">          (or articles.json)
- category            from articles.json if present, else inferred from filename
- category_label      from data/articles.json categories block
- read_time           from articles.json, else estimated from word count
- file                relative path  (articles/{slug}.html)
- added               from articles.json date, else file mtime (YYYY-MM-DD)

Usage:
    python3 scripts/build-draft-articles-json.py                    # write JSON
    python3 scripts/build-draft-articles-json.py --check            # exit 1 on drift
    python3 scripts/build-draft-articles-json.py --quiet            # no stdout
"""
from __future__ import annotations
import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "articles"
ARTICLES_JSON = ROOT / "data" / "articles.json"
OUT = ROOT / "data" / "draft-articles.json"

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
DESC_RE = re.compile(
    r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']\s*/?>',
    re.IGNORECASE | re.DOTALL,
)
WORD_RE = re.compile(r"\w+")
TAG_RE = re.compile(r"<[^>]+>")
TITLE_SUFFIX_RE = re.compile(r"\s*[—\-–]\s*LITTORALICIOUS\b.*$", re.IGNORECASE)

CATEGORY_INFERENCE = [
    ("port-call", "port-call"),
    ("provisioning", "port-call"),
    ("preview-port-call", "port-call"),
    ("preview-signal-fire", "signal-fire"),
    ("preview-the-locker", "the-locker"),
    ("battered-fish", "the-method"),
    ("yorkshire-pudding", "the-method"),
    ("lamb-shoulder", "the-method"),
    ("venice", "port-call"),
    ("cooking-for-crew", "the-method"),
    ("what-littoralicious-stands-for", "the-bridge"),
]


def html_decode(s: str) -> str:
    return (
        s.replace("&amp;", "&")
        .replace("&mdash;", "—")
        .replace("&ndash;", "–")
        .replace("&rsquo;", "'")
        .replace("&lsquo;", "'")
        .replace("&ldquo;", '"')
        .replace("&rdquo;", '"')
        .replace("&euro;", "€")
        .replace("&nbsp;", " ")
        .replace("&#39;", "'")
        .replace("&quot;", '"')
        .replace("&lt;", "<")
        .replace("&gt;", ">")
    )


def strip_title_suffix(title: str) -> str:
    return TITLE_SUFFIX_RE.sub("", title).strip()


def extract_title(html: str) -> str:
    m = TITLE_RE.search(html)
    if not m:
        return ""
    return strip_title_suffix(html_decode(m.group(1)).strip())


def extract_description(html: str) -> str:
    m = DESC_RE.search(html)
    if not m:
        return ""
    return html_decode(m.group(1)).strip()


def estimate_read_time(html: str) -> int:
    text = TAG_RE.sub(" ", html)
    words = len(WORD_RE.findall(text))
    return max(1, round(words / 220))


READING_TIME_RE = re.compile(
    r'article__reading-time["\'][^>]*>\s*(\d+)\s*min', re.IGNORECASE
)


def declared_read_time(html: str) -> int | None:
    """The reading time the article states in its own header, if any.

    The author sets <span class="article__reading-time">N min read</span>
    deliberately; trust it over the crude word-count estimate. Card-style
    drafts say "Single-page reference" instead — those return None and fall
    back to the estimate.
    """
    m = READING_TIME_RE.search(html)
    return int(m.group(1)) if m else None


def infer_category(slug: str) -> str:
    s = slug.lower()
    for needle, cat in CATEGORY_INFERENCE:
        if needle in s:
            return cat
    if s.startswith("preview-"):
        rest = s[len("preview-"):]
        return rest.split("-")[0] + "-" + rest.split("-")[1] if "-" in rest else "uncategorised"
    return "uncategorised"


def discover_draft_files() -> list[Path]:
    """Collect every articles/draft-*.html and articles/preview-*.html."""
    if not ARTICLES_DIR.exists():
        return []
    found = sorted(ARTICLES_DIR.glob("draft-*.html"))
    found += sorted(ARTICLES_DIR.glob("preview-*.html"))
    return found


def load_articles_index() -> tuple[dict, dict]:
    """Return (slug→entry, slug→category_label)."""
    if not ARTICLES_JSON.exists():
        return {}, {}
    data = json.loads(ARTICLES_JSON.read_text(encoding="utf-8"))
    by_slug = {a.get("slug"): a for a in data.get("articles", []) if a.get("slug")}
    cats = data.get("categories", {})
    return by_slug, cats


def file_added_date(path: Path) -> str:
    return datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")


def build_entry(html_path: Path, by_slug: dict, cats: dict) -> dict:
    slug = html_path.stem
    html = html_path.read_text(encoding="utf-8", errors="replace")
    aj = by_slug.get(slug, {})

    title = aj.get("title") or extract_title(html) or slug.replace("-", " ").title()
    lede = aj.get("description") or extract_description(html) or ""
    category = aj.get("category") or infer_category(slug)
    category_label = cats.get(category, {}).get("name") or category.replace("-", " ").title()
    read_time = aj.get("read_time") or declared_read_time(html) or estimate_read_time(html)
    added = aj.get("date") or file_added_date(html_path)

    return {
        "slug": slug,
        "title": title,
        "category": category,
        "category_label": category_label,
        "read_time": int(read_time),
        "file": f"articles/{html_path.name}",
        "lede": lede,
        "added": added,
    }


def collect() -> list[dict]:
    """Build the full draft list — filesystem drafts + articles.json draft:true entries."""
    by_slug, cats = load_articles_index()
    seen: set[str] = set()
    entries: list[dict] = []

    for html_path in discover_draft_files():
        entry = build_entry(html_path, by_slug, cats)
        if entry["slug"] in seen:
            continue
        seen.add(entry["slug"])
        entries.append(entry)

    for slug, aj in by_slug.items():
        if not aj.get("draft"):
            continue
        if slug in seen:
            continue
        html_path = ARTICLES_DIR / f"{slug}.html"
        if not html_path.exists():
            print(f"  WARN  draft:true in articles.json but no file: articles/{slug}.html",
                  file=sys.stderr)
            continue
        entries.append(build_entry(html_path, by_slug, cats))
        seen.add(slug)

    entries.sort(key=lambda e: (e.get("added") or "", e["slug"]), reverse=True)
    return entries


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--check", action="store_true",
                    help="Exit 1 if the on-disk JSON differs from a fresh build (CI gate).")
    ap.add_argument("--quiet", action="store_true", help="No stdout (errors still go to stderr).")
    args = ap.parse_args()

    drafts = collect()
    payload = {
        "_comment": (
            "Auto-generated by scripts/build-draft-articles-json.py. "
            "Do not hand-edit — your changes will be overwritten on next deploy. "
            "To add a draft: drop articles/draft-{slug}.html (or set draft:true in articles.json) "
            "and run `make drafts`."
        ),
        "_generated_at": datetime.now(tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "drafts": drafts,
    }
    new_text = json.dumps(payload, indent=2, ensure_ascii=False) + "\n"

    if args.check:
        if not OUT.exists():
            print("draft-articles.json missing — run `make drafts`.", file=sys.stderr)
            return 1
        old = OUT.read_text(encoding="utf-8")
        old_payload = json.loads(old)
        old_payload.pop("_generated_at", None)
        new_payload = json.loads(new_text)
        new_payload.pop("_generated_at", None)
        if old_payload != new_payload:
            print("draft-articles.json is out of date — run `make drafts` and commit.", file=sys.stderr)
            return 1
        if not args.quiet:
            print(f"OK · {len(drafts)} drafts · {OUT.relative_to(ROOT)}")
        return 0

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(new_text, encoding="utf-8")
    if not args.quiet:
        print(f"Wrote {OUT.relative_to(ROOT)} — {len(drafts)} drafts")
        for d in drafts:
            print(f"  · {d['slug']:50s}  ({d['category']:14s}, {d['read_time']:>2} min)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
