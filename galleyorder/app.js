/* ============================================================================
   LITTORALICIOUS — Galley Order System  ·  v3
   Yacht-chef intelligence layer:
   · multiple named drafts          · PAX × days portion-math
   · seasonal calendar              · allergen tagging + filter
   · guest profile flagging         · quick ±/×2/×5 entry
   · keyboard shortcuts             · WhatsApp / plain-text export
   · first-time onboarding          · strong Littoralicious print
   Vanilla JS · localStorage-only · no dependencies.
   ============================================================================ */
(function () {
  "use strict";

  const STORAGE_KEY = "littoralicious-galley-v3";
  const LEGACY_KEY = "littoralicious-galley-v2"; // migrate from previous

  const GROUPS = [
    { id: "proteins", label: "Fresh Order · Proteins", cats: ["fish", "meat", "specialty-meat"] },
    { id: "luxury", label: "Luxury · Caviar & Smoked", cats: ["caviar"] },
    { id: "produce", label: "Produce · Veg & Fruit", cats: ["produce"] },
    { id: "cold-storage", label: "Cold Storage", cats: ["cheese-dairy", "freezer", "ice-cream"] },
    { id: "pantry-core", label: "Pantry Core · Dry Storage", cats: ["western", "grains-pasta", "spices"] },
    { id: "patisserie", label: "Patisserie · Bakery", cats: ["bakery", "modernist"] },
    { id: "specialty", label: "Specialty Workshop", cats: ["garde-manger"] },
    { id: "asia", label: "Asian Cuisines", cats: ["japan-korea", "sea", "chinese", "india"] },
    { id: "med-africa", label: "Mediterranean & Africa", cats: ["middle-east", "africa"] },
    { id: "americas", label: "The Americas", cats: ["mexican", "caribbean", "south-america"] },
    { id: "operations", label: "Galley Operations · Smallwares", cats: ["equipment"] },
  ];

  const ALLERGEN_LIST = ["fish","shellfish","egg","gluten","nuts","dairy","sesame","pork","beef","soy"];

  let state;
  let dirtyTimer = null;
  let renderTimer = null;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // ─── STATE ──────────────────────────────────────────────────────────────
  function todayISO() { return new Date().toISOString().slice(0, 10); }
  function currentMonth() { return new Date().getMonth() + 1; }
  function newId() { return "d-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6); }

  function defaultDraft(name) {
    return {
      id: newId(),
      name: name || "Untitled order",
      date: todayISO(),
      supplier: "",
      vessel: "",
      items: {}, // itemId -> { qty, notes }
    };
  }

  function defaultState() {
    const d = defaultDraft("Default order");
    return {
      favourites: {},
      unitOverrides: {},
      customItems: {},
      drafts: [d],
      activeDraftId: d.id,
      history: [],
      pax: { guest: 0, crew: 0, days: 7 },
      profile: "none",
      port: "none",
      hiddenAllergens: [],
      ui: {
        activeCategory: null,
        search: "",
        tierFilter: 0,
        showOnlyOrdered: false,
        openGroups: { proteins: true },
        openCategories: {},
        openSections: {},
        openSpecialty: {},
        theme: detectTheme(),
        onboarded: false,
      },
    };
  }

  function detectTheme() {
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }

  function loadState() {
    const def = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY);
      if (!raw) return def;
      const parsed = JSON.parse(raw);
      // legacy migration: v2 had `current` instead of `drafts[]`
      if (parsed.current && !parsed.drafts) {
        const draft = defaultDraft("Imported order");
        draft.date = parsed.current.date || todayISO();
        draft.supplier = parsed.current.supplier || "";
        draft.vessel = parsed.current.vessel || "";
        draft.items = parsed.current.items || {};
        parsed.drafts = [draft];
        parsed.activeDraftId = draft.id;
        delete parsed.current;
      }
      const merged = Object.assign(def, parsed);
      merged.ui = Object.assign(def.ui, parsed.ui || {});
      merged.pax = Object.assign(def.pax, parsed.pax || {});
      if (!merged.drafts || !merged.drafts.length) merged.drafts = [defaultDraft("Default order")];
      if (!merged.drafts.find(d => d.id === merged.activeDraftId)) merged.activeDraftId = merged.drafts[0].id;
      return merged;
    } catch (e) { console.warn("loadState failed", e); return def; }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      indicateSaved();
    } catch (e) { console.warn("saveState failed", e); }
  }

  function indicateSaved() {
    const el = $("#autosave");
    if (!el) return;
    el.textContent = "Saved";
    el.classList.add("saved");
    clearTimeout(dirtyTimer);
    dirtyTimer = setTimeout(() => { el.textContent = "Autosaved"; }, 1400);
  }

  // ─── DRAFT ACCESS ───────────────────────────────────────────────────────
  function activeDraft() {
    return state.drafts.find(d => d.id === state.activeDraftId) || state.drafts[0];
  }
  function setActiveDraft(id) {
    if (state.drafts.find(d => d.id === id)) {
      state.activeDraftId = id;
      saveState(); render();
    }
  }

  // ─── ITEM ACCESS ────────────────────────────────────────────────────────
  function findCat(catId) { return PANTRY_DATA.find(c => c.id === catId); }
  function isFav(id) { return !!state.favourites[id]; }
  function toggleFav(id) {
    if (state.favourites[id]) delete state.favourites[id];
    else state.favourites[id] = true;
    saveState(); render();
  }
  function hasOrder(id) {
    const e = activeDraft().items[id];
    return e && e.qty != null && String(e.qty).trim() !== "";
  }
  function getItem(id) { return activeDraft().items[id]; }
  function setQty(id, qty) {
    const d = activeDraft();
    const v = String(qty == null ? "" : qty).trim();
    if (!v) {
      if (d.items[id]) delete d.items[id].qty;
      if (d.items[id] && !d.items[id].notes) delete d.items[id];
    } else {
      d.items[id] = d.items[id] || {};
      d.items[id].qty = v;
    }
    saveState(); updateSidebarCounts(); updateRow(id); updateSectionStats(id);
  }
  // Smart start qty — what to fill on the FIRST +click when qty is 0.
  // Uses portion-rule × actual PAX × days; falls back to a week × 10 pax heuristic.
  function smartStartQty(id) {
    // Find context (item, cat, section)
    let ctx = null;
    for (const c of PANTRY_DATA) {
      for (const sec of effectiveSections(c)) {
        const it = sec.items.find(i => i.id === id);
        if (it) { ctx = { item: it, cat: c, section: sec }; break; }
      }
      if (ctx) break;
    }
    if (!ctx) return { qty: 1, unit: "" };
    const { item, cat, section } = ctx;
    const unit = effectiveUnit(item) || item.unit || "";

    // Use PAX if set, otherwise default to 10 guests × 7 days
    let enrichmentCtx = enrichCtx();
    if ((enrichmentCtx.guest || 0) === 0 && (enrichmentCtx.crew || 0) === 0) {
      enrichmentCtx = { ...enrichmentCtx, guest: 10, crew: 0, days: 7 };
    }
    if (window.PANTRY_ENRICH) {
      const e = window.PANTRY_ENRICH.enrichItem(item, cat, section, enrichmentCtx);
      if (e.portion) return { qty: e.portion.qty, unit: e.portion.unit || unit };
    }

    // Fallback: week × pax heuristic for items with no portion rule
    const pax = (parseInt(enrichmentCtx.guest) || 0) + (parseInt(enrichmentCtx.crew) || 0);
    const days = parseInt(enrichmentCtx.days) || 7;
    const u = unit.toLowerCase().trim();
    let qty;
    if (u === "kg") qty = Math.max(1, Math.round((0.025 * pax * days) * 10) / 10);  // ~25g/pax/day pantry
    else if (u === "g") qty = Math.max(100, Math.ceil((4 * pax * days) / 100) * 100); // ~4g/pax/day spice
    else if (u === "l") qty = Math.max(1, Math.round((0.05 * pax * days) * 10) / 10);  // 50ml/pax/day liquid
    else if (u === "ml") qty = Math.max(250, Math.ceil((4 * pax * days) / 250) * 250);
    else if (["bunch","heads","racks","birds","legs","claws","side","sides","lobes","tray","trays","log","logs","sheet","sheets","stick","sticks","tube","tubes","book","books"].includes(u)) qty = Math.max(1, Math.ceil(pax / 5));
    else if (["tin","tins","jar","jars","bottle","bottles","pack","case","box","pcs","pc","piece","pieces"].includes(u)) qty = Math.max(2, Math.ceil(pax / 5));
    else qty = 2;
    return { qty, unit };
  }

  function stepQty(id, sign) {
    const cur = parseFloat(getItem(id)?.qty || 0) || 0;
    const item = findItemById(id);
    const unit = item ? effectiveUnit(item) : "";
    let next;
    if (cur === 0 && sign > 0) {
      // First +click — load smart "week × 10" starting amount
      const start = smartStartQty(id);
      next = start.qty;
      if (start.unit && start.unit !== unit) setUnit(id, start.unit);
    } else {
      const step = naturalStep(unit);
      next = Math.max(0, cur + step * Math.sign(sign || 1));
    }
    setQty(id, next === 0 ? "" : (Number.isInteger(next) ? String(next) : next.toFixed(2).replace(/\.?0+$/, "")));
  }
  function mulQty(id, factor) {
    const cur = parseFloat(getItem(id)?.qty || 0) || 0;
    if (cur === 0) return;
    const next = cur * factor;
    setQty(id, Number.isInteger(next) ? String(next) : next.toFixed(2).replace(/\.?0+$/, ""));
  }
  function setNotes(id, notes) {
    const d = activeDraft();
    notes = (notes || "").trim();
    if (!notes && !hasOrder(id) && !d.items[id]) return;
    d.items[id] = d.items[id] || {};
    d.items[id].notes = notes;
    if (!notes && !d.items[id].qty) delete d.items[id];
    saveState();
  }
  function setUnit(id, unit) {
    const v = String(unit == null ? "" : unit).trim();
    if (!v) delete state.unitOverrides[id];
    else state.unitOverrides[id] = v;
    saveState();
  }
  function effectiveUnit(item) { return state.unitOverrides[item.id] || item.unit || ""; }

  // ─── FREQUENCY ──────────────────────────────────────────────────────────
  function frequencyMap() {
    const map = {};
    state.history.forEach(h => Object.entries(h.items || {}).forEach(([id, e]) => {
      if (e && e.qty) map[id] = (map[id] || 0) + 1;
    }));
    return map;
  }

  // ─── ENRICHMENT CONTEXT ─────────────────────────────────────────────────
  function enrichCtx() {
    return {
      month: currentMonth(),
      guest: parseInt(state.pax.guest) || 0,
      crew: parseInt(state.pax.crew) || 0,
      days: parseInt(state.pax.days) || 1,
      profile: state.profile === "none" ? null : state.profile,
    };
  }

  // ─── HISTORY / DRAFTS ───────────────────────────────────────────────────
  function archiveCurrent() {
    const d = activeDraft();
    const orderedItems = Object.entries(d.items).filter(([_, e]) => e.qty && e.qty.trim());
    if (orderedItems.length === 0) { alert("Nothing to archive — current draft has no quantities."); return; }
    const snap = {
      id: "h-" + Date.now(),
      savedAt: new Date().toISOString(),
      date: d.date,
      supplier: d.supplier,
      vessel: d.vessel,
      name: d.name,
      items: JSON.parse(JSON.stringify(d.items)),
      itemCount: orderedItems.length,
    };
    state.history.unshift(snap);
    if (state.history.length > 80) state.history.length = 80;
    saveState();
    showToast(`Archived "${d.name}" · ${orderedItems.length} items.`);
    renderHistoryModal();
  }
  function recallHistory(id) {
    const h = state.history.find(x => x.id === id); if (!h) return;
    const d = activeDraft();
    const count = Object.values(d.items).filter(e => e.qty && e.qty.trim()).length;
    if (count > 0 && !confirm(`Replace current draft "${d.name}" (${count} items) with archive from ${h.date}?`)) return;
    d.date = h.date; d.supplier = h.supplier; d.vessel = h.vessel;
    d.items = JSON.parse(JSON.stringify(h.items));
    saveState(); closeModal(); render();
    showToast(`Loaded archive — ${h.itemCount} items.`);
  }
  function duplicateHistoryToNewDraft(id) {
    const h = state.history.find(x => x.id === id); if (!h) return;
    const draft = defaultDraft(`${h.name || "Order"} (copy)`);
    draft.supplier = h.supplier;
    draft.vessel = h.vessel;
    draft.items = JSON.parse(JSON.stringify(h.items));
    state.drafts.unshift(draft);
    state.activeDraftId = draft.id;
    saveState(); closeModal(); render();
    showToast(`Duplicated as new draft — ${h.itemCount} items.`);
  }
  function deleteHistory(id) {
    if (!confirm("Delete this archive?")) return;
    state.history = state.history.filter(x => x.id !== id);
    saveState(); renderHistoryModal();
  }

  // ─── DRAFTS MGMT ────────────────────────────────────────────────────────
  function newDraft() {
    const name = prompt("Name this draft (e.g. 'Charter Week 28', 'Crew Weekly'):", "Untitled order");
    if (name == null) return;
    const d = defaultDraft(name.trim() || "Untitled order");
    state.drafts.unshift(d);
    state.activeDraftId = d.id;
    saveState(); render();
    showToast(`New draft: ${d.name}`);
  }
  function renameDraft() {
    const d = activeDraft();
    const name = prompt("Rename draft:", d.name);
    if (name == null || !name.trim()) return;
    d.name = name.trim();
    saveState(); render();
  }
  function deleteDraft() {
    if (state.drafts.length === 1) { alert("Can't delete the last draft. Create a new one first."); return; }
    const d = activeDraft();
    if (!confirm(`Delete draft "${d.name}"? Unarchived items will be lost.`)) return;
    state.drafts = state.drafts.filter(x => x.id !== d.id);
    state.activeDraftId = state.drafts[0].id;
    saveState(); render();
    showToast(`Deleted draft: ${d.name}`);
  }

  // ─── EXPORT ─────────────────────────────────────────────────────────────
  function exportJSON() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `galley-order-${todayISO()}.json`; a.click();
    URL.revokeObjectURL(url);
  }
  function importJSON() {
    const inp = document.createElement("input");
    inp.type = "file"; inp.accept = "application/json";
    inp.onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!confirm("Replace ALL current data (favourites, drafts, history)?")) return;
          state = Object.assign(defaultState(), data);
          state.ui = Object.assign(defaultState().ui, data.ui || {});
          if (!state.drafts.length) state.drafts = [defaultDraft("Default")];
          if (!state.drafts.find(d => d.id === state.activeDraftId)) state.activeDraftId = state.drafts[0].id;
          saveState(); render();
        } catch (err) { alert("Import failed: " + err.message); }
      };
      reader.readAsText(f);
    };
    inp.click();
  }
  function exportPlainText() {
    const d = activeDraft();
    const lines = [];
    lines.push(`GALLEY ORDER — ${d.name}`);
    lines.push(`Date: ${d.date}  ·  Supplier: ${d.supplier || "—"}  ·  Vessel: ${d.vessel || "—"}`);
    lines.push("=".repeat(60));
    PANTRY_DATA.forEach(cat => {
      const orderedInCat = [];
      effectiveSections(cat).forEach(sec => {
        sec.items.forEach(it => {
          if (hasOrder(it.id)) {
            const e = d.items[it.id];
            const unit = effectiveUnit(it);
            const notes = e.notes ? `  (${e.notes})` : "";
            orderedInCat.push(`  • ${it.name} — ${e.qty} ${unit}${notes}`);
          }
        });
      });
      if (orderedInCat.length) {
        lines.push("");
        lines.push(`▸ ${cat.label.toUpperCase()}`);
        lines.push(...orderedInCat);
      }
    });
    lines.push("");
    lines.push("─".repeat(60));
    lines.push("Generated by Littoralicious Galley Order");
    lines.push("littoralicious.com/galleyorder · free · open");
    const text = lines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast("Copied to clipboard · paste to WhatsApp"));
    } else {
      // Fallback: show in textarea modal
      openModal(`
        <h2>Plain-text order</h2>
        <p>Select all (⌘A) and copy, then paste into WhatsApp or email.</p>
        <textarea style="width:100%;height:300px;font-family:'SF Mono',monospace;font-size:11px;border:1px solid var(--color-border);padding:8px;">${escapeHTML(text)}</textarea>
        <div class="modal-actions"><button class="btn" data-close>Close</button></div>
      `);
      const m = $(".modal"); if (m) m.querySelector("[data-close]").onclick = closeModal;
    }
  }

  function buildOrderTextBlock() {
    const d = activeDraft();
    const lines = [];
    lines.push(`GALLEY ORDER — ${d.name}`);
    lines.push(`Date: ${d.date}  ·  Supplier: ${d.supplier || "—"}  ·  Vessel: ${d.vessel || "—"}`);
    if (state.pax.guest || state.pax.crew) {
      lines.push(`Pax: ${state.pax.guest} guest · ${state.pax.crew} crew · ${state.pax.days} day(s)`);
    }
    lines.push("=".repeat(60));
    let totalLines = 0;
    PANTRY_DATA.forEach(cat => {
      const orderedInCat = [];
      effectiveSections(cat).forEach(sec => {
        sec.items.forEach(it => {
          if (hasOrder(it.id)) {
            const e = d.items[it.id];
            const unit = effectiveUnit(it);
            const notes = e.notes ? `  (${e.notes})` : "";
            orderedInCat.push(`  • ${it.name} — ${e.qty} ${unit}${notes}`);
            totalLines++;
          }
        });
      });
      if (orderedInCat.length) {
        lines.push("");
        lines.push(`▸ ${cat.label.toUpperCase()}`);
        lines.push(...orderedInCat);
      }
    });
    return { text: lines.join("\n"), totalLines, draft: d };
  }

  function sendOrderByEmail() {
    const { text, totalLines, draft } = buildOrderTextBlock();
    if (totalLines === 0) {
      showToast("Nothing to send — add items to the order first.");
      return;
    }
    openModal(`
      <h2>Send order by email</h2>
      <p>Opens your default mail client with the order pre-filled. You stay in control of the recipient and can edit before sending.</p>
      <label style="display:block;margin:8px 0 4px;font-weight:600;">Recipient email (optional)</label>
      <input id="email-to" type="email" placeholder="supplier@example.com" autocomplete="off"
             style="width:100%;padding:8px;border:1px solid var(--color-border);font-size:14px;" />
      <label style="display:block;margin:12px 0 4px;font-weight:600;">Subject</label>
      <input id="email-subject" type="text"
             value="Galley Order — ${escapeHTML(draft.name)} — ${escapeHTML(draft.date)}"
             style="width:100%;padding:8px;border:1px solid var(--color-border);font-size:14px;" />
      <label style="display:block;margin:12px 0 4px;font-weight:600;">Preview (read-only)</label>
      <textarea readonly
                style="width:100%;height:240px;font-family:'SF Mono',monospace;font-size:11px;border:1px solid var(--color-border);padding:8px;background:var(--color-paper);">${escapeHTML(text)}</textarea>
      <div class="modal-actions" style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
        <button class="btn btn-ghost" data-close>Cancel</button>
        <button class="btn btn-ghost" data-copy>Copy text only</button>
        <button class="btn btn-primary" data-open>Open mail client</button>
      </div>
    `);
    const m = $(".modal");
    if (!m) return;
    m.querySelector("[data-close]").onclick = closeModal;
    m.querySelector("[data-copy]").onclick = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast("Order text copied — paste into any email."));
      }
    };
    m.querySelector("[data-open]").onclick = () => {
      const to = (m.querySelector("#email-to").value || "").trim();
      const subj = m.querySelector("#email-subject").value || "Galley Order";
      const body = text + "\n\n— Generated by Littoralicious Galley Order\n  https://www.littoralicious.com/galleyorder/";
      const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      if (url.length > 8000) {
        showToast("Order too long for mailto — text copied to clipboard, paste it into your email instead.");
        if (navigator.clipboard) navigator.clipboard.writeText(text);
      } else {
        window.location.href = url;
        showToast("Mail client opened.");
      }
      closeModal();
    };
  }

  // ─── PROVISIONING MATH ──────────────────────────────────────────────────
  function applyPortionSuggestionsScoped(scope) {
    // scope: { cat: <cat object> | null, sec: <sec object> | null, force: bool, includeNiche: bool }
    // null = "everything". Both set = single section. cat only = whole category.
    // Only items with portion.mainstream === true are auto-filled by default.
    // Pass includeNiche:true to fill non-mainstream items too (chef explicit "fill all" mode).
    const ctx = enrichCtx();
    if (!ctx.guest && !ctx.crew) {
      alert("Enter PAX (guest + crew + days) in the bar above first.");
      return { total: 0 };
    }
    let counts = { guest: 0, crew: 0, all: 0, skipped: 0, niche: 0 };
    const cats = scope.cat ? [scope.cat] : PANTRY_DATA;
    cats.forEach(cat => {
      const secs = scope.sec ? [scope.sec] : effectiveSections(cat);
      secs.forEach(sec => sec.items.forEach(it => {
        const e = window.PANTRY_ENRICH.enrichItem(it, cat, sec, ctx);
        if (!e.portion) return;
        if (!e.portion.mainstream && !scope.includeNiche) { counts.niche++; return; }
        if (hasOrder(it.id) && !scope.force) { counts.skipped++; return; }
        setQty(it.id, e.portion.qty);
        if (e.portion.unit && e.portion.unit !== effectiveUnit(it)) setUnit(it.id, e.portion.unit);
        counts[e.portion.role || "all"]++;
      }));
    });
    return { ...counts, total: counts.guest + counts.crew + counts.all };
  }

  function applyPortionSuggestions() {
    const r = applyPortionSuggestionsScoped({ cat: null, sec: null, force: false });
    if (r.total === 0) {
      showToast(r.skipped > 0
        ? `${r.skipped} items already filled — clear first to re-fill.`
        : "No mainstream suggestions for current PAX.");
    } else {
      const nicheNote = r.niche > 0 ? ` · ${r.niche} niche skipped (add manually)` : "";
      showToast(`Filled ${r.total} mainstream items · ${r.guest} guest · ${r.crew} crew · ${r.all} all-pax${nicheNote}`);
      render();
    }
  }

  function applyPortionsForSection(catId, sIndex, force) {
    const cat = findCat(catId); if (!cat) return;
    const sec = effectiveSections(cat)[sIndex]; if (!sec) return;
    const r = applyPortionSuggestionsScoped({ cat, sec, force: !!force });
    if (r.total === 0) {
      if (r.skipped > 0 && !force) {
        if (confirm(`${r.skipped} item${r.skipped === 1 ? "" : "s"} in "${sec.title}" already have quantities. Overwrite them?`)) {
          applyPortionsForSection(catId, sIndex, true);
        } else {
          showToast(`Skipped — ${r.skipped} already filled.`);
        }
      } else if (r.niche > 0) {
        showToast(`"${sec.title}" has only niche items — add manually as needed (${r.niche} skipped).`);
      } else {
        showToast(`No portion rules apply in "${sec.title}" for current PAX.`);
      }
    } else {
      const nicheNote = r.niche > 0 ? ` · ${r.niche} niche skipped` : "";
      showToast(`${sec.title}: filled ${r.total} mainstream item${r.total === 1 ? "" : "s"}${nicheNote}.`);
      render();
    }
  }

  function applyPortionsForCategory(catId, force) {
    const cat = findCat(catId); if (!cat) return;
    const r = applyPortionSuggestionsScoped({ cat, sec: null, force: !!force });
    if (r.total === 0) {
      if (r.skipped > 0 && !force) {
        if (confirm(`${r.skipped} item${r.skipped === 1 ? "" : "s"} in ${cat.label} already have quantities. Overwrite them?`)) {
          applyPortionsForCategory(catId, true);
        } else {
          showToast(`Skipped — ${r.skipped} already filled.`);
        }
      } else if (r.niche > 0) {
        showToast(`${cat.label}: no mainstream items — ${r.niche} niche items to add manually.`);
      } else {
        showToast(`No portion rules apply in ${cat.label} for current PAX.`);
      }
    } else {
      const nicheNote = r.niche > 0 ? ` · ${r.niche} niche skipped (add manually)` : "";
      showToast(`${cat.label}: filled ${r.total} mainstream item${r.total === 1 ? "" : "s"}${nicheNote}.`);
      render();
    }
  }

  // ─── LIST UPLOAD / FUZZY MATCH ──────────────────────────────────────────
  // ─── TRANSLATION VOCABULARY (EN → FR / IT / ES) ─────────────────────────
  // Used for two things:
  //   1. Cross-language matching when chef pastes a French/Italian/Spanish list
  //   2. Translating the printed PDF into the chef's chosen language
  const VOCAB = {
    // ----- proteins / fish -----
    "salmon":{fr:"saumon",it:"salmone",es:"salmón"},
    "tuna":{fr:"thon",it:"tonno",es:"atún"},
    "bluefin":{fr:"thon rouge",it:"tonno rosso",es:"atún rojo"},
    "yellowfin":{fr:"thon jaune",it:"tonno pinna gialla",es:"rabil"},
    "cod":{fr:"cabillaud",it:"merluzzo",es:"bacalao"},
    "haddock":{fr:"aiglefin",it:"eglefino",es:"abadejo"},
    "halibut":{fr:"flétan",it:"halibut",es:"halibut"},
    "monkfish":{fr:"lotte",it:"rana pescatrice",es:"rape"},
    "mahi mahi":{fr:"dorade coryphène",it:"lampuga",es:"dorado"},
    "sea bass":{fr:"loup de mer",it:"branzino",es:"lubina"},
    "branzino":{fr:"loup",it:"branzino",es:"lubina"},
    "sea bream":{fr:"dorade",it:"orata",es:"dorada"},
    "dorade":{fr:"dorade",it:"orata",es:"dorada"},
    "sole":{fr:"sole",it:"sogliola",es:"lenguado"},
    "turbot":{fr:"turbot",it:"rombo",es:"rodaballo"},
    "grouper":{fr:"mérou",it:"cernia",es:"mero"},
    "snapper":{fr:"vivaneau",it:"dentice",es:"pargo"},
    "red mullet":{fr:"rouget",it:"triglia",es:"salmonete"},
    "mackerel":{fr:"maquereau",it:"sgombro",es:"caballa"},
    "sardine":{fr:"sardine",it:"sardina",es:"sardina"},
    "anchovy":{fr:"anchois",it:"acciuga",es:"anchoa"},
    "anchovies":{fr:"anchois",it:"acciughe",es:"anchoas"},
    "trout":{fr:"truite",it:"trota",es:"trucha"},
    "hake":{fr:"merlu",it:"nasello",es:"merluza"},
    "shrimp":{fr:"crevette",it:"gambero",es:"gamba"},
    "prawn":{fr:"crevette",it:"gambero",es:"langostino"},
    "tiger prawn":{fr:"crevette tigrée",it:"mazzancolla",es:"langostino tigre"},
    "lobster":{fr:"homard",it:"astice",es:"bogavante"},
    "spiny lobster":{fr:"langouste",it:"aragosta",es:"langosta"},
    "langoustine":{fr:"langoustine",it:"scampo",es:"cigala"},
    "crab":{fr:"crabe",it:"granchio",es:"cangrejo"},
    "scallop":{fr:"coquille saint-jacques",it:"capesante",es:"vieira"},
    "scallops":{fr:"coquilles saint-jacques",it:"capesante",es:"vieiras"},
    "oyster":{fr:"huître",it:"ostrica",es:"ostra"},
    "oysters":{fr:"huîtres",it:"ostriche",es:"ostras"},
    "mussel":{fr:"moule",it:"cozza",es:"mejillón"},
    "mussels":{fr:"moules",it:"cozze",es:"mejillones"},
    "clam":{fr:"palourde",it:"vongola",es:"almeja"},
    "clams":{fr:"palourdes",it:"vongole",es:"almejas"},
    "octopus":{fr:"poulpe",it:"polpo",es:"pulpo"},
    "squid":{fr:"calamar",it:"calamaro",es:"calamar"},
    "cuttlefish":{fr:"seiche",it:"seppia",es:"sepia"},
    "caviar":{fr:"caviar",it:"caviale",es:"caviar"},
    "smoked salmon":{fr:"saumon fumé",it:"salmone affumicato",es:"salmón ahumado"},
    "gravlax":{fr:"gravlax",it:"gravlax",es:"gravlax"},
    // ----- meats -----
    "beef":{fr:"bœuf",it:"manzo",es:"ternera"},
    "veal":{fr:"veau",it:"vitello",es:"ternera lechal"},
    "lamb":{fr:"agneau",it:"agnello",es:"cordero"},
    "pork":{fr:"porc",it:"maiale",es:"cerdo"},
    "chicken":{fr:"poulet",it:"pollo",es:"pollo"},
    "duck":{fr:"canard",it:"anatra",es:"pato"},
    "rabbit":{fr:"lapin",it:"coniglio",es:"conejo"},
    "pigeon":{fr:"pigeon",it:"piccione",es:"paloma"},
    "quail":{fr:"caille",it:"quaglia",es:"codorniz"},
    "pheasant":{fr:"faisan",it:"fagiano",es:"faisán"},
    "partridge":{fr:"perdrix",it:"pernice",es:"perdiz"},
    "venison":{fr:"chevreuil",it:"capriolo",es:"venado"},
    "wild boar":{fr:"sanglier",it:"cinghiale",es:"jabalí"},
    "ribeye":{fr:"entrecôte",it:"costata",es:"entrecot"},
    "striploin":{fr:"faux-filet",it:"controfiletto",es:"lomo bajo"},
    "tenderloin":{fr:"filet",it:"filetto",es:"solomillo"},
    "shoulder":{fr:"épaule",it:"spalla",es:"paletilla"},
    "leg":{fr:"gigot",it:"coscia",es:"pierna"},
    "rack":{fr:"carré",it:"carrè",es:"costillar"},
    "breast":{fr:"poitrine",it:"petto",es:"pechuga"},
    "belly":{fr:"poitrine",it:"pancetta",es:"panceta"},
    "burger":{fr:"burger",it:"hamburger",es:"hamburguesa"},
    "magret":{fr:"magret",it:"petto d'anatra",es:"magret"},
    "foie gras":{fr:"foie gras",it:"foie gras",es:"foie gras"},
    "prosciutto":{fr:"jambon cru",it:"prosciutto",es:"jamón"},
    "ham":{fr:"jambon",it:"prosciutto",es:"jamón"},
    "iberico":{fr:"ibérique",it:"iberico",es:"ibérico"},
    "wagyu":{fr:"wagyu",it:"wagyu",es:"wagyu"},
    // ----- veg -----
    "tomato":{fr:"tomate",it:"pomodoro",es:"tomate"},
    "tomatoes":{fr:"tomates",it:"pomodori",es:"tomates"},
    "potato":{fr:"pomme de terre",it:"patata",es:"patata"},
    "potatoes":{fr:"pommes de terre",it:"patate",es:"patatas"},
    "onion":{fr:"oignon",it:"cipolla",es:"cebolla"},
    "garlic":{fr:"ail",it:"aglio",es:"ajo"},
    "shallot":{fr:"échalote",it:"scalogno",es:"chalota"},
    "leek":{fr:"poireau",it:"porro",es:"puerro"},
    "carrot":{fr:"carotte",it:"carota",es:"zanahoria"},
    "celery":{fr:"céleri",it:"sedano",es:"apio"},
    "celeriac":{fr:"céleri-rave",it:"sedano rapa",es:"apio nabo"},
    "fennel":{fr:"fenouil",it:"finocchio",es:"hinojo"},
    "asparagus":{fr:"asperge",it:"asparagi",es:"espárrago"},
    "artichoke":{fr:"artichaut",it:"carciofo",es:"alcachofa"},
    "broccoli":{fr:"brocoli",it:"broccoli",es:"brócoli"},
    "cauliflower":{fr:"chou-fleur",it:"cavolfiore",es:"coliflor"},
    "cabbage":{fr:"chou",it:"cavolo",es:"col"},
    "kale":{fr:"chou kale",it:"cavolo nero",es:"col rizada"},
    "spinach":{fr:"épinard",it:"spinaci",es:"espinaca"},
    "lettuce":{fr:"laitue",it:"lattuga",es:"lechuga"},
    "arugula":{fr:"roquette",it:"rucola",es:"rúcula"},
    "rocket":{fr:"roquette",it:"rucola",es:"rúcula"},
    "radicchio":{fr:"trévise",it:"radicchio",es:"achicoria roja"},
    "endive":{fr:"endive",it:"indivia",es:"endivia"},
    "watercress":{fr:"cresson",it:"crescione",es:"berro"},
    "courgette":{fr:"courgette",it:"zucchina",es:"calabacín"},
    "zucchini":{fr:"courgette",it:"zucchina",es:"calabacín"},
    "eggplant":{fr:"aubergine",it:"melanzana",es:"berenjena"},
    "aubergine":{fr:"aubergine",it:"melanzana",es:"berenjena"},
    "pumpkin":{fr:"citrouille",it:"zucca",es:"calabaza"},
    "squash":{fr:"courge",it:"zucca",es:"calabaza"},
    "cucumber":{fr:"concombre",it:"cetriolo",es:"pepino"},
    "beetroot":{fr:"betterave",it:"barbabietola",es:"remolacha"},
    "turnip":{fr:"navet",it:"rapa",es:"nabo"},
    "parsnip":{fr:"panais",it:"pastinaca",es:"chirivía"},
    "radish":{fr:"radis",it:"ravanello",es:"rábano"},
    "sweet potato":{fr:"patate douce",it:"patata dolce",es:"batata"},
    "mushroom":{fr:"champignon",it:"fungo",es:"champiñón"},
    "mushrooms":{fr:"champignons",it:"funghi",es:"champiñones"},
    "porcini":{fr:"cèpes",it:"porcini",es:"boletus"},
    "chanterelle":{fr:"girolle",it:"galletto",es:"rebozuelo"},
    "morel":{fr:"morille",it:"spugnola",es:"colmenilla"},
    "shiitake":{fr:"shiitake",it:"shiitake",es:"shiitake"},
    "pepper":{fr:"poivron",it:"peperone",es:"pimiento"},
    "bell pepper":{fr:"poivron",it:"peperone",es:"pimiento"},
    "chili":{fr:"piment",it:"peperoncino",es:"chile"},
    "chilli":{fr:"piment",it:"peperoncino",es:"chile"},
    "avocado":{fr:"avocat",it:"avocado",es:"aguacate"},
    "pea":{fr:"petit pois",it:"pisello",es:"guisante"},
    "peas":{fr:"petits pois",it:"piselli",es:"guisantes"},
    "bean":{fr:"haricot",it:"fagiolo",es:"judía"},
    "beans":{fr:"haricots",it:"fagioli",es:"judías"},
    "corn":{fr:"maïs",it:"mais",es:"maíz"},
    "olive":{fr:"olive",it:"oliva",es:"aceituna"},
    "olives":{fr:"olives",it:"olive",es:"aceitunas"},
    "samphire":{fr:"salicorne",it:"salicornia",es:"hinojo marino"},
    // ----- fruits -----
    "apple":{fr:"pomme",it:"mela",es:"manzana"},
    "pear":{fr:"poire",it:"pera",es:"pera"},
    "peach":{fr:"pêche",it:"pesca",es:"melocotón"},
    "apricot":{fr:"abricot",it:"albicocca",es:"albaricoque"},
    "plum":{fr:"prune",it:"prugna",es:"ciruela"},
    "cherry":{fr:"cerise",it:"ciliegia",es:"cereza"},
    "cherries":{fr:"cerises",it:"ciliegie",es:"cerezas"},
    "grape":{fr:"raisin",it:"uva",es:"uva"},
    "grapes":{fr:"raisins",it:"uva",es:"uvas"},
    "strawberry":{fr:"fraise",it:"fragola",es:"fresa"},
    "strawberries":{fr:"fraises",it:"fragole",es:"fresas"},
    "raspberry":{fr:"framboise",it:"lampone",es:"frambuesa"},
    "raspberries":{fr:"framboises",it:"lamponi",es:"frambuesas"},
    "blueberry":{fr:"myrtille",it:"mirtillo",es:"arándano"},
    "blueberries":{fr:"myrtilles",it:"mirtilli",es:"arándanos"},
    "blackberry":{fr:"mûre",it:"mora",es:"mora"},
    "blackberries":{fr:"mûres",it:"more",es:"moras"},
    "lemon":{fr:"citron",it:"limone",es:"limón"},
    "lime":{fr:"citron vert",it:"lime",es:"lima"},
    "orange":{fr:"orange",it:"arancia",es:"naranja"},
    "grapefruit":{fr:"pamplemousse",it:"pompelmo",es:"pomelo"},
    "mango":{fr:"mangue",it:"mango",es:"mango"},
    "papaya":{fr:"papaye",it:"papaia",es:"papaya"},
    "pineapple":{fr:"ananas",it:"ananas",es:"piña"},
    "watermelon":{fr:"pastèque",it:"anguria",es:"sandía"},
    "melon":{fr:"melon",it:"melone",es:"melón"},
    "fig":{fr:"figue",it:"fico",es:"higo"},
    "figs":{fr:"figues",it:"fichi",es:"higos"},
    "pomegranate":{fr:"grenade",it:"melagrana",es:"granada"},
    "passion fruit":{fr:"fruit de la passion",it:"frutto della passione",es:"maracuyá"},
    // ----- dairy -----
    "milk":{fr:"lait",it:"latte",es:"leche"},
    "cream":{fr:"crème",it:"panna",es:"nata"},
    "butter":{fr:"beurre",it:"burro",es:"mantequilla"},
    "cheese":{fr:"fromage",it:"formaggio",es:"queso"},
    "yogurt":{fr:"yaourt",it:"yogurt",es:"yogur"},
    "egg":{fr:"œuf",it:"uovo",es:"huevo"},
    "eggs":{fr:"œufs",it:"uova",es:"huevos"},
    "mozzarella":{fr:"mozzarella",it:"mozzarella",es:"mozzarella"},
    "parmesan":{fr:"parmesan",it:"parmigiano",es:"parmesano"},
    "burrata":{fr:"burrata",it:"burrata",es:"burrata"},
    "feta":{fr:"féta",it:"feta",es:"feta"},
    "ricotta":{fr:"ricotta",it:"ricotta",es:"ricotta"},
    "mascarpone":{fr:"mascarpone",it:"mascarpone",es:"mascarpone"},
    // ----- pantry / staples -----
    "flour":{fr:"farine",it:"farina",es:"harina"},
    "sugar":{fr:"sucre",it:"zucchero",es:"azúcar"},
    "salt":{fr:"sel",it:"sale",es:"sal"},
    "pepper":{fr:"poivre",it:"pepe",es:"pimienta"},
    "rice":{fr:"riz",it:"riso",es:"arroz"},
    "pasta":{fr:"pâtes",it:"pasta",es:"pasta"},
    "bread":{fr:"pain",it:"pane",es:"pan"},
    "oil":{fr:"huile",it:"olio",es:"aceite"},
    "olive oil":{fr:"huile d'olive",it:"olio d'oliva",es:"aceite de oliva"},
    "vinegar":{fr:"vinaigre",it:"aceto",es:"vinagre"},
    "honey":{fr:"miel",it:"miele",es:"miel"},
    "chocolate":{fr:"chocolat",it:"cioccolato",es:"chocolate"},
    "vanilla":{fr:"vanille",it:"vaniglia",es:"vainilla"},
    "saffron":{fr:"safran",it:"zafferano",es:"azafrán"},
    "wine":{fr:"vin",it:"vino",es:"vino"},
    "champagne":{fr:"champagne",it:"champagne",es:"champán"},
    // ----- herbs -----
    "basil":{fr:"basilic",it:"basilico",es:"albahaca"},
    "parsley":{fr:"persil",it:"prezzemolo",es:"perejil"},
    "cilantro":{fr:"coriandre",it:"coriandolo",es:"cilantro"},
    "coriander":{fr:"coriandre",it:"coriandolo",es:"cilantro"},
    "mint":{fr:"menthe",it:"menta",es:"menta"},
    "dill":{fr:"aneth",it:"aneto",es:"eneldo"},
    "tarragon":{fr:"estragon",it:"dragoncello",es:"estragón"},
    "thyme":{fr:"thym",it:"timo",es:"tomillo"},
    "rosemary":{fr:"romarin",it:"rosmarino",es:"romero"},
    "sage":{fr:"sauge",it:"salvia",es:"salvia"},
    "oregano":{fr:"origan",it:"origano",es:"orégano"},
    "bay leaves":{fr:"feuilles de laurier",it:"alloro",es:"laurel"},
    "bay leaf":{fr:"laurier",it:"alloro",es:"laurel"},
    "chives":{fr:"ciboulette",it:"erba cipollina",es:"cebollino"},
    "chervil":{fr:"cerfeuil",it:"cerfoglio",es:"perifollo"},
    // ----- adjectives / states -----
    "fresh":{fr:"frais",it:"fresco",es:"fresco"},
    "organic":{fr:"bio",it:"biologico",es:"ecológico"},
    "wild":{fr:"sauvage",it:"selvatico",es:"silvestre"},
    "smoked":{fr:"fumé",it:"affumicato",es:"ahumado"},
    "cured":{fr:"affiné",it:"stagionato",es:"curado"},
    "dried":{fr:"séché",it:"secco",es:"seco"},
    "frozen":{fr:"surgelé",it:"surgelato",es:"congelado"},
    "whole":{fr:"entier",it:"intero",es:"entero"},
    "fillet":{fr:"filet",it:"filetto",es:"filete"},
    "loin":{fr:"longe",it:"lombo",es:"lomo"},
    "minced":{fr:"haché",it:"macinato",es:"picado"},
    "grass-fed":{fr:"nourri à l'herbe",it:"allevato a erba",es:"alimentado con pasto"},
    "free-range":{fr:"plein air",it:"all'aperto",es:"campero"},
    "aged":{fr:"affiné",it:"stagionato",es:"añejo"},
    "raw":{fr:"cru",it:"crudo",es:"crudo"},
  };

  const CATEGORY_LABELS_I18N = {
    "fish":             { fr:"Poisson",                it:"Pesce",                 es:"Pescado" },
    "meat":             { fr:"Viande",                 it:"Carne",                 es:"Carne" },
    "produce":          { fr:"Produits frais",         it:"Prodotti freschi",      es:"Productos frescos" },
    "western":          { fr:"Garde-manger Occidental",it:"Dispensa occidentale",  es:"Despensa occidental" },
    "freezer":          { fr:"Congélateur",            it:"Congelatore",           es:"Congelador" },
    "spices":           { fr:"Épices",                 it:"Spezie",                es:"Especias" },
    "grains-pasta":     { fr:"Céréales · Pâtes",       it:"Cereali · Pasta",       es:"Cereales · Pasta" },
    "cheese-dairy":     { fr:"Fromages & Laitages",    it:"Formaggi & Latticini",  es:"Quesos y Lácteos" },
    "bakery":           { fr:"Pâtisserie",             it:"Pasticceria",           es:"Pastelería" },
    "garde-manger":     { fr:"Garde-manger",           it:"Dispensa salumeria",    es:"Curados y fermentos" },
    "japan-korea":      { fr:"Japon & Corée",          it:"Giappone e Corea",      es:"Japón y Corea" },
    "sea":              { fr:"Asie du Sud-Est",        it:"Sud-Est Asiatico",      es:"Sudeste Asiático" },
    "chinese":          { fr:"Cuisine Chinoise",       it:"Cucina cinese",         es:"Cocina china" },
    "india":            { fr:"Inde",                   it:"India",                 es:"India" },
    "middle-east":      { fr:"Moyen-Orient",           it:"Medio Oriente",         es:"Oriente Medio" },
    "africa":           { fr:"Afrique",                it:"Africa",                es:"África" },
    "mexican":          { fr:"Mexique",                it:"Messico",               es:"México" },
    "caribbean":        { fr:"Caraïbes & Créole",      it:"Caraibi & Creolo",      es:"Caribe y Criollo" },
    "south-america":    { fr:"Amérique du Sud",        it:"Sud America",           es:"Sudamérica" },
  };

  const MASTHEAD_I18N = {
    en: { title:"Galley Order", chef:"Chef", order:"Order", date:"Date", supplier:"Supplier", vessel:"Vessel", pax:"PAX", guest:"guest", crew:"crew", days:"days", tagline:"Free, open provisioning · From the publication that nurtures the chef", footer:"Generated by Littoralicious Galley Order · littoralicious.com/galleyorder · Free · Open · Yours." },
    fr: { title:"Bon de commande galley", chef:"Chef", order:"Commande", date:"Date", supplier:"Fournisseur", vessel:"Navire", pax:"PAX", guest:"invités", crew:"équipage", days:"jours", tagline:"Approvisionnement libre et ouvert · De la publication qui nourrit le chef", footer:"Généré par Littoralicious Galley Order · littoralicious.com/galleyorder · Libre · Ouvert · À vous." },
    it: { title:"Ordine cambusa", chef:"Chef", order:"Ordine", date:"Data", supplier:"Fornitore", vessel:"Imbarcazione", pax:"PAX", guest:"ospiti", crew:"equipaggio", days:"giorni", tagline:"Approvvigionamento libero e aperto · Dalla pubblicazione che nutre lo chef", footer:"Generato da Littoralicious Galley Order · littoralicious.com/galleyorder · Libero · Aperto · Vostro." },
    es: { title:"Pedido de cocina", chef:"Chef", order:"Pedido", date:"Fecha", supplier:"Proveedor", vessel:"Embarcación", pax:"PAX", guest:"huéspedes", crew:"tripulación", days:"días", tagline:"Aprovisionamiento libre y abierto · De la publicación que nutre al chef", footer:"Generado por Littoralicious Galley Order · littoralicious.com/galleyorder · Libre · Abierto · Vuestro." },
  };

  // Translate a single text (item name / category label) into target lang.
  // Word-level substitution; preserves brand names + numbers + punctuation.
  function translateText(text, lang) {
    if (!text || lang === "en") return text;
    let out = text;
    // Sort keys by length DESC so multi-word phrases match before single words
    const keys = Object.keys(VOCAB).sort((a, b) => b.length - a.length);
    for (const en of keys) {
      const trans = VOCAB[en][lang];
      if (!trans) continue;
      const re = new RegExp(`\\b${en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      out = out.replace(re, m => {
        // Preserve capitalisation of original first letter
        if (m[0] === m[0].toUpperCase()) return trans[0].toUpperCase() + trans.slice(1);
        return trans;
      });
    }
    return out;
  }

  // British ↔ American + common synonyms.  Each key maps to extra tokens that
  // should be checked against the catalog if the user typed the key.
  const TOKEN_ALIASES = {
    "aubergine": ["eggplant", "brinjal"], "eggplant": ["aubergine"], "brinjal": ["aubergine"],
    "courgette": ["zucchini"], "zucchini": ["courgette"],
    "rocket": ["arugula"], "arugula": ["rocket"],
    "cilantro": ["coriander"], "coriander": ["cilantro"],
    "garbanzo": ["chickpea"], "chickpea": ["garbanzo"], "chickpeas": ["garbanzo"],
    "shrimp": ["prawn"], "prawn": ["shrimp"], "prawns": ["shrimp"], "shrimps": ["prawn"],
    "scallion": ["spring", "onion", "green"], "scallions": ["spring", "onion"],
    "capsicum": ["pepper", "bell"], "bell": ["capsicum"],
    "mangetout": ["snow", "pea"], "yoghurt": ["yogurt"], "yogurt": ["yoghurt"],
    "evoo": ["olive", "oil"], "extra": ["evoo", "olive"],
    "ham": ["jamón", "jamon", "prosciutto", "iberico"],
    "salmon": ["saumon", "lax"],
    "parmesan": ["parmigiano", "grana"], "parmigiano": ["parmesan"],
    "edamame": ["soybean", "soy"],
    "kelp": ["kombu", "wakame"],
    "lemongrass": ["citronella"], "citronella": ["lemongrass"],
    "fingerlime": ["finger", "lime"], "limes": ["lime"], "lemons": ["lemon"],
    "tangerine": ["mandarin", "clementine"], "mandarin": ["tangerine", "clementine"],
    "cantaloupe": ["melon", "charentais"],
    "watermelon": ["melon"], "honeydew": ["melon"],
    "scallop": ["scallops"], "oyster": ["oysters"], "shellfish": ["oyster", "mussel", "clam", "shrimp", "prawn", "lobster", "crab"],
    "raspberries": ["raspberry"], "blueberries": ["blueberry"], "strawberries": ["strawberry"], "blackberries": ["blackberry"],
    "cherries": ["cherry"], "tomatoes": ["tomato"], "potatoes": ["potato"], "mangoes": ["mango"], "avocados": ["avocado"],
    "loaves": ["loaf", "bread"], "bread": ["loaf", "baguette", "sourdough"],
    "champagne": ["sparkling", "prosecco", "cava"], "prosecco": ["sparkling", "champagne"],
    "feta": ["greek", "cheese"], "mozzarella": ["bocconcini", "bufala"],
    "vodka": ["spirit"], "gin": ["spirit"], "whiskey": ["whisky", "spirit"], "whisky": ["whiskey"],
    "white wine": ["wine"], "red wine": ["wine"], "wine": ["rosé", "blanc", "rouge"],
    "soya": ["soy"], "soy": ["soya"],
    "bok": ["pak", "choi", "choy"], "pak": ["bok", "choy"],
    "choy": ["choi"], "choi": ["choy"],
    "long bean": ["yard-long", "asian"], "ngo": ["sawtooth", "culantro"],
    "patatas": ["potato"], "papas": ["potato"], "papa": ["potato"],
    "verdura": ["vegetable", "produce"], "fruta": ["fruit"],
    "pomme": ["apple"], "poire": ["pear"],
    "œuf": ["egg"], "oeuf": ["egg"], "oeufs": ["egg"], "eggs": ["egg"],
    "miel": ["honey"], "honey": ["miel"],
  };

  // ─── CATEGORY-GUESS HEURISTICS ──────────────────────────────────────────
  // Local AI: when a pasted line has no catalog match, infer its category
  // from keyword presence and create it as a custom item there.
  const CAT_KEYWORDS = {
    "fish": ["fish","salmon","tuna","cod","halibut","branzino","sea bass","seabass","snapper","sole","mackerel","sardine","sardines","anchovy","anchovies","trout","monkfish","mahi","hake","grouper","red mullet","rouget","squid","octopus","cuttlefish","calamari","shrimp","prawn","lobster","crab","scallop","scallops","oyster","oysters","mussel","mussels","clam","clams","caviar","roe","ikura","tobiko","seabream","dorade","sashimi","sushi","poke","ceviche","poisson","saumon","thon","cabillaud","crevette","crevettes","gambero","langostino","pulpo","calamar","ostra","ostrica","huître","huitre","pesce","atún","atun","gamba","gambas","tinto","brodet","bouillabaisse","langoustine","carabineros","bottarga","ikejime"],
    "meat": ["beef","pork","lamb","chicken","duck","veal","rabbit","pigeon","quail","wagyu","prosciutto","ham","jamón","jamon","bacon","lardons","sausage","saucisson","salami","ribeye","tenderloin","striploin","brisket","burger","burgers","patty","patties","oxtail","foie gras","magret","confit","iberico","ibérico","mortadella","coppa","speck","bresaola","chorizo","fuet","pâté","pate","rillettes","manzo","viande","carne","cerdo","cordero","pollo","pato","pavo","vitello","agneau","poulet","canard","filetto","filet","entrecôte","entrecote","faux-filet"],
    "cheese-dairy": ["cheese","milk","butter","yogurt","yoghurt","cream","fromage","queso","formaggio","leche","latte","lait","beurre","mantequilla","burro","crème","creme","mascarpone","mozzarella","parmesan","parmigiano","feta","ricotta","brie","camembert","gruyère","gruyere","comté","comte","manchego","gorgonzola","roquefort","stilton","halloumi","labneh","crème fraîche","crema","panna","stracciatella","burrata","reblochon","saint-félicien","pecorino","cabrales","emmental","raclette","fontina","skyr"],
    "produce": ["tomato","tomatoes","potato","potatoes","onion","onions","garlic","ail","carrot","carrots","carotte","lettuce","laitue","apple","apples","pomme","lemon","lemons","citron","orange","oranges","spinach","épinard","kale","broccoli","cauliflower","cucumber","cucumbers","concombre","pepper","peppers","mushroom","mushrooms","champignon","banana","strawberry","strawberries","raspberry","raspberries","blueberry","blueberries","fruit","fruits","vegetable","vegetables","produce","tomate","tomates","cebolla","cebollas","manzana","fraise","fraises","framboise","framboises","mela","mele","cipolla","cipolle","aglio","fresh","fresca","fresco","frais","mango","papaya","pineapple","ananas","avocado","aguacate","melón","melon","sandía","sandia","pastèque","watermelon","fig","figs","figue","figues","fico","pera","pere","pear","pears","peach","peaches","pêche","pesca","celery","céleri","sedano","leek","poireau","porro","puerro","artichoke","artichaut","carciofo","alcachofa","asparagus","asperge","asparagi","espárrago","fennel","fenouil","finocchio","hinojo","beetroot","betterave","barbabietola","remolacha","radish","radis","ravanello","rábano","courgette","zucchini","zucchina","calabacín","eggplant","aubergine","melanzana","berenjena","squash","courge","calabaza","zucca","cilantro","coriandre","coriandolo","basil","basilic","basilico","albahaca","parsley","persil","prezzemolo","perejil","mint","menthe","menta","dill","aneth","aneto","eneldo","thyme","thym","timo","tomillo","rosemary","romarin","rosmarino","romero","arugula","rocket","roquette","rucola","rúcula","radicchio","chicory","endive","frisée","watercress","cresson","crescione","berro","scallion","spring onion","échalote","scalogno","chalota","shallot","bok choy","pak choi","gai lan","choy sum","kangkong","ginger","gingembre","zenzero","jengibre","jalapeño","habanero","chili","peperoncino","piment"],
    "freezer": ["frozen","frosted","glacé","glace","glacée","ice cream","gelato","helado","sorbet","sorbete","mochi","granita","ice","glace"],
    "spices": ["salt","pepper","saffron","vanilla","cinnamon","clove","cumin","paprika","spice","spices","herb","herbs","sumac","za'atar","zaatar","harissa","mole","curry powder","sel","poivre","poivre noir","pimienta","azafrán","azafran","vainilla","sale","pepe","zafferano","vaniglia","cannella","sal","pepe","peperoncino","piment d'espelette","espelette","fenugreek","cardamom","coriander seed","mustard seed","fennel seed","nigella","ras el hanout","baharat","garam masala","chinese 5 spice","star anise","badiane","jeera","masala"],
    "grains-pasta": ["rice","pasta","flour","oats","oat","quinoa","bulgur","couscous","polenta","semolina","noodle","noodles","udon","soba","ramen","spaghetti","linguine","penne","fusilli","tagliatelle","fettuccine","rigatoni","conchiglie","pappardelle","trofie","orecchiette","gnocchi","tortellini","ravioli","riso","arroz","farine","farina","harina","pâtes","pâte","pates","pasta","sushi rice","mochi-gome","glutinous rice","basmati","jasmine rice","carnaroli","arborio","vialone","bomba","koshihikari","wild rice","fonio","teff","amaranth","millet","sorghum","barley","rye","spelt","kamut","emmer","farro","wheat","blé","ble","trigo","grano"],
    "bakery": ["bread","loaf","loaves","pain","pane","panecillo","baguette","croissant","brioche","focaccia","ciabatta","sourdough","pretzel","pretzels","cake","gâteau","gateau","tart","tarte","pie","torte","éclair","macaron","sablés","biscuit","biscuits","cookie","cookies","muffin","scone","scones","valrhona","cacao","cocoa","fève","beans cocoa","praline","gianduja","frangipane","panettone","colomba","tiramisu","panna cotta","creme brulee","baba","yeast","levure","levain","sourdough","starter","gelatin","gelatine","gelatina","pectin","glucose","fructose","powdered sugar","icing sugar","caster sugar","muscovado","trimoline"],
    "garde-manger": ["curing","cure","ferment","fermented","koji","tempeh","natto","sourdough starter","kombucha","scoby","kefir","bactoferm","wood","smoke","smoking","hickory","applewood","cherry wood","casings","casing","transglutaminase","activa","methylcellulose","xanthan","agar","sosa","louis françois","trimoline","pectin","gelatin sheets","nitrite","pink salt","prague powder"],
    "japan-korea": ["miso","shoyu","mirin","sake","dashi","nori","wakame","kombu","wasabi","tofu","gochujang","kimchi","sashimi","sushi","matcha","sencha","hojicha","genmaicha","ponzu","tamari","saikyo","hatcho","koshihikari","yamasa","kikkoman","wagyu","ikura","tobiko","masago","umami","umeboshi","gari","takuan","aburaage","yuba","shichimi","yagenbori","yuzu","sudachi","kabosu","kanpachi","hamachi","hirame","tai","uni","amaebi","negi","mitsuba","shungiku","japchae","gochugaru","ssamjang","doenjang","saemchu","perilla","shiso","ramen","udon","soba","somen","gyoza","onigiri"],
    "sea": ["thai","vietnamese","indonesian","malaysian","filipino","singapore","curry","coconut","lemongrass","galangal","kaffir","pandan","fish sauce","nuoc mam","sambal","tom yum","tom kha","pho","banh mi","banh xeo","banh trang","spring roll","rice paper","sambal oelek","kecap","belacan","kapi","jasmine rice","sticky rice","glutinous rice","red boat","mae ploy","sriracha","hoisin","oyster sauce","char siu","aroy-d","chaokoh"],
    "chinese": ["chinese","sichuan","cantonese","mandarin","doubanjiang","oyster sauce","hoisin","char siu","xo","sichuan peppercorn","laoganma","fly by jing","chinkiang","shaoxing","wong","wonton","dumpling","jiaozi","ho fun","mei fun","bao","dim sum","har gow","siu mai","sweet and sour","kung pao","mapo","spring rolls","peking duck","lap cheong","conpoy","dried scallop"],
    "india": ["indian","masala","curry","tikka","biryani","tandoori","ghee","paneer","naan","chapati","basmati","dal","lentil","cardamom","fenugreek","turmeric","cumin","coriander seed","mustard seed","amchur","kasuri methi","mdh","everest","aashirvaad","mango pickle","lime pickle","chaat","papadum","papad","atta","gram flour","besan","sooji","rava","ragi","bajra","poha","sambar","rasam","goda","panch phoron","kashmiri","hing","asafoetida","saffron","chai","masala chai","darjeeling","assam"],
    "middle-east": ["tahini","hummus","baba","baba ganoush","falafel","shawarma","kebab","baklava","pita","labneh","sumac","za'atar","zaatar","harissa","ras el hanout","baharat","saffron","rose water","orange blossom water","pomegranate molasses","cortas","mymouné","mymoune","aleppo","urfa","maraş","maras","pul biber","mahleb","mastic","loomi","dried lime","freekeh","bulgur","couscous","mograbieh","fregola","sahlab","arak","arabic","lebanese","syrian","palestinian","turkish","iranian","persian","yemeni","moroccan","tunisian","ottolenghi"],
    "africa": ["berbere","injera","teff","fonio","palm oil","peri-peri","bobotie","tagine","couscous","harissa","ras el hanout","argan","african","ethiopian","eritrean","kenyan","tanzanian","nigerian","ghanaian","senegalese","cape malay","biltong","boerewors","mauritian","creole","masala chai","piri piri","nando","rooibos","honeybush","cape gooseberry"],
    "mexican": ["mexican","mexico","oaxaca","yucatan","yucatán","cabo","taco","tortilla","masa","masienda","mole","salsa","jalapeño","jalapeno","ancho","guajillo","pasilla","chipotle","epazote","mexican oregano","queso fresco","cotija","cilantro","tomatillo","poblano","habanero","pibil","cochinita","carnitas","barbacoa","al pastor","mezcal","tequila","ibarra","abuelita","cholula","tapatío","valentina","tajín","tajin","yucateco","papantla","veracruz","sopapilla","churro"],
    "caribbean": ["jamaican","jerk","scotch bonnet","ackee","callaloo","plantain","yuca","trinidad","trinidadian","creole","louisiana","cuban","mojo","sazón","sazon","sofrito","adobo","blue mountain","walkerswood","grace","matouk","susie","marie sharp","pimento","allspice","chadon beni","culantro","rum","myers","mount gay","appleton","cohiba","habanero"],
    "south-america": ["peruvian","peru","argentine","argentina","brazilian","brazil","chilean","chile","colombian","colombia","ají amarillo","aji amarillo","huacatay","chimichurri","dendê","dende","cachaça","cachaca","açaí","acai","quinoa","pisco","yerba mate","mate","cocoa peru","dulce de leche","arepa","empanada","feijoada","ceviche","tiradito","leche de tigre","aji panca","rocoto","lulo","naranjilla","maca","camu camu","lúcuma","lucuma","sambazon"],
    "produce-fresh": ["fresh herbs","fresh fruit","fresh vegetables","organic","bio","biologique","heirloom","local"],
    "caviar": ["caviar","beluga","ossetra","oscietre","sevruga","kaluga","baerii","baïka","baika","daurenki","alverta","almas","petrossian","kaviari","sturia","ikura","tobiko","masago","bottarga","uni","sea urchin","smoked salmon","gravlax","gravadlax","smoked eel","smoked trout","smoked sturgeon","smoked halibut","smoked mackerel","cured fish","blini","blinis","crème fraîche d'isigny","mother-of-pearl","mother of pearl","caviar spoon","saumon fumé","saumone affumicato","salmón ahumado"],
    "modernist": ["sosa","louis françois","louis francois","agar","agar-agar","xanthan","gellan","carrageenan","carragheen","methocel","methylcellulose","trimoline","glucose syrup","atomised glucose","isomalt","maltodextrin","sodium alginate","calcium chloride","calcium gluconolactate","gluco","calcic","citrate","lecithin","sucroester","sucro","glice","pro-espuma","procrema","prosorbet","neutro","albumin","albuwhip","dextrose","sorbitol","cremsucre","pectin nh","pectin yellow","pectin x58","freeze-dried","freeze dried","peta crispy","pop rocks","sphere","spherification","emulsifier","stabiliser","gelatin sheet","gelatine sheet","transglutaminase","activa","bactoferm","prague powder","pink salt","curing salt","crystallised rose","crystallised violet","edible flower","gold leaf","silver leaf","food colour","food coloring","air bag","sosa aroma","natural aroma"],
    "ice-cream": ["ice cream","icecream","gelato","sorbet","sorbete","glace","glacé","helado","mochi","fruit purée","fruit puree","puree de fruits","purée de fruits","ponthier","les vergers boiron","boiron","capfruit","pacojet","carpigiani","pastry cream base","fior di latte","stracciatella","pistachio gelato","bronte","fragole","fragola","frutto","frutos rojos","ananas puree","mango puree","passion fruit puree","yuzu puree","calamansi puree","blood orange puree"],
    "equipment": ["cling film","cling-film","saran","plastic wrap","tin foil","aluminum foil","aluminium foil","baking parchment","parchment paper","greaseproof","silpat","silicone mat","acetate","ziploc","zip-loc","resealable bag","vacuum bag","vacuum-pack","vac-pack","cryovac","sous vide bag","bin liner","trash bag","garbage bag","dishwasher tablet","dishwasher salt","rinse aid","calgonit","finish","fairy","dish soap","hand soap","oven cleaner","grease remover","degreaser","sanitiser","sanitizer","disinfectant","stainless steel polish","sponge","scourer","scour pad","green sponge","microfiber","j-cloth","kitchen roll","kitchen paper","paper towel","toilet paper","hand towel paper","gloves","latex glove","nitrile glove","vinyl glove","washing-up glove","cut-resistant glove","hair net","beard net","apron","gas cartridge","co2 cartridge","n2o","whipper charger","smoke chip","wood chip","binchotan","charcoal","skewer","toothpick","twine","butcher twine","cheesecloth","muslin","coffee filter","torch lighter","butane refill","silicone mat","sheet pan liner","equipment","smallwares","consumable","disposable","cleaning","detergent"],
    "specialty-meat": ["wagyu","kobe","miyazaki","kagoshima","ohmi","hida","sanuki","olive-fed wagyu","aussie wagyu","stone axe","jack's creek","jacks creek","snake river farms","mishima","american wagyu","luma","l'hoff","lhoff","lindenhoff","rougié","rougie","rhug","rhug estate","salt-marsh","salt marsh","sisteron","pyrénées lamb","pyrenees lamb","mont-saint-michel lamb","milk-fed lamb","iberico","ibérico","bellota","jamón","jamon","cinco jotas","sánchez romero","sanchez romero","pluma","secreto","presa","solomillo","abanico","carrillera","papada","paleta","tx0gitxu","discarlux","vieja vaca","galician beef","old cow","aged beef","dry-aged","dry aged","côte de bœuf","cote de boeuf","tomahawk","prime","usda prime","creekstone","pat lafrieda","venison","wild boar","grouse","partridge","mallard","wood pigeon","hare","rabbit","game","wild game","bresse","label rouge","poussin","capon","challans","duck rouen","magret","duck breast","moulard","foie gras","torchon","truffle","tartufo","tuber magnatum","tuber melanosporum","tuber aestivum","tuber uncinatum","alba truffle","périgord truffle","perigord truffle","summer truffle","burgundy truffle","plantin","pebeyre","tartufi morra","urbani"],
    "western": [], // Default fallback
  };

  function guessCategory(name) {
    if (!name) return "western";
    const text = name.toLowerCase();
    const scores = {};
    Object.entries(CAT_KEYWORDS).forEach(([catId, keywords]) => {
      let s = 0;
      keywords.forEach(kw => {
        if (kw.length < 3) return;
        if (text.includes(kw)) s += Math.min(3, kw.length / 3);
      });
      if (s > 0) scores[catId] = s;
    });
    const entries = Object.entries(scores);
    if (entries.length === 0) return "western";
    entries.sort((a, b) => b[1] - a[1]);
    let best = entries[0][0];
    if (best === "produce-fresh") best = "produce";
    return best;
  }

  // Translate a name from FR/IT/ES to English (word-by-word), used when creating custom items.
  function translateToEnglish(text) {
    if (!text) return text;
    let result = text;
    Object.entries(REVERSE_TRANS).forEach(([foreign, englishSet]) => {
      if (foreign.length < 3) return;
      const en = [...englishSet][0];
      if (!en) return;
      const re = new RegExp(`\\b${foreign.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      result = result.replace(re, m => {
        if (m[0] === m[0].toUpperCase()) return en[0].toUpperCase() + en.slice(1);
        return en;
      });
    });
    return result;
  }

  // Build reverse-translation lookup: foreign word → English (one or more)
  const REVERSE_TRANS = (() => {
    const idx = {};
    Object.entries(VOCAB).forEach(([en, langs]) => {
      ["fr", "it", "es"].forEach(L => {
        const t = langs[L];
        if (!t) return;
        // Index each word of the translation
        t.toLowerCase().split(/\s+/).forEach(w => {
          if (w.length < 3) return;
          if (!idx[w]) idx[w] = new Set();
          en.toLowerCase().split(/\s+/).forEach(part => { if (part.length >= 2) idx[w].add(part); });
        });
      });
    });
    return idx;
  })();

  function expandTokens(tokens) {
    // Returns an array of arrays: each token's alternatives (the original + aliases + plural variants + cross-language equivalents)
    return tokens.map(t => {
      const forms = new Set([t]);
      // Plural normalisation
      if (t.length >= 5) {
        if (t.endsWith("ies")) forms.add(t.slice(0, -3) + "y");
        if (t.endsWith("es")) forms.add(t.slice(0, -2));
        if (t.endsWith("s")) forms.add(t.slice(0, -1));
        if (!t.endsWith("s")) forms.add(t + "s");
      }
      // Synonym aliases (built-in)
      const aliases = TOKEN_ALIASES[t];
      if (aliases) aliases.forEach(a => forms.add(a));
      // Cross-language: if the token is a French/Italian/Spanish word, add the English equivalent(s)
      const rev = REVERSE_TRANS[t];
      if (rev) rev.forEach(en => forms.add(en));
      return [...forms];
    });
  }

  // Lines from a "Copy as text" export include headers / footers / category dividers
  // we need to skip when re-parsing.
  function shouldSkipLine(line) {
    if (!line) return true;
    if (/^[=─\-]+$/.test(line)) return true; // dividers
    if (/^▸\s+/.test(line)) return true; // category headers like "▸ FISH"
    if (/^(date|supplier|vessel|chef|generated\s+by|order|pax|pour|pour\s+|littoralicious|galley\s+order)\s*[:—\-]/i.test(line)) return true;
    if (/^https?:\/\//.test(line)) return true;
    if (/^(received\s+by|signature|time)\s*:/i.test(line)) return true;
    if (/^#/.test(line) || /^\/\//.test(line)) return true;
    return false;
  }

  function parseListInput(text) {
    const lines = text.split(/\n+/).map(l => l.trim()).filter(l => l);
    const parsed = [];
    for (const line of lines) {
      if (shouldSkipLine(line)) continue;
      // strip bullets / numbers
      let s = line.replace(/^[-•*▸>·–—]+\s*/, "").replace(/^\d+[\)\.]\s+/, "");

      // === Extract notes from line ===
      // 1) Parenthetical: "salmon (sashimi grade)" → notes = "sashimi grade"
      // 2) After "// " or " -- " or " — " separator: "salmon // skin off" → notes = "skin off"
      // 3) After " : " mid-line (heuristic, only if line looks like "item : note")
      let notes = "";
      const parenMatch = s.match(/\(([^)]+)\)/);
      if (parenMatch) {
        const parenContent = parenMatch[1].trim();
        // Skip parentheses that are clearly NOT notes (e.g. dimensions like (180g) or numerical)
        if (!/^\d+\s*(g|kg|ml|l|cm|mm|%)?$/i.test(parenContent) && parenContent.length >= 3) {
          notes = parenContent;
          s = s.replace(parenMatch[0], " ").replace(/\s+/g, " ").trim();
        }
      }
      // Separators (only first, only AFTER the item text we'll need)
      const sepMatch = s.match(/\s+(\/\/|—|–|--)\s+(.+)$/);
      if (sepMatch && !notes) {
        const tail = sepMatch[2].trim();
        if (tail.length >= 3 && !/^\d/.test(tail)) {
          notes = tail;
          s = s.slice(0, sepMatch.index).trim();
        }
      }

      // detect qty + unit anywhere in the line
      const m = s.match(/(\d+(?:[.,]\d+)?)\s*(kg|g|lb|lbs|pc|pcs|piece|pieces|jar|tin|can|bunch|case|box|pack|dozen|doz|bottle|bottles|l\b|ml|liter|liters|litre|litres|head|heads|rack|racks|tray|trays|tube|tubes|side|sides|stick|sticks)?\b/i);
      let qty = "", unit = "", name = s;
      if (m) {
        qty = m[1].replace(",", ".");
        unit = (m[2] || "").toLowerCase();
        if (unit === "pc" || unit === "piece" || unit === "pieces") unit = "pcs";
        if (unit === "lb" || unit === "lbs") unit = "kg";
        if (unit === "doz" || unit === "dozen") { unit = "pcs"; qty = String(parseFloat(qty) * 12); }
        if (unit === "liter" || unit === "liters" || unit === "litre" || unit === "litres") unit = "L";
        if (unit === "bottles") unit = "bottle";
        if (unit === "heads") unit = "heads";
        name = s.replace(m[0], " ").replace(/\s+/g, " ").trim();
      }
      name = name.replace(/^[-:,;—–]+\s*/, "").replace(/\s*[-:,;—–]+$/, "").trim();
      if (!name || name.length < 2) continue;
      parsed.push({ raw: line, qty, unit, name, notes });
    }
    return parsed;
  }

  // Levenshtein edit distance — for typo-tolerant matching.
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);
    const m = a.length, n = b.length;
    const prev = new Int32Array(n + 1);
    const curr = new Int32Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      curr[0] = i;
      for (let j = 1; j <= n; j++) {
        const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      for (let j = 0; j <= n; j++) prev[j] = curr[j];
    }
    return prev[n];
  }
  function similarity(a, b) {
    if (!a || !b) return 0;
    const max = Math.max(a.length, b.length);
    if (max === 0) return 1;
    return 1 - levenshtein(a, b) / max;
  }

  function fuzzyMatch(query) {
    if (!query) return [];
    const queryLower = query.toLowerCase();
    const queryNorm = queryLower.replace(/[^a-zà-ÿ0-9 ]/gi, " ").replace(/\s+/g, " ").trim();
    const tokens = queryLower.replace(/[^a-zà-ÿ0-9 ]/gi, " ").split(/\s+/).filter(t => t.length >= 2);
    if (tokens.length === 0) return [];
    const stopwords = new Set(["the","and","for","with","of","in","on","to","fresh","new","old","a","an","or","de","la","le","du","des","les","un","une"]);
    const sigTokens = tokens.filter(t => !stopwords.has(t));
    if (sigTokens.length === 0) return [];
    const tokenAlternatives = expandTokens(sigTokens);
    const scored = [];

    PANTRY_DATA.forEach(cat => effectiveSections(cat).forEach(sec => sec.items.forEach(it => {
      const nameNorm = it.name.toLowerCase();
      const hay = (it.name + " " + (it.brand || "")).toLowerCase();

      let hits = 0;
      tokenAlternatives.forEach(alts => { if (alts.some(a => hay.includes(a))) hits++; });
      const ratio = hits / sigTokens.length;

      // Per-token typo tolerance — if a query token doesn't substring-match, try Levenshtein
      // against each word in the catalog name + brand. If close enough, count as a hit.
      let typoHits = 0;
      const hayWords = hay.split(/[^a-zà-ÿ0-9]+/).filter(w => w.length >= 3);
      tokenAlternatives.forEach(alts => {
        const directHit = alts.some(a => hay.includes(a));
        if (directHit) return;
        // For each alt, check if any catalog word is close (within 1-2 edits for short, 25% for longer)
        const close = alts.some(a => {
          if (a.length < 3) return false;
          const maxEdits = a.length <= 5 ? 1 : a.length <= 8 ? 2 : Math.floor(a.length * 0.25);
          return hayWords.some(w => levenshtein(a, w) <= maxEdits);
        });
        if (close) typoHits++;
      });
      const adjustedHits = hits + typoHits;
      const adjustedRatio = adjustedHits / sigTokens.length;

      const minRatio = sigTokens.length <= 2 ? 0.5 : 0.34;
      if (adjustedRatio >= minRatio) {
        const exactBonus = hay.includes(queryLower) ? 0.5 : 0;
        // Name-level similarity — pushes catalog items whose NAME (not just brand) closely matches query
        const nameSim = similarity(queryNorm, nameNorm);
        const simBonus = nameSim > 0.55 ? nameSim * 0.45 : 0;
        const qualityBonus = /\b(organic|bio\b|grass-fed|wild|free-range|label rouge|biodynamic|heirloom|aop|dop|igp|pdo|wild-caught|line-caught|day-boat|single-estate|sustainable|msc|asc)\b/i.test(hay) ? 0.15 : 0;
        const typoPenalty = typoHits > 0 ? -0.1 : 0; // slight penalty if matched only via typo correction
        scored.push({
          item: it, cat, section: sec,
          score: adjustedRatio + exactBonus + simBonus + qualityBonus + typoPenalty + (it.tier * 0.02),
          tier: it.tier,
          hits: adjustedHits, total: sigTokens.length,
          typoFix: typoHits > 0,
          nameSim,
        });
      }
    })));
    scored.sort((a, b) => b.score - a.score || b.tier - a.tier);
    return scored.slice(0, 6);
  }

  function openUploadListModal() {
    const ctx = enrichCtx();
    const html = `
      <h2>Add a list of items</h2>
      <div class="modal-help">
        <strong>What this does</strong>
        <p>Paste a supplier email, WhatsApp message, hand-written list, or a chef-to-chef hand-off list. The parser reads each line, finds the closest match in the 3,200+ item catalog, and lets you review every match before anything touches your order.</p>
        <p style="margin-bottom:0;"><strong>How to use:</strong> paste &rarr; click <em>Parse &amp; preview</em> &rarr; for each line check the match dropdown and the quantity &rarr; click <em>Add to order</em>. Items already in your draft are <strong>summed</strong> (not overwritten).</p>
      </div>
      <p style="font-size:11px;color:var(--color-muted);margin-bottom:6px;">Examples accepted (mix freely):
        <code>5kg salmon</code> · <code>- 12 oysters</code> · <code>3 lobsters // for Saturday dinner</code> · <code>Wagyu ribeye (BMS 8+)</code></p>
      <p style="font-size:11px;color:var(--color-muted);margin-bottom:6px;"><strong>Notes:</strong> add per-item notes inline: parentheses <code>(skin off, pin-boned)</code> or after a separator <code>-- skin off</code> / <code>// sashimi grade</code>. You can also edit each row's notes in the preview before committing.</p>
      <p style="font-size:11px;color:var(--color-muted);margin-bottom:8px;">Currently configured: <strong>${ctx.guest} guest + ${ctx.crew} crew · ${ctx.days} days</strong>. Items without a qty get a default from this PAX × days math.</p>
      <textarea id="upload-textarea" rows="11" placeholder="One item per line…&#10;5 kg King salmon&#10;12 oysters&#10;Wagyu ribeye&#10;- 3 lobsters&#10;jamón ibérico bellota 200g&#10;3 tins osetra" style="width:100%;font-family:'SF Mono',Consolas,monospace;font-size:12px;padding:10px;border:1px solid var(--color-border);background:var(--color-paper);color:var(--color-ink);"></textarea>
      <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11px;color:var(--color-muted);">Everything stays in your browser. Press <kbd>Esc</kbd> to cancel.</span>
        <span>
          <button class="btn btn-ghost" data-close>Cancel</button>
          <button class="btn btn-primary" id="parse-list">Parse &amp; preview →</button>
        </span>
      </div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = closeModal;
    m.querySelector("#parse-list").onclick = () => {
      const text = m.querySelector("#upload-textarea").value;
      const parsed = parseListInput(text);
      if (!parsed.length) { alert("Empty list."); return; }
      openListPreview(parsed);
    };
    setTimeout(() => m.querySelector("#upload-textarea").focus(), 50);
  }

  // Natural step per unit — the minimum sensible order increment.
  // For flour, salt, sugar, rice etc. (kg) → +1 kg. For L → +1 L.
  // Bottles / tins / pcs → +1. Spices (g) → +100. mL → +250.
  function naturalStep(unit) {
    const u = (unit || "").toLowerCase().trim();
    if (u === "kg") return 1;
    if (u === "g") return 100;
    if (u === "l") return 1;
    if (u === "ml") return 250;
    return 1; // bottles, tins, pcs, jars, packs, racks, legs, etc.
  }
  // Default qty for items with no portion rule but a matched unit (week-of-use)
  function defaultQtyByUnit(unit) {
    const u = (unit || "").toLowerCase().trim();
    if (["tin","tins","jar","jars","bottle","bottles","pack","case","box","pcs","pc","piece","pieces","bunch","tray","stick","sticks","tube","log","sheet","sheets","heads","racks","birds","legs","claws","side","sides","lobes"].includes(u)) return 1;
    if (u === "kg") return 1;
    if (u === "g") return 100;
    if (u === "l") return 1;
    if (u === "ml") return 250;
    return 1;
  }
  function findItemById(id) {
    for (const c of PANTRY_DATA) {
      for (const sec of effectiveSections(c)) {
        const it = sec.items.find(i => i.id === id);
        if (it) return it;
      }
    }
    return null;
  }
  function formatQty(n) {
    if (!isFinite(n)) return "";
    if (Number.isInteger(n)) return String(n);
    // round to 2 decimals, strip trailing zeros
    return n.toFixed(2).replace(/\.?0+$/, "");
  }

  function openListPreview(parsedLines) {
    // For the preview, if user has no PAX set yet, default to a week × 10 guests
    let ctx = enrichCtx();
    let usedDefaults = false;
    if ((ctx.guest || 0) === 0 && (ctx.crew || 0) === 0) {
      ctx = { ...ctx, guest: 10, crew: 0, days: 7 };
      usedDefaults = true;
    }
    const rows = parsedLines.map(p => {
      const matches = fuzzyMatch(p.name);
      const best = matches[0] || null;
      let suggestedQty = p.qty;
      let suggestedUnit = p.unit;
      if (best) {
        const e = window.PANTRY_ENRICH.enrichItem(best.item, best.cat, best.section, ctx);
        // ALWAYS auto-fill if user didn't specify a qty — week-of-use defaults
        if (!suggestedQty || !suggestedQty.trim()) {
          if (e.portion) {
            suggestedQty = formatQty(e.portion.qty);
            suggestedUnit = e.portion.unit;
          } else {
            const itemUnit = best.item.unit || suggestedUnit || "pcs";
            suggestedQty = formatQty(defaultQtyByUnit(itemUnit));
            suggestedUnit = itemUnit;
          }
        }
        if (!suggestedUnit) suggestedUnit = best.item.unit || "";
      }
      // For unmatched rows: AI-guess a category + translate name to English
      let guessedCatId = "", guessedCatLabel = "", finalName = p.name;
      if (!best) {
        // Translate first so French/Italian/Spanish items get a fair guess
        finalName = translateToEnglish(p.name);
        guessedCatId = guessCategory(finalName);
        const gCat = PANTRY_DATA.find(c => c.id === guessedCatId);
        guessedCatLabel = gCat ? gCat.label : "Western";
        // No portion rule but we still want a sensible starting qty
        if (!suggestedQty || !suggestedQty.trim()) {
          const u = (suggestedUnit || "pcs");
          suggestedQty = formatQty(defaultQtyByUnit(u));
          suggestedUnit = u;
        }
      }
      return {
        raw: p.raw,
        parsedName: p.name,
        guessedName: finalName,                   // English-translated name for custom-item creation
        matches,
        selected: best ? best.item.id : "",
        qty: suggestedQty,
        unit: suggestedUnit,
        notes: p.notes || "",
        include: true,                            // include ALL items now (matched OR auto-categorised)
        catLabel: best ? best.cat.label : guessedCatLabel + " (auto)",
        catId: best ? best.cat.id : guessedCatId,
        catOrder: best ? PANTRY_DATA.findIndex(c => c.id === best.cat.id) : PANTRY_DATA.findIndex(c => c.id === guessedCatId),
        isAutoCustom: !best,
      };
    });
    renderListPreview(rows, usedDefaults, ctx);
  }

  function renderListPreview(rows, usedDefaults, ctx) {
    closeModal();
    // Group rows by category (stable: based on best initial match)
    const groups = {};
    rows.forEach((r, idx) => {
      const key = r.catLabel || "— No catalog match —";
      if (!groups[key]) groups[key] = { catId: r.catId || "", catOrder: r.catOrder, rows: [] };
      groups[key].rows.push({ ...r, idx });
    });
    const groupKeys = Object.keys(groups).sort((a, b) => groups[a].catOrder - groups[b].catOrder);

    // Build summary line
    const matched = rows.filter(r => r.matches.length);
    const unmatched = rows.filter(r => !r.matches.length);
    const summaryByCat = groupKeys
      .filter(k => groups[k].catId)
      .map(k => `<strong>${escapeHTML(k)}</strong> ${groups[k].rows.length}`)
      .join(" · ");

    const defaultBanner = usedDefaults
      ? `<div class="prefs-section" style="background:rgba(45,74,94,0.06);border-left:4px solid var(--color-sea);padding:8px 12px;margin-bottom:10px;font-size:12px;color:var(--color-ink);">
          <strong>No PAX set</strong> — quantities default to <strong>${ctx.guest} guests × ${ctx.days} days</strong>. Every matched item is pre-filled. Adjust with ± per row, or set PAX in the bar and re-paste for real math.
        </div>`
      : `<p style="font-size:12px;color:var(--color-muted);margin-bottom:8px;">Quantities pre-filled for <strong>${ctx.guest} guest + ${ctx.crew} crew × ${ctx.days} days</strong>. Adjust with ± per row.</p>`;

    let html = `<h2>Review &amp; commit · ${rows.length} line${rows.length === 1 ? "" : "s"}</h2>
      ${defaultBanner}
      <div class="prev-summary">
        <span class="prev-summary-count">${matched.length}/${rows.length} matched · grouped by category</span>
        ${summaryByCat ? `<div class="prev-summary-cats">${summaryByCat}</div>` : ""}
        ${unmatched.length ? `<div class="prev-summary-warn">${unmatched.length} line${unmatched.length === 1 ? "" : "s"} with no catalog match — will be skipped on commit</div>` : ""}
      </div>
      <p style="font-size:11px;color:var(--color-muted);margin-bottom:6px;">Click ± to step by a natural amount (1 for bottles/tins/pcs · 0.5 kg · 50 g · 0.5 L · 100 mL). Items already in your draft are summed on commit.</p>
      <table class="preview-table preview-table-v2">
        <thead><tr>
          <th style="width:24px;">Add</th>
          <th style="width:18%;">Input</th>
          <th>Catalog match</th>
          <th style="width:140px;">Qty</th>
          <th style="width:60px;">Unit</th>
          <th>Notes</th>
        </tr></thead><tbody>`;
    groupKeys.forEach(groupKey => {
      const g = groups[groupKey];
      const groupRows = g.rows;
      const includedCount = groupRows.filter(r => r.include).length;
      const hasCatalogMatch = !!g.catId;
      html += `<tr class="prev-group-head"><td colspan="6">
        <span class="prev-group-label">${hasCatalogMatch ? "▸" : "✕"} ${escapeHTML(groupKey)}</span>
        <span class="prev-group-count">${includedCount}/${groupRows.length} selected</span>
        ${hasCatalogMatch ? `<button class="prev-group-toggle" data-group-toggle="${escapeAttr(groupKey)}" title="Select / deselect all in this category">Toggle group</button>` : ""}
      </td></tr>`;
      groupRows.forEach(r => {
        const idx = r.idx;
        let opts;
        if (r.matches.length) {
          opts = r.matches.map(m => `<option value="${m.item.id}" ${m.item.id === r.selected ? "selected" : ""}>${escapeHTML(m.cat.label)} · ${escapeHTML(m.item.name)}${m.tier ? " " + "★".repeat(m.tier) : ""}</option>`).join("");
        } else {
          // Unmatched — let the user pick a category from the dropdown to override the AI guess
          opts = PANTRY_DATA.map(c => `<option value="cat:${c.id}" ${c.id === r.catId ? "selected" : ""}>+ Add to ${escapeHTML(c.label)}</option>`).join("");
        }
        // Detect a rename: if the user's parsed name differs notably from the matched catalog name
        const selectedMatch = r.matches.find(m => m.item.id === r.selected) || r.matches[0];
        const catalogName = selectedMatch ? selectedMatch.item.name : "";
        const inputClean = (r.parsedName || "").toLowerCase().trim();
        const catClean = catalogName.toLowerCase();
        const isRenamed = inputClean && catClean && !catClean.includes(inputClean) && inputClean !== catClean;
        const rowClasses = [
          !r.matches.length ? "auto-custom" : "",
          isRenamed ? "is-renamed" : "",
        ].filter(Boolean).join(" ");
        html += `<tr data-row="${idx}" class="${rowClasses}">
          <td><input type="checkbox" data-include="${idx}" ${r.include ? "checked" : ""}/></td>
          <td class="preview-input">${escapeHTML(r.raw)}${isRenamed ? `<span class="rename-arrow" title="Auto-renamed to catalog name">→</span>` : ""}${r.isAutoCustom ? `<span class="auto-custom-badge" title="No catalog match — will be added as a custom item">+ custom</span>` : ""}</td>
          <td><select data-select="${idx}">${opts}</select></td>
          <td>
            <div class="prev-qty-cell">
              <button class="prev-step" data-dec="${idx}" title="− ${naturalStep(r.unit)}">−</button>
              <input type="text" data-qty="${idx}" value="${escapeAttr(r.qty)}" inputmode="decimal" />
              <button class="prev-step" data-inc="${idx}" title="+ ${naturalStep(r.unit)}">+</button>
            </div>
          </td>
          <td><input type="text" data-unit="${idx}" value="${escapeAttr(r.unit)}" placeholder="unit" /></td>
          <td><input type="text" data-note="${idx}" value="${escapeAttr(r.notes)}" placeholder="notes…" class="prev-note" /></td>
        </tr>`;
      });
    });
    html += `</tbody></table>
      <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;">
        <span><button class="btn btn-ghost" id="select-all">Toggle all</button></span>
        <span>
          <button class="btn btn-ghost" data-back>← Back to paste</button>
          <button class="btn btn-primary" id="commit">Add ${matched.filter(r => r.include).length} items to order →</button>
        </span>
      </div>`;
    const m = openModal(html);

    const updateCommitCount = () => {
      m.querySelector("#commit").textContent = `Add ${rows.filter(r => r.include).length} items to order →`;
    };
    const stepRow = (idx, dir) => {
      const r = rows[idx];
      const step = naturalStep(r.unit);
      const cur = parseFloat(r.qty) || 0;
      const next = Math.max(0, cur + step * dir);
      r.qty = formatQty(next);
      m.querySelector(`[data-qty="${idx}"]`).value = r.qty;
      if (next > 0 && !r.include && r.matches.length) {
        r.include = true;
        const cb = m.querySelector(`[data-include="${idx}"]`);
        if (cb) cb.checked = true;
        updateCommitCount();
      }
    };

    const wire = () => {
      m.querySelectorAll("[data-include]").forEach(el => el.addEventListener("change", e => {
        rows[e.target.dataset.include].include = e.target.checked;
        updateCommitCount();
      }));
      m.querySelectorAll("[data-select]").forEach(el => el.addEventListener("change", e => {
        const v = e.target.value;
        const row = rows[e.target.dataset.select];
        if (v && v.startsWith("cat:")) {
          // Auto-custom row: user picked a target category
          row.catId = v.slice(4);
          row.selected = ""; // remains a custom add
        } else {
          row.selected = v;
        }
      }));
      m.querySelectorAll("[data-qty]").forEach(el => el.addEventListener("input", e => {
        rows[e.target.dataset.qty].qty = e.target.value;
      }));
      m.querySelectorAll("[data-unit]").forEach(el => el.addEventListener("input", e => {
        rows[e.target.dataset.unit].unit = e.target.value;
        // refresh the step tooltip
        const idx = e.target.dataset.unit;
        const dec = m.querySelector(`[data-dec="${idx}"]`);
        const inc = m.querySelector(`[data-inc="${idx}"]`);
        const step = naturalStep(rows[idx].unit);
        if (dec) dec.title = `− ${step}`;
        if (inc) inc.title = `+ ${step}`;
      }));
      m.querySelectorAll("[data-note]").forEach(el => el.addEventListener("input", e => {
        rows[e.target.dataset.note].notes = e.target.value;
      }));
      m.querySelectorAll("[data-inc]").forEach(el => el.addEventListener("click", () => stepRow(el.dataset.inc, +1)));
      m.querySelectorAll("[data-dec]").forEach(el => el.addEventListener("click", () => stepRow(el.dataset.dec, -1)));
      m.querySelectorAll("[data-group-toggle]").forEach(el => el.addEventListener("click", () => {
        const groupKey = el.dataset.groupToggle;
        const groupRows = rows.filter(r => (r.catLabel || "— No catalog match —") === groupKey && r.matches.length);
        const allOn = groupRows.every(r => r.include);
        groupRows.forEach(r => { r.include = !allOn; });
        renderListPreview(rows, usedDefaults, ctx);
      }));
    };
    wire();
    m.querySelector("#select-all").onclick = () => {
      const allOn = rows.every(r => r.include || !r.matches.length);
      rows.forEach(r => { if (r.matches.length) r.include = !allOn; });
      renderListPreview(rows, usedDefaults, ctx);
    };
    m.querySelector("[data-back]").onclick = () => openUploadListModal();
    m.querySelector("#commit").onclick = () => {
      const toAdd = rows.filter(r => r.include && (r.selected || r.isAutoCustom));
      if (!toAdd.length) { alert("Nothing selected to add."); return; }
      let noteCount = 0;
      let customCount = 0;
      const renamed = [];

      // For unmatched items, create them as custom items in the chosen category
      toAdd.forEach(r => {
        if (!r.selected && r.isAutoCustom) {
          const targetCat = r.catId || "western";
          const itemName = r.guessedName || r.parsedName || r.raw;
          const customId = addCustomItem(targetCat, "Add-list imports", itemName, "", 0, r.unit || "pcs");
          r.selected = customId; // so downstream qty/notes/unit logic finds it
          customCount++;
        }
      });

      toAdd.forEach(r => {
        const matched = r.matches.find(m => m.item.id === r.selected);
        if (matched) {
          const inputClean = (r.parsedName || "").toLowerCase().trim();
          const catClean = matched.item.name.toLowerCase();
          if (inputClean && catClean && !catClean.includes(inputClean) && inputClean !== catClean) {
            renamed.push({ from: r.parsedName || r.raw, to: matched.item.name, cat: matched.cat.label });
          }
        }
        const cur = getItem(r.selected)?.qty;
        const incoming = parseFloat(r.qty);
        if (cur != null && cur !== "" && !isNaN(parseFloat(cur))) {
          const next = (parseFloat(cur) || 0) + (isNaN(incoming) ? 0 : incoming);
          setQty(r.selected, formatQty(next));
        } else if (r.qty) {
          setQty(r.selected, r.qty);
        }
        if (r.unit) setUnit(r.selected, r.unit);
        if (r.notes && r.notes.trim()) {
          const existing = getItem(r.selected)?.notes || "";
          if (existing && !existing.includes(r.notes.trim())) {
            setNotes(r.selected, existing + " · " + r.notes.trim());
          } else if (!existing) {
            setNotes(r.selected, r.notes.trim());
          }
          noteCount++;
        }
      });
      closeModal();
      render();
      const summaryBits = [`${toAdd.length} item${toAdd.length === 1 ? "" : "s"}`];
      if (customCount) summaryBits.push(`${customCount} as custom`);
      if (noteCount) summaryBits.push(`${noteCount} with notes`);
      if (renamed.length) {
        showCommitSummary(toAdd.length, noteCount, renamed, customCount);
      } else {
        showToast(`Added ${summaryBits.join(" · ")} to "${activeDraft().name}".`);
      }
    };
  }

  function showCommitSummary(itemCount, noteCount, renamed, customCount) {
    const renamedRows = renamed.map(r => `<tr>
      <td class="rs-from">${escapeHTML(r.from)}</td>
      <td class="rs-arrow">→</td>
      <td class="rs-to">${escapeHTML(r.to)}</td>
      <td class="rs-cat">${escapeHTML(r.cat)}</td>
    </tr>`).join("");
    const html = `
      <h2>Items added · ${itemCount}${noteCount ? ` · ${noteCount} with notes` : ""}</h2>
      <p style="font-size:13px;color:var(--color-muted);">${renamed.length} item${renamed.length === 1 ? " was" : "s were"} auto-renamed to match the catalog spelling. The list in your order uses the canonical catalog names below.</p>
      <table class="rename-summary">
        <thead><tr>
          <th>Your input</th><th></th><th>Catalog name</th><th>Category</th>
        </tr></thead>
        <tbody>${renamedRows}</tbody>
      </table>
      <div class="modal-actions"><button class="btn btn-primary" data-close>Close</button></div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = closeModal;
  }

  // ─── PREFERENCE SHEET ANALYZER ──────────────────────────────────────────
  function openPreferencesModal() {
    const customLabel = state.customProfile ? state.customProfile.label : null;
    const html = `
      <h2>Add a guest preference sheet</h2>
      <div class="modal-help">
        <strong>What this does — and what stays private</strong>
        <p>Paste the text of a guest preference sheet (charter brief, dietary card, allergy list). The analyser extracts <em>allergies</em>, <em>likes</em>, <em>bans</em>, and dietary flags — then highlights matching catalog items so you can see at a glance what to plate and what to avoid.</p>
        <p><strong>Privacy:</strong> all parsing runs locally in your browser. Nothing is uploaded, no API is called, no log is kept. The extracted profile is saved only to your own browser's localStorage and is never shared with the publication or any third party. Export the JSON if you want a backup outside the browser.</p>
        <p style="margin-bottom:0;"><strong>How to use:</strong> paste &rarr; analyse &rarr; review extracted items &rarr; commit. The result becomes a <em>custom profile</em> active on the order. Loved items glow green, avoid items glow yellow, allergies glow red.</p>
      </div>
      ${customLabel ? `<p style="font-size:12px;color:var(--color-muted);">Current custom profile: <strong>${escapeHTML(customLabel)}</strong> · <button class="btn-mini" id="clear-prefs">Clear it</button></p>` : ""}
      <p style="font-size:11px;color:var(--color-muted);margin-bottom:6px;">Recognised phrases include: <code>allergic to</code>, <code>highly allergic to</code>, <code>no X</code>, <code>avoid X</code>, <code>dislikes X</code>, <code>loves X</code>, <code>favourite X</code>, <code>vegetarian</code>, <code>vegan</code>, <code>kosher</code>, <code>halal</code>, <code>gluten-free</code>. Parentheses are parsed: <code>loves shellfish (shrimp, crab, lobster)</code> picks all three.</p>
      <textarea id="prefs-textarea" rows="13" placeholder="Paste the preference sheet here…&#10;&#10;Example format (the parser recognises this kind of structure):&#10;Guest A: Big appetite. Loves spicy food, sushi, sashimi, shellfish (shrimp, crab, lobster), duck, lamb.&#10;Guest B: No red meat, no duck, no shrimp, no nuts, no citrus sauces.&#10;Child 1: HIGHLY ALLERGIC TO EGGS. No fish.&#10;Crew 1: ALLERGY: seafood. No pork.&#10;Crew 2: Vegetarian." style="width:100%;font-family:'SF Mono',Consolas,monospace;font-size:12px;padding:10px;border:1px solid var(--color-border);background:var(--color-paper);color:var(--color-ink);"></textarea>
      <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11px;color:var(--color-muted);">Everything stays in your browser — no AI server, no upload.</span>
        <span>
          <button class="btn btn-ghost" data-close>Cancel</button>
          <button class="btn btn-primary" id="analyse-prefs">Analyse →</button>
        </span>
      </div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = closeModal;
    m.querySelector("#analyse-prefs").onclick = () => {
      const txt = m.querySelector("#prefs-textarea").value;
      if (!txt.trim()) { alert("Paste a preference sheet first."); return; }
      const analysis = analyzePreferenceSheet(txt);
      openPreferencesPreview(analysis, txt);
    };
    const clr = m.querySelector("#clear-prefs");
    if (clr) clr.onclick = () => {
      state.customProfile = null;
      if (state.profile === "custom") state.profile = "none";
      saveState(); closeModal(); render(); showToast("Custom profile cleared.");
    };
    setTimeout(() => m.querySelector("#prefs-textarea").focus(), 50);
  }

  function analyzePreferenceSheet(text) {
    const result = {
      allergies: [], // [{ term, who, sourceLine }]
      bans: [],
      likes: [],
      dietary: [],
      who: null, // current "person header" we're under
    };
    const splitTerms = s => s.split(/,|\band\b|\bor\b|·|\//gi).map(t => t.trim().replace(/\.$/, "").replace(/[()]/g, "")).filter(t => t && t.length > 2 && t.length < 40);
    const captureFromParens = s => {
      const out = [];
      const re = /\(([^)]+)\)/g;
      let m;
      while ((m = re.exec(s)) !== null) splitTerms(m[1]).forEach(t => out.push(t));
      return out;
    };

    const lines = text.split(/\n/);
    let currentWho = null;
    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line) return;
      // Detect a person header: "Mr Bravo:", "Charlotte:", "Amy (crew):"
      const personMatch = line.match(/^([A-Z][\w'-]+(?:\s+[A-Z][\w'-]+)?(?:\s*\([^)]+\))?)\s*[:\-—]\s*/);
      if (personMatch) currentWho = personMatch[1].trim();

      // ALLERGY
      const allergyRe = /(?:highly\s+|severely?\s+)?allerg(?:ic|y)\s*(?:to)?\s*[:\-]?\s*([^.;\n]+?)(?:[.;\n]|$)/gi;
      let am;
      while ((am = allergyRe.exec(line)) !== null) {
        splitTerms(am[1]).forEach(t => result.allergies.push({ term: t, who: currentWho, sourceLine: line }));
      }

      // BANS
      const banRes = [
        /\b(?:no|avoid|never|without|hides?\s+from)\s+([^.;\n]+?)(?:[.;\n]|$)/gi,
        /\b(?:dislikes?|hates?|doesn'?t\s+(?:like|eat))\s+([^.;\n]+?)(?:[.;\n]|$)/gi,
      ];
      banRes.forEach(re => { let bm; while ((bm = re.exec(line)) !== null) {
        splitTerms(bm[1]).forEach(t => {
          // exclude common stopwords / generic
          if (!/^(cross|substitute|alternative|alt|service|cooking|added|mix|version)/i.test(t)) {
            result.bans.push({ term: t, who: currentWho, sourceLine: line });
          }
        });
      }});

      // LIKES
      const likeRes = [
        /\b(?:loves?|likes?|enjoys?|favou?rite[s]?|big\s+fan\s+of|asks?\s+for)\s+([^.;\n]+?)(?:[.;\n]|$)/gi,
      ];
      likeRes.forEach(re => { let lm; while ((lm = re.exec(line)) !== null) {
        const captured = lm[1];
        splitTerms(captured).forEach(t => result.likes.push({ term: t, who: currentWho, sourceLine: line }));
        captureFromParens(captured).forEach(t => result.likes.push({ term: t, who: currentWho, sourceLine: line }));
      }});

      // DIETARY (single-word flags)
      const dietRe = /\b(vegan|vegetarian|pescatarian|kosher|halal|gluten[\s\-]?free|lactose[\s\-]?free|dairy[\s\-]?free|nut[\s\-]?free)\b/gi;
      let dm;
      while ((dm = dietRe.exec(line)) !== null) {
        result.dietary.push({ term: dm[1].toLowerCase().replace(/\s+/g, "-"), who: currentWho, sourceLine: line });
      }
    });

    // Dedup
    const dedup = arr => {
      const seen = new Set(), out = [];
      arr.forEach(x => {
        const k = (x.term.toLowerCase() + "|" + (x.who || "")).replace(/\s+/g, " ");
        if (!seen.has(k)) { seen.add(k); out.push(x); }
      });
      return out;
    };
    result.allergies = dedup(result.allergies);
    result.bans = dedup(result.bans);
    result.likes = dedup(result.likes);
    result.dietary = dedup(result.dietary);
    return result;
  }

  function openPreferencesPreview(analysis, sourceText) {
    closeModal();
    const sec = (title, list, colorClass, desc) => {
      if (!list.length) return "";
      let h = `<div class="prefs-section ${colorClass}">
        <div class="prefs-section-head"><strong>${title}</strong> · ${list.length} term${list.length===1?"":"s"} <span class="prefs-section-desc">${desc}</span></div>
        <ul class="prefs-list">`;
      list.forEach((x, idx) => {
        const matches = fuzzyMatch(x.term).slice(0, 3);
        const matchHtml = matches.length
          ? `<span class="prefs-matches">${matches.map(m => `<span class="prefs-match" title="${escapeAttr(m.cat.label + ' · ' + m.item.name)}">${escapeHTML(m.item.name)}${m.tier ? " " + "★".repeat(m.tier) : ""}</span>`).join("")}</span>`
          : `<span class="prefs-nomatch">no catalog match</span>`;
        h += `<li>
          <label><input type="checkbox" data-section="${colorClass}" data-idx="${idx}" checked /></label>
          <span class="prefs-term">${escapeHTML(x.term)}</span>
          ${x.who ? `<span class="prefs-who">${escapeHTML(x.who)}</span>` : ""}
          ${matchHtml}
        </li>`;
      });
      h += `</ul></div>`;
      return h;
    };
    let html = `<h2>Preference sheet · review &amp; apply</h2>
      <p style="font-size:13px;color:var(--color-muted);margin-bottom:10px;">${analysis.allergies.length + analysis.bans.length + analysis.likes.length + analysis.dietary.length} terms extracted. Uncheck anything you don't want applied. Click <strong>Apply</strong> to create a custom profile — the order page will highlight matching items in green (love), yellow (avoid), red (allergy).</p>
      <div class="prefs-grid">
        ${sec("🔴 Allergies (severe)", analysis.allergies, "allergy", "Will become BANS — items hidden behind a red flag")}
        ${sec("🟡 Avoid / dislikes", analysis.bans, "ban", "Will become warnings — yellow flag")}
        ${sec("🟢 Loves", analysis.likes, "like", "Will highlight matching items in green and tag with the guest name")}
        ${sec("⚪ Dietary flags", analysis.dietary, "dietary", "Activates the matching profile (vegan/kosher/etc.)")}
      </div>
      <label style="font-size:12px;display:flex;align-items:center;gap:6px;margin-top:10px;"><input type="checkbox" id="apply-likes-to-order" /> Also auto-add liked items to the current order (one match per term)</label>
      <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11px;color:var(--color-muted);">Stored locally · clear anytime from this modal</span>
        <span>
          <button class="btn btn-ghost" data-back>← Back</button>
          <button class="btn btn-primary" id="commit-prefs">Apply preferences →</button>
        </span>
      </div>`;
    const m = openModal(html);
    m.querySelector("[data-back]").onclick = () => openPreferencesModal();
    m.querySelector("#commit-prefs").onclick = () => {
      const include = { allergy: [], ban: [], like: [], dietary: [] };
      m.querySelectorAll('input[data-section]').forEach(cb => {
        if (cb.checked) {
          const sec = cb.dataset.section, idx = +cb.dataset.idx;
          const list = analysis[sec === "allergy" ? "allergies" : sec === "ban" ? "bans" : sec === "like" ? "likes" : "dietary"];
          if (list[idx]) include[sec].push(list[idx]);
        }
      });
      const autoAdd = m.querySelector("#apply-likes-to-order").checked;
      applyPreferences(include, autoAdd, sourceText);
    };
  }

  function applyPreferences(picked, autoAdd, sourceText) {
    // Build a custom profile
    const rules = [];
    picked.allergy.forEach(p => {
      const re = termToRegex(p.term);
      if (re) rules.push({ match: re, severity: "ban", reason: `Allergy: ${p.term}${p.who ? " ("+p.who+")" : ""}` });
    });
    picked.ban.forEach(p => {
      const re = termToRegex(p.term);
      if (re) rules.push({ match: re, severity: "warn", reason: `Avoid: ${p.term}${p.who ? " ("+p.who+")" : ""}` });
    });
    picked.like.forEach(p => {
      const re = termToRegex(p.term);
      if (re) rules.push({ match: re, severity: "like", reason: `Loves: ${p.term}${p.who ? " ("+p.who+")" : ""}` });
    });

    state.customProfile = {
      label: "Custom (preference sheet)",
      rules,
      builtFrom: sourceText.slice(0, 500),
      builtAt: new Date().toISOString(),
    };
    state.profile = "custom";
    // Dietary: switch to the corresponding base profile rules ADDITIVE
    picked.dietary.forEach(d => {
      const tag = d.term;
      let base = null;
      if (/vegan|vegetarian|pescatarian/.test(tag)) base = "vegan-charter";
      else if (/kosher/.test(tag)) base = "kosher";
      else if (/halal/.test(tag)) base = "halal";
      if (base && window.PANTRY_ENRICH.profiles[base]) {
        window.PANTRY_ENRICH.profiles[base].rules.forEach(r => state.customProfile.rules.push({...r, reason: r.reason + " · " + tag}));
      }
    });

    // Auto-add likes
    let addedCount = 0;
    if (autoAdd) {
      picked.like.forEach(p => {
        const matches = fuzzyMatch(p.term);
        if (matches.length) {
          const top = matches[0];
          const ctx = enrichCtx();
          const e = window.PANTRY_ENRICH.enrichItem(top.item, top.cat, top.section, ctx);
          if (e.portion) {
            if (!hasOrder(top.item.id)) {
              setQty(top.item.id, e.portion.qty);
              if (e.portion.unit) setUnit(top.item.id, e.portion.unit);
              addedCount++;
            }
          }
        }
      });
    }

    saveState();
    closeModal();
    render();
    const counts = picked.allergy.length + picked.ban.length + picked.like.length;
    showToast(`Applied ${counts} preferences${addedCount ? ` · auto-added ${addedCount} liked items` : ""}.`);
  }

  function termToRegex(term) {
    if (!term) return null;
    // Strip leading "the" / "a"
    let t = term.toLowerCase().trim().replace(/^(the|a|an)\s+/, "").replace(/\s+/g, "\\s+");
    if (t.length < 3) return null;
    // Escape regex special chars
    t = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${t}`, "i");
  }

  // Wire to "custom" profile in render (so the dropdown can read it)
  function registerCustomProfileInEnrich() {
    if (!window.PANTRY_ENRICH) return;
    if (state.customProfile) {
      window.PANTRY_ENRICH.profiles.custom = state.customProfile;
    } else {
      delete window.PANTRY_ENRICH.profiles.custom;
    }
  }

  // ─── PRINT BY CATEGORY ──────────────────────────────────────────────────
  function openPrintModal() {
    const cats = PANTRY_DATA.map(c => ({ cat: c, stats: categoryStats(c) }));
    const total = cats.reduce((a, c) => a + c.stats.ordered, 0);
    if (total === 0) { alert("Nothing to print — current draft has no items yet."); return; }
    const lang = state.printLang || "en";
    let html = `<h2>Print PDF</h2>
      <p style="font-size:13px;color:var(--color-muted);margin-bottom:10px;">Choose what to print. Each category print uses a clean masthead targeted to that supplier — perfect for sending the fish list to the fishmonger and the meat list to the butcher separately.</p>
      <div class="print-lang-row">
        <span class="print-lang-label">Print language</span>
        <button class="print-lang ${lang === "en" ? "active" : ""}" data-lang="en">🇬🇧 English</button>
        <button class="print-lang ${lang === "fr" ? "active" : ""}" data-lang="fr">🇫🇷 Français</button>
        <button class="print-lang ${lang === "it" ? "active" : ""}" data-lang="it">🇮🇹 Italiano</button>
        <button class="print-lang ${lang === "es" ? "active" : ""}" data-lang="es">🇪🇸 Español</button>
      </div>
      <div class="print-options">
        <button class="print-opt full" data-scope="">
          <span class="print-opt-title">Full order — all categories</span>
          <span class="print-opt-count">${total} items · 1 PDF</span>
        </button>`;
    cats.filter(c => c.stats.ordered > 0).forEach(({ cat, stats }) => {
      html += `<button class="print-opt" data-scope="${cat.id}">
        <span class="print-opt-title">${escapeHTML(cat.label)}</span>
        <span class="print-opt-count">${stats.ordered} item${stats.ordered === 1 ? "" : "s"}</span>
      </button>`;
    });
    html += `</div>
      <p style="font-size:11px;color:var(--color-muted);margin-top:14px;">In the print dialog, choose <strong>Save as PDF</strong> as destination. Translation covers ~200 common food terms — brand names and specific cuts stay in the original.</p>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>Cancel</button></div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = closeModal;
    m.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => {
      state.printLang = b.dataset.lang;
      saveState();
      // Re-render the buttons inside the modal
      m.querySelectorAll("[data-lang]").forEach(x => x.classList.toggle("active", x.dataset.lang === state.printLang));
    });
    m.querySelectorAll(".print-opt").forEach(b => b.onclick = () => {
      const scope = b.dataset.scope;
      closeModal();
      printScope(scope, state.printLang || "en");
    });
  }

  function printScope(scope, lang) {
    lang = lang || "en";
    document.documentElement.setAttribute("data-print-scope", scope || "all");
    document.documentElement.setAttribute("data-print-lang", lang);
    markEmptyForPrint();

    // === Apply language translation to the DOM (will be restored after print) ===
    const restores = [];
    const masthead = $(".print-masthead");
    const i18n = MASTHEAD_I18N[lang] || MASTHEAD_I18N.en;
    const printTitle = $(".print-title");
    if (printTitle) {
      const orig = printTitle.textContent;
      restores.push(() => { printTitle.textContent = orig; });
      let newTitle = i18n.title;
      if (scope && scope !== "all") {
        const cat = findCat(scope);
        if (cat) {
          const catLabel = (CATEGORY_LABELS_I18N[cat.id] && CATEGORY_LABELS_I18N[cat.id][lang]) || cat.label;
          newTitle = `${i18n.title} · ${catLabel}`;
        }
      }
      printTitle.textContent = newTitle;
    }
    // Translate brand tagline + footer
    const tag = $(".print-brand-tag"); if (tag) { const o = tag.textContent; restores.push(() => tag.textContent = o); tag.textContent = i18n.tagline; }
    const footer = $(".print-footer"); if (footer) { const o = footer.innerHTML; restores.push(() => footer.innerHTML = o); footer.innerHTML = i18n.footer; }
    // Translate meta-grid labels
    $$(".print-meta-grid > div").forEach(div => {
      const label = div.querySelector("span"); if (!label) return;
      const key = label.textContent.trim().toLowerCase();
      const map = { "chef": i18n.chef, "order": i18n.order, "date": i18n.date, "supplier": i18n.supplier, "vessel": i18n.vessel, "pax": i18n.pax };
      if (map[key]) {
        const orig = label.textContent;
        restores.push(() => { label.textContent = orig; });
        label.textContent = map[key];
      }
    });

    // Translate category headers + item names + section headers
    if (lang !== "en") {
      $$(".category-header h2").forEach(el => {
        const block = el.closest(".category-block");
        const catId = block?.dataset.cat;
        const trans = catId && CATEGORY_LABELS_I18N[catId] && CATEGORY_LABELS_I18N[catId][lang];
        if (trans) {
          const origHTML = el.innerHTML;
          restores.push(() => { el.innerHTML = origHTML; });
          el.innerHTML = `<span class="chev">▶</span>${escapeHTML(trans)}`;
        }
      });
      $$(".section-header h3").forEach(el => {
        const orig = el.innerHTML;
        // Extract the text node (after chev span)
        const txtNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (!txtNode) return;
        const txt = txtNode.textContent;
        const newText = translateText(txt, lang);
        if (newText !== txt) {
          restores.push(() => { el.innerHTML = orig; });
          txtNode.textContent = newText;
        }
      });
      // Translate each row's name
      $$(".item-list .row .col-name").forEach(el => {
        const txtNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
        if (!txtNode) return;
        const orig = txtNode.textContent;
        const newText = translateText(orig, lang);
        if (newText !== orig) {
          restores.push(() => { txtNode.textContent = orig; });
          txtNode.textContent = newText;
        }
      });
    }

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.documentElement.removeAttribute("data-print-scope");
        document.documentElement.removeAttribute("data-print-lang");
        // Restore all translated nodes
        restores.reverse().forEach(fn => { try { fn(); } catch (e) {} });
      }, 600);
    }, 120);
  }

  // ─── RENDERING ──────────────────────────────────────────────────────────
  // ─── CUSTOM ITEMS ───────────────────────────────────────────────────────
  function effectiveSections(cat) {
    // Returns sections with user-added custom items merged in.
    const sections = cat.sections.map(s => ({ title: s.title, items: s.items.slice() }));
    const customsForCat = Object.values(state.customItems || {}).filter(it => it.cat === cat.id);
    customsForCat.forEach(it => {
      const sectionName = it.section || "Custom additions";
      let sec = sections.find(s => s.title === sectionName);
      if (!sec) { sec = { title: sectionName, items: [] }; sections.push(sec); }
      sec.items.push({
        id: it.id,
        name: it.name,
        brand: it.brand || "",
        tier: it.tier || 0,
        unit: it.unit || "",
        isCustom: true,
      });
    });
    return sections;
  }

  function addCustomItem(catId, section, name, brand, tier, unit) {
    const id = "custom-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
    state.customItems[id] = {
      id, cat: catId,
      section: (section || "").trim() || "Custom additions",
      name: name.trim(),
      brand: (brand || "").trim(),
      tier: parseInt(tier) || 0,
      unit: (unit || "").trim(),
      addedAt: new Date().toISOString(),
    };
    saveState();
    return id;
  }

  function deleteCustomItem(id) {
    if (!state.customItems[id]) return;
    const it = state.customItems[id];
    if (!confirm(`Delete custom item "${it.name}"? Any quantity already in the current draft for this item will also be removed.`)) return;
    // Remove from all drafts' items
    state.drafts.forEach(d => { if (d.items[id]) delete d.items[id]; });
    // Remove from favourites + unit overrides
    delete state.favourites[id];
    delete state.unitOverrides[id];
    delete state.customItems[id];
    saveState(); render();
    showToast(`Removed custom item "${it.name}".`);
  }

  function openAddItemModal(catId) {
    const cat = findCat(catId); if (!cat) return;
    const sectionOptions = cat.sections.map(s => `<option value="${escapeAttr(s.title)}">${escapeHTML(s.title)}</option>`).join("");
    const html = `
      <h2>Add a custom item to ${escapeHTML(cat.label)}</h2>
      <div class="modal-help">
        <strong>What this does</strong>
        <p>Add an item that's not in the catalog — a niche brand, a regional fish, a supplier-specific cut. It gets saved in your browser and behaves like any catalog item: searchable, favouritable, includable in orders, exportable to JSON, printable.</p>
        <p style="margin-bottom:0;"><strong>Tier guide:</strong> ★ staple · ★★ chef's pick (the brand that makes the difference) · ★★★ luxury / hero ingredient. Leave at 0 if not applicable.</p>
      </div>
      <div class="add-item-form">
        <label><span>Item name *</span><input type="text" id="ci-name" placeholder="e.g. Tasmanian ocean trout" autofocus required /></label>
        <label><span>Brand / Spec</span><input type="text" id="ci-brand" placeholder="e.g. Petuna · pin-boned · 180 g portions" /></label>
        <label><span>Section</span>
          <select id="ci-section">
            ${sectionOptions}
            <option value="">— Custom additions (new section) —</option>
            <option value="__OTHER__">— Other (type new name) —</option>
          </select>
        </label>
        <label id="ci-section-other-wrap" style="display:none;"><span>New section name</span><input type="text" id="ci-section-other" placeholder="e.g. Local Tasmanian" /></label>
        <label><span>Tier</span>
          <select id="ci-tier">
            <option value="0">— Untiered —</option>
            <option value="1">★ Staple</option>
            <option value="2">★★ Chef's pick</option>
            <option value="3">★★★ Luxury / hero</option>
          </select>
        </label>
        <label><span>Default unit</span><input type="text" id="ci-unit" placeholder="kg, g, pcs, jar, tin, bunch…" /></label>
      </div>
      <div class="modal-actions" style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:11px;color:var(--color-muted);">Custom items are private to your browser — never uploaded.</span>
        <span>
          <button class="btn btn-ghost" data-close>Cancel</button>
          <button class="btn btn-primary" id="ci-add">Add to ${escapeHTML(cat.label)}</button>
        </span>
      </div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = closeModal;
    const sel = m.querySelector("#ci-section");
    const otherWrap = m.querySelector("#ci-section-other-wrap");
    sel.addEventListener("change", () => {
      otherWrap.style.display = sel.value === "__OTHER__" ? "block" : "none";
    });
    m.querySelector("#ci-add").onclick = () => {
      const name = m.querySelector("#ci-name").value.trim();
      if (!name || name.length < 2) { alert("Item name is required (min 2 chars)."); return; }
      const brand = m.querySelector("#ci-brand").value;
      let section = m.querySelector("#ci-section").value;
      if (section === "__OTHER__") section = m.querySelector("#ci-section-other").value.trim() || "Custom additions";
      const tier = m.querySelector("#ci-tier").value;
      const unit = m.querySelector("#ci-unit").value;
      const id = addCustomItem(catId, section, name, brand, tier, unit);
      closeModal();
      render();
      showToast(`Added "${name}" to ${cat.label}.`);
      // Scroll to the new item, expand category, expand section, highlight
      setTimeout(() => {
        state.ui.openCategories[catId] = true;
        const sectionKey = Object.entries(effectiveSections(cat)).find(([_, s]) => s.title === (section || "Custom additions"));
        render();
        const row = document.querySelector(`.row[data-id="${id}"]`);
        if (row) {
          row.scrollIntoView({ behavior: "smooth", block: "center" });
          row.classList.add("just-added");
          setTimeout(() => row.classList.remove("just-added"), 2000);
        }
      }, 80);
    };
    setTimeout(() => m.querySelector("#ci-name").focus(), 50);
  }

  // ─── STATS ──────────────────────────────────────────────────────────────
  function categoryStats(cat) {
    let total = 0, ordered = 0;
    effectiveSections(cat).forEach(s => s.items.forEach(it => { total++; if (hasOrder(it.id)) ordered++; }));
    return { total, ordered };
  }
  function sectionStats(sec) {
    let ordered = 0;
    sec.items.forEach(it => { if (hasOrder(it.id)) ordered++; });
    return { total: sec.items.length, ordered };
  }
  function groupStats(group) {
    let ordered = 0;
    group.cats.forEach(cid => { const c = findCat(cid); if (c) ordered += categoryStats(c).ordered; });
    return { ordered };
  }

  function passFilter(item, enrichResult) {
    const ui = state.ui;
    if (ui.tierFilter > 0 && item.tier < ui.tierFilter) return false;
    if (ui.showOnlyOrdered && !hasOrder(item.id)) return false;
    if (ui.search) {
      const q = ui.search.toLowerCase();
      const hay = (item.name + " " + (item.brand || "")).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (state.hiddenAllergens.length) {
      const tags = enrichResult.allergens;
      if (state.hiddenAllergens.some(a => tags.includes(a))) return false;
    }
    return true;
  }

  function escapeHTML(s) {
    return String(s == null ? "" : s)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  }
  function escapeAttr(s) { return escapeHTML(s); }
  function cssEscape(s) {
    if (window.CSS && CSS.escape) return CSS.escape(s);
    return String(s).replace(/[^a-zA-Z0-9_-]/g, m => "\\" + m);
  }

  // ----- Sidebar -----
  function renderSidebar() {
    const aside = $("aside.sidebar"); if (!aside) return;
    let html = "";
    const allActive = state.ui.activeCategory === null;
    html += `<div class="cat-show-all ${allActive ? "active" : ""}" data-show-all>Show all categories</div>`;
    GROUPS.forEach(g => {
      const open = !!state.ui.openGroups[g.id];
      const gs = groupStats(g);
      html += `<div class="group ${open ? "open" : ""}" data-group="${g.id}">
        <div class="group-header" data-group-toggle="${g.id}">
          <span class="chev">▶</span>
          <span class="group-header-label">${escapeHTML(g.label)}</span>
          <span class="group-header-count ${gs.ordered === 0 ? "zero" : ""}">${gs.ordered}</span>
        </div>
        <div class="group-children">`;
      g.cats.forEach(cid => {
        const c = findCat(cid); if (!c) return;
        const cs = categoryStats(c);
        const active = state.ui.activeCategory === cid;
        const has = cs.ordered > 0;
        html += `<div class="cat-item ${active ? "active" : ""} ${has ? "has-orders" : ""}" data-cat="${cid}">
          <span>${escapeHTML(c.label)}</span>
          <span class="count">${cs.ordered}/${cs.total}</span>
        </div>`;
      });
      html += `</div></div>`;
    });
    html += `<div class="sidebar-global">
      <button data-action="upload-list" class="action-accent">+ Add list / paste</button>
      <button data-action="upload-prefs" class="action-accent">+ Add preferences (AI)</button>
      <button data-action="archive-list">Archives (${state.history.length})</button>
      <button data-action="export">Export JSON</button>
      <button data-action="import">Import JSON</button>
      <button data-action="copy-text">Copy as text</button>
      <button data-action="shortcuts">Keyboard shortcuts ?</button>
      <button data-action="clear" class="action-danger">Clear…</button>
      <button data-action="about">About this tool</button>
      <a class="sidebar-back-home" href="/" title="Back to Littoralicious">← littoralicious.com</a>
    </div>`;
    aside.innerHTML = html;

    aside.querySelectorAll("[data-group-toggle]").forEach(el => el.addEventListener("click", () => {
      const gid = el.dataset.groupToggle;
      state.ui.openGroups[gid] = !state.ui.openGroups[gid];
      saveState(); renderSidebar();
    }));
    aside.querySelectorAll(".cat-item").forEach(el => el.addEventListener("click", () => {
      state.ui.activeCategory = el.dataset.cat;
      state.ui.openCategories[el.dataset.cat] = true;
      saveState(); render();
    }));
    aside.querySelector("[data-show-all]").addEventListener("click", () => {
      state.ui.activeCategory = null; saveState(); render();
    });
    aside.querySelector('[data-action="upload-list"]').onclick = openUploadListModal;
    aside.querySelector('[data-action="upload-prefs"]').onclick = openPreferencesModal;
    aside.querySelector('[data-action="archive-list"]').onclick = renderHistoryModal;
    aside.querySelector('[data-action="export"]').onclick = exportJSON;
    aside.querySelector('[data-action="import"]').onclick = importJSON;
    aside.querySelector('[data-action="copy-text"]').onclick = exportPlainText;
    aside.querySelector('[data-action="shortcuts"]').onclick = openShortcutsModal;
    aside.querySelector('[data-action="clear"]').onclick = openClearModal;
    aside.querySelector('[data-action="about"]').onclick = openAboutModal;
  }
  function updateSidebarCounts() {
    GROUPS.forEach(g => {
      const groupEl = $(`.group[data-group="${g.id}"] .group-header-count`);
      if (groupEl) {
        const gs = groupStats(g);
        groupEl.textContent = gs.ordered;
        groupEl.classList.toggle("zero", gs.ordered === 0);
      }
      g.cats.forEach(cid => {
        const c = findCat(cid); const el = $(`.cat-item[data-cat="${cid}"]`);
        if (el && c) {
          const cs = categoryStats(c);
          el.querySelector(".count").textContent = `${cs.ordered}/${cs.total}`;
          el.classList.toggle("has-orders", cs.ordered > 0);
        }
      });
    });
  }

  // ----- Header (drafts + PAX + profile) -----
  function renderProvisioningBar() {
    const bar = $(".prov-bar"); if (!bar) return;
    const draftOpts = state.drafts.map(d =>
      `<option value="${d.id}" ${d.id === state.activeDraftId ? "selected" : ""}>${escapeHTML(d.name)} · ${Object.keys(d.items).length} items</option>`
    ).join("");
    const profOpts = Object.entries(window.PANTRY_ENRICH.profiles).map(([k, p]) =>
      `<option value="${k}" ${state.profile === k ? "selected" : ""}>${escapeHTML(p.label)}</option>`
    ).join("");
    const portOpts = (window.PANTRY_ENRICH.ports || []).map(p =>
      `<option value="${p.id}" ${state.port === p.id ? "selected" : ""}>${escapeHTML((p.flag ? p.flag + " " : "") + p.label)}</option>`
    ).join("");
    const allergenChips = ALLERGEN_LIST.map(a =>
      `<button class="allergen-chip ${state.hiddenAllergens.includes(a) ? "hidden-on" : ""}" data-allergen="${a}" title="Click to hide all ${a}-containing items">${a}</button>`
    ).join("");
    bar.innerHTML = `
      <div class="prov-row prov-row-drafts">
        <label class="prov-label">Draft</label>
        <select id="draft-select" class="prov-select" title="Switch between named drafts">${draftOpts}</select>
        <button class="btn-mini" id="draft-new" title="New draft (n)">+ New</button>
        <button class="btn-mini" id="draft-rename" title="Rename current draft">Rename</button>
        <button class="btn-mini danger" id="draft-delete" title="Delete current draft">×</button>
        <span class="prov-sep"></span>
        <label class="prov-label">PAX</label>
        <input id="pax-guest" class="prov-input" type="number" min="0" value="${escapeAttr(state.pax.guest)}" title="Guests" placeholder="guest" />
        <span class="prov-plus">+</span>
        <input id="pax-crew" class="prov-input" type="number" min="0" value="${escapeAttr(state.pax.crew)}" title="Crew" placeholder="crew" />
        <span class="prov-x">×</span>
        <input id="pax-days" class="prov-input" type="number" min="1" value="${escapeAttr(state.pax.days)}" title="Days" placeholder="days" />
        <button class="btn-mini accent" id="apply-portions" title="Suggest quantities based on PAX × days (only fills empty rows)">Suggest qty</button>
        <span class="prov-sep"></span>
        <label class="prov-label">Profile</label>
        <select id="profile-select" class="prov-select">${profOpts}</select>
      </div>
      <div class="prov-row prov-row-port">
        <label class="prov-label">Port</label>
        <select id="port-select" class="prov-select" title="Pick the destination — local hero items get highlighted">${portOpts}</select>
        <span class="prov-spacer"></span>
        <span class="prov-label">Hide allergens</span>
        <div class="allergen-chips">${allergenChips}</div>
        <span class="prov-tip">Current month: <strong>${monthName(currentMonth())}</strong></span>
      </div>`;
    $("#draft-select").addEventListener("change", e => setActiveDraft(e.target.value));
    $("#draft-new").onclick = newDraft;
    $("#draft-rename").onclick = renameDraft;
    $("#draft-delete").onclick = deleteDraft;
    $("#pax-guest").addEventListener("input", e => { state.pax.guest = e.target.value; saveState(); });
    $("#pax-crew").addEventListener("input", e => { state.pax.crew = e.target.value; saveState(); });
    $("#pax-days").addEventListener("input", e => { state.pax.days = e.target.value; saveState(); });
    $("#apply-portions").onclick = applyPortionSuggestions;
    $("#profile-select").addEventListener("change", e => { state.profile = e.target.value; saveState(); renderMain(); });
    $("#port-select").addEventListener("change", e => { state.port = e.target.value; saveState(); renderMain(); });
    bar.querySelectorAll("[data-allergen]").forEach(b => b.addEventListener("click", () => {
      const a = b.dataset.allergen;
      if (state.hiddenAllergens.includes(a)) state.hiddenAllergens = state.hiddenAllergens.filter(x => x !== a);
      else state.hiddenAllergens.push(a);
      saveState(); renderMain();
    }));
  }

  function monthName(m) {
    return ["—","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m] || "—";
  }

  // ----- Toolbar -----
  function renderToolbar() {
    const ui = state.ui;
    return `<div class="toolbar">
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input class="search" type="text" placeholder="Search by item or brand…  (/ to focus)" value="${escapeAttr(ui.search)}" />
        ${ui.search ? `<button class="search-clear" title="Clear search">×</button>` : ""}
      </div>
      <div class="tier-filter">
        <button data-tier="0" class="${ui.tierFilter === 0 ? "active" : ""}">All</button>
        <button data-tier="1" class="${ui.tierFilter === 1 ? "active" : ""}">★+</button>
        <button data-tier="2" class="${ui.tierFilter === 2 ? "active" : ""}">★★+</button>
        <button data-tier="3" class="${ui.tierFilter === 3 ? "active" : ""}">★★★</button>
      </div>
      <button class="help-icon" data-help="tier" title="What do the tiers mean?">?</button>
      <label class="show-toggle">
        <input type="checkbox" id="only-ordered" ${ui.showOnlyOrdered ? "checked" : ""} />
        Only ordered
      </label>
    </div>`;
  }

  // ----- Item rendering -----
  function rankItems(items, cat, sec) {
    const freq = frequencyMap();
    const ctx = enrichCtx();
    const enriched = items.map(it => ({ item: it, e: window.PANTRY_ENRICH.enrichItem(it, cat, sec, ctx) }));
    const passing = enriched.filter(({ item, e }) => passFilter(item, e));
    const favs = passing.filter(({ item }) => isFav(item.id));
    const rest = passing.filter(({ item }) => !isFav(item.id));
    const portActive = state.port && state.port !== "none";
    const isLocal = (it) => portActive && window.PANTRY_ENRICH.itemMatchesPort && window.PANTRY_ENRICH.itemMatchesPort(it, state.port);
    const sorter = (a, b) => {
      const la = isLocal(a.item) ? 1 : 0, lb = isLocal(b.item) ? 1 : 0;
      if (la !== lb) return lb - la;
      const fa = freq[a.item.id] || 0, fb = freq[b.item.id] || 0;
      if (fa !== fb) return fb - fa;
      if (b.item.tier !== a.item.tier) return b.item.tier - a.item.tier;
      return a.item.name.localeCompare(b.item.name);
    };
    favs.sort(sorter); rest.sort(sorter);
    // Split rest into mainstream (★, ★★, untiered, items with orders or favs) vs specialty (★★★)
    const mainstream = rest.filter(p => p.item.tier < 3 || hasOrder(p.item.id));
    const specialty = rest.filter(p => p.item.tier === 3 && !hasOrder(p.item.id));
    return { favs, mainstream, specialty, freq };
  }

  function rowHTML({ item, e }, freq) {
    const entry = getItem(item.id) || {};
    const fav = isFav(item.id);
    const stars = item.tier > 0 ? "★".repeat(item.tier) : "";
    const qty = entry.qty || "";
    const notes = entry.notes || "";
    const ordered = qty && String(qty).trim() ? "has-qty" : "";
    const unit = effectiveUnit(item);
    const f = freq[item.id] || 0;
    let badges = "";
    if (e.season) {
      const cls = e.season.inPeak ? "in-peak" : "off-season";
      badges += `<span class="badge season ${cls}" title="${escapeAttr(e.season.label)} (${e.season.inPeak ? "in season now" : "OUT of season"})">${e.season.inPeak ? "◉" : "◯"}</span>`;
    }
    if (e.portion) {
      const roleLetter = e.portion.role === "guest" ? "G" : e.portion.role === "crew" ? "C" : "A";
      const roleClass  = "role-" + (e.portion.role || "all");
      badges += `<span class="badge portion ${roleClass}" title="${escapeAttr(e.portion.note)}&#10;${escapeAttr(e.portion.math || "")}&#10;Suggested: ${e.portion.qty} ${e.portion.unit}">⚖${roleLetter}</span>`;
    }
    if (e.allergens.length) {
      const allergList = e.allergens.join(", ");
      badges += `<span class="badge allergen" title="Allergen tags: ${escapeAttr(allergList)}">${e.allergens.map(a => a[0].toUpperCase()).join("")}</span>`;
    }
    if (state.port && state.port !== "none" && window.PANTRY_ENRICH.itemMatchesPort && window.PANTRY_ENRICH.itemMatchesPort(item, state.port)) {
      const portObj = window.PANTRY_ENRICH.activePort(state.port);
      badges += `<span class="badge port" title="Local hero at ${escapeAttr(portObj.label)}">${portObj.flag || "📍"}</span>`;
    }
    let profileBadge = "";
    if (e.profileFlag) {
      const sev = e.profileFlag.severity;
      const icon = sev === "ban" ? "⊘" : sev === "warn" ? "⚠" : sev === "like" ? "♥" : "•";
      profileBadge = `<span class="profile-flag ${sev}" title="${escapeAttr(e.profileFlag.reason)}">${icon}</span>`;
    }
    const customBadge = item.isCustom ? ` <span class="custom-badge" title="Custom item — added by you">+ custom</span>` : "";
    const customDelete = item.isCustom ? ` <button class="custom-delete" data-delete-custom="${item.id}" title="Delete this custom item">×</button>` : "";
    const luxuryMark = item.tier === 3 ? ' <span class="luxury-mark" title="★★★ Specialty / luxury">★★★</span>' : "";
    return `
      <div class="row ${ordered} ${fav ? "fav" : ""} ${e.profileFlag ? "flag-" + e.profileFlag.severity : ""} ${item.isCustom ? "is-custom" : ""}" data-id="${item.id}">
        <div class="col-fav" data-fav="${item.id}" title="${fav ? "Remove favourite" : "Mark as favourite"}">${fav ? "★" : "☆"}</div>
        <div class="col-name">${escapeHTML(item.name)}${luxuryMark}${customBadge} ${profileBadge}${f >= 3 ? ` <span class="freq-marker-inline" title="Used ${f} times">↻${f}</span>` : ""}${customDelete}</div>
        <div class="col-brand">${escapeHTML(item.brand || "")} ${badges}</div>
        <div class="col-qty-cell">
          <button class="qty-step minus" data-step="${item.id}" data-delta="-1" title="− ${naturalStep(unit)} ${escapeHTML(unit || '')}">−</button>
          <input type="text" data-qty="${item.id}" value="${escapeAttr(qty)}" placeholder="—" inputmode="decimal" />
          <button class="qty-step plus" data-step="${item.id}" data-delta="1" title="+ ${naturalStep(unit)} ${escapeHTML(unit || '')}">+</button>
        </div>
        <div class="col-unit"><input type="text" data-unit="${item.id}" value="${escapeAttr(unit)}" placeholder="unit" /></div>
        <div class="col-notes"><input type="text" data-notes="${item.id}" value="${escapeAttr(notes)}" placeholder="+ note" /></div>
      </div>`;
  }

  function tableHeadHTML() {
    return `
      <div class="head center">★</div>
      <div class="head">Item</div>
      <div class="head">Brand · Spec</div>
      <div class="head center">Qty</div>
      <div class="head center">Unit</div>
      <div class="head">Notes</div>
    `;
  }

  function sectionHTML(cat, sec, sIndex) {
    const key = cat.id + "::" + sIndex;
    const open = state.ui.openSections[key] !== false;
    const ranked = rankItems(sec.items, cat, sec);
    const totalItems = ranked.favs.length + ranked.mainstream.length + ranked.specialty.length;
    if (totalItems === 0) return "";
    const stats = sectionStats(sec);
    // Hide specialty by default ONLY if there are enough mainstream items to justify it
    const collapseSpecialty = ranked.specialty.length > 0 && (ranked.favs.length + ranked.mainstream.length) >= 3;
    const specialtyKey = key + "::specialty";
    const specialtyOpen = !!state.ui.openSpecialty?.[specialtyKey];

    let html = `<div class="section ${open ? "open" : ""}" data-cat="${cat.id}" data-sec-idx="${sIndex}" data-section-key="${escapeAttr(key)}">
      <div class="section-header" data-section-toggle="${escapeAttr(key)}">
        <h3><span class="chev">▶</span>${escapeHTML(sec.title)}</h3>
        <span class="section-header-tools">
          <button type="button" class="btn-pax-section" data-fill-section="${cat.id}|${sIndex}" title="Auto-fill quantities in this section using current PAX (guest + crew + days)">⚡ PAX</button>
          <span class="section-stats">${stats.ordered}/${stats.total}</span>
        </span>
      </div>
      <div class="section-body"><div class="item-list">`;
    html += tableHeadHTML();
    if (ranked.favs.length) {
      html += `<div class="fav-marker">★ Favourites</div>`;
      ranked.favs.forEach(p => html += rowHTML(p, ranked.freq));
    }
    const hasFreq = ranked.mainstream.some(p => (ranked.freq[p.item.id] || 0) > 0);
    if (ranked.favs.length && ranked.mainstream.length && hasFreq) {
      html += `<div class="freq-marker">Most used first</div>`;
    }
    ranked.mainstream.forEach(p => html += rowHTML(p, ranked.freq));
    // Specialty (★★★) — collapsed by default
    if (ranked.specialty.length > 0) {
      if (collapseSpecialty && !specialtyOpen) {
        html += `<div class="specialty-toggle" data-specialty-toggle="${escapeAttr(specialtyKey)}">
          <button type="button">+ Show ${ranked.specialty.length} specialty / luxury item${ranked.specialty.length === 1 ? "" : "s"} (★★★)</button>
        </div>`;
      } else {
        html += `<div class="specialty-marker">★★★ Specialty / luxury · ${ranked.specialty.length} item${ranked.specialty.length === 1 ? "" : "s"}${collapseSpecialty ? ` <button class="specialty-collapse" data-specialty-toggle="${escapeAttr(specialtyKey)}">hide</button>` : ""}</div>`;
        ranked.specialty.forEach(p => html += rowHTML(p, ranked.freq));
      }
    }
    html += `</div></div></div>`;
    return html;
  }

  function categoryHTML(cat) {
    const stats = categoryStats(cat);
    const isActive = state.ui.activeCategory === cat.id;
    const userOpen = state.ui.openCategories[cat.id];
    const open = isActive || (state.ui.activeCategory === null && userOpen === true);
    const printEmpty = stats.ordered === 0 ? "empty-print" : "";
    const effSecs = effectiveSections(cat);
    const sectionsHTML = effSecs.map((s, i) => sectionHTML(cat, s, i)).join("");
    if (!sectionsHTML.trim()) return "";
    const hasOrders = stats.ordered > 0;
    const customCount = Object.values(state.customItems || {}).filter(it => it.cat === cat.id).length;
    return `<div class="category-block ${open ? "open" : ""} ${printEmpty}" data-cat="${cat.id}">
      <div class="category-header" data-category-toggle="${cat.id}">
        <h2><span class="chev">▶</span>${escapeHTML(cat.label)}</h2>
        <div class="category-header-right">
          <span class="cat-stats">${stats.ordered} / ${stats.total} ordered${customCount ? ` · ${customCount} custom` : ""}</span>
          <button class="category-header-add" data-add-item="${cat.id}" title="Add a custom item to ${escapeHTML(cat.label)}">+ Add item</button>
          <button class="category-header-clear" data-clear-cat="${cat.id}" ${hasOrders ? "" : "disabled"} title="${hasOrders ? `Clear all quantities in ${escapeHTML(cat.label)}` : "Nothing to clear"}">Clear</button>
        </div>
      </div>
      <div class="category-body">
        ${sectionsHTML}
        <div class="category-footer">
          <div class="footer-summary">${escapeHTML(cat.label)} · <strong>${stats.ordered}</strong> ordered of ${stats.total} catalogued${customCount ? ` · ${customCount} custom` : ""}</div>
          <div class="footer-actions">
            <button class="btn-mini btn-mini-accent" data-add-item="${cat.id}" title="Add a custom item to this category — items not in the catalog">+ Add item</button>
            <button class="btn-mini btn-mini-pax" data-fill-cat="${cat.id}" title="Auto-fill quantities for the whole category using current PAX (guest + crew + days)">⚡ Fill ${escapeHTML(cat.label)} by PAX</button>
            <button class="btn-mini ${hasOrders ? "" : "btn-disabled"}" data-print-cat="${cat.id}" ${hasOrders ? "" : "disabled"} title="Print only this category as its own PDF">Print ${escapeHTML(cat.label)} only</button>
            <button class="btn-mini ${hasOrders ? "" : "btn-disabled"}" data-archive-cat="${cat.id}" ${hasOrders ? "" : "disabled"} title="Save just this category as a snapshot to Archives">Archive ${escapeHTML(cat.label)}</button>
            <button class="btn-mini" data-copy-cat="${cat.id}" ${hasOrders ? "" : "disabled"} title="Copy this category as plain text">Copy text</button>
            <button class="btn-mini btn-mini-danger" data-clear-cat="${cat.id}" ${hasOrders ? "" : "disabled"} title="Clear all quantities in this category — keeps favourites and unit overrides">Clear ${escapeHTML(cat.label)}</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  function renderPrintMasthead() {
    const d = activeDraft();
    return `
      <div class="print-masthead">
        <div class="print-brand-line">L · I · T · T · O · R · A · L · I · C · I · O · U · S</div>
        <div class="print-brand-tag">Free, open provisioning · From the publication that nurtures the chef</div>
        <h1 class="print-title">Galley Order</h1>
        <div class="print-meta-grid">
          <div><span>Chef</span><strong>Arnaud Callier</strong></div>
          <div><span>Order</span><strong>${escapeHTML(d.name)}</strong></div>
          <div><span>Date</span><strong>${escapeHTML(d.date || "")}</strong></div>
          ${d.supplier ? `<div><span>Supplier</span><strong>${escapeHTML(d.supplier)}</strong></div>` : ""}
          ${d.vessel ? `<div><span>Vessel</span><strong>${escapeHTML(d.vessel)}</strong></div>` : ""}
          ${(state.pax.guest || state.pax.crew) ? `<div><span>PAX</span><strong>${escapeHTML(state.pax.guest)} guest + ${escapeHTML(state.pax.crew)} crew · ${escapeHTML(state.pax.days)} days</strong></div>` : ""}
        </div>
      </div>`;
  }
  function renderPrintFooter() {
    return `<div class="print-footer">
      Generated by Littoralicious Galley Order · <strong>littoralicious.com/galleyorder</strong> · Free · Open · Yours.
    </div>`;
  }

  function renderPortPanel() {
    if (!window.PANTRY_ENRICH || !window.PANTRY_ENRICH.activePort) return "";
    const port = window.PANTRY_ENRICH.activePort(state.port);
    if (!port || port.id === "none") return "";
    const handpickedHTML = (port.handpicked || []).map(h =>
      `<div class="port-card"><div class="port-card-name">${escapeHTML(h.name)}</div><div class="port-card-note">${escapeHTML(h.note)}</div></div>`
    ).join("");
    return `<div class="port-panel">
      <div class="port-panel-head">
        <span class="port-flag">${port.flag || "📍"}</span>
        <div>
          <div class="port-title">${escapeHTML(port.label)}</div>
          <div class="port-blurb">${escapeHTML(port.blurb || "")}</div>
        </div>
        <button class="port-close" data-port-clear title="Clear port selection">×</button>
      </div>
      ${port.tips ? `<div class="port-tips">${escapeHTML(port.tips)}</div>` : ""}
      ${handpickedHTML ? `<div class="port-cards">${handpickedHTML}</div>` : ""}
    </div>`;
  }

  function renderMain() {
    const main = $("main.main"); if (!main) return;
    let html = "";
    html += renderPrintMasthead();
    html += renderToolbar();
    html += renderPortPanel();
    const cats = state.ui.activeCategory ? PANTRY_DATA.filter(c => c.id === state.ui.activeCategory) : PANTRY_DATA;
    let any = false;
    cats.forEach(c => { const block = categoryHTML(c); if (block) { html += block; any = true; } });
    if (!any) html += `<div class="empty-state">No items match this search or filter.</div>`;
    html += renderPrintFooter();
    main.innerHTML = html;
    wireMain();
    markEmptyForPrint();
    // Wire port-clear
    const pc = main.querySelector("[data-port-clear]");
    if (pc) pc.onclick = () => { state.port = "none"; saveState(); renderMain(); };
  }

  function wireMain() {
    const main = $("main.main"); if (!main) return;
    const s = main.querySelector(".search");
    if (s) s.addEventListener("input", e => { state.ui.search = e.target.value; saveState(); debouncedRenderMain(); });
    main.querySelectorAll(".tier-filter button").forEach(b => b.addEventListener("click", () => {
      state.ui.tierFilter = Number(b.dataset.tier); saveState(); renderMain();
    }));
    const oo = main.querySelector("#only-ordered");
    if (oo) oo.addEventListener("change", e => { state.ui.showOnlyOrdered = e.target.checked; saveState(); renderMain(); });
    main.querySelectorAll("[data-fav]").forEach(el => el.addEventListener("click", () => toggleFav(el.dataset.fav)));
    main.querySelectorAll("[data-qty]").forEach(el => el.addEventListener("input", e => setQty(el.dataset.qty, e.target.value)));
    main.querySelectorAll("[data-notes]").forEach(el => el.addEventListener("input", e => setNotes(el.dataset.notes, e.target.value)));
    main.querySelectorAll("[data-unit]").forEach(el => el.addEventListener("input", e => setUnit(el.dataset.unit, e.target.value)));
    main.querySelectorAll("[data-step]").forEach(el => el.addEventListener("click", () => stepQty(el.dataset.step, parseFloat(el.dataset.delta))));
    main.querySelectorAll("[data-mul]").forEach(el => el.addEventListener("click", () => mulQty(el.dataset.mul, parseFloat(el.dataset.factor))));
    main.querySelectorAll("[data-category-toggle]").forEach(el => el.addEventListener("click", () => {
      const cid = el.dataset.categoryToggle;
      const blk = main.querySelector(`.category-block[data-cat="${cid}"]`);
      const isOpen = blk.classList.contains("open");
      state.ui.openCategories[cid] = !isOpen;
      blk.classList.toggle("open"); saveState();
    }));
    main.querySelectorAll("[data-section-toggle]").forEach(el => el.addEventListener("click", () => {
      const k = el.dataset.sectionToggle;
      const sec = main.querySelector(`.section[data-section-key="${cssEscape(k)}"]`);
      if (!sec) return;
      const isOpen = sec.classList.contains("open");
      state.ui.openSections[k] = !isOpen;
      sec.classList.toggle("open"); saveState();
    }));
    main.querySelectorAll("[data-specialty-toggle]").forEach(el => el.addEventListener("click", e => {
      e.stopPropagation();
      const k = el.dataset.specialtyToggle;
      if (!state.ui.openSpecialty) state.ui.openSpecialty = {};
      state.ui.openSpecialty[k] = !state.ui.openSpecialty[k];
      saveState(); renderMain();
    }));
    main.querySelectorAll("[data-help]").forEach(el => el.addEventListener("click", e => {
      e.stopPropagation(); openHelpModal(el.dataset.help);
    }));
    // Per-category footer actions
    main.querySelectorAll("[data-print-cat]").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); printScope(el.dataset.printCat); }));
    main.querySelectorAll("[data-archive-cat]").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); archiveCategory(el.dataset.archiveCat); }));
    main.querySelectorAll("[data-copy-cat]").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); copyCategoryText(el.dataset.copyCat); }));
    main.querySelectorAll("[data-clear-cat]").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); clearCategory(el.dataset.clearCat); }));
    main.querySelectorAll("[data-fill-section]").forEach(el => el.addEventListener("click", e => {
      e.stopPropagation();
      const [catId, sIdx] = el.dataset.fillSection.split("|");
      applyPortionsForSection(catId, parseInt(sIdx, 10), false);
    }));
    main.querySelectorAll("[data-fill-cat]").forEach(el => el.addEventListener("click", e => {
      e.stopPropagation();
      applyPortionsForCategory(el.dataset.fillCat, false);
    }));
    main.querySelectorAll("[data-add-item]").forEach(el => el.addEventListener("click", e => { e.stopPropagation(); openAddItemModal(el.dataset.addItem); }));
    main.querySelectorAll("[data-delete-custom]").forEach(el => el.addEventListener("click", e => {
      e.stopPropagation(); deleteCustomItem(el.dataset.deleteCustom);
    }));
    // Clear-search × button
    const clrSearch = main.querySelector(".search-clear");
    if (clrSearch) clrSearch.onclick = () => { state.ui.search = ""; saveState(); renderMain(); };
  }

  // ─── CLEAR ACTIONS ──────────────────────────────────────────────────────
  function clearCategory(catId) {
    const cat = findCat(catId); if (!cat) return;
    const d = activeDraft();
    const idsWithQty = [];
    effectiveSections(cat).forEach(s => s.items.forEach(it => { if (hasOrder(it.id)) idsWithQty.push(it.id); }));
    if (idsWithQty.length === 0) return;
    if (!confirm(`Clear all ${idsWithQty.length} quantities in ${cat.label}? Favourites and unit overrides are kept. Notes on these items are also removed.`)) return;
    idsWithQty.forEach(id => delete d.items[id]);
    saveState(); render(); showToast(`Cleared ${idsWithQty.length} items from ${cat.label}.`);
  }
  function clearDraftQuantities() {
    const d = activeDraft();
    const count = Object.keys(d.items).length;
    if (count === 0) { alert("Nothing to clear — current draft is already empty."); return; }
    if (!confirm(`Clear all ${count} items in "${d.name}"? Favourites and unit overrides kept. Archives are NOT affected.`)) return;
    d.items = {};
    saveState(); render(); showToast(`Cleared ${count} items.`);
  }
  function clearFiltersAndSearch() {
    state.ui.search = "";
    state.ui.tierFilter = 0;
    state.ui.showOnlyOrdered = false;
    state.hiddenAllergens = [];
    saveState(); renderProvisioningBar(); renderMain();
    showToast("Filters & search cleared.");
  }
  function clearFavourites() {
    const count = Object.keys(state.favourites).length;
    if (count === 0) { alert("No favourites to clear."); return; }
    if (!confirm(`Remove all ${count} favourites? They'll no longer be pinned to the top of sections.`)) return;
    state.favourites = {};
    saveState(); render(); showToast(`Cleared ${count} favourites.`);
  }
  function clearPax() {
    state.pax = { guest: 0, crew: 0, days: 7 };
    saveState(); renderProvisioningBar(); renderMain();
    showToast("PAX reset.");
  }
  function clearCustomProfile() {
    if (!state.customProfile) { alert("No custom profile to clear."); return; }
    if (!confirm("Clear the custom guest preferences profile?")) return;
    state.customProfile = null;
    if (state.profile === "custom") state.profile = "none";
    saveState(); render();
    showToast("Custom profile cleared.");
  }
  function clearHistory() {
    const count = state.history.length;
    if (count === 0) { alert("Archives are already empty."); return; }
    if (!confirm(`Delete ALL ${count} archived orders? This cannot be undone.`)) return;
    state.history = [];
    saveState(); render(); showToast(`Deleted ${count} archives.`);
  }
  function resetEverything() {
    if (!confirm("Reset EVERYTHING? This wipes drafts, archives, favourites, unit overrides, custom profile, PAX, filters — every byte stored in this browser. There is no undo. Click OK to proceed.")) return;
    if (!confirm("This will wipe everything. Are you 100% sure?")) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_KEY);
    location.reload();
  }

  function openClearModal() {
    const d = activeDraft();
    const draftCount = Object.values(d.items).filter(e => e.qty && String(e.qty).trim()).length;
    const favCount = Object.keys(state.favourites).length;
    const histCount = state.history.length;
    const hasCustom = !!state.customProfile;
    const html = `
      <h2>Clear…</h2>
      <p style="font-size:13px;color:var(--color-muted);">Pick what to clear. Nothing is touched until you click a button. Archives and exports are unaffected by everything except the dedicated archive clear.</p>
      <div class="clear-grid">
        <button class="clear-opt" id="clear-draft" ${draftCount === 0 ? "disabled" : ""}>
          <span class="clear-opt-title">Clear current draft</span>
          <span class="clear-opt-desc">Zero all quantities in "${escapeHTML(d.name)}" · ${draftCount} items · keeps favourites + units</span>
        </button>
        <button class="clear-opt" id="clear-filters">
          <span class="clear-opt-title">Clear filters &amp; search</span>
          <span class="clear-opt-desc">Reset search bar, tier filter, "only ordered", hidden allergens</span>
        </button>
        <button class="clear-opt" id="clear-pax">
          <span class="clear-opt-title">Clear PAX / days</span>
          <span class="clear-opt-desc">Reset to 0 guest + 0 crew · 7 days</span>
        </button>
        <button class="clear-opt" id="clear-favourites" ${favCount === 0 ? "disabled" : ""}>
          <span class="clear-opt-title">Clear favourites</span>
          <span class="clear-opt-desc">Remove all ${favCount} stars · catalog returns to default order</span>
        </button>
        <button class="clear-opt" id="clear-profile" ${hasCustom ? "" : "disabled"}>
          <span class="clear-opt-title">Clear guest preferences profile</span>
          <span class="clear-opt-desc">${hasCustom ? "Removes the custom profile and its highlights" : "No custom profile loaded"}</span>
        </button>
        <button class="clear-opt clear-opt-danger" id="clear-history" ${histCount === 0 ? "disabled" : ""}>
          <span class="clear-opt-title">Delete all archives</span>
          <span class="clear-opt-desc">${histCount} archived orders · cannot be undone</span>
        </button>
        <button class="clear-opt clear-opt-danger" id="reset-all">
          <span class="clear-opt-title">⚠ Reset everything</span>
          <span class="clear-opt-desc">Wipe all local data — drafts, archives, favourites, units, profile. Page reloads fresh.</span>
        </button>
      </div>
      <div class="modal-actions"><button class="btn btn-ghost" data-close>Done</button></div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = closeModal;
    const wireBtn = (sel, fn) => { const el = m.querySelector(sel); if (el && !el.disabled) el.onclick = () => { fn(); closeModal(); }; };
    wireBtn("#clear-draft", clearDraftQuantities);
    wireBtn("#clear-filters", clearFiltersAndSearch);
    wireBtn("#clear-pax", clearPax);
    wireBtn("#clear-favourites", clearFavourites);
    wireBtn("#clear-profile", clearCustomProfile);
    wireBtn("#clear-history", clearHistory);
    wireBtn("#reset-all", resetEverything);
  }

  // ─── PER-CATEGORY ARCHIVE / COPY ────────────────────────────────────────
  function archiveCategory(catId) {
    const cat = findCat(catId); if (!cat) return;
    const d = activeDraft();
    const items = {};
    effectiveSections(cat).forEach(s => s.items.forEach(it => {
      if (d.items[it.id] && d.items[it.id].qty && d.items[it.id].qty.trim()) {
        items[it.id] = JSON.parse(JSON.stringify(d.items[it.id]));
      }
    }));
    const itemCount = Object.keys(items).length;
    if (itemCount === 0) { alert(`No items ordered in ${cat.label}.`); return; }
    state.history.unshift({
      id: "h-" + Date.now(),
      savedAt: new Date().toISOString(),
      date: d.date,
      supplier: d.supplier,
      vessel: d.vessel,
      name: `${cat.label} only (from ${d.name})`,
      items,
      itemCount,
      scope: catId,
    });
    if (state.history.length > 80) state.history.length = 80;
    saveState();
    showToast(`Archived ${itemCount} ${cat.label} items.`);
    renderSidebar();
  }
  function copyCategoryText(catId) {
    const cat = findCat(catId); if (!cat) return;
    const d = activeDraft();
    const lines = [];
    lines.push(`${cat.label.toUpperCase()} ORDER — ${d.name}`);
    lines.push(`Date: ${d.date}  ·  Supplier: ${d.supplier || "—"}  ·  Vessel: ${d.vessel || "—"}`);
    lines.push("=".repeat(60));
    effectiveSections(cat).forEach(sec => {
      const lines2 = [];
      sec.items.forEach(it => {
        if (hasOrder(it.id)) {
          const e = d.items[it.id];
          const unit = effectiveUnit(it);
          const notes = e.notes ? `  (${e.notes})` : "";
          lines2.push(`  • ${it.name} — ${e.qty} ${unit}${notes}`);
        }
      });
      if (lines2.length) { lines.push(""); lines.push(`▸ ${sec.title}`); lines.push(...lines2); }
    });
    if (lines.length <= 3) { alert(`No items ordered in ${cat.label}.`); return; }
    lines.push("");
    lines.push("─".repeat(60));
    lines.push("Generated by Littoralicious Galley Order");
    lines.push("littoralicious.com/galleyorder · free · open");
    const text = lines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(`Copied ${cat.label} to clipboard.`));
    } else {
      openModal(`<h2>${escapeHTML(cat.label)} as text</h2>
        <textarea style="width:100%;height:300px;font-family:'SF Mono',monospace;font-size:11px;border:1px solid var(--color-border);padding:8px;">${escapeHTML(text)}</textarea>
        <div class="modal-actions"><button class="btn" data-close>Close</button></div>`);
      const m = $(".modal"); if (m) m.querySelector("[data-close]").onclick = closeModal;
    }
  }

  function updateRow(id) {
    const row = $(`.row[data-id="${id}"]`);
    if (!row) return;
    row.classList.toggle("has-qty", hasOrder(id));
    // Reflect current qty + unit in the inputs (skip if user is actively typing in them)
    const entry = getItem(id);
    const item = findItemById(id);
    const qtyInput = row.querySelector('input[data-qty]');
    if (qtyInput && document.activeElement !== qtyInput) {
      const newVal = entry?.qty || "";
      if (qtyInput.value !== newVal) qtyInput.value = newVal;
    }
    const unitInput = row.querySelector('input[data-unit]');
    if (unitInput && document.activeElement !== unitInput && item) {
      const newUnit = effectiveUnit(item);
      if (unitInput.value !== newUnit) unitInput.value = newUnit;
      // Refresh the +/- tooltips so they show the right step for the (possibly changed) unit
      const step = naturalStep(newUnit);
      const dec = row.querySelector('[data-step][data-delta="-1"]');
      const inc = row.querySelector('[data-step][data-delta="1"]');
      if (dec) dec.title = `− ${step} ${newUnit || ""}`;
      if (inc) inc.title = `+ ${step} ${newUnit || ""}`;
    }
  }
  function updateSectionStats(id) {
    PANTRY_DATA.forEach(cat => effectiveSections(cat).forEach((sec, sIdx) => {
      if (sec.items.find(it => it.id === id)) {
        const key = cat.id + "::" + sIdx;
        const node = $(`.section[data-section-key="${cssEscape(key)}"] .section-stats`);
        if (node) { const st = sectionStats(sec); node.textContent = `${st.ordered}/${st.total}`; }
        const catEl = $(`.category-block[data-cat="${cat.id}"] .cat-stats`);
        if (catEl) {
          const cs = categoryStats(cat);
          const customCount = Object.values(state.customItems || {}).filter(it => it.cat === cat.id).length;
          catEl.textContent = `${cs.ordered} / ${cs.total} ordered${customCount ? ` · ${customCount} custom` : ""}`;
        }
      }
    }));
  }

  function markEmptyForPrint() {
    PANTRY_DATA.forEach(cat => {
      const block = $(`.category-block[data-cat="${cat.id}"]`); if (!block) return;
      block.classList.toggle("empty-print", categoryStats(cat).ordered === 0);
      effectiveSections(cat).forEach((sec, sIdx) => {
        const key = cat.id + "::" + sIdx;
        const secEl = $(`.section[data-section-key="${cssEscape(key)}"]`);
        if (secEl) secEl.classList.toggle("empty-print", sectionStats(sec).ordered === 0);
      });
    });
  }

  function debouncedRenderMain() { if (renderTimer) clearTimeout(renderTimer); renderTimer = setTimeout(renderMain, 220); }

  function renderHeader() {
    const d = activeDraft();
    if ($("#meta-date")) $("#meta-date").value = d.date || "";
    if ($("#meta-supplier")) $("#meta-supplier").value = d.supplier || "";
    if ($("#meta-vessel")) $("#meta-vessel").value = d.vessel || "";
  }

  function render() {
    document.documentElement.setAttribute("data-theme", state.ui.theme || "light");
    registerCustomProfileInEnrich();
    renderProvisioningBar();
    renderHeader();
    renderSidebar();
    renderMain();
  }

  // ─── MODALS ─────────────────────────────────────────────────────────────
  function openModal(html) {
    closeModal();
    const b = document.createElement("div");
    b.className = "modal-backdrop";
    b.innerHTML = `<div class="modal">${html}</div>`;
    document.body.appendChild(b);
    b.addEventListener("click", e => { if (e.target === b) closeModal(); });
    document.addEventListener("keydown", escClose);
    return b;
  }
  function closeModal() {
    const b = $(".modal-backdrop"); if (b) b.remove();
    document.removeEventListener("keydown", escClose);
  }
  function escClose(e) { if (e.key === "Escape") closeModal(); }

  function openHelpModal(topic) {
    if (topic === "tier") {
      const html = `
        <h2>What the tier marks mean</h2>
        <p>Items are tagged by how essential they are to a working galley. The filter chips at the top of the list let you cut the catalog to the level you need.</p>
        <div class="tier-explain"><div class="symbol">★</div><div class="desc"><strong>★ — Staple</strong>Always on board. The galley does not function without these.</div></div>
        <div class="tier-explain"><div class="symbol">★★</div><div class="desc"><strong>★★ — Chef's pick · makes the difference</strong>The brand or grade that turns competent food into excellent food.</div></div>
        <div class="tier-explain"><div class="symbol">★★★</div><div class="desc"><strong>★★★ — Luxury · hero</strong>The single item the menu is built around. Special-occasion sourcing.</div></div>
        <div class="tier-explain"><div class="symbol untiered">no star</div><div class="desc"><strong>Untiered</strong>Fresh proteins, whole fish, custom cuts — items where tier doesn't apply.</div></div>
        <div class="modal-actions"><button class="btn" data-close>Close</button></div>`;
      const m = openModal(html); m.querySelector("[data-close]").onclick = closeModal;
    }
  }

  function renderHistoryModal() {
    let html = `<h2>Order Archives</h2>`;
    if (state.history.length === 0) {
      html += `<p>No archives yet. Your draft autosaves continuously — when ready to send, click <strong>Archive Order</strong> to snapshot it here.</p>`;
    } else {
      html += `<p style="font-size:12px;color:var(--color-muted);">Up to 80 archives kept. <strong>Load</strong> replaces the current draft. <strong>Duplicate</strong> creates a new named draft.</p>`;
      html += `<ul class="history-list">`;
      state.history.forEach(h => {
        html += `<li>
          <div class="info">
            <div class="date">${escapeHTML(h.date)} — ${h.itemCount} items <span style="color:var(--color-muted);font-weight:400">· ${escapeHTML(h.name || "—")}</span></div>
            <div class="meta">${h.supplier ? escapeHTML(h.supplier) : "—"}${h.vessel ? " · " + escapeHTML(h.vessel) : ""} · archived ${new Date(h.savedAt).toLocaleString()}</div>
          </div>
          <div class="actions">
            <button data-recall="${h.id}">Load into current</button>
            <button data-dupe="${h.id}">Duplicate as new</button>
            <button class="danger" data-del="${h.id}">×</button>
          </div>
        </li>`;
      });
      html += `</ul>`;
    }
    html += `<div class="modal-actions"><button class="btn" data-close>Close</button></div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = closeModal;
    m.querySelectorAll("[data-recall]").forEach(b => b.onclick = () => recallHistory(b.dataset.recall));
    m.querySelectorAll("[data-dupe]").forEach(b => b.onclick = () => duplicateHistoryToNewDraft(b.dataset.dupe));
    m.querySelectorAll("[data-del]").forEach(b => b.onclick = () => deleteHistory(b.dataset.del));
  }

  function openAboutModal() {
    const html = `
      <h2>About — Galley Order System</h2>
      <p>A free, open provisioning tool. 3,200+ items catalogued across 24 categories — heritage rices, sashimi-grade tunas, Petrossian caviars, Sosa modernist range, Ponthier purées, Rhug organic lamb, Iberico bellota, Wagyu A5, Rougié foie gras, Pixian doubanjiang — with the brand or grade that makes the difference noted on every line.</p>
      <h3 style="font-family:Georgia,serif;font-size:16px;margin:16px 0 8px;">Intelligence built in</h3>
      <ul style="padding-left:18px;color:var(--color-muted);font-size:13px;line-height:1.7;">
        <li><strong>Seasonal calendar.</strong> 25+ truly seasonal items flagged with the current month — order white truffle in October, get warned in May.</li>
        <li><strong>Allergen tags.</strong> Items tagged with fish · shellfish · egg · gluten · nuts · dairy · sesame · pork · beef · soy. Hide any combination.</li>
        <li><strong>Guest profiles.</strong> Preset rule sets (Bravo family, kosher, halal, plant-based) that flag conflicts inline.</li>
        <li><strong>PAX × Days math.</strong> Enter guests + crew + days, click "Suggest qty" — every catalog item with a portion rule pre-fills.</li>
        <li><strong>Multiple drafts.</strong> Charter Week 28 + Crew Weekly + Emergency Restock — switch between active orders.</li>
        <li><strong>Frequency learning.</strong> Items used across past archives sort to the top of their section.</li>
      </ul>
      <h3 style="font-family:Georgia,serif;font-size:16px;margin:16px 0 8px;">Privacy</h3>
      <p>Everything lives in your browser's local storage. No account, no server, no tracking. Export your JSON anytime.</p>
      <p style="font-size:12px;color:var(--color-muted);">Built for <a href="/" style="color:var(--color-sea)">Littoralicious</a> by Arnaud Callier. Free. Open. Yours.</p>
      <div class="modal-actions"><button class="btn" data-close>Close</button></div>`;
    const m = openModal(html); m.querySelector("[data-close]").onclick = closeModal;
  }

  function openShortcutsModal() {
    const html = `
      <h2>Keyboard shortcuts</h2>
      <table class="kb-table">
        <tr><td><kbd>/</kbd></td><td>Focus the search bar</td></tr>
        <tr><td><kbd>?</kbd></td><td>Show this shortcut list</td></tr>
        <tr><td><kbd>n</kbd></td><td>Create a new draft</td></tr>
        <tr><td><kbd>a</kbd></td><td>Archive the current draft</td></tr>
        <tr><td><kbd>p</kbd></td><td>Print PDF (full or single category)</td></tr>
        <tr><td><kbd>l</kbd> / <kbd>u</kbd></td><td>Paste / upload a list of items</td></tr>
        <tr><td><kbd>g</kbd></td><td>Paste a guest preference sheet</td></tr>
        <tr><td><kbd>x</kbd></td><td>Open the Clear… menu</td></tr>
        <tr><td><kbd>c</kbd></td><td>Copy order as plain text</td></tr>
        <tr><td><kbd>e</kbd></td><td>Send order by email (opens mail client)</td></tr>
        <tr><td><kbd>t</kbd></td><td>Toggle dark mode</td></tr>
        <tr><td><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>0</kbd></td><td>Tier filter (★+ / ★★+ / ★★★ / all)</td></tr>
        <tr><td><kbd>Esc</kbd></td><td>Close modal</td></tr>
        <tr><td><kbd>+</kbd> <kbd>−</kbd></td><td>When focused on a qty input: step by 1</td></tr>
        <tr><td><kbd>Tab</kbd></td><td>Move between qty fields (browser default)</td></tr>
      </table>
      <p style="margin-top:14px;color:var(--color-muted);font-size:12px;">Shortcuts don't fire while typing in a text field (except <kbd>+</kbd>/<kbd>−</kbd> in qty fields).</p>
      <div class="modal-actions"><button class="btn" data-close>Close</button></div>`;
    const m = openModal(html); m.querySelector("[data-close]").onclick = closeModal;
  }

  function openOnboardingModal() {
    const html = `
      <h2>Welcome aboard.</h2>
      <p style="font-size:14px;line-height:1.6;">A free provisioning tool for chefs who refuse to lose institutional memory at every handover. Everything lives in your browser — no account, nothing to install.</p>
      <div class="onboard-grid">
        <div class="onboard-step">
          <div class="onboard-num">1</div>
          <div class="onboard-text"><strong>Browse or search.</strong> Click a category in the sidebar, or type into the search bar. 3,200+ items across 24 categories.</div>
        </div>
        <div class="onboard-step">
          <div class="onboard-num">2</div>
          <div class="onboard-text"><strong>Set the trip.</strong> Top bar — enter PAX (guest + crew) and days. Click <em>Suggest qty</em> to auto-fill portions.</div>
        </div>
        <div class="onboard-step">
          <div class="onboard-num">3</div>
          <div class="onboard-text"><strong>Fast entry.</strong> Use ±1 / ×2 / ×5 buttons next to qty. Star items you order often (pinned to top).</div>
        </div>
        <div class="onboard-step">
          <div class="onboard-num">4</div>
          <div class="onboard-text"><strong>Profile + season.</strong> Pick a guest profile (Bravo / kosher / halal / vegan) to flag conflicts. Out-of-season items show a red ring.</div>
        </div>
        <div class="onboard-step">
          <div class="onboard-num">5</div>
          <div class="onboard-text"><strong>Archive & print.</strong> Each draft is autosaved. Archive when you send. Print a clean A4 PDF with only ordered items. Copy to WhatsApp with one button.</div>
        </div>
      </div>
      <p style="margin-top:14px;font-size:12px;color:var(--color-muted);">Press <kbd>?</kbd> any time to see keyboard shortcuts.</p>
      <div class="modal-actions"><button class="btn btn-primary" data-close>Start ordering</button></div>`;
    const m = openModal(html);
    m.querySelector("[data-close]").onclick = () => { state.ui.onboarded = true; saveState(); closeModal(); };
  }

  // ─── TOAST ──────────────────────────────────────────────────────────────
  function showToast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove("show"), 2500);
  }

  // ─── KEYBOARD ───────────────────────────────────────────────────────────
  function isTyping(el) {
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
  }
  function onKeydown(e) {
    // qty +/-: works even when focused
    if (e.key === "+" || e.key === "=" || e.key === "-") {
      const target = document.activeElement;
      if (target && target.matches('input[data-qty]')) {
        e.preventDefault();
        const id = target.dataset.qty;
        const delta = (e.key === "-") ? -1 : 1;
        stepQty(id, delta);
        return;
      }
    }
    if (isTyping(document.activeElement)) return;
    if (e.key === "/") { e.preventDefault(); const s = $(".search"); if (s) { s.focus(); s.select(); } return; }
    if (e.key === "?") { e.preventDefault(); openShortcutsModal(); return; }
    if (e.key === "n") { e.preventDefault(); newDraft(); return; }
    if (e.key === "a") { e.preventDefault(); archiveCurrent(); return; }
    if (e.key === "p") { e.preventDefault(); openPrintModal(); return; }
    if (e.key === "l" || e.key === "u") { e.preventDefault(); openUploadListModal(); return; }
    if (e.key === "g") { e.preventDefault(); openPreferencesModal(); return; }
    if (e.key === "x") { e.preventDefault(); openClearModal(); return; }
    if (e.key === "c") { e.preventDefault(); exportPlainText(); return; }
    if (e.key === "e") { e.preventDefault(); sendOrderByEmail(); return; }
    if (e.key === "t") { e.preventDefault(); state.ui.theme = state.ui.theme === "dark" ? "light" : "dark"; saveState(); document.documentElement.setAttribute("data-theme", state.ui.theme); return; }
    if (["0","1","2","3"].includes(e.key)) { e.preventDefault(); state.ui.tierFilter = parseInt(e.key); saveState(); renderMain(); return; }
  }

  // ─── INIT ───────────────────────────────────────────────────────────────
  function init() {
    if (typeof PANTRY_DATA === "undefined") {
      document.body.innerHTML = `<div style="padding:40px;font-family:Georgia,serif;">Failed to load catalog. Make sure <code>data.js</code> is in the same folder as <code>index.html</code>.</div>`;
      return;
    }
    if (typeof PANTRY_ENRICH === "undefined") {
      console.warn("PANTRY_ENRICH missing — enrichment disabled.");
      window.PANTRY_ENRICH = { enrichItem: () => ({ allergens: [], season: null, portion: null, profileFlag: null }), profiles: { none: { label: "—" } } };
    }
    state = loadState();

    $("#meta-date").addEventListener("input", e => { activeDraft().date = e.target.value; saveState(); });
    $("#meta-supplier").addEventListener("input", e => { activeDraft().supplier = e.target.value; saveState(); });
    $("#meta-vessel").addEventListener("input", e => { activeDraft().vessel = e.target.value; saveState(); });
    const safeWire = (id, ev, fn) => { const el = $(id); if (el) el[ev] = fn; };
    // Clickable masthead title — resets to "all categories" view
    const titleEl = $(".masthead-title");
    if (titleEl) {
      titleEl.style.cursor = "pointer";
      titleEl.title = "Show all categories";
      titleEl.addEventListener("click", () => {
        state.ui.activeCategory = null;
        saveState();
        render();
      });
    }
    safeWire("#btn-archive", "onclick", archiveCurrent);
    safeWire("#btn-history", "onclick", renderHistoryModal);
    safeWire("#btn-print", "onclick", openPrintModal);
    safeWire("#btn-send-email", "onclick", sendOrderByEmail);
    safeWire("#btn-upload-list", "onclick", openUploadListModal);
    safeWire("#btn-upload-prefs", "onclick", openPreferencesModal);
    safeWire("#btn-copy-text", "onclick", exportPlainText);
    safeWire("#btn-about", "onclick", openAboutModal);
    safeWire("#btn-theme", "onclick", () => {
      state.ui.theme = state.ui.theme === "dark" ? "light" : "dark"; saveState();
      document.documentElement.setAttribute("data-theme", state.ui.theme);
    });
    $("#autosave").textContent = "Autosaved";

    document.addEventListener("keydown", onKeydown);

    render();
    if (!state.ui.onboarded) {
      setTimeout(openOnboardingModal, 350);
    }
  }
  document.addEventListener("DOMContentLoaded", init);
})();
