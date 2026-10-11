"""Hand-written prose for the Diani-Kwale GOLD6 build (11 Oct 2026). Facts only from the guide, its research
packs and the 11 Oct re-checks; every edit to an old block is an exact (old, new) pair, asserted by the build."""

TITLE = "Diani & the Kwale coast — Terroir Guide"
DESC = ("Diani and the Kwale south coast for people who cook: the lagoon that empties at low tide, the dawn landing at Mwaepe, "
        "the sacred kaya behind the hotel walls, the dhow day from Shimoni and the Ukunda kitchens — every place re-checked in October 2026.")

LEAD = ('<div class="lead"><p><strong>Diani is a working monsoon coast wearing a resort as a thin white coat.</strong> Two trade winds, the kaskazi and the kusi, '
        'still set its calendar, and the lagoon inside the reef empties twice a day. <strong>Make or break:</strong> plan by the moon, not the pool — buy fish where '
        'the boats land at dawn, walk the emptied reef at spring low, and give one whole day to the dhow crossing at Shimoni. '
        '<strong>The warning:</strong> the good food is inland, in Ukunda, and this is Digo land with sacred forests behind the walls: '
        'cover up off the sand, take nothing from a kaya, and order dinner by nine.</p></div>')


def soul_fold(old):
    body = old[old.index("</h2>") + 5: old.rindex("</section>")].strip()
    if body.startswith('<p class="soul__lede">'):
        body = body[body.index("</p>") + 4:].strip()
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">Nine villages, two winds, one tide: the reef that drains twice a day, the dhows that came on one monsoon and left on the other, and the forests behind the hotel walls</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


FOLDS = {
 "quartiers": {"title": "The coast, piece by piece", "desc": "The strip, the town behind it and the Digo villages south to the border: nine places worth telling apart"},
 "walks": {"title": "Walks — on the sand, the seabed and through the town", "desc": "Six routes, every one of them timed by the tide or the heat rather than the clock"},
 "dhow": {"title": "The dhow day — Shimoni, Wasini and the marine park",
          "desc": "The one day to give whole: the crossing, the coral park at the border, the island hour and the quieter waters",
          "lede": "Everything on the south coast that is worth a long day starts at the Shimoni jetty, an hour and a half south of the strip. Leave early, eat on Wasini, and be back on the road before dark."},
 "kaya": {"title": "The green — the sacred forest, the colobus and the mangroves",
          "desc": "A UNESCO forest you enter wrapped in black cloth, the monkeys that cross the road on rope ladders, and a bay that sells its mangrove carbon"},
 "reef": {"title": "The water — the wind, the reef and the blue beyond",
          "desc": "Two kite seasons, a wreck and a reef, a drop from twelve thousand feet, and the boats that go looking for whales and billfish",
          "lede": "The reef is a few hundred metres out and the wind arrives on a calendar. Everything below is timed by the two monsoons: ask the operator what the water is doing this week before you book a thing."},
 "sea-stories": {"title": "The old sailors — true stories of this water",
                 "desc": "Two thousand years of seamanship off this coast: sewn boats and outriggers, the pilots and the monsoon year, a siege decided at sea, and the fishers who still read the moon. Where the sources disagree, the disagreement is told",
                 "count": "12 true stories",
                 "lede": "The water in front of this beach is one of the oldest continuously worked sea roads on earth. These are the stories the old hands would tell about it, each with the seamanship truth inside it and the place on this coast where you can still put a hand on it."},
 "culture": {"title": "The living monuments", "desc": "A coral mosque still praying at the river mouth, the caves at Shimoni with two histories, and a tomb set with Chinese porcelain"},
 "landmarks": {"title": "The strip's landmarks — what to look at as you pass", "desc": "A boundary that is a tree, a runway between beach and highway, a ruin people live in, and the bridge that ended the ferry queue"},
 "craft": {"title": "The hand — craftsmanship",
           "desc": "The one course here you can actually enrol in, the others and what each is missing, and how to tell what is made here from what is sold here",
           "lede": "Almost everything sold here as a craft experience is a demonstration. The short list below is what is not, and one honest answer to what you can enrol in."},
 "art": {"title": "Buy at source — the cloth and the coconut", "desc": "The street that supplies every kikoi on the beach, and the two factories that turn this coast's crops into things on Kenyan shelves"},
 "coffee-gardens": {"title": "Beautiful rooms to linger & work",
                    "desc": "Coffee, shade and the honest version of what a working day looks like on this strip",
                    "lede": "Diani has one purpose-built place to work and many cafés that tolerate a laptop. Sit out the hottest hours in the second; do the deadline in the first."},
 "bars": {"title": "Sundowners & the night",
          "desc": "Where to watch the light go, the clubs and what we could and could not confirm about them, and the palm wine you need an introduction for",
          "lede": "The beach faces east, so the sundowner here is about the colour on the water and the kites coming in, not a sun in the sea. The night starts late and the kitchens close early: eat first."},
 "around": {"title": "Autour — the day trips", "desc": "The forest hill inland, the estuary island to the south, and half a day in Mombasa"},
 "provisioning": {"title": "The larder — fish, market and the cold chain",
                  "desc": "Two landings and the words for what they land, the new covered market, the coconut, and three supermarkets with three different jobs"},
 "street-food": {"title": "Sur le pouce — the late plate",
                 "desc": "What is still cooking after the kitchens close, and how to plan around the gap"},
}

GDESC = {
 ("quartiers", "The strip"): "From the river mouth in the north to the baobab at Galu: hotels on the sand, the beach road behind them.",
 ("quartiers", "Behind the sand"): "The town that runs the strip, the quiet cliff beach over the river, and the way in from Mombasa.",
 ("quartiers", "South, into Digo country"): "The villages and the bays between the strip and the Tanzanian border.",
 ("walks", "The sand & the seabed"): "First light, the river mouth, and the lagoon floor when the tide has gone.",
 ("walks", "The town & the villages"): "Ukunda's market morning, the mangrove edge at Gazi, and the old port at Shimoni.",
 ("dhow", "The crossing"): "Three ways to make the Shimoni day: the full safari, the crab house's own boats, or the jetty on your own.",
 ("dhow", "The park & the island hour"): "The marine park at the border and the island that runs its own walk.",
 ("dhow", "The quieter waters"): "A sandbank, a private island, and a dugout up the river at dusk.",
 ("kaya", "The kaya"): "The one sacred forest you may enter, and what the others are.",
 ("kaya", "The colobus & the turtles"): "The monkeys, the forest patches they live in, and the people who walk the beach for turtles.",
 ("kaya", "The mangroves"): "The village that sells its mangrove carbon.",
 ("reef", "The wind — kaskazi & kusi"): "Two kite schools, each on the flat water south of the strip.",
 ("reef", "Under — the reef & the wreck"): "The old dive house and the younger one.",
 ("reef", "Above & beyond"): "The drop over the lagoon, the billfish in the channel, and the whales in their season.",
 ("sea-stories", "The boats"): "What the hulls are made of, where the outrigger came from, and how a lateen turns.",
 ("sea-stories", "The navigators"): "The pilot, the monsoon year, and the first eyewitness.",
 ("sea-stories", "The hard water"): "A corsair, a siege and the open boats that chased the slavers.",
 ("sea-stories", "The sea that still works"): "The moon calendar, the women of the flats, and the landings that kept their own rules.",
 ("culture", "The living monuments"): "Three places where the coast's old life is still in use.",
 ("landmarks", "Along the strip"): "Things you pass every day, with the story behind them.",
 ("landmarks", "At the edge"): "The crossing you arrive by.",
 ("craft", "Do this one"): "The course with named instructors and open enrolment.",
 ("craft", "The others, and what each is missing"): "Real places, each one thing short of a full pass.",
 ("craft", "The honest warning"): "The nearest thing to a class in the food, and what to walk past.",
 ("art", "The cloth — buy at source"): "Where the kikoi and the kanga actually come from.",
 ("art", "The industrial terroir"): "The coconut cream and the red dye made a few minutes from the beach.",
 ("coffee-gardens", "The cafés"): "Two places to sit with a coffee and something baked.",
 ("coffee-gardens", "Where the laptop actually works"): "One real workspace and two beautiful compromises.",
 ("bars", "The sundowner circuit"): "Three places on the sand for the last hour of light.",
 ("bars", "After dark — the clubs, with asterisks"): "The cocktail bar that earned its ranking, and the one club we could still name.",
 ("bars", "The mangwe — mnazi, introduced"): "Palm wine where it is drunk, with someone who knows the door.",
 ("around", "Inland & south"): "The forest on the hill and the island in the estuary, a day each.",
 ("around", "North — half a day in Mombasa"): "Over the bridge for the cloth and the carving.",
 ("provisioning", "The fish — two landings and the names"): "Buy on the sand at dawn, and know what you are buying.",
 ("provisioning", "The market & the coconut"): "The new covered market and the one tree the coast lives off.",
 ("provisioning", "The cold chain — three supermarkets, three jobs"): "Cold, spice and bulk: one stop each.",
 ("street-food", "The gap, and how to plan around it"): "Kitchens shut early and clubs fill late; plan the hours between.",
 ("street-food", "What is actually still cooking"): "Three places that still feed you after the beach kitchens shut.",
}

TABLES_DESC = ("A coral cave at one end and a fishermen's shack at the other: at most three tables of each kind, picked for what you should not miss on this coast, "
               "every card saying when it was last confirmed trading.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "FOOD HISTORY", "towns": "THE COAST", "when": "WHEN TO COME", "restaurants": "THE TABLES",
              "markets": "THE LARDER", "walks": "WALKS", "dhow": "THE DHOW DAY", "sea": "THE WATER", "stories": "SEA STORIES", "forest": "THE GREEN",
              "culture": "MONUMENTS", "sights": "SIGHTS", "craft": "CRAFT & SOURCE", "linger": "ROOMS TO LINGER", "bars": "SUNDOWNERS",
              "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS", "late": "THE LATE PLATE"}
CHAPTER_SUB = {"place": "the essay, the land ledger, the coast, the week", "tables": "", "flaner": "the walks, the dhow day, the water, the forest, the craft",
               "sortir": "the sundowner, the clubs, the palm wine", "around": "Shimba Hills, Funzi, Mombasa", "fast": "what still feeds you after the beach kitchens close",
               "practical": "the traps, who to follow, the calendar, the months, the checklist, the sources"}

LANE_WHERE = {"houses": "Kinondo Kwetu, The Maji, Chale Island — always by arrangement",
              "chefs-eat": "Havana on the strip until late; Funky Monkey once the beach bars wind down"}

LANE_LEAD = {
 "creme": "Three rooms worth a booking and a taxi: the coral cave, the canvas tent on the sand at Galu, and the strip's most complete kitchen.",
 "rising": "Two kitchens trying something on the beach road: a Japanese family's sushi house and a palm-shaded bistro.",
 "houses": "Three houses that cook for people who are not staying, if you ask first: beside the sacred forest, with no meal times, and on the island.",
 "landings": "Where the fish and the vegetables come ashore: the landing you can walk to, the channel port, and the new covered market.",
 "swahili": "Ukunda's kitchens, where the strip's staff eat: biryani, nyama choma and pilau at resident prices.",
 "italian": "The Italian residency of the beach road: the wood oven that anchors it, and the neighbour a few doors along.",
 "breakfast": "Coffee and the first meal: the strip's café since 2000, the deaf-staffed café on the sand, and German bread.",
 "grills": "Fish over charcoal at the landing and meat at the junction: the fire where the coast cooks.",
 "chefs-eat": "Where the people who run the strip eat and drink after work: a Belgian bistro, the late kitchen, and the bar team with a ranking.",
 "beach-rooms": "Two rooms on the sand for the end of the day: a bar round a baobab and the kite crowd's table.",
 "story": "Two old addresses with their own history: the crab house on Wasini since 1978, and Tiwi's camp.",
 "street": "No tables at all: a green coconut opened with a panga, the dawn triangles, and palm wine poured in a living room.",
}
LANE_STORY = {
 "rising": {"title": "New, on an old road",
   "story": ("New on this strip rarely means a concept with a launch. It means a family, or a small hotel, that found a corner of the beach road and "
             "decided to cook one thing properly: raw fish from the local landings cut the Japanese way, or a beachfront menu that changes its mood on a "
             "Friday night. Neither is a secret, both are booked by residents, and both reward a call ahead, because on this coast the listings disagree "
             "about opening days more often than the kitchens change."),
   "where": "Shashin-Ka on the beach road; Asha's bistro on the sand"},
 "breakfast": {"title": "Three breakfasts, three histories",
   "story": ("The first meal on this strip tells you who settled it. One café has poured the coast's espresso since the turn of the century; one bakes "
             "the seed loaves and Berliners of the European families who built the early hotels; one is a Nairobi idea about who gets to work in a café, "
             "moved onto the sand at Galu. For the Swahili breakfast itself, the triangles and the pigeon peas, cross the road to Ukunda before eight."),
   "where": "Kokkos on the strip; Diani Bakehouse beside Apero; Pallet Cafe at Galu"},
 "houses": None, "chefs-eat": None,
 "swahili": {"title": "The staff canteen of the coast",
   "story": ("Ukunda is where the people who run the strip eat, and its kitchens cook for them: coast biryani with a sour, tangy mchuzi on the side, "
             "pilau at Friday lunch when the mosques empty, pweza soup at the grills. Prices are the town's, the rooms are plain, and the first plate "
             "of the day is the best one. The dish to judge a kitchen by, and how to say it, is in La liste at the foot."),
   "where": "Ukunda: Moiz on Hospital Road, Karafuu, Swahili Pot"}}

GROUP_DESC = {"grande": "The rooms worth planning a day around: the coral cave, the canvas on the sand, the new wave, the house tables, and the landings that feed them all.",
              "petite": "Ukunda's kitchens, the Italian residency, the breakfast rooms, the fire, where the residents eat, the beach rooms and the old houses — character over ceremony, most of it inland of the sand."}

# guest list charters: built only from each venue's own fields (verified records), refreshed by build from venues.json where marked
CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening on the south coast: a plan for each part of it — a sundowner on the sand, a table, and the late plate.",
  "note": "La table · la braise · la nuit", "href": "#tables", "open": ["tables", "bars", "street-food"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the land ledger, the dawn landing and the larder, the coconut, and the canon at the foot.",
  "note": "L’histoire · la marée · le marché · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute on the south coast: bookable, priced.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: these three take a call the same evening. Hours as read on 11 Oct 2026 are on each card.",
             "Plan ahead — this week": "Book a day or two ahead: the canvas room at Galu, the kite crowd's table before its kitchen shuts at 20:30, and the sushi house (its listings disagree on Monday closing: call).",
             "Plan ahead — the grand night": "The cave, the house beside the sacred forest, the adults-only house: book as soon as the dates are fixed."}

EDITS = {
 "money-sits": [("The reset. Shashin-Ka and some kitchens close; the beach is at its emptiest.", "The reset. Some kitchens close (Shashin-Ka may: its listings disagree, so call); the beach is at its emptiest."),
                (" Shashin-Ka reopens today.", ""),("then the club circuit — confirm Full Moon/Tandoori on Instagram the same day; nothing moves before midnight.",
                 "then, if you want a club, Manyatta — confirm it is open the same day; nothing moves before midnight.")],
 "la-liste": [("<b>Best place</b> — Ukunda&#x27;s Swahili kitchens; Coast Dishes when open · <a href=\"https://www.google.com/maps/search/?api=1&query=Coast+Dishes+Diani\"",
               "<b>Best place</b> — Ukunda&#x27;s Swahili kitchens: ask for it by name · <a href=\"https://www.google.com/maps/search/?api=1&query=Ukunda+town+Kenya\""),
              ("<b>Best place</b> — Ukunda&#x27;s dawn mama stalls; Coast Dishes for the seated version ·",
               "<b>Best place</b> — Ukunda&#x27;s dawn mama stalls, before eight ·"),
              ("Ukunda's dawn stalls, 06:30–08:00; Coast Dishes for the named, seated version — when it is open.",
               "Ukunda's dawn stalls, 06:30–08:00.")],
}
ICS_EDITS = [("Best: Ukunda's Swahili kitchens\\; Coast Dishes when open\nLOCATION:Ukunda's Swahili kitchens\\; Coast Dishes when open\nURL:https://www.google.com/maps/search/?api=1&query=Coast+Dishes+Diani",
              "Best: Ukunda's Swahili kitchens\\, ask for it by name\nLOCATION:Ukunda's Swahili kitchens\nURL:https://www.google.com/maps/search/?api=1&query=Ukunda+town+Kenya"),
             ("Best: Ukunda's dawn mama stalls\\; Coast Dishes for the seated version\nLOCATION:Ukunda's dawn mama stalls\\; Coast Dishes for the seated version",
              "Best: Ukunda's dawn mama stalls\\, before eight\nLOCATION:Ukunda's dawn mama stalls")]

GEM_STORY = {
 "gem-madafu": "The green drinking coconut, topped with a panga and drunk from the husk. Where it comes from, and what to ask for once it is empty, is in La liste at the foot of this guide.",
 "gem-mnazi": "Palm wine, tapped from the coconut palm and drunk the same day. How it is made, and how to drink it with the people who make it, is in La liste at the foot.",
 "gem-kupaka": "Kupaka means 'to smear': grilled fish, then spiced coconut cream, then the coals again. The whole story, and how to tell a real one, is in La liste at the foot."}
