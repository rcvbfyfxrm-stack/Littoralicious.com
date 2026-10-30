/* ============================================================================
   TERROIR KIT — SEARCH THIS GUIDE
   One search bar above Les Tables. Type anything — a name ("Field"), a type of
   restaurant ("seafood"), a dish ("goose"), a museum, a walk, a beer — and:
     · the table list narrows to the matching tables, empty lanes fold away;
     · everything else in the guide that matches (cards, la liste, food
       stories, whole sections) is listed under the bar, one tap to open it.
   Clear it and the guide is whole again.

   The chip row under the bar is the lane index of Les Tables: one chip per
   lane with its count. A chip jumps to its lane. While you read the tables
   the bar stays pinned under the chapter nav and the chip of the lane you are
   in lights up.

   Reads TERROIR_DATA (VENUES, CATEGORIES, CAT_LABELS) and the page as drawn.
   It never re-renders anything: it hides table cards and lists the rest, so
   the kit, the map, the favourites and the page's own tag filter stay as they
   are. When the organiser redraws the list (a ♡ re-rank), the filter re-applies.
   ========================================================================== */
(function () {
  'use strict';

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss').replace(/\s+/g, ' ').trim();
  }
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function txt(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

  var D, BYID = {}, OPTIONS = [], TOTAL = 0, bar, input, readout, hits, row, query = '', obs = null;
  var LANES = [], SPOTS = null, SHOW_ALL = false;

  function typeOf(v) {
    var out = [];
    (D.CATEGORIES || []).forEach(function (c) { if (c.key === v.category) out.push(c.label); });
    if (v.subcat) out.push(v.subcat);
    if (D.CAT_LABELS && D.CAT_LABELS[v.cat]) out.push(D.CAT_LABELS[v.cat]);
    return out;
  }

  function index() {
    var seenOpt = {};
    function opt(label, kind) {
      var k = norm(label);
      if (!k || k.length > 40 || seenOpt[k]) return;
      seenOpt[k] = true; OPTIONS.push({ label: String(label).trim(), kind: kind });
    }
    (D.VENUES || []).forEach(function (v) {
      var types = typeOf(v);
      var tags = (v.productTags || []).concat(v.tags || []);
      var dishes = (v.dishes || []).map(function (d) { return typeof d === 'string' ? d : (d && d.name) || ''; });
      BYID[v.id] = {
        name: norm(v.name + ' ' + (v.short || '')),
        hay: norm([v.name, v.short, v.neighborhood, v.address, v.signature, v.hook, v.why, v.person]
          .concat(types, tags, dishes).join(' | '))
      };
      opt(v.name, 'name');
      types.forEach(function (t) { opt(t, 'type'); });
      (v.productTags || []).forEach(function (t) { opt(t, 'tag'); });
    });
  }

  /* a card outside the dataset (a cala, a walk the ♡ layer tagged) is matched on its own words */
  function has(hay, q) { return q.split(' ').every(function (tok) { return hay.indexOf(tok) !== -1; }); }
  function matches(el, q) {
    var e = BYID[el.getAttribute('data-venue-id')];
    return has(e ? e.hay : norm(el.textContent), q);
  }

  /* the unit to hide for one venue, and the blocks that fold away when empty */
  function unitOf(el) { return el.closest('.gx-card') || el; }
  var BLOCKS = '.terroir-cat, .terroir-tier, .terroir-berths';

  /* ---------- the rest of the guide: every card a reader would look for, outside Les Tables.
     Read once, at the first search (the kit draws some of it after load). A reading lens
     (data-lens) is a second view of cards that are already here, so it is never searched. */
  var KINDS = [
    { sel: '.fcard, .tcard, .follow-card, .terroir-card[data-venue-id]', name: '.fcard__name, .tcard__name-text, .tcard__name, .handle, .tcm__name', one: 'place', many: 'places' },
    { sel: '.gx-liste > li', name: 'b', one: 'to try', many: 'to try' },
    { sel: '.gembox', name: '.gembox__name', one: 'story', many: 'stories' },
    { sel: 'details.sfold', name: '.sfold__title', one: 'section', many: 'sections', own: true }
  ];
  function spots() {
    if (SPOTS) return SPOTS;
    SPOTS = [];
    var tables = document.getElementById('tables');
    KINDS.forEach(function (k, ki) {
      all(k.sel).forEach(function (el) {
        if (el.closest('[data-lens], .gx-find') || (tables && (el === tables || tables.contains(el)))) return;
        if (ki === 0 && el.parentElement && el.parentElement.closest(KINDS[0].sel)) return;
        if (ki === 2 && el.closest(KINDS[0].sel)) return;
        var nm = el.querySelector(k.name), name = txt(nm) || txt(el).slice(0, 60);
        var body = k.own ? txt(el.querySelector('summary')) : txt(el);
        var fold = el.parentElement && el.parentElement.closest('details.sfold');
        SPOTS.push({ el: el, kind: ki, name: name, nname: norm(name), hay: norm(body).slice(0, 6000),
                     where: k.own ? '' : (ki === 1 ? 'La liste' : txt(fold && fold.querySelector('.sfold__title'))) });
      });
    });
    return SPOTS;
  }
  function find(q) {
    var out = [];
    spots().forEach(function (s) {
      if (!has(s.hay, q) && !has(s.nname, q)) return;
      out.push({ s: s, rank: has(s.nname, q) ? 0 : 1 });
    });
    out.sort(function (a, b) { return a.rank - b.rank || a.s.kind - b.s.kind; });
    return out.map(function (o) { return o.s; });
  }

  /* opening a result: lift the tag filter if it hides the card, open every fold on the way, land under the pinned bars */
  function reveal(el) {
    var hid = el.closest('[hidden]'), lifted = false;
    if (hid && !hid.closest('[data-lens]')) {
      var allChip = document.querySelector('.gx-tags [data-tag=""], .band-nav [data-tag=""]');
      if (allChip) { allChip.click(); lifted = true; }
    }
    for (var d = el; d; d = d.parentElement) if (d.tagName === 'DETAILS') d.open = true;
    /* the kit answers a fold's toggle (and the tag filter its reset) by scrolling: land after it has */
    setTimeout(function () {
      var tables = document.getElementById('tables'), inTables = tables && tables.contains(el);
      var y = el.getBoundingClientRect().top + window.pageYOffset - stackBottom(true) - (inTables ? stuckHeight() : 0) - 12;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      el.classList.add('gx-find-hit');
      setTimeout(function () { el.classList.remove('gx-find-hit'); }, 2400);
    }, lifted ? 450 : 120);
  }

  function drawHits(q, shown) {
    hits.textContent = '';
    if (!q) { hits.hidden = true; return []; }
    var found = find(q), n = SHOW_ALL ? found.length : Math.min(found.length, 8);
    var ol = document.createElement('ol');
    ol.className = 'gx-find__list';
    if (shown) {
      var li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.className = 'gx-find__hit gx-find__hit--tables';
      b.innerHTML = '<span class="gx-find__kind">Tables</span><span class="gx-find__name"></span><span class="gx-find__where">Les Tables, below</span>';
      b.querySelector('.gx-find__name').textContent = shown + (shown === 1 ? ' table matches' : ' tables match');
      b.addEventListener('click', function () {
        var first = all('#tables [data-venue-id]').filter(function (el) { return !unitOf(el).classList.contains('gx-find-off'); })[0];
        reveal(first || document.getElementById('tables'));
      });
      li.appendChild(b); ol.appendChild(li);
    }
    found.slice(0, n).forEach(function (s) {
      var li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.className = 'gx-find__hit';
      var k = document.createElement('span'), nm = document.createElement('span'), w = document.createElement('span');
      k.className = 'gx-find__kind'; k.textContent = KINDS[s.kind].one;
      nm.className = 'gx-find__name'; nm.textContent = s.name;
      w.className = 'gx-find__where'; w.textContent = s.where;
      b.appendChild(k); b.appendChild(nm); if (s.where) b.appendChild(w);
      b.addEventListener('click', function () { reveal(s.el); });
      li.appendChild(b); ol.appendChild(li);
    });
    hits.appendChild(ol);
    if (found.length > n) {
      var more = document.createElement('button');
      more.type = 'button'; more.className = 'gx-find__more';
      more.textContent = 'Show all ' + found.length;
      more.addEventListener('click', function () { SHOW_ALL = true; drawHits(norm(query), shown); });
      hits.appendChild(more);
    }
    hits.hidden = !ol.children.length;
    return found;
  }

  function apply() {
    var tables = document.getElementById('tables');
    if (!tables) return;
    var q = norm(query), shown = 0, seen = {};
    all('[data-venue-id]', tables).forEach(function (el) {
      var id = el.getAttribute('data-venue-id'), ok = !q || matches(el, q), u = unitOf(el);
      u.classList.toggle('gx-find-off', !ok);
      if (ok && BYID[id] && !seen[id]) { seen[id] = true; shown++; }
    });
    all(BLOCKS, tables).forEach(function (b) {
      var any = all('[data-venue-id]', b).some(function (el) { return !unitOf(el).classList.contains('gx-find-off'); });
      b.classList.toggle('gx-find-off', !!q && !any);
    });
    /* a group title stands for the lanes after it, up to the next group */
    all('.terroir-group', tables).forEach(function (g) {
      var any = false, n = g.nextElementSibling;
      while (n && !n.classList.contains('terroir-group')) {
        if (n.matches(BLOCKS) && !n.classList.contains('gx-find-off')) { any = true; break; }
        n = n.nextElementSibling;
      }
      g.classList.toggle('gx-find-off', !!q && !any);
    });
    tables.classList.toggle('gx-find-on', !!q);
    bar.classList.toggle('has-query', !!q);
    countLanes();
    var found = drawHits(q, shown);
    if (!q) { readout.textContent = TOTAL + ' tables, and the whole guide — search a name, a dish, a type of place'; return; }
    var parts = [], by = {};
    if (shown) parts.push(shown + (shown === 1 ? ' table' : ' tables'));
    found.forEach(function (s) { by[s.kind] = (by[s.kind] || 0) + 1; });
    KINDS.forEach(function (k, i) { if (by[i]) parts.push(by[i] + ' ' + (by[i] === 1 ? k.one : k.many)); });
    readout.textContent = parts.length
      ? parts.join(' · ') + ' — “' + query.trim() + '”'
      : 'Nothing matches “' + query.trim() + '” — try part of a name, a dish or a type of place';
  }

  function set(v, reveal) {
    query = v; SHOW_ALL = false; apply();
    var tables = document.getElementById('tables');
    if (norm(v) && tables && tables.tagName === 'DETAILS' && !tables.open) tables.open = true;
    if (reveal && tables) bar.scrollIntoView({ block: 'start', behavior: 'smooth' });
    pin();
  }

  /* ---------- the lane index: the lanes as drawn, in page order, under their group titles */
  function lanes(tables) {
    var lab = {};
    (D.CATEGORIES || []).forEach(function (c) { lab['cat-' + c.key] = c.label; });
    var out = [], group = '';
    all('.terroir-group, .terroir-cat', tables).forEach(function (el) {
      if (el.classList.contains('terroir-group')) { group = txt(el.querySelector('.terroir-group__title')); return; }
      if (!el.id || !el.querySelector('[data-venue-id]')) return;
      out.push({ el: el, group: group, label: lab[el.id] || txt(el.querySelector('.terroir-cat__title')) });
    });
    return out;
  }
  function countLanes() {
    LANES.forEach(function (l) {
      var ids = {};
      all('[data-venue-id]', l.el).forEach(function (el) {
        if (!unitOf(el).classList.contains('gx-find-off')) ids[el.getAttribute('data-venue-id')] = 1;
      });
      var n = Object.keys(ids).length;
      l.n.textContent = n;
      l.chip.disabled = !n;
    });
  }
  function jump(l) {
    var tables = document.getElementById('tables');
    if (tables && tables.tagName === 'DETAILS' && !tables.open) tables.open = true;
    setTimeout(function () {
      var y = l.el.getBoundingClientRect().top + window.pageYOffset - stackBottom(true) - stuckHeight() - 8;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }, 60);
  }

  /* ---------- pinned while reading the tables: under the chapter nav (and the tag readout, when shown) */
  /* the bar's height once it is pinned and compact, measured without a paint */
  function stuckHeight() {
    if (!LANES.length) return 0;
    var p = bar.classList.contains('is-pinned'), k = bar.classList.contains('is-stuck');
    bar.classList.add('is-pinned', 'is-stuck');
    var h = bar.offsetHeight;
    bar.classList.toggle('is-pinned', p); bar.classList.toggle('is-stuck', k);
    return h;
  }
  /* now: what is stuck at the top this instant; ahead: what will be once the page has scrolled there */
  function stackBottom(ahead) {
    var b = 0;
    all('.band-nav, .gx-readout').forEach(function (el) {
      if (el.hidden || !el.offsetHeight) return;
      var pos = getComputedStyle(el).position;
      if (pos !== 'sticky' && pos !== 'fixed') return;
      if (ahead) { b += el.offsetHeight; return; }
      var r = el.getBoundingClientRect();
      if (r.top <= 1 + b && r.bottom > b) b = r.bottom;
    });
    return b;
  }
  var ticking = false;
  function pin() {
    var tables = document.getElementById('tables');
    if (!tables || !bar) return;
    var top = stackBottom(), open = tables.tagName !== 'DETAILS' || tables.open;
    var tb = tables.getBoundingClientRect();
    var on = open && LANES.length && tb.bottom > top + bar.offsetHeight + 120;
    bar.style.setProperty('--gx-find-top', top + 'px');
    bar.classList.toggle('is-pinned', !!on);
    var stuck = on && bar.getBoundingClientRect().top <= top + 1 && tb.top < top + bar.offsetHeight;
    bar.classList.toggle('is-stuck', !!stuck);
    /* the lane you are in: the last one whose head has passed under the bar */
    var line = top + (stuck ? bar.offsetHeight : 0) + 24, here = null;
    if (stuck) LANES.forEach(function (l) {
      if (!l.el.classList.contains('gx-find-off') && l.el.getBoundingClientRect().top <= line) here = l;
    });
    LANES.forEach(function (l) {
      var is = l === here;
      if (is !== l.chip.classList.contains('is-here')) {
        l.chip.classList.toggle('is-here', is);
        if (is) {
          var c = l.chip, r = row;
          r.scrollLeft = Math.max(0, c.offsetLeft - r.offsetLeft - (r.clientWidth - c.offsetWidth) / 2);
        }
      }
    });
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; pin(); });
  }

  function build(tables) {
    bar = document.createElement('div');
    bar.className = 'gx-find';
    bar.setAttribute('role', 'search');
    var id = 'gx-find-list';
    bar.innerHTML =
      '<label class="gx-find__label" for="gx-find-q">Search this guide</label>' +
      '<div class="gx-find__bar">' +
        '<input id="gx-find-q" class="gx-find__input" type="search" autocomplete="off" spellcheck="false" list="' + id + '" ' +
          'placeholder="A table, a dish, a museum, a walk…" aria-describedby="gx-find-out">' +
        '<button type="button" class="gx-find__clear" aria-label="Clear the search">×</button>' +
      '</div>' +
      '<datalist id="' + id + '"></datalist>' +
      '<p id="gx-find-out" class="gx-find__out" aria-live="polite"></p>' +
      '<div class="gx-find__hits" hidden></div>' +
      '<nav class="gx-find__types" aria-label="The lanes of Les Tables"></nav>';
    input = bar.querySelector('.gx-find__input');
    readout = bar.querySelector('.gx-find__out');
    hits = bar.querySelector('.gx-find__hits');

    var dl = bar.querySelector('datalist');
    OPTIONS.forEach(function (o) {
      var op = document.createElement('option');
      op.value = o.label; op.label = o.kind === 'name' ? 'Name' : o.kind === 'type' ? 'Type' : 'Tag';
      dl.appendChild(op);
    });

    /* the lanes ARE the types of restaurant: one chip each, with its count; a chip jumps to its lane */
    row = bar.querySelector('.gx-find__types');
    LANES = lanes(tables);
    var lastGroup = '';
    LANES.forEach(function (l) {
      if (l.group && l.group !== lastGroup) {
        var g = document.createElement('span');
        g.className = 'gx-find__grp'; g.textContent = l.group;
        row.appendChild(g); lastGroup = l.group;
      }
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'gx-find__type';
      b.textContent = l.label;
      l.n = document.createElement('span'); l.n.className = 'gx-find__n';
      b.appendChild(l.n);
      b.addEventListener('click', function () { jump(l); });
      l.chip = b;
      row.appendChild(b);
    });
    if (!LANES.length) { row.remove(); row = null; }

    input.addEventListener('input', function () { set(input.value, false); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; set('', false); }
    });
    bar.querySelector('.gx-find__clear').addEventListener('click', function () {
      input.value = ''; set('', false); input.focus();
    });

    anchor();
  }

  /* the kit re-sorts the page's sections after load and would carry an unknown block to the
     tail: keep the bar pinned directly above #tables for the first seconds, then let go */
  function anchor() {
    var tables = document.getElementById('tables');
    if (tables && tables.parentNode && bar.nextElementSibling !== tables) tables.parentNode.insertBefore(bar, tables);
  }
  function hold() {
    var moves = 0, mo = new MutationObserver(function () {
      var t = document.getElementById('tables');
      if (t && bar.nextElementSibling !== t && moves++ < 40) anchor();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); anchor(); }, 10000);
    window.addEventListener('load', anchor);
  }

  function watch(tables) {
    var body = tables.querySelector('.sfold__body') || tables;
    obs = new MutationObserver(function () { if (query) { obs.disconnect(); apply(); obs.observe(body, { childList: true, subtree: true }); } });
    obs.observe(body, { childList: true, subtree: true });
  }

  function boot(tries) {
    D = window.TERROIR_DATA;
    var tables = document.getElementById('tables');
    if (!D || !tables || !tables.querySelector('[data-venue-id]')) {
      if ((tries || 0) < 80) setTimeout(function () { boot((tries || 0) + 1); }, 100);
      return;
    }
    if (document.querySelector('.gx-find')) return;
    index();
    TOTAL = (D.VENUES || []).filter(function (v) { return tables.querySelector('[data-venue-id="' + v.id + '"]'); }).length;
    build(tables);
    watch(tables);
    hold();
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    tables.addEventListener('toggle', onScroll);
    pin();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { boot(0); });
  else boot(0);
})();
