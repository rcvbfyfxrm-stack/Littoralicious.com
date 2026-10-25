#!/usr/bin/env python3
"""The editorial cut for beaune-bourgogne GOLD6 (25 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons, the venue added from the guide's own text) and card_plan.json (every fold, its groups,
its cards and the old card each is built from).
The old page was a GOLD1-era tier inventory (publish-terroir.py): 16 venue records in flat tiers, no lanes, no dishes,
no terroir/data copy; 68 tcards in 12 folds, several told two or three times (the ramparts a culture card, a walk card, a work card
and a secret-gem card; the Parc de la Bouzaise a walk, a work spot and a gem; the Festival Baroque and Rootstock a music card and an
event card each; Raillard's jambon persillé a producer card, a street-food card and a dish card; the Saturday market an event card,
a market card, a street-food card and a venue record).
Run: python3 terroir/_rollout/review/beaune-bourgogne/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit":   {"label": "The serious dinners — two stars inside the walls and a charcoal counter", "group": "grande", "ids": ["v01-le-carmin", "v02-clos-du-c-dre", "v04-bissoh"]},
 "bouchons": {"label": "The bouchons — the Burgundian canon, cooked straight", "group": "petite", "ids": ["v03-ma-cuisine", "v07-le-bistrot-bourguignon", "v08-la-table-du-square"]},
 "wine":     {"label": "Wine rooms — the bistrots where the bottle comes first", "group": "petite", "ids": ["v06-caves-madeleine", "v10-le-comptoir-des-tontons", "v11-enstase"]},
 "street":   {"label": "La Rue — the Saturday market, the charcutier and the pâtissier", "group": "street", "ids": ["v15-march-des-halles-saturday", "v-charcuterie-raillard", "v16-p-tisserie-fabien-berteau"]},
}
# one place the old guide described in its own producer, street-food and eat cards (Charcuterie Raillard, rue Monge) but never gave a
# record: built from that text only and re-verified by the venue pack. No coordinates (never geocoded).
NEW_VENUES = {
 "v-charcuterie-raillard": {"id": "v-charcuterie-raillard", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Charcuterie Raillard",
   "short": "Charcuterie Raillard", "lat": None, "lng": None, "tags": [], "productTags": ["Charcuterie"],
   "address": "4 rue Monge, 21200 Beaune",
   "maps": "https://www.google.com/maps/search/?api=1&query=Charcuterie+Raillard+4+rue+Monge+Beaune",
   "why": "", "verdict": "Eddy Raillard's charcuterie on rue Monge: the jambon persillé the critic Gilles Pudlowski called a model of the genre, with gougères and pâté en croûte, sold by the slice to eat standing up.",
   "signature": "A thick slice of jambon persillé, with bread and a cornichon.", "caveat": "", "person": "", "_source": "old producer, street-food and eat cards"},
}
CUT = {
 "v05-le-bistro-de-l-h-tel": "Cut for the cap: the house table of the Hôtel le Cep, a good room, but the grande lane keeps the two starred kitchens and the charcoal counter, and this guide does not judge hotels.",
 "v09-loiseau-des-vignes": "Cut for the cap: the Loiseau group's by-the-glass bistro; the wine rooms keep three that belong to Beaune's own growers and drinkers (Caves Madeleine, Le Comptoir des Tontons, Enstase).",
 "v12-march-aux-vins": "Moved, not lost: a tasting cellar is not a table. It keeps a card in the cellars at the glass (its own address and map), and leaves the venue list.",
 "v13-patriarche-p-re-fils": "Moved, not lost: a cellar visit is not a table. It keeps a card in the cellars at the glass, and leaves the venue list.",
 "v14-bouchard-p-re-fils": "Moved, not lost: a cellar visit is not a table. It keeps a card in the cellars at the glass, and leaves the venue list.",
}
BERTHS = []       # set after the 25 Oct re-check (picks_lists.json)
SHORTLIST = {}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("Inside the ring", ("quartiers:Place Carnot and the Halle", None), ("quartiers:Rue Maufoux and the cellar streets", "secret-gems:Rue d'Enfer at dusk"), N("quartiers:Place Madeleine and its faubourg")),
   g("At the gates, and over them", N("quartiers:Place Monge"), N("quartiers:Faubourg Bretonnière"), N("quartiers:The vineyard slope"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("The grapes, corrected", N("curiosities:The peasant grape that fathered the whites"), N("curiosities:The Pinot that turned white"), N("curiosities:The vine named for a child king")),
   g("Born in Beaune", ("curiosities:Étienne-Jules Marey", "culture:Musée Marey & Musée des Beaux-Arts"), N("curiosities:Gaspard Monge"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The market days", ("provisioning:The Saturday market", "gastronomy:Marché des Halles — Saturday"), ("provisioning:The Wednesday market", "gastronomy:The Wednesday market"), ("provisioning:Charcuterie Raillard", "street-food:Jambon persillé by the slice — Raillard")),
   g("Mustard and spice", ("provisioning:Edmond Fallot", "gastronomy:Edmond Fallot — La Moutarderie"), ("provisioning:Mulot & Petitjean", "gastronomy:Mulot & Petitjean")),
   g("The cheese", ("provisioning:Fromagerie Alain Hess", "gastronomy:Fromagerie Alain Hess"), ("provisioning:Époisses at Berthaut", "gastronomy:Fromagerie Berthaut — Époisses"), ("provisioning:The cheese of Cîteaux", "gastronomy:Fromage de Cîteaux — Abbaye de Cîteaux"))]},
 "walks": {"sub": "walks", "groups": [
   g("The town on foot", ("walks:The ramparts circuit", "walks:The ramparts circuit"), ("walks:The Parc de la Bouzaise loop", "walks:The Parc de la Bouzaise loop")),
   g("Into the vines", ("walks:Up into the climats", "walks:Up into the climats"), ("walks:Beaune to Meursault by the vines", "walks:Beaune to Meursault by the vines"), ("walks:Corton hill from Pernand-Vergelesses", "walks:Corton hill from Pernand-Vergelesses"))]},
 "culture": {"sub": "culture", "groups": [
   g("The hospital paid by vines", ("culture:The Hôtel-Dieu", "culture:Hôtel-Dieu — Hospices de Beaune"), ("culture:The Last Judgment", "culture:Van der Weyden — The Last Judgment")),
   g("The church and the wine's own museums", ("culture:Collégiale Notre-Dame", "culture:Collégiale Notre-Dame"), ("culture:Cité des Climats et Vins", "culture:Cité des Climats et Vins de Bourgogne"), ("culture:Musée du Vin de Bourgogne", "culture:Musée du Vin de Bourgogne"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Burgundy-made"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Places to sit", ("linger:A terrace on the Place Carnot", "work:A Place Carnot terrace"), ("linger:Athenaeum de la Vigne et du Vin", "gastronomy:Athenaeum de la Vigne et du Vin"), ("linger:Pâtisserie Fabien Berteau", None))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Pinot Noir", "drink:Pinot Noir — the red of the Côte"), ("drink:Chardonnay and the Clos des Mouches", "drink:Chardonnay — and the Clos des Mouches"), ("drink:The climat", "drink:The climat — Beaune's 42 premier crus")),
   g("Before and after", ("drink:Kir", "drink:Kir — Aligoté & crème de cassis"), ("drink:Crémant de Bourgogne", "drink:Crémant de Bourgogne"), ("drink:Marc and Fine de Bourgogne", "drink:Marc & Fine de Bourgogne")),
   g("The cellars you can walk into", ("bars:Marché aux Vins", "secret-gems:Marché aux Vins at opening — 10:00"), ("bars:Bouchard Père & Fils", None), ("bars:Patriarche Père & Fils", None))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room", N("listening:No hi-fi listening bar")),
   g("Live, and late", ("listening:The cellar-and-counter night", "music:The cellar-and-counter night"), ("listening:La Vapeur, Dijon", "music:Dijon — La Vapeur SMAC & Le SIRK Festival"))]},
 "around": {"sub": "trips", "groups": [
   g("South along the Côte", N("around:The Route des Grands Crus"), N("around:Pommard and Volnay")),
   g("North, to the monks and the dukes", N("around:Clos de Vougeot"), N("around:Dijon"))]},
 "avoid": {"sub": "skip", "groups": [
   g("At the glass and on the plate", ("avoid:Burgundy by the glass on a terrace", "avoid:Burgundy by the glass on a tourist terrace"), ("avoid:The frozen-snail menu", "avoid:The frozen-snail tourist menu")),
   g("The calendar and the car", ("avoid:A quiet day on auction Sunday", "avoid:Arriving for a quiet day on auction Sunday"), ("avoid:Tasting and driving the Route", "avoid:Driving the Route des Grands Crus and tasting"))]},
 "follow": {"sub": "follow", "groups": [
   g("The town", N("follow:Beaune tourist office"), N("follow:Hospices de Beaune")),
   g("The wine and the music", N("follow:Bourgogne Wines (BIVB)"), N("follow:Raisin"), N("follow:Festival d'Opéra Baroque"))]},
}
POINTERS = {"provisioning:The Saturday market": "v15-march-des-halles-saturday", "provisioning:Charcuterie Raillard": "v-charcuterie-raillard",
            "linger:Pâtisserie Fabien Berteau": "v16-p-tisserie-fabien-berteau"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
if (RV / "picks_lists.json").exists():
    L = json.load(open(RV / "picks_lists.json")); BERTHS, SHORTLIST = L["berths"], L["shortlist"]
    LANES.update(L.get("lanes_override", {}))
    for k in L.get("lanes_drop", []): LANES.pop(k, None)
    CUT.update(L.get("cut_more", {}))
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "new_venues": NEW_VENUES, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "bougie:Hostellerie de Levernois / Hôtel le Cep / Hostellerie Cèdre & Spa": "hotels, not food or place: this guide does not judge rooms (Clos du Cèdre keeps its table card; the Levernois star is named on the summit lane story only if the re-check confirms it)",
             "dish:* (7 plates)": "rewritten as The Dish inside La liste",
             "drink:Vin Jaune — 75 minutes east": "not this guide's: the Jura has its own guide (Lons-le-Saunier)",
             "music:Festival International d'Opéra Baroque / Rootstock / Collégiale concerts": "told once: one calendar card each",
             "events:* (8)": "rewritten as the calendar and the hot board (the auction weekend is on both: the board the dates, the food-history fold the story)",
             "culture:The ramparts of Beaune": "told once: merged into the ramparts walk",
             "culture:Musée Marey & Musée des Beaux-Arts": "merged into the Marey card (born in Beaune)",
             "work:Parc de la Bouzaise / Rempart des Dames / Cité des Climats terraces": "merged into the Bouzaise walk, the ramparts walk and the Cité card",
             "secret-gems:* (6)": "merged: the 09:00 courtyard into the Hôtel-Dieu, first light into the ramparts walk, the lake bench into the Bouzaise loop, the weekday morning into the Collégiale, Rue d'Enfer into the cellar streets, the 10:00 opening into the Marché aux Vins",
             "street-food:Warm gougères from the boulangerie": "told once: the gougère is The Dish's and La liste's",
             "street-food:Jambon persillé by the slice — Raillard": "now the Raillard pointer card in the larder (Raillard is a table venue, the street lane)",
             "street-food:The Saturday-market traiteur": "merged into the Saturday market pointer card",
             "gastronomy:Charcuterie Raillard": "now a table venue (the street lane)",
             "ethnic-restaurants / burger-kebab": "honest-empty sections in the old guide: no card (the charcutier carries the quick bite)",
             "twentyfour / three-tables / tables-extended": "the old 24-hour plan and tier lists: replaced by the lanes, the guest list and the two readings (One Night, The Getaway Weekend)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
