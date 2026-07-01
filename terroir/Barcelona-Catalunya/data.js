/* Terroir — Barcelona — gem-standard + category + deepened (2026-07) */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth":"#c4a35a","market":"#d97706","shop":"#059669","mainland":"#7c3aed","logistics":"#2d4a5e"};
  const CAT_LABELS = {"berth":"Signature","market":"Market / Direct","shop":"Restaurant / Bar","mainland":"Out of town","logistics":"Logistics"};
  const PRODUCT_COLORS = {"Michelin":"#7f1d1d","Contemporary":"#1f2937","Traditional":"#a16207","Cult":"#7c3aed","Cafe":"#92400e","Wine":"#7c2d12","Bacaro":"#7c3aed","Drink":"#0ea5e9","Street Food":"#dc2626","Market":"#d97706","Produce":"#15803d","Fish":"#3b82f6","Meat":"#b91c1c","Cheese":"#eab308","Bread":"#a16207","Charcuterie":"#9d174d","Hi-Fi":"#1f2937"};
  const VENUES = [
 {
  "id": "v01-disfrutar",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "badge": "MICHELIN",
  "name": "Disfrutar",
  "short": "Disfrutar",
  "lat": 41.38781,
  "lng": 2.15315,
  "tags": [
   "★★★ since 2024 · World's 50 Best #1 in 2024 · Michelin Green Star",
   "EUR 315 menu (pairing +150–200)",
   "Essential — book 10–12 months ahead",
   "Dinner Tue–Sat"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "★★★ since 2024 · World's 50 Best #1 in 2024 · Michelin Green Star.",
  "address": "Carrer de Villarroel 163, 08036 Barcelona",
  "phone": "+34 933 48 68 96",
  "hours": "Dinner Tue–Sat",
  "maps": "https://www.google.com/maps/search/?api=1&query=Disfrutar+Barcelona",
  "verdict": "In 2024 Disfrutar pulled off both in a single year: crowned the World's best restaurant that June, then handed its third Michelin star months later.",
  "signature": "The panchino: a fried bun served warm and split to order, filled with cold beluga caviar and sour cream.",
  "caveat": "Not for the spontaneous or the budget-minded: Tue–Sat, lunch and dinner; the tasting menu runs about €315 before wine; tables open online roughly a year out, with no walk-ins.",
  "person": "The trio of Oriol Castro, Eduard Xatruch and Mateu Casañas — elBulli's creative team alongside the Adriàs from 1998 to 2011; they opened Compartir in Cadaqués in 2012, then Disfrutar here in 2014.",
  "signal_chip": {
   "label": "#1 2024",
   "full": "World's 50 Best Restaurants No. 1, 2024",
   "cosign": "the elBulli creative team, now topping the list their old kitchen once ruled"
  },
  "section": "Three-star tables",
  "sectionRank": 1,
  "category": "creme",
  "subcat": "Fine dining",
  "money_eats": false
 },
 {
  "id": "v02-lasarte",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "badge": "MICHELIN",
  "name": "Lasarte",
  "short": "Lasarte",
  "lat": 41.39406,
  "lng": 2.15934,
  "tags": [
   "★★★ (Martín Berasategui's Barcelona satellite under Paolo Casagrande)",
   "EUR 345 dinner / EUR 225 lunch",
   "Essential, weeks ahead, dress code",
   "Weekday lunch"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "★★★ (Martín Berasategui's Barcelona satellite under Paolo Casagrande).",
  "address": "Carrer de Mallorca 259 (Monument Hotel), 08008 Barcelona",
  "phone": "+34 934 45 32 42",
  "hours": "Weekday lunch",
  "maps": "https://www.google.com/maps/search/?api=1&query=Lasarte+Barcelona",
  "verdict": "Barcelona's first kitchen to win three Michelin stars (2017), and it has held all three every year since — but the hand plating Berasategui's classics belongs to Paolo Casagrande, born in the Veneto, not Berasategui himself, whose name the restaurant carries.",
  "signature": "The \"1995\" millefeuille: smoked eel, foie gras, spring onion and a caramelised crackle, with a green-apple snap that cuts the fat.",
  "caveat": "Heads up — about €345 for the dinner tasting (€225 at lunch), jacket expected, and you book weeks ahead; closed Sunday and Monday, and Berasategui is rarely in the Barcelona room.",
  "person": "Paolo Casagrande — head chef, born in Susegana in the Veneto; he joined Berasategui's kitchens in 2003 and has run the Barcelona pass since 2012, layering his own plates over the master's canon.",
  "signal_chip": {
   "label": "3-star 17",
   "full": "Three Michelin stars, the first awarded to any Barcelona restaurant (2017)",
   "cosign": "held all three every year since"
  },
  "section": "Three-star tables",
  "sectionRank": 1,
  "category": "creme",
  "subcat": "Fine dining",
  "money_eats": false
 },
 {
  "id": "v03-enigma",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "badge": "MICHELIN",
  "name": "Enigma",
  "short": "Enigma",
  "lat": 41.38187,
  "lng": 2.15509,
  "tags": [
   "★★ (promoted from ★ in November 2025 — the news of the 2026 guide)",
   "EUR 280 menu",
   "Wed–Fri eves only, book via enigmaconcept.es",
   "Wednesday evening"
  ],
  "productTags": [
   "Michelin",
   "Cult"
  ],
  "why": "★★ (promoted from ★ in November 2025 — the news of the 2026 guide).",
  "address": "Carrer de Sepúlveda 38–40, 08015 Barcelona",
  "phone": "+34 616 69 63 22",
  "hours": "Wednesday evening",
  "maps": "https://www.google.com/maps/search/?api=1&query=Enigma+Barcelona",
  "verdict": "Albert Adria's only surviving Barcelona restaurant: a tasting menu of roughly 25 courses, served evenings and never a la carte, that won a second Michelin star in November 2025 — having first earned one back in 2017.",
  "signature": "The 25-course menu itself: cold almond-bonito soup, Earl Grey ravioli, room after shifting room.",
  "caveat": "EUR 280 a head before a drop of wine, no lunch and no walk-ins. Cancel inside 72 hours, or fail to show, and the full EUR 280 per head is charged. Recent listings run weekday evenings with the weekend dark, but the exact nights shift by season — confirm and book through enigmaconcept.es weeks out.",
  "person": "Albert Adria, chef-owner: Ferran's younger brother and elBulli's pastry chief, named World's Best Pastry Chef in 2015. After the pandemic sank Tickets, Hoja Santa and the rest of his elBarri group, Enigma is the one Barcelona room he kept.",
  "signal_chip": {
   "label": "2 star 26",
   "full": "Two MICHELIN stars, 2026 Guide Espana (awarded 25 November 2025, Malaga gala)",
   "cosign": "promoted from one star to two in November 2025; the only Adria table left in Barcelona"
  },
  "section": "Michelin and modern",
  "sectionRank": 2,
  "category": "creme",
  "subcat": "Fine dining",
  "money_eats": false
 },
 {
  "id": "v04-cocina-hermanos-torres",
  "cat": "shop",
  "tier": "several",
  "priority": 4,
  "badge": "MICHELIN",
  "name": "Cocina Hermanos Torres",
  "short": "Cocina Hermanos Torres",
  "lat": 41.38348,
  "lng": 2.13441,
  "tags": [
   "★★★ + Michelin Green Star — the only triple-star in Barcelona with the sustainability award",
   "EUR 310 menu",
   "Essential, months ahead — phone Mon–Fri 10–12 / 18–20",
   "Dinner"
  ],
  "productTags": [
   "Michelin",
   "Cult"
  ],
  "why": "★★★ + Michelin Green Star — the only triple-star in Barcelona with the sustainability award.",
  "address": "Carrer del Taquígraf Serra 20, 08029 Barcelona",
  "phone": "+34 934 10 00 20",
  "hours": "Dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Cocina+Hermanos+Torres+Barcelona",
  "verdict": "The only Barcelona three-star that puts its kitchen in the middle of the room — diners ring three live cooking stations instead of facing a wall that hides the cooks.",
  "signature": "★ La cebolla de Fuentes de Ebro: the PDO onion caramelised 18 hours into a soup, finished with aged Parmesan and shaved black truffle — their homage to the father who grows it.",
  "caveat": "Tasting-menu only (around EUR 315), no a la carte; it sits out in Les Corts, not the old town, and tables book up weeks ahead.",
  "person": "Identical twins Sergio and Javier Torres — they ran the two-Michelin-starred Dos Cielos before opening this central-kitchen dining room in 2018, and are familiar faces from RTVE's Torres en la cocina.",
  "signal_chip": {
   "label": "3 star 22",
   "full": "Three MICHELIN Stars since November 2022, plus a MICHELIN Green Star for sustainability",
   "cosign": "a rare top table that earns the sustainability nod too — and the one we'd actually send a chef to study"
  },
  "section": "Three-star tables",
  "sectionRank": 1,
  "category": "creme",
  "subcat": "Fine dining",
  "money_eats": false
 },
 {
  "id": "v05-mont-bar",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "badge": "MICHELIN",
  "name": "Mont Bar",
  "short": "Mont Bar",
  "lat": 41.38617,
  "lng": 2.15631,
  "tags": [
   "★★ (promoted from ★ in November 2025 — most discussed promotion of the 2026 guide)",
   "EUR 190–240",
   "Essential — counter seats are kitchen-front",
   "Dinner"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "★★ (promoted from ★ in November 2025 — most discussed promotion of the 2026 guide).",
  "address": "Carrer de la Diputació 220, 08011 Barcelona",
  "phone": "+34 933 23 95 90",
  "hours": "Dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mont+Bar+Barcelona",
  "verdict": "The snacks, not the formal plates, are the reason to come to this two-star (promoted November 2025) — load up on the aperitivo-format dishes and treat the mains as a postscript.",
  "signature": "Sobrasada, walnut and Mahon mochi: chewy rice skin giving way to warm cured-pork ooze, cut by salt-sharp island cheese.",
  "caveat": "Book well ahead — a fresh two-star fills fast; the EUR 190 Classic is the floor and the full Mont menu climbs to EUR 240, and the kitchen-front counter sits you in the cooks' noise, not a hushed dining room.",
  "person": "Chef Fran Agudo (Francisco Jose Agudo) staged at El Celler de Can Roca and spent nine years as head chef at Albert Adria's Tickets before joining Mont Bar in 2020; he runs the kitchen that carried it from one star (2023) to two in November 2025, while founder-sommelier Ivan Castro, who opened the room in 2013 at 27, keeps the floor and the wine list.",
  "signal_chip": {
   "label": "2 star 25",
   "full": "Two MICHELIN Stars, awarded at the November 2025 Malaga gala (first star since 2023)",
   "cosign": "and the rare two-star we'd send a chef to eat at a counter for under EUR 200"
  },
  "section": "Michelin and modern",
  "sectionRank": 2,
  "category": "creme",
  "subcat": "Counter dining",
  "money_eats": true
 },
 {
  "id": "v06-aleia",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "badge": "MICHELIN",
  "name": "Aleia",
  "short": "Aleia",
  "lat": 41.40275,
  "lng": 2.15474,
  "tags": [
   "★★ (promoted from ★ in November 2025)",
   "EUR 200 menu",
   "Via hotel or TheFork",
   "Dinner"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "★★ (promoted from ★ in November 2025).",
  "address": "Passeig de Gràcia 132, 08008 Barcelona",
  "phone": "+34 932 55 30 00",
  "hours": "Dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Aleia+Barcelona",
  "verdict": "A rare Barcelona two-star where the register is Cadiz, not Catalan — sherry, almadraba tuna and piriñaca threaded through Palamos prawns and Mediterranean produce — inside Domenech i Montaner's Casa Fuster on Passeig de Gracia.",
  "signature": "Palamos red prawns over piriñaca — sweet Costa Brava shellfish cut by the tomato-pepper-onion bite of a Cadiz chopped salad, pooled with a green-pepper gazpacho.",
  "caveat": "Tasting menu only, around EUR 200 before wine (about EUR 320 with the pairing); book the Casa Fuster dining room weeks ahead. A reserve-and-dress-up evening, not a walk-in.",
  "person": "Rafael \"Rafa\" de Bedoya — head chef, born in Jerez in 1991; he runs the day-to-day under Italo-Argentine founder-chef Paulo Airaudo, threading his Andalusian roots through Mediterranean produce.",
  "signal_chip": {
   "label": "2 star 25",
   "full": "Two MICHELIN stars, awarded at the Guide Spain & Andorra 2026 gala in Malaga, 25 Nov 2025 (first star Nov 2022)",
   "cosign": "The rare Barcelona two-star to send a cook to for its Cadiz register — sherry, piriñaca, almadraba tuna — not the Modernista address."
  },
  "section": "Michelin and modern",
  "sectionRank": 2,
  "category": "creme",
  "subcat": "Fine dining",
  "money_eats": false
 },
 {
  "id": "v07-bar-ca-ete",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "badge": "CONTEMPOR",
  "name": "Bar Cañete",
  "short": "Bar Cañete",
  "lat": 41.38019,
  "lng": 2.17245,
  "tags": [
   "Michelin recommended — the canonical Raval table",
   "EUR 35–55",
   "Essential at dinner; counter seats for the kitchen view",
   "Lunch Thu–Sat"
  ],
  "productTags": [
   "Contemporary",
   "Traditional"
  ],
  "why": "Michelin recommended — the canonical Raval table.",
  "address": "Carrer de la Unió 17, 08001 Barcelona",
  "phone": "+34 932 70 34 58",
  "hours": "Lunch Thu–Sat",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Cañete+Barcelona",
  "verdict": "Skip the back dining room with its dark wood and red leather — the long bar over the open kitchen is the seat to queue for. The tortillitas de camarones reach you straight from the oil, lacy and blistering at the edges, and the cook carving jamón an arm's length off is half the meal.",
  "signature": "★ Tortillitas de camarones — Cádiz shrimp fritters fried to a lacy chickpea-flour gold; then the jamón croquetas.",
  "caveat": "Not a cheap-tapas crawl: expect roughly €35–55 a head at dinner (the €16 weekday lunch menú is the bargain), the bar stools are walk-in only, and it shuts Sundays. The cooking is Andalusian, not Catalan, despite the Raval address.",
  "person": "Sevillian to its bones: the bar grew out of grandfather Antonio, who waited tables at fairs and restaurants, and is carried by his daughter Mari and her husband Manolo, who left Seville for Barcelona. The Olivé group has run it since 2016.",
  "signal_chip": {
   "label": "50 Best Discovery",
   "full": "Listed in The World's 50 Best Discovery (Barcelona)",
   "cosign": "A 50 Best Discovery entry — the academy's curated recommendation guide, not one of the ranked 50 Best awards."
  },
  "section": "Tapas, vermut and cava bars",
  "sectionRank": 4,
  "category": "authentique",
  "subcat": "Tapas",
  "money_eats": true
 },
 {
  "id": "v08-cinc-sentits",
  "cat": "shop",
  "tier": "several",
  "priority": 8,
  "badge": "CONTEMPOR",
  "name": "Cinc Sentits",
  "short": "Cinc Sentits",
  "lat": 41.38408,
  "lng": 2.15467,
  "tags": [
   "★ — small-producer Catalan",
   "EUR 185–219",
   "Book 3–4 weeks ahead at cincsentits.com",
   "Dinner"
  ],
  "productTags": [
   "Michelin",
   "Contemporary"
  ],
  "why": "★ — small-producer Catalan.",
  "address": "Carrer d'Entença 60, 08015 Barcelona",
  "phone": "+34 933 23 94 90",
  "hours": "Dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Cinc+Sentits+Barcelona",
  "verdict": "Of Barcelona's two-star tables, the one whose chef never trained in a kitchen — Jordi Artal ran tech in Silicon Valley before this, and his seasonal tasting menus repeat no principal ingredient twice.",
  "signature": "The opening shot, his ode to Canada: warm maple syrup, chilled cream, cava sabayon and rock salt, layered in a glass and thrown back in one — heat striking cold in a single swallow.",
  "caveat": "No a la carte: two seasonal tasting menus only — the shorter Light at EUR 189, the longer Tasting at EUR 219 — booked three to four weeks out, not a walk-in.",
  "person": "Jordi Artal — chef-owner, Canadian-born of Catalan parents and entirely self-taught; he left a Silicon Valley tech career to open Cinc Sentits with his sister Amelia, the manager and sommelier, in 2004.",
  "signal_chip": {
   "label": "2 star 21",
   "full": "Two Michelin stars (first 2008, second in the Spain & Portugal 2021 guide)",
   "cosign": "and the rare two-star here with no culinary-school lineage behind it"
  },
  "section": "Michelin and modern",
  "sectionRank": 2,
  "category": "creme",
  "subcat": "Catalan fine dining",
  "money_eats": false
 },
 {
  "id": "v09-can-culleretes",
  "cat": "shop",
  "tier": "several",
  "priority": 9,
  "badge": "TRADITION",
  "name": "Can Culleretes",
  "short": "Can Culleretes",
  "lat": 41.38147,
  "lng": 2.17462,
  "tags": [
   "Founded 1786 — oldest restaurant in Catalonia, second oldest in Spain (Guinness-recognised)",
   "EUR 25–35 / menu del dia EUR 15–18",
   "Recommended weekends",
   "Lunch Tue–Sun"
  ],
  "productTags": [
   "Traditional"
  ],
  "why": "Founded 1786 — oldest restaurant in Catalonia, second oldest in Spain (Guinness-recognised).",
  "address": "Carrer de Quintana 5, 08002 Barcelona",
  "phone": "+34 933 17 30 22",
  "hours": "Lunch Tue–Sun",
  "maps": "https://www.google.com/maps/search/?api=1&query=Can+Culleretes+Barcelona",
  "verdict": "Catalonia's oldest dining room (1786) still turns out its canelons and duck-with-prunes from house recipes — come for the unbroken lineage and the EUR 18-20 menu del dia, not for cooking that out-thinks the city's modern kitchens.",
  "signature": "Canelons \"els de sempre\": veal-and-pork tubes under nutmeg bechamel, gratinated with Emmental — first served in the 1950s, now up to 300 plates on a Sunday.",
  "caveat": "Closed Mondays; a warren of tiled, photo-hung rooms that fills with tour groups. Hearty, generous Catalan tradition, not refined plating.",
  "person": "Run by the Agut-Manubens family since 1958 — co-owner sisters Montse and Alicia Agut, daughters of Sisco Agut and Sussi Manubens, with five grandchildren now working the rooms.",
  "signal_chip": {
   "label": "Est. 1786",
   "full": "Founded 1786 — oldest restaurant in Catalonia and second-oldest in Spain after Madrid's Casa Botin (1725); Guinness-cited as Barcelona's oldest",
   "cosign": "Documented to 1786 and Guinness-cited — the date isn't a marketing flourish."
  },
  "section": "Traditional houses",
  "sectionRank": 3,
  "category": "authentique",
  "subcat": "Catalan classic",
  "money_eats": false
 },
 {
  "id": "v10-7-portes-set-portes",
  "cat": "shop",
  "tier": "several",
  "priority": 10,
  "badge": "TRADITION",
  "name": "7 Portes (Set Portes)",
  "short": "7 Portes (Set Portes)",
  "lat": 41.38273,
  "lng": 2.18293,
  "tags": [
   "Since 1836 — the paella institution; the Paella Parellada was invented here",
   "EUR 40",
   "Via 7portes.com",
   "Dinner — the piano sets"
  ],
  "productTags": [
   "Traditional"
  ],
  "why": "Since 1836 — the paella institution; the Paella Parellada was invented here.",
  "address": "Passeig d'Isabel II 14, 08003 Barcelona",
  "phone": "+34 933 19 30 33",
  "hours": "Dinner — the piano sets",
  "maps": "https://www.google.com/maps/search/?api=1&query=7+Portes+(Set+Portes)+Barcelona",
  "verdict": "The dining room opened as a café in 1836, but the kitchen only fired up in 1929 — so the shell-off arròs Parellada the house is known for was neither born here (Café Suís plated the first one, around 1902) nor is it the city's finest paella; you come for the seven salons and the live piano, not a revelation on the plate.",
  "signature": "Arròs Parellada: saffron rice with prawns, chicken and butifarra sausage, every shell and bone already lifted out.",
  "caveat": "Reserve ahead: this is a tourist landmark as much as a kitchen, a meal lands past EUR 40 a head, and the seven salons run loud and full — don't mistake the history for cutting-edge cooking.",
  "person": "For decades the house pianist was Manel Barea, a Valencian who played here four nights a week into his seventies; his keyboard drew compliments from diners as exacting as Plácido Domingo and Lou Reed.",
  "signal_chip": {
   "label": "Est. 1836",
   "full": "Cafè de les 7 Portes opened 1836 in Xifré's arcaded block; a full restaurant since 1929",
   "cosign": "the room is the real heirloom — reserve a salon, not just a table"
  },
  "section": "Traditional houses",
  "sectionRank": 3,
  "category": "story",
  "subcat": "Paella",
  "money_eats": false
 },
 {
  "id": "v11-quimet-quimet",
  "cat": "shop",
  "tier": "several",
  "priority": 11,
  "badge": "TRADITION",
  "name": "Quimet & Quimet",
  "short": "Quimet & Quimet",
  "lat": 41.37659,
  "lng": 2.16427,
  "tags": [
   "Founded 1914, fifth-generation Quimet — standing only, tiny, magnificent",
   "EUR 3–5 / montadito · EUR 20–30 standing",
   "Walk-in only — no reservations",
   "Open 12:00–16:00 + 18:00–22:30 Mon–Fri; 12:00–16:00 Sat; closed Sun"
  ],
  "productTags": [
   "Traditional",
   "Bacaro"
  ],
  "why": "Founded 1914, fifth-generation Quimet — standing only, tiny, magnificent.",
  "address": "Carrer del Poeta Cabanyes 25, 08004 Barcelona",
  "phone": "+34 934 42 31 42",
  "hours": "Open 12:00–16:00 + 18:00–22:30 Mon–Fri; 12:00–16:00 Sat; closed Sun",
  "maps": "https://www.google.com/maps/search/?api=1&query=Quimet+&+Quimet+Barcelona",
  "verdict": "A wine bodega since 1914 that still makes you eat standing at the counter — order the salmon-and-truffled-honey montadito and you are tasting a house best-seller, not a Carrer Blai imitation of it.",
  "signature": "Montadito of smoked salmon, tangy Greek yogurt and truffled honey on crisp bread — salt, smoke, floral sweetness in two bites.",
  "caveat": "Heads up — standing room only, no chairs, no bookings; closed weekends and the whole of August, and a queue forms before the noon and 6pm openings. Come right at open.",
  "person": "Quim Pérez runs it as the fourth generation, with his children Neus and Quim — the fifth — behind the same counter the family opened in 1914 to sell wine from their Can Pascual farmhouse near Montserrat.",
  "signal_chip": {
   "label": "Est. 1914",
   "full": "Bodega founded 1914, run by the same family for five generations",
   "cosign": "a century-old bodega that never added a chair or a reservation book, and we'd still send you"
  },
  "section": "Tapas, vermut and cava bars",
  "sectionRank": 4,
  "category": "authentique",
  "subcat": "Montaditos",
  "money_eats": false
 },
 {
  "id": "v12-la-cova-fumada",
  "cat": "shop",
  "tier": "several",
  "priority": 12,
  "badge": "CULT",
  "name": "La Cova Fumada",
  "short": "La Cova Fumada",
  "lat": 41.37969,
  "lng": 2.1879,
  "tags": [
   "Cash-only, no sign — where la bomba was invented (Civil War era)",
   "EUR 15–25 · bomba EUR 3–4",
   "Walk-in only — no reservations, no phone bookings",
   "Mon–Fri 09:00–15:30, Sat 09:00–14:30; closed Sun"
  ],
  "productTags": [
   "Cult",
   "Traditional"
  ],
  "why": "Cash-only, no sign — where la bomba was invented (Civil War era).",
  "address": "Carrer del Baluard 56, 08003 Barcelona",
  "phone": "+34 932 21 40 61",
  "hours": "Mon–Fri 09:00–15:30, Sat 09:00–14:30; closed Sun",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Cova+Fumada+Barcelona",
  "verdict": "Barcelona's bomba was born in this kitchen — eat the original at a marble table, not the frozen replicas reheated on tourist terraces.",
  "signature": "La bomba: a crisp-fried potato sphere stuffed with spiced meat, slicked with all-i-oli and a fierce red salsa picante.",
  "caveat": "Cash only, no sign on the door, marble tables, mostly daytime hours (roughly 9am to mid-afternoon, with a short Thursday-Friday evening service), shut Sundays, and the queue forms before a table opens.",
  "person": "Palmira Solé (née Fresquet) — married Magí Solé into the family in 1955 and still works the stove; the bomba, credited to grandmother María in the 1950s, stays a house secret.",
  "signal_chip": {
   "label": "Est. 1944",
   "full": "Founded 1944, Barceloneta; birthplace of la bomba (1950s)",
   "cosign": "the recipe every other bomba in the city traces back to"
  },
  "section": "Tapas, vermut and cava bars",
  "sectionRank": 4,
  "category": "story",
  "subcat": "Seafood tapas",
  "money_eats": true
 },
 {
  "id": "v13-el-xampanyet",
  "cat": "shop",
  "tier": "several",
  "priority": 13,
  "badge": "DRINK",
  "name": "El Xampanyet",
  "short": "El Xampanyet",
  "lat": 41.38491,
  "lng": 2.18058,
  "tags": [
   "Cava and anchovy bar since 1929 — three generations of the Esteve family, on the Picasso Museum street",
   "EUR 2–4 / glass · EUR 15–25 head",
   "Walk-in",
   "Lunch / pre-dinner aperitif"
  ],
  "productTags": [
   "Wine",
   "Bacaro"
  ],
  "why": "Cava and anchovy bar since 1929 — three generations of the Esteve family, on the Picasso Museum street.",
  "address": "Carrer de Montcada 22, 08003 Barcelona",
  "phone": "+34 933 19 70 03",
  "hours": "Lunch / pre-dinner aperitif",
  "maps": "https://www.google.com/maps/search/?api=1&query=El+Xampanyet+Barcelona",
  "verdict": "The pour to order is the cloudy, faintly sweet house xampanyet, bottled on the premises and poured from the bottle — not the cava list. The bar took its name from that wine in the sixties, and it still makes its own.",
  "signature": "A glass of the house xampanyet — slightly sparkling, gently sweet — with a saucer of their marinated anchovies in vinegar.",
  "caveat": "No reservations, and a standing-room crush at the tiled marble counter; it leans cash-and-quick. Come right on opening or wait shoulder to shoulder.",
  "person": "Founded by Esteve Ninou in 1929 (the bar began as Ca l'Esteve, \"Esteve's place\"); passed through three generations of the Ninou family — founder Esteve Ninou, his son Estevet, then grandson Joan Carles.",
  "signal_chip": {
   "label": "Est 1929",
   "full": "Family bar, established 1929 — three generations of the Ninou family",
   "cosign": "and one of the few survivors still bottling and pouring its own xampanyet, not just selling someone else's bottles"
  },
  "section": "Tapas, vermut and cava bars",
  "sectionRank": 4,
  "category": "story",
  "subcat": "Cava bar",
  "money_eats": false
 },
 {
  "id": "v14-els-pescadors",
  "cat": "shop",
  "tier": "plenty",
  "priority": 14,
  "badge": "TRADITION",
  "name": "Els Pescadors",
  "short": "Els Pescadors",
  "lat": 41.40235,
  "lng": 2.21078,
  "tags": [
   "The Poblenou seafood benchmark — suquet de peix with authority",
   "EUR 45–65",
   "Essential weekends, via elspescadors.com",
   "Lunch on the terrace of the old square"
  ],
  "productTags": [
   "Traditional"
  ],
  "why": "The Poblenou seafood benchmark — suquet de peix with authority.",
  "address": "Plaça de Prim 1, 08005 Barcelona",
  "phone": "+34 932 25 20 18",
  "hours": "Lunch on the terrace of the old square",
  "maps": "https://www.google.com/maps/search/?api=1&query=Els+Pescadors+Barcelona",
  "verdict": "The Poblenou rice house locals book the ombú terrace for — fish in daily off the Arenys de Mar auction, not the beachfront paella the tour groups queue for.",
  "signature": "Bomba fishermen's rice (~EUR 27.50): Valencian bomba cooked to a starchy bite, three fish straight off the day's auction.",
  "caveat": "Special-occasion prices (~EUR 50-60 a head, not a chiringuito), and the terrace tables go first, so book ahead. The gnarled trees shading the square are ombú brought from South America, not figs.",
  "person": "Opened in spring 1980 by Toia Duran and Pep Maulini, who restored a 1913 fishermen's tavern on Plaça de Prim and made it a canteen for Barcelona's theatre and film world; their son Marc Maulini Duran took over the kitchen in 2019.",
  "signal_chip": {
   "label": "Since 1980",
   "full": "A restaurant since 1980 in a fishermen's tavern dating to 1913, on Plaça de Prim, Poblenou",
   "cosign": "a Poblenou institution we'd send a chef to before any beachfront paella house"
  },
  "section": "Seafood and the harbour",
  "sectionRank": 5,
  "category": "authentique",
  "subcat": "Seafood",
  "money_eats": true
 },
 {
  "id": "v15-suculent",
  "cat": "shop",
  "tier": "plenty",
  "priority": 15,
  "badge": "CONTEMPOR",
  "name": "Suculent",
  "short": "Suculent",
  "lat": 41.37876,
  "lng": 2.16847,
  "tags": [
   "Michelin recommended — the elBulli-trained reading of Catalan classics",
   "EUR 55–80",
   "Via suculent.com",
   "Dinner"
  ],
  "productTags": [
   "Contemporary",
   "Traditional"
  ],
  "why": "Michelin recommended — the elBulli-trained reading of Catalan classics.",
  "address": "Rambla del Raval 43, 08001 Barcelona",
  "phone": "+34 934 43 65 79",
  "hours": "Dinner",
  "maps": "https://www.google.com/maps/search/?api=1&query=Suculent+Barcelona",
  "verdict": "The steak tartare on grilled marrow bone here is the original Toni Romero plated in 2012, not one of the copies that now turn up on menus across Spain.",
  "signature": "Steak tartare hand-cut over grilled marrow bone, crowned with shattering pommes soufflees.",
  "caveat": "A tight split-level room on a Raval rambla the hotels tell tourists to skip; the few tables book out, and at EUR 55-80 it is share-plates, not a steal.",
  "person": "Toni Romero, chef-owner, born Nules 1986; cooked the meat line at elBulli until it closed in 2011, then Anne-Sophie Pic at Valence. He opened the Suculent kitchen in 2012 and is now its sole owner.",
  "signal_chip": {
   "label": "MICHELIN",
   "full": "MICHELIN Guide listed (a Plate), not starred",
   "cosign": "the Guide lists the room; we would send you for the tartare alone"
  },
  "section": "Michelin and modern",
  "sectionRank": 2,
  "category": "authentique",
  "subcat": "Catalan classic",
  "money_eats": true
 },
 {
  "id": "v16-mercat-de-la-boqueria",
  "cat": "market",
  "tier": "plenty",
  "priority": 16,
  "badge": "MARKET",
  "name": "Mercat de la Boqueria",
  "short": "Mercat de la Boqueria",
  "lat": 41.38157,
  "lng": 2.17158,
  "tags": [
   "Founded 1840 on the site of the former Convent of Sant Josep — Barcelona's flagship market",
   "EUR variable · the bar counters EUR 12–25",
   "Walk-in",
   "Tue–Sat morning 08:00–11:00 (avoid the lunchtime tourist crush)"
  ],
  "productTags": [
   "Market",
   "Produce"
  ],
  "why": "Founded 1840 on the site of the former Convent of Sant Josep — Barcelona's flagship market.",
  "address": "La Rambla 91, 08001 Barcelona",
  "phone": "+34 934 13 23 03",
  "hours": "Tue–Sat morning 08:00–11:00 (avoid the lunchtime tourist crush)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mercat+de+la+Boqueria+Barcelona",
  "verdict": "The reason to come is the back rows and the marble counters of Pinotxo and Bar Central, not the photogenic front stalls on La Rambla where the city's cooks no longer shop.",
  "signature": "Breakfast standing at Pinotxo Bar: chickpeas with botifarra negra, or the day's cap-i-pota stew.",
  "caveat": "Go Tue-Sat before 11am; by midday the front aisles are a selfie crush and prices double. Many stalls shut Sunday.",
  "person": "Pinotxo Bar - the Bayen family's counter since 1940, long the market's most storied breakfast stop.",
  "signal_chip": {
   "label": "Since 1840",
   "full": "Mercat de la Boqueria, on the site of the former Convent of Sant Josep, since 1840",
   "cosign": "the bar counters at the back, not the Rambla front, are the reason to come"
  },
  "section": "Markets",
  "sectionRank": 6,
  "category": "authentique",
  "subcat": "Market",
  "money_eats": false
 },
 {
  "id": "v17-mercat-de-sant-antoni",
  "cat": "market",
  "tier": "plenty",
  "priority": 17,
  "badge": "MARKET",
  "name": "Mercat de Sant Antoni",
  "short": "Mercat de Sant Antoni",
  "lat": 41.3795,
  "lng": 2.16282,
  "tags": [
   "1882 iron market by Antoni Rovira i Trias — reopened in 2018 after eight years of restoration",
   "EUR variable",
   "Walk-in",
   "Sunday morning for the books; Tue–Sat for fresh produce"
  ],
  "productTags": [
   "Market",
   "Produce"
  ],
  "why": "1882 iron market by Antoni Rovira i Trias — reopened in 2018 after eight years of restoration.",
  "address": "Carrer del Comte d'Urgell 1, 08011 Barcelona",
  "phone": "",
  "hours": "Sunday morning for the books; Tue–Sat for fresh produce",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mercat+de+Sant+Antoni+Barcelona",
  "verdict": "Not the Boqueria's tour-bus crush off La Rambla: this is the working Eixample market locals shop six days a week. Its fame, though, is the Sunday second-hand book and collectibles fair — lodged here since 1936 and billed as Europe's largest of its kind.",
  "signature": "★ Sunday morning: comb the book stalls for a foxed Catalan first edition or a peseta-era postcard.",
  "caveat": "Heads up — turn up Sunday for vegetables and you'll find none: Sunday is the book and collectibles fair only; the fresh-produce hall trades the rest of the week. The four-armed plan is a maze; before you eat, find the old Sant Antoni bastion on level -1 — a stretch of the 17th-century wall that once split the old city from the new Eixample.",
  "person": "Antoni Rovira i Trias designed the 1882 iron hall — the same architect who won Barcelona's 1859 competition to lay out the Eixample, only to be overruled by the central government in Madrid in favour of Cerdà's grid.",
  "signal_chip": {
   "label": "Reborn 18",
   "full": "Reopened spring 2018 after a nine-year, ~€80M restoration (works begun 2009)",
   "cosign": "a civic rebuild that kept Rovira i Trias's 1882 ironwork rather than gutting it"
  },
  "section": "Markets",
  "sectionRank": 6,
  "category": "authentique",
  "subcat": "Market",
  "money_eats": true
 },
 {
  "id": "v18-codorn-u",
  "cat": "shop",
  "tier": "plenty",
  "priority": 18,
  "badge": "CULT",
  "name": "Codorníu",
  "short": "Codorníu",
  "lat": 41.43133,
  "lng": 1.78283,
  "tags": [
   "Founded 1551 · birthplace of Cava (1872, Josep Raventós i Fatjó) · cellars by Puig i Cadafalch 1895–1921, Spanish National Monument 1976",
   "EUR 17–35 / visit",
   "Book ahead at codorniu.com — slots fill weekends",
   "Morning tour"
  ],
  "productTags": [
   "Wine"
  ],
  "why": "Founded 1551 · birthplace of Cava (1872, Josep Raventós i Fatjó) · cellars by Puig i Cadafalch 1895–1921, Spanish National Monument 1976.",
  "address": "Avinguda Jaume Codorníu s/n, 08770 Sant Sadurní d'Anoia",
  "phone": "+34 938 91 33 42",
  "hours": "Morning tour",
  "maps": "https://www.google.com/maps/search/?api=1&query=Codorníu+Barcelona",
  "verdict": "Not a tasting bar but a Modernista cathedral of wine: Puig i Cadafalch's vaulted brick cellars at the house where Josep Raventós Fatjó bottled Spain's first traditional-method cava in 1872, now toured by electric train through 30km of tunnels — the longest cellar network of any cava house.",
  "signature": "A flute of Anna de Codorníu, the chardonnay-led brut that carries the house name, poured at the tasting that closes the tour.",
  "caveat": "Heads up — it's in Sant Sadurní d'Anoia, about 45 minutes by train from Barcelona-Sants, not the city; book ahead, and expect a heritage-monument visit of an industrial-scale house (Grupo Raventós Codorníu), not an intimate grower's cellar.",
  "person": "Josep Raventós Fatjó, who in 1872 — inspired by a trip to Champagne — bottled Spain's first cava here, applying the traditional method to the Penedès grapes Macabeo, Xarel·lo and Parellada.",
  "signal_chip": {
   "label": "Monument",
   "full": "National Monument of Historical-Artistic Interest, 1976 (the Puig i Cadafalch cellars)",
   "cosign": "Puig i Cadafalch was Gaudí's contemporary, and it shows — we'd ride the train twice"
  },
  "section": "Cava country",
  "sectionRank": 7,
  "category": "story",
  "subcat": "Cava",
  "money_eats": false
 },
 {
  "id": "vq-bacoa-kiosko-little-bacoa",
  "cat": "shop",
  "tier": "plenty",
  "priority": 60,
  "badge": "Burger",
  "name": "Bacoa (Kiosko / Little Bacoa)",
  "short": "Bacoa (Kiosko / Little Bacoa)",
  "lat": 41.3836,
  "lng": 2.1834,
  "tags": [],
  "productTags": [
   "Burger"
  ],
  "why": "El Born gourmet-burger pioneer since 2010; stone-grilled patties, small counter, order and queue.",
  "address": "Av. del Marquès de l'Argentera, 1, El Born / La Ribera, 08003 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bacoa+(Kiosko+%2F+Little+Bacoa)+Barcelona",
  "category": "quickbites",
  "subcat": "Burger",
  "money_eats": false,
  "verdict": "It is the lead entry in Time Out Barcelona's burger guide and won the magazine's 2010 Best Sandwich award, but the independent 15-seat 2010 pioneer is now flagged closed and the brand survives as an AmRest-owned mini-chain (the operator of Burger King and Pizza Hut Spain).",
  "signature": "The house Bacoa: stone-grilled patty, smoked bacon, manchego, cheddar, pickles, artisan mustard, smoky char.",
  "caveat": "A small counter spot with no reservations, so expect a queue. Time Out flags the original \"Little Bacoa\" (Colomines, 2) as closed; the still-open Born door is the Kiosko on Av. del Marquès de l'Argentera, 1, which is AmRest-run rather than the independent original.",
  "person": "Brad Ainsworth",
  "signal_chip": {
   "label": "Time Out top",
   "full": "Time Out Barcelona, 'The best burgers in the city' guide — Bacoa is the lead entry, its three locations opening the list; also Time Out Barcelona 'Best Sandwich' award winner, 2010.",
   "cosign": "Time Out credits founder Brad Ainsworth as the man who brought the gourmet burger to Barcelona, stone-grilled for an inimitable smoky flavour."
  }
 },
 {
  "id": "vq-bar-canyi",
  "cat": "shop",
  "tier": "plenty",
  "priority": 61,
  "badge": "Burger",
  "name": "Bar Canyí",
  "short": "Bar Canyí",
  "lat": 41.3804,
  "lng": 2.1601,
  "tags": [],
  "productTags": [
   "Burger"
  ],
  "why": "Sant Antoni bar from the 1-Michelin-star Slow & Low team; bomba from €7, ~€30 a head; Tue-Sat, no bookings",
  "address": "Carrer de Sepúlveda, 107, Sant Antoni / L'Eixample, 08015 Barcelona, Spain",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Cany%C3%AD+Barcelona",
  "category": "quickbites",
  "subcat": "Burger",
  "money_eats": true,
  "verdict": "The Infatuation Barcelona's standalone review (May 2025) calls its oxtail-pickle-kimchi burger \"might just be the juiciest thing we've ever had\" — Michelin-pedigree cooking from the Slow & Low team at barri-bar prices, bombas from €7.",
  "signature": "The oxtail, pickle and kimchi burger — slow-cooked oxtail, kimchi crunch, juice-soaked bun",
  "caveat": "No bookings (\"no fem reserves\") and it fills fast; small Sant Antoni counter bar, Tue-Sat lunch and dinner only (closed Sun-Mon). Not a cheap bite — tapas ~€3.50-15, bomba from €7, reckon ~€30 a head (can run to €60).",
  "person": "Francesc Beltri & Nicolás de la Vega (chefs/owners; also run 1-Michelin-star Slow & Low)",
  "signal_chip": {
   "label": "Infatuation",
   "full": "The Infatuation Barcelona — standalone review of Bar Canyí (May 2025)",
   "cosign": "from the team behind 1-Michelin-star Slow & Low"
  }
 },
 {
  "id": "vq-la-real-hamburgueseria",
  "cat": "shop",
  "tier": "plenty",
  "priority": 62,
  "badge": "Burger",
  "name": "La Real Hamburgueseria",
  "short": "La Real Hamburgueseria",
  "lat": 41.3939,
  "lng": 2.1632,
  "tags": [],
  "productTags": [
   "Burger"
  ],
  "why": "Eixample burger spot two blocks off Passeig de Gracia; cheddar cream baked into the brioche bun",
  "address": "Carrer de València 285, Dreta de l'Eixample, 08009 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Real+Hamburgueseria+Barcelona",
  "category": "quickbites",
  "subcat": "Burger",
  "money_eats": false,
  "verdict": "The Infatuation reviewed it as a standalone Barcelona spot in Jan 2025, calling it \"some of the cheesiest burgers Barcelona has ever seen\" — a cheese-forward gourmet burger, not a ranked best-of.",
  "signature": "The La Real: beef under cheddar, with housemade cheddar cream baked into the brioche bun.",
  "caveat": "Casual sit-down, not a takeaway counter; pricey on The Infatuation's scale and relentlessly rich — the cheese is the whole point, not a light bite.",
  "person": "Isabelle Kliger",
  "signal_chip": {
   "label": "Infatuation",
   "full": "The Infatuation Barcelona — standalone review by Isabelle Kliger, 16 Jan 2025 (no numbered ranking position)",
   "cosign": "The Infatuation"
  }
 },
 {
  "id": "vq-la-royale",
  "cat": "shop",
  "tier": "plenty",
  "priority": 63,
  "badge": "Burger",
  "name": "La Royale",
  "short": "La Royale",
  "lat": 41.3996,
  "lng": 2.1227,
  "tags": [],
  "productTags": [
   "Burger"
  ],
  "why": "~€30 a head; Royale Premium = 220g Japanese wagyu + Stilton; Tue–Sun, closed Mon; uptown Sarrià",
  "address": "Plaça del Camp, 5, Sarrià-Sant Gervasi, 08022 Barcelona, Spain",
  "maps": "https://www.google.com/maps/search/?api=1&query=La+Royale+Barcelona",
  "category": "quickbites",
  "subcat": "Burger",
  "money_eats": false,
  "verdict": "An uptown Sarrià gourmet burger bar with recipes credited to Michelin-starred Paco Pérez; the Royale Premium is a 220g Japanese-wagyu patty with Stilton, and a meal runs around €30 a head — not a cheap quick-bite.",
  "signature": "Royale Premium: 220g Japanese wagyu, melting Stilton, lettuce, spring onion, pickle, Royale sauce.",
  "caveat": "Not a cheap quick-bite — around €30 a head, closer to €50 with one of its signature gin and tonics; sit-down with a terrace (delivery available, not takeaway-only); closed Mondays.",
  "person": "Paco Pérez — Michelin-starred chef credited by Time Out Barcelona as the author of La Royale's burger recipes",
  "signal_chip": {
   "label": "Time Out",
   "full": "Included in Time Out Barcelona's 'The best burgers in the city' — an unranked collection of around two dozen spots, published Sep 2017; no numbered position",
   "cosign": "Time Out Barcelona"
  }
 },
 {
  "id": "vq-musta-shawarma",
  "cat": "shop",
  "tier": "plenty",
  "priority": 64,
  "badge": "Doner",
  "name": "Musta Shawarma",
  "short": "Musta Shawarma",
  "lat": 41.4013,
  "lng": 2.1559,
  "tags": [],
  "productTags": [
   "Doner"
  ],
  "why": "Lower Gràcia, Carrer de Mozart 4; open daily ~13:00–00:30; mains roughly €1–9.",
  "address": "Carrer de Mozart, 4, 08012 Barcelona (lower Gràcia, near Casa Fuster)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Musta+Shawarma+Barcelona",
  "category": "quickbites",
  "subcat": "Doner",
  "money_eats": true,
  "verdict": "Guía Repsol named it among four Barcelona kebab favorites in 2018, but no Time Out, Eater or OAD kebab ranking exists to corroborate the call.",
  "signature": "Spit-shaved lamb shawarma slicked with mild tahina, lettuce, tomato and onion in soft pita.",
  "caveat": "Minimal seating — a few bar stools and tiny tables — takeaway-first Gràcia counter; the only quality signal is Guía Repsol's favorites list, not a dedicated top-tier kebab ranking.",
  "person": "Mustafa Chreiki (Syrian owner; opened Musta in 2013 after about 7 years at nearby La Caravana on the same street)"
 },
 {
  "id": "vn-abac",
  "cat": "shop",
  "tier": "plenty",
  "priority": 40,
  "badge": "MICHELIN",
  "name": "ABaC",
  "short": "ABaC",
  "lat": 41.4114,
  "lng": 2.1356,
  "tags": [
   "One of Barcelona's four three-MICHELIN-star tables on Tibidabo — Jordi Cruz's single avant-garde tasting menu."
  ],
  "productTags": [
   "Fine dining"
  ],
  "why": "One of Barcelona's four three-MICHELIN-star tables on Tibidabo — Jordi Cruz's single avant-garde tasting menu.",
  "address": "Avinguda del Tibidabo, 1, 08022 Barcelona, Spain",
  "maps": "https://www.google.com/maps/search/?api=1&query=ABaC+Barcelona",
  "category": "creme",
  "subcat": "Fine dining",
  "money_eats": false,
  "verdict": "One of Barcelona's four three-MICHELIN-star kitchens — a single ~€295 avant-garde tasting menu from Jordi Cruz that buys technical spectacle over ingredient luxury, holding the third star since 2017.",
  "signature": "Aqua Mirabilis — a dessert reimagining a 1709 eau de cologne in citrus, flower and herb.",
  "caveat": "Not for value or spontaneity: ~€295 before a ~€140 wine pairing, up by Tibidabo roughly 30 minutes by taxi from the centre, and a 2025 Fine Dining Journal review (7.5/10) called the service polished but the ambition faded from its 2021 peak. Book weeks ahead.",
  "person": "Jordi Cruz",
  "signal_chip": {
   "label": "★★★ MICHELIN",
   "full": "Three MICHELIN stars, MICHELIN Guide España 2026 (third star held since 2017)",
   "cosign": "MICHELIN Guide España 2026"
  }
 },
 {
  "id": "vn-moments",
  "cat": "shop",
  "tier": "plenty",
  "priority": 41,
  "badge": "MICHELIN",
  "name": "Moments",
  "short": "Moments",
  "lat": 41.3914,
  "lng": 2.1653,
  "tags": [
   "One-MICHELIN-star, Ruscalleda-lineage Catalan haute cuisine inside the Mandarin Oriental, led by Raül Balam."
  ],
  "productTags": [
   "Catalan haute cuisine"
  ],
  "why": "One-MICHELIN-star, Ruscalleda-lineage Catalan haute cuisine inside the Mandarin Oriental, led by Raül Balam.",
  "address": "Passeig de Gràcia 38-40 (inside Mandarin Oriental), Eixample, 08007 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=Moments+Barcelona",
  "category": "creme",
  "subcat": "Catalan haute cuisine",
  "money_eats": false,
  "verdict": "Demoted from two MICHELIN stars to one at the November 2024 gala after roughly a decade at two, it now reads as polished, classical Ruscalleda-lineage Catalan fine dining rather than avant-garde risk.",
  "signature": "Carnaroli paella cooked al dente, with shrimp and an intense prawn-head bisque.",
  "caveat": "Not the two-star destination the brief claims — MICHELIN pulled the second star at the 26 November 2024 gala, and it is one star in both the 2025 and 2026 guides. Expect Ruscalleda-heritage refinement inside a luxury hotel, not cutting-edge invention; closed Sunday and Monday (official site lists dinner Tuesday–Saturday — confirm Saturday-lunch claims before relying on them).",
  "person": "Raül Balam Ruscalleda, executive chef, with his mother Carme Ruscalleda — the most Michelin-starred female chef in the world (seven stars at her peak across Sant Pau, Sant Pau Tokyo and Moments) — as gastronomic adviser.",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "One MICHELIN star in Guía Michelin España 2025 and 2026 — down from two stars, held roughly 2013–2024, removed at the Nov 2024 gala",
   "cosign": "MICHELIN Guide"
  }
 },
 {
  "id": "vn-via-veneto",
  "cat": "shop",
  "tier": "plenty",
  "priority": 42,
  "badge": "MICHELIN",
  "name": "Via Veneto",
  "short": "Via Veneto",
  "lat": 41.3956,
  "lng": 2.1407,
  "tags": [
   "Barcelona's old-guard one-star, open since 1967; its pressed-duck ritual came from Paris's Tour d'Argent."
  ],
  "productTags": [
   "Fine dining"
  ],
  "why": "Barcelona's old-guard one-star, open since 1967; its pressed-duck ritual came from Paris's Tour d'Argent.",
  "address": "Carrer de Ganduxer, 10, Sarrià-Sant Gervasi, 08021 Barcelona, Spain",
  "maps": "https://www.google.com/maps/search/?api=1&query=Via+Veneto+Barcelona",
  "category": "creme",
  "subcat": "Fine dining",
  "money_eats": false,
  "verdict": "Holds one MICHELIN star and has served its pressed-duck, Belle Époque classicism since 1967 — the old-guard haute cuisine the elBulli generation reacted against, not the lab food they pioneered.",
  "signature": "Pressed roast duck carved tableside, served two ways in its own jus",
  "caveat": "Not avant-garde and not cheap: grande-maison formality and prices, and the kitchen now runs a contemporary menu beside the classics — come for the tradition and the duck ritual, not invention.",
  "person": "David Andrés (executive chef); owner Josep Monje — Salvador Dalí was one of the restaurant's longtime regulars — brought the duck press from Paris's Tour d'Argent.",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "One MICHELIN Star — MICHELIN Guide (2026 listing; held for decades)",
   "cosign": "MICHELIN Guide"
  }
 },
 {
  "id": "vn-dos-palillos",
  "cat": "shop",
  "tier": "plenty",
  "priority": 43,
  "badge": "MICHELIN",
  "name": "Dos Palillos",
  "short": "Dos Palillos",
  "lat": 41.3832,
  "lng": 2.1672,
  "tags": [
   "Ex-elBulli chef Albert Raurich's one-MICHELIN-star Asian-Spanish tasting counter in El Raval, Barcelona."
  ],
  "productTags": [
   "Asian-Spanish fine dining"
  ],
  "why": "Ex-elBulli chef Albert Raurich's one-MICHELIN-star Asian-Spanish tasting counter in El Raval, Barcelona.",
  "address": "Carrer d'Elisabets, 9, El Raval (Ciutat Vella), 08001 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=Dos+Palillos+Barcelona",
  "category": "creme",
  "subcat": "Asian-Spanish fine dining",
  "money_eats": false,
  "verdict": "Holds a current one-MICHELIN-star rating not for a dining room but for a small open-kitchen counter where former elBulli head chef Albert Raurich runs Spanish tapas through a Japanese-led Asian lens as a surprise tasting menu.",
  "signature": "Steamer of shiitake-and-scallion gyoza with black sesame, dipped in soy — a tasting-menu signature",
  "caveat": "The starred meal is the small open-kitchen counter — surprise tasting menu only, no a la carte, fixed seating times, and it books out; the entrance sake bar is a separate, no-reservations space with a short menu, not the same experience.",
  "person": "Albert Raurich (chef-owner; former head chef at elBulli until 2007, opened Dos Palillos in 2008 with sommelier-partner Tamae Imachi)",
  "signal_chip": {
   "label": "1 MICHELIN★",
   "full": "One MICHELIN star, MICHELIN Guide España — held in the current/2025 guide and for over a decade (sources differ on the first year, 2012 or 2013)",
   "cosign": "MICHELIN Guide"
  }
 },
 {
  "id": "vn-cal-pep",
  "cat": "shop",
  "tier": "plenty",
  "priority": 44,
  "badge": "LOCAL",
  "name": "Cal Pep",
  "short": "Cal Pep",
  "lat": 41.3834,
  "lng": 2.1827,
  "tags": [
   "A small seafood counter open since 1989, no written menu — you eat what Pep's cooks plate at the bar."
  ],
  "productTags": [
   "Seafood tapas"
  ],
  "why": "A small seafood counter open since 1989, no written menu — you eat what Pep's cooks plate at the bar.",
  "address": "Plaça de les Olles, 8, El Born / La Ribera, Ciutat Vella, 08003 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=Cal+Pep+Barcelona",
  "category": "authentique",
  "subcat": "Seafood tapas",
  "money_eats": false,
  "verdict": "A no-menu, no-bookings seafood counter open since 1989 where Pep's cooks pick your plates — touristy now, but the molten tortilla and tuna tartare still draw a queue before the doors open.",
  "signature": "Oozing, molten-centred Spanish tortilla finished with aioli and chorizo",
  "caveat": "Not a place to linger or budget tightly: the counter takes no bookings (only a small back dining room does), lines form before opening, it is heavily touristed, the market-priced seafood can climb fast, and you cede all menu choice to the cooks.",
  "person": "Josep 'Pep' Manubens Figueres, chef-owner (per The World's 50 Best Discovery)",
  "signal_chip": {
   "label": "50 Best",
   "full": "Listed on The World's 50 Best Discovery (50 Best's curated directory, not the live annual ranking); the same page claims it once reached No. 31 on the main list — single source, no year given, hedged. Also listed by OAD Guides and reviewed by The Infatuation.",
   "cosign": "The World's 50 Best Restaurants (Discovery)"
  }
 },
 {
  "id": "vn-el-vaso-de-oro",
  "cat": "shop",
  "tier": "plenty",
  "priority": 45,
  "badge": "LOCAL",
  "name": "El Vaso de Oro",
  "short": "El Vaso de Oro",
  "lat": 41.3803,
  "lng": 2.1879,
  "tags": [
   "A 1962 standing cervecería in Barceloneta pouring its own Fort beer; order the solomillo con foie."
  ],
  "productTags": [
   "Tapas"
  ],
  "why": "A 1962 standing cervecería in Barceloneta pouring its own Fort beer; order the solomillo con foie.",
  "address": "Carrer de Balboa, 6, La Barceloneta, 08003 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=El+Vaso+de+Oro+Barcelona",
  "category": "authentique",
  "subcat": "Tapas",
  "money_eats": true,
  "verdict": "Time Out Barcelona gives this 1962 Barceloneta cervecería a full 5/5, and the order the local crowd reaches for is the solomillo con foie, not the tapas.",
  "signature": "Solomillo con foie: seared beef fillet under a slice of hot, melting foie gras",
  "caveat": "Not a sit-down dinner: no reservations, only a few stools, elbow-to-elbow at the bar, and Barceloneta's tourist crowds mean queues. The house Fort beer is, per the venue's own history, brewed at a microbrewery in L'Hospitalet rather than on the premises.",
  "person": "Run today by Gabriel Fort, whose family lends its name to the house Fort beer; the bar opened in 1962 under owners named Gabriel and Glòria, but sources do not confirm the founders' surname.",
  "signal_chip": {
   "label": "Time Out 5/5",
   "full": "Time Out Barcelona — 5/5, 'one of Barceloneta's great classic tapas bars, complete with uniformed waiters' (review by Albert i Dúnia Riera, dated 18 June 2019)",
   "cosign": "Time Out Barcelona"
  }
 },
 {
  "id": "vn-bar-mut",
  "cat": "shop",
  "tier": "plenty",
  "priority": 46,
  "badge": "DRINK",
  "name": "Bar Mut",
  "short": "Bar Mut",
  "lat": 41.3973177,
  "lng": 2.1613001,
  "tags": [
   "Opened June 2005; the name puns on \"vermut\"; 300-plus wines behind a cramped marble standing bar."
  ],
  "productTags": [
   "Wine bar / market tapas"
  ],
  "why": "Opened June 2005; the name puns on \"vermut\"; 300-plus wines behind a cramped marble standing bar.",
  "address": "Carrer de Pau Claris, 192, L'Eixample, 08037 Barcelona, Spain",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Mut+Barcelona",
  "category": "authentique",
  "subcat": "Wine bar / market tapas",
  "money_eats": true,
  "verdict": "More refined and more expensive than Barcelona's standing-bar tapas classics: a wine-first Eixample room open since June 2005 whose 300-plus-bottle list backs a daily chalkboard of market tapas.",
  "signature": "Huevos fritos: runny poached egg, prawn, matchstick fried potato and chorizo sauce on a montadito.",
  "caveat": "Not quick and not budget-friendly; the cramped marble standing bar takes reservations but fills fast, and the bill climbs with every glass.",
  "person": "Kim (also written Quim) Díaz, founder — opened Bar Mut on 30 June 2005 as a vermut bar (the name puns on \"vermut\"); confirmed in a 2025 ARA interview marking the bar's 20th anniversary.",
  "signal_chip": {
   "label": "Infatuation",
   "full": "The Infatuation (Barcelona) carries a full review: a classic, cramped Eixample wine bar priced $$$$ with no numeric score; the write-up warns it is neither quick nor budget-friendly but praises the wine-with-tapas pairing. (No verbatim quote — the original card's quotation was not in the review.)",
   "cosign": "The Infatuation Barcelona"
  }
 },
 {
  "id": "vn-cerveceria-catalana",
  "cat": "shop",
  "tier": "plenty",
  "priority": 47,
  "badge": "LOCAL",
  "name": "Cervecería Catalana",
  "short": "Cervecería Catalana",
  "lat": 41.3924,
  "lng": 2.1608,
  "tags": [
   "Among Barcelona's most-reviewed tapas bars, and the kitchen still holds at tourist volume."
  ],
  "productTags": [
   "Tapas"
  ],
  "why": "Among Barcelona's most-reviewed tapas bars, and the kitchen still holds at tourist volume.",
  "address": "Carrer de Mallorca, 236, L'Eixample (near Rambla de Catalunya), 08008 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=Cervecer%C3%ADa+Catalana+Barcelona",
  "category": "authentique",
  "subcat": "Tapas",
  "money_eats": false,
  "verdict": "A high-turnover Eixample tapas hall whose a-la-plancha classics and montaditos hold up at tourist volume, but it takes no reservations and typically runs 30–60 minute queues — a visitors' room, not where the trade eats.",
  "signature": "Montadito de solomillo con foie — seared beef tenderloin and warm foie gras on toasted bread.",
  "caveat": "Not a local secret but a tourist-facing, no-reservations hall where 30–60 minute street queues are routine; the cooking holds at volume, but the room is for visitors, not the trade. Owned by Grupo La Flauta (same group as Ciutat Comtal); no single chef or founder name is web-verifiable, so none is claimed. The \"Time Out / The Infatuation featured\" framing did not verify — neither guide's current best-tapas roundup lists it, and no Guía Repsol Solete was found.",
  "signal_chip": {
   "label": "OAD #27 BCN",
   "full": "Ranked by OAD Guides (Opinionated About Dining), a survey of serious diners and chefs: #27 in Barcelona, #423 Casual worldwide, #169 in Spain (page undated; verified July 2026).",
   "cosign": "OAD / Opinionated About Dining, the diner-survey guide founded by Steve Plotnicki"
  }
 },
 {
  "id": "vn-bar-tomas-el-tomas-de-sarria",
  "cat": "shop",
  "tier": "plenty",
  "priority": 48,
  "badge": "LOCAL",
  "name": "Bar Tomás (El Tomás de Sarrià)",
  "short": "Bar Tomás (El Tomás de Sarrià)",
  "lat": 41.3996,
  "lng": 2.1213,
  "tags": [
   "A plain Sarrià bar open since 1929 whose allioli-and-hot-oil bravas Time Out rates among Barcelona's best."
  ],
  "productTags": [
   "Bravas"
  ],
  "why": "A plain Sarrià bar open since 1929 whose allioli-and-hot-oil bravas Time Out rates among Barcelona's best.",
  "address": "Carrer Major de Sarrià 49, 08017 Barcelona (Sarrià-Sant Gervasi)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Tom%C3%A1s+(El+Tom%C3%A1s+de+Sarri%C3%A0)+Barcelona",
  "category": "authentique",
  "subcat": "Bravas",
  "money_eats": true,
  "verdict": "The reason to climb up to Sarrià is the bravas: craggy hand-cut fried potato wedges under a garlic allioli cut with a separate hot oil, not the usual spicy tomato sauce, which Time Out ranks among Barcelona's best.",
  "signature": "Patatas bravas: craggy fried potato wedges under garlicky allioli streaked with chili-hot oil",
  "caveat": "Not a destination for the room: a plain, cramped stand-up bar in uptown Sarrià, all function over ambience; it's closed Sundays (Monday–Saturday only) and you'll likely queue for a plate that now pulls as many tourists as locals.",
  "signal_chip": {
   "label": "Time Out BCN",
   "full": "Time Out Barcelona calls its allioli-led patatas bravas the best in the city, noting the sauce sits closer to a garlicky allioli than the usual spicy brava sauce (verified Jul 2026).",
   "cosign": "Time Out Barcelona"
  }
 },
 {
  "id": "vn-els-quatre-gats",
  "cat": "shop",
  "tier": "plenty",
  "priority": 49,
  "badge": "STORY",
  "name": "Els Quatre Gats",
  "short": "Els Quatre Gats",
  "lat": 41.38634,
  "lng": 2.17319,
  "tags": [
   "Picasso's first solo show hung here (1899-1900); he drew its menu cover, inside Puig i Cadafalch's Casa Martí."
  ],
  "productTags": [
   "Modernista café / Catalan classic"
  ],
  "why": "Picasso's first solo show hung here (1899-1900); he drew its menu cover, inside Puig i Cadafalch's Casa Martí.",
  "address": "Carrer de Montsió, 3 bis, Barri Gòtic, 08002 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=Els+Quatre+Gats+Barcelona",
  "category": "story",
  "subcat": "Modernista café / Catalan classic",
  "money_eats": false,
  "verdict": "A BCIN-listed national-heritage landmark you come for Puig i Cadafalch's modernista room (café opened 1897, building 1895-96) and the Picasso history, not for cooking that ranks among Barcelona's best.",
  "signature": "Canelons 4 Gats: the house meat cannelloni gratinated under béchamel, the kitchen's self-declared specialty.",
  "caveat": "Not where Barcelona's chefs eat: the room outclasses the plate, prices run high, and the crowd skews tourist.",
  "person": "Pablo Picasso — held his first solo exhibition here (the café dates it 1899; the Museu Picasso and many art historians say February 1900) and drew the café's menu cover.",
  "signal_chip": {
   "label": "Gencat BCIN",
   "full": "Casa Martí (Puig i Cadafalch, 1895-96) is listed as a Bé Cultural d'Interès Nacional (BCIN) in the Catalan heritage register.",
   "cosign": "Generalitat de Catalunya — Direcció General del Patrimoni Cultural (BCIN)"
  }
 },
 {
  "id": "vn-bar-marsella",
  "cat": "shop",
  "tier": "plenty",
  "priority": 50,
  "badge": "STORY",
  "name": "Bar Marsella",
  "short": "Bar Marsella",
  "lat": 41.37938,
  "lng": 2.16878,
  "tags": [
   "Reputedly Barcelona's oldest bar (1820); the city bought its building in 2013 to save it."
  ],
  "productTags": [
   "Absinthe bar"
  ],
  "why": "Reputedly Barcelona's oldest bar (1820); the city bought its building in 2013 to save it.",
  "address": "Carrer de Sant Pau, 65, El Raval, 08001 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Marsella+Barcelona",
  "category": "story",
  "subcat": "Absinthe bar",
  "money_eats": false,
  "verdict": "The draw is the reputedly-1820 absinthe bar the city council saved in 2013 by buying its building, not a meal — there is no kitchen, only marble tables and the absinthe ritual.",
  "signature": "Absinthe, sugar cube balanced on a fork, iced water poured till the glass clouds milky",
  "caveat": "Not a restaurant and not for dinner — no food served, cash-leaning, heavily touristed, faded and unrenovated; opens evenings only and is known not to keep its posted hours (sources disagree on the exact open time and which day it closes), so go late and check ahead.",
  "person": "Josep Lamiel, third-generation owner; the Lamiel family has run the bar for over a century (confirmed by Barcelona Metropolitan).",
  "signal_chip": {
   "label": "City-saved",
   "full": "Listed as a city point of interest by Barcelona City Council (meet.barcelona); in 2013 the council used its right of first refusal to buy the whole building (~EUR 1.1M) after 10,000+ signatures, saving the reputedly-1820 absinthe bar from closure.",
   "cosign": "Barcelona City Council (meet.barcelona)"
  }
 },
 {
  "id": "vn-caelum",
  "cat": "shop",
  "tier": "plenty",
  "priority": 51,
  "badge": "MICHELIN",
  "name": "Caelum",
  "short": "Caelum",
  "lat": 41.38298,
  "lng": 2.17369,
  "tags": [
   "Convent-made sweets and hot chocolate in a candlelit basement built over medieval baths."
  ],
  "productTags": [
   "Convent sweets cafe"
  ],
  "why": "Convent-made sweets and hot chocolate in a candlelit basement built over medieval baths.",
  "address": "Carrer de la Palla, 8, Ciutat Vella, 08002 Barcelona, Spain",
  "maps": "https://www.google.com/maps/search/?api=1&query=Caelum+Barcelona",
  "category": "story",
  "subcat": "Convent sweets cafe",
  "money_eats": false,
  "verdict": "Not a restaurant but a cloistered-convent sweets cafe: you eat nun-made marzipan and monastery hot chocolate in a candlelit basement set among the remains of the Gothic Quarter's medieval baths.",
  "signature": "Thick nun-made hot chocolate with convent marzipan and Santa Teresa egg-yolk yemas",
  "caveat": "Not a meal: only convent sweets, chocolate and tea, so don't come for lunch. The candlelit basement has few tables and fills fast, and the stones below are unsettled ground — variously described as a medieval Jewish women's mikveh or older public/Roman baths.",
  "signal_chip": {
   "label": "Time Out",
   "full": "Listed in Time Out Barcelona's El Gotic shopping guide (2017) — an editorial listing, not a starred pick or award.",
   "cosign": "Time Out"
  }
 },
 {
  "id": "vn-london-bar",
  "cat": "shop",
  "tier": "plenty",
  "priority": 52,
  "badge": "STORY",
  "name": "London Bar",
  "short": "London Bar",
  "lat": 41.3783,
  "lng": 2.1722,
  "tags": [
   "A 1910 modernista bar on Barcelona's official Ruta del Modernisme, with a circus trapeze overhead."
  ],
  "productTags": [
   "Modernista cocktail bar"
  ],
  "why": "A 1910 modernista bar on Barcelona's official Ruta del Modernisme, with a circus trapeze overhead.",
  "address": "Carrer Nou de la Rambla, 34, Ciutat Vella (El Raval), 08001 Barcelona",
  "maps": "https://www.google.com/maps/search/?api=1&query=London+Bar+Barcelona",
  "category": "story",
  "subcat": "Modernista cocktail bar",
  "money_eats": false,
  "verdict": "Come for the carved-mirror modernista room and the circus trapeze hung from the ceiling, not for the food — this is a landmark to drink in, not a kitchen.",
  "signature": "A Negroni or Corpse Reviver No. 2 from the house list, drunk under the trapeze.",
  "caveat": "Not a meal and not a hidden local secret: it opens evenings only, from around 19:30, and is closed Tuesdays; there is little real food, and the crowd runs tourist-heavy. It is also a 2018 revival — the bar closed in 2017 and the Raluy circus family reopened it, so it is not an unbroken century under one owner — and while the name says 1909 (when the premises were bought), the doors actually opened on 23 June 1910.",
  "person": "Carlos Raluy, of the historic Raluy circus family (Circ Històric Raluy), who inherited the bar and reopened it in 2018",
  "signal_chip": {
   "label": "Modernisme",
   "full": "Listed on Barcelona's official Ruta del Modernisme (a City Council heritage initiative): a preserved modernista bar with its original carved-mirror cabinet and coloured-marble counter intact; opened 1910.",
   "cosign": "Ruta del Modernisme de Barcelona (official Barcelona City Council route)"
  }
 },
 {
  "id": "vn-pastisseria-escriba-antiga-c",
  "cat": "shop",
  "tier": "plenty",
  "priority": 53,
  "badge": "STORY",
  "name": "Pastisseria Escribà (Antiga Casa Figueras)",
  "short": "Pastisseria Escribà (Antiga Casa Figueras)",
  "lat": 41.3813,
  "lng": 2.1722,
  "tags": [
   "A 1902 Ros i Güell modernista shopfront on La Rambla, run as a patisserie by the Escribà family since 1986."
  ],
  "productTags": [
   "Patisserie"
  ],
  "why": "A 1902 Ros i Güell modernista shopfront on La Rambla, run as a patisserie by the Escribà family since 1986.",
  "address": "La Rambla, 83, Ciutat Vella, 08002 Barcelona, Spain",
  "maps": "https://www.google.com/maps/search/?api=1&query=Pastisseria+Escrib%C3%A0+(Antiga+Casa+Figueras)+Barcelona",
  "category": "story",
  "subcat": "Patisserie",
  "money_eats": false,
  "verdict": "The listed 1902 modernista room, not the pastry, is why you stop — order a cremadet, take in the Ros i Güell mosaics, and expect a counter, not a meal.",
  "signature": "Cremadet — crisp puff pastry filled with lemon-scented crema catalana, caramelized to a brittle top.",
  "caveat": "It sits on the most tourist-trodden stretch of La Rambla, beside La Boqueria, and prices match the postcard. The Escribà \"1906\" is the family's founding elsewhere (their Gran Via shop); they only took over this shopfront in 1986, and the building's own \"1820\" medallion belongs to the earlier Figueras pasta business. It's a pastry counter with a small pavement terrace, not a restaurant — and La Rambla pavement works have caused intermittent closures (it reopened 3 December 2025 but was due to shut again around mid-January 2026), so check before a special trip.",
  "person": "Christian Escribà",
  "signal_chip": {
   "label": "Ruta Modern",
   "full": "On Barcelona's official Ruta del Modernisme and listed by Barcelona City Council (meet.barcelona); the 1902 modernista shopfront directed by Antoni Ros i Güell, with mosaics, stained glass and stucco.",
   "cosign": "Barcelona City Council / Ruta del Modernisme de Barcelona"
  }
 }
];
  const NEIGHBORHOODS = [
 {
  "id": "n-barri-gotic",
  "name": "Barri Gòtic",
  "center": [
   41.3826,
   2.17604
  ],
  "radius": 280,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Barri+Gotic+Barcelona"
 },
 {
  "id": "n-born",
  "name": "El Born / La Ribera",
  "center": [
   41.38463,
   2.18147
  ],
  "radius": 260,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=El+Born+Barcelona"
 },
 {
  "id": "n-raval",
  "name": "El Raval",
  "center": [
   41.38005,
   2.17033
  ],
  "radius": 380,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=El+Raval+Barcelona"
 },
 {
  "id": "n-eixample",
  "name": "L'Eixample (Quadrat d'Or)",
  "center": [
   41.39391,
   2.1637
  ],
  "radius": 600,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Quadrat+d+Or+Eixample"
 },
 {
  "id": "n-gracia",
  "name": "Gràcia",
  "center": [
   41.40175,
   2.1576
  ],
  "radius": 500,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Gracia+Barcelona"
 },
 {
  "id": "n-sant-antoni",
  "name": "Sant Antoni",
  "center": [
   41.37987,
   2.16285
  ],
  "radius": 380,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sant+Antoni+Barcelona"
 },
 {
  "id": "n-poble-sec",
  "name": "Poble Sec",
  "center": [
   41.3751,
   2.1664
  ],
  "radius": 400,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Poble+Sec+Barcelona"
 },
 {
  "id": "n-barceloneta",
  "name": "Barceloneta",
  "center": [
   41.38001,
   2.18937
  ],
  "radius": 380,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Barceloneta+Barcelona"
 },
 {
  "id": "n-poblenou",
  "name": "Poblenou & 22@",
  "center": [
   41.40158,
   2.2006
  ],
  "radius": 700,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Poblenou+Barcelona"
 },
 {
  "id": "n-montjuic",
  "name": "Montjuïc",
  "center": [
   41.36383,
   2.15838
  ],
  "radius": 900,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Montjuic+Barcelona"
 },
 {
  "id": "n-out-of-town",
  "name": "Out of town — Sant Sadurní / Priorat / Sitges",
  "center": [
   41.3,
   1.8
  ],
  "radius": 3000,
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sant+Sadurni+d+Anoia"
 }
];
  const WALKS = [
 {
  "id": "p-walk-gotic-dawn",
  "name": "Gothic Quarter at dawn",
  "start": [
   41.38,
   2.175
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Plaça+Reial+Barcelona"
 },
 {
  "id": "p-walk-modernisme",
  "name": "Passeig de Gràcia Modernisme strip",
  "start": [
   41.39163,
   2.16518
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Passeig+de+Gracia+Casa+Batllo"
 },
 {
  "id": "p-walk-park-guell",
  "name": "Park Güell from the back",
  "start": [
   41.41449,
   2.15268
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Park+Guell+Carrer+del+Carmel"
 },
 {
  "id": "p-walk-tres-tombs",
  "name": "Sant Antoni → Raval → Boqueria",
  "start": [
   41.3795,
   2.16282
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Mercat+de+Sant+Antoni"
 },
 {
  "id": "p-walk-blai-pintxos",
  "name": "Carrer de Blai pintxos crawl",
  "start": [
   41.37454,
   2.16557
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Carrer+de+Blai+Barcelona"
 },
 {
  "id": "p-walk-sant-sadurni",
  "name": "Sant Sadurní d'Anoia Cava day-trip",
  "start": [
   41.425,
   1.787
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sant+Sadurni+d+Anoia+Cava"
 },
 {
  "id": "p-walk-montjuic",
  "name": "Montjuïc heritage loop (MNAC + Miró)",
  "start": [
   41.36869,
   2.15364
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=MNAC+Barcelona"
 }
];
  const WORK_SPOTS = [
 {
  "id": "p-work-jardim-bivar",
  "name": "Plaça Reial terrace",
  "start": [
   41.38033,
   2.17506
  ]
 },
 {
  "id": "p-work-cafe-mauri",
  "name": "Cafè Mauri (Rambla Catalunya 102)",
  "start": [
   41.39555,
   2.16178
  ]
 },
 {
  "id": "p-work-cccb",
  "name": "CCCB courtyard café (Raval)",
  "start": [
   41.38301,
   2.16798
  ]
 },
 {
  "id": "p-work-mnac-terrace",
  "name": "MNAC terrace (Montjuïc)",
  "start": [
   41.36869,
   2.15364
  ]
 },
 {
  "id": "p-work-park-bouzaise",
  "name": "Plaça de la Virreina (Gràcia)",
  "start": [
   41.40451,
   2.1581
  ]
 }
];
  const LANDMARKS = [
 {
  "id": "l-sagrada-familia",
  "name": "Sagrada Família",
  "coords": [
   41.40361,
   2.17436
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Sagrada+Familia"
 },
 {
  "id": "l-park-guell",
  "name": "Park Güell",
  "coords": [
   41.41449,
   2.15268
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Park+Guell"
 },
 {
  "id": "l-casa-batllo",
  "name": "Casa Batlló",
  "coords": [
   41.39163,
   2.16518
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Casa+Batllo"
 },
 {
  "id": "l-pedrera",
  "name": "Casa Milà / La Pedrera",
  "coords": [
   41.39536,
   2.16168
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=La+Pedrera"
 },
 {
  "id": "l-temple-augustus",
  "name": "Temple of Augustus columns",
  "coords": [
   41.38292,
   2.17661
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Temple+of+Augustus+Barcelona"
 },
 {
  "id": "l-catedral",
  "name": "Catedral de Barcelona",
  "coords": [
   41.38379,
   2.17616
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Catedral+de+Barcelona"
 },
 {
  "id": "l-palau-musica",
  "name": "Palau de la Música Catalana",
  "coords": [
   41.38731,
   2.17499
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Palau+de+la+Musica+Catalana"
 },
 {
  "id": "l-boqueria",
  "name": "Mercat de la Boqueria",
  "coords": [
   41.38157,
   2.17158
  ],
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Mercat+de+la+Boqueria"
 }
];
  const PHOTOS = [
 {
  "src": "/terroir/Barcelona-Catalunya/img/cat-1-vermut-hour-as-a-communa.jpg",
  "caption": "Vermut hour as a communal ritual (the Catalan Sunday aperitif, not a staged terrace)",
  "credit": "GinaQA · CC BY-SA 3.0"
 },
 {
  "src": "/terroir/Barcelona-Catalunya/img/cat-2-the-boqueria-counters-fr.jpg",
  "caption": "The Boqueria counters from the inside (greengrocer stalls, not the Rambla entrance)",
  "credit": "Böhringer Friedrich · CC BY-SA 2.5"
 },
 {
  "src": "/terroir/Barcelona-Catalunya/img/cat-3-a-barcelona-tapas-pintxo.jpg",
  "caption": "A Barcelona tapas/pintxos bar spread on the counter",
  "credit": "Elemaki (José Porras) · CC BY 3.0"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS };
})();
