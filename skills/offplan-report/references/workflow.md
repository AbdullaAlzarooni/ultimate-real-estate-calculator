# Workflow — exact steps, in order

Use a real browser (the user's Chrome if available, logged in to their data sites). Read pages;
don't download files unless the user agrees. Record every number with its source + date pulled.

## 0. Set up (once per machine / person)
- Copy `kit/` to a working folder. Fill `config/agent.js`; add `brand/` images if given.
- Note which accounts the user has: Property Monitor (PM), DXB Interact, Reelly, GenieMap.

## 1. Read the unit (sales offer / brochure / project page)
Priority: developer **sales offer PDF** > brochure > Reelly/GenieMap/Property Finder listing.
Capture: project, developer, unit no., type (studio/1BR…), floor, view, total size, **internal and
balcony split**, price **on the chosen payment plan**, payment-plan schedule (% + dates),
handover date, DLD amount if shown, admin/Oqood fee, service charge AED/sqft, furnished?, parking.
- If only a listing price is known: GenieMap prices are often the *maximum* (post-handover plan).
  Say "estimated" and, if the developer's plan discount is known, apply it.
- Years to handover = (handover date − today) in years, 2 decimals.
- **Brochures go out of date.** Check today's developer price and availability on Reelly ("Units &
  availability") or GenieMap; if it differs from the brochure, use today's price and say so in the notes.
  With a brochure (no unit chosen), use the **starting unit**: smallest size at the starting price, and check
  that price ÷ size falls inside the brochure's price-per-sqft range.
- **Image-only PDFs** (most brochures): text extraction returns nothing, so render the pages to images
  (PyMuPDF `fitz`, or `pdftoppm` from poppler) and read them; make a contact sheet to find the key pages.

## 2. Area comparables (3 sources, last 3 months, same bedroom type)
For each source get **(a) average/median annual rent** and **(b) off-plan price per sqft**:
- **Property Monitor** (best, size-matched ±10% of the unit size): rent = NEW contracts only,
  median; off-plan sales = Oqood, median psf of all (optimistic) and of Resales only (conservative).
- **DXB Interact**: last quarter, Rental "new rentals" average; Sales status Off-plan median psf.
- **Bayut**: market analysis, last 3 months (`?time_since_creation=3m`), off-plan transactions
  average psf; rent "average yearly rental".
Details, URLs and gotchas: `sources.md`. Min 5 deals per figure (widen to 6m/1y; else "no data").

## 3. Growth rates (shared by all sources)
Bayut market analysis, **last 12 months**: off-plan price change and rent change for that
bedroom type in that community. Apply the **growth bands** (`rules.md`) → "used" rates.
If a big jump comes from a tiny prior-year sample (Bayut shows the volume change), keep the band
result but add a note, and cross-check Property Monitor's area price index.

## 4. Premium factors
Check each with the evidence named in `rules.md` (metro distance, airport distance + noise,
view & obstruction, premium developer, waterfront, low supply, branded, holiday-home demand,
other confirmed infrastructure). Default 0, never negative, caps apply. One-line "why" each.

## 5. Valuation cases (selling price at handover)
- Optimistic = all off-plan sales psf (PM Oqood all, size-matched)
- Conservative = off-plan **resales** psf (PM Oqood resale, size-matched)
- Normal = midpoint. Non-PM sources reuse PM's resale/all ratio. No resale data at all →
  conservative = optimistic × 0.90, labelled "estimated (no resale data)".

## 6. Location & comfort cards (notes only — never change numbers)
Facing · Sun · Shade · Street level (low floors) · Road noise · Aircraft noise · Wind & sea ·
Flooding. Each card ends with clickable source links. How: `sources.md` (Google Maps,
suncalc.org, shademap.app, noise-map.com, windy.com, news/Wikipedia). Only write what you checked.

## 7. Supply & demand section
- Community supply: PM project page for the community (Supply tracker: ready units, under
  construction, handovers per year) **and** DXB Interact's supply page to cross-check. Show handover years
  up to the last year either source lists (don't invent later years; say "nothing listed after YYYY yet").
- **Include retail and offices:** PM splits ready / under-construction units into apartments, retail and
  offices; the building's shops go in its unit mix (e.g. `["Retail",17,"649–3,026"]`).
- What's selling: current-year sales **in the same categories as the building** (e.g. Studio · 1 Bed ·
  2 Bed · Retail) so the two donuts compare side by side. Best source: **Property Finder transactions**
  (`propertyfinder.ae/en/transactions/buy/dubai/<area>`, period YTD): beds via `?bdr[]=0|1|2…`; switch
  Residential → **Commercial** → Property type **Shop** (or Office Space) to count shops separately. The page
  text shows 0 for counts, so read the "Transactions" figure from the screen. PM statistics cover homes only;
  DXB Interact lumps shops + offices as "Commercial". Take all categories from one source; leave out types
  the building doesn't have.
- This building's unit mix: PM project page "Unit configuration" (units per type + size ranges).
  Fallback: Reelly project page (Units & availability).
- Zone oversupply (optional): a supply & demand sheet (existing + new units vs projected
  population ÷ people per home). Show it as a **range** (2–3 people per home), not a verdict.
- Write: one takeaway sentence, a "matches what's selling" line, 4 short key points.

## 8. Photos
**Always check both** Reelly (≈2000px) and GenieMap (up to 1440px) when the user has them.
Compare every photo across both (contact sheet): same render → keep the larger file; different render
(even of the same view, e.g. different lighting) → keep both.
**Remove duplicates** (same render in both → keep the larger), order: exteriors → rooftop/amenities →
lobby → interiors → location map. Save as `data/<name>-img/NN.webp` (max 1920px), caption each.
Ask before bulk-downloading if the user hasn't asked for photos.

## 9. Fill the data file, build, verify
- Copy `data/example-weston-109.js`, replace every value (see `data-schema.md`). Keep sources'
  `period`, `asOf`, `sample`, `how` honest.
- `python3 build.py data/<name>.js`
- `node tools/domtest.js <name>.html </dev/null` → prints title/verdict/counts, no error.
- `node tools/dump.js <name>.html` → `bad 0 []` (renders all 144 source×case×market×rent states).
- If the user has the evaluation Google Sheet: enter the same inputs (yellow/red cells only) and
  compare net rent, yield, selling price, profit %; or run `node tools/sheetcheck.js <name>.html 0`
  (re-implements the sheet formulas; max diff must be 0).
- Look at it: serve the folder (`python3 -m http.server`), check phone width (390px) and desktop,
  dark and light mode: no sideways scroll, nothing overlapping, all photos load.
- Re-read all text for contradictions (e.g. "road in front" vs "park in front").

## 10. Client PDF
Headless Chrome (print CSS already hides controls/what-ifs and shows the recommended view):
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --no-pdf-header-footer --user-data-dir=/tmp/chrome-pdf --virtual-time-budget=4000 --print-to-pdf="$PWD/<Name>-client.pdf" \
  "file://$PWD/<name>.html"    # the process may hang after writing: kill it once the file exists
```
Keep `--virtual-time-budget` under 5000 (ms) so the slideshow hasn't moved past the first photo.
Set `pdf:"<Name>-client.pdf"` in the data file so the "Download PDF" button links to it.

## 11. Share
- Claude.ai Artifacts (if available): publish `<name>.html` with `files` = every path in
  `<name>.files.txt`, **published at exactly that path, including `data/`** (e.g.
  `"data/<name>-img/01.webp"`; otherwise the photos don't show), + the PDF, and `capabilities: {downloads: true}` (needed for Download PDF).
  Update the same artifact URL on later changes. Artifacts start private — remind the user to Share.
- Otherwise: zip `<name>.html` + `data/<name>-img/` + PDF, or host the folder (any static host).

## 12. Hand-over message
Short: link, the verdict line, profit at handover, net rent + yield, what you could not verify,
and any open questions for the developer (exact facade/view, admin fee, phases).
