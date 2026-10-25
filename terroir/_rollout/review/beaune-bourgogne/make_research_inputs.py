#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (25 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/beaune-bourgogne/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}; V.update(PICKS["new_venues"])
QW = ("NEW quarter card. Build it from the old guide text (research/guide_text_old.txt: [quartiers], [walk], [history]) and the kept venue records, "
      "verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide, never a cut one). "
      "maps_query = the place + ', Beaune, France'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card: one verified fact most guides get wrong or never tell. Verify it now (one or two WebSearch) "
      "and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Beaune, France' or ', France'), else empty.")
PERSON = ("Person card (born here). Labels Born · Trace today · Read. tag 'born here'. maps_query = the place where the trace is today, if one (', Beaune, France').")
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle ({angle}), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports); maps_query empty (the table card carries the Maps link).")
AV = ("Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Keep to the claims the old text makes ([avoid] in research/guide_text_old.txt), verified where dated; no invented numbers. Instead names only kept venues/cards.")
FO = "NEW follow card. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
CELLAR = ("Cellar card (this place was a venue record in the old guide; its record is given as old_record). Verify it trades in 2026, its address, its 2026 visit formats, "
          "prices and booking (dated), and whether it is open on the auction weekend (13-16 Nov 2026) if you find it. Labels Where · Open · Pour · Price · Book. "
          "maps_query = the cellar + ', Beaune, France'. site = own domain only. If it has closed, say so in _verified and tag the card 'closed'.")
NEW_BRIEF = {
 "quartiers:Place Carnot and the Halle": QW + " The two linked squares at the heart of the ring: Place Carnot (cafés, the brocante; Le Carmin is a table card: name only) and Place de la Halle (the covered market of the Saturday market — a table venue: name only; the Hôtel-Dieu one block on — a culture card: name only). Mulot & Petitjean (larder card) and the Marché aux Vins (cellar card) open onto it. maps_query 'Place Carnot, Beaune, France'.",
 "quartiers:Rue Maufoux and the cellar streets": QW + " Merge the old 'Rue d'Enfer at dusk' gem. The wine-trade spine south-west: rue Maufoux, rue Paradis, rue d'Enfer (Hell Street — verify the name's story: the cold of the vaults? keep a dispute if unclear), négociant doorways, the vaults under the streets. Bissoh is a table card (name only). maps_query 'Rue d'Enfer, Beaune, France'.",
 "quartiers:Place Madeleine and its faubourg": QW + " The eastern square and the Faubourg Madeleine: the after-dark side, wine bistrots; Caves Madeleine and Le Comptoir des Tontons are table cards (name only). maps_query 'Place Madeleine, Beaune, France'.",
 "quartiers:Place Monge": QW + " The quieter square of the charcutiers: Raillard (table card, name only) and Franck Bourgeon (verify 2026 trading, 9 place Monge?), the statue of Gaspard Monge (verify: bronze by Rude, 1849?), the Beffroi (belfry) on the square (verify). Le Bistrot Bourguignon and Pâtisserie Berteau are table cards (name only). maps_query 'Place Monge, Beaune, France'.",
 "quartiers:Faubourg Bretonnière": QW + " West out of the old Porte Bretonnière: the Bastion, terraced houses, and Edmond Fallot's mustard mill at no. 31 (larder card: name only). maps_query 'Rue du Faubourg Bretonnière, Beaune, France'.",
 "quartiers:The vineyard slope": QW + " West of the ramparts the premier crus begin within a few hundred metres of the last street: Clos des Mouches, Les Grèves, Les Teurons, up to the Montagne de Beaune (the viewpoint — verify the Croix/the Belvédère). The walk card 'Up into the climats' tells the walk: do not retell it; this card is the quarter. maps_query 'Montagne de Beaune, Beaune, France'.",
 "curiosities:The peasant grape that fathered the whites": CU + " Bowers & Meredith et al., Science 1999 (verify authors and year): Chardonnay, Aligoté, Gamay, Melon, Auxerrois and others are crosses of Pinot (Noir) x Gouais Blanc; Philip the Bold's 1395 ordinance against Gamay (verify date, July 1395; the 'disloyal plant'). Keep the 'Pinot' parent precise (Pinot, not necessarily Pinot Noir: the papers say Pinot). maps_query empty.",
 "curiosities:The Pinot that turned white": CU + " Pinot Gouges: Henri Gouges, 1936, white-berried mutation in the Clos des Porrets-Saint-Georges (verify details and the wine bottled today, Nuits-Saint-Georges 1er Cru 'La Perrière'?). maps_query empty or 'Domaine Henri Gouges, Nuits-Saint-Georges, France' if visits.",
 "curiosities:The vine named for a child king": CU + " Bouchard's Vigne de l'Enfant Jésus in Beaune Les Grèves (3.92 ha? verify), the Carmelite nun Marguerite du Saint-Sacrement, the 1638 birth of Louis XIV, the 1791 sale of biens nationaux to Bouchard (verify; keep the prophecy a legend). Bouchard's cellar card owns the cellar visit: name only. maps_query empty.",
 "curiosities:Étienne-Jules Marey": PERSON + " Merge the old Musée Marey card. Marey (1830-1904), born in Beaune, chronophotography, the fusil photographique (1882), film strips (1888-90). The Musée Marey / Musée des Beaux-Arts de Beaune — VERIFY 2026: the Marey collection's display status (the museum has been closed/under renovation in recent years? verify), address (Porte Marie de Bourgogne, 6 bd Perpreuil?), hours/price. Keep disputes on 'first film'. maps_query the museum ', Beaune, France' only if it is open.",
 "curiosities:Gaspard Monge": PERSON + " Monge (1746-1818), born in Beaune, descriptive geometry, Napoleon's Minister of the Marine (1792-93: actually under the Republic — verify), co-founder of the École polytechnique 1794. His statue on the Place Monge (verify), his birthplace (verify: rue Monge?). maps_query 'Place Monge, Beaune, France'.",
 "provisioning:The Saturday market": PT.format(vid="v15-march-des-halles-saturday", angle="the larder: what a cook buys here and how to shop it; merge the old 'Saturday-market traiteur' street-food card (the hot plates to eat there)"),
 "provisioning:Charcuterie Raillard": PT.format(vid="v-charcuterie-raillard", angle="the larder: what a cook buys at a charcutier to take aboard — whole terrines, pâté en croûte, jambon persillé by the kilo"),
 "linger:Pâtisserie Fabien Berteau": PT.format(vid="v16-p-tisserie-fabien-berteau", angle="a room to linger: the pastry and the coffee hour, and whether there is anywhere to sit"),
 "bars:Bouchard Père & Fils": CELLAR + " Bouchard's cellars in the Château de Beaune, the 15th-century fortress of Louis XI (verify). The Vigne de l'Enfant Jésus is a curiosity card (name only).",
 "bars:Patriarche Père & Fils": CELLAR + " Patriarche: about 5 km of galleries under the former Visitandines convent (verify), the 'largest cellars in Burgundy' claim (keep as their claim), self-guided tasting.",
 "listening:No hi-fi listening bar": "Honest card, tag 'honestly', NO Maps. The old guide says no audiophile listening bar exists in Beaune, Dijon or Lyon (nearest in Paris). VERIFY with 2 WebSearch ('bar d'écoute Beaune', 'listening bar Dijon vinyle', 'hi-fi bar Lyon'): if you find a real one in Beaune or Dijon, write it instead (rename, tag 'listening bar', labels Where · Pour · Price · Best hour, maps). Otherwise labels Touch it today · Instead (Instead: Enstase or the cellar-and-counter night card). Do not name Paris venues' hardware lists.",
 "craft:Do this one": "NEW #craft card. Research NOW (WebSearch, ~5 calls): the best craft of Beaune and the Côte d'Or a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment. Candidates: the coopers of the Côte (tonnelleries of Saint-Romain and Beaune — e.g. Tonnellerie François Frères, Damy, Cadus; who takes visitors and is there a hands-on session?), the mustard workshop at Edmond Fallot (the 'Moutarderie' visits include a 'grind your own' atelier? verify), pain d'épices at Mulot & Petitjean in Dijon (factory visit, workshop?), a cassis liqueur maker (Cassissium in Nuits-Saint-Georges: Védrenne — is it hands-on?), the École des Vins de Bourgogne (BIVB) wine-tasting courses in Beaune (a skill, open enrolment, named teachers?), the Hospices' own vineyard workers, stained glass, a pruning workshop in winter. Pick the ONE that best meets: an unbroken local craft + named master + you can enrol. Rename the card (name = the place/person). Labels What you do · Time · Cost · Book. maps_query the workshop + ', France'.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Burgundy-made": "NEW tag 'the warning', NO Maps. What is sold around the Hôtel-Dieu and Place Carnot as Burgundian and is not (mustard made with imported seed — the 'moutarde de Dijon' name is a method, not a place, and most seed is Canadian: verify; the 'Moutarde de Bourgogne' IGP requires Burgundy seed; pain d'épices from factories; 'escargots de Bourgogne' that are not Helix pomatia or not from Burgundy — the snail itself is the warning card on the plate: name only; tea towels). Only claims you can source. Labels: Touch it today · Instead.",
 "listening:La Vapeur, Dijon": "Merge the old music card. Verify La Vapeur (SMAC, Dijon) 2026: address, typical nights, any dated November 2026 shows; the SIRK festival (April? verify 2026/2027). Labels Where · When · Cost · Best hour. maps_query 'La Vapeur, Dijon, France'. The Lyon clubs and Nuits Sonores: drop (not this guide's).",
 "listening:The cellar-and-counter night": "Merge the old music card. Verify Enstase's Thursday-Friday kitchen and chef (Pierre-Olivier Soares? 2026?) — Enstase is a table venue: name only, do not retell its record. The card is the shape of a Beaune evening: a glass, a wine bar around Place Madeleine, a last glass. Labels Where · Pour · Best hour. maps_query 'Place Madeleine, Beaune, France'.",
 "around:The Route des Grands Crus": "NEW day-trip card: the Route des Grands Crus (signposted since 1937? verify) from Dijon to Santenay (~60 km), through the villages of the Côte de Nuits and Côte de Beaune; the Climats as UNESCO World Heritage (4 July 2015, verify). Day-trip labels Getting there · Time needed · Don't miss · Eat (only kept venues or none). The driving-and-tasting warning is another card: name only. maps_query 'Route des Grands Crus, France'.",
 "around:Pommard and Volnay": "NEW day-trip card from the old [quartiers] 'Out of town' paragraph and the history (Château de Pommard, the 909 Benedictine planting claim — verify or dispute; Rootstock is the calendar's: name only). Volnay the hill village above it. Beaune to Meursault walk passes them: name only. Day-trip labels. maps_query 'Pommard, France'.",
 "around:Clos de Vougeot": "NEW day-trip card: the Château du Clos de Vougeot, the Cistercian cellar and press-house (12th c. presses — verify), the clos assembled by the monks of Cîteaux (1110s onward — verify dates), the Confrérie des Chevaliers du Tastevin (1934) and its chapitres (the 14 Nov 2026 one is the hot board's: name only). Visit hours/price 2026 (verify). Day-trip labels. maps_query 'Château du Clos de Vougeot, France'.",
 "around:Dijon": "NEW day-trip card: Dijon, ~25 min by TER train (verify), the Palais des Ducs and the Musée des Beaux-Arts (free? verify), the Cité Internationale de la Gastronomie et du Vin (opened May 2022 — verify), the Halles (Eiffel-style market, verify), the owl (la Chouette). Mulot & Petitjean is a larder card: name only. Day-trip labels. maps_query 'Les Halles de Dijon, France'.",
 "follow:Beaune tourist office": FO + " beaune-tourisme.fr (verify).",
 "follow:Hospices de Beaune": FO + " hospices-beaune.com (verify): the Hôtel-Dieu, the estate, the November auction.",
 "follow:Bourgogne Wines (BIVB)": FO + " bourgogne-wines.com (verify): the appellations, the climats, the École des Vins.",
 "follow:Raisin": FO + " Raisin, the natural-wine app and map (raisin.digital? verify the official domain).",
 "follow:Festival d'Opéra Baroque": FO + " festivalbeaune.com (verify): the July festival's programme and tickets.",
}
EXTRA_BRIEF = {
 "walks:The ramparts circuit": "Merge the old ramparts walk card, the old [walk] prose (research/guide_text_old.txt), the culture card 'The ramparts of Beaune', the work card 'Rempart des Dames' and the gem 'Rempart des Dames — first light' (all in cards_old.json). Verify the circuit length (old: 2.5 km), the bastions, the Rempart des Dames plane trees (1637 bastion? verify), which stretches are walkable. Walk labels.",
 "walks:The Parc de la Bouzaise loop": "Merge the old Bouzaise walk card, the work card 'Parc de la Bouzaise' and the gem 'The lake bench, Parc de la Bouzaise'. Verify the park (the source of the Bouzaise, the lake, created 1880s? verify). Walk labels.",
 "walks:Up into the climats": "Verify distances and the climbs (Clos des Mouches, Montagne de Beaune viewpoint). Do not retell the vineyard-slope quarter card: this is the route. Walk labels.",
 "walks:Beaune to Meursault by the vines": "Verify the route (via Pommard and Volnay? ~9-10 km?), and how to get back (bus/train/taxi: Meursault station? verify the TER halt). Walk labels.",
 "walks:Corton hill from Pernand-Vergelesses": "Verify: the Corton hill grand crus (Corton, Corton-Charlemagne), Charlemagne legend (keep as legend), the start at Pernand, the Croix de Pernand viewpoint (verify). Walk labels.",
 "culture:The Hôtel-Dieu": "Merge the old Hôtel-Dieu card and the gem 'The Hôtel-Dieu courtyard — 09:00'. Verify 2026 ticket and hours (old: EUR 12.50), the roof, the Grande Salle des Pôvres (old: 72 m — verify 50 m?), opening hours in November. The wine auction and the vines are the food-history fold's and the calendar's: name only. The Last Judgment has its own card: name only.",
 "culture:The Last Judgment": "Verify: Rogier van der Weyden's polyptych, c.1443-1452, commissioned by Rolin, how it is shown today (a separate room, magnifying lens). Sight labels.",
 "culture:Collégiale Notre-Dame": "Merge the old Collégiale card and the gem 'Collégiale Notre-Dame — a weekday morning'. Verify: the tapestries of the Life of the Virgin (shown seasonally — verify the months, 1500?), Romanesque from the 12th c., visiting hours. The concerts are the calendar's: name only.",
 "culture:Cité des Climats et Vins": "Merge the old work card 'Cité des Climats — the terraces'. Verify: the Cité des Climats et vins de Bourgogne in Beaune opened 2023 (verify), the building shaped like a vine tendril, the three sites (Beaune, Chablis, Mâcon), 2026 price and hours, the top-floor view. The climat itself is the wine card's: name only.",
 "culture:Musée du Vin de Bourgogne": "Verify 2026 status: the Musée du Vin in the Hôtel des Ducs de Bourgogne — open? (seasonal; may have been closed for works — verify), price, the cuverie with old presses. Sight labels.",
 "provisioning:The Wednesday market": "Verify the Wednesday market (Place de la Halle? smaller) 2026. Market labels Days · Hours · Go at · Look for.",
 "provisioning:Edmond Fallot": "Verify: Fallot founded 1840, the last independent family mustard-maker of Burgundy (keep as their claim), the stone-ground method, 2026 visit formats, prices, booking, the Moutarde de Bourgogne IGP (2009, Burgundy seed + Aligoté — verify). Shop/producer labels Where · Open · Buy · Price.",
 "provisioning:Mulot & Petitjean": "Verify: Mulot & Petitjean, pain d'épices since 1796 in Dijon (verify), the Beaune shop's address and 2026 trading (Place Carnot? verify), the nonnettes. Shop labels.",
 "provisioning:Fromagerie Alain Hess": "Verify: Alain Hess, Place Carnot (7?), 2026, MOF? the Délice de Pommard (his invention — verify). Shop labels.",
 "provisioning:Époisses at Berthaut": "Verify: Fromagerie Berthaut in Époisses village, Robert Berthaut revived Époisses in 1956 (verify), AOC 1991 (verify), the marc washing; distance from Beaune (~1h15? verify), the Beaune shop if any. The Époisses dish article belongs to The Dish: tell the maker, not the cheese's legend (Napoleon, the train ban — at most one line, as a legend). Producer labels.",
 "provisioning:The cheese of Cîteaux": "Verify: the Trappist monks of the Abbaye de Cîteaux make the cheese (since 1925, Montbéliarde herd), sold at the abbey shop; visits 2026 (the abbey was founded 1098). Producer labels; maps_query 'Abbaye de Cîteaux, France'.",
 "linger:A terrace on the Place Carnot": "From the old work card: honest work-truth line (wifi, laptop?), the hour to sit. Do NOT pretend a named café is good unless you verify one; keep it as the square's terraces. Café labels Where · Open · Order · Work?. The 'Burgundy by the glass on a terrace' warning is another card: name only.",
 "linger:Athenaeum de la Vigne et du Vin": "Verify: the wine bookshop opposite the Hôtel-Dieu (5 rue de l'Hôtel-Dieu?), 2026 trading, hours, what it sells (books, glasses, tasting). Shop/room labels Where · Open · Buy · Work?.",
 "drink:Pinot Noir": "Wine labels In the glass · On the label · Ask for. Do not retell the Gouais/Pinot DNA story (curiosity card): name only.",
 "drink:Chardonnay and the Clos des Mouches": "Verify: the Clos des Mouches (Beaune 1er cru) 25.2 ha? Joseph Drouhin owns about 13.8 ha of it (verify — the old 'entire 25.2 ha owned by Drouhin' is likely wrong). Wine labels.",
 "drink:The climat": "Verify: Beaune has 42 premier crus and no grand cru (verify), the climats UNESCO 2015 (1,247 climats — verify). Wine labels.",
 "drink:Kir": "Verify: Canon Félix Kir, mayor of Dijon 1945-1968, the blanc-cassis; crème de cassis de Dijon IGP (2015? verify), Lagoute 1841 (verify), Noir de Bourgogne blackcurrant. Wine labels.",
 "drink:Crémant de Bourgogne": "Verify AOC 1975. Wine labels.",
 "drink:Marc and Fine de Bourgogne": "Verify the AOC/IG dates (old: Marc 1942, Fine 2011 — these look shaky; the EU geographical indications for spirits: verify, else soften). Wine labels.",
 "bars:Marché aux Vins": "Merge the gem 'Marché aux Vins at opening — 10:00' and use old_record. Verify 2026: the former Cordeliers church, formats and prices, hours. Labels Where · Open · Pour · Price · Book.",
 "avoid:Burgundy by the glass on a terrace": "Instead: Enstase, Caves Madeleine (table cards) or the Marché aux Vins (cellar card).",
 "avoid:The frozen-snail menu": "Verify the claim honestly: most 'escargots de Bourgogne' served in France are Helix pomatia imported from Central/Eastern Europe, the snail being protected in France (picking regulated since 1979 — verify). Instead: Ma Cuisine or Le Bistrot Bourguignon (table cards) only if their records support escargots.",
 "avoid:A quiet day on auction Sunday": "The auction weekend 13-16 Nov 2026 (the hot board and the calendar carry the dates: name only). Instead: come the week before, or on the Monday after.",
 "avoid:Tasting and driving the Route": "France's limit 0.5 g/l (0.2 for new drivers) — verify. Instead: the walk to Meursault, a driver or a bike (verify a bike-hire in Beaune only if confident).",
}
batches = {1: ["quartiers", "curiosities", "culture"], 2: ["provisioning", "walks", "around"], 3: ["avoid", "follow", "listening", "craft"], 4: ["coffee-gardens", "bars"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] == "bars:Marché aux Vins": e["old_record"] = V["v12-march-aux-vins"]
                if c["key"] == "bars:Bouchard Père & Fils": e["old_record"] = V["v14-bouchard-p-re-fils"]
                if c["key"] == "bars:Patriarche Père & Fils": e["old_record"] = V["v13-patriarche-p-re-fils"]
                if c["key"] == "linger:Pâtisserie Fabien Berteau": e["old_record"] = V["v16-p-tisserie-fabien-berteau"]
                b = " ".join(x for x in (NEW_BRIEF.get(c["key"]), EXTRA_BRIEF.get(c["key"])) if x)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
A = ("summit", "bouchons")
splits = {1: [i for i in keep if LANE[i][0] in A], 2: [i for i in keep if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
