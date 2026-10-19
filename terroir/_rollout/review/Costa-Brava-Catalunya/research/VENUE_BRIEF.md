# Costa-Brava-Catalunya GOLD6 — venue re-verification + rewrite brief (19 Oct 2026)
Guide: Costa Brava (Littoralicious terroir guide for superyacht crews, chefs and their guests): the Girona coast from Palamós to Cap de Creus, the Empordà plain and Girona city. Today is 19 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Costa-Brava-Catalunya/).
Model output (same pipeline, Cadaqués 18 Oct): /tmp/claude-0/-home-user-Littoralicious-com/72fcd936-c4a5-5ccc-9eda-177557f3bcc8/scratchpad/cad/terroir/_rollout/review/Cadaques-CapdeCreus/research/verify_1.json — copy the format exactly (read 2 venues of it). It already verified Compartir Cadaqués on 18 Oct (id v01-compartir-cadaques there): reuse its findings for our v03-compartir-cadaqu-s (re-search once for anything newer), but write a FRESH hook and why (no sentence copied).
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched in June 2026. Their 'why' fields are run-together paste (why + 'To order:' + caveat): rewrite cleanly. Give every one a status now, and dishes. Some coastal tables are SEASONAL: give each one's 2026 season and say plainly whether it is open now (19 Oct) or closed for the winter, with the reopening if announced.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-19" — "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN Spain 2026 selection, Repsol 2026, award, press); a seasonal house that traded in 2026 and is shut for the winter is still "confirmed" (say so in "season"); nothing dated 2026 but nothing against → "unverified"; "closed" if closed for good (when, source),
           "hook": "<=110 chars, what it is, fresh",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from 'verdict' and from the old 'why' (transform, keep the good facts)",
           "verdict": "one or two sentences: the editor's judgement (who it is for, what to order first) — distinct from why",
           "dishes": [{"name": "...", "note": "one short line", "kind": "dish"|"sweet"|"drink"}, ...] — 3 to 8 REAL plates/drinks of THIS venue (for a market/auction/shop: the products to buy, kind 'dish'); never invent; at least 2,
           "season": "e.g. 'Year-round' or 'Seasonal: ... 2026; open now' or 'Call ahead: no 2026 season found'",
           "hours": "only with evidence; conflicts -> 'Call ahead: <what each source says>'",
           "address", "phone" (only if found in a trusted 2026 source), "web" (own site only), "price_range" (dated '(seen Oct 2026)' or '(seen Jun 2026)'), "reservation", "caveat", "neighborhood" (short: 'Girona · Taialà', 'Palamós · the port'),
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} — give one for EVERY venue (the award/status line: e.g. MICHELIN 3 stars 2026 · Repsol 3 Soles; or 'Since 1967'), 
           "badge": "clean <=18-char upper-case badge",
           ...ONLY fields you add or correct from evidence },
  "drop": [fields to remove because wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table on this coast, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Town; Venue, Town"}} for EACH lane key (_lane_key) in your file, "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~2 WebSearch per venue (more for the grand night and the berths).
Look HARD for CURRENT status, season and hours, dated. The guest list as drafted: last minute (v14-la-tabarra, v09-cal-tet, v07-can-bonay), this week (v08-la-gamba, v04-casamar, v10-rafa-s), grand night (v01-el-celler-de-can-roca, v02-bo-tic, v06-els-tinars); berths v01, v08, v14. If one is closed for the winter or for good, or lost/gained a star, say so plainly — the editor rebuilds the list from what you find. Settle: Bo.TiC's stars in the MICHELIN Spain 2026 guide (and whether it moved/closed); Els Tinars' star 2026; Can Roca's 2026 status, price and booking rule (the old 'eleven months ahead' claim — verify how booking actually opens); Casamar's star history (old: c.2011–2021); Rafa's opening days; Cal Tet still trading; La Tabarra still trading (it may have closed or changed name — check hard); La Fábrica (Christian Meier) still open; Rocambolesc address/hours; Mercat del Lleó hours; Espai del Peix auction visits 2026 days and price; Anxoves Solés shop and the factory-museum.
Trusted: own sites/socials, MICHELIN, Repsol, Macarfi, La Vanguardia, El País, Ara, Diari de Girona, Empordà.info, Hora Nova, El Periódico, Time Out, Condé Nast Traveller, the Ajuntament, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/verdict/dishes. Do not use the words Prague, Sicily, Athens, Istanbul, Paris, Var, Provence.
Plain text only, no HTML. Write valid UTF-8 JSON ONLY to the output path you were given. Do not touch git or other files.
