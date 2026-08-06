/* Terroir — Procida · Campania · Gulf of Naples — hand-built on the upgraded template */
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
    "Raw fish": "#0ea5e9",
    "Pasta": "#a16207",
    "Wine": "#7c2d12",
    "Pastry": "#92400e",
    "Bar": "#7c3aed",
    "Trattoria": "#059669",
    "Bistro": "#1f2937",
    "Limoncello": "#d97706",
    "Market": "#15803d",
    "Terrace": "#2d4a5e"
  };
  const VENUES = [
 {
  "id": "v01-caracale",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Seafood",
  "name": "Caracalè",
  "short": "Caracalè",
  "lat": 40.7601,
  "lng": 14.0200,
  "neighborhood": "Marina di Corricella — the arc of coloured houses, right on the water at Via Marina di Corricella 62",
  "tags": [
   "EUR 35–60 pp à la carte",
   "Book ahead (phone +39 081 896 9192) especially Nov–Mar for the ricci season; tables fill by 12.30",
   "Lunch and dinner (seasonal hours — confirm in winter)"
  ],
  "productTags": [
   "Seafood",
   "Raw fish",
   "Pasta"
  ],
  "why": "The most considered kitchen at Corricella — a former boat depot (magazzino) at the quayside that kept its tuff-stone arched walls and lined them with candlelight; meaning 'beautiful place' in Greek. To order: Spaghetti ai ricci di mare (sea urchin, the coral folded cold into warm pasta, briny and sweet in quick collapse); canocchie (mantis shrimp grilled simply, eaten with your hands). Not a budget choice; the harbour view and the raw-material quality justify the price, but tourists pay the terrace premium.",
  "address": "Via Marina di Corricella 62, 80079 Procida NA",
  "phone": "+39 081 896 9192",
  "hours": "Lunch and dinner (confirm seasonal hours)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Caracalè+Via+Marina+di+Corricella+62+Procida"
 },
 {
  "id": "v02-la-medusa",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "Raw fish",
  "name": "La Medusa",
  "short": "La Medusa",
  "lat": 40.7643,
  "lng": 14.0242,
  "neighborhood": "Marina Grande — main port, Via Roma 116 (same strip as Bar Dal Cavaliere, two hundred metres from the ferry dock)",
  "tags": [
   "EUR 30–55 pp",
   "Raw fish bar must be pre-booked (phone +39 081 633 1272); cooked menu walk-in",
   "Lunch and dinner"
  ],
  "productTags": [
   "Raw fish",
   "Seafood",
   "Pasta"
  ],
  "why": "Founded in 1954 and relaunched without losing its bones by Marco and Luca — twin sons of Biagio, who opened the original room — the island's oldest serious address at the port. To order: Crudo di gamberi rosa (local pink shrimp split and arranged raw, cold as the sea, sweet and faintly iodine) and the housemade tomato pasta; the raw-fish bar changes daily with the boats. The cooked dishes are honest but the raw counter is the reason to book. Confirm raw-fish availability when you reserve.",
  "address": "Via Roma 116, 80079 Procida NA",
  "phone": "+39 081 633 1272",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Medusa+Via+Roma+116+Procida"
 },
 {
  "id": "v03-un-fuoco",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Trattoria",
  "name": "Un Fuoco Restaurant",
  "short": "Un Fuoco",
  "lat": 40.7622,
  "lng": 14.0218,
  "neighborhood": "Old Procida (Sent'cò quarter) — buried in the narrow lanes behind Marina Grande; follow the lemon-scented alleys uphill from the port",
  "tags": [
   "EUR 25–45 pp",
   "Book ahead (TheFork or phone); small room, fills fast in summer",
   "Dinner; also lunch at weekends"
  ],
  "productTags": [
   "Trattoria",
   "Pasta",
   "Seafood"
  ],
  "why": "Hidden under a lemon-grove canopy in the old lanes of Procida, hosted by Ciro (Girone) who selects the fish personally each morning: the restaurant Procidani send their relatives to when they want the real article without the Corricella premium. To order: Scarpariello — short pasta with burst cherry tomatoes, crushed chili, fresh basil, provolone — and spaghetti al limone pesto e cozze (mussels and mint). Not a view restaurant; no harbourside Instagram moment — that is precisely the point.",
  "address": "Old Procida (Sent'cò quarter) — confirm address when booking",
  "phone": "—",
  "hours": "Dinner; weekend lunch",
  "maps": "https://www.google.com/maps/search/?api=1&query=Un+Fuoco+Restaurant+Procida"
 },
 {
  "id": "v04-bar-dal-cavaliere",
  "cat": "market",
  "tier": "berth_top",
  "priority": 4,
  "badge": "Pastry",
  "name": "Bar Dal Cavaliere",
  "short": "Dal Cavaliere",
  "lat": 40.7641,
  "lng": 14.0238,
  "neighborhood": "Marina Grande — main square, Via Roma 42, thirty seconds from the Caremar ferry dock",
  "tags": [
   "EUR 1.50–3.50 per pastry",
   "Walk-in only",
   "From 7am; the best pieces go by 9.30"
  ],
  "productTags": [
   "Pastry",
   "Bar",
   "Limoncello"
  ],
  "why": "The historic pastry bar of the island since the 1950s, when Neapolitan pastry maker Pasquale Mazziotti settled on Procida and invented its signature form. To order: Lingua di Bue (or Lingua di Procida) — the 'ox tongue' pastry: brittle layers of puff pastry around cold custard cream infused with the island's limone pane (the fat, thick-skinned 'bread lemon' grown on the tuff terraces); also sfogliatella frolla con crema al limone. Opens early and stocks run down fast — not a place to arrive at noon.",
  "address": "Via Roma 42, 80079 Procida NA",
  "phone": "+39 081 810 1074",
  "hours": "From 7am daily",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Dal+Cavaliere+Via+Roma+42+Procida"
 },
 {
  "id": "v05-locanda-del-postino",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "Seafood",
  "name": "La Locanda del Postino",
  "short": "Il Postino",
  "lat": 40.7602,
  "lng": 14.0201,
  "neighborhood": "Marina di Corricella — Via Marina di Corricella 63, below the coloured houses",
  "tags": [
   "EUR 20–35 pp",
   "Walk-in or phone ahead",
   "Lunch and dinner (seasonal)"
  ],
  "productTags": [
   "Seafood",
   "Pasta",
   "Terrace"
  ],
  "why": "Steady, value-driven quayside trattoria at a fraction of its neighbours' prices, named for the 1994 Massimo Troisi film partly shot on Procida (the beach at Pozzo Vecchio, around the headland). To order: Tonno rosso tartare with fennel; spaghetti alle vongole — clams pulled from the bay that morning, white-wine-and-garlic broth soaked up with bread. Local favourite for a reason — not destination-level cooking but honest Corricella fish at real island prices.",
  "address": "Via Marina di Corricella 63, 80079 Procida NA",
  "phone": "—",
  "hours": "Lunch and dinner (seasonal)",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Locanda+del+Postino+Via+Marina+di+Corricella+Procida"
 },
 {
  "id": "v06-bar-graziella",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Bar",
  "name": "Bar Ristorante Graziella",
  "short": "Graziella",
  "lat": 40.7600,
  "lng": 14.0198,
  "neighborhood": "Marina di Corricella — Via Marina di Corricella 96, where the lane opens onto the quay",
  "tags": [
   "EUR 15–28 pp",
   "Walk-in",
   "All day from morning coffee to dinner"
  ],
  "productTags": [
   "Bar",
   "Seafood",
   "Terrace"
  ],
  "why": "Named for the novel that put Procida on the French Romantic map — Alphonse de Lamartine's 1852 Graziella, drawn from his 1811 visit and his love for a fisher's granddaughter (real name Antonella Jacomino) at this very cove. Bar, trattoria and local anchor all at once. To order: Fried mixed fish (frittura mista) straight from the oil, spaghetti con le alici (anchovies, breadcrumbs, parsley); coffee and a pastry at a harbourside table in the morning.",
  "address": "Via Marina di Corricella 96, 80079 Procida NA",
  "phone": "—",
  "hours": "All day (seasonal)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Ristorante+Graziella+Corricella+Procida"
 },
 {
  "id": "v07-la-lampara",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Seafood",
  "name": "La Lampara",
  "short": "La Lampara",
  "lat": 40.7606,
  "lng": 14.0197,
  "neighborhood": "Above Marina di Corricella — at Hotel La Corricella, perched on the cliff with a full-harbour panorama below",
  "tags": [
   "EUR 30–50 pp",
   "Book ahead for a terrace table (via Hotel La Corricella)",
   "Lunch and dinner"
  ],
  "productTags": [
   "Seafood",
   "Terrace",
   "Pasta"
  ],
  "why": "The terrace perched on the tuff cliff above Corricella where the view at sunset — coloured façades reflected in still water, fishing boats at anchor, Vivara in the distance — is as good as Procida gets. The kitchen delivers consistent Campanian seafood: creamy risotto alle frutti di mare (mixed shellfish, light stock, no cream — only the starch), and grilled orata. Not a culinary statement, but the context earns its price. A hotel restaurant; terrace access is open to non-guests.",
  "address": "Hotel La Corricella, Via Marina di Corricella, 80079 Procida NA",
  "phone": "—",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Lampara+Hotel+La+Corricella+Procida"
 },
 {
  "id": "v08-crescenzo",
  "cat": "shop",
  "tier": "several",
  "priority": 8,
  "badge": "Seafood",
  "name": "Ristorante Crescenzo",
  "short": "Crescenzo",
  "lat": 40.7548,
  "lng": 14.0083,
  "neighborhood": "Marina Chiaiolella — the sheltered western port, on the quayside of the Hotel Crescenzo",
  "tags": [
   "EUR 28–48 pp",
   "Walk-in or hotel booking",
   "Lunch and dinner"
  ],
  "productTags": [
   "Seafood",
   "Pasta",
   "Terrace"
  ],
  "why": "Family-run waterfront hotel-restaurant on the quieter Chiaiolella marina — the anchorage that skippers prefer, away from the day-tripper ferry traffic of Marina Grande. To order: Pasta al ragù bianco di pesce (white fish ragù, slow-cooked and delicate, without tomato); tuna tartare with seasonal herbs. Informal, generous portions, genuine family welcome. The better choice after mooring a boat at Chiaiolella or for a meal away from the Corricella cluster.",
  "address": "Marina Chiaiolella, 80079 Procida NA",
  "phone": "—",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Hotel+Crescenzo+Ristorante+Chiaiolella+Procida"
 },
 {
  "id": "v09-caldera-bistrot",
  "cat": "shop",
  "tier": "several",
  "priority": 9,
  "badge": "Bistro",
  "name": "Caldera — Oasi Urbana & Bistrot",
  "short": "Caldera",
  "lat": 40.7620,
  "lng": 14.0225,
  "neighborhood": "Old Procida — inland from Marina Grande, in a courtyard garden",
  "tags": [
   "EUR 20–38 pp",
   "Book ahead (capacity limited)",
   "Dinner; weekend brunch"
  ],
  "productTags": [
   "Bistro",
   "Pasta",
   "Bar"
  ],
  "why": "The new-generation room that the 2022 Capital of Culture stimulus helped bring: a planted courtyard ('urban oasis') in the old town offering a modern bistro take on Campanian cooking — natural wines, creative vegetable plates, scarpariello revisited. Not a traditionalist's address — the crowd is younger, the Italian tourists who discovered Procida post-2022 come here. A useful signal that the island now has both registers.",
  "address": "Old Procida (confirm address when booking)",
  "phone": "—",
  "hours": "Dinner; weekend brunch",
  "maps": "https://www.google.com/maps/search/?api=1&query=Caldera+Oasi+Urbana+Bistrot+Procida"
 },
 {
  "id": "v10-quagliarie",
  "cat": "shop",
  "tier": "plenty",
  "priority": 10,
  "badge": "Trattoria",
  "name": "Quagliariè Trattoria Pizzeria",
  "short": "Quagliariè",
  "lat": 40.7628,
  "lng": 14.0230,
  "neighborhood": "Old Procida — family trattoria inland from Marina Grande",
  "tags": [
   "EUR 18–32 pp",
   "Walk-in; popular with families",
   "Lunch and dinner"
  ],
  "productTags": [
   "Trattoria",
   "Pasta",
   "Seafood"
  ],
  "why": "The family trattoria and pizzeria the island eats at midweek — the local register, not the tourist one. Solid pizza napoletana from a wood oven, straightforward pasta di mare, coniglio alla procidana (the island rabbit braised with cherry tomatoes, garlic and rosemary, the dish that belongs to Sunday lunch). Honest and reliable; the kind of place where the waiter knows every returning family by name.",
  "address": "Old Procida (confirm address when booking)",
  "phone": "—",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Quagliariè+Trattoria+Procida"
 },
 {
  "id": "v11-bar-capriccio",
  "cat": "shop",
  "tier": "plenty",
  "priority": 11,
  "badge": "Bar",
  "name": "Bar Capriccio",
  "short": "Bar Capriccio",
  "lat": 40.7635,
  "lng": 14.0235,
  "neighborhood": "Procida town — between Marina Grande and the old lanes",
  "tags": [
   "EUR 1.20–6 (coffee, drinks, aperitivi)",
   "Walk-in",
   "Morning to late evening"
  ],
  "productTags": [
   "Bar",
   "Limoncello",
   "Terrace"
  ],
  "why": "The local watering hole the guides don't mention and the regulars prefer for a reason — unpretentious, morning espresso to evening aperitivo, Procida limoncello on ice, and the kind of Campanian spritz that doesn't need a recipe. Nothing elevated, nothing themed; just the island drinking to itself on a Tuesday. The caveat is implicit: go to feel Procida as a living place, not as a backdrop.",
  "address": "Procida town",
  "phone": "—",
  "hours": "Morning to late evening",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Capriccio+Procida"
 },
 {
  "id": "v12-mercato-ittico",
  "cat": "market",
  "tier": "berth_top",
  "priority": 12,
  "badge": "Market",
  "name": "Mercato del Pesce — Marina Grande",
  "short": "Fish Market",
  "lat": 40.7645,
  "lng": 14.0248,
  "neighborhood": "Marina Grande — at the port, early morning, beside the commercial fish landing",
  "tags": [
   "Free to walk; fish sold by weight, prices by catch",
   "No booking",
   "Very early morning (5–8am); the best of it is gone by 9am"
  ],
  "productTags": [
   "Market",
   "Seafood",
   "Raw fish"
  ],
  "why": "The operating fish market at the port where the Procida paranza (the traditional flat-bottomed inshore fishing boat) lands its catch before dawn — sea urchins, mantis shrimp, squid, orata, ricciola and whatever the nets found. Come before 7am to see the handoff between the fishermen and the island's cooks. The restaurants you ate in yesterday all started their menus here. Bring cash; bring a cool bag if you intend to cook.",
  "address": "Marina Grande, 80079 Procida NA (port landing, beside ferry dock)",
  "phone": "—",
  "hours": "Very early morning (5–8am)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mercato+del+Pesce+Marina+Grande+Procida"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-marina-grande",
  "name": "Marina Grande",
  "center": [40.7643, 14.0244],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida"
 },
 {
  "id": "n-terra-murata",
  "name": "Terra Murata",
  "center": [40.7623, 14.0185],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida"
 },
 {
  "id": "n-marina-corricella",
  "name": "Marina di Corricella",
  "center": [40.7601, 14.0200],
  "radius": 180,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Corricella+Procida"
 },
 {
  "id": "n-chiaiolella-ciraccio",
  "name": "Chiaiolella & Ciraccio",
  "center": [40.7547, 14.0083],
  "radius": 250,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Chiaiolella+Procida"
 },
 {
  "id": "n-sent-co",
  "name": "Sent'cò (Old Procida)",
  "center": [40.7622, 14.0220],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sent'cò+Procida"
 },
 {
  "id": "n-vivara",
  "name": "Vivara (nature reserve)",
  "center": [40.7487, 14.0008],
  "radius": 300,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+Procida"
 }
];
  const WALKS = [
 {
  "id": "w-terra-murata-vivara-circuit",
  "name": "Terra Murata → Chiaiolella → Vivara bridge circuit",
  "start": [40.7623, 14.0185],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida+walk"
 },
 {
  "id": "w-langostaro-ridge",
  "name": "Langostaro ridge — Procida's high spine from Semmarezio to the Punta Serra viewpoint",
  "start": [40.7630, 14.0210],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Langostaro+Procida+ridge+walk"
 },
 {
  "id": "w-corricella-to-terra-murata",
  "name": "Corricella harbour to Terra Murata — the staircase climb through the fishermen's lanes",
  "start": [40.7601, 14.0200],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Corricella+Terra+Murata+Procida+walk"
 },
 {
  "id": "w-sentiero-dei-limoni",
  "name": "Sentiero dei Limoni — the lemon-grove path through the island's interior terraces",
  "start": [40.7620, 14.0215],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sentiero+dei+Limoni+Procida"
 },
 {
  "id": "w-chiaia-pozzo-vecchio-coast",
  "name": "Chiaia to Pozzo Vecchio — the coast path linking the island's two quietest beaches",
  "start": [40.7568, 14.0125],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Chiaia+beach+Procida+walk"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-bar-graziella",
  "name": "Bar Ristorante Graziella (Corricella)",
  "start": [40.7600, 14.0198]
 },
 {
  "id": "p-work-bar-dal-cavaliere",
  "name": "Bar Dal Cavaliere (Marina Grande)",
  "start": [40.7641, 14.0238]
 },
 {
  "id": "p-work-la-lampara-terrace",
  "name": "La Lampara terrace (Hotel La Corricella)",
  "start": [40.7606, 14.0197]
 },
 {
  "id": "p-work-vivara-belvedere",
  "name": "Vivara bridge belvedere (dawn birdwatch)",
  "start": [40.7487, 14.0008]
 }
];
  const LANDMARKS = [
 {
  "id": "l-beach-pozzo-vecchio",
  "name": "Spiaggia del Pozzo Vecchio (Il Postino beach)",
  "coords": [40.7565, 14.0128],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+del+Pozzo+Vecchio+Procida"
 },
 {
  "id": "l-beach-chiaia",
  "name": "Spiaggia della Chiaia (foot or boat access only)",
  "coords": [40.7568, 14.0125],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+della+Chiaia+Procida"
 },
 {
  "id": "l-beach-ciraccio",
  "name": "Spiaggia di Ciraccio (tuff-rock arches)",
  "coords": [40.7538, 14.0055],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+di+Ciraccio+Procida"
 },
 {
  "id": "l-beach-chiaiolella",
  "name": "Spiaggia di Chiaiolella (sheltered, anchorage)",
  "coords": [40.7548, 14.0083],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+di+Chiaiolella+Procida"
 },
 {
  "id": "l-beach-marina-grande-waterfront",
  "name": "Marina Grande — the ferry-port promenade",
  "coords": [40.7643, 14.0244],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida"
 },
 {
  "id": "l-cult-terra-murata",
  "name": "Terra Murata — the walled citadel on the volcanic ridge",
  "coords": [40.7625, 14.0188],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida"
 },
 {
  "id": "l-cult-abbazia-san-michele",
  "name": "Abbazia di San Michele Arcangelo (11th-century Abbey, Terra Murata)",
  "coords": [40.7628, 14.0183],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Abbazia+San+Michele+Arcangelo+Terra+Murata+Procida"
 },
 {
  "id": "l-cult-palazzo-davaloso",
  "name": "Palazzo d'Avalos — the Bourbon prison above Corricella",
  "coords": [40.7619, 14.0190],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Palazzo+d'Avalos+Procida"
 },
 {
  "id": "l-cult-marina-corricella",
  "name": "Marina di Corricella — the 17th-century fishing harbour",
  "coords": [40.7601, 14.0200],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Corricella+Procida"
 },
 {
  "id": "l-cult-vivara-riserva",
  "name": "Isola di Vivara — Bronze Age ruins and migratory bird reserve",
  "coords": [40.7487, 14.0008],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Isola+di+Vivara+Procida"
 },
 {
  "id": "l-cult-chiesa-santa-maria-grazie",
  "name": "Chiesa di Santa Maria delle Grazie — the island's patronal church",
  "coords": [40.7640, 14.0232],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Chiesa+Santa+Maria+Grazie+Procida"
 },
 {
  "id": "l-cult-pozzo-vecchio-il-postino",
  "name": "Pozzo Vecchio — the Il Postino filming beach (cemetery steps)",
  "coords": [40.7565, 14.0128],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Pozzo+Vecchio+beach+Procida"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
