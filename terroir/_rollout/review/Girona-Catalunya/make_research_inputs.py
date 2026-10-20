#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (20 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Girona-Catalunya/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}
QU = ("Quarter card. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide — see research/venues_input_*.json — never the cut Arròs 9, König Independència or Federal). "
      "maps_query = the quarter + ', Girona, Spain'. Do not retell another card's story (the cathedral, the Call museum, the baths, Sant Pere, the walls, the Onyar bridges walk, Casa Masó, the Devesa walk, Sant Daniel walk each have their own card): name it and move on.")
CU = ("Curiosity card: one verified fact most guides get wrong or never tell. Verify it now (one or two WebSearch) and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Girona, Spain'), else empty.")
AV = ("Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do: name only KEPT venues). No invented numbers; date any price you keep. Built from the old [avoid] fold in research/guide_text_old.txt (WHAT TO SKIP).")
FO = "Follow card, from the old [follow] fold (research/guide_text_old.txt, 'Follow — Who to watch for dates and closures'). Labels What it is · Language · Read. site = the official https domain only if confident (verify with one WebSearch). No Maps. No follower counts."
TR = ("Day-trip card (Autour). Labels Getting there · Time needed · Don't miss · Eat (Eat: only a place you verify trades in 2026, or omit). Verify 2026 hours/prices of anything you name NOW. maps_query = the place + ', Girona, Spain'.")
POINT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
         "angle ({angle}); story 40-70 words that does NOT retell the venue's own story; facts Order · When · Book · Price (only what the record or a source supports); maps_query empty.")
NEW_BRIEF = {
 "curiosities:The Immortal City": CU + " Girona's sieges (often given as ~25 in its history; verify a sourced count) and the 1809 Napoleonic siege under Mariano Álvarez de Castro (May-December 1809, seven months): 'Girona, la immortal'. The walls walk owns the walls: do not retell.",
 "curiosities:The flies of Sant Narcís": CU + " The legend: in 1285, during the French siege (Philip III), flies swarmed from the saint's tomb in Sant Feliu and drove off the French cavalry; the fly is now the Fires de Sant Narcís mascot (the Fires are a calendar card: point). A legend: say so.",
 "curiosities:The cycling capital": CU + " Why so many professional road cyclists live in Girona (since the late 1990s/2000s; often 'about 100' pros cited — verify or say 'dozens'); La Fàbrica is a venue (name only). maps_query empty.",
 "curiosities:A season of dragons on the steps": CU + " Game of Thrones season 6 (2015 filming, aired 2016) used Girona: the cathedral steps (exterior of the Great Sept of Baelor), the Call lanes, the Arab Baths, Sant Pere de Galligants cloister (verify which). Keep it short and factual. The cathedral card owns the cathedral itself.",
 "larder:The Lleó market, for the galley": POINT.format(vid="v19-mercat-del-lleo", angle="the larder: what a galley buys and the hour to be there"),
 "larder:Cal Formatger's board": POINT.format(vid="v11-cal-formatger", angle="buying the province's cheese to take aboard"),
 "linger:La Fàbrica with a laptop": POINT.format(vid="v18-la-fabrica", angle="rooms to linger: the hour to sit, laptop or not"),
 "listening:Sunset Jazz Club, for the record": POINT.format(vid="v42-sunset-jazz-club", angle="the listening room: the nearest thing to a room for listening, and the night to go"),
 "linger:Jardí de la Francesa": "NEW linger card: the small garden behind the cathedral apse on the wall (Jardí de la Francesa) — verify it exists and is open to the public (Ajuntament de Girona); labels Getting there · Best hour · Bring · Don't miss. If you cannot verify it, write the card about the Jardins dels Alemanys' neighbour you can verify, and say so in _notes.",
 "craft:Escola de Ceràmica de la Bisbal": "#craft 'Do this one' card. Use the old card + the old ET block (in the old guide text: 'Learn it here' — Dolors Ros, Escola de Ceràmica de la Bisbal, 1972). Verify the school's 2026 courses (WebSearch). Labels What you do · Time · Cost · Book. tag 'do this one'. maps_query 'Escola de Ceràmica de la Bisbal, La Bisbal d'Empordà, Girona, Spain'.",
 "craft:La Sobirana, Santa Coloma de Farners": "#craft 'other' card from the old Ratafia card: verify the 2026 workshop; tag 'missing: <the one thing>' (e.g. no named master of long standing / seasonal dates) and end the story with a plain 'Missing:' sentence. Labels What you do · Time · Cost · Book. The ratafia drink card owns what ratafia is: do not retell.",
 "craft:Other one": "NEW #craft card: research one more craft a visitor to Girona can learn hands-on (candidates: cork at Cassà de la Selva / Museu del Suro de Palafrugell, sardana dance classes (Girona's colla), espardenyes, glass at the Taller de vidre, xuixo or bread workshops). Pick the one with best evidence; rename the card to the place; tag 'missing: <the one thing>'; end with 'Missing:' sentence. Labels What you do · Time · Cost · Book.",
 "craft:What is sold as local craft": "NEW tag 'the warning', NO Maps. What old-town souvenir shops sell as Girona-made and is not (only claims you can source; else keep it general and honest: La Bisbal pottery is made 30 km away; check the maker's mark). Labels: Touch it today · Instead.",
 "listening:No hi-fi bar in Girona": "NEW honest 'none found' card for the hi-fi/listening sub-tag: search for a dedicated hi-fi / vinyl listening bar in Girona (2026). If one exists, name it with evidence; otherwise say none was found and point to Sunset Jazz Club (its own card) and Idle Hands' record shelves (a linger card). Labels: Touch it today · Instead. tag 'honestly'. No Maps.",
 "around:Besalú": TR + " The Romanesque bridge, the mikveh (visit price, verify 2026), the Jewish quarter; ~35 km NW.",
 "around:Banyoles and its lake": TR + " Estany de Banyoles (1992 Olympic rowing), the walk around it (~6.5 km, verify), Ca l'Àngel is a kept venue on the road north (name only).",
 "around:Olot and the Garrotxa volcanoes": TR + " Zona Volcànica de la Garrotxa, Fageda d'en Jordà, Santa Pau (the fesols are a larder card: point, do not retell).",
 "around:The Costa Brava": "Pointer card to the sister guide /terroir/Costa-Brava-Catalunya/ (Palamós, Calella de Palafrugell, L'Escala): what is 40-60 minutes away by road (verify a bus line e.g. Sarfa/Moventis to Palafrugell). Labels Getting there · Time needed · Don't miss. Say 'it has its own guide'. maps_query 'Calella de Palafrugell, Girona, Spain'.",
 "around:Cadaqués": "Pointer card to the sister guide /terroir/Cadaques-CapdeCreus/: how far (about 1h15 by car via Figueres, verify), what it is in two lines; 'it has its own guide'. Labels Getting there · Time needed · Don't miss. maps_query 'Cadaqués, Girona, Spain'.",
 "avoid:Dinner on the Plaça de la Independència": AV,
 "avoid:The paella boards by the bridges": AV + " The old card sent readers to Arròs 9, which is CUT: send them instead to the old houses' daily rice (Can Marquès) or Fonda Cal Ros.",
 "avoid:Turning up at El Celler unbooked": AV,
 "avoid:Driving into the Barri Vell": AV + " NEW: the Barri Vell's restricted-access traffic zone (cameras; residents only) — verify the rule and where to park (e.g. Parking Sant Feliu / Pou Rodó?). If unverifiable, write it about the narrow stepped lanes and say only what you can source.",
 "follow:Fires de Sant Narcís": FO, "follow:Temps de Flors": FO, "follow:Mercat del Lleó": FO, "follow:DO Empordà": FO, "follow:El Celler de Can Roca": FO,
}
EXTRA_OLD = {"walks:The Onyar bridges": "culture:Cases de l'Onyar & the Eiffel bridge", "walks:Parc de la Devesa": "work:Parc de la Devesa benches",
             "walks:Passeig de la Muralla": "culture:Passeig de la Muralla", "listening:El meu avi and the havaneres": "music:Havaneres & cremat",
             "quarters:Barri Vell": "quartiers:Sant Feliu", "larder:The Lleó market, for the galley": "gastronomy:Mercat del Lleó",
             "larder:Cal Formatger's board": "gastronomy:Cal Formatger", "linger:La Fàbrica with a laptop": "work:La Fàbrica"}
GEN = {"walks": "Walk card: labels Start · Length · Time · Terrain · Best hour · Don't miss · Bring. maps_query = the START point + ', Girona, Spain'. Verify length if you can; keep the old figures otherwise, marked 'about'.",
       "culture": "Sight card: labels Where · Open · Cost · Best hour · Time needed · Don't miss. VERIFY 2026 hours and prices now (official sites through WebSearch) and date them '(Oct 2026)'.",
       "provisioning": "Market/product card: market labels Days · Hours · Go at · Look for; product (DOP/IGP) labels What it is · Season · Where to buy · Taste it; estate labels Where · Open · Buy · Price · Book. Verify 2026 days/hours.",
       "coffee-gardens": "Room/corner card: labels Where · Open · Order · Work? (for a café) or Getting there · Best hour · Bring · Don't miss (for a garden). Verify the café trades in 2026 (one WebSearch).",
       "bars": "Drink how-to: labels In the glass · On the label · Ask for. No Maps.",
       "listening": "Music card: labels Where · On · Price · Best hour (a song card: Touch it today · Where the sources argue). Verify the 2026 edition's dates for festivals. maps_query only for a venue you go to.",
       "follow": FO, "avoid": AV, "around": TR, "quartiers": QU, "curiosities": CU}
for k in PLAN["_pointers"]: assert k in NEW_BRIEF
batches = {1: ["quartiers", "curiosities", "avoid", "follow"], 2: ["provisioning", "walks"], 3: ["culture", "craft", "coffee-gardens"], 4: ["bars", "listening", "around"]}
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
v1 = [i for i in LANE if LANE[i][0] in ("summit", "roca", "houses", "chefs")]; v2 = [i for i in LANE if i not in v1]
for n, ids in ((1, v1), (2, v2)):
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
print("venues", len(v1), len(v2))
