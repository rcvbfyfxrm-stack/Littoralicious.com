#!/usr/bin/env python3
"""The editorial cut for Cadaques-CapdeCreus GOLD6 (18 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
The old page was a GOLD2 tier inventory: 16 venue records in three flat tiers (one of them elBulli, a museum since 2023, filed as a
table), a three-column 'Three Tables' block and a five-tier prose fold that named the same houses again and again; no lanes, no dishes.
Run: python3 terroir/_rollout/review/Cadaques-CapdeCreus/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "elbulli": {"label": "The elBulli line and the sea wall", "group": "grande", "ids": ["v01-compartir-cadaques", "v05-talla", "v04-es-baluard"]},
 "houses":  {"label": "The old houses — dated", "group": "petite", "ids": ["v02-casa-anita", "v06-can-rafa", "v08-casa-nun"]},
 "back":    {"label": "One street back — the catch without the view", "group": "petite", "ids": ["v07-la-sirena", "v09-es-balconet"]},
 "edge":    {"label": "The beach, the hill and the cape", "group": "petite", "ids": ["v10-s-estrop", "v12-es-bar-de-dalt", "v03-restaurant-cap-de-creus"]},
 "bars":    {"label": "Le Bar — the rooms with a story", "group": "street", "ids": ["v14-maritim-bar", "v13-l-hostal"]},
}
CUT = {
 "v11-es-trull": "Cut: the 18 Oct re-check found nothing dated 2026 for it (one undated listing, no reviews), and the back-lane register is told by La Sirena and Es Balconet.",
 "v15-cafe-tropical": "Cut: nothing dated 2026 found; summer-night business only (nightly 24 June-15 September, weekends otherwise), and the late glass is told by the Marítim and L'Hostal.",
 "v16-elbulli-cala-montjoi-roses": "Not a table: elBulli served its last dinner on 30 July 2011 and reopened in 2023 as the elBulli1846 museum. Its story is the food-history fold; the visit is a day-trip card under Autour.",
}
BERTHS = ["v01-compartir-cadaques", "v02-casa-anita", "v14-maritim-bar"]   # one per group; revisited after the 18 Oct re-check (make_inputs prints any berth not confirmed)
SHORTLIST = {
 "Last minute — save the night": ["v14-maritim-bar", "v13-l-hostal", "v06-can-rafa"],
 "Plan ahead — this week": ["v02-casa-anita", "v08-casa-nun", "v04-es-baluard"],
 "Plan ahead — the grand night": ["v01-compartir-cadaques", "v05-talla", "v03-restaurant-cap-de-creus"],
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "towns", "groups": [
   g("The white town", ("quarters:Santa Maria and the upper town", "quartiers:Es Baluard / Old Town around Santa Maria"), ("quarters:Sa Riba and Es Portitxó", "quartiers:Sa Riba / Riba des Poal"), ("quarters:La Riera", "quartiers:La Riera (Riera de Sant Vicenç)")),
   g("Along the bay", ("quarters:Es Poal", "culture:Es Poal — the cove Dalí painted at fifteen"), ("quarters:Es Llané", "quartiers:Es Llané (Gran i Petit)")),
   g("Over the hill", ("quarters:Portlligat", "quartiers:Portlligat"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("The rock, the wind, the tongue", N("curiosities:The rock older than shells"), N("curiosities:The tramuntana"), N("curiosities:Parlar salat")),
   g("Monks, corsairs and contraband", N("curiosities:The monks bought the fish"), N("curiosities:Burned in 1444, sacked by Barbarossa"), N("curiosities:A smugglers' village"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The market and the salt", N("provisioning:The Monday market on the Riera"), ("provisioning:The anchovy salters of L'Escala", "gastronomy:Anxoves de l'Escala — Solés (1888) & Callol i Serrats (1847)"), ("provisioning:Empordàlia", "gastronomy:Empordàlia (Oli de Pau + DO Empordà wines)")),
   g("The wine on the slate", ("provisioning:Martín Faixó", "gastronomy:Celler Martín Faixó (Perafita / Cadac)"), ("provisioning:Mas Estela", "gastronomy:Mas Estela"), ("provisioning:Espelt", "gastronomy:Espelt Viticultors"))]},
 "walks": {"sub": "walks", "groups": [
   g("Round the bay", ("walks:Camí de Ronda to Cala Nans", "walks:Cami de Ronda: Platja de Cadaques to Far de Cala Nans"), ("walks:Up to Sant Sebastià", "walks:Cadaques to the Ermita de Sant Sebastia (Peni viewpoint)")),
   g("To the cape", ("walks:The Camí Antic to Cap de Creus", "walks:Cami Antic: Portlligat to the Far de Cap de Creus"), ("walks:The lighthouse and Cala Culip", "walks:Cap de Creus lighthouse + Cala Culip loop"), ("walks:GR-92 to El Port de la Selva", "walks:GR-92 Cami de Ronda stretch: Cadaques to El Port de la Selva"))]},
 "calas": {"sub": "sea", "groups": [
   g("The village water", ("calas:Platja Gran", "calas:Platja Gran de Cadaques"), ("calas:Es Sortell", "calas:Es Sortell"), ("calas:Sa Conca", "calas:Platja de Sa Conca")),
   g("Out towards the cape", ("calas:Portlligat beach", "calas:Platja de Portlligat"), ("calas:S'Alqueria Gran", "calas:S'Alqueria Gran"), ("calas:Cala Jugadora", "calas:Cala Jugadora"))]},
 "culture": {"sub": "culture", "groups": [
   g("Dalí and the colony", ("culture:Casa-Museu Dalí, Portlligat", "culture:Casa-Museu Salvador Dalí — Portlligat"), ("culture:Museu de Cadaqués", "culture:Museu de Cadaqués — the town's own gallery"), ("culture:The colony", "culture:The artist colony — why everyone came")),
   g("The church and the dead", ("culture:Santa Maria", "culture:Església de Santa Maria — the fishermen's altarpiece"), ("culture:The cemetery", "culture:Cementiri de Cadaqués — graves above the water")),
   g("The cape", ("culture:Far de Cap de Creus", "culture:Far de Cap de Creus — the lighthouse at Iberia's edge"), ("culture:Espai Cap de Creus", "culture:Espai Cap de Creus — reading the rock"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as local craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Coffee and a view", ("linger:Marítim at breakfast", "coffee-gardens:Bar Marítim"), ("linger:L'Hostal by day", "coffee-gardens:L'Hostal"), ("linger:Es Cucurucú", "coffee-gardens:Es Cucurucú viewpoint (mirador)"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Garnatxa negra and Carinyena", "bars:Garnatxa Negra (Empordà red)"), ("drink:The white and grey Garnatxas", "bars:Lledoner / Garnatxa Blanca & Roig (white & grey)"), ("drink:Garnatxa de l'Empordà", "bars:Garnatxa de l'Empordà (vi dolç)")),
   g("After dinner", ("drink:Cremat", "bars:Cremat (rom cremat)"), ("drink:Ratafia", "bars:Ratafia (IGP Ratafia Catalana)"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room, honestly", N("listening:No hi-fi bar, and the Boia gone")),
   g("Live", ("listening:The music festival", "music:Festival Internacional de Música de Cadaqués"), ("listening:Havaneres", "music:Havaneres & cremat"), ("listening:Cap Roig", "music:Cap Roig Festival (nearby)"))]},
 "around": {"sub": "trips", "groups": [
   g("The Dalí triangle", N("around:Figueres — the Teatre-Museu"), N("around:Púbol — Gala's castle")),
   g("Over the headland", N("around:elBulli1846, Cala Montjoi"), N("around:Sant Pere de Rodes")),
   g("Down the gulf", N("around:Empúries and L'Escala"))]},
 "avoid": {"sub": "skip", "groups": [
   g("The road and the season", ("avoid:August", "avoid:Coming in August expecting an easy day-trip"), ("avoid:Driving to the lighthouse in summer", "avoid:Driving out to the Cap de Creus lighthouse in high summer")),
   g("The wind and the house", ("avoid:A boat day without the forecast", "avoid:Booking a boat or cape excursion without checking the tramuntana"), ("avoid:Portlligat without a slot", "avoid:Turning up at Casa Salvador Dalí without a timed reservation"))]},
 "follow": {"sub": "follow", "groups": [
   g("The wind and the road", ("follow:Meteocat", "follow:Meteocat / Ports de la Generalitat — tramuntana & marine forecast"), ("follow:Parc Natural de Cap de Creus", "follow:Parc Natural de Cap de Creus (gencat / parcsnaturals.gencat.cat)"), ("follow:Ajuntament de Cadaqués", "follow:Ajuntament de Cadaqués (cadaques.cat)")),
   g("The house and the music", ("follow:Fundació Gala-Salvador Dalí", "follow:Fundació Gala-Salvador Dalí (salvador-dali.org)"), ("follow:Festival de Música de Cadaqués", "follow:Festival Internacional de Música de Cadaqués (festivalcadaques.cat)"))]},
}
POINTERS = {"linger:Marítim at breakfast": "v14-maritim-bar", "linger:L'Hostal by day": "v13-l-hostal"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "calas:Cala Nans (Far de Cala Nans)": "told once: the Camí de Ronda walk card ends there and owns it",
             "calas:Cala Culip": "told once: the lighthouse-and-Cala-Culip walk card owns the cove and its Roman wreck",
             "walks:The olive-terrace path (Cami Antic through the abandoned vinyes)": "merged into the Camí Antic walk (it is that path's middle section)",
             "walks:Far de Cala Nans short out-and-back": "merged into the Camí de Ronda walk (the same path, there and back)",
             "coffee-gardens:Es Baluard": "told once: Es Baluard is a table (the sea-wall lane); cap of three in the group",
             "quartiers:Es Poal": "merged with the culture card on the cove Dalí painted: one quarter card",
             "quartiers:Sa Conca": "told once: Sa Conca is a swim card",
             "quartiers:Es Portitxó / Es Portal": "merged into the Sa Riba quarter card",
             "bars:Carinyena / Samsó (Empordà)": "merged into the Garnatxa negra card: the two reds are blended and asked for together",
             "bars:Cap de Creus slate wine — Martín Faixó (Perafita / Cadac)": "told once: the estate is a larder card",
             "music:Church concerts in Santa Maria": "merged into the music-festival card",
             "music:The village's musical clan — the Pitxots": "told once: the Pichots are in the essay and the colony card",
             "dish:*": "the seven dish articles are rewritten inside La liste (The Dish)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
