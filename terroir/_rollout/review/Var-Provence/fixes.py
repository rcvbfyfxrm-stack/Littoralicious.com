"""The editor's reconciliations on the research packs (17 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Var|France|Provence)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 (", curated by Dieter Buchhart and Anna Karina Hofbauer,", ", chosen by Dieter Buchhart and Anna Karina Hofbauer,"),   # gate-banned word
]
CARD_SET = {       # key -> {field: value} overrides
 # told once: the essay's quintessence owns the rosé-and-tapenade apéro on the quay; the town card keeps the boats and Le Brusc
 "towns:Sanary-sur-Mer & Le Brusc": {"story": "Sanary still works for a living: the pointus, the painted wooden fishing boats of Provence, rock at their moorings along the quay, and the fishermen sell from them in the morning. Just west along the coast, Le Brusc is the fishing harbour of Six-Fours-les-Plages, not of Sanary. From its Quai Saint-Pierre a boat crosses in about ten to twelve minutes to the Île des Embiez, where Paul Ricard, the pastis maker, lies on the island's highest point, looking back at the coast he sold his drink to."},
}
VENUE_SET = {}      # id -> {field: value} overrides, each one a correction from the 17 Oct re-check
LANE_STORY_SET = {} # lane -> {field: value}
HOT_SET = {   # told once: the hot-board card owns the 2026 chestnut Sundays; La Petite Fontaine's own card owns its menu
 "Fêtes de la Châtaigne, Collobrières": {
  "story": "Every October the chestnut village of the Maures gives three Sundays to its harvest, each with its own theme: the producers, the twinned towns and their folk groups, the old trades. The streets smell of roasting chestnuts from nine in the morning, the stalls sell marrons glacés and crème de marrons, and the one road in fills before ten. The 2027 Sundays were not published when this was checked; the hot board at the foot has this year's two that remain.",
  "why": "Come early, by the shuttle, and leave the car at the edge of the village."},
 "Chestnut menus in Collobrières": {
  "story": "In October the village does not only sell its chestnuts; it cooks them. The boar daube with chestnuts and ceps is the autumn plate at La Petite Fontaine on the Place de la République, and it takes two days to make, which is why the menu is short. The chestnut Sundays fill every table in the village, so a quiet weekday is the better lunch.",
  "why": "Book ahead for a Sunday lunch, or come midweek."},
}

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
        if q and not TOK.search(q): c["maps_query"] = q + ", Var, France"

def hot(H):
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Var, France"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
