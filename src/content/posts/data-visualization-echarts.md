---
title: Data Visualization with Apache ECharts
date: 2025-04-20
description: Heatmaps, treemaps, scatter plots, and stacked bars with ECharts — a powerful alternative to Chart.js.
tags: [charts, visualization, echarts]
categories: [demo]
toc: true
relatedPosts: true
echarts: true
---

[Apache ECharts](https://echarts.apache.org/) is a production-grade charting library with rich
interaction and animation support. Enable it per post with `echarts: true`.

## Citation Activity Heatmap

A GitHub-style calendar heatmap showing citation activity across two years (fictional data):

<div id="heatmapChart" style="height:180px;"></div>

<script>
(function poll() {
  if (typeof echarts === 'undefined') { setTimeout(poll, 50); return; }
  const el = document.getElementById('heatmapChart');
  if (!el) return;
  const chart = echarts.init(el, document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : undefined);

  // Generate ~720 days of data
  const data = [];
  const start = new Date('2023-01-01');
  for (let i = 0; i < 730; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const val = Math.floor(Math.random() * 15);
    data.push([`${y}-${m}-${day}`, val]);
  }

  chart.setOption({
    tooltip: { formatter: (p) => `${p.data[0]}: ${p.data[1]} citations` },
    visualMap: { min: 0, max: 14, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, show: false,
      inRange: { color: ['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'] } },
    calendar: [
      { range: '2023', top: 20, left: 30, right: 10, cellSize: ['auto', 14], dayLabel: { firstDay: 1 }, yearLabel: { show: true } },
      { range: '2024', top: 100, left: 30, right: 10, cellSize: ['auto', 14], dayLabel: { firstDay: 1 }, yearLabel: { show: true } },
    ],
    series: [
      { type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: 0, data: data.filter(d => d[0].startsWith('2023')) },
      { type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: 1, data: data.filter(d => d[0].startsWith('2024')) },
    ],
  });

  window.addEventListener('resize', () => chart.resize());
})();
</script>

## Physics Topics — Treemap

Research output by topic area (proportional to paper count):

<div id="treemapChart" style="height:320px;"></div>

<script>
(function poll() {
  if (typeof echarts === 'undefined') { setTimeout(poll, 50); return; }
  const el = document.getElementById('treemapChart');
  if (!el) return;
  const chart = echarts.init(el, document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : undefined);
  chart.setOption({
    tooltip: { formatter: '{b}: {c} papers' },
    series: [{
      type: 'treemap',
      data: [
        { name: 'Quantum Mechanics',   value: 284,
          children: [
            { name: 'Entanglement', value: 92 },
            { name: 'Decoherence',  value: 74 },
            { name: 'QFT',          value: 118 },
          ]
        },
        { name: 'Relativity',   value: 156,
          children: [
            { name: 'General',  value: 98 },
            { name: 'Special',  value: 58 },
          ]
        },
        { name: 'Condensed Matter', value: 330,
          children: [
            { name: 'Superconductors', value: 140 },
            { name: 'Topological',     value: 110 },
            { name: 'Magnetism',       value: 80 },
          ]
        },
        { name: 'Particle Physics', value: 212 },
        { name: 'Cosmology',        value: 178 },
        { name: 'Thermodynamics',   value: 96 },
      ],
      breadcrumb: { show: false },
      label: { show: true, formatter: '{b}\n{c}' },
    }]
  });
  window.addEventListener('resize', () => chart.resize());
})();
</script>

## Ohm's Law — Scatter Plot with Trend

Voltage (V) vs current (A) measurements showing $V = IR$ linearity:

<div id="scatterChart" style="height:300px;"></div>

<script>
(function poll() {
  if (typeof echarts === 'undefined') { setTimeout(poll, 50); return; }
  const el = document.getElementById('scatterChart');
  if (!el) return;
  const chart = echarts.init(el, document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : undefined);
  // R = 10 Ω; add noise
  const measured = Array.from({ length: 20 }, (_, i) => {
    const I = (i + 1) * 0.05;
    return [I, +(10 * I + (Math.random() - 0.5) * 0.08).toFixed(3)];
  });
  const ideal = [[0, 0], [1.05, 10.5]];
  chart.setOption({
    tooltip: { formatter: (p) => `I = ${p.data[0]} A, V = ${p.data[1]} V` },
    legend: { data: ['Measured', 'Ideal (R=10Ω)'] },
    xAxis: { type: 'value', name: 'Current (A)', nameLocation: 'end' },
    yAxis: { type: 'value', name: 'Voltage (V)', nameLocation: 'end' },
    series: [
      { name: 'Measured', type: 'scatter', data: measured, symbolSize: 8 },
      { name: 'Ideal (R=10Ω)', type: 'line', data: ideal, lineStyle: { type: 'dashed' }, symbol: 'none' },
    ],
  });
  window.addEventListener('resize', () => chart.resize());
})();
</script>

## Collaborator Contributions — Stacked Bar

Papers per collaborator across four years:

<div id="stackedBar" style="height:300px;"></div>

<script>
(function poll() {
  if (typeof echarts === 'undefined') { setTimeout(poll, 50); return; }
  const el = document.getElementById('stackedBar');
  if (!el) return;
  const chart = echarts.init(el, document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : undefined);
  const years = ['2021', '2022', '2023', '2024'];
  const collaborators = {
    'Podolsky': [3, 5, 4, 6],
    'Rosen':    [2, 2, 3, 4],
    'Bohr':     [5, 4, 6, 5],
    'Planck':   [1, 3, 2, 4],
    'Curie':    [4, 6, 7, 9],
  };
  chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: Object.keys(collaborators) },
    xAxis: { type: 'category', data: years },
    yAxis: { type: 'value', name: 'Papers' },
    series: Object.entries(collaborators).map(([name, data]) => ({
      name, type: 'bar', stack: 'total', data,
    })),
  });
  window.addEventListener('resize', () => chart.resize());
})();
</script>

## Usage

```yaml
---
title: My Post With ECharts
echarts: true
---
```

Initialize charts using the polling pattern to wait for ECharts to load:

```javascript
(function poll() {
  if (typeof echarts === 'undefined') { setTimeout(poll, 50); return; }
  const chart = echarts.init(document.getElementById('myChart'));
  chart.setOption(spec);
})();
```

Pass `'dark'` as the second argument to `echarts.init()` when the current theme is dark to get
automatic colour palette switching.
