---
layout: post
title: Platform Talk and Session Co-Chair – Systems Biophysics at BPS2026
date: 2026-02-22 10:00:00 -0800
inline: false
related_posts: false
authors:
  - Tianyu Wu
  - Marie-Christin Spindler
  - Abner Apsley
  - Henry Li
  - Zane R. Thornburg
  - Julia Mahamid
  - Zaida Luthey-Schulten
conference: Biophysical Society 70th Annual Meeting (BPS2026)
location: Moscone Center, San Francisco, CA
journal: Biophysical Journal
doi: https://doi.org/10.1016/j.bpj.2025.11.287
---

**Platform Presentation & Session Co-Chair** 🎤  
📅 **February 22, 2026**  
🏛️ **Biophysical Society 70th Annual Meeting (BPS2026)**  
📍 **Moscone Center, San Francisco, CA**  
🪑 **Systems Biophysics Platform** — co-chaired with **Prof. Shankar Mukherji** (Washington University in St. Louis)  
👥 **Tianyu Wu**, **Marie-Christin Spindler**, **Abner Apsley**, **Henry Li**, **Zane R. Thornburg**, **Julia Mahamid**, **Zaida Luthey-Schulten**

---

{% include figure.liquid loading="eager" path="assets/img/news/BPS2026_pre.jpg" title="BPS2026 Systems Biophysics platform talk" class="img-fluid rounded z-depth-1" caption="Opening the talk at the Systems Biophysics platform session, BPS2026, Moscone Center, San Francisco." %}

I had the distinct honor of co-chairing the **Systems Biophysics platform** with **Professor Shankar Mukherji** (Washington University in St. Louis) and presenting our latest work in the same session. Helping run a session at this level — and sharing the stage with people pushing on how we model complex biological systems — was a privilege.

## The talk

**_Why do we need to incorporate cellular structures in cell simulation? Insights from spatially embedded simulation of the yeast galactose switch_**

We presented 4D simulations of the galactose switch in _Saccharomyces cerevisiae_ built on a hybrid framework that couples **reaction–diffusion master equations (RDME)** for genetic information processing with **ordinary differential equations (ODEs)** for a simplified metabolism, running on the GPU-based **Lattice Microbes** platform.

**What the geometry buys you:**

- Cell geometry is reconstructed from **cryo-electron tomograms (cryo-ET)**, so cytosolic and ER-associated ribosomes can be counted and placed separately
- That separation gives realistic ribosome availability for ER-associated translation of membrane-destined proteins such as the galactose transporter **Gal2**
- **11 mM** extracellular galactose triggers expression of **10,000–15,000** transporters within **60 minutes**
- The maze-like ER slows Gal2 delivery to the membrane — an effect that a well-mixed model cannot produce
- Multi-GPU solver performance was benchmarked across several spatial decompositions

The through-line: cellular geography is not decoration. It changes how genetic information is processed and how quickly a cell can commit to a new carbon source.

## Citation

> Wu, T., Spindler, M.-C., Apsley, A., Li, H., Thornburg, Z. R., Mahamid, J., & Luthey-Schulten, Z. (2026). Spatial heterogeneity alters the dynamics of the yeast galactose switch: Insights from 4D RDME–ODE hybrid simulations. _Biophysical Journal_, _125_(4), 15a. [https://doi.org/10.1016/j.bpj.2025.11.287](https://doi.org/10.1016/j.bpj.2025.11.287)

📄 **[Read the abstract in Biophysical Journal](https://www.cell.com/biophysj/fulltext/S0006-3495%2825%2901037-9)**

---

Thanks to the organizers, and to everyone who stopped by with questions or caught me in the hallway afterwards. The community is what makes **#BPS2026** worth the trip — looking forward to seeing where these conversations go.
