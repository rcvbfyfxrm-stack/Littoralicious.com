/* ============================================================================
   TERROIR KIT — STRUCTURE / ENHANCE  [LOCKED 2026-07-09 — Flaner band taxonomy + interactive band-nav + inline make-or-break + inline gem callouts. Template-wide; do not change without an explicit unlock from Arnaud.]
   Re-sequences a guide into the reading spine Arnaud asked for, adds the "act"
   bands, clamps the intro behind a Read-more, lays dishes 2–3 to a row, and
   reveals the full table inventory. All progressive enhancement — if this file
   is absent the guide still reads top-to-bottom, just in source order.

   The spine:
     I   · THE PLACE          history · the right moment · what to eat & drink
     II  · WHERE TO EAT       the tables · the tiers · the dishes
     III · CALAS & THINGS TO DO   calas · walks · cafés to sit · culture · districts
     IV  · WHERE TO DRINK & HEAR  the wine/vermut bars · music
     V   · GO OUT             nightlife (only where it honestly exists)
     VI  · FAST & REAL        street food · the honest cheap eat · diaspora tables
     —   · BEFORE YOU GO      avoid · follow · seasonal · sources
   ========================================================================== */
(function () {
  'use strict';

  var RANK = {
    'DIV.etymon': 9,
    'DETAILS#story-box': 13.7,
    'DETAILS#quartiers': 35,
    'DETAILS#landmarks': 34.6,
    'DETAILS#hotel-bars': 40.7,
    'DETAILS#natural-wine': 40.3,
    'DETAILS#listening': 41.7,
    'DETAILS#around': 46,
    'DETAILS#provisioning': 37.5,
    'DETAILS#st-tropez': 44.5,
    'DETAILS#linger': 33,  // +terroir gold sections
    'DIV.lead': 1, 'DIV.funfact': 2, 'DIV.instructions': 3, 'DIV.alert': 4,
    'DIV#gx-search': 5, 'SECTION#soul': 6,
    // I — the place  (publish-terroir guides emit these as <details>, GOLD as <section>; map both)
    'SECTION#history': 10, 'DETAILS#history': 10, 'SECTION#why-now': 11, 'DETAILS#why-now': 11,
    'SECTION#eat': 12, 'DETAILS#eat': 12, 'SECTION#drink': 13, 'DETAILS#drink-place': 13,
    'SECTION#money-sits': 13.5, 'DETAILS#money-sits': 13.5,
    // II — where to eat
    'DETAILS#tables': 20, 'DETAILS#three-tables': 19.5, 'DETAILS#tables-extended': 22,
    'DETAILS#dish': 23, 'DETAILS#bougie': 24,
    // III — calas & things to do
    'SECTION#calas': 30, 'DETAILS#calas': 30, 'SECTION#walk': 31, 'DETAILS#walks': 32,
    'DETAILS#coffee-gardens': 32.5, 'DETAILS#coffee-scene': 32.8, 'DETAILS#rooftops': 32.7, 'DETAILS#work': 33, 'DETAILS#culture': 34, 'DETAILS#art': 34.5, 'SECTION#quartiers': 35,
    'DETAILS#secret-gems': 36, 'DETAILS#gastronomy': 37, 'DETAILS#curiosities': 38.7, 'DETAILS#twentyfour': 38, 'DETAILS#events': 38.5,
    // IV — drink & hear
    'DETAILS#drink': 40, 'DETAILS#bars': 40, 'DETAILS#music': 41, 'DETAILS#underground': 41.5,
    // V — go out
    'SECTION#nightlife': 45, 'DETAILS#nightlife': 45,
    // VI — fast & real
    'DETAILS#street-food': 50, 'DETAILS#burger-kebab': 51, 'DETAILS#ethnic-restaurants': 52,
    // before you go
    'SECTION#avoid': 60, 'DETAILS#avoid': 61, 'DETAILS#avoid-traps': 61.5, 'DETAILS#follow': 62,
    'DETAILS#seasonal': 63, 'DETAILS#sources': 64
  };

  var BANDS = {
    place:  ['', 'L\u2019\u00c2me du lieu', 'The soul, the terroir, when to come, what to eat & drink'],
    eat:    ['', 'Les Tables', 'The grandes and the petites \u2014 where the place actually eats'],
    do:     ['', 'Fl\u00e2ner', 'The squares, the walks, the good coffee, the gardens, the little beauties'],
    drink:  ['', 'Boire & sortir', 'The natural wine, the bars, the hi-fi, a drink in the grand hotels, the night'],
    around: ['', 'Autour', 'The nature and the villages worth the drive'],
    fast:   ['', 'Sur le pouce', 'The honest cheap plate, no ceremony'],
    close:  ['', 'Pratique', 'What to skip, who to follow, the calendar, the sources']
  };
  function actOf(rank) {
    if (rank >= 6 && rank < 19.5) return 'place';
    if (rank >= 19.5 && rank < 30) return 'eat';
    if (rank >= 30 && rank < 40) return 'do';
    if (rank >= 40 && rank < 45.5) return 'drink';
    if (rank >= 45.5 && rank < 50) return 'around';
    if (rank >= 50 && rank < 60) return 'fast';
    if (rank >= 60 && rank < 100) return 'close';
    return null;
  }
  function keyOf(el) {
    if (!el || el.nodeType !== 1) return null;
    if (el.id) return el.tagName + '#' + el.id;
    var cls = (el.className || '').toString().split(/\s+/)[0];
    return cls ? el.tagName + '.' + cls : null;
  }

  function container() {
    var lead = document.querySelector('.lead');
    return (lead && lead.parentNode) || document.querySelector('.container') || null;
  }

  /* ----- 1 · reorder + bands ----- */
  function reorder() {
    var box = container(); if (!box) return;
    var kids = Array.prototype.slice.call(box.children).filter(function (n) { return n.nodeType === 1 && !n.classList.contains('gx-band') && !n.classList.contains('band-nav'); });
    var ranked = kids.map(function (el, i) {
      var k = keyOf(el);
      var r = (k && RANK.hasOwnProperty(k)) ? RANK[k] : (200 + i);
      return { el: el, r: r, i: i };
    });
    ranked.sort(function (a, b) { return a.r - b.r || a.i - b.i; });
    box.querySelectorAll(':scope > .gx-band').forEach(function (b) { b.remove(); });
    var lastAct = null;
    ranked.forEach(function (item) {
      var act = actOf(item.r);
      if (act && act !== lastAct && BANDS[act]) {
        box.appendChild(makeBand(BANDS[act], act));
        lastAct = act;
      } else if (act) { lastAct = act; }
      box.appendChild(item.el);
    });
  }
  function makeBand(b, act) {
    var d = document.createElement('div');
    d.className = 'gx-band';
    if (act) d.id = 'band-' + act;
    d.innerHTML = (b[0] ? '<span class="gx-band__num">' + b[0] + '</span>' : '') +
      '<span class="gx-band__title">' + b[1] + '</span>' +
      '<span class="gx-band__sub">' + b[2] + '</span>';
    return d;
  }
  function bandNav() {
    var box = container(); if (!box || box.querySelector('.band-nav')) return;
    var bands = box.querySelectorAll(':scope > .gx-band');
    if (bands.length < 2) return;
    var nav = document.createElement('nav');
    nav.className = 'band-nav'; nav.setAttribute('aria-label', 'Sections of this guide');
    Array.prototype.forEach.call(bands, function (b) {
      var t = b.querySelector('.gx-band__title'); if (!t) return;
      var a = document.createElement('a');
      a.className = 'band-nav__chip'; a.href = '#' + b.id; a.textContent = t.textContent;
      a.addEventListener('click', function (e) { e.preventDefault(); b.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      nav.appendChild(a);
    });
    box.insertBefore(nav, box.firstChild);
  }

  /* ----- 2 · dish / small-card grids ----- */
  function grids() {
    ['dish', 'drink', 'bougie', 'work', 'coffee-gardens', 'secret-gems', 'street-food', 'burger-kebab', 'ethnic-restaurants']
      .forEach(function (id) {
        document.querySelectorAll('details#' + id).forEach(function (d) {
          d.setAttribute('data-grid', '');
        });
      });
  }

  /* ----- 3 · read-more on the intro ----- */
  function clampLead() {
    var lead = document.querySelector('.lead');
    if (!lead || lead.__clamped) return;
    if (lead.scrollHeight < 320) return;
    lead.__clamped = true;
    lead.classList.add('gx-clamp', 'is-clamped');
    var btn = document.createElement('button');
    btn.className = 'gx-more';
    btn.innerHTML = 'Read the rest <span class="gx-more__chev">▾</span>';
    lead.parentNode.insertBefore(btn, lead.nextSibling);
    btn.addEventListener('click', function () {
      var open = lead.classList.toggle('is-clamped') === false;
      btn.classList.toggle('is-open', open);
      btn.firstChild.textContent = open ? 'Show less ' : 'Read the rest ';
    });
  }

  /* ----- 4 · reveal the full inventory (renderer hides several/plenty) ----- */
  function revealInventory() {
    var tables = document.getElementById('tables');
    if (!tables) return;
    tables.querySelectorAll('.terroir-tier').forEach(function (t) { t.style.display = ''; });
    tables.querySelectorAll('.sfold__body > p').forEach(function (p) {
      if (/hidden lists|rendered into/i.test(p.textContent)) p.style.display = 'none';
    });
    var several = document.getElementById('terroir-list-several');
    if (several && several.parentNode && !(several.previousElementSibling && several.previousElementSibling.classList.contains('terroir-tier__cap'))) {
      var cap = document.createElement('div');
      cap.className = 'terroir-tier__cap'; cap.textContent = 'The full table';
      several.parentNode.insertBefore(cap, several);
    }
  }

  /* ----- 5 · etymology (only if the guide supplies one in data) ----- */
  function etymology() {
    if (document.querySelector('.gx-etymon')) return;
    var e = (window.TERROIR_DATA && window.TERROIR_DATA.ETYMOLOGY);
    if (!e) return;
    var div = document.createElement('div');
    div.className = 'gx-etymon';
    div.innerHTML = '<b>The name</b> <em>' + e + '</em>';
    var hero = document.querySelector('.hero');
    if (hero && hero.nextSibling) hero.parentNode.insertBefore(div, hero.nextSibling);
  }

  function clampSoul() {
    var soul = document.querySelector('.soul');
    if (!soul || soul.__clamped) return;
    if (soul.scrollHeight < 560) return;
    soul.__clamped = true;
    soul.classList.add('is-clamped');
    var btn = document.createElement('button');
    btn.className = 'gx-more';
    btn.innerHTML = 'Show more <span class="gx-more__chev">\u25be</span>';
    soul.parentNode.insertBefore(btn, soul.nextSibling);
    btn.addEventListener('click', function () {
      var open = soul.classList.toggle('is-clamped') === false;
      btn.classList.toggle('is-open', open);
      btn.firstChild.textContent = open ? 'Show less ' : 'Show more ';
    });
  }
  function boot() {
    grids();
    revealInventory();
    etymology();
    reorder();
    bandNav();
    setTimeout(clampLead, 60);
    setTimeout(clampSoul, 80);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
