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

    /* 3 — neighbouring-port cross-links (same cruising ground), inside the appendix */
    var NEIGHBOURS = {
      'Cadaques-CapdeCreus':   [['Costa-Brava-Catalunya', 'Costa Brava'], ['Barcelona-Catalunya', 'Barcelona']],
      'Costa-Brava-Catalunya': [['Cadaques-CapdeCreus', 'Cadaqués'], ['Barcelona-Catalunya', 'Barcelona']],
      'Barcelona-Catalunya':   [['Costa-Brava-Catalunya', 'Costa Brava'], ['Cadaques-CapdeCreus', 'Cadaqués']],
      'Split-Dalmatie':        [['Dubrovnik-Dalmatie', 'Dubrovnik']],
      'Dubrovnik-Dalmatie':    [['Split-Dalmatie', 'Split']],
      'beaune-bourgogne':      [['lons-le-saunier-jura', 'Lons-le-Saunier']],
      'lons-le-saunier-jura':  [['beaune-bourgogne', 'Beaune']]
    };
    (function neighbours() {
      if (document.querySelector('.gx-neighbours')) return;
      var m = (location.pathname || '').match(/\/terroir\/([^\/]+)/);
      var mine = m && NEIGHBOURS[m[1]];
      var box = document.querySelector('.gx-appendix');
      if (!mine || !mine.length || !box) return;
      var row = document.createElement('div');
      row.className = 'gx-neighbours';
      row.style.cssText = 'margin:10px 0 4px;font-family:Inter,system-ui,sans-serif;font-size:0.9em;';
      row.innerHTML = '<span class="gx-appendix__label" style="display:inline;margin-right:10px">Neighbouring ports</span>' +
        mine.map(function (n) { return '<a href="/terroir/' + n[0] + '" style="margin-right:14px;border-bottom:1px solid currentColor">' + n[1] + '</a>'; }).join('');
      box.insertBefore(row, box.firstChild.nextSibling);
    })();

    /* 4 — EducatedTraveler callout, data-driven: renders ONLY when the guide's data declares
       a hand-verified partner (window.TERROIR_DATA.ET) and none is already baked in. */
    (function etCallout() {
      var et = window.TERROIR_DATA && window.TERROIR_DATA.ET;
      if (!et || !et.text || document.querySelector('.et-callout')) return;
      var host = document.querySelector('.container') || document.body;
      var d = document.createElement('div');
      d.className = 'et-callout';
      d.innerHTML = '<span class="et-callout__label">' + (et.label || 'EducatedTraveler') + '</span>' +
        et.text + ' <a href="' + (et.url || 'https://educatedtraveler.app') + '" target="_blank" rel="noopener">educatedtraveler.app &rarr;</a>';
      host.appendChild(d);
    })();

    /* 5 — photos, data-driven: cities declare window.TERROIR_DATA.PHOTOS = [{src,caption,credit}×3];
       the kit places them at the locked positions. Skips guides that bake their own .gx-photo. */
    window.addEventListener('load', function () {
      var ph = window.TERROIR_DATA && window.TERROIR_DATA.PHOTOS;
      if (!ph || !ph.length || document.querySelector('.gx-photo')) return;
      function fig(p, cls) {
        var f = document.createElement('figure'); f.className = 'gx-photo ' + (cls || '');
        f.innerHTML = '<img src="' + p.src + '" alt="' + (p.caption || '').replace(/<[^>]+>/g, '') + '" loading="lazy">' +
          '<figcaption>' + (p.caption || '') + ' <span class="gx-photo__credit">' + (p.credit || '') + '</span></figcaption>';
        return f;
      }
      var lead = document.querySelector('.lead');
      var mid  = document.getElementById('soul') || document.getElementById('history');
      var act3 = document.getElementById('calas') || document.querySelector('details#walks, details#culture, section#quartiers');
      if (ph[0] && lead) lead.parentNode.insertBefore(fig(ph[0], 'gx-photo--1'), lead.nextSibling);
      if (ph[1] && mid)  mid.parentNode.insertBefore(fig(ph[1], 'gx-photo--2'), mid.nextSibling);
      if (ph[2] && act3) act3.parentNode.insertBefore(fig(ph[2], 'gx-photo--3'), act3);
    });
  });
})();
