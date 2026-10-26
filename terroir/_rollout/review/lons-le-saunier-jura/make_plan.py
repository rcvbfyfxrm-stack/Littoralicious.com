#!/usr/bin/env python3
"""The editorial cut for lons-le-saunier-jura GOLD6 (26 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons, the venues added from the guide's own text) and card_plan.json (every fold, its groups,
its cards and the old card each is built from).
The old page was a GOLD1-era tier inventory (publish-terroir.py): 17 venue records in flat tiers (tables, two wine estates, a museum,
a UNESCO saltworks and the Comté centre all in one list), no lanes, no dishes, no terroir/data copy; 68 tcards in 12 folds, several told
two to four times (the arcades a work card, a walk card and the walk prose; the Source Salée a work card, a gem and the quarter line;
Baume-les-Messieurs and the Hérisson falls a culture card and a walk card each; the Percée du Vin Jaune a music card and an event card;
the Thursday market an event card, a market card and a street-food card; the Pasteur thesis myth a culture paragraph and an avoid card).
Run: python3 terroir/_rollout/review/lons-le-saunier-jura/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit": {"label": "The stars on the slope — two Michelin houses and the Bib by the river", "group": "grande", "ids": ["v-maison-jeunet", "v01-la-table-du-grapiot", "v02-le-bistron-me"]},
 "lons":   {"label": "Lons at table — the town's own kitchens", "group": "petite", "ids": ["v03-tablier", "v05-la-petite-auberge", "v06-le-bistrot-des-marronniers"]},
 "wine":   {"label": "Wine tables — the tavern, the cave à manger, the caveau", "group": "petite", "ids": ["v08-la-finette-taverne-d-arbois", "v09-le-bistrot-des-claquets", "v11-caveau-des-jacobins"]},
 "street": {"label": "La Rue — the market, the fromager and the chocolatier", "group": "street", "ids": ["v12-march-de-lons-le-saunier", "v-fromagerie-vagne", "v10-p-tisserie-chocolaterie-pelen"]},
}
# places the old guide described in its own cards but never gave a record: built from that text only and re-verified by the venue
# packs. No coordinates (never geocoded).
NEW_VENUES = {
 "v-maison-jeunet": {"id": "v-maison-jeunet", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Maison Jeunet par Steven Naessens",
   "short": "Maison Jeunet", "lat": None, "lng": None, "tags": [], "productTags": ["Michelin", "Contemporary"],
   "address": "Château de Germigney, 31 rue Edgar Faure, 39600 Port-Lesney",
   "maps": "https://www.google.com/maps/search/?api=1&query=Maison+Jeunet+Ch%C3%A2teau+de+Germigney+Port-Lesney",
   "why": "", "verdict": "The Arbois two-star of Jean-Paul Jeunet, carried by his successor Steven Naessens to the Château de Germigney at Port-Lesney in November 2021: Morbier and Morteau cromesquis, snails in Savagnin broth, Bresse poultry with Vin Jaune and morels.",
   "signature": "Bresse poultry with Vin Jaune and morels.", "caveat": "", "person": "Steven Naessens", "_source": "old bougie and avoid cards"},
 "v-fromagerie-vagne": {"id": "v-fromagerie-vagne", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Fromagerie Vagne",
   "short": "Fromagerie Vagne", "lat": None, "lng": None, "tags": [], "productTags": ["Cheese"],
   "address": "Rue du Commerce, 39000 Lons-le-Saunier",
   "maps": "https://www.google.com/maps/search/?api=1&query=Fromagerie+Vagne+Lons-le-Saunier",
   "why": "", "verdict": "The fromager-affineur under the arcades: Comté at several ages side by side, Bleu de Gex, Morbier, Mont d'Or in season and cancoillotte.",
   "signature": "Comté at three ages, cut side by side.", "caveat": "", "person": "", "_source": "old gastronomy, dish and avoid cards"},
}
CUT = {
 "v04-la-com-die": "Cut for the cap: a good room on the Place de la Comédie, but the Lons lane keeps the town's soul table (Ô Tablier), the poularde-au-Vin-Jaune house (La Petite Auberge) and the bouchon with the grill (Les Marronniers).",
 "v07-la-table-de-perraud": "Cut for the cap: a reliable traditional table; its pochouse is named in The Dish, and the Lons lane keeps three tables with more to teach.",
 "v13-maison-du-comt-poligny": "Moved, not lost: a museum is not a table. Poligny and its Maison du Comté keep a card in Autour.",
 "v14-domaine-macle": "Moved, not lost: a wine estate is not a table. It keeps a card in the cellars at the glass.",
 "v15-domaine-st-phane-tissot": "Moved, not lost: a wine estate is not a table. It keeps a card in the cellars at the glass.",
 "v16-maison-de-louis-pasteur": "Moved, not lost: a museum is not a table. It keeps its card in Culture.",
 "v17-salines-royales-d-arc-et-senans-unes": "Moved, not lost: a monument is not a table. It keeps its card in Culture.",
}
BERTHS = []       # set after the 26 Oct re-check (picks_lists.json)
SHORTLIST = {}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("Inside Lons", ("quartiers:Place de la Liberté and the arcades", "work:Rue du Commerce arcades"), N("quartiers:Place de la Comédie and the market squares"),
     ("quartiers:The Parc des Bains and the Source Salée", "work:Parc des Bains & Source Salée")),
   g("The wine villages", ("quartiers:Arbois", "walks:Arbois old town + Pasteur lab"), N("quartiers:Pupillin"), ("quartiers:Château-Chalon", "walks:Château-Chalon vineyard walk"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("Salt, grapes and a gazette", N("curiosities:The salt under the town"), ("curiosities:Savagnin's family tree", "drink:Savagnin — the genealogical centre of European white wine"), N("curiosities:Arbois in the first gazette")),
   g("Born here", ("curiosities:Rouget de Lisle", "culture:Maison natale de Rouget de Lisle"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The market days", ("provisioning:The Lons markets", "gastronomy:Thursday market — the big one"), ("provisioning:Fromagerie Vagne", "gastronomy:Fromagerie Vagne — Lons"), ("provisioning:Cancoillotte by the jar", "street-food:Cancoillotte by the jar — to take home")),
   g("From the source, for the galley", ("provisioning:Fort Saint-Antoine", "gastronomy:Marcel Petite — Fort Saint-Antoine affinage"), ("provisioning:Volaille Miéral", "gastronomy:Volaille Miéral — Bresse AOP"), ("provisioning:Pelen", "gastronomy:Pâtisserie Chocolaterie Pelen"))]},
 "walks": {"sub": "walks", "groups": [
   g("Lons and its reculée", ("walks:Lons at first light", "walks:Rue du Commerce arcades at dawn"), ("walks:The cirque of Baume-les-Messieurs", "walks:Baume-les-Messieurs cirque + abbey")),
   g("Up on the lake plateau", ("walks:The Hérisson falls", "walks:Cascades du Hérisson — seven cascades"), ("walks:Belvédère des Quatre Lacs", "walks:Belvédère des Quatre Lacs"))]},
 "culture": {"sub": "culture", "groups": [
   g("In Lons", ("culture:Saint-Désiré and its crypt", "culture:Église Saint-Désiré + Merovingian crypt"), ("culture:Église des Cordeliers", "culture:Église des Cordeliers"), ("culture:La Maison de la Vache qui rit", "culture:Maison de la Vache qui Rit")),
   g("Salt, science and the lake villages", ("culture:The Saline Royale", "culture:Saline Royale d'Arc-et-Senans"), ("culture:Maison de Louis Pasteur", "avoid:\"Pasteur defended his thesis on Vin Jaune\""), ("culture:Musée d'Archéologie du Jura", "culture:Musée d'Archéologie du Jura"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Jura-made"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Places to sit", ("linger:Café de la Comédie", "work:Café de la Comédie"), ("linger:The Médiathèque", "work:Médiathèque de Lons-le-Saunier"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Vin Jaune", "drink:Vin Jaune — the cathedral wine"), ("drink:Poulsard and Trousseau", "drink:Poulsard / Ploussard — the palest red in France"), ("drink:The appellations", "drink:The 7 Jura appellations")),
   g("Before, after, and the sweet one", ("drink:Macvin, Crémant and Marc", "drink:Macvin · Crémant · Marc du Jura"), ("drink:Vin de Paille", "drink:Vin de Paille — the straw wine")),
   g("The cellars, and the ones you won't get into", ("bars:Domaine Macle", "gastronomy:Domaine Macle — Château-Chalon"), ("bars:Domaine Stéphane Tissot", "gastronomy:Domaine Stéphane Tissot"), ("bars:Overnoy and Ganevat", "gastronomy:Maison Pierre Overnoy / Emmanuel Houillon — Pupillin"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room", N("listening:No hi-fi listening bar")),
   g("Live, and late", N("listening:Le Bœuf sur le Toit"), ("listening:La Rodia, Besançon", "music:Besançon — La Rodia SMAC"))]},
 "around": {"sub": "trips", "groups": [
   g("North along the slope", ("around:Poligny and the Maison du Comté", None), N("around:Salins-les-Bains")),
   g("Further north", N("around:Dole"))]},
 "avoid": {"sub": "skip", "groups": [
   g("At the glass and the counter", ("avoid:Vin Jaune on a café terrace", "avoid:\"Vin Jaune\" tasting on a Place de la Liberté terrace"), ("avoid:Comté in plastic", "avoid:Industrial \"Comté\" at a tourist cellar")),
   g("The old address", ("avoid:Jeunet in Arbois", "avoid:Looking for Jeunet at 9 rue de l'Hôtel de Ville in Arbois"))]},
 "follow": {"sub": "follow", "groups": [
   g("The region", N("follow:Jura tourism"), N("follow:Saline Royale")),
   g("The wine and the cheese", N("follow:Vins du Jura (CIVJ)"), N("follow:Comté (CIGC)"))]},
}
POINTERS = {"provisioning:The Lons markets": "v12-march-de-lons-le-saunier", "provisioning:Fromagerie Vagne": "v-fromagerie-vagne", "provisioning:Pelen": "v10-p-tisserie-chocolaterie-pelen"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
if (RV / "picks_lists.json").exists():
    L = json.load(open(RV / "picks_lists.json")); BERTHS, SHORTLIST = L["berths"], L["shortlist"]
    LANES.update(L.get("lanes_override", {}))
    for k in L.get("lanes_drop", []): LANES.pop(k, None)
    CUT.update(L.get("cut_more", {}))
    for k in L.get("uncut", []): CUT.pop(k, None)
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "new_venues": NEW_VENUES, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "bougie:Château du Mont Joly / La Chaumière": "cut for the cap: both near Dole, 40 km north, past the summit lane's three; Dole keeps an Autour card",
             "bougie:Maison Jeunet": "now a table venue (the summit lane)",
             "dish:* (7 plates)": "rewritten as The Dish inside La liste",
             "music:La Percée du Vin Jaune / Festival de Musique du Haut-Jura / natural-wine festivals": "told once: one calendar card each",
             "events:* (7)": "rewritten as the calendar and the hot board",
             "culture:Baume-les-Messieurs / Cascades du Hérisson": "told once: merged into their walk cards",
             "walks:Château-Chalon vineyard walk / Arbois old town": "merged into the Château-Chalon and Arbois village cards",
             "work:Rue du Commerce arcades / Parc des Bains": "merged into the Place de la Liberté and Parc des Bains quarter cards",
             "secret-gems:* (5)": "merged: the tilleul into Rouget de Lisle, the brine at dawn into the Parc des Bains, the crypt into Saint-Désiré, the Cuisance bank into Arbois, the belvedere into Château-Chalon",
             "street-food:Morteau from the market": "merged into the markets pointer card (the sausage itself is The Dish's)",
             "street-food:Warm gougères": "told once: in La liste",
             "gastronomy:Saturday market — Cours Sully": "merged into the markets pointer card",
             "gastronomy:Domaine Ganevat": "merged into the Overnoy and Ganevat card",
             "avoid:Pasteur thesis myth": "merged into the Maison de Louis Pasteur card",
             "ethnic-restaurants / burger-kebab": "honest-empty sections in the old guide: no card",
             "twentyfour / three-tables / tables-extended": "the old 24-hour plan and tier lists: replaced by the lanes, the guest list and the two readings",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
