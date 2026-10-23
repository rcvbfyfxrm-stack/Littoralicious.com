#!/usr/bin/env python3
"""The editorial cut for Split-Dalmatie GOLD6 (23 Oct 2026), as data: picks.json (lanes <=3, groups, berths, guest list,
cut venues with reasons, the venue added from the guide's own text) and card_plan.json (every fold, its groups,
its cards and the old card each is built from).
The old page was a GOLD1-era tier inventory (publish-terroir.py): 19 venue records in flat tiers, no lanes, no dishes,
no terroir/data copy; 66 tcards in 12 folds, several told two or three times (Marjan has a culture card, a walk card, a
work card and a secret-gem card; Salona and Trogir a culture card and a walk card each; the Summer Festival and the film
festival a music card and an event card each; Bačvice a work card and a secret-gem card; Prošek a drink card and an avoid card).
Run: python3 terroir/_rollout/review/Split-Dalmatie/make_plan.py"""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent

LANES = {
 "summit":  {"label": "The grand tables — the Riva, a counter by the harbour, and the sea at Firule", "group": "grande", "ids": ["v01-zoi", "v-krug", "v03-dvor"]},
 "varos":   {"label": "Veli Varoš — the konobas of the fishermen's quarter", "group": "petite", "ids": ["v04-konoba-fetivi", "v08-konoba-matejuska", "v11-sperun"]},
 "palace":  {"label": "In and around the palace walls", "group": "petite", "ids": ["v06-apetit", "v12-villa-spiza", "v05-bokeria-kitchen-wine"]},
 "bistro":  {"label": "The new Split bistros — the wine list first", "group": "petite", "ids": ["v17-zinfandel-food-wine-bar", "v02-sug"]},
 "locals":  {"label": "Where the city eats — a family konoba and the ćevapi", "group": "petite", "ids": ["v09-konoba-marjan", "v-kantun-paulina"]},
 "street":  {"label": "La Rue — the two markets and the fishermen's buffet", "group": "street", "ids": ["v13-pazar-marche-vert", "v14-ribarnica-marche-aux-poiss", "v10-fife"]},
}
# one place the old guide described in its own card (street-food: Kantun Paulina) but never gave a record, built from that
# text only and re-verified by the venue pack; and Krug, the MICHELIN star (2025) the old guide said Split did not have,
# found by the 23 Oct re-check and built from those sources only. No coordinates for either (none was ever geocoded).
NEW_VENUES = {
 "v-krug": {"id": "v-krug", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Krug",
   "short": "Krug", "lat": None, "lng": None, "tags": [], "productTags": ["Tasting menu"],
   "address": "Obala Ante Trumbića 17, 21000 Split",
   "maps": "https://www.google.com/maps/search/?api=1&query=Krug+restaurant+Obala+Ante+Trumbica+17+Split+Croatia",
   "why": "", "verdict": "", "signature": "", "caveat": "", "person": "", "_source": "23 Oct re-check (MICHELIN 2025, Gault&Millau 2026)"},
 "v-kantun-paulina": {"id": "v-kantun-paulina", "cat": "shop", "tier": "plenty", "priority": 1, "name": "Kantun Paulina",
   "short": "Kantun Paulina", "lat": None, "lng": None, "tags": [], "productTags": ["Ćevapi"],
   "address": "Matošića, Centre, 21000 Split",
   "maps": "https://www.google.com/maps/search/?api=1&query=Kantun+Paulina+Split+Croatia",
   "why": "", "verdict": "The reference ćevabdžinica of central Split: skinless minced-meat ćevapi off the charcoal, by five or ten, in a warm somun with kajmak, ajvar and raw onion. Eaten standing or at a few outside tables.",
   "signature": "Ten ćevapi in somun with kajmak and onion.", "caveat": "", "person": "", "_source": "old street-food card"},
}
CUT = {
 "v07-bajamonti": "Cut: a handsome café-restaurant under the Prokurative arcades, but a room for the square, not for this coast's cooking; the palace lane keeps three kitchens that cook Dalmatia, and the Prokurative is named on the Riva card.",
 "v15-d16-coffee": "Moved, not lost: a coffee bar is not a table. It keeps a card under Rooms to linger (its own address and map), and leaves the venue list.",
 "v18-uje-oil-bar": "Moved, not lost: an oil shop is not a table. It keeps a card in the larder (its own address and map), and leaves the venue list.",
 "v16-paradox-wine-cheese-bar": "Cut on the 23 Oct re-check: listed permanently closed (no closing date found, no 2025-26 trace). Its lane is gone; Zinfandel moves to the bistro lane.",
 "v19-parasol": "Cut as a venue: the 23 Oct re-check found it trading as a natural-wine bar, with no trace of the hi-fi system the old guide described; the listening card says so honestly.",
}
BERTHS = []       # set after the 23 Oct re-check (picks_lists.json)
SHORTLIST = {}
FOURS = {}

def g(title, *cards, desc=""): return {"title": title, "desc": desc, "cards": [{"key": k, "from": f} for k, f in cards]}
N = lambda k: (k, None)
PLAN = {
 "quartiers": {"sub": "quarters", "groups": [
   g("The palace and its front", N("quartiers:The palace"), N("quartiers:Veli Varoš"), N("quartiers:The Riva and Matejuška")),
   g("East of the palace", N("quartiers:Bačvice and Firule"))]},
 "curiosities": {"sub": "curious", "groups": [
   g("Odd things in the palace", ("curiosities:The sphinx on the peristyle", "secret-gems:🌉 Le péristyle · minuit en novembre"), N("curiosities:Grgur Ninski's toe"), N("curiosities:No flies in the fish hall")),
   g("Stone and sea", N("curiosities:The stone of the White House"), ("curiosities:Picigin", "work:🏔 Plage Bačvice"))]},
 "provisioning": {"sub": "markets", "groups": [
   g("The morning", N("provisioning:Pazar"), N("provisioning:Ribarnica")),
   g("To carry home", ("provisioning:Uje", "gastronomy:🍃 Uje Oil Bar — huiles d'olive croates"), ("provisioning:Paški sir and Pag salt", "gastronomy:🧀 Paški sir — Pag"), ("provisioning:Stina, Bol", "gastronomy:🍷 Stina Winery — Bol (Brač)"))]},
 "walks": {"sub": "walks", "groups": [
   g("The city on foot", ("walks:Through the palace, gate to gate", "walks:🔔 Palace at dawn"), ("walks:Marjan", "walks:🏔 Marjan — circuit complet")),
   g("Half a day inland", ("walks:Salona and Klis", "walks:🏯 Salona — cité romaine"))]},
 "calas": {"sub": "sea", "groups": [
   g("Swims in town", ("calas:Bačvice", "secret-gems:🌊 Bačvice · pointe est de galets · 06:00"), N("calas:Kašjuni"), N("calas:Bene"))]},
 "culture": {"sub": "culture", "groups": [
   g("The emperor's house", ("culture:The substructures", "culture:Palais de Dioclétien"), ("culture:The cathedral and its bell tower", "culture:Cathédrale Saint-Domnius"), ("culture:The Archaeological Museum", "culture:Musée archéologique de Split")),
   g("The sculptor", ("culture:Galerija Meštrović", "culture:Galerija Meštrović"))]},
 "craft": {"sub": "craft", "groups": [
   g("Do this one", N("craft:Do this one")),
   g("The others, and what each is missing", N("craft:Other one"), N("craft:Other two")),
   g("The honest warning", N("craft:What is sold as Dalmatian craft"))]},
 "coffee-gardens": {"sub": "linger", "groups": [
   g("Three places to sit", ("linger:D16 Coffee", "work:D16 Coffee"), ("linger:The Riva", "work:Riva — promenade en front de mer"), ("linger:Matejuška with a bottle", "secret-gems:🍷 Matejuška · evening · vin au gobelet"))]},
 "bars": {"sub": "bars", "groups": [
   g("Ask for it by name", ("drink:Plavac Mali", "drink:🍷 Plavac Mali — le grand rouge dalmate"), ("drink:Pošip", "drink:🍷 Pošip — le grand blanc de Korčula"), ("drink:Tribidrag", "drink:🍷 Tribidrag (Crljenak Kaštelanski / Zinfandel)")),
   g("The other glasses", ("drink:Vugava", "drink:🍷 Vugava — indigenous Vis grape variety"), ("drink:Prošek", "drink:🍇 Prošek — vin de paille dalmate"), ("drink:Rakija", "drink:🌲 Rakija — eau-de-vie de fruit ou d'herbes")),
   g("Where to pour them", N("bars:Zinfandel"))]},
 "listening": {"sub": "listening", "groups": [
   g("The listening room", ("listening:Parasol", "music:🎷 Parasol — listening bar audiophile")),
   g("Live, the real thing", ("listening:Klapa", "music:🎼 Klapa — chant polyphonique dalmate (UNESCO)")),
   g("Queue it before service", N("listening:Oliver Dragojević"), N("listening:Gibonni"), N("listening:Daleka obala"))]},
 "around": {"sub": "trips", "groups": [
   g("The islands", ("around:Brač", "walks:🏝 Brač — demi-journée île"), ("around:Hvar and Vis", "bougie:Brač / Hvar — villas et boutique-hôtels")),
   g("Along the coast", ("around:Trogir", "walks:🚕 Trogir — demi-journée"), N("around:Omiš and the Cetina"))]},
 "avoid": {"sub": "skip", "groups": [
   g("The street", N("avoid:The cruise-day midday"), N("avoid:The laminated menu in the palace")),
   g("Read the glass and the plate", ("avoid:The pitcher of house wine", "avoid:⚠ Unmarked «house wine» on the peristyle"), ("avoid:Pašticada in August", "avoid:⚠ Pašticada served at peak summer in tourist tavernas"))]},
 "follow": {"sub": "follow", "groups": [
   g("The city", N("follow:Split Tourist Board"), N("follow:Croatian National Theatre Split"), N("follow:Slobodna Dalmacija")),
   g("Getting about", N("follow:Jadrolinija"), N("follow:Split Port Authority"))]},
}
POINTERS = {"provisioning:Pazar": "v13-pazar-marche-vert", "provisioning:Ribarnica": "v14-ribarnica-marche-aux-poiss",
            "bars:Zinfandel": "v17-zinfandel-food-wine-bar"}
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
             "bougie:Le Méridien Lav / Vestibul Palace": "hotels, not food or place: this guide does not judge rooms",
             "bougie:Brač / Hvar villas": "rewritten as the islands card under Autour (the villas dropped)",
             "dish:* (8 plates)": "rewritten as The Dish inside La liste",
             "drink:D16 Coffee": "told once: the coffee bar is its linger card",
             "music:Splitsko ljeto / events:Splitsko ljeto": "told once: one calendar card",
             "music:Mediterranean Film Festival / events:Mediterranean Film Festival": "told once: one calendar card (if a 2026 edition is found)",
             "events:* (6)": "rewritten as the calendar (and the hot board for this month); the Kotor procession dropped — another country's feast",
             "culture:Marjan / work:Marjan bench / secret-gems:Marjan south path": "told once: merged into the Marjan walk",
             "culture:Salona": "told once: merged into the Salona and Klis walk",
             "culture:Trogir / gastronomy:Trogir market": "told once: the Trogir card under Autour",
             "secret-gems:campanile": "told once: merged into the cathedral card",
             "work:Bajamonti terrace": "the venue is cut; the Prokurative is named on the Riva card",
             "street-food:Burek (Bobis)": "a chain bakery: on La liste and the hot board's bakery line, not a card",
             "street-food:Ćevapi at Kantun Paulina": "now a table venue (the street lane)",
             "street-food:Fritule": "on the hot board (their season opens late November)",
             "street-food:Bilan sandwich (Fife)": "told once: Fife is a table venue",
             "gastronomy:Pazar / Ribarnica": "now table venues; each keeps a pointer card in the larder",
             "gastronomy:Grgić Vina": "cap and distance: three hours south, the Dubrovnik guide's cellar",
             "gastronomy:Sel de Pag": "merged into the Paški sir and Pag salt card",
             "avoid:Prošek vs Prosecco": "told once: the name dispute lives on the Prošek drink card",
             "ethnic-restaurants / burger-kebab": "honest-empty sections in the old guide: no card (Kantun Paulina carries the grill)",
           },
           "_note": "A venue belongs to exactly one lane. No lane holds four. Cut venues leave data.js, both CSVs and every #venue- link."},
          open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump({**PLAN, "_pointers": POINTERS}, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
old = json.load(open(RV / "research/cards_old.json"))
miss = [c["from"] for p in PLAN.values() for gr in p["groups"] for c in gr["cards"] if c["from"] and c["from"] not in old]
assert not miss, miss
print("lanes", len(LANES), "lane venues", sum(len(l["ids"]) for l in LANES.values()), "cut", len(CUT), "cards", sum(len(gr["cards"]) for p in PLAN.values() for gr in p["groups"]))
