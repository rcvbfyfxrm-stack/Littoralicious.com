"""La liste for Split-Dalmatie (23 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's dish fold, drink cards and the verified venue packs;
every 'where' is a venue kept in the tables or a card kept in the larder or the bars. Also The Dish (DISHES, DISH_WHERE) and the gems."""
LISTE = [
 ("Gregada", "GREH-ga-da", True, "The Hvar fish stew: white fish, potatoes, white wine, garlic and oil, and no tomato.",
  "The older of the coast's two fish stews, from before the tomato arrived.", "Konoba Fetivi, Veli Varoš — ask what fish came in", "Konoba Fetivi Tomica stine Split Croatia"),
 ("Crni rižot", "TSUR-nee REE-zhot", False, "Risotto made black with cuttlefish and its ink.",
  "The coast's own black rice, which Dalmatia insists is no copy of Venice.", "Konoba Fetivi, Veli Varoš", "Konoba Fetivi Tomica stine Split Croatia"),
 ("Peka", "PEH-ka", True, "Lamb, veal or octopus with potatoes, slow-cooked under an iron bell buried in embers.",
  "Cooked to your arrival, so it has to be ordered a day ahead.", "Ask the Varoš konobas a day ahead — none of our tables re-confirmed it on its 2026 menu", "Veli Varos Split Croatia"),
 ("Pašticada", "pash-tee-TSA-da", False, "Beef marinated and braised for hours in wine, vinegar and dried plums, with gnocchi.",
  "A Sunday and winter dish of the whole coast; ask before you count on it.", "Apetit, in the palace — ask a day ahead", "Apetit Split Croatia"),
 ("Marenda at Fife", "ma-REN-da", True, "The mid-morning plate of the working city: whatever the fishermen's canteen cooked today.",
  "The cheapest honest meal on the Riva, eaten where the crews eat.", "Fife, Trumbićeva obala, Matejuška", "Buffet Fife Trumbiceva obala Split Croatia"),
 ("Ćevapi", "CHEH-va-pee", False, "Grilled minced-meat fingers in a soft lepinja, with ajvar and raw onion.",
  "The stand-up meal of the city, served the Split way: ajvar, not kajmak.", "Kantun Paulina, Matošića 1, Centre — cash only", "Kantun Paulina Matosica Split Croatia"),
 ("Burek", "BOO-rek", False, "Flaky filo pie of meat, cheese or potato, warm from the oven in the morning.",
  "What the city eats at seven, with a drinking yoghurt.", "Any pekarna near the Pazar, early", "Pazar Split Croatia"),
 ("Soparnik", "SO-par-neek", False, "Two thin sheets of dough round chard, onion and oil, baked on an open hearth.",
  "Poljica's fasting pie, an EU-protected name since 2016.", "Ask at the Pazar on a market morning, or in the konobas of Poljica", "Pazar Split Croatia"),
 ("Pršut and Paški sir", "PUR-shoot, PASH-kee seer", False, "Air-dried ham and the hard sheep's cheese of Pag, the plate that opens a meal.",
  "Paški sir became Croatia's first EU-protected cheese in 2019.", "The Pazar, at the Silver Gate, in the morning", "Pazar Split Croatia"),
 ("Fritule", "FREE-too-leh", False, "Small fried doughnuts with raisins, rum and lemon zest, dusted with sugar.",
  "A winter sweet: they appear with Advent and are gone by spring.", "The Advent stalls on the Riva and round the Pazar, from late November", "Riva Split Croatia"),
 ("Pošip", "POH-ship", False, "The white of Korčula: citrus, salt and almond.",
  "The glass the grilled fish wants.", "Zinfandel Food & Wine Bar, Centre", "Zinfandel Food Wine Bar Split Croatia"),
 ("Plavac Mali", "PLA-vats MA-lee", True, "The great red of Dalmatia, dark and warm, from the stone slopes.",
  "A child of the grape the world calls Zinfandel.", "Bokeria Kitchen & Wine, Domaldova, by the fish hall", "Bokeria Kitchen Wine Split Croatia"),
 ("Tribidrag", "TREE-bee-drag", True, "The old Dalmatian red that turned out to be Zinfandel.",
  "Found as nine old vines in Kaštela in 2001; now replanted round the bay.", "Zinfandel Food & Wine Bar, Centre — ask for a Kaštela bottle", "Zinfandel Food Wine Bar Split Croatia"),
 ("Travarica", "tra-VA-ree-tsa", False, "Grape rakija steeped with herbs, poured small before the meal.",
  "The truest Dalmatian opening gesture.", "Any konoba of Varoš; ask for the house's own", "Veli Varos Split Croatia"),
]
DISHES = [
 ("Gregada", "White fish — scorpionfish, weever, bream, whatever the boat brought — layered with potatoes and simmered in white wine, olive oil, garlic and parsley, with no tomato at all. It is the older of the coast's two fish stews, and the one the Hvar fishermen claim.", "Hvar and the islands"),
 ("Brodet", "Several fish stewed with onion, tomato and wine and never stirred — the pan is shaken so the fish stays whole — served on white polenta. The tomato and the polenta are the Venetian side of the family; its cousin across the water is brodetto.", "The whole Dalmatian shore"),
 ("Peka", "Not a recipe but a method: meat or octopus with potatoes, onion and rosemary under an iron bell heaped with embers, cooking in its own steam for two hours or more. The setup takes time, so it is ordered a day ahead: a peka served in fifteen minutes was not cooked for you. Lamb, veal and octopus are the three classics.", "Dalmatia, inland and island"),
 ("Pašticada", "A joint of beef larded with garlic and cloves, marinated in wine vinegar, then braised for hours with dried plums, Prošek and tomato until the sauce turns dark and sweet-sour, and served with gnocchi. A Sunday, wedding and winter dish: in August, ask how it was made.", "Dalmatia-wide"),
 ("Crni rižot", "Risotto coloured black with cuttlefish and its ink, with onion, garlic and white wine, served loose rather than dry. Standard along the coast; each house argues about how much ink.", "The whole Adriatic shore"),
 ("Soparnik", "Two paper-thin sheets of dough round chopped chard, spring onion, garlic and parsley in a lot of olive oil, baked on the hearth under embers and brushed with oil and garlic. A medieval fasting dish with no meat and no cheese, registered as an EU protected geographical indication in 2016.", "Poljica, inland from Omiš"),
 ("Viška pogača", "A covered flatbread filled with salted anchovies, slow-cooked onion and a little tomato, baked in the bread ovens of Komiža. A distant cousin of pizza from a separate Adriatic tradition; in Split, ask the bakeries.", "Vis, the furthest island"),
 ("Pršut and Paški sir", "Pršut is the air-dried ham of Dalmatia, salted and hung in the dry bura wind, sometimes lightly smoked. Paški sir is the hard sheep's cheese of Pag, from native sheep grazing on salt-sprayed grass; it matures at least sixty days and became Croatia's first EU-protected cheese in 2019. Together they are the plate that opens a meal.", "Drniš and the hinterland; the island of Pag"),
]
DISH_WHERE = {
 "Gregada": '<a href="#venue-v04-konoba-fetivi">Konoba Fetivi</a>, Veli Varoš',
 "Pašticada": '<a href="#venue-v06-apetit">Apetit</a>, in the palace',
 "Crni rižot": '<a href="#venue-v04-konoba-fetivi">Konoba Fetivi</a> or <a href="#venue-v12-villa-spiza">Villa Spiza</a>',
 "Brodet": '<a href="#venue-v03-dvor">Dvor</a>, Firule',
 "Pršut and Paški sir": '<a href="#venue-v13-pazar-marche-vert">The Pazar</a>, in the morning',
}
# gem popups: born-here food origins (each kept to the guide's research and the 23 Oct checks)
GEMS = [
 {"id": "gem-soparnik", "pattern": "soparnik", "tag": "Poljica gem · born here", "name": "A pie for fasting days",
  "story": "Soparnik is the pie of Poljica, the old peasant republic in the hills between Split and Omiš: two sheets of dough "
           "round chard, onion and oil, baked on the open hearth under embers. It was food for days without meat, and its name has "
           "been protected by the EU since 2016, as Poljički soparnik.",
  "where": "Poljica, inland from Omiš; in Split, ask at the Pazar."},
 {"id": "gem-pogaca", "pattern": "Viška pogača", "tag": "Vis gem · born here", "name": "The fishermen's pie",
  "story": "On Vis, the furthest island, the bread ovens of Komiža bake pogača: dough round salted anchovies, slow onion and a "
           "little tomato. It is what the boats took to sea, and it is the island's own, not an import from across the water.",
  "where": "Komiža and Vis town, on the island; a few Split bakeries make it."},
 {"id": "gem-crljenak", "pattern": "Crljenak Kaštelanski", "tag": "Kaštela gem · born here", "name": "The red of Kaštela",
  "story": "Crljenak Kaštelanski means ‘the red of Kaštela’, the string of villages up the bay from Split. It was under that name "
           "that the grape the world knows as Zinfandel was found in 2001; its story is told in the history fold.",
  "where": "Kaštela, fifteen kilometres up the bay; by the glass at the wine bars in the centre."},
]
