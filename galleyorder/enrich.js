/* ============================================================================
   LITTORALICIOUS — Galley Order Enrichment
   Runtime rules: seasonal calendar, allergen tagging, portion-math suggestions,
   guest-profile flagging. All matching by regex on item name + brand text.
   Curated by Arnaud Callier — yacht-chef intelligence, not generic.
   ============================================================================ */
window.PANTRY_ENRICH = (function () {

  // ---------------------------------------------------------------------------
  // SEASONAL CALENDAR
  // months are 1-12; an item is "in peak" if today's month is in the list.
  // "off-season" items get a red flag and a tooltip.
  // ---------------------------------------------------------------------------
  const season = [
    // ---- TRULY seasonal — out-of-season = inferior product ----
    { match: /stone crab claws/i,                     months: [10,11,12,1,2,3,4,5], label: "Florida · Oct–May" },
    { match: /soft-shell crab/i,                      months: [5,6,7,8,9],          label: "Atlantic · May–Sep" },
    { match: /spot prawn/i,                           months: [5,6,7],              label: "Pacific · May–Jul" },
    { match: /white.*truffle|tuber magnatum|alba.*truffle/i,
                                                       months: [10,11,12],          label: "Alba · Oct–Dec" },
    { match: /black winter truffle|black truffle.*winter|tuber melanosporum/i,
                                                       months: [11,12,1,2,3],       label: "Périgord · Nov–Mar" },
    { match: /vacherin mont d'or|mont d'or/i,         months: [9,10,11,12,1,2,3],   label: "Jura · Sep–Mar (AOP)" },
    { match: /bay scallop/i,                          months: [10,11,12,1,2,3],     label: "New England · Oct–Mar" },
    { match: /percebes/i,                              months: [9,10,11,12,1,2],     label: "Galicia · Sep–Feb" },

    // ---- Game (Oct–Feb) ----
    { match: /\bvenison|chevreuil|red deer/i,         months: [10,11,12,1,2],       label: "Game · Oct–Feb" },
    { match: /wild boar|sanglier/i,                    months: [10,11,12,1,2],       label: "Game · Oct–Feb" },
    { match: /pheasant|partridge|grouse|palombe|wood pigeon/i,
                                                       months: [9,10,11,12,1,2],     label: "Feathered game · Sep–Feb" },
    { match: /hare\b|lievre|li[èe]vre/i,                months: [10,11,12,1,2],       label: "Hare · Oct–Feb" },
    { match: /wild rabbit/i,                           months: [9,10,11,12,1,2],     label: "Wild rabbit · Sep–Feb" },

    // ---- Wild salmon ----
    { match: /wild.*alaska.*salmon|king salmon.*sashimi/i,
                                                       months: [5,6,7,8,9],          label: "Wild Alaska · May–Sep peak" },
    { match: /sockeye/i,                                months: [6,7,8],              label: "Sockeye · Jun–Aug" },

    // ---- Specialty ----
    { match: /sea urchin|^uni\b/i,                    months: [11,12,1,2,3],        label: "Hokkaido · Nov–Mar peak" },
    { match: /bottarga/i,                              months: [9,10,11,12],         label: "Cured Sep–Dec, best fresh" },
    { match: /asparagus.*white|white asparagus/i,      months: [4,5,6],              label: "Spring · Apr–Jun" },
    { match: /artichoke/i,                              months: [3,4,5,6,9,10,11],    label: "Spring + autumn" },
    { match: /morel/i,                                  months: [3,4,5],              label: "Morel · Mar–May" },
    { match: /chanterelle|girolle/i,                    months: [6,7,8,9,10],         label: "Chanterelle · Jun–Oct" },
    { match: /porcini.*fresh|fresh porcini|cep/i,       months: [9,10,11],            label: "Cep · Sep–Nov" },

    // ---- Cheeses with seasonal harvest ----
    { match: /vacherin fribourgeois/i,                 months: [9,10,11,12,1,2,3],   label: "Sep–Mar" },
    { match: /salers/i,                                 months: [5,6,7,8,9,10],       label: "Summer pasture · May–Oct" },
    { match: /beaufort.*alpage|beaufort.*ete|beaufort d'été/i,
                                                       months: [7,8,9,10,11,12],     label: "Summer alpage · ready Jul+" },
  ];

  // ---------------------------------------------------------------------------
  // ALLERGEN TAGS
  // Tags applied to items for filtering / flagging.
  // ---------------------------------------------------------------------------
  const allergens = [
    // FISH — true fish (not shellfish)
    { match: /\b(salmon|tuna|cod|hake|halibut|sea bass|branzino|sole|dorade|sea bream|snapper|mahi|monkfish|grouper|trout|sardine|anchov|mackerel|saba\b|red mullet|rouget|john dory|john-dory|bacalao|smoked.*eel|eel\b|hamachi|kanpachi|hirame|tai\b|fluke|flounder|bonito)\b/i,
      tags: ["fish"] },

    // SHELLFISH (crustacean + mollusk)
    { match: /\b(shrimp|prawn|lobster|crab\b|scallop|mussel|clam|oyster|langoustine|crayfish|crawfish|squid|calamari|octopus|cuttlefish|carabineros|amaebi|geoduck|percebes|whelk)\b/i,
      tags: ["shellfish"] },
    { match: /\b(caviar|roe|ikura|tobiko|masago|sea urchin|uni)\b/i,
      tags: ["shellfish", "roe"] },

    // EGG
    { match: /\b(egg pasta|fresh egg pasta|brioche|tortellini|ravioli|cappellini|wonton|gyoza|cannoli|mayo|mayonnaise|frangipane|meringue|sabayon|hollandaise|carbonara|amatriciana|gribiche)\b/i,
      tags: ["egg"] },
    { match: /\b(eggs?\b)(?!-free)/i, tags: ["egg"] },

    // GLUTEN
    { match: /\b(wheat|t55|t65|t80|t110|t150|maida|atta|semola|semolina|spelt|einkorn|kamut|khorasan|farro|emmer|rye|triticale|barley|pasta\b|noodle|udon|ramen|spätzle|spaetzle|bulgur|freekeh|couscous|orzo|fregola|panko|breadcrumb|crouton|cracker|baguette|brioche|ciabatta|focaccia|bagel|pita|naan|paratha|chapati|filo|phyllo|brick|fil[oe]|yufka|tortilla.*flour|tortilla.*wheat|flour tortilla)\b/i,
      tags: ["gluten"] },

    // NUTS
    { match: /\b(almond|hazelnut|pistachio|walnut|pecan|cashew|brazil nut|macadamia|pine nut|gianduja|praline|frangipane|marzipan|nougat|amaretto|amaretti|nutella|baklava|maamoul)\b/i,
      tags: ["nuts"] },
    { match: /\b(peanut)\b/i, tags: ["nuts", "peanut"] },

    // DAIRY
    { match: /\b(milk\b|cream\b|butter\b|cheese|yogurt|labneh|mascarpone|ricotta|parmigiano|grana|pecorino|paneer|ghee|feta|halloumi|mozzarella|burrata|stracciatella|stracchino|robiola|brie|camembert|époisses|epoisses|comt[ée]|gruy[èe]re|cheddar|gorgonzola|roquefort|stilton|manchego|provolone|chèvre|chevre|crème|crema|kefir|kashkaval|skyr|caciocavallo|gorgonzola|emmental|raclette|fontina|saint-marcellin|asiago|cantal|reblochon|munster|maroilles|tomme|abondance|morbier|brillat-savarin|gouda|edam|valdeón|cabrales|idiazábal|roncal|mahón|tetilla|garrotxa|azeitão|serra da estrela)\b/i,
      tags: ["dairy"] },

    // SESAME
    { match: /\b(sesame|tahini|halawa|halva|gomashio|gomasio|furikake|togarashi|shichimi)\b/i, tags: ["sesame"] },

    // PORK (cultural / religious)
    { match: /\b(pork\b|jamón|jamon|prosciutto|chorizo|coppa|guanciale|pancetta|lardo|saucisson|salami|salsiccia|'?nduja|capocollo|culatello|mortadella|speck|iberico|ibérico|mangalitsa|basque pork|kintoa|bacon\b|lardons|breakfast sausage.*pork|sopressata|finocchiona|toulouse|morteau|andouillette|boudin)\b/i,
      tags: ["pork"] },

    // BEEF
    { match: /\b(wagyu|aubrac|charolais|angus|galician rubia|tomahawk|t-bone|porterhouse|chateaubriand|ribeye|striploin|brisket|short rib|onglet|hanger|bavette|flank|picanha|beef\b|filet de boeuf|oxtail|beef cheek|bresaola)\b/i,
      tags: ["beef"] },

    // SOY
    { match: /\b(soy sauce|shoyu|tamari|miso|edamame|tofu|tempeh|natto|ponzu|teriyaki|doenjang|gochujang|hoisin|kecap|kecap manis)\b/i,
      tags: ["soy"] },
  ];

  // ---------------------------------------------------------------------------
  // PORTION-MATH RULES
  // role: "guest" | "crew" | "all" — which PAX count drives the math
  //   guest  → guest count only (sashimi, Wagyu, foie gras, cheese course)
  //   crew   → crew count only (mince, lardons, drumsticks, crew portions)
  //   all    → guest + crew (whole bird, supreme, white fillet, smoked salmon)
  // ---------------------------------------------------------------------------
  const portions = [
    // ====================== FISH ============================================
    // GUEST sashimi / hero raw
    { cat: "fish", role: "guest", name: /^bluefin.*akami|yellowfin.*loin|hamachi.*loin|kanpachi/i,
      perPaxOnce: 0.12, unit: "kg", note: "120 g sashimi" },
    { cat: "fish", role: "guest", name: /salmon.*sashimi|king salmon.*sashimi|salmon belly trim/i,
      perPaxOnce: 0.10, unit: "kg", note: "100 g sashimi" },
    { cat: "fish", role: "guest", name: /^chu-toro|^toro\b|hirame|tai/i,
      perPaxOnce: 0.06, unit: "kg", note: "60 g luxury sashimi" },
    { cat: "fish", role: "guest", name: /^uni\b|sea urchin/i,
      perPaxOnce: 0.025, unit: "kg", note: "25 g uni / pax" },

    // SALMON service — split guest vs crew explicitly
    { cat: "fish", role: "guest", name: /^(king|ora king) salmon/i,
      perPaxPerDay: 0.18, unit: "kg", note: "180 g portion (1 of 7 services)", divisor: 7 },
    { cat: "fish", role: "crew",  name: /atlantic salmon/i,
      perPaxPerDay: 0.15, unit: "kg", note: "150 g crew portion (1 of 7 services)", divisor: 7 },

    // WHITE FILLETS — all-PAX (mixed service guest + crew over week)
    { cat: "fish", role: "all", section: /white fillet/i,
      perPaxPerDay: 0.16, unit: "kg", note: "160 g portion / pax (mix guest + crew)", divisor: 7 },
    { cat: "fish", role: "all", name: /^mahi mahi|^cod \(atlantic\)|^hake$|^flounder|monkfish/i,
      perPaxPerDay: 0.15, unit: "kg", note: "150 g portion / pax", divisor: 7 },

    // WHOLE FISH — guest plating
    { cat: "fish", role: "guest", section: /whole fish/i,
      perPaxPerDay: 0.5, unit: "pcs", note: "1/2 whole fish per guest", divisor: 7 },

    // LIVE / SHELLFISH — guest service
    { cat: "fish", role: "guest", name: /maine.*lobster|european lobster/i,
      perPaxOnce: 1, unit: "pcs", note: "1 live lobster / guest (thermidor)" },
    { cat: "fish", role: "guest", name: /diver scallop|day-boat scallop/i,
      perPaxOnce: 3, unit: "pcs", note: "3 U-10 scallops / guest" },
    { cat: "fish", role: "guest", name: /^tiger prawn/i,
      perPaxOnce: 3, unit: "pcs", note: "3 head-on U-6 / guest" },
    { cat: "fish", role: "guest", name: /spot prawn|carabineros/i,
      perPaxOnce: 2, unit: "pcs", note: "2 head-on / guest" },
    { cat: "fish", role: "guest", section: /oyster|bivalve/i,
      perPaxOnce: 6, unit: "pcs", note: "6 oysters / guest (raw service)" },
    { cat: "fish", role: "guest", name: /^langoustine/i,
      perPaxOnce: 2, unit: "pcs", note: "2 langoustines / guest" },
    { cat: "fish", role: "guest", name: /jumbo lump crab/i,
      perPaxOnce: 0.080, unit: "kg", note: "80 g jumbo lump / guest (crab cake)" },
    { cat: "fish", role: "guest", name: /stone crab/i,
      perPaxOnce: 2, unit: "claws", note: "2 claws / guest" },

    // CAVIAR — order BY TIN not kg. 15-20 g per guest, 50 g tin (Osetra/Sevruga), 30 g tin (Beluga).
    { cat: "fish", role: "guest", name: /caviar.*osetra|^osetra/i,
      perPaxOnce: 0.40, unit: "tin", note: "20 g Osetra / guest · 50 g tin (round up)" },
    { cat: "fish", role: "guest", name: /sevruga/i,
      perPaxOnce: 0.30, unit: "tin", note: "15 g Sevruga / guest · 50 g tin" },
    { cat: "fish", role: "guest", name: /beluga/i,
      perPaxOnce: 0.40, unit: "tin", note: "12 g Beluga / guest · 30 g tin" },

    // SMOKED — all PAX (breakfast for everyone)
    { cat: "fish", role: "all", name: /smoked.*salmon.*scottish/i,
      perPaxPerDay: 0.025, unit: "kg", note: "25 g sliced / pax / day breakfast" },
    { cat: "fish", role: "all", name: /salmon side for gravlax|gravlax/i,
      perPaxOnce: 0.125, unit: "side", note: "1 side serves ~8 pax (breakfast)" },

    // CEPHALOPOD / utility
    { cat: "fish", role: "all", name: /^squid|^cuttlefish/i,
      perPaxPerDay: 0.12, unit: "kg", note: "120 g / pax / service", divisor: 7 },

    // ====================== MEAT ============================================
    // PREMIUM GUEST STEAKS
    { cat: "meat", role: "guest", name: /wagyu (ribeye|striploin)/i,
      perPaxOnce: 0.150, unit: "kg", note: "150 g Wagyu / guest (intense)" },
    { cat: "meat", role: "guest", name: /wagyu tenderloin/i,
      perPaxOnce: 0.150, unit: "kg", note: "150 g Wagyu fillet / guest" },
    { cat: "meat", role: "guest", name: /^(galician|tomahawk|côte de boeuf|cote de boeuf|t-bone|porterhouse)/i,
      perPaxOnce: 0.350, unit: "kg", note: "350 g bone-in / guest" },
    { cat: "meat", role: "guest", section: /premium steak/i,
      perPaxOnce: 0.280, unit: "kg", note: "280 g steak / guest" },
    { cat: "meat", role: "guest", name: /whole beef tenderloin/i,
      perPaxOnce: 0.180, unit: "kg", note: "180 g portion from whole loin / guest" },
    { cat: "meat", role: "guest", name: /chateaubriand/i,
      perPaxOnce: 0.200, unit: "kg", note: "200 g chateaubriand / guest" },
    { cat: "meat", role: "guest", name: /picanha/i,
      perPaxOnce: 0.220, unit: "kg", note: "220 g picanha / guest" },

    // BEEF MINCE / TARTARE — split: tartare is guest, mince is crew
    { cat: "meat", role: "guest", name: /beef tartare cut/i,
      perPaxOnce: 0.100, unit: "kg", note: "100 g tartare / guest" },
    { cat: "meat", role: "guest", name: /beef carpaccio/i,
      perPaxOnce: 0.060, unit: "kg", note: "60 g carpaccio / guest" },
    { cat: "meat", role: "crew",  name: /beef mince — chuck/i,
      perPaxPerDay: 0.150, unit: "kg", note: "150 g crew bolognese / crew / service", divisor: 7 },
    { cat: "meat", role: "guest", name: /beef mince — premium|sirloin grind/i,
      perPaxOnce: 0.150, unit: "kg", note: "150 g sirloin grind / guest" },

    // BURGERS — clear guest / crew split
    { cat: "meat", role: "guest", name: /wagyu burger patties|dry-aged burger patties/i,
      perPaxOnce: 1, unit: "pcs", note: "1 patty / guest (premium)" },
    { cat: "meat", role: "crew",  name: /grass-fed beef burger patties|crew burger/i,
      perPaxOnce: 1, unit: "pcs", note: "1 patty / crew" },
    { cat: "meat", role: "guest", name: /slider patties/i,
      perPaxOnce: 2, unit: "pcs", note: "2 sliders / guest (canapé)" },

    // BRAISES — all-PAX (mixed service)
    { cat: "meat", role: "all", name: /^short ribs — bone-in/i,
      perPaxOnce: 1, unit: "pcs", note: "1 rib / pax" },
    { cat: "meat", role: "crew", name: /boneless short rib/i,
      perPaxPerDay: 0.200, unit: "kg", note: "200 g crew braise / crew", divisor: 7 },
    { cat: "meat", role: "guest", name: /beef cheeks(?! \(smoked\))/i,
      perPaxOnce: 1, unit: "pcs", note: "1 cheek / guest" },
    { cat: "meat", role: "all", name: /^oxtail/i,
      perPaxOnce: 0.200, unit: "kg", note: "200 g / pax oxtail" },
    { cat: "meat", role: "all", name: /^brisket/i,
      perPaxOnce: 0.250, unit: "kg", note: "250 g / pax sliced brisket" },
    { cat: "meat", role: "guest", name: /marrow bones/i,
      perPaxOnce: 1, unit: "pcs", note: "1 marrow / guest" },

    // VEAL
    { cat: "meat", role: "guest", name: /veal tenderloin/i,
      perPaxOnce: 0.180, unit: "kg", note: "180 g veal fillet / guest" },
    { cat: "meat", role: "guest", name: /veal chop/i,
      perPaxOnce: 1, unit: "pcs", note: "1 veal chop / guest" },
    { cat: "meat", role: "crew",  name: /veal escalope/i,
      perPaxOnce: 1, unit: "pcs", note: "1 escalope / crew" },
    { cat: "meat", role: "guest", name: /osso buco/i,
      perPaxOnce: 1, unit: "pcs", note: "1 osso buco / guest" },
    { cat: "meat", role: "guest", name: /veal sweetbread/i,
      perPaxOnce: 0.080, unit: "kg", note: "80 g sweetbreads / guest" },

    // LAMB
    { cat: "meat", role: "guest", name: /^lamb rack — frenched/i,
      perPaxOnce: 0.25, unit: "racks", note: "1 rack / 4 guests (2 chops each)" },
    { cat: "meat", role: "guest", name: /lamb loin chop/i,
      perPaxOnce: 2, unit: "pcs", note: "2 chops / guest" },
    { cat: "meat", role: "guest", name: /lamb tenderloin/i,
      perPaxOnce: 0.150, unit: "kg", note: "150 g lamb fillet / guest" },
    { cat: "meat", role: "guest", name: /lamb shank/i,
      perPaxOnce: 1, unit: "pcs", note: "1 shank / guest" },
    { cat: "meat", role: "crew",  name: /lamb mince/i,
      perPaxPerDay: 0.150, unit: "kg", note: "150 g crew (kefta/keema) / crew", divisor: 7 },

    // PORK
    { cat: "meat", role: "guest", name: /iberico .*(secreto|presa|pluma|solomillo|pork chop)/i,
      perPaxOnce: 0.180, unit: "kg", note: "180 g Iberico bellota / guest" },
    { cat: "meat", role: "guest", name: /mangalitsa pork chop/i,
      perPaxOnce: 0.300, unit: "kg", note: "300 g bone-in chop / guest" },
    { cat: "meat", role: "all", name: /pork belly.*skin-on/i,
      perPaxOnce: 0.180, unit: "kg", note: "180 g pork belly / pax" },
    { cat: "meat", role: "crew", name: /^pork mince/i,
      perPaxPerDay: 0.150, unit: "kg", note: "150 g crew / crew", divisor: 7 },

    // POULTRY
    { cat: "meat", role: "guest", name: /bresse chicken/i,
      perPaxOnce: 0.25, unit: "birds", note: "1 Bresse / 4 guests" },
    { cat: "meat", role: "all", name: /label rouge.*chicken|organic chicken|whole.*chicken/i,
      perPaxOnce: 0.25, unit: "birds", note: "1 bird / 4 pax" },
    { cat: "meat", role: "all", name: /chicken supreme/i,
      perPaxOnce: 1, unit: "pcs", note: "1 supreme / pax" },
    { cat: "meat", role: "all", name: /chicken thigh.*boneless/i,
      perPaxOnce: 1, unit: "pcs", note: "1 thigh / pax" },
    { cat: "meat", role: "crew", name: /chicken drumsticks/i,
      perPaxPerDay: 0.300, unit: "kg", note: "300 g drumsticks / crew / service", divisor: 7 },
    { cat: "meat", role: "crew", name: /chicken wings/i,
      perPaxPerDay: 0.250, unit: "kg", note: "250 g wings / crew", divisor: 7 },
    { cat: "meat", role: "guest", name: /poussin/i,
      perPaxOnce: 1, unit: "birds", note: "1 poussin / guest" },
    { cat: "meat", role: "guest", name: /guinea fowl|pintade/i,
      perPaxOnce: 0.5, unit: "birds", note: "1/2 guinea fowl / guest" },
    { cat: "meat", role: "guest", name: /duck.*challans|duck.*barbarie|^duck \(/i,
      perPaxOnce: 0.33, unit: "birds", note: "1 whole duck / 3 guests" },
    { cat: "meat", role: "guest", name: /duck breast|magret/i,
      perPaxOnce: 0.5, unit: "pcs", note: "1/2 magret / guest" },
    { cat: "meat", role: "guest", name: /duck confit/i,
      perPaxOnce: 1, unit: "legs", note: "1 leg / guest" },
    { cat: "meat", role: "guest", name: /foie gras.*lobe|raw lobe/i,
      perPaxOnce: 0.12, unit: "lobes", note: "60 g per guest · 1 lobe = ~500 g (round up)" },
    { cat: "meat", role: "guest", name: /foie gras escalope/i,
      perPaxOnce: 1, unit: "pcs", note: "1 × 60 g escalope / guest" },
    { cat: "meat", role: "guest", name: /pigeon|squab/i,
      perPaxOnce: 1, unit: "birds", note: "1 pigeon / guest" },
    { cat: "meat", role: "guest", name: /^quail/i,
      perPaxOnce: 2, unit: "pcs", note: "2 quail / guest" },
    { cat: "meat", role: "guest", name: /wood pigeon|palombe/i,
      perPaxOnce: 1, unit: "birds", note: "1 wood pigeon / guest" },

    // GAME (guest)
    { cat: "meat", role: "guest", name: /venison loin/i,
      perPaxOnce: 0.150, unit: "kg", note: "150 g venison loin / guest" },
    { cat: "meat", role: "guest", name: /venison medallion/i,
      perPaxOnce: 2, unit: "pcs", note: "2 medallions / guest" },
    { cat: "meat", role: "guest", name: /wild boar saddle/i,
      perPaxOnce: 0.220, unit: "kg", note: "220 g wild boar / guest" },
    { cat: "meat", role: "guest", name: /^pheasant/i,
      perPaxOnce: 0.5, unit: "birds", note: "1/2 pheasant / guest" },
    { cat: "meat", role: "guest", name: /partridge|grouse/i,
      perPaxOnce: 1, unit: "birds", note: "1 small bird / guest" },

    // CHARCUTERIE BOARD — guest service
    { cat: "meat", role: "guest", section: /charcuterie/i,
      perPaxOnce: 0.060, unit: "kg", note: "60 g board / guest" },

    // FRESH SAUSAGES & BACON — all-PAX (breakfast / casual)
    { cat: "meat", role: "all", name: /american streaky bacon|chicken apple sausage|breakfast sausage|english back bacon/i,
      perPaxPerDay: 0.045, unit: "kg", note: "45 g / pax / day breakfast" },
    { cat: "meat", role: "crew", name: /bacon lardons|salsiccia|^chorizo fresco|^merguez/i,
      perPaxPerDay: 0.080, unit: "kg", note: "80 g crew / crew / service", divisor: 7 },
    { cat: "meat", role: "all", name: /saucisse de toulouse/i,
      perPaxOnce: 0.120, unit: "kg", note: "120 g sausage / pax" },

    // ====================== CHEESE COURSE ==================================
    { cat: "cheese-dairy", role: "guest", section: /soft|brie|bloomy|blue|hard|cheese/i,
      perPaxOnce: 0.030, unit: "kg", note: "30 g / guest / cheese course (5 cheeses)" },

    // ====================== SPICES (calibrated to real chef use) ==========
    // Rates are per pax per day. minQty enforces "minimum order pack" — for a
    // short trip we don't suggest 21 g of cumin; we round up to the smallest
    // pack the supplier sells. role: "all" applies to total eaters.
    //
    // 10 pax × 7 days × 0.5 g/pax/day = 35 g — but minQty floors to 50 g pack.
    // 10 pax × 90 days × 0.5 g/pax/day = 450 g — natural growth, no floor.

    // ---- Salts ----
    { cat: "spices", role: "all", name: /^maldon|fleur de sel|sel gris|sel de cama|sel de gué|hawaiian|himalayan|kala namak|smoked.*salt|truffle.*salt|fish sauce salt/i,
      perPaxPerDay: 0.0008, unit: "kg", minQty: 0.2, note: "premium salt — finishing only · 0.8 g/pax/day" },
    { cat: "spices", role: "all", name: /^fine sea salt|kosher salt|pickling salt|^salt$|^fine salt/i,
      perPaxPerDay: 0.008, unit: "kg", minQty: 1, note: "everyday salt 8 g/pax/day (cooking + table)" },

    // ---- Whole peppers ----
    { cat: "spices", role: "all", name: /tellicherry|sarawak|kampot|lampong|black peppercorn|whole.*pepper|^pepper.*whole/i,
      perPaxPerDay: 0.4, unit: "g", minQty: 50, note: "0.4 g whole pepper / pax / day (mill + cooking)" },
    { cat: "spices", role: "all", name: /^white pepper|white peppercorn/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g white pepper / pax / day" },
    { cat: "spices", role: "all", name: /szechuan|sichuan.*peppercorn|sansho/i,
      perPaxPerDay: 0.1, unit: "g", minQty: 30, note: "0.1 g specialty pepper / pax / day" },
    { cat: "spices", role: "all", name: /pink peppercorn|long pepper|cubeb|voatsiperifery|grains of paradise|selim pepper/i,
      perPaxOnce: 1, unit: "g", minQty: 30, note: "1 g rare pepper / pax × charter" },

    // ---- Dried chilis & chili powders ----
    { cat: "spices", role: "all", name: /aleppo|halaby|maraş|maras|urfa|pul biber|gochugaru|espelette|piment d'espelette/i,
      perPaxPerDay: 0.25, unit: "g", minQty: 50, note: "0.25 g premium chili flake / pax / day" },
    { cat: "spices", role: "all", name: /smoked paprika|pimentón de la vera|la chinata|la dalia|paprika.*dulce|paprika.*picante|paprika.*agridulce/i,
      perPaxPerDay: 0.25, unit: "g", minQty: 75, note: "0.25 g pimentón / pax / day" },
    { cat: "spices", role: "all", name: /^paprika|hungarian paprika|sweet paprika|hot paprika/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 50, note: "0.2 g paprika / pax / day" },
    { cat: "spices", role: "all", name: /cayenne|chili powder.*hot|red chili powder|kashmiri.*chili|degi mirch/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 50, note: "0.2 g hot chili / pax / day" },
    { cat: "spices", role: "all", name: /ancho|guajillo|pasilla|mulato|chipotle.*meco|chipotle.*morita|chile.*árbol|chile.*arbol|cascabel|costeño|chilhuacle|pequín|piquín|chiltepín/i,
      perPaxPerDay: 0.4, unit: "g", minQty: 50, note: "0.4 g Mexican dried chili / pax / day" },
    { cat: "spices", role: "all", name: /erjingtiao|tianjin|facing-heaven|chao.*tian|thai.*bird|prik haeng/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g Asian dried chili / pax / day" },

    // ---- Whole essential spices (heavy daily use) ----
    { cat: "spices", role: "all", name: /^cumin|jeera|black cumin|shahi jeera|kala jeera/i,
      perPaxPerDay: 0.4, unit: "g", minQty: 50, note: "0.4 g cumin seed / pax / day" },
    { cat: "spices", role: "all", name: /coriander seed|whole coriander|dhania/i,
      perPaxPerDay: 0.35, unit: "g", minQty: 50, note: "0.35 g coriander seed / pax / day" },
    { cat: "spices", role: "all", name: /fennel seed|saunf|fennel pollen/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g fennel seed / pax / day" },
    { cat: "spices", role: "all", name: /^mustard seed|yellow mustard|brown mustard|black mustard|rai\b|mustard.*seed/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 50, note: "0.2 g mustard seed / pax / day" },
    { cat: "spices", role: "all", name: /fenugreek seed|methi|fenugreek.*leaf|kasuri methi/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g fenugreek / pax / day" },
    { cat: "spices", role: "all", name: /ajwain|carom seed/i,
      perPaxPerDay: 0.1, unit: "g", minQty: 50, note: "0.1 g ajwain / pax / day" },
    { cat: "spices", role: "all", name: /nigella|kalonji|black caraway/i,
      perPaxPerDay: 0.08, unit: "g", minQty: 50, note: "0.08 g nigella / pax / day" },
    { cat: "spices", role: "all", name: /caraway seed|^caraway/i,
      perPaxPerDay: 0.1, unit: "g", minQty: 50, note: "0.1 g caraway / pax / day" },
    { cat: "spices", role: "all", name: /^star anise|badiane/i,
      perPaxPerDay: 0.1, unit: "g", minQty: 50, note: "0.1 g star anise / pax / day" },
    { cat: "spices", role: "all", name: /^cloves|laung/i,
      perPaxPerDay: 0.08, unit: "g", minQty: 50, note: "0.08 g cloves / pax / day" },
    { cat: "spices", role: "all", name: /cinnamon stick|cinnamon.*ceylon|cinnamon.*mexican|canela|cassia bark|saigon cassia/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 50, note: "0.2 g cinnamon / pax / day" },
    { cat: "spices", role: "all", name: /nutmeg.*whole|whole nutmeg|jaiphal/i,
      perPaxPerDay: 0.05, unit: "pcs", minQty: 5, note: "1 nutmeg per ~20 pax-days" },
    { cat: "spices", role: "all", name: /^mace|javitri/i,
      perPaxPerDay: 0.04, unit: "g", minQty: 25, note: "rare — 0.04 g mace / pax / day" },
    { cat: "spices", role: "all", name: /allspice|pimento.*allspice|pimento.*berries/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g allspice / pax / day" },
    { cat: "spices", role: "all", name: /juniper.*berries|juniper berry/i,
      perPaxPerDay: 0.08, unit: "g", minQty: 30, note: "0.08 g juniper / pax / day" },

    // ---- Cardamom (premium, sparing) ----
    { cat: "spices", role: "all", name: /green cardamom|choti elaichi|cardamom.*malabar/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g green cardamom / pax / day" },
    { cat: "spices", role: "all", name: /black cardamom|badi elaichi|korerima/i,
      perPaxPerDay: 0.05, unit: "g", minQty: 30, note: "0.05 g black cardamom / pax / day" },

    // ---- Ground / powdered (less staling, use up faster but smaller quantities) ----
    { cat: "spices", role: "all", name: /^turmeric|haldi/i,
      perPaxPerDay: 0.25, unit: "g", minQty: 50, note: "0.25 g turmeric / pax / day" },
    { cat: "spices", role: "all", name: /^ginger powder/i,
      perPaxPerDay: 0.1, unit: "g", minQty: 50, note: "0.1 g ginger powder / pax / day" },
    { cat: "spices", role: "all", name: /garlic powder|garlic granules|onion powder/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 100, note: "0.2 g allium powder / pax / day" },
    { cat: "spices", role: "all", name: /amchur|dried mango powder/i,
      perPaxPerDay: 0.05, unit: "g", minQty: 50, note: "0.05 g amchur / pax / day" },

    // ---- Dried herbs ----
    { cat: "spices", role: "all", name: /thym|thyme|tomillo|herbes de provence|fines herbes/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g dried herb / pax / day" },
    { cat: "spices", role: "all", name: /rosemary|romarin|rosmarino|romero/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g rosemary / pax / day" },
    { cat: "spices", role: "all", name: /oregano.*greek|cretan oregano|wild oregano|oregano mexican|lippia/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 50, note: "0.2 g oregano / pax / day" },
    { cat: "spices", role: "all", name: /^sage|salvia|sauge/i,
      perPaxPerDay: 0.08, unit: "g", minQty: 30, note: "0.08 g sage / pax / day" },
    { cat: "spices", role: "all", name: /tarragon|estragon|dragoncello/i,
      perPaxPerDay: 0.08, unit: "g", minQty: 30, note: "0.08 g tarragon / pax / day" },
    { cat: "spices", role: "all", name: /^bay leaves|tej patta/i,
      perPaxPerDay: 0.05, unit: "g", minQty: 25, note: "0.05 g bay leaves / pax / day" },
    { cat: "spices", role: "all", name: /^lavender|lavande/i,
      perPaxPerDay: 0.05, unit: "g", minQty: 25, note: "0.05 g lavender / pax / day" },
    { cat: "spices", role: "all", name: /wild thyme|hyssop|^marjoram|marjolaine|^savory/i,
      perPaxPerDay: 0.05, unit: "g", minQty: 25, note: "rare dried herb 0.05 g/pax/day" },
    { cat: "spices", role: "all", name: /loomi|dried lime|^mahleb|mahlab|^mastic|chios mastic/i,
      perPaxPerDay: 0.05, unit: "g", minQty: 25, note: "0.05 g specialty / pax / day" },

    // ---- Regional blends ----
    { cat: "spices", role: "all", name: /garam masala|chaat masala|tandoori masala|biryani masala|sambar masala|rasam powder|pav bhaji|goda masala|panch phoron|vindaloo masala|madras curry powder|caribbean curry/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 100, note: "0.2 g Indian blend / pax / day" },
    { cat: "spices", role: "all", name: /za'atar|zaatar|baharat|ras el hanout|dukkah|advieh|hawaij|harissa rose|harissa.*dried/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 100, note: "0.2 g Middle-East blend / pax / day" },
    { cat: "spices", role: "all", name: /berbere|mitmita|kosseret|besobela/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 100, note: "0.15 g Ethiopian blend / pax / day" },
    { cat: "spices", role: "all", name: /chinese 5-spice|chinese five-spice|^five-spice/i,
      perPaxPerDay: 0.12, unit: "g", minQty: 75, note: "0.12 g 5-spice / pax / day" },
    { cat: "spices", role: "all", name: /shichimi|togarashi|yagenbori|ichimi/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 50, note: "0.15 g shichimi / pax / day" },
    { cat: "spices", role: "all", name: /jerk seasoning|walkerswood|grace.*jerk|adobo.*goya|sazón|sazon|creole seasoning|cajun.*seasoning|old bay|chimichurri.*dry/i,
      perPaxPerDay: 0.25, unit: "g", minQty: 100, note: "0.25 g Latin/Creole blend / pax / day" },
    { cat: "spices", role: "all", name: /tajín|tajin|chile-lime|merkén/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 100, note: "0.2 g Mexican blend / pax / day" },
    { cat: "spices", role: "all", name: /bobotie|boerewors|biltong spice/i,
      perPaxPerDay: 0.15, unit: "g", minQty: 100, note: "0.15 g South African blend / pax / day" },
    { cat: "spices", role: "all", name: /hing|asafoetida|asafetida|vandevi|sanchi|lg hing/i,
      perPaxPerDay: 0.03, unit: "g", minQty: 25, note: "tiny daily use — 0.03 g hing / pax / day" },

    // ---- Floral & aromatic heroes ----
    { cat: "spices", role: "all", name: /^saffron|safran|azafrán|zafferano|la mancha|bahraman|kashmir mongra/i,
      perPaxOnce: 0.5, unit: "g", minQty: 1, note: "0.5 g saffron / pax × charter (5 g for 10 pax)" },
    { cat: "spices", role: "all", name: /vanilla pods|vanilla.*madagascar|vanilla.*tahitian|vanilla.*mexican|vanilla.*bourbon|norohy|heilala/i,
      perPaxOnce: 2, unit: "pods", minQty: 5, note: "2 pods / pax × charter (20 pods for 10)" },
    { cat: "spices", role: "all", name: /vanilla extract|vanilla paste/i,
      perPaxOnce: 10, unit: "mL", minQty: 100, note: "10 mL / pax × charter" },
    { cat: "spices", role: "all", name: /tonka beans|^tonka/i,
      perPaxOnce: 0.5, unit: "g", minQty: 10, note: "0.5 g tonka / pax × charter (rare)" },
    { cat: "spices", role: "all", name: /black.*truffle|tuber melanosporum|white.*truffle|tuber magnatum|alba.*truffle|tartufalba/i,
      perPaxOnce: 1, unit: "g", minQty: 10, note: "1 g fresh truffle / pax × occasion (in season only)" },
    { cat: "spices", role: "all", name: /truffle salt|truffle.*oil/i,
      perPaxOnce: 5, unit: "g", minQty: 50, note: "5 g / pax × charter" },
    { cat: "spices", role: "all", name: /rose petals|rose.*dried|dried rose/i,
      perPaxPerDay: 0.05, unit: "g", minQty: 25, note: "0.05 g dried rose / pax / day" },
    { cat: "spices", role: "all", name: /rose water|orange blossom water|kewra|geranium water|mymouné|mymoune|cortas/i,
      perPaxOnce: 25, unit: "mL", minQty: 250, note: "25 mL floral water / pax × charter" },

    // ---- Pastes (tinned / jarred) ----
    { cat: "spices", role: "all", name: /harissa.*tin|harissa.*cap bon|le phare|harissa.*belazu|harissa.*mustapha/i,
      perPaxOnce: 0.15, unit: "tin", minQty: 2, note: "1 tin per ~7 pax × charter" },
    { cat: "spices", role: "all", name: /mole.*paste|mole negro|mole coloradito|mole poblano|mole verde|mole amarillo|pipián|mayordomo|guelaguetza|doña maría/i,
      perPaxOnce: 0.2, unit: "jar", minQty: 2, note: "1 jar per ~5 pax × charter" },
    { cat: "spices", role: "all", name: /achiote|recado rojo|recado negro/i,
      perPaxOnce: 25, unit: "g", minQty: 100, note: "25 g achiote / pax × charter" },
    { cat: "spices", role: "all", name: /salsa macha|nam prik pao|chili crisp|lao gan ma|fly by jing|xo sauce/i,
      perPaxOnce: 0.2, unit: "jar", minQty: 2, note: "1 jar per ~5 pax × charter" },

    // ---- Sumac and dried fruit spices ----
    { cat: "spices", role: "all", name: /^sumac|sumak|salloum/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 100, note: "0.2 g sumac / pax / day" },
    { cat: "spices", role: "all", name: /anardana|pomegranate.*seed.*dry/i,
      perPaxPerDay: 0.08, unit: "g", minQty: 50, note: "0.08 g anardana / pax / day" },

    // ---- Cocoa / matcha (savoury crossover) ----
    { cat: "spices", role: "all", name: /cocoa powder|cacao powder/i,
      perPaxPerDay: 0.5, unit: "g", minQty: 200, note: "0.5 g cocoa / pax / day (mole + pastry)" },
    { cat: "spices", role: "all", name: /matcha.*culinary|matcha.*ceremonial/i,
      perPaxPerDay: 0.2, unit: "g", minQty: 30, note: "0.2 g matcha / pax / day" },

    // ---- Stock concentrates / umami aids ----
    { cat: "spices", role: "all", name: /better than bouillon|marigold|maggi|ariake|stock concentrate|colatura|colatura di alici|cetara/i,
      perPaxOnce: 0.15, unit: "jar", minQty: 2, note: "1 jar concentrate per ~7 pax × charter" },
    { cat: "spices", role: "all", name: /worcestershire|lea & perrins/i,
      perPaxOnce: 25, unit: "mL", minQty: 290, note: "25 mL Worcestershire / pax × charter" },
    { cat: "spices", role: "all", name: /marmite|vegemite|yeast extract/i,
      perPaxOnce: 10, unit: "g", minQty: 125, note: "10 g yeast extract / pax × charter" },
    { cat: "spices", role: "all", name: /mushroom powder|porcini powder/i,
      perPaxPerDay: 0.1, unit: "g", minQty: 50, note: "0.1 g mushroom powder / pax / day" },
  ];

  // ---------------------------------------------------------------------------
  // GUEST PROFILES — generic public presets only.
  // Vessel- or family-specific profiles should be built via the
  // "+ Add preferences" tool, which stores results privately in the user's
  // own browser (localStorage). Nothing here leaves the browser.
  // ---------------------------------------------------------------------------
  const profiles = {
    none:   { label: "No profile", rules: [] },
    "vegan-charter": {
      label: "Plant-based charter",
      rules: [
        { match: /(?:)/, severity: "warn", reason: "Plant-based brief", catRestrict: ["fish","meat","cheese-dairy"] }
      ],
    },
    "kosher": {
      label: "Kosher (basic)",
      rules: [
        { match: /pork|jamón|jamon|chorizo.*ibé|prosciutto|guanciale|pancetta|lardo|bacon|saucisson|salami|coppa|capocollo|culatello|mortadella|speck|iberico|ibérico|mangalitsa|kintoa|basque pork/i, severity: "ban", reason: "Not kosher (pork)" },
        { match: /shellfish|shrimp|prawn|lobster|crab|scallop|mussel|clam|oyster|squid|octopus|cuttlefish/i, severity: "ban", reason: "Not kosher (shellfish)" },
      ],
    },
    "halal": {
      label: "Halal (basic)",
      rules: [
        { match: /pork|jamón|jamon|chorizo.*ibé|prosciutto|guanciale|pancetta|lardo|bacon|saucisson(?!.*beef)|coppa|capocollo|culatello|mortadella|speck|iberico|ibérico|mangalitsa|kintoa|basque pork|sausage.*pork|fresh pork/i, severity: "ban", reason: "Not halal (pork)" },
      ],
    },
  };

  // ---------------------------------------------------------------------------
  // HELPERS — apply rules at runtime
  // ---------------------------------------------------------------------------
  function enrichItem(item, cat, section, ctx) {
    const text = (item.name + " " + (item.brand || ""));
    const result = {
      allergens: [],
      season: null,
      portion: null,
      profileFlag: null,
    };
    // allergens
    const seen = new Set();
    allergens.forEach(rule => {
      if (rule.match.test(text)) rule.tags.forEach(t => seen.add(t));
    });
    result.allergens = [...seen];

    // season
    for (const rule of season) {
      if (rule.match.test(text)) {
        result.season = {
          months: rule.months,
          label: rule.label,
          inPeak: rule.months.includes(ctx.month),
        };
        break;
      }
    }

    // portion suggestion (role-aware)
    for (const rule of portions) {
      if (rule.cat !== cat.id) continue;
      if (rule.section && !rule.section.test(section.title)) continue;
      if (rule.name && !rule.name.test(item.name)) continue;
      // role determines which PAX count to use
      const role = rule.role || "all";
      let pax = 0;
      if (role === "guest") pax = ctx.guest || 0;
      else if (role === "crew") pax = ctx.crew || 0;
      else pax = (ctx.guest || 0) + (ctx.crew || 0);
      if (pax === 0) { break; } // can't suggest without relevant PAX

      const days = Math.max(1, ctx.days || 1);
      let qty;
      if (rule.perPaxOnce != null) {
        qty = rule.perPaxOnce * pax;
        if (rule.divisorOverride) qty = qty / rule.divisorOverride;
      } else if (rule.perPaxPerDay != null) {
        const div = rule.divisor || 1;
        qty = (rule.perPaxPerDay * pax * days) / div;
      }
      if (qty != null) {
        const wholeUnits = new Set(["tin","tins","pcs","pc","piece","jar","jars","bunch","case","box","pack","birds","racks","legs","claws","side","sides","lobes","tray","trays","log","logs","sheets","wheel","stick","sticks","book","books","tube","tubes","bottle","cans","pods"]);

        // Apply minQty floor BEFORE rounding so the floor wins when math is tiny
        let appliedMin = false;
        if (rule.minQty != null && qty < rule.minQty) {
          qty = rule.minQty;
          appliedMin = true;
        }

        if (rule.unit === "kg") qty = Math.round(qty * 100) / 100;
        else if (wholeUnits.has((rule.unit||"").toLowerCase())) qty = Math.ceil(qty);
        else qty = Math.round(qty * 10) / 10;

        const paxLabel = role === "guest" ? "guests" : role === "crew" ? "crew" : "pax";
        let mathLine;
        if (appliedMin) {
          mathLine = `min pack ${rule.minQty} ${rule.unit || ""} (math gave less)`;
        } else if (rule.perPaxOnce != null) {
          mathLine = `${rule.perPaxOnce}${rule.unit || ""} × ${pax} ${paxLabel} → ${qty} ${rule.unit || ""}`;
        } else {
          mathLine = `${rule.perPaxPerDay}${rule.unit || ""} × ${pax} ${paxLabel} × ${days}d ÷ ${rule.divisor || 1} = ${qty} ${rule.unit || ""}`;
        }
        result.portion = { qty, unit: rule.unit, note: rule.note, role, math: mathLine, isMin: appliedMin };
      }
      break;
    }

    // profile flag
    if (ctx.profile && profiles[ctx.profile]) {
      const prof = profiles[ctx.profile];
      if (prof.rules) {
        for (const r of prof.rules) {
          if (r.catRestrict && r.catRestrict.includes(cat.id)) {
            result.profileFlag = { severity: r.severity, reason: r.reason };
            break;
          }
          if (r.match && r.match !== /(?:)/ && r.match.test(text)) {
            result.profileFlag = { severity: r.severity, reason: r.reason };
            break;
          }
        }
      }
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // PORT INTELLIGENCE — destination-keyed local hero products
  // For each port, `matchPatterns` highlight catalog items that are LOCALLY
  // exceptional here. `handpicked` is the chef's curated list (name, note).
  // ---------------------------------------------------------------------------
  const ports = [
    { id: "none", label: "— No port selected —" },

    { id: "cote-azur",
      label: "Côte d'Azur — Antibes · St-Tropez · Cannes · Monaco",
      flag: "🇫🇷", region: "Mediterranean",
      blurb: "Provence at its peak. Single-estate olive oils from Les Baux, Banon goat cheese in chestnut leaves, Sisteron lamb from the Alpilles, sea bream and rouget at dawn at Vieux Port. Italian Liguria a short transfer away.",
      tips: "Vendredi market in Antibes (Marché Provençal). Forville market in Cannes (5–13h). Direct from producer: Castelas at Les Baux-de-Provence.",
      matchPatterns: [
        /provence|provençal/i, /castelas|laudemio|frantoia|moulin castelas|château virant/i,
        /banon AOP|banon\b/i, /picholine.*provence|niçoise|nicoise/i,
        /espelette|piment d'espelette|bipertegia/i,
        /sisteron|pyrenees.*lamb|^lamb rack.*sisteron|pyrenees/i,
        /^huile|fleur de sel.*guerande|fleur de sel|sel de camargue/i,
        /lavender|chestnut.*leaf/i, /bordier|échiré|isigny|guérande/i,
        /tomme de savoie|reblochon|saint-marcellin|pélardon|crottin/i,
        /^anchovies cantabrian|cantabrian|don bocarte/i,
        /^fennel pollen|fleur de sel/i, /^taggiasche|taggia/i,
      ],
      handpicked: [
        { name: "Castelas EVOO (Les Baux)", note: "Buy direct at the mill — best Provence harvest" },
        { name: "Banon AOP — chestnut-wrapped goat", note: "Peak May-Sep" },
        { name: "Sisteron lamb rack AOP", note: "From the Alpilles meadows" },
        { name: "Niçoise olives + Taggiasche", note: "From local market stalls, not jarred" },
        { name: "Espelette AOP — ground", note: "Pre-toasted from Bipertegia or Petricorena" },
        { name: "Fleur de sel de Guérande", note: "Hand-collected, Brittany" },
        { name: "Anchovies — Cantabrian Don Bocarte", note: "Spanish Cantabria — short distribution" },
        { name: "Picholine + Castelvetrano olives", note: "Crisp green, brined fresh" },
      ],
    },

    { id: "liguria",
      label: "Liguria — Portofino · Cinque Terre · Genoa",
      flag: "🇮🇹", region: "Mediterranean",
      blurb: "The pesto coast. Genoese basil DOP, Taggiasca olives, pin-bone-free anchovies of Monterosso, single-estate olive oil from the terraced steep groves above the sea.",
      tips: "Genoa Mercato Orientale for produce. Monterosso anchovy producers direct.",
      matchPatterns: [
        /taggiasche|taggia|liguria|ligurian/i, /trofie|pesto|focaccia/i,
        /pastificio gentile|setaro|mancini|latini|felicetti|pastificio dei campi/i,
        /^anchovies|cetara|colatura|don bocarte/i,
        /pecorino|caciocavallo silano/i, /castelmagno|bra DOP|toma piemontese/i,
        /pinolo|pine nut/i, /carnaroli|acquerello|vialone nano/i,
      ],
      handpicked: [
        { name: "Taggiasche olives in oil", note: "Riviera Ligure DOP" },
        { name: "Genovese basil DOP", note: "PRA' or Albenga — for pesto" },
        { name: "Pastificio Gentile (Gragnano IGP)", note: "Bronze-die, slow-dried" },
        { name: "Cetara colatura di alici", note: "Garum-style anchovy liquid" },
        { name: "Anchovies Monterosso", note: "Salt-cured in the village" },
        { name: "Pine nuts — Italian stone pine", note: "Mediterranean, NOT Chinese" },
        { name: "Carnaroli Riserva San Massimo", note: "Aged 12 months for risotto" },
      ],
    },

    { id: "amalfi-naples",
      label: "Amalfi · Naples · Capri · Ischia",
      flag: "🇮🇹", region: "Mediterranean",
      blurb: "Volcanic Tyrrhenian soil. San Marzano DOP, Mozzarella di Bufala Campana, Limone Costa d'Amalfi IGP, Provolone del Monaco DOP, scialatelli, the world's cleanest white wines from Etna and Campania.",
      tips: "Caseificio Pignatelli for buffalo mozzarella. Gustarosso for tomatoes direct.",
      matchPatterns: [
        /san marzano|gustarosso|piennolo del vesuvio|datterino/i,
        /mozzarella di bufala|bufala campana|caseificio/i,
        /burrata|stracciatella/i,
        /pastificio gentile|setaro|pastificio dei campi/i,
        /^limoncello|amalfi/i, /provola dei monti lattari|caciocavallo silano/i,
        /^anchovies|cetara|colatura/i,
        /pizza|caputo|pomodoro/i,
      ],
      handpicked: [
        { name: "San Marzano DOP — Gustarosso", note: "Whole peeled, the real ones" },
        { name: "Pomodorino del Piennolo del Vesuvio DOP", note: "Volcanic vine-tomatoes" },
        { name: "Mozzarella di Bufala Campana DOP", note: "Caseificio Pignatelli — same-day" },
        { name: "Burrata di Andria IGP", note: "Murgella or Olanda" },
        { name: "Provola dei Monti Lattari (smoked)", note: "Campania specialty" },
        { name: "Caputo Cuoco / Pizzeria flour", note: "00 for pizza + focaccia" },
        { name: "Cetara colatura di alici", note: "Garum from Cetara village" },
      ],
    },

    { id: "sicily",
      label: "Sicily — Palermo · Catania · Taormina · Pantelleria",
      flag: "🇮🇹", region: "Mediterranean",
      blurb: "Bronte pistachio DOP from Etna's slopes, Pantelleria capers in salt, Modica chocolate, Sicilian swordfish, bottarga di tonno, wild fennel, Marsala from Trapani.",
      tips: "Vucciria market in Palermo. Damiano Distefano direct in Bronte.",
      matchPatterns: [
        /bronte|pistachio.*sicily|damiano distefano/i,
        /pantelleria.*capers|capers.*pantelleria|bonomo/i,
        /modica|mayordomo|stone-ground chocolate/i,
        /sicily|sicilian|sicilia/i,
        /bottarga.*tuna|bottarga di tonno/i,
        /fennel pollen|wild fennel/i,
        /pecorino sardo|pecorino/i, /^marsala/i,
        /pastificio gentile|setaro|mancini|latini/i,
      ],
      handpicked: [
        { name: "Bronte pistachio DOP — Damiano Distefano", note: "Whole + paste · Mt Etna green-gold" },
        { name: "Pantelleria capers — salt-packed", note: "Bonomo & Giglio · the world standard" },
        { name: "Bottarga di tonno", note: "Salt-cured tuna roe · Trapani" },
        { name: "Sicilian fennel pollen", note: "Wild — for pork, fish, sausage" },
        { name: "Marsala — Garibaldi or DOC", note: "For deglazing, dolce + secco" },
        { name: "Caperberries — Pantelleria", note: "Whole bud, vinegar-brined" },
      ],
    },

    { id: "sardinia",
      label: "Sardinia",
      flag: "🇮🇹", region: "Mediterranean",
      blurb: "Bottarga di muggine, fregola sarda, Pecorino Sardo DOP, mirto liqueur, suckling pig porchetta-style, pane carasau crisp.",
      tips: "Stintino + Alghero for produce. Direct from shepherds for Pecorino Sardo.",
      matchPatterns: [
        /bottarga|muggine|mullet roe/i, /fregola sarda|sardinian|sardo/i,
        /pecorino sardo|pecorino di pienza/i, /pane carasau/i,
        /mirto|carignano|cannonau/i,
      ],
      handpicked: [
        { name: "Bottarga di muggine — Sardinia", note: "Mullet roe, sun-cured · grated over pasta" },
        { name: "Fregola sarda", note: "Toasted semolina pasta · seafood stews" },
        { name: "Pecorino Sardo DOP", note: "Aged sheep · younger for cooking, older for grating" },
        { name: "Pane carasau", note: "Crisp shepherd's bread · serve with olive oil" },
        { name: "Mirto liqueur", note: "Sardinian myrtle digestif" },
      ],
    },

    { id: "balearics",
      label: "Mallorca · Ibiza · Menorca",
      flag: "🇪🇸", region: "Mediterranean",
      blurb: "Sobrasada de Mallorca PGI, Mahón cheese, ensaimada, salmorra, paella with local-fished raors and gambas rojas.",
      tips: "Mercat de l'Olivar in Palma (Tuesday early). Sobrasada direct from co-ops in Inca.",
      matchPatterns: [
        /sobrasada|sobrassada|mallorca|mahon|mahón|balearic/i,
        /jamón ibérico|jamon iberico|iberico bellota/i,
        /^chorizo ibérico|chorizo iberico|fuet/i,
        /castelluccio|spanish|hojiblanca|picual/i,
        /paella|bomba|calasparra|senia|albufera/i,
        /^anchovies|cantabrian|don bocarte|nardín|olasagasti/i,
        /pimentón de la vera|la chinata|la dalia/i,
      ],
      handpicked: [
        { name: "Sobrasada de Mallorca PGI", note: "Spreadable cured pork, Mallorcan" },
        { name: "Mahón DOP", note: "Aged orange-rinded Menorcan" },
        { name: "Bomba rice (Calasparra DOP)", note: "Paella king" },
        { name: "Pimentón de la Vera DOP", note: "Smoked Spanish paprika — La Chinata" },
        { name: "Cantabrian anchovies (Don Bocarte)", note: "Premium tin" },
        { name: "Jamón Ibérico de bellota 5J", note: "Acorn-fed black pig" },
      ],
    },

    { id: "costa-brava",
      label: "Costa Brava · Catalonia · San Sebastián",
      flag: "🇪🇸", region: "Mediterranean / Atlantic",
      blurb: "Catalan + Basque country. Romesco, Anchovies of Santoña, Idiazábal cheese, Iberico bellota direct from the dehesa, Galician beef (Rubia Gallega), pintxos culture.",
      tips: "La Boqueria in Barcelona. Mercado de la Bretxa in San Sebastián. Direct from Galician butchers for Rubia Gallega.",
      matchPatterns: [
        /idiazábal|idiazabal|roncal|basque|kintoa/i,
        /galician rubia|rubia gallega|galician/i,
        /iberico bellota|ibérico bellota|jamón ibérico|jamon iberico|5j|cinco jotas/i,
        /cantabrian|don bocarte|nardín|olasagasti|codesa|santoña/i,
        /pimentón|sherry vinegar|jerez|páez morilla|valdespino|lustau/i,
        /castelluccio|hojiblanca|picual/i, /catalan|fuet/i,
        /padrón|piquillo|valdeón|cabrales/i,
      ],
      handpicked: [
        { name: "Galician Rubia Gallega ribeye", note: "Dry-aged 45 days — buy direct from butcher" },
        { name: "Iberico Bellota 5J / Cinco Jotas", note: "Whole leg or hand-cut slices" },
        { name: "Idiazábal DOP (Basque sheep)", note: "Smoked over hawthorn — beech-barrel-aged" },
        { name: "Sherry vinegar 30-yr Reserva (Páez Morilla)", note: "Jerez DOP" },
        { name: "Cantabrian anchovies — Santoña", note: "Don Bocarte or Nardín" },
        { name: "Pimentón de la Vera (sweet + smoked)", note: "La Chinata DOP" },
      ],
    },

    { id: "croatia",
      label: "Croatia · Montenegro · Slovenia (Adriatic)",
      flag: "🇭🇷", region: "Adriatic",
      blurb: "Adriatic prawns and scampi, Pag cheese (sheep from the windswept Pag island), peka lamb, Istrian truffle, Dalmatian olive oil, Plavac mali wine.",
      tips: "Pag for cheese direct. Buzet/Istria for truffle. Vis & Hvar fish markets.",
      matchPatterns: [
        /pag cheese|pag\b|istrian|adriatic/i,
        /pršut|prsut|kulen|kulenovi/i,
        /truffle.*istrian|tuber magnatum/i,
        /croatian|dalmatian|plavac/i,
        /scampi|langoustine/i,
      ],
      handpicked: [
        { name: "Pag cheese (Paški sir)", note: "Aged sheep — wind-cured Adriatic island" },
        { name: "Istrian truffle (in season)", note: "White Sep-Dec, black summer" },
        { name: "Adriatic scampi (Norway lobster)", note: "Whole, head-on, raw" },
        { name: "Istrian olive oil — single-cultivar", note: "Buža, Bjelica" },
        { name: "Pršut (air-cured Croatian ham)", note: "Drniš or Istarski" },
      ],
    },

    { id: "greek-islands",
      label: "Greek Islands — Cyclades · Ionian · Crete",
      flag: "🇬🇷", region: "Aegean / Mediterranean",
      blurb: "Greek PDO feta, Koroneiki olive oil from the western Peloponnese, Cretan wild greens, fresh octopus, lemons of Skinos, mastic from Chios.",
      tips: "Athens Central Market. Direct from Chios producers for mastic.",
      matchPatterns: [
        /^feta|feta.*greek|barrel-aged feta/i,
        /koroneiki|sakellaropoulos|the governor|greek.*olive oil/i,
        /kalamata|halloumi|manouri|anari|kasseri/i,
        /mastic|chios|sumac/i, /oregano.*greek|cretan/i,
        /^retsina|^assyrtiko/i,
      ],
      handpicked: [
        { name: "Greek PDO feta — barrel-aged", note: "Sheep + goat, brine-pulled fresh" },
        { name: "Koroneiki EVOO — The Governor", note: "Single-estate Peloponnese" },
        { name: "Mastic of Chios DOP", note: "Tree resin · ice cream, breads, liqueur" },
        { name: "Wild Cretan oregano (rigani)", note: "Whole bunch, sun-dried" },
        { name: "Halloumi (Cyprus PDO)", note: "Sheep + goat — sliced and grilled" },
      ],
    },

    { id: "turkish-riviera",
      label: "Turkish Riviera — Bodrum · Marmaris · Çeşme",
      flag: "🇹🇷", region: "Aegean",
      blurb: "Aegean swordfish, Antep pistachios, sumac, Maraş pepper, Urfa biber, Turkish PDO cheeses (Mihaliç, Tulum), simit, kashar.",
      tips: "Bodrum's Tuesday market. Antep direct for pistachios.",
      matchPatterns: [
        /antep|turkish pistachio|baklava/i, /maraş|maras|aleppo|urfa biber/i,
        /^sumac|sumak/i, /^pomegranate molasses|cortas|mymouné/i,
        /^bulgur|freekeh|^couscous/i, /pul biber|^lokum/i,
        /^kashkaval|^bottarga.*turkish/i,
      ],
      handpicked: [
        { name: "Antep pistachios (Turkish)", note: "For baklava, künefe, ice cream" },
        { name: "Urfa biber — Turkish black smoky", note: "Smoke-dried pepper · earthy depth" },
        { name: "Maraş pepper (coarse Turkish flake)", note: "Bright, fruity heat" },
        { name: "Sumac — Aleppo / Antep", note: "Deep ruby, no salt added" },
        { name: "Pomegranate molasses — Mymouné", note: "Single-ingredient, syrupy" },
      ],
    },

    { id: "caribbean",
      label: "Caribbean — St Barths · BVI · Antigua · Anguilla",
      flag: "🇦🇮", region: "Caribbean",
      blurb: "Walkerswood jerk, scotch bonnet, Jamaican pimento, Susie's hot sauce, conch from Anguilla, queen snapper, French Antilles markets in Guadeloupe and Martinique.",
      tips: "Marigot in St-Martin, Gustavia market in St Barths, Antigua direct from fishermen for queen snapper.",
      matchPatterns: [
        /jerk|walkerswood|jamaican|scotch bonnet|pimento/i,
        /allspice|pimento.*allspice|^chadon beni|culantro/i,
        /trinidadian|trini|green seasoning/i,
        /matouk|susie|marie sharp|yucateco/i,
        /breadfruit|callaloo|ackee/i,
        /blue mountain coffee|jamaican coffee/i,
      ],
      handpicked: [
        { name: "Walkerswood Jamaican Jerk", note: "Original — mild or hot" },
        { name: "Jamaican pimento (allspice)", note: "Whole berries · #1 grade" },
        { name: "Scotch bonnet — fresh", note: "Market direct, NOT pickled" },
        { name: "Susie's hot sauce (Antigua)", note: "Premium scotch bonnet" },
        { name: "Trini chadon beni / culantro", note: "For green seasoning" },
        { name: "Blue Mountain coffee (certified)", note: "Authentic Jamaican origin only" },
      ],
    },

    { id: "miami-bahamas",
      label: "Miami · Bahamas · Florida Keys",
      flag: "🇺🇸", region: "Atlantic",
      blurb: "Stone crab claws (Florida Oct-May), Krudo for fresh fish + tuna sashimi-grade, Bahamian lobster, conch chowder, Key limes, Cuban-American mojo.",
      tips: "Krudo, North Miami Beach. Joe's Stone Crab in season. Pinecrest Farmer's Market.",
      matchPatterns: [
        /stone crab|florida/i, /maine lobster|spiny lobster|caribbean/i,
        /^conch|^queen conch/i, /key lime|sour orange/i,
        /sashimi.*tuna|bluefin akami|yellowfin|hamachi/i,
        /^chipotle|^cilantro|mojo|cuban/i,
        /everglades.*honey|orange blossom honey/i,
      ],
      handpicked: [
        { name: "Stone crab claws (Joe's / wholesale)", note: "Oct-May Florida season" },
        { name: "Spiny lobster (Bahamian)", note: "Live, tails 8-10 oz" },
        { name: "Bluefin akami — Krudo cut-date", note: "Sashimi-grade · separate box" },
        { name: "Key lime", note: "Fresh from market — for pie + ceviche" },
        { name: "Conch (Bahamian)", note: "For chowder, fritters, cracked conch" },
      ],
    },

    { id: "mexico-pacific",
      label: "Mexico — Cabo · Riviera Maya · Mexico City",
      flag: "🇲🇽", region: "Pacific / Caribbean",
      blurb: "Masienda heirloom corn for masa, dried chilis (ancho, guajillo, pasilla, chilhuacle), Bronte-quality Mexican vanilla from Papantla, Rancho Gordo heirloom beans, Oaxacan chocolate, mezcal direct.",
      tips: "Mercado de San Juan (CDMX). Direct from Oaxaca for mole pastes.",
      matchPatterns: [
        /^masienda|heirloom masa|nixtamal/i,
        /^ancho|^guajillo|^pasilla|^chipotle|^chile|chilhuacle|mulato|costeño/i,
        /mexican vanilla|papantla|^vanilla.*mexican/i,
        /rancho gordo|mayocoba|vaquero|pinquito|anasazi/i,
        /mole.*oaxaca|mayordomo|guelaguetza/i,
        /taza|mexican chocolate|^abuelita|^ibarra/i,
        /^mexican oregano|epazote|hoja santa/i,
        /^mezcal|^tequila/i,
      ],
      handpicked: [
        { name: "Masienda heirloom masa harina", note: "Blue + white · for tortillas + tetelas" },
        { name: "Dried chilis — full lineup", note: "Ancho · guajillo · pasilla · mulato · chilhuacle · mecos" },
        { name: "Papantla vanilla pods", note: "Mexican Veracruz — for ice cream, flan" },
        { name: "Mayordomo / Guelaguetza mole paste", note: "Mole Negro + Coloradito" },
        { name: "Mexican oregano (Lippia graveolens)", note: "Whole leaf, NOT Mediterranean" },
        { name: "Mezcal joven espadín", note: "Del Maguey Vida for cooking + service" },
      ],
    },

    { id: "nyc-hamptons",
      label: "NYC · Hamptons · Maine",
      flag: "🇺🇸", region: "North Atlantic",
      blurb: "Maine lobster, Long Island scallops + duck, oysters of Wellfleet, Bluepoint, Pemaquid; Hudson Valley foie gras (D'Artagnan), heritage grains from Anson Mills, US Wagyu.",
      tips: "Citarella + Eataly NYC. Maine direct for lobster. Anson Mills for Sea Island grits.",
      matchPatterns: [
        /maine lobster|new england|atlantic/i,
        /wellfleet|bluepoint|beausoleil|kumamoto/i,
        /anson mills|sea island|otto file/i,
        /^d'artagnan|hudson valley|foie gras/i,
        /^wagyu.*us|^american wagyu|snake river/i,
        /heritage.*wheat|red fife|sonora|turkey red/i,
      ],
      handpicked: [
        { name: "Maine lobster live (1.5 lb)", note: "Pure cold-water, claw banded" },
        { name: "Wellfleet oysters", note: "Cape Cod cold-water — deep cup, briny" },
        { name: "Anson Mills Sea Island grits", note: "Heirloom Carolina — stone-ground" },
        { name: "D'Artagnan foie gras (Hudson Valley)", note: "American foie · Grade A lobe" },
        { name: "Long Island bay scallops (in season)", note: "Oct-Mar · Peconic Bay" },
      ],
    },

    { id: "pacific-northwest",
      label: "Pacific Northwest — Seattle · Vancouver · BC",
      flag: "🇨🇦", region: "Pacific",
      blurb: "Wild Alaska king and sockeye salmon at peak, geoduck, Olympia oysters, Dungeness crab, spot prawns (May-Jul), morels and chanterelles wild-foraged.",
      tips: "Pike Place Market. Direct from Alaska reps for wild king salmon.",
      matchPatterns: [
        /wild.*alaska|king salmon|sockeye|coho/i,
        /^geoduck/i, /dungeness/i, /spot prawn/i,
        /morel|chanterelle|girolle|porcini.*fresh/i,
        /^olympia|kumamoto|kusshi|pacific.*oyster/i,
        /^ikejime/i,
      ],
      handpicked: [
        { name: "Wild king salmon (Alaska)", note: "Peak May-Sep · sashimi after -60°C freeze" },
        { name: "Spot prawns — LIVE", note: "Pacific May-Jul · live or whole frozen" },
        { name: "Dungeness crab (Pacific)", note: "Live, sweet — picked or whole" },
        { name: "Geoduck — sashimi", note: "Pacific clam · slice raw, dressed light" },
        { name: "Morels (Mar-May) / Chanterelles (Jun-Oct)", note: "Wild-foraged" },
      ],
    },

    { id: "corsica",
      label: "Corsica · Bonifacio · Calvi · Bastia",
      flag: "🇫🇷", region: "Mediterranean",
      blurb: "Lonzu, coppa Corse, brocciu, figatellu (smoked liver sausage), miel de Corse AOP, chestnut flour, clémentine, the wild boar (sanglier) of the maquis.",
      tips: "Bastia market Saturday. Direct from Corsican charcutiers — Salaisons Ferrucci. Brocciu fresh only.",
      matchPatterns: [
        /corsican|corse|brocciu|lonzu|coppa.*corsican|figatellu/i,
        /chestnut|farina di castagne|châtaigne/i,
        /^myrtille|maquis|wild boar saddle|sanglier/i,
        /^miel|honey.*chestnut|honey.*sapin/i,
        /pecorino|pélardon|crottin/i, /clémentine|clementine/i,
      ],
      handpicked: [
        { name: "Brocciu Corse AOP (fresh ricotta)", note: "Sheep + goat whey · spring only — irreplaceable" },
        { name: "Lonzu (cured pork loin)", note: "Wild-acorn pig · 6-month cure" },
        { name: "Figatellu (smoked liver sausage)", note: "Winter only — grill or stew" },
        { name: "Miel de Corse AOP (chestnut)", note: "Deep amber · single-flora" },
        { name: "Chestnut flour", note: "Pulenda traditional polenta of Corsica" },
        { name: "Wild boar (sanglier) saddle", note: "Game season — Oct-Feb" },
      ],
    },

    { id: "venice-adriatic-north",
      label: "Venice · Trieste · Adriatic North",
      flag: "🇮🇹", region: "Adriatic",
      blurb: "Sant'Erasmo lagoon vegetables, moeche soft-shell crabs (in season), Chioggia fish auction, polenta bianca from Veneto, prosciutto San Daniele DOP, radicchio di Treviso.",
      tips: "Rialto Pescheria 06:00. Sant'Erasmo direct via farm boat. Casa del Parmigiano. Mascari for spices and dry store.",
      matchPatterns: [
        /^vialone nano|carnaroli|acquerello|riserva san massimo/i,
        /san daniele|prosciutto.*parma/i,
        /^bottarga.*muggine|^bottarga/i,
        /balsamic.*modena|tradizionale|giusti|leonardi/i,
        /castelmagno|asiago|parmigiano|grana padano/i,
        /^radicchio|trevisan|trevis/i,
      ],
      handpicked: [
        { name: "Vialone Nano (Riseria Ferron)", note: "Veneto risotto rice — for risotto al nero di seppia" },
        { name: "Soft-shell crab (moeche)", note: "Lagoon Mar-May and Oct-Nov only" },
        { name: "Prosciutto San Daniele DOP", note: "Friulian — sweeter than Parma" },
        { name: "Aceto Balsamico Tradizionale DOP", note: "12 or 25 yr · Modena · Giusti / Leonardi" },
        { name: "Radicchio di Treviso (in season)", note: "Late Dec-Feb · grill or braise" },
        { name: "Sant'Erasmo castraure (artichokes)", note: "Lagoon-grown · April only" },
      ],
    },

    { id: "norway-fjords",
      label: "Norway — Bergen · Lofoten · Tromsø",
      flag: "🇳🇴", region: "Atlantic North",
      blurb: "Wild Atlantic king crab, Lofoten cod (skrei) Jan-Apr, Røkt laks (cold-smoked salmon), salt cod (klippfisk), reindeer, cloudberry, sea buckthorn.",
      tips: "Bergen Fisketorget. Direct from Lofoten cooperatives for skrei (Jan-Apr).",
      matchPatterns: [
        /^king crab|norwegian|atlantic.*crab/i,
        /skrei|cod\b.*atlantic|atlantic cod|bacalao|stockfish|klippfisk/i,
        /smoked salmon.*norwegian|^scottish.*smoked/i,
        /^reindeer|^cloudberry|sea buckthorn|lingonberry/i,
        /langoustine|scampi/i,
      ],
      handpicked: [
        { name: "King crab legs (Norwegian)", note: "Wild Barents Sea — pre-cooked, frozen" },
        { name: "Skrei cod (Lofoten)", note: "Migratory Atlantic cod — Jan-Apr peak" },
        { name: "Cold-smoked salmon (røkt laks)", note: "Wild Atlantic · vac-packed slices" },
        { name: "Klippfisk (salt-dried cod)", note: "Needs 48h soak · for brandade" },
        { name: "Cloudberry jam (Lakka)", note: "Arctic specialty — pairs with cheese" },
        { name: "Reindeer fillet", note: "Sami producer · venison-like, leaner" },
      ],
    },

    { id: "iceland",
      label: "Iceland — Reykjavík · Vestmannaeyjar",
      flag: "🇮🇸", region: "North Atlantic",
      blurb: "Skyr, Icelandic langoustine (humar), Arctic char, glacier-fed lamb (sun-cured hangikjöt), birch syrup, rhubarb, sea salt from Saltverk.",
      tips: "Reykjavík fish market. Direct from Saltverk for sea salt.",
      matchPatterns: [
        /^skyr|íslensk|icelandic|íslenska/i,
        /^langoustine|^humar|^scampi/i,
        /^arctic char|sea trout/i,
        /^lamb leg|^lamb shoulder/i,
        /sea salt|fleur de sel|maldon/i,
      ],
      handpicked: [
        { name: "Skyr (Ísey / Siggi's)", note: "Icelandic strained yogurt · breakfast" },
        { name: "Icelandic langoustine (humar)", note: "Cold-water · cleanest flavour in the world" },
        { name: "Arctic char (bleikja)", note: "Lake-farmed · sashimi-grade salmon alternative" },
        { name: "Glacier-fed lamb leg", note: "Grass-fed, gamey, lean" },
        { name: "Saltverk flake salt", note: "Geothermally evaporated · pure" },
        { name: "Hangikjöt (smoke-cured lamb)", note: "Smoked over sheep dung — traditional · sliced thin" },
      ],
    },

    { id: "tahiti-polynesia",
      label: "French Polynesia — Tahiti · Bora Bora · Marquesas",
      flag: "🇵🇫", region: "Pacific",
      blurb: "Tahitian vanilla (the world's most prized), ahi tuna for poisson cru, coconut milk fresh-pressed, mahi mahi, breadfruit (uru), hearts of palm, monoï coconut oil.",
      tips: "Papeete market Sunday dawn. Direct from Marquesas vanilla farms.",
      matchPatterns: [
        /tahitian.*vanilla|^vanilla.*tahitian|polynesian/i,
        /ahi.*tuna|yellowfin|^bluefin|^hamachi/i,
        /coconut|aroy-d|chaokoh/i,
        /mahi mahi|^mahi/i, /breadfruit|hearts of palm/i,
        /lime|kaffir|key lime/i,
      ],
      handpicked: [
        { name: "Tahitian vanilla pods", note: "The world's most aromatic · for pastry + savoury" },
        { name: "Ahi (yellowfin) sashimi-grade", note: "Pacific · for poisson cru, tataki" },
        { name: "Coconut milk (Aroy-D UHT)", note: "For poisson cru tradition — lime + coconut" },
        { name: "Mahi mahi fillet", note: "Wild Pacific · pan-sear or grill" },
        { name: "Hearts of palm (palmito)", note: "Fresh if possible, jar backup" },
        { name: "Lime (Tahitian / Persian)", note: "For poisson cru cure" },
      ],
    },

    { id: "australia-east",
      label: "Australia — Sydney · Great Barrier Reef · Whitsundays",
      flag: "🇦🇺", region: "South Pacific",
      blurb: "Sydney rock oysters, Coffin Bay oysters, Moreton Bay bugs, Tasmanian ocean trout, wagyu (Mayura, Stone Axe), Yarra Valley vegetables, finger lime caviar, Murray cod.",
      tips: "Sydney Fish Market 06:00. Tasmanian seafood reps for ocean trout.",
      matchPatterns: [
        /^wagyu|tasmanian|australian/i,
        /finger lime|^fingerlime/i,
        /coffin bay|sydney rock|moreton bay/i,
        /^ocean trout|tasmanian salmon|ora king/i,
        /macadamia|^bush tomato|pepperberry/i,
      ],
      handpicked: [
        { name: "Tasmanian ocean trout (Petuna)", note: "Sashimi-grade · pink-orange flesh · cleaner than salmon" },
        { name: "Sydney rock oyster", note: "Smaller, sweet, mineral — eat raw" },
        { name: "Mayura Wagyu / Stone Axe Wagyu", note: "Australian full-blood · BMS 9+" },
        { name: "Finger lime (citrus caviar)", note: "Bursts pearl-like — for crudo + cocktails" },
        { name: "Moreton Bay bug (slipper lobster)", note: "Queensland · grilled, like a flat lobster tail" },
        { name: "Macadamia nuts (Queensland)", note: "Whole or chopped — for crusts + pastry" },
      ],
    },

    { id: "new-zealand",
      label: "New Zealand — Auckland · Bay of Islands · South Island",
      flag: "🇳🇿", region: "South Pacific",
      blurb: "Bluff oysters (in season Mar-Aug), Ora King salmon, green-lipped mussels, Manuka honey UMF 15+, Marlborough Sauvignon Blanc, hāngī, paua (abalone), South Island lamb.",
      tips: "Auckland Viaduct fish market. Comvita direct for Manuka.",
      matchPatterns: [
        /ora king salmon|^ora king/i,
        /^bluff oyster|^new zealand/i,
        /green-lipped mussel|mussel.*nz/i,
        /manuka|comvita|manuka health/i,
        /heilala|^paua|abalone/i,
        /^lamb.*new zealand|^lamb rack/i,
      ],
      handpicked: [
        { name: "Ora King salmon", note: "Premium NZ farmed — high fat, like fatty Atlantic" },
        { name: "Bluff oyster (Mar-Aug)", note: "Wild South Island deep-water · top oyster on Earth (debatable)" },
        { name: "Manuka honey (Comvita UMF 15+)", note: "Antibacterial — for desserts + medicine" },
        { name: "Green-lipped mussel", note: "Larger than blue mussels · steam or grill" },
        { name: "Heilala vanilla (Tonga / NZ)", note: "Alternative to Madagascar Bourbon" },
        { name: "NZ lamb rack (Te Mana / Coastal)", note: "Grass-fed · iconic" },
      ],
    },

    { id: "japan-coast",
      label: "Japan — Tokyo Bay · Seto Inland · Okinawa",
      flag: "🇯🇵", region: "Western Pacific",
      blurb: "Toyosu market for tuna, Hokkaido uni and scallops, Kobe/Matsusaka Wagyu, real wasabi root, soy sauces from Yuasa cedar casks, Mikawa hon-mirin, Setouchi sea bream.",
      tips: "Toyosu market Tokyo (visitors 05:30). Direct from Hokkaido for uni and Wagyu reps for Kobe.",
      matchPatterns: [
        /sashimi-grade|sashimi|saku/i,
        /^bluefin akami|chu-toro|^toro/i, /yellowfin|^ahi|^hamachi|kanpachi/i,
        /^uni\b|sea urchin/i, /hokkaido scallop|^ikejime/i,
        /^wagyu|kobe|matsusaka/i,
        /yamaroku|kishibori|kayanoya|wadaman|yakami/i,
        /miso|hatcho|saikyo|hon-mirin|sumiya bunjiro|mikawa/i,
        /^koshihikari|akita komachi|^sushi/i,
        /^nori|^kombu|katsuobushi|rausu|rishiri/i,
        /^matcha|sencha|hojicha|genmaicha/i,
        /yuzu|sudachi|kabosu|shichimi/i,
      ],
      handpicked: [
        { name: "Real wasabi root (Daio · Shizuoka)", note: "Fresh grated only — minutes after cut" },
        { name: "Bluefin akami + chu-toro", note: "Toyosu cut-date · sashimi-grade" },
        { name: "Uni (Hokkaido Grade A)", note: "Wood tray · Nov-Mar peak" },
        { name: "Hokkaido scallops (live in shell)", note: "Sashimi-grade · sweet, fat" },
        { name: "Yamaroku Tsurubishio shoyu", note: "Twice-brewed, cedar-cask aged" },
        { name: "Sumiya Bunjiro Mikawa Mirin (3-yr)", note: "Real hon-mirin · not aji-mirin" },
        { name: "Kobe / Matsusaka Wagyu", note: "BMS 11+ · 100 g per guest max" },
      ],
    },

    { id: "hong-kong-southchina",
      label: "Hong Kong · Macau · South China Sea",
      flag: "🇭🇰", region: "South China Sea",
      blurb: "Dried scallops (conpoy), XO sauce, Macanese fusion (Portuguese-Chinese), dim sum culture, Yangjiang dried oysters, premium soy sauces, Pearl River fish.",
      tips: "Sheung Wan dried seafood district. Lee Kum Kee for XO premium.",
      matchPatterns: [
        /^conpoy|dried scallop|^xo sauce|lee kum kee|lee wo sons/i,
        /^dried oyster|^dried shrimp|^dried abalone/i,
        /lap cheong|lap yuk|chinese.*sausage|cured pork/i,
        /shaoxing|hua diao chen|chinkiang|gold plum|hengshun/i,
        /^chenpi|tangerine peel|^star anise|^cassia/i,
        /^longjing|^pu'?er|^oolong|tieguanyin|da hong pao/i,
        /jamón ibérico|prosciutto/i, /^dim sum|^wonton|gyoza|xiao long bao/i,
      ],
      handpicked: [
        { name: "Dried scallop (conpoy) SS grade", note: "Hokkaido or Japanese · for XO sauce, stocks" },
        { name: "XO sauce (Lee Kum Kee Panda)", note: "Premium · dried scallop + shrimp + chili" },
        { name: "Shaoxing 20-yr aged Hua Diao Chen", note: "For drunken chicken + soy-braised dishes" },
        { name: "Aged Chinkiang vinegar (8-yr)", note: "Hengshun premium · for dim sum dipping" },
        { name: "Lap cheong + lap yuk", note: "Cured Chinese pork — Cantonese clay-pot rice" },
        { name: "Longjing Dragon Well (Mingqian)", note: "Pre-Qingming · Hangzhou green tea" },
      ],
    },

    { id: "southeast-asia",
      label: "Southeast Asia — Phuket · Bali · Singapore · Malaysia",
      flag: "🇹🇭", region: "Indo-Pacific",
      blurb: "Mae Ploy and Maesri curry pastes, Red Boat 40°N fish sauce, gula melaka palm sugar, gambas + lobster from the Andaman, fresh durian, mangosteen, rambutan, Bintan-cultured grouper.",
      tips: "Or Tor Kor market in Bangkok. Direct from Phuket fishmonger for grouper.",
      matchPatterns: [
        /^thai|^vietnamese|indonesian|malaysian|filipino/i,
        /red boat|megachef|squid brand|phu quoc/i,
        /mae ploy|maesri|nam prik|pantai/i,
        /^aroy-d|^chaokoh|coconut milk|coconut cream/i,
        /^palm sugar|gula melaka|jaggery/i,
        /tamarind|^pandan|^kaffir|^lemongrass|^galangal|banana leaf/i,
        /sriraja panich|huy fong|sriracha/i,
        /royal umbrella|jasmine|thai hom mali|black sticky/i,
        /lychee|longan|^durian|rambutan|coconut water/i,
        /^sambal|sambal oelek|belacan|kapi|terasi/i,
      ],
      handpicked: [
        { name: "Red Boat fish sauce 40°N+", note: "First-press · Vietnamese · single-pressing" },
        { name: "Mae Ploy red + green curry paste", note: "Industry standard · 14 oz tubs" },
        { name: "Mae Pranom nam prik pao", note: "Artisan Thai chili jam" },
        { name: "Thai Hom Mali jasmine rice (Royal Umbrella Gold)", note: "New crop only" },
        { name: "Gula melaka (palm sugar disc)", note: "Indonesian / Malaysian · for desserts + curries" },
        { name: "Aroy-D coconut milk UHT", note: "Best texture · 1L carton — no preservatives" },
      ],
    },

    { id: "vietnam-coast",
      label: "Vietnam — Ha Long Bay · Da Nang · Phú Quốc",
      flag: "🇻🇳", region: "South China Sea",
      blurb: "Red Boat 40°N from Phú Quốc, banh trang rice paper, Vietnamese coffee (Trung Nguyên), fresh herbs (rau ram, perilla), pho spices, condensed milk, dragonfruit.",
      tips: "Ben Thanh market in Saigon. Direct from Phú Quốc fish sauce producers.",
      matchPatterns: [
        /vietnamese|red boat|phu quoc|hung thanh/i,
        /banh trang|rice paper/i, /^trung nguyen|vietnamese coffee/i,
        /pho\b|^star anise|^cassia.*saigon/i,
        /^pandan|^kaffir|^lemongrass|^galangal/i,
        /condensed milk|longevity|tan tan/i,
      ],
      handpicked: [
        { name: "Red Boat 40°N fish sauce", note: "Phú Quốc · single-pressing first-extract" },
        { name: "Banh trang (rice paper) — Three Ladies", note: "22 cm rounds · spring rolls + summer rolls" },
        { name: "Vietnamese coffee (Trung Nguyên)", note: "Robusta-Arabica blend · for ca phe sua da" },
        { name: "Saigon cassia bark", note: "For pho — stronger than Ceylon" },
        { name: "Tan Tan condensed milk", note: "Vietnamese sweet · over coffee" },
        { name: "Fresh rau ram + perilla", note: "Vietnamese herbs · markets only" },
      ],
    },

    { id: "dubai-gulf",
      label: "Dubai · Abu Dhabi · Oman · Persian Gulf",
      flag: "🇦🇪", region: "Persian Gulf",
      blurb: "Iranian Bahraman saffron, dates (Medjool + Bahri jumbo), Lebanese pomegranate molasses (Mymouné), Iranian basmati Sadri, Persian dried lime (loomi), labneh, halloumi, mejdool.",
      tips: "Deira fish + spice souks. Direct from Iranian wholesale for Bahraman saffron.",
      matchPatterns: [
        /^iranian basmati|sadri|tarom|persian basmati/i,
        /bahraman|^saffron.*iranian|^saffron.*kashmir|mongra/i,
        /^medjool|^dates|deglet noor/i,
        /tahini|al arz|halawani|soom|karawan/i,
        /pomegranate molasses|cortas|mymouné/i,
        /^sumac|^za'atar|salloum/i,
        /advieh|harissa|ras el hanout/i,
        /^rose water|^orange blossom|^bulgur|^freekeh/i,
        /^loomi|dried lime|sahlab/i,
      ],
      handpicked: [
        { name: "Iranian Bahraman Negin saffron", note: "Long-thread Persian · the deepest red" },
        { name: "Medjool dates (jumbo)", note: "Stuff with mascarpone + pistachio" },
        { name: "Mymouné rose + orange-blossom water", note: "Lebanese single-distillate" },
        { name: "Iranian basmati Sadri (aged)", note: "For Persian rice pilaf with tahdig" },
        { name: "Loomi (Persian dried lime)", note: "Whole black + tan · for stews" },
        { name: "Al Arz tahini (Palestinian Humera sesame)", note: "Pourable, no fillers" },
      ],
    },

    { id: "maldives-indian-ocean",
      label: "Maldives · Seychelles · Mauritius",
      flag: "🇲🇻", region: "Indian Ocean",
      blurb: "Yellowfin tuna (skipjack + bigeye), reef snapper, coconut, breadfruit, Maldivian roshi flatbread, ladoos, Seychellois bouillon de poisson, Mauritian rougaille.",
      tips: "Direct from local fishermen at the marina each morning. Few imports — order ahead.",
      matchPatterns: [
        /yellowfin|^bigeye|^skipjack tuna|^ahi/i,
        /^red snapper|yellowtail snapper/i,
        /coconut|coconut milk|coconut cream/i,
        /^thai|coconut sugar|curry leaves/i,
        /^cumin|^coriander|^turmeric|^chili powder/i,
      ],
      handpicked: [
        { name: "Yellowfin tuna sashimi-grade", note: "Local fishermen direct · ahi quality" },
        { name: "Reef snapper (red / yellowtail)", note: "Whole · scaled, gutted, grilled banana leaf" },
        { name: "Coconut milk (Aroy-D)", note: "For curries · Maldivian + Mauritian" },
        { name: "Curry leaves (frozen / fresh)", note: "Mauritian Creole curry — essential" },
        { name: "Mauritian thyme + chili paste", note: "For rougaille tomato-onion sauce" },
      ],
    },

    { id: "south-africa",
      label: "South Africa — Cape Town · Western Cape",
      flag: "🇿🇦", region: "Atlantic / Indian Ocean",
      blurb: "Cape rock lobster (kreef), wild kingklip and yellowtail, biltong (Karoo lamb), rooibos, Mrs Ball's chutney, Stellenbosch wines, Cape Malay spice blends, Cape gooseberry.",
      tips: "V&A Waterfront markets. Direct from Karoo producers for biltong.",
      matchPatterns: [
        /rooibos|honeybush|south african/i,
        /^biltong|boerewors|bobotie|cape malay/i,
        /^peri-peri|nando's|^chakalaka/i,
        /mrs ball's|^chutney/i,
        /^spiny lobster|kingklip|yellowtail/i,
      ],
      handpicked: [
        { name: "Cape rock lobster tail (West Coast)", note: "Nov-Apr · Saldanha Bay" },
        { name: "Biltong (Karoo lamb)", note: "Air-dried coriander-cured · sliced thin" },
        { name: "Rooibos tea (Cape)", note: "Loose leaf · for service + smoking" },
        { name: "Cape Malay spice (bobotie)", note: "Curry-turmeric-cinnamon · for fragrant meat dishes" },
        { name: "Mrs Ball's Chutney (original)", note: "South African condiment classic" },
        { name: "Wagyu / Karoo lamb rack", note: "Stone Axe South Africa Wagyu, or Karoo lamb premium" },
      ],
    },

    { id: "cuba-bermuda",
      label: "Cuba · Bermuda · Bahamas Out Islands",
      flag: "🇨🇺", region: "Caribbean",
      blurb: "Mojo criollo, sofrito, Cuban black beans, ropa vieja, ham hocks, picadillo, malanga, plantains; Bermudian fish chowder + onion broth; Bahamian conch.",
      tips: "Old Havana market. Bermuda Friday fish market.",
      matchPatterns: [
        /^mojo|^sofrito|^adobo|^sazón|sazon|cuban|goya/i,
        /^plantain|^yuca|^cassava|^malanga/i,
        /black beans|pinto beans|frijoles negros/i,
        /^conch|^queen conch/i,
        /^bonito|^skipjack|^snapper|grouper/i,
        /^cohiba|^bacardi/i,
      ],
      handpicked: [
        { name: "Goya sofrito + mojo criollo", note: "Cuban marinade base · garlic-citrus-cumin" },
        { name: "Cuban black beans (dried, heirloom)", note: "For arroz con frijoles negros" },
        { name: "Sazón Tropical (Loisa or Goya)", note: "Achiote-coriander-garlic blend" },
        { name: "Bermudian dark rum + bitters", note: "For fish chowder finish" },
        { name: "Conch (Bahamian)", note: "For salads, fritters, chowder · live or frozen" },
        { name: "Green + yellow plantain", note: "Tostones + maduros essential" },
      ],
    },

    { id: "brazil-bahia",
      label: "Brazil — Bahia · Rio · Búzios",
      flag: "🇧🇷", region: "South Atlantic",
      blurb: "Dendê palm oil (Bahian RSPO), coconut milk for moqueca, pão de queijo, açaí pulp, picanha + cachaça, mandioca + farofa, malagueta peppers.",
      tips: "Mercado Municipal Salvador for dendê + acarajé. Açaí direct from Sambazon.",
      matchPatterns: [
        /^dendê|^dende|red palm oil|brazilian/i,
        /açaí|sambazon|açai roots/i,
        /^cachaça|leblon|yaguara|avuá/i,
        /^farinha de mandioca|tapioca|polvilho|pão de queijo/i,
        /^picanha|^churrasco|sal grosso/i,
        /coconut milk|aroy-d/i,
      ],
      handpicked: [
        { name: "Dendê palm oil (Bahian RSPO)", note: "For moqueca + acarajé · single-source" },
        { name: "Picanha (rump cap)", note: "Brazilian barbecue cut · whole, fat cap on" },
        { name: "Polvilho azedo (sour tapioca starch)", note: "For pão de queijo only" },
        { name: "Açaí pulp (Sambazon, frozen)", note: "Pure · no sugar added" },
        { name: "Cachaça (Avuá Amburana)", note: "For caipirinha + cooking" },
        { name: "Malagueta paste (Brazilian)", note: "Pimenta-de-cheiro · table sauce" },
      ],
    },
  ];

  function activePort(portId) {
    return ports.find(p => p.id === portId) || null;
  }
  function itemMatchesPort(item, portId) {
    const p = activePort(portId);
    if (!p || !p.matchPatterns) return false;
    const text = (item.name + " " + (item.brand || ""));
    return p.matchPatterns.some(re => re.test(text));
  }

  return {
    enrichItem,
    profiles,
    seasonRules: season,
    allergenRules: allergens,
    portionRules: portions,
    ports,
    activePort,
    itemMatchesPort,
  };
})();
