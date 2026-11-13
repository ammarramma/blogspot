# Ammar — Portfolio

Personal portfolio for **Ammar**, a backend and web developer based in
Lhokseumawe, Indonesia. Built as a single-page, terminal-inspired site: every
section is framed as a shell command and its output.

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

- `src/data/profile.js` — identity, about, neofetch specs, skills, career
- `src/data/projects.js` — project cards

These are the single source of truth. The resume PDF is generated from the same
data, so updating the site content and running `npm run resume` keeps both in
sync.

## Design

The visual direction, tokens, components, and copy decisions are documented in
[`DESIGN.md`](./DESIGN.md).

Highlights:

- Near-black phosphor palette with a single green accent.
- JetBrains Mono for structure, IBM Plex Sans for body copy.
- Reusable terminal window, prompt, status pill, and `git log` timeline.
- Motion respects `prefers-reduced-motion`.

## Project structure

```
src/
  components/   StatusBar, Footer, TerminalWindow, SectionHeader, StatusPill, Reveal
  data/         profile.js, projects.js
  sections/     Hero, About, Skills, Projects, Experience, Contact
  App.jsx
  index.css     design tokens + base styles
scripts/
  generate-resume.mjs
public/
  avatar.jpg, resume.pdf, favicon.svg
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
