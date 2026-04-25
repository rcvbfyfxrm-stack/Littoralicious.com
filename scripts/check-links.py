#!/usr/bin/env python3
"""
Link checker — crawl published article HTML, extract external http(s) links,
check each with a HEAD request (fallback GET), and write a dated report.

Goal: catch dead supplier URLs in Port Call articles before a chef does.

Usage:
    python3 scripts/check-links.py
    python3 scripts/check-links.py --only port-call-venice.html  # one file

Output:
    logs/link-check-YYYY-MM-DD.md
"""
from __future__ import annotations

import argparse
import concurrent.futures as cf
import re
import sys
import urllib.request
import urllib.error
from collections import defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES = ROOT / "articles"
LOGS = ROOT / "logs"
TIMEOUT = 10
USER_AGENT = "Mozilla/5.0 (compatible; LittoraliciousLinkChecker/1.0)"

LINK_RE = re.compile(r'href=["\'](https?://[^"\']+)["\']', re.IGNORECASE)
# Skip our own domain and social platforms that rate-limit heavily.
SKIP_DOMAINS = [
    "littoralicious.com",
    "www.littoralicious.com",
    "facebook.com",
    "instagram.com",
    "twitter.com",
    "x.com",
    "linkedin.com",
]


def should_skip(url: str) -> bool:
    return any(d in url.lower() for d in SKIP_DOMAINS)


def extract_links(html_path: Path) -> list[str]:
    text = html_path.read_text(encoding="utf-8", errors="replace")
    urls = LINK_RE.findall(text)
    seen = set()
    out = []
    for u in urls:
        if u in seen or should_skip(u):
            continue
        seen.add(u)
        out.append(u)
    return out


def check_one(url: str) -> tuple[str, int | str]:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            return url, r.status
    except urllib.error.HTTPError as e:
        # Some servers reject HEAD; retry GET.
        if e.code in (403, 405, 501):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
                with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
                    return url, r.status
            except Exception as e2:
                return url, f"GET-retry-{type(e2).__name__}"
        return url, e.code
    except urllib.error.URLError as e:
        return url, f"URLError:{e.reason}"
    except Exception as e:
        return url, f"{type(e).__name__}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="single article filename to check")
    ap.add_argument("--workers", type=int, default=8)
    args = ap.parse_args()

    if args.only:
        files = [ARTICLES / args.only]
        if not files[0].exists():
            print(f"not found: {files[0]}", file=sys.stderr)
            return 2
    else:
        files = sorted(ARTICLES.glob("*.html"))

    by_article: dict[str, list[str]] = {}
    all_urls: set[str] = set()
    for f in files:
        links = extract_links(f)
        by_article[f.name] = links
        all_urls.update(links)

    print(f"checking {len(all_urls)} unique external links across {len(files)} articles…")
    results: dict[str, int | str] = {}
    with cf.ThreadPoolExecutor(max_workers=args.workers) as ex:
        for url, status in ex.map(check_one, sorted(all_urls)):
            results[url] = status

    today = datetime.today().strftime("%Y-%m-%d")
    out = LOGS / f"link-check-{today}.md"
    LOGS.mkdir(parents=True, exist_ok=True)

    ok_count = sum(1 for v in results.values() if isinstance(v, int) and 200 <= v < 400)
    bad_count = len(results) - ok_count

    lines = [
        f"# Link Check — {today}",
        "",
        f"Articles scanned: {len(files)}",
        f"Unique external URLs: {len(all_urls)}",
        f"**OK**: {ok_count}  ·  **Problems**: {bad_count}",
        "",
        "## Problems (grouped by article)",
        "",
    ]
    problems_by_article = defaultdict(list)
    for article, links in by_article.items():
        for url in links:
            status = results.get(url)
            if not (isinstance(status, int) and 200 <= status < 400):
                problems_by_article[article].append((url, status))

    if not problems_by_article:
        lines.append("_(no problems detected — every external link returned 2xx/3xx)_")
    else:
        for article, entries in sorted(problems_by_article.items()):
            lines.append(f"### `{article}`")
            for url, status in entries:
                lines.append(f"- `{status}` — {url}")
            lines.append("")

    lines.append("")
    lines.append("## All statuses")
    lines.append("")
    lines.append("<details><summary>click to expand</summary>")
    lines.append("")
    for url in sorted(results.keys()):
        lines.append(f"- `{results[url]}` — {url}")
    lines.append("")
    lines.append("</details>")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {out}  ({bad_count} problems)")
    return 1 if bad_count else 0


if __name__ == "__main__":
    sys.exit(main())
