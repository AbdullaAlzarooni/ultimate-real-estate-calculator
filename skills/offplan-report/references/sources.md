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
**Never use Property Monitor.** Property Monitor (propertymonitor.ae) prohibits AI / automated use. Do not open,
log in to, read or scrape it, even if the user has an account and asks. Everything below comes from DXB Interact,
Bayut, DLD, Reelly and the developer instead. If the user wants a Property Monitor figure, they look it up
themselves and type it in; check with Property Monitor that their terms allow showing it to clients.

**DXB Interact** – dxbinteract.com (free tier limited). **Main source: size-matched.** Community (or the building)
+ beds + Apartment; Sales → Status Off-plan → period "Last quarter" (picker → Last quarter → Apply → Search) → median
price/sqft. Rental → "New rentals" average annual rent.
- **Size-matched (±10% of the unit size):** set `apex.item('P74_MIN_SIZE')` and `apex.item('P74_MAX_SIZE')`
  (e.g. 313 and 383 for a 348 sqft unit) before Search. Use the shortest window that reaches **5 sales**
  (3 months → custom start date), same window for rent. Without the size filter DXB covers all sizes, and smaller
  units sell for more per sqft, so it can flatter a larger unit.
- **Optimistic vs conservative (off-plan):** all off-plan sales = optimistic; off-plan **resales** only
  ("Sold by" Individual, not Developer) = conservative. Same size filter for both.
- **Building age filter:** `P74_AGE` (ready reports: sales by building age).
- **Price / rent trend (area):** each result box shows the change vs the previous period of the same length
  (e.g. 6 months vs the 6 before). Quote that box, for 12 and 6 months.
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
bedroom and **commercial** units (see Supply & demand below).
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

## Supply & demand (DXB Interact)
- **Supply:** Supply → **Total units** (`/dubai-units-supply-analysis`). Area = the **official DLD name**
  (JVC = "Al Barsha South Fourth"; type part of it and pick from the list). Status **Active** = not finished,
  **Finished** = ready. Page through every page ("Next", 15 projects a page) and add up units per type and per
  DLD completion year. **Ready** = Finished total (note it counts only DLD-registered projects).
  **Under construction** = Active with a date from 2017 on; show units whose DLD date has already passed as their
  own bar ("Target passed"), list undated projects separately, and leave out Active projects with 2009–2016 targets
  (stalled). Handovers per year = the remaining Active units by DLD year.
- **Demand (what's selling):** the area's sales page, last 12 months → **Beds** button: a table (size range,
  median price) plus a donut with the **count** per bedroom type. Commercial is not in that chart: Type =
  Commercial → read the Transactions box (rows say Shop or Office).
- **This building's unit breakdown:** `dxbinteract.com/projects/<slug>` ("Studio – 53% (343)" per type).
  Size ranges: the building's sales page → **Beds** button (since launch). New launches not on DXB yet →
  Reelly "Units & Availability" (note if it shows only available units, not the full building).
- Optional zone sheet: DSC (Dubai Statistics Center) population by community 2022–2025, projected to
  the horizon year; existing + new units (DXB Interact). Ratio = units ÷ (population ÷ people per home).
  Ratios: if a number looks unreasonable (tiny or booming population, odd totals) show **N/A**, don't force it.
- If DXB Interact is not available, leave the section out (omit `sd` in the data).
