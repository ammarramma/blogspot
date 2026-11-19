export const profile = {
  name: 'Ammar',
  handle: 'ammar',
  role: 'Backend, Web & Security Engineer',
  headline: 'D-IV Informatics Engineering Student · Polnes',
  location: 'Lhokseumawe, Aceh, Indonesia',
  status: 'Open to internship & collaboration',
  email: 'contact@ammarramma.dev',
  // Long-lived address for resumes and primary accounts; the domain address
  // above is only guaranteed to live as long as the site domain does.
  resumeEmail: 'ammarramma.work@gmail.com',
  github: 'https://github.com/ammarramma',
  githubLabel: 'github.com/ammarramma',
  linkedin: 'https://linkedin.com/in/ammarramma',
  linkedinLabel: 'linkedin.com/in/ammarramma',
  resume: '/resume.pdf',
  tagline:
    'I build secure backends, fast web apps, and interfaces that feel effortless — from Go APIs on a Linux VPS to React frontends on the edge.',
  about: [
    "I'm a D-IV Informatics Engineering student at Politeknik Negeri Lhokseumawe who works across backend, full-stack, and web security. I build with Go/Gin, Laravel, React/TypeScript, and Supabase — then ship to Linux VPS and Cloudflare's edge.",
    'Security is part of how I build, not an afterthought: automated security auditing, SSRF and header hardening, rate limiting, and secret-leak detection. I also run my own infrastructure with Caddy, systemd, and Cloudflare.',
    'Before IT I studied Visual Communication Design, so hierarchy and clarity come naturally. That background is why my dashboards and interfaces stay legible even when the system underneath is complex — and why I keep learning in public through real, live products.',
  ],
  facts: [
    ['Role', 'Backend, Web & Security Engineer'],
    ['Focus', 'Secure APIs, full-stack apps, auditing'],
    ['Education', 'D-IV Informatics, Polnes'],
    ['Location', 'Lhokseumawe, Aceh, ID'],
    ['Core stack', 'Go · Laravel · React · Supabase'],
    ['Infrastructure', 'Linux VPS · Caddy · Cloudflare'],
    ['Security', 'Auditing · SSRF · Header hardening'],
    ['Status', 'Open to internships'],
  ],
  skills: [
    {
      group: 'Languages',
      items: ['Go', 'TypeScript', 'JavaScript', 'PHP', 'Python', 'Bash', 'SQL'],
    },
    {
      group: 'Backend & APIs',
      items: [
        'Gin',
        'Laravel',
        'REST API Design',
        'Supabase',
        'MySQL',
        'Relational DB Design',
      ],
    },
    {
      group: 'Frontend',
      items: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'Vite'],
    },
    {
      group: 'Cloud & Infra',
      items: [
        'Cloudflare Workers',
        'Cloudflare Edge',
        'Caddy',
        'Linux VPS',
        'systemd',
      ],
    },
    {
      group: 'Security',
      items: [
        'Web Security Auditing',
        'SSRF Mitigation',
        'HTTP Header Hardening',
        'Secret & Leak Scanning',
        'Rate Limiting',
      ],
    },
    {
      group: 'Tools & Workflow',
      items: ['Git', 'GitHub', 'Linux CLI', 'PHPUnit'],
    },
  ],
  career: [
    {
      year: '2025',
      type: 'cert',
      title: 'VSGA — Web Developer',
      meta: 'Vocational certification · 2025',
      bullets: [],
    },
    {
      year: '2024',
      type: 'edu',
      title: 'Politeknik Negeri Lhokseumawe',
      meta: 'D-IV Teknik Informatika · 2024 – present',
      bullets: [],
    },
    {
      year: '2023',
      type: 'work',
      title: 'Atjeh Mediatama Indonesia',
      meta: 'Internship (PKL) · 2023',
      bullets: [
        'Supported print media production and printing operations.',
        'Operated production equipment and assisted with simple design work.',
        'Supported daily operations as required by the team.',
      ],
    },
    {
      year: '2020',
      type: 'edu',
      title: 'SMK Negeri 2 Lhokseumawe',
      meta: 'Visual Communication Design · 2020–2021, 2022–2024',
      bullets: [],
    },
  ],
}

export const socials = [
  { label: 'email', href: `mailto:${profile.email}`, text: profile.email },
  { label: 'github', href: profile.github, text: profile.githubLabel },
  { label: 'linkedin', href: profile.linkedin, text: profile.linkedinLabel },
]
