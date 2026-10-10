# The Ultimate Real Estate Calculator · © 2026 Abdulla Alzarooni. All rights reserved.
"""Satellite view map: a Google Maps satellite screenshot with 8 coloured view wedges around the building.

  python3 tools/satview.py spec.json

How to get the screenshot: open https://www.google.com/maps/@<lat>,<lon>,18z/data=!3m1!1e3 (the building's
coordinates; in GIS DDA areas use the plot centre from the plots file), wait for the imagery, take a full
screenshot (1456x835 window). The URL centre lands at pixel `center` (default [728,405]: check where the
place pin sits). Keep Google's imagery credit (bottom strip) in the crop.

spec.json:
{ "screenshot": "...jpg", "out": "data/<name>-img/view-sat.jpg",
  "lat": 25.05, "zoom": 18, "center": [728,405], "radius_m": 160,
  "building": ["Weston by Wadan", "G+17"],        # lines in the centre circle (2nd line = height)
  "ref": "Weston",                                 # name used in the legend ("6+ floors lower than <ref>")
  "sides": {"N": ["a", "Sapphire 32", "~33 floors"], ...},   # tone g|a|r, title, subtitle (non-DDA areas)
  "dda": {"plots": "plots.txt", "section": "weston", "plot": "6488712"},  # GIS DDA areas: sides filled from plots
  "extras": [{"box": [x0,y0,x1,y1], "tone": "r", "title": "FIVE JVC", "sub": "~60 floors", "at": [x,y]}],
  "tags": {"W": [x,y]},                            # optional label positions (screenshot px)
  "unit": {"dir": "NE", "label": "Your unit 109"}, # optional arrow to the unit's side
  "legend": false, "labels": false }               # reports: the card shows the legend and the side list
Rule (same as tools/viewmap.py): g = open space / low-rise (≤G+2, mosque) · a = 6+ floors lower · r = same height or taller.
"""
import sys, json, math, re
from PIL import Image, ImageDraw, ImageFont

DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
COL = {"g": (46, 160, 67), "a": (232, 160, 20), "r": (214, 58, 47), "m": (110, 110, 110)}
FONT = "/System/Library/Fonts/Supplemental/Arial{}.ttf"

def font(size, bold=False):
    for f in (FONT.format(" Bold" if bold else ""), "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"):
        try: return ImageFont.truetype(f, size)
        except OSError: pass
    return ImageFont.load_default()

def floors(h):
    m = re.match(r"G\+(\d+)", (h or "").upper().replace(" ", ""))
    return int(m.group(1)) if m else 0

def dda_sides(spec):
    """Colour every 5° slice by the first neighbour plot it reaches; label each side by its main plot (+ any different ones)."""
    path, section, me = spec["dda"]["plots"], spec["dda"]["section"], spec["dda"]["plot"]
    plots, on = [], False
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if line.startswith("#"): on = line[1:].split()[0] == section; continue
        if on and line:
            num, h, use, rings = line.split(";", 3)
            plots.append((num, h, use, [[tuple(map(float, p.split(","))) for p in r.split()] for r in rings.split("|")]))
    mine = next(p for p in plots if p[0] == me); H = floors(mine[1])
    def inside(x, y, ring):
        c = False
        for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
            if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
        return c
    def tone(h, use):
        f = floors(h)
        return "g" if use in ("open", "masjid") or f <= 2 else "a" if f <= H - 6 else "r"
    reach = spec.get("radius_m", 160)
    def walk(deg):
        """Distance to the first low plot crossed and to the first plot that blocks (amber/red), with that plot."""
        b = math.radians(deg); low = block = None
        for step in range(2, int(reach), 2):
            x, y = step * math.sin(b), -step * math.cos(b)
            if any(inside(x, y, r) for r in mine[3]): continue
            hit = next((p for p in plots if p[0] != me and any(inside(x, y, r) for r in p[3])), None)
            if not hit: continue
            if tone(hit[1], hit[2]) == "g":
                if low is None: low = (step, hit)
            else:
                block = (step, hit); break
        return low, block
    def first_hit(deg):
        b = math.radians(deg)
        for step in range(2, int(reach), 2):
            x, y = step * math.sin(b), -step * math.cos(b)
            if any(inside(x, y, r) for r in mine[3]): continue
            hit = next((p for p in plots if p[0] != me and any(inside(x, y, r) for r in p[3])), None)
            if hit: return step, hit
        return None
    named = lambda num: not num.isdigit()          # outside GIS DDA the "plot" field holds the building name
    label = lambda use, h, num="0": num if named(num) else "Open space" if use == "open" else "Mosque G+1" if use == "masjid" else f"{h} plot"
    STEP = 5                                   # one thin slice every 5° ("pizza slices"), coloured by the first plot it reaches
    fine, sides = [], {}
    for i, d in enumerate(DIRS):
        seen = {}
        for k in range(9):
            a = i * 45 - 22.5 + k * STEP
            if k == 9: break
            hit = first_hit(a + STEP / 2)
            low, block = walk(a + STEP / 2)
            if a + STEP <= i * 45 + 22.5 + 1e-9:
                if block and not (low and low[0] < block[0]): fine.append((a, a + STEP, tone(block[1][1], block[1][2]), 0))
                elif block: fine.append((a, a + STEP, tone(block[1][1], block[1][2]), block[0]))   # open over low plots until the blocker
                else: fine.append((a, a + STEP, "g", 0))
            if hit:
                num = hit[1][0]
                if num not in seen: seen[num] = [0, hit[0], hit[1]]
                seen[num][0] += 1; seen[num][1] = min(seen[num][1], hit[0])
        if not seen:
            sides[d] = ["g", "No plot", f"nothing within {int(reach)} m"]; continue
        parts = sorted(seen.values(), key=lambda v: -v[0])
        cnt, step, (num, h, use, _) = parts[0]
        others = [label(p[2][2], p[2][1], p[2][0]) for p in parts[1:] if tone(p[2][1], p[2][2]) != tone(h, use)]
        sub = (f"{h if h != 'N/A' else 'open'} · {step} m" if named(num) else f"plot {num} · {step} m") + (" · + " + ", ".join(dict.fromkeys(others)) if others else "")
        sides[d] = [tone(h, use), label(use, h, num), sub]
    spec["_fine"] = fine
    return sides, mine[1]

def dda_labels(spec, sides):
    """Labels from the same plot-edge analysis as the report's side list (tools/viewmap.py), with building names."""
    import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import viewmap
    dd = spec["dda"]; plots = viewmap.load(dd["plots"], dd["section"])
    H = viewmap.floors(next(p for p in plots if p[0] == dd["plot"])[1])
    names = spec.get("names", {}); out = {}
    for x in viewmap.sides_list(plots, dd["plot"], H, spec.get("setback", 0)):
        nm = names.get(x.get("plot", ""))
        if x["t"] == "g": title, sub = x["text"].replace(" across the road", "").replace(" (protected)", ""), x["dist"] + (" · protected" if "protected" in x["text"] else "")
        elif x["t"] == "mix": title, sub = "Open + " + (nm or x["h"]), x["dist"] + " · part blocked"
        else: title, sub = (nm, f'{x["h"]} · {x["dist"]}') if nm else (x["text"].replace(" across the road", "").replace(" next door", ""), x["dist"] if "apart" in x["dist"] or "from" in x["dist"] else "next door")
        out[x["d"]] = [x["t"] if x["t"] != "mix" else "m", title, sub]
    return out

def main():
    spec = json.load(open(sys.argv[1]))
    sides, height = (dda_sides(spec) if "dda" in spec else (spec["sides"], None))
    if "dda" in spec and spec.get("labels", True) and not spec["dda"].get("named_plots"):
        lab = dda_labels(spec, sides)
    cx0, cy0 = spec.get("center", [728, 405])
    mpp = 156543.03392 * math.cos(math.radians(spec["lat"])) / 2 ** spec.get("zoom", 18)
    r = max(spec.get("radius_m", 160) / mpp, 300)         # drawn radius (px): big enough for 8 labels
    img = Image.open(spec["screenshot"]).convert("RGBA")
    L, T = max(62, int(cx0 - 515)), 60
    R, B = min(img.width, L + 1030), img.height
    img = img.crop((L, T, R, B)); W, Hh = img.size
    cx, cy = cx0 - L, cy0 - T
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    if spec.get("_fine"):                         # GIS DDA: thin slices coloured by what each direction reaches
        def sector(a0, a1, r0, r1, col):
            ang = [math.radians(a0 + (a1 - a0) * k / 6) for k in range(7)]
            pts = [(cx + r1 * math.sin(t), cy - r1 * math.cos(t)) for t in ang] + [(cx + r0 * math.sin(t), cy - r0 * math.cos(t)) for t in reversed(ang)]
            d.polygon(pts, fill=col + (75,))
        for a0, a1, t, split in spec["_fine"]:
            if split:                                  # green out to the blocking plot, then its colour beyond
                rs = min(split / mpp, r); sector(a0, a1, 0, rs, COL["g"]); sector(a0, a1, rs, r, COL[t])
            else: sector(a0, a1, 0, r, COL[t])
        for i in range(8):
            a = math.radians(i * 45 - 22.5)
            d.line([cx, cy, cx + r * math.sin(a), cy - r * math.cos(a)], fill=(255, 255, 255, 200), width=2)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 255, 255, 200), width=2)
    else:
        for i, dname in enumerate(DIRS):
            c = COL[sides[dname][0]]
            d.pieslice([cx - r, cy - r, cx + r, cy + r], i * 45 - 112.5, i * 45 - 67.5, fill=c + (70,), outline=c + (230,), width=3)
    for e in spec.get("extras", []):
        x0, y0, x1, y1 = e["box"]; c = COL[e["tone"]]
        d.rectangle([x0 - L, y0 - T, x1 - L, y1 - T], fill=c + (80,), outline=c + (255,), width=4)
    d.ellipse([cx - 62, cy - 62, cx + 62, cy + 62], fill=(20, 20, 20, 235), outline=(255, 255, 255, 255), width=3)
    img = Image.alpha_composite(img, ov); d = ImageDraw.Draw(img)
    fb, fs, fc, fx = font(17, True), font(14), font(14, True), font(12)
    def tag(x, y, title, sub, c):
        w = max(d.textlength(title, font=fb), d.textlength(sub, font=fs)) + 20; h = 46
        x = min(max(x - w / 2, 6), W - w - 6); y = min(max(y - h / 2, 100), Hh - h - 30)
        d.rounded_rectangle([x, y, x + w, y + h], 8, fill=(255, 255, 255, 240), outline=c + (255,), width=3)
        d.text((x + 10, y + 5), title, font=fb, fill=(20, 20, 20)); d.text((x + 10, y + 26), sub, font=fs, fill=(70, 70, 70))
    lines = spec["building"]
    fn = 14
    while fn > 10 and d.textlength(lines[0], font=font(fn, True)) > 112: fn -= 1
    d.text((cx, cy - 20), lines[0], font=font(fn, True), fill=(255, 255, 255), anchor="mm")
    l2 = lines[1] if len(lines) > 1 else (height or ""); f2 = 17
    while f2 > 11 and d.textlength(l2, font=font(f2, True)) > 112: f2 -= 1
    d.text((cx, cy + 2), l2, font=font(f2, True), fill=(255, 255, 255), anchor="mm")
    if len(lines) > 2:
        f3 = 12
        while f3 > 9 and d.textlength(lines[2], font=font(f3)) > 108: f3 -= 1
        d.text((cx, cy + 22), lines[2], font=font(f3), fill=(220, 220, 220), anchor="mm")
    for i, dname in enumerate(DIRS if spec.get("labels", True) else []):
        t, title, sub = (lab if "dda" in spec and spec.get("labels", True) and not spec["dda"].get("named_plots") else sides)[dname]
        if dname in spec.get("tags", {}): x, y = spec["tags"][dname]; x -= L; y -= T
        else: b = math.radians(i * 45); x, y = cx + 0.86 * r * math.sin(b), cy - 0.86 * r * math.cos(b)
        tag(x, y, f"{dname} · {title}", sub, COL[t])
    for e in spec.get("extras", []):
        x, y = e.get("at", [(e["box"][0] + e["box"][2]) / 2, e["box"][1] - 30]); tag(x - L, y - T, e["title"], e["sub"], COL[e["tone"]])
    d.polygon([(W - 40, 20), (W - 28, 52), (W - 40, 45), (W - 52, 52)], fill=(255, 255, 255), outline=(20, 20, 20))
    d.text((W - 40, 66), "N", font=fb, fill=(255, 255, 255), anchor="mm", stroke_width=2, stroke_fill=(20, 20, 20))
    if spec.get("unit"):                           # "your unit faces here" arrow from the building circle outward
        b = math.radians(DIRS.index(spec["unit"]["dir"]) * 45); sx, sy = math.sin(b), -math.cos(b)
        x0, y0, x1, y1 = cx + 66 * sx, cy + 66 * sy, cx + 130 * sx, cy + 130 * sy
        d.line([x0, y0, x1, y1], fill=(255, 255, 255), width=7); d.line([x0, y0, x1, y1], fill=(20, 20, 20), width=4)
        tip = (cx + 146 * sx, cy + 146 * sy); px, py = -sy, sx
        d.polygon([tip, (x1 + 10 * px, y1 + 10 * py), (x1 - 10 * px, y1 - 10 * py)], fill=(20, 20, 20), outline=(255, 255, 255))
        lab = spec["unit"]["label"]; w = d.textlength(lab, font=fb) + 24
        lx = min(max(tip[0] + 22 * sx - w / 2, 6), W - w - 6); ly = min(max(tip[1] + 22 * sy - 16, 100), Hh - 62)
        d.rounded_rectangle([lx, ly, lx + w, ly + 32], 16, fill=(20, 20, 20, 245), outline=(255, 255, 255), width=2)
        d.text((lx + w / 2, ly + 16), lab, font=fb, fill=(255, 255, 255), anchor="mm")
    items = [("g", "Open space / low-rise (G+2 or lower)"), ("a", f"6+ floors lower than {spec['ref']}"), ("r", "Same height or taller")]
    lw = max(d.textlength(t, font=fs) for _, t in items) + 44
    if spec.get("legend", True): d.rounded_rectangle([10, 10, 10 + lw, 92], 8, fill=(255, 255, 255, 235))
    for k, (c, t) in enumerate(items if spec.get("legend", True) else []):
        yy = 20 + k * 23; d.rounded_rectangle([20, yy, 36, yy + 16], 3, fill=COL[c] + (255,)); d.text((44, yy + 1), t, font=fs, fill=(20, 20, 20))
    img.convert("RGB").save(spec["out"], quality=86)
    print("saved", spec["out"], {k: v[0] for k, v in sides.items()})
    print(f'satc for the data file: [{cx:.0f},{cy:.0f},{W},{Hh},{r:.0f}]   (building centre x,y · image w,h · circle radius, px)')

main()
