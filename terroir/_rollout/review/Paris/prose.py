"""Hand-written prose for the Paris GOLD6 build (16 Oct 2026). Facts only from the guide (its July 2026 research), the
16 Oct re-check packs in research/, and nothing else. The old page was a pre-GOLD3 tier inventory whose 'story', 'why now'
and 'where the money sits' blocks had filled up with misplaced origin boxes; the essay is rebuilt here from their real
paragraphs and the old soul, and the origin stories go where they belong (the gem popups and The Dish). The whole
GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer, the
calendar, the craft section, the listening room, Autour) is written here for the first time."""
import re, html as H

TITLE = "Paris — Terroir Guide"
DESC = ("Paris for people who cook: the vegetable three-star and the falafel window, the bistro canon, the bouillons of the 1890s, "
        "the natural-wine counters of the 10th and 11th, the markets before noon and the city on foot — at most three places of each kind, "
        "every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Paris</h1><div class="region">Île-de-France · France</div><div class="philosophy">"A museum-city that '
        'refuses to become a museum: the boulangerie still opens before dawn, and the espresso is still drunk standing at the zinc."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>From the Parisii, the Celtic tribe on the river crossing — not from the Roman town.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>Julius Caesar recorded the Parisii and their island oppidum '
          'on the Seine; Rome built its own town, Lutetia, around it and up the Left Bank towards the Montagne Sainte-Geneviève. When the empire '
          'fell and Clovis I made the place a Merovingian capital in the sixth century, the name of the tribe outlived the Roman name of the '
          'town. Paris is still, at its centre, an island in a river: the Île de la Cité, where every distance in France is measured from a '
          'bronze star in the paving in front of Notre-Dame.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Paris is an island city rebuilt on top of itself, and it eats on two registers at once:</strong> '
        'a ham sandwich at the counter and a garden on a plate at three stars, often on the same street. <strong>Make or break:</strong> '
        'book the grand night and the two or three bistros that matter before you fly, then eat the rest east and north of the monuments — '
        'the 10th, the 11th, Belleville — where the neighbourhood eats. Shop the markets before noon. <strong>The warning:</strong> a menu in '
        'four languages with forty dishes is selling you the address; within sight of a monument, keep walking. Burgundy and the Jura have their own guides.</p></div>')


def _paras(block, cls=None):
    if cls: return re.findall(r'<p class="%s"[^>]*>(.*?)</p>' % cls, block, re.S)
    return re.findall(r"<p>(.*?)</p>", block, re.S)


def soul_fold(soul, history, money):
    """The essay: the old soul (minus 'The art' and 'The sound', which the culture and listening cards now own), the old history's
    three real paragraphs (its origin boxes went to the gems and The Dish; the bistro-word and Les Halles lines are curiosity cards
    now), and the old 'where the money sits' — merged into one read."""
    sp = _paras(soul, "soul__body")
    keep = [sp[0], sp[1], sp[2]] + [p for p in sp[3:] if "The living city" in p or "The quintessence" in p]
    keep = [re.sub(r'<strong style="[^"]*">([^<]*)</strong>', r'<b class="gx-merge-k">\1.</b> ', p) for p in keep]
    body = f'<p class="gx-lede">{keep[0]}</p>\n' + "\n".join(f"<p>{p}</p>" for p in keep[1:])
    hp = _paras(history)
    hp = [p for p in hp if "Lutetia" in p or "medieval city" in p or "Food history" in p]
    body += "\n<h3 class=\"gx-merge\">Where it comes from</h3>\n" + "\n".join(f"<p>{p.strip()}</p>" for p in hp)
    mp = _paras(money)
    body += "\n<h3 class=\"gx-merge\">Where the money sits</h3>\n" + "\n".join(f"<p>{p}</p>" for p in mp) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">An island in a river, Haussmann\'s boulevards over the medieval tangle, the zinc counter where a worker '
                      'and a philosopher paid the same price, and the two maps of where Paris eats</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


WHY_NOW_PARA = ("<p>And it is a hinge moment. The Centre Pompidou has gone dark for a rebuild due to last until about 2030, while the fringe of "
                "2010 — third-wave coffee, the natural-wine cave, the neo-bistro without a white tablecloth — has become the city's mainstream. "
                "Paris is quietly recomposing around the bistro, again.</p>")

# exact edits on the old blocks (asserted by the build)
EDITS = {
 "soul": [
  ("held a river crossing on the Seine; Rome built its Lutetia around that oppidum and up the Left Bank. Everything else — the boulevards, the museums, the myth — grew outward from the Ile de la Cite.",
   "held a river crossing on the Seine. Everything else — the boulevards, the museums, the myth — grew outward from the Île de la Cité."),
  ("Paris is a museum-city — the Louvre, the Orsay, ten three-star kitchens — that stubbornly refuses", "Paris is a museum-city — the Louvre, the Orsay, a cluster of three-star kitchens — that stubbornly refuses"),
  ("the unhurried watching the nineteenth century named flanerie", "the unhurried watching the nineteenth century named flânerie"),
  ("Above the counter sits cafe culture proper: the literary tables of the Flore and the Deux Magots where the existentialists worked. ", ""),
  ("the greve — the strike", "the grève — the strike"),
  ("the morning walk to the boulangerie for a warm baguette de tradition, and the quignon — the heel — broken off and eaten on the way home. At the cafe, the initiated take their coffee standing at the zinc comptoir, where it costs less than at a table.",
   "the morning walk to the boulangerie for a warm baguette de tradition, and the quignon — the heel — broken off and eaten on the way home. At the café, the initiated take their coffee standing at the counter, where it costs less than at a table."),
 ],
 "history": [
  ("Paris is Lutetia, the settlement of the Parisii on the Seine that Julius Caesar recorded as an island oppidum; Rome conquered it in the first century BC and built up the Left Bank around the Montagne Sainte-Genevieve. After the empire fell, Clovis I made Paris a Merovingian capital in the sixth century, and the name of the tribe outlived the Roman name of the town (culture.gouv.fr; World History Encyclopedia).",
   "Rome conquered the Parisii's island in the first century BC and built up the Left Bank; Clovis I made the town a Merovingian capital in the sixth century (culture.gouv.fr; World History Encyclopedia)."),
  ("The Paris we walk now, though, is largely Napoleon III's: from 1853 to 1870 Haussmann demolished the crowded medieval quarters and cut more than 140 kilometres of boulevard, laying sewers and parks — the order was to \"aerer, unifier, embellir,\" to give the city air (Wikipedia; Britannica). The Belle Epoque, roughly 1870 to 1914, gilded the result.",
   "The Paris we walk now, though, is largely Napoleon III's — Haussmann's order was to \"aérer, unifier, embellir,\" to give the city air (Wikipedia; Britannica) — and the Belle Époque, roughly 1870 to 1914, gilded the result."),
  ("Food history rode alongside. The word \"bistro\" is only recorded from the 1880s — the tale of Russian Cossacks shouting bystro (\"quickly\") in 1814 is a charming myth, too late by some seventy years to be true (Wiktionary; World Wide Words). Les Halles, \"the belly of Paris,\" fed the city for eight centuries until the whole market was moved overnight to Rungis in March 1969. And in May 1968,",
   "Food history rode alongside: in 1782 the Palais-Royal gave the world the restaurant (the story is told just below), and the word bistro, the market of Les Halles and the zinc counter each have their own card among the curiosities. And in May 1968,"),
 ],
 "money-sits": [
  ("At the top, Michelin still clusters thickly — for 2025 roughly ten three-star rooms, seventeen two-star and about seventy-five one-star, plus some fifty Bib Gourmand value tables (Michelin Guide). But the honest map runs the other way:",
   "At the top, MICHELIN still clusters more thickly here than in any other French city. But the honest map runs the other way:"),
  ("Underneath sits the plumbing. Rungis, opened in 1969 to replace Les Halles, is the second-largest wholesale food market on earth after Mexico City's Central de Abasto, and it provisions the whole region before dawn (Wikipedia; france.fr). And the shift in the glass is the natural-wine wave: the caves a manger that began around 2000 with Le Verre Vole are now the default of a whole generation of Paris tables.",
   "Underneath sits the plumbing — Rungis, south of the city, provisions the whole region before dawn — and the shift in the glass: the caves à manger, wine shops you eat in, that began around 2000 on the Canal Saint-Martin are now the default of a whole generation of Paris tables."),
 ],
 "seasonal": [], "sources": [], "tables": [],
}

# The food-history callout (#bougie): the old one-story fold (1782), edited — the Grand Véfour paragraph becomes a pointer to its table card.
BOUGIE_BODY_EDITS = [
 ("The restaurant -- a room of private tables, set prices, a printed card and food on demand -- was not invented anywhere else.",
  "The restaurant — a room of private tables, set prices, a printed card and food on demand — was not invented anywhere else."),
 ("The Duc d'Orleans", "The Duc d'Orléans"),
 ("making a walled pleasure-quarter that -- as royal private property -- the police could barely enter.", "making a walled pleasure-quarter that, as royal private property, the police could barely enter."),
 ("Antoine Beauvilliers -- former chef to the future Louis XVIII -- opened", "Antoine Beauvilliers, former chef to the future Louis XVIII, opened"),
]
def bougie(old_story_box, grand_vefour_line):
    paras = re.findall(r'<p class="(?:gx-lede|tcard__body)"[^>]*>(.*?)</p>', old_story_box, re.S)
    lede, p1, p2 = paras[0], paras[1], paras[2]
    for a, b in BOUGIE_BODY_EDITS:
        lede, p1, p2 = lede.replace(a, b), p1.replace(a, b), p2.replace(a, b)
    assert "--" not in lede + p1 + p2, "unconverted double dash"
    p3 = ("Almost none of those first rooms survive. One does, in the same arcades: " + grand_vefour_line +
          " Then the bistro took the idea downmarket and made it Parisian: a short card, a zinc, a carafe. The tables of this guide are its heirs, "
          "and La liste at the foot takes the plates one by one.")
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     '<div class="sfold__title">1782 — the year Paris learned to dine out</div>',
     '<div class="sfold__desc">Not a Revolution story but a garden full of gamblers: the room with private tables, a printed card and a fixed price, invented in the Palais-Royal</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     f'<p class="gx-lede">{lede}</p>', f"<p>{p1}</p>", f"<p>{p2}</p>", f"<p>{p3}</p>", "</div>", "</details>"])

# the Musée Nissim de Camondo has been closed for works since 4 August 2024 (reopening announced for early 2027, one listing says 2029):
# a card for a museum you cannot enter is cut, and the closure is noted in the sources method
# La Station – Gare des Mines closes after its 31 October 2026 party for about three years (rewrite_4 _verified): cut the same way
DROP_CARDS = ["culture:Musée Nissim de Camondo", "listening:La Station - Gare des Mines"]

FOLDS = {
 "quartiers": {"title": "The quarters — the villages, the hill and three royal squares", "desc": "Eight places in three rings: the Right Bank villages east of the centre, Montmartre and Saint-Germain, and the three squares the kings laid out",
               "lede": "Paris reads as a ring of villages round an island. The Marais, the canal and Belleville are where it eats now; Montmartre and Saint-Germain are where it remembers; the royal squares are where to sit down. Walk inside a quarter, take the metro between them."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "The empire of the dead, Guimard's iron, the green fountains, why the bar is a zinc, Voltaire's cups, the word bistro, the belly of Paris and its own vineyard",
                 "lede": "Nine things the city's own story tells slightly wrong, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — markets, bread, pastry and the cook's shops", "desc": "Where a galley provisions: three markets with different clocks, the bread worth crossing the river for, two pastry houses, the copper-pan shop, an affineur and the food hall",
                  "lede": "Shop the markets in the morning and never on a Monday; the bakers sell out by the afternoon. The shops below weigh by hand and most close on Sunday or Monday: check the card."},
 "walks": {"title": "Walks — the river, the old railways, the parks", "desc": "Seven routes: the car-free quais and the tip of the island, two railways turned paths, a park on a quarry, the city of the dead and a palace garden",
           "lede": "Paris is flat in the middle and stairs at the edges. The river is the morning walk, the railways are the afternoon, and the parks close at dusk."},
 "culture": {"title": "Culture — the jewel box, the gardens, the collectors' houses", "desc": "The Sainte-Chapelle, the opera house and the rotunda; three museums with gardens; two collectors' houses left as they lived; the arcades, a hunting museum and a mosque's tea garden",
             "lede": "The great museums need no help from this guide; book them before you fly. These are the rooms a chain city could not fake, most of them small, several with a garden to sit in."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one workshop where you can learn from a named hand, the others and what each is missing, and the honest word on what is sold as Paris-made",
           "lede": "Paris keeps its crafts behind shop doors: the bakers, the affineurs, the luxury ateliers. Most sell rather than teach; the card at the top is the one place that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "Three cups for the coffee itself, three rooms where a laptop is welcome, the three terraces that are institutions, and three by the canal",
                    "lede": "The honest truth first: the corner café is for the terrace, not the crema. For the cup, go to the roasters; for a desk, the reading rooms; for an hour of watching, the terraces."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The three bottles to ask for by name, the other glasses, three natural-wine counters, three roofs and one drink in a grand hotel",
          "lede": "Paris drinks standing before it drinks sitting. Learn the grower Champagne, the bistro whites and the Beaujolais by name; then the counters of the 10th and 11th, a roof at dusk, and one drink under a palace ceiling."},
 "listening": {"title": "Hi-fi & listening — the rooms, the jazz cellars and the city's own sound", "desc": "Two listening bars built round the system, three small jazz rooms, two collectives in an old station and a railway depot, and chanson to the French touch",
               "lede": "The city exports electronic music and keeps an older habit: jazz in cellars, chanson in the cafés. Check the night's programme before you go."},
 "around": {"title": "Autour — out of the city by train", "desc": "Monet's garden, Van Gogh's last village, the forest and the painters, three châteaux, a walled medieval town and a dance hall on the Marne"},
 "avoid": {"title": "What to skip", "desc": "The city keeps two versions of itself: what it sells beside the monuments, and what it does one street back",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the independent guide, the English-language eaters, the official tourist office and the red guide"},
}

GDESC = {
 ("quartiers", "The Right Bank villages"): "The old Jewish quarter and its galleries, the canal of the caves à manger, and the hill of the neo-bistros.",
 ("quartiers", "The hill and the Left Bank"): "The village on the Butte, and the café quarter of the Left Bank.",
 ("quartiers", "Three royal squares"): "A square of brick from 1612, a triangle on the island, and a circle round a king.",
 ("curiosities", "Under the street, and on it"): "Six million under the pavement, the iron of 1900, and the water that is still free.",
 ("curiosities", "The counter and the café"): "A bar named for a metal, a philosopher's cups, and a word everybody gets wrong.",
 ("curiosities", "The city's belly and its vineyard"): "The market that left in one night, the vineyard on the hill, and the arcades that survived.",
 ("provisioning", "The markets"): "The cheapest and least touristy, the oldest covered hall, and the Sunday organic market.",
 ("provisioning", "The bread"): "The two-kilo miche, the escargot pastry, and a Japanese baker's Paris.",
 ("provisioning", "The pastry houses"): "The Ispahan, and the fruit that is not fruit.",
 ("provisioning", "The shops a cook goes to"): "Copper since 1820, raw-milk cheese from its own cellars, and the food hall of the Bon Marché.",
 ("walks", "Along the water"): "The quais without cars, and the willow at the island's tip.",
 ("walks", "On the old railways"): "A viaduct turned garden, and the ring line the city let go wild.",
 ("walks", "Parks, a garden and the dead"): "A quarry turned park, the cemetery everyone visits, and the arcaded garden where the restaurant was born.",
 ("culture", "The jewel box, the opera, the rotunda"): "Thirteenth-century glass, the gilded house of 1875, and the old grain exchange holding a collection.",
 ("culture", "Museums with gardens"): "Rodin's roses, a writer's green-shuttered villa, and Renoir's garden on the hill.",
 ("culture", "The collectors' houses"): "Two houses left as their owners lived: a couple's Italian paintings, and a painter's studio up an iron stair.",
 ("culture", "Odd and particular"): "The arcades, the hunting museum in a Marais mansion, and mint tea under the fig trees.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real shops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Paris-made, and is not.",
 ("coffee-gardens", "The cup itself"): "The 2005 pioneer, the roaster that lit the wave, and the bar on rue Villedo.",
 ("coffee-gardens", "Where you can actually work"): "An oval reading room, the oldest public library in France, and a café that charges by the hour.",
 ("coffee-gardens", "The terrace as an institution"): "The Left Bank's two famous terraces and the Montparnasse room that never closed its doors to painters.",
 ("coffee-gardens", "By the canal"): "A house turned café on the basin, and two counters on the Canal Saint-Martin.",
 ("bars", "Ask for it by name"): "The nearest vineyard is Champagne; the bistro whites; the gamay you drink cool.",
 ("bars", "The other glasses"): "The orchard's honest outsiders, the anise habit, and the milk coffee that ends at noon.",
 ("bars", "Natural wine, three counters"): "Where the cave à manger began, the smallest counter in the 11th, and the neo-bistro's own cave.",
 ("bars", "Above the roofs"): "A free terrace over the dome, a rough roof in Ménilmontant, and a palace roof over the Pont Neuf.",
 ("bars", "One drink in a grand hotel"): "Hemingway's bar, the Bristol's panelled room, and the Left Bank's Art Deco hotel.",
 ("listening", "The listening rooms"): "Two bars built round the sound system and the record.",
 ("listening", "Small, live and late"): "A medieval cellar where they still swing-dance, a Châtelet club, and the room of 1981.",
 ("listening", "The collectives"): "A railway station turned café-farm, and a train depot turned music yard.",
 ("listening", "The city's own sound"): "Chanson, the jazz cellars of 1947, and the French touch.",
 ("around", "The painters and the forest"): "Monet's garden, Van Gogh's last weeks, and the forest of the Barbizon painters.",
 ("around", "The châteaux"): "The palace, the château that made Louis XIV jealous, and the one with the stables.",
 ("around", "A walled town and a river dance"): "The medieval fair town, and a dance hall on an island in the Marne.",
 ("avoid", "Three to skip"): "The avenue terraces, the table with the view, and the man on the pavement with a menu.",
 ("avoid", "Read the bill"): "What lands on the table, and then on the bill.",
 ("follow", "What to eat, from people who live here"): "The independent guide, the English-language eaters, and a pastry chef who moved here.",
 ("follow", "Tickets and the red guide"): "The official tourist office, and the MICHELIN selection.",
}

TABLES_DESC = ("A three-star kitchen with no meat, fish or dairy at one end and a falafel window at the other: at most three tables of each kind, "
               "picked for what you should not miss in this city, every card saying when it was last confirmed trading.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "HOW IT DINES", "towns": "THE QUARTERS", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the first restaurant, the quarters, the record corrected, the month", "tables": "",
               "flaner": "the river and the old railways, the jewel box and the gardens, the hand, the rooms to sit in",
               "sortir": "the bottles by name, natural wine, the roofs, the grand bars, the listening rooms and the jazz cellars", "around": "out of the city by train",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for — and book before you fly: three three-star houses, the new haute of the counter and the fire, and the grand rooms with a date over the door.",
              "petite": "Where this guide actually lives: the neo-bistros of the 11th, the bistro canon, the wine bistros, the brasseries and the bouillons, and two rooms you walk into by day.",
              "street": "At the window and at the counter: falafel, the sandwich, the ham, the galette and the steak."}

LANE_LEAD = {
 "creme": "The three-star rooms: the garden on a plate, the sauce house on the Seine, and a Japanese-born chef's French kitchen.",
 "produce": "A counter where the produce is the menu, a plant-forward kitchen in the Marais, and binchotan with handmade pasta.",
 "grand": "1784, 1901, and the Monnaie: the oldest dining room in the city, a station buffet under painted ceilings, a chef's house in the mint.",
 "neo": "The 11th made the neo-bistro: Septime, a sister-run room on rue Saint-Maur, and a circus tile room by the Cirque d'Hiver.",
 "bistro": "Steak au poivre on rue Paul Bert, the Basque canteen by the Invalides, and the old Sentier bistro that never changed.",
 "wine": "The cellar comes first: Raquel Carena's blackboard in Belleville, a wine bistro in the Marais, and a cellar of thousands in the 11th.",
 "brasserie": "1880, 1864, 1927: the Left Bank's Alsatian room, the Bastille's glass dome, and Montparnasse's Art Deco hall.",
 "bouillon": "The workers' canteens: Chartier of 1896, the crémerie of 1845, and the revival on the boulevard de Clichy.",
 "day": "No bookings for the raw bar on rue de Charonne, and a weekday day kitchen two streets away.",
 "window": "The rue des Rosiers falafel, the griddled sandwich of the rue Charlot, and the jambon-beurre near the Opéra.",
 "onedish": "The galette of Brittany done properly twice, and the steak-frites room with one menu.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the apéro, the bistro, the counter and the late room.",
  "note": "L’apéro · le bistrot · la table", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the room where the restaurant was born, the markets before noon, the dishes born here, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: the two bouillons that take no reservations and turn tables fast, and the raw bar that never takes bookings. Hours as read on 16 Oct 2026 are on each card — expect a queue.",
             "Plan ahead — this week": "Book a few days ahead: the steak au poivre on rue Paul Bert, the Basque canteen by the Invalides, and the neo-bistro on rue Saint-Maur.",
             "Plan ahead — the grand night": "The three-star houses: book as soon as the dates are fixed — weeks ahead, not days — and confirm the days they close."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the Paris year: the farm show and the marathon, the music and the fourteenth, the harvest on the hill, the new gamay and the galette"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): the eleven old dish articles, rebuilt clean (the old ones carried misplaced gem boxes)
DISH_DESC = "Eleven plates and habits and their honest, often contested, origins: the one detail that separates the real version from the tourist copy."
DISH_TEXT_EDITS = [(" -- ", " — "), ("--", "—")]
DISH_WHERE = {}   # name -> '<a href="#venue-...">..</a>' — filled in liste.py from the verified venues (refs resolve in the build)


def dish_articles(old):
    """the old 11 tcard--dish articles (no ids), each rebuilt: name, the body, the Origin line; the gem boxes inside them dropped"""
    i = old.find('id="dish"'); j = old.find('id="art"')
    out = []
    for n, m in enumerate(re.finditer(r'<article class="tcard tcard--dish"[^>]*>(.*?)</article>', old[i:j], re.S)):
        c = re.sub(r'<aside class="gembox".*?</aside>', "", m.group(1), flags=re.S)
        name = re.search(r'class="tcard__name-text">(.*?)</span>', c, re.S).group(1).strip()
        bodies = re.findall(r'<p class="tcard__body"[^>]*>(.*?)</p>', c, re.S)
        body = bodies[0].strip()
        origin = re.sub(r"<strong[^>]*>Origin</strong>\s*", "", bodies[1]).strip() if len(bodies) > 1 else ""
        for a, b in DISH_TEXT_EDITS:
            body, origin = body.replace(a, b), origin.replace(a, b)
        name = DISH_NAMES.get(name, name)
        aid = "o-" + re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:28]
        where = DISH_WHERE.get(name)
        out.append(f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{name}</span></h3>'
                   f'<p class="tcard__body">{body}' + (f' <b>Origin.</b> {origin}' if origin else "") + "</p>"
                   + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")
    assert len(out) == 11, len(out)
    return "".join(out)

DISH_NAMES = {"Baguette de tradition francaise": "Baguette de tradition française", "Soupe a l'oignon": "Soupe à l'oignon",
              "Le cafe (express au comptoir)": "Le café (express au comptoir)"}


def sources_edit(s):
    """the old sources fold: its body carried the kit's gx-appendix class (a second appendix on the page); the aggregator dump goes"""
    s = s.replace('<div class="sfold__body gx-appendix">', '<div class="sfold__body">', 1)
    j = s.find("Further sources")
    if j > 0:
        a = s.rfind("<p", 0, j); b = s.rindex("</div></details>") if "</div></details>" in s else s.rindex("</div>")
        s = s[:a] + s[b:]
    return s


# gem popups: born-here food origins, rebuilt from the old page's misplaced origin boxes (each kept to what the old research says)
GEMS = [
 {"id": "gem-restaurant", "pattern": "La Grande Taverne de Londres", "tag": "Paris gem · born here", "name": "The restaurant itself",
  "story": "The word came first: 'restaurants' were restorative bouillons sold to the delicate in the 1760s. Folklore credits a soup-seller called Boulanger in 1765; the historian "
           "Rebecca Spang traced that tale to a book of 1782 and found no record he existed, crediting instead Mathurin Roze de Chantoiseau, who opened a room around 1766 or 1767.",
  "where": "The Palais-Royal arcades, where the first grand restaurants stood."},
 {"id": "gem-croque", "pattern": "croque-monsieur", "tag": "Paris gem · born here", "name": "The crunch-mister",
  "story": "The grilled ham-and-cheese is usually dated to about 1910 on the boulevard des Capucines, a café's quick bite for theatregoers; an earlier printed mention turns up in an "
           "1891 review, and Proust names it in 1919. The name, 'crunch-mister', is counter humour, and its story is folk etymology.",
  "where": "The old cafés of Saint-Germain still make it seriously."},
 {"id": "gem-paris-brest", "pattern": "Paris-Brest", "tag": "Paris gem · born nearby", "name": "A cake shaped like a wheel",
  "story": "In 1910 the journalist Pierre Giffard, who had created the Paris–Brest–Paris cycle race in 1891, asked the pâtissier Louis Durand of Maisons-Laffitte, on the route, "
           "for a cake to mark it. Durand piped a ring of choux like a bicycle wheel, filled it with praline cream and scattered it with almonds. His family still bakes it there.",
  "where": "Pâtisserie Durand, avenue de Longueil, Maisons-Laffitte."},
 {"id": "gem-saint-honore", "pattern": "Saint-Honoré", "tag": "Paris gem · born here", "name": "The baker's saint",
  "story": "Created in 1847 at the Chiboust bakery on the rue Saint-Honoré and named for the street, which honours the patron saint of bakers; the house's pastry chef Auguste Julien "
           "is usually credited. The first version was a brioche, rebuilt on puff pastry ringed with caramel-dipped choux. Some sources push it back to about 1840.",
  "where": "The great pastry houses of the city, each with its own version."},
 {"id": "gem-opera", "pattern": "the Opéra", "tag": "Paris gem · born here", "name": "A cake for the opera house",
  "story": "Generally credited to 1955 at Dalloyau, where Cyriaque Gavillon layered almond sponge soaked in coffee syrup with coffee buttercream and ganache so that one bite carried "
           "everything; his wife Andrée named it for the Palais Garnier. Lenôtre (1960) and the chef Louis Clichy are rival claimants; Le Monde credited Gavillon in 1988.",
  "where": "Dalloyau, 101 rue du Faubourg Saint-Honoré, the house of origin."},
 {"id": "gem-tartare", "pattern": "tartare", "tag": "Paris gem · a myth corrected", "name": "No saddle, no Tatars",
  "story": "The tale of horsemen tenderising raw meat under their saddles goes back to Joinville in the thirteenth century, and the saddle meat was for the horse's sores. "
           "The dish is prosaic and Parisian: steak à l'américaine in the early 1900s, and Escoffier's 1922 Guide Culinaire defines 'à la tartare' as that steak "
           "without the egg yolk but with tartare sauce.",
  "where": "A bistro that cuts it by hand, to order."},
 {"id": "gem-jambon-beurre", "pattern": "jambon-beurre", "tag": "Paris gem · born here", "name": "Fuel for the porters",
  "story": "A split baguette, good butter, boiled ham, nothing else: it took shape in the nineteenth century as cheap fuel for the porters of Les Halles, with the baguette becoming "
           "its bread in the 1920s. It is still the country's benchmark sandwich, even after hamburgers outsold it in 2017 by the Gira Conseil count.",
  "where": "A good boulangerie, or the counter near the Opéra in the tables."},
]

GLOSS = [
 ["zinc", "the café bar counter, named for the metal it was sheathed in"],
 ["comptoir", "the counter of a café or bar, where drinks cost less than at a table"],
 ["terrasse", "the pavement tables of a café"],
 ["apéro", "the drink before dinner, and the hour it is drunk"],
 ["ballon de rouge", "a glass of red wine at the bar"],
 ["carafe d'eau", "a jug of tap water, free on request"],
 ["prix comptoir", "the cheaper counter price, posted by law"],
 ["flânerie", "unhurried, aimless walking and watching the city"],
 ["flâneur", "a man who walks the city to watch it"],
 ["quignon", "the heel of a baguette, eaten on the way home"],
 ["baguette de tradition", "the legally defined baguette: flour, water, salt, yeast, no additives"],
 ["boulangerie", "a bakery that kneads and bakes its bread on the premises (a protected term)"],
 ["pâtisserie", "a pastry shop, or pastry itself"],
 ["miche", "a large round country loaf"],
 ["viennoiserie", "croissants, pains au chocolat and the other laminated breakfast pastries"],
 ["jambon-beurre", "ham and butter in a split baguette"],
 ["croque-monsieur", "a grilled ham-and-cheese sandwich"],
 ["bistro", "a small neighbourhood restaurant with a short card"],
 ["bistronomie", "the neo-bistro: fine-dining cooking at bistro prices"],
 ["néo-bistrot", "the young chef's bistro of the 2000s: short menu, natural wine"],
 ["brasserie", "a big all-day restaurant, Alsatian by origin: beer, choucroute, oysters"],
 ["bouillon", "a nineteenth-century workers' canteen with a long cheap menu"],
 ["crémerie", "a dairy shop that became a cheap dining room"],
 ["cave à manger", "a wine shop you can eat in"],
 ["caves à manger", "wine shops you can eat in"],
 ["vin nature", "natural wine: organic grapes, nothing added, little or no sulphur"],
 ["vigneron", "a grower who makes his own wine"],
 ["récoltant-manipulant", "a Champagne grower who makes and bottles his own (RM on the label)"],
 ["gamay", "the grape of Beaujolais"],
 ["Beaujolais nouveau", "the year's first gamay, released the third Thursday of November"],
 ["pastis", "the anise spirit of Marseille, drunk with water"],
 ["poiré", "pear cider"],
 ["cidre", "apple cider"],
 ["café crème", "espresso with steamed milk, a morning drink"],
 ["express", "an espresso"],
 ["oeuf mayonnaise", "a halved hard-boiled egg under mayonnaise, the bistro starter"],
 ["steak au poivre", "a steak crusted in cracked pepper, with a cognac-cream sauce"],
 ["onglet", "hanger steak"],
 ["bavette", "flank steak"],
 ["blanquette de veau", "veal in a white cream sauce"],
 ["confit de canard", "duck leg slow-cooked and kept in its own fat"],
 ["ris de veau", "veal sweetbreads"],
 ["riz au lait", "rice pudding"],
 ["galette", "the buckwheat crêpe of Brittany, savoury"],
 ["galette des rois", "the January almond cake with a charm (fève) inside"],
 ["affineur", "a cheese ager who ripens cheese in his own cellars"],
 ["fromagerie", "a cheese shop"],
 ["épicerie", "a grocery; a fine-food shop"],
 ["marché", "a market"],
 ["arrondissement", "one of the city's twenty numbered districts"],
 ["quai", "a riverside embankment"],
 ["quais", "the riverside embankments"],
 ["passage", "a nineteenth-century covered shopping arcade"],
 ["hôtel particulier", "a grand private town house"],
 ["guinguette", "a riverside open-air dance hall and tavern"],
 ["grève", "a strike"],
 ["chanson", "the French sung song: Piaf, Brel, Brassens"],
 ["French touch", "the Paris house music of the 1990s: Daft Punk and the rest"],
 ["salon de thé", "a tea room"],
 ["Belle Époque", "the gilded years, roughly 1870 to 1914"],
 ["Art Nouveau", "the curving style of 1890 to 1910: Guimard's metro"],
]
