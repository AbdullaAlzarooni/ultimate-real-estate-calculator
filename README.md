# Off-plan Report — a Claude skill

**Version 1.0.0** · [Changelog](CHANGELOG.md)

Give Claude an off-plan **sales offer / brochure**, or a project on **Reelly / GenieMap / Bayut /
Property Finder**, and get a client-ready evaluation report (web page + PDF):

- Verdict: profit if you sell at handover, net rent and yield
- 4 deal checks (fair price, how safe, break-even, rent), what-if scenarios (market & rents)
- Three data sources side by side (Property Monitor, DXB Interact, Bayut), conservative / normal / optimistic
- Supply & demand (what's selling, the building's unit mix, handovers by year)
- Payment plan, location & comfort (sun, shade, noise, flooding), full step-by-step maths
- Photo gallery with full-screen viewer, your contact footer (WhatsApp + socials), client PDF

## Tools & websites it uses
**Tools:** Claude Code (with Claude in Chrome for browsing), Python 3 (builds the page), Node.js (checks),
Google Chrome (makes the PDF). No paid software needed.

| Website | Used for | Account |
|---|---|---|
| Developer sales offer / brochure (PDF) | price, sizes, payment plan, DLD, fees | – |
| [Reelly](https://find.reelly.io) | project facts, unit breakdown (if no Property Monitor), full-size photos | free login |
| [GenieMap](https://geniemap.net) | project info, payment plans, photos (most of this is also on Reelly) | paid (optional) – use Reelly instead |
| [Property Monitor](https://propertymonitor.ae) | size-matched rents & sales, supply tracker, project unit breakdown | paid (optional) |
| [DXB Interact](https://dxbinteract.com) | off-plan price/sqft, new rents, supply (if no Property Monitor) | free tier |
| [Bayut market analysis](https://www.bayut.com/property-market-analysis/) | off-plan sales & rents, 12-month growth | public |
| Property Finder / Bayut new projects | fallback project facts | public |
| Google Maps | facing, distances to metro & airport | public |
| [SunCalc](https://www.suncalc.org) | sun path (summer / winter) | public |
| [ShadeMap](https://shademap.app) | shade at different hours | public |
| [Noise-map](https://noise-map.com) | aircraft noise (dB) | public |
| [Windy](https://www.windy.com) | wind (beachfront only) | public |
| News / Wikipedia | flooding history (e.g. April 2024) | public |
| Dubai Statistics Center | population for supply vs demand (optional) | public |

Minimum for a report: the sales offer + Bayut. Every extra source makes it stronger.
Details for each site are in [references/sources.md](references/sources.md).

## Install
```bash
git clone https://github.com/AbdullaAlzarooni/offplan-report-skill.git ~/.claude/skills/offplan-report
```
Then in Claude Code just ask, e.g. *"Make an off-plan report for this sales offer"* and attach the PDF,
or paste a Reelly/GenieMap project link.

## First-time setup (2 minutes)
1. Fill `kit/config/agent.js` with your name, company, BRN, WhatsApp and social links.
2. Optional: add `kit/brand/logo-dark.png`, `kit/brand/logo-light.png` (transparent) and
   `kit/brand/agent.jpg` (square photo). Anything missing is simply hidden.
3. Data access: the report is best with **Property Monitor** (size-matched comparables) and
   **DXB Interact**; it also works with **Bayut** only (public). Claude uses a browser you're logged in to.

## How it works
- `SKILL.md` — instructions Claude follows; `references/` — workflow, sources, rules, design, data schema.
- `kit/` — `build.py` (data file → report), `template/report-template.html` (layout + maths),
  `data/example-weston-109.js` (complete example), `tools/` (automated checks).

```bash
cd kit
python3 build.py data/example-weston-109.js    # builds example-weston-109.html
node tools/dump.js example-weston-109.html     # renders all 144 scenario combinations: "bad 0 []"
```
(The example's photos aren't included; the page works without them.)

## License
© 2026 Abdulla Alzarooni (Real Estate with Abdulla Alzarooni). Free to use for your own client
reports; keep the "Report engine ©" credit line on every report; no resale. See [LICENSE](LICENSE).

## Disclaimer
Reports are estimates from public/market data and the developer's documents, not financial advice.
Check each data site's terms of use. Icons: Font Awesome Free brand shapes (CC BY 4.0).
