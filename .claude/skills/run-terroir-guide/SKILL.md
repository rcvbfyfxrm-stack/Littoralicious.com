---
name: run-terroir-guide
description: Serve a Terroir guide locally, render it in real Chrome, and check the rendered DOM. Use when asked to run, preview, screenshot, or confirm a change to anything under terroir/ — the guides, guide-enhance.css, or the GOLD4 checks.
---

A guide assembles itself in JS and its two load-bearing data contracts **fail
silently**: a guide whose organiser never ran is byte-identical on disk to one
that works. Grepping `index.html` proves nothing. Serve it, render it, read the
DOM back.

## 1. Serve from the repo root

Assets are absolute (`/terroir/_assets/guide/...`), so the web root is the repo
root — **not** the guide directory. Serving from `terroir/Diani-Kwale/` gives you
an unstyled page and no cards.

```bash
python3 -m http.server 8811 --bind 127.0.0.1 --directory "$(git rev-parse --show-toplevel)" &
```

## 2. Guard against the wrong clone — before believing anything

A stale `http.server` from an earlier session squats the port and serves a
different checkout. Assert the bytes match the tree you just edited:

```bash
[ "$(curl -s http://127.0.0.1:8811/terroir/Diani-Kwale/ | shasum -a 256)" \
= "$(shasum -a 256 < terroir/Diani-Kwale/index.html)" ] && echo SAME || echo "WRONG CLONE"
```

## 3. Render

```bash
python3 terroir/_rollout/lib/render_smoke.py \
  http://127.0.0.1:8811/terroir/Diani-Kwale/ /tmp/out [ready-js|-] [scroll-to-sel|-]
```

Writes `/tmp/out.html` (rendered DOM) and `/tmp/out.png`. Exits 1 if the page
never finished building. Pass a selector as arg 4 to scroll a mid-page section
into frame before the screenshot (`#why-now`, `#hot-foot`).

Three things it gets right that a hand-rolled driver won't:

- **Ready signal is `.fcard__name`.** `cdp.render_dom` early-returns on
  `gx-torg__card`, which nothing emits — they're legacy Girona-era classes, and
  `checks_gold4.py` says so in as many words. That fast path can never fire, so
  every `render_dom` call burns its full ~45 s deadline. On `.fcard__name` the
  same render finishes in **~7 s**.
- **Hosts are blackholed** except loopback and unpkg (Leaflet). The guides hold
  an open Firestore channel and pull map tiles, so network-idle never arrives —
  an unblocked render hangs rather than fails. It also makes it impossible for a
  local render to touch anything live.
- **Console errors and failed loads are kept.** `cdp.WS.call` discards every
  message that isn't its own reply, which throws away exactly what you're
  watching for.

## 4. Assert on the DOM, never on the file

```python
import re
d = open("/tmp/out.html").read()
top  = re.search(r'<section[^>]*id="why-now".*?</section>', d, re.S).group(0)
foot = d[d.find('id="hot-foot"'):][:20000]
assert 'class="gx-jump"' in top and not re.findall(r'class="fcard__name"', top)
assert 'href="#hot-foot"' in top and 'href="#why-now"' in foot
assert d.count("data-hot-asof") == 1        # only the foot board carries the dates
```

Strip tags before matching prose (`re.sub(r'<[^>]+>', ' ', ...)` then
`html.unescape`) — the rendered DOM interleaves markup through the sentence, so
a date regex over raw HTML silently finds nothing and reads as a pass.

**Then open the PNG and look at it.** A blank or unstyled frame is a failed
launch, and every DOM assertion above still passes on one.

## 5. The full gate

Everything here is the render half of the GOLD4 gate, which is the real bar. It
takes the repo root and a guide config — not a slug:

```bash
bash terroir/_rollout/lib/checks-gold4.sh . terroir/_rollout/lib/guides/Diani-Kwale.check.json
```

Exit 0 = deployable, 1 = HOLD. `--no-render` skips the Chrome half when you only
touched prose. Use `render_smoke.py` while iterating; run the gate before calling
it done.

## Gotchas

- `GET /favicon.ico 404` is expected noise. Any *other* 404 is a real missing
  asset — the `http.server` log names it, CDP only says something failed.
- `ERR_CONNECTION_REFUSED` in the output is the blackholed hosts, not a fault.
- Guides are large (~500 KB rendered). Don't paste the DOM; assert against it.
- Stop the server when done; a leaked one becomes the next session's wrong clone.
