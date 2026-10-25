"""The editor's reconciliations on the research packs (25 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Beaune|France|Bourgogne|Burgundy|Dijon|Pommard|Volnay|Meursault|Pernand|Savigny|Aloxe|Vougeot|Cîteaux|Époisses|Nuits|Santenay|Vignoles)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # the tourist office spells the park and its spring 'Bouzaize' (rewrite pack 2): one spelling across the guide
 ("Bouzaise", "Bouzaize"),
 ("Beaune's International Baroque and Romantic Opera Festival", "Beaune's international baroque opera festival"),
]
CARD_SET = {       # key -> {field: value} overrides
 "walks:The Parc de la Bouzaise loop": {"name": "The Parc de la Bouzaize loop"},
 "follow:Festival d'Opéra Baroque": {"name": "Festival d'Opéra Baroque de Beaune"},
 "culture:The Last Judgment": {"site": ""},   # told once: the museum's site link lives on the Hôtel-Dieu card (same building)
}
CARD_DROP_FACTS = {}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 25 Oct re-check
}
LANE_STORY_SET = {}
# told once: Art in Situ lives on the hot board (it runs to December 2026); Rootstock 2026 is unsupported (one listing says cancelled,
# none planned): dropped rather than printed as a date
HOT_DROP = []
EV_DROP = ["Art in Situ on the Route des Grands Crus", "Rootstock at Château de Pommard"]
HOT_SET = {   # told once (audit): the Baroque festival's card owns the 'not announced' sentence
 "Festival de Bach à Bacchus, Meursault": {"story": "The pianist Yves Henry founded the festival in 1986, and it has kept its idea: a concert in Meursault's Saint-Nicolas church or the old Léproserie, then the wine. The 40th edition ran from Saturday 4 to Sunday 12 July 2026. Henry's anniversary carte blanche, with Orchestre de Paris players, was on Tuesday 7 July, and a tasting of archives and wines on Saturday 11 July. Listings give tickets from EUR 18 to EUR 33, or up to EUR 75. No 2027 programme had been published by late October 2026."},
}
# the pack's venue_hot lines quoted the May record (07:00-13:00 market, a 33 € menu, Ma Cuisine's dinner hours) where the 25 Oct venue
# packs found otherwise: rewritten to what the packs support; Ma Cuisine dropped (MICHELIN shows it temporarily closed)
VENUE_HOT = {
 "v15-march-des-halles-saturday": "Époisses, Cîteaux, jambon persillé and the autumn mushrooms, 08:00 to 12:00 by the tourist office; whether Saturday 14 November, the auction weekend, trades as usual is not confirmed.",
 "v-charcuterie-raillard": "A thick slice of jambon persillé from rue Monge for a cold-morning picnic between cellars; call for the hours, the only ones found are from 2018.",
 "v07-le-bistrot-bourguignon": "Œufs en meurette, then the bœuf bourguignon, for the first cold nights; open Tuesday to Saturday, so not on Sunday 15 or Monday 16 November.",
 "v11-enstase": "Bao and small plates on its kitchen evenings, late in the week; listings disagree on which nights, so call before you plan the Friday of the auction weekend round it.",
 "v01-le-carmin": "The three-course market lunch at 50 €, an autumn menu that changes with the market; lunch Wednesday to Saturday, dinner Tuesday to Saturday.",
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
        if q and not TOK.search(q): c["maps_query"] = q + ", Beaune, France"

def hot(H):
    H["venue_hot"] = VENUE_HOT
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["events"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in EV_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            for f in ("teaser", "story", "why", "name"):
                for a, b in EDITS:
                    if it.get(f) and a in it[f]: it[f] = it[f].replace(a, b)
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Beaune, France"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
