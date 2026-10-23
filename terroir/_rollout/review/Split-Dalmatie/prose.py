"""Hand-written prose for the Split-Dalmatie GOLD6 build (23 Oct 2026). Facts only from the guide (its May 2026 research), the
23 Oct re-check packs in research/, and nothing else. The old page's lead, history, eat, drink and walk blocks are rebuilt here as one
essay (transformed, not pasted); the facts that now have a card of their own (the palace's plan, the cathedral's irony, the sphinx,
the White House stone, the Zinfandel discovery, the dishes) are pointed to, not retold.
The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer, the
calendar, the craft section, the listening room, the swims, Autour, the food-history fold) is written here for the first time."""
import re, html as H

TITLE = "Split, Dalmatia — Terroir Guide"
DESC = ("Split for people who cook: the fish hall and the green market at the palace gates before nine, a konoba in Veli Varoš, "
        "lamb under the bell ordered a day ahead, Pošip and Plavac Mali, and the vines that turned out to be Zinfandel — at most three "
        "places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Split</h1><div class="region">Dalmatia · Croatia</div><div class="philosophy">"An emperor built himself a '
        'palace to die in; his neighbours moved into it and never left. Seventeen centuries later the market still trades at its gate."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Split is Spalatum, and the Romans’ word for the place was probably a shrub, not a palace.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The old story says Spalatum comes from palatium, the '
          'palace. The likelier root is the Greek and Latin name of a spiny broom that grew on this shore, aspalathos, recorded for the bay '
          'before Diocletian built anything. The Venetians wrote Spalato; the Croats say Split. The sources still argue; the palace is the '
          'better story, and the shrub is probably the truer one.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Split is a Roman palace that turned into a town, and the town still shops at its gates:</strong> '
        'the fish hall and the green market before nine, a konoba in Veli Varoš at noon, lamb under the bell ordered a day ahead, '
        'Pošip and Plavac Mali by the glass. <strong>Make or break:</strong> walk the palace at dawn and eat once in Varoš. '
        '<strong>The warning:</strong> a menu with photographs and a peka served in fifteen minutes was not cooked for you.</p></div>')

ESSAY_LEDE = ("Split began as one man’s retirement. Around the year 300 the emperor Diocletian, a Dalmatian by birth, built a fortified "
              "palace on the bay to live out his days in, and abdicated in 305 to grow cabbages in it — or so he is said to have told the "
              "men who begged him to come back.")
ESSAY = [
 ("", "Three centuries later the Avars and Slavs sacked Salona, the Roman capital a few kilometres inland, and its people fled to the "
      "empty palace and stayed. They built houses into the arcades, chapels into the walls, and a cathedral into the emperor’s tomb; "
      "its story, and the palace’s plan, have cards of their own. What matters at table is that the town grew inside a building, "
      "and the market grew at its doors: the green market against the east wall, the fish hall a few steps from the west gate."),
 ("", "Venice held the city from 1420 to 1797 and left a vocabulary in the kitchen: brodet is a cousin of brodetto, pašticada of a "
      "slow Venetian braise. Then came a short French interlude and a century of Habsburg rule, and with it coffee houses and cakes. "
      "In 1501 Marko Marulić finished Judita here, the first great poem in the Croatian language; the city still calls him its father."),
 ("The quintessence", "The kitchen is poor-soil and sea. The limestone that built the palace drains too fast for wheat but suits the "
      "vine, the olive and the herbs that go into travarica; so the table is fish, oil, greens, wine and a little lamb. The canon is "
      "short and seasonal: grilled fish and squid, a black risotto, the Hvar stew without tomato, pašticada on Sundays and in winter, "
      "peka when someone has ordered it the day before. And before lunch, the marenda: the mid-morning plate of the working city, "
      "still served in the canteens by the harbour."),
]
HISTORY = [
 "The fetivi — the born-and-bred Splićani — will tell you the palace is not a museum, and they are right: people still live in it, "
 "hang washing in it and argue about parking outside it. The Golden Gate, the Peristyle and the cellars are on every itinerary; "
 "the side alleys, Varoš behind them and the hill of Marjan are where the town lives.",
 "The twentieth century brought a sculptor, Ivan Meštrović, whose bishop stands at the Golden Gate and whose house is a gallery "
 "under Marjan; a football club the city treats as a religion; and in 1979 the UNESCO listing. Then came the ferries, the cruise "
 "ships and a second fame as a film set, and the old question of how many people can live in a building that everyone wants to visit.",
 "And in 2001, a few kilometres up the coast in Kaštela, a laboratory found the answer to one of the wine world’s oldest riddles in "
 "a handful of old vines. That story is told in full in the fold below.",
]
MONEY = [
 "Split is the ferry port for the islands, and in summer it lives on the people passing through. The palace fills from mid-morning "
 "when the ships are in; the menus with photographs are written for people who will not come back.",
 "That is the line you can taste. The value is in the fish hall before nine, the green market before the producers pack up, a "
 "konoba in Varoš with a chalk board, a canteen at Matejuška where the fishermen eat their marenda, and a glass of Pošip poured by "
 "someone who can tell you whose vineyard it came from.",
]
WHY_NOW_PARA = ("<p>And the clock is the season. From Easter to October the ferries run full and the palace is crowded at midday; "
                "from November the catamarans go on winter timetables, a few kitchens close until spring, the olive presses run and "
                "the city gets its alleys back. Whoever comes in May gets St Domnius and a cool sea; whoever comes in late autumn gets "
                "the new oil, the first fritule and a palace you can hear yourself walk in.</p>")


def soul_fold():
    """The essay: the old lead, history, eat and drink blocks, rewritten (the palace's plan, the cathedral, the sphinx, the stone,
    the Zinfandel discovery and the dishes moved to their own cards) and merged into one read."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">An emperor’s retirement home that became a town, a market at its gates, and a coast of stone, oil and wine</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}
# exact replacements on the kept venue records' old text fields (the house word list: no "couple", no "for two", no "curated")
VENUE_TEXT_EDITS = [
 ("for two people", "for at least two people"), ("for two", "to share"),
 ("romantic", "quiet"), ("Romantic", "Quiet"), ("curated", "chosen"), (" ★ ", " "), ("★", ""),
]

BOUGIE_GO = ('Taste what the laboratory found where the city pours it: <a href="#venue-v17-zinfandel-food-wine-bar">Zinfandel</a>, '
             'on Marulićeva, is named for this story and keeps Croatian reds by the glass — ask for a Tribidrag from Kaštela.')
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
 "quartiers": {"title": "The city — the palace, Varoš, the Riva and the beach", "desc": "The palace that became a town, the fishermen's quarter behind it, the seafront in front of it, and the sand to the east",
               "lede": "Split is small and flat where it matters: the palace, Varoš and the Riva are ten minutes end to end. Time the palace against the ships, not the clock."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "A sphinx older than the palace, a bishop's lucky toe, a fish hall without flies, a stone that did not build the White House, and a game played in the shallows",
                 "lede": "Five stories the city tells about itself, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the two markets and what to carry home", "desc": "Where a galley provisions: the green market at the Silver Gate and the fish hall in the morning; then oil, island cheese and salt, and a cellar on Brač",
                  "lede": "Shop early: both markets are at their best before nine and tired by one. Bring cash, and a cool bag for the fish."},
 "walks": {"title": "Walks — the palace, the hill, and the Roman capital", "desc": "Through the palace from gate to gate, up and round Marjan, and out to the ruins of Salona and the fortress of Klis",
           "lede": "Walk the palace at the edges of the day and the hill at either end of it. In summer the stone holds the heat; in winter the bura clears the view to the islands."},
 "calas": {"title": "Swims — the sand of the city and the pines of Marjan", "desc": "The shallow sand of Bačvice where picigin is played, and two pebble beaches under the pines of Marjan",
           "lede": "The sea is warm from June to October and still swimmable into early autumn for the hardy. The city beach is sand; the hill's beaches are pebble — bring shoes."},
 "culture": {"title": "Culture — the emperor's house and the sculptor's", "desc": "The cellars that kept the palace's plan, the tomb that became a cathedral, Croatia's oldest museum, and Meštrović's house under the hill",
             "lede": "Few rooms, all within a walk. The cellars and the cathedral are in the palace; the museum is north of it; Meštrović is under Marjan."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one craft of this coast where a named hand teaches, the others and what each is missing, and the honest word on what the alleys sell",
           "lede": "This is a coast of stone, and of the hands that cut it; most of them sell rather than teach. The card at the top is the one that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "A specialty coffee bar in a palace alley, the long bench of the Riva, and the stones of Matejuška at dusk",
                    "lede": "The city drinks its coffee slowly and outdoors. For an hour of work, the coffee bar; for an hour of watching, the Riva; for the evening, the harbour."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "Three wines to ask for by name, the other glasses, and two bars that pour nothing but Croatian",
          "lede": "Dalmatia is red-wine country with great island whites. Learn three names; then drink them in a bar that knows the grower."},
 "listening": {"title": "Hi-fi & listening — the room, the klapa, and three voices", "desc": "The listening room, the a cappella of Dalmatia live, and three Split voices to queue before service",
               "lede": "The city sings — in the Vestibule, on the terraces, at the football. Check the season before you plan round it."},
 "around": {"title": "Autour — the islands and the coast", "desc": "Brač and its stone, Hvar and Vis offshore; Trogir on its island to the west, and Omiš at the mouth of the Cetina"},
 "avoid": {"title": "What to skip", "desc": "The city keeps two versions of itself: what it sells in the palace at midday, and what it cooks one street back and one hour earlier",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the city, the theatre, the daily paper, the ferries and the port"},
}

GDESC = {
 ("quartiers", "The palace and its front"): "The palace that became a town, the stone quarter behind it, and the seafront and harbour in front of it.",
 ("quartiers", "East of the palace"): "The city's own sand beach and the sea terrace beyond it.",
 ("curiosities", "Odd things in the palace"): "An Egyptian sphinx, a bronze bishop's toe, and a fish hall with a legend.",
 ("curiosities", "Stone and sea"): "The claim every guide repeats about Brač stone, and the ball game of the shallows.",
 ("provisioning", "The morning"): "The green market at the Silver Gate and the fish hall by the Iron Gate.",
 ("provisioning", "To carry home"): "Croatian oils by the bottle, the cheese and salt of Pag, and a cellar on Brač.",
 ("walks", "The city on foot"): "The palace from gate to gate, and the hill above it.",
 ("walks", "Half a day inland"): "The Roman capital the palace's first townsmen fled, and the fortress above it.",
 ("calas", "Swims in town"): "The sand of Bačvice, and two pebble beaches under the pines.",
 ("culture", "The emperor's house"): "The cellars, the tomb turned cathedral, and the oldest museum in the country.",
 ("culture", "The sculptor"): "Meštrović's house and studio under Marjan.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Split-made, and is not.",
 ("coffee-gardens", "Three places to sit"): "A coffee bar in the palace, the seafront bench, and the harbour stones at dusk.",
 ("bars", "Ask for it by name"): "The great red, the great white, and the grape that turned out to be Zinfandel.",
 ("bars", "The other glasses"): "The white of Vis, the sweet wine of dried grapes, and the rakija.",
 ("bars", "Where to pour them"): "Two wine bars in the centre that pour only Croatian.",
 ("listening", "The listening room"): "Where to hear records properly, honestly checked.",
 ("listening", "Live, the real thing"): "The a cappella of Dalmatia.",
 ("listening", "Queue it before service"): "Three Split voices for the galley playlist.",
 ("around", "The islands"): "The stone island across the channel, and the two further out.",
 ("around", "Along the coast"): "The island town to the west, and the river canyon to the south-east.",
 ("avoid", "The street"): "The cruise-day midday, and the photograph menu.",
 ("avoid", "Read the glass and the plate"): "The jug wine, and the winter dish in August.",
 ("follow", "The city"): "The tourist board, the theatre and the daily paper.",
 ("follow", "Getting about"): "The ferries and the port.",
}

TABLES_DESC = ("A nine-course menu at a twelve-seat counter at one end and ćevapi in a soft lepinja at the other: at most three "
               "tables of each kind, picked for what you should not miss in Split, every card saying when it was last confirmed and when "
               "its season runs.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "ZINFANDEL’S STORY", "quarters": "THE CITY", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "sea": "SWIMS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, Zinfandel’s story, the city, the record corrected, the season", "tables": "",
               "flaner": "the palace and the hill, the swims, the emperor’s house, the hand, the cup",
               "sortir": "the wines by name, two bars, the listening room and the klapa", "around": "the islands, Trogir, Omiš",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for: a terrace over the Riva, the city's first MICHELIN-starred counter, and the sea terrace at Firule.",
              "petite": "Where this guide actually lives: the konobas of Varoš, the kitchens in and around the palace, the wine bistros, and where the city eats.",
              "street": "On foot and early: the green market, the fish hall, and the fishermen's buffet."}

LANE_LEAD = {
 "summit": "A terrace behind an unmarked door on the Riva, a twelve-seat counter by the harbour, and the sea terrace at Firule.",
 "varos": "Three konobas in the stone lanes of the fishermen's quarter, a few minutes west of the palace.",
 "palace": "An upstairs room in a Gothic palace, a counter that closes when the food runs out, and a wine-lined bistro by the fish hall.",
 "locals": "A family konoba at the foot of the hill, and the ćevapi window by Marmontova.",
 "bistro": "A MICHELIN-listed wine bistro named for the Kaštela vines, and a small stone room of braised pot dishes.",
 "street": "The green market at the Silver Gate, the fish hall, and the fishermen's buffet at Matejuška.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the glass, the table, the late walk.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the vines that turned out to be Zinfandel, the two markets at dawn, the dishes of the coast, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through and it is late October: Villa Spiza in the palace lanes (no bookings, cash only, works all year on shorter winter hours, closed Sundays), or Konoba Fetivi in Varoš (MICHELIN-selected 2026; call, the closing day differs by listing).",
             "Plan ahead — this week": "Zinfandel on Marulićeva (MICHELIN Guide 2026; book the evening, it is small) and Bokeria by the fish hall (Gault&Millau 2026; reserve even off-season).",
             "Plan ahead — the grand night": "ZOI on the Riva (Gault&Millau 17/20, 2026) and Krug, the twelve-seat counter that won Split its first MICHELIN star in 2025. Neither publishes its winter schedule: book, and confirm the date when you do."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the city’s year: the saint in spring, the festival, the klapa and the noise in summer, the lights in Advent"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): eight plates and their honest passports, rewritten from the old guide's dish fold and its #eat prose.
DISH_DESC = "Eight plates and their honest passports: which are the city’s own, which are the coast’s, and which the islands and the hinterland send in."
from liste import DISHES   # noqa: E402


def dish_articles(old):
    """The Dish: eight articles rebuilt from the old guide's dish fold and #eat prose (see liste.DISHES)."""
    from liste import DISH_WHERE as W
    tr = str.maketrans({"š": "s", "č": "c", "ć": "c", "ž": "z", "đ": "d", "Š": "s", "Ž": "z"})
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
    """the old sources fold: one plain list with single-quoted hrefs; rebuilt as one clean list (the re-check's own sources are added after)."""
    pairs = []
    for u, lab in re.findall(r"""<a href=['"](https://[^'"]+)['"][^>]*>(.*?)</a>""", s):
        u = H.unescape(u)
        if u not in [p[0] for p in pairs] and not any(h in u for h in DROP_HOSTS): pairs.append((u, H.unescape(lab)))
    lst = "<ul class='gx-list'>" + "".join(f'<li><a href="{H.escape(u, quote=True)}" target="_blank" rel="noopener">{H.escape(l, quote=False)}</a></li>' for u, l in pairs) + "</ul>"
    s = s.replace('<div class="sfold__title">Sources & checks</div>', '<div class="sfold__title">Sources &amp; verification</div>').replace(
        '<div class="sfold__desc">Links we checked. No tourist press.</div>', '<div class="sfold__desc">Where every fact came from, and when it was last checked</div>')
    i = s.index('<div class="sfold__body">') + len('<div class="sfold__body">')
    j = s.index('<p style="font-size:0.82em')
    raw = s[j:s.index("</p>", j) + 4]
    return s[:i] + lst + raw + "</div></details>"


# gem popups: born-here food origins (each kept to what the guide's research says)
GEMS = []   # set in liste.py after the re-check (GEMS)
from liste import GEMS   # noqa: E402,F811

GLOSS = [
 ["konoba", "a tavern, once the wine cellar of a house; now a family restaurant"],
 ["konobas", "taverns, family restaurants"],
 ["peka", "the iron bell covered in embers, and the dish cooked under it"],
 ["ispod peke", "cooked under the bell"],
 ["janjetina", "lamb"],
 ["hobotnica", "octopus"],
 ["pršut", "air-dried ham of Dalmatia"],
 ["Paški sir", "the hard sheep's cheese of the island of Pag"],
 ["brodet", "the fishermen's stew, with tomato"],
 ["gregada", "the Hvar fish stew of potatoes, white wine and garlic, without tomato"],
 ["crni rižot", "black risotto, coloured with cuttlefish ink"],
 ["pašticada", "beef braised in wine and dried fruit, with gnocchi"],
 ["njoki", "gnocchi"],
 ["soparnik", "the chard pie of Poljica, baked on an open hearth"],
 ["pogača", "a flatbread or pie; on Vis, filled with anchovy and onion"],
 ["marenda", "the mid-morning meal of the working city"],
 ["ćevapi", "small grilled fingers of minced meat"],
 ["somun", "the soft round flatbread ćevapi come in"],
 ["kajmak", "a thick fresh cream, salted"],
 ["ajvar", "a relish of roasted red peppers"],
 ["burek", "flaky filo pie of meat, cheese or potato"],
 ["fritule", "small fried doughnuts with raisins and rum, a winter sweet"],
 ["rožata", "the caramel custard of southern Dalmatia"],
 ["smokva", "fig; dried figs"],
 ["rakija", "fruit or grape brandy"],
 ["travarica", "grape rakija steeped with herbs"],
 ["šljivovica", "plum rakija"],
 ["Prošek", "the Dalmatian sweet wine of dried grapes, not Prosecco"],
 ["Plavac Mali", "the great red grape of Dalmatia"],
 ["Pošip", "the white grape of Korčula"],
 ["Vugava", "the white grape of Vis"],
 ["Tribidrag", "the old Dalmatian name of the grape the world knows as Zinfandel"],
 ["Crljenak Kaštelanski", "‘the red of Kaštela’, the name under which Zinfandel was found in 2001"],
 ["Dingač", "the steep Plavac Mali slope of Pelješac"],
 ["vinarija", "a winery"],
 ["Pazar", "the green market at the Silver Gate"],
 ["Ribarnica", "the fish market"],
 ["tržnica", "a market"],
 ["Riva", "the seafront promenade in front of the palace"],
 ["Peristyle", "the colonnaded court at the heart of the palace"],
 ["Peristil", "the colonnaded court at the heart of the palace"],
 ["Varoš", "the old suburb west of the palace"],
 ["fetivi", "born-and-bred Splićani"],
 ["Splićani", "the people of Split"],
 ["klapa", "Dalmatian a cappella group singing"],
 ["klape", "groups of klapa singers"],
 ["picigin", "the ball game of the Bačvice shallows"],
 ["Sudamja", "the feast of St Domnius, 7 May"],
 ["Sveti Duje", "St Domnius, the city's patron"],
 ["bura", "the cold, dry north-east wind"],
 ["jugo", "the warm, damp south-east wind"],
 ["kamen", "stone"],
]
