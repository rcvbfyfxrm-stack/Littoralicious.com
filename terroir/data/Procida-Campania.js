/* Terroir — Procida · Gulf of Naples · Campania — hand-built August 2026 */
window.TERROIR_DATA = (function () {
  const COLORS = {
    "berth":     "#c4a35a",
    "market":    "#d97706",
    "shop":      "#059669",
    "mainland":  "#7c3aed",
    "logistics": "#2d4a5e"
  };
  const CAT_LABELS = {
    "berth":     "Signature",
    "market":    "Market / Direct",
    "shop":      "Restaurant / Bar",
    "mainland":  "Mainland / Out of town",
    "logistics": "Logistics"
  };
  const PRODUCT_COLORS = {
    "Seafood":    "#3b82f6",
    "Rabbit":     "#a16207",
    "Gelato":     "#d97706",
    "Bar":        "#7c3aed",
    "Limoncello": "#65a330",
    "Pastry":     "#92400e",
    "Wine":       "#7c2d12",
    "Catch":      "#1d6fa4",
    "Urchin":     "#0f766e",
    "Cocktail":   "#9333ea"
  };

  const VENUES = [
    {
      "id": "v01-caracale",
      "cat": "shop",
      "tier": "berth_top",
      "priority": 1,
      "badge": "Seafood",
      "name": "Caracalè",
      "short": "Caracalè",
      "lat": 40.7693,
      "lng": 13.9860,
      "neighborhood": "Marina di Corricella — Via Marina Corricella 62, in a restored fisherman's boat depot at the water's edge",
      "tags": [
        "€40–65 pp à la carte",
        "Essential in season — book weeks ahead in July-August; May and October accessible",
        "Lunch and dinner; terrace right on the Corricella dock"
      ],
      "productTags": ["Seafood", "Urchin"],
      "verdict": "The one Corricella table locals rank above the view-chasing crowd — the former boat depot is authentic where every other address is scenic.",
      "signature": "Spaghetti ai ricci di mare — briny sea-urchin cream, barely set, against pasta cooked one minute short of done.",
      "person": "The family proprietors who restored a historic fishermen's boat depot into Procida's most celebrated kitchen.",
      "signal_chip": {
        "label": "Procida #1 · 2024–25",
        "full": "Top-ranked Procida restaurant on TripAdvisor, ProcidaInsider and VisitProcida · 2024–2025",
        "cosign": "Verified: ProcidaInsider, VisitProcida 2025 · tripadvisor.com 2026"
      },
      "caveat": "Corricella tables fill weeks ahead in July-August; come in May or October for a walk-in shot. The dock terrace is the draw — indoor tables lose the harbour.",
      "why": "The most celebrated address at Marina di Corricella and on Procida as a whole; housed in a historic fishermen's boat depot beautifully restored. To order: spaghetti ai ricci di mare — briny sea-urchin cream against barely set pasta — or the refined seafood antipasto to share. Verified #1 Procida restaurant on TripAdvisor, ProcidaInsider and VisitProcida 2024–25. Books solid in July-August; May and October are the months to walk in.",
      "address": "Via Marina Corricella 62, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch and dinner; summer-season terrace; verify winter hours",
      "maps": "https://www.google.com/maps/search/?api=1&query=Caracalè+Procida"
    },
    {
      "id": "v02-la-medusa",
      "cat": "shop",
      "tier": "berth_top",
      "priority": 2,
      "badge": "Seafood",
      "name": "La Medusa",
      "short": "La Medusa",
      "lat": 40.7748,
      "lng": 13.9926,
      "neighborhood": "Marina Grande — Via Roma 116, the main harbour strip at the island's northeast port",
      "tags": [
        "€30–50 pp",
        "Walk-in or call; the menu is whatever the boats brought in that morning",
        "Lunch and dinner"
      ],
      "productTags": ["Catch", "Urchin"],
      "verdict": "The living legend of Marina Grande, open since 1954 — not the most scenic terrace, the most honest kitchen on the island.",
      "signature": "Pasta alla pescatora povera — fried green hot peppers, anchovies and clam broth tossed with pasta, the fishermen's version before tourism arrived.",
      "person": "Twin brothers Marco and Luca, who have run La Medusa since inheriting it from the family that opened in 1954.",
      "signal_chip": {
        "label": "Est. 1954 · Marina Grande",
        "full": "One of the oldest continuously operating restaurants on Procida, since 1954 · confirmed ProcidaInsider, Yelp (updated Feb 2026)",
        "cosign": "ProcidaInsider 2025 · yelp.com updated Feb 2026"
      },
      "caveat": "The menu is whatever arrived on the morning boats — no à la carte guarantee; come early for the best fish. A working-harbour room, not a designed terrace.",
      "why": "Opened 1954; run by twin brothers Marco and Luca at Via Roma 116 on the Marina Grande quay. To order: pasta alla pescatora povera — the old fishermen's combination of fried green peppers, anchovies and clam broth — or spaghetti con ricci in season. One of the oldest restaurants on the island, verified on ProcidaInsider and Yelp (updated February 2026). Cash and the morning's catch; no fixed menu.",
      "address": "Via Roma 116, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch and dinner; menu changes daily with the catch",
      "maps": "https://www.google.com/maps/search/?api=1&query=La+Medusa+Procida+Via+Roma"
    },
    {
      "id": "v03-crescenzo",
      "cat": "shop",
      "tier": "berth_top",
      "priority": 3,
      "badge": "Rabbit",
      "name": "Ristorante Crescenzo",
      "short": "Crescenzo",
      "lat": 40.7590,
      "lng": 13.9750,
      "neighborhood": "Marina Chiaiolella — at the harbour centre on the island's quiet southwestern side",
      "tags": [
        "€30–50 pp",
        "Open for lunch and dinner; bookings accepted",
        "Lunch for the rabbit, in the harbour terrace"
      ],
      "productTags": ["Rabbit", "Seafood"],
      "verdict": "The one table to eat coniglio alla procidana as it was always cooked — not the harbourfront drama, the rabbit. Locals at Chiaiolella rate it above anything at Corricella for this single dish.",
      "signature": "Coniglio alla procidana — island rabbit braised with lemon zest, fresh tomato, white wine and rosemary until the sauce binds to the bone.",
      "person": "The Crescenzo family (Ciro and relatives), running the restaurant and adjoining hotel since 1953.",
      "signal_chip": {
        "label": "Est. 1953 · Chiaiolella",
        "full": "Family restaurant since 1953; recommended as Procida's definitive coniglio alla procidana · ProcidaInsider, VisitProcida 2025",
        "cosign": "ProcidaInsider · VisitProcida · tripadvisor.com 2025"
      },
      "caveat": "Chiaiolella is a 15-minute walk from Corricella or a short moped ride; this is a working neighbourhood trattoria, not a Corricella set-piece. The rabbit is the reason to come.",
      "why": "Family restaurant since 1953 at Marina Chiaiolella, run by the Crescenzo family (Ciro and relatives). To order: coniglio alla procidana — island rabbit braised with lemon zest, tomato, wine and rosemary — and the ravioli al sugo di coniglio (pasta filled and sauced with rabbit). Also does pasta al limone di Procida. Confirmed by ProcidaInsider and VisitProcida as Procida's definitive rabbit kitchen. Hotel-restaurant, so it keeps reliable hours.",
      "address": "Via Marina Chiaiolella, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch and dinner; hotel-restaurant keeps reliable hours",
      "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Crescenzo+Procida+Chiaiolella"
    },
    {
      "id": "v04-gorgonia",
      "cat": "shop",
      "tier": "several",
      "priority": 4,
      "badge": "Seafood",
      "name": "Ristorante Gorgonia",
      "short": "Gorgonia",
      "lat": 40.7695,
      "lng": 13.9863,
      "neighborhood": "Marina di Corricella — on the dock, a few doors from Caracalè",
      "tags": [
        "€35–55 pp",
        "Book ahead in July-August; walk-in possible in shoulder season",
        "Lunch and dinner"
      ],
      "productTags": ["Seafood"],
      "verdict": "The neighbour everyone overlooks because Caracalè got the press — which makes it the better walk-in in peak season.",
      "signature": "Frittura di calamari — rings fried so briefly the batter catches colour before the squid tightens, served without sauce.",
      "person": "Family owners at Marina di Corricella, running one of the harbour's longest-established kitchens.",
      "signal_chip": {
        "label": "Corricella institution",
        "full": "Family-run Corricella restaurant, highly rated on TripAdvisor and recommended by multiple Procida travel guides 2024–25",
        "cosign": "TripAdvisor 2025 · wanderlog.com · procidainsider.com"
      },
      "caveat": "Tables on the waterfront are the draw; the interior loses the harbour. Close to Caracalè — if one is full, walk three doors.",
      "why": "Family-run fish kitchen at Marina di Corricella, highly rated for fresh seafood and home-style execution. To order: the frittura di calamari, or the daily fresh-fish secondo; also recommended for seafood pasta and grilled fish platters. A near-neighbour of Caracalè that draws less international attention — and therefore has more tables available in August. Verified TripAdvisor, wanderlog and ProcidaInsider.",
      "address": "Marina di Corricella, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch and dinner",
      "maps": "https://www.google.com/maps/search/?api=1&query=Ristorante+Gorgonia+Procida+Corricella"
    },
    {
      "id": "v05-la-lampara",
      "cat": "shop",
      "tier": "several",
      "priority": 5,
      "badge": "Seafood",
      "name": "La Lampara",
      "short": "La Lampara",
      "lat": 40.7697,
      "lng": 13.9866,
      "neighborhood": "Above Marina di Corricella — terrace of Hotel La Corricella, overlooking the harbour",
      "tags": [
        "€35–55 pp",
        "Book for the terrace in season; hotel guests have priority",
        "Dinner for the dusk light on the harbour"
      ],
      "productTags": ["Seafood"],
      "verdict": "The Corricella table with the best elevated view — not at water level but above it, where the full pastel arc of the harbour opens below you.",
      "signature": "Fusilli napoletani con cozze, pesto di limone e provolone del Monaco — three Campanian textures on one fork: mussel brine, sharp lemon oil, aged sheep's cheese.",
      "person": "The La Corricella hotel, which runs the restaurant on the elevated terrace overlooking the fishing harbour.",
      "signal_chip": {
        "label": "Hotel terrace, Corricella",
        "full": "La Lampara is part of Hotel La Corricella; breezy elevated terrace overlooking Marina di Corricella · verified ProcidaInsider, VisitProcida 2025",
        "cosign": "ProcidaInsider · VisitProcida · procidainsider.com 2025"
      },
      "caveat": "Attached to the hotel — non-guests sometimes get squeezed out on busy evenings. Come for dusk, not for a 2pm lunch booking.",
      "why": "Hotel La Corricella's restaurant on a breezy terrace perched above Marina di Corricella, with the full pastel arc of the harbour visible below. To order: fusilli napoletani con cozze, pesto di limone e provolone del Monaco — mussels, lemon pesto and aged provolone del Monaco cheese. Also recommended for fish pasta and grilled catch. The elevated position makes this the best sunset table in Corricella. Verified ProcidaInsider and VisitProcida 2025.",
      "address": "Hotel La Corricella, Via Marina Corricella, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch and dinner; sunset terrace is the draw",
      "maps": "https://www.google.com/maps/search/?api=1&query=La+Lampara+Hotel+La+Corricella+Procida"
    },
    {
      "id": "v06-locanda-del-postino",
      "cat": "shop",
      "tier": "several",
      "priority": 6,
      "badge": "Seafood",
      "name": "La Locanda del Postino",
      "short": "La Locanda del Postino",
      "lat": 40.7692,
      "lng": 13.9858,
      "neighborhood": "Marina di Corricella — on the waterfront",
      "tags": [
        "€30–45 pp",
        "Book ahead in peak season",
        "Lunch and dinner"
      ],
      "productTags": ["Seafood"],
      "verdict": "The Corricella table that earns the Il Postino name without coasting on it — fresh pasta and local shellfish, honestly priced for the harbour location.",
      "signature": "Tagliatelle con gamberi e fiori di zucca — fresh pasta, Procida prawns, zucchini blossom and a squeeze of island lemon, the simplest summer plate.",
      "person": "The proprietors of La Locanda del Postino, operating at Marina di Corricella.",
      "signal_chip": {
        "label": "VisitProcida recommended",
        "full": "Listed and recommended by VisitProcida.com as a top Corricella restaurant · 2025–2026",
        "cosign": "visitprocida.com 2025"
      },
      "caveat": "The Il Postino film was shot partly on Salina (Sicily) — Procida's contribution is mostly the aesthetics, not a specific filming location at this restaurant. Come for the food, not the movie pilgrimage.",
      "why": "A charming Corricella waterfront restaurant with a warm atmosphere and authentic seafood cooking. To order: tagliatelle con gamberi e fiori di zucca, or spaghetti alle vongole. Listed by VisitProcida.com among the island's top addresses. The Il Postino name is a nod to the 1994 Massimo Troisi film that gave Procida global visibility; note the film was shot partly on Salina (Sicily). Book ahead in July-August.",
      "address": "Via Marina Corricella, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch and dinner",
      "maps": "https://www.google.com/maps/search/?api=1&query=La+Locanda+del+Postino+Procida"
    },
    {
      "id": "v07-a-chiaiuledd",
      "cat": "shop",
      "tier": "several",
      "priority": 7,
      "badge": "Seafood",
      "name": "A Chiaiuledd",
      "short": "A Chiaiuledd",
      "lat": 40.7588,
      "lng": 13.9747,
      "neighborhood": "Chiaiolella — the small harbour on the island's quieter southwest side",
      "tags": [
        "€30–45 pp",
        "Reservations accepted; walk-in possible",
        "Lunch with harbour views"
      ],
      "productTags": ["Seafood", "Urchin"],
      "verdict": "The Chiaiolella table worth the walk from Corricella — Alfonso and his wife run it with the sort of welcome that a Corricella address at twice the price cannot reproduce.",
      "signature": "Antipasto di mare — raw sea urchin, octopus carpaccio and marinated anchovies on one cold stone plate, a catalogue of the island's sea.",
      "person": "Alfonso and his wife, who run A Chiaiuledd at the Chiaiolella harbour.",
      "signal_chip": {
        "label": "Chiaiolella family kitchen",
        "full": "Run by Alfonso and wife; recommended for fresh ingredients, gluten-free options and personal service · mindtrip.ai 2025",
        "cosign": "mindtrip.ai 2025 · verified Chiaiolella location"
      },
      "caveat": "Chiaiolella is a 20-minute walk from Corricella through the island interior. The harbour is quieter — precisely why it's worth the detour.",
      "why": "Run by Alfonso and his wife at the small Chiaiolella harbour. To order: the antipasto di mare — raw sea urchin, octopus carpaccio, marinated anchovies — or spaghetti con limone e ricci. Known for accommodating gluten-free requirements without extra charge, and for personal service that mirrors the quieter side of the island it occupies. Chiaiolella is the residential harbour away from tourist pressure. Verified mindtrip.ai 2025.",
      "address": "Marina di Chiaiolella, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch; dinner in peak season",
      "maps": "https://www.google.com/maps/search/?api=1&query=A+Chiaiuledd+Procida+Chiaiolella"
    },
    {
      "id": "v08-il-galeone",
      "cat": "shop",
      "tier": "plenty",
      "priority": 8,
      "badge": "Seafood",
      "name": "Il Galeone",
      "short": "Il Galeone",
      "lat": 40.7593,
      "lng": 13.9751,
      "neighborhood": "Marina Chiaiolella — Via Marina Chiaiolella 54, directly on the waterfront",
      "tags": [
        "€25–40 pp",
        "Walk-in or book",
        "Lunch and dinner; harbour terrace"
      ],
      "productTags": ["Seafood"],
      "verdict": "The Chiaiolella harbourfront table that's good for a long lunch in the sun — stay with the fried fish and the sea view.",
      "signature": "Frittura mista di paranza — mixed rockfish fry, the smallest inshore catch, dusted in flour and fried in olive oil to a paperweight crisp.",
      "person": "The proprietors of Il Galeone at Via Marina Chiaiolella 54.",
      "signal_chip": {
        "label": "Via Marina Chiaiolella 54",
        "full": "4.2 stars, 302 reviews · 'excellent restaurant in Chiaiolella with cozy location, wonderful sea view' · Yelp updated May 2026",
        "cosign": "yelp.com updated May 2026 · tripadvisor.com 2025"
      },
      "caveat": "Il Galeone also does pizza — stay with the fried fish and the seafood plates; skip the tourist-oriented options. The harbour view is the real point.",
      "why": "At Via Marina Chiaiolella 54 on the waterfront of the island's quiet harbour. 4.2 stars and 302 reviews on Yelp (updated May 2026), described as 'excellent with a wonderful sea view and characteristic small harbour.' To order: frittura mista di paranza — the rockfish fry — or the day's grilled fish. The restaurant also does pizza (ignore). Verified Yelp May 2026 and TripAdvisor 2025.",
      "address": "Via Marina Chiaiolella 54, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Lunch and dinner",
      "maps": "https://www.google.com/maps/search/?api=1&query=Il+Galeone+Via+Marina+Chiaiolella+Procida"
    },
    {
      "id": "v09-bar-dal-cavaliere",
      "cat": "shop",
      "tier": "plenty",
      "priority": 9,
      "badge": "Pastry",
      "name": "Bar dal Cavaliere",
      "short": "Bar dal Cavaliere",
      "lat": 40.7752,
      "lng": 13.9921,
      "neighborhood": "Marina Grande — the main piazza at the island's northeast ferry port",
      "tags": [
        "€2–8 (coffee, pastry, granita)",
        "Walk-in",
        "Early morning before the hydrofoils fill up"
      ],
      "productTags": ["Pastry"],
      "verdict": "The historic bar of the Marina Grande piazza — the first and last place you pass through on Procida; the sfogliatella is the correct breakfast.",
      "signature": "Sfogliatella riccia — flaky shell pastry crammed with semolina, ricotta and candied peel, warm from the oven, consumed standing at the zinc.",
      "person": "Founded in the 1960s; since the 1980s run in partnership by Vincenzo Retaggio, Luigi Peruffo and Gennaro Scotto di Ciccariello.",
      "signal_chip": {
        "label": "Est. 1960s · Marina Grande",
        "full": "Bar dal Cavaliere, historic bar and pastry shop on the main Marina Grande square since the 1960s · confirmed VisitProcida, saporedicampania.it",
        "cosign": "visitprocida.com · saporedicampania.it"
      },
      "caveat": "The main square is transit-heavy in summer — the bar fills with day-trippers between the 9am and 10am hydrofoils. Come at 07:00 or 07:30.",
      "why": "Historic bar and pastry shop in the main piazza of Marina Grande, founded in the 1960s and in partnership since the 1980s (Vincenzo Retaggio, Luigi Peruffo, Gennaro Scotto di Ciccariello). The first caffè stop after disembarking and the last before boarding. To order: sfogliatella riccia, the Neapolitan flaky pastry shell filled with semolina and ricotta, warm from the oven. Also does granita al limone in summer. Confirmed by VisitProcida and saporedicampania.it.",
      "address": "Piazza dei Martiri, Marina Grande, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Early morning onwards; closed roughly late afternoon",
      "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Dal+Cavaliere+Procida+Marina+Grande"
    },
    {
      "id": "v10-bar-grottino",
      "cat": "shop",
      "tier": "plenty",
      "priority": 10,
      "badge": "Gelato",
      "name": "Snack Bar Gelateria Il Grottino",
      "short": "Bar Grottino",
      "lat": 40.7750,
      "lng": 13.9923,
      "neighborhood": "Marina Grande — seafront bar at the harbour since 1967",
      "tags": [
        "€2–6 (gelato, granita, drinks)",
        "Walk-in",
        "Afternoon — for the granita al limone on the harbour"
      ],
      "productTags": ["Gelato"],
      "verdict": "The family gelato bar that has served the harbour since 1967 — not a destination, but the granita al limone is the flavour of the island in a cup.",
      "signature": "Granita al limone di Procida — shaved ice of the island's IGP lemon, barely sweetened, with the essential oil of the zest in every mouthful.",
      "person": "Marco Scotto di Monaco, who runs it with siblings; their father Michele founded the bar in 1967.",
      "signal_chip": {
        "label": "Est. 1967 · family-run",
        "full": "Founded 1967 by Michele Scotto di Monaco; now run by son Marco and siblings · confirmed Facebook (Snack Bar Gelateria Il Grottino Procida) · ilgolfo24.it",
        "cosign": "ilgolfo24.it · facebook.com/bargrottinoprocida"
      },
      "caveat": "A small seaside bar, not a serious artisan gelateria. The draw is the granita al limone di Procida and the family continuity since 1967, not a menu of 40 flavours.",
      "why": "Founded 1967 by Michele Scotto di Monaco; now run by son Marco with his brother Leonardo and sister Maria. A small gelato bar at the Marina Grande harbourfront. To order: the granita al limone di Procida — island IGP lemon granita, barely sweetened, the zest oil in every grain. Not an artisan gelateria but an island institution since three generations back. Confirmed by ilgolfo24.it and the bar's own Facebook page.",
      "address": "Marina Grande, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Afternoon and evening; summer season",
      "maps": "https://www.google.com/maps/search/?api=1&query=Bar+Grottino+Procida+Marina+Grande"
    },
    {
      "id": "v11-felice-mare",
      "cat": "shop",
      "tier": "plenty",
      "priority": 11,
      "badge": "Cocktail",
      "name": "Felice Mare",
      "short": "Felice Mare",
      "lat": 40.7698,
      "lng": 13.9867,
      "neighborhood": "Marina di Corricella — the cocktail bar at the harbour, known for granita and aperitivo",
      "tags": [
        "€6–12 (cocktails, granita, spritz)",
        "Walk-in; standing room only on peak summer evenings",
        "Aperitivo — the hour before dinner"
      ],
      "productTags": ["Cocktail", "Limoncello"],
      "verdict": "The best cocktail bar at Corricella — famous for the limoncello spritz and the granita al limone at the hour when the light turns gold on the pastel houses.",
      "signature": "Limoncello spritz — local prosecco, artisanal Procida limoncello, a strip of candied lemon peel resting on the rim, nothing else.",
      "person": "The proprietors of Felice Mare at Marina di Corricella.",
      "signal_chip": {
        "label": "Best Corricella cocktail bar",
        "full": "Named Corricella's best cocktail bar; famous for granita al limone and limoncello spritz · ProcidaInsider 2025",
        "cosign": "ProcidaInsider 2025"
      },
      "caveat": "Standing room only on peak August evenings from about 18:00 — Corricella's entire summer crowd converges on the aperitivo hour. Come early or stake a spot.",
      "why": "The confirmed best cocktail bar at Marina di Corricella, named by ProcidaInsider 2025 for its excellent granita al limone and drinks including the limoncello spritz. To order: a limoncello spritz — local prosecco, artisanal Procida limoncello, candied peel — or the house granita al limone. Corricella's aperitivo venue: the light hits the pastel houses perfectly at the 18:00–19:30 window. Standing room in peak July-August evenings.",
      "address": "Marina di Corricella, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Afternoon and aperitivo hour; later in summer",
      "maps": "https://www.google.com/maps/search/?api=1&query=Felice+Mare+Procida+Corricella"
    },
    {
      "id": "v12-agre-procida",
      "cat": "market",
      "tier": "plenty",
      "priority": 12,
      "badge": "Limoncello",
      "name": "AGRE Procida — SCORZA Limoncello",
      "short": "AGRE / SCORZA",
      "lat": 40.7749,
      "lng": 13.9919,
      "neighborhood": "Marina Grande area — available direct and at island shops",
      "tags": [
        "€15–25 per bottle (artisanal, small batch)",
        "Buy at the producer or at selected shops near Marina Grande",
        "Takeaway — the one bottle worth carrying home"
      ],
      "productTags": ["Limoncello"],
      "verdict": "The artisanal limoncello to carry home — not the airport bottle, the one actually made on the island from Procida IGP fruit using traditional cold-maceration.",
      "signature": "SCORZA — lemon rind essential oils cold-macerated in neutral spirit, never heated; intensely floral with a clean finish that the mass producers' heat process destroys.",
      "person": "AGRE Procida, the artisanal producer of SCORZA limoncello from Procida IGP lemons.",
      "signal_chip": {
        "label": "Procida IGP lemons · cold-maceration",
        "full": "SCORZA limoncello by AGRE Procida — produced exclusively from Procida IGP lemons with cold-maceration, traditional method · verified agreprocida.com",
        "cosign": "agreprocida.com (SCORZA product page) · bottleofitaly.com"
      },
      "caveat": "Small batches — not always in stock. The island shops near Marina Grande carry it; call ahead for direct purchase. The tourist-grade limoncello at the port kiosks is not this product.",
      "why": "AGRE Procida produces SCORZA limoncello exclusively from Procida IGP lemons — the sfusato procidano cultivar, harvested for its thick rind dense in essential oils — using cold maceration of the peel in neutral spirit, never heated, to preserve the floral profile the industrial process destroys. To order (or rather, to take home): a 700ml bottle of SCORZA. Verified on agreprocida.com and bottleofitaly.com. Distinguish from the mass-produced limoncello sold at port kiosks.",
      "address": "Available at island shops; Marina Grande area, 80079 Procida (NA)",
      "phone": "—",
      "hours": "Check availability with island shops near Marina Grande",
      "maps": "https://www.google.com/maps/search/?api=1&query=AGRE+Procida+limoncello"
    }
  ];

  const NEIGHBORHOODS = [
    {
      "id": "n-marina-grande",
      "name": "Marina Grande",
      "center": [40.7752, 13.9924],
      "radius": 250,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida"
    },
    {
      "id": "n-marina-di-corricella",
      "name": "Marina di Corricella",
      "center": [40.7694, 13.9862],
      "radius": 200,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Corricella+Procida"
    },
    {
      "id": "n-terra-murata",
      "name": "Terra Murata",
      "center": [40.7735, 13.9885],
      "radius": 180,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida"
    },
    {
      "id": "n-marina-chiaiolella",
      "name": "Marina Chiaiolella",
      "center": [40.7591, 13.9749],
      "radius": 200,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Chiaiolella+Procida"
    },
    {
      "id": "n-vivara",
      "name": "Vivara (nature reserve island)",
      "center": [40.7540, 13.9638],
      "radius": 150,
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+Procida"
    }
  ];

  const WALKS = [
    {
      "id": "w-corricella-terra-murata",
      "name": "Corricella to Terra Murata — the evening ascent",
      "start": [40.7694, 13.9862],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Procida+belvedere"
    },
    {
      "id": "w-marina-grande-circuit",
      "name": "Marina Grande through the island heart to Chiaiolella",
      "start": [40.7752, 13.9924],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Procida+island+walk+Via+Libertà"
    },
    {
      "id": "w-vivara-bridge",
      "name": "Bridge to Vivara — the dawn walk on the volcanic crater island",
      "start": [40.7558, 13.9652],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Vivara+Procida+bridge+nature+reserve"
    },
    {
      "id": "w-chiaia-steps",
      "name": "Via Pizzaco to Spiaggia della Chiaia — the 183 steps",
      "start": [40.7668, 13.9807],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Chiaia+Procida+steps"
    }
  ];

  const WORK_SPOTS = [
    {
      "id": "p-work-bar-dal-cavaliere",
      "name": "Bar dal Cavaliere — Marina Grande morning tables",
      "start": [40.7752, 13.9921]
    },
    {
      "id": "p-work-terra-murata-belvedere",
      "name": "Terra Murata belvedere — bench above the island",
      "start": [40.7735, 13.9885]
    },
    {
      "id": "p-work-corricella-dock",
      "name": "Corricella harbour (morning, before the crowds, with an espresso)",
      "start": [40.7694, 13.9862]
    }
  ];

  const LANDMARKS = [
    {
      "id": "l-beach-chiaia",
      "name": "Spiaggia della Chiaia",
      "coords": [40.7661, 13.9802],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+della+Chiaia+Procida"
    },
    {
      "id": "l-beach-ciraccio",
      "name": "Spiaggia Ciraccio (Chiaiolella)",
      "coords": [40.7582, 13.9762],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Ciraccio+Procida+Chiaiolella"
    },
    {
      "id": "l-beach-pozzo-vecchio",
      "name": "Spiaggia del Pozzo Vecchio (Il Postino beach)",
      "coords": [40.7706, 13.9817],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Spiaggia+Pozzo+Vecchio+Procida"
    },
    {
      "id": "l-beach-corricella-swim",
      "name": "Corricella swimming rocks — below the harbour wall",
      "coords": [40.7690, 13.9850],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Corricella+Procida+swimming"
    },
    {
      "id": "l-cult-terra-murata",
      "name": "Terra Murata & Castello d'Avalos",
      "coords": [40.7737, 13.9883],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Terra+Murata+Castello+d'Avalos+Procida"
    },
    {
      "id": "l-cult-abbazia-san-michele",
      "name": "Abbazia di San Michele Arcangelo",
      "coords": [40.7740, 13.9881],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Abbazia+San+Michele+Arcangelo+Procida"
    },
    {
      "id": "l-cult-corricella-harbour",
      "name": "Marina di Corricella — the pastel fishing harbour",
      "coords": [40.7694, 13.9862],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+di+Corricella+Procida"
    },
    {
      "id": "l-cult-il-postino-location",
      "name": "Spiaggia del Pozzo Vecchio — Il Postino (1994) filming location",
      "coords": [40.7706, 13.9817],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Pozzo+Vecchio+beach+Procida+Il+Postino"
    },
    {
      "id": "l-prod-mercato-via-roma",
      "name": "Mercato rionale di Via Roma — the daily fish and produce market",
      "coords": [40.7746, 13.9921],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=mercato+Via+Roma+Procida"
    },
    {
      "id": "l-cult-vivara",
      "name": "Isola di Vivara — volcanic nature reserve",
      "coords": [40.7540, 13.9640],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Isola+Vivara+Procida+nature+reserve"
    },
    {
      "id": "l-cult-marina-grande",
      "name": "Marina Grande — the working port",
      "coords": [40.7752, 13.9924],
      "maps_url": "https://www.google.com/maps/search/?api=1&query=Marina+Grande+Procida+porto"
    }
  ];

  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS };
})();
