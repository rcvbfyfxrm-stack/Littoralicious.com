#!/usr/bin/env python3
"""The editorial cut for Faro-Algarve GOLD6 (24 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons, the venue added from the guide's own text) and card_plan.json (every fold, its groups,
its cards and the old card each is built from).
The old page was a GOLD1-era tier inventory (publish-terroir.py): 18 venue records in flat tiers, no lanes, no dishes,
no terroir/data copy; 72 tcards in 12 folds, several told two or three times (Festival F, Festival MED, Afro Nation and the
Festa da Ria Formosa each have a music card and an event card; Gardy a work card and a producer card; the flor de sal a drink
card and a producer card; the Sé, the cloister, the Ludo salt pans, the Jardim bench and the Trem a card and a secret-gem card each).
Run: python3 terroir/_rollout/review/Faro-Algarve/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit":  {"label": "The starred tables — Faro's first star and the two-star kitchens of the coast", "group": "grande", "ids": ["v01-alameda", "v16-vila-joya", "v17-ocean-restaurant"]},
 "stories": {"label": "Tables with a story — a lunch on an island with no road, and a chef's small room inside the walls", "group": "petite", "ids": ["v03-estamin-ilha-deserta", "v02-checkin-by-leonel-pereira"]},
 "tascas":  {"label": "The tascas — where Faro eats", "group": "petite", "ids": ["v04-tasca-do-ricky", "v09-a-venda", "v08-adega-nova"]},
 "street":  {"label": "La Rue — the two markets and the bifana", "group": "street", "ids": ["v12-mercado-municipal-de-faro", "v11-mercado-de-olh-o", "v-snack-bar-da-xica"]},
}
# one place the old guide described in its own street-food card (Snack Bar da Xica, the bifana inside the Mercado Municipal)
# but never gave a record: built from that text only and re-verified by the venue pack. No coordinates (never geocoded).
NEW_VENUES = {
 "v-snack-bar-da-xica": {"id": "v-snack-bar-da-xica", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Snack Bar da Xica",
   "short": "Snack Bar da Xica", "lat": None, "lng": None, "tags": [], "productTags": ["Street Food"],
   "address": "Mercado Municipal de Faro, Largo Dr. Francisco Sá Carneiro, 8000-151 Faro",
   "maps": "https://www.google.com/maps/search/?api=1&query=Snack+Bar+da+Xica+Mercado+Municipal+Faro+Portugal",
   "why": "", "verdict": "Faro's reference bifana: thin pork loin marinated in white wine, garlic and paprika, griddled to order and slid into a papo-seco roll, at a counter inside the city market.",
   "signature": "A bifana and a small beer at the counter.", "caveat": "", "person": "", "_source": "old street-food card"},
}
CUT = {
 "v05-faz-gostos": "Cut on the 24 Oct re-check: no 2026 trace of it trading, and CHECKin has occupied its rooms on Rua do Castelo since July 2022 (Postal do Algarve); the old record's 'Michelin Plate' is a distinction MICHELIN no longer awards. Its lane keeps two.",
 "v18-bon-bon": "Cut for the cap: the third starred kitchen of the coast and the furthest west (Carvoeiro, about 50 minutes); the grand lane keeps Faro's own star and the two two-star kitchens. Named on the lane story.",
 "v06-vila-adentro": "Cut for the cap: a tiled room on the cathedral square, but the walled-town lane keeps three tables with a stronger story (CHECKin, Faz Gostos, and the island lunch); Vila Adentro's square is the Cidade Velha quarter card.",
 "v07-tert-lia-algarvia": "Moved, not lost: its cataplana class is weighed in the craft section (as a card, if the re-check confirms it); as a table it duplicated the tascas lane.",
 "v10-a-do-pinto": "Cut: 'a word-of-mouth address' with no fact the guide could stand on; the tascas lane keeps three with a dated record.",
 "v13-bago-wine-bar": "Moved, not lost: a wine bar is not a table. It keeps a card at the glass (its own address and map), and leaves the venue list.",
 "v14-hotel-faro-rooftop": "Moved, not lost: a rooftop bar is not a table. It keeps a card at the glass (its own address and map), and leaves the venue list.",
 "v15-morgado-do-quint-o": "Moved, not lost: a wine estate is not a table. It keeps a card in the larder's cellars (its own address and map), and leaves the venue list.",
}
BERTHS = []       # set after the 24 Oct re-check (picks_lists.json)
SHORTLIST = {}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("Inside and outside the walls", N("quartiers:Cidade Velha"), N("quartiers:The Baixa and Rua de Santo António"), N("quartiers:The marina and the Jardim")),
   g("Over the bridge", N("quartiers:Praia de Faro"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("The record, corrected", N("curiosities:Portugal's first printed book"), N("curiosities:The bishop's library at Oxford"), N("curiosities:Tempura went from here")),
   g("Birds and stone", ("curiosities:The storks of the Arco", "culture:Arco da Vila — neoclassical over Moorish"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The morning", N("provisioning:Mercado Municipal de Faro"), N("provisioning:Mercado de Olhão")),
   g("To carry home", ("provisioning:Flor de sal de Tavira", "gastronomy:Sal de Tavira — Rui Simeão & Marisol")),
   g("The cellars and the still", ("provisioning:Morgado do Quintão", "gastronomy:Morgado do Quintão (Lagoa)"), ("provisioning:Cabrita Wines", "gastronomy:Cabrita Wines (Silves)"), ("provisioning:Casa do Medronho", "gastronomy:Casa do Medronho — Marmelete (Monchique)"))]},
 "walks": {"sub": "walks", "groups": [
   g("The town on foot", ("walks:Round the walls, gate to gate", "walks:The Cidade Velha walls")),
   g("The lagoon on foot", ("walks:The Ludo trail and the salt pans", "walks:The Ludo Trail — salt pans + flamingoes"))]},
 "calas": {"sub": "sea", "groups": [
   g("The barrier islands", ("calas:Ilha Deserta", "walks:Ilha Deserta day trip"), N("calas:Culatra and the Farol"), ("calas:Ilha de Tavira", "secret-gems:Quatro Águas jetty, Tavira — sunset"))]},
 "culture": {"sub": "culture", "groups": [
   g("Inside the walls", ("culture:The Sé and its tower", "culture:Sé Cathedral de Faro"), ("culture:Museu Municipal", "culture:Museu Municipal — Convento da Assunção")),
   g("Bones, a theatre and a Roman villa", ("culture:Capela dos Ossos", "culture:Capela dos Ossos — Igreja do Carmo"), ("culture:Teatro Lethes", "culture:Teatro Municipal de Faro (Lethes)"), ("culture:Milreu", "culture:Ruínas Romanas de Milreu — Estói"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Algarve craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Three places to sit", ("linger:Café Aliança", "work:Café Aliança — since 1908"), ("linger:Pastelaria Gardy", "work:Pastelaria Gardy — since 1953"), ("linger:Jardim Manuel Bívar", "work:Jardim Manuel Bívar"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Negra Mole", "drink:Negra Mole — Algarve's badge grape"), ("drink:Arinto", "drink:Arinto — the persistent acid"), ("drink:Crato Branco", "drink:Crato Branco (Síria)")),
   g("After dinner", ("drink:Medronho", "drink:Medronho — the strawberry-tree spirit"), ("drink:Bagaceira", "drink:Bagaceira — the marc")),
   g("Where to pour them", ("bars:Bago Wine Bar", None), ("bars:The Hotel Faro rooftop", None))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room", N("listening:No hi-fi listening bar")),
   g("Live, the real thing", N("listening:Fado"), ("listening:Art Haus", "music:Art Haus Club — Faro"))]},
 "around": {"sub": "trips", "groups": [
   g("East along the lagoon", ("around:Olhão", "walks:Olhão — fishing port + 1916 market"), ("around:Tavira", "walks:Tavira — the eastern Algarve's elegance")),
   g("Inland and to the edge", N("around:Loulé"), ("around:Sagres and Cabo de São Vicente", "walks:Cabo de São Vicente — the western edge"))]},
 "avoid": {"sub": "skip", "groups": [
   g("On the plate", ("avoid:The fifteen-minute cataplana", 'avoid:€18 "cataplana" on the marina-front menu'), ("avoid:Local fish, every species, all year", 'avoid:Tourist-strip restaurants selling "local fish"'), ("avoid:Cataplana at noon in August", "avoid:Cataplana at midday in August")),
   g("On the water", ("avoid:Jet-skis in the lagoon", "avoid:Jet-ski tours of the Ria Formosa"))]},
 "follow": {"sub": "follow", "groups": [
   g("The region", N("follow:Visit Algarve"), N("follow:Município de Faro"), N("follow:MICHELIN Guide Portugal")),
   g("The wine and the lagoon", N("follow:Vinhos do Algarve"), N("follow:Ria Formosa Natural Park"))]},
}
POINTERS = {"provisioning:Mercado Municipal de Faro": "v12-mercado-municipal-de-faro", "provisioning:Mercado de Olhão": "v11-mercado-de-olh-o"}
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
             "bougie:Vila Vita Parc / Pousada Palácio de Estói / Conrad": "hotels, not food or place: this guide does not judge rooms (Ocean keeps its table card; Estói is named on the Milreu card)",
             "dish:* (7 plates)": "rewritten as The Dish inside La liste",
             "drink:Flor de Sal de Tavira": "told once: merged into the salt card in the larder",
             "drink:Sparkling Negra Mole": "told once: merged into the Negra Mole card",
             "music:* / events:* (Festival F, MED, Afro Nation, Festa da Ria Formosa)": "told once: one calendar card each (and the hot board for this month)",
             "events:Festival da Sardinha / Sardine season / Feira do Livro / Festa do Medronho": "rewritten as the calendar",
             "culture:Centro Ciência Viva / Galeria Municipal Trem": "cut for the cap: the culture fold keeps five stops that are Faro's own",
             "work:Biblioteca Municipal / Marina de Faro": "cut for the cap; the marina is the quarter card",
             "gastronomy:Pastelaria Gardy": "told once: Gardy is its linger card",
             "gastronomy:Krater": "cut on the 24 Oct re-check: the wine shop could not be found trading anywhere online; Bago sells bottles too",
             "gastronomy:Quinta dos Vales / Monte da Casteleja": "cut for the cap: the cellars keep Morgado do Quintão and Cabrita (Negra Mole) and the medronho still",
             "secret-gems:* (6)": "merged: the bench into the Jardim card, the bell tower into the Sé, the cloister into the museum, the Ludo dawn into the Ludo walk, Quatro Águas into Ilha de Tavira, the Trem cut",
             "street-food:Snack Bar da Xica": "now a table venue (the street lane)",
             "street-food:Confraria das Bifanas": "on La liste as the second bifana, if the re-check confirms it; not a card",
             "street-food:Grilled sardines": "told once: the sardine is The Dish's and the calendar's",
             "walks:Ilha Deserta / Olhão / Tavira / Cabo de São Vicente": "Ilha Deserta is a swim card; the towns are Autour",
             "ethnic-restaurants / burger-kebab": "honest-empty sections in the old guide: no card (the bifana carries the quick bite)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
