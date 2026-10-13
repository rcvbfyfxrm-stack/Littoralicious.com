# Athens-Attiki GOLD6 — venue re-verification + rewrite brief (13 Oct 2026)
Guide: Athens & Attica. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt.
Model output (same pipeline, Istanbul): /tmp/claude-0/-home-user-Littoralicious-com/3529e867-9afe-55c6-981c-8b5409cb4a74/scratchpad/ex/ist_verify_1.json — copy the format exactly.
The old venue records carry NO status and NO check date; the guide was researched July 2026. You give every one a status now.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "seasonal" | "time_limited",
           "statusChecked": "2026-10-13" if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, MICHELIN 2026 entry, 50 Best 2026, press); if you find nothing dated 2026 but nothing contradicts it, status "unverified" with statusChecked "2026-10-13" and say so,
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'verdict' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' sentences (transform, keep the good facts)",
           "hours": "only if you have evidence (else omit); conflicts -> 'call ahead' with what each source says",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "...", "reservation": "...", "caveat": "...",
           "signal_chip": {"label": "...", "full": "..."} only if the award changed (e.g. MICHELIN 2026: stars, Green Star, Bib),
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the guest list).
Look HARD for CURRENT hours, dated, for the guest list: last minute (klimataria, steki-tou-ilia, feyrouz), this week (vezene, karamanlidika-tou-fani, akra), grand night (delta, spondi, gb-roof-garden).
Check the MICHELIN Guide Greece 2026 status of every venue that claims a star/Green Star/Bib/selection (Delta: two stars + Green Star; Spondi, Soil: one star? check; also check whether any other kept venue is now in the selection — Bib Gourmand etc.).
Trusted: own sites/socials, MICHELIN, 50 Best, Culinary Backstreets, Time Out, Athinorama, LiFO, Kathimerini, Gastronomos, FNL Guide, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two). No emoji, no ⚠ or ★ in hook/why.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
