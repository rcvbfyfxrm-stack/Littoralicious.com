# Bozcaada-NorthAegean GOLD6 — venue re-verification + rewrite brief (27 Oct 2026)
Guide: Bozcaada (Tenedos), Çanakkale, Türkiye — the wine island at the mouth of the Dardanelles (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 27 October 2026: OFF-SEASON — the island empties in winter and many places close from October/November to April. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Bozcaada-NorthAegean/).
Model output (same pipeline, Lons 26 Oct): /tmp/claude-0/-home-user-Littoralicious-com/4a7b6447-0430-5847-96e5-578e6bdfa450/scratchpad/lons/terroir/_rollout/review/lons-le-saunier-jura/research/verify_1.json — copy the format exactly.
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched in May-June 2026; its TripAdvisor rank claims are perishable (do not print ranks as facts; a 2026 award or guide listing — e.g. the MICHELIN Guide Türkiye (first Istanbul/İzmir/Bodrum selections 2022-2025: is any Bozcaada table in it? verify), Gault&Millau Türkiye, the National Geographic 2026 list — is better). Give every one a status now, and dishes. Say plainly for each whether it is open NOW (late October) and into November-December-winter, with closing days; whether it is seasonal (and its season). That is the most important thing you find.
The old records carry lat/lng that look approximate. If you find the venue's address differs from the old record (a different street/quarter), add "drop": ["lat","lng"] so no wrong pin is drawn; never invent coordinates.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-27" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, award, press); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed for good (say when, source),
           "name": "only if the old name is wrong/needs Turkish characters",
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'why' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — what the room LOOKS like, how it FEELS, what it TASTES of — fresh, not praise, DISTINCT from the venue's 'verdict' (transform, keep the good facts)",
           "verdict": "40-80 words, the editor's honest judgement in the same voice",
           "signature": "the plate to order, one line", "caveat": "the honest warning (booking, season, cash, distance from town), one line",
           "person": "the chef/owner named in a 2026 source, if any (else omit)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"sweet"|"drink"}, ...]  — 3 to 8 REAL plates/drinks/products of THIS venue (for the wineries: the wines to taste; for the market and shops: what to buy there), from its record or verified now; never invent; at least 2,
           "season": "e.g. 'Seasonal: April to October (2026)' or 'Year-round'",
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)')", "reservation": "...", "neighborhood": "short place name, e.g. 'Rum quarter', 'Harbour', 'Castle square', 'Alaybey', 'Among the vines, west of town'",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} for EVERY venue,
           "badge": "clean <=18-char upper-case badge for every venue",
           "tags": [] (leave empty: the build makes them),
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table on Bozcaada, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Place; Venue, Place"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps — AND name in _notes any well-evidenced island table or cellar that is OPEN IN WINTER 2026 (name, address, source) that this guide lacks, without writing a record for it — and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~2-3 WebSearch per venue; search in Turkish too ("kışın açık", "sezon", "Bozcaada restoran kış").
Trusted: own sites/socials, MICHELIN, Gault&Millau, Hürriyet, Milliyet, Daily Sabah, Hürriyet Daily News, Cumhuriyet, Habertürk, NTV, Yemek.com/Yemek ve Kültür, Katie Parla, Culinary Backstreets, Lonely Planet, National Geographic, Decanter, Jancis Robinson, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/dishes/verdict. Do not use the words Prague, Sicily, Barcelona, Athens, Cavalaire, Split, Dubrovnik, Faro, Algarve, Beaune, Lons, Jura, Cadaqués.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
