---
layout: post
title: Oral Presentation – MCB Retreat 2025
date: 2025-09-05 09:00:00 -0500
inline: false
related_posts: false
authors:
  - Tianyu Wu
location: Session 1 – MCB Retreat Auditorium
institution: University of Illinois at Urbana-Champaign
---

**Presentation**  
🕒 **9:00 AM – 9:15 AM**, **September 5, 2025**  
📍 **Heritage Hall, I Hotel & Conference Center**  
👤 **Tianyu Wu (Biophysics)**

---

Precise kinetic parameters are the currency of quantitative gene-regulatory models, yet conventional “bulk” fitting masks the idiosyncratic behaviour of individual promoters. We introduce a Gillespie-based parameter-fitting pipeline that deconvolves this heterogeneity by optimising each promoter within four mechanistically defined classes—unbound (UNB), transcription-factor-only (TFO), SAGA–Mediator–Tup1 (STM), and Rap1-dominated ribosomal-protein (RP) loci—directly against RNAPII dwell-time profiles obtained with high-resolution ChEC-seq2.

For UNB promoters, we impose near-zero occupancy of sequence-specific factors to benchmark basal noise; TFO promoters are constrained by peaks of general regulatory factors (e.g., Reb1/Abf1) plus a single activator such as Gcn4, isolating TF-driven control. STM loci require at least one SAGA core subunit (Spt7 or Ada2) and optionally Mediator Med1 or the Tup1–Cyc8 co-repressor, capturing co-activator-rich regulation. RP genes are distinguished by the canonical Rap1–Fhl1/Ifh1 module that orchestrates ribosome biogenesis.

An initial coarse- and fine-grid scan seeds a differential-evolution optimiser, refining eight kinetic rate constants per gene. This two-stage search reduces root-mean-square error three-fold relative to grid-only fitting while preserving class-specific kinetic fingerprints. The resulting promoter-resolved parameter set reveals how GRF insulation, co-activator loading, and Rap1 circuitry differentially sculpt initiation and pause-escape dynamics across the metabolic genome.

By delivering a compact, mechanistic input layer for next-generation whole-cell models, our approach bridges sequence-level regulation and systems-scale metabolism, laying the groundwork for predictive simulations of nutrient-responsive growth in _Saccharomyces cerevisiae_.
