# Design — keep these decisions (they were tested with real users)

The template already implements all of this. Don't undo it when editing. Shared look and footer come from the
Off-plan Report (`../../offplan-report/references/design.md`).

## Page order
Sticky menu → hero → controls → sections in the order of `modules.md` (1 Is it a good deal → 2 What could happen → 3 Market evidence → 4 Listings → 5 Mortgage → 6 Supply & demand → 7 Developer → 8 Things to know → 9 Unit → 10 Location → 11 Calculations); sections without data are skipped and renumbered.

## Hero
- Eyebrow "<agent name> · Ready property evaluation", title "<Project> — <Label>".
- Chips: Unit · Size (built-up · inside + balcony) · Height · Price · Completed (with building age) · Status.
- Photo slideshow (left) and verdict box (right). Verdict: "Priced N% above/below recent sales", one caveat
  line, "Rent it out" stat (net rent, % on your cash, after-fixed-period line with a mortgage), "Sell after N
  years" stat (market rate and building-age discount in the label), small "Based on …" line.

## Controls
Rent: Unfurnished · Furnished (+premium) — ★ on the unit's own state · Data: one button per source, ★ main ·
Mortgage No / Yes → Buyer (UAE National / UAE Resident / Non-resident) + 1st / 2nd mortgage → Loan: fixed rate
and term (number box + slider), Fixed for 1–5 yrs, Then EIBOR (1M / 3M / 6M / 1Y with today's rates) + bank
margin, payment line, Reset. "★ Recommended view" and "⬇ Download PDF" (silent).

## Sections
1. Four deal checks (price fair · rent good · if rents rise · sell after N yrs) + "where the price sits" bar
   (worth today, + furniture, price for 6%, you pay, other sellers ask).
2. A · If you sell later: step 1 when (1, 2, 3, 5 years or type up to 10), step 2 how prices move (−5%, 0, our
   analysis, strong). Each card: From the sale → From rent → Grand total. B · Keep and rent: next year's rent.
3. Market evidence: each source's rent and psf with the actual deals listed (follows the Data switch).
4. Supply & demand: DEMAND donut (what buyers bought) · THIS BUILDING donut (unit mix with sizes) · SUPPLY bars
   (ready, target passed, handovers per year); takeaway, match line, 4 key points.
5. The developer (optional): Ready / Under construction / Planned tabs, area dropdown, search, unit-type chips
   (no "All types"; opens on the unit's type); this building first and marked; 12 cards a page.
6. Things to know, unit & costs (purchase costs, mortgage costs), location & comfort (view map + cards),
   the calculations (comparison table, growth bands, building age, premiums, step-by-step maths with sheet rows).

## Print / PDF
Hides controls and what-ifs, shows the recommended view (unit's own furnishing, cash, main source), first photo,
developer cards 4 per row.
