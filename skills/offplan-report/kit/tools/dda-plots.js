// The Ultimate Real Estate Calculator · © 2026 Abdulla Alzarooni. All rights reserved.
// GIS DDA neighbour check: which plot is the building on, and what can be built around it.
// Run in the browser on https://gis.dda.gov.ae/DIS/ (after the map has loaded), e.g. with the
// Chrome javascript tool. Set LAT/LON to the building's Google Maps pin (from the place URL "@lat,lon").
// Returns this plot + every plot within RADIUS metres: side (N/NE/…, measured to the nearest edge),
// distance, Maximum Height (G+N) and land use. OPEN SPACE = protected view; G+N = can be built that high.
// Run the file as-is (keep the line breaks: it has // comments); set the numbers in the last line.
// No plot at the pin -> the area is not in GIS DDA (or the pin is on a road: move it onto the building).
(async (LAT, LON, RADIUS = 60) => {
  const view = document.querySelector("arcgis-map").view;
  const plots = view.map.allLayers.find(l => l.id === "Main Map").findSublayerById(13);
  const keep = plots.definitionExpression;          // the site hides the selected plot; lift that while we query
  plots.definitionExpression = null;
  const wait = p => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error("timeout")), 20000))]);
  const ask = async (geometry, distance) => {
    const q = plots.createQuery();
    Object.assign(q, { geometry, outFields: ["PLOT_NUMBER"], returnGeometry: true, outSpatialReference: { wkid: 4326 } });
    if (distance) Object.assign(q, { distance, units: "meters" });
    return (await wait(plots.queryFeatures(q))).features;
  };
  try {
    const pin = { type: "point", longitude: LON, latitude: LAT, spatialReference: { wkid: 4326 } };
    const me = (await ask(pin))[0] || (await ask(pin, 30))[0];
    if (!me) return { error: "No DDA plot at this pin: area not covered by GIS DDA, or move the pin onto the building" };
    const kx = 111320 * Math.cos(LAT * Math.PI / 180), ky = 110540;
    const xy = p => [(p[0] - LON) * kx, (p[1] - LAT) * ky];
    const mine = me.geometry.rings.flat().map(xy);
    const cx = mine.reduce((a, p) => a + p[0], 0) / mine.length, cy = mine.reduce((a, p) => a + p[1], 0) / mine.length;
    const nearest = rings => {                       // closest point of a neighbour's outline to this plot's centre
      let best = [1e9, 0, 0];
      for (const r of rings) {
        const R = r.map(xy);
        for (let i = 0; i < R.length - 1; i++) {
          const [a, b] = [R[i], R[i + 1]], dx = b[0] - a[0], dy = b[1] - a[1];
          const t = Math.max(0, Math.min(1, ((cx - a[0]) * dx + (cy - a[1]) * dy) / (dx * dx + dy * dy || 1)));
          const p = [a[0] + t * dx, a[1] + t * dy], d = Math.hypot(p[0] - cx, p[1] - cy);
          if (d < best[0]) best = [d, p[0], p[1]];
        }
      }
      return best;
    };
    const DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const out = [];
    for (const f of await ask(me.geometry, RADIUS)) {
      const plot = f.attributes.PLOT_NUMBER, self = plot === me.attributes.PLOT_NUMBER;
      const [d, x, y] = self ? [0, 0, 0] : nearest(f.geometry.rings);
      const html = await (await fetch("/DIS?handler=PlotInfo&plotNumber=" + plot)).text();
      const t = new DOMParser().parseFromString(html, "text/html").body.innerText.replace(/\s+/g, " ");
      const g = (a, z) => (t.match(new RegExp(a + " (.*?) " + z)) || [])[1];
      out.push({
        plot, side: self ? "THIS PLOT" : DIRS[Math.round(((Math.atan2(x - cx, y - cy) * 180 / Math.PI + 360) % 360) / 45) % 8],
        metres: Math.round(d), height: g("Maximum Height", "Maximum Coverage"),
        use: g("Land use", "(Setbacks|General Notes)"), project: g("Project Name", "Community Name"),
      });
    }
    return out.sort((a, b) => a.metres - b.metres);
  } finally {
    plots.definitionExpression = keep;
  }
})(/*LAT*/ 0, /*LON*/ 0);
