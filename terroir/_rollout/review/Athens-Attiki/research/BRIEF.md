# Athens-Attiki GOLD6 card rewrite brief (13 Oct 2026) — read fully before writing

Guide: Athens & Attica (Littoralicious terroir guide, for superyacht crews, chefs and their guests; the harbour, Piraeus and the islands live in a SEPARATE Piraeus & Saronic guide at /terroir/Piraeus-Saronic/).
Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md (read it). Model of finished output from the same pipeline (Istanbul): /tmp/claude-0/-home-user-Littoralicious-com/3529e867-9afe-55c6-981c-8b5409cb4a74/scratchpad/ex/ist_rewrite_1.json and /tmp/claude-0/-home-user-Littoralicious-com/3529e867-9afe-55c6-981c-8b5409cb4a74/scratchpad/ex/ist_cards.json — match that quality, format and tone.
The whole old guide as text (for context, grep it): research/guide_text_old.txt. Kept table venues and their records: research/venues_input_1.json and research/venues_input_2.json (ids, names, lanes).

Your input file: research/rewrite_N_input.json = {key: {fold, group, old: {old card: name, tag, teaser, text, meta, maps, ...} | absent for a NEW card, brief: "what a NEW card must be" (optional), pointer_to_venue: "<venue id>" (optional)}}.

## Card output format (one JSON object keyed by the card key you were given)
{ "<key>": { "name": "visible card title (reuse the old name, tidied; unique; no emoji)",
  "tag": "1-3 word kicker, lowercase",
  "teaser": "ONE hook line, <=110 chars",
  "story": "60-110 words (sea/beach cards up to 140), TRUE, vivid and specific — a date, a person, a sound, a taste, what you will actually see. Plain text, no HTML",
  "why": "one line: why go / the one thing not to miss (distinct from the story; no repeated sentence)",
  "facts": [["Label","Value"], ...],   // labelled facts by card type, see SPEC: walk: Start · Length · Time · Terrain · Best hour · Don't miss · Bring; sight/museum/garden: Where · Open · Cost · Best hour · Time needed · Don't miss; beach/cove: Getting there · Best hour · Bring · Don't miss (+ Cost if paid); day trip: Getting there · Time needed · Don't miss · Eat; market: Days · Hours · Go at · Look for; shop/producer: Where · Open · Buy · Price; craft: What you do · Time · Cost · Book; wine/drink how-to: In the glass · On the label · Ask for; quarter: Go for · Best hour · Don't miss · Eat; café/room: Where · Open · Order · Work?; bar: Where · Pour · Price · Best hour; story/no place: Touch it today · Where the sources argue; follow: What it is · Language · Read. Values start with a capital and never repeat the label. Omit a label rather than guess.
  "maps_query": "Google Maps search text for the place you GO to (a walk's START point), ending with 'Athens' (or the place name + 'Attica' for out-of-town, e.g. 'Megalo Kavouri Beach Vouliagmeni Attica'). EMPTY for stories, people, songs, warnings, 'honestly' cards, drink how-tos and follow/press cards",
  "site": "the place's OWN https website only if you are confident it is the official one (never an aggregator/Wikipedia/TripAdvisor/Facebook); else empty",
  "ref": "if the input has pointer_to_venue, copy that id here and write a POINTER: story is ONE or TWO sentences in THIS SECTION's angle, facts = Order · When · Book · Price only, no maps_query. Else empty",
  "sources": [{"label":"...","url":"https://..."}]  // only sources you actually relied on (old ones you know, or new ones you found)
} }
Also top-level "_verified": {"key": "what you checked now, source, date"} and "_notes": "honest gaps" in the same JSON.

## Rules (hard)
- Facts ONLY from the old card, the old guide text, the venue records, or what you verify NOW with WebSearch (trusted: official/venue/museum sites, the Hellenic Ministry of Culture (odysseus.culture.gr / culture.gov.gr), City of Athens / thisisathens.org, UNESCO, MICHELIN, World's 50 Best, quality press: Kathimerini/ekathimerini, LiFO, Athinorama, Culinary Backstreets, Greek City Times only for corroboration). WebFetch and every network call except WebSearch FAIL in this sandbox: use WebSearch only. Budget ~10-14 WebSearch calls, spent where a fact is perishable (2026 ticket prices and opening hours — the Ministry changed many site/museum prices in 2025-26; a closure; a restoration; a bar's 2026 ranking) or looks wrong. Expect errors in the old text and correct them, listing each correction in _verified.
- Never invent hours, prices, distances, phone numbers, names, dates. Date every price: "(seen Jul 2026)" if only from the old card, "(Oct 2026)" if verified now. Winter vs summer hours: Greek state sites switch to winter hours in autumn (often from 1 Nov or mid-Sept to 31 Mar) — give both if known, else say 'check winter hours'.
- No perishable clock facts in evergreen cards (no exact sunset time).
- Disputes stay disputes ("Where the sources argue"). Never upgrade a legend to fact.
- Told once: do not retell a fact another card owns (Numismatic Museum house vs the Nummus garden café; Okupa's listening bar vs the hi-fi card; Mokka coffee vs the drink cards; Miran/Krinos table cards). Point instead ("its own card is in the tables").
- Cut venues (never recommend): CTC Urban Gastronomy, Makris Athens, O Makis. Lane venues have their own table cards: name them freely but do not retell their story.
- Plain specific English. No emoji, no ⚠ or ★ in any field. Banned words anywhere: hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, off the beaten track, unspoilt, charming, romantic, couple, couples, "for two", à deux, honeymoon. Do not use the words Prague, Sicily, Istanbul (as a place to go), Kenya, Zanzibar, Siracusa.
- Avoid copying the same 4-word runs between cards; keep story and why distinct; do not paste the old text verbatim — transform it (keep its good facts).
- Write valid UTF-8 JSON ONLY to the output path you were given. Do not touch git or any other file.
