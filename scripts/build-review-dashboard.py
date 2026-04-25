#!/usr/bin/env python3
"""
Review dashboard — scans content/review/ and writes logs/review-status.html.

For each draft: title, category, template, word count, age (days since file
mtime), DNA lint status (PASS / FAIL / PASS-WITH-WARNINGS), and VERIFY/TK/TODO
blocker count.

Drafts are grouped into four buckets:
  1. READY TO PUBLISH   — lint PASS, <45 days old, no blockers
  2. QUICK WINS         — PASS-WITH-WARNINGS, <45 days, no blockers
  3. NEEDS WORK         — lint FAIL or has blockers
  4. RETIRE CANDIDATES  — >60 days old, regardless of lint

Run manually: python3 scripts/build-review-dashboard.py
Or via make:  make status
"""
from __future__ import annotations

import html
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from dna_lint_parse import parse_frontmatter

ROOT = Path(__file__).resolve().parent.parent
REVIEW_DIR = ROOT / "content" / "review"
OUT = ROOT / "logs" / "review-status.html"
LINT_SCRIPT = ROOT / "scripts" / "dna-lint.py"

BLOCKER_RE = re.compile(r"\[VERIFY[^\]]*\]|\[TK\]|\[TODO[^\]]*\]", re.IGNORECASE)


def lint_status(path: Path) -> str:
    try:
        r = subprocess.run(
            [sys.executable, str(LINT_SCRIPT), str(path)],
            capture_output=True, text=True, timeout=15,
        )
        out = r.stdout
        if "Status: PASS-WITH-WARNINGS" in out:
            return "WARN"
        if r.returncode == 0:
            return "PASS"
        return "FAIL"
    except Exception as e:
        return f"error:{type(e).__name__}"


def bucket_of(row: dict) -> str:
    if row["age_days"] > 60:
        return "retire"
    if row["lint"] == "FAIL" or row["blockers"]:
        return "needs-work"
    if row["lint"] == "WARN":
        return "quick-wins"
    if row["lint"] == "PASS":
        return "ready"
    return "needs-work"


BUCKET_LABELS = {
    "ready":      ("Ready to publish",   "#059669"),
    "quick-wins": ("Quick wins",         "#d97706"),
    "needs-work": ("Needs work",         "#dc2626"),
    "retire":     ("Retire candidates",  "#6b7280"),
}


def render_table(rows: list[dict]) -> str:
    if not rows:
        return '  <p style="color:#777; font-style:italic">(none)</p>'
    body = "\n".join(
        f"""
        <tr>
          <td><code>{html.escape(r['file'])}</code></td>
          <td>{html.escape(str(r.get('title','') or ''))}</td>
          <td>{html.escape(str(r.get('category','') or ''))}</td>
          <td>{html.escape(str(r.get('template','') or ''))}</td>
          <td style="text-align:right">{r['words']}</td>
          <td style="text-align:right">{r['age_days']}d</td>
          <td style="text-align:right">{r['blockers'] or ''}</td>
          <td><strong>{r['lint']}</strong></td>
        </tr>"""
        for r in rows
    )
    return f"""
    <table>
      <thead>
        <tr>
          <th>File</th><th>Title</th><th>Category</th><th>Tpl</th>
          <th>Words</th><th>Age</th><th>Block</th><th>Lint</th>
        </tr>
      </thead>
      <tbody>{body}
      </tbody>
    </table>
    """


def main() -> int:
    if not REVIEW_DIR.exists():
        print(f"review dir not found: {REVIEW_DIR}", file=sys.stderr)
        return 2
    drafts = sorted(REVIEW_DIR.glob("*.md"))

    rows = []
    for p in drafts:
        raw = p.read_text(encoding="utf-8", errors="replace")
        fm, body = parse_frontmatter(raw)
        age_days = (datetime.now() - datetime.fromtimestamp(p.stat().st_mtime)).days
        rows.append({
            "file": p.name,
            "title": fm.get("title"),
            "category": fm.get("category"),
            "template": fm.get("template"),
            "words": len(re.findall(r"\b\w+\b", body)),
            "age_days": age_days,
            "blockers": len(BLOCKER_RE.findall(body)),
            "lint": lint_status(p),
        })

    # Bucket each row.
    buckets: dict[str, list[dict]] = {"ready": [], "quick-wins": [], "needs-work": [], "retire": []}
    for r in rows:
        buckets[bucket_of(r)].append(r)
    for key in buckets:
        buckets[key].sort(key=lambda r: (r["age_days"], r["blockers"]))

    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    counts = {k: len(v) for k, v in buckets.items()}
    summary = (
        f"<strong>{len(rows)}</strong> drafts · "
        f'<span style="color:{BUCKET_LABELS["ready"][1]}">{counts["ready"]} ready</span> · '
        f'<span style="color:{BUCKET_LABELS["quick-wins"][1]}">{counts["quick-wins"]} quick wins</span> · '
        f'<span style="color:{BUCKET_LABELS["needs-work"][1]}">{counts["needs-work"]} needs work</span> · '
        f'<span style="color:{BUCKET_LABELS["retire"][1]}">{counts["retire"]} retire</span>'
    )

    sections = []
    for key in ["ready", "quick-wins", "needs-work", "retire"]:
        label, color = BUCKET_LABELS[key]
        n = counts[key]
        sections.append(
            f"""
    <section>
      <h2 style="border-bottom: 3px solid {color}; padding-bottom: .3rem; margin-top: 2rem;">
        {label} <span style="color: {color}; font-family: ui-monospace, monospace;">({n})</span>
      </h2>
      {render_table(buckets[key])}
    </section>"""
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Littoralicious — Review Dashboard</title>
<style>
  body {{ font-family: -apple-system, system-ui, sans-serif; margin: 2rem; color: #0a0a0a; background: #fafafa; max-width: 1400px; }}
  h1 {{ font-family: Georgia, serif; margin-bottom: .2rem; }}
  .meta {{ color: #555; margin-bottom: 1.5rem; font-size: .95rem; }}
  table {{ border-collapse: collapse; width: 100%; font-size: .9rem; margin-top: .75rem; }}
  th, td {{ padding: .5rem .7rem; border-bottom: 1px solid #ddd; text-align: left; vertical-align: top; }}
  th {{ background: #2d4a5e; color: white; }}
  tbody tr:hover td {{ background: #eef2f6; }}
  code {{ font-family: ui-monospace, SFMono-Regular, monospace; font-size: .82rem; }}
</style>
</head>
<body>
<h1>Littoralicious — Review Dashboard</h1>
<div class="meta">Generated {now} · {summary}</div>
{''.join(sections)}
</body>
</html>
""", encoding="utf-8")
    print(f"wrote {OUT}")
    for key in ["ready", "quick-wins", "needs-work", "retire"]:
        print(f"  {BUCKET_LABELS[key][0]}: {counts[key]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
