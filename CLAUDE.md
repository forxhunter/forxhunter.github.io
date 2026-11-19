# CLAUDE.md — forxhunter.github.io

Instructions for Claude Code when working on this repository.

---

## Project overview

This is **Tianyu Wu's personal academic site**, published at
<https://forxhunter.github.io>. It is built on the
[as-folio](https://github.com/dadangnh/as-folio) Astro template (v2.0.1, MIT), which was
itself a port of the Jekyll theme al-folio. The site migrated from Jekyll to Astro in
November 2026.

**This is not the template.** as-folio's own docs (`README.md`, `QUICKSTART.md`,
`CUSTOMIZE.md`, and the demo personas they mention) are upstream material kept for
reference. Nothing here is a reusable template, there is no upstream remote, and demo
content for Einstein/Torvalds has been removed. Write for this site, not for template
users.

All site settings live in `src/config/site.ts`.

---

## Package manager and toolchain

Node 24+ and Yarn 4 through Corepack. **Use `yarn`, never `npm` or `npx`.**

```bash
corepack enable          # once per machine
yarn install             # install dependencies
yarn dev                 # dev server
yarn build               # production build + pagefind index
yarn test                # vitest unit tests
yarn astro check         # TypeScript / Astro diagnostics
yarn lint                # ESLint
```

**Do not run `yarn format`.** It is `prettier --write .` and rewrites the entire
repository, including vendored files under `public/assets/js/distillpub/`, producing a
diff of ~100 unrelated files. Format only what you touched:

```bash
yarn prettier --write path/to/file
```

Because `core.autocrlf` is true on this machine, files prettier rewrites can show as
modified in `git status` with no content change. `git diff --name-only` shows the real
set; use it to check what you actually changed.

---

## Architecture

### Content Layer (Astro 6)

- `src/content.config.ts` — collection schemas, `glob` loader + Zod
- Collections: **`posts`, `projects`, `announcements`**. That is all of them. The
  template's `people`, `teaching` and `books` collections and their pages were removed.
- Use `render(entry)`, not `entry.render()` (Astro 6 API)

### URL compatibility — do not break this

The site published URLs under Jekyll for over a year, and they must keep working.

- Those three collections use a custom `generateId: keepPath`, which uses the file path
  verbatim. **Astro's default lowercases and slugifies ids**, which would 404
  `/blog/2025/work_with_LLM/` and `/blog/2025/TPU-vs-GPU/`. Do not remove it, and do not
  rename existing content files.
- Posts live at `src/content/posts/<year>/<slug>.md` and serve at `/blog/<year>/<slug>/`.
- `src/pages/blog/[year].astro` redirects Jekyll's old `/blog/<year>/` archives to
  `/blog/year/<year>/`.
- `src/pages/feed.xml.ts` re-exports the RSS route so `/feed.xml` keeps working
  alongside `/rss.xml`.

After changing routing, check every URL in the live `sitemap.xml` still builds.

### Content format

Posts and projects are plain **`.md`, not `.mdx`**, on purpose. MDX parses `{` in prose
as JavaScript, which breaks the LaTeX in `posts/2026/silent-pathway.md`. Raw HTML in
Markdown passes through, which is how that post's figure panels and the project pages'
`<video>` blocks work.

There is **no emoji-shortcode plugin**. Jekyll expanded `:world_map:` through jemoji;
Astro does not. Write the emoji character itself.

### CSS

- Tailwind v4 via `@tailwindcss/vite` — no `tailwind.config.js`
- Theme colors are CSS custom properties in `src/styles/_colors.css`
- Dark mode via `[data-theme='dark']` on `<html>`. **Never use Tailwind's `dark:`
  prefix** — override the CSS variable instead.
- `--navbar-height` is a variable; use it for sticky offsets rather than a literal.
- **`.prose` typography is hand-written** in `src/styles/global.css`. The class name
  comes from `@tailwindcss/typography`, which is _not_ installed, and Tailwind's
  preflight zeroes margins and list styles. Without those rules headings render at body
  size and paragraphs run together. If rendered Markdown looks unstyled, that block is
  where to look.
- Wide tables scroll inside themselves (`.prose table` is `display: block;
overflow-x: auto`) so they cannot push the page sideways on a phone.
- al-folio's Bootstrap classes (`.row`, `.col-*`, `.img-fluid`, `.z-depth-1`) survive as
  compatibility shims in `global.css`, because migrated content still uses them.

### Components worth knowing

- **`ProjectCard`** sizes itself for a **flex** row: its root is `.col` with its own
  100% / 50% / 33.333% breakpoints. In a CSS grid those are ignored and every card
  collapses to min-content. Put it in `display: flex; flex-wrap: wrap`.
- A project's **`url`** is a link rendered as a button on its page (labelled by
  `url_label`, default "Website"). **`redirect`** is the separate field that replaces
  the project page with an external site. The card links to the project page unless
  `redirect` is set — `url` must not capture the card.
- `Post.astro` and `Distill.astro` show the TOC sidebar only when the post's `toc` flag
  is true. A wide figure in a post with `toc: false` gets the full column.

### Data files

- `src/data/papers.bib` — the real bibliography; `/publications/` is generated from it
- `src/data/resume.json` — the CV (`site.cv.format` is `jsonresume`)
- `src/data/about.mdx` — the home page bio
- `src/data/repositories.yml` — GitHub cards on `/repositories/`
- `src/data/coauthors.yml`, `venues.yml`, `citations.yml` — empty stubs; the pages read
  them, so keep the files, but there is nothing in them to maintain
- Never fetch BibTeX at runtime; it is parsed at build time by `src/utils/bibtex.ts`

Unused leftovers from the template: `src/data/cv.yml` (RenderCV format, unused since the
CV renders from `resume.json`) and `scripts/update-citations.ts` with its
`yarn citations:update` script (every citation badge is off, and the weekly workflow was
removed). Harmless, but do not treat them as live.

---

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to the **`gh-pages`** branch,
which is what GitHub Pages serves. A push to `main` deploys; a pull request builds
without deploying.

- A `concurrency` group lets a newer push supersede an in-flight deploy. Two pushes
  seconds apart used to race and fail with `cannot lock ref 'refs/heads/gh-pages'`.
- `public/.nojekyll` must stay. Without it GitHub Pages runs Jekyll over the output and
  drops the `_astro/` directory.
- lychee checks internal links in the built site after deploying.
- `fetch-depth: 0` is required: the sitemap reads each file's last commit date.
- A full deploy takes about 40 seconds.

`site.features.viewTransitions` is **false** on purpose. The silent-pathway post loads
its charts with a classic script that a client-side page swap would not re-run.

---

## Testing

`vitest.setup.ts` pins `process.env.TZ = 'UTC'`. Two date tests assert calendar days for
UTC timestamps and fail in any timezone west of UTC. Keep the pin.

---

## Coding conventions

### Astro components

- CSS in scoped `<style>` blocks or inline styles using CSS variables
- Prefer CSS custom properties over Tailwind utilities for component layout
- `<script>` blocks are vanilla JS; `is:inline` only when it must run before hydration
  (dark-mode FOUC prevention)
- Scoped styles do not reach a child component's elements — use `:global()` when you
  genuinely need to, but prefer giving the child a container it already understands

### TypeScript

- Strict mode. No `any` without a comment explaining why.
- `as const` on config objects; `as 'literal'` for string-union fields in `site.ts`
- Prefer `z.coerce.string()` for data YAML may parse as a number

### Security

- Never pass user-provided or external content to `set:html` / `innerHTML`; use
  `textContent`

### No backwards-compat hacks

Delete unused code outright. No `// removed` comments, no `_var` renaming to silence
warnings.

---

## Common pitfalls

| Issue                                   | Fix                                                                |
| --------------------------------------- | ------------------------------------------------------------------ |
| Markdown renders unstyled               | `.prose` rules in `global.css`, not a Tailwind plugin              |
| Project cards collapse to a sliver      | `ProjectCard` needs a flex container, not CSS grid                 |
| Clicking a project card leaves the site | `url` is a button; `redirect` replaces the page                    |
| A URL 404s after a rename               | `generateId: keepPath` — ids are the file path, verbatim           |
| LaTeX breaks the build                  | Keep the file `.md`; MDX reads `{` as JavaScript                   |
| Emoji shows as `:name:`                 | No jemoji; write the character                                     |
| Date test fails locally only            | Timezone — `vitest.setup.ts` pins UTC                              |
| `git status` shows ~100 changed files   | `yarn format` ran; `git diff --name-only` shows the real set       |
| TOC crowds a wide figure                | Set `toc: false` in the post's frontmatter                         |
| `render()` error                        | `const { Content } = await render(entry)`                          |
| Dark mode flash                         | `<script is:inline>` reading `localStorage` in `<head>` before CSS |
| Icon not found at build                 | `~icons/<collection>/<name>`; unknown names are build errors       |

---

## Build verification

After any significant change:

```bash
yarn build
yarn test
yarn astro check
```

The build must exit 0 with 0 TypeScript errors, produce the expected pages in `dist/`,
and include `dist/pagefind/`. For anything touching routing, layout or content, also
load the affected pages and check them — `yarn preview` serves the built site.
