# Changelog — Off-plan Report

## 1.3.0 — 12 Oct 2026
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

## 1.2.0 — 10 Oct 2026
**Views & location**
- **GIS DDA check**: finds the building's plot from its Google Maps location and reads the maximum allowed height and
  land use of every neighbouring plot (`tools/dda-plots.js`). Used to judge the view and shade.
- **View map card** in Location & comfort: GIS DDA plot map and Google Maps satellite view in two tabs; every 5° slice
  coloured by what it faces (green open / G+2 or lower, amber 6+ floors lower, red same height or taller); summary
  line, compass chips, a side list measured from the plot edge, building names, and a tap-a-direction arrow with
  "Your unit" (`tools/viewmap.py`, `tools/satview.py`).
- Outside GIS DDA: Google Maps method (satellite, zoom in for project pins, Street View, project sites, floor counts).
- **Height chip** at the top with the full building layout (e.g. 2B+G+4P+14+R · 19 floors).

**Data & rules**
- **Size multiplier** fallback when there are too few size-matched rents (unit size ÷ comparable size, applied to the
  whole gross rent, as in the evaluation sheet); shown in the verdict, the sources table and the calculations.
- **Developer premium**: Emaar, Sobha, Meraas, Ellington, Omniyat at least +1% rent / +2.5% price; every developer can
  earn more from evidence of its handed-over buildings in the same community (halved, capped, never negative).
- **DXB Interact**: non-market transfers (share transfers, gifts) are removed with a minimum price/sqft, only when they appear.

**Design**
- Yields always shown to 2 decimals; optional custom report title; tidier step-by-step layout.

**Examples & docs**
- Both examples show the new features; README has the view-map screenshots and the new install guide.

## 1.1.0 — 9 Oct 2026
**Data & sources**
- Demand chart uses the **same categories as the building** (e.g. Studio · 1 Bed · 2 Bed · Retail) so
  the two donuts compare side by side.
- New rule **"Which source wins (counts)"**: for sales / supply counts use the fuller, checkable source
  (DXB Interact first, then Property Monitor, then Property Finder); one source per chart, the other
  source's figure in the note when the gap is big. Prices and rents keep their own rules.
- DXB Interact commercial sales split into **Shop = retail** and **Office** (how to page through all rows).
- Property Monitor **Commercial sales** (`COMM`) and Property Finder transactions as backups.
- Admin fee taken from **GenieMap's payment-plan header**; also service charge, furnishing, resale-after %.
- Property Monitor price index: quote the 12 / 6 / 3-month summary, never a single month's bar.
- Optional `furnText` label (e.g. "Semi-furnished (kitchen appliances)").

**Design**
- Donut: the highlighted slice is drawn last, so small slices no longer cut a notch into it.

**Example**
- Second example data file `kit/data/example-starfall-studio.js` (brochure-based, no unit chosen).

## 1.0.1 — 9 Oct 2026
- Check today's price on Reelly / GenieMap (brochures go out of date); brochure without a unit →
  starting unit.
- Read image-only brochure PDFs by rendering pages (PyMuPDF); setup check includes `pymupdf` + `pillow`.
- DXB Interact: how to set area and filters reliably, never drop it silently; its supply page to
  cross-check handover years.
- Photos from **both** Reelly and GenieMap (1440px via the viewer), de-duplicated, larger copy kept;
  publish photos at their exact `data/` path.
- Supply includes **retail and offices**; handover years shown only as far as the sources list.
- Growth caveat when a big jump comes from a tiny prior-year sample.
- Checks work with 1, 2 or 3 data sources (`dump.js`); client PDF keeps the first photo.
- Wind & sea card in every report; PDF footer shows socials as an icon + handle grid.

## 1.0.0 — 8 Oct 2026
First release, as part of **The Ultimate Real Estate Calculator**.
- Report: verdict, 4 deal checks, price ruler, what-if scenarios, supply & demand, things to know,
  payment plan, location & comfort, step-by-step calculations, photo gallery + full-screen viewer,
  contact footer (WhatsApp + socials), client PDF.
- Formulas verified against the original evaluation sheet across 144 combinations (difference 0).
- Guided first run (setup check, details, accounts); Reelly / DXB Interact fallbacks for paid sources.
- Licensed under The Ultimate Real Estate Calculator License; credit line on every report.
