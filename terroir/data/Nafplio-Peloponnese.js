/* Terroir — Nafplio (Ναύπλιο) · Peloponnese — built from the verified gem-standard brief (2026-07) */
window.TERROIR_DATA = (function () {
  const COLORS = {
    "berth": "#c4a35a", "market": "#d97706", "shop": "#059669",
    "wine": "#7c2d12", "mainland": "#7c3aed", "logistics": "#2d4a5e"
  };
  const CAT_LABELS = {
    "berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar / Café",
    "wine": "Winery / Cellar", "mainland": "Out of town", "logistics": "Logistics"
  };
  const PRODUCT_COLORS = {
    "Seafood": "#1d4ed8", "Meze": "#dc2626", "Wine": "#7c2d12",
    "Tsipouro": "#1f2937", "Gelato": "#a16207", "Coffee": "#6b4226",
    "Sweets": "#92400e", "Market": "#d97706"
  };

  const VENUES = [
    {
      "id": "v01-savouras", "cat": "shop", "tier": "berth_top", "priority": 1, "badge": "Seafood",
      "name": "Savouras Fish Tavern", "short": "Savouras",
      "lat": 37.5672, "lng": 22.8000,
      "neighborhood": "Boumpoulinas waterfront — the promenade north of the old town",
      "tags": ["No reservations — arrive before 1pm", "Cash preferred"],
      "productTags": ["Seafood"],
      "why": "The waterfront fish table most visiting chefs name first — a no-frills kitchen on the Boumpoulinas promenade buying daily from Argolic Gulf boats. Simple preparation: charcoal, Nafplio lemon, local olive oil. The kakavia runs out before the lunch crowd arrives.",
      "verdict": "The one the fish-market crowd reaches before the tourist strip gets going — not the prettiest room, the plainest fish.",
      "signature": "Kakavia — the rough Peloponnesian fisherman's soup, bones and all, fragrant with celery, carrot and lemon: what the Argolic Gulf actually tastes like.",
      "person": "The Savouras family, anchoring this corner of the waterfront for several decades.",
      "signal_chip": {
        "label": "Local first choice",
        "full": "The name Nafplio locals give first when asked where to eat fish — not the harbour-front tourist strip",
        "cosign": "and the table to reach before noon or the kakavia runs out"
      },
      "caveat": "No bookings. Arrive before 1pm for the soup; latecomers get the grill but miss the pot. A fish taverna, not a restaurant."
    },
    {
      "id": "v02-omorfo-tavernaki", "cat": "shop", "tier": "berth_top", "priority": 2, "badge": "Meze",
      "name": "To Omorfo Tavernaki", "short": "Omorfo Tavernaki",
      "lat": 37.5681, "lng": 22.8011,
      "neighborhood": "Old town back streets — behind Staikopoulou",
      "tags": ["No reservations — arrive at noon or 7pm", "Family kitchen"],
      "productTags": ["Meze", "Seafood"],
      "why": "A compact back-street family taverna where Nafplio locals go when they want a non-tourist meze without the waterfront premium. Eight or ten tables, a blackboard menu, a kitchen that changes with what the market brought that morning.",
      "verdict": "Not the restaurant with the view — the one behind it, where the food is better and the table costs half as much.",
      "signature": "Dolmades with avgolemono — stuffed vine leaves in bright egg-lemon sauce; then braised Argolid lamb that has had time to think about itself.",
      "person": "The family that has run the kitchen since the late 1990s, cooking by what arrived at the market that morning.",
      "caveat": "Tiny — eight tables inside, a few on the lane. No reservations; arrive at the right time or wait outside."
    },
    {
      "id": "v03-antica-gelateria", "cat": "shop", "tier": "berth_top", "priority": 3, "badge": "Gelato",
      "name": "Antica Gelateria di Roma", "short": "Antica Gelateria",
      "lat": 37.5677, "lng": 22.8009,
      "neighborhood": "Aslipiou arcade — the vaulted pedestrian street in the old town",
      "tags": ["Counter service, no seating", "Summer queues"],
      "productTags": ["Gelato", "Sweets"],
      "why": "Sicilian gelato made with Argolid fruit — figs, pistachios, local honey — by Marcello and Claudia Raffo, who brought the family method from Sicily and opened on the Nafplio arcade in the early 2000s. Greeks drive from Athens for the pistachio; tourists find it by accident.",
      "verdict": "Not the standard Greek ice cream shop — Sicilian method applied to Argolid fruit, and the best thing on the Aslipiou arcade by some distance.",
      "signature": "Pistachio with Aeginetan nuts in summer; fig and Argolid honey in early autumn; mastic and walnut when the other flavours are gone — served in a waffle cone, standing on the arcade steps.",
      "person": "Marcello and Claudia Raffo from Sicily, making it here since the early 2000s.",
      "signal_chip": {
        "label": "Athens drive-worthy",
        "full": "Greeks from Athens drive the 140 km specifically for this gelato — a signal in a country with its own ice cream tradition",
        "cosign": "the pistachio is the reason, but the mastic-walnut is the one that surprises you"
      },
      "caveat": "Counter service only — a queue spot, not a café seat. In July–August expect a queue down the arcade; come at opening or late afternoon."
    },
    {
      "id": "v04-arapakos", "cat": "shop", "tier": "several", "badge": "Seafood",
      "name": "Arapakos", "short": "Arapakos",
      "lat": 37.5670, "lng": 22.8003,
      "neighborhood": "Boumpoulinas waterfront — port end",
      "tags": ["Harbour view", "Nautical décor"],
      "productTags": ["Seafood", "Meze"],
      "why": "The waterfront fish restaurant for a proper evening dinner — better-lit kitchen than the plainer tavernas and a longer card, including drunken mussels in wine, stuffed squid, and crispy calamari with skordalia.",
      "verdict": "The waterfront table to choose when you want a full seafood dinner and the harbour view — not the cheapest room but the most complete card.",
      "signature": "Crispy grilled calamari with skordalia, then stuffed squid in tomato and drunken mussels in white wine and herbs.",
      "person": "The Arapakos family, port-front since the early 2000s, with the nautical touches that name the room.",
      "caveat": "A proper sit-down restaurant; harbour tables book out on summer evenings — call ahead or arrive by 7pm."
    },
    {
      "id": "v05-gastronoulis", "cat": "shop", "tier": "several", "badge": "Meze",
      "name": "GastroNoulis", "short": "GastroNoulis",
      "lat": 37.5682, "lng": 22.8016,
      "neighborhood": "Moutzouridou street — old town interior",
      "tags": ["No reservations", "Modern Greek small plates"],
      "productTags": ["Meze"],
      "why": "The modern-Greek small-plates format — Peloponnese ingredients, creative mezedes, a shorter sharper card than the traditional tavernas — without the Athens price. A husband-and-wife kitchen, no fuss, Peloponnese sourcing.",
      "verdict": "The table for eating like a Nafpliote chef eats at home — small plates, local sourcing, no tourist concessions.",
      "signature": "Roasted aubergine with feta cream and Kalamata olives; then slow-cooked pork with Nemea wine reduction.",
      "person": "Michalis and his partner, who ran a kitchen in Athens before returning to the Peloponnese.",
      "caveat": "No reservations and a small room — summer evenings fill by 8pm."
    },
    {
      "id": "v06-pidalio", "cat": "shop", "tier": "several", "badge": "Meze",
      "name": "Pidálio", "short": "Pidálio",
      "lat": 37.5680, "lng": 22.8012,
      "neighborhood": "Old town — Syntagma area",
      "tags": ["Awarded 2022–2025", "Creative taverna"],
      "productTags": ["Meze", "Seafood"],
      "why": "The awarded creative taverna — the kind of cooking that takes Peloponnese ingredients seriously and presents them without tourist concessions. Won Golden Award from Estiatoria.gr two consecutive years and listed in Golden Plates 2025.",
      "verdict": "The one the Greek food press picked — a creative taverna format that uses the Gulf and the interior plateau with equal intent.",
      "signature": "Grilled octopus with Santorini fava; then lamb chops with wild greens from the Argolid hills.",
      "person": "A young team running a kitchen that takes both the seafood and the upland meat seriously.",
      "signal_chip": {
        "label": "Golden Plates 2025",
        "full": "Golden Award Estiatoria.gr 2022 and 2023; Golden Plates 2025 — among the best tavernas in the Peloponnese",
        "cosign": "one of the few in Nafplio old town to deserve the citation"
      },
      "caveat": "More expensive than the back-street tavernas; book ahead in peak season (July–September)."
    },
    {
      "id": "v07-karonis", "cat": "wine", "tier": "several", "badge": "Tsipouro",
      "name": "Karonis Wine & Spirits", "short": "Karonis",
      "lat": 37.5676, "lng": 22.8010,
      "neighborhood": "Near Syntagma Square — central Nafplio",
      "tags": ["Family shop, multi-generational", "Taste before you buy"],
      "productTags": ["Tsipouro", "Wine"],
      "why": "An old Nafplio family shop selling Greek spirits and wine, where the counter staff will open a bottle for tasting and the range runs from Nemea Agiorgitiko to Peloponnese white PDOs and several tsipouro and ouzo labels.",
      "verdict": "The town's wine and spirits shop — old Nafplio family, taste before you buy, the Nemea labels at the right price.",
      "signature": "A small glass of tsipouro with a bite of local cheese while choosing a bottle of Agiorgitiko to carry north — the Nemea labels at the town price, not the tourist one.",
      "person": "The Karonis family, long established in Nafplio's central food trade.",
      "caveat": "A shop, not a bar — come to taste and buy, not to sit and order a meal."
    },
    {
      "id": "v08-alkioni", "cat": "shop", "tier": "several", "badge": "Wine",
      "name": "Alkioni Wine Bar", "short": "Alkioni",
      "lat": 37.5679, "lng": 22.8013,
      "neighborhood": "Old town interior lanes",
      "tags": ["Greek wine list", "Peloponnese focus"],
      "productTags": ["Wine"],
      "why": "A small wine bar in the old town lanes with a Greek-focused list — Peloponnese labels, by-the-glass Nemea Agiorgitiko, and knowledgeable service on the vineyards around Nafplio and the valley beyond.",
      "verdict": "The old-town wine bar with the serious Peloponnese list — the gap between a tourist glass and a considered bottle.",
      "signature": "A flight of three Nemea Agiorgitikos from different producers — the single best way to understand the range of one valley's grape.",
      "caveat": "Small; fills quickly on summer evenings. Go early or on weeknights."
    },
    {
      "id": "v09-syntagma-morning", "cat": "shop", "tier": "several", "badge": "Coffee",
      "name": "Syntagma Square Morning", "short": "Syntagma café",
      "lat": 37.5683, "lng": 22.8007,
      "neighborhood": "Syntagma Square — the neoclassical heart of the old town",
      "tags": ["Morning light from the east", "All-day café"],
      "productTags": ["Coffee"],
      "why": "The Syntagma morning ritual is an outdoor table with a Greek coffee or frappé and the best-preserved neoclassical square in Greece as the view. The cafés are tourist-priced but the context — the Venetian Arsenal facade, the church, the old Parliament — makes the hour worth it.",
      "verdict": "Not a specific café — the habit of the square. One table, morning light, frappé: the correct way to spend the first two hours in Nafplio.",
      "signature": "Greek coffee in a briki, frappé with sugar and milk, a cold glass of water, a small pastry from the nearest bakery: the four-part Nafplio morning.",
      "caveat": "The square cafés charge tourist premium; the same coffee two streets in costs half as much."
    },
    {
      "id": "v10-loukoumades", "cat": "shop", "tier": "several", "badge": "Sweets",
      "name": "Kentrikon — Loukoumades & Pastry", "short": "Kentrikon",
      "lat": 37.5683, "lng": 22.8005,
      "neighborhood": "Syntagma area — central Nafplio",
      "tags": ["Loukoumades with honey", "Classic Greek pastry"],
      "productTags": ["Sweets", "Coffee"],
      "why": "A central Nafplio pastry shop serving loukoumades — the small fried dough balls drizzled with Peloponnese thyme honey that are the town's most honest sweet — alongside Greek coffee and a small card of local pastries.",
      "verdict": "The loukoumades stop — not the refined kind, the generous kind, dripping with dark thyme honey from the Arcadian hills.",
      "signature": "Loukoumades with Peloponnesian thyme honey and a light cinnamon dusting — still warm from the fryer, eaten standing at the counter.",
      "caveat": "A pastry-and-sweet counter, not a sit-down café. The draw is the loukoumades; don't come expecting a full menu."
    },
    {
      "id": "v11-3sixty", "cat": "shop", "tier": "several", "badge": "Wine",
      "name": "3Sixty Grill & Wine Bar", "short": "3Sixty",
      "lat": 37.5678, "lng": 22.8008,
      "neighborhood": "Old town — Vas. Alexandrou area",
      "tags": ["Boutique hotel restaurant", "Peloponnese wine list"],
      "productTags": ["Wine", "Meze"],
      "why": "The restaurant of the 3Sixty boutique hotel — a better wine list than most standalone restaurants in town, honest grilled meats, and a curated Peloponnese label range that takes local winemaking seriously.",
      "verdict": "The hotel restaurant that outperforms its surroundings — a Peloponnese wine list a standalone bar would be proud of.",
      "signature": "Grilled lamb chops with tzatziki and Nemea-dark fries; the best of the Agiorgitiko labels by the glass.",
      "caveat": "Hotel restaurant pricing; go for the wine list rather than a budget dinner."
    },
    {
      "id": "v12-farmers-market", "cat": "market", "tier": "several", "badge": "Market",
      "name": "Nafplio Farmers Market (Laïki Agorá)", "short": "Farmers Market",
      "lat": 37.5680, "lng": 22.8006,
      "neighborhood": "Near Kolokotronis Square — central Nafplio",
      "tags": ["Wednesday & Saturday", "Argolid produce"],
      "productTags": ["Market"],
      "why": "The weekly laïki agorá brings the Argolid plain into the edge of the old town — Nemea grapes in September, Argolid citrus in winter, wild greens and asparagus in spring, thyme honey and mountain herbs from the Arcadian highlands year-round.",
      "verdict": "The Wednesday or Saturday market: where the Argolid plain and the Arcadian hills show up at a price the restaurant card never does.",
      "signature": "Wild Peloponnese thyme honey, Kalamata olives, Argolid extra-virgin olive oil (early-harvest, green and peppery) at source: the provisions for the rest of the trip.",
      "person": "Small-hold Argolid farmers and hill-village producers who bring only what they grow.",
      "caveat": "A working farmers market, not a tourist market — for provisioning, not browsing. Arrive before 11am; it is done by noon."
    }
  ];

  const NEIGHBORHOODS = [
    {
      "id": "n-psaromachalas",
      "name": "Psaromachalas",
      "lat": 37.5690, "lng": 22.8022,
      "desc": "The old fishermen's quarter at the north-east tip of the peninsula — narrow lanes, laundry overhead, cats on the steps. The oldest continuously inhabited part of Nafplio."
    },
    {
      "id": "n-syntagma",
      "name": "Syntagma Square",
      "lat": 37.5683, "lng": 22.8007,
      "desc": "The central square, ringed with neoclassical buildings — the Venetian Arsenal (now the Archaeological Museum), the old Parliament from the first capital period, and the café ring where the town's mornings unfold."
    },
    {
      "id": "n-staikopoulou",
      "name": "Staikopoulou Street",
      "lat": 37.5679, "lng": 22.8013,
      "desc": "The pedestrian restaurant street running south from the old town — the evening address for eating out, tables from May to October."
    },
    {
      "id": "n-boumpoulinas",
      "name": "Boumpoulinas Waterfront",
      "lat": 37.5668, "lng": 22.8000,
      "desc": "The promenade between the sea and the first row of old town buildings — where the fishing boats tie up, the fish tavernas sit, and the ferry to Bourtzi departs."
    }
  ];

  const WALKS = [
    {
      "id": "w-arvanitia",
      "name": "Arvanitia Promenade",
      "km": 1.5, "time": "30 min",
      "lat": 37.5655, "lng": 22.8042,
      "desc": "A paved sea-cliff walk around the base of Acronauplia from the Boumpoulinas waterfront to Arvanitia beach — flat, beautiful, entirely below the fortification walls with the Argolic Gulf to your left."
    },
    {
      "id": "w-palamidi",
      "name": "Palamidi Steps Climb",
      "km": 2.0, "time": "45–60 min up",
      "lat": 37.5733, "lng": 22.8068,
      "desc": "The 999 steps from Polyzoidou street, rising 216 metres to the fortress gate. Hard in any season but the panorama at the top — the old town, both peninsulas, the full curve of the Argolic Gulf — is the single best view in the Peloponnese."
    },
    {
      "id": "w-psaromachalas",
      "name": "Psaromachalas Old Quarter Loop",
      "km": 2.0, "time": "45 min",
      "lat": 37.5688, "lng": 22.8022,
      "desc": "Through the fishermen's quarter lanes and back via Kapodistrias Street — the walk for reading the neoclassical layers of the first capital, past St. Spyridon church, the old Parliament and the Kolokotronis statue."
    }
  ];

  const WORK_SPOTS = [
    {
      "id": "ws-syntagma",
      "name": "Syntagma Square cafés",
      "lat": 37.5683, "lng": 22.8007,
      "wifi": true,
      "desc": "Morning tables on Syntagma for the first two hours; wifi at all cafés, power at some. Premium pricing but unbeatable light from the east."
    }
  ];

  const LANDMARKS = [
    { "id": "l-beach-arvanitia", "name": "Arvanitia Beach & Promenade", "lat": 37.5655, "lng": 22.8042, "type": "beach" },
    { "id": "l-beach-karathona", "name": "Karathona Beach", "lat": 37.5590, "lng": 22.8105, "type": "beach" },
    { "id": "l-beach-tolo", "name": "Tolo Beach", "lat": 37.5154, "lng": 22.8628, "type": "beach" },
    { "id": "w-arvanitia", "name": "Arvanitia Promenade Walk", "lat": 37.5655, "lng": 22.8042, "type": "walk" },
    { "id": "w-palamidi", "name": "Palamidi Steps (999 steps)", "lat": 37.5733, "lng": 22.8068, "type": "walk" },
    { "id": "w-psaromachalas", "name": "Psaromachalas Old Quarter Loop", "lat": 37.5688, "lng": 22.8022, "type": "walk" },
    { "id": "l-cult-palamidi", "name": "Palamidi Fortress (1711–14)", "lat": 37.5733, "lng": 22.8068, "type": "culture" },
    { "id": "l-cult-bourtzi", "name": "Bourtzi Castle Island", "lat": 37.5648, "lng": 22.7975, "type": "culture" },
    { "id": "l-cult-acronauplia", "name": "Acronauplia (Kastro)", "lat": 37.5670, "lng": 22.7990, "type": "culture" },
    { "id": "l-cult-spyridon", "name": "St. Spyridon Church — Kapodistrias 1831", "lat": 37.5683, "lng": 22.8005, "type": "culture" },
    { "id": "l-cult-museum", "name": "Archaeological Museum (Venetian Arsenal)", "lat": 37.5680, "lng": 22.8008, "type": "culture" },
    { "id": "l-cult-kolokotronis", "name": "Kolokotronis Equestrian Statue", "lat": 37.5690, "lng": 22.8016, "type": "culture" },
    { "id": "p-cof-syntagma", "name": "Syntagma Square Morning Café", "lat": 37.5683, "lng": 22.8007, "type": "cafe" },
    { "id": "p-cof-staikopoulou", "name": "Staikopoulou Evening Terrace", "lat": 37.5679, "lng": 22.8013, "type": "cafe" },
    { "id": "p-gas-market", "name": "Nafplio Farmers Market (Laïki Agorá)", "lat": 37.5680, "lng": 22.8006, "type": "market" },
    { "id": "p-gas-nemea", "name": "Nemea Wine Valley (Agiorgitiko)", "lat": 37.8018, "lng": 22.6667, "type": "gastronomy" }
  ];

  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
