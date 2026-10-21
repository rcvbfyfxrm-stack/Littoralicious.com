# Cavalaire-sur-Mer GOLD6 — venue re-verification + rewrite brief (21 Oct 2026)
Guide: Cavalaire-sur-Mer and its bay (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 21 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Cavalaire-sur-Mer/).
Model output (same pipeline, the Var 17 Oct): /tmp/claude-0/-home-user-Littoralicious-com/640e1342-d986-5d0d-bfd3-aee8b9c9dfc5/scratchpad/var/terroir/_rollout/review/Var-Provence/research/verify_1.json — copy the format exactly.
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched in mid-2026. You give every one a status now, and dishes. Most tables of this bay are SEASONAL (roughly April/May to late September/October): give each one's 2026 season and say plainly whether it is open now (21 Oct) or closed for the winter, with the reopening if announced. Two records (v-pecheurs-du-port, v-marche-place-jean-moulin) are new, built only from the old guide's text: verify them (the fishermen's direct sale on the port — who, which days, from what hour; the Wednesday market's square, hours, year-round), add 'hours', 'neighborhood', dishes (what they sell), and say what you could not confirm.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-21" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN France 2026 selection, Gault&Millau 2026, award, press, 2026 season dates); a seasonal house that traded in summer 2026 and is shut for the winter is still "confirmed" (say the season in "season"); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed for good (say when, source),
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'verdict' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' (transform, keep the good facts)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"sweet"|"drink"}, ...]  — 3 to 8 REAL plates/drinks of THIS venue, from its record (signature, verdict, tags, person) or verified now; never invent; at least 2,
           "season": "e.g. 'Seasonal: 8 May–4 Oct 2026; closed now, reopens spring 2027 (date not announced)' or 'Year-round'",
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)')", "reservation": "...", "caveat": "...", "neighborhood": "short place name, e.g. 'Cavalaire · Nouveau Port', 'La Croix-Valmer · Gigaro', 'Gassin'",
           "verdict": "only if the old verdict is wrong now (rewrite it, 40-80 words, same voice)",
           "person": "only if wrong now (e.g. a chef has changed: the 2026 Relais & Châteaux page names Thomas Pézéril at La Palmeraie while the old record says Alexandre Fabris — settle it)",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} only if the award/status changed or the old one is wrong or truncated (several old badges are truncated, e.g. 'GAULT&MILLAU: THE ', 'LOCAL & EV', 'BEACH TABL': give a clean chip for every venue whose old badge is truncated or stale),
           "badge": "clean <=18-char upper-case badge if the old one is truncated or wrong",
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table on this bay, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Town; Venue, Town"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the grand night and the berths).
MICHELIN: the France 2026 selection (ceremony March 2026) is current. Settle each venue's current distinction from guide.michelin.com extracts / 2026 press: La Voile (2 stars, Éric Canino), La Palmeraie (1 star; chef?), Vista (in the selection? G&M 13/20), Les Saisonniers (selected 2025: 2026?), Bello Visto (Bib Gourmand: still 2026?), La Verdoyante (selected?). Gault&Millau 2026 where a record cites it.
Look HARD for CURRENT season and hours, dated: which of these trade NOW (late October) and into the winter — the editor builds the guest list (last minute / this week / the grand night) and the three berths (one per group: grande, petite, street) from what is open or honestly dated. Le Parc (Hôtel du Parc), Le Comptoir des Saveurs, Le Grand Bleu, Maurin des Maures, Les Saisonniers, Bello Visto, La Forge, Ô Petit Bar, the market and the fishermen are the likely year-round or long-season ones: confirm or refute each.
Trusted: own sites/socials, MICHELIN, Gault&Millau, Le Fooding, Var-Matin, Nice-Matin, Pudlowski (Les Pieds dans le plat), Jacques Gantié, the Cavalaire/La Croix-Valmer/Ramatuelle/Gassin tourist offices, Relais & Châteaux, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary, curated). No emoji, no ⚠ or ★ in hook/why/dishes. Do not use the words Prague, Sicily, Barcelona, Athens, Istanbul.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
