/* Terroir — Procida · Campania — hand-built July 2026 */
window.TERROIR_DATA = (function () {
  const COLORS = {
    "berth":     "#c4a35a",
    "market":    "#d97706",
    "shop":      "#059669",
    "mainland":  "#7c3aed",
    "logistics": "#2d4a5e"
  };
  const CAT_LABELS = {
    "berth":     "Signature",
    "market":    "Market / Direct",
    "shop":      "Restaurant / Bar",
    "mainland":  "Out of town",
    "logistics": "Logistics"
  };
  const PRODUCT_COLORS = {
    "Sea Urchin":   "#1e40af",
    "Seafood":      "#3b82f6",
    "Km-Zero":      "#15803d",
    "View":         "#2d4a5e",
    "Local":        "#059669",
    "Literary":     "#7c3aed",
    "Pastry":       "#a16207",
    "Bakery":       "#92400e",
    "Trattoria":    "#374151",
    "Market":       "#d97706",
    "IGP Lemon":    "#ca8a04",
    "Wine":         "#7c2d12"
  };
  const VENUES = [
 {
  "id": "v01-caracale",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Sea Urchin",
  "name": "Caracalè",
  "short": "Caracalè",
  "lat": 40.7640,
  "lng": 14.0095,
  "neighborhood": "Marina di Corricella — Via Marina di Corricella 62, at the quayside of the oldest fishing port",
  "tags": [
   "EUR 40–65 pp",
   "Book ahead — books out by noon in July–August; phone or email",
   "Lunch or dinner, quayside terrace"
  ],
  "productTags": [
   "Sea Urchin",
   "Seafood"
  ],
  "why": "Opened March 2000 in a beautifully restored 17th-century boat depot right on the Corricella quay — the name is Neapolitan-Greek for 'beautiful place.' The kitchen is a focused argument for the waters immediately outside: bonito tartare, spaghetti al ricci di mare (sea urchins, only when in season), mantis shrimp (cannocchie) with cherry tomatoes. #1-rated restaurant in Procida across multiple review platforms. To order: Spaghetti al ricci di mare when the urchins are running (roughly December–March) — briny, oceanic, raw roe tossed into pasta; in summer the mantis shrimp. Not a full tasting menu — a short, produce-led list. Tables overlook the actual fishing boats: book at least a day ahead in shoulder season, a week in August.",
  "address": "Via Marina di Corricella 62, 80079 Procida NA",
  "phone": "+39 081 896 9192",
  "hours": "Lunch or dinner, quayside terrace",
  "maps": "https://www.google.com/maps/search/?api=1&query=Caracal%C3%A8+Procida+Via+Marina+di+Corricella"
 },
 {
  "id": "v02-la-lampara",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "View",
  "name": "La Lampara",
  "short": "La Lampara",
  "lat": 40.7642,
  "lng": 14.0100,
  "neighborhood": "Above Marina di Corricella — Hotel La Corricella terrace, the panoramic belvedere level over the fishing harbour",
  "tags": [
   "EUR 35–55 pp",
   "Book for dinner; walk-ups turned away in summer",
   "Lunch for the Corricella panorama below; dinner for the lit harbour"
  ],
  "productTags": [
   "View",
   "Seafood"
  ],
  "why": "The single best viewing position on the island: a terrace belonging to the Gentile family's La Corricella hotel, directly above the amphitheatre of pastel fishing houses. The kitchen keeps pace: linguine ai frutti di mare (clams, mussels, prawns) and grilled whole branzino or orata, with an octopus salad dressed with Procida lemon and olive oil as the island seasonal. To order: Linguine ai frutti di mare for the pasta, whole grilled branzino for the main — both let the ingredients carry the work. Arrive for lunch to see the fishing boats below at rest; for dinner you trade the panorama for harbour lights, which is its own argument. The view is functional here, not decorative — this is where fishermen's families would have looked out to see whether the fleet was coming in.",
  "address": "Via Marina di Corricella 36 (Hotel La Corricella), 80079 Procida NA",
  "phone": "+39 081 896 7502",
  "hours": "Lunch for the Corricella panorama below; dinner for the lit harbour",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Lampara+Procida+Corricella"
 },
 {
  "id": "v03-il-pescatore",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Km-Zero",
  "name": "Il Pescatore",
  "short": "Il Pescatore",
  "lat": 40.7639,
  "lng": 14.0097,
  "neighborhood": "Marina di Corricella — at the heart of the quay, between the fishing nets",
  "tags": [
   "EUR 30–50 pp",
   "Bookable by phone; walk-ins taken if space",
   "Lunch or dinner, Corricella waterfront"
  ],
  "productTags": [
   "Km-Zero",
   "Seafood"
  ],
  "why": "The host known simply as Ciro (Ciro Girone) sources every ingredient himself each morning — the menu is written or recited when it changes with the catch. Grilled pagello (sea bream) in a crust of coarse salt and Procida herbs; the island rabbit (coniglio) simmered on Fridays with cherry tomatoes, garlic, olive oil and white wine in the manner of the giardini families who still keep hutch rabbits on the island's terraces. Organic and zero-kilometre by conviction not certification, with a kitchen that proves the principle. To order: Ask for the bream in salt crust, or the rabbit on a Friday. This is the one that locals drive in for, not the harbourfront one with the waiting list — which is a distinction worth understanding about a four-kilometre island.",
  "address": "Via Marina di Corricella 5, 80079 Procida NA",
  "phone": "+39 081 896 7483",
  "hours": "Lunch or dinner, Corricella waterfront",
  "maps": "https://www.google.com/maps/search/?api=1&query=Il+Pescatore+Procida+Corricella"
 },
 {
  "id": "v04-ristorante-crescenzo",
  "cat": "shop",
  "tier": "several",
  "priority": 4,
  "badge": "Local",
  "name": "Ristorante Crescenzo",
  "short": "Crescenzo",
  "lat": 40.7535,
  "lng": 13.9958,
  "neighborhood": "Marina di Chiaiolella — the quieter lagoon harbour on the island's western end, between Procida and Vivara",
  "tags": [
   "EUR 30–45 pp",
   "Recommended in season; third-generation family house",
   "Lunch, with the fishing boats of Chiaiolella at your back"
  ],
  "productTags": [
   "Local",
   "Seafood"
  ],
  "why": "The Crescenzo family has run this quayside table at Chiaiolella marina for three generations — this is the one Neapolitans take the ferry for specifically, without stopping at Corricella. The kitchen does acqua pazza (white fish poached in sweet tomato broth, garlic, capers and local olive oil) and grilled totano (flying squid) with Procida lemon as well as anyone on the island. To order: Acqua pazza with whatever the boat brought in, or the grilled totano. Fifteen-minute walk from the Corricella circuit, which means the room stays quietly authentic and the markup never creeps. Not for those whose primary interest is the Corricella view — the Chiaiolella boats are working, not photogenic.",
  "address": "Via Roma 33, Marina di Chiaiolella, 80079 Procida NA",
  "phone": "+39 081 896 7255",
  "hours": "Lunch, with the fishing boats of Chiaiolella at your back",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Crescenzo+Procida+Chiaiolella"
 },
 {
  "id": "v05-la-gorgonia",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "Seafood",
  "name": "La Gorgonia",
  "short": "La Gorgonia",
  "lat": 40.7638,
  "lng": 14.0093,
  "neighborhood": "Marina di Corricella — Via Marina di Corricella 50, on the quay beside Caracalè",
  "tags": [
   "EUR 30–50 pp",
   "Walk-in often possible; book for weekends",
   "Lunch, quayside"
  ],
  "productTags": [
   "Seafood",
   "IGP Lemon"
  ],
  "why": "On the Corricella quay at number 50 — next to Caracalè, with more room and without a two-week waiting list. Known for acqua pazza, grilled fish and, when the season runs roughly April–September, the insalata di limone di Procida: the island's IGP lemon sliced almost translucently thin, dressed with local olive oil, fresh herbs and sometimes a layer of local tuna. To order: The lemon salad as a starter if in season (early spring to mid-autumn), then grilled calamari or the frittura di paranza (mixed small-fish fry). Reliable, honest cooking without the reservation drama of its neighbour.",
  "address": "Via Marina di Corricella 50, 80079 Procida NA",
  "phone": "+39 081 896 7660",
  "hours": "Lunch, quayside",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Gorgonia+Procida+Corricella"
 },
 {
  "id": "v06-ristorante-graziella",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Literary",
  "name": "Ristorante Graziella",
  "short": "Ristorante Graziella",
  "lat": 40.7635,
  "lng": 14.0089,
  "neighborhood": "Marina di Corricella — on the quay, named for Lamartine's 1849 novel set on this island",
  "tags": [
   "EUR 25–40 pp",
   "Walk-in; booking recommended at weekends",
   "Lunch or dinner, harbourfront"
  ],
  "productTags": [
   "Literary",
   "Seafood"
  ],
  "why": "Named for Alphonse de Lamartine's 1849 novella 'Graziella' — set on this island and published two years before the author's political ruin — a restaurant that wears its literary pedigree lightly. The fritto misto di mare (mixed small-fish fry, lemon, no batter) is the honest house statement; the spaghetti with local salted anchovies aglio e olio is the winter comfort dish. To order: Fritto misto if it's the hot season, spaghetti aglio e olio all'acciuga in autumn and winter. The literary tie-in draws a gentle, unhurried crowd; the cooking is Neapolitan-honest without the Corricella premium.",
  "address": "Via Marina di Corricella (Corricella harbourfront), 80079 Procida NA",
  "phone": "+39 081 896 7479",
  "hours": "Lunch or dinner, harbourfront",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Graziella+Procida"
 },
 {
  "id": "v07-bar-roma",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Pastry",
  "name": "Bar Roma",
  "short": "Bar Roma",
  "lat": 40.7628,
  "lng": 14.0040,
  "neighborhood": "Marina Grande — Via Roma, the island's main road off the ferry port",
  "tags": [
   "EUR 3–8 (pastry, coffee)",
   "Walk-in; open from 06:30",
   "Morning only — sells out by 10:00 in July–August"
  ],
  "productTags": [
   "Pastry",
   "IGP Lemon"
  ],
  "why": "Bar Roma and Bar Dal Cavaliere have argued for supremacy over the lingua di Procida for 60 years — the puff-pastry 'tongue' invented in the 1950s by Pasquale Mazziotti, filled with lemon cream from the island's IGP lemons. Bar Roma's version is the crisper, more citrus-forward of the two: thinner pastry, tighter lamination, a lemon cream that bites back. An institution: the island's first stop after the morning ferry. To order: One lingua di Procida and a macchiato at the bar. You are expected to take a side in the Roma vs Dal Cavaliere debate — both are obligatory.",
  "address": "Via Roma 27, Marina Grande, 80079 Procida NA",
  "phone": "+39 081 896 8136",
  "hours": "Morning only — sells out by 10:00 in July–August",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Roma+Procida+Marina+Grande"
 },
 {
  "id": "v08-bar-dal-cavaliere",
  "cat": "shop",
  "tier": "several",
  "priority": 8,
  "badge": "Pastry",
  "name": "Bar Dal Cavaliere",
  "short": "Bar Dal Cavaliere",
  "lat": 40.7625,
  "lng": 14.0036,
  "neighborhood": "Marina Grande — Piazza dei Martiri, the small square off Via Roma near the ferry",
  "tags": [
   "EUR 3–8 (pastry, granita)",
   "Walk-in; open from 06:30",
   "Morning, and again as an afternoon granita stop"
  ],
  "productTags": [
   "Pastry",
   "IGP Lemon"
  ],
  "why": "The other side of the lingua di Procida argument: Bar Dal Cavaliere's version is thicker, richer, the cream more dominant and the pastry less aggressive — preferred by those who want the lemon cushioned rather than foregrounded. Also the better source for granita di limone in the afternoon: a proper water-ice, not the granular tourist version, made from the same IGP lemons. To order: The lingua and a granita di limone in the same visit — the contrast of the warm pastry and the cold granita is the point. The square is where island gossip actually happens.",
  "address": "Piazza dei Martiri, Marina Grande, 80079 Procida NA",
  "phone": "+39 081 896 7130",
  "hours": "Morning, and again as an afternoon granita stop",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Dal+Cavaliere+Procida"
 },
 {
  "id": "v09-paname",
  "cat": "shop",
  "tier": "plenty",
  "priority": 9,
  "badge": "Bakery",
  "name": "Panâme",
  "short": "Panâme",
  "lat": 40.7626,
  "lng": 14.0039,
  "neighborhood": "Marina Grande — along Via Roma, close to the ferry terminal",
  "tags": [
   "EUR 3–10 (bread, pastry)",
   "Walk-in; limited hours — check locally",
   "Morning, before 12:00"
  ],
  "productTags": [
   "Bakery",
   "IGP Lemon"
  ],
  "why": "A newer artisanal bakery that brought French-inflected technique to the island's lemon obsession: harbour bread baked with local lemon seeds; suisse pastry (a Lyon classic naturalized to the island counter); lemon tarts alongside the obligatory lingua di Procida. The approach is the lingua tradition updated rather than repeated. To order: The harbour bread warm from the oven, or the lemon tart when available. Limited hours and a small counter — closed by midday. Not for those seeking the old-Procida ritual (that's Bar Roma); this is for those who want the same ingredient rethought.",
  "address": "Via Roma (Marina Grande), 80079 Procida NA",
  "phone": "—",
  "hours": "Morning, before 12:00",
  "maps": "https://www.google.com/maps/search/?api=1&query=Paname+bakery+Procida"
 },
 {
  "id": "v10-da-girone",
  "cat": "shop",
  "tier": "plenty",
  "priority": 10,
  "badge": "Trattoria",
  "name": "Da Girone",
  "short": "Da Girone",
  "lat": 40.7637,
  "lng": 14.0094,
  "neighborhood": "Marina di Corricella — casual trattoria on the quay",
  "tags": [
   "EUR 20–35 pp",
   "Walk-in; cash preferred",
   "Lunch or early dinner"
  ],
  "productTags": [
   "Trattoria",
   "Seafood"
  ],
  "why": "The Girone family's casual trattoria on the Corricella quay — unpretentious, generous portions, the mixed-fish fry and pasta with clams done without ceremony. No framing, no curated menu, no scenery markup. The local alternative when Caracalè and La Lampara are booked solid. To order: Whatever the cook recommends that day; the fritto misto and spaghetti alle vongole are consistently reliable. Not for those wanting the full restaurant experience — this is a meal, not a production.",
  "address": "Via Marina di Corricella (Corricella harbourfront), 80079 Procida NA",
  "phone": "+39 081 896 7564",
  "hours": "Lunch or early dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Da+Girone+Procida+Corricella"
 },
 {
  "id": "v11-san-michele-hotel-restaurant",
  "cat": "mainland",
  "tier": "plenty",
  "priority": 11,
  "badge": "View",
  "name": "San Michele Boutique Hotel",
  "short": "San Michele Hotel",
  "lat": 40.7663,
  "lng": 14.0063,
  "neighborhood": "Above the island's mid-section — Via Vittorio Emanuele (central Procida), elevated above both marinas with views toward Ischia and Capri",
  "tags": [
   "EUR 50–80 pp (hotel dining)",
   "Hotel guests and reservations; book 48h ahead",
   "Dinner, panoramic terrace"
  ],
  "productTags": [
   "View",
   "Seafood"
  ],
  "why": "The island's most elevated dining position — a boutique hotel restaurant on the high central road with uninterrupted views toward Ischia, Capri and the Phlegraean Fields at dusk. The kitchen respects the same Campanian sourcing as the quayside rooms: Procida lemon throughout, fresh catch, local vegetables. Not for those wanting the Corricella fishing-village experience — this is the island seen from above, which is a different proposition. Practical: non-guests can book for dinner but the experience is quieter and more formal than the quayside alternatives.",
  "address": "Via Vittorio Emanuele II 31, 80079 Procida NA",
  "phone": "+39 081 896 7422",
  "hours": "Dinner, panoramic terrace",
  "maps": "https://www.google.com/maps/search/?api=1&query=San+Michele+Boutique+Hotel+Procida"
 },
 {
  "id": "v12-limone-di-procida-stalls",
  "cat": "market",
  "tier": "plenty",
  "priority": 12,
  "badge": "IGP Lemon",
  "name": "Limone di Procida — street stalls",
  "short": "Lemon stalls",
  "lat": 40.7624,
  "lng": 14.0037,
  "neighborhood": "Piazza dei Martiri / Via Roma — the stalls cluster around the market square off Marina Grande",
  "tags": [
   "EUR 3–6 per lemon",
   "No booking; seasonal (April–October)",
   "Morning market hours"
  ],
  "productTags": [
   "IGP Lemon",
   "Market"
  ],
  "why": "The Limone di Procida — called 'limone di pane' (bread lemon) for its thick, spongy white pith — is the island's primary agricultural product. Grafted onto bitter orange rootstock and grown in the steeply terraced walled giardini of the island's interior slopes, the fruits reach grapefruit size, turn greenish-yellow when ripe (not the supermarket lemon yellow), and carry an intensely perfumed rind used in lingua di Procida pastries, granita, and the island's limoncello. Buy from the stall vendors at Piazza dei Martiri rather than the harbour tourist shops: the fruit is the same, the price is half. To order: Two or three lemons; eat one peeled like an orange (locals do this in summer — the pith is sweet enough to eat raw). Out of season the stalls thin out; do not confuse with the commercially bottled 'Limone di Procida' liqueurs.",
  "address": "Piazza dei Martiri / Via Roma, Marina Grande, 80079 Procida NA",
  "phone": "—",
  "hours": "Morning market hours",
  "maps": "https://www.google.com/maps/search/?api=1&query=Piazza+dei+Martiri+Procida"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-marina-grande",
  "name": "Marina Grande",
  "center": [40.7627, 14.0037],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida"
 },
 {
  "id": "n-marina-di-corricella",
  "name": "Marina di Corricella",
  "center": [40.7638, 14.0095],
  "radius": 160,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Corricella+Procida"
 },
 {
  "id": "n-terra-murata",
  "name": "Terra Murata",
  "center": [40.7688, 14.0075],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida"
 },
 {
  "id": "n-marina-di-chiaiolella",
  "name": "Marina di Chiaiolella",
  "center": [40.7533, 13.9955],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Chiaiolella+Procida"
 },
 {
  "id": "n-le-giardini",
  "name": "Le Giardini (lemon terraces)",
  "center": [40.7642, 13.9992],
  "radius": 320,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Giardini+Procida+lemon+gardens"
 },
 {
  "id": "n-via-liberta-sent-co",
  "name": "Via Libertà / Sent'Co",
  "center": [40.7628, 14.0000],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Via+Libert%C3%A0+Procida"
 }
];
  const WALKS = [
 {
  "id": "w-corricella-to-terra-murata",
  "name": "Corricella to Terra Murata via the stepped lane",
  "start": [40.7640, 14.0095],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Salita+San+Michele+Procida+to+Terra+Murata"
 },
 {
  "id": "w-marina-grande-to-pozzo-vecchio",
  "name": "Marina Grande to Pozzo Vecchio (Postman's Beach)",
  "start": [40.7627, 14.0037],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Pozzo+Vecchio+Beach+Procida"
 },
 {
  "id": "w-via-liberta-giardini-loop",
  "name": "Via Libertà and the giardini lemon-terrace loop",
  "start": [40.7627, 14.0037],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Via+Libert%C3%A0+Procida+lemon+gardens"
 },
 {
  "id": "w-chiaiolella-to-vivara",
  "name": "Chiaiolella to Vivara nature reserve (footbridge)",
  "start": [40.7533, 13.9955],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+Island+Procida+footbridge"
 },
 {
  "id": "w-circumnavigation-coastal",
  "name": "Coastal circumnavigation — rough track, full island",
  "start": [40.7627, 14.0037],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Procida+island+coastal+walk"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-bar-roma",
  "name": "Bar Roma (morning, pre-10:00)",
  "start": [40.7628, 14.0040]
 },
 {
  "id": "p-work-la-corricella-terrace",
  "name": "Hotel La Corricella terrace",
  "start": [40.7642, 14.0100]
 },
 {
  "id": "p-work-belvedere-elsa-morante",
  "name": "Belvedere Elsa Morante (above Corricella)",
  "start": [40.7649, 14.0100]
 }
];
  const LANDMARKS = [
 {
  "id": "l-beach-pozzo-vecchio",
  "name": "Spiaggia del Pozzo Vecchio (Postman's Beach)",
  "coords": [40.7513, 13.9888],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+del+Pozzo+Vecchio+Procida"
 },
 {
  "id": "l-beach-chiaia",
  "name": "Spiaggia di Chiaia",
  "coords": [40.7618, 14.0162],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+di+Chiaia+Procida"
 },
 {
  "id": "l-beach-ciraccio",
  "name": "Lido Ciraccio (main organised beach)",
  "coords": [40.7540, 13.9965],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Lido+Ciraccio+Procida"
 },
 {
  "id": "l-beach-la-lingua",
  "name": "La Lingua (sand spit toward Vivara)",
  "coords": [40.7484, 13.9878],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+della+Lingua+Procida"
 },
 {
  "id": "l-beach-chiaiolella",
  "name": "Marina di Chiaiolella anchorage beach",
  "coords": [40.7528, 13.9952],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Chiaiolella+Procida+beach"
 },
 {
  "id": "l-cult-abbazia-san-michele",
  "name": "Abbazia di San Michele Arcangelo — Benedictine abbey with ossuary",
  "coords": [40.7688, 14.0063],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Abbazia+San+Michele+Arcangelo+Procida"
 },
 {
  "id": "l-cult-palazzo-d-avalos",
  "name": "Palazzo d'Avalos — former Aragonese palace, Bourbon prison (1830–1988)",
  "coords": [40.7665, 14.0069],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Palazzo+d%27Avalos+Procida"
 },
 {
  "id": "l-cult-terra-murata",
  "name": "Terra Murata — the fortified hilltop citadel",
  "coords": [40.7688, 14.0075],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida"
 },
 {
  "id": "l-cult-belvedere-elsa-morante",
  "name": "Belvedere Elsa Morante — the panoramic viewpoint above Corricella",
  "coords": [40.7649, 14.0099],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Belvedere+Elsa+Morante+Procida"
 },
 {
  "id": "l-cult-marina-corricella",
  "name": "Marina di Corricella — the 17th-century fishing port",
  "coords": [40.7638, 14.0095],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Corricella+Procida"
 },
 {
  "id": "l-cult-vivara-riserva",
  "name": "Vivara Nature Reserve — volcanic islet, Bronze Age site, migratory birds",
  "coords": [40.7456, 13.9822],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+Nature+Reserve+Procida"
 },
 {
  "id": "l-cult-hotel-elda-morante",
  "name": "Hotel Elda (ex Hotel Eldorado) — where Elsa Morante wrote L'Isola di Arturo",
  "coords": [40.7632, 14.0048],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Hotel+Elda+Procida"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
