# Project sales, similar listings and the distressed test: how to collect the data

Read `modules.md` first (what each part shows and when it appears). Keep requests slow and small
(a few seconds between pages). **Never Property Monitor.**

## 0. Ask: resale or from the developer?
- **Resale by an owner (secondary market)** → the distressed deal test applies: set `distressed:true` and
  `market:"secondary"` (off-plan / post-handover; Ready is secondary by default).
- **Bought new from the developer (primary)** → no distressed test (off-plan / post-handover default; on Ready set
  `market:"primary"`). Market evidence and listings still help: they show what others paid and what owners ask.

## 1. This project's sales (`proj`, off-plan and post-handover)
1. DXB Interact → house prices → search the project (type the name in the location box and pick the
   project, e.g. "Weston, Dubai Land Residence Complex"; check the page title: a wrong slug silently shows all of Dubai).
2. Filter the unit type (Beds) and the last 12 months (or since launch); read every row: date, unit no.,
   sqft, price, seller (Developer / Individual).
3. Same-size band = the unit's size ±10%. **Median AED/sqft of the band** = `psf` (`n` sales, `period`);
   all sizes = `psf12` / `n12`. Fewer than 5 sales in the band → widen the window; still fewer than 5 →
   **leave `proj` out** (say so in the notes) rather than show a misleading median.
4. Owner resales ("Individual") → `resales`. For a resale, the seller's original price → `op`.
5. Real handover date: DLD → Project Status Enquiry (listings often quote earlier dates) → `handover`.

## 2. Similar listings now (`proj.listings` on off-plan / post-handover, `listings` on Ready)
**Property Finder**
- Location id: open any propertyfinder.ae page and call
  `/api/pwa/locations?locale=en&filters.name=<project>&pagination.limit=10` → `data.attributes[].id`.
- Search: `/en/search?l=<id>&c=1&bdr%5B%5D=<0 studio|1|2…>&ob=pa&page=<n>`; read `__NEXT_DATA__` →
  `props.pageProps.searchResult.listings[].property`: `id`, `price.value`, `size.value`, `furnished`,
  `listed_date`, `is_verified`, `share_url`, and **`completion_status`: "off_plan_primary" = sold new by the developer**.
**Bayut**
- `bayut.com/for-sale/<studio|1-bedroom|2-bedroom>-apartments/dubai/<community-slug>/<project-slug>/?sort=price_asc`
  (and `/page-2/`). Each card: id (`/property/details-<id>.html`), price, "Area: … sqft", and
  **"Initial Sale" = sold new by the developer**. Bayut may show a "Verify you are human" box: never tick it,
  ask the user to.
**Items** `[site, id, price, sqft, furnished Y|P|N|"", tower, "yymmdd" listed, verified 1|0, url tail, Bayut id if the
same unit is on both sites, new-from-developer 1|0]`. The unit in the report = `["me","self",price,size,…]`.
A unit on both sites (same price, size within 1 sqft) is one row with both links.
`base: {pf: "<Property Finder URL up to the id>", by: "https://www.bayut.com/property/details-"}`.
Units with the 11th field = 1 show **New** and are never counted as possible distressed deals.

## 3. Mortgage (off-plan)
Only when the developer has a bank deal (`bank-offers.md`, workflow step 1b) or the client asks for one:
`construction` (normal payment plan by month), that day's `eibor` (Central Bank of the UAE), `mortgage`,
`buyers`, `varDefaults`, plus `offer` for the bank deal. Start from `kit/data/example-belgravia-gardens-2br.js`.
Never in post-handover reports.

## Examples
- Off-plan resale with everything: `example-belgravia-gardens-2br.js` (distressed test, project sales,
  listings, mortgage with ADCB × Ellington).
- Off-plan from the developer: `example-weston-109.js` (project sales + listings; most listings are **New**).
- Ready: `example-binghatti-azure-distressed.js`, `example-binghatti-azure-mortgage.js`.
