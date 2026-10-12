# Istanbul-Bogazici GOLD6 card rewrite brief (12 Oct 2026) — read fully before writing

Guide: Istanbul & the Bosphorus (Littoralicious terroir guide, for superyacht crews, chefs and their guests).
Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md (read it). Example of finished output from the same pipeline
(Diani, Kenya): /tmp/claude-0/-home-user-Littoralicious-com/6d30975c-f6a7-5a49-987c-b71693ed6f79/scratchpad/diani/terroir/_rollout/review/Diani-Kwale/cards.json — match that quality, format and tone.

Your input file: research/rewrite_N_input.json = {"cards": {key: {fold, group, angle_note, ref, ref_venue, old_cards:[...]}}, "lane_venues": {id: name}, "cut_venues": [names]}.
Each key is ONE new card built from the listed old cards (several old cards = a merge: fold the best verified facts of all into one card, told once).

## Card output format (one JSON object keyed by the card key you were given)
{ "<key>": { "name": "visible card title (reuse the old name unless a merge needs a better one; unique across the guide; no emoji)",
  "tag": "1-3 word kicker, lowercase",
  "teaser": "ONE hook line, <=110 chars",
  "story": "60-110 words, TRUE, vivid and specific — a date, a person, a sound, a taste, what you will actually see. Plain text, no HTML",
  "why": "one line: why go / the one thing not to miss (distinct from the story; no repeated sentence)",
  "facts": [["Label","Value"], ...],   // labelled facts by card type, see SPEC (walk: Start · Length · Time · Terrain · Best hour · Don't miss · Bring; sight/museum/garden/square: Where · Open · Cost · Best hour · Time needed · Don't miss; day trip/village: Getting there · Time needed · Don't miss · Eat; market: Days · Hours · Go at · Look for; craft: What you do · Time · Cost · Book; wine how-to: In the glass · On the label · Ask for; quarter: Go for · Best hour · Don't miss · Eat; story/no place: Touch it today · Where the sources argue; follow: What it is · Language · Read). Values start with a capital and never repeat the label. Omit a label rather than guess.
  "maps_query": "Google Maps search text for the place you GO to (a walk's START point), ending with 'Istanbul' (e.g. 'Kılıç Ali Paşa Hamamı Tophane Istanbul'). EMPTY for stories, history, warnings, anything that is not a place, and for follow/press cards",
  "site": "the place's OWN https website if an old card linked it (never an aggregator/Wikipedia/TripAdvisor); else empty",
  "ref": "copy the 'ref' from the input (a lane venue id) or empty. If ref is set the card is a POINTER: story is ONE or TWO sentences in THIS SECTION's angle, facts = Order · When · Book · Price only, no maps_query",
  "sources": [{"label":"...","url":"https://..."}]  // the old card's source links you still rely on + any new ones you used
} }
Also top-level "_verified": {"key": "what you checked now, source, date"} and "_notes": "honest gaps" in the same JSON.

## Rules (hard)
- Facts ONLY from the old cards you are given (their text, links), research/venues_old_kept.json (the kept venue records), or what you verify NOW with WebSearch (trusted sources: official/venue/museum sites, the Ministry of Culture (muze.gov.tr), İBB, UNESCO, MICHELIN, quality press: Hürriyet Daily News, Daily Sabah, Duvar, Cornucopia, Culinary Backstreets, academic). WebFetch and every other network call FAIL in this sandbox: use WebSearch only. Budget ~10-12 WebSearch calls, spent where a fact looks perishable (2026 ticket prices, opening days, a closure, a restoration) or wrong.
- Never invent hours, prices, distances, phone numbers, names, dates. Date every price: "(seen Aug 2026)" if from the old card, "(Oct 2026)" if verified now. Ticket prices in Turkey move fast: if you cannot re-verify a price, keep it with its Aug 2026 date.
- No perishable clock facts in evergreen cards (e.g. not "sunset 20:05"; say "the light goes late in summer: Turkey stays on UTC+3 all year").
- Disputes stay disputes ("Where the sources argue"). Never upgrade a legend to fact.
- Told once: respect the angle_note; do not retell a fact the note says lives elsewhere (point instead: "told in the food-history fold").
- NEVER recommend or name as a pick a cut venue (cut_venues list). Lane venues (lane_venues) have their own table cards: name them freely, but do not retell their whole story.
- Plain specific English. No emoji, no ⚠ or ★ in any field. Banned words anywhere: hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, off the beaten track, unspoilt, charming, romantic, couple, couples, "for two", à deux, honeymoon. Do not use the words "Prague", "Sicily", "Kenya", "Zanzibar".
- Avoid copying the same 4-word runs between cards; keep story and why distinct.
- Write valid UTF-8 JSON ONLY to the output path you were given. Do not touch git or any other file.
