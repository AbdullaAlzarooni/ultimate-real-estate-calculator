# Rules — formulas, bands, premiums, labels

The template implements all formulas (verified equal to the original Google Sheet across 144
combinations). You supply inputs; never hand-compute numbers into the text that the page computes.

## Costs
- DLD = price × 4% (+ AED 40 admin). **If the sales offer shows DLD, use its exact amount**
  (`dldAdmin:0`) and add the note "DLD as per the sales offer (4%). DLD may add a small admin fee
  (around AED 40) at registration." Otherwise `dldAdmin:40`.
- Admin/Oqood fee: from the developer (default AED 4,000 if unknown, say "estimated").
- Resale commission: 2% + 5% VAT of the selling price.
- Reselling **before** handover usually costs a developer transfer fee (~AED 5,000 + VAT) → note only.

## Rent
- Gross rent at handover = area rent × (1 + rent growth)^years × (1 + rent premiums) + furnished premium.
- Furnished premium: studio 5,000 · 1BR 7,500–10,000 · 2BR 15,000–20,000 (only if furnished).
- Service charge = AED/sqft × (internal + 25% balcony) × 1.05 when the split is known, else × total size × 1.05.
- Net rent = gross − management − utilities − service charge − furniture.
- Net yield = net rent ÷ (price + DLD + admin). Labels: **Good ≥ 6% · OK 5–6% · Low < 5%** (net, not gross).

## Resale at handover
- Selling price = case psf × size × (1 + price growth)^years × (1 + appreciation premiums).
- Profit = selling price − (price + admin + DLD + commission); lifecycle % = profit ÷ costs;
  per year = (1 + lifecycle)^(1/years) − 1.
- Cash-on-cash ("profit on your cash, if you sell before handover") = profit ÷ (instalments paid
  before handover + DLD + admin).
- Capital growth (priced below/above market) = (area psf − unit psf) ÷ unit psf.
- Break-even sale = (price × 1.04 + admin) ÷ (1 − 2.1%); "How safe" cushion = 1 − break-even ÷ worth
  today: ≥ 5% green, 0–5% amber ("thin cushion"), < 0 red.
- Price for 6% net yield = (net rent ÷ 0.06 − admin) ÷ 1.04.

## Growth bands (apply to both rent and price; source: Bayut last 12 months)
negative → 0 · 0–5% keep · 5–10% × 0.75 (min 5%) · 10–20% × 0.5 (min 7.5%) · > 20% → 10%.

## What-if boxes
Market: −5% · 0% · our analysis (banded) · strong = max(8%, base + 3). Rents: same four.
Rent what-ifs change rent and yield only, never resale profit.

## Premium factors (rent % / appreciation %) — default 0, never negative, confirmed only
Caps: 5% rent / 10% appreciation. Skip a factor if the comparables already include it.
- Metro (confirmed station): ≤ 800 m +2.5/+5 · 0.8–1.5 km +1.5/+3 · 1.5–3 km +0.5/+1.5 · > 3 km 0. Concepts = 0.
- Airport (to terminal): ≤ 5 km +1/+2.5 · 5–10 km +0.5/+1.5 · 10–15 km 0/+0.5 · > 15 km 0.
  Noise (noise-map.com): < 55 dB keep · 55–60 halve airport · 60–65 airport 0 + others halved · > 65 all 0 + warning.
- View: iconic +1.5/+3 · open (golf/lagoon/park/canal/skyline) +1/+2 · amenities/boulevard +0.5/+1 ·
  community 0. Obstruction: clear full · partial/buildable plot half · blocked 0. No floor premium.
  Judge obstruction from **GIS DDA** neighbour plots (`sources.md`): open space / park in front = clear;
  empty or under-construction plot allowed taller than (or near) this unit's floor = buildable → half;
  a building of similar height right in front = blocked. Use the planned max heights for the shade card too.
- Premium developer:
  - **Emaar, Sobha, Meraas, Ellington, Omniyat → at least +1/+2.5.** Also run the evidence check below; if it gives
    more (after halving), use the evidence, rent and price each separately. Never below the fixed rate.
  - **Every other developer → evidence from its own handed-over buildings in the SAME community** (DXB Interact,
    last 12 months, ready apartments, same bedroom type, ≥ 5 sales and ≥ 5 new rental contracts, sales below
    AED 500/sqft filtered out on both sides):
    rent gap = building's average new rent ÷ community's average new rent (ready) − 1;
    price gap = building's median psf ÷ the **off-plan comparable psf used in the report** − 1
    (not ÷ the community's ready psf: old ready stock would double-count "new building").
    Several buildings → median gap. **Use half the gap**, never negative; the overall caps still apply.
    No handed-over building in that community, or too few deals → 0.
    Write the buildings, deals and numbers in the factor's "why" (e.g. "Oxford 212: 8 sales 1,910 psf vs
    1,820 off-plan comp (+5% → +2.5%); 40 rentals AED 60k vs 48k (+25% → +12.5%, capped)").
- Waterfront/beach +1/+2.5 · low supply +1/+1 · branded residence +1/+2.5 · other confirmed major infrastructure +1/+2.5.
- Holiday-home demand: strong (Downtown, Marina, JBR, Palm, Business Bay, Emaar Beachfront,
  Bluewaters, City Walk) +2.5/+1 · medium (JVC, JLT, Dubai Hills, Al Barsha, Creek Harbour) +1.25/+0.5 · low 0.

## Valuation cases
Conservative = size-matched off-plan **resale** psf · Optimistic = all off-plan psf · Normal = midpoint.
Default view = the size-matched source (Property Monitor) + **normal** case + our-analysis growth.
Non-PM sources reuse PM's resale ÷ all ratio (state it on the page).

## Which source wins (counts)
For **counts** (sales by type for the demand chart, supply pipeline), when sources disagree use the one
with the **fuller, checkable record**: the higher count **if** its rows are real named deals (building +
unit number) and it is higher across categories, not just one. In Al Jaddaf 2026 that was DXB Interact
(509 vs 346 studios; 19 shops + 22 offices vs PM's 6 retail, 0 offices).
- Order to try: **DXB Interact** (homes by bedroom + commercial split into Shop = retail / Office) →
  Property Monitor (residential + commercial sales) → Property Finder transactions.
- Take every category of one chart from the **same** source; put the other source's figure in the note
  when the gap is big.
- This rule is for counts only. **Prices and rents** keep their own rules (size-matched PM is the main
  source; all sources shown side by side).

## Supply wording
Present oversupply as an **estimate** ("supply risk to watch"), never a verdict. Zone ratios are
zone-level (DSC community), not project-level; show a range for household size (e.g. 1.1–1.6×).

## Wording
- Verdict headline: "Profitable at handover, not before" / "Profitable at handover, with a cushion" /
  "Loss at handover in this case". Never "good buy", "hold", or advice.
- Plain short sentences, simple round numbers in explanations, no bullet-heavy blocks in the hero.
- Every source shows its period and "pulled <date>". Disclaimer in the footer.

## Size multiplier (fallback only, rent only)
Use ONLY when there are not enough size-matched rent deals for the unit's size. Order of fallbacks:
1. Size-matched (±10%) deals, last 3 months → widen to 6 months → 1 year (min 5 deals).
2. Same size in similar off-plan projects nearby (same community, same bedroom type).
3. Still too few: take the **nearest size that has enough deals** and scale its rent:
   **gross rent = (comparable rent × growth × factors + furnished premium) × (unit size ÷ comparable size)**
   (the multiplier scales the whole gross rent, furnished premium included, exactly like the sheet's Size Multiply tab;
   in the data: `sm:<multiplier>, smFrom:<comparable sqft>` on that source).
   The multiplier can be **below 1** (comparables bigger, e.g. 450 ÷ 670 = 0.67) or **above 1** (comparables
   smaller, e.g. 650 ÷ 500 = 1.30). It is never used just to "adjust" when matched data exists.
4. Only if all of that fails: "no data" for that source.
Rent only: the resale price is already price-per-sqft × the unit's size, so it scales by itself (applying the
multiplier to price would count the size twice). Smaller units usually rent and sell at a higher psf, so borrowed
numbers from larger units are slightly conservative; say so. Always show it: in the source's `how`
("rent of 670 sqft units × 0.67 size multiplier, too few 450 sqft deals") and as an "estimated" note in the report.


## Post-handover maths (this calculator)
Matches the master tab "Post-Handover Properties Evaluation Form" (`tools/sheetcheck-ph.js` re-implements it; diff must be ≈ 0).
- **Total cost** = price + DLD (4%) + admin/Oqood (as off-plan).
- **Net rent** as off-plan (gross − service charge − management − utilities − furniture).
- **Rent during the plan** = net rent × months with a tenant ÷ 12, months = phppYears × 12 − empty months.
- **Cash you put in** = total cost − rent during the plan. **Yield on your cash** = net rent ÷ that cash
  (label Good ≥ 6% · OK 5–6% · Low < 5%); also show the yield on the full price.
- **Post-handover instalments** = price × postPct; per year ÷ phppYears. **Rent covers** = rent during the plan ÷ instalments.
  **Top-up** = instalments − rent during the plan (shown per month, rounded to AED 100, and in total).
- **Sell at handover** (main resale case): off-plan method, price growth only **until handover**; the buyer takes over the plan.
- Compare the plan price with the standard plan price when known (e.g. 690k vs 645k = 7% more); say what that costs
  per year, like a loan (e.g. "about 18% a year").
- The **empty-months slider** runs from 0 to the plan length; it changes rent during the plan, cash, yield on cash,
  cover and top-up only, never the selling price.
