#!/usr/bin/env python3
"""
Port Call supplier extractor (dry-run).

Reads a Port Call draft or published article, parses the `### Quick Map` table
for each port, and outputs a PROPOSED additions list to
`data/suppliers-proposed.json` for your review. Never writes to
`data/suppliers.json` directly — the canonical DB requires a human pass to
disambiguate (one cell often contains two suppliers, markup notes, etc.).

Goal: eliminate ~80% of the typing for migrating the existing Med + Caribbean
drafts into structured data. The remaining 20% (markups, contact details,
lead times, "last_verified" dates) is intentionally left for you to fill.

Usage:
    python3 scripts/extract-suppliers.py "content/review/Draft - 2026-02-07 - port call provisioning mediterranean.md"
    python3 scripts/extract-suppliers.py --merge   # merge proposed → suppliers.json (prompts)
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SUPPLIERS_JSON = ROOT / "data" / "suppliers.json"
PROPOSED_JSON = ROOT / "data" / "suppliers-proposed.json"

PORT_RE = re.compile(r"^##\s+(?!#)(.+)$", re.MULTILINE)
QUICK_MAP_HEADER_RE = re.compile(r"^###\s+Quick Map\s*$", re.MULTILINE)
TABLE_ROW_RE = re.compile(r"^\|\s*(\*\*[^*]+\*\*|\w[^|]*?)\s*\|", re.MULTILINE)

CATEGORY_ALIASES = {
    "general": "general",
    "general / one-stop": "general",
    "fish": "fish",
    "fish & seafood": "fish",
    "meat": "meat",
    "meat & protein": "meat",
    "bread": "bread",
    "bread & bakery": "bread",
    "produce": "produce",
    "produce & fruit": "produce",
    "dry store": "dry-store",
    "dry storage": "dry-store",
    "frozen": "frozen",
    "ethnic": "ethnic",
    "ethnic & specialty": "ethnic",
    "wine & spirits": "wine-spirits",
    "wine": "wine-spirits",
    "agent": "agent",
    "cheese": "dry-store",
    "cheese & specialty": "dry-store",
}


def slug_port(name: str) -> str:
    name = re.sub(r"[^\w\s-]", "", name).strip().lower()
    # Take first hunk before "/" or "—" or "("
    name = re.split(r"[/—(]", name)[0].strip()
    return re.sub(r"\s+", "-", name)


def strip_md(s: str) -> str:
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)
    s = re.sub(r"\*([^*]+)\*", r"\1", s)
    return s.strip()


def split_suppliers(cell: str) -> list[str]:
    cell = strip_md(cell).strip()
    if not cell or cell in {"—", "-", "–", "N/A", "n/a"}:
        return []
    # Split on " / " or " or " — common separators in these tables.
    parts = re.split(r"\s+/\s+|\s+or\s+", cell)
    out = []
    for p in parts:
        # Drop parenthetical context for the name itself (keep it as a note).
        name = re.sub(r"\s*\([^)]*\)", "", p).strip()
        if name:
            out.append(name)
    return out


def parse_quick_map(block: str) -> list[dict]:
    """Parse one Quick Map table. Returns list of {category, online, in_person, tip}."""
    rows = []
    lines = block.splitlines()
    # Skip header + separator (first two table lines).
    body = []
    seen_sep = False
    in_table = False
    for line in lines:
        if line.strip().startswith("|"):
            in_table = True
            if re.match(r"^\|[\s:|-]+\|\s*$", line):
                seen_sep = True
                continue
            if seen_sep:
                body.append(line)
        elif in_table and not line.strip():
            break
    for row in body:
        cells = [c.strip() for c in row.strip().strip("|").split("|")]
        if len(cells) < 4:
            continue
        category_raw = strip_md(cells[0]).lower()
        category = CATEGORY_ALIASES.get(category_raw, category_raw)
        rows.append({
            "category": category,
            "category_raw": cells[0],
            "online": split_suppliers(cells[1]),
            "in_person": split_suppliers(cells[2]),
            "tip": strip_md(cells[3]) if len(cells) > 3 else "",
        })
    return rows


def extract_from_file(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    port_proposals: list[dict] = []

    # Chunk the document by `## <port>` headings.
    lines = text.splitlines()
    current_port: str | None = None
    current_block: list[str] = []
    blocks: list[tuple[str, str]] = []

    for line in lines:
        m = PORT_RE.match(line)
        if m:
            if current_port:
                blocks.append((current_port, "\n".join(current_block)))
            current_port = m.group(1).strip()
            current_block = []
        else:
            current_block.append(line)
    if current_port:
        blocks.append((current_port, "\n".join(current_block)))

    for port_name, block in blocks:
        # Skip non-port H2s (e.g. "Metro Card Logistics" etc.) — a port block
        # is expected to contain a Quick Map table.
        if not QUICK_MAP_HEADER_RE.search(block):
            continue
        qm_start = QUICK_MAP_HEADER_RE.search(block).end()
        rest = block[qm_start:]
        rows = parse_quick_map(rest)
        if not rows:
            continue
        port_slug = slug_port(port_name)
        for row in rows:
            for name in row["online"]:
                port_proposals.append({
                    "name": name,
                    "port": port_slug,
                    "category": row["category"],
                    "online_order": "unknown",
                    "channel_raw": "online",
                    "tip": row["tip"],
                    "port_display": port_name,
                    "category_raw": row["category_raw"],
                    "_source_file": path.name,
                })
            for name in row["in_person"]:
                port_proposals.append({
                    "name": name,
                    "port": port_slug,
                    "category": row["category"],
                    "online_order": "in-person",
                    "channel_raw": "in_person",
                    "tip": row["tip"],
                    "port_display": port_name,
                    "category_raw": row["category_raw"],
                    "_source_file": path.name,
                })
    return port_proposals


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*", help="Port Call draft/article markdown files")
    ap.add_argument("--merge", action="store_true", help="(not yet implemented) merge proposed into suppliers.json")
    args = ap.parse_args()

    if args.merge:
        print("Merge mode is intentionally not implemented. After reviewing suppliers-proposed.json,")
        print("hand-copy the entries you want into data/suppliers.json, filling markup_pct,")
        print("contact, lead_time_hours, and last_verified as you go.")
        return 1

    if not args.files:
        # Default: scan both the review folder and articles for Port Calls.
        args.files = []
        for d in [ROOT / "content" / "review", ROOT / "content" / "drafts", ROOT / "articles"]:
            for p in d.glob("*[Pp]ort*[Cc]all*.md") if d.exists() else []:
                args.files.append(str(p))
        for p in (ROOT / "content" / "review").glob("*provisioning*.md") if (ROOT / "content" / "review").exists() else []:
            args.files.append(str(p))
        args.files = sorted(set(args.files))
        if not args.files:
            print("no input files found and none passed — pass paths explicitly.", file=sys.stderr)
            return 2

    all_proposals: list[dict] = []
    for f in args.files:
        p = Path(f)
        if not p.exists():
            print(f"skip (not found): {f}", file=sys.stderr)
            continue
        extracted = extract_from_file(p)
        print(f"{p.name}: {len(extracted)} supplier mentions")
        all_proposals.extend(extracted)

    if not all_proposals:
        print("nothing extracted.")
        return 0

    PROPOSED_JSON.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "_meta": {
            "generated": datetime.today().strftime("%Y-%m-%d"),
            "generator": "scripts/extract-suppliers.py",
            "source_files": args.files,
            "note": (
                "DRY RUN OUTPUT. Review each entry before promoting to data/suppliers.json. "
                "Common cleanups required: (1) merge duplicates across ports, "
                "(2) fill markup_pct, lead_time_hours, contact, last_verified, "
                "(3) pick a single authoritative port slug when a supplier serves multiple ports, "
                "(4) discard false positives from tip cells."
            ),
            "count": len(all_proposals),
        },
        "proposed_entries": all_proposals,
    }
    PROPOSED_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\nwrote {PROPOSED_JSON}  ({len(all_proposals)} proposed entries)")
    print("→ review by hand, then copy entries into data/suppliers.json.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
