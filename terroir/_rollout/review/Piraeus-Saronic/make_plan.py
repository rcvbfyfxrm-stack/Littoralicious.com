#!/usr/bin/env python3
"""The editorial cut for Piraeus-Saronic GOLD6 (14 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
Run: python3 terroir/_rollout/review/Piraeus-Saronic/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "mikrolimano": {"label": "Mikrolimano — the named houses", "group": "grande", "ids": ["varoulko-seaside", "dourabeis", "papaioannou"]},
 "fry-hill":    {"label": "The fry and the hill", "group": "petite", "ids": ["margaro", "panorama"]},
 "working-port":{"label": "The working port — the auction & Keratsini", "group": "petite", "ids": ["oinomageireio-o-vasilis", "to-limanaki-tou-giorgou"]},
 "ouzeri":      {"label": "The ouzeri & the meze", "group": "petite", "ids": ["to-yperokeaneion", "dyosmos", "ikariotiko-kafeneio"]},
 "koutoukia":   {"label": "The barrel rooms & koutoukia", "group": "petite", "ids": ["to-eidikon", "propolemikon", "to-koutouki-tou-antoni"]},
 "refugee":     {"label": "The refugee kitchens — Kokkinia, Nikaia & Drapetsona", "group": "petite", "ids": ["alargino", "taverna-tou-katsogiannou"]},
 "other":       {"label": "The other kitchens", "group": "petite", "ids": ["vosporos", "toukta-thai-food", "sushi-rolls"]},
 "souvlaki":    {"label": "The grill and the wrap", "group": "street", "ids": ["o-giorgos", "souvlakia-o-serkos", "o-karabelas"]},
 "breakfast":   {"label": "Breakfast & the dawn pies", "group": "street", "ids": ["mastronikolas", "euxeinon"]},
 "late-night":  {"label": "Late night — after the boat", "group": "street", "ids": ["bougatsa-pavlidi", "kantina-o-plastiras"]},
}
CUT = {
 "piscis": "Mikrolimano holds three: Varoulko (Lazarou's cooking), Dourabeis (the 1932 benchmark) and Papaioannou (the plainest fish on the quay) teach the most; Piscis is a fourth seafood room on the same crescent, its pitch value rather than anything only it does.",
 "jimmys-fish": "Same lane cap: the showiest corner of the crescent, by its own record polished, pricey and touristy, with complaints about cover charges; the chef's-night-off angle is single-source.",
 "avraam": "Told once: Drapetsona's kebab row is told by Polyvios, its oldest house (1935); Avraam is the row's second survivor, the same plate and the same walk past the port gates.",
 "polyvios": "Not recommended on 14 Oct 2026: Greek press (in.gr, iefimerida, Athens Voice, Documento, 26 Jan 2026) reported the owner's arrest on 22 Jan 2026 on drug-trafficking charges, the shop allegedly used as a front. These are allegations with no court outcome found, but nothing since shows the shop trading, so it leaves the guide rather than send anyone there. Avraam, the row's other survivor, was not re-checked and stays out.",
 "pancho": "The other kitchens hold three: Vosporos (the Constantinople table), Toukta (Kokkinia's Thai room) and Sushi Rolls (the shipping canteen) each say something about the port; a Mexican cantina on the marina kept on one chef's word does not.",
}
BERTHS = ["dourabeis", "to-yperokeaneion", "o-giorgos"]   # rebuilt 14 Oct from venues confirmed trading, one per group (the old Varoulko/Margaro/Vasilis berths: Varoulko holds no star now; Margaro and Vasilis unconfirmed for 2026, they stay in their lanes)
SHORTLIST = {
 "Last minute — save the night": ["vosporos", "taverna-tou-katsogiannou", "alargino"],
 "Plan ahead — this week": ["to-yperokeaneion", "dyosmos", "to-koutouki-tou-antoni"],
 "Plan ahead — the grand night": ["varoulko-seaside", "dourabeis", "papaioannou"],
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "towns", "groups": [
   g("The three harbours & the hill", O("quartiers:Kastella / Profitis Ilias"), O("quartiers:Mikrolimano / Munichia"), O("quartiers:Pasalimani / Zea")),
   g("The shore & the local squares", O("quartiers:Piraiki / Akti Themistokleous"), O("quartiers:Freattyda"), O("quartiers:Terpsithea")),
   g("The working port & the refugee city", O("quartiers:Kentro & the Central Port / Tinaneios"), O("quartiers:Nikaia / Kokkinia"), O("quartiers:Drapetsona"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The markets", O("gastronomy:Ichthyoskala Keratsiniou"), O("gastronomy:Central Market of Piraeus")),
   g("The curer, the phyllo and the sweet", O("gastronomy:Avakian"), O("gastronomy:Vourloglou"), ("provisioning:Mastronikolas", "gastronomy:Mastronikolas")),
   g("The spice sacks, the roaster and the ship's store", O("gastronomy:Mandragoras"), O("gastronomy:Assos Xiroi Karpoi"), O("gastronomy:Dakoutros Marine"))]},
 "walks": {"sub": "walks", "groups": [
   g("The harbours' round", O("walks:The Kastella–Mikrolimano loop"), O("walks:The Zea (Pasalimani) marina round"), O("walks:Up Profitis Ilias to the Veakeio")),
   g("The coast and the ancient trace", O("walks:The Piraiki coast walk to the lighthouse"), O("walks:The Hippodamian grid & the Eetioneia Gate walls"), O("walks:The central-port arcades & the Municipal Theatre"))]},
 "calas": {"sub": "sea", "groups": [
   g("In town: the pebble and the rock", O("calas:Votsalakia Municipal Beach"), O("calas:Freattyda Municipal Beach"), O("calas:Ormos Afroditis (Aphrodite Cove) rocks")),
   g("The nearest sand", O("calas:Batis Beach"), O("calas:Edem Beach"))]},
 "culture": {"sub": "culture", "groups": [
   g("The bronze, the slipway, the sea-wall", O("culture:Archaeological Museum of Piraeus"), O("culture:Zea Shipsheds (ancient neosoikoi)"), O("culture:Hellenic Maritime Museum")),
   g("The stage, indoors and open to the gulf", O("culture:Municipal Theatre of Piraeus"), O("culture:Veakeio Municipal Theatre")),
   g("Painters and the summer screen", O("culture:Municipal Gallery of Piraeus"), O("culture:Cine Melina"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", ("craft:I Anemi — the rope-house", "crafts:I Anemi (Zacharoula N. Kordoni)")),
   g("The other, and what it is missing", ("craft:Banks Sails Greece", "crafts:Banks Sails Greece")),
   g("The honest warning", N("craft:No class to enrol in"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("The old market kafeneia", O("coffee-gardens:O Stavros"), O("coffee-gardens:O Stamatis")),
   g("Where you can actually work", O("coffee-gardens:Möte"), O("work:Eighteenscreen Micro Roastery"), O("work:Oven Roastery")),
   g("Beautiful. Close the laptop.", O("coffee-gardens:Belle Amie"), O("work:East Coast Concept Store"))]},
 "bars": {"sub": "bars", "groups": [
   g("At the water and above it", O("bars:Istioploikos"), O("bars:Horizon Rooftop of Senses"), O("bars:801 Rooftop Bar")),
   g("The wine rooms", O("bars:Hams & Clams"), O("bars:Paléo"), O("bars:Méthe")),
   g("The late rooms", O("bars:Amsterdam Bar"), O("bars:The Art of Bragi")),
   g("Ask for it by name", N("bars:Retsina — the port's wine"), N("bars:Ouzo with the fried fish"))]},
 "listening": {"sub": "listening", "groups": [
   g("Where the music was born", ("listening:Rebetiko was born here", "music:Rebetiko was born here"), ("listening:The Famous Quartet of Piraeus — 1934", "music:The Famous Quartet of Piraeus — 1934"),
     ("listening:Bayanteras — the one rebetis born in Piraeus", "music:Bayanteras — the one rebetis born in Piraeus")),
   g("The rooms that still play", ("listening:Revaizi", "music:Revaizi — live in the birthplace quarter"), ("listening:Stou Thoma & To Palio Roloi", "music:The central rebetadika — Stou Thoma & To Palio Roloi"),
     ("listening:Kafeniote", "coffee-gardens:Kafeniote")),
   g("The song the world knows, and the listening room", ("listening:Ta Paidia tou Pirea — 1960", "music:'Ta Paidia tou Pirea' — 1960"), N("listening:Hi-fi — honestly"))]},
 "around": {"sub": "trips", "groups": [
   g("The near islands", N("around:Aegina"), N("around:Salamina")),
   g("Further down the gulf", N("around:Hydra"))]},
 "follow": {"sub": "follow", "groups": [
   g("The boats", N("follow:Port of Piraeus (OLP)"), N("follow:Hellenic Coast Guard")),
   g("The town's calendar", N("follow:Municipality of Piraeus"), N("follow:Posidonia"))]},
}
POINTERS = {"provisioning:Mastronikolas": "mastronikolas"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {"quartiers:Hatzikyriakeio": "a residential seam between the port-city and the Piraiki; what it has (the coastal fish strip) is told under the Piraiki card and To Yperokeaneion's table card",
                             "walks:The Freattyda–Votsalakia shore": "told once: the same shore is the two town-beach cards under the sea fold",
                             "music:The living port — 1983 revival to UNESCO": "folded into 'Rebetiko was born here' (the 1983 film and the 2017 UNESCO listing)"},
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
