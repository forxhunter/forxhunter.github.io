---
title: Showing Code Changes with Diff2Html
date: 2025-05-25
description: Render beautiful side-by-side or unified code diffs in posts — ideal for tutorials, changelogs, and code reviews.
tags: [code, formatting, diff]
categories: [demo]
toc: true
relatedPosts: true
code_diff: true
---

The `code_diff: true` flag loads [Diff2Html](https://diff2html.xyz/), which renders unified diff
text as coloured, syntax-highlighted side-by-side or line-by-line comparison blocks.

## Inline Diff — Refactoring a Physics Simulation

Before and after refactoring a Euler integration step into a proper RK4 solver:

<div id="diff1"></div>

<script>
(function poll() {
  if (typeof Diff2HtmlUI === 'undefined') { setTimeout(poll, 50); return; }
  const diff = `--- a/simulation.py
+++ b/simulation.py
@@ -1,18 +1,30 @@
 import numpy as np

-def euler_step(state, dt, force_fn):
-    """Simple Euler integration — first-order accurate."""
-    pos, vel = state
-    acc = force_fn(pos)
-    new_pos = pos + vel * dt
-    new_vel = vel + acc * dt
-    return new_pos, new_vel
+def rk4_step(state, dt, force_fn):
+    """Fourth-order Runge-Kutta integration."""
+    pos, vel = state
+
+    # k1
+    k1_v = vel
+    k1_a = force_fn(pos)
+
+    # k2
+    k2_v = vel + 0.5 * dt * k1_a
+    k2_a = force_fn(pos + 0.5 * dt * k1_v)
+
+    # k3
+    k3_v = vel + 0.5 * dt * k2_a
+    k3_a = force_fn(pos + 0.5 * dt * k2_v)
+
+    # k4
+    k4_v = vel + dt * k3_a
+    k4_a = force_fn(pos + dt * k3_v)
+
+    new_pos = pos + (dt / 6) * (k1_v + 2*k2_v + 2*k3_v + k4_v)
+    new_vel = vel + (dt / 6) * (k1_a + 2*k2_a + 2*k3_a + k4_a)
+    return new_pos, new_vel

 def simulate(initial_state, total_time, dt, force_fn):
-    states = [initial_state]
+    states = [initial_state]  # unchanged
     t = 0.0
     while t < total_time:
-        states.append(euler_step(states[-1], dt, force_fn))
+        states.append(rk4_step(states[-1], dt, force_fn))
         t += dt
     return np.array(states)`;

  const ui = new Diff2HtmlUI(document.getElementById('diff1'), diff, {
    drawFileList: false, matching: 'lines',
    outputFormat: 'line-by-line', highlight: true,
  });
  ui.draw();
})();
</script>

## Side-by-Side Diff — TypeScript Refactor

Migrating from callback-based to async/await in a data fetcher:

<div id="diff2"></div>

<script>
(function poll() {
  if (typeof Diff2HtmlUI === 'undefined') { setTimeout(poll, 50); return; }
  const diff = `--- a/src/utils/fetchCitations.ts
+++ b/src/utils/fetchCitations.ts
@@ -1,22 +1,18 @@
-import { XMLHttpRequest } from 'xhr2';
+// Uses native fetch — no polyfill needed in Node 18+

-interface CitationResult {
-  count: number;
-  error?: string;
-}
+export interface CitationResult { count: number; error?: string; }

-export function fetchCitationCount(
-  doi: string,
-  callback: (result: CitationResult) => void,
-): void {
-  const xhr = new XMLHttpRequest();
-  xhr.open('GET', \`https://api.openalex.org/works/doi:\${doi}?fields=cited_by_count\`);
-  xhr.onload = () => {
-    if (xhr.status === 200) {
-      const data = JSON.parse(xhr.responseText);
-      callback({ count: data.cited_by_count ?? 0 });
-    } else {
-      callback({ count: 0, error: \`HTTP \${xhr.status}\` });
-    }
-  };
-  xhr.onerror = () => callback({ count: 0, error: 'Network error' });
-  xhr.send();
+export async function fetchCitationCount(doi: string): Promise<CitationResult> {
+  try {
+    const res = await fetch(
+      \`https://api.openalex.org/works/doi:\${doi}?fields=cited_by_count\`,
+      { signal: AbortSignal.timeout(8000) },
+    );
+    if (!res.ok) return { count: 0, error: \`HTTP \${res.status}\` };
+    const data = await res.json() as { cited_by_count?: number };
+    return { count: data.cited_by_count ?? 0 };
+  } catch (err) {
+    return { count: 0, error: String(err) };
+  }
 }`;

  const ui = new Diff2HtmlUI(document.getElementById('diff2'), diff, {
    drawFileList: false, matching: 'lines',
    outputFormat: 'side-by-side', highlight: true,
  });
  ui.draw();
})();
</script>

## Multi-File Diff — A Small Pull Request

Three files changed in one diff block:

<div id="diff3"></div>

<script>
(function poll() {
  if (typeof Diff2HtmlUI === 'undefined') { setTimeout(poll, 50); return; }
  const diff = `--- a/src/config/site.ts
+++ b/src/config/site.ts
@@ -45,6 +45,8 @@
   publications: {
     maxAuthorLimit: 5,
+    /** Show 'and N more' for long author lists */
+    authorEllipsis: true,
     badges: {
       altmetric: true,
--- a/src/components/publications/BibSearch.tsx
+++ b/src/components/publications/BibSearch.tsx
@@ -120,7 +120,9 @@
   const visibleAuthors = site.publications.maxAuthorLimit
     ? authorLinks.slice(0, site.publications.maxAuthorLimit)
     : authorLinks;
+  const hidden = authorLinks.length - visibleAuthors.length;

-  return <span>{visibleAuthors.map(...)}</span>;
+  return <span>{visibleAuthors.map(...)}
+    {hidden > 0 && site.publications.authorEllipsis && <em>, and {hidden} more</em>}
+  </span>;
--- a/src/utils/authors.ts
+++ b/src/utils/authors.ts
@@ -1,4 +1,5 @@
 /**
  * Author name processing utilities for publication lists.
+ * Supports ellipsis for long author lists via site.publications.authorEllipsis.
  */`;

  const ui = new Diff2HtmlUI(document.getElementById('diff3'), diff, {
    drawFileList: true, matching: 'lines',
    outputFormat: 'line-by-line', highlight: true,
  });
  ui.draw();
})();
</script>

## Usage

```yaml
---
title: My Post
code_diff: true
---
```

Create a container `<div id="myDiff">` and use the self-polling pattern:

```javascript
(function poll() {
  if (typeof Diff2HtmlUI === 'undefined') { setTimeout(poll, 50); return; }
  const ui = new Diff2HtmlUI(document.getElementById('myDiff'), unifiedDiffString, {
    outputFormat: 'side-by-side',   // or 'line-by-line'
    drawFileList: true,
    matching: 'lines',
    highlight: true,
  });
  ui.draw();
})();
```

The `unifiedDiffString` is standard `diff -u` / `git diff` output. Generate it with
`git diff HEAD~1 -- path/to/file` and paste it directly into your post.
