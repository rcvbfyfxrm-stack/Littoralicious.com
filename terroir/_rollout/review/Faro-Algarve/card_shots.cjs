// Desktop and phone screenshots of one opened card (the walk round the walls), for the GOLD6 hand-over. Usage: node card_shots.cjs <url> <outdir>
const { chromium } = require(require.resolve('playwright', { paths: [process.env.NODE_PATH || '/opt/node22/lib/node_modules'] }));
(async () => {
  const [url, out] = process.argv.slice(2);
  const b = await chromium.launch();
  for (const [tag, vp] of [['desktop', { width: 1280, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    const p = await b.newPage({ viewport: vp, deviceScaleFactor: tag === 'phone' ? 2 : 1 });
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.evaluate(() => { const f = document.getElementById('walks'); f.open = true;
      const c = [...f.querySelectorAll('details.fcard')].find(d => d.querySelector('.fcard__name').textContent.includes('Round the walls')); c.open = true; c.scrollIntoView({ block: 'start' }); });
    await p.waitForTimeout(600);
    const el = await p.$('#walks details.fcard[open]');
    await el.screenshot({ path: `${out}/faro-card-${tag}.png` });
    await p.close();
  }
  await b.close(); console.log('ok');
})();
