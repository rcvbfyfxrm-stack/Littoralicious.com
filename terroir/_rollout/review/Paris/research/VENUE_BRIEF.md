# Paris GOLD6 — venue re-verification + rewrite brief (16 Oct 2026)
Guide: Paris (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 16 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Paris/).
Model output (same pipeline, Barcelona 15 Oct): /tmp/claude-0/-home-user-Littoralicious-com/db8ee88d-3cc4-537f-97d8-70dfad8d8776/scratchpad/bcn/terroir/_rollout/review/Barcelona-Catalunya/research/verify_1.json — copy the format exactly.
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched in mid-2026. You give every one a status now, and dishes.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-16" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN France 2026 selection, award, press); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed (say when, source),
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'verdict' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' (transform, keep the good facts)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"drink"}, ...]  — 3 to 8 REAL plates/drinks of THIS venue, from its record (signature, verdict, tags, person) or verified now; never invent; at least 2,
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)')", "reservation": "...", "caveat": "...", "neighborhood": "short quarter name, e.g. '11th · Charonne'",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} only if the award/status changed or the old one is wrong (the old badges are truncated, e.g. 'NO. 14 - WORLD'S 5': give a clean chip for every venue whose old badge is truncated or stale),
           "badge": "clean <=18-char upper-case badge if the old one is truncated or wrong",
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table in Paris, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue on Street; Venue on Street"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the guest list and berths).
MICHELIN: the France 2026 selection (ceremony spring 2026) is current. Settle each venue's current distinction from guide.michelin.com extracts / 2026 press. Watch: L'Arpège (3; went fully plant-based July 2025), Plénitude (3), Kei (3), Guy Savoy (lost its third star in 2023 — check what it holds in 2026), Table by Bruno Verjus (stars? 50 Best rank 2025/2026), Datil (1 + Green?), Le Rigmarole (1), Le Grand Véfour (reopened May 2026 under Paris Society with chef Bruno Doucet per the old text — VERIFY: date, chef, any distinction), Clamato (Bib?), Septime (1 star; 50 Best 2025 No. 40 per the old text — check 2026 list (published June 2026)), Le Servan, Vantre. The World's 50 Best 2026 list was published in June 2026: check any rank you print.
Look HARD for CURRENT hours, dated, for the guest list: last minute (v-bouillon-chartier, v-bouillon-pigalle, v-clamato), this week (v-bistrot-paul-bert, v-chez-l-ami-jean, v-le-servan), grand night (v-l-arpege, v-plenitude-cheval-blanc-paris, v-kei), and the berths (v-l-arpege, v-bistrot-paul-bert, v-l-as-du-fallafel — note L'As du Fallafel's Friday-evening/Saturday Shabbat closing).
Trusted: own sites/socials, MICHELIN, 50 Best, Le Fooding, Gault&Millau, Paris by Mouth, The Infatuation, Time Out Paris, Le Figaro, Le Parisien, Le Monde, Eater, NYT, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic). No emoji, no ⚠ or ★ in hook/why/dishes. Do not use the words Prague, Sicily, Barcelona, Athens, Istanbul.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
