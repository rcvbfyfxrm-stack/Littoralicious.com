/* Terroir — Istanbul · Boğaziçi — data v2.
   v1 shipped TABLES as {groups:[...]}, which the organised-tables renderer cannot read
   (it looks up TABLES.grande / TABLES.petite), so the inventory silently fell back to flat
   tier lists. v2 emits the correct shape AND the rich venue fields (dishes, signal_chip,
   person, signature, verdict, caveat, hours) that the card expansion is gated on.
   PIN POLICY unchanged: only street-level geocodes carry lat/lng. */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#2d4a5e", "market": "#d97706", "shop": "#059669", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar", "mainland": "Out of town", "logistics": "Logistics"};
  const PRODUCT_COLORS = {"Michelin": "#7f1d1d", "Meyhane": "#1f2937", "Ocakbaşı": "#dc2626", "Wine": "#7c2d12", "Coffee": "#92400e", "Jazz": "#0ea5e9", "Listening": "#3b82f6", "Collective": "#7c3aed", "Rooftop": "#a16207", "Opening": "#059669", "Since-19xx": "#a16207"};
  const VENUES = [
 {
  "id": "turk-fatih-tutak",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "name": "TURK Fatih Tütak",
  "short": "TURK Fatih Tütak",
  "neighborhood": "Bomonti, Şişli",
  "maps": "https://www.google.com/maps/search/?api=1&query=TURK+Fatih+T%C3%BCtak+Istanbul",
  "signal_chip": {
   "label": "2★ MICHELIN",
   "full": "★★ MICHELIN · Green Star (2026 edition)"
  },
  "verdict": "The city's only two-star, and the most formally ambitious argument for Anatolian cooking as haute cuisine anywhere",
  "caveat": "★★ in the MICHELIN Guide Türkiye 2026",
  "hours": "Dinner",
  "productTags": [
   "Anatolian",
   "Fine dining"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "creme",
  "subcat": "Anatolian tasting menu",
  "hook": "Istanbul's only two-star: 30 seats a night, twelve courses, no à la carte.",
  "cosign": "MICHELIN Guide Türkiye 2026 (two Stars + Green Star); Gault&Millau Türkiye 18.5/20",
  "person": "Fatih Tutak, born in Istanbul on 31 August 1985. First trained at the Mengen cookery school in Bolu and apprenticed under Paul Pairet, then cooked through Qingdao, Beijing and Hong Kong, at Marina Bay Sands in Singapore, at three-star Nihonryori RyuGin in Tokyo under Seiji Yamamoto, and at Noma in Copenhagen under René Redzepi. He ran The Dining Room at The House on Sathorn in Bangkok from 2015 before opening TURK in Istanbul in 2019.",
  "signature": "The twelve-step Chef's Signature Tasting Menu, changed on micro-season rather than on a calendar, with unlisted extras between courses. The MICHELIN inspector's note singles out a plate built from five coastal towns — Ayvalık gilt-head bream under a soy reduction, Black Sea mackerel rolled as sesame maki, İzmir squid with yuzu, Bodrum prawn, tuna with caviar. Hors d'oeuvres are served in the lounge before you move to the dining room; book the chef's table if you want to watch the pass.",
  "address": "Cumhuriyet Hacıahmet Mah., Silahşör Cad., Yeniyol Sok. No:2, 34440 Şişli, İstanbul",
  "phone": "+90 530 051 83 04",
  "price_range": "₺₺₺₺ — twelve-course tasting only; the house publishes no price, and MICHELIN bands it at its top tier",
  "reservation": "Direct only — the restaurant manages its own bookings, by email (reservations@turkft.com) or phone. Tables capped at five people. No à la carte, no ingredient removals, and the kitchen states flatly it cannot do vegan, vegetarian or gluten-free menus.",
  "best_time": "Dinner — there is only one seating",
  "best_night": "Wednesday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Twelve-course micro-seasonal tasting menu",
    "note": "the only format; roughly three hours"
   },
   {
    "name": "The five coastal towns plate",
    "note": "bream, mackerel, squid, prawn, tuna — named in the MICHELIN inspector's note"
   },
   {
    "name": "Chef's table",
    "note": "a booking option, not a dish — you sit at the kitchen"
   }
  ],
  "guest": {
   "dress": "Stated on the house reservation page: 'Semi-formal. For men, we require attire with a collar and long trousers.' Shorts, sports attire, tracksuits, hoodies, caps and flip flops are not allowed.",
   "private_dining": "A Chef's Table option exists — the house describes it as letting you 'witness the culinary artistry of our kitchen team up close during your evening' — but no capacity, pricing or solo-diner rule is published. No separate private room is published. Menu is the 14-course Chef Signature Tasting Menu ('Slow Dining — please allow 200 minutes'), 19,900 TL per guest; guests aged 12 and up only; no vegan, vegetarian or gluten-free accommodation; corkage allowed up to two 75 cl bottles per party at 6,000 TL each. Note the homepage still says '12-course' — the reservation page's 14-course wording is the transactional one.",
   "view_terrace": "No view or terrace published — a Şişli dining room; the house presents its AVLU courtyard as 'the perfect prelude' — a place to unwind and socialise before the table, not a dining terrace.",
   "max_party": "'Minimum one person a maximum of 5 people per booking are allowed on a single table' per the house reservation page. No chef's-table capacity is published.",
   "booking_lead": "No published booking window (reservation pages read 2026-08-16; the booking engine itself renders no content, so live availability could not be observed). A 7,500 TL/head deposit within 24 h confirms the table; full refund only 72 h+ out — cancelling, no-showing or shrinking the party inside 72 h forfeits 7,500 TL per person.",
   "guest_line": "TURK Fatih Tütak (2-star, Şişli): 14-course tasting menu only (about 200 minutes), tables capped at 5 per booking, semi-formal dress with collar and long trousers for men, guests 12 and over, no vegan/vegetarian/gluten-free accommodation.",
   "checked": "2026-08-16"
  },
  "charter": {
   "price": "₺₺₺₺",
   "book": "Direct only · deposit ₺7,500/head · max 5 covers · weeks ahead",
   "dress": "Semi-formal — collar + long trousers (men)",
   "warn": "No vegan / vegetarian / GF · guests 12+",
   "fit": "The one to impress: Türkiye's only two-star — 14 courses, about 200 minutes."
  }
 },
 {
  "id": "mikla",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "name": "Mikla",
  "short": "Mikla",
  "neighborhood": "Beyoğlu — roof of the Marmara Pera",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mikla+Istanbul",
  "lat": 41.031087,
  "lng": 28.974017,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "person": "Mehmet Gürs",
  "verdict": "The view is famous; the ingredient philosophy is why it lasted",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026; top two floors of The Marmara Pera",
  "hours": "Dinner, for the light",
  "why": "Chef Mehmet Gürs. The house that invented the phrase New Anatolian Kitchen and spent fifteen years proving it meant something.",
  "productTags": [
   "New Anatolian",
   "Rooftop"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "creme",
  "subcat": "New Anatolian, rooftop",
  "hook": "Rooftop on the 18th floor of The Marmara Pera, open since October 2005.",
  "cosign": "MICHELIN Guide Türkiye 2026 (one Star); The World's 50 Best Discovery; Gault&Millau Türkiye 15.5/20",
  "signature": "Smoked lamb loin with charred endive and apple molasses is the plate the house is judged on; fried hamsi — anchovy — with a Cappadocian white is the other. Both are the dishes The World's 50 Best Discovery names.",
  "address": "The Marmara Pera, Meşrutiyet Caddesi No:15, 18th floor, Tepebaşı, 34430 Beyoğlu, İstanbul",
  "phone": "+90 212 293 56 56",
  "price_range": "₺₺₺₺ — Mikla Tasting (six courses) ₺10,500; vegan tasting (seven courses) ₺9,600; three-course prix fixe ₺8,500. Wine pairings with the tasting ₺5,500 or ₺8,000; a three-glass à la carte pairing ₺3,200. VAT included, service extra (house menu read August 2026).",
  "reservation": "Online; confirmation comes by email. Cancel at least eight hours ahead, and arrive on time — the house cancels the table thirty minutes after your slot.",
  "best_time": "Sit down by 19:30 for the light; the kitchen stops taking food orders at 21:30",
  "best_night": "Wednesday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Smoked lamb loin",
    "note": "charred endive, apple molasses"
   },
   {
    "name": "Fried hamsi",
    "note": "anchovy, paired with a crisp Cappadocian white"
   },
   {
    "name": "Mikla Tasting",
    "note": "six courses, ₺10,500"
   },
   {
    "name": "Vegan tasting",
    "note": "seven courses, ₺9,600"
   }
  ],
  "guest": {
   "dress": "Stated in the house booking flow: 'In accordance with our Smart Chic clothing policy, sportswear such as tracksuits and slippers are not accepted.'",
   "view_terrace": "At the top of The Marmara Pera: the restaurant plus a roof-terrace bar (open 18:00–02:00) 'in the midst of jasmine scents accompanied by the chilling breeze of Galata'; The World's 50 Best says 'come to Mikla for the best-in-Istanbul views'. No specific floor number is published by the house.",
   "max_party": "8 online; 'more than 8 people, please call +90 (212) 293 5656 or send an e-mail to reservations@miklarestaurant.com' per the booking flow.",
   "booking_lead": "No published booking window; the online diary takes a credit-card guarantee of 35 EUR per person ('no charges will be made unless there is a no-show'), cancellation at least 8 h ahead, and the table is cancelled 30 minutes after the slot if you have not arrived (booking flow and rules pages read 2026-08-16).",
   "guest_line": "Mikla (1-star, rooftop of The Marmara Pera, Mon–Sat dinner only from 18:00): New Anatolian cooking with the city's most famous rooftop view and a terrace bar until 02:00 — smart-chic dress, last food order 21:30, parties over 8 by phone or email.",
   "checked": "2026-08-16"
  },
  "charter": {
   "price": "₺₺₺₺",
   "book": "Online · card guarantee €35/head · parties over 8 by phone",
   "dress": "Smart chic — no sportswear",
   "view": "Rooftop of The Marmara Pera — the famous view · terrace bar to 02:00",
   "warn": "Last food order 21:30 · closed Sun",
   "fit": "The view table: twenty years of New Anatolian cooking above Pera."
  }
 },
 {
  "id": "neolokal",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "name": "Neolokal",
  "short": "Neolokal",
  "neighborhood": "Karaköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Neolokal+Istanbul",
  "lat": 41.023782,
  "lng": 28.973476,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "person": "Maksut Aşkar",
  "caveat": "Sources disagree on the exact entrance within the SALT Galata block — follow the venue's own directions on arrival rather than a map pin.",
  "hours": "Dinner",
  "why": "Chef Maksut Aşkar. Traditional Turkish dishes taken apart and rebuilt.",
  "productTags": [
   "Modern Turkish",
   "Sustainability"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "creme",
  "subcat": "Modern Anatolian",
  "hook": "Top floor of SALT Galata, in the old Ottoman Bank: forgotten recipes, rebuilt.",
  "cosign": "MICHELIN Guide Türkiye 2026 (Star + Green Star + Sommelier Award); The World's 50 Best Discovery; Gault&Millau Türkiye 17.5/20",
  "signature": "Three- and six-course tasting menus built from regional recipes that had fallen out of use. The MICHELIN inspector names haddock seared skin-side down with caramelised celeriac purée and an olive-oil-and-mussel-broth sauce, and a baklava of unusual crispness and pistachio depth. The wine list is run as a Turkish-first cellar by sommelier Ersin Topkara, who took the 2026 MICHELIN Sommelier Award for Türkiye.",
  "verdict": "Traditional Turkish dishes taken apart and rebuilt, with a sustainability argument the guide has endorsed twice over — the Star, and a Green Star it has carried since 2022. This is the least showy of the city's starred kitchens and the most explicitly preservationist: the point is the recipe that was disappearing, not the technique on top of it. Expect a full evening and a full bill, and take the wine pairing seriously — it is the part the guide singled out.",
  "address": "SALT Galata, Arap Camii Mah., Bankalar Caddesi No:11, Karaköy, 34420 Beyoğlu, İstanbul",
  "phone": "+90 212 244 00 16",
  "price_range": "₺₺₺₺ — three- and six-course tasting menus. The house publishes no price; The World's 50 Best Discovery puts the average at about $143 a head, and MICHELIN bands it at its top tier.",
  "reservation": "Online through the house site, or by phone — landline +90 212 244 00 16, mobile +90 551 447 45 45. Vegetarian versions of the menus on request. Valet parking.",
  "best_time": "Dinner, early enough to get the light on the Golden Horn",
  "best_night": "Wednesday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Three- or six-course tasting menu",
    "note": "the two formats; vegetarian versions on request"
   },
   {
    "name": "Seared haddock",
    "note": "caramelised celeriac purée, olive oil and mussel broth"
   },
   {
    "name": "The house baklava",
    "note": "singled out by the MICHELIN inspector"
   },
   {
    "name": "The Turkish wine pairing",
    "note": "MICHELIN Sommelier Award 2026, Ersin Topkara"
   }
  ],
  "guest": {
   "view_terrace": "Inside SALT Galata (the old Ottoman Bank building) on Bankalar Avenue, Karaköy, with 'jaw-dropping views of the Golden Horn through its floor-to-ceiling windows' per The World's 50 Best Discovery; no terrace — and no floor — is published by the house.",
   "booking_lead": "No published booking window and no online diary found on the house site — reservations by the two listed lines (+90 212 244 00 16 / +90 551 447 45 45) or info@neolokal.com; valet service is stated on the house site (read 2026-08-16). Opening days/hours are not published — confirm when booking.",
   "guest_line": "Neolokal (1-star plus Green Star, in the SALT Galata building, Karaköy): Maksut Aşkar's modern Anatolian kitchen behind floor-to-ceiling windows over the Golden Horn — reserve by phone or email, valet at the door.",
   "checked": "2026-08-16"
  },
  "charter": {
   "price": "₺₺₺₺",
   "book": "Online or phone · valet at the door",
   "view": "Floor-to-ceiling over the Golden Horn — SALT Galata",
   "warn": "Hours unpublished — confirm when booking",
   "fit": "Maksut Aşkar's modern Anatolian kitchen in the old Ottoman Bank — 1★ + Green Star."
  }
 },
 {
  "id": "nicole",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 4,
  "name": "Nicole",
  "short": "Nicole",
  "neighborhood": "Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=Nicole+Istanbul",
  "lat": 41.03023,
  "lng": 28.977828,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN since 2022 · MICHELIN Service Award 2025"
  },
  "person": "Serkan Aksoy",
  "verdict": "The room for when you want the whole performance right, not only the plates",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
  "hours": "Dinner",
  "why": "Chef Serkan Aksoy.",
  "productTags": [
   "Fine dining"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "creme",
  "subcat": "Contemporary Anatolian",
  "hook": "A terrace over Tomtom, the Historic Peninsula in front, two tasting menus.",
  "cosign": "MICHELIN Guide Türkiye 2026 (one Star since 2022); MICHELIN Service Award 2025; Gault&Millau Türkiye 15/20",
  "signature": "Which menu you eat is decided by when you sit down: Menu No.1 (₺8,100) runs until 20:30, Menu No.2 (₺7,500) from 21:00 — and the whole table has to be on the same one. The dish most often named is \"Kedi Batmaz\", a cornmeal staple from Bolu rebuilt as a fine-dining course with caramelised onion, keş cheese and seasonal mushrooms.",
  "address": "Tomtom Suites, Firuzağa Mah., Boğazkesen Cad. No:18 / Tomtom Kaptan Sok., 34425 Beyoğlu, İstanbul",
  "phone": "+90 212 292 44 67",
  "price_range": "₺₺₺₺ — Menu No.1 ₺8,100 per head (wine pairing ₺4,700, beer ₺3,100); Menu No.2 ₺7,500 (wine ₺3,900, beer ₺2,250). VAT included; house menu last updated 28 July 2026.",
  "reservation": "Online booking. Vegetarian menus on request, but note the two house rules: everyone at the table takes a menu of the same length, and dishes are not altered — several contain onion, garlic and pepper.",
  "best_time": "Sit down before 20:30 if you want the longer Menu No.1",
  "best_night": "Wednesday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Tasting Menu No.1",
    "note": "₺8,100; served until 20:30"
   },
   {
    "name": "Tasting Menu No.2",
    "note": "₺7,500; from 21:00"
   },
   {
    "name": "Kedi Batmaz",
    "note": "Bolu cornmeal dish, caramelised onion, keş cheese, mushrooms"
   },
   {
    "name": "Catch of the day",
    "note": "şevket-i bostan, sea herbs, crayfish beurre monté"
   }
  ],
  "guest": {
   "view_terrace": "Top floor of Tomtom Suites; the house describes 'a chic terrace with a magnificent view of the Old Town, Princes' Islands and beyond', and the hotel site calls it a 'magnificent Historical Peninsula view'.",
   "booking_lead": "No published booking window; book via the CheckandPlace link on the house site or +90 (212) 292 44 67 (site read 2026-08-16). The longer Tasting Menu No.1 (8,100 TL) is served only until 20:30 — after 21:00 only Menu No.2 (7,500 TL) — and all guests at the table must take menus of the same length.",
   "guest_line": "Nicole (1-star, top-floor terrace of Tomtom Suites, Beyoğlu): two tasting menus with the whole table on the same length — sit before 20:30 for the longer Menu No.1 — on a terrace facing the Old Town and Princes' Islands.",
   "checked": "2026-08-16"
  },
  "charter": {
   "price": "₺₺₺₺ — Menu No.1 ₺8,100 · No.2 ₺7,500",
   "book": "Online (CheckandPlace) or phone",
   "view": "Top-floor terrace — Old Town and Princes’ Islands in front",
   "warn": "Longer menu only before 20:30 · whole table takes the same menu length",
   "fit": "The terrace dinner: two tasting menus over the rooftops of Tomtom."
  }
 },
 {
  "id": "araka",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "name": "Araka",
  "short": "Araka",
  "neighborhood": "Yeniköy, up the Bosphorus",
  "maps": "https://www.google.com/maps/search/?api=1&query=Araka+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "verdict": "Worth the drive north",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026 A limited run, not a permanent fixture — check the end date before you plan around it.",
  "hours": "Lunch — make the journey part of it",
  "productTags": [
   "Fine dining",
   "Bosphorus"
  ],
  "badge": "Michelin",
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "status": "time_limited",
  "statusChecked": "2026-08-15",
  "category": "creme",
  "subcat": "Vegetable-led fine dining",
  "hook": "Named for the pea: a Bosphorus star at Yeniköy where vegetables lead.",
  "cosign": "MICHELIN Guide Türkiye 2026 (one Star since 2022); Gault&Millau Türkiye 15/20",
  "person": "Zeynep Pınar Taşdemir — chef-owner; opened Araka in 2018 after working through several of Turkey's better kitchens. Her stated method is simplicity and minimal intervention, with vegetables and herbs in the leading role.",
  "signature": "A seasonal menu led by vegetables and herbs — araka is Turkish for pea, and the name is the statement of intent. The animal protein is written around the garden rather than the other way round.",
  "address": "Kapalı Bakkal Sokak No:8, Yeniköy, Sarıyer, 34464 İstanbul",
  "phone": "+90 533 392 72 23",
  "price_range": "₺₺₺ — tasting-led; the house publishes no price, and MICHELIN bands it as a special-occasion spend rather than its top tier",
  "reservation": "Online through the house booking system, or by phone. There is a garden terrace at the back as well as the interior.",
  "best_time": "Lunch — make the drive up the European shore part of the day",
  "best_night": "Wednesday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Seasonal vegetable-led menu",
    "note": "changes with what is picked"
   }
  ],
  "guest": {
   "private_dining": "No private room published; the house runs an Events & Catering arm — 'from intimate gatherings to grand celebrations, our event and catering services are tailored to create memorable experiences' — with enquiries and large-party bookings by the email and phone (+90 533 392 7223) listed on the site; no capacities stated.",
   "view_terrace": "The house site lists a Garden as its own space alongside the Yeniköy dining room, but publishes no description of it and claims no water view.",
   "booking_lead": "No published booking window; the online diary (CheckandPlace) would not render when checked 2026-08-16, so book via the site or phone. Open Tuesday–Sunday 13:00–24:00, closed Monday. The house states an a la carte menu alongside the tasting menu, with vegan, vegetarian, gluten-free, dairy-free and pescatarian options available each service.",
   "guest_line": "Araka (1-star, Yeniköy, Tue–Sun 13:00–24:00, closed Monday): a la carte and tasting menu with vegan, vegetarian, gluten-free, dairy-free and pescatarian options each service, plus a garden space — large or private parties by email.",
   "checked": "2026-08-16"
  }
 },
 {
  "id": "arkestra",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "name": "Arkestra",
  "short": "Arkestra",
  "neighborhood": "Etiler, Beşiktaş",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arkestra+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
  "badge": "Michelin",
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "creme",
  "subcat": "Modern European + vinyl",
  "hook": "A 1960s Etiler villa split three ways: dining room, bistro, hi-fi listening bar.",
  "cosign": "MICHELIN Guide Türkiye 2026 (one Star since 2024); Gault&Millau Türkiye 15.5/20, three toques",
  "person": "Cenk Debensason — Istanbul-born, trained at the Institut Paul Bocuse and matured in kitchens in the United States before coming home — with Debora İpekel, his partner in life and business.",
  "signature": "Tuna sashimi with sushi-rice ice cream, and seared sea bass under a Thai-leaning sauce, are the two plates most often named. The wine list runs niche Turkish varietals against old-world bottles. Finish upstairs in the Listening Room.",
  "verdict": "The new guard's most confident room: French technique with global reach, a star awarded in the 2024 guide and held through 2026, and a building that lets you eat, drink and listen without leaving. It is a young kitchen still arguing its case rather than a settled institution — Gault&Millau Türkiye reads it noticeably lower than MICHELIN does. Etiler puts it a taxi ride from anywhere on the historic side, which is the real cost.",
  "address": "Etiler, Dilhayat Sokak No:28, Beşiktaş, 34337 İstanbul",
  "phone": "+90 212 970 72 73",
  "hours": "Tuesday–Saturday 18:00–01:00. Closed Sunday and Monday.",
  "price_range": "₺₺₺₺ — à la carte and a chef's-table menu; prices sit inside downloadable PDFs rather than on the page",
  "reservation": "Online at guest.rezervem.com.tr/Arkestra — live and linked from the house site — or by phone",
  "best_time": "Dinner, then upstairs to the Listening Room for the last hour",
  "best_night": "Wednesday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Tuna sashimi",
    "note": "with sushi rice ice cream"
   },
   {
    "name": "Sea bass",
    "note": "seared, Thai-inspired sauce"
   },
   {
    "name": "The Listening Room",
    "note": "hi-fi bar upstairs, curated vinyl — a room, not a dish"
   },
   {
    "name": "Ritmo",
    "note": "the 32-cover bistro behind the velvet curtain, small plates and cocktails"
   }
  ],
  "guest": {
   "private_dining": "The house states 'Arkestra caters different spaces for a variety of special events and private dining', with private-hire enquiries by the email on its private-events page; Ritmo — its 32-cover dining room 'tucked away behind velvet curtains', 'accessible through a private entrance' — is the obvious candidate, though the site does not assign capacities to event hire. A Chef's Table menu is also published on the menus page (no capacity stated).",
   "view_terrace": "No view — a former residential villa built in the 1960s in Etiler; 'the Restaurant opens up to a secluded courtyard, for those times when the weather calls for al fresco dining', and the upstairs Listening Room is 'currently welcoming restaurant guests only'.",
   "max_party": "The online booking form takes 2–7 guests (form observed 2026-08-16); no larger-party route is published beyond the private-events email.",
   "booking_lead": "No published booking window and the diary shows no open-calendar view; the form offers a waitlist if your preferred date is unavailable (booking form read 2026-08-16). House hours Tuesday–Saturday 18:00–01:00, closed Sunday and Monday.",
   "guest_line": "Arkestra (1-star, Etiler, Tue–Sat 18:00–01:00): Cenk Debensason's dining room in a 1960s villa with a secluded courtyard for al fresco, the 32-cover Ritmo room behind velvet curtains with its own entrance, and an upstairs Listening Room for restaurant guests — online bookings take 2 to 7.",
   "checked": "2026-08-16"
  },
  "charter": {
   "price": "₺₺₺₺",
   "book": "Online 2–7 covers · larger parties by email · Tue–Sat from 18:00",
   "private": "Ritmo — 32-cover room behind velvet curtains, private entrance",
   "warn": "Closed Sun–Mon",
   "fit": "Cenk Debensason's villa in Etiler: the dining room, then the listening room upstairs."
  }
 },
 {
  "id": "sankai-by-nagaya",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "name": "Sankai by Nagaya",
  "short": "Sankai by Nagaya",
  "neighborhood": "Bebek, Beşiktaş",
  "maps": "https://www.google.com/maps/search/?api=1&query=Sankai+by+Nagaya+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "caveat": "★ in the MICHELIN Guide Türkiye 2026 Not re-confirmed as trading when we checked on 2026-08-15 — call ahead before you cross the city for it.",
  "why": "Japanese, and genuinely so.",
  "productTags": [
   "Japanese"
  ],
  "badge": "Michelin",
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15",
  "category": "creme",
  "subcat": "Kaiseki + Edomae sushi",
  "hook": "Twenty-four seats at Bebek; kaiseki and Edomae sushi, tasting menus only.",
  "cosign": "MICHELIN Guide Türkiye 2026 (one Star since 2023); Gault&Millau Türkiye 15/20",
  "person": "Yoshizumi Nagaya — the Japanese chef behind the starred Nagaya in Düsseldorf — in partnership with the Turkish entrepreneur Can Yıldırım. Hiroko Shibata is head sushi chef and runs the counter.",
  "signature": "Two seasonal tasting menus combining kaiseki courses with Edomae-style sushi from Hiroko Shibata's counter — the first pairing of the two formats in Turkey. There is no à la carte at all.",
  "verdict": "Genuinely Japanese, not Japanese-adjacent: two seasonal tasting menus, twenty-four seats, and a sushi counter run by its own head sushi chef rather than by the executive chef's proxy. The Bosphorus at Bebek is the local ingredient. But treat everything about visiting as provisional — the operator has gone quiet online, and a MICHELIN listing published in December 2025 is not proof that a room is serving dinner tonight.",
  "address": "Bebek Hotel, Cevdet Paşa Caddesi No:34, third floor, Bebek, 34342 Beşiktaş, İstanbul",
  "phone": "+90 532 379 19 97",
  "hours": "⚠ NOT VERIFIED. No working house channel publishes them. Format is two seasonal tasting menus, no à la carte. Call the number above before you travel.",
  "price_range": "₺₺₺₺ — two seasonal tasting menus, no à la carte; the house publishes no price, and MICHELIN bands it at its top tier",
  "reservation": "⚠ No working booking channel found on 15 August 2026. Phone is the only route we can stand behind.",
  "best_time": "Early evening, while there is still light on the water",
  "best_night": "Wednesday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Seasonal kaiseki tasting",
    "note": "one of two menus"
   },
   {
    "name": "Edomae sushi counter",
    "note": "head sushi chef Hiroko Shibata"
   }
  ],
  "guest": {
   "private_dining": "The restaurant itself is the chef's-table format — a 24-seat omakase room where the house invites you to 'join him on the chef's table for an unforgettable trip to Japan'; 'all guests under the same reservation will enjoy the same menu selected upon booking', choosing between the two tasting menus (Sankai Sushi or Nagaya Signature). No separate private room published.",
   "view_terrace": "In the Bebek Hotel by The Stay, Cevdet Paşa Caddesi, Bebek; no floor, terrace or view is published. A complimentary BMW i7 transfer within 5 km is offered with advance reservation, limited availability.",
   "booking_lead": "No online booking — reservations by email (reservation@sankai.com.tr) or phone (+90 532 379 1997) only; reconfirm before travelling, as the house website was carrying injected casino-spam content when read on 2026-08-16, which suggests it is not being maintained.",
   "guest_line": "Sankai by Nagaya (1-star, in the Bebek Hotel): a 24-seat omakase room pairing kaiseki with Edomae sushi, the whole party on one of two menus — book by email or phone only, and reconfirm the restaurant is serving before crossing the city.",
   "checked": "2026-08-16"
  },
  "charter": {
   "price": "₺₺₺₺",
   "book": "Phone or email only · no online diary · reconfirm before travelling",
   "private": "BMW i7 transfer within 5 km offered with the booking",
   "warn": "House site unreachable when checked — call before promising the table",
   "fit": "Twenty-four seats of kaiseki and Edomae sushi at Bebek — the intimate option."
  }
 },
 {
  "id": "araf-istanbul",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 8,
  "name": "Araf İstanbul",
  "short": "Araf İstanbul",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Araf+%C4%B0stanbul+Istanbul",
  "lat": 40.908528,
  "lng": 29.286561,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN 2026"
  },
  "person": "Kenan Çetinkaya and Pınar Korgan Çetinkaya",
  "signature": "whatever comes off the fire — offal first, then the large cuts",
  "dishes": [
   {
    "name": "Whatever comes off the fire",
    "note": "offal first"
   },
   {
    "name": "Large cuts",
    "note": "the large cuts"
   }
  ],
  "verdict": "THE PICK. If you get in, you have had the defining meal of this decade in Istanbul",
  "caveat": "Twelve seats and one seating — any night is hard; midweek is the least impossible",
  "hours": "One seating a night",
  "why": "Chefs Kenan Çetinkaya and Pınar Korgan Çetinkaya. Twelve seats, one open fire.",
  "productTags": [
   "Open fire",
   "Offal",
   "Counter"
  ],
  "badge": "Michelin",
  "tags": [
   "DIRECT CONTACT ONLY — no booking app, no agency",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "esnaf",
  "subcat": "Open-fire counter, offal",
  "hook": "One open fire, a counter you sit at, and a menu that leads with the offal.",
  "cosign": "MICHELIN Guide Türkiye 2026 (new One Star); Gault&Millau Türkiye 2025, one toque, 11.2/20",
  "address": "19 Mayıs Mah., Sümer Sok., Sümko Sitesi N Blok No:1, AG/E iç kapı No:2, Kadıköy, 34742 İstanbul",
  "phone": "+90 533 969 27 23",
  "price_range": "₺₺₺ — à la carte, roughly ₺600–₺2,200 a plate (skirt steak ₺4,000 a kilo), plus 12% service; MICHELIN bands it as a moderate spend",
  "reservation": "Through the house site, which links a live booking system, or by phone (+90 533 969 27 23), email info@arafistanbul.com or Instagram. Not on OpenTable, Resy or SevenRooms.",
  "best_time": "The start of service — the counter is small and the window is only three hours",
  "best_night": "Wednesday",
  "money_eats": false
 },
 {
  "id": "ciya-sofrasi",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 9,
  "name": "Çiya Sofrası",
  "short": "Çiya Sofrası",
  "neighborhood": "Kadıköy market",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C3%87iya+Sofras%C4%B1+Istanbul",
  "lat": 40.989347,
  "lng": 29.024429,
  "signal_chip": {
   "label": "50 BEST DISCOVERY",
   "full": "The World's 50 Best Discovery · Chef's Table"
  },
  "signature": "from the counter — take what you cannot identify",
  "dishes": [
   {
    "name": "From the counter",
    "note": "take what you cannot identify"
   }
  ],
  "verdict": "Not a restaurant so much as a field-recording project with a kitchen",
  "caveat": "trading 2026; Güneşlibahçe Sk. No: 43, Kadıköy",
  "address": "Caferağa Mah., Güneşlibahçe Sok. No:43, Kadıköy, İstanbul",
  "hours": "Lunch, when the daily menu is fullest",
  "why": "Founded 1998 by Musa Dağdeviren. Forgotten regional recipes collected village by village: Azeri, Georgian, Arab, Armenian, Assyrian, Ottoman and Jewish dishes in their own traditions.",
  "productTags": [
   "Anatolian",
   "Regional",
   "Daily menu"
  ],
  "badge": "Michelin",
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "esnaf",
  "subcat": "Regional Anatolian lokanta",
  "hook": "A daily counter of Anatolian dishes recovered village by village since 1998.",
  "cosign": "The World's 50 Best Discovery; Time Out Istanbul (entry dated 22 April 2011 — old, treat as background)",
  "person": "Musa Dağdeviren and his wife Zeynep. The folklorist Sabri Koz, quoted on the restaurant's own site, calls the two of them its \"yemek mühendisleri\" — its food engineers — and the Çiya doors \"a research and application centre\" rather than shops.",
  "phone": "+90 216 418 51 15",
  "price_range": "₺ — The World's 50 Best Discovery puts the average at about $10 a head",
  "reservation": "Walk in. A lokanta of this kind does not take bookings and does not need to.",
  "best_time": "Lunch, when the day's pots are fullest and before the market crowd",
  "best_night": "Tuesday",
  "money_eats": true
 },
 {
  "id": "yanyali-fehmi-lokantasi",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 10,
  "name": "Yanyalı Fehmi Lokantası",
  "short": "Yanyalı Fehmi Lokantası",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Yanyal%C4%B1+Fehmi+Lokantas%C4%B1+Istanbul",
  "lat": 40.990765,
  "lng": 29.025509,
  "signal_chip": {
   "label": "BIB GOURMAND",
   "full": "Bib Gourmand 2026"
  },
  "verdict": "The mirror image of the city's loss: the oldest surviving lokanta on the Asian side was founded by a family who came the OTHER way in the exchange",
  "caveat": "Bib Gourmand confirmed on the MICHELIN Guide's own listing",
  "address": "Osmanağa Mah., Yağlıkçı İsmail Sok. No:1, Kadıköy, 34714 İstanbul",
  "hours": "09:00–22:30 daily (closed the first two days of public holidays)",
  "why": "Founded 1919 by Fehmi Efendi, whose family migrated from Yanya (Ioannina) in Greece — 'Yanyalı' means 'from Yanya'. Third generation, still family-run. 140–150 different dishes a day.",
  "productTags": [
   "Lokanta",
   "Since 1919"
  ],
  "badge": "Michelin",
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "esnaf",
  "subcat": "Lokanta since 1919",
  "hook": "A 1919 lokanta, same family three generations, 140-odd dishes a day.",
  "cosign": "MICHELIN Guide Türkiye 2026 — Bib Gourmand",
  "person": "Founded by Fehmi Sönmezler (1891–1980), son of Hüseyin Horp of the Sipahioğlu line, a family that came to Istanbul from Yanya — Ioannina, in what is now Greece. The third generation, Tansel, Can and Ergin Sönmezler, runs it today.",
  "signature": "Yanya köftesi — meatballs wrapped in thin slices of aubergine and baked with tomato, served on roasted aubergine purée. It is the dish the house is named for and the one it still leads with.",
  "phone": "+90 216 336 33 33",
  "price_range": "₺ — MICHELIN files it as \"on a budget\"; point-and-pay lokanta pricing",
  "reservation": "Walk in.",
  "best_time": "Lunch — the counter is at its fullest and the good pots have not gone",
  "best_night": "Tuesday",
  "money_eats": true,
  "dishes": [
   {
    "name": "Yanya köftesi",
    "note": "aubergine-wrapped meatballs, baked with tomato, on roast aubergine purée"
   },
   {
    "name": "The daily counter",
    "note": "140–150 dishes: 10 soups, 60–70 hot, 40 in olive oil"
   }
  ],
  "charter": {
   "price": "₺",
   "book": "Walk in · 09:00–22:30 daily",
   "fit": "Lunch ashore, zero risk: the 1919 lokanta, three generations, point at the trays."
  }
 },
 {
  "id": "agora-meyhanesi",
  "cat": "shop",
  "tier": "several",
  "priority": 11,
  "name": "Agora Meyhanesi",
  "short": "Agora Meyhanesi",
  "neighborhood": "Balat",
  "maps": "https://www.google.com/maps/search/?api=1&query=Agora+Meyhanesi+Istanbul",
  "lat": 41.033349,
  "lng": 28.946504,
  "verdict": "The meyhane as it was before the neighbourhood changed hands",
  "caveat": "trading seven days a week; own site agora1890.com",
  "hours": "Long dinner",
  "why": "Trading since 1890.",
  "productTags": [
   "Meyhane",
   "Since 1890"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "esnaf",
  "subcat": "Meyhane since 1890",
  "hook": "Founded 1890 by a Greek captain, burned in 1955, rebuilt on the same walls.",
  "cosign": "Time Out Istanbul (entry dated 13 November 2020)",
  "person": "Asteri Dulidis, a Rum (Greek) sea captain, opened it in 1890 in Balat's Çıfıtçı Çarşısı. Three generations of Dulidis kept it: Asteri, then his son Stelyo, then Stelyo's son Hristo, who left for Thessaloniki with his wife in 2001. Chef Ahmet Arı runs the meze counter today.",
  "signature": "The meze counter — about sixty of them, under chef Ahmet Arı. Time Out Istanbul names the favourites: yaprak ciğer, bademli kabak (courgette with almonds in garlicky yoghurt), Girit ezmesi, balık pastırması and tarama. Take the trolley slowly and let the rakı set the pace.",
  "address": "Balat, Mürselpaşa Cad. No:185, Fatih, 34087 İstanbul",
  "phone": "+90 546 631 21 30",
  "price_range": "₺₺₺ — mezes are individually cheap; the rakı is what makes the bill",
  "reservation": "Book through the house site (agora1890.com) or by phone. It runs at 150 to 200 covers and still fills at weekends.",
  "best_time": "A long dinner — a meyhane evening is not a two-hour thing",
  "best_night": "Thursday",
  "money_eats": false,
  "signal_chip": {
   "label": "TIME OUT ISTANBUL",
   "full": "Time Out Istanbul's entry calls it pre-Republic meyhane culture with 130 years behind it and credits chef Ahmet Arı with sixty mezes — but the page is dated 13 November 2020, so read it as a soft, ageing signal. No ranking body (MICHELIN, 50 Best, Gault&Millau) lists it.",
   "cosign": "Time Out Istanbul (entry dated 13 November 2020)"
  },
  "dishes": [
   {
    "name": "Yaprak ciğer",
    "note": "leaf liver"
   },
   {
    "name": "Bademli kabak",
    "note": "courgette with almonds and garlicky yoghurt"
   },
   {
    "name": "Girit ezmesi",
    "note": "Cretan dip"
   },
   {
    "name": "Balık pastırması",
    "note": "cured, pressed fish"
   },
   {
    "name": "Tarama",
    "note": ""
   }
  ],
  "charter": {
   "price": "₺₺₺",
   "book": "Site (agora1890.com) or phone · 150–200 covers · fills at weekends",
   "fit": "The safe big-table call: a 135-year meyhane that can seat a party tonight and still feel like Istanbul."
  }
 },
 {
  "id": "casius-antioch-kitchen",
  "cat": "shop",
  "tier": "several",
  "priority": 12,
  "name": "Casius Antioch Kitchen",
  "short": "Casius Antioch Kitchen",
  "neighborhood": "Cihangir",
  "maps": "https://www.google.com/maps/search/?api=1&query=Casius+Antioch+Kitchen+Istanbul",
  "signal_chip": {
   "label": "BIB GOURMAND",
   "full": "Bib Gourmand 2026"
  },
  "caveat": "Bib Gourmand confirmed on the MICHELIN Guide's own listing",
  "why": "Antakya cooking in Istanbul, which after the 2023 earthquakes carries a weight it did not have before.",
  "productTags": [
   "Antakya",
   "Regional"
  ],
  "badge": "Michelin",
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "esnaf",
  "subcat": "Antakya (Hatay) cooking",
  "hook": "Antakya cooking in Cihangir, out of a stone oven — a 2026 Bib Gourmand.",
  "cosign": "MICHELIN Guide Türkiye 2026 — Bib Gourmand (new entry, selection published December 2025)",
  "person": "No chef or owner is named on the restaurant's own site or on its MICHELIN listing. The house presents itself collectively, around the Yayladağı sourcing and the stone oven.",
  "signature": "Antakya-style kebab and Belen tava out of the stone oven — the two plates the house itself puts on its MICHELIN page. The tell that you are in the right room is what arrives unasked, and the house lists both as treats on its own About page: ground zahter with olive oil and hot stone-oven bread to open, and thin-sliced kabak fried crisp under tahini and broken walnut to close.",
  "verdict": "A Bib Gourmand in the MICHELIN Guide Türkiye 2026 — one of sixteen new ones in a category that grew to thirty-nine nationally — and the distinction is the right size for the room: careful regional cooking at moderate money, not a tasting-menu occasion. The house publishes 08:00 to 02:00 seven days, which makes it as much a Cihangir breakfast room as a dinner one, and the breakfast trade is a real part of the business. Go for the stone oven and the Hatay table habits, not for a chef's theatre.",
  "address": "Kılıçali Paşa Mah., Akarsu Yokuşu Sok. No:36/A, 34433 Beyoğlu, İstanbul",
  "phone": "+90 547 200 31 31",
  "hours": "Every day 08:00–02:00",
  "price_range": "Bib Gourmand band — MICHELIN's marker for good cooking at moderate prices; no menu prices verified",
  "reservation": "Walk-in or phone +90 547 200 31 31",
  "best_time": "Breakfast from 08:00 — the Cihangir habit, and the quietest the room gets",
  "best_night": "Thursday",
  "money_eats": true,
  "dishes": [
   {
    "name": "Antakya-style kebab",
    "note": "the house's own named signature, off the stone oven"
   },
   {
    "name": "Belen tava",
    "note": "the Hatay tray dish the house pairs with the kebab on its MICHELIN page"
   },
   {
    "name": "Ground zahter and olive oil",
    "note": "on the house, with hot stone-oven bread, before you order"
   },
   {
    "name": "Crisp kabak with tahini and walnut",
    "note": "on the house, to close — thin-sliced, crisp outside, soft inside"
   }
  ],
  "lat": 41.030822,
  "lng": 28.983173
 },
 {
  "id": "tam-ocakbasi",
  "cat": "shop",
  "tier": "several",
  "priority": 13,
  "name": "Tam Ocakbaşı",
  "short": "Tam Ocakbaşı",
  "neighborhood": "Arnavutköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Tam+Ocakba%C5%9F%C4%B1+Istanbul",
  "lat": 41.067658,
  "lng": 29.043958,
  "person": "Türev Uludağ",
  "signature": "liver first, then the skewers, then a lahmacun to close",
  "dishes": [
   {
    "name": "Liver first",
    "note": "liver first"
   },
   {
    "name": "Skewers",
    "note": "the skewers"
   },
   {
    "name": "A lahmacun to close",
    "note": "a lahmacun to close"
   }
  ],
  "caveat": "⚠ Friday and Saturday evenings are very hard to get into — book ahead",
  "hours": "Late dinner",
  "why": "Chef Türev Uludağ.",
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "ocakbasi",
  "subcat": "Ocakbaşı · Adana",
  "hook": "Chef-run Adana ocakbaşı in a Bosphorus village; TAM = Türev'in Adana Mutfağı.",
  "cosign": "Dünya Gazetesi (October 2025) · NTV (July 2026)",
  "verdict": "A chef's ocakbaşı rather than a neighbourhood one — deliberately smaller than the city's big fire counters, and priced for Arnavutköy. It cooks one region, Adana, and does it straight rather than surveying the southeast. It has grown fast enough to open a summer-season second room in Yalıkavak, Bodrum, which tells you the Istanbul house is working. Weekends are the loud version of it.",
  "address": "Arnavutköy Mah., Bebek-Arnavutköy Cad., Beşiktaş, İstanbul — no house number is printed here because sources disagree. Use the map link.",
  "phone": "+90 539 927 91 07",
  "price_range": "Arnavutköy prices — above a neighbourhood ocakbaşı; no figures verified",
  "reservation": "Phone +90 539 927 91 07 — essential for Friday and Saturday",
  "best_time": "Late dinner",
  "best_night": "Tuesday or Wednesday",
  "money_eats": false,
  "charter": {
   "book": "Phone · essential for Fri–Sat",
   "warn": "Fri–Sat very hard to get into",
   "fit": "The fire counter for guests who want the real thing: chef-run Adana in a Bosphorus village."
  }
 },
 {
  "id": "mesai",
  "cat": "shop",
  "tier": "several",
  "priority": 14,
  "name": "Mesai",
  "short": "Mesai",
  "neighborhood": "Gümüşsuyu",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mesai+Istanbul",
  "lat": 40.881684,
  "lng": 29.284741,
  "caveat": "⚠ Do not trust an inherited map pin. The coordinate this guide previously carried, 40.8817 / 29.2847, is in Pendik — some 25 km east, on the Asian side. No lat/lng is published here because none could be verified in OpenStreetMap or anywhere else; use the map search. Reservations are website-only and the house says so flatly: it does not take bookings by phone, so the number above is for everything except a table. No opening hours are published anywhere, including on its own site. And the newest independent coverage is January 2026 — everything since is the house's own site, which carries a 2026 copyright and a live booking flow.",
  "hours": "Late dinner",
  "why": "Ocakbaşı culture against a Bosphorus and Historic Peninsula view, running sunset into night.",
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "ocakbasi",
  "subcat": "Ocakbaşı · modern",
  "hook": "Ocakbaşı reopened on İnönü Caddesi, the old city skyline across the water.",
  "cosign": "Para Dergi (January 2026) · Brandmap (January 2026)",
  "person": "Ali Karababa — chef, named by Para Dergi and Brandmap. Gen Group is Gürol Yığar and Alper Karavar.",
  "signature": "Mesai Kebap is the house plate and Ali Nazik the other main the kitchen leads with; the openers to ask for are the atom meze and the truffled pepper boranı. The kitchen's own line is seasonal and named sourcing — Erzincan cheese, Kars butter — rather than a long card.",
  "verdict": "A reopening, not a new house. Mesai was a Karaköy fixture, went dark, and came back on İnönü Caddesi in the last days of December 2025 under a glass ceiling, with the strait in front of it and Topkapı, Hagia Sophia and the Maiden's Tower in the frame. It is a night out with a fire counter in it — bar, lighting, a long table — rather than an ocakbaşı you sit at with a rakı and nothing else. Eight months in, it has not been through a full season.",
  "address": "İnönü Cd. No:26, Gümüşsuyu, Beyoğlu, İstanbul",
  "phone": "+90 850 304 31 95",
  "price_range": "Beyoğlu night-out band; no figures verified",
  "reservation": "Website only — the house states plainly that it does not accept reservations by phone",
  "best_time": "Sunset, for the light on the old city",
  "best_night": "Thursday",
  "money_eats": false,
  "dishes": [
   {
    "name": "Mesai Kebap",
    "note": "the house main"
   },
   {
    "name": "Ali Nazik",
    "note": "smoked aubergine under lamb, the other main the kitchen leads with"
   },
   {
    "name": "Atom",
    "note": "the meze to open with"
   },
   {
    "name": "Trüflü biber boranı",
    "note": "truffled pepper boranı, the other named meze"
   }
  ]
 },
 {
  "id": "cira-ocakbasi",
  "cat": "shop",
  "tier": "several",
  "priority": 15,
  "name": "Çıra Ocakbaşı",
  "short": "Çıra Ocakbaşı",
  "neighborhood": "Sarıyer / Skyland",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C3%87%C4%B1ra+Ocakba%C5%9F%C4%B1+Istanbul",
  "caveat": "⚠ Still trading could not be confirmed. The only live evidence is the operator's own brand-portfolio page, which is a company listing rather than proof of a working door; a delivery platform showed it closed when checked on 15 August 2026. No phone is printed here: the number circulating on aggregator listings does not appear anywhere the operator publishes, and a wrong number is worse than none. No hours are published by anyone credible, and no coordinate could be verified — Skyland's towers are mapped, the unit inside them is not. It is also nowhere near the Boğaziçi: the complex sits well inland by Seyrantepe metro. Not re-confirmed as trading when we checked on 2026-08-15 — call ahead before you cross the city for it.",
  "address": "Skyland, Huzur Mah., Azerbaycan Cad., D1 Blok No:4d, Sarıyer, İstanbul",
  "hours": "Late dinner",
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15",
  "category": "ocakbasi",
  "subcat": "Ocakbaşı",
  "hook": "A live-fire ocakbaşı in the retail base of the Skyland towers, well inland.",
  "person": "Nobody. The operator's own page names no chef and no owner. Names circulating on secondary listings could not be verified against any source and are not repeated here.",
  "signature": "Meat off the live charcoal and the daily meze board, with the vegetables going over the same fire rather than into a pan. The operator's own page names no single plate, so there is nothing to ask for by name — order what is on the counter.",
  "verdict": "⚠ Trading status unverified — treat this as a place to ring, not a place to go. On its operator's own description it is a modern ocakbaşı in natural stone and wood: an open fire counter, a meze board that changes daily, vegetables charred on the same coals as the meat. It reads as built for the offices in the towers above it rather than for anyone crossing the city, and no ranking or serious press has been near it.",
  "price_range": "Not verified",
  "reservation": "No verified contact channel — nothing published by the operator beyond a company email",
  "best_time": "Dinner",
  "best_night": "Weeknight",
  "money_eats": false,
  "dishes": [
   {
    "name": "Charcoal skewers",
    "note": "cooked over live fire at an open counter"
   },
   {
    "name": "Daily meze board",
    "note": "changes with the day; how the room is meant to be ordered"
   },
   {
    "name": "Charcoal-grilled vegetables",
    "note": "same fire as the meat, per the operator's own description"
   }
  ]
 },
 {
  "id": "arogan",
  "cat": "shop",
  "tier": "several",
  "priority": 46,
  "name": "Arogan",
  "short": "Arogan",
  "neighborhood": "Tarabya",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arogan+Istanbul",
  "person": "Burak Zafer",
  "caveat": "⚠ CLOSED SUNDAYS AND MONDAYS",
  "hours": "Tue–Sat 18:00–00:00",
  "why": "Chef Burak Zafer. Opened 30 January 2026.",
  "productTags": [
   "Modern",
   "Local ingredients"
  ],
  "tags": [
   "Best night: Tue–Sat"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Modern Anatolian",
  "hook": "The chef who made his name on Periferi's burgers, now cooking goat lahmacun in Tarabya.",
  "signature": "Oğlak lahmacun — kid-goat lahmacun — is the dish every write-up names first. After it, the trüflü kereviz çorbası and the ördek cacio e pepe.",
  "verdict": "Six months old and still finding its crowd, which is why to go now. Anatolian material pushed through modern technique — kid-goat lahmacun, duck-liver pâté, duck cacio e pepe, truffled celery soup — plated tight and priced as a chef restaurant rather than a Bosphorus fish house. It is a long way up the European shore from Beyoğlu, so the drive has to be worth it to you. Confirmed still cooking on 17 July 2026, when the kitchen ran a public event on site.",
  "address": "Tarabya Bayırı Caddesi, Şehit Öğretmen Şenay Aybüke Yalçın Sok. 6/3 (the Migros building), 34457 Sarıyer, İstanbul",
  "phone": "+90 543 127 27 27",
  "price_range": "Not published and not verified — ask when you book",
  "reservation": "Recommended; +90 543 127 27 27 or mektup@arogan.com.tr",
  "best_time": "From 19:00",
  "best_night": "Tuesday to Thursday — quieter, and the kitchen has room to think",
  "money_eats": false,
  "dishes": [
   {
    "name": "Oğlak lahmacun",
    "note": "kid goat; the plate every review names first"
   },
   {
    "name": "Trüflü kereviz çorbası",
    "note": "truffle celery soup"
   },
   {
    "name": "Ördek ciğeri pate",
    "note": "duck liver pâté"
   },
   {
    "name": "Ördek cacio e pepe",
    "note": "duck cacio e pepe"
   },
   {
    "name": "Trüflü taş kadayıf",
    "note": "truffled kadayıf, off the dessert list"
   },
   {
    "name": "Deniz tuzu karamelli flan",
    "note": "sea-salt caramel flan"
   }
  ]
 },
 {
  "id": "kontuar",
  "cat": "shop",
  "tier": "several",
  "priority": 47,
  "name": "Kontuar",
  "short": "Kontuar",
  "neighborhood": "Pera / Asmalımescit",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kontuar+Istanbul",
  "person": "Mustafa Otar",
  "caveat": "⚠ Hours conflict. A May 2026 review gives Monday–Saturday, kitchen 18:00–23:30 with the bar to 01:00, closed Sunday; a competing claim has it Tuesday–Saturday to 22:30. The venue's own site publishes no hours. Book on +90 533 636 62 73 — that is the number on the restaurant's own site; one listing prints ...62 74, so use the site number. Prices are not published. No verified coordinate: aim for No:67A inside the passage.",
  "why": "Chef Mustafa Otar. Opened January 2026 as a chef's-table counter built on 'fire, emotion and roots'.",
  "productTags": [
   "Fire-focused",
   "Modern"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Wood-fire kitchen",
  "hook": "Whole cuts over open fire in a 19th-century Pera arcade, six nights a week.",
  "cosign": "Ebru Erke, Hürriyet Daily News, 17 January 2026; Müge Akgün, Hürriyet, 18 July 2026",
  "signature": "Glazed beef tongue — out of the stone oven, then finished over the fire — and the young carrot with orange beurre blanc are the two plates reviewers reach for. The salted mackerel is the third.",
  "verdict": "An open fire at the centre of the room, inside the Passage de Petits Champs at Meşrutiyet 67A, one of the 19th-century arcades linking Tepebaşı to İstiklal. Whole cuts over flame, sauces that do not shout, sourcing stated plainly. Erke's line is the right one: there is no show here, only craftsmanship. Dinner only, and you should book.",
  "address": "Asmalı Mescit, Meşrutiyet Cad. No:67A, 34430 Beyoğlu, İstanbul (Passage de Petits Champs)",
  "phone": "+90 533 636 62 73",
  "hours": "Reported Mon–Sat, kitchen 18:00–23:30, bar to 01:00, closed Sunday (May 2026 review). A Tue–Sat 18:00–22:30 version also circulates — confirm by phone.",
  "price_range": "Not published — à la carte, whole cuts of meat and fish",
  "reservation": "Essential; +90 533 636 62 73",
  "best_time": "First sitting, 18:00–19:00, if you want to watch the fire work",
  "best_night": "Tuesday or Wednesday, when the fire is not fighting a full room",
  "money_eats": false,
  "dishes": [
   {
    "name": "Glaze dana dil",
    "note": "glazed beef tongue; stone oven, then finished over fire"
   },
   {
    "name": "Körpe havuç",
    "note": "young carrot — the vegetable plate that shows the technique"
   },
   {
    "name": "Tuzlu uskumru",
    "note": "salted mackerel"
   },
   {
    "name": "Kuzu",
    "note": "lamb from İmroz, turned slowly over the fire"
   }
  ]
 },
 {
  "id": "hodan",
  "cat": "shop",
  "tier": "several",
  "priority": 48,
  "name": "Hodan",
  "short": "Hodan",
  "neighborhood": "Beyoğlu (listed by some sources as Nişantaşı)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Hodan+Istanbul",
  "caveat": "⚠ Neighbourhood disputed across sources (Beyoğlu vs Nişantaşı) — confirm before travelling",
  "why": "One of Beyoğlu's most talked-about new chef restaurants, and already a brunch fixture. Sunday jazz brunch.",
  "productTags": [
   "Modern Anatolian"
  ],
  "tags": [
   "Best night: Sun, for the jazz brunch"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Modern Anatolian",
  "hook": "Gault&Millau's best brunch in Istanbul — at a new Nişantaşı address since 2026.",
  "cosign": "Gault&Millau Türkiye — one toque, 12,5/20, Best Brunch Venue 2025. Move to Nişantaşı reported by Melis Yılmaz, Hürriyet, 18 July 2026.",
  "person": "Çiğdem Seferoğlu, founder and executive chef. She rewrites Turkish classics on a menu that turns with the season, and she moved the whole restaurant out of Beyoğlu in 2026.",
  "signature": "The crispy artichoke and the tiramisu are the two dishes the house has always been known for. Since the move, add the vine-leaf-wrapped fish out of the stone oven.",
  "verdict": "What it is really for is the weekend table, not a tasting menu. Gault&Millau Türkiye gives it one toque at 12,5/20 and named it Istanbul's best brunch venue on the 2025 list, and a breakfast service is due to start in September 2026. The move is the practical headline: most listings, the guide's own included, have not caught up.",
  "address": "Harbiye, Mim Kemal Öke Cad., Nişantaşı, Şişli, İstanbul (one listing gives No:19 — unconfirmed)",
  "phone": "+90 533 304 76 34",
  "hours": "Not verified. A daily 12:00–00:00 schedule is claimed but unconfirmed; breakfast service reported to begin September 2026. Call before travelling.",
  "price_range": "Not published",
  "reservation": "Advisable at weekends; +90 533 304 76 34",
  "best_time": "Late morning at the weekend",
  "best_night": "Saturday or Sunday daytime — the brunch is the thing that won the award",
  "money_eats": false,
  "signal_chip": {
   "label": "G&M 1 TOQUE",
   "full": "Gault&Millau Türkiye — one toque, 12,5/20 — plus the 2025 award for Istanbul's best brunch venue. Note the guide's own entry still prints the old Beyoğlu address.",
   "cosign": "Gault&Millau Türkiye"
  },
  "dishes": [
   {
    "name": "Asma yapraklı balık, taş fırından",
    "note": "vine-leaf-wrapped fish from the stone oven — new since the move"
   },
   {
    "name": "Dry-aged et",
    "note": "dry-aged cuts, added with the Nişantaşı kitchen"
   },
   {
    "name": "Crispy artichoke",
    "note": "reported as the long-standing house signature"
   },
   {
    "name": "Tiramisu",
    "note": "reported as the other reflex order"
   }
  ]
 },
 {
  "id": "todos-los-dias",
  "cat": "shop",
  "tier": "several",
  "priority": 49,
  "name": "Todos Los Días",
  "short": "Todos Los Días",
  "neighborhood": "Beyoğlu / Asmalımescit",
  "maps": "https://www.google.com/maps/search/?api=1&query=Todos+Los+D%C3%ADas+Istanbul",
  "caveat": "⚠ Hours unconfirmed, and a widely repeated 'closed Sunday' line is doubtful: the restaurant's own site publishes a Domingos brunch menu — Sunday — which is hard to square with shutting that day. No source that publishes verified hours could be found. Ring +90 533 636 62 30 (that is the number on the venue's own site; note Kontuar Pera next door at 67A is +90 533 636 62 73, one digit block apart, so read it twice). Prices are not published. No verified coordinate.",
  "why": "Esen Hünal, Maksut Aşkar and Erim Leblebicioğlu.",
  "productTags": [
   "Comfort food"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "All-day bistro",
  "hook": "Maksut Aşkar of Neolokal cooking schnitzel, all day, at Meşrutiyet 67.",
  "cosign": "Müge Akgün, Hürriyet, 18 July 2026",
  "person": "Esen Hünal and Maksut Aşkar — the Neolokal chef — on the food, with Erim Leblebicioğlu on the business. Leblebicioğlu also runs Kontuar Pera at 67A in the same passage.",
  "signature": "The schnitzel with potato salad is the plate Hürriyet singled out; the jasmine-rice goulash and the vegetable salads are the other two.",
  "verdict": "Aşkar cooking comfort food is an odd proposition and it works better than it reads: schnitzel with potato salad, vegetable salads, a jasmine-rice goulash, running from breakfast through to late. Akgün wrote it up in Hürriyet in July 2026 and said the quiet part out loud — she hopes it becomes a classic of its kind and lasts, which is not what you write about a room you expect to survive on its own. Come for breakfast or mid-afternoon, when it is not fighting for tables.",
  "address": "Asmalı Mescit Mah., Meşrutiyet Cad. No:67/B, Beyoğlu, İstanbul",
  "phone": "+90 533 636 62 30",
  "hours": "Not verified. A Mon–Sat 09:30–23:00 schedule circulates, but the venue's own site publishes a Sunday (Domingos) brunch card — confirm by phone.",
  "price_range": "Not published",
  "reservation": "+90 533 636 62 30",
  "best_time": "Breakfast, or the mid-afternoon lull",
  "best_night": "Any weekday; the room fills Friday and Saturday evening",
  "money_eats": false,
  "dishes": [
   {
    "name": "Schnitzel with potato salad",
    "note": "the plate the Hürriyet column named"
   },
   {
    "name": "Jasmine rice goulash",
    "note": "the dish that shows the chefs' hand"
   },
   {
    "name": "Vegetable salads",
    "note": "the all-day backbone"
   }
  ]
 },
 {
  "id": "indochine-istanbul",
  "cat": "shop",
  "tier": "several",
  "priority": 50,
  "name": "Indochine İstanbul",
  "short": "Indochine İstanbul",
  "neighborhood": "Bebek",
  "maps": "https://www.google.com/maps/search/?api=1&query=Indochine+%C4%B0stanbul+Istanbul",
  "person": "Mahmut Can Kızılbay",
  "caveat": "⚠ NOT CONFIRMED AS TRADING. The freshest source on this room is dated 6 October 2025; nothing since. ⚠ Two Indochines, and only one is this one: an unrelated Indochine off Kumbaracı Yokuşu in Tomtom closed and became Cochine years ago, and search engines and Time Out still surface that page first. No source publishes a street number on Bebeköy Sokak — a No:5 and a 7/1 both circulate and neither is confirmed, so the address here stops at the street. No verified coordinate. Hours below are from October 2025 and may be stale. Not re-confirmed as trading when we checked on 2026-08-15 — call ahead before you cross the city for it.",
  "why": "Chef Mahmut Can Kızılbay.",
  "productTags": [
   "Vietnamese"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Vietnamese",
  "hook": "The 1984 downtown-New York room, rebuilt behind a Bebek stone wall.",
  "signature": "Shaking beef and the turmeric-dill fish are the mains named in the opening coverage. Zabb prawn, the dumplings and the crispy whole chicken wings to open.",
  "verdict": "⚠ Read the status before the sell. Every source describing this room dates from October 2025 or earlier; nothing published in 2026 confirms it is still trading, and it is absent from a July 2026 round-up of Bebek's best addresses. On the evidence that exists it is a small dining room and a garden, two seatings a night, a DJ and a serious cocktail list — a scene restaurant that happens to cook Vietnamese properly. Treat that as a description of the opening, not of today. Call before you go.",
  "address": "Bebeköy Sokak, Bebek, Beşiktaş, İstanbul (no verified street number)",
  "phone": "+90 212 916 36 36",
  "hours": "As published October 2025: daily except Monday 18:30–00:30; Sunday 16:30–22:00, with two seatings at 19:00 and 21:00. Not re-confirmed since — call first.",
  "price_range": "Not published",
  "reservation": "Required when trading — +90 212 916 36 36; choose the 19:00 or the 21:00 seating",
  "best_time": "The 21:00 seating for the DJ and the bar; 19:00 if you want to hear each other",
  "best_night": "Thursday to Saturday for the room's own noise; Sunday's earlier start is the quiet option",
  "money_eats": false,
  "dishes": [
   {
    "name": "Shaking beef",
    "note": "the main most often named"
   },
   {
    "name": "Turmeric dill fish",
    "note": "the Hanoi classic, cooked straight"
   },
   {
    "name": "Zabb prawn",
    "note": "opening plate"
   },
   {
    "name": "Crispy whole chicken wings",
    "note": "the table order"
   },
   {
    "name": "Egg fried rice",
    "note": "named in the opening coverage"
   }
  ]
 },
 {
  "id": "basta-neo-bistro",
  "cat": "shop",
  "tier": "several",
  "priority": 51,
  "name": "Basta! Neo Bistro",
  "short": "Basta! Neo Bistro",
  "neighborhood": "Caddebostan, Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Basta%21+Neo+Bistro+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "In the 2026 MICHELIN selection"
  },
  "caveat": "in the MICHELIN Guide Türkiye 2026 selection",
  "why": "Kaan Sakarya and Derin Arıbaş, both trained in Michelin kitchens in France.",
  "productTags": [
   "Neo-bistro"
  ],
  "badge": "Michelin",
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Neo-bistro",
  "hook": "Two French-trained chefs serving cold beef brains on the Caddebostan shore road.",
  "cosign": "MICHELIN Guide Türkiye 2026 (selection, no star, no Bib); Gault&Millau Türkiye — one toque, 12,5/20",
  "person": "Kaan Sakarya and Derin Arıbaş, chef-partners. Both trained and cooked in Michelin kitchens in France before coming home; they also run Basta! Street Food Bar in Caferağa, a different address and a different format.",
  "signature": "Söğüş dana beyin — cold-cut beef brains — with tomato gazpacho is the dish Gault&Millau names, and the only plate it names. Order it and you have the argument for the whole room.",
  "verdict": "⚠ It is not a starred restaurant. It sits in the MICHELIN Guide Türkiye 2026 selection as a recommended address — no star, no Bib Gourmand — with a Gault&Millau Türkiye toque at 12,5/20 alongside. That is still worth crossing the water for: a small room on the Asian side where the Bağdat Caddesi food crowd actually eats, with a card that turns with the season and French technique put behind Turkish offal.",
  "address": "Caddebostan, Operatör Cemil Topuzlu Cad. No:39, 34728 Kadıköy, İstanbul",
  "phone": "+90 216 755 77 50",
  "hours": "Not verified. A Tue–Fri 15:00–22:00 / Sat–Sun 14:00–22:00 schedule, closed Monday, circulates unconfirmed — call before going.",
  "price_range": "Not published and not verified",
  "reservation": "Advisable; +90 216 755 77 50",
  "best_time": "Early — the kitchen is reported to stop at 22:00",
  "best_night": "Tuesday to Thursday; weekends fill",
  "money_eats": false,
  "dishes": [
   {
    "name": "Söğüş dana beyin",
    "note": "cold-cut beef brains with tomato gazpacho — the Gault&Millau plate"
   }
  ]
 },
 {
  "id": "lina-anatolian",
  "cat": "shop",
  "tier": "several",
  "priority": 52,
  "name": "Lina Anatolian",
  "short": "Lina Anatolian",
  "neighborhood": "Karaköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Lina+Anatolian+Istanbul",
  "caveat": "⚠ Sold as Karaköy, but the address is the Meclis-i Mebusan shore road, a walk east of Karaköy square — check the map before you set off. No source publishes a street number for The Maestro Hotel, so the address here stops at the street. Hours are not published anywhere; reserve on +90 543 508 03 40 or reservation@linaanatolian.com and ask. Signature fish runs 6,500–7,800 TL, so this is a planned evening, not a drop-in. No verified coordinate.",
  "why": "Regional Anatolian flavours through contemporary technique, over the Bosphorus — a refined interpretation rather than a recreation.",
  "productTags": [
   "Modern Anatolian",
   "Bosphorus view"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Modern Anatolian",
  "hook": "Hamsiköy rice pudding and turbot tandır on a hotel roof over the Bosphorus.",
  "cosign": "Reviewed in OdaTV's GastrOda section, 21 June 2026",
  "person": "Murat Alan, head chef, with a long Istanbul hotel-and-restaurant CV behind him: Borsa Lokantası, Hotel Les Ottomans, Lacivert and Liman Restaurant. He names Rasim Özkanca as the cook who shaped him.",
  "signature": "The whole-fish plates are both the reason to come and the reason it is expensive: kalkan tandır at 6,500 TL or tuzda balık at 7,800 TL. Open on vişneli yaprak sarma and finish on the Hamsiköy sütlacı.",
  "verdict": "Honest about what it is: a terrace with a Bosphorus view where an experienced hotel chef cooks Anatolian dishes carefully rather than cleverly. The prices are published and steep — cold and shared plates 550–1,850 TL, hot starters 700–2,500 TL, mains 2,200–3,500 TL, kalkan tandır 6,500 TL and tuzda balık 7,800 TL, as reviewed in June 2026. It opened in 2026, so the room is still settling.",
  "address": "The Maestro Hotel, Meclis-i Mebusan Cad., terrace floor, Beyoğlu, İstanbul (no verified street number)",
  "phone": "+90 543 508 03 40",
  "hours": "Not published; dinner-led — confirm on booking",
  "price_range": "Cold and shared plates 550–1,850 TL; hot starters 700–2,500 TL; mains 2,200–3,500 TL; kalkan tandır 6,500 TL; tuzda balık 7,800 TL; desserts 720–950 TL (June 2026)",
  "reservation": "+90 543 508 03 40 or reservation@linaanatolian.com",
  "best_time": "Arrive before sunset for the light on the water",
  "best_night": "Any clear evening — the terrace is the point",
  "money_eats": false,
  "dishes": [
   {
    "name": "Kalkan tandır",
    "note": "turbot, tandır-cooked — 6,500 TL (June 2026)"
   },
   {
    "name": "Tuzda balık",
    "note": "salt-baked fish — 7,800 TL (June 2026)"
   },
   {
    "name": "Vişneli yaprak sarma",
    "note": "sour-cherry vine leaves, the opening plate"
   },
   {
    "name": "Kesme mantı",
    "note": "hand-cut mantı"
   },
   {
    "name": "Hamsiköy sütlacı",
    "note": "rice pudding named for the Black Sea village"
   },
   {
    "name": "Izgara ahtapot",
    "note": "grilled octopus"
   }
  ]
 },
 {
  "id": "lokanta-stambouli",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 53,
  "name": "Lokanta Stambouli",
  "short": "Lokanta Stambouli",
  "neighborhood": "Pera (Minoa Pera)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Lokanta+Stambouli+Istanbul",
  "person": "Perviz Resuli on the first floor of the historic Union Française building at Mino",
  "verdict": "The most interesting new room in the city — a Rum meyhane revival opening in 2026 is a loaded act, and it is the living answer to this guide's history section",
  "caveat": "⚠ REPORTED CLOSED AND RELOCATING, UNCONFIRMED. The only source for the closure is the restaurant's own Instagram; the only sources for it still trading are listings that lag. Neither could be independently corroborated in this pass, so treat both as unproven and ring ahead or check @lokantastambouli. The last confirmed address is the Minoa Pera building at Meşrutiyet Cad. No:99 — it may no longer be there. No phone number could be verified. Coordinate deliberately blank. Not re-confirmed as trading when we checked on 2026-08-15 — call ahead before you cross the city for it.",
  "address": "Asmalı Mescit Mah., Meşrutiyet Cad. No:99, Beyoğlu, İstanbul",
  "phone": "+90 539 693 12 78",
  "why": "Opened by Perviz Resuli on the first floor of the historic Union Française building at Minoa Pera. Capacity 70. Explicitly marries the old Istanbul meyhane to Greek cooking.",
  "productTags": [
   "Meyhane",
   "Turkish and Rum tradition"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Türk–Rum meyhane",
  "hook": "A Rum meyhane put back into Pera's old Union Française building.",
  "cosign": "Senem Bal Ay, Gazete Oksijen, 28 November 2025 (opening write-up)",
  "signature": "When it was trading, the cold-meze counter was the tell: lakerda, tarama, zeytinyağlı lahana dolması and tarçınlı fasulye pilaki, with daily fish off the Aegean. Verify every line of that if and when it reopens — a move usually rewrites a menu.",
  "reservation": "Do not assume it is taking bookings — status unconfirmed",
  "best_time": "None — watch @lokantastambouli",
  "best_night": "None — check before planning",
  "money_eats": false,
  "dishes": [
   {
    "name": "Lakerda",
    "note": "cured bonito off the cold counter"
   },
   {
    "name": "Tarama",
    "note": "the meyhane benchmark"
   },
   {
    "name": "Zeytinyağlı lahana dolması",
    "note": "olive-oil cabbage dolma"
   },
   {
    "name": "Tarçınlı fasulye pilaki",
    "note": "cinnamoned bean pilaki — the Rum note"
   }
  ]
 },
 {
  "id": "seoul-kitchen",
  "cat": "shop",
  "tier": "several",
  "priority": 54,
  "name": "Seoul Kitchen",
  "short": "Seoul Kitchen",
  "neighborhood": "Bomontiada, Şişli",
  "maps": "https://www.google.com/maps/search/?api=1&query=Seoul+Kitchen+Istanbul",
  "caveat": "POP-UP — will not last · pop-up — no stated end date, will not last Not re-confirmed as trading when we checked on 2026-08-15 — call ahead before you cross the city for it.",
  "why": "Jimmy & Jin.",
  "productTags": [
   "Korean",
   "Pop-up"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Korean street food",
  "hook": "Korean fried chicken and tteokbokki in the old Bomonti brewery yard.",
  "person": "Chefs billed only as Jimmy and Jin cook the menu. The operator is Doğuş Food & Beverage — the D.ream group — not an independent.",
  "signature": "The Korean fried chicken is the plate to judge it on; the sweet-hot balance is what the kitchen is showing off. Then tteokbokki, and the jajangmyeon if you want the black-bean noodles.",
  "verdict": "⚠ Read the status first. Nothing published in 2026 could be found to confirm it is still there — the one 2026 write-up cited for it no longer resolves, and the group's own brand page could not be reached. On the October 2025 evidence it is Korean fried chicken, tteokbokki, jajangmyeon and kimbap, built for sharing, inside Bomonti's converted brewery. Worth an hour if it is trading. Check before you make a trip of it.",
  "address": "Yapı Kredi bomontiada, Tarihi Bomonti Bira Fabrikası, Merkez Mah., Silahşör Cad., Birahane Sok. No:1, Şişli, İstanbul",
  "hours": "Not verified. A daily 12:00–22:00 schedule with no reservations circulates unconfirmed.",
  "price_range": "Not published and not verified",
  "reservation": "Reported to take none — walk in",
  "best_time": "Early evening",
  "best_night": "Any, if it is trading",
  "money_eats": false,
  "dishes": [
   {
    "name": "Korean fried chicken",
    "note": "the sweet-hot balance is the test"
   },
   {
    "name": "Tteokbokki",
    "note": "rice cakes in chilli sauce"
   },
   {
    "name": "Jajangmyeon",
    "note": "black-bean noodles"
   },
   {
    "name": "Kimbap",
    "note": "rice rolls, the cheap order"
   }
  ]
 },
 {
  "id": "ostre",
  "cat": "shop",
  "tier": "several",
  "priority": 55,
  "name": "Østre",
  "short": "Østre",
  "neighborhood": "Cihangir",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C3%98stre+Istanbul",
  "caveat": "Limited seating — reservations needed for evening service Not re-confirmed as trading when we checked on 2026-08-15 — call ahead before you cross the city for it.",
  "why": "A small seafood bar built on oysters and raw fish.",
  "productTags": [
   "Oysters",
   "Raw bar"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Oyster & raw bar",
  "hook": "A marble counter in Cihangir doing oysters, caviar and raw fish, and little else.",
  "signature": "Oysters on ice, eaten at the counter. The two plates the listing singles out are the trüflü deniz taraması, a truffled roe spread, and the karides carpaccio, raw shrimp dressed cold.",
  "verdict": "A raw bar that exists in Turkish city-guide listings and, as far as we can establish, nowhere else. The listings are specific — street number, phone, opening hours, two named dishes — but they trace back to a single publisher, and our own independent searches returned the same material recycled and nothing new. It appears in neither Vogue Türkiye's nor Gazete Oksijen's new-openings round-ups. We could not confirm from a second, independent source that it was trading on 15 August 2026.",
  "address": "Firuzağa Mah., Bostanbaşı Cad. No:4/B, 34425 Beyoğlu, İstanbul",
  "phone": "+90 539 851 29 21",
  "hours": "Tue–Sun 14:00–23:00, closed Monday — single-source, not independently confirmed",
  "price_range": "Not published — oysters and caviar, so budget accordingly",
  "reservation": "Phone +90 539 851 29 21, per the single listing that carries it. No online booking found.",
  "best_time": "Evening",
  "money_eats": false,
  "dishes": [
   {
    "name": "Taze istiridye",
    "note": "Fresh oysters on ice — the reason the room exists, per the listing"
   },
   {
    "name": "Trüflü deniz taraması",
    "note": "Truffled roe spread, one of two dishes the listing names"
   },
   {
    "name": "Karides carpaccio",
    "note": "Raw shrimp, sliced thin and dressed cold"
   }
  ]
 },
 {
  "id": "ruya-istanbul",
  "cat": "shop",
  "tier": "several",
  "priority": 56,
  "name": "Rüya İstanbul",
  "short": "Rüya İstanbul",
  "neighborhood": "Çırağan Palace Kempinski, Beşiktaş",
  "maps": "https://www.google.com/maps/search/?api=1&query=R%C3%BCya+%C4%B0stanbul+Istanbul",
  "lat": 41.03627,
  "lng": 29.093512,
  "caveat": "TWO CORRECTIONS. This guide previously pinned it at 41.03627 / 29.093512 — roughly 7 km away, on the Asian shore near Kandilli. And it carried an April 2026 opening, which was in fact the publication date of a design-press write-up: Turkish coverage had the room open by 2 December 2025 and Kempinski announced the opening itself that month. No coordinate is given here now, because the only figure we could source is Wikipedia's arcminute-rounded point for the palace, which is not a street-level geocode and this guide pins only those. The address and phone are verified against the hotel. No chef is named by the hotel or in any release between December 2025 and June 2026. Closed Mondays except for breakfast, and brunch at 6,500–7,700 TL is a special-occasion outlay that books out first; under-5s eat free, 6 to 11 at half price.",
  "why": "Sharing plates in the Çırağan Palace Kempinski. It revived the long-missed Sunday brunch tradition.",
  "productTags": [
   "Modern Anatolian",
   "Grand hotel"
  ],
  "tags": [
   "Best night: Sun, for the brunch"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Modern Anatolian",
  "hook": "Anatolian sharing plates in a rebuilt sultan's palace, open since December 2025.",
  "person": "Umut Özkanca — creator of the Rüya brand and deputy chairman of Doğuş Yeme-İçme, Turizm ve Perakende Grubu — who opened the room with the hotel's general manager Ralph Radtke. No head chef is named anywhere. Interiors by Conran & Partners.",
  "signature": "The Sunday brunch is the format the kitchen is judged by — Simit & Caviar, crispy minced-meat börek, a three-day-fermented two-cheese Black Sea pide, Rüya-style mantı and the leaf-cut döner. Off the card, the plate Turkish coverage led with at the opening was 24-hour braised beef rib with mushroom keşkek.",
  "verdict": "Eight months old, and honest about what it is: an international sharing-plates brand parked in the best-sited hotel on the Bosphorus. The draw is the Sunday brunch, which revives the Çırağan tradition — open buffet, live chef stations, a separate dessert room, 12:30 to 16:00 — at 6,500 TL a head with soft drinks or 7,700 TL with wine, beer and cocktails, VAT included. It carries no MICHELIN mark, and it opened only days before the Türkiye 2026 selection was announced on 4 December 2025, far too late to have been assessed. Read the absence as timing rather than judgement, for now.",
  "address": "Çırağan Palace Kempinski, Çırağan Cad. No:32, 34349 Beşiktaş, İstanbul",
  "phone": "+90 212 326 46 20",
  "hours": "Breakfast daily 07:00–11:00 · lunch Tue–Sun 12:30–16:00 · dinner Tue–Sun 19:00–23:00 · brunch Sun 12:30–16:00 · bar Tue–Sun 12:30–01:00. DJ Fri & Sat 20:00–00:00. Per the hotel's own page.",
  "price_range": "Sunday brunch 6,500 TL per person with soft drinks; 7,700 TL with wine, beer and cocktails, VAT included (2026)",
  "reservation": "Book through the hotel's CheckandPlace listing or +90 212 326 46 20. Sunday brunch goes first.",
  "best_time": "Sunday 12:30–16:00",
  "best_night": "Sunday, for the brunch",
  "money_eats": false,
  "dishes": [
   {
    "name": "Leaf-cut döner",
    "note": "The house signature on the brunch table"
   },
   {
    "name": "Simit & Caviar",
    "note": "The brunch's calling card"
   },
   {
    "name": "Rüya-style mantı",
    "note": "Anatolian dumpling, reworked"
   },
   {
    "name": "24-hour braised beef rib with mushroom keşkek",
    "note": "The plate the December 2025 opening coverage led with"
   },
   {
    "name": "Whole grilled lobster with erişte",
    "note": "Added to the summer card, 15 June 2026"
   }
  ]
 },
 {
  "id": "burger-and-lobster",
  "cat": "shop",
  "tier": "several",
  "priority": 57,
  "name": "Burger and Lobster",
  "short": "Burger and Lobster",
  "neighborhood": "The Ritz-Carlton Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=Burger+and+Lobster+Istanbul",
  "caveat": "RUNS ONLY TO THE END OF AUGUST 2026 · stated to run only to the end of August 2026 Not re-confirmed as trading when we checked on 2026-08-15 — call ahead before you cross the city for it.",
  "productTags": [
   "Pop-up"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15",
  "category": "rising",
  "subcat": "Lobster & burgers (chain)",
  "hook": "Not open yet — London's whole-lobster chain is fitting out a Zorlu Center unit.",
  "person": "Founded in London in 2011. The Türkiye licence sits with YKT Gıda, part of YKT Global. No individual founders or operators are named in any source we could verify.",
  "signature": "The format is the point: one burger, one lobster roll, one whole lobster, priced flat. Nothing on the Istanbul card has been published.",
  "verdict": "CORRECTION — this entry was wrong on both its location and its dates. It was listed here as a pop-up inside The Ritz-Carlton Istanbul running to the end of August 2026. The Ritz-Carlton's own dining page lists six outlets — Nobu Istanbul, Nobu Istanbul Bar, The Roof, Atölye, Bleu Lounge and Limoré — and Burger & Lobster is not among them. What is real is a permanent restaurant at Zorlu Center in Beşiktaş, in the unit that was Zanzibar, reported across the Turkish press from June 2026 as preparing to open. As of 15 August 2026 it had not opened. Do not send anyone.",
  "price_range": "Unpublished for Istanbul. The 1,200 TL lobster-burger figure in Turkish headlines is not an operator price.",
  "money_eats": false,
  "dishes": [
   {
    "name": "Whole lobster",
    "note": "The plate the group is named for"
   },
   {
    "name": "The burger",
    "note": "One burger, no menu to read"
   },
   {
    "name": "Lobster roll",
    "note": "The third and last thing on the card"
   }
  ]
 },
 {
  "id": "vefa-bozacisi",
  "cat": "shop",
  "tier": "several",
  "priority": 58,
  "name": "Vefa Bozacısı",
  "short": "Vefa Bozacısı",
  "neighborhood": "Vefa",
  "maps": "https://www.google.com/maps/search/?api=1&query=Vefa+Bozac%C4%B1s%C4%B1+Istanbul",
  "lat": 41.015324,
  "lng": 28.958419,
  "signature": "boza with cinnamon and roasted chickpeas",
  "dishes": [
   {
    "name": "Boza with cinnamon and roasted chickpeas",
    "note": "boza with cinnamon and roasted chickpeas"
   }
  ],
  "verdict": "The point of going is the room, unchanged",
  "caveat": "own site vefa.com.tr active",
  "hours": "Winter — it is a cold-season drink",
  "why": "Selling boza since 1876.",
  "productTags": [
   "Boza",
   "Since 1876"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "category": "story",
  "subcat": "Boza · since 1876",
  "hook": "Boza from one counter since 1876, and the glass Atatürk drank from still on show.",
  "person": "The fourth generation of Hacı Sadık Bey's family. He arrived from Prizren in 1870; the shop passed first to his son İsmail Hakkı Vefa.",
  "address": "Molla Hüsrev Mah., Vefa Cad. No:66, 34134 Fatih, İstanbul",
  "phone": "+90 212 519 49 22",
  "price_range": "Cheap — a glass costs a fraction of a coffee; no price is published",
  "reservation": "None — walk up to the counter",
  "best_time": "A winter evening",
  "money_eats": true
 },
 {
  "id": "wayana-wine-bar-tapas",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 16,
  "name": "WAYANA Wine Bar & Tapas",
  "short": "WAYANA Wine Bar & Tapas",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=WAYANA+Wine+Bar+%26+Tapas+Istanbul",
  "lat": 40.980199,
  "lng": 29.023997,
  "signature": "a flight of rare native grapes — the whole list is available by the glass",
  "dishes": [
   {
    "name": "A flight of rare native grapes",
    "note": "the whole list is available by the glass"
   }
  ],
  "verdict": "Go here first; it will reorganise what you think Turkish wine is",
  "caveat": "Listed on Star Wine List; own site live",
  "address": "Ferit Tek Sok. 60/B, Moda, Kadıköy, İstanbul",
  "phone": "+90 216 550 22 07",
  "hours": "16:00–00:00",
  "why": "500+ labels served entirely by the glass. As of July 2026: 143 Turkish wineries and 90 endemic grape varieties. Own site wayanatapas.com.",
  "productTags": [
   "Natural wine",
   "Turkish indigenous grapes"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "bag-pera",
  "cat": "shop",
  "tier": "several",
  "priority": 17,
  "name": "Bağ Pera",
  "short": "Bağ Pera",
  "neighborhood": "Asmalımescit",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ba%C4%9F+Pera+Istanbul",
  "lat": 41.027517,
  "lng": 28.974427,
  "caveat": "Not re-confirmed as trading when we checked on 2026-08-15 — call ahead.",
  "hours": "Lunch Mon–Sat 12:00–14:45 · dinner daily 17:30–00:00",
  "why": "Excellent small Turkish producers, plus tastings and workshops.",
  "productTags": [
   "Wine bar",
   "Tapas"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "montag",
  "cat": "shop",
  "tier": "several",
  "priority": 19,
  "name": "Montag",
  "short": "Montag",
  "neighborhood": "Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=Montag+Istanbul",
  "lat": 40.98478,
  "lng": 29.025796,
  "caveat": "Hours current on multiple 2026 listings",
  "address": "Caferağa, Muvakkıthane Cd. No:16/A Kat:1, 34710 Kadıköy, İstanbul",
  "hours": "Mon–Sun 10:00–22:00 (Fri–Sat to 23:00)",
  "why": "Roasting its own since 2016; the pioneer most of the scene credits.",
  "productTags": [
   "Specialty coffee",
   "Roaster"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "federal-galata",
  "cat": "shop",
  "tier": "several",
  "priority": 20,
  "name": "Federal Galata",
  "short": "Federal Galata",
  "neighborhood": "Galata — near the Kamondo stairs",
  "maps": "https://www.google.com/maps/search/?api=1&query=Federal+Galata+Istanbul",
  "lat": 41.026294,
  "lng": 28.973672,
  "caveat": "Not re-confirmed as trading when we checked on 2026-08-15 — call ahead.",
  "hours": "Morning",
  "why": "Est. 2016, up the hill from the Kamondo stairs. Australian-café register and a proper flat white.",
  "productTags": [
   "Specialty coffee"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "coffee-manifesto",
  "cat": "shop",
  "tier": "several",
  "priority": 21,
  "name": "Coffee Manifesto",
  "short": "Coffee Manifesto",
  "neighborhood": "Yeldeğirmeni, Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Coffee+Manifesto+Istanbul",
  "lat": 40.989201,
  "lng": 29.02417,
  "caveat": "Not re-confirmed as trading when we checked on 2026-08-15 — call ahead.",
  "hours": "Morning",
  "why": "Run with world-ranked barista Koray Erdoğdu.",
  "productTags": [
   "Specialty coffee"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "arkaoda",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 25,
  "name": "Arkaoda",
  "short": "Arkaoda",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arkaoda+Istanbul",
  "lat": 40.98659,
  "lng": 29.026539,
  "caveat": "open Mon–Sun 12:00–02:00 per a July 2026 listing; Kadife Sok. No:18 D:1",
  "address": "Kadife Sok. No:18 D:1, Caferağa, Kadıköy, İstanbul",
  "hours": "Mon–Sun 12:00–02:00",
  "why": "Anchor since 1999. Selectors move between Turkish psych, jazz and electronic. Functionally a collective as much as a bar.",
  "productTags": [
   "Listening bar",
   "Turkish psych",
   "Garden"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "karga",
  "cat": "shop",
  "tier": "several",
  "priority": 26,
  "name": "Karga",
  "short": "Karga",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Karga+Istanbul",
  "lat": 40.986644,
  "lng": 29.026584,
  "caveat": "⚠ the venue's own Facebook page shows 'Closing Soon' — CHECK BEFORE SENDING ANYONE",
  "why": "Vinyl-led sessions in the upstairs rooms.",
  "productTags": [
   "Vinyl sessions"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "closing_soon",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "june",
  "cat": "shop",
  "tier": "several",
  "priority": 29,
  "name": "June",
  "short": "June",
  "neighborhood": "Teşvikiye",
  "maps": "https://www.google.com/maps/search/?api=1&query=June+Istanbul",
  "lat": 41.16961,
  "lng": 28.990789,
  "caveat": "Not re-confirmed as trading when we checked on 2026-08-15 — call ahead.",
  "address": "Teşvikiye, Ahmet Fetgeri Sok. No:31, Şişli, İstanbul",
  "why": "A neighbourhood bar that is also a listening bar — vinyl through good equipment, dancing later.",
  "productTags": [
   "Listening bar"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "sahika",
  "cat": "shop",
  "tier": "several",
  "priority": 31,
  "name": "Şahika",
  "short": "Şahika",
  "neighborhood": "Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C5%9Eahika+Istanbul",
  "lat": 41.0348,
  "lng": 28.977639,
  "caveat": "Active club listing on Resident Advisor; roof bar hosting music, exhibitions, talks",
  "hours": "Late",
  "why": "Multi-level with a rooftop terrace; the experimental end of the programming.",
  "productTags": [
   "Techno",
   "Jungle",
   "Footwork",
   "Queer-friendly",
   "Rooftop"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "ritim-istanbul",
  "cat": "shop",
  "tier": "several",
  "priority": 34,
  "name": "Ritim Istanbul",
  "short": "Ritim Istanbul",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ritim+Istanbul+Istanbul",
  "lat": 40.921866,
  "lng": 29.158616,
  "caveat": "Not re-confirmed as trading when we checked on 2026-08-15 — call ahead.",
  "why": "Multi-floor, broader and more international.",
  "productTags": [
   "Reggaeton",
   "Pop",
   "Hip-hop",
   "Electronic"
  ],
  "tags": [
   "Best night: Sat"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-15"
 },
 {
  "id": "kuzguncuk",
  "cat": "mainland",
  "tier": "berth_top",
  "priority": 59,
  "name": "Kuzguncuk",
  "short": "Kuzguncuk",
  "neighborhood": "Asian shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kuzguncuk+Istanbul",
  "lat": 41.03216,
  "lng": 29.036026,
  "verdict": "The single loveliest street in Istanbul, and the physical proof of the city this guide describes",
  "caveat": "A neighbourhood, not a venue",
  "hours": "Late afternoon",
  "productTags": [
   "Wooden houses",
   "Mosque + synagogue + church"
  ],
  "tags": [
   "Best night: Sun"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "arnavutkoy-to-bebek",
  "cat": "mainland",
  "tier": "several",
  "priority": 61,
  "name": "Arnavutköy to Bebek",
  "short": "Arnavutköy to Bebek",
  "neighborhood": "European shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arnavutk%C3%B6y+to+Bebek+Istanbul",
  "lat": 41.077183,
  "lng": 29.043259,
  "verdict": "The best hour on the European shore",
  "caveat": "A walking route, not a venue",
  "hours": "Late afternoon",
  "productTags": [
   "Yalı",
   "3 km waterside walk"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "buyukada-princes-islands",
  "cat": "mainland",
  "tier": "berth_top",
  "priority": 62,
  "name": "Büyükada, Princes' Islands",
  "short": "Büyükada, Princes' Islands",
  "neighborhood": "Sea of Marmara",
  "maps": "https://www.google.com/maps/search/?api=1&query=B%C3%BCy%C3%BCkada%2C+Princes%27+Islands+Istanbul",
  "lat": 40.856355,
  "lng": 29.119037,
  "caveat": "An island, not a venue",
  "hours": "A full day",
  "why": "About 5 × 1 km. Roughly 90 minutes by ferry from the European piers, 45 from the Asian side.",
  "productTags": [
   "No cars",
   "Wooden houses",
   "Monastery of St George"
  ],
  "tags": [
   "Best night: Sun"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "kadikoy",
  "cat": "mainland",
  "tier": "berth_top",
  "priority": 63,
  "name": "Kadıköy",
  "short": "Kadıköy",
  "neighborhood": "Asian side",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kad%C4%B1k%C3%B6y+Istanbul",
  "lat": 40.991295,
  "lng": 29.024563,
  "verdict": "The centre of gravity of everything good happening in Istanbul now",
  "caveat": "A district, not a venue",
  "hours": "Market by day, bars by night",
  "productTags": [
   "Market streets",
   "Barlar Sokağı",
   "Moda",
   "Yeldeğirmeni"
  ],
  "tags": [
   "Best night: Sat"
  ],
  "status": "unverified",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "nardis-jazz-club",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 66,
  "name": "Nardis Jazz Club",
  "short": "Nardis Jazz Club",
  "neighborhood": "Galata — at the foot of the tower",
  "maps": "https://www.google.com/maps/search/?api=1&query=Nardis+Jazz+Club+Istanbul",
  "lat": 41.025442,
  "lng": 28.974186,
  "verdict": "THE jazz room in Istanbul, and the reason Wednesday is on the week grid",
  "address": "Kuledibi Sok., Galata, Beyoğlu, İstanbul",
  "hours": "Weekdays 21:30–00:30 · weekends 22:30–01:30",
  "why": "Roughly 120 seats at the foot of the Galata Tower, live jazz from local and international acts practically every night. Programming already listed into 2026–27.",
  "productTags": [
   "Jazz",
   "Live nearly every night",
   "120 seats"
  ],
  "tags": [
   "Mid",
   "Recommended",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "namli-gurme",
  "cat": "market",
  "tier": "several",
  "priority": 50,
  "name": "Namlı Gurme",
  "short": "Namlı Gurme",
  "neighborhood": "Karaköy, Beyoğlu — two minutes off the waterfront",
  "address": "Kemankeş Mahallesi, Mumhane Caddesi, Atilla İş Hanı No: 6/A, Karaköy, Beyoğlu",
  "hours": "Monday–Sunday 07:00–22:00 (the shop's own listing)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Naml%C4%B1%20Gurme%20Istanbul",
  "hook": "One Karaköy counter covering pastırma, cheese, olives, oil, honey and tahin — open seven days a week from seven in the morning.",
  "why": "This is the single most efficient provisioning stop on the European side, and its own shop publishes the numbers, VAT included: çemeni sıyrılmış pastırma, the fenugreek crust scraped back, ₺5,400/kg; an 850 g kangal sucuk made from 100% beef in the house's own workshop, ₺1,836; Gelibolu eski kaşar ₺1,690/kg and Kars Göle eski kaşar ₺1,080/kg; Erzincan tulum ₺1,180/kg, Van otlu peynir ₺1,490/kg, Ezine beyaz peynir ₺598 a block, Balıkesir buffalo butter ₺576 for 450 g. On the dry side: kuru sele olives ₺780/kg, Ayvalık kırma yeşil ₺590/kg, a litre of Makaron olive oil ₺1,080, 330 g of tahin ₺240, Elazığ mulberry pekmez ₺350 and nar ekşisi ₺350 for 350 ml. Honey is the outlier — Hakkari karakovan comb honey ₺4,200 — and these are the online-store figures checked in August 2026, so the counter can differ. The hours are the real advantage: Monday to Sunday, 07:00 to 22:00.",
  "signature": "Pastırma cut to order in front of you, thin enough to read through — ask for the çemeni sıyrılmış if you want the meat rather than the fenugreek. Kangal sucuk whole, not sliced. A kilo of Gelibolu eski kaşar for grating, and tulum for the meze board.",
  "buy": "Pastırma with the fenugreek crust scraped back (çemeni sıyrılmış), sliced to order; Kangal sucuk whole; Gelibolu cheese and tahin from the same counter",
  "buy_when": "Before 10:00 — the counter is calm and cutting fresh",
  "galley": "Vacuum-packs on request · pastırma and sucuk survive weeks chilled",
  "label": "EMİNÖNÜ",
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "productTags": [
   "Provisioning"
  ]
 },
 {
  "id": "kurukahveci-mehmet-efendi",
  "cat": "market",
  "tier": "several",
  "priority": 50,
  "name": "Kurukahveci Mehmet Efendi",
  "short": "Kurukahveci Mehmet Efendi",
  "neighborhood": "Eminönü, Fatih — at the corner of the Spice Bazaar",
  "address": "Tahmis Sokağı 66, Eminönü 34116, İstanbul (branch: Söğütlüçeşme Caddesi 12, Kadıköy 34714)",
  "hours": "Not published on the company's own site — confirm before a special trip.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kurukahveci%20Mehmet%20Efendi%20Istanbul",
  "hook": "One counter on Tahmis Sokak that has ground the city's coffee since 1871.",
  "why": "The house is in its 155th year — its own site runs the anniversary as \"155. YIL\" and its official channel carries the founding date in the handle — and it is still at Tahmis Sokağı 66, in the purpose-built block the company credits to the architect Zühtü Başar. There are only three shops in the whole city, all confirmed on the company's own contact pages: the Eminönü merkez, a Sirkeci branch, and Kadıköy at Osmanağa Mahallesi, Söğütlüçeşme Caddesi 12 — anything sold as Mehmet Efendi anywhere else is retail packaging, not the counter grind. The queue is long, moves fast, and almost everyone in it buys the same thing: Türk kahvesi ground to order and handed over still warm. The company does not publish shop hours on its own site, which is worth knowing before you cross the Golden Horn for it.",
  "signature": "Buy Türk kahvesi ground fresh at the counter, in the smallest pack you will finish within a fortnight — it is milled far finer than espresso and roasted for cezve extraction, so it will choke a portafilter basket.",
  "buy": "Türk kahvesi ground at the counter — the smallest pack you will finish in a fortnight",
  "buy_when": "Grind is cezve-fine: it will choke a portafilter — keep it for the pot",
  "galley": "Sealed packs keep · the queue moves fast, cash or card",
  "label": "EMİNÖNÜ",
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "productTags": [
   "Provisioning"
  ]
 },
 {
  "id": "karakoy-gulluoglu",
  "cat": "market",
  "tier": "several",
  "priority": 50,
  "name": "Karaköy Güllüoğlu",
  "short": "Karaköy Güllüoğlu",
  "neighborhood": "Karaköy, Beyoğlu",
  "address": "Kemankeş Karamustafa Paşa Mah., Kemankeş Cad. No:67, 34425 Karaköy — Beyoğlu",
  "hours": "Mon–Sat 07:30–01:00, Sun 08:00–01:00 (OpenStreetMap; the house publishes only a 19:00 courier cut-off)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Karak%C3%B6y%20G%C3%BCll%C3%BCo%C4%9Flu%20Istanbul",
  "hook": "One counter in Karaköy, open past midnight, run by the fifth generation of the family that made Gaziantep a baklava town.",
  "why": "The dynasty's origin is documented outside the family's own marketing: baklava was introduced to Gaziantep in 1871 by Çelebi Güllü, who had learned the recipe from a Syrian chef in Damascus. The city's version was registered as a Turkish geographical indication in 2008 and became Antep Baklavası, a Protected Geographical Indication under the European Commission, in 2013 — the first Turkish product to receive one. This house dates itself to 1843 and puts Nadir Güllü at the counter as \"the fifth generation representative of a family that has been making baklava since 1843,\" trained by his father and master Hacı Mustafa Güllü. The decisive fact is the smallest one: their contact page lists a single shop, Kemankeş Caddesi 67, and OpenStreetMap records the same telephone the house publishes, +90 850 308 45 45, against hours running to one in the morning.",
  "signature": "Fıstıklı kuru baklava — the dry pistachio one, no cream, cut small and stacked; it is the version that survives being carried onto a boat. Ask by weight (porsiyon or half a kilo), not by the piece. The tell for the whole city is here: Karaköy Güllüoğlu has one shop, and it is in Karaköy. A Güllüoğlu sign anywhere else is a different branch of the family.",
  "buy": "Fıstıklı kuru baklava — the dry pistachio one, no cream — by weight, not by the piece",
  "buy_when": "Open past midnight; the kuru travels",
  "galley": "The dry version survives being carried onto a boat · courier cut-off 19:00",
  "label": "KARAKÖY",
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "productTags": [
   "Provisioning"
  ]
 },
 {
  "id": "kadikoy-market",
  "cat": "market",
  "tier": "several",
  "priority": 50,
  "name": "Tarihi Kadıköy Çarşısı",
  "short": "Tarihi Kadıköy Çarşısı",
  "neighborhood": "Kadıköy, Asian side — five minutes' walk from the ferry pier",
  "address": "Güneşlibahçe Sokağı and Serasker Caddesi, Osmanağa, Kadıköy",
  "hours": "Stalls set their own hours; the street trades daytime and is busiest late morning. Verify per shop.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Tarihi%20Kad%C4%B1k%C3%B6y%20%C3%87ar%C5%9F%C4%B1s%C4%B1%20Istanbul",
  "hook": "Five minutes uphill from the ferry: the fish row, the butchers and the greengrocers that feed Kadıköy's own kitchens.",
  "why": "The market is not a building, it is a grid of short streets behind Söğütlüçeşme, and Güneşlibahçe Sokağı is its spine — OpenStreetMap maps fishmongers at nos. 1–3, a greengrocer at no. 9, butchers, bakeries and a spice counter inside about eighty metres of each other, with more fish and a butcher's row round the corner on Serasker Caddesi. Buy to the Turkish fishing calendar rather than to a shopping list: commercial fishing runs 1 September to 15 April, so palamut lands from September, lüfer through the autumn and hamsi from late autumn into winter, while between mid-April and the end of August almost everything on ice is farmed levrek and çipura or flown in. Fish is chalked per kilo and cleaned at the counter at no charge; produce is priced per kilo too, and the crates behind the stall are usually cheaper than the display. Stall names on this street turn over faster than the trades do, so shop the counter, not the sign — verify any single shop before you make a special trip for it.",
  "signature": "Whole palamut in autumn, gutted and scaled at the counter; ripe tomatoes and a bunch of flat parsley from the greengrocer at Güneşlibahçe 9; then the butchers' row for kuzu pirzola. Say \"temizlensin\" for the fish to be cleaned.",
  "buy": "Whole palamut in autumn gutted at the counter; tomatoes and flat parsley from Güneşlibahçe 9; kuzu pirzola from the butchers’ row",
  "buy_when": "Late morning — the stalls are fullest; say “temizlensin” to have the fish cleaned",
  "galley": "Buy to the fishing calendar, not the shopping list — the row sells what the boats landed",
  "label": "KADIKÖY",
  "status": "confirmed",
  "statusChecked": "2026-08-15",
  "productTags": [
   "Provisioning"
  ]
 }
];
  const CATEGORIES = [
 {
  "key": "creme",
  "label": "La Crème de la Crème",
  "lead": "The tables Istanbul is judged on — book weeks out, expect the bill."
 },
 {
  "key": "rising",
  "label": "The 2026 Wave",
  "lead": "The new guard — young kitchens that opened into a currency crisis and cooked anyway."
 },
 {
  "key": "ocakbasi",
  "label": "The Fire Counters — Ocakbaşı",
  "lead": "You sit at the coals and the cook works in front of you. The most Istanbul way to eat."
 },
 {
  "key": "esnaf",
  "label": "Esnaf Lokantası — the tradesman's table",
  "lead": "Steam-tray cooking, no menu, priced for someone on a wage. Where the city actually eats."
 },
 {
  "key": "story",
  "label": "The Story",
  "lead": "Rooms where a century sits down with you — go for the tale as much as the plate."
 }
];
  const GROUPS = [
 {
  "key": "grande",
  "label": "Les Grandes Tables",
  "lead": "The ambitious kitchens — tasting menus, a view, a booking window."
 },
 {
  "key": "petite",
  "label": "Les Petites Tables",
  "lead": "Character over ambition, and every bit as interesting."
 }
];
  const GROUP_OF = {
 "creme": "grande",
 "rising": "grande",
 "ocakbasi": "petite",
 "esnaf": "petite",
 "story": "petite"
};
  const NEIGHBORHOODS = [
 {
  "name": "Kuzguncuk",
  "desc": "The single loveliest street in Istanbul, and the physical proof of the city this guide describes",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kuzguncuk+Istanbul"
 },
 {
  "name": "Balat and Fener",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Balat+and+Fener+Istanbul"
 },
 {
  "name": "Arnavutköy to Bebek",
  "desc": "The best hour on the European shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arnavutk%C3%B6y+to+Bebek+Istanbul"
 },
 {
  "name": "Büyükada, Princes' Islands",
  "desc": "About 5 × 1 km. Roughly 90 minutes by ferry from the European piers, 45 from the Asian side.",
  "maps": "https://www.google.com/maps/search/?api=1&query=B%C3%BCy%C3%BCkada%2C+Princes%27+Islands+Istanbul"
 },
 {
  "name": "Kadıköy",
  "desc": "The centre of gravity of everything good happening in Istanbul now",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kad%C4%B1k%C3%B6y+Istanbul"
 }
];
  const WALKS = [
 {
  "name": "Kuzguncuk",
  "desc": "The single loveliest street in Istanbul, and the physical proof of the city this guide describes",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kuzguncuk+Istanbul"
 },
 {
  "name": "Balat and Fener",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Balat+and+Fener+Istanbul"
 },
 {
  "name": "Arnavutköy to Bebek",
  "desc": "The best hour on the European shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arnavutk%C3%B6y+to+Bebek+Istanbul"
 },
 {
  "name": "Büyükada, Princes' Islands",
  "desc": "About 5 × 1 km. Roughly 90 minutes by ferry from the European piers, 45 from the Asian side.",
  "maps": "https://www.google.com/maps/search/?api=1&query=B%C3%BCy%C3%BCkada%2C+Princes%27+Islands+Istanbul"
 },
 {
  "name": "Kadıköy",
  "desc": "The centre of gravity of everything good happening in Istanbul now",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kad%C4%B1k%C3%B6y+Istanbul"
 }
];
  const WORK_SPOTS = [
 {
  "name": "Montag",
  "desc": "Roasting its own since 2016; the pioneer most of the scene credits.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Montag+Istanbul"
 },
 {
  "name": "Federal Galata",
  "desc": "Est. 2016, up the hill from the Kamondo stairs. Australian-café register and a proper flat white.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Federal+Galata+Istanbul"
 },
 {
  "name": "Coffee Manifesto",
  "desc": "Run with world-ranked barista Koray Erdoğdu.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Coffee+Manifesto+Istanbul"
 },
 {
  "name": "Dama",
  "desc": "Morning coffee watching the side street, lunch with friends, and the tempo climbing into a hi-fi evening.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Dama+Istanbul"
 },
 {
  "name": "Neroli Daylight Kitchen",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Neroli+Daylight+Kitchen+Istanbul"
 },
 {
  "name": "Morning in Pera",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Morning+in+Pera+Istanbul"
 }
];
  const LANDMARKS = [];
  const PHOTOS = [
 {
  "src": "/terroir/Istanbul-Bogazici/img/ph-1-vapur-bosphorus.jpg",
  "caption": "The commuter crossing. Şehir Hatları still works the strait, and the deck of a vapur is the cheapest good hour in the city.",
  "credit": "Tarık Kaan Muslu · CC BY-SA 4.0 · Wikimedia Commons"
 },
 {
  "src": "/terroir/Istanbul-Bogazici/img/ph-2-galata-bridge-anglers.jpg",
  "caption": "Rods over the rail of the Galata Bridge, the restaurants packed on the deck beneath.",
  "credit": "Diego Delso · CC BY-SA 4.0 · Wikimedia Commons"
 },
 {
  "src": "/terroir/Istanbul-Bogazici/img/ph-3-grand-bazaar.jpg",
  "caption": "The Grand Bazaar. The honest advice is knowing which lanes still make things and which only sell.",
  "credit": "Diego Delso · CC BY-SA 4.0 · Wikimedia Commons"
 },
 {
  "src": "/terroir/Istanbul-Bogazici/img/ph-4-bosphorus-bridge.jpg",
  "caption": "The strait that makes the city two cities. Everything in this guide is arranged around crossing it.",
  "credit": "Diego Delso · CC BY-SA 4.0 · Wikimedia Commons"
 }
];
  const GEMS = [
 {
  "id": "gem-1-yanyal-fehmi-lokantas",
  "name": "Yanyalı Fehmi Lokantası",
  "tag": "Food gem",
  "title": "The restaurant that came the other way",
  "story": "Yanyalı Fehmi Lokantası has been open in Kadıköy since 1919, founded by Fehmi Efendi, whose family migrated from Yanya — Ioannina, in Greece. 'Yanyalı' means 'from Yanya'. In a city whose Greek community was removed by a wealth tax, a pogrom and an expulsion, the oldest surviving lokanta on the Asian side was founded by a family who came the other way in the same exchange.",
  "body": "Yanyalı Fehmi Lokantası has been open in Kadıköy since 1919, founded by Fehmi Efendi, whose family migrated from Yanya — Ioannina, in Greece. 'Yanyalı' means 'from Yanya'. In a city whose Greek community was removed by a wealth tax, a pogrom and an expulsion, the oldest surviving lokanta on the Asian side was founded by a family who came the other way in the same exchange.",
  "where": "Yanyalı Fehmi Lokantası has been open in Kadıköy since 1919, founded by Fehmi Efendi, whose family migrated from Yanya — Ioannina, in Greece",
  "pattern": "Yanyalı\\ Fehmi\\ Lokantası"
 },
 {
  "id": "gem-2-why-the-meyhane-looks-the-way-it-d",
  "name": "Why the meyhane looks the way it does",
  "tag": "Food gem",
  "title": "Why the meyhane looks the way it does",
  "story": "Under the Ottoman millet system the non-Muslim communities governed their own affairs — and because alcohol was forbidden to Muslims, the licence to run a drinking house was effectively a non-Muslim one. The long table of cold mezes, the rakı poured with water, the fasıl musicians moving between tables: not a Turkish invention that happens to be old, but a minority institution that outlived the minority.",
  "body": "Under the Ottoman millet system the non-Muslim communities governed their own affairs — and because alcohol was forbidden to Muslims, the licence to run a drinking house was effectively a non-Muslim one. The long table of cold mezes, the rakı poured with water, the fasıl musicians moving between tables: not a Turkish invention that happens to be old, but a minority institution that outlived the minority.",
  "where": "Why the meyhane looks the way it does",
  "pattern": "meyhane"
 }
];
  const TABLES = {
 "grande": {
  "title": "La Grande Table",
  "desc": "The tier you clear an evening for. One two-star at the top — TURK Fatih Tütak, which also took a Green Star in the 2026 edition — then a ring of one-stars arguing about what Anatolian cooking is allowed to become: Mikla on the Pera roof, Neolokal in Karaköy, Nicole with the city's best service, Araka up the Bosphorus at Yeniköy. Book weeks ahead and dress for it.",
  "sections": [
   {
    "label": "The stars",
    "desc": "One two-star and seven one-stars. Formal, expensive, and each answering the same question about Turkish cooking differently.",
    "ids": [
     "turk-fatih-tutak",
     "mikla",
     "neolokal",
     "nicole",
     "araka",
     "arkestra",
     "sankai-by-nagaya"
    ]
   }
  ]
 },
 "petite": {
  "title": "La Petite Table",
  "desc": "Where this guide actually lives. Smaller, more specific, mostly across the water on the Asian side, and least translated for a visitor — a twelve-seat fire counter with a star, a kitchen that collects forgotten village recipes, a lokanta trading since 1919 and a meyhane since 1890.",
  "sections": [
   {
    "label": "The rooms that matter more",
    "desc": "A twelve-seat counter around one open fire, a field-recording project with a kitchen, and the houses that outlived every fashion.",
    "ids": [
     "araf-istanbul",
     "ciya-sofrasi",
     "yanyali-fehmi-lokantasi",
     "agora-meyhanesi",
     "casius-antioch-kitchen"
    ]
   },
   {
    "label": "The fire counters — ocakbaşı",
    "desc": "A bar with a charcoal trench in it, and you sit at the trench. Liver first, then the skewers, then a lahmacun to close.",
    "ids": [
     "tam-ocakbasi",
     "mesai",
     "cira-ocakbasi"
    ]
   },
   {
    "label": "The 2026 wave",
    "desc": "The newest rooms, most with a rising chef's name on them. Reported rather than ranked — confirm before you travel.",
    "ids": [
     "arogan",
     "kontuar",
     "hodan",
     "todos-los-dias",
     "indochine-istanbul",
     "basta-neo-bistro",
     "lina-anatolian",
     "lokanta-stambouli",
     "seoul-kitchen",
     "stre",
     "ruya-istanbul",
     "burger-and-lobster"
    ]
   },
   {
    "label": "Natural wine & the native grape",
    "desc": "Öküzgözü, Boğazkere, Narince, Emir — the indigenous grapes almost nobody orders, and the rooms that pour them by the glass.",
    "ids": [
     "wayana-wine-bar-tapas",
     "bag-pera",
     "lips-wine-bar"
    ]
   }
  ]
 }
};
  const BRIDGE = {
 "_rule": "SINGLE-EDITOR RULE: charter{} on a venue deliberately duplicates booking truth held in its reservation/price_range/caveat prose. Any commit editing those fields on a shortlist venue MUST update its charter block in the same commit, and lead-time grouping below must be re-verified at write time.",
 "doors": [
  {
   "fr": "La Table des Invités",
   "en": "Guests ashore tonight — bookable, dressed, priced. Decided in 90 seconds.",
   "note": "auto",
   "href": "#ce-soir",
   "open": [
    "ce-soir"
   ]
  },
  {
   "fr": "Le Terroir",
   "en": "For the chef — why this food exists, the four-hour provisioning run, the dishes born here.",
   "note": "Le plat · le produit · la course · le geste · le rite",
   "href": "#band-place",
   "open": [
    "eat",
    "gastronomy",
    "dish",
    "provisioning",
    "chef-route"
   ]
  },
  {
   "fr": "Jour de Repos",
   "en": "Day off — which night is for what, then where the city actually eats.",
   "note": "La semaine · le hammam · les rituels · Sur le pouce · la nuit",
   "href": "#money-sits",
   "open": [
    "money-sits",
    "hammam",
    "rituals",
    "street-food",
    "bars",
    "quartiers"
   ]
  }
 ],
 "shortlist": {
  "title": "Ce Soir",
  "desc": "The charter shortlist — guests ashore, decided fast. Every name links to its full entry below.",
  "groups": [
   {
    "label": "Ce soir même",
    "sub": "Will take a call this afternoon and still impress",
    "ids": [
     "agora-meyhanesi",
     "yanyali-fehmi-lokantasi",
     "tam-ocakbasi"
    ]
   },
   {
    "label": "Cette semaine",
    "sub": "Two to seven days of lead — the strong middle",
    "ids": [
     "neolokal",
     "mikla",
     "arkestra"
    ]
   },
   {
    "label": "Le grand soir",
    "sub": "Book-ahead trophies — plan them into the next charter",
    "ids": [
     "turk-fatih-tutak",
     "nicole",
     "sankai-by-nagaya"
    ]
   }
  ]
 }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES, CATEGORIES, GROUPS, GROUP_OF, BRIDGE };
})();
