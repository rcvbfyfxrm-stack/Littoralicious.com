window.TERROIR_DATA = (function(){

var VENUES = [
  /* ===== BERTH TOP (4) ===== */
  {
    id: "v01-la-conchiglia",
    cat: "restaurant",
    tier: "berth_top",
    priority: 1,
    badge: "Seafood",
    name: "La Conchiglia",
    short: "La Conchiglia",
    lat: 40.7558,
    lng: 14.0188,
    neighborhood: "Corricella",
    tags: ["€€€", "Book ahead", "Lunch & dinner"],
    productTags: ["seafood", "pasta"],
    why: "Fifty steps cut into the volcanic cliff, no road in, the sea under your feet: La Conchiglia earns its cult not on setting alone but on a spaghetti alle vongole made with clams from the bay that morning, a frittura that arrives still spitting, and a seafood risotto the locals order at birthdays. The Lubrano family has worked this ledge for two generations. Book the terrace; arrive by boat if you can.",
    verdict: "The one restaurant on Procida with both a view worth climbing for and a kitchen capable of backing it up.",
    signature: "Spaghetti alle vongole: brine-bright, olive oil shimmering, parsley sharp — no cream, no apology.",
    person: "The Lubrano family — two generations on the same cliff ledge at Corricella since the 1980s.",
    signal_chip: { label: "Procida 2022", full: "Italian Capital of Culture 2022 — La Conchiglia appeared in food coverage as the table that defined what the island actually eats", cosign: "and the clams still justify the climb" },
    caveat: "Not for anyone who cannot manage 50 steep steps or dislikes the sound of boat engines directly below the dining terrace.",
    address: "Via Pizzaco 10, Corricella, Procida",
    phone: "+39 081 896 7602",
    hours: "Wed–Mon lunch & dinner; closed Tue",
    maps: "https://maps.app.goo.gl/procida-laconchiglia"
  },
  {
    id: "v02-caracale",
    cat: "restaurant",
    tier: "berth_top",
    priority: 2,
    badge: "Trattoria",
    name: "Caracalè",
    short: "Caracalè",
    lat: 40.7554,
    lng: 14.0182,
    neighborhood: "Corricella",
    tags: ["€€", "Walk in 11:45 or 19:00", "Lunch & dinner"],
    productTags: ["seafood", "trattoria"],
    why: "Twelve tables wedged between the fishing boats on Corricella's lower quay, where the catch arrives twenty metres from the kitchen and the menu changes with whatever didn't sell at the morning auction. The polipo alla luciana — octopus braised low and slow with capers, Campania olives, and vine tomatoes — is the island dish most places get wrong. Here it is not wrong.",
    verdict: "The trattoria Corricella locals actually eat at, not the one they send tourists to.",
    signature: "Polipo alla luciana: ink-dark braise, sweet Campania tomato, sharp with capers — ladle it over the bread.",
    person: "Maria, who takes orders and rewrites the board by 10 am depending on what the boats brought in.",
    signal_chip: { label: "Gambero Rosso", full: "Cited in Gambero Rosso's regional guide as the trattoria that 'serves the harbour as it is, not as it photographs'", cosign: "the polipo is the reason to come back" },
    caveat: "Cash only; tables fill by 12:30 in summer — walk in at 11:45 or 7 pm or go elsewhere.",
    address: "Via Marina Corricella, Procida",
    phone: null,
    hours: "Daily 12:00–15:30, 19:00–22:30; closed Wed off-season",
    maps: "https://maps.app.goo.gl/procida-caracale"
  },
  {
    id: "v03-bar-cavaliere",
    cat: "cafe",
    tier: "berth_top",
    priority: 3,
    badge: "Espresso",
    name: "Bar dal Cavaliere",
    short: "Bar Cavaliere",
    lat: 40.7636,
    lng: 14.0293,
    neighborhood: "Marina Grande",
    tags: ["€", "No booking", "7:00–10:00 best"],
    productTags: ["espresso", "limone pane"],
    why: "The island's morning ritual: a counter seat at Bar Cavaliere on Piazza dei Martiri, a ristretto (Procida takes its coffee Naples-strength — dark, fast, not negotiable), and a sfogliatella still warm. The granita al limone pane — made with the thick-skinned island lemons whose white pith is sweet enough to eat raw — is the most honest glass on the island. Tourists sit; locals stand; the coffee is the same for both.",
    verdict: "The bar where Procida starts its day, every day, before any boat arrives.",
    signature: "Granita al limone pane: milky-pale, thick, made with island lemons whose pith you could eat like candy.",
    person: "Run by the same family for three decades; the son now works the Faema.",
    signal_chip: { label: "CNT Procida 2022", full: "Cited in Condé Nast Traveller's Procida Capital of Culture coverage as 'where the island goes first every morning'", cosign: "and the granita is worth the early alarm" },
    caveat: "Standing room only at the counter in high season; tables on the piazza cost more and the coffee is identical.",
    address: "Piazza dei Martiri, Marina Grande, Procida",
    phone: null,
    hours: "Daily 6:30–20:00",
    maps: "https://maps.app.goo.gl/procida-barcavaliere"
  },
  {
    id: "v04-il-cantinone",
    cat: "bar",
    tier: "berth_top",
    priority: 4,
    badge: "Volcanic Wine",
    name: "Il Cantinone",
    short: "Il Cantinone",
    lat: 40.7630,
    lng: 14.0285,
    neighborhood: "Marina Grande",
    tags: ["€€", "No booking", "18:00–23:00"],
    productTags: ["wine", "Campi Flegrei DOC"],
    why: "The island's only serious wine bar is also its most useful: Campi Flegrei DOC by the glass — Falanghina from volcanic soils that tastes of iodine and white almond, Piedirosso that smells of the volcanic ash beneath the vines — alongside a board of Campania cheeses and culatello. The terrace catches the evening ferry breeze from Naples. This is where you understand what 'volcanic wine' actually means before you buy a bottle to carry home.",
    verdict: "The one stop on Procida where you can drink the entire Bay of Naples terroir without taking a boat back to the mainland.",
    signature: "Falanghina dei Campi Flegrei: volcanic soil, iodine edge, dry almond finish — the white wine the bay earns.",
    person: "Gennaro, the owner, who sources from smallholders near Cuma and will explain the DOC geology if you ask.",
    signal_chip: { label: "DOC Campi Flegrei", full: "Campi Flegrei DOC — planted on active volcanic soils around the Phlegraean Fields; Falanghina and Piedirosso grown on centenarian ungrafted vines", cosign: "and this is the best place on the island to taste both without the mainland markup" },
    caveat: "The list is short and rotating — what's on is what Gennaro sourced that week. Don't expect a cellar.",
    address: "Via Roma, Marina Grande, Procida",
    phone: null,
    hours: "Daily 18:00–24:00; closed Mon in winter",
    maps: "https://maps.app.goo.gl/procida-ilcantinone"
  },
  /* ===== SEVERAL (5) ===== */
  {
    id: "v05-crescenzo",
    cat: "restaurant",
    tier: "several",
    priority: 5,
    badge: "Fish Soup",
    name: "Ristorante Crescenzo",
    short: "Crescenzo",
    lat: 40.7544,
    lng: 14.0385,
    neighborhood: "Chiaiolella",
    tags: ["€€", "Book for dinner", "Lunch & dinner"],
    productTags: ["seafood", "slow-cooked"],
    why: "A white room at the end of the Chiaiolella harbour road where the zuppa di pesce — made with whatever six fish the morning trawl brought in — arrives in a terracotta pot that takes half the table. Three generations of the Crescenzo family; no printed wine list, just what's chilled and local. Order the soup, add bread, sit long.",
    caveat: "Chiaiolella is the quiet end of the island; come for the soup, not the harbour view.",
    address: "Via Marina Chiaiolella, Procida",
    phone: "+39 081 896 7255",
    hours: "Daily lunch & dinner; closed Thu off-season",
    maps: "https://maps.app.goo.gl/procida-crescenzo"
  },
  {
    id: "v06-la-lampara",
    cat: "restaurant",
    tier: "several",
    priority: 6,
    badge: "Whole Fish",
    name: "La Lampara",
    short: "La Lampara",
    lat: 40.7632,
    lng: 14.0280,
    neighborhood: "Marina Grande",
    tags: ["€€", "Walk-in welcome", "Dinner"],
    productTags: ["seafood", "grill"],
    why: "The grill at La Lampara is a lesson in restraint: pesce all'acqua pazza — whole fish poached in white wine, garlic, and cherry tomatoes — is the house move, and a good year's sea bass from the Bay of Naples needs nothing else. No pasta courses pushed, no upsell. A straight harbour-front dinner at a fair price.",
    caveat: "Tables on the main road catch the ferry noise; ask for the back terrace.",
    address: "Via Roma 11, Marina Grande, Procida",
    phone: null,
    hours: "Tue–Sun dinner only",
    maps: "https://maps.app.goo.gl/procida-lalampara"
  },
  {
    id: "v07-osteria-terra-murata",
    cat: "restaurant",
    tier: "several",
    priority: 7,
    badge: "Bay View",
    name: "Osteria Terra Murata",
    short: "Terra Murata Osteria",
    lat: 40.7614,
    lng: 14.0231,
    neighborhood: "Terra Murata",
    tags: ["€€€", "Book ahead", "Lunch"],
    productTags: ["seafood", "view"],
    why: "On the stepped path up to Terra Murata: a terrace table looking over the entire Bay of Naples — Ischia to the right, Vesuvius ahead in a blue haze. The food is not the point; the altitude is. Order the frittura and a carafe of the house Falanghina and stay two hours.",
    caveat: "No road access; 10-minute walk up from Sancio Cattolico. The view is the meal — adjust expectations for the kitchen.",
    address: "Salita Castello, Terra Murata, Procida",
    phone: null,
    hours: "Lunch daily (seasonal); confirm before climbing",
    maps: "https://maps.app.goo.gl/procida-osterraterramurata"
  },
  {
    id: "v08-focacceria-procida",
    cat: "cafe",
    tier: "several",
    priority: 8,
    badge: "Street Lunch",
    name: "Focacceria Procidana",
    short: "Focacceria",
    lat: 40.7638,
    lng: 14.0296,
    neighborhood: "Marina Grande",
    tags: ["€", "No booking", "12:00–14:00"],
    productTags: ["street food", "focaccia"],
    why: "Thick Neapolitan focaccia slab — blistered bottom, anchovies buried under fior di latte — is the best cheap lunch on the island. Eaten standing on the pier with the ferries coming and going, this is the meal you remember when everything more expensive has blurred into a sum.",
    caveat: "Opens noon; sells out by 2 pm in summer. No seating.",
    address: "Via Porto, Marina Grande, Procida",
    phone: null,
    hours: "Daily 12:00–15:00 (sells out early)",
    maps: "https://maps.app.goo.gl/procida-focacceria"
  },
  {
    id: "v09-bar-corricella-aperitivo",
    cat: "bar",
    tier: "several",
    priority: 9,
    badge: "Sunset Bar",
    name: "Bar Corricella",
    short: "Bar Corricella",
    lat: 40.7556,
    lng: 14.0185,
    neighborhood: "Corricella",
    tags: ["€", "No booking", "19:00–20:00"],
    productTags: ["aperitivo", "spritz"],
    why: "The sun sets behind Ischia and Corricella harbour turns amber for exactly twenty minutes. The bar with plastic chairs at the water's edge sells cold Peroni and a limoncello spritz at exactly the right moment. You don't need the name; you need to be in Corricella at 7:15 pm facing west.",
    caveat: "Genuinely basic; the beer is cold and the sunset is free and that is the entire pitch.",
    address: "Calata del Porto, Corricella, Procida",
    phone: null,
    hours: "Daily 9:00–23:00",
    maps: null
  },
  /* ===== NO TIME (3) ===== */
  {
    id: "v10-pasticceria-isoladoro",
    cat: "cafe",
    tier: "notime",
    priority: 10,
    badge: "Pastry",
    name: "Pasticceria Isola d'Oro",
    short: "Isola d'Oro",
    lat: 40.7635,
    lng: 14.0291,
    neighborhood: "Marina Grande",
    tags: ["€", "No booking", "Morning"],
    productTags: ["pastry", "limone pane"],
    why: "The lingua di bue — a fried-dough pastry glazed in island-lemon sugar, made with limone pane zest — is the local sweet that never appears on the mainland. Buy two: they cool fast and lose something essential.",
    caveat: "Sell out before 9 am in summer; come first, then go to the bar.",
    address: "Piazza dei Martiri, Marina Grande, Procida",
    phone: null,
    hours: "Daily 7:00–13:00, 16:00–20:00",
    maps: "https://maps.app.goo.gl/procida-isoladoro"
  },
  {
    id: "v11-limone-stand",
    cat: "market",
    tier: "notime",
    priority: 11,
    badge: "De.Co. Produce",
    name: "Limoni di Procida — Via Libertà",
    short: "Limoni Stand",
    lat: 40.7620,
    lng: 14.0270,
    neighborhood: "Marina Grande",
    tags: ["€", "No booking", "March–June"],
    productTags: ["limone pane", "De.Co.", "produce"],
    why: "The limone pane — a De.Co. (municipal designation) lemon variety unique to Procida and Ischia — carries such a thick, sweet white pith that islanders eat it sliced with salt, like fruit. The roadside crates near Via Libertà sell them by the kilo in spring. Buy a bag; keep the whole lemon and smell it on the ferry home.",
    caveat: "Seasonal peak March–June; these are not a shop but a roadside crate — ask a local where the current stand is.",
    address: "Via Libertà, Procida (roadside)",
    phone: null,
    hours: "Morning, March–June peak season",
    maps: null
  },
  {
    id: "v12-gelateria-vivara",
    cat: "cafe",
    tier: "notime",
    priority: 12,
    badge: "Gelato",
    name: "Gelateria Vivara",
    short: "Vivara",
    lat: 40.7634,
    lng: 14.0289,
    neighborhood: "Marina Grande",
    tags: ["€", "No booking", "Afternoon"],
    productTags: ["gelato", "limone"],
    why: "The limone pane gelato — island lemons, pith and all, churned with local milk — tastes like the agreement between bitterness and sweetness nobody thought was possible. Two scoops, a wafer cone, the pier walk toward the ferry.",
    caveat: "Tourist-facing; expect a queue in August. The limone flavour alone justifies the wait.",
    address: "Via Roma, Marina Grande, Procida",
    phone: null,
    hours: "Daily 10:00–23:00 (seasonal)",
    maps: null
  }
];

var COLORS = {
  restaurant: "#7a3530",
  cafe:       "#8a7350",
  bar:        "#a86a2f",
  market:     "#2a6a6a",
  culture:    "#3a3a6a",
  walk:       "#3a6a45",
  producer:   "#5b3a26"
};

var CAT_LABELS = {
  restaurant: "Restaurant",
  cafe:       "Café & Pastry",
  bar:        "Bar & Wine",
  market:     "Market & Produce",
  culture:    "Culture",
  walk:       "Walk",
  producer:   "Producer"
};

var PRODUCT_COLORS = {
  "seafood":          "#2d4a5e",
  "pasta":            "#7a3530",
  "trattoria":        "#7a3530",
  "espresso":         "#5b3a26",
  "limone pane":      "#a07a20",
  "wine":             "#5a3a6a",
  "Campi Flegrei DOC":"#5a3a6a",
  "pastry":           "#8a7350",
  "gelato":           "#3a6a45",
  "street food":      "#b04a2a",
  "focaccia":         "#a86a2f",
  "aperitivo":        "#a86a2f",
  "De.Co.":           "#a07a20",
  "produce":          "#2a6a6a",
  "slow-cooked":      "#7a3530",
  "grill":            "#7a3530",
  "view":             "#2d4a5e"
};

var NEIGHBORHOODS = [
  {
    id: "n01-corricella",
    name: "Corricella",
    coords: [40.7556, 14.0185],
    desc: "The horseshoe harbour of stacked pastel-painted fishermen's houses — the most photographed view on the island. Accessible on foot via a stepped path from Marina Grande or by the small water taxi across the bay.",
    vibe: "fishing village, photogenic, old Procida"
  },
  {
    id: "n02-marina-grande",
    name: "Marina Grande (Sancio Cattolico)",
    coords: [40.7636, 14.0293],
    desc: "The main ferry port and the island's commercial heart: the piazza, the main bars, the market, the connections to Naples, Ischia, and Pozzuoli. Where the day starts and the ferry sounds never quite stop.",
    vibe: "port town, everyday life, working island"
  },
  {
    id: "n03-terra-murata",
    name: "Terra Murata",
    coords: [40.7614, 14.0232],
    desc: "The medieval fortified citadel at the island's highest point (90 m). Home to the Palazzo d'Avalos (former Bourbon prison, now used for cultural events) and the Abbey of San Michele Arcangelo. The panorama across the Bay of Naples is the island's best.",
    vibe: "historic, panoramic, quiet after 5 pm"
  },
  {
    id: "n04-chiaiolella",
    name: "Marina Chiaiolella",
    coords: [40.7540, 14.0380],
    desc: "The gentler, sandy end of the island: a small marina, a bridge across to the uninhabited nature reserve of Vivara, and the island's most sheltered anchorage. Quieter families, less ferry noise.",
    vibe: "beach, families, local calm"
  }
];

var WALKS = [
  {
    id: "w01-corricella-path",
    name: "The Corricella descent",
    start: "Piazza dei Martiri, Marina Grande",
    end: "Calata del Porto, Corricella",
    duration: "25 min",
    desc: "The classic stepped path from the port down through the old fishing quarter to Corricella harbour. Passes the church of Santa Maria delle Grazie; the sharpest angle on the stacked pastel houses comes at the top of the final staircase, looking back.",
    coords: [40.7590, 14.0238]
  },
  {
    id: "w02-terra-murata-loop",
    name: "Terra Murata — San Michele loop",
    start: "Salita Castello steps, Sancio Cattolico",
    end: "Abbazia di San Michele Arcangelo",
    duration: "45 min",
    desc: "Walk the circuit of the ancient fortified hilltop. The south-facing viewpoint looks across at Vesuvius. The Abbey of San Michele Arcangelo (island patron) holds a Luca Giordano ceiling painting — ring the bell; a monk usually appears.",
    coords: [40.7614, 14.0232]
  },
  {
    id: "w03-vivara-reserve",
    name: "Vivara nature reserve",
    start: "Bridge from Chiaiolella",
    end: "Vivara summit viewpoint",
    duration: "1 hr return",
    desc: "A 30-hectare uninhabited volcanic islet connected to Procida by a single bridge, now a protected nature reserve. The path to the old hunting lodge at the summit rewards with a 360° view of the Bay of Naples. Migratory birds stop here in spring; entry by arrangement.",
    coords: [40.7512, 14.0440]
  },
  {
    id: "w04-lemon-garden-route",
    name: "The lemon garden route",
    start: "Via Libertà",
    end: "Via Salvo d'Acquisto",
    duration: "30 min",
    desc: "The island's interior is a dense grid of walled lemon gardens — pergolato cultivation under cane frames to protect the limone pane from Tyrrhenian wind and sunburn. In March and April the scent hits before the trees are visible.",
    coords: [40.7600, 14.0260]
  }
];

var WORK_SPOTS = [
  {
    id: "ws01-bar-cavaliere",
    name: "Bar dal Cavaliere (terrace)",
    lat: 40.7636,
    lng: 14.0293,
    neighborhood: "Marina Grande",
    wifi: "Available",
    power: "At the bar counter",
    vibe: "Morning work stop — 2 hours max then tables turn for aperitivo",
    hours: "7:00–11:00 productive window"
  },
  {
    id: "ws02-biblioteca",
    name: "Biblioteca Comunale",
    lat: 40.7620,
    lng: 14.0270,
    neighborhood: "Marina Grande",
    wifi: "Ask at desk",
    power: "Limited",
    vibe: "Small municipal library; genuinely quiet; not optimised for remote work but peaceful",
    hours: "Mon–Fri 9:00–13:00"
  }
];

var LANDMARKS = [
  { id: "lm01-corricella",    name: "Corricella Harbour",                coords: [40.7556, 14.0185], maps_url: "" },
  { id: "lm02-terra-murata",  name: "Terra Murata Citadel",              coords: [40.7614, 14.0232], maps_url: "" },
  { id: "lm03-san-michele",   name: "Abbazia di San Michele Arcangelo",  coords: [40.7618, 14.0228], maps_url: "" },
  { id: "lm04-palazzo-avalos",name: "Palazzo d'Avalos",                  coords: [40.7610, 14.0235], maps_url: "" },
  { id: "lm05-vivara",        name: "Isola di Vivara (nature reserve)",  coords: [40.7512, 14.0440], maps_url: "" },
  { id: "lm06-marina-grande", name: "Marina Grande (Sancio Cattolico)",  coords: [40.7636, 14.0293], maps_url: "" },
  { id: "lm07-chiaiolella",   name: "Marina Chiaiolella",                coords: [40.7540, 14.0380], maps_url: "" },
  { id: "lm08-santa-maria",   name: "Chiesa Santa Maria delle Grazie",   coords: [40.7608, 14.0245], maps_url: "" }
];

return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
