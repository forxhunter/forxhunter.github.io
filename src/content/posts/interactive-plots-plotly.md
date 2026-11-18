---
title: Interactive Scientific Plots with Plotly
date: 2025-05-01
description: 3D surface plots, contour maps, and animated charts with Plotly.js — hover, pan, zoom included.
tags: [charts, visualization, plotly, science]
categories: [demo]
toc: true
math: true
relatedPosts: true
plotly: true
---

[Plotly.js](https://plotly.com/javascript/) produces publication-quality interactive figures with
built-in hover, zoom, and pan. Enable it with `plotly: true`. Math rendering works alongside
Plotly when you also set `math: true`.

## Double-Well Potential — 3D Surface

The potential energy function $V(x, y) = (x^2 - 1)^2 + y^2$ creates a characteristic double-well
landscape used in molecular dynamics:

<div id="surface3d" style="height:420px;"></div>

<script>
(function poll() {
  if (typeof Plotly === 'undefined') { setTimeout(poll, 50); return; }
  const N = 50;
  const lin = Array.from({length: N}, (_, i) => -2 + (4 * i / (N - 1)));
  const z = lin.map(y => lin.map(x => Math.pow(x*x - 1, 2) + y*y));
  Plotly.newPlot('surface3d', [{
    type: 'surface', z, x: lin, y: lin,
    colorscale: 'Viridis', showscale: true,
    contours: { z: { show: true, usecolormap: true, highlightcolor: '#42f462', project: { z: true } } }
  }], {
    title: 'V(x,y) = (x² − 1)² + y²',
    scene: {
      xaxis: {title: 'x'}, yaxis: {title: 'y'}, zaxis: {title: 'V(x,y)'},
      camera: { eye: {x: 1.6, y: 1.6, z: 0.8} }
    },
    margin: {l: 0, r: 0, t: 40, b: 0},
    paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
  }, {responsive: true, displayModeBar: false});
})();
</script>

## Probability Density — Contour Map

Probability density $|\psi_{2,1}(x,y)|^2$ for a 2D quantum harmonic oscillator:

<div id="contourMap" style="height:380px;"></div>

<script>
(function poll() {
  if (typeof Plotly === 'undefined') { setTimeout(poll, 50); return; }
  const N = 80;
  const range = Array.from({length: N}, (_, i) => -4 + (8 * i / (N - 1)));
  const z = range.map(y => range.map(x => {
    const r2 = x*x + y*y;
    const psi = x * 2*y * Math.exp(-r2 / 2);
    return psi * psi;
  }));
  Plotly.newPlot('contourMap', [{
    type: 'contour', z, x: range, y: range,
    colorscale: 'Hot', ncontours: 20,
    contours: { coloring: 'heatmap' },
    colorbar: { title: '|ψ|²' }
  }], {
    title: '|ψ₂₁(x,y)|² — quantum harmonic oscillator',
    xaxis: {title: 'x / ℓ', scaleanchor: 'y'},
    yaxis: {title: 'y / ℓ'},
    margin: {l: 50, r: 20, t: 45, b: 50},
    paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
  }, {responsive: true, displayModeBar: false});
})();
</script>

## Fundamental Constants — Parallel Coordinates

Comparing six dimensionless physical constants across different unit systems (normalised):

<div id="parallelCoords" style="height:340px;"></div>

<script>
(function poll() {
  if (typeof Plotly === 'undefined') { setTimeout(poll, 50); return; }
  Plotly.newPlot('parallelCoords', [{
    type: 'parcoords',
    line: { color: [1, 2, 3, 4, 5], colorscale: 'Viridis' },
    dimensions: [
      { label: 'Fine-structure α',       values: [7.3, 7.3, 7.3, 7.3, 7.3],          range: [7.2, 7.4] },
      { label: 'Proton/electron mp/me',  values: [1836, 1836, 1836, 1836, 1836],      range: [1830, 1840] },
      { label: 'Cosmological Λ (norm)',  values: [0.68, 0.68, 0.68, 0.68, 0.68],     range: [0.5, 0.9] },
      { label: 'Strong coupling αs',     values: [0.118, 0.120, 0.116, 0.119, 0.118], range: [0.11, 0.13] },
      { label: 'Weinberg angle sin²θW',  values: [0.231, 0.232, 0.230, 0.233, 0.231], range: [0.22, 0.24] },
    ],
    labelangle: -20,
  }], {
    title: 'Fundamental constants (5 theoretical models, normalised)',
    margin: {l: 60, r: 30, t: 45, b: 30},
    paper_bgcolor: 'transparent',
  }, {responsive: true, displayModeBar: false});
})();
</script>

## Usage

```yaml
---
title: My Post With Plotly
plotly: true
---
```

Place a `<div id="myPlot" style="height:400px;">` container in your post, then call
`Plotly.newPlot('myPlot', data, layout, config)` inside a `<script>` block.
Use `{responsive: true}` in the config for proper resizing on all screen sizes.

Each script block should use the self-polling pattern to wait for Plotly to load:

```javascript
(function poll() {
  if (typeof Plotly === 'undefined') { setTimeout(poll, 50); return; }
  Plotly.newPlot('myPlot', data, layout, { responsive: true });
})();
```
