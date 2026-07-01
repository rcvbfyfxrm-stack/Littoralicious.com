/* ====================================================================
   PORT CALL — shared renderer (any port).
   ====================================================================
   Each terroir guide supplies:
     window.TERROIR_DATA   — { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS }
     window.TERROIR_CONFIG — {
        articleId,            // 'terroir-faro'   (Firestore key)
        cardUrl,              // (unused in terroir)
        center: [lat, lng],   // big-map default centre
        zoom: 13              // big-map default zoom
     }
   The article HTML must contain:
     #terroir-berths, #terroir-list-notime, #terroir-list-several, #terroir-list-plenty
     #terroir-inv-map, #terroir-inv-legend
     #terroir-inv-mini, #terroir-inv-mini-handle, #terroir-inv-mini-map, #terroir-inv-mini-active
   ==================================================================== */
(function () {
    function boot() {
        const cfg = window.TERROIR_CONFIG || {};
        if (!window.TERROIR_DATA) { console.error('TERROIR_DATA missing'); return; }
        const ARTICLE_ID = cfg.articleId || 'terroir-default';
        const VOTE_KEY   = 'terroir-' + ARTICLE_ID + '-votes';
        const { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS } = window.TERROIR_DATA;

        const escapeHTML = s => (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
        const telHref = p => 'tel:' + p.replace(/[^+\d]/g, '');
        const productPills = (tags) => (tags || []).map(t => {
            const c = (PRODUCT_COLORS || {})[t] || '#444';
            return '<span style="background:' + c + ';">' + escapeHTML(t) + '</span>';
        }).join('');

        // ---------- City-bounds helper -------------------------------------
        // Constrain the map to the city itself; pin remote / online suppliers
        // (Browne Trading from Maine, Snake River from Idaho, etc.) but keep
        // them out of fitBounds so the print card isn't zoomed to the country.
        // TERROIR_CONFIG can pass `cityRadiusKm` (default 50) — anything further
        // from `center` is treated as a remote supplier unless it has
        // `online: true` already set.
        const cityCenter = cfg.center || [0, 0];
        const cityRadiusKm = cfg.cityRadiusKm || 50;
        const haversineKm = (a, b) => {
            const toRad = d => d * Math.PI / 180;
            const R = 6371;
            const dLat = toRad(b[0] - a[0]);
            const dLng = toRad(b[1] - a[1]);
            const s = Math.sin(dLat/2)**2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng/2)**2;
            return 2 * R * Math.asin(Math.sqrt(s));
        };
        VENUES.forEach(v => {
            if (v.online === undefined) {
                v.online = (typeof v.lat === 'number') && haversineKm(cityCenter, [v.lat, v.lng]) > cityRadiusKm;
            }
        });
        const inCityVenues = VENUES.filter(v => !v.online);

        const localVotes = (() => {
            try { return JSON.parse(localStorage.getItem(VOTE_KEY) || '{}'); }
            catch (e) { return {}; }
        })();
        const saveLocalVotes = () => {
            try { localStorage.setItem(VOTE_KEY, JSON.stringify(localVotes)); } catch (e) {}
        };
        const voteCounts = {};
        VENUES.forEach(v => { voteCounts[v.id] = 0; });

        // ---------- Render top-3 berths
        // ---------- Gem Standard (foodie-culture upgrade) — additive; renders only if the field exists
        var DRINK_COLORS = { wine:'#7b1e3b', spirit:'#b45309', aperitif:'#ca8a04', coffee:'#6b4226', beer:'#b8860b', cider:'#9a7b1e', other:'#5a5a5a' };
        function gemChip(v){ if(!v.signal_chip) return ''; var c=v.signal_chip, label=(typeof c==='string')?c:(c.label||c.full||''); if(!label) return ''; var full=(typeof c==='object'&&c.full)?c.full:label; return '<span class="terroir-card__chip" title="'+escapeHTML(full)+'">'+escapeHTML(label)+'</span>'; }
        function gemCosign(v){ var c=v.signal_chip; return (c&&typeof c==='object'&&c.cosign)?'<div class="terroir-card__cosign">'+escapeHTML(c.cosign)+'</div>':''; }
        function gemDrinkType(v){ if(!v.type_of_drink) return ''; var t=String(v.type_of_drink).toLowerCase(), col=DRINK_COLORS[t]||DRINK_COLORS.other; return '<span class="terroir-card__drinktype" style="background:'+col+'">'+escapeHTML(t)+'</span>'; }
        function gemPerson(v){ return v.person?'<div class="terroir-card__person">'+escapeHTML(v.person)+'</div>':''; }
        function gemSignature(v){ return v.signature?'<div class="terroir-card__signature"><span class="tsig">&#9733;</span> '+escapeHTML(v.signature)+'</div>':''; }
        function gemVerdict(v){ return v.verdict?'<div class="terroir-card__verdict">'+escapeHTML(v.verdict)+'</div>':''; }
        function gemCaveat(v){ return v.caveat?'<div class="terroir-card__caveat"><span class="tcav">Heads up</span> '+escapeHTML(v.caveat)+'</div>':''; }
        function gemSubcat(v){ return v.subcat?'<span class="terroir-card__subcat">'+escapeHTML(v.subcat)+'</span>':''; }
        function gemMoneyEats(v){ return v.money_eats?'<span class="terroir-card__money" title="Where the smart local money eats">&#8364; money eats here</span>':''; }

        function renderBerths() {
            const target = document.getElementById('terroir-berths');
            if (!target) return;
            // The 3 blue "main tables" = the venues readers love most (♡ public counts);
            // fall back to the editorial berth_top order until votes accumulate.
            const fav = window.TerroirFav;
            let berths;
            if (fav && typeof fav.publicCount === 'function') {
                const loved = VENUES.filter(v => fav.publicCount(v.id) > 0)
                                    .sort((a, b) => fav.publicCount(b.id) - fav.publicCount(a.id));
                const base = VENUES.filter(v => v.tier === 'berth_top').sort((a, b) => a.priority - b.priority);
                const seen = {}; berths = [];
                loved.concat(base).forEach(v => { if (!seen[v.id] && berths.length < 3) { seen[v.id] = 1; berths.push(v); } });
            } else {
                berths = VENUES.filter(v => v.tier === 'berth_top').sort((a, b) => a.priority - b.priority);
            }
            target.innerHTML = berths.map((v, i) => {
                const tags = (v.tags || []).map(t => '<span>' + escapeHTML(t) + '</span>').join('');
                const meta = [];
                if (v.neighborhood) meta.push('Neighborhood: ' + escapeHTML(v.neighborhood));
                if (v.address) meta.push('Address: ' + escapeHTML(v.address));
                if (v.phone)   meta.push('Phone: <a href="' + telHref(v.phone) + '">' + escapeHTML(v.phone) + '</a>');
                if (v.email)   meta.push('Email: <a href="mailto:' + escapeHTML(v.email) + '">' + escapeHTML(v.email) + '</a>');
                if (v.maps)    meta.push('<a href="' + escapeHTML(v.maps) + '" target="_blank" rel="noopener">Open in Google Maps →</a>');
                const products = productPills(v.productTags);
                const nbhd = v.neighborhood ? ' <span class="terroir-berth__nbhd" style="font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--accent);opacity:.85;">· ' + escapeHTML(v.neighborhood) + '</span>' : '';
                return '<div class="terroir-berth" id="venue-' + v.id + '" data-venue-id="' + v.id + '">' +
                    '<span class="terroir-berth__rank">#' + (i+1) + ' &middot; ' + escapeHTML(v.short || v.name) + '</span>' +
                    (v.badge ? '<span class="terroir-berth__badge">' + escapeHTML(v.badge) + '</span>' : '') +
                    '<div class="terroir-berth__name">' + escapeHTML(v.name) + gemChip(v) + nbhd + '</div>' +
                    gemCosign(v) + gemPerson(v) + gemSignature(v) +
                    (products ? '<div class="terroir-berth__products">' + products + '</div>' : '') +
                    '<div class="terroir-berth__tags">' + tags + '</div>' +
                    gemVerdict(v) +
                    '<p class="terroir-berth__why">' + escapeHTML(v.why) + '</p>' +
                    gemCaveat(v) +
                    '<div class="terroir-berth__meta">' + meta.map(m => '<div>' + m + '</div>').join('') + '</div>' +
                    '</div>';
            }).join('');
        }

        // ---------- Render tier card
        function renderCard(v, rank) {
            const userVoted = localVotes[v.id] === true;
            const count = voteCounts[v.id] || 0;
            const badge = v.badge ? '<span class="badge">' + escapeHTML(v.badge) + '</span>' : '';
            const offCity = v.online ? '<span class="badge" style="background:#0ea5e9;color:#fff;">SHIPS IN</span>' : '';
            const tags = (v.tags || []).map(t => '<span>' + escapeHTML(t) + '</span>').join('');
            const products = productPills(v.productTags);
            const meta = [];
            if (v.neighborhood) meta.push('<div class="terroir-card__meta-row"><span>Neighborhood</span><span>' + escapeHTML(v.neighborhood) + '</span></div>');
            if (v.address) meta.push('<div class="terroir-card__meta-row"><span>Address</span><span>' + escapeHTML(v.address) + '</span></div>');
            if (v.phone)   meta.push('<div class="terroir-card__meta-row"><span>Phone</span><span><a href="' + telHref(v.phone) + '">' + escapeHTML(v.phone) + '</a></span></div>');
            if (v.email)   meta.push('<div class="terroir-card__meta-row"><span>Email</span><span><a href="mailto:' + escapeHTML(v.email) + '">' + escapeHTML(v.email) + '</a></span></div>');
            if (v.hours)   meta.push('<div class="terroir-card__meta-row"><span>Hours</span><span>' + escapeHTML(v.hours) + '</span></div>');
            if (v.web)     meta.push('<div class="terroir-card__meta-row"><span>Web</span><span><a href="' + escapeHTML(v.web) + '" target="_blank" rel="noopener">' + escapeHTML(v.web.replace(/^https?:\/\//,'').replace(/\/$/,'')) + '</a></span></div>');
            if (v.maps)    meta.push('<div class="terroir-card__meta-row"><span>Maps</span><span><a href="' + escapeHTML(v.maps) + '" target="_blank" rel="noopener">Open in Google Maps &rarr;</a></span></div>');
            const nbhdInline = v.neighborhood ? ' <span class="terroir-card__nbhd" style="font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--ink-mut);font-weight:400;">· ' + escapeHTML(v.neighborhood) + '</span>' : '';
            return '<article class="terroir-card" data-venue-id="' + v.id + '" data-cat="' + v.cat + '" id="venue-' + v.id + '">' +
                '<div class="terroir-card__rank">#' + rank + '</div>' +
                '<div class="terroir-card__body">' +
                    '<div class="terroir-card__cat">' + (CAT_LABELS[v.cat] || v.cat) + '</div>' +
                    '<div class="terroir-card__name">' + escapeHTML(v.name) + badge + gemChip(v) + gemDrinkType(v) + offCity + nbhdInline + '</div>' +
                    ((gemSubcat(v)||gemMoneyEats(v)) ? '<div class="terroir-card__chiprow">' + gemSubcat(v) + gemMoneyEats(v) + '</div>' : '') +
                    gemCosign(v) + gemPerson(v) + gemSignature(v) +
                    (products ? '<div class="terroir-card__products">' + products + '</div>' : '') +
                    (tags ? '<div class="terroir-card__tags">' + tags + '</div>' : '') +
                    gemVerdict(v) +
                    '<div class="terroir-card__why">' + escapeHTML(v.why) + '</div>' +
                    gemCaveat(v) +
                    '<div class="terroir-card__meta">' + meta.join('') + '</div>' +
                '</div>' +
                '<div class="terroir-card__vote">' +
                    '<button class="terroir-vote-btn ' + (userVoted ? 'is-voted' : '') + '" data-vote="' + v.id + '" aria-label="Upvote ' + escapeHTML(v.name) + '" title="' + (userVoted ? 'Remove vote' : 'Vote: I used this and it worked') + '">' +
                        (userVoted ? '★' : '☆') +
                    '</button>' +
                    '<span class="count" data-count="' + v.id + '">' + count + '</span>' +
                    '<span class="label">votes</span>' +
                '</div>' +
            '</article>';
        }
        function renderTier(tierKey) {
            const list = VENUES.filter(v => v.tier === tierKey).slice().sort((a, b) => {
                const va = voteCounts[a.id] || 0, vb = voteCounts[b.id] || 0;
                if (vb !== va) return vb - va;
                return a.priority - b.priority;
            });
            const target = document.getElementById('terroir-list-' + tierKey);
            if (!target) return;
            target.innerHTML = list.map((v, i) => renderCard(v, i + 1)).join('');
        }
        const CATEGORIES = [
            {key:'creme', label:'La Cr\u00e8me de la Cr\u00e8me', lead:'The best tables in the city \u2014 book ahead, dress for it, expect the bill.'},
            {key:'authentique', label:'L\u2019Authentique', lead:'Where Barcelona actually eats \u2014 old houses, market counters, the smart-money rooms.'},
            {key:'story', label:'The Story', lead:'Cult rooms where a dish or a century was born \u2014 go for the tale as much as the plate.'},
            {key:'cult', label:'Local cult favourites', lead:'The humble institutions locals are devoted to \u2014 cash, queues, and a cult object worth both.'},
            {key:'quickbites', label:'Quick Bites', lead:'The honest fast plate \u2014 top-ranked burgers and kebab, no white tablecloth.'}
        ];
        function renderCardCompact(v, rank) {
            var badge = v.badge ? '<span class="badge">' + escapeHTML(v.badge) + '</span>' : '';
            var sig = v.signature ? '<div class="tcm__sig"><span class="tsig">\u2605</span> ' + escapeHTML(v.signature) + '</div>' : '';
            var products = productPills(v.productTags);
            var tags = (v.tags || []).map(function (t) { return '<span>' + escapeHTML(t) + '</span>'; }).join('');
            var meta = [];
            if (v.neighborhood) meta.push('<div class="terroir-card__meta-row"><span>Neighborhood</span><span>' + escapeHTML(v.neighborhood) + '</span></div>');
            if (v.address) meta.push('<div class="terroir-card__meta-row"><span>Address</span><span>' + escapeHTML(v.address) + '</span></div>');
            if (v.phone)   meta.push('<div class="terroir-card__meta-row"><span>Phone</span><span><a href="' + telHref(v.phone) + '">' + escapeHTML(v.phone) + '</a></span></div>');
            if (v.hours)   meta.push('<div class="terroir-card__meta-row"><span>Hours</span><span>' + escapeHTML(v.hours) + '</span></div>');
            if (v.web)     meta.push('<div class="terroir-card__meta-row"><span>Web</span><span><a href="' + escapeHTML(v.web) + '" target="_blank" rel="noopener">' + escapeHTML(v.web.replace(/^https?:\/\//,'').replace(/\/$/,'')) + '</a></span></div>');
            if (v.maps)    meta.push('<div class="terroir-card__meta-row"><span>Maps</span><span><a href="' + escapeHTML(v.maps) + '" target="_blank" rel="noopener">Open in Google Maps \u2192</a></span></div>');
            return '<details class="terroir-card terroir-card--fold gx-favable" id="venue-' + v.id + '" data-venue-id="' + v.id + '" data-cat="' + v.cat + '">' +
                '<summary class="tcm">' +
                    '<span class="tcm__top">' +
                        '<span class="tcm__rank">#' + rank + '</span>' +
                        '<span class="tcm__name">' + escapeHTML(v.name) + '</span>' + badge + gemChip(v) + gemSubcat(v) + gemMoneyEats(v) +
                        '<span class="tcm__chev" aria-hidden="true"></span>' +
                    '</span>' +
                    sig +
                '</summary>' +
                '<div class="terroir-card__body">' +
                    gemCosign(v) + gemPerson(v) + gemVerdict(v) +
                    (v.why ? '<div class="terroir-card__why">' + escapeHTML(v.why) + '</div>' : '') +
                    gemCaveat(v) +
                    (products ? '<div class="terroir-card__products">' + products + '</div>' : '') +
                    (tags ? '<div class="terroir-card__tags">' + tags + '</div>' : '') +
                    '<div class="terroir-card__meta">' + meta.join('') + '</div>' +
                '</div>' +
            '</details>';
        }
        function renderCategories() {
            const box = document.querySelector('#tables .sfold__body'); if (!box) return;
            const GROUPS = [
                {key:'grande', label:'Les Grandes Tables', lead:'Haute gastronomy \u2014 the ambitious kitchens, the tasting menus, the splurge.'},
                {key:'petite', label:'Les Petites Tables', lead:'Character over ambition, and every bit as interesting \u2014 where the city actually eats.'}
            ];
            const GROUP_OF = {creme:'grande', rising:'grande', authentique:'petite', story:'petite', cult:'petite', quickbites:'petite'};
            function catBlock(c){
                const list = VENUES.filter(function(v){return v.category===c.key;}).slice().sort(function(a,b){
                    const va=voteCounts[a.id]||0, vb=voteCounts[b.id]||0; if(vb!==va) return vb-va; return (a.priority||99)-(b.priority||99);
                });
                if(!list.length) return '';
                return '<div class="terroir-cat" id="cat-'+c.key+'">' +
                    '<div class="terroir-cat__head"><h4 class="terroir-cat__title">'+escapeHTML(c.label)+'</h4>' +
                    '<div class="terroir-cat__lead">'+escapeHTML(c.lead)+'</div>' +
                    '<span class="terroir-cat__count">'+list.length+'</span></div>' +
                    '<div class="terroir-tier__list">' + list.map(function(v,i){return renderCardCompact(v,i+1);}).join('') + '</div></div>';
            }
            let html = '';
            GROUPS.forEach(function(g){
                const inner = CATEGORIES.filter(function(c){return (GROUP_OF[c.key]||'petite')===g.key;}).map(catBlock).join('');
                if(!inner) return;
                html += '<div class="terroir-group"><div class="terroir-group__title">'+escapeHTML(g.label)+'</div><div class="terroir-group__lead">'+escapeHTML(g.lead)+'</div></div>' + inner;
            });
            box.innerHTML = html;
        }
        function wireVenueLinks() {
            function openVenue(id) {
                var el = document.getElementById('venue-' + id);
                if (!el) return false;
                if (el.tagName === 'DETAILS') el.open = true;
                var box = el.closest('details.sfold'); if (box) box.open = true;
                el.classList.add('is-flash');
                setTimeout(function () { el.classList.remove('is-flash'); }, 1500);
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return true;
            }
            document.addEventListener('click', function (e) {
                var a = e.target.closest && e.target.closest('a[href^="#venue-"]');
                if (!a) return;
                var id = a.getAttribute('href').replace('#venue-', '');
                if (openVenue(id)) { e.preventDefault(); try { history.replaceState(null, '', '#venue-' + id); } catch (x) {} }
            });
            if (location.hash.indexOf('#venue-') === 0) setTimeout(function () { openVenue(location.hash.replace('#venue-', '')); }, 350);
        }
        function renderAll() {
            const useCat = VENUES.some(function(v){return v.category;});
            if (useCat) { renderCategories(); }
            else { renderBerths(); renderTier('notime'); renderTier('several'); renderTier('plenty'); }
            wireVoteButtons();
            wireScrollSpy();
            wireHoverHighlight();
            wireVenueLinks();
        }

        // ---------- Voting (Firestore + localStorage)
        const VOTES_DOC = (typeof db !== 'undefined') ? db.collection('terroir_inventory_votes').doc(ARTICLE_ID) : null;
        function wireVoteButtons() {
            document.querySelectorAll('.terroir-vote-btn').forEach(btn => {
                btn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    const id = btn.getAttribute('data-vote');
                    const wasVoted = localVotes[id] === true;
                    const delta = wasVoted ? -1 : 1;
                    voteCounts[id] = (voteCounts[id] || 0) + delta;
                    if (wasVoted) { delete localVotes[id]; } else { localVotes[id] = true; }
                    saveLocalVotes();
                    renderAll();
                    if (VOTES_DOC && typeof firebase !== 'undefined' && firebase.firestore) {
                        VOTES_DOC.set({
                            [id]: firebase.firestore.FieldValue.increment(delta)
                        }, { merge: true }).catch(err => console.warn('Terroir inventory vote persist failed:', err));
                    }
                });
            });
        }
        function subscribeVotes() {
            if (!VOTES_DOC) return;
            VOTES_DOC.onSnapshot(snap => {
                const data = snap.data() || {};
                let changed = false;
                VENUES.forEach(v => {
                    const remote = typeof data[v.id] === 'number' ? data[v.id] : 0;
                    if (voteCounts[v.id] !== remote) { voteCounts[v.id] = Math.max(0, remote); changed = true; }
                });
                if (changed) renderAll();
            }, err => console.warn('Terroir inventory votes subscribe failed:', err));
        }

        // ====================================================================
        // BIG MAP — numbered DivIcon markers, Voyager tiles, hover-to-highlight
        // ====================================================================
        let bigMap = null;
        const bigMarkers = {};

        function initBigMap() {
            if (typeof L === 'undefined') return;
            const mapEl = document.getElementById('terroir-inv-map');
            if (!mapEl) return;
            bigMap = L.map('terroir-inv-map', { zoomControl: true, scrollWheelZoom: false, attributionControl: true })
                .setView(cfg.center || [0, 0], cfg.zoom || 13);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                maxZoom: 19, subdomains: 'abcd'
            }).addTo(bigMap);

            const layers = { berth:L.layerGroup(), market:L.layerGroup(), shop:L.layerGroup(), mainland:L.layerGroup(), logistics:L.layerGroup() };
            const order = ['berth','market','shop','mainland','logistics'];
            const numbered = VENUES.slice().sort((a,b) => order.indexOf(a.cat) - order.indexOf(b.cat));

            numbered.forEach((v, idx) => {
                const num = idx + 1;
                const icon = L.divIcon({
                    className: '',
                    html: '<div class="terroir-inv-pin cat-' + v.cat + '">' + num + '</div>',
                    iconSize: [28, 28], iconAnchor: [14, 14]
                });
                const marker = L.marker([v.lat, v.lng], { icon: icon, riseOnHover: true });
                marker.bindTooltip(v.short || v.name, {
                    className: 'terroir-inv-label', direction: 'right', offset: [16, 0], permanent: false, opacity: 1
                });
                const phoneRow = v.phone ? '<span class="terroir-inv-pop-meta">Phone: <a href="' + telHref(v.phone) + '">' + escapeHTML(v.phone) + '</a></span>' : '';
                const tagRow = (v.tags && v.tags.length)
                    ? '<span class="terroir-inv-pop-meta" style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8">' + v.tags.slice(0,4).map(escapeHTML).join(' &middot; ') + '</span>' : '';
                marker.bindPopup(
                    '<span class="terroir-inv-pop-cat">' + (CAT_LABELS[v.cat] || v.cat) + '</span>' +
                    '<span class="terroir-inv-pop-title">' + num + '. ' + escapeHTML(v.name) + '</span>' +
                    tagRow + phoneRow +
                    (v.maps ? '<a href="' + escapeHTML(v.maps) + '" target="_blank" rel="noopener">Open in Google Maps &rarr;</a>' : '')
                );
                marker.addTo(layers[v.cat] || layers.shop);
                bigMarkers[v.id] = { marker: marker, num: num };
                marker.on('mouseover', () => setActive(v.id));
                marker.on('click', () => setActive(v.id));
            });

            Object.values(layers).forEach(l => l.addTo(bigMap));
            try {
                const bpts = inCityVenues.length ? inCityVenues : VENUES;
                bigMap.fitBounds(bpts.map(v => [v.lat, v.lng]), { padding: [40, 40], maxZoom: 14 });
            } catch (e) {}
            bigMap.once('focus', () => bigMap.scrollWheelZoom.enable());
            bigMap.on('click', () => bigMap.scrollWheelZoom.enable());

            document.querySelectorAll('#terroir-inv-legend button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const cat = btn.getAttribute('data-cat');
                    const layer = layers[cat];
                    if (!layer) return;
                    if (bigMap.hasLayer(layer)) { bigMap.removeLayer(layer); btn.classList.add('is-off'); }
                    else { bigMap.addLayer(layer); btn.classList.remove('is-off'); }
                });
            });
        }

        // ====================================================================
        // STICKY MINI-MAP — zoomable, hover-light-up, foldable
        // ====================================================================
        let miniMap = null;
        const miniMarkers = {};
        let activeId = null;

        function initMiniMap() {
            if (typeof L === 'undefined') return;
            const el = document.getElementById('terroir-inv-mini-map');
            if (!el) return;
            miniMap = L.map('terroir-inv-mini-map', {
                zoomControl: true, zoomControlOptions: { position: 'topright' },
                scrollWheelZoom: true, doubleClickZoom: true, touchZoom: true,
                dragging: true, attributionControl: false
            }).setView(cfg.center || [0, 0], (cfg.zoom || 13) - 1);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                maxZoom: 19, subdomains: 'abcd'
            }).addTo(miniMap);

            VENUES.forEach(v => {
                const color = COLORS[v.cat] || '#444';
                const marker = L.circleMarker([v.lat, v.lng], {
                    radius: 5, fillColor: color, color: '#0a0a0a',
                    weight: 1, opacity: 0.85, fillOpacity: 0.85
                }).addTo(miniMap);
                marker.on('click', () => focusVenue(v.id, true));
                marker.on('mouseover', () => setActive(v.id));
                miniMarkers[v.id] = marker;
            });
            try {
                const bpts = inCityVenues.length ? inCityVenues : VENUES;
                miniMap.fitBounds(bpts.map(v => [v.lat, v.lng]), { padding: [12, 12], maxZoom: 14 });
            } catch (e) {}
        }

        function setActive(id) {
            if (activeId === id) return;
            if (activeId && miniMarkers[activeId]) {
                const v0 = VENUES.find(v => v.id === activeId);
                if (v0) miniMarkers[activeId].setStyle({
                    radius: 5, fillColor: COLORS[v0.cat] || '#444', color: '#0a0a0a',
                    weight: 1, opacity: 0.85, fillOpacity: 0.85
                });
            }
            if (activeId && bigMarkers[activeId]) {
                const el = bigMarkers[activeId].marker.getElement();
                if (el) { const pin = el.querySelector('.terroir-inv-pin'); if (pin) pin.classList.remove('is-active'); }
            }
            if (activeId) {
                document.querySelectorAll('[data-venue-id="' + activeId + '"]').forEach(c => c.classList.remove('is-hover'));
            }
            if (id && miniMarkers[id]) {
                const v = VENUES.find(x => x.id === id);
                miniMarkers[id].setStyle({
                    radius: 10, fillColor: '#fafafa', color: COLORS[v.cat] || '#444',
                    weight: 3, opacity: 1, fillOpacity: 1
                });
                miniMarkers[id].bringToFront();
                if (miniMap) miniMap.panTo([v.lat, v.lng], { animate: true, duration: 0.6 });
                if (bigMarkers[id]) {
                    const el = bigMarkers[id].marker.getElement();
                    if (el) { const pin = el.querySelector('.terroir-inv-pin'); if (pin) pin.classList.add('is-active'); }
                }
                document.querySelectorAll('[data-venue-id="' + id + '"]').forEach(c => c.classList.add('is-hover'));
                const cardFor = document.querySelector('[data-venue-id="' + id + '"]');
                const rankEl = cardFor ? cardFor.querySelector('.terroir-card__rank') : null;
                const rank = rankEl ? rankEl.textContent : '';
                const phoneTxt = v.phone ? '<a href="' + telHref(v.phone) + '">' + escapeHTML(v.phone) + '</a> · ' : '';
                const active = document.getElementById('terroir-inv-mini-active');
                if (active) active.innerHTML =
                    '<b>' + (rank ? rank + ' · ' : '') + (CAT_LABELS[v.cat] || v.cat) + '</b>' +
                    '<span><strong style="color:#fafafa">' + escapeHTML(v.name) + '</strong><br>' +
                    phoneTxt +
                    (v.maps ? '<a href="' + escapeHTML(v.maps) + '" target="_blank" rel="noopener">Open map →</a>' : '') +
                    '</span>';
            }
            activeId = id;
        }

        function focusVenue(id, scrollTo) { // open-on-focus
            setActive(id);
            var card = document.getElementById('venue-' + id);
            if (card) {
                if (card.tagName === 'DETAILS') card.open = true;
                var box = card.closest && card.closest('details.sfold'); if (box) box.open = true;
            }
            if (scrollTo && card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function wireScrollSpy() {
            if (!('IntersectionObserver' in window)) return;
            const cards = document.querySelectorAll('[data-venue-id]');
            const observed = new Map();
            const io = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) observed.set(e.target, e.intersectionRatio);
                    else observed.delete(e.target);
                });
                let best = null, bestRatio = 0;
                observed.forEach((ratio, el) => { if (ratio > bestRatio) { best = el; bestRatio = ratio; } });
                if (best) { setActive(best.getAttribute('data-venue-id')); showMini(); }
            }, { rootMargin: '-30% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
            cards.forEach(c => io.observe(c));
        }

        function wireHoverHighlight() {
            const targets = document.querySelectorAll('[data-venue-id]');
            targets.forEach(el => {
                const id = el.getAttribute('data-venue-id');
                el.addEventListener('mouseenter', () => { setActive(id); showMini(); el.classList.add('is-hover'); });
                el.addEventListener('mouseleave', () => { el.classList.remove('is-hover'); });
                el.addEventListener('click', (ev) => {
                    if (ev.target.closest('.terroir-card__vote') || ev.target.closest('a') || ev.target.closest('button')) return;
                    setActive(id); showMini();
                });
            });
        }

        function initMiniMapPanel() {
            const panel = document.getElementById('terroir-inv-mini');
            const handle = document.getElementById('terroir-inv-mini-handle');
            if (!panel || !handle) return;
            const bigMapEl = document.getElementById('terroir-inv-map');
            if (bigMapEl) {
                const showIO = new IntersectionObserver(entries => {
                    entries.forEach(e => {
                        if (e.isIntersecting) panel.classList.add('is-hidden');
                        else panel.classList.remove('is-hidden');
                    });
                }, { rootMargin: '0px', threshold: 0 });
                showIO.observe(bigMapEl);
            }
            handle.addEventListener('click', () => {
                const collapsed = panel.classList.toggle('is-collapsed');
                handle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
                if (!collapsed && miniMap) setTimeout(() => miniMap.invalidateSize(), 320);
            });
        }
        function showMini() {
            const panel = document.getElementById('terroir-inv-mini');
            if (!panel) return;
            if (panel.classList.contains('is-collapsed') && !panel.dataset.userClosed) {
                panel.classList.remove('is-collapsed');
                const h = document.getElementById('terroir-inv-mini-handle');
                if (h) h.setAttribute('aria-expanded', 'true');
                setTimeout(() => { if (miniMap) miniMap.invalidateSize(); }, 320);
            }
        }

        renderAll();
        initBigMap();
        initMiniMap();
        initMiniMapPanel();
        subscribeVotes();

        // Re-rank the blue top-3 by reader ♡ as favourites counts load / change.
        (function hookFav(n) {
            if (window.TerroirFav && window.TerroirFav.onChange) {
                window.TerroirFav.onChange(renderBerths); renderBerths(); return;
            }
            if ((n || 0) < 40) setTimeout(function () { hookFav((n || 0) + 1); }, 150);
        })(0);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
