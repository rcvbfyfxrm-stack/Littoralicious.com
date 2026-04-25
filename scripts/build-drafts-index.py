#!/usr/bin/env python3
"""Scan content/drafts/ and content/review/ and emit data/drafts.json.

Each entry:
{
  "id": "drafts/Draft - 2026-04-22 - custard-perfect.md",
  "source": "drafts" | "review",
  "filename": "...",
  "title": "...",
  "subtitle": "...",
  "date": "2026-04-22",
  "category": "the-method",
  "tags": [...],
  "word_count": 1234,
  "read_time": 6,
  "excerpt": "first ~280 chars of body",
  "body_md": "full markdown body (no frontmatter)"
}
"""
from __future__ import annotations
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCES = [("drafts", ROOT / "content" / "drafts"),
           ("review", ROOT / "content" / "review")]
OUT = ROOT / "data" / "drafts.json"

FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def parse_frontmatter(text: str):
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    raw = m.group(1)
    body = text[m.end():]
    meta = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        if v.startswith("[") and v.endswith("]"):
            inner = v[1:-1]
            meta[k] = [t.strip().strip('"').strip("'") for t in inner.split(",") if t.strip()]
        else:
            meta[k] = v
    return meta, body


def excerpt(body: str, n: int = 320) -> str:
    text = re.sub(r"^#.*$", "", body, flags=re.MULTILINE)
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:n] + ("…" if len(text) > n else "")


def infer_category(filename: str) -> str:
    name = filename.lower()
    mapping = [
        ("port call", "port-call"),
        ("the method", "the-method"),
        ("the evidence", "the-evidence"),
        ("the horizon", "the-horizon"),
        ("trade winds", "trade-winds"),
        ("tight ship", "tight-ship"),
        ("signal fire", "signal-fire"),
        ("the locker", "the-locker"),
        ("blueprint", "the-method"),
        ("littoral heritage", "littoral-heritage"),
        ("shore larder", "shore-larder"),
        ("weekly brief", "weekly-brief"),
    ]
    for needle, slug in mapping:
        if needle in name:
            return slug
    return "uncategorised"


def main():
    items = []
    for source, folder in SOURCES:
        if not folder.exists():
            continue
        for path in sorted(folder.glob("*.md")):
            text = path.read_text(encoding="utf-8")
            meta, body = parse_frontmatter(text)
            words = len(re.findall(r"\w+", body))
            items.append({
                "id": f"{source}/{path.name}",
                "source": source,
                "filename": path.name,
                "title": meta.get("title") or path.stem,
                "subtitle": meta.get("subtitle", ""),
                "date": meta.get("date", ""),
                "category": meta.get("category") or infer_category(path.name),
                "tags": meta.get("tags") if isinstance(meta.get("tags"), list) else [],
                "word_count": words,
                "read_time": max(1, words // 220),
                "excerpt": excerpt(body),
                "body_md": body.strip(),
            })

    items.sort(key=lambda x: (x.get("date") or "", x["filename"]), reverse=True)
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps({"generated_at": __import__("datetime").datetime.now().isoformat(timespec="seconds"),
                               "count": len(items),
                               "drafts": items}, indent=2, ensure_ascii=False))
    print(f"Wrote {OUT.relative_to(ROOT)} — {len(items)} drafts")


if __name__ == "__main__":
    main()
