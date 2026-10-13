"""The editor's reconciliations on the research packs (13 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Athens|Attica|Attiki|Athina)\b")

# Kerameikos: the pack has it closed from May 2025 to 15 Sept 2026 (one source) and also "three years of works": the
# length of the works is not established, so neither card claims a duration.
KERAMEIKOS = [("reopened in September 2026 after three years of works", "reopened in September 2026 after a long closure for works"),
              ("just reopened after three years of works", "reopened in September 2026 after a long closure"),
              ("after a three-year, four-million-euro overhaul", "after a four-million-euro overhaul")]

def cards(C):
    for c in C.values():
        for f in ("teaser", "story"):
            for a, b in KERAMEIKOS:
                if c.get(f) and a in c[f]: c[f] = c[f].replace(a, b)
    # every Maps query carries a local token (the gate's wrong-continent check)
    for k, c in C.items():
        q = c.get("maps_query") or ""
        if q and not TOK.search(q): c["maps_query"] = q + " Athens"

def hot(H):
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + " Athens"

def venues(V):
    pass
