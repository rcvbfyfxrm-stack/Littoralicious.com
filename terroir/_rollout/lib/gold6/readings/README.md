# GOLD6 §8 — the four readings (Arnaud, 7 Oct 2026)

Live reference: `terroir/Prague-Cechy/` — click **One Night** and **The Getaway Weekend**.
Worked example: `examples/Prague-Cechy.readings.json` (regenerates Prague exactly).

```bash
python3 apply_readings.py <repo>/terroir/<Slug> <slug>.readings.json \
        --check-config <repo>/terroir/_rollout/lib/guides/<Slug>.check.json
node ../probes/probe-readings.cjs http://127.0.0.1:<port>/terroir/<Slug>/ <screenshot dir>   # exit 0 = pass
```

## What it does
| Door | Was | Is |
|---|---|---|
| **One Night** | scrolled to the tables | a lens `#t=onenight`: one evening per quarter, walking order |
| The Gastronomic Dig-In | — | unchanged |
| For Guests | — | unchanged |
| **The Getaway Weekend** (new) | — | a lens `#t=getaway`: Friday night → Sunday afternoon |

Plus: the four doors are repeated at the **foot** of the article; **no lens chip** in the chapter bar; every
card that has a place shows **"Map ↗" on the closed card** (tiles and the kit's table cards; a card with no
place gets none — the house pin rule). A lens is a hidden chapter (`data-lens`) the guide's own filter shows
alone; it never appears in the whole-guide view. The gate config gets `"doors": 4`.

## Arnaud's rulings (7 Oct 2026) — do not drift
- It is **The Getaway Weekend, NOT romantic.** No "romantic", "two of you", "for two", "à deux", "couple".
- **No lens chip in the chapter bar.** The readings are reached from the doors, top and foot.
- One Night is **"a plan for each neighbourhood"** — one evening per quarter, not a list of bars.
- Maps on every closed card that has a place.

## readings.json
Text fields accept plain text, `<strong>`, `<em>`, and refs. **Every link is a ref**, resolved against the
guide — a ref that does not resolve fails the build (no dead anchors, ever):
`[[venue:<venue id>|text]]` (a TABLES venue) · `[[card:<exact visible card name>|text]]` (any `.fcard`).
A step's `ref` is the same without brackets: `"venue:lokal-dlouhaaa"`, `"card:Black Angel's"`.

```jsonc
{
 "onenight": {
  "title": "Une nuit",
  "kicker": "One night ashore · pick the quarter you are berthed nearest · walking order",
  "lede": "~50 words: the city's evening rhythm (when kitchens close, when to eat) + how to use this",
  "door_en": "Crew ashore for one evening: a plan for each quarter — …", "door_note": "La petite table · …",
  "quarters": [            // 3–10 quarters, the ones a visitor actually spends an evening in
   { "id": "stare-mesto", "name": "Staré Město · Dlouhá", "line": "one italic line: the shape of the night",
     "steps": [            // 2–5, in walking order: drink → table → bar/music → the late plate
       { "time": "18:30", "name": "Lokál Dlouhááá", "ref": "venue:lokal-dlouhaaa",
         "text": "one or two sentences: what to order, the hour it shuts, book or walk in" } ],
     "after": "optional: Spend more / Cheaper / Eat first — with [[refs]]" } ] },
 "getaway": {
  "title": "Le week-end", "door_fr": "The Getaway Weekend",
  "door_en": "Friday night to Sunday afternoon: …", "door_note": "Le pont la nuit · …",
  "kicker": "The getaway weekend · Friday night to Sunday afternoon",
  "lede": "~100 words: what the city sells vs the real thing, then 'every stop is in this guide, checked <month>'",
  "book": ["[[venue:x|Name]] — how far ahead, how"],          // what must be booked before flying
  "days": [ { "label": "Friday", "title": "The bridge at night",
              "stops": [ { "time": "19:30", "name": "Dinner at Mlýnec, at the window", "ref": "venue:mlynec",
                           "text": "2–3 sentences", "meta": "address · hours · price · booking (dated)" } ] } ],
                                                                // 8–18 stops: Fri evening, Sat full day, Sun to mid-afternoon
  "more": [ { "title": "If you have only one evening", "text": "…" },
            { "title": "The grand night instead", "text": "…" },
            { "title": "This <Month>", "dated": "Checked <date>", "items": ["…"] },   // perishable: date it
            { "title": "Where to sleep", "text": "honest: only hotels already in the guide; say we have not judged rooms" },
            { "title": "What we would leave out", "text": "the guide's own warnings" } ] }
}
```

## Rules for the content
- **Facts only from the guide's own cards and venue records** (already verified). If a stop needs a fact the
  guide does not have, verify it now and put it on the card first, then cite the card. Never invent hours.
- Hours in the plan must agree with the card: a 22:00 stop at a place that shuts at 22:00 is wrong.
- Walking order must be walkable: a quarter is one quarter. Say "tram" when it is not.
- A thin quarter is said honestly ("the tables we list here close by evening — eat first at …").
- Carry the card's own warnings (unverified trading, cash only, seasonal close) into the step.
- No banned words (the gate list), no "romantic" family, no emoji.
- The "This <Month>" block is perishable: date it, and the nightly refreshes it when it touches the guide.
