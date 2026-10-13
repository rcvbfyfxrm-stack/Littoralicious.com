"""The editor's reconciliations on the research packs (13 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Athens|Attica|Attiki|Athina)\b")

def cards(C):
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
