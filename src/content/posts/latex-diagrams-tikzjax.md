---
title: LaTeX TikZ Diagrams in the Browser
date: 2025-05-10
description: Render Feynman diagrams, geometric proofs, vector fields, and circuit schematics — directly from TikZ code.
tags: [diagrams, latex, physics]
categories: [demo]
toc: true
math: true
tikzjax: true
---

The `tikzjax: true` flag loads [TikzJax](https://tikzjax.com/), which compiles TikZ code entirely
in the browser using WebAssembly. No server-side LaTeX installation required.

> **Note:** TikzJax uses an unversioned CDN — if supply-chain integrity is critical, self-host the
> script. See [tikzjax.com](https://tikzjax.com) for instructions.

## Pythagorean Theorem

A classic geometric proof with a right triangle $a^2 + b^2 = c^2$:

<script type="text/tikz">
\begin{tikzpicture}[scale=2]
  % Right triangle
  \draw[thick] (0,0) -- (3,0) -- (3,2) -- cycle;
  % Right angle marker
  \draw (3,0) rectangle (2.85,0.15);
  % Labels
  \node[below] at (1.5,0) {$a = 3$};
  \node[right] at (3,1) {$b = 2$};
  \node[above left] at (1.5,1) {$c = \sqrt{13}$};
  % Squares on each side
  \draw[fill=blue!15, draw=blue!50] (0,0) -- (0,-3) -- (3,-3) -- (3,0) -- cycle;
  \node at (1.5,-1.5) {$a^2 = 9$};
  \draw[fill=red!15, draw=red!50] (3,0) -- (5,0) -- (5,2) -- (3,2) -- cycle;
  \node at (4,1) {$b^2=4$};
  \draw[fill=green!15, draw=green!50, rotate around={-33.69:(0,0)}]
    (0,0) -- (0,3.606) -- (-3.606,3.606) -- (-3.606,0) -- cycle;
  \node[rotate=-33.69] at (-1.8,1.8) {$c^2=13$};
\end{tikzpicture}
</script>

## Vector Field

Electric field lines of a dipole (positive and negative charge):

<script type="text/tikz">
\usetikzlibrary{decorations.markings}
\begin{tikzpicture}[
  scale=1.4,
  field line/.style={
    decoration={markings, mark=at position 0.5 with {\arrow{>}}},
    postaction={decorate}, thick
  }
]
  % Positive charge
  \filldraw[red] (1,0) circle (4pt) node[above right=2pt] {$+q$};
  % Negative charge
  \filldraw[blue] (-1,0) circle (4pt) node[above left=2pt] {$-q$};

  % Approximate field lines (hand-drawn ellipses through both charges)
  \foreach \angle in {0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330} {
    \draw[field line, gray!70]
      (1,0) ++(\angle:0.15) arc (\angle:\angle+5:0.5);
  }

  % Axis labels
  \draw[->, gray] (-2.2,0) -- (2.2,0) node[right] {$x$};
  \draw[->, gray] (0,-1.8) -- (0,1.8) node[above] {$y$};
\end{tikzpicture}
</script>

## Simple LC Circuit

A series RLC circuit schematic:

<script type="text/tikz">
\usetikzlibrary{circuits.ee.IEC}
\begin{tikzpicture}[circuit ee IEC, scale=1.5, thick,
  every info/.style={font=\small},
  small circuit symbols,
  set resistor graphic=var resistor IEC graphic,
  set diode graphic=var diode IEC graphic,
  set make contact graphic=var make contact IEC graphic]

  % Circuit path
  \draw (0,2) to [battery={info={$\mathcal{E}$}}] (0,0);
  \draw (0,2) -- (2,2)
    to [resistor={info={$R$}}] (2,1)
    to [inductor={info={$L$}}] (2,0) -- (0,0);
  \draw (2,2) -- (4,2)
    to [capacitor={info={$C$}}] (4,0) -- (2,0);

  % Node labels
  \fill (0,2) circle (1.5pt);
  \fill (2,2) circle (1.5pt);
  \fill (2,0) circle (1.5pt);
\end{tikzpicture}
</script>

## Commutative Diagram

A classic commutative square from category theory:

<script type="text/tikz">
\usetikzlibrary{arrows.meta, positioning}
\begin{tikzpicture}[
  node distance=2.5cm,
  every node/.style={font=\large},
  arrow/.style={-{Latex[length=6pt]}, thick}
]
  \node (A) {$A$};
  \node (B) [right of=A] {$B$};
  \node (C) [below of=A] {$C$};
  \node (D) [below of=B] {$D$};

  \draw[arrow] (A) -- node[above] {$f$}   (B);
  \draw[arrow] (A) -- node[left]  {$g$}   (C);
  \draw[arrow] (B) -- node[right] {$h$}   (D);
  \draw[arrow] (C) -- node[below] {$k$}   (D);

  \node at (1.25,-1.25) {$\circlearrowleft$};
\end{tikzpicture}
</script>

## Usage

```yaml
---
title: My Post With TikZ
tikzjax: true
math: true
---
```

Write TikZ code inside `<script type="text/tikz">` tags. The full TikZ package ecosystem is
available — `\usetikzlibrary{...}` works as expected. Compilation runs client-side via WebAssembly,
so diagrams appear without any server-side LaTeX setup.

TikzJax packages supported include: `arrows`, `arrows.meta`, `decorations.markings`,
`circuits.ee.IEC`, `positioning`, `shapes`, `patterns`, `calc`, `fit`, `matrix`, and many more.
