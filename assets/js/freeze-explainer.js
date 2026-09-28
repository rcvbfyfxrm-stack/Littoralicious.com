// Freezing protein, under the lens — Technique v2 explainer (2026-09-28).
// Two blocks of muscle, cut across the fibres. Left: frozen slowly (home freezer, thick pack).
// Right: frozen fast (blast / plate, thin pack). One reader-driven timeline: FREEZE → STORE → THAW.
// Slow: few large crystals grow BETWEEN the fibres and pull water out of them; on thawing the
// fibres cannot take it back and it runs off as drip. Fast: many small crystals form INSIDE the
// fibres; they melt back where they formed. Mechanism: FAO APH Paper 92 (after the IIR);
// Ngapo et al. 1999, Meat Sci 53:149. The gauge is illustrative in time, exact in the band.
// Motion lock: no autoplay, Play runs once, paused off-screen, final frame under reduced motion.

const fig = document.getElementById('fx');
if (fig) init(fig);

async function init(fig) {
  const stage = fig.querySelector('.tq-explainer__stage');
  const labels = fig.querySelector('.tq-explainer__labels');
  const range = fig.querySelector('.tq-explainer__range');
  const play = fig.querySelector('.tq-explainer__play');
  const phaseEl = fig.querySelector('.tq-explainer__phase');
  const gauge = fig.querySelector('.tq-explainer__gauge');
  const readSlow = fig.querySelector('[data-read="slow"]');
  const readFast = fig.querySelector('[data-read="fast"]');
  let reduced = false;
  try { reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  // ---- timeline -----------------------------------------------------------
  const F_END = 0.55, S_END = 0.68;               // freeze | store | thaw
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ease = x => x * x * (3 - 2 * x);
  function state(t) {
    const f = clamp(t / F_END);
    const h = clamp((t - S_END) / (1 - S_END));
    const zs = ease(clamp((f - 0.10) / 0.72));      // slow: long passage through the crystal zone
    const zf = ease(clamp((f - 0.05) / 0.16));      // fast: short passage
    return { t, f, h, zs, zf, phase: t < F_END ? 'Freeze' : t < S_END ? 'Store' : 'Thaw' };
  }
  // Core temperature curves (°C) for the gauge.
  function tempSlow(t) {
    if (t <= F_END) { const f = t / F_END;
      if (f < 0.10) return 4 - 50 * f;              // +4 → −1
      if (f < 0.82) return -1 - 4 * ((f - 0.10) / 0.72); // the long plateau, −1 → −5
      return -5 - 13 * ((f - 0.82) / 0.18); }       // → −18
    if (t <= S_END) return -18;
    const h = (t - S_END) / (1 - S_END); return -18 + 20 * ease(h);
  }
  function tempFast(t) {
    if (t <= F_END) { const f = t / F_END;
      if (f < 0.05) return 4 - 100 * f;
      if (f < 0.21) return -1 - 4 * ((f - 0.05) / 0.16);
      return -5 - 25 * ((f - 0.21) / 0.79); }       // → −30
    if (t <= S_END) return -30;
    const h = (t - S_END) / (1 - S_END); return -30 + 32 * ease(h);
  }

  // ---- gauge (SVG, drawn at its own width so the text stays legible on a phone) --
  let GW = 760, GH = 170, gx0 = 44, gx1 = 746, head, ds, df;
  const gy = T => 14 + (6 - T) * (GH - 42) / 38;              // +6 … −32 °C
  const X = t => gx0 + t * (gx1 - gx0);
  function path(fn) { let d = ''; for (let i = 0; i <= 200; i++) { const t = i / 200; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + gy(fn(t)).toFixed(1); } return d; }
  function drawGauge() {
    GW = Math.max(320, Math.min(760, Math.round(gauge.clientWidth || 760)));
    GH = GW < 520 ? 190 : 170; gx1 = GW - 12;
    const mono = 'font-family="ui-monospace,Menlo,monospace" font-size="10" fill="#6b7280" letter-spacing=".06em"';
    const serif = 'font-family="Georgia,serif" font-size="12" style="font-variant:small-caps;letter-spacing:.04em"';
    gauge.setAttribute('viewBox', `0 0 ${GW} ${GH}`);
    gauge.innerHTML = `
      <rect x="${gx0}" y="${gy(-1)}" width="${gx1 - gx0}" height="${gy(-5) - gy(-1)}" fill="#2d4a5e" opacity=".12"/>
      <text x="${X(0.47)}" y="${gy(-1) - 5}" ${serif} fill="#2d4a5e">crystal zone · −1 to −5 °C</text>
      ${[0, -10, -20, -30].map(T => `<line x1="${gx0}" x2="${gx1}" y1="${gy(T)}" y2="${gy(T)}" stroke="#0a0a0a" stroke-opacity="${T === 0 ? .45 : .1}"/><text x="${gx0 - 6}" y="${gy(T) + 4}" text-anchor="end" ${mono}>${T === 0 ? '0' : '−' + (-T)}°</text>`).join('')}
      ${[[0, 'freeze'], [F_END, 'store'], [S_END, 'thaw']].map(([t, l]) => `${t ? `<line x1="${X(t)}" x2="${X(t)}" y1="10" y2="${GH - 22}" stroke="#0a0a0a" stroke-opacity=".22" stroke-dasharray="3 3"/>` : ''}<text x="${X(t) + 5}" y="${GH - 26}" ${mono}>${l.toUpperCase()}</text>`).join('')}
      <path d="${path(tempSlow)}" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-dasharray="6 4"/>
      <path d="${path(tempFast)}" fill="none" stroke="#2d4a5e" stroke-width="2.5"/>
      <text x="${X(0.3)}" y="${gy(-5) + 14}" ${serif} fill="#0a0a0a">slow · hours in the zone</text>
      <text x="${X(0.03)}" y="${gy(-25)}" ${serif} fill="#2d4a5e">fast · under 2 h</text>
      <line id="fx-head" x1="0" x2="0" y1="8" y2="${GH - 20}" stroke="#c4a35a" stroke-width="2"/>
      <circle id="fx-ds" r="4.5" fill="#0a0a0a"/><circle id="fx-df" r="4.5" fill="#2d4a5e"/>
      <text x="${gx0}" y="${GH - 5}" ${mono}>CORE TEMPERATURE · TIME →</text>`;
    head = gauge.querySelector('#fx-head'); ds = gauge.querySelector('#fx-ds'); df = gauge.querySelector('#fx-df');
  }
  drawGauge();

  function readout(s) {
    const slow = s.phase === 'Freeze'
      ? (s.zs < 0.05 ? 'Cooling. No ice yet.' : `Ice grows <em>between</em> the fibres, drawing water out of them. Fibres at ${Math.round(100 - 28 * s.zs)} % of their width.`)
      : s.phase === 'Store' ? 'Frozen. Few, large crystals; the fibres are shrunk and the cells are torn.'
      : `Thawing. The water sits outside the fibres and runs off: <strong>drip</strong>.`;
    const fast = s.phase === 'Freeze'
      ? (s.zf < 0.05 ? 'Cooling. No ice yet.' : 'Many small crystals form <em>inside</em> the fibres, where the water already was.')
      : s.phase === 'Store' ? 'Frozen. Fine ice, fibres whole. Hold it steady or the small crystals feed the big ones.'
      : 'Thawing. The ice melts back where it formed; the fibres keep it. Barely a trace on the tray.';
    readSlow.innerHTML = `<b>Slow</b>${slow}`; readFast.innerHTML = `<b>Fast</b>${fast}`;
    phaseEl.textContent = s.phase;
    head.setAttribute('x1', X(s.t)); head.setAttribute('x2', X(s.t));
    ds.setAttribute('cx', X(s.t)); ds.setAttribute('cy', gy(tempSlow(s.t)));
    df.setAttribute('cx', X(s.t)); df.setAttribute('cy', gy(tempFast(s.t)));
  }

  // ---- 3D -------------------------------------------------------------------
  let THREE, OrbitControls, RoomEnvironment;
  try {
    THREE = await import('three');
    ({ OrbitControls } = await import('three/addons/controls/OrbitControls.js'));
    ({ RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js'));
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) throw new Error('no webgl');
  } catch (e) {
    fig.classList.add('is-static');
    const s = state(1); readout(s);
    new ResizeObserver(() => { drawGauge(); readout(state(range.value / 1000)); }).observe(gauge);
    range.addEventListener('input', () => readout(state(range.value / 1000)));
    if (play) play.hidden = true;
    return;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xf1efe9, 1);
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(30, 1.6, 0.1, 100);
  camera.position.set(0, 7.4, 9.6);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.2, 0);
  controls.enablePan = false; controls.enableZoom = false; controls.enableDamping = false;
  controls.minPolarAngle = 0.35; controls.maxPolarAngle = 1.15;
  controls.minAzimuthAngle = -0.6; controls.maxAzimuthAngle = 0.6;

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-4, 9, 6); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 6, bottom: -6 });
  scene.add(key, new THREE.AmbientLight(0xffffff, 0.25));

  // tray
  const tray = new THREE.Mesh(new THREE.BoxGeometry(12, 0.12, 6.2), new THREE.MeshStandardMaterial({ color: 0xd9d6ce, roughness: 0.35, metalness: 0.55 }));
  tray.position.y = -0.86; tray.receiveShadow = true; scene.add(tray);

  const fibreMat = new THREE.MeshPhysicalMaterial({ color: 0xb87c78, roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.4, sheen: 0.4, sheenColor: new THREE.Color(0xf2c9c3) });
  const matrixMat = new THREE.MeshStandardMaterial({ color: 0x6e4644, roughness: 0.8 });
  const iceMat = new THREE.MeshPhysicalMaterial({ color: 0xbfe0f5, roughness: 0.12, metalness: 0, transmission: 0.25, thickness: 0.6, ior: 1.31, clearcoat: 1, emissive: 0x9fcbe8, emissiveIntensity: 0.35 });
  const dripMat = new THREE.MeshPhysicalMaterial({ color: 0xc98b86, roughness: 0.05, transmission: 0.55, thickness: 0.3, ior: 1.34, clearcoat: 1, transparent: true, opacity: 0.85 });

  const R = 0.2, SP = 0.46, H = 1.5;
  const pts = [];                                            // hex-packed fibre centres, 6 × 6
  for (let r = 0; r < 6; r++) for (let q = 0; q < 6; q++) pts.push([(q - 2.75 + (r % 2) * 0.5) * SP, (r - 2.5) * SP * 0.866]);
  const gaps = [];                                           // interstitial points (between three fibres)
  for (let r = 0; r < 5; r++) for (let q = 0; q < 5; q++) if ((q + r) % 2 === 0) gaps.push([(q - 2.25 + (r % 2) * 0.5) * SP, (r - 2.5 + 0.577) * SP * 0.866]);

  function block(cx, slow) {
    const g = new THREE.Group(); g.position.x = cx; scene.add(g);
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.05, 0.12, 2.75), matrixMat);
    base.position.y = -0.74; base.castShadow = base.receiveShadow = true; g.add(base);
    const fib = new THREE.InstancedMesh(new THREE.CylinderGeometry(R, R, H, 28, 1), fibreMat, pts.length);
    fib.castShadow = fib.receiveShadow = true; g.add(fib);
    const n = slow ? gaps.length : pts.length * 5;
    const ice = new THREE.InstancedMesh(new THREE.OctahedronGeometry(1, 0), iceMat, n);
    ice.castShadow = true; g.add(ice);
    const seeds = [];
    for (let i = 0; i < n; i++) {
      if (slow) { const [x, z] = gaps[i]; seeds.push({ x, z, rot: i * 1.7 }); }
      else { const [x, z] = pts[Math.floor(i / 5)], a = (i % 5) * 1.2566 + i * 0.37, d = (i % 5 === 0) ? 0 : R * 0.55;
        seeds.push({ x: x + Math.cos(a) * d, z: z + Math.sin(a) * d, rot: i * 2.3 }); }
    }
    const puddle = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.03, 64), dripMat);
    puddle.position.y = -0.785; puddle.scale.set(0.001, 1, 0.001); g.add(puddle);
    const drops = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 14, 10), dripMat, 18); g.add(drops);
    return { g, fib, ice, seeds, puddle, drops, slow };
  }
  const S = block(-2.05, true), Fb = block(2.05, false);

  const m4 = new THREE.Matrix4(), q4 = new THREE.Quaternion(), v3 = new THREE.Vector3(), s3 = new THREE.Vector3(), eu = new THREE.Euler();
  function pose(b, s) {
    const z = b.slow ? s.zs : s.zf, h = s.h;
    const shrink = b.slow ? 1 - 0.28 * z + 0.08 * h : 1 - 0.03 * z + 0.02 * h;
    pts.forEach(([x, zz], i) => { v3.set(x, 0, zz); s3.set(shrink, 1, shrink); m4.compose(v3, q4.identity(), s3); b.fib.setMatrixAt(i, m4); });
    b.fib.instanceMatrix.needsUpdate = true;
    const melt = 1 - ease(clamp(h * 1.4));
    b.seeds.forEach((p, i) => {
      let sc;
      if (b.slow) { const grow = clamp(z * 1.25 - (i % 4) * 0.06); sc = 0.07 + 0.2 * grow; v3.set(p.x, 0.1 + 0.45 * grow, p.z); s3.set(sc, 0.95 * grow + 0.001, sc); }
      else { const grow = clamp(z * 1.6 - (i % 7) * 0.05); sc = 0.05 * grow; v3.set(p.x, H / 2 + 0.012, p.z); s3.set(sc, sc * 0.8, sc); }
      s3.multiplyScalar(melt < 0.02 ? 0.0001 : melt);
      q4.setFromEuler(eu.set(0, p.rot, 0)); m4.compose(v3, q4, s3); b.ice.setMatrixAt(i, m4);
    });
    b.ice.instanceMatrix.needsUpdate = true;
    const reach = (b.slow ? 0.6 : 0.08) * ease(h);        // how far the drip spreads past the block
    b.puddle.scale.set(1.5 + reach, 1, 1.35 + reach);
    b.puddle.visible = b.slow ? h > 0.02 : h > 0.3;
    for (let i = 0; i < 18; i++) {
      const live = b.slow && h > 0.05;
      const k = ((h * 3 + i / 18) % 1);
      const side = i % 2 ? 1 : -1;
      v3.set(side * (1.5 + 0.12 * k), 0.1 - 0.85 * k, ((i * 0.37) % 1 - 0.5) * 2.4);
      const r = live ? 0.055 * (1 - k * 0.4) : 0.0001; s3.set(r, r * 1.35, r);
      m4.compose(v3, q4.identity(), s3); b.drops.setMatrixAt(i, m4);
    }
    b.drops.instanceMatrix.needsUpdate = true;
  }

  // leader labels, projected from the scene each frame
  const tags = [
    { get: () => [S.g.position.x + gaps[12][0], 1.05, gaps[12][1]], txt: 'ice between the fibres', short: 'ice between', dx: -30, dy: -64, show: s => s.zs > 0.35 && s.h < 0.5 },
    { get: () => [S.g.position.x + pts[0][0], 0.75, pts[0][1]], txt: 'muscle fibre', short: 'fibre', dx: -40, dy: 54, show: () => true },
    { get: () => [Fb.g.position.x + pts[20][0], 0.76, pts[20][1]], txt: 'ice inside the fibre', short: 'ice inside', dx: 30, dy: -64, show: s => s.zf > 0.35 && s.h < 0.5 },
    { get: () => [S.g.position.x - 1.9, -0.78, 0.9], txt: 'drip', short: 'drip', dx: -10, dy: 46, show: s => s.h > 0.35 },
  ];
  function drawLabels(s) {
    const w = stage.clientWidth, h = stage.clientHeight; let out = '';
    if (!w || !h) return;
    const narrow = w < 520, k = narrow ? 0.6 : 1;
    labels.setAttribute('viewBox', `0 0 ${w} ${h}`);
    tags.forEach(t => { if (!t.show(s)) return; v3.set(...t.get()).project(camera);
      const x = (v3.x + 1) / 2 * w, y = (1 - v3.y) / 2 * h, lx = x + t.dx * k, ly = y + t.dy * k;
      if (!isFinite(x) || !isFinite(y)) return;
      out += `<circle cx="${x}" cy="${y}" r="2.5"/><line x1="${x}" y1="${y}" x2="${lx}" y2="${ly}"/><text x="${lx + (t.dx < 0 ? -4 : 4)}" y="${ly + (t.dy < 0 ? -5 : 13)}" text-anchor="${t.dx < 0 ? 'end' : 'start'}" style="font-size:${narrow ? 11 : 13}px">${narrow ? t.short : t.txt}</text>`; });
    out += narrow
      ? `<text x="${w * 0.27}" y="22" text-anchor="middle" style="font-size:13px">slow freeze</text><text x="${w * 0.73}" y="22" text-anchor="middle" style="font-size:13px">fast freeze</text>`
      : `<text x="${w * 0.27}" y="26" text-anchor="middle" style="font-size:14px">slow · home freezer, thick pack</text><text x="${w * 0.73}" y="26" text-anchor="middle" style="font-size:14px">fast · blast or plate, thin pack</text>`;
    labels.innerHTML = out;
  }

  let cur = state(reduced ? 1 : 0.34);
  function render() { pose(S, cur); pose(Fb, cur); renderer.render(scene, camera); drawLabels(cur); readout(cur); }
  function resize() { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h;
    const back = Math.max(1, 1.6 / camera.aspect);
    camera.position.set(0, 7.4 * back, 9.6 * back); controls.update();
    camera.updateProjectionMatrix(); drawGauge(); render(); }
  new ResizeObserver(resize).observe(stage);
  controls.addEventListener('change', render);
  range.value = Math.round(cur.t * 1000);
  range.addEventListener('input', () => { stop(); cur = state(range.value / 1000); render(); });

  let raf = 0, onScreen = true, t0 = 0, from = 0;
  function stop() { cancelAnimationFrame(raf); raf = 0; play.textContent = 'Play'; }
  function tick(now) {
    if (!onScreen) { raf = 0; return; }
    const t = Math.min(1, from + (now - t0) / 9000);
    cur = state(t); range.value = Math.round(t * 1000); render();
    if (t < 1) raf = requestAnimationFrame(tick); else stop();
  }
  play.addEventListener('click', () => {
    if (raf) { stop(); return; }
    from = cur.t >= 0.999 ? 0 : cur.t; t0 = performance.now(); play.textContent = 'Pause';
    raf = requestAnimationFrame(tick);
  });
  new IntersectionObserver(es => { onScreen = es[0].isIntersecting; if (!onScreen && raf) stop(); }, { threshold: 0.05 }).observe(stage);
  fig.classList.add('is-live');
  resize();
}
