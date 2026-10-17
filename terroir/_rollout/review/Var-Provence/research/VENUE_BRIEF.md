# Var-Provence GOLD6 — venue re-verification + rewrite brief (17 Oct 2026)
Guide: The Var, a department guide (Littoralicious terroir guide for superyacht crews, chefs and their guests). Today is 17 October 2026. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt (paths relative to /home/user/Littoralicious.com/terroir/_rollout/review/Var-Provence/).
Model output (same pipeline, Paris 16 Oct): /tmp/claude-0/-home-user-Littoralicious-com/36568795-6e97-5698-8b50-da5582fb0ec6/scratchpad/paris/terroir/_rollout/review/Paris/research/verify_1.json — copy the format exactly.
The old venue records carry NO status, NO check date and NO dishes[]; the guide was researched in mid-2026. You give every one a status now, and dishes. Many Var tables are SEASONAL (roughly April/May to late September/October): give each one's 2026 season and say plainly whether it is open now (17 Oct) or closed for the winter, with the reopening if announced.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-17" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, the MICHELIN France 2026 selection, Gault&Millau 2026, award, press); a seasonal house that traded in summer 2026 and is shut for the winter is still "confirmed" (say the season in "season"); if nothing dated 2026 but nothing contradicts it, status "unverified" and say so; "closed" if it has closed for good (say when, source),
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'verdict' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' (transform, keep the good facts)",
           "dishes": [{"name": "...", "note": "one short line: what it is / why order it", "kind": "dish"|"sweet"|"drink"}, ...]  — 3 to 8 REAL plates/drinks of THIS venue (for a wine estate: its wines, kind 'drink'; for the market: what its stalls sell; for the confectioner: its products, kind 'sweet'), from its record (signature, verdict, tags, person) or verified now; never invent; at least 2,
           "season": "e.g. 'Seasonal: 7 May–11 Oct 2026; closed now, reopens spring 2027 (date not announced)' or 'Year-round'",
           "hours": "only if you have evidence (else omit); conflicts -> 'Call ahead: <what each source says>'",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "... (dated: '(seen Oct 2026)')", "reservation": "...", "caveat": "...", "neighborhood": "short place name, e.g. 'Saint-Tropez · Bouillabaisse beach', 'Toulon · Opéra', 'Aups'",
           "signal_chip": {"label": "<=14 chars", "full": "...", "cosign": "..."} only if the award/status changed or the old one is wrong (several old badges are truncated, e.g. 'STRAIGHT TO THREE ', 'TRUFFLE TEMPLE — 1': give a clean chip for every venue whose old badge is truncated or stale),
           "badge": "clean <=18-char upper-case badge if the old one is truncated or wrong",
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_lane_stories": {"<lane_key>": {"title": "3-6 words", "story": "90-120 words: the food story of this kind of table in the Var, naming the lane's venues with one fact each, TRUE, no praise", "where": "Venue, Town; Venue, Town"}} for EACH lane in your file (lane keys are in _lane_key), "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the grand night and the berths).
MICHELIN: the France 2026 selection (ceremony 16 March 2026 per one old record) is current. Settle each venue's current distinction from guide.michelin.com extracts / 2026 press. Watch: La Vague d'Or (3; Arnaud Donckele; 2026 season 7 May–11 Oct per the old record), La Table du Castellet (3; Fabien Ferré; went straight to three in 2022? verify), La Voile (2; Éric Canino), Colette (1; Sezz), Récif (Les Roches Rouges, Saint-Raphaël — 1? verify), Shanaël (Toulon, 1 in 2026), Chez Bruno (Lorgues, 1? the truffle house), Le Faventia (1, Quentin André), the Abbaye de la Celle (lost its star in 2024 per the old record), La Commanderie de Peyrassol (its restaurant's star 2025? verify), La Colombe (Bib). Gault&Millau 2026 where a record cites it.
Look HARD for CURRENT season and hours, dated, for the guest list: last minute (v-shanael, v-la-colombe, v-hotel-la-ponche), this week (v-chez-bruno, v-auberge-de-la-mole, v-recif-hotel-les-roches-rouges), grand night (v-la-vague-d-or-cheval-blanc-st-, v-la-table-du-castellet, v-la-voile-la-reserve-de-ramatue), and the berths (v-la-table-du-castellet, v-la-colombe, v-la-cade-a-dede). If one is closed for the winter, say so plainly in season/caveat — the editor will rebuild the list from what you find.
Merge into v-la-voile-la-reserve-de-ramatue the vegetable-menu detail of its duplicate record v-la-voile-la-reserve-ramatuelle (in research/venues_cut.json).
Trusted: own sites/socials, MICHELIN, Gault&Millau, Le Fooding, Var-Matin, Nice-Matin, Le Figaro, Les Échos, Pudlowski (Les Pieds dans le plat), Le Var des Gastronomes, the town tourist offices, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "Call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two, honeymoon, iconic, legendary). No emoji, no ⚠ or ★ in hook/why/dishes. Do not use the words Prague, Sicily, Barcelona, Athens, Istanbul.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
