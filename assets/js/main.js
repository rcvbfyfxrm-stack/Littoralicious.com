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
    // Article Reactions (Agree/Disagree)
    // ==========================================================================

    const REACTIONS_KEY = 'littoralicious-reactions';

    function getReactions() {
        try {
            return JSON.parse(localStorage.getItem(REACTIONS_KEY) || '{}');
        } catch {
            return {};
        }
    }

    function saveReaction(articleId, reaction) {
        const reactions = getReactions();
        reactions[articleId] = reaction;
        localStorage.setItem(REACTIONS_KEY, JSON.stringify(reactions));
    }

    function initArticleReactions() {
        const reactionSection = document.querySelector('.article-reactions');
        if (!reactionSection) return;

        const articleId = reactionSection.dataset.articleId || window.location.pathname;
        const agreeBtn = reactionSection.querySelector('[data-reaction="agree"]');
        const disagreeBtn = reactionSection.querySelector('[data-reaction="disagree"]');
        const agreeCount = reactionSection.querySelector('.reaction-count--agree');
        const disagreeCount = reactionSection.querySelector('.reaction-count--disagree');

        // Check if user already reacted
        const userReactions = getReactions();
        const existingReaction = userReactions[articleId];

        if (existingReaction === 'agree' && agreeBtn) {
            agreeBtn.classList.add('active');
        } else if (existingReaction === 'disagree' && disagreeBtn) {
            disagreeBtn.classList.add('active');
        }

        function handleReaction(type, btn, otherBtn) {
            const wasActive = btn.classList.contains('active');

            // Remove active from both
            agreeBtn?.classList.remove('active');
            disagreeBtn?.classList.remove('active');

            if (wasActive) {
                // Un-react
                saveReaction(articleId, null);
                updatePercentages(null);
            } else {
                // React
                btn.classList.add('active');
                saveReaction(articleId, type);
                updatePercentages(type);
            }
        }

        function updatePercentages(userReaction) {
            // For a static site, we simulate percentages based on localStorage
            // In production, this would call an API
            if (agreeCount && disagreeCount) {
                // Show a thank you message instead of fake numbers
                if (userReaction) {
                    agreeCount.textContent = userReaction === 'agree' ? 'Thanks!' : '';
                    disagreeCount.textContent = userReaction === 'disagree' ? 'Noted' : '';
                } else {
                    agreeCount.textContent = '';
                    disagreeCount.textContent = '';
                }
            }
        }

        // Initial state
        if (existingReaction) {
            updatePercentages(existingReaction);
        }

        agreeBtn?.addEventListener('click', () => handleReaction('agree', agreeBtn, disagreeBtn));
        disagreeBtn?.addEventListener('click', () => handleReaction('disagree', disagreeBtn, agreeBtn));
    }

    // ==========================================================================
    // Comment Form with Newsletter Opt-in
    // ==========================================================================

    function initCommentForm() {
        const commentForm = document.querySelector('.comment-form');
        if (!commentForm) return;

        const form = commentForm.querySelector('form');
        const nameInput = form?.querySelector('input[name="name"]');
        const emailInput = form?.querySelector('input[name="email"]');
        const commentInput = form?.querySelector('textarea[name="comment"]');
        const subscribeCheckbox = form?.querySelector('input[name="subscribe"]');
        const submitBtn = form?.querySelector('button[type="submit"]');
        const commentsList = document.querySelector('.comments-list');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = nameInput?.value?.trim();
            const email = emailInput?.value?.trim();
            const comment = commentInput?.value?.trim();
            const subscribe = subscribeCheckbox?.checked;

            if (!name || !comment) {
                alert('Please enter your name and comment.');
                return;
            }

            submitBtn.textContent = 'Posting...';
            submitBtn.disabled = true;

            // If subscribe is checked and email provided, subscribe to newsletter
            if (subscribe && email) {
                try {
                    const formData = new FormData();
                    formData.append('email', email);

                    await fetch('https://buttondown.com/api/emails/embed-subscribe/littoralicious', {
                        method: 'POST',
                        body: formData,
                    });
                } catch (err) {
                    console.log('Newsletter subscription attempted');
                }
            }

            // For static site, show the comment locally (won't persist on reload)
            // In production, this would POST to an API
            if (commentsList) {
                const newComment = document.createElement('div');
                newComment.className = 'comment comment--new';
                newComment.innerHTML = `
                    <div class="comment__header">
                        <span class="comment__author">${escapeHtml(name)}</span>
                        <span class="comment__date">Just now</span>
                    </div>
                    <div class="comment__body">${escapeHtml(comment)}</div>
                `;
                commentsList.prepend(newComment);
            }

            // Reset form
            form.reset();
            submitBtn.textContent = 'Posted!';

            setTimeout(() => {
                submitBtn.textContent = 'Post Comment';
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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
    // Initialize
    // ==========================================================================

    document.addEventListener('DOMContentLoaded', () => {
        formatTemperatures();
        initReadingProgress();
        initSmoothScroll();
        initCodeCopy();
        initExternalLinks();
        initNewsletterForm();
        initArticleReactions();
        initCommentForm();
        initShareButtons();
    });
})();
