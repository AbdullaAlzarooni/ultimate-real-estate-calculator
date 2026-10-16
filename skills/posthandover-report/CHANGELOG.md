# Changelog — Post-Handover Report

## 1.2.0 — 16 Oct 2026
- **Modules switched on by the data** (`references/modules.md`): `distressed:true` + `proj` adds the Distressed deal test
  (7% rental ROI on the total cost + 10% below this project's own DLD sales); the top card keeps the post-handover figures
  (yield on your cash, rent vs the plan). **No mortgage** in this report.
- **Market evidence** and **Similar listings now** show whenever the data has `proj`.
- **Same section order in all three calculators** (see `modules.md`).
- Result boxes show the sale and "on your cash" lines as total and per year.
- "Things to know" flows in two columns without gaps next to long notes (as in the Ready report).
- Distressed deal test only for owner resales (secondary market); listings mark units still sold by the developer as **New**.
- New `references/listings-and-evidence.md`: how to collect the project's sales, similar listings and resale info; the first-run questions now ask whether the unit is a resale.
- Fix: `tools/domtest.js`, `tools/dump.js` and the sheet checks work again (they read the wrong script since 1.3).

## 1.1.1 — 12 Oct 2026
- `build.py` lists the developer photos in `<name>.files.txt`, so they are published with the report.
- Fix: with no logo or agent photo in `brand/`, the footer showed "Photo not available" boxes; empty slots are
  hidden again.

## 1.1.0 — 12 Oct 2026
**Property Monitor removed** (it does not allow AI / automated use)
- Claude never opens or reads Property Monitor, even if you have an account.
- **DXB Interact is the main source**, size-matched ±10% with its size filter (`P74_MIN_SIZE` / `P74_MAX_SIZE`);
  optimistic = all off-plan sales, conservative = off-plan resales ("Sold by" Individual).
- **Supply** from DXB Interact Supply → Total units (Active and Finished, every page, by DLD year; late projects shown
  as "Target passed", 2009–2016 stalled projects left out). **What's selling** from the area's Beds chart (counts per
  type) + Type = Commercial. **Building unit breakdown** from the DXB Interact project page + Beds chart (size ranges).
- Area price / rent trend: DXB Interact's 12- and 6-month change boxes.
- Disclaimer and README updated.
- Example reports: Property Monitor figures and links removed, DXB Interact is the main source; their
  Supply & demand sections (built on Property Monitor data) are left out.

**Developer section (optional)**
- **New section: The developer** (optional, same as the Ready Report). Claude asks at the start; if yes, the report
  shows every project by the developer in Ready / Under construction / Planned tabs with photos, completion and DLD
  dates, % built, unit mix, rented % or absorption rate, price / rent premium per unit type (off-plan premium for
  projects not finished), area dropdown, unit-type chips and search (`references/developer-section.md`).
- Section numbers and the top menu now skip sections that are not shown.
- Developer section has no "All types" chip: it opens on the unit's own type, and the summary line and card order
  follow the selected type.
- **Every image must load** before a report is delivered (new check in workflow step 9); a broken image shows a
  "Photo not available" box instead of a broken icon. The example reports now ship with their photos.

## 1.0.0 — 10 Oct 2026
First release, as part of **The Ultimate Real Estate Calculator** v1.1.
- Report for post-handover payment plans: verdict (sell at handover, rent, yield on your cash, plan coverage),
  "Does the rent cover the plan?" check with the monthly top-up, rent vs instalments per year, payment timeline
  with an after-handover segment, plan cost compared with the standard plan.
- **Empty-months slider** (0 → the length of the plan, year marks) with a plain-words effect line.
- Everything from the Off-plan Report 1.2.0: view maps (GIS DDA + Google Maps), Height chip, size multiplier,
  developer premium rule, step-by-step calculations, photo gallery, contact footer, client PDF.
- Formulas checked against the author's Post-Handover Property Evaluation Form (`tools/sheetcheck-ph.js`,
  difference ≈ 0 apart from the sheet's AED 40 DLD admin fee).
- Example data: Weston by Wadan studio 109 on the 60/40 plan.
