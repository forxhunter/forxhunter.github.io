---
title: Interactive Charts with Chart.js
date: 2025-04-15
description: Line charts, bar charts, radar charts, and doughnut charts driven by Chart.js — all from a single frontmatter flag.
tags: [charts, visualization, javascript]
categories: [demo]
toc: true
relatedPosts: true
chart_js: true
---

Enable [Chart.js](https://www.chartjs.org/) in any post with `chart_js: true` in your frontmatter.
The library is loaded from a CDN; your `<canvas>` elements are the only HTML needed.

## Citation Trend — Line Chart

Citations per decade for a landmark 1905 paper:

<canvas id="lineChart" height="120"></canvas>

<script>
(function poll() {
  if (typeof Chart === 'undefined') { setTimeout(poll, 50); return; }
  const ctx = document.getElementById('lineChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1910s', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
      datasets: [{
        label: 'Citations per decade',
        data: [12, 45, 130, 320, 880, 2100, 4800, 9200, 15400, 21000, 28500, 19200],
        borderColor: 'hsl(210 80% 55%)',
        backgroundColor: 'hsl(210 80% 55% / 0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Citations' } } }
    }
  });
})();
</script>

## Papers per Year — Bar Chart

Output by year across five research areas:

<canvas id="barChart" height="130"></canvas>

<script>
(function poll() {
  if (typeof Chart === 'undefined') { setTimeout(poll, 50); return; }
  const ctx = document.getElementById('barChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        { label: 'Quantum',     data: [42, 48, 61, 72, 89, 104], backgroundColor: 'hsl(210 75% 55% / 0.8)' },
        { label: 'Relativity',  data: [18, 22, 19, 25, 28, 31],  backgroundColor: 'hsl(150 65% 45% / 0.8)' },
        { label: 'Cosmology',   data: [33, 29, 41, 45, 52, 60],  backgroundColor: 'hsl(40 90% 55% / 0.8)' },
        { label: 'Particle',    data: [58, 61, 54, 70, 83, 91],  backgroundColor: 'hsl(0 70% 55% / 0.8)' },
        { label: 'Condensed',   data: [75, 82, 90, 95, 108, 120],backgroundColor: 'hsl(280 60% 55% / 0.8)' },
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { x: { stacked: false }, y: { beginAtZero: true, title: { display: true, text: 'Papers published' } } }
    }
  });
})();
</script>

## Journal Comparison — Radar Chart

Comparing five metrics across three top physics journals (fictionalised scores):

<canvas id="radarChart" height="160"></canvas>

<script>
(function poll() {
  if (typeof Chart === 'undefined') { setTimeout(poll, 50); return; }
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Impact Factor', 'Open Access', 'Review Speed', 'Reproducibility', 'Reach'],
      datasets: [
        {
          label: 'Physical Review Letters',
          data: [92, 40, 70, 85, 95],
          borderColor: 'hsl(210 80% 55%)',
          backgroundColor: 'hsl(210 80% 55% / 0.15)',
          pointBackgroundColor: 'hsl(210 80% 55%)',
        },
        {
          label: 'Nature Physics',
          data: [98, 55, 55, 80, 99],
          borderColor: 'hsl(0 70% 55%)',
          backgroundColor: 'hsl(0 70% 55% / 0.15)',
          pointBackgroundColor: 'hsl(0 70% 55%)',
        },
        {
          label: 'arXiv (preprint)',
          data: [0, 100, 100, 60, 88],
          borderColor: 'hsl(150 65% 45%)',
          backgroundColor: 'hsl(150 65% 45% / 0.15)',
          pointBackgroundColor: 'hsl(150 65% 45%)',
        },
      ]
    },
    options: {
      responsive: true,
      scales: { r: { min: 0, max: 100, ticks: { stepSize: 20 } } },
      plugins: { legend: { position: 'top' } }
    }
  });
})();
</script>

## Publication Types — Doughnut Chart

Distribution of output by venue type:

<canvas id="doughnutChart" height="160"></canvas>

<script>
(function poll() {
  if (typeof Chart === 'undefined') { setTimeout(poll, 50); return; }
  const ctx = document.getElementById('doughnutChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Journal Article', 'Conference Paper', 'Preprint', 'Book Chapter', 'Thesis'],
      datasets: [{
        data: [48, 22, 18, 8, 4],
        backgroundColor: [
          'hsl(210 75% 55% / 0.85)',
          'hsl(150 65% 45% / 0.85)',
          'hsl(40 90% 55% / 0.85)',
          'hsl(280 60% 55% / 0.85)',
          'hsl(0 70% 55% / 0.85)',
        ],
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right' },
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed}%` } }
      }
    }
  });
})();
</script>

## Usage

```yaml
---
title: My Post With Charts
chart_js: true
---
```

Then place a `<canvas id="myChart">` element where you want the chart, and add a `<script>` block
that calls `new Chart(...)` using the polling pattern to wait for Chart.js:

```javascript
(function poll() {
  if (typeof Chart === 'undefined') { setTimeout(poll, 50); return; }
  new Chart(document.getElementById('myChart'), { ... });
})();
```

Charts use HSL colour values so they adapt cleanly to both light and
dark themes when you set `backgroundColor` with an alpha channel.
