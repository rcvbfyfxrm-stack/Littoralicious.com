// Playwright replacement for the hand-rolled CDP driver.
// Prints the settled DOM to stdout. Usage: node render_playwright.js <url> <settle_ms>
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const settle = parseInt(process.argv[3] || '2500', 10);
  const browser = await chromium.launch();           // headless by default
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
    // 'networkidle' never settles here: the Leaflet map streams tiles continuously.
    // The CDP driver this replaces just waited a fixed settle, so do the same.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(settle);
    process.stdout.write(await page.content());
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e.message); process.exit(1); });
