#!/usr/bin/env python3
"""Write picks.json and card_plan.json for Diani-Kwale GOLD6 (11 Oct 2026). The editorial cut lives here as data."""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research" / "cards_old.json"))
LANES = {
 "creme": ("The famous rooms", ["ali-barbours-cave", "sails-almanara", "nomad-beach-bar"],
           {"ali-barbours-cave": "dinner in the coral cave: the one room on this coast nobody can copy",
            "sails-almanara": "the canvas room on the sand at Galu, fed by the reef",
            "nomad-beach-bar": "the strip's most complete kitchen, and the last-minute table that holds"}),
 "rising": ("The new wave", ["shashin-ka", "asha-bistro"],
           {"shashin-ka": "a Japanese family's sushi house on the beach road",
            "asha-bistro": "the palm-shaded beachfront bistro; Friday's BBQ"}),
 "houses": ("The house tables", ["kinondo-kwetu", "the-maji", "chale-island"],
           {"kinondo-kwetu": "a family beach house beside the sacred forest; the grand night",
            "the-maji": "the adults-only house with no meal times",
            "chale-island": "the private island beside a kaya grove"}),
 "landings": ("Where the boats land", ["mwaepe-landing", "shimoni-landing", "diani-modern-market"],
           {"mwaepe-landing": "the landing you can walk to at dawn",
            "shimoni-landing": "the channel fish, and Kenya's first fish port beside it",
            "diani-modern-market": "the new covered market (May 2026) that replaced the old Ukunda one"}),
 "swahili": ("The Swahili kitchens", ["moiz-swahili", "karafuu", "swahili-pot"],
           {"moiz-swahili": "the workers' biryani on Hospital Road",
            "karafuu": "Ukunda's nyama choma and pweza soup",
            "swahili-pot": "the makuti canteen at resident prices"}),
 "italian": ("The Italian residency", ["leonardos", "aniellos"],
           {"leonardos": "the anchor of the Italian residency; the last-minute table",
            "aniellos": "the neighbourhood Italian a few doors along (unverified: call)"}),
 "breakfast": ("The breakfast tables", ["kokkos", "pallet-cafe-diani", "diani-bakehouse"],
           {"kokkos": "the strip's café since 2000",
            "pallet-cafe-diani": "the deaf-staffed café on Galu sand; moved in from the cut fast-food lane",
            "diani-bakehouse": "German breads, the trace of the families who built the first hotels"}),
 "grills": ("The fire", ["mwaepe-fishermen", "colobus-shade", "ukunda-junction-vendors"],
           {"mwaepe-fishermen": "the fishing community's own table",
            "colobus-shade": "charcoal at the landing",
            "ukunda-junction-vendors": "the evening grills at the matatu junction"}),
 "chefs-eat": ("Where the residents eat", ["tiki-bar", "havana-diani", "funky-monkey"],
           {"tiki-bar": "the Belgian bistro; the last-minute table",
            "havana-diani": "fed and watered until 01:00 every day",
            "funky-monkey": "the bar team ranked in Africa's lists; moved in from the cut fast-food lane"}),
 "beach-rooms": ("The beach rooms", ["the-41-beach-club", "salty-squid"],
           {"the-41-beach-club": "the bar round a baobab, the Forty Thieves lineage",
            "salty-squid": "the kite crowd's table at sunset"}),
 "story": ("The old houses", ["charlie-claws", "twiga-lodge"],
           {"charlie-claws": "crab off the dugouts on Wasini since 1978",
            "twiga-lodge": "Tiwi's everyday address (mixed signals: called out)"}),
 "street": ("The street", ["madafu-vendors", "mahamri-stalls", "mangwe-dens"],
           {"madafu-vendors": "the coast's original soft drink",
            "mahamri-stalls": "the Swahili breakfast at dawn",
            "mangwe-dens": "palm wine, introduced"}),
}
KEEP_PINS = ["skippers-coliving", "pilli-pipa", "h2o-extreme", "kite254", "diving-the-crab", "ocean-tribe", "skydive-swahili",
             "diani-fishing-club", "whale-shark-adventures", "coral-spirit", "kaaribu-tour", "kaya-kinondo", "colobus-conservation",
             "kisite-mpunguti", "shimoni-caves", "wasini-boardwalk", "shimba-hills", "mikoko-pamoja", "diani-turtle-watch",
             "diani-art-club", "carrefour-diani", "chandarana-diani", "naivas-ukunda", "kentaste", "akamba-handicraft",
             "biashara-street", "shakatak", "manyatta-club"]
CUT = {
 "waterlovers-tides": "fourth in the famous rooms; a resident-first dining room by its own account, not a destination",
 "non-solo-gelato": "a gelato chain three months open; authentic over new, and the new-wave lane keeps two",
 "msambweni-beach-house": "fourth house table; guests-only in practice and 45+ minutes south",
 "ibiza-market": "fourth landing/market; the new covered market (May 2026) is where Ukunda's trade is moving, and the town walk covers the old cluster",
 "coast-dishes": "fourth Swahili kitchen and unverified as trading; three confirmed kitchens carry the lane",
 "java-house-diani": "a Nairobi chain; the breakfast lane keeps the three that only exist here",
 "soul-breeze-beach-club": "unverified and brand-confused (the resort dropped the Bidi Badu name); two beach rooms are enough",
 "shan-e-punjab": "unverified as trading, with uneven-service reports",
 "tandoori-club": "fourth club; nothing verifiable beyond 2024 press",
 "full-moon-club": "fourth club; every detail aggregator-grade",
 "go-jump-kenya": "no card points to it; one skydive operator is enough",
 "gazi-boardwalk": "no card points to it; condition unverified since 2020",
 "chale-boardwalk": "no card points to it; no published hours or contact three months after opening",
 "camel-rides": "no card points to it; an unregulated beach trade, not a place",
}
SHORT = {"Last minute — save the night": ["nomad-beach-bar", "leonardos", "tiki-bar"],
         "Plan ahead — this week": ["sails-almanara", "salty-squid", "shashin-ka"],
         "Plan ahead — the grand night": ["ali-barbours-cave", "kinondo-kwetu", "the-maji"]}
picks = {"_doc": "GOLD6 picks for Diani-Kwale, 11 Oct 2026. Lanes hold <=3; no 4s were needed. Criteria in order: can't-miss for the south coast · authentic over touristic · teaches something · confirmed over unverified. Fewer places is the point. Cut venues leave data.js, both CSVs and every #venue- link. Berths and the guest list rebuilt from venues kept.",
         "lanes": {k: {"label": l, "ids": ids, "why": w} for k, (l, ids, w) in LANES.items()},
         "lanes_dropped": {"fast-food": "a two-venue lane of a café and a cocktail bar, both miscast as 'fast': Pallet Cafe moves to breakfast, Funky Monkey to where the residents eat; the late plate lives in Sur le pouce"},
         "berths": ["ali-barbours-cave", "nomad-beach-bar", "sails-almanara"], "shortlist": SHORT, "keep_pins": KEEP_PINS, "cut": CUT}

def C(key, *frm, note=""): 
    for f in frm: assert f in OLD, f
    return {"key": key, "from": list(frm), "note": note}
def G(title, *cards, desc=""): 
    assert len(cards) <= 3, title
    return {"title": title, "desc": desc, "cards": list(cards)}
Q = lambda n: f"quartiers|{n}"
plan = {"_doc": "GOLD6 card plan for Diani-Kwale (11 Oct 2026). Each fold -> groups (<=3 cards) -> cards. 'from' lists the OLD card keys (section|name, research/cards_old.json) the new card is built from; several keys = a merge (told once). 'note' = the angle. Old cards not listed are CUT (see picks.json cards_cut).",
 "quartiers": {"chapter": "place", "sub": "towns", "groups": [
   G("The strip", C("q-north", Q("Diani North — the river end")), C("q-central", Q("Diani Central")),
     C("q-galu", Q("Galu"), Q("Diani South & the forest patches"), note="Galu + the southern strip; the forest patches are told in the green section: one clause")),
   G("Behind the sand", C("q-ukunda", Q("Ukunda town")), C("q-tiwi", Q("Tiwi"), "around|Tiwi, over the river", note="one home for Tiwi"),
     C("q-likoni", Q("Likoni & Dongo Kundu — the arrival"), note="the arrival: ferry vs the bypass; the Mteza bridge fact lives in landmarks, one clause here")),
   G("South, into Digo country", C("q-kinondo", Q("Kinondo"), Q("Chale point & island"), note="Chale Island resort has its own venue card and a dhow card: one clause"),
     C("q-gazi-msambweni", Q("Gazi"), Q("Msambweni")),
     C("q-shimoni-wasini", Q("Shimoni & Wasini"), Q("Wasini Island"), note="the place; the boat day lives in the dhow fold"))]},
 "walks": {"chapter": "flaner", "sub": "walks", "groups": [
   G("The sand & the seabed", C("w-sunrise", "walks|Sunrise on the strip"),
     C("w-river-mouth", "walks|Kongo Mosque & the river mouth", note="the walk; the mosque's story lives in culture (one clause)"),
     C("w-reef-flat", "walks|The reef-flat walk", "reef|The reef-flat walk", "walks|Chale point flats at spring low", note="one home for the reef-flat walk; Chale flats as the spring-low variant")),
   G("The town & the villages", C("w-ukunda", "walks|Ukunda market & town walk", note="do not name Ibiza Market as a pick (cut); the new covered market has its own card"),
     C("w-gazi", "walks|Gazi Bay mangrove edge", note="the walk; Mikoko Pamoja's carbon story lives in the green section"),
     C("w-shimoni", "walks|Shimoni history walk"))]},
 "dhow": {"chapter": "flaner", "sub": "dhow", "groups": [
   G("The crossing", C("d-pilli-pipa", "dhow|Pilli Pipa Dhow Safari"), C("d-charlie", "dhow|Charlie Claw's dhows", note="the boat day; the crab lunch is in the venue card"),
     C("d-diy", "dhow|Shimoni jetty, DIY")),
   G("The park & the island hour", C("d-kisite", "dhow|Kisite-Mpunguti Marine Park"),
     C("d-wasini-walk", "dhow|Wasini women's coral boardwalk", "walks|Wasini island paths")),
   G("The quieter waters", C("d-robinson", "dhow|Robinson Island sandbank"), C("d-chale", "dhow|Chale Island"),
     C("d-kongo-dugout", "reef|The Kongo River dugout"))]},
 "kaya": {"chapter": "flaner", "sub": "forest", "groups": [
   G("The kaya", C("k-kinondo", "kaya|Kaya Kinondo"), C("k-system", "kaya|The kaya system, honestly")),
   G("The colobus & the turtles", C("k-colobus", "kaya|Colobus Conservation", "landmarks|The colobridges", note="one home for the colobridges"),
     C("k-jadini", "kaya|The Jadini forest patches"), C("k-turtle", "kaya|Diani Turtle Watch")),
   G("The mangroves", C("k-mikoko", "kaya|Mikoko Pamoja, Gazi Bay", "around|Gazi & the mangrove science", note="one home for the mangrove carbon story"))]},
 "reef": {"chapter": "flaner", "sub": "sea", "groups": [
   G("The wind — kaskazi & kusi", C("r-h2o", "reef|H2O Extreme"), C("r-kite254", "reef|Kite254", note="the wind and the radio helmets; the course-and-what's-missing angle is in craft")),
   G("Under — the reef & the wreck", C("r-crab", "reef|Diving the Crab", note="the sites and the wreck; the course angle is in craft"), C("r-ocean-tribe", "reef|Ocean Tribe Scuba")),
   G("Above & beyond", C("r-skydive", "reef|Skydive Swahili"), C("r-fishing", "reef|Diani Fishing Club"), C("r-whales", "reef|Whale Shark Adventures"))]},
 "sea-stories": {"chapter": "flaner", "sub": "stories", "groups": [
   G("The boats", C("s-no-nails", "sea-stories|The ship with no nails", "sea-stories|How the jahazi killed the mtepe"),
     C("s-ngalawa", "sea-stories|The ngalawa's outriggers"), C("s-wearing", "sea-stories|Wearing round")),
   G("The navigators", C("s-pilot", "sea-stories|The Pilot of Malindi", "sea-stories|Stars to find the coast, marks to live through it"),
     C("s-round-trip", "sea-stories|One round trip a year"), C("s-1331", "sea-stories|One night in Mombasa, 1331")),
   G("The hard water", C("s-galleot", "sea-stories|One galleot against a coast"),
     C("s-siege", "sea-stories|Thirty-three months", "sea-stories|The Santo António de Tanná"), C("s-chasers", "sea-stories|The dhow chasers")),
   G("The sea that still works", C("s-bamvua", "sea-stories|Bamvua and msindizo"),
     C("s-kuchukua", "sea-stories|Kuchukua — the women's fishery", "sea-stories|Munje's octopus gamble"),
     C("s-said-no", "sea-stories|The landings that said no"))]},
 "culture": {"chapter": "flaner", "sub": "culture", "groups": [
   G("The living monuments", C("c-kongo", "culture|Kongo Mosque", "landmarks|Kongo Mosque", note="one home for the mosque"),
     C("c-shimoni-caves", "culture|The Shimoni caves & the shrine", "dhow|Shimoni slave caves", note="one home for the caves: the visit and the shrine"),
     C("c-pillar-tomb", "landmarks|The Wasini pillar tomb"))]},
 "landmarks": {"chapter": "flaner", "sub": "sights", "groups": [
   G("Along the strip", C("l-baobab", "landmarks|The Galu baobab"), C("l-airstrip", "landmarks|Ukunda airstrip"), C("l-two-fishes", "landmarks|The Two Fishes ruin")),
   G("At the edge", C("l-mteza", "landmarks|The Mteza bridge"))]},
 "craft": {"chapter": "flaner", "sub": "craft", "groups": [
   G("Do this one", C("x-crab-course", "craft|★ Diving the Crab", note="the course: open enrolment, named instructors; the sites are in the sea fold")),
   G("The others, and what each is missing", C("x-kite254", "craft|Kite254", "craft|H2O Extreme", note="the kite course; missing line"),
     C("x-akamba", "craft|Akamba Handicraft Co-operative", "art|Akamba Handicraft Co-operative", note="one home for Akamba: the carving, buying at source, what is missing"),
     C("x-art-club", "craft|Diani Art Club", "art|Diani Art Club", note="one home for the Art Club")),
   G("The honest warning", C("x-kaaribu", "craft|The Kaaribu street-food walk"), C("x-not-craft", "craft|What is sold as craft and is not"))]},
 "art": {"chapter": "flaner", "sub": "craft", "groups": [
   G("The cloth — buy at source", C("a-biashara", "art|Biashara Street, Mombasa")),
   G("The industrial terroir", C("a-kentaste", "art|Kentaste, Ukunda"), C("a-bixa", "art|Kenya Bixa, Tiwi"))]},
 "coffee-gardens": {"chapter": "flaner", "sub": "linger", "groups": [
   G("The cafés", C("g-kokkos", "coffee-gardens|Kokkos Cafe Bistro", note="pointer to the Kokkos venue card: linger angle"),
     C("g-bakehouse", "coffee-gardens|Diani Bakehouse", note="pointer: linger angle")),
   G("Where the laptop actually works", C("g-skippers", "coffee-gardens|Skippers Coliving"), C("g-pallet", "coffee-gardens|Pallet Cafe, Galu", note="pointer: work angle"),
     C("g-asha", "coffee-gardens|Asha Boutique Bistro", note="pointer: work angle"))]},
 "bars": {"chapter": "sortir", "sub": "bars", "groups": [
   G("The sundowner circuit", C("b-41", "bars|The 41 Beach Club"), C("b-sails", "bars|Sails at Almanara"), C("b-salty", "bars|Salty Squid at kite-o'clock")),
   G("After dark — the clubs, with asterisks", C("b-funky", "bars|Funky Monkey"), C("b-manyatta", "bars|Manyatta", "bars|Full Moon", "bars|Tandoori International", note="cut clubs: Full Moon, Tandoori — name them only as 'others listed in 2024, nothing verifiable'"),
     C("b-shakatak", "bars|Shakatak")),
   G("The mangwe — mnazi, introduced", C("b-mangwe", "bars|The palm-wine dens"))]},
 "around": {"chapter": "around", "sub": "trips", "groups": [
   G("Inland & south", C("o-shimba", "around|Shimba Hills", "kaya|Shimba Hills & Sheldrick Falls", "landmarks|Sheldrick Falls", note="one home for Shimba and the falls"),
     C("o-funzi", "around|Funzi & the Ramisi estuary", "dhow|Funzi Island day", note="one home for Funzi")),
   G("North — half a day in Mombasa", C("o-mombasa", "around|The Biashara Street & Akamba run", note="the route and timing; the street and the co-op have their own cards: point, do not retell"))]},
 "provisioning": {"chapter": "tables", "sub": "markets", "groups": [
   G("The fish — two landings and the names", C("p-mwaepe", "provisioning|Mwaepe landing (BMU)", note="pointer-ish: the buying angle; the venue card holds the place"),
     C("p-shimoni", "provisioning|Shimoni landing & the new port"), C("p-names", "provisioning|Changu, pweza, tafi — the name ladder")),
   G("The market & the coconut", C("p-market", "provisioning|Diani Modern Market, Mvindeni", note="Ibiza Market is cut: say trade is moving here, do not recommend Ibiza"),
     C("p-coconut", "provisioning|Madafu · mnazi · mbata · makuti")),
   G("The cold chain — three supermarkets, three jobs", C("p-carrefour", "provisioning|Carrefour, Centre Point"), C("p-chandarana", "provisioning|Chandarana Foodplus"), C("p-naivas", "provisioning|Naivas, The Gate Mall"))]},
 "street-food": {"chapter": "fast", "sub": "late", "groups": [
   G("The gap, and how to plan around it", C("f-early", "street-food|Kitchens close earlier than you think"),
     C("f-midnight", "street-food|Nothing moves before midnight", note="name only the kept clubs: Shakatak, Manyatta")),
   G("What is actually still cooking", C("f-junction", "street-food|The Ukunda junction, just after sunset"), C("f-havana", "street-food|Havana's late kitchen"), C("f-funky", "street-food|Funky Monkey, to midnight"))]},
}
used = {f for k, v in plan.items() if not k.startswith("_") for g in v["groups"] for c in g["cards"] for f in c["from"]}
dropped = sorted(k for k in OLD if k not in used and not k.startswith("hot-foot|"))
picks["cards_cut"] = {"_": "old cards not carried (merges are listed per card in card_plan.json 'from')", "dropped": {
 "sea-stories|Nineteen up, nineteen back": "fourth story in its group; the monsoon-safety point is in the seasonal block",
 "sea-stories|The pilot boards at the reef mouth": "fourth story in its group; Kilindini is Mombasa's, not this coast's",
 "bars|Havana": "told once: Havana is the late plate in Sur le pouce and has a venue card",
 "bars|Kinondo Kwetu, by arrangement": "told once: the venue card and the guest list carry it",
 "around|Shimoni, Wasini & Kisite": "told once: the dhow fold is the home of the Shimoni day",
 "culture|The verified events": "moved to the calendar (Pratique), dated",
 "coffee-gardens|Non Solo Gelato": "venue cut", "coffee-gardens|Java House, Centre Point": "venue cut",
 "provisioning|Ibiza Market cluster": "venue cut", "craft|Kaya Kinondo": "told once: the green section", 
 "the old hot board": "replaced, dated 11 Oct 2026"}}
for d in dropped: assert d in picks["cards_cut"]["dropped"], d
json.dump(picks, open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump(plan, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
n = sum(len(g["cards"]) for k, v in plan.items() if not k.startswith("_") for g in v["groups"])
print("cards planned:", n, "dropped:", len(dropped))
