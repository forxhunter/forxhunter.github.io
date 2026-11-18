import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/**
 * Use the file path, minus its extension, as the entry id, exactly as written.
 * The default id generator lowercases and slugifies, which would change the
 * URLs this site already published under Jekyll (e.g. /blog/2025/work_with_LLM/).
 */
const keepPath = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');

// ─── Posts ─────────────────────────────────────────────────────────────────

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts', generateId: keepPath }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    categories: z.array(z.string()).optional().default([]),
    /** Enable KaTeX math rendering. */
    math: z.boolean().optional().default(false),
    /** Show table of contents sidebar. */
    toc: z.boolean().optional().default(true),
    /** Show related posts section. */
    relatedPosts: z.boolean().optional().default(false),
    /** Pin to top of blog listing. */
    pinned: z.boolean().optional().default(false),
    /** Hide from blog listing (but accessible via direct URL). */
    hidden: z.boolean().optional().default(false),
    /** Draft post — hidden from all listings and the search index until published. */
    draft: z.boolean().optional().default(false),
    /** Override the robots meta tag (e.g. 'noindex, nofollow'). Useful for sensitive posts. */
    robots: z.string().optional(),
    /** Last modified date — displayed in the post header and used in JSON-LD dateModified. */
    lastmod: z.coerce.date().optional(),
    /** Redirect to external URL instead of rendering content. */
    redirect: z.string().url().optional(),
    /** Hero/thumbnail image path. */
    image: z.string().optional(),
    /** Distill layout — renders as a Distill article. */
    distill: z.boolean().optional().default(false),
    /** Authors for Distill-style posts. */
    distillAuthors: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url().optional(),
          affiliations: z.object({ name: z.string() }).optional(),
        }),
      )
      .optional(),
    /** BibTeX bibliography file reference for Distill posts. */
    bibliography: z.string().optional(),
    /** Citation key for this post (used in bibliography). */
    citation_key: z.string().optional(),
    /** Load Mermaid diagram rendering on this post. */
    mermaid: z.boolean().optional().default(false),
    /** Load Chart.js on this post. */
    chart_js: z.boolean().optional().default(false),
    /** Load Apache ECharts on this post. */
    echarts: z.boolean().optional().default(false),
    /** Load Vega/Vega-Lite on this post. */
    vega: z.boolean().optional().default(false),
    /** Load Plotly.js on this post. */
    plotly: z.boolean().optional().default(false),
    /** Load pseudocode.js on this post. */
    pseudocode: z.boolean().optional().default(false),
    /** Load Typograms on this post. */
    typograms: z.boolean().optional().default(false),
    /** Load TikzJax on this post. */
    tikzjax: z.boolean().optional().default(false),
    /** Load Leaflet maps on this post. */
    map: z.boolean().optional().default(false),
    /** Load img-comparison-slider on this post. */
    img_comparison: z.boolean().optional().default(false),
    /** Load Diff2Html on this post. */
    code_diff: z.boolean().optional().default(false),
    /** Load PhotoSwipe gallery on this post. */
    gallery: z.boolean().optional().default(false),
    /** Enable Disqus comments on this post. */
    disqus: z.boolean().optional().default(false),
  }),
});

// ─── Projects ──────────────────────────────────────────────────────────────

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects', generateId: keepPath }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** Thumbnail image path. */
    img: z.string().optional(),
    /** Alt text for image. */
    img_alt: z.string().optional(),
    /** External URL (e.g. GitHub repo). */
    url: z.string().url().optional(),
    /** GitHub repo in format owner/repo — auto-links to repo. */
    github: z.string().optional(),
    /** GitHub repo path (owner/repo) for fetching live star count. */
    github_stars: z.string().optional(),
    /** Sort order (lower = shown first). */
    importance: z.number().optional().default(999),
    /** Badge label shown on card (e.g. 'open source'). */
    category: z.string().optional(),
    /** Show redirect to external url instead of project page. */
    redirect: z.string().url().optional(),
    /** Citation keys from papers.bib to show as References at the bottom of the project page. */
    related_publications: z.array(z.string()).optional(),
    /** Enable Giscus comments on the project page. */
    giscus_comments: z.boolean().optional().default(false),
  }),
});

// ─── Announcements ─────────────────────────────────────────────────────────

const announcements = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/announcements', generateId: keepPath }),
  schema: z.object({
    date: z.coerce.date(),
    /** Title. An announcement with a title gets its own page under /news/. */
    title: z.string().optional(),
    /** Show the body inline in the news list instead of linking to its page. */
    inline: z.boolean().optional().default(true),
    /** Pin this announcement to the top. */
    pinned: z.boolean().optional().default(false),
    /** Hide from the announcements list. */
    hidden: z.boolean().optional().default(false),
  }),
});

export const collections = { posts, projects, announcements };
