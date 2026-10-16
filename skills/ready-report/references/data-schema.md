# Data file (`data/<name>.js`) — every field

Start from `kit/data/example-binghatti-azure-studio.js` (a complete real example). One unit = `UNITS.studio`
(the key name is not important; one entry). Agent details come from `config/agent.js`.

| Field | Meaning | Example |
|---|---|---|
| title, label | page title; unit label in the hero title | "Binghatti Azure Studio · Ready", "Furnished Studio" |
| heroImgs, heroCredit | `[["<name>-img/01.webp","Caption"], ...]` files under `data/`; photo credit | 8 photos |
| pdf | client PDF file name | "Binghatti-Azure-studio-client.pdf" |
| project, unit, area, emirate, status | names shown in the hero | "Binghatti Azure", "Studio", "JVC District 16", "Dubai", "Ready · furnished" |
| source, listing | where the unit came from; listing URL (internal line, not printed) | "Bayut listing (added 14 May 2026)" |
| sizes | the building's size ranges per type (text) | "Studios 338–406 sqft · 1-beds 677–984 …" |
| date | report date (also the date building age and developer dates are measured to) | "11 Oct 2026" |
| height | full floor layout + count | "B+G+4P+18+R · 23 floors" |
| completed, completedDate, plannedDate | completion text with its source; "YYYY-MM" of the 100% inspection; DLD planned date | "2025-06", "2024-12-31" |
| price, size, internal, balcony, sizeNote | AED; sqft (built-up = internal + balcony) | 625000, 342, 280, 62 |
| sc | service charge AED/sqft (DLD index) | 18.51 |
| furnished, furnText, parking | the unit's own furnishing (sets the ★ view) | true, "Furnished (listing)" |
| sources | `[{k,name,rent,psf,sample,period,asOf,how,main?,sm?,ev:{rent,sales:[[date,unit,sqft,AED,note]]}}]`; `main:true` on the size-matched one | DXB Interact / Bayut |
| growth.rent / growth.price | `{raw, used, src, rule}` (Bayut 12 m, after bands) | 2.4 → 2.4; 6.7 → 5.03 |
| growth.age | `{rate, rate2, after, src, rule, bands}` building-age discount (`rules.md`) | 1.5, 3, 6 |
| factors | `[{n,v:[rent%,appr%],why}]` all 9 factors, 0 when not applicable | |
| extraCapital, years, yearsList | extra money put in; recommended hold; hold boxes | 0, 5, [1,2,3,5] |
| marketNote | text under the market boxes | |
| targets | `{yield:7, ret:10}` | |
| buyers | Cash + 3 buyer types with `ltv1:[<5M,≥5M]`, `ltv2:[…]` (`rules.md`) | keep as in the example |
| mortgage | `{rate, term, fixedYears, releaseFee, lifePct, propPct}` defaults | 4, 25, 2, 1290, 0.0171, 0.01 |
| eibor | `{date, src, tenor, rates:{"1M","3M","6M","1Y"}}` that day's Central Bank fixing | "9 Oct 2026", "3M" |
| varDefaults | `{margin}` bank margin over EIBOR | 1.5 |
| furn | `{prem, cost, years, Fmed, Fn, Umed, Un, Frange, Urange, Fsm, Usm, sale:{…}, note}` furnished vs unfurnished (Bayut) | 5000, 15000, 3 |
| market | `{psf3, n3, range3, psf12, n12, rentN, rentRange}` the building, last 3 and 12 months | |
| notes | Things-to-know bullets (HTML allowed, short, no repeated numbers) | |
| comfort | `[{k,v,d,src:[[label,url]],tone}]` cards (tone good/warn/neutral) | 10 cards |
| dev | optional Developer section (below) | |

`UNITS.studio.viewMap` and `UNITS.studio.sd` (Supply & demand) are set after the object, in the same format as the
Off-plan Report (`../../offplan-report/references/data-schema.md`). Supply & demand here also uses
`stockNote` and a `["Target passed",N]` row in `years`.

After editing: `python3 build.py data/<name>.js` and run the checks in workflow step 9.

## Developer section (optional · `UNITS.studio.dev`)
Only when the client said yes (SKILL.md step 2b). Leave it out and the section, its menu link and its number disappear.
```js
dev:{                                  // inside UNITS.studio (or UNITS.studio.dev={…} after it)
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

## Modules (optional, `modules.md`)
`UNITS.studio.distressed=true` → Distressed deal test · `UNITS.studio.mortgageReport=true` → mortgage deal test + opens on a mortgage (set `defBuyer:1`).
