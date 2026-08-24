#!/usr/bin/env python3
"""Generate lines/sources.html — the method statement, the liveness ledger, and every
source actually consulted, grouped. The checked-dates line lives INSIDE #sources (GOLD4 §7)."""
import json, pathlib, html
B = pathlib.Path(__file__).parent
META = json.load(open(B / "meta.json"))
D = json.load(open(B / f'{META["slug"]}-data.json'))
CHECKED = META["checkedOn"]        # e.g. "{CHECKED}"
RECHECK = META["recheckBy"]        # e.g. "February 2027"
e = lambda s: html.escape(s, quote=False)

V = D["venues"]
n = len(V)
conf = [v for v in V if v.get("status") == "confirmed"]
unv = [v for v in V if v.get("status") == "unverified"]
pinned = [v for v in V if v.get("lat") is not None]

GROUPS = D["SOURCES"]          # [[group title, [[label, url], ...]], ...]

total = sum(len(g[1]) for g in GROUPS)

out = ['<details class="sfold" id="sources">', '<summary>', '<div>',
       '<div class="sfold__title">Sources &amp; how we checked</div>',
       '<div class="sfold__desc">Every claim in this guide traces to one of these — and this is the method, including what we could not settle.</div>',
       '</div>', f'<span class="sfold__count">{total} sources</span>', '<span class="sfold__chev"></span>',
       '</summary>', '<div class="sfold__body">']

out.append(
 '<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">'
 f'<strong>Every venue in this guide was checked on {CHECKED}.</strong> Of {n} places listed, '
 f'<strong>{len(conf)} were confirmed</strong> against a primary source — the operator\'s own live site, a heritage '
 f'or navigational record, or direct observation of a public place — and <strong>{len(unv)} are marked unverified</strong> '
 'and are shown as such on their cards. Unverified means we did not confirm it, not that it is closed: treat those as '
 'leads to call, not bookings to rely on. Two addresses, Badolina and Mangi\'s, are listed as temporarily closed by one '
 'aggregator and trading by another; rather than pick one, both are flagged unresolved in the text. Prices carry the '
 'date they were observed. Where sources disagree — the lighthouse\'s first date of 1881 or 1886, the origin of the name '
 '"Kendwa", whether Leven Bank is named for HMS <em>Leven</em>, the brass bosses on a Stone Town door — the disagreement '
 'is printed rather than resolved by guesswork.</p>')

out.append(
 '<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">'
 f'<strong>Coordinates:</strong> {len(pinned)} of {n} venues carry a map pin, every one resolved against OpenStreetMap '
 'and validated by name — a match that returned a primary school for a resort, or a spa on the wrong side of the island, '
 'was rejected rather than accepted. The remaining places have no pin because no trustworthy coordinate exists for them; '
 'they still carry a Google Maps search link, which works without one. No coordinate in this guide was invented. '
 'Every venue also carries a status and a check date in the downloadable CSV.</p>')

out.append(
 '<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">'
 '<strong>What is deliberately absent:</strong> tourist-press listicles are not cited as sources for any factual claim. '
 'Aggregator data was used only to establish that a venue exists and is trading, never for history, prices or provenance. '
 'Where the only available evidence for a place was aggregator data, the venue is marked unverified.</p>')

out.append('<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">'
           '<strong>Re-check due:</strong> liveness on this coast moves fast. This guide should be re-verified by '
           f'<strong>{RECHECK}</strong> at the latest — sooner for any address flagged unresolved.</p>')

for title, items in GROUPS:
    out.append(f'<h4 class="fsub__title">{e(title)}</h4>')
    out.append("<ul class='gx-list'>")
    for label, url in items:
        out.append(f'<li><a href="{url}" target="_blank" rel="noopener">{e(label)}</a></li>')
    out.append('</ul>')

out += ['</div>', '</details>']
(B / "lines" / "sources.html").write_text("\n".join(out) + "\n")
print(f"sources.html: {total} sources · {len(conf)} confirmed / {len(unv)} unverified of {n} · {len(pinned)} pinned")
