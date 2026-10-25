#!/usr/bin/env python3
"""Dump every card of the old (pre-GOLD2, tier-inventory) beaune-bourgogne page to research/cards_old.json — every
<article class="tcard"> keyed '<fold>:<name>' with its full text — and the whole page as text to research/guide_text_old.txt.
Read from origin/rebuild/publishing-system."""
import re, json, subprocess, pathlib, html as H
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
s = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/beaune-bourgogne/index.html"], cwd=REPO, capture_output=True, text=True, check=True).stdout
txt = lambda x: re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", x or ""))).strip()
out = {}
secs = [(m.group(2), m.start()) for m in re.finditer(r'<(section|details)\b[^>]*\bid="([^"]+)"', s) if not m.group(2).startswith(("p-", "o-"))] + [("_end", len(s))]
lines = []
for (fid, st), (_, en) in zip(secs, secs[1:]):
    blk = s[st:en]
    lines.append(f"\n[{fid}]\n" + txt(re.sub(r"<article.*?</article>", " ", blk, flags=re.S))[:20000])
    for m in re.finditer(r'<article\b([^>]*\bclass="tcard[^"]*"[^>]*)>(.*?)</article>', blk, re.S):
        c = m.group(2); g = lambda r: (re.search(r, c, re.S) or [None, ""])[1]
        name = txt(g(r'class="tcard__name-text">(.*?)</span>')) or txt(g(r'class="tcard__name"[^>]*>(.*?)</h3>'))
        aid = (re.search(r'\bid="([^"]+)"', m.group(1)) or [None, ""])[1]
        out[f"{fid}:{name}"] = {"fold": fid, "id": aid, "name": name, "type": txt(g(r'class="tcard__type">(.*?)</div>')),
                                "label": txt(g(r'class="tcard__label">(.*?)</span>')),
                                "hook": txt(g(r'class="tcard__hook"[^>]*>(.*?)</div>')),
                                "chips": [txt(x) for x in re.findall(r'class="tcard__chip[^"]*">(.*?)</span>', c)],
                                "text": txt(re.sub(r'<div class="tcard__(?:rank|type|actions)".*?</div>|<h3.*?</h3>', " ", c, flags=re.S)),
                                "maps": H.unescape(g(r'href="(https://www\.google\.com/maps[^"]+)"')),
                                "links": [H.unescape(u) for u in re.findall(r'href="(https?://[^"]+)"', c) if "google.com/maps" not in u]}
        lines.append(f"  <card {fid}:{name}> " + out[f"{fid}:{name}"]["text"])
json.dump(out, open(RV / "research/cards_old.json", "w"), ensure_ascii=False, indent=1)
open(RV / "research/guide_text_old.txt", "w").write("\n".join(lines))
from collections import Counter; print(len(out), "cards", Counter(v["fold"] for v in out.values()))
