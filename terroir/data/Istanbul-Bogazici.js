/* Terroir — Istanbul · Boğaziçi — built 2026-08-11 from the verified, geocoded briefing.
   PIN POLICY: only geo_precision=="venue" rows carry lat/lng. Neighbourhood centroids are
   deliberately NOT emitted as venue pins — a centroid sends a reader to the wrong street.
   Every venue carries `status` + `statusChecked` from the 2026-08-11 liveness cross-check. */
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
  "badge": "Michelin",
  "productTags": [
   "Anatolian",
   "Fine dining"
  ],
  "tags": [
   "Weeks ahead",
   "Dinner",
   "Best night: Wed"
  ],
  "why": "★★ MICHELIN · Green Star (2026 edition)",
  "hook": "The city's only two-star, and the most formally ambitious argument for Anatolian cooking as haute cuisine anywhere",
  "caveat": "★★ in the MICHELIN Guide Türkiye 2026",
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
  "badge": "Michelin",
  "productTags": [
   "New Anatolian",
   "Rooftop"
  ],
  "tags": [
   "Weeks ahead",
   "Dinner, for the light",
   "Best night: Wed"
  ],
  "why": "Chef Mehmet Gürs. The house that invented the phrase New Anatolian Kitchen and spent fifteen years proving it meant something. ★ MICHELIN",
  "hook": "The view is famous; the ingredient philosophy is why it lasted",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026; top two floors of The Marmara Pera",
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
  "badge": "Michelin",
  "productTags": [
   "Modern Turkish",
   "Sustainability"
  ],
  "tags": [
   "Weeks ahead",
   "Dinner",
   "Best night: Wed"
  ],
  "why": "Chef Maksut Aşkar. Traditional Turkish dishes taken apart and rebuilt. ★ MICHELIN",
  "caveat": "⚠ EXACT BUILDING UNVERIFIED — sources disagree. Geocode before publishing.",
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
  "badge": "Michelin",
  "productTags": [
   "Fine dining"
  ],
  "tags": [
   "Weeks ahead",
   "Dinner",
   "Best night: Wed"
  ],
  "why": "Chef Serkan Aksoy. ★ MICHELIN since 2022 · MICHELIN Service Award 2025",
  "hook": "The room for when you want the whole performance right, not only the plates",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
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
  "badge": "Michelin",
  "productTags": [
   "Fine dining",
   "Bosphorus"
  ],
  "tags": [
   "Ahead",
   "Lunch — make the journey part of it",
   "Best night: Wed"
  ],
  "why": "★ MICHELIN",
  "hook": "Worth the drive north",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
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
  "badge": "Michelin",
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "why": "★ MICHELIN",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
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
  "badge": "Michelin",
  "productTags": [
   "Japanese"
  ],
  "tags": [
   "Ahead",
   "Best night: Wed"
  ],
  "why": "Japanese, and genuinely so. ★ MICHELIN",
  "caveat": "★ in the MICHELIN Guide Türkiye 2026",
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
  "badge": "Michelin",
  "productTags": [
   "Open fire",
   "Offal",
   "Counter"
  ],
  "tags": [
   "DIRECT CONTACT ONLY — no booking app, no agency",
   "One seating a night",
   "Best night: Wed"
  ],
  "why": "Chefs Kenan Çetinkaya and Pınar Korgan Çetinkaya. Twelve seats, one open fire. ★ MICHELIN 2026",
  "hook": "THE PICK. If you get in, you have had the defining meal of this decade in Istanbul",
  "order": "whatever comes off the fire — offal first, then the large cuts",
  "caveat": "Twelve seats and one seating — any night is hard; midweek is the least impossible",
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
  "badge": "Petite Table",
  "productTags": [
   "Anatolian",
   "Regional",
   "Daily menu"
  ],
  "tags": [
   "Lunch, when the daily menu is fullest",
   "Best night: Tue"
  ],
  "why": "Founded 1998 by Musa Dağdeviren. Forgotten regional recipes collected village by village: Azeri, Georgian, Arab, Armenian, Assyrian, Ottoman and Jewish dishes in their own traditions. The World's 50 Best Discovery · Chef's Table",
  "hook": "Not a restaurant so much as a field-recording project with a kitchen",
  "order": "from the counter — take what you cannot identify",
  "address": "Caferağa Mah., Güneşlibahçe Sok. No:43, Kadıköy, İstanbul",
  "caveat": "trading 2026; Güneşlibahçe Sk. No: 43, Kadıköy",
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
  "badge": "Petite Table",
  "productTags": [
   "Lokanta",
   "Since 1919"
  ],
  "tags": [
   "09:00–22:30 daily (closed the first two days of public holidays)",
   "Best night: Tue"
  ],
  "why": "Founded 1919 by Fehmi Efendi, whose family migrated from Yanya (Ioannina) in Greece — 'Yanyalı' means 'from Yanya'. Third generation, still family-run. 140–150 different dishes a day. Bib Gourmand 2026",
  "hook": "The mirror image of the city's loss: the oldest surviving lokanta on the Asian side was founded by a family who came the OTHER way in the exchange",
  "address": "Osmanağa Mah., Yağlıkçı İsmail Sok. No:1, Kadıköy, 34714 İstanbul",
  "caveat": "Bib Gourmand confirmed on the MICHELIN Guide's own listing",
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
  "productTags": [
   "Meyhane",
   "Since 1890"
  ],
  "tags": [
   "Long dinner",
   "Best night: Thu"
  ],
  "why": "Trading since 1890.",
  "hook": "The meyhane as it was before the neighbourhood changed hands",
  "caveat": "trading seven days a week; own site agora1890.com",
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
  "badge": "Petite Table",
  "productTags": [
   "Antakya",
   "Regional"
  ],
  "tags": [
   "Best night: Thu"
  ],
  "why": "Antakya cooking in Istanbul, which after the 2023 earthquakes carries a weight it did not have before. Bib Gourmand 2026",
  "caveat": "Bib Gourmand confirmed on the MICHELIN Guide's own listing",
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
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Late dinner",
   "Best night: Thu"
  ],
  "why": "Chef Türev Uludağ.",
  "order": "liver first, then the skewers, then a lahmacun to close",
  "caveat": "⚠ Friday and Saturday evenings are very hard to get into — book ahead",
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
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Late dinner",
   "Best night: Thu"
  ],
  "why": "Ocakbaşı culture against a Bosphorus and Historic Peninsula view, running sunset into night.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Ocakbaşı",
   "Fire counter"
  ],
  "tags": [
   "Late dinner",
   "Best night: Thu"
  ],
  "address": "Skyland, Huzur Mah., Azerbaycan Cad., D1 Blok No:4d, Sarıyer, İstanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Natural wine",
   "Turkish indigenous grapes"
  ],
  "tags": [
   "16:00–00:00",
   "Best night: Tue"
  ],
  "why": "500+ labels served entirely by the glass. As of July 2026: 143 Turkish wineries and 90 endemic grape varieties. Own site wayanatapas.com.",
  "hook": "Go here first; it will reorganise what you think Turkish wine is",
  "order": "a flight of rare native grapes — the whole list is available by the glass",
  "address": "Ferit Tek Sok. 60/B, Moda, Kadıköy, İstanbul",
  "phone": "+90 216 550 22 07",
  "caveat": "Listed on Star Wine List; own site live",
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
  "productTags": [
   "Wine bar",
   "Tapas"
  ],
  "tags": [
   "Lunch Mon–Sat 12:00–14:45 · dinner daily 17:30–00:00",
   "Best night: Thu"
  ],
  "why": "Excellent small Turkish producers, plus tastings and workshops.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Wine bar"
  ],
  "tags": [
   "17:00–00:00 · Fri–Sat to 02:00",
   "Best night: Any except Sun"
  ],
  "address": "Teşvikiye, Hacı Emin Efendi Sok., Nişantaşı Apt No:24C, Şişli, İstanbul",
  "caveat": "⚠ CLOSED SUNDAYS",
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
  "productTags": [
   "Specialty coffee",
   "Roaster"
  ],
  "tags": [
   "Mon–Sun 10:00–22:00 (Fri–Sat to 23:00)"
  ],
  "why": "Roasting its own since 2016; the pioneer most of the scene credits.",
  "address": "Caferağa, Muvakkıthane Cd. No:16/A Kat:1, 34710 Kadıköy, İstanbul",
  "caveat": "Hours current on multiple 2026 listings",
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
  "productTags": [
   "Specialty coffee"
  ],
  "tags": [
   "Morning"
  ],
  "why": "Est. 2016, up the hill from the Kamondo stairs. Australian-café register and a proper flat white.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Specialty coffee"
  ],
  "tags": [
   "Morning"
  ],
  "why": "Run with world-ranked barista Koray Erdoğdu.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Café by day",
   "Hi-fi by night"
  ],
  "tags": [
   "Either end of the day",
   "Best night: Tue"
  ],
  "why": "Morning coffee watching the side street, lunch with friends, and the tempo climbing into a hi-fi evening.",
  "hook": "A café by day that becomes a hi-fi listening bar at night — the format Istanbul has taken to faster than any other European city",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Brunch",
   "Seasonal"
  ],
  "tags": [
   "Morning",
   "Best night: Sun"
  ],
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Breakfast",
   "Brunch"
  ],
  "tags": [
   "Morning",
   "Best night: Sun"
  ],
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Listening bar",
   "Turkish psych",
   "Garden"
  ],
  "tags": [
   "Mon–Sun 12:00–02:00",
   "Best night: Tue"
  ],
  "why": "Anchor since 1999. Selectors move between Turkish psych, jazz and electronic. Functionally a collective as much as a bar.",
  "address": "Kadife Sok. No:18 D:1, Caferağa, Kadıköy, İstanbul",
  "caveat": "open Mon–Sun 12:00–02:00 per a July 2026 listing; Kadife Sok. No:18 D:1",
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
  "productTags": [
   "Vinyl sessions"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "why": "Vinyl-led sessions in the upstairs rooms.",
  "caveat": "⚠ the venue's own Facebook page shows 'Closing Soon' — CHECK BEFORE SENDING ANYONE",
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
  "productTags": [
   "Reggae",
   "Dub"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "House",
   "Electro",
   "Audiophile Sound Room"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "why": "Large main room plus a dedicated audiophile Sound Room.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Listening bar"
  ],
  "tags": [
   "Best night: Tue"
  ],
  "why": "A neighbourhood bar that is also a listening bar — vinyl through good equipment, dancing later.",
  "address": "Teşvikiye, Ahmet Fetgeri Sok. No:31, Şişli, İstanbul",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Techno",
   "House",
   "Funktion-One"
  ],
  "tags": [
   "Late",
   "Best night: Fri (house) · Sat (techno)"
  ],
  "why": "Funktion-One in a modular room. 2026 season has carried Ben Klock, Anja Schneider, Gerd Janson, Cormac, Setaoc Mass and Stef Mendesidis alongside local artists.",
  "hook": "The serious techno room — and the programming actually splits: Fridays lean house, Saturdays go techno",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Techno",
   "Jungle",
   "Footwork",
   "Queer-friendly",
   "Rooftop"
  ],
  "tags": [
   "Late",
   "Best night: Fri"
  ],
  "why": "Multi-level with a rooftop terrace; the experimental end of the programming.",
  "caveat": "Active club listing on Resident Advisor; roof bar hosting music, exhibitions, talks",
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
  "productTags": [
   "Techno",
   "Trance",
   "Jungle",
   "House",
   "Art space"
  ],
  "tags": [
   "Late",
   "Best night: Fri"
  ],
  "why": "The compact bar where the music goes out into the street, plus its late club and art space.",
  "caveat": "Active club listing on Resident Advisor",
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
  "productTags": [
   "Y2K hip-hop",
   "UK garage",
   "Dark disco"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Reggaeton",
   "Pop",
   "Hip-hop",
   "Electronic"
  ],
  "tags": [
   "Best night: Sat"
  ],
  "why": "Multi-floor, broader and more international.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Jazz",
   "Cocktails"
  ],
  "tags": [
   "Evening",
   "Best night: Wed"
  ],
  "why": "Built around jazz and cocktail culture — live jazz plus vinyl DJ sets.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Creative hub",
   "Studios",
   "Residences",
   "500-cap club"
  ],
  "tags": [
   "Best night: Fri"
  ],
  "why": "Offices, artist studios, residences and common rooms, plus a club room with a 500-capacity floor and real acoustics.",
  "hook": "The clearest example in the city of artists building their own infrastructure",
  "caveat": "Active club listing on Resident Advisor",
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
  "productTags": [
   "Queer community",
   "Exhibitions",
   "Performance",
   "Music"
  ],
  "why": "Founded 2021 by Elçin Acun and Yasemin Kalaycı. Non-profit production and exhibition space supporting feminist and queer artists, on identity and gender fluidity. Showed at Contemporary Istanbul CI BLOOM 2026.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Artist-run",
   "Non-profit"
  ],
  "why": "Began 2015 as TOZ, founded by Ece Elder, Elvan Ekren, Sinem Dişli and Volkan Kızıltunç; NOKS after 2018, run by Kızıltunç and Ekren. Showed at Contemporary Istanbul CI BLOOM 2026; SAHA-supported.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Artist books",
   "Experimental"
  ],
  "why": "Long-running independent spaces — artist books and experimental programming. SAHA Sustainability Fund supported.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Label",
   "Live room",
   "Jazz"
  ],
  "why": "İlhan Erşahin's label and room, founded 2005 as the extension of the Nublu sound from New York's Lower East Side.",
  "hook": "The most internationally connected music operation in the city",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Rooftop",
   "Old-city view"
  ],
  "tags": [
   "TL 400–700 a cocktail (2026 hotel-rooftop band)",
   "Book for sunset",
   "Daily, midday to late"
  ],
  "why": "Views over the Golden Horn, Bosphorus, Hagia Sophia, Topkapı and the Blue Mosque.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Rooftop",
   "270° view"
  ],
  "tags": [
   "Book for sunset",
   "Sunset"
  ],
  "why": "270° over the Bosphorus, the Golden Horn and the tower; DJs nightly.",
  "address": "Hobyar Mah., Hoca Kasım Köprüsü Sok. No:2, Sirkeci, Fatih, İstanbul",
  "caveat": "⚠ It is in SIRKECI, not Karaköy — do not send anyone to the wrong shore",
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
  "productTags": [
   "Rooftop",
   "Cocktails"
  ],
  "tags": [
   "Sunset",
   "Best night: Any except Tue"
  ],
  "caveat": "⚠ CLOSED TUESDAYS",
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
  "productTags": [
   "Rooftop"
  ],
  "tags": [
   "17:00–01:00"
  ],
  "caveat": "⚠ SEASONAL — Marriott's own listing has carried a 'Seasonally Closed' label. Check before going.",
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
  "productTags": [
   "Rooftop",
   "Modern Mediterranean"
  ],
  "tags": [
   "Dinner from 18:00"
  ],
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Modern",
   "Local ingredients"
  ],
  "tags": [
   "Tue–Sat 18:00–00:00",
   "Best night: Tue–Sat"
  ],
  "why": "Chef Burak Zafer. Opened 30 January 2026.",
  "caveat": "⚠ CLOSED SUNDAYS AND MONDAYS",
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
  "productTags": [
   "Fire-focused",
   "Modern"
  ],
  "why": "Chef Mustafa Otar. Opened January 2026 as a chef's-table counter built on 'fire, emotion and roots'.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Modern Anatolian"
  ],
  "tags": [
   "Best night: Sun, for the jazz brunch"
  ],
  "why": "One of Beyoğlu's most talked-about new chef restaurants, and already a brunch fixture. Sunday jazz brunch.",
  "caveat": "⚠ Neighbourhood disputed across sources (Beyoğlu vs Nişantaşı) — confirm before travelling",
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
  "productTags": [
   "Comfort food"
  ],
  "why": "Esen Hünal, Maksut Aşkar and Erim Leblebicioğlu.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Vietnamese"
  ],
  "why": "Chef Mahmut Can Kızılbay.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "badge": "Michelin",
  "productTags": [
   "Neo-bistro"
  ],
  "why": "Kaan Sakarya and Derin Arıbaş, both trained in Michelin kitchens in France. In the 2026 MICHELIN selection",
  "caveat": "in the MICHELIN Guide Türkiye 2026 selection",
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
  "productTags": [
   "Modern Anatolian",
   "Bosphorus view"
  ],
  "why": "Regional Anatolian flavours through contemporary technique, over the Bosphorus — a refined interpretation rather than a recreation.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Meyhane",
   "Turkish and Rum tradition"
  ],
  "why": "Opened by Perviz Resuli on the first floor of the historic Union Française building at Minoa Pera. Capacity 70. Explicitly marries the old Istanbul meyhane to Greek cooking.",
  "hook": "The most interesting new room in the city — a Rum meyhane revival opening in 2026 is a loaded act, and it is the living answer to this guide's history section",
  "address": "Asmalı Mescit Mah., Meşrutiyet Cad. No:99, Beyoğlu, İstanbul",
  "phone": "+90 539 693 12 78",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Korean",
   "Pop-up"
  ],
  "why": "Jimmy & Jin.",
  "caveat": "POP-UP — will not last · pop-up — no stated end date, will not last",
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
  "productTags": [
   "Oysters",
   "Raw bar"
  ],
  "why": "A small seafood bar built on oysters and raw fish.",
  "caveat": "Limited seating — reservations needed for evening service",
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
  "productTags": [
   "Modern Anatolian",
   "Grand hotel"
  ],
  "tags": [
   "Best night: Sun, for the brunch"
  ],
  "why": "Sharing plates in the Çırağan Palace Kempinski. It revived the long-missed Sunday brunch tradition.",
  "caveat": "not cross-checked in this pass — do not publish as open",
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
  "productTags": [
   "Pop-up"
  ],
  "caveat": "RUNS ONLY TO THE END OF AUGUST 2026 · stated to run only to the end of August 2026",
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
  "productTags": [
   "Boza",
   "Since 1876"
  ],
  "tags": [
   "Winter — it is a cold-season drink"
  ],
  "why": "Selling boza since 1876.",
  "hook": "The point of going is the room, unchanged",
  "order": "boza with cinnamon and roasted chickpeas",
  "caveat": "own site vefa.com.tr active",
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
  "productTags": [
   "Wooden houses",
   "Mosque + synagogue + church"
  ],
  "tags": [
   "Late afternoon",
   "Best night: Sun"
  ],
  "hook": "The single loveliest street in Istanbul, and the physical proof of the city this guide describes",
  "caveat": "A neighbourhood, not a venue",
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
  "productTags": [
   "Old Greek and Jewish quarters"
  ],
  "tags": [
   "Early — it fills"
  ],
  "caveat": "Neighbourhoods, not venues",
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
  "productTags": [
   "Yalı",
   "3 km waterside walk"
  ],
  "tags": [
   "Late afternoon"
  ],
  "hook": "The best hour on the European shore",
  "caveat": "A walking route, not a venue",
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
  "productTags": [
   "No cars",
   "Wooden houses",
   "Monastery of St George"
  ],
  "tags": [
   "A full day",
   "Best night: Sun"
  ],
  "why": "About 5 × 1 km. Roughly 90 minutes by ferry from the European piers, 45 from the Asian side.",
  "caveat": "An island, not a venue",
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
  "productTags": [
   "Market streets",
   "Barlar Sokağı",
   "Moda",
   "Yeldeğirmeni"
  ],
  "tags": [
   "Market by day, bars by night",
   "Best night: Sat"
  ],
  "hook": "The centre of gravity of everything good happening in Istanbul now",
  "caveat": "A district, not a venue",
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
  "productTags": [
   "Jazz",
   "Live nearly every night",
   "120 seats"
  ],
  "tags": [
   "Mid",
   "Recommended",
   "Weekdays 21:30–00:30 · weekends 22:30–01:30",
   "Best night: Wed"
  ],
  "why": "Roughly 120 seats at the foot of the Galata Tower, live jazz from local and international acts practically every night. Programming already listed into 2026–27.",
  "hook": "THE jazz room in Istanbul, and the reason Wednesday is on the week grid",
  "address": "Kuledibi Sok., Galata, Beyoğlu, İstanbul",
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
  "body": "Yanyalı Fehmi Lokantası has been open in Kadıköy since 1919, founded by Fehmi Efendi, whose family migrated from Yanya — Ioannina, in Greece. 'Yanyalı' means 'from Yanya'. In a city whose Greek community was removed by a wealth tax, a pogrom and an expulsion, the oldest surviving lokanta on the Asian side was founded by a family who came the other way in the same exchange. Third generation, still family-run, 140–150 dishes a day."
 },
 {
  "title": "Why the meyhane looks the way it does",
  "body": "Under the Ottoman millet system the empire's non-Muslim communities governed their own affairs — and because alcohol was forbidden to Muslims, the licence to run a drinking house was effectively a non-Muslim one. For centuries the tavern was a Greek, Armenian or Jewish institution. The long table of cold mezes, the rakı poured with water, the fasıl musicians moving between tables: that is not a Turkish invention that happens to be old, it is a minority institution that outlived the minority."
 }
];
  const TABLES = {
 "groups": [
  {
   "label": "Les Grandes Tables",
   "desc": "The rooms arguing about what Turkish cooking is allowed to become. Book weeks ahead.",
   "sections": [
    {
     "label": "The starred houses",
     "ids": [
      "turk-fatih-tutak",
      "mikla",
      "neolokal",
      "nicole",
      "araka",
      "arkestra",
      "sankai-by-nagaya"
     ],
     "desc": "One two-star and seven one-stars. Formal, expensive, and each answering the same question differently."
    }
   ]
  },
  {
   "label": "Les Petites Tables",
   "desc": "Smaller, more specific, mostly across the water — where the cooking is least translated for you.",
   "sections": [
    {
     "label": "The rooms that matter more",
     "ids": [
      "araf-istanbul",
      "ciya-sofrasi",
      "yanyali-fehmi-lokantasi",
      "agora-meyhanesi",
      "casius-antioch-kitchen"
     ],
     "desc": "A twelve-seat fire counter, a field-recording project with a kitchen, and a lokanta open since 1919."
    },
    {
     "label": "The fire counters",
     "ids": [
      "tam-ocakbasi",
      "mesai",
      "cira-ocakbasi"
     ],
     "desc": "A bar with a charcoal trench in it, and you sit at the trench. Liver first, then skewers, then lahmacun."
    },
    {
     "label": "The 2026 wave",
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
     ],
     "desc": "The newest rooms, most with a rising chef's name on them. Reported, not ranked — check before you travel."
    }
   ]
  }
 ]
};
  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES };
})();
