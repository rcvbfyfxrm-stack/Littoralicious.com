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
 # Vagne has no Lons shop (venue pack 2); Mont d'Or at the fromager under the arcades is not sourced: the market only
 ("Fromagerie Vagne, rue du Commerce; Thursday market", "The Thursday market, Place de Verdun, Lons"),
 # Ganevat: the inquiry is reported by the wine press citing Le Monde and the RVF; it concerns the 2023 purchase, not the grower
 ("In March 2023 it was bought by Benoît Pontenier and Jocelyn Brancard; Le Monde then reported a money-laundering inquiry and seized assets, with work allowed to go on.",
  "In March 2023 it changed hands again, and the wine press, citing Le Monde, later reported a judicial inquiry into that purchase and seized assets, with the vineyard work allowed to go on."),
]
CARD_SET = {       # key -> {field: value} overrides
 # told once (audit): the late-November dates live on the hot board; this card is the hall, evergreen
 "listening:Le Bœuf sur le Toit": {
   "teaser": "Lons's own concert hall, on the Place du Maréchal Juin: French rap, rock and stand-up most weeks in the cold months",
   "story": "When Lons gets loud, it is here, in the town's current-music hall on the Place du Maréchal Juin. The programme runs from French rap and reggae to rock and stand-up comedy, most of it on Friday and Saturday nights through autumn and winter, and the big names book out. The crowd is local, students and families together, with beer in plastic cups at the bar, and the walk back to the arcades and the rue du Commerce takes a few minutes. The dates this month are on the hot board at the foot of the guide.",
   "why": "A real night out in a small town: check the hot board for this month's names, and book.",
   "facts": [["Where", "135 Place du Maréchal Juin, 39000 Lons-le-Saunier"], ["When", "Concerts and comedy most weeks in autumn and winter, usually at 20:30"],
             ["Cost", "From about EUR 29 for a touring act (seen Oct 2026)"], ["Best hour", "Arrive for doors; the show starts around 20:30"]]},
}
CARD_DROP_FACTS = {}
VENUE_SET = {}      # id -> {field: value} overrides, each one a correction from the 26 Oct re-check
LANE_STORY_SET = {
 "summit": {"title": "Two stars and a Bib, three towns"},   # Le Bistronôme is a Bib Gourmand, not a star
 # the 2010 opening of Les Claquets and Pelen's upstairs tea room were not re-found in 2026 sources: cut
 "wine": {"story": "Jura wine is mostly drunk where it is made, and in Arbois it reaches the table with the food rather than over a tasting counter. On avenue Pasteur, La Finette has served Comté fondue and chicken in Vin Jaune at varnished log tables since 1961, from a list that holds only Jura bottles. Across town on Place Faramand, Le Bistrot des Claquets is a cave à manger: a bar from morning to about nine at night, one dish of the day at noon with a cold buffet, and the wine picked from a shelf of local natural growers. One is the old tavern, the other the growers' own canteen."},
 "street": {"story": "The Jura pantry is bought rather than eaten out, and most of it is cheese. In Lons the Thursday market, the largest in the department, runs from about seven to five across two squares, with the food stalls on Place de Verdun in the morning; a smaller organic market fills Cours Sully on Saturday mornings. Under the arcades at 39 rue du Commerce, Chez l'Artisan Fromager sells what the Poulet family make, as they have for four generations: raclette cheese, tomme du Jura and above all Morbier. In the centre at 1 rue Saint-Désiré, Pelen has made chocolate since 1899 and roasts its own beans."},
}
HOT_DROP = []
EV_DROP = []
HOT_SET = {"Mont d'Or, back since 10 September": {"maps_query": "", "venue_ref": "v12-march-de-lons-le-saunier"}}   # Vagne left the guide; the market card carries the Maps link
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
            for fa in it.get("facts") or []:
                for a, b in EDITS:
                    if a in fa[1]: fa[1] = fa[1].replace(a, b)
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Lons-le-Saunier, Jura, France"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
