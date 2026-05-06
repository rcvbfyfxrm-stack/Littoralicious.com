/* ====================================================================
   DRAFT MODE — annotation overlay for in-review articles.

   Activates only when ?draft=1 is present in the URL. No-op otherwise.

   What it does:
     • Adds a top banner: "DRAFT MODE — click any paragraph to annotate"
     • Marks every <p>, <h2>, <h3>, <li> inside .article__content as click-to-annotate
     • Click → modal with textarea → save to localStorage (per-article, per-block)
     • Annotated blocks get a numbered margin marker
     • End of article: "Your Notes" summary listing every annotation
     • Buttons: Copy as Markdown, Email to me, Clear all notes for this article
     • "Back to Drafts" sticky link top-right

   Storage shape:
     localStorage["llcs-draft-notes-<slug>"] = {
       "<idx>": { text: "...", at: "ISO date", excerpt: "first 200 chars" }
     }
     localStorage["llcs-draft-newsletter-selection"] = ["<slug>", "<slug>"]
==================================================================== */
(function () {
  'use strict';

  if (!new URLSearchParams(window.location.search).has('draft')) return;

  const SLUG = (window.location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  const NOTES_KEY = 'llcs-draft-notes-' + SLUG;

  function getNotes() {
    try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function setNotes(n) { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); }
  function clearAllNotes() { localStorage.removeItem(NOTES_KEY); }

  const escapeHTML = s => (s || '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function init() {
    document.documentElement.classList.add('draft-mode');
    injectStyles();
    injectBanner();
    annotateBlocks();
    renderNotesSummary();
  }

  // ---------- Styles (self-contained, no external CSS dependency) ----------
  function injectStyles() {
    if (document.getElementById('draft-mode-styles')) return;
    const css = `
      html.draft-mode body { padding-top: 56px; }
      .dm-banner {
        position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
        background: #1a1a1a; color: #fafafa;
        padding: 10px 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 13px; letter-spacing: 0.04em;
        display: flex; justify-content: space-between; align-items: center;
        border-bottom: 2px solid #c4a35a;
      }
      .dm-banner__left { display: flex; align-items: center; gap: 16px; }
      .dm-banner__pulse {
        width: 8px; height: 8px; background: #c4a35a;
        animation: dmPulse 1.6s ease-in-out infinite;
      }
      @keyframes dmPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
      .dm-banner__title { font-weight: 700; text-transform: uppercase; }
      .dm-banner__hint { color: #a3a3a3; font-size: 12px; }
      .dm-banner__right { display: flex; gap: 10px; }
      .dm-banner a, .dm-banner button {
        background: transparent; color: #fafafa; border: 1px solid #555;
        padding: 5px 12px; font-size: 12px; text-decoration: none;
        cursor: pointer; font-family: inherit;
      }
      .dm-banner a:hover, .dm-banner button:hover { background: #c4a35a; color: #1a1a1a; border-color: #c4a35a; }
      .dm-banner__count { background: #c4a35a; color: #1a1a1a; padding: 2px 8px; font-weight: 700; font-size: 11px; }

      .dm-annotatable { position: relative; cursor: text; transition: background 0.15s; }
      .dm-annotatable:hover { background: rgba(196, 163, 90, 0.08); outline: 1px dashed rgba(196,163,90,0.4); outline-offset: 2px; }
      .dm-annotatable.dm-has-note { background: rgba(196, 163, 90, 0.12); border-left: 3px solid #c4a35a; padding-left: 12px; margin-left: -15px; }
      .dm-annotatable.dm-has-note:hover { background: rgba(196, 163, 90, 0.18); }
      .dm-marker {
        position: absolute; left: -42px; top: 4px;
        background: #c4a35a; color: #1a1a1a;
        font-family: 'SF Mono', Consolas, monospace; font-size: 11px; font-weight: 700;
        width: 24px; height: 24px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 0;
      }
      @media (max-width: 900px) { .dm-marker { left: -32px; width: 18px; height: 18px; font-size: 9px; } }

      .dm-modal-bg { position: fixed; inset: 0; background: rgba(10,10,10,0.6); z-index: 10000; display: flex; align-items: flex-start; justify-content: center; padding-top: 80px; }
      .dm-modal {
        background: #fafafa; max-width: 600px; width: calc(100% - 32px); padding: 24px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        border-top: 4px solid #c4a35a;
      }
      .dm-modal__cat { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #6b7280; margin-bottom: 8px; }
      .dm-modal__excerpt { font-family: Georgia, serif; font-style: italic; font-size: 14px; color: #4a4a4a; padding: 10px 14px; border-left: 3px solid #c4a35a; background: rgba(196,163,90,0.06); margin-bottom: 16px; }
      .dm-modal__textarea { width: 100%; box-sizing: border-box; min-height: 120px; padding: 12px; font-family: Georgia, serif; font-size: 15px; line-height: 1.5; border: 1px solid #c4a35a; resize: vertical; }
      .dm-modal__textarea:focus { outline: none; border-color: #1a1a1a; }
      .dm-modal__actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 14px; }
      .dm-modal__actions button { padding: 8px 16px; font-size: 13px; font-family: inherit; cursor: pointer; border: 1px solid #1a1a1a; background: transparent; }
      .dm-modal__actions button.dm-primary { background: #1a1a1a; color: #fafafa; }
      .dm-modal__actions button.dm-danger { color: #b91c1c; border-color: #b91c1c; }
      .dm-modal__actions button:hover { background: #c4a35a; color: #1a1a1a; border-color: #c4a35a; }
      .dm-modal__actions button.dm-primary:hover { background: #c4a35a; color: #1a1a1a; }

      .dm-summary {
        margin: 80px auto 60px; max-width: 70ch; padding: 32px 24px;
        background: #1a1a1a; color: #fafafa;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      .dm-summary__head { border-bottom: 1px solid #555; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 12px; }
      .dm-summary__title { font-family: Georgia, serif; font-size: 28px; margin: 0; font-weight: 400; }
      .dm-summary__count { background: #c4a35a; color: #1a1a1a; padding: 4px 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; }
      .dm-summary__hint { color: #a3a3a3; font-size: 13px; margin: 0 0 24px; }
      .dm-summary__empty { color: #777; font-style: italic; padding: 24px 0; }
      .dm-note { padding: 16px 0; border-bottom: 1px solid #333; }
      .dm-note:last-child { border-bottom: none; }
      .dm-note__num { color: #c4a35a; font-family: 'SF Mono', Consolas, monospace; font-size: 12px; font-weight: 700; }
      .dm-note__excerpt { font-family: Georgia, serif; font-style: italic; color: #a3a3a3; font-size: 14px; line-height: 1.5; margin: 6px 0 10px; }
      .dm-note__text { font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
      .dm-note__when { color: #777; font-size: 11px; font-family: 'SF Mono', Consolas, monospace; margin-top: 8px; }
      .dm-summary__actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; padding-top: 20px; border-top: 1px solid #555; }
      .dm-summary__actions button, .dm-summary__actions a {
        background: transparent; color: #fafafa; border: 1px solid #fafafa;
        padding: 8px 16px; font-size: 13px; font-family: inherit; text-decoration: none; cursor: pointer;
      }
      .dm-summary__actions button:hover, .dm-summary__actions a:hover { background: #c4a35a; color: #1a1a1a; border-color: #c4a35a; }
      .dm-summary__actions .dm-danger { color: #ef9696; border-color: #b91c1c; }
      .dm-summary__actions .dm-danger:hover { background: #b91c1c; color: #fafafa; border-color: #b91c1c; }

      .dm-flash { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #1a1a1a; color: #fafafa; padding: 10px 20px; font-size: 13px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; z-index: 10001; border-left: 3px solid #c4a35a; }
    `;
    const style = document.createElement('style');
    style.id = 'draft-mode-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---------- Banner ----------
  function injectBanner() {
    const bar = document.createElement('div');
    bar.className = 'dm-banner';
    bar.innerHTML =
      '<div class="dm-banner__left">' +
        '<span class="dm-banner__pulse"></span>' +
        '<span class="dm-banner__title">Draft Mode</span>' +
        '<span class="dm-banner__hint">Click any paragraph to annotate · Notes saved locally</span>' +
        '<span class="dm-banner__count" id="dm-count">0 notes</span>' +
      '</div>' +
      '<div class="dm-banner__right">' +
        '<a href="../draft.html">← Drafts</a>' +
      '</div>';
    document.body.insertBefore(bar, document.body.firstChild);
    refreshCount();
  }

  function refreshCount() {
    const el = document.getElementById('dm-count');
    if (!el) return;
    const n = Object.keys(getNotes()).length;
    el.textContent = n + (n === 1 ? ' note' : ' notes');
  }

  // ---------- Annotation wiring ----------
  function annotateBlocks() {
    const container =
      document.querySelector('.article__content') ||
      document.querySelector('.article-content') ||
      document.querySelector('article') ||
      document.querySelector('main');
    if (!container) return;

    const selector = 'p, h2, h3, h4, li, blockquote';
    const all = Array.from(container.querySelectorAll(selector));
    // Filter out blocks inside nav/footer/aside that aren't body content
    const blocks = all.filter(el => {
      // skip empty
      if (!el.textContent.trim()) return false;
      // skip blocks inside .pc-quicknav, .article__meta, header, footer, aside, nav
      if (el.closest('.pc-quicknav, .article__meta, header.masthead, footer, aside, nav')) return false;
      // skip if already inside another annotatable parent (avoid nested li-in-li)
      if (el.parentElement && el.parentElement.classList.contains('dm-annotatable')) return false;
      return true;
    });

    const notes = getNotes();
    blocks.forEach((el, idx) => {
      el.dataset.dmIdx = String(idx);
      el.classList.add('dm-annotatable');
      el.addEventListener('click', onBlockClick);
      if (notes[idx]) markAnnotated(el, idx);
    });
  }

  function onBlockClick(e) {
    // ignore link clicks
    if (e.target.closest('a, button, summary')) return;
    // ignore when user is selecting text
    const sel = window.getSelection();
    if (sel && sel.toString().length > 3) return;
    e.preventDefault();
    e.stopPropagation();
    openNoteModal(this, parseInt(this.dataset.dmIdx, 10));
  }

  function markAnnotated(el, idx) {
    el.classList.add('dm-has-note');
    if (el.querySelector('.dm-marker')) return;
    const marker = document.createElement('span');
    marker.className = 'dm-marker';
    marker.textContent = String(idx + 1);
    marker.title = 'Annotated. Click to edit.';
    el.insertBefore(marker, el.firstChild);
  }

  function unmarkAnnotated(el) {
    el.classList.remove('dm-has-note');
    const m = el.querySelector('.dm-marker');
    if (m) m.remove();
  }

  // ---------- Modal ----------
  function openNoteModal(el, idx) {
    const notes = getNotes();
    const existing = notes[idx];
    const excerpt = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 240);

    const bg = document.createElement('div');
    bg.className = 'dm-modal-bg';
    bg.innerHTML =
      '<div class="dm-modal" role="dialog" aria-label="Add or edit note">' +
        '<div class="dm-modal__cat">' + (existing ? 'Edit Note · #' + (idx + 1) : 'New Note · #' + (idx + 1)) + '</div>' +
        '<div class="dm-modal__excerpt">' + escapeHTML(excerpt) + (excerpt.length === 240 ? '…' : '') + '</div>' +
        '<textarea class="dm-modal__textarea" placeholder="Write your note here. Markdown is fine. It saves to this browser only."></textarea>' +
        '<div class="dm-modal__actions">' +
          (existing ? '<button class="dm-danger" data-act="delete">Delete</button>' : '') +
          '<button data-act="cancel">Cancel</button>' +
          '<button class="dm-primary" data-act="save">Save</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(bg);
    const ta = bg.querySelector('.dm-modal__textarea');
    if (existing) ta.value = existing.text;
    setTimeout(() => ta.focus(), 50);

    function close() { bg.remove(); }
    bg.addEventListener('click', e => { if (e.target === bg) close(); });
    bg.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveAndClose();
    });
    function saveAndClose() {
      const txt = ta.value.trim();
      const notes = getNotes();
      if (!txt) { delete notes[idx]; unmarkAnnotated(el); }
      else { notes[idx] = { text: txt, at: new Date().toISOString(), excerpt: excerpt }; markAnnotated(el, idx); }
      setNotes(notes);
      refreshCount();
      renderNotesSummary();
      flash(txt ? 'Note saved' : 'Note removed');
      close();
    }
    bg.addEventListener('click', e => {
      const act = e.target.dataset && e.target.dataset.act;
      if (act === 'save') saveAndClose();
      else if (act === 'cancel') close();
      else if (act === 'delete') {
        const notes = getNotes();
        delete notes[idx];
        setNotes(notes);
        unmarkAnnotated(el);
        refreshCount();
        renderNotesSummary();
        flash('Note removed');
        close();
      }
    });
  }

  function flash(msg) {
    const f = document.createElement('div');
    f.className = 'dm-flash';
    f.textContent = msg;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  }

  // ---------- End-of-article summary ----------
  function renderNotesSummary() {
    const old = document.getElementById('dm-summary');
    if (old) old.remove();

    const notes = getNotes();
    const entries = Object.keys(notes)
      .map(k => Object.assign({ idx: parseInt(k, 10) }, notes[k]))
      .sort((a, b) => a.idx - b.idx);

    const summary = document.createElement('section');
    summary.className = 'dm-summary';
    summary.id = 'dm-summary';

    let inner =
      '<div class="dm-summary__head">' +
        '<h2 class="dm-summary__title">Your Notes</h2>' +
        '<span class="dm-summary__count">' + entries.length + ' annotation' + (entries.length === 1 ? '' : 's') + '</span>' +
      '</div>' +
      '<p class="dm-summary__hint">Click any annotated paragraph above to edit or delete its note. Notes live in this browser only.</p>';

    if (!entries.length) {
      inner += '<div class="dm-summary__empty">No notes yet. Click any paragraph to add one.</div>';
    } else {
      inner += entries.map(n =>
        '<div class="dm-note">' +
          '<span class="dm-note__num">#' + (n.idx + 1) + '</span>' +
          '<div class="dm-note__excerpt">“' + escapeHTML(n.excerpt) + (n.excerpt.length >= 240 ? '…' : '') + '”</div>' +
          '<div class="dm-note__text">' + escapeHTML(n.text) + '</div>' +
          '<div class="dm-note__when">' + new Date(n.at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) + '</div>' +
        '</div>'
      ).join('');
    }

    inner +=
      '<div class="dm-summary__actions">' +
        '<button data-act="copy">Copy as Markdown</button>' +
        '<a id="dm-mailto" href="#">Email to me</a>' +
        '<button class="dm-danger" data-act="clear">Clear all notes</button>' +
      '</div>';

    summary.innerHTML = inner;

    // Append at end of article body, fall back to before footer
    const target =
      document.querySelector('.article__content') ||
      document.querySelector('.article-content') ||
      document.querySelector('article') ||
      document.querySelector('main');
    if (target) target.appendChild(summary);
    else document.body.appendChild(summary);

    // Wire actions
    summary.addEventListener('click', e => {
      const act = e.target.dataset && e.target.dataset.act;
      if (act === 'copy') {
        const md = buildMarkdown(entries);
        copyToClipboard(md).then(() => flash('Markdown copied to clipboard')).catch(() => flash('Copy failed — select + Cmd-C from console'));
      } else if (act === 'clear') {
        if (confirm('Delete all notes for this article? This cannot be undone.')) {
          clearAllNotes();
          // unmark all
          document.querySelectorAll('.dm-has-note').forEach(unmarkAnnotated);
          refreshCount();
          renderNotesSummary();
          flash('All notes cleared');
        }
      }
    });

    // Set up mailto with body
    const mailto = summary.querySelector('#dm-mailto');
    if (mailto) {
      const subj = 'Draft notes — ' + (document.title || SLUG);
      const body = buildMarkdown(entries);
      mailto.href = 'mailto:arnaudcallier@pm.me?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body.slice(0, 1800));
    }
  }

  function buildMarkdown(entries) {
    const head = '# Draft Notes — ' + (document.title || SLUG) + '\n\n' +
      'Article: ' + window.location.origin + window.location.pathname + '\n' +
      'Notes: ' + entries.length + ' · Generated: ' + new Date().toLocaleString('en-GB') + '\n\n---\n\n';
    if (!entries.length) return head + '_No notes._\n';
    return head + entries.map(n =>
      '## #' + (n.idx + 1) + '\n\n' +
      '> ' + n.excerpt.replace(/\n/g, ' ') + (n.excerpt.length >= 240 ? '…' : '') + '\n\n' +
      n.text + '\n\n' +
      '_Saved: ' + new Date(n.at).toLocaleString('en-GB') + '_\n'
    ).join('\n---\n\n');
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
        resolve();
      } catch (e) { reject(e); }
    });
  }

  // ---------- Boot ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
