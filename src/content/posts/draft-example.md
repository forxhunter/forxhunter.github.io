---
title: 'This Post is a Draft'
date: 2025-06-01
draft: true
description: Draft posts are excluded from all listings, search, and RSS — but still build to HTML.
tags: [meta]
categories: [tutorial]
toc: false
---

This post has `draft: true` in its frontmatter.

It will **not** appear in:

- The blog listing page
- The search index (Pagefind)
- The RSS feed
- The sitemap

It **does** build to a real HTML page. If you know the direct URL, you can visit it.
This makes drafts useful for sharing a preview with collaborators before a public release.

Set `draft: false` (or remove the field entirely) to publish the post.
