#!/usr/bin/env python3
"""Assemble a GOLD5 guide from the chrome of the current reference guide (meta.src).
Every content block is replaced wholesale; a final token sweep must come back clean."""
import re, json, pathlib

BUILD = pathlib.Path(__file__).parent
META = json.load(open(BUILD / "meta.json"))
SRC = pathlib.Path(META["src"]).read_text()
L = lambda n: (BUILD / "lines" / f"{n}.html").read_text().rstrip("\n")


def balanced(doc, start, tag):
    """End index (exclusive) of the element whose opening tag starts at `start`."""
    opens = re.compile(f"<{tag}\\b")
    i, depth = start, 0
    closes = f"</{tag}>"
    while True:
        no = opens.search(doc, i + 1 if depth else i)
        nc = doc.find(closes, i + 1 if depth else i)
        if nc < 0:
            raise SystemExit(f"unbalanced <{tag}> at {start}")
        if no and no.start() < nc:
            depth += 1; i = no.start()
        else:
            depth -= 1; i = nc
            if depth == 0:
                return nc + len(closes)


def replace_el(doc, anchor, tag, new_html, required=True):
    j = doc.find(anchor)
    if j < 0:
        if required:
            raise SystemExit(f"anchor not found: {anchor}")
        return doc
    start = doc.rfind(f"<{tag}", 0, j + len(tag) + 2)
    return doc[:start] + new_html + doc[balanced(doc, start, tag):]


def delete_el(doc, anchor, tag):
    j = doc.find(anchor)
    if j < 0:
        return doc
    start = doc.rfind(f"<{tag}", 0, j + len(tag) + 2)
    return doc[:start] + doc[balanced(doc, start, tag):]


doc = SRC

# ── head ───────────────────────────────────────────────────────────────────
doc = re.sub(r"<title>[^<]*</title>", f"<title>{META['title']}</title>", doc, count=1)
doc = doc.replace(META["srcCity"].lower() + "-readability", META["city"].lower() + "-readability")
if '<meta name="description"' in doc:
    doc = re.sub(r'(<meta name="description" content=")[^"]*(")',
                 lambda m: m.group(1) + META["desc"].replace('"', "&quot;") + m.group(2), doc, count=1)
else:
    doc = doc.replace("</title>", f'</title>\n  <meta name="description" content="{META["desc"]}">', 1)

# ── prelude blocks ─────────────────────────────────────────────────────────
doc = replace_el(doc, '<div class="hero">', "div", L("hero"))
doc = replace_el(doc, '<div class="etymon">', "div", L("etymon"))
doc = replace_el(doc, '<div class="lead">', "div", L("lead"))
doc = replace_el(doc, '<div class="funfact">', "div", L("funfact"))
doc = replace_el(doc, 'id="soul"', "section", L("soul"))

# ── "What's hot this month" ────────────────────────────────────────────────
# Uses id="why-now" deliberately: guide-enhance.js's locked RANK table scores that id at
# 11, which puts the block high (right before #eat) where a time-sensitive board belongs.
# An unranked id like #hot would be sorted to the tail with the other unknowns. The #hot
# anchor lives inside it so both links work.
j = doc.find('id="soul"')
start = doc.rfind("<section", 0, j)
end = balanced(doc, start, "section")
doc = doc[:end] + "\n" + L("hot") + doc[end:]

# ── sfold sections ─────────────────────────────────────────────────────────
for sid in META["sections_replace"]:
    doc = replace_el(doc, f'id="{sid}"', "details", L(sid))
for sid in META["sections_delete"]:
    doc = delete_el(doc, f'id="{sid}"', "details")
doc = replace_el(doc, 'id="tables"', "details", L("tables-shell"))

# ── new sections, inserted after the #walks block ──────────────────────────
for sid in reversed(META["sections_insert_after_walks"]):
    j = doc.find('id="walks"')
    start = doc.rfind("<details", 0, j)
    end = balanced(doc, start, "details")
    doc = doc[:end] + "\n" + L(sid) + doc[end:]

# ── relocate #dish and the «Ce Soir» shortlist down to the checklist ───────
# guide-enhance.js holds a LOCKED `RANK` table that re-sorts every direct child of the
# lead's container: known ids get a fixed rank (#dish = 23, pinned next to #tables), and
# anything it does not recognise gets 200+index, i.e. sorted to the tail in source order.
# `data-bridge-after` alone cannot beat that — it fires and then reorder() undoes it.
#
# So instead of fighting the kit (or editing a locked file), we use it: everything we want
# at the foot goes inside ONE rank-neutral wrapper. keyOf() reads the wrapper, not its
# children, so the whole block travels together and keeps its internal source order. The
# kit then injects the JS-built #ce-soir immediately after #band-eat — inside the wrapper.
# Result: … la-liste → Ce Soir → The Dish → sources.
def _extract(doc, anchor, tag):
    j = doc.find(anchor)
    if j < 0: raise SystemExit(f"anchor not found: {anchor}")
    start = doc.rfind(f"<{tag}", 0, j + len(tag) + 2)
    end = balanced(doc, start, tag)
    return doc[:start] + doc[end:], doc[start:end]

doc, dish_block = _extract(doc, 'id="dish"', "details")
doc, liste_block = _extract(doc, 'id="la-liste"', "details")
doc, sources_block = _extract(doc, 'id="sources"', "details")
# la-liste rode down on data-bridge-after before; the wrapper carries it now.
liste_block = liste_block.replace(' data-bridge-after="#money-sits"', "", 1)

# ⚠ Do NOT author an id="band-eat" anchor here: guide-enhance.js generates its own band
# divider with exactly that id for the "eat" act, and getElementById returns the kit's one
# first — which is why the shortlist kept reappearing beside #tables. Instead we let the
# kit build #ce-soir wherever it likes and move it into the tail once it exists.
relocate = """<script>
/* «Ce Soir» belongs with the checklist at the foot of the guide, not in the eat band.
   The kit anchors it to its own generated #band-eat divider, so relocate it once built. */
(function () {
  var tries = 0;
  function place() {
    var cs = document.getElementById('ce-soir'),
        tail = document.querySelector('.gx-tail'),
        dish = document.getElementById('dish');
    if (cs && tail && dish) { if (cs.parentNode !== tail) tail.insertBefore(cs, dish); return; }
    if (++tries < 240) requestAnimationFrame(place);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', place);
  else place();
})();
</script>"""
tail = ('<div class="gx-tail">\n' + liste_block + "\n"
        + dish_block + "\n" + sources_block + "\n</div>\n" + relocate)

# append the wrapper where #sources used to sit — the end of the guide body
j = doc.rfind("</main>")
if j < 0:
    j = doc.rfind("<footer")
if j < 0: raise SystemExit("no </main> or <footer> to anchor the tail block")
doc = doc[:j] + tail + "\n" + doc[j:]

# ── the craftsmanship section, at the foot of the guide before #avoid ──────
j = doc.find('id="avoid"')
if j < 0: raise SystemExit("#avoid not found")
start = doc.rfind("<details", 0, j)
doc = doc[:start] + L("craft") + "\n" + doc[start:]

# ── config / data / tokens ─────────────────────────────────────────────────
doc = doc.replace(f"/terroir/data/{META['srcSlug']}.js", f"/terroir/data/{META['slug']}.js")
doc = re.sub(r"window\.TERROIR_CONFIG = \{[^}]*\};",
             f"window.TERROIR_CONFIG = {{ articleId:'terroir-{META['slug']}', portName:'{META['city']}', "
             f"center:[{META['center'][0]}, {META['center'][1]}], zoom:{META['zoom']}, "
             f"cityRadiusKm:{META['radiusKm']} }};", doc)
doc = doc.replace(META["srcSlug"], META["slug"])
for old, new in zip(META["srcCenter"], META["center"]):
    doc = doc.replace(str(old), str(new))
sc = META["srcCity"]
doc = doc.replace(f"/* {sc} — scoped:", f"/* {META['city']} — scoped:")
doc = doc.replace(f"/* {sc}: the top-3", f"/* {META['city']}: the top-3")
doc = doc.replace(f"{sc.lower()}-eat-drink-checklist", f"{META.get('listeSlug', META['city'].lower())}-eat-drink-checklist")
for old, new in META.get("tokenSwaps", []):
    doc = doc.replace(old, new)

# the topnav / masthead label and the footer sig
doc = re.sub(r"(<a[^>]*class=\"terroir-topnav__brand\"[^>]*>)[^<]*(</a>)",
             lambda m: m.group(1) + META["city"] + m.group(2), doc)

out = BUILD / "out"; out.mkdir(exist_ok=True)
(out / "index.html").write_text(doc)

stale = {w: len(re.findall(r"\b" + re.escape(w) + r"\b", doc)) for w in META["stale_tokens"]}
stale = {k: v for k, v in stale.items() if v}
print(f"assembled -> {out/'index.html'} ({len(doc)} bytes)")
print("STALE TOKENS:", stale if stale else "none")
