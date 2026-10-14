"""Hand-written prose for the Piraeus-Saronic GOLD6 build (14 Oct 2026). Facts only from the guide (its July 2026 research),
the 14 Oct re-check packs in research/, and nothing else; every edit to an old block is an exact (old, new) pair, asserted
by the build. The old page was GOLD3, so the GOLD4/GOLD5 floor (lanes with stories, the guest list, La liste with The Dish,
the hot board and its pointer, the calendar, the craft section, the listening room, Autour) is written here for the first time."""
import re

TITLE = "Piraeus & the Saronic — Terroir Guide"
DESC = ("Piraeus for people who cook: the fish chosen off the ice and paid by the kilo, the dawn auction at Keratsini, the refugee "
        "kitchens of 1922, rebetiko in the back streets — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Piraeus</h1><div class="region">Piraeus · Saronic Gulf · Greece</div><div class="philosophy">"Three harbours, '
        'a former island, a landfall table — Piraeus eats what the boat brought, to a bouzouki."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Peiraieus, from <strong>peran</strong>, \'across, the far side\': the land you had to be ferried over to reach.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>A low salt-flat, the Halipedon, once cut the Piraeus rock off '
          'from Attica, and Strabo wrote that it had formerly been an island. Historians filed that as folklore until 2011, when boreholes drilled into '
          'the coastal plain showed the rock really did stand in a shallow marine bay in the fifth and fourth millennia BC. The derivation from peran is '
          'the one the ancients gave and most modern readers accept; the plate that follows keeps the meaning either way: everything here arrives across water.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Piraeus is three harbours and a former island, and it eats whatever crossed the water that morning:</strong> '
        'fish picked off the ice by eye, weighed in front of you and paid by the kilo, the meze of the refugees of 1922, the ouzo that slows it all down. '
        '<strong>Make or break:</strong> choose the fish yourself and ask the price per kilo before the scale moves, then eat a street back from the view — '
        'Hatzikyriakio, Keratsini, Drapetsona, Kokkinia — where the port feeds itself. <strong>The warning:</strong> a laminated photo-menu and a host on the '
        'Mikrolimano pavement are the one reliable trap signal on this coast, and a round-number taxi fare at the ferry gate is the other. Athens has '
        '<a href="/terroir/Athens-Attiki/">its own guide</a>.</p></div>')


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
                      '<div class="sfold__desc">The horns at dawn, the island that silted to the mainland, Themistocles\' three harbours, the city Sulla burned, '
                      'the mud shore of 1834 and the refugees of 1922: a port that has only ever dealt with the world across water</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


# The food-history callout (#bougie): written fresh from the old #eat prose, which this build no longer prints.
BOUGIE = "\n".join([
 '<details class="sfold" id="bougie">', "<summary>", "<div>",
 '<div class="sfold__title">By the kilo — how the port eats</div>',
 '<div class="sfold__desc">Not a recipe but a transaction: the fish chosen by eye, the one plate this harbour invented, and the soup named for its pot</div>',
 "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
 '<p class="gx-lede">The defining act of a Piraeus meal happens before anything is cooked: you walk to the ice, point at a fish, watch it weighed and '
 'hear its price by the kilo.</p>',
 '<p>The trinity on the ice is tsipoura, lavraki and barbouni — bream, bass and red mullet — cleaned whole, grilled over charcoal and lifted off the bone '
 'at the table under oil, lemon and oregano. The catch has been sold before the terraces wake: at the ichthyoskala on the Keratsini edge the crates go '
 'under floodlight in the small hours, and the cook-house among the auction\'s tables is the nearest a visitor gets to that dock. Greece farms more bream '
 'and bass than any other Mediterranean country, so the neat sub-kilo fish at a friendly price is usually from a cage; the fish a farm cannot fake is the '
 'cheapest on the counter, the gavros and marides fried whole.</p>',
 '<p>The harbour invented exactly one plate. Garides saganaki — whole shrimp in garlicky tomato, a splash of ouzo, feta melted through — was worked out in '
 'the Mikrolimano fish houses in the early 1960s, when the crescent was still called Tourkolimano. The humblest dish travelled furthest: kakavia, the '
 'fishermen\'s soup of the rockfish nobody would buy, named for the tripod pot set on the sand, went up to a starred kitchen on the same quay without '
 'changing the fish. Then 1922 laid a second table over the first — cumin, pastourma, the Pontic pie — in the quarters the refugees built behind the '
 'cranes. The Dish and La liste, at the foot of this guide, take each plate in turn.</p>',
 "</div>", "</details>"])

FOLDS = {
 "quartiers": {"title": "The quarters — three harbours, a hill and the refugee city", "desc": "Nine quarters round three harbours: the fishing crescent, the round marina, the hill above, the sunset rocks and the grids the refugees of 1922 built",
               "lede": "Piraeus is not one waterfront: it is three harbours and the quarters behind them, each with its own hour. The view is on the hill; the cooking is a street back and over in the refugee grids."},
 "provisioning": {"title": "The larder — the auction, the market and the port's own shops", "desc": "Where a galley provisions: the dawn fish auction, the market shed and its century-old shops, the pastourma curer, the phyllo, the spice sacks and the ship chandler",
                  "lede": "Everything a galley needs is within a walk of the central market, and the fish is a short taxi away at the auction: go early, carry cash, bring a cool bag."},
 "walks": {"title": "Walks & the ancient ground", "desc": "Six routes round the three harbours and the ancient trace: the crescent and the hill at dusk, the round war-harbour, the sea-wall to the lighthouse, the gate of the walls",
           "lede": "The port is flat at the water and steep behind it: the harbours are an evening loop, the hill is stairs, and the ancient walls surface in the sea at the Piraiki. Walk the west-facing coast at the end of the day."},
 "calas": {"title": "The sea — the town beaches and the nearest sand", "desc": "Five swims within reach of the ferry gates: two town beaches, the flat rocks the port swims off, and the nearest sand by tram",
           "lede": "You can swim inside a working port: the town beaches below Kastella, the flat rocks of the Piraiki, and real sand a tram ride east."},
 "culture": {"title": "Culture & the collections", "desc": "Four bronzes pulled from a drain, the slipways of the trireme fleet, a museum built round a sea-wall, an 1895 stage, a 2,000-seat hill and a refugee-quarter cinema"},
 "craft": {"title": "The hand — craftsmanship", "desc": "The last rope-house cutting to the metre, a sail loft above the fishing harbour, and the honest word about classes",
           "lede": "Piraeus keeps the trades of a port: rope, sail and the ship's store. Neither bench runs a class you can enrol in; what you can do is buy, commission, and watch the work."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "Two market kafeneia where time stopped, three rooms with a desk and good coffee, and two where the laptop stays shut",
                    "lede": "The honest work truth first: the port's real desks are in its roasteries, by day. The market kafeneia are for a briki coffee at seven; the marina salons for the long evening."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The yacht club over the moorings, two roofs, the port's wine rooms and its late bars, and the two drinks to ask for by name",
          "lede": "Piraeus drinks at the water first and late second. Take the sundowner over the boats, then the wine rooms in the centre; and learn what the port pours with its fish."},
 "listening": {"title": "Hi-fi & listening — rebetiko, where it was born", "desc": "The music forged in the port's hash-dens and refugee quarters, the four men of 1934, the rooms that still play acoustic, the song of 1960, and the honest word on hi-fi",
               "lede": "Rebetiko was made in these back streets, and the real room is acoustic: bouzouki, baglama, guitar, no amplifier, starting late. Learn the story here, then find the room that is playing on your night."},
 "around": {"title": "Autour — the Saronic", "desc": "The gulf the ferries cross: the pistachio island an hour out, the island across the strait of 480 BC, and the car-free port further down"},
 "follow": {"title": "Follow", "desc": "Who to watch before you leave home: the port authority's departures, the coast guard's sailing bans, the town's calendar, and the shipping week that books it out"},
}

GDESC = {
 ("quartiers", "The three harbours & the hill"): "The fishing crescent, the round marina where the town lives, and the stacked hill above both.",
 ("quartiers", "The shore & the local squares"): "The sunset rocks, a pocket beach on an ancient court, and four squares where the port is just a town.",
 ("quartiers", "The working port & the refugee city"): "Ferry gates and the 1869 railway, then the grids 1922 built: come for the tables.",
 ("provisioning", "The markets"): "Two clocks: the auction in the dark at Keratsini, the market shed in the morning.",
 ("provisioning", "The curer, the phyllo and the sweet"): "Four generations of pastourma, the phyllo the tavernas buy, and the custard pie to carry aboard.",
 ("provisioning", "The spice sacks, the roaster and the ship's store"): "Open sacks since 1955, nuts roasted behind the counter, and four floors of chandlery.",
 ("walks", "The harbours' round"): "The crescent and the hill at dusk, the round war-harbour in the morning, the climb to the summer stage.",
 ("walks", "The coast and the ancient trace"): "The sea-wall to the lighthouse at sunset, the gate of the walls, the belle-époque grid on ancient lines.",
 ("calas", "In town: the pebble and the rock"): "Two town beaches under Kastella, and the flat rocks the port itself swims off.",
 ("calas", "The nearest sand"): "Real sand a tram ride east: the closest, and the cleaner one further on.",
 ("culture", "The bronze, the slipway, the sea-wall"): "The bronzes from the drain, the trireme slipways in a basement, and the museum round a sea-wall.",
 ("culture", "The stage, indoors and open to the gulf"): "An 1895 wooden stage in winter, a hill of seats over the gulf in summer.",
 ("culture", "Painters and the summer screen"): "Greek painting in an old post office, and a municipal cinema in the 1922 quarter.",
 ("craft", "Do this one"): "The last rope-house of the port, rope cut to the metre from a counter of 1936.",
 ("craft", "The other, and what it is missing"): "A working sail loft: real hands, by appointment only.",
 ("craft", "The honest warning"): "What you will not find, so you do not look for it on the last morning.",
 ("coffee-gardens", "The old market kafeneia"): "Briki coffee among the market porters, and a room where the clock stopped: ring first.",
 ("coffee-gardens", "Where you can actually work"): "Three rooms with good coffee and a table for the laptop, by day.",
 ("coffee-gardens", "Beautiful. Close the laptop."): "An art-deco salon on the marina, and a fast all-day room: cup first.",
 ("bars", "At the water and above it"): "The yacht club over the moorings, the decks over the caiques, and the roof level with the port.",
 ("bars", "The wine rooms"): "The oyster bar with the natural list, a small-grower cave, and the newest room.",
 ("bars", "The late rooms"): "A rock bar on the marina since 2008, and a cocktail room on the Piraiki.",
 ("bars", "Ask for it by name"): "The resin wine the port drinks with fried fish, and the anise spirit that slows the meze.",
 ("listening", "Where the music was born"): "The hash-dens and the refugee quarters, the four men of 1934, and the one rebetis born here.",
 ("listening", "The rooms that still play"): "Acoustic, late and sung along: the back rooms where the neighbourhood still plays.",
 ("listening", "The song the world knows, and the listening room"): "The 1960 song that won an Oscar, and the honest word on hi-fi.",
 ("around", "The near islands"): "The pistachio island across the gulf, and the island across the strait.",
 ("around", "Further down the gulf"): "No cars, a horseshoe port: a long day by fast boat.",
 ("follow", "The boats"): "Which gate, which boat, and whether it sails when the wind blows.",
 ("follow", "The town's calendar"): "The town's own festivals, and the shipping week that fills every table.",
}

TABLES_DESC = ("A fish house open since 1932 at one end and a two-euro wrap at the other: at most three tables of each kind, picked for what "
               "you should not miss in this port, every card saying when it was last confirmed trading.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "BY THE KILO", "towns": "THE QUARTERS", "when": "WHEN TO COME", "restaurants": "THE TABLES",
              "markets": "THE LARDER", "walks": "WALKS", "sea": "THE SEA", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "THE ISLANDS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the kilo, the quarters, the month", "tables": "", "flaner": "the harbours, the sea, the bronzes, the rope, the rooms to sit in",
               "sortir": "the bars over the water, the wine rooms, rebetiko where it was born", "around": "the Saronic islands",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for: three named fish houses on the Mikrolimano crescent, the ones worth walking past the touts for.",
              "petite": "Where this guide actually lives: the fry with no menu and the hill with the view, the auction's own canteen, the ouzeri, the barrel rooms, the refugee kitchens, and the port's other kitchens.",
              "street": "Standing up: the grill and the wrap, the dawn pies and the custard, and what still feeds you after the boat."}

LANE_LEAD = {
 "mikrolimano": "The three named houses on the crescent: the chef who cooked at sea, the family fish house of 1932, the plainest grill on the quay.",
 "fry-hill": "A fry with no menu since 1944 by the Naval Academy, and a 1957 taverna at the top of Kastella with the gulf below.",
 "working-port": "The canteen inside the fish auction, and the ouzeri on Keratsini's little harbour under a dead power station.",
 "ouzeri": "A captain's eight tables, a producer-built meze kitchen in a 1920 house, and the Ikarian sailors' kafeneio.",
 "koutoukia": "Retsina from the barrel since 1920, the 1896 room where the quartet played, and a 1958 fig-tree yard in Kokkinia.",
 "refugee": "The kitchens of 1922: Smyrna at a Nikaia table, and the oldest taverna in Drapetsona.",
 "other": "Constantinople on the Mikrolimano quay, a six-table Thai room in the refugee grid, the shipping offices' sushi bar.",
 "souvlaki": "The port's argument about meat in pita: the cult meatball wrap, the last Armenian charcoal, the Olympiacos shrine.",
 "breakfast": "The custard pie since 1909, and the Pontic piroski fried from three in the morning.",
 "late-night": "The 24-hour phyllo workshop in Nikaia, and the canteen on the Lipasmata quay.",
}

LANE_STORY = {
 "mikrolimano": {"title": "Three houses worth the touts",
   "story": ("The crescent of Mikrolimano was the ancient Munichia, the smallest of the three war-harbours, and since about 1960 it has been the "
             "port's showroom for fish. Most of its terraces live off the view. Three houses earn the walk past the hosts. Lefteris Lazarou, a "
             "ship-cook's son who first cooked at sea at fifteen, won Greek cooking its first MICHELIN star in 2002 and brought his Seaside room "
             "down to this quay in 2013. Dourabeis has salt-grilled fish below Kastella since 1932, a family from Ios and Kythira still at the "
             "door. Papaioannou sends the catch out with almost nothing done to it, the rule a father taught in a back-street fish shop."),
   "where": "Varoulko Seaside and Papaioannou on Akti Koumoundourou; Dourabeis on Akti Dilaveri"},
 "fry-hill": {"title": "No menu, and the highest table",
   "story": ("Two old family rooms at opposite heights. Beside the Hellenic Naval Academy, Margaro has fried whatever the boats brought since "
             "1944, when its founder came over from Mykonos: there is no card, a grandchild recites the four or five things on offer, and the "
             "retsina is the family's own from Markopoulo vines. Up on the Profitis Ilias hill, a docker from Crete turned a 1930s kafeneio by the "
             "chapel into a taverna in 1957; his grandson works the pans, and from the terrace the Acropolis stands off one shoulder and Salamis "
             "and Aegina lie low on the water off the other. One is a queue; the other is a booking."),
   "where": "Margaro in Hatzikyriakio; Panorama on the Kastella hill"},
 "working-port": {"title": "Where the fish comes ashore",
   "story": ("Nearly all of Attica's fish is auctioned at Keratsini before dawn, and two tables sit close enough to hear it. Inside the "
             "auction, a couple who came from Albania as newlyweds rebuilt an abandoned canteen in 2018 from tarps and pallets; he crosses to the "
             "opposite dock at three in the morning to choose the fish and fries it a few metres from your plate. Along the shore, on the little "
             "harbour under the shut power station and the container cranes, a couple have run an ouzeri for over thirty years on an older "
             "arrangement: the fishermen eat half of what they land and sell the rest to the kitchen."),
   "where": "Oinomageireio o Vasilis inside the Ichthyoskala; To Limanaki tou Giorgou on the Keratsini harbour"},
 "ouzeri": {"title": "The drink first, the plates to slow it",
   "story": ("At an ouzeri the order is inverted: the drink is the point and the small plates arrive to keep you at the table. Three rooms keep "
             "the rite their own way. A Kimolos sea captain filled a former nautical warehouse with anchors and liner relics and named it for the "
             "ships that carried Greek migrants to Australia: eight tables, and the ladenia of his island. In a 1920 neoclassical house in "
             "Freattyda a Santorini-trained cook builds the meze producer by producer. And off the port gates, the Ikarian diaspora's kafeneio, "
             "carried whole to a new street in 2023, sends out plates no one ordered with the tsipouro."),
   "where": "To Yperokeaneion in Hatzikyriakio; Dyosmos in Freattyda; Ikariotiko Kafeneio on Aristeidou"},
 "koutoukia": {"title": "Barrels under the floor",
   "story": ("Before bottled wine, a Piraeus wine-shop pressed its own and drew it from the cellar, and three rooms still work that way. In "
             "Agios Dionysios a family from Gardiki has drawn barrel retsina under the floor since 1920; in the Occupation the cellar was the "
             "quarter's air-raid shelter. A few streets off, shipwrights from Perama built a stone wine-house that first poured in 1896, and "
             "before the war the four founding rebetes of Piraeus played inside it. Up in Palaia Kokkinia, in the quarter the refugees built, a "
             "koutouki has cooked round a whitewashed fig tree since 1958. Order the wine by the karafa."),
   "where": "To Eidikon and Propolemikon in Agios Dionysios; To Koutouki tou Antoni in Palaia Kokkinia"},
 "refugee": {"title": "1922, behind the cranes",
   "story": ("In 1922 and 1923 the refugees of Asia Minor and the Black Sea landed at this port and built new quarters on its edge: Nea "
             "Kokkinia, now Nikaia, Drapetsona, Keratsini. Their kitchens are still cooking. In a 1938 building on Agiou Ioannou in Nikaia the "
             "handmade Smyrna soutzoukakia and the pastourma pie go first, to live strings at the weekend. Opposite the church of Agios "
             "Panteleimon in Drapetsona, a dairy shop of 1930 turned to the charcoal grill and became the quarter's oldest taverna; a 1930 "
             "refrigerator still runs, and about six pots change every day. Neither is a showpiece. Both are where the refugee city still eats."),
   "where": "Alargino in Nikaia; Taverna tou Katsogiannou in Drapetsona"},
 "other": {"title": "The port's other kitchens",
   "story": ("A port takes in more than fish. On the Mikrolimano quay, three coves from the touts, a room has cooked the Politiki kitchen of "
             "Constantinople for more than twenty years: hunkar begendi, adana with yogurt, pastourma, and some nights the old city's songs. In "
             "Nikaia, in a grid of low refugee houses, a Thai cook pounds her own curry pastes for six tables. Behind the sailors' church of Agios "
             "Nikolaos, near the shipping offices of Akti Miaouli, a small sushi bar has spent about a decade as the canteen of the people who move "
             "ships. None of it is Aegean. All of it is the port."),
   "where": "Vosporos on Akti Koumoundourou; Toukta in Nikaia; Sushi Rolls on Agiou Nikolaou"},
 "souvlaki": {"title": "Meat, salt, fire",
   "story": ("The port argues about meat in pita the way it argues about fish. In the old flea-market lanes behind the fish market, a father and "
             "son set up in 2019 to make it 'as it used to be', a hand-formed beef patty in their own pita, and drew a queue within a few years. "
             "In Kokkinia, an Armenian survivor of Smyrna who once sold nuts from a cart learned to grill kebab around 1972; his children keep the "
             "dogma of salt, pepper and charcoal. And near the Olympiacos ground, a standing-room grill hung floor to ceiling in red and white has "
             "wrapped for nearly fifty years."),
   "where": "O Giorgos on Gounari; Souvlakia o Serkos on Plateia Neraidas; O Karabelas on Pylis"},
 "breakfast": {"title": "The morning, the Pontic way and the dairy way",
   "story": ("The port's morning has two pedigrees. A grandfather delivered milk round Profitis Ilias by donkey in 1909; four generations on, his "
             "family's galaktoboureko is the custard pie the whole port measures against, sold over the counter to take away. Near the ferry gates, "
             "a woman who fled Trebizond in 1922 carrying her family's piroski recipe opened her own shop in 1977; her son, a former captain, starts "
             "the dough at three in the morning, and the fried pockets of cheese and mince are gone by midday."),
   "where": "Mastronikolas on Karaoli & Dimitriou; Euxeinon on Navarchou Notara"},
 "late-night": {"title": "After the boat",
   "story": ("A port that works all night eats all night. In residential Nikaia, a baker who learned to pull phyllo from a Pomak master in "
             "Rhodope opened on an unpaved street in 1974, and through the seventies and eighties the artists came at three in the morning for "
             "sweet bougatsa instead of tripe soup; it still bakes before dawn, a taxi from the harbour. On the Drapetsona quay, among trucks and "
             "the derelict conveyor of the fertiliser works, a canteen papered with photographs of General Plastiras grills pork skewers early and "
             "long after the night out."),
   "where": "Bougatsa Pavlidi on Petrou Ralli, Nikaia; Kantina o Plastiras at Gate E1/E2, Drapetsona"},
}

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — a glass, the table, the music and the late plate.",
  "note": "Le verre · la table · la musique", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the fish by the kilo, the auction before dawn, the dishes born here, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: these three take people the same evening. Hours as read on 14 Oct 2026 are on each card — call ahead.",
             "Plan ahead — this week": "Book a few days ahead: a captain's eight tables, the producer-built meze house, and the fig-tree yard in Kokkinia.",
             "Plan ahead — the grand night": "The three named houses of Mikrolimano: book as soon as the dates are fixed, and ask for a table at the water."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EDITS = {
 "avoid": [],
 "seasonal": [],
 "sources": [],
}
AVOID_TITLE = ("What to skip", "The port keeps two versions of itself: the five things it sells to visitors but does not eat, and what to do instead")

# La liste: authored for this pass (the old page had none). Facts from the guide's dish, drink and venue cards.
# (name, say, fav, what, why, where-text, maps query)
LISTE = [
 ("Garides saganaki", "ga-REE-dhes sa-ga-NA-kee", True, "Whole shrimp baked in garlicky tomato with a splash of ouzo and feta melted through, brought spitting in its two-handled pan.",
  "The one plate this harbour invented, in the Mikrolimano fish houses of the early 1960s.", "Dourabeis, Mikrolimano — on its list as shrimp saganaki", "Dourabeis Akti Dilaveri 29 Piraeus"),
 ("Psari sta karvouna", "psa-REE sta kar-VOO-na", True, "A whole fish chosen off the ice, weighed in front of you, grilled over charcoal and lifted off the bone at the table.",
  "Ask the price per kilo before the scale moves: that sentence is the whole etiquette of the port.", "Papaioannou, Mikrolimano — the plain grill", "Papaioannou Akti Koumoundourou 42 Piraeus"),
 ("Marides & gavros tiganites", "ma-REE-dhes, GA-vros tee-ga-nee-TES", True, "Whitebait and anchovy dusted in flour and fried whole, heads and tails, with lemon.",
  "Always wild: the one fish on the ice a farm cannot fake, and the cheapest.", "Margaro, Hatzikyriakio — no menu, no bookings", "Margaro Chatzikyriakou 126 Piraeus"),
 ("Kakavia", "ka-ka-VYA", False, "The fishermen's soup of small rockfish simmered with oil, onion and potato until the flesh slides off the bone.",
  "Named for the kakavi, the tripod pot set on the sand; the catch nobody would buy.", "Varoulko Seaside, Mikrolimano", "Varoulko Seaside Akti Koumoundourou Piraeus"),
 ("Astakomakaronada", "a-sta-ko-ma-ka-ro-NA-dha", False, "Spiny langouste cut into a light tomato sauce lifted with ouzo, tossed through spaghetti until the pasta drinks the stock.",
  "The plate of money of the boom years on the crescent, usually langouste rather than clawed lobster.", "Papaioannou, Mikrolimano", "Papaioannou Akti Koumoundourou 42 Piraeus"),
 ("Achinosalata", "a-hee-no-sa-LA-ta", False, "Sea-urchin roe scooped from the shell and dressed only with lemon and oil.",
  "The rawest taste of the port; eat it only where the urchins were opened that day.", "Papaioannou, Mikrolimano — the raw table", "Papaioannou Akti Koumoundourou 42 Piraeus"),
 ("Taramosalata", "ta-ra-mo-sa-LA-ta", False, "Cured roe whipped with oil, lemon and soaked bread into a pale, airy dip.",
  "Pale is right; shocking pink means dye. Clean Monday is its day.", "Dourabeis, Mikrolimano — its own, silky", "Dourabeis Akti Dilaveri 29 Piraeus"),
 ("Mydia saganaki", "MEE-dhya sa-ga-NA-kee", False, "Mussels in a spicy tomato and feta sauce, the cousin of the shrimp dish the port invented.",
  "Cheap, abundant, and the backbone of the ouzeri table.", "To Limanaki tou Giorgou, Keratsini", "To Limanaki tou Giorgou Keratsini"),
 ("Bakaliaros skordalia", "ba-ka-LYA-ros skor-dha-LYA", False, "Salt cod fried in batter, with a sharp garlic and potato or bread purée.",
  "The ritual plate of 25 March, Independence Day and the Annunciation.", "To Koutouki tou Antoni, Palaia Kokkinia", "To Koutouki tou Antoni Argyrokastrou 26 Piraeus"),
 ("Soutzoukakia smyrneika", "soo-dzoo-KA-kya smeer-NAY-ee-ka", False, "Oval meat rolls with cumin and garlic, simmered in tomato.",
  "Smyrna's dish, which the refugees of 1922 carried into the new quarters behind the port.", "Alargino, Nikaia — handmade", "Alargino Agiou Ioannou 2 Nikaia"),
 ("Kebab, the Armenian way", "keh-BAP", True, "Hand-ground mince with salt and pepper only, grilled over charcoal and laid on pita.",
  "A survivor of Smyrna learned the grill in Kokkinia around 1972; his children keep the one rule.", "Souvlakia o Serkos, Plateia Neraidas", "Souvlakia o Serkos Ionos Dragoumi 39 Piraeus"),
 ("Pastourma", "pa-stoor-MAS", False, "Air-cured beef under a rust-red crust of fenugreek, garlic and paprika, sliced paper-thin.",
  "The Cappadocian cure that came with 1922, still made by hand.", "Avakian, Stoa Politou — four generations", "Avakian Piraeus"),
 ("Piroski", "pee-RO-skee", False, "A fried pocket of dough round cheese, mince or potato, eaten hot from the paper.",
  "The Pontic pie of Trebizond, fried here from three in the morning since 1977.", "Euxeinon, Navarchou Notara — before midday", "Euxeinon Navarchou Notara 50 Piraeus"),
 ("Galaktoboureko", "ga-lak-to-BOO-reh-ko", False, "Semolina custard baked in buttered phyllo and soaked in syrup while hot.",
  "Since a milk round by donkey in 1909, the slab the whole port measures against.", "Mastronikolas, Karaoli & Dimitriou 68", "Mastronikolas Karaoli Dimitriou 68 Piraeus"),
 ("Bougatsa", "boo-GA-tsa", False, "Hand-pulled phyllo round custard or feta, dusted with sugar and cinnamon.",
  "Best in the small hours, when the 24-hour workshops have just baked.", "Bougatsa Pavlidi, Petrou Ralli, Nikaia", "Bougatsa Pavlidi Petrou Ralli 168 Nikaia"),
 ("Retsina", "ret-SEE-na", True, "Savatiano white with Aleppo-pine resin added in the ferment, drunk cold with fried fish.",
  "The one wine the port can call its own; a few rooms still draw it from the barrel.", "To Eidikon, Agios Dionysios — from the cellar under the floor", "To Eidikon Psaron 38 Piraeus"),
 ("Ouzo", "OO-zo", False, "Anise spirit that turns milk-white with water or ice, ordered with meze to slow it down.",
  "Reserved by EU law to Greece and Cyprus; the port owns the ritual, Lesvos the bottle.", "To Yperokeaneion, Hatzikyriakio", "To Yperokeaneion Marias Chatzikyriakou 48 Piraeus"),
 ("Tsipouro", "TSEE-poo-ro", False, "Pomace spirit, usually without anise here, ordered by the karafaki.",
  "The rougher cousin of ouzo, distilled from what the wine press leaves behind.", "Ikariotiko Kafeneio, Aristeidou — with whatever plates arrive", "Ikariotiko Kafeneio Aristeidou 17 Piraeus"),
 ("Ellinikos kafes", "el-lee-nee-KOS ka-FES", False, "Fine coffee boiled slowly in a briki and served with its foam and grounds.",
  "Order it sketo, metrio or glyko: the sugar goes in the pot, never after.", "O Stavros, Stoa Kampanidi — among the market porters", "Stoa Kampanidi Piraeus"),
]
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): exact edits to the eight old dish articles (cut venues out, no recommendation of an unchecked room)
DISH_EDITS = [
 (' Eat it on the quay where it was invented, at tables like <a href="#venue-jimmys-fish" data-pin="jimmys-fish">Jimmy\'s Fish</a>.',
  ' Eat it on the quay where it was invented: <a href="#venue-dourabeis">Dourabeis</a> keeps it on the list.'),
 (' data-pin="jimmys-fish"', ''),
 ('; for the ouzeri urchin, Achinos out on Akti Themistokleous.', '.'),
]

# gem popups: the old seven, kept where their pattern still occurs in the prose
GEM_STORY = {
 "gem-garides-saganaki": ("Every Greek taverna lists it now, and most diners take it for old village cooking. It is not: the plate was worked out in the "
                          "1960s in the fish houses of this crescent, when Mikrolimano still wore its Ottoman name, Tourkolimano. No single kitchen can prove it invented the dish; "
                          "the credit belongs to the harbour. The Dish, at the foot, has the technique.",
                          "Dourabeis on Akti Dilaveri keeps it on the list."),
 "gem-kakavia": ("The tripod pot, the kakavi, gave the soup its name; the rockfish nobody would buy gave it its body. Lore calls it the ancestor of "
                 "bouillabaisse: folk history, best held lightly. The Dish, at the foot, has how it is made.",
                 "Varoulko Seaside on the Mikrolimano marina."),
 "gem-gavros": ("Greece farms more bream and bass than any other Mediterranean country, so 'fresh' and 'wild' read the same on a menu. The small blue fish "
                "cannot be farmed: gavros and marides are always caught, and seasonal by law — the purse-seine closes from 15 December to the end of February.",
                "Margaro, by the Hellenic Naval Academy."),
 "gem-taramosalata": ("Real tarama is pale: cured roe whipped with oil, lemon and soaked bread, no dye anywhere. Its roots run to the salted roe of the Byzantine "
                      "coast and the Orthodox fasts, a soft 'roots in' rather than a dated record. Clean Monday is the day the whole city eats it.",
                      "Dourabeis makes its own."),
 "gem-ouzo": ("The ouzeri is the port's daily rite, but the spirit is a guest here: its home is Lesvos, above all Plomari. And it is not a PDO but a "
              "protected Geographical Indication for spirits, reserved to Greece and Cyprus. The card under Ask for it by name has how to order it.",
              "The ouzeri tables of Hatzikyriakio and Freattyda."),
 "gem-astakomakaronada": ("On this quay it reads as the plate of money. Two corrections: the crustacean is usually the clawless Mediterranean langouste, not "
                          "clawed lobster, and it is not old harbour grandeur — the crescent's grand fish houses date from about 1960.",
                          "Papaioannou, which also does a crayfish orzo."),
 "gem-ichthyoskala": ("A wholesale auction, not a sight: it runs in the dark on the Keratsini edge, and by mid-morning the floor is hosed down and empty. It is often "
                      "called the largest fish market in Greece, a claim easier to make than to measure. The larder card has the hours.",
                      "Eat its catch at Oinomageireio o Vasilis, among the auction's tables."),
}

GLOSS = [
 ["ichthyoskala", "the fish auction: the wholesale market where the catch is sold by the crate before dawn"],
 ["psarotaverna", "a fish taverna"],
 ["psarotavernes", "fish tavernas"],
 ["tiganitzidiko", "a fry shop: small fish and seafood fried to order"],
 ["mageireio", "a cook-house: the day's pots in a glass case, you point and eat"],
 ["oinomageireio", "a wine cook-house: barrel wine and the day's pots"],
 ["mageirefta", "stove-cooked dishes, the pots of the day"],
 ["magirefta", "stove-cooked dishes, the pots of the day"],
 ["oinopantopoleio", "a wine-and-grocery shop that pours its own wine at a few tables"],
 ["koutouki", "a cellar or back-room tavern, with barrels and a few pots"],
 ["koutoukia", "cellar or back-room taverns, with barrels and a few pots"],
 ["kafeneio", "the traditional coffee house"],
 ["kafenio", "the traditional coffee house"],
 ["kafeneia", "traditional coffee houses"],
 ["mezedopoleio", "a meze house: small plates built for a drink"],
 ["mezedes", "small plates for the table, eaten with a drink"],
 ["meze", "a small plate eaten with a drink"],
 ["ouzeri", "a bar-restaurant built round ouzo and small plates"],
 ["karafa", "the carafe the barrel wine is poured into"],
 ["karafaki", "the small carafe spirits are ordered in"],
 ["chyma", "wine 'loose', drawn from the barrel"],
 ["retsina", "white wine with Aleppo-pine resin added during fermentation"],
 ["savatiano", "the white grape of the Mesogeia plain east of Athens, and of most retsina"],
 ["tsipouro", "pomace spirit, usually without anise"],
 ["tsikoudia", "the Cretan pomace spirit, single-distilled and never anise"],
 ["ladolemono", "olive oil beaten with lemon, the dressing for grilled fish"],
 ["sta karvouna", "'on the coals': grilled over charcoal"],
 ["saganaki", "the small two-handled pan, and anything baked or fried in it"],
 ["kakavi", "the tripod pot of the old fishermen, which named kakavia"],
 ["gavros", "the anchovy"],
 ["marides", "whitebait, the small fish fried whole"],
 ["tsipoura", "gilthead sea bream"],
 ["lavraki", "European sea bass"],
 ["barbouni", "red mullet"],
 ["palamida", "Atlantic bonito, running in late summer and autumn"],
 ["lakerda", "bonito cured in brine and oil, the pride of the ouzeri table"],
 ["gri-gri", "the purse-seine boats that fish anchovy and sardine with lights at night"],
 ["briki", "the small long-handled pot Greek coffee is boiled in"],
 ["kaimaki", "the foam on top of a Greek coffee; also a mastic-scented ice cream"],
 ["sketo", "Greek coffee with no sugar"],
 ["metrio", "Greek coffee with one sugar"],
 ["glyko", "Greek coffee with two sugars"],
 ["freddo", "espresso shaken with ice, a Greek habit of the 1990s"],
 ["rebetiko", "the urban song of the ports and the refugee quarters, on the bouzouki"],
 ["rebetes", "the musicians and singers of rebetiko"],
 ["rebetis", "a rebetiko musician"],
 ["rebetadiko", "a room where rebetiko is played live"],
 ["rebetadika", "rooms where rebetiko is played live"],
 ["tekes", "the hashish den where rebetiko was played before it reached the records"],
 ["tekedes", "the hashish dens where rebetiko was played before it reached the records"],
 ["baglama", "the small, high-pitched cousin of the bouzouki"],
 ["kompania", "the group of musicians who play together at the table"],
 ["zeibekiko", "the solo dance of rebetiko, danced for oneself"],
 ["Politiki", "of 'the City', Constantinople: the cooking its Greeks carried west"],
 ["smyrneika", "in the style of Smyrna, the city lost in 1922"],
 ["piroski", "the Pontic fried pie of cheese, mince or potato"],
 ["galaktopoleio", "the old milk-shop: yogurt, rice pudding, custard pie"],
 ["galaktoboureko", "semolina custard baked in phyllo and soaked in syrup"],
 ["bougatsa", "phyllo pastry round custard, cheese or mince"],
 ["pastourma", "air-dried cured beef under a spice crust"],
 ["soutzouki", "a spiced cured sausage of the Black Sea and Asia Minor"],
 ["agourelaio", "unripe-olive oil from the first harvest: green, peppery, unfiltered"],
 ["horta", "wild or cultivated boiled greens, dressed with oil and lemon"],
 ["neosoikoi", "the roofed ship-sheds where the trireme fleet was hauled out"],
 ["trireme", "the ancient warship rowed by three banks of oars"],
 ["apagoreftiko", "the coast guard's ban on sailing in high wind"],
 ["meltemi", "the strong dry north wind of the Aegean summer"],
 ["volta", "the evening stroll"],
 ["Dekapentavgoustos", "15 August, the Dormition: the day the city empties for the islands"],
 ["Theophania", "Epiphany, 6 January: the blessing of the waters, when the cross is thrown into the sea"],
 ["Apokries", "the carnival weeks before Lent"],
 ["Tsiknopempti", "'smoky Thursday' of carnival, when the whole city grills"],
 ["taverna", "the neighbourhood restaurant with a short menu and house wine"],
 ["horiatiki", "the 'village' salad: tomato, cucumber, onion, olives, feta, no lettuce"],
]
