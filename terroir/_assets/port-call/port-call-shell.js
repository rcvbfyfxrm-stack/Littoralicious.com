/* ============================================================================
   PORT CALL — SHELL  (added 2026-09-08)
   Three jobs, on top of port-call-render.js:
     1. ANGLES  — pick how you want to read the port: what to do with no time,
                  a few hours, or a day. One click, one list.
     2. SEARCH  — one bar over the whole port: a name, a product, a
                  neighbourhood. Filters every card across every band.
     3. MY LIST — a heart on each card, saved to localStorage, and an angle that
                  shows only what you kept. Private to the browser; nothing is
                  sent anywhere.
   Port Call's OWN kit. It shares no file with terroir/_assets/guide/ — same
   level, different system (standing ruling: Port Call is provisioning, for
   work; Terroir is exploration). Pure progressive enhancement: remove this file
   and the guide still renders and reads top to bottom.
   ========================================================================== */
(function () {
    'use strict';
    var BANDS = [
        { id: 'notime',  sel: '#pcv-list-notime',  label: 'No time' },
        { id: 'several', sel: '#pcv-list-several', label: 'A few hours' },
        { id: 'plenty',  sel: '#pcv-list-plenty',  label: 'A day or more' }
    ];
    var KEY = 'pc-favs:' + (location.pathname.replace(/\/+$/, '') || 'port');
    var favs = load();

    function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(favs)); } catch (e) {} }
    function cards() { return Array.prototype.slice.call(document.querySelectorAll('.pcv-card')); }

    function bandOf(card) {
        for (var i = 0; i < BANDS.length; i++) {
            var host = document.querySelector(BANDS[i].sel);
            if (host && host.contains(card)) return BANDS[i].id;
        }
        return 'berths';
    }

    function haystack(card) {
        if (card.__pcHay) return card.__pcHay;
        card.__pcHay = (card.textContent || '').toLowerCase().replace(/\s+/g, ' ');
        return card.__pcHay;
    }

    var state = { angle: 'all', q: '' };

    function apply() {
        var all = cards(), shown = 0;
        all.forEach(function (c) {
            var okAngle = state.angle === 'all'
                ? true
                : state.angle === 'mine'
                    ? favs.indexOf(c.dataset.venueId) > -1
                    : bandOf(c) === state.angle;
            var okQ = !state.q || haystack(c).indexOf(state.q) > -1;
            var show = okAngle && okQ;
            c.classList.toggle('pc-hidden', !show);
            if (show) shown++;
        });
        // A band with nothing left in it hides its own heading and kicker — and ONLY those.
        // NEVER walk up to a shared ancestor: in the article template these lists are siblings
        // inside .article__content, so hiding the parent hides the whole piece, search bar and all.
        BANDS.forEach(function (b) {
            var host = document.querySelector(b.sel);
            if (!host) return;
            var any = !!host.querySelector('.pcv-card:not(.pc-hidden)');
            host.classList.toggle('pc-hidden', !any);
            var n = host.previousElementSibling, hops = 0;
            while (n && hops < 3 && /^(H2|H3|P)$/.test(n.tagName)) {
                n.classList.toggle('pc-hidden', !any);
                if (n.tagName === 'H2') break;      // stop at the band's own heading
                n = n.previousElementSibling; hops++;
            }
        });
        var berths = document.querySelector('#pcv-berths');
        if (berths) berths.classList.toggle('pc-hidden', state.angle !== 'all' || !!state.q);

        var count = document.querySelector('.pc-count');
        if (count) count.textContent = shown + (shown === 1 ? ' place' : ' places');
        var empty = document.querySelector('.pc-empty');
        if (empty) empty.hidden = shown > 0;
    }

    function hearts() {
        cards().forEach(function (c) {
            if (c.querySelector('.pc-fav')) return;
            var id = c.dataset.venueId;
            var b = document.createElement('button');
            b.className = 'pc-fav'; b.type = 'button';
            b.setAttribute('aria-pressed', String(favs.indexOf(id) > -1));
            b.setAttribute('aria-label', 'Keep this place on my list');
            b.textContent = '♥';
            b.title = 'Keep on my list';
            b.addEventListener('click', function (e) {
                e.preventDefault(); e.stopPropagation();
                var i = favs.indexOf(id);
                if (i > -1) favs.splice(i, 1); else favs.push(id);
                save();
                b.setAttribute('aria-pressed', String(i === -1));
                var mine = document.querySelector('.pc-angle[data-angle="mine"] .pc-angle__n');
                if (mine) mine.textContent = favs.length ? favs.length : '';
                if (state.angle === 'mine') apply();
            });
            // The renderer already owns the card's right-hand vote column; drop the private
            // keep-heart in there rather than floating it over the body, where it landed on
            // the category label. Absolute positioning is only the fallback.
            var col = c.querySelector('.pcv-card__vote');
            if (col) { b.classList.add('pc-fav--incol'); col.insertBefore(b, col.firstChild); }
            else c.appendChild(b);
        });
    }

    function shell() {
        var anchor = document.querySelector('#pcv-berths') || document.querySelector('#pcv-map');
        if (!anchor || document.querySelector('.pc-shell')) return;
        var wrap = document.createElement('div');
        wrap.className = 'pc-shell';
        var angles = [{ id: 'all', label: 'Everything' }]
            .concat(BANDS.map(function (b) { return { id: b.id, label: b.label }; }))
            .concat([{ id: 'mine', label: 'My list' }]);
        wrap.innerHTML =
            '<div class="pc-shell__row">' +
              '<div class="pc-search"><span class="pc-search__icon" aria-hidden="true">⌕</span>' +
                '<input type="search" placeholder="Search the port — a name, a product, a neighbourhood" aria-label="Search this port">' +
                '<button class="pc-search__clear" type="button" aria-label="Clear search" hidden>×</button></div>' +
              '<span class="pc-count"></span>' +
            '</div>' +
            '<div class="pc-shell__row pc-angles">' +
              angles.map(function (a) {
                  var n = a.id === 'mine' ? '<span class="pc-angle__n">' + (favs.length || '') + '</span>' : '';
                  return '<button class="pc-angle" type="button" data-angle="' + a.id + '" aria-pressed="' +
                         (a.id === 'all') + '">' + a.label + n + '</button>';
              }).join('') +
            '</div>';
        anchor.parentNode.insertBefore(wrap, anchor);

        var empty = document.createElement('p');
        empty.className = 'pc-empty'; empty.hidden = true;
        empty.textContent = 'Nothing here yet — clear the search, or pick another angle.';
        wrap.parentNode.insertBefore(empty, wrap.nextSibling);

        var input = wrap.querySelector('input'), clear = wrap.querySelector('.pc-search__clear');
        input.addEventListener('input', function () {
            state.q = input.value.trim().toLowerCase();
            clear.hidden = !state.q;
            apply();
        });
        clear.addEventListener('click', function () { input.value = ''; state.q = ''; clear.hidden = true; input.focus(); apply(); });
        wrap.addEventListener('click', function (e) {
            var b = e.target.closest ? e.target.closest('.pc-angle') : null;
            if (!b) return;
            state.angle = b.dataset.angle;
            wrap.querySelectorAll('.pc-angle').forEach(function (x) {
                x.setAttribute('aria-pressed', String(x === b));
            });
            apply();
        });
    }

    function boot() {
        if (!document.querySelector('.pcv-card')) return false;
        shell(); hearts(); apply(); return true;
    }

    // the renderer runs on its own schedule; wait for the first card, then stop watching
    if (!boot()) {
        var obs = new MutationObserver(function () { if (boot()) obs.disconnect(); });
        obs.observe(document.documentElement, { childList: true, subtree: true });
        setTimeout(function () { obs.disconnect(); boot(); }, 8000);
    }
})();
