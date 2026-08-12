/* Terroir — Istanbul · Boğaziçi — data v2.
   v1 shipped TABLES as {groups:[...]}, which the organised-tables renderer cannot read
   (it looks up TABLES.grande / TABLES.petite), so the inventory silently fell back to flat
   tier lists. v2 emits the correct shape AND the rich venue fields (dishes, signal_chip,
   person, signature, verdict, caveat, hours) that the card expansion is gated on.
   PIN POLICY unchanged: only street-level geocodes carry lat/lng. */
window.TERROIR_DATA = (function () {
  const COLORS = {"berth": "#2d4a5e", "market": "#d97706", "shop": "#059669", "mainland": "#7c3aed", "logistics": "#2d4a5e"};
  const CAT_LABELS = {"berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar", "mainland": "Out of town", "logistics": "Logistics"};
  const PRODUCT_COLORS = {"Michelin": "#7f1d1d", "Meyhane": "#1f2937", "Ocakbaşı": "#dc2626", "Wine": "#7c2d12", "Coffee": "#92400e", "Jazz": "#0ea5e9", "Listening": "#3b82f6", "Collective": "#7c3aed", "Rooftop": "#a16207", "Opening": "#059669", "Since-19xx": "#a16207"};
  const VENUES = [
 {
  "id": "turk-fatih-tutak",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 1,
  "name": "TURK Fatih Tütak",
  "short": "TURK Fatih Tütak",
  "neighborhood": "Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=TURK+Fatih+T%C3%BCtak+Istanbul",
  "signal_chip": {
   "label": "2★ MICHELIN",
   "full": "★★ MICHELIN · Green Star (2026 edition)"
  },
  "verdict": "The city's only two-star, and the most formally ambitious argument for Anatolian cooking as haute cuisine anywhere",
  "caveat": "★★ in the MICHELIN Guide Türkiye 2026",
  "hours": "Dinner",
  "productTags": [
   "Anatolian",
   "Fine dining"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "mikla",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 2,
  "name": "Mikla",
  "short": "Mikla",
  "neighborhood": "Beyoğlu — roof of the Marmara Pera",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mikla+Istanbul",
  "lat": 41.031087,
  "lng": 28.974017,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "person": "Mehmet Gürs",
  "verdict": "The view is famous; the ingredient philosophy is why it lasted",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026; top two floors of The Marmara Pera",
  "hours": "Dinner, for the light",
  "why": "Chef Mehmet Gürs. The house that invented the phrase New Anatolian Kitchen and spent fifteen years proving it meant something.",
  "productTags": [
   "New Anatolian",
   "Rooftop"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "neolokal",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 3,
  "name": "Neolokal",
  "short": "Neolokal",
  "neighborhood": "Karaköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Neolokal+Istanbul",
  "lat": 41.023782,
  "lng": 28.973476,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "person": "Maksut Aşkar",
  "caveat": "⚠ EXACT BUILDING UNVERIFIED — sources disagree. Geocode before publishing.",
  "hours": "Dinner",
  "why": "Chef Maksut Aşkar. Traditional Turkish dishes taken apart and rebuilt.",
  "productTags": [
   "Modern Turkish",
   "Sustainability"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "nicole",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 4,
  "name": "Nicole",
  "short": "Nicole",
  "neighborhood": "Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=Nicole+Istanbul",
  "lat": 41.03023,
  "lng": 28.977828,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN since 2022 · MICHELIN Service Award 2025"
  },
  "person": "Serkan Aksoy",
  "verdict": "The room for when you want the whole performance right, not only the plates",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
  "hours": "Dinner",
  "why": "Chef Serkan Aksoy.",
  "productTags": [
   "Fine dining"
  ],
  "badge": "Michelin",
  "tags": [
   "Weeks ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "araka",
  "cat": "shop",
  "tier": "several",
  "priority": 5,
  "name": "Araka",
  "short": "Araka",
  "neighborhood": "Yeniköy, up the Bosphorus",
  "maps": "https://www.google.com/maps/search/?api=1&query=Araka+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "verdict": "Worth the drive north",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
  "hours": "Lunch — make the journey part of it",
  "productTags": [
   "Fine dining",
   "Bosphorus"
  ],
  "badge": "Michelin",
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "arkestra",
  "cat": "shop",
  "tier": "several",
  "priority": 6,
  "name": "Arkestra",
  "short": "Arkestra",
  "neighborhood": "Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arkestra+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
  "badge": "Michelin",
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "sankai-by-nagaya",
  "cat": "shop",
  "tier": "several",
  "priority": 7,
  "name": "Sankai by Nagaya",
  "short": "Sankai by Nagaya",
  "neighborhood": "Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=Sankai+by+Nagaya+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN"
  },
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
  "why": "Japanese, and genuinely so.",
  "productTags": [
   "Japanese"
  ],
  "badge": "Michelin",
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "araf-istanbul",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 8,
  "name": "Araf İstanbul",
  "short": "Araf İstanbul",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Araf+%C4%B0stanbul+Istanbul",
  "lat": 40.908528,
  "lng": 29.286561,
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "★ MICHELIN 2026"
  },
  "person": "Kenan Çetinkaya and Pınar Korgan Çetinkaya",
  "signature": "whatever comes off the fire — offal first, then the large cuts",
  "dishes": [
   {
    "name": "Whatever comes off the fire",
    "note": "offal first"
   },
   {
    "name": "Large cuts",
    "note": "the large cuts"
   }
  ],
  "verdict": "THE PICK. If you get in, you have had the defining meal of this decade in Istanbul",
  "caveat": "Twelve seats and one seating — any night is hard; midweek is the least impossible",
  "hours": "One seating a night",
  "why": "Chefs Kenan Çetinkaya and Pınar Korgan Çetinkaya. Twelve seats, one open fire.",
  "productTags": [
   "Open fire",
   "Offal",
   "Counter"
  ],
  "badge": "Michelin",
  "tags": [
   "DIRECT CONTACT ONLY — no booking app, no agency",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "ciya-sofrasi",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 9,
  "name": "Çiya Sofrası",
  "short": "Çiya Sofrası",
  "neighborhood": "Kadıköy market",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C3%87iya+Sofras%C4%B1+Istanbul",
  "lat": 40.989347,
  "lng": 29.024429,
  "signal_chip": {
   "label": "50 BEST DISCOVERY",
   "full": "The World's 50 Best Discovery · Chef's Table"
  },
  "signature": "from the counter — take what you cannot identify",
  "dishes": [
   {
    "name": "From the counter",
    "note": "take what you cannot identify"
   }
  ],
  "verdict": "Not a restaurant so much as a field-recording project with a kitchen",
  "caveat": "trading 2026; Güneşlibahçe Sk. No: 43, Kadıköy",
  "address": "Caferağa Mah., Güneşlibahçe Sok. No:43, Kadıköy, İstanbul",
  "hours": "Lunch, when the daily menu is fullest",
  "why": "Founded 1998 by Musa Dağdeviren. Forgotten regional recipes collected village by village: Azeri, Georgian, Arab, Armenian, Assyrian, Ottoman and Jewish dishes in their own traditions.",
  "productTags": [
   "Anatolian",
   "Regional",
   "Daily menu"
  ],
  "badge": "Michelin",
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "yanyali-fehmi-lokantasi",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 10,
  "name": "Yanyalı Fehmi Lokantası",
  "short": "Yanyalı Fehmi Lokantası",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Yanyal%C4%B1+Fehmi+Lokantas%C4%B1+Istanbul",
  "lat": 40.990765,
  "lng": 29.025509,
  "signal_chip": {
   "label": "BIB GOURMAND",
   "full": "Bib Gourmand 2026"
  },
  "verdict": "The mirror image of the city's loss: the oldest surviving lokanta on the Asian side was founded by a family who came the OTHER way in the exchange",
  "caveat": "Bib Gourmand confirmed on the MICHELIN Guide's own listing",
  "address": "Osmanağa Mah., Yağlıkçı İsmail Sok. No:1, Kadıköy, 34714 İstanbul",
  "hours": "09:00–22:30 daily (closed the first two days of public holidays)",
  "why": "Founded 1919 by Fehmi Efendi, whose family migrated from Yanya (Ioannina) in Greece — 'Yanyalı' means 'from Yanya'. Third generation, still family-run. 140–150 different dishes a day.",
  "productTags": [
   "Lokanta",
   "Since 1919"
  ],
  "badge": "Michelin",
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "agora-meyhanesi",
  "cat": "shop",
  "tier": "several",
  "priority": 11,
  "name": "Agora Meyhanesi",
  "short": "Agora Meyhanesi",
  "neighborhood": "Balat",
  "maps": "https://www.google.com/maps/search/?api=1&query=Agora+Meyhanesi+Istanbul",
  "lat": 41.033349,
  "lng": 28.946504,
  "verdict": "The meyhane as it was before the neighbourhood changed hands",
  "caveat": "trading seven days a week; own site agora1890.com",
  "hours": "Long dinner",
  "why": "Trading since 1890.",
  "productTags": [
   "Meyhane",
   "Since 1890"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "casius-antioch-kitchen",
  "cat": "shop",
  "tier": "several",
  "priority": 12,
  "name": "Casius Antioch Kitchen",
  "short": "Casius Antioch Kitchen",
  "neighborhood": "Cihangir",
  "maps": "https://www.google.com/maps/search/?api=1&query=Casius+Antioch+Kitchen+Istanbul",
  "signal_chip": {
   "label": "BIB GOURMAND",
   "full": "Bib Gourmand 2026"
  },
  "caveat": "Bib Gourmand confirmed on the MICHELIN Guide's own listing",
  "why": "Antakya cooking in Istanbul, which after the 2023 earthquakes carries a weight it did not have before.",
  "productTags": [
   "Antakya",
   "Regional"
  ],
  "badge": "Michelin",
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "tam-ocakbasi",
  "cat": "shop",
  "tier": "several",
  "priority": 13,
  "name": "Tam Ocakbaşı",
  "short": "Tam Ocakbaşı",
  "neighborhood": "Arnavutköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Tam+Ocakba%C5%9F%C4%B1+Istanbul",
  "lat": 41.067658,
  "lng": 29.043958,
  "person": "Türev Uludağ",
  "signature": "liver first, then the skewers, then a lahmacun to close",
  "dishes": [
   {
    "name": "Liver first",
    "note": "liver first"
   },
   {
    "name": "Skewers",
    "note": "the skewers"
   },
   {
    "name": "A lahmacun to close",
    "note": "a lahmacun to close"
   }
  ],
  "caveat": "⚠ Friday and Saturday evenings are very hard to get into — book ahead",
  "hours": "Late dinner",
  "why": "Chef Türev Uludağ.",
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "mesai",
  "cat": "shop",
  "tier": "several",
  "priority": 14,
  "name": "Mesai",
  "short": "Mesai",
  "neighborhood": "Gümüşsuyu",
  "maps": "https://www.google.com/maps/search/?api=1&query=Mesai+Istanbul",
  "lat": 40.881684,
  "lng": 29.284741,
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Late dinner",
  "why": "Ocakbaşı culture against a Bosphorus and Historic Peninsula view, running sunset into night.",
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "cira-ocakbasi",
  "cat": "shop",
  "tier": "several",
  "priority": 15,
  "name": "Çıra Ocakbaşı",
  "short": "Çıra Ocakbaşı",
  "neighborhood": "Sarıyer / Skyland",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C3%87%C4%B1ra+Ocakba%C5%9F%C4%B1+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "address": "Skyland, Huzur Mah., Azerbaycan Cad., D1 Blok No:4d, Sarıyer, İstanbul",
  "hours": "Late dinner",
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "wayana-wine-bar-tapas",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 16,
  "name": "WAYANA Wine Bar & Tapas",
  "short": "WAYANA Wine Bar & Tapas",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=WAYANA+Wine+Bar+%26+Tapas+Istanbul",
  "lat": 40.980199,
  "lng": 29.023997,
  "signature": "a flight of rare native grapes — the whole list is available by the glass",
  "dishes": [
   {
    "name": "A flight of rare native grapes",
    "note": "the whole list is available by the glass"
   }
  ],
  "verdict": "Go here first; it will reorganise what you think Turkish wine is",
  "caveat": "Listed on Star Wine List; own site live",
  "address": "Ferit Tek Sok. 60/B, Moda, Kadıköy, İstanbul",
  "phone": "+90 216 550 22 07",
  "hours": "16:00–00:00",
  "why": "500+ labels served entirely by the glass. As of July 2026: 143 Turkish wineries and 90 endemic grape varieties. Own site wayanatapas.com.",
  "productTags": [
   "Natural wine",
   "Turkish indigenous grapes"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "bag-pera",
  "cat": "shop",
  "tier": "several",
  "priority": 17,
  "name": "Bağ Pera",
  "short": "Bağ Pera",
  "neighborhood": "Asmalımescit",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ba%C4%9F+Pera+Istanbul",
  "lat": 41.027517,
  "lng": 28.974427,
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Lunch Mon–Sat 12:00–14:45 · dinner daily 17:30–00:00",
  "why": "Excellent small Turkish producers, plus tastings and workshops.",
  "productTags": [
   "Wine bar",
   "Tapas"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "lips-wine-bar",
  "cat": "shop",
  "tier": "several",
  "priority": 18,
  "name": "Lips Wine Bar",
  "short": "Lips Wine Bar",
  "neighborhood": "Nişantaşı",
  "maps": "https://www.google.com/maps/search/?api=1&query=Lips+Wine+Bar+Istanbul",
  "caveat": "⚠ CLOSED SUNDAYS",
  "address": "Teşvikiye, Hacı Emin Efendi Sok., Nişantaşı Apt No:24C, Şişli, İstanbul",
  "hours": "17:00–00:00 · Fri–Sat to 02:00",
  "productTags": [
   "Wine bar"
  ],
  "tags": [
   "Best night: Any except Sun"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "montag",
  "cat": "shop",
  "tier": "several",
  "priority": 19,
  "name": "Montag",
  "short": "Montag",
  "neighborhood": "Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=Montag+Istanbul",
  "lat": 40.98478,
  "lng": 29.025796,
  "caveat": "Hours current on multiple 2026 listings",
  "address": "Caferağa, Muvakkıthane Cd. No:16/A Kat:1, 34710 Kadıköy, İstanbul",
  "hours": "Mon–Sun 10:00–22:00 (Fri–Sat to 23:00)",
  "why": "Roasting its own since 2016; the pioneer most of the scene credits.",
  "productTags": [
   "Specialty coffee",
   "Roaster"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "federal-galata",
  "cat": "shop",
  "tier": "several",
  "priority": 20,
  "name": "Federal Galata",
  "short": "Federal Galata",
  "neighborhood": "Galata — near the Kamondo stairs",
  "maps": "https://www.google.com/maps/search/?api=1&query=Federal+Galata+Istanbul",
  "lat": 41.026294,
  "lng": 28.973672,
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Morning",
  "why": "Est. 2016, up the hill from the Kamondo stairs. Australian-café register and a proper flat white.",
  "productTags": [
   "Specialty coffee"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "coffee-manifesto",
  "cat": "shop",
  "tier": "several",
  "priority": 21,
  "name": "Coffee Manifesto",
  "short": "Coffee Manifesto",
  "neighborhood": "Yeldeğirmeni, Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Coffee+Manifesto+Istanbul",
  "lat": 40.989201,
  "lng": 29.02417,
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Morning",
  "why": "Run with world-ranked barista Koray Erdoğdu.",
  "productTags": [
   "Specialty coffee"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "dama",
  "cat": "shop",
  "tier": "several",
  "priority": 22,
  "name": "Dama",
  "short": "Dama",
  "neighborhood": "Teşvikiye, Şişli",
  "maps": "https://www.google.com/maps/search/?api=1&query=Dama+Istanbul",
  "verdict": "A café by day that becomes a hi-fi listening bar at night — the format Istanbul has taken to faster than any other European city",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Either end of the day",
  "why": "Morning coffee watching the side street, lunch with friends, and the tempo climbing into a hi-fi evening.",
  "productTags": [
   "Café by day",
   "Hi-fi by night"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "neroli-daylight-kitchen",
  "cat": "shop",
  "tier": "several",
  "priority": 23,
  "name": "Neroli Daylight Kitchen",
  "short": "Neroli Daylight Kitchen",
  "neighborhood": "Teşvikiye",
  "maps": "https://www.google.com/maps/search/?api=1&query=Neroli+Daylight+Kitchen+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Morning",
  "productTags": [
   "Brunch",
   "Seasonal"
  ],
  "tags": [
   "Best night: Sun"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "morning-in-pera",
  "cat": "shop",
  "tier": "several",
  "priority": 24,
  "name": "Morning in Pera",
  "short": "Morning in Pera",
  "neighborhood": "Yeşilköy (new room)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Morning+in+Pera+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Morning",
  "productTags": [
   "Breakfast",
   "Brunch"
  ],
  "tags": [
   "Best night: Sun"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "arkaoda",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 25,
  "name": "Arkaoda",
  "short": "Arkaoda",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arkaoda+Istanbul",
  "lat": 40.98659,
  "lng": 29.026539,
  "caveat": "open Mon–Sun 12:00–02:00 per a July 2026 listing; Kadife Sok. No:18 D:1",
  "address": "Kadife Sok. No:18 D:1, Caferağa, Kadıköy, İstanbul",
  "hours": "Mon–Sun 12:00–02:00",
  "why": "Anchor since 1999. Selectors move between Turkish psych, jazz and electronic. Functionally a collective as much as a bar.",
  "productTags": [
   "Listening bar",
   "Turkish psych",
   "Garden"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "karga",
  "cat": "shop",
  "tier": "several",
  "priority": 26,
  "name": "Karga",
  "short": "Karga",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Karga+Istanbul",
  "lat": 40.986644,
  "lng": 29.026584,
  "caveat": "⚠ the venue's own Facebook page shows 'Closing Soon' — CHECK BEFORE SENDING ANYONE",
  "why": "Vinyl-led sessions in the upstairs rooms.",
  "productTags": [
   "Vinyl sessions"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "closing_soon",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "nayah",
  "cat": "shop",
  "tier": "several",
  "priority": 27,
  "name": "Nayah",
  "short": "Nayah",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Nayah+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "productTags": [
   "Reggae",
   "Dub"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "frankhan",
  "cat": "shop",
  "tier": "several",
  "priority": 28,
  "name": "Frankhan",
  "short": "Frankhan",
  "neighborhood": "Karaköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Frankhan+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Large main room plus a dedicated audiophile Sound Room.",
  "productTags": [
   "House",
   "Electro",
   "Audiophile Sound Room"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "june",
  "cat": "shop",
  "tier": "several",
  "priority": 29,
  "name": "June",
  "short": "June",
  "neighborhood": "Teşvikiye",
  "maps": "https://www.google.com/maps/search/?api=1&query=June+Istanbul",
  "lat": 41.16961,
  "lng": 28.990789,
  "caveat": "not cross-checked in this pass — do not publish as open",
  "address": "Teşvikiye, Ahmet Fetgeri Sok. No:31, Şişli, İstanbul",
  "why": "A neighbourhood bar that is also a listening bar — vinyl through good equipment, dancing later.",
  "productTags": [
   "Listening bar"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "flux",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 30,
  "name": "FLUX",
  "short": "FLUX",
  "neighborhood": "Maslak",
  "maps": "https://www.google.com/maps/search/?api=1&query=FLUX+Istanbul",
  "verdict": "The serious techno room — and the programming actually splits: Fridays lean house, Saturdays go techno",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Late",
  "why": "Funktion-One in a modular room. 2026 season has carried Ben Klock, Anja Schneider, Gerd Janson, Cormac, Setaoc Mass and Stef Mendesidis alongside local artists.",
  "productTags": [
   "Techno",
   "House",
   "Funktion-One"
  ],
  "tags": [
   "Best night: Fri (house) · Sat (techno)"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "sahika",
  "cat": "shop",
  "tier": "several",
  "priority": 31,
  "name": "Şahika",
  "short": "Şahika",
  "neighborhood": "Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C5%9Eahika+Istanbul",
  "lat": 41.0348,
  "lng": 28.977639,
  "caveat": "Active club listing on Resident Advisor; roof bar hosting music, exhibitions, talks",
  "hours": "Late",
  "why": "Multi-level with a rooftop terrace; the experimental end of the programming.",
  "productTags": [
   "Techno",
   "Jungle",
   "Footwork",
   "Queer-friendly",
   "Rooftop"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "noh-radio-bar-noh-extended",
  "cat": "shop",
  "tier": "several",
  "priority": 32,
  "name": "NOH Radio Bar / NOH Extended",
  "short": "NOH Radio Bar / NOH Extended",
  "neighborhood": "Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=NOH+Radio+Bar+%2F+NOH+Extended+Istanbul",
  "caveat": "Active club listing on Resident Advisor",
  "hours": "Late",
  "why": "The compact bar where the music goes out into the street, plus its late club and art space.",
  "productTags": [
   "Techno",
   "Trance",
   "Jungle",
   "House",
   "Art space"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "popstel-stay-local",
  "cat": "shop",
  "tier": "several",
  "priority": 33,
  "name": "POPSTEL — Stay Local",
  "short": "POPSTEL — Stay Local",
  "neighborhood": "Galatasaray",
  "maps": "https://www.google.com/maps/search/?api=1&query=POPSTEL+%E2%80%94+Stay+Local+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "productTags": [
   "Y2K hip-hop",
   "UK garage",
   "Dark disco"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "ritim-istanbul",
  "cat": "shop",
  "tier": "several",
  "priority": 34,
  "name": "Ritim Istanbul",
  "short": "Ritim Istanbul",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Ritim+Istanbul+Istanbul",
  "lat": 40.921866,
  "lng": 29.158616,
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Multi-floor, broader and more international.",
  "productTags": [
   "Reggaeton",
   "Pop",
   "Hip-hop",
   "Electronic"
  ],
  "tags": [
   "Best night: Sat"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "sazzou",
  "cat": "shop",
  "tier": "several",
  "priority": 35,
  "name": "Sazzou",
  "short": "Sazzou",
  "neighborhood": "Hilton İstanbul Bosphorus, Harbiye",
  "maps": "https://www.google.com/maps/search/?api=1&query=Sazzou+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Evening",
  "why": "Built around jazz and cocktail culture — live jazz plus vinyl DJ sets.",
  "productTags": [
   "Jazz",
   "Cocktails"
  ],
  "tags": [
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "suma-han",
  "cat": "mainland",
  "tier": "berth_top",
  "priority": 36,
  "name": "Suma Han",
  "short": "Suma Han",
  "neighborhood": "Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=Suma+Han+Istanbul",
  "verdict": "The clearest example in the city of artists building their own infrastructure",
  "caveat": "Active club listing on Resident Advisor",
  "why": "Offices, artist studios, residences and common rooms, plus a club room with a 500-capacity floor and real acoustics.",
  "productTags": [
   "Creative hub",
   "Studios",
   "Residences",
   "500-cap club"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "koli-art-space",
  "cat": "mainland",
  "tier": "several",
  "priority": 37,
  "name": "KOLI Art Space",
  "short": "KOLI Art Space",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=KOLI+Art+Space+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Founded 2021 by Elçin Acun and Yasemin Kalaycı. Non-profit production and exhibition space supporting feminist and queer artists, on identity and gender fluidity. Showed at Contemporary Istanbul CI BLOOM 2026.",
  "productTags": [
   "Queer community",
   "Exhibitions",
   "Performance",
   "Music"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "noks-formerly-toz",
  "cat": "mainland",
  "tier": "several",
  "priority": 38,
  "name": "NOKS (formerly TOZ)",
  "short": "NOKS (formerly TOZ)",
  "neighborhood": "Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=NOKS+%28formerly+TOZ%29+Istanbul",
  "person": "Ece Elder, Elvan Ekren, Sinem Dişli and Volkan Kızıltunç",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Began 2015 as TOZ, founded by Ece Elder, Elvan Ekren, Sinem Dişli and Volkan Kızıltunç; NOKS after 2018, run by Kızıltunç and Ekren. Showed at Contemporary Istanbul CI BLOOM 2026; SAHA-supported.",
  "productTags": [
   "Artist-run",
   "Non-profit"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "bas-avto",
  "cat": "mainland",
  "tier": "several",
  "priority": 39,
  "name": "BAS · AVTO",
  "short": "BAS · AVTO",
  "neighborhood": "Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=BAS+%C2%B7+AVTO+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Long-running independent spaces — artist books and experimental programming. SAHA Sustainability Fund supported.",
  "productTags": [
   "Artist books",
   "Experimental"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "nublu-istanbul-nublu-records",
  "cat": "mainland",
  "tier": "several",
  "priority": 40,
  "name": "Nublu Istanbul / Nublu Records",
  "short": "Nublu Istanbul / Nublu Records",
  "neighborhood": "Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=Nublu+Istanbul+%2F+Nublu+Records+Istanbul",
  "verdict": "The most internationally connected music operation in the city",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "İlhan Erşahin's label and room, founded 2005 as the extension of the Nublu sound from New York's Lower East Side.",
  "productTags": [
   "Label",
   "Live room",
   "Jazz"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "the-bank-roof-bar",
  "cat": "shop",
  "tier": "several",
  "priority": 41,
  "name": "The Bank Roof Bar",
  "short": "The Bank Roof Bar",
  "neighborhood": "Karaköy — The Bank Hotel",
  "maps": "https://www.google.com/maps/search/?api=1&query=The+Bank+Roof+Bar+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Daily, midday to late",
  "why": "Views over the Golden Horn, Bosphorus, Hagia Sophia, Topkapı and the Blue Mosque.",
  "productTags": [
   "Rooftop",
   "Old-city view"
  ],
  "tags": [
   "TL 400–700 a cocktail (2026 hotel-rooftop band)",
   "Book for sunset"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "roof-mezzepotamia",
  "cat": "shop",
  "tier": "several",
  "priority": 42,
  "name": "Roof Mezzepotamia",
  "short": "Roof Mezzepotamia",
  "neighborhood": "Sirkeci, Fatih — terrace of the Orient Occident Hotel, Autograph Collection",
  "maps": "https://www.google.com/maps/search/?api=1&query=Roof+Mezzepotamia+Istanbul",
  "caveat": "⚠ It is in SIRKECI, not Karaköy — do not send anyone to the wrong shore",
  "address": "Hobyar Mah., Hoca Kasım Köprüsü Sok. No:2, Sirkeci, Fatih, İstanbul",
  "hours": "Sunset",
  "why": "270° over the Bosphorus, the Golden Horn and the tower; DJs nightly.",
  "productTags": [
   "Rooftop",
   "270° view"
  ],
  "tags": [
   "Book for sunset"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "roof106",
  "cat": "shop",
  "tier": "several",
  "priority": 43,
  "name": "Roof106",
  "short": "Roof106",
  "neighborhood": "Galata — atop the Galata Times Hotel, Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=Roof106+Istanbul",
  "caveat": "⚠ CLOSED TUESDAYS",
  "hours": "Sunset",
  "productTags": [
   "Rooftop",
   "Cocktails"
  ],
  "tags": [
   "Best night: Any except Tue"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "sky-karakoy",
  "cat": "shop",
  "tier": "several",
  "priority": 44,
  "name": "Sky Karaköy",
  "short": "Sky Karaköy",
  "neighborhood": "9th floor, JW Marriott İstanbul Bosphorus, Karaköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Sky+Karak%C3%B6y+Istanbul",
  "caveat": "⚠ SEASONAL — Marriott's own listing has carried a 'Seasonally Closed' label. Check before going.",
  "hours": "17:00–01:00",
  "productTags": [
   "Rooftop"
  ],
  "status": "seasonal",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "manifest-roof",
  "cat": "shop",
  "tier": "several",
  "priority": 45,
  "name": "Manifest Roof",
  "short": "Manifest Roof",
  "neighborhood": "Bereketzade, Galata, Beyoğlu",
  "maps": "https://www.google.com/maps/search/?api=1&query=Manifest+Roof+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "hours": "Dinner from 18:00",
  "productTags": [
   "Rooftop",
   "Modern Mediterranean"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "arogan",
  "cat": "shop",
  "tier": "several",
  "priority": 46,
  "name": "Arogan",
  "short": "Arogan",
  "neighborhood": "Tarabya",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arogan+Istanbul",
  "person": "Burak Zafer",
  "caveat": "⚠ CLOSED SUNDAYS AND MONDAYS",
  "hours": "Tue–Sat 18:00–00:00",
  "why": "Chef Burak Zafer. Opened 30 January 2026.",
  "productTags": [
   "Modern",
   "Local ingredients"
  ],
  "tags": [
   "Best night: Tue–Sat"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "kontuar",
  "cat": "shop",
  "tier": "several",
  "priority": 47,
  "name": "Kontuar",
  "short": "Kontuar",
  "neighborhood": "Pera / Asmalımescit",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kontuar+Istanbul",
  "person": "Mustafa Otar",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Chef Mustafa Otar. Opened January 2026 as a chef's-table counter built on 'fire, emotion and roots'.",
  "productTags": [
   "Fire-focused",
   "Modern"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "hodan",
  "cat": "shop",
  "tier": "several",
  "priority": 48,
  "name": "Hodan",
  "short": "Hodan",
  "neighborhood": "Beyoğlu (listed by some sources as Nişantaşı)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Hodan+Istanbul",
  "caveat": "⚠ Neighbourhood disputed across sources (Beyoğlu vs Nişantaşı) — confirm before travelling",
  "why": "One of Beyoğlu's most talked-about new chef restaurants, and already a brunch fixture. Sunday jazz brunch.",
  "productTags": [
   "Modern Anatolian"
  ],
  "tags": [
   "Best night: Sun, for the jazz brunch"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "todos-los-dias",
  "cat": "shop",
  "tier": "several",
  "priority": 49,
  "name": "Todos Los Días",
  "short": "Todos Los Días",
  "neighborhood": "Beyoğlu / Asmalımescit",
  "maps": "https://www.google.com/maps/search/?api=1&query=Todos+Los+D%C3%ADas+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Esen Hünal, Maksut Aşkar and Erim Leblebicioğlu.",
  "productTags": [
   "Comfort food"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "indochine-istanbul",
  "cat": "shop",
  "tier": "several",
  "priority": 50,
  "name": "Indochine İstanbul",
  "short": "Indochine İstanbul",
  "neighborhood": "Bebek",
  "maps": "https://www.google.com/maps/search/?api=1&query=Indochine+%C4%B0stanbul+Istanbul",
  "person": "Mahmut Can Kızılbay",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Chef Mahmut Can Kızılbay.",
  "productTags": [
   "Vietnamese"
  ],
  "status": "unverified",
  "statusChecked": ""
 },
 {
  "id": "basta-neo-bistro",
  "cat": "shop",
  "tier": "several",
  "priority": 51,
  "name": "Basta! Neo Bistro",
  "short": "Basta! Neo Bistro",
  "neighborhood": "Caddebostan, Kadıköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Basta%21+Neo+Bistro+Istanbul",
  "signal_chip": {
   "label": "1★ MICHELIN",
   "full": "In the 2026 MICHELIN selection"
  },
  "caveat": "in the MICHELIN Guide Türkiye 2026 selection",
  "why": "Kaan Sakarya and Derin Arıbaş, both trained in Michelin kitchens in France.",
  "productTags": [
   "Neo-bistro"
  ],
  "badge": "Michelin",
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "lina-anatolian",
  "cat": "shop",
  "tier": "several",
  "priority": 52,
  "name": "Lina Anatolian",
  "short": "Lina Anatolian",
  "neighborhood": "Karaköy",
  "maps": "https://www.google.com/maps/search/?api=1&query=Lina+Anatolian+Istanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Regional Anatolian flavours through contemporary technique, over the Bosphorus — a refined interpretation rather than a recreation.",
  "productTags": [
   "Modern Anatolian",
   "Bosphorus view"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "lokanta-stambouli",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 53,
  "name": "Lokanta Stambouli",
  "short": "Lokanta Stambouli",
  "neighborhood": "Pera (Minoa Pera)",
  "maps": "https://www.google.com/maps/search/?api=1&query=Lokanta+Stambouli+Istanbul",
  "person": "Perviz Resuli on the first floor of the historic Union Française building at Mino",
  "verdict": "The most interesting new room in the city — a Rum meyhane revival opening in 2026 is a loaded act, and it is the living answer to this guide's history section",
  "caveat": "not cross-checked in this pass — do not publish as open",
  "address": "Asmalı Mescit Mah., Meşrutiyet Cad. No:99, Beyoğlu, İstanbul",
  "phone": "+90 539 693 12 78",
  "why": "Opened by Perviz Resuli on the first floor of the historic Union Française building at Minoa Pera. Capacity 70. Explicitly marries the old Istanbul meyhane to Greek cooking.",
  "productTags": [
   "Meyhane",
   "Turkish and Rum tradition"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "seoul-kitchen",
  "cat": "shop",
  "tier": "several",
  "priority": 54,
  "name": "Seoul Kitchen",
  "short": "Seoul Kitchen",
  "neighborhood": "Bomontiada, Şişli",
  "maps": "https://www.google.com/maps/search/?api=1&query=Seoul+Kitchen+Istanbul",
  "caveat": "POP-UP — will not last · pop-up — no stated end date, will not last",
  "why": "Jimmy & Jin.",
  "productTags": [
   "Korean",
   "Pop-up"
  ],
  "status": "time_limited",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "stre",
  "cat": "shop",
  "tier": "several",
  "priority": 55,
  "name": "Østre",
  "short": "Østre",
  "neighborhood": "Cihangir",
  "maps": "https://www.google.com/maps/search/?api=1&query=%C3%98stre+Istanbul",
  "caveat": "Limited seating — reservations needed for evening service",
  "why": "A small seafood bar built on oysters and raw fish.",
  "productTags": [
   "Oysters",
   "Raw bar"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "ruya-istanbul",
  "cat": "shop",
  "tier": "several",
  "priority": 56,
  "name": "Rüya İstanbul",
  "short": "Rüya İstanbul",
  "neighborhood": "Çırağan Palace Kempinski, Beşiktaş",
  "maps": "https://www.google.com/maps/search/?api=1&query=R%C3%BCya+%C4%B0stanbul+Istanbul",
  "lat": 41.03627,
  "lng": 29.093512,
  "caveat": "not cross-checked in this pass — do not publish as open",
  "why": "Sharing plates in the Çırağan Palace Kempinski. It revived the long-missed Sunday brunch tradition.",
  "productTags": [
   "Modern Anatolian",
   "Grand hotel"
  ],
  "tags": [
   "Best night: Sun, for the brunch"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "burger-and-lobster",
  "cat": "shop",
  "tier": "several",
  "priority": 57,
  "name": "Burger and Lobster",
  "short": "Burger and Lobster",
  "neighborhood": "The Ritz-Carlton Istanbul",
  "maps": "https://www.google.com/maps/search/?api=1&query=Burger+and+Lobster+Istanbul",
  "caveat": "RUNS ONLY TO THE END OF AUGUST 2026 · stated to run only to the end of August 2026",
  "productTags": [
   "Pop-up"
  ],
  "status": "time_limited",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "vefa-bozacisi",
  "cat": "shop",
  "tier": "several",
  "priority": 58,
  "name": "Vefa Bozacısı",
  "short": "Vefa Bozacısı",
  "neighborhood": "Vefa",
  "maps": "https://www.google.com/maps/search/?api=1&query=Vefa+Bozac%C4%B1s%C4%B1+Istanbul",
  "lat": 41.015324,
  "lng": 28.958419,
  "signature": "boza with cinnamon and roasted chickpeas",
  "dishes": [
   {
    "name": "Boza with cinnamon and roasted chickpeas",
    "note": "boza with cinnamon and roasted chickpeas"
   }
  ],
  "verdict": "The point of going is the room, unchanged",
  "caveat": "own site vefa.com.tr active",
  "hours": "Winter — it is a cold-season drink",
  "why": "Selling boza since 1876.",
  "productTags": [
   "Boza",
   "Since 1876"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "kuzguncuk",
  "cat": "mainland",
  "tier": "berth_top",
  "priority": 59,
  "name": "Kuzguncuk",
  "short": "Kuzguncuk",
  "neighborhood": "Asian shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kuzguncuk+Istanbul",
  "lat": 41.03216,
  "lng": 29.036026,
  "verdict": "The single loveliest street in Istanbul, and the physical proof of the city this guide describes",
  "caveat": "A neighbourhood, not a venue",
  "hours": "Late afternoon",
  "productTags": [
   "Wooden houses",
   "Mosque + synagogue + church"
  ],
  "tags": [
   "Best night: Sun"
  ],
  "status": "n/a",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "balat-and-fener",
  "cat": "mainland",
  "tier": "several",
  "priority": 60,
  "name": "Balat and Fener",
  "short": "Balat and Fener",
  "neighborhood": "Golden Horn",
  "maps": "https://www.google.com/maps/search/?api=1&query=Balat+and+Fener+Istanbul",
  "caveat": "Neighbourhoods, not venues",
  "hours": "Early — it fills",
  "productTags": [
   "Old Greek and Jewish quarters"
  ],
  "status": "n/a",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "arnavutkoy-to-bebek",
  "cat": "mainland",
  "tier": "several",
  "priority": 61,
  "name": "Arnavutköy to Bebek",
  "short": "Arnavutköy to Bebek",
  "neighborhood": "European shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arnavutk%C3%B6y+to+Bebek+Istanbul",
  "lat": 41.077183,
  "lng": 29.043259,
  "verdict": "The best hour on the European shore",
  "caveat": "A walking route, not a venue",
  "hours": "Late afternoon",
  "productTags": [
   "Yalı",
   "3 km waterside walk"
  ],
  "status": "n/a",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "buyukada-princes-islands",
  "cat": "mainland",
  "tier": "berth_top",
  "priority": 62,
  "name": "Büyükada, Princes' Islands",
  "short": "Büyükada, Princes' Islands",
  "neighborhood": "Sea of Marmara",
  "maps": "https://www.google.com/maps/search/?api=1&query=B%C3%BCy%C3%BCkada%2C+Princes%27+Islands+Istanbul",
  "lat": 40.856355,
  "lng": 29.119037,
  "caveat": "An island, not a venue",
  "hours": "A full day",
  "why": "About 5 × 1 km. Roughly 90 minutes by ferry from the European piers, 45 from the Asian side.",
  "productTags": [
   "No cars",
   "Wooden houses",
   "Monastery of St George"
  ],
  "tags": [
   "Best night: Sun"
  ],
  "status": "n/a",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "kadikoy",
  "cat": "mainland",
  "tier": "berth_top",
  "priority": 63,
  "name": "Kadıköy",
  "short": "Kadıköy",
  "neighborhood": "Asian side",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kad%C4%B1k%C3%B6y+Istanbul",
  "lat": 40.991295,
  "lng": 29.024563,
  "verdict": "The centre of gravity of everything good happening in Istanbul now",
  "caveat": "A district, not a venue",
  "hours": "Market by day, bars by night",
  "productTags": [
   "Market streets",
   "Barlar Sokağı",
   "Moda",
   "Yeldeğirmeni"
  ],
  "tags": [
   "Best night: Sat"
  ],
  "status": "n/a",
  "statusChecked": "2026-08-11"
 },
 {
  "id": "nardis-jazz-club",
  "cat": "shop",
  "tier": "berth_top",
  "priority": 66,
  "name": "Nardis Jazz Club",
  "short": "Nardis Jazz Club",
  "neighborhood": "Galata — at the foot of the tower",
  "maps": "https://www.google.com/maps/search/?api=1&query=Nardis+Jazz+Club+Istanbul",
  "lat": 41.025442,
  "lng": 28.974186,
  "verdict": "THE jazz room in Istanbul, and the reason Wednesday is on the week grid",
  "address": "Kuledibi Sok., Galata, Beyoğlu, İstanbul",
  "hours": "Weekdays 21:30–00:30 · weekends 22:30–01:30",
  "why": "Roughly 120 seats at the foot of the Galata Tower, live jazz from local and international acts practically every night. Programming already listed into 2026–27.",
  "productTags": [
   "Jazz",
   "Live nearly every night",
   "120 seats"
  ],
  "tags": [
   "Mid",
   "Recommended",
   "Best night: Wed"
  ],
  "status": "confirmed",
  "statusChecked": "2026-08-11"
 }
];
  const NEIGHBORHOODS = [
 {
  "name": "Kuzguncuk",
  "desc": "The single loveliest street in Istanbul, and the physical proof of the city this guide describes",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kuzguncuk+Istanbul"
 },
 {
  "name": "Balat and Fener",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Balat+and+Fener+Istanbul"
 },
 {
  "name": "Arnavutköy to Bebek",
  "desc": "The best hour on the European shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arnavutk%C3%B6y+to+Bebek+Istanbul"
 },
 {
  "name": "Büyükada, Princes' Islands",
  "desc": "About 5 × 1 km. Roughly 90 minutes by ferry from the European piers, 45 from the Asian side.",
  "maps": "https://www.google.com/maps/search/?api=1&query=B%C3%BCy%C3%BCkada%2C+Princes%27+Islands+Istanbul"
 },
 {
  "name": "Kadıköy",
  "desc": "The centre of gravity of everything good happening in Istanbul now",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kad%C4%B1k%C3%B6y+Istanbul"
 }
];
  const WALKS = [
 {
  "name": "Kuzguncuk",
  "desc": "The single loveliest street in Istanbul, and the physical proof of the city this guide describes",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kuzguncuk+Istanbul"
 },
 {
  "name": "Balat and Fener",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Balat+and+Fener+Istanbul"
 },
 {
  "name": "Arnavutköy to Bebek",
  "desc": "The best hour on the European shore",
  "maps": "https://www.google.com/maps/search/?api=1&query=Arnavutk%C3%B6y+to+Bebek+Istanbul"
 },
 {
  "name": "Büyükada, Princes' Islands",
  "desc": "About 5 × 1 km. Roughly 90 minutes by ferry from the European piers, 45 from the Asian side.",
  "maps": "https://www.google.com/maps/search/?api=1&query=B%C3%BCy%C3%BCkada%2C+Princes%27+Islands+Istanbul"
 },
 {
  "name": "Kadıköy",
  "desc": "The centre of gravity of everything good happening in Istanbul now",
  "maps": "https://www.google.com/maps/search/?api=1&query=Kad%C4%B1k%C3%B6y+Istanbul"
 }
];
  const WORK_SPOTS = [
 {
  "name": "Montag",
  "desc": "Roasting its own since 2016; the pioneer most of the scene credits.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Montag+Istanbul"
 },
 {
  "name": "Federal Galata",
  "desc": "Est. 2016, up the hill from the Kamondo stairs. Australian-café register and a proper flat white.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Federal+Galata+Istanbul"
 },
 {
  "name": "Coffee Manifesto",
  "desc": "Run with world-ranked barista Koray Erdoğdu.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Coffee+Manifesto+Istanbul"
 },
 {
  "name": "Dama",
  "desc": "Morning coffee watching the side street, lunch with friends, and the tempo climbing into a hi-fi evening.",
  "maps": "https://www.google.com/maps/search/?api=1&query=Dama+Istanbul"
 },
 {
  "name": "Neroli Daylight Kitchen",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Neroli+Daylight+Kitchen+Istanbul"
 },
 {
  "name": "Morning in Pera",
  "desc": "",
  "maps": "https://www.google.com/maps/search/?api=1&query=Morning+in+Pera+Istanbul"
 }
];
  const LANDMARKS = [];
  const PHOTOS = [];
  const GEMS = [
 {
  "title": "The restaurant that came the other way",
  "body": "Yanyalı Fehmi Lokantası has been open in Kadıköy since 1919, founded by Fehmi Efendi, whose family migrated from Yanya — Ioannina, in Greece. 'Yanyalı' means 'from Yanya'. In a city whose Greek community was removed by a wealth tax, a pogrom and an expulsion, the oldest surviving lokanta on the Asian side was founded by a family who came the other way in the same exchange."
 },
 {
  "title": "Why the meyhane looks the way it does",
  "body": "Under the Ottoman millet system the non-Muslim communities governed their own affairs — and because alcohol was forbidden to Muslims, the licence to run a drinking house was effectively a non-Muslim one. The long table of cold mezes, the rakı poured with water, the fasıl musicians moving between tables: not a Turkish invention that happens to be old, but a minority institution that outlived the minority."
 }
];
  const TABLES = {
 "grande": {
  "title": "La Grande Table",
  "desc": "The tier you clear an evening for. One two-star at the top — TURK Fatih Tütak, which also took a Green Star in the 2026 edition — then a ring of one-stars arguing about what Anatolian cooking is allowed to become: Mikla on the Pera roof, Neolokal in Karaköy, Nicole with the city's best service, Araka up the Bosphorus at Yeniköy. Book weeks ahead and dress for it.",
  "sections": [
   {
    "label": "The stars",
    "desc": "One two-star and seven one-stars. Formal, expensive, and each answering the same question about Turkish cooking differently.",
    "ids": [
     "turk-fatih-tutak",
     "mikla",
     "neolokal",
     "nicole",
     "araka",
     "arkestra",
     "sankai-by-nagaya"
    ]
   }
  ]
 },
 "petite": {
  "title": "La Petite Table",
  "desc": "Where this guide actually lives. Smaller, more specific, mostly across the water on the Asian side, and least translated for a visitor — a twelve-seat fire counter with a star, a kitchen that collects forgotten village recipes, a lokanta trading since 1919 and a meyhane since 1890.",
  "sections": [
   {
    "label": "The rooms that matter more",
    "desc": "A twelve-seat counter around one open fire, a field-recording project with a kitchen, and the houses that outlived every fashion.",
    "ids": [
     "araf-istanbul",
     "ciya-sofrasi",
     "yanyali-fehmi-lokantasi",
     "agora-meyhanesi",
     "casius-antioch-kitchen"
    ]
   },
   {
    "label": "The fire counters — ocakbaşı",
    "desc": "A bar with a charcoal trench in it, and you sit at the trench. Liver first, then the skewers, then a lahmacun to close.",
    "ids": [
     "tam-ocakbasi",
     "mesai",
     "cira-ocakbasi"
    ]
   },
   {
    "label": "The 2026 wave",
    "desc": "The newest rooms, most with a rising chef's name on them. Reported rather than ranked — confirm before you travel.",
    "ids": [
     "arogan",
     "kontuar",
     "hodan",
     "todos-los-dias",
     "indochine-istanbul",
     "basta-neo-bistro",
     "lina-anatolian",
     "lokanta-stambouli",
     "seoul-kitchen",
     "stre",
     "ruya-istanbul",
     "burger-and-lobster"
    ]
   },
   {
    "label": "Natural wine & the native grape",
    "desc": "Öküzgözü, Boğazkere, Narince, Emir — the indigenous grapes almost nobody orders, and the rooms that pour them by the glass.",
    "ids": [
     "wayana-wine-bar-tapas",
     "bag-pera",
     "lips-wine-bar"
    ]
   }
  ]
 }
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES };
})();
