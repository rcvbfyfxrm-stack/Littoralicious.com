/* ============================================================================
   TERROIR KIT — EXTRAS
   Rolls two Cadaqués touches across the older guides, on the rendered DOM:
     1. "Open in Google Maps →" on every PLACE card that doesn't already have one
        (walks/hikes, coffee & work spots, culture, music, gastronomy, etc.)
        — venue cards already carry a maps link via guide-render.js, so they're
        skipped. Query = card name + the guide's port name.
     2. Follow · Seasonal · Sources folded into a muted "Reference & logistics"
        appendix at the foot of the guide.
   Idempotent: skips cards that already have a maps link and skips wrapping if a
   .gx-appendix already exists (so a guide that baked these in is left alone).
   ========================================================================== */
(function () {
  'use strict';
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  // sections whose cards are real, mappable PLACES (not dishes/drinks/events/warnings)
  var PLACE = {
    walks: 1, work: 1, culture: 1, music: 1, 'secret-gems': 1, bougie: 1,
    'gastronomy-shops': 1, 'gastronomy-markets': 1, 'gastronomy-producers': 1, gastronomy: 1,
    'ethnic-restaurants': 1, 'burger-kebab': 1, 'street-food': 1
  };

  ready(function () {
    var cfg = window.TERROIR_CONFIG || {};
    var port = (cfg.portName || '').trim();

    function mapsHref(name) {
      return 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(name + (port ? ' ' + port : ''));
    }
    function hasMaps(el) {
      return !!el.querySelector('a[href*="google.com/maps"], a[href*="maps.google"]');
    }

    /* 1 — maps links on place cards */
    document.querySelectorAll('.tcard[data-section]').forEach(function (card) {
      if (!PLACE[card.getAttribute('data-section')]) return;
      if (hasMaps(card)) return;
      var nameEl = card.querySelector('.tcard__name-text') || card.querySelector('.tcard__name');
      var name = nameEl ? nameEl.textContent.trim() : '';
      if (!name) return;
      var div = document.createElement('div');
      div.className = 'tcard__maps';
      div.innerHTML = '<a href="' + mapsHref(name) + '" target="_blank" rel="noopener">Open in Google Maps &rarr;</a>';
      card.appendChild(div);
    });

    /* cala-list items, where a guide has them */
    document.querySelectorAll('.cala-list li').forEach(function (li) {
      if (hasMaps(li)) return;
      var strong = li.querySelector('strong');
      var name = strong ? strong.textContent.trim() : '';
      if (!name) return;
      li.insertAdjacentHTML('beforeend',
        '<a class="cala-maps" href="' + mapsHref(name) + '" target="_blank" rel="noopener">Open in Google Maps &rarr;</a>');
    });

    /* 2 — reference appendix */
    if (!document.querySelector('.gx-appendix')) {
      var els = ['follow', 'seasonal', 'sources']
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
      if (els.length) {
        var parent = els[els.length - 1].parentNode;
        var box = document.createElement('div');
        box.className = 'gx-appendix';
        box.innerHTML = '<div class="gx-appendix__label">Reference &amp; logistics</div>';
        parent.appendChild(box);
        els.forEach(function (el) { box.appendChild(el); });
      }
    }
  });
})();
