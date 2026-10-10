# Sources — websites, what to read, gotchas, fallbacks

Always note the **period** and the **date pulled** for each figure. Respect each site's terms;
read pages in the browser; don't scrape aggressively or bulk-export without the user's consent.

## Unit & project
| Site | Use for | Notes |
|---|---|---|
| Developer **sales offer / brochure** (PDF from user) | price on plan, sizes (internal + balcony), plan dates, DLD, admin fee, floor, view | Highest priority. If it shows DLD, use that exact amount. |
| **Reelly** – find.reelly.io | project facts, units & availability, **gallery (≈2000px)**, unit mix | Search box → project → "Units & Availability", photo gallery tabs. Gallery image URLs come via `/_next/image?url=<inner>`; the inner URL (S3 `.../projects/<id>/images/<hash>.webp`) is the full-size file. |
| **GenieMap** – geniemap.net (**paid**, optional; Reelly covers most of it) | project info, price range, payment plans (**admin fee is written in the plan header**, e.g. "10% + 4% DLD + 5,000 AED Admin fee"), service charge, furnishing, resale-after %, discounts, unsold units, **gallery (up to 1440px)** | Prices shown are often the **maximum** (post-handover plan). "Units" tab = unsold stock only, not the building total. Gallery: open the photo viewer and click › through every photo, reading the `1440_` `img.currentSrc` each time (a 1440px copy only exists once viewed; thumbnails are `320_`). |
| Property Finder / Bayut new projects | fallback project facts | |
| **Property Finder transactions** – propertyfinder.ae/en/transactions | sales counts by bedroom **and by commercial type (Shop / Office Space / Warehouse)** for the demand chart | Public. YTD default; `?bdr[]=0` studio, `1`, `2`…; Commercial via the Residential dropdown. Read the Transactions box visually (page text shows 0). |

## Area comparables
**Property Monitor** – propertymonitor.ae/v2 (paid login). Best source: size-matched.
- Community names differ from DLD names (e.g. DLRC = "Dubai Residence Complex").
- Data sources in the search: **Residential sales** (`Sales`), **Commercial sales** (`COMM`: Retail,
  Office, Land… by Unit Type), **Rentals**.
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
- Community page price/rent index: the bars are **monthly** changes; quote the summary lines below them
  ("Last 12 / 6 / 3 months change"), never a single month's bar as a period change.

**DXB Interact** – dxbinteract.com (free tier limited). Community + beds + Apartment;
Sales → Status Off-plan → period "Last quarter" (picker → Last quarter → Apply → Search) → median
price/sqft. Rental → "New rentals" average annual rent. All sizes (not size-matched) → note that
smaller units sell for more per sqft, so it can flatter a larger unit.
DXB Interact is an Oracle APEX app; typing in the area box often doesn't stick. What works (in page JS):
type into `input[type=search]`, wait, then `.click()` the matching `<article>` suggestion → check
`P74_DLD_LOCATION` (e.g. `al-jaddaf`). Beds = `li[data-value="0"]` "Studio"; status = `li[data-value="Y"]`
"Off-plan"; date = `button.drp-preset` "Last quarter"; then click `#searchResult`. Rentals: click the
"Rental" radio, pick `li[data-value="N"]` "New", search again. **Always include DXB Interact** when the
user has it; never drop a source silently — if it truly fails, tell the user and ask.
**Non-market transfers (check every sales list):** DXB Interact lists every registered transfer, including share
transfers, gifts and partial-ownership deals at absurd prices (e.g. a 985 sqft unit "sold" for AED 55,006 =
AED 56/sqft). **Only if such rows appear** (prices far below the rest, typically < 40% of the area's median psf),
set a **minimum price/sqft** that removes them without touching real sales: pick a value clearly below the lowest
genuine sale (AED 500/sqft fits most areas; higher in prime areas such as Downtown or Palm) with
`apex.item('P74_MIN_PRICE_SQFT').setValue('<value>')`, and apply the **same minimum to the building and the area**
so they compare fairly. Note it in the source's `how` ("sales below AED 500/sqft removed: 28 non-market
transfers"). No such rows → no filter.
**Supply page** (`/dubai-units-supply-analysis`): `apex.item('P59_AREA_ID').setValue(<area id>)`,
`apex.item('P59_STATUS').setValue('ac')` (under construction) → projects with completion date, units by
bedroom and **commercial** units. Use it to cross-check Property Monitor's handover years.
**Commercial sales:** Type = Commercial; each row says "Offplan/Ready **Shop**" (retail) or "**Office**".
The list shows 13 rows per page; page links are `#action$paginate?min=14…`; dispatch a real
`MouseEvent('click')` on each link inside `#report_soldhistory` and read the rows after each.

**Bayut** – bayut.com market analysis (public).
- Off-plan sales: `/property-market-analysis/transactions/sale/off-plan/{studio|1-bedroom|2-bedroom|3-bedroom}-property/dubai/{community-slug}/?time_since_creation=3m`
  (must be the **off-plan** path; a page without location = all of Dubai).
- Rent: `/property-market-analysis/transactions/rent/{beds}-property/dubai/{slug}/?time_since_creation=3m`
- 12-month growth (for the growth bands): same pages, last 12 months, price and rent change.

**No GenieMap account?** Use Reelly for project facts, payment plans, unit mix and photos (Reelly photos are larger: ≈2000px vs 720px).

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
| Neighbour heights (view & shade) | **GIS DDA** – gis.dda.gov.ae/DIS (free, no login) | only for DDA areas (Dubailand, DLRC, DSO, Al Barsha South, Motor City, Sports City…). **No plot number needed:** take the building's pin from Google Maps (the `@lat,lon` in the place URL), open GIS DDA, wait for the map, then run `kit/tools/dda-plots.js` in the page (set LAT/LON in its last line). It finds the plot under the pin and every plot within 60 m, with the side each one is on (N/NE/…), distance, **Maximum Height** (e.g. G+17) and land use. **View map:** export the plot outlines with heights (same query, `returnGeometry`, metres from the plot centre) into a plots file and run `python3 tools/viewmap.py <plots.txt> <section> <plot> 120`; paste the printed `UNITS.studio.viewMap=…;` line into the data file before END DATA. The report then shows a green / amber / red map of the neighbours in Location & comfort. By hand: zoom to the same spot until plot lines show, click the plot (or type the plot number in the search box) → Plot Info, then click every plot around it. An OPEN SPACE / park plot = protected view; an empty plot with G+N allowed = the view can be built out later. If the area isn't in GIS DDA (Dubai Municipality / other master developers), use the developer's masterplan or say "not checked" |
| Shade | shademap.app | ready buildings: shade at 9am/3pm/5pm Jun & Dec. **Off-plan / new areas:** ShadeMap lacks the buildings → calculate: shadow = height ÷ tan(sun altitude) from planned heights (G+N ≈ 3.3 m per floor) |
| Aircraft noise | noise-map.com | community names often fail → search a nearby landmark, pan, tap → average dB. Over 55 dB affects the airport premium |
| Wind & sea | windy.com (+ Google Maps for distance to coast) | **every report has this card.** Inland → "Not exposed" with the distance to the coast. Beachfront / waterfront → check prevailing wind direction and strength, sea spray / salt, which side gets the wind |
| Flooding | news / Wikipedia (e.g. "2024 UAE floods") + Google search "<community> flooded April 2024" | state how strong the evidence is |
| Distances (metro, airport) | Google Maps | straight-line from the pin; confirmed lines/stations only |

## Supply & demand
- Property Monitor community supply tracker + market statistics (above).
- Optional zone sheet: DSC (Dubai Statistics Center) population by community 2022–2025, projected to
  the horizon year; existing + new units (PM / DXB Interact). Ratio = units ÷ (population ÷ people per home).
- **Project unit breakdown** (units per type – studio/1BR/2BR… – and size ranges, for "This building"):
  Property Monitor project page → Unit configuration. **No PM access → Reelly** project →
  "Units & Availability" (count units per type; note if it shows only available units, not the full building).
- **No PM access → DXB Interact.** Build the **same supply section** from DXB Interact
  (community page): what's selling (off-plan sales by bedrooms → counts), ready vs under-construction
  units, and handovers by year. Ready/under-construction counts use the supply & demand sheet method:
  **ready = existing (completed) units** in the community; **under construction = new units handing over
  up to the horizon year** (the last handover year in the pipeline), split by year. Building unit breakdown → Reelly (above). Same cards, same wording.
  Ratios: if a number looks unreasonable (tiny or booming population, odd totals) show **N/A**, don't force it.
- If neither PM nor DXB Interact is available, leave the section out (omit `sd` in the data).
