#!/usr/bin/env python3
"""The editorial cut for Cavalaire-sur-Mer GOLD6 (21 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons, the two venues added from the guide's own research) and card_plan.json (every fold, its groups,
its cards and the old card each is built from).
The old page was a GOLD2-era tier inventory: 20 venue records in four flat categories (one duplicate record, two
records of the same Lily of the Valley beach club), no lanes, no dishes; 68 tcards in 13 folds, several told three times
(the Domaine du Rayol has four cards, the three-capes walk three, the landing monument two).
Run: python3 terroir/_rollout/review/Cavalaire-sur-Mer/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit":  {"label": "The stars of the peninsula", "group": "grande", "ids": ["v-la-voile-la-reserve-ramatuelle", "v-la-palmeraie-chateau-de-valmer", "v-vista-lily-of-the-valley"]},
 "chefs":   {"label": "Out of the palace kitchens — two chefs' rooms", "group": "grande", "ids": ["v-les-saisonniers", "v-le-parc-l-hotel-du-parc"]},
 "sand":    {"label": "On the sand — Gigaro and the Grande Plage", "group": "petite", "ids": ["v-la-pinede-plage", "v-marius-a-la-plage", "v-tamaris-beach"]},
 "fish":    {"label": "Fish by the water — the port, the cliff, the pines", "group": "petite", "ids": ["v-le-comptoir-des-saveurs", "v-le-grand-bleu-hotel-de-la-cala", "v-le-refuge"]},
 "corniche": {"label": "Along the Corniche des Maures", "group": "petite", "ids": ["v-maurin-des-maures", "v-le-cafe-des-jardiniers-domaine"]},
 "villages": {"label": "The hill villages — Gassin and Ramatuelle", "group": "petite", "ids": ["v-bello-visto", "v-la-verdoyante", "v-la-forge"]},
 "street":  {"label": "La Rue — off the boat, the Wednesday market, the port glass", "group": "street", "ids": ["v-pecheurs-du-port", "v-marche-place-jean-moulin", "v-o-petit-bar"]},
}
# two places the old guide described at length (its #eat gem, #money-sits gem and #provisioning list) but never gave a record:
# built from that text only, no coordinates (none was ever geocoded), re-verified by the venue pack
NEW_VENUES = {
 "v-pecheurs-du-port": {"id": "v-pecheurs-du-port", "cat": "shop", "tier": "plenty", "priority": 1, "name": "The fishermen's stand, Quai Marc Pajot",
   "short": "The fishermen's stand", "lat": None, "lng": None, "tags": [], "productTags": ["Direct sale off the boats"],
   "address": "Quai Marc Pajot (Rue du Port), Port de Cavalaire, 83240 Cavalaire-sur-Mer",
   "maps": "https://www.google.com/maps/search/?api=1&query=Quai+Marc+Pajot+Cavalaire-sur-Mer+Var+France",
   "why": "", "verdict": "Cavalaire keeps a small working fleet, and the boats sell straight off the quay most mornings from about 10:00, catch and weather permitting: girelle, rascasse and chapon for the soupe de roche, sea bream and sea bass, sometimes a spider crab or a langouste.",
   "signature": "Rockfish for soup; the day's bream, bass and red mullet.", "caveat": "Weather and catch decide: some mornings there is nothing.", "person": "", "_source": "old #eat gem, #history, #provisioning, #avoid"},
 "v-marche-place-jean-moulin": {"id": "v-marche-place-jean-moulin", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Wednesday market, Place Jean Moulin",
   "short": "Wednesday market", "lat": None, "lng": None, "tags": [], "productTags": ["Provençal market"],
   "address": "Place Jean Moulin, 83240 Cavalaire-sur-Mer",
   "maps": "https://www.google.com/maps/search/?api=1&query=Place+Jean+Moulin+Cavalaire-sur-Mer+Var+France",
   "why": "", "verdict": "Around a hundred stalls every Wednesday morning, year-round, roughly 08:30–13:00: tapenade and anchoïade, olives, honey and olive oil, cheese and charcuterie, fish and seasonal fruit, and the rosé of the gulf.",
   "signature": "Tapenade, anchoïade, honey of the Maures, the gulf's rosé.", "caveat": "Morning only: it folds by one.", "person": "", "_source": "old #money-sits gem, #soul, #provisioning"},
}
CUT = {
 "v-la-brigantine": "Duplicate record of La Brigantine, the Lily of the Valley beach club (v-la-brigantine-lily-of-the-vall): merged, then cut with it.",
 "v-la-brigantine-lily-of-the-vall": "Cap: the sand lane keeps the one-toque Pinède, the family beach of Marius and Tamaris on Cavalaire's own sand; La Brigantine is the Lily of the Valley's 600–800-cover beach club, and the house is already in the guide through Vista.",
 "v-l-auberge-de-l-oumede": "Cut: its own record says 'good rather than transcendent', TripAdvisor its only signal; a small hotel among the vines, closed since 4 October. The villages lane keeps three with a stronger reason to drive.",
}
BERTHS = ["v-les-saisonniers", "v-maurin-des-maures", "v-marche-place-jean-moulin"]   # one per group, each confirmed on the 21 Oct re-check and open year-round
SHORTLIST = {   # rebuilt from the 21 Oct re-check: only venues confirmed trading in 2026, grouped by what is open now
 "Last minute — save the night": ["v-le-refuge", "v-la-forge", "v-le-grand-bleu-hotel-de-la-cala"],          # open now: to 31 Oct, 1 Nov, 6 Nov
 "Plan ahead — this week": ["v-les-saisonniers", "v-maurin-des-maures"],                                      # year-round; Maurin's bouillabaisse is ordered the day before
 "Plan ahead — the grand night": ["v-la-voile-la-reserve-ramatuelle", "v-la-palmeraie-chateau-de-valmer", "v-vista-lily-of-the-valley"],   # all three seasonal and closed now: said on the list
}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("The town on the bay", ("quartiers:Port Héraclea", "landmarks:Port de Cavalaire — the ancient Heraclea anchorage"), ("quartiers:Pardigon", "secret-gems:Pardigon"), ("quartiers:The young town", "landmarks:Église Saint-Laurent")),
   g("Over the capes", N("quartiers:La Croix-Valmer and Gigaro"), N("quartiers:Le Rayol-Canadel"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("Older than it looks", N("curiosities:The hill fort over the bay"), N("curiosities:The train that made the town"), N("curiosities:The seafarers' chapel of 1639")),
   g("Under and on the water", N("curiosities:A drowned fleet under the swimmers"), N("curiosities:The tuna traps of the gulf"), N("curiosities:The pointu"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The morning", N("provisioning:The fishermen's stand"), N("provisioning:Wednesday market"), N("provisioning:La Croix-Valmer's Sunday market")),
   g("Wine from the hill to the water", N("provisioning:Domaine de la Croix"), N("provisioning:Domaine La Tourraque"), N("provisioning:Château Minuty")),
   g("The caviste in town", ("provisioning:La Cave de Mon Village", "natural-wine:La Cave de Mon Village"))]},
 "walks": {"sub": "walks", "groups": [
   g("The three capes", ("walks:Le Sentier des Trois Caps", "walks:Le Sentier du Littoral — Les Trois Caps (Gigaro → Cap Lardier → Cap Taillat)"), ("walks:Cap Lardier's crest", "walks:Pointe / high point of Cap Lardier")),
   g("Cavalaire's own", ("walks:Sentier du Fenouillet", "walks:Sentier du Fenouillet (Domaine Foncin)"))]},
 "calas": {"sub": "sea", "groups": [
   g("The wild end of the peninsula", O("calas:Cap Taillat"), ("calas:Plage de la Briande", "calas:Plage de la Briande"), N("calas:The douaniers' coves")),
   g("Cavalaire's side and the corniche", ("calas:Bonporteau", "calas:Plage & Sentier Sous-Marin de Bonporteau"), ("calas:The Rayol coves", "calas:Plage du Figuier (the wild coves of the Rayol coast)"), ("calas:Le Sentier Marin du Rayol", "culture:Le Sentier Marin du Rayol (underwater snorkel trail)"))]},
 "culture": {"sub": "culture", "groups": [
   g("The gardener and the painters", ("culture:Domaine du Rayol", "culture:Domaine du Rayol — Le Jardin des Méditerranées"), ("culture:Musée de l'Annonciade", "listening:Musée de l'Annonciade"), ("culture:Espace Archéologique Aristide Fabre", "landmarks:Espace Archéologique Municipal Aristide Fabre")),
   g("15 August 1944", ("culture:Alpha — the landing beach", "landmarks:Monument du Débarquement de Provence"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Provençal craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("The cup itself", ("linger:RAWr Torréfaction", "coffee-scene:RAWr Torréfaction"), ("linger:Injir Coffee Shop", "coffee-scene:Injir Coffee Shop"), ("linger:Soeurs Coffee & Bakery", "coffee-scene:Soeurs Coffee & Bakery"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Côtes de Provence rosé", "drink:Côtes de Provence Rosé — the pale, bone-dry archetype"), ("drink:Cru Classé rosé", "drink:Cru Classé Rosé — Provence's own 1955 ranking"), ("drink:Tibouren", "drink:Seaside sand-terroir Rosé with Tibouren")),
   g("The other glasses", ("drink:Rolle, the white", "drink:Côtes de Provence Blanc — Rolle by the water"), ("drink:The red for a cool evening", "drink:Côtes de Provence Rouge — Mourvèdre for the cool evening"), ("drink:Pastis", "drink:Pastis — the shore aperitif ritual")),
   g("Living wine, three counters", ("bars:La Grange à Vins", "natural-wine:La Grange à Vins"), ("bars:HERA", "natural-wine:HERA Bistrot • Bar à vin"), ("bars:Fondugues-Pradugues", "natural-wine:Fondugues-Pradugues")),
   g("A glass with a view", ("bars:Bar 1904, La Messardière", "hotel-bars:Bar 1904, Château de la Messardière (Airelles)"), ("bars:Bar de La Ménado", "nightlife:Bar de La Ménado")),
   g("After dark, honestly", ("bars:La Rhumerie", "nightlife:La Rhumerie"), ("bars:Marina Viva Plage", "nightlife:Marina Viva Plage"), ("bars:Playa Mezcala", "nightlife:Playa Mezcala"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room, honestly", N("listening:No hi-fi bar on this bay")),
   g("Music by the water", ("listening:Festival Face à la Mer", "listening:Festival Face à la Mer"), ("listening:Les Escales Musicales", "nightlife:Les Escales Musicales"), ("listening:Jazz à Ramatuelle", "listening:Jazz à Ramatuelle")),
   g("Under the stars", ("listening:Festival de Ramatuelle", "listening:Festival de Ramatuelle"), ("listening:Les Nuits du Château de la Moutte", "listening:Les Nuits du Château de la Moutte"))]},
 "around": {"sub": "trips", "groups": [
   g("The hill villages", ("around:Gassin", "around:Gassin"), ("around:Ramatuelle", "around:Ramatuelle"), ("around:Bormes-les-Mimosas", "around:Bormes-les-Mimosas")),
   g("Into the Maures, and out to the islands", ("around:Collobrières and La Verne", "around:Collobrières & the Chartreuse de la Verne"), ("around:Porquerolles and Port-Cros", "around:Îles d'Hyères — Porquerolles & Port-Cros"))]},
 "avoid": {"sub": "skip", "groups": [
   g("Four to skip", N("avoid:Saint-Tropez by car in August"), N("avoid:The Pampelonne fantasy"), N("avoid:Reading the winter seafront as empty")),
   g("Read the plate", N("avoid:'Fresh fish' without asking"))]},
 "follow": {"sub": "follow", "groups": [
   g("The town and the gulf", N("follow:Cavalaire Tourisme"), N("follow:Golfe de Saint-Tropez Tourisme"), N("follow:Les Bateaux Verts")),
   g("The wild coast", N("follow:Parc national de Port-Cros"), N("follow:Domaine du Rayol"))]},
}
POINTERS = {"provisioning:The fishermen's stand": "v-pecheurs-du-port", "provisioning:Wednesday market": "v-marche-place-jean-moulin"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "new_venues": NEW_VENUES, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "landmarks:Domaine du Rayol / around:Domaine du Rayol / secret-gems:Domaine du Rayol": "told once: four cards of the same garden merged into one, under culture; its lunch is the Café des Jardiniers table",
             "culture:Cap Lardier & Cap Taillat coastal path / around:Cap Lardier & Cap Taillat coastal path": "told once: merged into the Trois Caps walk",
             "landmarks:Cap Lardier": "told once: merged into the Cap Lardier crest walk (the Conservatoire's 1978 purchase lives there)",
             "culture:Monument du Débarquement, Plage de Cavalaire (Alpha Beach)": "told once: merged with the landmarks card and the old 1944 story fold into one culture card",
             "culture:Sentier du Fenouillet, Corniche des Maures": "told once: merged into the Fenouillet walk",
             "culture:Gassin": "told once: merged into the Gassin village card under Autour",
             "around:Corniche des Maures pocket coves": "told once: merged into the Rayol coves card",
             "hotel-bars:Le Vista, Lily of the Valley": "told once: Vista is a table (the stars lane); its sunset terrace is on its venue card",
             "hotel-bars:La Brigantine — Lily of the Valley beach club, Gigaro": "the venue is cut (cap on the sand lane)",
             "nightlife:Festival Face à la Mer": "told once: merged into the listening card of the same festival",
             "coffee-scene:Le Jardin du Café": "cap: three cups; Hyères is an hour west, and the gulf has two roasters nearer",
             "natural-wine:Le Clos des B": "cap: three counters; its own card says it is a grower to look for on lists, not a place to visit",
             "drink:Bière du Golfe": "cap: three other glasses; brewed in Sainte-Maxime, across the gulf",
             "dish:Rosé de Provence (Côtes de Provence & Bandol)": "told once: the rosé is the drink card; the dish fold keeps plates",
             "dish:* (8 plates)": "rewritten as The Dish inside La liste",
             "provisioning:La Cave de Mon Village": "cut on the 21 Oct re-check: no 2026 trace of the shop, and 329 avenue des Alliés is now listed for a furniture shop",
             "curiosities: twin town (New Port Richey) / catch / Saint-Tropez 1470": "too thin to carry a card; the 1944 note is the culture card",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
