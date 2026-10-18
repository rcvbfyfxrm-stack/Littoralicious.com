#!/usr/bin/env python3
"""Dump every card-like item of the old (GOLD2, tier-inventory) Cadaqués page to research/cards_old.json, keyed '<fold>:<name>':
the <article class="tcard"> cards (walks, culture, producers, drinks, music, cafés, dishes), the cove list items, the quarter
paragraphs, the warnings and the follow items. The page text is in research/guide_text_old.txt. Read from origin/rebuild/publishing-system."""
import re, json, subprocess, pathlib, html as H
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
s = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Cadaques-CapdeCreus/index.html"], cwd=REPO, capture_output=True, text=True, check=True).stdout
txt = lambda x: re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", x or ""))).strip()
out = {}
secs = [(m.group(2), m.start()) for m in re.finditer(r'<(section|details)\b[^>]*\bid="([^"]+)"', s)] + [("_end", len(s))]
for (fid, st), (_, en) in zip(secs, secs[1:]):
    blk = s[st:en]
    for m in re.finditer(r'<article\b([^>]*\bclass="tcard[^"]*"[^>]*)>(.*?)</article>', blk, re.S):
        c = m.group(2); g = lambda r: (re.search(r, c, re.S) or [None, ""])[1]
        name = txt(g(r'class="tcard__name-text">(.*?)</span>')) or txt(g(r'class="tcard__name"[^>]*>(.*?)</h3>'))
        out[f"{fid}:{name}"] = {"fold": fid, "name": name, "type": txt(g(r'class="tcard__type">(.*?)</div>')),
                                "label": txt(g(r'class="tcard__label">(.*?)</span>')),
                                "hook": txt(g(r'class="tcard__hook"[^>]*>(.*?)</div>')),
                                "chips": [txt(x) for x in re.findall(r'class="tcard__chip[^"]*">(.*?)</span>', c)],
                                "text": txt(re.sub(r'<div class="tcard__(?:rank|type)".*?</div>|<h3.*?</h3>', " ", c, flags=re.S)),
                                "maps": H.unescape(g(r'href="(https://www\.google\.com/maps[^"]+)"')),
                                "links": [H.unescape(u) for u in re.findall(r'href="(https?://[^"]+)"', c) if "google.com/maps" not in u]}
    if fid == "calas":
        for m in re.finditer(r"<li><strong>(.*?)</strong>(.*?)</li>", blk, re.S):
            name = txt(m.group(1)); out[f"calas:{name}"] = {"fold": "calas", "name": name, "text": txt(m.group(2)),
                                                           "maps": H.unescape((re.search(r'href="(https://www\.google\.com/maps[^"]+)"', m.group(2)) or [None, ""])[1])}
    if fid in ("quartiers", "avoid", "follow"):
        body = blk[:blk.find("</section>") if fid != "follow" else blk.find("</details>")]
        for m in re.finditer(r"<(?:p|li)>\s*<strong>(.*?)</strong>(.*?)</(?:p|li)>", body, re.S):
            name = txt(m.group(1)).rstrip(" —-"); out[f"{fid}:{name}"] = {"fold": fid, "name": name, "text": txt(m.group(2)).lstrip("—– ")}
json.dump(out, open(RV / "research/cards_old.json", "w"), ensure_ascii=False, indent=1)
from collections import Counter; print(len(out), "cards", Counter(v["fold"] for v in out.values()))
