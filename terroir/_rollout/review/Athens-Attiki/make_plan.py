#!/usr/bin/env python3
"""The editorial cut for Athens-Attiki GOLD6 (13 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
Run: python3 terroir/_rollout/review/Athens-Attiki/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "creme":      {"label": "The stars", "group": "grande", "ids": ["delta", "spondi", "soil"]},
 "destination":{"label": "Destination rooms", "group": "grande", "ids": ["gb-roof-garden", "vezene", "sushimou"]},
 "chefs-eat":  {"label": "Where the chefs eat", "group": "petite", "ids": ["seychelles", "mavros-gatos", "steki-tou-ilia"]},
 "asia-minor": {"label": "The Asia Minor kitchens", "group": "petite", "ids": ["karamanlidika-tou-fani", "miran", "peran-kafe-aman"]},
 "story":      {"label": "The old houses & koutoukia", "group": "petite", "ids": ["diporto", "klimataria", "taverna-tou-oikonomou"]},
 "gems":       {"label": "Neighbourhood rooms", "group": "petite", "ids": ["akra", "pharaoh", "skalakia"]},
 "ethnic":     {"label": "The other kitchens", "group": "petite", "ids": ["feyrouz", "nolan", "marili"]},
 "breakfast":  {"label": "Breakfast & the milk-shop", "group": "petite", "ids": ["stani", "krinos", "the-underdog"]},
 "souvlaki":   {"label": "The souvlaki canon", "group": "street", "ids": ["kostas-agia-irini", "hoocut", "o-thanasis"]},
 "bargain":    {"label": "The bakers and the pots", "group": "street", "ids": ["ariston", "koulouri-tou-psirri", "olympion"]},
 "late-night": {"label": "Late night — after service", "group": "street", "ids": ["oinomageireio-ipeiros", "bougatsadiko-thessaloniki", "elvis"]},
}
CUT = {
 "ctc-urban-gastronomy": "The stars lane holds three: Delta (the two-star), Spondi (the oldest star in the city) and Soil (the farm and the Green Star) teach the most; CTC's tasting menu is the fourth of its kind.",
 "makris-athens": "Same lane cap: a tasting menu with an Acropolis frame, the view already sold by GB Roof Garden and A for Athens in this guide.",
 "o-makis": "Late-night lane cap: Peristeri is a long taxi from every quarter this guide sends you to after dinner; Epirus, the Psyrri bougatsa and Elvis are on the walk home.",
}
BERTHS = ["delta", "oinomageireio-ipeiros", "akra"]   # rebuilt 13 Oct from venues confirmed trading
SHORTLIST = {
 "Last minute — save the night": ["akra", "skalakia", "feyrouz"],
 "Plan ahead — this week": ["vezene", "pharaoh", "nolan"],
 "Plan ahead — the grand night": ["delta", "spondi", "gb-roof-garden"],
}
FOURS = {}

# card plan: fold -> groups -> cards {key, from (old key or null = new)}
def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)            # rewrite of an old card, same key
N = lambda k: (k, None)         # new card
PLAN = {
 "quartiers": {"sub": "towns", "groups": [
   g("The historic core", O("quartiers:Plaka"), O("quartiers:Monastiraki")),
   g("The creative quarters", O("quartiers:Psyrri"), O("quartiers:Exarcheia"), O("quartiers:Metaxourgeio / Kerameikos")),
   g("The salon & the tables", O("quartiers:Kolonaki"), O("quartiers:Pangrati")),
   g("The changing grids", O("quartiers:Koukaki"), O("quartiers:Ano Petralona"), O("quartiers:Kypseli"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The markets", O("gastronomy:Varvakios Central Market"), O("gastronomy:Kallidromiou Saturday Laiki")),
   g("The coffee, the resin and the cured meat", O("gastronomy:Mokka Specialty Coffee"), O("gastronomy:Mastihashop"), O("gastronomy:Miran")),
   g("The spice row & the sweet houses", O("gastronomy:Bahar"), O("gastronomy:Aristokratikon"), O("gastronomy:Krinos"))]},
 "walks": {"sub": "walks", "groups": [
   g("The marble climbs", O("walks:The Pikionis Paths of Philopappou"), O("walks:Dionysiou Areopagitou — the Grand Promenade")),
   g("The old-town wanders", O("walks:Anafiotika at Dawn"), O("walks:Kerameikos to Gazi")),
   g("Out to the pines and the sea", O("walks:Kaisariani Monastery & the Hymettus Pines"), O("walks:Athens Riviera: Flisvos to Edem"))]},
 "calas": {"sub": "sea", "groups": [
   g("The free sand", O("calas:Edem Beach"), O("calas:Megalo Kavouri")),
   g("Paid for — and what you get", O("calas:Akti Vouliagmenis"), O("calas:Astir Beach")),
   g("Wild water", O("calas:Limanakia (Cove B)"), O("calas:Lake Vouliagmeni"))]},
 "culture": {"sub": "culture", "groups": [
   g("The ancient collections", O("culture:Acropolis Museum"), O("culture:National Archaeological Museum")),
   g("The collectors' houses", O("culture:Benaki Museum of Greek Culture"), O("culture:Museum of Cycladic Art"), O("culture:Numismatic Museum (Iliou Melathron)")),
   g("The middle centuries & the contemporary", O("culture:Byzantine & Christian Museum"), O("culture:EMST — National Museum of Contemporary Art"), O("culture:Stavros Niarchos Foundation Cultural Center (SNFCC)"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", ("craft:Melissinos Art", "crafts:Melissinos Art — The Poet Sandal Maker")),
   g("The others, and what each is missing", ("craft:Tsakirian Lutherie", "crafts:Tsakirian Lutherie"), ("craft:Mentis–Antonopoulos Passementerie", "crafts:Mentis–Antonopoulos Passementerie (NHMA)")),
   g("The honest warning", N("craft:No class to enrol in"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Grand rooms & hotel salons", O("coffee-gardens:Athénée (ex-Zonars)"), O("coffee-gardens:Winter Garden — Hotel Grande Bretagne")),
   g("Gardens & museum courtyards", O("coffee-gardens:Nummus — Numismatic Museum garden café"), O("coffee-gardens:Black Duck Garden — Athens City Museum bistrot")),
   g("Where you can actually work", O("work:National Library reading rooms"), O("work:Okupa"), O("work:Kick")),
   g("Beautiful. Close the laptop.", O("coffee-gardens:Dexameni"), O("work:Taf Coffee"))]},
 "bars": {"sub": "bars", "groups": [
   g("The list-makers", O("bars:Line"), O("bars:The Bar in Front of the Bar"), O("bars:Baba au Rum")),
   g("Where it started, and the agave room", O("bars:The Clumsies"), O("bars:Barro Negro")),
   g("The natural-wine caves", O("bars:Heteroclito"), O("bars:Tanini Agapi Mou")),
   g("The grand hotels and the one roof", O("bars:Alexander's Bar"), O("bars:The Line bars at the Athenaeum InterContinental"), O("bars:A for Athens")),
   g("Ask for it by name", N("bars:Retsina — the revival bottle"), N("bars:Ouzo, tsipouro, tsikoudia"), N("bars:The grapes nobody else grows"))]},
 "listening": {"sub": "listening", "groups": [
   g("The songs to know first", ("listening:Markos Vamvakaris", "music:Markos Vamvakaris — the Patriarch of the bouzouki"),
     ("listening:Cloudy Sunday — Tsitsanis and Bellou", "music:Tsitsanis — 'Synnefiasmeni Kyriaki,' the occupation's song"),
     ("listening:1960 — the bouzouki at the Academy Awards", "music:1960: the entechno bridge — a bouzouki at the Academy Awards")),
   g("The rooms that still play", ("listening:Kapnikarea", "music:The rooms — and when they go dark"), N("listening:Klimataria"), N("listening:The winter rooms")),
   g("Jazz, vinyl and the listening room", ("listening:Half Note Jazz Club", "music:The modern clock — a Mets jazz cellar and an analog prophet"),
     N("listening:Lena Platonos — Gallop"), N("listening:Hi-fi — the one listening room"))]},
 "around": {"sub": "trips", "groups": [
   g("The wine country", ("around:Domaine Papagiannakos", "gastronomy:Domaine Papagiannakos")),
   g("The cape", N("around:Cape Sounion")),
   g("The islands", ("around:The islands are another guide", "gastronomy:Aegina Pistachio Growers' Co-op"))]},
 "follow": {"sub": "follow", "groups": [
   g("The programme and the selection", N("follow:Athens Epidaurus Festival"), N("follow:The MICHELIN Guide, Greece")),
   g("The street and the listings", N("follow:laikesagores.gr"), N("follow:Athinorama"))]},
}
POINTERS = {"gastronomy:Miran": "miran", "gastronomy:Krinos": "krinos", "listening:Klimataria": "klimataria"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
