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
    },
    "dishes": [
      {
        "name": "Menú Festival — the full tasting",
        "note": "The only menu — appetiser cavalcade, twelve courses, three desserts; olives to perfume.",
        "kind": "dish"
      },
      {
        "name": "Olives caramelitzades — the bonsai olives",
        "note": "Anchovy-stuffed caramelised olives hung glinting from a bonsai olive tree.",
        "kind": "dish"
      },
      {
        "name": "El món (The World)",
        "note": "Five one-bite world flavours on arms extending from a globe; Peru, Turkey recur.",
        "kind": "dish"
      },
      {
        "name": "Gamba de Palamós marinada",
        "note": "Rice-vinegar-marinated red prawn, head-juice sauce, crisp fried legs, phytoplankton brioche.",
        "kind": "dish"
      },
      {
        "name": "Adaptation of Eternity by Calvin Klein",
        "note": "Bergamot, basil, tangerine, vanilla — the fragrance rebuilt edible, a line since 2001.",
        "kind": "sweet"
      },
      {
        "name": "Josep's wine pairing",
        "note": "Optional €155 pairing; cellar built as five wine 'chapels' — Champagne, Burgundy, Riesling, Priorat, Jerez.",
        "kind": "drink"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Homenatge al Magret d'Ànec Massana (1986)",
        "note": "Grill-charred duck breast, herb oil, rosemary pear — never off the card since 1986.",
        "kind": "dish"
      },
      {
        "name": "Caneló de pularda, escamarlà i crema de ceba dolça",
        "note": "Silky poularde caneló under langoustine and sweet-onion cream — Catalan classic, starred.",
        "kind": "dish"
      },
      {
        "name": "Ceps, gambes i tòfona",
        "note": "Autumn only — raw cep carpaccio, marinated prawns, truffle, pine-nut vinaigrette.",
        "kind": "dish"
      },
      {
        "name": "Ou estrellat",
        "note": "Trompe-l'oeil egg of yoghurt, mango and white chocolate — theatrical finish.",
        "kind": "sweet"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Classic beef steak tartare",
        "note": "Carved and sauced in the room; crowned Spain's best tartare 2022; €38.50.",
        "kind": "dish"
      },
      {
        "name": "Pèsols del Maresme",
        "note": "Spring only — pil-pil broth, cod tripe, truffle shavings; Michelin's named standout.",
        "kind": "dish"
      },
      {
        "name": "Menú Essència with Laura Tejero's pairing",
        "note": "€90 pairing over the €160 menu — the sommelier-led room's whole point.",
        "kind": "drink"
      },
      {
        "name": "The cheese trolley (selecció de formatges)",
        "note": "Twenty-plus wheels — Rey Silo blue, Gargòla del Miracle — €25 to finish.",
        "kind": "dish"
      },
      {
        "name": "Chocolate and walnuts",
        "note": "Casadevall's chocolate slot — his aubergine-Valrhona 'Horta dolça' won Best Chocolate Dessert 2022.",
        "kind": "sweet"
      },
      {
        "name": "Fig-leaf flan ('Figs leaf flam')",
        "note": "House flan, fig-leaf nitro ice cream churned tableside, carob crumble; €15.",
        "kind": "sweet"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Truita Sacha amb carpaccio de gamba vermella",
        "note": "Half-set omelette under raw Palamós prawn carpaccio — homage to Madrid's Sacha.",
        "kind": "dish"
      },
      {
        "name": "Filet Wellington de vedella madurada",
        "note": "Dry-aged beef in glossy pastry, salsa cafè París — the other must-order.",
        "kind": "dish"
      },
      {
        "name": "Tarta al whisky amb gelat de rovell d'ou",
        "note": "Since day one — boozy retro gateau, egg-yolk ice cream; Michelin names it.",
        "kind": "sweet"
      },
      {
        "name": "Croqueta de llet d'ovella Mas Marcè i pernil ibèric",
        "note": "Raw ripollesa ewe's-milk béchamel in a whisper-thin crust; ordered by the piece.",
        "kind": "dish"
      },
      {
        "name": "Els arrossos",
        "note": "Repsol-tipped rices; this carta, dry rice of perol sausage and baby cuttlefish.",
        "kind": "dish"
      },
      {
        "name": "Patates fregides amb maionesa de tòfona i formatge (Bar Normal)",
        "note": "The weeks-old companion bar's calling card — crisp chips, truffle mayonnaise, cheese.",
        "kind": "dish"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Xocolata calenta (thick hot chocolate)",
        "note": "House-roasted, conched metres away; thickened a la taza — dense enough to coat the spoon",
        "kind": "drink"
      },
      {
        "name": "Xuixo Casa Cacao",
        "note": "Girona's fried pastry, warm, filled with 72% Colombian Arhuaco chocolate cream",
        "kind": "sweet"
      },
      {
        "name": "Fartonne",
        "note": "Elongated panettone-dough brioche, made for dunking in the hot chocolate",
        "kind": "sweet"
      },
      {
        "name": "Single-origin bars (Hacienda Victoria 68%, Coop. Norandino 70%, Finca La Rioja 75%)",
        "note": "Ecuador, Piura and Chiapas lots, wrapped in paper made from their cacao husks",
        "kind": "buy"
      },
      {
        "name": "Brunch a La Terrassa",
        "note": "€55 rooftop sitting over the old town; seasonal, small-producer spread",
        "kind": "dish"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Panet",
        "note": "Brioche run hot through the 'Oxymoron Maker'; crackling crust, cold soft-serve heart.",
        "kind": "sweet"
      },
      {
        "name": "Helado de manzana al horno (baked-apple soft-serve)",
        "note": "House classic — baked-apple cream under caramelised apple and buttery biscuit crumbs.",
        "kind": "sweet"
      },
      {
        "name": "Rocanas (the nose)",
        "note": "Strawberry-and-rosewater lolly cast from a 3D scan of Jordi's own nose.",
        "kind": "sweet"
      },
      {
        "name": "Mano Dorada (the Golden Hand)",
        "note": "Jaime Lannister's gilt hand — blood orange, mango, cocoa butter, gold-dusted.",
        "kind": "sweet"
      }
    ]
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
    "person": "Ask for Eugeni Sánchez Marqués — fourth generation; his great-grandparents kept a boarding house here before the Mercat del Lleó was even built.",
    "dishes": [
      {
        "name": "L'arròs del dijous (the Thursday rice)",
        "note": "Thursday is rice day — market-driven arròs, the Mercat del Lleó across the square.",
        "kind": "dish"
      },
      {
        "name": "Botifarra de sal i pebre esparracada amb formatge brie",
        "note": "Salt-and-pepper botifarra torn open under melting brie — old-school market comfort.",
        "kind": "dish"
      },
      {
        "name": "Bacallà amb samfaina i romesco",
        "note": "Salt cod under slow-stewed samfaina, finished with nut-thick romesco.",
        "kind": "dish"
      },
      {
        "name": "Pota i tripa de vedella",
        "note": "Trotter and tripe in one gelatinous stew — proper market-day offal.",
        "kind": "dish"
      },
      {
        "name": "Llengua de vedella estofada amb bolets",
        "note": "Veal tongue braised with mushrooms until it yields to a spoon.",
        "kind": "dish"
      },
      {
        "name": "Escudella i carn d'olla (winter Wednesdays)",
        "note": "Winter Wednesdays only — steaming broth first, then the platter of boiled meats.",
        "kind": "dish"
      }
    ]
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
    "caveat": "Open daily but on rails — lunch 12.30 to 3.30, dinner 7.30 to 10.30, half an hour longer at weekends, nothing between; the arcaded terrace books out first, and nobody here is chasing tasting-menu invention.",
    "dishes": [
      {
        "name": "Ànec amb peres",
        "note": "The old Catalan way — pears turned amber in the duck's roasting juices.",
        "kind": "dish"
      },
      {
        "name": "Canelons Casa Marieta",
        "note": "The grandmother's canelons — the house sells them under its own name.",
        "kind": "dish"
      },
      {
        "name": "Espatlla de xai al forn",
        "note": "Baked whole till the meat loosens from the bone — a listed house classic.",
        "kind": "dish"
      },
      {
        "name": "Sípia amb pèsols",
        "note": "Cuttlefish dice simmered with sweet peas — sea-and-garden Catalan standard.",
        "kind": "dish"
      },
      {
        "name": "Xuixo de Girona",
        "note": "Girona's cream-filled fried pastry, sugar-crusted — made in-house, press calls it legendary.",
        "kind": "sweet"
      }
    ]
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
    "person": "Elena Gascons — she runs the room; brother Marc, on the stoves, has held Els Tinars' Michelin star since 2008.",
    "dishes": [
      {
        "name": "Arròs a la llauna de peix de roca, gambetes i escamarlans",
        "note": "Baked flat in its tin — rockfish, small prawns, langoustines; edges catch crisp.",
        "kind": "dish"
      },
      {
        "name": "Arbre d'embotits artesans",
        "note": "Charcuterie hung on a table-side tree; Torroella de Montgrí cuts, sold by weight.",
        "kind": "dish"
      },
      {
        "name": "Canelons de rostit tradicional",
        "note": "Roast-meat cannelloni ben gratinats — béchamel blistered deep and dark.",
        "kind": "dish"
      },
      {
        "name": "Porró de vi",
        "note": "Empordà vi de pagès drunk from the glass porró, passed round the table.",
        "kind": "drink"
      },
      {
        "name": "Crema catalana tradicional cremada",
        "note": "The traditional burnt crust — a thin caramel lid, cracked with the spoon.",
        "kind": "sweet"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Steak tàrtar de vaca charolesa",
        "note": "Forty-day dry-aged Charolais chopped at the open bar; smoked eel, raisins, pine nuts",
        "kind": "dish"
      },
      {
        "name": "Ostra Gillardeau amb salsa ponzu",
        "note": "Gillardeau No 2 opened to order under ponzu and seven-spice — on since 2023",
        "kind": "dish"
      },
      {
        "name": "Canelons",
        "note": "House caneló, refilled by season — truffled Mas el Cros black chicken, now morel sauce",
        "kind": "dish"
      },
      {
        "name": "Xuixo",
        "note": "Girona's fried pastry made to order — àvia Núria's crema catalana, caramel ice cream",
        "kind": "sweet"
      },
      {
        "name": "Arròs sec",
        "note": "Empordà dry rice, garnish rotating — Palamós prawn veil once, botifarra negra now",
        "kind": "dish"
      }
    ]
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
    "person": "Ask for Marc Masó — he opened the counter in 2019 with his wife Laia Manté; the pair stock it from seventy-odd farmhouse makers, most of them Catalan.",
    "dishes": [
      {
        "name": "Les Safates — the cut-to-order cheese board",
        "note": "Four sizes, Parella €25 to XXL €55 — 'acadèmicament tallats', laid with grace.",
        "kind": "dish"
      },
      {
        "name": "Puigpedrós (Molí de Ger)",
        "note": "Pere Pujol's washed-rind raw cow from Ger — orange rind, Munster-like, intensity 5/5.",
        "kind": "buy"
      },
      {
        "name": "Glauc (Formatgeria Xauxa, Les Preses)",
        "note": "Paula Fonollà's creamy raw-milk blue from Les Preses — Lactium 2021 best Catalan cheese.",
        "kind": "buy"
      },
      {
        "name": "Tou del Lluçanès",
        "note": "Their 'torta de vaca a la catalana' — spoon-soft raw cow's cheese, €15.",
        "kind": "buy"
      },
      {
        "name": "Cervesa Minera",
        "note": "Craft beer brewed in Sant Joan de les Abadesses — full Minera catalogue stocked.",
        "kind": "drink"
      },
      {
        "name": "Audio tast premiats — guided tasting pack",
        "note": "Cheese packs with the shop's audio-guided tastings — at home, or in-shop with makers.",
        "kind": "buy"
      }
    ]
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
    "person": "Adrià Bou — chef of the gastronomic Terram; he builds a separate sofregit and four broths so no two rices taste alike.",
    "dishes": [
      {
        "name": "Arròs del senyorit, de bogavante — sec",
        "note": "Peeled lobster rice, nothing to shell — spoon straight down to the socarrat; minimum two.",
        "kind": "dish"
      },
      {
        "name": "Arròs sec de porc ibèric flambejat",
        "note": "Grill-soaked grains, flambéed presa ibèrica; reviewers singled out the morcilla alioli.",
        "kind": "dish"
      },
      {
        "name": "Arròs negre sec",
        "note": "Squid-ink dry rice with langoustines and saffron lactonesa — scrape the toasted crust.",
        "kind": "dish"
      },
      {
        "name": "Croquetes de rostit tradicional",
        "note": "Three-roast-meat croquettes, molten centre, ordered by the piece.",
        "kind": "dish"
      },
      {
        "name": "Xuixo de Girona flambejat al rom",
        "note": "Girona's cream-filled pastry from Can Castelló, rum-flambéed, with vanilla ice cream.",
        "kind": "sweet"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Xuixo de Crema",
        "note": "The classic, warm — crackling sugar crust into soft egg-rich crema; their best-seller.",
        "kind": "sweet"
      },
      {
        "name": "Xuixo de Crema de Ratafia",
        "note": "Cream cold-infused with ratafia herbs, finished with the Catalan liqueur itself.",
        "kind": "sweet"
      },
      {
        "name": "Xuixo de Cabell d'Àngel",
        "note": "Silky candied-pumpkin strands inside the fried, sugar-rolled lamination.",
        "kind": "sweet"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Flat white",
        "note": "Double shot under foamed milk — beans Meier roasts himself at Espresso Mafia",
        "kind": "drink"
      },
      {
        "name": "Nordic bagel",
        "note": "Herb cream cheese laid on thick, smoked salmon, shaved cucumber",
        "kind": "dish"
      },
      {
        "name": "Fruity Forest",
        "note": "Violet-sugar yoghurt ringed by a kaleidoscope of tropical fruit",
        "kind": "dish"
      },
      {
        "name": "Cafè amb gel",
        "note": "Order iced espresso, cold brew arrives — Meier refuses to ice-shock his roasts",
        "kind": "drink"
      },
      {
        "name": "Pulled pork bagel",
        "note": "Tender pulled pork, melted cheese, bright mango salsa — post-ride fuel",
        "kind": "dish"
      }
    ]
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
    "person": "Ask for Xavi Salvador on the fish line — third-generation, Costa Brava fishmongers since 1966; in 2024 he took over from Peixos Pol, the counter that retired after eighty years.",
    "dishes": [
      {
        "name": "Peix de costa — Peixateria Salvador (parades 74–75, 91–93)",
        "note": "Llançà, Roses and Blanes day-boats — bright-eyed, stiff, smelling of clean sea",
        "kind": "buy"
      },
      {
        "name": "Botifarra dolça",
        "note": "Empordà's sweet pork sausage — sugar and lemon peel; fry with Girona apple",
        "kind": "buy"
      },
      {
        "name": "Poma de Girona (IGP)",
        "note": "Sea-tempered plain-grown apples — Gala, Golden, Granny Smith; EU PGI since 2003",
        "kind": "buy"
      },
      {
        "name": "Bacallà — Món Salat (parades 78–80)",
        "note": "Top-grade salt cod plus brandada, piquillos, olives, bunyols de bacallà",
        "kind": "buy"
      },
      {
        "name": "Formatges de Mas Alba — El Petit Productor (parades 56–59)",
        "note": "The Vilademuls farm's own stall — seven goat cheeses; try Babaus, Petitot",
        "kind": "buy"
      },
      {
        "name": "Salsafins",
        "note": "October-to-April Girona root — sweet, delicate; classically stewed with duck",
        "kind": "buy"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Airam",
        "note": "Grandfather Lluís's solera since 1997 — gold-to-red; rosemary honey, nuts, cinnamon.",
        "kind": "drink"
      },
      {
        "name": "Coma Bruna",
        "note": "Century-old Carinyena on Rabós slate — plum, truffle; Decanter 94 (Evans).",
        "kind": "drink"
      },
      {
        "name": "Sauló",
        "note": "The soulful young Garnatxa–Carinyena — violets, rosemary, garriga herbs; Vinari Gold 2021.",
        "kind": "drink"
      },
      {
        "name": "La Vella",
        "note": "Near-extinct Carinyena Blanca, century vines, cement-egg lees — hazelnut, orange peel.",
        "kind": "drink"
      },
      {
        "name": "Garnatxa de l'Empordà (50 cl)",
        "note": "Bright-amber natural sweet Garnatxa — cherry, honey, herbs; half-bottle for the galley.",
        "kind": "buy"
      },
      {
        "name": "Vinagre de Garnatxa",
        "note": "Garnatxa-only wine vinegar — blackberry-sharp; a teaspoon wakes stews and braises.",
        "kind": "buy"
      }
    ]
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
    },
    "dishes": [
      {
        "name": "Toda la gamba (2012)",
        "note": "Palamós red prawn — seaweed-vinegar marinade, head sauce, crisp legs, coral distillate.",
        "kind": "dish"
      },
      {
        "name": "Mar y montaña vegetal (2007)",
        "note": "Plankton mousse, seaweeds, salicornia, enoki — surf-and-turf rendered wholly in vegetables.",
        "kind": "dish"
      },
      {
        "name": "Brioche de pularda",
        "note": "Poularde brioche with a crackling, Pithiviers-like crust — on the Salty Spirit menu.",
        "kind": "dish"
      },
      {
        "name": "Libro viejo (2017)",
        "note": "Jordi Roca's enfleurage old-book scent over Earl Grey cream, madeleine ice cream, mille-feuille.",
        "kind": "sweet"
      },
      {
        "name": "Ginebra de Té de Roca",
        "note": "House-distilled rock-tea gin — Jasonia glutinosa on Penedès-wine spirit; made to sip neat.",
        "kind": "drink"
      }
    ]
  },
  {
    "id": "v30-can-roca-taiala",
    "cat": "shop",
    "tier": "plenty",
    "priority": 30,
    "badge": "Menú",
    "name": "Can Roca",
    "short": "Can Roca",
    "lat": 41.99429,
    "lng": 2.8063,
    "neighborhood": "Taialà",
    "tags": [
      "menú del dia",
      "Roca family",
      "worth the trek"
    ],
    "why": "The bar Josep Roca and Montserrat Fontané opened in 1967 in working-class Taialà, where the three Roca brothers grew up between the pans — 'the origin of everything', in their own words. It still runs as a casa de menjars: a short slate of firsts and seconds changing daily — spoon dishes, seasonal stews, rice on its appointed day, homemade desserts to close. The €18 menú (verified October 2025) feeds El Celler de Can Roca's own brigade at lunch — seventy-plus cooks and waiters daily, as hard a co-sign as cheap food gets. Weekday lunch only, two sittings; cross the Onyar and keep walking, it is a good 25 minutes north-west of the old town.",
    "address": "Ctra. de Taialà, 42, 17007 Girona",
    "phone": "",
    "hours": "Mon–Fri: bar 6:30–17:00, fork breakfasts 8:30–10:30, menú 13:00–15:30 in two sittings. Closed Sat–Sun.",
    "maps": "https://www.google.com/maps/search/?api=1&query=Can+Roca+Ctra.+de+Taial%C3%A0%2C+42%2C+17007+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Can+Roca+Ctra.+de+Taial%C3%A0%2C+42%2C+17007+Girona",
    "verdict": "The cheapest sit-down meal in the Roca universe — €18 buys lunch from the family kitchen that raised a three-Michelin-star dynasty, and the Celler's own brigade eats it daily.",
    "signature": "The menú's fish day — rap a la marinera, monkfish yielding under a dense marinera sauce that asks for bread.",
    "caveat": "A formica-and-telly neighbourhood bar half an hour's walk from the Barri Vell, weekday lunch only — go for the cooking and the story, not a sighting of the brothers; the menú has crept from €16 (2023) via €17 (spring 2025) to €18 (autumn 2025), and August closing is unverified, so ring 972 20 51 19 before crossing town.",
    "dishes": [
      {
        "name": "Menú del dia",
        "note": "A short slate of firsts and seconds rotating daily — spoon dishes and seasonal stews up front, rice on its appointed day; €18, autumn 2025.",
        "kind": "dish"
      },
      {
        "name": "Rap a la marinera",
        "note": "Monkfish fresh and yielding in a dense marinera that asks for bread — documented on the menú as far back as 2016.",
        "kind": "dish"
      },
      {
        "name": "Calamars a la romana",
        "note": "Doña Montse's own recipe, ordered as an extra over the menú (€10.50, 2023) — a light fry, crisp jacket, the squid tender beneath.",
        "kind": "dish"
      },
      {
        "name": "Esmorzar de forquilla",
        "note": "Fork breakfast, 8:30–10:30 — the working-Girona ritual of stew before ten, added to the bar's slate in 2024.",
        "kind": "dish"
      },
      {
        "name": "Postres casolans",
        "note": "Crema catalana, arròs amb llet, baked apple, lemon mousse — homemade closers; the Rocambolesc gelat on the counter is a 2016 sighting.",
        "kind": "sweet"
      }
    ],
    "person": "Montserrat Fontané — matriarch of the Roca dynasty, at this stove since 1967; turned 90 in June 2026",
    "signal_chip": {
      "label": "Roca HQ",
      "full": "El Celler de Can Roca's staff eat their daily lunch here — Joan Roca sends his three-star brigade, seventy-plus strong, to his parents' dining room between services.",
      "cosign": "The Objective, 2025; Time Out, 2025"
    }
  },
  {
    "id": "v31-dit-i-fet",
    "cat": "shop",
    "tier": "plenty",
    "priority": 31,
    "badge": "Bistró",
    "name": "Dit i Fet",
    "short": "Dit i Fet",
    "lat": 41.9876,
    "lng": 2.8243,
    "neighborhood": "Barri Vell",
    "tags": [
      "ex-Celler crew",
      "seasonal",
      "Barri Vell"
    ],
    "why": "Adrià Edo (kitchen) and Júlia Trota (room) both came out of El Celler de Can Roca before opening this tight seasonal bistro on Carrer dels Calderers, under the shadow of Sant Feliu. Joan Roca names it as his place to eat in his own town — 'it's run by people who had worked with us' — and the 2026 Michelin Guide lists it. The register is Girona product with Celler-trained precision at bistro money: oxtail croquettes, a barely-set Palamós prawn tortilla, cap i pota for the brave, and the city's own xuixo pastry finished on the grill. Kitchen 13:00–15:00 and 20:00–22:30, closed Tuesday and Wednesday — book ahead.",
    "address": "Carrer dels Calderers, 10, baixos, 17004 Girona",
    "phone": "",
    "hours": "Thu–Mon 09:30–17:00 & 19:30–00:30, kitchen 13:00–15:00 / 20:00–22:30 — closed Tue–Wed (official site, 2026)",
    "maps": "https://www.google.com/maps/search/?api=1&query=Dit+i+Fet+Carrer+dels+Calderers%2C+10%2C+baixos%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Dit+i+Fet+Carrer+dels+Calderers%2C+10%2C+baixos%2C+17004+Girona",
    "verdict": "Joan Roca's named pick to eat out in Girona — ex-Celler craft at €40–50 a head, and the 2026 Michelin Guide agrees it belongs on the map.",
    "signature": "★ Tortilla cremosa de gamba de Palamós — a barely-set omelette running with Palamós red prawn, the coast folded into eggs (€24).",
    "caveat": "Closed Tuesday and Wednesday and the secret is out — reserve. At €40–50 a head it sits at the dear end of 'casual', and the short seasonal card means a dish you read about may have rotated off.",
    "dishes": [
      {
        "name": "Tortilla cremosa de gamba de Palamós",
        "note": "Custard-loose centre carrying the sweet iodine of Palamós red prawn — €24, and one of the two dishes the Michelin inspectors single out.",
        "kind": "dish"
      },
      {
        "name": "Croquetes de rabo",
        "note": "Slow-braised tail meat under a shattering crumb — billed as Girona veal-tail in Infobae's 2025 write-up, listed as oxtail croquettes on the current menu.",
        "kind": "dish"
      },
      {
        "name": "Tartar de vieira, oliva manzanilla i piparra",
        "note": "Scallop tartare with manzanilla olive and piparra sauce — the 2026 Michelin inspectors' other named pick.",
        "kind": "dish"
      },
      {
        "name": "Cap i pota",
        "note": "Old-Girona stew of head and trotter, €19.50 on the July 2026 card — offal cookery with Celler discipline; not for the timid.",
        "kind": "dish"
      },
      {
        "name": "Xuixo a la brasa",
        "note": "La Puntual's cream-filled xuixo — Girona's own pastry — charred over the grill with vanilla ice cream melting against warm caramelised sugar; €7.50 of terroir as dessert.",
        "kind": "sweet"
      }
    ],
    "person": "Joan Roca",
    "signal_chip": {
      "label": "Joan Roca",
      "full": "Joan Roca names it his place to eat in Girona — 'run by people who had worked with us' (Infobae, 2025).",
      "cosign": "Listed in the 2026 Michelin Guide España; kitchen and room are both ex-El Celler de Can Roca."
    }
  },
  {
    "id": "v32-safo",
    "cat": "shop",
    "tier": "plenty",
    "priority": 32,
    "badge": "Vi natural",
    "name": "SAFO",
    "short": "SAFO",
    "lat": 41.9826,
    "lng": 2.8248,
    "neighborhood": "Barri Vell — by Plaça del Vi",
    "tags": [
      "natural wine",
      "Mexico × Catalunya",
      "share plates"
    ],
    "why": "Chef Marietta Richter — born in Kenya to a Mexican father, trained through La Pubilla and Gresca in Barcelona — and sommelier Víctor Martín opened this natural-wine bar-à-vins beside Plaça del Vi in 2023: one page of share plates crossing Catalunya with Mexico and Kenya, and a cellar Martín talks you through glass by glass. Joan Roca vouches for it in the most neighbourly terms possible — 'not only our friends and neighbours, they also have very good natural wines. And you eat very well.' The pair took the emerging-chef Cuiner award at Gastronomic Forum Barcelona in 2024, and the cooking is playful and market-led: a crisp octopus quesadilla with avocado cream, a stracciatella galette with grilled bimi, whatever the week allows. In July and August it runs dinner only, Monday to Friday, 19:00 to midnight.",
    "address": "Carrer Nou del Teatre, 2, 17004 Girona",
    "phone": "",
    "hours": "Jul–Aug: Mon–Fri 19:00–24:00, dinner only · rest of year: Tue 20:00–24:00, Wed–Sat 13:00–16:00 & 20:00–24:00; kitchen 13:00–15:30 / 20:00–22:00 (official site, 2026)",
    "maps": "https://www.google.com/maps/search/?api=1&query=SAFO+Carrer+Nou+del+Teatre%2C+2%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=SAFO+Carrer+Nou+del+Teatre%2C+2%2C+17004+Girona",
    "verdict": "Girona's most serious natural-wine room wearing its least serious face — vouched for, in print, by the three-star neighbour up the street.",
    "signature": "★ Crispy octopus quesadilla with avocado cream — Richter's Mexico–Catalunya axis in a single bite.",
    "caveat": "July–August is dinner only, Monday–Friday — and the one-page menu changes constantly, so the dish you read about may be gone. Natural wine means funk: trust Víctor rather than asking for Rioja.",
    "dishes": [
      {
        "name": "Crispy octopus quesadilla, avocado cream",
        "note": "Griddle-blistered tortilla, tender octopus, cool avocado — the house's two homelands on one plate.",
        "kind": "dish"
      },
      {
        "name": "Stracciatella galette with grilled bimi",
        "note": "Milky stracciatella against grilled bimi, chopped nuts and sea fennel — though the galette's topping turns with the market week to week.",
        "kind": "dish"
      },
      {
        "name": "Natural wine by the glass",
        "note": "Víctor Martín's low-intervention cellar, Catalan and beyond — he learned the genre at Barcelona's Bar Brutal; say what you like, let him pour.",
        "kind": "drink"
      }
    ],
    "person": "Joan Roca",
    "signal_chip": {
      "label": "Roca veí",
      "full": "Joan Roca: 'Not only our friends and neighbours — very good natural wines. And you eat very well' (Infobae, 2025).",
      "cosign": "Written up by natural-wine critic Alice Feiring in The Feiring Line; 2024 Cuiner award, Gastronomic Forum Barcelona."
    }
  },
  {
    "id": "v33-nomo-girona",
    "cat": "shop",
    "tier": "plenty",
    "priority": 33,
    "badge": "Japanese",
    "name": "Nomo Girona",
    "short": "Nomo Girona",
    "lat": 41.9817506,
    "lng": 2.8249132,
    "neighborhood": "Barri Vell — Pujada de la Mercè",
    "tags": [
      "Japanese",
      "Garden",
      "Tasting menu"
    ],
    "why": "Barcelona's Grupo Nomo — founded in Gràcia in 2007 by the Molina-Martell brothers, their brother-in-law Ramón Jiménez and Tokyo chef Naoyuki Haginoya — reopened the 1900 Jardins de la Mercè manor in the old quarter in October 2021: four dining rooms wrapped round a protected, city-catalogued romantic garden with a bamboo-screened private corner. Haginoya, formed in Tokyo's sushi bars, izakayas and yakinikus, writes the card — Japanese technique over local, seasonal product, sushi bar to rice and noodle dishes. Order the fourteen-course Menú Naoyuki (€50) or go à la carte, and insist on a garden table. Book ahead in summer — the garden is the point.",
    "address": "Pujada de la Mercè, 10, 17004 Girona",
    "phone": "",
    "hours": "Lunch 13:30–17:00, dinner 20:00–24:00 — but aggregators disagree on days (daily vs closed Monday with Sunday lunch only) and the group site publishes none; confirm on +34 972 22 68 45",
    "maps": "https://www.google.com/maps/search/?api=1&query=Nomo+Girona+Pujada+de+la+Merc%C3%A8%2C+10%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Nomo+Girona+Pujada+de+la+Merc%C3%A8%2C+10%2C+17004+Girona",
    "verdict": "A group outpost that out-sites the town's independents — dining rooms wrapped round a protected, city-catalogued 1900 romantic garden, with a Tokyo-formed partner-chef writing the menu.",
    "signature": "Menú Naoyuki — the chef-partner's fourteen-course €50 set run, truffled edamame through yuzu mochi",
    "caveat": "It is the tenth opening of a twelve-strong Catalan group, not a chef-owner's only room — the same Naoyuki menu runs in Barcelona and Madrid, and it holds no Michelin or Repsol mention; here you are paying, in part, for the garden.",
    "dishes": [
      {
        "name": "Menú Naoyuki (€50)",
        "note": "Fourteen courses — the chef-partner's whole argument in one sitting: truffled fried edamame, sukiyaki croquette, gyu-niku gyoza, ebi chili — izakaya comfort run through Mediterranean product.",
        "kind": "dish"
      },
      {
        "name": "Sukiyaki croquette",
        "note": "Japanese-style oxtail croqueta under hard panko — molten, beefy centre; the house's Catalan-Tokyo handshake in one bite.",
        "kind": "dish"
      },
      {
        "name": "Ebi chili",
        "note": "Spicy prawns with fried egg — Haginoya's Tokyo comfort register, closer to izakaya than sushi counter.",
        "kind": "dish"
      },
      {
        "name": "Butter-fish nigiri",
        "note": "Silky and fat-rich, cut with kimchi sauce and pickled piparras — on the current Naoyuki card.",
        "kind": "dish"
      },
      {
        "name": "Yuzu mochi with white chocolate",
        "note": "The set's current close — citrus sharpness in a soft rice skin; the card rotates, so expect movement here.",
        "kind": "sweet"
      }
    ],
    "person": "Naoyuki Haginoya — Tokyo-raised executive chef and founding partner of Grupo Nomo, formed in Tokyo's sushi bars, izakayas and yakinikus before Barcelona (El Punt Avui, 2021)",
    "signal_chip": {
      "label": "Punt Avui",
      "full": "Opening covered by El Punt Avui (22 October 2021) — the 'emblematic' Jardins de la Mercè manor, with its protected and officially catalogued romantic garden, reopened by the Catalan-Japanese group, chef-partner Naoyuki Haginoya named at the stoves.",
      "cosign": "Gastronomistas (December 2024) reviewed the group's €50, fourteen-course Menú Naoyuki course by course."
    }
  },
  {
    "id": "v34-cul-de-la-lleona",
    "cat": "shop",
    "tier": "plenty",
    "priority": 34,
    "badge": "Nepali",
    "name": "El Cul de la Lleona x Catmandu",
    "short": "El Cul de la Lleona",
    "lat": 41.9875162,
    "lng": 2.8241725,
    "neighborhood": "Barri Vell — Carrer dels Calderers",
    "tags": [
      "Nepali",
      "Momos",
      "Story"
    ],
    "why": "A tiny bar-restaurant on Carrer dels Calderers named for the lioness column on the same street — the twelfth-century statue whose stone backside you kiss so the city will have you back: només podràs tornar a Girona si has fet un petó al cul de la lleona. Rebadged El Cul de la Lleona x Catmandu, it now runs a genuinely Nepali card in one of the old town's most storied corners — momos steamed or fried, dal bhat and sandeko, backed by a proper craft-beer fridge — while the lunch menú del día marries the two kitchens, Nepali chicken curry and chowmein beside calamars and botifarra. Dinner runs Thursday to Saturday only; count €15–20 a head off the house card. Book at weekends — the room is small.",
    "address": "Carrer dels Calderers, 8, 17004 Girona",
    "phone": "",
    "hours": "Mon–Wed & Sun 12:00–16:00; Thu–Fri 12:00–16:00 & 19:30–22:30; Sat 12:00–16:00 & 19:00–23:00",
    "maps": "https://www.google.com/maps/search/?api=1&query=El+Cul+de+la+Lleona+x+Catmandu+Carrer+dels+Calderers%2C+8%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=El+Cul+de+la+Lleona+x+Catmandu+Carrer+dels+Calderers%2C+8%2C+17004+Girona",
    "verdict": "The only Nepali kitchen we could verify inside the Barri Vell — worth the detour for momos beside the lioness gironins kiss to come home, not for fine-dining polish.",
    "signature": "Curry de pollo nepalí — the plate the house itself flags as its most-loved",
    "caveat": "No bylined review or guide mention exists — the signal here is the place, not the press; dinner is Thursday to Saturday only, the city's roster still carries a stale pre-rebrand tapas listing, and historians note the lioness-kissing rite is itself a later embellishment — kissed daily all the same.",
    "dishes": [
      {
        "name": "Mo:mo (5 u, €8–12)",
        "note": "Nepali dumplings five to a plate, veg or meat, steamed or fried — the C-momo version arrives in a tomato-vegetable sauce; the litmus test of any Nepali kitchen.",
        "kind": "dish"
      },
      {
        "name": "Curry de pollo nepalí",
        "note": "Slow, spice-deep, with basmati rice — the house's own site calls it the most appreciated plate on the card, and it anchors the lunch menú too.",
        "kind": "dish"
      },
      {
        "name": "Dal bhat (veg €12 / chicken €14.50)",
        "note": "Nepal's national plate in full — curry, lentil soup, basmati and potato salad on one tray; order it and eat like Kathmandu.",
        "kind": "dish"
      },
      {
        "name": "Vedella a la cassola",
        "note": "Beef stewed in wine and beer with chimichurri and fried vegetables — the Catalan half of the marriage, pure menú-del-dia soul.",
        "kind": "dish"
      },
      {
        "name": "Craft beer from the fridge",
        "note": "Artisan and international bottles chosen to stand up to spice — this is still, at heart, a Girona bar.",
        "kind": "drink"
      }
    ]
  },
  {
    "id": "v35-konig-2",
    "cat": "shop",
    "tier": "plenty",
    "priority": 35,
    "badge": "Frankfurt",
    "name": "König 2",
    "short": "König 2",
    "lat": 41.9856257,
    "lng": 2.8232957,
    "neighborhood": "Mercadal — Plaça de la Independència",
    "tags": [
      "institution",
      "terrace",
      "under €10"
    ],
    "why": "Girona's home-grown fast-food dynasty — Pere Parals came back from a trip to Germany and opened a frankfurt bar in the city centre on 5 February 1973, and the town has queued ever since. The mythology is the bravas: thousands of kilos of potatoes peeled and cut by hand every day, gloved in the house orange sauce — creamy, gently hot — and, per Ara in 2024, outselling beer, water and coffee on the group's tills. The 1973 room on Gran Via is gone, so this arcaded-square branch is the one to visit: order bravas, a frankfurt and a canya on the big terrace and watch the city do the same. Open all day, every day — and still a place where you can eat for under €10 (Ara, 2024).",
    "address": "Plaça de la Independència, 2, 17001 Girona",
    "phone": "",
    "hours": "Daily 09:30–23:00, Fri–Sat until 23:30 (konig.cat, checked July 2026)",
    "maps": "https://www.google.com/maps/search/?api=1&query=K%C3%B6nig+2+Pla%C3%A7a+de+la+Independ%C3%A8ncia%2C+2%2C+17001+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=K%C3%B6nig+2+Pla%C3%A7a+de+la+Independ%C3%A8ncia%2C+2%2C+17001+Girona",
    "verdict": "Bravas, a frankfurt and a canya on the terrace will come in under €15 — in the city of El Celler de Can Roca, the people's institution still feeds you for under €10 (Ara, 2024). If your bill says otherwise, you ordered the 200 g premium burger.",
    "signature": "★ Patates braves amb salsa König — the plate that outsells every drink on the till",
    "caveat": "It's a local chain of eleven branches now (konig.cat, July 2026) — including Barcelona and a shopping-centre outlet — and the original 1973 room was demolished after closing in December 2014. You're visiting the institution's heir, not a time capsule: paper mats, families, speed. Come for the bravas and the square, not for terroir romance.",
    "dishes": [
      {
        "name": "Patates braves",
        "note": "Peeled and cut by hand that morning — thousands of kilos daily across the group — fried to a hard rustle and gloved in the house orange sauce: creamy, gently hot, warmer than allioli, politer than a Madrid brava. The dish that outsells every drink on the menu (Ara, 2024).",
        "kind": "dish"
      },
      {
        "name": "Frankfurt",
        "note": "The 1973 founding order — a snap-skinned German-style sausage of Catalan production in a crusty roll with mustard. Nothing clever, which is the point.",
        "kind": "dish"
      },
      {
        "name": "Hamburguesa 10",
        "note": "Fried egg, bacon, cheese and pink sauce collapsing into one another — 'molt contundent' by Ara's own 2024 warning, and the students' order of record.",
        "kind": "dish"
      },
      {
        "name": "König 1973 lager",
        "note": "The house-badged beer — cold, blameless, built to chase bravas (konig.cat lists it as the group's own brand).",
        "kind": "drink"
      }
    ],
    "person": "Pere Parals — founder, 5 February 1973; his son Marc Parals has run the group since around 2000 (Ara, 2024)",
    "signal_chip": {
      "label": "Since '73",
      "full": "Founded 5 February 1973 by Pere Parals after a trip to Germany; Grup König marked 50 years and its 12th restaurant in 2023 (Caternews Digital); konig.cat lists eleven as of 2026.",
      "cosign": "Ara, 2024 — patatas bravas outsell beer, water and coffee across the group's own tills"
    }
  },
  {
    "id": "v36-zanpanzar",
    "cat": "shop",
    "tier": "plenty",
    "priority": 36,
    "badge": "Pintxos",
    "name": "Zanpanzar",
    "short": "Zanpanzar",
    "lat": 41.98482,
    "lng": 2.82525,
    "neighborhood": "Barri Vell — Cort Reial",
    "tags": [
      "basque counter",
      "food to midnight",
      "count your sticks"
    ],
    "why": "A San Sebastián-style pintxo counter trading in the old town since 28 December 1999 — and the only place in Girona where you can still eat properly as midnight approaches. Trays of hot and cold donostiarra pintxos circulate; you graze standing and settle by toothpick count, the proper Basque arithmetic. The May-2025 handover to a young local team kept the room, the spread and the held-over classics — bravas, pulpo, txuletón — and added a cachopo built for post-service hunger. Evenings run to midnight daily; go by 23:00 for a full counter rather than the remains.",
    "address": "Carrer de la Cort Reial, 10-12, 17004 Girona (tel. 972 212 843)",
    "phone": "",
    "hours": "Evenings daily ~19:00–24:00 (Mon to 23:30 per listings); Sat–Sun also midday service (~12:00–16:00). Post-handover hours drift — ring ahead.",
    "maps": "https://www.google.com/maps/search/?api=1&query=Zanpanzar+Carrer+de+la+Cort+Reial%2C+10-12%2C+17004+Girona+%28tel.+972+212+843%29",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Zanpanzar+Carrer+de+la+Cort+Reial%2C+10-12%2C+17004+Girona+%28tel.+972+212+843%29",
    "verdict": "Walk in at 23:15 and the trays should still be circulating — that is the whole case for the card; if the spread is down to three tired sticks, the new regime has failed the one job the old one never did.",
    "signature": "★ Hot txistorra pintxo off the passing tray — scarlet Basque sausage, its paprika fat soaking the bread beneath",
    "caveat": "Midnight is the hard stop, and the handover is recent — the room and pintxos survived the May-2025 change of hands but the founding owners did not; arrive by 23:00 and treat the ~€2.50-a-stick figure as indicative, to be confirmed at the bar.",
    "dishes": [
      {
        "name": "Txistorra pintxo",
        "note": "hot off the plancha, garlicky and scarlet, the fat staining the bread — the counter's loudest argument",
        "kind": "dish"
      },
      {
        "name": "Tortilla pintxo",
        "note": "cut thick from the omelette, centre just set — the staple you judge any pintxo bar by",
        "kind": "dish"
      },
      {
        "name": "Bacallà amb piperrada",
        "note": "the new team's addition — cod over slow-stewed peppers, Basque to the bone",
        "kind": "dish"
      },
      {
        "name": "Pulpo a la gallega",
        "note": "Galician-style octopus under pimentón and oil — one of the held-over classics from the first 25 years",
        "kind": "dish"
      },
      {
        "name": "Cachopo",
        "note": "the Asturian interloper — breaded veal folded round ham and cheese; a post-service feed if ever there was one",
        "kind": "dish"
      },
      {
        "name": "Patatas bravas",
        "note": "kept through the handover — order them when the pintxo trays slow after 23:00",
        "kind": "dish"
      }
    ],
    "person": "Sam Calvo — kitchen lead since the May-2025 reopening, alongside Noa Coll front-of-house (Diari de Catalunya, 2026)"
  },
  {
    "id": "v37-restaurant-8de7",
    "cat": "shop",
    "tier": "plenty",
    "priority": 37,
    "badge": "Menú",
    "name": "Restaurant 8de7",
    "short": "Restaurant 8de7",
    "lat": 41.98468,
    "lng": 2.82317,
    "neighborhood": "Mercadal",
    "tags": [
      "menú del dia",
      "book ahead",
      "bistronomic"
    ],
    "why": "A small dining room near the Pont de les Peixateries Velles that has quietly become the city's reference for the over-delivering menú — it holds a Guía Repsol Solete. The formula since late 2014: a closed menu of three firsts and three seconds, homestyle bones with bistronomic plating, portions on the generous side of sensible. Weekday menú around €15; Saturday's fuller version runs to ~€19.50; nights switch to author tapas rather than the menú. Lunch sittings from 13:15 fill with office Girona — book or go hungry.",
    "address": "Carrer de les Hortes, 10, 17001 Girona",
    "phone": "",
    "hours": "Lunch Tue–Sat 13:15–16:30 (kitchen to 15:30); dinner Tue–Sat 21:00–24:00 (kitchen to 23:00). Closed Sun–Mon.",
    "maps": "https://www.google.com/maps/search/?api=1&query=Restaurant+8de7+Carrer+de+les+Hortes%2C+10%2C+17001+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Restaurant+8de7+Carrer+de+les+Hortes%2C+10%2C+17001+Girona",
    "verdict": "The best-value serious cooking within walking distance of the Rambla — a Repsol-Solete kitchen at canteen money, which is why its few tables are spoken for by half one.",
    "signature": "Patates braves 8de7 — the house's own reinvention and standing dare: 'no n'heu vist cap d'iguals' — you will not have seen their like.",
    "caveat": "A small room and a closed-choice menú — without a booking you will not get in; Saturday's menú climbs to ~€19.50, past the bargain line, and evenings are à-la-carte author-tapas territory, not menú money.",
    "dishes": [
      {
        "name": "Patates braves 8de7",
        "note": "The calling card, rebuilt the house's own way — order them alongside whatever the menú says.",
        "kind": "dish"
      },
      {
        "name": "Arròs del dia",
        "note": "The menú's rice sittings are the ones regulars book the room out for — the house itself bills its 'arrossos memorables'.",
        "kind": "dish"
      },
      {
        "name": "Canelons",
        "note": "Old-school canelons under gratinated béchamel — grandmother territory given the bistro finish.",
        "kind": "dish"
      },
      {
        "name": "Menú de migdia",
        "note": "Three firsts, three seconds, closed choice — homestyle-modern, plated with more care than the bill implies; ~€15 weekdays.",
        "kind": "dish"
      }
    ],
    "signal_chip": {
      "label": "Solete",
      "full": "Holds a Guía Repsol Solete — the guide's marker for honest, sunny neighbourhood spots.",
      "cosign": "Guía Repsol, listing live 2026"
    }
  },
  {
    "id": "v38-tornes",
    "cat": "shop",
    "tier": "plenty",
    "priority": 38,
    "badge": "Granja",
    "name": "Tornés (Pastisseria Tornés)",
    "short": "Tornés",
    "lat": 41.97386,
    "lng": 2.82057,
    "neighborhood": "Eixample",
    "tags": [
      "granja-canteen",
      "dessert buffet",
      "since 1965"
    ],
    "why": "A family pastisseria founded in 1965 by Joan Tornés and Enriqueta Dalmau — city-listed as an establiment emblemàtic — where the second generation runs a proper lunch canteen behind the cake counter. The menú is deliberately light-handed, three firsts and three seconds off steam, oven and griddle rather than the fryer, because the point is the finish: a buffet of the day's house pastry in individual portions, included in the price. Around €14.50 on weekdays at last firm sighting (2025), €16.50 Saturdays with wine on older datapoints. Lunch 13:00–16:00, Tuesday to Saturday — and the xuixos travel.",
    "address": "Carrer del Migdia, 51, 17003 Girona",
    "phone": "",
    "hours": "Tue–Sat 7:30–20:00, menú 13:00–16:00; Sun/holidays 8:00–13:30, no menú. Closed Mon.",
    "maps": "https://www.google.com/maps/search/?api=1&query=Torn%C3%A9s+Carrer+del+Migdia%2C+51%2C+17003+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Torn%C3%A9s+Carrer+del+Migdia%2C+51%2C+17003+Girona",
    "verdict": "The only menú del dia in Girona that ends at a 60-year-old pastry counter — a dessert buffet stocked by the family's own obrador, for less money than most old-town starters.",
    "signature": "The dessert buffet — individual portions of the day's house pastry, included in a €14.50-odd menú; the finish is the point.",
    "caveat": "A south-Eixample shopping street with zero old-town romance — and the €14.50/€16.50 stickers were last firmly dated 2025 and earlier, so budget €15–17 and confirm; no menú on Sundays, closed Mondays.",
    "dishes": [
      {
        "name": "Menú equilibrat",
        "note": "Three firsts, three seconds — steamed, oven-baked or griddled by design, built so you arrive at dessert with intent.",
        "kind": "dish"
      },
      {
        "name": "Dessert buffet",
        "note": "Individual portions of the day's house pastry, included in the menú — the reason the lunch exists at all.",
        "kind": "sweet"
      },
      {
        "name": "Xuixo",
        "note": "Girona's cream-filled, sugar-crusted fried pastry, made in the house obrador — take one for the walk back.",
        "kind": "buy"
      },
      {
        "name": "Xocolata desfeta",
        "note": "House-made drinking chocolate, thick enough to stand a spoon in — the granja tradition kept honest.",
        "kind": "drink"
      }
    ],
    "person": "Josep Maria Tornés — second-generation pastry chef, running the house with his sister Maria Elena",
    "signal_chip": {
      "label": "Heritage",
      "full": "Listed in Girona city council's official catalogue of Establiments Emblemàtics — the city's register of protected historic shops.",
      "cosign": "Ajuntament de Girona"
    }
  },
  {
    "id": "v39-xocolateria-l-antiga",
    "cat": "shop",
    "tier": "plenty",
    "priority": 39,
    "badge": "Granja",
    "name": "Xocolateria L'Antiga",
    "short": "Xocolateria L'Antiga",
    "lat": 41.98302,
    "lng": 2.82443,
    "neighborhood": "Barri Vell — Plaça del Vi",
    "tags": [
      "xocolata desfeta",
      "est. 1916",
      "granja"
    ],
    "why": "A granja in the old sense — Girona's chocolate house since 1916, two generations deep, marble-topped tables on wrought-iron feet under the arcades of Plaça del Vi, the little terrace staring straight at the town hall. The trade is xocolata desfeta thick enough to coat a spoon, the suïssa capped with whipped cream, and melindros and home-baked coca to drag through the cup; Time Out calls it the best in the city — 'or nearly', in its own careful hedge. Locals also rate the entrepans — fuet on pa de pagès above all. The house's own site says doors open at 7, Monday to Saturday; Sunday hours are published nowhere consistently, so confirm before a special trip.",
    "address": "Plaça del Vi, 8, 17004 Girona",
    "phone": "",
    "hours": "Own site: Mon–Sat 7:00–21:00, no Sunday hours published; hostaleria listing: Mon–Fri 7:00–21:00, Sat 8:00–21:00, Sun 16:00–21:00 with mornings closed out of season; council registry: Mon–Sat 8:00–21:00 — sources differ, confirm Sundays",
    "maps": "https://www.google.com/maps/search/?api=1&query=Xocolateria+L%27Antiga+Pla%C3%A7a+del+Vi%2C+8%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Xocolateria+L%27Antiga+Pla%C3%A7a+del+Vi%2C+8%2C+17004+Girona",
    "verdict": "The nearest thing to a best-in-city call the record allows — Time Out names it 'la millor (o gairebé) xocolata desfeta de Girona' (2018), and the room has been thickening it under the same arcades since 1916.",
    "signature": "Xocolata desfeta amb melindros — near-black, spoon-coating, under the arcades",
    "caveat": "Come for chocolate, coca and entrepans, not coffee-geekery or brunch — the rest of the offer is deliberately plain, and Sunday hours are unreliable (the three published schedules disagree; its own site lists none).",
    "dishes": [
      {
        "name": "Xocolata desfeta amb melindros",
        "note": "Poured near-black and thick enough to coat the spoon; the sponge fingers are for dragging through, not polite dunking",
        "kind": "drink"
      },
      {
        "name": "Xocolata suïssa",
        "note": "The same desfeta buried under a cap of whipped cream — richer than anything has a right to be at 8 am",
        "kind": "drink"
      },
      {
        "name": "Coca casolana",
        "note": "Home-baked and grandmother-plain — built for the cup, not the camera",
        "kind": "sweet"
      },
      {
        "name": "Entrepà de fuet amb pa de pagès",
        "note": "Coarse fuet on country bread — 'boníssim', the savoury order Time Out singles out",
        "kind": "dish"
      }
    ],
    "signal_chip": {
      "label": "Heritage",
      "full": "Listed in the Ajuntament de Girona's Catàleg d'Establiments Emblemàtics — one of the city's oldest bar-cafeterias, trading since 1916",
      "cosign": "Ajuntament de Girona"
    }
  },
  {
    "id": "v40-ca-l-angel",
    "cat": "shop",
    "tier": "plenty",
    "priority": 40,
    "badge": "Forquilla",
    "name": "Ca l'Àngel",
    "short": "Ca l'Àngel",
    "lat": 42.147552,
    "lng": 2.769949,
    "neighborhood": "Melianta, Fontcoberta — 15 min north of Girona (Pla de l'Estany)",
    "tags": [
      "esmorzar de forquilla",
      "since 1978",
      "roadside"
    ],
    "why": "A bar de carretera on the Banyoles–Figueres road, opened in 1978 by Pilar and Àngel and now run by their children — and since January 2025 carrying ElNacional.cat's crown for the best esmorzar de forquilla in the Pla de l'Estany. From 6 in the morning the pots come out: cap i pota, botifarra amb mongetes, meatballs with wild mushrooms, even a fish stew with potatoes and peas — breakfast eaten with fork, knife and a glass of red. The party trick is pudding: a xuixo, Girona's own cream-filled pastry, finished on the grill and flambéed with ratafia. Fifteen minutes by car from the Barri Vell; the weekday lunch menú is €16 but esmorzar prices aren't published — ring 972 57 50 99.",
    "address": "Ctra. de Banyoles a Figueres, 29, 17833 Fontcoberta (urb. Melianta)",
    "phone": "",
    "hours": "Mon–Fri 6:00–16:30, Sat 6:00–12:00; closed Sundays and holidays (official site, accessed July 2026 — ElNacional gave 6:30–16:00 in January 2025)",
    "maps": "https://www.google.com/maps/search/?api=1&query=Ca+l%27%C3%80ngel+Ctra.+de+Banyoles+a+Figueres%2C+29%2C+17833+Fontcoberta+%28urb.+Melianta%29",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Ca+l%27%C3%80ngel+Ctra.+de+Banyoles+a+Figueres%2C+29%2C+17833+Fontcoberta+%28urb.+Melianta%29",
    "verdict": "The best esmorzar de forquilla within a 20-minute drive of Girona — ElNacional.cat crowned it the finest in the Pla de l'Estany (2025), and the 6 am opening tells you exactly who it feeds.",
    "signature": "Cap i pota at breakfast — the forquilla litmus test, with bread and a glass of red",
    "caveat": "It is a roadside bar in a residential estate, not a pretty room — Catalan-first, function over decor, closed Sundays and holidays with Saturday shutting at noon, and you need a car; arrive hungry and early, this is stew before 9 am.",
    "dishes": [
      {
        "name": "Cap i pota",
        "note": "Gelatinous, paprika-glossed head-and-trotter stew — wobbling, sticky-lipped, and on the table before most of Girona has had coffee",
        "kind": "dish"
      },
      {
        "name": "Botifarra amb mongetes",
        "note": "Grill-charred sausage over creamy white beans slicked with the pan fat",
        "kind": "dish"
      },
      {
        "name": "Mandonguilles amb bolets",
        "note": "Meatballs in a woodland-dark wild-mushroom sauce — the house stews are the reputation",
        "kind": "dish"
      },
      {
        "name": "Estofat de peix amb patates i pèsols",
        "note": "A briny fish stew with potatoes and peas, served at breakfast without irony",
        "kind": "dish"
      },
      {
        "name": "Xuixo a la brasa amb ratafia",
        "note": "Girona's cream-filled pastry re-crisped over the grill and flambéed with ratafia — the one flourish in an otherwise sober house",
        "kind": "sweet"
      }
    ],
    "person": "Àngel and Marta Castellà — second generation of the founding Castellà–Moiset family, with Marta's husband Salvador; their parents Pilar and Àngel opened the house in 1978 (ElNacional.cat, 2025)",
    "signal_chip": {
      "label": "ElNac '25",
      "full": "ElNacional.cat (January 2025): 'el millor esmorzar de forquilla del Pla de l'Estany' — a sensational roadside bar",
      "cosign": "ElNacional.cat"
    }
  },
  {
    "id": "v41-federal-cafe",
    "cat": "shop",
    "tier": "plenty",
    "priority": 41,
    "badge": "Brunch",
    "name": "Federal Cafè",
    "short": "Federal Cafè",
    "lat": 41.985668,
    "lng": 2.825203,
    "neighborhood": "Barri Vell — Carrer de la Força (the Call)",
    "tags": [
      "all-day brunch",
      "Aussie café",
      "cyclist-friendly"
    ],
    "why": "Australian brunch culture on the Roman Via Augusta: Federal — the café Tommy Tang and Crick King opened in Barcelona in 2010 and named after a hamlet in the hills above Byron Bay — runs this multi-level house on Carrer de la Força, the old Roman road through the Jewish quarter. It is the Barri Vell's fullest brunch kitchen: eggs done many ways (Time Out counted nine), eggs Benedict among them, avocado on rye sharpened with lemon and black sesame, burgers before noon and flat whites to Antipodean spec. Vegetarian-heavy, allergen-labelled, laptop-tolerant, with secure bike storage — cyclist Girona's other clubhouse. Reckon about €20 a head; published hours conflict, so check before a special trip.",
    "address": "Carrer de la Força, 9, 17004 Girona",
    "phone": "",
    "hours": "Daily from ~8:30 (recent listings give 8:30–16:00); older directories run to 23:00 and Time Out serves brunch 9:00–13:00 — closing time conflicts across sources, confirm with the café (872 264 515)",
    "maps": "https://www.google.com/maps/search/?api=1&query=Federal+Caf%C3%A8+Carrer+de+la+For%C3%A7a%2C+9%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Federal+Caf%C3%A8+Carrer+de+la+For%C3%A7a%2C+9%2C+17004+Girona",
    "verdict": "The fullest brunch menu inside the old walls — nine egg dishes and burgers before noon, a range neither La Fàbrica (bowls, toast, bagels) nor Espresso Mafia (sweet things only) attempts.",
    "signature": "Eggs Benedict under silky hollandaise, eaten on the shaded Força patio",
    "caveat": "This is the Girona outpost of a Barcelona-born group with branches from Madrid to Palma — you come for Antipodean comfort done properly, not for Girona terroir; and its published hours exist in at least three conflicting versions.",
    "dishes": [
      {
        "name": "Eggs Benedict",
        "note": "Poached just-runny under silky hollandaise — the order the listings keep coming back to",
        "kind": "dish"
      },
      {
        "name": "Avocado toast",
        "note": "On rye, sharpened with lemon and black sesame",
        "kind": "dish"
      },
      {
        "name": "Halloumi burger",
        "note": "Brunch that eats like lunch — squeaky halloumi in a proper bun, one of the morning hamburgers Time Out flags",
        "kind": "dish"
      },
      {
        "name": "Flat white",
        "note": "Silky, to Antipodean spec — the founding argument of the whole group",
        "kind": "drink"
      }
    ],
    "person": "Tommy Tang and Crick King — the Australian founders of the Federal group, begun in Barcelona in 2010 (Economía 3; Infocif)",
    "signal_chip": {
      "label": "Time Out",
      "full": "Featured in Time Out's 'Els millors esmorzars de Girona' — nine egg preparations and its cosmopolitan morning room called out",
      "cosign": "Time Out Girona"
    }
  },
  {
    "id": "v42-sunset-jazz-club",
    "cat": "shop",
    "tier": "plenty",
    "priority": 42,
    "badge": "Jazz bar",
    "name": "Sunset Jazz Club",
    "short": "Sunset Jazz Club",
    "lat": 41.98895,
    "lng": 2.82426,
    "neighborhood": "Barri Vell — Pou Rodó / Sant Feliu",
    "tags": [
      "live jazz",
      "drinks only",
      "to 01:30–03:00"
    ],
    "why": "A roughly 50-seat jazz cave under a stone-vaulted ceiling behind Carrer de la Barca, open since 3 November 2001 and this year listed by DownBeat magazine among the best jazz clubs in the world, alongside Barcelona's Jamboree — reported by Ara in February 2026. Anna Gisbert co-founded it with Albert Perejoan; musician-journalist Alix Levy has programmed it since 2011, pulling players of the order of Scott Hamilton, Chano Domínguez and Jorge Rossy into a room the size of a wine cellar. Doors from 19:00, and the posted hours run to 01:30 most nights and 03:00 on Friday and Saturday — the 22:00 Saturday set carries you well past midnight, and this is where Girona actually stays up. There is no kitchen: you come for the glass and the second set.",
    "address": "Carrer de Jaume Pons i Martí, 12, 17004 Girona",
    "phone": "",
    "hours": "Posted spring-2026 hours: Mon, Tue, Thu, Sun and holidays 19:00–01:30; Fri–Sat and holiday eves 19:00–03:00; no Wednesday listed. July–Aug: Thu outdoor sets 20:00 + 21:30, Sat indoor gigs 22:00 — check the programme.",
    "maps": "https://www.google.com/maps/search/?api=1&query=Sunset+Jazz+Club+Carrer+de+Jaume+Pons+i+Mart%C3%AD%2C+12%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=Sunset+Jazz+Club+Carrer+de+Jaume+Pons+i+Mart%C3%AD%2C+12%2C+17004+Girona",
    "verdict": "After midnight Girona's choice is this or a rumba bar — and only one of the two is on a DownBeat list; if you need food rather than music with your last drink, this card is not your answer and nothing in the city is.",
    "signature": "★ The Saturday 22:00 second set, glass in hand, under the stone vault",
    "caveat": "Nothing to eat beyond the glass — no kitchen at all; and it is a ~50-cap room sustained by some 120 dues-paying members, so on name nights arrive at doors or you will be listening from the lane. Wednesday is absent from the posted hours — check before crossing town.",
    "dishes": [
      {
        "name": "Copa at the vault bar",
        "note": "a slow drink through the second set is the whole offer — take it under the stone ceiling and don't ask for a menu",
        "kind": "drink"
      },
      {
        "name": "Jazz a la Fresca first drink",
        "note": "the summer outdoor sets are free with an obligatory first drink — a €5 supplement applies only if weather moves the gig indoors (programme, 2026)",
        "kind": "drink"
      }
    ],
    "person": "Alix Levy — musician and journalist, programmer and co-runner since 2011 with co-founder Anna Gisbert (Ara, 2026)",
    "signal_chip": {
      "label": "DownBeat",
      "full": "Listed by DownBeat magazine among the best jazz clubs in the world, alongside Barcelona's Jamboree — reported February 2026",
      "cosign": "DownBeat magazine"
    }
  },
  {
    "id": "v43-konig-sandwiches",
    "cat": "shop",
    "tier": "plenty",
    "priority": 43,
    "badge": "Braves",
    "name": "König Sandwiches",
    "short": "König Sandwiches",
    "lat": 41.9878,
    "lng": 2.82427,
    "neighborhood": "Barri Vell — Plaça Sant Feliu",
    "tags": [
      "since 1973",
      "kitchen to 23:30",
      "fast-casual"
    ],
    "why": "Girona's home-grown fast-food dynasty: Pere Parals came back from Germany in 1973 and opened a frankfurter counter on Gran Via that served sandwiches late into the night — the group now runs four sites in the city, and this Calderers branch puts terrace tables under Sant Feliu's steps, a minute from the lioness's backside. The reason to come is statistical: the patates braves are the single best-selling item across every König, ahead of any individual drink — water, beer or coffee — per the Ara profile of 2024. Burgers use meat from Casa Baldiró in Banyoles, a supplier of roughly fifty years' standing, washed down with own-label König 1973 beer. Kitchen to 23:00, 23:30 on Friday and Saturday — which, in this city, is what late means.",
    "address": "Carrer dels Calderers, 16, 17004 Girona",
    "phone": "",
    "hours": "Daily 9:30–23:00; Fri–Sat until 23:30 (own site, July 2026).",
    "maps": "https://www.google.com/maps/search/?api=1&query=K%C3%B6nig+Sandwiches+Carrer+dels+Calderers%2C+16%2C+17004+Girona",
    "maps_url": "https://www.google.com/maps/search/?api=1&query=K%C3%B6nig+Sandwiches+Carrer+dels+Calderers%2C+16%2C+17004+Girona",
    "verdict": "Order the braves at 22:45 — if a plate of crisp cubes that outsells water across an entire restaurant group doesn't read as dinner after service, nothing in Girona will at that hour; judge it as the fast-casual counter it proudly is, not as a restaurant.",
    "signature": "★ Patates braves — the group's best-selling item, ahead of every drink line including water (Ara, 2024)",
    "caveat": "Late here means 23:00 sharp, 23:30 Friday–Saturday — miss it and you are down to Zanpanzar's pintxo trays until midnight, and after that nothing hot in the city; and it is trays-and-paper fast-casual, not a place you linger.",
    "dishes": [
      {
        "name": "Patates braves",
        "note": "crisp-edged cubes under the house brava sauce — potatoes peeled and cut by hand in the group's own workshop; the best-seller across all branches",
        "kind": "dish"
      },
      {
        "name": "Hamburger",
        "note": "meat from Casa Baldiró in Banyoles, a ~50-year supplier — take it with braves alongside, not instead",
        "kind": "dish"
      },
      {
        "name": "Munich-style frankfurt",
        "note": "the founding trade — the German sausage line that started the whole dynasty in 1973",
        "kind": "dish"
      },
      {
        "name": "König 1973 house beer",
        "note": "the own-badge label — the right cold wash for brava sauce at 22:50",
        "kind": "drink"
      }
    ],
    "person": "Marc Parals — second generation, running the group since around 2000; son of founder Pere Parals (Ara, 2024)",
    "signal_chip": {
      "label": "Ara 2024",
      "full": "Ara/Mengem profile: 'the Girona restaurant that sells more braves than waters'",
      "cosign": "Ara (Mengem)"
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
    "desc": "The occasion rooms — stars, cellars, the pilgrimage. One family built the whole ladder: €315 at the Celler eleven months out, €170 at the fort ninety days out — book the table before you book the flights.",
    "sections": [
      {
        "label": "Three stars — the pilgrimage",
        "ids": [
          "v01-el-celler-de-can-roca"
        ],
        "desc": "One booking, planned like a passage — €315 before the pairing — and the reason food people land here at all."
      },
      {
        "label": "One star",
        "ids": [
          "v02-restaurant-massana",
          "v03-divinum",
          "v21-esperit-roca"
        ],
        "desc": "The deepest small-city bench in Europe after the ceiling — €80–170 rooms bookable this month, not next year."
      }
    ]
  },
  "petite": {
    "title": "La Petite Table",
    "desc": "Everyday Girona — the rooms you return to. Three currencies fund these tables — the AVE day-trip euro, the cycling euro that spends like a resident, and the local euro that keeps the menú del dia honest. Spend where repeat custom disciplines the cooking, not on the photo-menu terraces paying tourist-flat rents.",
    "sections": [
      {
        "label": "The Roca universe, everyday",
        "ids": [
          "v04-normal",
          "v05-casa-cacao",
          "v06-rocambolesc"
        ],
        "desc": "The constellation that makes the city legible — stew, thick chocolate, a cone on the walk home, at street prices."
      },
      {
        "label": "The old houses",
        "ids": [
          "v07-can-marques",
          "v08-casa-marieta",
          "v09-fonda-cal-ros"
        ],
        "desc": "Girona's memory at lunch — feeding the arcaded squares since 1920 and 1892, four and five generations in."
      },
      {
        "label": "Bistro & rice",
        "ids": [
          "v10-nu",
          "v14-arros-9-by-terram"
        ],
        "desc": "A normal lunch done properly — the open bar and the socarrat, no reservation ritual."
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
        "desc": "The larder itself — the seven-a.m. fish counters, the sugared botifarra dolça on the charcuterie stalls, the tramuntana cellars where the person pouring signed the label."
      },
      {
        "label": "Where the chefs eat",
        "ids": [
          "v30-can-roca-taiala",
          "v31-dit-i-fet",
          "v32-safo"
        ],
        "desc": "Where the aprons go on the night off — the family menú, the ex-Celler bistro, the natural-wine room the brothers vouch for."
      },
      {
        "label": "Ethnic tables — the special ones",
        "ids": [
          "v33-nomo-girona",
          "v34-cul-de-la-lleona"
        ],
        "desc": "Girona's honest short list — only two non-Catalan kitchens clear our bar, and both earn the walk."
      },
      {
        "label": "Neighborhood gems & dives",
        "ids": [
          "v35-konig-2",
          "v36-zanpanzar"
        ],
        "desc": "Bravas, frankfurts and pintxo counters — under €15 a head in the city of the €315 tasting."
      },
      {
        "label": "Bargain plates",
        "ids": [
          "v37-restaurant-8de7",
          "v38-tornes"
        ],
        "desc": "Exceptional plates at canteen money — a Solete menú and the world-champion xuixo house; the €18 Roca family table sits under Where the chefs eat."
      },
      {
        "label": "Breakfast & brunch",
        "ids": [
          "v39-xocolateria-l-antiga",
          "v40-ca-l-angel",
          "v41-federal-cafe"
        ],
        "desc": "The morning city — thick suís in a heritage granja, the province's best fork breakfast, eggs before noon inside the walls."
      },
      {
        "label": "Late night — after service",
        "ids": [
          "v42-sunset-jazz-club",
          "v43-konig-sandwiches"
        ],
        "desc": "Girona shuts early; this is what honestly remains after midnight — jazz on a DownBeat list, the braves that outsell water, and Zanpanzar's trays running past 23:00."
      }
    ]
  }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, ET, GEMS, TABLES };
})();
