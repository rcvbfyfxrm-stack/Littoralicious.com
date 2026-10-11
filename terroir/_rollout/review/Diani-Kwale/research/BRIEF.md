# Diani-Kwale GOLD6 rewrite brief (11 Oct 2026) — read fully before writing

Guide: Diani Beach & the Kwale south coast, Kenya (Littoralicious terroir guide, for superyacht crews/chefs/guests).
Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md (read it). Example of finished output, same coast family:
/tmp/claude-0/-home-user-Littoralicious-com/fa48329b-e81b-59df-ad96-68188a719f0b/scratchpad/kendwa/terroir/_rollout/review/Kendwa-Unguja/cards.json
(and venues.json there for the venue format). Match that quality and tone.

## Card output format (one JSON object keyed by the card key you were given)
{ "<key>": { "name": "visible card title (reuse the old name unless a merge needs a better one; unique across the guide)",
  "tag": "1-3 word kicker, lowercase", "teaser": "ONE hook line, <=110 chars, no full stop needed",
  "story": "60-110 words, TRUE, vivid and specific (sea/history stories in sea-stories: up to 160 words)",
  "why": "one line: why go / the one thing not to miss. For sea-stories start with '★ ' and keep the old hand's seamanship point",
  "facts": [["Label","Value"], ...]   // labelled facts by card type, see SPEC; values start with a capital; never repeat the label in the value
  "maps_query": "Google Maps search text for the place you GO to (a walk's START point), with a local token (Diani/Ukunda/Kenya/Shimoni/Wasini/Gazi/Msambweni/Tiwi/Kwale/Mombasa/Galu/Kinondo/Chale/Kisite/Shimba/Funzi/Likoni...). EMPTY for stories, history, warnings, tides, anything that is not a place",
  "site": "the place's OWN https website if the old card had one (fcard__site link); else empty. Never an aggregator",
  "ref": "if this card is ABOUT a venue in lane_venues (it has its own table card), put its id here: the card becomes a pointer (no Maps, gets 'Full card →'). Else empty",
  "sources": [{"label":"...","url":"https://..."}]  // carry the old card's source links that you still rely on + any new ones
} }
Pointer cards (ref set): story is ONE or TWO sentences in THIS SECTION's angle (e.g. bars: the drink and the hour; linger: the work truth), facts = Order · When · Book · Price.
Story cards (sea-stories etc): facts = "Touch it today" + "Where the sources argue" (only if they do).

## Rules (hard)
- Facts ONLY from the old cards you are given (their text, links), the kept venue records in research/venues_old_kept.json, or what you verify NOW with WebSearch (trusted sources only: official/venue sites, KWS, Kenya Wildlife Service, UNESCO, National Museums of Kenya, quality press, academic). The network is blocked except WebSearch (WebFetch will fail: don't use it). Budget ~10 WebSearch calls; only where a fact looks perishable or wrong.
- Never invent hours, prices, distances, phone numbers, names, dates. Omit a label rather than guess. Date every price: "(seen Aug 2026)" if from the old card, "(Oct 2026)" if verified now.
- Disputes stay disputes ("Where the sources argue").
- "Merges = told once": when a card merges several old cards, fold the best verified facts of all into one card; don't lose substance.
- Told once across the guide: each card its own angle; do not retell a fact that the note says lives elsewhere (point instead: "told in the sea section").
- NEVER recommend or name as a pick a cut venue: cut ids are listed in the input (cut_venues). Names of cut clubs may appear only as 'also listed in 2024, nothing verifiable'.
- Plain specific English. No emoji, no ⚠ or ★ in teasers (★ only as the why prefix in sea-stories). Banned words anywhere: hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, off the beaten track, unspoilt, charming, romantic, couple, "for two", à deux.
- Avoid copying the same 4-word runs between cards; keep story and why distinct (no repeated sentences).
- Write valid UTF-8 JSON ONLY to the output path you were given. Do not touch git or any other file.
Also output a top-level "_verified": {"key": "what you checked now, source, date"} and "_notes": "honest gaps" in the same JSON file.
