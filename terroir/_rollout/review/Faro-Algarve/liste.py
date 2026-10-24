"""La liste for Faro-Algarve (24 Oct 2026): what to eat and drink before you leave, each with its best place.
(name, say, fav, what, why, where-text, maps query). Facts from the guide's dish fold, drink cards and the verified venue packs;
every 'where' is a venue kept in the tables or a card kept in the larder or the bars. Also The Dish (DISHES, DISH_WHERE) and the gems.
Corrected on 24 Oct: Dom Rodrigo's IGP is national (decision 17 Nov 2025, published 9 Dec 2025), the EU registration still pending —
not 'January 2026'; the clam's 'DOP' and '90 % of national output' were not found and are dropped."""
LISTE = [
 ("Cataplana", "ka-ta-PLA-na", True, "Clams, prawns, fish and chouriço sealed in the hinged copper pot and steamed, opened at the table.",
  "The pot and the dish share one name; a real one takes half an hour and arrives closed.", "Tasca do Ricky, Rua do Forno — order it when you sit down", "Tasca do Ricky Rua do Forno 21 Faro Portugal"),
 ("Arroz de lingueirão", "a-ROSH de leen-gay-ROWNG", True, "A wet rice of the lagoon's razor clams, served loose in its own broth.",
  "The Ria Formosa's own rice, eaten from a spoon, not a fork.", "Estaminé, on Ilha Deserta, or Tasca do Ricky in the Baixa", "Tasca do Ricky Rua do Forno 21 Faro Portugal"),
 ("Amêijoas à Bulhão Pato", "a-MAY-zhwash a bool-YOWNG PA-too", False, "Lagoon clams opened in olive oil, garlic, coriander and lemon.",
  "The simplest test of a kitchen that has good clams; named for a 19th-century poet.", "Tasca do Ricky, Rua do Forno", "Tasca do Ricky Rua do Forno 21 Faro Portugal"),
 ("Polvo", "POL-voo", False, "Octopus, grilled, in a rice, or cold in a salad with onion and coriander.",
  "Santa Luzia, by Tavira, calls itself the octopus capital and still sets its traps in the lagoon.", "Alameda in Faro, or buy it at the Mercado de Olhão", "Mercado de Olhao Olhão Portugal"),
 ("Sardinhas assadas", "sar-DEEN-yash a-SA-dash", False, "Sardines grilled whole over charcoal, on bread that drinks the oil.",
  "A summer dish: at their best from June, and not something to order in November.", "Adega Nova, Rua Francisco Barreto — in summer; frozen out of season", "Adega Nova Rua Francisco Barreto Faro Portugal"),
 ("Peixinhos da horta", "pay-SHEEN-yoosh da OR-ta", False, "Green beans fried in a light batter: ‘little fish from the garden’.",
  "The fried bean often said to have gone to Japan as tempura; the card on the curiosities tells it straight.", "A Venda, Rua do Compromisso — call in winter", "A Venda Rua do Compromisso Faro Portugal"),
 ("Bifana", "bee-FA-na", True, "Thin pork steak marinated in wine and garlic, off the griddle into a crusty roll.",
  "The town's breakfast and its standing lunch, at a counter inside the market.", "Snack Bar da Xica, inside the Mercado Municipal — cash, mornings", "Mercado Municipal de Faro Portugal"),
 ("Dom Rodrigo", "dong ro-DREE-goo", False, "Egg-yolk threads, almond and sugar, wrapped in twisted coloured foil.",
  "A convent sweet of the Algarve, given a national protected name in December 2025.", "Pastelaria Gardy, Rua de Santo António", "Pastelaria Gardy Rua de Santo Antonio Faro Portugal"),
 ("Flor de sal", "flor de SAL", False, "The fine top crust of the salt pans, skimmed by hand in summer.",
  "Tavira's sea salt carries a protected name; a pinch on grilled fish is the point.", "The Mercado de Olhão, or the salt pans at Tavira", "Mercado de Olhao Olhão Portugal"),
 ("Negra Mole", "NEH-gra MO-leh", True, "The Algarve's own red: pale, soft, fresh, almost a rosé to look at.",
  "An old grape the bulk-wine years nearly lost, now made by a handful of growers.", "Bago Wine Bar, in the Baixa — ask for a Negra Mole from the Algarve", "Bago Wine Bar Faro Portugal"),
 ("Arinto", "a-REEN-too", False, "A white that keeps its lemon and its edge in the southern heat.",
  "The glass the clams and the cataplana want.", "With the clams at Tasca do Ricky", "Tasca do Ricky Rua do Forno 21 Faro Portugal"),
 ("Medronho", "me-DRON-yoo", True, "A clear spirit distilled from the red fruit of the strawberry tree in the hills of Monchique.",
  "The digestif of the Algarve; drink it at room temperature, not iced.", "After dinner at any tasca; or the still at Marmelete, in Monchique", "Marmelete Monchique Portugal"),
 ("Bica", "BEE-ka", False, "A short black coffee, drunk standing at the counter.",
  "The town's punctuation: one in the morning, one after lunch, one after dinner.", "Café Aliança on the Jardim, or Gardy", "Pastelaria Gardy Rua de Santo Antonio Faro Portugal"),
 ("Figo e amêndoa", "FEE-goo ee a-MEN-dwa", False, "Dried figs and almonds of the barrocal, the orchards behind the coast.",
  "What the Algarve ate and sold before tourism; in the markets all winter.", "The Mercado Municipal de Faro, in the morning", "Mercado Municipal de Faro Portugal"),
]
DISHES = [
 ("Cataplana", "Clams, prawns, a white fish, sliced chouriço, peppers, onion, garlic, white wine and coriander, sealed inside the domed copper pot — two halves hinged like a shell — and steamed over a single flame for about half an hour. The lid is lifted at the table and the steam carries the lagoon. The vessel and the dish share a name; if it arrives open in fifteen minutes, it is a stew.", "The Algarve; the pot itself is hammered by the coppersmiths of Loulé"),
 ("Arroz de lingueirão", "The razor clam of the Ria Formosa lives upright in the sandy banks; the harvesters pour salt into its breathing hole and it comes up out of the sand. The rice is cooked in a deep shellfish stock and served wet, the broth pooling in the dish, the clams giving it a long mineral finish.", "The Ria Formosa"),
 ("Amêijoas à Bulhão Pato", "The good lagoon clam, opened in seconds in olive oil with a lot of crushed garlic, fresh coriander, lemon and a splash of white wine. Nearly the simplest dish on the menu and the clearest test of whether the clams are good. It carries the name of the 19th-century poet Raimundo António de Bulhão Pato.", "Portugal-wide; the clams are the Ria Formosa's"),
 ("Polvo", "Octopus taken in traps in the lagoon and off the coast — once in clay pots, now mostly in cage traps baited with sardine — and served grilled with potatoes, cooked in a wet rice, or cold as a salad with onion, peppers and coriander. Santa Luzia, by Tavira, calls itself the octopus capital, and its lagoon front is stacked with the traps.", "Santa Luzia and the eastern lagoon"),
 ("Sardinhas assadas", "Atlantic sardines grilled whole over open charcoal, bone in, outside the tascas in summer, and laid on bread with a salad of tomato and pepper so the bread takes the oil. They are at their fattest from June, the month of Santo António; the smoke is part of the dish. Out of season they are frozen: do not order them in winter.", "The whole Portuguese coast"),
 ("Peixinhos da horta", "Long green beans dipped in a light batter and fried — ‘little fish from the garden’, a dish for the days without meat. The story that Portuguese missionaries took it to Japan, where it became tempura, is told on its own card, with what the sources argue.", "Portugal-wide"),
 ("Choco frito", "Cuttlefish cut in strips, briefly marinated, floured and fried fast. The test is the texture: tender means it was cooked a minute, rubbery means it was cooked five. It is the civic dish of Setúbal, to the north, and has travelled south along the coast.", "Setúbal, adopted down the coast"),
 ("Dom Rodrigo", "Threads of egg yolk cooked in syrup, bound with almond, sugar and cinnamon, rolled and wrapped in coloured foil twisted at both ends. A convent sweet of the Algarve, said to be named for a governor of the region; Lagos claims it. In December 2025 it was given a national protected geographical indication, and the European registration is pending.", "The Algarve's convents; Lagos claims it"),
]
DISH_WHERE = {
 "Cataplana": '<a href="#venue-v04-tasca-do-ricky">Tasca do Ricky</a>, Rua do Forno',
 "Arroz de lingueirão": '<a href="#venue-v03-estamin-ilha-deserta">Estaminé</a>, on the island, or <a href="#venue-v04-tasca-do-ricky">Tasca do Ricky</a>',
 "Amêijoas à Bulhão Pato": '<a href="#venue-v04-tasca-do-ricky">Tasca do Ricky</a>; the clams themselves at the <a href="#venue-v11-mercado-de-olh-o">Mercado de Olhão</a>',
 "Polvo": 'the fish hall of the <a href="#venue-v11-mercado-de-olh-o">Mercado de Olhão</a>, to cook aboard',
 "Choco frito": '<a href="#venue-v08-adega-nova">Adega Nova</a>, by the station',
 "Peixinhos da horta": '<a href="#venue-v09-a-venda">A Venda</a>, Rua do Compromisso — call in winter',
}
# gem popups: born-here food origins (each kept to the guide's research and the 24 Oct checks)
GEMS = [
 {"id": "gem-lingueirao", "pattern": "lingueirão", "tag": "Ria Formosa gem · born here", "name": "The clam that hides upright",
  "story": "The razor clam of the Ria Formosa lives standing in the sandy banks of the lagoon, with only its breathing hole showing. "
           "The harvesters pour salt into the hole and the clam rises out of the sand to escape it. The wet rice made with it is the "
           "lagoon's own dish.",
  "where": "The Ria Formosa; on the table at the island lunch and in the tascas of the Baixa."},
 {"id": "gem-negramole", "pattern": "Negra Mole", "tag": "Algarve gem · born here", "name": "The pale red",
  "story": "Negra Mole is the Algarve's own old red grape, pale and soft, with berries of several shades on one bunch. The bulk-wine "
           "years nearly lost it; a handful of growers west of Faro now bottle it alone, as a light red, a rosé and a sparkling wine.",
  "where": "Lagoa and Silves, an hour west; by the glass at the wine bar in the Baixa."},
 {"id": "gem-domrodrigo", "pattern": "Dom Rodrigo", "tag": "Algarve gem · born here", "name": "The sweet in coloured foil",
  "story": "The little parcels in twisted foil on every pastelaria counter of the Algarve are Dom Rodrigo, a convent recipe the region "
           "keeps as its own: unwrap it into a saucer and eat it with a spoon. Lagos says it was born there.",
  "where": "The pastelarias of the Baixa; Lagos, an hour and a quarter west."},
]
