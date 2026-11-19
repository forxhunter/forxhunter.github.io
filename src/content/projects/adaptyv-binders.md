---
title: How do you pick twenty de novo binders when the confidence scores do not work?
description: One hundred de novo designs across the five challenges of the 2026 Anthropic × Adaptyv competition. Every threshold is read off a control, and the metrics that failed their own controls were dropped rather than trusted.
img: /assets/img/adaptyv/preview.png
img_alt: Five de novo designed binders, one per competition challenge
url: https://proteinbase.com/competitions/anthropic-adaptyv-2026
url_label: Competition
importance: 2
category: research
giscus_comments: true
---

## Project Overview

Five challenges, twenty de novo designs each, all zero-shot: no natural binder as a
starting point and no experimental feedback between rounds. Backbones from
RFdiffusion4 conditioned on the target alone, sequences from ProteinMPNN and ESM-IF1,
and every design re-measured through one code path before anything was submitted.

The problem running through all five is that the obvious way to choose designs does not
work. The standard practice is to rank candidates by a structure predictor's interface
confidence. On 380 Adaptyv-tested EGFR designs from the previous competition, with
2000-sample bootstrap intervals, ipTM separates binders from non-binders at AUC 0.636
[0.556, 0.716]. For medium-or-strong binding it reaches 0.568 [0.464, 0.671], an interval
that contains 0.5, and its top decile holds no more strong binders than a random decile.
Across 129 metrics the best AUC for strong binding was 0.707, from glycine content.

So the pipeline is built around a different question: for each gate, what does it do to a
control that is known to be wrong? Every structure-prediction threshold here is a
percentile of a scrambled-sequence null that went through the identical prediction path,
and a gate is applied only if designs clear it more often than the null does by a
one-sided Fisher exact test. Three gates failed that test and were dropped.

## The five challenges

Each clip below is a generation run on that challenge's target. RFdiffusion4 denoises a
chain of the submitted length from noise, one frame per step, and the finished complex
then turns once. The target is a grey surface, a presented peptide is blue, and the
designed chain is an orange cartoon whose colour comes up as the noise comes down. Early
frames are a tangle because that is what the model is holding at that point.

The design in each clip is not a submitted sequence. Twelve samples were generated per
target for these figures and the one shown was chosen the way the panels were chosen, on
how much of its interface lands on the site the generator was conditioned on. The
submitted panels, and the measurements they were selected by, are described under each
clip.

### Challenge 1 — EGFR domain III, pH-conditional and mouse cross-reactive

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    <video class="img-fluid rounded z-depth-1" autoplay loop muted playsinline
           poster="/assets/img/adaptyv/r1_egfr.png">
      <source src="/assets/video/adaptyv/r1_egfr.mp4" type="video/mp4">
    </video>
  </div>
</div>
<div class="caption">
  A 70-residue chain generated on EGFR domain III, one frame per denoising step, then a turn. The first frames are the sample the model is actually holding, which is a cloud of residues with no backbone, drawn as spheres until the chain closes to real bond lengths. This is sample 11 of twelve: 242 of its 301 heavy-atom contacts within 4.5 Å land on the epitope the generator was conditioned on, the highest of the batch. The submitted panel for this challenge is described below; it was built the same way, from a pool of 463.
</div>

Twenty designs, 70 to 214 residues, cysteine-free, from two pipelines whose candidate
pools share no sequence and no 20-mer. All 463 candidates were re-measured through one
code path, because interface metrics from two pipelines are not comparable across a
three-fold difference in binder length. Six gates clear 52 of the 463.

The pH switch is computed as Wyman–Tanford linkage over PROPKA3 pKa shifts on the
minimised complex, calibrated on ten reference complexes: four of five experimentally
pH-dependent ones score +0.76 to +3.12 kcal/mol and the five pH-independent ones at most
+0.38, which sets the threshold at +0.76. Mutating each design's named driver residue to
alanine drops the switch by a median 0.80 kcal/mol against 0.03 for a sham control, and
14 of the 20 localise to the group named. The rest are reported as distributed rather
than assigned a driver they do not have.

### Challenge 2 — TNF-α, binding at pH 7.4 and not at pH 6.0

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    <video class="img-fluid rounded z-depth-1" autoplay loop muted playsinline
           poster="/assets/img/adaptyv/r2_tnf.png">
      <source src="/assets/video/adaptyv/r2_tnf.mp4" type="video/mp4">
    </video>
  </div>
</div>
<div class="caption">
  A 70-residue chain generated in the receptor groove of the TNF-α trimer. Sample 4 of twelve, 252 of 254 contacts on the conditioned epitope. The three-helix bundle forms across two protomers, which is the site the submitted panel binds and the reason pose agreement in this challenge has to be minimised over the trimer’s symmetry.
</div>

The pH requirement is inverted from challenge 1, which asked for tighter binding in acid.
Twenty designs, 70 to 90 residues, also required to cross-react with mouse TNF-α.

The target is a homotrimer, and that turned out to matter for the measurement rather than
the design. Any comparison of two predicted poses has to be minimised over the three
chain assignments, because the protomers are interchangeable. Before that fix, two
predictions of the same pose could read 40 Å apart.

### Challenge 3 — GLP-1R, an agonist

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    <video class="img-fluid rounded z-depth-1" autoplay loop muted playsinline
           poster="/assets/img/adaptyv/r3_glp1r.png">
      <source src="/assets/video/adaptyv/r3_glp1r.mp4" type="video/mp4">
    </video>
  </div>
</div>
<div class="caption">
  A 69-residue chain generated against the GLP-1 receptor. The first nine residues are the GLP-1 peptide, held fixed, and the remaining sixty are designed around it, so the clip shows a scaffold growing onto a bound ligand rather than a free binder docking. Sample 11 of twelve, 620 of 661 contacts on the conditioned epitope.
</div>

A binder that does not activate the receptor scores nothing on the second objective, and
GLP-1R is a class B GPCR, where activation requires reproducing the N-terminal pharmacophore
geometry inside the transmembrane bundle. A molecule can have high affinity and no
activation. The designs are 30 to 89 residues and were ranked on six axes, with the
functional readout taken on the tagged construct because that is what the assay expresses.

### Challenge 4 — TfR1, pH-switchable and mouse cross-reactive

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    <video class="img-fluid rounded z-depth-1" autoplay loop muted playsinline
           poster="/assets/img/adaptyv/r4_tfr1.png">
      <source src="/assets/video/adaptyv/r4_tfr1.mp4" type="video/mp4">
    </video>
  </div>
</div>
<div class="caption">
  A 70-residue chain generated on the TfR1 apical domain. Round 4 gave the generator nine cut surface segments rather than the ectodomain, to keep the token count down; the whole receptor is drawn here, superposed back onto those segments over 212 paired Cα at 0.40 Å rmsd. The design makes 588 contacts with the surface it was shown and none at all with the receptor that was cut away, so this one did not bind an interface the cut invented. Sample 6 of twelve, 408 of 420 contacts on the conditioned epitope.
</div>

Nine of thirty-eight pooled candidates pass every gate. The other eleven slots were not
filled with the next-best scores, which would have submitted designs the method's own
gates reject and returned nothing about why. Each of the eleven instead fails exactly one
named gate, so the assay result measures that gate directly whichever way it comes out.
The rule was written down and timestamped before the second predictor's scores were read.

The arithmetic that shaped the panel: one ordinary surface histidine at the interface
buys a 3.6-fold pH ratio, 0.76 kcal/mol. A fittable KD at 7.4 with nothing detectable at
6.0 is roughly 50- to 1000-fold on this assay, so the switch needs four such histidines
monovalently, or two per arm bivalently.

### Challenge 5 — a KRAS G12D neoantigen, against the self peptide

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    <video class="img-fluid rounded z-depth-1" autoplay loop muted playsinline
           poster="/assets/img/adaptyv/r5_kras.png">
      <source src="/assets/video/adaptyv/r5_kras.mp4" type="video/mp4">
    </video>
  </div>
</div>
<div class="caption">
  An 85-residue chain generated on HLA-A*11:01 with β2-microglobulin, the KRAS G12D peptide in blue. Sample 4 of twelve, and the one case where selection was on the peptide rather than on an epitope patch: 59 of its 138 contacts are with the peptide itself. That share, 42.8 percent, is the quantity the whole challenge turns on, because a design that reads the MHC helices instead of the peptide cannot tell G12D from wild type.
</div>

The target peptide differs from the self peptide displayed by healthy cells at one
position. We first asked whether any confidence score can see a difference that small, and
calibrated four of them on the one molecule known to tell the two complexes apart: a T cell
receptor with 743 pM affinity for the mutant and 3.0 µM for the wild type. AlphaFold3's
interface confidence gave **0.470 for both**, identical to three decimal places across a
4000-fold difference in binding. The other three failed on the same control in their own
ways.

The two complexes do differ in something a predictor is not asked for. In the crystal
structures the free wild-type peptide follows a defined path through the groove while the
mutant is disordered at the mutated position, so a binder can be selected for a backbone
that physically cannot accommodate the wild-type path. That is a statement about
coordinates and holds whatever a confidence score says. Selection ran on that and two
related geometric mechanisms over 2,376 generated backbones.

## How it works

### 1. Backbone generation, conditioned on the target alone

RFdiffusion4 replaced RFdiffusion3 after a 50-backbone head-to-head at one epitope,
both scored by the same filter: RFdiffusion3 passed 0 of 30 across three arms, RFD4 passed
9 of 10 on its best arm. Epitope coverage decided it, 24 to 27 of 27 core residues against
8 to 14. RFD4 is also cheaper, 3,928 MiB at 346 tokens against roughly 9,300.

Each challenge runs five arms that differ only in their conditions, so the comparison
between arms is a measurement. The condition that decides whether a design can block is
the one marking the target surface more than 8 Å from the epitope as exposed. Without it a
generator finds the largest contiguous surface, which is the wrong one: on a TNF-family
trimer it is the flank, and on a two-domain receptor ectodomain it is the back of the beta
sandwich. Either produces a binder that does not block.

### 2. Shell cutting makes surface that is not there

Predicting a design against the whole receptor is often too large for one card, so the
target gets cut to a shell around the epitope. A 291-residue shell cut 12 Å around a TfR1
epitope leaves 86 residues with more than 0.15 more relative SASA than they have in the
whole dimer. The first designs spent 14 to 21% of their buried area on that invented
surface and made 48 to 72 target contacts, against 20 to 25 for a normal minibinder. A
design that binds invented surface cannot survive re-prediction against the whole
receptor, so every downstream job spent on it is wasted. Per-residue SASA is now compared
between shell and full assembly, and the invented surface is gated at the backbone stage.

### 3. The thresholds come from scrambled controls

Every design gets a length-matched, composition-matched scrambled sequence that runs the
identical prediction path. Thresholds are the 95th percentile of that null. A gate is then
armed only if designs clear it more often than the null at one-sided Fisher p &lt; 0.05 and
its AUC exceeds 0.5. The AUC condition is not redundant: on one target a blocking gate
reached p = 0.037 on 19 of 169 designs against 9 of 169 scrambles while the statistic as a
whole ran backwards, putting a scrambled sequence on the epitope 44% of the time against
28% for a design, AUC 0.431. A statistic that ranks scrambles above designs is not
evidence for the designs, whatever one tail of it does.

### 4. A second predictor, where it earns its place

A second structure predictor catches systematic error that more seeds of the first cannot.
It is held to the same standard as everything else, and on one target it was disarmed by
its own control. Cross-model agreement is measured as the RMSD between the two predicted
placements in a common target frame. An earlier version subtracted each model's distance
to the designed pose, which is a lower bound and reads zero when the two predictions sit
on opposite sides of the design; it scored a 40.8 Å disagreement as 0.19 Å.

### 5. Things that are part of the molecule

The assay expresses the design with a 64-residue C-terminal tag, so the tag is modelled.
On the pH-switch challenges it moves the answer: the linker decides how much, it reorders
the panel, and C-terminal clearance does not predict it. The designed interface runs to
the C-terminus in all three pH panels, which makes a C-terminal Fc a redesign rather than
a tag choice and settles the expression system by structure.

Generators emit side chains along with the backbone, and those side chains are replaced
when the sequence is designed. A selectivity measurement that counts them describes a
molecule nobody will make; restricting every readout to main chain plus CB dropped one
panel's carboxylate contacts from 7 to 1.

## The panels

|             | target          | objectives                                       | designs | length | novelty |
| ----------- | --------------- | ------------------------------------------------ | ------- | ------ | ------- |
| Challenge 1 | EGFR domain III | pH-conditional, mouse cross-reactive, affinity   | 20      | 70–214 | 3–4     |
| Challenge 2 | TNF-α trimer    | pH-conditional, mouse cross-reactive, affinity   | 20      | 70–90  | —       |
| Challenge 3 | GLP-1R          | receptor activation, affinity                    | 20      | 30–89  | 3–4     |
| Challenge 4 | TfR1 ectodomain | pH selectivity, mouse cross-reactivity, affinity | 20      | 55–96  | 3–4     |
| Challenge 5 | KRAS G12D pMHC  | mutant-over-wild-type selectivity, affinity      | 20      | 65–120 | 3–4     |

Novelty is a hard floor, not a ranking term: level 3 or above, judged on the ESMFold model
of each sequence against the PDB, prior competition entries and published minibinder sets.
Every panel is cysteine-free, and no submitted sequence starts with methionine because the
platform prepends one.

## Known Limitations

- No experimental result has come back yet. Everything above is a statement about what was
  measured in silico and about which measurements survived their own controls.
- Thermostability has no proxy in this campaign beyond ESMFold pLDDT and self-consistency
  RMSD, and non-specific binding outside one challenge has only sequence-level evidence:
  net charge, hydrophobic patch length and glycosylation sequons. No off-target structure
  screen was run.
- The ranking weights for two challenges are inferred. The pages publish an objective
  order and no numeric table, so the submitted order rests on an inference, and a sweep
  over the weights measures how much of the order depends on it.
- The self-consistency floor, ESMFold RMSD ≤ 2.0 Å and pLDDT ≥ 80, rejects about 97% of
  designed sequences on some targets. It is a compute budget inherited from an earlier
  round rather than a threshold calibrated against anything.
- All structural evidence is predicted. There is no experimental structure of any design.

## Notes

The same codebase is now running two further challenges, TL1A and the prolactin receptor,
for a second competition on the same targets. Figures on this page are rendered from the
deposited model files with PyMOL; the submitted sequence was matched against the chain in
each file, so the coloured molecule is the one that was submitted and not an earlier
variant.
