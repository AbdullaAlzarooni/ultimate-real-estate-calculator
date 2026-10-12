# Sources — websites, what to read, gotchas, fallbacks

Always note the **period** and the **date pulled** for each figure. Respect each site's terms; read pages in
the browser; keep requests small and slow (a few seconds between searches); never bulk-export without the
user's consent.

## Never Property Monitor
Property Monitor (propertymonitor.ae) prohibits AI / automated use. Do not open, log in to, read or scrape it,
even if the user has an account and asks. Everything below comes from DXB Interact, Bayut, DLD and public
sites instead. If the user wants a Property Monitor figure, they look it up themselves and type it in.

## The unit
| Site | Use for | Notes |
|---|---|---|
| **Listing** (Bayut / Property Finder link, or details from the user) | price, built-up size, balcony, furnished, floor, parking, completion year | Inside size = built-up − balcony when the listing gives the balcony. Bayut listings usually have **no unit number**: floor-plan labels ("Unit 34 Floor 7") are layout matches, not this unit, so don't use them. Show the listing link only as an internal line (`noprint`). |
| **DLD Project Status** – dubailand.gov.ae → Real estate project status | completion: the **Inspection Details** tab, date of the inspection that confirmed 100% built (the "Completion" field is the *planned* date); total units by type | Search by project name, no captcha. Invalid dates (01/01/0001) → "N/A". |
| **DLD Service Charge Index** | service charge AED/sqft for this year, with the breakdown | DXB Interact's project page also shows it; confirm on DLD. |
| Developer site, agency project pages, Property Finder new-projects pages | building photos (developer renders) | **Never remove watermarks**; use unwatermarked developer renders (Property Finder new projects: `…/gallery/image/<id>/original.webp`). Label interiors "show render". Aim for 8+ photos. |

## Sales and rents in the building (main: DXB Interact, size-matched)
**DXB Interact** – dxbinteract.com (free tier). It's an Oracle APEX app; typing in the area box often doesn't stick.
What works (in page JS): type into `input[type=search]`, wait, then `.click()` the matching `<article>` suggestion
→ check `P74_DLD_LOCATION`. Pick the **building** (not the community) for the comparables.
- `P74_DEAL` SALE / RENT · `P74_START_DATE` / `P74_END_DATE` (custom window) · Beds `li[data-value="0"]` Studio ·
  Apartment · status Ready · then click `#searchResult`. Rentals: "Rental" radio, `li[data-value="N"]` "New".
- **Size-matched (±10% of the unit's size):** `apex.item('P74_MIN_SIZE')` and `apex.item('P74_MAX_SIZE')`
  (e.g. 308 and 376 for a 342 sqft unit) before Search.
- **One source = one period for rent and sales.** Use the shortest **custom** window that reaches **5 sales**
  (e.g. 1 Jun – today), not a jump to 6 or 12 months; rent uses the same window.
- **Medians from the deal list**, never the site's summary average. List the sales used (date, unit, sqft, AED,
  note such as "80% LTV") in the source's `ev.sales`.
- **Non-market transfers:** prices far below the rest (share transfers, gifts) → set `P74_MIN_PRICE_SQFT` just
  below the lowest genuine sale, same minimum for building and area; say so in `how`.
- **Building age:** `P74_AGE` → the area's ready sales by building age (for the age discount, `rules.md`).
- **Area trend:** each result box shows the change vs the previous period of the same length; quote the 12- and
  6-month boxes for the area (price and new rents).
- **Rented units, unit mix, yield:** the project page `dxbinteract.com/projects/<slug>` (find the slug with the
  page's search popup; a wrong slug shows "Project Analysis"). Values load by ajax: wait a few seconds.

**Bayut** (public, second source).
- Transactions for the building: market analysis → transactions, ready, the building, last 3 months.
  Rent lists mix NEW and RENEWAL, short leases (contract amount, not yearly) and future start dates → keep
  **new 12-month leases that already started**, size-matched; medians from the rows.
- **Furnished premium:** Bayut listings in the building, furnished vs unfurnished asking rent (and asking
  prices), calibrated to what tenants actually sign. Note the counts and ranges in `furn`.
- **12-month growth** (for the growth bands): Bayut market analysis, the community, same beds, last 12 months,
  ready sales price change and rent change.

**Fallbacks:** the report works with 1–2 sources. Bayut + the listing is the minimum. Too few deals at this size →
all sizes in the building (say so in `how`), then the size multiplier for rent (`rules.md`), else "no data".

## Mortgage inputs
- **EIBOR:** Central Bank of the UAE, https://centralbank.ae/en/forex-eibor/eibor-rates/ — read **that day's**
  fixing (1M, 3M, 6M, 1Y) into `eibor` with the date. Every report.
- Loan limits (Central Bank) and fees: `rules.md`. Bank margin default 1.50% (lowest published about 1.00%,
  most 1.25–1.99%).

## Supply & demand (DXB Interact)
- **Supply:** Supply → **Total units** (`/dubai-units-supply-analysis`). Area = the **official DLD name** (JVC =
  "Al Barsha South Fourth"; type part of it and pick from the list). Status **Active** = not finished, **Finished**
  = ready. Page through every page ("Next", 15 projects a page) and add up units per DLD completion year.
  Units whose DLD date has passed but aren't finished → their own bar "Target passed"; leave out Active projects
  with 2009–2016 targets (stalled); list undated units in the note.
- **Demand (what's selling):** the area's sales page, last 12 months → **Beds** button: a donut with the count per
  bedroom type. Commercial is not in that chart: Type = Commercial → read the Transactions count.
- **This building's unit mix:** the project page (units per type) + the building's sales page → Beds (size ranges).
- No DXB Interact → leave the section out (omit `sd`).

## Location & comfort, view map
Same sites and methods as the Off-plan Report (`../../offplan-report/references/sources.md`, "Location & comfort"):
Google Maps, GIS DDA (DDA areas only; `kit/tools/dda-plots.js`, `viewmap.py`, `satview.py`), SunCalc, ShadeMap
(ready buildings usually have shade data; if not, calculate it and say so), noise-map.com, Windy, news for flooding.
