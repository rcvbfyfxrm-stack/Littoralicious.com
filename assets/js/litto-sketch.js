/**
 * LittoSketch — shared motion kit for technical-pencil figures.
 *
 * Motion lock (content/DESIGN-LOCK.md · Motion): a figure may draw itself ONCE
 * when it enters the viewport (≤2.5s, ease-out), then rest or simulate. It
 * pauses off-screen and when the tab is hidden. Under prefers-reduced-motion
 * it renders a single static final frame; only direct user input re-renders.
 * Pencil palette: ink #131312 on paper #F6F5F1. Zero dependencies.
 *
 * Usage:
 *   var fig = LittoSketch.attach(canvas, {
 *     width: 720, height: 500,          // logical pixels (canvas is DPR-scaled)
 *     revealDuration: 2.2,              // draw-on seconds, hard-capped at 2.5
 *     state: { T: 50 },                 // your simulation state, merged in
 *     simulate: function (state, dt) {},// advance the live sim (skipped while revealing)
 *     draw: function (ctx, state) {}    // render one frame; state.reveal ∈ [0,1]
 *   });
 *   fig.invalidate();          // render one frame on demand (reduced-motion path)
 *   fig.hold(seconds);         // user is interacting — pause auto behaviour
 *   fig.state / fig.reduced
 */
(function () {
    'use strict';

    var reduced = false;
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var CSS = '.sketch-figure{margin:var(--space-10,3rem) 0;text-align:center;}' +
        '.sketch-figure__plate{position:relative;display:block;margin:0 auto;max-width:680px;border:1px solid var(--color-border,#d9d6cd);background:#F6F5F1;}' +
        '.sketch-figure__canvas{display:block;width:100%;height:auto;touch-action:pan-y;}' +
        '.sketch-figure__scrub{display:flex;align-items:center;gap:.7em;justify-content:center;margin-top:.7em;font-family:var(--font-mono,ui-monospace,monospace);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--color-salt,#94a3b8);}' +
        '.sketch-figure__scrub input[type=range]{width:min(300px,60%);accent-color:var(--color-sea,#2d4a5e);}' +
        '.sketch-figure__scrub output{min-width:4.5em;text-align:left;color:var(--color-muted,#525252);}' +
        '.sketch-figure__caption{margin:var(--space-4,1rem) auto 0;max-width:56ch;font-family:var(--font-serif,Georgia,serif);font-style:italic;font-size:var(--text-sm,.9rem);line-height:1.5;color:var(--color-muted,#525252);}' +
        '.sketch-figure__caption b{font-style:normal;color:var(--color-ink,#131312);font-weight:600;}';

    function injectCSS() {
        if (document.getElementById('litto-sketch-css')) return;
        var s = document.createElement('style');
        s.id = 'litto-sketch-css';
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function easeOutCubic(u) { u = Math.min(Math.max(u, 0), 1); return 1 - Math.pow(1 - u, 3); }

    function attach(canvas, opts) {
        injectCSS();
        // opts.staticFrame forces the single-frame path (same as reduced motion) —
        // used for headless capture / PNG export of a figure at a chosen state
        var isStatic = reduced || !!opts.staticFrame;
        var DPR = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(opts.width * DPR);
        canvas.height = Math.round(opts.height * DPR);
        var ctx = canvas.getContext('2d');
        ctx.scale(DPR, DPR);

        var state = opts.state || {};
        state.t = 0;
        state.reveal = isStatic ? 1 : 0;

        var revealDuration = Math.min(opts.revealDuration || 2.2, 2.5);
        var revealT = 0, revealDone = isStatic;
        var visible = false, raf = null, last = null, holdUntil = 0;

        function running() {
            if (document.hidden || !visible) return false;
            if (isStatic) return false;   // static frame; input calls invalidate()
            return true;
        }

        function frame(now) {
            raf = null;
            if (last == null) last = now;
            var dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            state.t += dt;
            if (!revealDone) {
                revealT += dt;
                state.reveal = easeOutCubic(revealT / revealDuration);
                if (revealT >= revealDuration) { revealDone = true; state.reveal = 1; }
            } else if (opts.simulate && state.t >= holdUntil) {
                opts.simulate(state, dt);
            }
            opts.draw(ctx, state);
            if (running()) schedule();
        }

        function schedule() { if (raf == null) { raf = requestAnimationFrame(frame); } }
        function wake() { last = null; if (running()) schedule(); }

        function invalidate() {
            // one on-demand frame — the only render path in static/reduced mode
            state.reveal = revealDone ? 1 : state.reveal;
            if (isStatic) { state.reveal = 1; opts.draw(ctx, state); return; }
            schedule();
        }

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) wake();
            }, { threshold: 0.25 }).observe(canvas);
        } else {
            visible = true; wake();
        }
        document.addEventListener('visibilitychange', wake);

        if (isStatic) opts.draw(ctx, state);   // final frame, immediately

        return {
            state: state,
            reduced: isStatic,
            invalidate: invalidate,
            hold: function (seconds) { holdUntil = state.t + (seconds || 4); if (!isStatic) schedule(); }
        };
    }

    window.LittoSketch = { attach: attach, reduced: reduced };
})();
