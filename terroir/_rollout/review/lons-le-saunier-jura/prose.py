"""Hand-written prose for the lons-le-saunier-jura GOLD6 build (26 Oct 2026). Facts only from the guide (its May 2026 research), the
26 Oct re-check packs in research/, and nothing else. The old page's lead, history, eat, drink and walk blocks are rebuilt here as one
essay (transformed, not pasted); the facts that now have a card of their own (the salt springs, Savagnin's parentage, the 1936 gazette,
Rouget de Lisle, Pasteur, the Saline Royale, Vin Jaune and sotolon, the dishes) are pointed to, not retold.
The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer, the
calendar, the craft section, the listening room, Autour, the food-history fold) is written here for the first time."""
import re, html as H

TITLE = "Lons-le-Saunier, Jura — Terroir Guide"
DESC = ("Lons-le-Saunier and the Jura wine slope for people who cook: Comté at three ages under the arcades, Morteau from the Thursday "
        "market, the poularde with Vin Jaune and morels, the cellars of Château-Chalon and Arbois, and Michelin stars at Pupillin and "
        "Dole — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Lons-le-Saunier</h1><div class="region">Jura · Bourgogne-Franche-Comté · France</div><div class="philosophy">"A '
        'salt town at the foot of the Revermont: arcades of golden stone, brine rising in the park, and up the slope behind it the '
        'yellow wine that waits six years in the barrel."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Lons-le-Saunier: Lons of the salt-maker. The town was named for the brine under it.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The saunier was the man who boiled brine into '
          'salt, and for most of its history this was a salt town before it was anything else: the springs still rise in the Parc des '
          'Bains. The other word you will need is the Revermont, the first wrinkle of the Jura mountains, whose west-facing slope of '
          'marl carries the vines from here north to Arbois.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Lons-le-Saunier is the prefecture of the Jura, a salt town of about 17,000 at the foot of the '
        'wine slope:</strong> Comté cut at three ages under the arcades, Morteau and cancoillotte at the Thursday market, the poularde '
        'with Vin Jaune and morels, and the cellars of Château-Chalon, Pupillin and Arbois within the hour. <strong>Make or '
        'break:</strong> taste Vin Jaune where it is made, and Comté side by side at three ages. <strong>The warning:</strong> from '
        'November many sites and some kitchens shut for the winter, and the best tables are on the slope, not in town: check the days '
        'on every card and plan a driver.</p></div>')

ESSAY_LEDE = ("Lons sits on salt. Under the town lie beds of rock salt laid down when shallow seas dried out, and brine still rises "
              "through the faults into the Parc des Bains. The salt made the town, the town gave the slope a market, and the slope made "
              "the strangest wine in France.")
ESSAY = [
 ("", "The salt came first: worked here since prehistory, it paid for the abbeys and the castles, and it travelled with the cheese. "
      "The geology and the springs have a card of their own below, and the story of how salt and the village dairies made Comté is "
      "the history fold. What it means at table is a kitchen of cured and kept things: smoked sausage, aged cheese, a wine that "
      "survives six years in a barrel no one tops up."),
 ("", "Then the slope. East of town the Revermont rises in steps of marl and limestone, and the vines run north along it for some "
      "fifty kilometres, through Château-Chalon on its cliff, Poligny, Pupillin and Arbois. It is a small vineyard with five grapes "
      "and a way of working none of its neighbours share: Savagnin left under a veil of yeast until it turns yellow, nutty and "
      "salty. The wine, its rules and the molecule behind its smell are on the Vin Jaune card; its family tree is a curiosity."),
 ("The quintessence", "The kitchen is the mountain’s, finished with the wine. Comté from the cooperative dairies of the plateau, cut "
      "young and milky or old and crystalline; the Morteau sausage smoked in the farmhouse chimney; cancoillotte poured warm over "
      "potatoes; Mont d’Or in its spruce box once the cows come down for winter; and the Bresse hen from the plain to the west, "
      "poached with Vin Jaune and morels, which is the dish the whole region is built to explain."),
]
HISTORY = [
 "The town is small and walkable: the Place de la Liberté and the arcades of rue du Commerce, the market squares around the "
 "theatre, the park of the salt springs. The tables that matter are partly here and partly up the slope, at Arbois and Pupillin, "
 "about forty minutes north by road, with a star further on at Dole.",
 "Arbois is the wine town, and Pasteur’s: he grew up there and worked on wine in a laboratory you can still see. Château-Chalon "
 "makes only Vin Jaune. Pupillin calls itself the world capital of the pale red Ploussard. Each has its card.",
]
MONEY = [
 "The money in the Jura is in the barrels and the cheese cellars. A bottle of Vin Jaune has been six years in the making, and the "
 "most famous natural-wine growers sell everything they make before it is bottled. Most visitors see Arbois, taste a Savagnin on a "
 "terrace and buy a clavelin.",
 "That is the line you can taste. The value is at the Thursday market before noon, a fromager who will cut three ages of Comté side "
 "by side, a tavern lunch of Morteau and Comté, and a cellar where the person pouring made the wine.",
]
WHY_NOW_PARA = ("<p>And the clock is the cow and the vine. The cows go up to summer pasture in spring, and the summer-milk Comté is the "
                "richest; the harvest is in September; and when the herds come down in autumn the Mont d’Or comes back, in its spruce "
                "box, until spring. The year turns on the first weekend of February, when a wine village opens the new Vin Jaune at the "
                "Percée. Whoever comes in June gets a green slope and long evenings; whoever comes in November gets the Mont d’Or, the "
                "game and the first fires, and finds some doors shut for the winter.</p>")


def soul_fold():
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A town built on brine, a slope of marl, a wine that waits under a veil, and a kitchen of kept things</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}
VENUE_TEXT_EDITS = [
 ("for two people", "for at least two people"), ("/ two", "to share"), ("for two", "to share"),
 ("romantic", "quiet"), ("Romantic", "Quiet"), ("curated", "chosen"), ("iconic", "best-known"), (" ★ ", " "), ("★", ""),
]

BOUGIE_GO = ('Taste what the story is about: Comté at three ages from <a href="#venue-v-fromagerie-vagne">the fromager under the arcades</a> '
             'or the <a href="#venue-v12-march-de-lons-le-saunier">Thursday market</a>, and the salt itself at the spring in the Parc des Bains.')
def bougie(b):
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     f'<div class="sfold__title">{H.escape(b["title"], quote=False)}</div>',
     f'<div class="sfold__desc">{H.escape(b["desc"], quote=False)}</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     f'<p class="gx-lede">{H.escape(b["lede"], quote=False)}</p>'] + [f"<p>{H.escape(p, quote=False)}</p>" for p in b["paras"]]
     + [f"<p>{BOUGIE_GO}</p>", "</div>", "</details>"])

DROP_CARDS = []

FOLDS = {
 "quartiers": {"title": "The town and the wine villages", "desc": "The square and the arcades, the market squares, the park of the salt springs; then Arbois, Pupillin and Château-Chalon up the slope",
               "lede": "Lons itself is fifteen minutes end to end on foot. Château-Chalon is a short drive east; Arbois and Pupillin are about forty minutes north by road: go with a driver if you mean to taste."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "The salt under the town, the grape that fathered half of Europe’s whites, the first gazette of appellations, and the man who wrote the anthem",
                 "lede": "Four stories the town and its wine tell about themselves, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the markets, the cheese and the poultry", "desc": "Where a galley provisions: the market days, the fromager and the jar of cancoillotte; then the fort where Comté ages, the Bresse poultry house and the chocolatier",
                  "lede": "Shop on a Thursday morning if you can: it is the big market of the week. Bring a cool bag for the cheese, and ask the fromager to vacuum-pack for the boat."},
 "walks": {"title": "Walks — the town, the reculée and the lakes", "desc": "Lons at first light, the cliff amphitheatre of Baume-les-Messieurs, the Hérisson falls and the ridge above four lakes",
           "lede": "Walk the town early; walk the cliffs and the falls in daylight and in good boots. In November the paths up on the plateau can be wet or icy, and the cafés at the trailheads close for the winter."},
 "culture": {"title": "Culture — the churches, the cow, the salt and the scientist", "desc": "The crypt of Saint-Désiré, the Cordeliers, the Laughing Cow; Ledoux’s saltworks, Pasteur’s laboratory, and the lake-village finds",
             "lede": "Three stops in town, three a drive away. Check the winter hours: several close or shorten from November."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The wood courses of the Haut-Jura, the pipe-makers and the village dairy, what each is missing, and the honest word on what the shops sell",
           "lede": "The Jura made things in its long winters: briar pipes, wooden toys, spectacles, cut stones, and the cheese itself. Honestly, nothing here clears the whole bar in October 2026: no workshop we found names a still-working master on a class anyone can join. The card at the top comes closest; the others show the craft without teaching it."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "A terrace on the theatre square, and the town’s library",
                    "lede": "Lons takes its coffee on the squares round the theatre. For an hour of work, the library."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The yellow wine, the two red grapes and the appellations; the drinks before, after and with dessert; and the cellars, including the ones you will not get into",
          "lede": "Learn Savagnin, Ploussard and Trousseau, and the difference between a topped-up wine and one left under its veil, and every list in the Jura makes sense. Then taste in a cellar."},
 "listening": {"title": "Hi-fi & listening — the room, and the night", "desc": "The honest word on a listening room, the concert hall of Lons, and the club an hour north",
               "lede": "Lons is not a late town. The evening is a glass and a conversation; the music is a concert, booked ahead."},
 "around": {"title": "Autour — north along the slope", "desc": "Poligny and the Comté centre, the old saltworks of Salins, and Pasteur’s birthplace at Dole"},
 "avoid": {"title": "What to skip", "desc": "The region keeps two versions of itself: what it sells on the squares to people passing through, and what it pours and cuts two doors back",
           "lede": "Three things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the tourist board, the saltworks, the wine board and the Comté body"},
}

GDESC = {
 ("quartiers", "Inside Lons"): "The square and the arcades, the market squares, and the park where the brine still rises.",
 ("quartiers", "The wine villages"): "Pasteur’s wine town, the village of the pale red, and the cliff that makes only Vin Jaune.",
 ("curiosities", "Salt, grapes and a gazette"): "The brine under the town, a grape with a famous family, and the first list of appellations.",
 ("curiosities", "Born here"): "The officer who wrote the Marseillaise.",
 ("provisioning", "The market days"): "The town’s markets, the fromager under the arcades, and the cheese sold by the jar.",
 ("provisioning", "From the source, for the galley"): "The fort where Comté ages, the Bresse poultry house, and the chocolatier of rue Blaise Pascal.",
 ("walks", "Lons and its reculée"): "The town before the shops open, and the cliff amphitheatre east of town.",
 ("walks", "Up on the lake plateau"): "The falls of the Hérisson, and the ridge above four lakes.",
 ("culture", "In Lons"): "A Merovingian crypt, the friars’ church, and the cheese that laughs.",
 ("culture", "Salt, science and the lake villages"): "Ledoux’s royal saltworks, Pasteur’s house in Arbois, and five thousand years kept in lake mud.",
 ("craft", "Do this one"): "The closest thing to a class: the wood trades of the Haut-Jura, taught to anyone who signs up.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Jura-made, and is not.",
 ("coffee-gardens", "Places to sit"): "The terrace on the theatre square, and the library.",
 ("bars", "Ask for it by name"): "The yellow wine, the two red grapes, and the appellations on the label.",
 ("bars", "Before, after, and the sweet one"): "The apéritif, the bubbles and the brandy, and the wine of dried grapes.",
 ("bars", "The cellars, and the ones you won't get into"): "Château-Chalon’s reference house, the biodynamic estate by Arbois, and the growers who sell out before bottling.",
 ("listening", "The listening room"): "Where to hear records properly, honestly checked.",
 ("listening", "Live, and late"): "The concert hall of Lons, and the club an hour north.",
 ("around", "North along the slope"): "The capital of Comté, and the town of the great saltworks.",
 ("around", "Further north"): "Pasteur’s birthplace on the Doubs.",
 ("avoid", "At the glass and the counter"): "The terrace Vin Jaune, and the Comté in plastic.",
 ("avoid", "The old address"): "The two-star house that moved.",
 ("follow", "The region"): "The tourist board and the saltworks.",
 ("follow", "The wine and the cheese"): "The wine board and the Comté body.",
}

TABLES_DESC = ("Two Michelin stars, at Pupillin and Dole, at one end and a slice of Morteau at the Thursday market at the other: at most three "
               "tables of each kind, picked for what you should not miss here, every card saying when it was last confirmed and which "
               "days it closes.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "SALT AND CHEESE", "quarters": "THE TOWN & VILLAGES", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "WINE & CELLARS", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, salt and cheese, the town and the villages, the record corrected, the season", "tables": "",
               "flaner": "the town and the cliffs, the churches and the saltworks, the hand, the cup",
               "sortir": "the wines by name, the cellars, the night", "around": "Poligny, Salins, Dole",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The dinners you drive for: a first Michelin star at Pupillin, the Bib Gourmand on the river at Arbois, and the starred house in Dole.",
              "petite": "Where this guide actually lives: the town’s own kitchens in Lons, and the tables in Arbois and Lons where the wine comes first.",
              "street": "On foot and early: the market, the fromager and the chocolatier."}

LANE_LEAD = {}     # set from the venue packs (see LANE_LEAD_TEXT below, filled after the 26 Oct re-check)
LANE_STORY = {}    # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py
CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each town — the glass, the table, the last glass.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: salt and the village dairies, the markets and the fromager, the yellow wine, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {}     # filled after the 26 Oct re-check (fill_lists in liste.py)

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the Jura’s year: the new Vin Jaune in February, the music in summer, the grapes carried to church in September, the cheese in autumn"

from liste import LISTE, LANE_LEAD_TEXT, SHORT_SUB_TEXT   # noqa: E402
LANE_LEAD.update(LANE_LEAD_TEXT); SHORT_SUB.update(SHORT_SUB_TEXT)
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

DISH_DESC = "Eight plates and their honest passports: which are the Jura’s own, which it shares with the Doubs and the Bresse, and which come down from the mountain."
from liste import DISHES   # noqa: E402


def dish_articles(old):
    from liste import DISH_WHERE as W
    tr = str.maketrans({"œ": "oe", "Œ": "oe", "é": "e", "è": "e", "ê": "e", "à": "a", "â": "a", "ç": "c", "î": "i", "ô": "o", "û": "u", "É": "e", "’": "-"})
    out = []
    for name, body, origin in DISHES:
        aid = "o-" + re.sub(r"[^a-z0-9]+", "-", name.lower().translate(tr)).strip("-")[:28]
        where = W.get(name)
        out.append(f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{name}</span></h3>'
                   f'<p class="tcard__body">{H.escape(body, quote=False)} <b>Origin.</b> {H.escape(origin, quote=False)}</p>'
                   + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")
    assert len(out) == 8, len(out)
    return "".join(out)


DROP_HOSTS = ("facebook.com", "instagram.com", "tripadvisor.")
def sources_edit(s):
    pairs = []
    for u, lab in re.findall(r"""<a href=['"](https://[^'"]+)['"][^>]*>(.*?)</a>""", s):
        u = H.unescape(u)
        if u not in [p[0] for p in pairs] and not any(h in u for h in DROP_HOSTS): pairs.append((u, H.unescape(lab)))
    lst = "<ul class='gx-list'>" + "".join(f'<li><a href="{H.escape(u, quote=True)}" target="_blank" rel="noopener">{H.escape(l, quote=False)}</a></li>' for u, l in pairs) + "</ul>"
    s = s.replace('<div class="sfold__desc">Links we checked.</div>', '<div class="sfold__desc">Where every fact came from, and when it was last checked</div>')
    i = s.index('<div class="sfold__body">') + len('<div class="sfold__body">')
    j = s.index('<p style="font-size:0.82em')
    raw = s[j:s.index("</p>", j) + 4]
    return s[:i] + lst + raw + "</div></details>"


from liste import GEMS   # noqa: E402

GLOSS = [
 ["saunier", "a salt-maker: the man who boiled brine into salt"],
 ["saline", "a saltworks, where brine was boiled down into salt"],
 ["saumoduc", "the pipeline that carried brine from Salins to the Saline Royale"],
 ["Revermont", "the first ridge of the Jura mountains, whose west slope carries the vines"],
 ["reculée", "a blind valley cut into the Jura plateau, closed by a cliff amphitheatre"],
 ["cirque", "a semicircle of cliffs closing a valley"],
 ["fruitière", "a village cooperative dairy where the farmers’ milk is made into Comté"],
 ["fruitières", "village cooperative dairies where the farmers’ milk becomes Comté"],
 ["affineur", "a cheese ager: buys young cheeses and ripens them in the cellar"],
 ["affinage", "the ageing of a cheese in the cellar"],
 ["sous voile", "aged under a veil of yeast that forms on the wine in a barrel left unfilled"],
 ["voile", "the veil of yeast that grows on the wine in an unfilled barrel"],
 ["ouillé", "topped up: a wine kept in full barrels, fresh rather than oxidative"],
 ["clavelin", "the squat 62 cl bottle that Vin Jaune must be sold in"],
 ["Vin Jaune", "yellow wine: Savagnin aged under its veil for at least six years and three months"],
 ["Vin de Paille", "straw wine: sweet wine from grapes dried before pressing"],
 ["Macvin", "the Jura apéritif: grape must stopped with Marc du Jura and aged in oak"],
 ["Savagnin", "the Jura’s great white grape, the one used for Vin Jaune"],
 ["Ploussard", "the Jura’s pale red grape, also called Poulsard"],
 ["Poulsard", "the Jura’s pale red grape, also called Ploussard"],
 ["Trousseau", "the Jura’s firmer, darker red grape"],
 ["Crémant", "sparkling wine made by a second fermentation in the bottle"],
 ["marc", "brandy distilled from the pressed skins and pips of the grapes"],
 ["Percée", "the Percée du Vin Jaune: the February weekend the new Vin Jaune is broached"],
 ["Biou", "the giant bunch of grapes carried to Arbois church at harvest"],
 ["Comté", "the great cooked, pressed cow’s-milk cheese of the Jura massif"],
 ["Morbier", "a soft cow’s-milk cheese with a line of ash through the middle"],
 ["Mont d’Or", "a soft winter cheese ringed with spruce bark and sold in its box"],
 ["cancoillotte", "a runny cheese of melted skimmed-milk curd, butter and garlic or wine"],
 ["metton", "the dry skimmed-milk curd that cancoillotte is made from"],
 ["Morteau", "the smoked pork sausage of the Haut-Doubs, closed with a wooden peg"],
 ["tuyé", "the great pyramid chimney of a mountain farm, where sausages are smoked"],
 ["cheville", "the little wooden peg that closes a Morteau sausage"],
 ["pochouse", "a stew of river fish cooked in white wine"],
 ["gougères", "warm choux puffs made with cheese, served with the first glass"],
 ["poularde", "a fattened young hen"],
 ["morilles", "morels: the honeycombed spring mushrooms, used dried in the poularde"],
 ["caveau", "a tasting cellar or wine bar"],
 ["cave à manger", "a wine shop where you can also eat"],
 ["domaine", "an estate that grows its own grapes and makes its own wine"],
 ["Bresse", "the plain west of Lons, home of the blue-footed AOP poultry"],
]
