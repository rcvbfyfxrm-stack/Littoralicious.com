"""Hand-written prose for the Cavalaire-sur-Mer GOLD6 build (21 Oct 2026). Facts only from the guide (its July 2026 research), the
21 Oct re-check packs in research/, and nothing else. The old page's soul, story and 'where the money sits' blocks are rebuilt here
as one essay (transformed, not pasted); the facts that now have a card of their own (the landing, the port's Roman name, the railway,
the wrecks, the tuna traps, the Domaine du Rayol, the three capes, the Cru Classé) are pointed to, not retold.
The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer,
the calendar, the craft section, the listening room, the coves, Autour, the food-history fold) is written here for the first time."""
import re, html as H

TITLE = "Cavalaire-sur-Mer — Terroir Guide"
DESC = ("Cavalaire-sur-Mer for people who cook: the fishermen's stand on the quay and the Wednesday market, the soupe de roche and the "
        "bouillabaisse you order the day before, Gigaro's sand tables, the Cru Classé rosé grown above the sea, the three capes on foot and "
        "the garden of the Rayol — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Cavalaire-sur-Mer</h1><div class="region">Var · Provence-Alpes-Côte d’Azur · France</div><div class="philosophy">"The family '
        'end of the Saint-Tropez peninsula: a bay held between two capes, a fishing quay that still sells off the boat, and the wildest coast of the gulf '
        'a walk away."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Older than Latin, and still argued over: the Antonine Itinerary calls the anchorage Heraclea Caccabaria.</em>'
          '<div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The Roman road-book of the third century lists a staging post '
          'called Heraclea Caccabaria on this coast. The national heritage inventory reads Cavalaire as a pre-Latin place name and suggests the scribes '
          'bent it towards a better-known Caccabaria in North Africa; others prefer a Greek or even Phoenician origin. Nobody has settled it, '
          'and this guide does not pretend to.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Cavalaire is the un-chic end of the Saint-Tropez peninsula, and that is its use:</strong> a family resort at the '
        'bottom of its own bay, with a working quay and the wild capes next door. <strong>Make or break:</strong> be on the port by ten for the boats, '
        'and phone Maurin des Maures the day before for its bouillabaisse. <strong>The warning:</strong> from mid-October most beach tables are shut '
        'and in August the one coast road jams — take the coast path, not the car.</p></div>')

ESSAY_LEDE = ("Cavalaire sits at the bottom of its own bay on the southern shoulder of the Saint-Tropez peninsula, halfway between Le Lavandou and "
              "Saint-Tropez. Two capes hold the water, Cap Cavalaire to the west and Cap Lardier to the east, and behind the town the first ridges of "
              "the Maures climb past five hundred metres and break the mistral, so the bay stays warm and calm.")
ESSAY = [
 ("", "It faces the sea and turns its back on the mountain: a long arc of fine sand, a marina of some eleven hundred berths, and a grid of low "
      "apartment blocks and campsites that empties in winter and fills many times over in July. About eight thousand people live here all year."),
 ("", "Be honest about what it is not. There is no Byblos here, no Bardot legend, no paparazzi on the quay: that theatre plays twenty minutes north, "
      "over the capes. Cavalaire is the affordable, family-and-caravan sibling, a town that lives frankly off its beaches. Its beauty is borrowed and "
      "real at once — the protected coast of Cap Lardier and the Gigaro coves begins where the last beach bar ends."),
 ("The quintessence", "The truest ritual is small and daily: the boats coming back into Port Héraclea mid-morning and selling the night’s catch "
      "off the quay. On Wednesday mornings, all year, the Provençal market fills the Place Jean Moulin. And in the evening the same town pours a cold, "
      "pale Côtes de Provence on the port while the light goes copper over the Maures."),
]
HISTORY = [
 "The bay was a sheltered anchorage long before it was a town, which is why the port carries a Roman name; its own card says which. Under Rome the "
 "coastal estates here made wine and shipped it, and at Pardigon, on the eastern edge of the bay, the villas still lie under the grass.",
 "Then, for close to a thousand years, the shore emptied. Visigoths, Ostrogoths, Saracen raiders and later corsairs made the coast too dangerous to "
 "live on, and people kept to the fortified hills — Gassin, Ramatuelle — while the bay was worked by fishing boats and little else. Medieval Cavalaire "
 "belonged to the monks of Pignans, then from the fifteenth century to the Castellane.",
 "The modern town is astonishingly young. The railway brought the first villas and bathers, the commune was cut out of Gassin in 1929, and after the "
 "war — this bay was a landing beach in August 1944, the card under Culture tells it — tourism finished what the trains began: classified a seaside "
 "resort in 1956, a Station de Tourisme in 2013.",
]
MONEY = [
 "Cavalaire runs on two engines, and both point at the summer. One is the beach in the narrow sense: the long sand, the water-sports bases and the "
 "beach restaurants that sell grilled fish and a carafe of rosé at seafront prices for a few weeks a year. The other is the marina, run by a public "
 "company, which sells moorings, chandlery, diving and day charters to the same seasonal tide.",
 "The housing tells the rest. Property portals put second homes at roughly two-thirds of the town’s dwellings (seen Jul 2026) — a town largely owned "
 "by people who sleep in it a few weeks a year. That is the line a visitor can taste: the beach-club terrace against where the town itself eats. "
 "The value is at the quay in the morning, at the Wednesday market, and in the bottle: a good pale Côtes de Provence bought from the estate costs a "
 "fraction of the same glass with a sea view.",
]
WHY_NOW_PARA = ("<p>And the clock is the season. The beach tables and the hotel dining rooms open in spring and close in October; the paths, the "
                "market, the quay and the garden of the Rayol run all year. Whoever comes in late May, June or September gets warm water and a town "
                "that is still a town; whoever comes in winter gets the capes to themselves.</p>")


def soul_fold():
    """The essay: the old soul, story and 'where the money sits' blocks, rewritten with their facts (the landing, the Roman name, the railway
    and the capes moved to their own cards) and merged into one read."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A bay between two capes, a thousand years of empty shore, a town born in 1929, and the summer that pays for it</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}
# exact replacements on the kept venue records' old text fields (the house word list: no "couple", no "for two", no "curated")
VENUE_TEXT_EDITS = [
 ("where the couple's own story began", "where Arthur and Sarah's own story began"),
 ("the couple's own story", "Arthur and Sarah's own story"),
 ("€76.50 for two per Pudlowski", "€76.50 for a pot serving two, per Pudlowski"),
 ("€76.50 for two is Pudlowski's", "€76.50 for a pot serving two is Pudlowski's"),
 ("Bouillabaisse du pêcheur pour deux, à commander la veille", "Bouillabaisse du pêcheur, served for at least two people, à commander la veille"),
 ("curated-journalism review", "critics' review"), ("curated-press feature", "press feature"),
 ("the curated travel blog Little Weekends", "the travel blog Little Weekends"), ("a curated travel blog's", "a travel blog's"),
]

# The food-history callout (#bougie): written by the hot/calendar pack from verified sources (research/hot_events.json "bougie"),
# reconciled in fixes.py; the last line points to the two places in this guide where the story is still on sale.
BOUGIE_GO = ('Two places in this guide are where it still happens: <a href="#venue-v-pecheurs-du-port">the fishermen’s stand on the Quai Marc Pajot</a>, '
             'mid-morning, and the soupe de roche and bouillabaisse of <a href="#venue-v-maurin-des-maures">Maurin des Maures</a>, ordered the day before.')
def bougie(b):
    return "\n".join([
     '<details class="sfold" id="bougie">', "<summary>", "<div>",
     f'<div class="sfold__title">{H.escape(b["title"], quote=False)}</div>',
     f'<div class="sfold__desc">{H.escape(b["desc"], quote=False)}</div>',
     "</div>", '<span class="sfold__count">THE STORY</span>', '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
     f'<p class="gx-lede">{H.escape(b["lede"], quote=False)}</p>'] + [f"<p>{H.escape(p, quote=False)}</p>" for p in b["paras"]]
     + [f"<p>{BOUGIE_GO}</p>", "</div>", "</details>"])

DROP_CARDS = ["provisioning:La Cave de Mon Village"]   # 21 Oct: no 2026 trace online, and its address is now listed for a furniture shop

FOLDS = {
 "quartiers": {"title": "The bay — the town, its quarters and the neighbours over the capes", "desc": "The port with a Roman name, the green hollow of Pardigon, the young town, and La Croix-Valmer and the Rayol either side",
               "lede": "Cavalaire is one bay, three kilometres of sand, and a town that is barely a century old. Its neighbours do much of its eating: La Croix-Valmer and Gigaro over Cap Lardier, the Rayol along the corniche. A car or the coast path joins them."},
 "curiosities": {"title": "The record, corrected — what most guides never tell", "desc": "The hill fort over the bay, the train that made the town, the chapel of 1639, the wrecks under the swimmers, the tuna traps and the pointed boat",
                 "lede": "Six things the bay’s own story tells slightly wrong or not at all, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the quay, the markets and the wine from the hill", "desc": "Where a galley provisions: the boats on the quay, the Wednesday and Sunday markets, and three estates of the peninsula",
                  "lede": "Shop in the morning: the boats sell mid-morning, the markets fold by one. Buy the wine at the estate, where it costs a fraction of the beach price."},
 "walks": {"title": "Walks — the three capes and the Fenouillet", "desc": "The great coastal path from Gigaro round Cap Lardier to Cap Taillat, its crest, and Cavalaire’s own headland loop",
           "lede": "Walk early, carry water and keep to the yellow marks. In summer the Maures paths can close on red-flag fire days: check before you set out."},
 "calas": {"title": "The coves — the wild end and Cavalaire’s side", "desc": "The sandbar of Cap Taillat, the last beach of La Croix-Valmer, the douaniers’ coves; then Bonporteau’s snorkel trail, the Rayol coves and the guided sea trail",
           "lede": "The water is warm from June to early October. The wild coves have no kiosk, no lifeguard and no road: bring water and shade, and take everything home."},
 "culture": {"title": "Culture — the gardener, the painters and the landing beach", "desc": "The garden of the world’s Mediterranean climates, the painters of Saint-Tropez, the town’s archaeology room, and the beach of 15 August 1944",
             "lede": "Few rooms, all worth the drive. The garden keeps winter hours; the museum in Saint-Tropez closes at midday; the landing monument is always open."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one workshop of the gulf where a named hand teaches, the others and what each is missing, and the honest word on what is sold as Provençal",
           "lede": "The gulf’s crafts are older than its beaches — briar, reed, wool, leather — but most of the hands sell rather than teach. The card at the top is the one that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "Three cups for the coffee itself: a roaster in Cogolin, a harbour room at La Favière, and the best in town",
                    "lede": "The honest truth first: Cavalaire has no roaster of its own. The port café is for the terrace; for the cup, drive to Cogolin or La Favière."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "Three bottles to ask for by name, the other glasses, three counters of living wine, a glass with a view, and the night as it honestly is",
          "lede": "This is rosé country, in the literal sense. Learn the three pinks by name; then the counters of living wine, a terrace at dusk, and the two nights a week the town actually goes out."},
 "listening": {"title": "Hi-fi & listening — the honest answer and the music by the sea", "desc": "No hi-fi bar on this bay, said plainly; then the free concerts on the seafront and the summer stages of Ramatuelle and the Moutte",
               "lede": "The bay listens outdoors, in summer, and mostly for free. Check the year’s programme before you plan round it."},
 "around": {"title": "Autour — the hill villages, the Maures and the islands", "desc": "Gassin, Ramatuelle and Bormes on their hills, the chestnut village and the monastery in the forest, and the two islands of the national park"},
 "avoid": {"title": "What to skip", "desc": "The bay keeps two versions of itself: what it sells on the seafront in August, and what it does one street back and one month later",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the town and the gulf’s tourist offices, the shuttle boats, the national park and the garden"},
}

GDESC = {
 ("quartiers", "The town on the bay"): "The marina with a Roman name, the green hollow behind the eastern beach, and the town that was a hamlet of Gassin until 1929.",
 ("quartiers", "Over the capes"): "The wine village and its beach on one side, the corniche and its garden on the other.",
 ("curiosities", "Older than it looks"): "A Ligurian fort on the ridge, the railway that made a resort, and a chapel that has vanished.",
 ("curiosities", "Under and on the water"): "The wrecks under the bay, the tuna traps of the gulf, and the boat with two pointed ends.",
 ("provisioning", "The morning"): "The boats on the quay, the Wednesday square, and the Sunday market over the cape.",
 ("provisioning", "Wine from the hill to the water"): "A classified growth above Gigaro, an organic estate inside the protected capes, and a Cru Classé of Gassin.",
 ("provisioning", "The caviste in town"): "Bottles, cheese and a counter near the beach.",
 ("walks", "The three capes"): "The great coastal path from Gigaro, and the crest that is its payoff.",
 ("walks", "Cavalaire's own"): "A headland loop behind the town, through cork oak and strawberry trees.",
 ("calas", "The wild end of the peninsula"): "A sandbar tying a rock to the land, the last beach of La Croix-Valmer, and three coves most people never learn the names of.",
 ("calas", "Cavalaire's side and the corniche"): "A free snorkel trail under the town’s own cove, the small coves of the Rayol, and a sea trail with a guide.",
 ("culture", "The gardener and the painters"): "A garden of five continents on one slope, the pointillists in a chapel by the port, and the bay’s archaeology in one room.",
 ("culture", "15 August 1944"): "The beach where the other Allied landing came ashore.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Provençal-made, and is not.",
 ("coffee-gardens", "The cup itself"): "A roaster’s bar in Cogolin, a harbour room at La Favière, and the best cup in town.",
 ("bars", "Ask for it by name"): "The pale pink of the coast, the classified growth, and the peninsula’s own old grape.",
 ("bars", "The other glasses"): "The white by the water, the red for a cool night, and the anise hour.",
 ("bars", "Living wine, three counters"): "A caviste’s counter in La Croix-Valmer, a small bistro in Saint-Tropez, and a biodynamic estate under the pines.",
 ("bars", "A glass with a view"): "A château bar over the bay of Saint-Tropez, and a hotel terrace a stone’s throw from Cavalaire’s water.",
 ("bars", "After dark, honestly"): "The rum bar on the quay, and the two beach bars that throw the town’s parties.",
 ("listening", "The listening room, honestly"): "No hi-fi bar here, and where the music is instead.",
 ("listening", "Music by the water"): "The seafront festival of September, the summer concerts on the quays, and the jazz of Ramatuelle.",
 ("listening", "Under the stars"): "The village theatre festival of August, and chamber music in a palm grove.",
 ("around", "The hill villages"): "The ramparts of Gassin, the spiral lanes of Ramatuelle, and the flowered steps of Bormes.",
 ("around", "Into the Maures, and out to the islands"): "The chestnut village and the monastery in the forest, and the two islands of the national park.",
 ("avoid", "Four to skip"): "Saint-Tropez by car in August, the Pampelonne clubs, and the empty winter seafront.",
 ("avoid", "Read the plate"): "The ‘fresh fish’ on the seafront menu.",
 ("follow", "The town and the gulf"): "The town, the gulf and the shuttle boats.",
 ("follow", "The wild coast"): "The national park and the garden.",
}

TABLES_DESC = ("A two-star dining room on the Ramatuelle cliff at one end and a crate of rockfish on the quay at the other: at most three tables of each "
               "kind, picked for what you should not miss on this bay, every card saying when it was last confirmed and when its season runs.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE QUAY’S STORY", "quarters": "THE BAY", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "sea": "COVES & SWIMS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "BARS & WINE", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the quay’s story, the bay, the record corrected, the season", "tables": "",
               "flaner": "the three capes, the coves, the garden and the landing beach, the hand, the cup",
               "sortir": "the rosés by name, living wine, a glass with a view, the night, the music by the sea", "around": "the hill villages, the Maures, the islands",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The tables you clear an evening for: the starred rooms of the peninsula, and two chefs who left the palace kitchens for rooms of their own.",
              "petite": "Where this guide actually lives: the tables on the sand, the fish by the water, the corniche, and the hill villages.",
              "street": "On foot and standing: the boats on the quay, the Wednesday market, and the port bar at sundown."}

LANE_LEAD = {
 "summit": "Two stars on the Ramatuelle cliff, one under the palms of Château de Valmer, and the Starck hotel’s dining room above Gigaro.",
 "chefs": "A La Vague d’Or pastry chef’s village room in La Croix-Valmer, and the reborn Hôtel du Parc in Cavalaire.",
 "sand": "Gigaro’s one-toque beach table, the family of Marius on the same sand, and lunch under straw on Cavalaire’s Grande Plage.",
 "fish": "Aïoli on the Nouveau Port, bouillabaisse on the cliff over the Cron cove, and the catch under the pines of Gigaro since 1964.",
 "corniche": "Dédé’s bouillabaisse at Le Rayol, and lunch inside the garden of the Mediterraneans.",
 "villages": "The Bib Gourmand on Gassin’s rampart, a family table in the vines since 1979, and Italy cooked straight in Ramatuelle.",
 "street": "The fishermen’s crates on the Quai Marc Pajot, the Wednesday square, and the mojito on the port.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter of the bay — the apéro, the table, the late glass.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the quay’s old right to sell off the boat, the markets before noon, the dishes of the coast, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through and it is late October: the fish under the pines at Gigaro (to 31 October, closed Tuesday and Wednesday), Italy in Ramatuelle village (daily to 1 November), and the cliff terrace over the Cron cove (the hotel to 6 November; call, the hours differ by source).",
             "Plan ahead — this week": "Open all year: the village room of two La Vague d’Or chefs in La Croix-Valmer (Wednesday to Saturday, call on Tuesday), and Dédé’s bouillabaisse on the corniche — phone the day before, and note one listing has no dinners from 11 November to 20 December.",
             "Plan ahead — the grand night": "The starred houses of the peninsula are summer houses: La Voile closed on 11 October, La Palmeraie on 4 October, and Vista’s dates were not published. Book as soon as the 2027 season opens; nothing grand on this bay serves in winter."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the bay’s year: the mimosa in winter, the landing and the music in summer, the classic yachts, the chestnut and the harvest in autumn"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

# The Dish (inside La liste): eight plates and their honest passports, rewritten from the old guide's dish articles (the rosé is a
# drink card; the tropézienne's origin is a gem popup, so here it is the plate only).
DISH_DESC = "Eight plates and their honest, often contested, passports: which are this coast’s own, and which it borrowed from Marseille."
DISHES = [
 ("Soupe de poissons de roche", "The everyday ancestor of bouillabaisse and the one you actually order here: rockfish too small to sell, simmered with tomato, fennel, olive oil and saffron, then sieved to a rust-coloured broth. Croutons, grated cheese and rouille float on top. The fish behind it is landed on the quay a few metres away.", "The whole Provençal coast"),
 ("Bouillabaisse", "The famous one, and worth being honest about. Several bony fish — rascasse, chapon, congre, saint-pierre, grondin — go into a saffron broth one after another, by firmness; the broth comes first with rouille, the fish after. On this bay it is ordered a day ahead, for at least two, and priced like the luxury it has become.", "Marseille — not a Cavalaire dish"),
 ("Grand aïoli", "Less a sauce than a Friday: garlic pounded stiff with olive oil and egg yolk, set in the middle of poached salt cod, boiled potatoes, carrots, green beans, snails and egg. Order it on a day with nowhere to be.", "Provence"),
 ("Tapenade", "Black olives, capers, anchovy, garlic and oil pounded to a dark paste and spread on bread with the first cold glass. The name comes from tapena, the Provençal for the caper; Marseille credits a nineteenth-century chef with the recipe, and the date is argued.", "Marseille"),
 ("Panisses", "Chickpea flour cooked to a paste, set, cut and fried into golden batons, crisp outside and soft within, eaten with salt like chips. Working-class food that came to Marseille’s L’Estaque with Ligurian and Piedmontese families.", "Marseille, from Liguria"),
 ("Daube provençale", "The winter dish of the hills: beef in large pieces marinated overnight in red wine, then simmered for hours with pork belly, carrots, tomato, black olives, orange peel, thyme and bay. A Maures daube may carry chestnuts.", "Provence, inland"),
 ("Pieds et paquets", "For the curious: lamb tripe rolled into small parcels round pork belly, garlic and parsley, stewed slowly with the trotters in white wine and tomato. Nineteenth-century workers’ food that wasted nothing.", "Marseille and Sisteron"),
 ("Tarte tropézienne", "The one sweet of the gulf: a sugar-crusted brioche split and filled with a cream of pastry cream and butter cream, sold by the slice or whole in its box. Eat it the day it is made.", "Saint-Tropez, over the capes"),
]


def dish_articles(old):
    """The Dish: eight articles rebuilt from the old guide's dish fold (see DISHES)."""
    from liste import DISH_WHERE as W
    out = []
    for name, body, origin in DISHES:
        aid = "o-" + re.sub(r"[^a-z0-9]+", "-", name.lower().replace("é", "e").replace("ï", "i").replace("ç", "c")).strip("-")[:28]
        where = W.get(name)
        out.append(f'<article class="tcard tcard--dish" id="{aid}"><div class="tcard__type">ORIGIN</div><h3 class="tcard__name"><span class="tcard__name-text">{name}</span></h3>'
                   f'<p class="tcard__body">{H.escape(body, quote=False)} <b>Origin.</b> {H.escape(origin, quote=False)}</p>'
                   + (f'<div class="tcard__hook"><b>Eat it</b> — {where}</div>' if where else "") + "</article>")
    assert len(out) == 8, len(out)
    return "".join(out)


DROP_HOSTS = ("facebook.com", "instagram.com", "seloger.com", "century21.fr", "plages.tv", "boncaviste.com", "raisin.digital", "festivalenfrance.com")
def sources_edit(s):
    """the old sources fold: its body carried the kit's gx-appendix class (a second appendix on the page), its labels were truncated URLs,
    and a second 'further sources' block followed under a banner of trust names. One clean list is rebuilt from both: social pages,
    property portals and aggregators go (the re-check's own sources are added after)."""
    s = s.replace('<div class="sfold__body gx-appendix">', '<div class="sfold__body">', 1)
    urls = []
    for u in re.findall(r'<a href="(https://[^"]+)"', s):
        u = H.unescape(u)
        if u not in urls and not any(h in u for h in DROP_HOSTS): urls.append(u)
    def label(u):
        from urllib.parse import urlparse, unquote
        p = urlparse(u); host = p.netloc.removeprefix("www.")
        path = unquote(p.path).strip("/").split("/")[-1].replace("-", " ").replace("_", " ")
        return host + (" — " + path[:60] if path else "")
    lst = "<ul class='gx-list'>" + "".join(f'<li><a href="{H.escape(u, quote=True)}" target="_blank" rel="noopener">{H.escape(label(u), quote=False)}</a></li>' for u in urls) + "</ul>"
    i = s.index('<div class="sfold__body">') + len('<div class="sfold__body">')
    return s[:i] + lst + "</div></details>"


# gem popups: born-here food origins (each kept to what the old research and the 21 Oct packs say; the plates are in The Dish)
GEMS = [
 {"id": "gem-tropezienne", "pattern": "tropézienne", "tag": "Gulf gem · born here", "name": "A cake named by a film star",
  "story": "Alexandre Micka, a Polish-born pastry-maker, settled in Saint-Tropez after the war with a family recipe for a sugar-crusted brioche filled "
           "with cream. In 1955 he was catering the shoot of Et Dieu… créa la femme and served it to Brigitte Bardot, who is said to have suggested he "
           "name it for the town. The name Tarte Tropézienne was registered later as a trademark.",
  "where": "La Tarte Tropézienne, the house Micka founded, in Saint-Tropez, over the capes."},
 {"id": "gem-marron", "pattern": "marrons glacés", "tag": "Maures gem · grown here", "name": "The chestnut with one kernel",
  "story": "The Maures carry a chestnut forest of some two thousand hectares, with Collobrières as its capital. The prized nut is the marron: a "
           "selected chestnut that fills its burr with a single round kernel instead of several partitioned ones, which is what lets it be candied "
           "whole. It becomes crème de marrons and marrons glacés in the village confectioners, and has its own Sundays every October.",
  "where": "The confectioners of Collobrières, forty minutes inland."},
 {"id": "gem-tibouren", "pattern": "Tibouren", "tag": "Peninsula gem · grown here", "name": "The old grape of the capes",
  "story": "Tibouren is the peninsula’s heritage grape: savoury, faintly orange-tinged, smelling of garrigue rather than candied fruit, and long tied "
           "to this stretch of the Saint-Tropez coast. Most growers dropped it for easier varieties; a few estates of the gulf still make it the heart "
           "of a rosé, and it is the one to ask for by name.",
  "where": "The estates of the peninsula; ask for it at the cellar door."},
]

GLOSS = [
 ["apéro", "the drink before dinner, and the hour it is drunk"],
 ["pastis", "the anise spirit of Marseille, drunk with five parts water"],
 ["louche", "the cloud pastis makes when the water goes in"],
 ["rosé", "pink wine, pressed briefly on the red grape skins"],
 ["Tibouren", "the old red grape of the Saint-Tropez peninsula, made into rosé"],
 ["Rolle", "the local name for Vermentino, the white grape of the coast"],
 ["Mourvèdre", "the late-ripening black grape of Bandol and the warm slopes"],
 ["Cru Classé", "one of the Provence estates ranked in the 1955 classification"],
 ["vigneron", "a grower who makes his own wine"],
 ["domaine", "a wine estate"],
 ["caviste", "a wine merchant, a wine shop"],
 ["cave", "a wine shop or cellar"],
 ["vin nature", "natural wine: organic grapes, nothing added, little or no sulphur"],
 ["AOP", "appellation d’origine protégée, the EU label tying a product to its place"],
 ["AOC", "appellation d’origine contrôlée, the French label tying a product to its place"],
 ["criée", "the fish auction"],
 ["prud’homie", "the old self-governing guild of a Provençal fishing port"],
 ["pêcheurs", "fishermen"],
 ["pointu", "the small double-ended wooden fishing boat of Provence"],
 ["pointus", "the small double-ended wooden fishing boats of Provence"],
 ["madrague", "a fixed net-maze for trapping tuna"],
 ["madragues", "fixed net-mazes for trapping tuna"],
 ["soupe de roche", "rockfish soup, sieved, with rouille"],
 ["rouille", "a garlic-and-saffron mayonnaise for fish soup"],
 ["rascasse", "scorpionfish, the essential fish of bouillabaisse"],
 ["chapon", "the large red scorpionfish, prized for soup"],
 ["girelle", "the rainbow wrasse, a small rockfish"],
 ["bouillabaisse", "the Marseille rockfish stew, served in two courses"],
 ["aïoli", "garlic and olive-oil emulsion, and the Friday meal served round it"],
 ["anchoïade", "anchovy, garlic and olive-oil paste"],
 ["tapenade", "olive, caper and anchovy paste"],
 ["panisses", "fried batons of set chickpea flour"],
 ["pissaladière", "the onion, anchovy and olive tart of Nice"],
 ["daube", "beef braised in red wine with orange peel"],
 ["pieds et paquets", "lamb trotters and stuffed tripe parcels, stewed"],
 ["tropézienne", "the cream-filled brioche of Saint-Tropez"],
 ["marron", "a selected chestnut with a single kernel"],
 ["marrons glacés", "whole chestnuts candied in syrup"],
 ["crème de marrons", "sweetened chestnut purée"],
 ["plancha", "a flat griddle"],
 ["garrigue", "the low aromatic scrub of thyme, rosemary and juniper"],
 ["maquis", "the dense evergreen scrub of the siliceous hills"],
 ["mistral", "the cold north-west wind down the Rhône"],
 ["posidonia", "Neptune grass, the flowering seagrass of the Mediterranean"],
 ["tombolo", "a sandbar tying an island to the mainland"],
 ["sentier du littoral", "the coastal footpath"],
 ["douaniers", "customs officers; their old path is the coastal one"],
 ["crique", "a small cove"],
 ["oppidum", "a fortified hilltop settlement of the Iron Age"],
 ["navette", "a shuttle, here by boat"],
 ["corniche", "a road cut along a cliff above the sea"],
 ["Plus Beaux Villages", "the label of the association of the most beautiful villages of France"],
 ["Conservatoire du littoral", "the public body that buys coastline to keep it wild"],
 ["chartreuse", "a Carthusian monastery"],
 ["pétanque", "the Provençal game of boules, played standing still"],
]
