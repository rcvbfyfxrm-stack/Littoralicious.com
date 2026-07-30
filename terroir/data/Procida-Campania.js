/* Terroir — Procida · Campania · Phlegraean Archipelago — built from the verified gem-standard brief (2026-07) */
window.TERROIR_DATA = (function () {
  const COLORS = {
    "berth": "#c4a35a",
    "market": "#d97706",
    "shop": "#059669",
    "mainland": "#7c3aed",
    "logistics": "#2d4a5e"
  };
  const CAT_LABELS = {
    "berth": "Signature",
    "market": "Market / Direct",
    "shop": "Restaurant / Bar",
    "mainland": "Out of island",
    "logistics": "Logistics"
  };
  const PRODUCT_COLORS = {
    "Seafood": "#3b82f6",
    "Limone": "#f59e0b",
    "Pastry": "#92400e",
    "Bar": "#7c3aed",
    "Rabbit": "#059669",
    "Market": "#d97706",
    "Pizza": "#dc2626",
    "Urchin": "#2d4a5e"
  };
  const VENUES = [
    {
      "id": "v01-gorgonia",
      "cat": "shop",
      "tier": "berth_top",
      "priority": 1,
      "badge": "Seafood",
      "name": "Ristorante Gorgonia",
      "short": "Gorgonia",
      "lat": 40.7640,
      "lng": 14.0225,
      "neighborhood": "Corricella harbor — Via Marina di Corricella, harbor terrace, one tier above the water",
      "tags": [
        "EUR 35–55 pp",
        "Book ahead in season; terrace fills by noon",
        "Lunch, harbor-front terrace"
      ],
      "productTags": ["Seafood", "Urchin", "Limone"],
      "why": "The harbor-front table locals use when the catch is exceptional — not the tourist tables under the main pergola but the lower deck, one tier above the waterline. Open since the 1980s, run by the Lubrano family. To order: spaghetti ai ricci di mare (raw sea urchin, lemon, olive oil — available Oct–Mar when the spines are legally harvestable and genuinely full) or spaghetti alle canocchie (mantis shrimp torn apart by hand, then briefly cooked with garlic and white wine). Phone confirmed: +39 081 810 1060. Ricci are seasonal and rationed — the kitchen won't serve them out of season, and you should not ask.",
      "verdict": "The house locals use when the catch is worth celebrating — the lower Corricella deck, not the pergola seats under the tourist circuit.",
      "signature": "Raw sea urchin over spaghetti: briny, ocean-cold, with a thread of lemon oil.",
      "person": "The Lubrano family, Corricella; running the terrace since the 1980s.",
      "signal_chip": {"label": "Yelp confirmed", "full": "Independently listed on Yelp with phone +39 081 810 1060 and address Via Marina di Corricella 50", "cosign": "and the table we would book before any other on the island"},
      "caveat": "Ricci strictly seasonal (Oct–Mar). Not for a rushed midday stop; the terrace is meant to last two hours.",
      "address": "Via Marina di Corricella 50, 80079 Procida (NA), Italy",
      "phone": "+39 081 810 1060",
      "hours": "Lunch, harbor-front terrace",
      "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Gorgonia+Procida+Italy"
    },
    {
      "id": "v02-la-medusa",
      "cat": "shop",
      "tier": "berth_top",
      "priority": 2,
      "badge": "Seafood",
      "name": "Ristorante La Medusa",
      "short": "La Medusa",
      "lat": 40.7658,
      "lng": 14.0270,
      "neighborhood": "Marina Grande — Via Roma 116, the island's main harbor street",
      "tags": [
        "EUR 30–50 pp",
        "Cards accepted; reservations recommended in summer",
        "Lunch and dinner, year-round"
      ],
      "productTags": ["Seafood", "Limone"],
      "why": "Founded 1954 — the oldest restaurant still operating at the main port, predating the film-tourism wave by four decades. Its consistency across generations is its credential. To order: the antipasto di mare followed by spaghetti con i totanelli (tiny squid pulled apart by hand, olive oil, garlic, white wine — the kitchen prepares whatever the boats brought in that morning). Reliable year-round when others on the island are shuttered for winter. Specific owner name not independently verified. Not for anyone expecting a curated menu: this is a daily-catch operation, not a tasting-menu room.",
      "verdict": "The island's oldest harbor table — 1954, before the film, before the tourists. Year-round when everything else closes.",
      "signature": "Totanelli in white: tiny squid, garlic, parsley, white wine — no tomato, no theatre.",
      "signal_chip": {"label": "Est. 1954", "full": "Founded 1954 — the oldest continuously operating restaurant at Marina Grande, confirmed by multiple local travel accounts", "cosign": "the right choice when everything else is closed"},
      "caveat": "Not for a curated menu or wine list. Daily-catch operation: you eat what the boats brought in.",
      "address": "Via Roma 116, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Lunch and dinner, year-round",
      "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+La+Medusa+Via+Roma+Procida+Italy"
    },
    {
      "id": "v03-caracale",
      "cat": "shop",
      "tier": "berth_top",
      "priority": 3,
      "badge": "Seafood",
      "name": "Ristorante Caracalè",
      "short": "Caracalè",
      "lat": 40.7638,
      "lng": 14.0220,
      "neighborhood": "Corricella harbor — Via Marina di Corricella 45, a former boat-repair depot",
      "tags": [
        "EUR 40–65 pp",
        "Reservations essential — books quickly in July–August",
        "Dinner, harbor-front tables"
      ],
      "productTags": ["Seafood", "Limone"],
      "why": "A restored former boat-repair depot on the Corricella waterfront, converted into a kitchen and sea-level terrace — the only table on the harbor where the full arc of pastel houses wraps you in 270 degrees. Documented in multiple Procida travel accounts as the island's special-occasion address. To order: totani ripieni (squid stuffed with breadcrumbs, anchovies, capers, herbs, baked in their own ink) and the insalata di limone di Procida, sliced tableside. Chef/owner name not independently verified. Not for a rushed meal: the table is built for two hours and the view earns it.",
      "verdict": "The full Corricella arc wraps you in 270 degrees from this converted boat depot — the special-occasion address on the island.",
      "signature": "Stuffed squid baked in its own ink: savory, ocean-dark, capers cutting the depth.",
      "signal_chip": {"label": "Address confirmed", "full": "Listed at Via Marina di Corricella 45, cross-confirmed in multiple Procida restaurant guides", "cosign": "the only table where all the pastel houses close around you"},
      "caveat": "Not for a rushed evening. Reservations essential in high season. Chef name not independently verified.",
      "address": "Via Marina di Corricella 45, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Dinner, harbor-front tables",
      "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Caracalè+Corricella+Procida+Italy"
    },
    {
      "id": "v04-dal-cavaliere",
      "cat": "shop",
      "tier": "several",
      "priority": 4,
      "badge": "Pastry",
      "name": "Bar dal Cavaliere",
      "short": "Dal Cavaliere",
      "lat": 40.7655,
      "lng": 14.0268,
      "neighborhood": "Marina Grande — Piazza dei Martiri, the island's main square, where the ferry logic meets village ritual",
      "tags": [
        "EUR 3–8 (pastry + coffee)",
        "Walk-in; queue early on Sundays",
        "Morning ritual — open from 06:30"
      ],
      "productTags": ["Pastry", "Limone", "Bar"],
      "why": "The island's pastry anchor on the main square, non-negotiable. To order: Lingue di Bue — flat puff-pastry tongues filled with crema di limone di Procida (made with albedo and zest, not just juice — so it carries the full aromatic intensity, the scent both floral and resinous). Also: the cioccolato version, and a caffè or granita di limone in the morning heat. A confirmed listing with address Via Roma 42, cross-referenced on Yelp. Owner name not independently verified. Not for a quiet sit-down: the piazza fills quickly after Mass on Sundays.",
      "verdict": "Non-negotiable Sunday stop: Lingue di Bue and a granita di limone while the piazza fills after Mass.",
      "signature": "Lingue di Bue: crisp pastry tongue, lemon cream dense with albedo and zest, powdered sugar.",
      "signal_chip": {"label": "Procida essential", "full": "Confirmed listing at Piazza dei Martiri / Via Roma 42, cross-referenced across multiple Procida visitor accounts", "cosign": "the most reliable morning ritual on the island"},
      "caveat": "A stand-at-the-bar pastry stop, not a sit-down meal. Owner name not verified.",
      "address": "Via Roma 42, Piazza dei Martiri, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Morning ritual — open from 06:30",
      "maps": "https://www.google.com/maps/search/?api=1&query=Bar+dal+Cavaliere+Procida+Italy"
    },
    {
      "id": "v05-la-conchiglia",
      "cat": "shop",
      "tier": "several",
      "priority": 5,
      "badge": "Seafood",
      "name": "La Conchiglia",
      "short": "La Conchiglia",
      "lat": 40.7642,
      "lng": 14.0218,
      "neighborhood": "Corricella harbor — terrace literally over the fishing harbor",
      "tags": [
        "EUR 30–50 pp",
        "Walk-in; terrace fills quickly at lunch in season",
        "Lunch on the terrace"
      ],
      "productTags": ["Seafood", "Limone"],
      "why": "One of Procida's most-celebrated harbor terraces and among its longest-running — documented in Italian food press across decades, the name appearing consistently in Corricella dining accounts. Fishermen's nets are within reach of your chair at the water's edge. To order: spaghetti alle vongole in white (clams, white wine, parsley — no tomato, the island preference) and the frittura mista when the calamari are running small. Phone and precise street address not independently verified from a primary source. Not a meal to eat in a hurry: service is family-paced.",
      "verdict": "The terrace Italian food press returns to across decades — nets in reach, the harbor sound underneath everything.",
      "signature": "White vongole: clams, parsley, white wine, no tomato — the island preference, precise and clean.",
      "caveat": "Not verifiable by phone (number not confirmed). Service is family-paced. Not a quick lunch stop.",
      "address": "Corricella harbor, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Lunch on the terrace",
      "maps": "https://www.google.com/maps/search/?api=1&query=La+Conchiglia+Corricella+Procida+Italy"
    },
    {
      "id": "v06-crescenzo",
      "cat": "shop",
      "tier": "several",
      "priority": 6,
      "badge": "Rabbit",
      "name": "Trattoria Crescenzo",
      "short": "Crescenzo",
      "lat": 40.7571,
      "lng": 13.9975,
      "neighborhood": "Marina di Chiaiolella — the western harbor, favored by local boatowners",
      "tags": [
        "EUR 25–45 pp",
        "Walk-in friendly; smaller terrace overlooks the marina",
        "Lunch and dinner, season"
      ],
      "productTags": ["Rabbit", "Seafood"],
      "why": "A long-established family trattoria at the island's western port, referenced consistently as the table local boatowners and Chiaiolella residents use to avoid the Corricella tourist circuit. To order: coniglio alla Procidana — slow-braised rabbit with cherry tomatoes, white wine, rosemary, and olives, the island's inland dish alongside its fishing one. Evidence of the island's agricultural past, when every family kept a rabbit warren on the volcanic hillside. Address and owner name not independently verified from a primary source. Not a destination for solo diners: portions and spirit are calibrated for groups.",
      "verdict": "The table locals cross the island to reach — not the Corricella circuit, the western port, rabbit and a carafe.",
      "signature": "Coniglio alla Procidana: rabbit braised in white wine, tomato, rosemary, briny olives.",
      "caveat": "Not verifiable by phone. Address approximate. Not for solo diners — portion logic is for groups.",
      "address": "Marina di Chiaiolella, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Lunch and dinner, season",
      "maps": "https://www.google.com/maps/search/?api=1&query=Trattoria+Crescenzo+Chiaiolella+Procida+Italy"
    },
    {
      "id": "v07-da-mariano",
      "cat": "shop",
      "tier": "several",
      "priority": 7,
      "badge": "Seafood",
      "name": "Da Mariano",
      "short": "Da Mariano",
      "lat": 40.7573,
      "lng": 13.9970,
      "neighborhood": "Marina di Chiaiolella — harborside, the table yachtsmen moor to use",
      "tags": [
        "EUR 25–40 pp",
        "Walk-in; cards uncertain — bring cash",
        "Lunch"
      ],
      "productTags": ["Seafood", "Limone"],
      "why": "A harborside kitchen at Chiaiolella documented in multiple local travel accounts as the table yachtsmen tie up for — simple, direct, and calibrated to what the boats and the island can actually produce. To order: spaghetti con cozze e limone di Procida (mussels, white wine, a squeeze of the island's lemon — the combination works better here than anywhere because the lemon is genuinely different: thick-pith, faintly sweet, intensely aromatic). Owner name not independently verified. Not for anyone expecting a wine list: the house carafe is the selection.",
      "verdict": "The table yachtsmen moor to. Not on the tourist trail — harborside, mussels and lemon, the house carafe.",
      "signature": "Mussels and Procida lemon: white wine, broth, the lemon's thick pith squeezed in.",
      "caveat": "Cards may not be accepted — bring cash. Owner name not verified. No wine list.",
      "address": "Marina di Chiaiolella, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Lunch",
      "maps": "https://www.google.com/maps/search/?api=1&query=Da+Mariano+Chiaiolella+Procida+Italy"
    },
    {
      "id": "v08-ciro",
      "cat": "shop",
      "tier": "several",
      "priority": 8,
      "badge": "Seafood",
      "name": "Ristorante da Ciro",
      "short": "Da Ciro",
      "lat": 40.7660,
      "lng": 14.0255,
      "neighborhood": "Lungomare Cristoforo Colombo, Marina Grande seafront — he sources the catch personally at the harbor each morning",
      "tags": [
        "EUR 25–45 pp",
        "Walk-in; menu changes daily",
        "Lunch and dinner"
      ],
      "productTags": ["Seafood", "Limone"],
      "why": "Chef-patron known locally as Ciro Girone — he selects ingredients personally each morning at the Marina Grande fish landing, so the menu genuinely changes daily. Referenced in local guides across multiple years. To order: spaghetti al pesto di limone (lemon zest and juice pounded with almonds, pine nuts, Parmesan, and basil — no cooking; a winter-spring dish tied to the lemon harvest) or the polpette di pesce spada e melanzane — swordfish-and-eggplant balls fried in olive oil, a uniquely Procidan street preparation elevated here to a proper course. Exact street number not pinned from a primary source.",
      "verdict": "The morning-market kitchen — he sources the catch at dawn, the menu reflects it, and the swordfish-eggplant ball is found nowhere else.",
      "signature": "Polpette di pesce spada e melanzane: fried swordfish-eggplant, golden, yielding, herb-flecked.",
      "person": "Ciro Girone — sources the harbor fish market each morning before service.",
      "caveat": "Exact street number not pinned. Menu changes with the catch — not a fixed-menu restaurant.",
      "address": "Lungomare Cristoforo Colombo, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Lunch and dinner",
      "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Ciro+Procida+Italy+Lungomare"
    },
    {
      "id": "v09-la-lampara",
      "cat": "shop",
      "tier": "plenty",
      "priority": 9,
      "badge": "Seafood",
      "name": "La Lampara",
      "short": "La Lampara",
      "lat": 40.7648,
      "lng": 14.0222,
      "neighborhood": "Corricella harbor — small terrace at the water's edge, atmospheric at night",
      "tags": [
        "EUR 25–40 pp",
        "Walk-in; small terrace",
        "Dinner, harbor lights"
      ],
      "productTags": ["Seafood"],
      "why": "A lampara is the lamp fishermen lower at night to attract squid and anchovies — the name alone signals what's on the plate and who the kitchen cooks for. A small Corricella harbor table, referenced in multiple travel accounts, most atmospheric at dinner when the harbor lights mirror off the water. To order: fritto misto di paranza (small mixed fry of the day's catch — whatever the nets brought up) with Procida lemon. Phone and exact address not independently verified from a primary source. Not for a destination dinner: this is harbor air and fried fish, which is enough.",
      "verdict": "Named for the fishermen's night lamp — at dinner, harbor lights off the water, fritto misto, that's the meal.",
      "signature": "Fritto misto di paranza: small mixed catch, lightly battered, Procida lemon, immediate.",
      "caveat": "Phone and exact address not verified. Not a destination kitchen — harbor atmosphere is the point.",
      "address": "Corricella harbor, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Dinner, harbor lights",
      "maps": "https://www.google.com/maps/search/?api=1&query=La+Lampara+Corricella+Procida+Italy"
    },
    {
      "id": "v10-graziella",
      "cat": "shop",
      "tier": "plenty",
      "priority": 10,
      "badge": "Bar",
      "name": "Bar Ristorante Graziella",
      "short": "Graziella",
      "lat": 40.7655,
      "lng": 14.0263,
      "neighborhood": "Marina Grande — named for Lamartine's 1852 Procidan muse",
      "tags": [
        "EUR 15–30 pp",
        "Walk-in",
        "Lunch and late afternoon aperitivo"
      ],
      "productTags": ["Bar", "Seafood"],
      "why": "Named for Alphonse de Lamartine's 1852 novel *Graziella* — written after the French Romantic poet met a young Procidan tobacco-leaf folder on a visit around 1811, the book that first placed Procida in the European literary imagination. The most literary address on the island: a deliberate reference, not a coincidence. To order: simple fried-fish platters and spaghetti with anchovies in the afternoon heat, with an aperitivo as the ferries come in. More a cultural landmark than a gastronomic destination — the story is the reason to visit. Exact address and owner not independently verified.",
      "verdict": "More a literary landmark than a kitchen: the name carries Lamartine's Procidan muse, and the aperitivo facing the ferries is the reason.",
      "signature": "Spaghetti con alici: anchovies in olive oil, garlic, parsley — minimal, honest, this harbor.",
      "caveat": "Not a gastronomic destination. Exact address and owner not verified. Come for the story and the aperitivo.",
      "address": "Marina Grande, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Lunch and late afternoon aperitivo",
      "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Ristorante+Graziella+Procida+Italy"
    },
    {
      "id": "v11-il-galeone",
      "cat": "shop",
      "tier": "plenty",
      "priority": 11,
      "badge": "Seafood",
      "name": "Il Galeone",
      "short": "Il Galeone",
      "lat": 40.7643,
      "lng": 14.0220,
      "neighborhood": "Corricella harbor — the simple table where the fishermen eat the same fish they landed",
      "tags": [
        "EUR 20–35 pp",
        "Walk-in",
        "Lunch"
      ],
      "productTags": ["Seafood"],
      "why": "A plain Corricella harbor table, referenced across multiple travel reviews as the kind of kitchen where the fishermen who unloaded the catch at 06:00 return for lunch at 13:00 to eat the same fish. Pricing and spirit align: this is sustenance and harbor air, not a destination kitchen. To order: the daily fish grilled or baked, with whatever the house pours. Details partially unverified from primary sources. Not the table for a special occasion: that's Caracalè next door.",
      "verdict": "Where the fishermen eat the fish they landed at dawn — plain, harbor-side, no ceremony.",
      "signature": "Pesce del giorno, grilled: whatever came off the nets, nothing added.",
      "caveat": "Details partially unverified. Not a destination kitchen. Not for special occasions — use Caracalè for those.",
      "address": "Corricella harbor, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "Lunch",
      "maps": "https://www.google.com/maps/search/?api=1&query=Il+Galeone+Corricella+Procida+Italy"
    },
    {
      "id": "v12-pescatori",
      "cat": "market",
      "tier": "plenty",
      "priority": 12,
      "badge": "Market",
      "name": "Pescatori — Dawn Catch at Marina Grande",
      "short": "Pescatori",
      "lat": 40.7663,
      "lng": 14.0275,
      "neighborhood": "Marina Grande pier — the fish-landing quay where boats return and sell direct from 05:30",
      "tags": [
        "Dockside prices",
        "Cash only; bring a cool bag",
        "05:30–08:00 — gone before breakfast"
      ],
      "productTags": ["Market", "Seafood"],
      "why": "Not a restaurant: the source. Procida's fishing boats return to the Marina Grande quay from around 05:30, and for roughly two hours the fishermen sell direct — mantis shrimp, small squid, whatever the nets caught, at prices the harbor restaurants will triple by noon. The island's fishing cooperative (Cooperativa dei Pescatori di Procida) is a real and active entity. Bring cash and a bag with ice. This is where Ciro Girone shops. Gone by 08:00. Not for anyone who expects a table, a menu, or a receipt.",
      "verdict": "Where Ciro Girone shops, where the chefs pay dock prices — 05:30 to 08:00, bring cash and a cool bag.",
      "signal_chip": {"label": "Primary source", "full": "Procida's fishing cooperative (Cooperativa dei Pescatori di Procida) confirmed as active entity; dockside sales verified in multiple accounts", "cosign": "the price the restaurants triple"},
      "caveat": "Gone by 08:00. No table, no menu, no receipt. Cash only. Not for anyone who slept past seven.",
      "address": "Marina Grande pier, 80079 Procida (NA), Italy",
      "phone": "—",
      "hours": "05:30–08:00 — gone before breakfast",
      "maps": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida+fishing+pier+Italy"
    }
  ];
  const NEIGHBORHOODS = [
    {
      "id": "n-marina-grande",
      "name": "Marina Grande (Sent'cò)",
      "center": [40.7658, 14.0270],
      "radius": 200,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida+Italy"
    },
    {
      "id": "n-corricella",
      "name": "Corricella",
      "center": [40.7640, 14.0220],
      "radius": 180,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Corricella+Procida+Italy"
    },
    {
      "id": "n-terra-murata",
      "name": "Terra Murata",
      "center": [40.7705, 14.0252],
      "radius": 150,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida+Italy"
    },
    {
      "id": "n-chiaiolella",
      "name": "Chiaiolella",
      "center": [40.7568, 13.9967],
      "radius": 180,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Chiaiolella+Procida+Italy"
    }
  ];
  const WALKS = [
    {
      "id": "w-marina-grande-terra-murata",
      "name": "Marina Grande → Terra Murata citadel (91 m ascent)",
      "start": [40.7658, 14.0270],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Salita+Castello+Terra+Murata+Procida+Italy"
    },
    {
      "id": "w-terra-murata-corricella",
      "name": "Terra Murata → Corricella belvedere descent",
      "start": [40.7705, 14.0252],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+belvedere+Procida+Italy"
    },
    {
      "id": "w-corricella-ciraccio",
      "name": "Corricella → Ciraccio beach via the coastal tuff path",
      "start": [40.7640, 14.0220],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Ciraccio+beach+Procida+Italy"
    },
    {
      "id": "w-postino-route",
      "name": "Il Postino Route: Marina Grande → Cala del Pozzo Vecchio",
      "start": [40.7658, 14.0270],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Pozzo+Vecchio+Procida+Italy"
    },
    {
      "id": "w-vivara",
      "name": "Vivara Nature Reserve — Mycenaean traces on the islet",
      "start": [40.7562, 13.9920],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+island+Procida+Italy"
    },
    {
      "id": "w-island-circuit",
      "name": "Full Island Circumference (11.9 km, all four quarters)",
      "start": [40.7658, 14.0270],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Procida+island+walking+circuit+Italy"
    }
  ];
  const WORK_SPOTS = [
    {
      "id": "p-work-dal-cavaliere",
      "name": "Bar dal Cavaliere — main square, morning",
      "start": [40.7655, 14.0268]
    },
    {
      "id": "p-work-corricella-terrace",
      "name": "Corricella harbor terrace — afternoon lull",
      "start": [40.7640, 14.0220]
    },
    {
      "id": "p-work-terra-murata-viewpoint",
      "name": "Terra Murata belvedere — morning light",
      "start": [40.7705, 14.0252]
    }
  ];
  const LANDMARKS = [
    {
      "id": "b-ciraccio",
      "name": "Spiaggia di Ciraccio",
      "coords": [40.7579, 14.0058],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+di+Ciraccio+Procida+Italy"
    },
    {
      "id": "b-chiaiolella",
      "name": "Spiaggia di Chiaiolella",
      "coords": [40.7568, 13.9967],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Chiaiolella+Procida+Italy"
    },
    {
      "id": "b-pozzo-vecchio",
      "name": "Cala del Pozzo Vecchio (La Spiaggia del Postino)",
      "coords": [40.7685, 14.0175],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Pozzo+Vecchio+Procida+Italy"
    },
    {
      "id": "b-chiaia",
      "name": "La Chiaia (through the rock tunnel)",
      "coords": [40.7669, 14.0193],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+La+Chiaia+Procida+Italy"
    },
    {
      "id": "b-ciracciello",
      "name": "Ciracciello (the quiet cove between Ciraccio and Chiaiolella)",
      "coords": [40.7574, 14.0010],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Ciracciello+Procida+Italy"
    },
    {
      "id": "l-terra-murata",
      "name": "Terra Murata — the walled hilltop citadel",
      "coords": [40.7705, 14.0252],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida+Italy"
    },
    {
      "id": "l-palazzo-avalos",
      "name": "Palazzo d'Avalos (1563) — former Bourbon prison",
      "coords": [40.7709, 14.0255],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Palazzo+d'Avalos+Procida+Italy"
    },
    {
      "id": "l-abbey-san-michele",
      "name": "Abbey of San Michele Arcangelo (11th c.)",
      "coords": [40.7712, 14.0258],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Abbazia+San+Michele+Arcangelo+Procida+Italy"
    },
    {
      "id": "l-vivara",
      "name": "Vivara — Bronze Age Mycenaean settlement, state nature reserve",
      "coords": [40.7555, 13.9912],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+islet+Procida+Italy"
    },
    {
      "id": "l-corricella-harbor",
      "name": "Corricella fishing harbor — the island's emblematic image",
      "coords": [40.7640, 14.0218],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Corricella+harbor+Procida+Italy"
    },
    {
      "id": "l-morante-plaque",
      "name": "Procida — setting of Elsa Morante's L'isola di Arturo (Strega 1957)",
      "coords": [40.7658, 14.0270],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Procida+Italy+Elsa+Morante"
    },
    {
      "id": "g-pescheria",
      "name": "Marina Grande fishing pier — dawn dockside sales",
      "coords": [40.7663, 14.0275],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+fishing+pier+Procida+Italy"
    },
    {
      "id": "g-lemon-groves",
      "name": "Procida lemon groves — De.Co. and Slow Food Ark of Taste",
      "coords": [40.7650, 14.0150],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Procida+lemon+groves+Italy"
    }
  ];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
