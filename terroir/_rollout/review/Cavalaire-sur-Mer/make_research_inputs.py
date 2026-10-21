#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (21 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Cavalaire-sur-Mer/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}; V.update(PICKS["new_venues"])
QW = ("NEW quarter card (the bay's quarters and its two neighbours over the capes). Build it from the old guide text (research/guide_text_old.txt: [soul], [history], "
      "[money-sits], [curiosities], [avoid], [seasonal]) and the kept venue records, verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept "
      "table venues of this guide, never a cut one). maps_query = the place + ', Var, France'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card from the old [curiosities] / [history] prose (research/guide_text_old.txt): one verified fact most guides get wrong or never tell. "
      "Verify it now (one or two WebSearch) and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Var, France'), else empty. Rename the card if a better short title fits.")
PV = ("NEW larder card from the old [provisioning] / [drink-place] prose in research/guide_text_old.txt (the paragraph naming this place). Verify it trades in 2026 and its days/hours "
      "(one or two WebSearch). Market labels Days · Hours · Go at · Look for; shop/producer/estate labels Where · Open · Buy · Price. site = its own domain only if confident.")
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_2.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle (the larder: what a cook buys here and how to shop it), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports; Order = what to buy); maps_query empty (the table card carries the Maps link).")
AV = ("NEW warning card from the old [avoid] prose (research/guide_text_old.txt), tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Keep it to the claims the old text makes, verified where dated (the Bateaux Verts Cavalaire–Saint-Tropez shuttle season 2026, if it runs from Cavalaire at all — verify); no invented numbers.")
FO = "Follow card from the old [follow] prose. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
NEW_BRIEF = {
 "quartiers:Port Héraclea": "Rebuild the old landmarks card as a QUARTER card for the port (labels Go for · Best hour · Don't miss · Eat): Port Héraclea, about 1,100 berths, the SPL that runs it, the Heraclea Caccabaria name (the Antonine Itinerary identification is a scholarly claim: keep it as 'generally identified'), the fishermen at Quai Marc Pajot (their own table card in the street lane: name it, do not retell), the Nouveau Port terraces. maps_query 'Port de Cavalaire, Cavalaire-sur-Mer, Var, France'.",
 "quartiers:Pardigon": "Rebuild the old secret-gems card as a QUARTER card: the green amphitheatre behind the eastern beach, the Carrade stream, the two Roman villas excavated and reburied (the old curiosities say 'one of the largest maritime Roman villas known in the Mediterranean' — verify or soften), Pardigon beach. Labels Go for · Best hour · Don't miss.",
 "quartiers:The young town": "Rebuild the old Église Saint-Laurent card as a QUARTER card for the town centre: commune detached from Gassin in 1929 (verify), the chapel of 1910 enlarged 1932, parish 1960, resort classification 1956 and Station de Tourisme 2013 (verify). The railway story belongs to the curiosity 'The train that made the town': do not retell. maps_query 'Église Saint-Laurent, Cavalaire-sur-Mer, Var, France'.",
 "quartiers:La Croix-Valmer and Gigaro": QW + " The neighbour over Cap Lardier: the village above the vines, Gigaro beach where the coast path starts (the walk has its own card), the Plage du Débarquement (the culture card 'Alpha' owns 1944), the Sunday market (its own larder card), Domaine de la Croix (its own card). Several kept tables are here (La Palmeraie, Vista, Les Saisonniers, La Pinède, Marius, Le Refuge): name, do not retell. The name: the legend of Constantine's cross in the sky (verify; keep as legend).",
 "quartiers:Le Rayol-Canadel": QW + " The neighbour west along the Corniche des Maures: the Domaine du Rayol (its own culture card), the Rayol and Canadel beaches, the Patio stairs / the 1925 'Escalier' (verify), Maurin des Maures and the Café des Jardiniers (table cards). maps_query 'Le Rayol-Canadel-sur-Mer, Var, France'.",
 "curiosities:The hill fort over the bay": CU + " The Ligurian oppidum on Montjean (460 m ridge, from the 6th c. BC per the old text — verify height and date), what is left to see.",
 "curiosities:The train that made the town": CU + " The coastal railway Hyères–Saint-Raphaël reached Cavalaire in 1890 (verify; the old [history] calls it the 'train des Pignes', which is the Nice–Digne line: check and correct), closed (date?), the old station is now an exhibition hall (verify). Commune 1929.",
 "curiosities:The seafarers' chapel of 1639": CU + " Notre-Dame de l'Annonciade, 1639, shut 1793, ruins cleared during the occupation (old text — verify or keep as 'the town's own history says').",
 "curiosities:A drowned fleet under the swimmers": CU + " The bay as a wreck-diving ground, more than a dozen wrecks, the cargo Togo sunk by a mine on 12 May 1918 at about 58 m (verify; the Togo may lie off Cap Lardier / La Croix-Valmer, say where). maps_query empty.",
 "curiosities:The tuna traps of the gulf": CU + " The madragues of the Golfe de Saint-Tropez: four leases (Cap de la Moutte, Pampelonne, Les Canebiers, La Nartelle), the last French madrague off Marseille 1914 (verify each, keep any dispute).",
 "curiosities:The pointu": CU + " The double-ended Provençal fishing boat; the barquette marseillaise on France's inventory of intangible cultural heritage (verify); pointus still at Cavalaire's quay (only if verified, else 'on this coast').",
 "provisioning:The fishermen's stand": PT.format(vid="v-pecheurs-du-port"),
 "provisioning:Wednesday market": PT.format(vid="v-marche-place-jean-moulin"),
 "provisioning:La Croix-Valmer's Sunday market": PV + " Sunday mornings, year-round, Place des Palmiers (verify the square and season), olives, peaches, herbs, local wine. maps_query 'Place des Palmiers, La Croix-Valmer, Var, France' if verified.",
 "provisioning:Domaine de la Croix": PV + " Cru Classé (1955) estate of La Croix-Valmer, founded 1882, its Bastide Blanche organic site by the sea; cellar 816 Boulevard de Tabarin; old text: Mon–Sat 10:00–13:00 and 15:00–19:30 (winter hours? verify); the 'Irrésistible' rosé. Do not retell the 1955 classification (the drink card 'Cru Classé rosé' owns it): name it.",
 "provisioning:Domaine La Tourraque": PV + " Ramatuelle, inside the protected Trois Caps site; family estate (Brun-Craveris), organic since 2013 (verify); tasting cellar and season.",
 "provisioning:Château Minuty": PV + " Gassin; one of the 1955 Crus Classés; the Matton/Farnet family; tasting room open season (verify 2026 hours).",
 "provisioning:La Cave de Mon Village": "Rebuild the old natural-wine card as a wine-shop card (labels Where · Open · Buy · Price): 329 avenue des Alliés, Cavalaire; the in-town caviste with a counter; verify it trades in 2026.",
 "calas:The douaniers' coves": "NEW beach card from the old [money-sits] gem 'The douaniers' coves below Cap Lardier' (research/guide_text_old.txt): crique de la Douane, Jovat with its fishing-cabin ruin, Brouis; from the eastern corner of Gigaro. Beach labels Getting there · Best hour · Bring · Don't miss. The Trois Caps walk owns the path itself: name it. maps_query 'Plage de Gigaro, La Croix-Valmer, Var, France'.",
 "calas:Bonporteau": "Rebuild the old Bonporteau calas card merged with the [why-now] gem (the seven-buoy underwater trail, guided Tuesday mornings in July–August by the Port-Cros park, ~1h30, ~8/11 EUR in the old text: verify 2026). Beach labels.",
 "craft:Do this one": "NEW #craft card (the old guide had no craft section). Research NOW (WebSearch, ~5 calls): the best craft of the Saint-Tropez peninsula and the Maures a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment. Candidates: Cogolin — briar pipes (Courrieu, since 1802: visits?), the Manufacture des Tapis de Cogolin (hand-tufted carpets; visits?), Cogolin reeds for saxophone/clarinet (Rigotti; visits?); Saint-Tropez handmade sandals (Rondini since 1927, K.Jacques: made to measure, not taught); Collobrières/Maures cork; a pottery in the gulf that takes students. Pick the ONE that best meets: an unbroken local craft + named master + you can enrol. Rename the card (name = the place). Labels What you do · Time · Cost · Book. If nothing qualifies, make this card the honest best option and say what it lacks.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Provençal craft": "NEW tag 'the warning', NO Maps. What is sold in the gulf's seafront shops as Provençal-made and is not (printed 'Provence' fabrics made far away, imported lavender sachets, cicada pottery, 'savon de Marseille' that is not): only claims you can source. Labels: Touch it today · Instead.",
 "listening:No hi-fi bar on this bay": "NEW honest card, tag 'honestly', NO Maps: there is no hi-fi / listening bar in Cavalaire or the gulf that you could find (search once: 'listening bar' 'hi-fi' Saint-Tropez / Var 2026); if you DO find a real one with a dated 2026 source, make the card about it instead. Labels: Touch it today · Instead (the free open-air music of the bay: name the cards below).",
 "avoid:Saint-Tropez by car in August": AV, "avoid:The Pampelonne fantasy": AV, "avoid:Reading the winter seafront as empty": AV, "avoid:'Fresh fish' without asking": AV,
 "follow:Cavalaire Tourisme": FO + " Cavalaire's tourist office (old: @cavalairetourisme; verify the site, e.g. cavalaire.fr or cavalairesurmer.fr).",
 "follow:Golfe de Saint-Tropez Tourisme": FO + " The gulf's community tourist office (old: @otc_golfedesainttropez; verify site).",
 "follow:Les Bateaux Verts": FO + " The gulf shuttle-boat operator, Sainte-Maxime (verify site, e.g. bateauxverts.com, and whether it serves Cavalaire in 2026).",
 "follow:Parc national de Port-Cros": FO + " portcros-parcnational.fr (verify).",
 "follow:Domaine du Rayol": FO + " domainedurayol.org (verify). Do not retell the garden (its culture card owns it).",
}
EXTRA_OLD = {
 "walks:Le Sentier des Trois Caps": "culture:Cap Lardier & Cap Taillat coastal path", "walks:Cap Lardier's crest": "landmarks:Cap Lardier",
 "walks:Sentier du Fenouillet": "culture:Sentier du Fenouillet, Corniche des Maures",
 "calas:The Rayol coves": "around:Corniche des Maures pocket coves",
 "culture:Domaine du Rayol": "landmarks:Domaine du Rayol — Le Jardin des Méditerranées",
 "culture:Alpha — the landing beach": "culture:Monument du Débarquement, Plage de Cavalaire (Alpha Beach)",
 "around:Gassin": "culture:Gassin", "listening:Festival Face à la Mer": "nightlife:Festival Face à la Mer",
 "drink:Côtes de Provence rosé": "dish:Rosé de Provence (Côtes de Provence & Bandol)",
}
EXTRA_BRIEF = {
 "culture:Alpha — the landing beach": "Merge the two monument cards AND the old 1944 story fold ([story-box] in research/guide_text_old.txt: Alpha sector, the 3rd Infantry Division at H-Hour 08:00 on 15 Aug, de Lattre's Army B from the evening of 16 Aug, the Plage du Débarquement in La Croix-Valmer vs the monument at Cavalaire's harbour entrance) into ONE sight card. Verify the numbers you keep. Sight labels Where · Open · Cost · Best hour · Time needed · Don't miss.",
 "culture:Domaine du Rayol": "Merge all four old Domaine du Rayol cards (culture, landmarks, around, secret-gems — the texts are in research/cards_old.json) into ONE garden card; verify 2026 hours and prices (October/winter hours). The underwater trail is its own card (calas): name it. The Café des Jardiniers is a table: name it.",
 "calas:Cap Taillat": "Merge the [money-sits] gem on the Cap Taillat tombolo (142 ha, Conservatoire 1987) into this card; verify the hectares/dates (the Club Med project story if any).",
 "walks:Le Sentier des Trois Caps": "Merge the three old cards of this walk into ONE walk card (Start · Length · Time · Terrain · Best hour · Don't miss · Bring); the douaniers' coves and Cap Lardier's crest have their own cards: name them, do not retell.",
 "listening:Jazz à Ramatuelle": "The old card says no 2026 edition was programmed: verify the 2026 status honestly (cancelled? held?).",
 "bars:Playa Mezcala": "The old card puts it 'near the Saint-Raphaël end of the bay' — that cannot be Cavalaire's bay: verify where it is (Cavalaire? Pardigon?) and that it trades in 2026; if it is not on this bay, say so in _notes and write the card honestly or mark it for cutting.",
 "around:Porquerolles and Port-Cros": "Verify the 2026 ferry from Cavalaire/La Croix-Valmer (season) and year-round from Le Lavandou/Hyères; Port-Cros national park 1963.",
}
batches = {1: ["quartiers", "curiosities", "culture"], 2: ["provisioning", "walks", "calas", "avoid", "follow"], 3: ["craft", "coffee-gardens", "bars"], 4: ["listening", "around"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in EXTRA_OLD: e["old_also"] = OLD[EXTRA_OLD[c["key"]]]
                b = " ".join(x for x in (NEW_BRIEF.get(c["key"]), EXTRA_BRIEF.get(c["key"])) if x)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
A = ("summit", "chefs", "sand")
splits = {1: [i for i in keep if LANE[i][0] in A], 2: [i for i in keep if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
