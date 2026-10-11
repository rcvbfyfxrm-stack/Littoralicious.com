#!/usr/bin/env python3
"""Assemble cards.json, venues.json and hot_events.json for build_gold6.py from the research and rewrite
packs (research/), plus the editor's hand fixes below. 11 Oct 2026.
STATUS RULE (honest): the 11 Oct re-check could not load any venue's own site (the sandbox egress proxy refuses
every external host), only search results. 2026-dated evidence -> confirmed, checked 2026-10-11; an old
'confirmed' with nothing contradicting it keeps its August date; otherwise unverified."""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent; R = RV / "research"
J = lambda p: json.load(open(p))
PICKS = J(RV / "picks.json")
KEEP = [i for l in PICKS["lanes"].values() for i in l["ids"]] + PICKS["keep_pins"]

CARDS = {}
for n in (1, 2, 3):
    CARDS.update({k: v for k, v in J(R / f"rewrite_{n}.json").items() if not k.startswith("_")})
import fixes
fixes.cards(CARDS)
json.dump(CARDS, open(RV / "cards.json", "w"), ensure_ascii=False, indent=1)

HOT = J(R / "hot_events.json")
fixes.hot(HOT)
json.dump(HOT, open(RV / "hot_events.json", "w"), ensure_ascii=False, indent=1)

VER = {}
for n in (1, 2):
    VER.update({k: v for k, v in J(R / f"verify_{n}.json").items() if not k.startswith("_")})
OUT = {}
for vid in KEEP:
    v = VER[vid]
    OUT[vid] = {"set": dict(v.get("set", {})), "drop": v.get("drop", []), "evidence": v.get("evidence", ""),
                "corrections": v.get("corrections", []), "sources": v.get("sources", [])}
fixes.venues(OUT)
for vid, h in fixes.HOTV.items(): OUT[vid]["hot"] = h
json.dump(OUT, open(RV / "venues.json", "w"), ensure_ascii=False, indent=1)
from collections import Counter
print("cards", len(CARDS), "venues", len(OUT), Counter((x["set"].get("status"), x["set"].get("statusChecked")) for x in OUT.values()))
