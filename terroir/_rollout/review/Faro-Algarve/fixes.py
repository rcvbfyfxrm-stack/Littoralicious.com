"""The editor's reconciliations on the research packs (24 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Faro|Portugal|Algarve|Olhão|Tavira|Loulé|Estói|Albufeira|Porches|Lagoa|Silves|Monchique|Sagres|Culatra)\b")
EDITS = [          # (old, new) exact replacements in card text fields
]
CARD_SET = {       # key -> {field: value} overrides
}
CARD_DROP_FACTS = {}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 24 Oct re-check
}
LANE_STORY_SET = {}
HOT_DROP = []
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
        if q and not TOK.search(q): c["maps_query"] = q + ", Faro, Portugal"

def hot(H):
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Faro, Portugal"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
