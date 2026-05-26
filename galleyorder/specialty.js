/* ============================================================================
   LITTORALICIOUS — Galley Order · Specialty extensions
   Inspired by the deep professional supplier catalogues (Petrossian caviars,
   Sosa modernist range, Ponthier purées, premium Wagyu / Iberico). Curated
   to Littoralicious quality bias — best-in-class brand for each line.
   Loaded AFTER data.js + produce.js.
   ★ trade-grade · ★★ premium / single-origin · ★★★ luxury / hero.
   ============================================================================ */
(function () {
  if (!window.PANTRY_DATA) {
    console.warn("PANTRY_DATA missing — specialty extension cannot load.");
    return;
  }

  // ── 1. CAVIAR & SMOKED FISH (Petrossian-style luxury) ─────────────────
  const caviar = {
    id: "caviar",
    label: "Caviar & Smoked Fish",
    sections: [
      {
        title: "Caviar — sturgeon roe (tin units, 48 h notice)",
        items: [
          { name: "Caviar Beluga Spécial Réserve", brand: "Petrossian · 30 g tin", tier: 3, unit: "tin" },
          { name: "Caviar Beluga Tsar Impérial", brand: "Petrossian · 30 / 50 g tin", tier: 3, unit: "tin" },
          { name: "Caviar Beluga Royal", brand: "Petrossian · 30 / 50 g tin", tier: 3, unit: "tin" },
          { name: "Caviar Ossetra Spécial Réserve", brand: "Petrossian · 30 / 50 g tin", tier: 3, unit: "tin" },
          { name: "Caviar Ossetra Tsar Impérial", brand: "Petrossian · 30 / 50 g tin", tier: 3, unit: "tin" },
          { name: "Caviar Ossetra Royal", brand: "Petrossian · 30 / 50 g tin", tier: 2, unit: "tin" },
          { name: "Caviar Sevruga Tsar Impérial", brand: "Petrossian · 30 / 50 g tin", tier: 3, unit: "tin" },
          { name: "Caviar Sevruga Royal", brand: "Petrossian · 30 / 50 g tin", tier: 2, unit: "tin" },
          { name: "Caviar Alverta Spécial Réserve", brand: "Petrossian · USA Transmontanus farm", tier: 3, unit: "tin" },
          { name: "Caviar Alverta Tsar Impérial", brand: "Petrossian · USA Transmontanus", tier: 3, unit: "tin" },
          { name: "Caviar Alverta Royal", brand: "Petrossian · USA Transmontanus", tier: 2, unit: "tin" },
          { name: "Caviar Baïka Spécial Réserve", brand: "Petrossian · Baerii × Schrenckii", tier: 3, unit: "tin" },
          { name: "Caviar Baïka Tsar Impérial", brand: "Petrossian · hybrid sturgeon", tier: 3, unit: "tin" },
          { name: "Caviar Baïka Royal", brand: "Petrossian", tier: 2, unit: "tin" },
          { name: "Caviar Daurenki Spécial Réserve", brand: "Petrossian · Russian × Schrenckii", tier: 3, unit: "tin" },
          { name: "Caviar Daurenki Tsar Impérial", brand: "Petrossian", tier: 3, unit: "tin" },
          { name: "Caviar Pressé 1835", brand: "Petrossian · pressed caviar", tier: 3, unit: "tin" },
          { name: "Caviar Kaluga Hybrid Reserve", brand: "Kaviari / N25 · 30 / 50 / 100 g", tier: 3, unit: "tin" },
          { name: "Caviar Oscietre Prestige", brand: "Kaviari · 50 / 125 g", tier: 3, unit: "tin" },
          { name: "Caviar Baerii Sélection", brand: "Sturia / Kaviari · everyday luxury", tier: 2, unit: "tin" },
          { name: "Caviar Beluga Almas (white)", brand: "On request · ultra-rare", tier: 3, unit: "tin" },
        ],
      },
      {
        title: "Other premium roes",
        items: [
          { name: "Salmon roe (ikura) — wild Alaska", brand: "Olsen-Fish or equivalent · large pearl", tier: 2, unit: "g" },
          { name: "Trout roe — orange pearl", brand: "Fresh frozen 100 g jar", tier: 2, unit: "jar" },
          { name: "Bottarga di muggine (grey mullet)", brand: "Sardinian · whole lobe", tier: 3, unit: "pcs" },
          { name: "Bottarga di tonno", brand: "Sicilian tuna · whole lobe", tier: 3, unit: "pcs" },
          { name: "Tobiko orange", brand: "Frozen 500 g · Japanese", tier: 2, unit: "g" },
          { name: "Tobiko wasabi (green)", brand: "Frozen 500 g · Japanese", tier: 2, unit: "g" },
          { name: "Tobiko yuzu", brand: "Frozen 500 g · Japanese", tier: 2, unit: "g" },
          { name: "Masago", brand: "Capelin roe · frozen 500 g", tier: 1, unit: "g" },
          { name: "Sea urchin / uni — bafun (gold)", brand: "Hokkaido · 100 g wooden tray", tier: 3, unit: "tray" },
          { name: "Sea urchin / uni — murasaki (purple)", brand: "Hokkaido · 100 g tray", tier: 3, unit: "tray" },
        ],
      },
      {
        title: "Smoked salmon (whole / pre-sliced)",
        items: [
          { name: "Whole smoked Norwegian salmon", brand: "Cold-smoked · 1–1.4 kg side", tier: 2, unit: "side" },
          { name: "Whole smoked Norwegian salmon — dill marinated", brand: "Cold-smoked · 1–1.4 kg side", tier: 2, unit: "side" },
          { name: "Whole smoked Scottish salmon", brand: "Loch Fyne / Forman & Field", tier: 3, unit: "side" },
          { name: "Whole wild smoked Baltic salmon", brand: "Wild · seasonal", tier: 3, unit: "side" },
          { name: "Whole smoked Scottish organic salmon", brand: "RSPCA Assured · 1 kg+ side", tier: 3, unit: "side" },
          { name: "Pre-sliced smoked Norwegian salmon", brand: "Vacuum tray · 500 g–1 kg", tier: 2, unit: "tray" },
          { name: "Pre-sliced smoked Norwegian — dill marinated", brand: "Vacuum tray · 500 g–1 kg", tier: 2, unit: "tray" },
          { name: "Pre-sliced smoked Scottish salmon", brand: "Forman & Field or Hansen & Lydersen", tier: 3, unit: "tray" },
          { name: "Pre-sliced wild Baltic smoked salmon", brand: "Wild · seasonal", tier: 3, unit: "tray" },
          { name: "Smoked salmon — small pack (single service)", brand: "100 / 150 / 200 g sleeve", tier: 1, unit: "pack" },
          { name: "Smoked salmon — small pack dill + lemon", brand: "100 / 150 / 200 g sleeve", tier: 1, unit: "pack" },
          { name: "Smoked wild Baltic salmon — small pack", brand: "100 / 150 g sleeve", tier: 2, unit: "pack" },
          { name: "Smoked Scottish organic salmon — small pack", brand: "100 / 150 g sleeve", tier: 2, unit: "pack" },
          { name: "Gravlax — house-style dill + sugar cure", brand: "Whole side · cold-cured", tier: 2, unit: "side" },
        ],
      },
      {
        title: "Other smoked / cured seafood",
        items: [
          { name: "Smoked eel fillet", brand: "Loch Fyne / Dutch · vacuum 200 g", tier: 3, unit: "pack" },
          { name: "Smoked trout fillet", brand: "Hot-smoked · 200 g vacuum", tier: 2, unit: "pack" },
          { name: "Smoked sturgeon fillet", brand: "Russian style · vacuum 200 g", tier: 3, unit: "pack" },
          { name: "Smoked mackerel fillet", brand: "Hot-smoked · peppered or plain", tier: 1, unit: "pack" },
          { name: "Smoked halibut fillet", brand: "Cold-smoked · luxury", tier: 3, unit: "pack" },
          { name: "Smoked cod roe", brand: "Whole lobe · Scandinavian", tier: 2, unit: "pcs" },
          { name: "Anchovies — Cantabrian salt-cured", brand: "Don Bocarte / Codesa · tin 50 g", tier: 3, unit: "tin" },
          { name: "Anchovies in olive oil — Sicilian", brand: "Agostino Recca · jar 100 g", tier: 2, unit: "jar" },
          { name: "Sardines vintage in olive oil", brand: "Ramón Peña / Conservas Pinhais", tier: 3, unit: "tin" },
          { name: "Tuna ventresca — Cantabrian", brand: "Olasagasti / Don Bocarte", tier: 3, unit: "tin" },
          { name: "Mackerel fillets in olive oil", brand: "Conservas de Cambados or Pinhais", tier: 2, unit: "tin" },
          { name: "Mussels in escabeche", brand: "Galician · Ramón Peña 16/20", tier: 2, unit: "tin" },
          { name: "Cockles — Cantabrian", brand: "Don Bocarte · jar / tin", tier: 3, unit: "jar" },
          { name: "Octopus in olive oil — Galician", brand: "Tin / jar", tier: 2, unit: "tin" },
        ],
      },
      {
        title: "Caviar service — accompaniments",
        items: [
          { name: "Mother-of-pearl caviar spoons (set 4)", brand: "Non-reactive · serving", tier: 2, unit: "set" },
          { name: "Blini — small Russian wheat", brand: "Frozen 30 / 50 pcs", tier: 1, unit: "pack" },
          { name: "Crème fraîche d'Isigny AOP", brand: "200 / 500 g tub", tier: 2, unit: "tub" },
          { name: "Smetana — Russian sour cream", brand: "200 / 500 g tub", tier: 2, unit: "tub" },
          { name: "Vodka — premium for caviar service", brand: "Beluga Gold / Belvedere / Grey Goose", tier: 3, unit: "bottle" },
        ],
      },
    ],
  };

  // ── 2. MODERNIST & PASTRY LAB (Sosa, Louis François, Vanilla Venture) ──
  const modernist = {
    id: "modernist",
    label: "Modernist & Pastry Lab",
    sections: [
      {
        title: "Hydrocolloids & gelling agents",
        items: [
          { name: "Agar agar (powder)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Agar agar pure (high purity)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Gellan gum (high acyl)", brand: "Sosa / Louis François", tier: 2, unit: "g" },
          { name: "Gellan gum (low acyl)", brand: "Sosa / Louis François", tier: 2, unit: "g" },
          { name: "Iota carrageenan", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Kappa carrageenan", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Xanthan gum", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Locust bean gum", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Methylcellulose (Methocel)", brand: "Sosa · 500 g · hot gels", tier: 2, unit: "g" },
          { name: "Pectin NH (nappage)", brand: "Sosa / Louis François", tier: 2, unit: "g" },
          { name: "Pectin yellow (slow-set)", brand: "Sosa / Louis François", tier: 2, unit: "g" },
          { name: "Pectin X58 (calcium-reactive)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Gelatin sheets — gold 200 bloom", brand: "Sosa / La Vie en Rose · pack 1 kg", tier: 2, unit: "pack" },
          { name: "Gelatin sheets — silver 160 bloom", brand: "Sosa / La Vie en Rose · pack 1 kg", tier: 2, unit: "pack" },
          { name: "Gelatin powder — bovine 200 bloom", brand: "Sosa · 1 kg", tier: 1, unit: "kg" },
        ],
      },
      {
        title: "Sphérification & spherification",
        items: [
          { name: "Sodium alginate", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Calcic (calcium chloride)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Gluco (calcium gluconolactate)", brand: "Sosa · 500 g · reverse spherification", tier: 2, unit: "g" },
          { name: "Citrate (sodium citrate)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
        ],
      },
      {
        title: "Emulsifiers & foaming",
        items: [
          { name: "Soy lecithin powder", brand: "Sosa · 500 g · airs / foams", tier: 2, unit: "g" },
          { name: "Sucroester (Sucro)", brand: "Sosa · 500 g · stable emulsions", tier: 2, unit: "g" },
          { name: "Glice (mono-diglycerides)", brand: "Sosa · 500 g · fat-based emulsions", tier: 2, unit: "g" },
          { name: "Pro-Espuma cold (siphon base cold)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Pro-Espuma hot (siphon base hot)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Albumin / Albuwhip powder", brand: "Sosa · 500 g · egg-white powder", tier: 2, unit: "g" },
        ],
      },
      {
        title: "Sugars & sweeteners (lab grade)",
        items: [
          { name: "Dextrose", brand: "Sosa · 1 kg", tier: 1, unit: "kg" },
          { name: "Trimoline (inverted sugar)", brand: "Sosa / Louis François · 7 kg pail", tier: 2, unit: "kg" },
          { name: "Glucose syrup DE 38 / 40", brand: "Sosa / Louis François · 7 kg pail", tier: 1, unit: "kg" },
          { name: "Glucose atomised (powder)", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Fructose", brand: "Sosa · 1 kg", tier: 1, unit: "kg" },
          { name: "Isomalt — sugar-art grade", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Maltodextrin (tapioca)", brand: "Sosa · 500 g · fat-to-powder", tier: 2, unit: "g" },
          { name: "Cremsucre (anti-crystalliser)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Sorbitol", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
        ],
      },
      {
        title: "Ice-cream stabilisers & base mixes",
        items: [
          { name: "Procrema 100 cold (ice-cream stabiliser cold)", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Procrema 100 hot (ice-cream stabiliser hot)", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Prosorbet 100 cold (sorbet stabiliser cold)", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Prosorbet 100 hot (sorbet stabiliser hot)", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Neutro 5 (multi-purpose stabiliser)", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Skim milk powder (low-fat)", brand: "1 kg", tier: 1, unit: "kg" },
          { name: "Coconut milk powder", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
        ],
      },
      {
        title: "Freeze-dried fruits & powders",
        items: [
          { name: "Freeze-dried raspberry powder", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Freeze-dried raspberry whole / crumble", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Freeze-dried strawberry powder", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Freeze-dried mango cubes", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Freeze-dried passion fruit powder", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Freeze-dried beetroot powder", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Freeze-dried green jalapeño", brand: "Sosa · 100 g", tier: 2, unit: "g" },
          { name: "Freeze-dried yuzu zest", brand: "Sosa · 100 g", tier: 3, unit: "g" },
          { name: "Freeze-dried lime zest", brand: "Sosa · 100 g", tier: 2, unit: "g" },
        ],
      },
      {
        title: "Crispies, crumbles & textures",
        items: [
          { name: "Cherry crispy (freeze-dried granules)", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Strawberry crispy", brand: "Sosa · 250 g", tier: 2, unit: "g" },
          { name: "Chocolate peta crispy (pop-rocks)", brand: "Sosa · 900 g", tier: 2, unit: "g" },
          { name: "White pop / fizz powder", brand: "Sosa · 700 g", tier: 2, unit: "g" },
          { name: "Mini meringue drops — natural", brand: "Sosa · 1 kg", tier: 2, unit: "kg" },
          { name: "Air bag — pork (crisp pellets)", brand: "Sosa · 500 g", tier: 3, unit: "g" },
          { name: "Air bag — potato (crisp pellets)", brand: "Sosa · 500 g", tier: 2, unit: "g" },
          { name: "Chocolate-coated mini cornet S-0", brand: "Sosa · 0.6 g · 350 pcs box", tier: 2, unit: "box" },
        ],
      },
      {
        title: "Edible flowers & decorative",
        items: [
          { name: "Crystallised rose petals 1 mm", brand: "Sosa · 100 g", tier: 3, unit: "g" },
          { name: "Crystallised violet petals 1 mm", brand: "Sosa · 100 g", tier: 3, unit: "g" },
          { name: "Crystallised jasmine flowers", brand: "Sosa · 100 g", tier: 3, unit: "g" },
          { name: "Gold leaf — edible 23-carat (booklet)", brand: "Easy or transfer · 25 sheets", tier: 3, unit: "book" },
          { name: "Silver leaf — edible (booklet)", brand: "25 sheets", tier: 2, unit: "book" },
        ],
      },
      {
        title: "Aroma essences & natural colours",
        items: [
          { name: "Vanilla extract Bourbon (Sosa Aroma)", brand: "Sosa · 250 ml", tier: 2, unit: "bottle" },
          { name: "Coconut natural aroma", brand: "Sosa · 250 ml", tier: 2, unit: "bottle" },
          { name: "Pistachio natural aroma", brand: "Sosa · 250 ml", tier: 2, unit: "bottle" },
          { name: "Hazelnut natural aroma", brand: "Sosa · 250 ml", tier: 2, unit: "bottle" },
          { name: "Black carbon natural colour", brand: "Sosa · 80 g", tier: 2, unit: "g" },
          { name: "Beetroot red natural colour", brand: "Sosa · 80 g", tier: 2, unit: "g" },
          { name: "Spirulina blue natural colour", brand: "Sosa · 80 g", tier: 2, unit: "g" },
          { name: "Curcuma yellow natural colour", brand: "Sosa · 80 g", tier: 2, unit: "g" },
        ],
      },
      {
        title: "Curing & charcuterie additives",
        items: [
          { name: "Transglutaminase (Activa RM)", brand: "Ajinomoto · 1 kg · meat glue", tier: 2, unit: "kg" },
          { name: "Nitrite curing salt (pink salt #1 / Prague Powder)", brand: "0.6% nitrite · 1 kg", tier: 2, unit: "kg" },
          { name: "Nitrate curing salt (pink salt #2)", brand: "Long-cure · 1 kg", tier: 2, unit: "kg" },
          { name: "Dextrose for curing", brand: "1 kg food grade", tier: 1, unit: "kg" },
          { name: "Bactoferm T-SPX (slow starter)", brand: "Chr. Hansen · 25 g sachet", tier: 2, unit: "sachet" },
          { name: "Bactoferm F-LC (fast bioprotect.)", brand: "Chr. Hansen · 25 g sachet", tier: 2, unit: "sachet" },
          { name: "Hog casings — salted 32/35 mm", brand: "Natural · 5 m / 90 m hank", tier: 2, unit: "hank" },
          { name: "Sheep casings — salted 22/24 mm", brand: "Natural · 90 m hank", tier: 2, unit: "hank" },
          { name: "Collagen casings — fibrous 60 mm", brand: "Salami / dry-cure", tier: 1, unit: "pack" },
        ],
      },
    ],
  };

  // ── 3. ICE CREAM & FRUIT PURÉES (Ponthier-style) ──────────────────────
  const iceCream = {
    id: "ice-cream",
    label: "Ice Cream & Fruit Purées",
    sections: [
      {
        title: "Fruit purées — frozen 1 kg bricks (Ponthier)",
        items: [
          { name: "Passion fruit purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Mango Alphonso purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Raspberry purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Strawberry purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Blackcurrant purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Blueberry purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Blackberry purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Red berries purée (mix)", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Red fruit purée (mix)", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Morello cherry purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Apricot purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "White peach purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Yellow peach purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Pear Williams purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Green apple purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Banana purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Pineapple purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Coconut purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Lychee purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Guava purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Exotic purée (mango-passion-pineapple)", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Pomegranate purée", brand: "Ponthier · 1 kg frozen", tier: 3, unit: "kg" },
          { name: "Cranberry purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Lemon purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Lime purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Mandarin purée", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
          { name: "Blood orange purée", brand: "Ponthier · 1 kg frozen", tier: 3, unit: "kg" },
          { name: "Bergamot purée", brand: "Ponthier · 1 kg frozen", tier: 3, unit: "kg" },
          { name: "Calamansi purée", brand: "Ponthier · 1 kg frozen", tier: 3, unit: "kg" },
          { name: "Yuzu purée", brand: "Ponthier · 1 kg frozen", tier: 3, unit: "kg" },
          { name: "Fig purée", brand: "Ponthier · 1 kg frozen", tier: 3, unit: "kg" },
          { name: "Tomato purée — savoury", brand: "Ponthier · 1 kg frozen", tier: 2, unit: "kg" },
        ],
      },
      {
        title: "Premium ice creams (artisan)",
        items: [
          { name: "Vanilla bean ice cream — Madagascar", brand: "Pidy / Boncolac / artisan local", tier: 2, unit: "tub" },
          { name: "Pistachio ice cream — Bronte DOP", brand: "Italian artisan · 2.5 L tub", tier: 3, unit: "tub" },
          { name: "Chocolate ice cream — Valrhona Manjari 64%", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Hazelnut Piemonte IGP ice cream", brand: "Italian artisan · 2.5 L tub", tier: 3, unit: "tub" },
          { name: "Stracciatella gelato", brand: "Italian artisan", tier: 2, unit: "tub" },
          { name: "Fior di latte gelato", brand: "Italian artisan", tier: 2, unit: "tub" },
          { name: "Salted caramel ice cream", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Coffee ice cream — single origin", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Mascarpone & fig ice cream", brand: "Italian artisan", tier: 3, unit: "tub" },
        ],
      },
      {
        title: "Sorbets (fruit-only)",
        items: [
          { name: "Lemon sorbet", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Raspberry sorbet", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Strawberry sorbet", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Mango sorbet", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Passion fruit sorbet", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Blackcurrant sorbet", brand: "Artisan · 2.5 L tub", tier: 2, unit: "tub" },
          { name: "Pear & Williams brandy sorbet", brand: "Artisan", tier: 2, unit: "tub" },
          { name: "Yuzu sorbet", brand: "Artisan", tier: 3, unit: "tub" },
        ],
      },
      {
        title: "Service formats",
        items: [
          { name: "Mini cones — sugar / chocolate dipped", brand: "Petits fours · box 100", tier: 1, unit: "box" },
          { name: "Wafer cone sheets", brand: "Box 100", tier: 1, unit: "box" },
          { name: "Cone holders (silver presentation)", brand: "Service rack", tier: 1, unit: "pcs" },
          { name: "Frozen mochi balls (assorted)", brand: "Bubbies / My-Mo · box 12", tier: 2, unit: "box" },
        ],
      },
    ],
  };

  // ── 4. GALLEY EQUIPMENT & DISPOSABLES ─────────────────────────────────
  const equipment = {
    id: "equipment",
    label: "Galley Equipment & Disposables",
    sections: [
      {
        title: "Wraps, films & papers",
        items: [
          { name: "Cling film — regular 30 cm", brand: "Catering roll 300 m", tier: 1, unit: "roll" },
          { name: "Cling film — professional 45 cm", brand: "Catering roll 300 m", tier: 1, unit: "roll" },
          { name: "Cling film — professional 55 cm", brand: "Catering roll 300 m", tier: 1, unit: "roll" },
          { name: "Tin foil — regular 30 cm", brand: "Heavy-duty roll", tier: 1, unit: "roll" },
          { name: "Tin foil — professional 45 cm", brand: "Heavy-duty roll", tier: 1, unit: "roll" },
          { name: "Baking parchment — silicone-coated", brand: "60 cm × 100 m roll", tier: 1, unit: "roll" },
          { name: "Baking parchment — pre-cut sheets 40×60", brand: "Box 500 sheets", tier: 1, unit: "box" },
          { name: "Greaseproof paper sheets", brand: "Box 500", tier: 1, unit: "box" },
          { name: "Acetate strips — pastry collars", brand: "Pack 100 strips · 6 cm × 30 cm", tier: 1, unit: "pack" },
          { name: "Silpat-style silicone baking mats", brand: "60 × 40 cm", tier: 2, unit: "pcs" },
        ],
      },
      {
        title: "Bags & storage",
        items: [
          { name: "Ziploc bags — small", brand: "Box 100", tier: 1, unit: "box" },
          { name: "Ziploc bags — medium", brand: "Box 100", tier: 1, unit: "box" },
          { name: "Ziploc bags — large", brand: "Box 100", tier: 1, unit: "box" },
          { name: "Ziploc bags — extra large", brand: "Box 50", tier: 1, unit: "box" },
          { name: "Vacuum-pack bags — smooth 20 × 30 cm", brand: "Chamber-machine · box 1000", tier: 1, unit: "box" },
          { name: "Vacuum-pack bags — smooth 25 × 35 cm", brand: "Chamber · box 1000", tier: 1, unit: "box" },
          { name: "Vacuum-pack bags — smooth 30 × 40 cm", brand: "Chamber · box 1000", tier: 1, unit: "box" },
          { name: "Vacuum-pack rolls — embossed 28 cm × 6 m", brand: "FoodSaver-style · pack 2", tier: 1, unit: "pack" },
          { name: "Sous-vide cooking bags — large", brand: "Cryovac-rated · box 100", tier: 1, unit: "box" },
          { name: "Bin liners — kitchen 60 L", brand: "Heavy-duty roll 50", tier: 1, unit: "roll" },
          { name: "Bin liners — recycling 100 L", brand: "Clear · roll 50", tier: 1, unit: "roll" },
        ],
      },
      {
        title: "Cleaning chemicals",
        items: [
          { name: "Hand dishwashing liquid", brand: "Fairy / Pril · 5 L", tier: 1, unit: "bottle" },
          { name: "Oven cleaner spray", brand: "Mr Muscle / Sonax", tier: 1, unit: "bottle" },
          { name: "Grease remover spray", brand: "Catering-grade", tier: 1, unit: "bottle" },
          { name: "Grease remover liquid (5 L)", brand: "Diversey / Ecolab", tier: 1, unit: "bottle" },
          { name: "Vitro-ceramic cleaner", brand: "Cif / Stahl-Fix", tier: 1, unit: "bottle" },
          { name: "Stainless-steel polish", brand: "Bar Keepers Friend or HG", tier: 1, unit: "bottle" },
          { name: "Multi-surface degreaser concentrate", brand: "Ecolab / Diversey · 5 L", tier: 1, unit: "bottle" },
          { name: "Anti-bacterial surface spray", brand: "Dettol / Sanytol", tier: 1, unit: "bottle" },
        ],
      },
      {
        title: "Dishwasher consumables",
        items: [
          { name: "Calgonit Powerball tablets", brand: "Box 110 tabs", tier: 2, unit: "box" },
          { name: "Calgonit Quantum tablets", brand: "Box 110 tabs", tier: 2, unit: "box" },
          { name: "Dishwasher tablets — generic catering", brand: "Box 200 tabs", tier: 1, unit: "box" },
          { name: "Dishwasher rinse aid", brand: "Finish / Ecolab · 5 L", tier: 1, unit: "bottle" },
          { name: "Dishwasher salt — regenerating", brand: "5 kg bag", tier: 1, unit: "bag" },
          { name: "Dishwasher machine cleaner", brand: "Finish · monthly purge", tier: 1, unit: "bottle" },
        ],
      },
      {
        title: "Hand & body protection",
        items: [
          { name: "Latex gloves — S / M / L", brand: "Box 100 powder-free", tier: 1, unit: "box" },
          { name: "Nitrile gloves — S / M / L (black or blue)", brand: "Box 100 catering-grade", tier: 1, unit: "box" },
          { name: "Vinyl gloves — S / M / L", brand: "Box 100", tier: 1, unit: "box" },
          { name: "Heavy-duty washing-up gloves S/M/L", brand: "Marigold or equivalent", tier: 1, unit: "pair" },
          { name: "Cut-resistant glove (single, prep)", brand: "Microplane / Microtex level 5", tier: 2, unit: "pcs" },
          { name: "Disposable hair nets", brand: "Pack 100", tier: 1, unit: "pack" },
          { name: "Disposable beard nets", brand: "Pack 100", tier: 1, unit: "pack" },
          { name: "Disposable aprons", brand: "Roll 100 · plastic", tier: 1, unit: "roll" },
          { name: "Burn-cream / aloe spray (first-aid)", brand: "Tube 50 g", tier: 1, unit: "tube" },
        ],
      },
      {
        title: "Cleaning cloths & sponges",
        items: [
          { name: "Green harsh scour sponges", brand: "Pack 10", tier: 1, unit: "pack" },
          { name: "Soft sponges (non-scratch)", brand: "Pack 10", tier: 1, unit: "pack" },
          { name: "Microfiber cloths — assorted", brand: "Pack 10", tier: 1, unit: "pack" },
          { name: "Catering blue J-cloths", brand: "Roll 100", tier: 1, unit: "roll" },
          { name: "Stainless-steel scourer", brand: "Pack 6", tier: 1, unit: "pack" },
          { name: "Magic eraser (melamine sponge)", brand: "Pack 10", tier: 1, unit: "pack" },
          { name: "Drying towels (terry, white)", brand: "Pack 12", tier: 1, unit: "pack" },
        ],
      },
      {
        title: "Paper & towels",
        items: [
          { name: "Kitchen roll — regular", brand: "Pack 6 rolls", tier: 1, unit: "pack" },
          { name: "Kitchen roll — large professional centre-pull", brand: "Single roll 300 m", tier: 1, unit: "roll" },
          { name: "Hand-towel paper (folded, dispenser)", brand: "Box 3000 sheets", tier: 1, unit: "box" },
          { name: "Toilet paper — premium 3-ply", brand: "Pack 12 rolls", tier: 1, unit: "pack" },
        ],
      },
      {
        title: "Smallwares & service",
        items: [
          { name: "Gas cartridges (siphon / butane)", brand: "ISI N2O · box 10", tier: 1, unit: "box" },
          { name: "CO2 cartridges (sparkler)", brand: "Pack 10", tier: 1, unit: "pack" },
          { name: "Smoke chips — applewood", brand: "Bag 500 g · smoking gun", tier: 2, unit: "bag" },
          { name: "Smoke chips — cherry / hickory / oak", brand: "Bag 500 g", tier: 2, unit: "bag" },
          { name: "Charcoal — binchotan", brand: "Box 1 kg · grilling", tier: 3, unit: "kg" },
          { name: "Lump charcoal — premium", brand: "Bag 10 kg", tier: 2, unit: "bag" },
          { name: "Disposable wooden picks / skewers", brand: "Box 500 · 8 cm or 15 cm", tier: 1, unit: "box" },
          { name: "Toothpicks (catering)", brand: "Box 1000", tier: 1, unit: "box" },
          { name: "Twine — kitchen butcher's twine", brand: "Roll cotton", tier: 1, unit: "roll" },
          { name: "Cheesecloth / muslin", brand: "Roll", tier: 1, unit: "roll" },
          { name: "Coffee filters — V60 / Chemex", brand: "Pack 100", tier: 1, unit: "pack" },
          { name: "Lighter — long kitchen torch lighter", brand: "Refill butane", tier: 1, unit: "pcs" },
          { name: "Butane refill cans — kitchen torch", brand: "Pack 4", tier: 1, unit: "pack" },
        ],
      },
    ],
  };

  // ── 5. SPECIALTY MEAT (Wagyu, Iberico, Heritage, Game) ────────────────
  const specialtyMeat = {
    id: "specialty-meat",
    label: "Specialty Meat · Heritage & Luxury",
    sections: [
      {
        title: "Wagyu — Japanese A5 & equivalents",
        items: [
          { name: "Japanese A5 Wagyu — ribeye (Miyazaki)", brand: "BMS 11–12 · per kg", tier: 3, unit: "kg" },
          { name: "Japanese A5 Wagyu — striploin (Kagoshima)", brand: "BMS 11–12 · per kg", tier: 3, unit: "kg" },
          { name: "Japanese A5 Wagyu — tenderloin (Ohmi / Hida)", brand: "BMS 11–12 · per kg", tier: 3, unit: "kg" },
          { name: "Japanese A5 Wagyu — chateaubriand", brand: "Per kg", tier: 3, unit: "kg" },
          { name: "Japanese A4 Wagyu — ribeye", brand: "Per kg", tier: 3, unit: "kg" },
          { name: "Kobe beef — striploin certified", brand: "Per kg · ultra-rare", tier: 3, unit: "kg" },
          { name: "Olive-fed Wagyu — tomahawk (Sanuki)", brand: "Per kg", tier: 3, unit: "kg" },
          { name: "Aussie Wagyu 9+ — tenderloin", brand: "Jack's Creek / Stone Axe · per kg", tier: 3, unit: "kg" },
          { name: "Aussie Wagyu 9+ — ribeye", brand: "Jack's Creek / Stone Axe · per kg", tier: 3, unit: "kg" },
          { name: "Aussie Wagyu 7+ — striploin", brand: "Per kg", tier: 3, unit: "kg" },
          { name: "Aussie Wagyu 7+ — picaña", brand: "Per kg", tier: 2, unit: "kg" },
          { name: "American Wagyu Black — ribeye", brand: "Snake River Farms / Mishima Reserve", tier: 3, unit: "kg" },
        ],
      },
      {
        title: "Iberico pork — bellota acorn-fed",
        items: [
          { name: "Iberico pork — pluma (shoulder muscle)", brand: "Cinco Jotas / Sánchez Romero Carvajal", tier: 3, unit: "kg" },
          { name: "Iberico pork — secreto (skirt)", brand: "Cinco Jotas / SRC · per kg", tier: 3, unit: "kg" },
          { name: "Iberico pork — presa (front shoulder)", brand: "Cinco Jotas · per kg", tier: 3, unit: "kg" },
          { name: "Iberico pork — solomillo (tenderloin)", brand: "Cinco Jotas · per kg", tier: 3, unit: "kg" },
          { name: "Iberico pork — ribs (costillar)", brand: "Cinco Jotas · per kg", tier: 2, unit: "kg" },
          { name: "Iberico pork — abanico (rosette)", brand: "Cinco Jotas · per kg", tier: 3, unit: "kg" },
          { name: "Iberico pork — carrillera (cheek)", brand: "Per kg · braising", tier: 2, unit: "kg" },
          { name: "Iberico pork — papada (jowl)", brand: "Per kg", tier: 2, unit: "kg" },
          { name: "Iberico whole leg jamón bellota 5J — bone-in 7 kg", brand: "Cinco Jotas · 36-mo cure", tier: 3, unit: "pcs" },
          { name: "Iberico jamón bellota 5J — pre-sliced 80 g", brand: "Cinco Jotas · vacuum tray", tier: 3, unit: "tray" },
          { name: "Iberico paleta bellota — bone-in 4 kg", brand: "Cinco Jotas / SRC · shoulder ham", tier: 3, unit: "pcs" },
        ],
      },
      {
        title: "Dry-aged premium beef (Simmental, Black Angus, Hereford)",
        items: [
          { name: "Striploin dry-aged Simmental >40d", brand: "L'Hoff / Luma / Lindenhoff", tier: 3, unit: "kg" },
          { name: "Ribeye dry-aged Simmental >40d", brand: "L'Hoff / Luma", tier: 3, unit: "kg" },
          { name: "Tenderloin dry-aged Simmental", brand: "L'Hoff / Luma", tier: 3, unit: "kg" },
          { name: "Côte de bœuf dry-aged (rib on bone)", brand: "Luma / Lindenhoff / L'Hoff", tier: 3, unit: "kg" },
          { name: "Côte de bœuf USA Prime dry-aged", brand: "Pat LaFrieda / Creekstone", tier: 3, unit: "kg" },
          { name: "T-bone steak dry-aged", brand: "Per kg", tier: 3, unit: "kg" },
          { name: "Porterhouse steak dry-aged", brand: "Per kg", tier: 3, unit: "kg" },
          { name: "Tomahawk dry-aged 1.2 kg+", brand: "Per piece", tier: 3, unit: "pcs" },
          { name: "Côte de bœuf Galician — vieja vaca", brand: "Tx0gitxu / Discarlux · 8-12 yo", tier: 3, unit: "kg" },
          { name: "Hanger steak (onglet / arrachera)", brand: "Per kg", tier: 2, unit: "kg" },
          { name: "Bavette (flap / picaña)", brand: "Per kg", tier: 2, unit: "kg" },
          { name: "Beef cheek — clean trimmed", brand: "Per kg", tier: 1, unit: "kg" },
          { name: "Oxtail — cross-cut", brand: "Per kg", tier: 1, unit: "kg" },
          { name: "Bone marrow — split canoe", brand: "Per kg · roasted appetiser", tier: 1, unit: "kg" },
        ],
      },
      {
        title: "Heritage lamb & rare-breed",
        items: [
          { name: "Salt-marsh lamb leg bone-in", brand: "Mont-Saint-Michel AOP / Welsh PGI", tier: 3, unit: "pcs" },
          { name: "Salt-marsh lamb saddle", brand: "AOP / PGI", tier: 3, unit: "pcs" },
          { name: "Rhug Estate organic lamb — rack frenched", brand: "Rhug Estate (Wales) · organic", tier: 3, unit: "pcs" },
          { name: "Rhug Estate organic lamb — leg bone-in", brand: "Rhug Estate · organic", tier: 3, unit: "pcs" },
          { name: "Rhug Estate organic lamb — shoulder bone-in", brand: "Rhug Estate · organic", tier: 3, unit: "pcs" },
          { name: "Pyrénées lamb — milk-fed", brand: "AOP / PGI · seasonal", tier: 3, unit: "pcs" },
          { name: "Sisteron lamb (Provence)", brand: "IGP · seasonal", tier: 3, unit: "pcs" },
        ],
      },
      {
        title: "Game (seasonal)",
        items: [
          { name: "Venison — saddle / loin", brand: "Wild Scottish or NZ farmed", tier: 3, unit: "kg" },
          { name: "Venison — haunch", brand: "Wild · per kg", tier: 2, unit: "kg" },
          { name: "Wild boar — loin", brand: "Per kg · autumn / winter", tier: 2, unit: "kg" },
          { name: "Wild boar — shoulder for ragu", brand: "Per kg", tier: 1, unit: "kg" },
          { name: "Wood pigeon — whole oven-ready", brand: "Each · 350–400 g", tier: 2, unit: "pcs" },
          { name: "Grouse — whole oven-ready (Aug–Dec)", brand: "Each · Scottish wild", tier: 3, unit: "pcs" },
          { name: "Partridge — whole oven-ready", brand: "Each · French / British", tier: 2, unit: "pcs" },
          { name: "Mallard duck — whole oven-ready", brand: "Each · wild", tier: 2, unit: "pcs" },
          { name: "Hare — saddle", brand: "Per pcs · autumn winter", tier: 3, unit: "pcs" },
          { name: "Rabbit — whole farmed (rex)", brand: "Each · 1.2–1.5 kg", tier: 2, unit: "pcs" },
        ],
      },
      {
        title: "Heritage poultry & duck",
        items: [
          { name: "Bresse chicken AOC — whole", brand: "Bourg-en-Bresse · 1.8–2.2 kg", tier: 3, unit: "pcs" },
          { name: "Label Rouge chicken — whole", brand: "85+ days · 1.6–2 kg", tier: 2, unit: "pcs" },
          { name: "Guinea fowl (pintade) — whole", brand: "Label Rouge · 1.2 kg", tier: 2, unit: "pcs" },
          { name: "Poussin (baby chicken) — whole", brand: "350–450 g each", tier: 2, unit: "pcs" },
          { name: "Capon — whole, Christmas / festive", brand: "Bresse or Label Rouge", tier: 3, unit: "pcs" },
          { name: "Duck Challans (Vendée) — whole", brand: "Label Rouge / IGP · 2 kg", tier: 3, unit: "pcs" },
          { name: "Duck Rouen — whole", brand: "Traditional Normandy", tier: 3, unit: "pcs" },
          { name: "Duck breast Magret — Moulard", brand: "Rougié / Maison Lascours · 350 g", tier: 2, unit: "pcs" },
          { name: "Foie gras d'oie cru (raw goose)", brand: "Rougié · Lobe entier 500 g", tier: 3, unit: "pcs" },
          { name: "Foie gras de canard cru (raw duck)", brand: "Rougié / Lalbenque · 500 g", tier: 3, unit: "pcs" },
          { name: "Foie gras mi-cuit — torchon", brand: "Rougié · 200 g vacuum", tier: 3, unit: "pcs" },
          { name: "Foie gras — IQF escalopes 60 g", brand: "Rougié · box 1 kg · à la minute", tier: 2, unit: "pack" },
        ],
      },
      {
        title: "Truffle (fresh, in season)",
        items: [
          { name: "Truffle Tuber Magnatum — white Alba (Oct–Dec)", brand: "Tartufi Morra / Urbani · per gram", tier: 3, unit: "g" },
          { name: "Truffle Tuber Melanosporum — black Périgord (Dec–Mar)", brand: "Plantin / Pebeyre · per gram", tier: 3, unit: "g" },
          { name: "Truffle Tuber Aestivum — black summer (May–Aug)", brand: "Plantin / Urbani · per gram", tier: 2, unit: "g" },
          { name: "Truffle Tuber Uncinatum — Burgundy (Sept–Jan)", brand: "Per gram", tier: 2, unit: "g" },
        ],
      },
    ],
  };

  // Assign stable IDs to every item, then push the five new categories.
  [caviar, modernist, iceCream, equipment, specialtyMeat].forEach(cat => {
    cat.sections.forEach((s, si) => {
      s.items.forEach((it, ii) => {
        it.id = `${cat.id}-${si}-${ii}`;
      });
    });
    window.PANTRY_DATA.push(cat);
  });
})();
