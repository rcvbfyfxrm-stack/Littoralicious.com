"""Hand-written prose for the Var-Provence GOLD6 build (17 Oct 2026). Facts only from the guide (its July 2026 research), the
17 Oct re-check packs in research/, and nothing else. The old page was a pre-GOLD2 tier inventory written without accents;
the essay is rebuilt here from its soul, story and 'where the money sits' blocks (transformed, not pasted), and the facts that
now have a card of their own (the navy, the exiles, the landings, the fig, the Tempier story) are pointed to, not retold.
The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer,
the calendar, the craft section, the listening room, the coves, Autour) is written here for the first time."""
import re, html as H

TITLE = "The Var — Terroir Guide"
DESC = ("The Var for people who cook: the three-star sauces of the Bouillabaisse beach and the cade cart on the Cours Lafayette, "
        "Bandol's black Mourvèdre, the truffle market at Aups, the chestnut village of the Maures, the islands, the coves and the customs path — "
        "at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>The Var</h1><div class="region">Provence-Alpes-Côte d’Azur · France</div><div class="philosophy">"The half of the '
        'Côte d’Azur that still works for a living: a warship town, a wine that ages for decades, and a forest of cork oak behind the beach clubs."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>From the river Var — Varus to the Romans — which the department was named after in 1790.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>When the Revolution cut France into departments in 1790, '
          'this one took the name of the river on its eastern edge, then the frontier with the County of Nice. Provence itself is older still: '
          'the Romans called the coast simply their provincia, the province. What became of the river is one of the curiosities below.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>The Var is the working half of the Côte d’Azur:</strong> a naval port, a wine country and two forests, '
        'with Saint-Tropez on one corner of it. <strong>Make or break:</strong> book the grand night before you fly, and check the season — most '
        'of the coast’s best tables open in spring and close in October. Then eat in Toulon, in the hill villages and at the cellar doors, '
        'where the bill is a third of the gulf’s. <strong>The warning:</strong> a laminated photo-menu on a quay is selling you the view; walk '
        'two streets back, or drive twenty minutes inland. The bay of Cavalaire has its own guide.</p></div>')

ESSAY_LEDE = ("The Var is the Côte d’Azur’s other half — the half that never needed the sunglasses. Wedged between Nice and Monaco to the east and "
              "Marseille to the west, it keeps the largest forests of the region: the cork oak and chestnut of the Maures, the red porphyry of the Esterel. "
              "More than half the department is wooded, a share only the Landes beats in France. This is a coast that still works for a living.")
ESSAY = [
 ("", "Its capital is a warship town, not a resort: the roadstead of Toulon is the French navy’s Mediterranean home, and its card among the "
      "curiosities has the numbers. Offshore lie the Îles d’Hyères — Porquerolles, Port-Cros, Le Levant — much of them national park, and Hyères "
      "itself was the Riviera’s first winter resort, all palms and Belle Époque villas, decades before Cannes learned the trick."),
 ("", "Saint-Tropez is here too, with the yachts walled along its quay and Club 55 on the sand. But twenty minutes’ drive puts you in a vigneron’s "
      "cellar under the Castellet, or in a market where the cade is still baked in a copper pan over wood. The Var wears both without apology."),
 ("The quintessence", "The ritual is the apéro at the hour the light goes amber: a cold bottle of Provence pink — or a serious Bandol — on a café table "
      "by the port at Sanary or Le Brusc, a saucer of tapenade and olives, pastis for the older men, the boules clicking on the gravel. The morning "
      "version is the market, heaped with tomatoes, figs and chickpea galettes. And to walk it off, the old customs path round the capes."),
]
HISTORY = [
 "The vine came by sea. Greek sailors from Phocaea, the founders of Marseille, brought it to this coast in the sixth century BC; the Romans terraced "
 "the slopes above what is now Bandol and shipped the wine from its port. At Fréjus they raised Forum Julii around 49 BC, and Octavian brought "
 "home there the galleys he took from Mark Antony at Actium in 31 BC.",
 "Toulon’s deep, sheltered roadstead made it the navy’s, from Henri IV’s shipyard of 1599 onward. Inland, the Maures lived for centuries on cork, "
 "chestnuts and wine — the cork oak of the massif stoppered the bottles of the south. Then in 1941 one grower won Bandol its own appellation, built "
 "on an old, stubborn black grape: that story is told just below.",
 "Two later chapters made the modern Var, and each has its own card: the interwar avant-garde that the Noailles drew to their villa above Hyères, "
 "the German writers who found refuge in Sanary after 1933 — and, on 15 August 1944, the landings that Provence remembers as its own D-Day.",
]
MONEY = [
 "Three economies share this coast. The oldest and steadiest is the navy: permanent, unglamorous money that has nothing to do with the season. "
 "The loudest is summer and the yacht trade — the port of Saint-Tropez takes boats to about 70 metres, and a week’s charter on the gulf runs "
 "from tens of thousands of euros to a million (seen July 2026).",
 "The quiet fortune is wine. Provence pours a large share of the world’s rosé, and pale pink became a luxury category: that is where the markup "
 "lives, and a fashionable bottle can cost more than a red of real substance. The value sits west, in Bandol — age-worthy Mourvèdre reds, still a "
 "fraction of the price of a comparable Burgundy or Bordeaux. And Toulon, for all its want of glamour, is where you eat and drink honestly for a "
 "third of a Saint-Tropez bill.",
]
WHY_NOW_PARA = ("<p>And the clock is the season. The palace tables and the Pampelonne clubs open in spring and close in autumn; the hills run the "
                "other way, with the chestnut Sundays in October and the black truffle from late November. Whoever slips to a working port, inland "
                "to the cellars, or onto a ferry to a car-free island gets the Var the August crowd never sees.</p>")


def soul_fold(soul, history, money):
    """The essay: the old soul, story and 'where the money sits' blocks, rewritten with their facts (accents restored, the navy,
    exile and landing numbers moved to their own curiosity cards) and merged into one read."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A warship town, a forest of cork oak, a black grape that ages for decades, and the gulf that made '
                      'the rest of the coast famous</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"soul": [], "history": [], "money-sits": [], "seasonal": [], "tables": [], "why-now": [], "story-box": [], "sources": []}

# The food-history callout (#bougie): the old one-story fold (1941, the Peyrauds), edited — accents, and a pointer to the cellar doors.
BOUGIE_BODY_EDITS = [
 ("Mourvedre", "Mourvèdre"), ("Provencal", "Provençal"),
]
GV_LINE = ("Tempier is not a table in this guide: it receives by appointment, and the Bandol wine country card under Autour says how. Two of the "
           "appellation’s other references are, in the cellar doors among the tables: "
           '<a href="#venue-v-chateau-de-pibarnon">Château de Pibarnon</a> on its amphitheatre of terraces, and '
           '<a href="#venue-v-domaine-de-terrebrune">Domaine de Terrebrune</a> at Ollioules.')
def bougie(old_story_box, go_line):
    paras = re.findall(r'<p class="(?:gx-lede|tcard__body)"[^>]*>(.*?)</p>', old_story_box, re.S)
    lede, p1, p2, p3 = paras[0], paras[1], paras[2], paras[3]
    for a, b in BOUGIE_BODY_EDITS:
        lede, p1, p2, p3 = lede.replace(a, b), p1.replace(a, b), p2.replace(a, b), p3.replace(a, b)
    p4 = ("The rule Lucien Peyraud wrote is still the law of the glass: at least half Mourvèdre in the red, and a long rest in wood before it is sold. "
          + go_line + " La liste at the foot pours it.")
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     '<div class="sfold__title">1941 — the grower who saved a black grape</div>',
     '<div class="sfold__desc">Not a château legend but a farm at Le Plan-du-Castellet: how Bandol was rebuilt round Mourvèdre, and how a Provençal kitchen table reached California</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     f'<p class="gx-lede">{lede}</p>', f"<p>{p1}</p>", f"<p>{p2}</p>", f"<p>{p3}</p>", f"<p>{p4}</p>", "</div>", "</details>"])

DROP_CARDS = []

FOLDS = {
 "quartiers": {"title": "The towns — the gulf, the working ports, the palm town", "desc": "Eight places in three rings: Saint-Tropez and its perched villages, the ports that still fish and build ships, Hyères and the chestnut village of the Maures",
               "lede": "The Var is a department, not a city: its quarters are towns, and a car or a boat joins them. Saint-Tropez is where it shows off, Toulon and the western ports are where it works, and the villages are where it eats."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "The fig with its own appellation, the cork that survives the fire, the Australian mimosa, the golden islands, the navy, the river the Var lost, the landings and the exiles",
                 "lede": "Eight things the coast’s own story tells slightly wrong, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — markets, oil, figs, chestnuts and the wine shops", "desc": "Where a galley provisions: two markets and the truffle Thursday, an old olive mill, the fig growers, the chestnut confectioner, and three places to buy the wine",
                  "lede": "Shop the markets in the morning — they fold by half past twelve and most rest on Monday. The truffle sells from late November, the figs from late August, the chestnuts in October; the cards give the days."},
 "walks": {"title": "Walks — the capes, the canyon and the forest", "desc": "Five routes: the double sandbar and the salt pans, the customs path round the capes, the mountain over the roadstead, Europe’s great canyon and the monastery in the chestnut woods",
           "lede": "Walk the coast in the morning and the forest in the afternoon, and never in the Maures on a red-flag fire day, when the massif’s roads and paths may close."},
 "calas": {"title": "The coves — island water and mainland sand", "desc": "The island beach of pines, the snorkel trail of the first marine park, the sandbar the Club Med never got, and the public end of Pampelonne",
           "lede": "The sea is warm from June to early October. The islands have the clearest water and no cars; the mainland coves are a walk from the car park. Bring water: there is rarely a kiosk."},
 "culture": {"title": "Culture — the patrons, the painters and the rock", "desc": "The modernist villa above Hyères, the barefoot foundation on Porquerolles and the gardener’s domain; the citadel, the church and the painters of Saint-Tropez; the president’s fort and the tortoises",
             "lede": "Most of these keep a season and some close at midday: check the card before you drive. Several have a garden to walk, and two are reached by boat or on foot."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one workshop where you can learn from a named hand, the others and what each is missing, and the honest word on what is sold as Provençal",
           "lede": "The Var’s crafts are older than its beaches — clay, briar, wool, wood — but most of the hands sell rather than teach. The card at the top is the one that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "Three roasters for the coffee itself, and the two terraces that are institutions",
                    "lede": "The honest truth first: the port café is for the terrace, not the crema. For the cup, go to the roasters of Toulon, Hyères and Lorgues; for an hour of watching, the red chairs on the quay."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The three bottles to ask for by name, the other glasses, three natural-wine counters in Toulon, a glass above the gulf, Pampelonne’s clubs and the night",
          "lede": "The Var drinks pink at six and black Mourvèdre at dinner. Learn the three wines by name; then the counters of Toulon, a terrace above the gulf at dusk, a beach club in its own register, and the cellar under the Byblos."},
 "listening": {"title": "Hi-fi & listening — the honest answer and the live rooms", "desc": "No true hi-fi bar on this coast, said plainly, and the record shop that comes closest; then the music room, the open-air stage in the pines and the artists’ house of Toulon",
               "lede": "The Var listens outdoors in summer and in Toulon the rest of the year. Check the night’s programme before you go."},
 "around": {"title": "Autour — out of the department’s middle", "desc": "Europe’s great canyon and the faïence village, the golden islands, and the hill villages of the wine and the truffle"},
 "avoid": {"title": "What to skip", "desc": "The coast keeps two versions of itself: what it sells on the quay in August, and what it does one street back and one month later",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the department and the gulf’s tourist offices, the island park, the Bandol growers, the villa and the red guide"},
}

GDESC = {
 ("quartiers", "The gulf of Saint-Tropez"): "The fishing port that became a myth, the two perched villages over Pampelonne, and the medieval lanes of Bormes.",
 ("quartiers", "The working ports"): "The navy’s town and its market street, the painted boats of Sanary, and the port that gave its name to the wine.",
 ("quartiers", "The palm town and the chestnut village"): "The Riviera’s first winter resort, and the village of the Maures that lives on the chestnut.",
 ("curiosities", "What grows here"): "A fig with its own appellation, a bark that outlives the fire, and a yellow flower that came from the other side of the world.",
 ("curiosities", "The sea and the navy"): "Why the islands are called golden, the fleet in the roadstead, and the river that gave the department its name and then left it.",
 ("curiosities", "The other D-Day, and the exiles"): "August 1944 on these beaches, and the German writers who sat out the 1930s on Sanary’s quay.",
 ("provisioning", "The markets"): "The kilometre of stalls in Toulon, the Wednesday port market of Sanary, and the truffle Thursday at Aups.",
 ("provisioning", "Oil, figs and chestnuts"): "A sixteenth-century olive mill, the black figs of Solliès, and the chestnut workshop of Collobrières.",
 ("provisioning", "Where to buy the wine"): "The appellation’s own counter in Bandol, the Côtes de Provence house on the RN7, and a caviste on the Giens road.",
 ("walks", "Along the sea"): "The double sandbar and its flamingos, the customs path round the capes, and the mountain over the roadstead.",
 ("walks", "The canyon and the forest"): "Down into the Verdon by ladder and tunnel, and up through the chestnuts to a monastery of green stone.",
 ("calas", "The island water"): "The pine-backed beach of Porquerolles, and the marked snorkel trail of Port-Cros.",
 ("calas", "The mainland sand"): "A sandbar tying a rock to the coast, and the five kilometres of Pampelonne without a club bill.",
 ("culture", "The patrons and the gardener"): "The Noailles’ white villa, a collector’s galleries under an island farmhouse, and the world’s Mediterranean gardens on one slope.",
 ("culture", "Saint-Tropez under the glamour"): "The citadel over the gulf, the church of the Bravade, and the painters who came before the yachts.",
 ("culture", "A president’s rock and the tortoises"): "The fort off Bormes you visit with a guide, and the last wild tortoises of mainland France.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Provençal-made, and is not.",
 ("coffee-gardens", "The cup itself"): "The Toulon roaster of 1928, the roastery in Hyères’ old town, and the barn in Lorgues.",
 ("coffee-gardens", "The terrace as an institution"): "The red chairs on the quay of Saint-Tropez, and a revived Toulon roasting name.",
 ("bars", "Ask for it by name"): "The red that ages for decades, the rosé that is a wine, and the pink of the apéro.",
 ("bars", "The other glasses"): "The anise habit, the fig in a bottle, and the chestnut of the Maures.",
 ("bars", "Natural wine, three counters in Toulon"): "A neighbourhood cave-bar, a thirty-square-metre shop, and a stool on the market street.",
 ("bars", "A glass above the gulf"): "The oldest balcony on the port, a hillside terrace in Gassin, and a château’s terrace over the town.",
 ("bars", "Pampelonne’s clubs, three registers"): "The quiet one, the old one, and the one that wrote the party template.",
 ("bars", "The night"): "The cellar club under the Byblos, since 1967.",
 ("listening", "The listening room, honestly"): "No hi-fi bar here: the record shop with a turntable is as close as the coast comes.",
 ("listening", "Live on the coast"): "The music room of Toulon, the stage in the pines above the sea, and an artists’ house in the old town.",
 ("around", "The canyon and the faïence village"): "The green river in its gorge, and the village under the star.",
 ("around", "The golden islands"): "Two islands the state bought or was given to keep.",
 ("around", "The hill villages and the wine"): "A village under a tufa cliff, the village in the sky and the truffle town, and the Bandol hills.",
 ("avoid", "Four to skip"): "Saint-Tropez in August, the quay with the photo-menu, and the beach as the whole trip.",
 ("avoid", "Read the glass"): "The pale pink in the ice bucket.",
 ("follow", "The territory"): "The department, the gulf, and the island park.",
 ("follow", "The wine, the art and the red guide"): "The Bandol growers, the villa above Hyères, and the MICHELIN selection.",
}

TABLES_DESC = ("Three-star sauces on a beach at one end and a cade cart on a market street at the other: at most three tables of each kind, "
               "picked for what you should not miss in the Var, every card saying when it was last confirmed and when its season runs.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "HOW IT DRINKS", "towns": "THE TOWNS", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "sea": "COVES & SWIMS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the black grape, the towns, the record corrected, the season", "tables": "",
               "flaner": "the capes and the canyon, the coves, the villa and the citadel, the hand, the roasters",
               "sortir": "the wines by name, natural wine in Toulon, the terraces, the clubs, the night and the live rooms", "around": "the canyon, the islands, the hill villages",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for — and book before you fly: the three-star and two-star houses, the starred rooms by the sea, and the houses of the hinterland.",
              "petite": "Where this guide actually lives: the tables on the sand, the old houses with a date over the door, the Haut-Var villages, the Maures and the palm coast, and the cellar doors.",
              "street": "On foot and standing: the cade from the cart, the market street of Toulon, and the chestnut workshop."}

LANE_LEAD = {
 "summit": "Donckele’s sauces on the Bouillabaisse beach, a three-star in the Bandol hills, and Canino’s seawater-poached red mullet at Ramatuelle.",
 "seastar": "A vegetable-forward room on the Salins road, a terrace on the red rocks of the Esterel, and Toulon’s own star by the opera.",
 "inland": "The truffle house of Lorgues, a golf resort’s Provençal kitchen at Tourrettes, and Ducasse’s abbey inn at La Celle.",
 "sand": "The family beach of 1955 at Pampelonne, and the two tables of Porquerolles you reach on foot or by the hotel’s shuttle.",
 "houses": "The fishermen’s inn of the old quarter, the roadside auberge of 1962 in the Maures, and the post house of Barjols with its Friday aïoli.",
 "hautvar": "The daube of Ampus, the truffle bistro of Aups, and a committed small kitchen in Cotignac.",
 "maures": "The village table of Collobrières, a medieval lane in Bormes, and the Bib Gourmand house below the Maurettes.",
 "domaines": "Mourvèdre on the amphitheatre of La Cadière, the organic estate of Ollioules, and the Templars’ commandery on the RN7.",
 "street": "The cade carts of 1989, the kilometre of the Cours Lafayette, and the marrons glacés of Collobrières.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each port — the apéro, the table, the late glass.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the grape that was saved in 1941, the markets before noon, the dishes born here, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {}   # set in fixes.py once the 17 Oct seasons are known

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the Var year: the truffle and the mimosa in winter, the Bravade and the design week in spring, the music in summer, the classic yachts, the chestnut and the wine in autumn"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): ten plates and their honest passports, rewritten from the old guide's dish articles (accents restored,
# the origin stories of the three Toulon and Saint-Tropez dishes moved to their gem popups, so each is told once).
DISH_DESC = "Ten plates and their honest, often contested, passports: which are the Var’s own, and which it borrowed from Marseille and Nice."
DISHES = [
 ("Cade toulonnaise", "A chickpea-flour galette baked thick in wide copper pans over wood, peppered and eaten hot from a paper cone. Nice’s socca is its thin, crisp cousin; Toulon’s is thicker and soft underneath. Buy it in the morning: the carts work until lunch.", "Toulon"),
 ("Chichi frégi", "A ring of wheat-and-chickpea dough fried and rolled in sugar, sold from kiosks by the sea and at the fairground. With the cade, the dish Toulon claims as wholly its own, and defends.", "Toulon (disputed with L’Estaque)"),
 ("Tarte tropézienne", "A sugar-crusted brioche split and filled with two creams, pastry cream and buttercream, sold by the slice or whole in its box. Eat it the day it is made.", "Saint-Tropez"),
 ("Grand aïoli", "Less a sauce than an occasion: raw garlic, egg yolk and olive oil whipped stiff by hand, with poached salt cod, boiled vegetables, eggs and sea snails to dip, shared at a long table. Traditionally a Friday.", "Provence"),
 ("Daube provençale", "Beef braised for hours in red wine with orange peel and herbs, by tradition in a bellied daubière that rains its steam back over the meat. The name comes from the Provençal adobar, to prepare: carters’ food, eaten in the hills in winter.", "Provence, inland"),
 ("Soupe de poissons", "What most Var bistros actually pour: rockfish simmered and strained into a rust-coloured broth, with rouille, garlic croutons and grated cheese to float on top. Bouillabaisse’s everyday cousin, and no whole fish.", "The Provençal coast"),
 ("Bouillabaisse", "The rockfish stew of fishermen’s unsold catch, rascasse essential, served in two acts since the 1980 Marseille charter: the saffron broth with rouille first, the fish on a platter after. Eaten along the Var, but honest about its passport.", "Marseille — not a Var dish"),
 ("Tapenade", "Black olives, capers and anchovies pounded with olive oil: the smear of the apéro. The name comes from tapeno, Provençal for the caper; chef Meynier of La Maison Dorée in Marseille is credited with it in 1880, and his first version carried tuna.", "Marseille"),
 ("Pieds et paquets", "Sheep’s trotters and little parcels of stuffed tripe, stewed most of a day in white wine and tomato: poverty cooking that wasted nothing. The Var eats it; Marseille and Sisteron own it.", "Marseille and Sisteron"),
 ("Thon à la provençale", "Mediterranean bluefin, grilled, or braised with tomato, olives and capers. From the seventeenth century the tuna was taken in madragues, vast net-mazes off this coast; Bardot’s house at Saint-Tropez is named for one. The traps are all but gone; the fish stayed on the menus.", "The gulf of Saint-Tropez"),
]
DISH_WHERE = {}   # name -> '<a href="#venue-...">..</a>' — filled in liste.py from the verified venues (refs resolve in the build)


def dish_articles(old):
    """The Dish: ten articles rebuilt from the old guide's dish fold (see DISHES)."""
    from liste import DISH_WHERE as W
    out = []
    for name, body, origin in DISHES:
        aid = "o-" + re.sub(r"[^a-z0-9]+", "-", name.lower().replace("é", "e").replace("ï", "i").replace("ç", "c")).strip("-")[:28]
        where = W.get(name)
        out.append(f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{name}</span></h3>'
                   f'<p class="tcard__body">{H.escape(body, quote=False)} <b>Origin.</b> {H.escape(origin, quote=False)}</p>'
                   + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")
    assert len(out) == 10, len(out)
    return "".join(out)


def sources_edit(s):
    """the old sources fold: its body carried the kit's gx-appendix class (a second appendix on the page), every link's href held the
    label text before the URL (dead on the live page), and an aggregator dump followed. The list is rebuilt clean; the dump goes."""
    s = s.replace('<div class="sfold__body gx-appendix">', '<div class="sfold__body">', 1)
    def li(m):
        href, txt = H.unescape(m.group(1)), m.group(2)
        u = re.search(r"https?://\S+$", href.strip())
        label = href[:u.start()].rstrip(" :") if u else H.unescape(re.sub(r"<[^>]+>", "", txt))
        if not u: return ""
        return f'<li><a href="{H.escape(u.group(0), quote=True)}" target="_blank" rel="noopener">{H.escape(label, quote=False)}</a></li>'
    s = re.sub(r'<li><a href="([^"]+)"[^>]*>(.*?)</a></li>', li, s, flags=re.S)
    j = s.find("<div data-added-sources")
    if j > 0:
        b = s.rindex("</div></details>")
        s = s[:j] + s[b:]
    s = s.replace("<ul>", "<ul class='gx-list'>", 1)
    return s


# gem popups: born-here food origins (each kept to what the old research says; the plates themselves are in The Dish)
GEMS = [
 {"id": "gem-tropezienne", "pattern": "tropézienne", "tag": "Var gem · born here", "name": "A cake named by a film star",
  "story": "Alexandre Micka, a Polish pastry-maker, settled in Saint-Tropez in 1945 with a family recipe for a sugar-crusted brioche filled with cream. "
           "In 1955 he was catering the shoot of Et Dieu… créa la femme and served it to Brigitte Bardot, who suggested he call it the tart of Saint-Tropez. "
           "He kept the idea and registered the name Tarte Tropézienne in 1973.",
  "where": "La Tarte Tropézienne, the house Micka founded, in Saint-Tropez."},
 {"id": "gem-chichi", "pattern": "chichi", "tag": "Var gem · born here", "name": "The fritter with two birthplaces",
  "story": "Toulon credits Alexis Guglielmi, who sold his orange-blossom chickpea fritters on the Cours Lafayette from 1907 and claimed to have invented them; "
           "the family stall closed in 2022. The claim is disputed: the treat turns up in Provençal writing decades earlier, and Marseille’s L’Estaque "
           "calls it its own.",
  "where": "The kiosks by the sea and at the fairgrounds of Toulon."},
 {"id": "gem-cade", "pattern": "the cade", "tag": "Var gem · born here", "name": "Soldiers, Genoese and a word for hot",
  "story": "Toulon’s chickpea galette has two origin stories and no proof for either. One says Napoleonic soldiers brought it and the Italian caldo, hot, "
           "became cade; the other, told at the carts, credits the Genoese workers who settled round the arsenal in the nineteenth century. Both agree it "
           "is Ligurian at heart, a cousin of the farinata of Genoa.",
  "where": "La Cade à Dédé’s carts at the Place Louis Blanc end of the Cours Lafayette."},
]

GLOSS = [
 ["apéro", "the drink before dinner, and the hour it is drunk"],
 ["pastis", "the anise spirit of Marseille, drunk with five parts water"],
 ["rosé", "pink wine, pressed briefly on the red grape skins"],
 ["Mourvèdre", "the late-ripening black grape that Bandol is built on"],
 ["foudre", "a large old oak vat for ageing wine"],
 ["foudres", "large old oak vats for ageing wine"],
 ["restanque", "a dry-stone terrace on a hillside, Provençal word"],
 ["restanques", "dry-stone hillside terraces, Provençal word"],
 ["vigneron", "a grower who makes his own wine"],
 ["domaine", "a wine estate"],
 ["caviste", "a wine merchant, a wine shop"],
 ["cave", "a wine shop or cellar"],
 ["cave à manger", "a wine shop you can eat in"],
 ["vin nature", "natural wine: organic grapes, nothing added, little or no sulphur"],
 ["AOP", "appellation d’origine protégée, the EU label tying a product to its place"],
 ["AOC", "appellation d’origine contrôlée, the French label tying a product to its place"],
 ["cade", "Toulon’s thick chickpea-flour galette, baked over wood"],
 ["socca", "Nice’s thin, crisp chickpea pancake"],
 ["chichi frégi", "a sugared chickpea-and-wheat fritter from Toulon"],
 ["aïoli", "garlic and olive-oil emulsion, and the Friday meal served round it"],
 ["grand aïoli", "the full aïoli meal: salt cod, vegetables, eggs, snails"],
 ["daube", "beef braised in red wine with orange peel"],
 ["daubière", "the bellied clay pot a daube is cooked in"],
 ["tapenade", "olive, caper and anchovy paste"],
 ["rouille", "a garlic-and-saffron mayonnaise for fish soup"],
 ["rascasse", "scorpionfish, the essential fish of bouillabaisse"],
 ["bouillabaisse", "the Marseille rockfish stew, served in two courses"],
 ["pieds et paquets", "sheep’s trotters and stuffed tripe parcels, stewed"],
 ["tropézienne", "the cream-filled brioche of Saint-Tropez"],
 ["marron glacé", "a whole chestnut candied in syrup"],
 ["marrons glacés", "whole chestnuts candied in syrup"],
 ["crème de marrons", "sweetened chestnut purée"],
 ["madrague", "a fixed net-maze for trapping tuna"],
 ["pan bagnat", "Nice’s ‘bathed bread’: a round loaf soaked with oil and salade niçoise"],
 ["pointu", "the small pointed wooden fishing boat of Provence"],
 ["pointus", "the small pointed wooden fishing boats of Provence"],
 ["pétanque", "the Provençal game of boules, played standing still"],
 ["bastide", "a Provençal country house"],
 ["mas", "a Provençal farmhouse"],
 ["garrigue", "the low scrub of thyme, rosemary and kermes oak on limestone"],
 ["maquis", "the dense evergreen scrub of the siliceous hills"],
 ["mistral", "the cold north-west wind down the Rhône"],
 ["calanque", "a narrow rocky inlet of the Provençal coast"],
 ["tombolo", "a sandbar tying an island to the mainland"],
 ["salins", "salt pans"],
 ["sentier du littoral", "the coastal footpath, the old customs path"],
 ["marché provençal", "a Provençal open-air market"],
 ["Bravade", "Saint-Tropez’s May feast of muskets and drums for its patron saint"],
 ["corso", "a flower-float parade"],
 ["faïence", "tin-glazed earthenware"],
 ["tomette", "the hexagonal terracotta floor tile of Provence"],
 ["tomettes", "hexagonal terracotta floor tiles of Provence"],
 ["terre cuite", "terracotta"],
 ["santon", "a small clay crib figure of Provence"],
 ["moulin", "a mill; here, an olive-oil mill"],
 ["Plus Beaux Villages", "the label of the association of the most beautiful villages of France"],
 ["Belle Époque", "the gilded years, roughly 1870 to 1914"],
 ["Îles d’Or", "the golden islands: Porquerolles, Port-Cros and Le Levant"],
 ["chartreuse", "a Carthusian monastery"],
 ["rade", "a roadstead, a sheltered anchorage"],
]
