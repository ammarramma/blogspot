/**
 * Project schema — add a new object here and the UI, filters, and resume
 * pick it up automatically.
 *
 * slug        unique anchor id
 * title       display name
 * subtitle    one-line description
 * category    one of the filter categories below
 * version     semver string, or null while unreleased
 * status      'released' | 'development'
 * featured    true to show the Featured badge (grid stays uniform)
 * type        project ownership / format label
 * stack       technology chips
 * bullets     outcome-focused highlights
 * liveUrl     optional live product link
 * liveLabel   display text for the live link
 * repo        optional source URL
 * repoLabel   display text for the source link
 */
export const projects = [
  {
    slug: 'vibe-check',
    title: 'Vibe-Check Security Scanner',
    subtitle: 'Web security & leak scanner for AI coding agents',
    category: 'Security & API',
    version: 'v1.0.0',
    status: 'released',
    featured: true,
    type: 'Personal project · Web application',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Cloudflare Workers'],
    bullets: [
      'Audits 27 HTTP security headers, TLS 1.3, exposed sensitive files, and leaked secrets in under 600 ms.',
      'Turns findings into a prioritized, human-readable score with a Markdown export built for AI coding agents.',
      'Runs entirely on Cloudflare Workers at the edge, with a focused React 19 dashboard and no backend to maintain.',
      'Designed as a pre-deploy check: paste a URL and get an actionable fix list on one screen.',
    ],
    liveUrl: 'https://scan.ammarramma.dev',
    liveLabel: 'scan.ammarramma.dev',
    repo: 'https://github.com/ammarramma/vibecheck',
    repoLabel: 'ammarramma / vibecheck',
  },
  {
    slug: 'mapi',
    title: 'mapi — Modular API Gateway',
    subtitle: 'Production Go API behind a hardened edge',
    category: 'Security & API',
    version: 'v1.0.0',
    status: 'released',
    featured: true,
    type: 'Personal project · Backend service',
    stack: ['Go', 'Gin', 'Caddy', 'Linux VPS', 'systemd'],
    bullets: [
      'Modular monolith REST API in Go/Gin, split into domain modules behind a shared middleware pipeline.',
      'Layered SSRF protection, per-IP token-bucket rate limiting, and an anti-OOM concurrency guard.',
      'Caddy handles automatic TLS and reverse proxying while systemd keeps the service supervised and self-healing.',
      'Health-checked and served publicly at api.ammarramma.dev.',
    ],
    liveUrl: 'https://api.ammarramma.dev/healthz',
    liveLabel: 'api.ammarramma.dev/healthz',
    repo: 'https://github.com/ammarramma/mapi',
    repoLabel: 'ammarramma / mapi',
  },
  {
    slug: 'prayer-times',
    title: 'Prayer Times',
    subtitle: 'Terminal prayer schedule in Go',
    category: 'CLI / Go',
    version: 'v0.1.1',
    status: 'released',
    featured: false,
    type: 'Personal project · TUI',
    stack: ['Go', 'TUI'],
    bullets: [
      'Built a keyboard-driven terminal UI in Go that shows the next prayer window and the full daily schedule.',
      'Kept the interface compact enough for SSH sessions and low-resource machines.',
      'Published a versioned GitHub release with a ready-to-run binary.',
    ],
    repo: 'https://github.com/ammarramma/prayer-times',
    repoLabel: 'ammarramma / prayer-times',
  },
]

export const projectCategories = [
  'All',
  ...new Set(projects.map((project) => project.category)),
]
