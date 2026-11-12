# Portfolio Redesign — Design Brief

**Direction:** Terminal / TUI dark · Single-page scroll · English (professional)
**Source of truth:** `CV-Ammar.png` — content in the current site is outdated and will be replaced.
**Status:** Implemented. Content comes from `CV-Ammar.png`; the resume PDF is
generated from the same data (`npm run resume`). Arch Linux is kept in the
neofetch panel, and the phone number stays off the public site.

---

## 1. Concept

> The portfolio behaves like a shell session.

Every section is framed as a command and its output. The site should feel like a
well-configured terminal: quiet, precise, fast, and intentional. The Visual
Communication Design background shows up in the typography and spacing, not in
decoration.

**Rules**
- No gradient blobs, no glassmorphism, no floating 3D shapes.
- Color is semantic: green = interactive/active, amber = in progress, red = error.
- Motion is functional (reveal, focus, cursor), never ornamental.
- Monospace for structure; humanist sans for reading.

---

## 2. Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `--bg-0` | `#0A0C0B` | Page background |
| `--bg-1` | `#101311` | Panels, cards |
| `--bg-2` | `#161A17` | Hover / elevated |
| `--line` | `#262C28` | Hairlines, borders |
| `--line-strong` | `#3A423C` | Hover borders, focus |
| `--fg` | `#E8ECE6` | Primary text |
| `--fg-muted` | `#9AA39B` | Secondary text |
| `--fg-dim` | `#6B746D` | Metadata, timestamps |
| `--accent` | `#8BE9A8` | Prompt, links, active nav |
| `--accent-strong` | `#5FE08A` | Hover, focus ring |
| `--amber` | `#E6B450` | In-development status, warnings |
| `--red` | `#F07178` | Errors, unavailable status |

Selection: `background: #8BE9A8; color: #0A0C0B`.

### Typography

| Role | Family | Size / weight |
|---|---|---|
| Display / UI / labels | **JetBrains Mono** | 400 / 500 / 700 |
| Body copy | **IBM Plex Sans** | 400 / 500 / 600 |

Scale (fluid where noted):
- Hero name: `clamp(2.75rem, 7vw, 5.5rem)` · Mono 700 · tracking `-0.04em`
- Section title: `1.5rem` · Mono 600
- Command line: `0.9375rem` · Mono 400
- Body: `1rem` / `1.75` · Plex Sans 400 · max `68ch`
- Label: `0.75rem` · Mono 500 · uppercase · tracking `0.12em`
- Meta: `0.8125rem` · Mono 400 · `--fg-dim`

### Space & layout
- Base unit `4px`.
- Container `1120px`, gutter `24px` (`32px` desktop).
- Section padding `clamp(5rem, 10vw, 8rem)` vertical.
- Border radius: `6px` (windows and cards) — deliberately less round than v1.
- Hairline `1px solid var(--line)` everywhere.

### Breakpoints
- `< 768px`: single column, condensed status bar, cards stack.
- `768–1024px`: two-column project grid.
- `> 1024px`: full layout, neofetch panel beside About.

---

## 3. Signature components

### 3.1 Status bar (navigation)
Fixed top, `44px` tall, `--bg-0/90` with backdrop blur and bottom hairline.

```
ammar@portfolio:~$                          about  projects  experience  contact
```

- Left: identity, links to top.
- Right: section links, mono, lowercase, `--fg-muted`; active gets `--accent` + `[ about ]` brackets.
- Scrollspy driven by `IntersectionObserver`.
- Mobile: identity + `:` button opening a full-width menu styled as a command list.

### 3.2 Terminal window
Reusable frame used by the hero and each project card.

```
┌─ ammar@lhokseumawe ────────────────────────┐
│                                            │
│  $ whoami                                  │
│  Ammar                                     │
│                                            │
└────────────────────────────────────────────┘
```

- Title bar `32px`, mono `0.75rem`, `--fg-dim`, bottom border.
- Optional traffic dots replaced by a single `●` in `--accent` to avoid the macOS cliché.
- Body padding `20px` mobile / `28px` desktop.

### 3.3 Prompt
- `$` in `--accent`, command in `--fg`, output in `--fg-muted`.
- Blinking block caret `▊` at the end of interactive lines (1s step-end), disabled under `prefers-reduced-motion`.
- Section headers reuse it: `$ cat about.md`, `$ ls ~/projects`, `$ git log --career`, `$ mail ammar`.

### 3.4 Neofetch panel
Two-column panel: avatar on the left, spec table on the right, in the About section.

```
ammar@lhokseumawe
─────────────────
Role        Backend / Web Developer
Education   D-IV Teknik Informatika, Polnes
Location    Lhokseumawe, Aceh, ID
Languages   PHP · TypeScript · Go · Python · Bash
Frameworks  Laravel · Supabase · React
Tools       Git · GitHub · Linux CLI
Status      Open to internships
```

Avatar is rendered in grayscale by default and returns to color on hover, framed
with a hairline and the caption `avatar.jpg · 512×512 · image/jpeg` — a nod to
file metadata.

### 3.5 Career log
Experience, education, and certification rendered as `git log --career`:

```
* 2025  cert    VSGA — Web Developer
* 2024  edu     D-IV Teknik Informatika — Politeknik Negeri Lhokseumawe
* 2023  work    Atjeh Mediatama Indonesia — Internship (PKL)
* 2020  edu     SMK Negeri 2 Lhokseumawe — Visual Communication Design
```

- Left rail `2px` with commit nodes.
- Hash column in `--fg-dim`, type tag in `--accent`, content in `--fg`.
- Bullets under work entries stay in `--fg-muted`.

---

## 4. Page structure & copy

Single page. Anchor ids: `#about`, `#projects`, `#experience`, `#contact`.

### 4.1 Hero — `$ whoami`

**Output**
```
Ammar
Backend & Web Developer
D-IV Information Technology student · Lhokseumawe, Indonesia
```

**Subline**
> I build web applications with Laravel, Supabase, and Go — and I care about how
> they feel, not just how they work.

**Status pill:** `● Open to internship opportunities`
**CTAs:** `[ view projects ]` → `#projects` · `[ get in touch ]` → `#contact`
**Secondary:** `resume.pdf ↓` (only once a PDF exists)

### 4.2 About — `$ cat about.md`

> I'm an Information Technology student at Politeknik Negeri Lhokseumawe,
> focused on web and backend development. I build applications with PHP,
> Laravel, JavaScript, and TypeScript, and I integrate Supabase for
> authentication, databases, and data storage.
>
> I work from the terminal — Git, GitHub, and the Linux CLI are part of my daily
> workflow. Before IT, I studied Visual Communication Design, which is why I
> care about hierarchy, clarity, and interfaces that don't need explaining.
>
> I'm currently looking for an internship where I can contribute to a real
> software team and keep learning in public.

Plus the **neofetch panel** (3.4).

### 4.3 Skills — `$ stack --list`

Grouped tags, no percentage bars (they imply precision that doesn't exist).

| Group | Items |
|---|---|
| Languages | PHP, JavaScript, TypeScript, Go, Python, Bash |
| Backend & Data | Laravel, Supabase, MySQL, Relational Database Design |
| Frontend | React, HTML, CSS |
| Tools & Workflow | Git, GitHub, Linux CLI, PHPUnit |
| Focus | Web Development, Backend Development, Automation |

### 4.4 Projects — `$ ls ~/projects`

Three cards, each a Terminal window with project name, version/status, stack
chips, bullets, and a repo link.

**SIPERPUS PNL** · `v1.3.0` · Team project
React · JavaScript · TypeScript · Supabase
- Contributed to a web application for library management.
- Built interface components and application features.
- Integrated Supabase for authentication, database, and data storage.
- Collaborated in a shared team repository.
→ `github.com/RPL-TI-3B/ver3`

**Prayer Times** · `v0.1.1` · Personal project
Go
- Built a terminal UI application in Go to display prayer times.
- Implemented a keyboard-driven terminal interface.
- Published a GitHub release with a distributable binary.
→ `github.com/ammarramma/prayer-times`

**Group Manage** · `in development` · Personal project
PHP · Laravel · MySQL
- Built a Laravel application for group task management.
- Implemented task creation, assignment, and status tracking.
- Added authorization and data validation.
- Tested features with PHPUnit.
→ `github.com/ammarramma/group-manage`

### 4.5 Experience — `$ git log --career`

**Atjeh Mediatama Indonesia** · 2023 · Internship (PKL)
- Supported print media production and printing operations.
- Operated production equipment and assisted with simple design work.
- Supported daily operations as required by the team.

**Pendidikan**
- Politeknik Negeri Lhokseumawe — D-IV Teknik Informatika (2024–present)
- SMK Negeri 2 Lhokseumawe — Visual Communication Design (2020–2021, 2022–2024)

**Certification**
- VSGA — Web Developer (2025)

### 4.6 Contact — `$ mail ammar`

> Have a project, an internship opening, or just want to talk shop? My inbox is
> open.

Form (EmailJS retained) styled as prompt lines:
```
from:     [ your name            ]
email:    [ you@example.com      ]
message:  [ ...                  ]
          [ send message ]
```
- Success state: `$ message sent` + `I'll get back to you within a day or two.`
- Direct links: email, GitHub, LinkedIn.

### 4.7 Footer — `$ exit`

`© 2026 Ammar · Built with React, Tailwind, and too much time in the terminal.`
Links: GitHub · LinkedIn · Email · Back to top.

---

## 5. Motion

- Hero lines stagger `80ms`, `translateY(8px)` + fade, once.
- Section content reveals on view: `12px` rise, `400ms`, `once: true`.
- Caret blink `1s step-end infinite`.
- Nav active state: instant color, `120ms` underline width transition.
- Hover: `>` prefix slides `4px`, border shifts to `--line-strong`.
- All motion disabled under `prefers-reduced-motion: reduce`.

---

## 6. Accessibility & quality

- WCAG AA contrast for all text (`--fg-muted` on `--bg-0` passes).
- Visible `:focus-visible` ring: `2px solid var(--accent-strong)`, offset `3px`.
- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`; skip link.
- Real `<label>` for every form field; errors announced via `aria-live`.
- Mobile menu keyboard operable, `Esc` closes, focus returns to trigger.
- No text baked into images.
- Target Lighthouse: 95+ on all four categories.

---

## 7. Implementation plan

1. **Data layer** — `src/data/profile.js`, `src/data/projects.js` with CV as the
   single source of truth.
2. **Tokens** — Tailwind v4 `@theme` in `src/index.css`; fonts in `index.html`.
3. **Primitives** — `TerminalWindow`, `Prompt`, `SectionHeader`, `StatusPill`,
   `Reveal`.
4. **Sections** — `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`.
5. **Shell** — `StatusBar` (nav + scrollspy), `Footer`.
6. **Routing** — remove `react-router-dom`; one page + anchor navigation.
7. **Pass** — responsive, keyboard, reduced motion, lint, build.

### Out of scope (for now)
- Blog / writing section.
- CMS or backend for content.
- Custom 3D or WebGL.

---

## 8. Resolved decisions

1. **Resume PDF** — generated from the data layer with `npm run resume`
   (`scripts/generate-resume.mjs`) and served from `public/resume.pdf`.
2. **Arch Linux** — kept in the neofetch panel.
3. **Phone number** — kept private; the site shows email, GitHub, and LinkedIn
   only.
4. **SIPERPUS repo** — `github.com/RPL-TI-3B/ver3` is public and linked.
