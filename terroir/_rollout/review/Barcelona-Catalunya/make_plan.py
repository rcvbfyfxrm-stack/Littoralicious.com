#!/usr/bin/env python3
"""The editorial cut for Barcelona-Catalunya GOLD6 (15 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
The old page was a pre-GOLD3 tier inventory (60 venues, no lanes); this is the first cut into lanes.
Run: python3 terroir/_rollout/review/Barcelona-Catalunya/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "creme":     {"label": "La Crème — the three-star houses", "group": "grande", "ids": ["v01-disfrutar", "v04-cocina-hermanos-torres", "v02-lasarte"]},
 "elbulli":   {"label": "The elBulli line", "group": "grande", "ids": ["v03-enigma", "vn-dos-palillos", "v15-suculent"]},
 "two-stars": {"label": "Two stars, three accents", "group": "grande", "ids": ["v05-mont-bar", "v06-aleia", "v08-cinc-sentits"]},
 "rising":    {"label": "The new guard — this year's star and Bibs", "group": "petite", "ids": ["vr-kamikaze", "vr-glug", "vr-oniric"]},
 "houses":    {"label": "The old houses — dated", "group": "petite", "ids": ["v09-can-culleretes", "v10-7-portes-set-portes", "vn-els-quatre-gats"]},
 "counters":  {"label": "At the counter — the tapas bars", "group": "petite", "ids": ["v07-bar-ca-ete", "vn-cal-pep", "v11-quimet-quimet"]},
 "sea":       {"label": "The sea quarters — Barceloneta & Poblenou", "group": "petite", "ids": ["v12-la-cova-fumada", "vn-el-vaso-de-oro", "v14-els-pescadors"]},
 "vermut":    {"label": "L'hora del vermut — the bodegas", "group": "petite", "ids": ["v13-el-xampanyet", "vc-bar-bodega-quimet", "vc-morro-fi"]},
 "wine":      {"label": "The wine rooms", "group": "petite", "ids": ["vn-bar-mut", "vc-can-cisa-bar-brutal", "vc-els-sortidors-del-parlament"]},
 "granja":    {"label": "Granjas & the sweet hour", "group": "petite", "ids": ["vc-granja-m-viader", "vn-caelum", "vn-pastisseria-escriba-antiga-c"]},
 "standing":  {"label": "Standing up — one thing, done for decades", "group": "street", "ids": ["vc-bar-la-plata", "vc-can-paixano-la-xampanyeria", "vn-bar-tomas-el-tomas-de-sarria"]},
 "quick":     {"label": "The quick plate", "group": "street", "ids": ["vq-bacoa-kiosko-little-bacoa", "vc-flash-flash"]},
}
CUT = {
 "vn-abac": "Cap: the three-star lane holds Disfrutar (the 2024 world No. 1), Cocina Hermanos Torres (the kitchen in the room) and Lasarte (the city's first three stars). ABaC's own record calls it 'technical spectacle over ingredient': the fourth three-star teaches the least about the place.",
 "vn-moments": "Cap: the two-star lane is Mont Bar, Aleia and Cinc Sentits; Moments was demoted to one star in November 2024, and its Ruscalleda lineage is the classical register Cinc Sentits already covers with the city's own produce.",
 "vn-via-veneto": "Cap: the old-guard haute cuisine of 1967 is a fine room, but the dated-house lane is told by Can Culleretes (1786), 7 Portes (1836) and Els Quatre Gats (1897), which are the city's own story rather than Belle Époque France.",
 "vr-berbena": "Rising cap: the lane is this year's news (Kamikaze's first star, Glug's and Oníric's 2026 Bibs); Berbena's Bib dates from 2020.",
 "vr-cruix": "Rising cap: a value tasting menu in the Nova Esquerra; the lane already holds two Bib rooms at the same price.",
 "vr-direkte": "Cut: an 18-seat surprise-menu counter; the Asian-Catalan register is told by Dos Palillos in the elBulli lane.",
 "vr-besta": "Cut: in the MICHELIN selection without star or Bib, five years open; not this year's story and not the city's oldest.",
 "vr-la-mundana": "Cut: a Bib vermutería; the vermut lane holds the dated bodegas the ritual comes from (El Xampanyet 1929, Quimet 1954, Morro Fi 2007).",
 "vr-11-nudos": "Cut: by its own old record a view-and-terrace stop with no award; the rooftop cards under Boire & sortir do the view better.",
 "vr-sartoria-panatieri": "Cut: a world-ranked pizzeria, but a one-venue 'other kitchens' lane is merged or cut (GOLD6 rule); it is the one cut a pizza lover may regret.",
 "vq-bar-canyi": "Quick-plate cap: burgers are not this city's plate; the lane keeps the 2010 pioneer (Bacoa) and the 1970 tortilla room (Flash Flash).",
 "vq-la-real-hamburgueseria": "Same: a third burger.",
 "vq-la-royale": "Same: an uptown burger in Sarrià.",
 "vq-musta-shawarma": "Cut: a single 2018 Guía Repsol mention, corroborated nowhere (its own record says so).",
 "vn-cerveceria-catalana": "Counter cap: Bar Cañete, Cal Pep and Quimet & Quimet; Cervecería Catalana is a high-turnover hall with no bookings, by its own record built for volume.",
 "vn-bar-marsella": "Not a table (no kitchen): the absinthe room becomes a card under Boire & sortir, its proper home.",
 "vn-london-bar": "Not a table (a cocktail room): it becomes a card under Boire & sortir.",
 "vc-casa-gispert": "Not a table (a nut roastery shop): it becomes a card in the larder.",
 "vc-la-bombeta": "Told once: the bomba is told by La Cova Fumada, where it was born; La Bombeta is the same plate a few streets away.",
 "vc-la-confiteria": "Vermut cap; its 1912 confectioner's fittings are lovely, but the lane's three tell the ritual's three ages.",
 "vc-bodega-la-palma": "Vermut cap: a 1935 barrel bodega in the Gothic, the same story Bar Bodega Quimet tells in Gràcia.",
 "vc-can-recasens": "Cut: cured-meat boards by candlelight in Poblenou; the wine-room lane holds three that pour better.",
 "v16-mercat-de-la-boqueria": "Not a table: the market is a card in the larder (told once).",
 "v17-mercat-de-sant-antoni": "Not a table: the market is a card in the larder (told once).",
 "v18-codorn-u": "Not in the city: Codorníu's cellars are told in the Penedès day-trip card under Autour.",
}
BERTHS = ["v01-disfrutar", "v07-bar-ca-ete", "vc-flash-flash"]   # one per group, each confirmed trading 15 Oct (Bar La Plata, the first street pick, found only undated listings: it stays in its lane)
SHORTLIST = {
 "Last minute — save the night": ["v10-7-portes-set-portes", "vn-cal-pep", "v14-els-pescadors"],
 "Plan ahead — this week": ["v07-bar-ca-ete", "v15-suculent", "vr-oniric"],
 "Plan ahead — the grand night": ["v01-disfrutar", "v04-cocina-hermanos-torres", "v02-lasarte"],
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "towns", "groups": [
   g("The walled town", N("quartiers:Barri Gòtic"), N("quartiers:El Born / La Ribera"), N("quartiers:El Raval")),
   g("The grid and the town it swallowed", N("quartiers:L'Eixample"), N("quartiers:Gràcia"), N("quartiers:Sant Antoni")),
   g("The sea and the hill", N("quartiers:Barceloneta"), N("quartiers:Poblenou"), N("quartiers:Poble Sec & Montjuïc"))]},
 "curiosities": {"sub": "history", "groups": [
   g("The old town is younger than it looks", N("curiosities:The Bishop's Bridge is from 1928"), N("curiosities:The Boqueria is older than its iron"), N("curiosities:The street behind Les Demoiselles")),
   g("The grid, the beach, the name", N("curiosities:Why every Eixample corner is cut"), N("curiosities:Where the beach sand came from"), N("curiosities:Costa Brava, a newspaper word of 1908")),
   g("Three Barcelona endings", N("curiosities:How Gaudí died"), N("curiosities:The song Freddie Mercury never heard played"), N("curiosities:Dalí's lollipop"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The markets", O("gastronomy:Mercat de la Boqueria"), O("gastronomy:Mercat de Sant Antoni"), O("gastronomy:Mercat de Santa Caterina")),
   g("The shops that weigh by hand", ("provisioning:Casa Gispert", None), O("gastronomy:Formatgeria La Seu"), O("gastronomy:Entre Latas · Conservas Gourmet")),
   g("Bottles at the source", O("gastronomy:Recaredo — biodynamic Corpinnat"), O("gastronomy:Gramona — Corpinnat"), O("gastronomy:Bodegas Yzaguirre — Reus 1884"))]},
 "walks": {"sub": "walks", "groups": [
   g("The old town on foot", O("walks:Gothic Quarter at dawn"), O("walks:Sant Antoni → Raval → Boqueria"), O("walks:Passeig de Gràcia Modernisme strip")),
   g("The hills and the pintxo street", O("walks:Park Güell from the back entrance"), O("walks:Montjuïc heritage loop"), O("walks:Carrer de Blai pintxos crawl"))]},
 "calas": {"sub": "sea", "groups": [
   g("The city sand, south to north", O("calas:Sant Sebastià"), O("calas:Barceloneta"), O("calas:Bogatell")),
   g("The quieter end", O("calas:Nova Icària"), O("calas:Mar Bella"))]},
 "culture": {"sub": "culture", "groups": [
   g("Gaudí, three ways", O("culture:Sagrada Família — the tallest church in the world from 2026"), O("culture:Casa Batlló & La Pedrera — the Passeig de Gràcia pair"), O("art:Casa Vicens")),
   g("The Roman floor and the glass hall", O("culture:MUHBA Plaça del Rei — Roman Barcino underground"), O("culture:Palau de la Música Catalana")),
   g("The painters", O("culture:Museu Picasso"), O("art:Fundacio Joan Miro"), O("art:MNAC (Museu Nacional d'Art de Catalunya)")),
   g("The new and the designed", O("art:MACBA (Museu d'Art Contemporani de Barcelona)"), O("art:CCCB (Centre de Cultura Contemporania de Barcelona)"), O("art:Disseny Hub Barcelona (DHUB)"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Barcelona craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("The cup itself", O("coffee-scene:Cafes El Magnifico"), O("coffee-scene:Nomad Coffee (Coffee Bar, ex Coffee Lab)"), O("coffee-scene:SlowMov")),
   g("Where you can actually work", O("coffee-gardens:Federal Cafe (Sant Antoni)"), O("coffee-gardens:Skye Coffee Co"), O("coffee-gardens:Biblioteca de Catalunya")),
   g("Beautiful. Close the laptop.", O("coffee-gardens:Hotel Casa Fuster — Café Vienès"), O("coffee-gardens:Casa Bonay"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", O("bars:Cava — invented Penedès 1872"), O("bars:Vermut — Yzaguirre Reus 1884"), O("bars:Priorat — DOQ since 2000")),
   g("The other bottles", O("bars:Xarel·lo — Penedès still white"), O("bars:Ratafia — the Catalan herbal")),
   g("Natural wine, three rooms", O("natural-wine:Bar Salvatge"), O("natural-wine:Bar Zim"), O("natural-wine:Amateur Bar")),
   g("Above the roofs", O("rooftops:La Caseta del Migdia"), O("rooftops:The Roof (The Barcelona EDITION)"), O("rooftops:The Rooftop at Sir Victor")),
   g("The old rooms", ("bars:Bar Marsella", None), ("bars:London Bar", None))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening rooms", O("listening:Oblicuo Hi-Fi Bar"), O("listening:Jaç Hi-Fi Café"), O("underground:Discos Paradiso")),
   g("Small, live and late", O("underground:Jamboree"), O("underground:23 Robadors"), O("underground:JazzSí Club (Taller de Músics)")),
   g("The clubs", O("listening:Sala Apolo / Nitsa"), O("underground:Razzmatazz"), O("underground:Moog")),
   g("The city's own sound", ("listening:Rumba catalana", "underground:Sabor de Gràcia (rumba catalana)"), O("underground:Heliogàbal"))]},
 "around": {"sub": "trips", "groups": [
   g("An hour by train", O("around:Montserrat"), O("around:Sitges"), O("around:Colònia Güell")),
   g("The wine country and the mountain", ("around:Penedès — Sant Sadurní and the cava cellars", "around:Penedès wine country"), O("around:Montseny")),
   g("Up the coast — each has its own guide", O("around:Girona"), O("around:Costa Brava — Camí de Ronda"), O("around:Cadaqués & Cap de Creus"))]},
 "avoid": {"sub": "skip", "groups": [
   g("Three to skip", O("avoid-traps:Restaurants on La Rambla"), O("avoid-traps:The €15 'paella' with sangría"), O("avoid-traps:Showing up at Park Güell without a ticket")),
   g("When not to come", O("avoid-traps:Visiting in August"))]},
 "follow": {"sub": "follow", "groups": [
   g("Tickets and hours", N("follow:Visit Barcelona"), N("follow:Sagrada Família tickets")),
   g("What to eat, and when it is on", N("follow:MICHELIN Guide Spain"), N("follow:Barcelona city agenda"))]},
}
POINTERS = {}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "culture:Park Güell": "told once: the walk 'Park Güell from the back entrance' carries the park, its free zones and the timed ticket",
             "walks:Sant Sadurní d'Anoia Cava day trip": "told once: merged into the Penedès card under Autour",
             "calas:The Costa Brava calas (where the real swimming is)": "told once: the Costa Brava card under Autour (and the guide's own Costa Brava guide)",
             "gastronomy:Granja Viader / Granja La Pallaresa": "Viader is a table card (the granja lane); La Pallaresa is the cap",
             "gastronomy:Álvaro Palacios / Clos Mogador": "Priorat is told by the Priorat drink card; the estates are two hours away",
             "art:* (the other 7 art spaces)": "cap: the culture fold keeps MNAC, Miró, MACBA, CCCB and the Disseny Hub; Tàpies, Foto Colectania, La Virreina, Santa Mònica, Hangar, Fabra i Coats and Palo Alto are left out",
             "rooftops:* (7 others)": "cap: three roofs",
             "coffee-scene/coffee-gardens:* (others)": "cap: three per group",
             "underground:* (elrow, Brunch Electronik, Sónar, Nitsa, Macarena, Sabor de Gràcia)": "Sónar and Brunch are dated events (the calendar); Nitsa is told with Sala Apolo; Sabor de Gràcia inside the rumba card; elrow and Macarena are the cap",
             "listening:Fabra i Coats / La Escocesa / Freedonia": "cap",
             "bars:Gin Mare / Cava de Paraje Calificado": "Gin Mare is a brand, not a pour to seek out; Paraje Calificado folds into the Cava card",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
