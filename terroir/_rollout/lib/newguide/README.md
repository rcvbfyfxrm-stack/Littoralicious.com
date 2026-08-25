# Building a new terroir guide — the GOLD5 scaffold

These are the working scripts that built **Kendwa-Unguja** (2026-08-23), generalised so the
next guide does not have to re-derive the pipeline. Copy this folder to a scratch build dir,
fill in `meta.json` and the data, run the six steps, and put it through the gate.

> Do **not** build in the repo. Build in `/private/tmp/<place>-build/` and copy the outputs in.
> ⚠ Use absolute paths in every shell block — the session cwd resets to `$HOME` between calls,
> and a heredoc that assumes otherwise will write into the home directory.

---

## The pipeline

```
research  →  geocode.py  →  build-data*.py  →  combine.py  →  emit.py  →  assemble.py  →  GATE
              (pins)         (venues)          (lanes)        (data.js)    (index.html)
```

| step | script | in | out |
|------|--------|----|-----|
| 1 | `geocode.py` | `geo-queries.json` | `geo-results.json` |
| 2 | *(yours)* `build-data*.py` | authored venues | `_v1.json … _vN.json` |
| 3 | *(yours)* `combine.py` | `_v*.json` + lanes | `<slug>-data.json` |
| 4 | `gen_liste.py`, `gen_sources.py` | `liste.json`, data | `lines/la-liste.html`, `lines/sources.html` |
| 5 | `emit.py` | `<slug>-data.json` | `data.js`, both CSVs, the `.ics` |
| 6 | `assemble.py` | reference chrome + `lines/*.html` | `index.html` |
| 7 | **gate** | `guides/<Slug>.check.json` | green, or HOLD |

`build-data*.py` and `combine.py` are the two files that are genuinely per-guide — they hold
the venues and the lane structure. Copy Kendwa's as your starting shape.

---

## 1 · Geocode — and never invent a pin

`geocode.py` runs Nominatim with a sanity box and **name validation**: a hit whose OSM feature
name shares no significant word with the venue is rejected. On Kendwa this caught a primary
school matched for a resort, another for a spice estate, a hotel matched for public gardens,
and a spa on the wrong side of the island.

- Reject `school / shule / skuli / msingi / ward office / primary` outright.
- A venue that will not resolve stays `lat: null`. It still gets a Maps **search** link, which
  needs no coordinate. Never hand-write a coordinate to fill a gap.
- Where a venue is factually inside another (a restaurant in a hotel), alias the host's pin and
  record `geo_precision: "alias"`.
- Expect ~75–80% coverage. That is fine; the gate's floor is what matters.

## 2–3 · Venues and lanes

Author venues in `build-data*.py` files (split them; they get long). Each venue needs the rich
fields or its card renders bare — see GOLD5 §2. Then `combine.py` assigns lanes.

⚠ **A venue may sit in exactly ONE lane.** `renderCategories` filters on `v.category`, so a
venue listed twice silently vanishes from every lane but the last. Assert it:

```python
assert vid not in seen, f"venue {vid} in two lanes: {seen[vid]} and {k}"
```

## 4 · Generated sections

`liste.json` is the single source for both the `#la-liste` section and the `.ics` — never write
the list twice. `gen_sources.py` reads `D["SOURCES"]` and writes the honesty ledger, counting
confirmed/unverified/pinned from the data so the numbers cannot drift from reality.

## 5 · Emit

`emit.py` writes `data.js`, **both** CSV copies and the `.ics`. `D["HOT"]` is a
`{venue_id: "one dated line"}` map that fills the `hot_this_month` CSV column — that column
emitted empty on every guide before 2026-08-23, so check it.

## 6 · Assemble

Clones the current reference guide's chrome and replaces every content block wholesale.

⚠ **Two traps, both learned the hard way — read GOLD5 §12 before touching section order.**
`guide-enhance.js` is LOCKED and re-sorts sections by a `RANK` table; and you must never author
an `id="band-eat"` anchor.

### The section templates in `lines/`

| file | goes | note |
|------|------|------|
| `craft.TEMPLATE.html` | in place | leads with the one to do; the ET bar decides the order but is never printed (GOLD5 §4) |
| `hot.TEMPLATE.html` | **foot**, as `#hot-foot` | the dated board, once; the file ends with the `#why-now` pointer that goes high (§3b) |
| `eat-pointer.TEMPLATE.html` | high, as `#eat` | one line down to `#la-liste`, which holds the list, The Dish and the `.ics` (§3b) |

⚠ A jump line must stay a `<section>`. RANK keys are `TAG#id`, so a `<div>` on a ranked id scores
`200 + i` and is flung to the tail — the line would end up at the bottom next to the thing it
points at.

## 7 · The gate

```bash
python3 terroir/_rollout/lib/checks_gold4.py . terroir/_rollout/lib/guides/<Slug>.check.json
```

Copy `guides/_TEMPLATE.check.json`. Exit 0 = deployable, 1 = HOLD. Never skip the render stage
before a deploy: the two load-bearing data contracts fail **silently**.

**Positive-control your own gates.** A check that cannot fail is not a check. When you add one,
break the input on purpose once and confirm it goes red — that is how the hot-board freshness
gate was proven.
