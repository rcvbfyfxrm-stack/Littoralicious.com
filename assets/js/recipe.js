/* Littoralicious — interactive recipe engine
 * Powers: live scaling of quantities, tickable ingredients, step progress.
 * Zero dependencies. Opt-in via data attributes; pages without them are unaffected.
 *
 *   Scaler:      <div class="rcp-scaler" data-base-yield="12" data-yield-unit="portions"> … buttons [data-scale="2"] …
 *   Quantity:    <span data-qty="500" data-unit="g">500 g</span>   (data-round optional: decimals)
 *   Ingredient:  <li class="rcp-ing"> … with a checkbox
 *   Steps:       <ol class="rcp-steps"><li class="rcp-step"> … (engine adds tick + progress)
 * State (ticks/steps/scale) persists per-article in localStorage.
 */
(function () {
  "use strict";
  var root = document.querySelector("[data-recipe]");
  if (!root) return;
  var slug = root.getAttribute("data-recipe") || location.pathname;
  var KEY = "rcp:" + slug;
  var store = load();

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }

  /* ---- Scaling ---------------------------------------------------------- */
  var qtys = [].slice.call(root.querySelectorAll("[data-qty]"));
  qtys.forEach(function (el) { if (!el.hasAttribute("data-base")) el.setAttribute("data-base", el.getAttribute("data-qty")); });

  function fmt(n, round) {
    if (round != null && round !== "") { var d = +round; return n.toFixed(d).replace(/\.0+$/, ""); }
    var a = Math.abs(n);
    if (a >= 100) return String(Math.round(n));
    if (a >= 10) return String(Math.round(n));            // 10–99 → whole
    if (a >= 1) return (Math.round(n * 10) / 10).toString(); // 1–9 → 1 dp
    return (Math.round(n * 100) / 100).toString();          // <1 → 2 dp
  }
  function applyScale(mult) {
    qtys.forEach(function (el) {
      var base = parseFloat(el.getAttribute("data-base"));
      if (isNaN(base)) return;
      var unit = el.getAttribute("data-unit") || "";
      el.textContent = fmt(base * mult, el.getAttribute("data-round")) + (unit ? " " + unit : "");
    });
    root.querySelectorAll(".rcp-scaler").forEach(function (sc) {
      var by = parseFloat(sc.getAttribute("data-base-yield"));
      var yl = sc.querySelector("[data-yield]");
      if (yl && !isNaN(by)) yl.textContent = fmt(by * mult, "0");
    });
    store.scale = mult; save();
  }

  root.querySelectorAll(".rcp-scaler [data-scale]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var m = parseFloat(btn.getAttribute("data-scale")) || 1;
      root.querySelectorAll(".rcp-scaler [data-scale]").forEach(function (b) { b.classList.toggle("active", b === btn); });
      applyScale(m);
    });
  });
  // restore saved scale (default 1)
  (function () {
    var m = store.scale || 1;
    var match = root.querySelector('.rcp-scaler [data-scale="' + m + '"]');
    root.querySelectorAll(".rcp-scaler [data-scale]").forEach(function (b) {
      b.classList.toggle("active", b === match || (!match && parseFloat(b.getAttribute("data-scale")) === 1));
    });
    if (m !== 1) applyScale(m);
  })();

  /* ---- Tickable ingredients -------------------------------------------- */
  store.ing = store.ing || {};
  root.querySelectorAll(".rcp-ing").forEach(function (li, i) {
    var cb = li.querySelector('input[type="checkbox"]');
    if (!cb) return;
    if (store.ing[i]) { cb.checked = true; li.classList.add("done"); }
    cb.addEventListener("change", function () {
      li.classList.toggle("done", cb.checked);
      store.ing[i] = cb.checked; save();
    });
  });

  /* ---- Step progress ---------------------------------------------------- */
  store.step = store.step || {};
  var steps = [].slice.call(root.querySelectorAll(".rcp-step"));
  var bar = root.querySelector("[data-progress-bar]");
  var doneEl = root.querySelector("[data-progress-done]");
  var totalEl = root.querySelector("[data-progress-total]");
  if (totalEl) totalEl.textContent = steps.length;

  function refresh() {
    var n = steps.filter(function (s) { return s.classList.contains("done"); }).length;
    if (doneEl) doneEl.textContent = n;
    if (bar) bar.style.width = (steps.length ? (n / steps.length) * 100 : 0) + "%";
  }
  steps.forEach(function (li, i) {
    var btn = li.querySelector(".rcp-step__check");
    if (store.step[i]) li.classList.add("done");
    function toggle() {
      li.classList.toggle("done");
      store.step[i] = li.classList.contains("done"); save(); refresh();
    }
    if (btn) btn.addEventListener("click", toggle);
  });
  refresh();

  /* ---- Reset ------------------------------------------------------------ */
  var reset = root.querySelector("[data-recipe-reset]");
  if (reset) reset.addEventListener("click", function () {
    store.ing = {}; store.step = {}; save();
    root.querySelectorAll(".rcp-ing.done").forEach(function (li) { li.classList.remove("done"); var c = li.querySelector("input"); if (c) c.checked = false; });
    steps.forEach(function (s) { s.classList.remove("done"); });
    refresh();
  });
})();
