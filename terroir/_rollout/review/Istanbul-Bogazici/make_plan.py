#!/usr/bin/env python3
"""Write picks.json and card_plan.json for Istanbul-Bogazici GOLD6 (12 Oct 2026). The editorial cut lives here as data."""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research" / "cards_old.json"))
LANES = {
 "creme": ("La Crème de la Crème", ["turk-fatih-tutak", "mikla", "neolokal"],
           {"turk-fatih-tutak": "the city's only two-star, and its Green Star: the one tasting menu to clear an evening for",
            "mikla": "the Pera roof and the ingredient argument that made it last",
            "neolokal": "the classics taken apart and rebuilt in Karaköy, the guide's sustainability case"}),
 "rising": ("The 2026 wave", ["kontuar", "todos-los-dias", "basta-neo-bistro"],
           {"kontuar": "the open fire inside a 19th-century Pera passage",
            "todos-los-dias": "a starred chef's comfort food in Asmalımescit: the new wave at its least solemn",
            "basta-neo-bistro": "the Asian side's neo-bistro on the MICHELIN list, so the wave is not only a Beyoğlu story"}),
 "chefs-eat": ("Where the chefs eat", ["nazende-cadde", "asmali-cavit", "balikci-kahraman"],
           {"nazende-cadde": "the two-star chef's favourite table in Turkey, on the Asian side",
            "asmali-cavit": "the after-service rakı table the record keeps agreeing on",
            "balikci-kahraman": "the village grill at the last quay before the Black Sea"}),
 "ocakbasi": ("The fire counters — Ocakbaşı", ["tam-ocakbasi", "mesai", "ahmet-ustam-ocakbasi"],
           {"tam-ocakbasi": "the chef's ocakbaşı on the Arnavutköy shore",
            "mesai": "the Karaköy fixture that came back on İnönü Caddesi",
            "ahmet-ustam-ocakbasi": "an ocakbaşı first and a day-off address second: moved here from where-the-chefs-eat, which keeps three"}),
 "esnaf": ("Esnaf lokantası — the tradesman's table", ["araf-istanbul", "ciya-sofrasi", "casius-antioch-kitchen"],
           {"araf-istanbul": "the defining meal of the decade, if you get in",
            "ciya-sofrasi": "the Anatolian field-recording kitchen by the Kadıköy market",
            "casius-antioch-kitchen": "Antakya in exile, a 2026 Bib Gourmand"}),
 "kahvalti": ("Kahvaltı — the breakfast tables", ["van-kahvalti-evi", "cakmak-kahvalti-salonu", "emirgan-sutis-emirgan"],
           {"van-kahvalti-evi": "the Van serpme house of Cihangir, herb cheese first",
            "cakmak-kahvalti-salonu": "the honest end of the serpme market, in the Beşiktaş çarşı",
            "emirgan-sutis-emirgan": "kaymak by the Bosphorus, built à la carte"}),
 "ethnic": ("The other kitchens — Anatolia & beyond", ["siirt-seref-buryan", "giritli", "hayvore", "saruja"],
           {"siirt-seref-buryan": "the büryan pit of the Siirt quarter under the aqueduct",
            "giritli": "the Cretan table the 1923 exchange carried across the Aegean",
            "hayvore": "the Black Sea, one street off İstiklal",
            "saruja": "Damascene home cooking on the Syrian high street"}),
 "late-night": ("Late night — after service", ["lale-iskembecisi", "tarihi-mimoza-corbacisi", "tarihi-degustasyon-ocakbasi"],
           {"lale-iskembecisi": "the soup that closes a rakı night, since 1965",
            "tarihi-mimoza-corbacisi": "the cure at its purest, in Samatya",
            "tarihi-degustasyon-ocakbasi": "the midnight kitchen of the Balık Pazarı drinking lanes"}),
 "quick-bites": ("Sur le pouce — the honest fast plate", ["midyeci-ahmet-besiktas", "ozzies-1968-kokorec", "kizilkayalar-taksim"],
           {"midyeci-ahmet-besiktas": "midye dolma by the piece in the Beşiktaş çarşı",
            "ozzies-1968-kokorec": "kokoreç with a named usta and named sourcing",
            "kizilkayalar-taksim": "the wet burger: the city's agreed end of a night"}),
 "story": ("The old houses", ["agora-meyhanesi", "yanyali-fehmi-lokantasi", "develi-samatya"],
           {"agora-meyhanesi": "1890: the Greek captain's tavern in Balat",
            "yanyali-fehmi-lokantasi": "1919: the lokanta that came the other way, now a Bib Gourmand",
            "develi-samatya": "1912: Gaziantep by one family, behind the Marmara walls"}),
}
FOURS = {"ethnic": "The one 4 in the guide, kept because the four are four different migrations and none stands in for another: "
                   "Siirt (the south-east, the büryan pit), Crete (the 1923 population exchange), the Laz Black Sea (internal migration), "
                   "Damascus (the Syrian war after 2011). Istanbul eats in every direction it once ruled; cutting one erases a whole route."}
KEEP_PINS = ["wayana-wine-bar-tapas", "arkaoda", "sahika", "nardis-jazz-club", "montag", "kuzguncuk", "arnavutkoy-to-bebek",
             "buyukada-princes-islands", "kadikoy", "namli-gurme", "kurukahveci-mehmet-efendi", "karakoy-gulluoglu", "kadikoy-market",
             "vefa-bozacisi"]
CUT = {
 "nicole": "fourth in the crème; the three kept are the two-star, the roof and the rebuilt classics — Nicole's case is service, the hardest thing to send a guest on",
 "araka": "fourth in the crème, time-limited (a seasonal residency) and a drive up the strait",
 "arkestra": "fifth in the crème; one Etiler star among several, and its hi-fi room is not reason enough to keep a fifth tasting menu",
 "sankai-by-nagaya": "unverified as trading (Aug 2026) and a Japanese room: authentic to Japan, not to this city",
 "hodan": "fourth in the wave; its case is a weekend brunch",
 "lina-anatolian": "a hotel terrace with a view, honest about itself: the least particular of the wave",
 "koroglu-et-lokantasi": "unverified as trading; the chefs-eat lane keeps three confirmed",
 "cira-ocakbasi": "unverified as trading, in a shopping mall at Skyland",
 "tarihi-van-kahvalti-evi": "a second Van serpme house; one is the point",
 "hasan-fehmi-ozsut": "a kaymak counter on İstiklal; the Bosphorus kaymak table carries that register",
 "sur-ocakbasi": "fourth late-night; the Kadınlar Pazarı block is already told through Siirt Şeref Büryan and the market card",
 "eminonu-balik-ekmek-tekneleri": "the guide contradicted itself: the traps and The Dish call the painted boats a tourist operation, the lane recommended them. The traps win; the boats are named there, not recommended",
 "bezirgan-cig-kofte": "unverified as trading",
 "arogan": "a six-month-old Tarabya room outside every lane: fewer places is the point",
 "indochine-istanbul": "unverified: nothing dated after October 2025",
 "seoul-kitchen": "unverified: nothing dated 2026 confirms it",
 "ostre": "a listing with no footprint beyond city-guide copy",
 "ruya-istanbul": "an international sharing-plates brand: not particular to this city",
 "burger-and-lobster": "an international chain inside a hotel, unverified",
 "bag-pera": "unverified (Aug 2026); the wine group keeps three confirmed rooms",
 "federal-galata": "unverified (Aug 2026); the coffee group keeps three",
 "coffee-manifesto": "unverified, and no card points to it",
 "june": "unverified, a year old; the listening group keeps the two anchors and the café that turns hi-fi",
 "ritim-istanbul": "a club-night series, not a place",
 "karga": "re-checked 12 Oct 2026: its own August notice said closing soon and Tripadvisor lists it closed; no 2026 source settles it, so it is not safe to send anyone",
 "lokanta-stambouli": "re-checked 12 Oct 2026: it opened in November 2025 (Gazete Oksijen), not August 2026, and nothing dated since confirms it is trading; its two published phone numbers disagree",
}
SHORT = {"Last minute — save the night": ["asmali-cavit", "agora-meyhanesi", "ciya-sofrasi"],
         "Plan ahead — this week": ["mikla", "neolokal", "giritli"],
         "Plan ahead — the grand night": ["turk-fatih-tutak", "araf-istanbul", "nazende-cadde"]}
picks = {"_doc": "GOLD6 picks for Istanbul-Bogazici, 12 Oct 2026. Lanes hold <=3; one 4 (ethnic, reason in 'fours'). Criteria in order: can't-miss for Istanbul · authentic over touristic · teaches something · confirmed over unverified. Fewer places is the point. Cut venues leave data.js, both CSVs and every #venue- link. Berths and the guest list rebuilt from venues kept.",
         "lanes": {k: {"label": l, "ids": ids, "why": w} for k, (l, ids, w) in LANES.items()},
         "fours": FOURS,
         "groups": {"grande": ["creme", "rising"], "petite": ["chefs-eat", "ocakbasi", "esnaf", "kahvalti", "ethnic", "story"], "street": ["quick-bites", "late-night"]},
         "berths": ["mikla", "ciya-sofrasi", "agora-meyhanesi"], "shortlist": SHORT, "keep_pins": KEEP_PINS, "cut": CUT}

def C(key, *frm, note="", ref=""):
    for f in frm: assert f in OLD, f
    return {"key": key, "from": list(frm), "note": note, **({"ref": ref} if ref else {})}
def G(title, *cards, desc=""):
    assert len(cards) <= 3, title
    return {"title": title, "desc": desc, "cards": list(cards)}
q = lambda n: f"quartiers|{n}"
plan = {"_doc": "GOLD6 card plan for Istanbul-Bogazici (12 Oct 2026). Each fold -> groups (<=3 cards) -> cards. 'from' lists the OLD card keys (section|name, research/cards_old.json) the new card is built from; several keys = a merge (told once). 'note' = the angle; 'ref' = a lane venue the card points to. Old cards not listed are CUT (picks.json cards_cut).",
 "quartiers": {"chapter": "place", "sub": "towns", "groups": [
   G("Kadıköy and its three faces", C("q-kadikoy", q("Kadıköy"), note="the place and Chalcedon; the market streets have their own card in the larder"), C("q-moda", q("Moda")), C("q-yeldegirmeni", q("Yeldeğirmeni"))),
   G("The older Asian shore", C("q-uskudar", q("Üsküdar")), C("q-kuzguncuk", q("Kuzguncuk"), note="the place and its three houses of prayer; the street walk is in Walks: one clause")),
   G("Pera and the hill above it", C("q-pera", q("Beyoğlu / Pera")), C("q-cihangir", q("Cihangir")), C("q-nisantasi", q("Nişantaşı"))),
   G("The Golden Horn", C("q-karakoy", q("Karaköy and Galata")), C("q-balat-fener", q("Balat"), q("Fener"), note="one card for the two neighbouring quarters; the walks hold the routes")),
   G("Up the strait — the Bosphorus villages", C("q-arnavutkoy", q("Arnavutköy")), C("q-bebek", q("Bebek")), C("q-tarabya", q("Tarabya")))]},
 "walks": {"chapter": "flaner", "sub": "walks", "groups": [
   G("The vapur — the city's spine", C("w-kadikoy-ferry", "walks|Eminönü to Kadıköy", "coffee-gardens|The vapur — Şehir Hatları ferry", note="one home for the ferry as the best room in the city"),
     C("w-uskudar-ferry", "walks|Karaköy or Eminönü to Üsküdar"), C("w-golden-horn-line", "walks|The Golden Horn line — Üsküdar to Eyüpsultan")),
   G("The Bosphorus shore on foot", C("w-arnavutkoy-bebek", "walks|Arnavutköy to Bebek"), C("w-kuzguncuk", "walks|Kuzguncuk's one street"), C("w-moda", "walks|Moda and the Kadıköy sea walk")),
   G("The Golden Horn, pier by pier", C("w-fener", "walks|Fener — the Patriarchate and the Red Castle", "walks|The iron church of St Stephen", note="the iron church is on the Fener shore: one walk"),
     C("w-balat", "walks|Balat — Ahrida and the Jewish quarter"), C("w-eyup", "walks|Eyüpsultan and the hill above it", note="Pierre Loti's tea garden has its own card in the rooms to linger: one clause"))]},
 "culture": {"chapter": "flaner", "sub": "culture", "groups": [
   G("Byzantine — the domes and the cistern", C("c-hagia-sophia", "culture|Hagia Sophia", "culture|Halfdan's runes", note="the runes are in the upper gallery: one home"),
     C("c-chora", "culture|Chora — Kariye Mosque"), C("c-cistern", "culture|Basilica Cistern")),
   G("Ottoman — the mosque and the palace", C("c-suleymaniye", "culture|Süleymaniye Mosque"), C("c-topkapi", "culture|Topkapı Palace", "provisioning|Matbah-ı Âmire — the imperial kitchens", note="the imperial kitchens are inside Topkapı: one home")),
   G("The collections", C("c-archaeology", "culture|Istanbul Archaeological Museums"), C("c-modern", "culture|Istanbul Modern", "coffee-gardens|Istanbul Modern"), C("c-pera-museum", "culture|Pera Museum")),
   G("Beyoğlu's inheritance", C("c-cicek", "culture|Çiçek Pasajı", "bars|Çiçek Pasajı", note="the building and what it tells; 'read, don't eat' is the advice. The 1942–64 story is told in the food-history fold: one clause"),
     C("c-zeki-muren", "culture|Zeki Müren"), C("c-black-russian", "culture|The Black Russian")),
   G("Curiosities that survive checking", C("c-yenikapi", "culture|Yenikapı — the dig that held up the railway"), C("c-tunel", "culture|Tünel"))]},
 "landmarks": {"chapter": "flaner", "sub": "sights", "groups": [
   G("The squares — meydan", C("l-hippodrome", "landmarks|Sultanahmet Meydanı — the Hippodrome", "culture|The Obelisk of Theodosius", note="one home for the obelisk"),
     C("l-beyazit", "landmarks|Beyazıt Meydanı"), C("l-ortakoy", "landmarks|Ortaköy Meydanı")),
   G("The gardens & groves", C("l-gulhane", "landmarks|Gülhane Parkı"), C("l-emirgan", "landmarks|Emirgan Korusu"), C("l-fethi-pasa", "landmarks|Fethi Paşa Korusu")),
   G("The little beauties", C("l-valide-han", "landmarks|Büyük Valide Han"), C("l-rustem-pasa", "landmarks|Rüstem Paşa Camii"), C("l-kucuk-ayasofya", "landmarks|Küçük Ayasofya Camii"))]},
 "hammam": {"chapter": "flaner", "sub": "hammam", "groups": [
   G("Read this before you undress", C("h-sequence", "hammam|The sequence, start to finish", "hammam|What you wear, and the nudity rule", "rituals|The hamam, and the clock on the door", note="the sequence and what you wear; the rituals card's sequence content folds in here (told once)"),
     C("h-gender", "hammam|Gendered hours — the way this trip actually fails", note="the core honesty card: keep every house's system in the facts"),
     C("h-money", "hammam|The money, the extras and the hard sell", "hammam|Who should not go in")),
   G("The imperial houses — the architecture you are paying for", C("h-kilic-ali", "hammam|Kılıç Ali Paşa Hamamı"), C("h-zeyrek", "hammam|Zeyrek Çinili Hamam"), C("h-cagaloglu", "hammam|Cağaloğlu Hamamı")),
   G("Plainer domes, stranger rules, and one that is still just a bath", C("h-suleymaniye", "hammam|Süleymaniye Hamamı", note="the mixed bath: say 'mixed, for any party of men and women together' — never 'couples'"),
     C("h-aga", "hammam|Ağa Hamamı"), C("h-uskudar", "hammam|Tarihi Üsküdar Çinili Hamamı"))]},
 "rituals": {"chapter": "flaner", "sub": "rituals", "groups": [
   G("The chair and the razor", C("r-tiras", "rituals|Tıraş — the full berber", "rituals|Rimedzo Barber Shop", note="the trade, the tariff, and Rimedzo as the named walk-in"), C("r-2a-berber", "rituals|2.a Berber Barbershop")),
   G("The turn — sema, and which one is prayer", C("r-sema", "rituals|Sema — ceremony or show"), C("r-emav", "rituals|Silivrikapı Mevlana Kültür Merkezi (EMAV)"), C("r-galata-mevlevi", "rituals|Galata Mevlevihanesi")),
   G("The long sit", C("r-cay", "rituals|Çay bahçesi — the price of a chair", "coffee-gardens|Çay, and the tulip glass", note="the contract of the chair and the 1924 tea law; the gardens themselves are in the rooms to linger"),
     C("r-nargile", "rituals|Nargile — the Tophane strip", "coffee-gardens|Çorlulu Ali Paşa Medresesi", note="Tophane and the medrese courtyard"),
     C("r-kahve", "rituals|Türk kahvesi — Fazıl Bey, and the cup turned over", "coffee-gardens|Türk kahvesi", "rituals|Katina Fal Cafe", note="the cup, UNESCO 2013, 1554, and the fal reading at Katina")),
   G("The long table", C("r-serpme", "rituals|Serpme kahvaltı — the Sunday", note="the ritual; the three breakfast houses are table cards: name them, do not retell"), C("r-raki-balik", "rituals|Rakı-balık — choosing the fish off the ice", note="choosing the fish by the kilo; the pacing of the sofra is in the bars fold"))]},
 "craft": {"chapter": "flaner", "sub": "craft", "groups": [
   G("Do this one", C("x-ebristan", "art|Ebristan — Hikmet Barutçugil", "art|Ebru — marbling", note="the craft (UNESCO 2014) and the master; verify how to enrol: if no open enrolment can be confirmed, say 'by arrangement' honestly")),
   G("The others, and what each is missing", C("x-caferaga", "art|Caferağa Medresesi", note="courses in Sinan's medrese: what is missing (e.g. no master named publicly)"),
     C("x-cini", "art|Çini — the İznik blue", note="the craft; where to see and what is missing for a visitor who wants to learn"),
     C("x-hat", "art|Hüsn-i hat — calligraphy", "art|Sakıp Sabancı Museum — the book arts", note="the craft, and the Sabancı collection as where to see it")),
   G("The honest warning", C("x-carpets", "art|Carpets and \"antiques\" — the honest note"))]},
 "art": {"chapter": "flaner", "sub": "craft", "groups": [
   G("The Bazaar, told straight", C("a-grand-bazaar", "art|Kapalıçarşı — the Grand Bazaar", "art|Kalpakçılar Caddesi — the gold", note="the bazaar and its gold street in one card"),
     C("a-zincirli", "art|Zincirli Han"), C("a-sahaflar", "art|Sahaflar Çarşısı")),
   G("The music street — instruments and vinyl", C("a-galip-dede", "art|Galip Dede Caddesi — the music street", "art|Saz, bağlama, kanun, ud — what the names admit"),
     C("a-manol", "art|Manol, and who actually built the oud"), C("a-lale-plak", "art|Lale Plak"))]},
 "coffee-gardens": {"chapter": "flaner", "sub": "linger", "groups": [
   G("Çay bahçesi — the tea gardens", C("g-cinaralti", "coffee-gardens|Çınaraltı, Çengelköy"), C("g-pierre-loti", "coffee-gardens|Pierre Loti Kahvesi", "coffee-gardens|Pierre Loti Hill"), C("g-moda-aile", "coffee-gardens|Moda Aile Çay Bahçesi")),
   G("The old pastry houses", C("g-inci", "coffee-gardens|İnci Pastanesi"), C("g-markiz", "coffee-gardens|Markiz (ex-Lebon)")),
   G("Coffee, and a working day", C("g-kronotrop", "coffee-gardens|Kronotrop, Cihangir"), C("g-montag", "coffee-gardens|Montag Coffee Roasters"), C("g-petra", "coffee-gardens|Petra Roasting Co., Bebek")),
   G("The free desks", C("g-ataturk", "coffee-gardens|Atatürk Kitaplığı"), C("g-salt", "coffee-gardens|SALT Research, SALT Galata", "culture|SALT Galata", "follow|Salt Research", note="one home for SALT: the bank, the free building, the library and the open archive")),
   G("Beautiful. Close the laptop.", C("g-yildiz", "coffee-gardens|Çadır Köşkü, Yıldız Park", note="the honest work-truth line"))]},
 "bars": {"chapter": "sortir", "sub": "bars", "merges": [
   {"title": "The rakı table & the Turkish glass", "desc": "", "groups": [
     G("The rakı table", C("b-agora", "bars|Agora Meyhanesi 1890", ref="agora-meyhanesi", note="pointer: the meyhane night at Agora — the drink, the hour"),
       C("b-sofra", "bars|The rakı sofrası", "provisioning|The meyhane table", note="the pacing of the meyhane table, told once"),
       C("b-stambouli", "bars|Lokanta Stambouli", note="opened Aug 2026 per old card; status per venue re-check")),
     G("The wine rooms", C("b-wayana", "bars|WAYANA Wine Bar & Tapas"), C("b-solera", "listening|Solera Winery"), C("b-sensus", "listening|Sensus Wine Boutique")),
     G("Ask for the native grape", C("b-okuzgozu", "bars|Öküzgözü & Boğazkere"), C("b-light-reds", "bars|Kalecik Karası", "bars|Papazkarası & Çalkarası", note="the light reds and rosés in one card"), C("b-whites", "bars|Narince & Emir"))]},
   {"title": "The roofs & the palace bars", "desc": "", "groups": [
     G("Up on the roof", C("b-mikla-bar", "rooftops|Mikla Bar", ref="mikla", note="pointer: the bar terrace without the tasting menu"), C("b-mezzepotamia", "rooftops|Roof Mezzepotamia"),
       C("b-before-roof", "rooftops|What a drink costs up there", "rooftops|The hour", "rooftops|The season", note="no place: the price, the hour (never a perishable sunset time), the season")),
     G("The palace bars", C("b-pera-palace", "listening|Orient Bar, Pera Palace", "listening|Kubbeli Lounge, Pera Palace", "coffee-gardens|Kubbeli Saloon, Pera Palace", note="one home for the Pera Palace: the bar and the domed saloon's tea"),
       C("b-ciragan", "listening|Le Fumoir and C Lounge, Çırağan Palace Kempinski")) ]},
   {"title": "After midnight", "desc": "", "groups": [
     G("The clubs", C("b-flux", "bars|FLUX"), C("b-sahika", "bars|Şahika"), C("b-suma-han", "bars|Suma Han"))]}]},
 "listening": {"chapter": "sortir", "sub": "listening", "groups": [
   G("The listening bars", C("n-arkaoda", "bars|Arkaoda"), C("n-karga", "bars|Karga", note="status: closing_soon in Aug — say what the re-check found"), C("n-dama", "bars|Dama", "coffee-gardens|Dama", note="one home for Dama: coffee by day, hi-fi at night")),
   G("Records", C("n-kontra", "listening|Kontra Plak"), C("n-analog", "listening|Analog Kültür"), C("n-akmar", "listening|Akmar Pasajı")),
   G("Live rooms and fasıl", C("n-nardis", "listening|Nardis Jazz Club"), C("n-cumhuriyet", "listening|Tarihi Cumhuriyet Meyhanesi"), C("n-babylon", "listening|Babylon"))]},
 "around": {"chapter": "around", "sub": "trips", "groups": [
   G("The Princes' Islands", C("o-buyukada", "around|Büyükada", "walks|Büyükada by ferry"),
     C("o-st-george", "walks|The Monastery of St George", "walks|The Prinkipo Orphanage", "culture|Prinkipo Greek Orthodox Orphanage", note="the climb and the orphanage on the way: one home for the orphanage"),
     C("o-heybeliada", "around|Heybeliada", "walks|Heybeliada and the closed seminary")),
   G("Up the Bosphorus", C("o-anadolu-kavagi", "around|Anadolu Kavağı & Yoros Kalesi", "walks|The long ferry to Anadolu Kavağı"),
     C("o-rumeli-kavagi", "around|Rumeli Kavağı", note="Balıkçı Kahraman is a table card: name it, do not retell"), C("o-hidiv", "around|Hıdiv Kasrı")),
   G("Forest and the Black Sea", C("o-belgrad", "around|Belgrad Ormanı", "walks|Belgrad Forest"), C("o-polonezkoy", "around|Polonezköy"), C("o-sile", "around|Şile & Ağva"))]},
 "provisioning": {"chapter": "tables", "sub": "markets", "groups": [
   G("The markets", C("p-kadikoy", "provisioning|Tarihi Kadıköy Çarşısı — Güneşlibahçe Sokağı", "provisioning|Kadıköy market streets", "provisioning|Salı Pazarı and the weekly pazar circuit", note="one home for the Kadıköy market and the Tuesday pazar"),
     C("p-spice", "provisioning|Mısır Çarşısı — the Spice Bazaar, and what it is now", "provisioning|Mısır Çarşısı — the Spice Bazaar", "provisioning|Hasırcılar Caddesi — the working street", note="the bazaar and the working street behind it"),
     C("p-kadinlar", "provisioning|Kadınlar Pazarı")),
   G("The fish, and the Saturday market", C("p-besiktas-fish", "provisioning|Beşiktaş Balık Çarşısı"), C("p-resat", "provisioning|Reşat Balık"), C("p-ferikoy", "provisioning|Feriköy %100 Ekolojik Pazar")),
   G("The counters", C("p-kurukahveci", "provisioning|Kurukahveci Mehmet Efendi"), C("p-namli", "provisioning|Namlı Gurme", "provisioning|Pastırma and sucuk", note="the deli and what pastırma is"))]},
 "follow": {"chapter": "practical", "sub": "follow", "groups": [
   G("The Turkish-language food press", C("v-yemek", "follow|Yemek ve Kültür"), C("v-milor", "follow|Vedat Milor"), C("v-oney", "follow|Aylin Öney Tan")),
   G("Written in English, reported on the ground", C("v-cb", "follow|Culinary Backstreets"), C("v-cornucopia", "follow|Cornucopia"), C("v-recap", "follow|Turkey recap")),
   G("The history, and what is on the week you land", C("v-ohp", "follow|Ottoman History Podcast"), C("v-iksv", "follow|İKSV — Istanbul Foundation for Culture and Arts"), C("v-timeout", "follow|Time Out Istanbul"))]},
}
# Sur le pouce: the late plate first (pointers to the late lanes), then the sugar counters, told once
plan["street-food"] = {"chapter": "fast", "sub": "late", "groups": [
   G("After the bar shuts", C("f-lale", ref="lale-iskembecisi", note="pointer, late angle: işkembe against the rakı; the hour it shuts"),
     C("f-kizilkayalar", ref="kizilkayalar-taksim", note="pointer, late angle: the 03:00 wet burger"),
     C("f-gulluoglu", "street-food|Karaköy Güllüoğlu", "street-food|Faruk Güllü", "provisioning|Baklava", note="baklava past midnight; the Güllüoğlu split and the PGI told once here")),
   G("Lokum, muhallebi, boza", C("f-haci-bekir", "street-food|Ali Muhiddin Hacı Bekir", "provisioning|Lokum"), C("f-saray", "street-food|Saray Muhallebicisi"), C("f-vefa", "street-food|Vefa Bozacısı")),
   G("Hot and cold", C("f-kunefe", "street-food|Hatay Medeniyetler Sofrası"), C("f-mado", "street-food|Mado"), C("f-baylan", "street-food|Baylan Pastanesi"))]}

used = {f for k, v in plan.items() if not k.startswith("_") for g in (v["groups"] if "groups" in v else [g for m in v["merges"] for g in m["groups"]]) for c in g["cards"] for f in c["from"]}
dropped = sorted(k for k in OLD if k not in used)
WHY = {
 "rooftops|The Bank Roof Bar": "the roofs keep three: the starred bar, the one every guide puts on the wrong shore, and the honest card on price and season",
 "rooftops|Roof106": "roofs capped at three", "rooftops|Sky Karaköy": "roofs capped at three; seasonal", "rooftops|Manifest Roof": "roofs capped at three", "rooftops|Hood": "roofs capped at three",
 "bars|Bağ Pera": "venue cut (unverified)", "bars|Lips Wine Bar": "wine rooms capped at three", "listening|Viktor Levi Şarap Evi": "wine rooms capped at three",
 "bars|Nayah": "listening bars capped at three", "bars|June": "venue cut (unverified)", "bars|Frankhan": "clubs capped at three", "bars|NOH Radio Bar / NOH Extended": "clubs capped at three",
 "bars|POPSTEL — Stay Local": "a party series, not a place",
 "quartiers|Fener": "merged into Balat & Fener",
 "walks|Büyükada by ferry": "told once: the islands live in Autour", "walks|The Monastery of St George": "told once: Autour", "walks|The Prinkipo Orphanage": "told once: Autour",
 "walks|Heybeliada and the closed seminary": "told once: Autour", "walks|The long ferry to Anadolu Kavağı": "told once: Autour", "walks|Belgrad Forest": "told once: Autour",
 "culture|Prinkipo Greek Orthodox Orphanage": "told once: Autour",
 "coffee-gardens|Kahvaltı — the word": "told once: the etymology is in La liste",
 "coffee-gardens|Neroli Daylight Kitchen": "a daylight kitchen; the breakfast lane carries the first meal", "coffee-gardens|Mornings in Pera": "the breakfast lane carries the first meal",
 "coffee-gardens|Federal Galata": "venue cut (unverified)",
 "art|Kalpakçılar Caddesi — the gold": "merged into the Grand Bazaar card",
 "around|Yalova Termal": "Autour capped at three per group; a ferry day out of the city's orbit", "around|Bandırma": "a transport route, not a day trip",
 "provisioning|The ocakbaşı": "told once: the fire-counter lane story", "provisioning|Simit": "told once: La liste and The Dish",
 "provisioning|Balık ekmek": "told once: The Dish and the traps", "provisioning|Midye dolma": "told once: The Dish and the midye table card", "provisioning|Kokoreç": "told once: The Dish and the kokoreç table card",
 "street-food|Hafız Mustafa 1864": "sugar counters capped at three per group; a chain now", "street-food|Şekerci Cafer Erol": "capped at three per group",
 "street-food|Meşhur Dondurmacı Ali Usta": "unverified as trading",
 "listening|The Listening Room at Arkestra": "the restaurant is cut from the tables", "listening|Kadıköy Plak Kulübü": "records capped at three", "listening|Fiba Salon İKSV": "live rooms capped at three",
 "listening|KOLI Art Space": "a thin card, no verifiable programme", "listening|NOKS (formerly TOZ)": "a thin card", "listening|BAS · AVTO": "a thin card", "listening|Nublu Istanbul / Nublu Records": "a thin card",
 "listening|Ritim Istanbul": "a series, not a place", "listening|Sazzou": "a thin card",
 "hammam|Ayasofya Hürrem Sultan Hamamı": "imperial houses capped at three; the priciest door", "hammam|Çemberlitaş Hamamı": "imperial houses capped at three",
 "hammam|Tarihi Galatasaray Hamamı": "publishes no prices; capped at three",
 "rituals|Tavla — and whether you can get a game": "the long sit capped at three",
 "landmarks|Büyük Çamlıca": "gardens capped at three", "landmarks|Şakirin Camii": "little beauties capped at three",
 "follow|Oggusto and Gazete Oksijen": "follow capped at three per group", "follow|Argonotlar": "capped", "follow|Bant Mag.": "capped",
}
for d in dropped: assert d in WHY, d
picks["cards_cut"] = {"_": "old cards not carried (merges are listed per card in card_plan.json 'from')", "dropped": WHY}
json.dump(picks, open(RV / "picks.json", "w"), ensure_ascii=False, indent=1)
json.dump(plan, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
def groups(v): return v["groups"] if "groups" in v else [g for m in v["merges"] for g in m["groups"]]
n = sum(len(g["cards"]) for k, v in plan.items() if not k.startswith("_") for g in groups(v))
print("cards planned:", n, "old cards:", len(OLD), "dropped:", len(dropped), "lane venues:", sum(len(l["ids"]) for l in picks["lanes"].values()))
