# Developer section (optional) — what it shows and how to build it

**Always ask first** (SKILL.md step 2b). It is optional and slow: a large developer has 100+ projects and each one
needs several DLD and DXB Interact lookups. Keep requests slow and small (a few seconds between searches).

## What the client gets
Three tabs: **Ready · Under construction · Planned**, each with an **area dropdown**, a **search box** and
**unit-type chips** (Studio · 1-bed · 2-bed … · Commercial). Picking a type shows only projects that have that type,
and every figure on the cards switches to that type. One card per project, with a photo:
- **Ready:** completed date (and age), DLD target date ("confirmed N months after"), unit mix, **price premium**
  and **rent premium** vs the same unit type in its area, rented %.
- **Under construction / planned:** % built (bar, latest DLD inspection), completion date (DLD), unit mix,
  **off-plan price premium** vs off-plan sales of the same type in its area, absorption rate (units sold ÷ units),
  launch price per sqft.
- A short summary line at the top (premiums, rented %, delivery record).

## Where each figure comes from
| Figure | Source |
|---|---|
| Project list, status, floors, photos | Propsearch developer guide, the developer's site; placeholders only if no render exists |
| Completion date, DLD target, % built, units | **DLD Project Status** (dubailand.gov.ae → Real estate project status): Fact Sheet + Inspection Details. Completed = the inspection that confirmed 100%. Invalid DLD dates (e.g. 01/01/0001) → "N/A" |
| Unit mix, rented % (active contracts ÷ units), yield | **DXB Interact** `/projects/<slug>` (find the slug with the page's search popup; a wrong slug shows "Project Analysis") |
| Absorption rate | DXB Interact absorption analysis, looked up per project (location id + developer) |
| Price / rent premium (ready) | DXB Interact house-prices page of the building vs its area, same type, Ready sales median /sqft and New rentals. Last 3 months; if fewer than 5 deals widen to 6, 9, 12 months and use the **same window for the area**; show the window on the card; "only N sales" / "no sales in 12 months" when still short |
| Off-plan premium | Same, with Status Off-plan, building vs its area (area slug from the project page title). Check 12 months first: under 5 sales → final; otherwise 3 → 6 → 9 → 12. Commercial = Type Commercial. Flag projects that are half or more of their area's sales ("the gap means little") |

**Never Property Monitor.** Never bulk-download. Area slugs that silently fall back to all of Dubai are wrong:
check the page title after each search.

## Template
Fill `UNITS.studio.dev` in the data file (format: `data-schema.md` → Developer section) and add the photos to
`data/<name>-img/dev/`. The template shows it as its own section after Supply & demand, with a menu link.
No `dev` data → no section (numbers and menu adjust).
