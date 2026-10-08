/* GOLD6 §8 — the four readings (7 Oct 2026). Guide-agnostic; runs on any page cloned from Prague's chrome.
   1 · a door whose href is a filter hash (#t=…) turns the guide's filter on instead of scrolling
       (capture phase, so the kit's door handler never sees it); the head counts its doors
   2 · the four doors again at the foot of the article
   3 · a Maps link on every CLOSED card that has a place (tiles + the kit's table cards) */
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.gx-bridge__door[href^="#t="]');
    if (!a) return;
    e.preventDefault(); e.stopPropagation();
    var h = a.getAttribute('href');
    if (location.hash === h) location.hash = '';
    location.hash = h;
  }, true);
  var FR = ['', 'Une lecture', 'Deux lectures', 'Trois lectures', 'Quatre lectures', 'Cinq lectures'];
  var EN = ['', 'One way', 'Two ways', 'Three ways', 'Four ways', 'Five ways'];
  function label(nav) {
    var n = nav.querySelectorAll('.gx-bridge__door').length, fr = nav.querySelector('.gx-bridge__fr');
    if (fr && FR[n]) fr.textContent = FR[n];
    if (!nav.classList.contains('gx-bridge--foot')) nav.setAttribute('aria-label', (EN[n] || n + ' ways') + ' to read this guide');
  }
  function foot() {
    var top = document.querySelector('.gx-bridge:not(.gx-bridge--foot)');
    if (!top) return false;
    label(top);
    if (document.querySelector('.gx-bridge--foot')) return true;
    var box = top.closest('.container') || document.querySelector('.container');
    var chs = box && box.querySelectorAll(':scope > .gx-chapter');
    if (!chs || !chs.length) return false;
    var f = top.cloneNode(true); f.classList.add('gx-bridge--foot');
    f.setAttribute('aria-label', 'Read this guide another way');
    var en = f.querySelector('.gx-bridge__en'); if (en) en.textContent = 'Read it another way — each door turns the page into its answer.';
    var last = chs[chs.length - 1]; last.parentNode.insertBefore(f, last.nextSibling);
    /* the kit's handler lives on the top nav only: the foot doors take the same jump themselves */
    f.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('.gx-bridge__door'); if (!a) return;
      var h = a.getAttribute('href'); if (/^#t=/.test(h)) return;
      e.preventDefault();
      (a.getAttribute('data-open') || '').split(',').forEach(function (id) { var el = document.getElementById(id.trim()); if (el && el.tagName === 'DETAILS') el.open = true; });
      var t = document.querySelector(h);
      if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'start' }); try { history.replaceState(null, '', h); } catch (x) {} }
    });
    return true;
  }
  var V = null;
  function vmap() {   /* data.js loads after inline scripts: read it lazily */
    if (!V || !Object.keys(V).length) { V = {}; ((window.TERROIR_DATA || {}).VENUES || []).forEach(function (v) { V[v.id] = v; }); }
    return V;
  }
  function pin(sum, href, name) {
    if (!href || sum.querySelector('.fcard__pin')) return;
    var a = document.createElement('a');
    a.className = 'fcard__pin'; a.href = href; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = 'Map ↗'; a.setAttribute('aria-label', 'Open ' + name + ' in Google Maps');
    a.addEventListener('click', function (e) { e.stopPropagation(); });
    sum.appendChild(a);
  }
  function tiles() {
    document.querySelectorAll('details.fcard').forEach(function (d) {
      var sum = d.querySelector(':scope > summary'); if (!sum || sum.querySelector('.fcard__pin')) return;
      var nm = (sum.querySelector('.fcard__name') || {}).textContent || '';
      var m = d.querySelector('a[href*="google.com/maps/search"]:not(.fcard__pin)');
      if (m) return pin(sum, m.getAttribute('href'), nm);
      var r = d.querySelector('.fcard__ref a[href^="#venue-"]'), v = r && vmap()[r.getAttribute('href').slice(7)];
      if (v && v.maps) pin(sum, v.maps, nm);
    });
  }
  function venues() {
    var n = 0;
    document.querySelectorAll('details.terroir-card--fold[data-venue-id]').forEach(function (d) {
      var v = vmap()[d.getAttribute('data-venue-id')], sum = d.querySelector(':scope > summary');
      if (v && v.maps && sum) { pin(sum, v.maps, v.name); n++; }
    });
    return n;
  }
  var tries = 0;
  (function poll() { tiles(); var ok = foot(), n = venues(); if ((!ok || !n) && tries++ < 600) requestAnimationFrame(poll); })();
  function watch() {   /* the kit re-renders the table cards on filter changes: re-pin when it does */
    var tb = document.getElementById('tables');
    if (tb && window.MutationObserver) new MutationObserver(function () { venues(); }).observe(tb, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
})();
