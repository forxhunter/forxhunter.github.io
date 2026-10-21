---
layout: post
title: "Can a virtual cell predict a pathway it has never seen switch on?"
date: 2026-10-21 12:00:00
description: A pilot on 24,562 human blood cells asks what expression data, mechanistic knowledge and a handful of experiments each contribute to predicting an interferon response a model has never observed.
tags: virtual-cell single-cell perturbation
categories: research
featured: true
giscus_comments: true
og_image: https://forxhunter.github.io/assets/img/silent-pathway/social_preview.png
---

{% include silent-pathway/style.liquid %}

A virtual cell should tell us what a cell will do when we change its environment. Most virtual-cell models, however, learn from observational atlases: large collections of cells measured under conditions that have already occurred. Their central challenge is to predict what happens under a condition absent from training.

This raises a basic question. **If a pathway has never been activated in the training data, what can a model actually know about its response?**

We tested this with 24,562 human blood cells and a familiar stimulus, interferon-β (IFN-β). The answer separates three sources of information. **Resting cells contain traces of the pathway's activity. Mechanistic knowledge identifies which trace is relevant to IFN-β. A small number of stimulated cells calibrate how strongly the pathway responds.**

That separation matters. Without stimulated cells, a pathway-informed model could rank responsive genes and recover the direction of change, but we found no reliable way to infer response magnitude. With just one stimulated cell, the strongest predictors used a mechanistic prior; as more stimulated cells became available, its advantage disappeared. And the usual benchmark on absolute expression obscured the distinction: predicting no response at all already achieved an R² of 0.70.

{% include silent-pathway/schematic.liquid %}

**Figure 1. Three sources of information for an unseen response.** (a) In resting blood cells, the IFNAR–JAK–STAT pathway has low basal activity. IFN-β activates a response that is never supplied during zero-shot training. (b) The hypothesis: observational data reveal directions of natural variation; a mechanistic prior identifies the direction relevant to IFN-β; stimulated cells determine the response's magnitude. (c) In few-shot experiments, stimulated cells from four donors are revealed in increasing numbers. Four other donors contribute control cells for prediction, while their stimulated cells are reserved for evaluation. The roles swap in the second fold.
{: .sp-caption}

## Why learning a cell state may be insufficient

The implicit hope behind many atlas-trained models is that a sufficiently accurate representation of cell states will support predictions under new interventions. Yet different regulatory mechanisms can produce the same cells at rest and respond differently when stimulated.

Formally, two mechanisms could agree on every condition observed during training and disagree on a new stimulus:

$$
P_{F_1}(x \mid u,c)=P_{F_2}(x \mid u,c)\quad\text{for observed }(u,c),
\qquad
P_{F_1}(x \mid u^*,c)\ne P_{F_2}(x \mid u^*,c).
$$

Here, $u$ is a condition, $c$ is cell context, and $u^*$ is the unseen stimulus. If both mechanisms explain the observations equally well, observational data alone cannot distinguish their counterfactual predictions. More cells sampled under the same conditions may refine the representation, but they cannot resolve that ambiguity without additional assumptions or information.

This concern is becoming measurable. In a recent benchmark, [Tiwari et al. (2026)](https://doi.org/10.64898/2026.10.16.759604) held out functionally distinct genetic perturbations and found substantial losses outside the training distribution. Complex architectures and foundation-model embeddings did not consistently outperform strong simple baselines. We therefore asked a narrower question: **can prior knowledge of a signalling pathway supply information missing from a resting-cell atlas, and how many intervention measurements are needed before that advantage fades?**

IFN-β provides a tractable test. It acts through IFNAR, JAK1/TYK2, STAT1/STAT2/IRF9 and interferon-stimulated response elements (ISREs), leading to expression of interferon-stimulated genes (ISGs). The mechanism is well studied, but we can withhold every IFN-β-stimulated cell from model training. “Unseen” here means **unseen by the model**, not unknown to biology.

## The experiment: separate target, direction and magnitude

We used the paired control and six-hour IFN-β conditions from [Kang et al. (2018)](https://doi.org/10.1038/nbt.4042), spanning eight donors and seven analysable blood-cell types. Our prediction target was the response in each donor and cell type:

$$
\Delta_g=\overline{x}_{g,\mathrm{stimulated}}-\overline{x}_{g,\mathrm{control}}.
$$

This distinction is essential. A model that reproduces the resting expression of thousands of unchanged genes can look accurate while missing the intervention entirely. Predicting $\Delta$ asks whether it has learned the change itself.

We tested two regimes. In the **zero-shot regime**, no stimulated cells were revealed. We measured whether resting-cell features or external knowledge could identify responsive genes, recover their direction, and estimate their magnitude. In the **few-shot regime**, we revealed between one and roughly 6,000 stimulated cells from four donors and predicted responses in four held-out donors, repeating with the donor groups exchanged.

The external knowledge came from curated IFN gene sets, the CollecTRI STAT1/STAT2/IRF9 regulon, and the PROGENy JAK–STAT footprint. We also tested a more direct sequence prior: genes with at least two ISRE-like motifs in their upstream promoter DNA. Hypoxia and TNFα–NF-κB gene sets, random sets, and a composition-matched control motif supplied specificity controls. These comparisons let us ask what mechanism contributes beyond generic regularization or prior gene-set membership.

## 1. Resting cells contain a trace of the future response

**Can the resting state reveal which genes will respond?** We ranked all 13,306 expressed genes without showing the models an IFN-β-stimulated cell (Fig. 2a). Identifying the 100 strongest responders in each cell type is a difficult task: random ranking has an area under the precision–recall curve (AUPRC) of 0.0075.

Resting expression, variability, donor-to-donor variability and principal-component loadings achieved AUPRCs of approximately 0.08–0.10. These signals are useful, but largely reflect the fact that already-expressed genes have more room to move on the log-expression scale. Curated interferon gene sets scored 0.10 alone and 0.22 after ranking their members by resting expression. The PROGENy JAK–STAT footprint reached **0.38, about 51 times chance**. A separate, easier comparison that allowed IFN-β responses from other cell types reached 0.73; this is context transfer, not prediction of an unseen stimulus.

The promoter sequence also carried information. Among the strongest responders, 18% had at least two ISRE motifs in the upstream kilobase, compared with 2.1% for a composition-matched motif. The ISRE prior was weak as a complete genome-wide ranking—AUPRC 0.022, about three times chance—but its signal did not require measuring the stimulus in this dataset.

**A standard feature-selection step can hide the response before modelling begins.** Only 37% of the genome-wide top 100 responding genes appeared among the 2,000 highly variable genes selected from resting cells (Fig. 2b). The interferon priors covered 64%. A model restricted to those control-selected variable genes cannot recover changes in genes it never represents.

Finding likely targets, however, does not establish how far they will move. PROGENy's response signs agreed with its genes among the strongest responders, but the same prior weights required markedly different scales across cell types. The fitted slope was 0.151 in dendritic cells and 0.085 in CD8 T cells, a roughly **1.8-fold difference** (Fig. 2c). None of the resting-cell measurements we tested reliably supplied that scale.

Why, then, did resting data contain any useful signal? Because this pathway is quiet, not completely inactive. After centring within donor and adjusting for sequencing depth, the 50 genes that would respond most strongly already co-varied **6–23 times more than expression-matched random genes**, across all seven cell types. The absolute within-cell correlations were modest (0.02–0.11), consistent with weak tonic interferon signalling.

This suggested a more precise test. We trained scGen on control cells only and used each prior to identify a latent direction separating resting cells with high and low prior activity. We then asked whether moving along that direction resembled the withheld IFN-β response (Fig. 2d). The curated ISG axis gave a gene-wise correlation of **r = 0.43** with the true response; an axis constructed from promoter ISRE motifs gave **r = 0.46**. A control motif, random gene set and Hypoxia prior gave 0.18, 0.11 and 0.03, respectively.

Most of this agreement was concentrated in genes named by the prior. On genes outside every interferon prior, the two correlations fell to 0.07 and 0.08. The latent representation therefore contained a weak pathway-associated direction, and external knowledge helped select it. **Its direction was detectable; its size remained uncalibrated.** Correlation with a response pattern does not determine the amplitude of the response.

<div class="sp-fig">
  <div class="sp-panel sp-wide"><p class="sp-panel-title"><b>a</b> Which genes respond? Zero-shot ranking across all expressed genes</p><div class="sp-chart" data-chart="zRank"></div></div>
  <div class="sp-panel"><p class="sp-panel-title"><b>b</b> Response genes lost through control-only feature selection</p><div class="sp-chart" data-chart="zBlind"></div></div>
  <div class="sp-panel"><p class="sp-panel-title"><b>c</b> One pathway prior, different response scales</p><div class="sp-chart" data-chart="zScale"></div></div>
  <div class="sp-panel sp-wide"><p class="sp-panel-title"><b>d</b> Prior-guided directions in a control-trained scGen</p><div class="sp-chart" data-chart="zAxis"></div></div>
  <noscript><img src="{{ '/assets/img/silent-pathway/fig2_zeroshot.png' | relative_url }}" alt="Figure 2, zero-shot results" class="img-fluid"></noscript>
</div>


**Figure 2. The resting state contains information about the response pattern, with limited information about its magnitude.** (a) AUPRC for identifying each cell type's top 100 absolute responders across 13,306 genes; chance = 0.0075. “+ state” orders prior genes by resting expression. (b) Fraction of genome-wide top responders represented by different gene selections. (c) Cell-type-specific response slopes for genes in the same PROGENy footprint. (d) Correlation between prior-guided, control-only latent predictions and observed $\Delta$; grey bars exclude every interferon-prior gene (2,353 of 3,088 modelled genes). Zero-shot latent correlations describe direction, not calibrated response magnitude.
{: .sp-caption}

## 2. A few stimulated cells turn direction into prediction

If a prior identifies the relevant response pattern, the next question is whether a small number of interventions can calibrate it. We revealed stimulated cells from the training donors and predicted the response in donors whose stimulated cells remained hidden (Fig. 3).

With **one stimulated cell**, the highest-scoring models all used mechanistic information. scGen guided by the DNA-only ISRE axis achieved $R^2_\Delta = 0.40$; the PROGENy one-parameter model achieved 0.39; and scGen guided by curated ISGs achieved 0.36. Plain scGen reached **0.21 [0.13, 0.28]**, while a data-only empirical-Bayes (EB) estimator scored −0.17. A single cell is a noisy measurement, so these estimates average across repeated samples of which cell was revealed.

A higher score by itself would not tell us whether the prior helped or the methods simply differed. We therefore made **matched comparisons within each model family**. In EB, the data-only and prior-informed estimators differed only in whether prior genes received a separate shrinkage variance. The curated ISG prior improved response $R^2$ by **+0.16 [+0.14, +0.18] with three cells**, +0.09 with ten, and +0.02 with thirty. The DNA-derived ISRE prior added +0.09 at one cell and +0.11 at three (Fig. 3b).

We performed the corresponding test inside scGen. First, we shrank its estimated latent response toward zero; then we allowed the component along a prior-defined direction to be preserved. Relative to the **equally shrunk** scGen baseline, the curated ISG axis added **+0.14 [+0.12, +0.15] at one cell** and +0.06 at three; the ISRE axis added +0.18 and +0.08 (Fig. 3c). Wrong-pathway, random and control-motif priors changed $R^2$ by at most about 0.02. The benefit therefore tracked the **relevance of the biological information**, not simply the act of adding a prior.

As intervention data accumulated, the models learned the response directly. Plain scGen reached $R^2_\Delta$ of 0.56 with three cells, 0.67 with ten and 0.71 with thirty. At 1,000 cells, data-only EB reached 0.82; with all four training donors, both EB and the cell-type-aware mean shift reached 0.88, compared with 0.86 for scGen. The matched prior advantage was small by roughly thirty cells and absent by about 100.

Two limits sharpen the interpretation. The rigid one-parameter PROGENy model was useful immediately ($R^2_\Delta=0.39$ with one cell) but saturated near 0.44, because a general pathway footprint cannot reproduce every system-specific change. And our scGen latent shrinkage was too strong: from three cells onward, prior-guided scGen remained below **plain, unshrunk scGen**, even though it improved on the matched, shrunk baseline. This is evidence for the value of the prior at low data, not evidence that our particular integration is the best possible predictor.

Together the matched comparisons show a clear pattern: **the information supplied by the prior is most valuable when intervention measurements are scarce.** Once the response is sufficiently observed, the data carry that information directly.

<div class="sp-fig">
  <div class="sp-panel sp-wide"><p class="sp-panel-title"><b>a</b> Response prediction on held-out donors as stimulated cells are revealed</p><div class="sp-chart" data-chart="fCurves"></div></div>
  <div class="sp-panel"><p class="sp-panel-title"><b>b</b> Added value of a prior inside the EB estimator</p><div class="sp-chart" data-chart="fAdvEB"></div></div>
  <div class="sp-panel"><p class="sp-panel-title"><b>c</b> Added value of a prior inside equally shrunk scGen</p><div class="sp-chart" data-chart="fAdvSG"></div></div>
  <noscript><img src="{{ '/assets/img/silent-pathway/fig3_fewshot.png' | relative_url }}" alt="Figure 3, few-shot response prediction" class="img-fluid"></noscript>
</div>


**Figure 3. Prior information matters most with very few intervention measurements.** (a) $R^2$ on the response $\Delta$ across 3,088 genes, evaluated on held-out donors and averaged across donor–cell-type predictions. Dashed curves use the ISG prior. For scGen, the dashed curve should be compared with the equally shrunk baseline in panel (c), not only with plain scGen. (b, c) Paired change in $R^2$ from adding each prior to the same EB or scGen estimator, evaluated on identical revealed cells. Bands and intervals are 95% hierarchical bootstraps; negative values below −0.6 are clipped in panel (a).
{: .sp-caption}

## 3. The usual score can conceal the problem

The experiment measures response prediction, but many virtual-cell benchmarks report agreement on **absolute expression**. Most genes change little after stimulation, so a model can obtain a good expression score by reproducing the control state.

In these data, predicting **no change at all** gave an absolute-expression $R^2$ of **0.70** (Fig. 4a). Across models, that score rose from 0.70 to 0.96 as intervention data were added. On the response $\Delta$, the corresponding range was 0 to 0.88. The absolute-expression metric compressed the very improvement we wanted to measure.

Even response-based metrics answer different questions. At ten revealed cells, global mean shift scored only 0.36 across all genes, compared with 0.67 for scGen. Yet when we evaluated only each donor and cell type's 50 largest true responders, mean shift was best in five of seven cell types (Fig. 4b). It retained large effects that more strongly regularized methods tended to shrink.

A virtual-cell benchmark therefore needs to say precisely what is being predicted. **Response-wide accuracy, direction, and accuracy on the strongest responding genes each capture a different aspect of intervention biology.** Reporting absolute state alone can make an uninformative counterfactual prediction appear successful.

<div class="sp-fig">
  <div class="sp-panel"><p class="sp-panel-title"><b>a</b> Identical predictions, different definitions of success</p><div class="sp-chart" data-chart="mPitfall"></div></div>
  <div class="sp-panel"><p class="sp-panel-title"><b>b</b> Accuracy on the strongest response genes, by cell type</p><div class="sp-chart" data-chart="mCellType"></div></div>
  <noscript><img src="{{ '/assets/img/silent-pathway/fig4_metrics_celltypes.png' | relative_url }}" alt="Figure 4, response and expression metrics" class="img-fluid"></noscript>
</div>


**Figure 4. A strong cell-state score need not imply a strong intervention prediction.** (a) The same predictions evaluated on mean absolute expression and on stimulated-minus-control response $\Delta$. (b) At ten revealed cells, $R^2$ on the 50 strongest true responders in each held-out donor and cell type. These genes are selected for evaluation only. Values below −0.6 are clipped in the chart; hover for exact values.
{: .sp-caption}

## What this tells us about virtual cells

The result is a division of labour between three kinds of information:

**Observation reveals structure.** Resting blood cells show weak, reproducible co-variation among future interferon-responsive genes. A representation trained on those cells can encode a corresponding direction of variation.

**Mechanism identifies the relevant response.** Curated pathway footprints and promoter motifs help select the interferon-associated direction. Their predictive value is clearest when no stimulus measurements, or just a few, are available. The outside-prior analysis also shows the present limit: our control-trained latent model contributes little response information about genes the priors do not already identify.

**Intervention calibrates the response.** A few stimulated cells help estimate its amplitude and cell-type dependence. More measurements gradually replace the information supplied by the prior. The relationship appears in both a simple statistical estimator and a deep generative model, using both curated and DNA-derived priors.

This is a **pilot about information**, not a demonstration of general-purpose unseen-biology prediction. The curated priors incorporate knowledge from earlier experiments, the ISRE motif itself was discovered through biological studies, and we examined one well-characterized stimulus at a single six-hour endpoint. The resting-cell latent signal may depend on the pathway's tonic activity. Our one-cell estimates also remain sensitive to which cell happens to be sampled.

The decisive next test is a pathway with **no detectable basal activity**. If resting cells supply no response-associated axis, does mechanistic knowledge still recover useful targets and directions, and how many interventions are then required? A larger leave-one-cytokine-out study could answer this across pathways with different degrees of prior overlap. Systematically degrading the priors—removing targets, shuffling genes or flipping signs—would reveal how much knowledge is needed before it becomes useful or misleading. Adaptive selection of the next cell type to stimulate could then test whether this information genuinely reduces experimental cost.

The broader implication is simple: a virtual cell needs to specify **which part of a new response its evidence identifies**. In this pilot, resting observations supplied a coordinate system, mechanism pointed to the relevant direction, and interventions fixed the scale. That is a useful starting principle for models intended to predict what cells will do beyond the conditions they have already seen.

## Methods and additional checks

**Data and evaluation.** We used `pertpy.dt.kang_2018()` (GEO [GSE96583](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE96583)); after requiring at least 200 detected genes per cell, 24,562 cells remained. Expression was `log1p(counts per 10,000)`. We required at least 20 control and 20 stimulated cells per donor–cell-type evaluation. Zero-shot response rankings covered 13,306 genes detected in at least ten cells. The few-shot models shared 3,088 genes: 2,000 variable genes selected using control cells only (Seurat flavour, donor batch), plus genes in the curated priors. As a feature-selection sensitivity check, the ISG-prior EB gain remained +0.20 [+0.17, +0.22] at three cells when restricted to control-selected variable genes.

**Donor splits and sampling.** The two four-donor groups were `{1015, 1016, 101, 107}` and `{1488, 1256, 1244, 1039}`. Each served once as training donors and once as held-out donors. At ordinary few-shot levels, revealed stimulated cells came from one randomly selected training donor; “four donors” used all their stimulated cells (approximately 6,179 cells, versus about 1,483 for one complete donor). We used ten seeded draws per fold for one through thirty cells and three per fold above thirty. The one- and three-cell conditions were added after an initial analysis of the ten-cell regime, without retuning models. All revealed cells remained in the training split.

**Priors.** Curated sources were MSigDB Hallmark IFN-α/γ, CollecTRI STAT1/STAT2/IRF9, and PROGENy JAK–STAT, accessed through `decoupler` 2.2 and OmniPath. The sequence prior used UCSC hg38 `upstream1000` RefSeq promoters, searched on both strands for `GAAA..GAAA` (ISRE-like motif); genes with at least two matches in any transcript's upstream kilobase qualified. The composition-matched control motif was `AGAA..AGAA`. Hypoxia, TNFα–NF-κB and equal-sized random sets were negative controls. The prior memberships were fixed without inspecting response outcomes.

**Estimators.** The zero-change control set $\Delta=0$. Mean shift estimated stimulated-minus-matched-control expression either globally or per cell type. The empirical-Bayes estimator modeled a global response plus cell-type deviations with normal–normal shrinkage and moment-estimated variances; its prior-informed version used separate prior variances for genes inside and outside the selected prior, without changing the observations or estimator family. PROGENy fit a cell-type-specific amplitude multiplying fixed JAK–STAT weights, shrunk toward a pooled estimate with a pseudo-count of twenty cells.

**scGen and paired latent priors.** The PyTorch scGen port used an encoder and decoder with two 800-unit hidden layers, a 100-dimensional latent space, BatchNorm, LeakyReLU, 0.2 dropout, Adam at $10^{-3}$, batch size 128, up to 100 epochs, and early stopping with patience 25. Its loss was $0.5\,\mathrm{SSE}+0.5\times5\times10^{-5}\,\mathrm{KL}$. Early stopping used a 10% control-cell validation split. The response vector was the shot-weighted mean of matched latent differences. Latent EB shrank coordinates after scaling by their control latent standard deviations. Each prior axis was the mean latent difference between the highest-scoring 10% and remaining resting cells within donor and cell type; the prior-guided estimator preserved the component along this axis while shrinking the orthogonal component. The matched control applied identical shrinkage without privileging any prior axis.

**Sensitivity and reproducibility.** When scGen was retrained without access even to held-out donors' control cells, its response $R^2$ fell by 0.15 at one shot and 0.07 at ten, but by only 0.01 at 100 and negligibly with all donors. On genes excluded from every IFN prior, the curated prior improved EB by +0.39 at three cells; inside scGen it reduced performance by about 0.07. Within-donor centring and sequencing-depth adjustment preserved the tonic co-expression signal. Comparisons with `pertpy`'s JAX scGen were within run-to-run variability at 10, 100 and all training cells (fold 0: JAX 0.667/0.731/0.829 versus PyTorch 0.662 ± 0.075/0.733 ± 0.074/0.862 ± 0.043). No model hyperparameters were tuned on held-out donors.

**Uncertainty.** Intervals are 95% hierarchical bootstraps from 2,000 resamples, resampling held-out donors and seeded draws within each fold before averaging fold estimates. Prior improvements were computed as paired differences on identical revealed cells. This wider uncertainty estimate corrected an earlier preliminary one-shot scGen estimate of 0.48 to **0.21 [0.13, 0.28]**. The zero-shot rankings were also expanded from the modelled feature set to all expressed genes before this write-up.

<details markdown="1">
<summary><strong>Full few-shot performance table</strong></summary>


<div class="sp-table-wrap" markdown="1">


| Model                        | 0 cells |   1 cell |  3 cells | 10 cells | 30 cells | 100 cells | 1000 cells | 4 donors |
| ---------------------------- | ------: | -------: | -------: | -------: | -------: | --------: | ---------: | -------: |
| Control ($\Delta=0$)         |    0.00 |     0.00 |     0.00 |     0.00 |     0.00 |      0.00 |       0.00 |     0.00 |
| Mean shift                   |    0.00 |    −3.25 |    −0.58 |     0.36 |     0.60 |      0.69 |       0.73 |     0.74 |
| Mean shift, cell-type-aware  |    0.00 |    −3.25 |    −1.35 |    −0.69 |    −0.35 |      0.28 |       0.80 | **0.88** |
| PROGENy 1-parameter          |    0.00 |     0.39 |     0.41 |     0.42 |     0.43 |      0.43 |       0.44 |     0.44 |
| Data-only EB                 |    0.00 |    −0.17 |     0.15 |     0.42 |     0.58 |      0.70 |   **0.82** | **0.88** |
| EB + ISG prior               |    0.00 |    −0.13 |     0.31 |     0.51 |     0.61 |      0.69 |   **0.82** | **0.88** |
| EB + ISRE motif (DNA)        |    0.00 |    −0.08 |     0.26 |     0.46 |     0.58 |      0.69 |   **0.82** | **0.88** |
| EB + Hypoxia (wrong)         |    0.00 |    −0.18 |     0.15 |     0.43 |     0.59 |      0.70 |   **0.82** | **0.88** |
| scGen                        |       — |     0.21 | **0.56** | **0.67** | **0.71** |  **0.74** |       0.79 |     0.86 |
| scGen, training donors only  |       — |     0.06 |        — |     0.60 |        — |      0.73 |          — |     0.86 |
| scGen + latent EB            |       — |     0.22 |     0.43 |     0.62 |     0.69 |      0.73 |       0.79 |     0.86 |
| scGen + ISG axis             |       — |     0.36 |     0.49 |     0.62 |     0.69 |      0.73 |       0.79 |     0.86 |
| scGen + ISRE axis (DNA)      |       — | **0.40** |     0.51 |     0.63 |     0.69 |      0.73 |       0.79 |     0.86 |
| scGen + Hypoxia axis (wrong) |       — |     0.21 |     0.43 |     0.62 |     0.69 |      0.73 |       0.79 |     0.86 |

</div>

Values are mean $R^2$ on $\Delta$ across held-out donors and random draws. The 0-shot scGen entries are omitted here: the original 0.02 quantified reconstruction error, not a stimulus-response prediction. “Four donors” means all stimulated cells of the four training donors.

</details>

## References

1. Kang, H. M. et al. (2018). Multiplexed droplet single-cell RNA-sequencing using natural genetic variation. *Nature Biotechnology* **36**, 89–94. [https://doi.org/10.1038/nbt.4042](https://doi.org/10.1038/nbt.4042)
2. Lotfollahi, M., Wolf, F. A. & Theis, F. J. (2019). scGen predicts single-cell perturbation responses. *Nature Methods* **16**, 715–721. [https://doi.org/10.1038/s41592-019-0494-8](https://doi.org/10.1038/s41592-019-0494-8)
3. Tiwari, K., Mahajan, G., Bellad, R. P., Dhruw, N. K. & Jha, A. K. (2026). Genetic perturbation prediction models fail out-of-distribution: a rigorous benchmark and systematic evaluation. *bioRxiv*. [https://doi.org/10.64898/2026.10.16.759604](https://doi.org/10.64898/2026.10.16.759604)

<!-- TODO: Add code and per-run results link once the repository is public. -->

<script src="{{ '/assets/js/silent-pathway/charts.js' | relative_url }}" data-src="{{ '/assets/json/silent-pathway/data.json' | relative_url }}" defer></script>

