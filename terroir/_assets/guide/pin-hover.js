/* ============================================================================
   TERROIR KIT — PIN HOVER + FLOATING MAP  (v2)
   The map deploys two ways, exactly as asked:
     • when the reader wants it — the "Show map" pill (always there), and
     • when the cursor passes a place name — hovering any [data-pin] name opens
       the floating map and flies to that pin, which glows.
   Clicking a name (or a search hit, or a favourite) flies the map there too.

   Robust id resolution: a prose span may say data-pin="p-v07-bar-canete" while
   the map marker is keyed "v07-bar-canete" — we try both, and we also resolve
   neighborhoods (n-), walks (w-), work spots (p-work-/ws-) and landmarks (l-).

   Exposes window.TerroirMap = { open(), close(), focus(id, fly), isOpen() }.
   ========================================================================== */
(function () {
  'use strict';

  var OPEN_KEY = 'terroir-map-open';
  var MUTE_KEY = 'terroir-map-hovermute';
  var hoverMuted = false;
  try { hoverMuted = sessionStorage.getItem(MUTE_KEY) === '1'; } catch (e) {}

  var areas = { neighborhoods: {}, walks: {}, landmarks: {}, work: {} };

  /* ---------- map open / close ---------- */
  function mini()   { return document.getElementById('terroir-mini'); }
  function toggle() { return document.getElementById('terroir-mini-toggle'); }
  function isOpen() { var m = mini(); return !!m && m.classList.contains('is-visible'); }

  function openMap(persist) {
    var m = mini(), t = toggle();
    if (!m) return;
    m.classList.remove('is-user-closed');
    m.classList.add('is-visible');
    if (t) { t.classList.add('is-visible'); t.classList.remove('gx-pulse'); t.textContent = 'Hide map'; }
    if (window.__terroirMap) { try { setTimeout(function () { window.__terroirMap.invalidateSize(); }, 60); } catch (e) {} }
    if (persist) { try { localStorage.setItem(OPEN_KEY, '1'); } catch (e) {} }
  }
  function closeMap(persist) {
    var m = mini(), t = toggle();
    if (!m) return;
    m.classList.remove('is-visible');
    if (t) { t.classList.add('is-visible'); t.textContent = 'Show map'; }
    if (persist) { try { localStorage.setItem(OPEN_KEY, '0'); } catch (e) {} }
  }

  function wireToggle() {
    var t = toggle();
    if (t) {
      t.classList.add('is-visible');
      t.textContent = isOpen() ? 'Hide map' : 'Show map';
      t.addEventListener('click', function () {
        if (isOpen()) { closeMap(true); }
        else { hoverMuted = false; try { sessionStorage.removeItem(MUTE_KEY); } catch (e) {} openMap(true); }
      });
    }
    var closeBtn = document.getElementById('terroir-mini-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        hoverMuted = true; try { sessionStorage.setItem(MUTE_KEY, '1'); } catch (e) {}
        closeMap(true);
      });
    }
    try { if (localStorage.getItem(OPEN_KEY) === '1') openMap(false); } catch (e) {}
  }

  /* ---------- draw the geo overlays the inline init doesn't ---------- */
  function drawOverlays() {
    var map = window.__terroirMap, data = window.TERROIR_DATA;
    if (!map || !data || drawOverlays.done) return;
    drawOverlays.done = true;

    (data.NEIGHBORHOODS || []).forEach(function (n) {
      if (!n || !n.center || n.center.length !== 2) return;
      var c = L.circle(n.center, { radius: n.radius || 300, color: '#5b8a9a', weight: 1,
        fillColor: '#5b8a9a', fillOpacity: 0.05, interactive: false }).addTo(map);
      areas.neighborhoods[n.id] = c;
    });
    (data.WALKS || []).forEach(function (w) {
      if (!w || !w.start || w.start.length !== 2) return;
      var icon = L.divIcon({ className: '', iconSize: [14, 14], iconAnchor: [7, 7],
        html: '<div style="background:#3a6a45;width:11px;height:11px;border:2px solid #fff;box-shadow:0 0 0 1px #3a6a45,0 1px 4px rgba(0,0,0,0.4);transform:rotate(45deg);"></div>' });
      var m = L.marker(w.start, { icon: icon, opacity: 0, riseOnHover: true });
      m.bindTooltip('Walk: ' + (w.name || w.id), { direction: 'right', offset: [10, 0] });
      m.on('mouseover', function () { m.setOpacity(1); }); m.on('mouseout', function () { m.setOpacity(0); });
      m.addTo(map); areas.walks[w.id] = m;
    });
    (data.WORK_SPOTS || []).forEach(function (w) {
      if (!w || !w.start || w.start.length !== 2) return;
      var icon = L.divIcon({ className: '', iconSize: [14, 14], iconAnchor: [7, 7],
        html: '<div style="background:#5a3a6a;width:10px;height:10px;border:2px solid #fff;box-shadow:0 0 0 1px #5a3a6a,0 1px 4px rgba(0,0,0,0.4);"></div>' });
      var m = L.marker(w.start, { icon: icon, opacity: 0, riseOnHover: true });
      m.bindTooltip(w.name || w.id, { direction: 'right', offset: [10, 0] });
      m.on('mouseover', function () { m.setOpacity(1); }); m.on('mouseout', function () { m.setOpacity(0); });
      m.addTo(map); areas.work[w.id] = m;
    });
    (data.LANDMARKS || []).forEach(function (l) {
      var coords = l && (l.coords || l.center);
      if (!coords || coords.length !== 2) return;
      var icon = L.divIcon({ className: '', iconSize: [13, 13], iconAnchor: [6, 6],
        html: '<div style="background:#8a6a2e;width:9px;height:9px;border:2px solid #fff;box-shadow:0 0 0 1px #8a6a2e,0 1px 4px rgba(0,0,0,0.4);transform:rotate(45deg);"></div>' });
      var m = L.marker(coords, { icon: icon, opacity: 0, riseOnHover: true });
      m.bindTooltip(l.name || l.id, { direction: 'right', offset: [9, 0] });
      m.on('mouseover', function () { m.setOpacity(1); }); m.on('mouseout', function () { m.setOpacity(0); });
      m.addTo(map); areas.landmarks[l.id] = m;
    });
  }

  /* ---------- resolve a data-pin id to a thing on the map ---------- */
  function resolve(id) {
    if (!id) return null;
    var markers = window.__terroirMarkers || {};
    var bare = id.replace(/^p-/, '');
    if (id.charAt(0) === 'n' && areas.neighborhoods[id]) return { kind: 'area', obj: areas.neighborhoods[id] };
    if (id.charAt(0) === 'w' && areas.walks[id]) return { kind: 'walk', obj: areas.walks[id] };
    if (id.charAt(0) === 'l' && areas.landmarks[id]) return { kind: 'walk', obj: areas.landmarks[id] };
    if (areas.work[id]) return { kind: 'walk', obj: areas.work[id] };
    if (areas.work[bare]) return { kind: 'walk', obj: areas.work[bare] };
    if (markers[id])   return { kind: 'marker', obj: markers[id] };
    if (markers[bare]) return { kind: 'marker', obj: markers[bare] };
    return null;
  }

  function activate(id) {
    var r = resolve(id); if (!r) return;
    if (r.kind === 'area') { if (r.obj._path) r.obj._path.classList.add('is-pin-area-active'); return; }
    r.obj.setOpacity && r.obj.setOpacity(1);
    var el = r.obj._icon; if (el) el.classList.add('is-pin-active');
  }
  function deactivate(id) {
    var r = resolve(id); if (!r) return;
    if (r.kind === 'area') { if (r.obj._path) r.obj._path.classList.remove('is-pin-area-active'); return; }
    if (r.kind === 'walk') r.obj.setOpacity && r.obj.setOpacity(0);
    var el = r.obj._icon; if (el) el.classList.remove('is-pin-active');
  }
  function flyTo(id) {
    var r = resolve(id); if (!r) return false;
    var map = window.__terroirMap; if (!map) return false;
    var ll = r.obj.getLatLng ? r.obj.getLatLng() : (r.obj.getBounds ? r.obj.getBounds().getCenter() : null);
    if (!ll) return false;
    map.setView(ll, Math.max(map.getZoom(), 15), { animate: true });
    if (r.obj.setOpacity) r.obj.setOpacity(1);
    if (r.obj.openPopup) try { r.obj.openPopup(); } catch (e) {}
    activate(id);
    return true;
  }

  /* ---------- public api (used by search + favourites) ---------- */
  window.TerroirMap = {
    open: function () { openMap(true); },
    close: function () { closeMap(true); },
    isOpen: isOpen,
    focus: function (id, fly) {
      if (!isOpen()) openMap(false);
      var ok = flyTo(id) || flyTo('p-' + id) || flyTo(id.replace(/^venue-/, ''));
      return ok;
    }
  };

  /* ---------- wire spans + cards ---------- */
  function wire() {
    if (wire.done) return false;
    if (!window.__terroirMap || !window.__terroirMarkers) return false;
    wire.done = true;
    drawOverlays();

    // prose place names: hover DEPLOYS the map + flies; click flies + opens
    document.querySelectorAll('[data-pin]').forEach(function (sp) {
      if (sp.matches('.tcard') || sp.matches('[data-venue-id]')) return;
      var id = sp.getAttribute('data-pin');
      sp.addEventListener('mouseenter', function () {
        activate(id);
        if (!hoverMuted) { openMap(false); flyTo(id); }
        else { var t = toggle(); if (t && !isOpen()) t.classList.add('gx-pulse'); }
      });
      sp.addEventListener('mouseleave', function () {
        deactivate(id);
        var t = toggle(); if (t) t.classList.remove('gx-pulse');
      });
      sp.addEventListener('click', function (e) { e.preventDefault(); openMap(true); flyTo(id); });
    });

    // cards: glow on hover (+ pan only if the map is already open). Prefer an
    // explicit data-pin (e.g. a culture card pinned to a landmark) over the id.
    document.querySelectorAll('.tcard[data-venue-id], .terroir-card[data-venue-id], .terroir-berth[data-venue-id]').forEach(function (card) {
      var id = card.getAttribute('data-pin') || card.getAttribute('data-venue-id');
      card.addEventListener('mouseenter', function () { activate(id); if (isOpen()) flyTo(id); });
      card.addEventListener('mouseleave', function () { deactivate(id); });
    });
    return true;
  }

  function start() {
    wireToggle();
    var tries = 0;
    var iv = setInterval(function () {
      tries += 1;
      if (wire() || tries > 80) clearInterval(iv);
    }, 200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
