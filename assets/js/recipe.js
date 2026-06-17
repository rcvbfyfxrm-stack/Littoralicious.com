/* Littoralicious — interactive recipe engine
 * Powers: live scaling of quantities, a Metric/US unit toggle, tickable
 * ingredients, step progress. Zero dependencies. Opt-in via data attributes;
 * pages without them are unaffected.
 *
 *   Scaler:    <div class="rcp-scaler" data-base-yield="12" data-yield-unit="portions"> … buttons [data-scale="2"] …
 *   Quantity:  <span data-qty="500" data-unit="g">500 g</span>   (data-round optional)
 *   Ingredient:<li class="rcp-ing"> … with a checkbox
 *   Steps:     <ol class="rcp-steps"><li class="rcp-step"> …
 * Scale + ticks persist per-article; the Metric/US choice persists globally.
 * Units: weights g↔oz/lb and ml↔fl oz are exact conversions; temperatures are
 * written with both °C and °F in the prose, so they read in either system.
 */
(function () {
  "use strict";
  var root = document.querySelector("[data-recipe]");
  if (!root) return;
  var slug = root.getAttribute("data-recipe") || location.pathname;
  var KEY = "rcp:" + slug, UNITS_KEY = "rcp:units";
  var store = load();
  var units = loadUnits();
  var mult = store.scale || 1;

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }
  function loadUnits() { try { return localStorage.getItem(UNITS_KEY) === "us" ? "us" : "metric"; } catch (e) { return "metric"; } }
  function saveUnits() { try { localStorage.setItem(UNITS_KEY, units); } catch (e) {} }

  /* ---- Quantities ------------------------------------------------------- */
  var qtys = [].slice.call(root.querySelectorAll("[data-qty]"));
  qtys.forEach(function (el) { if (!el.hasAttribute("data-base")) el.setAttribute("data-base", el.getAttribute("data-qty")); });

  function fmtNum(n, round) {
    if (round != null && round !== "") { return (+n).toFixed(+round).replace(/\.0+$/, ""); }
    var a = Math.abs(n);
    if (a >= 10) return String(Math.round(n));
    if (a >= 1) return (Math.round(n * 10) / 10).toString();
    return (Math.round(n * 100) / 100).toString();
  }
  var trim = function (x) { return String(x).replace(/\.0$/, ""); };

  function metricText(val, unit, round) { return fmtNum(val, round) + (unit ? " " + unit : ""); }

  function usText(val, unit, round) {
    if (unit === "g") {                         // weight: grams -> oz / lb
      var oz = val / 28.3495;
      if (oz >= 16) {
        var lb = Math.floor(oz / 16), r = Math.round((oz - lb * 16) * 10) / 10;
        return r >= 0.1 ? lb + " lb " + trim(r) + " oz" : lb + " lb";
      }
      if (oz >= 1) return trim(Math.round(oz * 10) / 10) + " oz";
      return trim(Math.round(oz * 100) / 100) + " oz";
    }
    if (unit === "ml") return trim(Math.round((val / 29.5735) * 10) / 10) + " fl oz";  // volume
    return metricText(val, unit, round);        // counts (sprigs, squares…) unchanged
  }

  function renderQtys() {
    qtys.forEach(function (el) {
      var base = parseFloat(el.getAttribute("data-base"));
      if (isNaN(base)) return;
      var unit = el.getAttribute("data-unit") || "", round = el.getAttribute("data-round");
      var val = base * mult;
      el.textContent = units === "us" ? usText(val, unit, round) : metricText(val, unit, round);
    });
    root.querySelectorAll(".rcp-scaler:not(.rcp-units)").forEach(function (sc) {
      var by = parseFloat(sc.getAttribute("data-base-yield")), yl = sc.querySelector("[data-yield]");
      if (yl && !isNaN(by)) yl.textContent = fmtNum(by * mult, "0");
    });
  }

  /* ---- Scaling ---------------------------------------------------------- */
  function applyScale(m) { mult = m; store.scale = m; save(); renderQtys(); }
  root.querySelectorAll(".rcp-scaler:not(.rcp-units) [data-scale]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var m = parseFloat(btn.getAttribute("data-scale")) || 1;
      root.querySelectorAll(".rcp-scaler:not(.rcp-units) [data-scale]").forEach(function (b) { b.classList.toggle("active", b === btn); });
      applyScale(m);
    });
  });
  (function () {
    var match = root.querySelector('.rcp-scaler:not(.rcp-units) [data-scale="' + mult + '"]');
    root.querySelectorAll('.rcp-scaler:not(.rcp-units) [data-scale]').forEach(function (b) {
      b.classList.toggle("active", b === match || (!match && parseFloat(b.getAttribute("data-scale")) === 1));
    });
  })();

  /* ---- Units toggle (injected, reuses .rcp-scaler styling) -------------- */
  (function () {
    var anchor = root.querySelector(".rcp-scaler:not(.rcp-units)") || root.querySelector(".rcp-ings") || root.querySelector("h2");
    if (!anchor || !anchor.parentNode) { renderQtys(); return; }
    var box = document.createElement("div");
    box.className = "rcp-scaler rcp-units";
    box.innerHTML =
      '<span class="rcp-scaler__label">Units</span>' +
      '<button type="button" data-units="metric">Metric &middot; g</button>' +
      '<button type="button" data-units="us">US &middot; oz</button>' +
      '<span class="rcp-scaler__yield" style="opacity:.65;font-weight:400">temps show &deg;C &amp; &deg;F</span>';
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
    function paint() { box.querySelectorAll("[data-units]").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-units") === units); }); }
    box.querySelectorAll("[data-units]").forEach(function (b) {
      b.addEventListener("click", function () { units = b.getAttribute("data-units"); saveUnits(); paint(); renderQtys(); });
    });
    paint();
    renderQtys();
  })();

  /* ---- Tickable ingredients -------------------------------------------- */
  store.ing = store.ing || {};
  root.querySelectorAll(".rcp-ing").forEach(function (li, i) {
    var cb = li.querySelector('input[type="checkbox"]');
    if (!cb) return;
    if (store.ing[i]) { cb.checked = true; li.classList.add("done"); }
    cb.addEventListener("change", function () { li.classList.toggle("done", cb.checked); store.ing[i] = cb.checked; save(); });
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
    function toggle() { li.classList.toggle("done"); store.step[i] = li.classList.contains("done"); save(); refresh(); }
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
