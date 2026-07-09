/* Terroir — Trieste · Gulf of Trieste — hand-built field guide */
window.TERROIR_DATA = (function () {
  var COLORS = {
    "berth": "#c4a35a",
    "shop": "#7a3530",
    "bar": "#a86a2f",
    "cafe": "#8a7350",
    "market": "#2a6a6a",
    "mainland": "#5a3a6a",
    "logistics": "#2d4a5e"
  };

  var CAT_LABELS = {
    "berth": "Signature",
    "shop": "Restaurant / Buffet",
    "bar": "Wine Bar / Enoteca",
    "cafe": "Caffè Storico",
    "market": "Market / Producer",
    "mainland": "Out of town (Carso)",
    "logistics": "Logistics"
  };

  var PRODUCT_COLORS = {
    "Michelin": "#7f1d1d",
    "Buffet": "#92400e",
    "Seafood": "#1e40af",
    "Wine": "#6b2f2f",
    "Vitovska": "#374151",
    "Terrano": "#7f1d1d",
    "Caffè": "#78350f",
    "Osmiza": "#2d4a5e",
    "Adriatic": "#1e3a5f"
  };

  var VENUES = [
    {
      id: "v01-harrys-piccolo",
      cat: "shop",
      tier: "berth_top",
      priority: 1,
      badge: "Michelin",
      name: "Harry's Piccolo",
      short: "Harry's Piccolo",
      lat: 45.6486,
      lng: 13.7718,
      neighborhood: "Borgo Teresiano · Via dei Giuliani",
      tags: [
        "EUR 130–160 pp tasting menu",
        "Book 2–4 weeks ahead; tasting menu for the full table",
        "Dinner Tue–Sat; lunch Fri–Sat"
      ],
      productTags: ["Michelin", "Seafood", "Gulf scampi"],
      why: "Two Michelin stars (first 2016, second 2018); chefs Matteo Metullio and Davide De Pra — the only two-star restaurant in Trieste. The kitchen treats Gulf of Trieste scampi as the instrument — risotto with live scampi and summer truffle is the house anchor, dense and marine, the starch barely there. The tasting menus run 8–12 courses; the cellar is deep in Collio and Carso whites. Caveat: the prix-fixe format and white tablecloth feel at odds with the city's anti-pretension culture; choose a weeknight table to read the kitchen at its steadiest.",
      address: "Via dei Giuliani 2, 34124 Trieste",
      phone: "+39 040 660 606",
      hours: "Dinner Tue–Sat; lunch Fri–Sat",
      maps: "https://www.google.com/maps/search/?api=1&query=Harry%27s+Piccolo+Trieste",
      verdict: "The Gulf of Trieste on a plate — the only two-star room in the city, chefs Metullio and De Pra cooking live scampi at their most precise.",
      signature: "risotto with Gulf scampi, warm truffle shavings, barely-there broth clinging to grain",
      person: "Matteo Metullio and Davide De Pra",
      signal_chip: "★★ Michelin 2018",
      cosign: "Michelin Guide Italia 2024–25",
      caveat: "Prix-fixe only; the wine list markup is steep."
    },
    {
      id: "v02-al-bagatto",
      cat: "shop",
      tier: "berth_top",
      priority: 2,
      badge: "Seafood",
      name: "Al Bagatto",
      short: "Al Bagatto",
      lat: 45.6497,
      lng: 13.7745,
      neighborhood: "Città Vecchia · Via Cadorna",
      tags: [
        "EUR 40–65 pp",
        "Book 3–5 days ahead; under 30 covers",
        "Lunch & dinner; closed Mon"
      ],
      productTags: ["Seafood", "Adriatic"],
      why: "Open since 1966; chef Roberto Marussi cooks the northern Adriatic straight — no molecular intervention, no modernist garnish. Michelin Bib Gourmand. The room seats under 30; the menu reads the season. Signature: spaghetti alle vongole with Istrian olive oil, the clam brine salting the pasta without further intervention. Walk-ins almost never work. Caveat: the room is very small; with a full house the acoustics are uncomfortable.",
      address: "Via Luigi Cadorna 7, 34122 Trieste",
      phone: "+39 040 301 771",
      hours: "Lunch & dinner; closed Mon",
      maps: "https://www.google.com/maps/search/?api=1&query=Al+Bagatto+Trieste",
      verdict: "Chef Roberto Marussi has cooked the Adriatic in this 30-seat room since 1966 — Bib Gourmand, no theatre, all precision.",
      signature: "spaghetti alle vongole, Istrian oil pooling in the shell broth, sea salt at the finish",
      person: "Roberto Marussi",
      signal_chip: "Bib Gourmand Michelin",
      cosign: "Michelin Guide Italia",
      caveat: "Under 30 covers; walk-ins almost never work."
    },
    {
      id: "v03-nerodiseppia",
      cat: "shop",
      tier: "berth_top",
      priority: 3,
      badge: "Triestine",
      name: "Trattoria Nerodiseppia",
      short: "Nerodiseppia",
      lat: 45.6495,
      lng: 13.7740,
      neighborhood: "Città Vecchia · Via Cadorna",
      tags: [
        "EUR 28–42 pp",
        "Reservation advised at dinner",
        "Lunch & dinner; closed Sun"
      ],
      productTags: ["Seafood", "Adriatic"],
      why: "The cuttlefish-ink specialist of the Città Vecchia, Via Luigi Cadorna 23. Nero di seppia tagliolini braised with slow-cooked cuttlefish and toasted pine nuts: the single dish that defined this trattoria and still does. Honest, unfussy, repetitively good. The jota and grilled fish round the menu. Caveat: the wine list is short and Friulian-only; bring your own if you want Carso.",
      address: "Via Luigi Cadorna 23, 34122 Trieste",
      phone: "+39 040 301 377",
      hours: "Lunch & dinner; closed Sun",
      maps: "https://www.google.com/maps/search/?api=1&query=Trattoria+Nerodiseppia+Trieste",
      verdict: "The cuttlefish ink trattoria: the same black tagliolini, the same pine nuts, the same honest broth — reliably right.",
      signature: "nero di seppia tagliolini, cuttlefish slow-braised until tender, pine nuts and flat parsley",
      person: "Family owners since the 1990s",
      signal_chip: "Gambero Rosso — Trieste chapter",
      cosign: "TripAdvisor Certificate of Excellence 2022–24",
      caveat: "Wine list short and Friulian only."
    },
    {
      id: "v04-buffet-pepi",
      cat: "shop",
      tier: "several",
      priority: 4,
      badge: "1897",
      name: "Buffet da Pepi",
      short: "Buffet da Pepi",
      lat: 45.6516,
      lng: 13.7758,
      neighborhood: "Città Vecchia · near Piazza della Borsa",
      tags: [
        "EUR 10–16 pp bollito plate",
        "Counter service; no booking",
        "Mon–Sat 8am–3pm; closed Sun"
      ],
      productTags: ["Buffet"],
      why: "Founded 1897 by Pepi Klajnsic (known as 'Pepi S'ciavo'); current owner Paolo Polla since 2010. Via della Cassa di Risparmio 3. The oldest buffet in Trieste and the reference for bollito misto: pork cheek, tongue, cotechino and lesso sliced to order at the bar, kren (horseradish) grated live, capuzi (sauerkraut) cold alongside. The rebechin — thick bread, a slab of boiled pork, mustard, eaten standing — is the Triestine fast-food. Caveat: closes at 3pm; evening not possible.",
      address: "Via della Cassa di Risparmio 3, 34121 Trieste",
      phone: "+39 040 366 858",
      hours: "Mon–Sat 8am–3pm",
      maps: "https://www.google.com/maps/search/?api=1&query=Buffet+da+Pepi+Trieste",
      verdict: "Founded 1897 by Pepi Klajnsic — the oldest buffet in the city and the definition of bollito misto con kren.",
      signature: "pork cheek and cotechino sliced at the bar, kren grated live, capuzi cold and sharp alongside",
      person: "Paolo Polla (owner 2010–)",
      signal_chip: "Est. 1897 — oldest buffet Trieste",
      cosign: "Slow Food Osterie d'Italia",
      caveat: "Closes 3pm; no dinner."
    },
    {
      id: "v05-buffet-gildo",
      cat: "shop",
      tier: "several",
      priority: 5,
      badge: "1964",
      name: "Buffet da Gildo",
      short: "Buffet da Gildo",
      lat: 45.6499,
      lng: 13.7746,
      neighborhood: "Borgo Teresiano · Via Valdirivo",
      tags: [
        "EUR 10–16 pp",
        "Counter service; no booking",
        "Mon–Sat 8am–4pm"
      ],
      productTags: ["Buffet"],
      why: "Founded 1964 by Ermenegildo (Gildo) Valenta; current owners Federica Torresin and Krys Wojnar since 2007. Via Valdirivo 20. The neighbourhood buffet for office workers in Borgo Teresiano: bollito plate with mustard-dressed lesso and kren, glass of Terrano at midday. No theatre, no menu, three tables. Caveat: cash only; closes at 4pm.",
      address: "Via Valdirivo 20, 34122 Trieste",
      phone: "+39 040 303 310",
      hours: "Mon–Sat 8am–4pm",
      maps: "https://www.google.com/maps/search/?api=1&query=Buffet+da+Gildo+Trieste",
      verdict: "The neighbourhood buffet since 1964 — bollito with mustard and a glass of Terrano at noon, as it has always been.",
      signature: "lesso di maiale, senapa and kren on the same plate, Terrano poured without ceremony into a tumbler",
      person: "Federica Torresin and Krys Wojnar (owners 2007–)",
      signal_chip: "Est. 1964",
      cosign: "Gambero Rosso locals' pick",
      caveat: "Cash only; closes 4pm."
    },
    {
      id: "v06-trattoria-ai-fiori",
      cat: "shop",
      tier: "several",
      priority: 6,
      badge: "Triestine",
      name: "Trattoria Ai Fiori",
      short: "Ai Fiori",
      lat: 45.6531,
      lng: 13.7769,
      neighborhood: "Città Vecchia · Piazza Attilio Hortis",
      tags: [
        "EUR 22–35 pp",
        "Book for dinner",
        "Tue–Sun lunch & dinner; closed Mon"
      ],
      productTags: ["Seafood", "Adriatic"],
      why: "Piazza Attilio Hortis 7, run by Maria and Alberto. The kitchen for jota — the Triestine bean-and-sauerkraut soup simmered all morning until the broth turns silky — and for John Dory grilled over wood. Seasonal, unhurried, the real trattoria register of the city. Caveat: last order 9:30pm by Italian standards very early; closed Monday.",
      address: "Piazza Attilio Hortis 7, 34121 Trieste",
      phone: "+39 040 300 633",
      hours: "Tue–Sun lunch & dinner",
      maps: "https://www.google.com/maps/search/?api=1&query=Trattoria+Ai+Fiori+Trieste",
      verdict: "Maria and Alberto's trattoria for jota — Trieste's bean-and-sauerkraut soup, simmered all morning, thick as memory.",
      signature: "jota, sauerkraut and borlotti simmered until the broth silks, smoked pork rib in the pot",
      person: "Maria and Alberto",
      signal_chip: "Gambero Rosso 2 Forchette",
      cosign: "Slow Food Osterie d'Italia 2024",
      caveat: "Last order 9:30pm; closed Sunday evenings."
    },
    {
      id: "v07-caffe-san-marco",
      cat: "cafe",
      tier: "several",
      priority: 7,
      badge: "1914",
      name: "Caffè San Marco",
      short: "Caffè San Marco",
      lat: 45.6519,
      lng: 13.7749,
      neighborhood: "Borgo Teresiano · Via Cesare Battisti",
      tags: [
        "Coffee EUR 1.20–2.50; lunch plates EUR 10–18",
        "Morning peak 7–9am; quieter after 2pm",
        "Mon–Sat 7am–10pm, Sun 8am–10pm"
      ],
      productTags: ["Caffè"],
      why: "Via Cesare Battisti 18, founded 1914. Current managers Alexandros Delithanassis and Eugenia Fenzi. The city's literary grand caffè: Scipio Slataper, Umberto Saba and Italo Svevo wrote here; the newspaper poles, pressed-tin ceiling and Viennese counter remain unchanged. Order a capo in B (macchiato in a glass — the standard Triestine mid-morning) and understand the vocabulary before you try the others. Caveat: tourist-facing before 11am; the regulars come after lunch.",
      address: "Via Cesare Battisti 18, 34122 Trieste",
      phone: "+39 040 371 373",
      hours: "Mon–Sat 7am–10pm, Sun 8am–10pm",
      maps: "https://www.google.com/maps/search/?api=1&query=Caff%C3%A8+San+Marco+Trieste",
      verdict: "Founded 1914, Trieste's literary grand caffè — Saba and Svevo regulars, newspaper poles still in the stand, the coffee vocabulary still the city's own.",
      signature: "capo in B (macchiato in a glass), bitter Triestine roast, foam pressed flat, drunk standing",
      person: "Alexandros Delithanassis and Eugenia Fenzi (managers)",
      signal_chip: "Patrimonio Culturale — Locali Storici d'Italia",
      cosign: "Gambero Rosso — Luoghi dell'anima 2024",
      caveat: "Tourist-heavy before 11am; regulars come after 2pm."
    },
    {
      id: "v08-caffe-degli-specchi",
      cat: "cafe",
      tier: "several",
      priority: 8,
      badge: "1839",
      name: "Caffè degli Specchi",
      short: "Caffè degli Specchi",
      lat: 45.6476,
      lng: 13.7697,
      neighborhood: "Piazza Unità d'Italia · waterfront",
      tags: [
        "Coffee EUR 1.50–3.00; aperitivo EUR 6–9",
        "Open all day; aperitivo hour 6–8pm",
        "Daily 7am–midnight"
      ],
      productTags: ["Caffè"],
      why: "Piazza Unità d'Italia 7, founded 1839 by Niccolò Stratti. The Habsburg empire's window on the Adriatic: a glittering mirror-hall on the largest sea-facing piazza in Italy. Allied Forces HQ 1945–54 (plaque still on the façade). Order the spritz at aperitivo, watch the square fill. Caveat: the kitchen is indifferent — this is a coffee and aperitivo institution, not a restaurant.",
      address: "Piazza Unità d'Italia 7, 34121 Trieste",
      phone: "+39 040 365 777",
      hours: "Daily 7am–midnight",
      maps: "https://www.google.com/maps/search/?api=1&query=Caff%C3%A8+degli+Specchi+Trieste",
      verdict: "The Habsburg mirror-hall on Piazza Unità, founded 1839 — the aperitivo on the greatest sea-facing piazza in Italy.",
      signature: "spritz con Aperol, Prosecco, one olive on the rim, Gulf of Trieste in the eye",
      person: "Niccolò Stratti, founded 1839",
      signal_chip: "Storico Locale — Città di Trieste",
      cosign: "Gambero Rosso Caffè Storici d'Italia",
      caveat: "Kitchen is hotel-bar standard — come for the coffee and the aperitivo, not the food."
    },
    {
      id: "v09-buffet-clai",
      cat: "shop",
      tier: "plenty",
      priority: 9,
      badge: "Clai",
      name: "Buffet Clai",
      short: "Buffet Clai",
      lat: 45.6507,
      lng: 13.7748,
      neighborhood: "Borgo Teresiano · Via Ugo Foscolo",
      tags: [
        "EUR 9–15 pp",
        "Counter service; lunch only",
        "Mon–Fri 9am–3pm"
      ],
      productTags: ["Buffet"],
      why: "Via Ugo Foscolo 4; owner Massimiliano Clai for over 30 years. The working-professional lunch: bollito, capuzi, kren, the glass of Refosco. Sparse and clean, three tables, always full by 12:30. Caveat: lunch only, Monday to Friday — effectively inaccessible to weekend visitors.",
      address: "Via Ugo Foscolo 4, 34122 Trieste",
      phone: "+39 040 300 720",
      hours: "Mon–Fri 9am–3pm",
      maps: "https://www.google.com/maps/search/?api=1&query=Buffet+Clai+Trieste",
      verdict: "Massimiliano Clai's clean lunch counter: 30 years of bollito, no theatre, closes at three.",
      signature: "bollito misto, kren freshly grated, capuzi cold and sharp, glass of Refosco dal Peduncolo",
      person: "Massimiliano Clai (30+ years)",
      signal_chip: "30 anni di bollito triestino",
      cosign: "Gambero Rosso locals' pick",
      caveat: "Lunch only; Mon–Fri — no weekend service."
    },
    {
      id: "v10-enoteca-nanut",
      cat: "bar",
      tier: "plenty",
      priority: 10,
      badge: "Wine",
      name: "Enoteca Nanut",
      short: "Enoteca Nanut",
      lat: 45.6513,
      lng: 13.7753,
      neighborhood: "Borgo Teresiano",
      tags: [
        "Carso DOC & Collio focus; by-the-glass from EUR 4",
        "Bottle prices EUR 12–40",
        "Tue–Sat 10am–8pm"
      ],
      productTags: ["Wine", "Vitovska"],
      why: "One of Trieste's deepest wine selections, focused on Carso DOC and Collio. The place to try Vitovska and Terrano from multiple producers by the glass before deciding what to buy: Zidarich, Skerk, Vodopivec, Kante. The staff can place the bottles geographically and by vintage, which is rare in this city. Caveat: narrow space; can feel rushed in the afternoon rush.",
      address: "Via G.B. Tiepolo 1, 34124 Trieste",
      phone: "+39 040 370 338",
      hours: "Tue–Sat 10am–8pm",
      maps: "https://www.google.com/maps/search/?api=1&query=Enoteca+Nanut+Trieste",
      verdict: "The wine reference of Trieste — Carso DOC, Collio, Vitovska and Terrano by the glass from producers you will not find in restaurants.",
      signature: "Vitovska, mineral and cold as the Carso limestone it grew from, poured without ceremony",
      person: "The Nanut family",
      signal_chip: "FISAR Trieste recommended",
      cosign: "Gambero Rosso Tre Bicchieri producers stocked",
      caveat: "Narrow shop; can feel rushed in the afternoon."
    },
    {
      id: "v11-zidarich",
      cat: "mainland",
      tier: "mainland",
      priority: 11,
      badge: "Carso",
      name: "Zidarich — Winery & Osmiza",
      short: "Zidarich",
      lat: 45.6129,
      lng: 13.8126,
      neighborhood: "Prepotto · Carso plateau",
      tags: [
        "Cellar visits by appointment; osmiza seasonal",
        "Carso DOC: Vitovska, Terrano, Malvasia Istriana",
        "45 min from Trieste centre; car required"
      ],
      productTags: ["Vitovska", "Terrano", "Osmiza"],
      why: "Prepotto 23, Duino-Aurisina. Founded 1988 by Benjamin Zidarich: a 5-level cellar dug 20 metres into the Carso rock entirely by hand (no machinery could fit), holding Vitovska and Terrano aged in stone-hewn tanks. Biodynamic farming. The 2020 Vitovska is a reference natural white; the Terrano carries the iron of the red Carso earth. The osmiza opens seasonally (April–July, September–October) with cold cuts, cheese and the estate wine under linden trees. Caveat: appointment essential for the winery; osmiza dates vary every 8 days by law.",
      address: "Prepotto 23, 34011 Duino-Aurisina (TS)",
      phone: "+39 040 201 223",
      hours: "By appointment; osmiza seasonal (check dates)",
      maps: "https://www.google.com/maps/search/?api=1&query=Zidarich+Winery+Prepotto+Trieste",
      verdict: "Benjamin Zidarich dug a 5-floor cellar 20 metres into Carso rock by hand; the Vitovska grown on limestone above it is the reason to make the drive.",
      signature: "Vitovska aged in stone tank, fennel and white mineral on the palate, the cold of the rock in the bottle",
      person: "Benjamin Zidarich (founder 1988–)",
      signal_chip: "Slow Food Presidio Vitovska",
      cosign: "Gambero Rosso Vini d'Italia Tre Bicchieri",
      caveat: "45 min from town by car; appointment essential for winery visit."
    },
    {
      id: "v12-enoteca-bischoff",
      cat: "bar",
      tier: "plenty",
      priority: 12,
      badge: "Historic",
      name: "Enoteca Bischoff",
      short: "Enoteca Bischoff",
      lat: 45.6509,
      lng: 13.7755,
      neighborhood: "Borgo Teresiano · centre",
      tags: [
        "Wine by glass from EUR 3.50",
        "Aperitivo 6–8pm",
        "Mon–Sat 10am–9pm"
      ],
      productTags: ["Wine"],
      why: "A historic enoteca in central Trieste with a broad Friuli-Venezia Giulia selection and a low-key aperitivo counter. Good for tasting Carso DOC wines alongside salumi from the Carso and Istria before committing to a bottle from Nanut. Caveat: the selection ranges widely in quality and some bottles are below the level of the Carso specialists.",
      address: "Via delle Torri 2, 34122 Trieste",
      phone: "+39 040 303 032",
      hours: "Mon–Sat 10am–9pm",
      maps: "https://www.google.com/maps/search/?api=1&query=Enoteca+Bischoff+Trieste",
      verdict: "Trieste's aperitivo enoteca: Carso wines poured easily, Istrian salumi alongside, nothing is precious.",
      signature: "Malvasia Istriana, slightly oxidative, amber-gold, with prosciutto Karst and a slice of hard sheep cheese",
      person: "The Bischoff family",
      signal_chip: "Storico locale d'Italia",
      cosign: "Gambero Rosso Trieste chapter",
      caveat: "Selection ranges in quality; the Carso specialists stock the best bottles."
    }
  ];

  var NEIGHBORHOODS = [
    {
      id: "n-borgo-teresiano",
      name: "Borgo Teresiano",
      lat: 45.6512, lng: 13.7760,
      label: "The Habsburg Theresian grid — canal, mirror-hall caffè, the chess-board neoclassical streets laid out from 1719"
    },
    {
      id: "n-citta-vecchia",
      name: "Città Vecchia",
      lat: 45.6508, lng: 13.7748,
      label: "Roman Tergeste on the hill — San Giusto Cathedral, the Arco di Riccardo, the oldest streets pressed together"
    },
    {
      id: "n-san-giacomo",
      name: "Rione San Giacomo",
      lat: 45.6550, lng: 13.7810,
      label: "The working rione uphill from the centre — market halls, the real trattoria circuit, away from the tourist riva"
    },
    {
      id: "n-barcola",
      name: "Barcola",
      lat: 45.6720, lng: 13.7560,
      label: "The city beach — concrete platforms, the bora sprint, Sunday swimming; start of the Barcolana race route"
    },
    {
      id: "n-carso",
      name: "Carso Plateau",
      lat: 45.6200, lng: 13.8100,
      label: "The karstic limestone tableland above the city — osmize, Vitovska and Terrano vines, the source of the bora"
    }
  ];

  var WALKS = [
    {
      id: "w-lungomare-rilke",
      name: "Lungomare Rilke",
      lat: 45.6620, lng: 13.7480,
      label: "Cliffside coastal path from Sistiana to Duino Castle — 1.5 km of bora-scoured limestone above the Gulf, named for Rilke who wrote the Duino Elegies here"
    },
    {
      id: "w-miramare",
      name: "Miramare Castle & Park",
      lat: 45.7040, lng: 13.7115,
      label: "Archduke Maximilian's romantic castle (1860) above the sea — English-style park, the Gulf panorama, sea swimming on the rocks below"
    },
    {
      id: "w-san-giusto",
      name: "Colle di San Giusto",
      lat: 45.6494, lng: 13.7718,
      label: "The hill above the city — 5th-century cathedral, Roman forum ruins, the Arco di Riccardo: the walk that ties Trieste to antiquity"
    },
    {
      id: "w-canal-grande",
      name: "Canal Grande & Borgo Teresiano",
      lat: 45.6530, lng: 13.7740,
      label: "The 1756 ship-canal cut into the Theresian grid — Sant'Antonio Nuovo at its head, Saturday market stalls along it, neoclassical palazzi reflected in the water"
    },
    {
      id: "w-carso-osmize",
      name: "Carso & Osmize Trail",
      lat: 45.6250, lng: 13.8050,
      label: "Drive or take bus 42 to the plateau for the osmize circuit — seasonal farm-wine bars open 8 days by law, marked by pine branches; the tourist board posts live dates"
    },
    {
      id: "w-muggia",
      name: "Muggia Ferry",
      lat: 45.6036, lng: 13.7627,
      label: "Ferry from the Riva to the last Venetian town on the Adriatic — Muggia's Gothic-Venetian campanile, the fish restaurant strip, a 20-minute crossing"
    }
  ];

  var WORK_SPOTS = [
    {
      id: "p-wk-san-marco",
      name: "Caffè San Marco",
      lat: 45.6519, lng: 13.7749,
      label: "Via Cesare Battisti 18 — newspaper poles, pressed-tin ceiling, the city's literary tradition; tables held for hours without reprimand"
    },
    {
      id: "p-wk-civica",
      name: "Biblioteca Civica Attilio Hortis",
      lat: 45.6533, lng: 13.7768,
      label: "Piazza Attilio Hortis 4 — the city's main public library with rare book archive; quiet reading rooms, free, open Mon–Sat"
    }
  ];

  var LANDMARKS = [
    {
      id: "l-piazza-unita",
      name: "Piazza Unità d'Italia",
      lat: 45.6476, lng: 13.7697,
      label: "The largest sea-facing piazza in Italy — Habsburg in scale, lined with neoclassical palazzi, open to the Gulf on one side: the city's living room"
    },
    {
      id: "l-miramare",
      name: "Castello di Miramare",
      lat: 45.7040, lng: 13.7115,
      label: "Archduke Maximilian of Mexico's romantic castle (1860) above the sea — the curse: every occupant after him met a violent end (Napoleon III's son, Archduke Franz Ferdinand)"
    },
    {
      id: "l-risiera",
      name: "Risiera di San Sabba",
      lat: 45.6288, lng: 13.7918,
      label: "The only Nazi concentration camp with a permanent crematorium on Italian soil — a national monument since 1965, obligatory and difficult"
    },
    {
      id: "l-san-giusto",
      name: "Cattedrale di San Giusto",
      lat: 45.6494, lng: 13.7717,
      label: "5th-century basilica on the Roman forum hill — twin naves merged in the 14th century, Byzantine mosaic of the city's patron martyr"
    },
    {
      id: "l-arco-riccardo",
      name: "Arco di Riccardo",
      lat: 45.6500, lng: 13.7745,
      label: "A 1st-century BCE Roman arch in the Città Vecchia — the name corrupted from Arco Romano over centuries; the oldest legible structure in Trieste"
    }
  ];

  return {
    VENUES: VENUES,
    COLORS: COLORS,
    CAT_LABELS: CAT_LABELS,
    PRODUCT_COLORS: PRODUCT_COLORS,
    NEIGHBORHOODS: NEIGHBORHOODS,
    WALKS: WALKS,
    WORK_SPOTS: WORK_SPOTS,
    LANDMARKS: LANDMARKS
  };
})();
