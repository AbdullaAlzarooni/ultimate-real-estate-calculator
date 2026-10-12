# The Ultimate Real Estate Calculator — Ready Property Report · © 2026 Abdulla Alzarooni. See LICENSE.
"""Maintainers only: rebuild report-template.html = shared CSS + agent footer (from the Off-plan kit) + body.html.
You do NOT need this to make reports; build.py uses report-template.html as it is."""
import pathlib, re
here = pathlib.Path(__file__).parent
src = (here / "../../../offplan-report/kit/template/report-template.html").read_text().split("\n")
end = src.index("</style>") + 1
css = re.sub(r"Off-plan Report v[0-9.]+", "Ready Property Report v" + (here / "../../VERSION").read_text().strip(), "\n".join(src[:end]))
fs = next(i for i, l in enumerate(src) if l.startswith("/* brand icons"))
foot = "\n".join(src[fs:fs + 7])
foot = (foot.replace('I am interested to invest in "+D.project', 'I am interested in this unit in "+D.project')
        .replace("WhatsApp me about this project", "WhatsApp me about this unit")
        .replace("(DXB Interact, Bayut, DLD, GenieMap, Google Maps) and the developer's sales offer.", "(DXB Interact, Bayut, DLD, Google Maps) and the listing.")
        .replace("Confirm fees and the payment plan with the developer and DLD before buying.", "Confirm the service charge, fees and any mortgage terms with DLD and your bank before buying.")
        .replace("Off-plan Report v1.3 ©", "Ready Property Report v1.0 ©"))
foot = re.sub(r"Off-plan Report v[0-9.]+ ©", "Ready Property Report v1.0 ©", foot)
assert "Ready Property Report v1.0 ©" in foot and "the listing." in foot and "your bank" in foot
body = (here / "body.html").read_text()
assert "/*@@FOOTER@@*/" in body
(here / "report-template.html").write_text(css + "\n" + body.replace("/*@@FOOTER@@*/", foot))
print("template ok")
