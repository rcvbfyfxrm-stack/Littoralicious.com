"""La liste for lons-le-saunier-jura (26 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's dish fold, drink cards and the verified venue packs;
every 'where' is a venue kept in the tables or a card kept in the larder or the bars. Also The Dish (DISHES, DISH_WHERE), the gems,
the lane leads and the guest-list lines (written after the 26 Oct re-check)."""
LISTE = []          # filled below, after the venue packs
LANE_LEAD_TEXT = {}
SHORT_SUB_TEXT = {}

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
DISH_WHERE = {}     # filled below, after the venue packs

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
