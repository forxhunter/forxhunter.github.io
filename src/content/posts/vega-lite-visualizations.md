---
title: Declarative Visualizations with Vega-Lite
date: 2025-04-25
description: Point plots, histograms, and small multiples using Vega-Lite's concise JSON grammar.
tags: [charts, visualization, vega]
categories: [demo]
toc: true
vega: true
---

[Vega-Lite](https://vega.github.io/vega-lite/) is a high-level grammar for interactive visualization.
You write a JSON specification; Vega-Lite renders the chart. Enable it with `vega: true`.

## Particle Speed — Scatter Plot

Rest mass vs maximum observed speed for fundamental particles:

<div id="vis1"></div>

<script>
(function poll() {
  if (typeof vegaEmbed === 'undefined') { setTimeout(poll, 50); return; }
  vegaEmbed('#vis1', {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Particle speed vs mass",
    "width": "container",
    "height": 260,
    "data": {
      "values": [
        {"particle": "Photon",      "mass_eV": 0,      "speed_c": 1.000, "type": "Boson"},
        {"particle": "Neutrino",    "mass_eV": 0.001,  "speed_c": 0.999, "type": "Fermion"},
        {"particle": "Electron",    "mass_eV": 511000, "speed_c": 0.999, "type": "Fermion"},
        {"particle": "Muon",        "mass_eV": 105700000, "speed_c": 0.997, "type": "Fermion"},
        {"particle": "Pion",        "mass_eV": 135000000, "speed_c": 0.988, "type": "Meson"},
        {"particle": "Proton",      "mass_eV": 938300000, "speed_c": 0.946, "type": "Baryon"},
        {"particle": "Neutron",     "mass_eV": 939600000, "speed_c": 0.945, "type": "Baryon"},
        {"particle": "W Boson",     "mass_eV": 80400000000, "speed_c": 0.312, "type": "Boson"},
        {"particle": "Higgs",       "mass_eV": 125090000000, "speed_c": 0.198, "type": "Boson"}
      ]
    },
    "mark": {"type": "point", "filled": true, "size": 80},
    "encoding": {
      "x": {"field": "mass_eV", "type": "quantitative", "scale": {"type": "log"}, "axis": {"title": "Rest mass (eV/c²) — log scale"}},
      "y": {"field": "speed_c", "type": "quantitative", "axis": {"title": "Speed (fraction of c)"}},
      "color": {"field": "type", "type": "nominal", "title": "Type"},
      "tooltip": [
        {"field": "particle", "title": "Particle"},
        {"field": "mass_eV", "title": "Mass (eV)"},
        {"field": "speed_c", "title": "Speed (c)"},
        {"field": "type", "title": "Category"}
      ]
    }
  }, {actions: false});
})();
</script>

## Paper Length — Histogram

Distribution of page counts across 500 randomly sampled physics papers (fictional data):

<div id="vis2"></div>

<script>
(function poll() {
  if (typeof vegaEmbed === 'undefined') { setTimeout(poll, 50); return; }
  vegaEmbed('#vis2', {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 240,
    "data": {
      "values": Array.from({length: 500}, () => ({pages: Math.round(Math.max(2, Math.min(40, 6 + Math.random()*8 + (Math.random()>0.85 ? 15 : 0))))}))
    },
    "mark": "bar",
    "encoding": {
      "x": {"bin": {"maxbins": 20}, "field": "pages", "title": "Pages"},
      "y": {"aggregate": "count", "title": "Number of papers"},
      "tooltip": [
        {"bin": true, "field": "pages", "title": "Pages"},
        {"aggregate": "count", "title": "Papers"}
      ]
    }
  }, {actions: false});
})();
</script>

## Citations by Decade — Small Multiples

Faceted bar chart: citations per decade, one panel per topic:

<div id="vis3"></div>

<script>
(function poll() {
  if (typeof vegaEmbed === 'undefined') { setTimeout(poll, 50); return; }
  vegaEmbed('#vis3', {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 120,
    "height": 100,
    "data": {
      "values": [
        {"decade": "1950s", "topic": "Quantum",    "citations": 120},
        {"decade": "1960s", "topic": "Quantum",    "citations": 340},
        {"decade": "1970s", "topic": "Quantum",    "citations": 890},
        {"decade": "1980s", "topic": "Quantum",    "citations": 1900},
        {"decade": "1990s", "topic": "Quantum",    "citations": 4200},
        {"decade": "2000s", "topic": "Quantum",    "citations": 8800},
        {"decade": "2010s", "topic": "Quantum",    "citations": 14500},
        {"decade": "1950s", "topic": "Relativity", "citations": 80},
        {"decade": "1960s", "topic": "Relativity", "citations": 200},
        {"decade": "1970s", "topic": "Relativity", "citations": 440},
        {"decade": "1980s", "topic": "Relativity", "citations": 780},
        {"decade": "1990s", "topic": "Relativity", "citations": 1200},
        {"decade": "2000s", "topic": "Relativity", "citations": 2100},
        {"decade": "2010s", "topic": "Relativity", "citations": 3400},
        {"decade": "1950s", "topic": "Particle",   "citations": 200},
        {"decade": "1960s", "topic": "Particle",   "citations": 600},
        {"decade": "1970s", "topic": "Particle",   "citations": 1400},
        {"decade": "1980s", "topic": "Particle",   "citations": 3200},
        {"decade": "1990s", "topic": "Particle",   "citations": 5500},
        {"decade": "2000s", "topic": "Particle",   "citations": 9000},
        {"decade": "2010s", "topic": "Particle",   "citations": 12000}
      ]
    },
    "facet": {"field": "topic", "type": "nominal", "columns": 3},
    "spec": {
      "mark": "bar",
      "encoding": {
        "x": {"field": "decade", "type": "ordinal", "axis": {"labelAngle": -45, "title": null}},
        "y": {"field": "citations", "type": "quantitative", "title": "Citations"},
        "color": {"field": "topic", "type": "nominal", "legend": null},
        "tooltip": [{"field": "decade"}, {"field": "topic"}, {"field": "citations"}]
      }
    }
  }, {actions: false});
})();
</script>

## Usage

```yaml
---
title: My Post With Vega-Lite
vega: true
---
```

Create a container `<div id="vis1"></div>` and call `vegaEmbed` using the polling pattern:

```javascript
(function poll() {
  if (typeof vegaEmbed === 'undefined') { setTimeout(poll, 50); return; }
  vegaEmbed('#vis1', spec, {actions: false});
})();
```

All charts are responsive — `"width": "container"` makes them fill the available width.
