/* Terroir pin-hover — ties [data-pin="<id>"] spans/cards to map markers/areas.
 * Supported pin id prefixes:
 *   p-...  → a venue marker (existing behavior)
 *   n-...  → a neighborhood (highlights a circle area on hover)
 *   w-...  → a walk start point (highlights a marker on hover)
 *
 * Loaded after the Leaflet hero-map init script.
 *
 * Map close/open toggle (May 2026): "Close map" hides BOTH the mini and the
 * floating active pill, persisted to localStorage. "Show map" toggle reopens.
 */
(function () {

  // ---------- Map close/open toggle (Task 8) ----------
  function wireMapToggle() {
    var mini = document.getElementById('terroir-mini');
    var pill = document.getElementById('floating-active');
    var toggle = document.getElementById('terroir-mini-toggle');
    var closeBtn = document.getElementById('terroir-mini-close');
    if (!mini || !toggle) return;

    var KEY = 'terroir-map-closed';
    function applyState(closed) {
      if (closed) {
        mini.classList.add('is-user-closed');
        if (pill) pill.classList.add('is-user-closed');
        toggle.classList.add('is-visible');
        toggle.textContent = 'Show map';
      } else {
        mini.classList.remove('is-user-closed');
        if (pill) pill.classList.remove('is-user-closed');
        toggle.classList.remove('is-visible');
      }
    }
    try { applyState(localStorage.getItem(KEY) === '1'); } catch (e) {}

    if (closeBtn) {
      closeBtn.textContent = '×'; // ensure ×
      closeBtn.setAttribute('aria-label', 'Close map');
      closeBtn.addEventListener('click', function () {
        try { localStorage.setItem(KEY, '1'); } catch (e) {}
        applyState(true);
      });
    }
    toggle.addEventListener('click', function () {
      try { localStorage.setItem(KEY, '0'); } catch (e) {}
      applyState(false);
      // Re-show floating-active baseline copy (toggle in case it was visible)
      if (pill) pill.classList.add('is-visible');
    });
  }

  // ---------- Neighborhood + Walk + Venue area drawing ----------
  function drawAreasOnMap() {
    var map = window.__terroirMap;
    var data = window.PCV_DATA;
    if (!map || !data) return;

    // NEIGHBORHOODS as soft circles (drawn faintly, glow on hover)
    window.__terroirNeighborhoods = window.__terroirNeighborhoods || {};
    var neighborhoods = data.NEIGHBORHOODS || [];
    neighborhoods.forEach(function (n) {
      if (!n || !n.center || n.center.length !== 2) return;
      var c = L.circle(n.center, {
        radius: n.radius || 300,
        color: '#5b8a9a',
        weight: 1,
        fillColor: '#5b8a9a',
        fillOpacity: 0.05,
        interactive: false
      }).addTo(map);
      window.__terroirNeighborhoods[n.id] = c;
    });

    // WALKS as start markers (small green diamonds), hover-only opacity
    window.__terroirWalks = window.__terroirWalks || {};
    var walks = data.WALKS || [];
    walks.forEach(function (w) {
      if (!w || !w.start || w.start.length !== 2) return;
      var icon = L.divIcon({
        className: '',
        html: '<div style="background:#3a6a45;width:11px;height:11px;border:2px solid #fff;'
            + 'box-shadow:0 0 0 1px #3a6a45,0 1px 4px rgba(0,0,0,0.4);transform:rotate(45deg);"></div>',
        iconSize: [14, 14], iconAnchor: [7, 7]
      });
      var m = L.marker(w.start, { icon: icon, opacity: 0, riseOnHover: true });
      m.bindTooltip('Walk start: ' + (w.name || w.id), { direction: 'right', offset: [10, 0] });
      m.on('mouseover', function () { m.setOpacity(1); });
      m.on('mouseout', function () { m.setOpacity(0); });
      m.addTo(map);
      window.__terroirWalks[w.id] = m;
    });

    // WORK SPOTS as small purple squares, hover-only opacity (registered in __terroirMarkers
    // so existing card-hover behavior wires them automatically)
    window.__terroirMarkers = window.__terroirMarkers || {};
    var work = data.WORK_SPOTS || [];
    work.forEach(function (w) {
      if (!w || !w.start || w.start.length !== 2) return;
      var icon = L.divIcon({
        className: '',
        html: '<div style="background:#5a3a6a;width:10px;height:10px;border:2px solid #fff;'
            + 'box-shadow:0 0 0 1px #5a3a6a,0 1px 4px rgba(0,0,0,0.4);"></div>',
        iconSize: [14, 14], iconAnchor: [7, 7]
      });
      var m = L.marker(w.start, { icon: icon, opacity: 0, riseOnHover: true });
      m.bindTooltip(w.name || w.id, { direction: 'right', offset: [10, 0] });
      m.on('mouseover', function () { m.setOpacity(1); });
      m.on('mouseout', function () { m.setOpacity(0); });
      m.addTo(map);
      window.__terroirMarkers[w.id] = m;
    });
  }

  // ---------- Wire spans + cards to markers / areas ----------
  function tryWire() {
    var map = window.__terroirMap;
    var markers = window.__terroirMarkers;
    var neighborhoods = window.__terroirNeighborhoods || {};
    var walks = window.__terroirWalks || {};
    if (!map || !markers) return false;

    function activate(id) {
      if (id && id.charAt(0) === 'n') {
        var c = neighborhoods[id];
        if (c && c._path) c._path.classList.add('is-pin-area-active');
        return;
      }
      if (id && id.charAt(0) === 'w') {
        var w = walks[id];
        if (w) { w.setOpacity(1); if (w._icon) w._icon.classList.add('is-pin-active'); }
        return;
      }
      var m = markers[id];
      if (m) {
        if (id && id.indexOf('p-work-') === 0) m.setOpacity(1);
        if (m._icon) m._icon.classList.add('is-pin-active');
      }
    }
    function deactivate(id) {
      if (id && id.charAt(0) === 'n') {
        var c = neighborhoods[id];
        if (c && c._path) c._path.classList.remove('is-pin-area-active');
        return;
      }
      if (id && id.charAt(0) === 'w') {
        var w = walks[id];
        if (w) { w.setOpacity(0); if (w._icon) w._icon.classList.remove('is-pin-active'); }
        return;
      }
      var m = markers[id];
      if (m) {
        if (id && id.indexOf('p-work-') === 0) m.setOpacity(0);
        if (m._icon) m._icon.classList.remove('is-pin-active');
      }
    }
    function focusOn(id) {
      if (id && id.charAt(0) === 'n') {
        var c = neighborhoods[id];
        if (c) { map.setView(c.getLatLng(), Math.max(map.getZoom(), 14), { animate: true }); }
        return;
      }
      if (id && id.charAt(0) === 'w') {
        var w = walks[id];
        if (w) { map.setView(w.getLatLng(), Math.max(map.getZoom(), 14), { animate: true }); w.setOpacity(1); }
        return;
      }
      var m = markers[id];
      if (m) { map.setView(m.getLatLng(), Math.max(map.getZoom(), 14), { animate: true }); m.openPopup(); }
    }

    document.querySelectorAll('[data-pin]').forEach(function (sp) {
      var id = sp.getAttribute('data-pin');
      sp.addEventListener('mouseenter', function () { activate(id); });
      sp.addEventListener('mouseleave', function () { deactivate(id); });
      sp.addEventListener('click', function (e) {
        e.preventDefault();
        focusOn(id);
        var sect = document.getElementById('map-section');
        if (sect) sect.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.querySelectorAll('.tcard[data-venue-id]').forEach(function (card) {
      var id = card.dataset.venueId;
      card.addEventListener('mouseenter', function () { activate(id); });
      card.addEventListener('mouseleave', function () { deactivate(id); });
    });

    return true;
  }

  function start() {
    wireMapToggle();
    drawAreasOnMap();
    var tries = 0;
    var iv = setInterval(function () {
      tries += 1;
      if (tryWire() || tries > 60) {
        clearInterval(iv);
      }
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
