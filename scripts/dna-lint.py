#!/usr/bin/env python3
"""
DNA Lint — mechanical portion of the Littoralicious DNA check.

This is the fast, deterministic layer. The Claude agent at
`.claude/agents/dna-lint.md` handles the judgment layer (three-pillar balance,
11 PM Chef Test) when invoked from the `/publish-article` skill.

Usage:
    python3 scripts/dna-lint.py <path/to/draft.md>

Exit codes:
    0 — PASS (no hard failures)
    1 — FAIL (one or more hard failures)
    2 — I/O error (file not found, bad frontmatter, etc.)
"""
from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

# ---------------------------------------------------------------------------
# Rules
# ---------------------------------------------------------------------------

BANNED_WORDS = [
    "delicious",
    "yummy",
    "mouthwatering",
    "elevated",
    "curated",
    "superfood",
    "game-changer",
    "game changer",
    "hack",
]
# "artisanal" is only banned as a marketing adjective; leave to the agent.

REQUIRED_FRONTMATTER = {"title", "date", "category", "tags", "read_time", "template", "status"}

# Template word-count envelopes (low, high). None = "no strict limit".
TEMPLATE_ENVELOPES = {
    "01": (700, 900),       # Shore Larder
    "01b": (1200, 2500),    # Shore Larder Deep-Dive
    "02": (None, None),     # The Method — no limit (concise)
    "03": (None, None),     # Littoral Heritage — no limit
    "04": (200, 300),       # The Evidence
    "05": (1500, 3500),     # Blueprint (8–15 min read)
    "06": (500, 800),       # Signal Fire
    "07": (200, 400),       # The Horizon
    "08": (250, 500),       # Trade Winds
    "09": (150, 250),       # Tight Ship
    "10": (2500, 4000),     # Port Call
    "11": (2500, 4000),     # The Locker
    "12": (1500, 2500),     # Weekly Brief
    "13": (None, None),     # The Lab — experimental
}


# ---------------------------------------------------------------------------
# Parsing
# ---------------------------------------------------------------------------

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)


@dataclass
class LintFinding:
    severity: str  # "HARD" | "WARN"
    line: int | None
    kind: str
    detail: str


@dataclass
class LintResult:
    path: Path
    template: str | None = None
    word_count: int = 0
    envelope: tuple[int | None, int | None] = (None, None)
    findings: list[LintFinding] = field(default_factory=list)

    @property
    def hard_failures(self) -> list[LintFinding]:
        return [f for f in self.findings if f.severity == "HARD"]

    @property
    def warnings(self) -> list[LintFinding]:
        return [f for f in self.findings if f.severity == "WARN"]

    @property
    def status(self) -> str:
        if self.hard_failures:
            return "FAIL"
        if self.warnings:
            return "PASS-WITH-WARNINGS"
        return "PASS"


def parse_frontmatter(raw: str) -> tuple[dict, str]:
    """Return (frontmatter_dict, body). Minimal YAML — no nested objects."""
    m = FRONTMATTER_RE.match(raw)
    if not m:
        return {}, raw
    fm_raw, body = m.group(1), m.group(2)
    fm: dict = {}
    current_key = None
    for line in fm_raw.splitlines():
        if not line.strip():
            continue
        if line.startswith(" ") and current_key:
            # Nested line — collect into dict on current_key if that's a dict.
            if isinstance(fm.get(current_key), dict):
                k, _, v = line.strip().partition(":")
                fm[current_key][k.strip()] = v.strip().strip('"')
            continue
        key, _, value = line.partition(":")
        key = key.strip()
        value = value.strip()
        current_key = key
        if not value:
            fm[key] = {}
        elif value.startswith("[") and value.endswith("]"):
            fm[key] = [v.strip().strip('"') for v in value[1:-1].split(",") if v.strip()]
        else:
            fm[key] = value.strip('"')
    return fm, body


def body_word_count(body: str) -> int:
    # Strip code fences and tables for a more honest count.
    body = re.sub(r"```.*?```", "", body, flags=re.DOTALL)
    body = re.sub(r"^\|.*\|$", "", body, flags=re.MULTILINE)
    body = re.sub(r"[#*_`>\[\]()]", " ", body)
    words = re.findall(r"\b[\w'-]+\b", body)
    return len(words)


# ---------------------------------------------------------------------------
# Checks
# ---------------------------------------------------------------------------

def check_banned_words(body: str, result: LintResult) -> None:
    for lineno, line in enumerate(body.splitlines(), start=1):
        lower = line.lower()
        for word in BANNED_WORDS:
            pattern = r"\b" + re.escape(word) + r"\b"
            if re.search(pattern, lower):
                result.findings.append(
                    LintFinding("HARD", lineno, "banned-word", f'"{word}" → {line.strip()[:80]}')
                )


def check_frontmatter(fm: dict, result: LintResult) -> None:
    missing = REQUIRED_FRONTMATTER - set(fm.keys())
    for field_name in sorted(missing):
        result.findings.append(
            LintFinding("HARD", None, "missing-frontmatter", f"required field: {field_name}")
        )
    tpl = str(fm.get("template", "")).strip()
    if tpl and tpl not in TEMPLATE_ENVELOPES:
        result.findings.append(
            LintFinding("WARN", None, "unknown-template", f"template={tpl} not in envelope map")
        )


def check_word_count(result: LintResult) -> None:
    low, high = result.envelope
    if low is None and high is None:
        return
    if low and result.word_count < int(low * 0.8):
        result.findings.append(
            LintFinding("WARN", None, "under-word-count",
                        f"{result.word_count} words, envelope {low}-{high}")
        )
    if high and result.word_count > int(high * 1.2):
        result.findings.append(
            LintFinding("WARN", None, "over-word-count",
                        f"{result.word_count} words, envelope {low}-{high}")
        )


def check_metric_units(body: str, result: LintResult) -> None:
    for lineno, line in enumerate(body.splitlines(), start=1):
        # °F without °C nearby
        if re.search(r"\b\d+\s*°?F\b", line) and not re.search(r"°C|\bC\b", line):
            result.findings.append(
                LintFinding("WARN", lineno, "imperial-only-temp", line.strip()[:80])
            )
        # oz / lb without g / kg nearby
        if re.search(r"\b\d+\s*(oz|lb|lbs|pound)s?\b", line, re.IGNORECASE) and not re.search(
            r"\b\d+\s*(g|kg|gram|kilogram)s?\b", line, re.IGNORECASE
        ):
            result.findings.append(
                LintFinding("WARN", lineno, "imperial-only-weight", line.strip()[:80])
            )


def check_structure(body: str, result: LintResult) -> None:
    if result.word_count > 400:
        h2_count = len(re.findall(r"^## ", body, re.MULTILINE))
        if h2_count < 3:
            result.findings.append(
                LintFinding("WARN", None, "thin-structure",
                            f"{h2_count} H2 sections for {result.word_count} words (want ≥3)")
            )


# ---------------------------------------------------------------------------
# Entry
# ---------------------------------------------------------------------------

def lint_file(path: Path) -> LintResult:
    raw = path.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(raw)
    result = LintResult(path=path)
    result.template = str(fm.get("template", "")).strip() or None
    result.word_count = body_word_count(body)
    if result.template in TEMPLATE_ENVELOPES:
        result.envelope = TEMPLATE_ENVELOPES[result.template]

    check_frontmatter(fm, result)
    check_banned_words(body, result)
    check_word_count(result)
    check_metric_units(body, result)
    check_structure(body, result)
    return result


def format_report(result: LintResult) -> str:
    lines = []
    lines.append(f"LITTORALICIOUS DNA LINT — {result.path.name}")
    if result.template:
        lines.append(f"Template: {result.template}")
    low, high = result.envelope
    env = f"{low}-{high}" if (low or high) else "no strict limit"
    lines.append(f"Word count: {result.word_count} (envelope: {env})")
    lines.append(f"Status: {result.status}")
    lines.append("")
    lines.append(f"HARD FAILURES ({len(result.hard_failures)}):")
    for f in result.hard_failures:
        loc = f"L{f.line}" if f.line else "—"
        lines.append(f"  - {loc} [{f.kind}]: {f.detail}")
    if not result.hard_failures:
        lines.append("  (none)")
    lines.append("")
    lines.append(f"SOFT WARNINGS ({len(result.warnings)}):")
    for f in result.warnings:
        loc = f"L{f.line}" if f.line else "—"
        lines.append(f"  - {loc} [{f.kind}]: {f.detail}")
    if not result.warnings:
        lines.append("  (none)")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description="Lint a Littoralicious draft against DNA.")
    ap.add_argument("path", help="Path to draft markdown file")
    ap.add_argument("--quiet", action="store_true", help="Only print on FAIL")
    args = ap.parse_args()

    path = Path(args.path)
    if not path.exists():
        print(f"dna-lint: file not found: {path}", file=sys.stderr)
        return 2

    result = lint_file(path)
    if not args.quiet or result.status == "FAIL":
        print(format_report(result))
    return 1 if result.status == "FAIL" else 0


if __name__ == "__main__":
    sys.exit(main())
