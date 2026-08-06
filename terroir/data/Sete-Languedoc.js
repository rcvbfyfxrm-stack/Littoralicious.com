window.TERROIR_DATA = (function () {

  const COLORS = {
    "berth":    "#c4a35a",
    "market":   "#2a6a6a",
    "mainland": "#7c3aed",
    "bar":      "#a86a2f",
    "producer": "#5b3a26"
  };

  const CAT_LABELS = {
    "berth":    "Table",
    "market":   "Market / Artisan",
    "mainland": "Out of town",
    "bar":      "Bar / Cave à vins",
    "producer": "Producer"
  };

  const PRODUCT_COLORS = {
    "tielle":     "#b04a2a",
    "seafood":    "#2d4a5e",
    "oyster":     "#2a6a6a",
    "wine":       "#5a3a6a",
    "muscat":     "#a07a20",
    "bourride":   "#8a6a2e",
    "macaronade": "#7a3530",
    "sardines":   "#3a6a45"
  };

  const VENUES = [
    {
      id: "v01-the-marcel",
      cat: "berth",
      tier: "berth_top",
      priority: 1,
      badge: "Top Table",
      name: "The Marcel",
      short: "Michelin-selected canal-quarter table — the finest kitchen in Sète",
      lat: 43.4047,
      lng: 3.6958,
      neighborhood: "Centre",
      tags: ["fine dining", "bourride", "seafood", "Michelin"],
      productTags: ["bourride", "seafood"],
      why: "Laurent Chabert's The Marcel is the table that finally gave Sète a fine-dining address worthy of its extraordinary larder — Michelin Guide selection, in a stripped-back warehouse two streets from the Canal Royal. The verdict: a bourride sètoise poured tableside from a copper pot, the garlic-cream broth loaded with that morning's catch from the étang, then corrected with aioli at the bowl — ten seconds of brine, rendered fat and sun-cut Languedoc acidity in one sequence. To order: the signature opener, raw Bouzigues oysters with Languedoc shallot mignonette, and the tasting menu at dinner. The room strips bare (stone, pendant lamps, no tablecloths) in the way that makes precision on the plate feel earned rather than staged. Caveat: book a week ahead; tasting menu only at dinner, à la carte at Saturday lunch; closed Sunday–Monday.",
      address: "5 rue Lazare Carnot, 34200 Sète",
      phone: "+33 4 67 74 00 00",
      hours: "Tues–Sat lunch & dinner; closed Sun–Mon",
      maps: "https://maps.google.com/?q=The+Marcel+Sete+France"
    },
    {
      id: "v02-tielles-cianni",
      cat: "market",
      tier: "berth_top",
      priority: 2,
      badge: "Since 1937",
      name: "Tielles Cianni-Marcos",
      short: "The founding family of Sète's octopus tart — the only original address",
      lat: 43.4035,
      lng: 3.6961,
      neighborhood: "Centre",
      tags: ["tielle", "pastry", "artisan", "historic"],
      productTags: ["tielle"],
      why: "In 1937 Adrienne Cianni, a Neapolitan immigrant, began stuffing braised octopus-and-tomato into shortcrust pastry rounds and selling them on the quayside. Her granddaughter Sophie Cianni-Marcos runs the original shop at 24 rue Honoré Euzet — the only address in Sète that can legitimately claim the founding line. The tielle is a sealed disc about the size of a side plate: the pastry is firm and lightly peppery, the filling is octopus braised long in spiced tomato, and the whole thing deepens to burnt ochre in the oven. Eat one warm, standing at the counter. Buy two more for the boat. The filling should be dense enough to hold its shape when cut; a watery interior signals shortcuts. No caveat worth adding — this is precisely what it claims to be, executed at the source, with a short queue by 10 am most mornings.",
      address: "24 rue Honoré Euzet, 34200 Sète",
      phone: "+33 4 67 74 66 16",
      hours: "Mon–Sat 8:00–19:30",
      maps: "https://maps.google.com/?q=Tielles+Cianni+Marcos+Sete"
    },
    {
      id: "v03-quai-17",
      cat: "berth",
      tier: "berth_top",
      priority: 3,
      badge: "Bib Gourmand",
      name: "Quai 17",
      short: "Canal-front Bib Gourmand — the best-value serious table in town",
      lat: 43.4038,
      lng: 3.6945,
      neighborhood: "Canal Royal",
      tags: ["bistro", "seafood", "Bib Gourmand", "canal"],
      productTags: ["seafood", "bourride"],
      why: "Jean-Pascal Hamet has been cooking here since 2009, earning a Michelin Bib Gourmand for a kitchen that takes Languedoc product seriously without the ceremony. The terrace at 17 Quai Maréchal-de-Lattre-de-Tassigny faces the working canal and smells faintly of salt and diesel in the nicest possible way. The signature is the moules-farcies sètoises — mussels opened and stuffed with spiced sausage, baked in a shallow tomato broth until the tops blister — a dish you will not eat executed this precisely anywhere outside the étang. Hamet buys Bouzigues oysters before dawn; the rest of the menu follows the market. Order the Languedoc melon starter if it's available. Two weaknesses: the wine list is shorter than it should be, and on August weekends the terrace fills rapidly — book the day before, not the hour before.",
      address: "17 Quai Maréchal-de-Lattre-de-Tassigny, 34200 Sète",
      phone: "+33 4 67 74 71 74",
      hours: "Tues–Sun lunch; Fri–Sat dinner",
      maps: "https://maps.google.com/?q=Quai+17+Sete"
    },
    {
      id: "v04-la-peniche",
      cat: "berth",
      tier: "several",
      priority: 4,
      name: "La Péniche",
      short: "Canal barge turned restaurant — the macaronade of record since 1979",
      lat: 43.4042,
      lng: 3.6938,
      neighborhood: "Canal Royal",
      tags: ["barge", "macaronade", "classic", "canal"],
      productTags: ["macaronade", "seafood"],
      why: "Corinne Larrey has run this converted canal barge since 1979, which means she has been serving the macaronade aux moules — Sète's pasta-and-mussel bake — longer than most restaurants in the city have existed. The moored setting does the lifting: the dining room lists gently and the portholes frame the working canal. Order the macaronade: a dish of Ligurian immigrant ancestry that came with the port workers, layered with spiced meat sauce and shellfish from the étang, baked until the top caramelises. Also order the bourride if it's listed. Larrey's cooking is honest in the way that long experience produces, and the prices remain in a city that hasn't yet inflated. The weakness: the room is small, it fills, and the kitchen is slow on high-season evenings. Lunch only on weekdays; dinner service Friday and Saturday.",
      address: "1 Quai des Moulins, 34200 Sète",
      phone: "+33 4 67 43 24 06",
      hours: "Tues–Sat lunch; Fri–Sat dinner",
      maps: "https://maps.google.com/?q=La+Peniche+Sete"
    },
    {
      id: "v05-lanchois",
      cat: "berth",
      tier: "several",
      priority: 5,
      name: "Chez Lanchois",
      short: "Seven tables, handwritten menu — the working port's own bistro",
      lat: 43.4030,
      lng: 3.6970,
      neighborhood: "Vieux Sète",
      tags: ["bistro", "macaronade", "classic", "local"],
      productTags: ["macaronade", "seafood"],
      why: "Chef Joshua Lanchois runs one of the last truly unreconstructed addresses in Sète: seven tables on rue d'Amsterdam, a handwritten menu that changes with the day's catch, and a macaronade sètoises that the fishing community has been eating here for three generations. This is not a tourist discovery — it's where the port workers ate and, to a meaningful extent, still eat. The benchmark macaronade here: large ridged pasta tubes baked with a ragù of beef and pork shoulder, layered with mussels and clams from the étang, finished in the oven until the top caramelises and the pasta absorbs the brine. Lanchois makes his own sausage. The real caveat: the room is very small and very loud at full tables, the wine selection is basic (order house Picpoul and accept the situation), and there are no reservations — arrive by noon or by seven and wait in the lane.",
      address: "9 rue d'Amsterdam, 34200 Sète",
      hours: "Mon–Sat lunch",
      maps: "https://maps.google.com/?q=Chez+Lanchois+Sete"
    },
    {
      id: "v06-amphore",
      cat: "berth",
      tier: "several",
      priority: 6,
      name: "L'Amphore",
      short: "Seafront terrace for bourride and grilled loup de mer — west-facing",
      lat: 43.3978,
      lng: 3.6891,
      neighborhood: "Côté Plages",
      tags: ["seafood", "terrace", "bourride", "grilled fish"],
      productTags: ["bourride", "seafood"],
      why: "The Promenade Jean-Baptiste Marty runs south along the coast from the canal mouth, and L'Amphore at number 17 has been working the terrace trade for decades without sliding into the tourist-trap parody of frozen product at inflated prices. The kitchen buys local and it shows in the texture of the fish. Order the grilled loup de mer from the étang if it's available, or the bourride — the server ladles the garlic-saffron broth at the table, which makes the aioli-stirring a moment rather than a transaction. The terrace faces west and catches the last of the evening light off the Étang de Thau, which is reason enough in itself. Caveat: on high-summer evenings the wait for a terrace table can exceed forty minutes, and the indoor backup is airless. Come before 19:30 or after 21:00.",
      address: "17 Promenade J.B. Marty, 34200 Sète",
      phone: "+33 4 67 74 67 67",
      hours: "Daily noon–14:30 & 19:00–22:00 (seasonal Apr–Oct)",
      maps: "https://maps.google.com/?q=Amphore+Sete+Promenade"
    },
    {
      id: "v07-demoiselles-dupuy",
      cat: "mainland",
      tier: "several",
      priority: 7,
      badge: "Étang de Thau",
      name: "Les Demoiselles Dupuy",
      short: "Bouzigues oysters eaten metres from the beds — family farm since 1950",
      lat: 43.4423,
      lng: 3.6236,
      neighborhood: "Bouzigues",
      tags: ["oysters", "Bouzigues", "lagoon", "farm table"],
      productTags: ["oyster"],
      why: "Romain Dupuy is the third generation to raise oysters at the family concession on Étang de Thau, 12 km from Sète, and Les Demoiselles Dupuy is the farm table where you eat them metres from the beds they came from. The Bouzigues oyster is the appellation: merroir from a shallow, warm Mediterranean lagoon fed by underground freshwater springs produces a meatier, sweeter flesh than any Atlantic equivalent — less saline, with a distinct hazelnut note at the finish. Order the plateau: a dozen oysters on ice, a tartine of anchoïade, local bread. Add the moules de bouchot if available. Drink Picpoul de Pinet — the one appellation wine that exists specifically to be drunk alongside this oyster on this shore. The experience is worth the 20-minute taxi from Sète; the caveat is that seats in July–August are taken fast. Book by phone the day before; walk-ins are rare.",
      address: "Chemin de la Pointe de Bouzigues, 34140 Bouzigues",
      phone: "+33 4 67 78 30 87",
      hours: "Daily 10:00–22:00 (summer); closed Jan–Feb",
      maps: "https://maps.google.com/?q=Demoiselles+Dupuy+Bouzigues"
    },
    {
      id: "v08-le-passage",
      cat: "berth",
      tier: "plenty",
      priority: 8,
      name: "Le Passage",
      short: "Lunch tables at La Pointe Courte — the Agnès Varda fishing hamlet",
      lat: 43.4097,
      lng: 3.6803,
      neighborhood: "La Pointe Courte",
      tags: ["fish", "local", "Pointe Courte", "lunch"],
      productTags: ["seafood"],
      why: "La Pointe Courte is the fishing community built inside Sète on a spit between the canal and the étang — a cluster of painted wooden houses made famous internationally by Agnès Varda's 1955 debut feature. Le Passage is the informal lunch table that serves the community: plastic chairs, paper tablecloths, fried fish from the morning, ice-cold rosé from a carafe. It is not a destination restaurant — it is a destination neighbourhood with food attached. Order whatever they're grilling. Come before 12:30 or there are no seats. Caveat: the kitchen sometimes closes without notice in shoulder season; call ahead if you're making the trip specifically for lunch.",
      address: "La Pointe Courte, 34200 Sète",
      hours: "Lunch daily (seasonal, May–Sep); call ahead in shoulder season",
      maps: "https://maps.google.com/?q=La+Pointe+Courte+Sete"
    },
    {
      id: "v09-le-boucanier",
      cat: "berth",
      tier: "plenty",
      priority: 9,
      name: "Le Boucanier",
      short: "Grilled fish at Cadre Royal — best-value west-facing sunset table",
      lat: 43.4055,
      lng: 3.6901,
      neighborhood: "Cadre Royal",
      tags: ["grilled fish", "terrace", "sunset", "value"],
      productTags: ["seafood"],
      why: "At the Cadre Royal, where the Canal du Midi meets the étang, Le Boucanier holds a terrace that faces west across the lagoon — the sunset light off the water is the draw and the grilled fish is the food. Nothing revolutionary: loup de mer, dorade royale, calamars à la plancha, very fresh, simply prepared with aioli and Picpoul de Pinet from a carafe. This is the table you return to without ceremony — for the evening light and the fish cooked right. Book a terrace table specifically; the indoor room loses the entire point.",
      address: "Cadre Royal, 34200 Sète",
      hours: "Daily noon–14:30 & 19:30–22:00",
      maps: "https://maps.google.com/?q=Le+Boucanier+Cadre+Royal+Sete"
    },
    {
      id: "v10-tabary",
      cat: "bar",
      tier: "plenty",
      priority: 10,
      name: "Le Tabary's",
      short: "Canal brasserie since the 1930s — Picpoul at the zinc, joutes on the water",
      lat: 43.4040,
      lng: 3.6948,
      neighborhood: "Canal Royal",
      tags: ["brasserie", "bar", "canal", "Picpoul", "joutes"],
      productTags: ["wine"],
      why: "Le Tabary's has occupied this corner of the Canal Royal since the 1930s, when the canal was the working artery of the port. It's a proper canal-town brasserie: zinc counter, tiled floor, a terrace facing the water, and the kind of stool you can sit on for three hours without anyone hurrying you. Drink Picpoul de Pinet by the glass — the local vernacular white, cold and lemony with a mineral bitterness that cuts through heat. Eat oysters if you want something to eat. The Tabary's is also the informal grandstand for the joutes: in summer the water-jousting tournaments happen on this canal, and the evening before a competition the jouteur teams use the terrace. No reservation needed; no caveat worth having.",
      address: "12 Quai du Maréchal-Joffre, 34200 Sète",
      hours: "Mon–Sat 8:00–23:00",
      maps: "https://maps.google.com/?q=Le+Tabarys+Sete"
    },
    {
      id: "v11-la-ola",
      cat: "berth",
      tier: "plenty",
      priority: 11,
      name: "La Ola",
      short: "Oldest beach restaurant on the Corniche — grilled sardines and cold rosé",
      lat: 43.3960,
      lng: 3.6878,
      neighborhood: "Les Plages",
      tags: ["beach", "sardines", "rosé", "corniche"],
      productTags: ["sardines", "seafood"],
      why: "La Ola claims to be the oldest continuously operating restaurant on Sète's Corniche — the long strand of beach running south from the canal towards Marseillan — and the Sétois have been eating grilled sardines and drinking cold rosé here since their parents did the same in the 1960s. Order the sardines on the braise, a Languedoc rosé, a plate of olives. Simple, right, exactly here. Caveat: in August, lunch service overruns into mid-afternoon; arrive at noon or plan a 14:30 second service sitting.",
      address: "46 Corniche du Maréchal-Leclerc, 34200 Sète",
      phone: "+33 4 67 53 02 84",
      hours: "Daily noon–15:00 & 19:00–22:30 (May–Sep); closed Oct–Apr",
      maps: "https://maps.google.com/?q=La+Ola+Sete"
    },
    {
      id: "v12-frontignan-muscat",
      cat: "mainland",
      tier: "plenty",
      priority: 12,
      name: "Muscat de Frontignan SCA",
      short: "The Frontignan cooperative — France's oldest Muscat AOC at the cellar door",
      lat: 43.4479,
      lng: 3.7591,
      neighborhood: "Frontignan",
      tags: ["muscat", "wine", "AOC", "cellar door"],
      productTags: ["muscat"],
      why: "Frontignan is 6 km east of Sète on the étang's eastern shore, home to the Muscat de Frontignan AOC — one of the oldest appellation wines in France, documented in medieval accounts since the 14th century. The cooperative at 14 avenue du Muscat handles the bulk of production and opens for direct sales daily; the Muscat à Petits Grains is the version worth taking seriously — golden-amber, intensely aromatic, dried apricot and orange blossom with a honeyed finish that doesn't become cloying when served properly cold. It is the pairing wine for the tielle, for Roquefort, for a late August afternoon when the light off the étang has turned orange. Caveat: do not conflate this with the Frontignan blends sold at the motorway hypermarkets — the AOC at the cellar door tastes categorically different. Buy two bottles.",
      address: "14 avenue du Muscat, 34110 Frontignan",
      phone: "+33 4 67 48 93 20",
      hours: "Mon–Sat 9:00–12:00 & 14:00–18:30",
      maps: "https://maps.google.com/?q=Muscat+de+Frontignan+SCA"
    }
  ];

  const NEIGHBORHOODS = [
    { id: "n-canal-royal",    name: "Canal Royal",    center: [43.4040, 3.6945], radius: 400, maps_url: "https://maps.google.com/?q=Canal+Royal+Sete" },
    { id: "n-vieux-sete",     name: "Vieux Sète",     center: [43.4030, 3.6970], radius: 300, maps_url: "https://maps.google.com/?q=Vieux+Sete" },
    { id: "n-pointe-courte",  name: "La Pointe Courte", center: [43.4097, 3.6803], radius: 350, maps_url: "https://maps.google.com/?q=La+Pointe+Courte+Sete" },
    { id: "n-les-plages",     name: "Les Plages",     center: [43.3960, 3.6878], radius: 600, maps_url: "https://maps.google.com/?q=Plages+Sete" },
    { id: "n-cadre-royal",    name: "Cadre Royal",    center: [43.4055, 3.6901], radius: 300, maps_url: "https://maps.google.com/?q=Cadre+Royal+Sete" }
  ];

  const WALKS = [
    { id: "w-mont-saint-clair", name: "Mont Saint-Clair Loop",         start: [43.3987, 3.7003], maps_url: "https://maps.google.com/?q=Mont+Saint-Clair+Sete" },
    { id: "w-corniche",         name: "Corniche des Plages",           start: [43.4038, 3.6945], maps_url: "https://maps.google.com/?q=Corniche+Sete" },
    { id: "w-pointe-courte",    name: "Pointe Courte to Cadre Royal",  start: [43.4097, 3.6803], maps_url: "https://maps.google.com/?q=Pointe+Courte+Sete" }
  ];

  const WORK_SPOTS = [
    { id: "ws-mediatheque", name: "Médiathèque Simone Veil (wifi, A/C)", start: [43.4027, 3.6960] },
    { id: "ws-canal-cafe",  name: "Canal Royal café terrace (morning)", start: [43.4042, 3.6942] }
  ];

  const LANDMARKS = [
    { id: "l-cimetiere-marin",  name: "Cimetière Marin — Valéry & Brassens", coords: [43.4010, 3.7012], maps_url: "https://maps.google.com/?q=Cimetiere+Marin+Sete" },
    { id: "l-mont-saint-clair", name: "Mont Saint-Clair",                    coords: [43.3987, 3.7003], maps_url: "https://maps.google.com/?q=Mont+Saint-Clair+Sete" },
    { id: "l-etang-de-thau",    name: "Étang de Thau",                       coords: [43.4200, 3.6300], maps_url: "https://maps.google.com/?q=Etang+de+Thau" },
    { id: "l-canal-royal",      name: "Canal Royal",                         coords: [43.4038, 3.6945], maps_url: "https://maps.google.com/?q=Canal+Royal+Sete" },
    { id: "l-pointe-courte",    name: "La Pointe Courte",                    coords: [43.4097, 3.6803], maps_url: "https://maps.google.com/?q=La+Pointe+Courte+Sete" },
    { id: "l-espace-brassens",  name: "Espace Georges Brassens",             coords: [43.4005, 3.6890], maps_url: "https://maps.google.com/?q=Espace+Georges+Brassens+Sete" },
    { id: "l-musee-paul-valery",name: "Musée Paul Valéry",                   coords: [43.4010, 3.7008], maps_url: "https://maps.google.com/?q=Musee+Paul+Valery+Sete" },
    { id: "l-bouzigues",        name: "Bouzigues — oyster village",          coords: [43.4423, 3.6236], maps_url: "https://maps.google.com/?q=Bouzigues+Herault" },
    { id: "l-frontignan",       name: "Frontignan — Muscat vineyards",       coords: [43.4479, 3.7591], maps_url: "https://maps.google.com/?q=Frontignan+Herault" }
  ];

  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
