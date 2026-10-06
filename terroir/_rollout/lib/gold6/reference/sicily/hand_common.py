"""Shared renderers for the hand-written parts of the three city guides."""
import json, pathlib, re
from htmlkit import sfold, t, a, maps, unesc

B = pathlib.Path(__file__).parent
PL = json.load(open(B.parent / "research" / "place.json"))

def seasonal(w, city):
    rows = "".join(f"<tr><td>{t(c['title'])}</td><td>{t(unesc(c['body']))}</td></tr>" for c in PL["cards"] if c["section_suggest"] == "seasonal")
    w("seasonal", sfold("seasonal", "Seasonal", f"What each part of the year is for around {city} — the blood orange, the tragedies, the granita and the harvest",
                        "4 seasons", f'<table class="seas"><tbody>{rows}</tbody></table>'))

def towns(w, fcard, title, desc, lede, groups):
    """groups: [(title, desc, [(name, tag, teaser, story, facts, maps_query)])] — each ≤3/4."""
    inner = [f'<p class="gx-lede">{t(lede)}</p>']
    n = 0
    for gt, gd, items in groups:
        assert len(items) <= 4, gt
        n += len(items)
        inner.append("\n".join(['<div class="fsub">', f'<h4 class="fsub__title">{t(gt)}</h4>', f'<p class="fsub__desc">{t(gd)}</p>' if gd else "",
                                '<div class="fsub__cards">'] + [fcard(nm, tg, te, [st], fa, maps_q=mq) for nm, tg, te, st, fa, mq in items] + ["</div>", "</div>"]))
    w("quartiers", sfold("quartiers", title, desc, f"{n} places", "\n\n".join(inner)))
    return [{"name": nm, "desc": te, "maps": maps(mq)} for _, _, items in groups for nm, tg, te, st, fa, mq in items]

def day(w, fcard, title, desc, lede, days):
    """days: [(name, tag, teaser, [(time, step)], maps_query)] — the times ARE the labels."""
    cards = [fcard(nm, tg, te, [], steps, maps_q=mq) for nm, tg, te, steps, mq in days]
    w("twentyfour", sfold("twentyfour", title, desc, f"{len(days)} {'day' if len(days) == 1 else 'days'}",
                          f'<p class="gx-lede">{t(lede)}</p>\n<div class="fsub"><h4 class="fsub__title">Pick one</h4>'
                          '<p class="fsub__desc">Every name links to its full card.</p><div class="fsub__cards">' + "\n".join(cards) + "</div></div>"))

def hot(w, fcard, asof, review, checked_line, pointer_line, groups):
    """groups: [(title, [(name, tag, teaser, body, facts, maps_query, venue_ref)])] — each ≤3."""
    inner = ['<p class="gx-hot-jump">This is the board the line at the top points to — <a href="#why-now">back up to where you saw it</a></p>',
             '<p class="gx-lede">The rest of this guide is written to last. This part is not — it is a dated snapshot of what is on in October 2026, with the date it was checked.</p>']
    for gt, items in groups:
        assert len(items) <= 3, gt
        inner.append("\n".join(['<div class="fsub">', f'<h4 class="fsub__title">{t(gt)}</h4>', '<div class="fsub__cards">']
                               + [fcard(nm, tg, te, [bd], fa, maps_q=mq, ref=rf) for nm, tg, te, bd, fa, mq, rf in items] + ["</div>", "</div>"]))
    w("hot-foot", sfold("hot-foot", "What's hot this month", f"Checked {checked_line}. This is the one section that goes stale: review by {review_human(review)}",
                        "Oct 2026", "\n".join(inner), f' data-hot-asof="{asof}" data-hot-review="{review}"'))
    w("why-now", '<section class="gx-jump" id="why-now"><span id="hot"></span>\n'
      f'<p><span class="gx-jump__t">What&#x27;s hot this month.</span> {t(pointer_line)} The dated board is at the foot. <a class="gx-jump__go" href="#hot-foot">What&#x27;s on right now →</a></p>\n'
      f'<p class="gx-jump__meta">The one part of this guide written to go out of date: review by {review_human(review)}.</p>\n</section>')

def review_human(iso):
    y, m, d = iso.split("-")
    return f"{int(d)} {['January','February','March','April','May','June','July','August','September','October','November','December'][int(m)-1]} {y}"

def eat_and_tables(w, n_liste, n_tables, tables_desc):
    w("eat", '<section class="gx-jump" id="eat">\n'
      f'<p><span class="gx-jump__t">What to eat &amp; drink.</span> The canon — {n_liste} things, how to say each one, the fact that makes it matter and the exact best place for it — is one section at the foot of this guide, with the stories behind it. <a class="gx-jump__go" href="#la-liste">La liste, at the end →</a></p>\n'
      '<p class="gx-jump__meta">It ends with a one-tap button that drops the list into your phone&#x27;s Reminders app.</p>\n</section>')
    w("tables", "\n".join(['<details class="sfold" id="tables">', '<summary>', '<div>', '<div class="sfold__title">The Tables</div>',
      f'<div class="sfold__desc">{t(tables_desc)}</div>', '</div>', f'<span class="sfold__count">{n_tables} places</span>', '<span class="sfold__chev"></span>',
      '</summary>', '<div class="sfold__body">', '<div class="terroir-berths" id="terroir-berths"></div>',
      '<div class="terroir-tier" data-tier="notime" style="display:none"><div class="terroir-tier__list" id="terroir-list-notime"></div></div>',
      '<div class="terroir-tier" data-tier="several" style="display:none"><div class="terroir-tier__list" id="terroir-list-several"></div></div>',
      '<div class="terroir-tier" data-tier="plenty" style="display:none"><div class="terroir-tier__list" id="terroir-list-plenty"></div></div>',
      '</div>', '</details>']))

def liste(w, V, slug, liste_slug, cal_name, items, dishes):
    """items: [(name, say, what, why, where, venue_id, star)] · dishes: [(name, story, where, maps_query)]"""
    out, js = [], []
    for n, (name, say, what, why, where, vid, star) in enumerate(items, 1):
        mp = maps(V[vid]["maps_query"])
        js.append({"n": n, "name": name, "say": say, "what": what, "why": why, "where": where, "star": star, "maps": mp, "venue": vid})
        out.append("<li>" + f'<b>{t(name)}</b> <span class="gx-say">say: {t(say)}</span>' + ('<span class="gx-fav-chef">le préféré du chef</span>' if star else "")
                   + f'<div class="gx-liste__what">{t(what)}</div><div class="gx-liste__why">{t(why)}</div>'
                   + f'<div class="gx-liste__where"><b>Best place</b> — {t(where)} · <a href="{mp}" target="_blank" rel="noopener">Maps →</a></div></li>')
    dish = [f'<article class="tcard tcard--restaurant" data-section="dish" data-venue-id="p-dish-{n}" id="p-dish-{n}"><div class="tcard__rank">#{n}</div><div class="tcard__type">DISH</div>'
            f'<h3 class="tcard__name"><span class="tcard__name-text">{t(nm)}</span> <span class="tcard__label"></span></h3><div class="tcard__why">{t(st)}</div>'
            f'<div class="tcard__meta-row"><span>Where</span><span>{t(wh)} · <a href="{maps(mq)}" target="_blank" rel="noopener">Maps →</a></span></div></article>'
            for n, (nm, st, wh, mq) in enumerate(dishes, 1)]
    nstar = sum(1 for x in items if x[6])
    inner = (f'<p class="gx-hot-jump"><a href="#eat">Back up to where the list was announced</a></p>'
             f'<p><a class="terroir-btn terroir-btn--primary" href="/terroir/{slug}/{liste_slug}-eat-drink-checklist.ics">Add the checklist to Reminders →</a>'
             '<span style="font-family:Inter,system-ui,sans-serif;font-size:0.78em;color:var(--ink-3);display:block;margin-top:6px">'
             f'One tap on an iPhone and it opens in the <strong>Reminders</strong> app as its own list — «{t(cal_name)} — eat &amp; drink checklist» — each item with its best place and map link.</span></p>'
             '<ol class="gx-liste">' + "\n".join(out) + "</ol>"
             '<div class="gx-liste-dish"><h4 class="fsub__title">The Dish — where the list comes from</h4>'
             '<p class="fsub__desc">The stories behind the canon, and where they are argued rather than settled.</p>'
             '<div id="dish" data-grid><div class="sfold__body">' + "\n".join(dish) + "</div></div></div>")
    w("la-liste", sfold("la-liste", "La liste — what to eat, what to drink, and where it comes from",
                        f"{len(items)} things to have eaten and drunk before you leave — {nstar} of them the chef's own — and the stories behind them. Tap the button and the list lands in your Reminders app.",
                        f"{len(items)} to try", inner))
    return js
