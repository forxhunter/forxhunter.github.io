---
title: 'Astro Framework'
description: 'An external project page — visiting this card redirects to the official Astro website. Demonstrates the redirect field.'
importance: 50
category: external
redirect: https://astro.build
img: /assets/img/2.jpg
img_alt: Astro framework logo and rocket illustration
---

This project page demonstrates the `redirect` field. Clicking the card or visiting
`/projects/astro-framework-external/` redirects immediately to `https://astro.build`.

Use `redirect` for projects that are hosted on external platforms (npm, PyPI, a dedicated
website) where the project detail page would just duplicate content that already exists
at the canonical URL.

```yaml
---
title: My External Project
redirect: https://example.com/my-project
---
```

No content body is needed. The redirect happens at the Astro routing level.
