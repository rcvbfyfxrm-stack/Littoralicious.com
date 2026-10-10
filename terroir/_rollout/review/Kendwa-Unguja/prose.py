"""Hand-written prose for the Kendwa GOLD6 build (7 Oct 2026). Facts only from the guide, its research
packs and the 7 Oct re-checks; every edit to an old block is an exact (old, new) pair, asserted."""
import re

TITLE = "Kendwa & Nungwi — Terroir Guide"
DESC = ("Kendwa and Nungwi for people who cook: the one beach on Unguja that keeps its water at low tide, "
        "the dawn fish landing, dhows built by adze on the sand, the seven-table village kitchens and Stone Town's counters — "
        "every place re-checked in October 2026.")

LEAD = ('<div class="lead"><p><strong>Kendwa is the one stretch of Unguja that keeps its water when the tide goes out, and it faces the sunset</strong> — '
        'everything on this cape follows from those two facts. <strong>Make or break:</strong> the good food is inland: the village kitchens of Nungwi, '
        'the grills at the fish landing, the counters of Stone Town. Read a tide table before a menu. <strong>The warning:</strong> this is a Muslim fishing '
        'village with a party beach on its western edge — cover up the moment you leave the sand.</p></div>')

def soul_fold(old):
    body = old[old.index("</h2>") + 5: old.rindex("</section>")].strip()
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the north tip — the essay</div>',
                      '<div class="sfold__desc">Half past five on the sand: the dhow yards stopping, a ngalawa coming home with fish, the muezzin and a sound check two hundred metres apart</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])

FOLDS = {
 "quartiers": {"title": "The cape, piece by piece", "desc": "Two beaches and one village: the six places on the north tip worth telling apart"},
 "tide": {"title": "The tide — the fact this whole cape is built on",
          "desc": "Why Kendwa keeps its water when the rest of the island loses it, and what the moon does to the fishery",
          "lede": "If you understand one thing about this place before you arrive, make it this. Kendwa is not a better beach than the famous east-coast beaches. It is a <em>differently shaped</em> one, and the shape decides your entire week — when you can swim, when you can walk to dinner, when the fish is cheap, and when the reef flat is walkable."},
 "walks": {"title": "Walks — on the sand and through the village", "desc": "Four routes on a cape you can cross on foot, every one of them timed by the tide rather than the clock"},
 "reef": {"title": "The water — the bank, the atoll and the whales",
          "desc": "What is out there off this cape: a drowned bank in open channel, a private atoll you cannot land on, and the whales' season",
          "lede": "The north tip's real argument against the east coast is not the beach — it is what is reachable from it. The dive centres in these two villages cover a serious open-channel bank, the island's best coral, and a whale migration that passes through in the dry season."},
 "sea-stories": {"title": "The old sailors — true stories of this water",
                 "desc": "Two thousand years of seamanship off this cape: the two winds that ran an ocean, the survey that cost half a crew, a hurricane that took a sultan's navy in an afternoon, and the shortest war in history. Where the sources disagree, the disagreement is told",
                 "count": "11 true stories",
                 "lede": "The water in front of this beach is one of the oldest continuously worked sea roads on earth. These are the stories the old hands would tell about it — each with the seamanship truth inside it, and the place on this cape where you can still put a hand on it today."},
 "landmarks": {"title": "The point, the island &amp; the little beauties".replace("&amp;", "&"),
               "desc": "Four things on this cape worth going to stand in front of — the light, the turtles, the rock it stands on, and the island you may only look at"},
 "culture": {"title": "Stone Town — the honest half", "desc": "The cathedral on the last slave market, the fort at the night market's gate, and the palace that came down in 2020"},
 "craft": {"title": "The boats & the hand — craftsmanship",
           "desc": "Three kinds of hull, the one place that teaches the craft to outsiders, and how to tell what is made here from what is sold here",
           "lede": "Almost everything sold as a craft experience is a demonstration. The north coast is where Zanzibar's boats are still built, on the open sand, by men working from proportions held in the head — and that is the short list of what is not."},
 "coffee-gardens": {"title": "Beautiful rooms to linger & work",
                    "desc": "Shade, a breeze, coffee — and the honest version of what a working day looks like on this cape",
                    "lede": "There is no co-working space at the north tip and no reliable fibre. What there is: shade, sea breeze, patient service and a lot of hours between eleven and four when it is too hot to be on the sand. Treat these as places to sit, read and think — and take the work truth below seriously."},
 "bars": {"title": "Sundowners & the night",
          "desc": "A west-facing coast, which on this island is rare — where the noise is, where it isn't, what is not on, and where the drink stops entirely",
          "lede": "Unguja's famous beaches face east and get the sunrise. This cape faces the other way, and that single fact is what put the bars here."},
 "fullmoon": {"title": "The full moon — the thing this beach is famous for",
              "desc": "It began in 1996 with beach fires and a drum. It is now a monthly event for thousands. Which one you get depends on a lunar date",
              "lede": "Kendwa is known worldwide for one night a month, and the honest version of the story is more interesting than the marketing. It is also the single piece of information most likely to make or ruin your week here, because the same beach is two entirely different places depending on where the moon is."},
 "around": {"title": "Autour — worth the drive", "desc": "Three stops on the road south and a day in Stone Town — and one roof worth staying the night for",
            "lede": "The north tip is three kilometres of beach and a village. Everything else on this island is a drive, and the roads are slower than the map suggests. Budget honestly."},
 "provisioning": {"title": "The larder — the dawn run & the cold chain",
                  "desc": "What you can actually buy at the north tip, where, at what hour, and what has to come up from Stone Town",
                  "lede": "If you are cooking here — in a villa, on a boat, in a rented kitchen — the constraint is not availability, it is refrigeration. Fish is superb and cheap and has to be cooked the day you buy it. Plan the menu around the landing, not around a shopping list."},
 "street-food": {"title": "Sur le pouce — the late plate",
                 "desc": "What is still open when the bar shuts, honestly: the north tip closes early, and the last food on this cape is a short list",
                 "lede": 'The street-food <em>tables</em> — the fish-market grills, Forodhani, the village dukas — are up in <a href="#tables">La Rue</a> with the rest of the eating. This section is the other thing entirely: <strong>what you can still get after the bar closes.</strong> And the honest headline is that this is not a late-night coast. Plan the last plate before you need it.'},
}
GDESC = {
 ("quartiers", "Kendwa"): "The sand, the road behind it and the quiet end with the domes.",
 ("quartiers", "Nungwi"): "The bar strip, the village two hundred metres inland, and the working beach north of the hotels.",
 ("walks", "On the sand"): "The low-water walk between the two villages, and the last hour of light.",
 ("walks", "Through the village and out to the point"): "First light at the landing, and the village lanes to the lighthouse.",
 ("reef", "The dives"): "The bank for the experienced, the atoll for everyone, the shallow reefs for the days the bank says no.",
 ("reef", "The season you are in"): "Whales, the two diving seasons, and the turtles — wild or paid for.",
 ("bars", "Kendwa"): "The famous bar, the quiet one next door, and the resort bar that takes drink seriously.",
 ("bars", "Nungwi"): "A beach room that cooks, the driftwood bar, and the roof with the best seat.",
 ("coffee-gardens", "Where to sit"): "Three places to sit out the hottest hours.",
 ("provisioning", "The dawn run"): "Fish, on the tide, for cash.",
 ("provisioning", "The dry store"): "What the village shops carry, and the Stone Town run for everything else.",
 ("provisioning", "The galley notes"): "Ice, coconut and the two words that change the price.",
 ("around", "Half a day, on the road south"): "Three stops on the west-coast road, each an hour or two.",
 ("around", "A full day — or a night"): "Stone Town is a day, or better, a night.",
}
TABLES_DESC = ("Fifteen domes at one end and a charcoal grill on the sand at the other — three to a kind at most, "
               "every card carrying whether it was confirmed trading and when it was last checked.")
SUB_LABELS = {"essay": "THE ESSAY", "history": "FOOD HISTORY", "towns": "THE CAPE", "when": "WHEN TO COME", "restaurants": "THE TABLES",
              "markets": "THE LARDER", "tide": "THE TIDE", "walks": "WALKS", "sea": "THE SEA", "sights": "SIGHTS", "culture": "CULTURE & CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "SUNDOWNERS", "listening": "HI-FI & LISTENING", "moon": "THE FULL MOON", "trips": "DAY TRIPS",
              "late": "THE LATE PLATE"}
CHAPTER_SUB = {"place": "the essay, the clove economy, the cape, the week", "tables": "", "flaner": "the tide, the walks, the sea, the boats",
               "sortir": "the sundowner, the full moon, the music", "around": "the road south, Stone Town", "fast": "what still feeds you after the bar",
               "practical": "the traps, who to follow, the calendar, the checklist, the sources"}

LANE_LEAD = {
 "creme": "Three rooms worth a taxi and a booking — the domes and the design house on Kendwa sand, and a Stone Town roof with taarab.",
 "rising": "The three kitchens on this cape trying something — ceviche on a west deck, a beach room that cooks, a laksa at seven in the morning.",
 "houses": "The two resort kitchens worth booking as a non-resident — choose by which way the room faces.",
 "italian": "Italian-run kitchens and a Vietnamese broth: the arrivals that stayed and became part of the north tip.",
 "breakfast": "The three rooms open before nine — Kilimanjaro coffee, a French bakery, and a table on the empty end of the beach.",
 "grills": "Charcoal on the sand, a small hotel kitchen, and a BBQ night to book on the day.",
 "chefs-eat": "After the sunset rush: the kitchen that runs latest, lobster at a working wage, and the last room awake.",
 "beach-rooms": "The sundowner belt — the quiet bar on Kendwa sand and the roof in Nungwi.",
}
LANE_STORY = {
 "creme": {"title": "Taarab on the roof", "story": "Taarab is the sung poetry of the Swahili coast — strings, the qanun and percussion, shaped by a century of Egyptian and Indian records arriving by sea. In Stone Town it is still taught, and on the roof of Emerson on Hurumzi it is what you eat to, most evenings, sitting on the floor.", "where": "Emerson on Hurumzi, Stone Town"},
 "rising": {"title": "What a monsoon crossroads collects", "story": "A laksa, a ceviche and a rösti on a beach four degrees south of the equator look like globalisation until you remember what this island has always been: for a thousand years the monsoon brought Oman, Gujarat and the Malabar coast here and took them home again. New cooking arriving and staying is the old pattern, not a new one.", "where": "Nungwi"},
 "italian": {"title": "The other community on the coast", "story": "Italians are one of the oldest tourist communities on this coast, and the ovens on the Kendwa road and the Nungwi strip are where they eat. Judge an Italian room here on its pizza dough and its gelato, which on an island with an unsteady cold chain is harder than it looks.", "where": "Kendwa road and Nungwi beach"},
 "grills": {"title": "The fire comes before the menu", "story": "On a coast with an unreliable cold chain, a grill is the honest kitchen: the fish is on ice in front of you, the price is agreed per kilogram before it goes on, and the charcoal does the rest. Ask for it butterflied, with lime and pilipili, and with kachumbari to cut the char.", "where": "Nungwi beach"},
 "chefs-eat": {"title": "The late shift", "story": "This coast closes early. Kitchens stop between about ten and eleven, and the people who work the sunset — bar crews, dive staff, the boat boys — eat after it. The three rooms in this lane are where the last plate on the cape is still possible: order by half past ten.", "where": "Nungwi and Kendwa"},
 "houses": {"title": "Choose by the compass", "story": "On this cape the direction a room faces matters more than its stars. The west side gets the sunset and the hawkers; round the point, the east side loses the sunset and gains the quietest water on the north tip, sheltered when the kusi blows hard on the other side.", "where": "Kendwa sand and the Zalu side of Nungwi"},
 "beach-rooms": {"title": "Forty minutes of gold", "story": "The sundowner is a short ritual here: the sun goes into open water past Tumbatu, and for the half hour before it the bars fill and the roof seats go. Arrive early, order before the light turns, and the drink comes with the whole western channel in front of it.", "where": "Kendwa and Nungwi"},
}
GROUP_DESC = {"grande": "The rooms worth planning a day around — the domes, the design house, a Stone Town roof, the new wave, the beach houses, and the auctions that feed all of them.",
              "petite": "Village kitchens, Italian ovens and a Hanoi broth, the breakfast rooms, the fire, the late tables, the sand bars and the old houses — nearly all of it off the beach."}

CHARTER = {
 "sexy-fish": {"price": "Upper mid", "book": "Through The Z Hotel · essential for a sunset table in season", "dress": "Smart beach — no swimwear",
               "warn": "Last food orders 21:45; closed 1 April to 31 May for the long rains (2026); the sunset tables go days ahead in high season", "fit": "Tuna ceviche and lobster tempura on a west-facing deck over the water."},
 "maisha-beach": {"price": "Mid", "book": "Call or WhatsApp · same day is usually fine", "dress": "Beach casual",
                  "warn": "Music nights change with the season and Ramadan — ask before you plan around one", "fit": "A beach restaurant with a real kitchen and a proper cocktail list."},
 "langi-langi": {"price": "Mid", "book": "Call for a sunset table", "dress": "Casual", "warn": "Front tables go by 17:30 in season",
                 "fit": "The long-standing independent house, its terrace at the water's edge."},
 "zuri-zanzibar": {"price": "Resort band — half board in most rates; non-residents pay à la carte", "book": "Book ahead if you are not staying", "dress": "Smart resort",
                   "warn": "A long walk in from the village road — take a car after dark", "fit": "Three kitchens, a spice garden and the first gold EarthCheck for design."},
 "bistro-del-mar": {"price": "Mid — below beach-front rates", "book": "Call at weekends, otherwise walk in", "dress": "Anything",
                    "warn": "The Kendwa road is unlit walking back — take a torch", "fit": "Wood-fired pizza and proper pasta when the fourth grilled fish is one too many."},
 "machnoo": {"price": "Low — village pricing", "book": "No bookings — turn up", "dress": "Covered shoulders and knees: this is the village, not the beach",
             "warn": "Cash only · no alcohol · Mon–Sat from 11:00, Sun from 07:00 (Aug 2026)", "fit": "Octopus in coconut curry at the price the village pays, on a sandy floor."},
 "emerson-hurumzi": {"price": "US$45 per person, three courses, drinks extra", "book": "Required, with a deposit · one seating at 19:00", "dress": "Smart casual — you will sit on the floor",
                     "warn": "Floor seating on rugs: not for every back", "fit": "360 degrees of rooftops and taarab most evenings."},
 "essque-zalu": {"price": "Upper resort band", "book": "Recommended; The Jetty closes Monday to Wednesday in low season (2026)", "dress": "Smart resort",
                 "warn": "The east side: no sunset — come for lunch or moonlight", "fit": "A dining room on stilts over the water, on the quiet side of the cape."},
}
DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening on the north tip: a table in the village, the grills at the landing, a sundowner facing west.",
  "note": "La table · la braise · le coucher", "href": "#tables", "open": ["tables", "bars", "street-food"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the clove economy, the dawn landing and the larder, the coconut, and the canon at the foot.",
  "note": "L’histoire · la marée · le marché · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute on the north tip: bookable, priced.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]
SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: call in this order. Read on 8 Oct 2026: Sexy Fish takes last food orders at 21:45, Maisha Beach runs to 23:30, Langi Langi serves breakfast through dinner.",
             "Plan ahead — this week": "Book a day or two ahead: Zuri and Gold want non-residents to book; Makofi's BBQ night is booked before 13:00 on the day.",
             "Plan ahead — the grand night": "The domes, a Stone Town roof with taarab, the jetty on the quiet side: book as soon as the dates are fixed."}

EDITS = {
 "etymon": [("<strong>Kivulini</strong>, a restaurant in Nungwi village, means 'in the shade', which on this latitude is a complete description of what a room is for. ", "")],
 "money-sits": [("The village reset — <strong>Machnoo is closed</strong>, and the strip is at its quietest.",
                 'The village reset — <strong><a href="#venue-combo-1990">Combo 1990</a> is closed</strong>, and the strip is at its quietest.'),
                ('<strong>Afro Latin Night at <a href="#venue-maisha-beach">Maisha Beach</a> from 20:00</strong>; ',
                 '<a href="#venue-maisha-beach">Maisha Beach</a> for dinner on the sand — ask whether it has music on; '),
                ('Stay the night if you booked <a href="#venue-emerson-spice">Emerson Spice</a>.', 'Stay the night if you booked <a href="#venue-emerson-hurumzi">the Hurumzi roof</a>.')],
 "avoid": [('<li><strong>Trusting a stale listing on this cape.</strong> Two venues in this guide, <a href="#venue-badolina">Badolina</a> and <a href="#venue-mangis">Mangi\'s</a>, are shown as temporarily closed by one aggregator and trading by another as of 22 August 2026. We could not settle either, so both are marked unverified rather than quietly listed as open. <em>Instead:</em>',
            '<li><strong>Trusting a stale listing on this cape.</strong> Aggregators disagree about who is open here, and the ones that disagree are not always the ones you would guess; every card in this guide says whether it was confirmed and when. <em>Instead:</em>'),
           ("The water around it is a conservation area with a US$10 per-person fee, and it is superb.",
            "The water around it is a conservation area with a daily fee (two fee zones since September 2025 — see the Mnemba card), and it is superb.")],
 "follow": [("Nungwi's longest-running dive centre, PADI 5-star since 2001, and the operation to ask about conditions. Twenty-five years of reading this water is the asset;",
             "a long-running Nungwi dive centre (its PADI listing gives a twenty-year record), and the operation to ask about conditions. Years of reading this water is the asset;")],
 "la-liste": [('<b>Best place</b> — Kivulini Garden Lodge, Nungwi · <a href="https://www.google.com/maps/search/?api=1&query=Kivulini+Garden+Lodge+Nungwi+Zanzibar"',
               '<b>Best place</b> — Machnoo, Nungwi village · <a href="https://www.google.com/maps/search/?api=1&query=Machnoo+Restaurant+Nungwi+Zanzibar"'),
              ('<a href="#venue-machnoo">Machnoo</a> and <a href="#venue-kivulini">Kivulini</a> in Nungwi village;', '<a href="#venue-machnoo">Machnoo</a> and <a href="#venue-combo-1990">Combo 1990</a> in Nungwi village;'),
              (' · <a href="#venue-essence-kendwa">Essence</a> on Kendwa sand for the biryani.', '.')],
 "sources": [],
}
ICS_EDITS = [("Best: Kivulini Garden Lodge\\, Nungwi\nLOCATION:Kivulini Garden Lodge\\, Nungwi\nURL:https://www.google.com/maps/search/?api=1&query=Kivulini+Garden+Lodge+Nungwi+Zanzibar",
              "Best: Machnoo\\, Nungwi village\nLOCATION:Machnoo\\, Nungwi village\nURL:https://www.google.com/maps/search/?api=1&query=Machnoo+Restaurant+Nungwi+Zanzibar")]

EDITS["money-sits"] += [
 ("Both are lunar, neither is on any weekly calendar, and between them they decide more of your week here than any restaurant\'s opening hours. Check the tide table and the moon phase before you book a room, not after.",
  'Both are lunar — see <a href="#tide">the tide</a> and <a href="#fullmoon">the full moon</a> before you book a room.'),
 ("First: spring tides at new and full moon give the biggest landings and the widest low water, which is when the beach walk to Nungwi opens up and when the fish is cheapest. Second: the Full Moon Party turns one Saturday a month from a candlelit village beach into a several-thousand-person event. ",
  "Spring tides decide the landing and the beach walk; one Saturday a month the party decides the beach. "),
 ("Zanzibar requires restaurants, bars and food outlets outside hotel compounds to close during daylight hours across the archipelago, reopening after sunset for iftar; hotel food and drink service continues but for registered guests only, in designated areas. Eating, drinking or smoking in public during fasting hours is both prohibited and, more to the point, a discourtesy to everyone around you.",
  'The week above does not apply in the fasting month: what closes, and how the evenings change, is in <a href="#street-food">Sur le pouce</a>.')]
EDITS["avoid"] += [
 ("is not an excursion. Anyone not from Tumbatu — Zanzibaris included — needs written permission from the village elders, and a visit goes with an approved guide who asks for that blessing first. <em>Instead:</em> arrange a permitted cultural visit through Mkokotoni days in advance, or dive the reefs off it, which is a different thing and needs no permission.",
  'is not an excursion: landing needs the elders\' permission (the rule is on <a href="#landmarks">the Tumbatu card</a>). <em>Instead:</em> look at it from the beach, or dive the reefs off it, which needs no permission.'),
 ("during Ramadan, restaurants, bars and food outlets outside hotel compounds must close during daylight hours across the archipelago, reopening after sunset. Hotel service continues for registered guests in designated areas only. Eating, drinking or smoking in public during fasting hours is prohibited. Check the dates against your travel before booking — the evenings in Ramadan are extraordinary, but the days work differently.",
  'Ramadan changes the days and the evenings — check its dates (about 8 February to 8 March in 2027, <a href="#events">the calendar</a>) against your travel before booking.')]
EDITS["follow"] = EDITS.get("follow", []) + [
 ("Spring tides at new and full moon give the biggest landings and the widest low water; the <a href=\"#venue-kendwa-rocks\">Full Moon Party</a> falls on the first Saturday after each full moon. Both are lunar and neither appears on any weekly calendar.",
  'Any almanac will do; the party\'s Saturday is on <a href="#venue-kendwa-rocks">the venue\'s own calendar</a>.')]
EDITS["bougie"] = [
 ("On 15 April 1872 a hurricane crossed the island and by the following morning at least two-thirds of the clove and coconut plantations were destroyed — trees that would not bear again for years. Every ship in the harbour but one was sunk or driven ashore; around 150 Arab and Indian vessels went down or stranded, many loaded; the sultan's own small navy, the thing Said had been proudest of, was wrecked. An island economy built on two tree crops and a fleet lost most of all three in an afternoon.",
  'An island economy built on two tree crops and a fleet lost most of all three in one afternoon, on 15 April 1872 — the story is with <a href="#sea-stories">the old sailors</a>.')]
GEM_STORY = {
 "gem-urojo": "Zanzibar mix: a sour, turmeric-yellow soup assembled at the counter like a kit. Where it really comes from, and how to judge one, is in La liste at the foot of this guide.",
 "gem-zanzibar-pizza": "Neither Italian nor in the Swahili canon: a griddled parcel born at the Forodhani stalls. The one rule for eating it is in La liste, at the foot.",
 "gem-nazi": "The coconut sauce every kitchen on this island starts from. How it is pressed and how to grade it at a glance are in La liste, at the foot.",
 "gem-ngalawa": "The double-outrigger dugout with the triangular sail you see on every stretch of this beach. How one is made is told in The boats & the hand.",
 "gem-karafuu": "The clove: a flower bud, dried until it rattles. Why nine-tenths of the world's came from here is the opening of the food history; how to buy it is in La liste.",
 "gem-mkate": "'The bread that is poured': rice, coconut and time, with no wheat and no oven. A household bread, so you have to be lucky; its story is in La liste.",
}

# ── 10 Oct 2026: the 8 Oct network pack (research/verify_5_network_2026-10-08.json) ──────────────
CHARTER.pop("bistro-del-mar", None); CHARTER.pop("machnoo", None)
CHARTER["gold-zanzibar"] = {"price": "Upper resort band", "book": "Advisable for non-residents: +255 779 700 005", "dress": "Smart resort",
                            "warn": "Closed for its annual break 9 May–10 June (2026); the beach in front is public", "fit": "Kendwa's five-star house, dinner at a table on the sand."}
CHARTER["makofi"] = {"price": "BBQ US$25 adults, US$20 children and vegetarians (seen Oct 2026)", "book": "Before 13:00 on the day, through Facebook, Instagram or in person",
                     "dress": "Casual", "warn": "The BBQ night is once or twice a week, not a fixed day: ask which night when you arrive",
                     "fit": "The best-value set-piece evening in Nungwi, with Roman pizza on the other nights."}
EDITS["money-sits"] = [e for e in EDITS["money-sits"] if not e[0].startswith("The village reset")] + [
 ("The village reset — <strong>Machnoo is closed</strong>, and the strip is at its quietest.",
  'The village reset, and the strip at its quietest — <a href="#venue-combo-1990">Combo 1990</a> may be shut (its Monday is unconfirmed: call).'),
 ('walk inland to <a href="#venue-machnoo">Machnoo</a> for the five-dish Swahili tasting.',
  'walk inland to <a href="#venue-combo-1990">Combo 1990</a> for the five-dish Swahili tasting.'),
 ("The long-stayers' night; <strong>Cholo's</strong> traditionally runs a party.", "The long-stayers' night, and a club night at Kendwa."),
 ('then down the sand to <a href="#venue-cholos">Cholo\'s</a> and the halved dhow hulls. The Rocks Lounge also opens tonight.',
  'then a taxi to Kendwa for The Rocks Lounge from 22:00, with the ride back fixed first.'),
 ("The first Saturday after each full moon is the", "The Saturday nearest each full moon (take the date from the venue's calendar) is the")]
EDITS["avoid"] += [("runs the first Saturday <em>after</em> each full moon", "runs on the Saturday <em>nearest</em> each full moon (the date is on the venue's calendar)")]
EDITS["follow"] += [("— the Kendwa desk, at Kendwa Rocks, running the same northern sites.",
                     "— a dive centre on the Kendwa main road with a beach office next to Gold Resort, running the same northern sites.")]
EDITS["sources"] += [(">Zanzibar Watersports @ Kendwa Rocks<", ">Zanzibar Watersports, Kendwa<")]
EDITS["la-liste"] += [
 ('<b>Best place</b> — Cholo\'s Bar, Nungwi · <a href="https://www.google.com/maps/search/?api=1&query=Cholo%27s+Bar+Nungwi+Zanzibar"',
  '<b>Best place</b> — Rooftops at The Z Hotel, Nungwi, at happy hour · <a href="https://www.google.com/maps/search/?api=1&query=The+Z+Hotel+Nungwi+Zanzibar"'),
 ('<a href="#venue-cholos">Cholo\'s</a> and the Nungwi sand bars', 'The Nungwi sand bars and the hotel roofs'),
 ('<a href="#venue-fisherman-local">The Fisherman Local</a>', '<a href="#venue-fisherman-local">Fisherman Local Restaurant</a>')]
ICS_EDITS += [("Best: Cholo's Bar\\, Nungwi\nLOCATION:Cholo's Bar\\, Nungwi\nURL:https://www.google.com/maps/search/?api=1&query=Cholo%27s+Bar+Nungwi+Zanzibar",
               "Best: Rooftops at The Z Hotel\\, Nungwi\nLOCATION:The Z Hotel\\, Nungwi\nURL:https://www.google.com/maps/search/?api=1&query=The+Z+Hotel+Nungwi+Zanzibar")]
LANE_LEAD["story"] = "The two addresses that were here before the strip was: the bar where the party began, and the long-standing house at the water's edge."
LANE_STORY["story"] = {"title": "Thirty years is old here", "story": "This is a young strip on an ancient coast. Nungwi has been building boats and reading this water for centuries, but the bar-and-hotel ribbon along its western edge is barely three decades deep — which makes a bar that opened in the nineties an institution and a house that has traded thirty years the elder statesman of the beach. Hold both timescales at once: the dhow yard four hundred metres north is doing something two thousand years old, and the bar you are drinking in is younger than most of its customers.",
                       "where": "Kendwa Rocks, where the party began in 1996; Langi Langi on the Nungwi sand"}
LANE_STORY["italian"] = dict(LANE_STORY["italian"], story=LANE_STORY["italian"]["story"].replace("the ovens on the Kendwa road and the Nungwi strip are where they eat", "the ovens on the Nungwi strip are where they eat"),
                             where="Nungwi beach and the main road")
assert "Kendwa road" not in LANE_STORY["italian"]["story"]
