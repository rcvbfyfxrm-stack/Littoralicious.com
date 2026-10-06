"""Hand-written parts of the SIRACUSA + Val di Noto guide (5 Oct 2026). Facts only from the research packs
and the 5 Oct checks; every price and hour carries its date."""
import pathlib
from htmlkit import sfold, t
import hand_common as HC

B = pathlib.Path(__file__).parent
STALE = ["Kendwa", "Istanbul"]
FOOTER_COORDS = "37.0597, 15.2933 · Ortigia"
TWENTYFOUR_AT = 6
CHAPTER_SUB = {"place": "the essay, the food history, the towns", "tables": "", "flaner": "the theatre, the sweets, the sea, the stones",
               "sortir": "the wines of the south-east, the aperitivo", "around": "the baroque towns, the gorge, the necropolis",
               "fast": "the market counter", "practical": "the traps, who to follow, the calendar, the checklist, the sources"}
FOLD_SUB = {"provisioning": "markets", "teatro": "theatre", "granita": "sweets", "sea-stories": "sea", "calas": "sea", "walks": "walks",
            "landmarks": "sights", "small-wonders": "sights", "culture": "culture", "craft": "culture", "around": "trips",
            "vino": "wine", "bars": "bars", "street-food": "late", "avoid": "", "follow": ""}
SUB_LABELS = {"essay": "THE ESSAY", "history": "FOOD HISTORY", "towns": "THE TOWNS", "when": "WHEN TO COME", "restaurants": "THE TABLES",
              "markets": "THE LARDER", "theatre": "THE THEATRE", "sweets": "ALMOND & CHOCOLATE", "sea": "THE SEA", "walks": "WALKS",
              "sights": "SIGHTS", "culture": "CULTURE & CRAFT", "wine": "WINE", "bars": "THE APERITIVO"}

LANE_LEAD = {
 "creme": "The three starred rooms of the 2026 guide that are worth the drive: Ciccio Sultano's two-star in Ibla, Siracusa's first star on Ortigia's tip, and Noto's baroque one-star.",
 "rising": "Two young Modica kitchens in the 2026 MICHELIN selection, both run by families who have cooked there for generations.",
 "houses": "Where Siracusa and Modica actually eat: a Slow Food snail, the old serious room of Ortigia, the tables on Piazza Duomo and Accursio's trattoria.",
 "seafood": "Marzamemi, the old tuna village: a fish tavern in the tonnara, a terrace on the rocks, and the family that still cures the tuna.",
 "cantine": "The south-east's own wines: the Moscato that came back, and the clay amphorae of Vittoria. Book every visit ahead.",
 "pastry": "The most serious sweet table in Sicily: Assenza's almond in Noto, and in Modica the cold chocolate and the cremolata.",
 "cocktail": "The drink before dinner: Siracusa's best bar, the grand hotel's rooftop, and an enoteca that is eighty percent natural.",
 "street": "Two counters at the Ortigia market: the cheese shop with the queue, and the salumeria where you can sit.",
}
LANE_STORY = {"creme": "A synagogue's ritual bath under a Sultano bistro", "rising": "'Mpanatigghi", "houses": "Cuccìa for Santa Lucia",
              "seafood": "Cialoma, the tonnara work-song", "cantine": "COS — the acronym", "pastry": "Pasta reale is worked raw",
              "cocktail": "Amara, the blood-orange amaro",
              "street": {"name": "Sea urchins have a closed season", "story": "Ricci, the sea urchins, are a cold-season pleasure on Ortigia, eaten raw or on spaghetti. Their fishing is closed in May and June: anyone selling them then is selling a catch that should not exist. Ask the season before you order, and walk on if the answer is wrong.", "where": "The Ortigia market"}}
GROUP_LEAD = {"grande": "Three starred rooms, two young Modica kitchens and the cellars of the south-east — the occasion end of this coast.",
              "petite": "The osterie, the Marzamemi fish rooms, the almond and the chocolate, and the drink before dinner.",
              "street": "The market counter: Borderi's sandwich and a tagliere at Burgio."}
HOURS = {"regina-lucia": "Wed–Mon 12:00–23:00, closed Tuesday (own site, seen 5 Oct 2026)",
         "grand-hotel-ortigia": "Dinner 19:30–22:30 (hotel site, seen 5 Oct 2026)"}
CHARTER = {
  "regina-lucia": {"price": "€€€ (MICHELIN 2026 list)", "book": "Phone +39 0931 22509: online takes 2–6 and dinner slots to 21:30; larger or later by phone",
                   "dress": "", "warn": "Closed Tuesday", "fit": "Tables on Piazza Duomo, open 12:00–23:00"},
  "grand-hotel-ortigia": {"price": "€€€", "book": "Call +39 0931 464600; the hotel takes groups by agreement", "dress": "",
                          "warn": "Dinner ends 22:30; non-guest access not stated, so call first", "fit": "The rooftop over the marina, dinner 19:30–22:30"},
}
SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: call in this order; none promises a walk-in.",
             "Plan ahead — this week": "Book days ahead; the starred rooms close one or two nights a week.",
             "Plan ahead — the grand night": "The two-star in Ibla, an hour and a quarter from Ortigia: book as soon as the dates are fixed."}
DOORS = [
  {"fr": "One Night", "en": "Crew ashore for one evening in Ortigia: a table on the piazza, the market counter, a drink on the roof.", "note": "La table · le comptoir · l’apéritif", "href": "#tables", "open": ["tables", "bars", "street-food"]},
  {"fr": "The Gastronomic Dig-In", "en": "For the chef: the food history, the market, the almond and the cold chocolate, the wines of the south-east.", "note": "L’histoire · le marché · le sucre · le vin", "href": "#bougie", "open": ["bougie", "provisioning", "granita", "vino", "la-liste"]},
  {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute in Ortigia: bookable, priced.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]
POPUPS = {}
PHOTOS = {
 "siracusa-1.jpg": {"caption": "The Doric columns of the Temple of Athena, still standing inside the walls of Siracusa's cathedral. The church was built into the temple; walk down the left aisle and you are walking between columns raised in the 5th century BC.",
                    "artist": "Palickap", "licence": "CC BY-SA 4.0", "credit_label": "Siracusa, Duomo, colonne — Palickap, CC BY-SA 4.0",
                    "url": "https://commons.wikimedia.org/wiki/File:Siracusa,_Duomo,_colonne.jpg"},
 "siracusa-2.jpg": {"caption": "Papyrus growing in the Fonte Aretusa, the freshwater spring a few steps from the sea on Ortigia — the water that drew the Corinthians here in 734 BC, and that Nelson's fleet took on board in July 1798.",
                    "artist": "Rollopack", "licence": "CC BY-SA 3.0", "credit_label": "Fonte Aretusa e papiro — Rollopack, CC BY-SA 3.0",
                    "url": "https://commons.wikimedia.org/wiki/File:Fonte_Aretusa_e_papiro.jpg"},
 "siracusa-3.jpg": {"caption": "The old tonnara buildings of Marzamemi. The village grew around its tuna trap; the crews hauled the death-chamber net to the cialoma, and the fish still comes home as bottarga and ventresca.",
                    "artist": "Einaz80", "licence": "CC BY-SA 4.0", "credit_label": "Tonnara Marzamemi — Einaz80, CC BY-SA 4.0",
                    "url": "https://commons.wikimedia.org/wiki/File:Tonnara_Marzamemi.jpg"}}
HOT_LINES = {"regina-lucia": "October 2026: open Wed–Mon 12:00–23:00 — the verified last-minute table on Piazza Duomo (seen 5 Oct).",
             "grand-hotel-ortigia": "October 2026: rooftop dinner 19:30–22:30 (hotel site, 5 Oct); call — non-guest access is not stated.",
             "caffe-sicilia": "Gambero Rosso Pasticceri e Pasticcerie 2026: Tre Torte."}
NEIGH, LISTE_JSON = [], []

def write(w, fcard, facts_html, V, KEPT, C):
    global NEIGH, LISTE_JSON
    w("hero", '<div class="hero"><h1>Siracusa</h1><div class="region">Ortigia · Val di Noto · Sicilia</div>'
      '<div class="philosophy">"The greatest of the Greek cities, and the most beautiful of all." — Cicero, <em>Against Verres</em>, 70 BC</div></div>')
    w("etymon", '<div class="etymon"><b>The names</b> <em>A marsh, a quail and a town that moved ten kilometres: the names here are older than the languages that use them.</em>'
      '<div class="gx-fold is-folded" data-fold-label="The names — read the story"><em>Siracusa is the Greek Syrakousai, usually traced to Syrako, a marsh beside the first settlement. '
      'The Corinthians who founded it in 734–733 BC built on the island first, for the harbour and the spring; that island is Ortigia, Greek Ortygia, conventionally read as quail island. '
      'Noto is the Roman Netum, moved ten kilometres after the earthquake of 1693; the ridge where it stood is still called Noto Antica. '
      'Modica\'s chocolate has a name protected since 2018 — and its oldest maker is not allowed to use it.</em></div></div>')
    w("lead", '<div class="lead"><p><strong>Siracusa is an island town that has been arguing about its harbour for 2,700 years</strong> — and a coast that eats almond ice for breakfast. '
      '<strong>Make or break:</strong> sleep in Ortigia and walk everything; drive out for the Val di Noto (Noto, Modica, Ragusa Ibla) and Marzamemi, one town a day. '
      'Be at the market before nine. <strong>The warning:</strong> Ortigia is a camera-policed limited-traffic zone — park at the Talete and walk in.</p></div>')
    essay = [
      '<p class="gx-lede">It is a quarter to eight at the Ortigia market and the swordfish is already on the slab. The red prawns go first. By nine the cheese shop at the end of the street has a queue, and by noon the fishmongers are hosing down. Walk to the end and you are at the Temple of Apollo, one of the oldest Doric temples in Sicily, with the morning traffic going round it.</p>',
      '<p><strong>This is a city built in layers, and the layers are still in use.</strong> The Corinthians landed on Ortigia in 734–733 BC because it had a great harbour and a freshwater spring a few steps from the sea; the spring is still there, the Fonte Aretusa, with papyrus growing wild in it. The cathedral on Piazza Duomo was built into the Temple of Athena, and you can see the Doric columns in its walls. Caravaggio painted the burial of the city\'s saint here in 1608, while on the run. Cicero called it the greatest of the Greek cities and the most beautiful of all, and in 413 BC its harbour swallowed the entire Athenian fleet.</p>',
      '<div class="pullquote">The greatest of the Greek cities, and the most beautiful of all.<cite>Cicero, Against Verres, 70 BC</cite></div>',
      '<p><strong>The stage is still the stage.</strong> The Greek theatre is cut into the rock of the Temenite hill, and every spring since 1914 it has played Greek tragedy again, at dusk, to thousands — the 2027 season opens on 7 May. The puppeteers of Ortigia still carve and armour the knights they fight with.</p>',
      '<p><strong>Then the Val di Noto.</strong> After the earthquake of 11 January 1693 the towns of the south-east were rebuilt almost at once, in a honey-coloured late baroque: Noto ten kilometres from its ruins, Modica down two ravines, Ragusa Ibla on its spur. That is where the sweet table of this coast is most serious — Corrado Assenza\'s almond in Noto, Modica\'s chocolate worked cold — and where the best restaurant in the south-east, Ciccio Sultano\'s two-star Duomo, sits in Ibla. Southward the coast ends at Marzamemi, a village built round a tuna trap, where the fish still comes home as bottarga.</p>',
      '<p>Come in October, when the summer crowd has gone and the sea is still warm enough to swim; or on 13 December, when Siracusa carries Santa Lucia\'s silver statue through the streets and eats boiled wheat instead of bread.</p>']
    w("soul", sfold("soul", "The soul of Siracusa — the essay",
                    "The market before nine, a temple inside a cathedral, a harbour that swallowed a fleet, and the baroque towns that rose after 1693",
                    "THE ESSAY", "\n\n".join(essay)))
    w("bougie", (B / "lines" / "bougie.html").read_text().rstrip("\n"))
    NEIGH = HC.towns(w, fcard, "The towns — the island, the hill and the baroque coast",
      "Ortigia and the Neapolis hill, then the Val di Noto and the tuna village",
      "Sleep on the island; drive out to one baroque town a day. Times are by car from Ortigia and approximate.",
      [("The hub", "Where to sleep, and the hill behind it.", [
         ("Ortigia", "the island", "Where Siracusa began, and still the place to sleep.",
          "The Corinthians founded Siracusa here in 734–733 BC for the harbour and the spring; a narrow cut, the Darsena, makes it an island again. In one kilometre: a Doric temple inside the cathedral, the Fonte Aretusa with its wild papyrus, Frederick II's Castello Maniace on the tip, and a market from first light to early afternoon.",
          [["Sleep", "here — everything is on foot"], ["Park", "Talete car park, then walk in"], ["Don't miss", "the market before nine; the sea walls at dusk"]], "Ortigia Siracusa"),
         ("The Neapolis hill", "the stone", "The Greek theatre, the Ear of Dionysius and the quarries, ten minutes from the bridge.",
          "Across the bridges the modern city climbs to the Neapolis park on the Temenite hill: the theatre cut into the rock, the Latomia del Paradiso quarry where tradition puts the Athenian prisoners of 413 BC, and the Paolo Orsi archaeological museum. The eating is on Ortigia; the reason to cross is the stone.",
          [["Getting there", "about 10 minutes by car or 25 on foot from Ortigia"], ["Time needed", "half a day with the museum"], ["Best hour", "opening, or the last ninety minutes"]],
          "Parco Archeologico della Neapolis Siracusa")]),
       ("Around — the Val di Noto and the cape", "The towns rebuilt after 1693, and the tuna village.", [
         ("Noto", "the golden town", "Rebuilt in one stone after 1693, ten kilometres from its ruins.",
          "Noto was refounded on a new site after the earthquake and built almost in one campaign, which is why the Corso reads like a single stage set of honey-coloured limestone. Palazzo Nicolaci's balconies stand on lions, horses and sirens; the Infiorata carpets Via Nicolaci with flowers each May.",
          [["Getting there", "about 40 minutes by car"], ["Eat", "Caffè Sicilia at opening; Crocifisso for dinner"], ["Don't miss", "the Corso before the coaches"]], "Noto Corso Vittorio Emanuele"),
         ("Modica", "the chocolate town", "Poured down two ravines, and working chocolate cold.",
          "Modica fills two valleys with baroque churches and staircases; Salvatore Quasimodo was born here in 1901. It is the chocolate town — the cold-worked bar and its quarrel with its own oldest maker are told in The Dish, at the foot.",
          [["Getting there", "about 1 hour 10 by car"], ["Eat", "Radici or Dabbanna; a cremolata at Rosy Bar"], ["Don't miss", "the stairs up to San Giorgio"]], "Modica Corso Umberto"),
         ("Ragusa Ibla", "the old spur", "The old town on its own hill — and the best table in the south-east.",
          "Ibla is the part of Ragusa rebuilt on the old site after 1693, on a spur below the newer upper town. It is quiet, steep and small, and it holds Ciccio Sultano's two-star Duomo, which is why chefs drive two hours to eat here.",
          [["Getting there", "about 1 hour 20 by car"], ["Eat", "Duomo, booked well ahead"], ["Don't miss", "the walk down the steps from upper Ragusa"]], "Ragusa Ibla"),
         ("Marzamemi", "the tuna village", "A village built round a tonnara square, the sea on three sides.",
          "Marzamemi grew up around its tuna trap; the old fishery buildings around Piazza Regina Margherita are now restaurants, and the tuna still comes home as bottarga, ventresca and mosciame. North of it, the Vendicari reserve with its salt pans and a cove you can only walk to.",
          [["Getting there", "about 50 minutes by car"], ["Eat", "Taverna La Cialoma, in the tonnara"], ["Don't miss", "the piazza at dusk"]], "Marzamemi Piazza Regina Margherita")])])  # 4: the three baroque towns and the tuna village are four different days
    HC.day(w, fcard, "One day off — two ways", "Ortigia from market to dinner, or the Val di Noto from almond granita to a two-star",
      "For the chef with one day off. The best meal is always the last one.",
      [("A day in Ortigia", "market, theatre, sea", "From the fish slab at 7:30 to dinner on the piazza.",
        [["07:30", "The Ortigia market, before nine for the fish; a panino at Borderi if the queue allows"],
         ["10:00", "The Duomo's Doric columns, then the Fonte Aretusa and its papyrus"],
         ["13:30", "Lunch at Latteria Mamma Iabica, or a tagliere at Fratelli Burgio in the market"],
         ["16:30", "The Neapolis park for the theatre in the low light"],
         ["19:00", "Ortigia's sea walls at dusk, a drink on the Grand Hotel's roof"],
         ["20:30", "Dinner at Don Camillo — or Cortile Spirito Santo for the occasion"]], "Ortigia market Siracusa"),
       ("A day in the Val di Noto", "almond, gold stone, chocolate", "From the almond granita at opening to the two-star in Ibla.",
        [["08:00", "Almond granita and brioche at Caffè Sicilia, Noto, at opening"],
         ["09:30", "The Corso and Palazzo Nicolaci before the coaches; then drive to Modica"],
         ["12:30", "Chocolate and 'mpanatigghi at Bonajuto; lunch at Radici"],
         ["17:00", "Ragusa Ibla on foot, down the steps from the upper town"],
         ["20:00", "Duomo, the two-star — booked well ahead"]], "Caffè Sicilia Noto")])
    HC.hot(w, fcard, "2026-10-05", "2026-11-30", "5 October 2026 — the 2027 Greek theatre season on sale, the puppets of San Martino and Santa Lucia's December",
      "Checked 5 October 2026 — the 2027 Greek theatre season is on sale, the puppets come out for San Martino, and Santa Lucia is on a Sunday this year.",
      [("On this month and next", [
         ("INDA 2027 tickets are on sale", "since 1 Sept", "The 62nd season of Greek drama in the rock theatre: 7 May to 26 June 2027.",
          "The Birds from 7 May, Trojan Women from 8 May, Philoctetes 12–26 June, Ulisse, l'ultima Odissea 13–25 June. Upper cavea seats sell first for June weekends.",
          [["When", "7 May – 26 June 2027"], ["Where", "Teatro Greco, Neapolis"], ["Tip", "book the upper cavea for June weekends now"]], "Teatro Greco Siracusa", ""),
         ("The puppets of San Martino", "November", "Pupi, marionettes and puppets take over Ortigia around 11 November.",
          "The 2026 programme was not yet published on 4 October: watch the Vaccaro-Mauceri company's site and pages.",
          [["When", "around San Martino, 11 November"], ["Where", "Ortigia"], ["Tip", "check pupari.com before you plan"]], "", ""),
         ("Santa Lucia, Sunday 13 December", "next", "The silver statue carried to her tomb and back — and boiled wheat instead of bread.",
          "13 December 2026 falls on a Sunday. The procession takes most of the afternoon; the crowd is dense around the cathedral.",
          [["When", "Sunday 13 December 2026"], ["Where", "Piazza Duomo to Santa Lucia al Sepolcro"], ["Tip", "eat cuccìa that day"]], "Santa Lucia al Sepolcro Siracusa", "")]),
       ("At the tables", [
         ("Regina Lucia — the last-minute table", "Piazza Duomo", "Open Wednesday to Monday, 12:00 to 23:00 (own site, 5 Oct 2026).",
          "When the booking falls through at seven, this is the first call on Ortigia.", [["When", "Wed–Mon 12:00–23:00"], ["Book", "+39 0931 22509"]], "", "regina-lucia"),
         ("The Grand Hotel's rooftop", "Ortigia", "Dinner 19:30–22:30 over the marina (hotel site, 5 Oct 2026).",
          "Non-guest access is not stated on its site: call first.", [["When", "19:30–22:30"], ["Book", "+39 0931 464600"]], "", "grand-hotel-ortigia"),
         ("Caffè Sicilia — Tre Torte", "Noto", "Gambero Rosso's Pasticceri e Pasticcerie 2026 gives Assenza its top mark.",
          "Go at opening for the almond granita.", [["Order", "granita di mandorla con brioche"], ["When", "at opening"]], "", "caffe-sicilia")])])
    items = [
      ("Granita di mandorla con brioche", "gra-NEE-ta dee man-DOR-la", "Almond ice, coarse-grained, with a warm brioche.", "Assenza makes it with Noto almonds; breakfast here, all year.", "Caffè Sicilia, Noto — at opening", "caffe-sicilia", True),
      ("Cannolo and cassata", "kan-NO-lo · kas-SA-ta", "Fried shell with ricotta; the baroque ricotta cake.", "Convent pastry, pared back by a pastry cook who subtracts sugar rather than adds it.", "Caffè Sicilia, Noto", "caffe-sicilia", True),
      ("Cioccolato di Modica", "chok-ko-LA-to dee MO-dee-ka", "Chocolate worked cold, gritty with sugar crystals.", "IGP since 2018; Bonajuto, the oldest maker, left the consortium.", "Antica Dolceria Bonajuto, Modica", "antica-dolceria-bonajuto", False),
      ("'Mpanatigghi", "m-pa-na-TEEG-ghee", "Crescent pastries of minced beef, chocolate, almond and spice.", "Meat and chocolate in one sweet.", "Antica Dolceria Bonajuto, Modica", "antica-dolceria-bonajuto", False),
      ("Cremolata", "kre-mo-LA-ta", "Modica's granita: fruit-heavy, creamier, with nuts.", "The fig one with walnut and Modica chocolate is the town's own.", "Rosy Bar, Modica", "rosy-bar", False),
      ("Panino di Borderi", "pa-NEE-no", "A sandwich built to order with the house's own cheeses.", "The market's famous queue — unverified for 2026, check first.", "Caseificio Borderi, Ortigia market", "caseificio-borderi", False),
      ("Busiate con bottarga di tonno", "boo-zee-AH-te con bot-TAR-ga", "Twisted pasta with grated dried tuna roe.", "The tonnara is gone; the tuna still comes home as bottarga.", "Campisi, Marzamemi", "campisi", False),
      ("Spaghetti delle Sirene", "spa-GET-tee", "Prawns and sea urchins.", "Ortigia's long-standing serious room, since 1985.", "Don Camillo, Ortigia", "don-camillo", True),
      ("Moscato di Siracusa", "mos-KA-to", "The sweet white of Siracusa, revived.", "Nearly lost; Pupillo brought it back.", "Cantine Pupillo, Siracusa", "cantine-pupillo", False),
      ("Cerasuolo di Vittoria", "che-ra-SWO-lo dee vit-TOR-ya", "Nero d'Avola and Frappato, light-red and cherry-scented.", "Sicily's only DOCG; COS makes some in clay amphorae.", "COS, Vittoria", "cos", False),
    ]
    dishes = [
      ("Cioccolato di Modica", "Modica works chocolate at low temperature without conching, so the sugar does not dissolve and the bar breaks with a grainy snap. The method is said to descend from the Aztec metate, brought by the Spanish; the town tells that story, historians have not settled it. The name is an IGP since 2018 — and Antica Dolceria Bonajuto, founded in 1880 and the most famous maker, left the consortium the same year, so its bars legally cannot carry the name.", "Antica Dolceria Bonajuto, Modica", "Antica Dolceria Bonajuto Modica Sicilia"),
      ("Bottarga and the tonnara", "For centuries the tuna came past this coast and the tonnare caught them in a chamber of nets, hauled in the mattanza to the crews' work-song. Marzamemi grew around one. The trap is gone — industrial purse-seining killed the tonnare — but the village still cures the fish: bottarga from the roe, ventresca from the belly, mosciame from the fillet.", "Campisi and Taverna La Cialoma, Marzamemi", "Marzamemi Sicilia"),
      ("The almond of Noto", "The Pizzuta d'Avola almond is grown in the countryside around Noto and Avola and protected not by a DOP but by a Slow Food presidium, the Mandorla di Noto. It is the almond in Assenza's granita and in the convent pastry of the baroque towns — and the reason the purist's breakfast here is almond, not pistachio.", "Caffè Sicilia, Noto", "Caffè Sicilia Noto Sicilia"),
    ]
    LISTE_JSON[:] = HC.liste(w, V, C["slug"], C["listeSlug"], "Siracusa", items, dishes)
    HC.eat_and_tables(w, len(items), len(KEPT), "Two-star Ibla and Siracusa's first star at one end, a market sandwich at the other — three to a kind at most, every card carrying whether it was confirmed trading in October 2026.")
    HC.seasonal(w, "Siracusa")
