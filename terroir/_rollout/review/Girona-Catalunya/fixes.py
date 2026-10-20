"""The editor's reconciliations on the research packs (20 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"(?i)\b(Spain|Girona|Catalunya|Catalonia)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # told once: the 'season of dragons' curiosity owns the Game of Thrones filming; the cathedral card keeps its steps
 ("Outside, 90 Baroque steps laid in 1607 climb from the square; in September 2015 a Game of Thrones crew filmed Jaime Lannister riding his horse up them to the Great Sept of Baelor.",
  "Outside, 90 Baroque steps laid in 1607 climb from the square; the television story they starred in is under the curiosities."),
 # the vermouth the old guide named (Gerisena's Obreboques) could not be found on 20 Oct: the name leaves the card rather than stand unconfirmed
 ("The old guide names Celler Gerisena at Garriguella, which works with the native Garnatxa roja, and a two-year oak-aged bottling called Obreboques; Gerisena's Garnatxa roja wines are well documented, but we could not reconfirm the vermouth in October 2026. ",
  "Ask before you assume: an Empordà vermouth is a small-cellar rarity, and we could not confirm a named one in October 2026. "),
]
CARD_SET = {       # key -> {field: value} overrides
}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 20 Oct re-check
}
LANE_STORY_SET = {}
HOT_SET = {}
HOT_DROP = []
VENUE_DROP = {}

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
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Girona, Spain"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)
    for i, d in VENUE_DROP.items(): V[i]["drop"] = sorted(set(V[i].get("drop", []) + d))

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
