---
title: Embedding Interactive Maps with Leaflet
date: 2025-05-15
description: OpenStreetMap-powered maps with markers, pop-ups, and polygons — all from a single frontmatter flag.
tags: [maps, visualization, leaflet]
categories: [demo]
toc: true
relatedPosts: true
map: true
---

The `map: true` flag loads [Leaflet](https://leafletjs.com/) plus the OpenStreetMap tile layer.
Place a `<div>` container and initialise a map inside a `<script>` block.

## Single Marker

The Bern Patent Office — where Einstein developed special relativity:

<div id="map1" style="height:260px; border-radius:8px; overflow:hidden;"></div>

<script>
(function poll() {
  if (typeof L === 'undefined') { setTimeout(poll, 50); return; }
  const m = L.map('map1').setView([46.9481, 7.4446], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(m);
  L.marker([46.9481, 7.4446])
    .addTo(m)
    .bindPopup('<b>Bern Patent Office</b><br>Where Einstein worked 1902–1909.')
    .openPopup();
})();
</script>

## World-Famous Physics Laboratories

Five iconic research facilities around the world — click each marker for details:

<div id="map2" style="height:360px; border-radius:8px; overflow:hidden;"></div>

<script>
(function poll() {
  if (typeof L === 'undefined') { setTimeout(poll, 50); return; }
  const m = L.map('map2').setView([30, 10], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(m);

  const labs = [
    { latlng: [46.2330, 6.0557],   name: 'CERN',                info: 'European Organization for Nuclear Research — home of the LHC.' },
    { latlng: [34.1377, -118.1253], name: 'Caltech',             info: 'California Institute of Technology — Millikan, Feynman, and more.' },
    { latlng: [42.3601, -71.0942], name: 'MIT',                  info: 'Massachusetts Institute of Technology — Radiation Lab, LNS.' },
    { latlng: [52.2097, 0.0894],   name: 'Cavendish Laboratory', info: 'University of Cambridge — birthplace of the electron and DNA structure.' },
    { latlng: [48.2617, 11.6710],  name: 'Max Planck Institute', info: 'MPG headquarters, Munich — 30+ Nobel laureates from affiliated institutes.' },
  ];

  labs.forEach(({ latlng, name, info }) => {
    L.marker(latlng).addTo(m).bindPopup(`<b>${name}</b><br>${info}`);
  });
})();
</script>

## Custom Icon — Pulsing Marker

A CSS-animated pulsing circle using `L.divIcon`:

<div id="map3" style="height:220px; border-radius:8px; overflow:hidden;"></div>

<style>
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0;   }
  }
  .pulse-icon {
    width: 16px; height: 16px;
    border-radius: 50%;
    background: hsl(210 80% 55%);
    position: relative;
  }
  .pulse-icon::before {
    content: '';
    position: absolute;
    inset: 0; border-radius: 50%;
    background: hsl(210 80% 55% / 0.5);
    animation: pulse-ring 1.5s ease-out infinite;
  }
</style>

<script>
(function poll() {
  if (typeof L === 'undefined') { setTimeout(poll, 50); return; }
  const m = L.map('map3').setView([51.1789, -1.8262], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(m);

  const icon = L.divIcon({
    html: '<div class="pulse-icon"></div>',
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
  L.marker([51.1789, -1.8262], { icon })
    .addTo(m)
    .bindPopup('<b>Stonehenge</b><br>Neolithic monument, ~3000 BC.');
})();
</script>

## Polygon Overlay

Outline the approximate location of the Antarctic Treaty Area:

<div id="map4" style="height:300px; border-radius:8px; overflow:hidden;"></div>

<script>
(function poll() {
  if (typeof L === 'undefined') { setTimeout(poll, 50); return; }
  const m = L.map('map4').setView([-75, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(m);

  const coords = [];
  for (let lng = -180; lng <= 180; lng += 10) coords.push([-60, lng]);
  for (let lng = 180; lng >= -180; lng -= 10) coords.push([-90, lng]);

  L.polygon(coords, {
    color: 'hsl(210 70% 55%)',
    fillColor: 'hsl(210 70% 70%)',
    fillOpacity: 0.25,
    weight: 2,
  }).addTo(m).bindPopup('<b>Antarctic Treaty Area</b><br>Area south of 60°S — governed by the 1959 Antarctic Treaty.');
})();
</script>

## Usage

```yaml
---
title: My Post With Maps
map: true
---
```

Create a `<div id="myMap" style="height:300px;">` container and initialise Leaflet using
the self-polling pattern to wait for the library to load:

```javascript
(function poll() {
  if (typeof L === 'undefined') { setTimeout(poll, 50); return; }
  const map = L.map('myMap').setView([lat, lng], zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);
})();
```

OpenStreetMap tiles are free and open. Add markers with `L.marker(latlng).addTo(map)` and
pop-ups with `.bindPopup('...')`.
