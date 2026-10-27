"""La liste for lons-le-saunier-jura (26 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's dish fold, drink cards and the verified venue packs;
every 'where' is a venue kept in the tables or a card kept in the larder or the bars. Also The Dish (DISHES, DISH_WHERE), the gems,
the lane leads and the guest-list lines (written after the 26 Oct re-check)."""
T = "Domaine Stéphane Tissot 35 Place de la Liberté Arbois France"
MK = "Place de Verdun Lons-le-Saunier France"
LISTE = [
 ("Vin Jaune", "van ZHOHN", True, "Savagnin aged under its veil of yeast for at least six years and three months, sold in the 62 cl clavelin.",
  "No other wine in France is made this way; the clavelin is the law, not a style.", "Domaine Stéphane Tissot’s tasting room, Place de la Liberté, Arbois", T),
 ("Savagnin ouillé", "sah-vah-NYAN oo-YAY", False, "The same grape kept in topped-up barrels: fresh, salty, no veil.",
  "Taste it beside a Vin Jaune and you learn what the veil does.", "On the all-Jura list at La Finette, Arbois", "La Finette 22 avenue Pasteur Arbois France"),
 ("Ploussard", "ploo-SAR", True, "The Jura’s pale, nearly translucent red grape, also called Poulsard.",
  "Pupillin, where it grows best, calls itself its world capital.", "By the glass at La Table du Grapiot, Pupillin", "La Table du Grapiot 3 rue Bagier Pupillin France"),
 ("Trousseau", "troo-SOH", False, "The firmer, darker Jura red, with more tannin than Ploussard.",
  "The red to drink with Comté and game.", "Domaine Stéphane Tissot’s tasting room, Arbois", T),
 ("Macvin du Jura", "mak-VAN", False, "Grape must stopped with Marc du Jura and aged in oak: the Jura’s apéritif.",
  "One of the region’s own appellations, older than any rule written for it.", "In the soufflé glacé au Macvin at La Petite Auberge, or a glass at an Arbois cellar", "La Petite Auberge 1985 route de Besançon Lons-le-Saunier France"),
 ("Crémant du Jura", "kray-MAHN dew zhew-RAH", False, "Sparkling wine made by a second fermentation in the bottle, mostly Chardonnay.",
  "The everyday bubble of the slope, an appellation since 1995.", "Domaine Stéphane Tissot’s tasting room, Arbois", T),
 ("Comté at three ages", "kon-TAY", True, "The great cheese of the massif, cut young, middle-aged and old side by side.",
  "The ages taste like three cheeses; the lesson takes five minutes at a stall.", "The Thursday market, Place de Verdun, Lons", MK),
 ("Mont d’Or", "mon DOR", True, "The winter cheese in its spruce box, baked whole and spooned out hot.",
  "Sold only from 10 September to 10 May: in season now.", "The Thursday market, Lons — a box for the galley oven", MK),
 ("Morbier", "mor-BYAY", False, "A supple cheese with a line of black charcoal through the middle.",
  "The family at 39 rue du Commerce has made it for four generations.", "Chez l’Artisan Fromager, 39 rue du Commerce, Lons", "Chez l'Artisan Fromager 39 rue du Commerce Lons-le-Saunier France"),
 ("Saucisse de Morteau", "so-SEES duh mor-TOH", False, "Pork sausage smoked in a mountain chimney and closed with a wooden peg.",
  "Check for the peg: it is how the real one is told from the rest.", "The Thursday market, Lons, or on the plate at La Finette, Arbois", MK),
 ("Cancoillotte", "kahn-kwah-YOT", False, "A runny cheese of melted skimmed-milk curd, sold cold in jars.",
  "Franche-Comté’s own, and almost nowhere else; warm it and pour.", "The Thursday market, Lons", MK),
 ("Poularde au Vin Jaune et morilles", "poo-LARD oh van ZHOHN ay mo-REE", True, "Bresse hen in a sauce of Vin Jaune, cream and dried morels.",
  "The dish the region is built to explain.", "La Table du Grapiot, Pupillin, on the longer menus; La Finette in Arbois for the tavern version", "La Table du Grapiot 3 rue Bagier Pupillin France"),
 ("Croûte aux morilles", "kroot oh mo-REE", False, "Morels in a cream and Vin Jaune sauce on toasted bread.",
  "The spring mushroom, kept dry for the rest of the year.", "Ô Tablier, rue Émile Monot, Lons — its signature", "O Tablier 20 rue Emile Monot Lons-le-Saunier France"),
 ("Galet de Chalain", "gah-LAY duh shah-LAN", False, "A Pelen sweet: nougatine shell, almond-hazelnut praline, a coat of cocoa.",
  "Named for the lake where the region’s Neolithic villages were found.", "Pâtisserie Pelen, 1 rue Saint-Désiré, Lons", "Pelen 1 rue Saint-Désiré Lons-le-Saunier France"),
]
LANE_LEAD_TEXT = {
 "summit": "A first Michelin star at Pupillin, opposite the vines, the Bib Gourmand on the Cuisance at Arbois, and the starred house in Dole, where the grand menu is served only from Friday evening to Saturday.",
 "lons": "The town’s own kitchens: a tiny room for the croûte aux morilles, an auberge on the Besançon road with a Macvin soufflé, and a bouchon with a wood grill in the room.",
 "wine": "Two tables in Arbois where the wine leads: the old tavern of fondue and poultry with Vin Jaune, and the natural-wine bar that cooks one dish at noon.",
 "street": "The Thursday market on the squares, the cheesemaking family under the arcades, and the chocolatier of rue Saint-Désiré.",
}
SHORT_SUB_TEXT = {
 "Last minute — save the night": "The booking fell through: La Finette in Arbois (open every day, a big tavern room; call for the times) or Le Bistrot des Marronniers in Lons (closed Sunday; Monday and Saturday hours vary, so ring).",
 "Plan ahead — this week": "Le Bistronôme in Arbois (Bib Gourmand; Tuesday to Saturday, and no Thursday dinner from November to March) and Ô Tablier in Lons (a tiny room, closed Wednesday and Sunday).",
 "Plan ahead — the grand night": "La Table du Grapiot at Pupillin (one Michelin star since March 2026; closed Monday, call about Sunday) and La Chaumière in Dole (one star; the gastronomic room only from Friday evening to Saturday evening). The old guide’s two-star house at Port-Lesney no longer exists.",
}

DISHES = [
 ("Poularde au Vin Jaune et morilles", "A Bresse hen poached, then finished in a sauce of Vin Jaune, cream and dried morels, the dish served at every grand table of the region and in the better taverns. The bird comes from the Bresse plain just west of Lons, the only French poultry with a protected appellation; the wine and the mushrooms come down from the slope and the woods. The wine’s nutty, salty edge is what makes the sauce taste of the Jura and nowhere else.", "The Jura’s own; the bird is from the Bresse, next door"),
 ("Comté", "A great wheel of cooked, pressed cheese made in the village dairies of the massif from the raw milk of Montbéliarde and French Simmental cows, then aged for months or years. Young, it tastes of milk and butter; older, of hazelnut and broth, with white crystals that crunch. Ask for three ages cut side by side: it is the lesson the whole region gives.", "The Jura massif, French side: the Jura, the Doubs and the Ain"),
 ("Saucisse de Morteau", "A thick pork sausage from the Haut-Doubs, smoked slowly in the great pyramid chimney of a mountain farm, the tuyé, and closed at one end with a little wooden peg, the cheville, which is how you know it is the real one. Simmer it gently and never prick it; eat it with potatoes, lentils or cancoillotte.", "The Haut-Doubs, the mountains east of Lons"),
 ("Cancoillotte", "A runny, nearly fat-free cheese made by melting dried skimmed-milk curd, the metton, with butter, water and garlic or white wine. Sold cold in jars in every market of Franche-Comté and almost nowhere else; warmed and poured over boiled potatoes or Morteau, it is the region’s everyday comfort.", "Franche-Comté’s own"),
 ("Mont d’Or", "A soft winter cheese ringed with a strap of spruce bark and sold in a spruce box, made only in the cold half of the year when the cows are down from the summer pasture and give too little milk for a wheel of Comté. Baked whole in its box, la boîte chaude, with white wine and garlic, and spooned over potatoes.", "The Haut-Doubs, on the French side of the Swiss border"),
 ("Morbier", "A supple cow’s-milk cheese with a fine black line through the middle. The usual story is that farmers dusted the evening curd with ash to keep it until the morning’s milk filled the mould; today the line is vegetable charcoal and the story is a story. Mild, a little bitter at the rind, the cheese of the tavern board.", "The Jura massif; named for the village of Morbier"),
 ("Bleu de Gex", "A mild blue made in the high valleys of the Haut-Jura and the Pays de Gex from the raw milk of Montbéliarde cows, its blue grown naturally through the paste. Creamy rather than sharp, with a floury rind; the high-pasture cousin of the region’s cooked cheeses.", "The Haut-Jura and the Pays de Gex"),
 ("Pochouse", "A stew of river fish, pike, perch, tench, eel, cooked in white wine with garlic, onions and lardons and finished with cream, served over toast rubbed with garlic. A dish of the rivers rather than the mountain, shared with the Saône valley downstream; no table kept in this guide lists it in 2026, so take it where you find it.", "The Saône and the Doubs rivers; Verdun-sur-le-Doubs claims it"),
]
DISH_WHERE = {
 "Poularde au Vin Jaune et morilles": '<a href="#venue-v01-la-table-du-grapiot">La Table du Grapiot</a>, Pupillin, or <a href="#venue-v08-la-finette-taverne-d-arbois">La Finette</a>, Arbois',
 "Comté": 'the <a href="#venue-v12-march-de-lons-le-saunier">Thursday market</a>, three ages from one stall',
 "Saucisse de Morteau": 'the <a href="#venue-v12-march-de-lons-le-saunier">Thursday market</a>, or <a href="#venue-v08-la-finette-taverne-d-arbois">La Finette</a>, Arbois',
 "Cancoillotte": 'the <a href="#venue-v12-march-de-lons-le-saunier">Thursday market</a>, by the jar',
 "Mont d’Or": 'the <a href="#venue-v12-march-de-lons-le-saunier">Thursday market</a>, in season from 10 September to 10 May',
 "Morbier": '<a href="#venue-v-artisan-fromager">Chez l’Artisan Fromager</a>, 39 rue du Commerce',
 "Bleu de Gex": 'the <a href="#venue-v12-march-de-lons-le-saunier">Thursday market</a>',
}

# gem popups: born-here food origins (each kept to the guide's research and the 26 Oct checks)
GEMS = [
 {"id": "gem-clavelin", "pattern": "clavelin", "tag": "Jura gem · born here", "name": "The bottle that is the rule",
  "story": "Vin Jaune is sold in one bottle only, the squat 62 cl clavelin. The usual explanation is that it is what is left of a litre "
           "after six years under the veil, when part of the wine has evaporated through the barrel. A Vin Jaune in a 75 cl bottle is not one.",
  "where": "Any cellar on the slope; Château-Chalon makes nothing else."},
 {"id": "gem-cancoillotte", "pattern": "cancoillotte", "tag": "Franche-Comté gem · born here", "name": "The cheese you pour",
  "story": "Cancoillotte is melted skimmed-milk curd with butter and garlic or wine, sold cold in jars and poured warm over potatoes "
           "or a Morteau. It is the cheese of the region’s kitchens and almost unknown outside it.",
  "where": "Every market in Lons; the fromagers of the arcades."},
 {"id": "gem-morteau", "pattern": "Morteau", "tag": "Haut-Doubs gem · born here", "name": "The sausage with a peg",
  "story": "The Morteau is smoked for days in the tuyé, the pyramid chimney of a mountain farm, and closed with a small wooden peg, "
           "the cheville: look for it on the counter. Never prick it, and simmer it slowly.",
  "where": "The Thursday market in Lons; the charcutiers’ stalls."},
]
