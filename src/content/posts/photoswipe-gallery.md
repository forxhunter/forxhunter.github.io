---
title: Full-Screen Photo Gallery with PhotoSwipe
date: 2025-05-30
description: Create tap-to-expand full-screen lightbox galleries with captions — ideal for image-heavy posts and portfolios.
tags: [images, gallery, visualization]
categories: [demo]
toc: true
relatedPosts: true
gallery: true
---

The `gallery: true` flag loads [PhotoSwipe v5](https://photoswipe.com/) — a lightweight,
mobile-friendly lightbox with swipe, keyboard navigation, and caption support.

Wrap each image in an `<a>` tag with `data-pswp-width` and `data-pswp-height` attributes.
PhotoSwipe scans `#post-content` for these links on page load.

## Basic Grid Gallery

Six images in a three-column grid — click any image to open the lightbox:

<div class="row mt-3">
  <div class="col-4 col-sm-4" style="padding:4px;">
    <a href="/assets/img/1.jpg" data-pswp-width="800" data-pswp-height="534"
       data-cropped="true">
      <img src="/assets/img/1.jpg" class="img-fluid rounded no-zoom" alt="Gallery image 1" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
  <div class="col-4 col-sm-4" style="padding:4px;">
    <a href="/assets/img/2.jpg" data-pswp-width="800" data-pswp-height="534"
       data-cropped="true">
      <img src="/assets/img/2.jpg" class="img-fluid rounded no-zoom" alt="Gallery image 2" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
  <div class="col-4 col-sm-4" style="padding:4px;">
    <a href="/assets/img/3.jpg" data-pswp-width="800" data-pswp-height="534"
       data-cropped="true">
      <img src="/assets/img/3.jpg" class="img-fluid rounded no-zoom" alt="Gallery image 3" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
  <div class="col-4 col-sm-4" style="padding:4px;">
    <a href="/assets/img/4.jpg" data-pswp-width="800" data-pswp-height="534"
       data-cropped="true">
      <img src="/assets/img/4.jpg" class="img-fluid rounded no-zoom" alt="Gallery image 4" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
  <div class="col-4 col-sm-4" style="padding:4px;">
    <a href="/assets/img/5.jpg" data-pswp-width="800" data-pswp-height="534"
       data-cropped="true">
      <img src="/assets/img/5.jpg" class="img-fluid rounded no-zoom" alt="Gallery image 5" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
  <div class="col-4 col-sm-4" style="padding:4px;">
    <a href="/assets/img/6.jpg" data-pswp-width="800" data-pswp-height="534"
       data-cropped="true">
      <img src="/assets/img/6.jpg" class="img-fluid rounded no-zoom" alt="Gallery image 6" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
</div>

## Gallery with Captions

Add `data-pswp-caption` to each `<a>` tag to show captions in the lightbox:

<div class="row mt-3">
  <div class="col-6 col-sm-4" style="padding:4px;">
    <a href="/assets/img/7.jpg" data-pswp-width="800" data-pswp-height="534"
       data-pswp-caption="Abstract composition — study in light and texture.">
      <img src="/assets/img/7.jpg" class="img-fluid rounded no-zoom" alt="Abstract" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
  <div class="col-6 col-sm-4" style="padding:4px;">
    <a href="/assets/img/8.jpg" data-pswp-width="800" data-pswp-height="534"
       data-pswp-caption="Pattern and symmetry — recurring themes in physics and art.">
      <img src="/assets/img/8.jpg" class="img-fluid rounded no-zoom" alt="Pattern" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
  <div class="col-6 col-sm-4" style="padding:4px;">
    <a href="/assets/img/9.jpg" data-pswp-width="800" data-pswp-height="534"
       data-pswp-caption="Depth of field — bokeh effect in macro photography.">
      <img src="/assets/img/9.jpg" class="img-fluid rounded no-zoom" alt="Bokeh" style="aspect-ratio:3/2; object-fit:cover;" />
    </a>
  </div>
</div>

<div class="caption">Click any image to open the lightbox. Arrow keys navigate between images; Escape closes.</div>

## Masonry-Style Mixed Gallery

Portrait and landscape images mixed together — PhotoSwipe handles all aspect ratios:

<div class="row mt-3">
  <div class="col-8" style="padding:4px;">
    <a href="/assets/img/10.jpg" data-pswp-width="1200" data-pswp-height="600"
       data-pswp-caption="Wide panorama — full-width landscape image.">
      <img src="/assets/img/10.jpg" class="img-fluid rounded no-zoom" alt="Wide" style="width:100%; height:180px; object-fit:cover;" />
    </a>
  </div>
  <div class="col-4" style="padding:4px;">
    <a href="/assets/img/11.jpg" data-pswp-width="534" data-pswp-height="800"
       data-pswp-caption="Portrait orientation.">
      <img src="/assets/img/11.jpg" class="img-fluid rounded no-zoom" alt="Portrait" style="width:100%; height:180px; object-fit:cover;" />
    </a>
  </div>
  <div class="col-4" style="padding:4px;">
    <a href="/assets/img/12.jpg" data-pswp-width="600" data-pswp-height="600"
       data-pswp-caption="Square crop.">
      <img src="/assets/img/12.jpg" class="img-fluid rounded no-zoom" alt="Square" style="width:100%; height:130px; object-fit:cover;" />
    </a>
  </div>
  <div class="col-8" style="padding:4px;">
    <a href="/assets/img/1.jpg" data-pswp-width="1200" data-pswp-height="600"
       data-pswp-caption="Another wide image.">
      <img src="/assets/img/1.jpg" class="img-fluid rounded no-zoom" alt="Wide 2" style="width:100%; height:130px; object-fit:cover;" />
    </a>
  </div>
</div>

## Usage

```yaml
---
title: My Photo Post
gallery: true
---
```

```html
<a href="/assets/img/full-size.jpg"
   data-pswp-width="1920"
   data-pswp-height="1080"
   data-pswp-caption="Optional caption text">
  <img src="/assets/img/thumb.jpg" class="img-fluid no-zoom" alt="Description" />
</a>
```

PhotoSwipe initialises automatically on `#post-content` — no additional JavaScript needed.
The `data-pswp-width` and `data-pswp-height` must match the actual dimensions of the full-size
image at `href`. Add `class="no-zoom"` on the thumbnail `<img>` to prevent medium-zoom from
also intercepting the click.
