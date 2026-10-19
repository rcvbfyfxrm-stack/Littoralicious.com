#!/usr/bin/env python3
"""The editorial cut for Costa-Brava-Catalunya GOLD6 (19 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
The old page was a GOLD2 tier inventory: 16 venue records in flat tiers, a 'Three Tables' block, a 24-hours block and a five-tier
prose fold naming the same houses again and again; no lanes, no dishes on the tables.
Run: python3 terroir/_rollout/review/Costa-Brava-Catalunya/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit": {"label": "The starred line — Girona and the Empordà", "group": "grande", "ids": ["v01-el-celler-de-can-roca", "v02-bo-tic", "v06-els-tinars"]},
 "port":   {"label": "The port and the catch", "group": "petite", "ids": ["v08-la-gamba", "v10-rafa-s", "v09-cal-tet"]},
 "village":{"label": "The cove, the village and the cape", "group": "petite", "ids": ["v04-casamar", "v07-can-bonay", "v03-compartir-cadaqu-s"]},
 "larder": {"label": "The market, the auction, the salt", "group": "street", "ids": ["v12-espai-del-peix-llotja-de-palam-s", "v13-anxoves-sol-s", "v11-mercat-del-lle"]},
 "bars":   {"label": "Le Bar — Girona's cup and cone", "group": "street", "ids": ["v15-la-f-brica", "v16-rocambolesc"]},
}
CUT = {
 "v14-la-tabarra": "Cut after the 19 Oct re-check: the old record called it a wine bar with a strong DO Empordà list and a terrace; every listing found describes a rock-and-roll tapas and cocktail bar, nothing dated 2026 was found (last dated review October 2025), and no source mentions the list or the terrace.",
 "v05-restaurant-massana": "Cut: the starred lane holds three and keeps the two tables that define the Empordà (Can Roca, Bo.TiC) and the masia on the coast road (Els Tinars); Massana is a Girona city table, the sister Girona guide's ground.",
}
BERTHS = ["v01-el-celler-de-can-roca", "v08-la-gamba", "v13-anxoves-sol-s"]   # one per group, each confirmed trading on 19 Oct
SHORTLIST = {
 "Last minute — save the night": ["v09-cal-tet", "v08-la-gamba", "v10-rafa-s"],
 "Plan ahead — this week": ["v04-casamar", "v03-compartir-cadaqu-s"],
 "Plan ahead — the grand night": ["v01-el-celler-de-can-roca", "v02-bo-tic", "v06-els-tinars"],
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "towns", "groups": [
   g("The coves of the Baix Empordà", ("towns:Calella de Palafrugell and Llafranc", "quartiers:Calella de Palafrugell & Llafranc"), ("towns:Palamós", "quartiers:Palamós"), ("towns:Pals and Peratallada", "quartiers:Pals & Peratallada")),
   g("The Gulf of Roses", ("towns:L'Escala and Empúries", "quartiers:L'Escala & Empúries"), ("towns:Roses", "quartiers:Roses"), ("towns:Cadaqués and Portlligat", "quartiers:Cadaqués & Portlligat")),
   g("Inland", ("towns:Girona", "quartiers:Girona"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("The name, the wind, the rock", N("curiosities:Named on 12 September 1908"), N("curiosities:The wind that plants the vines low"), N("curiosities:The oldest rock in Catalonia")),
   g("Who came ashore", N("curiosities:Did the vine land at Empúries?"), N("curiosities:The Indianos of Begur"), N("curiosities:The smugglers' path"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("On the tables — go early", N("larder:The auction at Palamós"), N("larder:The anchovy shop at L'Escala"), N("larder:The Lleó market at Girona")),
   g("The wine estates", ("larder:Espelt", "gastronomy:Espelt Viticultors"), ("larder:Mas Estela", "gastronomy:Celler Mas Estela"), ("larder:Martín Faixó", "gastronomy:Celler Martín Faixó")),
   g("The oil, the castle cellar and the natural wine", ("larder:Empordàlia", "gastronomy:Empordàlia (Oli de Pau)"), ("larder:Castell de Peralada", "bougie:Castell de Perelada"), ("larder:La Vinyeta", "drink:La Vinyeta — natural"))]},
 "walks": {"sub": "walks", "groups": [
   g("The coast path", ("walks:Camí de ronda, Calella to Llafranc", "walks:Camí de ronda: Calella → Llafranc"), ("walks:Sant Martí d'Empúries to L'Escala", "walks:Empúries shore path")),
   g("The cape and the plain", ("walks:The Paratge de Tudela to the cape lighthouse", "walks:Cap de Creus to the lighthouse"), ("walks:Pals to the rice fields", "walks:Pals to the rice paddies"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("First and last light on the coast", ("linger:Les Voltes at Port Bo", "secret-gems:The Les Voltes arches at Port Bo, at dawn"), ("linger:Sa Tuna", "secret-gems:The pebble cove of Sa Tuna"), ("linger:The square of Sant Martí d'Empúries", "secret-gems:The square of Sant Martí d'Empúries")),
   g("A bench above the sea", ("linger:Jardins de Cap Roig", "work:Jardins de Cap Roig, Calella de Palafrugell")),
   g("Girona — the cup and the river", N("linger:La Fábrica with a laptop"), ("linger:Plaça de la Independència", "work:Plaça de la Independència terraces, Girona"), ("linger:The Onyar bridges", "secret-gems:The Onyar footbridges, Girona"))]},
 "culture": {"sub": "culture", "groups": [
   g("Dalí's triangle", ("culture:Teatre-Museu Dalí, Figueres", "culture:Teatre-Museu Dalí, Figueres"), ("culture:Casa-Museu Dalí, Portlligat", "culture:Salvador Dalí House-Museum, Portlligat"), N("culture:Castell Gala Dalí, Púbol")),
   g("Greeks, monks and counts", ("culture:Empúries", "culture:Ruïnes d'Empúries"), ("culture:Sant Pere de Rodes", "culture:Sant Pere de Rodes"), ("culture:Santa Maria, Castelló d'Empúries", "culture:Santa Maria de Castelló d'Empúries")),
   g("The cape and the cove", ("culture:Cap de Creus", "culture:Cap de Creus Natural Park"), ("culture:elBulli1846, Cala Montjoi", "culture:elBulli1846, Cala Montjoi (Roses)"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as local craft"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:The three Garnatxas", "drink:Garnatxa (Lledoner) — the three colours"), ("drink:Carinyena", "drink:Carinyena (Samsó)"), ("drink:Garnatxa de l'Empordà", "drink:Garnatxa de l'Empordà (sweet)")),
   g("After dinner", N("drink:Cremat"), N("drink:Ratafia"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room, honestly", N("listening:No hi-fi bar on this coast")),
   g("Live, in summer", ("listening:Festival Castell de Peralada", "music:Festival Castell de Peralada"), ("listening:Cap Roig Festival", "music:Cap Roig Festival"), ("listening:The Cantada d'Havaneres", "music:Cantada d'Havaneres, Calella de Palafrugell"))]},
 "around": {"sub": "trips", "groups": [
   g("Into the volcanoes", ("around:Besalú", "culture:Besalú"), N("around:Olot and the Garrotxa volcanoes"))]},
 "avoid": {"sub": "skip", "groups": [
   g("The strip and the photo board", ("avoid:The Lloret seafront", "avoid:Lloret de Mar beachfront strip"), ("avoid:The photo-board paella", "avoid:Front-line \"tourist menú\" paella")),
   g("The season", ("avoid:The front line in August", "avoid:High-August front-line dining"), N("avoid:Urchins out of season"))]},
 "follow": {"sub": "follow", "groups": [
   g("The coast and the wine", ("follow:Costa Brava Girona", "follow:costabrava.org"), ("follow:Visit Palafrugell", "follow:visitpalafrugell.cat"), ("follow:DO Empordà", "follow:doemporda.cat")),
   g("The kitchen", ("follow:El Celler de Can Roca", "follow:@cellercanroca"))]},
}
POINTERS = {"larder:The auction at Palamós": "v12-espai-del-peix-llotja-de-palam-s", "larder:The anchovy shop at L'Escala": "v13-anxoves-sol-s",
            "larder:The Lleó market at Girona": "v11-mercat-del-lle", "linger:La Fábrica with a laptop": "v15-la-f-brica"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "gastronomy:Mercat del Lleó, Girona": "told once: the market is a table venue (the larder lane); the larder fold points to it",
             "gastronomy:Llotja de Palamós (fish auction)": "told once: merged into the Espai del Peix venue; the larder fold points to it",
             "gastronomy:Anxoves Solés": "told once: merged into the Anxoves Solés venue",
             "gastronomy:Anxoves Solés shop, L'Escala": "told once: the same house as the venue",
             "gastronomy:Rocambolesc, Girona": "told once: Rocambolesc is a venue (Le Bar lane)",
             "street-food:Panet (gelato in brioche) at Rocambolesc": "told once: a dish of the Rocambolesc venue",
             "street-food:Pa amb tomàquet": "rewritten inside La liste",
             "street-food:Coca de recapte / coca d'anxoves": "rewritten inside La liste",
             "ethnic-restaurants:North African and Latin American shops, around the Mercat del Lleó": "cut: unnamed shops, nothing to verify; not this coast's larder",
             "burger-kebab": "cut: the old fold was an honest 'none' note with no place in it",
             "bougie:El Celler de Can Roca — the cellar": "told once: the cellar pairing is told on the Can Roca venue",
             "drink:Lledoner Roig (grey Grenache)": "merged into the three-Garnatxas card",
             "drink:Mas Estela — biodynamic": "told once: the estate is a larder card",
             "drink:Martín Faixó — Cadaqués": "told once: the estate is a larder card",
             "culture:Besalú": "moved to Autour (a day trip, not a stop on the coast)",
             "secret-gems:The sculpted schist of the Paratge de Tudela": "merged into the Tudela walk (the same rock, the same path)",
             "secret-gems:The terrace of Sant Pere de Rodes": "merged into the Sant Pere de Rodes culture card",
             "work:La Fábrica, Girona": "told once: La Fábrica is a venue; the linger card is a pointer",
             "work:Riva of Cadaqués at dusk": "cut: Cadaqués has its own guide; the town card points there",
             "walks:Cadaqués lanes at dawn": "cut: Cadaqués has its own guide, with its own walks",
             "events:*": "rebuilt in the calendar (hot_events.json); the three summer music dates are the listening cards, told once",
             "avoid:Unverified phone bookings": "cut: not a trap but a note on the old guide's method; the venues now carry their own booking lines",
             "follow:njoycostabrava.com": "cut: the blog could not be found on 19 Oct 2026",
             "dish:*": "the seven dish articles are rewritten inside La liste (The Dish)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
