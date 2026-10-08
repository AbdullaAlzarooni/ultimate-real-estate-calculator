# Sources — websites, what to read, gotchas, fallbacks

Always note the **period** and the **date pulled** for each figure. Respect each site's terms;
read pages in the browser; don't scrape aggressively or bulk-export without the user's consent.

## Unit & project
| Site | Use for | Notes |
|---|---|---|
| Developer **sales offer / brochure** (PDF from user) | price on plan, sizes (internal + balcony), plan dates, DLD, admin fee, floor, view | Highest priority. If it shows DLD, use that exact amount. |
| **Reelly** – find.reelly.io | project facts, units & availability, **gallery (≈2000px)**, unit mix | Search box → project → "Units & Availability", photo gallery tabs. Gallery image URLs come via `/_next/image?url=<inner>`; the inner URL (S3 `.../projects/<id>/images/<hash>.webp`) is the full-size file. |
| **GenieMap** – geniemap.net | project info, price range, payment plans, unsold units, **gallery (720px)** | Prices shown are often the **maximum** (post-handover plan). "Units" tab = unsold stock only, not the building total. Gallery: click the › arrow and read each `img.currentSrc` (CDN serves 720px only). |
| Property Finder / Bayut new projects | fallback project facts | |

## Area comparables
**Property Monitor** – propertymonitor.ae/v2 (paid login). Best source: size-matched.
- Community names differ from DLD names (e.g. DLRC = "Dubai Residence Complex").
- Rent: data source Rentals, last 3 months, Apartment, beds, size ±10%. Results mix
  "Rental Contracts" and "Active Listings" → use contracts, **New** (not Renewal). Median.
- Sales: data source Sales; column "Evidence type" Oqood (off-plan) / Title Deed (ready);
  "Sales recurrence" Initial Sale / Resale. Off-plan = all Oqood (optimistic); Oqood Resale
  (conservative). Median psf.
- Gotchas: index table columns **by header text** (columns shift between searches); a hidden
  Beds filter (`select[name=valu_beds]`) persists between searches → reset to Show All;
  set rows per page (`select#max_rows`) to 250 and paginate (`insidePagination(n)`).
  Don't use Export/Download unless the user agrees.
- Market statistics page (community, year): bedroom mix of all sales; switch the "Oqood" tile
  for off-plan only; "Total Sales Value per Bedroom" table gives counts/averages.
- Project page (projects.php → `select#project_id` options map name→id →
  `project-details.php?project_id=<id>`): community **Units Supply Tracker** (ready, under
  construction, per-year handovers — read from `Highcharts.charts`) and a building's
  **Unit configuration** (units per bedroom + size ranges).

**DXB Interact** – dxbinteract.com (free tier limited). Community + beds + Apartment;
Sales → Status Off-plan → period "Last quarter" (picker → Last quarter → Apply → Search) → median
price/sqft. Rental → "New rentals" average annual rent. All sizes (not size-matched) → note that
smaller units sell for more per sqft, so it can flatter a larger unit.

**Bayut** – bayut.com market analysis (public).
- Off-plan sales: `/property-market-analysis/transactions/sale/off-plan/{studio|1-bedroom|2-bedroom|3-bedroom}-property/dubai/{community-slug}/?time_since_creation=3m`
  (must be the **off-plan** path; a page without location = all of Dubai).
- Rent: `/property-market-analysis/transactions/rent/{beds}-property/dubai/{slug}/?time_since_creation=3m`
- 12-month growth (for the growth bands): same pages, last 12 months, price and rent change.

**Fallbacks when a source isn't available:** use the sources you have (the report works with 1–3);
remove the missing source from `sources`; say which were used. Bayut alone + a sales offer is the
minimum for a report.

## Growth
Bayut market analysis, **last 12 months** change for off-plan price and rent (same beds, same
community) → apply growth bands (`rules.md`).

## Location & comfort
| Card | Site | How |
|---|---|---|
| Facing, road noise, street level | Google Maps (satellite) | pin the project; which side faces road/park; floor level |
| Sun | suncalc.org | sun path for 21 Jun & 21 Dec at the pin; which faces get afternoon sun |
| Shade | shademap.app | ready buildings: shade at 9am/3pm/5pm Jun & Dec. **Off-plan / new areas:** ShadeMap lacks the buildings → calculate: shadow = height ÷ tan(sun altitude) from planned heights (G+N ≈ 3.3 m per floor) |
| Aircraft noise | noise-map.com | community names often fail → search a nearby landmark, pan, tap → average dB. Over 55 dB affects the airport premium |
| Wind & sea | windy.com | only matters for beachfront |
| Flooding | news / Wikipedia (e.g. "2024 UAE floods") + Google search "<community> flooded April 2024" | state how strong the evidence is |
| Distances (metro, airport) | Google Maps | straight-line from the pin; confirmed lines/stations only |

## Supply & demand
- Property Monitor community supply tracker + market statistics (above).
- Optional zone sheet: DSC (Dubai Statistics Center) population by community 2022–2025, projected to
  the horizon year; existing + new units (PM / DXB Interact). Ratio = units ÷ (population ÷ people per home).
- Without PM: DXB Interact supply pages, or leave the section out (omit `sd` in the data).
