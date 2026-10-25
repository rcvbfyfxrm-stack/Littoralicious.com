"""Hand-written prose for the beaune-bourgogne GOLD6 build (25 Oct 2026). Facts only from the guide (its May 2026 research), the
25 Oct re-check packs in research/, and nothing else. The old page's lead, history, eat, drink and walk blocks are rebuilt here as one
essay (transformed, not pasted); the facts that now have a card of their own (the Hôtel-Dieu, the Last Judgment, Gouais and the 1395
ban, Pinot Gouges, the Vigne de l'Enfant Jésus, Marey, Monge, the auction, the dishes) are pointed to, not retold.
The whole GOLD3/4/5 floor (lanes with stories, dishes, the guest list, La liste with The Dish, the hot board and its pointer, the
calendar, the craft section, the listening room, Autour, the food-history fold) is written here for the first time."""
import re, html as H

TITLE = "Beaune, Côte-d’Or — Terroir Guide"
DESC = ("Beaune for people who cook: the Saturday market under the Halle, jambon persillé by the slice on rue Monge, œufs en meurette, "
        "stone-ground mustard from the last family mill, the cellars under the streets and the premier crus five minutes from the "
        "ramparts — at most three places of each kind, every one re-checked in October 2026.")

HERO = ('<div class="hero"><h1>Beaune</h1><div class="region">Côte-d’Or · Bourgogne · France</div><div class="philosophy">"A ring of '
        'ramparts seven hundred metres across, a hospital roofed in glazed tiles, and under every street a cellar. The vines start '
        'where the houses stop."</div></div>')

ETYMON = ('<div class="etymon"><b>The name</b> <em>Beaune is usually traced to Belenos, a Gaulish god of light and springs; the town '
          'itself does not insist.</em><div class="gx-fold is-folded" data-fold-label="The name — read the story"><em>The old forms are '
          'Belno and Belna, and the most often repeated story links them to Belenos, the Celtic god whose cult gathered at springs — '
          'the Bouzaize rises at the edge of town. It is a story, not a proof. The climat, the word this town is built on, is plainer: '
          'in Burgundy it means a named plot of vines with its own soil, slope and sun, and its own name on the label.</em></div></div>')

LEAD = ('<div class="lead"><p><strong>Beaune is the wine capital of the Côte d’Or, a walled town small enough to cross in fifteen '
        'minutes, with the vineyards starting at its back door:</strong> the Saturday market under the Halle, jambon persillé on rue '
        'Monge, eggs poached in red wine, mustard ground in stone, and the cellars under every street. <strong>Make or break:</strong> '
        'taste in a cellar with someone who made the wine, and walk up into the premier crus. <strong>The warning:</strong> the '
        'Hospices auction weekend, 13–16 November 2026, fills the town: book now or come another week.</p></div>')

ESSAY_LEDE = ("Beaune sits on a fault line. When the Alps rose, the land to the east sank into the Saône plain and the limestone of "
              "the Côte was tilted towards the morning sun: a long, east-facing slope of marl and stone, drained by its own angle. That "
              "slope is the reason for the town, and you can see it from the ramparts.")
ESSAY = [
 ("", "The monks came first. Benedictines planted on the Côte in the tenth century, and the Cistercians of Cîteaux, founded in 1098 "
      "on the plain, walled the Clos de Vougeot in the decades after and spent centuries tasting it parcel by parcel. Those parcels, "
      "the climats, still carry the names the monks and the peasants gave them. Then the dukes of Burgundy made Beaune the market of "
      "the Côte: their state ran from Mâcon to the North Sea, and the wine went with their court."),
 ("", "In 1443 the duke’s chancellor, Nicolas Rolin, and his wife Guigone de Salins founded a hospital for the poor inside the walls, "
      "and gave it vines to live on. The hospital, its roof and its painting have cards of their own below, and the story of how it "
      "came to sell its wine at auction every November is the history fold. What it means at table is that this town has been "
      "pricing a barrel of wine in public for longer than almost anywhere."),
 ("The quintessence", "The kitchen is the wine. The slope was too poor for wheat and the valleys rich in pasture, so the canon is a "
      "few braises built on the village red that would not sell as cru: beef cooked for hours in it, an old cockerel in it, eggs "
      "poached in it. Around them, the pig on Easter tables as jambon persillé, the cheese of the Auxois washed in marc, a choux "
      "puff of cheese served with the first glass, mustard ground with the region’s own sour wine, and blackcurrants turned into "
      "crème de cassis."),
]
HISTORY = [
 "The town inside the ramparts is small, and quiet after dark except around the Place Madeleine. The trade lives a few steps "
 "south-west of the Halle, in rue Maufoux, rue Paradis and rue d’Enfer, where the négociants’ doors open onto vaults that run under "
 "the street. The charcutiers are on rue and Place Monge; the mustard mill is out through the old Porte Bretonnière.",
 "Two grapes do nearly all the work: Pinot Noir for the reds and Chardonnay for the whites, with Aligoté for the Kir. Where each "
 "came from, and the peasant grape both families share, is told on the curiosity cards.",
]
MONEY = [
 "The money in Beaune is in the ground. A row of vines in a grand cru costs more than a house in town, and the houses that sell "
 "wine own the cellars under the streets. Most visitors see the Hôtel-Dieu and a tasting cellar, eat on a terrace on the Place "
 "Carnot, and drive on.",
 "That is the line you can taste. The value is at the Saturday market before ten, a slice of jambon persillé from the charcutier, "
 "a bouchon with a menu that has not changed in years, and a glass poured by someone who knows whose vines it came from — a "
 "cellar at the end of the day, not a terrace at noon.",
]
WHY_NOW_PARA = ("<p>And the clock is the vine. Bud-break comes in April and the flowering in June; the harvest is in September, when "
                "the slope works from dawn and the town smells of must. In late October the new wine is in barrel and the cellars are "
                "busy again, the game is on the menus, and on the third weekend of November the town holds its auction and fills to "
                "the walls. Whoever comes in May gets a green slope and an empty town; whoever comes in November gets the new "
                "wine, the braises and the crowd.</p>")


def soul_fold():
    """The essay: the old lead, history, eat and drink blocks, rewritten (the Hôtel-Dieu, the Last Judgment, Gouais, the 1395 ban,
    Pinot Gouges, Marey, Monge and the dishes moved to their own cards) and merged into one read."""
    body = f'<p class="gx-lede">{ESSAY_LEDE}</p>\n' + "\n".join(
        (f'<p><b class="gx-merge-k">{k}.</b> {p}</p>' if k else f"<p>{p}</p>") for k, p in ESSAY)
    body += '\n<h3 class="gx-merge">Where it comes from</h3>\n' + "\n".join(f"<p>{p}</p>" for p in HISTORY)
    body += '\n<h3 class="gx-merge">Where the money sits</h3>\n' + "\n".join(f"<p>{p}</p>" for p in MONEY) + "\n" + WHY_NOW_PARA
    return "\n".join(['<details class="sfold" id="soul">', "<summary>", "<div>",
                      '<div class="sfold__title">The soul of the place — the essay</div>',
                      '<div class="sfold__desc">A fault line, the monks who named the plots, a duke’s market town, and a hospital that lived on its vines</div>',
                      "</div>", '<span class="sfold__count">THE ESSAY</span>', '<span class="sfold__chev"></span>', "</summary>",
                      '<div class="sfold__body">', body, "</div>", "</details>"])


EDITS = {"seasonal": [], "sources": []}
# exact replacements on the kept venue records' old text fields (the house word list: no "couple", no "for two", no "curated")
VENUE_TEXT_EDITS = [
 ("for two people", "for at least two people"), ("/ two", "to share"), ("for two", "to share"),
 ("romantic", "quiet"), ("Romantic", "Quiet"), ("curated", "chosen"), ("iconic", "best-known"), (" ★ ", " "), ("★", ""),
]

BOUGIE_GO = ('Taste what the auction is about at the source: the Beaune premier cru in the five-wine route of the Marché aux Vins, '
             'opposite the Hôtel-Dieu, or a whole morning at the Saturday market under the '
             '<a href="#venue-v15-march-des-halles-saturday">Halle</a>, where the sale itself is held.')
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
 "quartiers": {"title": "The town — inside the ring, at the gates, up the slope", "desc": "The two squares at the centre, the cellar streets, the after-dark faubourg, the charcutiers’ square, the mustard road, and the vines behind the walls",
               "lede": "Beaune is a ring: the ramparts draw a circle about 700 metres across, and nearly everything worth a stop is inside it or just outside a gate. The vines begin a few hundred metres west."},
 "curiosities": {"title": "The record, corrected — what most guides get wrong", "desc": "The peasant grape behind the great whites, the Pinot that turned white, a vine named for a king, and two men of Beaune",
                 "lede": "Five stories the town and its wine tell about themselves, checked again in October 2026. Where the sources still argue, the card says so."},
 "provisioning": {"title": "The larder — the markets, the mustard and the cheese", "desc": "Where a galley provisions: the Saturday market and the charcutier; then the mustard mill, the spice bread, the affineur, and two cheeses made at their source",
                  "lede": "Shop on a Saturday morning if you can: the market is the week’s, and the shops around it are full. Bring a cool bag for the cheese, and cash for the stalls."},
 "walks": {"title": "Walks — the ramparts and the vines", "desc": "Round the walls and through the park inside the town, then up into the premier crus and along the Côte to Meursault and Corton",
           "lede": "Walk the ramparts early and the vines late, when the light comes across the slope. The vineyard paths are working tracks: keep to them, and leave the grapes alone."},
 "culture": {"title": "Culture — the hospital, the church and the wine’s museums", "desc": "The Hôtel-Dieu and its Last Judgment, the Collégiale and its tapestries, the Cité des Climats, and the wine museum in the dukes’ house",
             "lede": "Few rooms, all within a walk. Go to the Hôtel-Dieu at opening; leave the Cité for the end of the afternoon."},
 "craft": {"title": "The hand — craftsmanship", "desc": "The one craft of the Côte where a named hand teaches, the others and what each is missing, and the honest word on what the shops sell",
           "lede": "The crafts of the Côte serve the wine and the table: the cooper’s barrel, the miller’s mustard, the baker’s spice bread. Most of the hands that practise them sell rather than teach. The card at the top is the one that does both."},
 "coffee-gardens": {"title": "Rooms to linger & work", "desc": "A terrace on the square, a wine bookshop opposite the Hôtel-Dieu, and the pâtisserie on rue Monge",
                    "lede": "Beaune takes its coffee on the Place Carnot and its pastry on rue Monge. For an hour of reading, the bookshop; for work, honestly, the boat."},
 "bars": {"title": "Boire & sortir — at the glass", "desc": "The two grapes and the word that explains them, the drinks before and after, and three cellars you can walk into",
          "lede": "Learn three words — Pinot, Chardonnay, climat — and the list makes sense. Then taste underground, where the wine is kept."},
 "listening": {"title": "Hi-fi & listening — the room, and the night", "desc": "The honest word on a listening room, the shape of a Beaune evening, and the club in Dijon",
               "lede": "Beaune is not a late town. The evening is a glass and a conversation; the music is in Dijon."},
 "around": {"title": "Autour — the Côte, the monks and the dukes", "desc": "South along the Route des Grands Crus to Pommard and Volnay; north to the Clos de Vougeot and Dijon"},
 "avoid": {"title": "What to skip", "desc": "The town keeps two versions of itself: what it sells on the squares to people passing through, and what it pours and cooks two streets back",
           "lede": "Four things to leave alone, and what to do instead."},
 "follow": {"title": "Follow", "desc": "Who to read before you leave home: the town, the hospital, the wine, the growers and the July festival"},
}

GDESC = {
 ("quartiers", "Inside the ring"): "The two squares at the centre, the streets of the wine trade, and the faubourg that stays up late.",
 ("quartiers", "At the gates, and over them"): "The charcutiers’ square, the road of the mustard mill, and the premier crus behind the walls.",
 ("curiosities", "The grapes, corrected"): "A peasant grape, a white Pinot, and a vine named for a royal birth.",
 ("curiosities", "Born in Beaune"): "The man who filmed a flying bird, and the man who taught France to draw in three dimensions.",
 ("provisioning", "The market days"): "The Saturday market under the Halle, the smaller Wednesday one, and the charcutier.",
 ("provisioning", "Mustard and spice"): "The last family mustard mill, and the spice bread of Dijon.",
 ("provisioning", "The cheese"): "The affineur on the square, and two cheeses made where they were born.",
 ("walks", "The town on foot"): "The ring of the ramparts, and the park at the spring.",
 ("walks", "Into the vines"): "Up the slope behind town, along the Côte to Meursault, and round the hill of Corton.",
 ("culture", "The hospital paid by vines"): "The Hôtel-Dieu, and the painting made for it.",
 ("culture", "The church and the wine’s own museums"): "The collegiate church, the Cité des Climats, and the wine museum in the dukes’ house.",
 ("craft", "Do this one"): "The one bench where you can enrol and learn from a named hand.",
 ("craft", "The others, and what each is missing"): "Real crafts, real workshops: each lacks one thing.",
 ("craft", "The honest warning"): "What is sold as Burgundy-made, and is not.",
 ("coffee-gardens", "Places to sit"): "The square, the wine bookshop, and the pâtisserie.",
 ("bars", "Ask for it by name"): "The red grape, the white grape, and the word that ties them to a plot.",
 ("bars", "Before and after"): "The Kir, the sparkling wine, and the brandies of the press.",
 ("bars", "The cellars you can walk into"): "A church turned tasting room, a duke’s fortress, and the longest galleries in town.",
 ("listening", "The listening room"): "Where to hear records properly, honestly checked.",
 ("listening", "Live, and late"): "A Beaune evening, and the music room of Dijon.",
 ("around", "South along the Côte"): "The road of the great wines, and the two villages on the hill above it.",
 ("around", "North, to the monks and the dukes"): "The monks’ walled vineyard, and the dukes’ capital.",
 ("avoid", "At the glass and on the plate"): "The terrace glass, and the frozen snail.",
 ("avoid", "The calendar and the car"): "The wrong weekend, and the wrong way to taste.",
 ("follow", "The town"): "The tourist office and the hospital’s own site.",
 ("follow", "The wine and the music"): "The wine board, the natural-wine map, and the July festival.",
}

TABLES_DESC = ("A market tasting menu on the Place Carnot at one end and a slice of jambon persillé on rue Monge at the other: at most "
               "three tables of each kind, picked for what you should not miss here, every card saying when it was last confirmed and "
               "which days it closes.")

SUB_LABELS = {"essay": "THE ESSAY", "history": "THE AUCTION’S STORY", "quarters": "THE TOWN", "curious": "CURIOSITIES", "when": "WHEN TO COME",
              "restaurants": "THE TABLES", "markets": "THE LARDER", "walks": "WALKS", "culture": "CULTURE", "craft": "CRAFT",
              "linger": "ROOMS TO LINGER", "bars": "WINE & CELLARS", "listening": "HI-FI & LISTENING", "trips": "DAY TRIPS",
              "follow": "WHO TO FOLLOW", "skip": "WHAT TO SKIP"}
CHAPTER_SUB = {"place": "the essay, the auction’s story, the town, the record corrected, the season", "tables": "",
               "flaner": "the ramparts and the vines, the hospital and the church, the hand, the cup",
               "sortir": "the grapes by name, the cellars, the night", "around": "the Route des Grands Crus, Pommard, Vougeot, Dijon",
               "practical": "what to skip, who to follow, the calendar, the months, the checklist, the sources"}

GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
GROUP_DESC = {"grande": "The dinners you clear an evening for: the two MICHELIN-starred kitchens inside the ring, and a charcoal counter where a Japanese chef cooks Burgundy.",
              "petite": "Where this guide actually lives: the bouchons that cook the canon straight, and the wine rooms where the bottle comes first.",
              "street": "On foot and early: the Saturday market, the charcutier and the pâtissier."}

LANE_LEAD = {
 "summit": "Two starred kitchens a few minutes apart — one on the Place Carnot, one under the cedar on the boulevard — and a counter on rue Maufoux cooking over binchotan.",
 "bouchons": "The canon, cooked straight: a bistrot down a passage with a cellar that goes very deep, the menu bourguignon on rue Monge, and a Bib Gourmand on the boulevard.",
 "wine": "Three rooms in and around the Faubourg Madeleine where the list is the point: shared tables, a natural-wine épicerie, and the counter young Beaune drinks at.",
 "street": "The Saturday market under the Halle, the charcutier of rue Monge, and the pâtisserie a few doors along.",
}
LANE_STORY = {}   # drafted by the venue packs (research/verify_*.json _lane_stories), reconciled in fixes.py

CHARTER = {}

DOORS = [
 {"fr": "One Night", "en": "Crew ashore for one evening: a plan for each quarter — the glass, the table, the last glass.",
  "note": "L’apéro · la table · le dernier verre", "href": "#tables", "open": ["tables", "bars", "listening"]},
 {"fr": "The Gastronomic Dig-In", "en": "For the chef: the auction and the hospital’s vines, the Saturday market and the charcutier, the dishes made with wine, and the canon at the foot.",
  "note": "L’histoire · le marché · le plat · la liste", "href": "#bougie", "open": ["bougie", "provisioning", "la-liste"]},
 {"fr": "For Guests", "en": "Plan ahead, or save the night at the last minute: bookable, priced, dressed for.", "note": "auto", "href": "#ce-soir", "open": ["ce-soir"]}]

SHORT_SUB = {"Last minute — save the night": "The booking fell through: Le Bistrot Bourguignon on rue Monge (lunch and dinner Tuesday to Saturday; it fills fast, so come early or ring the same day), or Caves Madeleine on the Faubourg Madeleine (closed Wednesday and Sunday; call, it takes no online bookings).",
             "Plan ahead — this week": "La Table du Square on the boulevard (Bib Gourmand; Tuesday to Saturday; a late-cancellation charge is reported) and Bissoh on rue Maufoux (about ten seats at the counter, dinner Wednesday to Sunday).",
             "Plan ahead — the grand night": "Le Carmin on the Place Carnot and Clos du Cèdre on the boulevard, one MICHELIN star each. For the auction weekend, 13 to 16 November 2026, book now: on the Sunday only Clos du Cèdre and Bissoh are listed open, and on the Monday none of the six."}

EAT_JUMP = ('<section class="gx-jump" id="eat">\n<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n} things, how to say each one, '
            'the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. '
            '<a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
            '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')

EVENTS_DESC = "The fixed dates of the town’s year: the vine’s saint in January, the music in summer, the harvest in September and the auction in November"

from liste import LISTE   # noqa: E402
LISTE_TITLE = "La liste — what to eat, what to drink, and where it comes from"

DISH_DESC = "Eight plates and their honest passports: which are Beaune’s own, which the whole of Burgundy shares, and which arrived from elsewhere."
from liste import DISHES   # noqa: E402


def dish_articles(old):
    """The Dish: the articles rebuilt from the old guide's dish fold and #eat prose (see liste.DISHES)."""
    from liste import DISH_WHERE as W
    tr = str.maketrans({"œ": "oe", "Œ": "oe", "é": "e", "è": "e", "ê": "e", "à": "a", "â": "a", "ç": "c", "î": "i", "ô": "o", "û": "u", "É": "e"})
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
 ["climat", "a named plot of vines with its own soil, slope and sun, and its name on the label"],
 ["climats", "named plots of vines, each with its own soil, slope and sun"],
 ["clos", "a vineyard enclosed by a wall"],
 ["premier cru", "the second rank of Burgundy’s vineyards, below the grand crus"],
 ["premier crus", "vineyards of the second rank, below the grand crus"],
 ["grand cru", "the top rank of Burgundy’s vineyards: the name of the plot alone on the label"],
 ["grand crus", "the top-ranked vineyards, named alone on the label"],
 ["négociant", "a merchant house that buys grapes or wine, raises it and sells it under its own name"],
 ["négociants", "merchant houses that buy, raise and sell wine under their own name"],
 ["domaine", "an estate that grows its own grapes and makes its own wine"],
 ["cuverie", "the vat house where the wine ferments"],
 ["pièce", "the Burgundy barrel: 228 litres"],
 ["pièces", "Burgundy barrels of 228 litres"],
 ["vendange", "the grape harvest"],
 ["Côte", "the slope: here the Côte d’Or, from Dijon to Santenay"],
 ["Côte d’Or", "‘the golden slope’, the line of hills from Dijon to Santenay, and the département"],
 ["bouchon", "a small, plain bistrot of the traditional dishes"],
 ["bouchons", "small, plain bistrots of the traditional dishes"],
 ["cave à manger", "a wine shop where you can also eat"],
 ["épicerie", "a grocer’s; here a delicatessen with a bar"],
 ["meurette", "a sauce of red wine reduced with shallots, lardons and mushrooms"],
 ["jambon persillé", "ham set in a jelly of white wine and parsley, the Easter terrine of Burgundy"],
 ["gougères", "warm choux puffs made with cheese, served with the first glass"],
 ["gougère", "a warm choux puff made with cheese"],
 ["pain d’épices", "spice bread of rye or wheat flour and honey"],
 ["nonnettes", "little iced spice cakes with a fruit filling"],
 ["Époisses", "the washed-rind cow’s-milk cheese of the Auxois, bathed in marc"],
 ["affineur", "a cheese ager: buys young cheeses and ripens them in the cellar"],
 ["marc", "brandy distilled from the pressed skins and pips of the grapes"],
 ["Kir", "white wine, here Aligoté, over a measure of crème de cassis"],
 ["crème de cassis", "the blackcurrant liqueur of Dijon and the Côte"],
 ["Crémant", "sparkling wine made by the second fermentation in the bottle"],
 ["Aligoté", "Burgundy’s sharp third white grape, the base of the Kir"],
 ["Gouais", "Gouais Blanc, a medieval peasant grape, parent of Chardonnay and Gamay"],
 ["verjus", "the sour juice of unripe grapes"],
 ["Hôtel-Dieu", "the old name for a town’s hospital for the poor"],
 ["Hospices", "the charity that runs Beaune’s hospital and owns its vines"],
 ["faubourg", "the quarter just outside a town gate"],
 ["bastion", "a projecting corner of a rampart"],
 ["tonnellerie", "a cooperage: where barrels are made"],
 ["tonnelier", "a cooper"],
 ["Trois Glorieuses", "the three days of the Hospices auction weekend in November"],
 ["Paulée", "the harvest-end feast; at Meursault, the lunch where every guest brings a bottle"],
 ["Tastevin", "the shallow silver tasting cup; and the brotherhood named after it"],
 ["moutarde", "mustard"],
 ["moutarderie", "a mustard mill"],
 ["charcutier", "a pork butcher who makes terrines, hams and sausages"],
]
