# Card enrichment spec — East Sicily city guides (Arnaud, 5 Oct 2026)
"make all the cards more interesting and complete so people are really captivated about the places they
could visit. add labels even in things like walks so it's easy to read."

Input: enrich/<city>-input.json  — {cards: {key: card}, pointers: {key: venue_id}, venues: {id: venue}}
Output: enrich/<city>-out.json (valid JSON, UTF-8):
{
 "cards":    { "<same key>": { "tag": "short kicker, 1-3 words", "teaser": "ONE captivating hook line, <=110 chars",
                               "story": "60-110 words (sea stories: up to 160) — vivid and TRUE: the detail that makes someone want to go (a date, a person, a sound, a taste, what you will actually see)",
                               "why": "optional, one line: why go / the one thing not to miss (for sea stories: the old hand's point, kept)",
                               "facts": [["Label", "value"], ...],
                               "sources": [{"label": "...", "url": "https://..."}]   // only NEW sources you used
                             } },
 "pointers": { "<same key>": { "teaser": "<=110 chars, this SECTION's angle on the venue (not its general description)",
                               "line": "one sentence in this section's angle", "facts": [["Order","..."],["When","..."],["Book","..."]] } },
 "venues":   { "<id>": { "hook": "one line, what it is, <=110 chars", "why": "50-90 words: the story/origin/one verified fact that makes you want to go — fresh, not praise; keep it distinct from verdict" } },
 "verified": { "<id or key>": "what you verified now, with source and date" },
 "notes": "honest gaps"
}
LABELS by card type — use ONLY those you can fill truthfully; omit rather than guess; dated prices "(seen Oct 2026)":
· walk: Start · Length · Time · Terrain · Best hour · Don't miss · Bring          (length/time may be approximate if stated "about")
· sight/museum/garden/square: Where · Open · Cost · Best hour · Time needed · Don't miss
· beach/cove: Getting there · Best hour · Bring · Don't miss
· day trip/village/town: Getting there · Time needed · Don't miss · Eat
· market: Days · Hours · Go at · Look for
· product (DOP/IGP): What it is · Season · Where to buy · Taste it
· event: When · Where · Cost · Tip
· story (sea): Touch it today · Where the sources argue
· craft: What you do · Time · Cost · Book
· wine how-to: In the glass · On the label · Ask for
· person (born here): Born · Trace today · Read
· pointer (venue in a section): Order · When · Book · Price
RULES
- Facts ONLY from the input content (card text, practical, sources, venue fields) or verified NOW against a trusted source (official/venue site, MICHELIN, Gambero Rosso, Slow Food, UNESCO, museum/park site, INGV, quality press). Add every new source to that card's "sources". Never invent hours, prices, distances, phone numbers.
- Keep every dispute ("the sources argue") honest; never upgrade a legend to fact.
- Plain, specific English. No emoji. Banned: hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, off the beaten track, unspoilt.
- Do not repeat the same fact across two cards of the same guide; each card gets its own angle.
- Search budget ~25 WebSearch calls; prefer WebFetch on known official pages.
- Write ONLY to enrich/<city>-out.json. Never touch any git clone.
