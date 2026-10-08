---
name: offplan-report
description: Build a client-ready Dubai/UAE off-plan property evaluation report (HTML page + PDF) from a sales offer, brochure, or a project on Reelly / GenieMap / Property Finder / Bayut. Use when someone shares an off-plan project, unit, brochure or sales offer and wants to know if it is a good investment, its rental yield, resale profit at handover, supply risk, or wants an evaluation report like the "Weston by Wadan" example.
---

# Off-plan evaluation report

Version **1.0.0** (see `VERSION` and `CHANGELOG.md`).

Turns one off-plan unit into a polished, phone-friendly report: verdict, deal checks, what-if
scenarios, supply & demand, payment plan, location comfort, full step-by-step maths, photo gallery,
and a client PDF. Everything is driven by **one data file**; the template does the maths.

Read these before starting (all in `references/`):
- `workflow.md`  – the exact step-by-step process (follow it in order)
- `sources.md`   – every website, what to read on it, URL patterns, gotchas, fallbacks
- `rules.md`     – formulas, growth bands, premiums, valuation cases, labels, wording rules
- `design.md`    – section order and the design/wording decisions the report must keep
- `data-schema.md` – every field of the data file, with the Weston example

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
6. **Credit line stays.** Never remove the footer line "Report engine © 2026 Abdulla Alzarooni …" or the
   copyright notices; they are required by the LICENSE.
7. **Verify before handing over:** run the checks in `workflow.md` (step 9). Report failures honestly.

## Quick start
```bash
cp -R ~/.claude/skills/offplan-report/kit  "<working folder>/offplan-reports"   # once
# first time only: fill config/agent.js and drop logo/photo into brand/ (optional)
cp data/example-weston-109.js data/<project>-<unit>.js                         # per property
# ...fill the data file following workflow.md...
python3 build.py data/<project>-<unit>.js          # -> <project>-<unit>.html
node tools/domtest.js <project>-<unit>.html </dev/null   # must print the summary, no errors
node tools/dump.js <project>-<unit>.html                  # must print: bad 0 []
```
Then make the PDF and publish/share (workflow steps 10–11).

## First run for a new person
**Guide them step by step, in plain words; don't assume they are technical.**
0. **Check the setup** before anything else and help fix what's missing (one item at a time):
   `python3 --version`, `node --version`, Google Chrome installed, and the **Claude in Chrome**
   extension connected (needed to read the data sites). If something is missing, explain what it is
   in one line and walk them through installing it (official sites only; ask before downloading).
   Then copy `kit/` to a working folder they choose (default `~/Documents/Off-plan Reports`).
1. Ask once, then save into `config/agent.js` of their working folder (and remember it):
name, company, BRN, WhatsApp number, social links (any of Instagram, Facebook, TikTok, YouTube,
Threads, X, LinkedIn, Snapchat), optional formulas credit line; optional files in `brand/` of the working folder:
`logo-dark.png` + `logo-light.png` (transparent; light/dark versions) and `agent.jpg` (square
headshot – crop to the face, it shows in a circle). Anything left empty is simply hidden.
2. Ask which data accounts they have (Property Monitor, DXB Interact, Reelly, GenieMap) –
this decides which sources and fallbacks to use (no paid accounts → Reelly + DXB Interact + Bayut).
3. Then ask for the first property (sales offer PDF, brochure, or a project link) and follow `workflow.md`.
   Tell them what you are doing as you go (e.g. "Reading Bayut rents…") and what each step needs from them.
