/**
 * as-folio site configuration
 *
 * This file replaces _config.yml from al-folio.
 * Update the values below to personalize your site.
 * All configuration is fully typed — your editor will catch mistakes.
 */

// ─── Navigation types (exported for use in Navbar.astro / SearchTrigger) ────

/** A simple navigation link. */
export type NavLeaf = { label: string; href: string };

/**
 * A dropdown group. `label` is the trigger text; `children` are the menu items.
 * Maximum supported depth is 2 levels (group → item). Do not nest further.
 */
export type NavDropdown = { label: string; children: NavLeaf[] };

/** A top-level nav entry — either a plain link or a dropdown group. */
export type NavItem = NavLeaf | NavDropdown;

export const site = {
  // ─── Derived deployment values ────────────────────────────────────────────

  /** Site origin from Astro's resolved `site` option. */
  url: import.meta.env.SITE.replace(/\/$/, ''),

  /** Base path from Astro's resolved `base` option. */
  base: import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, ''),

  // ─── Identity ──────────────────────────────────────────────────────────────

  /** Site title. Shown in the browser tab and navbar. */
  title: 'Tianyu Wu | UIUC Biophysics',

  /** Site description. Used in meta tags. */
  description:
    'Tianyu Wu, Ph.D. candidate in Biophysics and Quantitative Biology at the University of Illinois Urbana-Champaign (UIUC). Research in AI for Biology and protein design: generative AI systems that propose scientific hypotheses and designs.',

  /** Language code for the site. */
  lang: 'en',

  // ─── Author ────────────────────────────────────────────────────────────────

  author: {
    /** Full name shown in navbar, about page heading, and footer. */
    name: 'Tianyu Wu',

    /** Short email address (used in social links). */
    email: 'tianyu16@illinois.edu',

    /** Path to profile photo. Place image in public/assets/img/. */
    avatar: '/assets/img/pro_pic.jpg',

    /**
     * Subtitle below your name on the about page.
     * HTML is supported.
     */
    subtitle: `<b>Affiliation:</b> Center for Biophysics and Quantitative Biology, University of Illinois Urbana-Champaign, Urbana, IL.
      <br /><b>Email:</b> <a href="mailto:tianyu16@illinois.edu">tianyu16@illinois.edu</a>`,

    /**
     * Address block below profile photo.
     * HTML is supported.
     */
    moreInfo: `<p>Tianyu Wu</p>
      <p>Graduate Student, Computational and Biophysics</p>
      <p>Diwakar Shukla Group</p>
      <p>Roger Adams Laboratory, Room 101</p>
      <p>University of Illinois at Urbana-Champaign</p>`,
  },

  // ─── Social links ──────────────────────────────────────────────────────────
  //
  // Supported platforms (set to undefined to hide):
  //   email, x_username, linkedin_username, github_username, gitlab_username,
  //   scholar_userid, orcid_id, inspire_id, researchgate_username,
  //   arxiv_id, youtube_id, instagram_username, mastodon_url,
  //   bluesky_handle, medium_username, cv_pdf, rss_icon

  socials: {
    email: 'tianyu16@illinois.edu',
    x_username: undefined as string | undefined,
    linkedin_username: 'tianyu-wu-914669290' as string | undefined,
    github_username: undefined as string | undefined,
    gitlab_username: undefined as string | undefined,
    /** Google Scholar user ID — the part after user= in your Scholar URL */
    scholar_userid: undefined as string | undefined,
    orcid_id: '0009-0000-1436-6167' as string | undefined,
    /** Inspire HEP author ID */
    inspire_id: undefined as string | undefined,
    researchgate_username: undefined as string | undefined,
    arxiv_id: undefined as string | undefined,
    youtube_id: undefined as string | undefined,
    instagram_username: undefined as string | undefined,
    mastodon_url: undefined as string | undefined,
    bluesky_handle: undefined as string | undefined,
    medium_username: undefined as string | undefined,
    /** Path to CV PDF in public/assets/pdf/ */
    cv_pdf: undefined as string | undefined,
    /** Show RSS icon in social links */
    rss_icon: true,
  },

  // ─── Navigation ────────────────────────────────────────────────────────────

  navbar: {
    /** Fix navbar to top of viewport. */
    fixed: true,
    /** Show social icons in navbar (about page only). */
    socialIcons: false,
    /**
     * Top-level navigation items.
     * Use `{ label, href }` for a plain link.
     * Use `{ label, children: [...] }` for a dropdown group (max 2 levels).
     *
     * `href` values are relative to the site root (base is prepended automatically).
     */
    items: [
      { label: 'about', href: '/' },
      { label: 'blog', href: '/blog/' },
      { label: 'publications', href: '/publications/' },
      { label: 'projects', href: '/projects/' },
      { label: 'repositories', href: '/repositories/' },
    ] as NavItem[],
  },

  // ─── Footer ────────────────────────────────────────────────────────────────

  footer: {
    /**
     * Text shown in footer. HTML is supported.
     * Leave empty string to hide.
     */
    text: `Powered by <a href="https://astro.build/" target="_blank" rel="noopener noreferrer">Astro</a> with <a href="https://github.com/dadangnh/as-folio" target="_blank" rel="noopener noreferrer">as-folio</a>.
      Hosted by <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages</a>.`,
    /** Show "Last updated" timestamp in footer. */
    lastUpdated: true,
    /** Path to impressum/legal page (EU GDPR). Leave undefined to hide. */
    impressum: undefined as string | undefined,
    /**
     * Footer display mode:
     * 'sticky'  — always visible at the bottom of the viewport (al-folio default)
     * 'normal'  — sits at the natural bottom of page content (only visible when scrolled down)
     * 'hidden'  — footer is not rendered at all
     */
    position: 'sticky' as 'sticky' | 'normal' | 'hidden',
  },

  // ─── CV page ───────────────────────────────────────────────────────────────

  cv: {
    /**
     * Which CV data format to render.
     * 'rendercv' → reads src/data/cv.yml (RenderCV YAML format)
     * 'jsonresume' → reads src/data/resume.json (JSONResume format)
     */
    format: 'jsonresume' as 'rendercv' | 'jsonresume',
    /** Path to CV PDF for the download button in public/assets/pdf/. */
    pdfPath: '',
  },

  // ─── Blog ──────────────────────────────────────────────────────────────────

  blog: {
    /** Name shown in the blog page heading. */
    name: "Tianyu's Blog",
    description: 'Thoughts, research, and insights',
    /** Number of posts per page. */
    postsPerPage: 5,
    /**
     * Tags shown as badges on the blog listing page header.
     * Users can click them to filter posts by tag.
     */
    displayTags: ['research', 'yeast', 'gpu', 'wcm'],
    /** Categories shown as badges on the blog listing page header. */
    displayCategories: ['tutorials'] as string[],
    /**
     * External post sources (fetched at build time).
     * Each entry is either an RSS feed URL or a list of individual post objects.
     */
    externalSources: [] as Array<{
      name: string;
      rssUrl?: string;
      posts?: Array<{ url: string; publishedDate: string }>;
      categories?: string[];
      tags?: string[];
    }>,
    /** Average reading speed (words per minute) used for reading-time estimates. */
    wordsPerMinute: 200 as number,
    /** Message shown on the blog listing page when no posts exist. */
    emptyMessage: 'No posts yet. Check back soon!',
  },

  // ─── About page sections ──────────────────────────────────────────────────

  announcements: {
    /** Show news/announcements section on the about page. */
    enabled: true,
    /** Enable vertical scroll if more than 3 items. */
    scrollable: true,
    /** Max news items to show (undefined = show all). */
    limit: 5 as number | undefined,
  },

  latestPosts: {
    /** Show latest blog posts section on the about page. */
    enabled: true,
    scrollable: true,
    limit: 3 as number | undefined,
  },

  selectedPapers: {
    /** Show selected publications section on the about page. */
    enabled: true,
  },

  // ─── Features ─────────────────────────────────────────────────────────────

  features: {
    /** Enable dark/light mode toggle in navbar. */
    darkmode: true,
    /** Enable ⌘K search. */
    search: true,
    /** Enable reading progress bar on blog posts. */
    progressBar: true,
    /** Show back-to-top button. */
    backToTop: true,
    /** Enable automatic masonry layout for project cards. */
    masonry: true,
    /** Enable click-to-zoom on images (medium-zoom). */
    mediumZoom: true,
    /** Show styled CSS tooltips on hover for project card icons and publication annotations.
     *  When false, the browser's native title-attribute tooltip is used instead. */
    tooltips: false,
    /** Enable GDPR-compliant cookie consent dialog. */
    cookieConsent: false,
    /** Enable newsletter subscription form. */
    newsletter: false,
    /**
     * Enable video embedding for BibTeX entries.
     * If false, video links open in a new tab instead.
     */
    videoEmbedding: false,
    /**
     * Enable Astro View Transitions for smooth page-to-page animations.
     * Disable if you prefer full page reloads (e.g. for accessibility reasons).
     */
    viewTransitions: false,
    /** Show social sharing links (X, LinkedIn, Facebook, email) at the bottom of blog posts. */
    socialShare: true,
  },

  // ─── Giscus comments ──────────────────────────────────────────────────────
  // Follow setup at https://giscus.app/ then fill in the values below.

  giscus: {
    /** Set to true once you've configured the fields below. */
    enabled: true,
    /**
     * When true, Giscus is hidden behind a "Load comments" button — the
     * giscus.app script is only fetched after the user opts in.
     * Recommended for GDPR compliance (giscus sets third-party cookies).
     * Default: true.
     */
    lazyLoad: false,
    repo: 'forxhunter/forxhunter.github.io' as `${string}/${string}`,
    repoId: 'R_kgDOPWM87g',
    category: 'Q&A',
    categoryId: 'DIC_kwDOPWM87s4Cztyt',
    /** How to map discussions to pages. */
    mapping: 'pathname' as 'pathname' | 'url' | 'title' | 'og:title',
    strict: true,
    reactionsEnabled: true,
    inputPosition: 'bottom' as 'top' | 'bottom',
    darkTheme: 'dark',
    lightTheme: 'light',
    lang: 'en',
  },

  // ─── Analytics ────────────────────────────────────────────────────────────

  analytics: {
    /** Google Analytics 4 measurement ID (format: G-XXXXXXXXXX). */
    ga4: '' as string,
    /** Cronitor RUM analytics site ID. */
    cronitor: '' as string,
    /** Pirsch analytics site ID. */
    pirsch: '' as string,
    /** OpenPanel analytics client ID. */
    openpanel: '' as string,
    /** Google Search Console verification ID. */
    googleVerification: '' as string,
    /** Bing Webmaster verification ID. */
    bingVerification: '' as string,
  },

  // ─── Open Graph ───────────────────────────────────────────────────────────

  og: {
    /** Include Open Graph meta tags. */
    enabled: true,
    /** Default OG image path (in public/). */
    image: '/assets/img/yeast.png' as string,
  },

  // ─── Newsletter ───────────────────────────────────────────────────────────

  newsletter: {
    /** Loops.so form endpoint. */
    endpoint: '' as string,
  },

  // ─── Teaching page ────────────────────────────────────────────────────────

  teaching: {
    /**
     * Google Calendar ID for the "Upcoming Events" section.
     * Set to a calendar address like 'user@gmail.com' to show the embed.
     * Leave empty string to hide the calendar section entirely.
     */
    calendarId: '' as string,
    /** Timezone for the Google Calendar embed (e.g., 'America/New_York'). */
    timezone: 'America/New_York' as string,
  },

  // ─── Publications ─────────────────────────────────────────────────────────

  publications: {
    /**
     * Show badges for individual publication entries.
     * Can be disabled globally here; also toggleable per entry in BibTeX.
     */
    badges: {
      altmetric: false,
      dimensions: false,
      googleScholar: false,
      inspirehep: false,
    },
    /**
     * Max number of authors shown before "and N more..." link.
     * Set to undefined to always show all authors.
     */
    maxAuthorLimit: 3 as number | undefined,
    /** Enable thumbnail images for publications (if `preview` set in BibTeX). */
    thumbnails: true,
    /**
     * Last name used to italicise your name in publication author lists.
     * Defaults to the last word of `site.author.name` when not set.
     * Override explicitly if your publications use a different name form.
     */
    authorLastName: undefined as string | undefined,
    /** Path prefix (relative to public/) for publication preview images. */
    previewDir: '/assets/img/publication_preview/',
    /** Path prefix (relative to public/) for publication PDFs and supplements. */
    pdfDir: '/assets/pdf/',
    /** UI labels — override for non-English sites. */
    labels: {
      abstract: 'Abs',
      bibtex: 'Bib',
      supp: 'Supp',
      searchPlaceholder: 'Search publications\u2026',
      noResults: 'No publications match your search.',
    },
  },

  // ─── Repositories ────────────────────────────────────────────────────────

  repositories: {
    /** Show GitHub user stats cards. */
    githubUsers: true,
    /** Show GitHub repository pin cards. */
    githubRepos: true,
    /** Show GitHub trophy stats (repo_trophies). Disabled by default — the service has known reliability issues. */
    trophies: false,
    /** Theme for light mode (from github-readme-stats themes). */
    themeLight: 'default' as string,
    /** Theme for dark mode. */
    themeDark: 'dark' as string,
    /** Trophy card theme for light mode (from github-profile-trophy themes). */
    trophyThemeLight: 'flat' as string,
    /** Trophy card theme for dark mode. */
    trophyThemeDark: 'gitdimmed' as string,
  },

  // ─── Comments ─────────────────────────────────────────────────────────────

  comments: {
    /**
     * Disqus shortname — the subdomain part of YOUR-SHORTNAME.disqus.com.
     * Required when a post sets `disqus: true` in frontmatter.
     * Leave empty string if not using Disqus.
     */
    disqusShortname: '' as string,
  },

  // ─── Page copy ────────────────────────────────────────────────────────────

  pages: {
    projects: {
      /** Description shown below the "projects" heading on the projects page. */
      description: 'A showcase of my research projects and academic work.',
    },
    teaching: {
      /** Description shown below the "teaching" heading on the teaching page. */
      description: 'Course materials, schedules, and resources for classes taught.',
    },
  },

  // ─── Theme defaults ───────────────────────────────────────────────────────

  theme: {
    /**
     * Default color theme.
     * 'system' follows OS preference.
     */
    default: 'system' as 'light' | 'dark' | 'system',

    /**
     * Primary accent color used for links, active nav items, badges, and highlights.
     * Accepts any CSS color string (hex, hsl, rgb, etc.).
     * Set to 'auto' to use the built-in defaults (purple in light mode, cyan in dark mode).
     *
     * Example presets:
     *   Purple (default): { light: '#b509ac', dark: '#2698ba' }
     *   Blue:             { light: '#0076df', dark: '#68c0d9' }
     *   Red:              { light: '#ff3636', dark: '#f29105' }
     *   Green:            { light: '#009f06', dark: '#b7d12a' }
     *   Orange:           { light: '#f29105', dark: '#efcc00' }
     *   Custom hover:     { light: '#0076df', dark: '#68c0d9', hoverLight: '#0a53be', hoverDark: '#9fd8ea' }
     */
    color: {
      light: 'auto' as string,
      dark: 'auto' as string,
      hoverLight: 'auto' as string,
      hoverDark: 'auto' as string,
    },
  },
} as const;

export type SiteConfig = typeof site;
