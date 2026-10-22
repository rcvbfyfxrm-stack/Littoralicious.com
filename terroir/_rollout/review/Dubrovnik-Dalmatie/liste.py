"""La liste for Dubrovnik-Dalmatie (22 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's dish articles, gem stories, drink cards and the
verified venue packs; every 'where' is a venue kept in the tables or a card kept in the larder or the bars."""
LISTE = [
 ("Mali Ston oysters", "MAH-lee ston ka-MEN-ee-tseh", True, "The European flat oyster, raw with lemon, from the brackish bay where it grows.",
  "Farmed in the bay since Roman times, and protected by an EU designation since 2020.", "Bota Šare, Mali Ston — at the bay, an hour north; call for winter hours", "Bota Sare Mali Ston Croatia"),
 ("Šporki makaruli", "SHPOR-kee ma-ka-ROO-lee", True, "Hand-cut macaroni under a slow beef ragù with bay and cloves.",
  "The city’s own pasta, eaten above all in the week of St Blaise.", "Kopun, Poljana Ruđera Boškovića, Old Town", "Kopun Poljana Rudera Boskovica Dubrovnik Croatia"),
 ("Crni rižot", "TSUR-nee REE-zhot", False, "Risotto made black with cuttlefish and its ink.",
  "The Adriatic’s own black rice, which Dalmatia insists is no copy of Venice.", "Proto, Široka, Old Town — open all year", "Proto Fish Restaurant Dubrovnik Croatia"),
 ("Janjetina ispod peke", "YAN-yeh-tee-na EES-pod PEH-keh", True, "Lamb and potatoes cooked for hours under an iron bell in the embers.",
  "Cooked to your arrival, so it has to be ordered hours ahead.", "Konoba Dubrava, Bosanka — order ahead, and call to check it is open", "Konoba Dubrava Bosanka Dubrovnik Croatia"),
 ("Pašticada", "pash-tee-TSA-da", False, "Beef braised for hours in wine and dried fruit, with gnocchi.",
  "A two-day dish of the whole Dalmatian coast; ask before you count on it.", "The konobas of the coast — ask a day ahead; Konoba Konavoski Dvori, Ljuta, for the country table", "Konoba Konavoski Dvori Ljuta Konavle Croatia"),
 ("Ćevapi", "CHEH-va-pee", False, "Grilled minced-meat fingers in lepinja bread, with raw onion and ajvar.",
  "The Bosnian grill inside the walls holds a MICHELIN Bib Gourmand.", "Taj Mahal, Nikole Gučetića, Old Town", "Taj Mahal Nikole Gucetica Dubrovnik Croatia"),
 ("Pršut sandwich", "PUR-shoot", False, "Dalmatian air-dried ham and cheese in the house bread.",
  "The cheapest good lunch inside the walls, eaten standing.", "Buffet Škola, Antuninska, Old Town", "Buffet Skola Antuninska Dubrovnik Croatia"),
 ("Arancini", "a-ran-CHEE-nee", False, "Candied bitter-orange peel rolled in sugar — not rice balls.",
  "The city’s confection, made from the part of the orange others throw away.", "Kopun, Old Town, where they come with the coffee; or the Gundulić Square stalls in the morning", "Kopun Poljana Rudera Boskovica Dubrovnik Croatia"),
 ("Rožata", "ro-ZHA-ta", False, "The city’s caramel custard, scented with rose liqueur.",
  "Dubrovnik’s own dessert; the Rozalin in it is what makes it so.", "The old houses of the Old Town; ask at Proto", "Proto Fish Restaurant Dubrovnik Croatia"),
 ("Stonska torta", "STON-ska TOR-ta", False, "A cake of macaroni, walnuts, chocolate and cinnamon in shortcrust.",
  "Ston’s strangest sweet, tied by tradition to the building of its walls.", "Ston and Mali Ston — ask at Bota Šare", "Bota Sare Mali Ston Croatia"),
 ("Plavac Mali", "PLA-vats MA-lee", True, "The native red of Dalmatia, dark and warm, from the Pelješac slopes.",
  "A close relative of California’s Zinfandel; taste it at the cellar door.", "Grgić Vina, Trstenik, Pelješac — call ahead", "Grgic Vina Trstenik Peljesac Croatia"),
 ("Dingač", "DEEN-gach", False, "Plavac Mali from the steepest south slope of Pelješac.",
  "Croatia’s first protected wine, 1961.", "Vinarija Miloš, Ponikve, Pelješac — by appointment", "Vinarija Milos Ponikve Ston Croatia"),
 ("Pošip", "POH-ship", False, "The white of Korčula: citrus, salt and almond.",
  "The glass the oysters want.", "D'vino Wine Bar, Palmotićeva, Old Town — in season", "D'vino Wine Bar Dubrovnik Croatia"),
 ("Travarica", "tra-VA-ree-tsa", False, "Grape rakija steeped with herbs, poured small before the meal.",
  "The truest Dalmatian opening gesture.", "Any konoba of the coast; Konoba Konavoski Dvori pours its own country rakija", "Konoba Konavoski Dvori Ljuta Konavle Croatia"),
]
DISH_WHERE = {
 "Šporki makaruli": '<a href="#venue-v05-kopun">Kopun</a>, Old Town',
 "Mali Ston oysters": '<a href="#venue-v07-bota-are-mali-ston">Bota Šare</a> or <a href="#venue-v08-vila-koruna">Vila Koruna</a>, Mali Ston',
 "Crni rižot": '<a href="#venue-v03-proto-fish-restaurant">Proto</a>, Old Town',
 "Janjetina ispod peke": '<a href="#venue-v06-konoba-dubrava">Konoba Dubrava</a>, Bosanka, ordered ahead',
}
