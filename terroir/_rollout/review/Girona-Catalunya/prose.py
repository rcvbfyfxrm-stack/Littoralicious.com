"""Hand-written prose for the Girona-Catalunya GOLD6 build (20 Oct 2026). Facts only from the guide (its June-July 2026 research), the
20 Oct re-check packs in research/, and nothing else. The old page was a GOLD3-era guide: a lead with a flies paragraph and a bookings
alert, soul / history / why-now / eat / drink blocks, the Universo Roca fold, a #tables-extended tier fold, eight dish articles and tcard folds.
The essay is rebuilt here from the lead, soul, history, eat and drink blocks (transformed, not pasted); the facts that now have a card of
their own (the sieges and 1809, the flies of Sant Narcís, the cyclists, the cathedral, the Call, the walls) are pointed to, not retold.
#tables-extended is gone: its 'what each room is for' lives in the lane leads. The GOLD4/5 floor (lane stories, the guest list, La liste
with The Dish, the hot board and its pointer, the calendar, craft as 'do this one', the listening room, Autour) is written here for the first time."""
import re, html as H

TITLE = "Girona · Catalunya — Terroir Guide"
DESC = ("Girona for people who cook: the Roca family's whole ladder from the parents' €18 menú to three stars, the 1920 market house, "
        "the xuixo of Cort Reial, botifarra dolça and the beans of Santa Pau; the walls, the Call and the widest Gothic nave — at most "
        "three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Girona</h1><div class="region">Catalunya · Spain</div><div class="philosophy">'
        '"Four rivers, a Roman road and the widest Gothic vault ever raised — a stone city that doubles itself in the Onyar and eats off '
        'the Empordà plain."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>From the Latin <strong>Gerunda</strong>, the garrison Rome set on the Via Augusta '
          'around 77 BC — but the name is older than the town.</em><div class="gx-fold is-folded" data-fold-label="The name — read the story">'
          '<em>It is almost certainly Iberian, most plausibly a Latin rendering of *Kerunta, the hillfort at Sant Julià de Ramis whose people '
          'were moved downhill into the new grid (the asterisk is the archaeologists’ honesty: a reconstructed word, never found written). '
          'The thirteenth-century chronicles still waver — Gerona in Jaume I, Girona already in Desclot and Muntaner — until Girona held. '
          'The story that it remembers Geryon, the three-bodied giant, is a fifteenth-century bishop’s flourish: legend, not etymology.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Girona is a fortress that learned to be gentle:</strong> a stone town on a rock where four rivers meet, '
        'its coloured houses hanging over the Onyar, and one family — the Rocas — cooking at every rung from an €18 menú to three stars. '
        '<strong>Make or break:</strong> El Celler de Can Roca opens its books eleven months out; book it, or Esperit Roca ninety days out, before the flights. '
        '<strong>The warning:</strong> the terraces of the big squares are priced for the view, and Temps de Flors in May and the Fires in '
        'late October fill the old town by mid-morning. Walk it before ten.</p></div>')

ESSAY_LEDE = ("Girona stands on a promontory where the Onyar, the Ter, the Güell and the Galligants meet. Rome planted a garrison there on "
              "the road to Hispania; the river split the town in two; the rock gave it height on three sides and the water closed the "
              "fourth. Everything the visitor loves about it — the stepped lanes, the walls you can walk, the houses that double themselves "
              "in the river — grew out of that defensive arithmetic.")
ESSAY = [
 ("", "And yet the texture is soft. Worn steps, weathered Romanesque stone, ivy on the bastions, the low warm light of the Ter valley on "
      "the cathedral’s Baroque staircase, and the slow river doing all the framing. Josep Pla, who studied here, wrote that he had felt "
      "the weight of its stones in every fibre of his life. The most besieged town in Catalonia turns out to be one of the easiest to be in."),
 ("", "The table answers the stone. Girona eats off two landscapes at once — the Empordà plain behind it, the Costa Brava an hour to the "
      "east — and its cooking lives on that seam: sea and mountain in one pot, a fishermen’s stew thickened with potato and almond, "
      "a sweet sausage nobody else makes, and the small beans grown on the volcanic soil of the Garrotxa. Feast days are kept on the "
      "plate: canelons on 26 December, from the meat of Christmas Day."),
 ("The quintessence", "Each spring the Tarlà, an acrobat puppet, turns somersaults on a bar across Carrer de l’Argenteria. Legend says the "
      "original Tarlà, hiding in a flour sack, sneezed ‘xui-xui’ and named the city’s pastry; the ledger says a confectioner three streets "
      "away invented it around the end of the Great War. Eat one warm at mid-morning, sugar on your fingers in a medieval lane, and you "
      "know which city you are in: one that keeps the legend and the ledger side by side."),
]
HISTORY = [
 "The oldest facts here are the rock and the water; Rome only ratified them. The Carolingian walls laid over the Roman line are among "
 "the longest early-medieval circuits in Europe and you can walk most of them. Below the cathedral, along Carrer de la Força, the Call "
 "kept one of the best-preserved Jewish quarters of medieval Europe, where Bonastruc ça Porta — Nahmanides — was born in 1194. "
 "The sieges, the flies and 1809 are told under the curiosities; the stones under Culture.",
 "What you taste is a frontier. A plain that had to feed a besieged town — the Girona apples, the beans of Santa Pau, the Empordà wine on "
 "slate — a coast near enough for the prawns of Palamós and the anchovies of L’Escala, and a French border close enough to hand the "
 "city its pastry.",
]
MONEY = [
 "Three currencies feed these tables: the day-trip euro that arrives from Barcelona on the half-hourly high-speed train, the cycling euro "
 "of the professional riders who live here and spend like residents, and the local euro that keeps the menú del dia honest. The first "
 "pays for the photo-menu terraces on the big squares; the other two pay for everything worth eating.",
 "So spend where repeat custom disciplines the cooking: the market house opposite the Mercat del Lleó, the chefs’ night-off bistros, "
 "the €18 lunch in the Roca parents’ bar in Taialà. The money that remains is the one booking that needs a season’s notice.",
]
WHY_NOW_PARA = ("<p>And the clock is the calendar. September is the year’s best stretch — the Empordà harvest inland, the coast emptying, "
                "the apples coming in. Two weeks overload the old town: Temps de Flors in mid-May, when the private patios open, and the "
                "Fires de Sant Narcís at the end of October, the city’s own week. Come for either if you like crowds and flowers or fairs; "
                "otherwise come on a weekday, and walk before ten.</p>")


def soul_fold():
    """The essay: the old lead, soul, history, eat and drink blocks, rewritten with their facts and merged into one read; the sieges,
    the flies, the cyclists, the cathedral and the Call have cards of their own."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A fortress on four rivers, a table on the seam of plain and sea, a frontier you can taste, '
                      'and who pays for what</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}

# The food-history callout (#bougie): the old 'Universo Roca' fold, rewritten; the brothers' own story stays on the Can Roca venue card.
BOUGIE_P = [
 ("lede", "Girona’s gravity is a family that never left. Three brothers grew up in their parents’ workers’ restaurant in Taialà, on the "
          "edge of town, and built the most decorated table in Spain a few hundred metres away. Around it sits a ladder anyone can climb."),
 ("", "The bottom rung is the original: Can Roca, the bar their parents opened in 1967, which still serves a daily menú to the neighbourhood "
      "and to the Celler’s own brigade. Then Normal, on Plaça de l’Oli, where the brothers cook their mother’s Catalan stews straight on "
      "purpose; Jordi’s gelateria on Carrer de Santa Clara, the three-star dessert language at pocket money; his chocolate house over the "
      "Onyar, where the beans are roasted and conched on the premises."),
 ("", "Higher up, in the fort above the city at Sant Julià de Ramis, Esperit Roca serves the Celler’s back catalogue under its own MICHELIN "
      "star, bookable a season ahead rather than a year. At the top is the Celler itself. All of them have a card in the tables."),
 ("", "The point is the ladder. The same intelligence reaches you in a cone on the walk home, a stew at lunch, or the one dinner you plan "
      "a year around — the whole city graded by one family’s hand. And the Rocas send you onward: their former cooks run two of the "
      "bistros in ‘Where the chefs eat’."),
]
def bougie():
    paras = [f'<p class="gx-lede">{t}</p>' if k == "lede" else f"<p>{t}</p>" for k, t in BOUGIE_P]
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     '<div class="sfold__title">Universo Roca — the family that grades the city</div>',
     '<div class="sfold__desc">The parents’ bar, the plain bistro, the cone, the chocolate, the fort and the three stars: one family’s ladder, every rung open</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     *paras, "</div>", "</details>"])

DROP_CARDS = []

FOLDS = {
 "quartiers": {"title": "The quarters — the stone city, the river, the green edges", "desc": "Nine quarters: the Barri Vell, the Call and Sant Pere on the east bank; the Onyar front, the Mercadal and Pedret; the Devesa, Montjuïc and the valley of Sant Daniel",
               "lede": "Girona reads as two towns across one river: the stone city climbing the hill on the east bank, the nineteenth-century grid and the market on the west. Everything in the old town is on foot; the edges are a short walk out."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "The sieges and the name they earned, a saint’s flies, the riders who moved here, and a season of television on the cathedral steps",
                 "lede": "Four things the city’s story tells slightly wrong or never tells, checked again in October 2026. Where the sources argue, the card says so."},
 "provisioning": {"title": "The larder — the markets, the province, the source", "desc": "Where a galley provisions: the covered market, the open-air stalls and the organic farmers; the beans, the apple and the cheese of the province; the Empordà estates, the oil and the cheese counter",
                  "lede": "Shop the covered market before ten, when the fish is still on ice and the farm stalls are full. The estates are an hour out and receive by appointment."},
 "walks": {"title": "Walks — the walls, the river, the hills", "desc": "Seven routes: the rampart walk, the stone spine from the cathedral to Sant Feliu, the Call lane by lane; the Onyar bridges, the Devesa, the valley of Sant Daniel; and the climb to Sant Miquel",
           "lede": "The old town is steep and stepped: wear shoes that grip worn stone. The walls and the Call are best before ten; the valley and the hill in the late afternoon."},
 "coffee-gardens": {"title": "Rooms to linger — and a garden inside the walls", "desc": "Three rooms for a cup, two for a laptop, and the gardens on the walls",
            "lede": "Girona has more good coffee than a town its size should, thanks to the cyclists. Only two of these rooms honestly welcome a laptop; the gardens are free."},
 "culture": {"title": "Culture — the churches on the hill, the Call, the baths, a house on the river", "desc": "The cathedral and its nave, Sant Feliu and its tombs, the Benedictine abbey; the museum of the Call and the twelfth-century baths; the one Onyar house you can enter",
             "lede": "Most of the stone is a short climb from the river. Several sites keep winter hours and close on Mondays: check the card before you plan the day."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one workshop where you can enrol with a named hand, the others and what each is missing, and the honest word on what is sold as local",
           "lede": "The province works in clay, cork and green walnuts — and two of its hands teach. The card at the top is the one that clears every bar."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The Empordà to ask for by name, the sweet Garnatxa and the new wine; the vermouth before, the ratafia and the cremat after",
          "lede": "Girona drinks Empordà: reds of Garnatxa and Carinyena from wind-bent vines, a sweet Garnatxa with dessert, ratafia after lunch. The bars themselves are in the tables."},
 "listening": {"title": "Hi-fi & listening — the honest answer and the music of the place", "desc": "No listening bar in Girona, said plainly, and the jazz cave instead; the sardana and its cobla; chamber music under the nave and the sea songs down the coast",
               "lede": "Girona’s soundtrack is a cobla in the square on a Sunday morning, not a record bar. Here is where to hear it, and what it means."},
 "around": {"title": "Autour — the bridge town, the lake, the volcanoes, the coast", "desc": "Besalú, Banyoles and Olot within forty minutes; the Costa Brava and Cadaqués, each with its own guide"},
 "avoid": {"title": "What to skip", "desc": "Dinner on the big square, the paella boards by the bridges, the Celler without a booking, and the car in the Barri Vell",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the city’s two festivals, the market, the appellation and the Rocas"},
}

GDESC = {
 ("quartiers", "The east bank — the stone city"): "The old town on the hill, the Jewish quarter inside it, and the abbey quarter at its northern gate.",
 ("quartiers", "The river and the west bank"): "The painted houses on the water, the market grid opposite, and the northern edge where the Rocas cook.",
 ("quartiers", "The green edges"): "The plane-tree park, the hill above the walls, and the valley the city walks into on Sundays.",
 ("curiosities", "The city that would not fall"): "Why Girona is called immortal, and the flies that are said to have helped.",
 ("curiosities", "Who lives here now"): "The professional riders who made it home, and the television crews who borrowed its steps.",
 ("provisioning", "The markets — go early"): "The covered market has a full card in the tables; here is what to buy, and the two open-air markets beside it.",
 ("provisioning", "Born in the province"): "The volcanic beans, the apple of the Ter valley, and the grey-rinded goat’s cheese.",
 ("provisioning", "At the source"): "The wine estates of the Empordà, the oil of the Argudell olive, and the cheese counter of the old town.",
 ("walks", "The walls and the stone"): "The rampart path above the roofs, the cathedral-to-Sant Feliu climb, and the lanes of the Call.",
 ("walks", "The river and the green"): "The bridges over the Onyar, the plane trees of the Devesa, and the valley of Sant Daniel.",
 ("walks", "Up the hill"): "The ruined castle above the city, for the view back over it.",
 ("coffee-gardens", "Rooms for a cup"): "A coffee bar in an old town lane, a café-bar under the Sant Martí steps, and a restored Baroque palace.",
 ("coffee-gardens", "A laptop, honestly"): "The two rooms that let you stay with a screen: the cyclists’ café, and a café-gallery on a small square.",
 ("coffee-gardens", "A garden inside the walls"): "The gardens laid out against the ramparts, a few steps behind the cathedral.",
 ("culture", "The hill of churches"): "The widest Gothic nave, the basilica of the saint and his flies, and the Romanesque abbey that holds the archaeology.",
 ("culture", "The Call and the baths"): "The museum of Jewish Girona, and the twelfth-century bathhouse below the cathedral.",
 ("culture", "A house on the river"): "Rafael Masó’s family home: the one painted house on the Onyar you can walk inside.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as local-made, and is not.",
 ("bars", "Ask for it by name"): "The Empordà red, the sweet Garnatxa, and the new wine of November.",
 ("bars", "Before and after"): "The vermouth hour, the green-walnut liqueur, and rum set alight.",
 ("listening", "The listening room, honestly"): "No hi-fi bar in Girona, and the jazz cave that is the nearest thing to one.",
 ("listening", "The sardana"): "The dance that became a banned anthem, and the cobla that plays it best.",
 ("listening", "Under the nave and by the sea"): "Chamber music in the cathedral in summer, and the havanera every Catalan knows.",
 ("around", "Within forty minutes"): "The Romanesque bridge town, the lake of the Olympic rowers, and the volcanic country round Olot.",
 ("around", "Down to the sea"): "The coast an hour east and the white village at the end of the cape, each with its own guide.",
 ("avoid", "The square and the board"): "Dinner on the Plaça de la Independència, and the paella sold from a photograph.",
 ("avoid", "The booking and the car"): "El Celler without a reservation, and driving into the old town.",
 ("follow", "The city's calendar"): "The autumn fair, the spring flowers, and the market’s own notices.",
 ("follow", "The wine and the kitchen"): "The Empordà appellation, and the Rocas’ own channel.",
}

TABLES_DESC = ("The Rocas at every rung, the houses of 1892 and 1920, the chefs’ night-off rooms, the granja and the fork breakfast: at most "
               "three places of each kind, every card saying when it was last confirmed.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE FOOD STORY", "quarters": "THE QUARTERS", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "WINE & GLASSES", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the Roca ladder, the quarters, the record corrected, the season", "tables": "",
               "flaner": "the walls, the river and the hill on foot, the stone, the hand, the rooms to sit",
               "sortir": "the Empordà by name, the glass before and after, the cobla and the jazz cave",
               "around": "Besalú, Banyoles, the Garrotxa volcanoes, and the coast",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "Le Comptoir — the counter, the market and the late plate"}
GROUP_DESC = {"grande": "The tables you clear an evening for: three stars and two singles in the city, and the rest of the Roca family’s ladder, from the fort down to the parents’ bar.",
              "petite": "Where this guide actually lives: the old houses, the chefs’ night-off rooms, the menú del dia, the morning, and two kitchens from far away.",
              "street": "Walk in: the xuixo, the chocolate and the cone; the market, the cheese counter and the estate; and what is still open after the kitchens shut."}

LANE_LEAD = {
 "summit": "The Roca brothers’ three stars in Taialà, the duck of a fourth-generation family house, and a sommelier’s star in the vaults of the old Casino.",
 "roca": "The Celler’s back catalogue in a fort above the city, the brothers’ plain Catalan bistro, and the 1967 bar where it all began.",
 "houses": "The market house of 1920, the arcaded dining room of 1892, and an old inn under stone vaults cooked by a starred team.",
 "chefs": "Two rooms run by people who came out of El Celler, and the natural-wine bar the brothers vouch for.",
 "menu": "A Repsol Solete menú near the old fish bridge, and a 1965 pastry shop that serves lunch behind the cake counter.",
 "morning": "Thick chocolate under the arcades since 1916, the fork breakfast on the Banyoles road from six, and the cyclists’ café.",
 "other": "A Japanese kitchen in a protected 1900 garden, and momos beside the stone lioness.",
 "sweet": "The shop that fries nothing but xuixos, Jordi Roca’s chocolate house, and his gelateria.",
 "larder": "The 1944 covered market, the province’s cheeses on one counter, and an organic Empordà estate an hour north.",
 "late": "Pintxo trays until midnight, the braves that outsell water, and a jazz cave on a DownBeat list.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the drink, the table, the late glass.",
  "note": "Le verre · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the Roca ladder rung by rung, the market and the province’s larder, the dishes of the seam, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {}   # written in fixes.py once the 20 Oct re-check is in (the lines must agree with what was confirmed)

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the Girona year: the flowers and the books in spring, the bonfires and the nights of summer, the saint’s fair in autumn"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): the old guide's eight dish articles, rewritten.
DISH_DESC = "Eight plates with their honest passports: the city’s own pastry, the seam of sea and mountain, the province’s feast days, and what the coast sends inland."
DISHES = [
 ("Xuixo", "A yeasted, laminated dough rolled into a cylinder, deep-fried, piped full of crema catalana and rolled in sugar while still hot so the crystals catch. The documented version: the confectioner Emili Puig made it on Carrer de la Cort Reial in the years around 1918–1920, after a French pastry cook showed him a cream-filled technique. The Tarlà’s sneeze is the folklore version. It carries the Catalan Producte de la Terra mark, and ‘the best in Girona’ is a rivalry, not a fact. Eat it warm: the sugar must crackle.", "Girona, Carrer de la Cort Reial"),
 ("Mar i muntanya", "Sea and mountain in one pot: chicken with langoustines, or rabbit with prawns, over a slow sofregit, bound at the very end with a picada pounded from fried bread, almonds, hazelnuts, garlic and parsley — sometimes the fried liver, sometimes a square of dark chocolate. Born of a fishing family’s economy, chicken stretched with shellfish. Add the picada too early and the sauce splits.", "The Empordà and the Costa Brava; a feast-day main"),
 ("Suquet de peix", "The fishermen’s stew, first cooked aboard from fish that would not sell: rock fish, then monkfish or hake, simmered with potatoes in a garlic-and-tomato sofregit and finished with an almond picada. Potato starch and almond, never flour, give it body; the name comes from suquejar, to give up juice. Eat it in the harbour towns an hour east.", "The Costa Brava ports"),
 ("Niu de Palafrugell", "A winter pot of cod tripe and stockfish with potato and egg, first a meatless Lenten dish; the cork workers added game birds and sausage, the fishermen cuttlefish. Five hours on the stove, an hour of it on the sofregit, finished with allioli. It surfaces only during the organised winter campaign at a handful of Palafrugell tables.", "Palafrugell, on the coast"),
 ("Canelons de Sant Esteve", "Pasta rolled round the beef, chicken and pork left from Christmas Day’s escudella, under béchamel and cheese, gratinéed and eaten on 26 December, Catalonia’s second Christmas. Canelons came with Italian cooks to the Barcelona fondes of the late eighteenth century; the Sant Esteve habit is a twentieth-century one.", "All Catalonia; the family table"),
 ("Botifarra amb fesols", "A raw pork botifarra grilled over coals, with the small beans of Santa Pau simmered until creamy and dressed in the sausage fat. The pairing is in print by 1830, in the Nou manual per cuinar; the beans, grown on the volcanic soils of the Garrotxa, have been a protected origin since 2015.", "The Garrotxa and every Girona market house"),
 ("Anxoves de l'Escala", "Anchovies gutted by hand, laid in salt in wooden barrels, pressed and left for months before they are filleted and laid in oil; the wood, not plastic, is held essential to the cure. The salting houses go back to the nineteenth century — Solés since 1888. A Catalan quality mark, not an EU protection.", "L’Escala, forty minutes north-east"),
 ("Gamba de Palamós", "Aristeus antennatus, the red prawn of the deep canyon off Palamós, landed by a specialised trawler fleet and sold at the town’s auction; the Gamba de Palamós guarantee mark checks the ground, the count per kilo and the landing temperature. Seared seconds a side on the planxa to keep the head juices; overcooking it is the local sin. Prices are high and swing with the season.", "Palamós, on the coast"),
]


def dish_articles(old):
    """The Dish: eight articles rebuilt from the old guide's dish fold (see DISHES)."""
    from liste import DISH_WHERE as W
    out = []
    for name, body, origin in DISHES:
        aid = "o-" + re.sub(r"[^a-z0-9]+", "-", name.lower().replace("ò", "o").replace("à", "a").replace("'", "")).strip("-")[:28]
        where = W.get(name)
        out.append(f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{H.escape(name, quote=False)}</span></h3>'
                   f'<p class="tcard__body">{H.escape(body, quote=False)} <b>Origin.</b> {H.escape(origin, quote=False)}</p>'
                   + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")
    assert len(out) == len(DISHES)
    return "".join(out)


def sources_edit(s):
    """The old sources fold: its list keeps its links; the description changes; cut venues' links leave."""
    s = s.replace("<ul class=\"sources\">", "<ul class='gx-list'>", 1)
    s = re.sub(r"\s*</div>\s*</details>\s*$", "</div></details>", s)
    return s


# gem popups: the old guide's five born-here food origins, kept (June 2026 research), patterns now plain phrases that occur in the prose
GEMS = [
 {"id": "botifarra-dol-a", "pattern": "botifarra dolça", "tag": "Food gem · Sweet", "name": "Botifarra dolça",
  "story": "Europe’s charcuterie map holds one real anomaly — a pork sausage cured with sugar, lemon peel and sometimes cinnamon — and it "
           "exists only round Girona. Barcelona files it as an Empordà speciality; the food historian Jaume Fàbrega puts its heart in Girona "
           "itself, with La Selva, the Pla de l’Estany and part of the Garrotxa in on it. It reached print late, in Ferran Agulló’s 1930s "
           "description, and Josep Pla’s monastic origin has no proof. Born of the farmhouse matança, it carries the Productes de l’Empordà "
           "guarantee mark (2003) and is eaten caramelised with apple, as pudding.",
  "where": "The charcuterie stalls of the Mercat del Lleó; in Empordà country restaurants, at the end of the meal."},
 {"id": "anxova-de-l-escala", "pattern": "Anxoves de l", "tag": "Food gem · Fish", "name": "Anxova de l'Escala",
  "story": "L’Escala began in the sixteenth century as a fishermen’s quarter of Empúries, whose ruins hold a first-century salting "
           "factory. Its fortune was salt: once the Alfolí, the salt store, was finished in 1697, ships landed salt on the beach, barrels of "
           "anchovy sailed out, and the population quadrupled in the eighteenth century. More than a hundred lateen-rigged sardinal boats "
           "once worked the bay. The town’s archivist documents salting without a break since the 1700s.",
  "where": "The salting houses of L’Escala, forty minutes north-east — the Costa Brava guide has them."},
 {"id": "formatge-garrotxa", "pattern": "Garrotxa", "tag": "Food gem · Cheese", "name": "Formatge Garrotxa",
  "story": "Garrotxa the cheese very nearly outlived the habit of making it. The farmhouse goat’s cheese of these hills had almost gone "
           "when a recovery project in 1981, credited by the Generalitat to the back-to-the-land generation, fixed its form: goat’s milk, "
           "three weeks’ maturing at least, one-kilo wheels sized to the old clay moulds. Round Sant Miquel de Campmajor the young makers "
           "learned to coax the grey-blue bloom that gives the rind its ash colour and the paste its hazelnut finish.",
  "where": "Cal Formatger on Carrer de la Cort Reial: ask what came in from the Garrotxa that week."},
 {"id": "ratafia", "pattern": "ratafia", "tag": "Food gem · Drink", "name": "Ratafia",
  "story": "Every Catalan house that makes ratafia guards its own recipe; the oldest on paper, from 1842, comes from La Selva — the comarca "
           "whose capital, Santa Coloma de Farners, has run a ratafia competition since 1982. The walnuts are picked green around Sant "
           "Joan in late June, before the shell hardens, and steeped in spirit with herbs and spice for months. It is the IGP Ratafia "
           "Catalana now, and still a farmhouse solstice ritual: bottled at midsummer, ready by winter.",
  "where": "Santa Coloma de Farners, half an hour south-west; elsewhere, look for the IGP seal on the bottle."},
 {"id": "esmorzar-de-forquilla", "pattern": "esmorzar de forquilla", "tag": "Food gem · Tradition", "name": "Esmorzar de forquilla",
  "story": "The fork breakfast is working Catalonia’s second breakfast: a bite before dawn, then, mid-morning, tripe, pig’s trotters, stewed "
           "botifarra and a glass of red. Food writers date its consolidation to the mid-eighteenth century, with the markets at its centre — "
           "which is why Girona still does it properly. In 2024 the tradition got its own book, Laia Freixinet’s Esmorzars de forquilla. "
           "Round Girona it never needed reviving; in the villages it simply never stopped.",
  "where": "The market house opposite the Mercat del Lleó from nine, or the roadside bar on the Banyoles road from six — both in the tables."},
]

GLOSS = [
 ["Barri Vell", "Girona’s old town, on the east bank"],
 ["Call", "the medieval Jewish quarter"],
 ["Onyar", "the river that splits the city in two"],
 ["cases de l’Onyar", "the painted houses that hang over the river"],
 ["xuixo", "Girona’s fried, sugar-crusted, cream-filled pastry"],
 ["xuixos", "Girona’s fried, sugar-crusted, cream-filled pastries"],
 ["crema catalana", "Catalan custard, set and caramelised on top"],
 ["mar i muntanya", "sea and mountain: meat and shellfish in one pot"],
 ["suquet", "the fishermen’s fish-and-potato stew"],
 ["picada", "a pounded paste of nuts, garlic, bread and herbs that finishes a dish"],
 ["sofregit", "onion and tomato cooked slowly in oil, the base of the pot"],
 ["allioli", "garlic pounded with olive oil"],
 ["escudella", "the Catalan winter stew of meats, broth and pasta"],
 ["canelons", "cannelloni, the 26 December dish"],
 ["botifarra", "Catalan pork sausage"],
 ["fesols", "small white beans"],
 ["niu", "Palafrugell’s winter pot of cod tripe and stockfish"],
 ["anxova", "anchovy"],
 ["gamba", "prawn; here the deep-water red prawn of Palamós"],
 ["pa amb tomàquet", "bread rubbed with tomato, oil and salt"],
 ["menú del dia", "the fixed lunch of the day: two courses, dessert, a drink"],
 ["menú", "the fixed-price lunch"],
 ["granja", "an old-style café for chocolate, cream and pastries"],
 ["xocolata desfeta", "hot chocolate thick enough to coat a spoon"],
 ["suís", "hot chocolate under a cap of whipped cream"],
 ["braves", "fried potatoes with a hot sauce"],
 ["pintxos", "Basque bar snacks on a stick"],
 ["pintxo", "a Basque bar snack on a stick"],
 ["obrador", "a pastry or chocolate workshop"],
 ["Garnatxa", "Grenache, the main grape of the Empordà"],
 ["Carinyena", "Carignan, the Empordà’s other black grape"],
 ["vi novell", "the new wine of the year, released in November"],
 ["vermut", "vermouth, and the aperitif hour named after it"],
 ["cremat", "rum set alight with sugar, coffee and cinnamon"],
 ["havanera", "a Cuban-rooted sea song of the Catalan coast"],
 ["havaneres", "Cuban-rooted sea songs of the Catalan coast"],
 ["sardana", "the Catalan circle dance"],
 ["sardanes", "Catalan circle dances"],
 ["cobla", "the wind band that plays the sardana"],
 ["tramuntana", "the dry, cold north wind off the Pyrenees"],
 ["Fires de Sant Narcís", "Girona’s autumn fair, for its patron saint"],
 ["Temps de Flors", "the May flower festival, when the old town’s patios open"],
 ["castanyada", "the All Saints’ chestnut feast"],
 ["panellets", "almond-and-pine-nut sweets of All Saints"],
 ["bolets", "wild mushrooms"],
 ["calçots", "long sweet spring onions, charred and dipped in romesco"],
 ["Ajuntament", "the town hall"],
 ["Repsol", "the Spanish restaurant guide that awards Soles, suns"],
 ["Solete", "the Repsol guide’s mark for a good, simple, affordable place"],
 ["masia", "a Catalan farmhouse"],
 ["mikveh", "a Jewish ritual bath"],
 ["comarca", "a Catalan county"],
]

# the guide's own three CC photos (committed with their credits)
PHOTOS = [
 {"src": "/terroir/Girona-Catalunya/img/girona-onyar.jpg", "caption": "The Onyar houses and the Eiffel bridge under the cathedral tower — the city doubling itself in its river.", "credit": "kallerna / Wikimedia Commons · CC BY-SA 4.0"},
 {"src": "/terroir/Girona-Catalunya/img/girona-cathedral.jpg", "caption": "Ninety Baroque steps to the door — then one span of vault, wall to wall, no aisles.", "credit": "Richard Mortel / Wikimedia Commons · CC BY 2.0"},
 {"src": "/terroir/Girona-Catalunya/img/girona-call.jpg", "caption": "The vaulted passage of Carrer de Sant Llorenç, in the medieval Call.", "credit": "Enfo / Wikimedia Commons · CC BY-SA 4.0"},
]
