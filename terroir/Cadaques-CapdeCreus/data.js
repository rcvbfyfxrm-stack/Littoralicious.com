/* Terroir — Cadaqués · Cap de Creus — hand-built on the upgraded template */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#c4a35a", "market": "#d97706", "shop": "#059669", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar", "mainland": "Out of town", "logistics": "Logistics"};
  const PRODUCT_COLORS = {"Michelin": "#7f1d1d", "Seafood": "#3b82f6", "sharing plates": "#1f2937", "Rice": "#a16207", "Wine": "#7c2d12", "Cafe": "#92400e", "Bar": "#7c3aed", "oysters": "#0ea5e9", "Tapas": "#dc2626", "Lighthouse": "#2d4a5e"};
  const VENUES = [
 {
  "id": "v01-compartir-cadaques",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Michelin",
  "name": "Compartir Cadaqués",
  "short": "Compartir Cadaqués",
  "lat": 42.2887,
  "lng": 3.2766,
  "neighborhood": "Old town, Riera de Sant Vicenç (the dry riverbed running down to the bay)",
  "tags": [
   "EUR 60-90 pp à la carte",
   "Essential, book days/weeks ahead online or by phone; whole-table tasting served to all diners",
   "Dinner, in the 18th-century courtyard"
  ],
  "productTags": [
   "sharing plates",
   "Empordà rice",
   "oysters"
  ],
  "why": "Opened 2012 by Mateu Casañas, Oriol Castro and Eduard Xatruch — the trio whose Disfrutar (Barcelona) took a third Michelin star and World's 50 Best No.1 in 2024; Michelin Guide listed, two Soles Repsol To order: The whole-table tasting menu anchored by an Empordà seafood rice; the gazpacho-and-pesto starter is the house signature carried from elBulli days Seasonal — closes in deep winter; this is elBulli-trained refinement, not a casual harbourside lunch. Confirm opening dates before a winter trip.",
  "address": "Riera de Sant Vicenç s/n, 17488 Cadaqués, Girona",
  "phone": "+34 972 258 482",
  "hours": "Dinner, in the 18th-century courtyard",
  "maps": "https://www.google.com/maps/search/?api=1&query=Compartir+Cadaqués+Cadaqués",
  "verdict": "elBulli-trained refinement on the harbour — book it for the rice, not for a casual lunch.",
  "signature": "The whole-table tasting menu, anchored by an Empordà seafood rice.",
  "person": "The Disfrutar trio — Casañas, Castro & Xatruch; elBulli alumni.",
  "signal_chip": {
   "label": "Michelin",
   "full": "Michelin Guide listed · 2 Soles Repsol",
   "cosign": "the elBulli line on the water — the one we'd book first"
  },
  "caveat": "Seasonal — closes in deep winter; confirm dates before a winter trip."
 },
 {
  "id": "v02-casa-anita",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "Seafood",
  "name": "Casa Anita",
  "short": "Casa Anita",
  "lat": 42.2891,
  "lng": 3.2779,
  "neighborhood": "Old town, Carrer Miquel Rosset (uphill from the waterfront, near the church)",
  "tags": [
   "EUR 30-45 pp",
   "No printed menu and no normal booking — it is a 'sung' menu recited at communal tables; turn up and wait",
   "Lunch or early dinner, summer"
  ],
  "productTags": [
   "salt anchovies",
   "Roses prawns",
   "shared tables"
  ],
  "why": "Open since the 1960s; a Dalí haunt run by the Mota family — founder Ana Mota's death was reported by Catalan press as the loss of a village institution To order: House-salted Cadaqués anchovies and grilled Roses prawns, then the ice cream churned on site Cash culture, shared tables, no à la carte card — the order is recited aloud. Idiosyncratic by design.",
  "address": "Carrer Miquel Rosset 16, 17488 Cadaqués, Girona",
  "phone": "+34 972 258 471",
  "hours": "Lunch or early dinner, summer",
  "maps": "https://www.google.com/maps/search/?api=1&query=Casa+Anita+Cadaqués",
  "verdict": "The village institution Dalí drank at — you order what they recite, not what you planned.",
  "signature": "House-salted Cadaqués anchovies, grilled Roses prawns, then the ice cream churned on site.",
  "person": "Run by the Mota family since the 1960s — founder Ana Mota.",
  "caveat": "Cash only, shared tables, no menu card — the order is recited aloud."
 },
 {
  "id": "v03-restaurant-cap-de-creus",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Seafood",
  "name": "Restaurant Cap de Creus",
  "short": "Restaurant Cap de Creus",
  "lat": 42.3193,
  "lng": 3.3192,
  "neighborhood": "Cap de Creus headland, beside the lighthouse (~8 km / 20 min on the narrow road from Cadaqués), above Cala Culip",
  "tags": [
   "EUR 25-40 pp",
   "Book ahead if driving up (a reservation lets you take a car up the single-track road); via reserves@restaurantcapdecreus.com",
   "Lunch for the view; sunrise here is the first on the Iberian mainland"
  ],
  "productTags": [
   "curry",
   "tapas",
   "easternmost terrace"
  ],
  "why": "Opened 1991 by British biologist Christopher (Chris) Little in a former Civil Guard barracks at the easternmost point of mainland Spain — seven curries and vindaloo above a Catalan cove To order: One of the seven curries (the vindaloo) with samosas and chutney — the unlikely house specialty — or seafood rice if you want local Road is single-track and shared with buses — slow. Seasonal hours; confirm before the drive. Phone not verified — use email.",
  "address": "Carretera Cap de Creus s/n (Far de Cap de Creus), 17488 Cadaqués, Girona",
  "phone": "—",
  "hours": "Lunch for the view; sunrise here is the first on the Iberian mainland",
  "maps": "https://www.google.com/maps/search/?api=1&query=Restaurant+Cap+de+Creus+Cadaqués",
  "verdict": "Seven curries above a Catalan cove at the edge of the mainland — the unlikely one that works.",
  "signature": "One of the seven curries (the vindaloo) with samosas and chutney.",
  "person": "Opened 1991 by British biologist Chris Little, in a former Civil Guard barracks.",
  "caveat": "Single-track road shared with buses — slow; seasonal hours, confirm first."
 },
 {
  "id": "v04-es-baluard",
  "cat": "shop",
  "tier": "several",
  "priority": 4,
  "badge": "Seafood",
  "name": "Es Baluard",
  "short": "Es Baluard",
  "lat": 42.2884,
  "lng": 3.2792,
  "neighborhood": "Waterfront, built into the old-town sea wall on Riba Nemesi Llorens",
  "tags": [
   "EUR 35-55 pp",
   "Recommended in season; book by phone",
   "Lunch on the first-floor terrace over the bay"
  ],
  "productTags": [
   "monkfish suquet",
   "fish rice",
   "bay view"
  ],
  "why": "Opened 1967 by Quimet Seriñana and Maria Torrents; now third-generation, run by son Josep Seriñana with Fanni Puig and children Aina and Adrià To order: Monkfish (rap) suquet — the slow-simmered Empordà fish-and-potato stew the house is known for High-season opening only — largely shut outside summer. Built into the literal sea wall; book the window tables.",
  "address": "Riba Nemesi Llorens 2, 17488 Cadaqués, Girona",
  "phone": "+34 972 258 183",
  "hours": "Lunch on the first-floor terrace over the bay",
  "maps": "https://www.google.com/maps/search/?api=1&query=Es+Baluard+Cadaqués"
 },
 {
  "id": "v05-talla",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "Seafood",
  "name": "Talla",
  "short": "Talla",
  "lat": 42.2872,
  "lng": 3.2761,
  "neighborhood": "West side of the harbour, Riba Pitxot (water's edge, looking back at the white town)",
  "tags": [
   "EUR 40-60 pp",
   "Book ahead — reliably full; reservations online or by phone",
   "Sunset on the west-facing terrace"
  ],
  "productTags": [
   "flamed oysters",
   "barnacles",
   "sea terrace"
  ],
  "why": "Waterfront kitchen pairing traditional Catalan base with avant-garde technique; runs an adjoining Oli Bar; consistently top-ranked among Cadaqués tables To order: Flame-grilled oysters with ponzu, or the seaweed salad with goose barnacles (percebes) and razor clams Closed roughly November to March. Small terrace, books out fast in July-August.",
  "address": "Riba Pitxot 18, 17488 Cadaqués, Girona",
  "phone": "+34 972 258 739",
  "hours": "Sunset on the west-facing terrace",
  "maps": "https://www.google.com/maps/search/?api=1&query=Talla+Cadaqués"
 },
 {
  "id": "v06-can-rafa",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Seafood",
  "name": "Can Rafa",
  "short": "Can Rafa",
  "lat": 42.2882,
  "lng": 3.2785,
  "neighborhood": "Seafront promenade (Passeig), central",
  "tags": [
   "EUR 35-55 pp",
   "Recommended in summer",
   "Lunch, seafront terrace"
  ],
  "productTags": [
   "lobster rice",
   "fideuà",
   "boat-to-plate fish"
  ],
  "why": "Family-run since 1982 by the Martín Faixó family; proximity cooking off the Cadaqués fishing boats and Cap de Creus dives To order: Arròs de bogavante (lobster rice) or langostino rice, sized for sharing; desserts handmade by Carmen Rice and fideuà are made for two-plus — don't order solo. Phone not independently verified.",
  "address": "Passeig 7, 17488 Cadaqués, Girona",
  "phone": "—",
  "hours": "Lunch, seafront terrace",
  "maps": "https://www.google.com/maps/search/?api=1&query=Can+Rafa+Cadaqués"
 },
 {
  "id": "v07-la-sirena",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Seafood",
  "name": "La Sirena",
  "short": "La Sirena",
  "lat": 42.2889,
  "lng": 3.2774,
  "neighborhood": "Old town, Carrer d'es Call (one block up from the waterfront)",
  "tags": [
   "EUR 30-45 pp",
   "Takes reservations; cards accepted",
   "Winter for the urchins (Jan-Mar), otherwise dinner"
  ],
  "productTags": [
   "scorpionfish",
   "sea urchins",
   "rock mussels"
  ],
  "why": "Long-running family kitchen on a back lane; mermaid-themed dining room and a terrace, cooking the local catch to old recipes To order: Scorpionfish (escórpora) with sauce and potatoes, or garoines (sea urchins) when in season Tucked off the front on a side street — easy to walk past. Urchins are a Jan-Mar thing only.",
  "address": "Carrer d'es Call s/n, 17488 Cadaqués, Girona",
  "phone": "+34 972 258 974",
  "hours": "Winter for the urchins (Jan-Mar), otherwise dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Sirena+Cadaqués"
 },
 {
  "id": "v08-casa-nun",
  "cat": "shop",
  "tier": "several",
  "priority": 8,
  "badge": "Seafood",
  "name": "Casa Nun",
  "short": "Casa Nun",
  "lat": 42.2886,
  "lng": 3.2787,
  "neighborhood": "Old town, Plaça des Portitxó (small square just up from the bay)",
  "tags": [
   "EUR 30-45 pp",
   "Recommended in season",
   "Lunch on the square"
  ],
  "productTags": [
   "lobster caldoso",
   "gratin sardines",
   "village square"
  ],
  "why": "Over 40 years on the same square; the gratinated sardine is a house recipe carried across generations To order: Arròs caldós de bogavante (soupy lobster rice) — repeatedly called the best in town — and the sardina gratinada Family-run and small; phone not independently verified — walk in or use a booking platform.",
  "address": "Plaça des Portitxó 6, 17488 Cadaqués, Girona",
  "phone": "—",
  "hours": "Lunch on the square",
  "maps": "https://www.google.com/maps/search/?api=1&query=Casa+Nun+Cadaqués"
 },
 {
  "id": "v09-es-balconet",
  "cat": "shop",
  "tier": "several",
  "priority": 9,
  "badge": "Seafood",
  "name": "Es Balconet",
  "short": "Es Balconet",
  "lat": 42.2893,
  "lng": 3.2782,
  "neighborhood": "Old town, Carrer Sant Antoni (narrow lane in the historic core)",
  "tags": [
   "EUR 25-40 pp",
   "Walk-in friendly; small",
   "Lunch"
  ],
  "productTags": [
   "paella",
   "fresh fish",
   "fishermen's room"
  ],
  "why": "Small fishermen's-style restaurant in the old quarter — paella and the day's catch, a locals' room rather than a view table To order: Paella or the grilled catch of the day No sea view — an inland-lane room valued for cooking over scenery. Phone unverified.",
  "address": "Carrer Sant Antoni 2, 17488 Cadaqués, Girona",
  "phone": "—",
  "hours": "Lunch",
  "maps": "https://www.google.com/maps/search/?api=1&query=Es+Balconet+Cadaqués"
 },
 {
  "id": "v10-s-estrop",
  "cat": "shop",
  "tier": "several",
  "priority": 10,
  "badge": "Seafood",
  "name": "S'Estrop",
  "short": "S'Estrop",
  "lat": 42.288,
  "lng": 3.2783,
  "neighborhood": "Beachfront, central Cadaqués",
  "tags": [
   "EUR 30-50 pp",
   "Recommended for terrace tables in summer",
   "Lunch, waterside"
  ],
  "productTags": [
   "fideuà",
   "paella",
   "sea view"
  ],
  "why": "Beachfront kitchen for fideuà, paellas and seafood with a view across the bay To order: Fideuà (the short-noodle answer to paella) with the local catch Exact street number not pinned from a primary source — address given to street level only. Phone unverified.",
  "address": "Cadaqués seafront (Riba), 17488 Cadaqués, Girona",
  "phone": "—",
  "hours": "Lunch, waterside",
  "maps": "https://www.google.com/maps/search/?api=1&query=S'Estrop+Cadaqués"
 },
 {
  "id": "v11-es-trull",
  "cat": "shop",
  "tier": "plenty",
  "priority": 11,
  "badge": "Catalan",
  "name": "Es Trull",
  "short": "Es Trull",
  "lat": 42.2885,
  "lng": 3.2789,
  "neighborhood": "Old town, Carrer Portitxó (near the Portitxó square)",
  "tags": [
   "EUR 25-40 pp",
   "Walk-in or phone",
   "Dinner"
  ],
  "productTags": [
   "Catalan grills",
   "rice",
   "old-town room"
  ],
  "why": "Long-standing old-town Catalan kitchen on Portitxó To order: Catalan grills and rice dishes; ask the day's fish Often tagged a pizza spot online, but its listing is plain Catalan cuisine — the wood-oven/pizza claim could NOT be confirmed, so order the Catalan plates.",
  "address": "Carrer Portitxó 5, 17488 Cadaqués, Girona",
  "phone": "+34 972 159 332",
  "hours": "Dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Es+Trull+Cadaqués"
 },
 {
  "id": "v12-es-bar-de-dalt",
  "cat": "shop",
  "tier": "plenty",
  "priority": 12,
  "badge": "Catalan",
  "name": "Es Bar de Dalt",
  "short": "Es Bar de Dalt",
  "lat": 42.2896,
  "lng": 3.2761,
  "neighborhood": "Upper village, terrace under olive trees (above the old town)",
  "tags": [
   "EUR 25-40 pp",
   "Recommended for the terrace",
   "Evening, for the shade and the view down to the bay"
  ],
  "productTags": [
   "traditional plates",
   "olive-tree terrace",
   "quality produce"
  ],
  "why": "Upper-village kitchen serving traditional cuisine on a terrace shaded by olive trees, away from the harbour crush To order: Whatever's traditional and in season — the draw is the olive-grove terrace as much as the plate Up the hill, away from the front — exact street address not pinned from a primary source. Phone unverified.",
  "address": "Upper Cadaqués (upper-village carrer), 17488 Cadaqués, Girona",
  "phone": "—",
  "hours": "Evening, for the shade and the view down to the bay",
  "maps": "https://www.google.com/maps/search/?api=1&query=Es+Bar+de+Dalt+Cadaqués"
 },
 {
  "id": "v13-l-hostal",
  "cat": "shop",
  "tier": "plenty",
  "priority": 13,
  "badge": "Bar",
  "name": "L'Hostal",
  "short": "L'Hostal",
  "lat": 42.2881,
  "lng": 3.2784,
  "neighborhood": "Old town, on the Passeig / central waterfront square",
  "tags": [
   "EUR 10-25 (drinks/tapas)",
   "Walk-in for a drink; book if eating",
   "Evening aperitif"
  ],
  "productTags": [
   "Dalí eggs",
   "tapas",
   "drinks"
  ],
  "why": "Founded by Italian Marci Pogany; the only bar Dalí frequented in Cadaqués — Dalí designed and signed its logo for free. Later drew Mick Jagger, García Márquez, Keith Richards, George Harrison To order: The 'Dalí eggs' tapa (a nod to the surrealist) with a drink No longer the nightclub of the Dalí era — now a drinks-and-tapas room trading on its history. Come for the legend, not a full dinner.",
  "address": "Passeig 8 (Plaça), 17488 Cadaqués, Girona",
  "phone": "+34 972 258 000",
  "hours": "Evening aperitif",
  "maps": "https://www.google.com/maps/search/?api=1&query=L'Hostal+Cadaqués"
 },
 {
  "id": "v14-maritim-bar",
  "cat": "shop",
  "tier": "plenty",
  "priority": 14,
  "badge": "Bar",
  "name": "Marítim Bar",
  "short": "Marítim Bar",
  "lat": 42.2879,
  "lng": 3.2787,
  "neighborhood": "Beachfront, Passeig Marítim (directly on the Cadaqués beach)",
  "tags": [
   "EUR 8-20 (drinks)",
   "Walk-in",
   "Sundown on the beach terrace"
  ],
  "productTags": [
   "cremat",
   "beachfront",
   "Dalí by boat"
  ],
  "why": "Opened on Sant Jaume's day (25 July) 1935; Dalí reportedly arrived by boat — arguably the best bar position on the bay To order: Cremat — the fishermen's flamed cane-rum, coffee and sugar, set alight at the table A chiringuito-style beach bar, seasonal hours; phone is a mobile and may go unanswered out of season.",
  "address": "Passeig Marítim s/n, 17488 Cadaqués, Girona",
  "phone": "+34 636 198 475",
  "hours": "Sundown on the beach terrace",
  "maps": "https://www.google.com/maps/search/?api=1&query=Marítim+Bar+Cadaqués"
 },
 {
  "id": "v15-cafe-tropical",
  "cat": "shop",
  "tier": "plenty",
  "priority": 15,
  "badge": "Bar",
  "name": "Cafe Tropical",
  "short": "Cafe Tropical",
  "lat": 42.2884,
  "lng": 3.278,
  "neighborhood": "Old town, central (off the front)",
  "tags": [
   "EUR 8-15 (drinks)",
   "Walk-in",
   "Late — opens ~22:00, runs to ~03:30"
  ],
  "productTags": [
   "cocktails",
   "gin",
   "music bar"
  ],
  "why": "A near-40-year fixture of Cadaqués nightlife; a 'bar musical' for cocktails and late dancing To order: A gin and tonic or a house cocktail; this is a late bar, not a kitchen Night spot only; exact street address not pinned from a primary source. Loud and late in summer.",
  "address": "Cadaqués old town (central), 17488 Cadaqués, Girona",
  "phone": "+34 972 258 801",
  "hours": "Late — opens ~22:00, runs to ~03:30",
  "maps": "https://www.google.com/maps/search/?api=1&query=Cafe+Tropical+Cadaqués"
 },
 {
  "id": "v16-elbulli-cala-montjoi-roses",
  "cat": "mainland",
  "tier": "plenty",
  "priority": 16,
  "badge": "Museum",
  "name": "elBulli (Cala Montjoi, Roses)",
  "short": "elBulli (Cala Montjoi, Roses)",
  "lat": 42.2483,
  "lng": 3.2256,
  "neighborhood": "Cala Montjoi cove, Roses (~30 min by road along the coast from Cadaqués)",
  "tags": [
   "Museum ticket (not a restaurant)",
   "Timed museum tickets via the elBulli Foundation; the road into Cala Montjoi is rough",
   "Day visit, by car"
  ],
  "productTags": [
   "elBulli1846",
   "culinary museum",
   "spherification"
  ],
  "why": "Ferran Adrià's restaurant — three Michelin stars (third in 1997), World's Best multiple times — closed 30 July 2011; reopened 2023 as elBulli1846, a museum/archive of culinary creativity To order: Nothing to eat — it is now a museum (elBulli1846); the local link is that Compartir's chefs trained here NOT a restaurant any more — included only as the gravitational context for Cadaqués cooking. Do not send anyone expecting dinner.",
  "address": "Cala Montjoi s/n, 17480 Roses, Girona",
  "phone": "—",
  "hours": "Day visit, by car",
  "maps": "https://www.google.com/maps/search/?api=1&query=elBulli+(Cala+Montjoi,+Roses)+Cadaqués"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-es-baluard-old-town-around-santa-m",
  "name": "Es Baluard / Old Town around Santa Maria",
  "center": [
   42.2886,
   3.2758
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Es+Baluard+/+Old+Town+around+Santa+Maria+Cadaqués"
 },
 {
  "id": "n-sa-riba-riba-des-poal",
  "name": "Sa Riba / Riba des Poal",
  "center": [
   42.2884,
   3.2787
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sa+Riba+/+Riba+des+Poal+Cadaqués"
 },
 {
  "id": "n-es-poal",
  "name": "Es Poal",
  "center": [
   42.2879,
   3.28
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Es+Poal+Cadaqués"
 },
 {
  "id": "n-portlligat",
  "name": "Portlligat",
  "center": [
   42.2893,
   3.285
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Portlligat+Cadaqués"
 },
 {
  "id": "n-la-riera-riera-de-sant-vicenc",
  "name": "La Riera (Riera de Sant Vicenç)",
  "center": [
   42.289,
   3.274
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=La+Riera+(Riera+de+Sant+Vicenç)+Cadaqués"
 },
 {
  "id": "n-es-llane-gran-i-petit",
  "name": "Es Llané (Gran i Petit)",
  "center": [
   42.2855,
   3.282
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Es+Llané+(Gran+i+Petit)+Cadaqués"
 },
 {
  "id": "n-sa-conca",
  "name": "Sa Conca",
  "center": [
   42.282,
   3.284
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sa+Conca+Cadaqués"
 },
 {
  "id": "n-es-portitxo-es-portal",
  "name": "Es Portitxó / Es Portal",
  "center": [
   42.2882,
   3.2783
  ],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Es+Portitxó+/+Es+Portal+Cadaqués"
 }
];
  const WALKS = [
 {
  "id": "w-cami-de-ronda-platja-de-cadaques-t",
  "name": "Cami de Ronda: Platja de Cadaques to Far de Cala Nans",
  "start": [
   42.2709,
   3.2864
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cami+de+Ronda:+Platja+de+Cadaques+to+Far+de+Cala+Nans+Cap+de+Creus"
 },
 {
  "id": "w-cami-antic-portlligat-to-the-far-d",
  "name": "Cami Antic: Portlligat to the Far de Cap de Creus",
  "start": [
   42.3167,
   3.315
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cami+Antic:+Portlligat+to+the+Far+de+Cap+de+Creus+Cap+de+Creus"
 },
 {
  "id": "w-cap-de-creus-lighthouse-cala-culip",
  "name": "Cap de Creus lighthouse + Cala Culip loop",
  "start": [
   42.3212,
   3.3109
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cap+de+Creus+lighthouse+++Cala+Culip+loop+Cap+de+Creus"
 },
 {
  "id": "w-cadaques-to-the-ermita-de-sant-seb",
  "name": "Cadaques to the Ermita de Sant Sebastia (Peni viewpoint)",
  "start": [
   42.2789,
   3.2611
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cadaques+to+the+Ermita+de+Sant+Sebastia+(Peni+viewpoint)+Cap+de+Creus"
 },
 {
  "id": "w-gr-92-cami-de-ronda-stretch-cadaqu",
  "name": "GR-92 Cami de Ronda stretch: Cadaques to El Port de la Selva",
  "start": [
   42.2893,
   3.2752
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=GR-92+Cami+de+Ronda+stretch:+Cadaques+to+El+Port+de+la+Selva+Cap+de+Creus"
 },
 {
  "id": "w-the-olive-terrace-path-cami-antic-",
  "name": "The olive-terrace path (Cami Antic through the abandoned vinyes)",
  "start": [
   42.31,
   3.305
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=The+olive-terrace+path+(Cami+Antic+through+the+abandoned+vinyes)+Cap+de+Creus"
 },
 {
  "id": "w-far-de-cala-nans-short-out-and-bac",
  "name": "Far de Cala Nans short out-and-back",
  "start": [
   42.2709,
   3.2864
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Far+de+Cala+Nans+short+out-and-back+Cap+de+Creus"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-bar-maritim",
  "name": "Bar Marítim",
  "start": [
   42.2885,
   3.2785
  ]
 },
 {
  "id": "p-work-es-baluard",
  "name": "Es Baluard",
  "start": [
   42.2882,
   3.279
  ]
 },
 {
  "id": "p-work-l-hostal",
  "name": "L'Hostal",
  "start": [
   42.2887,
   3.2772
  ]
 },
 {
  "id": "p-work-es-cucurucu-viewpoint-mirador",
  "name": "Es Cucurucú viewpoint (mirador)",
  "start": [
   42.29,
   3.28
  ]
 }
];
  const LANDMARKS = [
 {
  "id": "l-cala-platja-de-portlligat",
  "name": "Platja de Portlligat",
  "coords": [
   42.2939,
   3.2861
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Platja+de+Portlligat+Cadaqués"
 },
 {
  "id": "l-cala-platja-gran-de-cadaques",
  "name": "Platja Gran de Cadaques",
  "coords": [
   42.2886,
   3.2784
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Platja+Gran+de+Cadaques+Cadaqués"
 },
 {
  "id": "l-cala-platja-de-sa-conca",
  "name": "Platja de Sa Conca",
  "coords": [
   42.2806,
   3.2767
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Platja+de+Sa+Conca+Cadaqués"
 },
 {
  "id": "l-cala-es-sortell",
  "name": "Es Sortell",
  "coords": [
   42.282,
   3.2785
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Es+Sortell+Cadaqués"
 },
 {
  "id": "l-cala-s-alqueria-gran",
  "name": "S'Alqueria Gran",
  "coords": [
   42.299,
   3.2889
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=S'Alqueria+Gran+Cadaqués"
 },
 {
  "id": "l-cala-cala-nans-far-de-cala-nans",
  "name": "Cala Nans (Far de Cala Nans)",
  "coords": [
   42.2709,
   3.2864
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Nans+(Far+de+Cala+Nans)+Cadaqués"
 },
 {
  "id": "l-cala-cala-culip",
  "name": "Cala Culip",
  "coords": [
   42.3212,
   3.3109
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Culip+Cadaqués"
 },
 {
  "id": "l-cala-cala-jugadora",
  "name": "Cala Jugadora",
  "coords": [
   42.3171,
   3.3109
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Jugadora+Cadaqués"
 },
 {
  "id": "l-cult-casa-museu-salvador-dali-portlliga",
  "name": "Casa-Museu Salvador Dalí — Portlligat",
  "coords": [
   42.2933,
   3.2889
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Casa-Museu+Salvador+Dalí+Portlligat+Cadaqués"
 },
 {
  "id": "l-cult-esglesia-de-santa-maria-the-fisher",
  "name": "Església de Santa Maria — the fishermen's altarpiece",
  "coords": [
   42.2886,
   3.2758
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Església+de+Santa+Maria+Cadaqués"
 },
 {
  "id": "l-cult-far-de-cap-de-creus-the-lighthouse",
  "name": "Far de Cap de Creus — the lighthouse at Iberia's edge",
  "coords": [
   42.319,
   3.3199
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Far+de+Cap+de+Creus+Cadaqués"
 },
 {
  "id": "l-cult-espai-cap-de-creus-reading-the-roc",
  "name": "Espai Cap de Creus — reading the rock",
  "coords": [
   42.3187,
   3.3193
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Espai+Cap+de+Creus+Cadaqués"
 },
 {
  "id": "l-cult-museu-de-cadaques-the-town-s-own-g",
  "name": "Museu de Cadaqués — the town's own gallery",
  "coords": [
   42.2889,
   3.2772
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Museu+de+Cadaqués"
 },
 {
  "id": "l-cult-the-artist-colony-why-everyone-cam",
  "name": "The artist colony — why everyone came",
  "coords": [
   42.2885,
   3.278
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cadaqués+old+town+waterfront"
 },
 {
  "id": "l-cult-cementiri-de-cadaques-graves-above",
  "name": "Cementiri de Cadaqués — graves above the water",
  "coords": [
   42.2862,
   3.274
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cementiri+de+Cadaqués"
 },
 {
  "id": "l-cult-es-poal-the-cove-dali-painted-at-f",
  "name": "Es Poal — the cove Dalí painted at fifteen",
  "coords": [
   42.2872,
   3.2812
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Es+Poal+Cadaqués"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
