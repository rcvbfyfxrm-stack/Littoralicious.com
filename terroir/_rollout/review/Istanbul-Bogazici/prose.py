"""Hand-written prose for the Istanbul-Bogazici GOLD6 build (12 Oct 2026). Facts only from the guide, its research
packs and the 12 Oct re-checks; every edit to an old block is an exact (old, new) pair, asserted by the build."""

TITLE = "Istanbul & the Bosphorus — Terroir Guide"
DESC = ("Istanbul for people who cook: the meyhane and the people who built it, the fire counters, the Anatolian field-recording kitchen, "
        "the ferry as the city's spine, the baths and their clocks — at most three places of each kind, every one re-checked in October 2026.")

LEAD = ('<div class="lead"><p><strong>Istanbul eats in two directions at once, across a strait, from a boat.</strong> The cooking everyone calls Turkish '
        'was for four hundred years poured in this city mostly by Greeks, Armenians and Jews, and almost all of them are gone; the food stayed. '
        '<strong>Make or break:</strong> cross to Kadıköy, eat at a fire counter or at a table of Anatolian recipes nobody else wrote down, and take the last ferry back '
        'with the city lit on both shores. <strong>The warning:</strong> Sultanahmet is for the monuments, not for dinner, and a man at a door inviting you in is the '
        'sign to keep walking.</p></div>')


def soul_fold(old):
    body = old[old.index("</h2>") + 5: old.rindex("</section>")].strip()
    if body.startswith('<p class="soul__lede">'):
        body = body[body.index("</p>") + 4:].strip()
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">Twenty-six centuries, two kitchens, one ferry: the palace table and the fire from the south-east, the tavern the minorities kept, and the century that took its authors away</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


FOLDS = {
 "quartiers": {"title": "The quarters — two shores, piece by piece", "desc": "Thirteen quarters across two continents, each with its own hour and its own missing community: pick your shore before you pick your dinner"},
 "walks": {"title": "Walks & the water", "desc": "The city is walked in fragments joined by boat: the ferry as the spine, then one shore or one pier at a time",
           "lede": "Buy an İstanbulkart, ignore the tour boats and ride the commuter ferries. Step off at one pier, walk one quarter, and take the next boat on."},
 "culture": {"title": "Culture & curiosities", "desc": "The domes and the cistern, the mosque and the palace, three collections, Beyoğlu's inheritance and two facts that survive checking",
             "lede": "Every great monument here empties around prayer and fills by ten. Start at Chora before the coaches, work down the hill, keep Hagia Sophia for last."},
 "landmarks": {"title": "Meydan, koru & the little beauties", "desc": "A Roman racetrack you can walk for free, the palace groves, and three rooms most visitors never find"},
 "hammam": {"title": "The hammam", "desc": "Four gender systems across these houses, a several-fold spread between the cheapest door and the dearest ritual, and the rules to read before you undress",
            "count": "the rules, then 6 baths",
            "lede": "Istanbul still runs its Ottoman baths as working businesses, and that ordinariness is why visitors get them wrong. Read the three cards on the rules first: the clock on the door decides whether you get in at all."},
 "rituals": {"title": "The rituals — what Istanbul is for", "desc": "A shave that finishes in fire, a turn that is either prayer or a show, a coffee you turn over, and a fish chosen off the ice",
             "lede": "Istanbul's signature experiences are not sights. They are things done to you, in an order, on a clock, and most of them are cheap. What ruins them is not the money: it is the wrong hour, the wrong ticket, or a fish you never asked the price of."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one master you can actually learn from, the others and what each is missing, and the warning about what is sold as old",
           "lede": "Three of this city's crafts are on UNESCO's lists, and almost everything sold to visitors as a class in them is a demonstration. The short list below is what is not."},
 "art": {"title": "Buy at source — the bazaar and the music street", "desc": "The Grand Bazaar told straight, the han where the hammering is real, the book market, and the street that sells every instrument the city plays"},
 "coffee-gardens": {"title": "Beautiful rooms to linger & work", "desc": "Tea gardens under plane trees, the old pastry houses, coffee with a working day in it, two free desks, and one room where the laptop stays shut",
                    "lede": "One glass of tea buys a chair for as long as you want it. The honest work truth is below: two free reading rooms do the deadline; everything else is for the afternoon."},
 "bars": {"title": "Boire & sortir", "desc": "Four hours at a rakı table, the Turkish grape by the glass, the roofs and the palace bars, then the clubs until the first ferry",
          "lede": "The night here is built around one table, the meyhane's, and it is paced by the drink. Eat slowly, order rakı with water and ice, and leave the clubs for after midnight."},
 "listening": {"title": "Hi-fi & listening — records, rooms and live music", "desc": "The bars that listen first, the record shops and the arcade, and the rooms where the music is live: jazz, fasıl and the big stage"},
 "around": {"title": "Autour — out of the city", "desc": "The islands where the horses were retired, the castle above the Black Sea mouth, the khedive's palace, the forest and a Polish village: all a ferry or a drive away"},
 "provisioning": {"title": "The larder — markets, fish & the counters", "desc": "Where a chef shops: the Kadıköy market and the Tuesday pazar, the Spice Bazaar and the street behind it, two fishmongers, a Saturday organic market and two counters"},
 "street-food": {"title": "Sur le pouce — the late plate and the sugar counters", "desc": "What still feeds you after the bar shuts, then baklava, lokum, milk pudding, boza and ice cream from the houses that made them"},
 "follow": {"title": "Follow", "desc": "Almost everything worth reading about this city's food is written in Turkish. What to follow anyway, and which of it translates"},
}

GDESC = {
 ("quartiers", "Kadıköy and its three faces"): "The market town on the Asian shore, the villa quarter on its point, and the railway workers' streets behind the station.",
 ("quartiers", "The older Asian shore"): "The caravan town opposite the palace, and the street where three faiths still share a pavement.",
 ("quartiers", "Pera and the hill above it"): "The Grand Rue that was never Turkish, the writers' slope above Tophane, and the archer's quarter of the boutiques.",
 ("quartiers", "The Golden Horn"): "The Genoese town with its own walls, and the two quarters up the Horn where the Jewish and Greek city lived.",
 ("quartiers", "Up the strait — the Bosphorus villages"): "Painted timber, a bay of boats, and the summer village of the embassies.",
 ("walks", "The vapur — the city's spine"): "Three ferry rides that cost a bus fare and show you the whole city from the water.",
 ("walks", "The Bosphorus shore on foot"): "The European shore's best hour, the Asian shore's one street, and the flat sea walk Kadıköy actually uses.",
 ("walks", "The Golden Horn, pier by pier"): "Step off the Haliç ferry for the Patriarchate, the synagogues and the pilgrimage hill.",
 ("culture", "Byzantine — the domes and the cistern"): "The dome that came down once, the mosaics at the land walls, and the cistern under the square.",
 ("culture", "Ottoman — the mosque and the palace"): "Sinan's masterpiece on the third hill, and the palace that fed four thousand a day.",
 ("culture", "The collections"): "The archaeology a painter dug up, the modern art on the water, and a hotel turned museum.",
 ("culture", "Beyoğlu's inheritance"): "The arcade, the voice and the jazz man who show what the old Pera was.",
 ("culture", "Curiosities that survive checking"): "Two facts to stop a conversation: a buried harbour and the second underground railway on earth.",
 ("landmarks", "The squares — meydan"): "The racetrack, the forum and the quay: three open squares, free.",
 ("landmarks", "The gardens & groves"): "The palace garden, the khedive's grove in tulip season, and the Asian-side grove under the bridge.",
 ("landmarks", "The little beauties"): "A working caravanserai, a tile box above the market, and Justinian's other church.",
 ("hammam", "Read this before you undress"): "The order of the bath, the gender clock, the money.",
 ("hammam", "The imperial houses — the architecture you are paying for"): "Three of Sinan's and the empire's grand baths, in working order.",
 ("hammam", "Plainer domes, stranger rules, and one that is still just a bath"): "A mixed bath, a lira-priced one, and the neighbourhood bath in Üsküdar.",
 ("rituals", "The chair and the razor"): "The full berber: a licensed trade with a tariff you are entitled to see.",
 ("rituals", "The turn — sema, and which one is prayer"): "The Mevlevi turn: how to tell the ceremony from the show.",
 ("rituals", "The long sit"): "Tea, the pipe and the cup: the contracts of the afternoon.",
 ("rituals", "The long table"): "The Sunday breakfast and the fish chosen by the kilo.",
 ("craft", "Do this one"): "The master, the unbroken craft, and how to get a place at his tray.",
 ("craft", "The others, and what each is missing"): "Real crafts and real rooms, each one thing short of the first.",
 ("craft", "The honest warning"): "What to know before you buy anything sold as old.",
 ("art", "The Bazaar, told straight"): "Where the bazaar still makes things, and where it only sells.",
 ("art", "The music street — instruments and vinyl"): "One downhill street, the oud's inventor, and half a century of records.",
 ("coffee-gardens", "Çay bahçesi — the tea gardens"): "Three gardens: a plane tree by the water, a hill above the Horn, and Kadıköy's own.",
 ("coffee-gardens", "The old pastry houses"): "The profiterole house and the Art Nouveau salon of Pera.",
 ("coffee-gardens", "Coffee, and a working day"): "Three counters with the hours and the tables for a morning's work.",
 ("coffee-gardens", "The free desks"): "Two reading rooms that cost nothing and keep long hours.",
 ("coffee-gardens", "Beautiful. Close the laptop."): "A sultan's garden for the hour that is not for work.",
 ("bars", "The rakı table"): "The meyhane night: the oldest room, the pacing of the table, and the newest revival.",
 ("bars", "The wine rooms"): "Three rooms where the Turkish list is the point.",
 ("bars", "Ask for the native grape"): "The red pair, the light reds and rosés, and the two whites.",
 ("bars", "Up on the roof"): "The starred kitchen's terrace, the roof every guide puts on the wrong shore, and what you are paying for.",
 ("bars", "The palace bars"): "Where the Orient Express passengers drank, and the palace on the water.",
 ("bars", "The clubs"): "Friday house and Saturday techno, a multi-level room in Beyoğlu, and a distillery with a club inside.",
 ("listening", "The listening bars"): "The Kadıköy anchors and the café that turns hi-fi after dark.",
 ("listening", "Records"): "Two independent shops and the arcade where the city sells music on a physical object.",
 ("listening", "Live rooms and fasıl"): "The jazz club under the tower, the meyhane with live music every night, and the big stage.",
 ("around", "The Princes' Islands"): "An hour of ferry and the engines stop: the big island, the climb to the monastery, and the island with the closed seminary.",
 ("around", "Up the Bosphorus"): "The whole strait by commuter ferry to the castle at its mouth, the fish village opposite, and the khedive's palace.",
 ("around", "Forest and the Black Sea"): "The forest that held the city's water, a Polish village, and the Black Sea coast.",
 ("provisioning", "The markets"): "Kadıköy's streets and its Tuesday pazar, the Spice Bazaar and the street its traders shop on, and the Siirt quarter's larder.",
 ("provisioning", "The fish, and the Saturday market"): "The European side's fish market, the Beyoğlu fishmonger since 1941, and the market that posts its residue tests.",
 ("provisioning", "The counters"): "The coffee grinder since 1871 and the Karaköy deli.",
 ("street-food", "After the bar shuts"): "Soup, a wet burger and baklava: three doors still open past midnight.",
 ("street-food", "Lokum, muhallebi, boza"): "The sugar house, the milk-pudding house and the boza room, each the reference for its trade.",
 ("street-food", "Hot and cold"): "Künefe the Antakya way, ice cream you cut with a knife, and the republic's oldest pâtisserie.",
 ("follow", "The Turkish-language food press"): "The scholarly journal, the argued-with critic, and the writer still filing in English.",
 ("follow", "Written in English, reported on the ground"): "Three English sources written from inside the city.",
 ("follow", "The history, and what is on the week you land"): "The history podcast, the foundation behind the big weeks, and the English listings backstop.",
}

TABLES_DESC = ("One two-star at one end and a mussel counted out by the piece at the other: at most three tables of each kind, picked for what you should not "
               "miss in this city, every card saying when it was last confirmed trading.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "FOOD HISTORY", "towns": "THE QUARTERS", "when": "WHEN TO COME", "restaurants": "THE TABLES",
              "markets": "THE LARDER", "walks": "WALKS & FERRIES", "culture": "CULTURE", "sights": "SQUARES & GROVES", "hammam": "THE HAMMAM",
              "rituals": "THE RITUALS", "craft": "CRAFT & SOURCE", "linger": "ROOMS TO LINGER", "bars": "BARS & ROOFS",
              "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS", "late": "THE LATE PLATE", "follow": "WHO TO FOLLOW"}
CHAPTER_SUB = {"place": "the essay, the lost authors, the quarters, the week", "tables": "", "flaner": "the ferries, the monuments, the baths, the rituals, the hand",
               "sortir": "the rakı table, the wine, the roofs, the listening rooms", "around": "the islands, the Black Sea mouth, the forest",
               "fast": "what still feeds you after midnight, and the sugar counters",
               "practical": "the traps, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for: the city's only two-star, two one-stars that argue about what Anatolian cooking may become, and the new wave that opened into a currency crisis and cooked anyway.",
              "petite": "Where this guide actually lives: the day-off addresses, the fire counters, the tradesman's tables, the breakfast houses, the kitchens of every direction the city once ruled, and the rooms that have fed it for a century.",
              "street": "Standing up: a mussel by the piece, kokoreç from a named usta, the wet burger, and the soup and the grill that see the night out."}

LANE_LEAD = {
 "creme": "The three tables Istanbul is judged on: the two-star in Bomonti, the Pera roof, and the rebuilt classics in Karaköy. Book weeks out.",
 "rising": "The new guard: a fire inside a 19th-century passage, a starred chef's comfort food, and a neo-bistro across the water.",
 "chefs-eat": "Not the rankings: the addresses the city's own cooks give for their days off, and who says so.",
 "ocakbasi": "You sit at the coals and the usta cooks in front of you: the most Istanbul way to eat, on three counters.",
 "esnaf": "The rooms that matter more: a twelve-seat fire with a star, the Anatolian field-recording kitchen, and Antakya in exile.",
 "kahvalti": "The breakfast table done seriously: a Van serpme house, the honest end of the Beşiktaş street, and kaymak by the water.",
 "ethnic": "Siirt, Crete, the Black Sea and Damascus: the city eats in every direction it once ruled.",
 "late-night": "Where the city eats at two in the morning: the soup against the rakı, and the grill of the drinking lanes.",
 "quick-bites": "The standing canon, named counter by named counter: midye, kokoreç and the wet burger.",
 "story": "1890, 1912, 1919: the rooms where a century sits down to eat with you.",
}
LANE_STORY = {
 "creme": {"title": "One argument, three answers",
   "story": ("Every serious kitchen in this city is answering the same question: what Anatolian cooking is allowed to become. Mehmet Gürs answered it first, "
             "on the Pera roof, and coined the phrase New Anatolian Kitchen to do it. Maksut Aşkar answers it at Neolokal by going back for the regional "
             "recipes that had fallen out of use and rebuilding them, with a Green Star beside the star. Fatih Tutak, back in the city he was born in after "
             "Bangkok, Tokyo and Copenhagen, answers it with a twelve-step menu that changes on the micro-season. Eat at two of them and you will taste the argument."),
   "where": "TURK in Bomonti; Mikla on the Marmara Pera roof; Neolokal in Karaköy"},
 "rising": {"title": "Opened into a crisis, cooked anyway",
   "story": ("The wave that opened in 2025 and 2026 did it with the lira falling, and it shows in what they chose: fewer covers, one fire, a short card. "
             "Kontuar put an open hearth inside the Passage de Petits Champs, one of the arcades that link Tepebaşı to İstiklal. In the same passage, "
             "Neolokal's chef cooks schnitzel and goulash at Todos los Días, which sounds like a joke and is not. Across the water, two cooks back from "
             "France run Basta's neo-bistro off Bağdat Caddesi. None of them is a tasting menu; all three reward a call ahead."),
   "where": "Kontuar and Todos los Días in the Pera passage; Basta in Caddebostan"},
 "ocakbasi": {"title": "The bar with a trench of coals in it",
   "story": ("An ocakbaşı is a bar built round a charcoal trench, and the seats that matter are the ones at the trench. The usta works in front of you: "
             "liver first, as a test of the fire, then the skewers, then a lahmacun to close. The cooking came north with the twentieth-century migration "
             "from Adana, Urfa and Antep and is now so naturalised that visitors think it means Istanbul. It does not, and it does: three counters here, "
             "one on the Arnavutköy shore, one over the strait, one among the Maslak towers where a two-star chef spends his days off."),
   "where": "Tam in Arnavutköy; Mesai on İnönü Caddesi; Ahmet Ustam in Maslak"},
 "esnaf": {"title": "The tradesman's lunch, taken seriously",
   "story": ("An esnaf lokantası feeds the people who work the street: pots on the counter from the morning, you point, you eat, you go back to work. "
             "The three here took that form and made it a project. Çiya, opened by Musa Dağdeviren in 1998 by the Kadıköy market, collects regional recipes "
             "village by village and cooks them in their own traditions. Araf, twelve seats and one open fire, took a MICHELIN star. Casius cooks Antakya, "
             "which after the 2023 earthquakes carries a weight it did not have before. Go at lunch, when the counters are fullest."),
   "where": "Çiya and Araf in Kadıköy; Casius in Cihangir"},
 "story": {"title": "The houses that kept the line",
   "story": ("Three rooms carry a date older than the Republic. A Rum sea captain, Asteri Dulidis, opened Agora in Balat in 1890, and three generations "
             "of his family kept it until 2001. Fehmi Efendi, whose family came from Yanya, now Ioannina in Greece, opened his lokanta in Kadıköy in 1919; "
             "his grandsons run it, and it took a Bib Gourmand in 2026. Arif Develi's grandfather took up the kebab in Gaziantep in 1912; the family "
             "brought it to Samatya, behind the Marmara walls, in 1966. Ask each for the dish it was founded on."),
   "where": "Agora in Balat; Yanyalı Fehmi in Kadıköy; Develi in Samatya"},
 "late-night": {"title": "The cure the meyhane makes necessary",
   "story": ("A rakı night in this city has a fixed last chapter, and it is soup. İşkembe, tripe with garlic vinegar spooned in at the table, or kelle paça, "
             "slow-cooked cheek in a sharp garlic-butter broth, taken after midnight against the drink. The soup houses keep the hours the meyhane makes "
             "necessary: Lale in Tarlabaşı says it never closes, Mimoza in Samatya runs its pots until three. Between the bill and the soup, the drinking "
             "lanes of the Balık Pazarı have their own grill, reborn in 2024 under a young usta from Adana."),
   "where": "Lale in Tarlabaşı; Mimoza in Samatya; Degustasyon in the Balık Pazarı"},
}
# the wet-burger story moves with Kızılkayalar to the street lane; the old quick-bites story (the Eminönü boats) goes with the boats
LANE_STORY_FROM = {"quick-bites": "late-night"}
LANE_STORY_EDITS = {"ethnic": [("Akşemsettin Caddesai — wait, Akşemsettin Caddesi", "Akşemsettin Caddesi")],
                    "chefs-eat": [("Fatih Tütak — the only chef in Turkey holding two MICHELIN stars —", "Fatih Tutak — then the only chef in Turkey holding two MICHELIN stars —")]}
LANE_WHERE = {}

# guest list charters: built only from each venue's own fields (verified records)
CHARTER = {
 "asmali-cavit": {"book": "Phone +90 212 292 49 50 · small room, call the same afternoon", "warn": "Evenings only, closed Sunday on most listings; opening times disagree (call)", "fit": "The small family meyhane the city's cooks go to after service: cold meze, hamsi, rakı."},
 "agora-meyhanesi": {"price": "₺₺₺ — the mezes are cheap, the rakı makes the bill", "book": "agora1890.com or +90 546 631 21 30 · 150–200 covers, so a same-day table is usually possible midweek", "warn": "Open daily, but listings disagree on the hours (call)", "fit": "The 1890 meyhane in Balat: some sixty mezes, a party of any size, Istanbul as it was."},
 "ciya-sofrasi": {"price": "₺ — about $10 a head (50 Best Discovery)", "book": "Walk in · no bookings", "warn": "Daily, lunch and dinner; opening 11:00 or 12:00 per listings, close about 22:00 (call +90 216 418 51 15)", "fit": "The Anatolian field-recording kitchen by the Kadıköy market: point at the trays, eat what you cannot name."},
 "mikla": {"price": "₺₺₺₺ — six-course tasting ₺10,500 (house menu, Aug 2026)", "book": "Online · card guarantee €35 a head · over 8 people by phone", "dress": "Smart chic — no sportswear", "view": "The roof of The Marmara Pera; terrace bar 18:00–02:00", "warn": "The table is released 30 minutes after your slot", "fit": "The Pera roof and the kitchen that coined New Anatolian."},
 "neolokal": {"price": "₺₺₺₺ — three- or six-course tasting; about $143 a head (50 Best Discovery)", "book": "Online or +90 212 244 00 16 · valet at the door", "view": "Floor-to-ceiling over the Golden Horn, inside SALT Galata", "warn": "Opening days not published: confirm when booking", "fit": "Maksut Aşkar's rebuilt classics, a star and a Green Star."},
 "giritli": {"price": "One set format, one price", "book": "Phone first: MICHELIN lists no reservations through the guide", "view": "A mansion garden below Sultanahmet; the terrace in summer", "warn": "Dinner first; listings disagree on the lane, so follow the map pin", "fit": "The Cretan table the 1923 exchange carried across the Aegean."},
 "turk-fatih-tutak": {"price": "₺₺₺₺ — one long tasting menu, priced per guest on the house booking page (figures seen disagree: check turkft.com)", "book": "Direct only, by email or phone · tables of up to five · weeks ahead", "dress": "Semi-formal — collar and long trousers for men", "warn": "Tuesday to Saturday dinner; no vegan, vegetarian or gluten-free menu; guests 12 and over", "fit": "Istanbul's only two-star, with a Green Star: the one tasting menu to clear an evening for."},
 "araf-istanbul": {"price": "₺₺₺ — à la carte, about ₺600–2,200 a plate plus 12% service (Aug 2026)", "book": "arafistanbul.com, +90 533 969 27 23 or info@arafistanbul.com", "warn": "Twelve seats, one evening service; days off disagree between listings (call)", "fit": "One open fire in Kadıköy, a MICHELIN star, and the meal of the decade if you get in."},
 "nazende-cadde": {"book": "MICHELIN lists no reservations: arrive at 18:30 or phone +90 533 617 02 68", "warn": "Moved to Bağdat Caddesi 345A: ignore old listings; closed Monday", "fit": "The two-star chef's favourite table in Turkey: Uluç Sakarya's market-led menu on the Asian shore."},
}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — a drink, a table, the music, and the late plate.",
  "note": "La table · la braise · la nuit", "href": "#tables", "open": ["tables", "bars", "street-food"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the years the table lost its authors, the markets and the counters, the dishes born here, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: these three take people the same evening. Hours as read on 12 Oct 2026 are on each card.",
             "Plan ahead — this week": "Book a few days ahead: the Pera roof, the rebuilt classics in Karaköy, and the Cretan table below Sultanahmet.",
             "Plan ahead — the grand night": "The two-star, the twelve seats at Araf, and the two-star chef's favourite table: book as soon as the dates are fixed."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EDITS = {
 "money-sits": [
   ("<strong>FLUX</strong> leans house on Fridays; Frankhan, Şahika, NOH and Suma Han carry the rest.",
    "<strong>FLUX</strong> leans house on Fridays; Şahika carries the rest."),
   ("Ferry to the Princes' Islands. Or the Sunday jazz brunch at <strong>Hodan</strong>. Note <strong>Lips closes Sundays</strong> and <strong>Arogan closes Sun–Mon</strong>.",
    "Ferry to the Princes' Islands, or the long serpme breakfast at a Van house. Many kitchens close today: check the card."),
   ("<p class=\"wk-note\">⚠ Venue-level opening days move constantly and August is the worst month for it.",
    "<p class=\"wk-note\">Venue-level opening days move constantly and August is the worst month for it."),
 ],
 "seasonal": [
   ("Şeker Bayramı falls around mid-March in 2027;", "Ramazan Bayramı falls on 9–11 March in 2027;"),
   ("and worth knowing that it is only legally lüfer from 28 cm, everything below carrying its own name and its own ban.",
    "and worth knowing that lüfer is a market name for one size: the smaller fish carry their own names, and the legal minimum length is argued in the press (20 cm in most reports)."),
   ("Republic Day on the 29th lights both bridges and fills the strait with boats.", "Republic Day on the 29th puts flags on every building; fireworks are announced year by year."),
 ],
 "la-liste": [],   # filled by the build (structural: .txt out, download attr out, dish in, back link)
}
LISTE_DROP = ["Çiğ köfte"]   # its best place (Bezirgan) is cut and unverified; no other verified address in the guide
LISTE_EDITS = [
 ("<b>Best place</b> — WAYANA Wine Bar, Karaköy — natural list", "<b>Best place</b> — WAYANA Wine Bar, Moda, Kadıköy"),
 ("<b>Best place</b> — Midyeci Ahmet, Karaköy", "<b>Best place</b> — Midyeci Ahmet, Beşiktaş çarşı"),
]
ICS_EDITS = [("Best place: Midyeci Ahmet\\, Karaköy", "Best place: Midyeci Ahmet\\, Beşiktaş çarşı"),
             ("LOCATION:Midyeci Ahmet\\, Karaköy", "LOCATION:Midyeci Ahmet\\, Beşiktaş çarşı")]
DISH_EDITS = [(", or Lokanta Stambouli in Pera, which opened working explicitly in the Turkish and Rum meyhane tradition.", "."),
              (" because alcohol was forbidden to Muslims, the keeping of a drinking house fell in practice almost entirely to Greeks, Armenians and Jews. The wealth tax of 1942, the pogrom of September 1955 and the measures of 1964 emptied those communities out. Topik stayed.",
               " and the food-history fold tells how that ended. The communities left; Topik stayed."),
              (" Tam Ocakbaşı in Arnavutköy, Mesai in Gümüşsuyu, or Çıra up at Sarıyer.", " Tam Ocakbaşı in Arnavutköy or Mesai in Gümüşsuyu.")]

GEM_STORY = {
 "gem-1-yanyal-fehmi-lokantas": "Yanyalı means 'from Yanya', the Ottoman name for Ioannina, in Greece. The founder's family made the crossing in the opposite direction to the people this city lost; the lokanta's own card, in the tables, has the rest.",
 "gem-2-why-the-meyhane-looks-the-way-it-d": "The long table of cold mezes, the rakı with water, the musicians between the tables: a minority institution that outlived its minority. The essay and the food-history fold tell how.",
}
# the essay carried a copy of the Yanyalı gem as an inline box; the popup and the table card carry it (told once)
SOUL_DROP_GEMBOX = True

# cards written but left out after the 12 Oct re-check (the venue or the room could not be confirmed trading)
DROP_CARDS = ["b-stambouli", "n-karga", "b-suma-han"]
