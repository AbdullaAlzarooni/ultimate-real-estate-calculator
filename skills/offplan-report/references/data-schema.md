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
