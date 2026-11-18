---
title: 'This Post is Hidden'
date: 2025-06-02
hidden: true
description: Hidden posts are excluded from listings and RSS but are accessible via direct URL.
tags: [meta]
categories: [tutorial]
toc: false
---

This post has `hidden: true` in its frontmatter.

It will **not** appear in:

- The blog listing page
- The RSS feed

It **does** appear in:

- Pagefind search results (it is indexed)
- Direct URL access

Use `hidden: true` for posts that are linked from elsewhere (e.g. a conference abstract page or a
newsletter) but should not clutter the main blog archive.
