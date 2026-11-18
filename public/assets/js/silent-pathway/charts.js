// Interactive figures for the post "Can a virtual cell predict a pathway it has never seen switch on?".
// Data come from the JSON named in the script tag's data-src attribute.
(function () {
  var src = document.currentScript && document.currentScript.getAttribute("data-src");
  if (!src) return;
  fetch(src)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      window.BLOG_DATA = data;
      // Small SVG chart kit for the blog. Every colour comes from CSS tokens; charts redraw on resize.
      (function () {
        const D = window.BLOG_DATA;
        const NS = "http://www.w3.org/2000/svg";
        const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
        let tip = document.getElementById("sp-tip");
        if (!tip) {
          tip = document.createElement("div");
          tip.id = "sp-tip";
          tip.hidden = true;
          document.body.appendChild(tip);
        }
        const fmt = (v, d = 2) => (v === null || v === undefined || Number.isNaN(v) ? "–" : (+v).toFixed(d));
        const sgn = (v, d = 2) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(d);

        function el(tag, attrs, parent) {
          const e = document.createElementNS(NS, tag);
          for (const k in attrs) e.setAttribute(k, attrs[k]);
          if (parent) parent.appendChild(e);
          return e;
        }
        function text(parent, x, y, s, cls, anchor = "start", extra = {}) {
          const t = el("text", { x, y, class: cls, "text-anchor": anchor, ...extra }, parent);
          t.textContent = s;
          return t;
        }
        function showTip(evt, html) {
          tip.innerHTML = html;
          tip.hidden = false;
          const r = tip.getBoundingClientRect();
          let x = evt.clientX + 14,
            y = evt.clientY + 14;
          if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - 14;
          if (y + r.height > window.innerHeight - 8) y = evt.clientY - r.height - 14;
          tip.style.left = x + "px";
          tip.style.top = y + "px";
        }
        const hideTip = () => (tip.hidden = true);
        const sw = (c, dash) =>
          dash ? `<span class="sw dash" style="border-color:${c}"></span>` : `<span class="sw" style="background:${c}"></span>`;
        function hover(node, html) {
          node.addEventListener("pointermove", (e) => showTip(e, html));
          node.addEventListener("pointerleave", hideTip);
        }

        function linear(d0, d1, r0, r1) {
          const f = (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
          f.domain = [d0, d1];
          return f;
        }
        function ticks(a, b, n) {
          const step = Math.pow(10, Math.floor(Math.log10((b - a) / n)));
          const err = (b - a) / n / step;
          const s = step * (err >= 7 ? 10 : err >= 3 ? 5 : err >= 1.5 ? 2 : 1);
          const out = [];
          for (let v = Math.ceil(a / s) * s; v <= b + 1e-9; v += s) out.push(+v.toFixed(10));
          return out;
        }
        function frame(host, h) {
          host.innerHTML = "";
          const w = Math.max(300, host.clientWidth);
          const svg = el("svg", { viewBox: `0 0 ${w} ${h}`, width: w, height: h, role: "img" }, host);
          if (host.dataset.label) svg.setAttribute("aria-label", host.dataset.label);
          return { svg, w, h };
        }
        function yAxis(g, y, x0, x1, tks, f) {
          const step = tks.length > 1 ? Math.abs(tks[1] - tks[0]) : 1;
          f = f || ((v) => fmt(v, step < 0.1 ? 2 : 1));
          tks.forEach((v) => {
            el("line", { x1: x0, x2: x1, y1: y(v), y2: y(v), class: v === 0 ? "zero" : "grid" }, g);
            text(g, x0 - 6, y(v) + 4, f(v), "tick", "end");
          });
        }
        function legend(host, items) {
          const lg = document.createElement("div");
          lg.className = "legend";
          lg.innerHTML = items.map(([n, c, dash]) => `<span>${sw(c, dash)}${n}</span>`).join("");
          host.appendChild(lg);
        }
        const GC = () => ({
          Reference: css("--sp-grey"),
          Observational: css("--sp-blue"),
          "Curated prior": css("--sp-aqua"),
          "Sequence prior": css("--sp-magenta"),
          "Wrong or random prior": css("--sp-violet"),
        });

        // ---------------------------------------------------------------- horizontal bars
        function hbars(host, rows, opts) {
          const narrow = host.clientWidth < 560;
          const lw = narrow ? 150 : opts.lw || 220,
            rowH = 24;
          const { svg, w, h } = frame(host, rows.length * rowH + 46);
          const x = linear(opts.xmin || 0, opts.xmax, lw, w - 46);
          const g = el("g", {}, svg);
          ticks(opts.xmin || 0, opts.xmax, 5).forEach((v) => {
            el("line", { x1: x(v), x2: x(v), y1: 6, y2: h - 32, class: v === 0 ? "zero" : "grid" }, g);
            text(g, x(v), h - 16, fmt(v, opts.tickDec ?? 1), "tick", "middle");
          });
          if (opts.ref !== undefined) el("line", { x1: x(opts.ref), x2: x(opts.ref), y1: 6, y2: h - 32, class: "ref" }, g);
          rows.forEach((r, i) => {
            const y0 = 8 + i * rowH;
            const lab = narrow && r.label.length > 24 ? r.label.slice(0, 23) + "…" : r.label;
            text(g, lw - 8, y0 + rowH / 2 + 2, lab, "lab", "end");
            const v = r.value;
            el("rect", { x: x(Math.min(0, v)), y: y0 + 3, width: Math.max(2, Math.abs(x(v) - x(0))), height: rowH - 8, rx: 3, fill: r.color }, g);
            text(g, x(Math.max(0, v)) + 5, y0 + rowH / 2 + 2, fmt(v, opts.valDec ?? 2), "val");
            hover(el("rect", { x: 0, y: y0, width: w, height: rowH, fill: "transparent" }, g), r.tip);
          });
          text(g, (lw + w - 46) / 2, h - 1, opts.xlabel, "axis", "middle");
        }

        // ---------------------------------------------------------------- grouped vertical bars
        function grouped(host, cats, series, opts) {
          const { svg, w, h } = frame(host, opts.h || 260);
          const m = { l: 46, r: 10, t: 12, b: opts.rotate ? 70 : 40 };
          const y = linear(opts.ymin, opts.ymax, h - m.b, m.t);
          const g = el("g", {}, svg);
          yAxis(g, y, m.l, w - m.r, ticks(opts.ymin, opts.ymax, 5), opts.yfmt);
          const bw = (w - m.l - m.r) / cats.length;
          const inner = Math.min(22, (bw * 0.8) / series.length);
          cats.forEach((c, i) => {
            const cx = m.l + bw * (i + 0.5);
            text(
              g,
              cx,
              h - m.b + 16,
              c,
              "tick",
              opts.rotate ? "end" : "middle",
              opts.rotate ? { transform: `rotate(-30 ${cx} ${h - m.b + 16})` } : {}
            );
            series.forEach((s, j) => {
              const raw = s.values[i];
              if (raw === null || raw === undefined || Number.isNaN(raw)) return;
              const v = Math.max(opts.ymin, Math.min(opts.ymax, raw));
              const x0 = cx + (j - series.length / 2) * inner + 1;
              const y0 = y(Math.max(0, v)),
                y1 = y(Math.min(0, v));
              el("rect", { x: x0, y: y0, width: inner - 2, height: Math.max(1, y1 - y0), rx: 3, fill: s.color }, g);
              hover(
                el("rect", { x: x0 - 1, y: m.t, width: inner, height: h - m.b - m.t, fill: "transparent" }, g),
                `<b>${c}</b><br>${sw(s.color)}${s.name}: ${opts.vfmt(raw)}`
              );
            });
          });
          if (opts.ylabel) text(g, 12, (m.t + h - m.b) / 2, opts.ylabel, "axis", "middle", { transform: `rotate(-90 12 ${(m.t + h - m.b) / 2})` });
          legend(
            host,
            series.map((s) => [s.name, s.color])
          );
        }

        // ---------------------------------------------------------------- lines over shot levels
        const LEVELS = ["0", "1", "3", "10", "30", "100", "300", "1000", "1 donor", "4 donors"];
        function lines(host, series, opts) {
          const narrow = host.clientWidth < 560;
          const { svg, w, h } = frame(host, opts.h || 320);
          const m = { l: 50, r: narrow || opts.noLabels ? 12 : 150, t: 12, b: 46 };
          const lv = opts.levels || LEVELS;
          const x = linear(0, lv.length - 1, m.l + 8, w - m.r);
          const y = linear(opts.ymin, opts.ymax, h - m.b, m.t);
          const g = el("g", {}, svg);
          yAxis(g, y, m.l, w - m.r, ticks(opts.ymin, opts.ymax, 6));
          lv.forEach((l, i) => {
            const lab =
              l === "1 donor" ? (narrow ? "1d" : "1 donor") : l === "4 donors" ? (narrow ? "4d" : "4 donors") : l === "1000" && narrow ? "1k" : l;
            text(g, x(i), h - m.b + 16, lab, "tick", "middle");
          });
          text(g, (m.l + w - m.r) / 2, h - 8, opts.xlabel, "axis", "middle");
          text(g, 12, (m.t + h - m.b) / 2, opts.ylabel, "axis", "middle", { transform: `rotate(-90 12 ${(m.t + h - m.b) / 2})` });
          const cl = (v) => Math.max(opts.ymin, Math.min(opts.ymax, v));
          series.forEach((s) => {
            const pts = lv.map((l, i) => [i, s.get(l)]).filter((p) => p[1]);
            const band = pts
              .map(([i, r]) => `${x(i)},${y(cl(r.hi))}`)
              .concat(
                pts
                  .slice()
                  .reverse()
                  .map(([i, r]) => `${x(i)},${y(cl(r.lo))}`)
              );
            el("polygon", { points: band.join(" "), fill: s.color, "fill-opacity": 0.12 }, g);
            el(
              "polyline",
              {
                points: pts.map(([i, r]) => `${x(i)},${y(cl(r.mean))}`).join(" "),
                fill: "none",
                stroke: s.color,
                "stroke-width": 2,
                "stroke-dasharray": s.dash ? "6 4" : "none",
              },
              g
            );
            pts.forEach(
              ([i, r]) =>
                r.mean >= opts.ymin && el("circle", { cx: x(i), cy: y(r.mean), r: 3, fill: s.color, stroke: css("--sp-bg"), "stroke-width": 1.5 }, g)
            );
            if (pts.length) {
              const [i, r] = pts[pts.length - 1];
              s._end = [x(i) + 8, y(cl(r.mean))];
            }
          });
          if (!narrow && !opts.noLabels) {
            const ends = series.filter((s) => s._end).sort((a, b) => a._end[1] - b._end[1]);
            let last = -1e9;
            ends.forEach((s) => {
              const yy = Math.max(s._end[1] + 4, last + 13);
              last = yy;
              text(g, s._end[0], yy, s.name, "dlab");
            });
          }
          const cross = el("line", { y1: m.t, y2: h - m.b, class: "cross", visibility: "hidden" }, g);
          const hit = el("rect", { x: m.l, y: m.t, width: w - m.r - m.l + 4, height: h - m.b - m.t, fill: "transparent" }, g);
          hit.addEventListener("pointermove", (e) => {
            const bb = svg.getBoundingClientRect();
            const px = ((e.clientX - bb.left) / bb.width) * w;
            const i = Math.max(0, Math.min(lv.length - 1, Math.round((px - x(0)) / (x(1) - x(0)))));
            cross.setAttribute("x1", x(i));
            cross.setAttribute("x2", x(i));
            cross.setAttribute("visibility", "visible");
            const n = D.n_shots[lv[i]];
            const rows = series
              .map((s) => [s, s.get(lv[i])])
              .filter((r) => r[1])
              .sort((a, b) => b[1].mean - a[1].mean);
            const f = opts.signed ? sgn : fmt;
            showTip(
              e,
              `<b>${lv[i]}${/donor/.test(lv[i]) ? ` (~${Math.round(n)} cells)` : " stimulated cells"}</b><br>` +
                rows.map(([s, r]) => `${sw(s.color, s.dash)}${s.name}: ${f(r.mean)} <span class="muted">[${f(r.lo)}, ${f(r.hi)}]</span>`).join("<br>")
            );
          });
          hit.addEventListener("pointerleave", () => {
            hideTip();
            cross.setAttribute("visibility", "hidden");
          });
          legend(
            host,
            series.map((s) => [s.name, s.color, s.dash])
          );
        }
        function getter(rows, key, name) {
          const map = {};
          rows.filter((r) => r[key] === name).forEach((r) => (map[r.level] = r));
          return (l) => map[l];
        }

        // ================================================================ Figure 2: zero-shot
        function zRank(host) {
          const gc = GC();
          const rows = D.zeroshot
            .slice()
            .sort((a, b) => b.auprc - a.auprc)
            .map((r) => ({
              label: r.label,
              value: r.auprc,
              color: gc[r.group],
              tip:
                `<b>${r.label}</b><br>${sw(gc[r.group])}${r.group}<br>AUPRC ${fmt(r.auprc, 3)} ± ${fmt(r.sd, 3)} over 7 cell types` +
                `<br>${fmt(r.auprc / D.base_rate, 0)}× chance` +
                (r.coverage === null || r.coverage === undefined ? "" : `<br>covers ${fmt(r.coverage * 100, 0)}% of top responders`),
            }));
          const narrow = host.clientWidth < 560;
          hbars(host, rows, {
            xmax: 0.8,
            ref: D.base_rate,
            xlabel: narrow
              ? "AUPRC, top-100 responders (chance dotted)"
              : `AUPRC for the top-100 responders among all ${"13,306"} expressed genes (chance ${fmt(D.base_rate, 4)}, dotted)`,
          });
          legend(
            host,
            Object.entries(gc).map(([k, c]) => [k, c])
          );
        }
        function zBlind(host) {
          const b = D.blindspot;
          grouped(
            host,
            b.map((r) => `Top ${r.k} responders`),
            [
              { name: "Control-only HVGs", color: css("--sp-blue"), values: b.map((r) => r.frac_in_ctrl_hvg * 100) },
              { name: "IFN priors", color: css("--sp-aqua"), values: b.map((r) => r.frac_in_prior * 100) },
              { name: "Either", color: css("--sp-grey"), values: b.map((r) => r.frac_in_either * 100) },
            ],
            { ymin: 0, ymax: 100, yfmt: (v) => v + "%", vfmt: (v) => fmt(v, 0) + "% covered", ylabel: "% covered" }
          );
        }
        function zScale(host) {
          const pts = D.scatter,
            mag = D.magnitude;
          const { svg, w, h } = frame(host, 280);
          const m = { l: 46, r: 12, t: 12, b: 40 };
          const xs = pts.map((p) => p.weight);
          const ys = pts.flatMap((p) => [p["CD14+ Monocytes"], p["CD4 T cells"]]);
          const x = linear(Math.min(...xs) - 0.5, Math.max(...xs) + 0.5, m.l, w - m.r);
          const y = linear(Math.min(-1, Math.min(...ys)), Math.max(...ys) + 0.2, h - m.b, m.t);
          const g = el("g", {}, svg);
          yAxis(g, y, m.l, w - m.r, ticks(y.domain[0], y.domain[1], 5));
          ticks(x.domain[0], x.domain[1], 6).forEach((v) => text(g, x(v), h - m.b + 16, fmt(v, 0), "tick", "middle"));
          const series = [
            ["CD14+ Monocytes", css("--sp-orange")],
            ["CD4 T cells", css("--sp-blue")],
          ];
          series.forEach(([ct, c]) =>
            pts.forEach((p) =>
              hover(
                el("circle", { cx: x(p.weight), cy: y(p[ct]), r: 3.2, fill: c, "fill-opacity": 0.55 }, g),
                `<b class="gene">${p.gene}</b><br>PROGENy weight ${fmt(p.weight, 1)}<br>${sw(css("--sp-orange"))}CD14+ Mono Δ ${fmt(
                  p["CD14+ Monocytes"]
                )}<br>${sw(css("--sp-blue"))}CD4 T Δ ${fmt(p["CD4 T cells"])}`
              )
            )
          );
          series.forEach(([ct, c]) => {
            const s = mag.find((r) => r.cell_type === ct).slope;
            el("line", { x1: x(x.domain[0]), y1: y(s * x.domain[0]), x2: x(x.domain[1]), y2: y(s * x.domain[1]), stroke: c, "stroke-width": 2 }, g);
          });
          text(g, (m.l + w - m.r) / 2, h - 4, "PROGENy JAK-STAT weight (external prior)", "axis", "middle");
          text(g, 12, (m.t + h - m.b) / 2, "Observed Δ", "axis", "middle", { transform: `rotate(-90 12 ${(m.t + h - m.b) / 2})` });
          legend(
            host,
            series.map(([ct, c]) => [`${ct} (slope ${fmt(mag.find((r) => r.cell_type === ct).slope, 3)})`, c])
          );
        }
        function zAxis(host) {
          const rows = D.manifold;
          grouped(
            host,
            rows.map((r) => r.label),
            [
              { name: "all genes", color: css("--sp-aqua"), values: rows.map((r) => r.all) },
              { name: "only genes outside every interferon prior", color: css("--sp-grey"), values: rows.map((r) => r.nonifn) },
            ],
            { ymin: -0.2, ymax: 0.8, rotate: true, h: 300, vfmt: (v) => "r = " + fmt(v), ylabel: "Pearson r with observed Δ" }
          );
        }

        // ================================================================ Figure 3: few-shot
        function fCurves(host) {
          const col = {
            "Control (Δ = 0)": css("--sp-grey"),
            "Mean shift": css("--sp-orange"),
            "PROGENy 1-parameter": css("--sp-magenta"),
            "Data-only EB": css("--sp-blue"),
            "EB + ISG prior": css("--sp-blue"),
            scGen: css("--sp-violet"),
            "scGen + ISG axis": css("--sp-violet"),
          };
          lines(
            host,
            Object.keys(col).map((n) => ({ name: n, color: col[n], dash: D.fewshot_style[n].dash, get: getter(D.fewshot, "model", n) })),
            { ymin: -0.6, ymax: 1, h: 340, xlabel: "IFN-β-stimulated cells revealed (training donors)", ylabel: "R² of Δ, all genes" }
          );
        }
        function adv(host, rows, colors) {
          const lo = Math.min(-0.05, ...rows.map((r) => r.lo)),
            hi = Math.max(0.1, ...rows.map((r) => r.hi));
          lines(
            host,
            Object.keys(colors).map((n) => ({ name: n, color: colors[n], get: getter(rows, "prior", n) })),
            {
              ymin: Math.floor(lo * 20) / 20,
              ymax: Math.ceil(hi * 20) / 20,
              levels: LEVELS.slice(1),
              h: 270,
              noLabels: true,
              signed: true,
              xlabel: "IFN-β-stimulated cells revealed",
              ylabel: "ΔR² vs same model, no prior",
            }
          );
        }
        function fAdvEB(host) {
          adv(host, D.adv_eb, {
            "ISG gene sets": css("--sp-aqua"),
            "ISGF3 regulon": css("--sp-green"),
            "ISRE motif (DNA only)": css("--sp-magenta"),
            "Hypoxia (wrong)": css("--sp-violet"),
            "Random genes": css("--sp-grey"),
            "Control motif": css("--sp-muted"),
          });
        }
        function fAdvSG(host) {
          adv(host, D.adv_sg, {
            "ISG gene sets": css("--sp-aqua"),
            "ISRE motif (DNA only)": css("--sp-magenta"),
            "Hypoxia (wrong)": css("--sp-violet"),
            "Random genes": css("--sp-grey"),
          });
        }

        // ================================================================ Figure 4: metrics
        function mPitfall(host) {
          const rows = D.pitfall;
          grouped(
            host,
            rows.map((r) => r.label),
            [
              { name: "R² on absolute expression (usual headline)", color: css("--sp-grey"), values: rows.map((r) => r.r2_expr) },
              { name: "R² on response Δ", color: css("--sp-blue"), values: rows.map((r) => r.r2_delta) },
            ],
            { ymin: -0.6, ymax: 1, rotate: true, h: 300, yfmt: (v) => fmt(v, 1), vfmt: (v) => "R² " + fmt(v), ylabel: "R², all genes" }
          );
        }
        function mCellType(host) {
          const rows = D.celltype;
          const names = ["Data-only EB", "EB + ISG prior", "scGen", "Mean shift"];
          const col = [css("--sp-blue"), css("--sp-aqua"), css("--sp-violet"), css("--sp-orange")];
          grouped(
            host,
            rows.map((r) => r.cell_type.replace(" cells", "").replace("+ Monocytes", "+ Mono")),
            names.map((n, i) => ({ name: n, color: col[i], values: rows.map((r) => r[n]) })),
            { ymin: -0.6, ymax: 1, rotate: true, h: 300, yfmt: (v) => fmt(v, 1), vfmt: (v) => "R² " + fmt(v), ylabel: "R² of Δ, top-50 genes" }
          );
        }

        const charts = { zRank, zBlind, zScale, zAxis, fCurves, fAdvEB, fAdvSG, mPitfall, mCellType };
        function drawAll() {
          document.querySelectorAll("[data-chart]").forEach((host) => {
            try {
              charts[host.dataset.chart](host);
            } catch (err) {
              host.textContent = "Chart failed to render: " + err.message;
            }
          });
        }
        drawAll();
        let t;
        new ResizeObserver(() => {
          clearTimeout(t);
          t = setTimeout(drawAll, 120);
        }).observe(document.querySelector("#markdown-content") || document.body);
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", drawAll);
        new MutationObserver(drawAll).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      })();
    });
})();
