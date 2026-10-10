---
name: posthandover-report
description: Build a client-ready Dubai/UAE post-handover payment plan (PHPP) evaluation report (HTML page + PDF) from a sales offer, brochure, or a project on Reelly / GenieMap / Property Finder / Bayut. Use when a unit is sold on a post-handover plan (e.g. 60/40, 50/50 with payments after handover) and someone wants to know if the rent covers the instalments after handover, the yield on their cash, the profit if they sell at handover, or wants a report like the "Weston by Wadan PHPP" example.
---

# Post-handover evaluation report

Version **1.0.0** (see `VERSION` and `CHANGELOG.md`).

Same report as the Off-plan Report (verdict, deal checks, what-if scenarios, supply & demand, view maps,
location comfort, step-by-step maths, photos, client PDF) plus everything a **post-handover payment plan**
needs: the instalments you still pay after handover, how much of them the rent covers, the monthly top-up,
the yield on the cash you actually put in, and an empty-months slider. Driven by **one data file**; the
template does the maths.

Read these before starting (all in `references/`):
- `workflow.md`  – the exact step-by-step process (follow it in order; post-handover differences at the end)
- `sources.md`   – every website, what to read on it, URL patterns, gotchas, fallbacks
- `rules.md`     – formulas, growth bands, premiums, valuation cases, labels; post-handover maths at the end
- `design.md`    – section order and design/wording decisions; post-handover additions at the end
- `data-schema.md` – every field of the data file, including the post-handover fields

The build kit is in `kit/` (copy it to a working folder first – see step 0).

## Golden rules
1. **Answers, not a calculator.** The output is a finished report, not a form.
2. **Never invent data.** Every number comes from a source you actually opened, or from the user.
   If a source is missing (no account), use the fallback in `sources.md` and say so in the report.
   Minimum sample: 5 transactions; widen 3 months → 6 months → 1 year; else say "no data".
3. **Facts, not advice.** Headline says e.g. "Profitable at handover, not before"; never "good buy",
   "hold", "you should". Keep the disclaimer.
4. **Say each number once.** Don't repeat the same figure in two places.
5. **Ask before downloading** anything the user didn't ask for, before publishing/sharing outside
   their account, and before typing into anything that isn't a search/filter box. Never enter passwords.
6. **Credit line stays.** Never remove the footer line "The Ultimate Real Estate Calculator · Post-Handover Report v… © 2026 Abdulla Alzarooni …" or the
   copyright notices; they are required by the LICENSE.
7. **Verify before handing over:** run the checks in `workflow.md` (step 9), including `tools/sheetcheck-ph.js`. Report failures honestly.

## Quick start
```bash
cp -R ~/.claude/skills/posthandover-report/kit  "<working folder>/post-handover-reports"   # once
# first time only: fill config/agent.js and drop logo/photo into brand/ (optional)
cp data/example-weston-109-ph.js data/<project>-<unit>.js                                # per property
# ...fill the data file following workflow.md...
python3 build.py data/<project>-<unit>.js          # -> <project>-<unit>.html
node tools/domtest.js <project>-<unit>.html </dev/null   # must print the summary, no errors
node tools/dump.js <project>-<unit>.html                  # must print: bad 0 []
node tools/sheetcheck-ph.js <project>-<unit>.html         # post-handover sheet check, diff ≈ 0
```
Then make the PDF and publish/share (workflow steps 10–11).

## First run for a new person
**Guide them step by step, in plain words; don't assume they are technical.**
0. **Check the setup** before anything else and help fix what's missing (one item at a time):
   `python3 --version`, `node --version`, Python packages `pymupdf` and `pillow` (`pip3 install pymupdf pillow`), Google Chrome installed, and the **Claude in Chrome**
   extension connected (needed to read the data sites). If something is missing, explain what it is
   in one line and walk them through installing it (official sites only; ask before downloading).
   Then copy `kit/` to a working folder they choose (default `~/Documents/Post-Handover Reports`).
   If they already use the Off-plan Report, reuse its `config/agent.js` and `brand/` (same details).
1. Ask once, then save into `config/agent.js` of their working folder (and remember it):
name, company, BRN, WhatsApp number, social links, optional formulas credit line; optional files in `brand/`:
`logo-dark.png` + `logo-light.png` and `agent.jpg` (square headshot). Anything left empty is simply hidden.
2. Ask which data accounts they have (Property Monitor, DXB Interact, Reelly, GenieMap) –
this decides which sources and fallbacks to use (no paid accounts → Reelly + DXB Interact + Bayut).
3. Then ask for the first property (sales offer PDF with the full payment plan, brochure, or a project link)
   and follow `workflow.md`. Tell them what you are doing as you go and what each step needs from them.
