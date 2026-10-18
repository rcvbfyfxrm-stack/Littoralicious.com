"""The editor's reconciliations on the research packs (18 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"(?i)cadaqu|\b(Spain|Girona|Catalunya|Catalonia)\b")
EDITS = [          # (old, new) exact replacements in card text fields
]
CARD_SET = {       # key -> {field: value} overrides
}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 18 Oct re-check
}
LANE_STORY_SET = {} # lane -> {field: value}
HOT_SET = {}       # hot/event card name -> {field: value}

def cards(C):
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
        if q and not TOK.search(q): c["maps_query"] = q + ", Girona, Spain"

def hot(H):
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Girona, Spain"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
