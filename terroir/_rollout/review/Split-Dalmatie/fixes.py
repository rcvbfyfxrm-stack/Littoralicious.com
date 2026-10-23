"""The editor's reconciliations on the research packs (23 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Split|Croatia|Dalmatia|Solin|Klis|Trogir|Omiš|Brač|Bol|Hvar|Vis|Pag|Kaštela|Supetar)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # Paradox is listed permanently closed (venue pack 2, 23 Oct): no card sends anyone there
 ("or walk to Paradox or Zinfandel, where the list names every cellar", "or walk to Zinfandel, where the list names its cellars"),
 ("for wine by the glass, Parasol, Paradox or Zinfandel", "for wine by the glass, Parasol or Zinfandel"),
 ("Paradox and Zinfandel pour it by the glass", "Zinfandel pours it by the glass"),
 # Šug is on Tolstojeva and Bokeria beside the fish market (venue pack 1): neither is inside the walls
 # no kept table re-confirmed a peka on its 2026 menu (venue packs): the warning no longer promises one at a named house
 ("Order a peka a day or more ahead: lamb peka by booking at Šperun, octopus peka at Konoba Matejuška (book several days ahead), milk-lamb peka at Dvor.",
  "Order a peka a day or more ahead, from a konoba that confirms it will cook one for you (the Varoš konobas are the place to ask; none re-confirmed it on its 2026 menu)."),
 ("Bokeria Kitchen & Wine, Šug, Villa Spiza, Apetit", "Villa Spiza, Apetit; Bokeria just outside the west wall"),
]
CARD_SET = {       # key -> {field: value} overrides
}
CARD_DROP_FACTS = {}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 23 Oct re-check
 # the old record's 'Dinner' survived the pack; the pack's own hook says it opens from the morning
 "v05-bokeria-kitchen-wine": {"hours": "Call ahead: hours not re-checked; reviews describe it open from the morning to late"},
}
LANE_STORY_SET = {  # lanes re-cut after the packs: Krug (the star) joins the grand tables, Šug moves to the bistros, Paradox is closed
 "summit": {"title": "Terraces, a counter and the open sea", "where": "ZOI, Riva; Krug, Obala Ante Trumbića; Dvor, Firule",
  "story": "Split's grand tables split between the palace, the harbour and the sea. ZOI is built into the palace's south façade with a top-floor terrace over the Riva; Gault&Millau scores it 17/20 in 2026 and MICHELIN has recommended it since it opened in 2017. Krug, on the harbour front, is a counter of about twelve seats round an open kitchen, and in the 2025 guide it became the first table in the city to hold a MICHELIN star. Dvor, at Firule, a short walk east, faces the open channel from a garden terrace and scores 16/20. None publishes a winter schedule, and Dvor has historically closed for one: call before you promise any of them after October."},
 "bistro": {"title": "The wine list first", "where": "Zinfandel Food & Wine Bistro, Centre; Šug, Tolstojeva",
  "story": "Split's newer tables start from the glass. Zinfandel, on Marulićeva, takes its name from the Kaštela vines whose story is told above, pours about fifteen Croatian wines by the glass and is in the MICHELIN Guide Croatia 2026. Šug, a small stone room on Tolstojeva by the palace's north-east corner, cooks braised pot dishes and held a MICHELIN Bib Gourmand from 2022; Gault&Millau scores it 13.5/20 in 2026. Both are small and both publish hours that disagree with one another's listings, so book at night and call in winter."},
 "locals": {"title": "Where the city eats", "where": "Konoba Marjan, Veli Varoš; Kantun Paulina, Matošića",
  "story": "Split's everyday tables cook from the morning fish market and the charcoal, not from a tasting menu. Konoba Marjan, a few tables on Senjska at the foot of the hill, is run by a father, mother and son who change the menu daily with the market, so the cuttlefish brujet or black risotto can be gone by half past seven. Kantun Paulina, on Matošića near Marmontova, has grilled ćevapi for decades and serves them the Split way, in a soft lepinja with ajvar and raw onion, by small, medium or large, cash only. Neither publishes a winter schedule: call or look in."},
 "street": {"title": "Markets and the fishermen's buffet", "where": "Pazar, Silver Gate; Ribarnica, Marmontova; Buffet Fife, Matejuška",
  "story": "Split eats on its feet in the morning. The Pazar green market trades daily against the east wall of Diocletian's Palace by the Silver Gate, where family farms sell figs, greens, olive oil and Pag cheese from about six until early afternoon. A few minutes west, the Ribarnica off Marmontova sells the night's catch by weight, in cash, until about one. And at Matejuška, Buffet Fife has fed the waterfront for decades with pašticada and gnocchi, fish soup and fried squid at prices the locals still pay; it reportedly works all year. None of the three takes a booking."},
}
HOT_DROP = ["Advent in Split, expected from Sat 28 November"]   # told once: Advent lives on its calendar card (the audit found the two cards sharing 33 shingles)
HOT_SET = {}

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
        if q and not TOK.search(q): c["maps_query"] = q + ", Split, Croatia"

def hot(H):
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Split, Croatia"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
