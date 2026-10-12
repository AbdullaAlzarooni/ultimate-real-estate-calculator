# The Ultimate Real Estate Calculator · © 2026 Abdulla Alzarooni. All rights reserved.
"""View map from GIS DDA plots: the building's plot + neighbours coloured by how much they block the view,
plus a side-by-side list (N, NE … NW) and a one-line summary for the report's view-map card.

  python3 tools/viewmap.py <plots.txt> <section> <plot> [--half 120] [--name Weston] [--setback 7.5]
                           [--unit NE "Your unit 109"] > snippet.js

plots.txt holds sections exported from GIS DDA (see tools/dda-plots.js):
  #<section> <lat>,<lon>
  <plot>;<max height>;<use code: open|masjid|apt|mixed|...>;<x,y x,y ...>   (metres from the plot centre, y = south)
Prints `UNITS.studio.viewMap={...};` to paste into the data file (before END DATA).
Colours: green = open space / low (G, G+1, G+2) · amber = at least 6 floors lower than this building · red = similar or taller.
Side list: 9 rays per side (5° apart) from the plot centre; distances are measured from the edge of this plot.
"""
import sys, re, json, html, math, argparse

DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

def floors(h):
    if not h or h.upper() in ("N/A", "G"): return 0
    m = re.match(r"G\+(\d+)", h.upper().replace(" ", ""))
    return int(m.group(1)) if m else 0

def load(path, section):
    plots, on = [], False
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line: continue
        if line.startswith("#"):
            on = line[1:].split()[0] == section; continue
        if on:
            num, h, use, rings = line.split(";", 3)
            plots.append((num, h, use, [[tuple(map(float, p.split(","))) for p in r.split()] for r in rings.split("|")]))
    return plots

def inside(x, y, ring):
    c = False
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
    return c

def sides_list(plots, me, H, setback):
    """Per side: tone (g / a / r / mix), what is there, and how far from the edge of this plot."""
    mine = next(p for p in plots if p[0] == me)
    tone = lambda h, use: "g" if use in ("open", "masjid") or floors(h) <= 2 else "a" if floors(h) <= H - 6 else "r"
    lowname = lambda use, h: "Open space" if use == "open" else "Mosque G+1" if use == "masjid" else f"{h} (low-rise)"
    out = []
    for i, d in enumerate(DIRS):
        rays = []
        for k in range(9):
            a = math.radians(i * 45 - 20 + k * 5); edge = 0; low = block = None
            for s in range(1, 220):
                x, y = s * math.sin(a), -s * math.cos(a)
                if any(inside(x, y, r) for r in mine[3]): edge = s; continue
                hit = next((p for p in plots if p[0] != me and any(inside(x, y, r) for r in p[3])), None)
                if not hit: continue
                if tone(hit[1], hit[2]) == "g":
                    if low is None: low = (s - edge, hit)
                else:
                    block = (s - edge, hit); break
            rays.append((low, block))
        openr = [r for r in rays if r[0] and (not r[1] or r[0][0] < r[1][0])] + [r for r in rays if not r[0] and not r[1]]
        blocked = [r for r in rays if r not in openr]
        lows = [r[0] for r in openr if r[0]]
        blocks = sorted([r[1] for r in rays if r[1]], key=lambda b: b[0])
        ahead = rays[4][1] or (blocks[0] if blocks else None)       # the plot straight ahead names the side
        def where(b):
            gap, (num, h, use, _) = b
            return (f"{h} tower next door", f"~{2 * setback:g} m apart" if setback else "adjacent") if gap <= 3 else (f"{h} plot across the road", f"from {gap} m")
        if openr and not blocked:
            if lows:
                gap, (num, h, use, _) = min(lows, key=lambda l: l[0])
                text = lowname(use, h) + (" across the road" if gap > 3 else " next door") + (" (protected)" if use == "open" else "")
                dist = f"from {gap} m"
            else:
                text, dist = "Nothing built within 200 m", ""
            out.append({"d": d, "t": "g", "text": text, "dist": dist, "plot": min(lows, key=lambda l: l[0])[1][0] if lows else ""})
        elif openr:
            gap, (num, h, use, _) = min(lows, key=lambda l: l[0]) if lows else (0, ("", "", "open", None))
            btxt, bdist = where(blocks[0])
            text = f"{lowname(use, h)}{' across the road' if gap > 3 else ''}, part {blocks[0][1][1]} {'next door' if blocks[0][0] <= 3 else 'plot'}"
            out.append({"d": d, "t": "mix", "text": text, "dist": f"from {gap} m" if lows else bdist, "plot": ahead[1][0], "h": ahead[1][1]})
        else:
            b = blocks[0]; btxt, bdist = where(b)
            out.append({"d": d, "t": tone(b[1][1], b[1][2]), "text": btxt, "dist": bdist, "plot": ahead[1][0], "h": ahead[1][1]})
    return out

def summary(sides, name):
    good = [x for x in sides if x["t"] == "g"]; mix = [x for x in sides if x["t"] == "mix"]
    bad = [x for x in sides if x["t"] in ("a", "r")]
    lc = lambda t: t if t[:2] == "G+" else t[0].lower() + t[1:]
    join = lambda xs: ", ".join(x["d"] for x in xs[:-1]) + (" and " if len(xs) > 1 else "") + xs[-1]["d"]
    parts = []
    if good:
        parts.append(f"<b>Best view: {join(good)}, over {lc(good[0]['text'])}.</b>")
        if mix: parts.append(f"{join(mix)} {'is' if len(mix) == 1 else 'are'} partly open.")
    elif mix:
        parts.append(f"<b>Partly open: {join(mix)} ({lc(mix[0]['text'].split(',')[0])}).</b>")
    else:
        parts.append("<b>No side has an open view.</b>")
    near = [x for x in bad if "next door" in x["text"]]; far = [x for x in bad if "across" in x["text"]]
    if near:
        h = near[0]["text"].split()[0]
        parts.append(f"{join(near)} face {h} towers next door" + (f", about {near[0]['dist'][1:].replace(' apart', '')} apart." if near[0]["dist"].startswith("~") else "."))
    if far:
        h = far[0]["text"].split()[0]; ds = sorted(int(x["dist"].split()[1]) for x in far)
        parts.append(f"{join(far)} face {h} plots across the road ({ds[0]}–{ds[-1]} m)." if ds[0] != ds[-1] else f"{join(far)} face {h} plots across the road ({ds[0]} m).")
    return " ".join(parts)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("plots"); ap.add_argument("section"); ap.add_argument("plot")
    ap.add_argument("half", nargs="?", type=float, default=120)
    ap.add_argument("--half", dest="half2", type=float)
    ap.add_argument("--name", default="This building")
    ap.add_argument("--setback", type=float, default=0, help="building setback in m (GIS DDA plot info); 0 = unknown")
    ap.add_argument("--unit", nargs=2, metavar=("DIR", "LABEL"))
    a = ap.parse_args()
    half = a.half2 or a.half
    plots = load(a.plots, a.section)
    me = a.plot
    mine = next(p for p in plots if p[0] == me)
    H = floors(mine[1])
    s = 640 / (2 * half)                           # px per metre
    X = lambda x: (x + half) * s + 20
    Y = lambda y: (y + half) * s + 20
    def tone(h, use):
        f = floors(h)
        if use in ("open", "masjid") or f <= 2: return "good"
        if f <= H - 6: return "warn"
        return "bad"
    out = [f'<svg viewBox="0 0 680 680" role="img" aria-label="View map: plot {me} and the plots around it, coloured by how much they block the view" style="width:100%;height:auto;font-family:var(--f-body)">',
           '<defs><clipPath id="vm-clip"><rect x="20" y="20" width="640" height="640" rx="10"/></clipPath></defs>',
           '<rect x="20" y="20" width="640" height="640" rx="10" fill="var(--surface-2)" stroke="var(--line)"/>',
           '<g clip-path="url(#vm-clip)">']
    labels, seen = [], set()
    for num, h, use, rings in plots:
        d = " ".join("M" + " L".join(f"{X(x):.1f} {Y(y):.1f}" for x, y in r) + " Z" for r in rings)
        if num == me:
            out.append(f'<path d="{d}" fill="var(--ink)" fill-opacity=".85" stroke="var(--ink)" stroke-width="1.5"/>')
        else:
            t = tone(h, use)
            out.append(f'<path d="{d}" fill="var(--{t}-soft)" stroke="var(--{t})" stroke-width="1.2"/>')
        pts = [p for r in rings for p in r]
        cx = sum(p[0] for p in pts) / len(pts); cy = sum(p[1] for p in pts) / len(pts)
        if num != me and (abs(cx) > half - 12 or abs(cy) > half - 12):     # big plots (parks) reaching outside: label at the visible part
            inside_pts = [p for p in pts if abs(p[0]) < half - 15 and abs(p[1]) < half - 15]
            if not inside_pts: continue
            cx = sum(p[0] for p in inside_pts) / len(inside_pts); cy = sum(p[1] for p in inside_pts) / len(inside_pts)
        key = (round(X(cx)), round(Y(cy)))
        if key in seen: continue
        seen.add(key)
        name = "Open space" if use == "open" else "Mosque G+1" if use == "masjid" else h
        labels.append((num == me, X(cx), Y(cy), name))
    out.append("</g>")
    for is_me, x, y, name in labels:
        if is_me:
            out.append(f'<text x="{x:.0f}" y="{y:.0f}" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="600" fill="var(--surface)">{html.escape(a.name)}</text>')
        else:
            out.append(f'<text x="{x:.0f}" y="{y:.0f}" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600" fill="var(--ink)">{html.escape(name)}</text>')
    if a.unit:                                       # "your unit faces here" arrow from the building toward that side
        b = math.radians(DIRS.index(a.unit[0]) * 45); c = X(0), Y(0)
        x0, y0 = c[0] + 45 * math.sin(b), c[1] - 45 * math.cos(b); x1, y1 = c[0] + 115 * math.sin(b), c[1] - 115 * math.cos(b)
        px, py = -math.cos(b), -math.sin(b)
        tip = (c[0] + 128 * math.sin(b), c[1] - 128 * math.cos(b))
        w = 14 + 8.2 * len(a.unit[1]); lx = min(max(tip[0] + 48 * math.sin(b) - w / 2, 28), 652 - w); ly = min(max(tip[1] - 48 * math.cos(b) - 15, 28), 620)
        out.append(f'<g><line x1="{x0:.0f}" y1="{y0:.0f}" x2="{x1:.0f}" y2="{y1:.0f}" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>'
                   f'<path d="M{tip[0]:.0f} {tip[1]:.0f} L{x1 + 9 * px:.0f} {y1 + 9 * py:.0f} L{x1 - 9 * px:.0f} {y1 - 9 * py:.0f} Z" fill="var(--ink)"/>'
                   f'<rect x="{lx:.0f}" y="{ly:.0f}" width="{w:.0f}" height="30" rx="15" fill="var(--ink)"/>'
                   f'<text x="{lx + w / 2:.0f}" y="{ly + 20:.0f}" text-anchor="middle" font-size="14" font-weight="600" fill="var(--surface)">{html.escape(a.unit[1])}</text></g>')
    out.append('<g fill="var(--ink)"><path d="M630 40 L638 60 L630 55 L622 60 Z"/><text x="630" y="76" text-anchor="middle" font-size="13" font-weight="600">N</text></g>')
    bar = 50 * s
    out.append(f'<g stroke="var(--ink)" stroke-width="2"><line x1="40" y1="640" x2="{40+bar:.0f}" y2="640"/><line x1="40" y1="634" x2="40" y2="646"/><line x1="{40+bar:.0f}" y1="634" x2="{40+bar:.0f}" y2="646"/></g><text x="{40+bar/2:.0f}" y="628" text-anchor="middle" font-size="13" fill="var(--ink)">Scale: 50 m</text>')
    out.append("</svg>")
    sides = sides_list(plots, me, H, a.setback)
    vm = {"plot": me, "height": mine[1], "name": a.name, "summary": summary(sides, a.name), "sides": sides, "svg": "".join(out)}
    if a.unit: vm["unit"] = {"dir": a.unit[0], "label": a.unit[1]}
    print("UNITS.studio.viewMap=" + json.dumps(vm, ensure_ascii=False) + ";")

if __name__ == "__main__":
    main()
