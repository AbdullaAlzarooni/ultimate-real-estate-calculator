/* ===== DATA: edit this block for each new study ===== */
const UNITS={};
UNITS.studio={label:"Studio",
  heroImgs:[["starfall-studio-img/01.webp", "Exterior · by Al Jadaf metro"], ["starfall-studio-img/02.webp", "Exterior · street view"], ["starfall-studio-img/03.webp", "Exterior · night facade"], ["starfall-studio-img/04.webp", "Exterior · night, arrival drive"], ["starfall-studio-img/05.webp", "Exterior · night, highway view"], ["starfall-studio-img/06.webp", "Aerial · Downtown skyline"], ["starfall-studio-img/07.webp", "Aerial · pool deck"], ["starfall-studio-img/08.webp", "Pool deck"], ["starfall-studio-img/09.webp", "Pool garden"], ["starfall-studio-img/10.webp", "Podium pool at sunset"], ["starfall-studio-img/11.webp", "Rooftop pool"], ["starfall-studio-img/12.webp", "Rooftop observatory"], ["starfall-studio-img/13.webp", "Gym"], ["starfall-studio-img/14.webp", "Entrance & café"], ["starfall-studio-img/15.webp", "Entrance · street side"], ["starfall-studio-img/16.webp", "Lobby reception"], ["starfall-studio-img/17.webp", "Lobby lounge"], ["starfall-studio-img/18.webp", "Living room"], ["starfall-studio-img/19.webp", "Living room"], ["starfall-studio-img/20.webp", "Dining"], ["starfall-studio-img/21.webp", "Lounge"], ["starfall-studio-img/22.webp", "Bedroom"], ["starfall-studio-img/23.webp", "Location map"]],
  heroCredit:"Renders: Binghatti Developers (via Reelly & GenieMap)",
  pdf:"Starfall-studio-client.pdf",
  project:"Binghatti Starfall", unit:"Studio · 348 sqft (starting unit)", area:"Al Jaddaf", emirate:"Dubai",
  date:"9 Oct 2026", offer:"Binghatti brochure (starting price) + Reelly availability (8 Oct 2026)",
  price:759999, size:348.21, internal:null, balcony:null, sc:17, floor:"Not chosen yet (G+14 over podium)", view:"Not chosen yet", furnished:false, furnText:"Semi-furnished (kitchen appliances)", parking:0, handover:"30 Sep 2028",
  years:1.98, dldPct:4, dldAdmin:40, oqood:5000, planName:"50/50",
  dldNote:"DLD 4% + about AED 40 registration fee. Admin fee AED 5,000 as per Binghatti's studio payment plan (GenieMap).",
  plan:[["On booking (was due 30 Sep 2026)",10],["Oct – Dec 2026 · 0.5% + 0.5% + 5%",6],["2027 · 0.5% monthly, 10% on 30 Jun, 5% on 31 Dec",20],["Jan – Aug 2028 · 0.5% monthly, 10% on 30 Jun, 1% on 31 Aug",14],["On completion · 30 Sep 2028",50]],
  paidBeforeHandover:50,
  furnPrem:0, mgmt:0, util:0, furniture:0, commission:2,
  growth:{rent:{raw:-0.4,used:0,src:"Bayut Al Jaddaf studio rent, last 12 months",rule:"Negative: 0%"},
          price:{raw:41,used:10,src:"Bayut Al Jaddaf off-plan studios, last 12 months",rule:"Above 20%: capped at 10%"}},
  cases:[{n:"Conservative",psf:2179.8,why:"Estimated: no off-plan studio resales in Al Jaddaf in 12 months, so 90% of all off-plan sales"},{n:"Normal",psf:2300.9,why:"Midpoint of the conservative estimate and all off-plan sales"},{n:"Optimistic",psf:2422,why:"All off-plan sales of this size incl. developer prices · 57 deals"}],
  scenarios:[{n:"Falling market",g:-5},{n:"Flat market",g:0},{n:"Base case",g:null},{n:"Strong market",g:13}],
  factors:[
    {n:"Metro",v:[0,0],why:"Al Jadaf station (Green Line) is about 250 m away, but almost every Al Jaddaf comparable is also near Al Jadaf or Creek station, so it is already in the prices"},
    {n:"View",v:[0,0],why:"Unit not chosen yet. Brochure plans put most studios on the inner (pool deck) side; confirm the view"},
    {n:"Airport",v:[0,0],why:"DXB Terminal 1 about 3.5 km and only 46 dB, but every Al Jaddaf comparable is as close, so already priced in"},
    {n:"Premium developer",v:[0,0],why:"Binghatti is not on the premium list"},
    {n:"Waterfront / beach",v:[0,0],why:"Dubai Creek is about 1 km away; not a waterfront plot"},
    {n:"Low supply",v:[0,0],why:"4,554 units under construction vs 1,882 ready in Al Jaddaf"},
    {n:"Branded residence",v:[0,0],why:"No"},
    {n:"Holiday-home demand",v:[0,0],why:"Al Jaddaf is not on the medium or strong holiday-home lists"},
    {n:"Other infrastructure",v:[0,0],why:"Nothing new confirmed beyond the existing metro and roads"}
  ],
  sources:[
    {k:"dxb",name:"DXB Interact",rent:50000,psf:2350,sample:"239 new rentals · 109 off-plan sales",period:"Jul–Sep 2026",asOf:"9 Oct 2026",how:"All studio sizes · new-rental average · off-plan median"},
    {k:"bayut",name:"Bayut",rent:48359,psf:2338,sample:"150 rentals · 95 off-plan sales",period:"Last 3 months (3 Jul – 7 Oct 2026)",asOf:"9 Oct 2026",how:"All studio sizes · average yearly rent · off-plan average"},
    {k:"pm",name:"Property Monitor",rent:50000,psf:2422,sample:"21 new contracts · 57 Oqood sales",period:"9 Jul – 9 Oct 2026",asOf:"9 Oct 2026",how:"Size-matched 313–383 sqft (±10%) · new contracts only · Oqood median",main:true}
  ],
  comfort:[
    {k:"Facing",v:"Not chosen yet · courtyard or road side",d:"The brochure plans put most studios on the inner side, facing the podium pool deck. Outer units face the neighbouring plots and the main road. Ask for the exact unit before booking.",src:[["Binghatti brochure (studio & floor plans)", "https://www.binghatti.com"], ["Google Maps", "https://www.google.com/maps/place/Binghatti+Starfall/@25.2247013,55.3296454,17z"]],tone:"neutral"},
    {k:"Sun",v:"Depends on the face · up to 1 pm → sunset",d:"Summer (21 Jun): the sun swings west after 1 pm, 54° high at 3 pm and 27° at 5 pm, setting around 7 pm. Winter (21 Dec): low sun from the south-west all afternoon. West-facing units get the hottest afternoon sun; east-facing ones only morning sun.",src:[["suncalc.org", "https://www.suncalc.org/#/25.2247,55.3296,17/2027.06.21/15:00/1/3"], ["shademap.app", "https://shademap.app/@25.2247,55.3296,17z"]],tone:"neutral"},
    {k:"Shade (calculated · off-plan)",v:"Courtyard side shaded in the afternoon",d:"ShadeMap only shows buildings that exist, so calculated from the plan: the tower is 77.5 m high. In June it casts a 56 m shadow at 3 pm and about 150 m at 5 pm, so studios facing the inner courtyard sit in the building's own shade for much of the afternoon. Winter shadows are 2–3× longer.",src:[["Binghatti brochure (77.5 m, 2B+G+4P+14+roof)", "https://www.binghatti.com"], ["shademap.app", "https://shademap.app/@25.2247,55.3296,17z"]],tone:"good"},
    {k:"Street level",v:"Homes start above the podium",d:"Two basements, ground-floor shops and four podium levels sit below the homes, so even the lowest studios are well above the street. The lowest residential floor is level with the pool deck: less privacy there.",src:[["Binghatti brochure (floor plans)", "https://www.binghatti.com"]],tone:"good"},
    {k:"Road noise",v:"Busy interchange to the north",d:"A large road interchange and flyover run just north of the plot, and Al Jadaf metro is to the east. Road-facing units will hear traffic; courtyard units are shielded by the building.",src:[["Google Maps", "https://www.google.com/maps/place/Binghatti+Starfall/@25.2247013,55.3296454,17z"]],tone:"warn"},
    {k:"Aircraft noise",v:"Quiet · 46 dB",d:"noise-map.com at the plot: 46 dB average (47 day, 43 night), under the 55 dB threshold. The DXB flight path passes about 2 km to the north-east, over Al Garhoud.",src:[["noise-map.com", "https://noise-map.com/"]],tone:"good"},
    {k:"Wind & sea",v:"Not exposed",d:"Inland, about 1 km from Dubai Creek and 8 km from the sea. No sea spray or wave exposure (Windy).",src:[["windy.com", "https://www.windy.com/?25.225,55.330,11"], ["Google Maps", "https://www.google.com/maps/place/Binghatti+Starfall/@25.2247013,55.3296454,17z"]],tone:"good"},
    {k:"Flooding",v:"No major reports · ask about basements",d:"No news of Al Jaddaf streets flooding in the 16 Apr 2024 storm (250 mm in 24 h); residents describe slow traffic, not water in buildings. Evidence is thin, and Starfall has two basement levels, so ask Binghatti about basement drainage.",src:[["Wikipedia: 2024 UAE floods", "https://en.wikipedia.org/wiki/2024_United_Arab_Emirates_floods"], ["Google search (Al Jaddaf flooding, Apr 2024)", "https://www.google.com/search?q=%22Al+Jaddaf%22+flooding+April+2024+rain"]],tone:"neutral"}
  ],
  notes:[
    "<b>Price used: the brochure's AED 759,999.</b> On 8 Oct 2026 Reelly and GenieMap list the 32 studios still for sale at 348–350 sqft for AED 827,999–834,999, about 9% more. Confirm the price with Binghatti before booking.",
    "<b>The 10% growth is the cap, not a forecast.</b> Bayut's +41% is inflated: Al Jaddaf had very few off-plan studio sales the year before. Property Monitor's Al Jaddaf price index is down 5.8% over 12 months and 20% over the last 6 months. Look at the Flat and Falling market boxes too.",
    "<b>No resale track record:</b> no off-plan studio in Al Jaddaf was resold in the last 12 months (Property Monitor), so the conservative case is an estimate.",
    "<b>Unit not chosen yet:</b> floor, view and the inside / balcony split are unknown, so the service charge (AED 17/sqft from Property Monitor; GenieMap says 16) is applied to the full 348 sqft.",
    "<b>Handover date:</b> the brochure and Property Monitor say 30 Sep 2028 and GenieMap Q3 2028; Reelly shows Q2 2028. This report uses Sep 2028.",
    "<b>Binghatti is Al Jaddaf's main seller:</b> 58.6% of all Al Jaddaf sales in 2025 and half of 2026 studio sales (brochure). Its other towers here (Cullinan, Wraith) hand over in 2027, before Starfall.",
    "<b>Ask for the studio discount:</b> GenieMap says Binghatti offers up to 2% off studios (about AED 15,200 here). The numbers use the full price.",
    "<b>Rents are cooling:</b> new studio rents in Al Jaddaf were about −9% last quarter on DXB Interact.",
    "<b>Resale before handover</b> is allowed after 40% is paid (GenieMap), and usually costs a developer transfer fee of about AED 5,000 + 5% VAT, not included in the numbers. Profit is measured on the full price and excludes rent earned while holding."
  ]
};
/* supply & demand section */
UNITS.studio.sd={
  area:"Al Jaddaf", period:"1 Jan – 9 Oct 2026",
  takeaway:"1-beds, then studios, are what Al Jaddaf buyers want. Starfall adds 771 units in 2028, almost a third of that year's handovers.",
  match:"<b>Starfall is studio-heavy:</b> 68% of its units are studios vs 31% of Al Jaddaf sales, so many similar units will look for tenants at the same time.",
  mix:[["Studio",509],["1 Bed",735],["2 Bed",390],["Retail",19]], mine:"Studio",
  mixNote:"DXB Interact, all sales 1 Jan – 9 Oct 2026 (fullest record). Retail = shops; plus 22 office sales, not shown (Starfall has no offices); 3-bed+ not shown.",
  bldg:{name:"Starfall",total:771,mix:[["Studio",528,"348–477"],["1 Bed",169,"625–1,006"],["2 Bed",57,"855–1,432"],["Retail",17,"649–3,026"]],
    note:"754 homes and 17 shops on the ground floor. The 1-bed count includes 1 royal suite and the 2-bed count 2 royal suites (1,826–1,931 sqft). On 8 Oct 2026 Reelly lists 32 studios, 16 one-beds and 31 two-beds still for sale, about 90% sold three weeks after launch, if Reelly shows all of Binghatti's stock."},
  ready:1882, uc:4554, years:[["2027",2073],["2028",2481]], peak:"2028",
  points:[
    {fig:"2,481",tone:"warn",t:"units hand over in 2028, Starfall's year",d:"Starfall is 771 of them, after 2,073 in 2027. Expect competition for tenants in 2027–28."},
    {fig:"6,100",tone:"warn",t:"units under construction on DXB Interact",d:"More than Property Monitor lists: 1,490 due in 2026 (several late), 2,650 in 2027, 660 in 2028, incl. about 320 shops and offices. Nothing listed after 2028 on either."},
    {fig:"31%",tone:"good",t:"of 2026 Al Jaddaf sales were studios",d:"509 studios sold this year (DXB Interact), second only to 1-beds (735): a deep buyer pool."},
    {fig:"~90%",tone:"good",t:"of Starfall already sold",d:"Only 79 of 754 homes still listed on Reelly three weeks after launch."}
  ],
  src:[["Property Monitor – Al Jaddaf supply tracker","https://propertymonitor.ae/v2/project-details.php?project_id=4268&prj_emirate=Dubai"],["Property Monitor – Binghatti Starfall","https://propertymonitor.ae/v2/project-details.php?project_id=7956&prj_emirate=Dubai"],["Reelly – Binghatti Starfall","https://find.reelly.io/projects/4047"],["DXB Interact – Al Jaddaf supply","https://dxbinteract.com/dubai-units-supply-analysis"],["DXB Interact – Al Jaddaf sales 2026","https://dxbinteract.com/dubai-house-prices"]]
};
/* ===== END DATA ===== */
