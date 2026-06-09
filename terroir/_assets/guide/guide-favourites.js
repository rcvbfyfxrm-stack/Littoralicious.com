/* ============================================================================
   TERROIR KIT — FAVOURITES  (supersedes votes.js)
   One heart, two jobs:
     • PERSONAL  — a private "My favourites" tray, saved to localStorage,
                   works fully offline, survives across the whole guide.
     • PUBLIC    — a monotonic "loved" count in Firestore (terroir_loves/<slug>),
                   one love per browser per place, so each guide can show its
                   "most-loved" places to everyone. Graceful: if Firestore is
                   blocked, counts stay client-side and nothing breaks.

   Decorates BOTH card systems:
     .terroir-card / .terroir-berth  (the inventory, built by guide-render.js)
     .tcard                          (the static extended sections)
   Re-decorates automatically if guide-render.js re-renders the inventory.

   Public surface (window.TerroirFav): isLoved(id), publicCount(id),
   mostLoved(n), favourites(), onChange(fn).
   ========================================================================== */
(function () {
  'use strict';
  var CFG  = window.TERROIR_CONFIG || {};
  var SLUG = CFG.articleId || 'terroir-default';
  var FAV_KEY  = 'terroir-fav:' + SLUG;        // personal tray  {id:{name,section,href,ts}}
  var ONCE_KEY = 'terroir-loved-once:' + SLUG; // ids ever loved (monotonic public guard)
  var COL = 'terroir_loves';

  /* ---------- firebase (idempotent; same project as votes.js) ---------- */
  var firebaseConfig = {
    apiKey: 'AIzaSyBIbFq4FtYsoz3_GAoQaJAOynaaouooYFE',
    authDomain: 'littoralicious-web-eceed.firebaseapp.com',
    projectId: 'littoralicious-web-eceed',
    storageBucket: 'littoralicious-web-eceed.firebasestorage.app',
    messagingSenderId: '1024688297116',
    appId: '1:1024688297116:web:e208f3c7f71019268ec959'
  };
  var db = null;
  function ensureDb() {
    if (db) return db;
    try {
      if (typeof firebase === 'undefined') return null;
      if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      return db;
    } catch (e) { return null; }
  }

  /* ---------- state ---------- */
  function readJSON(k, d) { try { return JSON.parse(localStorage.getItem(k) || d); } catch (e) { return JSON.parse(d); } }
  function writeJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var favs   = readJSON(FAV_KEY, '{}');   // personal
  var once   = readJSON(ONCE_KEY, '{}');  // public-guard
  var counts = {};                        // id -> public count
  var listeners = [];
  function notify() { listeners.forEach(function (f) { try { f(); } catch (e) {} }); }

  var esc = function (s) { return (s || '').replace(/[&<>"']/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };

  /* ---------- card meta extraction (handles both card systems) ---------- */
  function cardId(card) {
    return card.getAttribute('data-venue-id') ||
           (card.id || '').replace(/^venue-/, '') || '';
  }
  function cardName(card) {
    var n = card.querySelector('.tcard__name-text, .terroir-card__name, .terroir-berth__name');
    if (n) return n.textContent.replace(/\s+/g, ' ').trim();
    return (card.getAttribute('data-name') || cardId(card)).trim();
  }
  function cardHref(card) {
    if (card.id) return '#' + card.id;
    var id = cardId(card);
    return id ? '#venue-' + id : '';
  }
  function cardSection(card) {
    var sec = card.closest('section[id], details[id]');
    if (!sec) return '';
    var t = sec.querySelector('.sfold__title, .overline');
    return t ? t.textContent.replace(/\s+/g, ' ').trim() : (sec.id || '');
  }

  /* ---------- decoration ---------- */
  function decorate(card) {
    if (!card || card.__gxFav) return;
    var id = cardId(card);
    if (!id) return;
    card.__gxFav = true;
    card.classList.add('gx-favable');

    var btn = document.createElement('button');
    btn.className = 'gx-fav';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Save to favourites');
    btn.setAttribute('data-fav-id', id);
    btn.innerHTML = '<span class="gx-fav__heart">' + (favs[id] ? '♥' : '♡') +
                    '</span><span class="gx-fav__count"></span>';
    if (favs[id]) btn.classList.add('is-loved');
    card.appendChild(btn);
    refreshCount(card, id);
  }

  function refreshCount(card, id) {
    var c = counts[id] || 0;
    var el = card.querySelector('.gx-fav__count');
    if (el) {
      el.textContent = c > 0 ? (c + (c === 1 ? ' love' : ' loves')) : '';
      if (c > 0) el.setAttribute('data-has', '1'); else el.removeAttribute('data-has');
    }
  }

  function decorateAll() {
    document.querySelectorAll(
      '.tcard[data-venue-id], .terroir-card[data-venue-id], .terroir-berth[data-venue-id]'
    ).forEach(decorate);
    applyMostLoved();
  }

  /* ---------- toggle a love ---------- */
  function toggle(id, card, btnEl) {
    var nowLoved = !favs[id];
    if (nowLoved) {
      favs[id] = { name: cardName(card), section: cardSection(card), href: cardHref(card), ts: idStamp() };
    } else {
      delete favs[id];
    }
    writeJSON(FAV_KEY, favs);

    // public: increment once, ever, per browser (monotonic — "loves" never go down)
    if (nowLoved && !once[id]) {
      once[id] = 1; writeJSON(ONCE_KEY, once);
      counts[id] = (counts[id] || 0) + 1;
      pushLove(id);
    }
    // reflect on every instance of this id (a venue may appear twice)
    document.querySelectorAll('.gx-fav[data-fav-id="' + cssEsc(id) + '"]').forEach(function (b) {
      var h = b.querySelector('.gx-fav__heart');
      if (nowLoved) { b.classList.add('is-loved', 'just-loved'); if (h) h.textContent = '♥'; }
      else          { b.classList.remove('is-loved'); if (h) h.textContent = '♡'; }
      setTimeout(function () { b.classList.remove('just-loved'); }, 360);
      var cardOf = b.closest('[data-venue-id]'); if (cardOf) refreshCount(cardOf, id);
    });
    renderFab(); renderTray(); applyMostLoved(); notify();
  }

  // ts without Date.now (kept monotonic-enough via a counter + perf clock)
  var _seq = 0;
  function idStamp() { _seq += 1; return (Math.round((window.performance && performance.now ? performance.now() : 0)) * 1000) + _seq; }
  function cssEsc(s) { return String(s).replace(/"/g, '\\"'); }

  function pushLove(id) {
    var fdb = ensureDb(); if (!fdb) return;
    try {
      var ref = fdb.collection(COL).doc(SLUG);
      var upd = {}; upd[id] = firebase.firestore.FieldValue.increment(1);
      ref.set(upd, { merge: true }).catch(function () {});
    } catch (e) {}
  }

  function loadCounts() {
    var fdb = ensureDb();
    if (!fdb) { applyMostLoved(); return; }
    try {
      fdb.collection(COL).doc(SLUG).get().then(function (snap) {
        var data = (snap && snap.data && snap.data()) || {};
        Object.keys(data).forEach(function (k) {
          if (typeof data[k] === 'number') counts[k] = data[k];
        });
        document.querySelectorAll('[data-venue-id]').forEach(function (card) {
          refreshCount(card, cardId(card));
        });
        applyMostLoved(); renderTray(); notify();
      }).catch(function () { applyMostLoved(); });
    } catch (e) { applyMostLoved(); }
  }

  /* ---------- most-loved ribbons ---------- */
  function mostLoved(n) {
    return Object.keys(counts)
      .filter(function (k) { return counts[k] > 0; })
      .sort(function (a, b) { return counts[b] - counts[a]; })
      .slice(0, n || 5);
  }
  function applyMostLoved() {
    var top = mostLoved(3);
    var topSet = {}; top.forEach(function (id, i) { topSet[id] = i + 1; });
    document.querySelectorAll('[data-venue-id]').forEach(function (card) {
      var id = cardId(card);
      var existing = card.querySelector('.gx-loved-ribbon');
      if (topSet[id]) {
        if (!existing) {
          var r = document.createElement('div');
          r.className = 'gx-loved-ribbon';
          r.textContent = 'Most loved';
          card.appendChild(r);
        }
      } else if (existing) { existing.remove(); }
    });
  }

  /* ---------- the FAB + tray ---------- */
  var fab, tray;
  function buildFab() {
    fab = document.createElement('button');
    fab.className = 'gx-fav-fab is-empty';
    fab.type = 'button';
    fab.innerHTML = '<span class="gx-fav-fab__heart">♥</span> Favourites ' +
                    '<span class="gx-fav-fab__badge">0</span>';
    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      tray.classList.toggle('is-open');
      if (tray.classList.contains('is-open')) renderTray();
    });
    document.body.appendChild(fab);

    tray = document.createElement('div');
    tray.className = 'gx-fav-tray';
    document.body.appendChild(tray);
    document.addEventListener('click', function (e) {
      if (tray.classList.contains('is-open') && !tray.contains(e.target) && e.target !== fab && !fab.contains(e.target))
        tray.classList.remove('is-open');
    });
    renderFab();
  }
  function favCount() { return Object.keys(favs).length; }
  function renderFab() {
    if (!fab) return;
    var n = favCount();
    fab.querySelector('.gx-fav-fab__badge').textContent = n;
    fab.classList.toggle('is-empty', n === 0);
  }
  function renderTray() {
    if (!tray) return;
    var ids = Object.keys(favs).sort(function (a, b) { return (favs[b].ts || 0) - (favs[a].ts || 0); });
    var loved = mostLoved(5);
    var html = '<div class="gx-fav-tray__title">My favourites</div>' +
               '<div class="gx-fav-tray__sub">Saved on this device · click a name to jump to it.</div>';
    if (!ids.length) {
      html += '<div class="gx-fav-tray__empty">Tap the ♡ on any place to keep it here.</div>';
    } else {
      html += ids.map(function (id) {
        var f = favs[id];
        var cc = counts[id] || 0;
        return '<div class="gx-fav-row">' +
          '<div class="gx-fav-row__main" data-jump="' + esc(f.href) + '" data-fid="' + esc(id) + '">' +
            '<div class="gx-fav-row__name">' + esc(f.name) + (cc > 0 ? ' <span class="gx-fav-row__love">♥ ' + cc + '</span>' : '') + '</div>' +
            (f.section ? '<div class="gx-fav-row__meta">' + esc(f.section) + '</div>' : '') +
          '</div>' +
          '<button class="gx-fav-row__rm" data-rm="' + esc(id) + '" title="Remove" aria-label="Remove">×</button>' +
        '</div>';
      }).join('');
    }
    if (loved.length) {
      html += '<div class="gx-fav-tray__section">Most loved in this guide</div>';
      html += loved.map(function (id) {
        var nm = (favs[id] && favs[id].name) || nameFor(id) || id;
        var href = (favs[id] && favs[id].href) || hrefFor(id) || '#';
        return '<div class="gx-fav-row">' +
          '<div class="gx-fav-row__main" data-jump="' + esc(href) + '" data-fid="' + esc(id) + '">' +
            '<div class="gx-fav-row__name">' + esc(nm) + ' <span class="gx-fav-row__love">♥ ' + counts[id] + '</span></div>' +
          '</div></div>';
      }).join('');
    }
    tray.innerHTML = html;
    tray.querySelectorAll('[data-jump]').forEach(function (el) {
      el.addEventListener('click', function () { jumpTo(el.getAttribute('data-jump'), el.getAttribute('data-fid')); });
    });
    tray.querySelectorAll('[data-rm]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = el.getAttribute('data-rm');
        var card = document.querySelector('[data-venue-id="' + cssEsc(id) + '"]');
        toggle(id, card || document.createElement('div'));
      });
    });
  }
  function nameFor(id) {
    var card = document.querySelector('[data-venue-id="' + cssEsc(id) + '"]');
    return card ? cardName(card) : '';
  }
  function hrefFor(id) {
    var card = document.querySelector('[data-venue-id="' + cssEsc(id) + '"]');
    return card ? cardHref(card) : '';
  }

  function jumpTo(href, id) {
    if (tray) tray.classList.remove('is-open');
    if (!href || href === '#') return;
    var el = document.querySelector(href);
    if (!el) return;
    var det = el.closest('details'); if (det && !det.open) det.open = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('is-hover');
    setTimeout(function () { el.classList.remove('is-hover'); }, 1600);
    if (window.TerroirMap && id) window.TerroirMap.focus(id);
  }

  /* ---------- wire clicks (delegated) ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.gx-fav');
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var id = b.getAttribute('data-fav-id');
    var card = b.closest('[data-venue-id]');
    toggle(id, card, b);
  });

  /* ---------- observe inventory re-renders ---------- */
  function observeInventory() {
    var targets = ['terroir-berths', 'terroir-list-notime', 'terroir-list-several', 'terroir-list-plenty']
      .map(function (i) { return document.getElementById(i); }).filter(Boolean);
    if (!targets.length || !('MutationObserver' in window)) return;
    var mo = new MutationObserver(function () {
      clearTimeout(observeInventory._t);
      observeInventory._t = setTimeout(decorateAll, 80);
    });
    targets.forEach(function (t) { mo.observe(t, { childList: true }); });
  }

  /* ---------- public api ---------- */
  window.TerroirFav = {
    isLoved: function (id) { return !!favs[id]; },
    publicCount: function (id) { return counts[id] || 0; },
    mostLoved: mostLoved,
    favourites: function () { return Object.keys(favs).map(function (id) {
      return Object.assign({ id: id }, favs[id]); }); },
    onChange: function (fn) { if (typeof fn === 'function') listeners.push(fn); }
  };

  /* ---------- boot ---------- */
  function boot() {
    decorateAll();
    buildFab();
    renderFab();
    observeInventory();
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (typeof firebase !== 'undefined' || tries > 24) { clearInterval(iv); loadCounts(); }
    }, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
