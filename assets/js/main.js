/**
 * Littoralicious — Main JavaScript
 * Minimal, purposeful interactions only
 */

(function () {
    'use strict';

    // ==========================================================================
    // Theme Toggle
    // ==========================================================================

    const THEME_KEY = 'littoralicious-theme';

    function getPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    }

    // Initialize theme on load
    setTheme(getPreferredTheme());

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Expose toggle function globally for theme toggle button
    window.toggleTheme = toggleTheme;

    // ==========================================================================
    // Temperature Auto-formatting
    // ==========================================================================

    function formatTemperatures() {
        const temps = document.querySelectorAll('.temperature:not([data-formatted])');
        temps.forEach((el) => {
            el.setAttribute('data-formatted', 'true');
            // Already formatted via CSS pseudo-element
        });
    }

    // ==========================================================================
    // Reading Progress (for articles)
    // ==========================================================================

    function initReadingProgress() {
        const article = document.querySelector('.article-body');
        if (!article) return;

        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: var(--color-sea);
            z-index: 1000;
            transition: width 100ms ease-out;
        `;
        document.body.appendChild(progressBar);

        function updateProgress() {
            const articleRect = article.getBoundingClientRect();
            const articleTop = articleRect.top + window.scrollY;
            const articleHeight = articleRect.height;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            const start = articleTop;
            const end = articleTop + articleHeight - windowHeight;
            const current = scrollY;

            let progress = ((current - start) / (end - start)) * 100;
            progress = Math.max(0, Math.min(100, progress));

            progressBar.style.width = `${progress}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
        });
    }

    // ==========================================================================
    // Copy Code Blocks
    // ==========================================================================

    function initCodeCopy() {
        document.querySelectorAll('pre').forEach((pre) => {
            const button = document.createElement('button');
            button.textContent = 'Copy';
            button.style.cssText = `
                position: absolute;
                top: var(--space-2);
                right: var(--space-2);
                padding: var(--space-1) var(--space-2);
                font-size: var(--text-xs);
                font-family: var(--font-mono);
                background: var(--color-paper);
                border: 1px solid var(--color-border);
                cursor: pointer;
                opacity: 0;
                transition: opacity 150ms ease;
            `;

            pre.style.position = 'relative';
            pre.appendChild(button);

            pre.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });

            pre.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });

            button.addEventListener('click', async () => {
                const code = pre.querySelector('code')?.textContent || pre.textContent;
                try {
                    await navigator.clipboard.writeText(code);
                    button.textContent = 'Copied';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    button.textContent = 'Failed';
                }
            });
        });
    }

    // ==========================================================================
    // External Link Handling
    // ==========================================================================

    function initExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach((link) => {
            if (!link.hostname.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // ==========================================================================
    // Newsletter Form
    // ==========================================================================

    function initNewsletterForm() {
        const forms = document.querySelectorAll('.newsletter-form');
        if (!forms.length) return;

        forms.forEach(function (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const emailInput = form.querySelector('input[type="email"]');
                const button = form.querySelector('button[type="submit"]');
                const statusEl = form.parentElement.querySelector('[class*="status"]');
                const email = emailInput?.value;

                if (!email) return;

                button.textContent = 'Subscribing...';
                button.disabled = true;

                try {
                    const formData = new FormData();
                    formData.append('email', email);

                    const res = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                    });

                    if (res.ok || res.status === 201) {
                        button.textContent = 'Subscribed';
                        emailInput.value = '';
                        if (statusEl) {
                            statusEl.textContent = 'You\'re in. First issue arrives next month.';
                            statusEl.className = statusEl.className.replace(/--error/, '') + ' newsletter-signup__status--success';
                        }
                    } else {
                        throw new Error('Subscription failed');
                    }
                } catch (err) {
                    button.textContent = 'Subscribe';
                    if (statusEl) {
                        statusEl.textContent = 'Something went wrong. Try again.';
                        statusEl.className = statusEl.className.replace(/--success/, '') + ' newsletter-signup__status--error';
                    }
                }

                button.disabled = false;

                setTimeout(() => {
                    button.textContent = 'Subscribe';
                    if (statusEl) statusEl.textContent = '';
                }, 5000);
            });
        });
    }

    // ==========================================================================
    // Share Buttons
    // ==========================================================================

    function initShareButtons() {
        const shareSection = document.querySelector('.article-share');
        if (!shareSection) return;

        const title = document.title;
        const url = window.location.href;

        const twitterBtn = shareSection.querySelector('[data-share="twitter"]');
        const linkedinBtn = shareSection.querySelector('[data-share="linkedin"]');
        const copyBtn = shareSection.querySelector('[data-share="copy"]');

        twitterBtn?.addEventListener('click', () => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
        });

        linkedinBtn?.addEventListener('click', () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=550,height=420');
        });

        copyBtn?.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(url);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
                }, 2000);
            } catch {
                // Fallback
            }
        });
    }

    // ==========================================================================
    // Print & Download
    // ==========================================================================

    function initPrintButton() {
        const printBtns = document.querySelectorAll('.print-btn, [data-action="print"]');
        printBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                window.print();
            });
        });
    }

    function initDownloadPDF() {
        const downloadBtns = document.querySelectorAll('.download-btn, [data-action="download"]');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Use browser's print-to-PDF functionality
                // This triggers the print dialog where user can save as PDF
                window.print();
            });
        });
    }

    // ==========================================================================
    // Table of Contents Generator
    // ==========================================================================

    function generateTableOfContents() {
        const tocContainer = document.querySelector('.article-toc');
        if (!tocContainer) return;

        const article = document.querySelector('.article__content, .article-body');
        if (!article) return;

        const headings = article.querySelectorAll('h2');
        if (headings.length < 2) {
            tocContainer.style.display = 'none';
            return;
        }

        const list = document.createElement('ol');

        headings.forEach((heading, index) => {
            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = `section-${index + 1}`;
            }

            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            li.appendChild(link);
            list.appendChild(li);
        });

        // Clear existing content and add new TOC
        const title = tocContainer.querySelector('.article-toc__title');
        if (title) {
            tocContainer.innerHTML = '';
            tocContainer.appendChild(title.cloneNode(true));
        }
        tocContainer.appendChild(list);
    }

    // ==========================================================================
    // Initialize
    // ==========================================================================

    // ==========================================================================
    // WhatsApp links — auto-enhance phone numbers
    // - Adds a WhatsApp button after every <a href="tel:+...">
    // - Auto-linkifies "Phone / Mobile / Harbour / WhatsApp" entries in supplier
    //   meta blocks (so existing static articles get WA links without edits)
    // ==========================================================================

    function buildWaButton(digits) {
        const a = document.createElement('a');
        a.className = 'wa-link';
        a.href = 'https://wa.me/' + digits;
        a.target = '_blank';
        a.rel = 'noopener';
        a.title = 'Chat on WhatsApp';
        a.setAttribute('aria-label', 'Chat on WhatsApp');
        a.innerHTML = '<span aria-hidden="true">💬</span> WhatsApp';
        return a;
    }

    function enhancePhoneNumbers() {
        // 1) Tel links → append WhatsApp button
        document.querySelectorAll('a[href^="tel:+"]').forEach((a) => {
            if (a.dataset.waEnhanced) return;
            const digits = a.getAttribute('href').replace(/^tel:\+/, '').replace(/\D/g, '');
            if (!digits) return;
            a.dataset.waEnhanced = '1';
            a.insertAdjacentText('afterend', ' ');
            a.parentNode.insertBefore(buildWaButton(digits), a.nextSibling);
        });

        // 2) Static "Phone / Mobile / Harbour / WhatsApp" rows in supplier meta blocks
        const PHONE_LABELS = ['phone', 'mobile', 'harbour', 'whatsapp', 'tel', 'cell'];
        document.querySelectorAll('.pfold__meta div, .pcv-card__meta div').forEach((row) => {
            if (row.dataset.waEnhanced) return;
            const strong = row.querySelector('strong');
            if (!strong) return;
            const label = strong.textContent.trim().toLowerCase();
            if (!PHONE_LABELS.includes(label)) return;
            // Already linkified?
            if (row.querySelector('a[href^="tel:"]')) return;
            // Extract phone number from the text node after <strong>
            const after = strong.nextSibling;
            if (!after || after.nodeType !== 3) return;
            const raw = after.textContent.trim();
            const match = raw.match(/\+?[\d][\d\s\-().]{6,}/);
            if (!match) return;
            const fullNum = match[0].trim();
            const digits = fullNum.replace(/\D/g, '');
            if (digits.length < 7) return;
            const tel = document.createElement('a');
            tel.href = 'tel:+' + digits;
            tel.textContent = fullNum;
            after.parentNode.replaceChild(tel, after);
            tel.insertAdjacentText('afterend', ' ');
            tel.parentNode.insertBefore(buildWaButton(digits), tel.nextSibling);
            row.dataset.waEnhanced = '1';
        });
    }

    // ==========================================================================
    // Tools Widget — naively-drawn cutlery button (bottom-right) that unfolds
    // the Littoralicious tools (Galley Order, Menu Planner, Pairing Wheel)
    // ==========================================================================
    function initToolsWidget() {
        // Don't double-mount (some pages may reload this script)
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

        const cutlerySvg = '<svg viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M 10 33 C 10 22, 22 18, 32 18 C 43 18, 54 23, 54 33 C 54 43, 43 47, 32 47 C 22 47, 10 44, 10 33 Z" opacity="0.55"/>' +
            '<path d="M 18 33 C 18 26, 25 24, 32 24 C 39 24, 46 26, 46 33 C 46 39, 39 41, 32 41 C 25 41, 18 39, 18 33" opacity="0.4"/>' +
            '<path d="M 8 6 L 10 8 L 36 36 L 40 42 L 44 50"/>' +
            '<path d="M 32 32 L 42 44 L 38 38 Z" fill="currentColor" opacity="0.18"/>' +
            '<path d="M 9 7 L 12 10" stroke-width="2.3"/>' +
            '<path d="M 56 6 L 54 8 L 28 36 L 24 42 L 20 50"/>' +
            '<path d="M 56 6 L 53 2 M 56 6 L 57 2 M 56 6 L 60 4"/>' +
            '<path d="M 55 7 L 52 10" stroke-width="2.3"/>' +
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

        const html = '' +
            '<button class="tools-widget-btn" type="button" id="lit-tools-btn" ' +
                'aria-label="Open Littoralicious tools" aria-expanded="false" aria-controls="lit-tools-panel" ' +
                'title="Littoralicious tools — galley order, menu planner, pairing">' +
                cutlerySvg +
            '</button>' +
            '<div class="tools-widget-panel" id="lit-tools-panel" role="menu" aria-labelledby="lit-tools-btn">' +
                '<div class="tools-widget-panel-header">' +
                    '<p class="tools-widget-panel-eyebrow">Littoralicious</p>' +
                    '<h3 class="tools-widget-panel-title">The Tools</h3>' +
                '</div>' +
                '<ul class="tools-widget-list">' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/galleyorder/" role="menuitem">' +
                            '<span class="tools-widget-link-icon">' + galleyIcon + '</span>' +
                            '<span class="tools-widget-link-text">' +
                                '<span class="tools-widget-link-title">Galley Order</span>' +
                                '<span class="tools-widget-link-desc">3,200+ items · mainstream-only auto-fill · A4 print</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>' +
                    '<li>' +
                        '<a class="tools-widget-link" href="/menu/" role="menuitem">' +
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

    document.addEventListener('DOMContentLoaded', () => {
        formatTemperatures();
        initReadingProgress();
        initSmoothScroll();
        initCodeCopy();
        initExternalLinks();
        initNewsletterForm();
        // Reactions and comments now handled by community.js (Firebase-backed)
        initShareButtons();
        initPrintButton();
        initDownloadPDF();
        generateTableOfContents();
        enhancePhoneNumbers();
        initToolsWidget();
        // Re-run after dynamic supplier rendering
        setTimeout(enhancePhoneNumbers, 1500);
    });
})();
