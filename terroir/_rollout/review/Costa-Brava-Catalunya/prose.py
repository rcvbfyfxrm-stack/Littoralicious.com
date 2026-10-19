"""Hand-written prose for the Costa-Brava-Catalunya GOLD6 build (19 Oct 2026). Facts only from the guide (its June 2026 research), the
19 Oct re-check packs in research/, and nothing else. The old page was a GOLD2 tier inventory: a long lead, a why-now line, a history
block, 'what to eat' and 'what to drink' essays, a 'where the money sits' fold, three overlapping table inventories and a 24-hours plan.
The essay is rebuilt here from the lead, history, eat and drink blocks (transformed, not pasted); the facts that now have a card of
their own (the 1908 name, the tramuntana and the low vine, the schist, the vine at Empúries, the Indianos, the smugglers) are pointed
to, not retold. The food-history fold (#bougie) is new: elBulli, the Rocas and what they left on this coast. The GOLD3/4/5 floor
(lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer, the calendar, craft, the listening
room, Autour) is written here for the first time."""
import re, html as H

TITLE = "Costa Brava · Empordà — Terroir Guide"
DESC = ("The Costa Brava for people who cook: the red prawn sold at the Palamós auction, the anchovy of L'Escala, the winter urchin, "
        "the rice of Pals and the Garnatxa of the tramuntana; the Rocas in Girona and elBulli's cove at Roses; the camí de ronda, Empúries "
        "and Dalí's triangle — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Costa Brava</h1><div class="region">Empordà · Girona · Catalunya</div><div class="philosophy">'
        '"Where the Pyrenees run into the sea: cork hills and cliff coves to the south, the schist of Cap de Creus to the north, and between '
        'them a plain of rice and wind-bent vines that fed the two most famous kitchens of our time."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Empordà is the country of Empúries — and Empúries is the Greek <strong>Emporion</strong>, '
          'the market.</em><div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The trading post the Greeks built '
          'on the shore at L’Escala gave its name to a medieval county, and the county to the whole plain behind the coast: the Alt Empordà '
          'round Figueres in the north, the Baix Empordà round La Bisbal in the south. The other name, Costa Brava, is far younger — a '
          'journalist’s phrase of 1908, told under the curiosities.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>The Costa Brava is two coasts and a plain:</strong> cliff coves and cork hills from Palamós to Begur, '
        'the Gulf of Roses and the schist of Cap de Creus to the north, and between them the Empordà — rice, vines, stone villages, and '
        'Girona inland. <strong>Make or break:</strong> book the grand-night table weeks or months ahead, and be on the Palamós quay when the '
        'afternoon auction opens. <strong>The warning:</strong> the resort promenades sell photo-board paella; eat at the working ports and the '
        'village houses, and keep away in high August.</p></div>')

ESSAY_LEDE = ("The Costa Brava is the Girona coast of Catalonia, where the last folds of the Pyrenees reach the Mediterranean. "
              "It is not one place but a sequence: the pine-and-cork coves of Palafrugell, the working fishing port of Palamós, the salt town "
              "of L’Escala beside a Greek city, the long bay of Roses, and the bare schist of the cape — with the flat, fertile Empordà behind "
              "all of it, and Girona at its inland edge.")
ESSAY = [
 ("", "Read the coast by what it lands. Palamós is a prawn town: the deep-water red gamba comes in on the trawlers every weekday "
      "afternoon and is sold on the quay before it reaches a kitchen. L’Escala is an anchovy town, still curing in salt the way its "
      "grandmothers did. Roses is a bay of fish and, at its far end, of one restaurant that changed everything. Each port has its own "
      "plate, and the honest way to eat the coast is to eat each plate where it lands."),
 ("", "Behind the sand is the larder. The rivers Muga, Fluvià and Ter drain the Empordà into marsh and paddy, and rice has grown on the "
      "lower Ter for more than five centuries. The hills carry olives for the Argudell oil and old bush vines of Garnatxa and Carinyena, "
      "kept low and healthy by a north wind that the curiosities explain. Fresh curd drained in a cloth, sweet sausage, salted fish: the "
      "plain feeds the coast as much as the sea does."),
 ("The quintessence", "A plate of red prawns seared with salt on the Palamós quay, the heads sucked for their coral; a garoina opened "
      "in February and spooned onto bread; a glass of Empordà red poured in a stone village under arcades. Nothing on it is clever, "
      "and nothing on it could come from anywhere else."),
]
HISTORY = [
 "The coast has been a door for twenty-five centuries. Greeks traded at Emporion from the sixth century before Christ, and Rome "
 "landed on the same beach in 218 BC to begin the conquest of Hispania; a medieval County of Empúries ruled from Castelló, and the "
 "Benedictines of Sant Pere de Rodes kept the vineyards going through the Middle Ages. Later the coast sent its sons to Cuba and took "
 "back their fortunes, and in the hungry years after the Civil War its coves ran contraband. The cards below have the dates and the disputes.",
 "Then, in the space of a generation, two kitchens made this the most talked-about table in the world: one in a cove beyond Roses, one in "
 "a suburb of Girona. Their story is told just below; their children cook all along the coast.",
]
MONEY = [
 "The coast runs on summer and on second homes. The big resorts of the south were built for package holidays; the coves of Begur and "
 "Palafrugell for Barcelona weekends; and the money that matters to a chef sits in two places — at the table in Girona that sells out "
 "months ahead, and on the auction floor at Palamós, where the gamba climbs towards its Christmas price.",
 "So the value is where the work is. The prawn bought by weight at a port house, the anchovy bought at the salter’s counter, the "
 "village guisat under the arcades of Peratallada: these cost a fraction of a promenade platter and taste of the place. A galley that "
 "provisions here spends on the fish market, the salted anchovy and the wine of the bush vines, and nothing on the front line in August.",
]
WHY_NOW_PARA = ("<p>And the clock is the season. The coves fill from June to September; the summer festivals end with August; and the "
                "real gastronomic season is the cold half of the year — the urchin from winter into March, the calçot from late autumn, "
                "the prawn at its dearest before Christmas. Come in spring, autumn or winter, and the coast is yours.</p>")


def soul_fold():
    """The essay: the old lead, history, eat and drink blocks, rewritten with their facts and merged into one read; the 1908 name, the
    wind, the rock, the Greeks, the Indianos and the smugglers have cards of their own."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">Two coasts and a plain, a plate for every port, a door for twenty-five centuries, '
                      'and what the summer pays for</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}

# The food-history callout (#bougie): new. The old 'Where Money Sits' fold held two cards (the Peralada castle, now a larder card;
# the Can Roca cellar, now on its venue); its place in the chapter becomes the story of the two kitchens.
BOUGIE_P = [
 ("lede", "For a quarter of a century the most influential restaurant in the world was a beach house at Cala Montjoi, on the far side of the "
          "bay of Roses; before it closed, the most decorated had risen in a Girona suburb. No other stretch of coast can say both."),
 ("", "elBulli was Ferran Adrià’s laboratory: it opened only part of the year, closed its kitchen in the off-season to invent, and was "
      "named the world’s best restaurant five times before it served its last dinner on 30 July 2011. In June 2023 the same building "
      "reopened as elBulli1846, a museum of the 1,846 dishes the team created — its card is under Culture. The cooks who learned there "
      "spread down the coast: three of its head chefs opened Compartir in Cadaqués in 2012, and Adrià’s own favourite counter in Roses is "
      "in the port lane."),
 ("", "Inland, three brothers built El Celler de Can Roca in Taialà, on the edge of Girona: three MICHELIN stars since "
      "2009, twice first in the world’s best-restaurant list, a cellar run by the middle brother and a pastry kitchen by the youngest, "
      "whose gelateria in the old town lets anyone taste the house for a few euros."),
 ("", "What both left behind is a habit, not a style: start from the product of this coast — the prawn, the anchovy, the rice, the "
      "Garnatxa — and think hard about it. You will taste that habit in the port houses as much as in the starred rooms."),
]
GV_LINE = ""
def bougie():
    paras = [f'<p class="gx-lede">{t}</p>' if k == "lede" else f"<p>{t}</p>" for k, t in BOUGIE_P]
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     '<div class="sfold__title">elBulli and the Rocas — the coast that changed cooking</div>',
     '<div class="sfold__desc">A beach house beyond Roses and a family dining room in Girona, and what they left on every table of the coast</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     *paras, "</div>", "</details>"])

DROP_CARDS = []

FOLDS = {
 "quartiers": {"title": "The towns — the coves, the gulf and Girona", "desc": "Seven places from south to north and inland: the Palafrugell coves, the prawn port, the stone villages; the anchovy town, the bay of Roses, Cadaqués; and Girona",
               "lede": "This guide reads the coast as a row of towns standing in for quarters. You will need a car or a boat between them: the coast road is slow, and Girona is inland."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "A name from 1908, the wind that keeps the vines low, the oldest rock, the vine at Empúries, the Indianos and the smugglers",
                 "lede": "Six things the coast’s own story tells slightly wrong, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the auction, the salt, the market, the wine and the oil", "desc": "Where a galley provisions: the prawn auction, the anchovy salters and Girona’s covered market; three wine estates; the oil co-operative, the castle cellar and the natural wine",
                  "lede": "Shop the market in the morning and the quay in the afternoon. The estates receive by appointment, so book before you drive."},
 "walks": {"title": "Walks — the coast path, the ruins, the cape and the rice", "desc": "Four routes: the camí de ronda between two coves, the shore past the Greek city, the sculpted rock to the cape lighthouse, and the flat paddies below Pals",
           "lede": "Walk early or late, carry water, and turn back on a hard tramuntana day: the cape has no shade and the wind on the headland can knock you sideways."},
 "coffee-gardens": {"title": "Rooms to linger — and corners to sit", "desc": "First light under the arches at Port Bo, a fishermen’s cove, a square on the ruins; a garden over the sea; and Girona’s cup and river",
            "lede": "Nothing here costs much; the point is the hour. Most of these corners are free and best before the day starts."},
 "culture": {"title": "Culture — Dalí, the Greeks and the cape", "desc": "Dalí’s theatre, his house and Gala’s castle; the Greek and Roman city, the monastery on the mountain and the county cathedral; the cape and elBulli’s cove",
             "lede": "Dalí’s house at Portlligat is timed entry only: book it before anything else. Several of the rest keep winter hours or close a day a week."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one workshop where you can learn from a named hand, the others and what each is missing, and the honest word on what is sold as local",
           "lede": "The Empordà works in clay, cork and stone — but most of its hands sell rather than teach. The card at the top is the one that does both."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The grapes of the Empordà to ask for by name, the sweet Garnatxa, and the two glasses of after dinner",
          "lede": "The Empordà drinks Garnatxa and Carinyena from low bush vines, a sweet Garnatxa with dessert, and burns rum on summer nights. The bars themselves are in the tables, under Le Bar."},
 "listening": {"title": "Hi-fi & listening — the honest answer and the live music", "desc": "No listening bar on this coast, said plainly; then the summer stages — opera at a castle, concerts in a cliff garden, the sea songs on the beach",
               "lede": "This coast listens outdoors and in summer. Check the year’s programme before you plan around a night."},
 "around": {"title": "Autour — into the volcanoes", "desc": "The medieval bridge town on the road inland, and the volcanic park beyond it"},
 "avoid": {"title": "What to skip", "desc": "The resort strip, the photo-board paella, the front line in August, and the urchin out of season",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the coast’s tourist board, the Palafrugell office, the wine appellation and the Rocas"},
}

GDESC = {
 ("quartiers", "The coves of the Baix Empordà"): "The two coves joined by the cliff path, the prawn port, and the stone villages of the rice plain.",
 ("quartiers", "The Gulf of Roses"): "The anchovy town beside the Greek city, the long bay and its citadel, and the white village at the end of the road.",
 ("quartiers", "Inland"): "The old city of the Rocas, on its river.",
 ("curiosities", "The name, the wind, the rock"): "Who named the coast and when, why the vines grow knee-high, and how old the cape really is.",
 ("curiosities", "Who came ashore"): "The Greeks and the vine, the emigrants who came home rich, and the men who ran the coves after the war.",
 ("provisioning", "On the tables — go early"): "The auction, the salter and the covered market each have a full card in the tables; here is what to buy.",
 ("provisioning", "The wine estates"): "The big organic house of Vilajuïga, the biodynamic valley of La Selva de Mar, and the vines inside the cape park.",
 ("provisioning", "The oil, the castle cellar and the natural wine"): "The Argudell oil of Pau, the old cellars of Peralada, and a young mixed farm making wine without sulphites.",
 ("walks", "The coast path"): "Cliff and pine between two coves, and the shore past twenty-five centuries of trade.",
 ("walks", "The cape and the plain"): "Wind-carved rock to the easternmost lighthouse, and the paddies under the Montgrí.",
 ("coffee-gardens", "First and last light on the coast"): "The arches of Port Bo, a cove of fishermen’s houses below Begur, and a shaded square where the Greeks first landed.",
 ("coffee-gardens", "A bench above the sea"): "Terraced gardens on the headland between Calella and Palamós.",
 ("coffee-gardens", "Girona — the cup and the river"): "The cyclists’ café, the arcaded square, and the bridges over the Onyar.",
 ("culture", "Dalí's triangle"): "The theatre he built and is buried in, the house he made from fishermen’s huts, and the castle he gave to Gala.",
 ("culture", "Greeks, monks and counts"): "The Greek and Roman city, the monastery on the Verdera, and the church they call the cathedral of the Empordà.",
 ("culture", "The cape and the cove"): "The natural park at the easternmost point, and elBulli’s cove, now a museum.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as local-made, and is not.",
 ("bars", "Ask for it by name"): "The three Garnatxas, the Carinyena, and the sweet wine of the Empordà.",
 ("bars", "After dinner"): "Rum set alight, and the green-walnut liqueur of the farmhouse.",
 ("listening", "The listening room, honestly"): "No hi-fi bar on this coast, and where to hear music instead.",
 ("listening", "Live, in summer"): "Opera at the castle of Peralada, concerts in the Cap Roig gardens, and the havaneres on the beach at Calella.",
 ("around", "Into the volcanoes"): "The bridge town of Besalú, and the volcanic country round Olot.",
 ("avoid", "The strip and the photo board"): "The resort front at Lloret, and the paella sold from a photograph.",
 ("avoid", "The season"): "The coves in high August, and the sea urchin ordered in summer.",
 ("follow", "The coast and the wine"): "The regional tourist board, the Palafrugell office, and the Empordà appellation.",
 ("follow", "The kitchen"): "The Rocas’ own channel, where the booking months are announced.",
}

TABLES_DESC = ("Three stars in Girona at one end and an anchovy counter at the other: at most three places of each kind, picked for what "
               "you should not miss on this coast, every card saying when it was last confirmed.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE FOOD STORY", "towns": "THE TOWNS", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "WINE & GLASSES", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the two kitchens, the towns, the record corrected, the season", "tables": "",
               "flaner": "the coast path and the cape on foot, Dalí and the Greeks, the hand, the corners to sit",
               "sortir": "the grapes of the Empordà by name, the after-dinner glasses, the summer stages", "around": "Besalú and the Garrotxa volcanoes",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "Le Comptoir — the market and the bar"}
GROUP_DESC = {"grande": "The tables you clear an evening for, and book ahead: three stars in Girona, a converted factory at Corçà, and a farmhouse on the coast road.",
              "petite": "Where this guide actually lives: the port houses that sell the catch by weight, and the tables of the coves, the stone villages and the cape.",
              "street": "Walk in: the prawn auction, the anchovy salter, the covered market — then Girona’s cyclists’ café and the Rocas’ gelateria."}

LANE_LEAD = {
 "summit": "The Roca brothers’ three stars in Girona, two stars in a carriage factory at Corçà, and a star in a masia on the road to Sant Feliu.",
 "port": "Prawns by weight on the Palamós port, five tables in Roses with no menu, and the catch of the Medes islands at L’Estartit.",
 "village": "A dining room on the cliff path at Llafranc, a family house under the arcades of Peratallada, and elBulli’s alumni in Cadaqués.",
 "larder": "The prawn sold on the quay, the anchovy salted in L’Escala, and Girona’s covered market of 1944.",
 "bars": "A cyclists’ café that roasts its own beans, and Jordi Roca’s gelato in a brioche.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each town — the drink, the table, the late glass.",
  "note": "Le verre · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the two kitchens that changed cooking, the auction and the salters, the dishes of the coast, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through: the hotel marisqueria at L’Estartit takes walk-ins most of the year, the prawn house on the Palamós port books weekends only, and Rafa’s five tables in Roses answer the phone the same day if you are lucky. All three traded in 2026; none published autumn hours, so call first.",
             "Plan ahead — this week": "Book a few days ahead: the dining room on the cliff steps at Llafranc, reopened in March 2026 after the hotel was rebuilt, and elBulli’s alumni at Compartir in Cadaqués, whose opening days vary through the autumn.",
             "Plan ahead — the grand night": "Three stars at Girona open online up to eleven months ahead and fill on the day each month is released; two stars at Corçà and the star on the Sant Feliu road take bookings weeks ahead. All three were trading in October 2026; none published a 2026 menu price that we could read."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the Costa Brava year: the urchin and the calçot in winter, the prawn and the fairs in spring and summer, the anchovy, the Indianos and the saint in autumn"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): the old guide's seven dish articles, rewritten.
DISH_DESC = "Seven plates with their honest passports: what each port lands, what the plain grows, and what the whole of Catalonia shares."
DISHES = [
 ("Gamba de Palamós", "Aristeus antennatus, the red prawn trawled from the deep canyon off Palamós, four hundred metres down and more, landed the same afternoon and graded by size before it is sold. It is cooked as little as possible — a minute on the plancha with coarse salt — and the head, full of coral, is the part the locals fight over. A quality mark protects the name.", "Palamós, between Cap de Begur and the Ridaura"),
 ("Garoines", "The violet urchin, Paracentrotus lividus, picked by divers off the rocks of the Baix Empordà. Opened across the mouth, rinsed, and eaten raw: five orange tongues of roe, spooned onto toasted bread, sometimes with a drop of lemon, sometimes scrambled into eggs. The roe swells through the cold months and is at its fullest in late winter.", "The Palafrugell coves, Calella, Llafranc and Tamariu"),
 ("Anxoves de l'Escala", "Anchovies layered head to tail in barrels of coarse salt, pressed under a salt cap and left for six to eighteen months, then cleaned and filleted by hand and laid in olive oil. Eaten on bread rubbed with tomato. The work was done for generations by women, the anxoveres, and the town has salted fish since at least the eighteenth century.", "L’Escala"),
 ("Suquet de peix", "The boat stew: monkfish, scorpionfish and hake with potatoes over a sofregit, bound at the end with a picada pounded from garlic, parsley, nuts and fried bread, with saffron or paprika. Made from the fish that would not sell. Tossa and L’Escala also make a version with anchovy.", "The whole coast; fishermen’s cooking"),
 ("Arròs de Pals", "Rice from the paddies of the lower Ter, grown round Pals since the fifteenth century: Bahia and Bomba of old, Carnaroli and Nembo now. The long, mild Empordà autumn gives a grain that keeps its shape in the seafood arrossos of the coast.", "Pals and the Baix Ter plain"),
 ("Recuit de drap", "Fresh goat’s or sheep’s curd set for seventeen to twenty-four hours and drained in the cloth — the drap — that gives it its name. It is eaten as a dessert, with honey or sugar, and is closer to a set cream than to cheese.", "The Empordà farms"),
 ("Botifarra", "The Catalan pork sausage in all its forms: white and black, raw or cooked, the cooked botifarra de perol, and the Empordà’s oddity, botifarra dolça, sweetened with sugar and lemon and eaten as dessert. The plain one is grilled and served with white beans, amb seques.", "All Catalonia; the sweet one from the Empordà"),
]
DISH_WHERE = {}   # filled in liste.py


def dish_articles(old):
    """The Dish: seven articles rebuilt from the old guide's dish fold (see DISHES)."""
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
    """The old sources fold was clean (5 links); only its list class and description change."""
    s = s.replace("<ul class=\"sources\">", "<ul class='gx-list'>", 1)
    s = s.replace('<div class="sfold__desc">Links we checked.</div>',
                  '<div class="sfold__desc">Official and primary first; the October 2026 re-check below</div>', 1)
    s = re.sub(r"\s*</div>\s*</details>\s*$", "</div></details>", s)
    return s


# gem popups: born-here food origins (each kept to what the old research and the re-check say)
GEMS = [
 {"id": "gem-anxoveres", "pattern": "anchovy", "tag": "Empordà gem · born here", "name": "The anxoveres",
  "story": "For generations the anchovy of L’Escala went through women’s hands: they packed the fish in salt, came back months later to "
           "clean it, and lifted each fillet off the bone one at a time. The craft passed from mother to daughter, and the town still "
           "calls the women who do it anxoveres.",
  "where": "The salter’s own counter in L’Escala, in the tables."},
 {"id": "gem-cremat", "pattern": "cremat", "tag": "Coast gem · born here", "name": "Rum from the Cuba run",
  "story": "Catalan sailors and traders on the Cuba run brought home dark rum and the songs of Havana. Burned in a clay pot on the beach, "
           "the rum became the coast’s own drink and the songs its own music, and on summer nights at Calella the two still arrive "
           "together.",
  "where": "The havaneres night on the beach at Calella de Palafrugell, in July."},
 {"id": "gem-recuit", "pattern": "recuit", "tag": "Empordà gem · born here", "name": "Curd in a cloth",
  "story": "Before refrigeration, a farmhouse that had milk and no market made recuit: the curd set slowly overnight and hung in a cloth "
           "to drain, eaten within a day or two with the honey of the same farm. It is still made that way in the Empordà, and it still "
           "keeps only a few days.",
  "where": "Girona’s covered market, and the dessert line of the village houses."},
]

GLOSS = [
 ["tramuntana", "the dry, cold north wind off the Pyrenees"],
 ["gamba", "prawn; here the deep-water red prawn of Palamós"],
 ["llotja", "the fish auction hall on the quay"],
 ["garoina", "the sea urchin, as it is called on this coast"],
 ["garoines", "sea urchins, eaten raw in the cold months"],
 ["garoinada", "the winter sea-urchin campaign of Palafrugell"],
 ["anxova", "anchovy"],
 ["anxoves", "anchovies"],
 ["anxoveres", "the women who cleaned and filleted the salted anchovy"],
 ["suquet", "the fishermen’s fish-and-potato stew"],
 ["picada", "a pounded paste of nuts, garlic, bread and herbs that finishes a dish"],
 ["sofregit", "onion and tomato cooked slowly in oil, the base of the pot"],
 ["allioli", "garlic pounded with olive oil"],
 ["arròs", "rice; a rice dish"],
 ["arrossos", "rice dishes"],
 ["recuit", "fresh curd, eaten with honey"],
 ["botifarra", "Catalan pork sausage"],
 ["embotits", "cured sausages and charcuterie"],
 ["pa amb tomàquet", "bread rubbed with tomato, oil and salt"],
 ["coca", "a flat Catalan bake, savoury or sweet"],
 ["calçot", "a long sweet spring onion, charred and dipped in romesco"],
 ["calçots", "long sweet spring onions, charred and dipped in romesco"],
 ["calçotada", "a calçot feast"],
 ["romesco", "a sauce of dried peppers, nuts, garlic and oil"],
 ["guisat", "a slow stew"],
 ["guisats", "slow stews"],
 ["masia", "a Catalan farmhouse"],
 ["cremat", "rum set alight with sugar, coffee and cinnamon"],
 ["havaneres", "Cuban-rooted sea songs of the Catalan coast"],
 ["ratafia", "green-walnut and herb liqueur"],
 ["vi dolç", "sweet wine"],
 ["Garnatxa", "Grenache, the main grape of the Empordà"],
 ["Lledoner", "the Empordà name for Garnatxa"],
 ["Carinyena", "Carignan, the Empordà’s other black grape"],
 ["Samsó", "the Empordà name for Carinyena"],
 ["celler", "a winery, a cellar"],
 ["verema", "the grape harvest"],
 ["camí de ronda", "the old coastal guard path"],
 ["Camí de ronda", "the old coastal guard path"],
 ["cala", "a cove"],
 ["platja", "a beach"],
 ["mirador", "a viewpoint"],
 ["Barri Vell", "Girona’s old town"],
 ["Call", "the medieval Jewish quarter"],
 ["mikveh", "a Jewish ritual bath"],
 ["indianos", "emigrants who came home rich from the Americas"],
 ["Ajuntament", "the town hall"],
 ["Repsol", "the Spanish restaurant guide that awards Soles, suns"],
 ["Soles", "the suns of the Repsol guide, one to three"],
 ["castanyada", "the All Saints’ chestnut feast"],
 ["panellets", "almond-and-pine-nut sweets of All Saints"],
 ["sardana", "the Catalan circle dance"],
 ["festa major", "the town’s main annual festival"],
 ["pedra seca", "dry-stone walling"],
]

# the guide's own three CC photos (committed with their credits), now in TERROIR_DATA.PHOTOS, captions tightened
PHOTOS = [
 {"src": "/terroir/Costa-Brava-Catalunya/img/1-vista.jpg", "caption": "The lateen-rigged llaüt Santa Espina under sail off Calella de Palafrugell, the wooded headland of Sant Sebastià behind.", "credit": "Photo: Mdeprada · CC BY-SA 4.0 · Wikimedia"},
 {"src": "/terroir/Costa-Brava-Catalunya/img/2-human-food.jpg", "caption": "The corner shop and fish sign of an anchovy salter in L’Escala, the town that still cures its catch in salt.", "credit": "Photo: Jorge Franganillo · CC BY 2.0 · Wikimedia"},
 {"src": "/terroir/Costa-Brava-Catalunya/img/3-texture.jpg", "caption": "Folded, weathered rock and garrigue at Cala Jugadora in the Cap de Creus natural park.", "credit": "Photo: Alan Mattingly · CC0 · Wikimedia"},
]
