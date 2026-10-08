/* ===== DATA: edit this block for each new study ===== */
const UNITS={};
UNITS.studio={label:"Studio",
  heroImgs:[["weston-109-img/01.webp", "Exterior · street view"], ["weston-109-img/02.webp", "Exterior · front"], ["weston-109-img/03.webp", "Exterior · park side"], ["weston-109-img/04.webp", "Exterior · twin view"], ["weston-109-img/05.webp", "Podium & balconies"], ["weston-109-img/06.webp", "Facade detail"], ["weston-109-img/07.webp", "Rooftop crown"], ["weston-109-img/08.webp", "Rooftop infinity edge"], ["weston-109-img/09.webp", "Rooftop pool · aerial"], ["weston-109-img/10.webp", "Rooftop pool"], ["weston-109-img/11.webp", "Rooftop terrace"], ["weston-109-img/12.webp", "Amenity deck · aerial"], ["weston-109-img/13.webp", "Site · aerial"], ["weston-109-img/14.webp", "Lobby reception"], ["weston-109-img/15.webp", "Lobby"], ["weston-109-img/16.webp", "Lobby lounge"], ["weston-109-img/17.webp", "Residents' lounge"], ["weston-109-img/18.webp", "Residents' lounge"], ["weston-109-img/19.webp", "Co-working space"], ["weston-109-img/20.webp", "Café lounge"], ["weston-109-img/21.webp", "Café nook"], ["weston-109-img/22.webp", "Games room"], ["weston-109-img/23.webp", "Library"], ["weston-109-img/24.webp", "Gym"], ["weston-109-img/25.webp", "Pilates studio"], ["weston-109-img/26.webp", "Sauna"], ["weston-109-img/27.webp", "Corridor"], ["weston-109-img/28.webp", "Studio · bedroom area"], ["weston-109-img/29.webp", "Studio · living & sleeping"], ["weston-109-img/30.webp", "Kitchen"], ["weston-109-img/31.webp", "Kitchen island"], ["weston-109-img/32.webp", "Living & dining"], ["weston-109-img/33.webp", "Dining"], ["weston-109-img/34.webp", "Living room"], ["weston-109-img/35.webp", "Living room · TV wall"], ["weston-109-img/36.webp", "Living · TV wall"], ["weston-109-img/37.webp", "Living nook"], ["weston-109-img/38.webp", "Dining room"], ["weston-109-img/39.webp", "Bedroom"], ["weston-109-img/40.webp", "Bedroom"], ["weston-109-img/41.webp", "Twin bedroom"], ["weston-109-img/42.webp", "Bathroom"], ["weston-109-img/43.webp", "Bathroom vanity"], ["weston-109-img/44.webp", "Location map"]],
  heroCredit:"Renders: Wadan Developments (via Reelly & GenieMap)",
  pdf:"Weston-109-client.pdf",
  project:"Weston by Wadan", unit:"Studio · Unit 109", area:"Dubai Land Residence Complex (DLRC)", emirate:"Dubai",
  date:"8 Oct 2026", offer:"Wadan sales offer WES-SO-109-58 (3 Oct 2026)",
  price:645241, size:482.65, internal:362.31, balcony:120.34, sc:15, floor:"1 of G+17", view:"Boulevard", furnished:true, parking:1, handover:"31 Dec 2028",
  years:2.23, dldPct:4, dldAdmin:0, oqood:3500, planName:"50/50",
  dldNote:"DLD as per the sales offer (4%). DLD may add a small admin fee (around AED 40) at registration.",
  plan:[["On booking · 3 Oct 2026",20],["15 Feb 2027",5],["15 May 2027",10],["15 Nov 2027",10],["15 May 2028",5],["On completion · 31 Dec 2028",50]],
  paidBeforeHandover:50,
  furnPrem:5000, mgmt:0, util:0, furniture:0, commission:2,
  growth:{rent:{raw:4.9,used:4.9,src:"Bayut DLRC studio rent, last 12 months",rule:"0–5%: keep"},
          price:{raw:5.4,used:5.0,src:"Bayut DLRC studio off-plan, last 12 months",rule:"5–10%: ×0.75 = 4.05%, floor 5%"}},
  cases:[{n:"Conservative",psf:1351,why:"Off-plan resales of this size · 17 deals"},{n:"Normal",psf:1431.75,why:"Midpoint of resales and all off-plan sales"},{n:"Optimistic",psf:1512.5,why:"All off-plan sales incl. developer prices · 132 deals"}],
  scenarios:[{n:"Falling market",g:-5},{n:"Flat market",g:0},{n:"Base case",g:null},{n:"Strong market",g:8}],
  factors:[
    {n:"Metro",v:[0.5,1.5],on:true,why:"Blue Line Academic City station 2.3 km away (1.5–3 km tier), opens Sep 2029"},
    {n:"View",v:[0.5,1],on:true,why:"Boulevard view (amenities/boulevard tier), clear — park in front. Floor 1 adds nothing for height"},
    {n:"Airport",v:[0,0],why:"DXB ~10 km, outside the ≤5 km band; aircraft noise ≤ 41 dB"},
    {n:"Premium developer",v:[0,0],why:"Wadan is not on the premium list"},
    {n:"Waterfront / beach",v:[0,0],why:"None"},
    {n:"Low supply",v:[0,0],why:"DLRC has heavy supply handing over"},
    {n:"Branded residence",v:[0,0],why:"No"},
    {n:"Holiday-home demand",v:[0,0],why:"Low tier: DLRC is mainly yearly tenants"},
    {n:"Other infrastructure",v:[0,0],why:"Dubai Loop / URB Loop not confirmed for DLRC"}
  ],
  sources:[
    {k:"dxb",name:"DXB Interact",rent:37000,psf:1610,sample:"234 new rentals · 137 off-plan sales",period:"Jul–Sep 2026",asOf:"8 Oct 2026",how:"All studio sizes · new-rental average · off-plan median"},
    {k:"bayut",name:"Bayut",rent:38170,psf:1571,sample:"586 rentals · 404 off-plan sales",period:"Last 3 months",asOf:"8 Oct 2026",how:"All studio sizes · average yearly rent · off-plan average"},
    {k:"pm",name:"Property Monitor",rent:38000,psf:1512.5,sample:"92 new contracts · 132 Oqood sales",period:"8 Jul – 8 Oct 2026",asOf:"8 Oct 2026",how:"Size-matched 435–530 sqft (±10%) · new contracts only · Oqood median",main:true}
  ],
  comfort:[
    {k:"Facing",v:"Boulevard · park in front",d:"Wadan lists the view as Boulevard; the boulevard side faces a park, not a road (site knowledge — confirm on the floor plan). Al Ain Road (E66) is on the building's other face.",src:[["wadan.ae (sales offer WES-SO-109-58)", "https://wadan.ae"], ["Google Maps", "https://www.google.com/maps/place/Weston+by+Wadan/@25.0970625,55.3813125,17z"]],tone:"neutral"},
    {k:"Sun",v:"Depends on the face · up to 1 pm → sunset",d:"Summer (21 Jun): sun swings west after 1 pm — 54° high at 3 pm, 27° at 5 pm, sets ~7 pm. Winter (21 Dec): low sun from the SW all afternoon. A SW-facing unit gets the hottest afternoon sun; a NE-facing unit only morning sun.",src:[["suncalc.org", "https://www.suncalc.org/#/25.0971,55.3813,17/2027.06.21/15:00/1/3"], ["shademap.app", "https://shademap.app/@25.0970625,55.3813125,17z,1813575600000t,0b,0p,0m"]],tone:"neutral"},
    {k:"Shade (calculated · off-plan)",v:"Mostly shaded · cooler",d:"ShadeMap only shows buildings that already exist, so calculated from planned heights. Floor 1 (~5 m up): a G+17 neighbour (~60 m) casts a 44 m shadow at 3 pm, 71 m at 4 pm, 118 m at 5 pm in June — so this unit sits in shade for most of the afternoon. Winter shadows are 2–3× longer. Lower AC bills, less natural light.",src:[["shademap.app", "https://shademap.app/@25.0970625,55.3813125,17z,1813575600000t,0b,0p,0m"], ["geniemap.net (Weston 3B+G+17+R)", "https://geniemap.net/8299"]],tone:"good"},
    {k:"Street level",v:"Less privacy",d:"First floor facing the boulevard and park: passers-by and park users can see in, and the 120 sqft balcony is at street level. Park in front means less traffic noise than a road.",src:[["wadan.ae (sales offer: floor 1 · boulevard view · 120 sqft balcony)", "https://wadan.ae"], ["Google Maps", "https://www.google.com/maps/place/Weston+by+Wadan/@25.0970625,55.3813125,17z"]],tone:"warn"},
    {k:"Road noise",v:"Low · park in front",d:"The unit faces the park, not a road. Al Ain Road (E66) runs along the building's opposite face, so the building shields it.",src:[["Google Maps", "https://www.google.com/maps/place/Weston+by+Wadan/@25.0970625,55.3813125,17z"]],tone:"good"},
    {k:"Aircraft noise",v:"Quiet · ≤ 41 dB",d:"noise-map.com: 41 dB average 1.3 km closer to the DXB flight path over Academic City / Silicon Oasis; Weston sits further away — under the 55 dB threshold.",src:[["noise-map.com", "https://noise-map.com/"]],tone:"good"},
    {k:"Wind & sea",v:"Not exposed",d:"Inland, ~20 km from the coast. No sea spray or wave exposure (Windy).",src:[["windy.com", "https://www.windy.com/?25.097,55.381,11"], ["Google Maps", "https://www.google.com/maps/place/Weston+by+Wadan/@25.0970625,55.3813125,17z"]],tone:"good"},
    {k:"Flooding",v:"No reported flooding · low risk",d:"No news of DLRC flooding in the 16 Apr 2024 storm (250 mm in 24 h); one report rates impact \"minimal\". Floor 1 is above ground level. Evidence is thin — ask about basement (parking) drainage.",src:[["Wikipedia: 2024 UAE floods", "https://en.wikipedia.org/wiki/2024_United_Arab_Emirates_floods"], ["Google search (DLRC flooding, Apr 2024)", "https://www.google.com/search?q=%22Dubai+Land+Residence+Complex%22+flooded+April+2024"]],tone:"good"}
  ],
  notes:[
    "<b>Priced right for its size.</b> 1,337 / sqft vs 1,512 for size-matched off-plan studios (Property Monitor) and 1,327–1,535 for registered Weston sales. DXB Interact and Bayut cover all studio sizes, and smaller studios sell for more per sqft — so their columns flatter this unit.",
    "<b>Balcony-heavy layout.</b> 362 sqft inside + 120 sqft balcony. Tenants pay for the inside; the rent comparables are by total size, so rent could come in a little lower.",
    "<b>Cash price is 17% cheaper:</b> AED 573,039 if paid 100% upfront (1,187 / sqft) vs 645,241 on 50/50. The 60/40 post-handover plan costs AED 690,408.",
    "<b>Off-plan resales of this size</b> sold at a median 1,351 / sqft (17 deals) — about this unit's price. Flipping depends on the market growing.",
    "<b>Cash-on-cash</b> assumes you sell (assign) before the 50% completion payment and the buyer takes it over. Weston allows resale after 30% paid. Reselling before handover usually costs a developer transfer fee of about AED 5,000 + 5% VAT (varies by developer) — not included in the numbers.",
    "<b>Rent is softening:</b> new studio rents in DLRC were about −8% last quarter on DXB Interact.",
    "<b>Conservative by design:</b> profit is measured on the full price (not just cash invested) and excludes any rent earned while holding."
  ]
};

const GM="https://geniemap.net/8299", MAP="https://www.google.com/maps/place/Weston+by+Wadan/@25.0970625,55.3813125,17z";
const SUPPLY={k:"Supply & demand",v:"2028 handover wave · supply risk to watch",tone:"warn",d:`<div class="yrbars"><div class="yb r"><span>Ready today</span><i style="width:80%"></i><b>8,524</b></div><div class="yb "><span>2026</span><i style="width:5%"></i><b>555</b></div><div class="yb "><span>2027</span><i style="width:65%"></i><b>6,899</b></div><div class="yb h"><span>2028 · Weston</span><i style="width:100%"></i><b>10,663</b></div><div class="yb "><span>2029</span><i style="width:23%"></i><b>2,495</b></div><div class="yb "><span>2030</span><i style="width:23%"></i><b>2,505</b></div></div>
<p><b>DLRC today vs what's coming</b> (Property Monitor supply tracker): 8,524 ready units and 23,117 under construction. By 2030, DLRC grows to about 31,600 units, 3.7× today.</p>
<p><b>Weston hands over in Dec 2028, the peak year.</b> 10,663 units complete that year alone, more than all ready units in DLRC today. Expect many new units, mostly studios and 1-beds, competing for tenants and resale buyers in 2028–29. First-year rents and resale prices can soften while that stock fills up.</p>
<p><b>The wider zone</b> (Supply &amp; Demand sheet): Wadi Al Safa 5 (DLRC, Haven, Villanova, Arabian Ranches III, Athlon) has 17,235 existing + 29,823 new units by 2029. DLRC alone is about 69% of that new supply (20,612 units to 2029). Against a projected population of 87,436 by 2029 (+22.9%/yr), the ratio is <b>1.61×</b>, rated High.</p>
<p><b>Read the 1.61× with care:</b> the sheet assumes 3 people per home, but DLRC is mostly studios and 1-beds (84% of 2026 sales), which usually house 1–2 people. At 2 people per home the ratio is about <b>1.08×</b> (moderate); at 1.5, about <b>0.81×</b> (balanced). The risk is real but likely smaller than 1.61× suggests, as long as population growth holds up.</p>`,src:[["Property Monitor – DLRC supply tracker","https://propertymonitor.ae/v2/project-details.php?project_id=4338&prj_emirate=Dubai"]]};
const COMMON_NOTES=[
  "<b>Biggest handover year is Weston's:</b> 10,663 DLRC units complete in 2028, more than today's 8,524 ready units (Property Monitor). Expect competition for tenants and buyers around handover. See Supply &amp; demand.",
  "<b>Rent is softening:</b> new rents in DLRC were about −8% last quarter on DXB Interact.",
  "<b>Reselling before handover</b> usually costs a developer transfer fee of about AED 5,000 + 5% VAT (varies by developer) — not included in the numbers.",
  "<b>Conservative by design:</b> profit is measured on the full price (not just cash invested) and excludes any rent earned while holding."
];
/* supply & demand section */
UNITS.studio.sd={
  area:"DLRC", period:"1 Jan – 8 Oct 2026",
  takeaway:"Studios are what DLRC buyers want, and Weston is built for it. But a record 10,663 units hand over in 2028, Weston's year.",
  match:"<b>Weston's mix matches what's selling:</b> 45% of its units are studios vs 46% of DLRC sales.",
  flag:"Weston hands over · Dec 2028",
  mix:[["Studio",2212],["1 Bed",1814],["2 Bed",662],["3 Bed",130],["4 Bed",1]], mine:"Studio",
  mixNote:"4,819 sales in 2026 · 91% off-plan (4,376 units) · 9% ready (443 units)",
  bldg:{name:"Weston",total:373,mix:[["Studio",169,"429–579"],["1 Bed",119,"661–972"],["2 Bed",51,"1,168–1,937"],["3 Bed",34,"1,527–2,235"]],
    note:"Unit 109 is 482.65 sqft vs Weston's studio average of 468. GenieMap lists only 4 studios still for sale (plus 8 one-beds, 10 two-beds, 1 three-bed) on 8 Oct 2026, a strong sign of demand, though it may not show all of Wadan's stock."},
  ready:8524, uc:23117, years:[["2026",555],["2027",6899],["2028",10663],["2029",2495],["2030",2505]], peak:"2028",
  points:[
    {fig:"10,663",tone:"warn",t:"units hand over in 2028, Weston's year",d:"More than all 8,524 ready units today. Expect tenant and resale competition in 2028–29."},
    {fig:"1.61×",tone:"warn",t:"Wadi Al Safa 5 oversupply (your sheet)",d:"47,058 units vs 87,436 projected residents by 2029. DLRC is about 69% of the new supply."},
    {fig:"1.1–1.6×",tone:"ok",t:"adjusted for smaller homes",d:"Studios and 1-beds house 1–2 people, villas more, so the real figure is likely in between."},
    {fig:"46%",tone:"good",t:"of 2026 DLRC sales were studios",d:"A deep buyer pool, but Weston hands over 169 studios at once and ready studios trade near AED 452K."}
  ],
  src:[["Property Monitor – DLRC supply tracker","https://propertymonitor.ae/v2/project-details.php?project_id=4338&prj_emirate=Dubai"],["Property Monitor – DLRC sales 2026","https://propertymonitor.ae/v2/real-estate-market-statistics-detail.php?loc=Dubai%20Residence%20Complex&evidence=TRA&evidence_type=Full&mn_year=2026&sale_sequence=Full"],["Property Monitor – Weston project","https://propertymonitor.ae/v2/project-details.php?project_id=8320&prj_emirate=Dubai"]]
};
/* ===== END DATA ===== */
