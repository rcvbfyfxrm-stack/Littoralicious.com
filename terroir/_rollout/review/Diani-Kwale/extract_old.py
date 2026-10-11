#!/usr/bin/env python3
"""Dump the OLD Diani-Kwale fold cards (from origin/rebuild/publishing-system) to research/cards_old.json,
keyed 'section|name', with text, tag, teaser, body text, links. Read-only helper, 11 Oct 2026."""
import json, re, subprocess, pathlib, html as H
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Diani-Kwale/index.html"], cwd=REPO, capture_output=True, text=True, check=True).stdout
def txt(s): return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", s))).strip()
out = {}
for m in re.finditer(r'<details class="sfold" id="([^"]+)"', OLD):
    sid = m.group(1); st = m.start()
    # find end of this sfold: next '<details class="sfold"' or gx-tail
    nx = OLD.find('<details class="sfold"', st + 10); en = nx if nx > 0 else len(OLD)
    seg = OLD[st:en]
    grp = None
    for x in re.finditer(r'<h4 class="fsub__title">(.*?)</h4>|<details class="fcard"[^>]*>(.*?)</details>', seg, re.S):
        if x.group(1) is not None: grp = txt(x.group(1)); continue
        b = x.group(2)
        g = lambda c: (re.search(rf'class="{c}"[^>]*>(.*?)</(?:span|p|div|a)>', b, re.S) or [None, ""])[1]
        name = txt(g("fcard__name"))
        body = b[b.find("</summary>"):]
        out[f"{sid}|{name}"] = {"section": sid, "group": grp, "name": name, "tag": txt(g("fcard__tag")), "teaser": txt(g("fcard__teaser")),
            "body": txt(re.sub(r'<a class="fcard__map".*?</a>', "", body, flags=re.S)),
            "links": re.findall(r'href="([^"]+)"', body), "pins": re.findall(r'data-pin="([^"]+)"', b)}
json.dump(out, open(RV / "research" / "cards_old.json", "w"), ensure_ascii=False, indent=1)
from collections import defaultdict
c = defaultdict(lambda: defaultdict(list))
for k, v in out.items(): c[v["section"]][v["group"]].append(v["name"])
for s, gs in c.items():
    print(f"## {s} ({sum(len(x) for x in gs.values())})")
    for g, ns in gs.items(): print(f"   [{len(ns)}] {g}: " + " · ".join(ns))
