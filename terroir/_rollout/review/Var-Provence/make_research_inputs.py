#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (17 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Var-Provence/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}
TW = ("NEW town card (the Var is a department: its 'quarters' are towns). Build it from the old guide text (research/guide_text_old.txt: [soul], [history], [why-now], [money-sits], "
      "[curiosities], [provisioning], [avoid], [seasonal]) and the kept venue records, verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept "
      "table venues or larder cards of this guide, never a cut one). maps_query = the town + ', Var, France'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card from the old [curiosities] / [history] / [soul] / [eat] prose (research/guide_text_old.txt): one verified fact most guides get wrong or never tell. "
      "Verify it now (one or two WebSearch) and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Var, France'), else empty. Rename the card if a better short title fits.")
PV = ("NEW larder card from the old [provisioning] prose in research/guide_text_old.txt (the paragraph naming this place). Verify it trades in 2026 and its days/hours "
      "(one or two WebSearch). Market labels Days · Hours · Go at · Look for; shop/producer labels Where · Open · Buy · Price. site = its own domain only if confident.")
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_2.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle (the larder: what a cook buys or tastes here), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports); maps_query empty (the table card carries the Maps link).")
AV = ("NEW warning card from the old [avoid] prose (research/guide_text_old.txt), tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Keep it to the claims the old text makes, verified where dated (Les Voiles 2026 dates, the Fête des Vins de Bandol 2026 date); no invented numbers.")
FO = "Follow card from the old [follow] prose. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
NEW_BRIEF = {
 "towns:Saint-Tropez": TW + " The fishing port under the glamour: the old port, La Ponche quarter, the Place des Lices (pétanque, the Tuesday and Saturday market — verify), the Bravade (16-18 May, since 1558). The Citadelle, the church, the Annonciade, Sénéquier and La Ponche have their own cards: point to them.",
 "towns:Ramatuelle & Gassin": TW + " The two perched villages above Pampelonne: Ramatuelle's circular old village and the Gérard Philipe grave (verify), Gassin's terrace over the gulf. Pampelonne's beach and clubs have their own cards.",
 "towns:Bormes-les-Mimosas": TW + " The medieval village above the coast, the name added in 1968 (the mimosa curiosity owns the Australian origin: do not retell it), the corso (Feb), the lanes. Lou Portaou is its table in the guide; Fort de Brégançon has its own card.",
 "towns:Toulon": TW + " The warship town: the Rade, the old town (Basse Ville), the Cours Lafayette market (its own pointer card), the natural-wine counters (their own cards), Mont Faron (a walk card). The navy facts belong to the curiosity 'Most of the French fleet sleeps in Toulon': do not retell.",
 "towns:Sanary-sur-Mer & Le Brusc": TW + " The working port with the painted pointus, the rosé apéro on the quay (old [soul]), Le Brusc's fishing harbour and the Île des Embiez boat. The Wednesday market and the exiles of 1933 have their own cards: point to them.",
 "towns:Bandol": TW + " The port town that gave its name to the appellation; the Maison des Vins (its own larder card), the Fête des Vins de Bandol in December (verify the 2026 date: the old text says 5-6 Dec), the Île de Bendor. The wine itself is the drink cards'.",
 "towns:Hyères": TW + " The Riviera's first winter resort (old [soul]): the medieval old town, the palms, the Belle Époque villas, the Saturday market, the port for the islands. Villa Noailles, Giens and the islands have their own cards: point to them.",
 "towns:Collobrières": "Rebuild the old walks card as a TOWN card (labels Go for · Best hour · Don't miss · Eat): the chestnut village of the Maures; the Fête de la Châtaigne (the Sundays of 11, 18 and 25 Oct 2026 per the old text — 18 Oct is tomorrow: verify, keep the dates), the old bridge. Confiserie Azuréenne and La Petite Fontaine are table venues; La Verne is a walk card: point, do not retell.",
 "curiosities:The fig with its own appellation": CU + " Figue de Solliès, the Bourjassotte Noire: AOC 2006, AOP 2011, the share of France's fig harvest (old text says 'roughly three-quarters' and elsewhere 'well over half': settle it or keep both as a dispute). The larder card 'The Solliès fig growers' owns where to buy: do not retell.",
 "curiosities:The cork oak that survives the fire": CU + " The Maures cork oak: bark that spares the trunk, the resprouting; the massif's schist geology vs limestone Provence; cork once corked the bottles of the south (old [history]).",
 "curiosities:The mimosa is Australian": CU + " Mimosa (Acacia dealbata) came from Australia and escaped 19th-century Riviera gardens; Bormes added '-les-Mimosas' in 1968; the corso since 1920 (verify).",
 "curiosities:Why the islands are golden": CU + " The Îles d'Or: the Renaissance name, the mica-schist glint (verify; keep the dispute if sources differ).",
 "curiosities:Most of the French fleet sleeps in Toulon": CU + " The arsenal (Henri IV 1599, Richelieu, Colbert, Vauban), the largest naval base in the Mediterranean, the carrier Charles de Gaulle, over 60% of the fleet's tonnage, the drydocks of 422 m (verify each). maps_query 'Rade de Toulon, Var, France'.",
 "curiosities:The river the Var lost in 1860": CU + " When Nice was annexed in 1860, the arrondissement of Grasse was moved to the new Alpes-Maritimes, and the river Var no longer flows through the Var department (verify). The pan bagnat is Niçois, not Var (old [eat]): one line.",
 "curiosities:15 August 1944": CU + " Operation Dragoon: landings between Cavalaire and Saint-Raphaël, Toulon and Marseille freed within about two weeks (verify the troop numbers in the old text, 'half a million'). Touch it today: the Mont Faron memorial (the Mont Faron walk card owns the cable car: only name it), the beaches. maps_query only if one place.",
 "curiosities:Sanary, capital of German letters": CU + " After 1933 Sanary became the 'capital of German literature in exile': Thomas Mann, Brecht, Feuchtwanger, Werfel, Alma Mahler; Huxley wrote Brave New World there (verify each name; the plaque on the port office — verify). maps_query 'Sanary-sur-Mer port, Var, France' only if a plaque is verified.",
 "provisioning:Cours Lafayette": PT.format(vid="v-marche-du-cours-lafayette"),
 "provisioning:Sanary's Wednesday market": PV + " Built from the old [provisioning] prose AND the cut venue record v-marche-de-sanary-sur-mer (in research/venues_cut.json): the big Wednesday market on the port, 8am-1pm; TF1 viewers' 'most beautiful market' 2018 (verify).",
 "provisioning:The Aups truffle market": PV + " The Thursday-morning black-truffle market on Place Mistral, Aups, roughly late November to February/March (verify the 2026-27 opening); cash, sold by the gram; the Fête de la Truffe in January (old [seasonal]: 24-25 Jan 2026; 2027 date if announced). maps_query 'Place Mistral, Aups, Var, France'.",
 "provisioning:Vieux Moulin du Partégal": PV + " 159 chemin des Laures, La Farlède: 16th-century olive mill, free guided tour and tasting (verify).",
 "provisioning:The Solliès fig growers": PV + " Where to buy the AOP Figue de Solliès: the growers of the Gapeau valley, the fig fair at Solliès-Pont (verify the month), late August to October. Do not retell the AOP history (the curiosity owns it).",
 "provisioning:Confiserie Azuréenne": PT.format(vid="v-confiserie-azureenne"),
 "provisioning:Maison des Vins de Bandol": PV + " The appellation's own shop and tasting counter in Bandol (verify the address and that it trades in 2026).",
 "provisioning:Maison des Vins Côtes de Provence": PV + " Les Arcs-sur-Argens on the RN7: 800+ references at estate prices, a free rotating tasting (verify numbers and 2026).",
 "provisioning:Cave de la Capte": PV + " Rebuild the old natural-wine card 'Cave de la Capte / Vert d'Olive (Hyères)' as a wine-shop card for Cave de la Capte only (on the Giens road, founded 1995): bottles to take away.",
 "walks:The customs path, Gigaro to L'Escalet": "NEW walk card: the sentier du littoral (the customs path; the old [soul] says 'first cut in 1791 against smugglers' — verify the date or keep as 'often said'), from Gigaro (La Croix-Valmer) past Cap Lardier and Cap Taillat to L'Escalet (Ramatuelle). Walk labels Start · Length · Time · Terrain · Best hour · Don't miss · Bring; length/time 'about'. Cap Taillat is its own swim card: name it, do not retell its Club Med story. maps_query 'Plage de Gigaro, La Croix-Valmer, Var, France'.",
 "calas:Pampelonne, the public end": "NEW beach card: Pampelonne's 4.5 km (verify) of sand in Ramatuelle; the 2017-2019 rebuild that cut the beach-club concessions and pulled them back from the sand (verify: the State's 'schéma d'aménagement'); the free public stretches and car parks (Tahiti, Bonne Terrasse ends). Beach labels Getting there · Best hour · Bring · Don't miss. The clubs have their own cards: do not retell them. maps_query 'Plage de Pampelonne, Ramatuelle, Var, France'.",
 "culture:Musée de l'Annonciade": "NEW museum card: the Annonciade in Saint-Tropez, the 16th-century chapel by the port holding Signac, Matisse, Bonnard, the pointillists (verify: Signac arrived 1892; Georges Grammont's gift 1955). Verify 2026 status (it closed for works? check), hours and price. Sight labels Where · Open · Cost · Best hour · Time needed · Don't miss.",
 "craft:Do this one": "NEW #craft card (the old guide had no craft section). Research NOW (WebSearch, ~5 calls): the best Var craft a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment. Candidates to check: Salernes terre cuite and tomettes (a pottery or tile workshop with a named potter that takes students), Cogolin briar pipes (the Courrieu workshop, since 1802 — visits?) and the Manufacture des Tapis de Cogolin, Saint-Tropez handmade sandals (Rondini, K.Jacques: made to measure, not taught), Moustiers faïence (just over the line in Alpes-de-Haute-Provence: say so), cork or chestnut basketry in the Maures, the pointu boat-builders of the Var ports. Pick the ONE that best meets: an unbroken Var craft + named master + you can enrol. Rename the card (name = the place). Labels What you do · Time · Cost · Book. If nothing qualifies, make this card the honest best option and say what it lacks.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Provençal craft": "NEW tag 'the warning', NO Maps. What is sold in the Saint-Tropez and port-town shops as Provençal-made and is not (printed 'Provence' fabrics made far away, imported lavender sachets, cicada pottery, 'savon de Marseille' that is not): only claims you can source (e.g. the 'Savon de Marseille' labelling dispute, the IGP for Provence-made products if any). Labels: Touch it today · Instead.",
 "avoid:Saint-Tropez in August": AV, "avoid:Eating on the photogenic quay": AV, "avoid:Thinking the Var stops at the beach": AV, "avoid:Pale pink, and calling it terroir": AV,
 "follow:Var Tourisme": FO + " The Var departmental tourism body (old: @levarlunique; verify its site, e.g. visitvar.fr).", "follow:Saint-Tropez Tourisme": FO + " sainttropeztourisme.com (verify).",
 "follow:Parc national de Port-Cros": FO + " portcros-parcnational.fr (verify).", "follow:Vins de Bandol": FO + " The Bandol AOP body (old: @vinsdebandol; verify site, e.g. vinsdebandol.com).",
 "follow:Villa Noailles": FO + " villanoailles.com — Design Parade (June) and the fashion and photography festival (October).", "follow:MICHELIN Guide France": FO + " guide.michelin.com — the France selection; the 2026 ceremony date and whether the 2027 date is announced (verify).",
}
EXTRA_OLD = {"culture:Villa Noailles": "landmarks:Villa Noailles (Hyères)", "walks:Up to the Chartreuse de la Verne": "landmarks:Chartreuse de la Verne",
             "culture:Domaine du Rayol": "secret-gems:Domaine du Rayol, Le Jardin des Mediterranees", "linger:Sénéquier": "hotel-bars:Sénéquier",
             "bars:Les Caves du Roy": "st-tropez:Les Caves du Roy", "drink:Bandol rouge": "gastronomy:Bandol", "drink:Côtes de Provence rosé": "gastronomy:Cotes de Provence",
             "drink:Bandol rosé": "gastronomy:Provence rose (the machine)", "around:Bandol wine country": "culture:Domaine Tempier", "calas:Plage Notre-Dame": "around:Porquerolles & Port-Cros (Îles d'Or)"}
batches = {1: ["quartiers", "curiosities"], 2: ["provisioning", "walks", "calas", "avoid", "follow"], 3: ["culture", "craft", "coffee-gardens"], 4: ["bars"], 5: ["listening", "around"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in EXTRA_OLD: e["old_also"] = OLD[EXTRA_OLD[c["key"]]]
                if c["key"] in NEW_BRIEF: e["brief"] = NEW_BRIEF[c["key"]]
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
A = ("summit", "seastar", "inland", "sand")
splits = {1: [i for i in keep if LANE[i][0] in A], 2: [i for i in keep if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
