# Istanbul-Bogazici GOLD6 — the dated hot board, the calendar, the seasonal checks (12 Oct 2026)
Format: copy EXACTLY the structure of /tmp/claude-0/-home-user-Littoralicious-com/6d30975c-f6a7-5a49-987c-b71693ed6f79/scratchpad/diani/terroir/_rollout/review/Diani-Kwale/research/hot_events.json (keys hot / events / notes; drop 'listening' — Istanbul has a listening section already).
Card fields as in research/BRIEF.md (name, tag, teaser <=110, story 60-110 words, why, facts, sources, venue_ref, maps_query, site). Facts for events: When · Where · Cost · Tip.
Spec: /home/user/Littoralicious.com/terroir/_rollout/lib/gold6/SPEC.md. Rules: research/BRIEF.md (banned words, no emoji, no invention, WebSearch only — WebFetch fails).
Budget ~20 WebSearch calls.

1. "hot": asof "2026-10-12", review "2026-12-01", a "pointer_line" (one sentence, what is on now), and FOUR groups, AT MOST 3 items each:
   "In the water" (the fish running the strait now: palamut/torik, lüfer and its legal minimum size, the first hamsi — verified for autumn 2026 where possible, e.g. a 2026 season-opening or price story in Turkish press),
   "In the sky" (the light and weather Oct–Nov 2026: e.g. sunset times range in Istanbul over Oct–Nov — Turkey stays on UTC+3; the poyraz/lodos winds that stop the ferries; a dated astronomical event only if real),
   "On the plate" (what the counters and markets have now: e.g. boza season reopening, chestnuts, quince, pomegranate, new walnuts — season facts, no venue claims beyond the guide's kept venues),
   "In the calendar" (DATED events 12 Oct – 30 Nov 2026 with a 2026 source: e.g. Republic Day 29 Oct, the 10 November 09:05 commemoration, the 2026 Istanbul Marathon date, the 2026 Akbank Jazz Festival dates, Contemporary Istanbul 2026, the Istanbul Biennial if on, Beyoğlu Kültür Yolu if dated. If a date cannot be confirmed for 2026, leave the event out or say 'dates not announced').
   For a hot item about a kept venue, set venue_ref to its id (ids: see research/venues_old_kept.json keys). maps_query only for a place you go to.
2. "events": the fixed calendar of the year, 2-3 groups, AT MOST 3 items each (e.g. "Religious & national dates" — Ramadan 2027 and Ramazan Bayramı 2027 dates, Kurban Bayramı 2027, Republic Day; "Festivals" — İKSV's Istanbul Film Festival (April), Music Festival (June), Jazz Festival (July), Tulip Festival in April at Emirgan; "The sea's calendar" — e.g. Hıdırellez 6 May, the Bosphorus Cross-Continental Swim in July). Give 2026/2027 dates where announced; else the usual month, stated as usual.
3. "venue_hot": {venue_id: "one dated line on why this kept venue matters this month"} for at least 6 kept venues (e.g. balikci-kahraman and the lüfer, vefa-bozacisi and boza season, kadikoy-market and palamut, karakoy-gulluoglu, nardis-jazz-club if a jazz festival date, kurukahveci...). Only true, sourced or season-evident lines; date them "(checked 12 Oct 2026)".
4. "seasonal_checks": verify these claims in the guide's month table and return [{"claim": ..., "verdict": "ok|wrong", "correct": "...", "source": ...}]:
   "Ramadan falls across February and March in 2027"; "Şeker Bayramı falls around mid-March in 2027"; "Kurban Bayramı falls mid-to-late May in these years"; "Hıdırellez on 6 May, inscribed by UNESCO in 2017 jointly with North Macedonia"; "lüfer is only legally lüfer from 28 cm" (is the legal minimum landing size 20 cm, and 'lüfer' a size name? check);
   "the İKSV film festival normally runs in April"; "Republic Day on the 29th lights both bridges".
5. "notes": honest gaps.
Write valid UTF-8 JSON ONLY to research/hot_events.json (in this folder). Do not touch git or other files.
