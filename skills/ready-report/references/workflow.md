# Workflow — exact steps, in order

Use a real browser (the user's Chrome, logged in to their data sites). Read pages; don't download files unless
the user agrees. Record every number with its source + date pulled. Keep requests small and slow.

## 0. Set up (once per machine / person)
- Copy `kit/` to a working folder. Fill `config/agent.js`; add `brand/` images if given.
- Note which accounts the user has (DXB Interact). **Never use Property Monitor** (`sources.md`).
- Ask about the optional **Developer section** (SKILL.md step 2b) before collecting data.

## 1. Read the unit (listing)
Price, built-up size, balcony (→ inside size), unit type, furnished?, floor, parking, building, community.
Then DLD Project Status: completion = the inspection that confirmed 100% built (`completedDate`, "YYYY-MM"),
planned date (`plannedDate`), floors (`height`, full layout e.g. "B+G+4P+18+R · 23 floors"), units.
Service charge AED/sqft: DLD Service Charge Index (this year). Note what the listing doesn't say (vacant or
tenanted?) as an open question.

## 2. Comparables (2 sources, same building, same type)
For each source get **(a) median new-lease rent** and **(b) median sale price per sqft**, in **one custom window**
(the shortest that reaches 5 sales; rent uses the same window):
- **DXB Interact** (main): the building, size-matched ±10% (`P74_MIN_SIZE` / `P74_MAX_SIZE`), ready, Apartment.
  List the sales used in `ev.sales`.
- **Bayut**: the building's transactions, last 3 months, medians from the rows (new 12-month leases only).
Too few at this size → all sizes in the building (say so) → size multiplier for rent (`rules.md`) → "no data".
Also note the building's 12-month and 3-month medians (`market`) for the market note.

## 3. Furnished premium
Bayut listings in the building: furnished vs unfurnished asking rent (counts, medians, ranges) and asking prices.
Premium = the gap, calibrated to the signed rent level → `furn.prem`; furniture cost estimate → `furn.cost`.

## 4. Growth and building age
- Bayut, community, same type, last 12 months: price and rent change → growth bands (`rules.md`) → `growth`.
  Cross-check DXB Interact's 12- and 6-month change boxes for the area; mention a turn in the notes.
- Building age: the community's ready sales by building age (DXB Interact `P74_AGE`, Bayut) → `growth.age`
  (`rate`, `rate2`, `after`, `bands`, `src`, `rule`).

## 4b. Similar listings now; resale or new?
Every similar unit for sale on Property Finder and Bayut in this building (`listings`), marking units still
sold by the developer. Resale (normal for ready units) → the distressed test can be switched on with `distressed:true`;
a mortgage report → `mortgageReport:true`, `defBuyer:1`. How: `listings-and-evidence.md`, `modules.md`.

## 5. Mortgage inputs
That day's EIBOR from the Central Bank → `eibor` (date, rates, default tenor 3M). Defaults: rate, term, fixed years,
release fee, insurance %, margin (`data-schema.md`). Loan limits per buyer type (`rules.md`).

## 6. Premium factors
Check each (metro, airport + noise, view, developer, waterfront, low supply, branded, holiday-home demand, other
infrastructure). For a ready unit compared with its own building, most are already in the price → 0 with a "why".

## 7. Location & comfort, view map
Same as the Off-plan Report (`../../offplan-report/references/workflow.md` steps 6 and 6b): comfort cards with
source links (facing, road, construction next door, sun, shade, aircraft noise, wind & sea, flooding, getting
around, building), and the view map (GIS DDA area → `viewmap.py` + `satview.py`; otherwise Google Maps wedges).

## 8. Supply & demand
DXB Interact (`sources.md`): supply Active + Finished (every page), handovers by DLD year, what buyers bought in
the last 12 months (Beds donut + Commercial), the building's unit mix with size ranges. Write one takeaway,
a "matches what's selling" line and 4 key points.

## 8b. Developer section (only if the user said yes)
Follow `developer-section.md`. Photos in `data/<name>-img/dev/`.

## 8c. Photos
8+ developer renders of the building (exteriors → amenities → lobby → interiors), no watermarks, saved as
`data/<name>-img/NN.webp` (max 1600–1920px), captioned. Ask before bulk-downloading.

## 9. Fill the data file, build, verify
- Copy `data/example-binghatti-azure-studio.js`, replace every value (`data-schema.md`).
- `python3 build.py data/<name>.js`
- Serve the folder (`python3 -m http.server`) and open the report: **no console errors**; click every Rent / Data /
  Mortgage / buyer / fixed-period / EIBOR option and every hold and market box; check phone width (390px) and
  desktop, dark and light: no sideways scroll, nothing overlapping.
- **Every image must appear (hard rule).** Scroll to the bottom (photos load lazily), then run
  `[...document.images].filter(i=>i.getAttribute("src")&&(!i.complete||!i.naturalWidth)).map(i=>i.src)` in the
  page: it must return `[]`. Also check every path in `<name>.files.txt` exists (developer cards show 12 at a
  time). Fix any broken image before delivering; the grey "Photo not available" box is only a safety net.
- If the user has the Ready Property Evaluation Form (Google Sheet): enter the same inputs (yellow/red cells
  only) and compare fees, service charge, net rent, yield, next-year yield, capital growth, selling price and
  profit row by row. Small gaps from rounding a % in the sheet are fine; say where they come from.
- Re-read all text for contradictions.

## 10. Client PDF
Headless Chrome (print CSS hides the controls and what-ifs and shows the recommended view):
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --no-pdf-header-footer --user-data-dir=/tmp/chrome-pdf --virtual-time-budget=15000 --print-to-pdf="$PWD/<Name>-client.pdf" \
  "http://localhost:8000/<name>.html"    # the process may hang after writing: kill it once the file exists
```
Set `pdf:"<Name>-client.pdf"` in the data file so the "Download PDF" button links to it. Open the PDF and check
every page (photos, developer cards).

## 11. Share
- Claude.ai Artifacts (if available): publish `<name>.html` with `files` = every path in `<name>.files.txt`,
  **published at exactly that path, including `data/`**, + the PDF, and `capabilities: {downloads: true}`.
  Update the same artifact URL on later changes. Artifacts start private — remind the user to Share.
- Otherwise: zip `<name>.html` + `data/<name>-img/` + PDF, or host the folder (any static host).

## 12. Hand-over message
Short: link, the verdict line, net rent + yield (cash, and with the default mortgage), sale after N years, what
you could not verify, and open questions (vacant or tenanted, service charge, mortgage terms).
