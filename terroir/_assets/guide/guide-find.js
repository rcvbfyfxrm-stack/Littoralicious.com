/* ============================================================================
   TERROIR KIT — FIND A TABLE
   One search bar above Les Tables. Type a name ("Field"), a type of
   restaurant ("seafood", "street food", "breakfast") or a tag ("michelin",
   "tasting menu") and the table list narrows to the matches, empty lanes fold
   away. Clear it and the guide is whole again.

   Reads only TERROIR_DATA (VENUES, CATEGORIES, CAT_LABELS) and the cards the
   organiser has already drawn inside #tables. It never re-renders anything:
   it hides cards, so the kit, the map and the favourites stay as they are.
   When the organiser redraws the list (a ♡ re-rank), the filter re-applies.
   ========================================================================== */
(function () {
  'use strict';

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  }
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var D, BYID = {}, OPTIONS = [], TOTAL = 0, bar, input, readout, query = '', obs = null;

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
      BYID[v.id] = {
        name: norm(v.name + ' ' + (v.short || '')),
        hay: norm([v.name, v.short].concat(types, tags).join(' | '))
      };
      opt(v.name, 'name');
      types.forEach(function (t) { opt(t, 'type'); });
      (v.productTags || []).forEach(function (t) { opt(t, 'tag'); });
    });
  }

  /* a card outside the dataset (a cala, a walk the ♡ layer tagged) is matched on its own words */
  function matches(el, q) {
    var e = BYID[el.getAttribute('data-venue-id')];
    var hay = e ? e.hay : norm(el.textContent);
    return q.split(' ').every(function (tok) { return hay.indexOf(tok) !== -1; });
  }

  /* the unit to hide for one venue, and the blocks that fold away when empty */
  function unitOf(el) { return el.closest('.gx-card') || el; }
  var BLOCKS = '.terroir-cat, .terroir-tier, .terroir-berths';

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
    if (!q) { readout.textContent = TOTAL + ' tables — search by name, type of restaurant or tag'; return; }
    readout.textContent = shown
      ? shown + ' of ' + TOTAL + (shown === 1 ? ' table matches' : ' tables match') + ' “' + query.trim() + '”'
      : 'Nothing matches “' + query.trim() + '” — try a type of restaurant, or part of a name';
  }

  function set(v, reveal) {
    query = v; apply();
    var tables = document.getElementById('tables');
    if (norm(v) && tables && tables.tagName === 'DETAILS' && !tables.open) tables.open = true;
    if (reveal && tables) bar.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function build(tables) {
    bar = document.createElement('div');
    bar.className = 'gx-find';
    bar.setAttribute('role', 'search');
    var id = 'gx-find-list';
    bar.innerHTML =
      '<label class="gx-find__label" for="gx-find-q">Find a table</label>' +
      '<div class="gx-find__bar">' +
        '<input id="gx-find-q" class="gx-find__input" type="search" autocomplete="off" spellcheck="false" list="' + id + '" ' +
          'placeholder="A name, a type of restaurant, a tag…" aria-describedby="gx-find-out">' +
        '<button type="button" class="gx-find__clear" aria-label="Clear the search">×</button>' +
      '</div>' +
      '<datalist id="' + id + '"></datalist>' +
      '<div class="gx-find__types" aria-label="Types of restaurant"></div>' +
      '<p id="gx-find-out" class="gx-find__out" aria-live="polite"></p>';
    input = bar.querySelector('.gx-find__input');
    readout = bar.querySelector('.gx-find__out');

    var dl = bar.querySelector('datalist');
    OPTIONS.forEach(function (o) {
      var op = document.createElement('option');
      op.value = o.label; op.label = o.kind === 'name' ? 'Name' : o.kind === 'type' ? 'Type' : 'Tag';
      dl.appendChild(op);
    });

    /* the lanes ARE the types of restaurant: one chip each, when the guide has lanes */
    var row = bar.querySelector('.gx-find__types');
    (D.CATEGORIES || []).forEach(function (c) {
      if (!(D.VENUES || []).some(function (v) { return v.category === c.key; })) return;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'gx-find__type'; b.textContent = c.label;
      b.addEventListener('click', function () {
        var on = norm(input.value) === norm(c.label);
        input.value = on ? '' : c.label; set(input.value, false);
      });
      row.appendChild(b);
    });
    if (!row.children.length) row.remove();

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

  function markChips() {
    all('.gx-find__type', bar).forEach(function (b) {
      b.classList.toggle('is-on', !!query && norm(b.textContent) === norm(query));
    });
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
    input.addEventListener('input', markChips);
    bar.addEventListener('click', function () { setTimeout(markChips, 0); });
    watch(tables);
    hold();
    apply();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { boot(0); });
  else boot(0);
})();
