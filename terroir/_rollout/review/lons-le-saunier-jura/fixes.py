"""The editor's reconciliations on the research packs (26 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Lons|Lons-le-Saunier|Jura|France|Arbois|Pupillin|Port-Lesney|Poligny|Salins|Dole|Château-Chalon|Montigny|Baume|Besançon|Arc-et-Senans|Doubs|Bresse)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # Pasteur's house: Jura Tourisme's two pages disagree on the 2026 season's end (rewrite pack 1 read 30 Nov, the hot pack 1 Nov):
 # print the dispute, never pick
 ("Daily 14:00-18:00 until 30 November 2026, then closed for winter; the 2026 season opened on 7 February (Oct 2026)",
  "Daily 14:00-18:00; the 2026 season opened on 7 February, and Jura Tourisme’s listings disagree on whether it closes for the winter after 1 or 30 November: call before you go (Oct 2026)"),
 ("The Maison de Louis Pasteur in Arbois opens every afternoon, 14:00 to 18:00, until 1 November, then closes for the winter.",
  "The Maison de Louis Pasteur in Arbois opens every afternoon, 14:00 to 18:00, but its listings disagree on whether the winter close comes after 1 or 30 November: call."),
 ("The Pasteur house closes after 1 November; the Hérisson falls centre and Baume's caves closed on 30 September",
  "The Pasteur house may close after 1 November; the Hérisson falls centre and Baume's caves shut on 30 September"),
 ("the Pasteur house closes after 1 November,", "the Pasteur house may close for the winter after 1 November (listings disagree: call),"),
 # Ganevat: the inquiry is reported by the wine press citing Le Monde and the RVF; it concerns the 2023 purchase, not the grower
 ("In March 2023 it was bought by Benoît Pontenier and Jocelyn Brancard; Le Monde then reported a money-laundering inquiry and seized assets, with work allowed to go on.",
  "In March 2023 it changed hands again, and the wine press, citing Le Monde, later reported a judicial inquiry into that purchase and seized assets, with the vineyard work allowed to go on."),
]
CARD_SET = {}       # key -> {field: value} overrides
CARD_DROP_FACTS = {}
VENUE_SET = {}      # id -> {field: value} overrides, each one a correction from the 26 Oct re-check
LANE_STORY_SET = {}
HOT_DROP = []
EV_DROP = []
HOT_SET = {}
# the pack's venue_hot lines: Vagne and the Caveau left the guide; Pelen's line gave Mon-Sat where the venue pack found it open on
# Sunday mornings too (dropped rather than pick); the rest kept as written
VENUE_HOT = {
 "v12-march-de-lons-le-saunier": "Mont d'Or back on the cheese stalls, on sale since 10 September; four Thursday markets in November, 5 to 26.",
 "v08-la-finette-taverne-d-arbois": "Open every day by its record: fondue de Comté and poulet au Vin Jaune et morilles for a cold November evening.",
 "v02-le-bistron-me": "The Planches trout ballottine with morels in Vin Jaune sauce; from November closed Thursday evenings as well as Sunday and Monday.",
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
