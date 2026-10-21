window.TERROIR_DATA = (function () {
  const COLORS = {"berth":"#2d4a5e","market":"#d97706","shop":"#059669","mainland":"#7c3aed","logistics":"#2d4a5e"};
  const CAT_LABELS = {"berth":"Signature","market":"Market / Direct","shop":"Restaurant / Bar","mainland":"Out of town","logistics":"Logistics"};
  const PRODUCT_COLORS = {"Ostrava":"#2d4a5e","Beskydy & around":"#059669"};
  const VENUES = [
    {"id":"miura","cat":"berth","tier":"berth_top","priority":1,"name":"MIURA","short":"MIURA","neighborhood":"Čeladná","maps":"https://www.google.com/maps/search/?api=1&query=MIURA+%C4%8Celadn%C3%A1+%C4%8Cesko","badge":"MICHELIN","tags":["€ (MICHELIN price band)","Online booking via hotel site (slots 12:00-19:00) or phone","Lunch, then a walk in the Beskydy"],"productTags":["Beskydy & around"],"hours":"","why":"Of 78 restaurants in the MICHELIN Guide Czechia selection, only two are in the Moravian-Silesian Region, and MIURA is the one with a Bib Gourmand, in the selection revealed in December 2025. Chef Michal Göth buys from Beskydy farmers. Seznam Zprávy (April 2025) described a tasting menu called 'Chuť Beskyd', Taste of the Beskydy, served alongside a fully vegetarian one, with regional and international classics à la carte.","address":"Čeladná 887, 739 12 Čeladná","phone":"+420 558 761 100","status":"confirmed","statusChecked":"2026-10-21","lat":49.535243,"lng":18.327349,"category":"creme","subcat":"THE SERIOUS ROOMS","hook":"Hotel restaurant in a futuristic Čeladná building cooking Beskydy produce; the region's only Bib Gourmand.","person":"Michal Göth (chef)","signature":"The 'Chuť Beskyd' tasting menu","verdict":"The strongest single address for regional cooking near Ostrava, about 40 minutes' drive south of the city.","caveat":"A car trip from Ostrava; MICHELIN lists no opening hours, and booking slots online run 12:00-19:00 only.","price_range":"€ (MICHELIN price band)","reservation":"Online booking via hotel site (slots 12:00-19:00) or phone","best_time":"Lunch, then a walk in the Beskydy","dishes":[{"name":"Chuť Beskyd tasting menu","note":"Beskydy-sourced tasting menu, named by Seznam Zprávy (Apr 2025); contents not published online."},{"name":"Vegetarian tasting menu","note":"Fully vegetarian set, per Seznam Zprávy (Apr 2025)."},{"name":"Regional and international classics à la carte","note":"MICHELIN describes the carte as regional and international classics."}],"signal_chip":{"label":"MICHELIN Bib Gourmand","full":"MICHELIN Guide Czechia: Bib Gourmand (selection revealed Dec 2025); Gault&Millau Česko 2025: named among the region's two top-rated restaurants","cosign":"MICHELIN Guide Czechia, page read 21 Oct 2026"},"charter":{"price":"€ (MICHELIN band)","book":"Online, slots 12:00–19:00, or phone","dress":"","warn":"Forty minutes by car from Ostrava; the last booking slot is 19:00","fit":"The region's only Bib Gourmand, under the Beskydy"},"web":"https://www.miura.cz"},
    {"id":"cattaleya","cat":"shop","tier":"several","priority":4,"name":"Cattaleya","short":"Cattaleya","neighborhood":"Villa Cattaleya, a forest-edge resort about 2.5 km from Miura","maps":"https://www.google.com/maps/search/?api=1&query=Cattaleya+%C4%8Celadn%C3%A1+%C4%8Cesko","badge":"MICHELIN","tags":["Book direct","Lunch in daylight for the forest view"],"productTags":["Beskydy & around"],"hours":"MICHELIN: Mon-Tue closed; Wed-Sat 12:00-22:00; Sun 12:00-19:00. Own site shows daily hours with kitchen closing an hour earlier (read 2026-10-21) - confirm before going.","why":"Cattaleya is one of only two Moravian-Silesian restaurants in the MICHELIN Guide Czechia, and its menu reads like a Czech larder rewritten. Venison goulash soup is laced with slivovice; smoked pork comes with red cabbage and 'klubko' dumplings; bramboračka, the everyday Czech potato soup, returns as a mushroom consommé. The fallow deer arrives with gingerbread, black pepper and berries, and zander with bisque, noky and saffron. Closed Monday and Tuesday.","address":"Čeladná 510, 739 12 Čeladná","phone":"+420 734 510 005","status":"confirmed","statusChecked":"2026-10-21","lat":49.540534,"lng":18.355193,"category":"creme","subcat":"THE SERIOUS ROOMS","hook":"A round glass pavilion in the Čeladná woods, cooking the Czech larder à la carte or over seven courses.","signature":"Venison (fallow deer) with gingerbread, black pepper and berries","verdict":"The ambitious, priced-up option of the region; worth it if the day is a Beskydy day anyway.","caveat":"Closed Monday and Tuesday per MICHELIN; tasting menu 2,990 CZK plus pairings.","price_range":"Tasting menu 2,990 CZK; wine pairing 1,990 CZK; non-alcoholic pairing 1,090 CZK (own site, read 2026-10-21)","reservation":"Book direct","best_time":"Lunch in daylight for the forest view","dishes":[{"name":"Venison goulash soup with slivovice","note":"350 CZK on the carte read 21 Oct 2026."},{"name":"Fallow deer, gingerbread, black pepper, berries","note":"850 CZK."},{"name":"Smoked pork, red cabbage, klubko dumplings","note":"660 CZK; a Czech Sunday plate made formal."},{"name":"Zander, bisque, noky, saffron","note":"760 CZK; noky are small Czech-Moravian dumplings."}],"signal_chip":{"label":"MICHELIN selected","full":"MICHELIN Guide Czechia: selected (no distinction shown); Gault&Millau Česko 2025: named among the region's two top-rated restaurants","cosign":"MICHELIN Guide Czechia, page read 21 Oct 2026"},"charter":{"price":"Tasting menu 2,990 CZK; wine pairing 1,990 CZK; non-alcoholic pairing 1,090 CZK (own site, read 2026-10-21)","book":"Book direct","dress":"","warn":"Closed Monday and Tuesday per MICHELIN; tasting menu 2,990 CZK plus pairings.","fit":"A round glass pavilion in the Čeladná woods, cooking the Czech larder à la carte or over seven courses."},"web":"https://www.cattaleya.cz/restaurace"},
    {"id":"hogofogo-bistro","cat":"berth","tier":"berth_top","priority":2,"name":"HogoFogo Bistro","short":"HogoFogo Bistro","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=HogoFogo+Bistro+Ostrava","badge":"NEW WAVE","tags":["Lunch set 320 CZK; mains 298-590 CZK (week of 19 Oct 2026)","Weekday lunch"],"productTags":["Ostrava"],"hours":"Mon-Fri 11:30-22:00; lunch 11:30-15:00 (own site, read 2026-10-21)","why":"'Hogo fogo' is Czech slang for something posh and fancy. A small team, Terka at the stove, Zuzka, and the founder-bartender Pítr, has run the bistro since 2015, fermenting, cooking zero-waste and posting a dated menu every week. The vdolek, an old Czech yeast pastry, shares the card with duck rillettes and almond aioli, pumpkin gnocchi with guanciale, and tonkotsu ramen. Lunch is 11:30–15:00 on weekdays, then the natural-wine evening begins.","address":"Sokolská třída 871/6, 702 00 Ostrava","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.837322,"lng":18.2938,"category":"rising","subcat":"THE NEW WAVE","hook":"Weekday bistro since 2015 cooking forgotten Czech recipes beside tonkotsu ramen, with natural wine.","person":"Terka (head chef), Zuzka, Pítr (founder)","signature":"Vdolek and duck rillettes - old Czech pastry beside French charcuterie","verdict":"The most consistently recommended bistro in central Ostrava; a good lunch for a cook.","caveat":"Weekdays only (Mon-Fri); the Apetit piece notes it sometimes closes at weekends.","price_range":"Lunch set 320 CZK; mains 298-590 CZK (week of 19 Oct 2026)","best_time":"Weekday lunch","dishes":[{"name":"Duck rillettes with almond aioli and toast","note":"262 CZK (menu week 19-23 Oct 2026)."},{"name":"Tonkotsu ramen","note":"98 CZK small / 368 CZK large."},{"name":"Pumpkin gnocchi with guanciale","note":"338 CZK."},{"name":"Vdolek","note":"148 CZK; the round Czech yeast cake."}],"charter":{"price":"Lunch set 320 CZK; mains 298-590 CZK (week of 19 Oct 2026)","book":"Book ahead","dress":"","warn":"Weekdays only (Mon-Fri); the Apetit piece notes it sometimes closes at weekends.","fit":"Weekday bistro since 2015 cooking forgotten Czech recipes beside tonkotsu ramen, with natural wine."},"web":"https://www.hogofogobistro.cz"},
    {"id":"stracena-garden","cat":"shop","tier":"several","priority":5,"name":"Stračena Garden","short":"Stračena Garden","neighborhood":"Svinov, next to the U Stračeny farm shop","maps":"https://www.google.com/maps/search/?api=1&query=Stra%C4%8Dena+Garden+Ostrava","badge":"NEW WAVE","tags":["Steaks 220-900 CZK"],"productTags":["Ostrava"],"hours":"Mon-Thu 11:30-21:00; Fri-Sat 11:30-22:00; Sun closed (read 2026-10-21)","why":"The beef at Stračena Garden comes from the company's own farm in Klokočov and hangs at least 60 days before it meets the Josper charcoal grill; the 300 g Czech rib eye is the order. Beside it the menu keeps the Czech pub canon: baked tvarůžky, the pungent ripened cheese of the Olomouc region, pickled hermelín, and a whole young chicken cooked under a brick. Close to Svinov station, and closed on Sundays.","address":"Polanecká 56, 721 00 Ostrava-Svinov","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.814177,"lng":18.197514,"category":"rising","subcat":"THE NEW WAVE","hook":"Josper-grill steak house near Svinov serving beef from its own farm in Klokočov, dry-aged 60+ days.","signature":"Czech dry-aged rib eye","verdict":"The farm-to-grill steak of Ostrava; near Svinov station.","caveat":"Closed Sundays.","price_range":"Steaks 220-900 CZK","dishes":[{"name":"Rib eye steak 300 g","note":"900 CZK."},{"name":"Rozpečené tvarůžky","note":"Baked Olomouc ripened cheese, 148 CZK."},{"name":"Nakládaný hermelín","note":"Pickled Czech camembert, 148 CZK."},{"name":"Celé kuřátko z pod cihly","note":"Whole chicken under a brick, for four, 600 CZK."}],"charter":{"price":"Steaks 220-900 CZK","book":"Book ahead","dress":"","warn":"Closed Sundays.","fit":"Josper-grill steak house near Svinov serving beef from its own farm in Klokočov, dry-aged 60+ days."},"web":"https://www.stracenagarden.cz"},
    {"id":"bernie-s-grill-wine","cat":"shop","tier":"several","priority":6,"name":"Bernie's Grill & Wine","short":"Bernie's Grill & Wine","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Bernie%27s+Grill+%26+Wine+Ostrava","badge":"NEW WAVE","tags":["Recommended at weekends","Dinner"],"productTags":["Ostrava"],"hours":"Mon-Sat 8:00-24:00; Sun 8:00-22:00 (own site, read 2026-10-21)","why":"The people behind Bernie's came over from KORAS Restaurant and built the house around two things, a grill and a wine list, with a Prosciutto Bar running alongside. It holds dinners with producers: on 21 October 2026 the glasses were Castello di Querceto. When Moravskoslezský deník ran its May 2025 story on Gault&Millau's best tables in Ostrava, it opened with a photograph of Bernie's. Doors open at 8:00, so it is also a breakfast room.","address":"Poděbradova 826/27, 702 00 Ostrava","phone":"596 117 639","status":"confirmed","statusChecked":"2026-10-21","lat":49.835624,"lng":18.283741,"category":"rising","subcat":"THE NEW WAVE","hook":"Grill-and-wine house on Poděbradova, open from 8 in the morning to midnight, from the team behind KORAS.","signature":"Grill plates with a serious wine list","verdict":"Central, long hours, wine-led; a safe dinner rather than a discovery.","caveat":"The site names no chef or dishes; Gault&Millau toque count not confirmed (paywalled).","reservation":"Recommended at weekends","best_time":"Dinner","dishes":[{"name":"Grill steaks","note":"House concept is grill and wine; specific cuts not listed on the pages read."},{"name":"Prosciutto from its Prosciutto Bar","note":"The company runs a Prosciutto Bar alongside the restaurant."}],"signal_chip":{"label":"Maurerův výběr","full":"Maurerův výběr Grand Restaurant (selection listed)","cosign":"Maurerův výběr Grand Restaurant"},"charter":{"price":"Grill plates; serious wine list","book":"Recommended at weekends","dress":"","warn":"","fit":"Open from 8:00 to midnight Mon–Sat, to 22:00 Sunday (own site, 21 Oct 2026)"},"web":"https://www.bernies.cz"},
    {"id":"harenda-u-barborky","cat":"berth","tier":"berth_top","priority":3,"name":"Harenda U Barborky","short":"Harenda U Barborky","neighborhood":"Petřkovice, inside the Landek Park mining museum grounds","maps":"https://www.google.com/maps/search/?api=1&query=Harenda+U+Barborky+Ostrava","badge":"CZECH","tags":["3-course tasting menu 695 CZK (own site, read 2026-10-21)","Phone","Lunch after the Landek mine tour"],"productTags":["Ostrava"],"hours":"Wed-Thu 11:30-20:00; Fri-Sat 11:30-22:00; Sun 11:30-20:00 (own site, read 2026-10-21)","why":"Owner-chef Adam Cakl cooks traditional Czech food in a modern way on the grounds of Landek Park, so lunch can follow a ride underground in the mining museum (Apetit, March 2026). The autumn plate is roe deer shoulder with rosehip sauce, a herb dumpling with orange zest and lardo; dessert is semolina foam with plums and gingerbread. From 6 to 17 November the house holds its St Martin's goose feast, with red and white cabbage and lokše, potato flatbreads.","address":"Pod Landekem 68, 725 29 Ostrava-Petřkovice","phone":"723 977 506","status":"confirmed","statusChecked":"2026-10-21","lat":49.868177,"lng":18.264243,"category":"houses","subcat":"THE CZECH KITCHEN","hook":"Czech cooking 'hezky, česky, moderně' in a brick building at the Landek mine museum, Petřkovice.","person":"Adam Cakl (owner, chef)","signature":"St Martin's goose with red and white cabbage, lokše and dumpling (6-17 Nov)","verdict":"The one table that puts you on Ostrava's mining ground; go for the mine, stay for the goose.","caveat":"Closed Monday-Tuesday; own site footer still reads 2025 - confirm the November dates by phone.","price_range":"3-course tasting menu 695 CZK (own site, read 2026-10-21)","reservation":"Phone","best_time":"Lunch after the Landek mine tour","dishes":[{"name":"Roe deer shoulder, rosehip sauce, herb dumpling with orange zest, lardo","note":"Course of the 3-course tasting menu (695 CZK)."},{"name":"Chicken terrine with pistachio, prunes, black-garlic mayo","note":"Tasting-menu starter."},{"name":"Semolina foam with plums and gingerbread","note":"Tasting-menu dessert."},{"name":"Roast goose with lokše","note":"St Martin's feast, 6-17 Nov (year not printed)."}],"charter":{"price":"3-course tasting menu 695 CZK (own site, read 2026-10-21)","book":"Phone","dress":"","warn":"Closed Monday-Tuesday; own site footer still reads 2025 - confirm the November dates by phone.","fit":"Czech cooking 'hezky, česky, moderně' in a brick building at the Landek mine museum, Petřkovice."},"web":"https://www.harenda.cz","hot_this_month":"November 2026: the St Martin's goose with lokše, 6–17 November (own site, seen 21 Oct; confirm by phone)."},
    {"id":"u-jarosu","cat":"shop","tier":"plenty","priority":7,"name":"U Jarošů","short":"U Jarošů","neighborhood":"Poruba, Pustkovecká","maps":"https://www.google.com/maps/search/?api=1&query=U+Jaro%C5%A1%C5%AF+Ostrava","badge":"CZECH","tags":[],"productTags":["Ostrava"],"hours":"Mon 10:45-22:00; Tue-Fri 10:45-23:00; Sat 11:00-23:00; Sun 11:00-22:00 (read 2026-10-21)","why":"Until 1989 this spot on Pustkovecká was the butcher's shop of Jaroš Křibka. His son and son-in-law opened the restaurant in the same place, and the kitchen calls its cooking Czech 'in a modern coat'. It is in Maurer's Ostrava selection and also cooks tasting menus to order. The goose feasts, husí hody, were announced on 7 October 2026: autumn is the season to come, and to book.","address":"Pustkovecká 138, 708 00 Ostrava-Poruba","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.840259,"lng":18.157166,"category":"houses","subcat":"THE CZECH KITCHEN","hook":"Czech cooking 'in a modern coat' in Poruba, on the spot where the family butcher's shop stood.","signature":"Autumn goose feast (husí hody)","verdict":"A neighbourhood house with a butcher's lineage; worth it in goose season.","caveat":"Out in Poruba, 20+ minutes by tram from the centre.","dishes":[{"name":"Husí hody","note":"Goose feast, announced 7 Oct 2026."},{"name":"Tasting menus to order","note":"Multi-course menus built on request (own site)."}],"signal_chip":{"label":"Maurerův výběr","full":"Maurerův výběr Grand Restaurant (selection listed)","cosign":"Maurerův výběr Grand Restaurant"},"charter":{"price":"","book":"Book ahead","dress":"","warn":"Out in Poruba, 20+ minutes by tram from the centre.","fit":"Czech cooking 'in a modern coat' in Poruba, on the spot where the family butcher's shop stood."},"web":"https://www.ujarosu.cz","hot_this_month":"Autumn 2026: goose feasts announced 7 October (own site, seen 21 Oct)."},
    {"id":"stara-kuzelna","cat":"shop","tier":"plenty","priority":8,"name":"Stará kuželna","short":"Stará kuželna","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Star%C3%A1+ku%C5%BEelna+Ostrava","badge":"CZECH","tags":["Mains 249-339 CZK (Oct 2026)"],"productTags":["Ostrava"],"hours":"Mon-Fri 11:00-22:00; Sat 12:00-22:00; Sun 12:00-20:00 (read 2026-10-21)","why":"Kuželna means a skittle alley, and the name promises an old-style pub; the weekly menu delivers Central European pub cooking done carefully. In the week of 19–23 October 2026 that meant dršťková, the tripe soup, smoked beef tongue with horseradish sauce and dumpling, Hungarian perkelt with tarhoňa egg barley, and zander on lentil salad. It is in Maurer's Ostrava selection, and on Friday 23 October it hosts the band Skrat's record launch.","address":"","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.837487,"lng":18.301902,"category":"houses","subcat":"THE CZECH KITCHEN","hook":"Pub-style room with a real kitchen: tripe soup, smoked tongue, perkelt with tarhoňa, and gigs.","signature":"Smoked beef tongue with horseradish sauce","verdict":"A real kitchen behind a pub-style room; check the address before setting out.","caveat":"Street address not given on the site read.","price_range":"Mains 249-339 CZK (Oct 2026)","dishes":[{"name":"Dršťková polévka","note":"Tripe soup, 79 CZK (week of 19 Oct 2026)."},{"name":"Smoked beef tongue, horseradish sauce, dumpling","note":"249 CZK."},{"name":"Hungarian perkelt with tarhoňa","note":"269 CZK; tarhoňa is egg-barley pasta."},{"name":"Zander fillet with lentil salad","note":"339 CZK."}],"signal_chip":{"label":"Maurerův výběr","full":"Maurerův výběr Grand Restaurant (selection listed)","cosign":"Maurerův výběr Grand Restaurant"},"web":"https://stara-kuzelna.cz"},
    {"id":"ostrawica-lokal","cat":"shop","tier":"plenty","priority":9,"name":"Ostrawica Lokál","short":"Ostrawica Lokál","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Ostrawica+Lok%C3%A1l+Ostrava","badge":"LUNCH","tags":["Lunch 179-249 CZK (21 Oct 2026)","Weekday lunch"],"productTags":["Ostrava"],"hours":"Mon-Thu 8:00-22:30; Fri 8:00-23:00; Sat 8:00-22:30; Sun 10:00-21:00; lunch 11:00-15:00 (read 2026-10-21)","why":"Ostrawica takes the river's name, spelled with a w, and cooks the shared table of the old Czech and Austrian lands. The weekday lunch is posted with its date: on Wednesday 21 October 2026 it was svíčková, beef sirloin in a cream vegetable sauce with cranberries and dumplings, at 195 CZK; trout 'po mlynářsku', the miller's way, at 249 CZK; and a 35 CZK soup refilled for free. Open from 8:00 for breakfast.","address":"Solná 1, Ostrava","phone":"+420 593 033 029","status":"confirmed","statusChecked":"2026-10-21","lat":49.836183,"lng":18.29217,"category":"cantine","subcat":"POLEDNÍ MENU","hook":"All-day Czech-Austrian lokál on Solná by the main square, with a five-dish weekday lunch posted by date.","signature":"Svíčková with cranberries and dumplings","verdict":"The easiest honest lunch in the centre.","caveat":"Staropramen on tap, not a local beer.","price_range":"Lunch 179-249 CZK (21 Oct 2026)","best_time":"Weekday lunch","dishes":[{"name":"Svíčková","note":"Beef in vegetable-cream sauce with cranberries and dumplings, 195 CZK (21 Oct 2026)."},{"name":"Trout po mlynářsku","note":"Miller's-style trout with mash and salted tomatoes, 249 CZK."},{"name":"Soup of the day","note":"35 CZK, unlimited refills."}],"charter":{"price":"Lunch 179–249 CZK (seen 21 Oct 2026)","book":"Walk in; lunch from 11:00","dress":"","warn":"Staropramen on tap, not a local beer","fit":"On the main square, open every day, to 22:30 most nights"},"web":"https://www.ostrawica.cz"},
    {"id":"burfi","cat":"shop","tier":"plenty","priority":10,"name":"Burfi","short":"Burfi","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Burfi+Ostrava","badge":"LUNCH","tags":["Full menu 129 CZK (19-23 Oct, year not printed)"],"productTags":["Ostrava"],"hours":"Mon-Fri 11:00-14:00 (read 2026-10-21)","why":"Burfi first opened in 2005 and has kept to a single idea since: one vegetarian menu a day, cooked with an Indian accent and sold mostly to take away. In the week of 19–23 October 2026 the whole set, soup, main, salad and a square of sweet halva, cost 129 CZK, with kofta in tomato chutney sauce or broccoli sabji on the plate. The kitchen is open three hours a day, weekdays only, so come before the queue.","address":"Přívozská 134/6, 702 00 Moravská Ostrava","phone":"+420 774 402 179","status":"confirmed","statusChecked":"2026-10-21","lat":49.837227,"lng":18.290628,"category":"cantine","subcat":"POLEDNÍ MENU","hook":"Vegetarian lunch counter since 2005: one Indian-leaning set a day, weekdays 11:00–14:00.","person":"Keshava Kempe (operator)","signature":"Daily set with sweet halva","verdict":"Cheapest honest lunch in the centre; three hours a day only.","caveat":"Mon-Fri 11:00-14:00 only.","price_range":"Full menu 129 CZK (19-23 Oct, year not printed)","dishes":[{"name":"Kofta with tomato chutney sauce and rice","note":"Thursday dish, week of 19 Oct."},{"name":"Broccoli sabji with rice","note":"Wednesday dish."},{"name":"Sweet halva","note":"Comes with every daily set."}],"web":"https://burfi.net"},
    {"id":"los-dobrotos","cat":"shop","tier":"plenty","priority":11,"name":"Los Dobrotos","short":"Los Dobrotos","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Los+Dobrotos+Ostrava","badge":"LUNCH","tags":[],"productTags":["Ostrava"],"hours":"Mon 10-19; Tue-Thu 10-21; Fri 10-22; Sat 11-21; Sun closed (read 2026-10-21)","why":"Los Dobrotos dresses 'dobroty', Czech for treats, in a Spanish article. It is a student-priced address in the centre: University of Ostrava ID holders get the lunch menu with a Kofola for 135 CZK. The rest of the day it serves tapas boxes and churros made fresh, which are the reason people come back in the afternoon. Open from 10:00 every day except Sunday, and until 22:00 on Fridays.","address":"Velká 198/14, 702 00 Ostrava","phone":"+420 603 995 329","status":"confirmed","statusChecked":"2026-10-21","lat":49.834527,"lng":18.291709,"category":"cantine","subcat":"POLEDNÍ MENU","hook":"Spanish street-food bistro on Velká: a daily lunch menu, tapas boxes and fresh churros.","person":"Daniel Ryška (manager)","signature":"Fresh churros","verdict":"Cheap, cheerful, central; churros as the reason.","caveat":"Lunch menu posted as images only.","dishes":[{"name":"Churros","note":"Made fresh (own site)."},{"name":"Tapas boxes","note":"Sold to take away."},{"name":"Daily lunch menu","note":"135 CZK for students with Kofola."}],"web":"https://www.losdobrotos.cz"},
    {"id":"happy-banh-mi","cat":"shop","tier":"plenty","priority":12,"name":"Happy Banh Mi","short":"Happy Banh Mi","neighborhood":"Masarykovo náměstí","maps":"https://www.google.com/maps/search/?api=1&query=Happy+Banh+Mi+Ostrava","badge":"ELSEWHERE","tags":[],"productTags":["Ostrava"],"hours":"Mon-Fri 10:30-20:00; Sat-Sun 11:30-16:30 (read 2026-10-21)","why":"Vietnamese are among the largest foreign communities in the Czech Republic, and their cooking is now part of ordinary Czech eating. Happy Banh Mi is a family bistro that has reopened its Ostrava branch on the main square. It serves the northern canon of phở bò, with beef cooked or rare, alongside bún bò Huế, the spicy beef noodle soup of the old imperial city in central Vietnam, and bún bò Nam Bộ from the south. The bánh mì gave it its name.","address":"Masarykovo nám. 24/13, Moravská Ostrava","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.836131,"lng":18.293204,"category":"ethnic","subcat":"THE OTHER KITCHENS","hook":"Family-run Vietnamese bistro on Masarykovo náměstí: bánh mì, phở, bún bò Huế.","signature":"Phở bò","verdict":"The pho stop in the centre.","caveat":"Aggregator reviews are mixed beyond the bánh mì.","dishes":[{"name":"Phở bò chín/tái","note":"Beef pho, 205 CZK."},{"name":"Bún bò Huế","note":"Spicy Huế beef noodle soup, 225 CZK."},{"name":"Bánh mì","note":"155 CZK, pork, chicken or beef."},{"name":"Bún bò Nam Bộ","note":"Beef noodle salad, 240 CZK."}],"web":"https://www.happybanhmi.cz"},
    {"id":"pelmeski","cat":"shop","tier":"plenty","priority":13,"name":"Pelmeški","short":"Pelmeški","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Pelme%C5%A1ki+Ostrava","badge":"ELSEWHERE","tags":[],"productTags":["Ostrava"],"hours":"Mon-Fri 10:30-19:30; Sat-Sun 12:00-19:00 (read 2026-10-21)","why":"Pelmeški has made dumplings since 2018: Russian-style pelmeni and Ukrainian-style vareniky, with house twists such as pork-and-kimchi pelmeni on its Asian-fusion plate. The order for a first visit is the potato vareniky. To drink there is Wostok, a revived Soviet-era 'Bajkal' herbal lemonade. Everything on the counter is also sold frozen, so a bag of dumplings can travel home in the freezer.","address":"Českobratrská 113/22, 702 00 Ostrava","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.838839,"lng":18.286461,"category":"ethnic","subcat":"THE OTHER KITCHENS","hook":"Pelmeni and vareniky dumpling shop near the centre since 2018, with frozen packs to take home.","person":"Martin Štubňa (operator)","signature":"Potato vareniky","verdict":"A quick, filling eastern-European lunch near the centre.","dishes":[{"name":"Vareniky bramborové","note":"Potato vareniky, small 155 CZK."},{"name":"Pelmeně Asian Fusion","note":"Pork with kimchi, 300 g, 225 CZK."},{"name":"Pelmeně kuřecí","note":"Chicken, parmesan, basil, 215 CZK."}],"web":"https://www.pelmeski.cz"},
    {"id":"gokana","cat":"shop","tier":"plenty","priority":14,"name":"Gokana","short":"Gokana","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Gokana+Ostrava","badge":"ELSEWHERE","tags":[],"productTags":["Ostrava"],"hours":"","why":"Gokana is the sushi entry in Maurerův výběr, the Czech restaurant guide's Ostrava selection, and it is more than a dining room: the house also sells Japanese knives. Beside the sushi counter, Moss Bistro handles tonkotsu ramen and gyoza. The weekday lunch set is posted with its dates, 299 CZK for 19–23 October 2026. From the sushi side, order the yellowfin tuna tartare.","address":"Zámecká 1666/17, 702 00 Ostrava","phone":"+420 720 588 588","status":"confirmed","statusChecked":"2026-10-21","lat":49.834641,"lng":18.29006,"category":"ethnic","subcat":"THE OTHER KITCHENS","hook":"Sushi house with a ramen-and-gyoza bistro, Moss Bistro, and a dated weekday lunch set.","signature":"Yellowfin tuna tartare","verdict":"The reference sushi in the city.","caveat":"Delivery-led site; closes 19:30 on the day read.","dishes":[{"name":"Yellowfin tuna tatar","note":"315 CZK."},{"name":"Tonkotsu ramen","note":"299 CZK."},{"name":"Gokana lunch set","note":"299 CZK, 19-23 Oct 2026."}],"signal_chip":{"label":"Maurerův výběr","full":"Maurerův výběr Grand Restaurant (selection listed)","cosign":"Maurerův výběr Grand Restaurant"},"web":"https://www.gokana.cz"},
    {"id":"drinkeat","cat":"shop","tier":"plenty","priority":15,"name":"Drinkeat","short":"Drinkeat","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Drinkeat+Ostrava","badge":"BREAKFAST","tags":["Online","Weekend morning"],"productTags":["Ostrava"],"hours":"Mon-Thu 7:30-18:00; Fri 7:30-22:00; Sat-Sun 8:00-14:00 (read 2026-10-21)","why":"Drinkeat is a two-woman breakfast room, run by Barbora 'Barča' Šindlerová and Kačka. When Apetit asked the Ostrava promoter Jan Petrus in March 2026 where to brunch in his city, this is where he sent people. The coffee is roasted by Nordbeans in Liberec, at the far end of the country. Order the Turkish eggs, or roast beef on bread under a fried egg; kefir pancakes for the sweet side. On Fridays it stays open until 22:00.","address":"Poděbradova 312/32, 702 00 Moravská Ostrava a Přívoz","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.836122,"lng":18.283845,"category":"breakfast","subcat":"BREAKFAST & BRUNCH","hook":"Brunch bistro on Poděbradova run by Barča and Kačka: Turkish eggs, Benedict, kefir pancakes.","person":"Barbora Šindlerová (Barča) and Kačka","signature":"Turkish eggs","verdict":"The breakfast to send a crew to.","caveat":"Weekend hours only to 14:00.","reservation":"Online","best_time":"Weekend morning","dishes":[{"name":"Turkish eggs","note":"Per Apetit (Mar 2026)."},{"name":"Eggs Benedict","note":"Per Apetit."},{"name":"Roast beef on bread with a fried egg","note":"Per Apetit."},{"name":"Kefir pancakes","note":"Per Apetit."}],"web":"https://drinkeat.cz"},
    {"id":"lajka-zije","cat":"shop","tier":"plenty","priority":16,"name":"Lajka žije","short":"Lajka žije","neighborhood":"'U Sýkoráku' (by the Miloš Sýkora bridge)","maps":"https://www.google.com/maps/search/?api=1&query=Lajka+%C5%BEije+Ostrava","badge":"BREAKFAST","tags":[],"productTags":["Ostrava"],"hours":"Mon-Fri 8:00-18:00; Sat 9:00-17:00; Sun 9:00-15:00 (read 2026-10-21)","why":"Its tagline says Lajka is alive and well 'u Sýkoráku', by the Sýkora bridge, on 28. října. It welcomes dogs and cyclists; the coffee comes from the DAK roastery, the breakfasts follow the season, and a second-hand corner sells vintage clothes, books and records (Seznam Zprávy, February 2025). Walk-in only, no bookings.","address":"","phone":"732 420 328","status":"confirmed","statusChecked":"2026-10-21","lat":49.837242,"lng":18.295259,"category":"breakfast","subcat":"BREAKFAST & BRUNCH","hook":"Walk-in café by the Sýkora bridge: specialty coffee, matcha, seasonal breakfasts and a vintage corner.","signature":"Seasonal breakfast","verdict":"Coffee-and-eggs stop on the way to Slezská Ostrava.","caveat":"Walk-in only; street address not printed.","dishes":[{"name":"Seasonal breakfast","note":"Breakfast menu PDF, 2026/08 upload."},{"name":"Specialty coffee and matcha","note":"Own site."}],"web":"https://www.lajkazije.cz"},
    {"id":"cokafe","cat":"shop","tier":"plenty","priority":17,"name":"CØKAFE Dolní Vítkovice","short":"CØKAFE Dolní Vítkovice","neighborhood":"Dolní Vítkovice","maps":"https://www.google.com/maps/search/?api=1&query=C%C3%98KAFE+Doln%C3%AD+V%C3%ADtkovice+Ostrava","badge":"COFFEE","tags":[],"productTags":["Ostrava"],"hours":"Listed on Wolt: weekdays 08:00-18:00, weekends 08:00-19:00 (read via search, Oct 2026)","why":"Richard Mauler founded CØKAFE in Ostrava in 2015. It grew to eight branches with its own bakery and patisserie, and in August 2026 Kofola, the soft-drink group that is itself an Ostrava company, bought 52 per cent of it. The Dolní Vítkovice branch is the biggest: café, patisserie and bakery in one industrial room, a short walk from the blast furnace. Seznam Zprávy called it an Ostrava fixture in February 2025.","address":"Vitkovicka 3369, Moravská Ostrava","phone":"+420 775 496 266","status":"confirmed","statusChecked":"2026-08-27","lat":49.821794,"lng":18.27777,"category":"coffee","subcat":"COFFEE","hook":"Ostrava's home-grown coffee chain at its largest branch, in a former steelworks building at Dolní Vítkovice.","person":"Richard Mauler (founder)","signature":"House-roasted espresso with a pastry from its own bakery","verdict":"The best-located coffee in the city: breakfast here, then the blast furnace next door.","caveat":"Now majority-owned by a drinks group; expect the house roast, not guest roasters.","dishes":[{"name":"Breakfast","note":"served daily"},{"name":"House cakes","note":"from its own patisserie"},{"name":"A glass of wine","note":"on the list alongside coffee"}]},
    {"id":"laura-coffee","cat":"shop","tier":"plenty","priority":18,"name":"Laura Coffee","short":"Laura Coffee","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Laura+Coffee+Ostrava","badge":"COFFEE","tags":[],"productTags":["Ostrava"],"hours":"","why":"Ivo Ptáčník started roasting coffee in the attic of a family house and named the company after his elder daughter, Laura. It now runs five cafés, bakes its own bread and cakes and teaches barista courses. The branch to know is the smallest: kafeKostka, a kiosk at Ostrava-Svinov station that has served specialty coffee every day since 2014, so the first cup of the trip can be a good one if you arrive by train.","address":"Horni 1492/55, 700 30 Ostrava-Hrabůvka (company seat)","phone":"+420 770 160 602","status":"confirmed","statusChecked":"2026-10-21","lat":49.821241,"lng":18.208981,"category":"coffee","subcat":"COFFEE","hook":"A family roastery that began in an attic; now five cafés, a bakery and a kiosk at Svinov station.","person":"Ivo Ptáčník (founder)","signature":"Espresso or batch brew at the Svinov kiosk","verdict":"The coffee to grab at Svinov when you arrive by train.","caveat":"The cafes are out of the old centre.","dishes":[{"name":"V60 / batch brew","note":"at kafeHrabůvka"},{"name":"House bread and cakes","note":"from its own bakery"}],"web":"https://lauracoffee.cz"},
    {"id":"shothouse-ostrava","cat":"shop","tier":"plenty","priority":19,"name":"Shothouse Ostrava","short":"Shothouse Ostrava","neighborhood":"Nádražní, city centre","maps":"https://www.google.com/maps/search/?api=1&query=Shothouse+Ostrava+Ostrava","badge":"COFFEE","tags":["Table booking online"],"productTags":["Ostrava"],"hours":"Mon-Thu 08:00-21:00, Fri 08:00-23:00, Sat 09:00-21:00, Sun 09:00-12:00 (own site, read 21 Oct 2026)","why":"Shothouse started in Havířov and now runs bars there and in Ostrava. It sells cupping sessions, where you taste coffees side by side the way roasters judge them, and Huskee cups made from coffee husk, the papery skin of the bean. A 2025 coffee guide noted two batch-brew options on the bar and laptops welcome when it is quiet. Tables can be booked online, and on Fridays the bar stays open until 23:00.","address":"Nádražní 756/49, Ostrava","phone":"+420 737 016 243","status":"confirmed","statusChecked":"2026-10-21","lat":49.83818,"lng":18.284682,"category":"coffee","subcat":"COFFEE","hook":"Specialty coffee bar from Havířov on Nádražní, with street brunch and Friday hours until 23:00.","signature":"Batch brew","verdict":"A good laptop morning in the centre.","caveat":"Sunday hours are short (09:00-12:00).","reservation":"Table booking online","dishes":[{"name":"Filter / batch brew","note":"two options daily"},{"name":"Street brunch","note":"listed on its own site"}],"web":"https://www.shothouse.cz"},
    {"id":"elektra","cat":"shop","tier":"plenty","priority":20,"name":"Kavárna Elektra","short":"Kavárna Elektra","neighborhood":"Nádražní, city centre","maps":"https://www.google.com/maps/search/?api=1&query=Kav%C3%A1rna+Elektra+Ostrava","badge":"COFFEE","tags":["Mains 249-287 CZK (menu 19-23 Oct 2026)","Breakfast 07:00-10:00"],"productTags":["Ostrava"],"hours":"Mon-Fri 07:00-19:00 (own site, read 21 Oct 2026)","why":"Kavárna Elektra survived into the bank era: J&T Banka took it over in 2012 and restored the interior, finishing with a ceiling in gold leaf, and Forbes noticed that the prices stayed ordinary. The kitchen runs themed weeks; 19–23 October 2026 was Austro-Hungarian, with Wiener Schnitzel at 287 CZK, Tiroler Gröstl at 259 CZK and Reisauflauf, the baked rice pudding, for dessert. Breakfast is Croissant Benedikt. Weekdays only, 7:00–19:00.","address":"Nádražní 305/5, 702 00 Ostrava","phone":"+420 221 710 842","status":"confirmed","statusChecked":"2026-10-21","lat":49.834171,"lng":18.28789,"category":"coffee","subcat":"COFFEE","hook":"A First Republic grand café on Nádražní, restored by J&T Banka down to a ceiling laid in gold.","signature":"Breakfast under the gold ceiling","verdict":"Ostrava's one proper grand-cafe room; go for breakfast or the lunch menu.","caveat":"Weekdays only; closes 19:00.","price_range":"Mains 249-287 CZK (menu 19-23 Oct 2026)","best_time":"Breakfast 07:00-10:00","dishes":[{"name":"Croissant Benedikt","note":"239 CZK, Oct 2026 menu"},{"name":"Wiener Schnitzel","note":"veal, 287 CZK, week of 19 Oct 2026"},{"name":"Reisauflauf","note":"baked rice with port-soaked plums, 236 CZK"}],"web":"https://ostrava.jtbankacafe.cz"},
    {"id":"zamek-zabreh","cat":"shop","tier":"plenty","priority":21,"name":"Zámek Zábřeh — Pivovar Pikard","short":"Zámek Zábřeh","neighborhood":"Zábřeh","maps":"https://www.google.com/maps/search/?api=1&query=Z%C3%A1mek+Z%C3%A1b%C5%99eh+Pivovar+Pikard+Ostrava","badge":"BREWERY","tags":["Table booking on the website"],"productTags":["Ostrava"],"hours":"","why":"Zábřeh began as a Gothic water fort; around 1600 Ctibor Syrakovský of Pěrkov rebuilt it as a chateau. After reconstruction it reopened in 2007 as a hotel with a house brewery, Pivovar Pikard, and the house notes that an urbarium of the Olomouc bishopric recorded brewing here more than 500 years ago. The seasonal brews run from a spring nettle beer to a Christmas ginger beer, and the Martinmas goose comes in November.","address":"U Zamku 42/1, 700 30 Ostrava-Zábřeh","phone":"+420 777 808 299","status":"confirmed","statusChecked":"2026-10-21","lat":49.807085,"lng":18.240266,"category":"brewery","subcat":"BEER","hook":"A Renaissance chateau in Zábřeh turned hotel, with its own brewery, two restaurants and a beer spa.","signature":"House lager poured in the chateau brewery restaurant","verdict":"The most atmospheric place in the city to drink beer brewed on the premises.","caveat":"Out of the centre (Zábřeh, south Ostrava); the beer spa is a gimmick you can skip.","reservation":"Table booking on the website","dishes":[{"name":"Seasonal beer specials","note":"from spring nettle beer to Christmas ginger beer"},{"name":"Martinmas goose","note":"part of the chateau's seasonal kitchen calendar, which also runs to winter game"}],"web":"https://www.zamek-zabreh.cz"},
    {"id":"hermanicky-pivovar","cat":"shop","tier":"plenty","priority":22,"name":"Heřmanický pivovar","short":"Heřmanický pivovar","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=He%C5%99manick%C3%BD+pivovar+Ostrava","badge":"BREWERY","tags":["Essential at weekends"],"productTags":["Ostrava"],"hours":"","why":"Heřmanický pivovar brews unfiltered, unpasteurised lager on Vrbická street in Heřmanice, a district of Slezská Ostrava that grew up around coal. The tour, with tasting and food, is sold through Slevomat, and reviews dated August to mid-October 2026 praise the owner and the guide but warn that weekend slots book out months ahead. The restaurant's party piece is the metr piva: ten half-litre glasses lined up on a board. Book a weekday.","address":"Vrbická 614/131, Ostrava-Slezská Ostrava","phone":"","status":"confirmed","statusChecked":"2026-09-30","lat":49.85925,"lng":18.330007,"category":"brewery","subcat":"BEER","hook":"A small brewery in Heřmanice, an old mining district, with booked tours, tastings and a metre of beer.","signature":"House lager from the tank","verdict":"Book a weekday tour; this is where Ostrava's small-brewery scene actually lives.","caveat":"Evidence is a deal-site listing, not the brewery's own page; book by phone at least two days ahead.","reservation":"Essential at weekends","dishes":[{"name":"Brewery tour with tasting","note":"booked weeks ahead at weekends"},{"name":"Metr piva","note":"ten 0.5 l beers on a board, for a group"}]},
    {"id":"radegast","cat":"shop","tier":"plenty","priority":23,"name":"Pivovar Radegast, Nošovice","short":"Pivovar Radegast, Nošovice","neighborhood":"Beskydy foothills, 30 km south of Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Pivovar+Radegast%2C+No%C5%A1ovice+No%C5%A1ovice+%C4%8Cesko","badge":"BREWERY","tags":["Book ahead: exkurze@radegast.cz","Weekday or Saturday afternoon"],"productTags":["Beskydy & around"],"hours":"Visitor centre listed Mon-Sat 10:00-17:00 (Apr-Sep), 10:00-16:00 (Oct-Mar); Czech-language tours listed Tue and Sat 14:00 (Kudy z nudy, undated, read 21 Oct 2026)","why":"The brewery carries the name of the horned god whose statue stands on the Radhošť ridge, and built its brand on bitterness: the line on its own site is 'Život je hořký. Bohudík!', Life is bitter. Thank God! The regional tourism board dates brewing in Nošovice to 1970. The tour covers brewing and bottling, explains why water from the nearby Morávka reservoir matters, and ends with a tasting in the observation tower, Beskydy peaks in view.","address":"Nošovice 238, 739 51 Nošovice","phone":"","status":"confirmed","statusChecked":"2026-06-01","lat":49.661251,"lng":18.427241,"category":"brewery","subcat":"BEER","hook":"Moravia's big bitter lager, brewed in Nošovice under the Beskydy since 1970; the tour ends in a tower.","signature":"A tasting in the observation-tower restaurant","verdict":"The easiest serious brewery tour from Ostrava; pair it with a Beskydy day.","caveat":"Prices and tour times below come from an undated Kudy z nudy listing that still shows an old SABMiller email: confirm with the brewery before you go.","price_range":"Tour listed 250 CZK adult, 180 CZK reduced, 650 CZK family (Kudy z nudy, undated, read 21 Oct 2026)","reservation":"Book ahead: exkurze@radegast.cz","best_time":"Weekday or Saturday afternoon","dishes":[{"name":"Tour tasting","note":"poured in the tower restaurant at the end of the tour"},{"name":"Radegastova škola čepování","note":"tapping school, listed at 650 CZK"}],"web":"https://www.radegast.cz"},
    {"id":"u-zrzave-mary","cat":"shop","tier":"plenty","priority":24,"name":"U Zrzavé Mary","short":"U Zrzavé Mary","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=U+Zrzav%C3%A9+Mary+Ostrava","badge":"PUB","tags":[],"productTags":["Ostrava"],"hours":"","why":"'U Zrzavé Mary' means 'At Red-haired Mary's', and the room keeps to the colour: dark red, with old radio sets on the walls. The European Bar Guide calls it a cult pub and dive bar and lists it in its Top 100 Bars in Europe for 2026; Radio Prague International named it among Ostrava's traditional pubs in May 2024. Draught from small breweries, spirits on the back bar, and a crowd that arrives late.","address":"Jurečkova 12, Moravská Ostrava","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.834444,"lng":18.28711,"category":"pub","subcat":"THE HOSPODA","hook":"A dark-red late-night dive bar on Jurečkova, its walls hung with old radios.","signature":"Independent draught beer, late","verdict":"The late beer after the gig, not the first one.","caveat":"Smoky-dive character; small independent beer range only.","dishes":[{"name":"Small-brewery draught","note":"modest rotating range"},{"name":"Back-bar spirits","note":"decent selection"}]},
    {"id":"kurnik-sopa","cat":"shop","tier":"plenty","priority":25,"name":"Kurník šopa","short":"Kurník šopa","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=Kurn%C3%ADk+%C5%A1opa+Ostrava","badge":"PUB","tags":[],"productTags":["Ostrava"],"hours":"Mon–Sun 14:00–23:00 (own site, read 21 Oct 2026)","why":"Kurník šopa began as a basement pub in Poruba and opened this second bar on Myslbekova, in the centre. The taps rotate small breweries, mostly unfiltered and unpasteurised, and the pub posts the day's list online: on 20 October 2026 it ran from a 10° pale lager through a fresh-hop 11°, a smoked Rauchbier and a hazy APA to a piña colada sour and a 14° West Coast IPA called Crispy džus. Open every day from 14:00 to 23:00.","address":"Myslbekova 13, Ostrava","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.849939,"lng":18.279877,"category":"pub","subcat":"THE HOSPODA","hook":"Multitap pub on Myslbekova for unfiltered, unpasteurised beer from small independent breweries.","signature":"Rotating independent lagers","verdict":"Where Ostrava's beer people drink when they want something other than the big three.","caveat":"The original Kurník šopa is a basement pub in Poruba, Pavlouskova 24.","dishes":[{"name":"Guest lagers","note":"usually unfiltered and unpasteurised"},{"name":"Bottle list","note":"some other European beers"}]},
    {"id":"hokuspokus","cat":"shop","tier":"plenty","priority":26,"name":"HokusPokus","short":"HokusPokus","neighborhood":"Škroupova, city centre","maps":"https://www.google.com/maps/search/?api=1&query=HokusPokus+Ostrava","badge":"WINE","tags":[],"productTags":["Ostrava"],"hours":"Tue-Thu 16:00-23:00, Fri 16:00-00:00, Sat 18:00-00:00, Sun-Mon closed (own site, read 21 Oct 2026)","why":"The owners say they spent twenty years selling conventional wine before switching to organic and natural bottles from growers they know personally. In Ostrava they bring those growers to the bar: Partida Creus and Microbio on 13 May 2026, Domaine Ganevat the next night, Spetici on 3 June. Moravian bottles share the list with European natural growers, and the food is simple: sourdough and pâté. Evenings only, Tuesday to Saturday, until midnight on Friday and Saturday.","address":"Škroupova 1114/4, Ostrava","phone":"","status":"confirmed","statusChecked":"2026-06-03","lat":49.836276,"lng":18.285509,"category":"wine-bar","subcat":"WINE","hook":"Natural-wine bar on Skroupova, sister of the Prague original, with sourdough and pâté on the side.","signature":"Natural wine by the glass","verdict":"The best glass of wine in the city; Moravian bottles share the list with European natural growers.","caveat":"Closed Sunday and Monday; not a Moravian-only list.","dishes":[{"name":"Wine by the glass","note":"organic and natural only"},{"name":"Sourdough bread","note":"house-baked"},{"name":"Pate","note":"from the butcher Melememaso"}],"web":"https://hokuspokus.cz"},
    {"id":"winestone","cat":"shop","tier":"plenty","priority":27,"name":"Winestone","short":"Winestone","neighborhood":"Českobratrská, city centre","maps":"https://www.google.com/maps/search/?api=1&query=Winestone+Ostrava","badge":"WINE","tags":[],"productTags":["Ostrava"],"hours":"Business lunch Mon-Fri 11:30-14:00 (Kudy z nudy, read 21 Oct 2026)","why":"The name is two English words, wine and stone, and the stone is literal: dishes come out on slate boards the house calls 'les planches'. Every dish on the à la carte menu is matched to a glass from the list, and on weekdays there is a business lunch from 11:30 to 14:00. The Moravian-Silesian Region's North Moravia gastro guide of June 2026 includes it. A calm room for a glass with dinner.","address":"Českobratrská 1742/18, Ostrava","phone":"","status":"unverified","statusChecked":"2026-06-01","lat":49.839323,"lng":18.28818,"category":"wine-bar","subcat":"WINE","hook":"Hotel restaurant built around a wine list, on the ground floor of the Mercure Ostrava Center.","signature":"Dish-and-glass pairing","verdict":"A safe hotel option for a glass with dinner, not a destination.","caveat":"Moravian focus not confirmed.","dishes":[{"name":"Business lunch","note":"Mon-Fri 11:30-14:00"},{"name":"Wine pairing","note":"glass chosen per dish"}]},
    {"id":"nox","cat":"shop","tier":"plenty","priority":28,"name":"NOX — Provoz","short":"NOX","neighborhood":"Ostrava","maps":"https://www.google.com/maps/search/?api=1&query=NOX+Provoz+Kosteln%C3%AD+24+Ostrava","badge":"LATE","tags":["Gig entry 250-350 CZK (24 Oct 2026)"],"productTags":["Ostrava"],"hours":"Mon-Sat from 16:00; Mon-Thu to 00:00, Fri-Sat to 02:00 (own site, read 21 Oct 2026)","why":"Provoz started out at the Hlubina mine, part of the old Vítkovice coal-and-iron complex, and moved into the city centre in 2020. Beyond the bar it runs the Inverze literary festival and the Luft audiovisual festival, and its club room holds 100 standing. The autumn 2026 bill brings Market and Laokoon on 24 October, the Barevná továrna launch on 6 November and Power for Ukraine on 13 November. From 16:00, Monday to Saturday.","address":"Kostelní 24, 702 00 Ostrava","phone":"+420 604 748 376","status":"confirmed","statusChecked":"2026-10-21","lat":49.836608,"lng":18.295858,"category":"late-night","subcat":"AFTER DARK","hook":"'Good drink / concerts / vinyl / books': the bar of the Provoz arts collective, open till 2 at weekends.","person":"Tomas Homolik (bar manager, programmer)","signature":"A drink and whatever is on the turntable","verdict":"The closest thing Ostrava has to a listening bar: records, books and a serious gig room.","caveat":"Not a hi-fi bar in the Japanese sense; gigs carry a door charge (250-350 CZK for 24 Oct 2026).","price_range":"Gig entry 250-350 CZK (24 Oct 2026)","dishes":[{"name":"Bar drinks","note":"beer, wine, spirits"},{"name":"Vinyl and books","note":"sold over the bar"}],"web":"https://www.provoz.net/nox","hot_this_month":"Autumn 2026: Market and Laokoon on 24 October, a record launch on 6 November, Power for Ukraine on 13 November (own site, seen 21 Oct)."},
    {"id":"heligonka","cat":"shop","tier":"plenty","priority":29,"name":"Heligonka","short":"Heligonka","neighborhood":"Dolní Vítkovice","maps":"https://www.google.com/maps/search/?api=1&query=Heligonka+Ostrava","badge":"LATE","tags":["Tickets ahead"],"productTags":["Ostrava"],"hours":"Open on concert days 18:00-21:00 (own site, read 21 Oct 2026)","why":"Heligonka is the room of Ostrava's best-known songwriter, run by Jarek Nohavica with Pavel Giertel. In its own words, couplets are sung next to opera arias, and the engineer sits at the same table as the shop assistant. A heligonka is the button accordion of Moravian folk music. Doors open on concert days only, 18:00–21:00; the late-October 2026 bill has Jiří Krhut on the 25th and 'Jarek' himself on the 26th. There is dancing, and football on screen.","address":"Vitkovicka 42/3367, 702 00 Ostrava","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.822498,"lng":18.278116,"category":"late-night","subcat":"AFTER DARK","hook":"Jaromír Nohavica's cabaret-style club at the foot of the Vítkovice blast furnaces.","person":"Jaromír Nohavica, Pavel Giertel","signature":"A Nohavica evening","verdict":"Book a night Nohavica plays; it is Ostrava's songwriter in his own room.","caveat":"Opens only on concert days, 18:00-21:00 box hours.","reservation":"Tickets ahead","dishes":[{"name":"Bar","note":"drinks with the show"},{"name":"Concert","note":"the reason to go"}],"web":"https://www.heligonka.cz","hot_this_month":"Late October 2026: Jiří Krhut on 25 October, Jarek Nohavica on 26 October (own site, seen 21 Oct)."},
    {"id":"dock","cat":"shop","tier":"plenty","priority":30,"name":"Dock","short":"Dock","neighborhood":"Havlíčkovo nábřeží, Malá Kodaň (river embankment)","maps":"https://www.google.com/maps/search/?api=1&query=Dock+Ostrava","badge":"LATE","tags":["Phone only"],"productTags":["Ostrava"],"hours":"Mon 14:00-23:00, Tue-Thu 08:00-23:00, Fri 08:00-00:00, Sat 09:00-00:00, Sun 09:00-22:00 (own site, read 21 Oct 2026)","why":"Dock calls itself 'above all an informal space', and means it: you order and pay at the tap, tables are booked by phone only, and takeaway leaves solely in 50 CZK deposit cups, paid in cash. It hosted Jazz Open Ostrava in June 2026 and runs jam sessions through the year; the Provoz collective takes over the room on 27 October 2026. Coffee from 8:00 Tuesday to Friday, weekend breakfast, and the river terrace when the weather allows.","address":"Havlíčkovo nábřeží 28, Ostrava","phone":"+420 603 335 791 (reservations)","status":"confirmed","statusChecked":"2026-10-21","lat":49.836532,"lng":18.296065,"category":"late-night","subcat":"AFTER DARK","hook":"Café by day, bar and small music club by night, on the Ostravice embankment in Malá Kodaň.","signature":"Beer, wine or a cocktail on the river terrace","verdict":"The best single bar in Malá Kodaň, where Ostrava now goes out.","caveat":"Bring cash for cup deposits.","reservation":"Phone only","dishes":[{"name":"Weekend breakfast","note":"09:00-12:00, table service only then"},{"name":"Bistro plates","note":"afternoons"}],"web":"https://www.clubdock.cz","hot_this_month":"27 October 2026: a Provoz night on the river (seen 21 Oct)."},
    {"id":"folk-food","cat":"shop","tier":"plenty","priority":31,"name":"Folk Food","short":"Folk Food","neighborhood":"Poruba, Čkalovova","maps":"https://www.google.com/maps/search/?api=1&query=Folk+Food+Ostrava","badge":"STREET","tags":[],"productTags":["Ostrava"],"hours":"","why":"Folk Food takes the párek v rohlíku, the Czech street hot dog of a sausage pushed into a hollowed roll, and rebuilds it from scratch. The sausages are made in-house, the gouda is smoked in-house, and the roll becomes a brioche bun. The Chilli Folk dog comes with sauerkraut and a plum barbecue sauce; the Cheddar Folk dog is the gentler one. There is a second Folk Food bufet in Havířov.","address":"Čkalovova 6144/18, Ostrava-Poruba","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.82991,"lng":18.175942,"category":"street","subcat":"LA RUE","hook":"Craft hot-dog counter in Poruba: house sausage, house-smoked gouda, brioche bun.","signature":"Chilli Folk dog with sauerkraut and plum BBQ","verdict":"Fast, local, made in-house.","caveat":"Own site footer still © 2025; no hours online.","dishes":[{"name":"Chilli Folk dog","note":"Sausage, pickled cabbage, plum BBQ, chipotle, jalapeño; 169 CZK."},{"name":"Cheddar Folk dog","note":"179 CZK."},{"name":"Smoked gouda","note":"Breaded house-smoked gouda, 159 CZK."}],"web":"https://folkfood.cz"},
    {"id":"faency-fries","cat":"shop","tier":"plenty","priority":32,"name":"FÆNCY FRIES","short":"FÆNCY FRIES","neighborhood":"Vítkovice, Ruská","maps":"https://www.google.com/maps/search/?api=1&query=F%C3%86NCY+FRIES+Ostrava","badge":"STREET","tags":[],"productTags":["Ostrava"],"hours":"","why":"FÆNCY FRIES does one thing: fries cut from fresh potatoes and finished with dips. The order is fries with cheddar dip and bacon, or the plainer version with mayonnaise and red onion. The counter visitostrava lists at Čs. legií 1719/5 is in the city centre; the company itself is registered in Vítkovice, the steel district south of it. A cheap plate on the walk between the bars, eaten standing up.","address":"Čs. legií 1719/5, Moravská Ostrava (per visitostrava)","phone":"","status":"confirmed","statusChecked":"2026-10-21","lat":49.836865,"lng":18.289849,"category":"street","subcat":"LA RUE","hook":"Fresh-cut fries with dips at a counter on Čs. legií, from a small Vítkovice-based company.","signature":"Fries with cheddar dip and bacon","verdict":"A cheap late snack.","caveat":"Prices and hours not on home page.","dishes":[{"name":"Fries with mayonnaise and red onion","note":"Own site."},{"name":"Fries with cheddar dip and bacon","note":"Own site."}],"web":"https://faencyfries.cz"}
  ];
  const NEIGHBORHOODS = [
    {"name":"Moravská Ostrava","desc":"The bishop's town.","maps":"https://www.google.com/maps/search/?api=1&query=Masarykovo+n%C3%A1m%C4%9Bst%C3%AD+Ostrava"},
    {"name":"Vítkovice","desc":"A company town in red brick.","maps":"https://www.google.com/maps/search/?api=1&query=M%C3%ADrov%C3%A9+n%C3%A1m%C4%9Bst%C3%AD+Ostrava+V%C3%ADtkovice"},
    {"name":"Slezská Ostrava","desc":"The Silesian bank.","maps":"https://www.google.com/maps/search/?api=1&query=Slezsk%C3%A1+Ostrava+radnice"},
    {"name":"Poruba","desc":"The socialist-realist new town.","maps":"https://www.google.com/maps/search/?api=1&query=Oblouk+Ostrava+Poruba"},
    {"name":"Přívoz","desc":"The ferry village that became the station district.","maps":"https://www.google.com/maps/search/?api=1&query=Ostrava+hlavn%C3%AD+n%C3%A1dra%C5%BE%C3%AD"},
    {"name":"Mariánské Hory","desc":"Once Čertova Lhotka, now a street of wooden devils.","maps":"https://www.google.com/maps/search/?api=1&query=Bendlova+Ostrava+Mari%C3%A1nsk%C3%A9+Hory"}
  ];
  const WALKS = [
    {"name":"Along the Ostravice: Komenského sady and the Sýkora bridge","desc":"The river behind the town hall, a lime alley, and a swing dance under a steel bridge in summer.","maps":"https://www.google.com/maps/search/?api=1&query=Komensk%C3%A9ho+sady+Ostrava"},
    {"name":"Bělský les: 160 hectares of forest inside the city","desc":"A city forest between estates, with a slag-stone Lourdes chapel and a five-metre wooden giantess.","maps":"https://www.google.com/maps/search/?api=1&query=B%C4%9Blsk%C3%BD+les+Ostrava"},
    {"name":"Heřmanický rybník: fishermen's huts on mine water","desc":"About 70 fishing huts on stilts over a 116-hectare pond fed with mineral water pumped from the mines.","maps":"https://www.google.com/maps/search/?api=1&query=He%C5%99manick%C3%BD+rybn%C3%ADk+Ostrava"},
    {"name":"The footbridge over Bazaly: the city's picture frame","desc":"A green, corten-steel footbridge with a frame aimed at the town hall tower, best at sunset.","maps":"https://www.google.com/maps/search/?api=1&query=L%C3%A1vka+nad+Bazaly+Ostrava"}
  ];
  const WORK_SPOTS = [

  ];
  const LANDMARKS = [
    {"name":"New Town Hall tower: the tallest town-hall tower in the country","desc":"A lift to 73 m in a steel tower that was made of steel because the ground was too soft for brick.","maps":"https://www.google.com/maps/search/?api=1&query=Vyhl%C3%ADdkov%C3%A1+v%C4%9B%C5%BE+Nov%C3%A9+radnice+Ostrava"},
    {"name":"Masarykovo náměstí and the Old Town Hall","desc":"The square the bishop laid out before 1279, now home to the city museum and its astronomical clock.","maps":"https://www.google.com/maps/search/?api=1&query=Masarykovo+n%C3%A1m%C4%9Bst%C3%AD+Ostrava"},
    {"name":"Cathedral of the Divine Saviour","desc":"The second-largest church in Moravia, built for a boom town and made a cathedral only in 1996.","maps":"https://www.google.com/maps/search/?api=1&query=Katedr%C3%A1la+Bo%C5%BEsk%C3%A9ho+Spasitele+Ostrava"},
    {"name":"Silesian Ostrava Castle: the fortress that sank 16 metres","desc":"A 13th-century border castle at the meeting of two rivers, lowered by the mines beneath it.","maps":"https://www.google.com/maps/search/?api=1&query=Slezskoostravsk%C3%BD+hrad+Ostrava"},
    {"name":"Villa Grossmann: a builder's fairy-tale house and how it ended","desc":"The largest villa grounds in interwar Ostrava, built by a man the Depression ruined.","maps":"https://www.google.com/maps/search/?api=1&query=Vila+Grossmann+Ostrava"},
    {"name":"Přívoz: a square planned by Camillo Sitte, and the canaries","desc":"The Viennese town-planner drew the square, the church and the town hall here.","maps":"https://www.google.com/maps/search/?api=1&query=n%C3%A1m%C4%9Bst%C3%AD+Svatopluka+%C4%8Cecha+Ostrava+P%C5%99%C3%ADvoz"}
  ];
  const PHOTOS = [
    {"src":"/terroir/Ostrava-Moravskoslezsko/img/ostrava-1.jpg","caption":"Dolní Vítkovice at dusk: the blast furnaces, chimneys and gas holder of the ironworks founded in 1828, cold since the last tapping in 1998 and kept as one monument. The glass crown on furnace no. 1 is Bolt Tower, added in 2015; the café sits at 71 metres.","credit":"Oleksandr Dede · CC BY-SA 4.0 · Wikimedia Commons"},
    {"src":"/terroir/Ostrava-Moravskoslezsko/img/ostrava-2.jpg","caption":"The chain changing room at Důl Michal. Each miner hung his street clothes on a hook and hauled them to the ceiling on a chain he locked below; they changed here until 1985, and the chains are still in place.","credit":"Marta Malina Moraczewska · CC BY-SA 4.0 · Wikimedia Commons"},
    {"src":"/terroir/Ostrava-Moravskoslezsko/img/ostrava-3.jpg","caption":"The Trúba at Štramberk, the castle's surviving round keep, 40 metres high, made a lookout in 1901–1903. Below it the town bakes its gingerbread ears under a guild licence.","credit":"Kankovaa · CC BY-SA 4.0 · Wikimedia Commons"}
  ];
  const GEMS = [

  ];
  const TABLES = {
 "grande": {
  "title": "Les Grandes Tables",
  "desc": "The Beskydy's two MICHELIN tables and Ostrava's own new wave — the occasion end of the region.",
  "sections": [
   {
    "label": "The serious rooms — the Beskydy's two MICHELIN tables",
    "desc": "Ostrava itself has no MICHELIN entry; the region's only two sit 2.5 km apart in Čeladná, under the Beskydy, forty minutes south: a Bib Gourmand and a selected table.",
    "ids": [
     "miura",
     "cattaleya"
    ]
   },
   {
    "label": "The new wave — Ostrava's own",
    "desc": "Ostrava's own new generation: a weekday bistro cooking forgotten Czech recipes beside ramen, a steak house with its own farm, and a grill-and-wine room open from breakfast to midnight.",
    "ids": [
     "hogofogo-bistro",
     "stracena-garden",
     "bernie-s-grill-wine"
    ]
   }
  ]
 },
 "petite": {
  "title": "Les Petites Tables",
  "desc": "The Czech kitchen, the weekday lunch, the other kitchens, coffee, the brewery taps, the hospoda, wine, and the bars that are stages.",
  "sections": [
   {
    "label": "The Czech kitchen — goose, tongue and tripe soup",
    "desc": "The Czech kitchen done properly: a chef's restaurant inside the mining museum, a butcher's family in Poruba, and the pub with tripe soup and smoked tongue.",
    "ids": [
     "harenda-u-barborky",
     "u-jarosu",
     "stara-kuzelna"
    ]
   },
   {
    "label": "Polední menu — lunch for a working day",
    "desc": "Polední menu — the weekday lunch that feeds a working city: a dated menu on the main square, a vegetarian counter since 2005, and churros.",
    "ids": [
     "ostrawica-lokal",
     "burfi",
     "los-dobrotos"
    ]
   },
   {
    "label": "The other kitchens — phở, pelmeni, ramen",
    "desc": "The other kitchens a city of incomers built: Vietnamese phở on the main square, pelmeni and vareniky, and sushi with ramen.",
    "ids": [
     "happy-banh-mi",
     "pelmeski",
     "gokana"
    ]
   },
   {
    "label": "Breakfast & brunch",
    "desc": "Where Ostrava has breakfast, if it is not at the counter of a coffee bar.",
    "ids": [
     "drinkeat",
     "lajka-zije"
    ]
   },
   {
    "label": "Coffee — the roasters and the grand café",
    "desc": "Three roasters the city grew itself, and the one grand café with a gold ceiling.",
    "ids": [
     "cokafe",
     "laura-coffee",
     "shothouse-ostrava",
     "elektra"
    ]
   },
   {
    "label": "Beer — the brewery taps",
    "desc": "Beer where it is brewed: a chateau that brewed five centuries ago, a neighbourhood brewery with a booked-out tour, and Radegast under the Beskydy.",
    "ids": [
     "zamek-zabreh",
     "hermanicky-pivovar",
     "radegast"
    ]
   },
   {
    "label": "The hospoda — taprooms and a dive",
    "desc": "The hospoda: a dive walled with radios, and a long bar of small-brewery taps.",
    "ids": [
     "u-zrzave-mary",
     "kurnik-sopa"
    ]
   },
   {
    "label": "Wine — Moravia by the glass",
    "desc": "Moravia is the Czech wine country; Ostrava drinks it, and natural wine, by the glass in two rooms.",
    "ids": [
     "hokuspokus",
     "winestone"
    ]
   },
   {
    "label": "After dark — bars that are also stages",
    "desc": "The bars that are also stages: the arts collective's room of records and books, the songwriter's club under the furnaces, and the river bar.",
    "ids": [
     "nox",
     "heligonka",
     "dock"
    ]
   }
  ]
 },
 "street": {
  "title": "La Rue — The Street",
  "desc": "The counter: a craft hot dog and fresh-cut fries.",
  "sections": [
   {
    "label": "La rue — the counter",
    "desc": "The counter: a hot dog rebuilt from scratch, and fries cut that morning.",
    "ids": [
     "folk-food",
     "faency-fries"
    ]
   }
  ]
 }
};
  const CATEGORIES = [
 {
  "key": "creme",
  "label": "The serious rooms — the Beskydy's two MICHELIN tables",
  "lead": "Ostrava itself has no MICHELIN entry; the region's only two sit 2.5 km apart in Čeladná, under the Beskydy, forty minutes south: a Bib Gourmand and a selected table.",
  "story": {
   "title": "Albín Polášek's Radegast",
   "story": "Frenštát-born Albín Polášek began the Radegast in America in 1924; Czech Americans paid for it and it was unveiled on the ridge to Radhošť on 5 July 1931: 3.2 m and 1.4 tonnes of concrete and stoneware rubble. Lightning broke it up. The original now stands in the vestibule of Frenštát town hall, and the god on the mountain is a granite copy by Jan Sobek.",
   "where": "Frenštát pod Radhoštěm town hall"
  }
 },
 {
  "key": "rising",
  "label": "The new wave — Ostrava's own",
  "lead": "Ostrava's own new generation: a weekday bistro cooking forgotten Czech recipes beside ramen, a steak house with its own farm, and a grill-and-wine room open from breakfast to midnight.",
  "story": {
   "title": "Ostrava's Korean table",
   "story": "Ostrava has a sizeable Czech-Korean community linked to the Hyundai car plant, which is why the city has both a pricier Korean restaurant, Rodem, and cheap Korean fast food - kimbap at Kimbap plus for about 100 CZK - per Ostrava promoter Jan Petrus (Apetit, March 2026).",
   "where": "Central Ostrava"
  }
 },
 {
  "key": "houses",
  "label": "The Czech kitchen — goose, tongue and tripe soup",
  "lead": "The Czech kitchen done properly: a chef's restaurant inside the mining museum, a butcher's family in Poruba, and the pub with tripe soup and smoked tongue.",
  "story": {
   "title": "Zdař Bůh",
   "story": "'Zdař Bůh!' - roughly 'God grant success' - is the Czech miner's greeting, the cousin of the German 'Glück auf'. By German mining tradition 'Glück auf' refers to the rock that opened to shelter St Barbara, the miners' patron. It rang through Ostrava's old town when miners from Czechia, Poland and Slovakia marched at the 27th meeting of mining towns. Say it at Landek or Michal and an old hand will answer in kind.",
   "where": "Landek Park, Důl Michal"
  }
 },
 {
  "key": "cantine",
  "label": "Polední menu — lunch for a working day",
  "lead": "Polední menu — the weekday lunch that feeds a working city: a dated menu on the main square, a vegetarian counter since 2005, and churros.",
  "story": {
   "title": "The chain room",
   "story": "In the řetízkárna, the chain changing room, each miner hung his street clothes on a hook and hauled them to the ceiling on a chain he locked below. Hundreds of bundles hung in the warm air under the roof while their owners were underground. At Důl Michal the miners changed there until 1985; the chains are still in place, and the room has also housed an exhibition of miners' nativity scenes.",
   "where": "Důl Michal; Landek Park"
  }
 },
 {
  "key": "ethnic",
  "label": "The other kitchens — phở, pelmeni, ramen",
  "lead": "The other kitchens a city of incomers built: Vietnamese phở on the main square, pelmeni and vareniky, and sushi with ramen.",
  "story": {
   "title": "Why every Czech town has phở",
   "story": "The Czech Vietnamese community traces back to the 1950s, when Czechoslovakia offered study and training stays to North Vietnamese; many stayed after 1989. Estimated at 60,000-100,000, it is the third-largest foreign group after Slovaks and Ukrainians. From the 2000s Vietnamese owners began cooking their own food rather than Chinese or Thai, and the northern-style phở became the Czech default bowl.",
   "where": "Vietnamese bistros, Ostrava centre"
  }
 },
 {
  "key": "breakfast",
  "label": "Breakfast & brunch",
  "lead": "Where Ostrava has breakfast, if it is not at the counter of a coffee bar.",
  "story": {
   "title": "Named after a daughter",
   "story": "Laura Coffee started in the attic of a family house; founder Ivo Ptáčník named the roastery after his elder daughter. It now roasts, bakes its own bread and runs five cafes, including kafeKostka, a kiosk that has served specialty coffee to commuters at Ostrava-Svinov station every day since 2014.",
   "where": "kafeKostka, Ostrava-Svinov station"
  }
 },
 {
  "key": "coffee",
  "label": "Coffee — the roasters and the grand café",
  "lead": "Three roasters the city grew itself, and the one grand café with a gold ceiling.",
  "story": {
   "title": "Kofola buys the city's coffee",
   "story": "Kofola, the soft drink that began as a local answer to Coca-Cola and is still headquartered in Ostrava, bought 52% of CØKAFE in August 2026. Since 2019 it has been building a chain from bean to cup: coffee growing in Colombia, a family farm in Boquete, Panama, and its own roastery in Strážnice. CØKAFE founder Richard Mauler, who opened the first cafe in Ostrava in 2015, stays as co-owner.",
   "where": "CØKAFE Dolní Vítkovice"
  }
 },
 {
  "key": "brewery",
  "label": "Beer — the brewery taps",
  "lead": "Beer where it is brewed: a chateau that brewed five centuries ago, a neighbourhood brewery with a booked-out tour, and Radegast under the Beskydy.",
  "story": {
   "title": "Five centuries of chateau beer",
   "story": "Zámek Zábřeh, one of the two oldest sites in greater Ostrava, says beer was brewed there over 500 years ago, recorded in an urbarium of the Olomouc bishopric. The chateau reopened in 2007 with its own brewery again; it brews to the season, from a spring nettle beer to a Christmas ginger beer, and fills a vaulted cellar tub with beer for its spa.",
   "where": "Zámek Zábřeh"
  }
 },
 {
  "key": "pub",
  "label": "The hospoda — taprooms and a dive",
  "lead": "The hospoda: a dive walled with radios, and a long bar of small-brewery taps.",
  "story": {
   "title": "Ušák: beer that tastes of Štramberk",
   "story": "Štramberk's town brewery makes a 14-degree special called Ušák, flavoured with Štramberské uši, the spiced gingerbread 'ears' the town protects as its own. The everyday beer is Trubač, an 11-degree yeast lager. Hours unconfirmed: check before the climb up from the square.",
   "where": "Štramberk"
  }
 },
 {
  "key": "wine-bar",
  "label": "Wine — Moravia by the glass",
  "lead": "Moravia is the Czech wine country; Ostrava drinks it, and natural wine, by the glass in two rooms.",
  "story": {
   "title": "Kosher slivovitz from Wallachia",
   "story": "In the 1930s the Rudolf Jelínek distillery in Vizovice made its plum brandy under Orthodox Jewish rules; according to the house museum's curator, the first kosher bottles went to the United States in 1934. Vizovice had a distillery on record as early as 1585.",
   "where": "Vizovice"
  }
 },
 {
  "key": "late-night",
  "label": "After dark — bars that are also stages",
  "lead": "The bars that are also stages: the arts collective's room of records and books, the songwriter's club under the furnaces, and the river bar.",
  "story": {
   "title": "Nohavica's own room",
   "story": "Heligonka's house rule reads like a manifesto: couplets sung next to opera arias, the engineer at one table with the shop assistant, every language spoken. The club, in the Dolní Vítkovice ironworks, is run by Jaromír Nohavica, the Ostrava songwriter, with Pavel Giertel, and opens its doors only on concert nights.",
   "where": "Heligonka"
  }
 },
 {
  "key": "street",
  "label": "La rue — the counter",
  "lead": "The counter: a hot dog rebuilt from scratch, and fries cut that morning.",
  "story": {
   "title": "Emil Zátopek",
   "story": "The runner who won the 5,000 m, 10,000 m and marathon at the 1952 Helsinki Olympics was born in Kopřivnice on 19 September 1922; his wife Dana, javelin gold at the same Games, was born the same day. Kopřivnice commissioned a bronze statue from Jaroslav Brož for the 2022 centenary, and a run in his name starts in Kopřivnice on the Saturday nearest his birthday. The Lašské muzeum in Šustala's villa holds the exhibition of the Zátopek couple.",
   "where": "Lašské muzeum, Štefánikova 226/8"
  }
 }
];
  const GROUPS = [{"key":"grande","label":"Les Grandes Tables","lead":"The Beskydy's two MICHELIN tables and Ostrava's own new wave — the occasion end of the region."},{"key":"petite","label":"Les Petites Tables","lead":"The Czech kitchen, the weekday lunch, the other kitchens, coffee, the brewery taps, the hospoda, wine, and the bars that are stages."},{"key":"street","label":"La Rue — The Street","lead":"The counter: a craft hot dog and fresh-cut fries."}];
  const GROUP_OF = {"creme":"grande","rising":"grande","houses":"petite","cantine":"petite","ethnic":"petite","breakfast":"petite","coffee":"petite","brewery":"petite","pub":"petite","wine-bar":"petite","late-night":"petite","street":"street"};
  const BRIDGE = {
 "_rule": "SINGLE-EDITOR RULE: charter{} on a venue deliberately duplicates booking truth held in its reservation/price_range/caveat prose. Any commit editing those fields on a shortlist venue MUST update its charter block in the same commit.",
 "doors": [
  {
   "fr": "One Night",
   "en": "Crew ashore for one evening: dinner in the centre, a drink on the river bank or eighty metres up a blast furnace.",
   "note": "La table · le fleuve · le haut-fourneau",
   "href": "#tables",
   "open": [
    "tables",
    "bars",
    "street-food"
   ]
  },
  {
   "fr": "The Gastronomic Dig-In",
   "en": "For the chef: the food history, the gingerbread ears, Ostravar's last year at home, the Beskydy's two MICHELIN tables.",
   "note": "L’histoire · le garde-manger · la bière",
   "href": "#bougie",
   "open": [
    "bougie",
    "provisioning",
    "pivo",
    "la-liste"
   ]
  },
  {
   "fr": "For Guests",
   "en": "Plan ahead, or save the night at the last minute: bookable, priced.",
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
    "sub": "The booking fell through at seven: these three are open late and take walk-ins or same-day calls; none promises a table.",
    "ids": [
     "ostrawica-lokal",
     "bernie-s-grill-wine",
     "u-jarosu"
    ]
   },
   {
    "label": "Plan ahead — this week",
    "sub": "Book days ahead: Stračena closes Sunday, Harenda Monday and Tuesday, HogoFogo at weekends.",
    "ids": [
     "stracena-garden",
     "harenda-u-barborky",
     "hogofogo-bistro"
    ]
   },
   {
    "label": "Plan ahead — the grand night",
    "sub": "The Beskydy's two MICHELIN tables in Čeladná, 2.5 km apart: book as soon as the date is fixed, and arrange the drive back.",
    "ids": [
     "miura",
     "cattaleya"
    ]
   }
  ]
 }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES, CATEGORIES, GROUPS, GROUP_OF, BRIDGE };
})();
