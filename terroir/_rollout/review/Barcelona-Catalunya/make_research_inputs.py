#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (15 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Barcelona-Catalunya/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}
Q = "From the old [quartiers] prose in research/guide_text_old.txt (the paragraph for this quarter) and the NEIGHBORHOODS record; quarter card, labels Go for · Best hour · Don't miss · Eat (Eat names ONLY venues kept in the tables — see venues_input_*.json — and says 'in the tables'). maps_query = a real square/street in the quarter + 'Barcelona'. Do not retell a venue's or a sight's own story (they have their own cards)."
CU = "Curiosity card from the old [curiosities] prose (research/guide_text_old.txt): one verified fact most guides get wrong. Verify it now (one WebSearch) and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. maps_query ONLY if there is a place to go and see it (the bridge, the market, the street), else empty."
NEW_BRIEF = {
 "quartiers:Barri Gòtic": Q, "quartiers:El Born / La Ribera": Q, "quartiers:El Raval": Q, "quartiers:L'Eixample": Q + " Use the 'L'Eixample (Quadrat d'Or)' paragraph.",
 "quartiers:Gràcia": Q, "quartiers:Sant Antoni": Q, "quartiers:Barceloneta": Q, "quartiers:Poblenou": Q + " Use 'Poblenou & 22@'.",
 "quartiers:Poble Sec & Montjuïc": Q + " Merge the 'Poble Sec' and 'Montjuïc' paragraphs (the hill's museums have their own culture cards: point, don't retell).",
 "curiosities:The Bishop's Bridge is from 1928": CU, "curiosities:The Boqueria is older than its iron": CU + " (the market's own card in the larder tells how to shop it: keep this to the 1217 date, the name and the convent).",
 "curiosities:The street behind Les Demoiselles": CU, "curiosities:Why every Eixample corner is cut": CU, "curiosities:Where the beach sand came from": CU + " (the beach cards tell the swimming: keep this to the origin dispute and Somorrostro).",
 "curiosities:Costa Brava, a newspaper word of 1908": CU, "curiosities:How Gaudí died": CU + " NB the old text says once 'Carrer de Bailèn' and once 'the Gran Via': settle it from a trusted source (the Gran Via de les Corts Catalanes at Bailèn is the usual account) and say so.",
 "curiosities:The song Freddie Mercury never heard played": CU, "curiosities:Dalí's lollipop": CU,
 "provisioning:Casa Gispert": "NEW larder card built from the old venue record (old_venue): the 1851 nut roastery in the Born with its wood-fired oven. Shop labels Where · Open · Buy · Price. Verify it trades in 2026 and its hours (one WebSearch). site = its own domain only if confident.",
 "craft:Do this one": "NEW #craft card (the old guide had no craft section). Research NOW (WebSearch, ~5 calls): the best Barcelona craft a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment — candidates to check: an espadrille (espardenya) workshop, hydraulic-tile (rajola hidràulica) making, Catalan ceramics (a named taller), Cereria Subirà candles (shop since 1761, likely no class), La Manual Alpargatera (espadrilles since the 1940s: do they teach?). Pick the ONE that best meets: unbroken craft + named master + you can enrol. Rename the card (name = the place). Labels What you do · Time · Cost · Book. If nothing qualifies, make this card the honest best option and say what it lacks.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Barcelona craft": "NEW tag 'the warning', NO Maps. What is sold on La Rambla / the Gothic as local craft and is not (mass-made trencadís souvenirs, flamenco dolls — flamenco is Andalusian, not Catalan, 'Barcelona' espadrilles made elsewhere): only claims you can source. Labels: Touch it today · Where the sources argue (if any).",
 "bars:Bar Marsella": "NEW bar card from the old venue record (old_venue): the absinthe bar on Carrer de Sant Pau, 'reputedly 1820', the council bought the building in 2013. Verify 2026 trading + the founding-date dispute (keep 'reputedly'). Labels Where · Pour · Price · Best hour.",
 "bars:London Bar": "NEW bar card from the old venue record (old_venue): the modernista bar on Carrer Nou de la Rambla with the circus trapeze. Verify it trades in 2026 (it changed hands/reopened in the 2010s-20s? check) and founding year (1910 is usual). Labels Where · Pour · Price · Best hour.",
 "listening:Rumba catalana": "Story card for the city's own sound, built from the old [soul] 'The sound' paragraph, the [underground] lede and the old card 'Sabor de Gràcia (rumba catalana)' (old): gitano rumba of Gràcia, carrer de la Cera (Raval) and Hostafrancs, Peret, El Pescaílla's 'ventilador', Gato Pérez; where to hear it now (only verified: e.g. the Festes de Gràcia in August, Sabor de Gràcia dates). Labels Touch it today · Where the sources argue. No Maps unless a real place to go.",
 "follow:Visit Barcelona": "Follow card: barcelonaturisme.com — the official tourist office (verify the domain). Labels What it is · Language · Read. site only if official. No Maps.",
 "follow:Sagrada Família tickets": "Follow card: sagradafamilia.org — the only official ticket seller, no on-site box office (verify). No Maps.",
 "follow:MICHELIN Guide Spain": "Follow card: guide.michelin.com — the Spain & Portugal selection; the 2027 gala date if announced (verify; the 2026 gala was 25 Nov 2025 in Málaga). No Maps.",
 "follow:Barcelona city agenda": "Follow card: the Ajuntament's agenda (barcelona.cat / bcn.cat — verify the right domain for the city agenda / La Mercè) for the festes majors and free museum days. No Maps.",
}
batches = {1: ["quartiers", "curiosities", "walks", "calas"], 2: ["culture", "craft", "coffee-gardens"], 3: ["provisioning", "around", "follow", "avoid"], 4: ["bars", "listening"]}
OLDV = {"provisioning:Casa Gispert": "vc-casa-gispert", "bars:Bar Marsella": "vn-bar-marsella", "bars:London Bar": "vn-london-bar"}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in NEW_BRIEF: e["brief"] = NEW_BRIEF[c["key"]]
                if c["key"] in OLDV: e["old_venue"] = V[OLDV[c["key"]]]
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
splits = {1: [i for i in keep if LANE[i][0] in ("creme", "elbulli", "two-stars", "rising", "houses")],
          2: [i for i in keep if LANE[i][0] not in ("creme", "elbulli", "two-stars", "rising", "houses")]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
