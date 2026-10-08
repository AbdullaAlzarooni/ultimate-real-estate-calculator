# Design — keep these decisions (they were tested with real users)

The template already implements all of this. Don't undo it when editing.

## Page order
Sticky menu → hero → controls → 1 Is it a good deal → 2 What could happen → 3 Supply & demand →
4 Things to know → 5 Unit & payment plan → 6 Location & comfort → 7 The calculations (folded) → footer.

## Hero
- Eyebrow "<agent name> · Off-plan evaluation", title "<Project> — <Type>".
- Line 1: "📍 <area>, <emirate>". Line 2: labelled pill chips Unit · Size · Price · Handover.
- Photo slideshow (left) and verdict box (right) at **equal height**; stacked on phones.
- Slideshow: arrows, swipe, auto-advance 5 s (pauses on hover), counter "n / N" when > 12 photos,
  caption + credit; tapping a photo opens a full-screen viewer (uncropped, arrows, Esc, swipe).
- Verdict box: headline + one caveat line; "Sell at handover" stat; "Rent it out" stat; small
  "Based on <source> · <case> · market · rents" line. No duplicated numbers.
- No logo at the top (the logo lives in the footer signature).

## Controls
Source buttons · case buttons · "★ Recommended view" (resets to recommended picks, silent) ·
"⬇ Download PDF" (silent). No status text on click.

## Sections
1. Four deal checks: big coloured figure + one short paragraph each (fair price · how safe ·
   break-even · rent); a price ruler (becomes a stacked list on phones).
2. A: pick the market (radio-style boxes, "☝ Tap to choose", ★ Recommended badge, dot bottom-right)
   → 3 valuation cases (static). B: pick how rents move (same radio style). Static cards never look tappable.
3. Supply & demand: takeaway sentence; cards tagged DEMAND (blue donut "of sales", same categories as the building) · THIS BUILDING
   (green donut "of units", size ranges) · SUPPLY (handover bars, peak row "YYYY · <building>",
   no dashed lines/flags); a "mix matches what's selling" line; 4 key points (big number + 2 lines);
   quiet sources line.
4. Things to know: 2-column bullets, no repeats of numbers shown elsewhere.
5. Unit card + payment plan with a timeline bar (every % label visible).
6. Comfort cards, each with source links (notes only).
7. The calculations: comparison table (follows the picks, sticky first column on phones +
   "swipe" hint), growth bands, premium cards, step-by-step maths.

## Footer
One row: [logo | round photo | Prepared by <name> · BRN] … [WhatsApp button with icon]
[social icons]. Disclaimer + "Prepared <date>" lines full width below.
WhatsApp pre-filled text: "Hi <first name>, I am interested to invest in <project>".
Social icons are inline SVG (no icon library). Empty links are hidden.

## Look
Dark by default with a light theme; brand accent green; neutral blacks. Section numbers in badges,
40 px spacing. Must work at 390 px: no sideways scroll, nothing overlapping. Print/PDF hides the
controls, what-ifs, location and calculations, and shows the recommended view with the first photo.
