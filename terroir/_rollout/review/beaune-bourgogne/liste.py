"""La liste for beaune-bourgogne (25 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's dish fold, drink cards and the verified venue packs;
every 'where' is a venue kept in the tables or a card kept in the larder or the bars. Also The Dish (DISHES, DISH_WHERE) and the gems.
Corrected on 25 Oct: the old dish cards sent readers to Loiseau des Vignes and Ma Cuisine for the canon; Loiseau is cut, and Ma Cuisine
now cooks sharing plates (Gault&Millau 2026) and shows 'temporarily closed' on MICHELIN, so neither is a best place. No kept venue's
2026 record lists coq au vin, gougères or cooked escargots: the list says so instead of guessing."""
LISTE = [
 ("Œufs en meurette", "uh ahn muh-RET", True, "Eggs poached in a reduction of red wine with lardons, mushrooms and small onions, on a garlic croûton.",
  "The plate where the wine is the sauce, not the pairing.", "Le Bistrot Bourguignon, rue Monge — the first course", "Le Bistrot Bourguignon 8 rue Monge Beaune France"),
 ("Bœuf bourguignon", "buhf boor-gee-NYON", False, "Beef shoulder braised for hours in red wine until the sauce is dark and glossy.",
  "Built on the village wine that was never going to sell as cru.", "Le Bistrot Bourguignon, rue Monge", "Le Bistrot Bourguignon 8 rue Monge Beaune France"),
 ("Jambon persillé", "zhahm-BON pair-see-YAY", True, "Ham simmered with white wine and herbs, torn and set in parsley jelly, sliced thick.",
  "Burgundy’s Easter terrine, sold all year on rue Monge.", "Charcuterie Raillard, 4 rue Monge — by the slice", "Charcuterie Raillard 4 rue Monge Beaune France"),
 ("Pâté en croûte", "pah-TAY ahn KROOT", False, "Meat terrine baked inside a pastry crust, served cold in slices.",
  "The charcutier’s showpiece; a whole one travels well to a galley.", "Charcuterie Raillard, rue Monge", "Charcuterie Raillard 4 rue Monge Beaune France"),
 ("Escargots de Bourgogne", "es-kar-GOH duh boor-GOYN", False, "Snails baked in their shells under garlic and parsley butter.",
  "Ask where the snails come from: the wild Burgundy snail is protected, and most are imported.", "Charcuterie Raillard, rue Monge — escargots persillés to bake aboard", "Charcuterie Raillard 4 rue Monge Beaune France"),
 ("Époisses", "ay-PWAHSS", True, "A soft cow’s-milk cheese with an orange rind washed in brine and marc.",
  "Made again at Époisses since the 1950s; eat it ripe, with a spoon.", "Fromagerie Alain Hess, Place Carnot, or the Saturday market", "Fromagerie Alain Hess 7 Place Carnot Beaune France"),
 ("Cîteaux", "see-TOH", False, "A mild washed-rind cheese made by the Trappist monks of the Abbaye de Cîteaux.",
  "The monks who walled the Clos de Vougeot still farm; the cheese is sold at the abbey.", "The Saturday market, or the abbey shop at Cîteaux", "Abbaye de Citeaux France"),
 ("Moutarde de Bourgogne", "moo-TARD duh boor-GOYN", True, "Mustard ground from Burgundy seed with white Burgundy wine, under a protected name.",
  "‘Dijon’ on a jar is a method; ‘de Bourgogne’ is a place.", "Edmond Fallot, 31 rue du Faubourg Bretonnière", "Edmond Fallot 31 rue du Faubourg Bretonniere Beaune France"),
 ("Pain d’épices", "pan day-PEESS", False, "Spice bread of flour and honey, and the iced nonnettes made from it.",
  "Dijon’s bakers have made it since the eighteenth century.", "Mulot & Petitjean, Place Carnot", "Mulot et Petitjean Place Carnot Beaune France"),
 ("Beaune premier cru", "bohn pruh-MYAY KROO", True, "A red Pinot Noir from one of the town’s 42 premier cru climats.",
  "Beaune has no grand cru: the premier crus are the top of its slope.", "Marché aux Vins, rue Nicolas Rolin — one is in the five-wine route", "Marche aux Vins rue Nicolas Rolin Beaune France"),
 ("Kir", "KEER", False, "Bourgogne Aligoté over a measure of crème de cassis; a Kir Royale on Crémant.",
  "Named for the canon who was mayor of Dijon from 1945 to 1968.", "Mix it aboard: Aligoté and a Cassis de Dijon from the shops of the Place Carnot", "Place Carnot Beaune France"),
 ("Crémant de Bourgogne", "kray-MAHN duh boor-GOYN", False, "Burgundy’s sparkling wine, made by a second fermentation in the bottle.",
  "An appellation since 1975, at a fraction of the price of Champagne.", "The Kir Royale’s base; a bottle from Caves Madeleine’s shelves", "Caves Madeleine 8 rue du Faubourg Madeleine Beaune France"),
 ("Marc de Bourgogne", "mar duh boor-GOYN", False, "Brandy distilled from the pressed skins and pips after the harvest, aged in wood.",
  "Nothing of the harvest is wasted; the Époisses rind is washed in it.", "After dinner, at Le Bistrot Bourguignon — ask for a Fine if you want it softer", "Le Bistrot Bourguignon 8 rue Monge Beaune France"),
 ("Gougères", "goo-ZHAIR", False, "Warm choux puffs baked with cheese, set out with the first glass.",
  "The Côte’s way of opening a tasting; no kept table lists them in 2026, so take them where they are offered.", "The Saturday market’s bakers and traiteurs (stalls vary)", "Marche de Beaune Place de la Halle Beaune France"),
]
DISHES = [
 ("Œufs en meurette", "Eggs poached gently in a reduction of red wine, the meurette, finished with lardons, button mushrooms and small onions and served on a croûton rubbed with garlic. It is a first course and a breakfast dish, and the clearest lesson in how Burgundy cooks: the wine is not poured beside the plate but reduced into it.", "Burgundy-wide; the sauce is the Côte’s Pinot Noir"),
 ("Bœuf bourguignon", "Beef shoulder or cheek browned, then braised slowly in red wine with a bouquet garni, lardons, small onions and mushrooms until the meat gives and the sauce is glossy and dark. The same logic as the meurette with more time: a dish that wants the afternoon. The beef of the region is the Charolais of the pastures to the south and west.", "Burgundy-wide; the beef is Charolais"),
 ("Coq au vin", "A mature cockerel, tougher and deeper in flavour than a young bird, jointed and braised slowly in red wine with lardons, onions and mushrooms; old recipes bind the sauce with the bird’s blood. A farm dish for using up a bird past its best and a wine past its youth. No table kept in this guide lists it in 2026: ask before you count on it.", "Burgundy and much of France claim it"),
 ("Jambon persillé", "Shoulder ham simmered for hours in white wine with tarragon and thyme, torn into rough pieces and set in a terrine in its own jelly, green with parsley, then served cold in thick slices with cornichons and mustard. Traditionally made for Easter; on rue Monge it is sold every week of the year.", "Burgundy’s own: the Easter terrine"),
 ("Gougères", "Choux pastry made with a hard cheese, Comté or Gruyère, baked into light golden puffs and served warm. On the Côte the gougère is set out with the first glass at a tasting, to reset the palate; it travels badly, so eat it the hour it is baked.", "Burgundy’s own; often credited to the Yonne, to the north"),
 ("Escargots de Bourgogne", "The Burgundy snail, Helix pomatia, baked in its shell under butter creamed with garlic and parsley. The wild snail has been protected in France since 1979, with picking restricted, so most escargots de Bourgogne served today are imported: the name is the recipe and the species, not always the origin. Ask, and buy them persillés from the charcutier.", "The recipe is Burgundy’s; most snails are not"),
 ("Époisses", "A soft cow’s-milk cheese of the Auxois, its rind washed through its ageing with brine and then marc de Bourgogne until it turns orange and strong. Its making had nearly stopped by the Second World War; the Berthaut family revived it at Époisses in the 1950s, and it is now a protected appellation. The stories of Napoleon and of a ban on trains are stories.", "The village of Époisses, in the Auxois"),
 ("Pain d’épices", "Spice bread of flour, honey and spices, kept for weeks, sliced thin with cheese or foie gras, and shaped by the Dijon bakers into nonnettes, small iced cakes with a fruit filling. Mulot & Petitjean in Dijon have made it since the eighteenth century and keep a shop on the Place Carnot.", "Dijon, by way of the medieval spice trade"),
]
DISH_WHERE = {
 "Œufs en meurette": '<a href="#venue-v07-le-bistrot-bourguignon">Le Bistrot Bourguignon</a>, rue Monge',
 "Bœuf bourguignon": '<a href="#venue-v07-le-bistrot-bourguignon">Le Bistrot Bourguignon</a>, rue Monge',
 "Jambon persillé": '<a href="#venue-v-charcuterie-raillard">Charcuterie Raillard</a>, 4 rue Monge, or the <a href="#venue-v15-march-des-halles-saturday">Saturday market</a>',
 "Escargots de Bourgogne": '<a href="#venue-v-charcuterie-raillard">Charcuterie Raillard</a>, persillés to bake aboard',
 "Époisses": 'the <a href="#venue-v15-march-des-halles-saturday">Saturday market</a>, or the affineur on the Place Carnot',
}
# gem popups: born-here food origins (each kept to the guide's research and the 25 Oct checks)
GEMS = [
 {"id": "gem-persille", "pattern": "jambon persillé", "tag": "Burgundy gem · born here", "name": "The Easter terrine",
  "story": "Jambon persillé is ham cooked in white wine, torn and set in a jelly thick with parsley: Burgundy's dish for Easter. "
           "On rue Monge the charcutier sells it by the slice all year, to eat standing with bread and a cornichon.",
  "where": "The charcutiers of rue and Place Monge; the Saturday market."},
 {"id": "gem-meurette", "pattern": "meurette", "tag": "Burgundy gem · born here", "name": "The wine is the sauce",
  "story": "A meurette is red wine reduced with shallots, lardons and mushrooms until it coats a spoon. Poured over poached eggs "
           "it becomes the first course of every bouchon on the Côte, and the plainest proof that this kitchen cooks with its wine.",
  "where": "The bouchons inside the ramparts."},
 {"id": "gem-epoisses", "pattern": "Époisses", "tag": "Auxois gem · born here", "name": "The cheese washed in marc",
  "story": "Époisses is washed through its ageing with brine and marc de Bourgogne, the brandy of the press, until its rind turns "
           "orange. Its making had nearly died out by the 1940s; one family brought it back at Époisses in the 1950s.",
  "where": "The village of Époisses, about an hour north-west; the cheese shops of the Place Carnot."},
]
