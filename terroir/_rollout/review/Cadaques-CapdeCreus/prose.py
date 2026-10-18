"""Hand-written prose for the Cadaques-CapdeCreus GOLD6 build (18 Oct 2026). Facts only from the guide (its June 2026 research), the
18 Oct re-check packs in research/, and nothing else. The old page was a GOLD2 tier inventory: a long lead, a soul block, a history
fold, a why-now fold, 'what to eat' and 'what to drink' essays, a 'where the money sits' block, three overlapping table inventories
and the elBulli story. The essay is rebuilt here from the lead, soul, history and money blocks (transformed, not pasted); the facts
that now have a card of their own (the schist, the salted Catalan, the monks' fish, the raids, the smugglers, the colony, the
house at Portlligat) are pointed to, not retold. The GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with
The Dish, the hot board and its pointer, the calendar, the craft section, the listening room, Autour) is written here for the first time."""
import re, html as H

TITLE = "Cadaqués · Cap de Creus — Terroir Guide"
DESC = ("Cadaqués for people who cook: the elBulli line on the Riera, the sung menu at Casa Anita, the sea urchin of the winter rocks "
        "and the anchovy of L'Escala, Garnatxa on slate, Dalí's house at Portlligat, the cape, the coves and the camí de ronda — "
        "at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Cadaqués</h1><div class="region">Cap de Creus · Alt Empordà · Catalunya</div><div class="philosophy">'
        '"A white fishing village on grey schist at the wind-end of Spain, where the tramuntana files the rock into Dalí’s shapes and the sea '
        'gives up anchovies in spring and urchins in winter."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>From the Catalan <strong>Cap de quers</strong>, the cape of crags — or, some say, from the '
          'prickly juniper of the slopes.</em><div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>Quer is an old word '
          'for a rock or a crag, and medieval charters write the village Cadaqués and Cadaquers side by side from the eleventh century. A rival '
          'reading hears càdec, the prickly juniper that grows on the schist. Neither has won; both describe the place.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Cadaqués is a fishing village at the end of a bad road, and that is the whole secret:</strong> '
        'cut off by land for centuries, it kept its own Catalan, its own fish and a light that drew a century of painters. '
        '<strong>Make or break:</strong> book the Casa-Museu Dalí slot and the grand-night table before you come, and come in the shoulder '
        'season — late May to June, or September and October. <strong>The warning:</strong> the tramuntana decides the sea. Check the wind '
        'the night before any boat or cape day, and never drive the one road in during August.</p></div>')

ESSAY_LEDE = ("Cadaqués is a white village stacked on grey schist at the easternmost edge of the Iberian Peninsula, where the Pyrenees run "
              "into the sea. For most of its history the only ways in were by boat or a mule track over the Pení, and that isolation kept "
              "three things alive: an old Catalan still spoken in its lanes, a long habit of contraband, and a light so hard and clear that "
              "the painters of a century came down one bad road to paint it.")
ESSAY = [
 ("", "The wind made the village. The tramuntana, the dry north wind off the mountains, scours the cape and the bay, bends the olive "
      "terraces and files the folded rock into the shapes Dalí copied; the houses answer it with thick white walls turned away from the "
      "gale. Beauty here is not soft. It is earned against the wind, and what lasts is whatever learns to turn its back to it."),
 ("", "Then a single family changed the guest list. The Pichots of Cadaqués brought Picasso for the summer of 1910, and their canvases "
      "showed a local boy named Salvador Dalí what painting could do; he made his life at Portlligat, over the hill. Marcel Duchamp came "
      "back every summer from 1958 until his death in 1968, to see the Dalís and to play chess at a café on the front — the quietest "
      "celebrity the village ever had. The rest of the story, from Lorca to the summer of 1929, is on the colony’s card."),
 ("The quintessence", "On a still summer night the havaneres are sung by the water and a clay pot of cremat — dark rum set alight with "
      "coffee, sugar and cinnamon — goes round the table. That flame, and the anchovy cured down the coast, are the village reminding "
      "you that it was a fishing port long before it was a painter’s shrine."),
]
HISTORY = [
 "Everything grew on the rock. The cape is the last knuckle of the Pyrenees, a schist far older than the animals with shells, and the "
 "village lived off the sea below it: the monks of Sant Pere de Rodes bought its fisheries in the eleventh century, corsairs burned it, "
 "and contraband with France kept it fed. The curiosities below have the dates.",
 "The table answers the rock. Violet sea urchins prised from the schist in the cold months, the anchovy salted at L’Escala since the "
 "Greeks, the fishermen’s suquet bound with a picada of almonds and saffron — and half an hour over the headland, at Cala Montjoi, the "
 "kitchen that rewired modern cooking, told just below. Its afterlife cooks on the Riera at Compartir.",
]
MONEY = [
 "Cadaqués runs on summer. The Dalí pilgrimage to Portlligat and the August crowd fund the year; the fishing fleet that once salted "
 "the anchovy is a shadow of what it was, and out of season the village shrinks back towards its residents.",
 "So the tables on the front are priced for visitors, and the honest value sits one street back: the family houses that never moved "
 "with the market, the anchovy bought from the salters, the day-boat catch that rarely reaches a printed menu in August. A chef "
 "provisioning here spends on the cured anchovy and the wine of the slate hills, and wastes money on a harbourside platter in high "
 "season. In October the prices, and the cooking, tell the truth again.",
]
WHY_NOW_PARA = ("<p>And the clock is the season and the wind. The terraces fill from Easter and thin from late October; the sea urchin "
                "comes in with the cold; the tramuntana blows hardest from late autumn to spring. Whoever comes in May, June, September "
                "or October gets the swim, the open kitchens and a road that moves.</p>")


def soul_fold(soul, history, money):
    """The essay: the old lead, soul, history and money blocks, rewritten with their facts and merged into one read; the geology,
    the salted Catalan, the monks, the raids, the smugglers, the colony and the house have cards of their own."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A white village against the wind, a family of painters, a cove that changed cooking, '
                      'and what the summer pays for</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"soul": [], "history": [], "money-sits": [], "seasonal": [], "tables": [], "why-now": [], "bougie": [], "sources": []}

# The food-history callout (#bougie): the old elBulli fold, kept with its facts, closed by default, one inconsistency fixed
# (the old last line said 'fifteen minutes from where it began' after a lede of 'half an hour over the headland').
GV_LINE = ('The museum on the cove keeps a season and a timed ticket: its card is under Autour. The table on the bay is '
           '<a href="#venue-v01-compartir-cadaques">Compartir</a>, in the grand lane.')
def bougie(old, go_line):
    paras = re.findall(r"<p[^>]*>(.*?)</p>", old, re.S)
    lede, p1, p2 = paras[0], paras[1], paras[2]
    p2 = p2.replace("fifteen minutes from where it began", "half an hour from where it began")
    p2 = re.sub(r'<a href="#venue-v01-compartir-cadaques"[^>]*>Compartir</a>', "Compartir", p2)
    p3 = "Adrià’s rule travelled with them: technique in the service of the product in front of you. " + go_line
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     '<div class="sfold__title">elBulli — the cove that changed cooking</div>',
     '<div class="sfold__desc">Half an hour over the headland, a kitchen at Cala Montjoi rewired what food could be — and its afterlife cooks on the Riera</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     f'<p class="gx-lede">{lede}</p>', f"<p>{p1}</p>", f"<p>{p2}</p>", f"<p>{p3}</p>", "</div>", "</details>"])

DROP_CARDS = []

FOLDS = {
 "quartiers": {"title": "The quarters — the white town, the bay and Portlligat", "desc": "Six places in three rings: the schist lanes up to the church, the front and the dry riverbed, the coves along the bay, and the hamlet over the hill",
               "lede": "Cadaqués reads as one white crescent round its bay, climbing from the water up lanes of slate set on edge to the church. Everything is on foot; only Portlligat over the rise and the cape, further east, need a walk or a wheel."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "A rock older than shells, the wind that built the houses, the salted Catalan, the monks’ fish, the raids and the contraband",
                 "lede": "Six things the village’s own story tells slightly wrong, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the market, the salt, the oil and the wine on slate", "desc": "Where a galley provisions: the Monday market on the Riera, the anchovy salters of L’Escala, the oil co-operative, and three estates on the slate",
                  "lede": "Shop the market in the morning. The anchovy comes from L’Escala, the oil and much of the wine from the Empordà plain behind the hills; the estates receive by appointment, so book before you drive."},
 "walks": {"title": "Walks — the bay, the hermitage and the cape", "desc": "Five routes: the camí de ronda to the little lighthouse, the climb to Sant Sebastià, the old path to the cape, the lighthouse cove and the long ridge to El Port de la Selva",
           "lede": "Walk early or late, carry water, and turn back on a hard tramuntana day: the cape has no shade and the wind on the headland can knock you sideways."},
 "calas": {"title": "The coves — the village water and the cape", "desc": "The town beach, the islet with the footbridge and the festival cove; Portlligat’s boats, a quiet bay on the cape road and the pocket under the lighthouse",
           "lede": "The water is clear and the beaches are pebble and schist, not sand: bring sea shoes. The village coves are a short walk; the cape ones a drive and a scramble."},
 "culture": {"title": "Culture — Dalí, the church and the cape", "desc": "The house at Portlligat, the town’s own gallery and the colony; the fishermen’s altarpiece and the graves above the sea; the lighthouse and the rock explained",
             "lede": "The house at Portlligat is timed entry only: book it before anything else. The church and the cemetery are free; the cape’s centre keeps a season."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one workshop where you can learn from a named hand, the others and what each is missing, and the honest word on what is sold as local",
           "lede": "This corner of the Empordà works in clay, stone and wood — but most of its hands sell rather than teach. The card at the top is the one that does both."},
 "coffee-gardens": {"title": "Rooms to linger", "desc": "Breakfast by the water, Dalí’s bar by day, and the rock the village is named for",
                    "lede": "The coffee is ordinary everywhere; the point is the hour and the view. Sit on the front in the morning, before the boats go out."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The reds and whites of the slate to ask for by name, the sweet Garnatxa, and the two glasses of after dinner",
          "lede": "The Empordà drinks Garnatxa and Carinyena grown on slate, a sweet Garnatxa with dessert, and burns rum on summer nights. The bars themselves are in the tables, under Le Bar."},
 "listening": {"title": "Hi-fi & listening — the honest answer and the live music", "desc": "No listening bar here, said plainly, and the late bar the coast law closed; then the festival of 1970, the havaneres and the big stage down the coast",
               "lede": "Cadaqués listens in a church and on the front, not in a club. Check the night’s programme before you go."},
 "around": {"title": "Autour — over the headland and down the gulf", "desc": "The Dalí triangle inland, elBulli’s cove and the monastery on the mountain, and the Greek city of the anchovy coast"},
 "avoid": {"title": "What to skip", "desc": "The village punishes improvisation in summer: the one road, the cape road, the wind and the house that only takes bookings",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the wind forecast, the natural park, the town hall, the Dalí foundation and the festival"},
}

GDESC = {
 ("quartiers", "The white town"): "The slate lanes up to the church, the front where the village meets the bay, and the dry riverbed that carries the market and the cars.",
 ("quartiers", "Along the bay"): "The little shore of boats the teenage Dalí painted, and the twin rock beaches where his family spent its summers.",
 ("quartiers", "Over the hill"): "The fishermen’s cove where Dalí made his house.",
 ("curiosities", "The rock, the wind, the tongue"): "Why the cape looks the way it does, the wind that decides every day, and the Catalan that kept its old articles.",
 ("curiosities", "Monks, corsairs and contraband"): "Who owned the fish, who burned the town, and what a cut-off village lived on.",
 ("provisioning", "The market and the salt"): "The weekly market on the Riera, the two salting houses of L’Escala, and the oil of the old groves of Pau.",
 ("provisioning", "The wine on the slate"): "The estate inside the natural park, the biodynamic valley of La Selva de Mar, and the big house of Vilajuïga.",
 ("walks", "Round the bay"): "The coast path to the little lighthouse, and the climb to the hermitage over the bay.",
 ("walks", "To the cape"): "The old path to the easternmost lighthouse, the cove beneath it, and the long ridge to the next bay.",
 ("calas", "The village water"): "The town beach, the islet with its footbridge, and the cove of the festival.",
 ("calas", "Out towards the cape"): "The boats of Portlligat, a quiet bay on the cape road, and the pocket of sand under the lighthouse.",
 ("culture", "Dalí and the colony"): "The house he built from fishermen’s huts, the village’s own gallery, and why everyone came.",
 ("culture", "The church and the dead"): "The gilded altarpiece the fishermen paid for, and the graves that look at the sea.",
 ("culture", "The cape"): "The lighthouse at the edge of Spain, and the centre that reads the rock.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as local-made, and is not.",
 ("coffee-gardens", "Coffee and a view"): "The beach bar at breakfast, Dalí’s bar by day, and the cone of rock on the bay.",
 ("bars", "Ask for it by name"): "The two black grapes of the slate, the pale Garnatxas, and the sweet one.",
 ("bars", "After dinner"): "Rum set alight, and the green-walnut liqueur of the farmhouse.",
 ("listening", "The listening room, honestly"): "No hi-fi bar here, and the late room the coastal law shut.",
 ("listening", "Live"): "The festival of 1970, the sea songs of the havaneres, and the big summer stage down the coast.",
 ("around", "The Dalí triangle"): "The theatre-museum at Figueres and the castle he gave to Gala.",
 ("around", "Over the headland"): "elBulli’s cove, now a museum, and the monastery that owned the village’s fish.",
 ("around", "Down the gulf"): "The Greek and Roman city, and the anchovy town beside it.",
 ("avoid", "The road and the season"): "August on the one road in, and the cape road in summer.",
 ("avoid", "The wind and the house"): "A boat day without the forecast, and Portlligat without a booked slot.",
 ("follow", "The wind and the road"): "The wind forecast, the natural park, and the town hall.",
 ("follow", "The house and the music"): "The Dalí foundation, and the music festival.",
}

TABLES_DESC = ("The elBulli line on the Riera at one end and a beach bar of 1935 at the other: at most three tables of each kind, "
               "picked for what you should not miss in Cadaqués, every card saying when it was last confirmed and when its season runs.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE ELBULLI STORY", "towns": "THE QUARTERS", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "sea": "COVES & SWIMS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "WINE & GLASSES", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the elBulli story, the quarters, the record corrected, the season", "tables": "",
               "flaner": "the bay and the cape on foot, the coves, Dalí and the church, the hand, a coffee with a view",
               "sortir": "the wines of the slate by name, the after-dinner glasses, the festival and the songs", "around": "the Dalí triangle, elBulli’s cove, the monastery, the Greek city",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "Le Bar — the rooms with a story"}
GROUP_DESC = {"grande": "The tables you clear an evening for, and book ahead: the elBulli alumni on the Riera, the oysters at the water’s edge, and the house in the sea wall.",
              "petite": "Where this guide actually lives: the family houses with a date over the door, the fish kitchens one street back, and the tables on the beach, up the hill and out at the cape.",
              "street": "A drink, a plate and a story: the beach bar of 1935, the bar Dalí drew the logo for, and the late glass on the front."}

LANE_LEAD = {
 "elbulli": "elBulli’s three head chefs on the Riera, flamed oysters at the waterline, and the house built into the sea wall in 1967.",
 "houses": "The sung menu at shared tables, the boat-to-pot rice of the Passeig, and the lobster rice of the Portitxó square.",
 "back": "Scorpionfish and winter urchins in a back lane, paella without the view, and grills in an old-town room.",
 "edge": "Rice on the beach, a terrace under olive trees above the harbour, and curry at the easternmost point of Spain.",
 "bars": "The beach bar where Dalí landed for a cremat, the bar whose logo he drew, and the late gin on the front.",
}
LANE_STORY = {}   # drafted by the venue pack (research/verify_1.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the drink, the table, the late glass.",
  "note": "Le verre · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the cove that changed cooking, the market and the salters, the dishes of the rock, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "@@",
             "Plan ahead — this week": "@@",
             "Plan ahead — the grand night": "@@"}   # written in fixes.py from what the 18 Oct re-check found

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the Cadaqués year: the urchin and the saint in winter, the music, the fishermen and the songs in summer, the festa, the harvest and the anchovy in autumn"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): the old guide's seven dish articles, rewritten — the Compartir article folded into its venue
# (told once), es niu kept honest as a dish of the Baix Empordà, the cremat added from the drink essay's facts.
DISH_DESC = "Seven plates and a glass, with their honest passports: what the rock gives, what the coast claims, and what belongs further south."
DISHES = [
 ("Garotes", "The violet sea urchin clamped to the schist, called garota in the Alt Empordà and garoïna further south. The shell is cut open across the mouth side, the dark insides rinsed out, and the five orange tongues of roe eaten raw on bread with a spoon — or folded into eggs as ous amb garotes. A cold-month harvest, when the roe is full.", "The rocks of Cap de Creus and the whole Costa Brava"),
 ("Anxoves de l'Escala", "Anchovy packed in salt for months and filleted by hand, never cooked: desalted briefly and dressed with Empordà oil, eaten on toast. The salting trade at L’Escala is traced to the Greeks of Empúries; two family houses still cure under the town’s quality mark.", "L’Escala, forty kilometres down the coast"),
 ("Suquet de peix", "The fishermen’s stew: the day’s rockfish and potatoes over a slow sofregit of onion and tomato, finished in the last minutes with a picada of toasted almonds, garlic, fried bread, parsley and saffron pounded in the mortar — the picada thickens and seasons at once.", "Claimed by the Empordà and by Tarragona"),
 ("Arròs negre", "Rice blackened by cuttlefish ink and by an onion sofregit cooked almost to burning, in an earthenware cassola, served with allioli. The Empordà’s flagship rice; the textbook version is from the Baix Empordà.", "The Empordà"),
 ("Peix de roca", "Scorpionfish, bream, John Dory and the small fish that live in the slate, griddled or baked whole with oil, garlic and parsley so the firmness of a line-caught fish carries the plate. Priced by weight; ask what came in.", "Cadaqués, catch-dependent"),
 ("Es niu", "A five-hour winter stew of cod tripe, stockfish, hard egg and potato over a long sofregit, later with cuttlefish and game birds: a Lenten fishermen’s dish of the cork country. It belongs to Palafrugell, not to Cadaqués, but it is the same coast’s winter table.", "Palafrugell, Baix Empordà — not a Cadaqués dish"),
 ("Cremat", "Dark rum heated in a clay pot with sugar, cinnamon, lemon peel and coffee beans, set alight and stirred until about a third of the alcohol has burned away, then doused with coffee and served hot. It came home with the Catalan traders of the Cuba run.", "The Costa Brava; heartland Calella de Palafrugell"),
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
    """The old sources fold was clean (16 links); only its list class changes to the chrome's."""
    s = s.replace('<ul class="sources">', "<ul class='gx-list'>", 1)
    s = s.replace('<div class="sfold__desc">Official &amp; primary, no tourist press</div>',
                  '<div class="sfold__desc">Official and primary first; the October 2026 re-check below</div>', 1)
    return s


# gem popups: born-here food origins (each kept to what the old research says)
GEMS = [
 {"id": "gem-anxova", "pattern": "anchovy", "tag": "Empordà gem · born here", "name": "Salt since the Greeks",
  "story": "The Greeks who landed at Empúries in the sixth century BC salted fish on this shore, and L’Escala never stopped: the town’s salt "
           "warehouse, the Alfolí de la Sal, was finished in 1697, and two family houses — Callol i Serrats, founded 1847, and Solés, 1888 — "
           "still pack the anchovy in salt for months and fillet it by hand.",
  "where": "The salters’ own shops in L’Escala; on the larder card."},
 {"id": "gem-cremat", "pattern": "cremat", "tag": "Coast gem · born here", "name": "Rum from the Cuba run",
  "story": "Catalan traders working the Cuba run in the nineteenth century brought home dark rum and the songs of the havana, the havaneres. "
           "Set alight in a clay pot with coffee and cinnamon, the rum became the coast’s own drink, and the songs its own music; the two "
           "still travel together on summer nights.",
  "where": "Summer havaneres nights on the front; the beach bar of 1935 pours it."},
 {"id": "gem-suquet", "pattern": "suquet", "tag": "Coast gem · disputed", "name": "The fishermen’s pot",
  "story": "Suquet comes from suc, juice: the fishermen cooked what they could not sell with potatoes in a little water and oil, and the "
           "picada of almonds and saffron came later. Both the Empordà and Tarragona claim it, and neither can prove it.",
  "where": "The family houses and the sea-wall house, in the tables."},
]

GLOSS = [
 ["tramuntana", "the dry, cold north wind off the Pyrenees, often over 100 km/h on the cape"],
 ["parlar salat", "the ‘salted’ Catalan that uses the articles sa and es"],
 ["garota", "the violet sea urchin of the Alt Empordà rocks"],
 ["garotes", "sea urchins, eaten raw in the cold months"],
 ["garoïna", "the sea urchin, as it is called further south"],
 ["suquet", "the fishermen’s fish-and-potato stew"],
 ["picada", "a pounded paste of almonds, garlic, bread and herbs that finishes a dish"],
 ["sofregit", "onion and tomato cooked slowly in oil, the base of the pot"],
 ["allioli", "garlic pounded with olive oil"],
 ["arròs negre", "black rice, coloured with cuttlefish ink"],
 ["fideuà", "short noodles cooked like a paella"],
 ["peix de roca", "rockfish: scorpionfish and the small fish of the reef"],
 ["anxova", "anchovy"],
 ["anxoves", "anchovies"],
 ["cremat", "rum set alight with sugar, coffee and cinnamon"],
 ["havaneres", "Cuban-rooted sea songs of the Catalan coast"],
 ["ratafia", "green-walnut and herb liqueur"],
 ["vi dolç", "sweet wine"],
 ["Garnatxa", "Grenache, the main grape of the Empordà"],
 ["Carinyena", "Carignan, the Empordà’s other black grape"],
 ["Samsó", "the Empordà name for Carinyena"],
 ["lledoner", "the Empordà name for Garnatxa"],
 ["llicorella", "slate soil"],
 ["celler", "a winery, a cellar"],
 ["verema", "the grape harvest"],
 ["camí de ronda", "the old coastal guard path"],
 ["Camí de Ronda", "the old coastal guard path"],
 ["cala", "a cove"],
 ["platja", "a beach"],
 ["riera", "a seasonal stream bed, dry most of the year"],
 ["rastell", "paving of slate slabs set on edge"],
 ["ermita", "a hermitage chapel"],
 ["aplec", "a gathering and pilgrimage at a chapel"],
 ["sardana", "the Catalan circle dance"],
 ["sardanes", "Catalan circle dances"],
 ["cobla", "the band that plays for the sardana"],
 ["festa major", "the village’s main annual festival"],
 ["Festa Major", "the village’s main annual festival"],
 ["retaule", "an altarpiece"],
 ["barraca", "a fisherman’s hut"],
 ["pedra seca", "dry-stone walling"],
 ["Ajuntament", "the town hall"],
 ["mirador", "a viewpoint"],
 ["Repsol", "the Spanish restaurant guide that awards Soles, suns"],
 ["Soles", "the suns of the Repsol guide, one to three"],
 ["castanyada", "the All Saints’ chestnut feast"],
 ["panellets", "almond-and-pine-nut sweets of All Saints"],
]
