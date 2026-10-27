"""Hand-written prose for the Bozcaada-NorthAegean GOLD6 build (27 Oct 2026). Facts only from the guide (its May–June 2026 research),
the 27 Oct re-check packs in research/, and nothing else. The old page's lead, soul, history, eat, drink, why-now and money blocks are
rebuilt here as one essay (transformed, not pasted); the facts that now have a card of their own (the Aeneid and the coins, phylloxera,
Lausanne and the Greek community, the castle, the Ayazma chapel, the grapes, the GI table grape, the tomato jam, the dishes) are
pointed to, not retold. The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board
and its pointer, the calendar, the month table, the craft section, the listening room, Autour, the food-history fold) is written here
for the first time."""
import re, html as H

TITLE = "Bozcaada, Çanakkale — Terroir Guide"
DESC = ("Bozcaada, the wine island at the mouth of the Dardanelles, for people who cook: grilled squid and raw fish under the vine at a "
        "meyhane founded in 1950, ada mantısı fried before it is sauced, tomato jam from the Wednesday market, and the island’s own "
        "grapes poured at the cellar door — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Bozcaada</h1><div class="region">Tenedos · Çanakkale · North Aegean · Türkiye</div><div class="philosophy">"A '
        'small island of wind and vines in the mouth of the Dardanelles: a castle on the harbour, two quarters under one bell tower, '
        'and squid on the coals while the meltem bends the low vines."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Bozcaada: the grey island, in Turkish. To the Greeks, and to Virgil, it was Tenedos.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The Turkish name came with the Ottomans; the Greek '
          'one is three thousand years older and still on the island’s wine labels and in its church. The other word you need is the '
          'meltem, the steady summer north wind of the Aegean, which the islanders call poyraz when it blows hard from the north-east '
          'and which decides where you swim, how the vines are trained and when the ferry runs.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Bozcaada is a small wine island off the Troad coast, a short ferry from Geyikli:</strong> one harbour '
        'town under a castle, vines over much of the rest, and a table that eats off two heritages at once, the fishing island’s grilled '
        'squid and raw fish and the Greek community’s meze and syrup sweets. <strong>Make or break:</strong> drink the island’s own '
        'grapes at the cellar door, and eat squid off the coals under a vine. <strong>The warning:</strong> it is a summer island. From '
        'late autumn most of it closes and many residents leave for the mainland; every card says whether it is open in winter.</p></div>')

ESSAY_LEDE = ("Bozcaada is a single crop on a rock in the wind. The meltem blows so steadily that the vegetation grows low and hard, and "
              "the vines are pruned into knee-high bushes and left to the dry summer. Read the island as you would read a vineyard: "
              "the wind, the soil, the people who worked it and the people who drink it.")
ESSAY = [
 ("", "The wind is the whole argument. It dries the dew off the grapes before mould can take hold, so the vines need little spraying and "
      "no irrigation; it makes the south-coast beaches calm when it blows and turns the north cape into a kite beach. The vines are the "
      "island’s own varieties, not the international ones: two whites and two reds whose names you will see on every list, each with "
      "its card under Boire &amp; sortir. When phylloxera arrived is a question the sources answer differently; the curiosity card says how."),
 ("", "Then the people. For centuries the island’s wine was made by its Greek Orthodox families, and the treaty that ended the war in "
      "1923 left Tenedos to Turkey with its Greek inhabitants exempted from the exchange of populations. The community still shrank to "
      "a few dozen, and Turkish families took up the presses. That story, and the cellars that came out of it, is the history fold; "
      "the numbers are a curiosity."),
 ("The quintessence", "The table is the meyhane’s: meze in waves, rakı with water, squid laid over the coals rather than battered, raw "
      "fish with torn basil, and a plate of the island’s tomato jam against white cheese. Add the home cooking of the back streets, "
      "dumplings fried before they are sauced, and the Rum sweets of the pastane by the mosque, and you have eaten the island’s two "
      "halves in one evening."),
]
HISTORY = [
 "The town is one small grid, walkable in a quarter of an hour: the harbour and the castle square, the Rum quarter rebuilt in straight "
 "streets after a fire, and the older Turkish mahalle beyond the dividing street. Everything else is out among the vines and on the "
 "beaches, reached by bicycle, scooter, dolmuş or taxi.",
 "There is no airport and no bridge. The car ferry crosses from Geyikli on the mainland; Çanakkale and the Troy road are an hour beyond it.",
]
MONEY = [
 "Wine is the island’s engine, but tourism is its till. Much of the island is under vine, worked without irrigation; yet commercial "
 "wine fights a labour shortage, a heavy tax on alcohol and the distance to the drinking cities, so many islanders make wine in small "
 "batches for themselves. The money is in the summer visitor, and the harbour front is built for volume.",
 "That is the line you can taste. The value is at the cellar door, at the Wednesday market for the tomato jam and the GI Çavuş grape, "
 "and at the tables where the squid comes off the coals and the meze come out in waves.",
]
WHY_NOW_PARA = ("<p>And the clock is the wind and the grape. Late May and June are warm and uncrowded, the cellar doors open; August is "
                "full, the beds booked and the beaches crowded; the first week of September brings the harvest and its festival, the one "
                "moment the delicate Çavuş is in your hand rather than in a bottle. From late autumn to spring the island empties and much of "
                "the food scene shutters: whoever comes in November gets the castle and the vines to themselves, and must check every door.</p>")


def soul_fold():
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">An island in the wind, its own grapes, two communities, and a table that eats off both</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"sources": []}
VENUE_TEXT_EDITS = [
 ("for two people", "for at least two people"), ("/ two", "to share"), ("for two", "to share"),
 ("romantic", "quiet"), ("Romantic", "Quiet"), ("curated", "chosen"), ("iconic", "best-known"), (" ★ ", " "), ("★", ""),
]

BOUGIE_GO = ('Taste what the story is about: a glass of Çavuş at <a href="#venue-v08-talay">Talay’s shop in town</a>, the red at '
             '<a href="#venue-v02-corvus">Corvus</a>, and the meze it was made for at <a href="#venue-v04-asmali-meyhane">Asmalı Meyhane</a>.')
def bougie(b):
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     f'<div class="sfold__title">{H.escape(b["title"], quote=False)}</div>',
     f'<div class="sfold__desc">{H.escape(b["desc"], quote=False)}</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     f'<p class="gx-lede">{H.escape(b["lede"], quote=False)}</p>'] + [f"<p>{H.escape(p, quote=False)}</p>" for p in b["paras"]]
     + [f"<p>{BOUGIE_GO}</p>", "</div>", "</details>"])

DROP_CARDS = []
LANDMARK_KEEP = []

FOLDS = {
 "quartiers": {"title": "The town — two quarters and a harbour", "desc": "The Rum quarter on its grid, the older Turkish mahalle, and the harbour under the castle",
               "lede": "The town is the only settlement on the island and you can cross it on foot in a quarter of an hour. The beaches and the vines are a ride away."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "The island in Virgil, the late louse, and the island left out of the exchange",
                 "lede": "Three stories the island tells about itself, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the market, the jar and the grape", "desc": "Where a galley provisions: the Wednesday market under the castle, the tomato jam, and the island’s registered table grape",
                  "lede": "Shop on a Wednesday morning if you can. Bring cash, and a cool bag for the cheese."},
 "calas": {"title": "Beaches & coves — read the wind", "desc": "When the north wind blows, the south coast’s sand; when the south wind turns, the clear coves of the east and the rocks of the west",
           "lede": "Swimming here is organised by wind, not by postcode: on a north wind you swim the south coast (Ayazma, Sulubahçe, Habbele); when the wind turns south you cross to the other shores. Out of season the beach cafés are shut and you bring everything."},
 "walks": {"title": "Walks — up, out and through the vines", "desc": "The island’s high point, the western cape at sunset, and the vineyard country between",
           "lede": "There is little shade anywhere on the island. Walk early or late, carry water, and expect the wind."},
 "culture": {"title": "Culture — the castle, the church, the mills and the spring", "desc": "The harbour fortress, the last Greek church, the island museum; the rebuilt windmills and the chapel under the plane trees",
             "lede": "Three stops in town, two out on the island. Check the winter hours: the island’s season is short."},
 "craft": {"title": "The hand — craftsmanship", "desc": "What the island makes, who still makes it, what each is missing, and what the shops sell as island-made",
           "lede": "The island makes wine, jam and sweets, and little else by hand."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "The plane tree, the specialty bar, and the bakery in the old quarter",
                    "lede": "The island takes its coffee under trees and on the street. For an hour of work, the specialty bar."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The island’s four grapes by name, the rakı that goes with the meze, the late bar, and the cellars",
          "lede": "Learn four grape names and every list on the island makes sense. Then taste at a cellar door: most are in town."},
 "listening": {"title": "Hi-fi & listening — the room, and the night", "desc": "The honest word on a listening room, and the music the island has",
               "lede": "Bozcaada is a summer town after dark and a quiet one the rest of the year."},
 "around": {"title": "Autour — across the strait", "desc": "Troy and its museum, the other island of the treaty, and the temple at Assos",
            "lede": "Everything off the island starts with the ferry to Geyikli. Plan a car on the mainland side."},
 "avoid": {"title": "What to skip", "desc": "The island keeps two versions of itself: the summer one built for volume, and the one two streets back",
           "lede": "Three things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the municipality, the ferry, the wine"},
}

GDESC = {
 ("quartiers", "One town, two grids"): "The grid rebuilt after the fire, the older streets beyond it, and the quay where the town meets the ferry.",
 ("curiosities", "The record, corrected"): "The island in the Aeneid, the louse that came late, and the treaty that left the island its Greeks.",
 ("provisioning", "The market and the jar"): "The Wednesday market, the tomato jam, and the island’s registered table grape.",
 ("calas", "The south coast, on a north wind"): "Sand and shallow water facing away from the north wind: the busy one, the quiet one, and the bay of the campers.",
 ("calas", "East and west — clear water and the wind"): "The snorkelling cove, the kite beach on the north cape, and the rocks of the east.",
 ("walks", "Up, out and through the vines"): "The high point on foot, the cape and its light at sunset, and the vineyard roads.",
 ("culture", "In town"): "The fortress on the harbour, the church with the bell tower, and a private museum of the island’s layers.",
 ("culture", "Out on the island"): "The rebuilt stone windmills, and the chapel and its spring under the plane trees.",
 ("craft", "Do this one"): "The closest the island comes to a class.",
 ("craft", "The others, and what each is missing"): "Real makers, real places: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as island-made, and is not.",
 ("coffee-gardens", "Places to sit"): "Under the plane tree, a proper espresso, and coffee with the island’s bakes.",
 ("bars", "Ask for it by name"): "The two whites and the two reds the island grows and almost nobody else does.",
 ("bars", "The meal's partner, and the late glass"): "The rakı poured with the meze, and the bar in the back lanes.",
 ("bars", "The cellars, and the route between them"): "How to taste your way round the island, and the cellar that started in a Greek shop.",
 ("listening", "The listening room"): "Where to hear records properly, honestly checked.",
 ("listening", "Live, and late"): "The music the island actually has.",
 ("around", "Across the strait"): "Troy on the mainland, and the other island left out of the exchange.",
 ("around", "Up the coast"): "The temple above the sea at Behramkale.",
 ("avoid", "The season and the crossing"): "The winter trip for the food, and the summer queue for the car ferry.",
 ("avoid", "At the table"): "The set menu on the harbour front.",
 ("follow", "The island"): "The municipality and the ferry.",
 ("follow", "The wine"): "Who writes about the island’s wine.",
}

TABLES_DESC = ("A meyhane founded in 1950 at one end and a scoop of ice cream at the pastane by the mosque at the other: at most three "
               "tables of each kind, picked for what you should not miss here, every card saying when it was last confirmed and whether "
               "it opens in winter.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE WINE STORY", "quarters": "THE TOWN", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "beaches": "BEACHES", "walks": "WALKS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "WINE & THE GLASS", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the wine story, the town, the record corrected, the season", "tables": "",
               "flaner": "the beaches, the walks, the castle and the church, the hand, the cup",
               "sortir": "the grapes by name, the cellars, the night", "around": "Troy, Gökçeada, Assos",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The island has no starred room; its grand tables are the meyhanes, where you book, sit for hours and let the meze come.",
              "petite": "Where this guide actually lives: the home cooking of the back streets, and the cellar doors where the island’s grapes are poured.",
              "street": "On foot and early: the market under the castle, the pastane by the mosque, and the roaster."}

LANE_LEAD = {}
LANE_STORY = {}
CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the glass, the table, the last glass.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the island’s wine story, the market and the jar, the four grapes, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, honest about the season.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the island’s year: the saint’s day at the spring in July, the music in summer, the grape harvest in September"
SEASONAL_DESC = "The year in one table: the work in the vines, the sea and the table, what is on, and what is open"
SEASONAL_LEDE = "The island has two years: a short summer when everything is open, and a long winter when much of it is shut. Read the notes column before you plan."

from liste import LISTE, LANE_LEAD_TEXT, SHORT_SUB_TEXT   # noqa: E402
LANE_LEAD.update(LANE_LEAD_TEXT); SHORT_SUB.update(SHORT_SUB_TEXT)
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

from liste import DISHES, DISH_DESC   # noqa: E402


def dish_articles(old):
    from liste import DISH_WHERE as W
    tr = str.maketrans({"ç": "c", "ş": "s", "ğ": "g", "ı": "i", "ö": "o", "ü": "u", "Ç": "c", "Ş": "s", "İ": "i", "Ö": "o", "Ü": "u", "’": "-", "é": "e"})
    out = []
    for name, body, origin in DISHES:
        aid = "o-" + re.sub(r"[^a-z0-9]+", "-", name.lower().translate(tr)).strip("-")[:28]
        where = W.get(name)
        out.append(f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{name}</span></h3>'
                   f'<p class="tcard__body">{H.escape(body, quote=False)} <b>Origin.</b> {H.escape(origin, quote=False)}</p>'
                   + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")
    return "".join(out)


def sources_edit(s):
    """The old fold named its sources without links: kept, as a citation line, under the method; the links checked now follow."""
    s = s.replace('<div class="sfold__desc">Named, checkable</div>', '<div class="sfold__desc">Where every fact came from, and when it was last checked</div>')
    s = s.replace('<details class="sfold" id="sources" open>', '<details class="sfold" id="sources">')
    s = s.replace('<div class="prose"><p>', '<h4 class="fsub__title">The earlier edition’s sources (May–June 2026), by name</h4><div class="prose"><p style="font-size:0.82em">', 1)
    s = s.replace("TripAdvisor / RestaurantGuru (venue ranks). &middot; ", "")
    return s


from liste import GEMS, PHOTOS   # noqa: E402

GLOSS = [
 ["meltem", "the steady summer north wind of the Aegean"],
 ["poyraz", "the north-easterly wind: when it blows, swim the south coast"],
 ["lodos", "the south-westerly wind: when it blows, cross to the north and east"],
 ["meyhane", "a tavern of meze and rakı, the long evening table"],
 ["meze", "the small plates that come out in waves before and with the fish"],
 ["rakı", "the anise spirit drunk with water and the meze"],
 ["ev yemeği", "home cooking: the stews and dumplings of a family kitchen"],
 ["mantı", "small hand-pinched dumplings, sauced with yoghurt and chilli butter"],
 ["ada mantısı", "the island’s mantı: fried before it is sauced"],
 ["pastane", "a pastry shop and café"],
 ["dondurma", "Turkish ice cream"],
 ["reçel", "a fruit preserve or jam"],
 ["domates reçeli", "tomato jam, the island’s best-known preserve"],
 ["kalamar", "squid"],
 ["mahalle", "a quarter of a town"],
 ["Rum", "the Greek Orthodox community of Anatolia and the islands"],
 ["ayazma", "a holy spring, from the Greek hagiasma"],
 ["kale", "a castle or fortress"],
 ["bağ bozumu", "the grape harvest, and the island’s harvest festival"],
 ["Çavuş", "the island’s white grape, eaten fresh and made into dry white wine"],
 ["Vasilaki", "the island’s other white grape, crisp and high in acid"],
 ["Karalahna", "the island’s dark, tannic red grape"],
 ["Kuntra", "the island’s lighter red grape"],
 ["dolmuş", "a shared minibus that leaves when it is full"],
 ["iskele", "a quay or ferry landing"],
 ["şarap", "wine"],
 ["şarapçılık", "winemaking: the word on a winery’s sign"],
 ["Tenedos", "the island’s ancient Greek name"],
 ["Imbros", "the Greek name of Gökçeada, the other island of the treaty"],
 ["tatlı", "a sweet or dessert"],
 ["mafiş", "a fried bow-shaped pastry soaked in syrup, from the Rum kitchen"],
 ["lüfer", "bluefish, the autumn fish of the straits"],
 ["palamut", "Atlantic bonito, running through the straits in autumn"],
]
