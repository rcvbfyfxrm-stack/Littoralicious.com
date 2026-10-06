#!/usr/bin/env python3
"""Resolve every layout ref against the research packs, assert the caps (≤3, a 4 only where the layout
says why), and export enrich/<city>-input.json: the kept cards and venues, with their current content."""
import json, pathlib, re, sys
from htmlkit import unesc
from layouts import CITIES

B = pathlib.Path(__file__).parent
R = B.parent / "research"
def deep(o):
    if isinstance(o, str): return unesc(o)
    if isinstance(o, list): return [deep(x) for x in o]
    if isinstance(o, dict): return {k: deep(v) for k, v in o.items()}
    return o
P = {k: deep(json.load(open(R / f))) for k, f in [("PL", "place.json"), ("DN", "drink-night.json"), ("SS", "street-sweet.json"),
                                                   ("SEA", "sea.json"), ("TB", "tables.json")]}
COMB = json.load(open(B / "_combined.json")); V = {v["id"]: v for v in COMB["venues"]}
# venues an enrichment pass VERIFIED and added (5 Oct 2026: Kisté, the Taormina last-minute table)
for _f in sorted((B / "enrich").glob("*-out.json")):
    for _id, _v in (json.load(open(_f)).get("new_venues") or {}).items():
        if _id in V: continue
        _v = dict(_v); _v["id"] = _id; _v["short"] = _v["name"].split(" - ")[0]
        _v["productTags"] = ["Taormina" if _v["town"] in ("Taormina", "Castelmola", "Giardini Naxos") else _v["town"]]
        _v["maps_query"] = f'{_v["short"]} {_v["town"]} Sicilia'; _v["source_tier"] = "canon"
        _v["tags"] = [x for x in [_v.get("price_range"), _v.get("best_time")] if x]
        _v["signal_chip"] = {"label": "MICHELIN 2026", "full": _v.get("recognition", ""), "cosign": "MICHELIN Guide, page read 5 Oct 2026"}
        _v["subcat"] = "THE NEW WAVE"; _v["badge"] = "NEW WAVE"
        V[_id] = _v
GEMS = {}
for k in ("PL", "DN", "SS", "TB", "SEA"):
    for g in P[k]["gems"]: GEMS.setdefault(g["name"], g)

def find(ref):
    kind, key = ref.split(":", 1)
    if kind == "V":
        assert key in V, ref; return {"kind": "venue-pointer", "id": key}
    if kind == "GEM":
        assert key in GEMS, ref; return {"kind": "gem", **GEMS[key]}
    if kind == "SEA":
        for s in P["SEA"]["stories"]:
            if s["title"].startswith(key): return {"kind": "story", **s}
        for c in P["SEA"]["cards"]:
            if c["title"].startswith(key): return {"kind": "card", **c}
        raise SystemExit("missing " + ref)
    for c in P[kind]["cards"]:
        if c["title"] == key: return {"kind": "card", **c}
    raise SystemExit("missing " + ref)

def resolve(city):
    C = CITIES[city]
    lanes = C["lanes"]
    for l, ids in lanes.items():
        assert len(ids) <= 4, (city, l)
        for i in ids: assert i in V, (city, i)
    kept = {i for ids in lanes.values() for i in ids}
    for g, ids in C["short"].items():
        for i in ids: assert i in kept, (city, "shortlist venue not kept", i)
    for b in C["berths"]: assert b in kept, (city, "berth", b)
    cards = {}
    for ch, fid, title, desc, lede, groups in C["folds"]:
        for gt, gd, refs in groups:
            assert len(refs) <= 4, (city, fid, gt, len(refs))
            for r in refs:
                x = find(r)
                if x["kind"] == "venue-pointer": assert x["id"] in kept, (city, fid, "pointer to a cut venue", x["id"])
                cards[f"{fid}|{r}"] = x
    return C, kept, cards

if __name__ == "__main__":
    out = B / "enrich"; out.mkdir(exist_ok=True)
    for city in CITIES:
        C, kept, cards = resolve(city)
        n4 = sum(1 for ids in C["lanes"].values() if len(ids) == 4) + sum(1 for f in C["folds"] for g in f[5] if len(g[2]) == 4)
        ven = {i: {k: V[i].get(k) for k in ("name", "town", "neighborhood", "category", "hook", "why", "verdict", "caveat", "person",
                                            "signature", "dishes", "recognition", "address", "phone", "hours", "price_range",
                                            "reservation", "best_time", "web", "status", "statusChecked", "notes", "sources")} for i in sorted(kept)}
        json.dump({"city": city, "cards": {k: v for k, v in cards.items() if v["kind"] != "venue-pointer"},
                   "pointers": {k: v["id"] for k, v in cards.items() if v["kind"] == "venue-pointer"}, "venues": ven},
                  open(out / f"{city}-input.json", "w"), ensure_ascii=False, indent=1)
        print(f"{city:9} venues kept {len(kept):3} · cards {sum(1 for v in cards.values() if v['kind']!='venue-pointer'):3} · pointers {sum(1 for v in cards.values() if v['kind']=='venue-pointer'):2} · groups of 4: {n4}")
