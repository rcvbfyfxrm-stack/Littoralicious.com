#!/usr/bin/env python3
"""
Stale-draft audit — classifies the "retire candidates" from
logs/review-status.html as:

  PUBLISH : still valid, ship as-is or with trivial polish
  REFRESH : good bones, needs a targeted update before publishing
  ARCHIVE : outdated / abandoned, move to content/_archive

Input of record is review-status.html (produced by build-review-dashboard.py).
That dashboard buckets anything >60d old as "retire" — far too harsh.
This script takes the retire bucket and applies real signals to say
whether each is actually dead or just sitting.

Does NOT move or delete anything. Writes logs/audit-drafts-<date>.md.
"""
from __future__ import annotations
import re, sys, datetime as dt
from pathlib import Path
from html.parser import HTMLParser

ROOT   = Path(__file__).resolve().parent.parent
REVIEW = ROOT / "content" / "review"
DRAFTS = ROOT / "content" / "drafts"
LOGS   = ROOT / "logs"
DASH   = LOGS / "review-status.html"
TODAY  = dt.date.today()

SEASON_RE = re.compile(r"\b(this season|last season|winter|spring|summer|autumn|fall)\s+20\d{2}\b", re.I)
DATED_YEAR = re.compile(r"\b(20[12][0-9])\b")
DATED_EVENT = re.compile(r"\b(mibs|monaco yacht show|fort lauderdale boat show|boot düsseldorf|antigua charter show)\s+20\d{2}\b", re.I)
NAME_RE = re.compile(r"\b(?:Chef|Captain)\s+[A-Z][a-z]+\b")  # named chef → anonymisation debt
PRICE_RE = re.compile(r"[€$£]\s?\d{1,4}")
TODO_RE  = re.compile(r"\b(TODO|TBD|XXX|FIXME|\[?\[draft\]?\]?|placeholder)\b", re.I)


# ---- parse review-status.html retire bucket --------------------------------

class RetireExtractor(HTMLParser):
    """Walk the HTML; pick table rows under the 'Retire candidates' section."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.section = None           # current section title
        self._in_h2 = False
        self._in_code = False
        self._in_row = False
        self._in_cell = False
        self._cells: list[str] = []
        self._buf = ""
        self.retire: list[dict] = []
        self._first_cell_code = ""

    def handle_starttag(self, tag, attrs):
        if tag == "h2":               self._in_h2 = True; self._buf = ""
        elif tag == "tr" and self.section == "retire":
            self._in_row = True; self._cells = []; self._first_cell_code = ""
        elif tag == "td" and self._in_row:
            self._in_cell = True; self._buf = ""
        elif tag == "code" and self._in_cell:
            self._in_code = True

    def handle_endtag(self, tag):
        if tag == "h2":
            t = self._buf.strip().lower()
            if "retire" in t:          self.section = "retire"
            elif "ready" in t or "quick" in t or "needs work" in t: self.section = None
            self._in_h2 = False
        elif tag == "code":
            self._in_code = False
        elif tag == "td" and self._in_row:
            self._cells.append(self._buf.strip()); self._in_cell = False
        elif tag == "tr" and self._in_row:
            if self._cells and self._cells[0]:
                self.retire.append({
                    "file":     self._cells[0],
                    "title":    self._cells[1] if len(self._cells) > 1 else "",
                    "category": self._cells[2] if len(self._cells) > 2 else "",
                    "words":    self._cells[4] if len(self._cells) > 4 else "",
                    "age":      self._cells[5] if len(self._cells) > 5 else "",
                    "lint":     self._cells[7] if len(self._cells) > 7 else "",
                })
            self._in_row = False

    def handle_data(self, data):
        if self._in_h2 or self._in_cell: self._buf += data


def parse_retire() -> list[dict]:
    if not DASH.exists():
        sys.exit(f"review dashboard not found — run scripts/build-review-dashboard.py first\n  expected: {DASH}")
    p = RetireExtractor(); p.feed(DASH.read_text(errors="ignore"))
    return p.retire


# ---- classifier -------------------------------------------------------------

def find_file(name: str) -> Path | None:
    for base in (REVIEW, DRAFTS):
        p = base / name
        if p.exists(): return p
    # fuzzy: dashboard shows filename but location may vary
    for base in (REVIEW, DRAFTS):
        for p in base.rglob(name):
            return p
    return None


def classify(row: dict) -> tuple[str, list[str]]:
    path = find_file(row["file"])
    reasons: list[str] = []
    if not path:
        return "ARCHIVE", ["file-not-found"]

    try:
        txt = path.read_text(errors="ignore")
    except Exception as e:
        return "ARCHIVE", [f"unreadable: {e}"]

    words = len(txt.split())
    age   = int(re.sub(r"\D", "", row.get("age") or "0") or 0)
    lint  = (row.get("lint") or "").upper()

    seasoned = bool(SEASON_RE.search(txt))
    dated_event = bool(DATED_EVENT.search(txt))
    has_todo    = bool(TODO_RE.search(txt))
    named       = bool(NAME_RE.search(txt))
    has_year    = bool(DATED_YEAR.search(txt))
    priced      = len(PRICE_RE.findall(txt))

    reasons.append(f"words={words} age={age}d lint={lint or '—'}")
    if seasoned:      reasons.append("season-specific")
    if dated_event:   reasons.append("dated-event-ref")
    if has_todo:      reasons.append("TODO/TBD markers")
    if named:         reasons.append("named-person (anonymise)")
    if priced >= 5:   reasons.append(f"{priced} price refs (decay)")
    if has_year:      reasons.append("year-stamped")

    # ARCHIVE: genuinely dead
    if words < 150:                                  return "ARCHIVE", reasons + ["too-short"]
    if has_todo and words < 400:                     return "ARCHIVE", reasons + ["skeleton-with-todos"]
    if seasoned and age > 180:                       return "ARCHIVE", reasons + ["stale-seasonal"]

    # REFRESH: good bones, needs targeted update
    refresh_signals = sum([seasoned, dated_event, has_todo, named and words > 400,
                           priced >= 5, lint == "FAIL"])
    if refresh_signals >= 2:                         return "REFRESH", reasons

    # PUBLISH: age alone is not a reason to retire
    if lint == "PASS" and not has_todo:              return "PUBLISH", reasons
    if words >= 600 and not has_todo and not seasoned: return "PUBLISH", reasons

    return "REFRESH", reasons


# ---- report -----------------------------------------------------------------

def main() -> int:
    rows = parse_retire()
    if not rows:
        print("no retire candidates parsed — check dashboard format", file=sys.stderr)
        return 1

    buckets: dict[str, list[tuple[dict, list[str]]]] = {"PUBLISH": [], "REFRESH": [], "ARCHIVE": []}
    for r in rows:
        verdict, reasons = classify(r)
        buckets[verdict].append((r, reasons))

    out = [f"# Stale-draft audit — {TODAY}",
           "",
           f"Source: `logs/review-status.html` retire bucket ({len(rows)} candidates).",
           "Classification only — no files moved.",
           ""]
    for b in ("PUBLISH", "REFRESH", "ARCHIVE"):
        out.append(f"## {b} ({len(buckets[b])})"); out.append("")
        for r, reasons in buckets[b]:
            title = r.get("title") or ""
            title = f" — {title}" if title else ""
            out.append(f"- `{r['file']}`{title}")
            out.append(f"  - {', '.join(reasons)}")
        if not buckets[b]: out.append("_none_")
        out.append("")

    report = LOGS / f"audit-drafts-{TODAY}.md"
    report.write_text("\n".join(out))
    print(f"wrote {report}")
    print(f"  PUBLISH={len(buckets['PUBLISH'])}  REFRESH={len(buckets['REFRESH'])}  ARCHIVE={len(buckets['ARCHIVE'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
