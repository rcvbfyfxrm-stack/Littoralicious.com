"""Hand-written prose for the Barcelona-Catalunya GOLD6 build (15 Oct 2026). Facts only from the guide (its July 2026 research),
the 15 Oct re-check packs in research/, and nothing else; every edit to an old block is an exact (old, new) pair, asserted
by the build. The old page was a pre-GOLD3 tier inventory, so the whole GOLD3/4/5 floor (lanes with stories, dishes, the guest
list, La liste with The Dish, the hot board and its pointer, the calendar, the craft section, the listening room, Autour) is
written here for the first time."""
import re, html as H

TITLE = "Barcelona — Terroir Guide"
DESC = ("Barcelona for people who cook: the three-star rooms of the elBulli generation, the bomba where it was born, the Sunday "
        "vermut, the markets before ten and the Gothic city at dawn — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Barcelona</h1><div class="region">Barcelonès · Catalunya · Spain</div><div class="philosophy">"A Roman hill, a grid '
        'thrown over the torn-down walls, and a sea the city only turned to face in 1992 — Barcelona eats at the counter, standing, at noon on a Sunday."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Barcino, the Roman colony on Mons Taber — and a Carthaginian legend nobody can prove.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The Romans called their veterans\' colony on the low hill '
          'above the plain Barcino, founded in the reign of Augustus; its full title began Colonia Iulia Augusta Faventia Paterna. A story repeated since the Renaissance '
          'credits the name to the Carthaginian Hamilcar Barca, father of Hannibal: it is a legend, with no ancient source behind it, and most historians '
          'take Barcino to be an older Iberian place-name the Romans kept. The hill itself is barely there now — the Plaça de Sant Jaume sits on its top, '
          'and four columns of the temple that crowned it stand inside a courtyard on Carrer del Paradís.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Barcelona is a Roman hill wrapped in a nineteenth-century grid, and it eats on two clocks:</strong> the '
        'vermut and the counter at noon, the long table at ten at night. <strong>Make or break:</strong> book the one table that matters before you '
        'fly — the three-star rooms take reservations months out — then eat the rest standing up, a street back from anything famous. '
        'Be at the market before ten. <strong>The warning:</strong> nothing on La Rambla itself is worth sitting down for, and a paella with a '
        'photo menu is the one reliable trap signal in the city. Girona, the Costa Brava and Cadaqués have their own guides.</p></div>')


def _paras(block, cls=None):
    if cls: return re.findall(r'<p class="%s"[^>]*>(.*?)</p>' % cls, block, re.S)
    return re.findall(r"<p>(.*?)</p>", block, re.S)


def soul_fold(soul, history, money):
    """The essay: the old soul (minus 'The art' and 'The sound', which the culture and rumba cards now own),
    the old history, and the old 'where the money sits', merged into one read."""
    sp = _paras(soul, "soul__body")
    keep = [sp[0], sp[1], sp[2], sp[3]] + [p for p in sp[4:] if "The living city" in p or "The quintessence" in p]
    keep = [re.sub(r'<strong style="[^"]*">([^<]*)</strong>', r'<b class="gx-merge-k">\1.</b> ', p) for p in keep]
    body = f'<p class="gx-lede">{keep[0]}</p>\n' + "\n".join(f"<p>{p}</p>" for p in keep[1:])
    hp = _paras(history)
    mp = _paras(money[money.index('<div class="gx-fold"'):])
    body += "\n<h3 class=\"gx-merge\">Where it comes from</h3>\n" + "\n".join(f"<p>{p.strip()}</p>" for p in hp)
    body += "\n<h3 class=\"gx-merge\">Where the money sits</h3>\n" + "\n".join(f"<p>{p}</p>" for p in mp)
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A temple inside a courtyard, a grid over the torn-down walls, the defeat of 1714 and the beach of 1992, '
                      'elBulli\'s children, and the two economies the table runs on</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


# exact edits on the old blocks (asserted by the build)
EDITS = {
 "soul": [],
 "history": [
  ("On <strong>20 February 2026</strong> the central Tower of Jesus Christ at the Sagrada Família reached its full 172.5 m, making it the tallest church building in the world; the formal inauguration with Pope Leo XIV falls on <strong>10 June 2026</strong>, the centenary of Gaudí's death (he was struck by a tram on Carrer de Bailèn in 1926, walking to confession at Sant Felip Neri). ",
   "In <strong>February 2026</strong> the central Tower of Jesus Christ at the Sagrada Família was topped out at 172.5 m, making it the tallest church building in the world, in the centenary year of Gaudí's death; the Sagrada Família card has the rest. "),
  ("In 1992 the Olympics rebuilt the entire seafront — two miles of beach were created from sand imported from Egypt, the Poblenou industrial belt was converted to housing, Montjuïc was crowned with the Calatrava telecommunications tower.",
   "In 1992 the Olympics rebuilt the entire seafront — the beaches were laid over rail yards and factories, the Poblenou industrial belt was converted to housing, Montjuïc was crowned with the Calatrava telecommunications tower."),
  ("whose disciples now run Disfrutar (★★★ since 2024, Eduard Xatruch, Mateu Casañas, Oriol Castro), Mont Bar (★★ from 2026, Fran Agudo), Suculent (Toni Romero), Dos Palillos (Albert Raurich), and Enigma (★★ from 2026, Albert Adrià himself — the sole survivor of the elBarri group that closed in 2020).",
   "whose alumni now run Disfrutar (Eduard Xatruch, Mateu Casañas, Oriol Castro), Dos Palillos (Albert Raurich) and Enigma (Albert Adrià himself — the one room of his elBarri group to come back after the 2020 closures)."),
  ("the Diada on 11 September fills the streets with the senyera estelada.", "the Diada on 11 September fills the streets with the senyera and, for many, the estelada."),
 ],
 "money-sits": [
  ("after a decade in which rents climbed more than sixty per cent; the nightly tourist tax keeps rising in step, reaching twelve euros a night for five-star stays by April 2026.",
   "after a decade in which rents climbed more than sixty per cent."),
  ("Barcelona's four three-star houses, ABaC, Disfrutar, Cocina Hermanos Torres and Lasarte, cluster", "Barcelona's three-star houses cluster"),
  ("Sant Antoni, reopened in 2018 after a nine-year, eighty-million-euro restoration the council deliberately rebuilt for locals rather than tourists, with full produce aisles and few eateries, and the neighbourhood market at Poblenou still sell to the barri, not to the photo op.",
   "The markets the council rebuilt for locals rather than tourists, Sant Antoni first, still sell to the barri, not to the photo op."),
  ("an hour south, the Penedes turns out cava by the hundreds of millions of bottles from houses like Codorniu, founded in 1551, and Freixenet at Sant Sadurni d'Anoia.",
   "and less than an hour inland the Penedès turns out cava by the hundreds of millions of bottles at Sant Sadurní d'Anoia."),
  ("Franco's tourism minister Manuel Fraga made the fixed-price menu turistico law in March 1965", "Franco's tourism minister Manuel Fraga made the fixed-price menú turístico law in March 1965"),
  ("on the menu del dia - three courses", "on the menú del dia — three courses"),
 ],
 "seasonal": [], "sources": [], "tables": [],
}

# The food-history callout (#bougie): written fresh from the old #eat and #drink prose, which this build no longer prints.
BOUGIE = "\n".join([
 '<details class="sfold" id="bougie">', "<summary>", "<div>",
 '<div class="sfold__title">Bread, tomato and a pestle — how Barcelona cooks</div>',
 '<div class="sfold__desc">Not a cuisine of sauces but of two pastes and a gesture: the sofregit, the picada, the rubbed tomato, and the counter that made a meal of all three</div>',
 "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
 '<p class="gx-lede">Every Catalan table opens with the same gesture: a half tomato rubbed into toasted bread, oil, salt. Pa amb tomàquet is not a dish here so much as a right.</p>',
 '<p>Behind the gesture sit two pastes that do the work French cooking gives to sauces. The sofregit — onion cooked down slowly, then tomato, until it turns dark and jammy — starts the pot; '
 'the picada — almonds or hazelnuts, garlic, parsley, fried bread, pounded in a mortar — goes in at the end to thicken and season. Between them they carry the fishermen\'s suquet, '
 'the rice dishes and the logic of mar i muntanya, sea and mountain in one pan: chicken with prawns, rabbit with crayfish. The city\'s oldest cookbook, the Llibre de Sent Soví of the '
 'fourteenth century, already records a cooked custard that became crema catalana.</p>',
 '<p>Barcelona\'s own inventions are smaller and later, and all of them belong to a room you can still sit in. The bomba, a fist of potato round spiced meat under two sauces, came '
 'out of a Barceloneta kitchen after the war. The arròs Parellada, the rice with every shell already taken off, carries a dandy\'s name. A granja in the Raval sells the chocolate milk it says it '
 'invented, Cacaolat. In autumn the pastry shops fill with panellets for All Saints. And the morning has its own meal: the esmorzar de forquilla, the "fork breakfast" of stews and '
 'botifarra eaten at ten by people who started work at dawn. The Dish and La liste, at the foot of this guide, take each plate in turn.</p>',
 "</div>", "</details>"])

FOLDS = {
 "quartiers": {"title": "The quarters — the walled town, the grid and the sea", "desc": "Nine quarters in three rings: the Roman and medieval core, the nineteenth-century grid and the town it swallowed, the fishermen's spit, the factories and the hill",
               "lede": "Barcelona reads in rings. The old town is the walled city on foot; the Eixample is the grid round it; Gràcia was a separate town until 1897; the sea and the hill come last. Walk the centre, take the metro for the rest."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "A medieval bridge from 1928, a market older than its ironwork, the street behind a Picasso, the cut corners of the grid, the beach's sand and how Gaudí died",
                 "lede": "Nine things the city's own story tells slightly wrong, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the markets, the shops that weigh by hand, the bottles", "desc": "Where a galley provisions: three markets with different clocks, a nut roaster of 1851, a cheese counter, the tins, and the cava and vermut at the source",
                  "lede": "Shop the markets in the morning, Tuesday to Saturday, and never at lunchtime. The shops below weigh by hand; the cellars an hour inland sell at the door."},
 "walks": {"title": "Walks — the old town, the grid and the two hills", "desc": "Six routes: the Gothic before nine, three markets in one morning, the Modernista mile, the park from the back gate, Montjuïc's museums and the pintxo street",
           "lede": "The old town is a dawn walk; the Eixample is a straight line; the hills are stairs. Start early: by eleven the Gothic is a queue."},
 "calas": {"title": "The sea — the city beaches", "desc": "Five swims along the 1992 shore, from the old bathing clubs at the port end to the quiet northern sand",
           "lede": "The city beaches are urban and sociable — a park with water. The further north-east you walk from Barceloneta, the quieter they get; for clear water, the Costa Brava has its own guide."},
 "culture": {"title": "Culture — Gaudí, the Roman floor, the painters", "desc": "Three Gaudí houses and the basilica, the Roman city under the Plaça del Rei, the glass concert hall, Picasso's apprenticeship, Miró's hill, the Romanesque frescoes and the new",
             "lede": "Book everything Gaudí before you fly: the basilica and the houses sell timed tickets only. The museums keep longer hours and are quieter at opening."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one workshop where you can learn the craft from a named hand, the others and what each is missing, and the honest word on what is sold as local",
           "lede": "Barcelona's trades are the trades of a Modernista city: rope-soled shoes, tiles, wax, ceramics. Most sell rather than teach; the card at the top is the one place that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "Three roasters for the cup itself, three rooms where a laptop is welcome, and two where it should stay shut",
                    "lede": "The honest work truth first: the specialty bars are for the cup, not the afternoon. For a desk, take the library or the all-day rooms; for an hour of beauty, close the laptop."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The three bottles to ask for by name, the native white and the herbal, three natural-wine rooms, three roofs and the city's two oldest bar rooms",
          "lede": "Barcelona drinks at noon and late. Learn the cava, the vermut and the Priorat by name; then the natural-wine rooms, a roof at sunset, and an absinthe where Picasso's friends drank."},
 "listening": {"title": "Hi-fi & listening — the rooms, the clubs and the city's own sound", "desc": "Two listening bars built round the system, a vinyl shop, three small live rooms, three clubs, and the gitano rumba born in Gràcia",
               "lede": "The city exports electronic music and keeps a quieter tradition: jazz in basements, rumba in Gràcia, and two new rooms where the sound system is the point. Check the night's programme before you go."},
 "around": {"title": "Autour — out of the city by train", "desc": "The monastery mountain, the seaside town, Gaudí's unfinished crypt, the cava country, the beech forest, and three places up the coast with their own guides"},
 "avoid": {"title": "What to skip", "desc": "The city keeps two versions of itself: what it sells to visitors on the boulevard, and what it does instead one street back",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to watch before you leave home: the official tickets and hours, the red guide's selection, the city's own calendar"},
}

GDESC = {
 ("quartiers", "The walled town"): "The Roman and medieval core: the Gothic on its hill, the merchants' Born, the Raval west of the Rambla.",
 ("quartiers", "The grid and the town it swallowed"): "Cerdà's chamfered blocks, the village of squares above it, and the market quarter where the city eats now.",
 ("quartiers", "The sea and the hill"): "The fishermen's grid of 1753, the factories of Poblenou, and the hill with the museums and the pintxo street below.",
 ("curiosities", "The old town is younger than it looks"): "A neo-Gothic bridge, a market eight centuries old, and the street a painting was named after.",
 ("curiosities", "The grid, the beach, the name"): "Why the corners are cut, where the sand came from, and who named the coast.",
 ("curiosities", "Three Barcelona endings"): "An architect taken for a beggar, a duet heard too late, and a logo drawn in an hour.",
 ("provisioning", "The markets"): "The famous one at opening, the one the city rebuilt for itself, and the one under the coloured roof.",
 ("provisioning", "The shops that weigh by hand"): "A wood-fired nut roaster, the cheese counter, and the shop that sells only tins.",
 ("provisioning", "Bottles at the source"): "Two cava houses that left the appellation, and the first Spanish vermut.",
 ("walks", "The old town on foot"): "The Gothic before the crowds, three markets in a morning, and the Modernista mile.",
 ("walks", "The hills and the pintxo street"): "Gaudí's park from the quiet gate, the museum hill, and the skewer street at its foot.",
 ("calas", "The city sand, south to north"): "The old bathing clubs at the port end, the postcard beach, and where the locals go.",
 ("calas", "The quieter end"): "Flatter water for families, and the free-spirited end of the strip.",
 ("culture", "Gaudí, three ways"): "The basilica, the two houses on the boulevard, and the first house he built.",
 ("culture", "The Roman floor and the glass hall"): "Walk the Roman streets under the palace, then hear a concert under a glass sun.",
 ("culture", "The painters"): "Picasso's apprenticeship, Miró on his hill, and the Romanesque frescoes saved from the Pyrenees.",
 ("culture", "The new and the designed"): "The white museum, the culture house next door, and the design collections at Glòries.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real shops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Barcelona craft, and is not.",
 ("coffee-gardens", "The cup itself"): "Three roasters that rewired the city's coffee: stand, taste, leave.",
 ("coffee-gardens", "Where you can actually work"): "Two all-day rooms and a reading room in a medieval hospital.",
 ("coffee-gardens", "Beautiful. Close the laptop."): "A Modernista café on the boulevard and a townhouse hotel lobby.",
 ("bars", "Ask for it by name"): "The bubbles invented an hour away, the noon apéritif, and the slate-grown red.",
 ("bars", "The other bottles"): "The native white grown up, and the green-walnut digestif.",
 ("bars", "Natural wine, three rooms"): "A Gràcia room, the smallest cave in the Gothic, and a Poblenou bar with a DJ.",
 ("bars", "Above the roofs"): "A pine-wood bar on Montjuïc, a hotel roof in the Born, and the terrace over La Pedrera.",
 ("bars", "The old rooms"): "The absinthe bar and the trapeze bar: two rooms to drink in, not to eat.",
 ("listening", "The listening rooms"): "Two bars built round the sound system, and the record shop by the MACBA.",
 ("listening", "Small, live and late"): "A basement on the Plaça Reial, a Raval bar, and a music school's own room.",
 ("listening", "The clubs"): "The 1940s dance hall, the five-room warehouse, and the small dark room since 1996.",
 ("listening", "The city's own sound"): "Gitano rumba from Gràcia, and the association bar that books the new.",
 ("around", "An hour by train"): "The monastery on its mountain, the white seaside town, and Gaudí's crypt in a mill colony.",
 ("around", "The wine country and the mountain"): "Cava at the source, and the beech forest an hour north.",
 ("around", "Up the coast — each has its own guide"): "The river city, the cliff path and the painters' bay: start here, read on there.",
 ("avoid", "Three to skip"): "The boulevard terraces, the photo-menu paella, and the park without a ticket.",
 ("avoid", "When not to come"): "The month the city empties of its own people.",
 ("follow", "Tickets and hours"): "The official tourist office, and the only place to buy the basilica.",
 ("follow", "What to eat, and when it is on"): "The red guide's selection, and the city's own agenda.",
}

TABLES_DESC = ("The world's best restaurant of 2024 at one end and a euro glass of cava at the other: at most three tables of each kind, picked for what "
               "you should not miss in this city, every card saying when it was last confirmed trading.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "HOW IT COOKS", "towns": "THE QUARTERS", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "sea": "THE SEA", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the cooking, the quarters, the record corrected, the month", "tables": "",
               "flaner": "the old town and the hills, the sea, Gaudí and the painters, the hand, the rooms to sit in",
               "sortir": "the bottles by name, natural wine, the roofs, the listening rooms and the clubs", "around": "out of the city by train",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for — and book before you fly: the three-star houses, the elBulli line, and three two-star rooms that each speak a different accent.",
              "petite": "Where this guide actually lives: the new guard, the dated houses, the tapas counters, the sea quarters, the vermut bodegas, the wine rooms and the granjas.",
              "street": "Standing up: one thing done for decades at a marble counter, and the quick plate."}

LANE_LEAD = {
 "creme": "The three-star rooms: the 2024 world No. 1, the kitchen in the middle of the room, and the city's first three stars.",
 "elbulli": "Albert Adrià's one surviving room, his old head chef's counter, and the bistro that put a tartare on a marrow bone.",
 "two-stars": "Snacks first at Mont Bar, Cádiz in a Modernista house, and a self-taught chef's Catalan seasons.",
 "rising": "This year's news: a first star in a 28-seat room, and two young rooms with their first Bib.",
 "houses": "1786, 1836, 1897: the canelons, the rice with no shells, and the café where Picasso first showed.",
 "counters": "Sit at the bar or stand: the open kitchen in the Raval, the no-menu seafood counter, the 1914 montadito bodega.",
 "sea": "Where the bomba was born, the beer hall of 1962, and the Poblenou rice house.",
 "vermut": "The house fizz of 1929, a Gràcia bodega of 1954, and the 2007 bar that remade the ritual.",
 "wine": "Three hundred bottles at the Eixample counter, the natural-wine cathedral, and shelf price plus corkage.",
 "granja": "Cacaolat's birthplace, the convents' sweets, and the Modernista pastry shop on the Rambla.",
 "standing": "Four tapas since 1945, a euro glass of cava since 1969, and the bravas worth the climb to Sarrià.",
 "quick": "The 2010 burger pioneer, and the 1970 tortilla room.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the vermut, the counter, the table and the late room.",
  "note": "Le vermut · le comptoir · la table", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: how the city cooks, the markets before ten, the dishes born here, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through at seven: the 1836 rice house that seats hundreds, the seafood counter that takes no bookings at all, and the Poblenou rice terrace. Hours as read on 15 Oct 2026 are on each card — call ahead.",
             "Plan ahead — this week": "Book a few days ahead: the long bar over the open kitchen in the Raval, the elBulli-lineage bistro, and a Bib room in the Eixample.",
             "Plan ahead — the grand night": "The three-star houses: book as soon as the dates are fixed — months ahead, not days — and confirm the day they close."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the Barcelona year: the book and the rose, the summer fires and the festes majors, the national day and the patron saint, and the canelons of Sant Esteve"

# La liste: authored for this pass (the old page had none). Facts from the guide's dish, drink and venue cards.
# (name, say, fav, what, why, where-text, maps query) — finalised in liste.py from the verified venue packs
from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): the eleven old origin articles, rebuilt clean (the old ones carried misplaced gem boxes)
DISH_IDS = ["o-pa-amb-tomaquet", "o-la-bomba-barceloneta", "o-calcots-i-la-calcotada", "o-crema-catalana-crema-de-sa", "o-canelons-de-sant-esteve",
            "o-paella-parellada", "o-fer-el-vermut-the-vermouth", "o-escalivada-i-esqueixada", "o-suquet-de-peix", "o-botifarra-amb-mongetes",
            "o-tapas-vs-pintxos-the-hones"]
DISH_DESC = "Eleven plates and rituals and their honest, often contested, origins: the one detail that separates the real version from the tourist copy."
DISH_TEXT_EDITS = [
 ("The romantic story that its shape and colours evoke", "The popular story that its shape and colours evoke"),
]
DISH_WHERE = {   # one 'Eat it' line per article, kept venues only (refs resolve in the build)
 "o-pa-amb-tomaquet": '<a href="#venue-v11-quimet-quimet">Quimet &amp; Quimet</a>, under the conservas.',
 "o-la-bomba-barceloneta": '<a href="#venue-v12-la-cova-fumada">La Cova Fumada</a>, where it was born.',
 "o-crema-catalana-crema-de-sa": '<a href="#venue-v09-can-culleretes">Can Culleretes</a>, since 1786.',
 "o-canelons-de-sant-esteve": '<a href="#venue-v09-can-culleretes">Can Culleretes</a>, from the house recipe.',
 "o-paella-parellada": '<a href="#venue-v10-7-portes-set-portes">7 Portes</a>, its signature.',
 "o-fer-el-vermut-the-vermouth": '<a href="#venue-vc-bar-bodega-quimet">Bar Bodega Quimet</a> or <a href="#venue-vc-morro-fi">Morro Fi</a>, at noon.',
 "o-suquet-de-peix": '<a href="#venue-v14-els-pescadors">Els Pescadors</a>, Poblenou.',
}


def dish_article(old, aid):
    m = re.search(r'<article[^>]*id="%s"[^>]*>(.*?)</article>' % re.escape(aid), old, re.S)
    name = re.search(r'class="tcard__name-text">(.*?)</span>', m.group(1), re.S).group(1).strip()
    body = re.search(r'<p class="tcard__body">(.*?)</p>', m.group(1), re.S).group(1).strip()
    for a, b in DISH_TEXT_EDITS:
        body = body.replace(a, b)
    where = DISH_WHERE.get(aid)
    return (f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{name}</span></h3>'
            f'<p class="tcard__body">{body}</p>' + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")


def sources_edit(s):
    """the old sources fold: keep the official list, drop the aggregator dump (Yelp/TripAdvisor were evidence of trading, not sources to read)"""
    s = re.sub(r"<li><a href='https://sagradafamilia2026\.org/'[^>]*>.*?</a></li>", "", s)
    s = s.replace("Sónar Festival 2026", "Sónar Festival").replace("Primavera Sound 2026", "Primavera Sound").replace("La Mercè 2026 — bcn.cat", "La Mercè — barcelona.cat")
    j = s.find("Further sources")
    if j > 0:
        a = s.rfind("<p", 0, j); b = s.rindex("</div></details>") if "</div></details>" in s else s.rindex("</div>")
        s = s[:a] + s[b:]
    return s


# gem popups: born-here food origins (the old page had seven gem boxes scattered in the wrong places; rebuilt here)
GEMS = [
 {"id": "gem-pa-amb-tomaquet", "pattern": "pa amb tomàquet", "tag": "Barcelona gem · the table's opening", "name": "Bread rubbed red",
  "story": "Bread, oil and salt are ancient; the tomato is not. It came from the Americas, so the rubbed slice cannot be older than the sixteenth century, and the first written "
           "mention anyone has found is from the 1880s. Thrift is the usual account — late-summer tomatoes pressed into stale bread — and the origin stays undocumented.",
  "where": "Quimet & Quimet in Poble Sec, under the conservas."},
 {"id": "gem-bomba", "pattern": "the bomba", "tag": "Barcelona gem · born here", "name": "The bomba of Barceloneta",
  "story": "A fist of mashed potato round spiced meat, breaded, fried and capped with a red hot sauce and white allioli. The credit goes to María Pla at La Cova Fumada, the unsigned "
           "Barceloneta tavern open since 1944, and the plate is usually dated to the 1950s: cheap fuel for the dock. Every bar in the city copies it now.",
  "where": "La Cova Fumada, Carrer del Baluard, Barceloneta."},
 {"id": "gem-crema-catalana", "pattern": "crema catalana", "tag": "Barcelona gem · the oldest custard", "name": "Burnt cream, or not",
  "story": "Catalans say they got there first, and the books half agree: a cooked custard is in the Sent Soví of the fourteenth century, long before the first French brûlée recipe of "
           "1691. The caramel crust is the open question — the early Catalan versions were not burnt on top. It is also crema de Sant Josep, eaten on 19 March.",
  "where": "Can Culleretes, the city's oldest dining room."},
 {"id": "gem-parellada", "pattern": "arròs Parellada", "tag": "Barcelona gem · born here", "name": "The rice for a man who would not peel",
  "story": "Every prawn shelled, every bone lifted, so the diner touches nothing: the 'lazy man's rice' is said to have been made around 1902 for the Barcelona dandy Juli Maria Parellada. "
           "7 Portes made it its signature; its proprietor from 1942, Paco Parellada, was no relation. The shared name is coincidence.",
  "where": "7 Portes on the Passeig d'Isabel II."},
 {"id": "gem-cacaolat", "pattern": "Cacaolat", "tag": "Barcelona gem · born here", "name": "The chocolate milk of the Raval",
  "story": "The Viader family's granja on Carrer d'en Xuclà, open since 1870, is the reputed birthplace of Cacaolat, the bottled chocolate milk the whole of Spain knows. The room still pours "
           "a spoon-thick hot chocolate under whipped cream, the suizo. The brand left the family long ago; the granja did not.",
  "where": "Granja M. Viader, Carrer d'en Xuclà, Raval."},
 {"id": "gem-panellets", "pattern": "panellets", "tag": "Barcelona gem · All Saints", "name": "Almond for the dead",
  "story": "Little balls of almond paste and sugar rolled in pine nuts and baked, eaten for Tots Sants on 1 November with roast chestnuts and sweet wine. They began as blessed food for "
           "the vigil of the dead, and the Baró de Maldà saw them sold on Barcelona's streets in autumn around 1800. The proverb fixes the season: per Tots Sants, castanyes i panellets.",
  "where": "Escribà on the Rambla, in late October."},
 {"id": "gem-forquilla", "pattern": "esmorzar de forquilla", "tag": "Barcelona gem · the morning", "name": "Breakfast with a fork",
  "story": "Not coffee and a croissant but a real meal at ten: stews, tripe, botifarra and cap-i-pota, with wine from a porró, for farmers, dockers and market porters who had started at dawn. "
           "The name is often pinned on the writer Josep Pla; that is affectionate lore, not record. The city has lately reclaimed it against imported brunch.",
  "where": "The bars inside the markets, mid-morning."},
]

GLOSS = [
 ["pa amb tomàquet", "bread rubbed with ripe tomato, olive oil and salt"],
 ["sofregit", "onion and tomato cooked down slowly: the base of the pot"],
 ["picada", "almonds or hazelnuts, garlic, parsley and fried bread pounded in a mortar, stirred in at the end"],
 ["allioli", "garlic pounded with oil into a thick emulsion"],
 ["romesco", "a sauce of roasted tomato, dried ñora pepper, almonds and hazelnuts"],
 ["mar i muntanya", "'sea and mountain': meat and seafood in one pan"],
 ["suquet", "the Catalan fishermen's fish and potato stew"],
 ["fideuà", "short toasted noodles cooked like a paella in fish stock"],
 ["escalivada", "peppers, aubergine and onion roasted in the embers"],
 ["esqueixada", "raw salt cod torn by hand, with tomato, onion and olives"],
 ["botifarra", "the Catalan fresh pork sausage"],
 ["mongetes", "white beans"],
 ["canelons", "cannelloni stuffed with roast meat, eaten on 26 December"],
 ["calçots", "long sweet spring onions, charred and dipped in romesco"],
 ["calçotada", "the late-winter feast of calçots"],
 ["bomba", "a fried ball of potato round spiced meat, with two sauces"],
 ["bravas", "fried potatoes with a hot sauce"],
 ["montadito", "a small open sandwich on a slice of bread"],
 ["montaditos", "small open sandwiches on slices of bread"],
 ["conservas", "tinned seafood, served straight from the tin"],
 ["tortillitas de camarón", "crisp fritters of tiny shrimp, from Cádiz"],
 ["vermut", "vermouth; 'fer el vermut' is the noon ritual round it"],
 ["fer el vermut", "'to do the vermouth': the late-morning glass with olives and tins"],
 ["vermutería", "a vermouth bar"],
 ["bodega", "a wine shop or cellar bar that pours from the barrel"],
 ["xampanyet", "a light, slightly sweet house sparkling wine"],
 ["cava", "Spanish sparkling wine made by the traditional method, mostly in the Penedès"],
 ["Corpinnat", "the group of Penedès growers who left the Cava appellation in 2019"],
 ["xarel·lo", "the native white grape of the Penedès"],
 ["llicorella", "the black slate soil of the Priorat"],
 ["ratafia", "a Catalan liqueur of green walnuts and herbs"],
 ["granja", "a milk bar: hot chocolate, cream, pastries"],
 ["suizo", "a cup of hot chocolate under whipped cream"],
 ["xocolata", "hot chocolate, thick enough to dip into"],
 ["menú del dia", "the fixed-price weekday lunch: three courses and a drink"],
 ["esmorzar de forquilla", "the mid-morning 'fork breakfast' of stews and sausage"],
 ["panellets", "almond-paste sweets rolled in pine nuts, for All Saints"],
 ["castanyada", "the All Saints chestnut feast"],
 ["Tots Sants", "All Saints, 1 November"],
 ["Sant Esteve", "St Stephen's Day, 26 December"],
 ["Sant Jordi", "St George's Day, 23 April: books and roses"],
 ["Diada", "Catalonia's national day, 11 September"],
 ["La Mercè", "the city's patron-saint festival, late September"],
 ["festa major", "a neighbourhood's or town's main festival"],
 ["castellers", "the teams who build human towers"],
 ["castell", "a human tower"],
 ["sardana", "the Catalan circle dance"],
 ["senyera", "the Catalan flag: four red stripes on gold"],
 ["estelada", "the starred flag of Catalan independence"],
 ["barri", "a neighbourhood"],
 ["Modernisme", "the Catalan art nouveau, about 1888 to 1911"],
 ["Modernista", "of Modernisme, the Catalan art nouveau"],
 ["trencadís", "Gaudí's mosaic of broken tiles"],
 ["xamfrà", "the cut corner of an Eixample block"],
 ["xamfrans", "the cut corners of the Eixample blocks"],
 ["Eixample", "'the extension': Cerdà's nineteenth-century grid"],
 ["rambla", "a dry riverbed turned into a promenade"],
 ["rumba catalana", "the gitano rumba born in Gràcia and the Raval in the 1950s"],
 ["ventilador", "'the fan': the strumming-and-slapping guitar stroke of rumba"],
 ["gitano", "Romani; the Catalan gitanos made the rumba"],
 ["espardenyes", "rope-soled canvas shoes"],
 ["rajola hidràulica", "the pressed cement floor tile of the Modernista flat"],
 ["porró", "a glass wine jug with a long spout, drunk from at arm's length"],
 ["llotja", "an exchange or auction hall; the fish auction"],
 ["masia", "a Catalan farmhouse"],
]
