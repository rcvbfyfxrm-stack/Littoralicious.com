window.TERROIR_DATA = (function () {
  const COLORS = {"berth":"#2d4a5e","market":"#d97706","shop":"#059669","mainland":"#7c3aed","logistics":"#2d4a5e"};
  const CAT_LABELS = {"berth":"Signature","market":"Market / Direct","shop":"Restaurant / Bar","mainland":"Out of town","logistics":"Logistics"};
  const PRODUCT_COLORS = {"Siracusa":"#2d4a5e","Val di Noto":"#a16207","Catania":"#1f2937","Etna":"#7f1d1d","Taormina":"#059669"};
  const VENUES = [
    {"id":"sapio","cat":"berth","tier":"berth_top","priority":1,"name":"Sapio","short":"Sapio","neighborhood":"Piazza Antonino Gandolfo","maps":"https://www.google.com/maps/search/?api=1&query=Sapio+Catania+Sicilia","badge":"STARRED","tags":["€€€€","Recommended"],"productTags":["Catania"],"hours":"Tue–Sun dinner 19:30–23:30; lunch by reservation; closed Monday (own site, seen 5 Oct 2026)","why":"MICHELIN notes that the oil, fruit and vegetables come from Ingiulla's own garden. Front of house is Roberta, his partner, with sommelier Andrea. You can eat at the kitchen table or among the bottles in the Sicilian cellar, and the dining room doubles as a gallery for artists from the region. Parking nearby is hard, so come by taxi.","address":"Piazza Antonino Gandolfo 11, Catania","phone":"+39 095 097 5016","status":"confirmed","statusChecked":"2026-10-04","lat":37.505347,"lng":15.094916,"category":"creme","subcat":"LA CRÈME","hook":"Alessandro Ingiulla's one-star in a restored Catania warehouse, with a chef's table in the kitchen.","person":"Alessandro Ingiulla","signature":"Chef's table in the kitchen","verdict":"Catania's most complete modern restaurant; ask for the cellar table.","caveat":"Parking nearby is hard (MICHELIN says so).","price_range":"€€€€","reservation":"Recommended","dishes":[{"name":"Garden-led tasting menu","note":"Vegetables and oil from Ingiulla's own plot"},{"name":"Sicilian wine-cellar table","note":"Dine among bottles from all over Sicily"}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"MICHELIN 2026 ★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€€","book":"Recommended; phone +39 095 097 5016","dress":"","warn":"Closed Monday; dinner to 23:30, the latest in Catania. Parking nearby is hard (MICHELIN says so)","fit":"A one-star in a restored warehouse, with a chef's table"},"web":"https://www.sapiorestaurant.it/","hot_this_month":"October 2026: dinner Tue–Sun to 23:30, the latest starred kitchen in Catania (seen 5 Oct)."},
    {"id":"coria","cat":"berth","tier":"berth_top","priority":2,"name":"Coria","short":"Coria","neighborhood":"Via Prefettura, historic centre","maps":"https://www.google.com/maps/search/?api=1&query=Coria+Catania+Sicilia","badge":"STARRED","tags":["€€€","Recommended"],"productTags":["Catania"],"hours":"","why":"The restaurant takes its name from Giuseppe Coria, whose 'Profumi di Sicilia' is a reference book of Sicilian home cooking. Chef-owners Domenico Colonnetta and Francesco Patti both trained under Ciccio Sultano, and they cook from those old recipes. MICHELIN 2026 names an almond-filled bottone and linguine with clams and mantis shrimp. On the walls are Nunzio Fisichella's paintings of Etna.","address":"Via Prefettura 21, Catania","phone":"+39 095 286 4291","status":"confirmed","statusChecked":"2026-10-04","lat":37.505325,"lng":15.086046,"category":"creme","subcat":"LA CRÈME","hook":"A one-star that moved from Caltagirone to a Catania palazzo in 2024.","person":"Domenico Colonnetta and Francesco Patti","signature":"Lamb 'abbuttunatu come un'impanatigghia'","verdict":"The most tradition-literate of Catania's stars; the lamb 'impanatigghia' is a lesson in Ragusan pastry history.","price_range":"€€€","reservation":"Recommended","dishes":[{"name":"Almond-filled bottone","note":"MICHELIN 2026"},{"name":"Linguina with clams and mantis shrimp (canocchie)","note":"MICHELIN 2026"},{"name":"Lamb 'abbuttunatu come un'impanatigghia'","note":"Stuffed lamb that nods to Modica's meat-and-chocolate pastry"}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"MICHELIN 2026 ★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€","book":"Recommended","dress":"","warn":"","fit":"A one-star that moved from Caltagirone to a Catania palazzo in 2024."},"web":"https://www.ristorantecoria.it"},
    {"id":"materia-spazio-cucina","cat":"shop","tier":"several","priority":4,"name":"Materia | Spazio Cucina","short":"Materia | Spazio Cucina","neighborhood":"Via Teatro Massimo","maps":"https://www.google.com/maps/search/?api=1&query=Materia+%7C+Spazio+Cucina+Catania+Sicilia","badge":"NEW WAVE","tags":["€€"],"productTags":["Catania"],"hours":"Daily 19:00–23:00 (own site, seen 5 Oct 2026)","why":"MICHELIN tells you to start with the 'piatti del contadino', the farmer's plates: an onion charred on the barbecue with dry-cured black olives, cream of tuma persa (an aged Sicilian cheese) and parsley oil. Salt cod comes as a salad with oregano oil and an almond, olive, caper and orange sauce. It is near the opera, so it works before a performance.","address":"Via Teatro Massimo 29, Catania","phone":"+39 095 1693 1045","status":"confirmed","statusChecked":"2026-10-04","lat":37.504023,"lng":15.091543,"category":"rising","subcat":"THE NEW WAVE","hook":"Shared tables and a wall of jars by the Teatro Massimo Bellini; grill-led land and sea.","signature":"Onion on the BBQ, dry-cured black olives, tuma persa cream","verdict":"Good-value modern Catania, near the opera house.","price_range":"€€","dishes":[{"name":"BBQ onion, cured black olives, tuma persa cream, parsley oil","note":"Tuma persa is a Sicilian aged cheese"},{"name":"Salt cod salad","note":"Oregano oil, almond-olive-caper-orange sauce"}],"charter":{"price":"€€","book":"Phone +39 095 1693 1045","dress":"","warn":"Open seven nights, 19:00–23:00","fit":"Shared tables by the Teatro Massimo Bellini"},"web":"https://www.materiaspaziocucina.it/","hot_this_month":"October 2026: open seven nights 19:00–23:00 — the verified last-minute table (seen 5 Oct)."},
    {"id":"angio-macelleria-di-mare","cat":"shop","tier":"several","priority":5,"name":"Angiò-Macelleria di Mare","short":"Angiò-Macelleria di Mare","neighborhood":"Viale Africa","maps":"https://www.google.com/maps/search/?api=1&query=Angi%C3%B2-Macelleria+di+Mare+Catania+Sicilia","badge":"NEW WAVE","tags":["€€€"],"productTags":["Catania"],"hours":"","why":"Alberto Angiolucci treats fish the way a norcino treats a pig. Octopus becomes mortadella, squid becomes lardo, and there is a seafood cacciatora, all on Gambero Rosso's list. MICHELIN's 2026 inspectors picked out red prawns with panelle and finger lime, and a sea-liver pate with Marsala and pistachio. For a chef it is a working lesson in curing and ageing fish you could take back to the galley.","address":"Viale Africa 28/h, Catania","phone":"+39 335 161 3701","status":"confirmed","statusChecked":"2026-10-04","category":"rising","subcat":"THE NEW WAVE","hook":"A 'sea butcher': fish aged, salted and smoked like meat, into octopus mortadella and squid lardo.","person":"Alberto Angiolucci","signature":"Fish charcuterie","verdict":"The most original fish cookery in Catania.","price_range":"€€€","dishes":[{"name":"Octopus mortadella / squid lardo","note":"Gambero Rosso 2024"},{"name":"Red prawns, panelle and finger lime","note":"MICHELIN 2026"},{"name":"Sea-liver pâté with Marsala and pistachio","note":"MICHELIN 2026"}],"charter":{"price":"€€€","book":"Book ahead","dress":"","warn":"","fit":"A 'sea butcher': fish aged, salted and smoked like meat, into octopus mortadella and squid lardo."},"web":"https://albertoangiolucci.it/"},
    {"id":"sabir","cat":"shop","tier":"several","priority":6,"name":"Sabir","short":"Sabir","neighborhood":"Via delle Ginestre","maps":"https://www.google.com/maps/search/?api=1&query=Sabir+Zafferana+Etnea+Sicilia","badge":"NEW WAVE","tags":["€€€"],"productTags":["Etna"],"hours":"","why":"Sabir was the pidgin sailors and merchants used to trade across Mediterranean harbours, and the cooking mixes coast and mountain in the same way. Gambero Rosso (2024) names Mazara red prawn with vegetables, thyme, Ragusano DOP fondue and Etna truffle. MICHELIN points to a seasonal tasting menu built on wild herbs from the slopes around Zafferana.","address":"Via delle Ginestre 1, Zafferana Etnea","phone":"+39 095 708 2335","status":"confirmed","statusChecked":"2026-10-04","lat":37.686623,"lng":15.103322,"category":"rising","subcat":"THE NEW WAVE","hook":"Seby Sorbello's restaurant on the Etna slope, named after the Mediterranean ports' lingua franca.","person":"Seby Sorbello","signature":"Mazara red prawn, Ragusano DOP fondue, Etna truffle","verdict":"Mountain-meets-Ionian cooking on the east slope.","price_range":"€€€","dishes":[{"name":"Red prawn with vegetables, thyme, Ragusano fondue and Etna truffle","note":"Gambero Rosso 2024"},{"name":"Wild-herb seasonal tasting menu","note":"MICHELIN"}],"web":"https://www.sebysorbello.it/","hot_this_month":"October Sundays: the Ottobrata fills Zafferana outside the door."},
    {"id":"benanti","cat":"shop","tier":"several","priority":7,"name":"Benanti","short":"Benanti","neighborhood":"Monte Serra, south-east slope of Etna","maps":"https://www.google.com/maps/search/?api=1&query=Benanti+Viagrande+Sicilia","badge":"CANTINA","tags":["Late morning, then lunch in Viagrande or Trecastagni"],"productTags":["Etna"],"hours":"Visits and tastings every day except Monday, by reservation (benanti.it, seen 2026-10-04)","why":"Benanti receives visitors in a nineteenth-century estate in Viagrande on the south-east flank, and Vinous and Jamie Goode both name it among the houses that built Etna's modern reputation. Its Pietra Marina is a Carricante from Milo, the one commune allowed to make Etna Bianco Superiore. Contrada reds sit alongside it, so a single tasting shows both halves of the mountain's wine.","address":"Via Giuseppe Garibaldi 361, 95029 Viagrande (CT)","phone":"+39 095 789 09 28 (mobile +39 392 983 40 99)","status":"confirmed","statusChecked":"2026-10-04","category":"cantine","subcat":"LE CANTINE","hook":"The family estate that put modern Etna Bianco on export lists, at the foot of Monte Serra.","person":"Benanti family","signature":"Pietra Marina, Etna Bianco Superiore (Carricante, Milo)","verdict":"The most organised visit on the volcano and the easiest from Catania (20 minutes); go here to understand Carricante.","caveat":"Prices are not printed on the main site; the figures below come from a third-party guide and must be checked at booking.","price_range":"Reported (third-party guide, not seen on own site): Contrade Selection EUR 90, Premium EUR 120, Iconic EUR 220 per person — confirm at booking","reservation":"Online at visit.benanti.it; book ahead, harvest weeks (Sep-Oct) fill first","best_time":"Late morning, then lunch in Viagrande or Trecastagni","dishes":[{"name":"Etna Bianco Superiore Pietra Marina","note":"Carricante from Milo, the east-slope white that ages"},{"name":"Etna Rosso contrada wines","note":"Nerello Mascalese bottled by single contrada"}],"web":"https://www.benanti.it"},
    {"id":"i-vigneri-di-salvo-foti","cat":"shop","tier":"several","priority":8,"name":"I Vigneri di Salvo Foti","short":"I Vigneri di Salvo Foti","neighborhood":"East slope","maps":"https://www.google.com/maps/search/?api=1&query=I+Vigneri+di+Salvo+Foti+Milo+Sicilia","badge":"CANTINA","tags":["'Prenota una visita' link on ivigneri.it","Morning"],"productTags":["Etna"],"hours":"","why":"Foti is the agronomist and winemaker most associated with alberello, the bush vine trained on a single chestnut stake, and with palmento, the old stone press-house. Hygiene rules ban palmento wine from sale as such, so reports say he has sold it abroad labelled experimental. The 'vigneri' were the guild of men who worked other people's vines, and the collective took their name.","address":"Via della Regione II Traversa, 95010 Milo (CT)","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"cantine","subcat":"LE CANTINE","hook":"Salvo Foti's growers' collective in Milo, named after the old Catanese guild of vineyard workers.","person":"Salvo Foti","signature":"Vinupetra / east-slope Carricante","verdict":"The man to visit if the palmento and the bush vine are what you came for.","caveat":"Booking goes through a third-party tasting platform linked from the site.","reservation":"'Prenota una visita' link on ivigneri.it","best_time":"Morning","dishes":[{"name":"Carricante from Milo","note":"the Bianco Superiore commune"},{"name":"Palmento-made reds","note":"where available — ask"}],"web":"https://www.ivigneri.it"},
    {"id":"me-cumpari-turiddu","cat":"berth","tier":"berth_top","priority":3,"name":"Me Cumpari Turiddu","short":"Me Cumpari Turiddu","neighborhood":"Piazza Turi Ferro","maps":"https://www.google.com/maps/search/?api=1&query=Me+Cumpari+Turiddu+Catania+Sicilia","badge":"OSTERIA","tags":["€€"],"productTags":["Catania"],"hours":"","why":"It holds a MICHELIN Bib Gourmand and a Slow Food Chiocciola in Osterie d'Italia 2026, a pairing few places in Catania can claim. Turiddu is the young hero of Verga's Cavalleria rusticana. Beside the main menu there is a cheaper bistro list and a shop of Sicilian produce, so you can eat, then buy the cheese and preserves you just tasted.","address":"Piazza Turi Ferro 36, Catania","phone":"+39 095 715 0142","status":"confirmed","statusChecked":"2026-10-04","lat":37.506338,"lng":15.088473,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"An old-Sicily dining room with a deli and a bar open from 11.30 into the night.","signature":"Typical Catanese specialities, bistro menu","verdict":"The safest traditional Catanese table in the centre.","price_range":"€€","dishes":[{"name":"Traditional Sicilian dishes","note":"Main menu"},{"name":"Bistro menu","note":"Simpler and cheaper (MICHELIN)"}],"signal_chip":{"label":"MICHELIN Bib Gourmand 2026","full":"MICHELIN 2026 Bib Gourmand · Slow Food Osteria d'Italia 2026 Chiocciola","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€","book":"Book ahead","dress":"","warn":"","fit":"An old-Sicily dining room with a deli and a bar open from 11.30 into the night."},"web":"https://www.mecumparituriddu.it/"},
    {"id":"osteria-4-archi","cat":"shop","tier":"plenty","priority":9,"name":"Osteria 4 Archi","short":"Osteria 4 Archi","neighborhood":"Via Francesco Crispi","maps":"https://www.google.com/maps/search/?api=1&query=Osteria+4+Archi+Milo+Sicilia","badge":"OSTERIA","tags":[],"productTags":["Etna"],"hours":"","why":"In the kitchen, chef Lina works with Slow Food Presidium products: Nebrodi black pig, provola, Bronte pistachio, Noto almond. Gambero Rosso singles out an arancino with Aci turnip-cabbage. Rosario Benvenuto runs a wood-fired pizza oven, and the cellar holds more than 250 labels, many from the vineyards outside. It holds a Chiocciola in Osterie d'Italia 2026.","address":"Via Francesco Crispi 9, Milo","phone":"+39 095 955566","status":"confirmed","statusChecked":"2026-10-04","lat":37.726993,"lng":15.112789,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"Saro Grasso's osteria in Milo since 1995: mountain cooking built on Slow Food Presidia.","person":"Saro Grasso; chef Lina","signature":"Arancino with Aci turnip-cabbage (cavolo rapa)","verdict":"The reference osteria of the Etna east slope.","caveat":"Closed Wednesdays (Gambero Rosso, 2024).","dishes":[{"name":"Arancino with Aci turnip cabbage","note":"Gambero Rosso 2024"},{"name":"Mushroom and vegetable mountain dishes","note":""},{"name":"Wood-oven pizza","note":""}],"signal_chip":{"label":"Slow Food Chiocciola 2026","full":"Slow Food Osteria d'Italia 2026 Chiocciola","cosign":"Slow Food, Osterie d'Italia 2026"}},
    {"id":"da-rinuccio","cat":"shop","tier":"plenty","priority":10,"name":"Da Rinuccio","short":"Da Rinuccio","neighborhood":"Via Mareneve","maps":"https://www.google.com/maps/search/?api=1&query=Da+Rinuccio+Milo+Sicilia","badge":"OSTERIA","tags":["€€","Lunch"],"productTags":["Etna"],"hours":"","why":"MICHELIN's note borrows the local name for Etna, 'a muntagna', which people here say with respect. The cooking matches the altitude: fresh pasta with mushrooms, grilled meats, and a wine list that stays mostly in the province. Come at lunchtime, when you can see through the veranda glass, after a morning on the east-slope vineyards or the Valle del Bove rim.","address":"Via Mareneve 5, Milo","phone":"+39 345 388 3542","status":"confirmed","statusChecked":"2026-10-04","lat":37.738362,"lng":15.101808,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"A family restaurant on the Mareneve road near Milo, with a glassed-in veranda facing the mountain.","signature":"Mushroom and meat dishes","verdict":"Generous Etna mountain lunch.","price_range":"€€","best_time":"Lunch","dishes":[{"name":"Fresh pasta with mushrooms","note":"MICHELIN"},{"name":"Grilled meats","note":"MICHELIN"}],"web":"https://www.ristorantedarinuccio.it/"},
    {"id":"osteria-antica-marina","cat":"shop","tier":"plenty","priority":11,"name":"Osteria Antica Marina","short":"Osteria Antica Marina","neighborhood":"La Pescheria, Via Pardo","maps":"https://www.google.com/maps/search/?api=1&query=Osteria+Antica+Marina+Catania+Sicilia","badge":"SEAFOOD","tags":["€€","Recommended","Lunch after the market"],"productTags":["Catania"],"hours":"Daily 12:30–15:00 and 19:30–23:00 (own site, seen 2026-10-04)","why":"It has worked inside the market for thirty years, so the menu is whatever the stalls outside had that morning: crudo, fritto misto, the fish of the day. At lunch the room fills with people coming off the slabs, so it is loud and quick, not a quiet table. Its own site lists lunch and dinner every day.","address":"Via Pardo 29, 95121 Catania (Zona Pescheria)","phone":"+39 095 348 197","status":"confirmed","statusChecked":"2026-10-04","lat":37.501519,"lng":15.086854,"category":"seafood","subcat":"THE SEA ROOMS","hook":"The sit-down fish osteria inside the Pescheria lanes, since 1996.","signature":"Market fish of the day","verdict":"The obvious lunch after the slabs; reserve, it fills with market traffic.","caveat":"Busy; not a quiet room.","price_range":"€€","reservation":"Recommended","best_time":"Lunch after the market","dishes":[{"name":"Crudo of the day","note":"From the stalls outside"},{"name":"Fritto misto","note":""}],"charter":{"price":"€€","book":"Recommended","dress":"","warn":"Busy; not a quiet room.","fit":"The sit-down fish osteria inside the Pescheria lanes, since 1996."},"web":"https://www.osteriaanticamarina.it/"},
    {"id":"faraglioni-restaurant","cat":"shop","tier":"plenty","priority":12,"name":"Faraglioni Restaurant","short":"Faraglioni Restaurant","neighborhood":"Lungomare dei Ciclopi","maps":"https://www.google.com/maps/search/?api=1&query=Faraglioni+Restaurant+Aci+Trezza+Sicilia","badge":"SEAFOOD","tags":["€€"],"productTags":["Catania"],"hours":"","why":"MICHELIN 2026 lists it for traditional and creative fish on the Riviera dei Ciclopi. The view is the point: across the road are the basalt stacks of Polyphemus and Lachea, and the harbour where Verga's Malavoglia kept their boat. The dining room belongs to the Grand Hotel Faraglioni and there are vegetarian plates too.","address":"Lungomare dei Ciclopi 115, loc. Aci Trezza, Aci Castello","phone":"+39 095 419 2065","status":"confirmed","statusChecked":"2026-10-04","lat":37.559921,"lng":15.160039,"category":"seafood","subcat":"THE SEA ROOMS","hook":"A fish restaurant on the Aci Trezza seafront, looking straight at the Cyclops' rocks.","signature":"Fish and seafood","verdict":"The MICHELIN-listed table at Aci Trezza.","caveat":"Hotel-adjacent.","price_range":"€€","dishes":[{"name":"Traditional and creative fish dishes","note":"MICHELIN"},{"name":"Vegetarian options","note":""}],"charter":{"price":"€€","book":"Book ahead","dress":"","warn":"Hotel-adjacent.","fit":"A fish restaurant on the Aci Trezza seafront, looking straight at the Cyclops' rocks."},"web":"https://www.grandhotelfaraglioni.com/"},
    {"id":"nitto-ognina-bay-civico-8","cat":"shop","tier":"plenty","priority":13,"name":"Nitto Ognina Bay Civico 8","short":"Nitto Ognina Bay Civico 8","neighborhood":"Ognina harbour","maps":"https://www.google.com/maps/search/?api=1&query=Nitto+Ognina+Bay+Civico+8+Catania+Sicilia","badge":"SEAFOOD","tags":[],"productTags":["Catania"],"hours":"","why":"It began as a fishmonger's counter on the little harbour and grew into a restaurant without moving away from the boats. Gambero Rosso (2024) names linguine with sea urchin, pasta with sardines and wild fennel, and a swordfish sausage, a cured piece that sounds odd and makes sense once you taste it. Ognina is the closest landing from the northern anchorages.","address":"Piazza Mancini Battaglia 8/9, Catania (Ognina)","phone":"","status":"unverified","statusChecked":"2024-06-04","category":"seafood","subcat":"THE SEA ROOMS","hook":"A fish house on Ognina harbour that started as Nitto's fish shop in the 1960s.","person":"Giuseppe","signature":"Linguine ai ricci","verdict":"Harbour-side; handy by tender from Ognina.","caveat":"Not re-verified for 2026.","dishes":[{"name":"Linguine with sea urchin","note":""},{"name":"Swordfish sausage","note":""}]},
    {"id":"pasticceria-savia","cat":"shop","tier":"plenty","priority":14,"name":"Pasticceria Savia","short":"Pasticceria Savia","neighborhood":"Via Etnea at Via Umberto, opposite Villa Bellini","maps":"https://www.google.com/maps/search/?api=1&query=Pasticceria+Savia+Catania+Sicilia","badge":"PASTRY","tags":["€","No — counter and tables","Breakfast, before 9:30"],"productTags":["Catania"],"hours":"","why":"Angelo and Elisabetta Savia opened in 1897 in the old Piano di Nicosia quarter. Alfio and Carmelina later moved the shop to the corner of Via Etnea and Via Umberto, and Alessandro and Claudio Savia run it today. Gambero Rosso calls it the best address in Catania to start the day. Beyond granita there is the cone-shaped Catanese arancino and minne di Sant'Agata all year.","address":"Via Etnea 300/302/304 – Via Umberto 2/4/6, 95100 Catania","phone":"+39 095 322335","status":"confirmed","statusChecked":"2026-10-04","lat":37.510792,"lng":15.085615,"category":"pastry","subcat":"GRANITA, BRIOCHE & THE PASTICCERIA","hook":"The Catanese breakfast at its most classical, on the corner of Via Etnea opposite Villa Bellini.","person":"Savia family (Alessandro and Claudio Savia)","signature":"Granita di mandorla with brioche col tuppo","verdict":"Go first, before the hotel: almond granita, brioche, then a cone-shaped arancino for the road.","caveat":"Tourist traffic is heavy at the outdoor tables; the counter inside is faster.","price_range":"€","reservation":"No — counter and tables","best_time":"Breakfast, before 9:30","dishes":[{"name":"Granita alla mandorla","note":"The purist's choice per Gambero Rosso; add a half of pistacchio if you must"},{"name":"Arancino al ragù","note":"Pointed, Catanese style; pistachio version is round here"},{"name":"Cipollina","note":"Puff pastry with onion, ham and cheese — a Catania-only rosticceria piece"},{"name":"Minne di Sant'Agata","note":"Small ricotta cassatas, year-round here"}],"web":"https://lnx.savia.it/"},
    {"id":"bar-alecci","cat":"shop","tier":"plenty","priority":15,"name":"Bar Alecci","short":"Bar Alecci","neighborhood":"Via Antonio Gramsci","maps":"https://www.google.com/maps/search/?api=1&query=Bar+Alecci+Gravina+di+Catania+Sicilia","badge":"PASTRY","tags":["€","Morning"],"productTags":["Catania"],"hours":"","why":"When Gambero Rosso ranked eastern Sicily's granite in July 2026, Alecci came first: intense, precise flavours, with wild strawberry and pistachio singled out, eaten with brioche. Dissapore had ranked its pistachio, mulberry, almond and chocolate ten years earlier, so the reputation is not new. The rosticceria is serious too. Summer brings queues out the door.","address":"Via Antonio Gramsci 62, Gravina di Catania (CT)","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"pastry","subcat":"GRANITA, BRIOCHE & THE PASTICCERIA","hook":"Nearly fifty years of granita in Gravina, on the slope above Catania.","signature":"Granita al pistacchio","verdict":"The best-documented granita in the Catania hinterland; worth the short drive.","caveat":"Queues in summer.","price_range":"€","best_time":"Morning","dishes":[{"name":"Granita fragoline di bosco","note":"Wild strawberry"},{"name":"Granita al pistacchio","note":"With brioche"},{"name":"Rosticceria","note":"Called 'di livello' by Gambero Rosso"}]},
    {"id":"pasticceria-quaranta","cat":"shop","tier":"plenty","priority":16,"name":"Pasticceria Quaranta","short":"Pasticceria Quaranta","neighborhood":"Ognina, Piazza Mancini Battaglia","maps":"https://www.google.com/maps/search/?api=1&query=Pasticceria+Quaranta+Catania+Sicilia","badge":"BREAKFAST","tags":["€","Breakfast"],"productTags":["Catania"],"hours":"","why":"Gambero Rosso calls granita with brioche the house speciality. On the sweet side there are ricotta raviole, iris and panzerotti, and mignon cipolline, small onion puff pastries, for aperitivo. It faces the fishing harbour of Ognina, north of the centre, and its online shop is live. For a boat lying north of the city it is the closest proper Catanese breakfast.","address":"Piazza Mancini Battaglia 17/20, Catania","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"pastry","subcat":"THE BAR AT SEVEN","hook":"Granita and brioche on the little bay of Ognina.","signature":"Granita and brioche","verdict":"The breakfast with a harbour in front of it — good for a crew run from a boat moored north of the city.","price_range":"€","best_time":"Breakfast","dishes":[{"name":"Granita con brioche","note":"The house speciality"},{"name":"Raviola","note":"Fried ricotta pastry"},{"name":"Cipollina mignon","note":"For aperitivo"}],"web":"https://www.pasticceriaquaranta.it/"},
    {"id":"vermut","cat":"shop","tier":"plenty","priority":17,"name":"Vermut","short":"Vermut","neighborhood":"Via Gemmellaro, old centre","maps":"https://www.google.com/maps/search/?api=1&query=Vermut+Catania+Sicilia","badge":"WINE BAR","tags":["€","Advised on busy nights","19:00-21:00"],"productTags":["Catania"],"hours":"","why":"The name is a statement: before Aperol, the Sicilian aperitivo was vermouth. Vermut pours house vermouths over ice with boards of Sicilian salumi and cheese, and its wine list leans natural, with growers such as Vino di Anna, Occhipinti and COS mentioned in reviews. By early evening the tables run out and people drink standing, glass in hand, in the lane.","address":"Via Gemmellaro 39, 95131 Catania","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.508969,"lng":15.08673,"category":"cocktail","subcat":"ENOTECHE & NATURAL WINE","hook":"The vermouth-and-salumi bar where the Via Gemmellaro aperitivo spills into the street.","signature":"Vermouth on the rocks with a salumi board","verdict":"Start the Catania night here, standing if need be.","caveat":"Crowded; liveness for 2026 not confirmed on an own site.","price_range":"€","reservation":"Advised on busy nights","best_time":"19:00-21:00","dishes":[{"name":"House vermouth","note":"the reason for the name"},{"name":"Salumi and cheese","note":"Sicilian cuts"},{"name":"Natural wine by the glass","note":"Etna and Vittoria growers"}]},
    {"id":"nelson-sicily","cat":"shop","tier":"plenty","priority":18,"name":"Nelson Sicily — shop and wine bar","short":"Nelson Sicily","neighborhood":"Via Crociferi","maps":"https://www.google.com/maps/search/?api=1&query=Nelson+Sicily+Catania+Sicilia","badge":"WINE BAR","tags":["€€","Walk-in","Aperitivo"],"productTags":["Catania"],"hours":"","why":"Decanter's Carla Capalbo (2023) calls it the most complete collection of Sicilian wines and foods in the city: single-cultivar oils such as Tonda Iblea and Nocellara del Belice, lemon honey, pistachio cream. Natural-wine listings put at least 30 percent of the list as natural, from small growers. The shop ships, which matters if you are provisioning a boat.","address":"Via Crociferi 14-18, 95124 Catania (reported)","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.50341,"lng":15.084862,"category":"cocktail","subcat":"ENOTECHE & NATURAL WINE","hook":"A Sicilian wine shop and, under an archway on Via Crociferi, a wine bar pouring almost all of it.","signature":"Sicilian wines by the glass with local cheese","verdict":"The yacht chef's stop: taste by the glass, then have cases and pantry goods shipped to the boat.","caveat":"Address from a natural-wine listing; confirm opening before going.","price_range":"€€","reservation":"Walk-in","best_time":"Aperitivo","dishes":[{"name":"Etna and Vittoria by the glass","note":"almost the whole shop is open"},{"name":"Local cheeses","note":"to go with it"}]},
    {"id":"oliva-co-cocktail-society","cat":"shop","tier":"plenty","priority":19,"name":"Oliva.co Cocktail Society","short":"Oliva.co Cocktail Society","neighborhood":"Via delle Scale, off Via Umberto","maps":"https://www.google.com/maps/search/?api=1&query=Oliva.co+Cocktail+Society+Catania+Sicilia","badge":"COCKTAIL","tags":["€€","Walk-in","22:00"],"productTags":["Catania"],"hours":"Daily 18:00-02:00 (italia.it, seen 2026-10-04)","why":"Via delle Scale is a stepped alley, and the bar sits at the bottom of it. The back bar goes deep into mezcal, rhum agricole and Sicilian gins and amari, and reviews mention bitters and tinctures made in house. Italy's national tourism portal lists it as open every day until 2 a.m., which makes it the natural last stop on a Catania night.","address":"Via delle Scale 3, 95124 Catania","phone":"+39 349 173 2075","status":"unverified","statusChecked":"2026-10-04","category":"cocktail","subcat":"APERITIVO & COCKTAILS","hook":"A cocktail lounge down a flight of steps off Via Umberto, run by bar obsessives.","signature":"A Negroni built on a Sicilian amaro","verdict":"The serious drink in Catania; ask for a Sicilian-amaro twist.","price_range":"€€","reservation":"Walk-in","best_time":"22:00","dishes":[{"name":"Classic Negroni / Martini","note":"made properly"},{"name":"Mezcal and rhum agricole","note":"the back bar's depth"},{"name":"Local amari","note":"neat, as a nightcap"}]},
    {"id":"monk-jazz-club","cat":"shop","tier":"plenty","priority":20,"name":"Monk Jazz Club","short":"Monk Jazz Club","neighborhood":"Palazzo Scammacca del Murgo","maps":"https://www.google.com/maps/search/?api=1&query=Monk+Jazz+Club+Catania+Sicilia","badge":"LATE","tags":["Book ahead; sets sell out","21:30"],"productTags":["Catania"],"hours":"2026 season Jan-Apr (La Sicilia, 8 Jan 2026)","why":"Pianist-trumpeter Dino Rubino and bassist Nello Toscano have programmed it since 2017 through the Algos association. Each act usually plays two nights, and summer brings 'Jazz in vigna' out to the vineyards. In September 2026 the club marked its tenth anniversary with four days of concerts and a photo show, 'Echoes'. The autumn season opens on 9-10 October with the founders' own quartet and Francesco Cafiso.","address":"Palazzo Scammacca del Murgo, Catania","phone":"","status":"confirmed","statusChecked":"2026-01-08","category":"late-night","subcat":"AFTER DARK","hook":"Catania's jazz club, ten years old in 2026, in Palazzo Scammacca del Murgo.","person":"Dino Rubino, Nello Toscano (artistic direction)","signature":"A Friday or Saturday set","verdict":"The best night out in Catania for a listener; check the autumn programme.","caveat":"Seasonal (winter-spring in the palazzo); autumn 2026 dates not read.","reservation":"Book ahead; sets sell out","best_time":"21:30","dishes":[{"name":"Live jazz","note":"double nights per act"},{"name":"Jazz in vigna","note":"summer concerts among Etna vines"}]},
    {"id":"chiosco-giammona","cat":"shop","tier":"plenty","priority":21,"name":"Chiosco Giammona","short":"Chiosco Giammona","neighborhood":"Piazza Umberto, Via Umberto I","maps":"https://www.google.com/maps/search/?api=1&query=Chiosco+Giammona+Catania+Sicilia","badge":"LATE","tags":["€","After sunset"],"productTags":["Catania"],"hours":"","why":"Six brothers over three generations moved the kiosk from Piazza Universita to Piazza Santo Spirito and finally to Piazza Umberto, the square of kiosks it shares with the older Vezzosi. The drink: a lemon squeezed straight into the glass, a pinch of salt, soda from a high-pressure siphon. In 2026 the New York Times Cooking section called it shockingly refreshing (La Sicilia, Aug 2026).","address":"Piazza Umberto, Catania","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.511527,"lng":15.089604,"category":"late-night","subcat":"AFTER DARK","hook":"A Piazza Umberto kiosk where the Giammona family has mixed seltz limone e sale since 1949.","person":"Giammona family","signature":"Seltz limone e sale","verdict":"Stand at the counter after dark with a seltz limone e sale; ask for mandarino al limone if salt-and-lemon is too sharp.","caveat":"Liveness and hours not confirmed from a primary source for 2026.","price_range":"€","best_time":"After sunset","dishes":[{"name":"Seltz limone e sale","note":"Fresh lemon squeezed into the glass, a pinch of salt, siphon-hard soda"},{"name":"Mandarino al limone","note":"Sweeter syrup version"},{"name":"Zammù","note":"Anise"}]},
    {"id":"antica-friggitoria-stella","cat":"shop","tier":"plenty","priority":22,"name":"Antica Friggitoria Stella","short":"Antica Friggitoria Stella","neighborhood":"Via Monsignor Ventimiglia, near Piazza Teatro","maps":"https://www.google.com/maps/search/?api=1&query=Antica+Friggitoria+Stella+Catania+Sicilia","badge":"STREET","tags":["€"],"productTags":["Catania"],"hours":"","why":"Gambero Rosso dates it to 1837 and calls it one of the oldest in Italy, frying in oil or lard as the family always has. The counter carries the whole Catanese repertoire: scacciate with broccoli, with tuma and anchovy, or with tuma, onion and olives; arancini; bolognesi; fried panzerotti; and crispelle, the fritters that come sweet or savoury. Service is quick, built for people on their way somewhere.","address":"Via Monsignor Ventimiglia 66, Catania","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.506283,"lng":15.093153,"category":"street","subcat":"LA RUE","hook":"A Catania fry shop between the station and Piazza Stesicoro, run by the Stella family for five generations.","signature":"Scacciata","verdict":"The place to understand the scacciata — Catania's stuffed pie, cousin of the siciliana.","price_range":"€","dishes":[{"name":"Scacciata con broccoli","note":"Closed pie"},{"name":"Crispelle","note":"Fritters, sweet or with anchovy"},{"name":"Panzerotto fritto","note":""}]},
    {"id":"scirocco-sicilian-fish-lab","cat":"shop","tier":"plenty","priority":23,"name":"Scirocco Sicilian Fish Lab","short":"Scirocco Sicilian Fish Lab","neighborhood":"Inside La Pescheria, Piazza Alonzo di Benedetto","maps":"https://www.google.com/maps/search/?api=1&query=Scirocco+Sicilian+Fish+Lab+Catania+Sicilia","badge":"STREET","tags":["€"],"productTags":["Catania"],"hours":"","why":"Timpanaro set it up to bring the market's own catch back as street food: fish fried and served in paper cones, plus sandwiches, salads and fish arancini. Gambero Rosso International still listed it in June 2025. He is also behind Friggitoria Popolare with pizzaiolo Lele Scandurra, and a Scirocco counter in the airport departures hall sells seven arancino flavours.","address":"Piazza Alonzo di Benedetto 7, Catania (also Fontanarossa airport, departures)","phone":"","status":"unverified","statusChecked":"2026-10-04","category":"street","subcat":"LA RUE","hook":"Marco Timpanaro's fish fry-shop in the middle of the Pescheria, at Piazza Alonzo di Benedetto.","person":"Marco Timpanaro","signature":"Arancinetti di pesce","verdict":"Eat it standing in the Pescheria after the slabs; buy arancini at the airport for the crossing.","caveat":"Market-hours venue; check before a late visit.","price_range":"€","dishes":[{"name":"Arancinetti di pesce","note":""},{"name":"Arancino nero di seppia","note":"Squid ink"},{"name":"Arancino pesce spada e melanzane","note":""}]},
    {"id":"canusciuti","cat":"shop","tier":"plenty","priority":24,"name":"Canusciuti","short":"Canusciuti","neighborhood":"Via Santa Maria della Lettera","maps":"https://www.google.com/maps/search/?api=1&query=Canusciuti+Catania+Sicilia","badge":"STREET","tags":["€"],"productTags":["Catania"],"hours":"","why":"Canusciuti runs three lines, classic, special and sweet, with panko or pistachio crusts. The one to try is 'Il Plebiscito', its tribute to the horse grills of Via Plebiscito: strips of horse with Giarratana onion, a Slow Food sweet onion from the Iblei hills. It is the easy way to taste the city's most argued-over meat without sitting down at a grill.","address":"Via Santa Maria della Lettera 13, Catania","phone":"","status":"confirmed","statusChecked":"2026-10-04","lat":37.50233,"lng":15.084656,"category":"street","subcat":"LA RUE","hook":"A young arancino shop whose 'Il Plebiscito' puts horse-meat straccetti inside the rice.","signature":"Arancino 'Il Plebiscito'","verdict":"Try 'Il Plebiscito' if you won't sit at a horse grill.","price_range":"€","dishes":[{"name":"Il Plebiscito","note":"Horse straccetti, Giarratana onion"},{"name":"Arancino al ragù","note":"Classic"}],"web":"https://canusciuti.it/"}
  ];
  const NEIGHBORHOODS = [
    {"name":"Catania","desc":"Rebuilt in Etna's basalt, the street-food capital of the coast.","maps":"https://www.google.com/maps/search/?api=1&query=Piazza+Duomo+Catania"},
    {"name":"Acireale and Aci Trezza","desc":"Granita town, carnival town, and the stacks Polyphemus threw.","maps":"https://www.google.com/maps/search/?api=1&query=Aci+Trezza+Faraglioni"},
    {"name":"Zafferana and Milo","desc":"The honey town under the Valle del Bove, and the only commune allowed an Etna Bianco Superiore.","maps":"https://www.google.com/maps/search/?api=1&query=Zafferana+Etnea"}
  ];
  const WALKS = [

  ];
  const WORK_SPOTS = [

  ];
  const LANDMARKS = [
    {"name":"Piazza Duomo, Catania and 'u Liotru","desc":"A lava-stone elephant carrying an Egyptian-style obelisk: the city's mascot since the Middle Ages.","maps":"https://www.google.com/maps/search/?api=1&query=Fontana+dell%27Elefante+Catania"},
    {"name":"Via Crociferi","desc":"Two hundred metres of baroque churches and convents, one after another, in black and white stone.","maps":"https://www.google.com/maps/search/?api=1&query=Via+Crociferi+Catania"},
    {"name":"Monastero dei Benedettini","desc":"One of the largest Benedictine monasteries in Europe, built over Roman houses and lava, now a university.","maps":"https://www.google.com/maps/search/?api=1&query=Monastero+dei+Benedettini+Catania"}
  ];
  const PHOTOS = [
    {"src":"/terroir/Catania-Sicilia/img/catania-1.jpg","caption":"La Pescheria, Catania, under the arch that says W S. Agata. The market shouts its prices aloud — the abbanniata — every morning except Sunday, in the lee of the city walls a few steps from Piazza Duomo.","credit":"Giovanni Dall'Orto · Attribution · Wikimedia Commons"},
    {"src":"/terroir/Catania-Sicilia/img/catania-2.jpg","caption":"'u Liotru, the lava-stone elephant of Piazza Duomo, carrying its Egyptian-style obelisk in front of the town hall. The city's emblem since the Middle Ages, in the black basalt Catania was rebuilt in after 1693.","credit":"Julian Lupyan · CC0 · Wikimedia Commons"},
    {"src":"/terroir/Catania-Sicilia/img/catania-3.jpg","caption":"The Valle del Bove on Etna's east flank: a collapsed amphitheatre about 5 by 7 kilometres, where most modern lava flows go to die — above Zafferana and Milo.","credit":"Ji-Elle · CC BY-SA 3.0 · Wikimedia Commons"}
  ];
  const GEMS = [
    {"id":"gem-siciliana-and-scacciata","name":"Siciliana and scacciata","tag":"Born in Catania","title":"","pattern":"scacciat","story":"Catania's two closed doughs: the siciliana is a fried half-moon with tuma cheese and anchovies; the scacciata is a baked pie filled with broccoli, or tuma and anchovy, or tuma, onion and olive. Both are Catanese rosticceria, not Palermo.","body":"","where":"Mantegna, Antica Friggitoria Stella"}
  ];
  const TABLES = {
 "grande": {
  "title": "Les Grandes Tables",
  "desc": "Two starred rooms, the new wave by the opera house and the cellars of the east slope.",
  "sections": [
   {
    "label": "La crème — the starred rooms",
    "desc": "Catania's two starred rooms of the 2026 guide: Sapio's warehouse with a chef's table, and Coria, which moved here from Caltagirone and kept its star.",
    "ids": [
     "sapio",
     "coria"
    ]
   },
   {
    "label": "The new wave",
    "desc": "Three kitchens in the 2026 MICHELIN selection: shared tables by the opera house, a 'sea butcher' who ages fish like meat, and an Etna-slope room named for the old port language.",
    "ids": [
     "materia-spazio-cucina",
     "angio-macelleria-di-mare",
     "sabir"
    ]
   },
   {
    "label": "Le cantine — the wineries that open the door",
    "desc": "The two east-slope cellars that open the door: the house that put modern Etna on export lists, and the growers' collective of Milo.",
    "ids": [
     "benanti",
     "i-vigneri-di-salvo-foti"
    ]
   }
  ]
 },
 "petite": {
  "title": "Les Petites Tables",
  "desc": "The Bib Gourmand, the fish rooms around the market, the breakfast counters and the drink after.",
  "sections": [
   {
    "label": "Trattorie & osterie",
    "desc": "The Bib Gourmand dining room in the centre, and two mountain houses on Etna's east flank above Milo.",
    "ids": [
     "me-cumpari-turiddu",
     "osteria-4-archi",
     "da-rinuccio"
    ]
   },
   {
    "label": "The sea rooms",
    "desc": "The osteria inside the fish market, a room facing the Cyclops' rocks, and the Ognina harbour fish house.",
    "ids": [
     "osteria-antica-marina",
     "faraglioni-restaurant",
     "nitto-ognina-bay-civico-8"
    ]
   },
   {
    "label": "Granita, brioche & the pasticceria",
    "desc": "The Catanese breakfast: granita, a cloud of cream and a warm brioche — on Via Etnea, on the slope above town, and by the bay of Ognina.",
    "ids": [
     "pasticceria-savia",
     "bar-alecci",
     "pasticceria-quaranta"
    ]
   },
   {
    "label": "Aperitivo & cocktails",
    "desc": "The Via Gemmellaro aperitivo, the city's best wine shop with a bar under its arches, and a cocktail room down a flight of steps.",
    "ids": [
     "vermut",
     "nelson-sicily",
     "oliva-co-cocktail-society"
    ]
   },
   {
    "label": "After dark",
    "desc": "The jazz club in a noble palazzo, and the kiosk family of Piazza Umberto, mixing seltz since 1949.",
    "ids": [
     "monk-jazz-club",
     "chiosco-giammona"
    ]
   }
  ]
 },
 "street": {
  "title": "La Rue — The Street",
  "desc": "The counter and the window: Catania is the street-food capital of this coast.",
  "sections": [
   {
    "label": "La rue — the counter and the window",
    "desc": "The counter and the window: an old fry shop, fish fried in the middle of the market, and the arancino with horse inside.",
    "ids": [
     "antica-friggitoria-stella",
     "scirocco-sicilian-fish-lab",
     "canusciuti"
    ]
   }
  ]
 }
};
  const CATEGORIES = [
 {
  "key": "creme",
  "label": "La crème — the starred rooms",
  "lead": "Catania's two starred rooms of the 2026 guide: Sapio's warehouse with a chef's table, and Coria, which moved here from Caltagirone and kept its star.",
  "story": {
   "title": "Verdelli: the forced summer lemon",
   "story": "Etna lemon growers stop watering for a set time, then start again; the stressed tree flowers a second time and gives verdelli, summer lemons out of the normal cycle. The IGP specification calls the technique 'forzatura' or 'secca' and says it works because the volcanic soil drains so fast.",
   "where": "Ionian slope of Etna"
  }
 },
 {
  "key": "rising",
  "label": "The new wave",
  "lead": "Three kitchens in the 2026 MICHELIN selection: shared tables by the opera house, a 'sea butcher' who ages fish like meat, and an Etna-slope room named for the old port language.",
  "story": {
   "title": "Sabir, the language of the ports",
   "story": "Sabir was an old dialect once used in Mediterranean ports so that sea merchants of different tongues could trade (MICHELIN). Seby Sorbello named his Zafferana restaurant after it to describe a cooking that mixes Etna and the Ionian coast.",
   "where": "Sabir, Via delle Ginestre 1"
  }
 },
 {
  "key": "cantine",
  "label": "Le cantine — the wineries that open the door",
  "lead": "The two east-slope cellars that open the door: the house that put modern Etna on export lists, and the growers' collective of Milo.",
  "story": {
   "title": "The guild of the vineyard workers",
   "story": "I Vigneri was the name of the old Catanese guild of vineyard workers, the men who dug and pruned the volcano's bush vines by hand. Salvo Foti borrowed the name for his growers' collective at Milo, which works the alberello the old way and makes some of its wine in a palmento.",
   "where": "I Vigneri, Milo"
  }
 },
 {
  "key": "houses",
  "label": "Trattorie & osterie",
  "lead": "The Bib Gourmand dining room in the centre, and two mountain houses on Etna's east flank above Milo.",
  "story": {
   "title": "Pasta alla Norma",
   "story": "Pasta with fried aubergine, tomato and grated ricotta salata. Tradition says the Catanese playwright Nino Martoglio tasted it and declared it 'a Norma', a perfect thing like Bellini's opera. Whether or not the story is true, the dish is Catania's.",
   "where": "Catania"
  }
 },
 {
  "key": "seafood",
  "label": "The sea rooms",
  "lead": "The osteria inside the fish market, a room facing the Cyclops' rocks, and the Ognina harbour fish house.",
  "story": {
   "title": "Lampuga, the autumn fish",
   "story": "In autumn the Pescheria's slabs fill with blue fish, and the one to look for is lampuga — dorado, called capone in parts of Sicily — which runs roughly from September to November. It is the season's fish: ask for it by name in the market rooms and you are eating what Catania eats in October.",
   "where": "La Pescheria and the rooms around it"
  }
 },
 {
  "key": "pastry",
  "label": "Granita, brioche & the pasticceria",
  "lead": "The Catanese breakfast: granita, a cloud of cream and a warm brioche — on Via Etnea, on the slope above town, and by the bay of Ognina.",
  "story": {
   "title": "Cipollina",
   "story": "A puff-pastry case filled with stewed onion, ham, cheese and sometimes tomato — Gambero Rosso calls it typically Catanese. It sits in every rosticceria window next to the cartocciata, pizzetta and bolognese. Eat it warm at the counter, mid-morning.",
   "where": "Bar Ernesto, Caffè Europa, Savia"
  }
 },
 {
  "key": "cocktail",
  "label": "Aperitivo & cocktails",
  "lead": "The Via Gemmellaro aperitivo, the city's best wine shop with a bar under its arches, and a cocktail room down a flight of steps.",
  "story": {
   "title": "Amara, the blood-orange amaro",
   "story": "Amara is an amaro made from Arancia Rossa di Sicilia IGP — the blood oranges of the Etna plain. It was launched in 2014 by Edoardo Strano, whose grandfather planted an 80-hectare citrus grove, and is made by Rossa at Contrada San Martino, Misterbianco, on Catania's edge. Taormina's Villa Belvedere uses it in an 'Etna Spritz'. A bottle is the most local thing to carry back to the boat's bar.",
   "where": "Rossa, Contrada San Martino"
  }
 },
 {
  "key": "late-night",
  "label": "After dark",
  "lead": "The jazz club in a noble palazzo, and the kiosk family of Piazza Umberto, mixing seltz since 1949.",
  "story": {
   "title": "Seltz limone e sale",
   "story": "Fresh lemon squeezed into a glass, a pinch of salt, then very hard soda from a siphon: the kiosk drink of Catania, taken as a digestive after dark. The Giammona kiosk has served it since 1949 in Piazza Umberto, called the piazza of the kiosks.",
   "where": "Piazza Umberto"
  }
 },
 {
  "key": "street",
  "label": "La rue — the counter and the window",
  "lead": "The counter and the window: an old fry shop, fish fried in the middle of the market, and the arancino with horse inside.",
  "story": {
   "title": "The arancino has a point",
   "story": "In Catania it is arancino, masculine, and shaped as a cone; in Palermo it is arancina, feminine and round like the orange it is named for. Catanese say the cone imitates Etna — a nice story, not a documented origin. The Accademia della Crusca refused to choose: both forms are correct. It noted that 'arancino' is the form in dialect and Italian dictionaries and in the Ministry of Agriculture's list of traditional products, while 'arancina' follows the logic of the fruit.",
   "where": "Savia, Spinella, FUD (both shapes)"
  }
 }
];
  const GROUPS = [{"key":"grande","label":"Les Grandes Tables","lead":"Two starred rooms, the new wave by the opera house and the cellars of the east slope."},{"key":"petite","label":"Les Petites Tables","lead":"The Bib Gourmand, the fish rooms around the market, the breakfast counters and the drink after."},{"key":"street","label":"La Rue — The Street","lead":"The counter and the window: Catania is the street-food capital of this coast."}];
  const GROUP_OF = {"creme":"grande","rising":"grande","cantine":"grande","houses":"petite","seafood":"petite","pastry":"petite","cocktail":"petite","late-night":"petite","street":"street"};
  const BRIDGE = {
 "_rule": "SINGLE-EDITOR RULE: charter{} on a venue deliberately duplicates booking truth held in its reservation/price_range/caveat prose. Any commit editing those fields on a shortlist venue MUST update its charter block in the same commit.",
 "doors": [
  {
   "fr": "One Night",
   "en": "Crew ashore for one evening in Catania: the market osteria, the Gemmellaro aperitivo, the jazz club, the late arancino.",
   "note": "La table · le bar · la musique · le dernier plat",
   "href": "#tables",
   "open": [
    "tables",
    "bars",
    "street-food"
   ]
  },
  {
   "fr": "The Gastronomic Dig-In",
   "en": "For the chef: the fish market, what the volcano grows, the granita ritual and Etna's wine.",
   "note": "Le marché · la granita · le vin · la liste",
   "href": "#provisioning",
   "open": [
    "provisioning",
    "granita",
    "vino",
    "la-liste"
   ]
  },
  {
   "fr": "For Guests",
   "en": "Plan ahead, or save the night at the last minute in Catania: bookable, priced.",
   "note": "auto",
   "href": "#ce-soir",
   "open": [
    "ce-soir"
   ]
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
     "materia-spazio-cucina",
     "osteria-antica-marina",
     "sapio"
    ]
   },
   {
    "label": "Plan ahead — this week",
    "sub": "Book days ahead; the market rooms and the Bib Gourmand fill at weekends.",
    "ids": [
     "me-cumpari-turiddu",
     "angio-macelleria-di-mare",
     "faraglioni-restaurant"
    ]
   },
   {
    "label": "Plan ahead — the grand night",
    "sub": "Coria's palazzo: book as soon as the dates are fixed.",
    "ids": [
     "coria"
    ]
   }
  ]
 }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES, CATEGORIES, GROUPS, GROUP_OF, BRIDGE };
})();
