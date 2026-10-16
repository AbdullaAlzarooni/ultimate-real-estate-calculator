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
| sources | `[{k,name,rent,psf,sample,period,asOf,how,main?}]` 1–3 sources; `main:true` on the size-matched one | DXB / Bayut |
| comfort | `[{k,v,d,src:[[label,url]],tone}]` cards (tone good/warn/neutral) | 8 cards |
| notes | Things-to-know bullets (HTML allowed, short, no repeated numbers) | 7 notes |
| sd | Supply & demand (omit to hide the section): `area, period, takeaway, match, mix:[[type,count]], mine, mixNote, bldg:{name,total,mix:[[type,count,"min–max"]],note}, ready, uc, years:[[year,units]], peak, points:[{fig,tone,t,d}], src:[[label,url]]` | see example |

After editing: `python3 build.py data/<name>.js` and run the checks in workflow step 9.

## viewMap (every report)
`UNITS.studio.viewMap={plot:"6488712",height:"G+17",svg:"<svg…>"}` — made by `tools/viewmap.py`. Neighbours: green = open space / low-rise (≤G+2, mosque), amber = 6+ floors lower than this building, red = same height or taller. Shown as a card at the top of Location & comfort; hidden when absent.
Add the satellite image with `sat:"<name>-img/view-sat.jpg"` (made by `tools/satview.py`; build.py publishes it). Outside GIS DDA the object is just `{sat:"…", note:"optional caption"}`.

## Developer section (optional · `UNITS.studio.dev`)
Only when the client said yes (SKILL.md step 2b). Leave it out and the section, its menu link and its number disappear.
```js
UNITS.studio.dev={
  name:"Binghatti",                       // developer name
  areas:{ jvc:{label:"JVC",               // one entry per area key used by ready buildings
    psf3:1460, rS3:45000, r13:63500,      // area, last 3 months, all types: sale median /sqft, studio rent, 1-bed rent
    types:{ "Studio":{psf:1460,tx:296,rent:45000,rn:1854}, "1 Bed":{…} },   // area, last 3 months, per type
    tw:{ "6":{"2 Beds":{psf:1130,tx:301,rent:100000,rn:1394}}, "12":{…} } } },  // area at a widened window (months)
  ready:[{ n:"Binghatti Azure", a:"jvc", img:"<name>-img/dev/binghatti-azure.jpg",
    comp:"2025", cd:"2025-06-11", plan:"2024-12-31", cdSrc:"DLD",   // completed date (DLD 100% inspection), DLD target
    units:650, rented:351, mix:[["Studio",343],["1 Bed",179],["2 Beds",62],["Commercial",66]],
    psf3:1440, tx3:17, rent3:45000, rn3:56, rk:"RS",                 // building, last 3 months (summary line)
    types:[{t:"Studio",psf:1670,tx:7,rent:45000,rn:56},               // building per type, last 3 months …
           {t:"2 Beds",psf:1230,tx:11,sw:12,rent:103000,rn:7,rw:6}] }],  // … sw/rw = widened window (months)
  uc:[{ n:"Binghatti Ruby", loc:"JVC District 16", st:"uc", comp:"Q4 2027", fl:"25", img:"…",
    dld:{t:"2026-02-28", d:"2026-07-23", p:46.43},                    // DLD target, last inspection date, % built
    mix:[["Studio",319],…], ab:{total:628, sold:596, pct:94.9, psf:1970, launch:"Apr 2025", hand:"Feb 2026"},
    opArea:"JVC", op:[{t:"Studio", w:3, psf:1600, tx:6, apsf:1790, atx:508}] }],   // off-plan: building vs area, window w
  planned:[ /* same fields as uc, st:"pl"; note:"…" for anything to explain */ ],
  note:"<b>Sources:</b> …"                 // shown under the cards
};
```
Optional per project: `area` (dropdown name, default = first part of `loc`), `noPlan:true` (invalid DLD target → "N/A"),
`opNote` (e.g. "no DXB Interact sales page yet"), `compSrc` (where the date came from if not DLD).
The subject project (`n` equal to `D.project`) is marked "This project" / "This building" and listed first;
the section opens on the tab it belongs to. Photos go in `data/<name>-img/dev/` (about 70 KB each).

## offer (developer × bank deal) — only when `bank-offers.md` lists one for this developer
`UNITS.studio.offer={n,rate,fy,maxLtv,date,src,pm?,handoverOnly?}` adds a second option in Mortgage → Bank.
Needs the normal plan in `UNITS.studio.construction={dev,start:[y,m],months,handoverPct,items:[[label,month,pct],…],planText,note}`.

## Modules (optional, `modules.md`)
`distressed:true` + `proj={name,range,psf,n,period,psf12,n12,src,asOf,note,op,sales:[[date,unit,sqft,price,seller]],resales:[[date,unit,sqft,price]],dev,handover:{listing,dld,dev,devName,progress,tone},listings:{asOf,src,base:{pf,by},note,items:[[site,id,price,size,f,s,yymmdd,ver,urltail,alt]]}}`; resale fees `nocFee`, `buyAgency`, `adminLabel`.
Mortgage: `construction`, `eibor`, `mortgage`, `buyers`, `varDefaults` (+ `offer`).
