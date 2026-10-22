"""Hand-written prose for the Dubrovnik-Dalmatie GOLD6 build (22 Oct 2026). Facts only from the guide (its May 2026 research), the
22 Oct re-check packs in research/, and nothing else. The old page's lead, history, eat and drink blocks are rebuilt here as one essay
(transformed, not pasted); the facts that now have a card of their own (the one-month Rector, the 1667 rebuild, the siege, the walls,
Držić and Bošković, the oysters, the Plavac DNA, the Ston salt) are pointed to, not retold.
The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer, the
calendar, the craft section, the listening room, the swims, Autour, the food-history fold) is written here for the first time."""
import re, html as H

TITLE = "Dubrovnik, Dalmatia — Terroir Guide"
DESC = ("Dubrovnik for people who cook: Gruž market at dawn, the flat oysters of Mali Ston at the boat, lamb under the bell in Konavle, "
        "Plavac Mali from the Dingač slopes, the Republic's walls before the ships arrive — at most three places of each kind, every one "
        "re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Dubrovnik</h1><div class="region">Dalmatia · Croatia</div><div class="philosophy">"A city that was a country for '
        'four and a half centuries: a ring of limestone walls, a Baroque street rebuilt after one earthquake, and the oysters and the red wine an '
        'hour up the coast."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Two names for one town: Ragusa, the Latin of the rock, and Dubrovnik, the Slavic of the oak wood.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The refugees from Roman Epidaurus, at Cavtat, settled the rocky '
          'islet they called Ragusa; across a marshy channel, under the hill, grew a Slav settlement named for the holm oak, dub. The channel was filled '
          'in and became the Stradun. The Republic signed its treaties as Ragusa until 1808; the city has answered to Dubrovnik ever since. '
          'The details of the founding are argued over; the two names are not.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Dubrovnik is a museum city with a working coast behind it, and the coast is the reason to come:</strong> '
        'Gruž market at dawn, the oysters of Mali Ston at the boat, lamb under the bell in Konavle, Plavac Mali on the slopes of Pelješac. '
        '<strong>Make or break:</strong> walk the walls at opening and eat outside the Old Town at least once. <strong>The warning:</strong> on a '
        'cruise day the Old Town fills between ten and two — check the port’s schedule, and never eat on Prijeko.</p></div>')

ESSAY_LEDE = ("Dubrovnik is a city that once was a country. For four and a half centuries it governed itself as the Republic of Ragusa, a small, "
              "clever maritime state that slipped free of Venice in 1358 and kept its independence until Napoleon’s marshal dissolved it in 1808.")
ESSAY = [
 ("", "It bought that survival the way it bought everything else: with diplomacy, tribute to whichever empire was nearest, and a merchant fleet "
      "that flew its own flag in every Mediterranean port. On that flag it wrote one word, LIBERTAS, and it meant it more than most: in January "
      "1416 the Great Council banned the slave trade through the city and threatened any captain who carried slaves with prison — one of the "
      "earliest such bans in Europe, made while the trade was thriving all around it."),
 ("", "The constitution was built to stop any one man from rising; its oddest rule has a card of its own. The city it governed fits inside a ring "
      "of walls, which have their own walk. When the earthquake of 1667 flattened the town, the walls stood and the street was rebuilt to a single "
      "rule, which is why the Stradun looks the way it does. The siege of 1991–92 is remembered in two quiet rooms of the Sponza."),
 ("The quintessence", "The table answers the coast, not the walls. An hour north, in the brackish bay of Mali Ston, the flat oyster has been farmed "
      "since Roman times; on the Pelješac slopes the native Plavac Mali ripens on stone; in Konavle lamb cooks for hours under an iron bell. "
      "Inside the walls the city keeps a short canon tied to its feasts — the ‘dirty macaroni’ of St Blaise, pašticada with gnocchi, a black "
      "risotto — and opens a meal, in the truest Dalmatian gesture, with a small glass of travarica."),
]
HISTORY = [
 "The city began, by the usual account, in the seventh century, when Greco-Roman refugees from Epidaurus — today’s Cavtat — fled Slav and Avar "
 "raids and settled the rock. Venice held it for a century and a half; the Treaty of Zadar released it in 1358, and Ragusa paid tribute first to "
 "Hungary, then to the Ottomans, and governed itself.",
 "A republic this compact bred an improbable density of minds: a playwright the country still names first, and a Jesuit whose physics ran a "
 "century ahead of its time; both have cards. It also bred a habit of caution: a quarantine on the shore for travellers and goods from the east, "
 "whose stone halls still stand outside Ploče.",
 "Marmont abolished the Senate in 1808; the city passed to Napoleon’s Illyrian Provinces and in 1815 to Habsburg Austria. The twentieth century "
 "brought the hotels, the Summer Festival in 1950 and, in 1979, the UNESCO listing; then the siege, the long restoration, and a second fame as "
 "a film set. The stones are the same; the crowds are new.",
]
MONEY = [
 "Dubrovnik lives on visitors, and it is honest to say so. The Old Town has emptied of residents as the apartments became holiday lets, and on a "
 "summer cruise day several thousand day visitors pass through Pile Gate between breakfast and the afternoon; the city has capped the ships it "
 "lets in, and the old streets still fill.",
 "That is the line a visitor can taste. The menus on Prijeko are written in eight languages for people who will not come back; the side lanes, "
 "Lapad, Gruž and the country konobas cook for people who will. The value is in the market before nine, in a cellar door on Pelješac, and in "
 "an oyster eaten on the quay where it was lifted, at a fraction of its price inside the walls.",
]
WHY_NOW_PARA = ("<p>And the clock is the season. From Easter to October the city is full and the island boats run; from November the cruise "
                "ships thin out, several kitchens close until spring, and the city gets its own streets back — cold, quiet, and serving the "
                "winter green stew. Whoever comes in May, June or September gets warm water and the Old Town at both ends of the day; whoever "
                "comes in February gets St Blaise.</p>")


def soul_fold():
    """The essay: the old lead, history, eat and drink blocks, rewritten with their facts (the constitution, the 1667 rebuild, the siege,
    the walls, the two citizens, the oysters and the Plavac DNA moved to their own cards) and merged into one read."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A republic with one word on its flag, a town rebuilt to one rule, and a coast that feeds it</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}
# exact replacements on the kept venue records' old text fields (the house word list: no "couple", no "for two", no "curated")
VENUE_TEXT_EDITS = [
 ("whole turbot for two", "whole turbot to share"), ("for two people", "for at least two people"),
 ("romantic", "quiet"), ("Romantic", "Quiet"), ("curated", "chosen"), (" ★ ", " "), ("★", ""),
]

# The food-history callout (#bougie): written by the hot/calendar pack from verified sources (research/hot_events.json "bougie"),
# reconciled in fixes.py; the last line points to the places in this guide where the story is still on the plate.
BOUGIE_GO = ('Two tables in this guide sit on the bay the walls were built to guard: <a href="#venue-v07-bota-are-mali-ston">Bota Šare</a> and '
             '<a href="#venue-v08-vila-koruna">Vila Koruna</a>, at Mali Ston, a walk from the pans.')
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
 "quartiers": {"title": "The city — the walled town, its gates and the harbour to the west", "desc": "The Old Town and the gates of Pile and Ploče; then Gruž, where the boats and the market are, and Lapad, where the city lives",
               "lede": "Dubrovnik is a walled town of a few streets, two gates and a harbour two kilometres west. Time the Old Town against the cruise ships, not the clock; eat at least once where the city lives."},
 "curiosities": {"title": "The record, corrected — what most guides never tell", "desc": "A ruler for one month, a wind that excused a crime, a street rebuilt to one rule, and two citizens who outgrew the walls",
                 "lede": "Five things the city’s own story tells slightly wrong or not at all, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the market, the cellars and what to carry home", "desc": "Where a galley provisions: Gruž and Gundulić in the morning, the oyster quay, two cellars of Pelješac, oil, a friars’ pharmacy and the supermarket the Old Town uses",
                  "lede": "Shop early: Gruž is at its best before nine and Gundulić folds by early afternoon. Buy wine at the cellar door, oysters at the bay, and bring cash."},
 "walks": {"title": "Walks — the walls, the street, the mountain, and Ston", "desc": "The ring of the walls, the Stradun and its squares, the cable car to Srđ; then the walls of Ston and the mills of the Ljuta",
           "lede": "Walk at the edges of the day: the walls at opening, the Stradun before nine, Srđ for the last light. In summer the stone holds the heat; in winter the hours shorten."},
 "calas": {"title": "Swims — under the walls and a boat away", "desc": "The city beach at Ploče, the rocks under the south wall, the steps to Sveti Jakov; then Lokrum and the sand of Lopud",
           "lede": "The sea is warm from June to October. The city swims off rocks and pebbles, not sand: bring shoes for the stones, and take the boat for a beach."},
 "culture": {"title": "Culture — the Republic in stone", "desc": "The palace of a ruler who served one month, the customs house that keeps the city’s memory, and the quarantine on the shore",
             "lede": "Few rooms, all inside or beside the walls. Buy the museum pass for the palace; the Memorial Room is free; Lazareti is a summer stage."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one craft of Konavle and the city where a named hand teaches, the others and what each is missing, and the honest word on what Stradun sells",
           "lede": "The coast’s crafts are older than its tourism — silk embroidery, gold filigree, stone — but most of the hands sell rather than teach. The card at the top is the one that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "Two rooms where a laptop is welcome: a specialty coffee bar by the walls, and the marina lounge up the river",
                    "lede": "The honest truth first: most Old Town cafés are for the terrace, not the laptop. For an hour of work, the coffee bar or the marina; to linger, the terrace."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "Three wines to ask for by name, the other glasses, and a drink on the rocks under the walls",
          "lede": "This is red-wine country with two great whites an island away. Learn three names; then drink them at the wall, or in a bar that pours nothing but Croatian."},
 "listening": {"title": "Hi-fi & listening — the honest answer and the live thing", "desc": "No hi-fi bar inside the walls, said plainly; then the Linđo and the klapa live, and three voices to queue before service",
               "lede": "The city listens live, in stone rooms and courtyards, mostly in summer. Check the season before you plan round it."},
 "around": {"title": "Autour — Konavle, and up the coast", "desc": "Roman Cavtat and the falcon fortress of Konavle to the south; a Renaissance garden and the island of the salt lakes to the north-west"},
 "avoid": {"title": "What to skip", "desc": "The city keeps two versions of itself: what it sells on the main street at midday, and what it does one lane back and one hour earlier",
           "lede": "Five things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the city, the festival, the local paper, the ferries and the port’s ship calendar"},
}

GDESC = {
 ("quartiers", "Inside and at the gates"): "The walled town, the western gate where the land road arrives, and the eastern gate by the old quarantine.",
 ("quartiers", "West, where the boats are"): "The working harbour with the market, and the peninsula where the city eats and swims.",
 ("curiosities", "How the Republic ran"): "A constitution against ambition, a wind with legal weight, and a street rebuilt to a single cornice.",
 ("curiosities", "Two citizens"): "The playwright and the physicist the town still claims first.",
 ("provisioning", "The morning"): "The fish and greens of Gruž, the Old Town’s small market, and the oyster quay an hour north.",
 ("provisioning", "The cellars of Pelješac"): "A Napa winemaker’s homecoming, and an estate with a famous consultant.",
 ("provisioning", "To carry home, and the pantry"): "Croatian oils by the bottle, creams from a pharmacy older than most countries, and the supermarket the Old Town actually uses.",
 ("walks", "The city on foot"): "The ring of the walls, the street and its squares, and the mountain the city was shelled from.",
 ("walks", "Out of town"): "The long walls of Ston above the salt pans, and a cold river with its mills.",
 ("calas", "In sight of the walls"): "The city beach, the rocks under the sea wall, and a cove down a long stair.",
 ("calas", "A boat away"): "The island off the Old Port, and the sand of the Elaphiti.",
 ("culture", "The Republic in stone"): "The palace, the customs house and memorial, and the quarantine halls on the shore.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Dubrovnik-made, and is not.",
 ("coffee-gardens", "Two rooms with a plug"): "A specialty coffee bar by the walls, and the marina’s own lounge at Komolac.",
 ("bars", "Ask for it by name"): "The native red, its great slope, and the white of Korčula.",
 ("bars", "The other glasses"): "The one-village white, the sun-dried sweet wine, and the herb rakija that opens a meal.",
 ("bars", "A glass on the rocks"): "The bars cut into the sea wall, and the Croatian-only wine bar.",
 ("listening", "The listening room, honestly"): "No hi-fi bar here, and where the music is instead.",
 ("listening", "Live, the real thing"): "The Konavle dance with its lyre, and the a cappella of Dalmatia in stone rooms.",
 ("listening", "Queue it before service"): "The voice of Dalmatia, the songwriter who wrote for him, and klapa at its tightest.",
 ("around", "South to Konavle"): "The Roman harbour town and the fortress on its rock.",
 ("around", "Up the coast"): "A Renaissance garden above the sea, and the island of the two salt lakes.",
 ("avoid", "The crowd and the street"): "The cruise-day midday, the tourist row, and the slice on the main street.",
 ("avoid", "Read the plate"): "The oyster that travelled, and the truffle that does not belong here.",
 ("follow", "The city"): "The tourist board, the festival and the local paper.",
 ("follow", "Getting about"): "The ferries and the port’s ship calendar.",
}

TABLES_DESC = ("A starred tasting menu in the arches above the Old Port at one end and a pršut sandwich on a Stradun side lane at the other: at most "
               "three tables of each kind, picked for what you should not miss on this coast, every card saying when it was last confirmed and when "
               "its season runs.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE SALT’S STORY", "quarters": "THE CITY", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "sea": "SWIMS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the salt’s story, the city, the record corrected, the season", "tables": "",
               "flaner": "the walls and the street, the swims, the Republic in stone, the hand, the cup",
               "sortir": "the wines by name, a glass on the rocks, the live music", "around": "Konavle, the garden, the island",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for: a starred room in the walls, a roof on Prijeko, and the formal terrace between two fortresses.",
              "petite": "Where this guide actually lives: the old houses inside the walls, the konobas under the bell, the oysters at Mali Ston, where the city eats, and the glass.",
              "street": "On foot and standing: the market at dawn, the sandwich that has fed the city for decades, and the octopus in a bun."}

LANE_LEAD = {
 "summit": "The starred tasting menu in the arches over the Old Port, the roof terrace on Prijeko, and the old Nautical School between Bokar and Lovrijenac.",
 "houses": "The fish house of 1886, the capon of a Renaissance playwright, and a charcoal grill under a vine.",
 "konoba": "Lamb under the bell above the city, and a river through the dining room in Konavle.",
 "oysters": "Two oyster houses on the bay of Mali Ston, an hour north.",
 "locals": "A family konoba on the Lapad side, the pizza outside Ploče Gate, and a Bosnian grill inside the walls.",
 "glass": "The Croatian-only wine bar in the Old Town, and two cellar doors on the Pelješac slopes.",
 "street": "Gruž market off the boats, the pršut sandwich of the Old Town, and the octopus burger.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the glass, the table, the late walk.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the salt the walls were built for, the market at dawn, the dishes of the coast, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through and it is late October: the fish house of 1886 on Široka (open all year on a winter schedule; book), or the MICHELIN Bib Gourmand Bosnian grill on Nikole Gučetića (no seasonal break listed; call).",
             "Plan ahead — this week": "Open most of the year: the roof of the Prijeko Palace (the hotel shut from 2 January to 28 February in 2026), and the oysters at Bota Šare in Mali Ston, an hour north, listed open all year — call for the hours.",
             "Plan ahead — the grand night": "The two grand houses are seasonal: Restaurant 360 (one MICHELIN star, 2026) closes from November to spring, and Nautika runs roughly March to October. Both are at or past the end of their 2026 season: book as soon as spring opens."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the city’s year: the saint and the oysters in winter and spring, the festival and the klapa in summer, the harvest and the lights in autumn"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): eight plates and their honest passports, rewritten from the old guide's dish articles and its #eat fold
# (stonska torta and the candied peel are gem popups, so here they are not retold).
DISH_DESC = "Eight plates and their honest passports: which are the city’s own, which are the coast’s, and which the hinterland sends down."
DISHES = [
 ("Šporki makaruli", "Hand-cut macaroni under a deep beef ragù cooked slowly with bay and cloves. The name means ‘dirty macaroni’: the story goes that patrician households ate the meat and poured what was left of the sauce over pasta for the servants. The city kept the dish and dropped the hierarchy, and eats it above all in the week of St Blaise, early February.", "Dubrovnik’s own"),
 ("Pašticada", "Beef larded with pancetta, garlic and cloves, marinated in vinegar and Prošek, then braised for hours with prunes and dried figs until the sauce turns sweet and sour. It comes with gnocchi, always. A two-day dish: ask before you order.", "Dalmatia-wide"),
 ("Mali Ston oysters", "The European flat oyster, Ostrea edulis, not the cupped Pacific: farmed in the brackish bay of Mali Ston since Roman times and protected by an EU designation since 2020. Eaten raw with lemon, at the bay, with a glass of Pošip.", "Mali Ston, an hour north"),
 ("Crni rižot", "Risotto made black with cuttlefish and its ink, with garlic, white wine and parsley; the ink goes in at the end so the rice stays glossy. Venice cooks one too; Dalmatia says its own is no copy, and the argument is part of the dish.", "The whole Adriatic shore"),
 ("Janjetina ispod peke", "Lamb, veal or octopus with potatoes and rosemary under an iron bell buried in embers, heat from above and below, nobody lifting the lid for hours. It has to be ordered ahead — a country dish, cooked to the guest’s arrival.", "Konavle and the hinterland"),
 ("Brodet", "The fishermen’s stew: at least three kinds of fish with tomato, onion and a glass of red, never stirred — the pan is shaken so the fish stays whole. Polenta or potatoes on the side.", "Coastal Dalmatia"),
 ("Zelena menestra", "The winter stew of the city: cabbage and kale in a smoked-pork broth with dried mutton, sausage and potatoes. Dubrovnik writings record it in the fifteenth century; Konavle sets it at the centre of the Christmas table.", "Dubrovnik and its hinterland"),
 ("Rožata", "The city’s custard, baked in a caramel and turned out like a crème caramel — but scented, in the Dubrovnik way, with a home-made rose liqueur that makes it taste of here and nowhere else.", "Dubrovnik’s own"),
]


def dish_articles(old):
    """The Dish: eight articles rebuilt from the old guide's dish fold and #eat prose (see DISHES)."""
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
    s = s.replace('<div class="sfold__body gx-appendix">', '<div class="sfold__body">', 1)
    pairs = []
    for u, lab in re.findall(r"""<a href=['"](https://[^'"]+)['"][^>]*>(.*?)</a>""", s):
        u = H.unescape(u)
        if u not in [p[0] for p in pairs] and not any(h in u for h in DROP_HOSTS): pairs.append((u, H.unescape(lab)))
    lst = "<ul class='gx-list'>" + "".join(f'<li><a href="{H.escape(u, quote=True)}" target="_blank" rel="noopener">{H.escape(l, quote=False)}</a></li>' for u, l in pairs) + "</ul>"
    s = s.replace('<div class="sfold__title">Sources &amp; verification</div>', '<div class="sfold__title">Sources &amp; verification</div>').replace(
        '<div class="sfold__desc">Links we checked.</div>', '<div class="sfold__desc">Where every fact came from, and when it was last checked</div>')
    i = s.index('<div class="sfold__body">') + len('<div class="sfold__body">')
    return s[:i] + lst + "</div></details>"


# gem popups: born-here food origins (each kept to what the old research says; the plates are in The Dish)
GEMS = [
 {"id": "gem-stonska-torta", "pattern": "stonska torta", "tag": "Ston gem · born here", "name": "A pasta cake for wall-builders",
  "story": "Ston’s own cake is the strangest sweet on the coast: cooked macaroni folded with ground walnuts, dark chocolate, lemon zest, cinnamon "
           "and sugar, baked in shortcrust. Tradition ties it to the building of the Ston walls in the fourteenth century, as dense food for the labourers; "
           "nobody has a document for that, and the cake has long since become a wedding and feast-day dish.",
  "where": "Ston and Mali Ston, an hour north; ask at the oyster houses."},
 {"id": "gem-arancini", "pattern": "arancini", "tag": "City gem · born here", "name": "Not a rice ball",
  "story": "In Dubrovnik arancini are not the fried rice of the south of Italy but candied bitter-orange peel: the peel boiled to take out the "
           "bitterness, dried, candied and rolled in sugar, kept in jars for feasts and guests. The bitter orange came to the Mediterranean with the "
           "Arabs; the city made a confection of the part everyone else threw away.",
  "where": "The Gundulić Square market, in the morning."},
 {"id": "gem-rozalin", "pattern": "Rozalin", "tag": "City gem · born here", "name": "A rose in the bottle",
  "story": "Rozalin, or rozulin, is the city’s home-made rose-petal liqueur, steeped from garden roses in spirit and sugar. It is what turns the "
           "rožata from a crème caramel into a Dubrovnik dish, and a small glass of it closes a meal in the old houses.",
  "where": "The old houses of the Old Town, after dinner; and in the rožata."},
]

GLOSS = [
 ["konoba", "a tavern, once the wine cellar of a house; now a family restaurant"],
 ["konobas", "taverns, family restaurants"],
 ["peka", "the iron bell covered in embers, and the dish cooked under it"],
 ["ispod peke", "cooked under the bell"],
 ["janjetina", "lamb"],
 ["pršut", "air-dried ham of Dalmatia"],
 ["brodet", "the fishermen’s stew"],
 ["crni rižot", "black risotto, coloured with cuttlefish ink"],
 ["pašticada", "beef braised in wine and dried fruit, with gnocchi"],
 ["njoki", "gnocchi"],
 ["šporki makaruli", "‘dirty macaroni’, the St Blaise Day pasta"],
 ["zelena menestra", "the winter cabbage and smoked-meat stew"],
 ["kaštradina", "dried, smoked mutton"],
 ["na buzaru", "cooked in wine, garlic and parsley, often with tomato"],
 ["rožata", "the city’s caramel custard"],
 ["Rozalin", "home-made rose-petal liqueur"],
 ["arancini", "here: candied bitter-orange peel"],
 ["rakija", "fruit or grape brandy"],
 ["travarica", "grape rakija steeped with herbs"],
 ["loza", "plain grape rakija"],
 ["orahovac", "green-walnut liqueur"],
 ["Prošek", "the Dalmatian sweet wine of dried grapes, not Prosecco"],
 ["Plavac Mali", "the native red grape of Dalmatia"],
 ["Pošip", "the white grape of Korčula"],
 ["Grk", "the white grape of Lumbarda on Korčula"],
 ["Dingač", "the steep Plavac Mali slope of Pelješac, Croatia’s first protected wine"],
 ["Postup", "the Plavac Mali slope next to Dingač"],
 ["vinarija", "a winery"],
 ["kamenice", "flat oysters"],
 ["Ostrea edulis", "the European flat oyster"],
 ["tržnica", "a market"],
 ["Stradun", "the main street of the Old Town (officially Placa)"],
 ["Placa", "the official name of the Stradun"],
 ["poljana", "a square"],
 ["Luža", "the square at the east end of the Stradun"],
 ["buža", "a hole, an opening in the wall"],
 ["klapa", "Dalmatian a cappella group singing"],
 ["lijerica", "the three-string bowed lyre of Konavle"],
 ["Linđo", "the Konavle circle dance led by the lijerica"],
 ["Festa", "a feast day"],
 ["Sveti Vlaho", "St Blaise, the city’s patron"],
 ["Libertas", "liberty, the one word on the Republic’s flag"],
 ["Lazareti", "the quarantine halls outside Ploče"],
 ["jugo", "the warm, damp south-east wind"],
 ["bura", "the cold, dry north-east wind"],
 ["agroturizam", "a farm that serves its own food"],
 ["solana", "salt works, salt pans"],
 ["Elaphiti", "the islands north-west of the city: Koločep, Lopud, Šipan"],
]
