# Girona-Catalunya GOLD6 — venue re-verification + rewrite brief (20 Oct 2026)
Guide: Girona (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 20 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Girona-Catalunya/).
Model output (same pipeline, Costa Brava 19 Oct): /tmp/claude-0/cb/research/verify_1.json and /tmp/claude-0/cb/research/verify_2.json — copy the format exactly (read 2 venues). It already verified El Celler de Can Roca (v01-el-celler-de-can-roca), Mercat del Lleó (v11-mercat-del-lle there), La Fábrica (v15-la-f-brica there), Rocambolesc (v16-rocambolesc there) on 19 Oct: reuse those findings for our ids (re-search once for anything newer), but write a FRESH hook and why (no sentence copied).
The old venue records (June-July 2026 research, good quality) carry NO status and NO check date; most carry dishes[] already — keep and correct them. Their 'why' fields often run why + 'To order:' + caveat together: rewrite cleanly. Give every one a status now.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-20" — "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN Spain 2026 selection, Repsol 2026, award, press); nothing dated 2026 but nothing against → "unverified"; "closed" if closed for good (when, source),
           "hook": "<=110 chars, what it is, fresh",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from 'verdict' and from the old 'why' (transform, keep the good facts)",
           "verdict": "one or two sentences: the editor's judgement (who it is for, what to order first) — distinct from why",
           "dishes": [{"name": "...", "note": "one short line", "kind": "dish"|"sweet"|"drink"}, ...] — 3 to 8 REAL plates/drinks of THIS venue (for a market/shop/winery: the products to buy); never invent; at least 2,
           "hours": "only with evidence; conflicts -> 'Call ahead: <what each source says>'",
           "address", "phone" (only if found in a trusted source), "web" (own site only), "price_range" (dated '(seen Oct 2026)' or '(seen Jul 2026)'), "reservation", "caveat", "neighborhood" (short: 'Girona · Taialà', 'Barri Vell · Plaça del Vi'),
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} — one for EVERY venue,
           "badge": "clean <=18-char upper-case badge",
           ...ONLY fields you add or correct from evidence },
  "drop": [fields to remove because wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table in Girona, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Girona; Venue, Girona"}} for EACH lane key (_lane_key) in your file, "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~2 WebSearch per venue (more for the guest list and the berths).
The guest list as drafted: last minute (v36-zanpanzar, v08-casa-marieta, v37-restaurant-8de7), this week (v31-dit-i-fet, v09-fonda-cal-ros, v02-restaurant-massana), grand night (v01-el-celler-de-can-roca, v21-esperit-roca, v03-divinum); berths v01, v07-can-marques, v19-mercat-del-lleo. Look HARD for current status: the MICHELIN Spain 2026 stars of Massana, Divinum, Esperit Roca (and whether any changed); Massana still trading under Pere Massana; Nexe (ex-Nu, id v10-nu: the record says it was renamed — give the CURRENT name in "name" and "short"); Zanpanzar after the May-2025 handover; Can Roca Taialà menú price 2026; Fonda Cal Ros days; Sunset Jazz Club's 2026 programme; Cul de la Lleona (Catmandu) trading; Nomo Girona trading; Tornés; Ca l'Àngel. If one closed or lost/gained a star, say so plainly — the editor rebuilds the list from what you find.
Trusted: own sites/socials, MICHELIN, Repsol, Macarfi, La Vanguardia, El País, Ara, Diari de Girona, El Punt Avui, ElNacional.cat, El Periódico, Time Out, Condé Nast Traveller, the Ajuntament, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/verdict/dishes. Do not use the words Prague, Sicily, Athens, Istanbul, Paris, Var, Provence, Kenya ("born in Kenya" in Safo's record: rephrase as 'born in East Africa' or leave out).
Plain text only, no HTML. Write valid UTF-8 JSON ONLY to the output path you were given. Do not touch git or other files.
