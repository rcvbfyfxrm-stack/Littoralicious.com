---
title: "Galley Order: The Provisioning Tool That Survives the Handover"
date: 2026-05-20
category: the-bridge
tags: [provisioning, tools, system, free, open, yacht-chef, workflow, handover, software]
read_time: 9
template: tool-deep-dive
status: review
submitted_to_review: 2026-05-20
url: littoralicious.com/galleyorder/
---

# Galley Order: The Provisioning Tool That Survives the Handover

*Every yacht-chef list dies the same death. The chef writes a clean two-page Word document, prints it for the season, hands the boat over in November, and it's gone. The next chef inherits the laminated allergy sheet, the captain's preference list, and zero institutional knowledge about which fishmonger keeps the Cantabrian anchovies in a hidden back-fridge or which Genoese olive oil costs €15 more per litre and is worth €40 more. Forty trips of brand-tested judgement walks off with the chef who wrote it down. The order list is the most under-engineered piece of infrastructure in our craft. This is the fix.*

**The tool:** [littoralicious.com/galleyorder](/galleyorder/). Free. Free forever. No account. No login. No data leaves your browser. It opens in three seconds and prints a publication-grade A4 PDF in any of four languages. The catalog under the hood holds **2,868 items** across nineteen categories — the brand or grade that makes the difference is named on every line.

---

## The argument in one sentence

The order list is institutional memory for the galley. If you treat it that way, the next chef walks on board with a year of brand-tested judgement already loaded; if you treat it as a one-time printout, the kitchen starts from zero every season.

---

## What's in the catalog

The catalog is built from eighteen pantry checklists assembled over four years of charter work, plus a dedicated **Produce** index for fresh fruit, vegetables, herbs, and roots. Numbers as of this writing:

| Category | Item count |
|---|---:|
| Fish | 79 |
| Meat | 123 |
| **Produce · Veg & Fruit** | **356** |
| Cheese & Dairy | 155 |
| Bakery & Pastry | 187 |
| Western pantry (dry store) | 237 |
| Grains · Seeds · Pasta | 247 |
| Spices Master | 220 |
| Freezer reference | 179 |
| Garde-Manger (curing · cultures · smoking) | 108 |
| Japan / Korea | 106 |
| Southeast Asia | 115 |
| Chinese (mainland) | 110 |
| India | 128 |
| Middle East | 132 |
| Mexican | 114 |
| Caribbean / Creole | 108 |
| South America | 86 |
| Africa | 78 |
| **Total** | **2,868** |

Each line carries the brand or grade that the chef thinks is the difference between a competent plate and a remembered one. **Castelas EVOO** in the Western pantry, not "olive oil". **Yamasa Marudaizu shoyu** in Japan, not "soy sauce". **Damiano Distefano Bronte pistachio paste**, **Pixian doubanjiang aged 3-yr**, **Mae Pranom nam prik pao**, **Walkerswood jerk**, **Échiré AOP butter**, **Beurre de Tourage 84%** for lamination, **Bactoferm T-SPX** and **Penicillium Mold-600** for charcuterie. The catalog names the supplier. Tier marks every item — ★ staple, ★★ chef's pick, ★★★ luxury / hero. **99.2% of items are tier-graded.**

---

## What it does that nothing else does

### Eight pieces of intelligence built in

| Feature | What it gives you |
|---|---|
| **Portion math** | Enter `8 guest + 12 crew × 7 days`, click *Suggest qty*. 84 portion rules — role-aware (guest / crew / all) — pre-fill the order. King salmon at 180 g per guest, Wagyu at 150 g per guest, beef mince at 150 g per crew, smoked salmon at 25 g per pax per day for breakfast. The math is transparent — hover a portion badge and you see `0.18kg × 8 guests × 7d ÷ 7 = 1.4 kg`. |
| **Seasonal calendar** | 25 truly seasonal items flagged with the current month. Order Pantelleria capers in February and the row glows green. Order white Alba truffle in May and it glows red. Stone crab Oct–May, soft-shell Apr–Sep, spot prawns May–Jul, Vacherin Mont d'Or Sep–Mar, wild Alaska king salmon May–Sep, every game species Oct–Feb. |
| **Allergen tags** | Items auto-tagged with `fish · shellfish · egg · gluten · nuts · dairy · sesame · pork · beef · soy`. Hide any combination from the catalog with one click. Useful when a guest preference sheet bans dairy across an entire charter. |
| **Guest profile analyser** | Paste a charter preference sheet — `Mr B: loves shellfish (shrimp, crab, lobster). Mrs B: no shrimp, no citrus. Charlotte: HIGHLY ALLERGIC TO EGGS.` The parser extracts allergies, dislikes, likes, and dietary flags. Loved items glow green; dislikes glow yellow; allergies glow red. Pattern-based — no API call, no upload. |
| **Port intelligence — 31 destinations** | Pick the destination from a dropdown — Côte d'Azur · Liguria · Amalfi · Sicily · Sardinia · Balearics · Greek Islands · Croatia · Turkish Riviera · Caribbean · Mexico · Pacific Northwest · Japan · Hong Kong · Persian Gulf · Maldives · Tahiti · Australia · New Zealand · Iceland · Norway · Brazil · South Africa · Cuba · NYC-Maine · plus 8 more. Each port carries a curated blurb, market tips, **and 5–8 hand-picked hero products with notes** ("Castelas EVOO — buy direct at the mill", "Stone crab claws — Oct–May Florida"). Items from the catalog that are locally exceptional get a flag badge and re-sort to the top of every section. |
| **Add-list parser with cross-language matching** | Paste a list — supplier email, WhatsApp thread, chef-to-chef handover, an old printout in French. The parser reads each line, extracts qty + unit + notes, **handles typos via edit-distance matching** (`salmom` → King salmon, `mozzarela` → Mozzarella di Bufala), **translates 200+ food words** between English ↔ French ↔ Italian ↔ Spanish, and shows a preview where you can override any match. Items it can't match get **auto-categorised** by keyword AI and added as custom items in the right category. Nothing is silently dropped. |
| **Smart ± buttons** | First click on `+` when a qty is empty fills with a **week × 10 guests** default — or if you've set PAX, the real math. Subsequent clicks step by the natural minimum (1 kg for flour, 1 L for oil, 1 tin for Osetra, 1 piece for steaks). Bottom-up: you never have to type a quantity if you don't want to. |
| **Multi-language PDF print** | Print Fish-only or full-order PDF — pick **English · Français · Italiano · Español** in the print modal. Item names, category headers, masthead labels, and footer all translate. Brand names and specific cuts stay in the original. Magazine-grade A4 layout. Send the Fish PDF in Italian to the Italian fishmonger; the Cheese PDF in French to the AOP supplier; the Meat PDF in Spanish to the Spanish butcher. **One catalog. Three languages out. One workflow.** |

---

## The workflow it replaces

```
OLD                                NEW
────────────────────────────────   ──────────────────────────────────
Word document on the shared drive  → Browser tab, autosaved every keystroke
Lost at handover                   → Export JSON, hand the file to the next chef
Print one big A4 of everything     → Per-supplier PDFs in their native language
Pencil-edit on the dock            → ± step buttons, qty math from PAX
"No idea what brand"               → Brand named on every line
"Substitution available?"          → 23-rule pre-approved substitution table
Generic spice list                 → 220 spices, blend by blend, country by country
"Did Charlotte have an allergy?"   → Profile parser reads the preference sheet
"What's in season this month?"     → 25 seasonal flags, this month highlighted
Lose archives over the season      → 60 last orders kept, load + duplicate any
```

Every part of the chef's provisioning workflow that lived in volatile paper now lives in queryable, exportable, printable, multi-language local storage.

---

## How to start

1. Open [littoralicious.com/galleyorder](/galleyorder/) on a laptop, tablet, or phone.
2. Either type into the search bar, or click `+ Add list` and paste a list from any source — WhatsApp message, supplier email, your old Word doc, a colleague's hand-off. The parser handles it.
3. Set PAX in the top bar (`8 guest + 12 crew × 7 days`), click **Suggest qty**. The catalog auto-fills sensible defaults.
4. Star anything you order often — it pins to the top of its section permanently.
5. Add a port if you're heading somewhere specific — the local heroes float up.
6. Print PDF. Pick scope (full order or any single category) and language. Save as PDF. Email to the supplier.
7. **Archive Order** snapshots the result. Up to 60 archives are kept. Duplicate any of them next week as a starting point.

---

## What it does not do

It is not a procurement platform. It does not contact suppliers, place orders, or move money. It does not run in the cloud, does not require an account, and does not send a single byte to any server. Everything you type lives in your browser's local storage. If you want a backup, export the JSON — that file is the only path your data takes outside the tab. Hand the JSON to the next chef and the boat's brand-tested year of judgement walks on with them.

It does not need WiFi after the first load. The catalog is cached. Open the tab once on shore, then sail; the page works at sea with the modem unplugged.

It is not finished. The catalog grows with every charter; the port database grows with every passage. Corrections, brand updates, and new destinations come into the next release. The whole thing is free — the only ask is that if you find a missing brand or a wrong line, tell us, so the next chef gets it right.

---

## Why we built it

Three pillars. The grandmother who taught us that the *brand* of olive oil is not a snobbery but the difference between a tomato salad you eat and a tomato salad you remember. The scientist who tracks single-origin tahini provenance because the sesame seed cultivar changes the sauce. And the chef who has done forty handovers and watched every paper sheet disappear with the chef who wrote it.

The order list is institutional memory. Treat it as memory and the next chef walks on with a year of brand-tested knowledge loaded; treat it as a one-time printout and the kitchen starts from zero every season. We chose to treat it as memory and to give the tool away.

*Nutrire* — the publication's mission — applies to the chef as much as the guest. A chef working from a sharper list serves better food. That's the whole argument.

---

## Open the tool

[**Galley Order — open the system →**](/galleyorder/)

Free. Free forever. No sign-up. Print as many PDFs as you need. In English, French, Italian, or Spanish. Hand the JSON to the next chef.

If a line item is missing, a brand is wrong, a port needs more depth, or a translation reads badly — write to the publication. Every correction goes into the next release.

---

> **Authoring note (remove before publication):** This piece replaces the 2026-05-19 launch draft. Verify before publishing: (a) the URL `littoralicious.com/galleyorder/` resolves on Firebase hosting; (b) the catalog count matches the live `data.js + produce.js` (currently 2,868); (c) the print PDF in all four languages renders cleanly on the latest macOS Safari + Chrome; (d) export-import round-trips a complete state; (e) the port database matches the live `enrich.js` list (31 destinations including the May expansion). Consider commissioning a 90-second screencast — start blank, paste a list, set PAX, suggest qty, archive, print in French to a fishmonger — as the visual companion. Companion piece in queue: "What forty handovers taught me about the order list" — first-person, voice piece, same author.
