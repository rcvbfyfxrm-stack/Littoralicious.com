/* Terroir — Trapani · Sicily — hand-built on the upgraded template */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#c4a35a", "market": "#d97706", "shop": "#059669", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar", "mainland": "Out of town", "logistics": "Logistics"};
  const PRODUCT_COLORS = {"Michelin": "#7f1d1d", "Couscous": "#a16207", "Gambero Rosso": "#b91c1c", "Seafood": "#3b82f6", "Pasta": "#92400e", "Pastry": "#78350f", "Wine": "#7c2d12", "Natural wine": "#6b21a8", "Bar": "#7c3aed", "Saltpan": "#0f766e", "Winery": "#4d7c0f"};
  const VENUES = [
 {
  "id": "v01-osteria-il-moro",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Michelin",
  "name": "Osteria il Moro",
  "short": "Osteria il Moro",
  "lat": 38.0174,
  "lng": 12.5298,
  "neighborhood": "Historic centre, Via Garibaldi (the main artery of the old peninsula city)",
  "tags": [
   "EUR 40-65 pp à la carte",
   "Essential, book ahead by phone or at the door — small room, fills quickly",
   "Dinner; closed Sunday"
  ],
  "productTags": [
   "Michelin",
   "Couscous",
   "Seafood"
  ],
  "why": "Opened by chef Nicola Bandi and his brother Enzo (wine) after Nicola trained under Nino Graziano at L'Approdo in Mazara del Vallo; MICHELIN Guide Italy 2023, the first Michelin listing for a restaurant inside Trapani proper. To order: Pasta con le sarde alla trapanese — pasta with sardines, pine nuts, wild fennel, toasted breadcrumbs — and the crudo of gambero rosso di Mazara. Enzo runs an honest, short wine list weighted toward Sicilian naturals; ask what arrived that week. Small room, one sitting; arrive early or call the same morning.",
  "address": "Via Garibaldi 86, 91100 Trapani TP",
  "phone": "+39 0923 23194",
  "hours": "Dinner, closed Sunday",
  "maps": "https://www.google.com/maps/search/?api=1&query=Osteria+il+Moro+Trapani"
 },
 {
  "id": "v02-cantina-siciliana",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "Couscous",
  "name": "Cantina Siciliana",
  "short": "Cantina Siciliana",
  "lat": 38.0175,
  "lng": 12.5282,
  "neighborhood": "Giudecca quarter (the old Jewish district, southeast of the corso)",
  "tags": [
   "EUR 25-45 pp",
   "Book ahead; popular with locals at lunch",
   "Lunch and dinner"
  ],
  "productTags": [
   "Couscous",
   "Pasta",
   "Seafood"
  ],
  "why": "In business since 1958, in a former wine cellar beneath a 16th-century palazzo in the Giudecca; chef Pino Maggiore holds a Euro-Toques membership and a Slow Food Chiocciola 2019. To order: Couscous di pesce — the flagship and the reason Trapani cooks couscous at all, Sicilian-Arab in its DNA — and busiate al pesto trapanese, hand-twisted pasta with raw almond, tomato, garlic and basil. One of the rare kitchens where the couscous is hand-rolled and steamed, not from a packet; the difference is real. Confirmed slow-cooked, long-marinated method from multiple independent food press sources.",
  "address": "Via Giudecca 36, 91100 Trapani TP",
  "phone": "+39 0923 28673",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Cantina+Siciliana+Trapani"
 },
 {
  "id": "v03-salamureci",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Gambero Rosso",
  "name": "Salamureci",
  "short": "Salamureci",
  "lat": 38.0175,
  "lng": 12.5308,
  "neighborhood": "Historic centre, Piazza Generale Scio (a quiet square one block from the market)",
  "tags": [
   "EUR 30-50 pp",
   "Walk-in most lunches; book for dinner and weekends",
   "Lunch and dinner"
  ],
  "productTags": [
   "Gambero Rosso",
   "Seafood",
   "Pasta"
  ],
  "why": "Trattoria run by chef Michele Bellezza; Gambero Rosso awarded it a Forchetta 2025 and scored it 79/100 in the 2026 Ristoranti d'Italia guide. The name — salamureci — refers to the salt brine fishermen used for tuna. To order: Busiate al pesto trapanese (the almond-tomato-basil sauce this city invented) and whatever is chalked on the board that morning from the Trapani fishing port. Smart, unfussy room; the 2025 Gambero Rosso citation confirms the kitchen is cooking at a level well above its price point.",
  "address": "Piazza Generale Scio 17, 91100 Trapani TP",
  "phone": "+39 0923 21728",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Salamureci+Trapani"
 },
 {
  "id": "v04-taverna-paradiso",
  "cat": "shop",
  "tier": "notime",
  "priority": 4,
  "badge": "Seafood",
  "name": "Taverna Paradiso",
  "short": "Taverna Paradiso",
  "lat": 38.014,
  "lng": 12.5265,
  "neighborhood": "Lungomare, along the western seafront (Dante Alighieri promenade)",
  "tags": [
   "EUR 35-55 pp",
   "Book ahead; popular with locals on the weekend",
   "Lunch and dinner"
  ],
  "productTags": [
   "Seafood",
   "Pasta",
   "Couscous"
  ],
  "why": "In the Favata family since 1996, run by brothers Massimo and Antonello; a long-established local favourite on the lungomare with a view toward the Egadi Islands. To order: The catch of the day baked or grilled, linguine allo scoglio, and the house version of couscous — simpler than Cantina Siciliana's, faster, still authentic. One of the few lungomare restaurants the port workers still eat at, which is the right filter. Confirmed via TripAdvisor local reviews cross-checked with press mentions.",
  "address": "Lungomare Dante Alighieri 22, 91100 Trapani TP",
  "phone": "+39 0923 22303",
  "hours": "Lunch and dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Taverna+Paradiso+Trapani"
 },
 {
  "id": "v05-maria-grammatico",
  "cat": "mainland",
  "tier": "notime",
  "priority": 5,
  "badge": "Pastry",
  "name": "Pasticceria Maria Grammatico",
  "short": "Maria Grammatico — Erice",
  "lat": 37.9694,
  "lng": 12.5872,
  "neighborhood": "Erice old town, Via Vittorio Emanuele (the main lane, ~14 km and 750m climb from Trapani)",
  "tags": [
   "EUR 4-12 (pastry, coffee)",
   "No booking needed; daily 07:30-22:00 approximately",
   "Morning for breakfast; afternoon for genovesi"
  ],
  "productTags": [
   "Pastry",
   "Couscous"
  ],
  "why": "Maria Grammatico spent her childhood in the Istituto San Carlo convent in Erice learning to make the almond pastries the nuns had been selling since the 1800s; after the convent closed she opened her own shop in 1963 and preserved the entire repertoire. Her book Bitter Almonds (written with Mary Taylor Simeti, 1994) is the written record of a vanishing confectionery tradition. To order: Genovesi (short-pastry shells filled with egg custard, best warm), marzipan fruits, and the frutta Martorana shaped with the precision of a jeweller. The convent recipes are gone from everywhere else — this shop is the last address where they exist. Takes the cable car from Trapani (15 min) or drive the switchback.",
  "address": "Via Vittorio Emanuele 14, 91016 Erice TP",
  "phone": "+39 0923 869390",
  "hours": "Daily approx 07:30-22:00",
  "maps": "https://www.google.com/maps/search/?api=1&query=Pasticceria+Maria+Grammatico+Erice"
 },
 {
  "id": "v06-ai-lumi",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Wine",
  "name": "Ai Lumi",
  "short": "Ai Lumi",
  "lat": 38.018,
  "lng": 12.5278,
  "neighborhood": "Corso Vittorio Emanuele, the main street of the historic centre",
  "tags": [
   "EUR 30-50 pp",
   "Reservations recommended",
   "Dinner"
  ],
  "productTags": [
   "Wine",
   "Seafood",
   "Pasta"
  ],
  "why": "Restaurant-enoteca in an 18th-century palazzo on the corso, managed by Alfredo Catanzaro; a reliable room for the full Sicilian-seafood menu alongside a considered wine list leaning toward island producers. To order: Pasta alla Norma, the couscous, or the catch of the day — this is a kitchen that does everything competently rather than a single thing brilliantly. The interior courtyard is the draw in warm weather. Confirmed Sicilian wine programme via proprietor interviews in trade press.",
  "address": "Corso Vittorio Emanuele 71, 91100 Trapani TP",
  "phone": "—",
  "hours": "Dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ai+Lumi+Trapani"
 },
 {
  "id": "v07-colicchia",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Pastry",
  "name": "Pasticceria Colicchia",
  "short": "Colicchia",
  "lat": 38.0178,
  "lng": 12.529,
  "neighborhood": "Via delle Arti, one block north of the corso, in the historic centre",
  "tags": [
   "EUR 2-6 (granita, pastry, coffee)",
   "No booking — join the queue at the counter",
   "Breakfast 07:00-11:00; afternoon granita"
  ],
  "productTags": [
   "Pastry",
   "Seafood"
  ],
  "why": "Founded 1885; the city's most cited address for granita di gelso (mulberry granita), cannoli, and the almond-milk granita the Trapanese drink instead of coffee in July and August. To order: Granita di mandorla with a brioche col tuppo, or the almond milk straight — this is the drink that makes you understand why coffee is optional in a Sicilian summer. The family has not changed the recipe or the marble bar since the 1950s.",
  "address": "Via delle Arti 6, 91100 Trapani TP",
  "phone": "—",
  "hours": "Daily 07:00-20:00 approximately",
  "maps": "https://www.google.com/maps/search/?api=1&query=Pasticceria+Colicchia+Trapani"
 },
 {
  "id": "v08-versi-di-rosso",
  "cat": "shop",
  "tier": "several",
  "priority": 8,
  "badge": "Natural wine",
  "name": "Enoteca Versi di Rosso",
  "short": "Versi di Rosso",
  "lat": 38.018,
  "lng": 12.527,
  "neighborhood": "Corso Vittorio Emanuele, central historic quarter",
  "tags": [
   "EUR 5-15 (glass + plate)",
   "Wed-Mon, 18:30-midnight; closed Tuesday",
   "Evening wine bar"
  ],
  "productTags": [
   "Natural wine",
   "Wine"
  ],
  "why": "400-bottle natural and biodynamic wine list weighted toward Sicilian producers — Arianna Occhipinti, COS, Cornelissen — with small plates (cheese, salumi, bread, anchovies) to keep you going. To order: Whatever the sommelier opened that evening, with a board of pecorino and Trapani anchovies. Confirmed as the city's serious wine address by multiple local food writers; the list is curated rather than accumulated. Cards accepted.",
  "address": "Corso Vittorio Emanuele 63, 91100 Trapani TP",
  "phone": "+39 0923 27985",
  "hours": "Wed-Mon 18:30-midnight, closed Tuesday",
  "maps": "https://www.google.com/maps/search/?api=1&query=Versi+di+Rosso+Enoteca+Trapani"
 },
 {
  "id": "v09-nettuno-lounge",
  "cat": "shop",
  "tier": "several",
  "priority": 9,
  "badge": "Bar",
  "name": "Nettuno Lounge Bar",
  "short": "Nettuno Lounge",
  "lat": 38.0183,
  "lng": 12.5255,
  "neighborhood": "Piazza Scalo d'Alaggio, beside the old fishing port at the tip of the peninsula",
  "tags": [
   "EUR 6-15 (drink + tramezzini)",
   "Walk-in",
   "Sunset and aperitivo"
  ],
  "productTags": [
   "Bar",
   "Seafood"
  ],
  "why": "Positioned on the western edge of the Trapani peninsula with an unobstructed view over the fishing port and the Egadi Islands; the correct spot for aperitivo when the sun drops toward Favignana. To order: A glass of local Grillo or Zibibbo with tramezzini al tonno — a tuna bruschetta with Trapani's prized bluefin. The fishing port below is where the Mattanza (the traditional bluefin hunt) was organised; the view makes the history tangible. Walk-in only; no booking needed.",
  "address": "Piazza Scalo d'Alaggio, 91100 Trapani TP",
  "phone": "—",
  "hours": "Aperitivo from ~17:00, evening",
  "maps": "https://www.google.com/maps/search/?api=1&query=Nettuno+Lounge+Bar+Trapani"
 },
 {
  "id": "v10-garibaldi-58",
  "cat": "shop",
  "tier": "plenty",
  "priority": 10,
  "badge": "Wine",
  "name": "Garibaldi 58 Wine Bar",
  "short": "Garibaldi 58",
  "lat": 38.0174,
  "lng": 12.529,
  "neighborhood": "Via Garibaldi, historic centre",
  "tags": [
   "EUR 5-12 (glass + plate)",
   "Walk-in; evening",
   "After-dinner wine"
  ],
  "productTags": [
   "Wine",
   "Natural wine"
  ],
  "why": "A narrow wine bar on the main corso with a list concentrated on Catarratto — the indigenous white grape of western Sicily that makes Trapani's finest dry whites — and a small plate of cheese and salumi to anchor you. To order: A Catarratto lucido from one of the Belice valley producers; ask the host what is open. The bar is the easiest introduction to Trapanese wine culture if Versi di Rosso is full.",
  "address": "Via Garibaldi 58, 91100 Trapani TP",
  "phone": "—",
  "hours": "Evening, from ~19:00",
  "maps": "https://www.google.com/maps/search/?api=1&query=Garibaldi+58+Wine+Bar+Trapani"
 },
 {
  "id": "v11-baglio-soria-firriato",
  "cat": "mainland",
  "tier": "plenty",
  "priority": 11,
  "badge": "Winery",
  "name": "Baglio Sorìa — Firriato",
  "short": "Baglio Sorìa (Firriato)",
  "lat": 37.9787,
  "lng": 12.6030,
  "neighborhood": "Contrada Soria, Paceco (~18 km east of Trapani, toward Marsala direction)",
  "tags": [
   "Tasting from EUR 20 pp",
   "Book at least one week ahead via firriato.it",
   "Cellar visit + tasting, day trip"
  ],
  "productTags": [
   "Winery",
   "Wine"
  ],
  "why": "Firriato is the largest estate of western Sicily by volume, yet the Baglio Sorìa property — a restored 18th-century baglio (fortified farmhouse) — runs serious estate tastings of Nero d'Avola, Nerello Mascalese, and Catarratto alongside their Etna wines. To order: The Ribeca (Perricone mono-varietal) and the Camelot (Nero d'Avola-Merlot) are the bottles that set Firriato apart from commodity Sicilian production. Confirm opening hours and book a minimum one week in advance through the Firriato website; the estate is signposted from the Trapani-Marsala SS115.",
  "address": "Contrada Soria, 91027 Paceco TP",
  "phone": "—",
  "hours": "By appointment, book at least one week ahead",
  "maps": "https://www.google.com/maps/search/?api=1&query=Baglio+Soria+Firriato+Paceco+Trapani"
 },
 {
  "id": "v12-saline-ettore-infersa",
  "cat": "mainland",
  "tier": "plenty",
  "priority": 12,
  "badge": "Saltpan",
  "name": "Saline Ettore e Infersa",
  "short": "Saline Ettore e Infersa",
  "lat": 37.9847,
  "lng": 12.4783,
  "neighborhood": "Nubia hamlet, south of Trapani on the SS187 toward Marsala (~10 km south)",
  "tags": [
   "EUR 5-8 entry, tasting EUR 20",
   "Open daily in summer; call ahead in winter",
   "Afternoon — the light on the salt at sunset is the point"
  ],
  "productTags": [
   "Saltpan",
   "Seafood"
  ],
  "why": "A 16th-century windmill, now a working salt museum, surrounded by the Saline di Trapani e Paceco nature reserve — 1,000 ha of shallow lagoons that have been evaporating salt since Phoenician times; the pink flamingos arrive in August. To order: The sale marino integrale di Trapani (unrefined sea salt with a mild mineral finish) from the mill shop, and a bottle of the saline-cured anchovies to take home. The salt pans are a Slow Food Presidium; the salt itself is the ingredient that defines pesto trapanese and the local anchovy cure. The afternoon light turns the water pink, then orange — go at 16:00-17:00 for the photography, stay through sunset.",
  "address": "Contrada Nubia, SP21, 91023 Paceco TP",
  "phone": "—",
  "hours": "Daily in summer, approx 09:30-18:30; confirm in winter",
  "maps": "https://www.google.com/maps/search/?api=1&query=Saline+Ettore+e+Infersa+Nubia+Trapani"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-centro-storico",
  "name": "Centro storico (the peninsula)",
  "center": [38.018, 12.528],
  "radius": 350,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Centro+storico+Trapani"
 },
 {
  "id": "n-giudecca",
  "name": "Giudecca — Quartiere Ebraico",
  "center": [38.017, 12.527],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Via+Giudecca+Trapani"
 },
 {
  "id": "n-porto-pescheria",
  "name": "Porto di Trapani / Pescheria",
  "center": [38.019, 12.524],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Porto+di+Trapani"
 },
 {
  "id": "n-lungomare",
  "name": "Lungomare — Via Dante Alighieri",
  "center": [38.014, 12.527],
  "radius": 200,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Lungomare+Dante+Alighieri+Trapani"
 },
 {
  "id": "n-corso-vittorio-emanuele",
  "name": "Corso Vittorio Emanuele",
  "center": [38.018, 12.528],
  "radius": 150,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Corso+Vittorio+Emanuele+Trapani"
 },
 {
  "id": "n-erice",
  "name": "Erice (hilltop town, 14 km)",
  "center": [37.969, 12.587],
  "radius": 300,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Erice+Trapani"
 }
];
  const WALKS = [
 {
  "id": "w-punta-san-teodoro-lighthouse",
  "name": "Punta San Teodoro to Torre di Ligny — the tip of the peninsula",
  "start": [38.0197, 12.5215],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Torre+di+Ligny+Trapani"
 },
 {
  "id": "w-via-garibaldi-mercato",
  "name": "Via Garibaldi market walk — from Porta Ossuna to the fish stalls",
  "start": [38.0165, 12.5339],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Mercato+del+Pesce+Trapani"
 },
 {
  "id": "w-misteri-route",
  "name": "The Misteri route — follow the twenty wooden sculptures through the Easter city",
  "start": [38.0183, 12.531],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Chiesa+del+Purgatorio+Trapani"
 },
 {
  "id": "w-erice-walls",
  "name": "Erice: Norman walls and the Castello di Venere — the perimeter walk",
  "start": [37.9694, 12.5869],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Castello+di+Venere+Erice"
 },
 {
  "id": "w-saline-levante-path",
  "name": "Saline di Trapani nature reserve — the windmill footpath at dusk",
  "start": [37.9847, 12.4783],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Riserva+Naturale+Saline+di+Trapani+e+Paceco"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-ai-lumi",
  "name": "Ai Lumi courtyard",
  "start": [38.018, 12.5278]
 },
 {
  "id": "p-work-colicchia",
  "name": "Pasticceria Colicchia — marble counter",
  "start": [38.0178, 12.529]
 },
 {
  "id": "p-work-versi-di-rosso",
  "name": "Versi di Rosso — quiet afternoon before opening",
  "start": [38.018, 12.527]
 }
];
  const LANDMARKS = [
 {
  "id": "l-cala-spiaggia-lido-la-pineta",
  "name": "Lido La Pineta — town beach north of the peninsula",
  "coords": [38.0247, 12.5379],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Lido+La+Pineta+Trapani"
 },
 {
  "id": "l-cala-spiaggia-san-giuliano",
  "name": "Spiaggia San Giuliano — the nearest sand south of the city",
  "coords": [38.0021, 12.5235],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+San+Giuliano+Trapani"
 },
 {
  "id": "l-cult-torre-di-ligny",
  "name": "Torre di Ligny — 1671 Bourbon lookout at the westernmost tip",
  "coords": [38.0198, 12.5211],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Torre+di+Ligny+Trapani"
 },
 {
  "id": "l-cult-chiesa-del-purgatorio",
  "name": "Chiesa del Purgatorio — home of the twenty Misteri processional sculptures",
  "coords": [38.0183, 12.531],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Chiesa+del+Purgatorio+Trapani"
 },
 {
  "id": "l-cult-cattedrale-san-lorenzo",
  "name": "Cattedrale di San Lorenzo — 17th-century baroque, with the Flemish Crucifixion",
  "coords": [38.0185, 12.5295],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cattedrale+San+Lorenzo+Trapani"
 },
 {
  "id": "l-cult-museo-ligny",
  "name": "Museo della Preistoria — flint tools and Egadi Islands naval bronze rams",
  "coords": [38.0198, 12.5211],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Museo+Ligny+Trapani"
 },
 {
  "id": "l-cult-saline-di-trapani",
  "name": "Riserva Naturale Saline di Trapani e Paceco — flamingo lagoons, Slow Food salt",
  "coords": [37.9847, 12.4783],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Saline+di+Trapani+e+Paceco"
 },
 {
  "id": "l-cult-erice-castello-venere",
  "name": "Castello di Venere — Norman walls crowning the 750m peak of Erice",
  "coords": [37.9703, 12.5893],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Castello+di+Venere+Erice"
 },
 {
  "id": "l-cult-egadi-islands",
  "name": "Egadi Islands (Favignana, Levanzo, Marettimo) — the ferry leaves from the port",
  "coords": [37.9235, 12.3258],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Isole+Egadi+Favignana"
 },
 {
  "id": "l-cult-porta-ossuna",
  "name": "Porta Ossuna — 16th-century gate, entry to the old Arab quarter",
  "coords": [38.0165, 12.533],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Porta+Ossuna+Trapani"
 },
 {
  "id": "l-cult-piazza-mercato-del-pesce",
  "name": "Piazza Mercato del Pesce — the old fish auction floor (now a cultural space)",
  "coords": [38.0195, 12.527],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Mercato+del+Pesce+Trapani"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
