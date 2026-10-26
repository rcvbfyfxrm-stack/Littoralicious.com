"""The editor's reconciliations on the research packs (26 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Lons|Lons-le-Saunier|Jura|France|Arbois|Pupillin|Port-Lesney|Poligny|Salins|Dole|Château-Chalon|Montigny|Baume|Besançon|Arc-et-Senans|Doubs|Bresse)\b")
EDITS = []          # (old, new) exact replacements in card text fields
CARD_SET = {}       # key -> {field: value} overrides
CARD_DROP_FACTS = {}
VENUE_SET = {}      # id -> {field: value} overrides, each one a correction from the 26 Oct re-check
LANE_STORY_SET = {}
HOT_DROP = []
EV_DROP = []
HOT_SET = {}
VENUE_HOT = None    # None = keep the pack's venue_hot lines

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
        if q and not TOK.search(q): c["maps_query"] = q + ", Lons-le-Saunier, Jura, France"

def hot(H):
    if VENUE_HOT is not None: H["venue_hot"] = VENUE_HOT
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["events"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in EV_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            for f in ("teaser", "story", "why", "name"):
                for a, b in EDITS:
                    if it.get(f) and a in it[f]: it[f] = it[f].replace(a, b)
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Lons-le-Saunier, Jura, France"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
