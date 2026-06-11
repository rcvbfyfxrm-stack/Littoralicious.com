/* ============================================================================
   TERROIR KIT — SEARCH
   One bar above the guide. Type "coffee", "wine bar", "cala", "music",
   "where to eat late", "art" — the best place surfaces, you click, the guide
   unfolds to it, the map flies there, the pin glows.

   Indexes everything the guide knows: the VENUES dataset (TERROIR_DATA) plus
   every .tcard in the extended sections (dishes, drinks, culture, music,
   walks, cafés, calas, street food …) and the NEIGHBORHOODS / WALKS / LANDMARKS
   geo arrays. Intent keywords map plain words to the right category, so a
   reader never has to know the section names.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- intent: plain words -> category buckets ---------- */
  var INTENT = [
    ['coffee',  ['coffee','café','cafe','espresso','flat white','cortado','brunch','breakfast','tea','matcha','chill','sit','work','wifi','garden','terrace']],
    ['wine',    ['wine','vermut','vermouth','bar','drink','cocktail','cava','beer','aperitif','natural wine','bodega','cellar','vineyard','winery']],
    ['eat',     ['eat','restaurant','dinner','lunch','table','seafood','fish','paella','rice','tapas','michelin','fine dining','meat','grill','tasting']],
    ['cala',    ['beach','cala','cove','swim','sea','snorkel','sand','pebble','bathe','dip']],
    ['walk',    ['walk','hike','path','trail','viewpoint','view','lighthouse','sunset','sunrise','ramble','stroll']],
    ['music',   ['music','club','night','nightlife','electronic','dj','live','concert','dance','party','techno','jazz','hi-fi','vinyl']],
    ['culture', ['culture','museum','art','church','cathedral','gallery','history','monument','heritage','unesco','castle','ruins']],
    ['market',  ['market','produce','grocer','stall','farmers','deli']],
    ['fast',    ['fast','cheap','street','kebab','burger','pizza','quick','snack','takeaway','bite']]
  ];
  // category bucket -> the section ids / venue-cat / tcard-type tokens that satisfy it
  var BUCKET_MATCH = {
    coffee:  ['work','cafe','coffee','secret-gems','garden'],
    wine:    ['drink','bar','wine','bacaro','vermut','bougie'],
    eat:     ['tables','dish','restaurant','michelin','bougie','berth','shop','seafood'],
    cala:    ['cala','calas','beach','walk'],
    walk:    ['walk','walks','landmark'],
    music:   ['music','nightlife'],
    culture: ['culture','landmark','neighborhood'],
    market:  ['market','gastronomy','produce','shop'],
    fast:    ['street-food','streetfood','burger','burger-kebab','ethnic','ethnic-restaurants']
  };

  function norm(s) { return (s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  /* ---------- build the index ---------- */
  var INDEX = [];
  function pushEntry(e) {
    if (!e.id || !e.name) return;
    e.hay = norm([e.name, e.section, e.cat, e.why, (e.tags || []).join(' '), (e.keywords || []).join(' ')].join(' '));
    INDEX.push(e);
  }
  function buildIndex() {
    INDEX = [];
    var seen = {};
    var data = window.TERROIR_DATA || {};

    // 1) venues dataset (richest meta)
    (data.VENUES || []).forEach(function (v) {
      seen['venue-' + v.id] = true;
      pushEntry({
        id: v.id, name: v.name, section: 'Tables', cat: (v.cat || '') + ' ' + (v.tier || ''),
        why: v.why || '', tags: (v.productTags || []).concat(v.tags || []),
        href: '#venue-' + v.id, kind: 'venue'
      });
    });

    // 2) every extended .tcard on the page
    document.querySelectorAll('.tcard[id]').forEach(function (card) {
      var id = card.id;
      var vid = card.getAttribute('data-venue-id') || id;
      if (seen['venue-' + vid]) return;
      var nameEl = card.querySelector('.tcard__name-text');
      var typeEl = card.querySelector('.tcard__type, .tcard__label');
      var hookEl = card.querySelector('.tcard__hook');
      var sec = card.closest('details[id], section[id]');
      var secTitle = sec ? (sec.querySelector('.sfold__title, .overline') || {}).textContent : '';
      pushEntry({
        id: vid, name: (nameEl ? nameEl.textContent : id).trim(),
        section: (secTitle || '').trim(), cat: (sec ? sec.id : '') + ' ' + (typeEl ? typeEl.textContent : ''),
        why: hookEl ? hookEl.textContent : '', href: '#' + id, kind: 'card'
      });
    });

    // 3) geo arrays that aren't venues (neighborhoods / walks / landmarks)
    [['NEIGHBORHOODS', 'Neighborhood', 'neighborhood'],
     ['WALKS', 'Walk', 'walk'],
     ['LANDMARKS', 'Landmark', 'landmark']].forEach(function (t) {
      (data[t[0]] || []).forEach(function (g) {
        if (!g || !g.id) return;
        if (document.getElementById(g.id) || document.querySelector('[data-pin="' + g.id + '"]')) {
          pushEntry({ id: g.id, name: g.name, section: t[1], cat: t[2], href: '#' + g.id, kind: t[2] });
        }
      });
    });
  }

  /* ---------- scoring ---------- */
  function buckets(q) {
    var b = [];
    INTENT.forEach(function (pair) {
      pair[1].forEach(function (w) { if (q.indexOf(w) !== -1 && b.indexOf(pair[0]) === -1) b.push(pair[0]); });
    });
    return b;
  }
  function score(entry, q, qBuckets) {
    var s = 0;
    var name = norm(entry.name);
    if (name === q) s += 60;
    else if (name.indexOf(q) === 0) s += 38;
    else if (name.indexOf(q) !== -1) s += 24;
    q.split(/\s+/).filter(Boolean).forEach(function (tok) {
      if (tok.length < 2) return;
      if (name.indexOf(tok) !== -1) s += 12;
      else if (entry.hay.indexOf(tok) !== -1) s += 4;
    });
    qBuckets.forEach(function (bk) {
      var toks = BUCKET_MATCH[bk] || [];
      var catHay = norm((entry.cat || '') + ' ' + (entry.section || '') + ' ' + entry.kind);
      if (toks.some(function (t) { return catHay.indexOf(t) !== -1; })) s += 18;
    });
    if (window.TerroirFav && window.TerroirFav.publicCount(entry.id) > 0) s += 2;
    return s;
  }

  function search(raw) {
    var q = norm(raw).trim();
    if (!q) return [];
    var qBuckets = buckets(q);
    return INDEX
      .map(function (e) { return { e: e, s: score(e, q, qBuckets) }; })
      .filter(function (x) { return x.s > 6; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 10)
      .map(function (x) { return x.e; });
  }
  function byCategory(bucket) {
    var toks = BUCKET_MATCH[bucket] || [];
    return INDEX.filter(function (e) {
      var catHay = norm((e.cat || '') + ' ' + (e.section || '') + ' ' + e.kind);
      return toks.some(function (t) { return catHay.indexOf(t) !== -1; });
    }).sort(function (a, b) {
      var la = (window.TerroirFav ? window.TerroirFav.publicCount(a.id) : 0);
      var lb = (window.TerroirFav ? window.TerroirFav.publicCount(b.id) : 0);
      return lb - la;
    }).slice(0, 12);
  }

  /* ---------- UI ---------- */
  var root, input, results, chipsRow, activeChip = null;
  var CHIPS = [
    ['Coffee & gardens', 'coffee'], ['Wine & vermut', 'wine'], ['Where to eat', 'eat'],
    ['Calas & beaches', 'cala'], ['Walks & views', 'walk'], ['Music & night', 'music'],
    ['Culture & art', 'culture'], ['Markets', 'market'], ['Fast & real', 'fast']
  ];

  function build() {
    root = document.getElementById('gx-search');
    if (!root) {
      root = document.createElement('div');
      root.id = 'gx-search';
      var lead = document.querySelector('.instructions') || document.querySelector('.lead');
      if (lead && lead.parentNode) lead.parentNode.insertBefore(root, lead.nextSibling);
      else document.body.insertBefore(root, document.body.firstChild);
    }
    root.className = 'gx-search';
    root.innerHTML =
      '<div class="gx-search__bar">' +
        '<span class="gx-search__icon">⌕</span>' +
        '<input class="gx-search__input" type="search" autocomplete="off" ' +
          'placeholder="What are you after? — coffee, a cala, wine, music, art…" aria-label="Search this guide">' +
        '<button class="gx-search__clear" aria-label="Clear">×</button>' +
      '</div>' +
      '<div class="gx-search__chips"></div>' +
      '<div class="gx-results"><div class="gx-results__head"></div><div class="gx-results__list"></div></div>';

    // stick just below the (also-sticky) quicknav so they never overlap
    var qn = document.querySelector('.quicknav');
    if (qn) { try { root.style.top = qn.offsetHeight + 'px'; } catch (e) {} }

    input    = root.querySelector('.gx-search__input');
    results  = root.querySelector('.gx-results__list');
    chipsRow = root.querySelector('.gx-search__chips');
    var head = root.querySelector('.gx-results__head');
    var clear = root.querySelector('.gx-search__clear');

    CHIPS.forEach(function (c) {
      var chip = document.createElement('button');
      chip.className = 'gx-chip'; chip.type = 'button';
      chip.textContent = c[0]; chip.setAttribute('data-bucket', c[1]);
      chip.addEventListener('click', function () { runChip(chip, c[0], c[1]); });
      chipsRow.appendChild(chip);
    });
    var love = document.createElement('button');
    love.className = 'gx-chip gx-chip--love'; love.type = 'button';
    love.textContent = '♥ Most loved';
    love.addEventListener('click', function () { runLoved(love); });
    chipsRow.appendChild(love);

    input.addEventListener('input', function () {
      setActiveChip(null);
      root.classList.toggle('has-query', !!input.value.trim());
      render(search(input.value), input.value.trim() ? 'Best matches' : '');
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var first = results.querySelector('.gx-hit'); if (first) first.click(); }
      if (e.key === 'Escape') { input.value = ''; root.classList.remove('has-query', 'has-results'); }
    });
    clear.addEventListener('click', function () {
      input.value = ''; setActiveChip(null);
      root.classList.remove('has-query', 'has-results'); input.focus();
    });

    function runChip(chip, label, bucket) {
      input.value = '';
      if (activeChip === chip) { setActiveChip(null); root.classList.remove('has-results'); return; }
      setActiveChip(chip);
      render(byCategory(bucket), label);
    }
    function runLoved(chip) {
      input.value = '';
      if (activeChip === chip) { setActiveChip(null); root.classList.remove('has-results'); return; }
      setActiveChip(chip);
      var ids = window.TerroirFav ? window.TerroirFav.mostLoved(12) : [];
      var list = ids.map(function (id) { return INDEX.find(function (e) { return e.id === id; }); }).filter(Boolean);
      render(list, list.length ? 'Most loved in this guide' : '');
      if (!list.length) head.textContent = 'No loves yet — be the first to tap a ♡';
    }
    function setActiveChip(chip) {
      if (activeChip) activeChip.classList.remove('is-active');
      activeChip = chip;
      if (chip) chip.classList.add('is-active');
    }
    function render(list, headline) {
      head.textContent = headline || '';
      if (!list.length) {
        results.innerHTML = '<div class="gx-results__empty">Nothing matched — try a plainer word (coffee, beach, wine, art).</div>';
        root.classList.add('has-results'); return;
      }
      results.innerHTML = list.map(function (e) {
        var loved = window.TerroirFav && window.TerroirFav.publicCount(e.id) > 0
          ? '<span class="gx-hit__love">♥ ' + window.TerroirFav.publicCount(e.id) + '</span>' : '';
        return '<button class="gx-hit" data-href="' + e.href + '" data-id="' + e.id + '">' +
          '<span class="gx-hit__meta">' + escapeHTML(e.section || e.kind) + loved + '</span>' +
          '<span class="gx-hit__name">' + escapeHTML(e.name) + '</span>' +
          (e.why ? '<span class="gx-hit__why">' + escapeHTML(e.why) + '</span>' : '') +
        '</button>';
      }).join('');
      results.querySelectorAll('.gx-hit').forEach(function (hit) {
        hit.addEventListener('click', function () { go(hit.getAttribute('data-href'), hit.getAttribute('data-id')); });
      });
      root.classList.add('has-results');
    }
    window.__gxSearchRender = render;
  }

  function go(href, id) {
    var el = href && document.querySelector(href);
    if (!el) {
      if (window.TerroirMap && id) window.TerroirMap.focus(id, true);
      return;
    }
    var det = el.closest('details'); if (det && !det.open) det.open = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('is-hover');
    setTimeout(function () { el.classList.remove('is-hover'); }, 1800);
    if (window.TerroirMap) window.TerroirMap.focus(id, true);
  }

  function escapeHTML(s) { return (s || '').replace(/[&<>"']/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  function boot() {
    buildIndex();
    build();
    setTimeout(buildIndex, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
