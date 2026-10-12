#!/usr/bin/env python3
"""Write the research packs' INPUTS (research/*_input.json) for the agents, from picks/card_plan + the old guide. 12 Oct 2026."""
import json, pathlib, subprocess
RV = pathlib.Path(__file__).resolve().parent; R = RV / "research"; REPO = RV.parents[3]
OLD = json.load(open(R / "cards_old.json")); PICKS = json.load(open(RV / "picks.json")); PLAN = json.load(open(RV / "card_plan.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/data/Istanbul-Bogazici.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}
LANE = [i for l in PICKS["lanes"].values() for i in l["ids"]]; KEEP = LANE + PICKS["keep_pins"]
json.dump({i: V[i] for i in KEEP}, open(R / "venues_old_kept.json", "w"), ensure_ascii=False, indent=1)
LANE_NAMES = {i: V[i]["name"] for i in LANE}; CUT_NAMES = sorted(V[i]["name"] for i in PICKS["cut"])
json.dump({i: V[i] for i in LANE}, open(R / "venues_input_1.json", "w"), ensure_ascii=False, indent=1)
json.dump({i: V[i] for i in PICKS["keep_pins"]}, open(R / "venues_input_2.json", "w"), ensure_ascii=False, indent=1)
def groups(v): return v["groups"] if "groups" in v else [g for m in v["merges"] for g in m["groups"]]
BATCH = {1: ["quartiers", "walks", "around"], 2: ["culture", "landmarks", "craft", "art"], 3: ["hammam", "rituals", "coffee-gardens"],
         4: ["bars", "listening"], 5: ["provisioning", "street-food", "follow"]}
for n, folds in BATCH.items():
    cards = {}
    for f in folds:
        for g in groups(PLAN[f]):
            for c in g["cards"]:
                cards[c["key"]] = {"fold": f, "group": g["title"], "angle_note": c["note"], "ref": c.get("ref", ""),
                                   "ref_venue": V[c["ref"]] if c.get("ref") else None,
                                   "old_cards": [OLD[k] for k in c["from"]]}
    json.dump({"cards": cards, "lane_venues": LANE_NAMES, "cut_venues": CUT_NAMES}, open(R / f"rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
