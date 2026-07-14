/* Terroir — Trapani · Sicilia Occidentale — hand-built July 2026 */
window.TERROIR_DATA = (function () {
  const COLORS = {
    "berth": "#b8860b",
    "market": "#e07020",
    "shop": "#1b7340",
    "mainland": "#6a2fa0",
    "logistics": "#2d4a5e"
  };
  const CAT_LABELS = {
    "berth": "Signature",
    "market": "Market / Direct",
    "shop": "Restaurant / Bar",
    "mainland": "Out of town",
    "logistics": "Logistics"
  };
  const PRODUCT_COLORS = {
    "Michelin": "#7f1d1d",
    "Sicilian creative": "#1f2937",
    "Traditional": "#a16207",
    "Couscous": "#d97706",
    "Wine": "#7c2d12",
    "Pasticceria": "#92400e",
    "Wine bar": "#7c3aed",
    "Salt": "#2d4a5e",
    "Fish market": "#3b82f6",
    "Busiate": "#a16207",
    "Tuna": "#dc2626",
    "Granita": "#0ea5e9"
  };
  const VENUES = [
 {
  "id": "v01-osteria-il-moro",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Michelin",
  "name": "Osteria il Moro",
  "short": "Osteria il Moro",
  "lat": 38.0175,
  "lng": 12.5165,
  "neighborhood": "Historic centre, Via Garibaldi — the Baroque lane running from the Corso to the waterfront",
  "tags": [
   "EUR 60–90 pp tasting menu (dinner); à la carte ~EUR 45–60 pp (lunch Fri–Sun)",
   "Book online or by phone — fills Thu–Sun; reservation essential",
   "Dinner Tue–Sun; lunch Friday–Sunday"
  ],
  "productTags": [
   "Michelin",
   "Sicilian creative",
   "Wine"
  ],
  "verdict": "The only kitchen in the province pushing Sicilian tradition into creative territory; what locals book for a serious occasion, not the harbour-front choice",
  "person": "Nicola Bandi (self-taught chef) and Enzo Bandi (sommelier, 700+ labels); opened December 2016",
  "signature": "Triglia alla stimpirata — red mullet over vinegar-capered sweet-sour reduction, taut and briny",
  "signal_chip": "Michelin Guide Italy (2+ consecutive years); Gambero Rosso; Identità Golose; Golosario (Paolo Massobrio)",
  "caveat": "Only fine-dining table in the province — not for a quick couscous; tasting menu format at dinner only",
  "why": "Brothers Nicola Bandi (chef, self-taught on his grandmother's recipes) and Enzo Bandi (sommelier, 700+ labels) opened in December 2016. Listed in the Michelin Guide for two consecutive years; cited in Gambero Rosso, Identità Golose and Golosario. To order: Triglia (red mullet) alla stimpirata — the Trapanese sweet-sour caponata reduction applied to fish, briny with Pantelleria capers and local olives, sourced from the Tyrrhenian boats that morning. Tasting menus at dinner only; à la carte at weekend lunch. The only fine-dining table in the province — not for a quick couscous.",
  "address": "Via Garibaldi 86, 91100 Trapani TP",
  "phone": "+39 0923 873 985",
  "hours": "Dinner Tue–Sun; lunch Fri–Sun. Closed Monday.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Osteria+il+Moro+Via+Garibaldi+Trapani"
 },
 {
  "id": "v02-cantina-siciliana",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "Couscous",
  "name": "Cantina Siciliana",
  "short": "Cantina Siciliana",
  "lat": 38.0173,
  "lng": 12.5121,
  "neighborhood": "La Giudecca — the old Jewish quarter, Via Giudecca",
  "tags": [
   "EUR 25–40 pp",
   "No reservation required for lunch; book for weekend dinner by phone",
   "Lunch and dinner (lunch closes ~15:00)"
  ],
  "productTags": [
   "Couscous",
   "Traditional",
   "Busiate"
  ],
  "verdict": "The cuscusu table that earns its Gambero Rosso Chiocciola — the Arab-Sicilian lineage is alive here, not performed",
  "person": "Founded 1958; chef Hajer Aissi (Tunisian-born, trained under owner Pino Maggiore since 1980); dining room: sister Ibtisem Aissi",
  "signature": "Cuscusu al pesce — hand-rolled semolina steamed in the clay cuscussiera, served in aromatic scorpionfish broth",
  "signal_chip": "Gambero Rosso Chiocciola (Osterie d'Italia 2019)",
  "caveat": "Lunch-focused and small — the room fills quickly; arrive before 12:30 or book the evening",
  "why": "Founded on 13 August 1958 by the Scarcella family; Pino Maggiore has owned it since 1980 and passed the kitchen to chef Hajer Aissi (Tunisian-born, trained under Maggiore), whose sister Ibtisem runs the dining room. Gambero Rosso Chiocciola (Osterie d'Italia 2019 — the snail symbol for authentic, soul-driven trattorie). To order: cuscusu al pesce — the semolina hand-rolled to the old method (not pre-made) and steamed in a clay cuscussiera, then ladled with a slow scorpionfish-and-sea-bass broth. The Arab-Sicilian lineage is alive here, not a heritage gesture. Closes early afternoon; arrive by 12:30 or book the evening.",
  "address": "Via Giudecca 36, 91100 Trapani TP",
  "phone": "+39 0923 28673",
  "hours": "Lunch and dinner; closed Sunday evening. Lunch service closes ~15:00.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Cantina+Siciliana+Via+Giudecca+Trapani"
 },
 {
  "id": "v03-la-bettolaccia",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Traditional",
  "name": "Osteria La Bettolaccia",
  "short": "La Bettolaccia",
  "lat": 38.0165,
  "lng": 12.5125,
  "neighborhood": "Centro storico, Via Generale Enrico Fardella (corner of Via San Francesco d'Assisi)",
  "tags": [
   "EUR 25–40 pp",
   "Book by phone for weekends — fills fast; walk-in accepted weekdays",
   "Lunch and dinner"
  ],
  "productTags": [
   "Couscous",
   "Busiate",
   "Traditional"
  ],
  "verdict": "The 80-year neighbourhood table that Trapanesi choose when they're not trying to impress anyone — the couscous is the point",
  "person": "Francesco Fileccia, proprietor for over 20 years; the house predates him by half a century",
  "signature": "Busiate al pesto trapanese — spiral hand-pasta with raw almond-tomato pesto, unmistakably local",
  "signal_chip": "80+ year establishment; sustained multi-year TripAdvisor Certificate of Excellence",
  "caveat": "No digital booking; phone only. Neighbourhood room with no views — the cooking is the reason",
  "why": "The house dates back over eighty years; Francesco Fileccia has run it for more than twenty. Walls hung with fishing scenes and local photographs, tables without a sea view — a Trapanese room, not a tourist one. To order: busiate al pesto trapanese (the house spiral pasta with a raw pesto of almonds, fresh tomato, garlic and basil — nothing from Genoa) or the couscous di pesce, then grilled fish of the day. The kitchen closes when the fish runs out. Phone only for reservations; do not walk in on Saturday without calling.",
  "address": "Via Generale Enrico Fardella 25, 91100 Trapani TP",
  "phone": "+39 0923 21695",
  "hours": "Lunch and dinner; closed Sunday.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Osteria+La+Bettolaccia+Trapani"
 },
 {
  "id": "v04-salamureci",
  "cat": "shop",
  "tier": "several",
  "priority": 4,
  "badge": "Couscous",
  "name": "Ristorante Salamureci",
  "short": "Salamureci",
  "lat": 38.0172,
  "lng": 12.5145,
  "neighborhood": "Centro storico, Trapani (outdoor cloister setting)",
  "tags": [
   "EUR 30–50 pp",
   "Book via website or phone; outdoor cloister seats are the prize",
   "Lunch and dinner"
  ],
  "productTags": [
   "Couscous",
   "Traditional",
   "Busiate"
  ],
  "verdict": "The newest name in the Trapani conversation — Gambero Rosso first Forchetta in 2025 is the signal",
  "person": "Chef-patron Michele Bellezza",
  "signature": "Couscous con zuppa di pesce — the broth poured at the table over hand-steamed grain",
  "signal_chip": "Gambero Rosso first Forchetta 2025",
  "caveat": "Street address not confirmed from a primary source — book through Gambero Rosso listing or by phone",
  "why": "Chef Michele Bellezza opened Salamureci in the centro storico, earning the restaurant's first Gambero Rosso Forchetta in 2025 — a new name on a list otherwise dominated by long-running trattorie. The draw is the outdoor cloister setting: white stone and citrus, particularly compelling at evening. To order: couscous con zuppa di pesce, with the broth poured tableside. Exact street address not confirmed from a primary source — book through the Gambero Rosso listing or call ahead.",
  "address": "Trapani centro storico (address: verify on booking; cloister setting)",
  "phone": "",
  "hours": "Lunch and dinner; check current hours on booking platform.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Salamureci+Trapani"
 },
 {
  "id": "v05-al-vicoletto",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "Traditional",
  "name": "Al Vicoletto",
  "short": "Al Vicoletto",
  "lat": 38.0170,
  "lng": 12.5149,
  "neighborhood": "Old town, Via Biscottai (a narrow lane in the historic core, near Piazza Saturno)",
  "tags": [
   "EUR 25–35 pp",
   "Walk-in friendly; small room so book ahead for groups",
   "Lunch and dinner"
  ],
  "productTags": [
   "Traditional",
   "Busiate",
   "Couscous"
  ],
  "verdict": "The consistently top-ranked value table in Trapani — focused, warm, honest hospitality in a small old-town room",
  "person": "Daniel (owner)",
  "signature": "Busiate con gamberi e pistacchio — spiral pasta with Sicilian prawns and pistachio cream",
  "signal_chip": "Multi-year TripAdvisor #1 ranking for Trapani restaurants",
  "caveat": "No sea view, no cloister — a back-street room valued for the cooking and the welcome, not the setting",
  "why": "Daniel's small room on Via Biscottai consistently tops TripAdvisor for Trapani — not by volume but by the tight, disciplined menu and genuine warmth. The menu is concise: every dish chosen with care. To order: busiate con gamberi e pistacchio (spiral pasta with local prawns and pistachio cream, the Sicilian sweet-and-sea combination) or the daily fish in season. No sea view, no cloister — a back-street room valued for the cooking.",
  "address": "Via Biscottai 7, 91100 Trapani TP",
  "phone": "",
  "hours": "Lunch and dinner. Check current hours; closed varies by season.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Al+Vicoletto+Via+Biscottai+Trapani"
 },
 {
  "id": "v06-ai-lumi",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Traditional",
  "name": "Ai Lumi",
  "short": "Ai Lumi",
  "lat": 38.0171,
  "lng": 12.5138,
  "neighborhood": "Corso Vittorio Emanuele (main pedestrian street, steps from the Duomo di San Lorenzo)",
  "tags": [
   "EUR 25–40 pp",
   "Reservations accepted; walk-in for lunch",
   "Lunch and dinner"
  ],
  "productTags": [
   "Traditional",
   "Couscous",
   "Busiate"
  ],
  "verdict": "The 18th-century palazzo dining room that makes traditional Trapani cooking feel like archaeology — the ancient stables setting earns its reputation",
  "person": "The owner goes personally to the markets each morning; management not confirmed by name from a primary source",
  "signature": "Couscous alla trapanese — with home-made cassatelle in broth for dessert",
  "signal_chip": "3-star B&B; sustained top-10 Tripadvisor ranking",
  "caveat": "Also runs as a B&B above — the restaurant entrance is through the palazzo courtyard, not the main street",
  "why": "In the ancient stables of an 18th-century palazzo on the main pedestrian street, steps from the Duomo di San Lorenzo. The owner goes to market each morning for the fish and produce. To order: couscous alla trapanese (the house version) or busiate pasta; end with cassatelle — the Trapanese fried pastry parcels filled with ricotta and chocolate, made in-house. The courtyard entry is easy to miss; look for the palazzo gate.",
  "address": "Corso Vittorio Emanuele 71–75, 91100 Trapani TP",
  "phone": "+39 0923 872418",
  "hours": "Lunch and dinner daily.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ai+Lumi+Corso+Vittorio+Emanuele+Trapani"
 },
 {
  "id": "v07-antichi-sapori",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Traditional",
  "name": "Antichi Sapori",
  "short": "Antichi Sapori",
  "lat": 38.0168,
  "lng": 12.5103,
  "neighborhood": "Corso Vittorio Emanuele 191 (western end of the Corso near the port)",
  "tags": [
   "EUR 25–40 pp",
   "Walk-in; outdoor tables in summer",
   "Lunch and dinner"
  ],
  "productTags": [
   "Traditional",
   "Busiate",
   "Couscous"
  ],
  "verdict": "The family table on the western Corso for big portions and outdoor lunches — popular with locals and reliably traditional",
  "person": "Family-run; specific owner name not confirmed from a primary source",
  "signature": "Busiate al pesto trapanese with fresh tomato and almonds, followed by grilled orata",
  "signal_chip": "Sustained TripAdvisor top-20 ranking",
  "caveat": "Outdoor summer tables on the Corso can be loud — the interior is quieter",
  "why": "A family-run trattoria at the western end of Corso Vittorio Emanuele, with outdoor tables that gather families and locals at lunch. To order: busiate al pesto trapanese (almonds, fresh tomato, basil, garlic — no pine nuts), then grilled fresh orata or the day's fish from the Trapani boats. Outdoor summer seats are loud; the interior room is quieter and cooler.",
  "address": "Corso Vittorio Emanuele 191, 91100 Trapani TP",
  "phone": "",
  "hours": "Lunch and dinner.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Antichi+Sapori+Corso+Vittorio+Emanuele+Trapani"
 },
 {
  "id": "v08-pasticceria-colicchia",
  "cat": "shop",
  "tier": "plenty",
  "priority": 8,
  "badge": "Granita",
  "name": "Antica Pasticceria Colicchia",
  "short": "Colicchia",
  "lat": 38.0197,
  "lng": 12.5076,
  "neighborhood": "Via Torre di Ligny (the tip of the peninsula, near the sea walls and the Ligny Tower)",
  "tags": [
   "EUR 2–5 (granita, cannoli)",
   "Walk-in",
   "Breakfast from 07:00; light service until mid-afternoon"
  ],
  "productTags": [
   "Granita",
   "Pasticceria",
   "Traditional"
  ],
  "verdict": "The granita bar at the end of the peninsula that locals use as a morning ritual — the almond version is the one",
  "person": "Colicchia family; multi-generational pasticceria",
  "signature": "Granita di mandorla — coarse almond-milk ice, white and aromatic, eaten with a brioche col tuppo",
  "signal_chip": "Documented as the best granita bar in Trapani by multiple regional food press sources",
  "caveat": "Morning only for the full range; the granita runs out by mid-morning on summer weekends — arrive early",
  "why": "At the tip of the sickle, near the Torre di Ligny sea walls. The Colicchia family pasticceria is the granita bar of record in Trapani. To order: granita di mandorla — coarse almond-milk ice, white and aromatic — with a brioche col tuppo (the rounded Sicilian breakfast brioche). Arrive before 10:00 on summer weekends; the almond granita sells out. The cannoli are also made in-house. A seasonal institution; hours vary in winter.",
  "address": "Via Torre di Ligny (near the Torre), 91100 Trapani TP",
  "phone": "",
  "hours": "Breakfast from ~07:00; closes early afternoon. Variable seasonal hours.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Pasticceria+Colicchia+Via+Torre+di+Ligny+Trapani"
 },
 {
  "id": "v09-enoteca-versi-di-rosso",
  "cat": "shop",
  "tier": "plenty",
  "priority": 9,
  "badge": "Wine bar",
  "name": "Enoteca Versi di Rosso",
  "short": "Versi di Rosso",
  "lat": 38.0170,
  "lng": 12.5135,
  "neighborhood": "Corso Vittorio Emanuele (main pedestrian street, central)",
  "tags": [
   "EUR 4–10 (glass); EUR 15–25 (board)",
   "Walk-in for aperitivo; book for tasting evenings",
   "Evening from ~18:00"
  ],
  "productTags": [
   "Wine bar",
   "Wine",
   "Traditional"
  ],
  "verdict": "The natural-wine bar on the Corso where Grillo, Catarratto and Pantelleria Zibibbo are poured properly — the right place to understand the province's wine identity",
  "person": "Owner not confirmed by name from a primary source",
  "signature": "A glass of Pantelleria Zibibbo (passito or secco) with local almonds and olives at sunset on the Corso",
  "signal_chip": "Listed in regional press as the leading natural wine bar of central Trapani",
  "caveat": "Evening only; the natural wine focus means a short but curated list — not a mainstream enoteca",
  "why": "The wine-forward bar on Corso Vittorio Emanuele with an impressive array of natural wines by the glass. To order: a Grillo from the Marsala plain (bone-dry, saline, the white that fits the salt-pan landscape) or a Pantelleria Zibibbo — either the dry version (zingy and aromatic) or the passito for after dinner — paired with local almonds and Castelvetrano olives. The bar is the right place to understand how different western Sicily's wine identity is from the rest of the island.",
  "address": "Corso Vittorio Emanuele, 91100 Trapani TP (exact number not confirmed; central stretch)",
  "phone": "",
  "hours": "Evening from ~18:00. Closed varies.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Enoteca+Versi+di+Rosso+Corso+Vittorio+Emanuele+Trapani"
 },
 {
  "id": "v10-maria-grammatico-erice",
  "cat": "mainland",
  "tier": "plenty",
  "priority": 10,
  "badge": "Pasticceria",
  "name": "Pasticceria Maria Grammatico (Erice)",
  "short": "Maria Grammatico",
  "lat": 38.0378,
  "lng": 12.5875,
  "neighborhood": "Via Vittorio Emanuele, Erice — the main street of the medieval hilltop village, 15 km from Trapani",
  "tags": [
   "EUR 1.50–4 per pastry; EUR 6–10 (gift boxes)",
   "Walk-in; queue in high season",
   "Morning and afternoon"
  ],
  "productTags": [
   "Pasticceria",
   "Traditional"
  ],
  "verdict": "The only pastry shop in Sicily worth a 15 km detour for a genovese — and this was the shop that put Erice's convent sweets on the world map",
  "person": "Maria Grammatico — born 1940 in Erice, raised in the convent of San Carlo as an orphan, trained in the nuns' secret pastry kitchen for fourteen years",
  "signature": "Genovese ericina — oval shortcrust case filled with warm cream, the convent recipe unchanged since the 18th century",
  "signal_chip": "Subject of Mary Taylor Simeti's memoir 'Bitter Almonds' (1994); international press coverage; considered the standard reference for Sicilian convent pastry",
  "caveat": "Erice is a 15 km drive or cable-car ride from Trapani; the road is winding; allow 45 minutes round-trip. The shop can queue",
  "why": "Maria Grammatico was raised from age 11 in the convent of San Carlo in Erice as an orphan, spending fourteen years in the nuns' pastry kitchen before opening her shop. The American food writer Mary Taylor Simeti co-wrote her memoir 'Bitter Almonds' (1994), which brought the shop international recognition. To order: the genovese ericine — oval shortcrust pastry case filled with warm cream custard, the convent recipe unchanged; the cassatelle di ricotta (fried pastry filled with sweetened ricotta and chocolate); and the almond paste fruit (marzapane). The shop and Erice's medieval streets justify the detour on their own. Cable car from Trapani runs seasonally.",
  "address": "Via Vittorio Emanuele 14, 91016 Erice TP",
  "phone": "+39 0923 869390",
  "hours": "Morning and afternoon; seasonal variation — call ahead in winter.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Pasticceria+Maria+Grammatico+Erice"
 },
 {
  "id": "v11-museo-del-sale",
  "cat": "market",
  "tier": "plenty",
  "priority": 11,
  "badge": "Salt",
  "name": "Museo del Sale / Saline Culcasi",
  "short": "Museo del Sale",
  "lat": 37.9597,
  "lng": 12.4844,
  "neighborhood": "Via del Sale (the salt road), 9 km south of Trapani toward Marsala — inside the Riserva Naturale Saline di Trapani e Paceco",
  "tags": [
   "EUR 2.50 (museum admission)",
   "No reservation needed; open most days in season",
   "Morning to late afternoon"
  ],
  "productTags": [
   "Salt",
   "Traditional"
  ],
  "verdict": "The museum in a working windmill that explains why Trapani salt is still hand-harvested and sold in Michelin-starred kitchens — the one educational stop worth making",
  "person": "Saline Culcasi family, working the pans since the early 20th century; the windmill is the last operational one on the road to Marsala",
  "signature": "Flor di sale di Trapani IGP — the thin crust that forms on the surface of the pans in still summer air, hand-skimmed at dusk",
  "signal_chip": "Riserva Naturale Integrale Saline di Trapani e Paceco (regional nature reserve); IGP designation for Trapani salt",
  "caveat": "The salt pans are 9 km from the city — you need a car or bicycle; the area floods in spring; best visited June–September",
  "why": "The Saline Culcasi family has worked the salt pans in the Riserva Naturale di Trapani e Paceco for generations. The museum occupies a restored windmill — the last functioning one on the Via del Sale — and tells the story from Phoenician salt-harvesting through the Arab expansion of the pans to the modern IGP (Indicazione Geografica Protetta) designation. To buy: Flor di sale di Trapani IGP — the delicate surface crust hand-skimmed in summer mornings at dusk, sold in cloth bags at the museum shop. The pink flamingos that wade the pans from April onward are not a guarantee but are common in calm weather. A bicycle is the best vehicle for the 9 km ride south from the city.",
  "address": "Via del Sale (SP21), 91010 Paceco TP (9 km south of Trapani centre)",
  "phone": "+39 0923 867 888",
  "hours": "Variable (seasonal); typically 09:30–19:00 in summer. Confirm before driving.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Museo+del+Sale+Paceco+Trapani"
 },
 {
  "id": "v12-mercato-del-pesce",
  "cat": "market",
  "tier": "plenty",
  "priority": 12,
  "badge": "Fish market",
  "name": "Mercato del Pesce di Trapani",
  "short": "Mercato del Pesce",
  "lat": 38.0160,
  "lng": 12.5195,
  "neighborhood": "Fishing harbour (Porto), Via dei Gladioli — the working fish port east of the historic centre",
  "tags": [
   "Free to observe; fish from ~EUR 6/kg",
   "No reservation — walk in",
   "Morning only, from ~06:00; finishes by 10:00"
  ],
  "productTags": [
   "Fish market",
   "Traditional"
  ],
  "verdict": "The working fish auction where the chefs from every serious Trapani table arrive at 07:00 — the one morning ritual the guide books don't cover",
  "person": "The Trapani fishing fleet: trawlers working the Egadi Channel and the Tyrrhenian; the auction is conducted in the Sicilian dialect",
  "signature": "The live cicale di mare (mantis shrimp) sold direct from the crate, eaten raw with lemon on the dock",
  "signal_chip": "The principal fish supply market for the province; relocated to Via dei Gladioli from the historic 1874 Piazza Mercato del Pesce in the late 1990s",
  "caveat": "Arrive by 07:00 — most of the choice fish sells in the first hour; the market winds down by 09:30. Not walkable from the old town; take a taxi or bike",
  "why": "Trapani's working fish market moved from the historic 1874 pavilion on Piazza Mercato del Pesce to the active fishing port at Via dei Gladioli in the late 1990s. The morning auction is the supply chain for every serious Trapani kitchen. To order (or buy): the day's paranza (the mixed small fish of the day — anchovies, red mullet, small bream), cicale di mare (mantis shrimp), and whatever the Egadi Channel trawlers brought overnight. The auction is conducted fast and loud in the Sicilian dialect. Arrive by 07:00; by 09:30 only the ordinary remains.",
  "address": "Via dei Gladioli (fishing harbour, Porto di Trapani), 91100 Trapani TP",
  "phone": "",
  "hours": "Morning only: ~06:00–09:30, Monday–Saturday.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mercato+del+Pesce+Via+dei+Gladioli+Trapani"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-la-giudecca",
  "name": "La Giudecca",
  "center": [38.0173, 12.5121],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=La+Giudecca+Trapani"
 },
 {
  "id": "n-il-corso",
  "name": "Il Corso (Corso Vittorio Emanuele)",
  "center": [38.0170, 12.5140],
  "radius": 300,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Corso+Vittorio+Emanuele+Trapani"
 },
 {
  "id": "n-il-porto",
  "name": "Il Porto / Balata",
  "center": [38.0160, 12.5180],
  "radius": 250,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Porto+di+Trapani"
 },
 {
  "id": "n-piazza-mercato",
  "name": "Piazza ex Mercato del Pesce",
  "center": [38.0183, 12.5153],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Piazza+Mercato+del+Pesce+Trapani"
 },
 {
  "id": "n-villa-margherita",
  "name": "Villa Margherita / Punta Ligny",
  "center": [38.0197, 12.5076],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Villa+Margherita+Trapani"
 }
];
  const WALKS = [
 {
  "id": "w-via-del-sale",
  "name": "Via del Sale: Trapani to Marsala (salt pans cycle route)",
  "start": [38.0197, 12.5076],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Via+del+Sale+Trapani+salt+pans+windmill"
 },
 {
  "id": "w-riserva-zingaro",
  "name": "Riserva dello Zingaro coastal path (south entrance near Scopello)",
  "start": [38.0997, 12.7536],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Riserva+dello+Zingaro+south+entrance+Scopello"
 },
 {
  "id": "w-erice-ascent",
  "name": "Erice ascent: cable car from Trapani to the medieval summit",
  "start": [38.0170, 12.5170],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Funivia+Trapani+Erice+cable+car"
 },
 {
  "id": "w-mura-di-tramontana",
  "name": "Mura di Tramontana: Trapani's northern sea walls to Torre di Ligny",
  "start": [38.0183, 12.5153],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Mura+di+Tramontana+Trapani+Torre+di+Ligny"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-colicchia",
  "name": "Pasticceria Colicchia (morning granita, sea-wall tables)",
  "start": [38.0197, 12.5076]
 },
 {
  "id": "p-work-versi-di-rosso",
  "name": "Enoteca Versi di Rosso (aperitivo hour reading)",
  "start": [38.0170, 12.5135]
 },
 {
  "id": "p-work-villa-margherita",
  "name": "Villa Margherita gardens (the peninsula tip, sea on three sides)",
  "start": [38.0200, 12.5060]
 }
];
  const LANDMARKS = [
 {
  "id": "l-beach-san-vito-lo-capo",
  "name": "San Vito lo Capo",
  "coords": [38.1743, 12.7355],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=San+Vito+lo+Capo+beach+Trapani"
 },
 {
  "id": "l-beach-cala-tonnarella",
  "name": "Cala Tonnarella dell'Uzzo (Riserva Zingaro)",
  "coords": [38.0968, 12.7518],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cala+Tonnarella+Uzzo+Riserva+Zingaro"
 },
 {
  "id": "l-beach-bonagia",
  "name": "Spiaggia di Bonagia",
  "coords": [38.0802, 12.6213],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+di+Bonagia+Trapani"
 },
 {
  "id": "l-cult-torre-di-ligny",
  "name": "Torre di Ligny — the peninsula's western sentinel",
  "coords": [38.0196, 12.5068],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Torre+di+Ligny+Trapani"
 },
 {
  "id": "l-cult-santuario-annunziata",
  "name": "Santuario dell'Annunziata — the Trapani Madonna",
  "coords": [38.0168, 12.5344],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Santuario+Annunziata+Trapani"
 },
 {
  "id": "l-cult-palazzo-giudecca",
  "name": "Palazzo della Giudecca — diamond-faceted 16th-c. façade",
  "coords": [38.0173, 12.5121],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Palazzo+della+Giudecca+Trapani"
 },
 {
  "id": "l-cult-piazza-ex-mercato",
  "name": "Piazza ex Mercato del Pesce — the 1874 fish-market pavilion",
  "coords": [38.0183, 12.5153],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Piazza+Mercato+del+Pesce+Trapani"
 },
 {
  "id": "l-cult-mozia-island",
  "name": "Isola di Mozia (Mothya) — Phoenician island in the lagoon",
  "coords": [37.8706, 12.4648],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Isola+di+Mozia+Marsala+Trapani"
 },
 {
  "id": "l-cult-erice-castello-venere",
  "name": "Castello di Venere — Erice's Norman castle on the summit",
  "coords": [38.0389, 12.5869],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Castello+di+Venere+Erice"
 },
 {
  "id": "l-cult-saline-di-trapani",
  "name": "Saline di Trapani e Paceco — the salt-pan nature reserve",
  "coords": [37.9597, 12.4844],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Saline+di+Trapani+Paceco+riserva+naturale"
 },
 {
  "id": "l-linger-colicchia",
  "name": "Pasticceria Colicchia — granita and cannoli at the peninsula's tip",
  "coords": [38.0197, 12.5076],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Pasticceria+Colicchia+Via+Torre+di+Ligny+Trapani"
 },
 {
  "id": "l-linger-grammatico-erice",
  "name": "Pasticceria Maria Grammatico — the convent-trained pastry master",
  "coords": [38.0378, 12.5875],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Pasticceria+Maria+Grammatico+Erice"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
