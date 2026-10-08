# The Ultimate Real Estate Calculator

**Version 1.0** · [Changelog](CHANGELOG.md) · [Releases](../../releases)

by **Abdulla Alzarooni** · Real Estate with Abdulla Alzarooni ·
[Instagram](https://www.instagram.com/abdulla.al.zarooni)

A set of **Claude skills** that turn Dubai / UAE property deals into **client-ready reports** —
real market data, clear verdicts, every calculation shown. Install once, get every calculator,
and new ones arrive with a single update.

## Calculators
| Calculator | What it does | Version |
|---|---|---|
| [**Off-plan Report**](skills/offplan-report/README.md) | Sales offer / brochure / Reelly or GenieMap link → full off-plan evaluation (profit at handover, yield, what-ifs, supply & demand, payment plan, location, PDF) | 1.1.0 |
| Post-handover | coming soon | – |
| Ready property | coming soon | – |
| Mortgage | coming soon | – |
| Airbnb / holiday home | coming soon | – |
| Distressed deal | coming soon | – |

## Install
Built for **[Claude Code](https://claude.com/claude-code)** (the Code tab in the Claude desktop app,
or the `claude` terminal app). Paste this into Claude Code:

> Install The Ultimate Real Estate Calculator: https://github.com/AbdullaAlzarooni/ultimate-real-estate-calculator

Claude downloads it and guides you through the setup. Or run it yourself:
```bash
git clone https://github.com/AbdullaAlzarooni/ultimate-real-estate-calculator.git ~/.claude/ultimate-real-estate-calculator
bash ~/.claude/ultimate-real-estate-calculator/install.sh
```
Then just ask, e.g. *"Make an off-plan report for this unit"* and attach the sales offer.
If Claude doesn't pick it up right away, start a new session.

## Updating
```bash
cd ~/.claude/ultimate-real-estate-calculator && git pull && bash install.sh
```
Gets fixes and any new calculators. Your details and reports live in your own working folder, so they
are not touched.

## What you need
Claude Code · the **Claude in Chrome** extension · Python 3 · Node.js · Google Chrome.
Claude checks these on the first run and helps you install anything missing.
Each calculator's page lists the websites and accounts it uses.

## License & credit
© 2026 Abdulla Alzarooni (Real Estate with Abdulla Alzarooni). All rights reserved.
**Free to use** for your own client reports. **Keep the credit line**
("The Ultimate Real Estate Calculator · … © 2026 Abdulla Alzarooni") on every report and the notices
in the code. **No resale.** Full terms: [LICENSE](LICENSE).

## Disclaimer
Reports are estimates based on market data and developers' documents — **not financial advice**.
