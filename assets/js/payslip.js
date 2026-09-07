/* Payslip — the interactive pay card for Career & Industry pieces.
   Founder rule 2026-09-05: "explain all the important parts simply, direct and easy for people
   to understand, and make it an interactive one-page payslip card."

   Contract: one [data-payslip] root holding .payslip__opt buttons (data-k / data-v) and any
   number of [data-out="<key>"] targets. The markup ships with the default band already filled,
   so the card reads correctly with JavaScript off; this only makes it move.

   Honesty rules baked in, because a yacht payslip is not a shore payslip:
   - the bands are RANGES from named 2026 guides, so every figure stays a range;
   - tax and social contributions are NOT deducted at source on most yacht contracts, and depend
     on the reader's residency, so this never invents a net figure - it names the line and hands
     the arithmetic to the Pay Check tool;
   - tips are excluded from the hourly, banked separately.  */
(function () {
    'use strict';
    var root = document.querySelector('[data-payslip]');
    if (!root) return;

    // Monthly base, EUR, from the 2026 guides (YPI Crew, Northrop & Johnson, Lighthouse).
    // Where the guides disagree the row carries the span across them, per the article.
    var BANDS = {
        '30':  { label: 'Under 30 m',  role: 'Sole chef',                 lo: 4500,  hi: 6000  },
        '40':  { label: '30–40 m',     role: 'Sole chef',                 lo: 5000,  hi: 7500  },
        '60':  { label: '40–60 m',     role: 'Sole or head chef',         lo: 6000,  hi: 9000  },
        '80':  { label: '60–80 m',     role: 'Head chef, with a sous',    lo: 7000,  hi: 9000  },
        '100': { label: '80 m+',       role: 'Head chef of a brigade',    lo: 9000,  hi: 10000, open: true }
    };
    // A sous sits at about two-thirds of the head band in every guide that lists both.
    var ROLES = { head: { k: 1, name: 'Head or sole chef' }, sous: { k: 0.66, name: 'Sous chef' } };
    // Hours a month at the flag's ceiling: 91 h/wk (MLC minimum-rest limb) or a 72 h/wk cap.
    var FLAGS = { '91': 394, '72': 312 };

    var state = { size: '60', role: 'head', rot: 'no', flag: '91' };

    function r50(n) { return Math.round(n / 50) * 50; }
    function eur(n) { return '€' + r50(n).toLocaleString('en-GB'); }
    function range(lo, hi, open) { return eur(lo) + '–' + r50(hi).toLocaleString('en-GB') + (open ? '+' : ''); }

    function render() {
        var b = BANDS[state.size], r = ROLES[state.role];
        var lo = b.lo * r.k, hi = b.hi * r.k;
        // Rotation: each rotational salary typically runs 10-15% under the non-rotational rate
        // (Foreland Marine). Applied as the span, not a point estimate.
        var rot = state.rot === 'yes';
        var mLo = rot ? lo * 0.85 : lo, mHi = rot ? hi * 0.90 : hi;
        var hours = FLAGS[state.flag];

        var out = {
            band:    b.label + ' · ' + (state.role === 'sous' ? 'Sous chef' : b.role),
            gross:   range(mLo, mHi, b.open),
            annual:  '€' + (Math.round(mLo * 12 / 500) * 500).toLocaleString('en-GB') + '–' + (Math.round(mHi * 12 / 500) * 500).toLocaleString('en-GB') + (b.open ? '+' : ''),
            hourly:  '€' + (mLo / hours).toFixed(0) + '–' + (mHi / hours).toFixed(0) + '/h',
            leave:   '€' + Math.round(mLo / 30) + '–' + Math.round(mHi / 30) + ' a day',   // a leave day is worth monthly ÷ 30
            rot:     rot ? '−10 to −15%' : 'n/a',
            hours:   hours + ' h a month'
        };
        Object.keys(out).forEach(function (k) {
            root.querySelectorAll('[data-out="' + k + '"]').forEach(function (el) { el.textContent = out[k]; });
        });
        root.querySelectorAll('.payslip__opt').forEach(function (el) {
            el.setAttribute('aria-pressed', String(state[el.dataset.k] === el.dataset.v));
        });
    }

    root.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.payslip__opt') : null;
        if (!btn || !btn.dataset.k) return;
        state[btn.dataset.k] = btn.dataset.v;
        render();
    });

    render();
})();
