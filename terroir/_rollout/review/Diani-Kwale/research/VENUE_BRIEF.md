# Diani-Kwale GOLD6 — venue re-verification + rewrite brief (11 Oct 2026)
Guide: Diani Beach & the Kwale south coast, Kenya. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md.
Model output (same pipeline, Zanzibar): /tmp/claude-0/-home-user-Littoralicious-com/fa48329b-e81b-59df-ad96-68188a719f0b/scratchpad/kendwa/terroir/_rollout/review/Kendwa-Unguja/venues.json — copy its format exactly.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "time_limited",
           "statusChecked": "2026-10-11" if you found 2026-dated evidence now (a 2026 review, post, listing, press) that it trades; else keep the OLD status+date unchanged when nothing contradicts it,
           "hook": "<=110 chars, what it is, fresh (not the old hook verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' field (do not repeat its sentences)",
           ...plus ONLY fields you are correcting from evidence (hours, price_range, caveat, reservation, address, web, phone ...) },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_notes": honest gaps, and "_needs_network": [list of exact checks that need a normal network: own-site hours, link liveness].

Rules: the network is blocked except WebSearch (WebFetch fails: don't use it). Budget about 1-2 WebSearch per venue, prioritise venues in the guest list (nomad-beach-bar, leonardos, tiki-bar = last minute: look hard for their CURRENT hours, dated) and anything 'unverified'. Trusted sources: own sites/socials, TripAdvisor/Google dated reviews (as evidence of trading only), quality press (Nation, Standard, Business Daily, KWS). Never invent hours, prices, phones. Keep disputes as disputes. A venue's hours that conflict across sources -> say "call ahead" rather than pick. No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two). No emoji.
Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
