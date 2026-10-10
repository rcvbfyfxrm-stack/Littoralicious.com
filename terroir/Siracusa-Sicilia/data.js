window.TERROIR_DATA = (function () {
  const COLORS = {"berth":"#2d4a5e","market":"#d97706","shop":"#059669","mainland":"#7c3aed","logistics":"#2d4a5e"};
  const CAT_LABELS = {"berth":"Signature","market":"Market / Direct","shop":"Restaurant / Bar","mainland":"Out of town","logistics":"Logistics"};
  const PRODUCT_COLORS = {"Siracusa":"#2d4a5e","Val di Noto":"#a16207","Catania":"#1f2937","Etna":"#7f1d1d","Taormina":"#059669"};
  const VENUES = [
    {"id":"duomo","cat":"berth","tier":"berth_top","priority":1,"name":"Duomo","short":"Duomo","neighborhood":"Ibla, by the Cathedral of San Giorgio","maps":"https://www.google.com/maps/search/?api=1&query=Duomo+Ragusa+Sicilia","badge":"STARRED","tags":["€€€€","Essential"],"productTags":["Val di Noto"],"hours":"","why":"Two MICHELIN stars, and Gambero Rosso's top Sicilian score for 2026. Sultano names his eight-course menu 'Stupor Mundi', the 'wonder of the world', after Frederick II, the Hohenstaufen king of Sicily. MICHELIN singles out free-range lamb with a Sicilian 'mole' and a sea-and-mountain vegetable jus. The rooms are small, beside the cathedral of San Giorgio in Ibla.","address":"Via Capitano Bocchieri, 31, Ragusa","phone":"+39 0932 651265","status":"confirmed","statusChecked":"2026-10-04","lat":36.926697,"lng":14.741646,"category":"creme","subcat":"LA CRÈME","hook":"Ciccio Sultano's two-star in Ragusa Ibla, the reference table for modern Sicilian cooking.","person":"Ciccio Sultano","signature":"'Stupor Mundi' eight-course tasting menu","verdict":"The deepest single meal on this coast if you want Sicily argued from first principles.","caveat":"Rooms are small and intimate; book well ahead. Expensive.","price_range":"€€€€","reservation":"Essential","dishes":[{"name":"Free-range lamb with Sicilian 'mole', grilled green beans and a sea-and-mountain vegetable jus","note":"Cited by MICHELIN 2026 as a defining dish"},{"name":"Stupor Mundi tasting menu","note":"Eight courses; à la carte also offered"}],"signal_chip":{"label":"MICHELIN ★★ 2026","full":"MICHELIN 2026 ★★ · Gambero Rosso 2026 Tre Forchette (93)","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€€","book":"Essential","dress":"","warn":"Rooms are small and intimate; book well ahead. Expensive.","fit":"Ciccio Sultano's two-star in Ragusa Ibla, the reference table for modern Sicilian cooking."},"web":"https://www.cicciosultano.it/"},
    {"id":"cortile-spirito-santo","cat":"berth","tier":"berth_top","priority":2,"name":"Cortile Spirito Santo","short":"Cortile Spirito Santo","neighborhood":"Ortigia","maps":"https://www.google.com/maps/search/?api=1&query=Cortile+Spirito+Santo+Ortigia+Sicilia","badge":"STARRED","tags":["Tasting menus €110-160 (Gambero Rosso, June 2025)","Recommended","Dinner, on the terrace"],"productTags":["Siracusa"],"hours":"","why":"Torrisi trained in Catania, then spent twelve years abroad, three at Bernard Loiseau's La Côte d'Or. When he won a star in late 2023 it was the first ever for Siracusa. His cooking reworks Sicilian memory: a 'scacciata catanese' turned into ravioli with cauliflower and sausage, and an almond dessert moulded in the shape of the island, the 'Assoluto di mandorla'.","address":"Via Salomone 21, Ortigia, Syracuse","phone":"+39 0931 181 5404","status":"confirmed","statusChecked":"2026-10-04","lat":37.056158,"lng":15.29464,"category":"creme","subcat":"LA CRÈME","hook":"Giuseppe Torrisi's one-star at Ortigia's southern tip, the city's first MICHELIN star.","person":"Giuseppe Torrisi","signature":"'Assoluto di mandorla (Made in Sicily)', an almond dessert shaped like the island","verdict":"The one starred table in Ortigia; technical, almost baroque, terrace in summer.","price_range":"Tasting menus €110-160 (Gambero Rosso, June 2025)","reservation":"Recommended","best_time":"Dinner, on the terrace","dishes":[{"name":"Monkfish meunière, wild fennel and asparagus","note":"MICHELIN 2026"},{"name":"Ricordo di una 'scacciata' catanese","note":"Ravioli with cauliflower and sausage (Gambero Rosso 2025)"},{"name":"Assoluto di mandorla","note":"Almond dessert moulded as Sicily (MICHELIN)"},{"name":"Omaggio al Bosca","note":"Chocolate, tobacco and rum"}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"MICHELIN 2026 ★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"Tasting menus €110-160 (Gambero Rosso, June 2025)","book":"Recommended","dress":"","warn":"","fit":"Giuseppe Torrisi's one-star at Ortigia's southern tip, the city's first MICHELIN star."},"web":"https://www.cortilespiritosanto.com"},
    {"id":"crocifisso","cat":"berth","tier":"berth_top","priority":3,"name":"Crocifisso","short":"Crocifisso","neighborhood":"Noto","maps":"https://www.google.com/maps/search/?api=1&query=Crocifisso+Noto+Sicilia","badge":"STARRED","tags":["€€€","Recommended","Dinner"],"productTags":["Val di Noto"],"hours":"","why":"Up the hill from the cathedral, in a spare modern room with a glass-walled cellar facing the street, Marco Baglieri cooks what MICHELIN calls sophisticated, almost baroque food. The guide singles out artichoke done two ways on brioche with anchovy sauce, and cod with leek foam, cuttlefish ink, black truffle and basil oil. There are meat and vegetarian dishes too.","address":"Via Principe Umberto 46, Noto","phone":"+39 0931 968608","status":"confirmed","statusChecked":"2026-10-04","lat":36.894364,"lng":15.071331,"category":"creme","subcat":"LA CRÈME","hook":"Marco Baglieri's one-star in upper Noto, above the tourist stretch of the Corso.","person":"Marco Baglieri","signature":"Cod with leek foam, cuttlefish ink, black truffle and basil oil","verdict":"The serious table in Noto, above the tourist stretch of Corso Vittorio Emanuele.","caveat":"Closed Wednesdays (per MICHELIN page); dinner service.","price_range":"€€€","reservation":"Recommended","best_time":"Dinner","dishes":[{"name":"Artichoke two ways on brioche with anchovy sauce","note":"MICHELIN 2026"},{"name":"Cod, leek foam, cuttlefish ink, black truffle, basil oil","note":"MICHELIN 2026"},{"name":"Meat and vegetarian options","note":"Not only fish"}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"MICHELIN 2026 ★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€","book":"Recommended","dress":"","warn":"Closed Wednesdays (per MICHELIN page); dinner service.","fit":"Marco Baglieri's one-star in upper Noto, above the tourist stretch of the Corso."},"web":"https://ristorantecrocifisso.it/"},
    {"id":"dabbanna","cat":"shop","tier":"several","priority":4,"name":"Dabbanna","short":"Dabbanna","neighborhood":"Modica","maps":"https://www.google.com/maps/search/?api=1&query=Dabbanna+Modica+Sicilia","badge":"NEW WAVE","tags":["€€"],"productTags":["Val di Noto"],"hours":"","why":"Grandfather Carmelo opened the Cabbanna rotisserie in 1971 after coming home from Venezuela. His grandchildren now run Dabbanna opposite, and the South American thread shows: a ceviche called 'Ciauru ri mari', 'smell of the sea' in dialect. Gambero Rosso names Enrico Fichera as chef and mentions a poached egg with ricotta cream, hazelnuts and truffle.","address":"Piazza Principe di Napoli 8/9, Modica","phone":"+39 333 464 7935","status":"confirmed","statusChecked":"2026-10-04","lat":36.859575,"lng":14.761332,"category":"rising","subcat":"THE NEW WAVE","hook":"Grandchildren of a 1971 Modica rotisserie owner, cooking across the square from it.","person":"Enrico Fichera","signature":"'Ciauru ri mari' ceviche","verdict":"Family-history cooking with a Latin-American seam, run by a female dining team.","price_range":"€€","dishes":[{"name":"Ciauru ri mari","note":"Sicilian-dialect ceviche"},{"name":"Poached egg, ricotta cream, hazelnuts, bread and truffle","note":"Gambero Rosso 2024"}],"web":"https://www.dabbannamodica.it"},
    {"id":"lorenzo-ruta","cat":"shop","tier":"several","priority":5,"name":"Lorenzo Ruta","short":"Lorenzo Ruta","neighborhood":"Contrada Zimmardo, SP45 km 5 (Cambiocavallo resort)","maps":"https://www.google.com/maps/search/?api=1&query=Lorenzo+Ruta+Modica+Sicilia","badge":"NEW WAVE","tags":["€€€"],"productTags":["Val di Noto"],"hours":"","why":"Lorenzo Ruta cooks at the Cambiocavallo estate in Contrada Zimmardo, on the road out of Modica, with meat and fish tasting menus. Gambero Rosso picked out tortelli of mallard. The cellar, curated by sommelier Valentina Migliore, leans heavily on French wine and Champagne, unusual this deep in Sicily, and a reason to come with time and a driver.","address":"C.da Zimmardo SP45 km5,   RG, Modica","phone":"+39 338 498 1656","status":"confirmed","statusChecked":"2026-10-04","category":"rising","subcat":"THE NEW WAVE","hook":"Modica chef Lorenzo Ruta, with his family, in a countryside resort outside town.","person":"Lorenzo Ruta","signature":"Tortelli di germano reale","verdict":"The ambitious Modica table now that Accursio's fine-dining room has closed.","caveat":"Out of town, need a car.","price_range":"€€€","dishes":[{"name":"Mallard tortelli","note":"Gambero Rosso 2024"},{"name":"Meat and fish tasting menus","note":"MICHELIN"}],"web":"https://lorenzorutaristorante.it"},
    {"id":"cantine-pupillo","cat":"shop","tier":"several","priority":6,"name":"Cantine Pupillo — Castello del Solacium","short":"Cantine Pupillo","neighborhood":"Siracusa","maps":"https://www.google.com/maps/search/?api=1&query=Cantine+Pupillo+Siracusa+Sicilia","badge":"CANTINA","tags":["Book on cantinepupillo.it","11:00"],"productTags":["Siracusa"],"hours":"Tastings mornings, visit from about 11:00, cellar closes 14:00 (seen 2026-10-04)","why":"Antonino Pupillo founded the estate in the 1980s with one stated aim: to bring Moscato di Siracusa back to life when almost no one made it. Tastings are held at the Castello del Solacium in Contrada La Targia, on the northern edge of the city, in the morning, with a light lunch possible afterwards. A new wine bar, 'Targia', has been announced on its site.","address":"Contrada La Targia, 96100 Siracusa","phone":"+39 0931 494029","status":"confirmed","statusChecked":"2026-10-04","lat":37.103307,"lng":15.24102,"category":"cantine","subcat":"LE CANTINE","hook":"The estate that brought Moscato di Siracusa back, tasted in a castle at the city's edge.","person":"Pupillo family (founder Antonino Pupillo)","signature":"Moscato di Siracusa","verdict":"The one place to taste the wine Syracusans claim descends from the ancient Pollio.","caveat":"Morning only.","reservation":"Book on cantinepupillo.it","best_time":"11:00","dishes":[{"name":"Moscato di Siracusa","note":"the revived sweet white"},{"name":"Light lunch at the Solacium","note":"after the tasting"}],"web":"https://cantinepupillo.it"},
    {"id":"cos","cat":"shop","tier":"several","priority":7,"name":"COS","short":"COS","neighborhood":"SP3 Acate-Chiaramonte, km 14.3","maps":"https://www.google.com/maps/search/?api=1&query=COS+Vittoria+Sicilia","badge":"CANTINA","tags":["visite@cosvittoria.it"],"productTags":["Val di Noto"],"hours":"Office Mon-Fri 09:00-12:00, 14:30-16:30 (seen 2026-10-04)","why":"The name is three initials: Giambattista Cilia, Giusto Occhipinti and Cirino Strano, who started making wine in 1980. They went biodynamic and buried terracotta amphorae for fermentation and ageing, the origin of the Pithos wines. Their Cerasuolo di Vittoria, Nero d'Avola with Frappato, belongs to what is still Sicily's only DOCG, granted in 2005.","address":"SP3 Acate-Chiaramonte km 14.3, 97019 Vittoria (RG)","phone":"+39 0932 876145; visits +39 393 857 2630","status":"confirmed","statusChecked":"2026-10-04","lat":37.029912,"lng":14.522821,"category":"cantine","subcat":"LE CANTINE","hook":"The Vittoria estate three friends founded in 1980, which revived Sicilian wine in clay amphorae.","person":"Giusto Occhipinti, Titta Cilia","signature":"Pithos Rosso (amphora)","verdict":"A detour west of Noto, but the clay-pot wines explain Sicilian natural wine better than any bar.","caveat":"Office hours are weekday-only; book well ahead.","reservation":"visite@cosvittoria.it","dishes":[{"name":"Cerasuolo di Vittoria Classico","note":"Nero d'Avola and Frappato"},{"name":"Pithos Rosso / Bianco","note":"fermented in amphora"},{"name":"Frappato","note":"the light red of Vittoria"}],"web":"https://www.cosvittoria.it"},
    {"id":"arianna-occhipinti","cat":"shop","tier":"several","priority":8,"name":"Arianna Occhipinti","short":"Arianna Occhipinti","neighborhood":"Vittoria","maps":"https://www.google.com/maps/search/?api=1&query=Arianna+Occhipinti+Vittoria+Sicilia","badge":"CANTINA","tags":["booking.agricolaocchipinti.it"],"productTags":["Val di Noto"],"hours":"","why":"Arianna Occhipinti began on a few hectares at Fossa di Lupo, among red sand, limestone and dry-stone walls, and made a light, perfumed Frappato that natural-wine bars around the world now pour. The farm has grown: a shop for its own vegetables and preserves, and rooms to stay. The wines are named after the provincial road the vineyard sits on, SP68.","address":"SP68 Vittoria-Pedalino km 3.3, 97019 Vittoria (RG)","phone":"+39 0932 1865519","status":"confirmed","statusChecked":"2026-10-04","lat":36.989895,"lng":14.54434,"category":"cantine","subcat":"LE CANTINE","hook":"The Vittoria grower who made single-varietal Frappato famous, farming red sand at Fossa di Lupo.","person":"Arianna Occhipinti","signature":"SP68 Frappato","verdict":"Pair with COS for a day on Frappato.","reservation":"booking.agricolaocchipinti.it","dishes":[{"name":"Il Frappato","note":"the single-varietal that made the name"},{"name":"SP68 Rosso","note":"Frappato and Nero d'Avola"}],"web":"https://www.agricolaocchipinti.it"},
    {"id":"latteria-mamma-iabica","cat":"shop","tier":"plenty","priority":9,"name":"Latteria Mamma Iabica","short":"Latteria Mamma Iabica","neighborhood":"Via G.B. Perasso, just off Ortigia","maps":"https://www.google.com/maps/search/?api=1&query=Latteria+Mamma+Iabica+Siracusa+Sicilia","badge":"OSTERIA","tags":[],"productTags":["Siracusa"],"hours":"","why":"Open only since 2024, it was one of five places in Siracusa province to receive the Chiocciola, Slow Food's top mark, in Osterie d'Italia 2026. The cooking is traditional and built on short supply chains: burrata with ficazza, a cured tuna sausage, and octopus stewed 'alla Camilleri'. The name recalls the old dairy, the latteria, the building once was.","address":"Via G.B. Perasso 13, Siracusa","phone":"","status":"confirmed","statusChecked":"2026-10-04","lat":37.065376,"lng":15.28569,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"A young osteria (2024) just off Ortigia that already holds a Slow Food Chiocciola.","signature":"Burrata with ficazza di tonno","verdict":"The Slow Food pick in Siracusa city.","caveat":"Dish detail comes from the national tourism site, not a critic.","dishes":[{"name":"Burrata with ficazza di tonno","note":"Ficazza is a cured tuna sausage (italia.it)"},{"name":"Polpo in umido alla Camilleri","note":"Stewed octopus"}],"signal_chip":{"label":"Slow Food Chiocciola 2026","full":"Slow Food Osteria d'Italia 2026 Chiocciola","cosign":"Slow Food, Osterie d'Italia 2026"}},
    {"id":"don-camillo","cat":"shop","tier":"plenty","priority":10,"name":"Don Camillo","short":"Don Camillo","neighborhood":"Via Maestranza, near the Cathedral","maps":"https://www.google.com/maps/search/?api=1&query=Don+Camillo+Ortigia+Sicilia","badge":"OSTERIA","tags":["€€€"],"productTags":["Siracusa"],"hours":"","why":"Giovanni Guarnieri has run it since 1985, in a room of old tufa walls on Via Maestranza near the cathedral. It held a star for years and is listed, not starred, in MICHELIN 2026. The dish people come back for, according to Gambero Rosso, is the spaghetti delle Sirene with prawns and sea urchin.","address":"Via Maestranza 96, Ortigia, Syracuse","phone":"+39 0931 67133","status":"confirmed","statusChecked":"2026-10-04","lat":37.060775,"lng":15.296568,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"Ortigia's long-running serious restaurant since 1985, under 15th-century tufa vaults.","person":"Giovanni Guarnieri","signature":"Spaghetti delle Sirene, prawns and sea urchin","verdict":"The Ortigia classic; save room for dessert, MICHELIN says.","caveat":"No longer starred (it is listed, not starred, in 2026).","price_range":"€€€","dishes":[{"name":"Spaghetti delle Sirene","note":"Prawns and sea urchins (Gambero Rosso 2025)"},{"name":"Desserts","note":"MICHELIN's tip"}],"charter":{"price":"€€€","book":"Book ahead","dress":"","warn":"No longer starred (it is listed, not starred, in 2026).","fit":"Ortigia's long-running serious restaurant since 1985, under 15th-century tufa vaults."},"web":"https://www.ristorantedoncamillosiracusa.it/"},
    {"id":"regina-lucia","cat":"shop","tier":"plenty","priority":11,"name":"Regina Lucia","short":"Regina Lucia","neighborhood":"Piazza Duomo","maps":"https://www.google.com/maps/search/?api=1&query=Regina+Lucia+Ortigia+Sicilia","badge":"OSTERIA","tags":["€€€","Summer evening outside"],"productTags":["Siracusa"],"hours":"Wed–Mon 12:00–23:00, closed Tuesday (own site, seen 5 Oct 2026)","why":"The address is the point: Piazza Duomo 6, with outdoor tables looking at the Doric columns of the Temple of Athena built into the cathedral front. MICHELIN 2026 lists it for classic Sicilian dishes with a creative turn, and for its desserts. On a summer evening the square is lit and the stone glows.","address":"Piazza Duomo 6, Ortigia, Syracuse","phone":"+39 0931 22509","status":"confirmed","statusChecked":"2026-10-04","lat":37.058777,"lng":15.293064,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"Tables on Piazza Duomo facing a cathedral built inside a Greek temple.","signature":"Desserts","verdict":"Pay for the square; MICHELIN says don't skip dessert.","price_range":"€€€","best_time":"Summer evening outside","dishes":[{"name":"Classic Sicilian dishes, reinterpreted","note":"MICHELIN"},{"name":"Desserts","note":"MICHELIN tip"}],"charter":{"price":"€€€ (MICHELIN 2026 list)","book":"Phone +39 0931 22509: online takes 2–6 and dinner slots to 21:30; larger or later by phone","dress":"","warn":"Closed Tuesday","fit":"Tables on Piazza Duomo, open 12:00–23:00"},"web":"https://www.reginaluciaristorante.com/","hot_this_month":"October 2026: open Wed–Mon 12:00–23:00 — the verified last-minute table on Piazza Duomo (seen 5 Oct)."},
    {"id":"radici","cat":"shop","tier":"plenty","priority":12,"name":"Radici – L’Osteria di Accursio","short":"Radici – L’Osteria di Accursio","neighborhood":"Modica","maps":"https://www.google.com/maps/search/?api=1&query=Radici+%E2%80%93+L%E2%80%99Osteria+di+Accursio+Modica+Sicilia","badge":"OSTERIA","tags":["€€"],"productTags":["Val di Noto"],"hours":"","why":"Accursio Craparo held a MICHELIN star in Modica Bassa, then closed that dining room and moved into Radici, his osteria, losing the star by choice. MICHELIN 2026 lists Radici for traditional cooking with a personal touch. His old signature, 'Spremuta di Sicilia', pasta with anchovy, tuna bottarga and wild fennel, may or may not be on the menu: ask.","address":"Via Grimaldi 55, Modica","phone":"+39 331 236 9404","status":"confirmed","statusChecked":"2026-10-04","category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"Accursio Craparo gave up his starred room to cook generous trattoria food in Modica.","person":"Accursio Craparo","signature":"Traditional Modican dishes in generous portions","verdict":"A former one-star chef cooking trattoria food: excellent value.","caveat":"Not the old tasting-menu experience.","price_range":"€€","dishes":[{"name":"Traditional Sicilian dishes","note":"MICHELIN 2026"},{"name":"Spremuta di Sicilia","note":"Pasta with anchovy, tuna bottarga, wild fennel; signature of the old Accursio (Gambero Rosso 2024), ask if it survives"}],"web":"https://www.accursioradici.it/"},
    {"id":"taverna-la-cialoma","cat":"shop","tier":"plenty","priority":13,"name":"Taverna La Cialoma","short":"Taverna La Cialoma","neighborhood":"Piazza Regina Margherita","maps":"https://www.google.com/maps/search/?api=1&query=Taverna+La+Cialoma+Marzamemi+Sicilia","badge":"SEAFOOD","tags":["€€"],"productTags":["Val di Noto"],"hours":"","why":"The cialoma was the work-song of the tonnara crews as they hauled the nets, and the tavern sits in the old tuna fishery buildings on Piazza Regina Margherita. MICHELIN 2026 lists it for fresh fish simply cooked. Tables spill onto the piazza in front; behind, a terrace looks onto the sea.","address":"Piazza Regina Margherita 23, Marzamemi","phone":"+39 0931 841772","status":"confirmed","statusChecked":"2026-10-04","category":"seafood","subcat":"THE SEA ROOMS","hook":"A fish tavern inside Marzamemi's old tonnara, on the piazza with a sea terrace behind.","signature":"Simply prepared fresh fish","verdict":"The place to eat fish in Marzamemi.","caveat":"Summer crowds in the piazza.","price_range":"€€","dishes":[{"name":"Day's fish, simply cooked","note":"MICHELIN"},{"name":"Tuna preparations","note":"Marzamemi was a tuna-fishery village"}],"charter":{"price":"€€","book":"Book ahead","dress":"","warn":"Summer crowds in the piazza.","fit":"A fish tavern inside Marzamemi's old tonnara, on the piazza with a sea terrace behind."},"web":"https://www.tavernalacialoma.it"},
    {"id":"cortile-arabo","cat":"shop","tier":"plenty","priority":14,"name":"Cortile Arabo","short":"Cortile Arabo","neighborhood":"Vicolo Villadorata","maps":"https://www.google.com/maps/search/?api=1&query=Cortile+Arabo+Marzamemi+Sicilia","badge":"SEAFOOD","tags":["€€€"],"productTags":["Val di Noto"],"hours":"","why":"MICHELIN 2026 points to its terrace on the sea rocks in what it calls one of Sicily's most iconic fortified villages, once rich from its tuna fishery. The cooking is more elaborate than the fish taverns on the piazza, mostly seafood with a few meat dishes. It sits in Vicolo Villadorata, named for the princes who held the tonnara.","address":"Vicolo Villadorata, Marzamemi","phone":"+39 0931 841678","status":"confirmed","statusChecked":"2026-10-04","lat":36.741664,"lng":15.119889,"category":"seafood","subcat":"THE SEA ROOMS","hook":"Fish cooking on a terrace over the rocks at Marzamemi, MICHELIN-listed.","signature":"Fish dishes on the rock terrace","verdict":"The dressier option in Marzamemi.","price_range":"€€€","dishes":[{"name":"Fish-focused tasting dishes","note":"MICHELIN"},{"name":"A few meat dishes","note":""}],"web":"https://cortilearabo.it/"},
    {"id":"campisi","cat":"shop","tier":"plenty","priority":15,"name":"Campisi (conserve and restaurant)","short":"Campisi (conserve and restaurant)","neighborhood":"Marzamemi","maps":"https://www.google.com/maps/search/?api=1&query=Campisi+Marzamemi+Sicilia","badge":"SEAFOOD","tags":["€€"],"productTags":["Val di Noto"],"hours":"","why":"The Campisi date their conserve business to 1854 in Marzamemi, the tonnara village; the claim to be 'first in the world' at tuna is their marketing. The shop sells bottarga, ventresca and Pachino tomato conserves, and the restaurant, opened in 2010, puts its own bottarga on busiate, the twisted Sicilian pasta. It is the most direct way to taste what the tonnara left behind.","address":"Via Marzamemi 12b, Marzamemi (restaurant)","phone":"346 9420323","status":"unverified","statusChecked":"2026-10-04","lat":36.740857,"lng":15.116771,"category":"seafood","subcat":"THE SEA ROOMS","hook":"Marzamemi's tuna-conserve family, with a restaurant cooking its own bottarga.","person":"Campisi family","signature":"Busiate con bottarga di tonno","verdict":"Buy bottarga, ventresca and Pachino tomato conserves; eat the bottarga pasta.","caveat":"Restaurant season not confirmed for October 2026.","price_range":"€€","dishes":[{"name":"Busiate con bottarga di tonno","note":""},{"name":"Ventresca di tonno","note":"From the shop"}],"web":"https://www.campisiconserve.it/"},
    {"id":"caffe-sicilia","cat":"shop","tier":"plenty","priority":16,"name":"Caffè Sicilia","short":"Caffè Sicilia","neighborhood":"Corso Vittorio Emanuele","maps":"https://www.google.com/maps/search/?api=1&query=Caff%C3%A8+Sicilia+Noto+Sicilia","badge":"PASTRY","tags":["€–€€","No","Morning or late evening"],"productTags":["Val di Noto"],"hours":"Own site lists Mon–Thu 8:00–22:30, Fri–Sun 8:00–23:00 in one block and Mon–Thu 8:00–23:00, Fri–Sun 8:00–24:00 in another (seen 2026-10-04)","why":"Behind the counter is a laboratory where Corrado Assenza and his son Francesco work with small local growers: almonds from Noto, citrus, herbs, even vegetables in desserts. The fig-and-chilli and pepper-and-grapefruit granitas started there. Gambero Rosso's bar guide has given it its top marks for more than twenty years, and Netflix's Chef's Table: Pastry made Assenza known well beyond Sicily.","address":"Corso Vittorio Emanuele 125, 96017 Noto (SR)","phone":"+39 0931 835013","status":"confirmed","statusChecked":"2026-10-04","lat":36.891111,"lng":15.069702,"category":"pastry","subcat":"GRANITA, BRIOCHE & THE PASTICCERIA","hook":"Corrado Assenza's café on Noto's Corso, open since 1892, the reference for Sicilian pastry.","person":"Corrado Assenza, Francesco Assenza","signature":"Granita di mandorla","verdict":"Non-negotiable: almond granita, then whatever fruit is in season; buy almond butter for the galley.","caveat":"The site shows two different sets of hours on the same page; ring before a late visit.","price_range":"€–€€","reservation":"No","best_time":"Morning or late evening","dishes":[{"name":"Granita di mandorla","note":"Noto almonds"},{"name":"Cassata","note":"The baroque cake, pared back"},{"name":"Brioche col tuppo","note":""},{"name":"Latte di mandorla","note":""}],"signal_chip":{"label":"Gambero Rosso","full":"Gambero Rosso Pasticceri e Pasticcerie 2026 — Tre Torte; Bar d'Italia — Tre Chicchi e Tre Tazzine","cosign":"Gambero Rosso"},"web":"https://www.caffesicilia.it/","hot_this_month":"Gambero Rosso Pasticceri e Pasticcerie 2026: Tre Torte."},
    {"id":"antica-dolceria-bonajuto","cat":"shop","tier":"plenty","priority":17,"name":"Antica Dolceria Bonajuto","short":"Antica Dolceria Bonajuto","neighborhood":"Centre","maps":"https://www.google.com/maps/search/?api=1&query=Antica+Dolceria+Bonajuto+Modica+Sicilia","badge":"PASTRY","tags":["€"],"productTags":["Val di Noto"],"hours":"","why":"Francesco Bonajuto opened the business in 1880 as the Caffè Roma. A century later Franco Ruta and his son Pierpaolo went back to the old method: cocoa ground and worked cold, never conched, so the sugar stays crystalline. When the Modica IGP came in 2018 they stayed outside it, objecting that the rules allowed tempering and added ingredients. The shop still sells 'mpanatigghi, pastries filled with chocolate, almonds and minced beef.","address":"","phone":"","status":"confirmed","statusChecked":"2026-10-04","lat":36.860254,"lng":14.759912,"category":"pastry","subcat":"GRANITA, BRIOCHE & THE PASTICCERIA","hook":"Sicily's oldest chocolate maker (1880), which will not call its chocolate 'di Modica'.","person":"Pierpaolo Ruta","signature":"Cioccolato alla cannella","verdict":"Taste the cinnamon and vanilla bars and 'mpanatigghi; book the Fattojo bean-to-bar visit.","price_range":"€","dishes":[{"name":"Cinnamon chocolate","note":"Traditional 100 g bar"},{"name":"'Mpanatigghi","note":"Pastry with chocolate, almonds and minced beef"},{"name":"Candied orange in chocolate","note":""}],"web":"https://www.bonajuto.it/en/"},
    {"id":"rosy-bar","cat":"shop","tier":"plenty","priority":18,"name":"Rosy Bar","short":"Rosy Bar","neighborhood":"Via Risorgimento","maps":"https://www.google.com/maps/search/?api=1&query=Rosy+Bar+Modica+Sicilia","badge":"PASTRY","tags":["€"],"productTags":["Val di Noto"],"hours":"","why":"In Modica granita is made with the whole pulp of seasonal fruit, not only juice, so it comes out thicker: cremolata. Gambero Rosso's July 2026 guide names Rosy Bar on Via Risorgimento for it, listing cantaloupe, pear, wild strawberry, mulberry, peach, and fig with walnut and Modica chocolate. There is also a coffee spumone.","address":"Via Risorgimento 4, Modica (RG)","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"pastry","subcat":"GRANITA, BRIOCHE & THE PASTICCERIA","hook":"The Modica bar for cremolata, the town's fruit-pulp granita.","signature":"Cremolata","verdict":"Order the cremolata of the day; it is the local form, not the Catanese one.","price_range":"€","dishes":[{"name":"Cremolata di fichi","note":"With walnut and Modica chocolate"},{"name":"Spumone al caffè","note":""}]},
    {"id":"barcollo","cat":"shop","tier":"plenty","priority":19,"name":"Barcollo","short":"Barcollo","neighborhood":"Piazza Cesare Battisti, by the Temple of Apollo","maps":"https://www.google.com/maps/search/?api=1&query=Barcollo+Ortigia+Sicilia","badge":"COCKTAIL","tags":["€€","Advised in summer","21:00"],"productTags":["Siracusa"],"hours":"","why":"Forbes Italia put it in its 100 Innovative Restaurants of 2025 as one of the most interesting cocktail bars in southern Italy. Owner Martina Marchese runs the room; Andrea Franzò and Andrea Germiglio make the drinks; chef Davide Cucuzza, from Michelin-starred kitchens, sends out tapas that are real cooking. It moved recently to the piazzetta by the market, so you drink in the open with the temple in view.","address":"Piazza Cesare Battisti 6/8, 96100 Siracusa","phone":"","status":"unverified","statusChecked":"2025","lat":37.065848,"lng":15.293274,"category":"cocktail","subcat":"APERITIVO & COCKTAILS","hook":"Ortigia's cocktail bar with a kitchen, now in a small open piazza by the Temple of Apollo.","person":"Martina Marchese (owner)","signature":"A signature cocktail with Cucuzza's tapas","verdict":"Ortigia's best drink.","price_range":"€€","reservation":"Advised in summer","best_time":"21:00","dishes":[{"name":"Signature cocktails","note":"by Franzò and Germiglio"},{"name":"Tapas","note":"by chef Davide Cucuzza"}]},
    {"id":"grand-hotel-ortigia","cat":"shop","tier":"plenty","priority":20,"name":"Grand Hotel Ortigia — La Terrazza","short":"Grand Hotel Ortigia","neighborhood":"Viale Mazzini, facing the Porto Grande","maps":"https://www.google.com/maps/search/?api=1&query=Grand+Hotel+Ortigia+Ortigia+Sicilia","badge":"HOTEL BAR","tags":["€€€","Call ahead","Sunset"],"productTags":["Siracusa"],"hours":"Dinner 19:30–22:30 (hotel site, seen 5 Oct 2026)","why":"The hotel stands on Viale Mazzini on the mainland side of the bridge, looking straight across the Porto Grande to the Ortigia waterfront. Its rooftop, La Terrazza, runs an 'aperitivo al tramonto' and a roof-garden restaurant. From up there you see the anchorage, the marina and the whole western side of the island turn gold.","address":"Grand Hotel Ortigia, Siracusa","phone":"","status":"confirmed","statusChecked":"2026-10-04","lat":37.062774,"lng":15.290952,"category":"cocktail","subcat":"THE GRAND-HOTEL BARS","hook":"The roof terrace of Ortigia's grand hotel, facing the Porto Grande at sunset.","signature":"Sunset aperitivo","verdict":"One apéritif here to watch the Porto Grande go gold.","caveat":"Non-guest access not stated on site; call ahead.","price_range":"€€€","reservation":"Call ahead","best_time":"Sunset","dishes":[{"name":"Spritz or local spumante","note":"at sunset"},{"name":"Light bites","note":"with the aperitivo"}],"charter":{"price":"€€€","book":"Call +39 0931 464600; the hotel takes groups by agreement","dress":"","warn":"Dinner ends 22:30; non-guest access not stated, so call first","fit":"The rooftop over the marina, dinner 19:30–22:30"},"web":"https://www.grandhotelortigia.it","hot_this_month":"October 2026: rooftop dinner 19:30–22:30 (hotel site, 5 Oct); call — non-guest access is not stated."},
    {"id":"enoteca-solaria","cat":"shop","tier":"plenty","priority":21,"name":"Enoteca Solaria","short":"Enoteca Solaria","neighborhood":"Via Roma","maps":"https://www.google.com/maps/search/?api=1&query=Enoteca+Solaria+Ortigia+Sicilia","badge":"WINE BAR","tags":["€","Walk-in","19:00"],"productTags":["Siracusa"],"hours":"","why":"Arturo opened it in 2010 and filled it with bottles: reported to be over a thousand labels, around 80 percent natural, more than two-thirds Sicilian. Food is kept simple, bruschetta, cheese and salumi boards, so the wine leads. It is the place to try Etna and western Sicilian growers who rarely reach export markets.","address":"Via Roma, 96100 Siracusa (Ortigia)","phone":"","status":"unverified","statusChecked":"2026-10-04","category":"cocktail","subcat":"ENOTECHE & NATURAL WINE","hook":"Ortigia's natural-wine bar since 2010: over a thousand labels, two-thirds Sicilian.","person":"Arturo (founder)","signature":"Natural Sicilian wine by the glass","verdict":"Ortigia's wine bar; go early, sit at the counter, ask for Etna growers you cannot buy at home.","caveat":"Small; liveness for 2026 not confirmed on an own site.","price_range":"€","reservation":"Walk-in","best_time":"19:00","dishes":[{"name":"Bruschetta","note":"to go with the glass"},{"name":"Salumi and cheese boards","note":"light supper"}]},
    {"id":"caseificio-borderi","cat":"shop","tier":"plenty","priority":22,"name":"Caseificio Borderi","short":"Caseificio Borderi","neighborhood":"Ortigia","maps":"https://www.google.com/maps/search/?api=1&query=Caseificio+Borderi+Ortigia+Sicilia","badge":"STREET","tags":["€ (panini €8–10 reported 2026)","Before 10:30"],"productTags":["Siracusa"],"hours":"","why":"Don Pasquale Borderi founded the dairy; his son Andrea and grandson Gaetano run the stall now. Andrea, known as the panini maestro, builds each sandwich to order and talks you through it as he goes: house ricotta and mozzarella, aged cheeses, salumi, olives, tomatoes. The show is the reason for the queue, which in summer is reported at up to an hour and a half.","address":"Via Emanuele de Benedictis 6, Ortigia (reported)","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.065366,"lng":15.293503,"category":"street","subcat":"LA RUE","hook":"Three generations of cheesemakers whose market-stall sandwich became Ortigia's longest queue.","person":"Andrea Borderi","signature":"Panino with house ricotta","verdict":"Go before 10:30 or skip it in July–August; buy ricotta and mozzarella for the boat either way.","caveat":"Summer queues reported up to 1.5 hours; panini reported at €8–10; hours reported Mon–Sat 7:00–16:00 (secondary sources only).","price_range":"€ (panini €8–10 reported 2026)","best_time":"Before 10:30","dishes":[{"name":"House panino","note":"Built to order with house cheese"},{"name":"Ricotta fresca","note":"To take away"}]},
    {"id":"fratelli-burgio","cat":"shop","tier":"plenty","priority":23,"name":"Fratelli Burgio — La Salumeria","short":"Fratelli Burgio","neighborhood":"Ortigia","maps":"https://www.google.com/maps/search/?api=1&query=Fratelli+Burgio+Ortigia+Sicilia","badge":"STREET","tags":["€€"],"productTags":["Siracusa"],"hours":"","why":"The Burgio family has made Sicilian conserves since 1978. In the market they run La Salumeria, where you sit down among the fish stalls for a board: Piacentino ennese with saffron and peppercorns, pecorino with Bronte pistachio, Girgentana goat cheese, and filuneddu with caponata. The shelves around you hold the conserves and bottarga to take back on board.","address":"Ortigia market (Piazza Cesare Battisti 4, reported)","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"street","subcat":"LA RUE","hook":"A Siracusa conserve house since 1978, with a seated salumeria in the middle of the market.","person":"Burgio family","signature":"Tagliere with caponata","verdict":"The sit-down alternative to Borderi's queue; also the galley-stocking stop for conserves.","price_range":"€€","dishes":[{"name":"Tagliere misto","note":"Sicilian cheeses and salumi"},{"name":"Filuneddu con pecorino e caponata","note":""}],"web":"https://www.fratelliburgio.com/"}
  ];
  const NEIGHBORHOODS = [
    {"name":"Ortigia","desc":"Where Siracusa began, and still the place to sleep.","maps":"https://www.google.com/maps/search/?api=1&query=Ortigia+Siracusa"},
    {"name":"The Neapolis hill","desc":"The Greek theatre, the Ear of Dionysius and the quarries, ten minutes from the bridge.","maps":"https://www.google.com/maps/search/?api=1&query=Parco+Archeologico+della+Neapolis+Siracusa"},
    {"name":"Noto","desc":"Rebuilt in one stone after 1693, ten kilometres from its ruins.","maps":"https://www.google.com/maps/search/?api=1&query=Noto+Corso+Vittorio+Emanuele"},
    {"name":"Modica","desc":"Poured down two ravines, and working chocolate cold.","maps":"https://www.google.com/maps/search/?api=1&query=Modica+Corso+Umberto"},
    {"name":"Ragusa Ibla","desc":"The old town on its own hill — and the best table in the south-east.","maps":"https://www.google.com/maps/search/?api=1&query=Ragusa+Ibla"},
    {"name":"Marzamemi","desc":"A village built round a tonnara square, the sea on three sides.","maps":"https://www.google.com/maps/search/?api=1&query=Marzamemi+Piazza+Regina+Margherita"}
  ];
  const WALKS = [
    {"name":"Ortigia by the water, a full loop","desc":"An hour around the island's edge: harbour, sea walls, castle, spring.","maps":"https://www.google.com/maps/search/?api=1&query=Tempio+di+Apollo+Siracusa"},
    {"name":"Cavagrande del Cassibile","desc":"A 250-metre-deep canyon with a chain of limestone pools you can swim in.","maps":"https://www.google.com/maps/search/?api=1&query=Belvedere+Cavagrande+del+Cassibile+Avola+Antica+Sicilia"}
  ];
  const WORK_SPOTS = [

  ];
  const LANDMARKS = [
    {"name":"Teatro Greco, Siracusa","desc":"A theatre cut straight into the limestone of the Temenite hill, still used for Greek tragedy every spring.","maps":"https://www.google.com/maps/search/?api=1&query=Teatro+Greco+Siracusa+Parco+Archeologico+Neapolis"},
    {"name":"INDA: Greek tragedy where it was first played","desc":"Since 1914 the INDA foundation has staged ancient drama in the theatre it was written for. The 2027 programme is out.","maps":"https://www.google.com/maps/search/?api=1&query=Teatro+Greco+Siracusa"},
    {"name":"Duomo di Siracusa: a temple still standing inside a church","desc":"Walk down the left aisle and you are walking between Doric columns raised in the 5th century BC.","maps":"https://www.google.com/maps/search/?api=1&query=Duomo+di+Siracusa"},
    {"name":"Fonte Aretusa and its papyrus","desc":"A freshwater spring a few metres from the sea, with papyrus growing wild in it.","maps":"https://www.google.com/maps/search/?api=1&query=Fonte+Aretusa+Siracusa"},
    {"name":"The Miqwe of Via Alagona","desc":"Eighteen metres under a guesthouse, a rock-cut Jewish ritual bath still fed by spring water.","maps":"https://www.google.com/maps/search/?api=1&query=Miqwe+Via+Alagona+52+Siracusa"},
    {"name":"The Ear of Dionysius","desc":"A 23-metre-high cave in an ancient quarry, named - the story goes - by Caravaggio.","maps":"https://www.google.com/maps/search/?api=1&query=Orecchio+di+Dionisio+Siracusa"},
    {"name":"Museo Archeologico Paolo Orsi","desc":"One of the great archaeological collections of the Mediterranean, named for the man who dug most of it.","maps":"https://www.google.com/maps/search/?api=1&query=Museo+Archeologico+Paolo+Orsi+Siracusa"},
    {"name":"Caravaggio's Burial of Saint Lucy","desc":"Painted in Siracusa in 1608 by a fugitive, for the church built over the saint's tomb.","maps":"https://www.google.com/maps/search/?api=1&query=Basilica+di+Santa+Lucia+al+Sepolcro+Siracusa"},
    {"name":"Catacombe di San Giovanni","desc":"After Rome, Siracusa has some of the largest early-Christian catacombs in Italy, cut from a Greek aqueduct.","maps":"https://www.google.com/maps/search/?api=1&query=Catacombe+di+San+Giovanni+Siracusa"},
    {"name":"Noto: a city moved and rebuilt","desc":"After 1693, Noto was refounded 10 km from its ruins and built in one go, in golden stone.","maps":"https://www.google.com/maps/search/?api=1&query=Porta+Reale+Noto"},
    {"name":"Palazzo Nicolaci and the Infiorata","desc":"Six balconies held up by lions, horses, sirens and grotesque faces - and below them, a street paved with flowers each May.","maps":"https://www.google.com/maps/search/?api=1&query=Palazzo+Nicolaci+Noto"},
    {"name":"Piazza Duomo, Ortigia","desc":"An oval of honey-coloured baroque laid over 2,700 years of Siracusa.","maps":"https://www.google.com/maps/search/?api=1&query=Piazza+Duomo+Ortigia+Siracusa"}
  ];
  const PHOTOS = [
    {"src":"/terroir/Siracusa-Sicilia/img/siracusa-1.jpg","caption":"The Doric columns of the Temple of Athena, still standing inside the walls of Siracusa's cathedral. The church was built into the temple; walk down the left aisle and you are walking between columns raised in the 5th century BC.","credit":"Palickap · CC BY-SA 4.0 · Wikimedia Commons"},
    {"src":"/terroir/Siracusa-Sicilia/img/siracusa-2.jpg","caption":"Papyrus growing in the Fonte Aretusa, the freshwater spring a few steps from the sea on Ortigia — the water that drew the Corinthians here in 734 BC, and that Nelson's fleet took on board in July 1798.","credit":"Rollopack · CC BY-SA 3.0 · Wikimedia Commons"},
    {"src":"/terroir/Siracusa-Sicilia/img/siracusa-3.jpg","caption":"The old tonnara buildings of Marzamemi. The village grew around its tuna trap; the crews hauled the death-chamber net to the cialoma, and the fish still comes home as bottarga and ventresca.","credit":"Einaz80 · CC BY-SA 4.0 · Wikimedia Commons"}
  ];
  const GEMS = [

  ];
  const TABLES = {
 "grande": {
  "title": "Les Grandes Tables",
  "desc": "Three starred rooms, two young Modica kitchens and the cellars of the south-east — the occasion end of this coast.",
  "sections": [
   {
    "label": "La crème — the starred rooms",
    "desc": "The three starred rooms of the 2026 guide that are worth the drive: Ciccio Sultano's two-star in Ibla, Siracusa's first star on Ortigia's tip, and Noto's baroque one-star.",
    "ids": [
     "duomo",
     "cortile-spirito-santo",
     "crocifisso"
    ]
   },
   {
    "label": "The new wave",
    "desc": "Two young Modica kitchens in the 2026 MICHELIN selection, both run by families who have cooked there for generations.",
    "ids": [
     "dabbanna",
     "lorenzo-ruta"
    ]
   },
   {
    "label": "Le cantine — the wineries that open the door",
    "desc": "The south-east's own wines: the Moscato that came back, and the clay amphorae of Vittoria. Book every visit ahead.",
    "ids": [
     "cantine-pupillo",
     "cos",
     "arianna-occhipinti"
    ]
   }
  ]
 },
 "petite": {
  "title": "Les Petites Tables",
  "desc": "The osterie, the Marzamemi fish rooms, the almond and the chocolate, and the drink before dinner.",
  "sections": [
   {
    "label": "Trattorie & osterie",
    "desc": "Where Siracusa and Modica actually eat: a Slow Food snail, the old serious room of Ortigia, the tables on Piazza Duomo and Accursio's trattoria.",
    "ids": [
     "latteria-mamma-iabica",
     "don-camillo",
     "regina-lucia",
     "radici"
    ]
   },
   {
    "label": "The sea rooms",
    "desc": "Marzamemi, the old tuna village: a fish tavern in the tonnara, a terrace on the rocks, and the family that still cures the tuna.",
    "ids": [
     "taverna-la-cialoma",
     "cortile-arabo",
     "campisi"
    ]
   },
   {
    "label": "Granita, brioche & the pasticceria",
    "desc": "The most serious sweet table in Sicily: Assenza's almond in Noto, and in Modica the cold chocolate and the cremolata.",
    "ids": [
     "caffe-sicilia",
     "antica-dolceria-bonajuto",
     "rosy-bar"
    ]
   },
   {
    "label": "Aperitivo & cocktails",
    "desc": "The drink before dinner: Siracusa's best bar, the grand hotel's rooftop, and an enoteca that is eighty percent natural.",
    "ids": [
     "barcollo",
     "grand-hotel-ortigia",
     "enoteca-solaria"
    ]
   }
  ]
 },
 "street": {
  "title": "La Rue — The Street",
  "desc": "The market counter: Borderi's sandwich and a tagliere at Burgio.",
  "sections": [
   {
    "label": "La rue — the counter and the window",
    "desc": "Two counters at the Ortigia market: the cheese shop with the queue, and the salumeria where you can sit.",
    "ids": [
     "caseificio-borderi",
     "fratelli-burgio"
    ]
   }
  ]
 }
};
  const CATEGORIES = [
 {
  "key": "creme",
  "label": "La crème — the starred rooms",
  "lead": "The three starred rooms of the 2026 guide that are worth the drive: Ciccio Sultano's two-star in Ibla, Siracusa's first star on Ortigia's tip, and Noto's baroque one-star.",
  "story": {
   "title": "A synagogue's ritual bath under a Sultano bistro",
   "story": "I Banchi in Ibla occupies a palazzo that was a synagogue before the 1693 earthquake; it kept its ritual bath (mikveh), now in the 'room of mirrors'. Sicily's Jews were expelled in 1492 under Spanish rule, so the bath is a rare trace of that community in the Val di Noto.",
   "where": "I Banchi, Via Orfanotrofio 39"
  }
 },
 {
  "key": "rising",
  "label": "The new wave",
  "lead": "Two young Modica kitchens in the 2026 MICHELIN selection, both run by families who have cooked there for generations.",
  "story": {
   "title": "'Mpanatigghi",
   "story": "Modica's pastry half-moons filled with chocolate, almonds, spices and minced beef. The meat in a sweet is the surprise; Bonajuto lists them among its traditional biscuits.",
   "where": "Antica Dolceria Bonajuto"
  }
 },
 {
  "key": "cantine",
  "label": "Le cantine — the wineries that open the door",
  "lead": "The south-east's own wines: the Moscato that came back, and the clay amphorae of Vittoria. Book every visit ahead.",
  "story": {
   "title": "COS — the acronym",
   "story": "COS is not a word. It is Cilia, Occhipinti, Strano: three friends from Vittoria — Giambattista Cilia, Giusto Occhipinti and Cirino Strano — who started making wine in 1980. They went on to bury terracotta amphorae for their Pithos wines and farm biodynamically, a generation before 'natural wine' was a category. Arianna Occhipinti's estate is a few kilometres away.",
   "where": "COS"
  }
 },
 {
  "key": "houses",
  "label": "Trattorie & osterie",
  "lead": "Where Siracusa and Modica actually eat: a Slow Food snail, the old serious room of Ortigia, the tables on Piazza Duomo and Accursio's trattoria.",
  "story": {
   "title": "Cuccìa for Santa Lucia",
   "story": "On 13 December many Sicilians eat no bread or pasta, only cuccìa: whole wheat berries boiled and served with ricotta and sugar, or with vino cotto. The custom recalls a famine in Siracusa ended, the story goes, by the arrival of a ship of grain on Lucy's feast day; the hungry people boiled the grain whole rather than wait to mill it.",
   "where": "Siracusa"
  }
 },
 {
  "key": "seafood",
  "label": "The sea rooms",
  "lead": "Marzamemi, the old tuna village: a fish tavern in the tonnara, a terrace on the rocks, and the family that still cures the tuna.",
  "story": {
   "title": "Cialoma, the tonnara work-song",
   "story": "Marzamemi grew around a tonnara, the net-trap tuna fishery. 'Cialoma' is the chant the crews sang while hauling the death-chamber net in the mattanza. Taverna La Cialoma now cooks in the old fishery buildings on the main square.",
   "where": "Taverna La Cialoma, Piazza Regina Margherita"
  }
 },
 {
  "key": "pastry",
  "label": "Granita, brioche & the pasticceria",
  "lead": "The most serious sweet table in Sicily: Assenza's almond in Noto, and in Modica the cold chocolate and the cremolata.",
  "story": {
   "title": "Pasta reale is worked raw",
   "story": "Slow Food's Noto almond presidium notes that Sicilian pasta reale, unlike the marzipan of central Europe, is worked raw. The same almond family gives martorana fruit, conchiglie filled with citron jam, latte di mandorla, torrone and the faccioni of Noto.",
   "where": "Noto"
  }
 },
 {
  "key": "cocktail",
  "label": "Aperitivo & cocktails",
  "lead": "The drink before dinner: Siracusa's best bar, the grand hotel's rooftop, and an enoteca that is eighty percent natural.",
  "story": {
   "title": "Amara, the blood-orange amaro",
   "story": "Amara is an amaro made from Arancia Rossa di Sicilia IGP — the blood oranges of the Etna plain. It was launched in 2014 by Edoardo Strano, whose grandfather planted an 80-hectare citrus grove, and is made by Rossa at Contrada San Martino, Misterbianco, on Catania's edge. Taormina's Villa Belvedere uses it in an 'Etna Spritz'. A bottle is the most local thing to carry back to the boat's bar.",
   "where": "Rossa, Contrada San Martino"
  }
 },
 {
  "key": "street",
  "label": "La rue — the counter and the window",
  "lead": "Two counters at the Ortigia market: the cheese shop with the queue, and the salumeria where you can sit.",
  "story": {
   "title": "Sea urchins have a closed season",
   "story": "Ricci, the sea urchins, are a cold-season pleasure on Ortigia, eaten raw or on spaghetti. Their fishing is closed in May and June: anyone selling them then is selling a catch that should not exist. Ask the season before you order, and walk on if the answer is wrong.",
   "where": "The Ortigia market"
  }
 }
];
  const GROUPS = [{"key":"grande","label":"Les Grandes Tables","lead":"Three starred rooms, two young Modica kitchens and the cellars of the south-east — the occasion end of this coast."},{"key":"petite","label":"Les Petites Tables","lead":"The osterie, the Marzamemi fish rooms, the almond and the chocolate, and the drink before dinner."},{"key":"street","label":"La Rue — The Street","lead":"The market counter: Borderi's sandwich and a tagliere at Burgio."}];
  const GROUP_OF = {"creme":"grande","rising":"grande","cantine":"grande","houses":"petite","seafood":"petite","pastry":"petite","cocktail":"petite","street":"street"};
  const BRIDGE = {
 "_rule": "SINGLE-EDITOR RULE: charter{} on a venue deliberately duplicates booking truth held in its reservation/price_range/caveat prose. Any commit editing those fields on a shortlist venue MUST update its charter block in the same commit.",
 "doors": [
  {
   "fr": "One Night",
   "en": "Crew ashore for one evening: a plan for each quarter — Ortigia on foot, or one baroque town by car; the glass, the table, the bar, the late granita.",
   "note": "Le coucher du soleil · la petite table · le bar · la granita",
   "href": "#t=onenight",
   "open": []
  },
  {
   "fr": "The Gastronomic Dig-In",
   "en": "For the chef: the food history, the market, the almond and the cold chocolate, the wines of the south-east.",
   "note": "L’histoire · le marché · le sucre · le vin",
   "href": "#bougie",
   "open": [
    "bougie",
    "provisioning",
    "granita",
    "vino",
    "la-liste"
   ]
  },
  {
   "fr": "For Guests",
   "en": "Plan ahead, or save the night at the last minute in Ortigia: bookable, priced.",
   "note": "auto",
   "href": "#ce-soir",
   "open": [
    "ce-soir"
   ]
  },
  {
   "fr": "The Getaway Weekend",
   "en": "Friday night to Sunday afternoon: the spring at sunset, the market before nine, the Greek theatre in the last light, almond granita in Noto and a cove you walk to.",
   "note": "La source · le marché · le théâtre · la granita",
   "href": "#t=getaway",
   "open": []
  }
 ],
 "shortlist": {
  "title": "For guests — plan ahead, or save the night",
  "desc": "Book ahead for guests, or rescue the evening when the booking falls through. Every name links to its full entry above.",
  "groups": [
   {
    "label": "Last minute — save the night",
    "sub": "The booking fell through at seven: call in this order; none promises a walk-in.",
    "ids": [
     "regina-lucia",
     "grand-hotel-ortigia",
     "don-camillo"
    ]
   },
   {
    "label": "Plan ahead — this week",
    "sub": "Book days ahead; the starred rooms close one or two nights a week.",
    "ids": [
     "cortile-spirito-santo",
     "crocifisso",
     "taverna-la-cialoma"
    ]
   },
   {
    "label": "Plan ahead — the grand night",
    "sub": "The two-star in Ibla, an hour and a quarter from Ortigia: book as soon as the dates are fixed.",
    "ids": [
     "duomo"
    ]
   }
  ]
 }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES, CATEGORIES, GROUPS, GROUP_OF, BRIDGE };
})();
