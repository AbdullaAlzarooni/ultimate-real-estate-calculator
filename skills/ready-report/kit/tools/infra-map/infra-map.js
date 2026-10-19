/* Interactive infrastructure map: satellite base + SVG layers, legend toggles, zoom & drag.
   initInfraMap(rootEl, data, baseSrc)  — data = infra-layers.json */
function initInfraMap(root, D, baseSrc) {
  const NS = "http://www.w3.org/2000/svg";
  let LANG = "en";
  const T = k => LANG === "ar" ? (((D.i18n || {}).ui || {})[k] || k) : k;
  const AN = n => LANG === "ar" ? (((D.i18n || {}).areas || {})[n] || n) : n;
  root.classList.add("imap"); if (D.embed) root.classList.add("embed");   // inside a report: panels take the report's own colours
  root.innerHTML =
    '<div class="imap-top"><div class="imap-langs" dir="ltr" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="true">English</button><button type="button" data-lang="ar" lang="ar" aria-pressed="false">العربية</button></div></div><div class="imap-view"><div class="imap-stage"><img alt="Satellite map of Dubai" draggable="false"><svg></svg></div>' +
    '<div class="imap-search"><input type="text" autocomplete="off" autocorrect="off" spellcheck="false" name="imap-q-x" placeholder="Search an area, station or place…" aria-label="Search the map"><button type="button" class="imap-sx" aria-label="Clear search" hidden>×</button><ul hidden></ul></div>' +
    '<div class="imap-zoom"><button type="button" data-z="1" aria-label="Zoom in">+</button><button type="button" data-z="-1" aria-label="Zoom out">−</button><button type="button" data-z="0" aria-label="Reset view">⟲</button></div></div>' +
    '<div class="imap-bar"><span class="imap-hint" hidden>Tap an item below to show or hide it · point at a station or area to see its name · click a place or area for details · zoom in to see more area names</span><span class="imap-basesw" role="group" aria-label="Background"><button type="button" data-b="sat" data-t="Satellite">Satellite</button><button type="button" data-b="map" data-t="Street map">Street map</button></span><label class="imap-bg"><span data-t="Photo:">Photo:</span> <small data-t="Original">Original</small><input type="range" min="0" max="100" value="100" aria-label="Background style from original satellite to soft"><small data-t="Soft">Soft</small></label><span><button type="button" class="imap-proj" aria-pressed="true" data-t="Show project">Show project</button><button type="button" class="imap-all" data-all="1" data-t="Show all">Show all</button><button type="button" class="imap-all" data-all="0" data-t="Hide all">Hide all</button></span></div>' +
    '<p class="imap-tips" data-t="tips">Tap a line to hide or show it · point at a station or area for its name · click a place or area for details · zoom in for schools, hospitals and more area names</p>' +
    '<p class="imap-legtip" data-t="legtip" data-html="1">Tap any item below to show or hide it on the map. Use <b>Show all</b> / <b>Hide all</b> to switch everything at once.</p>' +
    '<div class="imap-legend"></div>' +
    '<section class="imap-near" hidden><h3><b data-t="Nearest to" style="font-weight:inherit">Nearest to</b> <span></span></h3><div class="imap-near-g"></div><p class="imap-note" data-t="note" data-html="1">km = straight-line distance. Typical weekday drive by car in minutes, from Google Maps: <b>Morning</b> = 8 am, to the destination · <b>Midday</b> = 11 am · <b>Evening</b> = worst of 3:30 pm and 6 pm, back to the project · <b>Late night</b> = 3 am. Red and orange = rush hours, yellow = normal traffic, green = empty roads. Highways: time to reach the nearest point of the road.</p></section>' +
    '<section class="imap-news"><div class="imap-news-h"><h3 data-t="Area news">Area news</h3><span class="upd"></span></div>' +
    '<div class="imap-news-f" role="group"><button type="button" data-f="near" aria-pressed="true"></button><button type="button" data-f="city" aria-pressed="false" data-t="Big projects">Big projects</button><button type="button" data-f="all" aria-pressed="false" data-t="All news">All news</button></div><p class="imap-news-hint"></p>' +
    '<ul class="imap-news-l"></ul><div class="imap-news-pg"><button type="button" class="imap-pg-new" aria-label="Newer news"></button><span class="imap-pg-at"></span><button type="button" class="imap-pg-old" aria-label="Older news"></button></div><p class="imap-news-note" data-t="newsnote">Facts only, from official and major news sources. Each item links to its source. Tap an area name to see it on the map.</p></section>' +
    '<p class="imap-credit"></p>';
  const view = root.querySelector(".imap-view"), stage = root.querySelector(".imap-stage"), svg = root.querySelector("svg");
  if (baseSrc) root.querySelector("img").src = baseSrc;   // no satellite photo in the public build
  const PH = () => view.clientWidth < 640;
  const sizeStage = () => { if (PH()) { view.style.aspectRatio = ""; view.style.height = Math.round(Math.min(window.innerHeight * 0.68, view.clientWidth * 1.35)) + "px"; } else { view.style.height = ""; view.style.aspectRatio = D.w + " / " + D.h; }
    stage.style.right = "auto"; stage.style.bottom = "auto"; stage.style.width = view.clientWidth + "px"; stage.style.height = (view.clientWidth * D.h / D.w) + "px"; };
  sizeStage();
  svg.setAttribute("viewBox", "0 0 " + D.w + " " + D.h);
  root.querySelector(".imap-credit").textContent = D.credit;
  // close-up satellite around the project, fades in when zoomed in
  const DETS = [], BASEIMG = root.querySelector(".imap-stage img");
  (Array.isArray(D.detail) ? D.detail : D.detail ? [D.detail] : []).forEach(t => { const im = document.createElementNS(NS, "image"); im.dataset.src = t.src; im.setAttribute("x", t.x); im.setAttribute("y", t.y); im.setAttribute("width", t.w); im.setAttribute("height", t.h); im.setAttribute("preserveAspectRatio", "none"); im.style.opacity = 0; im.style.transition = "opacity .25s"; svg.appendChild(im); im.style.display = "none"; DETS.push([im, t.z0 || 1.8, t.z1 || 3, +t.x, +t.y, +t.w, +t.h]); });
  // white wash over the satellite (strength set by the Original <-> Soft slider)
  const WASH = document.createElementNS(NS, "rect"); WASH.setAttribute("x", 0); WASH.setAttribute("y", 0); WASH.setAttribute("width", D.w); WASH.setAttribute("height", D.h); WASH.setAttribute("fill", "#fff"); WASH.setAttribute("pointer-events", "none"); svg.appendChild(WASH);
  // "Street map" background (OpenStreetMap), shown instead of the satellite photo
  const STREET = document.createElementNS(NS, "g"); STREET.setAttribute("class", "sbwrap"); STREET.innerHTML = D.street || ""; svg.appendChild(STREET);
  let MAPMODE = false;
  function setBase(m) {
    MAPMODE = m === "map" && !!D.street;
    STREET.style.display = MAPMODE ? "" : "none"; BASEIMG.style.visibility = MAPMODE ? "hidden" : "";
    DETS.forEach(([im]) => { if (MAPMODE) im.style.display = "none"; });
    WASH.style.display = MAPMODE ? "none" : ""; root.classList.toggle("streetmode", MAPMODE);
    // areas: stronger pastel fill on the light street map, the original see-through fill on satellite
    root.querySelectorAll(".imap-stage path.ar").forEach(p => { if (!p.dataset.f) p.dataset.f = p.style.fill; p.style.fill = MAPMODE ? p.dataset.f.replace(/[\d.]+\)$/, "0.36)") : p.dataset.f; });
    root.querySelectorAll(".imap-basesw button").forEach(b => b.setAttribute("aria-pressed", b.dataset.b === (MAPMODE ? "map" : "sat")));
    try { localStorage.setItem("imap-base", MAPMODE ? "map" : "sat"); } catch (e) {}
    if (typeof labels === "function") try { labels(); } catch (e) {}
  }
  function setBg(v) { const f = "saturate(" + (1 - 0.7 * v).toFixed(2) + ")"; BASEIMG.style.filter = f; DETS.forEach(([im]) => im.style.filter = f); WASH.setAttribute("opacity", (0.38 * v).toFixed(3)); root.classList.toggle("bgorig", v < 0.35); }
  const G = {};
  D.layers.forEach(l => { const g = document.createElementNS(NS, "g"); g.setAttribute("data-k", l.key); g.innerHTML = l.svg; svg.appendChild(g); G[l.key] = g; });
  // road shields above every line
  const top = document.createElementNS(NS, "g"); svg.appendChild(top);
  D.layers.forEach(l => G[l.key].querySelectorAll(".sh").forEach(sh => { sh.dataset.k = l.key; top.appendChild(sh); }));
  const co = document.createElementNS(NS, "g"); co.innerHTML = D.callout; svg.appendChild(co);
  const CO = co.querySelector("#callout"), PIN = co.querySelector("#pin"), cpx = CO ? +CO.dataset.x : 0, cpy = CO ? +CO.dataset.y : 0;
  // legend
  const leg = root.querySelector(".imap-legend"), btn = {};
  [...new Set(D.layers.map(l => l.group))].forEach(grp => {
    const det = document.createElement("details"); det.className = "imap-grp"; det.open = true; det.innerHTML = '<summary><span data-t="' + grp + '">' + grp + '</span> <span class="cnt"></span></summary><div class="chips"></div>'; leg.appendChild(det);
    det.querySelector(".cnt").textContent = D.layers.filter(l => l.group === grp).length; const box = det.querySelector(".chips");
    D.layers.filter(l => l.group === grp).forEach(l => {
      const b = document.createElement("button"); b.type = "button"; b.className = "imap-chip"; b.dataset.k = l.key; b.setAttribute("aria-pressed", "true");
      const da = l.dots ? ' stroke-dasharray="2 5"' : l.dash ? ' stroke-dasharray="9 5"' : "";
      if (l.area) { b.innerHTML = '<svg viewBox="0 0 34 24" aria-hidden="true"><rect class="lga" x="5" y="3" width="24" height="18" rx="3" fill="rgba(31,79,209,.12)" stroke="#5b6470" stroke-width="1.5" stroke-dasharray="3 2"/></svg><span data-tl="' + l.label + '">' + l.label + "</span>"; b.onclick = () => set(l.key, b.getAttribute("aria-pressed") !== "true"); box.appendChild(b); btn[l.key] = b; return; }
      b.innerHTML = (l.icon
        ? '<svg viewBox="0 0 34 24" aria-hidden="true"><rect x="5" y="0" width="24" height="24" rx="' + (l.iconbg ? 12 : 6) + '" fill="' + (l.iconbg || (l.key === "pl-future" ? "#e8590c" : "#1b1f24")) + '"/><g transform="translate(7.4 2.4) scale(.8)" fill="#fff">' + l.icon + "</g></svg>"
        : '<svg viewBox="0 0 34 12" aria-hidden="true">' + (grp === "Roads" ? '<line class="lgc" x1="2" y1="6" x2="32" y2="6" stroke="none" stroke-width="' + (l.thin ? 6 : 9) + '" stroke-linecap="round"/>' : "") + '<line class="lgl" x1="2" y1="6" x2="32" y2="6" stroke="' + l.color + '" stroke-width="' + (l.thin ? 3 : 5) + '" stroke-linecap="round"' + da + "/></svg>") + '<span data-tl="' + l.label.replace(/"/g, "&quot;") + '">' + l.label + "</span>";
      b.onclick = () => set(l.key, b.getAttribute("aria-pressed") !== "true");
      box.appendChild(b); btn[l.key] = b;
    });
  });
  function set(k, on) {
    btn[k].setAttribute("aria-pressed", on); G[k].style.display = on ? "" : "none";
    top.querySelectorAll('[data-k="' + k + '"]').forEach(e => e.style.display = on ? "" : "none");
    try { if (RN.length) labels(); } catch (e) {}   // road names follow their road layer (RN is not ready during start-up)
  }
  const rng = root.querySelector(".imap-bg input"); let bgv = 1;
  try { const sv = localStorage.getItem("imap-bg"); if (sv !== null) { bgv = +sv; rng.value = bgv * 100; } } catch (e) {}
  setBg(bgv); rng.oninput = () => { bgv = rng.value / 100; setBg(bgv); try { localStorage.setItem("imap-bg", bgv); } catch (e) {} };
  { const sw = root.querySelector(".imap-basesw"), noSat = D.noSat || !baseSrc;
    if (!D.street || noSat) sw.hidden = true;
    sw.querySelectorAll("button").forEach(b => b.onclick = () => setBase(b.dataset.b));
    let start = noSat ? "map" : "sat"; try { if (!noSat && localStorage.getItem("imap-base") === "map") start = "map"; } catch (e) {}
    setBase(start); }
  // nearest panel
  if ((D.near || []).length) {
    const sec = root.querySelector(".imap-near"); sec.hidden = false; sec.querySelector("h3 span").textContent = D.project || "the project";
    const ICO = {metro: "🚇", blue: "🚇", gold: "🚇", etihad: "🚆", hsr: "🚄", road: "🛣️", mall: "🛍️", beach: "🏖️", nature: "🌳", school: "🎓", hosp: "🏥", uni: "🏛️", far: "📍"};
    const g = sec.querySelector(".imap-near-g");
    D.near.forEach(n => { const d = document.createElement("div"); d.className = "nr"; d.innerHTML = '<i></i><div><small></small><b></b>' + (n.drive ? '<span class="dv"><span class="pk" title="Morning peak (8 am)"><i data-t="Morning">Morning</i><u dir="ltr"></u></span><span class="nm" title="Midday (11 am)"><i data-t="Midday">Midday</i><u dir="ltr"></u></span><span class="pm" title="Evening peak (worst of 3:30 pm and 6 pm)"><i data-t="Evening">Evening</i><u dir="ltr"></u></span><span class="qt" title="Late night (3 am)"><i data-t="Late night">Late night</i><u dir="ltr"></u></span><small class="mn" data-t="min">min</small></span>' : "") + '</div><em></em>';
      if (n.drive) { d.querySelector(".pk u").textContent = n.drive.peak; if (n.drive.pm) d.querySelector(".pm u").textContent = n.drive.pm; else d.querySelector(".pm").remove(); d.querySelector(".nm u").textContent = n.drive.normal; d.querySelector(".qt u").textContent = n.drive.quiet; } d.querySelector("i").textContent = ICO[n.k] || "•"; d.querySelector("small").textContent = n.t; d.querySelector("small").dataset.tn = n.t; d.querySelector("b").textContent = n.n; d.querySelector("b").dataset.tn = n.n; d.querySelector("b").dataset.ta = n.n; d.querySelector("em").textContent = n.km + " km"; d.querySelector("em").dir = "ltr"; g.appendChild(d); });
  }
  const pb = root.querySelector(".imap-proj"); pb.onclick = () => { const on = pb.getAttribute("aria-pressed") !== "true"; pb.setAttribute("aria-pressed", on); co.style.display = on ? "" : "none"; };
  root.querySelectorAll(".imap-all").forEach(b => b.onclick = () => D.layers.forEach(l => set(l.key, b.dataset.all === "1")));
  // zoom & drag (mouse, touch, pinch)
  let z = 1, tx = 0, ty = 0;
  const zmin = () => Math.max(1, view.clientHeight / (view.clientWidth * D.h / D.w));
  const clamp = () => { const w = view.clientWidth, h = view.clientHeight, sh = w * D.h / D.w; z = Math.max(z, zmin()); tx = Math.min(0, Math.max(w - w * z, tx)); ty = Math.min(0, Math.max(h - sh * z, ty)); };
  let onMove = null;
  // while zooming/dragging only the ready-drawn map is moved (cheap, GPU); line widths, icon sizes, labels and
  // tiles are redrawn once, 140 ms after the movement stops. apply(true) redraws straight away.
  let settleT = 0;
  const settle = () => { settleT = 0; stage.style.willChange = ""; labels(); if (onMove) onMove(); };
  const apply = now => { clamp(); stage.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + z + ")"; view.classList.toggle("zoomed", z > 1);
    clearTimeout(settleT);
    if (now === true) { settle(); return; }
    stage.style.willChange = "transform"; settleT = setTimeout(settle, 140); if (onMove) onMove(); };
  const zoomAt = (nz, cx, cy) => { nz = Math.min(24, Math.max(zmin(), nz)); tx = cx - (cx - tx) * nz / z; ty = cy - (cy - ty) * nz / z; z = nz; apply(); };
  root.querySelectorAll(".imap-zoom button").forEach(b => b.onclick = () => {
    const d = +b.dataset.z; if (!d) { z = zmin(); tx = ty = 0; if (PH() && CO) { const sc = view.clientWidth / D.w; tx = view.clientWidth / 2 - cpx * sc * z; ty = view.clientHeight / 2 - cpy * sc * z; } apply(true); return; }
    zoomAt(z * (d > 0 ? 1.6 : 1 / 1.6), view.clientWidth / 2, view.clientHeight / 2);
  });
  view.addEventListener("wheel", e => { if (!e.ctrlKey && !e.metaKey && z === 1) return; e.preventDefault(); const r = view.getBoundingClientRect(); zoomAt(z * (e.deltaY < 0 ? 1.25 : 0.8), e.clientX - r.left, e.clientY - r.top); }, { passive: false });
  const pts = new Map(); let last = null, pinch = null, DOWN = null, DRAGGED = false;
  view.addEventListener("pointerdown", e => { if (e.target.closest(".imap-zoom,.imap-search,.imap-card")) return; pts.set(e.pointerId, e); if (pts.size === 1) { DOWN = { x: e.clientX, y: e.clientY }; DRAGGED = false; } if (z > 1 || pts.size > 1) view.setPointerCapture(e.pointerId); last = { x: e.clientX, y: e.clientY }; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), z }; } });
  view.addEventListener("pointermove", e => {
    if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, e); if (DOWN && (pts.size > 1 || Math.hypot(e.clientX - DOWN.x, e.clientY - DOWN.y) > 6)) DRAGGED = true;
    if (pts.size === 2 && pinch) { const [a, b] = [...pts.values()], r = view.getBoundingClientRect(); zoomAt(pinch.z * Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) / pinch.d, (a.clientX + b.clientX) / 2 - r.left, (a.clientY + b.clientY) / 2 - r.top); return; }
    if (z > 1 && last) { tx += e.clientX - last.x; ty += e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; apply(); }
  });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; last = pts.size ? { x: [...pts.values()][0].clientX, y: [...pts.values()][0].clientY } : null; };
  view.addEventListener("pointerup", up); view.addEventListener("pointercancel", up);
  window.addEventListener("resize", () => { sizeStage(); apply(true); });
  // ---- search: areas, stations, places, schools, hospitals
  const IDX = [];
  const ARN = ((D.i18n || {}).areas) || {}, LYR = ((D.i18n || {}).layers) || {};
  const norm = s => (s || "").toLowerCase().replace(/[أإآا]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/[ًٌٍَُِّْـ]/g, "").replace(/^al[ -]/, "").replace(/['’`]/g, "").replace(/\s+/g, " ").trim();
  svg.querySelectorAll("path[data-a]").forEach(p => { const n = p.dataset.a.replace(/&amp;/g, "&"); IDX.push({ n, ar: ARN[n] || "", t: "Area", el: p }); });
  svg.querySelectorAll("[data-n]").forEach(c => { const g = c.closest("g[data-k]"); if (!g) return; const L0 = D.layers.find(l => l.key === g.dataset.k) || {}; if ((c.dataset.n || "").startsWith("Station name not")) return; IDX.push({ n: c.dataset.n.replace(/&amp;/g, "&"), ar: "", t: L0.short || L0.label || "", tl: L0.label || "", el: c, k: g.dataset.k }); });
  const sIn = root.querySelector(".imap-search input"), sUl = root.querySelector(".imap-search ul");
  let SEL = null;
  const selArea = el => { if (SEL) SEL.classList.remove("sel"); SEL = el; view.classList.toggle("hassel", !!el); if (el) { el.classList.add("sel"); el.parentNode.appendChild(el); } };
  const goTo = it => {
    if (it.t === "Area") { set("areas", true); selArea(it.el); } else selArea(null);
    const b = it.el.getBBox(), sc = view.clientWidth / D.w;
    // markers such as places sit inside a translated <g>: map the box centre into map coordinates
    const M = svg.getScreenCTM().inverse().multiply(it.el.getScreenCTM()), pc = new DOMPoint(b.x + b.width / 2, b.y + b.height / 2).matrixTransform(M), cx = pc.x, cy = pc.y;
    if (it.k) set(it.k, true);
    z = it.t === "Area" ? Math.max(2.2, Math.min(8, 0.35 * D.w / Math.max(b.width, b.height, 1))) : 6;
    const wide = !PH(), rtl = LANG === "ar", cw = wide ? 360 : 0, fx = wide ? (rtl ? cw + (view.clientWidth - cw) / 2 : (view.clientWidth - cw) / 2) : view.clientWidth / 2, fy = wide ? view.clientHeight / 2 : view.clientHeight * 0.3;
    if (it.t === "Area") z = Math.min(z, 0.5 * (view.clientWidth - cw) / (Math.max(b.width, 1) * sc), 0.5 * view.clientHeight / (Math.max(b.height, 1) * sc)); z = Math.max(z, zmin());
    if (it.k && it.k.startsWith("poi-")) z = Math.max(z, 2.8 * zmin());
    if (it.t !== "Area" && PH()) z = Math.max(z, 3.5 * zmin());   // phones: zoom in closer on a place   // schools/hospitals only show when zoomed in this far
    tx = fx - cx * sc * z; ty = fy - cy * sc * z; apply(true);
    setTimeout(() => { const r = view.getBoundingClientRect(), fake = { clientX: r.left + (wide ? (rtl ? 16 : view.clientWidth - cw - 16) : view.clientWidth / 2), clientY: r.top + view.clientHeight / 2 };
      if (it.t === "Area") openArea(it.el, fake); else if (it.el.dataset.d !== undefined) { card.classList.remove("area"); openCard(it.el, fake); } else { hideCard(); mark(it.el); show(it.el, fake); } }, 80);
    sUl.hidden = true; sIn.value = LANG === "ar" && it.ar ? it.ar : it.n; sX.hidden = false; sIn.blur();
  };
  sIn.addEventListener("input", () => {
    const q = norm(sIn.value); sUl.innerHTML = ""; if (q.length < 2) { sUl.hidden = true; return; }
    const sc = i => { const a = norm(i.n).indexOf(q), b = i.ar ? norm(i.ar).indexOf(q) : -1; return a < 0 ? (b < 0 ? -1 : b) : (b < 0 ? a : Math.min(a, b)); };
    // same match position: exact name first, then areas, then places (Burj Khalifa the tower before the Metro stop), then the rest
    const rk = i => (norm(i.n) === q || norm(i.ar) === q ? 0 : 4) + (i.t === "Area" ? 0 : (i.k || "").startsWith("pl-") ? 1 : (i.k || "").startsWith("poi-") ? 2 : 3);
    const seen = new Set(); const hits = IDX.filter(i => sc(i) >= 0).sort((a, b) => sc(a) - sc(b) || rk(a) - rk(b)).filter(i => { const k = i.n + "|" + i.t; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 8);
    hits.forEach(h => { const li = document.createElement("li"); li.innerHTML = "<b></b><small></small>"; li.firstChild.textContent = LANG === "ar" && h.ar ? h.ar + " · " + h.n : (h.ar ? h.n + " · " + h.ar : h.n); li.lastChild.textContent = h.t === "Area" ? T("Area") : (LANG === "ar" ? (LYR[h.tl] || h.t) : h.t); li.onclick = () => goTo(h); sUl.appendChild(li); });
    sUl.hidden = !hits.length;
  });
  const sX = root.querySelector(".imap-sx");
  sX.onclick = () => { sIn.value = ""; sUl.innerHTML = ""; sUl.hidden = true; sX.hidden = true; selArea(null); hideCard(); tip.style.display = "none"; sIn.focus(); };
  sIn.addEventListener("input", () => { sX.hidden = !sIn.value; if (!sIn.value) selArea(null); });
  sIn.addEventListener("focus", () => { if (sIn.value && sUl.children.length) sUl.hidden = false; });
  sIn.addEventListener("keydown", e => { if (e.key === "Enter") { const f = sUl.querySelector("li"); if (f) f.click(); } if (e.key === "Escape") { sUl.hidden = true; } });

  // ---- area news feed (built-in snapshot; refreshed from a live feed when online)
  let FEED = D.newsFeed || [], FUPD = D.newsUpdated || "", NF = "near", NPG = 0, NMINH = {};
  const NPER = 6;   // news shown as pages of 6 so the section keeps one height inside the report
  const NEWS_NEAR_KM = 12, newsSec = root.querySelector(".imap-news");
  // inside a report the news gets its own lettered part of the Location section ("C · Area news")
  const NSLOT = D.embed && document.getElementById("imap-news-slot");
  let NWRAP = null;
  if (NSLOT && newsSec) { NWRAP = document.createElement("div"); NWRAP.className = "imap embed imap-news-only"; NWRAP.appendChild(newsSec); NSLOT.appendChild(NWRAP); }
  const kmOf = it => { const ks = (it.a || []).map(a => ((D.areaInfo || {})[a] || {}).km).filter(v => v !== undefined); return ks.length ? Math.min(...ks) : null; };
  const fmtDay = iso => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ""); if (!m) return iso || ""; const M = LANG === "ar" ? ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"] : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; return (+m[3]) + " " + M[+m[2] - 1] + " " + m[1]; };
  const goArea = n => { const it = IDX.find(i => i.t === "Area" && i.n === n); if (!it) return; view.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => goTo(it), 350); };
  function renderNews() {
    if (!newsSec) return; newsSec.hidden = !FEED.length; if (!FEED.length) return;
    newsSec.querySelector(".upd").textContent = FUPD ? T("Updated") + ": " + fmtDay(FUPD) : "";
    newsSec.querySelectorAll(".imap-news-f button").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === NF));
    const P = D.project || "the project";
    newsSec.querySelector('[data-f="near"]').textContent = LANG === "ar" ? "قرب " + P : "Near " + P;
    newsSec.querySelector(".imap-news-hint").textContent = NF === "near" ? (LANG === "ar" ? "أخبار المناطق ضمن " + NEWS_NEAR_KM + " كم من " + P + "." : "News about communities within " + NEWS_NEAR_KM + " km of " + P + ".")
      : NF === "city" ? T("Metro, rail, highways and airports: projects that affect all of Dubai.") : T("Everything, for every community in Dubai, newest first.");
    const list = FEED.map(it => Object.assign({}, it, { km: kmOf(it) })).filter(it => NF === "all" ? true : NF === "city" ? it.city : (!it.city && it.km !== null && it.km <= NEWS_NEAR_KM))
      .sort((a, b) => (b.iso || "0").localeCompare(a.iso || "0") || ((a.km ?? 99) - (b.km ?? 99)));
    const ul = newsSec.querySelector(".imap-news-l");
    const pages = Math.max(1, Math.ceil(list.length / NPER)); NPG = Math.min(NPG, pages - 1);
    const drawPage = pi => { ul.innerHTML = ""; list.slice(pi * NPER, pi * NPER + NPER).forEach(it => { const li = document.createElement("li");
      const dt = document.createElement("span"); dt.className = "nd"; dt.textContent = it.d; li.appendChild(dt);
      const p = document.createElement("p"); p.textContent = it.t + " "; const a = document.createElement("a"); a.href = it.u; a.target = "_blank"; a.rel = "noopener"; a.textContent = it.s; p.appendChild(a); li.appendChild(p);
      if ((it.a || []).length) { const tg = document.createElement("div"); tg.className = "tags"; (it.a || []).slice(0, 5).forEach(n => { const b = document.createElement("button"); b.type = "button"; b.textContent = AN(n); b.onclick = () => goArea(n); tg.appendChild(b); });
        if (it.a.length > 5) { const m = document.createElement("small"); m.textContent = "+" + (it.a.length - 5); tg.appendChild(m); } if (it.km !== null && !it.city) { const k = document.createElement("em"); k.textContent = it.km + " km"; k.dir = "ltr"; tg.appendChild(k); } li.appendChild(tg); }
      ul.appendChild(li); }); };
    // lock the list to the height of its tallest page (measured once per filter, language and width) so paging never moves the report
    const key = NF + "|" + LANG + "|" + ul.clientWidth;
    if (pages > 1 && !NMINH[key]) { ul.style.minHeight = ""; let mh = 0; for (let pi = 0; pi < pages; pi++) { drawPage(pi); mh = Math.max(mh, ul.offsetHeight); } NMINH[key] = mh; }
    drawPage(NPG);
    if (!list.length) { const li = document.createElement("li"); li.className = "empty"; li.textContent = T("No news for this filter yet."); ul.appendChild(li); }
    const pg = newsSec.querySelector(".imap-news-pg"), ar = LANG === "ar"; pg.hidden = pages < 2;
    const pv = pg.querySelector(".imap-pg-new"), nx = pg.querySelector(".imap-pg-old");
    pv.textContent = ar ? "الأحدث ›" : "‹ Newer"; nx.textContent = ar ? "‹ الأقدم" : "Older ›";
    pv.disabled = NPG === 0; nx.disabled = NPG >= pages - 1;
    pg.querySelector(".imap-pg-at").textContent = ar ? "صفحة " + (NPG + 1) + " من " + pages : "Page " + (NPG + 1) + " of " + pages;
    ul.style.minHeight = pages > 1 ? NMINH[key] + "px" : "";
  }
  if (newsSec) {
    newsSec.querySelectorAll(".imap-news-f button").forEach(b => b.onclick = () => { NF = b.dataset.f; NPG = 0; renderNews(); });
    newsSec.querySelector(".imap-news-pg .imap-pg-new").onclick = () => { if (NPG > 0) { NPG--; renderNews(); } };
    newsSec.querySelector(".imap-news-pg .imap-pg-old").onclick = () => { NPG++; renderNews(); };
    renderNews();
    if (D.newsUrl && window.fetch) fetch(D.newsUrl, { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(j => { if (j && Array.isArray(j.items) && j.items.length) { FEED = j.items; FUPD = j.updated || FUPD; renderNews(); } }).catch(() => {});
  }

  // SCALE_INIT: keep lines, markers and labels near their full-view size while zooming (like a web map)
  const LINES = [], DOTS = [], MARKS = []; let MKG = null;   // MKG: the selected place icon, drawn 1.5x
  svg.querySelectorAll("g[data-k]:not([data-k='areas']):not([data-k^='pl-']):not([data-k^='poi-']) path").forEach(p => {
    if (p.closest(".sh")) return;
    const w = parseFloat(p.getAttribute("stroke-width")); if (!w) return;
    const da = (p.getAttribute("stroke-dasharray") || "").split(/[ ,]+/).filter(Boolean).map(Number);
    LINES.push([p, w, da]);
  });
  svg.querySelectorAll("circle[data-n]").forEach(c => DOTS.push([c, +c.getAttribute("r"), +c.getAttribute("stroke-width")]));
  svg.querySelectorAll("g.pl").forEach(g => { const m = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(g.getAttribute("transform")); MARKS.push([g, +m[1] + 15, +m[2] + 15, "pl"]); });
  top.querySelectorAll(".sh").forEach(g => { const b = g.getBBox(); MARKS.push([g, b.x + b.width / 2, b.y + b.height / 2, "c"]); });
  svg.querySelectorAll("g[data-k] > g.sh").forEach(g => { if (MARKS.some(m => m[0] === g)) return; const b = g.getBBox(); MARKS.push([g, b.x + b.width / 2, b.y + b.height / 2, "c"]); });
  function rescale() {
    const k0 = view.clientWidth / D.w, lf = 1 / Math.pow(z, 0.7), mf = Math.min(2.2, Math.max(1, 0.45 / k0)) / Math.pow(z, 0.8);   // narrow screens: icons scaled up so they stay tappable
    svg.style.setProperty("--zs", (1 / (k0 * z)).toFixed(4));
    for (const [p, w, da] of LINES) { p.setAttribute("stroke-width", (w * lf).toFixed(2)); if (da.length) p.setAttribute("stroke-dasharray", da.map(v => (v * lf).toFixed(1)).join(" ")); }
    for (const [c, r, sw] of DOTS) { c.setAttribute("r", (r * mf).toFixed(2)); c.setAttribute("stroke-width", (sw * mf).toFixed(2)); }
    for (const [g, cx, cy, t] of MARKS) g.setAttribute("transform", t === "pl" ? `translate(${cx} ${cy}) scale(${(mf * (g === MKG ? 1.5 : 1)).toFixed(4)}) translate(-15 -15)` : `translate(${cx} ${cy}) scale(${mf.toFixed(4)}) translate(${-cx} ${-cy})`);
    const zr = z / zmin(); view.classList.toggle("deep", zr >= 2.6); view.classList.toggle("poizoom", zr >= 2.6);
  }
  // area names: constant on-screen size; show a name only when its area is big enough on screen to hold it
  const AL = [...svg.querySelectorAll(".al")].sort((a, b) => b.dataset.ap - a.dataset.ap);
  // road names: shown once zoomed in, motorways first, never over an area name or another road name
  const RPRI = { E11: 0, E311: 0, E611: 0, "4th": 1, connect: 2, arterial: 3 };
  const RN = [...svg.querySelectorAll(".rn")].map(t => { const k = t.closest("g[data-k]").dataset.k, m = /rotate\(([-\d.]+)/.exec(t.getAttribute("transform") || ""); return { t, k, x: +t.getAttribute("x"), y: +t.getAttribute("y"), a: (m ? +m[1] : 0) * Math.PI / 180, p: RPRI[k] ?? 4 }; }).sort((a, b) => a.p - b.p);
  { const top_ = document.createElementNS(NS, "g"); top_.setAttribute("class", "rnl"); svg.appendChild(top_); RN.forEach(r => { if (r.p === 0) r.t.classList.add("mw"); top_.appendChild(r.t); }); }   // names above rail lines and icons' lines
  function labels() {
    rescale();
    const vsc = view.clientWidth / D.w * z, vx0 = -tx / vsc, vy0 = -ty / vsc, vx1 = vx0 + view.clientWidth / vsc, vy1 = vy0 + view.clientHeight / vsc;
    for (const [im, a, b, x, y, w, h] of DETS) { const vis = !MAPMODE && z > a - 0.6 && x < vx1 && x + w > vx0 && y < vy1 && y + h > vy0; if (vis && !im.getAttribute("href")) im.setAttribute("href", im.dataset.src); im.style.display = vis ? "" : "none"; im.style.opacity = Math.max(0, Math.min(1, (z - a) / (b - a))); }
    if (PIN) { PIN.setAttribute("transform", "translate(" + cpx + " " + cpy + ") scale(" + (1.7 / Math.pow(z, 0.68)).toFixed(4) + ") translate(" + (-cpx) + " " + (-cpy) + ")"); PIN.style.display = ""; }
    if (CO) CO.style.display = "none";
    if (CO) CO.setAttribute("transform", "translate(" + cpx + " " + cpy + ") scale(" + (1 / Math.pow(z, 0.85)).toFixed(4) + ") translate(" + (-cpx) + " " + (-cpy) + ")");
    const k = view.clientWidth / D.w * z, fs = 11.5 / k;
    svg.style.setProperty("--afs", fs.toFixed(2) + "px");
    const placed = [], pad = 3 / k;
    for (const t of AL) {
      let ok = +t.dataset.ap * k * k > Math.max(2600, t.textContent.length * 11.5 * 6.5 * 1.6);
      if (ok) {
        const w = t.textContent.length * fs * 0.56, h = fs * 1.1, x = +t.getAttribute("x") - w / 2, y = +t.getAttribute("y") - h / 2;
        ok = !placed.some(b => x < b[2] + pad && x + w > b[0] - pad && y < b[3] + pad && y + h > b[1] - pad);
        if (ok) placed.push([x, y, x + w, y + h]);
      }
      t.classList.toggle("on", ok);
    }
    const zr2 = z / zmin(), rshow = zr2 >= 1.7, rfs = 12 / k; svg.style.setProperty("--rfs", rfs.toFixed(2) + "px");
    for (const r of RN) {
      let ok = rshow && G[r.k] && G[r.k].style.display !== "none" && r.x > vx0 && r.x < vx1 && r.y > vy0 && r.y < vy1;
      if (ok) {
        const w = r.t.textContent.length * rfs * 0.58, h = rfs * 1.15, c = Math.abs(Math.cos(r.a)), s_ = Math.abs(Math.sin(r.a));
        const W = w * c + h * s_, H = w * s_ + h * c, x = r.x - W / 2, y = r.y - H / 2;
        ok = !placed.some(b => x < b[2] + pad && x + W > b[0] - pad && y < b[3] + pad && y + H > b[1] - pad);
        if (ok) placed.push([x, y, x + W, y + H]);
      }
      r.t.classList.toggle("on", ok);
    }
  }
  labels();
  // station name tooltip: hover with a mouse, tap on touch screens
  const tip = document.createElement("div"); tip.className = "imap-tip"; view.appendChild(tip);
  const lineName = k => { const l = D.layers.find(l => l.key === k) || {}; return l.short || l.label || ""; };
  const show = (c, e) => {
    const r = view.getBoundingClientRect(), k = c.closest("g[data-k]").dataset.k;
    tip.innerHTML = "<b></b><span></span>"; tip.firstChild.textContent = c.dataset.n; tip.lastChild.textContent = lineName(k);
    tip.style.borderColor = c.tagName === "rect" ? "#1b1f24" : c.getAttribute("stroke"); tip.style.display = "block";
    const b = c.getBoundingClientRect(), x = b.width ? b.left + b.width / 2 - r.left : e.clientX - r.left, y = b.height ? b.top - r.top + 2 : e.clientY - r.top;
    tip.style.left = Math.min(r.width - tip.offsetWidth - 6, Math.max(6, x - tip.offsetWidth / 2)) + "px";
    tip.style.top = (y - tip.offsetHeight - 14 < 4 ? y + 18 : y - tip.offsetHeight - 14) + "px";
  };
  svg.addEventListener("pointerover", e => { const c = e.target.closest("[data-n]"); if (c && !(c === MK && card.style.display === "block")) show(c, e); });
  svg.addEventListener("pointerover", e => {
    const a = e.target.closest("path[data-a]"); if (!a || e.target.closest("[data-n]")) return;
    const r = view.getBoundingClientRect(); tip.innerHTML = "<b></b><span></span>"; tip.firstChild.textContent = AN(a.dataset.a.replace(/&amp;/g, "&")); tip.lastChild.textContent = T("Area"); tip.style.borderColor = "#5b6470"; tip.style.display = "block";
    const x = e.clientX - r.left, y = e.clientY - r.top;
    tip.style.left = Math.min(r.width - tip.offsetWidth - 6, Math.max(6, x - tip.offsetWidth / 2)) + "px"; tip.style.top = (y - tip.offsetHeight - 14 < 4 ? y + 18 : y - tip.offsetHeight - 14) + "px";
  });
  svg.addEventListener("pointerout", e => { if (e.pointerType === "mouse" && e.target.closest("path[data-a]")) tip.style.display = "none"; });
  svg.addEventListener("pointerout", e => { const c = e.target.closest("[data-n]"); if (e.pointerType === "mouse" && c && !(c === MK && card.style.display !== "block")) tip.style.display = "none"; });
  // place card on click (name, category, distance to the project, description, photo)
  const card = document.createElement("div"); card.className = "imap-card"; view.appendChild(card);
  // the chosen marker stays orange while its card is open, and the card sits right beside it
  let MK = null;
  const mark = el => { if (MK) MK.classList.remove("mk-on"); MK = el || null; MKG = MK && MK.closest(".pl"); if (MK) { MK.classList.add("mk-on"); const g = MKG || MK; g.parentNode.appendChild(g); } labels(); };
  const placeCard = (el, pan) => {
    const r = view.getBoundingClientRect(), b = el.getBoundingClientRect(); if (!b.width) return;
    if (PH()) {   // phones: the card is a panel along the bottom; slide the map so the marker sits just above it
      if (pan) { const top = r.height - 8 - card.offsetHeight, wy = Math.max(b.height / 2 + 10, top - b.height / 2 - 14);
        tx += r.width / 2 - (b.left + b.width / 2 - r.left); ty += wy - (b.top + b.height / 2 - r.top); apply(true); }
      return;
    }
    const x = b.left + b.width / 2 - r.left, y = b.top + b.height / 2 - r.top, hw = b.width / 2, hh = b.height / 2, w = card.offsetWidth, h = card.offsetHeight, gap = 12;
    const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v)); let L, T;
    card.style.maxHeight = ""; card.style.overflowY = "";
    if (x + hw + gap + w <= r.width - 8) { L = x + hw + gap; T = cl(y - h / 2, 8, r.height - h - 8); }
    else if (x - hw - gap - w >= 8) { L = x - hw - gap - w; T = cl(y - h / 2, 8, r.height - h - 8); }
    else {   // narrow screens: directly under (or over) the marker, scrolling inside if it is taller than the room left
      const below = r.height - 8 - (y + hh + gap), above = y - hh - gap - 8, room = Math.max(below, above);
      L = cl(x - w / 2, 8, r.width - w - 8);
      if (h > room) { card.style.maxHeight = Math.max(120, room) + "px"; card.style.overflowY = "auto"; }
      const h2 = card.offsetHeight; T = below >= above ? y + hh + gap : y - hh - gap - h2;
    }
    card.style.left = L + "px"; card.style.top = T + "px";
  };
  const hideCard = () => { card.style.display = "none"; mark(null); };
  onMove = () => { if (MK && card.style.display === "block" && !card.classList.contains("area")) placeCard(MK); else if (MK && tip.style.display === "block" && card.style.display !== "block") show(MK, {}); };
  const addNews = (body, items, title) => { if (!items.length) return; const h = document.createElement("h5"); h.textContent = title; body.appendChild(h); const ul = document.createElement("ul"); body.appendChild(ul);
    items.forEach(it => { const li = document.createElement("li"); const em = document.createElement("span"); em.className = "nd"; em.textContent = it.d; li.appendChild(em); li.appendChild(document.createTextNode(" " + it.t + " ")); const aa = document.createElement("a"); aa.href = it.u; aa.target = "_blank"; aa.rel = "noopener"; aa.textContent = it.s; li.appendChild(aa); ul.appendChild(li); }); };
  const openCard = (c, e) => {
    tip.style.display = "none"; const r = view.getBoundingClientRect(), d = c.dataset;
    card.innerHTML = (d.img ? '<img alt="">' + (d.cr ? '<i class="imap-cr"></i>' : "") : "") + '<div class="imap-card-b"><button type="button" aria-label="Close">×</button><small></small><b></b><p></p><em></em></div>';
    if (d.img) card.querySelector("img").src = d.img;
    if (d.img && d.cr) card.querySelector(".imap-cr").textContent = d.cr;
    card.querySelector("small").textContent = d.c; card.querySelector("b").textContent = d.n; card.querySelector("p").textContent = d.d;
    card.querySelector("em").textContent = d.km + " km from " + (D.project || "the project") + " (straight line)";
    const pn = ((D.placeNews || {})[(d.n || "").replace(/&amp;/g, "&")] || []).map(k => (D.news || {})[k]).filter(Boolean); if (pn.length) { const bd = card.querySelector(".imap-card-b"), em0 = bd.querySelector("em"); addNews(bd, pn, T("What's happening")); bd.appendChild(em0); }
    if (!d.d) card.querySelector("p").remove();
    card.querySelector("button").onclick = ev => { ev.stopPropagation(); hideCard(); };
    mark(c); card.style.display = "block"; placeCard(c, true);
  };
  const iso = it => it.iso || (/(20\d\d)/.exec(it.d || "") || [])[1] || "";
  const openArea = (a, e) => {
    const n = a.dataset.a.replace(/&amp;/g, "&"), I = (D.areaInfo || {})[n] || {}; tip.style.display = "none";
    const r = view.getBoundingClientRect();
    card.innerHTML = (I.img ? '<img alt=""><i class="imap-cr"></i>' : "") + '<div class="imap-card-b"><button type="button" aria-label="Close">×</button><small>Area</small><b></b><p></p></div>';
    if (I.img) { card.querySelector("img").src = I.img; card.querySelector(".imap-cr").textContent = I.cr || ""; }
    card.querySelector("b").textContent = AN(n); card.querySelector("small").textContent = T("Area"); card.querySelector("p").textContent = I.d || "";
    const body = card.querySelector(".imap-card-b");
    const sec = (title, cls) => { const h = document.createElement("h5"); h.textContent = title; h.className = cls || ""; body.appendChild(h); const ul = document.createElement("ul"); body.appendChild(ul); return ul; };
    if ((I.p || []).length) { const ul = sec(T("Dubai 2040 Urban Master Plan"), "p40"); I.p.forEach(t => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); }); }
    const items = (I.n || []).map(k => (D.news || {})[k]).filter(Boolean); FEED.forEach(it => { if ((it.a || []).includes(n) && !(I.n || []).includes(it.k) && !items.some(x => x.t === it.t)) items.unshift(it); }); items.sort((a, b) => (iso(b) || "0").localeCompare(iso(a) || "0"));
    addNews(body, items, T(I.nb ? "What's happening nearby" : "What's happening"));
    if (I.km !== undefined) { const em = document.createElement("em"); em.textContent = "Centre of the area is " + I.km + " km from " + (D.project || "the project") + " (straight line)"; body.appendChild(em); }
    card.querySelector("button").onclick = ev => { ev.stopPropagation(); hideCard(); };
    mark(null); card.classList.add("area"); card.style.display = "block";
    const x = e.clientX - r.left, w = card.offsetWidth, h = card.offsetHeight;
    card.style.left = Math.min(r.width - w - 8, Math.max(8, x + 16 + w > r.width ? x - w - 16 : x + 16)) + "px";
    card.style.top = Math.max(8, Math.min(r.height - h - 8, e.clientY - r.top - h / 2)) + "px";
  };
  view.addEventListener("click", e => {
    if (e.target.closest(".imap-card,.imap-zoom,.imap-search")) return;
    if (DRAGGED) { DRAGGED = false; return; }   // end of a drag or pinch, not a tap
    const el = document.elementFromPoint(e.clientX, e.clientY), c = el && el.closest("[data-n]");
    if (c && c.dataset.d !== undefined) { card.classList.remove("area"); openCard(c, e); return; }
    const ar = !c && el && el.closest("path[data-a]"); if (ar) { selArea(ar); openArea(ar, e); return; }
    hideCard(); if (c) { mark(c); show(c, e); } else tip.style.display = "none";
  });
  // ---- language switch (English / Arabic)
  function applyLang() {
    root.dir = LANG === "ar" ? "rtl" : "ltr"; root.lang = LANG;
    const U = (D.i18n || {}).ui || {}, LY = (D.i18n || {}).layers || {}, NR = (D.i18n || {}).near || {};
    if (NWRAP) { NWRAP.dir = LANG === "ar" ? "rtl" : "ltr"; NWRAP.lang = LANG; }
    [root, NWRAP].filter(Boolean).flatMap(r => [...r.querySelectorAll("[data-t]")]).forEach(e => { const k = e.dataset.t; if (!e.dataset.en) e.dataset.en = e.dataset.html ? e.innerHTML : e.textContent; const v = LANG === "ar" ? (U[k] || LY[k] || e.dataset.en) : e.dataset.en; if (e.dataset.html) e.innerHTML = v; else e.textContent = v; });
    root.querySelectorAll("[data-tl]").forEach(e => e.textContent = LANG === "ar" ? (LY[e.dataset.tl] || e.dataset.tl) : e.dataset.tl);
    root.querySelectorAll("[data-tn]").forEach(e => e.textContent = LANG === "ar" ? (NR[e.dataset.tn] || AN(e.dataset.tn)) : e.dataset.tn);
    svg.querySelectorAll(".al").forEach(t => { if (!t.dataset.en) t.dataset.en = t.textContent; t.textContent = AN(t.dataset.en.replace(/&amp;/g, "&")); });
    svg.querySelectorAll(".rn").forEach(t => { if (!t.dataset.en) t.dataset.en = t.textContent; t.textContent = LANG === "ar" && t.dataset.ar ? t.dataset.ar : t.dataset.en; });
    sIn.placeholder = LANG === "ar" ? U["Search an area, station or place…"] : "Search an area, station or place…";
    const ht = document.querySelectorAll("[data-tpage]"); ht.forEach(e => { if (!e.dataset.en) e.dataset.en = e.textContent; e.textContent = LANG === "ar" ? (U[e.dataset.tpage] ? U[e.dataset.tpage] + (e.dataset.tpage === "title" ? " " + (D.project || "") : "") : e.dataset.en) : e.dataset.en; });
    if (!D.embed) document.documentElement.dir = root.dir;   // inside a report only the map flips, not the page
    labels(); if (typeof renderNews === "function") renderNews(); try { localStorage.setItem("imap-lang", LANG); } catch (e) {}
  }
  const LB = root.querySelectorAll(".imap-langs button"); const markLang = () => LB.forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === LANG)); LB.forEach(b => b.onclick = () => { if (LANG !== b.dataset.lang) { LANG = b.dataset.lang; applyLang(); hideCard(); if (SEL) { const it = IDX.find(i => i.el === SEL); if (it) sIn.value = LANG === "ar" && it.ar ? it.ar : it.n; } } markLang(); });
  if (D.i18n) { try { if (localStorage.getItem("imap-lang") === "ar") { LANG = "ar"; applyLang(); } } catch (e) {} markLang(); } else root.querySelector(".imap-top").hidden = true;
  // inside a report: put the language switch at the right end of the section heading (saves a row)
  if (D.embed) { const hd = document.querySelector(".imap-h"), tp = root.querySelector(".imap-top"); if (hd && tp) { tp.classList.add("in-h"); hd.appendChild(tp); } }
  // phones: open zoomed in around the project
  if (PH() && CO) { const sc = view.clientWidth / D.w; z = Math.max(zmin(), 1.2); tx = view.clientWidth / 2 - cpx * sc * z; ty = view.clientHeight / 2 - cpy * sc * z; apply(true); }
}
