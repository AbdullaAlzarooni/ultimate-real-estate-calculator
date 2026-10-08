# Changelog — Off-plan Report

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
