# Rules — formulas, fees, loan limits, growth, building age, labels

The template implements all formulas (they follow the author's Ready Property Evaluation Form; sheet rows are
in brackets in the code). You supply inputs; never hand-compute numbers into the text that the page computes.

## Purchase costs (C22)
- Trustee / registration: AED 4,200 if price ≥ 500,000, else 2,100.
- DLD transfer fee 4% of the price · title deed AED 580 · agent commission 2% + 5% VAT.
- **With a mortgage (C23):** mortgage registration 0.25% of the loan + AED 290 · bank processing 1% of the loan
  + 5% VAT · valuation and other bank fees AED 3,150.
- Cash put in (C27) = down payment + purchase costs + mortgage costs.

## Loan limits (Central Bank, `buyers`)
| Buyer | 1st mortgage (price < AED 5M / ≥ 5M) | 2nd mortgage |
|---|---|---|
| UAE National | 85% / 75% | 65% |
| UAE Resident | 80% / 70% | 60% |
| Non-resident | 50% / 50% | 50% |
Cash is the first buyer type (no loan).

## Mortgage payment
- Fixed rate for 1–5 years (default 2), then **EIBOR (1M / 3M / 6M / 1Y) + bank margin** (default 1.50%).
  After the fixed period the remaining balance is re-amortised over the rest of the term at EIBOR + margin
  ("if EIBOR stays where it is").
- Monthly payment (C34) = standard annuity on the loan. Life insurance (C35) = `lifePct`% of the loan a month;
  property insurance (C36) = `propPct`% of the price a month. Yearly mortgage cost (C38) = (payment + insurance) × 12.
- Selling with a loan: **early settlement fee** = 1% of the balance, max AED 10,000 · **release fee** (`releaseFee`,
  e.g. AED 1,290). Liability letter / NOCs vary by bank and developer → note only.

## Rent and yield
- Rent = the main source's median new-lease rent (unfurnished level) + the **furnished premium** when the
  Furnished view is on. Furnished premium = measured on Bayut in the same building (furnished vs unfurnished,
  calibrated to signed rents). The ★ default view follows the unit itself (`furnished:true` → Furnished ★).
- Service charge (C44) = AED/sqft × (internal + 25% balcony) × 1.05 when the split is known, else × size × 1.05.
- Net rent (C46) = rent − service charge − yearly mortgage cost. Net yield (C50) = net rent ÷ cash put in.
  **Good ≥ 6% · OK 5–6% · Low < 5%** (net, same as the Off-plan Report). Also shown: the price that would reach 6%.
- Next year's rent (C57) = rent × (1 + rent growth + rent premiums).

## Price fair?
- Worth today = comparable psf (the source's size-matched median) × size + **furniture value**.
- Furniture value = min(furnished premium × 3 years, furniture cost) (`furn.years`, `furn.cost`, e.g. 15,000 for a
  studio); it wears off over the hold (`furnLeft`).
- Capital growth (C72) = (comparable psf − unit psf) ÷ unit psf. Target: 10% below market.

## Sell after N years (C80–C89)
- Selling price = comparable psf × size × **market growth** × **building age** × (1 + appreciation premiums) + furniture left.
- **Market growth:** years 1–5 at the used rate `a`; **from year 6** at half of it, max 3% a year (negative or zero
  rates stay as they are). **Hold max 10 years** (the years box stops at 10; over 7 shows a long-hold warning).
- **Building age** (`growth.age`): building age from `completedDate` to the report date. Discount `rate` a year
  while the building is younger than `after`, then `rate2` a year. Measure it from the community's ready sales by
  building age (DXB Interact `P74_AGE` + Bayut; same bedroom type, last 12 months; cautious end; cap 3%; skip if no
  clear pattern or bands under 5 sales). JVC studios: −1.5% until age 6, then −3% (the cap). After age 10 the data
  often flattens (about −1.2%): keep −3% and the page says it's on the cautious side.
- Sheet C80 = (1 + market) × ageF^(1/years) − 1 (type it as a plain number, e.g. 3.35, not "3.35%").
- Resale commission 2% + 5% VAT. Profit (C85) = sale − (down payment + costs + loan) − commission.
  % total (C88) = profit ÷ cash put in; % a year (C89) = (1 + total)^(1/years) − 1.
- **With the rent collected:** profit + net rent each year (rent grows; mortgage cost switches to the EIBOR payment
  after the fixed period) + principal repaid − early settlement − release fee. Every hold card shows
  From the sale · From rent · Grand total (AED, % total, % a year).

## Growth bands (rent and price; Bayut, community, last 12 months)
negative → 0 · 0–5% keep · 5–10% × 0.75 (min 5%) · 10–20% × 0.5 (min 7.5%) · > 20% → 10%.

## What-if boxes
Market: −5% · 0% · our analysis (banded) · strong = max(8%, base + 3). Rents: −5% · 0% · our analysis · +8%.
Rent what-ifs change rent and yield only, never resale profit.

## Premium factors (rent % / appreciation %) — default 0, never negative, confirmed only
Same list and caps as the Off-plan Report (`../../offplan-report/references/rules.md`). For a ready unit the
comparables are usually **this building's own deals**, so view, developer brand and holiday-home demand are
already in the price: set them to 0 and say so in the "why".

## Size multiplier (fallback only, rent only)
Same as the Off-plan Report: only when there are too few size-matched rent deals; nearest size with enough deals ×
(unit size ÷ comparable size); show it in `how` and as an "estimated" note.

## Wording
- Verdict headline: "Priced N% above recent sales" / "Priced N% below recent sales". Never "good buy", "hold" or advice.
- Plain short sentences. Every source shows its period and "pulled <date>". Disclaimer in the footer.
