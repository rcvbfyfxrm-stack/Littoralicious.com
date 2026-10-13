#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (13 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
NEW_BRIEF = {
 "craft:No class to enrol in": "tag 'honestly', NO place/Maps. The honest warning for the craft section: none of the three benches in this guide runs an open class you can enrol in (verify if any does now); what you can do is be fitted or commission. Warn that sandals sold as 'handmade' in the Plaka/Monastiraki tourist strip are not all made on the premises (only if you can source it; otherwise keep it to the enrolment point).",
 "bars:Retsina — the revival bottle": "From the old #drink prose (guide_text_old.txt, section [drink]): resin law 0.15–1%, savatiano from Mesogeia, Papagiannakos, Georgas, Kechris Tear of the Pine, Gaia Ritinitis Nobilis; drink cellar-cold with taramosalata. Labels: In the glass · On the label · Ask for. No place/Maps.",
 "bars:Ouzo, tsipouro, tsikoudia": "From the old #drink prose: ouzo (anethole louche, EU GI Greece & Cyprus, Plomari/Barbayanni), tsipouro (pomace, with/without anise, Tsililis, Idoniko), tsikoudia (single-distilled pomace, never anise); order a karafaki with mezedes; Athinaikon since 1932 is mentioned (not a venue of this guide: name it as an example only if you verify it is trading in 2026, else drop). Labels: In the glass · On the label · Ask for. No Maps.",
 "bars:The grapes nobody else grows": "From the old #drink prose: Assyrtiko (Santorini), Xinomavro (Naoussa), Malagousia (nearly extinct until a Thessaloniki professor pressed cuttings on Gerovassiliou in the 1970s); taste by the glass at Heteroclito (its own card is in this fold: do not retell it). Labels: In the glass · On the label · Ask for. No Maps.",
 "listening:Klimataria": "POINTER card for venue 'klimataria' (in the tables): the music angle only — live music Tuesday to Sunday, plays through the year (old #music text). teaser + line + facts Order/When/Book/Price. Verify the live-music days now if you can.",
 "listening:The winter rooms": "From the old music card 'The rooms — and when they go dark': Giorgos Xintaris's Friday residency at Mousiki Skini Hamam (Ano Petralona) Oct–May, and Stoa Athanaton (Sofokleous 17–19) under a shifting name — a phone call, not a promise. Verify the 2026–27 season if you can; otherwise say it is unconfirmed. Maps on Hamam only if it is verified trading.",
 "listening:Lena Platonos — Gallop": "From the old music card 'The modern clock': Lena Platonos cut 'Gallop' in 1985 (analog synths, TR-808, spoken poetry), reissued by Dark Entries in 2015; the record Athenian crate-diggers hunt. No Maps (not a place). Labels as for a story: Touch it today (how to hear/buy it) · Where the sources argue (only if they do).",
 "listening:Hi-fi — the one listening room": "Tag 'honestly'. The hi-fi/listening sub-tag needs an honest card: this guide knows ONE listening room — the vinyl booth at Okupa (its own card is under Rooms to linger & work: point to it, do not retell it). Say plainly whether you found any other dedicated hi-fi listening bar in Athens verified for 2026 (search once or twice); never invent one. No Maps.",
 "around:Cape Sounion": "NEW card, verify everything now with trusted sources (odysseus.culture.gr / Hellenic Ministry of Culture, quality press): the Temple of Poseidon at Sounion, distance/time from Athens by the coast road (KTEL bus from Pedion Areos/Mavromateon), 2026 ticket price and opening hours (winter/summer), sunset as the hour, Byron's carved name (only if sourced). Labels: Getting there · Time needed · Don't miss · Eat (Eat only if a verified place is named; else omit).",
 "around:The islands are another guide": "Tag 'honestly', NO Maps. Built from the old Aegina pistachio co-op card: the islands (Aegina and its PDO pistachio, the co-op since 1947) now live in the separate Piraeus & Saronic guide (/terroir/Piraeus-Saronic/). One short card that sends the reader there; keep the PDO fact (1996) and the 'beware Aegina-style lookalikes' line.",
 "follow:Athens Epidaurus Festival": "Follow card: aefestival.gr — the festival programme (Peiraios 260 and the Ancient Theatre of Epidaurus while the Odeon of Herodes Atticus is closed for restoration). Verify the Herodeon closure/reopening estimate now. site: https://aefestival.gr if it is the official site. No Maps.",
 "follow:The MICHELIN Guide, Greece": "Follow card: guide.michelin.com — the live Greek selection (stars move yearly). Verify the 2026 Greece selection facts now (date of ceremony, Delta two stars). site https://guide.michelin.com. No Maps.",
 "follow:laikesagores.gr": "Follow card: the official open-air laiki registry — which street market runs which day. Verify the domain/official status. No Maps.",
 "follow:Athinorama": "Follow card: athinorama.gr — the Athens listings weekly and its 'open in August' list. No Maps.",
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
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/data/Athens-Attiki.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
keep = [i for l in PICKS["lanes"].values() for i in l["ids"]]
V = {v["id"]: v for v in D["VENUES"]}
LANE = {i: l["label"] for l in PICKS["lanes"].values() for i in l["ids"]}
half = (len(keep) + 1) // 2
for n, ids in ((1, keep[:half]), (2, keep[half:])):
    json.dump({i: {**V[i], "_lane": LANE[i]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
