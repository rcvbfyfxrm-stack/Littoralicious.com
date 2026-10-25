# beaune-bourgogne GOLD6 — venue re-verification + rewrite brief (25 Oct 2026)
Guide: Beaune and the Côte d'Or (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 25 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/beaune-bourgogne/).
Model output (same pipeline, Faro 24 Oct): /tmp/claude-0/-home-user-Littoralicious-com/a98fcd69-f9a3-596a-9129-a061c7b4bd70/scratchpad/faro/terroir/_rollout/review/Faro-Algarve/research/verify_1.json — copy the format exactly.
The old venue records carry NO status, NO check date, NO verdict and NO dishes[]; the guide was researched in May 2026; its MICHELIN claims must be re-read against the MICHELIN Guide France 2026 (announced in March 2026 — verify the date; say 'MICHELIN-selected' for a listed house without a star or Bib). Give every one a status now, and dishes. Say plainly for each whether it is open now (late October) and into November-December (annual closures, Christmas), AND whether it opens on the auction weekend 13-16 November 2026 (the busiest weekend of Beaune's year: say if it is booked out / takes bookings months ahead, only if a source says so). One record (v-charcuterie-raillard) is new, built only from the old guide's text: verify it (exists in 2026 at 4 rue Monge? Eddy Raillard? hours), add hours, neighborhood, dishes, and say what you could not confirm.
The old records carry lat/lng that look approximate. If you find the venue's address differs from the old record (a different street), add "drop": ["lat","lng"] so no wrong pin is drawn; never invent coordinates.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-25" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN France 2026 selection, award, press); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed for good (say when, source),
           "name": "only if the old name is wrong/needs accents",
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'why' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — what the room LOOKS like, how it FEELS, what it TASTES of — fresh, not praise, DISTINCT from the venue's 'verdict' (transform, keep the good facts)",
           "verdict": "40-80 words, the editor's honest judgement in the same voice",
           "signature": "the plate to order, one line", "caveat": "the honest warning (booking, days, cash, queue), one line",
           "person": "the chef/owner named in a 2026 source, if any (else omit)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"sweet"|"drink"}, ...]  — 3 to 8 REAL plates/drinks/products of THIS venue (for the market and the shops: what to buy there), from its record or verified now; never invent; at least 2,
           "season": "e.g. 'Year-round; annual close <dates if found>' or 'Year-round'",
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)')", "reservation": "...", "neighborhood": "short place name, e.g. 'Place Carnot', 'Rue Maufoux', 'Faubourg Madeleine', 'Place Monge', 'Boulevard Foch'",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} for EVERY venue,
           "badge": "clean <=18-char upper-case badge for every venue (correct the old ones)",
           "tags": [] (leave empty: the build makes them),
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table in Beaune, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Place; Venue, Place"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~2 WebSearch per venue (more for the starred tables).
Look HARD for CURRENT hours, closing days and annual closures, dated: the editor builds the guest list (last minute / this week / the grand night) and the three berths (one per group: grande, petite, street) from what is open or honestly dated.
Trusted: own sites/socials, MICHELIN, Gault&Millau, Le Bien Public, France 3 BFC, Le Figaro, Le Point, L'Express, the Office de Tourisme de Beaune, Pudlowski (Les Pieds dans le plat), Decanter, Wine Spectator, Jancis Robinson, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/dishes/verdict. Do not use the words Prague, Sicily, Barcelona, Athens, Istanbul, Cavalaire, Split, Dubrovnik, Faro, Algarve.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
