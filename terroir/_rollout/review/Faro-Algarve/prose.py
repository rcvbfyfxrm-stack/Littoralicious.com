"""Hand-written prose for the Faro-Algarve GOLD6 build (24 Oct 2026). Facts only from the guide (its May 2026 research), the
24 Oct re-check packs in research/, and nothing else. The old page's lead, history, eat, drink and walk blocks are rebuilt here as one
essay (transformed, not pasted); the facts that now have a card of their own (the Arco and its storks, the 1487 book, the 1596 sack and
the Oxford library, tempura, the Sé, the bones, the tuna traps, the dishes) are pointed to, not retold.
The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer, the
calendar, the craft section, the listening room, the swims, Autour, the food-history fold) is written here for the first time."""
import re, html as H

TITLE = "Faro, Algarve — Terroir Guide"
DESC = ("Faro for people who cook: the city market's bifana at nine, the fish hall of Olhão, clams and razor clams from the Ria Formosa, "
        "a cataplana sealed and steamed in its copper, Negra Mole and medronho, and the island lunch across the lagoon — at most three "
        "places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Faro</h1><div class="region">Algarve · Portugal</div><div class="philosophy">"A walled town on a lagoon, '
        'with storks on its gates and the clams of the Ria Formosa under its feet. Most people land here and leave; the ones who stay '
        'eat."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>The Algarve is al-Gharb, “the west” in Arabic; Faro’s own name is still argued.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>For five centuries this coast was the western '
          'edge of the Islamic world, al-Gharb al-Andalus, and the name stayed after 1249. Faro is less certain. One story says it is the '
          'Portuguese for a lighthouse; the more often cited one says it comes from Harune, the family who held the town before the '
          'Reconquest, through a Christian name, Santa Maria de Harune. The Romans called it Ossonoba. The sources argue; the lagoon does not '
          'care.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Faro is the Algarve’s capital and its airport, a walled town on a lagoon that most visitors drive '
        'straight past:</strong> the city market’s bifana in the morning, the fish hall of Olhão, clams and razor clams from the Ria '
        'Formosa, a cataplana sealed in its copper, Negra Mole by the glass and medronho after. <strong>Make or break:</strong> cross the '
        'lagoon once by boat, and eat once in a tasca. <strong>The warning:</strong> a cataplana that arrives open in fifteen minutes is a '
        'stew.</p></div>')

ESSAY_LEDE = ("Faro was a port before it was a town. The Romans called it Ossonoba and shipped fish sauce and amphorae from this "
              "lagoon; at Milreu, ten kilometres inland, a rich man paved his villa with fish in mosaic. The lagoon has fed the place ever since.")
ESSAY = [
 ("", "The Moors held the town from the eighth century until 1249, when Afonso III took it and finished the Portuguese reconquest of the "
      "Algarve; they left the region its name and the town its walls. What happened inside those walls next — a Hebrew book printed in "
      "1487, an English earl who carried the bishop’s library to Oxford in 1596 — has cards of its own, below. What matters at table is "
      "that Faro grew as a market for the lagoon: salt, clams, oysters and fish carried in from the islands and sold at its doors."),
 ("", "The earthquake of 1755 brought down much of the town, and the bishops rebuilt it, which is why the gate you walk through is a "
      "neoclassical arch of 1812 set over an older one. Then came the railway, the canneries along the coast, and, from the 1960s, the "
      "airport and the resorts to the west, which turned the Algarve into a holiday and left Faro to be the place you land."),
 ("The quintessence", "The kitchen is the lagoon and the hills behind it. The Ria Formosa gives clams, cockles, razor clams and oysters; "
      "the boats of Olhão bring sardines, octopus and cuttlefish; the barrocal behind the coast gives almonds, figs, carob and oranges, "
      "and the Serra de Monchique the berries of the strawberry tree. So the canon is short: grilled fish and sardines in summer, clams "
      "with garlic and coriander, a wet rice of razor clams, the cataplana when someone has time, octopus, and a convent sweet of egg and "
      "almond to finish."),
]
HISTORY = [
 "The old town is small — fifteen minutes from one gate to the other — and quiet after dark, when the people who live in it come out "
 "to the Largo da Sé. The life of the town is a few streets north, in the Baixa: the pedestrian Rua de Santo António, the cafés of the "
 "Jardim, the market hall, and the tascas a street back.",
 "The wine nearly died here. The cooperatives of the twentieth century turned the Algarve into a producer of anonymous bulk, the old "
 "grape Negra Mole fell out of favour, and the land went to hotels. The recovery has come one estate at a time; the bottles to ask for "
 "are on the cards at the glass.",
 "And for centuries the richest catch was the one that came past in spring: the bluefin tuna, taken in great net traps off Tavira. That "
 "story is told in full in the fold below.",
]
MONEY = [
 "The money on this coast sits west of Faro, in the resorts and golf estates between Almancil and Albufeira, where the starred kitchens "
 "are. Faro itself lives on the airport, the university and the region’s offices, and its marina menus are written for people waiting "
 "for a flight.",
 "That is the line you can taste. The value is in the market hall before ten, the fish hall of Olhão on a Saturday, a tasca with a "
 "chalk board, the boat across the lagoon to a lunch of grilled fish, and a glass of Negra Mole poured by someone who knows whose vines "
 "it came from.",
]
WHY_NOW_PARA = ("<p>And the clock is the season. From June to September the boats run full, the sardines are grilled in the street and "
                "the beaches fill; from November the island boats go on winter timetables, a few kitchens close until spring, the "
                "stills of Monchique run and the town has its streets to itself. Whoever comes in June gets the sardines and Santo António; "
                "whoever comes in late autumn gets the clams at their best, the first oranges and a lagoon with almost nobody on it.</p>")


def soul_fold():
    """The essay: the old lead, history, eat and drink blocks, rewritten (the Arco, the 1487 book, the 1596 sack, the Sé, the bones,
    the tuna traps and the dishes moved to their own cards) and merged into one read."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A Roman fish port, a Moorish town, a bishop’s city rebuilt after the earthquake, and a lagoon that still feeds it</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}
# exact replacements on the kept venue records' old text fields (the house word list: no "couple", no "for two", no "curated")
VENUE_TEXT_EDITS = [
 ("for two people", "for at least two people"), ("/ two", "to share"), ("for two", "to share"),
 ("romantic", "quiet"), ("Romantic", "Quiet"), ("curated", "chosen"), ("iconic", "best-known"), (" ★ ", " "), ("★", ""),
]

BOUGIE_GO = ('Taste what is left of the catch where the boats still land: the fish hall of the '
             '<a href="#venue-v11-mercado-de-olh-o">Mercado de Olhão</a>, in the morning.')
def bougie(b):
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     f'<div class="sfold__title">{H.escape(b["title"], quote=False)}</div>',
     f'<div class="sfold__desc">{H.escape(b["desc"], quote=False)}</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     f'<p class="gx-lede">{H.escape(b["lede"], quote=False)}</p>'] + [f"<p>{H.escape(p, quote=False)}</p>" for p in b["paras"]]
     + [f"<p>{BOUGIE_GO}</p>", "</div>", "</details>"])

DROP_CARDS = []

FOLDS = {
 "quartiers": {"title": "The town — inside the walls, the Baixa, the marina and the beach", "desc": "The walled old town, the shopping streets and the market north of it, the little marina where the boats leave, and the ocean beach over the bridge",
               "lede": "Faro is small and flat: the old town, the Baixa and the marina are ten minutes end to end. The beach is a bus ride away, past the end of the runway."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "The first book printed in Portugal, the bishop's library that went to Oxford, the fried beans that went to Japan, and the storks on the gate",
                 "lede": "Four stories the town tells about itself, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the markets, the salt and the cellars", "desc": "Where a galley provisions: the city market and the fish hall of Olhão in the morning; then the salt of Tavira, a wine shop, and the cellars and the still further west",
                  "lede": "Shop early: both markets are at their best before ten and closed by early afternoon, and neither trades on Sunday. Bring cash and a cool bag."},
 "walks": {"title": "Walks — the walls and the lagoon", "desc": "Round the old town from gate to gate, and out along the salt pans of the Ludo",
           "lede": "Walk the town at either end of the day and the lagoon at dawn, when the birds are feeding and the light is low."},
 "calas": {"title": "Swims — the barrier islands", "desc": "Three islands across the lagoon: the empty one, the fishermen's one, and Tavira's long beach",
           "lede": "Faro's beaches are islands: a sandbar of dunes between the lagoon and the Atlantic, reached by boat. The ocean side is open water; the lagoon side is calm and shallow."},
 "culture": {"title": "Culture — the cathedral, the bones and the Roman villa", "desc": "The Sé and its tower over the lagoon, the convent museum, a chapel of bones, a theatre in a Jesuit college, and the mosaics of Milreu",
             "lede": "Few rooms, all within a walk but one. The Sé and the museum are inside the walls; the chapel of bones is in the Baixa; Milreu is ten kilometres inland."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one craft of this coast where a named hand teaches, the others and what each is missing, and the honest word on what the shops sell",
           "lede": "The Algarve's crafts are copper, palm, clay and salt; most of the hands that practise them sell rather than teach. The card at the top is the one that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "The old café on the Jardim, the pastelaria on the shopping street, and the garden at the lagoon's edge",
                    "lede": "Faro takes its coffee standing at a counter or sitting under the palms. For an hour of work, the café; for a sweet, the pastelaria; for the evening, the garden."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "Three grapes to ask for by name, the two spirits after dinner, and two places to drink them",
          "lede": "The Algarve makes light reds and fresh whites and distils the rest. Learn three names; then drink them where someone knows the grower."},
 "listening": {"title": "Hi-fi & listening — the room, and the live", "desc": "The honest word on a listening room, and where to hear live music in Faro",
               "lede": "Faro is not a late town. Check the night before you plan round it."},
 "around": {"title": "Autour — the lagoon towns, Loulé and the edge", "desc": "Olhão and Tavira east along the lagoon, Loulé inland, and Sagres where the land runs out"},
 "avoid": {"title": "What to skip", "desc": "The town keeps two versions of itself: what it sells on the marina to people waiting for a plane, and what it cooks two streets back",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the region, the town, the stars, the wine and the lagoon"},
}

GDESC = {
 ("quartiers", "Inside and outside the walls"): "The walled old town, the shopping streets and the market, and the marina where the island boats leave.",
 ("quartiers", "Over the bridge"): "Faro's own ocean beach, on the sandspit past the airport.",
 ("curiosities", "The record, corrected"): "A Hebrew book, an English earl's loot, and a fried bean.",
 ("curiosities", "Birds and stone"): "The gate that is two gates, and the birds that nest on it.",
 ("provisioning", "The morning"): "The city's market hall, and the fish hall of Olhão.",
 ("provisioning", "To carry home"): "Hand-skimmed salt from Tavira, and a wine shop in the Baixa.",
 ("provisioning", "The cellars and the still"): "Two estates that brought back the Algarve's own grapes, and a still in the hills.",
 ("walks", "The town on foot"): "The old town from gate to gate, and the ramparts over the lagoon.",
 ("walks", "The lagoon on foot"): "The salt pans and the birds west of the airport.",
 ("calas", "The barrier islands"): "The empty island, the fishermen's island, and Tavira's.",
 ("culture", "Inside the walls"): "The cathedral and its tower, and the convent that became the museum.",
 ("culture", "Bones, a theatre and a Roman villa"): "A chapel of bones, a theatre in an old college, and a villa paved with fish.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Algarve-made, and is not.",
 ("coffee-gardens", "Three places to sit"): "The old café, the pastelaria, and the garden at the water.",
 ("bars", "Ask for it by name"): "The Algarve's own red, the white that keeps its acid, and the late-ripening white.",
 ("bars", "After dinner"): "The spirit of the strawberry tree, and the marc.",
 ("bars", "Where to pour them"): "A wine bar in the Baixa, and a rooftop over the marina.",
 ("listening", "The listening room"): "Where to hear records properly, honestly checked.",
 ("listening", "Live, the real thing"): "The song of the country, and the town's late room.",
 ("around", "East along the lagoon"): "The fishing port with the market halls, and the river town with the bridge.",
 ("around", "Inland and to the edge"): "The market town in the hills, and the cape at the end of Europe.",
 ("avoid", "On the plate"): "The quick cataplana, the 'local' fish, and the wrong dish at the wrong hour.",
 ("avoid", "On the water"): "The engines in the lagoon.",
 ("follow", "The region"): "The tourist board, the town hall and the guide.",
 ("follow", "The wine and the lagoon"): "The wine commission and the natural park.",
}

TABLES_DESC = ("A tasting menu at Faro's first starred table at one end and a bifana at the market counter at the other: at most three "
               "tables of each kind, picked for what you should not miss here, every card saying when it was last confirmed and when "
               "its season runs.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE TUNA’S STORY", "quarters": "THE TOWN", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "sea": "SWIMS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the tuna’s story, the town, the record corrected, the season", "tables": "",
               "flaner": "the walls and the lagoon, the islands, the cathedral and the bones, the hand, the cup",
               "sortir": "the grapes by name, two places to drink, the live room", "around": "Olhão, Tavira, Loulé, Sagres",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for: Faro's first MICHELIN star, and the two two-star kitchens of the resort coast to the west.",
              "petite": "Where this guide actually lives: tables with a story — an island, a chef, a cellar — and the tascas where Faro eats.",
              "street": "On foot and early: the city market and its bifana, and the fish hall of Olhão."}

LANE_LEAD = {
 "summit": "Faro's first starred kitchen, in the Baixa, and the two two-star dining rooms of the coast to the west, each forty minutes or more by car.",
 "stories": "A solar-powered lunch on an island with no road, a chef who left a star for a smaller room, and a cellar under the old town.",
 "tascas": "Three small rooms in the Baixa: the tasca everyone names, petiscos in a living room, and the long tiled hall of the value bench.",
 "street": "The city's market hall, the fish hall of Olhão, and the bifana counter inside the first.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the glass, the table, the late walk.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the tuna traps of Tavira, the two markets in the morning, the dishes of the lagoon, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {}   # set after the 24 Oct re-check (below, from picks_lists.json's reasons)

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the town’s year: the saints and the book fair in spring, the lagoon and the music in summer, the fair and the stills in autumn"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

DISH_DESC = "Eight plates and their honest passports: which are the lagoon’s own, which the coast shares, and which the convents and the rest of the country sent in."
from liste import DISHES   # noqa: E402


def dish_articles(old):
    """The Dish: eight articles rebuilt from the old guide's dish fold and #eat prose (see liste.DISHES)."""
    from liste import DISH_WHERE as W
    tr = str.maketrans({"ã": "a", "á": "a", "â": "a", "à": "a", "ç": "c", "é": "e", "ê": "e", "í": "i", "ó": "o", "ô": "o", "õ": "o", "ú": "u", "Ê": "e"})
    out = []
    for name, body, origin in DISHES:
        aid = "o-" + re.sub(r"[^a-z0-9]+", "-", name.lower().translate(tr)).strip("-")[:28]
        where = W.get(name)
        out.append(f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{name}</span></h3>'
                   f'<p class="tcard__body">{H.escape(body, quote=False)} <b>Origin.</b> {H.escape(origin, quote=False)}</p>'
                   + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")
    assert len(out) == 8, len(out)
    return "".join(out)


DROP_HOSTS = ("facebook.com", "instagram.com", "tripadvisor.")
def sources_edit(s):
    """the old sources fold: one plain list with single-quoted hrefs; rebuilt as one clean list (the re-check's own sources are added after)."""
    pairs = []
    for u, lab in re.findall(r"""<a href=['"](https://[^'"]+)['"][^>]*>(.*?)</a>""", s):
        u = H.unescape(u)
        if u not in [p[0] for p in pairs] and not any(h in u for h in DROP_HOSTS): pairs.append((u, H.unescape(lab)))
    lst = "<ul class='gx-list'>" + "".join(f'<li><a href="{H.escape(u, quote=True)}" target="_blank" rel="noopener">{H.escape(l, quote=False)}</a></li>' for u, l in pairs) + "</ul>"
    s = s.replace('<div class="sfold__desc">Links we checked.</div>', '<div class="sfold__desc">Where every fact came from, and when it was last checked</div>')
    i = s.index('<div class="sfold__body">') + len('<div class="sfold__body">')
    j = s.index('<p style="font-size:0.82em')
    raw = s[j:s.index("</p>", j) + 4]
    return s[:i] + lst + raw + "</div></details>"


from liste import GEMS   # noqa: E402

GLOSS = [
 ["tasca", "a small, plain family restaurant or tavern"],
 ["tascas", "small, plain family restaurants"],
 ["petiscos", "small plates to share, the Portuguese answer to tapas"],
 ["cataplana", "the hinged copper pot, sealed and steamed; and the dish cooked in it"],
 ["amêijoas", "clams"],
 ["amêijoa", "clam"],
 ["lingueirão", "the razor clam of the lagoon"],
 ["conquilhas", "wedge clams from the ocean beaches"],
 ["choco", "cuttlefish"],
 ["polvo", "octopus"],
 ["sardinhas", "sardines"],
 ["bifana", "a roll of thin pork steak marinated in wine and garlic"],
 ["papo-seco", "the small crusty white roll of Portugal"],
 ["peixinhos da horta", "‘little fish from the garden’: green beans fried in batter"],
 ["Bulhão Pato", "the 19th-century poet whose name a clam dish carries"],
 ["Dom Rodrigo", "the Algarve's egg-yolk and almond sweet in twisted foil"],
 ["doce fino", "marzipan of almond, shaped as fruit"],
 ["flor de sal", "the fine crust of salt skimmed by hand from the top of the pans"],
 ["salinas", "salt pans"],
 ["medronho", "the spirit distilled from the fruit of the strawberry tree"],
 ["bagaceira", "pomace brandy, the Portuguese marc"],
 ["Negra Mole", "the old red grape of the Algarve: pale, soft, fresh"],
 ["Arinto", "a white grape that keeps its acid in the heat"],
 ["Crato Branco", "the Algarve's name for the white grape Síria"],
 ["Síria", "a white grape of southern Portugal, called Crato Branco here"],
 ["Ria Formosa", "the lagoon behind Faro's barrier islands"],
 ["ria", "a coastal lagoon or estuary"],
 ["barrocal", "the limestone belt of orchards between the coast and the hills"],
 ["serra", "the hills; here the Serra de Monchique"],
 ["Cidade Velha", "the old town inside the walls"],
 ["Baixa", "the lower, newer town; the shopping streets"],
 ["largo", "a small square"],
 ["Sé", "the cathedral"],
 ["azulejos", "glazed and painted tiles"],
 ["calçada", "the black-and-white stone paving of Portuguese streets"],
 ["armação", "a fixed net trap for tuna; the fishing camp that worked it"],
 ["almadraba", "the Spanish and Arabic word for a tuna trap"],
 ["empreita", "dwarf-palm weaving of the Algarve hills"],
 ["Algarvio", "of the Algarve"],
 ["fado", "the sung lament of Lisbon and Coimbra"],
 ["mercado", "a market"],
 ["marisqueira", "a seafood restaurant"],
 ["levante", "the warm east wind"],
 ["São Martinho", "St Martin's Day, 11 November: chestnuts and the new wine"],
]
