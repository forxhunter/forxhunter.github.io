---
layout: page
title: Can a metabolic network be drawn the way a curator would draw it?
description: MetaCarto 2 draws any genome-scale model as publication-quality Escher maps, deterministically, with no hand editing. All 108 BiGG models are already drawn and browsable.
img: assets/img/project3.png
og_image: https://forxhunter.github.io/assets/img/metacarto/social_preview.png
importance: 3
category: research
github: https://github.com/forxhunter/MetaCarto
giscus_comments: true
---

<p>
  <a class="btn btn-sm z-depth-0" role="button" href="https://doi.org/10.64898/2026.09.19.752882" target="_blank" rel="noopener noreferrer">Preprint</a>
  <a class="btn btn-sm z-depth-0" role="button" href="https://forxhunter.github.io/escher/" target="_blank" rel="noopener noreferrer">Open the viewer</a>
  <a class="btn btn-sm z-depth-0" role="button" href="https://github.com/forxhunter/MetaCarto" target="_blank" rel="noopener noreferrer">Code</a>
  <a class="btn btn-sm z-depth-0" role="button" href="https://github.com/forxhunter/Awesome_visualization_Metabolic_Network" target="_blank" rel="noopener noreferrer">Map collection</a>
  <a class="btn btn-sm z-depth-0" role="button" href="https://github.com/forxhunter/MetaCarto/releases/tag/v2.0.0" target="_blank" rel="noopener noreferrer">Release v2.0.0</a>
</p>

# Project Overview

Genome-scale metabolic models are routinely solved and almost never drawn. A force-directed layout of a few thousand reactions returns a hairball: every cofactor is a hub, every hub drags its neighbours together, and the pathway structure a biochemist would recognise disappears. Curators therefore draw maps by hand, which is why so few exist.

**[MetaCarto](https://github.com/forxhunter/MetaCarto)** reads a genome-scale model and lays it out the way a curator would. Linear pathways become straight backbones, cycles become rings and cofactors are pushed out as side branches. The output is schema-correct [Escher](https://escher.github.io) JSON, with an SVG of every map. The layout is **constructive and deterministic**: no annealing, no random seed, no hand editing, and the same model always produces the same map.

{% include figure.liquid loading="eager" path="assets/img/metacarto/e_coli_core_canvas.svg" title="e_coli_core on one canvas, drawn by MetaCarto 2" class="img-fluid rounded z-depth-1" zoomable=true caption="All of <i>E. coli</i> core on one canvas, exactly as published, with no hand editing. Glycolysis is one straight vertical backbone, the TCA cycle is a ring with glutamate metabolism off 2-oxoglutarate, and transport and exchange sit along the bottom. Each KEGG superclass is one captioned region. Click to zoom." %}

# What MetaCarto 2 adds

[MetaCarto 2](https://github.com/forxhunter/MetaCarto/releases/tag/v2.0.0) is the current release. [MetaCarto 1](https://github.com/forxhunter/MetaCarto/releases/tag/v1.0.0), the version described in the [bioRxiv preprint](https://doi.org/10.64898/2026.09.19.752882), is frozen, and its 2,621 maps stay where they were published so existing links keep working.

- **A whole model on one canvas.** Each pathway keeps the drawing it has on its own map, and pathways are packed by the shape their ink actually covers rather than their bounding box. Central carbon sits in the middle, every other superclass grows around it as one region, and transport and exchange wrap the outside like a membrane.
- **Nothing drawn on anything else.** No map in the collection has text on a node, on an edge or on other text. A label that does not fit is moved further out. It is never hidden and never overlapped.
- **Any model, not only BiGG.** Compounds and cofactors are recognised from the model's own chemistry and cross-references, not from BiGG's id spelling. Human-GEM, Yeast-GEM and ModelSEED models all run end to end, from SBML, JSON, YAML or MATLAB.
- **99.9% of reactions drawn**, up from 95.6% in MetaCarto 1.
- **Draw your own map.** Select by pathway, KEGG superclass, reaction, keyword, or everything within _N_ steps of a metabolite. You get the same engine and the same quality gates.
- **An editor built for automatic maps.** The [Escher fork](https://forxhunter.github.io/escher/) can drag a reaction as a whole and select a whole pathway by double-clicking its caption. Labels stay clear of nodes as you move them.

{% include figure.liquid loading="lazy" path="assets/img/metacarto/central_carbon.png" title="Central carbon metabolism, close up" class="img-fluid rounded z-depth-1" zoomable=true caption="Close-up of the canvas above. Every reaction contributes one main edge between the pair of compounds that share the most molecular skeleton. ATP, NAD(H), CoA and the rest fan off as grey side branches, both members of a pair on the same side." %}

# How It Works

## 1. Primary-compound reduction

A reaction such as `pyruvate + CoA + NAD⁺ → acetyl-CoA + CO₂ + NADH` contributes **one** directed edge, between the substrate/product pair sharing the most molecular skeleton. Here that pair is pyruvate → acetyl-CoA. Everything else becomes a side branch. Without this reduction each reaction node has degree 4–8 and no clean orthogonal drawing exists, which is precisely why naive layouts hairball.

Cofactor-ness is applied as a **tier, not a score penalty**: a cofactor is never chosen while a non-cofactor alternative exists on its side. That is what stops CoA → acetyl-CoA, which shares 21 carbons, from beating pyruvate → acetyl-CoA.

## 2. Direction from flux

Reconstructions store reversible reactions in whichever direction the curator happened to write them, so glycolysis is often recorded partly backwards. Parsimonious FBA decides the drawn direction wherever a reaction carries flux, and antiparallel pairs are collapsed onto a single axis.

## 3. Cycles drawn as cycles

Rings are detected on the whole-model graph, contracted for layering, then expanded onto a circle. The circle is rotated so its entry arc faces the pathway feeding it.

## 4. Layered placement

Greedy feedback-arc-set, layer assignment, cluster-constrained crossing reduction, then **Brandes–Köpf** coordinate assignment. That last step is what produces straight vertical backbones; a barycentre assignment does not.

## 5. Packing a species onto one page

The canvas is planned on each pathway's rasterised ink. Pathways cannot overlap, because placement tests collision on a grid with clearance. Small and mid-size models are packed several deterministic ways, and the tightest packing wins only if regions stay as cohesive and linked pathways stay as close as in the default.

{% include figure.liquid loading="lazy" path="assets/img/metacarto/recon3d_canvas.png" title="Recon3D on one canvas" class="img-fluid rounded z-depth-1" zoomable=true caption="Recon3D, the human reconstruction: 10,592 of its 10,600 reactions on one page. At this size it is texture, not a figure. <a href='https://github.com/forxhunter/MetaCarto/blob/main/docs/figures/v2_Recon3D_Canvas.svg' target='_blank' rel='noopener noreferrer'>Open the 19 MB SVG</a> and zoom in, or load it in the viewer." %}

# The Generated Collection

Every model in the [BiGG database](http://bigg.ucsd.edu/) is drawn and published under CC BY 4.0, as Escher JSON and SVG, at [Awesome_visualization_Metabolic_Network](https://github.com/forxhunter/Awesome_visualization_Metabolic_Network).

|                                       | all 108 BiGG models                    |
| ------------------------------------- | -------------------------------------- |
| reactions drawn                       | 251,140 of 251,424 (99.9%), none twice |
| pathway maps / whole-model canvases   | 2,764 / 108                            |
| text on a node, an edge or other text | 0, in every map and canvas             |
| pathways overlapping on a canvas      | 0                                      |
| segments axis-aligned, median map     | 0.985                                  |
| crossings per edge, median map        | 0.070                                  |

**[Browse them in the viewer](https://forxhunter.github.io/escher/)**. It opens on the `e_coli_core` canvas, and _Map ▸ Load map from library…_ reads the whole collection directly, with nothing to download.

Reactions are assigned to maps from the model's own `subsystem` annotation, then from KEGG pathways, and only failing both from network structure. Maps are named after the metabolic function they cover, following KEGG BRITE top-level categories.

# Try It

```bash
git clone --recurse-submodules https://github.com/forxhunter/MetaCarto.git

# one map per pathway, plus the whole model on one canvas
python layout_v2.py --model e_coli_core --group-function --canvas --preview

# your own model, from any format COBRApy reads
python layout_v2.py --model path/to/yeast-GEM.xml --group-function --canvas

# your own selection
python diy_map.py --model iML1515 --metabolite glu__L --radius 1 --no-boundary
python diy_map.py --model Recon3D --reaction PGI,PFK,FBA --connect 3
```

Every map is scored against explicit gates: orthogonality, crossings, node separation, label collisions, density and print legibility. `--strict` exits non-zero if a map breaks one.

# Known Limitations

- 284 of 251,424 BiGG reactions have no drawable primary pair and are omitted.
- Large merged pages of around 120 reactions still cross themselves. One page in ten has more than 0.4 crossings per edge.
- About four reactions in a hundred still have an edge passing through a metabolite they have nothing to do with. Reactions that share nothing should never touch, so this is the next thing to fix.
- Whole-model canvases are for zooming, not printing. At 10,600 reactions a page, labels land well under a point however well the page is packed. The per-pathway maps are the printable artifact.
- Compartments are not drawn as envelopes, because the Escher schema has no region primitive.

# Cite

MetaCarto and its maps are CC BY 4.0, so attribution is a term of the licence. If you use MetaCarto or a map it generated in a paper, figure, talk, poster, database or derived software, please cite the preprint:

> Wu, T. (2026). MetaCarto: biologically faithful automatic layout for genome-scale metabolic maps. _bioRxiv_. [https://doi.org/10.64898/2026.09.19.752882](https://doi.org/10.64898/2026.09.19.752882)

```bibtex
@article{wu_metacarto_2026,
  author  = {Wu, Tianyu},
  title   = {{MetaCarto}: biologically faithful automatic layout for genome-scale metabolic maps},
  journal = {bioRxiv},
  year    = {2026},
  doi     = {10.64898/2026.09.19.752882}
}
```

and, if you used MetaCarto 2 specifically, the software as well:

```bibtex
@software{Wu_MetaCarto_constructive_layout,
  author  = {Wu, Tianyu},
  license = {CC-BY-4.0},
  title   = {{MetaCarto: constructive layout synthesis for genome-scale metabolic networks}},
  url     = {https://github.com/forxhunter/MetaCarto}
}
```

Please also cite the underlying model from [BiGG Models](http://bigg.ucsd.edu/) and, where maps are displayed, [Escher](https://doi.org/10.1371/journal.pcbi.1004321).
