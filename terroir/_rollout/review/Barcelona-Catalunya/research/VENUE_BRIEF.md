# Barcelona-Catalunya GOLD6 — venue re-verification + rewrite brief (15 Oct 2026)
Guide: Barcelona (Littoralicious terroir guide for superyacht crews, chefs and their guests). Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Barcelona-Catalunya/).
Model output (same pipeline, Piraeus 14 Oct): /tmp/claude-0/-home-user-Littoralicious-com/cf1a01d1-b77c-538f-9fbc-1950ac9293a3/scratchpad/ex/pir_verify_1.json — copy the format exactly.
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched July 2026. You give every one a status now, and dishes.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-15" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN 2026 selection, award, press); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed (say when, source),
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'verdict' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' (transform, keep the good facts)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"drink"}, ...]  — 3 to 8 REAL iconic plates/drinks of THIS venue, from its record (signature, verdict, tags, person) or verified now; never invent; at least 2,
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "...", "reservation": "...", "caveat": "...", "neighborhood": "short quarter name",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} only if the award/status changed or the old one is wrong,
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table in Barcelona, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue on Street; Venue on Street"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the guest list and berths).
MICHELIN: the 2026 Spain selection (gala 25 Nov 2025, Málaga) is current; the 2027 gala is due in late Nov 2026. Settle each venue's current distinction from guide.michelin.com extracts / 2026 press. Known from the old records: Disfrutar 3, Lasarte 3, Cocina Hermanos Torres 3, Enigma 2 (promoted 2026), Mont Bar 2 (Nov 2025), Aleia 2 (Nov 2025), Cinc Sentits 2, Dos Palillos 1, Kamikaze 1 (new 2026), Glug Bib 2026, Oníric Bib 2026, Suculent (selected?) — CHECK each, the old text contradicts itself (e.g. it calls Cinc Sentits both one and two stars, and Disfrutar 'Dinner Tue–Sat' while a May 2026 listing says Tue–Fri lunch and dinner).
Look HARD for CURRENT hours, dated, for the guest list: last minute (v10-7-portes-set-portes, vn-cal-pep, v14-els-pescadors), this week (v07-bar-ca-ete, v15-suculent, vr-oniric), grand night (v01-disfrutar, v04-cocina-hermanos-torres, v02-lasarte), and the berths (v01-disfrutar, v07-bar-ca-ete, vc-bar-la-plata).
Trusted: own sites/socials, MICHELIN, 50 Best, Repsol, Culinary Backstreets, Time Out Barcelona, The Infatuation, La Vanguardia, El Periódico, El Nacional, Ara, Eater, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon). No emoji, no ⚠ or ★ in hook/why/dishes.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
