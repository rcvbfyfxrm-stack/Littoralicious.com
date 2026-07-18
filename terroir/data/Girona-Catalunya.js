/* Terroir — Girona · Catalunya — hand-built on the Cadaqués gold template */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#2d4a5e", "market": "#d97706", "shop": "#059669", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar", "mainland": "Out of town", "logistics": "Logistics"};
  const PRODUCT_COLORS = {"3 Michelin": "#7f1d1d", "1 Michelin": "#7f1d1d", "Michelin": "#7f1d1d", "Traditional": "#a16207", "Roca": "#1f2937", "Bistro": "#1f2937", "Rice": "#a16207", "Wine": "#7c2d12", "DO Empord\u00e0": "#7c2d12", "Coffee": "#92400e", "Specialty coffee": "#92400e", "Chocolate": "#78350f", "Gelateria": "#0ea5e9", "Ice cream": "#0ea5e9", "Pastry": "#dc2626", "Xuixo": "#dc2626", "Market": "#d97706", "Municipal market": "#d97706", "Cheese": "#eab308", "200+ cheeses": "#eab308", "Since 1920": "#a16207", "Since 1892": "#a16207", "Winery": "#7c2d12", "Since 1898": "#a16207"};
  const VENUES = [
  {
    "id": "v01-el-celler-de-can-roca",
    "cat": "shop",
    "tier": "berth_top",
    "priority": 1,
    "badge": "Michelin",
    "name": "El Celler de Can Roca",
    "short": "El Celler de Can Roca",
    "lat": 41.99329,
    "lng": 2.80796,
    "neighborhood": "Pedret · Can Sunyer",
    "tags": [
      "EUR 300+ pp",
      "Books ~11 months ahead, midnight on the 1st of the month; card to hold",
      "Lunch — marginally easier to land than dinner"
    ],
    "productTags": [
      "3 Michelin",
      "Tasting",
      "At-source"
    ],
    "why": "Three Michelin stars, twice World's Best Restaurant (2013 & 2015), run by the three Roca brothers — Joan on the savoury pass, sommelier Josep on the wine, Jordi on pastry. Famous for an emotional, wine-led tasting that turns memory and landscape into courses. To order: the full tasting — the caramelised olives hung on a bonsai, the charcoal-grilled langoustine, and Jordi's perfume-derived desserts (aromas captured on a rotary evaporator). The real gatekeeper is the diary, not the door.",
    "address": "Carrer de Can Sunyer 48, 17007 Girona",
    "phone": "+34 972 222 157",
    "hours": "Lunch — marginally easier to land than dinner",
    "maps": "https://www.google.com/maps/search/?api=1&query=El+Celler+de+Can+Roca+Girona",
    "verdict": "Forty years in, all three brothers are still on the floor — this is not a three-star coasting on its two world titles.",
    "signature": "The full tasting: caramelised olives plucked from a bonsai, closing on Jordi's perfume-built desserts.",
    "caveat": "Bookings open at midnight on the 1st of each month, eleven months out, card to hold; shut Sunday and Monday, and 16 August–1 September this summer.",
    "person": "Ask for Josep — middle brother, raised in the family's Taialà bar; 50 Best's inaugural World's Best Sommelier in 2022, and he still works the room himself.",
    "signal_chip": {
      "label": "3 STARS",
      "full": "MICHELIN Guide España 2026 — three stars, held since 2009",
      "cosign": "and the one booking in Catalunya we'd set a midnight alarm for"
    }
  },
  {
    "id": "v02-restaurant-massana",
    "cat": "shop",
    "tier": "berth_top",
    "priority": 2,
    "badge": "Michelin",
    "name": "Restaurant Massana",
    "short": "Restaurant Massana",
    "lat": 41.9873,
    "lng": 2.8195,
    "neighborhood": "Mercadal · near the Devesa",
    "tags": [
      "EUR 90–140 pp",
      "Several days to weeks ahead",
      "Dinner"
    ],
    "productTags": [
      "1 Michelin",
      "Duck",
      "Family"
    ],
    "why": "One Michelin star since 2007, held through the 2026 Guide — a fourth-generation family kitchen led by Pere Massana. Famous for duck and, in winter, one of Girona's serious truffle menus. To order: the 'Homenaje al Magret de Pato', the duck breast on the card since 1986; the seasonal truffle tasting; the classic canelons. Quieter than Can Roca but still books days to weeks ahead.",
    "address": "Carrer Bonastruc de Porta 10, 17001 Girona",
    "phone": "+34 972 213 820",
    "hours": "Dinner",
    "maps": "https://www.google.com/maps/search/?api=1&query=Restaurant+Massana+Girona",
    "verdict": "Girona's longest-held star after Can Roca's — kept since 2007, and bookable in days, not seasons.",
    "signature": "Homenaje al Magret de Pato — duck breast off the grill, on the card since 1986.",
    "caveat": "Shut Sunday and Monday, last tasting-menu seating at nine sharp — book days ahead, not on the night.",
    "person": "Ask for Pere Massana Roger — second-generation chef; his father handed him the stoves in 2018, in the house his parents opened in 1986.",
    "signal_chip": {
      "label": "1 STAR",
      "full": "MICHELIN Guide España 2026 — one star, held since 2007",
      "cosign": "and the one we'd book for the duck alone"
    }
  },
  {
    "id": "v03-divinum",
    "cat": "shop",
    "tier": "berth_top",
    "priority": 3,
    "badge": "Michelin",
    "name": "Divinum",
    "short": "Divinum",
    "lat": 41.9855,
    "lng": 2.8238,
    "neighborhood": "Barri Vell · the Casino building",
    "tags": [
      "EUR 80–120 pp",
      "A few days ahead",
      "Dinner"
    ],
    "productTags": [
      "1 Michelin",
      "Pairing",
      "Steak tartare"
    ],
    "why": "One Michelin star, held in the 2026 Guide, in a below-street vault of the old Casino — the kitchen trained under Joan Roca. Famous for its cellar: a wine-driven, sommelier-led room. To order: the steak tartare finished at the table, and the wine-paired tasting menu. Below street level — easy to walk past; book a few days ahead.",
    "address": "Carrer de l'Albareda 7, 17004 Girona",
    "phone": "+34 872 080 218",
    "hours": "Dinner",
    "maps": "https://www.google.com/maps/search/?api=1&query=Divinum+Girona",
    "verdict": "The only star in Girona won from the dining room, not the pass — Joan and Laura's floor, since the wine-bar days.",
    "signature": "The classic steak tartare, mustard-cool, with whatever Laura pours against it.",
    "caveat": "Shut Sunday and Monday, kitchen closes at ten — and the vault sits below street level, easy to march straight past.",
    "person": "Ask for Laura Tejero — co-owner and sommelier; she has built the cellar since the 2001 wine-bar days on Carrer Argenteria.",
    "signal_chip": {
      "label": "1 STAR",
      "full": "MICHELIN Guide España 2026 — one star, first won November 2024",
      "cosign": "and the one starred room in town we'd book for the cellar alone"
    }
  },
  {
    "id": "v04-normal",
    "cat": "shop",
    "tier": "several",
    "priority": 4,
    "badge": "Bistro",
    "name": "Normal",
    "short": "Normal",
    "lat": 41.9862,
    "lng": 2.8248,
    "neighborhood": "Barri Vell · Plaça de l'Oli",
    "tags": [
      "EUR 35–50 pp",
      "A few days ahead",
      "Lunch"
    ],
    "productTags": [
      "Roca",
      "Catalan stew",
      "Market"
    ],
    "why": "The Roca brothers' deliberately plain room, interiors by Andreu Carulla — starred technique cooking everyday Catalan. Famous for doing tradition straight, no theatre. To order: the rotating market stew (escudella-style), the canelons, and whatever rice is on. The companion Bar Normal opens at noon for vermouth and all-day picking.",
    "address": "Plaça de l'Oli 1, 17004 Girona",
    "phone": "+34 972 436 383",
    "hours": "Lunch",
    "maps": "https://www.google.com/maps/search/?api=1&query=Normal+Girona",
    "verdict": "The Rocas at their most Catalan — their mother's home cooking by El Celler-trained hands, not a three-star spin-off doing tricks.",
    "signature": "The whisky tart with egg-yolk ice cream — the one dessert the inspectors single out.",
    "caveat": "Shut Mondays; the diary opens 90 days ahead at midnight, card down — €50 a head if you cancel inside three days.",
    "person": "Elisabet Nolla — head chef and director; El Celler-trained, handed the stoves by the Rocas at the 2021 opening.",
    "signal_chip": {
      "label": "1 SOL",
      "full": "Guía Repsol — one Sol since 2024, held in the 2026 edition",
      "cosign": "and the one Roca room we'd book on our own money"
    }
  },
  {
    "id": "v05-casa-cacao",
    "cat": "shop",
    "tier": "several",
    "priority": 5,
    "badge": "Chocolate",
    "name": "Casa Cacao",
    "short": "Casa Cacao",
    "lat": 41.9843,
    "lng": 2.8228,
    "neighborhood": "Barri Vell · Plaça Catalunya",
    "tags": [
      "EUR 15–30 (café)",
      "Advisable for the terrace brunch",
      "Morning, on the terrace"
    ],
    "productTags": [
      "Roca",
      "Chocolate",
      "Terrace"
    ],
    "why": "Jordi Roca and Anna Payet's bean-to-bar chocolate house — beans roasted, ground and conched on site — with a 15-room hotel above the Onyar. Famous for single-origin bars and a serious hot chocolate. To order: the downstairs chocolate tasting, a thick hot chocolate, or the terrace brunch over Plaça Catalunya. Shop is walk-in; the rooms above book out fast.",
    "address": "Plaça de Catalunya 23, 17002 Girona",
    "phone": "+34 972 282 828",
    "hours": "Morning, on the terrace",
    "maps": "https://www.google.com/maps/search/?api=1&query=Casa+Cacao+Girona",
    "verdict": "Not a three-star gift shop — Jordi Roca roasts, grinds and conches the beans on the premises, and the cup proves it.",
    "signature": "The thick hot chocolate — single-origin, conched metres away, dense enough to coat the spoon.",
    "caveat": "A café, not a lunch room — the bookable brunch is the hotel roof's midday sitting (12:00–14:00, about €35, reserve ahead); the shop is walk-in, the fifteen rooms above are not.",
    "person": "Jordi Roca — youngest of the Celler de Can Roca brothers, the inaugural World's Best Pastry Chef in 2014; he bought these beans at source in Peru and Colombia.",
    "signal_chip": {
      "label": "SOLETE",
      "full": "Guía Repsol Solete — Bar Cacao, current listing 2026",
      "cosign": "and the one Girona morning we'd build a provisioning run around"
    }
  },
  {
    "id": "v06-rocambolesc",
    "cat": "shop",
    "tier": "several",
    "priority": 6,
    "badge": "Gelateria",
    "name": "Rocambolesc",
    "short": "Rocambolesc",
    "lat": 41.984,
    "lng": 2.8225,
    "neighborhood": "Mercadal · Carrer Santa Clara",
    "tags": [
      "EUR 4–8",
      "Walk-in",
      "Afternoon"
    ],
    "productTags": [
      "Roca",
      "Ice cream",
      "Playful"
    ],
    "why": "Jordi Roca's gelateria — the Celler's dessert language at pocket money. Famous for playful soft-serves and the sculpted ice-lollies (the hand, the nose) first dreamt up for his tasting menus. To order: a seasonal soft-serve dressed at the toppings bar, or a Panet. Queues form fast in summer; a candy confiteria shares the address.",
    "address": "Carrer de Santa Clara 50, 17001 Girona",
    "phone": "+34 972 416 667",
    "hours": "Afternoon",
    "maps": "https://www.google.com/maps/search/?api=1&query=Rocambolesc+Girona",
    "verdict": "Three-Michelin-star pastry thinking at four euros a cone — and the queue down Santa Clara knows it.",
    "signature": "The Panet — brioche pressed hot around cold soft-serve; crackling crust, frozen heart.",
    "caveat": "Walk-in only, and shut by 21:00 five nights a week (23:00 Friday–Saturday) — no midweek after-dinner cone.",
    "person": "Alejandra Rivas — co-founder and Jordi Roca's wife; she has run the shops since 2012 while he invents the flavours.",
    "signal_chip": {
      "label": "SOLETE",
      "full": "Guía Repsol Solete — live listing, 2026",
      "cosign": "and the rare chef spin-off that out-delivers its own queue"
    }
  },
  {
    "id": "v07-can-marques",
    "cat": "shop",
    "tier": "several",
    "priority": 7,
    "badge": "Traditional",
    "name": "Can Marquès",
    "short": "Can Marquès",
    "lat": 41.9796,
    "lng": 2.8227,
    "neighborhood": "Mercadal · beside Mercat del Lleó",
    "tags": [
      "EUR 30–45 pp",
      "Advisable for the three dinner nights",
      "Lunch — dinner only Wed/Thu/Fri 20:30–22:30"
    ],
    "productTags": [
      "Since 1920",
      "4th-gen",
      "Market"
    ],
    "why": "One of Girona's longest-running family tables, opened 1920 and now fourth generation. Famous for old-Girona home cooking off the market next door. To order: botifarra with melted brie; salt cod with samfaina and romesco; the daily rice. Night service Wed–Fri only (20:30–22:30); it shops Mercat del Lleó next door.",
    "address": "Plaça Calvet i Rubalcaba 3, 17002 Girona",
    "phone": "+34 972 201 001",
    "hours": "Lunch — dinner only Wed/Thu/Fri 20:30–22:30",
    "maps": "https://www.google.com/maps/search/?api=1&query=Can+Marquès+Girona",
    "verdict": "Four unbroken generations since 1920 — among Girona's longest-running tables, and the Mercat del Lleó next door still sets the menu.",
    "signature": "The Thursday rice — the pan carries whatever the market gave up that morning.",
    "caveat": "Lunch is the meal: dinner is Thursday and Friday only, groups only — and Saturdays shut mid-June to mid-September.",
    "person": "Ask for Eugeni Sánchez Marqués — fourth generation; his great-grandparents kept a boarding house here before the Mercat del Lleó was even built."
  },
  {
    "id": "v08-casa-marieta",
    "cat": "shop",
    "tier": "several",
    "priority": 8,
    "badge": "Traditional",
    "name": "Casa Marieta",
    "short": "Casa Marieta",
    "lat": 41.9857,
    "lng": 2.8236,
    "neighborhood": "Barri Vell · Plaça de la Independència",
    "tags": [
      "EUR 25–40 pp",
      "Recommended for the arcaded terrace",
      "Lunch on the square"
    ],
    "productTags": [
      "Since 1892",
      "5th-gen",
      "Terrace"
    ],
    "why": "On the arcaded Plaça de la Independència since 1892, five generations in. Famous for the terrace and unbudging Catalan classics. To order: duck with pears, baked lamb shoulder, and the canelons. Also does takeaway if the room is full.",
    "address": "Plaça Independència 5–6, 17001 Girona",
    "phone": "+34 972 201 016",
    "hours": "Lunch on the square",
    "maps": "https://www.google.com/maps/search/?api=1&query=Casa+Marieta+Girona",
    "verdict": "Girona's oldest restaurant — on a square ringed with look-alike terraces, the one that has cooked here since 1892 and still cooks like it.",
    "signature": "Duck with pears: the old Catalan way, pears gone amber in the roasting juices.",
    "caveat": "Open daily but on rails — lunch 12.30 to 3.30, dinner 7.30 to 10.30, half an hour longer at weekends, nothing between; the arcaded terrace books out first, and nobody here is chasing tasting-menu invention."
  },
  {
    "id": "v09-fonda-cal-ros",
    "cat": "shop",
    "tier": "several",
    "priority": 9,
    "badge": "Traditional",
    "name": "Fonda Cal Ros",
    "short": "Fonda Cal Ros",
    "lat": 41.9862,
    "lng": 2.8243,
    "neighborhood": "Barri Vell · Carrer de la Cort Reial",
    "tags": [
      "EUR 40–55 pp",
      "Recommended",
      "Dinner under the stone vaults"
    ],
    "productTags": [
      "Stone vaults",
      "Els Tinars team",
      "Seasonal"
    ],
    "why": "A historic inn under stone vaults, relaunched by Marc Gascons and the Michelin-starred Els Tinars team. Famous for market cooking with a refined hand. To order: whatever the weekly market menu carries — expect a rice, a seasonal fish, a slow-cooked meat. Closed Tue; on the very street where the xuixo was born.",
    "address": "Carrer de la Cort Reial 9, 17004 Girona",
    "phone": "+34 972 219 176",
    "hours": "Dinner under the stone vaults",
    "maps": "https://www.google.com/maps/search/?api=1&query=Fonda+Cal+Ros+Girona",
    "verdict": "Not the Gascons' starred table — the same Els Tinars hands cooking fricandó and rice a la llauna for fonda money under the old inn's vaults.",
    "signature": "Rockfish rice a la llauna — baked flat in its tin until the edges catch.",
    "caveat": "Shut Tuesdays and Wednesdays — not the Monday you'd guess; plates land to share, so order as a table, not as individuals.",
    "person": "Elena Gascons — she runs the room; brother Marc, on the stoves, has held Els Tinars' Michelin star since 2008."
  },
  {
    "id": "v10-nu",
    "cat": "shop",
    "tier": "several",
    "priority": 10,
    "badge": "Bistro",
    "name": "Nexe",
    "short": "Nexe",
    "lat": 41.9873,
    "lng": 2.8198,
    "neighborhood": "Barri Vell · Carrer d'Abeuradors",
    "tags": [
      "Carte, not a tasting menu",
      "Book ahead",
      "Tue–Sat · 13:00–15:00 / 20:00–22:00"
    ],
    "productTags": [
      "Experimental",
      "Market",
      "Value"
    ],
    "why": "Nu until August 2022, when Pere Massana signed the room over to his own kitchen team — head chef Albert Izquierdo and second Hugo Cuenca reopened it as Nexe and have kept the MICHELIN Guide listing without him; Guía Repsol Recomendado 2026. Famous for cooking worked up at the open bar. To order: the steak tartare made in front of you, then the short market carte. Shut Sun & Mon; service 13:00–15:00 and 20:00–22:00 — book ahead.",
    "address": "Carrer d'Abeuradors 4, 17004 Girona",
    "phone": "",
    "hours": "Tue–Sat 13:00–15:00, 20:00–22:00; closed Sun–Mon",
    "maps": "https://www.google.com/maps/search/?api=1&query=Nexe+Carrer+d%27Abeuradors+4+Girona",
    "verdict": "Nu is gone — Massana signed the room over to his own cooks in 2022, and as Nexe they've kept their MICHELIN Guide listing without him.",
    "signature": "Steak tartare, worked up in front of you at the open bar.",
    "caveat": "Shut Sunday and Monday, two-hour service windows — book, and don't bank on the tasting menu TheFork advertises; the carte runs short.",
    "person": "Ask for Albert Izquierdo — Nu's last head chef under Pere Massana; he took the room over with Hugo Cuenca in 2022.",
    "signal_chip": {
      "label": "MICHELIN",
      "full": "MICHELIN Guide 2026 — in the selection, no star",
      "cosign": "and quiet confirmation the takeover held the line"
    }
  },
  {
    "id": "v11-cal-formatger",
    "cat": "shop",
    "tier": "several",
    "priority": 11,
    "badge": "Cheese",
    "name": "Cal Formatger",
    "short": "Cal Formatger",
    "lat": 41.9861,
    "lng": 2.8244,
    "neighborhood": "Barri Vell · Carrer de la Cort Reial",
    "tags": [
      "EUR 10–25 (board)",
      "Walk-in to shop; ask ahead for a private tasting",
      "Late morning"
    ],
    "productTags": [
      "200+ cheeses",
      "Garrotxa",
      "Tasting"
    ],
    "why": "A cheese room built on Girona-province makers — Garrotxa goat's cheese (pressed, grey bloomy rind, mild and nutty) front and centre. Famous for putting the province's small dairies on one board. To order: a build-your-own board of Girona-region cheeses with a glass of Empordà. Small room, opens 10:30; closed Sun & Mon.",
    "address": "Carrer de la Cort Reial 12, 17001 Girona",
    "phone": "+34 677 835 580",
    "hours": "Late morning",
    "maps": "https://www.google.com/maps/search/?api=1&query=Cal+Formatger+Girona",
    "verdict": "The quesería Guía Repsol bills as Joan Roca's favourite in his own city — proof a province of small dairies can carry a counter alone.",
    "signature": "The Girona-comarca board, cut to order — start with the grey-rinded, hazelnut-sweet goat's cheeses.",
    "caveat": "Shut Sunday and Monday, and the counter goes dark mid-afternoon most days; tastings want notice, not a walk-in.",
    "person": "Ask for Marc Masó — he opened the counter in 2019 with his wife Laia Manté; the pair stock it from seventy-odd farmhouse makers, most of them Catalan."
  },
  {
    "id": "v14-arros-9-by-terram",
    "cat": "shop",
    "tier": "plenty",
    "priority": 14,
    "badge": "Rice",
    "name": "Arròs 9 by Terram",
    "short": "Arròs 9 by Terram",
    "lat": 41.986,
    "lng": 2.825,
    "neighborhood": "Barri Vell · Carrer Ginesta",
    "tags": [
      "EUR 20–35 pp",
      "Weekend lunch",
      "Lunch"
    ],
    "productTags": [
      "Rice",
      "Casual",
      "Terram"
    ],
    "why": "The casual, rice-focused offshoot of the gastronomic Terram, same chef. Famous for paella-pan rices cooked to a proper socarrat (the toasted crust at the base). To order: a dry arròs, or the arròs negre stained with squid ink. Rice is usually for two — call ahead if solo.",
    "address": "Carrer Ginesta 8, 17004 Girona",
    "phone": "+34 629 420 183",
    "hours": "Lunch",
    "maps": "https://www.google.com/maps/search/?api=1&query=Arròs+9+by+Terram+Girona",
    "verdict": "Not a photo-menu paella stop — Terram's chef directs the rice pans, and each arròs is built on its own sofregit.",
    "signature": "Arròs del senyoret amb llagosta — lobster rice, everything peeled, spoon straight to the crust.",
    "caveat": "Shut Wednesdays, and dinner only four nights a week — Sundays and Tuesdays it's lunch or nothing.",
    "person": "Adrià Bou — chef of the gastronomic Terram; he builds a separate sofregit and four broths so no two rices taste alike."
  },
  {
    "id": "v17-can-castello",
    "cat": "shop",
    "tier": "plenty",
    "priority": 17,
    "badge": "Pastry",
    "name": "Can Castelló",
    "short": "Can Castelló",
    "lat": 41.98477,
    "lng": 2.82445,
    "neighborhood": "Barri Vell · Carrer de l'Argenteria",
    "tags": [
      "EUR 3–4 per xuixo",
      "Walk-in",
      "Morning, fresh batches"
    ],
    "productTags": [
      "Xuixo",
      "Since 1898",
      "Catering"
    ],
    "why": "Brands itself keeper of the early xuixo recipe (its 116-year Santa Clara flagship closed 2014). Famous for the xuixo — a deep-fried, sugar-crusted cylinder of laminated dough piped full of crema catalana, a pastry born in Girona in the early 1900s. To order: the classic crema xuixo, warm. The 'best xuixo' title is contested — Pastisseria Tornés won the 2026 world contest.",
    "address": "Carrer de l'Argenteria 7, 17004 Girona",
    "phone": "+34 747 439 949",
    "hours": "Mon–Fri 10:00–20:30, Sat to 21:00, Sun to 20:00",
    "maps": "https://www.google.com/maps/search/?api=1&query=Can+Castell%C3%B3+Carrer+de+l%27Argenteria+7+Girona",
    "verdict": "Not the 2026 world-champion xuixo — Tornés took that — but the only house on earth frying nothing else.",
    "signature": "The classic crema xuixo, eaten warm — sugar crust cracking into soft crema catalana.",
    "caveat": "A branded flagship, not the vanished old bakery — the frying happens in Banyoles, the Calderers counter is gone, and Argenteria 7 is the only address.",
    "person": "Julià Castelló — fourth-generation owner; he and Pilar Campos bet the house on the xuixo in 2014.",
    "signal_chip": {
      "label": "TIME OUT",
      "full": "Time Out, March 2024 — 'the first shop in the world dedicated only to the xuixo'",
      "cosign": "and still the pastry we'd send a galley crew ashore for"
    }
  },
  {
    "id": "v18-la-fabrica",
    "cat": "shop",
    "tier": "plenty",
    "priority": 18,
    "badge": "Coffee",
    "name": "La Fàbrica",
    "short": "La Fàbrica",
    "lat": 41.9852,
    "lng": 2.8221,
    "neighborhood": "Barri Vell · Carrer de la Llebre",
    "tags": [
      "EUR 10–18",
      "None — expect a wait at peak brunch",
      "Weekend morning"
    ],
    "productTags": [
      "Specialty coffee",
      "Brunch",
      "Cyclists"
    ],
    "why": "Girona's first third-wave café, founded by a pro cyclist and his wife — the hub of a city that has become a road-cycling capital. Famous for proper filter coffee and a brunch full of Lycra on weekends. To order: the brunch board with a filter or flat white. Open daily 9:00–17:00, incl. Sundays — useful when the rest is shut.",
    "address": "Carrer de la Llebre 3, 17004 Girona",
    "phone": "+34 872 000 273",
    "hours": "Weekend morning",
    "maps": "https://www.google.com/maps/search/?api=1&query=La+Fàbrica+Girona",
    "verdict": "Girona's first third-wave café — the 2015 original the city's whole cycling-coffee scene grew out of.",
    "signature": "The brunch board with a filter coffee — beans they roast themselves at Espresso Mafia.",
    "caveat": "No bookings, a wall of Lycra at weekend brunch, and doors shut at five — dinner is elsewhere.",
    "person": "Christian Meier — Canadian ex-WorldTour pro; taught himself to roast and opened the café with his wife Amber while still racing.",
    "signal_chip": {
      "label": "TIME OUT",
      "full": "Time Out Barcelona 2025 — among the 14 essential places to eat in Girona (Ricard Martín, Food & Drink editor)",
      "cosign": "and the one brunch queue in Girona worth standing in"
    }
  },
  {
    "id": "v19-mercat-del-lleo",
    "cat": "market",
    "tier": "plenty",
    "priority": 19,
    "badge": "Market",
    "name": "Mercat del Lleó",
    "short": "Mercat del Lleó",
    "lat": 41.979557,
    "lng": 2.822663,
    "neighborhood": "Mercadal · Plaça Calvet i Rubalcaba",
    "tags": [
      "Market prices",
      "07:00–10:00 for the best fish and produce"
    ],
    "productTags": [
      "Municipal market",
      "Fish",
      "Producers"
    ],
    "why": "The working municipal market, in a purpose-built 1944 hall of ~1,712 m² and ~60 stalls. Famous as the city's larder — where the starred kitchens shop. To look for: the fish counters off the boat; the outer ring of pagès (farm) stalls with Poma de Girona apples, Garrotxa cheese and botifarra. Mon–Fri 07:00–14:00, Sat 07:00–14:30; closed Sun. A locals' market, not a tourist stop.",
    "address": "Plaça Calvet i Rubalcaba 15, 17002 Girona",
    "phone": "+34 972 201 163",
    "hours": "07:00–10:00 for the best fish and produce",
    "maps": "https://www.google.com/maps/search/?api=1&query=Mercat+del+Lleó+Girona",
    "verdict": "The 1944 hall Girona still cooks from — a working larder, not a food-hall conversion.",
    "signature": "Day-boat Costa Brava fish off the Salvador counter — bright-eyed, stiff, smelling of the sea.",
    "caveat": "Shut Sundays and wound down by two; after ten the fish is picked over — come to shop, not to graze.",
    "person": "Ask for Xavi Salvador on the fish line — third-generation, Costa Brava fishmongers since 1966; in 2024 he took over from Peixos Pol, the counter that retired after eighty years."
  },
  {
    "id": "v20-espelt-viticultors",
    "cat": "mainland",
    "tier": "plenty",
    "priority": 20,
    "badge": "Winery",
    "name": "Espelt Viticultors",
    "short": "Espelt Viticultors",
    "lat": 42.33,
    "lng": 3.05,
    "neighborhood": "Alt Empordà · Vilajuïga (≈50 min NE)",
    "tags": [
      "EUR 10 (visit) + bottles",
      "Required for the visit",
      "Morning slot"
    ],
    "productTags": [
      "DO Empordà",
      "Organic",
      "Cellar visit"
    ],
    "why": "One of the largest DO Empordà producers, farming organically on the tramuntana-swept Alt Empordà. Famous for old-vine Garnatxa and Carinyena, and the amber Garnatxa de l'Empordà dessert wine. To order: the guided cellar tasting (visit slots ~11:00). Province, not city — an hour out; the town coordinate is approximate.",
    "address": "Mas Espelt, 17493 Vilajuïga, Girona",
    "phone": "+34 972 531 727",
    "hours": "Morning slot",
    "maps": "https://www.google.com/maps/search/?api=1&query=Espelt+Viticultors+Girona",
    "verdict": "The big estate that farms like a small one — 200 organic hectares of DO Empordà with a solera in the cellar running back to 1997.",
    "signature": "Airam: grandfather Lluís's solera Garnatxa — gold shading to red, every vintage since 1997.",
    "caveat": "Book and pay online first — the 11:00 vineyard tours run on set dates only (weekly in August, thin the rest of the year), €27–38 a head, and it's a good fifty minutes from Girona; make it a Cap de Creus morning, not a detour.",
    "person": "Ask for Anna Espelt — she took the reins of the family estate in 2005; trained in habitat restoration, she also farms 25 wild hectares inside the Cap de Creus reserve.",
    "signal_chip": {
      "label": "DO EMP.",
      "full": "DO Empordà — registered estate of the Consell Regulador, 2026 listing",
      "cosign": "and the one large house in the Empordà we'd send a chef to taste at"
    }
  },
  {
    "id": "v21-esperit-roca",
    "cat": "mainland",
    "tier": "several",
    "priority": 21,
    "badge": "Michelin",
    "name": "Esperit Roca",
    "short": "Esperit Roca",
    "lat": 42.0321,
    "lng": 2.8472,
    "neighborhood": "La Fortalesa · Sant Julià de Ramis (10 km N)",
    "tags": [
      "Menus €139/€170",
      "Books 90 days out",
      "Go at lunch, for the views"
    ],
    "productTags": [
      "1 Michelin",
      "Roca",
      "Distillery"
    ],
    "why": "One Michelin star since the 2025 Guide, held into 2026 — earned not for novelty but for how faithfully the Roca brothers' 1893 military fort above Girona serves El Celler's back catalogue — Toda la gamba (2012), Mar y montaña vegetal (2007), the Libro viejo dessert (2017) — rotating with the seasons. Famous as the family's grand project: an 80,000-bottle cellar beneath the dome, their own Esperit Roca distillery — now the kitchen's R&D space — a fifteen-room hotel and the CCR exhibition, ten kilometres north of the old town. To order: the Salty Spirit menu (€170), or the classics à la carte with a distillery pour. Closed Tuesday and Wednesday; dinner Thursday to Saturday only.",
    "address": "Castell de Sant Julià de Ramis, Muntanya dels Sants Metges, Carrer Major s/n, 17481 Sant Julià de Ramis, Girona",
    "phone": "",
    "hours": "Lunch Fri–Mon 13:00–14:30; dinner Thu–Sat 19:30–21:30; closed Tue–Wed. Holiday closure 3–11 Nov 2026; also closed 25 and 31 Dec 2026.",
    "maps": "https://www.google.com/maps/search/?api=1&query=Esperit+Roca+Castell+de+Sant+Juli%C3%A0+de+Ramis",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Esperit+Roca+Castell+de+Sant+Juli%C3%A0+de+Ramis",
    "verdict": "This is El Celler's back catalogue served under its own Michelin star — bookable ninety days out at €170, where the mothership takes eleven months and some €145 more.",
    "signature": "Toda la gamba — Palamós red prawn marinated in seaweed vinegar and katsuobushi; prawn velouté, sauce of the head, crisp legs, citric caviar, a concentrated distillate of the coral.",
    "caveat": "Not El Celler and not pretending to be — this is the archive, refined, not the frontier. You need a car or taxi up the hill from Girona; Tuesdays and Wednesdays are dark; dinner runs only Thursday to Saturday; and €139–170 before wine is real money for revival dishes.",
    "person": "Raül Sillero — head chef; eighteen years inside the Roca ecosystem, previously head chef of Mas Marroch, the family's events estate. His own framing: Esperit is \"El Celler's library of dishes\", not a last-minute outlet.",
    "signal_chip": {
      "label": "1★ 2025",
      "full": "One MICHELIN star, first awarded in Guide España 2025 (gala 26 November 2024, Murcia — one of 32 new one-stars); retained in the 2026 Guide (gala Málaga, November 2025).",
      "cosign": "The star rewards fidelity of execution rather than novelty — which is precisely the offer, and why it holds."
    }
  }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-barri-vell",
  "name": "Barri Vell",
  "center": [
   41.9865,
   2.8248
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Barri+Vell+Girona"
 },
 {
  "id": "n-el-call",
  "name": "El Call",
  "center": [
   41.986,
   2.8255
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=El+Call+Girona"
 },
 {
  "id": "n-mercadal",
  "name": "Mercadal",
  "center": [
   41.9838,
   2.8228
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Mercadal+Girona"
 },
 {
  "id": "n-sant-pere-de-galligants",
  "name": "Sant Pere de Galligants",
  "center": [
   41.9884,
   2.826
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sant+Pere+de+Galligants+Girona"
 },
 {
  "id": "n-sant-feliu",
  "name": "Sant Feliu",
  "center": [
   41.987,
   2.825
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sant+Feliu+Girona"
 },
 {
  "id": "n-onyar-riverfront",
  "name": "Onyar riverfront",
  "center": [
   41.9852,
   2.8242
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Onyar+riverfront+Girona"
 },
 {
  "id": "n-pedret",
  "name": "Pedret",
  "center": [
   41.992,
   2.823
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Pedret+Girona"
 },
 {
  "id": "n-devesa-parc",
  "name": "Devesa / Parc",
  "center": [
   41.988,
   2.815
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Devesa+/+Parc+Girona"
 },
 {
  "id": "n-montjuic-de-girona",
  "name": "Montjuïc de Girona",
  "center": [
   41.99,
   2.83
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Montjuïc+de+Girona+Girona"
 },
 {
  "id": "n-vall-de-sant-daniel",
  "name": "Vall de Sant Daniel",
  "center": [
   41.993,
   2.834
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vall+de+Sant+Daniel+Girona"
 },
 {
  "id": "n-santa-eugenia",
  "name": "Santa Eugènia",
  "center": [
   41.977,
   2.7985
  ],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Santa+Eugènia+Girona"
 }
];
  const WALKS = [
 {
  "id": "w-passeig-de-la-muralla",
  "name": "Passeig de la Muralla",
  "start": [
   41.9862,
   2.8247
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Passeig+de+la+Muralla+Girona"
 },
 {
  "id": "w-the-onyar-bridges",
  "name": "The Onyar bridges",
  "start": [
   41.9862,
   2.8247
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Pont+de+les+Peixateries+Velles+Girona"
 },
 {
  "id": "w-the-call-labyrinth",
  "name": "The Call labyrinth",
  "start": [
   41.9862,
   2.8247
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Carrer+de+la+Forca+Girona"
 },
 {
  "id": "w-vall-de-sant-daniel",
  "name": "Vall de Sant Daniel",
  "start": [
   41.9862,
   2.8247
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vall+de+Sant+Daniel+Girona"
 },
 {
  "id": "w-parc-de-la-devesa",
  "name": "Parc de la Devesa",
  "start": [
   41.9862,
   2.8247
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Parc+de+la+Devesa+Girona"
 },
 {
  "id": "w-castell-de-sant-miquel",
  "name": "Castell de Sant Miquel",
  "start": [
   41.9862,
   2.8247
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Castell+de+Sant+Miquel+Girona"
 },
 {
  "id": "w-the-cathedral-to-sant-feliu-spine",
  "name": "The Cathedral-to-Sant Feliu spine",
  "start": [
   41.9862,
   2.8247
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Basilica+Sant+Feliu+Girona"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-la-fabrica",
  "name": "La Fàbrica",
  "start": [
   41.9862,
   2.8247
  ]
 },
 {
  "id": "p-work-casa-cacao-terrace",
  "name": "Casa Cacao terrace",
  "start": [
   41.9862,
   2.8247
  ]
 },
 {
  "id": "p-work-cafes-on-the-rambla-de-la-llibertat",
  "name": "Cafès on the Rambla de la Llibertat",
  "start": [
   41.9862,
   2.8247
  ]
 },
 {
  "id": "p-work-jardins-dels-alemanys",
  "name": "Jardins dels Alemanys",
  "start": [
   41.9862,
   2.8247
  ]
 },
 {
  "id": "p-work-parc-de-la-devesa-benches",
  "name": "Parc de la Devesa benches",
  "start": [
   41.9862,
   2.8247
  ]
 }
];
  const LANDMARKS = [
 {
  "id": "l-cathedral",
  "name": "Girona Cathedral",
  "coords": [
   41.9873,
   2.8266
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Catedral+de+Girona"
 },
 {
  "id": "l-sant-feliu",
  "name": "Basílica de Sant Feliu",
  "coords": [
   41.9871,
   2.8256
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Basilica+Sant+Feliu+Girona"
 },
 {
  "id": "l-eiffel",
  "name": "Pont de les Peixateries Velles",
  "coords": [
   41.9855,
   2.8238
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Pont+de+les+Peixateries+Velles+Girona"
 },
 {
  "id": "l-onyar",
  "name": "Cases de l'Onyar",
  "coords": [
   41.9852,
   2.8242
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cases+de+l'Onyar+Girona"
 },
 {
  "id": "l-call",
  "name": "El Call",
  "coords": [
   41.986,
   2.8255
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Call+Jueu+Girona"
 },
 {
  "id": "l-galligants",
  "name": "Sant Pere de Galligants",
  "coords": [
   41.9885,
   2.8261
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sant+Pere+de+Galligants+Girona"
 },
 {
  "id": "l-muralla",
  "name": "Passeig de la Muralla",
  "coords": [
   41.984,
   2.8262
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Passeig+de+la+Muralla+Girona"
 },
 {
  "id": "l-cult-girona-cathedral-santa-maria",
  "name": "Girona Cathedral (Santa Maria)",
  "coords": [
   41.9873,
   2.8266
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Catedral+de+Girona"
 },
 {
  "id": "l-cult-museu-d-historia-dels-jueus-call",
  "name": "Museu d'Història dels Jueus (Call)",
  "coords": [
   41.986,
   2.8256
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Museu+Historia+dels+Jueus+Girona"
 },
 {
  "id": "l-cult-basilica-de-sant-feliu",
  "name": "Basílica de Sant Feliu",
  "coords": [
   41.9871,
   2.8256
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Basilica+Sant+Feliu+Girona"
 },
 {
  "id": "l-cult-banys-arabs",
  "name": "Banys Àrabs",
  "coords": [
   41.9878,
   2.8258
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Banys+Arabs+Girona"
 },
 {
  "id": "l-cult-sant-pere-de-galligants",
  "name": "Sant Pere de Galligants",
  "coords": [
   41.9885,
   2.8261
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sant+Pere+de+Galligants+Girona"
 },
 {
  "id": "l-cult-cases-de-l-onyar-the-eiffel-bridge",
  "name": "Cases de l'Onyar & the Eiffel bridge",
  "coords": [
   41.9855,
   2.8242
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cases+de+l'Onyar+Girona"
 },
 {
  "id": "l-cult-casa-maso",
  "name": "Casa Masó",
  "coords": [
   41.9852,
   2.8244
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Casa+Maso+Girona"
 },
 {
  "id": "l-cult-passeig-de-la-muralla",
  "name": "Passeig de la Muralla",
  "coords": [
   41.984,
   2.8262
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Passeig+de+la+Muralla+Girona"
 }
];
  const PHOTOS = [
  {
    "src": "/terroir/Girona-Catalunya/img/girona-onyar.jpg",
    "caption": "The Onyar houses and the Eiffel bridge under the cathedral tower — the city doubling itself in its river.",
    "credit": "kallerna / Wikimedia Commons · CC BY-SA 4.0"
  },
  {
    "src": "/terroir/Girona-Catalunya/img/girona-cathedral.jpg",
    "caption": "Ninety Baroque steps to the door — then one span of vault, wall to wall, no aisles.",
    "credit": "Richard Mortel / Wikimedia Commons · CC BY 2.0"
  },
  {
    "src": "/terroir/Girona-Catalunya/img/girona-call.jpg",
    "caption": "The vaulted passage of Carrer de Sant Llorenç, in the medieval Call.",
    "credit": "Enfo / Wikimedia Commons · CC BY-SA 4.0"
  }
];
  const ET = {
  "label": "Learn it here",
  "text": "Dolors Ros — Massana-trained, author of Parramón's ceramics manuals — founded the Escola de Ceràmica de la Bisbal in 1972 and still teaches the wheel-technique week every single week of the 2026 summer programme; the week-long intensives (throwing, raku, sculptural wheel work fired to 1,250°C — the August sculptural week runs €495 plus €30 materials, with residency on site) take complete beginners and book online until they sell out, which most of this summer's already have. This is the working school of a town that has fired clay since at least 1502, not a paint-a-pot afternoon.",
  "url": "https://esceramicbisbal.com/"
};
  const GEMS = [
  {
    "id": "botifarra-dol-a",
    "pattern": "botifarra dolça",
    "tag": "Food gem · Sweet",
    "name": "Botifarra dolça",
    "story": "Europe's charcuterie map holds one genuine anomaly — a pork sausage cured with sugar, lemon peel and sometimes cinnamon — and it exists only in the Girona region. Barcelona assumes it is an Empordà speciality; the food historian Jaume Fàbrega insists the epicentre is Girona city itself, with La Selva, the Pla de l'Estany and part of the Garrotxa in on the secret. It reached print late — Ferran Agulló first described it in the 1930s — and Josep Pla favoured a monastic origin for which, Fàbrega notes, no proof exists. Salvador Dalí made his Madrid friends eat it at Ca la Teta in Figueres. Born of the farmhouse matança, it now carries the Marca de Garantia Productes de l'Empordà (2003), and is best caramelised with apple — as pudding.",
    "where": "the charcuterie stalls of the Mercat del Lleó in Girona; in Empordà country restaurants it arrives caramelised with apple, at the end of the meal."
  },
  {
    "id": "anxova-de-l-escala",
    "pattern": "anxov(?:a|es)(?: de l['’]Escala)?",
    "tag": "Food gem · Fish",
    "name": "Anxova de l'Escala",
    "story": "L'Escala began in the sixteenth century as a fishermen's quarter dependent on Empúries — whose ruins hold a first-century-AD salting factory, among the oldest on the Iberian peninsula. The village's fortune was salt: once the Alfolí, its salt store, was completed in 1697, cabotage ships landed salt on the old port beach, barrels of anchovy sailed out, and the population quadrupled through the eighteenth century. More than a hundred lateen-rigged sardinal boats once worked this bay; motorised teranyines replaced them in the early twentieth century. L'Escala's municipal archivist, Lurdes Boix, documents an unbroken salting tradition since the 1700s — certified, since 1987, by the Denominació de Qualitat Anxova de l'Escala. The fillets spend roughly eight months under salt before they ever see olive oil.",
    "where": "the salting houses of l'Escala, forty minutes north-east of Girona — Anxoves Solés has salted since 1888 — with the Museu de l'Anxova i de la Sal (2006) to see the barrels and brine first."
  },
  {
    "id": "formatge-garrotxa",
    "pattern": "Garrotxa",
    "tag": "Food gem · Cheese",
    "name": "Formatge Garrotxa",
    "story": "Garrotxa the cheese very nearly outlived the habit of making it. The old farmhouse goat's cheese of these hills had all but disappeared when a recovery project in 1981 — credited by the Generalitat's own product inventory to the neorurals, the back-to-the-land generation — typified it: pasteurised goat's milk, three weeks' minimum maturing, one-kilo wheels sized after the district's old clay moulds. Around Sant Miquel de Campmajor, the young cheesemakers learned from the adviser Enric Canut to coax the pell florida — the grey-blue penicillium bloom that gives the rind its ash colour and the paste its hazelnut finish. The revival's quiet irony: of roughly ten Catalan producers today, exactly one, Mas Claperol, still makes it inside the Garrotxa comarca.",
    "where": "Cal Formatger, Cort Reial 12B, in Girona's old town — Marc Masó's shop (2019) leans hard on Girona-province cheeses; ask what came in from the Garrotxa or the Pla de l'Estany that week."
  },
  {
    "id": "ratafia",
    "pattern": "ratafia",
    "tag": "Food gem · Drink",
    "name": "Ratafia",
    "story": "Every Catalan house that makes ratafia guards its own recipe; the paper trail's oldest, from 1842, comes from La Selva — precisely the comarca whose capital now hosts the liqueur's great festival. The method is fixed by its geographical indication: walnuts picked green around Sant Joan in late June, before the shell hardens, macerated in spirit with — at minimum — lemon verbena, cinnamon, clove and nutmeg, then three months' steeping and three more in wood. Santa Coloma de Farners has run its ratafia competition since 1982, some two hundred homemade bottles entered each November. A Catalan quality denomination since 1985 and today the IGP Ratafia Catalana, it remains at heart a farmhouse solstice ritual — bottled at midsummer, ready by winter.",
    "where": "Santa Coloma de Farners, half an hour south-west of Girona — the Festa de la Ratafia, second weekend of November; the rest of the year, look for the IGP Ratafia Catalana seal on the bottle."
  },
  {
    "id": "esmorzar-de-forquilla",
    "pattern": "esmorzar de forquilla",
    "tag": "Food gem · Tradition",
    "name": "Esmorzar de forquilla",
    "story": "The esmorzar de forquilla — the fork breakfast — is working Catalunya's second breakfast: a bite before dawn, then, mid-morning, cap i pota, tripe, pig's trotters, stewed botifarra, a glass of red. Food writers trace its consolidation to the mid-eighteenth century, with markets as its epicentres — which is why Girona still does it properly. Can Marquès opened in 1920 facing what would later become the Mercat del Lleó, still opens at nine to feed the market opposite, and remains one of the longest-running restaurants in the city. In 2024 the tradition finally got its own book, Laia Freixinet's Esmorzars de forquilla. Around Girona it never needed reviving — in villages like Canet d'Adri, it simply never stopped.",
    "where": "Can Marquès, Plaça Calvet i Rubalcaba 3, opposite the Mercat del Lleó — from 9am, Monday to Saturday; or the twenty-minute drive to Cal Sabater in Canet d'Adri."
  }
];
  const TABLES = {
  "grande": {
    "title": "La Grande Table",
    "desc": "The occasion rooms — stars, cellars, the pilgrimage.",
    "sections": [
      {
        "label": "Three stars — the pilgrimage",
        "ids": [
          "v01-el-celler-de-can-roca"
        ],
        "desc": "One booking, planned like a passage — the reason food people land in this city at all."
      },
      {
        "label": "One star",
        "ids": [
          "v02-restaurant-massana",
          "v03-divinum",
          "v21-esperit-roca"
        ],
        "desc": "The depth of the bench — starred rooms you can actually book this month, not next year."
      }
    ]
  },
  "petite": {
    "title": "La Petite Table",
    "desc": "Everyday Girona — the rooms you return to.",
    "sections": [
      {
        "label": "The Roca universe, everyday",
        "ids": [
          "v04-normal",
          "v05-casa-cacao",
          "v06-rocambolesc"
        ],
        "desc": "The brothers' cooking at street prices — stew, thick chocolate and a cone, all inside three streets."
      },
      {
        "label": "The old houses",
        "ids": [
          "v07-can-marques",
          "v08-casa-marieta",
          "v09-fonda-cal-ros"
        ],
        "desc": "Fourth and fifth generations on the same arcaded squares — Girona's memory, served at lunch."
      },
      {
        "label": "Bistro & rice",
        "ids": [
          "v10-nu",
          "v14-arros-9-by-terram"
        ],
        "desc": "The open bar and the socarrat — where the everyday city eats well without a reservation ritual."
      },
      {
        "label": "Cheese, pastry & coffee",
        "ids": [
          "v11-cal-formatger",
          "v17-can-castello",
          "v18-la-fabrica"
        ],
        "desc": "The province on a counter — grey-rinded goat's cheese, warm xuixos, coffee the roasters ride for."
      },
      {
        "label": "Market & producers",
        "ids": [
          "v19-mercat-del-lleo",
          "v20-espelt-viticultors"
        ],
        "desc": "The larder itself — seven-a.m. fish counters and the tramuntana vineyards behind every good menu."
      }
    ]
  }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, ET, GEMS, TABLES };
})();
