"""La liste for Bozcaada-NorthAegean (27 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's old eat/drink folds and the 27 Oct venue and card packs
(research/verify_*.json, research/rewrite_*.json); every 'where' is a venue kept in the tables or a card kept in the larder or the bars.
Also The Dish (DISHES, DISH_WHERE), the gems, the photos, the lane leads and the guest-list lines (written after the 27 Oct re-check).
The old guide's 'ada mantısı fried before it is sauced' and its mafiş were not found in any source on 27 Oct: neither is printed."""
TAL = "Talay Şarapçılık Lale Sokak 5 Bozcaada Çanakkale Türkiye"
ASM = "Asmalı Meyhane Çınar Çarşı Caddesi 20 Bozcaada Çanakkale Türkiye"
SAN = "Sandal Restaurant Alsancak Sokak 31 Bozcaada Çanakkale Türkiye"
MK = "Bozcaada pazarı Bozcaada Çanakkale Türkiye"
CIC = "Çiçek Pastanesi Bozcaada Çanakkale Türkiye"
LISTE = [
 ("Çavuş, the dry white", "chah-VOOSH", True, "The island’s big pale table grape, made into a dry white wine.",
  "A grape most of the world only eats, here made into wine; the table grape itself is a registered GI.", "The tasting counter at Talay’s shop, Lale Sokak, in town", TAL),
 ("Vasilaki", "vah-see-LAH-kee", False, "The island’s other white grape: crisp, high in acid.",
  "One of the four grapes the island grows and almost nobody else does.", "Talay’s shop in town, from the family’s own vines", TAL),
 ("Karalahna", "kah-rah-LAH-nah", False, "The island’s dark, tannic red grape.",
  "The red to taste beside Kuntra, to learn the island’s two reds.", "Talay’s shop in town", TAL),
 ("Kuntra", "KOON-trah", False, "The island’s lighter red grape.",
  "Talay blends it with Cabernet: taste the blend and the native grape in one glass.", "Talay’s Cabernet Sauvignon–Kuntra, at the shop in town", TAL),
 ("Corpus", "KOR-poos", True, "Corvus’s flagship red, about two-thirds Cabernet, from the estate at Tuzburnu.",
  "The bottle that made the island a name in serious wine.", "Corvus, at the estate; visiting has been summer-only, so ask first", "Corvus Bağcılık Bozcaada Çanakkale Türkiye"),
 ("Rakı", "rah-KUH", True, "The anise spirit, poured with cold water so it turns milky, drunk slowly with the meze.",
  "Not an island product, but the island’s meal: the wine is the souvenir, the rakı is dinner.", "Under the vine at Asmalı Meyhane", ASM),
 ("Kalamar on the coals", "kah-lah-MAR", True, "Island squid grilled plain over charcoal, not battered.",
  "The way the island has cooked its squid since before the fried mainland version.", "Asmalı Meyhane, Çınar Çarşı Caddesi", ASM),
 ("Raw fish with basil", "", False, "Raw fish dressed with torn basil, the quiet plate of the meyhane.",
  "The meyhane’s second signature, beside the squid.", "Asmalı Meyhane", ASM),
 ("Sandal borani", "sahn-DAHL bo-rah-NEE", False, "The house borani of Sandal, a cold yoghurt meze named for the restaurant.",
  "Eaten in what was the island’s old coffeehouse, on the street that was its bazaar.", "Sandal, Alsancak Sokak", SAN),
 ("Damla sakızlı enginar", "dahm-LAH sah-kuz-LUH en-gee-NAR", False, "Artichoke scented with mastic, a cold meze.",
  "Mastic, the Aegean resin, in a savoury plate: the island’s Greek pantry in one bite.", "Sandal, Alsancak Sokak", SAN),
 ("Bozcaada Bombası", "boz-JAH-ah-dah BOM-bah-suh", False, "Nevreste’s stuffed house meze, the plate reviewers name first.",
  "Made by one house only.", "Nevreste, Alsancak Sokak", "Nevreste Alsancak Sokak 22 Bozcaada Çanakkale Türkiye"),
 ("Mantı", "mahn-TUH", False, "Small hand-pinched dumplings under garlic yoghurt and chilli butter.",
  "The home-cooking plate of the island, made by hand in a family kitchen.", "Dört Hanımeli, in town", "Dört Hanımeli Bozcaada Çanakkale Türkiye"),
 ("Enginarlı ahtapot", "en-gee-nar-LUH ah-tah-POT", False, "Octopus and artichoke in a cream sauce with rosemary.",
  "What an island cook does with the island’s two best ingredients.", "Ada’m, Alsancak Sokak", "Adam Restaurant Alsancak Sokak 42 Bozcaada Çanakkale Türkiye"),
 ("Domates reçeli", "do-MAH-tes reh-cheh-LEE", True, "Tomato jam, cooked in late summer and sold by the jar.",
  "Sweet against salty white cheese: the island’s best-known preserve.", "The weekly market, by the jar", MK),
 ("Çavuş grapes, fresh", "chah-VOOSH", False, "The registered table grape, big and pale gold, eaten off the bunch.",
  "Only in late summer: if you are here at harvest, this is the taste of the island.", "The weekly market, in season", MK),
 ("Bademli kurabiye", "bah-dem-LEE koo-rah-bee-YEH", True, "The mastic-almond cookie of the Rum kitchen, baked in a wood-fired oven.",
  "A Greek recipe still made on the island, and on Gökçeada and in Kavala.", "Çiçek Pastanesi", CIC),
 ("Mastic ice cream", "sah-KUZ-luh don-door-MAH", False, "Dondurma flavoured with mastic resin, from the pastane’s counter.",
  "Chase the wild-fig one too when the island’s figs are in.", "Çiçek Pastanesi, in summer", CIC),
]
LANE_LEAD_TEXT = {
 "meyhane": "The three meze houses of the old bazaar streets: the 1950 meyhane under its vine for squid off the coals, the old coffeehouse with fifty meze, and the courtyard under a rose tree.",
 "home": "The island’s home cooking: a family kitchen for mantı and stuffed courgette flowers, and a checked-cloth room for octopus with artichokes.",
 "cellar": "The three ways to taste the island’s grapes: the 1948 family firm’s shop in town, the architect’s estate at Tuzburnu, and the Austrian family cellar among the vines.",
 "street": "The weekly market of the growers, and the wood-fired pastane of the mastic cookie and the fig ice cream.",
}
SHORT_SUB_TEXT = {
 "Last minute — save the night": "The booking fell through: Sandal or Ada’m, on the same short street, where a table often turns. Neither has published its winter days: in the cold months, call before you cross.",
 "Plan ahead — this week": "Dört Hanímeli for the home-cooked plates, and a tasting at Talay’s shop in town (a paid flight at the counter). Call both ahead out of season.",
 "Plan ahead — the grand night": "Asmalı Meyhane under its vine, or Nevreste’s courtyard under the rose tree: book a day or two ahead in summer. None of the island’s tables has published a winter calendar for 2026: from November to April, call first.",
}
SHORT_SUB_TEXT["Plan ahead — this week"] = SHORT_SUB_TEXT["Plan ahead — this week"].replace("Hanímeli", "Hanımeli")

DISH_DESC = "Seven plates and jars and their honest passports: which are the island’s own, which it shares with the Aegean, and which came with the meyhane."
DISHES = [
 ("Kalamar on the coals", "Island squid laid over charcoal and grilled plain, with lemon and olive oil, rather than battered and fried as the mainland prefers it. It is the plate the meyhanes of the old bazaar streets are known for, and it arrives after the cold meze, before the fish.", "The fishing island’s own way with squid; the meyhane is shared with the whole Aegean coast"),
 ("Domates reçeli", "Tomato jam: island tomatoes cooked down with sugar at the end of summer, when there are more than anyone can eat, and sold by the jar all year. Eaten at breakfast against a salty white cheese, the sugar cut by the salt. It carries no geographical indication: the island’s only registered product is the Çavuş grape.", "The island’s best-known preserve"),
 ("Mantı", "Small dumplings of dough pinched by hand around a little filling, boiled, then dressed with garlic yoghurt and red-pepper butter. The island’s home-cooking kitchens make them by hand; the dish itself is Anatolian, far older and wider than the island.", "Anatolian, cooked here in the island’s family kitchens"),
 ("Damla sakızlı enginar", "Artichoke cooked in olive oil and scented with mastic, the resin of the Aegean lentisk tree, served cold as a meze. Mastic runs through the island’s sweets too, in the almond cookie and the ice cream: a flavour of the Greek Aegean kept in Turkish kitchens.", "The Aegean’s olive-oil kitchen; mastic from the islands"),
 ("Enginarlı ahtapot", "Octopus and artichoke together, cooked in a cream sauce with rosemary: a cook’s plate rather than a canon, made on the island from two things the island has in season.", "A modern island cook’s plate"),
 ("Bademli kurabiye", "A small almond cookie flavoured with mastic, baked in a wood-fired stone oven at the island’s pastane and sold by the bag. The recipe is the Rum community’s, the Greek Orthodox families who made the island’s wine for centuries, and it is still baked on Gökçeada and in Kavala.", "The Rum kitchen of the north Aegean islands"),
 ("Rakı", "The anise-flavoured spirit distilled from grapes, poured with cold water so it turns milky white, and drunk slowly through a long meyhane meal. It is not made on the island; it is how the island eats.", "Turkish; the meyhane’s drink everywhere"),
]
DISH_WHERE = {
 "Kalamar on the coals": '<a href="#venue-v04-asmali-meyhane">Asmalı Meyhane</a>, or <a href="#venue-v12-sandal">Sandal</a>',
 "Domates reçeli": 'the <a href="#venue-v07-wednesday-market">weekly market</a>, by the jar',
 "Mantı": '<a href="#venue-v05-dort-hanimeli">Dört Hanımeli</a>',
 "Damla sakızlı enginar": '<a href="#venue-v12-sandal">Sandal</a>',
 "Enginarlı ahtapot": '<a href="#venue-v11-adam">Ada’m</a>',
 "Bademli kurabiye": '<a href="#venue-v03-cicek-pastanesi">Çiçek Pastanesi</a>, by the bag',
 "Rakı": 'under the vine at <a href="#venue-v04-asmali-meyhane">Asmalı Meyhane</a>',
}

GEMS = [
 {"id": "gem-domates-receli", "pattern": "tomato jam", "tag": "Bozcaada gem · born here", "name": "Jam from a vegetable",
  "story": "The island cooks its late-summer tomatoes down with sugar into a jam and sells it by the jar all year. It is eaten at breakfast "
           "against salty white cheese. It is not a registered product: the only one the island has is the Çavuş grape.",
  "where": "The weekly market; the stalls of the castle square."},
 {"id": "gem-cavus", "pattern": "Çavuş", "tag": "Bozcaada gem · born here", "name": "The grape with a registration number",
  "story": "Bozcaada Çavuş Üzümü is a designation of origin, number 497 at the Turkish patent office, registered on 2 June 2020: a big, "
           "pale-gold table grape. The same grape is made into a dry white wine at the island’s cellars.",
  "where": "Fresh at the market in late summer; in the glass at Talay’s shop."},
 {"id": "gem-mastic", "pattern": "mastic", "tag": "Aegean gem", "name": "The resin in the cookie",
  "story": "Mastic is the resin of the lentisk tree of the Aegean islands, sold as small clear tears. On Bozcaada it flavours the almond "
           "cookie of the Rum kitchen, an ice cream, and a cold artichoke meze.",
  "where": "Çiçek Pastanesi for the cookie and the ice cream; Sandal for the artichoke."},
]
PHOTOS = [
 {"src": "/terroir/Bozcaada-NorthAegean/img/bozcaada-town.jpg", "caption": "The harbour town under its castle, on the island the Greeks called Tenedos.",
  "credit": "Photo: Filanca · CC BY-SA 3.0 · Wikimedia"},
 {"src": "/terroir/Bozcaada-NorthAegean/img/bozcaada-vineyard.jpg", "caption": "A vineyard road through the island’s defining crop, the vines pruned low against the wind.",
  "credit": "Photo: Raicem · CC BY-SA 4.0 · Wikimedia"},
 {"src": "/terroir/Bozcaada-NorthAegean/img/bozcaada-castle.jpg", "caption": "The fortress Mehmet II rebuilt in 1455, guarding the harbour and the strait.",
  "credit": "Photo: Kadı Kadı · CC BY 2.0 · Wikimedia"},
]
# the venue_hot lines are set in fixes.py from the hot pack (none for a venue whose winter opening is unknown)
