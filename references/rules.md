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
- Premium developer (Emaar, Sobha, Meraas, Ellington, Omniyat) +1/+2.5 · waterfront/beach +1/+2.5 ·
  low supply +1/+1 · branded residence +1/+2.5 · other confirmed major infrastructure +1/+2.5.
- Holiday-home demand: strong (Downtown, Marina, JBR, Palm, Business Bay, Emaar Beachfront,
  Bluewaters, City Walk) +2.5/+1 · medium (JVC, JLT, Dubai Hills, Al Barsha, Creek Harbour) +1.25/+0.5 · low 0.

## Valuation cases
Conservative = size-matched off-plan **resale** psf · Optimistic = all off-plan psf · Normal = midpoint.
Default view = the size-matched source (Property Monitor) + **normal** case + our-analysis growth.
Non-PM sources reuse PM's resale ÷ all ratio (state it on the page).

## Supply wording
Present oversupply as an **estimate** ("supply risk to watch"), never a verdict. Zone ratios are
zone-level (DSC community), not project-level; show a range for household size (e.g. 1.1–1.6×).

## Wording
- Verdict headline: "Profitable at handover, not before" / "Profitable at handover, with a cushion" /
  "Loss at handover in this case". Never "good buy", "hold", or advice.
- Plain short sentences, simple round numbers in explanations, no bullet-heavy blocks in the hero.
- Every source shows its period and "pulled <date>". Disclaimer in the footer.
