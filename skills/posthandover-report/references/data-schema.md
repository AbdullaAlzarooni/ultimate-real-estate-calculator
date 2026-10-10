# Data file (`data/<name>.js`) — every field

Start from `kit/data/example-weston-109.js` (a complete real example). One unit = `UNITS.studio`
(the key name is not important; one entry). Agent details come from `config/agent.js`.

| Field | Meaning | Example |
|---|---|---|
| label | unit type shown in the title | "Studio" |
| heroImgs | `[["<name>-img/01.webp","Caption"], ...]` files under `data/` | 44 photos |
| heroCredit | credit line on photos | "Renders: Wadan Developments (via Reelly & GenieMap)" |
| pdf | client PDF file name | "Weston-109-client.pdf" |
| project, unit, area, emirate | names shown in the hero | "Weston by Wadan", "Studio · Unit 109", "Dubai Land Residence Complex (DLRC)", "Dubai" |
| date, offer | prepared date; source document | "8 Oct 2026", "Wadan sales offer WES-SO-109-58" |
| price, size, internal, balcony | AED; sqft (internal+balcony = size when known) | 645241, 482.65, 362.31, 120.34 |
| sc, floor, view, furnished, furnText, parking, handover | service charge AED/sqft etc.; `furnText` optional label (e.g. "Semi-furnished (kitchen appliances)") | 15, "1 of G+17", "Boulevard", true, 1, "31 Dec 2028" |
| years | years to handover | 2.23 |
| dldPct, dldAdmin, oqood | DLD %, extra DLD admin (0 if offer shows DLD, else 40), admin fee | 4, 0, 3500 |
| dldNote | note under the plan (when DLD from offer) | see rules.md |
| planName, plan, paidBeforeHandover | `[["On booking · date",20],...]`, % paid before handover | "50/50", ..., 50 |
| furnPrem, mgmt, util, furniture, commission | furnished premium AED, mgmt %, utilities/month, furniture AED, commission % | 5000, 0, 0, 0, 2 |
| growth.rent / growth.price | `{raw, used, src, rule}` (Bayut 12 m, after bands) | 4.9 → 4.9; 5.4 → 5.0 |
| cases | `[{n:"Conservative",psf,why},{n:"Normal",...},{n:"Optimistic",...}]` | 1351 / 1431.75 / 1512.5 |
| scenarios | keep as in the example (−5, 0, base, strong) | |
| factors | `[{n,v:[rent%,appr%],on:true?,why}]` all 9 factors, 0 when not applicable | Metro 0.5/1.5 … |
| sources | `[{k,name,rent,psf,sample,period,asOf,how,main?}]` 1–3 sources; `main:true` on the size-matched one | DXB / Bayut / PM |
| comfort | `[{k,v,d,src:[[label,url]],tone}]` cards (tone good/warn/neutral) | 8 cards |
| notes | Things-to-know bullets (HTML allowed, short, no repeated numbers) | 7 notes |
| sd | Supply & demand (omit to hide the section): `area, period, takeaway, match, mix:[[type,count]], mine, mixNote, bldg:{name,total,mix:[[type,count,"min–max"]],note}, ready, uc, years:[[year,units]], peak, points:[{fig,tone,t,d}], src:[[label,url]]` | see example |

After editing: `python3 build.py data/<name>.js` and run the checks in workflow step 9.

## viewMap (every report)
`UNITS.studio.viewMap={plot:"6488712",height:"G+17",svg:"<svg…>"}` — made by `tools/viewmap.py`. Neighbours: green = open space / low-rise (≤G+2, mosque), amber = 6+ floors lower than this building, red = same height or taller. Shown as a card at the top of Location & comfort; hidden when absent.
Add the satellite image with `sat:"<name>-img/view-sat.jpg"` (made by `tools/satview.py`; build.py publishes it). Outside GIS DDA the object is just `{sat:"…", note:"optional caption"}`.


## Post-handover fields (this calculator)
Same file as the off-plan report, plus:
| Field | Example | Meaning |
|---|---|---|
| `title` | `"Weston by Wadan PHPP"` | browser tab / gallery name (optional) |
| `label` | `"Studio · 60/40 PHPP"` | unit label in the heading; include the plan |
| `price` | `690407.87` | price **on the post-handover plan** (usually higher than the standard plan) |
| `planName` | `"60/40 post-handover"` | plan name in the text |
| `paidBeforeHandover` | `60` | % paid up to and including handover |
| `postPct` | `40` | % paid **after** handover |
| `phppYears` | `3` | length of the post-handover plan, in years (sets the empty-months slider: 3 → 36 months) |
| `phppEnd` | `"Dec 2031"` | last instalment |
| `phppByYear` | `[[2029,14],[2030,14],[2031,12]]` | % of price paid in each calendar year after handover (rent-vs-instalments table) |
| `planRows` | `[["Down payment · 3 Oct 2026",20], …]` | every instalment row with its % |
| `planBar` | `[["Down payment",20,"pre"], …, ["After handover",40,"post"]]` | timeline bar; phases `pre` / `done` / `post` |
| `holdYears` | `5.18` | years from today to the last instalment |
| `priceGrowthTo` | `"handover"` | price growth stops at handover (sell-at-handover valuation) |
| `vacancyMonths` | `0` | default empty months after handover (the slider starts here; usually 0) |
| `coverNote` | text | one line under the rent-vs-instalments table |
