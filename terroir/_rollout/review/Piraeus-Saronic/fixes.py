"""The editor's reconciliations on the research packs (14 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Piraeus|Peiraias|Keratsini|Drapetsona|Nikaia|Kokkinia|Perama|Faliro|Attica|Aegina|Salamina|Salamis|Hydra)\b")

# Polyvios is cut (the January 2026 arrest reports, see picks.json); Plastiras's late hours are not supported by the re-check.
EDITS = [("Polyvios on Agiou Dimitriou; Taverna tou Katsogiannou; after midnight, Kantina o Plastiras on the Lipasmata quay (all in the tables)",
          "Taverna tou Katsogiannou at lunch or dinner, and Kantina o Plastiras on the Lipasmata quay for a skewer (both in the tables; ring the canteen first)")]

def cards(C):
    for c in C.values():
        for f in ("teaser", "story", "why"):
            for a, b in EDITS:
                if c.get(f) and a in c[f]: c[f] = c[f].replace(a, b)
        for fa in c.get("facts") or []:
            for a, b in EDITS:
                if a in fa[1]: fa[1] = fa[1].replace(a, b)
    # every Maps query carries a local token (the gate's wrong-continent check)
    for k, c in C.items():
        q = c.get("maps_query") or ""
        if q and not TOK.search(q): c["maps_query"] = q + " Piraeus"

def hot(H):
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + " Piraeus"

def venues(V):
    pass
