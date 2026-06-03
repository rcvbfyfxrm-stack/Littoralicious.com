/**
 * Littoralicious — Tools Widget
 * Standalone, self-injecting button (bottom-right corner) that unfolds a
 * panel listing Galley Order, Menu Planner, Pairing Wheel.
 * Drop this script into any page; it auto-mounts on DOMContentLoaded and
 * guards against double-mount.
 */
(function () {
    'use strict';

    function init() {
        if (document.querySelector('.tools-widget')) return;

        const css = `
            .tools-widget {
                position: fixed;
                right: 18px;
                bottom: 18px;
                z-index: 90;
                font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
            }
            .tools-widget-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                background: var(--color-paper, #fafafa);
                color: var(--color-ink, #0a0a0a);
                border: 1px solid var(--color-ink, #0a0a0a);
                cursor: pointer;
                padding: 6px;
                box-shadow: 2px 2px 0 rgba(10, 10, 10, 0.08);
                transition: transform 180ms ease, box-shadow 180ms ease;
            }
            .tools-widget-btn:hover,
            .tools-widget-btn:focus-visible {
                transform: translate(-1px, -1px);
                box-shadow: 3px 3px 0 rgba(10, 10, 10, 0.14);
                outline: none;
            }
            .tools-widget-btn svg { width: 100%; height: 100%; }
            .tools-widget[data-open="true"] .tools-widget-btn {
                color: var(--color-sea, #2d4a5e);
                background: var(--color-paper, #fafafa);
            }
            .tools-widget-panel {
                position: absolute;
                bottom: 60px;
                right: 0;
                min-width: 296px;
                background: var(--color-paper, #fafafa);
                border: 1px solid var(--color-ink, #0a0a0a);
                box-shadow: 4px 4px 0 rgba(10, 10, 10, 0.10);
                transform-origin: bottom right;
                transform: scale(0.92) translateY(8px);
                opacity: 0;
                pointer-events: none;
                transition: transform 200ms ease, opacity 200ms ease;
            }
            .tools-widget[data-open="true"] .tools-widget-panel {
                transform: scale(1) translateY(0);
                opacity: 1;
                pointer-events: auto;
            }
            .tools-widget-panel-header {
                padding: 14px 18px 8px;
                border-bottom: 1px solid var(--color-border, #e2e2e2);
            }
            .tools-widget-panel-eyebrow {
                font-family: 'SF Mono', Consolas, monospace;
                font-size: 9.5px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: var(--color-sea, #2d4a5e);
                margin: 0 0 3px;
            }
            .tools-widget-panel-title {
                font-family: Georgia, serif;
                font-size: 18px;
                line-height: 1.2;
                margin: 0;
                color: var(--color-ink, #0a0a0a);
                font-weight: 400;
                letter-spacing: -0.005em;
            }
            .tools-widget-list { list-style: none; margin: 0; padding: 4px 0 8px; }
            .tools-widget-list li { margin: 0; }
            .tools-widget-link {
                display: flex;
                gap: 12px;
                align-items: flex-start;
                padding: 11px 18px;
                color: var(--color-ink, #0a0a0a);
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: background 120ms ease;
            }
            .tools-widget-link:hover,
            .tools-widget-link:focus-visible {
                background: rgba(45, 74, 94, 0.06);
                outline: none;
            }
            .tools-widget-link[aria-disabled="true"] {
                opacity: 0.55;
                cursor: default;
                pointer-events: none;
            }
            .tools-widget-link[data-current="true"] {
                background: rgba(45, 74, 94, 0.10);
                cursor: default;
                pointer-events: none;
            }
            .tools-widget-link[data-current="true"] .tools-widget-link-title::after {
                content: " · here";
                font-family: 'SF Mono', Consolas, monospace;
                font-size: 10px;
                color: var(--color-sea, #2d4a5e);
                letter-spacing: 0.08em;
                font-weight: 500;
            }
            .tools-widget-link-icon {
                flex-shrink: 0;
                width: 22px;
                height: 22px;
                color: var(--color-sea, #2d4a5e);
                margin-top: 2px;
            }
            .tools-widget-link-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
            .tools-widget-link-title {
                font-family: Georgia, serif;
                font-size: 14px;
                font-weight: 600;
                color: var(--color-ink, #0a0a0a);
                line-height: 1.25;
            }
            .tools-widget-link-desc {
                font-size: 11.5px;
                color: var(--color-muted, #6b7280);
                line-height: 1.35;
            }
            .tools-widget-link-tag {
                font-family: 'SF Mono', Consolas, monospace;
                font-size: 8.5px;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: var(--color-sea, #2d4a5e);
                border: 1px solid var(--color-border, #e2e2e2);
                padding: 1px 5px;
                margin-left: 6px;
                vertical-align: middle;
                font-weight: 500;
            }
            [data-theme="dark"] .tools-widget-btn {
                background: var(--color-paper, #1a1a1a);
                color: var(--color-paper, #fafafa);
                border-color: var(--color-paper, #fafafa);
                box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.35);
            }
            [data-theme="dark"] .tools-widget-panel {
                background: var(--color-paper, #1a1a1a);
                border-color: var(--color-paper, #fafafa);
            }
            @media print { .tools-widget { display: none !important; } }
            @media (max-width: 480px) {
                .tools-widget { right: 12px; bottom: 12px; }
                .tools-widget-btn { width: 44px; height: 44px; }
                .tools-widget-panel { min-width: 260px; bottom: 56px; }
            }
        `;

        // Naïve-art spoon — the tools "logo". Confident hand-drawn lines, a touch
        // of folk asymmetry; tap it to open the tools.
        const spoonSvg = '<svg viewBox="0 0 64 64" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M32 7 C 21 7, 15.5 17, 18 26 C 19.6 32.8, 26 36.5, 32 36.5 C 38 36.5, 44.4 32.8, 46 26 C 48.5 17, 43 7, 32 7 Z"/>' +
            '<path d="M33 36.5 C 33.4 44, 31.4 50.5, 34 58.5"/>' +
            '<path d="M26 13.5 C 23.4 17.5, 23.4 23, 26 26.8" stroke-width="1.7" opacity="0.55"/>' +
            '<circle cx="39" cy="16" r="1.1" fill="currentColor" stroke="none" opacity="0.5"/>' +
            '</svg>';

        const galleyIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 4 4 H 20 V 20 H 4 Z"/>' +
            '<path d="M 4 8 H 20 M 4 12 H 20 M 4 16 H 20"/>' +
            '<path d="M 16 6 L 18 6 M 16 10 L 18 10 M 16 14 L 18 14"/>' +
            '</svg>';

        const menuIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 6 3 H 18 V 21 H 6 Z"/>' +
            '<path d="M 6 7 H 18"/>' +
            '<path d="M 9 11 H 15 M 9 14 H 15 M 9 17 H 13"/>' +
            '</svg>';

        const wheelIcon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<circle cx="12" cy="12" r="9"/>' +
            '<path d="M 12 3 L 12 21 M 3 12 L 21 12 M 5.6 5.6 L 18.4 18.4 M 18.4 5.6 L 5.6 18.4"/>' +
            '<circle cx="12" cy="12" r="2"/>' +
            '</svg>';

        // Detect which tool page we're on so we can mark it as "here"
        const path = location.pathname.replace(/\/$/, '') || '/';
        const isGalley = /^\/galleyorder/i.test(path);
        const isMenu = /^\/menu/i.test(path);
        const hereAttr = (matches) => matches ? ' data-current="true" tabindex="-1"' : '';

        const html = '' +
            '<button class="tools-widget-btn" type="button" id="lit-tools-btn" ' +
                'aria-label="Open Littoralicious tools" aria-expanded="false" aria-controls="lit-tools-panel" ' +
                'title="Littoralicious tools — galley order, menu planner, pairing">' +
                spoonSvg +
            '</button>' +
            '<div class="tools-widget-panel" id="lit-tools-panel" role="menu" aria-labelledby="lit-tools-btn">' +
                '<div class="tools-widget-panel-header">' +
                    '<p class="tools-widget-panel-eyebrow">Littoralicious</p>' +
                    '<h3 class="tools-widget-panel-title">The Tools</h3>' +
                '</div>' +
                '<ul class="tools-widget-list">' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/galleyorder/" role="menuitem"' + hereAttr(isGalley) + '>' +
                            '<span class="tools-widget-link-icon">' + galleyIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Galley Order</span>' +
                                '<span class="tools-widget-link-desc">3,200+ items · mainstream-only auto-fill · A4 print</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/menu/" role="menuitem"' + hereAttr(isMenu) + '>' +
                            '<span class="tools-widget-link-icon">' + menuIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Menu Planner</span>' +
                                '<span class="tools-widget-link-desc">Charter menus · guest + crew · service order</span>' +
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
            '</div>';

        const widget = document.createElement('div');
        widget.className = 'tools-widget';
        widget.dataset.open = 'false';
        widget.innerHTML = html;

        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
        document.body.appendChild(widget);

        const btn = widget.querySelector('#lit-tools-btn');

        const openWidget = () => {
            widget.dataset.open = 'true';
            btn.setAttribute('aria-expanded', 'true');
        };
        const closeWidget = () => {
            widget.dataset.open = 'false';
            btn.setAttribute('aria-expanded', 'false');
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (widget.dataset.open === 'true') closeWidget();
            else openWidget();
        });

        document.addEventListener('click', (e) => {
            if (!widget.contains(e.target)) closeWidget();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && widget.dataset.open === 'true') {
                closeWidget();
                btn.focus();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
