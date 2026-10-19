#!/usr/bin/env python3
"""Dump every card-like item of the old (GOLD2, tier-inventory) Costa Brava page to research/cards_old.json, keyed '<fold>:<name>':
the <article class="tcard"> cards (culture, walks, gems, drinks, music, events, producers, markets, dishes, street food, work spots,
avoid), the quarter paragraphs and the follow items. The page text is in research/guide_text_old.txt. Read from origin/rebuild/publishing-system."""
import re, json, subprocess, pathlib, html as H
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
s = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Costa-Brava-Catalunya/index.html"], cwd=REPO, capture_output=True, text=True, check=True).stdout
txt = lambda x: re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", x or ""))).strip()
out = {}
secs = [(m.group(2), m.start()) for m in re.finditer(r'<(section|details)\b[^>]*\bid="([^"]+)"', s)] + [("_end", len(s))]
for (fid, st), (_, en) in zip(secs, secs[1:]):
    blk = s[st:en]
    for m in re.finditer(r'<article\b([^>]*\bclass="tcard[^"]*"[^>]*)>(.*?)</article>', blk, re.S):
        c = m.group(2); g = lambda r: (re.search(r, c, re.S) or [None, ""])[1]
        name = txt(g(r'class="tcard__name-text">(.*?)</span>'))
        out[f"{fid}:{name}"] = {"fold": fid, "name": name, "type": txt(g(r'class="tcard__type">(.*?)</div>')),
                                "hook": txt(g(r'class="tcard__hook"[^>]*>(.*?)</div>')),
                                "chips": [txt(x) for x in re.findall(r'class="tcard__chip[^"]*">(.*?)</span>', c)],
                                "details": [[txt(a), txt(b)] for a, b in re.findall(r'<div><strong>(.*?)</strong>(.*?)</div>', c)],
                                "text": txt(g(r'<p class="tcard__body">(.*?)</p>')),
                                "maps": H.unescape(g(r'href="(https://www\.google\.com/maps[^"]+)"')),
                                "links": [H.unescape(u) for u in re.findall(r'href="(https?://[^"]+)"', c) if "google.com/maps" not in u]}
    if fid == "quartiers":
        for m in re.finditer(r"<(?:p|li)[^>]*>\s*<strong>(.*?)</strong>(.*?)</(?:p|li)>", blk, re.S):
            name = txt(m.group(1)).rstrip(" —-"); out[f"quartiers:{name}"] = {"fold": fid, "name": name, "text": txt(m.group(2)).lstrip("—– ")}
    if fid == "follow":
        body = blk[:blk.find("</details>")]
        for m in re.finditer(r'<div class="handle">(.*?)</div><div class="why">(.*?)</div>', body, re.S):
            name = txt(m.group(1)); out[f"follow:{name}"] = {"fold": fid, "name": name, "text": txt(m.group(2))}
json.dump(out, open(RV / "research/cards_old.json", "w"), ensure_ascii=False, indent=1)
from collections import Counter; print(len(out), "cards", Counter(v["fold"] for v in out.values()))
