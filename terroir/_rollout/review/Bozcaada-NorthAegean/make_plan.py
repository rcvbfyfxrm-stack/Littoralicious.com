#!/usr/bin/env python3
"""The editorial cut for Bozcaada-NorthAegean GOLD6 (27 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
The old page was a GOLD1/2-era tier inventory on the Cadaqués template: 12 venue records in flat tiers (tables, three wineries, two
coffee rooms, a cocktail bar and the market in one list), no lanes, no dishes, no GEMS, no PHOTOS in data.js; 24 tcards in 5 folds,
several told two or three times (the castle a culture card and a ramparts walk; the Polente lighthouse a culture card and a sunset
walk; the Ayazma chapel a beach card, a culture card and a plane-tree walk; the wine route a gastronomy card and the drink prose),
its footer still carrying Cadaqués's coordinates and a leading space in one card id (' b-ayazma').
Run: python3 terroir/_rollout/review/Bozcaada-NorthAegean/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "meyhane": {"label": "The meyhane tables — squid on the coals, meze in waves", "group": "grande", "ids": ["v04-asmali-meyhane", "v12-sandal", "v01-nevreste"]},
 "home":    {"label": "Ev yemeği — the island's home cooking", "group": "petite", "ids": ["v05-dort-hanimeli", "v11-adam"]},
 "cellar":  {"label": "At the cellar door — the island's own grapes", "group": "petite", "ids": ["v08-talay", "v02-corvus", "v06-amadeus"]},
 "street":  {"label": "La Rue — the market and the pastane", "group": "street", "ids": ["v07-wednesday-market", "v03-cicek-pastanesi"]},
}
NEW_VENUES = {}
CUT = {
 "v09-kahverengi": "Cut, not confirmed: the 27 Oct re-check found the roaster's shops in Çanakkale city and at Nişantaşı (Hacı Mansur Sk. 1/B), and no 2026 source for a Bozcaada branch. Coffee on the island is in Rooms to linger.",
 "v10-bakkal-bar": "Moved, not lost: a cocktail bar is not a table. It keeps a card in Boire & sortir, where the night is.",
}
BERTHS = []       # set after the 27 Oct re-check (picks_lists.json)
SHORTLIST = {}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("One town, two grids", ("quartiers:The Rum quarter", "culture:The Rum (Greek) Quarter"), N("quartiers:The Turkish mahalle"), N("quartiers:The harbour and the castle square"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("The record, corrected", N("curiosities:Tenedos and the wooden horse"), N("curiosities:The louse that came late"), N("curiosities:Left out of the exchange"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The market and the jar", ("provisioning:The Wednesday market", "gastronomy:The Wednesday produce market"), N("provisioning:Domates reçeli"), N("provisioning:Çavuş grapes"))]},
 "calas": {"sub": "beaches", "groups": [
   g("The south coast, on a north wind", ("calas:Ayazma", "calas:Ayazma"), ("calas:Sulubahçe", "calas:Sulubahçe"), ("calas:Habbele", "calas:Habbele (Poyraz Limanı)")),
   g("East and west — clear water and the wind", ("calas:Akvaryum", "calas:Akvaryum (Aquarium Cove)"), ("calas:Çayır", "calas:Çayır"), ("calas:Tuzburnu", "calas:Tuzburnu"))]},
 "walks": {"sub": "walks", "groups": [
   g("Up, out and through the vines", ("walks:Göztepe", "walks:Göztepe — the panorama"), ("walks:Polente at sunset", "walks:Polente at sunset"), ("walks:The vineyard country", "walks:The vineyard country"))]},
 "culture": {"sub": "culture", "groups": [
   g("In town", ("culture:The castle", "culture:Bozcaada Castle (Tenedos Fortress)"), ("culture:The church of St Mary", "culture:Church of St Mary — Kimisis Theotokou"), ("culture:The island museum", "culture:Bozcaada Local History Museum")),
   g("Out on the island", ("culture:The windmills", "culture:The Stone Windmills (Yel Değirmenleri)"), ("culture:Ayazma chapel and spring", "culture:Ayazma Monastery & Holy Spring"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as island-made"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Places to sit", ("linger:Çınaraltı", "coffee-gardens:Çınaraltı Café"), ("linger:Coffee Shelter", "coffee-gardens:Coffee Shelter"), ("linger:Vasil", "coffee-gardens:Vasil Coffee & Bakery"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", N("drink:Çavuş"), N("drink:Vasilaki"), N("drink:Karalahna and Kuntra")),
   g("The meal's partner, and the late glass", N("drink:Rakı"), N("bars:Bakkal")),
   g("The cellars, and the route between them", ("bars:The wine route", "gastronomy:The wine route"), N("bars:Çamlıbağ"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room", N("listening:No hi-fi listening bar")),
   g("Live, and late", N("listening:Live music on the island"))]},
 "around": {"sub": "trips", "groups": [
   g("Across the strait", N("around:Troy"), N("around:Gökçeada")),
   g("Up the coast", N("around:Assos"))]},
 "avoid": {"sub": "skip", "groups": [
   g("The season and the crossing", N("avoid:Coming in winter for the food"), N("avoid:The car ferry on a summer Friday")),
   g("At the table", N("avoid:The harbour-front set menu"))]},
 "follow": {"sub": "follow", "groups": [
   g("The island", N("follow:Bozcaada municipality"), N("follow:The ferry operator")),
   g("The wine", N("follow:The island's wine"))]},
}
POINTERS = {"provisioning:The Wednesday market": "v07-wednesday-market"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
if (RV / "picks_lists.json").exists():
    L = json.load(open(RV / "picks_lists.json")); BERTHS, SHORTLIST = L["berths"], L["shortlist"]
    LANES.update(L.get("lanes_override", {}))
    for k in L.get("lanes_drop", []): LANES.pop(k, None)
    CUT.update(L.get("cut_more", {}))
    for k in L.get("uncut", []): CUT.pop(k, None)
    NEW_VENUES.update(L.get("new_venues", {}))
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "new_venues": NEW_VENUES, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "walks:The castle ramparts": "told once: merged into the castle card (Culture)",
             "culture:Polente Lighthouse": "told once: merged into the Polente sunset walk",
             "walks:The Ayazma plane-tree walk": "told once: merged into the Ayazma chapel and spring card (Culture)",
             "gastronomy:Bağ Bozumu — the harvest festival": "rewritten as a calendar card (Pratique)",
             "eat / drink / history / money-sits / why-now prose": "rebuilt as the essay, the food-history fold, the drink cards, La liste with The Dish, and the dated hot board",
             "three-tables / tier lists": "the old tier lists: replaced by the lanes, the guest list and the two readings",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
