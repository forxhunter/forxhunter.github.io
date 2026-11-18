---
title: Writing Algorithms in Pseudocode
date: 2025-05-05
description: Render beautiful pseudocode with LaTeX-style typesetting using pseudocode.js — no images, no screenshots.
tags: [algorithms, computer-science, formatting]
categories: [demo]
toc: true
math: true
relatedPosts: true
pseudocode: true
---

The `pseudocode: true` frontmatter flag loads [pseudocode.js](https://github.com/SaswatPadhi/pseudocode.js),
which renders `<pre class="pseudocode">` blocks as beautifully typeset algorithm listings with LaTeX-style
numbering, indentation, and math.

## Quicksort

The classic divide-and-conquer sorting algorithm:

<pre class="pseudocode">
\begin{algorithm}
\caption{Quicksort}
\begin{algorithmic}
\PROCEDURE{Quicksort}{$A$, $lo$, $hi$}
  \IF{$lo < hi$}
    \STATE $p \leftarrow$ \CALL{Partition}{$A$, $lo$, $hi$}
    \CALL{Quicksort}{$A$, $lo$, $p - 1$}
    \CALL{Quicksort}{$A$, $p + 1$, $hi$}
  \ENDIF
\ENDPROCEDURE
\PROCEDURE{Partition}{$A$, $lo$, $hi$}
  \STATE $pivot \leftarrow A[hi]$
  \STATE $i \leftarrow lo - 1$
  \FOR{$j \leftarrow lo$ \TO $hi - 1$}
    \IF{$A[j] \leq pivot$}
      \STATE $i \leftarrow i + 1$
      \STATE swap $A[i]$ and $A[j]$
    \ENDIF
  \ENDFOR
  \STATE swap $A[i+1]$ and $A[hi]$
  \RETURN $i + 1$
\ENDPROCEDURE
\end{algorithmic}
\end{algorithm}
</pre>

## Dijkstra's Shortest Path

Single-source shortest path in a weighted graph $G = (V, E)$:

<pre class="pseudocode">
\begin{algorithm}
\caption{Dijkstra's Algorithm}
\begin{algorithmic}
\REQUIRE Graph $G=(V,E,w)$, source $s \in V$
\ENSURE Distances $d[v]$ for all $v \in V$
\PROCEDURE{Dijkstra}{$G$, $s$}
  \FOR{each vertex $v \in V$}
    \STATE $d[v] \leftarrow \infty$
    \STATE $\textit{prev}[v] \leftarrow \textbf{nil}$
  \ENDFOR
  \STATE $d[s] \leftarrow 0$
  \STATE $Q \leftarrow V$ \COMMENT{min-priority queue keyed by $d$}
  \WHILE{$Q \neq \emptyset$}
    \STATE $u \leftarrow$ \CALL{ExtractMin}{$Q$}
    \FOR{each neighbour $v$ of $u$}
      \STATE $\textit{alt} \leftarrow d[u] + w(u, v)$
      \IF{$\textit{alt} < d[v]$}
        \STATE $d[v] \leftarrow \textit{alt}$
        \STATE $\textit{prev}[v] \leftarrow u$
        \CALL{DecreaseKey}{$Q$, $v$, $\textit{alt}$}
      \ENDIF
    \ENDFOR
  \ENDWHILE
  \RETURN $d$, $\textit{prev}$
\ENDPROCEDURE
\end{algorithmic}
\end{algorithm}
</pre>

## Gradient Descent

Iterative optimisation for a smooth objective $f : \mathbb{R}^n \to \mathbb{R}$:

<pre class="pseudocode">
\begin{algorithm}
\caption{Gradient Descent with Backtracking Line Search}
\begin{algorithmic}
\REQUIRE Initial point $\mathbf{x}_0$, tolerance $\epsilon > 0$, step $\alpha_0 > 0$, shrink factor $\beta \in (0,1)$
\ENSURE Local minimum $\mathbf{x}^*$
\STATE $k \leftarrow 0$
\REPEAT
  \STATE $\mathbf{g} \leftarrow \nabla f(\mathbf{x}_k)$
  \STATE $\alpha \leftarrow \alpha_0$
  \WHILE{$f(\mathbf{x}_k - \alpha\,\mathbf{g}) > f(\mathbf{x}_k) - \tfrac{\alpha}{2}\|\mathbf{g}\|^2$}
    \STATE $\alpha \leftarrow \beta\,\alpha$ \COMMENT{Armijo condition not satisfied}
  \ENDWHILE
  \STATE $\mathbf{x}_{k+1} \leftarrow \mathbf{x}_k - \alpha\,\mathbf{g}$
  \STATE $k \leftarrow k + 1$
\UNTIL{$\|\nabla f(\mathbf{x}_k)\| < \epsilon$}
\RETURN $\mathbf{x}_k$
\end{algorithmic}
\end{algorithm}
</pre>

## Monte Carlo Integration

Approximate $\int_a^b f(x)\,dx$ using random sampling:

<pre class="pseudocode">
\begin{algorithm}
\caption{Monte Carlo Integration}
\begin{algorithmic}
\REQUIRE Function $f$, interval $[a, b]$, sample count $N$
\ENSURE Approximation $\hat{I} \approx \int_a^b f(x)\,dx$
\STATE $\textit{sum} \leftarrow 0$
\FOR{$i \leftarrow 1$ \TO $N$}
  \STATE $x_i \sim \mathcal{U}(a, b)$ \COMMENT{uniform random sample}
  \STATE $\textit{sum} \leftarrow \textit{sum} + f(x_i)$
\ENDFOR
\STATE $\hat{I} \leftarrow (b - a) \cdot \dfrac{\textit{sum}}{N}$
\STATE $\hat{\sigma}^2 \leftarrow \dfrac{1}{N-1}\sum_{i=1}^{N}\left(f(x_i) - \dfrac{\textit{sum}}{N}\right)^2$
\STATE Standard error: $\textit{SE} \leftarrow (b-a)\sqrt{\hat{\sigma}^2 / N}$
\RETURN $\hat{I}$, $\textit{SE}$
\end{algorithmic}
\end{algorithm}
</pre>

The error scales as $O(N^{-1/2})$, making Monte Carlo especially effective in high dimensions
where deterministic quadrature rules suffer the curse of dimensionality.

## Usage

```yaml
---
title: My Post
pseudocode: true
math: true   # optional — enables KaTeX for inline/display math in the rest of the post
---
```

Wrap your algorithm in `<pre class="pseudocode">` and use the `\begin{algorithm}...\end{algorithm}`
LaTeX-like environment. Supported keywords include `\IF`, `\ELSE`, `\FOR`, `\WHILE`, `\REPEAT`,
`\UNTIL`, `\PROCEDURE`, `\RETURN`, `\REQUIRE`, `\ENSURE`, `\COMMENT`, and `\STATE`.
