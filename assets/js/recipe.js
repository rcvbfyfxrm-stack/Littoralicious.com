/* Littoralicious — interactive recipe engine
 * Powers: live scaling, a Metric/US unit toggle (with per-ingredient
 * cup/tbsp/tsp conversion), tickable ingredients, step progress.
 * Zero dependencies. Opt-in via data attributes; pages without them are unaffected.
 *
 *   Scaler:    <div class="rcp-scaler" data-base-yield="12" data-yield-unit="portions"> … buttons [data-scale="2"] …
 *   Quantity:  <span data-qty="500" data-unit="g">500 g</span>   (data-round optional)
 *   Ingredient:<li class="rcp-ing"> … <span class="rcp-ing__n">Bread flour</span> …
 *   Steps:     <ol class="rcp-steps"><li class="rcp-step"> …
 * Scale + ticks persist per-article; the Metric/US choice persists globally.
 *
 * US mode converts each quantity by the INGREDIENT'S density (read from the
 * ingredient name, or the words next to the quantity in a step) to cups / tbsp
 * / tsp — for galleys where the scale has died. Things you weigh anyway (meat,
 * fish) fall back to oz/lb. Temperatures carry both °C and °F in the prose.
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

  /* ---- Density tables (grams per US cup / per tsp), specific keys first --- */
  var CUP = [
    ["rice flour", 158], ["cornflour", 120], ["cornstarch", 120], ["corn flour", 120],
    ["wholemeal", 125], ["whole wheat", 125], ["rye flour", 125], ["rye", 125], ["spelt", 125], ["semolina", 170],
    ["bread flour", 125], ["strong flour", 125], ["plain flour", 125], ["all-purpose", 125], ["00 flour", 125], ["flour", 125],
    ["icing sugar", 120], ["powdered sugar", 120], ["confection", 120],
    ["brown sugar", 220], ["muscovado", 220], ["demerara", 220],
    ["caster sugar", 200], ["granulated", 200], ["sugar", 200],
    ["honey", 340], ["golden syrup", 340], ["syrup", 320], ["treacle", 340], ["molasses", 340], ["maple", 320],
    ["olive oil", 218], ["vegetable oil", 218], ["sunflower oil", 218], ["neutral oil", 218], ["melted butter", 218], ["dripping", 218], ["goose fat", 218], ["duck fat", 218], ["lard", 205], ["oil", 218],
    ["mascarpone", 240], ["cream cheese", 240], ["sour cream", 240], ["creme fraiche", 240], ["crème fraîche", 240], ["yoghurt", 245], ["yogurt", 245], ["buttermilk", 245], ["double cream", 235], ["cream", 240], ["milk", 245],
    ["lager", 240], ["beer", 240], ["sparkling water", 240], ["soda water", 240], ["stock", 240], ["broth", 240], ["wine", 240], ["vodka", 235], ["gin", 235], ["rum", 235], ["brandy", 235], ["spirit", 235], ["juice", 240], ["brine", 240], ["water", 240],
    ["parmesan", 90], ["grated cheese", 100], ["cheddar", 100], ["gruy", 100], ["cheese", 100],
    ["cocoa", 85], ["rolled oats", 90], ["oats", 90], ["desiccated coconut", 80], ["coconut", 80], ["ground almond", 96], ["almond flour", 96], ["breadcrumb", 108], ["panko", 60], ["walnut", 120], ["pecan", 100], ["nuts", 120], ["raisin", 145], ["sultana", 145], ["currant", 145], ["rice", 185]
  ];
  var TSP = [
    ["baking powder", 4.6], ["baking soda", 4.6], ["bicarb", 4.6], ["bicarbonate", 4.6],
    ["instant yeast", 3.1], ["dried yeast", 3.1], ["dry yeast", 3.1], ["fresh yeast", 3.1], ["yeast", 3.1],
    ["fine sea salt", 6], ["sea salt", 6], ["table salt", 6], ["flaky salt", 4], ["kosher salt", 5], ["salt", 6],
    ["vanilla", 4.2], ["mustard", 5.3],
    ["cumin", 2.6], ["coriander", 2.1], ["paprika", 2.3], ["cinnamon", 2.6], ["nutmeg", 2.5], ["ginger", 1.8], ["turmeric", 3], ["cardamom", 2], ["cayenne", 1.8], ["chilli", 2.6], ["chili", 2.6], ["black pepper", 2.3], ["white pepper", 2.3], ["pepper", 2.3], ["spice", 2.5], ["baking", 4.6]
  ];

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

  /* nearest nice cooking fraction → "1¾" style */
  var FR = [[0, ""], [0.125, "⅛"], [0.25, "¼"], [0.333, "⅓"], [0.375, "⅜"], [0.5, "½"], [0.625, "⅝"], [0.667, "⅔"], [0.75, "¾"], [0.875, "⅞"], [1, ""]];
  function frac(x) {
    if (x < 0) x = 0;
    var whole = Math.floor(x), r = x - whole, best = 0, bd = 9;
    for (var i = 0; i < FR.length; i++) { var d = Math.abs(r - FR[i][0]); if (d < bd) { bd = d; best = i; } }
    var g = FR[best][1];
    if (FR[best][0] === 1) { whole += 1; g = ""; }
    if (whole === 0 && g === "") return "0";
    if (whole === 0) return g;
    return whole + g;
  }

  function ingName(el) {
    var li = el.closest ? el.closest(".rcp-ing") : null;
    if (li) { var n = li.querySelector(".rcp-ing__n"); if (n) return n.textContent || ""; }
    var t = "", sib = el.nextSibling, hops = 0;          // method step: read the words after the number
    while (sib && hops < 3) { t += " " + (sib.textContent || sib.nodeValue || ""); sib = sib.nextSibling; hops++; }
    return t;
  }
  function density(name) {
    name = (name || "").toLowerCase();
    if (/\beggs?\b/.test(name)) return { egg: true };
    var i;
    for (i = 0; i < CUP.length; i++) if (name.indexOf(CUP[i][0]) >= 0) return { cup: CUP[i][1] };
    for (i = 0; i < TSP.length; i++) if (name.indexOf(TSP[i][0]) >= 0) return { tsp: TSP[i][1] };
    return null;
  }
  function volFromCup(grams, gPerCup) {
    var cups = grams / gPerCup;
    if (cups >= 0.245) return frac(cups) + " cup" + (cups > 1.13 ? "s" : "");
    var tbsp = cups * 16;
    if (tbsp >= 0.9) return frac(tbsp) + " tbsp";
    return frac(cups * 48) + " tsp";
  }
  function volFromTsp(grams, gPerTsp) {
    var tsp = grams / gPerTsp;
    if (tsp >= 3) return frac(tsp / 3) + " tbsp";
    return frac(tsp) + " tsp";
  }
  function ozText(grams) {
    var oz = grams / 28.3495;
    if (oz >= 16) { var lb = Math.floor(oz / 16), r = Math.round((oz - lb * 16) * 10) / 10; return r >= 0.1 ? lb + " lb " + trim(r) + " oz" : lb + " lb"; }
    if (oz >= 1) return trim(Math.round(oz * 10) / 10) + " oz";
    return trim(Math.round(oz * 100) / 100) + " oz";
  }
  function metricText(val, unit, round) { return fmtNum(val, round) + (unit ? " " + unit : ""); }
  function usText(el, val, unit, round) {
    if (unit === "g") {
      var d = density(ingName(el));
      if (d) {
        if (d.egg) { var n = Math.max(1, Math.round(val / 50)); return n + " large"; }
        if (d.cup) return volFromCup(val, d.cup);
        if (d.tsp) return volFromTsp(val, d.tsp);
      }
      return ozText(val);
    }
    if (unit === "ml") return volFromCup(val, 236.6);
    return metricText(val, unit, round);          // counts (sprigs, squares…) unchanged
  }

  function renderQtys() {
    qtys.forEach(function (el) {
      var base = parseFloat(el.getAttribute("data-base"));
      if (isNaN(base)) return;
      var unit = el.getAttribute("data-unit") || "", round = el.getAttribute("data-round");
      var val = base * mult;
      el.textContent = units === "us" ? usText(el, val, unit, round) : metricText(val, unit, round);
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
      '<button type="button" data-units="us">US &middot; cups</button>' +
      '<span class="rcp-scaler__yield" style="opacity:.65;font-weight:400">no scale? switch to cups &middot; temps show &deg;C &amp; &deg;F</span>';
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
