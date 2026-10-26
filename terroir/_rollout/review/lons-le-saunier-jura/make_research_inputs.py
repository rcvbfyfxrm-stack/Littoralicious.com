#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (26 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane; the two Lons tables cut for the cap
ride along as alternates, so the editor can swap one in if a kept table fails its re-check)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/lons-le-saunier-jura/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}; V.update(PICKS["new_venues"])
QW = ("Quarter/village card. Build it from the old guide text (research/guide_text_old.txt: [quartiers], [walk], [history]) and the kept venue records, "
      "verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide, never a cut one). "
      "maps_query = the place + ', Lons-le-Saunier, France' (or ', <village>, Jura, France'). Do not retell another card's story: name it and move on.")
CU = ("Curiosity card: one verified fact most guides get wrong or never tell. Verify it now (one or two WebSearch) "
      "and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it, else empty.")
PERSON = "Person card (born here). Labels Born · Trace today · Read. tag 'born here'. maps_query = the place where the trace is today, if one."
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle ({angle}), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports); maps_query empty (the table card carries the Maps link).")
AV = "Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). Instead names only kept venues/cards."
FO = "Follow card. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
CELLAR = ("Cellar card (this place was a venue record in the old guide; its record is given as old_record). Verify it trades in 2026, its address, whether and how it receives "
          "visitors in 2026 (appointment, shop hours), prices (dated), and any winter close. Labels Where · Open · Pour · Price · Book. "
          "maps_query = the estate + ', <village>, Jura, France'. site = own domain only.")
NEW_BRIEF = {
 "quartiers:Place de la Liberté and the arcades": QW + " Merge the old work card on the arcades. Place de la Liberté (Bartholdi's Rouget de Lisle statue, 1882 — verify; the theatre and its clock playing the Marseillaise? verify) and rue du Commerce with its arcades (the old '146 m', 'Franche-Comté's only arcaded street' and '146 arcades' claims: verify — keep only what a source supports). Rouget de Lisle has his own card (name only); Fromagerie Vagne and Pelen are table cards (name only). maps_query 'Rue du Commerce, Lons-le-Saunier, France'.",
 "quartiers:Place de la Comédie and the market squares": QW + " The squares of the market days (Place de la Comédie, Place du 11 Novembre, Place de Verdun: verify which square holds what on Thursday and Saturday), the theatre (verify date). The market itself is a table card (name only). maps_query 'Place de la Comédie, Lons-le-Saunier, France'.",
 "quartiers:The Parc des Bains and the Source Salée": QW + " Merge the old work card and the gem 'Source Salée — 07:30 brume'. The Parc des Bains (Parc Édouard Guenon? verify the name), the Source Salée/ Puits Salé basin, the Thermes Lédonia (verify 2026), the 'saunier' etymology (the salt curiosity owns the geology and the salt history: name only). maps_query 'Parc des Bains, Lons-le-Saunier, France'.",
 "quartiers:Arbois": QW + " Merge the old Arbois walk card and the gem 'The Cuisance bank in Arbois'. Arbois, 'capitale des vins du Jura', the Cuisance, the Place de la Liberté arcades, the church Saint-Just (verify), the Pasteur house (culture card: name only). Le Bistronôme, La Finette and Le Bistrot des Claquets are table cards (name only). maps_query 'Place de la Liberté, Arbois, Jura, France'.",
 "quartiers:Pupillin": QW + " NEW. Pupillin, 3 km from Arbois, 'capitale mondiale du Ploussard' (verify the sign), the Fruitière Vinicole de Pupillin (verify 2026 shop), Overnoy/Houillon (a cellar card: name only), La Table du Grapiot (table card: name only). maps_query 'Pupillin, Jura, France'.",
 "quartiers:Château-Chalon": QW + " Merge the old Château-Chalon walk card and the gem 'Château-Chalon belvedere'. One of the Plus Beaux Villages de France (verify), on a cliff over the Seille; the Vin Jaune-only AOC (~50 ha: verify); the belvedere; the abbey of noblewomen (verify). Domaine Macle is a cellar card (name only). maps_query 'Château-Chalon, Jura, France'.",
 "curiosities:The salt under the town": CU + " From the old [history] text: the Triassic salt beds, the springs at ~300 g/l (verify), salt worked since the Neolithic (verify), the Lons saltworks closing 1966 (verify), 'saunier' = salt-maker. Keep figures you cannot verify out. maps_query 'Puits Salé, Lons-le-Saunier, France' only if there is a place to see it.",
 "curiosities:Savagnin's family tree": CU + " The DNA work (Regner? Bowers? 1999? verify who and when) placing Savagnin/Traminer as parent of Sauvignon Blanc, Chenin Blanc, Grüner Veltliner (verify each — Grüner = Savagnin × St. Georgen, 2009?), grandparent of Cabernet Sauvignon; Gewürztraminer as its aromatic form. Correct the old card where needed. maps_query empty.",
 "curiosities:Arbois in the first gazette": CU + " The old claim: the Journal Officiel of 15 May 1936 gazetted the first AOCs: Arbois, Cassis, Châteauneuf-du-Pape, Monbazillac, Tavel (and Vosne-Romanée? verify the list and date; Châteauneuf's own claim to be first); Arbois 'first AOC' is a local claim — keep the dispute. maps_query empty.",
 "curiosities:Rouget de Lisle": PERSON + " Merge the old culture card and the gem 'Cour Rouget de Lisle'. Born Lons 10 May 1760 (verify), wrote the Chant de guerre pour l'armée du Rhin in Strasbourg, April 1792; birth house 24 rue du Commerce (verify: is it visitable in 2026? the tilleul?), the Bartholdi statue (Place de la Liberté card: name only). maps_query '24 rue du Commerce, Lons-le-Saunier, France'.",
 "provisioning:The Lons markets": PT.format(vid="v12-march-de-lons-le-saunier", angle="the larder: what a cook buys here and how to shop it; merge the old Saturday market card and the Morteau-from-the-market street-food card"),
 "provisioning:Fromagerie Vagne": PT.format(vid="v-fromagerie-vagne", angle="the larder: what a cook takes aboard from a fromager — whole Comté pieces, vacuum packing"),
 "provisioning:Pelen": PT.format(vid="v10-p-tisserie-chocolaterie-pelen", angle="for the galley: the chocolate and the Galet de Chalain to take aboard"),
 "provisioning:Cancoillotte by the jar": "Product card from the old street-food card (name 'Cancoillotte by the jar'). Labels What it is · Where to buy · Taste it. The cancoillotte dish story belongs to The Dish: tell the jar and how to buy it, not the history. Verify the IGP (2019? verify). maps_query empty.",
 "listening:No hi-fi listening bar": "Honest card, tag 'honestly', NO Maps. The old guide says no audiophile listening bar exists in Lons. VERIFY with 2 WebSearch ('bar d'écoute Lons-le-Saunier', 'listening bar vinyle Besançon'): if you find a real one in Lons or Besançon, write it instead (rename, tag 'listening bar', labels Where · Pour · Price · Best hour, maps). Otherwise labels Touch it today · Instead (Instead: the Caveau des Jacobins or Le Bœuf sur le Toit card).",
 "listening:Le Bœuf sur le Toit": "NEW live-music card: Le Bœuf sur le Toit, the scène de musiques actuelles of Lons-le-Saunier (verify: address, SMAC label, capacity, its 2026 season, any dated November 2026 shows). Labels Where · When · Cost · Best hour. maps_query 'Le Bœuf sur le Toit, Lons-le-Saunier, France'. site own domain only.",
 "listening:La Rodia, Besançon": "Merge the old music card. Verify La Rodia (SMAC, Besançon) 2026: address, typical nights, any dated November 2026 shows; distance from Lons (~1h). Drop the Lyon clubs and Nuits Sonores (not this guide's). Labels Where · When · Cost · Best hour. maps_query 'La Rodia, Besançon, France'.",
 "craft:Do this one": "NEW #craft card. Research NOW (WebSearch, ~5 calls): the best craft proper to the Jura a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment. Candidates: briar pipe-making in Saint-Claude (the pipe workshops — Genod, Butz-Choquin, Chacom: visits? a make-your-own-pipe session?), wooden toys of Moirans-en-Montagne (Musée du Jouet; a toy-maker's workshop?), lunetterie at Morez (Musée de la Lunette; a hands-on?), gem-cutting (lapidaires) at Septmoncel, Comté-making at a fruitière (a fruitière visit at dawn, the fromager named?), a cooper (tonnellerie) in the vineyard, wood-turning in the Haut-Jura. Pick the ONE that best meets: an unbroken local craft + named master + you can enrol. Rename the card (name = the place/person). Labels What you do · Time · Cost · Book. maps_query the workshop + ', Jura, France'.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Jura-made": "NEW tag 'the warning', NO Maps. What is sold in the town-centre shops as Jura and is not (only claims you can source: e.g. 'Vin Jaune' in 75 cl, Comté-style cheeses that are not Comté, Morteau-style sausages without the IGP cheville, wooden toys made abroad). Labels: Touch it today · Instead.",
 "around:Poligny and the Maison du Comté": "Day-trip card, built from the old venue record v13 (given as old_record) and the old text. Poligny, 'capitale du Comté' (verify), the Maison du Comté (verify 2026: did it reopen in a new building? the old record says 'site of the former municipal stadium' — verify address, price, November hours), the collegiate church. Day-trip labels Getting there · Time needed · Don't miss · Eat (only kept venues or none). maps_query 'Maison du Comté, Poligny, France'.",
 "around:Salins-les-Bains": "NEW day-trip card: the Grande Saline of Salins-les-Bains (UNESCO 2009 with Arc-et-Senans — verify), the underground gallery and the hydraulic wheel pump, 2026 November hours/price (verify). The Saline Royale is the culture card (name only). Day-trip labels. maps_query 'Grande Saline, Salins-les-Bains, France'.",
 "around:Dole": "NEW day-trip card: Dole, Pasteur's birthplace (Maison natale de Pasteur — verify 2026 opening), the Collégiale Notre-Dame, the canal of the tanners; distance from Lons (~50 km?). La Chaumière and Château du Mont Joly are cut from this guide: do NOT name them. Day-trip labels. maps_query 'Maison natale de Pasteur, Dole, France'.",
 "follow:Jura tourism": FO + " jura-tourism.com (verify).",
 "follow:Saline Royale": FO + " salineroyale.com (verify).",
 "follow:Vins du Jura (CIVJ)": FO + " jura-vins.com (verify).",
 "follow:Comté (CIGC)": FO + " comte.com (verify).",
}
EXTRA_BRIEF = {
 "walks:Lons at first light": "Merge the old arcades walk card and the old [walk] prose (research/guide_text_old.txt). Verify the route (Place de la Liberté, rue du Commerce, Saint-Désiré, the Parc des Bains), time ~40 min. Walk labels. Do not retell Saint-Désiré's crypt (culture card) or the brine (quarter card): name them.",
 "walks:The cirque of Baume-les-Messieurs": "Merge the old culture card 'Baume-les-Messieurs' (in cards_old.json). Verify the abbey (founded 9th c.? 869? the 890 Cluny link: Berno of Baume founded Cluny 910 — verify), the Flemish altarpiece, the grottes (open season — closed in November? verify), the cascade of the Dard/tufa, Plus Beaux Villages. Walk labels.",
 "walks:The Hérisson falls": "Merge the old culture card 'Cascades du Hérisson'. Verify: number of falls (31? the old 'seven' is the main ones), L'Éventail 65 m, Grand Saut 60 m, trail length/height, the November access (paths can be icy; the Maison des Cascades closed off-season?). Walk labels.",
 "walks:Belvédère des Quatre Lacs": "Verify the four lakes' names and the Pic de l'Aigle. Walk labels.",
 "culture:Saint-Désiré and its crypt": "Merge the old gem 'Saint-Désiré crypt'. Verify: 11th-c. Romanesque church, the crypt and the sarcophagus of Saint Désiré (date), how to visit (open? ask?). Sight labels.",
 "culture:Église des Cordeliers": "Verify: the Cordeliers church of Lons, the Chalon-Arlay tombs?, Rouget de Lisle's ... (verify any fact). Sight labels.",
 "culture:La Maison de la Vache qui rit": "Verify: La Maison de la Vache qui rit in Lons (opened 2009? verify), 2026 hours/price/November opening; Léon Bel 1921, Benjamin Rabier's drawing (1923/1924? verify); the cheese is a fromage fondu (do not claim Comté links unless sourced). Sight labels.",
 "culture:The Saline Royale": "Merge old record v17 (old_record). Verify Ledoux, 1775-1779, operations till 1895, UNESCO 1982 + Salins 2009, the saumoduc (21 km — verify), 2026 price and November hours; distance from Lons (~75 km? the old '25 km east' is likely wrong: verify). Salins-les-Bains is an Autour card: name only. Sight labels.",
 "culture:Maison de Louis Pasteur": "Merge old record v16 (old_record) and the avoid card on the Pasteur thesis myth. Verify: 83 rue de Courcelles Arbois, the lab, his vineyard at Rotalier/Montigny (the Clos Rosières — verify), 2026 price and season (closed in winter? verify — likely closed Nov-Mar), the doctorate 1847 (crystallography) vs the 1857 lactic fermentation mémoire, the 'pasteurisation' of wine from his Études sur le vin (1866). Sight labels. Dole is an Autour card: name only.",
 "culture:Musée d'Archéologie du Jura": "Verify 2026 status: the Lons archaeology museum (Musée d'archéologie / the new 'Musée des Beaux-Arts et d'Archéologie' project? Has it been closed for works? the Chalain lake-dwelling finds, the Neolithic pirogue). If closed, say so plainly in the card and tag it 'closed for works'. Sight labels.",
 "provisioning:Fort Saint-Antoine": "Verify: Marcel Petite's Fort Saint-Antoine (built 1879-1883? Séré de Rivières), Comté ageing since 1966, ~100,000 wheels (verify), visits (by appointment? summer only?), 1h45 from Lons. Producer labels Where · Open · Buy · Price. maps_query 'Fort Saint-Antoine, Saint-Antoine, Doubs, France'.",
 "provisioning:Volaille Miéral": "Verify: Miéral, Montrevel-en-Bresse, Bresse AOP poultry (AOC 1957), 2026 trading, shop, whether the starred Jura houses buy from it (only if sourced). Producer labels.",
 "linger:Café de la Comédie": "From the old work card: honest work-truth line (wifi? laptop?), the hour to sit. Verify the café exists in 2026 (Place de la Comédie / Le Grand Café du Théâtre? verify the name). Café labels Where · Open · Order · Work?.",
 "linger:The Médiathèque": "Verify the Médiathèque des Cordeliers? of Lons: name, address, hours, free wifi. Café labels Where · Open · Order (none) · Work?.",
 "drink:Vin Jaune": "Merge the sotolon paragraph of the old drink intro. Verify the 6 years 3 months minimum (counted from harvest, released 1 January? verify), 62 cl clavelin, sotolon. Wine labels In the glass · On the label · Ask for. Savagnin's genealogy is the curiosity card: name only.",
 "drink:Poulsard and Trousseau": "Merge the old Trousseau card. Wine labels.",
 "drink:The appellations": "Verify the six wine AOCs + the Jura vineyard size (~2,000 ha? verify a 2024/2025 CIVJ figure), L'Étoile's star-shaped fossils. Wine labels.",
 "drink:Macvin, Crémant and Marc": "Verify Macvin AOC 1991, Crémant du Jura AOC 1995, Marc du Jura (AOC/IG 2015?). Wine labels.",
 "drink:Vin de Paille": "Verify the rules (raisined at least 6 weeks? the old 'three months'; aged 3 years incl. 18 months in wood; 37.5 cl pot; minimum alcohol). Wine labels.",
 "bars:Domaine Macle": CELLAR + " Château-Chalon. Laurent Macle, the 8th generation? (verify Carmen Macle 2025).",
 "bars:Domaine Stéphane Tissot": CELLAR + " Montigny-lès-Arsures, the Arbois shop (verify the caveau in Arbois, Place de la Liberté?).",
 "bars:Overnoy and Ganevat": "Merge the old Overnoy/Houillon and Ganevat cards. HONEST card: allocation-only houses that do not receive visitors (verify both: Houillon/Overnoy Pupillin; Ganevat at Rotalier — he sold the domaine? verify 2021-2023 news of the Ganevat estate's sale/new owners). Tell what you can actually do (find the bottles at the Caveau des Jacobins or Le Bistrot des Claquets only if a source supports it, else say 'on a few lists'). Labels Where · Open · Pour · Book. maps_query empty.",
 "avoid:Vin Jaune on a café terrace": AV + " The 62 cl clavelin is the rule for Vin Jaune (verify). Instead: the Caveau des Jacobins (table card) or a cellar card (Domaine Macle).",
 "avoid:Comté in plastic": AV + " Keep to the claims the old text makes, without invented prices. Instead: Fromagerie Vagne or the Lons market (table cards).",
 "avoid:Jeunet in Arbois": AV + " Verify: Jeunet moved from 9 rue de l'Hôtel de Ville, Arbois to the Château de Germigney, Port-Lesney (Nov 2021? verify); what is at the old address now (if found). Instead: Maison Jeunet (table card).",
}
batches = {1: ["quartiers", "curiosities", "culture"], 2: ["provisioning", "walks", "around"], 3: ["avoid", "follow", "listening", "craft"], 4: ["coffee-gardens", "bars"]}
OLDREC = {"culture:The Saline Royale": "v17-salines-royales-d-arc-et-senans-unes", "culture:Maison de Louis Pasteur": "v16-maison-de-louis-pasteur",
          "around:Poligny and the Maison du Comté": "v13-maison-du-comt-poligny", "bars:Domaine Macle": "v14-domaine-macle", "bars:Domaine Stéphane Tissot": "v15-domaine-st-phane-tissot"}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in OLDREC: e["old_record"] = V[OLDREC[c["key"]]]
                b = " ".join(x for x in (NEW_BRIEF.get(c["key"]), EXTRA_BRIEF.get(c["key"])) if x)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
ALT = {"v04-la-com-die": ("lons", "ALTERNATE for the Lons lane (cut for the cap unless a kept table fails)"), "v07-la-table-de-perraud": ("lons", "ALTERNATE for the Lons lane (cut for the cap unless a kept table fails)")}
A = ("summit", "lons")
splits = {1: [i for i in LANE if LANE[i][0] in A] + list(ALT), 2: [i for i in LANE if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": (LANE.get(i) or ALT[i])[1], "_lane_key": (LANE.get(i) or ALT[i])[0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
