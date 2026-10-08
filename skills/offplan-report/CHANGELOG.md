# Changelog — Off-plan Report

## 1.0.1 — 9 Oct 2026
Lessons from a second real test (Binghatti Starfall, from a brochure):
- Check today's price on Reelly/GenieMap: brochures go out of date. Brochure without a unit → starting unit.
- Read image-only brochure PDFs by rendering pages (PyMuPDF); setup check now includes `pymupdf` + `pillow`.
- Checks work with 1, 2 or 3 data sources (`dump.js`).
- PDF keeps the first photo (`--virtual-time-budget=4000`).
- Growth caveat when a jump comes from a tiny prior-year sample.
- DXB Interact: how to set area/filters reliably, and its supply page to cross-check handover years.
- Photos: always both Reelly and GenieMap (1440px via the viewer), de-duplicated, larger copy kept.
- Supply includes retail and offices; years shown up to the last year the sources list.

## 1.0.0 — 8 Oct 2026
- Part of The Ultimate Real Estate Calculator (repo renamed and restructured: `skills/offplan-report/`).
- Guided first run (setup check, details, accounts); Reelly / DXB Interact fallbacks for paid sources.
First release.
- Report: verdict, 4 deal checks, price ruler, what-if scenarios, supply & demand, things to know,
  payment plan, location & comfort, step-by-step calculations, photo gallery + full-screen viewer,
  contact footer (WhatsApp + socials), client PDF.
- Formulas verified against the original evaluation sheet across 144 combinations (difference 0).
- Licensed under The Ultimate Real Estate Calculator License; credit line on every report.
