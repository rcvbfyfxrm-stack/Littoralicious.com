/* ============================================================================
   TERROIR KIT — COMMENTS  ("Notes from readers")
   A light public guestbook at the foot of every guide. Firestore-backed
   (terroir_comments/<slug>/comments/<autoId> = {name, text, ts}), reusing the
   firebase compat SDK already on the page (same project as ♡ favourites).
   Optional name (defaults to "A reader"), ~600-char cap, newest-first (max 30),
   one post per minute per device. Locked tokens, no emoji. Read + validated
   create only at the rules layer; moderation is console-side.
   ========================================================================== */
(function () {
  'use strict';
  var CFG = window.TERROIR_CONFIG || {};
  var SLUG = CFG.articleId || 'terroir-default';
  var COL = 'terroir_comments';
  var MAX = 600, MAXNAME = 40, SHOW = 30, COOLDOWN = 60000, LAST_KEY = 'terroir-comment-last';

  var firebaseConfig = {
    apiKey: 'AIzaSyBIbFq4FtYsoz3_GAoQaJAOynaaouooYFE',
    authDomain: 'littoralicious-web-eceed.firebaseapp.com',
    projectId: 'littoralicious-web-eceed',
    storageBucket: 'littoralicious-web-eceed.firebasestorage.app',
    messagingSenderId: '1024688297116',
    appId: '1:1024688297116:web:e208f3c7f71019268ec959'
  };
  var db = null;
  function ensureDb() {
    if (db) return db;
    try {
      if (typeof firebase === 'undefined') return null;
      if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(firebaseConfig);
      db = firebase.firestore(); return db;
    } catch (e) { return null; }
  }
  function esc(s) { return (s || '').replace(/[&<>"']/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function fmtName(n) { n = (n || '').replace(/\s+/g, ' ').trim().slice(0, MAXNAME); return n || 'A reader'; }

  function row(c) {
    var when = '';
    if (c.ts && c.ts.toDate) { try { when = c.ts.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) {} }
    return '<div class="gx-comments__item"><div class="gx-comments__meta">' +
      '<span class="gx-comments__who">' + esc(c.name || 'A reader') + '</span>' +
      (when ? ' <span class="gx-comments__when">' + esc(when) + '</span>' : '') +
      '</div><p class="gx-comments__body">' + esc(c.text) + '</p></div>';
  }

  function build() {
    if (document.getElementById('terroir-comments')) return;
    var host = document.querySelector('.container') || document.body;
    var sec = document.createElement('section');
    sec.id = 'terroir-comments'; sec.className = 'gx-comments';
    sec.innerHTML =
      '<div class="overline">NOTES FROM READERS</div>' +
      '<div class="subhead">Been here? Leave a note.</div>' +
      '<form class="gx-comments__form">' +
        '<input class="gx-comments__name" type="text" maxlength="' + MAXNAME + '" placeholder="Your name (optional)" autocomplete="name">' +
        '<textarea class="gx-comments__text" maxlength="' + MAX + '" rows="3" placeholder="A tip, a correction, a memory of this place..."></textarea>' +
        '<div class="gx-comments__row"><span class="gx-comments__count">' + MAX + '</span>' +
        '<button type="submit" class="gx-comments__post">Post note</button></div>' +
        '<div class="gx-comments__msg" role="status"></div>' +
      '</form>' +
      '<div class="gx-comments__list"><div class="gx-comments__empty">No notes yet. Be the first.</div></div>';
    var appendix = document.querySelector('.gx-appendix');
    if (appendix && appendix.parentNode === host) host.insertBefore(sec, appendix);
    else host.appendChild(sec);
    wire(sec); load(sec);
  }

  function wire(sec) {
    var ta = sec.querySelector('.gx-comments__text'),
        cnt = sec.querySelector('.gx-comments__count'),
        form = sec.querySelector('.gx-comments__form'),
        msg = sec.querySelector('.gx-comments__msg'),
        btn = sec.querySelector('.gx-comments__post');
    ta.addEventListener('input', function () { cnt.textContent = (MAX - ta.value.length); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = ta.value.replace(/\s+$/, '').trim();
      var name = fmtName(sec.querySelector('.gx-comments__name').value);
      if (text.length < 3) { msg.textContent = 'Write a little more first.'; return; }
      if (text.length > MAX) { msg.textContent = 'Keep it under ' + MAX + ' characters.'; return; }
      var last = 0; try { last = +localStorage.getItem(LAST_KEY) || 0; } catch (e) {}
      if (Date.now() - last < COOLDOWN) { msg.textContent = 'One note a minute, please.'; return; }
      var fdb = ensureDb();
      if (!fdb) { msg.textContent = 'Comments need a connection — try again later.'; return; }
      btn.disabled = true; msg.textContent = 'Posting...';
      fdb.collection(COL).doc(SLUG).collection('comments').add({
        name: name, text: text, ts: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function () {
        try { localStorage.setItem(LAST_KEY, String(Date.now())); } catch (e) {}
        ta.value = ''; cnt.textContent = MAX; sec.querySelector('.gx-comments__name').value = '';
        msg.textContent = 'Thank you — your note is up.'; btn.disabled = false;
        var list = sec.querySelector('.gx-comments__list');
        var empty = list.querySelector('.gx-comments__empty'); if (empty) empty.remove();
        list.insertAdjacentHTML('afterbegin', row({ name: name, text: text, ts: null }));
      }).catch(function () { msg.textContent = 'Could not post — please try again.'; btn.disabled = false; });
    });
  }

  function load(sec) {
    var fdb = ensureDb(); if (!fdb) return;
    fdb.collection(COL).doc(SLUG).collection('comments').orderBy('ts', 'desc').limit(SHOW).get()
      .then(function (snap) {
        if (!snap || snap.empty) return;
        var list = sec.querySelector('.gx-comments__list'); list.innerHTML = '';
        snap.forEach(function (d) { list.insertAdjacentHTML('beforeend', row(d.data() || {})); });
      }).catch(function () {});
  }

  function boot() {
    var n = 0, iv = setInterval(function () {
      n++; if (typeof firebase !== 'undefined' || n > 24) { clearInterval(iv); build(); }
    }, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
