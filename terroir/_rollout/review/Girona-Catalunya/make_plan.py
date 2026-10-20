#!/usr/bin/env python3
"""The editorial cut for Girona-Catalunya GOLD6 (20 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
The old page was a GOLD3-era guide: 31 venue records in 13 table sections (one of them a one-venue lane), tcard folds, the
deleted-in-GOLD3 #tables-extended still present, three tier lists; no lane stories, no guest list, no hot board, no La liste.
Run: python3 terroir/_rollout/review/Girona-Catalunya/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit":   {"label": "The stars", "group": "grande", "ids": ["v01-el-celler-de-can-roca", "v02-restaurant-massana", "v03-divinum"]},
 "roca":     {"label": "The Roca ladder — fort, bistro, the parents' bar", "group": "grande", "ids": ["v21-esperit-roca", "v04-normal", "v30-can-roca-taiala"]},
 "houses":   {"label": "The old houses", "group": "petite", "ids": ["v07-can-marques", "v08-casa-marieta", "v09-fonda-cal-ros"]},
 "chefs":    {"label": "Where the chefs eat", "group": "petite", "ids": ["v31-dit-i-fet", "v32-safo"]},
 "menu":     {"label": "The menú del dia", "group": "petite", "ids": ["v37-restaurant-8de7", "v38-tornes"]},
 "morning":  {"label": "The morning — the granja and the fork", "group": "petite", "ids": ["v39-xocolateria-l-antiga", "v40-ca-l-angel", "v18-la-fabrica"]},
 "other":    {"label": "The other kitchens", "group": "petite", "ids": ["v33-nomo-girona", "v34-cul-de-la-lleona"]},
 "sweet":    {"label": "Xuixo, chocolate and a cone", "group": "street", "ids": ["v17-can-castello", "v05-casa-cacao", "v06-rocambolesc"]},
 "larder":   {"label": "The market, the cheese, the cellar", "group": "street", "ids": ["v19-mercat-del-lleo", "v11-cal-formatger", "v20-espelt-viticultors"]},
 "late":     {"label": "Late — after service", "group": "street", "ids": ["v36-zanpanzar", "v43-konig-sandwiches", "v42-sunset-jazz-club"]},
}
CUT = {
 "v14-arros-9-by-terram": "Cut: it was a one-venue rice lane ('Bistro & rice'), and tiny lanes are merged or cut; the city's rice is told by the old houses' daily arròs and by the chefs' lane. Nothing against it.",
 "v35-konig-2": "Cut, told once: the same house as König on Carrer dels Calderers (kept in the late lane, the branch under Sant Feliu's steps with the later hours); two cards for one fast-food group was one too many.",
 "v10-nu": "Cut after the 20 Oct re-check: the old record's Nu became Nexe in 2022, but no 2026 evidence of trading was found, one listing shows it 'temporarily closed', and neither its MICHELIN-selection claim, its Repsol 2026 mention nor its named chefs could be confirmed. A chefs' lane of two confirmed rooms beats three with a doubt.",
 "v41-federal-cafe": "Cut: the morning lane holds three and keeps the two that belong to Girona (the 1916 granja, the roadside fork breakfast) and the café the city's cycling scene grew out of; Federal is the Girona outpost of a Barcelona-born brunch group, and its own record carries three conflicting sets of hours.",
}
BERTHS = ["v01-el-celler-de-can-roca", "v07-can-marques", "v19-mercat-del-lleo"]   # one per group
SHORTLIST = {
 "Last minute — save the night": ["v36-zanpanzar", "v08-casa-marieta", "v37-restaurant-8de7"],
 "Plan ahead — this week": ["v31-dit-i-fet", "v09-fonda-cal-ros", "v02-restaurant-massana"],
 "Plan ahead — the grand night": ["v01-el-celler-de-can-roca", "v21-esperit-roca", "v03-divinum"],
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
N = lambda k: (k, None)
S = lambda k: (k, k.replace(k.split(":")[0], {"quarters": "quartiers"}.get(k.split(":")[0], k.split(":")[0]), 1))
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("The east bank — the stone city", ("quarters:Barri Vell", "quartiers:Barri Vell"), ("quarters:El Call", "quartiers:El Call"), ("quarters:Sant Pere de Galligants", "quartiers:Sant Pere de Galligants")),
   g("The river and the west bank", ("quarters:The Onyar riverfront", "quartiers:Onyar riverfront"), ("quarters:Mercadal", "quartiers:Mercadal"), ("quarters:Pedret", "quartiers:Pedret")),
   g("The green edges", ("quarters:La Devesa", "quartiers:Devesa / Parc"), ("quarters:Montjuïc", "quartiers:Montjuïc de Girona"), ("quarters:Vall de Sant Daniel", "quartiers:Vall de Sant Daniel"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("The city that would not fall", N("curiosities:The Immortal City"), N("curiosities:The flies of Sant Narcís")),
   g("Who lives here now", N("curiosities:The cycling capital"), N("curiosities:A season of dragons on the steps"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The markets — go early", N("larder:The Lleó market, for the galley"), ("larder:Mercat de la Devesa", "gastronomy:Mercat de la Devesa"), ("larder:The organic producers' market", "gastronomy:Organic producers' market")),
   g("Born in the province", ("larder:Fesols de Santa Pau", "gastronomy:Fesols de Santa Pau (DOP)"), ("larder:Poma de Girona", "gastronomy:Poma de Girona (IGP)"), ("larder:Formatge Garrotxa", "gastronomy:Formatge Garrotxa (IGP)")),
   g("At the source", ("larder:The Empordà estates", "gastronomy:DO Empordà cellars"), ("larder:Oli de l'Empordà", "bars:Oli de l'Empordà"), N("larder:Cal Formatger's board"))]},
 "walks": {"sub": "walks", "groups": [
   g("The walls and the stone", ("walks:Passeig de la Muralla", "walks:Passeig de la Muralla"), ("walks:Cathedral to Sant Feliu", "walks:The Cathedral-to-Sant Feliu spine"), ("walks:The Call, lane by lane", "walks:The Call labyrinth")),
   g("The river and the green", ("walks:The Onyar bridges", "walks:The Onyar bridges"), ("walks:Parc de la Devesa", "walks:Parc de la Devesa"), ("walks:Vall de Sant Daniel", "walks:Vall de Sant Daniel")),
   g("Up the hill", ("walks:Castell de Sant Miquel", "walks:Castell de Sant Miquel"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Rooms for a cup", ("linger:Espresso Mafia", "coffee-gardens:Espresso Mafia"), ("linger:Cafè Le Bistrot", "coffee-gardens:Cafè Le Bistrot"), ("linger:Palau Fugit", "coffee-gardens:Palau Fugit — Gipsy bar & El Terrat")),
   g("A laptop, honestly", N("linger:La Fàbrica with a laptop"), ("linger:Idle Hands", "coffee-gardens:Idle Hands")),
   g("A garden inside the walls", ("linger:Jardins dels Alemanys", "work:Jardins dels Alemanys"), N("linger:Jardí de la Francesa"))]},
 "culture": {"sub": "culture", "groups": [
   g("The hill of churches", ("culture:Girona Cathedral", "culture:Girona Cathedral (Santa Maria)"), ("culture:Basílica de Sant Feliu", "culture:Basílica de Sant Feliu"), ("culture:Sant Pere de Galligants", "culture:Sant Pere de Galligants")),
   g("The Call and the baths", ("culture:Museu d'Història dels Jueus", "culture:Museu d'Història dels Jueus (Call)"), ("culture:Banys Àrabs", "culture:Banys Àrabs")),
   g("A house on the river", ("culture:Casa Masó", "culture:Casa Masó"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", ("craft:Escola de Ceràmica de la Bisbal", "crafts:Ceramics — La Bisbal d'Empordà")),
   g("The others, and what each is missing", ("craft:La Sobirana, Santa Coloma de Farners", "crafts:Ratafia — Santa Coloma de Farners"), N("craft:Other one")),
   g("The honest warning", N("craft:What is sold as local craft"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:DO Empordà reds", "bars:DO Empordà reds"), ("drink:Garnatxa de l'Empordà", "bars:Garnatxa de l'Empordà"), ("drink:Vi novell", "bars:Vi novell")),
   g("Before and after", ("drink:Vermut", "bars:Vermut de l'Empordà"), ("drink:Ratafia", "bars:Ratafia catalana"), ("drink:Cremat", "bars:Cremat"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room, honestly", N("listening:No hi-fi bar in Girona"), N("listening:Sunset Jazz Club, for the record")),
   g("The sardana", ("listening:La Santa Espina", "music:'La Santa Espina' — Enric Morera"), ("listening:Cobla La Principal de la Bisbal", "music:Cobla La Principal de la Bisbal")),
   g("Under the nave and by the sea", ("listening:Nits de Clàssica", "music:Nits de Clàssica in the nave"), ("listening:El meu avi and the havaneres", "music:'El meu avi' — the havanera"))]},
 "around": {"sub": "trips", "groups": [
   g("Within forty minutes", N("around:Besalú"), N("around:Banyoles and its lake"), N("around:Olot and the Garrotxa volcanoes")),
   g("Down to the sea", N("around:The Costa Brava"), N("around:Cadaqués"))]},
 "avoid": {"sub": "skip", "groups": [
   g("The square and the board", N("avoid:Dinner on the Plaça de la Independència"), N("avoid:The paella boards by the bridges")),
   g("The booking and the car", N("avoid:Turning up at El Celler unbooked"), N("avoid:Driving into the Barri Vell"))]},
 "follow": {"sub": "follow", "groups": [
   g("The city's calendar", N("follow:Fires de Sant Narcís"), N("follow:Temps de Flors"), N("follow:Mercat del Lleó")),
   g("The wine and the kitchen", N("follow:DO Empordà"), N("follow:El Celler de Can Roca"))]},
}
POINTERS = {"larder:The Lleó market, for the galley": "v19-mercat-del-lleo", "larder:Cal Formatger's board": "v11-cal-formatger",
            "linger:La Fàbrica with a laptop": "v18-la-fabrica", "listening:Sunset Jazz Club, for the record": "v42-sunset-jazz-club"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "quartiers:Sant Feliu": "merged: the lanes below the cathedral are the Barri Vell card; the basilica is its own culture card",
             "quartiers:Santa Eugènia": "cut: a residential district annexed in 1963, nothing a visitor goes for that another card does not carry",
             "coffee-gardens:Casa Cacao — Bar Cacao & the obrador": "told once: Casa Cacao is a venue (the sweet lane)",
             "coffee-gardens:La Fàbrica": "told once: La Fàbrica is a venue; the linger card is a pointer",
             "work:La Fàbrica": "told once: merged into the La Fàbrica pointer",
             "work:Casa Cacao terrace": "told once: Casa Cacao is a venue",
             "work:Cafès on the Rambla de la Llibertat": "cut: the Rambla terraces are what the skip fold warns about for a meal; a vermut there is said once, in the warning",
             "work:Parc de la Devesa benches": "merged into the Devesa walk",
             "culture:Cases de l'Onyar & the Eiffel bridge": "merged into the Onyar bridges walk (the houses are what that walk is for); Casa Masó is the one you enter",
             "culture:Passeig de la Muralla": "told once: the walls are the walk card",
             "gastronomy:Mercat del Lleó": "told once: the market is a venue (the larder lane); the provisioning fold points to it",
             "gastronomy:Anxova de l'Escala": "told once: the anchovy is a dish of La liste (The Dish) and a gem popup; the coast's salters are the Costa Brava guide's ground",
             "gastronomy:Gamba de Palamós": "told once: a dish of La liste (The Dish)",
             "gastronomy:Cal Formatger": "told once: Cal Formatger is a venue; the provisioning card is a pointer",
             "gastronomy:Casa Cacao boutique": "told once: Casa Cacao is a venue",
             "gastronomy:L'Escala anchovy houses": "cut: L'Escala is the Costa Brava guide's ground; the anchovy lives in La liste",
             "music:Havaneres & cremat": "merged into the El meu avi card (the song) and the Cremat drink card (the bowl), told once",
             "dish:*": "the eight dish articles are rewritten inside La liste (The Dish)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
