# Piraeus-Saronic GOLD6 — venue re-verification + rewrite brief (14 Oct 2026)
Guide: Piraeus & the Saronic. Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Old guide as text: research/guide_text_old.txt.
Model output (same pipeline, Athens 13 Oct): /tmp/claude-0/-home-user-Littoralicious-com/f9d2aa15-2ae2-51e4-be00-5afe01d5589a/scratchpad/ex/ath_verify_1.json — copy the format exactly.
The old venue records carry NO status and NO check date; the guide was researched July 2026. You give every one a status now.

For EVERY venue id in your input file, produce:
"<id>": {
  "set": { "status": "confirmed" | "unverified" | "closed" | "seasonal" | "time_limited",
           "statusChecked": "2026-10-14" — status "confirmed" only if you found 2026-dated evidence NOW that it trades (a 2026 review, post, listing, MICHELIN entry, award, press); if you find nothing dated 2026 but nothing contradicts it, status "unverified" with statusChecked "2026-10-14" and say so,
           "hook": "<=110 chars, what it is, fresh (not the old 'short'/'verdict' verbatim)",
           "why": "50-90 words: the story / origin / one verified fact that makes you want to go — fresh, not praise, DISTINCT from the venue's 'verdict' and from its old 'why' sentences (transform, keep the good facts)",
           "hours": "only if you have evidence (else omit); conflicts -> 'call ahead' with what each source says",
           "address": "...", "phone": "...", "web": "https://own-site only", "price_range": "...", "reservation": "...", "caveat": "...",
           "signal_chip": {"label": "...", "full": "...", "cosign": "..."} only if the award/status changed or the old one is wrong,
           ...ONLY fields you are adding or correcting from evidence },
  "drop": [fields to remove because they are wrong/unverifiable] (optional),
  "evidence": "what you found now, source names and dates; say plainly if only search extracts",
  "corrections": ["old says X; source Y says Z ..."],
  "sources": [{"label": "...", "url": "https://..."}]
}
Also top-level "_notes": honest gaps, and "_needs_network": [exact checks that need a normal network: own-site hours, link liveness].

Rules: every network call except WebSearch fails in this sandbox (WebFetch too: do not use it). Budget ~1-2 WebSearch per venue (more for the guest list).
Look HARD for CURRENT hours, dated, for the guest list: last minute (vosporos, ikariotiko-kafeneio, panorama), this week (to-yperokeaneion, dyosmos, to-koutouki-tou-antoni), grand night (varoulko-seaside, dourabeis, papaioannou).
MICHELIN: the old record says Varoulko Seaside LOST its star (MICHELIN Greece 2024 selected only); some 2026 listings claim it still holds one. Settle it from the MICHELIN guide itself (search guide.michelin.com) and say which; check whether any other kept venue is in the MICHELIN selection (Bib, selected). The 2026/27 Greece selection is due 20 Oct 2026.
Varoulko Seaside: the address street number differs (52 vs 54 Akti Koumoundourou); hours Tue–Sun vs daily — report what you find.
Trusted: own sites/socials, MICHELIN, 50 Best, Culinary Backstreets, Time Out, Athinorama, LiFO, Athens Voice, Kathimerini, Gastronomos, FNL Guide, This Is Athens, dated Google/TripAdvisor reviews (as evidence of trading only).
Never invent hours, prices, phones. Keep disputes as disputes. Hours that conflict across sources -> say "call ahead" rather than pick.
No banned words (hidden gem, paradise, must-see, nestled, vibrant, bustling, breathtaking, stunning, unspoilt, charming, romantic, couple, for two). No emoji, no ⚠ or ★ in hook/why.
'why' must be plain text, no HTML. Write valid UTF-8 JSON ONLY to your output path. Do not touch git or other files.
