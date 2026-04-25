#!/usr/bin/env python3
"""
Ingest a WhatsApp `.txt` export into structured, tagged markdown per topic.

Goal: eliminate manual transcription. The existing
`content/article-ideas-from-whatsapp.md` (497 lines) was hand-curated from
~24,000 messages. Future refreshes should be one command.

Output layout:
    content/whatsapp-intel/YYYY-MM/
        index.md           — overview of the month
        provisioning.md    — messages matching provisioning keywords
        allergens.md       — messages matching allergen keywords
        equipment.md       — galley equipment discussions
        visa-regs.md       — visa/regulation discussions
        salary-pay.md      — salary / pay / tip discussions
        uncategorised.md   — everything else, with inferred topic tags

Anonymisation: all sender names are replaced with "one chef", "another chef",
"a crew member" — per the hard rule "never use names from WhatsApp in
published content". Raw names are kept only in the private index for
traceability, never in the per-topic files.

Usage:
    python3 scripts/ingest-whatsapp.py <path/to/chat.txt> [--group "Chefs Helping Chefs"]

Safe to re-run — it writes to a YYYY-MM directory, so monthly exports stay
separated.
"""
from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_ROOT = ROOT / "content" / "whatsapp-intel"

# WhatsApp export line format (iOS / Android variants combined):
#   [DD/MM/YYYY, HH:MM:SS] Sender: Message
#   DD/MM/YY, HH:MM - Sender: Message
LINE_RE = re.compile(
    r"""
    ^\[?
    (?P<date>\d{1,2}[/.]\d{1,2}[/.]\d{2,4})
    [,\s]+
    (?P<time>\d{1,2}:\d{2}(?::\d{2})?)
    \]?\s*[-–]?\s*
    (?P<sender>[^:]{1,60}):\s(?P<message>.*)$
    """,
    re.VERBOSE,
)

TOPIC_KEYWORDS = {
    "provisioning": [
        "provision", "supplier", "market", "fishmonger", "butcher",
        "rungis", "mercamadrid", "mercabarna", "delivery", "wholesale",
        "marina", "agent", "port call", "chandler",
    ],
    "allergens": [
        "allerg", "gluten", "nut allergy", "shellfish", "dairy free",
        "lactose", "epipen", "coeliac", "celiac", "anaphyla",
    ],
    "equipment": [
        "rational", "convotherm", "pacojet", "thermomix", "kitchenaid",
        "knife", "blast chiller", "vacpac", "sous vide", "combi oven",
        "induction", "hob", "galley layout", "mise",
    ],
    "visa-regs": [
        "b1/b2", "b1 b2", "visa", "stcw", "mca", "eng1", "ship's cook",
        "seafarer", "immigration", "customs", "ice", "work permit",
    ],
    "salary-pay": [
        "salary", "wage", "pay rate", "€/month", "$/month", "usd/month",
        "rotation", "leave", "tip", "gratuity", "contract",
    ],
    "culinary-courses": [
        "course", "stage", "certification", "le cordon bleu", "ferrandi",
        "cia", "tsuji", "culinary school", "masterclass", "seminar",
    ],
    "sourdough": ["sourdough", "starter", "levain", "fermentation"],
}

ANON_MAP: dict[str, str] = {}
ANON_COUNTER = [0]


def anonymise(sender: str) -> str:
    key = sender.strip().lower()
    if key not in ANON_MAP:
        ANON_COUNTER[0] += 1
        n = ANON_COUNTER[0]
        ANON_MAP[key] = "one chef" if n == 1 else f"another chef ({n})"
    return ANON_MAP[key]


def classify(message: str) -> list[str]:
    lo = message.lower()
    topics = [t for t, kws in TOPIC_KEYWORDS.items() if any(k in lo for k in kws)]
    return topics or ["uncategorised"]


def parse_export(path: Path) -> list[dict]:
    """Returns a list of message dicts. Handles multi-line messages by
    appending continuation lines to the previous message."""
    messages: list[dict] = []
    current: dict | None = None
    for raw in path.read_text(encoding="utf-8", errors="replace").splitlines():
        m = LINE_RE.match(raw)
        if m:
            if current:
                messages.append(current)
            current = {
                "date": m.group("date"),
                "time": m.group("time"),
                "sender_raw": m.group("sender").strip(),
                "sender": anonymise(m.group("sender")),
                "text": m.group("message").strip(),
            }
        else:
            if current and raw.strip():
                current["text"] += "\n" + raw.strip()
    if current:
        messages.append(current)
    return messages


def month_of(date_str: str) -> str:
    """Best-effort YYYY-MM from the first date we see."""
    for fmt in ("%d/%m/%Y", "%d/%m/%y", "%d.%m.%Y", "%d.%m.%y"):
        try:
            d = datetime.strptime(date_str, fmt)
            return d.strftime("%Y-%m")
        except ValueError:
            continue
    return datetime.today().strftime("%Y-%m")


def write_topic_file(
    out_dir: Path, topic: str, entries: list[dict], group_name: str
) -> None:
    path = out_dir / f"{topic}.md"
    lines = [
        f"# {topic.replace('-', ' ').title()} — WhatsApp intel",
        "",
        f"Source: `{group_name}`  |  Messages: {len(entries)}",
        "",
        "_Names anonymised per editorial rule._",
        "",
    ]
    for e in entries:
        lines.append(f"### {e['date']} {e['time']} — {e['sender']}")
        lines.append("")
        lines.append(e["text"].replace("\n", "  \n"))
        lines.append("")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("export", help="Path to WhatsApp .txt export")
    ap.add_argument("--group", default="WhatsApp group")
    args = ap.parse_args()

    src = Path(args.export)
    if not src.exists():
        print(f"not found: {src}", file=sys.stderr)
        return 2

    messages = parse_export(src)
    if not messages:
        print("parsed 0 messages — check export format.", file=sys.stderr)
        return 3

    month = month_of(messages[0]["date"])
    out_dir = OUT_ROOT / month
    out_dir.mkdir(parents=True, exist_ok=True)

    by_topic: dict[str, list[dict]] = defaultdict(list)
    for m in messages:
        for t in classify(m["text"]):
            by_topic[t].append(m)

    # Index (private — contains the raw → anon mapping for traceability).
    index_path = out_dir / "index.md"
    index_lines = [
        f"# WhatsApp Intel — {month}",
        "",
        f"Source: `{args.group}`",
        f"Ingested from: `{src.name}`  on  {datetime.today():%Y-%m-%d}",
        f"Total messages: {len(messages)}",
        "",
        "## Topic summary",
        "",
    ]
    for topic, entries in sorted(by_topic.items(), key=lambda x: -len(x[1])):
        index_lines.append(f"- **{topic}** — {len(entries)} messages → [`{topic}.md`]({topic}.md)")
    index_lines += [
        "",
        "## Anonymisation map (private — do NOT commit to public repo)",
        "",
    ]
    for raw, anon in sorted(ANON_MAP.items()):
        index_lines.append(f"- `{raw}` → {anon}")
    index_path.write_text("\n".join(index_lines) + "\n", encoding="utf-8")

    # Per-topic files.
    for topic, entries in by_topic.items():
        write_topic_file(out_dir, topic, entries, args.group)

    print(f"wrote {out_dir}/")
    for topic, entries in sorted(by_topic.items(), key=lambda x: -len(x[1])):
        print(f"  {topic}: {len(entries)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
