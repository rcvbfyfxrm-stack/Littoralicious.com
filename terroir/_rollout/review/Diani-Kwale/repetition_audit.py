#!/usr/bin/env python3
"""Told once (GOLD6 §6): exact sentences >=50 chars, and 4-word shingle overlaps >=12, between any two
units — fold cards, lane stories, gem popups, dish stories, venue why/hook, prose folds' paragraphs."""
import re, json, subprocess, html as H, itertools, pathlib, sys
R = pathlib.Path(__file__).resolve().parents[4]
doc = open(R / "terroir/Diani-Kwale/index.html").read()
D = json.loads(subprocess.run(["node", "-e", "global.window={};require('./terroir/data/Diani-Kwale.js');process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], cwd=R, capture_output=True, text=True).stdout)
clean = lambda s: re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", s))).strip()
U = {}
for m in re.finditer(r'<details class="fcard">(.*?)</details>', doc, re.S):
    n = re.search(r'fcard__name">(.*?)</span>', m.group(1)).group(1)
    body = re.sub(r'<dl class="fcard__facts">.*?</dl>', " ", m.group(1), flags=re.S)
    U["card:" + H.unescape(n)] = clean(body)
for c in D["CATEGORIES"]: U["lane:" + c["key"]] = clean(c["story"]["story"] if isinstance(c.get("story"), dict) else "")
for g in D["GEMS"]: U["gem:" + g["id"]] = clean(g["story"])
for v in D["VENUES"]: U["why:" + v["id"]] = clean((v.get("why") or "") + " " + (v.get("verdict") or ""))
for m in re.finditer(r'id="p-dish-(\d+)".*?tcard__why">(.*?)</div>', doc, re.S): U["dish:" + m.group(1)] = clean(m.group(2))
for fid in ("soul", "bougie", "money-sits", "avoid", "follow", "seasonal"):
    i = doc.find(f'id="{fid}"'); j = doc.find('<details class="sfold"', i + 10); seg = doc[i:j if j > 0 else i + 60000]
    for k, p in enumerate(re.findall(r"<(?:p|li|td)[^>]*>(.*?)</(?:p|li|td)>", seg, re.S)):
        t = clean(p)
        if len(t) > 80: U[f"{fid}:{k}"] = t
sent = {}
for k, t in U.items():
    for s in re.split(r"(?<=[.!?])\s+", t):
        if len(s) >= 50: sent.setdefault(s.lower(), set()).add(k)
hits = [(s, ks) for s, ks in sent.items() if len({x.split(':')[0] + x for x in ks}) > 1 and len(ks) > 1]
def sh(t):
    w = re.findall(r"[a-z0-9']+", t.lower()); return {" ".join(w[i:i + 4]) for i in range(len(w) - 3)}
S = {k: sh(t) for k, t in U.items()}
pairs = []
for a, b in itertools.combinations(U, 2):
    n = len(S[a] & S[b])
    if n >= 12: pairs.append((n, a, b))
print(f"units {len(U)} · exact-sentence repeats {len(hits)} · shingle pairs >=12: {len(pairs)}")
for s, ks in hits: print("  SENT", sorted(ks), "|", s[:120])
for n, a, b in sorted(pairs, reverse=True): print(f"  SHINGLE {n:3d} {a}  <->  {b}")
sys.exit(1 if (hits or pairs) else 0)
