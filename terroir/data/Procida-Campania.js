/* Terroir — Procida · Bay of Naples — hand-built on the upgraded template */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#c4a35a", "market": "#d97706", "shop": "#059669", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Producer / Market", "shop": "Restaurant / Bar", "mainland": "Naples excursion", "logistics": "Getting there"};
  const PRODUCT_COLORS = {"Sea urchin": "#0c4a6e", "Seafood": "#1e40af", "Limoncello": "#ca8a04", "Pastry": "#92400e", "Lingua": "#b45309", "Lemon": "#a16207", "Crudo": "#0f766e", "Rabbit": "#7c3aed", "Pizza": "#dc2626", "Amaro": "#374151", "Bar": "#6b21a8", "Producer": "#065f46"};
  const VENUES = [
 {
  "id": "v01-la-conchiglia",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Seafood",
  "name": "La Conchiglia da Tonino",
  "short": "La Conchiglia",
  "lat": 40.7660,
  "lng": 14.0388,
  "neighborhood": "Spiaggia della Chiaia, northeast coast — accessible only by a 20-min coastal footpath from Corricella, or the free seasonal boat Tonino runs from Marina Corricella every 2 h",
  "tags": [
   "€40–50 pp",
   "Cash only; free seasonal boat from Marina Corricella every 2 h (book by phone); alternatively 20-min coastal footpath",
   "Lunch on the beach terrace, spring to early autumn"
  ],
  "productTags": ["Sea urchin", "Seafood"],
  "verdict": "The one worth the walk — or the boat — not the harbourfront tables that settle for a view",
  "signature": "Ricci di mare: iodine-salt sea-urchin shells straight from the sea below, scooped raw with bread",
  "person": "Tonino, whose first name the restaurant carries; he selects the day's catch personally each morning and runs the free boat himself in season",
  "signal_chip": "4.7 / 5 across 1,570+ reviews · Slow Food Campania recommended · named by Procida Insider among top tables",
  "caveat": "Open spring–early autumn only; cash only; no road access — boat or footpath only; no credit cards",
  "why": "Tonino's is the one locals take the ferry to Naples to tell their friends about — not one of the Corricella waterfront seats, which all have a fine view and little else. The approach is part of it: a 20-minute footpath from Corricella, or the free boat Tonino runs every two hours from the marina in season, and then you arrive at a terrace on dark volcanic sand with the Chiaia bay below the tables. To order: ricci di mare — sea urchin in their shells, tasting of pure iodine and brine, scooped with bread; then spaghetti alle vongole or ravioli di pesce; house limoncello made from the family's own trees to close. Not for anyone expecting year-round opening, a card terminal, or a road. Cash only; closed October–April.",
  "address": "Via Pizzaco 10, Spiaggia della Chiaia, 80079 Procida NA",
  "phone": "—",
  "hours": "Lunch on the beach terrace, spring to early autumn",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Conchiglia+Procida+Via+Pizzaco"
 },
 {
  "id": "v02-caracale",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "Sea urchin",
  "name": "Caracalè",
  "short": "Caracalè",
  "lat": 40.7644,
  "lng": 14.0328,
  "neighborhood": "Via Marina di Corricella 62 — inside the car-free painted harbour, in a converted 17th-century boat-storage deposit built into the sea wall",
  "tags": [
   "€20–40 pp",
   "Reservations advised; +39 081 8969192",
   "Lunch or dinner on the waterfront, spring to autumn"
  ],
  "productTags": ["Sea urchin", "Seafood"],
  "verdict": "The one that earns its view — the spaghetti alla Corricella is the dish, not a prop for the Instagram harbour shot",
  "signature": "Spaghetti alla Corricella: golden sea-urchin roe heaped on pasta, oceanic-salt, olive oil, no cream, nothing between you and the sea",
  "person": "Opened March 2000 in the lenzo (boat deposit) built into the Corricella sea wall; the kitchen staff have not been individually named in available sources",
  "signal_chip": "Recommended by Luciano Pignataro Wine Blog · March 2000 opening in a historic boat storage · cited in 8 major travel guides",
  "caveat": "No motor vehicles can reach Corricella — on foot only; the harbour tables fill fast in August; book ahead",
  "why": "Opened March 2000 in a converted boat-storage deposit — a lenzo, the original vaulted rooms built into the sea wall to house fishing gear and skiffs — whose rough stone arch frames the tables looking out over the Corricella harbour. The kitchen bridges tradition and technique: spaghetti alla Corricella uses sea-urchin roe (ricci di mare) placed directly on al dente pasta with olive oil and nothing else — which only works when the urchins come up the same day. To order: spaghetti alla Corricella; or polpette di melanzane e spada (aubergine and swordfish balls with capers); or zuppa con fagioli e cozze (mussel and bean soup). Fishing boats five metres from the table; the same waterfront Il Postino (1994) made world-famous. Not for spontaneous summer walk-ins — book ahead.",
  "address": "Via Marina di Corricella, 62, 80079 Procida NA",
  "phone": "+39 081 8969192",
  "hours": "Lunch or dinner on the waterfront, spring to autumn",
  "maps": "https://www.google.com/maps/search/?api=1&query=Caracalè+Procida+Corricella"
 },
 {
  "id": "v03-bar-roma",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Pastry",
  "name": "Bar Roma Pasticceria",
  "short": "Bar Roma",
  "lat": 40.7618,
  "lng": 14.0297,
  "neighborhood": "Via Roma 164, steps from Marina Grande — the island's main port",
  "tags": [
   "€3–8 (pastry + espresso)",
   "Walk-in; no reservations; opens early for the morning ferry crowd",
   "Morning — the lingua di Procida is best warm from the oven"
  ],
  "productTags": ["Lingua", "Pastry", "Lemon"],
  "verdict": "The origin of the lingua di Procida — Mazziotti invented it here in the 1950s; every other version on the island measures itself against this one",
  "signature": "Lingua di Procida: hot puff pastry shattering in layers, cold bright lemon crema inside — the contrast of warm flake and sharp citrus is the whole point",
  "person": "Pasquale Mazziotti, the pastry chef who created the lingua di Procida in the 1950s using the thick pith of the Procida lemon; Bar Roma has been his house since",
  "signal_chip": "Gambero Rosso International · invention credited by La Cucina Italiana · documented in Storie Napoli (2022) · the original recipe by Mazziotti",
  "caveat": "A walk-in pasticceria — no restaurant food, no full meals; lines in high summer are real; cash culture",
  "why": "The site was a bar called 'O Cafè re Barone since the 1930s. From the 1970s, pastry chef Pasquale Mazziotti took over and it was Mazziotti who invented the lingua di Procida in the 1950s — a fat oblong of flaky puff pastry shaped like an ox tongue, filled with a cold lemon crema pasticcera made from Procida's De.Co. lemons. Bar Roma is where that pastry was born and where it is still measured; the lingua here arrives still warm from the oven, the pastry shattering in crackled layers at the first bite, releasing cold, intensely lemon cream. To order: the lingua di Procida warm from the oven, with a short espresso. Also: babà al rum, sfogliatella riccia, pastiera napoletana. Not for those expecting a sit-down meal, a table, or a card machine.",
  "address": "Via Roma 164, 80079 Procida NA",
  "phone": "+39 081 8967460",
  "hours": "Morning — the lingua di Procida is best warm from the oven",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Roma+Pasticceria+Procida"
 },
 {
  "id": "v04-bar-dal-cavaliere",
  "cat": "shop",
  "tier": "several",
  "priority": 4,
  "badge": "Bar",
  "name": "Bar dal Cavaliere",
  "short": "Bar dal Cavaliere",
  "lat": 40.7619,
  "lng": 14.0293,
  "neighborhood": "Via Roma 42 — the main harbour square at Marina Grande",
  "tags": [
   "€3–8 (granita, pastry, coffee)",
   "Walk-in; open year-round",
   "Morning for the granita al limone; open through the day"
  ],
  "productTags": ["Lemon", "Pastry"],
  "verdict": "The harbour-square bar for granita al limone — built from real Procida De.Co. lemons, not syrup; a genuine second opinion on the lingua alongside Bar Roma",
  "signature": "Granita al limone: sharp, icy, intense with Procida lemon acidity — the bitter pith oils linger behind the cold citrus",
  "person": "The bar has operated on Via Roma for multiple decades; no individual owner confirmed in available sources",
  "signal_chip": "Lonely Planet listed · visitprocida.com recommended · one of two historic bars on Via Roma that anchor morning life at the port",
  "caveat": "Pastry, coffee and granita only — not a restaurant; granita is seasonal; high-summer queues",
  "why": "Cited by Lonely Planet as the harbour-square bar of reference for granita al limone — the lemon granita is made from real Procida De.Co. lemons, which carry notably higher acidity than Amalfi or Sorrento varieties alongside the fragrant essential oils of the thick rind. The result is sharper, more intense, and more icy than anything made from standard lemons. Also serves the lingua di Procida (neighbor and competitor to Bar Roma, 120 metres along the same Via Roma), espresso, and the full pastry range. Not a restaurant — this is coffee, pastry and granita territory, all day.",
  "address": "Via Roma 42, 80079 Procida NA",
  "phone": "—",
  "hours": "Morning for the granita al limone; open through the day",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+dal+Cavaliere+Procida+Via+Roma"
 },
 {
  "id": "v05-crescenzo",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "Seafood",
  "name": "Crescenzo Hotel Ristorante",
  "short": "Crescenzo",
  "lat": 40.7518,
  "lng": 14.0188,
  "neighborhood": "Via Marina Chiaiolella 33 — directly on the Chiaiolella horseshoe harbour, the island's southern port",
  "tags": [
   "Mid-range (hotel restaurant pricing)",
   "Reservations advised; +39 081 896 7255; hotelcrescenzo.it",
   "Lunch or dinner on the harbourfront; evening pizza from the wood-fired oven"
  ],
  "productTags": ["Seafood", "Pizza"],
  "verdict": "The oldest continuously operating restaurant at Chiaiolella — the founder's biography is specific and verifiable, not a heritage-branding exercise",
  "signature": "Catch of the day simply grilled: sea bass or bream with Procida lemon and olive oil, the fish chosen by the kitchen from the morning's boats",
  "person": "Founded 1953 by Signor Crescenzo (from Ischia, who rowed to Procida daily to sell produce) and his wife Signora Vincenza, daughter of a Chiaiolella merchant; family-run since",
  "signal_chip": "Founded 1953 · one of the oldest restaurants on the island · family history documented on hotelcrescenzo.it · year-round operation",
  "caveat": "A hotel restaurant at a tourist harbour — honest and traditional rather than ambitious; do not arrive expecting destination cooking",
  "why": "In 1953 a man from Ischia rowed across the bay daily to sell vegetables and fell for the daughter of a Chiaiolella merchant. They opened a bar first, then fed 30 construction workers in the area, and it grew into a restaurant and hotel. The kitchen delivers the catch of the day simply grilled — sea bass, bream or octopus, with lemon and oil — and evening pizza from a wood-fired oven. Signora Vincenza's family tradition still shows in the hospitality. To order: whatever is on the slate as the catch of the day, grilled; evening pizza if you want the oven at work. Not for those wanting creative or destination cooking — this is honest, old-fashioned, waterfront Campanian.",
  "address": "Via Marina Chiaiolella, 33, 80079 Procida NA",
  "phone": "+39 081 896 7255",
  "hours": "Lunch or dinner on the harbourfront; evening pizza from the wood-fired oven",
  "maps": "https://www.google.com/maps/search/?api=1&query=Crescenzo+Ristorante+Procida+Chiaiolella"
 },
 {
  "id": "v06-da-girone",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Seafood",
  "name": "Ristorante Da Girone",
  "short": "Da Girone",
  "lat": 40.7580,
  "lng": 14.0250,
  "neighborhood": "Lungomare Cristoforo Colombo 4 — waterfront terrace between Marina Grande and Chiaiolella, with views to Ischia",
  "tags": [
   "Mid-range; reservations strongly advised",
   "Book well ahead in July–August; confirm via phone or booking platform",
   "Lunch and dinner; covered sea-view terrace"
  ],
  "productTags": ["Seafood", "Lemon"],
  "verdict": "Named 'the island's most beloved restaurant' by Procida Insider — the pesto di limone spaghetti is a dish you will want the recipe for and cannot replicate without a Procida lemon",
  "signature": "Spaghetti al pesto di limone: pale-green sauce of Procida lemon zest, pine nuts, herbs, Parmigiano — intensely fragrant, coating each strand without heaviness",
  "person": "Ciro, known as 'Girone' — the restaurant carries his nickname; he selects the catch and ingredients personally each morning at the market",
  "signal_chip": "Named 'the island's most beloved restaurant' by Procida Insider · Ciro's daily market selection confirmed across multiple reviews · terrace with Ischia views",
  "caveat": "Books up days in advance in high season; essential to reserve; the pesto di limone is a lunch dish — order it early",
  "why": "Ciro's nickname is Girone and the name stuck to the restaurant he runs on the sea-view terrace with Ischia across the water. He selects the catch and market produce personally each morning. To order: spaghetti al pesto di limone — the pale green sauce built from Procida De.Co. lemons, pine nuts, walnuts, basil, parsley, Parmigiano and olive oil, intensely fragrant, coating each strand of al dente pasta; or spaghetti con cozze e menta (mussels and fresh mint — a Ciro signature that works completely); or the pasta con crema di mare. Ciro is cited by Procida Insider as running the island's most beloved restaurant — the pesto di limone is the reason. Not for those arriving without a reservation in July–August.",
  "address": "Lungomare Cristoforo Colombo, 4, 80079 Procida NA",
  "phone": "—",
  "hours": "Lunch and dinner; covered sea-view terrace",
  "maps": "https://www.google.com/maps/search/?api=1&query=Da+Girone+Procida"
 },
 {
  "id": "v07-la-medusa",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Crudo",
  "name": "La Medusa",
  "short": "La Medusa",
  "lat": 40.7616,
  "lng": 14.0295,
  "neighborhood": "Via Roma 116 — Marina Grande waterfront, the island's main port",
  "tags": [
   "Mid-range",
   "Book ahead for the crudo menu; contact via booking platform (phone unconfirmed)",
   "Lunch and dinner; established 1954"
  ],
  "productTags": ["Crudo", "Seafood"],
  "verdict": "The oldest restaurant at Marina Grande — over seventy years on the same waterfront — with a raw fish menu that requires advance booking and rewards it",
  "signature": "Crudo di mare: paper-thin carpaccio of the day's local catch — olive oil, lemon, sea salt — purity and freshness over technique",
  "person": "Brothers Marco and Luca (surnames not confirmed in available sources) have run the kitchen for the current generation; the restaurant was established 1954",
  "signal_chip": "Established 1954 · the first dining establishment at Marina Grande · documented by Procida Insider and Yelp · 70+ years of continuous operation",
  "caveat": "The crudo menu requires pre-booking; exact phone number not confirmed — contact via booking platform; winter hours may be reduced",
  "why": "The first proper restaurant ever to open at Marina Grande, in 1954 — which gives La Medusa more than seventy years on the same waterfront, more than any other table in the port. Brothers Marco and Luca run a kitchen that leads with the raw and the pure: the crudo di mare — paper-thin carpaccio of whatever the boats brought in that morning, dressed only with high-quality olive oil, lemon and sea salt — is listed as a special and requires advance booking. To order: the crudo if you have booked; otherwise the spaghetti alle vongole or frittura di paranza (fried mixed small fish — anchovies, whitebait, small squid). Not for those wanting a confirmed phone booking — contact via email or booking platform before going.",
  "address": "Via Roma 116, 80079 Procida NA",
  "phone": "—",
  "hours": "Lunch and dinner; established 1954",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Medusa+Procida+Via+Roma"
 },
 {
  "id": "v08-la-locanda-del-postino",
  "cat": "shop",
  "tier": "several",
  "priority": 8,
  "badge": "Seafood",
  "name": "La Locanda del Postino",
  "short": "La Locanda del Postino",
  "lat": 40.7643,
  "lng": 14.0330,
  "neighborhood": "Via Marina di Corricella 63 — one address from Caracalè on the same Il Postino quayside",
  "tags": [
   "Very reasonable — confirmed by multiple reviewers as priced below comparable waterfront tables",
   "Seasonal; spring to autumn",
   "Lunch and dinner on the Corricella waterfront"
  ],
  "productTags": ["Seafood"],
  "verdict": "The Il Postino quayside is this stretch of Corricella — a working fishermen's taverna, not a film-tourism operation",
  "signature": "Frittura di paranza: whitebait, anchovies and small squid barely battered and hot, served in a cone of paper at the water's edge",
  "person": "No individual owner confirmed in available sources; the quayside location is documented by visitprocida.com at this exact address",
  "signal_chip": "Listed by visitprocida.com and Procida Insider · Il Postino (1994) filmed on this exact stretch of Corricella quay · 4.0 / 5 across 1,274 reviews",
  "caveat": "Seasonal only — confirm dates before arriving off-season; the Il Postino name draws extra crowds in August; waterfront tables go first",
  "why": "The bar and waterfront taverna that forms the backdrop to the most famous scenes of Il Postino (1994) — where Mario first speaks to Beatrice, where Neruda walks, where the fishing village of the film was staged — is this exact stretch of Corricella quay. La Locanda del Postino is a working fisherman's restaurant, not a film-tourism makeover: the kitchen sends out tonno rosso tartare (bluefin tuna, roughly cut, minimally dressed), frittura di paranza (tiny mixed fried fish in a paper cone, hot and barely battered), and spaghetti alle vongole. To order: the frittura di paranza with Falanghina while the fishing boats come in. Not for those arriving off-season without confirming — seasonal hours only.",
  "address": "Via Marina di Corricella, 63, 80079 Procida NA",
  "phone": "—",
  "hours": "Lunch and dinner on the Corricella waterfront; seasonal",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Locanda+del+Postino+Procida+Corricella"
 },
 {
  "id": "v09-il-galeone",
  "cat": "shop",
  "tier": "plenty",
  "priority": 9,
  "badge": "Pizza",
  "name": "Il Galeone",
  "short": "Il Galeone",
  "lat": 40.7517,
  "lng": 14.0192,
  "neighborhood": "Via Marina Chiaiolella 54 — the southern harbour front, next to Crescenzo",
  "tags": [
   "Affordable to mid-range",
   "Walk-in and reservations; +39 081 896 9622",
   "Lunch, dinner, and evening Neapolitan pizza from the wood-fired oven; open year-round"
  ],
  "productTags": ["Pizza", "Seafood"],
  "verdict": "The Chiaiolella anchor — restaurant, pizzeria and bar under one roof, and one of the few tables open year-round on an island that largely hibernates",
  "signature": "Calamarata: wide rings of pasta tangled with squid in a tomato-caper sauce, the pasta absorbing the briny sea into its walls",
  "person": "No individual owner confirmed in available sources; documented on procida.net and Google at this exact address",
  "signal_chip": "4.4 / 5 on Google · documented on procida.net · year-round operation (rare on a seasonal island)",
  "caveat": "Volume restaurant — honest and reliable rather than special; the pizza is the evening strength; lunch is for practical hunger rather than an occasion",
  "why": "Il Galeone operates simultaneously as restaurant, pizzeria and bar — which makes it the practical anchor of Chiaiolella, the southern harbour, on days when more destination tables are closed or full. The kitchen opens year-round, which is genuinely unusual on a seasonal island. To order: calamarata — wide ring pasta with squid in a tomato-caper sauce — or the evening Neapolitan pizza from the wood oven. Tiramisu is the reliable close. Not for those seeking a special occasion table — this is the honest, year-round local of the southern port.",
  "address": "Via Marina Chiaiolella, 54, 80079 Procida NA",
  "phone": "+39 081 896 9622",
  "hours": "Lunch, dinner, and evening Neapolitan pizza; open year-round",
  "maps": "https://www.google.com/maps/search/?api=1&query=Il+Galeone+Procida+Chiaiolella"
 },
 {
  "id": "v10-bar-capriccio",
  "cat": "shop",
  "tier": "plenty",
  "priority": 10,
  "badge": "Bar",
  "name": "Bar Capriccio",
  "short": "Bar Capriccio",
  "lat": 40.7618,
  "lng": 14.0292,
  "neighborhood": "Via Roma 99 — steps from the Marina Grande ferry pier; the first bar most visitors encounter",
  "tags": [
   "Bar prices",
   "Walk-in; open year-round; +39 081 896 8016",
   "Espresso from 7 am through the day; cocktails and occasional live music from late afternoon"
  ],
  "productTags": ["Bar", "Pastry"],
  "verdict": "The first and last bar most visitors encounter — morning lingua di bue still warm from the oven, evening Campari spritz with Ischia across the bay",
  "signature": "Morning lingua di bue with espresso off the Naples ferry: the pastry warm and shattering, the coffee short and dark, the Bay of Naples immediate",
  "person": "No individual owner confirmed in available sources; documented by visitprocida.com at this exact address",
  "signal_chip": "Listed by visitprocida.com · step from the Marina Grande ferry landing · open year-round",
  "caveat": "A multi-purpose bar — coffee, sandwiches, drinks and music — rather than a specialist in any of these; the evening transition to cocktail bar makes it noisy late",
  "why": "Bar Capriccio sits steps from the Marina Grande ferry landing, which makes it where Procida begins and ends for most visitors: morning espresso and a lingua di bue as you arrive off the Naples hydrofoil; a limoncello spritz at the same pavement table at dusk as you wait for the last boat back, with Ischia visible across the water. It moves through three modes in a day: morning café (tramezzini, pastry, coffee from 7 am), lunchtime sandwiches, evening cocktail bar with occasional live music. To order: the lingua di bue warm with espresso on arrival; a limoncello spritz using locally squeezed Procida lemon in the evening. Not for those seeking depth in any single direction — this is gateway-bar utility.",
  "address": "Via Roma 99, 80079 Procida NA",
  "phone": "+39 081 896 8016",
  "hours": "Espresso from 7 am; cocktails and occasional music from late afternoon",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Capriccio+Procida"
 },
 {
  "id": "v11-lubrano-farm",
  "cat": "market",
  "tier": "several",
  "priority": 11,
  "badge": "Producer",
  "name": "Azienda Agricola Lubrano — lemon grove tour",
  "short": "Lubrano Farm",
  "lat": 40.7650,
  "lng": 14.0340,
  "neighborhood": "Via Regina Elena 20, Starza — interior of the island, above Corricella; pre-booking required via procidaexperience.it",
  "tags": [
   "Tour + tasting price (see procidaexperience.it for current rates)",
   "Pre-booking required; pesticide-free, 12,000 sq m grove",
   "Guided visits by appointment; seasonal"
  ],
  "productTags": ["Lemon", "Producer"],
  "verdict": "The most direct encounter with the limone di Procida — the De.Co. lemon too large, too mild and too fragile for commercial export, growing as the Lubranos have grown it for generations",
  "signature": "The limone pane tasted raw in the grove: thick white pith mild as bread, flesh acidic and intensely fragrant — the flavour the lingua di Procida is built on",
  "person": "The Lubrano family (multi-generational); cultivation pesticide-free, technique handed father to son on volcanic-sedimentary soil above Corricella",
  "signal_chip": "Procida lemon on the Slow Food Ark of Taste · De.Co. (Denominazione Comunale) certified grove · documented by procidaexperience.it",
  "caveat": "No walk-ins — pre-booking via procidaexperience.it is mandatory; not accessible without a confirmed reservation",
  "why": "The limone di Procida — also called limone pane (bread lemon) for the thick, mild, sponge-like white pith under its zest — carries a De.Co. (Denominazione Comunale) designation and appears on the Slow Food Ark of Taste as a variety in decline, not the IGP status of the Amalfi or Sorrento lemons. The Lubrano family has cultivated these lemons on 12,000 square metres of volcanic-sedimentary soil, pesticide-free, since before the current generation. The tour walks the grove, explains the cultivation cycle, and ends with a tasting of limoncello and crema di limone made on site. To order (at the tasting): the homemade limoncello and crema di limone; buy a bottle to take the island's defining flavour home. Not accessible without pre-booking through procidaexperience.it — walk-ins will find a locked gate.",
  "address": "Via Regina Elena 20, Starza, 80079 Procida NA",
  "phone": "+39 081 810 1348",
  "hours": "Guided visits by appointment; seasonal",
  "maps": "https://www.google.com/maps/search/?api=1&query=Azienda+Agricola+Lubrano+Procida+Starza"
 },
 {
  "id": "v12-agre-liquorificio",
  "cat": "market",
  "tier": "plenty",
  "priority": 12,
  "badge": "Limoncello",
  "name": "Agre — Liquorificio Artigianale",
  "short": "Agre",
  "lat": 40.7620,
  "lng": 14.0300,
  "neighborhood": "Via Vittorio Emanuele 255 — Marina Grande area",
  "tags": [
   "Retail bottle prices",
   "Walk-in shop; check agreprocida.com for current hours",
   "Shop hours; not a bar or tasting room"
  ],
  "productTags": ["Limoncello", "Amaro"],
  "verdict": "SCORZA is the limoncello that earns the description — a 2-day maceration for fresh-peel intensity, not the cooked-sugar bottle sold by the ferryload at Sorrento",
  "signature": "Fogliolì amaro: macerated from lemon leaves rather than peel — green, bitter, herbaceous; a genuinely unusual Italian spirit that exists almost nowhere else",
  "person": "Artisanal producer (individual founder not confirmed in available sources); operations and products documented at agreprocida.com",
  "signal_chip": "SCORZA reviewed by Cinque Gusti and Bottle of Italy · Fogliolì cited as unique in the Italian amaro landscape · De.Co. Procida lemon source",
  "caveat": "A retail shop only — not a bar, tasting room or café in the conventional sense; confirm hours at agreprocida.com before visiting",
  "why": "SCORZA is the limoncello that earns the word: the peels of Procida De.Co. lemons macerated for only two days — a shorter time than the standard commercial process — yielding intense, bright, fresh-peel fragrance rather than the cooked-sugar flavour of tourist limoncello. At 34% ABV, it is stronger than most. But Fogliolì is the more distinctive product: an amaro made from lemon leaves (foglie) rather than peel, drawing from a Procida tradition of adding leaves to limoncello maceration. The result is greener, more bitter and herbaceous — a genuinely unusual Italian spirit. Reviewed and recommended by Cinque Gusti and Bottle of Italy. To buy: a bottle of SCORZA and a bottle of Fogliolì. Not a tasting bar — confirm hours on the website before making the trip.",
  "address": "Via Vittorio Emanuele 255, 80079 Procida NA",
  "phone": "+39 339 1643991",
  "hours": "Shop hours; see agreprocida.com",
  "maps": "https://www.google.com/maps/search/?api=1&query=Agre+Liquorificio+Procida"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-marina-grande",
  "name": "Marina Grande — the main port",
  "center": [40.7618, 14.0294],
  "radius": 220,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida"
 },
 {
  "id": "n-terra-murata",
  "name": "Terra Murata — the medieval hilltop",
  "center": [40.7694, 14.0345],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida"
 },
 {
  "id": "n-marina-corricella",
  "name": "Marina Corricella — the painted harbour",
  "center": [40.7644, 14.0328],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Corricella+Procida"
 },
 {
  "id": "n-chiaiolella",
  "name": "Chiaiolella — the southern beach port",
  "center": [40.7518, 14.0188],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Chiaiolella+Procida"
 },
 {
  "id": "n-pizzaco-chiaia",
  "name": "Pizzaco / Spiaggia della Chiaia",
  "center": [40.7660, 14.0388],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+della+Chiaia+Procida"
 },
 {
  "id": "n-starza-centane",
  "name": "Starza / Centane — interior lemon country",
  "center": [40.7650, 14.0340],
  "radius": 160,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Starza+Procida"
 }
];
  const WALKS = [
 {
  "id": "w-terra-murata-corricella-descent",
  "name": "Terra Murata → Corricella descent",
  "start": [40.7694, 14.0345],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida+viewpoint"
 },
 {
  "id": "w-corricella-chiaia-coastal-path",
  "name": "Corricella → Spiaggia della Chiaia coastal path",
  "start": [40.7644, 14.0328],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Corricella+Procida"
 },
 {
  "id": "w-island-circuit",
  "name": "Island circuit — full loop",
  "start": [40.7618, 14.0294],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Procida+island+circuit+walk"
 },
 {
  "id": "w-pozzo-vecchio-postino-beach",
  "name": "Pozzo Vecchio / Il Postino beach path",
  "start": [40.7540, 14.0200],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Pozzo+Vecchio+Procida"
 },
 {
  "id": "w-vivara-guided-walk",
  "name": "Vivara Nature Reserve — guided circuit",
  "start": [40.7521, 14.0129],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+Procida+nature+reserve"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-bar-capriccio",
  "name": "Bar Capriccio",
  "start": [40.7618, 14.0292]
 },
 {
  "id": "p-work-caracale-terrace",
  "name": "Caracalè terrace (Corricella)",
  "start": [40.7644, 14.0328]
 },
 {
  "id": "p-work-locanda-del-postino",
  "name": "La Locanda del Postino (Corricella waterfront)",
  "start": [40.7643, 14.0330]
 }
];
  const LANDMARKS = [
 {
  "id": "l-beach-chiaia",
  "name": "Spiaggia della Chiaia",
  "coords": [40.7660, 14.0388],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+della+Chiaia+Procida"
 },
 {
  "id": "l-beach-pozzo-vecchio",
  "name": "Spiaggia del Pozzo Vecchio — Il Postino beach",
  "coords": [40.7540, 14.0200],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Pozzo+Vecchio+Procida"
 },
 {
  "id": "l-beach-ciraccio",
  "name": "Spiaggia di Ciraccio — the long beach with sea stacks",
  "coords": [40.7565, 14.0220],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Ciraccio+Procida"
 },
 {
  "id": "l-beach-chiaiolella",
  "name": "Marina Chiaiolella beach — the horseshoe harbour sand",
  "coords": [40.7518, 14.0188],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Chiaiolella+Procida+beach"
 },
 {
  "id": "l-cult-marina-corricella",
  "name": "Marina Corricella — the painted fishermen's harbour",
  "coords": [40.7644, 14.0328],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Corricella+Procida"
 },
 {
  "id": "l-cult-terra-murata",
  "name": "Terra Murata — the walled medieval village",
  "coords": [40.7694, 14.0345],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida"
 },
 {
  "id": "l-cult-palazzo-davalos",
  "name": "Palazzo d'Avalos — royal residence turned maximum-security prison, now open for visits",
  "coords": [40.7697, 14.0350],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Palazzo+d'Avalos+Procida"
 },
 {
  "id": "l-cult-abbazia-san-michele",
  "name": "Abbazia di San Michele Arcangelo — 11th-century Benedictine abbey and crypt",
  "coords": [40.7691, 14.0344],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Abbazia+San+Michele+Arcangelo+Procida"
 },
 {
  "id": "l-cult-vivara",
  "name": "Vivara — State Nature Reserve and Mycenaean Bronze Age site",
  "coords": [40.7521, 14.0129],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+Procida+nature+reserve"
 },
 {
  "id": "l-cult-pozzo-vecchio-postino",
  "name": "Spiaggia del Pozzo Vecchio — the Il Postino (1994) beach",
  "coords": [40.7540, 14.0200],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Pozzo+Vecchio+Procida"
 },
 {
  "id": "l-gastro-lemon-groves-starza",
  "name": "Lemon groves of Starza — the De.Co. limone di Procida orchards",
  "coords": [40.7650, 14.0340],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=lemon+groves+Starza+Procida"
 },
 {
  "id": "l-gastro-marina-grande-market",
  "name": "Marina Grande market — the island's daily fish and produce market",
  "coords": [40.7618, 14.0294],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=market+Marina+Grande+Procida"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
