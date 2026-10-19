#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (19 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Costa-Brava-Catalunya/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}
QU = ("Town card (this regional guide reads its towns as quarters). Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide — see research/venues_input_*.json — never the cut Massana). "
      "maps_query = the town + ', Girona, Spain'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card from the old lead / [history] / [eat] / [drink] prose (research/guide_text_old.txt): one verified fact most guides get wrong or never tell. "
      "Verify it now (one or two WebSearch) and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Girona, Spain'), else empty.")
AV = ("Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). No invented numbers; date any price you keep.")
FO = "Follow card from the old [follow] item. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
TR = ("Day-trip card (Autour). Labels Getting there · Time needed · Don't miss · Eat (Eat: only name a place you verify trades in 2026, or omit). Verify 2026 hours and prices NOW. maps_query = the place + ', Girona, Spain'.")
POINT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
         "angle ({angle}); story 40-70 words that does NOT retell the venue's own story; facts Order · When · Book · Price (only what the record or a source supports); "
         "maps_query empty (the table card carries the Maps link).")
NEW_BRIEF = {
 "towns:Calella de Palafrugell and Llafranc": QU + " Les Voltes at Port Bo and the camí de ronda both have their own cards (linger, walks): point, do not retell. The garoinada is a calendar card.",
 "towns:Palamós": QU + " The auction (its own venue card: Espai del Peix) and La Gamba (venue) — name, do not retell. Museu de la Pesca on the quay; the Fira de la Gamba / Menú de la Gamba (verify 2026 dates).",
 "towns:Pals and Peratallada": QU + " The two stone villages and the rice of Pals (rice walk has its own card). Can Bonay (venue) in Peratallada.",
 "towns:L'Escala and Empúries": QU + " The ruins (culture card) and the anchovy salters (venue Anxoves Solés) own their stories: point.",
 "towns:Roses": QU + " The bay, the citadel (Ciutadella de Roses — verify it is visitable, 2026 price), Rafa's (venue). elBulli1846 has its own culture card: point.",
 "towns:Cadaqués and Portlligat": QU + " Cadaqués has its own full guide at /terroir/Cadaques-CapdeCreus/: this card is short, says what the village is in one or two lines and points there ('Cadaqués has its own guide'). Compartir is a venue here; the Casa-Museu a culture card.",
 "towns:Girona": QU + " Girona has its own full guide at /terroir/Girona-Catalunya/: say so. Barri Vell, El Call, the Onyar houses (the Onyar bridges have their own linger card). Can Roca, La Tabarra, La Fábrica, Rocambolesc, the Mercat del Lleó are venues: name, do not retell.",
 "curiosities:Named on 12 September 1908": CU + " Ferran Agulló coined 'Costa Brava' in La Veu de Catalunya, 12 September 1908 (verify the newspaper and date). Where the sources argue if any.",
 "curiosities:The wind that plants the vines low": CU + " The tramuntana (gusts to ~200 km/h per the old text — verify a recorded figure) dries the canopy, suppresses mildew, so the vines are trained low as bush vines. Do not retell the grape names (drink cards own them).",
 "curiosities:The oldest rock in Catalonia": CU + " The Cap de Creus schist, old text 580-540 Ma, Variscan folding; verify (Geoparc / parcsnaturals.gencat.cat). The Cap de Creus culture card says what to see; this card owns the dates.",
 "curiosities:Did the vine land at Empúries?": CU + " The old text says the vine 'is traditionally said' to have entered Iberia via Emporion: that is a legend vs Phoenician routes further south — present it as a dispute. The Empúries culture card owns the site visit.",
 "curiosities:The Indianos of Begur": CU + " Begur's 19th-century mansions built by returnees from Cuba (the americanos/indianos); the Fira d'Indians in September is a calendar card — point. Verify a count of the casas d'indians if you can.",
 "curiosities:The smugglers' path": CU + " The old text: the camí de ronda was walked by the Guardia Civil against smugglers; smugglers ran tobacco, penicillin and lingerie into the coves 1940-1958. Verify; keep as dispute if only one source. The walk card owns the route.",
 "larder:The auction at Palamós": POINT.format(vid="v12-espai-del-peix-llotja-de-palam-s", angle="the larder: what a galley buys and when to be on the quay"),
 "larder:The anchovy shop at L'Escala": POINT.format(vid="v13-anxoves-sol-s", angle="the larder: what to buy, how to carry it"),
 "larder:The Lleó market at Girona": POINT.format(vid="v11-mercat-del-lle", angle="the larder: which stalls, what to buy"),
 "linger:La Fábrica with a laptop": POINT.format(vid="v15-la-f-brica", angle="rooms to linger: the hour to sit, laptop or not"),
 "culture:Castell Gala Dalí, Púbol": "NEW culture card (sight labels Where · Open · Cost · Best hour · Time needed · Don't miss). The castle Dalí gave Gala (bought 1969, verify), her crypt; 2026 season, hours, price (salvador-dali.org via search). maps_query 'Castell Gala Dalí, Púbol, Girona, Spain'.",
 "craft:Do this one": "NEW #craft card (the old guide had no craft section). Research NOW (WebSearch, ~5 calls): the best craft of the Costa Brava / Empordà a visitor can learn hands-on, with a named still-practising master and OPEN enrolment. Candidates: the potters of La Bisbal d'Empordà (a workshop that teaches classes), cork at Palafrugell / Cassà de la Selva (Museu del Suro), dry-stone walling (pedra seca, UNESCO 2018), the traditional llagut boat-builders (Mestres d'aixa), espadrilles. Pick ONE: unbroken local craft + named master + you can enrol. Rename the card (name = the place). Labels What you do · Time · Cost · Book. If nothing qualifies, say what it lacks. (The sister Cadaqués guide's craft section may have picked a La Bisbal potter — that is fine, it is the same county.)",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story. Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape (tag 'missing: <thing>').",
 "craft:What is sold as local craft": "NEW tag 'the warning', NO Maps. What resort shops sell as local-made and is not (only claims you can source; else keep it general and honest). Labels: Touch it today · Instead.",
 "drink:Cremat": "NEW drink how-to card: rum set alight with sugar, cinnamon, lemon peel, coffee beans, doused with coffee; the havaneres' drink, Calella de Palafrugell. Labels In the glass · On the label · Ask for. No Maps. The havaneres singing belongs to the listening card: do not retell.",
 "drink:Ratafia": "NEW drink how-to card: IGP Ratafia Catalana (green walnuts + herbs; verify the IGP maceration rule). Labels In the glass · On the label · Ask for. No Maps.",
 "listening:No hi-fi bar on this coast": "NEW honest 'none found' card for the hi-fi/listening sub-tag: the old guide said there is no hi-fi listening bar on this coast; search to confirm (a vinyl/listening bar in Girona, Figueres, Palafrugell?) — if one exists, name it honestly with evidence. Labels: Touch it today · Instead. tag 'honestly'. No Maps.",
 "around:Olot and the Garrotxa volcanoes": TR + " The Zona Volcànica de la Garrotxa natural park (about forty cones per old text; verify), the Fageda d'en Jordà beech wood, Olot's cuina volcànica. Besalú is the next card: do not retell.",
 "avoid:Urchins out of season": AV + " Ordering garoines/sea urchins in summer: the Catalan legal season (verify the regulation: Ordre ARP/105/2020? which months are open) and why the roe is empty out of season (the dish lives in La liste — do not retell the 25% roe figure).",
}
EXTRA_OLD = {"walks:The Paratge de Tudela to the cape lighthouse": "secret-gems:The sculpted schist of the Paratge de Tudela",
             "culture:Sant Pere de Rodes": "secret-gems:The terrace of Sant Pere de Rodes",
             "drink:The three Garnatxas": "drink:Lledoner Roig (grey Grenache)",
             "larder:Mas Estela": "drink:Mas Estela — biodynamic", "larder:Martín Faixó": "drink:Martín Faixó — Cadaqués",
             "listening:The Cantada d'Havaneres": "events:Cantada d'Havaneres, Calella de Palafrugell",
             "listening:Festival Castell de Peralada": "events:Festival Castell de Peralada", "listening:Cap Roig Festival": "events:Cap Roig Festival"}
GEN = {"walks": "Walk card: labels Start · Length · Time · Terrain · Best hour · Don't miss · Bring. maps_query = the START point + ', Girona, Spain'. Verify length/climb if you can; keep the old figures otherwise, marked 'about'.",
       "culture": "Sight card: labels Where · Open · Cost · Best hour · Time needed · Don't miss. VERIFY 2026 hours and prices now (official sites through WebSearch) and date them '(Oct 2026)'; the old chips are June 2026 guesses ('EUR ~17').",
       "provisioning": "Producer/estate card: labels Where · Open · Buy · Price · Book. Verify the estate trades and receives visitors in 2026 (one WebSearch).",
       "coffee-gardens": "Room/corner card: labels Where · Open · Order · Work? (for a café) or Getting there · Best hour · Bring · Don't miss (for a cove/corner). Free corners: say free.",
       "bars": "Drink how-to: labels In the glass · On the label · Ask for. No Maps.",
       "listening": "Live music card: labels Where · On · Price · Best hour; verify the 2026 edition's dates and say when the 2027 edition is expected (if announced). maps_query = the venue + ', Girona, Spain'.",
       "follow": FO, "avoid": AV, "around": TR, "quartiers": QU}
for k, vid in PLAN["_pointers"].items(): assert k in NEW_BRIEF
batches = {1: ["quartiers", "curiosities"], 2: ["provisioning", "walks", "coffee-gardens"], 3: ["culture", "craft"], 4: ["bars", "listening", "around", "avoid", "follow"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in EXTRA_OLD: e["old_also"] = OLD[EXTRA_OLD[c["key"]]]
                b = NEW_BRIEF.get(c["key"]) or GEN.get(f)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
v1 = [i for i in LANE if LANE[i][0] in ("summit", "village")]; v2 = [i for i in LANE if i not in v1]
for n, ids in ((1, v1), (2, v2)):
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
print("venues", len(v1), len(v2))
