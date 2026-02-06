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
    // Initialize
    // ==========================================================================

    document.addEventListener('DOMContentLoaded', () => {
        formatTemperatures();
        initReadingProgress();
        initSmoothScroll();
        initCodeCopy();
        initExternalLinks();
        initNewsletterForm();
    });
})();
