#!/usr/bin/env python3
"""Dump every card of the old (GOLD3) Athens page to research/cards_old.json: fold cards (.fcard), the bar and
music articles and the ten dish articles, keyed '<fold>:<name>'. Read from origin/rebuild/publishing-system."""
import re, json, subprocess, pathlib, html as H
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
s = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Piraeus-Saronic/index.html"], cwd=REPO, capture_output=True, text=True, check=True).stdout
txt = lambda x: re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", x or ""))).strip()
out = {}
folds = [(m.group(1), m.start()) for m in re.finditer(r'<details class="sfold" id="([^"]+)"', s)] + [("_end", len(s))]
for (fid, st), (_, en) in zip(folds, folds[1:]):
    blk = s[st:en]; sub = None
    for m in re.finditer(r'<h4 class="fsub__title">(.*?)</h4>|<details class="fcard"[^>]*>(.*?)</details>|<article class="tcard[^"]*"[^>]*id="([^"]+)"[^>]*>(.*?)</article>', blk, re.S):
        if m.group(1) is not None: sub = txt(m.group(1)); continue
        if m.group(2) is not None:
            c = m.group(2); g = lambda r: (re.search(r, c, re.S) or [None, ""])[1]
            name = txt(g(r'class="fcard__name">(.*?)</span>'))
            out[f"{fid}:{name}"] = {"fold": fid, "group": sub, "name": name, "tag": txt(g(r'class="fcard__tag">(.*?)</span>')),
                                    "teaser": txt(g(r'class="fcard__teaser">(.*?)</span>')), "text": txt(g(r'<div class="fcard__body"><p>(.*?)</p>')),
                                    "meta": txt(g(r'class="fcard__meta">(.*?)</div>')), "maps": H.unescape(g(r'class="fcard__map" href="([^"]+)"'))}
        else:
            c = m.group(4); g = lambda r: (re.search(r, c, re.S) or [None, ""])[1]
            name = txt(g(r'class="tcard__name-text">(.*?)</span>'))
            hooks = re.findall(r'<div class="tcard__hook"[^>]*>(.*?)</div>', c, re.S)
            out[f"{fid}:{name}"] = {"fold": fid, "id": m.group(3), "name": name, "type": txt(g(r'class="tcard__type">(.*?)</div>')),
                                    "label": txt(g(r'class="tcard__label">(.*?)</span>')), "teaser": txt(hooks[0]) if hooks else "",
                                    "chips": [txt(x) for x in re.findall(r'class="tcard__chip[^"]*">(.*?)</span>', c)],
                                    "text": txt(g(r'<p class="tcard__body">(.*?)</p>')), "extra": [txt(x) for x in hooks[1:] if "Google Maps" not in x],
                                    "maps": H.unescape(g(r'href="(https://www\.google\.com/maps[^"]+)"'))}
json.dump(out, open(RV / "research/cards_old.json", "w"), ensure_ascii=False, indent=1)
print(len(out), "cards"); from collections import Counter; print(Counter(v["fold"] for v in out.values()))
