"""Shared frontmatter parser, used by dna-lint.py and md-to-html.py."""
from __future__ import annotations

import re

_FM_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)


def parse_frontmatter(raw: str) -> tuple[dict, str]:
    m = _FM_RE.match(raw)
    if not m:
        return {}, raw
    fm_raw, body = m.group(1), m.group(2)
    fm: dict = {}
    current_key = None
    for line in fm_raw.splitlines():
        if not line.strip():
            continue
        if line.startswith(" ") and current_key and isinstance(fm.get(current_key), dict):
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
