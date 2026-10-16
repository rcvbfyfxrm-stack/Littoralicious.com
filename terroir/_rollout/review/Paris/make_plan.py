#!/usr/bin/env python3
"""The editorial cut for Paris GOLD6 (16 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
The old page was a pre-GOLD3 tier inventory (39 venue records in five flat categories, two of them duplicates, no lanes).
Run: python3 terroir/_rollout/review/Paris/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "creme":    {"label": "La Crème — the three-star houses", "group": "grande", "ids": ["v-l-arpege", "v-plenitude-cheval-blanc-paris", "v-kei"]},
 "produce":  {"label": "The new haute — the produce and the fire", "group": "grande", "ids": ["v-table-by-bruno-verjus", "v-datil", "v-le-rigmarole"]},
 "grand":    {"label": "The grand rooms — dated", "group": "grande", "ids": ["v-le-grand-vefour", "v-guy-savoy", "v-le-train-bleu"]},
 "neo":      {"label": "The neo-bistro line — the 11th", "group": "petite", "ids": ["v-septime", "v-le-servan", "v-clown-bar"]},
 "bistro":   {"label": "The bistro canon", "group": "petite", "ids": ["v-bistrot-paul-bert", "v-chez-l-ami-jean", "v-chez-georges"]},
 "wine":     {"label": "The wine bistros — the cellar first", "group": "petite", "ids": ["v-le-baratin", "v-parcelles", "v-vantre"]},
 "brasserie":{"label": "The brasseries — dated", "group": "petite", "ids": ["v-brasserie-lipp", "v-bofinger", "v-la-coupole"]},
 "bouillon": {"label": "The bouillons and the crémerie — cheap since the 1800s", "group": "petite", "ids": ["v-bouillon-chartier", "v-polidor", "v-bouillon-pigalle"]},
 "day":      {"label": "Walk in by day — the seafood bar and the day kitchen", "group": "petite", "ids": ["v-clamato", "v-mokonuts"]},
 "window":   {"label": "At the window — falafel, the sandwich, the ham", "group": "street", "ids": ["v-l-as-du-fallafel", "v-chez-alain-miam-miam", "v-le-petit-vendome"]},
 "onedish":  {"label": "One dish, one room — the galette and the steak", "group": "street", "ids": ["v-breizh-cafe", "v-la-creperie-de-josselin", "v-le-relais-de-l-entrecote"]},
}
CUT = {
 "v-arpege": "Duplicate record of L'Arpège (v-l-arpege), without coordinates: merged.",
 "v-le-cinq-four-seasons-george-v": "Duplicate record of Le Cinq, without coordinates: merged into the cut below.",
 "v-le-cinq": "Cap: the three-star lane keeps L'Arpège (the vegetable revolution), Plénitude (the sauce house on the Seine) and Kei (the Japanese-born chef who took three French stars). Le Cinq is a fine palace room that teaches the least about Paris itself.",
 "v-epicure-le-bristol": "Cap: a fourth palace three-star; the grand-hotel register is told by Plénitude and, for a drink, by Le Bar du Bristol under Boire & sortir.",
 "v-pierre-gagnaire": "Cap: a fifth three-star; the lane holds three that each say something different, and the old record carried no coordinates or story of its own.",
 "v-le-chateaubriand": "Cut: its own old record says 'winding down', it had no coordinates, and the neo-bistro story it started is told by Septime, Le Servan and Clown Bar.",
 "v-allard": "Bistro cap: Paul Bert, Chez L'Ami Jean and Chez Georges tell the canon; Allard's 1932 Left Bank room is the one cut a duck-with-olives lover may regret.",
}
BERTHS = ["v-l-arpege", "v-chez-l-ami-jean", "v-l-as-du-fallafel"]   # one per group, each confirmed trading 16 Oct (Bistrot Paul Bert, the first petite pick, found no 2026-dated evidence: it stays in its lane)
SHORTLIST = {
 "Last minute — save the night": ["v-bouillon-chartier", "v-bouillon-pigalle", "v-clamato"],
 "Plan ahead — this week": ["v-chez-l-ami-jean", "v-chez-georges", "v-parcelles"],   # all confirmed 16 Oct; Paul Bert and Le Servan found only undated listings
 "Plan ahead — the grand night": ["v-l-arpege", "v-plenitude-cheval-blanc-paris", "v-kei"],
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "towns", "groups": [
   g("The Right Bank villages", O("quartiers:Le Marais"), O("quartiers:Canal Saint-Martin"), O("quartiers:Belleville")),
   g("The hill and the Left Bank", O("quartiers:Montmartre & the Butte"), O("quartiers:Saint-Germain-des-Prés")),
   g("Three royal squares", O("quartiers:Place des Vosges"), O("quartiers:Place Dauphine"), O("quartiers:Place des Victoires"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("Under the street, and on it", N("curiosities:The empire of the dead"), N("curiosities:Guimard's metro, 1900"), N("curiosities:The Wallace fountains")),
   g("The counter and the café", N("curiosities:Why the bar is called le zinc"), N("curiosities:Voltaire's forty cups"), N("curiosities:Bistro is not Russian")),
   g("The city's belly and its vineyard", N("curiosities:Les Halles left in one night"), N("curiosities:The Paris vineyard"), N("curiosities:150 arcades, about 25 left"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The markets", N("provisioning:Marché d'Aligre"), ("provisioning:Marché des Enfants Rouges", "landmarks:Marché des Enfants Rouges"), N("provisioning:Marché Raspail")),
   g("The bread", O("gastronomy:Poilane"), O("gastronomy:Du Pain et des Idees"), O("gastronomy:Mori Yoshida")),
   g("The pastry houses", O("gastronomy:Pierre Herme"), O("gastronomy:Cedric Grolet")),
   g("The shops a cook goes to", N("provisioning:E. Dehillerin"), N("provisioning:Fromagerie Barthélémy"), N("provisioning:La Grande Épicerie de Paris"))]},
 "walks": {"sub": "walks", "groups": [
   g("Along the water", O("walks:Parc Rives de Seine (the car-free quais)"), O("secret-gems:Square du Vert-Galant")),
   g("On the old railways", O("walks:Coulée verte René-Dumont (Promenade Plantée)"), O("secret-gems:La Petite Ceinture")),
   g("Parks, a garden and the dead", O("walks:Parc des Buttes-Chaumont"), O("walks:Cimetière du Père-Lachaise"), O("walks:Jardin du Palais-Royal"))]},
 "culture": {"sub": "culture", "groups": [
   g("The jewel box, the opera, the rotunda", O("landmarks:Sainte-Chapelle"), O("landmarks:Palais Garnier"), O("landmarks:Bourse de Commerce — Pinault Collection")),
   g("Museums with gardens", O("art:Musee Rodin"), O("art:Musee de la Vie Romantique"), O("art:Musee de Montmartre - Jardins Renoir")),
   g("The collectors' houses", O("culture:Musée Nissim de Camondo"), O("culture:Musée Jacquemart-André"), O("culture:Musée Gustave Moreau")),
   g("Odd and particular", O("culture:Galerie Vivienne & Passage des Panoramas"), O("culture:Musée de la Chasse et de la Nature"), O("art:Grande Mosquee de Paris - tea garden"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Paris craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("The cup itself", O("coffee-scene:La Cafeotheque"), O("coffee-scene:Belleville Brulerie"), O("coffee-scene:Telescope")),
   g("Where you can actually work", O("linger:Salle Ovale, BnF Richelieu"), O("linger:Bibliothèque Mazarine"), O("linger:Anticafé")),
   g("The terrace as an institution", O("linger:Café de Flore"), O("linger:Les Deux Magots"), O("linger:Le Select")),
   g("By the canal", O("linger:Le Pavillon des Canaux"), O("linger:Ten Belles"), O("linger:Café Craft"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", O("drink:Champagne — grower fizz (the closest real vineyard to Paris)"), O("drink:Chablis & Sancerre — the two bistro whites by the glass"), O("drink:Beaujolais — the natural, chilled red")),
   g("The other glasses", O("drink:Cidre & Poiré — the honest outsider"), O("drink:Pastis — the Marseille drink Paris pours out of habit"), O("drink:Café crème — the breakfast-only milk coffee")),
   g("Natural wine, three counters", O("natural-wine:Le Verre Vole"), O("natural-wine:La Buvette"), O("natural-wine:Septime La Cave")),
   g("Above the roofs", O("rooftops:The rooftop terrace, Galeries Lafayette"), O("rooftops:Le Perchoir Ménilmontant"), O("rooftops:Le Tout-Paris")),
   g("One drink in a grand hotel", O("hotel-bars:Bar Hemingway, Ritz Paris"), O("hotel-bars:Le Bar du Bristol"), O("hotel-bars:Bar Joséphine, Hôtel Lutetia"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening rooms", O("listening:Bambino"), O("listening:Notre Dame Music Bar")),
   g("Small, live and late", N("listening:Caveau de la Huchette"), N("listening:Duc des Lombards"), N("listening:New Morning")),
   g("The collectives", O("listening:La Recyclerie"), O("listening:Ground Control"), O("listening:La Station - Gare des Mines")),
   g("The city's own sound", N("listening:Chanson, the caves and the French touch"))]},
 "around": {"sub": "trips", "groups": [
   g("The painters and the forest", O("around:Giverny"), O("around:Auvers-sur-Oise"), ("around:Fontainebleau & Barbizon", "around:Foret de Fontainebleau & Trois Pignons")),
   g("The châteaux", N("around:Versailles"), O("around:Vaux-le-Vicomte"), O("around:Chantilly")),
   g("A walled town and a river dance", O("around:Provins"), O("around:Guinguette de l'Ile du Martin-Pecheur"))]},
 "avoid": {"sub": "skip", "groups": [
   g("Three to skip", N("avoid:Champs-Élysées terraces"), N("avoid:A table with the Eiffel Tower view"), N("avoid:The hawker and the photo menu")),
   g("Read the bill", N("avoid:Things you never ordered"))]},
 "follow": {"sub": "follow", "groups": [
   g("What to eat, from people who live here", N("follow:Le Fooding"), N("follow:Paris by Mouth"), N("follow:David Lebovitz")),
   g("Tickets and the red guide", N("follow:Paris je t'aime"), N("follow:MICHELIN Guide France"))]},
}
POINTERS = {}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "art:Musee Bourdelle / Musee Zadkine / Musee Cernuschi / Petit Palais / Musee Nissim de Camondo (dup) / Jardin des Plantes galleries": "cap: three museums with gardens (Rodin, Vie Romantique, Montmartre); Camondo is in the collectors' houses; the others are left out",
             "culture:Musée de la Vie Romantique": "told once: merged with the art card of the same museum",
             "coffee-scene:Ten Belles / Coutume / KB CafeShop / Fragments / Cafe Lomi": "cap: three cups; Ten Belles sits by the canal under rooms to linger",
             "linger:La Caféothèque (dup) / Shakespeare and Company Café / Bpi, Lumière building": "cap: three per group; La Caféothèque is in the cup itself",
             "bars:* and natural-wine:* duplicates (Le Verre Volé, Septime La Cave, La Buvette, Aux Deux Amis, Le Baratin, Vantre)": "one card each: the two old folds listed the same counters twice; Le Baratin and Vantre are tables; Aux Deux Amis is the cap",
             "rooftops:* (7 others)": "cap: three roofs (the free one, the rough one, the palace one)",
             "hotel-bars:Bar de l'Hôtel Costes": "cap: three hotel bars",
             "listening:Le 6b": "out of the city (Saint-Denis); the collectives keep the three inside Paris",
             "around:Barbizon": "told once: merged into the Fontainebleau card",
             "gastronomy:Cyril Lignac": "cap: two pastry houses",
             "walks:Place des Vosges / Canal Saint-Martin": "told once: they are quarter cards",
             "landmarks:Place des Vosges / Passage des Panoramas": "told once: the quarter card and the passages card",
             "drink:Coffee — the third-wave espresso": "told once: the coffee cards tell it",
             "listening:La Station - Gare des Mines": "closes after its 31 October 2026 party for about three years (re-checked 16 Oct 2026): cut",
             "culture:Musée Nissim de Camondo": "closed for works since 4 August 2024; reopening announced for early 2027 (one listing says 2029): a card for a museum you cannot enter is cut (re-checked 16 Oct 2026)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
