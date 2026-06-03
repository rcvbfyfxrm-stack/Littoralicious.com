/**
 * Littoralicious — Review Notes overlay
 * Per-paragraph annotation for draft review. Loads ONLY on the preview/review channel
 * (or with ?review). Saves notes locally (always works) and best-effort to Firestore
 * articles/{slug}/reviewNotes/{i} (so they can be read from the build machine once the
 * public-write rules are deployed). A "Copy for Claude" button exports all notes as text.
 * Hidden when printing.
 */
(function () {
  'use strict';
  var isReview = /--review-/.test(location.hostname) || /[?&]review\b/.test(location.search);
  if (!isReview) return;

  function ready(fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    var content = document.querySelector('.article__content') || document.querySelector('.article-body');
    if (!content) return;
    var slugEl = document.querySelector('[data-article-id]');
    var slug = (slugEl && slugEl.getAttribute('data-article-id')) || (location.pathname.match(/articles\/([^./]+)/) || [])[1];
    if (!slug) return;
    var LS = 'rn-notes-' + slug;

    injectStyles();

    var blocks = [].slice.call(content.children).filter(function (el) {
      if (el.closest('.article-engagement') || el.classList.contains('article-engagement')) return false;
      return (el.textContent || '').trim().length > 0;
    });

    var notes = lsGet(); // index -> {index, note, excerpt}
    blocks.forEach(function (el, i) {
      el.classList.add('rn-block'); el.setAttribute('data-rn', i);
      var marker = document.createElement('button');
      marker.className = 'rn-marker'; marker.type = 'button'; marker.title = 'Add a note'; marker.textContent = '✎';
      marker.addEventListener('click', function (e) { e.stopPropagation(); openEditor(el, i); });
      el.appendChild(marker);
      if (notes[i] && notes[i].note) renderNote(i);
    });

    banner();
    loadFirestore(); // merge any cloud notes on top of local

    function excerptOf(el) {
      var c = el.cloneNode(true);
      [].slice.call(c.querySelectorAll('.rn-marker,.rn-note')).forEach(function (n) { n.remove(); });
      return (c.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90);
    }
    function db_() { return (typeof db !== 'undefined') ? db : null; }
    function lsGet() { try { return JSON.parse(localStorage.getItem(LS) || '{}'); } catch (e) { return {}; } }
    function lsSet() { try { localStorage.setItem(LS, JSON.stringify(notes)); } catch (e) {} }

    function loadFirestore() {
      var d = db_(); if (!d) return;
      d.collection('articles').doc(slug).collection('reviewNotes').get().then(function (snap) {
        snap.forEach(function (doc) {
          var data = doc.data() || {}; var i = data.index != null ? data.index : parseInt(doc.id, 10);
          notes[i] = { index: i, note: data.note || '', excerpt: data.excerpt || '' }; renderNote(i);
        });
        lsSet(); updateCount();
      }).catch(function () {});
    }

    function renderNote(i) {
      var el = content.querySelector('[data-rn="' + i + '"]'); if (!el) return;
      var ex = el.querySelector('.rn-note'); if (ex) ex.remove();
      var n = notes[i];
      if (!n || !n.note) { el.classList.remove('rn-has'); updateCount(); return; }
      el.classList.add('rn-has');
      var box = document.createElement('div'); box.className = 'rn-note';
      box.innerHTML = '<span class="rn-note__label">Your note</span>' + escapeHtml(n.note);
      box.addEventListener('click', function () { openEditor(el, i); });
      el.appendChild(box); updateCount();
    }

    function openEditor(el, i) {
      closeEditor();
      var panel = document.createElement('div'); panel.className = 'rn-editor';
      var cur = (notes[i] && notes[i].note) || '';
      panel.innerHTML = '<textarea class="rn-ta" placeholder="Note on this paragraph… (⌘/Ctrl+Enter to save)">' + escapeHtml(cur) + '</textarea>' +
        '<div class="rn-row"><button class="rn-save" type="button">Save</button>' +
        (cur ? '<button class="rn-del" type="button">Delete</button>' : '') +
        '<button class="rn-cancel" type="button">Cancel</button></div>';
      el.appendChild(panel);
      var ta = panel.querySelector('.rn-ta'); ta.focus();
      panel.querySelector('.rn-cancel').addEventListener('click', closeEditor);
      panel.querySelector('.rn-save').addEventListener('click', function () { save(i, el, ta.value); });
      var del = panel.querySelector('.rn-del'); if (del) del.addEventListener('click', function () { save(i, el, ''); });
      ta.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') save(i, el, ta.value); });
    }
    function closeEditor() { var e = document.querySelector('.rn-editor'); if (e) e.remove(); }

    function save(i, el, value) {
      var text = (value || '').trim();
      if (!text) delete notes[i]; else notes[i] = { index: i, note: text, excerpt: excerptOf(el) };
      lsSet(); renderNote(i); closeEditor();
      var d = db_(); if (!d) return;
      var ref = d.collection('articles').doc(slug).collection('reviewNotes').doc(String(i));
      (text ? ref.set({ index: i, note: text, excerpt: excerptOf(el), ts: new Date().toISOString() }) : ref.delete()).catch(function () {});
    }

    function allNotes() {
      return Object.keys(notes).map(Number).sort(function (a, b) { return a - b; })
        .filter(function (i) { return notes[i] && notes[i].note; }).map(function (i) { return notes[i]; });
    }
    function updateCount() {
      var n = allNotes().length, c = document.querySelector('.rn-banner__count');
      if (c) c.textContent = n + (n === 1 ? ' note' : ' notes');
    }
    function copyAll() {
      var list = allNotes();
      if (!list.length) { flash('No notes yet'); return; }
      var txt = 'Review notes for "' + slug + '":\n\n' + list.map(function (n) {
        return '¶' + n.index + '  “' + n.excerpt + '…”\n   → ' + n.note;
      }).join('\n\n');
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { flash('Copied ' + list.length + ' notes — paste them to Claude'); }).catch(function () {
        var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); flash('Copied — paste to Claude'); } catch (e) { flash('Copy failed'); } ta.remove();
      });
    }
    function flash(msg) { var s = document.querySelector('.rn-flash'); if (s) { s.textContent = msg; s.style.opacity = '1'; setTimeout(function () { s.style.opacity = '0'; }, 2500); } }

    function banner() {
      var b = document.createElement('div'); b.className = 'rn-banner';
      b.innerHTML = '<strong>Review mode</strong> — click <span class="rn-ex">✎</span> beside any paragraph to leave a note. ' +
        '<span class="rn-banner__count">0 notes</span>' +
        '<button class="rn-copy" type="button">Copy for Claude</button><span class="rn-flash"></span>';
      document.body.appendChild(b);
      b.querySelector('.rn-copy').addEventListener('click', copyAll);
    }
    function escapeHtml(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  });

  function injectStyles() {
    if (document.getElementById('rn-styles')) return;
    var css = '' +
      '.rn-block{position:relative;}' +
      '.rn-marker{position:absolute;left:-2.4em;top:.15em;width:1.7em;height:1.7em;border:1px solid var(--color-border,#d4d4d4);background:var(--color-paper,#fff);color:var(--color-salt,#94a3b8);border-radius:50%;cursor:pointer;font-size:.85rem;line-height:1;opacity:.4;transition:opacity .12s,color .12s,border-color .12s;padding:0;}' +
      '.rn-block:hover>.rn-marker,.rn-block.rn-has>.rn-marker{opacity:1;}' +
      '.rn-marker:hover{color:var(--color-sea,#2d4a5e);border-color:var(--color-sea,#2d4a5e);}' +
      '.rn-block.rn-has>.rn-marker{color:#b45309;border-color:#f59e0b;background:#fffbeb;}' +
      '@media(max-width:980px){.rn-marker{left:auto;right:-.2em;top:-.6em;}}' +
      '.rn-note{margin:.5em 0 .75em;padding:.6em .8em;background:#fffbeb;border-left:3px solid #f59e0b;font-size:.9rem;color:#3f3f46;cursor:pointer;}' +
      '.rn-note__label{display:block;font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:#b45309;margin-bottom:.2em;}' +
      '.rn-editor{margin:.5em 0 .75em;padding:.7em;background:#fff;border:1px solid var(--color-sea,#2d4a5e);box-shadow:0 4px 16px rgba(0,0,0,.1);}' +
      '.rn-ta{width:100%;min-height:4.5em;box-sizing:border-box;font:inherit;font-size:.92rem;padding:.5em;border:1px solid var(--color-border,#d4d4d4);resize:vertical;}' +
      '.rn-row{display:flex;align-items:center;gap:.5em;margin-top:.5em;}' +
      '.rn-save{background:var(--color-sea,#2d4a5e);color:#fff;border:none;padding:.4em 1em;cursor:pointer;font-size:.85rem;}' +
      '.rn-del{background:none;border:1px solid #dc2626;color:#dc2626;padding:.4em .8em;cursor:pointer;font-size:.85rem;}' +
      '.rn-cancel{background:none;border:1px solid var(--color-border,#d4d4d4);padding:.4em .8em;cursor:pointer;font-size:.85rem;}' +
      '.rn-banner{position:fixed;bottom:0;left:0;right:0;z-index:2000;background:var(--color-sea,#2d4a5e);color:#fff;font-family:system-ui,sans-serif;font-size:.85rem;padding:.6em 1em;text-align:center;display:flex;gap:.6em;align-items:center;justify-content:center;flex-wrap:wrap;}' +
      '.rn-banner__count{background:rgba(255,255,255,.18);padding:.15em .6em;border-radius:10px;}' +
      '.rn-copy{background:#fff;color:var(--color-sea,#2d4a5e);border:none;padding:.3em .9em;cursor:pointer;font-size:.8rem;font-weight:600;}' +
      '.rn-flash{font-size:.8rem;opacity:0;transition:opacity .2s;}' +
      '.rn-ex{display:inline-block;border:1px solid rgba(255,255,255,.6);border-radius:50%;width:1.5em;height:1.5em;line-height:1.4em;text-align:center;}' +
      '@media print{.rn-marker,.rn-banner,.rn-editor{display:none !important;}.rn-note{border-left:3px solid #999;background:#f5f5f5;}.rn-block{position:static;}}';
    var s = document.createElement('style'); s.id = 'rn-styles'; s.textContent = css; document.head.appendChild(s);
  }
})();
