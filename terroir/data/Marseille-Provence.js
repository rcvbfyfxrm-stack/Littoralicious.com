/* Terroir — Marseille · Provence — hand-built on the upgraded template */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#c4a35a", "market": "#d97706", "shop": "#059669", "mainland": "#3b82f6", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Market / Producer", "shop": "Restaurant / Bar", "mainland": "Island / Day trip", "logistics": "Logistics"};
  const PRODUCT_COLORS = {
    "Michelin": "#7f1d1d",
    "Bouillabaisse": "#1e3a5f",
    "Contemporary": "#1f2937",
    "Wood-fired": "#92400e",
    "Pastis": "#a07a20",
    "Market": "#d97706",
    "Navettes": "#a16207",
    "Since 1827": "#5b3a26",
    "Corbusier": "#2d4a5e",
    "Island": "#3b82f6",
    "Pagnol": "#8a3a3a",
    "Seafood": "#0369a1"
  };
  const VENUES = [
 {
  "id": "v01-am-par-alexandre-mazzia",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "Michelin",
  "name": "AM par Alexandre Mazzia",
  "short": "AM",
  "lat": 43.2847,
  "lng": 5.3896,
  "neighborhood": "8e arrondissement, near Rond-Point du Prado",
  "tags": [
   "EUR 290 pp tasting menu; wine pairing separate",
   "One sitting per evening — book at least 3 months ahead by phone or at am-restaurant.com",
   "Dinner only, Tue–Sat; closed Sun–Mon"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "Alexandre Mazzia — a former professional basketball player who retrained in kitchens — opened this 24-seat room in 2014; Michelin awarded Marseille's first and only third star in January 2021, a city whose cooking world had never registered at that level before; named on the World's 50 Best T.O.P. Chefs list 2023 To order: smoked eel with dark chocolate, passionfruit and hibiscus — a chilled, bitter, sea-acid pulse that resets the palate at the menu's hinge, part of a twelve-to-fourteen course tasting built around what Mazzia calls the 'continuum' — each plate an evolution of the last, unified by smoke and the Provençal garden. One sitting per evening; EUR 290 minimum per person, wine pairing separate; there is no à la carte — this is a destination meal requiring months of advance planning.",
  "address": "9 rue François Rocca, 13008 Marseille",
  "phone": "+33 4 91 24 83 63",
  "hours": "Dinner only, Tue–Sat",
  "maps": "https://www.google.com/maps/search/?api=1&query=AM+par+Alexandre+Mazzia+Marseille",
  "verdict": "Twenty-four covers of a culinary language with no French antecedent — Congo-raised, Marseille-fixed, Mazzia's tasting builds from smoke to sea in fragments that never explain themselves and never need to.",
  "signature": "smoked eel with dark chocolate, passionfruit and hibiscus — bitter, sea-acid, chilled at the menu's hinge",
  "person": "Alexandre Mazzia — 3 Michelin stars awarded January 2021, fastest three-star promotion in Michelin France's modern history",
  "signal_chip": "3★ 2021 — fastest in Michelin France history",
  "caveat": "24 covers, one sitting per evening — the waitlist runs three to six months. No à la carte. This requires planning, not impulse."
 },
 {
  "id": "v02-auffo",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "Michelin",
  "name": "Auffo",
  "short": "Auffo",
  "lat": 43.2879,
  "lng": 5.3527,
  "neighborhood": "Vallon des Auffes, 7e — inside the stone-vaulted inlet off the Corniche Kennedy",
  "tags": [
   "EUR 55–80 pp à la carte",
   "Book 3–4 weeks ahead; terrace over the Vallon fills immediately on booking opening",
   "Lunch & dinner, Tue–Sat"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "Chef Coline Faulquier opened Auffo on 25 April 2025 at the iconic address where the legendary L'Épuisette stood until its coastal-occupation licence expired on 31 December 2024 — the site itself is a natural monopoly, stone steps down to the water; her previous restaurant Signature (Aix-en-Provence) held a Michelin star from 2022, and Auffo earned a star in the 2026 Guide France in her first full season here To order: Mediterranean sea bass tartare with citrus-pressed olive oil, capers and fleur de sel — cold, clean, salt-bright over a sea you can almost touch from the table. Still less than a year old at publication; reservations release without much warning and fill within hours — follow @auffo.marseille for slot announcements.",
  "address": "158 rue du Vallon des Auffes, 13007 Marseille",
  "phone": "",
  "hours": "Lunch & dinner, Tue–Sat",
  "maps": "https://www.google.com/maps/search/?api=1&query=Auffo+Vallon+des+Auffes+Marseille",
  "verdict": "Coline Faulquier opened Auffo in April 2025 at the old L'Épuisette address and earned her first star in her first season — the freshest Michelin star in Provence, on a terrace four metres above the fishing boats of the Vallon.",
  "signature": "Mediterranean sea bass tartare with citrus-pressed olive oil, capers and fleur de sel — cold, clean, salt-bright over a sea you can almost touch",
  "person": "Coline Faulquier — 1 Michelin star at Auffo 2026; previously starred at Signature, Aix-en-Provence (2022)",
  "signal_chip": "1★ first season 2026",
  "caveat": "Opened April 2025 — still in first full year. Reservations release without warning and fill within hours. Follow @auffo.marseille for slot announcements."
 },
 {
  "id": "v03-le-petit-nice-passedat",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "Michelin",
  "name": "Le Petit Nice — Passédat",
  "short": "Le Petit Nice",
  "lat": 43.2819,
  "lng": 5.3486,
  "neighborhood": "Anse de Maldormé, Corniche Kennedy, 7e — cliff-line terrace above the sea, 3 km from the Vieux-Port",
  "tags": [
   "EUR 250–340 pp tasting menu",
   "Book 4–8 weeks ahead; hotel-restaurant with rooms above the water",
   "Lunch & dinner; closed Mon — check website for seasonal variations"
  ],
  "productTags": [
   "Michelin",
   "Bouillabaisse"
  ],
  "why": "Gérald Passédat represents the third generation of his family at this address — hotel since 1917, starred since 1980; Michelin awarded three stars in 2013, making it the first and longest-standing three-star address in Marseille and the gastronomic yardstick against which every tasting menu in the city is measured; the fish comes from his fisherman Roland, who goes out each morning and rings in what he has To order: warm rouget with bone emulsion and sun-dried tomato, followed by langoustine barely touched by heat on a stone — Mediterranean precision at the edge of the sea; the bouillabaisse revisited as a pure essence broth, poured last, arrives deconstructed and deeply of the place. The hotel is not cheap and the restaurant does not flex — this is Marseille's canonical fine-dining address, and the room behaves accordingly.",
  "address": "Anse de Maldormé, 160 corniche J. F. Kennedy, 13007 Marseille",
  "phone": "+33 4 91 59 25 92",
  "hours": "Lunch & dinner; closed Mon",
  "maps": "https://www.google.com/maps/search/?api=1&query=Le+Petit+Nice+Passedat+Marseille",
  "verdict": "Three generations at this cliff-face address, three stars since 2013 — Passédat's 'Ma Bouille Abaisse' dismantles the charter dish course by course in a three-hour tasting on a private cove that looks like a movie set and is entirely real.",
  "signature": "warm rouget with bone emulsion and sun-dried tomato — marine, mineral, barely touched by heat",
  "person": "Gérald Passédat — 3 Michelin stars since 2013; third generation of the family at this address since 1917",
  "signal_chip": "3★ since 2013",
  "caveat": "Tasting menus EUR 250–340 per head; book 4–8 weeks ahead. The room behaves accordingly — Marseille's canonical fine-dining address does not flex."
 },
 {
  "id": "v04-une-table-au-sud",
  "cat": "shop",
  "tier": "several",
  "priority": 4,
  "badge": "Michelin",
  "name": "Une Table, Au Sud",
  "short": "Une Table, Au Sud",
  "lat": 43.2978,
  "lng": 5.3689,
  "neighborhood": "Vieux-Port, 2e — directly on the north quai, looking across the harbour to the Fort Saint-Nicolas",
  "tags": [
   "EUR 42 lunch menu (2 courses) · EUR 95–115 dinner tasting",
   "Book 1–2 weeks ahead",
   "Lunch & dinner; closed Sun–Mon"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "Chef Lionel Lévy has held one Michelin star here for over a decade; the view is the Vieux-Port unobstructed — every overnight fishing boat visible through the glass — but the cooking earns its own entry: a market-driven lunch menu at EUR 42 (two courses, glass of wine included on some days) is the best-value starred meal in Marseille by a clear margin To order: red mullet fillet with a bouillabaisse-oil sauce and gribiche of sea vegetables — briny, bitter and precise, the harbour distilled onto the plate The dinner tasting feels expensive relative to what AM or Passédat offer at their level; the lunch formula is where the ratio decisively flips.",
  "address": "2 quai du Port, 13002 Marseille",
  "phone": "+33 4 91 90 63 53",
  "hours": "Lunch & dinner; closed Sun–Mon",
  "maps": "https://www.google.com/maps/search/?api=1&query=Une+Table+Au+Sud+Marseille"
 },
 {
  "id": "v05-chez-etienne",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "Wood-fired",
  "name": "Chez Etienne",
  "short": "Chez Etienne",
  "lat": 43.2991,
  "lng": 5.3709,
  "neighborhood": "Le Panier, 2e — alley behind the old port quarter, uphill from the Cathedral",
  "tags": [
   "EUR 12–18 per pizza; cash only",
   "No reservations; arrive before noon to queue less",
   "Lunch only, Tue–Sat (closes when sold out)"
  ],
  "productTags": [
   "Wood-fired"
  ],
  "why": "Founded by Étienne Cassaro and run since his death by the Quaglia family; the wood-fired oven has been burning in this alley since the 1940s — the photographs on the walls confirm it; no printed menu exists and the only price is what the waiter recites aloud To order: the basic pizza — thin, blistered to carbon at the edge, finished with fresh basil and no embellishment; the dough ferments overnight so the crust has genuine depth, not just char. No card, no printed menu, no reservations; the queue starts before noon and moves quickly. This is Le Panier for Marseillais, not for tourists, so treat the room accordingly.",
  "address": "43 rue de Lorette, 13002 Marseille",
  "phone": "+33 4 91 54 76 33",
  "hours": "Lunch only, Tue–Sat",
  "maps": "https://www.google.com/maps/search/?api=1&query=Chez+Etienne+pizza+Marseille+Panier"
 },
 {
  "id": "v06-le-ventre-de-larchitecte",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "Corbusier",
  "name": "Le Ventre de l'Architecte",
  "short": "Le Ventre de l'Architecte",
  "lat": 43.2731,
  "lng": 5.3977,
  "neighborhood": "Cité Radieuse, 8e — third-floor gymnasium of Le Corbusier's Unité d'Habitation, 280 boulevard Michelet",
  "tags": [
   "EUR 40–65 pp",
   "Book ahead for the roof terrace in summer",
   "Lunch daily; dinner Fri–Sat"
  ],
  "productTags": [
   "Corbusier",
   "Contemporary"
  ],
  "why": "Chef Julien Diaz cooks inside the communal gymnasium that Le Corbusier always intended as a shared social space within the 1952 Unité d'Habitation — a UNESCO World Heritage site since 2016; the cooking is market-driven and direct, the setting extraordinary: the roof terrace above the building places you above a city of a million with the Sainte-Baume ridge behind and the sea ahead To order: roasted Sisteron lamb chops with ratatouille and black-olive tapenade — Provençal in its bones, assembled with a light hand and eaten while Corbusier's modular brise-soleil frame the view behind you. The food occasionally promises more than it delivers; the building is the reason to come. Eat well, don't overthink the menu.",
  "address": "280 boulevard Michelet, 13008 Marseille",
  "phone": "+33 4 91 16 78 23",
  "hours": "Lunch daily; dinner Fri–Sat",
  "maps": "https://www.google.com/maps/search/?api=1&query=Le+Ventre+de+l+Architecte+Cite+Radieuse+Marseille"
 },
 {
  "id": "v07-miramar",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "Bouillabaisse",
  "name": "Miramar",
  "short": "Miramar",
  "lat": 43.2975,
  "lng": 5.3721,
  "neighborhood": "Vieux-Port, 1er — north quai, looking out at Fort Saint-Jean and the harbour mouth",
  "tags": [
   "EUR 75–90 pp for the full bouillabaisse protocol (minimum 2 people)",
   "Book 5–7 days ahead",
   "Lunch & dinner daily"
  ],
  "productTags": [
   "Bouillabaisse"
  ],
  "why": "Chef Christian Buffa has held the classic bouillabaisse charter here since the 1970s — Miramar co-authored the 1980 Charte de la Bouillabaisse de Marseille, the document that defined which fish are non-negotiable: at least five species, rascasse always, saffron broth poured at table, rouille and croûtons on the side; food writer Patricia Wells named it the defining address for the dish in the city To order: the full bouillabaisse for two — orange-saffron broth arriving first in a copper pot, the fish after (scorpionfish, weever, John Dory, conger), rouille spread thick on toast and dragged through the bowl. This is expensive for what it is and the room tilts tourist in peak season; Marseillais eat bouillabaisse at home or drive to Vallon des Auffes. You come here for the charter version, not discovery.",
  "address": "12 quai du Port, 13002 Marseille",
  "phone": "+33 4 91 91 10 40",
  "hours": "Lunch & dinner daily",
  "maps": "https://www.google.com/maps/search/?api=1&query=Miramar+bouillabaisse+Marseille+Vieux+Port"
 },
 {
  "id": "v08-four-des-navettes",
  "cat": "shop",
  "tier": "plenty",
  "priority": 8,
  "badge": "Navettes",
  "name": "Four des Navettes",
  "short": "Four des Navettes",
  "lat": 43.2882,
  "lng": 5.3698,
  "neighborhood": "7e arrondissement, rue Sainte — three minutes on foot from the Abbaye Saint-Victor",
  "tags": [
   "EUR 8–12 for a box of navettes",
   "Walk in; take-away counter",
   "Daily approx 07:00–19:30"
  ],
  "productTags": [
   "Navettes",
   "Since 1827"
  ],
  "why": "Founded in 1781, predating the Revolution — the oldest active bakery in Marseille; the Avias family, current owners, inherited both the recipe for the boat-shaped, orange-blossom-water biscuits and the ceremony: each year on Chandeleur (2 February) the Bishop of Marseille blesses the navettes at the adjacent Abbaye Saint-Victor, a ritual unbroken for centuries and confirmed annually in the Marseille press To order: a box of plain navettes still warm from the oven — orange blossom and a ghost of anise in a dry, twice-baked crumb that softens imperceptibly over three days, the city's only true institutional biscuit. The shop is small and sells out by early afternoon; arrive before noon. These are not artisanal pastries — they are a civic product, deliberately unchanged.",
  "address": "136 rue Sainte, 13007 Marseille",
  "phone": "+33 4 91 33 32 12",
  "hours": "Daily approx 07:00–19:30",
  "maps": "https://www.google.com/maps/search/?api=1&query=Four+des+Navettes+Marseille"
 },
 {
  "id": "v09-bar-de-la-marine",
  "cat": "shop",
  "tier": "plenty",
  "priority": 9,
  "badge": "Pagnol",
  "name": "Bar de la Marine",
  "short": "Bar de la Marine",
  "lat": 43.2955,
  "lng": 5.3672,
  "neighborhood": "Rive Neuve, 7e — south quai of the Vieux-Port, under the Fort Saint-Nicolas cliff",
  "tags": [
   "EUR 4–9 pastis / beer / coffee",
   "Walk in; quai terrace is first-come",
   "Daily from mid-morning to past midnight"
  ],
  "productTags": [
   "Pagnol",
   "Pastis"
  ],
  "why": "Marcel Pagnol shot the bar scenes of his 1931 film <em>Marius</em> — the trilogy that fixed Marseille's self-image for the twentieth century — on this quai, and the Bar de la Marine was the direct model; the current room has been kept in that register: yellow-ochre walls, Ricard mirror, old fishing net overhead, the harbour visible from every table To order: a Pastis 51 or Ricard with the standard water-and-ice accompaniment — cloudy anise in a room where you can hear the boats behind you. The food is average and beside the point. This is a bar for watching the Vieux-Port and reading Pagnol, not a restaurant.",
  "address": "15 quai de Rive Neuve, 13007 Marseille",
  "phone": "+33 4 91 54 95 42",
  "hours": "Daily approx 09:00–01:00",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+de+la+Marine+Marseille+Vieux+Port"
 },
 {
  "id": "v10-maison-empereur",
  "cat": "market",
  "tier": "several",
  "priority": 10,
  "badge": "Since 1827",
  "name": "Maison Empereur",
  "short": "Maison Empereur",
  "lat": 43.2967,
  "lng": 5.3722,
  "neighborhood": "1er arrondissement, rue des Récollets — two streets east of the Vieux-Port's north quai",
  "tags": [
   "Prices as marked; no negotiation",
   "Walk in",
   "Mon–Sat 09:00–19:00"
  ],
  "productTags": [
   "Since 1827",
   "Market"
  ],
  "why": "Founded in 1827 by the Empereur family and still run by descendants — the oldest ironmonger in Marseille, classified by the French government as an Entreprise du Patrimoine Vivant (EPV); three interconnected floor plans of Provençal hardware, kitchen equipment, olive-wood boards, Marseille soap, and a knife counter with Thiers blades at trade prices; the olive-wood boards have been made by the same craftsman in the Var for forty years To order: a Couteau Thiers pocket knife from the glass case and a pain de savon de Marseille — solid, unlabelled, the old 72%-olive-oil formula. Not a food shop. Buy something small or significant; the staff are Marseillais and helpful only if you treat the place as a working shop that survived two centuries by refusing to soften.",
  "address": "4 rue des Récollets, 13001 Marseille",
  "phone": "+33 4 91 54 02 29",
  "hours": "Mon–Sat 09:00–19:00",
  "maps": "https://www.google.com/maps/search/?api=1&query=Maison+Empereur+Marseille"
 },
 {
  "id": "v11-marche-noailles",
  "cat": "market",
  "tier": "several",
  "priority": 11,
  "badge": "Market",
  "name": "Marché de Noailles",
  "short": "Marché de Noailles",
  "lat": 43.2982,
  "lng": 5.3775,
  "neighborhood": "Noailles quarter, 1er — cours Belsunce and rue du Marché des Capucins, the city's most North-African-inflected neighbourhood",
  "tags": [
   "Prices low; cash preferred",
   "Walk in",
   "Mon–Sat 07:00–14:00"
  ],
  "productTags": [
   "Market"
  ],
  "why": "The Capucins covered market and the streets radiating through Noailles constitute the city's everyday produce market — Maghrebi and West African in character, largely unchanged since the mid-20th century: the spice dealers carry harissa, chermoula blends, dried rose petals, preserved lemons and ras el hanout at prices unmatched in central Marseille; the fishmongers on the Capucins pavement set up before 07:00 with what came off the Vieux-Port boats overnight, and the produce is largely unremarkable but the spice stalls are not To order: ground cumin from any bulk spice stall and merguez from the halal butchers behind the covered hall — sniff everything before you buy; the difference between the cheap and the expensive cumin is audible in the nose. Noailles has a reputation that overstates its difficulty; it is a dense, working-class immigrant market. Keep your bag closed and focus on shopping.",
  "address": "Rue du Marché des Capucins / cours Belsunce, 13001 Marseille",
  "phone": "",
  "hours": "Mon–Sat 07:00–14:00",
  "maps": "https://www.google.com/maps/search/?api=1&query=Marché+des+Capucins+Noailles+Marseille"
 },
 {
  "id": "v12-frioul-chateau-dif",
  "cat": "mainland",
  "tier": "several",
  "priority": 12,
  "badge": "Island",
  "name": "Frioul / Château d'If",
  "short": "Frioul",
  "lat": 43.2797,
  "lng": 5.3228,
  "neighborhood": "Frioul archipelago — four limestone islands 5 km west of the Vieux-Port; Château d'If on the separate Île d'If",
  "tags": [
   "Ferry EUR 11–18 return (combined Frioul + If ticket); Frioul If Express from Vieux-Port embarcadère",
   "Buy ticket at the quai or online at frioul-if-express.com; no booking needed",
   "Day trip; first boat approx 09:00 in summer"
  ],
  "productTags": [
   "Island"
  ],
  "why": "The Frioul archipelago — Pomègues and Ratonneau, joined by a causeway — sits 5 km into the open Mediterranean, white limestone cliffs, pocket calanques and a small harbour with a handful of restaurants on Ratonneau; the ferry stops first at Château d'If, the 1529 island prison where Alexandre Dumas placed Edmond Dantès in <em>Le Comte de Monte-Cristo</em>, the cells still visited as he described them To order: grilled daurade at the Restaurant du Port on Ratonneau — whole fish with ratatouille, looking back at the Marseille skyline across open water; straightforward and honest, nothing more. The island restaurants are not refined and survive on a captive day-tripper audience; the food is honest and the setting is the extraordinary part. Do not expect more than fresh fish and a cold drink.",
  "address": "Ferry from Quai des Belges, Vieux-Port, 13001 Marseille",
  "phone": "+33 4 96 11 03 50",
  "hours": "Ferries hourly approx 09:00–18:30 in summer; reduced Oct–Apr",
  "maps": "https://www.google.com/maps/search/?api=1&query=Château+d'If+Marseille"
 },
 {
  "id": "v13-la-boite-a-sardine",
  "cat": "shop",
  "tier": "plenty",
  "priority": 13,
  "badge": "Seafood",
  "name": "La Boîte à Sardine",
  "short": "La Boîte à Sardine",
  "lat": 43.3024,
  "lng": 5.3756,
  "neighborhood": "1er arrondissement, boulevard de la Libération — near the Capucins market axis",
  "tags": [
   "EUR 15–32 pp",
   "No reservations; arrive by 11:30 or queue",
   "Lunch only, Tue–Sat (closes when sold out)"
  ],
  "productTags": [
   "Seafood",
   "Market"
  ],
  "why": "Frédéric Sananikone runs this fish counter-restaurant as a direct extension of his adjacent fresh-fish stall — what he couldn't sell by 11:00 becomes the lunch menu, chalked daily and dependent entirely on the morning's Vieux-Port catch; the pan bagnat made on site is the cheapest masterpiece in the city To order: the pan bagnat — tuna, anchovy, hard-boiled egg, olive, radish, basil and olive oil in a local roll pressed overnight under a weight, the oil entirely saturating the crumb; cold, dense, complete. Tables fill in under ten minutes of opening; if you see a spare seat before noon, take it. No décor, paper napkins, no frills.",
  "address": "2 boulevard de la Libération, 13001 Marseille",
  "phone": "+33 4 91 50 95 95",
  "hours": "Lunch only, Tue–Sat (opens 11:30)",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Boite+a+Sardine+Marseille"
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-le-panier",
  "name": "Le Panier",
  "center": [
   43.2990,
   5.3693
  ],
  "radius": 300,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Le+Panier+Marseille"
 },
 {
  "id": "n-vieux-port",
  "name": "Vieux-Port",
  "center": [
   43.2960,
   5.3660
  ],
  "radius": 350,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vieux-Port+Marseille"
 },
 {
  "id": "n-noailles",
  "name": "Noailles",
  "center": [
   43.2974,
   5.3783
  ],
  "radius": 250,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Noailles+Marseille"
 },
 {
  "id": "n-cours-julien",
  "name": "Cours Julien",
  "center": [
   43.2897,
   5.3845
  ],
  "radius": 280,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cours+Julien+Marseille"
 },
 {
  "id": "n-vallon-des-auffes",
  "name": "Vallon des Auffes",
  "center": [
   43.2879,
   5.3527
  ],
  "radius": 120,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vallon+des+Auffes+Marseille"
 },
 {
  "id": "n-corniche-kennedy",
  "name": "Corniche Kennedy",
  "center": [
   43.2831,
   5.3560
  ],
  "radius": 500,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Corniche+Kennedy+Marseille"
 },
 {
  "id": "n-prado",
  "name": "Prado / 8e",
  "center": [
   43.2780,
   5.3908
  ],
  "radius": 600,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Prado+Marseille+8eme"
 },
 {
  "id": "n-estaque",
  "name": "L'Estaque",
  "center": [
   43.3597,
   5.3199
  ],
  "radius": 400,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=L+Estaque+Marseille"
 }
];
  const WALKS = [
 {
  "id": "w-corniche-kennedy",
  "name": "Corniche Kennedy: Fort Saint-Nicolas to Malmousque",
  "start": [
   43.2929,
   5.3622
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Corniche+Kennedy+Marseille+promenade"
 },
 {
  "id": "w-le-panier-quarter",
  "name": "Le Panier: Accoules to Vieille Charité",
  "start": [
   43.2991,
   5.3695
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Le+Panier+Marseille+Vieille+Charité"
 },
 {
  "id": "w-calanque-sormiou",
  "name": "Calanque de Sormiou: bus 23 terminus to the creek",
  "start": [
   43.2167,
   5.4201
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Calanque+de+Sormiou+Marseille+trailhead"
 },
 {
  "id": "w-notre-dame-to-old-port",
  "name": "Notre-Dame-de-la-Garde to Vieux-Port on foot",
  "start": [
   43.2840,
   5.3730
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Notre-Dame-de-la-Garde+Marseille"
 },
 {
  "id": "w-estaque-port",
  "name": "L'Estaque: the port and Cézanne's clifftop views",
  "start": [
   43.3597,
   5.3199
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=L+Estaque+port+Marseille+Cézanne"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-mucem-terrace",
  "name": "MuCEM J4 terrace café",
  "start": [
   43.2994,
   5.3612
  ]
 },
 {
  "id": "p-work-cours-julien",
  "name": "Cours Julien terrace (any of the street-level café tables)",
  "start": [
   43.2897,
   5.3845
  ]
 },
 {
  "id": "p-work-la-friche",
  "name": "La Friche la Belle de Mai (café + terrace)",
  "start": [
   43.3069,
   5.3858
  ]
 },
 {
  "id": "p-work-bar-marine-rive-neuve",
  "name": "Bar de la Marine, Rive Neuve quai table",
  "start": [
   43.2955,
   5.3672
  ]
 }
];
  const LANDMARKS = [
 {
  "id": "l-cala-sormiou",
  "name": "Calanque de Sormiou",
  "coords": [
   43.2149,
   5.4201
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Calanque+de+Sormiou+Marseille"
 },
 {
  "id": "l-cala-morgiou",
  "name": "Calanque de Morgiou",
  "coords": [
   43.2122,
   5.4350
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Calanque+de+Morgiou+Marseille"
 },
 {
  "id": "l-cala-en-vau",
  "name": "Calanque d'En-Vau",
  "coords": [
   43.1972,
   5.4989
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Calanque+d'En-Vau+Marseille"
 },
 {
  "id": "l-cala-sugiton",
  "name": "Calanque de Sugiton",
  "coords": [
   43.2171,
   5.4388
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Calanque+de+Sugiton+Marseille"
 },
 {
  "id": "l-cala-port-miou",
  "name": "Calanque de Port-Miou",
  "coords": [
   43.1994,
   5.5054
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Calanque+de+Port-Miou+Cassis"
 },
 {
  "id": "l-cult-mucem",
  "name": "MuCEM — Musée des Civilisations de l'Europe et de la Méditerranée",
  "coords": [
   43.2994,
   5.3612
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=MuCEM+Marseille"
 },
 {
  "id": "l-cult-vieille-charite",
  "name": "Vieille Charité — Chapelle & musées",
  "coords": [
   43.2994,
   5.3700
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Vieille+Charité+Marseille"
 },
 {
  "id": "l-cult-notre-dame-de-la-garde",
  "name": "Notre-Dame-de-la-Garde — La Bonne Mère",
  "coords": [
   43.2840,
   5.3730
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Notre-Dame-de-la-Garde+Marseille"
 },
 {
  "id": "l-cult-abbaye-saint-victor",
  "name": "Abbaye Saint-Victor",
  "coords": [
   43.2915,
   5.3658
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Abbaye+Saint-Victor+Marseille"
 },
 {
  "id": "l-cult-cite-radieuse",
  "name": "Cité Radieuse — Unité d'Habitation (Le Corbusier, 1952)",
  "coords": [
   43.2731,
   5.3977
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Cité+Radieuse+Marseille"
 },
 {
  "id": "l-cult-chateau-dif",
  "name": "Château d'If — the island prison",
  "coords": [
   43.2797,
   5.3228
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Château+d'If+Marseille"
 },
 {
  "id": "l-cult-fort-saint-nicolas",
  "name": "Fort Saint-Nicolas — Vieux-Port entrance",
  "coords": [
   43.2929,
   5.3622
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Fort+Saint-Nicolas+Marseille"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
