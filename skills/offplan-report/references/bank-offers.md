# Developer × bank off-plan offers (check this for EVERY off-plan property)

**When to use:** read the developer's name from the sales offer / brochure and look it up in the table below.
If the developer (or a group it belongs to, e.g. Nakheel / Meraas / Dubai Properties = Dubai Holding) has a deal,
the report gets a **bank-offer option** next to "Any bank · handover mortgage" (Mortgage → Yes → Bank row),
exactly like Ellington × ADCB in the Belgravia Gardens report. No deal → only the normal handover mortgage.

**Before using a deal:** re-check the developer's or bank's page on the day (rates are often "limited time"),
and say in the report what was not stated (e.g. "ADCB doesn't publish how payments work before handover").
Never assume resale buyers are covered: no deal says so.

**Where the mortgage section lives:** in the Off-plan Report template itself (section 5 "Your mortgage, year by year"); it appears when the data has `construction`, `eibor`, `mortgage`, `buyers` and `varDefaults` (`modules.md`).

**Data (`UNITS.studio.offer`)** — fill from the table; leave out what isn't stated:
```
offer:{n:"ADCB × Ellington", rate:3.49, fy:3, maxLtv:50, date:"19 Aug 2026", src:"<url>",
       pm:"full",            // "io" = interest/profit only before handover (e.g. DIB), "full" = full payments (default)
       handoverOnly:false}   // true = the bank only pays the handover instalment (e.g. Emaar's wording)
```
The mortgage section always uses the developer's **normal payment plan** (`construction.items`, `handoverPct`),
even for a resale: you pay until the bank's share starts (max 50%: Central Bank cap), then the bank pays the rest.
Conditions such as "starts at 30% / 35% built" are not modelled yet: mention them in the bank note.


Use this when a report needs a "bank offer" option like Ellington × ADCB. Verify the deal again on the day (terms are often limited-time).
"–" = not stated in the source. Resale buyers are not mentioned in any deal.

| # | Date | Developer × Bank | Pays during construction? | Starts when | Max LTV | Rate | Fees waived | Pre-approval | Eligibility / notes | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 12 Oct 2026 | Sobha × RAKBANK | Yes (selected Dubai off-plan) | ≥50% paid + "prescribed" construction milestone | – | "preferential" | – | – | Freehold; non-residents for ready units | tradearabia.com/News/487872 |
| 2 | 8 Oct 2026 | ORA (BAYN, Abu Dhabi) × ADCB | Yes, all amounts until handover | After the 50% paid | – | "competitive" | – | up to 12 months | BAYN buyers only | menafn.com/1111787008 |
| 3 | 8 Oct 2026 | Expo City Dubai × Mashreq | Yes, approved units | – | – | – | – | instant digital | – | tradearabia.com/News/487702 |
| 4 | 6 Oct 2026 | Expo City Dubai × DIB (Islamic) | Yes, staged with construction | ≥35% built + ≥50% paid | 50% | – | – | – | **Profit-only during construction**; full instalments at handover or 24 months after drawdown; nationals, residents and non-residents | zawya.com (DIB & Expo City) · WAM |
| 5 | 1 Oct 2026 | H&H × Emirates NBD | Yes, 50% → handover | 50% paid | – | "competitive" | – | – | Pilot: Eden House The Park | zawya.com (ENBD & H&H) |
| 6 | 15 Sep 2026 | Dubai Holding RE (Nakheel / Meraas / DP) × ADCB | Yes | Palm Jebel Ali, The Acres, Nad Al Sheba Gardens: 50% paid, any progress; others: "prescribed" milestones | – | from 3.49% fixed 3 yrs | processing + valuation | **up to 18 months** | – | meraas.com news |
| 7 | 10 Sep 2026 | Shamal × Emirates NBD | Yes, 50% → handover | 50% paid | – | "competitive" | – | – | – | zawya.com (ENBD & Shamal) |
| 8 | 4 Sep 2026 | Aldar × ADCB (ADREC framework, Abu Dhabi) | Yes, remaining instalments + handover | 50% paid (CBUAE rule) | – | – | arranged free via Home Finance by Aldar | – | Bank registered before handover; other banks can join | zawya.com · khaleejtimes.com |
| 9 | ~22 Aug 2026 | DIB off-plan home finance (any DIB-approved developer) | Yes | as #4 | 50% | – | – | – | Profit-only during construction; launch date unverified | khaleejtimes.com (26 Aug 2026) |
| 10 | 19 Aug 2026 | **Ellington × ADCB** | Yes, milestones + handover | – | 50% | from 3.49% fixed 3 yrs (limited time) | processing + valuation | 12 months, renewable to handover | "eligible Ellington customers" | ellingtonproperties.ae · gulfnews.com |
| 11 | 29 Jul 2026 | Emaar × ADCB | Handover payments (milestones not mentioned) | – | 50% | from 3.49% fixed 3 yrs (limited time) | processing + valuation | 12 months, renewable | Dubai ready + off-plan | emaar.com press release |
| 12 | 22 Jul 2026 | Dubai South × Emirates NBD (MoU) | Yes, qualifying units | – | – | "competitive" | – | – | – | zawya.com |
| 13 | 7 Jul 2026 | Modon × ADIB (MoU, Islamic) | Yes | – | **75% (conflicts with the 50% CBUAE cap: unclear)** | – | – | – | Buyer pays 15% during construction + 5–10% at handover; future Modon projects | adib.ae news Jul 2026 |
| 14 | 1 Jul 2026 | Sobha × NBQ (MoU) | Yes (incl. Siniya Island, Downtown UAQ) | – | – | "preferential" | – | – | – | sobharealty.com press |
| 15 | 29 Jun 2026 | Expo City Dubai × Emirates NBD | Yes ("payment assurance") | – | – | – | – | – | – | gulfbusiness.com |
| 16 | 10 Jun 2026 | Dubai Holding RE × CBD | Yes | 50% paid + 30% built | – | fixed or variable (no figures) | – | digital | Nationals + residents; conventional or Islamic | meraas.com news |
| 17 | 2 Jun 2026 | Mashreq off-plan home loan (bank-wide) | Yes, select projects | ≥35% built, ≥50% paid, handover ≤24 months | 50% (broker) | – | no pre-approval fee | – | Residents only; broker: max AED 10m, salary ≥40k | zawya.com · mortgease.ae |
| 18 | 25 May 2026 | DAMAC × ADIB (new plan) | – | – | – | – | fee waivers, free takaful | – | – | gulfnews.com |
| 19 | 11 May 2026 | Dubai Holding RE × ADIB (Islamic, Forward Ijarah) | Yes, aligned to milestones | – | – | "competitive" | – | – | 25-year tenor | dp.ae article 192 |
| 20 | 30 Apr 2026 | ADCB off-plan mortgage (bank-wide base product) | Yes | Final approval at 50% paid or at handover | 50% | from 3.49% fixed 3 yrs (3-month launch offer) | processing + valuation | 12 months, renewable | Conventional + Islamic | gccbusinessnews.com · adcb.com PDF |
| 21 | 16 Apr 2026 | Dubai Holding RE × Emirates NBD | Yes | 50% paid + 30% built; pre-approval at booking | – | "competitive" | – | at booking | Residents + non-residents | nakheel.com press · gulfnews.com |
| 22 | 8 Apr 2026 | Sobha × Emirates NBD | Yes, booking → handover | ENBD general: ≥50% own funds, ≥30% built (40% for resale, broker) | – | standard (broker) | – | – | – | emiratesnbd.com · mortgease.ae |
| 23 | 26 Feb 2026 | Al Zorah (Ajman) × Ajman Bank (MoU, Islamic) | Yes | – | – | – | – | – | – | ajmanbank.ae |
| 24 | 28 Jan 2026 | Sobha × ADIB (Islamic) | Yes | 35% built | – | – | – | – | Residents | adib.ae news Jan 2026 |
| 25 | 25 Nov 2025 | Majid Al Futtaim × Emirates NBD (MoU) | Yes, remaining + handover | 50% paid | – | – | – | – | Tilal Al Ghaf, Ghaf Woods; nationals + residents | emiratesnbd.com campaign |
| 26 | 27 May 2025 | Binghatti × ADIB (MoU, Islamic) | Yes | 35% built | – | – | – | – | – | adib.ae news May 2025 |
| 27 | 4 Mar 2025 | DAMAC × ADIB (Islamic) | Yes | 35% built + ≥50% paid | – | – | – | – | Residents; Cavalli Tower, DAMAC Lagoons, DAMAC Hills 2 | adib.ae news Mar 2025 |

Not found for 2024–26: Danube, Azizi, Samana, Omniyat, Select Group, Imtiaz, Wasl, Meydan, Deyaar, Union Properties, Tiger, Object 1, Reportage, Taraf, Nshama, Arada, Bloom, Eagle Hills, Imkan, RAK Properties, Al Hamra, Marjan, Alef. Banks with no developer deal found: FAB, HSBC, Standard Chartered, Emirates Islamic.

## Central Bank rule
Off-plan loans are capped at **50% of the value** for everyone (CBUAE mortgage regulations, 2013), so the buyer pays at least 50% first. Construction thresholds (30% / 35% / 40%) are bank rules, not Central Bank rules.

## Inputs the report needs for a bank offer (data `offer`)
1. Bank, developer, date, emirate, which projects
2. **When the bank starts paying:** % paid by the buyer (usually 50%) and % built (none / 30% / 35% / "prescribed"); any "handover within X months" rule
3. **Max LTV** (50% off-plan)
4. **What the bank pays:** remaining milestones + handover, or handover only
5. **Payments before handover:** interest/profit-only or full payments; when full payments start; tenor (usually 25 years)
6. **Rate:** from x%, fixed how many years, limited-time until when
7. **Fees waived:** processing, valuation, pre-approval; free insurance/takaful
8. **Pre-approval:** validity and renewal; issued at booking or later
9. **Eligibility:** nationals / residents / non-residents, minimum income, maximum loan; resale buyers covered?
10. Conventional or Islamic; MoU only or launched product
