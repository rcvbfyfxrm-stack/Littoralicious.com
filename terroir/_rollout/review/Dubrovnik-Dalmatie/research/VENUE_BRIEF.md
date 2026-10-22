# Dubrovnik-Dalmatie GOLD6 — venue re-verification + rewrite brief (22 Oct 2026)
Guide: Dubrovnik and its coast (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 22 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Dubrovnik-Dalmatie/).
Model output (same pipeline, Cavalaire 21 Oct): /tmp/claude-0/-home-user-Littoralicious-com/25aa19f6-5e84-53c8-8fe2-72d6963891c7/scratchpad/cav/terroir/_rollout/review/Cavalaire-sur-Mer/research/verify_1.json — copy the format exactly.
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched in May 2026. You give every one a status now, and dishes. Several tables are SEASONAL (Restaurant 360 closes November to late March; some konobas and the Mali Ston houses cut back in winter): give each one's 2026 season and say plainly whether it is open now (22 Oct) and into November-December, with the reopening if announced. Two records (v-taj-mahal, v-barba) are new, built only from the old guide's text: verify them (exist in 2026? address, hours), add 'hours', 'neighborhood', dishes, and say what you could not confirm.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-22" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN Croatia 2026 selection, Gault&Millau Croatia 2026, award, press, 2026 season dates); a seasonal house that traded in 2026 and is shut for the winter is still "confirmed" (say the season in "season"); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed for good (say when, source),
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'why' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' (transform, keep the good facts)",
           "verdict": "40-80 words, the editor's honest judgement in the same voice (the old records have NO verdict: write one for every venue from the record and what you verify)",
           "signature": "the plate to order, one line", "caveat": "the honest warning (booking, cash, season, queue), one line",
           "person": "the chef/owner named in a 2026 source, if any (else omit)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"sweet"|"drink"}, ...]  — 3 to 8 REAL plates/drinks of THIS venue, from its record (why, tags) or verified now; never invent; at least 2,
           "season": "e.g. 'Seasonal: 27 Mar–early Nov 2026; closes for the winter, reopens spring 2027 (date not announced)' or 'Year-round'",
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)')", "reservation": "...", "neighborhood": "short place name, e.g. 'Old Town · Prijeko', 'Pile', 'Gruž', 'Lapad', 'Konavle · Ljuta', 'Mali Ston', 'Pelješac · Trstenik'",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} for EVERY venue (the old badges are truncated: 'FINE DINI', 'CLASSIC F', 'OLD DUBRO', 'COUNTRYSI', 'OYSTER BA', 'RIVER KON', 'FAMILY KO'),
           "badge": "clean <=18-char upper-case badge for every venue (the old ones are truncated)",
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table on this coast, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Place; Venue, Place"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the grand tables and anything that might be open in November-December).
MICHELIN: the Croatia 2026 selection (published spring 2026) is current. Settle each venue's current distinction from guide.michelin.com extracts / 2026 press: Restaurant 360 (one star — still in 2026? chef Marijo Curić?), Stara Loža (selected?), Nautika, Proto, D'vino ("Michelin Guide listing ten editions running" — verify), Kopun, Bota Šare, Vila Koruna, Konoba Dubrava, Konavoski Dvori. Gault&Millau Croatia 2026 where you find it.
Look HARD for CURRENT season and hours, dated: which of these trade NOW (late October) and into the winter — the editor builds the guest list (last minute / this week / the grand night) and the three berths (one per group: grande, petite, street) from what is open or honestly dated.
Trusted: own sites/socials, MICHELIN, Gault&Millau, Falstaff, Dobri restorani, The Dubrovnik Times, Dubrovački vjesnik, Slobodna Dalmacija, Total Croatia News, the Dubrovnik/Ston/Konavle tourist boards, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/dishes/verdict. Do not use the words Prague, Sicily, Barcelona, Athens, Istanbul, Cavalaire.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
