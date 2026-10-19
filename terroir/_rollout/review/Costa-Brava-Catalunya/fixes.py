"""The editor's reconciliations on the research packs (19 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"(?i)\b(Spain|Girona|Catalunya|Catalonia|Costa Brava)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # La Tabarra is cut (19 Oct re-check): its line leaves the Girona town card
 ("; La Tabarra for Empordà wine on the Força", ""),
 ("; then drink the wine again by the glass at La Tabarra in Girona.", "."),
 # the Solés shop, museum and terrace are at Carrer Closa d'en Llop 40 (the venue re-check), not on the Plaça de la Sardana
 ("Anxoves Solés, on the Plaça de la Sardana, for tins and jars to take away", "Anxoves Solés, Carrer Closa d'en Llop 40, for tins and jars to take away (its own card is in the tables)"),
 # the Fundació's calendar (read for the Cadaqués guide, 18 Oct): closed 7 January to 10 February, reopening on the 11th
 ("closed 7 January to 11 February (Oct 2026)", "closed 7 January to 10 February, reopening on the 11th (the foundation's 2026 calendar; 2027 dates not yet published)"),
]
CARD_SET = {       # key -> {field: value} overrides
}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 19 Oct re-check
 # the address dispute stays a dispute, but out of the address line: most listings give the original 2012 shop
 "v16-rocambolesc": {"address": "Carrer de Santa Clara 50, 17001 Girona",
                     "caveat": "Hours differ between listings (noon to 20:30 on weekdays in one, 10:30 to 23:00 in others), and one listing gives Carrer de les Hortes 6 instead of Santa Clara 50: check before you walk over. Nothing dated 2026 was found, and nothing says it closed."},
}
LANE_STORY_SET = {  # the bar lane loses La Tabarra (cut after the re-check): its line leaves the lane story
 "bars": {"title": "The cup and the cone", "story": "Girona's old town drinks its coffee and eats its sweets in small rooms a few streets from the Onyar. La Fábrica, on Carrer de la Llebre, was opened in March 2015 by the Canadian rider Christian Meier and his wife Amber, and became the morning stop for the professional cyclists who base themselves in the city; its beans are roasted at the couple's second shop. Rocambolesc, Jordi Roca's ice-cream shop, began as the dessert trolley at El Celler de Can Roca and opened on Carrer de Santa Clara in 2012; its panet is ice cream in warm brioche, the cheapest way into the house of the three brothers.", "where": "La Fábrica, Girona; Rocambolesc, Girona"},
}
HOT_SET = {       # hot/event card name -> {field: value}
 # told once: the hot board's 'Just missed' card owns the 2026 anchovy programme; the calendar card keeps the fixed date and the shape of the day.
 # Its old tip put the Solés shop on the Plaça de la Sardana: the re-check moved it to Carrer Closa d'en Llop 40.
 "Festa de l'Anxova, L'Escala": {"story": "The town that salts the coast's anchovy gives it a day at the start of October. The shape rarely changes: a proclamation and the Anxova d'Or award on the point of La Punta, a public tasting along La Riba, havaneres at midday, and, in the days around it, a tapa route through the bars with a stamp card for the draw. It is a town festa rather than a trade fair, and the salting houses keep their counters open all day.",
   "why": "Walk the tapa route on a weekday, when the bars have time to talk.",
   "facts": [["When", "Usually the first Sunday of October, with the tapa route over the days around it"], ["Where", "La Punta and La Riba, L'Escala"], ["Cost", "Free; tapas at a fixed small price"], ["Tip", "The salting houses sell all year: Anxoves Solés is in the tables"]]},
 # told once: the hot card owns the 2026 programme; the calendar card keeps the fixed date
 "Fires de Sant Narcís, Girona": {"story": "Sant Narcís, the bishop-martyr of the city’s legend, has his feast on 29 October, and Girona builds its ten-day autumn fair around it: a fairground in the plane trees of the Devesa, a correfoc of devils and fireworks, castellers raising human towers in the old town, nightly concerts, and fireworks to close. The dates shift each year so that the fair frames the saint's day. It is the one time the city's population swells as much as the coast's does in August.",
   "why": "If you are in Girona for the Fires, book every table ahead.",
   "facts": [["When", "Late October into the first days of November, framing 29 October"], ["Where", "The Devesa park and the old town, Girona"], ["Cost", "Street events free; rides and some concerts paid"], ["Tip", "Come by train: the city's car parks fill"]]},
}
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
    for i, x in V.items():
        se = x["set"].get("season") or ""
        se = re.sub(r"^Call ahead: no 2026 season (?:dates )?found$", "2026 season not published; call ahead", se)
        if se: x["set"]["season"] = se
    for i, d in VENUE_DROP.items(): V[i]["drop"] = sorted(set(V[i].get("drop", []) + d))

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
