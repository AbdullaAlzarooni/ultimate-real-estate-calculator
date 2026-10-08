# Off-plan Report engine · © 2026 Abdulla Alzarooni. All rights reserved.
# Licensed under the Off-plan Report License (see LICENSE). Keep this notice.
"""Build a property report:  python3 build.py data/<name>.js   ->  <name>.html (+ <name>.files.txt)

template/report-template.html  layout + maths (do not edit per property)
config/agent.js                YOUR details: name, company, BRN, WhatsApp, socials (fill once)
brand/                         optional: logo-dark.png, logo-light.png (transparent PNG), agent.webp|jpg|png (square photo)
data/<name>.js                 one property's data (start from data/example-weston-109.js)
"""
import sys, pathlib, base64, re, html as H

here = pathlib.Path(__file__).parent
data = pathlib.Path(sys.argv[1])
tpl = (here / "template" / "report-template.html").read_text()
assert tpl.count("/*@@DATA@@*/") == 1
src = data.read_text().rstrip("\n")

# agent details come from config/agent.js unless the data file defines its own AGENT
if "const AGENT" not in src:
    agent_file = here / "config" / "agent.js"
    src += "\n" + (agent_file.read_text() if agent_file.exists()
                   else 'const AGENT={name:"",company:"",whatsapp:"",brn:"",formulas:"",socials:{}};')

MIME = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg"}
def brand(*names):
    """Inline the first brand image that exists; empty string hides the <img>."""
    for n in names:
        p = here / "brand" / n
        if p.exists():
            return f"data:{MIME[p.suffix[1:].lower()]};base64," + base64.b64encode(p.read_bytes()).decode()
    return ""

title = re.search(r'project:"([^"]+)"', src).group(1)
pdf = (re.search(r'pdf:"([^"]+)"', src) or [None, ""])[1]
html = (tpl.replace("/*@@DATA@@*/", src)
        .replace("@@LOGO_DARK@@", brand("logo-dark.png"))
        .replace("@@LOGO_LIGHT@@", brand("logo-light.png"))
        .replace("@@AVATAR@@", brand("agent.webp", "agent.jpg", "agent.jpeg", "agent.png"))
        .replace("@@TITLE@@", title)
        .replace("@@PDF@@", pdf))

# photos are linked as files next to the page (data/...), so the page stays light
m = re.search(r'heroImgs:\[(.*?)\]\],', src, re.S)
pairs = re.findall(r'\[\s*"([^"]+)"\s*,\s*"([^"]*)"\s*\]', m.group(1) + "]") if m else []
slides = "".join(
    f'<img class="gslide" src="data/{f}" alt="{H.escape(c)}" data-cap="{H.escape(c)}"'
    + (' loading="lazy"' if i else ' fetchpriority="high"') + '>'
    for i, (f, c) in enumerate(pairs))
html = html.replace("@@HERO_SLIDES@@", slides)

out = here / (data.stem + ".html")
out.write_text(html)
(here / (data.stem + ".files.txt")).write_text("\n".join("data/" + f for f, _ in pairs))
print("built", out.name)
