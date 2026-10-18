# Cadaques-CapdeCreus GOLD6 — venue re-verification + rewrite brief (18 Oct 2026)
Guide: Cadaqués · Cap de Creus (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 18 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Cadaques-CapdeCreus/).
Model output (same pipeline, the Var 17 Oct): /tmp/claude-0/-home-user-Littoralicious-com/1ebe5bee-5583-513a-a147-47e13c233f3b/scratchpad/var/terroir/_rollout/review/Var-Provence/research/verify_1.json — copy the format exactly (read 2 venues of it).
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched in June 2026. Their 'why' fields are run-together paste (why + 'To order:' + caveat): rewrite cleanly. You give every one a status now, and dishes. Many Cadaqués tables are SEASONAL (roughly Easter/March to late October/November): give each one's 2026 season and say plainly whether it is open now (18 Oct) or closed for the winter, with the reopening if announced.

For EVERY venue id in research/venues_input_1.json (15), produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-18" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN Spain 2026 selection, Repsol 2026, award, press); a seasonal house that traded in summer 2026 and is shut for the winter is still "confirmed" (say the season in "season"); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed for good (say when, source),
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'verdict' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' (transform, keep the good facts)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"sweet"|"drink"}, ...]  — 3 to 8 REAL plates/drinks of THIS venue from its record (signature, verdict, tags, why) or verified now; never invent; at least 2,
           "season": "e.g. 'Seasonal: March–early November 2026; open now' or 'Year-round' or 'Call ahead: no 2026 season found'",
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)' or '(seen Jun 2026)')", "reservation": "...", "caveat": "...", "neighborhood": "short place name, e.g. 'Old town · Riera de Sant Vicenç', 'Passeig', 'Cap de Creus lighthouse'",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} only if the award/status changed or the old one is wrong,
           "badge": "clean <=18-char upper-case badge if the old one is wrong",
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table in Cadaqués, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Cadaqués; Venue, Cadaqués"}} for EACH lane (lane keys in _lane_key: elbulli, houses, back, edge, bars), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the grand night and the berths).
Settle: Compartir's address (old records give both 'Riera de Sant Vicenç s/n' and 'Carrer del Sitjar 5'), its MICHELIN status in 2026 (Plate? Bib? star?), its Repsol Soles, its season and tasting price; the Disfrutar facts (third star 2023? World's 50 Best No.1 2024 — verify; the old record says the third star came in 2024). Casa Anita: the owner's death that 'made the Catalan press' (old text — verify who and when; keep it out if unverifiable), cash only? Es Baluard and Talla season (old text: 'shutter roughly November to March'). Restaurant Cap de Creus (Chris Little, 1991, curry): still trading in 2026? Marítim (1935), L'Hostal (Dalí logo; Marci Pogany), Cafe Tropical (old record thin: if no 2026 evidence, say unverified honestly). Can Rafa: the Martín Faixó family (verify the link with the Celler Martín Faixó winery).
Look HARD for CURRENT season and hours, dated, for the guest list: last minute (v14-maritim-bar, v13-l-hostal, v06-can-rafa), this week (v02-casa-anita, v08-casa-nun, v04-es-baluard), grand night (v01-compartir-cadaques, v05-talla, v03-restaurant-cap-de-creus), and the berths (v01-compartir-cadaques, v02-casa-anita, v14-maritim-bar). If one is closed for the winter or for good, say so plainly — the editor will rebuild the list from what you find.
Trusted: own sites/socials, MICHELIN, Repsol, Macarfi, La Vanguardia, El País, Ara, Diari de Girona, Empordà.info, Hora Nova, El Periódico, Time Out, Condé Nast Traveller, the Ajuntament, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/dishes. Do not use the words Prague, Sicily, Athens, Istanbul, Paris, Var.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to research/verify_1.json. Do not touch git or other files.
