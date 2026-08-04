/* Terroir — Monopoli · Puglia — hand-built on the upgraded template */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#c4a35a", "market": "#059669", "shop": "#7a3530", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature Table", "market": "Market / Producer", "shop": "Restaurant / Bar", "mainland": "Out of town", "logistics": "Practical"};
  const PRODUCT_COLORS = {
    "Michelin Guide": "#7f1d1d",
    "Adriatic catch": "#1e40af",
    "oyster-citrus": "#0ea5e9",
    "ricci di mare": "#3b82f6",
    "orecchiette": "#a16207",
    "burrata": "#92400e",
    "seafood crudo": "#2563eb",
    "Primitivo": "#7c2d12",
    "wine bar": "#5b21b6",
    "pizza": "#dc2626",
    "tiella": "#b45309",
    "tasting menu": "#166534"
  };
  const VENUES = [
 {
  "id": "v01-radimare",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Michelin Guide",
  "name": "Radimare",
  "short": "Radimare",
  "lat": 40.9490,
  "lng": 17.3058,
  "neighborhood": "Lungomare, Via Beato Pier Giorgio Frassati (200 m from the Castello Carlo V, facing the sea)",
  "tags": [
   "EUR 55–80 pp à la carte",
   "Essential — book ahead; online or by phone",
   "Dinner year-round; lunch in season"
  ],
  "productTags": [
   "Michelin Guide",
   "Adriatic catch",
   "oyster-citrus"
  ],
  "why": "Opened by chef Domenico Ungaro — career at starred restaurants in Italy and Spain; Michelin Guide Italy 2025 listed, Traveller's Choice 2025 To order: Raw Adriatic oyster with beetroot and lime granita — saline, cold-sweet, startlingly precise; or the crunchy mussel scapece with vinegar glaze and fresh mint Fine-dining prices in a town still recalibrating its ambition — EUR 55–80 pp à la carte. Come for dinner, not a quick lunch. Book ahead.",
  "verdict": "The Michelin-listed modern table Monopoli didn't have five years ago — and the one that earned it.",
  "signature": "Raw Adriatic oyster with beetroot and lime granita — saline, cold-sweet, startlingly precise",
  "person": "Chef Domenico Ungaro (starred-restaurant pedigree, Italy and Spain)",
  "signal_chip": "Michelin Guide Italy 2025",
  "caveat": "Fine-dining à la carte — not a casual harbourfront trattoria; EUR 55–80 pp",
  "address": "Via Beato Pier Giorgio Frassati 5A, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Dinner year-round; lunch in season",
  "web": "https://radimare.com/",
  "maps": "https://www.google.com/maps/search/?api=1&query=Radimare+Ristorante+Monopoli+Puglia"
 },
 {
  "id": "v02-la-locanda-sul-porto",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "Local Pick",
  "name": "La Locanda sul Porto",
  "short": "La Locanda sul Porto",
  "lat": 40.9525,
  "lng": 17.3062,
  "neighborhood": "Porto Antico edge, Via Cristoforo Colombo (where the old harbour opens to the lungomare)",
  "tags": [
   "EUR 35–55 pp",
   "Book ahead — fills quickly",
   "Lunch and dinner; catch-dependent"
  ],
  "productTags": [
   "Adriatic catch",
   "seafood crudo",
   "ricci di mare"
  ],
  "why": "Run by the Ostuni family — chef Maurizio Ostuni selects the catch each morning at the Porto Antico fish quay; Giovanni Ostuni runs the room and recites the daily specials; Elizabeth Minchilli listed it among Monopoli's best (2022) To order: Antipasto della Locanda — six preparations of the morning's catch, changing daily by what was landed; then ask Giovanni which rice to follow with The menu is the catch: call ahead out of season to confirm it's open. Small room, fills quickly in July–August.",
  "verdict": "The one locals drive in for, not the harbourfront tourist café — the antipasto is six new dishes every morning.",
  "signature": "Antipasto della Locanda — six preparations of the morning's Adriatic catch, changing daily",
  "person": "Chef Maurizio Ostuni (catch selection); Giovanni Ostuni (dining room)",
  "signal_chip": "Elizabeth Minchilli pick 2022",
  "caveat": "Menu is the catch — call ahead out of season; small room fills fast in July–August",
  "address": "Via Cristoforo Colombo 10, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Lunch and dinner; catch-dependent",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Locanda+sul+Porto+Monopoli+Puglia"
 },
 {
  "id": "v03-my-wine",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Wine",
  "name": "My Wine — Il Piacere del Palato",
  "short": "My Wine",
  "lat": 40.9502,
  "lng": 17.3008,
  "neighborhood": "Centro storico, Via Cavaliere 9 (a quiet lane off the old-town grid)",
  "tags": [
   "EUR 45–65 pp (tasting format)",
   "Reservation essential — Gianni controls covers",
   "Dinner only; entirely gluten-free kitchen"
  ],
  "productTags": [
   "wine bar",
   "burrata",
   "Primitivo"
  ],
  "why": "Owner Gianni controls entry by reservation — limited covers, deliberately — with a gluten-free kitchen sourcing from small Pugliese producers; 4.8 rating from 386+ verified reviews; Elizabeth Minchilli pick (phone +39 080 205 9095, verified 2022) To order: Whatever Gianni's seasonal tasting runs that week — burrata from Andria matched against the wine, a Primitivo from Gioia del Colle poured at the table with the explanation Reservation essential — Gianni may call you back to confirm. Not for those who want a printed menu to compare prices.",
  "verdict": "Monopoli's most intimate table — owner Gianni's 4.8-rated room where the wine comes with an explanation and the burrata is from the caseificio that morning.",
  "signature": "Burrata di Andria IGP with a Gioia del Colle Primitivo — the pairing that makes the wine make sense",
  "person": "Owner Gianni (sommelier and host)",
  "signal_chip": "4.8 rating, 386+ reviews; Elizabeth Minchilli pick 2022",
  "caveat": "Reservation essential — limited covers; no walk-ins; gluten-free only kitchen",
  "address": "Via Cavaliere 9, 70043 Monopoli (BA)",
  "phone": "+39 080 205 9095",
  "hours": "Dinner only",
  "maps": "https://www.google.com/maps/search/?api=1&query=My+Wine+Il+Piacere+del+Palato+Monopoli+Puglia"
 },
 {
  "id": "v04-osteria-perricci",
  "cat": "shop",
  "tier": "several",
  "priority": 4,
  "badge": "Local",
  "name": "Osteria Perricci",
  "short": "Osteria Perricci",
  "lat": 40.9500,
  "lng": 17.3025,
  "neighborhood": "Old town, Via Orazio Comes 1 (a short lane near the Porto Antico)",
  "tags": [
   "EUR 25–40 pp",
   "Walk-in; phone +39 080 937 2208",
   "Lunch and dinner"
  ],
  "productTags": [
   "Adriatic catch",
   "ricci di mare",
   "orecchiette"
  ],
  "why": "One of Monopoli's oldest family-run osterias, on Via Orazio Comes near the old harbour; Elizabeth Minchilli's reliable pick (2022) for the no-frills fish lunch; phone +39 080 937 2208 (verified via Minchilli 2022) To order: Marinated mussels (cozze marinate), the mixed fried seafood platter, or whatever the antipasto selection runs — seasonal, no fixed menu Cash culture; confirm hours by phone. Order the seafood, not the pasta — the orecchiette is inconsistent on the tourist-facing nights.",
  "verdict": "The oldest-feeling osteria at the Porto Antico — order the mussels, not the pasta, and you'll understand why Elizabeth Minchilli keeps listing it.",
  "signature": "Cozze marinate — Adriatic mussels marinated in garlic, olive oil, parsley and sea acid",
  "person": "Long-established family; current keeper unverified by primary source",
  "signal_chip": "Elizabeth Minchilli pick 2022",
  "caveat": "Order seafood, not pasta; cash preferred; hours variable — call ahead",
  "address": "Via Orazio Comes 1, 70043 Monopoli (BA)",
  "phone": "+39 080 937 2208",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Osteria+Perricci+Monopoli+Puglia"
 },
 {
  "id": "v05-piazza-palmieri",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "Seafood",
  "name": "Ristorante Piazza Palmieri",
  "short": "Piazza Palmieri",
  "lat": 40.9512,
  "lng": 17.3016,
  "neighborhood": "Centro storico, near Piazza Palmieri (shaded square in the old-town grid)",
  "tags": [
   "EUR 35–55 pp",
   "Recommended — book in season",
   "Lunch and dinner"
  ],
  "productTags": [
   "seafood crudo",
   "Adriatic catch",
   "orecchiette"
  ],
  "why": "Established seafood restaurant in the centro storico near the piazza; 4.5 rating, 1,566+ verified reviews; Puglian culinary tradition with modern technique To order: The crudo di mare platter (raw Adriatic seafood — sea urchin, oyster, cuttlefish, local clam) and the house pasta with shellfish Ask for the outdoor piazza table — the shaded square makes the difference in summer. High-season waits even with a reservation.",
  "verdict": "The most consistent centre-of-town seafood table — 1,566 reviews at 4.5 and the piazza table is the one to ask for.",
  "signature": "Crudo di mare — raw Adriatic platter anchored by ricci di mare and the day's shellfish",
  "person": "Owner/chef not confirmed by primary source",
  "signal_chip": "4.5 rating, 1,566+ verified reviews",
  "caveat": "High-season waits even with a reservation; request the outdoor piazza table",
  "address": "Near Piazza Palmieri, centro storico, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Piazza+Palmieri+Monopoli+Puglia"
 },
 {
  "id": "v06-la-locanda-dei-mercanti",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Trattoria",
  "name": "La Locanda dei Mercanti",
  "short": "La Locanda dei Mercanti",
  "lat": 40.9508,
  "lng": 17.3022,
  "neighborhood": "Old town, Via Giuseppe Garibaldi 44 (the historic merchants' street of the borgo antico)",
  "tags": [
   "EUR 25–40 pp",
   "Walk-in friendly; 4.3 rating",
   "Lunch and dinner"
  ],
  "productTags": [
   "tiella",
   "Adriatic catch",
   "orecchiette"
  ],
  "why": "Cozy trattoria in Via Giuseppe Garibaldi 44, the old merchants' street of the borgo antico; 4.3 rating, 1,458+ reviews; known for local seasonal seafood and honest Pugliese portions To order: Tiella di riso patate e cozze (mussel, potato and rice tray-bake) when it appears — the Monopoli classic that takes 90 minutes in the forno; or the seafood pasta of the day Small and fills for lunch; walk-in friendly outside summer. Phone unverified — walk in.",
  "verdict": "The right trattoria on the right merchant street — come for the tiella, the Pugliese tray-bake that takes ninety minutes and tastes like the town.",
  "signature": "Tiella di riso patate e cozze — mussel, potato and Arborio rice baked in olive oil until the top crust catches",
  "person": "Family-run; owner name unverified by primary source",
  "signal_chip": "4.3 rating, 1,458+ verified reviews",
  "caveat": "Phone unverified — walk in; tiella may not be available daily, ask on arrival",
  "address": "Via Giuseppe Garibaldi 44, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Locanda+dei+Mercanti+Monopoli+Puglia"
 },
 {
  "id": "v07-trattoria-da-pierino",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Seafood",
  "name": "Trattoria da Pierino l'Inglese",
  "short": "Da Pierino l'Inglese",
  "lat": 40.9497,
  "lng": 17.3035,
  "neighborhood": "Old town edge, Via Amalfitana 14 (a lane linking the old port area to the lungomare)",
  "tags": [
   "EUR 20–35 pp",
   "Walk-in; phone +39 080 930 6842",
   "Lunch"
  ],
  "productTags": [
   "Adriatic catch",
   "orecchiette",
   "tiella"
  ],
  "why": "Family-run at Via Amalfitana 14, phone +39 080 930 6842 (verified via Elizabeth Minchilli 2022); inherited home-style Pugliese cooking with a seafood focus; Elizabeth Minchilli's pick for 'cozy classic home-style cooking' To order: The day's grilled fish, kept to the simplest preparation — olive oil, lemon, the Adriatic — and the homemade orecchiette with fresh tomato and basil in August Not for a grand occasion — the value is in the simplicity and the authenticity. Best at lunch.",
  "verdict": "The home-kitchen trattoria where the simplest Pugliese preparations are done right — grilled Adriatic catch, orecchiette, nothing more needed.",
  "signature": "Grilled Adriatic catch of the day — olive oil, lemon, garlic, the honest preparation that tells you about the fish",
  "person": "Family kitchen; owner name not confirmed by primary source",
  "signal_chip": "Elizabeth Minchilli pick 2022; phone verified",
  "caveat": "Lunch-focused; home-style simplicity — not for grand-occasion dining",
  "address": "Via Amalfitana 14, 70043 Monopoli (BA)",
  "phone": "+39 080 930 6842",
  "hours": "Lunch",
  "maps": "https://www.google.com/maps/search/?api=1&query=Trattoria+da+Pierino+l'Inglese+Monopoli+Puglia"
 },
 {
  "id": "v08-carlo-quinto",
  "cat": "shop",
  "tier": "several",
  "priority": 8,
  "badge": "Seafood",
  "name": "Carlo Quinto",
  "short": "Carlo Quinto",
  "lat": 40.9486,
  "lng": 17.3048,
  "neighborhood": "Lungomare, Via Santa Maria 52 (directly on the seafront, looking toward the Porto Antico)",
  "tags": [
   "EUR 30–50 pp",
   "Recommended in season",
   "Lunch and dinner on the terrace"
  ],
  "productTags": [
   "Adriatic catch",
   "seafood crudo",
   "ricci di mare"
  ],
  "why": "On Via Santa Maria 52 directly on the lungomare, with a terrace that watches the boats enter the Porto Antico; Elizabeth Minchilli's guests consistently recommend it (2022 listing) To order: The seafood carbonara — spaghetti with raw-egg richness and today's catch instead of guanciale; or the crudo di mare with ricci di mare and local clam Terrace tables fill first — arrive early or call ahead. Phone unverified — use walk-in or a booking platform.",
  "verdict": "The lungomare terrace table the guests always end up recommending — the seafood carbonara is the dish to order.",
  "signature": "Seafood carbonara — spaghetti with raw-egg sauce and the day's Adriatic catch in place of guanciale",
  "person": "Owner/chef unverified by primary source",
  "signal_chip": "Elizabeth Minchilli guest recommendation 2022",
  "caveat": "Terrace tables go first — arrive early; phone unverified; seasonal hours",
  "address": "Via Santa Maria 52, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Lunch and dinner on the terrace",
  "maps": "https://www.google.com/maps/search/?api=1&query=Carlo+Quinto+Monopoli+Puglia"
 },
 {
  "id": "v09-orto-nina-trulli",
  "cat": "mainland",
  "tier": "several",
  "priority": 9,
  "badge": "Michelin Guide",
  "name": "Orto — Nina Trulli Resort",
  "short": "Orto (Nina Trulli)",
  "lat": 40.9260,
  "lng": 17.2750,
  "neighborhood": "5 km inland from Monopoli, in the Valle d'Itria — a trulli masseria among dry-stone walls, vineyards and oak",
  "tags": [
   "EUR 55–90 pp (tasting menu)",
   "Essential — book ahead",
   "Dinner; lunch by arrangement"
  ],
  "productTags": [
   "tasting menu",
   "Michelin Guide"
  ],
  "why": "In a trulli masseria 5 km inland from Monopoli, in the Valle d'Itria; Michelin Guide Italy recommended; resident chef Paola Alemanno; daily harvest from the estate's kitchen garden and surrounding countryside To order: The 'tutto verde' (all-green) tasting menu — herbs, vegetables and edible flowers gathered that morning, the kitchen's answer to what Puglia grows rather than what the sea gives Requires a car — 5 km from the centro storico. The vegetable tasting is the point; an option including animal products also exists.",
  "verdict": "The most surprising table in Puglia — a trulli courtyard where chef Paola Alemanno outthinks the postcard setting with an entirely vegetable tasting.",
  "signature": "The 'tutto verde' tasting — herbs, vegetables and edible flowers harvested that morning from the estate's orto",
  "person": "Chef Paola Alemanno (resident chef)",
  "signal_chip": "Michelin Guide Italy recommended",
  "caveat": "5 km from town — requires a car; the all-vegetable menu is the point; book well ahead",
  "address": "Contrada Sant'Angelo, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Dinner; lunch by arrangement",
  "web": "https://www.ortoilristorante.com/en/",
  "maps": "https://www.google.com/maps/search/?api=1&query=Orto+Ristorante+Nina+Trulli+Resort+Monopoli+Puglia"
 },
 {
  "id": "v10-terrazzamare",
  "cat": "shop",
  "tier": "plenty",
  "priority": 10,
  "badge": "Seafood",
  "name": "Terrazzamare",
  "short": "Terrazzamare",
  "lat": 40.9496,
  "lng": 17.3045,
  "neighborhood": "Old walls, Via Portavecchia 50 (terrace over the sea on the south side of the centro storico)",
  "tags": [
   "EUR 30–50 pp",
   "Walk-in or book in season",
   "Lunch and dinner; terrace open in good weather"
  ],
  "productTags": [
   "Adriatic catch",
   "seafood crudo"
  ],
  "why": "At Via Portavecchia 50, on the old walls above the sea, with a panoramic terrace looking back at the centro storico and south along the coast; Elizabeth Minchilli listing (2022) To order: The seafood of the day on the terrace — the setting does as much as the plate; request an outdoor table or wait for one Large terrace means no scarcity of seats, which is also why it's sometimes uneven. Come for the view and the aperitivo, not the most precise cooking in town.",
  "verdict": "The terrace-over-the-sea spot that the view justifies — order the catch, not the complicated preparations.",
  "signature": "Grilled catch of the day on the terrace above the old walls, looking south along the Adriatic coast",
  "person": "Owner/chef unverified by primary source",
  "signal_chip": "Elizabeth Minchilli listing 2022",
  "caveat": "Can be uneven — a large terrace lacks the discipline of a small room; the view is the real draw",
  "address": "Via Portavecchia 50, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Lunch and dinner; terrace open in good weather",
  "maps": "https://www.google.com/maps/search/?api=1&query=Terrazzamare+Monopoli+Puglia"
 },
 {
  "id": "v11-il-guazzetto",
  "cat": "shop",
  "tier": "plenty",
  "priority": 11,
  "badge": "Seafood",
  "name": "Il Guazzetto",
  "short": "Il Guazzetto",
  "lat": 40.9503,
  "lng": 17.3018,
  "neighborhood": "Centro storico, a quiet lane close to the old-town grid (no sea view)",
  "tags": [
   "EUR 25–40 pp",
   "4.3 rating, 2,389+ reviews",
   "Lunch and dinner"
  ],
  "productTags": [
   "Adriatic catch",
   "seafood crudo"
  ],
  "why": "Tucked on a quiet inland lane of the centro storico; 4.3 rating, 2,389+ verified reviews; consistently praised for the fish soups, tuna tartare and crab preparations To order: The fish soup (zuppa di pesce) in autumn and winter — the Adriatic catch slow-cooked with tomato, herbs and a heel of bread; or the tuna tartare with capers and preserved anchovy Inland room, no sea view — the value is in the cooking, not the setting. Phone unverified — walk in.",
  "verdict": "The well-reviewed inland trattoria for fish soup in winter — 2,389 reviews at 4.3, none of them about the view.",
  "signature": "Zuppa di pesce — Adriatic catch slow-cooked with tomato, wild herbs and garlic, served with grilled bread",
  "person": "Owner/chef unverified by primary source",
  "signal_chip": "4.3 rating, 2,389+ verified reviews",
  "caveat": "No sea view; inland room; phone unverified — walk in",
  "address": "Centro storico, 70043 Monopoli (BA)",
  "phone": "—",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Il+Guazzetto+Monopoli+Puglia"
 },
 {
  "id": "v12-ai-portici",
  "cat": "shop",
  "tier": "plenty",
  "priority": 12,
  "badge": "Pizza",
  "name": "Ai Portici",
  "short": "Ai Portici",
  "lat": 40.9507,
  "lng": 17.3003,
  "neighborhood": "Centro storico, Via Milazzo 26",
  "tags": [
   "EUR 10–20 pp",
   "Phone +39 334 880 7891 (verified)",
   "Dinner; closes ~22:30"
  ],
  "productTags": [
   "pizza"
  ],
  "why": "Via Milazzo 26, phone +39 334 880 7891 (verified via Elizabeth Minchilli 2022); her direct call-out as the best pizza in Monopoli — wood-fired, high-temperature, properly blistered To order: The Margherita with fior di latte — the baseline that tells you everything about the dough and the oven Not a seafood kitchen — order pizza. Closes earlier than restaurants, around 22:30.",
  "verdict": "Elizabeth Minchilli's pick for the best pizza in Monopoli — wood-fired, blistered, the Margherita is the test.",
  "signature": "Margherita with fior di latte — the wood-fired dough that blisters at the edges and collapses in the centre",
  "person": "Owner unverified by primary source",
  "signal_chip": "Elizabeth Minchilli pick 2022; phone verified",
  "caveat": "Not a seafood kitchen; order pizza only; closes ~22:30, earlier than restaurants",
  "address": "Via Milazzo 26, 70043 Monopoli (BA)",
  "phone": "+39 334 880 7891",
  "hours": "Dinner; closes ~22:30",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ai+Portici+Monopoli+Puglia"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-porto-antico-borgo-antico",
  "name": "Porto Antico / Borgo Antico",
  "center": [40.9515, 17.3048],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Porto+Antico+Monopoli+Puglia"
 },
 {
  "id": "n-via-dei-mercanti",
  "name": "Via dei Mercanti (Garibaldi)",
  "center": [40.9508, 17.3022],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Via+Garibaldi+Monopoli+centro+storico"
 },
 {
  "id": "n-lungomare",
  "name": "Lungomare",
  "center": [40.9495, 17.3055],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Lungomare+Monopoli+Puglia"
 },
 {
  "id": "n-capitolo",
  "name": "Capitolo (south beaches)",
  "center": [40.9120, 17.3220],
  "radius": 400,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Capitolo+Monopoli+Puglia+beaches"
 }
];
  const WALKS = [
 {
  "id": "w-le-calette",
  "name": "Le Calette — the coastal cove trail north of town",
  "start": [40.9530, 17.3060],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Le+Calette+Monopoli+coastal+walk"
 },
 {
  "id": "w-centro-storico-circuit",
  "name": "Centro storico circuit — from the Cattedrale to the Castello",
  "start": [40.9510, 17.3018],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cattedrale+Madonna+della+Madia+Monopoli"
 },
 {
  "id": "w-lungomare-abbazia",
  "name": "Lungomare to Porto Ghiacciolo and the Abbazia di Santo Stefano",
  "start": [40.9490, 17.3058],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Porto+Ghiacciolo+Abbazia+Santo+Stefano+Monopoli"
 },
 {
  "id": "w-cala-porta-vecchia-circuit",
  "name": "Cala Porta Vecchia — the in-town beach walk",
  "start": [40.9488, 17.3042],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Porta+Vecchia+Monopoli+Puglia"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-my-wine",
  "name": "My Wine (by reservation only — the focused room)",
  "start": [40.9502, 17.3008]
 },
 {
  "id": "p-work-piazza-palmieri",
  "name": "Piazza Palmieri (shaded square, morning coffee)",
  "start": [40.9512, 17.3016]
 },
 {
  "id": "p-work-lungomare",
  "name": "Lungomare (morning bar, standing espresso)",
  "start": [40.9490, 17.3058]
 }
];
  const LANDMARKS = [
 {
  "id": "l-beach-cala-porta-vecchia",
  "name": "Cala Porta Vecchia — the in-town sandy cove",
  "coords": [40.9488, 17.3042],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Porta+Vecchia+Monopoli+Puglia"
 },
 {
  "id": "l-beach-porto-ghiacciolo",
  "name": "Porto Ghiacciolo — cold-spring cove below the 1086 abbey",
  "coords": [40.9277, 17.3161],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Porto+Ghiacciolo+Beach+Monopoli+Puglia"
 },
 {
  "id": "l-beach-cala-paura",
  "name": "Cala Paura — rocky local cove, lighter crowds",
  "coords": [40.9420, 17.3105],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Paura+Monopoli+Puglia"
 },
 {
  "id": "l-beach-cala-cozze",
  "name": "Cala Cozze — clear water, good for snorkelling",
  "coords": [40.9460, 17.3088],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Cozze+Monopoli+Puglia"
 },
 {
  "id": "l-beach-capitolo",
  "name": "Capitolo — wide sandy strip, beach clubs, south of town",
  "coords": [40.9120, 17.3220],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Capitolo+Beach+Monopoli+Puglia"
 },
 {
  "id": "l-cult-castello-carlo-v",
  "name": "Castello Carlo V — 16th-century Spanish fortress on the harbour",
  "coords": [40.9498, 17.3062],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Castello+Carlo+V+Monopoli+Puglia"
 },
 {
  "id": "l-cult-cattedrale-madonna-madia",
  "name": "Cattedrale della Madonna della Madia — baroque cathedral, 18th-century façade",
  "coords": [40.9510, 17.3018],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cattedrale+Madonna+della+Madia+Monopoli"
 },
 {
  "id": "l-cult-abbazia-santo-stefano",
  "name": "Abbazia di Santo Stefano — Norman abbey founded 1086, above its own cove",
  "coords": [40.9275, 17.3158],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Abbazia+di+Santo+Stefano+Monopoli+Puglia"
 },
 {
  "id": "l-cult-porto-antico",
  "name": "Porto Antico — the Roman-era harbour still in daily use",
  "coords": [40.9525, 17.3050],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Porto+Antico+Monopoli+Puglia"
 },
 {
  "id": "l-market-mercato-ittico",
  "name": "Mercato Ittico — the early-morning fish quay at the Porto Antico",
  "coords": [40.9528, 17.3048],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Mercato+Ittico+Monopoli+Puglia"
 },
 {
  "id": "l-producer-polvanera",
  "name": "Cantine Polvanera — organic Gioia del Colle DOC Primitivo (30 min inland)",
  "coords": [40.9700, 17.0100],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cantine+Polvanera+Gioia+del+Colle+Puglia"
 },
 {
  "id": "l-producer-fatalone",
  "name": "Fatalone — first single-varietal Gioia del Colle Primitivo (1987, organic)",
  "coords": [40.9650, 16.9250],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Fatalone+Gioia+del+Colle+Primitivo+Puglia"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
