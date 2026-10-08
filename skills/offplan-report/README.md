# Off-plan Report

Part of **[The Ultimate Real Estate Calculator](../../README.md)**.

**Version 1.0.1** · [Changelog](CHANGELOG.md) · by **Abdulla Alzarooni** (Real Estate with Abdulla Alzarooni)

Turn any Dubai / UAE off-plan unit into a **client-ready evaluation report** (web page + PDF) in one
conversation with Claude. Give it a **sales offer**, a **brochure**, or a project link from
**Reelly / GenieMap / Bayut / Property Finder** — Claude collects the market data, does the maths,
and builds the report.

---

## What you get
- **Verdict** — profit if you sell at handover, net rent and net yield, in plain words
- **4 deal checks** — fair price, how safe (cushion), break-even sale price, rent
- **What-if scenarios** — market and rents (−5%, flat, our analysis, strong)
- **Conservative / normal / optimistic** cases, up to 3 data sources side by side
- **Supply & demand** — what's selling, the building's unit breakdown, handovers by year
- **Payment plan** timeline, **location & comfort** (sun, shade, noise, flooding)
- **The calculations** step by step, so the client can check every number
- **Photo gallery** with full-screen viewer
- **Your footer** — logo, photo, name, BRN, WhatsApp button (pre-filled message), social icons
- **Client PDF** and a phone-friendly page (light & dark)

---

## Quick start (Claude Code)
This skill is built for **[Claude Code](https://claude.com/claude-code)** — the Code tab in the Claude
desktop app, or the `claude` terminal app.

**1. Install** — see [Install](../../README.md#install) (one install gives you every calculator).

**2. Make a report** — attach the sales offer PDF (or paste a project link) and say:
> Make an off-plan report for this unit

**3. First time only** — Claude asks for your details (name, company, BRN, WhatsApp, socials, logo,
photo) and which data accounts you have. They are saved, so you're only asked once.

Each report takes a while: Claude visits the data sites and pulls fresh numbers for that unit.

---

## What you need
| | |
|---|---|
| **Claude Code** | required (Claude desktop app → Code tab, or the terminal app) |
| **Claude in Chrome** | browser extension, so Claude can read the data sites in your logged-in Chrome |
| **Python 3** and **Node.js** | build and check the page (Claude can help you install them) |
| **Google Chrome** | makes the PDF |
| Data accounts | see below — the free ones are enough to start |

> The claude.ai website also supports skills (upload the ZIP in Settings → Capabilities → Skills),
> but this skill is **tested in Claude Code only**; browsing, building and checking work best there.

---

## Websites it uses
| Website | Used for | Account |
|---|---|---|
| Developer sales offer / brochure (PDF) | price, sizes, payment plan, DLD, fees | – |
| [Reelly](https://find.reelly.io) | project facts, unit breakdown (if no Property Monitor), full-size photos | free login |
| [GenieMap](https://geniemap.net) | project info, payment plans, photos (most is also on Reelly) | paid, optional |
| [Property Monitor](https://propertymonitor.ae) | size-matched rents & sales, supply, project unit breakdown | paid, optional |
| [DXB Interact](https://dxbinteract.com) | off-plan price/sqft, new rents, supply (if no Property Monitor) | free tier |
| [Bayut market analysis](https://www.bayut.com/property-market-analysis/) | off-plan sales & rents, 12-month growth | public |
| Property Finder / Bayut new projects | backup project facts | public |
| Google Maps | facing, distances to metro & airport | public |
| [SunCalc](https://www.suncalc.org) · [ShadeMap](https://shademap.app) | sun and shade | public |
| [Noise-map](https://noise-map.com) | aircraft noise (dB) | public |
| [Windy](https://www.windy.com) | wind & sea exposure (every report; detailed for beachfront) | public |
| News / Wikipedia | flooding history (e.g. April 2024) | public |
| Dubai Statistics Center | population, for supply vs demand (optional) | public |

**No paid accounts?** Use Reelly instead of GenieMap, and DXB Interact instead of Property Monitor.
**Minimum for a report:** the sales offer + Bayut. Every extra source makes it stronger.
Full details per site: [references/sources.md](references/sources.md).

---

## Your branding (optional, done once)
Claude fills these for you on the first run, or edit them yourself:
- `kit/config/agent.js` — name, company, BRN, WhatsApp, social links (empty = hidden)
- `kit/brand/logo-dark.png` + `kit/brand/logo-light.png` — transparent logo (for light / dark theme)
- `kit/brand/agent.jpg` — square headshot (shown in a circle)

---

## Updating
See [Updating](../../README.md#updating).

---

## How it works (for the curious)
- `SKILL.md` — the instructions Claude follows
- `references/` — `workflow.md` (step by step), `sources.md` (websites), `rules.md` (formulas, bands,
  labels), `design.md` (layout decisions), `data-schema.md` (every field)
- `kit/` — `build.py` (data file → report), `template/report-template.html` (layout + all formulas),
  `data/example-weston-109.js` (a complete real example), `tools/` (automatic checks)

Try the example yourself:
```bash
cd ~/.claude/ultimate-real-estate-calculator/skills/offplan-report/kit
python3 build.py data/example-weston-109.js
node tools/dump.js example-weston-109.html
```
The check renders all 144 scenario combinations and must print `bad 0 []`.
(The example's photos aren't included; the page works without them.)

The formulas match the author's off-plan evaluation sheet, checked across all 144 combinations
(difference 0).

---

## License & credit
© 2026 Abdulla Alzarooni (Real Estate with Abdulla Alzarooni). All rights reserved.

**Free to use** for your own client reports. **Keep the "The Ultimate Real Estate Calculator ©" credit line** on every
report and the notices in the code. **No resale** or passing it off as your own.
Full terms: [LICENSE](../../LICENSE). Commercial use or removing the credit:
contact [@abdulla.al.zarooni](https://www.instagram.com/abdulla.al.zarooni) on Instagram.

## Disclaimer
Reports are estimates based on market data and the developer's documents — **not financial advice**.
Check each data site's terms of use. Icons: Font Awesome Free brand shapes (CC BY 4.0).
