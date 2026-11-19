# AGENTS.md — forxhunter.github.io

Guidelines for AI agents (Claude Code, Codex, Copilot Workspace, and others) working on
this repository.

**Read [`CLAUDE.md`](CLAUDE.md) first.** It is the single source of truth for this
repository: what the project is, the toolchain, architecture, the URL-compatibility
rules that must not be broken, coding conventions, common pitfalls and how to verify a
change. This file used to repeat that material and drifted out of date; it now points at
it instead so there is only one copy to keep correct.

---

## Quick orientation

1. Read `CLAUDE.md`
2. Read `src/config/site.ts` — every site setting, typed and documented
3. Read `src/content.config.ts` — content schemas before adding frontmatter fields
4. Run `yarn build` to confirm the baseline passes

## Before you finish

```bash
yarn build
yarn test
yarn astro check
```

All three must pass. Do not run `yarn format`; it rewrites the whole repository.
Format only the files you touched, with `yarn prettier --write <file>`.

---

## Repository layout

```text
forxhunter.github.io/
├── src/
│   ├── config/site.ts        ← single config file (start here)
│   ├── content/              ← collections: posts, projects, announcements
│   ├── data/                 ← papers.bib, resume.json, about.mdx, repositories.yml
│   ├── layouts/              ← Base, Page, Post, Distill
│   ├── components/           ← UI components
│   ├── pages/                ← Astro routes
│   └── styles/               ← global.css, _colors.css, _typography.css
├── public/                   ← static assets, favicon, .nojekyll
├── .github/workflows/        ← deploy.yml (build → gh-pages)
├── CLAUDE.md                 ← architecture and conventions (authoritative)
└── AGENTS.md                 ← this file
```

`README.md`, `QUICKSTART.md` and `CUSTOMIZE.md` are upstream as-folio documentation,
kept for reference. They describe the template, not this site.
