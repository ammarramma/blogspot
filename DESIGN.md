# Portfolio — Design Brief

**Owner:** Ammar · Backend, Web & Security Engineer
**Direction:** Editorial / modern studio · Rosé Pine (dark by default, Dawn light) · single-page scroll · English
**Status:** Implemented. Content lives in `src/data/profile.js` and
`src/data/projects.js`; the one-page resume PDF is generated from the same data
with `npm run resume`.

---

## 1. Concept

> A calm, editorial portfolio for an engineer who cares about clarity.

The site is set like a well-made studio profile: large Playfair headlines, quiet
Atkinson Hyperlegible body copy, thin rules, generous whitespace, and a small
amount of JetBrains Mono for technical metadata. Rosé Pine supplies the
atmosphere, not decoration.

**Rules**
- No terminal chrome, shell prompts, fake command output, window dots, or
  blinking cursors.
- No gradient blobs, glassmorphism, floating 3D shapes, or sponsor/donation UI.
- Color is semantic: iris/pine = interactive, rose = live, gold = in
  development, muted = metadata.
- Motion is functional (reveal, focus, filter transition), never ornamental.
- Every project card is the same size; featured work is a badge, not a layout
  exception.

---

## 2. Design tokens

### 2.1 Rosé Pine palette

The theme is implemented with OKLCH variables in `src/index.css` and mapped into
Tailwind v4 through `@theme inline`. Hex values below are the canonical Rosé
Pine equivalents.

| Token | Dark (Main) | Light (Dawn) | Use |
|---|---|---|---|
| `--background` | `#191724` | `#faf4ed` | Page background |
| `--foreground` | `#e0def4` | `#575279` | Primary text |
| `--card` | `#1f1d2e` | `#fffaf3` | Cards and form surfaces |
| `--muted` | `#26233a` | `#f2e9e1` | Quiet surfaces |
| `--muted-foreground` | `#6e6a86` | `#797593` | Secondary text, metadata |
| `--border` | `#403d52` | `#dfdad9` | Hairlines, borders |
| `--primary` | `#e0def4` | `#575279` | Emphasis, active nav, buttons |
| `--ring` | `#c4a7e7` | `#907aa9` | Focus ring, hover borders |
| `--chart-1` | `#f6c177` | `#ea9d34` | Gold / in development |
| `--chart-2` | `#eb6f92` | `#b4637a` | Rose / live indicator |
| `--chart-3` | `#31748f` | `#286983` | Pine |
| `--chart-4` | `#9ccfd8` | `#56949f` | Foam / accents |
| `--chart-5` | `#c4a7e7` | `#907aa9` | Iris / timeline work marker |
| `--destructive` | `#eb6f92` | `#b4637a` | Form errors |

Selection uses `--primary` / `--primary-foreground`. Body background and color
transition over `200ms` when the theme changes.

### 2.2 Theme system

- `<html class="dark" data-theme="dark">` is the default.
- An inline pre-paint script in `index.html` reads `localStorage['theme']`
  (`'dark'` or `'light'`) and applies the class, `data-theme`,
  `color-scheme`, and the `theme-color` meta value before React loads.
- The navigation bar exposes a visible **Dark / Dawn** toggle with a moon/sun
  icon. It updates the same attributes and persists the preference; failures are
  caught so private-mode browsing still works.
- CSS uses `@custom-variant dark (&:is(.dark *))`, so every component works in
  both variants without duplicated markup.

### 2.3 Typography

| Role | Family | Notes |
|---|---|---|
| Display | **Playfair** | Hero name, section headings, project and timeline titles |
| Body / UI | **Atkinson Hyperlegible** | Paragraphs, navigation, labels, buttons |
| Technical metadata | **JetBrains Mono** | Section numbers, stack chips, project URLs |

Loaded from one Google Fonts request in `index.html`:
Atkinson Hyperlegible 400/700, JetBrains Mono 400–700, Playfair 400/600/700.

Scale (fluid where noted):
- Hero name: `clamp(4rem, 11vw, 9rem)` · Playfair 600 · tracking `-0.05em`
- Section title: `1.875rem` → `2.25rem` · Playfair 600
- Body: `0.9375rem` / `1.75` · Atkinson 400 · max `68ch`
- Label / meta: `0.625–0.6875rem` · uppercase tracking `0.12–0.22em`
- Project title: `1.5rem` · Playfair 600

The root font size is fluid: `clamp(16px, 8px + 0.625vw, 20px)`, so type,
spacing, and radii grow continuously with the viewport.

### 2.4 Space & layout

- Base unit `4px`.
- Page shell `.shell`: `max-width: clamp(72rem, 78vw, 92rem)`, gutter `24px`
  (`32px` from `1280px`).
- Section rhythm: `pb-24 sm:pb-32`; the hero uses `pt-32 sm:pt-40` and a natural
  height rather than a forced `100svh`.
- Radius: `0.5rem` (`--radius`); pills use a full radius.
- `section[id]` has `scroll-margin-top: 5rem` to clear the fixed navigation bar.
- The hero's dotted background is a `::before` layer with a radial mask, so the
  pattern fades without affecting the content above it.

### 2.5 Breakpoints

- `< 768px`: single column; condensed navigation with a menu and theme toggle;
  hero product cards stack.
- `768–1024px`: uniform two-column project grid.
- `> 1024px`: full layout; quick facts beside About; contact form beside
  socials.
- `1280px+`: type/spacing scale grows with the viewport.
- `1600px+`: shell becomes viewport-proportional (`78vw`).

---

## 3. Signature components

### 3.1 Navigation bar

Fixed `64px` tall, `bg-background/85` with `backdrop-blur-md` and a bottom
hairline.

- Left: serif **Ammar** wordmark plus a small `PORTFOLIO` label, linking to
  `#top`.
- Right: standard text navigation — About, Stack, Projects, Experience,
  Contact — with an animated underline driven by an `IntersectionObserver`
  scrollspy.
- Theme toggle shows the current variant (`Dark` with a moon, `Dawn` with a sun)
  and exposes `aria-label`, `aria-pressed`, and a descriptive title.
- Mobile: wordmark, theme toggle, and a proper menu icon. The menu is a
  full-width text list; `Esc` closes it.

### 3.2 Section headers

`SectionHeader` receives an index, title, optional eyebrow, and description.

- Small mono index (`01`, `02`, …) in `--primary`.
- Playfair section title.
- An uppercase eyebrow on the right at desktop sizes.
- A full-width hairline and an optional readable description below.

No shell commands, prompts, or fake output.

### 3.3 Quick facts

The About section pairs the narrative with an **At a glance** card:

```
At a glance                         QUICK FACTS
───────────────────────────────────────────────
Role            Backend, Web & Security Engineer
Focus           Secure APIs, full-stack apps, auditing
Education       D-IV Informatics, Polnes
Location        Lhokseumawe, Aceh, ID
Core stack      Go · Laravel · React · Supabase
Infrastructure  Linux VPS · Caddy · Cloudflare
Security        Auditing · SSRF · Header hardening
Status          Open to internships
```

Rows are separated by hairlines; the card lifts gently on hover.

### 3.4 Project cards & filters

- Every card uses the same structure and sizing: category, optional **Featured**
  badge, serif title, subtitle, type/version, outcome bullets, stack chips, and
  footer links.
- The grid is always `grid-cols-1 md:grid-cols-2`. Featured projects do **not**
  span two columns; they only receive the badge in the top-right corner.
- `Live Demo ↗` appears only when `liveUrl` exists; `Source ↗` only when `repo`
  exists. Links open in a new tab with `noopener noreferrer`.
- Category tabs (`All`, `Security & API`, `Web Apps`, `CLI / Go`) are derived
  from `projectCategories`, exposed as a `role="group"` with `aria-pressed`, and
  animated with a shared `layoutId` pill.
- Cards animate with Framer Motion `layout` inside `AnimatePresence
  mode="popLayout"`; the live count reads `NN / NN projects`.
- A new object in `projects.js` automatically appears in the grid, filters, and
  resume generator. The website always renders all projects and all bullets.

---

## 4. Page structure & copy

Single page. Anchors: `#top`, `#about`, `#stack`, `#projects`, `#experience`,
`#contact`.

### 4.1 Hero

```
BACKEND · WEB · SECURITY                    LHOKSEUMAWE, INDONESIA — UTC+7
────────────────────────────────────────────────────────────────────────
INDEPENDENT PORTFOLIO · 2026

Ammar.

Backend, Web & Security Engineer
D-IV INFORMATICS ENGINEERING STUDENT · POLNES

I build secure backends, fast web apps, and interfaces that feel effortless —
from Go APIs on a Linux VPS to React frontends on the edge.

[ View selected work ]  [ Get in touch ]  Download CV ↓
```

- Right rail: open-to-work status, focus, current work, base, and a short
  editorial quote.
- Two live-product cards below, derived from featured projects with a `liveUrl`:
  Vibe-Check (`scan.ammarramma.dev`) and mapi
  (`api.ammarramma.dev/healthz`).

### 4.2 About

Three paragraphs:
1. D-IV Informatics Engineering student working across backend, full-stack, and
   web security with Go/Gin, Laravel, React/TypeScript, and Supabase, shipped to
   Linux VPS and Cloudflare's edge.
2. Security by default: automated auditing, SSRF/header hardening, rate
   limiting, secret-leak detection, plus self-managed Caddy/systemd/Cloudflare
   infrastructure.
3. Visual Communication Design background → hierarchy and clarity in complex
   dashboards; learning in public through live products.

Plus the quick-facts card (3.3) and three small context chips.

### 4.3 Stack

Grouped tags; no percentage bars (they imply precision that does not exist).

| Group | Items |
|---|---|
| Languages | Go, TypeScript, JavaScript, PHP, Python, Bash, SQL |
| Backend & APIs | Gin, Laravel, REST API Design, Supabase, MySQL, Relational DB Design |
| Frontend | React, Tailwind CSS, HTML, CSS, Vite |
| Cloud & Infra | Cloudflare Workers, Cloudflare Edge, Caddy, Linux VPS, systemd |
| Security | Web Security Auditing, SSRF Mitigation, HTTP Header Hardening, Secret & Leak Scanning, Rate Limiting |
| Tools & Workflow | Git, GitHub, Linux CLI, PHPUnit |

Pills lift and shift to the ring color on hover/focus.

### 4.4 Projects

Five projects in a uniform two-column grid; all bullets are shown.

**Vibe-Check Security Scanner** · `v1.0.0` · released · featured
Security & API · React 19 · TypeScript · Tailwind CSS · Cloudflare Workers

**mapi — Modular API Gateway** · `v1.0.0` · released · featured
Security & API · Go · Gin · Caddy · Linux VPS · systemd

**SIPERPUS PNL** · `v1.3.0` · released
Web Apps · React · TypeScript · Supabase · Tailwind CSS

**Prayer Times** · `v0.1.1` · released
CLI / Go · Go · TUI

**Group Manage** · in development
Web Apps · PHP · Laravel · MySQL · PHPUnit

Copy and links live in `src/data/projects.js`; the site is the complete view.

### 4.5 Experience

A clean timeline rather than a commit log: year, type, role or school, metadata,
and optional bullets. Work uses iris, education uses muted, certification uses a
contrast-safe warm tone.

### 4.6 Contact

- Left: short invitation, direct links (email, GitHub, LinkedIn), and location.
- Right: a titled card with Name, Email, and Message fields.
- Success reads **Message sent.** with a reply expectation; errors are announced
  through `aria-live` and offer the direct email as a fallback.
- The site uses `contact@ammarramma.dev` (domain-bound); `resume.pdf` uses
  `ammarramma.work@gmail.com` so printed CVs survive a domain change.
- EmailJS env names remain `VITE_EMAILJS_SERVICE_ID`,
  `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.

### 4.7 Footer

Serif wordmark, a one-line positioning statement, social links, and back to top.
No shell prompt or terminal joke.

---

## 5. Resume PDF

`scripts/generate-resume.mjs` generates **exactly one A4 page**.

- Page margin `34pt`; compact body type `8.4pt`, project titles `9.2pt`, project
  gap `10pt`.
- Two columns: education / certification / skills on the left; profile,
  projects, and experience on the right.
- The PDF shows the first four projects (`projects.slice(0, 4)`), with up to
  three of the most important bullets per project. The website still shows every
  project and every bullet.
- No continuation header, page-two flow, or multi-page footer.
- The script asserts that the measured content ends above the bottom margin.

---

## 6. Motion

- Hero: container/item variants with `90ms` stagger and `80ms` delay; items
  fade + rise `14px` over `500ms` with `[0.22, 1, 0.36, 1]`.
- Sections: `Reveal` uses `whileInView`, `16px` rise, `500ms`, once.
- Project filters: shared-layout pill; grid reflows with `layout` and
  `AnimatePresence mode="popLayout"`.
- Hover: `200ms` lift (`-translate-y-1`), border → `ring/60`, shadow `md`;
  buttons use a smaller `-translate-y-0.5`.
- Everything is disabled by `useReducedMotion` and a global
  `prefers-reduced-motion` CSS block, including hover transforms and smooth
  scrolling.

---

## 7. Accessibility & quality

- Text contrast is AA in both variants; low-opacity text is limited to
  decorative separators and placeholders.
- Visible `:focus-visible` ring: `2px solid var(--ring)`, offset `3px`.
- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`; skip link.
- Real `<label>` for every form field; status messages via `aria-live`.
- Filter buttons expose `aria-pressed`; the theme toggle exposes
  `aria-label`/`aria-pressed`.
- Mobile menu is keyboard operable; `Esc` closes it.
- No text baked into images.
- Target Lighthouse: 95+ across all categories.

---

## 8. Implementation map

1. **Data** — `src/data/profile.js` (identity, about, facts, skills, career)
   and `src/data/projects.js` (schema, projects, derived categories).
2. **Tokens** — Tailwind v4 `@theme inline` + Rosé Pine variables in
   `src/index.css`; fonts and pre-paint theme script in `index.html`.
3. **Primitives** — `SectionHeader`, `StatusPill`, `Reveal`, `StatusBar`,
   `Footer`.
4. **Sections** — `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`.
5. **Resume** — `scripts/generate-resume.mjs` renders the same data to a
   single-page A4 PDF.
6. **Pass** — responsive, keyboard, reduced motion, lint, build, PDF check.

### Out of scope

- Blog / writing section.
- CMS or backend for content.
- Custom 3D or WebGL.
- Sponsor/donation UI.

---

## 9. Resolved decisions

1. **Resume PDF** — generated from the data layer with `npm run resume` and
   served from `public/resume.pdf`; text-only, no photo, one page.
2. **Project grid** — uniform cards; the Featured badge replaces the old
   full-width featured treatment.
3. **Phone number** — kept private; the site shows email, GitHub, and LinkedIn
   only.
4. **SIPERPUS repo** — `github.com/RPL-TI-3B/ver3` is public and linked.
5. **Theme default** — dark (Rosé Pine Main); Dawn Light is opt-in and persisted
   in `localStorage`.
6. **Hero pattern** — the dotted background is a masked pseudo-element, not a
   mask on the section, so content stays fully opaque.
