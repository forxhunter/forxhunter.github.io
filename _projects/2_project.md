---
layout: page
title: What must a host and its engineered endosymbiont exchange?
description: A genome-scale model of synthetic yeast–cyanobacteria endosymbiosis resolves the host's energetic dependence and the direction of interface carbon
img: assets/img/project2.png
importance: 2
category: research
related_publications: true
giscus_comments: true
---

# Project Overview

A photosynthetic bacterium living inside a eukaryotic cell is the origin story of the chloroplast, and it has now been built in the laboratory: *Synechococcus elongatus* growing inside a respiration-deficient *Saccharomyces cerevisiae* host. What limits the design of such a chimera is not the genetics but the bookkeeping — nobody can say what the two partners must actually trade.

In this project I fuse genome-scale reconstructions of yeast (yeast-GEM) and *S. elongatus* (iJB792) into a single compartmentalised model of the experimentally realised chimera, coupled so that host and symbiont are forced to grow at the same rate and connected by an explicit transport interface. Every exchange flux is reported as a **bound from both sides** rather than as a single optimum, because a genome-scale optimum is one point in a large solution space and reporting it alone overstates what the model knows.

{% include figure.liquid loading="eager" path="assets/img/project2.png" title="Synthetic yeast-cyanobacteria endosymbiosis" class="img-fluid rounded z-depth-1" caption="The modelled chimera: <i>Synechococcus elongatus</i> enclosed in a respiration-deficient <i>Saccharomyces cerevisiae</i> host, with the interface fluxes the model has to balance." %}

# Research Goals

Build one model in which a yeast cell and its enclosed cyanobacterium share a growth rate, a medium, and a defined set of transported metabolites.

Identify the quantity the host is actually selected on, and state what the symbiont must supply to meet it.

Determine the direction, magnitude and chemical form of carbon crossing the interface.

Test the model against data it was never fitted to, and report the result whichever way it comes out.

# Key Findings

## 1. The host's dependence is membrane-potential maintenance, not bulk ATP

The host alone is **infeasible** in the model, matching a strain that is not viable on its own. Its requirement resolves to maintaining the mitochondrial membrane potential by running F₁F₀ in reverse at the enzyme's own 10/3 H⁺/ATP stoichiometry — a demand of **3.54 mmol ATP gDW⁻¹ h⁻¹**, set as a proton flux so the ATP cost follows rather than being fitted. Two translocase capacities reproduce two measured growth rates (0.0320 and 0.0683 h⁻¹ against 0.032 and 0.0639 measured). Two parameters against two rates is zero degrees of freedom: this is a **calibration, not a validation**, and the thermodynamic window it implies closes near 91 mV, so the mechanism predicts a *partial* membrane potential that still needs experimental checking.

## 2. Net interface carbon runs host → symbiont, and carries no photosynthate

Bounded from both sides, net carbon transfer is **1.389–1.443 mmol C gDW⁻¹ h⁻¹ from the host into the symbiont** under selection. The host supplies the inorganic carbon its enclosed autotroph cannot reach in the medium (bicarbonate inward, −2.49) and the symbiont returns assimilated carbon as an amino acid (methionine, +1.20). Notably, the interface contains **no triose phosphate, no 3-PGA and no sugar transporter** — the route by which fixed carbon would ordinarily reach a host is simply absent from this chimera. An earlier version of this analysis had the sign reversed; the error was invisible in the totals because it flipped every term at once.

## 3. The mechanism is conditional on a dry-mass ratio nobody has measured

A transport reaction delivering one mmol per gDW of symbiont to one gDW of host preserves units only if the two dry masses are equal. Made explicit, the energetic mechanism **requires the symbiont to be at least ~33% of chimera dry weight**, while a yeast cell carrying a few *S. elongatus* cells sits nearer 2–17%. The supply ceiling scales linearly with light, so light uptake and mass ratio trade off directly: the calibration fixed one and silently assumed the other. The claim is stated conditionally, and the measurement that settles it — the symbiont:host dry-mass ratio — is countable from micrographs already published for this system.


## 4. Forty-eight genes lose essentiality inside the host — after two artefacts are removed

An earlier count of 130 did not survive scrutiny. Two independent faults had to be fixed: a biomass component whose own demand falls below the solver's feasibility tolerance escapes the essentiality test at any growth rate (all 18 original host calls were of this kind), and the two sides of the comparison had never been run on the same medium. Screened on matched media with an added producibility test, **48 genes shift — 47 symbiont, 1 host** — of which **33 are established** and 15 concern a vitamin B₁₂ pathway that is not producible in the chimera at all and is therefore untested rather than shifted. Two mechanisms are traced: biotin is medium biotin in transit, thiamine is genuine host-synthesis buffering.


## 5. Held out against new data, the model is honestly worse than a two-parameter curve

A new 48 h DCMU dose–response assay on the chimera is treated as **external validation and never fitted to**. With the inhibition constant taken from an independent published series, the prediction lands at **17.3 percentage points RMSE** on six held-out points, against 49.4 for the null — but the residuals are all positive, so the reconstruction **retains too much growth under inhibition**, and empirical curves fitted to those same points do better (8.0–8.4 pp) while containing no biology. Six unreplicated endpoints cannot separate a genome-scale mechanism from a two-parameter fit, and the two available experiments disagree with each other by a factor of 2.3 in the fitted constant. All of this is reported rather than smoothed over.

## 6. A published phenotype is provably out of reach of this model class

For a three-gene knockout series, the model reproduces 2 of 3 phenotypes and then stops — the double and triple mutant are shown by a **feasibility certificate to have exactly equal growth**, because the third deletion only adds constraints that an optimal solution already satisfies at zero flux. So the failure is a structural property of steady-state stoichiometric models, not a calibration that needs more tuning. What survives the exclusions must be time-dependent, conditional on the upstream lesion, and non-convex; the single highest-value experiment to distinguish the remaining candidates is colony-forming efficiency per cell for the double mutant. The mechanism is not claimed — the mechanism *space* is constrained, which is the reportable result.
