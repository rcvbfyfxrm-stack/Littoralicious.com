# Istanbul-Bogazici GOLD6 — venue re-verification + rewrite brief (12 Oct 2026)
Guide: Istanbul & the Bosphorus. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md.
Model output (same pipeline, Diani): /tmp/claude-0/-home-user-Littoralicious-com/6d30975c-f6a7-5a49-987c-b71693ed6f79/scratchpad/diani/terroir/_rollout/review/Diani-Kwale/venues.json and the research pack format in /tmp/claude-0/-home-user-Littoralicious-com/6d30975c-f6a7-5a49-987c-b71693ed6f79/scratchpad/diani/terroir/_rollout/review/Diani-Kwale/research/verify_1.json — copy the format exactly.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited" | "closing_soon",
           "statusChecked": "2026-10-12" if you found 2026-dated evidence NOW (a 2026 review, post, listing, MICHELIN 2026 entry, press) that it trades; else keep the OLD status + date unchanged when nothing contradicts it,
           "hook": "<=110 chars, what it is, fresh (not the old hook verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' field (do not repeat its sentences)",
           ...plus ONLY fields you are correcting from evidence (hours, price_range, caveat, reservation, address, web, phone, name ...) },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: don't use it). Budget ~1 WebSearch per venue (more for the guest list).
Look HARD for CURRENT hours, dated, for the last-minute guest list (asmali-cavit, agora-meyhanesi, ciya-sofrasi) and the grand night (turk-fatih-tutak, araf-istanbul, nazende-cadde).
Check the MICHELIN Guide Türkiye 2026 status of every lane venue that claims a star/Bib/selection (the 2026 selection was announced in 2025/2026; spelling: the restaurant is 'TURK Fatih Tutak' in MICHELIN's own text).
Trusted: own sites/socials, MICHELIN, Gault&Millau Türkiye, 50 Best, Culinary Backstreets, Time Out, Hürriyet/Daily Sabah/Duvar, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two). No emoji, no ⚠.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
