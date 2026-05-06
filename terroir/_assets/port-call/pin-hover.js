/* Terroir pin-hover — ties [data-pin="<id>"] spans in prose to map markers.
 * Triggers .is-pin-active on the corresponding Leaflet marker on hover.
 * Click on a pin span -> opens marker popup + centers the map.
 * Loaded after the Leaflet hero-map init script.
 */
(function () {
  function tryWire() {
    const map = window.__terroirMap;
    const markers = window.__terroirMarkers;
    if (!map || !markers) {
      // map not built yet — try again
      return false;
    }

    const spans = document.querySelectorAll('[data-pin]');
    spans.forEach(sp => {
      const id = sp.getAttribute('data-pin');
      const m = markers[id];
      if (!m) return;
      sp.addEventListener('mouseenter', () => {
        const el = m._icon;
        if (el) el.classList.add('is-pin-active');
      });
      sp.addEventListener('mouseleave', () => {
        const el = m._icon;
        if (el) el.classList.remove('is-pin-active');
      });
      sp.addEventListener('click', e => {
        e.preventDefault();
        const ll = m.getLatLng();
        map.setView(ll, Math.max(map.getZoom(), 14), { animate: true });
        m.openPopup();
        const sect = document.getElementById('map-section');
        if (sect) sect.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // "Show on map ↑" inside cards
    document.querySelectorAll('[data-show-on-map]').forEach(a => {
      const id = a.getAttribute('data-show-on-map');
      const m = markers[id];
      if (!m) return;
      a.addEventListener('click', e => {
        e.preventDefault();
        const ll = m.getLatLng();
        map.setView(ll, Math.max(map.getZoom(), 14), { animate: true });
        m.openPopup();
        const sect = document.getElementById('map-section');
        if (sect) sect.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Hover over a card -> highlight its marker
    document.querySelectorAll('.tcard[data-venue-id]').forEach(card => {
      const id = card.dataset.venueId;
      const m = markers[id];
      if (!m) return;
      card.addEventListener('mouseenter', () => {
        const el = m._icon;
        if (el) el.classList.add('is-pin-active');
      });
      card.addEventListener('mouseleave', () => {
        const el = m._icon;
        if (el) el.classList.remove('is-pin-active');
      });
    });

    return true;
  }

  function start() {
    let tries = 0;
    const iv = setInterval(() => {
      tries += 1;
      if (tryWire() || tries > 40) clearInterval(iv);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
