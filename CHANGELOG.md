# Changelog — The Ultimate Real Estate Calculator

The collection has its own version; each calculator also has its own version and changelog.

## v1.4 — 16 Oct 2026
| Calculator | Version |
|---|---|
| Off-plan Report | 1.4.0 ([changelog](skills/offplan-report/CHANGELOG.md)) |
| Post-Handover Report | 1.2.0 ([changelog](skills/posthandover-report/CHANGELOG.md)) |
| Ready Property Report | 1.1.0 ([changelog](skills/ready-report/CHANGELOG.md)) |
| Airbnb / holiday home | coming soon |

- **Distressed deal and mortgage are now built into the calculators**, switched on by the data (`references/modules.md`):
  - **Distressed deal test** (7% rental ROI + 10% below what similar units sold for, both must be met) in all three,
    for owner resales only (secondary market, off-plan or ready).
  - **Similar listings now** (Property Finder + Bayut) flag possible distressed deals; units still sold by the developer show **New**.
  - **Mortgage section** ("Your mortgage, year by year") in off-plan and ready; off-plan adds **developer × bank deals**
    (e.g. ADCB × Ellington, `references/bank-offers.md`). Never in post-handover.
  - **Market evidence** for off-plan and post-handover: the project's own DLD sales and owner resales.
- **Same section order in all three calculators**: deal → what could happen → market evidence → listings → mortgage →
  supply & demand → developer → things to know → unit → location → calculations.
- Fixes: a 0% fixed rate no longer shows "NaN"; "Things to know" no longer leaves gaps next to long notes.

## v1.3 — 12 Oct 2026
| Calculator | Version |
|---|---|
| Off-plan Report | 1.3.1 ([changelog](skills/offplan-report/CHANGELOG.md)) |
| Post-Handover Report | 1.1.1 ([changelog](skills/posthandover-report/CHANGELOG.md)) |
| **Ready Property Report** (new) | 1.0.0 ([changelog](skills/ready-report/CHANGELOG.md)) |
| Mortgage · Airbnb / holiday home · Distressed deal | coming soon |

- New calculator: **Ready Property Report**: ready units on the resale market, cash or mortgage (buyer type,
  1st / 2nd mortgage, fixed rate then EIBOR + margin), price vs size-matched recent sales, yield on your cash,
  sell after 1–10 years with a building-age discount, supply & demand, optional developer section.
- Developer section screenshots in the READMEs; the Starfall and Binghatti Azure examples include it with photos.
- Fix: empty logo / agent photo slots no longer show "Photo not available".

## v1.2 — 12 Oct 2026
| Calculator | Version |
|---|---|
| Off-plan Report | 1.3.0 ([changelog](skills/offplan-report/CHANGELOG.md)) |
| Post-Handover Report | 1.1.0 ([changelog](skills/posthandover-report/CHANGELOG.md)) |
| Ready property · Mortgage · Airbnb / holiday home · Distressed deal | coming soon |

- **Property Monitor removed** from every calculator: it does not allow AI use. DXB Interact is now the main,
  size-matched source; supply, demand and unit breakdowns also come from DXB Interact.
- New optional section **The developer** in both calculators: every project by the developer (ready, under construction,
  planned) with premiums per unit type. Claude asks first, because it takes a long time to build.
- Example reports now include their photos; every report is checked for missing images before delivery.

## v1.1 — 10 Oct 2026
| Calculator | Version |
|---|---|
| Off-plan Report | 1.2.0 ([changelog](skills/offplan-report/CHANGELOG.md)) |
| **Post-Handover Report** (new) | 1.0.0 ([changelog](skills/posthandover-report/CHANGELOG.md)) |
| Ready property · Mortgage · Airbnb / holiday home · Distressed deal | coming soon |

- New calculator: **Post-Handover Report**.
- Off-plan Report 1.2.0: view maps (GIS DDA + Google Maps), Height chip, size multiplier, developer premium rule.
- README: step-by-step install guide (Claude desktop app first) and install instructions Claude follows when someone pastes the link.

## v1.0 — 9 Oct 2026
| Calculator | Version |
|---|---|
| Off-plan Report | 1.1.0 ([changelog](skills/offplan-report/CHANGELOG.md)) |
| Post-handover · Ready property · Mortgage · Airbnb / holiday home · Distressed deal | coming soon |
