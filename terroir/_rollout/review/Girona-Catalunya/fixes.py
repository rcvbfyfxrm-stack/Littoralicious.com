"""The editor's reconciliations on the research packs (20 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"(?i)\b(Spain|Girona|Catalunya|Catalonia)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 # banned-word list: an apple's trade name and a word the gate refuses
 ("Golden, Gala, Granny Smith and Red Delicious", "Golden, Gala, Granny Smith and a red American variety"),
 ("on a recording the tenora sounds quaint, in a stone square", "on a recording the tenora sounds thin, in a stone square"),
 # told once: the 'season of dragons' curiosity owns the Game of Thrones filming; the cathedral card keeps its steps
 ("Outside, 90 Baroque steps laid in 1607 climb from the square; in September 2015 a Game of Thrones crew filmed Jaime Lannister riding his horse up them to the Great Sept of Baelor.",
  "Outside, 90 Baroque steps laid in 1607 climb from the square; the television story they starred in is under the curiosities."),
 # the vermouth the old guide named (Gerisena's Obreboques) could not be found on 20 Oct: the name leaves the card rather than stand unconfirmed
 ("The old guide names Celler Gerisena at Garriguella, which works with the native Garnatxa roja, and a two-year oak-aged bottling called Obreboques; Gerisena's Garnatxa roja wines are well documented, but we could not reconfirm the vermouth in October 2026. ",
  "Ask before you assume: an Empordà vermouth is a small-cellar rarity, and we could not confirm a named one in October 2026. "),
]
CARD_SET = {       # key -> {field: value} overrides
 # the follow cards shared their visible names with calendar cards and table venues; a card's name must be unique (readings refs)
 "follow:Fires de Sant Narcís": {"name": "The Fires' own programme"},
 "quarters:Sant Pere de Galligants": {"name": "Sant Pere — the abbey quarter"},
 "quarters:Vall de Sant Daniel": {"name": "Sant Daniel — the valley quarter"},
 # told once: the calendar card owns what the festival is and the 2026 edition; the follow card says only what the channel gives you
 "follow:Temps de Flors": {"name": "The Temps de Flors site", "story": "The flower festival's organisers announce each edition's dates in the spring, then publish the map of installations and the list of private courtyards that will open, usually only weeks before. That map is the thing to have: it tells you which patios are worth the queue and which streets to skip. Read it to plan around the festival, or to plan around avoiding it. What the festival is, and when it usually falls, is on its own card in the calendar."},
 "follow:Mercat del Lleó": {"name": "The market's own notices"},
 "follow:DO Empordà": {"name": "The DO Empordà council"},
 "follow:El Celler de Can Roca": {"name": "The Rocas' own site"},
 # told once: the Call walk owns the lanes; the quarter card says where it sits and how the quarter lives today. 'Spain's first centre of
 # Kabbalah' was softened by the culture pack (one of the first); the quarter card follows it.
 "quarters:El Call": {"teaser": "The Jewish quarter inside the Barri Vell: a dozen steep lanes off one street, quiet after six",
   "story": "The Call is not a separate district but a knot of lanes inside the old town, hung off Carrer de la Força on the slope below the cathedral. Girona's Jewish community lived here until the expulsion of 1492; Nachmanides, Bonastruc ça Porta, was born here in 1194 and made the town one of the first centres of Kabbalah in Europe. Today the houses are homes, small hotels and a museum, and the tour groups thin out by late afternoon, when the lanes go quiet and the stone holds the day's warmth. The walk through it and the museum each have their own card.",
   "why": "Come back after six, when the groups have gone and the lanes are the neighbours' again."},
 # told once: the Devesa walk owns the trees and the shade; 'the largest urban park in Catalonia' and '2,500' were dropped by the walk pack as unsupported / superseded (about 2,600)
 "quarters:La Devesa": {"teaser": "The west-bank park quarter: the plane-tree avenues, the Tuesday and Saturday market, the autumn fair",
   "story": "West of the Mercadal the grid stops at the Devesa, the park the city has used as its common ground since the nineteenth century, with the Ter and the Güell running past its edges. On Tuesday and Saturday mornings the open-air Mercat de la Devesa sets up nearby; at the end of October the avenues are given over to the rides, stalls and concert stages of the Fires de Sant Narcís, 23 October to 1 November in 2026. The rest of the year it is where Girona runs, walks its dogs and plays petanca. The walk under the trees, the market and the fair each have their own card.",
   "why": "This fortnight it is the fairground; come in the evening for the lights, by day for the market."},
}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 20 Oct re-check
 # the gate's link parser stops at a closing parenthesis: the Maps query drops the '(urb. Melianta)' aside
 # the address line carried the dispute; the address is the original shop, the dispute stays in the caveat
 "v06-rocambolesc": {"address": "Carrer de Santa Clara 50, 17001 Girona (the original shop; some listings give Carrer de les Hortes)"},
 "v40-ca-l-angel": {"maps": "https://www.google.com/maps/search/?api=1&query=Ca+l%27%C3%80ngel+Fontcoberta+Girona+Spain"},
}
LANE_STORY_SET = {
 # Nexe is cut (no 2026 evidence) and Nomo joins this lane from the dropped 'other kitchens': the story is rewritten on the two packs' facts
 "chefs": {"title": "The new rooms", "story": "Girona's cooks eat in small rooms run by people they trained with. Dit i Fet, below Sant Feliu, is a cook and a host who came out of El Celler cooking old Catalan dishes for about thirty-five covers; its card says who sends you there. SAFO, by Plaça del Vi, pairs Marietta Richter's Mexican and Catalan share plates with Víctor Martín's natural wines, and won the emerging-chef Cuiner award in 2024. The third room comes from further east: Nomo, a Barcelona group with a Tokyo-trained chef-partner, Naoyuki Haginoya, opened in 2021 round the protected garden of the Jardins de la Mercè, a 1900 manor."},
 # Can Roca (Taialà) is unverified for 2026: the lane story says so instead of 'still serves'
 "larder": {"story": "Provisioning in Girona starts at the Mercat del Lleó, the covered market opened on 3 November 1944; in 2024 the Salvador family, Tossa de Mar fishmongers since 1966, took over the fish stall Peixos Pol had kept for eighty years. Across the river in the Barri Vell, Cal Formatger puts the province's small dairies and a good part of Spain's on one counter; its card has who runs it and who shops there. For wine, the drive is fifty minutes north-east to Vilajuïga, where Anna Espelt farms about 200 organic hectares of DO Empordà, including a Carinyena Blanca vineyard planted in 1919."},
 "roca": {"story": "The Roca family feeds Girona at three price points. Can Roca, the bar Josep Roca and Montserrat Fontané opened in Taialà in 1967, has long served a cheap weekday menú that El Celler's own brigade eats at lunch; we found nothing dated 2026 for it, so call before crossing town. Normal, on Plaça de l'Oli, has Elisabet Nolla cooking the dishes of the Roca grandmother and mother and holds a Repsol Sol. Up the hill at Sant Julià de Ramis, Esperit Roca serves El Celler's back catalogue inside an 1893 fort: one MICHELIN star since the 2025 guide, menus that turn with the seasons, and eighth place among Europe's new restaurants on the 2026 Opinionated About Dining list."},
}
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
