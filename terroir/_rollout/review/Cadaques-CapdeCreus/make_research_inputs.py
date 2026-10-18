#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (18 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_1.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Cadaques-CapdeCreus/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}
QU = ("Quarter card (the village's quarters). Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide — see research/venues_input_1.json — never a cut one). "
      "maps_query = the quarter + ', Cadaqués, Girona, Spain'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card from the old [history] / [soul] / etymon / [walks] / [calas] prose (research/guide_text_old.txt): one verified fact most guides get wrong or never tell. "
      "Verify it now (one or two WebSearch) and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Cadaqués, Girona, Spain' or the real town), else empty.")
PV = ("NEW larder card. Verify it trades in 2026 and its days/hours (one or two WebSearch). Market labels Days · Hours · Go at · Look for; shop/producer labels Where · Open · Buy · Price "
      "(+ Book for a visit). site = its own domain only if confident.")
AV = ("Warning card from the old [avoid] prose (research/guide_text_old.txt), tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Verify what is dated: the 2026 Cap de Creus summer access regulation (dates, shuttle from where, fare), the Casa Dalí winter closure for 2027. No invented numbers.")
FO = "Follow card from the old [follow] item. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
TR = ("NEW day-trip card (Autour). Labels Getting there · Time needed · Don't miss · Eat (Eat: only name a place you verify trades in 2026, or omit). Verify 2026 opening seasons, hours and prices NOW. "
      "Sister guides exist at /terroir/Girona-Catalunya/ and /terroir/Costa-Brava-Catalunya/: point to them if the place is theirs, do not retell. maps_query = the place + ', Girona, Spain'.")
NEW_BRIEF = {
 "quarters:Santa Maria and the upper town": QU + " The schist-paved upper warren, the rastell (slate on edge) paving, up to Santa Maria (the church has its own culture card — point, do not retell the altarpiece).",
 "quarters:Sa Riba and Es Portitxó": QU + " Merge the old Es Portitxó / Es Portal item (old_also). The seafront ribbon, Casa Serinyana / Casa Blava 1913-15 (verify), the little square of sardanes.",
 "quarters:La Riera": QU + " The dry torrent bed that splits the village; the Monday market (the larder card 'The Monday market on the Riera' owns its days/hours — point), parking spine. Compartir sits on it (verify Compartir's address: the old records give both 'Riera de Sant Vicenç s/n' and 'Carrer del Sitjar 5').",
 "quarters:Es Poal": QU + " Merge the old quarter item (old_also) with the culture card on the cove the teenage Dalí painted (View of Cadaqués from Playa Poal, 1920 — verify the title/date).",
 "quarters:Es Llané": QU + " Twin rock beaches south; the Dalí family's summer house at Es Llané before Portlligat (verify). The Lorca Easter 1925 stay was in the Dalí family house: one line at most.",
 "quarters:Portlligat": QU + " The cove over the hill; the Casa-Museu has its own culture card and the beach its own swim card: this card is the hamlet, the boats, the walk over, the evening light.",
 "curiosities:The rock older than shells": CU + " The schist 580-540 Ma, the Variscan folding ~300 Ma, the pegmatite veins, the Parc Natural (1998, verify area). Keep the dates as the old text gives them unless a source corrects them.",
 "curiosities:The tramuntana": CU + " The north wind: gusts past 100 km/h (verify a recorded figure from Meteocat or press), how it built the houses with their backs to it, the clarity of the light. Do not duplicate the 'boat day without the forecast' warning card.",
 "curiosities:Parlar salat": CU + " The salted article (sa/es instead of la/el) still spoken in Cadaqués; the old text claims it is the only mainland town where it is everyday speech — verify or soften (Tossa? Begur? the Balearics).",
 "curiosities:The monks bought the fish": CU + " 974 / 1030: Sant Pere de Rodes buying rights to the fisheries and ports (verify).",
 "curiosities:Burned in 1444, sacked by Barbarossa": CU + " The 1444 raid that burned the records (the old text cites the municipal archive) and the Barbarossa sack (1543? verify date) that torched the church — keep disputes as disputes.",
 "curiosities:A smugglers' village": CU + " Contraband with France, the isolation until the road (the old text says the first road came in the late 19th century — verify the date of the road over the Pení), the phylloxera of 1879 that killed the vineyards.",
 "provisioning:The Monday market on the Riera": PV + " The weekly market on the Riera de Sant Vicenç: the old text says Monday; verify day, hours and whether it runs year-round (Ajuntament 'mercat i fires'). maps_query 'Riera de Sant Vicenç, Cadaqués, Girona, Spain'.",
 "craft:Do this one": "NEW #craft card (the old guide had no craft section). Research NOW (WebSearch, ~5 calls): the best craft of this corner of the Empordà a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment. Candidates to check: the potters of La Bisbal d'Empordà (a workshop that teaches), dry-stone walling (pedra seca, UNESCO 2018) courses in the Cap de Creus park, jewellery in Cadaqués (Espai Art i Joia), cork in the Gavarres/Agullana, traditional boat-building (the llagut / the Barca de Mitjana?), the sardana or havaneres singing. Pick the ONE that best meets: unbroken local craft + named master + you can enrol. Rename the card (name = the place). Labels What you do · Time · Cost · Book. If nothing qualifies, make this card the honest best option and say what it lacks.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as local craft": "NEW tag 'the warning', NO Maps. What the Cadaqués shops sell as local-made and is not (Dalí souvenirs, 'Catalan' ceramics made far away, espadrilles...) — only claims you can source; else keep it general and honest. Labels: Touch it today · Instead.",
 "listening:No hi-fi bar, and the Boia gone": "NEW honest 'none found' card for the hi-fi/listening sub-tag: no hi-fi or listening bar found in Cadaqués (search to confirm, e.g. a vinyl bar in Figueres or Roses — if one exists, name it honestly). The Boia bar on Platja Gran (since 1946, Dalí/Duchamp/Pla haunt) shut on 4 January 2025 under the coastal law (verify). Labels: Touch it today · Instead. tag 'honestly'. No Maps.",
 "around:Figueres — the Teatre-Museu": TR + " The Teatre-Museu Dalí (Dalí's crypt), 2026 hours, price, winter closing days; booking.",
 "around:Púbol — Gala's castle": TR + " Castell Gala Dalí de Púbol: the castle Dalí gave Gala (1969/1970), its season (closed in winter?), price.",
 "around:elBulli1846, Cala Montjoi": TR + " Built from the old venue record (old_also) and the old [bougie]: the museum opened 15 June 2023 in the old elBulli; 2026 season, hours, price, booking; the road over from Roses. The food-history fold owns the elBulli story (Adrià, 1987-2011, the stars, the World's Best years): do NOT retell it, only the visit.",
 "around:Sant Pere de Rodes": TR + " The Benedictine monastery above El Port de la Selva (the curiosity card owns the 1030 fish rights — do not retell); 2026 hours and price (Museu d'Història de Catalunya site).",
 "around:Empúries and L'Escala": TR + " The Greek and Roman city at Empúries (MAC-Empúries hours/price 2026) and L'Escala's anchovy salters (the larder card owns the salters — point).",
 "avoid:August": AV, "avoid:Driving to the lighthouse in summer": AV, "avoid:A boat day without the forecast": AV, "avoid:Portlligat without a slot": AV,
 "follow:Meteocat": FO, "follow:Parc Natural de Cap de Creus": FO, "follow:Ajuntament de Cadaqués": FO, "follow:Fundació Gala-Salvador Dalí": FO, "follow:Festival de Música de Cadaqués": FO,
}
EXTRA_OLD = {"quarters:Sa Riba and Es Portitxó": "quartiers:Es Portitxó / Es Portal", "quarters:Es Poal": "quartiers:Es Poal",
             "walks:Camí de Ronda to Cala Nans": "calas:Cala Nans (Far de Cala Nans)", "walks:The lighthouse and Cala Culip": "calas:Cala Culip",
             "walks:The Camí Antic to Cap de Creus": "walks:The olive-terrace path (Cami Antic through the abandoned vinyes)",
             "drink:Garnatxa negra and Carinyena": "bars:Carinyena / Samsó (Empordà)", "provisioning:Martín Faixó": "bars:Cap de Creus slate wine — Martín Faixó (Perafita / Cadac)",
             "listening:The music festival": "music:Church concerts in Santa Maria", "culture:The colony": "music:The village's musical clan — the Pitxots"}
EXTRA_VENUE = {"around:elBulli1846, Cala Montjoi": "v16-elbulli-cala-montjoi-roses"}
POINT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_1.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
         "angle (rooms to linger: the coffee, the morning, the hour to sit), story 40-70 words that does NOT retell the venue's own story (1935 / the Dalí logo); facts Order · When · Book · Price "
         "(only what the record or a source supports); maps_query empty (the table card carries the Maps link).")
for k, vid in json.load(open(RV / "card_plan.json"))["_pointers"].items(): NEW_BRIEF[k] = POINT.format(vid=vid)
batches = {1: ["quartiers", "curiosities", "avoid", "follow"], 2: ["provisioning", "walks", "calas"], 3: ["culture", "craft", "coffee-gardens", "listening"], 4: ["bars", "around"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in EXTRA_OLD: e["old_also"] = OLD[EXTRA_OLD[c["key"]]]
                if c["key"] in EXTRA_VENUE: e["old_also"] = V[EXTRA_VENUE[c["key"]]]
                if c["key"] in NEW_BRIEF: e["brief"] = NEW_BRIEF[c["key"]]
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in LANE}, open(RV / "research/venues_input_1.json", "w"), ensure_ascii=False, indent=1)
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
print("venues", len(LANE))
