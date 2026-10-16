# Optional modules (switched on by the data file)

Since 16 Oct 2026 the separate Distressed and Mortgage reports are **modules** of the three calculators.
A report shows a module only when its data is in the data file; with none of it, the report looks exactly as before.

| Module | Off-plan Report | Post-Handover Report | Ready Property Report |
|---|---|---|---|
| **Distressed deal test** (section 1 A: 7% rental ROI + 10% below what similar units sold for; both must be met) | `distressed:true` + `proj` (this project's own DLD sales) | `distressed:true` + `proj` | `distressed:true` (compares with the size-matched sales already in the data) |
| **Market evidence + Similar listings now** | whenever the data has `proj` (`proj.listings` for the listings) | same as off-plan | always (the Ready data already has them) |
| **Mortgage** (cash / mortgage switch, "Your mortgage, year by year") | when the data has `construction`, `eibor`, `mortgage`, `buyers`, `varDefaults`; a developer × bank deal adds `offer` (`bank-offers.md`) | **never** (a mortgage makes no sense on a post-handover plan) | always available; `mortgageReport:true` adds the mortgage deal test (positive cashflow) and opens the year-by-year section |
| **Developer** (optional, slow, ask first) | `dev` | `dev` | `dev` |

## Distressed = secondary market only
A distressed deal is a **resale by an owner** (secondary market), off-plan or ready. Units bought new from the developer
(primary market) never get the distressed test. Data: `market:"secondary"` / `"primary"`. Off-plan and post-handover count as
primary unless the data says `market:"secondary"`; Ready counts as secondary unless it says `market:"primary"`.
In the listings, units still sold new by the developer (Property Finder "off_plan_primary", Bayut "Initial Sale") get
**New** instead of a distressed verdict (11th item field `1`) and are left out of the distressed-deal count.

## Section order (all three calculators)
1 Is it a good deal? · 2 What could happen · 3 Market evidence · 4 Similar listings now · 5 Your mortgage, year by year ·
6 Supply & demand · 7 The developer · 8 Things to know · 9 The unit & your costs (Ready) / The unit & payment plan (off-plan,
post-handover) · 10 Location & comfort · 11 The calculations.
Sections without data are skipped and the numbers close up (the page numbers the visible sections itself).

## Distressed deal test — how to fill `proj` (off-plan / post-handover)
- Compare with **this project's own sales**, not the area: DXB Interact → the project → sales of the same unit type and
  size band (±10%), last 6 months (widen to 12 if fewer than 5). Owner resales listed separately (`resales`).
- Check the real handover date on **DLD → Project Status Enquiry** (listings often quote an earlier date) → `proj.handover`.
- `proj.listings`: every similar unit for sale in the project on Property Finder and Bayut (asking prices; mark unverified ones).
- Rent stays as in the normal calculation. For a resale, fees are the developer NOC + buyer's agency (`nocFee`, `buyAgency`,
  `adminLabel`) instead of the Oqood admin fee.
- Objectives: rental ROI = net rent at handover ÷ total cost (Yes ≥ 7%, almost 6–7%); capital appreciation =
  (project median AED/sqft − your AED/sqft) ÷ your AED/sqft (Yes ≥ 10%, almost 7–10%).
