/* Terroir — Barcelona — gem-standard rebuild (2026-06-27) */
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
  "sectionRank": 1
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
  "sectionRank": 1
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
  "sectionRank": 2
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
  "sectionRank": 1
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
  "sectionRank": 2
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
  "sectionRank": 2
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
  "sectionRank": 4
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
  "sectionRank": 2
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
  "sectionRank": 3
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
  "sectionRank": 3
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
  "sectionRank": 4
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
  "sectionRank": 4
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
  "sectionRank": 4
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
  "sectionRank": 5
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
  "sectionRank": 2
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
  "sectionRank": 6
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
  "sectionRank": 6
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
  "sectionRank": 7
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
  "src": "/terroir/Barcelona-Catalunya/img/1-vista.jpg",
  "caption": "The neo-Gothic footbridge spanning Carrer del Bisbe in the Barri Gotic, beside the Palau de la Generalitat.",
  "credit": "Photo: Joe Mabel · CC BY-SA 4.0 · Wikimedia"
 },
 {
  "src": "/terroir/Barcelona-Catalunya/img/2-human-food.jpg",
  "caption": "A fruit stall piled high with produce as shoppers and vendors crowd the aisle at the Mercat de la Boqueria.",
  "credit": "Photo: Benreis · CC BY-SA 3.0 · Wikimedia"
 },
 {
  "src": "/terroir/Barcelona-Catalunya/img/3-texture.jpg",
  "caption": "An elevated view from the Sagrada Familia over the dense rooftops and chamfered street grid of the Eixample.",
  "credit": "Photo: Reda Kerbush · CC BY-SA 4.0 · Wikimedia"
 }
];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS };
})();
