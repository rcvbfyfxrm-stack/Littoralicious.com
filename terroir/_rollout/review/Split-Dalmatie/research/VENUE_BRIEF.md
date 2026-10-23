# Split-Dalmatie GOLD6 — venue re-verification + rewrite brief (23 Oct 2026)
Guide: Split and its coast (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 23 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Split-Dalmatie/).
Model output (same pipeline, Dubrovnik 22 Oct): /tmp/claude-0/-home-user-Littoralicious-com/139c60a0-c305-5fbf-b6bb-72d0f16ff1b8/scratchpad/dub/terroir/_rollout/review/Dubrovnik-Dalmatie/research/verify_1.json — copy the format exactly.
The old venue records were written partly in FRENCH (hook/why/tags): your output is English. They carry NO status, NO check date, NO verdict and NO dishes[]; the guide was researched in May 2026 and its MICHELIN claims are suspect (it calls Dvor 'Michelin Guide' and says 'Split has no Michelin star'; it puts Zoï in Veli Varoš 'at the foot of Marjan' — Zoï is on the Riva by the palace). Give every one a status now, and dishes. Several tables may be SEASONAL: give each one's 2026 season and say plainly whether it is open now (23 Oct) and into November-December, with the reopening if announced. One record (v-kantun-paulina) is new, built only from the old guide's text: verify it (exists in 2026? address, hours), add hours, neighborhood, dishes, and say what you could not confirm.
The old records carry lat/lng that look approximate. If you find the venue's address differs from the old record (a different street or quarter), add "drop": ["lat","lng"] so no wrong pin is drawn; never invent coordinates.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-23" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN Croatia 2026 selection, Gault&Millau Croatia 2026, Falstaff, award, press, 2026 season dates); a seasonal house that traded in 2026 and is shut for the winter is still "confirmed" (say the season in "season"); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed for good (say when, source),
           "name": "only if the old name is wrong/needs diacritics",
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'why' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — what the room LOOKS like, how it FEELS, what it TASTES of — fresh, not praise, DISTINCT from the venue's 'verdict' (transform, keep the good facts)",
           "verdict": "40-80 words, the editor's honest judgement in the same voice",
           "signature": "the plate to order, one line", "caveat": "the honest warning (booking, cash, season, queue), one line",
           "person": "the chef/owner named in a 2026 source, if any (else omit)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"sweet"|"drink"}, ...]  — 3 to 8 REAL plates/drinks of THIS venue, from its record or verified now; never invent; at least 2,
           "season": "e.g. 'Seasonal: Apr–Oct 2026; closes for the winter, reopens spring 2027 (date not announced)' or 'Year-round'",
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)')", "reservation": "...", "neighborhood": "short place name, e.g. 'Palace', 'Veli Varoš', 'Riva', 'Matejuška', 'Firule', 'Centre'",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} for EVERY venue,
           "badge": "clean <=18-char upper-case badge for every venue (the old ones say MICHELIN for everything at the top: correct)",
           "tags": [] (leave empty: the build makes them),
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table in Split, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Place; Venue, Place"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the grand tables and anything that might be open in November-December).
MICHELIN: the Croatia 2026 selection (published spring 2026) is current. Settle each venue's current distinction from guide.michelin.com extracts / 2026 press (Zoï, Šug, Dvor, Konoba Fetivi, Bokeria, Apetit, Villa Spiza, Konoba Matejuška, Šperun, Fife...). Gault&Millau Croatia 2026 and Falstaff where you find them.
Look HARD for CURRENT season and hours, dated: which of these trade NOW (late October) and into the winter — the editor builds the guest list (last minute / this week / the grand night) and the three berths (one per group: grande, petite, street) from what is open or honestly dated.
Trusted: own sites/socials, MICHELIN, Gault&Millau, Falstaff, Dobri restorani, Slobodna Dalmacija, Dalmacija Danas, Total Croatia News, the Split tourist board, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/dishes/verdict. Do not use the words Prague, Sicily, Barcelona, Athens, Istanbul, Cavalaire.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
