#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (14 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
NEW_BRIEF = {
 "craft:No class to enrol in": "tag 'honestly', NO place/Maps. The honest warning for the craft section: neither the rope-house nor the sail loft runs a class you can enrol in (verify if either does now); what you can do is buy rope cut to the metre or commission/repair a sail. Say so plainly.",
 "provisioning:Mastronikolas": "POINTER card for venue 'mastronikolas' (its own table card is under Breakfast): the provisioning angle only — the galaktoboureko tray to carry back aboard (whole trays to order? only if sourced). teaser + line + facts Order/When/Book/Price.",
 "bars:Retsina — the port's wine": "From the old #drink prose (guide_text_old.txt, section [drink]): retsina, Savatiano with a splash of Roditis, Aleppo-pine resin in the ferment, a traditional appellation (OKP) not a PDO, the Mesogeia's white; barrel retsina at To Eidikon (its own table card: point to it, do not retell it). Labels: In the glass · On the label · Ask for. No place/Maps.",
 "bars:Ouzo with the fried fish": "From the old #drink prose and the ouzo gem (guide_text_old.txt): ouzo (anise, the louche with water/ice, EU GI Greece & Cyprus), tsipouro, how the port orders it with fried small fish and mezedes, the karafaki. Labels: In the glass · On the label · Ask for. No Maps.",
 "listening:Hi-fi — honestly": "Tag 'honestly'. The hi-fi/listening sub-tag needs an honest card: does Piraeus have any dedicated hi-fi/vinyl listening bar verified trading in 2026? Search once or twice; if none, say plainly none found and point to the acoustic rebetiko rooms in this fold (the real listening in this port is unamplified). Never invent one. No Maps.",
 "around:Aegina": "NEW day-trip card, verify everything now with trusted sources: ferries and hydrofoils from Piraeus (which gate — E8? — and crossing times for conventional vs fast boats, operators), the Aegina pistachio PDO (1996), the Temple of Aphaia, the town harbour fish market/ouzeris (name a place only if verified trading 2026). Labels: Getting there · Time needed · Don't miss · Eat. maps_query: 'Aegina port Aegina' style ending 'Saronic' is not needed — end with 'Aegina'.",
 "around:Salamina": "NEW day-trip card, verify now: the Perama–Paloukia ferry (minutes, frequency, cost if found), the battle of Salamis 480 BC (the strait seen from the boat), what to do on the island in a few hours (only verified things). Labels: Getting there · Time needed · Don't miss · Eat (only if a verified place).",
 "around:Hydra": "NEW day-trip card, verify now: fast ferry from Piraeus (operator, crossing time ~ from a trusted source), no cars on the island (donkeys/water taxis), the port, the walk to Kamini/Vlychos; a long day trip. Labels: Getting there · Time needed · Don't miss · Eat (only verified).",
 "follow:Port of Piraeus (OLP)": "Follow card: olp.gr — gate assignments, departures, port works (from the old Follow list). Verify the official domain. site only if official. No Maps.",
 "follow:Hellenic Coast Guard": "Follow card: hcg.gr — sailing bans when the meltemi blows (apagoreftiko), safety notices. Verify domain. No Maps.",
 "follow:Municipality of Piraeus": "Follow card: piraeus.gov.gr — Days of the Sea, the Veakeio programme, Apokries; the Athens sister guide is at /terroir/Athens-Attiki/. No Maps.",
 "follow:Posidonia": "Follow card: Posidonia, the biennial (even years) shipping exhibition (posidonia-events.com is the official organiser site? verify; the old guide cited metropolitanexpo.gr), the week that books out the port. Next edition 2028 dates if published. No Maps.",
}
batches = {1: ["quartiers", "walks", "calas"], 2: ["culture", "craft", "coffee-gardens"], 3: ["provisioning", "around", "follow"], 4: ["bars", "listening"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in NEW_BRIEF: e["brief"] = NEW_BRIEF[c["key"]]
                if c["key"] in PLAN["_pointers"] or (c["from"] in PLAN["_pointers"]): e["pointer_to_venue"] = PLAN["_pointers"].get(c["key"]) or PLAN["_pointers"].get(c["from"])
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/data/Piraeus-Saronic.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
keep = [i for l in PICKS["lanes"].values() for i in l["ids"]]
V = {v["id"]: v for v in D["VENUES"]}
LANE = {i: l["label"] for l in PICKS["lanes"].values() for i in l["ids"]}
half = (len(keep) + 1) // 2
for n, ids in ((1, keep[:half]), (2, keep[half:])):
    json.dump({i: {**V[i], "_lane": LANE[i]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
