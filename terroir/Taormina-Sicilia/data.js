window.TERROIR_DATA = (function () {
  const COLORS = {"berth":"#2d4a5e","market":"#d97706","shop":"#059669","mainland":"#7c3aed","logistics":"#2d4a5e"};
  const CAT_LABELS = {"berth":"Signature","market":"Market / Direct","shop":"Restaurant / Bar","mainland":"Out of town","logistics":"Logistics"};
  const PRODUCT_COLORS = {"Siracusa":"#2d4a5e","Val di Noto":"#a16207","Catania":"#1f2937","Etna":"#7f1d1d","Taormina":"#059669"};
  const VENUES = [
    {"id":"st-george-by-heinz-beck","cat":"berth","tier":"berth_top","priority":1,"name":"St. George by Heinz Beck","short":"St. George by Heinz Beck","neighborhood":"The Ashbee Hotel, Viale San Pancrazio","maps":"https://www.google.com/maps/search/?api=1&query=St.+George+by+Heinz+Beck+Taormina+Sicilia","badge":"STARRED","tags":["€€€€","Essential","Sunset terrace"],"productTags":["Taormina"],"hours":"","why":"The villa and its park were designed in the early 1900s by the English architect Charles Robert Ashbee, of the Arts and Crafts movement. Heinz Beck sets the concept; the resident chef Salvatore Iuliano brings his Calabrian roots, 'nduja included. MICHELIN's 2026 standout is aubergine with fig leaf and oxidised chocolate. The terrace looks over the Strait.","address":"Viale San Pancrazio 46, Taormina","phone":"+39 0942 23537","status":"confirmed","statusChecked":"2026-10-04","lat":37.855474,"lng":15.290023,"category":"creme","subcat":"LA CRÈME","hook":"Two stars in an Arts and Crafts villa: Heinz Beck's concept, cooked by Salvatore Iuliano.","person":"Heinz Beck (concept), Salvatore Iuliano (resident chef)","signature":"Aubergine, fig leaf and oxidised chocolate","verdict":"Taormina's top-rated table; the view over the Strait is half the bill.","caveat":"Very expensive.","price_range":"€€€€","reservation":"Essential","best_time":"Sunset terrace","dishes":[{"name":"Aubergine, fig leaf and oxidised chocolate","note":"MICHELIN 2026's standout"},{"name":"Starters","note":"MICHELIN calls them the emblem of the kitchen"}],"signal_chip":{"label":"MICHELIN ★★ 2026","full":"MICHELIN 2026 ★★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€€","book":"Essential","dress":"","warn":"Very expensive.","fit":"Two stars in an Arts and Crafts villa: Heinz Beck's concept, cooked by Salvatore Iuliano."},"web":"https://www.theashbeehotel.it/menu-st-george-restaurant-by-heinz-beck/"},
    {"id":"la-capinera","cat":"shop","tier":"several","priority":4,"name":"La Capinera","short":"La Capinera","neighborhood":"Taormina","maps":"https://www.google.com/maps/search/?api=1&query=La+Capinera+Taormina+Sicilia","badge":"STARRED","tags":["€€€","Recommended"],"productTags":["Taormina"],"hours":"","why":"The menus are named for the elements, 'Sea & Air' and 'Earth & Fire', and the dishes for films: 'Benjamin Button' is pasta buttons with veal ragu and rosemary oil, 'Cacao Meravigliao' seafood tagliolini with raw Mazara red prawns and mozzarella foam. At sea level on the coast road, it is easier for a crew than the hilltop hotels. Closed Monday.","address":"Via Nazionale 177, località Spisone, Taormina","phone":"+39 338 158 8013","status":"confirmed","statusChecked":"2026-10-04","lat":37.864142,"lng":15.296193,"category":"creme","subcat":"LA CRÈME","hook":"Pietro D'Agostino's one-star by the sea at Spisone, with dishes named after films.","person":"Pietro D'Agostino","signature":"'Cacao Meravigliao' tagliolini with raw Mazara red prawns","verdict":"Playful, sea-level, easier for a yacht crew than the hilltop hotels.","caveat":"Closed Monday (MICHELIN page).","price_range":"€€€","reservation":"Recommended","dishes":[{"name":"Benjamin Button","note":"Pasta buttons, veal ragù, rosemary oil"},{"name":"Cacao Meravigliao","note":"Seafood tagliolini, raw Mazara prawns, mozzarella foam"},{"name":"Sea & Air / Earth & Fire tasting menus","note":""}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"MICHELIN 2026 ★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€","book":"Recommended","dress":"","warn":"Closed Monday (MICHELIN page).","fit":"Pietro D'Agostino's one-star by the sea at Spisone, with dishes named after films."},"web":"https://www.pietrodagostino.it/"},
    {"id":"zash","cat":"berth","tier":"berth_top","priority":2,"name":"Zash","short":"Zash","neighborhood":"Riposto","maps":"https://www.google.com/maps/search/?api=1&query=Zash+Riposto+Sicilia","badge":"STARRED","tags":["€€€€","Recommended","Dinner"],"productTags":["Etna"],"hours":"","why":"Zash keeps the stone structure of a 19th-century palmento, the press-house where Etna grapes were trodden and fermented, and serves dinner inside it, between the volcano and the sea. Raciti's remembered dish (MICHELIN 2026) is charcoal-grilled tuna belly with smoked aubergine, grapefruit, red onion and teriyaki. Dinner only; rural, so you need a car.","address":"SP 2 I/II 60, Archi","phone":"+39 095 782 8932","status":"confirmed","statusChecked":"2026-10-04","category":"creme","subcat":"LA CRÈME","hook":"Giuseppe Raciti's one-star in a restored 19th-century palmento, reached through a citrus orchard.","person":"Giuseppe Raciti","signature":"Charcoal-grilled tuna ventresca, smoked aubergine, grapefruit, teriyaki","verdict":"Best for understanding Etna's wine architecture with dinner attached.","caveat":"Rural, need a car; dinner only.","price_range":"€€€€","reservation":"Recommended","best_time":"Dinner","dishes":[{"name":"Tuna ventresca, charcoal-grilled","note":"With smoked aubergines, grapefruit, red onion, teriyaki (MICHELIN 2026)"},{"name":"Themed tasting menus","note":"Dishes can be ordered à la carte"}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"MICHELIN 2026 ★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€€","book":"Recommended","dress":"","warn":"Rural, need a car; dinner only.","fit":"Giuseppe Raciti's one-star in a restored 19th-century palmento, reached through a citrus orchard."},"web":"https://www.zash.it/"},
    {"id":"shalai","cat":"berth","tier":"berth_top","priority":3,"name":"Shalai","short":"Shalai","neighborhood":"Via Marconi, town centre (in the Shalai hotel)","maps":"https://www.google.com/maps/search/?api=1&query=Shalai+Linguaglossa+Sicilia","badge":"STARRED","tags":["€€€","Recommended"],"productTags":["Etna"],"hours":"","why":"Giovanni Santoro was born in Linguaglossa and has held a star here since 2015, with the Pennisi family. There are four tasting menus, one of fish and one at the chef's whim. MICHELIN remembers a creamy provola risotto with lemon, wild herbs and black Etna truffle; the restaurant's own signature is a lemon dish called 'Lumie di Sicilia'.","address":"Via Guglielmo Marconi 25, Linguaglossa","phone":"+39 095 643128","status":"confirmed","statusChecked":"2026-10-04","category":"creme","subcat":"LA CRÈME","hook":"Etna's north-slope one-star since 2015: chef Giovanni Santoro cooking in his home town.","person":"Giovanni Santoro","signature":"Provola risotto, lemon, wild herbs, black truffle","verdict":"The starred dinner for an Etna wine day on the north slope.","price_range":"€€€","reservation":"Recommended","dishes":[{"name":"Creamy provola risotto with lemon, wild herbs and black truffle","note":"MICHELIN 2026"},{"name":"'Lumie di Sicilia'","note":"Signature lemon dish named on the restaurant's site"},{"name":"Lemon dessert","note":"MICHELIN"}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"MICHELIN 2026 ★","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"charter":{"price":"€€€","book":"Recommended","dress":"","warn":"","fit":"Etna's north-slope one-star since 2015: chef Giovanni Santoro cooking in his home town."},"web":"https://www.shalai.it/ristorante.html"},
    {"id":"kiste","cat":"shop","tier":"several","priority":5,"name":"Kisté - Easy Gourmet","short":"Kisté","neighborhood":"Via Santa Maria de' Greci, behind the Duomo","maps":"https://www.google.com/maps/search/?api=1&query=Kist%C3%A9+Taormina+Sicilia","badge":"NEW WAVE","tags":["€€","Dinner on the terrace"],"productTags":["Taormina"],"hours":"Tue-Fri 19:00-22:30; Sat-Sun 12:30-14:30 and 19:30-22:00; closed Monday (own site, read 5 Oct 2026)","why":"D'Agostino, the chef of the starred La Capinera, opened Kisté in 2017 as its relaxed sibling, inside a 15th-century palazzo with a summer terrace and cushions on the stairs for an aperitivo. The cooking is the same school at a lower register: red prawn with tagliolini al cacao, grouper braciole, raviolini di mare in a shellfish reduction. MICHELIN lists it at two coins.","address":"Via Santa Maria de' Greci 2, 98039 Taormina","phone":"+39 333 371 1606","status":"confirmed","statusChecked":"2026-10-05","lat":37.850807,"lng":15.283091,"category":"rising","subcat":"THE NEW WAVE","hook":"Pietro D'Agostino's easy-going second table, in a 15th-century house behind the Duomo.","person":"Pietro D'Agostino","signature":"Tagliolini al cacao, gambero rosso","verdict":"The last-minute dinner inside Taormina's walls when La Capinera is full.","caveat":"MICHELIN shows weekend lunch only, the own site shows weekend dinner too: confirm when booking.","price_range":"€€","reservation":"OpenTable, phone, or info@kiste.it","best_time":"Dinner on the terrace","dishes":[{"name":"Tagliolini al cacao, gambero rosso","note":"Cocoa tagliolini with red prawn (own site)"},{"name":"Braciole di cernia, gambero rosso","note":"Grouper rolls with red prawn (own site)"},{"name":"Raviolini di mare, ristretto ai crostacei","note":"Seafood ravioli in shellfish reduction (own site)"}],"signal_chip":{"label":"MICHELIN 2026","full":"MICHELIN Guide selected","cosign":"MICHELIN Guide, page read 5 Oct 2026"},"charter":{"price":"€€ (MICHELIN)","book":"OpenTable, phone +39 333 371 1606, or info@kiste.it","dress":"","warn":"Closed Monday; weekend dinner shown on its own site but not on MICHELIN's — confirm when booking","fit":"Pietro D'Agostino's second table, behind the Duomo; Tue–Fri 19:00–22:30"},"web":"https://www.kiste.it/","hot_this_month":"October 2026: Tue–Fri 19:00–22:30, weekends lunch and dinner (own site, 5 Oct) — the last-minute table inside the walls."},
    {"id":"vico-astemio","cat":"shop","tier":"several","priority":6,"name":"Vico Astemio","short":"Vico Astemio","neighborhood":"Via Cavour, historic lanes","maps":"https://www.google.com/maps/search/?api=1&query=Vico+Astemio+Riposto+Sicilia","badge":"NEW WAVE","tags":["€€€"],"productTags":["Etna"],"hours":"Tue-Sat dinner 19:00-23:00; Sunday lunch 12:15-15:15; closed Monday (own site, read 5 Oct 2026). MICHELIN lists Tue-Sun 19:00-23:00","why":"Chef-patron Massimiliano Vasta sets tables along a narrow lane of Riposto's old centre and inside under ancient stone arches. MICHELIN 2026 points to the beef antipasto under grated salted egg yolk and fish where freshness and precision lead. The list is Sicilian with bottles from Slovenia, Austria, Germany and France, fairly priced and poured by the glass. A short walk for a crew in Riposto marina.","address":"Via Cavour 34, Riposto","phone":"+39 095 092 6713","status":"confirmed","statusChecked":"2026-10-04","lat":37.731897,"lng":15.203477,"category":"rising","subcat":"THE NEW WAVE","hook":"Massimiliano Vasta's tables in a stone-arched alley near Riposto harbour.","person":"Massimiliano Vasta","signature":"Beef antipasto with grated salted egg yolk","verdict":"Ideal for a crew in Riposto marina.","price_range":"€€€","dishes":[{"name":"Beef antipasto, salted egg yolk","note":"MICHELIN 2026"},{"name":"Day's fish","note":"Precise, plain"}],"charter":{"price":"€€","book":"PRENOTA on its site, or +39 095 092 6713","dress":"","warn":"Closed Monday; Sunday lunch only on its own site (MICHELIN lists Sunday dinner): confirm","fit":"An alley room near Riposto's harbour, 25 minutes down the coast; dinner Tue–Sat 19:00–23:00"},"web":"https://www.vicoastemio.it"},
    {"id":"casu-osteria-contemporanea","cat":"shop","tier":"several","priority":7,"name":"Casu Osteria Contemporanea","short":"Casu Osteria Contemporanea","neighborhood":"Corso Italia","maps":"https://www.google.com/maps/search/?api=1&query=Casu+Osteria+Contemporanea+Giarre+Sicilia","badge":"NEW WAVE","tags":["€€"],"productTags":["Etna"],"hours":"Tue-Sun 19:00-22:30, closed Monday (own site, read 5 Oct 2026); MICHELIN lists 18:00-22:00","why":"Mario Casu runs a small, informal room on Giarre's main street and also teaches cooking classes and consults, his own site says. MICHELIN 2026 selects it for a short list of reasonably priced Sicilian dishes built on top-quality ingredients. Giarre is a short drive from Riposto marina and on the way up to the Etna wine roads, so it works as a late table after a vineyard day.","address":"Corso Italia 294, Giarre","phone":"+39 380 862 2848","status":"confirmed","statusChecked":"2026-10-04","lat":37.729206,"lng":15.193399,"category":"rising","subcat":"THE NEW WAVE","hook":"Chef Mario Casu's short-menu osteria on Giarre's Corso Italia, dinner six nights a week.","signature":"Short daily Sicilian menu","verdict":"A low-key stop between Riposto marina and the Etna wine roads.","caveat":"Few details published; ask for the day's dishes.","price_range":"€€","dishes":[{"name":"Short Sicilian menu","note":"Changes with the market"},{"name":"Reasonably priced dishes","note":"MICHELIN"}],"charter":{"price":"€€","book":"Phone +39 380 862 2848, direct","dress":"","warn":"Closed Monday; its site says 19:00–22:30, MICHELIN 18:00–22:00","fit":"A few tables on Giarre's main street, 20 minutes down the coast"},"web":"https://www.mariocasu.it/"},
    {"id":"tenuta-delle-terre-nere","cat":"shop","tier":"several","priority":8,"name":"Tenuta delle Terre Nere","short":"Tenuta delle Terre Nere","neighborhood":"Contrada Calderara, north slope","maps":"https://www.google.com/maps/search/?api=1&query=Tenuta+delle+Terre+Nere+Randazzo+Sicilia","badge":"CANTINA","tags":["Email visite@tenutaterrenere.com","Morning"],"productTags":["Etna"],"hours":"","why":"Vinous (Sep 2026) credits Marc de Grazia with the contrada-labelling strategy that turned Etna into a map of named lava flows. The estate bottles Calderara Sottana, Santo Spirito, Feudo di Mezzo and Guardiola separately, plus a Carricante from Contrada Salice in Milo: one grape, one cellar, several flows, the clearest lesson on the volcano.","address":"Contrada Calderara snc, 95036 Randazzo (CT)","phone":"+39 095 924002","status":"confirmed","statusChecked":"2026-10-04","category":"cantine","subcat":"LE CANTINE","hook":"Marc de Grazia's estate, the house most credited with teaching the world to read Etna by contrada.","person":"Marc de Grazia","signature":"Calderara Sottana Rosso","verdict":"The single best place to taste the contrada idea side by side: same grape, same cellar, different lava.","caveat":"Visits by email only; no public price on the site.","price_range":"Not published on own site; a third-party listing quotes a 3-hour experience from EUR 79 (unverified)","reservation":"Email visite@tenutaterrenere.com","best_time":"Morning","dishes":[{"name":"Calderara Sottana Rosso","note":"Nerello Mascalese from the estate's home contrada"},{"name":"Santo Spirito / Guardiola / Feudo di Mezzo","note":"contrada reds to taste as a flight"},{"name":"Contrada Salice – Milo Bianco","note":"Carricante from the Bianco Superiore commune"}],"web":"https://www.tenutaterrenere.com","hot_this_month":"October 2026: harvest month on the north slope — visits by appointment only."},
    {"id":"graci","cat":"shop","tier":"several","priority":9,"name":"Graci","short":"Graci","neighborhood":"Passopisciaro, Contrada Feudo di Mezzo, north slope","maps":"https://www.google.com/maps/search/?api=1&query=Graci+Castiglione+di+Sicilia+Sicilia","badge":"CANTINA","tags":["Online booking on graci.eu","Morning or late afternoon"],"productTags":["Etna"],"hours":"By appointment; experiences about 2 hours (graci.eu, seen 2026-10-04)","why":"Founded in 2005, Graci farms vineyards between 600 and 1,000 m, including the Arcuria contrada. Every visit starts in the estate's 19th-century palmento, then walks the vines and ends with a technical tasting served with the estate's own olive oil and bread: the best place on the north slope to see how an old Etna winery worked.","address":"Contrada Feudo di Mezzo, SP7iii, 95012 Passopisciaro, Castiglione di Sicilia (CT)","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"cantine","subcat":"LE CANTINE","hook":"Alberto Graci's north-slope estate, entered through a 19th-century palmento.","person":"Alberto Graci","signature":"Etna Rosso DOC Arcurìa","verdict":"The clearest published offer on the north slope and the best palmento to stand inside.","price_range":"Classic Tasting EUR 55 pp, 4 wines, 2 hours (graci.eu, seen 2026-10-04); three further tiers","reservation":"Online booking on graci.eu","best_time":"Morning or late afternoon","dishes":[{"name":"Etna Bianco DOC Arcurìa","note":"Carricante from the high Arcurìa contrada"},{"name":"Etna Rosso DOC Arcurìa","note":"the estate's reference red"}],"web":"https://www.graci.eu"},
    {"id":"frank-cornelissen","cat":"shop","tier":"several","priority":10,"name":"Frank Cornelissen","short":"Frank Cornelissen","neighborhood":"Passopisciaro / Solicchiata, north slope","maps":"https://www.google.com/maps/search/?api=1&query=Frank+Cornelissen+Castiglione+di+Sicilia+Sicilia","badge":"CANTINA","tags":["By email / web form with date and time","10:30 slot"],"productTags":["Etna"],"hours":"Slots 10:30 and 15:00; e-bike vineyard tour 08:30 (frankcornelissen.it, seen 2026-10-04)","why":"Frank Cornelissen's visiting rules say as much as his wines: adults only, no strong perfume or aftershave in the cellar, punctuality required, and no food. Instead the estate hands you a list of nearby restaurants. It publishes every price in full, from the core Classic tasting to the Magma, its single-site Nerello Mascalese.","address":"Cellar: Via Canonico Zumbo 1, frazione Passopisciaro, 95012 Castiglione di Sicilia (CT)","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"cantine","subcat":"LE CANTINE","hook":"The Belgian who made Etna the reference for zero-additive wine; adults only, scent-free, on time.","person":"Frank Cornelissen","signature":"Magma (the top Nerello Mascalese)","verdict":"Book it if you want to understand natural wine at its most uncompromising; come scent-free and on time.","caveat":"No food; strict etiquette; the top tier is expensive.","price_range":"Classic EUR 40 pp; Magma EUR 210 pp; Private Classic EUR 350 (max 6); Private Magma EUR 1,400 (max 6); e-bike tour EUR 340 pp (seen 2026-10-04)","reservation":"By email / web form with date and time","best_time":"10:30 slot","dishes":[{"name":"Classic Tasting","note":"the core range, EUR 40"},{"name":"Magma Tasting","note":"the flagship single-site red, EUR 210"}],"web":"https://www.frankcornelissen.it"},
    {"id":"bar-timeo","cat":"shop","tier":"several","priority":11,"name":"Bar Timeo — Belmond Grand Hotel Timeo","short":"Bar Timeo","neighborhood":"Beside the Greek Theatre","maps":"https://www.google.com/maps/search/?api=1&query=Bar+Timeo+Taormina+Sicilia","badge":"HOTEL BAR","tags":["€€€€","Call ahead for non-guests","Sunset"],"productTags":["Taormina"],"hours":"","why":"Belmond dates the Timeo to 1850, when it opened as a guesthouse for artists; the German painter Otto Geleng stayed to paint the Greek Theatre from its terrace, and the hotel's MICHELIN-starred restaurant now carries his name. Bar Timeo serves classic cocktails with the bay and Etna in front; Bar Clementina is in the Villa Timeo next door.","address":"Via Teatro Greco, Taormina","phone":"","status":"confirmed","statusChecked":"2026-10-04","lat":37.852077,"lng":15.291264,"category":"hotel-bar","subcat":"THE GRAND-HOTEL BARS","hook":"The terrace bar of Taormina's first hotel, an 1850 guesthouse for painters beside the theatre.","signature":"Classic cocktail on the terrace","verdict":"The apéritif with the most history on the coast; a classic cocktail at sunset.","caveat":"Non-guest access not stated; seasonal hotel — confirm the closing date.","price_range":"€€€€","reservation":"Call ahead for non-guests","best_time":"Sunset","dishes":[{"name":"Negroni / Martini","note":"classics, done properly"},{"name":"Sunset view","note":"the bay and Etna"}],"signal_chip":{"label":"MICHELIN ★ 2026","full":"Hotel restaurant Otto Geleng: MICHELIN 2026 ★ (per Belmond)","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"web":"https://www.belmond.com/en/hotels/europe/italy/grand-hotel-timeo-taormina"},
    {"id":"bar-sant-andrea-and-gwendoline-s","cat":"shop","tier":"several","priority":12,"name":"Bar Sant'Andrea and Gwendoline's — Belmond Villa Sant'Andrea","short":"Bar Sant'Andrea and Gwendoline's","neighborhood":"Mazzarò bay","maps":"https://www.google.com/maps/search/?api=1&query=Bar+Sant%27Andrea+and+Gwendoline%27s+Taormina+Sicilia","badge":"HOTEL BAR","tags":["€€€€","Call ahead","Sunset"],"productTags":["Taormina"],"hours":"","why":"Villa Sant'Andrea sits on the beach of Mazzaro, below the town, which makes it the bar a crew reaches first by tender. Belmond lists two rooms: Bar Sant'Andrea for mixology at the water, and Gwendoline's Bar indoors, mid-century in style, plus the Lido Villeggiatura beach club. Whether non-guests are welcome is not stated: call.","address":"Mazzarò, Taormina","phone":"","status":"confirmed","statusChecked":"2026-10-04","lat":37.854211,"lng":15.301598,"category":"hotel-bar","subcat":"THE GRAND-HOTEL BARS","hook":"Belmond's sea-level hotel at Mazzaro: a waterline cocktail bar and a mid-century nightcap room.","signature":"Cocktail at the waterline","verdict":"The drink at the water's edge if you come in by tender to Mazzarò.","caveat":"Non-guest access not stated; seasonal.","price_range":"€€€€","reservation":"Call ahead","best_time":"Sunset","dishes":[{"name":"Mixology list","note":"Bar Sant'Andrea"},{"name":"Indoor nightcap","note":"Gwendoline's"}],"web":"https://www.belmond.com/en/hotels/europe/italy/villa-sant-andrea-taormina-mare"},
    {"id":"san-domenico-palace","cat":"shop","tier":"several","priority":13,"name":"San Domenico Palace (Four Seasons) — Oratorio dei Frati","short":"San Domenico Palace (Four Seasons)","neighborhood":"Former 14th-century Dominican convent","maps":"https://www.google.com/maps/search/?api=1&query=San+Domenico+Palace+Taormina+Sicilia","badge":"HOTEL BAR","tags":["€€€€","Call ahead","Sunset"],"productTags":["Taormina"],"hours":"Anciovi April-November (reported)","why":"The Oratorio dei Frati lounge occupies the convent's old refectory, heated in winter by its great fireplace, and Anciovi serves seafood and cocktails by the cliff-edge pool from April to November, according to travel-trade listings. The hotel was the main set of The White Lotus season two. Non-guest access was not confirmed.","address":"Piazza San Domenico, Taormina","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.849849,"lng":15.283187,"category":"hotel-bar","subcat":"THE GRAND-HOTEL BARS","hook":"A 14th-century Dominican convent turned Four Seasons; the bar is the friars' refectory.","signature":"Spumante in the refectory bar","verdict":"Worth one glass for the cloister alone.","caveat":"Four Seasons site blocked automated reading; non-guest access unconfirmed.","price_range":"€€€€","reservation":"Call ahead","best_time":"Sunset","dishes":[{"name":"Sparkling aperitivo","note":"in the Oratorio"},{"name":"Cocktails at Anciovi","note":"Apr-Nov, poolside"}]},
    {"id":"in-cucina-dai-pennisi","cat":"shop","tier":"plenty","priority":14,"name":"In Cucina dai Pennisi","short":"In Cucina dai Pennisi","neighborhood":"Via Umberto I","maps":"https://www.google.com/maps/search/?api=1&query=In+Cucina+dai+Pennisi+Linguaglossa+Sicilia","badge":"OSTERIA","tags":["€€","Lunch"],"productTags":["Etna"],"hours":"","why":"The Pennisi family business started in this butcher's shop, and the counter is still the centre of the room: you choose meat, salumi and cheese and eat at small tables in front of it. Grilled cuts, filled rolls and burgers sit beside cooked dishes. The same family is behind the Shalai hotel and its starred restaurant up the street.","address":"Via Umberto I 9, Linguaglossa","phone":"+39 095 643160","status":"confirmed","statusChecked":"2026-10-04","lat":37.842473,"lng":15.141485,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"A Linguaglossa butcher's shop where you eat facing the meat counter. Bib Gourmand.","person":"Pennisi family","signature":"Grilled meat from the counter","verdict":"The meat lunch on an Etna wine day.","price_range":"€€","best_time":"Lunch","dishes":[{"name":"Grilled meats","note":"Chosen from the counter"},{"name":"Salumi and cheese board","note":""},{"name":"Filled rolls and burgers","note":"Quick lunch option"}],"signal_chip":{"label":"MICHELIN Bib Gourmand 2026","full":"MICHELIN 2026 Bib Gourmand","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"web":"https://www.daipennisi.it/"},
    {"id":"san-giorgio-e-il-drago","cat":"shop","tier":"plenty","priority":15,"name":"San Giorgio e il Drago","short":"San Giorgio e il Drago","neighborhood":"Piazza San Giorgio, medieval centre","maps":"https://www.google.com/maps/search/?api=1&query=San+Giorgio+e+il+Drago+Randazzo+Sicilia","badge":"OSTERIA","tags":[],"productTags":["Etna"],"hours":"","why":"Brothers Daniele and Pippo Anzalone run the room and the cellar; their mother Paola cooks. Gambero Rosso's dish is lamb baked with potatoes and a Nerello Mascalese reduction, and the list runs past 400 labels, mostly from the volcano. Slow Food's Osterie d'Italia 2026 gives it the Chiocciola, its top mark. Closed Tuesdays.","address":"Piazza San Giorgio 28, Randazzo","phone":"+39 095 923972","status":"confirmed","statusChecked":"2026-10-04","lat":37.879796,"lng":14.952112,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"The Anzalone family's trattoria in lava-stone Randazzo since 1998, with 400+ mostly Etna labels.","person":"Daniele and Pippo Anzalone","signature":"Oven-baked lamb with potatoes and Nerello reduction","verdict":"Best family table for an Etna north-slope wine day.","caveat":"Closed Tuesdays (Gambero Rosso 2024).","dishes":[{"name":"Lamb, potatoes, Nerello reduction","note":"Gambero Rosso 2024"},{"name":"Handmade pasta, mushrooms, local salumi","note":""}],"signal_chip":{"label":"Slow Food Chiocciola 2026","full":"Slow Food Osteria d'Italia 2026 Chiocciola","cosign":"Slow Food, Osterie d'Italia 2026"}},
    {"id":"veneziano","cat":"shop","tier":"plenty","priority":16,"name":"Veneziano","short":"Veneziano","neighborhood":"Contrada Arena, SS120 km 187","maps":"https://www.google.com/maps/search/?api=1&query=Veneziano+Randazzo+Sicilia","badge":"OSTERIA","tags":["€€","Autumn, mushroom season"],"productTags":["Etna"],"hours":"","why":"MICHELIN 2026 sends you here for the mixed mushroom antipasto and the mushroom soup, then an 'asado' mixed grill and capocollo from the Nero dei Nebrodi black pig, the semi-wild breed of the hills north of Etna. October is the season the menu was built for, and it sits on the road between the north-slope wineries.","address":"Contrada Arena, SS 120 km 187, Randazzo","phone":"+39 095 799 1353","status":"confirmed","statusChecked":"2026-10-04","lat":37.875962,"lng":14.972432,"category":"houses","subcat":"TRATTORIE & OSTERIE","hook":"The autumn mushroom table of Etna, on the SS120 outside Randazzo. Bib Gourmand.","signature":"Mixed Etna mushrooms","verdict":"The autumn funghi table of Etna.","price_range":"€€","best_time":"Autumn, mushroom season","dishes":[{"name":"Mixed mushroom antipasto","note":"MICHELIN"},{"name":"Mushroom soup","note":"MICHELIN"},{"name":"Asado mixed grill","note":"MICHELIN"},{"name":"Nero dei Nebrodi capocollo","note":"Black-pig cured meat"}],"signal_chip":{"label":"MICHELIN Bib Gourmand 2026","full":"MICHELIN 2026 Bib Gourmand","cosign":"MICHELIN Guide Italia 2026 (Nov 2025), page re-read 4 Oct 2026"},"web":"https://www.ristoranteveneziano.it/"},
    {"id":"a-putia","cat":"shop","tier":"plenty","priority":17,"name":"À Putia - Enoteca e Cucina","short":"À Putia - Enoteca e Cucina","neighborhood":"Via Umberto I","maps":"https://www.google.com/maps/search/?api=1&query=%C3%80+Putia+-+Enoteca+e+Cucina+Giardini+Naxos+Sicilia","badge":"SEAFOOD","tags":["€€","Essential"],"productTags":["Taormina"],"hours":"Mon-Sat 19:30-22:30, closed Sunday; hours vary seasonally (MICHELIN, read 5 Oct 2026)","why":"'Putia' is Sicilian for shop, and for forty years this was one: a neighbourhood grocery opened in 1946 on Giardini's main street. In the 1980s it turned into a trattoria-wine bar of a handful of tables, cooking fish and market vegetables with Sicilian and imported wines. MICHELIN keeps it in the 2026 selection and warns that hours shift with the seasons, so a phone call is part of the meal.","address":"Via Umberto I° 456, Giardini Naxos","phone":"+39 0942 52755","status":"confirmed","statusChecked":"2026-10-04","category":"seafood","subcat":"THE SEA ROOMS","hook":"A 1946 grocery that became a trattoria-wine bar: paper tablecloths, the day's fish, a serious list.","signature":"Fish and market produce","verdict":"Best-value fish table under Taormina.","caveat":"Few tables, seasonal hours; parking hard.","price_range":"€€","reservation":"Essential","dishes":[{"name":"Day's fish and seafood","note":"MICHELIN"},{"name":"Market vegetables","note":""}]},
    {"id":"bam-bar","cat":"shop","tier":"plenty","priority":18,"name":"Bam Bar","short":"Bam Bar","neighborhood":"Via di Giovanni, behind the Teatro Antico","maps":"https://www.google.com/maps/search/?api=1&query=Bam+Bar+Taormina+Sicilia","badge":"PASTRY","tags":["€","No — queue","7:30 opening"],"productTags":["Taormina"],"hours":"","why":"Rosario 'Saretto' Bambara and his late brother Tino opened in 1996 in their father's former lamp and electrical shop; Saro learned granita during a year at Wunderbar. Sixteen flavours a day, 23 across the year, from mulberry and fig in summer to mandarin and pomegranate in winter. The White Lotus made the queue longer, 50-60 people from 07:30 in summer.","address":"Via di Giovanni 45, Taormina","phone":"","status":"confirmed","statusChecked":"2026-10-04","lat":37.853128,"lng":15.288849,"category":"pastry","subcat":"GRANITA, BRIOCHE & THE PASTICCERIA","hook":"Two brothers turned their father's lamp shop into Taormina's granita counter in 1996.","person":"Rosario 'Saretto' Bambara","signature":"Granita alla mandorla","verdict":"Go at opening or out of season; almond plus lemon or coffee, brioche warm.","caveat":"Table service only after queuing; no quick takeaway per Gambero Rosso.","price_range":"€","reservation":"No — queue","best_time":"7:30 opening","dishes":[{"name":"Granita alla mandorla","note":"Gambero Rosso's recommendation"},{"name":"Granita al limone","note":""},{"name":"Seasonal fruit granita","note":"October: fig/pomegranate depending on day"}],"hot_this_month":"October 2026: fig or pomegranate granita, depending on the day."},
    {"id":"pasticceria-gelateria-santo-musumeci","cat":"shop","tier":"plenty","priority":19,"name":"Pasticceria Gelateria Santo Musumeci","short":"Pasticceria Gelateria Santo Musumeci","neighborhood":"Piazza Santa Maria","maps":"https://www.google.com/maps/search/?api=1&query=Pasticceria+Gelateria+Santo+Musumeci+Randazzo+Sicilia","badge":"PASTRY","tags":["€"],"productTags":["Etna"],"hours":"","why":"Giovanna, Sandra and Carmen run the shop their father Santo founded. In June 2026 thieves took a key machine; the Sherbet Festival community raised nearly EUR 20,000 in about ten days to replace it. Months later Gambero Rosso's Gelaterie d'Italia 2027 gave it the Valrhona special prize, Gelateria of the Year. Dissapore singled out its lemon granita, infused with the peel.","address":"Piazza Santa Maria 5, Randazzo (CT)","phone":"","status":"confirmed","statusChecked":"2026-10-04","category":"pastry","subcat":"GRANITA, BRIOCHE & THE PASTICCERIA","hook":"Three sisters on Etna's north flank, Gambero Rosso's Gelateria of the Year.","person":"Giovanna Musumeci","signature":"Granita al limone","verdict":"The reason to stop in Randazzo between wineries: granita that tastes of the fruit, and old Sicilian sweets.","price_range":"€","dishes":[{"name":"Granita al limone","note":"Peel-infused"},{"name":"Granita alla mandorla","note":""},{"name":"Mustaccioli and torroni","note":"Old island sweets"}],"signal_chip":{"label":"Gambero Rosso","full":"Gambero Rosso Gelaterie d'Italia 2027 — Premio Speciale Valrhona, Gelateria dell'Anno","cosign":"Gambero Rosso"},"hot_this_month":"Gelaterie d'Italia 2027 (Gambero Rosso): Gelateria of the Year."},
    {"id":"antico-caffe-san-giorgio","cat":"shop","tier":"plenty","priority":20,"name":"Antico Caffè San Giorgio","short":"Antico Caffè San Giorgio","neighborhood":"Main square","maps":"https://www.google.com/maps/search/?api=1&query=Antico+Caff%C3%A8+San+Giorgio+Castelmola+Sicilia","badge":"COFFEE","tags":["€"],"productTags":["Taormina"],"hours":"","why":"The bar's tradition holds that its first owner, Don Vincenzo Blandano, greeted guests with a sweet almond wine, and the recipe is still poured. The visitors' book is said to carry Marconi and Churchill; those are the bar's own stories, not checked. What is certain is the position: the top of the climb from Taormina, with the coast below.","address":"Main square, Castelmola","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.858861,"lng":15.278141,"category":"pastry","subcat":"COFFEE","hook":"Castelmola's square-side bar since 1907, pouring the almond wine it says it invented.","signature":"Vino alla mandorla","verdict":"One glass of almond wine on the terrace after the climb from Taormina.","caveat":"Signature claims are the bar's own tradition, not independently checked; 2026 trading not confirmed.","price_range":"€","dishes":[{"name":"Vino alla mandorla","note":"Sweet almond wine"},{"name":"Granita","note":""}]},
    {"id":"morgana","cat":"shop","tier":"plenty","priority":21,"name":"Morgana","short":"Morgana","neighborhood":"Scesa Morgana, off Corso Umberto","maps":"https://www.google.com/maps/search/?api=1&query=Morgana+Taormina+Sicilia","badge":"COCKTAIL","tags":["€€","booking@morganabar.it","22:00"],"productTags":["Taormina"],"hours":"Apr-Dec: Sun-Thu 18:00-02:00; Fri-Sat 19:00-03:00; closed Jan-Mar (seen 2026-10-04)","why":"Morgana tears up its own interior every year and publishes a book of the changes. Christian Sciglio wrote the drinks around Sicilian ingredients and created the Grand Tour Gin, named for the travellers who made Taormina. It opens April to December only, late into the night, down a stairway off Corso Umberto.","address":"Scesa Morgana 4, 98039 Taormina","phone":"+39 329 144 1041","status":"confirmed","statusChecked":"2026-10-04","lat":37.852061,"lng":15.286737,"category":"cocktail","subcat":"APERITIVO & COCKTAILS","hook":"Taormina's cocktail bar, re-skinned every year, with Christian Sciglio's list and his own gin.","person":"Christian Sciglio (drinks)","signature":"Signature Morgana cocktail","verdict":"The one bar drink in Taormina; book.","caveat":"Closed Jan-Mar.","price_range":"€€","reservation":"booking@morganabar.it","best_time":"22:00","dishes":[{"name":"Signature list","note":"Sicilian ingredients"},{"name":"Grand Tour Gin","note":"Sciglio's own gin"}],"web":"https://www.morganataormina.it"},
    {"id":"casamatta","cat":"shop","tier":"plenty","priority":22,"name":"Casamatta","short":"Casamatta","neighborhood":"Old town","maps":"https://www.google.com/maps/search/?api=1&query=Casamatta+Taormina+Sicilia","badge":"WINE BAR","tags":["€€","Aperitivo"],"productTags":["Taormina"],"hours":"","why":"Known only from its listing on Raisin, the natural-wine app: an informal room pouring natural and conventional wine by the glass with Sicilian food. Its address and its 2026 opening were not confirmed in this research, so treat it as a lead to check, not a booking: ask at your hotel or on the Corso whether it is pouring this autumn.","address":"Taormina (address not read)","phone":"","status":"unverified","statusChecked":"2026-10-04","lat":37.850724,"lng":15.283607,"category":"cocktail","subcat":"ENOTECHE & NATURAL WINE","hook":"An informal Taormina bar listed for natural wine, cocktails and Sicilian plates.","signature":"Natural wine by the glass","verdict":"The natural-wine glass in Taormina.","caveat":"Address and 2026 liveness not confirmed.","price_range":"€€","best_time":"Aperitivo","dishes":[{"name":"Natural Sicilian wine","note":"by the glass"},{"name":"Sicilian plates","note":"informal"}]}
  ];
  const NEIGHBORHOODS = [
    {"name":"Taormina","desc":"One street, one theatre, one view.","maps":"https://www.google.com/maps/search/?api=1&query=Taormina+Corso+Umberto"},
    {"name":"Castelmola","desc":"The medieval village above Taormina, by the old stepped path.","maps":"https://www.google.com/maps/search/?api=1&query=Castelmola"},
    {"name":"Linguaglossa and Castiglione","desc":"Where Etna wine was reborn, bottled by the contrada.","maps":"https://www.google.com/maps/search/?api=1&query=Castiglione+di+Sicilia"},
    {"name":"Randazzo","desc":"A medieval town built of black lava that the flows have never overrun.","maps":"https://www.google.com/maps/search/?api=1&query=Randazzo"}
  ];
  const WALKS = [
    {"name":"Taormina to Castelmola on the old path","desc":"Up the stone steps above Taormina to the village on the rock.","maps":"https://www.google.com/maps/search/?api=1&query=Santuario+Madonna+della+Rocca+Taormina"}
  ];
  const WORK_SPOTS = [

  ];
  const LANDMARKS = [
    {"name":"Teatro Antico, Taormina","desc":"Greek-founded, Roman-rebuilt, and framed so that Etna and the bay become the backdrop.","maps":"https://www.google.com/maps/search/?api=1&query=Teatro+Antico+di+Taormina"},
    {"name":"Corso Umberto, Taormina","desc":"The one main street, from Porta Messina to Porta Catania, with a terrace in the middle.","maps":"https://www.google.com/maps/search/?api=1&query=Piazza+IX+Aprile+Taormina"},
    {"name":"Villa Comunale and Lady Florence Trevelyan","desc":"An English gardener's park of follies, built on the cliff edge in the 1890s.","maps":"https://www.google.com/maps/search/?api=1&query=Villa+Comunale+Taormina"}
  ];
  const PHOTOS = [
    {"src":"/terroir/Taormina-Sicilia/img/taormina-1.jpg","caption":"The Teatro Antico of Taormina, Greek-founded and Roman-rebuilt, with the bay of Naxos and Etna behind the stage. Goethe climbed up to it on 7 May 1787 and wrote that no audience had ever had such a scene before it.","credit":"Radek Kucharski · CC BY 2.0 · Wikimedia Commons"},
    {"src":"/terroir/Taormina-Sicilia/img/taormina-2.jpg","caption":"Stone steps among the plants on Isola Bella, the small island joined to the beach by a sandbar, bought in 1890 by Lady Florence Trevelyan — the same English gardener who laid out Taormina's public garden.","credit":"Scott Wylie · CC BY 4.0 · Wikimedia Commons"},
    {"src":"/terroir/Taormina-Sicilia/img/taormina-3.jpg","caption":"The square of Castelmola, the medieval village on the rock above Taormina, reached on foot by the old stepped path — where the village bar's almond wine was the welcome.","credit":"Ruigeroeland · CC BY-SA 3.0 · Wikimedia Commons"}
  ];
  const GEMS = [

  ];
  const TABLES = {
 "grande": {
  "title": "Les Grandes Tables",
  "desc": "Four starred evenings, the north slope's cellars and the grand-hotel terraces.",
  "sections": [
   {
    "label": "La crème — the starred rooms",
    "desc": "Four starred evenings, four different places: the two-star villa terrace, the one-star by the sea at Spisone, the dinner inside a palmento at Riposto, and the north slope's own star at Linguaglossa.",
    "ids": [
     "st-george-by-heinz-beck",
     "la-capinera",
     "zash",
     "shalai"
    ]
   },
   {
    "label": "The new wave",
    "desc": "Two small rooms on the coast below the mountain, both in the 2026 MICHELIN selection, both at fair prices.",
    "ids": [
     "kiste",
     "vico-astemio",
     "casu-osteria-contemporanea"
    ]
   },
   {
    "label": "Le cantine — the wineries that open the door",
    "desc": "The north slope's three essential cellars: the house that taught the world to read Etna by contrada, the palmento visit, and the reference for zero-additive wine. Nothing is walk-in.",
    "ids": [
     "tenuta-delle-terre-nere",
     "graci",
     "frank-cornelissen"
    ]
   },
   {
    "label": "The grand-hotel bars",
    "desc": "The terraces where Taormina's view was invented: worth the price of one apéritif. Call first — none says on its site that non-guests are welcome.",
    "ids": [
     "bar-timeo",
     "bar-sant-andrea-and-gwendoline-s",
     "san-domenico-palace"
    ]
   }
  ]
 },
 "petite": {
  "title": "Les Petites Tables",
  "desc": "The mountain trattorie, the coast's small rooms, the granita and the cocktail bar.",
  "sections": [
   {
    "label": "Trattorie & osterie",
    "desc": "The north slope's mountain houses: a butcher's shop turned restaurant, and the two lava-stone trattorie of Randazzo.",
    "ids": [
     "in-cucina-dai-pennisi",
     "san-giorgio-e-il-drago",
     "veneziano"
    ]
   },
   {
    "label": "The sea rooms",
    "desc": "A grocery since 1946 that became a trattoria-wine bar on the Giardini Naxos front.",
    "ids": [
     "a-putia"
    ]
   },
   {
    "label": "Granita, brioche & the pasticceria",
    "desc": "Taormina's granita queue, Gambero Rosso's gelateria of the year in Randazzo, and the village bar where almond wine was the welcome.",
    "ids": [
     "bam-bar",
     "pasticceria-gelateria-santo-musumeci",
     "antico-caffe-san-giorgio"
    ]
   },
   {
    "label": "Aperitivo & cocktails",
    "desc": "The cocktail bar redesigned every year, and a small wine bar for the natural bottle.",
    "ids": [
     "morgana",
     "casamatta"
    ]
   }
  ]
 }
};
  const CATEGORIES = [
 {
  "key": "creme",
  "label": "La crème — the starred rooms",
  "lead": "Four starred evenings, four different places: the two-star villa terrace, the one-star by the sea at Spisone, the dinner inside a palmento at Riposto, and the north slope's own star at Linguaglossa.",
  "story": {
   "title": "Dinner in a palmento",
   "story": "A palmento is the stone winery of old Etna: grapes trodden in an upper basin, must flowing by gravity into vats below. Zash at Archi restored a 19th-century palmento and serves its one-star menu inside, reached through a citrus orchard.",
   "where": "Zash, Archi (Riposto)"
  }
 },
 {
  "key": "rising",
  "label": "The new wave",
  "lead": "Two small rooms on the coast below the mountain, both in the 2026 MICHELIN selection, both at fair prices.",
  "story": {
   "title": "Sabir, the language of the ports",
   "story": "Sabir was an old dialect once used in Mediterranean ports so that sea merchants of different tongues could trade (MICHELIN). Seby Sorbello named his Zafferana restaurant after it to describe a cooking that mixes Etna and the Ionian coast.",
   "where": "Sabir, Via delle Ginestre 1"
  }
 },
 {
  "key": "cantine",
  "label": "Le cantine — the wineries that open the door",
  "lead": "The north slope's three essential cellars: the house that taught the world to read Etna by contrada, the palmento visit, and the reference for zero-additive wine. Nothing is walk-in.",
  "story": {
   "title": "The vineyards on the 1614 lava",
   "story": "Planeta's Etna estate, Contrada Sciaranuova, sits at about 850 metres among 'sciare' — the fields of lava from the eruption that began in 1614 and ran for about a decade. Vines are planted on lava-stone terraces between oak, chestnut and olive. 'Sciara' is the Sicilian word you will see on maps and labels across the north slope: it means a lava flow cold enough to farm.",
   "where": "Contrada Sciaranuova"
  }
 },
 {
  "key": "hotel-bar",
  "label": "The grand-hotel bars",
  "lead": "The terraces where Taormina's view was invented: worth the price of one apéritif. Call first — none says on its site that non-guests are welcome.",
  "story": {
   "title": "Otto Geleng's terrace",
   "story": "Grand Hotel Timeo began in 1850 as a modest guesthouse for painters. The German artist Otto Geleng stayed to paint the Greek Theatre from its terrace, and his canvases helped make Taormina famous across Europe. The hotel's restaurant now carries his name and, per Belmond, a MICHELIN star in 2026. Bar Timeo still serves from the terrace he painted.",
   "where": "Belmond Grand Hotel Timeo"
  }
 },
 {
  "key": "houses",
  "label": "Trattorie & osterie",
  "lead": "The north slope's mountain houses: a butcher's shop turned restaurant, and the two lava-stone trattorie of Randazzo.",
  "story": {
   "title": "Verdelli: the forced summer lemon",
   "story": "Etna lemon growers stop watering for a set time, then start again; the stressed tree flowers a second time and gives verdelli, summer lemons out of the normal cycle. The IGP specification calls the technique 'forzatura' or 'secca' and says it works because the volcanic soil drains so fast.",
   "where": "Ionian slope of Etna"
  }
 },
 {
  "key": "seafood",
  "label": "The sea rooms",
  "lead": "A grocery since 1946 that became a trattoria-wine bar on the Giardini Naxos front.",
  "story": {
   "title": "Fish from 2,000 metres on a Messina beach",
   "story": "Lanternfish, hatchetfish and viperfish normally live far down in the Ionian. In the Strait of Messina the south-to-north montante current lifts cold deep water over the sill, and at night, when these fish rise after plankton, it carries them into the shallows and throws them ashore between Ganzirri and Capo Peloro, most often in winter with Scirocco. Messina naturalists have documented the strandings since 1909.",
   "where": "Capo Peloro"
  }
 },
 {
  "key": "pastry",
  "label": "Granita, brioche & the pasticceria",
  "lead": "Taormina's granita queue, Gambero Rosso's gelateria of the year in Randazzo, and the village bar where almond wine was the welcome.",
  "story": {
   "title": "The Bam Bar began as a lamp shop",
   "story": "Rosario 'Saretto' Bambara gave up football to save his late father's electrical shop, learned granita during a year at Taormina's Wunderbar, and in 1996 turned the shop into a granita bar with his brother Tino. It has since refused franchise offers. 'We prefer to stay small,' he told Gambero Rosso.",
   "where": "Bam Bar"
  }
 },
 {
  "key": "cocktail",
  "label": "Aperitivo & cocktails",
  "lead": "The cocktail bar redesigned every year, and a small wine bar for the natural bottle.",
  "story": {
   "title": "Vino alla mandorla, Castelmola",
   "story": "Antico Caffè San Giorgio, on Castelmola's square since 1907, pours an almond wine from the recipe of its first owner, Don Vincenzo Blandano, who is said to have offered it to arriving guests.",
   "where": "Antico Caffè San Giorgio"
  }
 }
];
  const GROUPS = [{"key":"grande","label":"Les Grandes Tables","lead":"Four starred evenings, the north slope's cellars and the grand-hotel terraces."},{"key":"petite","label":"Les Petites Tables","lead":"The mountain trattorie, the coast's small rooms, the granita and the cocktail bar."}];
  const GROUP_OF = {"creme":"grande","rising":"grande","cantine":"grande","hotel-bar":"grande","houses":"petite","seafood":"petite","pastry":"petite","cocktail":"petite"};
  const BRIDGE = {
 "_rule": "SINGLE-EDITOR RULE: charter{} on a venue deliberately duplicates booking truth held in its reservation/price_range/caveat prose. Any commit editing those fields on a shortlist venue MUST update its charter block in the same commit.",
 "doors": [
  {
   "fr": "One Night",
   "en": "Ashore for one evening: a plan for each quarter — the terrace, the table, the Corso, the cocktail bar, in walking order.",
   "note": "La terrasse · la table · le Corso · le dernier verre",
   "href": "#t=onenight",
   "open": []
  },
  {
   "fr": "The Gastronomic Dig-In",
   "en": "For the chef: the north slope's contrade and palmenti, and the mountain trattorie between Linguaglossa and Randazzo.",
   "note": "Le vin · la montagne · la liste",
   "href": "#vino",
   "open": [
    "vino",
    "etna",
    "la-liste"
   ]
  },
  {
   "fr": "For Guests",
   "en": "Plan ahead, or save the night at the last minute in Taormina or down the coast: bookable, priced.",
   "note": "auto",
   "href": "#ce-soir",
   "open": [
    "ce-soir"
   ]
  },
  {
   "fr": "The Getaway Weekend",
   "en": "Friday night to Sunday afternoon: the theatre at opening, a cellar on the north slope in harvest, dinner in a palmento, the island at Mazzarò.",
   "note": "Le théâtre · la vigne · le palmento · l’île",
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
    "sub": "The booking fell through at seven: Kisté inside the walls first, then two small rooms down the coast at Riposto and Giarre — call before you drive.",
    "ids": [
     "kiste",
     "vico-astemio",
     "casu-osteria-contemporanea"
    ]
   },
   {
    "label": "Plan ahead — this week",
    "sub": "Book days ahead; the starred rooms close one or two nights a week.",
    "ids": [
     "la-capinera",
     "shalai",
     "zash"
    ]
   },
   {
    "label": "Plan ahead — the grand night",
    "sub": "The two-star villa terrace: book as soon as the dates are fixed.",
    "ids": [
     "st-george-by-heinz-beck"
    ]
   }
  ]
 }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES, CATEGORIES, GROUPS, GROUP_OF, BRIDGE };
})();
