---
title: 'Quantum Field Theory Simulations'
description: 'Numerical lattice simulations of quantum field interactions — demonstrating all project card fields including img_alt, category, GitHub stars, and external URL.'
img: /assets/img/3.jpg
img_alt: Quantum field visualization showing particle interactions on a lattice
importance: 20
category: simulation
github: withastro/astro
github_stars: withastro/astro
url: https://astro.build
---

This project demonstrates all available project card fields:

- **`img`** — thumbnail image path (`/assets/img/3.jpg`)
- **`img_alt`** — descriptive alt text for the thumbnail (`img_alt` above)
- **`category`** — badge label shown on the card (`simulation`)
- **`github`** — links the GitHub icon to the repository
- **`github_stars`** — enables live star count fetching from the GitHub API
- **`url`** — links the project title to an external URL
- **`importance`** — controls card order (lower = appears first)

## About This Project

Lattice QFT simulations discretise spacetime into a finite grid and evaluate path integrals
numerically via Monte Carlo sampling. This approach is used to calculate hadron masses,
quark–gluon plasma properties, and the QCD phase diagram from first principles.

Key techniques used in this codebase:

1. **HMC (Hybrid Monte Carlo)** — combines molecular dynamics and Metropolis–Hastings
2. **Domain wall fermions** — exact chiral symmetry at finite lattice spacing
3. **Multigrid solvers** — accelerated inversion of the Dirac operator

Results are validated against perturbative QCD predictions in the weak-coupling regime.
