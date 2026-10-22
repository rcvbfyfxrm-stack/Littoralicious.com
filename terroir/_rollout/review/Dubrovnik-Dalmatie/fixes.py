"""The editor's reconciliations on the research packs (22 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Dubrovnik|Croatia|Dalmatia|Konavle|Pelješac|Ston|Cavtat|Lokrum|Mljet|Lopud|Trsteno)\b")
EDITS = [          # (old, new) exact replacements in card text fields
]
CARD_SET = {       # key -> {field: value} overrides
 # Konoba Atlantic Kitchen is cut (trading disputed on the 22 Oct re-check) and the Asia Shop could not be found: the Lapad card names neither
 "quartiers:Lapad": {"story": "Lapad is the peninsula of hotels and flats west of Gruž, and it is where the city goes to swim and stroll. The pedestrian Šetalište kralja Zvonimira runs down under its plane trees to the beach in Uvala Lapad, lined with cafés where grandparents and students share the benches. Behind it rises Petka, a pine and holm-oak forest park of about 192 metres, with paths up to views of the Elaphiti; Babin Kuk spreads its hotels at the far end. This is where Dubrovnik lives rather than visits, and the evening walk along the bay is its own reason to come."},
}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 22 Oct re-check
}
LANE_STORY_SET = {  # lane -> {field: value}
 # Konoba Atlantic Kitchen is cut (its trading disputed on the 22 Oct re-check): the lane is two tables
 "locals": {"story": "When the cruise crowds fill the Stradun, the city eats a few streets away, where the menus are not written in eight languages. Taj Mahal, on Nikole Gučetića inside the walls, is a Bosnian family house with a MICHELIN Bib Gourmand, meat from its own butcher and a plum baklava made by the owner's mother. Pizzeria Tabasco, on Hvarska above the Ploče gate, fires its pizzas in a wood oven and is listed open most of the year, with shorter winter hours. Neither is about the sea view; both are about price and appetite, and both are a short walk from the walls."},
 "street": {"story": "Dubrovnik's cheap food starts at the Gruž market on the harbour, where Time Out says fish from the Elafiti islands is best before seven and Friday and Saturday are the busiest days. Inside the walls, Buffet Škola on Antuninska fills house-baked bread with Drniš pršut and Konavle cheese, and made both Gault&Millau and Falstaff in 2026. Barba, on Boškovićeva, turns octopus, anchovies and shrimp into burgers and sandwiches eaten standing in the lane. The fish hall is cash only, and buying there means cooking on board or handing the bag to a galley. All three are quick, and none takes bookings."},
 "summit": {"story": "Dubrovnik's grand tables use the fortifications as their dining rooms, and most of them keep a summer calendar. Restaurant 360 is built into the casemates of the wall above the Old Port and is the city's only MICHELIN-starred table in 2026, with Gault&Millau giving Marijo Curić's kitchen 18/20. Stara Loža climbs through a fifteenth-century Prijeko townhouse to a small rooftop and is in the MICHELIN selection in 2026. Nautika, outside the Pile Gate, occupies the 1881 school of navigation, looks across at Lovrijenac, and scores 16.5/20 with Gault&Millau in 2026. Late in October the two seasonal houses are at or past the end of their season, so call before you book."},
}
HOT_SET = {        # hot/event card name -> {field: value}
 # told once: the calendar card owns the Winter Festival's pattern and its 2025 edition; the hot card keeps only this year's opening
 "The Dubrovnik Winter Festival": {"story": "The city's own Christmas season opens at the end of next month, and the question for a visit now is only the date. For 2026 one guide, Bookiscout, gives 28 November 2026 to 3 January 2027, spread across several Old Town locations rather than one square; the tourist board had not published the thirteenth edition when this was checked. Until it does, plan on the last weekend of November and confirm before you fly. The calendar under Pratique tells what the festival is."},
}
HOT_DROP = {"Good Food Festival: over for 2026"}   # told once: the calendar card has the 2026 dates and says it is past

CARD_DROP_FACTS = {"quartiers:Lapad": ["Eat"]}

def cards(C):
    for k, labs in CARD_DROP_FACTS.items():
        C[k]["facts"] = [f for f in C[k]["facts"] if f[0] not in labs]
    for k, c in C.items():
        for f in ("teaser", "story", "why", "name"):
            for a, b in EDITS:
                if c.get(f) and a in c[f]: c[f] = c[f].replace(a, b)
        for fa in c.get("facts") or []:
            for a, b in EDITS:
                if a in fa[1]: fa[1] = fa[1].replace(a, b)
        c.update(CARD_SET.get(k, {}))
    for k, c in C.items():   # every Maps query carries a local token (the gate's wrong-continent check)
        q = c.get("maps_query") or ""
        if q and not TOK.search(q): c["maps_query"] = q + ", Dubrovnik, Croatia"

def hot(H):
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Dubrovnik, Croatia"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
