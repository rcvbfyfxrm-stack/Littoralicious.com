// Test-only shim: the sandbox's egress proxy blocks unpkg.com, so serve the identical
// leaflet@1.9.4 dist (fetched from the npm registry) to every Playwright page. Pages are unchanged.
const path = require('path'), fs = require('fs');
const DIST = path.join(__dirname, 'lf/package/dist');
const pw = require(require.resolve('playwright', { paths: [process.env.NODE_PATH || '/opt/node22/lib/node_modules'] }));
const orig = pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch = async (...a) => {
  const b = await orig(...a);
  const wrap = (ctx) => ctx.route('https://unpkg.com/leaflet@1.9.4/dist/**', r => {
    const f = path.join(DIST, new URL(r.request().url()).pathname.replace('/leaflet@1.9.4/dist/', ''));
    if (!fs.existsSync(f)) return r.fulfill({ status: 404, body: '' });
    r.fulfill({ status: 200, body: fs.readFileSync(f), contentType: f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'image/png' });
  });
  const np = b.newPage.bind(b); b.newPage = async (o) => { const p = await np(o); await wrap(p); return p; };
  const nc = b.newContext.bind(b); b.newContext = async (o) => { const c = await nc(o); await wrap(c); return c; };
  return b;
};
