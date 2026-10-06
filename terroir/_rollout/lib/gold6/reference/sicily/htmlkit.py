"""Shared HTML helpers for the Sicilia-Orientale build (from Prague): fcard / fsub / sfold rendering in the house markup.
Research payloads are plain text with occasional <strong>/<em>/<b>/<i>; everything else is escaped."""
import html, re, urllib.parse

ALLOWED = ("strong", "em", "b", "i")
CITY_TOKEN = "Sicilia"


def unesc(s):
    """Recursive html.unescape — agent payloads can arrive double-escaped (&amp;amp;)."""
    if not isinstance(s, str):
        return s
    prev = None
    while prev != s:
        prev, s = s, html.unescape(s)
    return s


def t(s):
    """Escape text but keep the small allowed inline tags."""
    s = unesc(s or "")
    s = html.escape(s, quote=False)
    for tg in ALLOWED:
        s = s.replace(f"&lt;{tg}&gt;", f"<{tg}>").replace(f"&lt;/{tg}&gt;", f"</{tg}>")
    return s


def a(s):
    return html.escape(unesc(s or ""), quote=True)


def maps(q):
    return "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote_plus(unesc(q).strip())


def site_link(u):
    u = (u or "").strip()
    if not u.startswith("https://"):
        return ""
    host = urllib.parse.urlparse(u).netloc.lower().removeprefix("www.")
    return f'<a class="fcard__site" href="{a(u)}" target="_blank" rel="noopener">{host} →</a>'


def fcard(c, venue_ids=()):
    name, tag, teaser = t(c.get("name")), t(c.get("tag", "")), t(c.get("teaser", ""))
    body = c.get("body") or []
    if isinstance(body, str):
        body = [body]
    out = ['<details class="fcard">',
           f'<summary><span class="fcard__name">{name}</span><span class="fcard__tag">{tag}</span>'
           f'<span class="fcard__teaser">{teaser}</span></summary>',
           '<div class="fcard__body">']
    for p in body:
        p = t(p)
        if p.startswith("★ ") or p.startswith("&#9733;"):
            p = '<span class="tsig">★</span> ' + p[2:]
        out.append(f"<p>{p}</p>")
    ref = c.get("venue_ref") or ""
    if ref and ref in venue_ids:
        out.append(f'<p class="fcard__ref"><a href="#venue-{a(ref)}">Full card — the story, hours, address, Maps →</a></p>')
    is_place = bool(c.get("maps_query")) and (c.get("tag") or "").strip().lower() not in ("the warning", "honestly")
    if c.get("status") == "unverified" and is_place:
        out.append('<p><em>Unverified — we could not confirm this is trading now. Call ahead.</em></p>')
    elif c.get("status") == "closing_soon":
        out.append('<p><strong>Closing soon — the venue itself says so. Check before you go.</strong></p>')
    if c.get("meta"):
        out.append(f'<div class="fcard__meta">{t(c["meta"])}</div>')
    sl = site_link(c.get("site"))
    if sl:
        out.append(sl)
    tagl = (c.get("tag") or "").strip().lower()
    if c.get("maps_query") and tagl not in ("the warning", "honestly"):
        out.append(f'<a class="fcard__map" href="{maps(c["maps_query"])}" target="_blank" rel="noopener">Open in Google Maps →</a>')
    out.append("</div>")
    out.append("</details>")
    return "\n".join(out)


def fsub(g, venue_ids=()):
    out = ['<div class="fsub">', f'<h4 class="fsub__title">{t(g.get("title"))}</h4>']
    if g.get("desc"):
        out.append(f'<p class="fsub__desc">{t(g["desc"])}</p>')
    out.append('<div class="fsub__cards">')
    out += [fcard(c, venue_ids) for c in g.get("cards", [])]
    out += ["</div>", "</div>"]
    return "\n".join(out)


def sfold(sid, title, desc, count, inner, attrs=""):
    return "\n".join([
        f'<details class="sfold" id="{sid}"{attrs}>', "<summary>", "<div>",
        f'<div class="sfold__title">{t(title)}</div>',
        f'<div class="sfold__desc">{t(desc)}</div>', "</div>",
        f'<span class="sfold__count">{t(count)}</span>' if count else "",
        '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">',
        inner, "</div>", "</details>"])


def section(sec, venue_ids=(), count=None, attrs="", extra_before="", extra_after=""):
    groups = sec.get("groups", [])
    n = sum(len(g.get("cards", [])) for g in groups)
    inner = []
    if sec.get("lede"):
        inner.append(f'<p class="gx-lede">{t(sec["lede"])}</p>')
    if extra_before:
        inner.append(extra_before)
    inner += [fsub(g, venue_ids) for g in groups]
    if extra_after:
        inner.append(extra_after)
    return sfold(sec["id"], sec.get("title", ""), sec.get("desc", ""),
                 count if count is not None else f"{n} to know", "\n\n".join(inner), attrs)
