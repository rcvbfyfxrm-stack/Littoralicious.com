"""Hand-written prose for the Athens-Attiki GOLD6 build (13 Oct 2026). Facts only from the guide (its July 2026 research),
the 13 Oct re-check packs in research/, and nothing else; every edit to an old block is an exact (old, new) pair, asserted
by the build. The old page was GOLD3, so the GOLD4/GOLD5 floor (lanes with stories, the guest list, La liste with The Dish,
the hot board and its pointer, the calendar, the craft section, the listening room) is written here for the first time."""
import re

TITLE = "Athens & Attica — Terroir Guide"
DESC = ("Athens for people who cook: the skewer and the spit, the refugee kitchen of 1922, the market cook-house at dawn, "
        "the bars that took Europe's top two places — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Athens</h1><div class="region">Attiki · Greece</div><div class="philosophy">"Bitter Attic oil, cumin the 1922 '
        'refugees carried in, Pentelic marble the Parthenon set in 447 BC."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Ἀθῆναι, Athenai: plural, older than Greek itself, and nobody knows what it means.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>Athenai is grammatically plural, like Thebai and Mykenai. '
          'The ancients assumed the city was named for Athena; much modern scholarship leans the other way, that the goddess is the Athenian one, '
          'named from the place. Beekes\' Etymological Dictionary of Greek classes both as Pre-Greek: the name yields no convincing Indo-European root, '
          'and its true meaning is lost.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Athens is a bowl of hard light on the thinnest soil in the Mediterranean, and its table is laid in layers:</strong> '
        'the bitter Attic oil, the Ottoman grill, and the cumin the refugees of 1922 carried in. <strong>Make or break:</strong> the oldest stone at '
        'first light, before the heat and the coaches, then a working neighbourhood after dark — Pangrati, Petralona, Psyrri — at a grill with cold '
        'retsina. <strong>The warning:</strong> a laminated photo-menu and a man waving you in on Plaka\'s Adrianou are the one reliable trap signal in '
        'the city. Keep walking. The harbour and the islands have <a href="/terroir/Piraeus-Saronic/">their own guide</a>.</p></div>')


def _inner(sec):
    """the body of an old <section class="soul|prose">: drop the overline + subhead, unwrap the read-more fold"""
    body = sec[sec.index(">") + 1: sec.rindex("</section>")]
    body = re.sub(r'<div class="overline">.*?</div><div class="subhead">.*?</div>', "", body, count=1, flags=re.S)
    body = body.replace('<div class="gx-fold is-folded" data-fold-label="Read the full story">', "")
    if body.count("<div") < body.count("</div>"):
        body = body[::-1].replace(">vid/<", "", 1)[::-1]
    return body.strip()


def soul_fold(soul, history, funfact):
    body = _inner(soul) + "\n<h3 class=\"gx-merge\">Where it comes from</h3>\n" + _inner(history) + "\n" + funfact
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">The light, the marble underfoot, the concrete sea, and the olive that was a legal document: '
                      'how a war-wrecked village became a capital three times over, each time with a new kitchen</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


FOLDS = {
 "quartiers": {"title": "The quarters — growth rings round the rock", "desc": "Ten quarters wrapped round the Acropolis, each with its own hour: know which one you want before you take the train",
               "lede": "Athens is not one city at night: it is a ring of quarters that each keep their own hour. Pick the quarter before you pick the table."},
 "provisioning": {"title": "The larder — markets, coffee, spice and sugar", "desc": "Where a chef shops: the market hall at dawn, the Saturday street market, the coffee roaster, the resin, the spice row and the chocolate house",
                  "lede": "Everything a galley needs is within a ten-minute walk of the Varvakios: go early, carry cash, and bring a cool bag for the cured meat."},
 "walks": {"title": "Walks & the ancient ground", "desc": "Six routes off the Acropolis marble: a hand-laid path listed as a monument, an island village at dawn, a mountain that still smells of honey",
           "lede": "Walk the rock at first light or at dusk; at midday in summer the marble has no shade. Flat rubber soles: the old stone turns to glass in rain."},
 "calas": {"title": "The Riviera — the nearest blue", "desc": "Six swims down the coast, free sand to gated cove to a warm lake in a cave — how to get there, and which one to pick",
           "lede": "The sea starts at the end of the tram line. Free sand at Edem in half an hour, the clearest water off the rocks at Limanakia, and a warm lake you can swim in January."},
 "culture": {"title": "Culture & the collections", "desc": "A frieze hung to face its own temple, a two-thousand-year-old geared computer, three collectors' houses and the gift that handed the city back the sea"},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one bench to go to, the others and what each is missing, and the honest word about classes",
           "lede": "Athens keeps a handful of family benches in the centre, each under a named master. None of them runs a class you can enrol in: what you can do is be fitted, or commission, and watch the hands that make it."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "Two grand salons, two walled gardens, three rooms with a desk and a plug, and a plane-tree square where the laptop stays shut",
                    "lede": "The honest work truth first: the free reading rooms under the SNFCC hill are the only real desk in the city. Everything else is for the morning coffee or the long afternoon."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "How the bartenders of a bankrupt city climbed to Europe's top two places, the natural-wine caves, the grand hotels, and what to ask for by name",
          "lede": "The Athens bar wave started in the crisis years and now leads Europe. Drink where the bartenders are, not where the view is; and learn the three drinks the city makes for itself."},
 "listening": {"title": "Hi-fi & listening — rebetiko, jazz and the record", "desc": "The songs to know before you go, the rooms that still play, a jazz cellar, a synth record the crate-diggers hunt, and the one listening room",
               "lede": "Rebetiko is Athens' own music, and half its rooms go dark from June to September. Learn three songs, then find the room that is playing on your night."},
 "around": {"title": "Autour — out of the city", "desc": "The wine plain thirty-five kilometres east, the temple at the end of Attica, and the islands, which are another guide"},
 "follow": {"title": "Follow", "desc": "Who to watch for dates and closures: the festival bill, the live MICHELIN selection, the street-market registry and the listings weekly"},
}

GDESC = {
 ("quartiers", "The historic core"): "The marble base of the rock, from Ottoman bazaar to island lane: walk it at eight, eat elsewhere.",
 ("quartiers", "The creative quarters"): "Workshops, radical presses, pioneer galleries and the rebetiko cellars: mornings for the trades, nights for the music.",
 ("quartiers", "The salon & the tables"): "One slope keeps the old money and the galleries; the other cooks the city's most serious dinners.",
 ("quartiers", "The changing grids"): "Three residential grids under three pressures: the rental tide, the prewar village, the watched revival.",
 ("provisioning", "The markets"): "Two markets on two clocks: the iron-roofed hall from dawn on weekdays, one Exarcheia street on Saturdays only.",
 ("provisioning", "The coffee, the resin and the cured meat"): "A 1922 roaster facing the market, the Chios growers' own counter, and the curing house behind the pastourma.",
 ("provisioning", "The spice row & the sweet houses"): "The Evripidou spice house the trade restocks at, the city's oldest chocolatier, and the loukoumas counter.",
 ("walks", "The marble climbs"): "The listed footpath at golden hour, the pedestrian avenue at dusk when the walls light.",
 ("walks", "The old-town wanders"): "An island village at first light, and the potters' cemetery in its last hour.",
 ("walks", "Out to the pines and the sea"): "The mountain monastery for thyme and honey at dawn, the flat seafront for the evening.",
 ("calas", "The free sand"): "The tram-stop beach and the best free sand within the hour.",
 ("calas", "Paid for — and what you get"): "A fair sunbed over Blue Flag water, and the cove that sells sixty years of patina.",
 ("calas", "Wild water"): "Rocks with no lifeguard and the clearest water near the city, and a warm lake in a fallen cave.",
 ("culture", "The ancient collections"): "The frieze hung to face its temple, and the room that holds the geared bronze.",
 ("culture", "The collectors' houses"): "Three private fortunes turned public: a cotton heir, a shipping family, the man who dug up Troy.",
 ("culture", "The middle centuries & the contemporary"): "The fifteen hundred years everyone skips, the brewery turned art museum, and the park that faces the sea.",
 ("craft", "Do this one"): "The named master, the unbroken family bench, and your own foot on the last.",
 ("craft", "The others, and what each is missing"): "Real benches, real hands, each one thing short of the first.",
 ("craft", "The honest warning"): "What you will not find, so you do not look for it on the last morning.",
 ("coffee-gardens", "Grand rooms & hotel salons"): "Two dressed rooms off Syntagma for an occasion coffee or an afternoon tea.",
 ("coffee-gardens", "Gardens & museum courtyards"): "Two walled gardens in the loud centre, both with a clock: go in the morning.",
 ("coffee-gardens", "Where you can actually work"): "A free library open late, a hostel with desks and a record booth, a Kypseli hub.",
 ("coffee-gardens", "Beautiful. Close the laptop."): "A plane-tree square for ouzo and a book, and the coffee bar that started the third wave: cup first.",
 ("bars", "The list-makers"): "Europe's number one and number two, and the rum room that has stayed on the list longest.",
 ("bars", "Where it started, and the agave room"): "The bar that put Athens on the world map, and the mezcaleria that climbed after it.",
 ("bars", "The natural-wine caves"): "Two all-Greek lists, by the glass, poured by the people who found the growers first.",
 ("bars", "The grand hotels and the one roof"): "Wood and leather on Syntagma, the hotel that hired the best bar team, and one roof for the view.",
 ("bars", "Ask for it by name"): "The resin wine, the anise and the pomace spirits, and the grapes nobody else grows.",
 ("listening", "The songs to know first"): "The patriarch, the occupation's song and its voice, and the year the bouzouki went to Hollywood.",
 ("listening", "The rooms that still play"): "An alley by a Byzantine church, a 1927 taverna, and the winter rooms that go dark in summer.",
 ("listening", "Jazz, vinyl and the listening room"): "A forty-year jazz cellar, the record the crate-diggers hunt, and where to listen.",
 ("around", "The wine country"): "The Mesogeia plain, the savatiano grape, and the winery that brought sommeliers back to it.",
 ("around", "The cape"): "The temple at the end of Attica, and the hour to be there.",
 ("around", "The islands"): "Where the islands went.",
 ("follow", "The programme and the selection"): "The festival bill while the Herodeon is shut, and the stars as they move.",
 ("follow", "The street and the listings"): "Which street market runs which day, and what is open in August.",
}

TABLES_DESC = ("Greece's two-star kitchen at one end and a three-euro wrap at the other: at most three tables of each kind, picked for what you "
               "should not miss in this city, every card saying when it was last confirmed trading.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "1922", "towns": "THE QUARTERS", "when": "WHEN TO COME", "restaurants": "THE TABLES",
              "markets": "THE LARDER", "walks": "WALKS", "sea": "THE RIVIERA", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, 1922, the quarters, the month", "tables": "", "flaner": "the marble, the sea, the collections, the hand, the rooms to sit in",
               "sortir": "the bars that lead Europe, the natural wine, rebetiko and the listening room", "around": "the wine plain, the cape, the islands",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for: the two-star on the opera roof, the oldest star in the city, the farm and its Green Star, and three big nights without the ceremony.",
              "petite": "Where this guide actually lives: the chefs' own night-off grills, the kitchen 1922 carried in, the cellar taverns with a date over the door, the neighbourhood fires, the city's newest kitchens, and the morning the old way.",
              "street": "Standing up: the skewer, the spit and the kebab, the bakers and the pots, and what still feeds you after the bars."}

LANE_LEAD = {
 "creme": "The three tasting menus Athens is judged on: the two-star on the opera roof, the French-school house in Pangrati, the farm behind the stadium.",
 "destination": "The big night without the ceremony: the Grande Bretagne roof, a wood fire behind the Hilton, twelve stools off Syntagma.",
 "chefs-eat": "Not the rankings: the addresses Athens cooks give for their night off, and who said so.",
 "asia-minor": "The kitchen of 1922: the pastourma row on Evripidou, the curing house itself, and a cafe aman in the refugee belt.",
 "story": "A 1913 lease, a 1927 vine and a 1930 butcher's pot: the cellar taverns still working the old way.",
 "gems": "Three neighbourhood rooms on wood and charcoal: Pangrati's market fire, Exarcheia's blackboard, a 1967 Ilisia grill.",
 "ethnic": "The city's newest map: Antioch lahmajun in Psyrri, Greek-Asian on Voulis, a Georgian clay oven in Kypseli.",
 "breakfast": "The morning the old way: the last milk-shop, the 1923 loukoumas house, and the coffee room competition baristas built.",
 "souvlaki": "The street's whole argument in fifty metres: the 1946 wrap, the chefs' spit, and the Monastiraki kebab.",
 "bargain": "Baked before eight, cooked before noon: the koulouri oven, the kourou pie, a window of pots in Mets.",
 "late-night": "After the bars: the market soup at dawn, the Psyrri bougatsa through the night, the Kerameikos skewer.",
}

LANE_STORY = {
 "creme": {"title": "Three answers from one city",
   "story": ("Greece won its first two MICHELIN stars in 2022, in a glass box on the roof of an opera house built over a silted river delta, and the "
             "city's top kitchens have argued since about what a Greek tasting menu should be. Delta answers with Nordic training and small Greek "
             "producers. Spondi, open since 1996, answers in the French grammar Athens learned fine dining in, cheese trolley and all. Soil answers "
             "from a vegetable plot at Alepochori, west of the city, with a Green Star beside its star. The three menus share almost nothing but the "
             "country: book two of them and you will taste the argument."),
   "where": "Delta on the SNFCC opera roof; Spondi in Pangrati; Soil behind the Panathenaic Stadium"},
 "destination": {"title": "The big night, without the ceremony",
   "story": ("Not every big night wants twelve courses and a deposit. These are the three evenings out the city books for itself. The Grande "
             "Bretagne's eighth-floor terrace puts the Parliament directly below you and the floodlit rock straight ahead. Behind the Hilton, a "
             "wood-fire bistro cooks dry-aged beef and whole Aegean fish over the same flames, and is where the city's cooks go when they cook for "
             "no one. Off Syntagma, twelve stools face a counter where Greek fish is cut in the old Tokyo manner and the chef decides the order. "
             "Three rooms, three kinds of evening, and none of them needs a dress code to be enjoyed."),
   "where": "GB Roof Garden on Syntagma; Vezené in Ilisia; Sushimou on Skoufou"},
 "chefs-eat": {"title": "Ask a cook where they eat",
   "story": ("Ask an Athens chef where they eat on a night off and the answer is never a tasting menu. This lane is built only from named answers "
             "the city's chefs gave to This Is Athens, the city's own guide. Alexandros Tsiotinis of CTC sends people to a paper-tablecloth corner in "
             "Metaxourgeio. Manolis Papoutsakis of Pharaoh calls lamb and retsina in a Pangrati half-basement an Athenian staple. Andreas "
             "Kiltsiksis of Feyrouz names a Thissio grill for the lamb chops. Two of the three come down to paidakia off charcoal, eaten with the "
             "fingers: the plate this city's cooks reach for when nobody is watching."),
   "where": "Seychelles in Metaxourgeio; Mavros Gatos in Pangrati; To Steki tou Ilia in Thissio"},
 "asia-minor": {"title": "1922, still on the menu",
   "story": ("The cooking that came with the refugees of 1922 did not stay in the new towns named for the lost cities. It moved into the market "
             "quarter, onto Evripidou, where the curers hung beef under a crust of fenugreek, garlic and paprika and the whole street took the "
             "smell. Eat it three ways here: a deli-meze that revives the interwar pastourma shops, the curing house that has worked the same "
             "street for four generations, and a cafe aman out in Nea Chalkidona, where the meze comes round on a tray and, on music nights, "
             "the room answers the singer. The full story is in the food-history fold above."),
   "where": "Ta Karamanlidika tou Fani and Miran on Evripidou; Peran in Nea Chalkidona"},
 "story": {"title": "The rooms with a date over the door",
   "story": ("A koutouki is a cellar tavern: barrels on the wall, a few pots, a table you share with whoever came down the stairs. Three rooms in "
             "this guide still work that way, and each carries a date. Under Sokratous, a wine cellar whose 1913 lease survives, where the day's "
             "food is whatever was cooked at dawn. On Plateia Theatrou, a 1927 taverna with barrels for a back wall and musicians several nights "
             "a week. On Troon, in Petralona, a butcher's shop that put one pot on the fire in 1930 and turned into a dining room. Go when the "
             "pots are full: in all three, service ends when they are empty."),
   "where": "Diporto under Sokratous; Klimataria on Plateia Theatrou; Taverna tou Oikonomou on Troon"},
 "gems": {"title": "The neighbourhood fire",
   "story": ("Three rooms the neighbourhoods kept for themselves, all cooking over wood or charcoal. Near Proskopon Square in Pangrati, a fire that "
             "never goes out and a menu rewritten every morning around what the market had, with a bakery counter at the door. On Solomou, at the "
             "edge of Exarcheia, a kitchen that runs on wood and charcoal alone, a nightly blackboard of regional Greek recipes and a wall of "
             "natural wine you can carry home. In Ilisia, in the hospital district, a grill that has fed the same block since 1967 by changing "
             "nothing. Order what the day decided."),
   "where": "Akra in Pangrati; Pharaoh on Solomou; Skalakia in Ilisia"},
 "ethnic": {"title": "The newest map of the city",
   "story": ("Athens was remade by people who arrived carrying a kitchen, and it still is. In Psyrri, a family whose road ran from Antakya through "
             "Istanbul rolls lahmajun at a counter named for their mother. On Voulis, a small room pulls Greek fish and meat through Japanese, "
             "Vietnamese, Korean and Chinese technique, two fast sittings a night. Up in Kypseli, where the newest arrivals are Georgian, West "
             "African and Filipino, a Georgian baker works a bell-mouthed clay oven in a shop window. None of it is Greek food. All of it is "
             "Athens food now."),
   "where": "Feyrouz in Psyrri; Nolan on Voulis; Marili in Kypseli"},
 "breakfast": {"title": "The morning, the old way and the new",
   "story": ("Before espresso, Athens took its morning in a galaktopoleio, a milk-shop: sheep's-milk yogurt, rice pudding, a slab of custard "
             "pie, eaten standing and quickly. One survives off Omonia, still buying from the family's mountain herds. On Aiolou, the loukoumas "
             "house the Asia Minor refugees made their meeting point has fried rings under a pharmacist's old name since 1923. And the city's new "
             "morning was built by competition baristas: in Thissio, a roastery staged in the middle of the room, and a brunch the others copy."),
   "where": "Stani off Omonia; Krinos on Aiolou; The Underdog in Thissio"},
 "souvlaki": {"title": "Fifty metres of argument",
   "story": ("The street's whole argument fits on one square and one corner. On Agia Irini, a closet-sized counter has wrapped pork in pita since "
             "1946 and pulls the shutter when the day's meat runs out; thirty metres away, five chefs bake their own bread for a whole-carcass "
             "spit. Down on Mitropoleos is the third thing, neither stick nor spit: the charcoal mince cylinder Athenians simply call kebab. "
             "Learn the words before you queue. Here a kalamaki is the bare skewer and a souvlaki is the whole wrap, the reverse of Thessaloniki, "
             "and the counter knows which you are the moment you order."),
   "where": "Kostas and Hoocut on Plateia Agias Eirinis; O Thanasis on Mitropoleos"},
 "bargain": {"title": "Baked before eight, cooked before noon",
   "story": ("The cheapest good food in Athens has a clock. The sesame rings on the street carts are baked before dawn in one Psyrri workshop, "
             "and bought there they still crack. On Voulis, a pie shop founded in 1910 rolls a crumbly kourou dough round barrel feta, and the "
             "warm trays are gone by noon. In Mets, below the marble stadium, a window of pots shows you the day's cooking: you point, you sit, "
             "and lunch with wine rarely passes fifteen euros. All three are finished by the afternoon, so this lane is for the morning."),
   "where": "To Koulouri tou Psirri on Karaiskaki; Ariston on Voulis; Olympion in Mets"},
 "late-night": {"title": "What the night eats",
   "story": ("Athens eats late, and the night has its own canon. The tripe soup of the Varvakios meat market was for a century the last stop "
             "after the bars; the cook-house now keeps market hours, so it is the first stop of the morning instead, clubbers and butchers on "
             "the same benches. In Psyrri, on Plateia Iroon, bougatsa phyllo is opened by hand on marble in the window into the small hours. "
             "And in Kerameikos, an old butcher's corner grills bare pork skewers over charcoal until the neighbourhood's bars have emptied."),
   "where": "Oinomageireio I Ipeiros in the Varvakios; Bougatsadiko I Thessaloniki on Plateia Iroon; Elvis on Plataion"},
}

# guest-list charters: built only from each venue's own fields (filled after the 13 Oct verification, see build)
CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — a glass, the table, the music and the late plate.",
  "note": "Le verre · la table · la musique", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the year the refugees rewrote the menu, the market at dawn, the dishes born here, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: these three take people the same evening. Hours as read on 13 Oct 2026 are on each card — call ahead.",
             "Plan ahead — this week": "Book a few days ahead: the wood fire behind the Hilton, the Exarcheia kitchen with no gas, and the Greek-Asian room on Voulis.",
             "Plan ahead — the grand night": "The two-star on the opera roof, the oldest star in the city, and the Grande Bretagne roof: book as soon as the dates are fixed."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

# exact edits to reused old blocks (asserted by the build)
EDITS = {
 "bougie": [],
 "avoid": [("The Odeon of Herodes Atticus played a farewell programme in June 2026 and is now sealed for a roughly three-year restoration; nothing performs under the Acropolis slope until it reopens. <em>Instead:</em> The Athens Epidaurus Festival carries on at Peiraios 260 in the city and at the Ancient Theatre of Epidaurus — check the current bill at aefestival.gr.",
            "The Odeon of Herodes Atticus is shut for restoration after its 2026 season. <em>Instead:</em> the festival's other stages, told under Follow.")],
 "seasonal": [],
 "sources": [],
}
AVOID_TITLE = ("What to skip", "Athens hides its worst meals in its prettiest settings: the four things to leave alone, and what to do instead")

# La liste: authored for this pass (the old page had none). Facts from the guide's dish, drink and venue cards.
# (name, say, fav, what, why, where-text, maps query)
LISTE = [
 ("Kalamaki", "ka-la-MA-kee", True, "The bare pork skewer off the charcoal, eaten from the stick with a quarter of grilled pita.",
  "In Athens the stick is the kalamaki and the souvlaki is the whole wrap: the reverse of Thessaloniki.", "Elvis, Kerameikos — order by the pair", "Elvis Plataion 29 Athens"),
 ("Souvlaki me ap' ola", "soo-VLA-kee meh ap-OH-la", False, "Pork in a soft pita with chopped tomato, onion and a red sauce, wrapped in paper and eaten standing.",
  "The wrap is post-war Athenian; the oldest counter on Agia Irini has sold it since 1946.", "Kostas, Plateia Agias Eirinis — before the meat runs out", "Kostas Plateia Agias Eirinis Athens"),
 ("Gyros", "YEE-ros", False, "Marinated pork slices stacked on a vertical spit, shaved thin so each serving has a burnt edge.",
  "The spit came with the 1922 refugees as doner; Athens made it pork and named it 'the turn'.", "Hoocut, Plateia Agias Eirinis", "Hoocut Plateia Agias Eirinis Athens"),
 ("Kebab, Monastiraki", "keh-BAP", False, "Hand-formed lamb-and-beef mince grilled as a cylinder over charcoal, laid on pita with onion and paprika.",
  "Since 1964 one corner of Mitropoleos has fought a kebab war with the house across the street.", "O Thanasis, Mitropoleos 69", "O Thanasis Mitropoleos 69 Athens"),
 ("Paidakia", "pay-DHA-kya", True, "Thin lamb chops, charred at the edges, eaten with the fingers and cold retsina.",
  "The plate three of this city's chefs named, separately, for their own night off.", "To Steki tou Ilia, Thissio", "To Steki tou Ilia Thessalonikis 7 Athens"),
 ("Soutzoukakia smyrneika", "soo-dzoo-KA-kya smeer-NAY-ee-ka", False, "Oval meat rolls with cumin, garlic and wine-soaked bread, simmered in tomato and allspice.",
  "Smyrna's dish, carried to Athens by the refugees of 1922.", "Taverna tou Oikonomou, Troon, Ano Petralona", "Taverna tou Oikonomou Troon 41 Athens"),
 ("Pastourma", "pa-stoor-MAS", True, "Air-cured beef under a rust-red crust of fenugreek, garlic and paprika, sliced paper-thin.",
  "An Armenian refugee from Kayseri began curing it in 1922; his grandsons still do, on the same street.", "Miran, Evripidou 45 — vacuum-packed for the galley", "Miran Evripidou 45 Athens"),
 ("Lahmajun", "lah-ma-DZOON", False, "Paper-thin dough under spiced minced beef, rolled hot with greens, sumac and lemon.",
  "Antioch by way of Istanbul, at a Psyrri counter since 2014: the city's refugee story told again in dough.", "Feyrouz, Karori 23, Psyrri", "Feyrouz Karori 23 Athens"),
 ("Patsas", "pa-TSAS", True, "Tripe soup, white and scalding, sharpened at the table with garlic steeped in vinegar.",
  "The market porters' dawn fuel and the city's sworn cure for the night before.", "Oinomageireio I Ipeiros, inside the Varvakios", "Oinomageireio Epirus Varvakios Athens"),
 ("Magiritsa", "ma-yee-REE-tsa", False, "Lamb offal and lettuce with dill and spring onion, bound with egg and lemon.",
  "Eaten once a year, after the midnight Resurrection; one market cook-house serves it on ordinary days.", "Oinomageireio I Ipeiros, Varvakios", "Oinomageireio Epirus Varvakios Athens"),
 ("Koulouri", "koo-LOO-ree", False, "A thin bread ring rolled in sesame and baked hot, the walking breakfast of the working city.",
  "Almost every downtown cart loads at one Psyrri bakery before sunrise.", "To Koulouri tou Psirri, Karaiskaki 23", "To Koulouri tou Psirri Karaiskaki 23 Athens"),
 ("Tyropita kourou", "tee-RO-pee-ta koo-ROO", False, "A half-moon of crumbly butter-and-yogurt dough round barrel feta, eaten warm.",
  "Kourou is from the Turkish for 'dry': not phyllo, the city's own morning pie.", "Ariston, Voulis 10 — before noon", "Ariston Voulis 10 Athens"),
 ("Loukoumades", "loo-koo-MA-dhes", False, "Yeast fritters fried to a crisp shell, drowned in honey syrup and cinnamon.",
  "The tale that they were prizes for Olympic victors is in no surviving text; the shop culture is real.", "Krinos, Aiolou 87", "Krinos Aiolou 87 Athens"),
 ("Bougatsa", "boo-GA-tsa", False, "Hand-opened phyllo round custard, mince or cheese, buried in icing sugar and cinnamon.",
  "Thessaloniki's pastry, which Athens imports: here it is best when the bars have just shut.", "Bougatsadiko I Thessaloniki, Plateia Iroon", "Bougatsadiko I Thessaloniki Plateia Iroon Athens"),
 ("Galaktoboureko", "ga-lak-to-BOO-reh-ko", False, "Semolina custard baked in buttered phyllo and soaked in lemon syrup while hot.",
  "Its home was the milk-shop of the pre-espresso city; one is left.", "Stani, Marikas Kotopouli 10", "Stani Marikas Kotopouli 10 Athens"),
 ("Horiatiki", "hor-YA-tee-kee", False, "Tomato, cucumber, green pepper, onion, olives, a slab of barrel feta, oregano and oil. Never lettuce.",
  "The one canon dish Athens invented, in the Plaka tavernas of the 1960s and 70s; no village was involved.", "Skalakia, Ilisia, with the grill", "Skalakia Dionysiou Aiginitou 32 Athens"),
 ("Retsina", "ret-SEE-na", True, "Savatiano white with Aleppo-pine resin added in fermentation, drunk cellar-cold.",
  "The resin is fixed by law between 0.15 and 1 per cent: in the revival bottles it reads as herb.", "Domaine Papagiannakos, Markopoulo — the Retsina of Mesogaia", "Domaine Papagiannakos Markopoulo Attica"),
 ("Tsipouro", "TSEE-poo-ro", False, "A spirit distilled from grape pomace, with or without anise, ordered by the karafaki with mezedes.",
  "It keeps the fruit that ouzo, a re-distilled neutral spirit, does not.", "Skalakia, Ilisia — the house tsipouro to open", "Skalakia Dionysiou Aiginitou 32 Athens"),
 ("Ouzo", "OO-zo", False, "Neutral spirit re-distilled with anise, turned milk-white by water or ice.",
  "EU law reserves the name for Greece and Cyprus.", "Dexameni, Kolonaki — at the plane-tree tables", "Dexameni Kolonaki Athens"),
 ("Ellinikos kafes", "el-lee-nee-KOS ka-FES", False, "Powder-fine coffee boiled slowly in a briki, served with its foam and the grounds left to settle.",
  "Order it sketos, metrios or glykos: the sugar goes in the pot, never after.", "Mokka, Athinas 44 — on hot sand", "Mokka Athinas 44 Athens"),
 ("Mastiha", "MA-stee-ha", False, "The resin of the Chios lentisk tree: chewed raw, or as a liqueur and sweets.",
  "Only the mastic villages of southern Chios can make the tree weep; the know-how is on UNESCO's list.", "Mastihashop, Panepistimiou 6", "Mastihashop Panepistimiou 6 Athens"),
]
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): exact edits to the ten old dish articles
DISH_EDITS = []

# gem popups: the old seven, kept where their pattern still occurs in the prose
GEM_STORY = {
 "gem-loukoumades": ("Honey fritters, and a legend to drop: no surviving text of Callimachus makes them prizes for Olympic victors. What is real is a century of shop culture in this city; The Dish, at the foot, tells it.",
                     "Krinos, on Aiolou since 1923."),
 "gem-freddo-espresso": ("Espresso shaken hard over ice until it foams, credited to a Thessaloniki café in 1991; cold coffee is now most of what Greece drinks in a cup. Say how sweet before it is shaken: the sugar goes in the shaker, never after.",
                         "Any café in town will shake one; La liste at the foot has the old coffee too."),
 "gem-horiatiki": ("The 'village salad' is an Athens invention of the tourist boom, and the honest one has no lettuce in it. The Dish, at the foot, has the story of the price rule it was built to escape.",
                   "Skalakia in Ilisia serves it with the grill."),
 "gem-soutzoukakia": ("Smyrna's cumin meat rolls, simmered in tomato: the emblem of the kitchen the refugees of 1922 carried in. The Dish, at the foot, has the technique that separates them from keftedes.",
                      "Taverna tou Oikonomou or Klimataria, from the pots."),
 "gem-gyros": ("The vertical spit came west with the refugees of 1922 and Athens made it pork; the name means 'the turn'. The Dish, at the foot, tells the rest.",
               "Hoocut, on Plateia Agias Eirinis."),
 "gem-retsina": ("White wine with pine resin added in the vat, by law a small fraction of a per cent. The revival bottles from the Mesogeia read as herb, not hardware: the card under Ask for it by name has the names.",
                 "Domaine Papagiannakos in Markopoulo, or by the glass in the city's natural-wine caves."),
 "gem-koulouri": ("The sesame ring sold from the street carts is baked before dawn in one Psyrri workshop; buy it at the source and it still cracks. The Dish, at the foot, tells where the ring comes from.",
                  "To Koulouri tou Psirri, Karaiskaki 23."),
}

GLOSS = [
 ["kalamaki", "the bare skewer of grilled meat, pork unless you say otherwise; in Athens 'souvlaki' means the whole wrap"],
 ["souvlaki", "in Athens, the wrapped pita with meat, tomato and onion; the bare skewer is a kalamaki"],
 ["souvlatzidiko", "a souvlaki shop"],
 ["gyros", "meat stacked on a vertical spit and shaved; Greek for 'turn'"],
 ["paidakia", "lamb chops, grilled thin over charcoal"],
 ["mageireio", "a cook-house: the day's pots in a glass case, you point and eat"],
 ["mageirefta", "stove-cooked dishes, the pots of the day"],
 ["koutouki", "a cellar tavern, with barrels and a few pots"],
 ["koutoukia", "cellar taverns, with barrels and a few pots"],
 ["kafeneio", "the traditional coffee house"],
 ["laiki", "the weekly street market, one street on one day"],
 ["laikes", "the weekly street markets"],
 ["mezedes", "small plates for the table, eaten with a drink"],
 ["ouzeri", "a bar-restaurant built round ouzo and small plates"],
 ["retsina", "white wine with Aleppo-pine resin added during fermentation"],
 ["savatiano", "the white grape of the Mesogeia plain east of Athens, and of most retsina"],
 ["tsipouro", "pomace spirit, with or without anise"],
 ["tsikoudia", "the Cretan pomace spirit, single-distilled and never anise"],
 ["karafaki", "the small carafe spirits are ordered in"],
 ["briki", "the small long-handled pot Greek coffee is boiled in"],
 ["hovoli", "hot sand or embers the briki is set in to heat slowly"],
 ["kaimaki", "the foam on top of a Greek coffee, the maker's test"],
 ["sketos", "Greek coffee with no sugar"],
 ["metrios", "Greek coffee with one sugar"],
 ["glykos", "Greek coffee with two sugars"],
 ["freddo", "iced espresso shaken with ice, a Greek invention of the 1990s"],
 ["rebetiko", "the urban song of the ports and the refugee quarters, on the bouzouki"],
 ["rebetes", "the musicians and singers of rebetiko"],
 ["kompania", "the group of musicians who play rebetiko together at the table"],
 ["teke", "the hashish den where rebetiko was played before it reached the records"],
 ["cafe aman", "the improvised-song coffeehouse of Smyrna and Constantinople, where the room answers 'aman, aman'"],
 ["zeibekiko", "the solo dance of rebetiko, danced for oneself"],
 ["entechno", "'art song': the 1960s fusion of rebetiko with poetry and orchestral writing"],
 ["polykatoikia", "the concrete apartment block that built modern Athens"],
 ["antiparochi", "the flats-for-land deal: a landowner traded his plot for apartments in the block built on it"],
 ["galaktopoleio", "the old milk-shop: yogurt, rice pudding, custard pie and milk, eaten standing"],
 ["pastourmatzidiko", "a pastourma shop"],
 ["tsimeni", "the fenugreek, garlic and paprika paste that crusts pastourma"],
 ["pastourma", "air-dried cured beef under a spice crust"],
 ["lakerda", "bonito cured in brine, the pride of the ouzeri table"],
 ["palamida", "Atlantic bonito, running in late summer and autumn"],
 ["agourelaio", "unripe-olive oil from the first harvest: green, peppery, unfiltered"],
 ["trygos", "the grape harvest"],
 ["horta", "wild or cultivated boiled greens, dressed with oil and lemon"],
 ["patsas", "tripe soup"],
 ["magiritsa", "the Easter offal soup bound with egg and lemon"],
 ["avgolemono", "egg-and-lemon, beaten into a broth off the heat to thicken it"],
 ["skordostoumpi", "garlic steeped in vinegar, added to patsas at the table"],
 ["kourou", "crumbly pie dough of butter and yogurt, not phyllo; from the Turkish for 'dry'"],
 ["bougatsa", "phyllo pastry round custard, cheese or mince, from Thessaloniki"],
 ["loukoumades", "yeast fritters in honey syrup"],
 ["koulouri", "the sesame bread ring"],
 ["volta", "the evening stroll"],
 ["Dekapentavgoustos", "15 August, the Dormition: the day Athens empties for the holidays"],
 ["Tsiknopempti", "'smoky Thursday' of carnival, when the whole city grills"],
 ["horiatiki", "the 'village' salad: tomato, cucumber, onion, olives, feta, no lettuce"],
 ["kokoretsi", "lamb offal wrapped in intestine and turned on a spit"],
 ["mezes", "a small plate eaten with a drink"],
 ["taverna", "the neighbourhood restaurant with a short menu and house wine"],
]
