/**
 * Littoralicious — The Spoon Lab
 * Single source of truth for the lab chrome, on every page:
 *   1. the corner spoon button + panel listing every tool, and
 *   2. the "simmering" badge + feedback popover on tool pages.
 * Publication pages load this via main.js (initToolsWidget); tool pages
 * include it directly with a <script> tag.
 * Served immutable (1-year cache) — when you edit this file, bump the ?v=
 * in main.js AND in each tool page's <script src> or nobody sees the change.
 */
(function () {
    'use strict';

    var WHATSAPP = '33695903520';
    var EMAIL = 'arnaudcallier@pm.me';

    function waLink(tool) {
        return 'https://wa.me/' + WHATSAPP + '?text=' +
            encodeURIComponent('Spoon Lab · ' + tool + ' — ');
    }
    function mailLink(tool) {
        return 'mailto:' + EMAIL + '?subject=' +
            encodeURIComponent('Spoon Lab · ' + tool);
    }

    /* ---------------------------------------------------------------- *
     *  The Spoon Lab panel
     * ---------------------------------------------------------------- */

    function initWidget() {
        if (document.querySelector('.tools-widget')) return;

        var css = '' +
            '.tools-widget {' +
            '    position: fixed;' +
            '    right: 18px;' +
            '    bottom: 18px;' +
            '    z-index: 90;' +
            '    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);' +
            '}' +
            '.tools-widget-btn {' +
            '    display: flex;' +
            '    align-items: center;' +
            '    justify-content: center;' +
            '    width: 56px;' +
            '    height: 56px;' +
            '    background: none;' +
            '    border: none;' +
            '    padding: 2px;' +
            '    color: var(--color-ink, #0a0a0a);' +
            '    cursor: pointer;' +
            '    transition: transform 200ms ease;' +
            '}' +
            '.tools-widget-btn svg {' +
            '    width: 100%;' +
            '    height: 100%;' +
            '    animation: spoon-glow 2.8s ease-in-out infinite;' +
            '}' +
            '@keyframes spoon-glow {' +
            '    0%, 100% { opacity: 0.72; filter: drop-shadow(0 1px 2px rgba(10, 10, 10, 0.22)); }' +
            '    50% { opacity: 1; filter: drop-shadow(0 1px 2px rgba(10, 10, 10, 0.22)) drop-shadow(0 0 6px rgba(45, 74, 94, 0.5)); }' +
            '}' +
            '@media (prefers-reduced-motion: reduce) {' +
            '    .tools-widget-btn svg { animation: none; opacity: 1; filter: drop-shadow(0 1px 2px rgba(10, 10, 10, 0.22)); }' +
            '}' +
            '.tools-widget-btn:hover { transform: translateY(-2px) rotate(-5deg); }' +
            '.tools-widget-btn:hover svg,' +
            '.tools-widget-btn:focus-visible svg,' +
            '.tools-widget[data-open="true"] .tools-widget-btn svg {' +
            '    animation: none;' +
            '    opacity: 1;' +
            '    filter: drop-shadow(0 1px 2px rgba(10, 10, 10, 0.22)) drop-shadow(0 0 7px rgba(45, 74, 94, 0.55));' +
            '}' +
            '.tools-widget-btn:focus-visible {' +
            '    outline: 2px solid var(--color-sea, #2d4a5e);' +
            '    outline-offset: 4px;' +
            '    border-radius: 50%;' +
            '}' +
            '.tools-widget[data-open="true"] .tools-widget-btn {' +
            '    color: var(--color-sea, #2d4a5e);' +
            '}' +
            '.tools-widget-panel {' +
            '    position: absolute;' +
            '    bottom: 60px;' +
            '    right: 0;' +
            '    min-width: 312px;' +
            '    background: var(--color-paper, #fafafa);' +
            '    border: 1px solid var(--color-ink, #0a0a0a);' +
            '    box-shadow: 4px 4px 0 rgba(10, 10, 10, 0.10);' +
            '    transform-origin: bottom right;' +
            '    transform: scale(0.92) translateY(8px);' +
            '    opacity: 0;' +
            '    pointer-events: none;' +
            '    transition: transform 200ms ease, opacity 200ms ease;' +
            '}' +
            '.tools-widget[data-open="true"] .tools-widget-panel {' +
            '    transform: scale(1) translateY(0);' +
            '    opacity: 1;' +
            '    pointer-events: auto;' +
            '}' +
            '.tools-widget-panel-header {' +
            '    padding: 14px 18px 8px;' +
            '    border-bottom: 1px solid var(--color-border, #e2e2e2);' +
            '}' +
            '.tools-widget-panel-eyebrow {' +
            '    font-family: "SF Mono", Consolas, monospace;' +
            '    font-size: 9.5px;' +
            '    letter-spacing: 0.2em;' +
            '    text-transform: uppercase;' +
            '    color: var(--color-sea, #2d4a5e);' +
            '    margin: 0 0 3px;' +
            '}' +
            '.tools-widget-panel-title {' +
            '    font-family: Georgia, serif;' +
            '    font-size: 18px;' +
            '    line-height: 1.2;' +
            '    margin: 0;' +
            '    color: var(--color-ink, #0a0a0a);' +
            '    font-weight: 400;' +
            '    letter-spacing: -0.005em;' +
            '}' +
            '.tools-widget-list { list-style: none; margin: 0; padding: 4px 0 6px; }' +
            '.tools-widget-list li { margin: 0; }' +
            '.tools-widget-link {' +
            '    display: flex;' +
            '    gap: 12px;' +
            '    align-items: flex-start;' +
            '    padding: 10px 18px;' +
            '    color: var(--color-ink, #0a0a0a);' +
            '    text-decoration: none;' +
            '    border-bottom: 1px solid transparent;' +
            '    transition: background 120ms ease;' +
            '}' +
            '.tools-widget-link:hover,' +
            '.tools-widget-link:focus-visible {' +
            '    background: rgba(45, 74, 94, 0.06);' +
            '    outline: none;' +
            '}' +
            '.tools-widget-link[aria-disabled="true"] {' +
            '    opacity: 0.55;' +
            '    cursor: default;' +
            '    pointer-events: none;' +
            '}' +
            '.tools-widget-link[data-current="true"] {' +
            '    background: rgba(45, 74, 94, 0.10);' +
            '    cursor: default;' +
            '    pointer-events: none;' +
            '}' +
            '.tools-widget-link[data-current="true"] .tools-widget-link-title::after {' +
            '    content: " · here";' +
            '    font-family: "SF Mono", Consolas, monospace;' +
            '    font-size: 10px;' +
            '    color: var(--color-sea, #2d4a5e);' +
            '    letter-spacing: 0.08em;' +
            '    font-weight: 500;' +
            '}' +
            '.tools-widget-link-icon {' +
            '    flex-shrink: 0;' +
            '    width: 22px;' +
            '    height: 22px;' +
            '    color: var(--color-sea, #2d4a5e);' +
            '    margin-top: 2px;' +
            '}' +
            '.tools-widget-link-icon svg { width: 100%; height: 100%; }' +
            '.tools-widget-link-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }' +
            '.tools-widget-link-title {' +
            '    font-family: Georgia, serif;' +
            '    font-size: 14px;' +
            '    font-weight: 600;' +
            '    color: var(--color-ink, #0a0a0a);' +
            '    line-height: 1.25;' +
            '}' +
            '.tools-widget-link-desc {' +
            '    font-size: 11.5px;' +
            '    color: var(--color-muted, #6b7280);' +
            '    line-height: 1.35;' +
            '}' +
            '.tools-widget-link-tag {' +
            '    font-family: "SF Mono", Consolas, monospace;' +
            '    font-size: 8.5px;' +
            '    letter-spacing: 0.12em;' +
            '    text-transform: uppercase;' +
            '    color: var(--color-sea, #2d4a5e);' +
            '    border: 1px solid var(--color-border, #e2e2e2);' +
            '    padding: 1px 5px;' +
            '    margin-left: 6px;' +
            '    vertical-align: middle;' +
            '    font-weight: 500;' +
            '    white-space: nowrap;' +
            '}' +
            '.tools-widget-foot {' +
            '    border-top: 1px solid var(--color-border, #e2e2e2);' +
            '    padding: 10px 18px 12px;' +
            '}' +
            '.tools-widget-foot-text {' +
            '    font-size: 11px;' +
            '    line-height: 1.45;' +
            '    color: var(--color-muted, #6b7280);' +
            '    margin: 0 0 8px;' +
            '}' +
            '.tools-widget-foot-text b { color: var(--color-ink, #0a0a0a); font-weight: 600; }' +
            '.tools-widget-foot-actions { display: flex; gap: 8px; }' +
            '.tools-widget-contact {' +
            '    flex: 1;' +
            '    display: inline-flex;' +
            '    align-items: center;' +
            '    justify-content: center;' +
            '    gap: 6px;' +
            '    font-family: "SF Mono", Consolas, monospace;' +
            '    font-size: 10px;' +
            '    letter-spacing: 0.1em;' +
            '    text-transform: uppercase;' +
            '    color: var(--color-ink, #0a0a0a);' +
            '    background: transparent;' +
            '    border: 1px solid var(--color-ink, #0a0a0a);' +
            '    padding: 7px 8px;' +
            '    text-decoration: none;' +
            '    transition: background 120ms ease, color 120ms ease;' +
            '}' +
            '.tools-widget-contact:hover,' +
            '.tools-widget-contact:focus-visible {' +
            '    background: var(--color-sea, #2d4a5e);' +
            '    color: #fafafa;' +
            '    outline: none;' +
            '}' +
            '[data-theme="dark"] .tools-widget-btn { color: var(--color-paper, #fafafa); }' +
            '[data-theme="dark"] .tools-widget-panel {' +
            '    background: var(--color-paper, #1a1a1a);' +
            '    border-color: var(--color-paper, #fafafa);' +
            '}' +
            '@media print { .tools-widget { display: none !important; } }' +
            '@media (max-width: 480px) {' +
            '    .tools-widget { right: 12px; bottom: 12px; }' +
            '    .tools-widget-btn { width: 50px; height: 50px; }' +
            '    .tools-widget-panel { min-width: 272px; bottom: 56px; }' +
            '}';

        // The spoon — a real teaspoon, no box around it: filled egg-shaped
        // bowl, slender neck, long handle flaring into a rounded end. Tilted
        // like it was just set down; a soft breathing glow does the flashing.
        var spoonSvg = '<svg viewBox="0 0 64 64" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<g transform="rotate(-14 32 32)">' +
            '<path d="M32 6 C 27.2 6, 24.5 10.6, 24.5 15.7 C 24.5 21.4, 27.9 25.6, 32 25.6 C 36.1 25.6, 39.5 21.4, 39.5 15.7 C 39.5 10.6, 36.8 6, 32 6 Z"/>' +
            '<path d="M31 25.4 C 31.4 32.5, 30.9 40, 30 47.8 C 29.5 52.2, 30.2 58, 32.2 58 C 34.2 58, 34.9 52.2, 34.4 47.8 C 33.5 40, 33 32.5, 33.4 25.5 Z"/>' +
            '</g>' +
            '</svg>';

        var galleyIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 4 4 H 20 V 20 H 4 Z"/>' +
            '<path d="M 4 8 H 20 M 4 12 H 20 M 4 16 H 20"/>' +
            '<path d="M 16 6 L 18 6 M 16 10 L 18 10 M 16 14 L 18 14"/>' +
            '</svg>';

        var menuIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 6 3 H 18 V 21 H 6 Z"/>' +
            '<path d="M 6 7 H 18"/>' +
            '<path d="M 9 11 H 15 M 9 14 H 15 M 9 17 H 13"/>' +
            '</svg>';

        // Terroir — a map-pin: guides that send you to a place.
        var terroirIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 12 21 C 12 21, 5 14.5, 5 9.5 A 7 7 0 0 1 19 9.5 C 19 14.5, 12 21, 12 21 Z"/>' +
            '<circle cx="12" cy="9.5" r="2.3"/>' +
            '</svg>';

        // Balance scale — fair pay / what you should earn.
        var payIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 12 4 V 20"/>' +
            '<path d="M 8 20 H 16"/>' +
            '<path d="M 5 7 H 19"/>' +
            '<path d="M 5 7 L 3 11.5 H 7 Z"/>' +
            '<path d="M 19 7 L 17 11.5 H 21 Z"/>' +
            '</svg>';

        // Lighthouse — BEACON: first principles that show you where the coast is.
        var beaconIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 10.2 8.6 L 9.2 20 H 14.8 L 13.8 8.6 Z"/>' +
            '<path d="M 10.6 5.6 H 13.4 V 8.6 H 10.6 Z"/>' +
            '<path d="M 10.3 5.6 L 12 3.8 L 13.7 5.6"/>' +
            '<path d="M 8.2 6.9 L 5.4 5.9 M 15.8 6.9 L 18.6 5.9" stroke-width="1.3" opacity="0.6"/>' +
            '<path d="M 9.9 12.4 H 14.1 M 9.6 16 H 14.4" stroke-width="1.2" opacity="0.55"/>' +
            '<path d="M 5.5 20 C 7.5 19.2, 9 20.8, 12 20 C 15 19.2, 16.5 20.8, 18.5 20" stroke-width="1.2" opacity="0.55"/>' +
            '</svg>';

        var wheelIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="9"/>' +
            '<path d="M 12 3 L 12 21 M 3 12 L 21 12 M 5.6 5.6 L 18.4 18.4 M 18.4 5.6 L 5.6 18.4"/>' +
            '<circle cx="12" cy="12" r="2"/>' +
            '</svg>';

        // Detect which tool page we're on so we can mark it as "here"
        var path = location.pathname.replace(/\/index\.html$/i, '').replace(/\/$/, '') || '/';
        var isGalley = /^\/galleyorder/i.test(path);
        var isMenu = /^\/menu/i.test(path);
        var isTerroir = /^\/terroir/i.test(path);
        var isPayCheck = /^\/pay-check/i.test(path);
        var isBeacon = /^\/beacon/i.test(path);
        var hereAttr = function (matches) { return matches ? ' data-current="true" tabindex="-1"' : ''; };

        var simmerTag = '<span class="tools-widget-link-tag">simmering</span>';

        var html = '' +
            '<button class="tools-widget-btn" type="button" id="lit-tools-btn" ' +
                'aria-label="Open the Spoon Lab" aria-expanded="false" aria-controls="lit-tools-panel" ' +
                'title="The Spoon Lab — the tools, built in the open">' +
                spoonSvg +
            '</button>' +
            '<div class="tools-widget-panel" id="lit-tools-panel" role="menu" aria-labelledby="lit-tools-btn">' +
                '<div class="tools-widget-panel-header">' +
                    '<p class="tools-widget-panel-eyebrow">Littoralicious</p>' +
                    '<h3 class="tools-widget-panel-title">The Spoon Lab</h3>' +
                '</div>' +
                '<ul class="tools-widget-list">' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/galleyorder/" role="menuitem"' + hereAttr(isGalley) + '>' +
                            '<span class="tools-widget-link-icon">' + galleyIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Galley Order' + simmerTag + '</span>' +
                                '<span class="tools-widget-link-desc">3,200+ items · mainstream-only auto-fill · A4 print</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/menu/" role="menuitem"' + hereAttr(isMenu) + '>' +
                            '<span class="tools-widget-link-icon">' + menuIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Menu Planner' + simmerTag + '</span>' +
                                '<span class="tools-widget-link-desc">Charter menus · guest + crew · service order</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/terroir/" role="menuitem"' + hereAttr(isTerroir) + '>' +
                            '<span class="tools-widget-link-icon">' + terroirIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Terroir' + simmerTag + '</span>' +
                                '<span class="tools-widget-link-desc">Food-culture guides to ports &amp; coasts · eat, drink, walk</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/pay-check/" role="menuitem"' + hereAttr(isPayCheck) + '>' +
                            '<span class="tools-widget-link-icon">' + payIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Pay Check' + simmerTag + '</span>' +
                                '<span class="tools-widget-link-desc">What you should earn · workload scope · A4 cahier des charges</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/beacon/" role="menuitem"' + hereAttr(isBeacon) + '>' +
                            '<span class="tools-widget-link-icon">' + beaconIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Beacon' + simmerTag + '</span>' +
                                '<span class="tools-widget-link-desc">The food business, reduced to first principles · concept lab</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a class="tools-widget-link" href="#" role="menuitem" aria-disabled="true" tabindex="-1">' +
                            '<span class="tools-widget-link-icon">' + wheelIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Pairing Wheel<span class="tools-widget-link-tag">soon</span></span>' +
                                '<span class="tools-widget-link-desc">Wine · spirits · non-alcoholic pairings to dishes</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                '</ul>' +
                '<div class="tools-widget-foot">' +
                    '<p class="tools-widget-foot-text"><b>Everything here is simmering</b> — built in the open, ' +
                        'shaped by the people who use it. Tell me what you’d add, or what’s not working.</p>' +
                    '<div class="tools-widget-foot-actions">' +
                        '<a class="tools-widget-contact" href="' + waLink('the lab') + '" target="_blank" rel="noopener">WhatsApp</a>' +
                        '<a class="tools-widget-contact" href="' + mailLink('the lab') + '">Email</a>' +
                    '</div>' +
                '</div>' +
            '</div>';

        var widget = document.createElement('div');
        widget.className = 'tools-widget';
        widget.dataset.open = 'false';
        widget.innerHTML = html;

        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
        document.body.appendChild(widget);

        var btn = widget.querySelector('#lit-tools-btn');

        var openWidget = function () {
            widget.dataset.open = 'true';
            btn.setAttribute('aria-expanded', 'true');
        };
        var closeWidget = function () {
            widget.dataset.open = 'false';
            btn.setAttribute('aria-expanded', 'false');
        };

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (widget.dataset.open === 'true') closeWidget();
            else openWidget();
        });

        document.addEventListener('click', function (e) {
            if (!widget.contains(e.target)) closeWidget();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && widget.dataset.open === 'true') {
                closeWidget();
                btn.focus();
            }
        });
    }

    /* ---------------------------------------------------------------- *
     *  The "simmering" badge — sewn into each tool's masthead.
     *  Opens a small dialog inviting feedback (WhatsApp / email).
     * ---------------------------------------------------------------- */

    var SIMMER_TOOLS = [
        { match: /^\/galleyorder/i, name: 'Galley Order', sel: '.masthead-title' },
        { match: /^\/menu/i,        name: 'Menu Planner', sel: '.litto-mast-min' },
        { match: /^\/terroir$/i,    name: 'Terroir',      sel: '.masthead__brand' },
        // pay-check's <small> subtitle is display:block — slot the badge in before it
        { match: /^\/pay-check/i,   name: 'Pay Check',    sel: '.masthead-title', before: 'small' },
        { match: /^\/beacon/i,      name: 'Beacon',       sel: '[data-simmer-anchor]' }
    ];

    function initSimmerBadge() {
        if (document.querySelector('.simmer-badge')) return;

        var path = location.pathname.replace(/\/index\.html$/i, '').replace(/\/$/, '') || '/';
        var tool = null;
        for (var i = 0; i < SIMMER_TOOLS.length; i++) {
            if (SIMMER_TOOLS[i].match.test(path)) { tool = SIMMER_TOOLS[i]; break; }
        }
        if (!tool) return;
        var anchor = document.querySelector(tool.sel);
        if (!anchor) return;

        var css = '' +
            '.simmer-badge {' +
            '    display: inline-flex;' +
            '    align-items: center;' +
            '    gap: 5px;' +
            '    font-family: "SF Mono", Consolas, monospace;' +
            '    font-size: 9px;' +
            '    letter-spacing: 0.14em;' +
            '    text-transform: uppercase;' +
            '    font-weight: 500;' +
            '    color: var(--color-sea, #2d4a5e);' +
            '    background: #fafafa;' +
            '    border: 1px solid var(--color-sea, #2d4a5e);' +
            '    padding: 3px 8px;' +
            '    margin: 0 0 0 10px;' +
            '    cursor: pointer;' +
            '    vertical-align: middle;' +
            '    line-height: 1;' +
            '    transition: background 120ms ease, color 120ms ease;' +
            '}' +
            '.simmer-badge:hover, .simmer-badge:focus-visible {' +
            '    background: var(--color-sea, #2d4a5e);' +
            '    color: #fafafa;' +
            '    outline: none;' +
            '}' +
            '.simmer-badge-bubbles { display: inline-flex; align-items: flex-end; gap: 2px; height: 8px; }' +
            '.simmer-badge-bubbles i {' +
            '    width: 3px; height: 3px; border-radius: 50%;' +
            '    background: currentColor;' +
            '    animation: simmer-rise 2.2s ease-in-out infinite;' +
            '}' +
            '.simmer-badge-bubbles i:nth-child(2) { animation-delay: 0.55s; }' +
            '.simmer-badge-bubbles i:nth-child(3) { animation-delay: 1.15s; }' +
            '@keyframes simmer-rise {' +
            '    0%, 100% { transform: translateY(0); opacity: 0.45; }' +
            '    45% { transform: translateY(-4px); opacity: 1; }' +
            '}' +
            '@media (prefers-reduced-motion: reduce) { .simmer-badge-bubbles i { animation: none; } }' +
            '.simmer-dialog-backdrop {' +
            '    position: fixed; inset: 0; z-index: 240;' +
            '    background: rgba(10, 10, 10, 0.32);' +
            '    display: none;' +
            '}' +
            '.simmer-dialog-backdrop[data-open="true"] { display: block; }' +
            '.simmer-dialog {' +
            '    position: fixed; z-index: 250;' +
            '    top: 50%; left: 50%;' +
            '    transform: translate(-50%, -50%);' +
            '    width: min(400px, calc(100vw - 32px));' +
            '    background: #fafafa;' +
            '    color: #0a0a0a;' +
            '    border: 1px solid #0a0a0a;' +
            '    box-shadow: 5px 5px 0 rgba(10, 10, 10, 0.12);' +
            '    padding: 22px 24px 20px;' +
            '    display: none;' +
            '    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);' +
            '}' +
            '.simmer-dialog[data-open="true"] { display: block; }' +
            '.simmer-dialog-eyebrow {' +
            '    font-family: "SF Mono", Consolas, monospace;' +
            '    font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase;' +
            '    color: #2d4a5e; margin: 0 0 6px;' +
            '}' +
            '.simmer-dialog-title {' +
            '    font-family: Georgia, serif; font-weight: 400;' +
            '    font-size: 21px; line-height: 1.25; margin: 0 0 10px; color: #0a0a0a;' +
            '}' +
            '.simmer-dialog-body {' +
            '    font-size: 13.5px; line-height: 1.55; color: #3f3f3f; margin: 0 0 16px;' +
            '}' +
            '.simmer-dialog-body b { color: #0a0a0a; font-weight: 600; }' +
            '.simmer-dialog-actions { display: flex; gap: 10px; }' +
            '.simmer-dialog-actions a {' +
            '    flex: 1; display: inline-flex; align-items: center; justify-content: center;' +
            '    font-family: "SF Mono", Consolas, monospace;' +
            '    font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase;' +
            '    color: #0a0a0a; border: 1px solid #0a0a0a; background: transparent;' +
            '    padding: 10px 8px; text-decoration: none;' +
            '    transition: background 120ms ease, color 120ms ease;' +
            '}' +
            '.simmer-dialog-actions a:hover, .simmer-dialog-actions a:focus-visible {' +
            '    background: #2d4a5e; color: #fafafa; border-color: #2d4a5e; outline: none;' +
            '}' +
            '.simmer-dialog-close {' +
            '    position: absolute; top: 10px; right: 12px;' +
            '    font-family: Georgia, serif; font-size: 18px; line-height: 1;' +
            '    background: none; border: none; color: #6b7280; cursor: pointer; padding: 4px;' +
            '}' +
            '.simmer-dialog-close:hover, .simmer-dialog-close:focus-visible { color: #0a0a0a; outline: none; }' +
            '@media print { .simmer-badge, .simmer-dialog, .simmer-dialog-backdrop { display: none !important; } }';

        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);

        var badge = document.createElement('button');
        badge.type = 'button';
        badge.className = 'simmer-badge';
        badge.setAttribute('aria-haspopup', 'dialog');
        badge.setAttribute('title', tool.name + ' is under construction — tell me what it should become');
        badge.innerHTML = '<span class="simmer-badge-bubbles" aria-hidden="true"><i></i><i></i><i></i></span>simmering';
        var beforeEl = tool.before ? anchor.querySelector(tool.before) : null;
        if (beforeEl) anchor.insertBefore(badge, beforeEl);
        else anchor.appendChild(badge);

        var backdrop = document.createElement('div');
        backdrop.className = 'simmer-dialog-backdrop';

        var dialog = document.createElement('div');
        dialog.className = 'simmer-dialog';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-labelledby', 'simmer-dialog-title');
        dialog.innerHTML = '' +
            '<button class="simmer-dialog-close" type="button" aria-label="Close">×</button>' +
            '<p class="simmer-dialog-eyebrow">The Spoon Lab</p>' +
            '<h2 class="simmer-dialog-title" id="simmer-dialog-title">' + tool.name + ' is still simmering</h2>' +
            '<p class="simmer-dialog-body">Under construction, on purpose — this tool changes with what its users ' +
                'tell me. <b>What should it do that it doesn’t? What’s not working?</b> ' +
                'Every insight goes straight into the pot — I read all of it.</p>' +
            '<div class="simmer-dialog-actions">' +
                '<a href="' + waLink(tool.name) + '" target="_blank" rel="noopener">WhatsApp</a>' +
                '<a href="' + mailLink(tool.name) + '">Email</a>' +
            '</div>';

        document.body.appendChild(backdrop);
        document.body.appendChild(dialog);

        var closeBtn = dialog.querySelector('.simmer-dialog-close');

        var openDialog = function () {
            backdrop.dataset.open = 'true';
            dialog.dataset.open = 'true';
            closeBtn.focus();
        };
        var closeDialog = function () {
            backdrop.dataset.open = 'false';
            dialog.dataset.open = 'false';
            badge.focus();
        };

        badge.addEventListener('click', openDialog);
        closeBtn.addEventListener('click', closeDialog);
        backdrop.addEventListener('click', closeDialog);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && dialog.dataset.open === 'true') closeDialog();
        });
    }

    function init() {
        initWidget();
        initSimmerBadge();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
