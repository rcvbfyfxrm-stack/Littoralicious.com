// GOLD6 §8 — the four readings, proven in a browser.   node probe-readings.cjs <guide-url> [outdir]
// Checks, desktop 1280 and phone 390: 4 doors top + 4 at the foot · each lens door shows ONLY its chapter,
// with a readout · every link inside each lens lands on a visible element · "show the whole guide" brings it
// all back and hides the lenses · Dig-In and Guests doors still jump · every card that has a place shows a
// Maps link while CLOSED, and clicking it opens Maps without opening the card · no lens chip in the bar ·
// no sideways scroll · 0 page errors. Exit 1 on any failure.
const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const URL = process.argv[2], OUT = process.argv[3];
const fails = []; const bad = (tag, m) => { fails.push(tag + ': ' + m); console.log('FAIL', tag, m); };
(async () => {
  const b = await chromium.launch();
  for (const [w, h, tag] of [[1280, 900, 'desk'], [390, 844, 'phone']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
    p.on('pageerror', e => bad(tag, 'page error ' + e.message));
    /* a goto that differs only in the hash is a same-document jump, not a reload: go via about:blank */
    const go = async (u, ms) => { await p.goto('about:blank'); await p.goto(u, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(ms); };
    const load = (u) => go(u, 4500);
    await load(URL);
    const st = await p.evaluate(() => {
      const f = [...document.querySelectorAll('details.fcard')], v = [...document.querySelectorAll('details.terroir-card--fold[data-venue-id]')];
      const placed = f.filter(d => d.querySelector('a[href*="google.com/maps/search"]:not(.fcard__pin)') || d.querySelector('.fcard__ref a[href^="#venue-"]'));
      const V = {}; ((window.TERROIR_DATA || {}).VENUES || []).forEach(x => V[x.id] = x);
      return { top: document.querySelectorAll('.gx-bridge:not(.gx-bridge--foot) .gx-bridge__door').length,
        foot: document.querySelectorAll('.gx-bridge--foot .gx-bridge__door').length,
        head: (document.querySelector('.gx-bridge__fr') || {}).textContent,
        lensVisible: [...document.querySelectorAll('.gx-chapter[data-lens]')].filter(c => !c.hidden).length,
        lensChip: !!document.querySelector('.gx-tags [data-tag="onenight"], .gx-tags [data-tag="getaway"]'),
        placed: placed.length, placedPinned: placed.filter(d => d.querySelector(':scope>summary .fcard__pin')).length,
        venues: v.filter(d => (V[d.dataset.venueId] || {}).maps).length, venuesPinned: v.filter(d => d.querySelector(':scope>summary .fcard__pin')).length,
        sx: document.documentElement.scrollWidth - innerWidth };
    });
    console.log(tag, JSON.stringify(st));
    if (st.top !== 4) bad(tag, 'top doors ' + st.top);
    if (st.foot !== 4) bad(tag, 'foot doors ' + st.foot);
    if (st.head !== 'Quatre lectures') bad(tag, 'door head ' + st.head);
    if (st.lensVisible) bad(tag, 'a lens shows in the whole-guide view');
    if (st.lensChip) bad(tag, 'a lens chip is in the chapter bar');
    if (st.placedPinned !== st.placed) bad(tag, `closed-card Maps ${st.placedPinned}/${st.placed}`);
    if (st.venuesPinned !== st.venues) bad(tag, `table-card Maps ${st.venuesPinned}/${st.venues}`);
    if (st.sx > 0) bad(tag, 'sideways scroll ' + st.sx);
    // a Maps link on a closed tile opens Maps and leaves the card shut
    const id = await p.evaluate(() => { const s = document.querySelector('details.fcard:not([open]) > summary .fcard__pin'); const d = s && s.closest('details'); if (!d) return null; d.id = d.id || 'probe-pin-card'; for (let x = d.parentElement.closest('details'); x; x = x.parentElement && x.parentElement.closest('details')) x.open = true; return d.id; });
    if (id) {
      const pin = p.locator(`#${id} > summary .fcard__pin`); await pin.scrollIntoViewIfNeeded();
      const [pop] = await Promise.all([ctx.waitForEvent('page', { timeout: 8000 }).catch(() => null), pin.click()]);
      if (!pop) bad(tag, 'closed-card Maps link did not open a tab'); else await pop.close();
      if (await p.evaluate(i => document.getElementById(i).open, id)) bad(tag, 'clicking the Maps link opened the card');
    } else bad(tag, 'no closed card with a Maps link');
    for (const lens of ['onenight', 'getaway']) {
      await load(URL);
      const door = p.locator(`.gx-bridge:not(.gx-bridge--foot) .gx-bridge__door[href="#t=${lens}"]`);
      if (!(await door.count())) { bad(tag, `no ${lens} door`); continue; }
      await door.click(); await p.waitForTimeout(800);
      const s2 = await p.evaluate(() => ({ hash: location.hash, vis: [...document.querySelectorAll('.gx-chapter')].filter(c => !c.hidden).map(c => c.dataset.chapter), ro: (document.querySelector('.gx-readout:not([hidden])') || {}).textContent || '' }));
      if (s2.hash !== '#t=' + lens || s2.vis.join() !== lens) bad(tag, `${lens} door shows ${s2.vis} (${s2.hash})`);
      if (!/stops|quarters/.test(s2.ro)) bad(tag, `${lens} readout "${s2.ro}"`);
      if (OUT) await p.screenshot({ path: `${OUT}/${tag}-${lens}.png` });
      const links = [...new Set(await p.$$eval(`#${lens} a[href^="#"]`, as => as.map(a => a.getAttribute('href'))))].filter(x => x !== '#');
      for (const hh of links) {
        await go(URL + '#t=' + lens, 2600);
        await p.click(`#${lens} a[href="${hh}"] >> nth=0`); await p.waitForTimeout(900);
        const ok = await p.evaluate(x => { const el = document.getElementById(x.slice(1)); if (!el) return 'missing'; if (el.closest('[hidden]')) return 'hidden';
          const r = el.getBoundingClientRect(); if (r.height === 0) return 'zero'; if (r.top < -5 || r.top > innerHeight) return 'offscreen ' + Math.round(r.top); return 'ok'; }, hh);
        if (ok !== 'ok') bad(tag, `${lens} link ${hh} ${ok}`);
      }
      console.log(tag, lens, 'links', links.length);
      await go(URL + '#t=' + lens, 2600);
      await p.click(`#${lens} .gx-rd__foot a`); await p.waitForTimeout(700);
      const back = await p.evaluate(() => ({ hash: location.hash, lens: [...document.querySelectorAll('.gx-chapter[data-lens]')].filter(c => !c.hidden).length, hidden: [...document.querySelectorAll('.gx-chapter:not([data-lens])')].filter(c => c.hidden).length }));
      if (back.hash || back.lens || back.hidden) bad(tag, `${lens} way out ${JSON.stringify(back)}`);
    }
    await load(URL);
    if (!(await p.locator('.gx-bridge--foot .gx-bridge__door[href="#t=getaway"]').count())) { bad(tag, 'no foot doors'); await ctx.close(); continue; }
    await p.click('.gx-bridge--foot .gx-bridge__door[href="#t=getaway"]'); await p.waitForTimeout(800);
    if (await p.evaluate(() => location.hash) !== '#t=getaway') bad(tag, 'foot getaway door');
    await p.click('.gx-bridge--foot .gx-bridge__door[href="#ce-soir"]'); await p.waitForTimeout(1200);
    const cs = await p.evaluate(() => { const e = document.getElementById('ce-soir'); return e ? Math.round(e.getBoundingClientRect().top) : null; });
    if (cs === null || cs < -5 || cs > 400) bad(tag, 'foot guests door landed ' + cs);
    await ctx.close();
  }
  await b.close();
  console.log(fails.length ? `READINGS PROBE: ${fails.length} failure(s)` : 'READINGS PROBE: ALL PASS');
  process.exit(fails.length ? 1 : 0);
})();
