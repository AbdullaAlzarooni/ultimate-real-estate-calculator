---
name: ready-report
description: Build a client-ready Dubai/UAE ready (completed) property evaluation report (HTML page + PDF) from a listing (Bayut / Property Finder link or details), for cash or mortgage buyers. Use when someone wants to know if a ready apartment is fairly priced vs recent sales, its net rent and yield on their cash, what it could sell for after N years (market growth and building age), mortgage costs (UAE National / Resident / Non-resident, 1st or 2nd mortgage, fixed rate then EIBOR + margin), or wants a report like the "Binghatti Azure studio" example.
---

# Ready Property Report

Version **1.1.0** (see `VERSION` and `CHANGELOG.md`).

A report for a **ready unit on the resale market**: is the price fair vs what similar units in the building
actually sold for, what does it rent for (unfurnished and furnished), the net yield on the cash you put in,
**cash or mortgage** (loan limits by buyer type, fixed rate then EIBOR + bank margin, monthly payment,
insurance, bank fees, early settlement and release fees), and what you'd make selling after 1–10 years
(market growth and a building-age discount). Plus supply & demand, an optional developer section, view map,
location comfort, step-by-step maths, photos and a client PDF. Driven by **one data file**; the template does
the maths.

Read these before starting (all in `references/`):
- `workflow.md`  – the exact step-by-step process (follow it in order)
- `sources.md`   – every website, what to read on it, URL patterns, gotchas, fallbacks
- `rules.md`     – formulas, fees, loan limits, growth bands, building age, long holds, premiums, labels
- `design.md`    – section order and design/wording decisions
- `listings-and-evidence.md` – how to collect the project's sales, similar listings and resale info
- `modules.md`   – optional modules (distressed deal, mortgage, market evidence, developer) and the section order
- `data-schema.md` – every field of the data file
- `developer-section.md` – the optional Developer section

The build kit is in `kit/` (copy it to a working folder first – see step 0).

## Golden rules
1. **Answers, not a calculator.** The output is a finished report, not a form.
2. **Never invent data.** Every number comes from a source you actually opened, or from the user.
   Minimum sample: 5 deals; widen with a custom window (shortest that reaches 5), else say "no data".
   **Medians** from each source's own deal list, never a site's summary average.
3. **Facts, not advice.** Headline says e.g. "Priced 4% above recent sales"; never "good buy",
   "hold", "you should". Keep the disclaimer.
4. **Say each number once.** Don't repeat the same figure in two places.
5. **Ask before downloading** anything the user didn't ask for, before publishing/sharing outside
   their account, and before typing into anything that isn't a search/filter box. Never enter passwords.
6. **Credit line stays.** Never remove the footer line "The Ultimate Real Estate Calculator · Ready Property Report v… © 2026 Abdulla Alzarooni …" or the
   copyright notices; they are required by the LICENSE.
7. **Never use Property Monitor** (it prohibits AI / automated use; `sources.md`).
8. **Every image must load** and **verify before handing over** (`workflow.md` step 9). Report failures honestly.

## Quick start
```bash
cp -R ~/.claude/skills/ready-report/kit  "<working folder>/ready-reports"   # once
# first time only: fill config/agent.js and drop logo/photo into brand/ (optional)
cp data/example-binghatti-azure-studio.js data/<project>-<unit>.js         # per property
# ...fill the data file following workflow.md...
python3 build.py data/<project>-<unit>.js          # -> <project>-<unit>.html (+ .files.txt)
python3 -m http.server 8000                         # open http://localhost:8000/<project>-<unit>.html
# then: no console errors, every image loads (workflow.md step 9)
```
Then make the PDF and publish/share (workflow steps 10–11).

## First run for a new person
**Guide them step by step, in plain words; don't assume they are technical.**
0. **Check the setup** before anything else and help fix what's missing (one item at a time):
   `python3 --version`, Google Chrome installed, and the **Claude in Chrome** extension connected (needed to
   read the data sites). If something is missing, explain what it is in one line and walk them through
   installing it (official sites only; ask before downloading).
   Then copy `kit/` to a working folder they choose (default `~/Documents/Ready Reports`).
   If they already use the Off-plan or Post-Handover Report, reuse its `config/agent.js` and `brand/`.
1. Ask once, then save into `config/agent.js` of their working folder (and remember it):
name, company, BRN, WhatsApp number, social links, optional formulas credit line; optional files in `brand/`:
`logo-dark.png` + `logo-light.png` and `agent.jpg` (square headshot). Anything left empty is simply hidden.
2. Ask which data accounts they have (DXB Interact; Bayut is public). DXB Interact + Bayut is the normal setup.
**Never use Property Monitor**, even if they have an account: it prohibits AI / automated use (`sources.md`).
2b. **Ask about the optional Developer section** before collecting any data, in these words or close:
"The *Developer* section is optional and takes a long time to build. Would you like it? If yes, it shows every
project by this developer – ready, under construction and planned – each with photos, completion date and DLD
target, % built, unit mix, rented % or absorption rate, and price / rent premium vs its area for each unit type
(off-plan premium for projects not finished yet), with area and unit-type filters and a search box."
If no, build the report without it. If yes, tell them it adds a lot of time, then follow
`references/developer-section.md` (data format: `data-schema.md` → Developer section).
2c. **Ask whether the unit is a resale (from an owner) or bought new from the developer.** Only resales get the
   distressed deal test (`listings-and-evidence.md` step 0). For a mortgage, see `modules.md`.
3. Then ask for the first property (a Bayut / Property Finder listing link, or the price, size, building and
   unit type) and whether the buyer pays cash or takes a mortgage (the report shows both either way; this sets
   nothing, it just tells you what to explain). Follow `workflow.md`. Tell them what you are doing as you go.
