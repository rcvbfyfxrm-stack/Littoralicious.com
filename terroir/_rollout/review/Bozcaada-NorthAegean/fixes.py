"""The editor's reconciliations on the research packs (27 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Bozcaada|Çanakkale|Canakkale|Türkiye|Turkey|Geyikli|Ezine|Tevfikiye|Behramkale|Assos|Gökçeada|Ayvacık|Troy|Truva)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # the weekly market: Wednesday in most sources, Friday in one, and Katie Parla reports it has moved (venue pack 2): never placed in a square
 ("Wednesday, in the castle square according to the venue record; a 2026 site and whether it runs in November are not confirmed",
  "Wednesday in most sources (one says Friday); older guides put it in the castle square, but it has moved and the new site is not confirmed, nor whether it runs in winter: ask in town"),
 ("The Wednesday Market in the castle square; Nevreste", "The weekly market (ask where it stands now); Nevreste"),
 ("The Wednesday market in the castle square is a market for islanders", "The weekly market is a market for islanders"),
 ("The Wednesday market is the islanders' own; bring cash", "The weekly market is the islanders' own; bring cash"),
 # Talay's shop is at Lale Sok. 5 (venue pack 2, Frommer's), not Çınar Çeşme Sok.
 ("Çınar Çeşme Sok., Alaybey, Bozcaada town", "The shop on Lale Sokak, Bozcaada town"),
 ("Çiçek Pastanesi for the mastic-almond biscuits; Talay's town shop on Çınar Çeşme Sokağı for a glass of island wine",
  "Talay's town shop on Lale Sokak for a glass of island wine; Çiçek Pastanesi, a few lanes north in the Rum quarter, for the mastic-almond biscuits"),
 # the 'smells of almond biscuits' line placed Çiçek in the mahalle; venue pack 2 puts the pastane in the Rum quarter
 ("Nearby, Çınar Çeşme Sokağı, the plane-tree fountain street, smells of almond biscuits and strong tea.",
  "Nearby runs Çınar Çeşme Sokağı, the street named for its plane tree and fountain, with tea glasses on the café tables."),
 ("pours at a tasting counter on Çınar Çeşme Sokağı in town", "pours at a tasting counter in its shop on Lale Sokak in town"),
 # the founder's name is Reşit Soley (hot pack, Corvus sources); one pack spelt it Söley
 ("Söley", "Soley"),
 # the wind farm's date was not verified (card pack 1, _needs_network)
 ("The ridge behind it carries the wind farm, built from around 2000 and now one of the island's landmarks too.", "The ridge behind it carries the wind farm that now makes the island's power."),
 # Tuzburnu is on the east side (card pack 2), not under the Polente light
 (" Tuzburnu cove lies just below.", ""),
 # Ataol could not be verified in 2026 (card pack 3): not named as a cellar door
 ("the cellar doors of Corvus, Talay, Çamlıbağ and Ataol", "the cellar doors of Corvus, Talay and Çamlıbağ"),
]
CARD_SET = {       # key -> {field: value} overrides
 # the harbour card placed the market in Kale Meydanı on Wednesdays: it has moved (venue pack 2)
 "quartiers:The harbour and the castle square": {
   "teaser": "Where the ferry ties up under the castle walls, and the town opens out from the quay",
   "story": "The car ferry from Geyikli's Yükyeri quay crosses the strait and docks beneath the castle, and the town opens out from the quay: fishing boats tied up along the harbour wall, tea glasses on the café tables, the wind coming off the water. Behind the quay is Kale Meydanı, the castle square, where older guides put the weekly producers' market; it has since moved, so ask in town where the stalls stand now. After dark the castle is floodlit and the masts in the harbour stand out against it. In winter, when most of the registered population has left the island, you share the quay with a few fishermen.",
   "why": "Step off the boat at dusk once: the floodlit walls over the masts are the island's picture of itself.",
   "facts": [["Go for", "The ferry quay, the fishing boats and the castle square"], ["Best hour", "After dark, for the floodlit walls over the harbour"],
             ["Don't miss", "The view of the walls and the masts together from the end of the quay"],
             ["Eat", "Nevreste and Sandal, a few lanes back from the harbour on Alsancak Sokak, if open (book in summer)"]]},
 # the harvest festival ran 14-23 August in 2026 (hot pack: Çanakkale Kalem), not 'four days in September'
 "craft:Do this one": {
   "story": "We searched for a hands-on class proper to Bozcaada with a named maker you can sign up with: ceramics, weaving, jam, cooking, boatbuilding. None turned up. The nearest thing is the harvest itself. During the grape-harvest festival, held from 14 to 23 August in 2026, visitors go out to the vineyards to cut bunches by hand, the Çavuş and Karalahna pruned low against the wind, and the grapes come back to town with music. It is real work in a real crop, open to anyone who turns up, but it is an event, not an apprenticeship: no named master teaches you, and it happens once a year.",
   "facts": [["What you do", "Pick grapes by hand in a working vineyard and follow the harvest back into town"],
             ["Time", "A morning in the vines during the harvest festival (14–23 Aug in 2026; 2027 dates not yet announced, Oct 2026)"],
             ["Cost", "Not found; no fee is reported for joining the picking"],
             ["Book", "No booking found: watch the municipality's programme, or ask Talay or Çamlıbağ whether you can join their own harvest"]]},
 # Çamlıbağ: the hot pack found the house's own history and a Bilkent study for 1925 (card pack 3 had found none): the date is the
 # history fold's, the card points to it and keeps 'by its own account'
 "bars:Çamlıbağ": {
   "teaser": "The house whose own history begins in 1925, with a workshop bought from a Greek winemaker",
   "story": "By its own account, and a Bilkent University study of the family, Çamlıbağ began in 1925, when the Yunatçılar family bought a Greek winemaker's workshop as the island's Greek growers were leaving; the history fold tells that story. Wine writers note that it and Talay are related families. What you visit today is a working shop in town, shelves of native-grape bottles and staff who know them, not a show cellar: the place to buy Vasilaki and Karalahna by the case for the boat.",
   "why": "Buy here for the boat: the island's grapes from one of its oldest houses, at shop prices."},
}
CARD_DROP_FACTS = {}
VENUE_SET = {}      # id -> {field: value} overrides
LANE_STORY_SET = {
 # Kahverengi left the guide (no Bozcaada branch found); the market's square is not confirmed since it moved
 "street": {"title": "Jam, cookies and the market",
            "story": "The island's street food is mostly sweet and mostly sold from jars and counters. On market day, Wednesday in most sources, growers sell tomatoes, fruit and cheese, with tomato jam, fig jam and garlic confit in jars; the market has moved from the square older guides give, so ask in town where it stands. Çiçek Pastanesi bakes in a stone oven over wood and sells the mastic-almond cookie of the Rum kitchen, also made on Gökçeada and in Kavala, with mastic and wild-fig ice cream from the counter next door. In winter, check both: the pastane's island branch may open only in summer.",
            "where": "The weekly market, in town; Çiçek Pastanesi, Rum quarter"},
 # 'best at lunch' had no source
 "home": {"story": "Away from the fish grills, Bozcaada eats from pots: dumplings, olive-oil vegetables, leaves rolled round rice, the food of the Turkish and Rum households that shaped the town. Dört Hanımeli was opened more than forty years ago by retired primary-school teachers, and reviewers still come for its mantı, its vine-leaf sarma and stuffed courgette flowers. On Alsancak Sokak, Ada'm, about ten years old, shows what an island cook does with the same pantry, putting octopus with artichokes in a cream sauce and wrapping sea bass in vine leaves. Both are plain rooms where the plates are the point, and cheaper than the courtyard meze houses."},
}
HOT_DROP = []
EV_DROP = ["29 October, Republic Day"]   # told once: the hot board carries this year's Republic Day
HOT_SET = {"29 October, Republic Day": {}}   # placeholder; the hot board's copy is renamed in hot() below
VENUE_HOT = {       # the hot pack's lines, the market's corrected (it has moved; the square is not confirmed)
 "v08-talay": "The island's oldest family winery pours its own Vasilaki and Karalahna at the town counter; November hours not posted, so call first.",
 "v02-corvus": "Ask what the 2026 Çavuş, picked in August, is doing in tank; visiting days are limited, so check before you drive out.",
 "v07-wednesday-market": "The islanders' own weekly market, for those who stay the winter; ask in town where and whether it stands this week, and bring cash.",
}

def cards(C):
    for k, labs in CARD_DROP_FACTS.items():
        C[k]["facts"] = [f for f in C[k]["facts"] if f[0] not in labs]
    for k, c in C.items():
        for f in ("teaser", "story", "why", "name", "maps_query"):
            for a, b in EDITS:
                if c.get(f) and a in c[f]: c[f] = c[f].replace(a, b)
        for fa in c.get("facts") or []:
            for a, b in EDITS:
                if a in fa[1]: fa[1] = fa[1].replace(a, b)
        c.update(CARD_SET.get(k, {}))
    for k, c in C.items():   # every Maps query carries a local token (the gate's wrong-continent check)
        q = c.get("maps_query") or ""
        if q and not TOK.search(q): c["maps_query"] = q + ", Bozcaada, Çanakkale, Türkiye"

def hot(H):
    # the hot board and the calendar both carried '29 October, Republic Day': two cards one name (a card ref must be unique)
    for g in H["hot"]["groups"]:
        for it in g["items"]:
            if it["name"] == "29 October, Republic Day": it["name"] = "This Thursday: Republic Day"
    if VENUE_HOT is not None: H["venue_hot"] = VENUE_HOT
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["events"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in EV_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            for f in ("teaser", "story", "why", "name"):
                for a, b in EDITS:
                    if it.get(f) and a in it[f]: it[f] = it[f].replace(a, b)
            for fa in it.get("facts") or []:
                for a, b in EDITS:
                    if a in fa[1]: fa[1] = fa[1].replace(a, b)
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Bozcaada, Çanakkale, Türkiye"

def venues(V):
    for d in V.values():
        for k_, v_ in d["set"].items():
            if isinstance(v_, str): d["set"][k_] = v_.replace("Söley", "Soley")
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for d in L.values():
        for k_ in d:
            if isinstance(d[k_], str): d[k_] = d[k_].replace("Söley", "Soley")
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
