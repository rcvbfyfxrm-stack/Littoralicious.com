/* TERROIR KIT — BRIDGE ("La Passerelle"). Additive, opt-in.
   The entire file no-ops unless window.TERROIR_DATA.BRIDGE exists, and only
   opted-in guides include it at all (double gate). Loaded LAST (defer order)
   so it decorates the final reordered DOM. Touches no other kit file. */
(function () { 'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function boot() {
    var D = window.TERROIR_DATA || {}, B = D.BRIDGE;
    if (!B) return;                                    /* THE GATE */
    document.body.classList.add('gx-bridge-on');
    var V = {}; (D.VENUES || []).forEach(function (v) { V[v.id] = v; });
    moveAuthored();
    buildShortlist(B, V);
    buildDoors(B, V);
    bandSpy();
    trayCopy(V);
  }

  /* ---------- [data-bridge-after] — authored sections move themselves */
  function moveAuthored() {
    document.querySelectorAll('[data-bridge-after]').forEach(function (el) {
      var t = document.querySelector(el.getAttribute('data-bridge-after'));
      if (t && t.parentNode) t.parentNode.insertBefore(el, t.nextSibling);
    });
  }

  /* ---------- the three doors */
  function buildDoors(B, V) {
    if (document.querySelector('.gx-bridge')) return;
    var lead = document.querySelector('.lead');
    if (!lead || !B.doors || !B.doors.length) return;
    var head = 'Nobody reads all of it — each door goes straight to its answer.';
    var html = '<div class="gx-bridge__head"><span class="gx-bridge__fr">Trois lectures</span>' +
      '<span class="gx-bridge__en">' + esc(head) + '</span></div>';
    B.doors.forEach(function (d) {
      var note = d.note;
      if (note === 'auto') {
        var ids = (B.shortlist && B.shortlist.groups || []).reduce(function (a, g) { return a.concat(g.ids || []); }, []);
        var dates = ids.map(function (id) { return (V[id] || {}).statusChecked; }).filter(Boolean).sort();
        note = ids.length + ' tables' + (dates.length ? ' · checked ' + fmtRange(dates[0], dates[dates.length - 1]) : '');
      }
      html += '<a class="gx-bridge__door" href="' + esc(d.href) + '" data-open="' + esc((d.open || []).join(',')) + '">' +
        '<b>' + esc(d.fr) + '</b><span>' + esc(d.en) + '</span><i>' + esc(note) + '</i></a>';
    });
    var nav = document.createElement('nav');
    nav.className = 'gx-bridge';
    nav.setAttribute('aria-label', 'Three ways to read this guide');
    nav.innerHTML = html;
    lead.parentNode.insertBefore(nav, lead.nextSibling);
    nav.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('.gx-bridge__door');
      if (!a) return;
      e.preventDefault();
      (a.getAttribute('data-open') || '').split(',').forEach(function (id) {
        var el = document.getElementById(id.trim());
        if (el && el.tagName === 'DETAILS') el.open = true;
      });
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); try { history.replaceState(null, '', a.getAttribute('href')); } catch (x) {} }
    });
  }

  function fmtRange(a, b) {
    function d(s) { var p = s.split('-'); return p.length === 3 ? +p[2] : s; }
    function my(s) { var p = s.split('-'); if (p.length !== 3) return s;
      var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return M[+p[1] - 1] + ' ' + p[0]; }
    if (a === b) return d(a) + ' ' + my(a);
    if (a.slice(0, 7) === b.slice(0, 7)) return d(a) + '–' + d(b) + ' ' + my(a);
    return a + ' – ' + b;
  }

  /* ---------- «Ce Soir» — the charter shortlist */
  function buildShortlist(B, V) {
    var S = B.shortlist;
    if (!S || document.getElementById('ce-soir')) return;
    var anchor = document.getElementById('band-eat') || document.getElementById('tables');
    if (!anchor) return;
    var Fav = window.TerroirFav;
    var rows = 0, html = '';
    (S.groups || []).forEach(function (g) {
      var inner = '';
      (g.ids || []).forEach(function (id) {
        var v = V[id];
        if (!v) { if (window.console) console.warn('bridge: unknown shortlist id', id); return; }
        rows++;
        var c = v.charter || {};
        var chip = v.signal_chip ? '<span class="terroir-card__chip" title="' + esc(v.signal_chip.full || '') + '">' + esc(v.signal_chip.label || '') + '</span>' : '';
        var cells = '';
        if (c.price) cells += '<b class="gx-cs__price">' + esc(c.price) + '</b>';
        ['book', 'dress', 'view', 'private'].forEach(function (k) {
          if (c[k]) cells += '<span class="gx-cs__cell">' + esc(c[k]) + '</span>';
        });
        if (c.warn) cells += '<span class="gx-cs__flag">' + esc(c.warn) + '</span>';
        if (v.status && v.status !== 'confirmed') cells += '<span class="gx-cs__flag gx-cs__flag--live">Unverified — call ahead</span>';
        var acts = '';
        if (v.phone) acts += '<a href="tel:' + esc(v.phone.replace(/[^+\d]/g, '')) + '">Call</a>';
        if (v.maps) acts += '<a href="' + esc(v.maps) + '" target="_blank" rel="noopener">Maps →</a>';
        acts += '<a href="#venue-' + esc(id) + '">Full entry →</a>' +
          '<button type="button" class="gx-cs__copy" data-copy="' + esc(id) + '">Copy for itinerary</button>';
        var loved = Fav && Fav.isLoved && Fav.isLoved(id);
        inner += '<div class="gx-cs gx-favable" data-venue-id="' + esc(id) + '" data-name="' + esc(v.name) + '">' +
          '<div class="gx-cs__top"><a class="gx-cs__name" href="#venue-' + esc(id) + '">' + esc(v.name) + '</a>' + chip +
          '<span class="gx-cs__area">' + esc(v.neighborhood || '') + '</span></div>' +
          (cells ? '<div class="gx-cs__strip">' + cells + '</div>' : '') +
          '<p class="gx-cs__fit">' + esc(c.fit || v.hook || '') + '</p>' +
          '<div class="gx-cs__acts">' + acts + '</div>' +
          '<button class="gx-fav' + (loved ? ' is-loved' : '') + '" type="button" data-fav-id="' + esc(id) + '" aria-label="Save to favourites">' +
          '<span class="gx-fav__heart">' + (loved ? '♥' : '♡') + '</span><span class="gx-fav__count"></span></button></div>';
      });
      if (inner) html += '<div class="gx-cs-group"><span class="gx-cs-group__label">' + esc(g.label) + '</span>' +
        '<span class="gx-cs-group__sub">' + esc(g.sub || '') + '</span></div>' + inner;
    });
    if (!rows) return;
    var dates = [];
    (S.groups || []).forEach(function (g) { (g.ids || []).forEach(function (id) {
      if (V[id] && V[id].statusChecked) dates.push(V[id].statusChecked); }); });
    dates.sort();
    var foot = dates.length ? '<p class="gx-cs__foot">Booking states checked ' + esc(fmtRange(dates[0], dates[dates.length - 1])) +
      ' — where a row says unverified, call before you promise the table to a guest.</p>' : '';
    var det = document.createElement('details');
    det.className = 'sfold'; det.id = 'ce-soir';
    det.innerHTML = '<summary><div><div class="sfold__title">' + esc(S.title || 'Ce Soir') + '</div>' +
      '<div class="sfold__desc">' + esc(S.desc || '') + '</div></div>' +
      '<span class="sfold__count">' + rows + ' tables</span><span class="sfold__chev"></span></summary>' +
      '<div class="sfold__body">' + html + foot + '</div>';
    anchor.parentNode.insertBefore(det, anchor.nextSibling);
    det.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.gx-cs__copy');
      if (b) { e.preventDefault(); copyOne(b.getAttribute('data-copy'), V, b); }
    });
  }

  /* ---------- the copy composer */
  function composeLine(v) {
    var c = v.charter || {}, L = [];
    L.push(v.name + (v.neighborhood ? ' — ' + v.neighborhood : ''));
    if (c.fit || v.hook) L.push(c.fit || v.hook);
    var dp = [];
    if (c.dress) dp.push('Dress: ' + c.dress);
    if (c.price) dp.push('Price: ' + c.price);
    if (dp.length) L.push(dp.join(' · '));
    var bk = [];
    if (c.book) bk.push(c.book);
    if (v.phone) bk.push(v.phone);
    if (bk.length) L.push('Booking: ' + bk.join(' — '));
    if (c.warn || v.caveat) L.push('Note: ' + (c.warn || v.caveat));
    if (v.maps) L.push('Map: ' + v.maps);
    return L.join('\n');
  }

  function putClipboard(text, btn) {
    function done() {
      if (!btn) return;
      var was = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(function () { btn.textContent = was; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
    function fallback(t) {
      var ta = document.createElement('textarea');
      ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (x) {}
      document.body.removeChild(ta);
    }
  }

  function copyOne(id, V, btn) { if (V[id]) putClipboard(composeLine(V[id]), btn); }

  /* ---------- tray: "Copy my list (N)" */
  function trayCopy(V) {
    var tray = document.querySelector('.gx-fav-tray');
    if (!tray) return;
    function mine() {
      var favs = [];
      try { favs = (window.TerroirFav && window.TerroirFav.favourites) ? window.TerroirFav.favourites() : []; } catch (x) {}
      return favs.map(function (f) { return f.id; }).filter(function (id) { return V[id]; });
    }
    function insert() {
      var have = tray.querySelector('.gx-bridge-copyall');
      var ids = mine();
      if (!ids.length) { if (have) have.remove(); return; }
      var label = 'Copy my list (' + ids.length + ')';
      if (have) { if (have.textContent !== label) have.textContent = label; return; }
      var sub = tray.querySelector('.gx-fav-tray__sub');
      if (!sub) return;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'gx-bridge-copyall';
      b.textContent = label;
      b.addEventListener('click', function () {
        putClipboard(mine().map(function (id) { return composeLine(V[id]); }).join('\n\n'), b);
      });
      sub.parentNode.insertBefore(b, sub.nextSibling);
    }
    insert();
    if (window.TerroirFav && window.TerroirFav.onChange) window.TerroirFav.onChange(function () { setTimeout(insert, 50); });
    new MutationObserver(insert).observe(tray, { childList: true, subtree: true });
  }

  /* ---------- band-nav scrollspy */
  function bandSpy() {
    var bands = document.querySelectorAll('.gx-band[id]');
    var chips = document.querySelectorAll('.band-nav__chip');
    if (!bands.length || !chips.length || !('IntersectionObserver' in window)) return;
    var byHref = {};
    chips.forEach(function (c) { byHref[c.getAttribute('href')] = c; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        chips.forEach(function (c) { c.classList.remove('is-here'); });
        var chip = byHref['#' + en.target.id];
        if (chip) chip.classList.add('is-here');
      });
    }, { rootMargin: '0px 0px -85% 0px' });
    bands.forEach(function (b) { io.observe(b); });
  }

  /* ---------- keep the doors first under the lead (extras inserts photo 1 there on load) */
  window.addEventListener('load', function () {
    var b = document.querySelector('.gx-bridge'), p = document.querySelector('.gx-photo--1');
    if (b && p && p.nextElementSibling === b) b.parentNode.insertBefore(p, b.nextSibling);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
