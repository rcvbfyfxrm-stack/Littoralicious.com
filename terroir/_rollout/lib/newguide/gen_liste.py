#!/usr/bin/env python3
"""Generate lines/la-liste.html from liste.json — one source of truth for the list and the .ics."""
import json, pathlib, html
B = pathlib.Path(__file__).parent
META = json.load(open(B / "meta.json"))
SLUG, CITY = META["slug"], META["city"]
LS = META.get("listeSlug", CITY.lower())
L = json.load(open(B / "liste.json"))
e = lambda s: html.escape(s, quote=False)

out = ['<details class="sfold" id="la-liste" data-bridge-after="#money-sits">', '<summary>', '<div>',
       '<div class="sfold__title">La liste — what to eat &amp; what to drink</div>',
       f'<div class="sfold__desc">Twenty things to have eaten and drunk before you leave — {sum(1 for i in L if i["star"])} of them the '
       'chef&#x27;s own — tap the button and the whole list lands in your Reminders app.</div>',
       '</div>', f'<span class="sfold__count">{len(L)} to try</span>', '<span class="sfold__chev"></span>',
       '</summary>', '<div class="sfold__body">', '<p>',
       f'<a class="terroir-btn terroir-btn--primary" href="/terroir/{SLUG}/{LS}-eat-drink-checklist.ics">Add the checklist to Reminders →</a>',
       '<span style="font-family:Inter,system-ui,sans-serif;font-size:0.78em;color:var(--ink-3);display:block;margin-top:6px">'
       f'One tap on an iPhone and it opens straight in the <strong>Reminders</strong> app as its own tickable list — '
       f'«{CITY} — eat &amp; drink checklist» — each item carrying its best place and map link.</span>',
       '</p>', '<ol class="gx-liste">']

for it in L:
    out.append('<li>')
    out.append(f'<b>{e(it["name"])}</b> <span class="gx-say">say: {e(it["say"])}</span>')
    if it["star"]:
        out.append('<span class="gx-fav-chef">le préféré du chef</span>')
    out.append(f'<div class="gx-liste__what">{e(it["what"])}</div>')
    out.append(f'<div class="gx-liste__why">{e(it["why"])}</div>')
    out.append('<div class="gx-liste__where">')
    out.append(f'<b>Best place</b> — {e(it["where"])} · <a href="{it["maps"]}" target="_blank" rel="noopener">Maps →</a>')
    out.append('</div>')
    out.append('</li>')

out += ['</ol>', '</div>', '</details>']
(B / "lines" / "la-liste.html").write_text("\n".join(out) + "\n")
print(f"la-liste.html: {len(L)} items, {sum(1 for i in L if i['star'])} starred")
