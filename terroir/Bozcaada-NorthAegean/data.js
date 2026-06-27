/* Terroir — Bozcaada (Tenedos) · North Aegean — built from the verified gem-standard brief (2026-06) */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#c4a35a", "market": "#d97706", "shop": "#059669", "wine": "#7c2d12", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar", "wine": "Winery / Cellar", "mainland": "Out of town", "logistics": "Logistics"};
  const PRODUCT_COLORS = {"Seafood": "#3b82f6", "Meze": "#dc2626", "Wine": "#7c2d12", "Rakı": "#1f2937", "Bakery": "#92400e", "Coffee": "#6b4226", "Bar": "#7c3aed", "Mantı": "#a16207", "Market": "#d97706", "Çavuş": "#a16207"};
  const VENUES = [
    {
      "id": "v01-nevreste", "cat": "shop", "tier": "berth_top", "priority": 1, "badge": "Seafood",
      "name": "Nevreste", "short": "Nevreste", "lat": 39.8338, "lng": 26.0715,
      "neighborhood": "Cumhuriyet Mah. — town centre, near the harbour",
      "tags": ["Mid-priced; book ahead in summer", "Dinner in the rose-tree courtyard"],
      "productTags": ["Seafood", "Meze"],
      "why": "The island's seafood table most reviewers rank first; a sit-down meze marathon in a rose-tree courtyard rather than a harbour-stop. Guests return after two years and still call it the island's best.",
      "verdict": "Ranked #1 of 89 Bozcaada restaurants on TripAdvisor (4.5/5) — the island's seafood table to book before any other.",
      "signature": "The Bozcaada Bombası — a stuffed house meze found nowhere else — then grilled sea bass.",
      "person": "Aynur, owner-cook — writes her own recipes and works the room.",
      "signal_chip": {"label": "TripAdvisor #1", "full": "TripAdvisor 2026 — #1 of 89 Bozcaada restaurants, 4.5/5", "cosign": "and the table we'd book before any other on the island"},
      "caveat": "Tables fill in summer; reserve a day or two ahead for the courtyard. A meze marathon, not a harbour-stop."
    },
    {
      "id": "v02-corvus", "cat": "wine", "tier": "berth_top", "priority": 2, "badge": "Wine",
      "name": "Corvus Vineyards", "short": "Corvus", "lat": 39.8420, "lng": 26.0600,
      "neighborhood": "Alaybey — outside town, by the vines",
      "tags": ["Cellar door — limited visiting days, check first", "Çavuş white · Corpus red"],
      "productTags": ["Wine", "Çavuş"],
      "why": "The winery that put Bozcaada back on the world wine map in 2002 and remains its most decorated; the bottle that argues the island's own grapes can carry a serious wine.",
      "verdict": "Not the island's oldest cellar — the one that put Bozcaada on the world wine map, and still its most decorated.",
      "signature": "A flight of the indigenous Çavuş white and the Corpus red blend at the Wine & Bite shop.",
      "person": "Reşit Söley — architect-turned-vintner; founded Corvus in 2002 and now makes 20-plus wines.",
      "signal_chip": {"label": "Jancis 17/20", "full": "Jancis Robinson scored Corvus Corpus 2004 at 17/20 — the highest Turkish score in her tasting", "cosign": "the bottle that proves the native grapes don't need Cabernet propping them up"},
      "caveat": "The estate opens to visitors only on limited days — check first. The Istanbul Wine & Bite bar has closed; taste here, not there."
    },
    {
      "id": "v03-cicek-pastanesi", "cat": "shop", "tier": "berth_top", "priority": 3, "badge": "Bakery",
      "name": "Çiçek Pastanesi Tahir Usta", "short": "Çiçek Pastanesi", "lat": 39.8332, "lng": 26.0705,
      "neighborhood": "Çınar Çarşı — the square by Alaybey Mosque",
      "tags": ["Counter, not a sit-down dinner", "Seasonal island flavours"],
      "productTags": ["Bakery", "Çavuş"],
      "why": "The island's sweet memory — additive-free dondurma from Bozcaada milk the supermarket freezer cannot fake; baking since 1959.",
      "verdict": "The island's sweet memory — additive-free ice cream from Bozcaada milk the supermarket freezer cannot fake; baking since 1959.",
      "signature": "Young-fig and mastic ice cream from island milk; damla sakızlı mastic-almond cookies.",
      "person": "Run by Tahir Usta's children, the Günday family; the mastic-almond cookie traces to the island's Greek neighbours.",
      "signal_chip": {"label": "Katie Parla", "full": "Praised by food writer Katie Parla — 'still going strong'", "cosign": "the young-fig, lavender and almond ice cream is the one to chase"},
      "caveat": "A pastane and ice-cream counter, not a sit-down dinner spot. The best flavours are seasonal — figs and mulberries when the island's fruit comes in."
    },
    {
      "id": "v04-asmali-meyhane", "cat": "shop", "tier": "several", "badge": "Meyhane",
      "name": "Asmalı Meyhane", "short": "Asmalı Meyhane", "lat": 39.8328, "lng": 26.0688,
      "neighborhood": "Rum (Greek) quarter",
      "tags": ["Meze + rakı under the vine canopy", "Founded 1950"],
      "productTags": ["Seafood", "Rakı", "Meze"],
      "why": "The canonical room for grilled island kalamar and raw fish with basil, eaten under the vine canopy that names the meyhane; founded 1950 by Niko Manalodis and his brothers.",
      "verdict": "The island's table at its most honest — squid and fish straight from the strait, cooked plain, before the fried-and-sauced versions the mainland prefers.",
      "signature": "Grilled island kalamar and raw fish with torn basil, rakı poured under the vine.",
      "person": "Founded 1950 by Niko Manalodis and his brothers.",
      "caveat": "A meze-and-rakı meyhane in the old Greek quarter — come for the room and the grill, not a sea view."
    },
    {
      "id": "v05-dort-hanimeli", "cat": "shop", "tier": "several", "badge": "Mantı",
      "name": "Dört Hanımeli", "short": "Dört Hanımeli", "lat": 39.8330, "lng": 26.0697,
      "neighborhood": "Bozcaada town — the Rum quarter",
      "tags": ["Home cooking, no sea view", "The island mantı standard"],
      "productTags": ["Mantı", "Meze"],
      "why": "The island's mantı standard against which the other ev yemeği kitchens are measured — not the harbour-front fish places tourists default to.",
      "verdict": "The island's mantı standard — measured against, not the harbour-front fish places tourists default to.",
      "signature": "Ada mantısı — tiny hand-pinched dumplings fried, then drowned in garlic yoghurt and chilli butter.",
      "person": "Founded by retired primary-school teachers; the mother still cooks while an engineer son runs the room.",
      "caveat": "Home cooking, no seafront view; the vegetarian mantı is the draw, so meat-and-fish hunters should look elsewhere."
    },
    {
      "id": "v06-amadeus", "cat": "wine", "tier": "several", "badge": "Wine",
      "name": "Amadeus Winery & Mozart Wine Bar", "short": "Amadeus", "lat": 39.8220, "lng": 26.0520,
      "neighborhood": "Outside town, by the vineyards",
      "tags": ["Cellar door — bring your own transport", "Grillo white · cellar Cabernet"],
      "productTags": ["Wine", "Bar"],
      "why": "The convivial cellar door where the winemaker pours for you himself — not the famous name on the island, but the warm one.",
      "verdict": "Not the famous name on the island — the convivial cellar door where the winemaker pours for you himself.",
      "signature": "The Grillo white, paired with the island's vegetable and fish mezes.",
      "person": "Oliver Gareis — island-born Austrian; settled in the late 1990s and named the label for Mozart (founded 2010).",
      "signal_chip": {"label": "Katie Parla", "full": "Katie Parla recommends the Grillo as a meze pairing; Lonely Planet lists the vineyard", "cosign": "a convivial, engaging host worth the drive out"},
      "caveat": "A small family operation outside town — taste and buy at the cellar door or the Mozart bar; you'll want your own transport."
    },
    {
      "id": "v07-wednesday-market", "cat": "market", "tier": "several", "badge": "Market",
      "name": "Bozcaada Wednesday Producers' Market", "short": "Wednesday Market", "lat": 39.8352, "lng": 26.0762,
      "neighborhood": "Kale Meydanı — the castle square",
      "tags": ["Wednesdays only", "Bring cash"],
      "productTags": ["Market"],
      "why": "Where the island's cheese and tomato jam are actually made — a producers' market in front of the castle, not the supermarket.",
      "verdict": "Skip the island supermarket — the Wednesday stall in the castle square is where the cheese and tomato jam are actually made.",
      "signature": "Local goat cheese and Ezine cheese, plus the island's signature tomato jam (domates reçeli).",
      "caveat": "Wednesdays only, in the castle square — a producers' market, not a daily one. Bring cash."
    },
    {
      "id": "v08-talay", "cat": "wine", "tier": "several", "badge": "Wine",
      "name": "Talay Şarapçılık", "short": "Talay", "lat": 39.8336, "lng": 26.0708,
      "neighborhood": "Alaybey — Çınar Çeşme Sok., town-centre shop",
      "tags": ["Tasting counter, not a cellar tour", "Vasilaki · Karalahna · Kuntra"],
      "productTags": ["Wine", "Çavuş"],
      "why": "The island's oldest continuously family-run winery, pouring its own bottles at a town shop — not a tasting-room built for visitors.",
      "verdict": "The island's oldest family winery, pouring its own bottles at a town shop — not a tasting room built for visitors.",
      "signature": "A glass of crisp Çavuş white at the Meydan shop.",
      "person": "Founded 1948 by the Talay brothers — Necati, Hayati and Sebati; still a family firm.",
      "caveat": "A wine producer and sales shop, not a restaurant; the tasting counter, not the cellar, is what you walk into."
    },
    {
      "id": "v09-kahverengi", "cat": "shop", "tier": "plenty", "badge": "Coffee",
      "name": "Kahverengi Roastery", "short": "Kahverengi", "lat": 39.8325, "lng": 26.0682,
      "neighborhood": "Rum quarter — Sakarya Sok.",
      "tags": ["Hand-brew, no machine", "Busiest April–October"],
      "productTags": ["Coffee"],
      "why": "An island-born specialty roaster that later opened in Nişantaşı — not an Istanbul brand parachuted in for the season.",
      "verdict": "An island-born specialty roaster that later opened in Istanbul — not a city brand parachuted in for the season.",
      "signature": "Hand-brewed filter coffee, no machine — beans the owners roast themselves.",
      "caveat": "A coffee-and-pastry stop about a kilometre off the main square; no full menu, busiest April–October."
    },
    {
      "id": "v10-bakkal-bar", "cat": "shop", "tier": "plenty", "badge": "Bar",
      "name": "Bakkal Cocktail & Juice Bar", "short": "Bakkal", "lat": 39.8329, "lng": 26.0686,
      "neighborhood": "Rum quarter — Lale Sok., opposite the museum",
      "tags": ["Seasonal Apr–Oct, 11:00–03:00", "Quiet by day, loud by 2am"],
      "productTags": ["Bar"],
      "why": "The cobblestone-lane drink locals point to before the louder seafront bars — quiet by day, a small dancefloor by 2am.",
      "verdict": "The cobblestone-lane bar locals name before the louder seafront ones — quiet by day, a small dancefloor by 2am.",
      "signature": "Fresh-fruit cocktails from regional produce; ask for the Magnolia.",
      "caveat": "Seasonal, roughly April–October; turns club-loud late, so not for a quiet nightcap."
    },
    {
      "id": "v11-adam", "cat": "shop", "tier": "plenty", "badge": "Meze",
      "name": "Ada'm", "short": "Ada'm", "lat": 39.8331, "lng": 26.0692,
      "neighborhood": "Rum quarter — Meyhaneler Sok.",
      "tags": ["Affordable by island standards", "Book in high season"],
      "productTags": ["Meze", "Seafood"],
      "why": "The casual meze table where the cook improvises rather than the polished sunset terraces — affordable by island standards.",
      "verdict": "The casual meze table where the cook improvises — not the polished sunset terraces, and cheaper for it.",
      "signature": "Balık tantuni — flaked fish folded hot into flatbread, with garlic potatoes.",
      "caveat": "A tight, unfussy room with mixed reviews on ambience; book in high season and come for the food, not the décor."
    },
    {
      "id": "v12-sandal", "cat": "shop", "tier": "plenty", "badge": "Meyhane",
      "name": "Sandal Restaurant", "short": "Sandal", "lat": 39.8327, "lng": 26.0690,
      "neighborhood": "Rum Mah. (Greek quarter) — Alsancak Sok.",
      "tags": ["Noon–2am, pedestrian lane", "50-plus mezes"],
      "productTags": ["Meze", "Seafood"],
      "why": "A meyhane built inside Apostol Kalfa's hundred-year coffeehouse, where the island's old marketplace stood.",
      "verdict": "Eat where the island's old marketplace stood — a meyhane inside a hundred-year-old coffeehouse.",
      "signature": "Grilled squid and herbed shrimp; sandal borani among fifty-plus mezes.",
      "person": "Ahmet Bölük runs the house.",
      "caveat": "Open noon to 2am, but on a pedestrian lane, not a waterfront terrace — come for the room and the meze."
    }
  ];
  const NEIGHBORHOODS = [
    {"id": "n-rum-quarter", "name": "Rum (Greek) quarter", "center": [39.8330, 26.0690], "radius": 180, "maps_url": "https://www.google.com/maps/search/?api=1&query=Bozcaada+Rum+Mahallesi"},
    {"id": "n-town-harbour", "name": "Town centre & harbour", "center": [39.8340, 26.0715], "radius": 200, "maps_url": "https://www.google.com/maps/search/?api=1&query=Bozcaada+harbour"},
    {"id": "n-alaybey", "name": "Alaybey quarter", "center": [39.8336, 26.0705], "radius": 160, "maps_url": "https://www.google.com/maps/search/?api=1&query=Bozcaada+Alaybey"}
  ];
  const WALKS = [
    {"id": "w-ayazma-vines", "name": "Castle to Ayazma — through the vineyards", "start": [39.8355, 26.0762], "maps_url": "https://www.google.com/maps/search/?api=1&query=Ayazma+Beach+Bozcaada"}
  ];
  const WORK_SPOTS = [
    {"id": "p-work-kahverengi", "name": "Kahverengi Roastery", "start": [39.8325, 26.0682]}
  ];
  const LANDMARKS = [
    {"id": "l-bozcaada-castle", "name": "Bozcaada Castle (Kale)", "coords": [39.8355, 26.0762], "maps_url": "https://www.google.com/maps/search/?api=1&query=Bozcaada+Castle"},
    {"id": "l-ayazma-beach", "name": "Ayazma Beach", "coords": [39.8080, 26.0430], "maps_url": "https://www.google.com/maps/search/?api=1&query=Ayazma+Beach+Bozcaada"}
  ];
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
