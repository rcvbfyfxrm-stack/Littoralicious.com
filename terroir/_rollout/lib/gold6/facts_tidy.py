#!/usr/bin/env python3
"""Post-step (5 Oct 2026): tidy the labelled facts blocks — a value never repeats its own label
('Start: start metro Můstek' -> 'Start: Metro Můstek') and always begins with a capital. Idempotent."""
import re, sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text(); n = 0
def fix(m):
    global n
    dt, dd = m.group(1), m.group(2)
    v = re.sub(r"^" + re.escape(dt) + r"\s*:?\s+", "", dd, flags=re.I) if dt.lower() in ("start",) else dd
    if v[:1].islower(): v = v[0].upper() + v[1:]
    if v != dd: n += 1
    return f"<dt>{dt}</dt><dd>{v}</dd>"
s = re.sub(r"<dt>(.*?)</dt><dd>(.*?)</dd>", fix, s)
p.write_text(s); print(f"{p}: tidied {n} values")
