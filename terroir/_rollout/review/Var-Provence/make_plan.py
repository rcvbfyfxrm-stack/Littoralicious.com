#!/usr/bin/env python3
"""The editorial cut for Var-Provence GOLD6 (17 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons) and card_plan.json (every fold, its groups, its cards and the old card each is built from).
The old page was a pre-GOLD2 tier inventory (34 venue records in five flat categories, one duplicate, two markets and a
confectioner filed as tables, one table outside the department; no lanes, no dishes).
Run: python3 terroir/_rollout/review/Var-Provence/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit":   {"label": "The summit — three stars and two", "group": "grande", "ids": ["v-la-vague-d-or-cheval-blanc-st-", "v-la-table-du-castellet", "v-la-voile-la-reserve-de-ramatue"]},
 "seastar":  {"label": "One star by the sea", "group": "grande", "ids": ["v-colette-hotel-sezz", "v-recif-hotel-les-roches-rouges", "v-shanael"]},
 "inland":   {"label": "The hinterland houses — the truffle, the garden, the abbey", "group": "grande", "ids": ["v-chez-bruno", "v-le-faventia-terre-blanche", "v-hostellerie-de-l-abbaye-de-la-"]},
 "sand":     {"label": "On the sand — Pampelonne and the islands", "group": "petite", "ids": ["v-club-55", "v-la-plage-d-argent", "v-le-mas-du-langoustier"]},
 "houses":   {"label": "The old houses — dated", "group": "petite", "ids": ["v-hotel-la-ponche", "v-auberge-de-la-mole", "v-le-pont-d-or"]},
 "hautvar":  {"label": "The Haut-Var village tables", "group": "petite", "ids": ["v-l-auberge-des-braconniers", "v-solea", "v-picotte-provence"]},
 "maures":   {"label": "The Maures and the palm coast", "group": "petite", "ids": ["v-la-petite-fontaine", "v-lou-portaou", "v-la-colombe"]},
 "domaines": {"label": "The cellar doors — Bandol and the Côtes", "group": "petite", "ids": ["v-chateau-de-pibarnon", "v-domaine-de-terrebrune", "v-la-commanderie-de-peyrassol"]},
 "street":   {"label": "La Rue — the cade, the market street, the chestnut", "group": "street", "ids": ["v-la-cade-a-dede", "v-marche-du-cours-lafayette", "v-confiserie-azureenne"]},
}
CUT = {
 "v-la-voile-la-reserve-ramatuelle": "Duplicate record of La Voile (v-la-voile-la-reserve-de-ramatue): merged; its vegetable-menu detail goes to the kept record.",
 "v-beauvallon-sur-mer-by-yannick-": "Cap: the sand lane keeps Club 55 (the founding beach of 1955) and the two island tables; Beauvallon opened in April 2026 as a beach club with no star and nothing yet eaten to judge.",
 "v-le-belrose-althoff-villa-belro": "Cap: no star (its own record says so), and the hill-and-view register is told by the Belrose terrace bar card under Boire & sortir.",
 "v-hostellerie-berard-rene-sens": "Cut: its own record says the one-star René'Sens no longer exists (chef left Nov 2023; the room is now Riva, unstarred). The Bandol hills are told by the cellar doors and La Table du Castellet.",
 "v-la-table-de-nans": "Cut: 126 Corniche du Liouquet is in La Ciotat, Bouches-du-Rhône — outside the Var, as its own record says.",
 "v-la-table-du-marche": "Cut: its own record says the Leroy bistrot was liquidated and struck off on 22 July 2019; nothing confirms what trades under the name now.",
 "v-marche-de-sanary-sur-mer": "Not a table: the Wednesday market is a larder card (provisioning), with its days and hours.",
}
BERTHS = ["v-la-table-du-castellet", "v-la-colombe", "v-marche-du-cours-lafayette"]   # one per group, each confirmed trading on the 17 Oct re-check and open year-round or into winter (La Cade à Dédé found no 2026-dated evidence: it stays in its lane)
SHORTLIST = {
 "Last minute — save the night": ["v-shanael", "v-la-colombe", "v-hotel-la-ponche"],                         # all confirmed and trading in October 2026
 "Plan ahead — this week": ["v-hostellerie-de-l-abbaye-de-la-", "v-la-commanderie-de-peyrassol", "v-le-pont-d-or"],   # confirmed; Chez Bruno and Récif found nothing 2026-dated for the room itself, and La Môle has closed for the winter
 "Plan ahead — the grand night": ["v-la-vague-d-or-cheval-blanc-st-", "v-la-table-du-castellet", "v-la-voile-la-reserve-de-ramatue"],   # confirmed; two of the three are seasonal and closed now: said on the list
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "towns", "groups": [
   g("The gulf of Saint-Tropez", N("towns:Saint-Tropez"), N("towns:Ramatuelle & Gassin"), N("towns:Bormes-les-Mimosas")),
   g("The working ports", N("towns:Toulon"), N("towns:Sanary-sur-Mer & Le Brusc"), N("towns:Bandol")),
   g("The palm town and the chestnut village", N("towns:Hyères"), ("towns:Collobrières", "walks:Collobrieres"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("What grows here", N("curiosities:The fig with its own appellation"), N("curiosities:The cork oak that survives the fire"), N("curiosities:The mimosa is Australian")),
   g("The sea and the navy", N("curiosities:Why the islands are golden"), N("curiosities:Most of the French fleet sleeps in Toulon"), N("curiosities:The river the Var lost in 1860")),
   g("The other D-Day, and the exiles", N("curiosities:15 August 1944"), N("curiosities:Sanary, capital of German letters"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The markets", ("provisioning:Cours Lafayette", None), N("provisioning:Sanary's Wednesday market"), N("provisioning:The Aups truffle market")),
   g("Oil, figs and chestnuts", N("provisioning:Vieux Moulin du Partégal"), N("provisioning:The Solliès fig growers"), ("provisioning:Confiserie Azuréenne", None)),
   g("Where to buy the wine", N("provisioning:Maison des Vins de Bandol"), N("provisioning:Maison des Vins Côtes de Provence"), ("provisioning:Cave de la Capte", "natural-wine:Cave de la Capte / Vert d'Olive (Hyères)"))]},
 "walks": {"sub": "walks", "groups": [
   g("Along the sea", ("walks:Presqu'île de Giens & the salt pans", "walks:Presqu'ile de Giens, double tombolo & Salins des Pesquiers"), N("walks:The customs path, Gigaro to L'Escalet"), ("walks:Mont Faron", "landmarks:Rade de Toulon (from Mont Faron)")),
   g("The canyon and the forest", ("walks:Sentier Blanc-Martel", "walks:Sentier Blanc-Martel"), ("walks:Up to the Chartreuse de la Verne", "secret-gems:Chartreuse de la Verne"))]},
 "calas": {"sub": "sea", "groups": [
   g("The island water", ("calas:Plage Notre-Dame", "calas:Plage Notre-Dame, Porquerolles"), ("calas:The underwater trail at La Palud", "secret-gems:Sentier sous-marin de la Palud, Port-Cros")),
   g("The mainland sand", ("calas:Cap Taillat", "calas:Cap Taillat"), N("calas:Pampelonne, the public end"))]},
 "culture": {"sub": "culture", "groups": [
   g("The patrons and the gardener", ("culture:Villa Noailles", "culture:Villa Noailles"), ("culture:Fondation Carmignac", "culture:Fondation Carmignac (Villa Carmignac)"), ("culture:Domaine du Rayol", "around:Domaine du Rayol — Le Jardin des Méditerranées")),
   g("Saint-Tropez under the glamour", ("culture:The Citadelle", "landmarks:Citadelle de Saint-Tropez"), ("culture:Notre-Dame-de-l'Assomption", "landmarks:Église Notre-Dame-de-l'Assomption (Saint-Tropez)"), N("culture:Musée de l'Annonciade")),
   g("A president's rock and the tortoises", ("culture:Fort de Brégançon", "landmarks:Fort de Brégançon"), ("culture:Village des Tortues", "secret-gems:Village des Tortues, Carnoules"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Provençal craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("The cup itself", ("linger:Cafés Magali", "coffee-scene:Cafés Magali"), ("linger:Le Jardin du Café", "coffee-scene:Le Jardin du Café"), ("linger:Lorgues Coffee Roasters", "coffee-scene:Lorgues Coffee Roasters (La Grange)")),
   g("The terrace as an institution", ("linger:Sénéquier", "st-tropez:Sénéquier"), ("linger:Cafés Maurice", "coffee-scene:Cafés Maurice"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Bandol rouge", "drink:Bandol Rouge (Mourvèdre)"), ("drink:Bandol rosé", "drink:Bandol Rosé"), ("drink:Côtes de Provence rosé", "drink:Côtes de Provence Rosé")),
   g("The other glasses", ("drink:Pastis", "drink:Pastis"), ("drink:Fleur de Figue", "drink:Fleur de Figue (fig liqueur)"), ("drink:Chestnut liqueur", "drink:Liqueur de châtaigne / Crème de marrons (Collobrières)")),
   g("Natural wine, three counters in Toulon", ("bars:Superbuvette", "natural-wine:Superbuvette"), ("bars:Les Quilles", "natural-wine:Les Quilles"), ("bars:La Dégust' Nature", "natural-wine:La Dégust' Nature")),
   g("A glass above the gulf", ("bars:Bar du Sube", "hotel-bars:Bar du Sube"), ("bars:The Belrose terrace", "hotel-bars:Terrasse de la Villa Belrose"), ("bars:Le Soleil d'Eau, La Messardière", "hotel-bars:Bar Le Soleil d'Eau — Château de la Messardière")),
   g("Pampelonne's clubs, three registers", ("bars:La Réserve à la Plage", "st-tropez:La Réserve à la Plage"), ("bars:Moorea and Loulou", "st-tropez:Loulou / Moorea"), ("bars:Nikki Beach", "st-tropez:Nikki Beach")),
   g("The night", ("bars:Les Caves du Roy", "hotel-bars:Les Caves du Roy — Hôtel Byblos"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room, honestly", ("listening:La Cellule Records", "listening:La Cellule Records")),
   g("Live on the coast", ("listening:Oméga Live", "listening:Oméga Live (Tandem)"), ("listening:Châteauvallon", "listening:Châteauvallon-Liberté, scène nationale"), ("listening:Le Port des Créateurs", "listening:Le Port des Créateurs"))]},
 "around": {"sub": "trips", "groups": [
   g("The canyon and the faïence village", ("around:Gorges du Verdon & Lac de Sainte-Croix", "around:Gorges du Verdon & Lac de Sainte-Croix"), ("around:Moustiers-Sainte-Marie", "around:Moustiers-Sainte-Marie")),
   g("The golden islands", ("around:Porquerolles & Port-Cros", "around:Porquerolles & Port-Cros (Îles d'Or)")),
   g("The hill villages and the wine", ("around:Cotignac", "around:Cotignac"), ("around:Tourtour & Aups", "around:Tourtour & Aups (Haut Var)"), ("around:Bandol wine country", "around:Bandol wine country — La Cadière-d'Azur & Domaine Tempier"))]},
 "avoid": {"sub": "skip", "groups": [
   g("Four to skip", N("avoid:Saint-Tropez in August"), N("avoid:Eating on the photogenic quay"), N("avoid:Thinking the Var stops at the beach")),
   g("Read the glass", N("avoid:Pale pink, and calling it terroir"))]},
 "follow": {"sub": "follow", "groups": [
   g("The territory", N("follow:Var Tourisme"), N("follow:Saint-Tropez Tourisme"), N("follow:Parc national de Port-Cros")),
   g("The wine, the art and the red guide", N("follow:Vins de Bandol"), N("follow:Villa Noailles"), N("follow:MICHELIN Guide France"))]},
}
# pointer cards: a kept venue inside a section, in that section's angle; "Full card" links to its table card
POINTERS = {"provisioning:Cours Lafayette": "v-marche-du-cours-lafayette", "provisioning:Confiserie Azuréenne": "v-confiserie-azureenne"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "st-tropez:Le Club 55": "told once: Club 55 is a table (the sand lane); its 1955 story lives on its venue card",
             "st-tropez:Verde Beach / Indie Beach / Bagatelle": "cap: three Pampelonne clubs, one per register (quiet luxury, old Pampelonne, the party blueprint)",
             "st-tropez:Les Caves du Roy": "told once: merged with the hotel-bar card of the same club",
             "st-tropez:Le VIP Room (now Lilly's Club)": "the VIP Room closed after 3-5 April 2026 (the old card's own text); the successor is unjudged: cut",
             "hotel-bars:Bar de La Ponche": "told once: La Ponche is a table (the old houses lane); the Vian-and-Bardot story lives on its venue card",
             "hotel-bars:Sénéquier": "told once: merged into the Sénéquier card under rooms to linger",
             "gastronomy:Bandol / Cotes de Provence / Provence rose (the machine)": "told once: merged into the three 'ask for it by name' drink cards",
             "gastronomy:Cassis / drink:Bellet": "not in the Var (Bouches-du-Rhône; Nice): cut, as their own cards conceded",
             "coffee-scene:Torréfaction La Cigale": "cap: three cups; La Cigale is a bean shop, said so by its own card",
             "natural-wine:L'Épicerie Simple": "cap: three Toulon counters; its own card says opening days are limited",
             "listening:Villa Noailles / landmarks:Villa Noailles (Hyères)": "told once: one Villa Noailles card, under culture",
             "landmarks:Chartreuse de la Verne": "told once: merged into the walk up to La Verne",
             "secret-gems:Domaine du Rayol": "told once: merged into the culture card",
             "culture:Domaine Tempier": "told once: the Tempier story is the food-history fold (1941); the estate is named in Bandol wine country",
             "culture:La Tarte Tropézienne (Alexandre Micka)": "told once: the tropézienne is a gem popup and an item in La liste",
             "around:Massif des Maures — Collobrières & Chartreuse de la Verne": "told once: Collobrières is a town card, La Verne a walk",
             "around:Domaine du Rayol": "told once: the culture card",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
