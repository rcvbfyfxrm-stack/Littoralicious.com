#!/usr/bin/env python3
"""20 Nov 2026 (Arnaud): every French section name carries its English meaning, for English readers.
Run LAST (after apply_readings). Idempotent. Run from the repo root."""
import re, pathlib
P = pathlib.Path("terroir/Barcelona-Catalunya/index.html")
h = P.read_text()
EN = {"L’Âme du lieu": "the soul of the place", "Les Tables": "where to eat", "Flâner": "to wander",
      "Boire &amp; sortir": "drinks &amp; nights out", "Autour": "around the city", "Pratique": "practical",
      "Une nuit": "one night", "Le week-end": "the weekend", "La liste": "the list"}
G = lambda en: f' <span class="gx-en">({en})</span>'
if 'class="gx-en"' not in h:
    for fr, en in EN.items():
        h = h.replace(f'class="gx-band__title">{fr}</span>', f'class="gx-band__title">{fr}{G(en)}</span>')
        h = re.sub(rf'(<a class="band-nav__chip"[^>]*>){re.escape(fr)}</a>', lambda m: m.group(1) + fr + G(en) + "</a>", h)
        h = h.replace(f'<div class="sfold__title">{fr} — ', f'<div class="sfold__title">{fr}{G(en)} — ')
    h = h.replace(">le préféré du chef<", ">le préféré du chef <span class=\"gx-en\">(the chef's favourite)</span><")
    h = h.replace(">La liste, at the end →<", ">La liste (the list), at the end →<")
    css = '<style id="gx-en-css">.gx-en{font-style:italic;font-weight:400;opacity:.72;font-size:.82em;letter-spacing:0;text-transform:none}</style>'
    h = h.replace("</head>", css + "\n</head>", 1)
P.write_text(h)
print("glossed", h.count('class="gx-en"'))
