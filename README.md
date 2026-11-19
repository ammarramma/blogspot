# Ammar — Portfolio

Personal portfolio for **Ammar**, a backend, web, and security engineer based in
Lhokseumawe, Indonesia. A single-page editorial portfolio built around clear
typography, a calm Rosé Pine palette, and a uniform project grid.

## Stack

- React 19 + Vite 8
- Tailwind CSS 4
- Framer Motion
- EmailJS (contact form)
- PDFKit (resume generation)

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` by default.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |
| `npm run resume` | Regenerate `public/resume.pdf` from the data layer |

## Content

All copy and project data live in two files:

- `src/data/profile.js` — identity, about, quick facts, skills, career
- `src/data/projects.js` — project cards, status/version metadata, and derived
  filter categories

These are the single source of truth. Add a project object and the grid,
category tabs, and resume pick it up automatically. The site shows every project
and every bullet; the one-page resume uses up to the first four projects with a
shortened bullet list to stay on one A4 page.

## Design

The visual direction, tokens, components, and copy decisions are documented in
[`DESIGN.md`](./DESIGN.md).

Highlights:

- Rosé Pine palette: dark by default, with a persisted Dawn Light toggle in the
  navigation bar.
- Playfair for display, Atkinson Hyperlegible for body copy, JetBrains Mono for
  small technical metadata.
- Editorial section headers with small Rosé Pine index numbers.
- A uniform two-column project grid; featured work is marked with a badge rather
  than a layout exception.
- Filterable project grid with animated layout transitions and live/source links.
- Motion respects `prefers-reduced-motion`.

## Project structure

```
src/
  components/   StatusBar, Footer, SectionHeader, StatusPill, Reveal
  data/         profile.js, projects.js
  sections/     Hero, About, Skills, Projects, Experience, Contact
  App.jsx
  index.css     design tokens + base styles
scripts/
  generate-resume.mjs
public/
  resume.pdf, favicon.svg
```

## Contact form

The form uses EmailJS and reads credentials from Vite environment variables:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Create a `.env` locally; never commit production keys.

## Deployment

Any static host works. Build with `npm run build` and serve `dist/`. Because
navigation is anchor-based, no SPA rewrite rules are required.
