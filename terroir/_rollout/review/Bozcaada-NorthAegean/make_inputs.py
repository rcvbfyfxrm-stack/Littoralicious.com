#!/usr/bin/env python3
"""Assemble cards.json, venues.json, lane_stories.json and hot_events.json for build_gold6.py from the research and rewrite
packs (research/), plus the editor's reconciliations in fixes.py. 27 Oct 2026.
STATUS RULE (honest): the 27 Oct re-check could not load any venue's own site (the sandbox egress proxy refuses every external
host), only search results. 2026-dated evidence -> confirmed, checked 2026-10-27; otherwise unverified, or as found."""
import json, pathlib, sys
RV = pathlib.Path(__file__).resolve().parent; R = RV / "research"; sys.path.insert(0, str(RV))
J = lambda p: json.load(open(p))
PICKS = J(RV / "picks.json")
KEEP = [i for l in PICKS["lanes"].values() for i in l["ids"]] + PICKS["keep_pins"]
import fixes
CARDS = {}
for n in (1, 2, 3):
    CARDS.update({k: v for k, v in J(R / f"rewrite_{n}.json").items() if not k.startswith("_")})
fixes.cards(CARDS)
json.dump(CARDS, open(RV / "cards.json", "w"), ensure_ascii=False, indent=1)
HOT = J(R / "hot_events.json")
fixes.hot(HOT)
json.dump(HOT, open(RV / "hot_events.json", "w"), ensure_ascii=False, indent=1)
VER, LS = {}, {}
for n in (1, 2):
    p = J(R / f"verify_{n}.json")
    VER.update({k: v for k, v in p.items() if not k.startswith("_")})
    LS.update(p.get("_lane_stories", {}))
OUT = {}
for vid in KEEP:
    v = VER[vid]
    OUT[vid] = {"set": dict(v.get("set", {})), "drop": v.get("drop", []), "evidence": v.get("evidence", ""),
                "corrections": v.get("corrections", []), "sources": v.get("sources", [])}
fixes.venues(OUT)
fixes.lane_stories(LS)
json.dump(OUT, open(RV / "venues.json", "w"), ensure_ascii=False, indent=1)
json.dump(LS, open(RV / "lane_stories.json", "w"), ensure_ascii=False, indent=1)
from collections import Counter
print("cards", len(CARDS), "venues", len(OUT), "lane stories", len(LS), Counter((x["set"].get("status"), x["set"].get("statusChecked")) for x in OUT.values()))
nc = [i for i in PICKS["berths"] + [x for g in PICKS["shortlist"].values() for x in g] if OUT[i]["set"].get("status") != "confirmed"]
if nc: print("  !! berth/guest-list venues not confirmed:", sorted(set(nc)))
