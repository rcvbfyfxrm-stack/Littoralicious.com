#!/usr/bin/env python3
"""The editorial cut for Dubrovnik-Dalmatie GOLD6 (22 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons, the venues added from the guide's own text) and card_plan.json (every fold, its groups,
its cards and the old card each is built from).
The old page was a GOLD1-era tier inventory (publish-terroir.py): 18 venue records in three flat tiers, no lanes, no dishes,
no terroir/data copy; 74 tcards in 14 folds, several told two or three times (the walls have a culture card and a walk card,
St Blaise Day a culture card and an event card, the Summer Festival the same, the oysters a dish, a market, a producer and an
avoid card), and empty follow and seasonal folds.
Run: python3 terroir/_rollout/review/Dubrovnik-Dalmatie/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit":  {"label": "The grand tables — on the walls, the roof and the sea", "group": "grande", "ids": ["v01-restaurant-360", "v02-stara-lo-a-prijeko-palace", "v04-nautika"]},
 "houses":  {"label": "The old houses inside the walls", "group": "petite", "ids": ["v03-proto-fish-restaurant", "v05-kopun", "v11-lady-pi-pi"]},
 "konoba":  {"label": "Under the bell — the country konobas", "group": "petite", "ids": ["v06-konoba-dubrava", "v09-konoba-konavoski-dvori"]},
 "oysters": {"label": "Mali Ston — the oysters at the source", "group": "petite", "ids": ["v07-bota-are-mali-ston", "v08-vila-koruna"]},
 "locals":  {"label": "Where the city eats when the Old Town is full", "group": "petite", "ids": ["v10-konoba-atlantic-kitchen", "v13-pizzeria-tabasco", "v-taj-mahal"]},
 "glass":   {"label": "The glass — a wine bar and two Pelješac cellars", "group": "petite", "ids": ["v14-d-vino-wine-bar", "v17-grgi-vina-cellar-door", "v18-milo-stagnum"]},
 "street":  {"label": "La Rue — the market, the sandwich, the octopus burger", "group": "street", "ids": ["v16-gru-market-tr-nica-gru", "v12-buffet-kola", "v-barba"]},
}
# two places the old guide described in its own cards (street-food, burger-kebab) but never gave a record:
# built from that text only, no coordinates (none was ever geocoded), re-verified by the venue pack
NEW_VENUES = {
 "v-taj-mahal": {"id": "v-taj-mahal", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Taj Mahal (Bosnian grill)",
   "short": "Taj Mahal", "lat": None, "lng": None, "tags": [], "productTags": ["Bosnian grill"],
   "address": "Nikole Gučetića, Old Town, 20000 Dubrovnik",
   "maps": "https://www.google.com/maps/search/?api=1&query=Taj+Mahal+Nikole+Gucetica+Dubrovnik+Croatia",
   "why": "", "verdict": "Despite the name, a Bosnian grill: ćevapi, minced-meat fingers grilled over charcoal and served in lepinja flatbread with raw onion and ajvar, plus klepe, sogan dolma and burek. Honest Balkan cooking, not a theme park.",
   "signature": "Ćevapi in lepinja with onion and ajvar.", "caveat": "", "person": "", "_source": "old street-food card"},
 "v-barba": {"id": "v-barba", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Barba",
   "short": "Barba", "lat": None, "lng": None, "tags": [], "productTags": ["Seafood street food"],
   "address": "Boškovićeva 5, Old Town, 20000 Dubrovnik",
   "maps": "https://www.google.com/maps/search/?api=1&query=Barba+Boskoviceva+5+Dubrovnik+Croatia",
   "why": "", "verdict": "Slow Dalmatian fast food: Adriatic fish in fast-food formats — an octopus burger, a fish taco, salted-cod croquettes. A counter and a handful of tables, walk-in.",
   "signature": "The octopus burger.", "caveat": "", "person": "", "_source": "old burger-kebab card"},
}
CUT = {
 "v15-glam-caf-beer-therapy": "Cut: a late craft-beer bar in an Old Town lane — fine, but nothing this coast does that a bar elsewhere does not; the glass lane keeps the Croatian-only wine bar and the two Pelješac cellars.",
}
BERTHS = []       # set after the 22 Oct re-check (make_inputs prints the confirmed, year-round candidates)
SHORTLIST = {}    # idem
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
O = lambda k: (k, k)
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("Inside and at the gates", N("quartiers:The Old Town"), N("quartiers:Pile"), N("quartiers:Ploče")),
   g("West, where the boats are", N("quartiers:Gruž"), N("quartiers:Lapad"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("How the Republic ran", ("curiosities:A ruler for one month", "culture:Republic of Ragusa — the one-month Rector"), N("curiosities:The wind that excused a crime"), ("curiosities:Why every façade matches", "culture:1667 earthquake · the Gradić rebuild")),
   g("Two citizens", ("curiosities:Marin Držić", "culture:Marin Držić · Dundo Maroje 1551"), ("curiosities:Ruđer Bošković", "culture:Ruđer Bošković · the 1758 atomic-precursor theory"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The morning", N("provisioning:Gruž Market"), ("provisioning:Gundulić Square market", "gastronomy:Gundulićeva Poljana — Old Town morning market"), ("provisioning:The oyster quay at Mali Ston", "gastronomy:Mali Ston quay (oysters direct)")),
   g("The cellars of Pelješac", N("provisioning:Grgić Vina"), ("provisioning:Saints Hills", "gastronomy:Saints Hills — Oskorušno, Pelješac + Komarna")),
   g("To carry home", ("provisioning:Uje", "gastronomy:Uje — Croatian olive oils"), ("provisioning:The Franciscan pharmacy", "gastronomy:Franciscan Monastery Pharmacy (1317)")),
   g("The galley pantry", ("provisioning:Asia Shop", "ethnic-restaurants:Asia Shop Dubrovnik"), ("provisioning:Konzum by Pile Gate", "ethnic-restaurants:Konzum on Gundulićeva Poljana"))]},
 "walks": {"sub": "walks", "groups": [
   g("The city on foot", ("walks:The city walls", "walks:City Walls loop"), ("walks:Stradun and the five squares", "walks:Stradun five-squares walk"), ("walks:Mount Srđ and Fort Imperial", "walks:Mount Srđ cable car + Fort Imperial")),
   g("Out of town", ("walks:The walls of Ston", "walks:Ston walls walk + salt pans"), ("walks:The Ljuta and its mills", "walks:Konavle Ljuta river + watermills walk"))]},
 "calas": {"sub": "sea", "groups": [
   g("In sight of the walls", N("calas:Banje"), N("calas:The rocks under the south wall"), N("calas:Sveti Jakov")),
   g("A boat away", ("calas:Lokrum", "walks:Lokrum island circuit"), N("calas:Lopud and Šunj"))]},
 "culture": {"sub": "culture", "groups": [
   g("The Republic in stone", ("culture:The Rector's Palace", "culture:Republic of Ragusa — the one-month Rector"), ("culture:Sponza and the Memorial Room", "culture:Memorial Room of the Defenders · Sponza Palace"), ("culture:Lazareti", "secret-gems:Lazareti — the 1627 quarantine, now culture"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Croatian craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Three rooms with a plug", ("linger:Cogito Coffee", "work:Cogito Coffee Gruž"), ("linger:Mara's Bar", "work:Mara's Bar"), ("linger:The ACI Marina lounge", "work:ACI Marina lounge"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Plavac Mali", "drink:Plavac Mali — grandchild of Zinfandel"), ("drink:Dingač", "drink:Dingač — Croatia's first protected wine"), ("drink:Pošip", "drink:Pošip — Korčula white")),
   g("The other glasses", ("drink:Grk", "drink:Grk — only Lumbarda"), ("drink:Prošek", "drink:Prošek — the Dalmatian dessert wine"), ("drink:Travarica and the home rakija", "drink:Travarica · Loza · Orahovac · Rozalin")),
   g("A glass on the rocks", ("bars:Buža", "secret-gems:Buža — the hole-in-the-wall bar"), N("bars:D'vino"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room, honestly", N("listening:No hi-fi bar inside the walls")),
   g("Live, the real thing", ("listening:Linđo at Lazareti", "music:Linđo Folklore Ensemble — Lazareti"), N("listening:Klapa in the churches")),
   g("Queue it before service", ("listening:Oliver Dragojević", 'music:Oliver Dragojević — "Cesarica"'), ("listening:Gibonni", "music:Gibonni — 43 Porin awards"), ("listening:Klapa Cambi", "music:Klapa Cambi — five-time Omiš gold"))]},
 "around": {"sub": "trips", "groups": [
   g("South to Konavle", ("around:Cavtat", "walks:Cavtat harbour + Račić mausoleum"), ("around:Sokol Grad", "secret-gems:Sokol Grad — the Konavle falcon fortress")),
   g("Up the coast", N("around:Trsteno Arboretum"), N("around:Mljet"))]},
 "avoid": {"sub": "skip", "groups": [
   g("The crowd and the street", N("avoid:The cruise-day crush"), ("avoid:Prijeko Street", "avoid:Prijeko Street tourist traps"), ("avoid:Pizza by the slice on Stradun", "avoid:Reheated pizza on Stradun")),
   g("Read the plate", ("avoid:Oysters inside the walls", 'avoid:"Fresh" oyster claims inside the walls'), ("avoid:Truffle on the menu", "avoid:Truffle products in Dubrovnik"))]},
 "follow": {"sub": "follow", "groups": [
   g("The city", N("follow:Dubrovnik Tourist Board"), N("follow:Dubrovnik Summer Festival"), N("follow:The Dubrovnik Times")),
   g("Getting about", N("follow:Jadrolinija"), N("follow:Dubrovnik Port Authority"))]},
}
POINTERS = {"provisioning:Gruž Market": "v16-gru-market-tr-nica-gru", "provisioning:Grgić Vina": "v17-grgi-vina-cellar-door", "bars:D'vino": "v14-d-vino-wine-bar"}
for k, l in LANES.items(): assert len(l["ids"]) <= 3 or k in FOURS, k
for f, p in PLAN.items():
    for gr in p["groups"]: assert len(gr["cards"]) <= 3, (f, gr["title"])
if (RV / "picks_lists.json").exists():   # the berths and the guest list, set after the re-check
    L = json.load(open(RV / "picks_lists.json")); BERTHS, SHORTLIST = L["berths"], L["shortlist"]
json.dump({"lanes": LANES, "groups": {g_: [k for k, l in LANES.items() if l["group"] == g_] for g_ in ("grande", "petite", "street")},
           "keep_pins": [], "cut": CUT, "new_venues": NEW_VENUES, "berths": BERTHS, "shortlist": SHORTLIST, "fours": FOURS,
           "dropped_cards": {
             "bougie:* (360, Nautika, Stara Loža)": "told once: the three 'where the money sits' cards repeated the three grand tables; each is its table card",
             "culture:City Walls — Minčeta, Bokar, Lovrijenac": "told once: merged into the walls walk",
             "culture:Festa Sv. Vlaha / events:Festa Sv. Vlaha": "told once: one calendar card (the dates), the šporki makaruli in The Dish",
             "culture:Dubrovnik Summer Festival / events:Dubrovnik Summer Festival": "told once: one calendar card",
             "dish:* (7 plates)": "rewritten as The Dish inside La liste",
             "drink:Maraschino — Dominican friars, 16th c.": "cap: three other glasses; a Zadar liqueur, four hours up the coast, poured everywhere but not made here",
             "music:Doris Dragović": "cap: three voices to queue; Oliver, Gibonni and Klapa Cambi carry the playlist",
             "work:Mlinar Lapad / work:Rixos Libertas lobby": "cap: three rooms; a bakery chain and a hotel lobby you must buy your way into",
             "street-food:Burek": "told once: the burek is on La liste and the hot board's bakery line, not a card of its own",
             "street-food:Ćevapi at Taj Mahal / burger-kebab:Barba": "now table venues (the locals and street lanes)",
             "burger-kebab:Mirakul Burger — Lapad": "cap: an American smash burger is not what anyone crosses the Adriatic for; Barba keeps the street lane's fast plate",
             "gastronomy:Gruž Market / Grgić Vina / Miloš Stagnum": "now table venues; Gruž Market and Grgić keep a pointer card in the larder",
             "gastronomy:Mali Ston Bay oyster farms (collective)": "told once: the PDO and the farms are the oyster lane's story and the quay card",
             "gastronomy:Maraska d.d. — Zadar": "cut with the maraschino card: in Zadar",
             "gastronomy:Dežo Art (Konavle textiles)": "moved to the craft brief (the Konavle embroidery candidates)",
             "events:* (8)": "rewritten as the calendar (and the hot board for this month)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
