export const profile = {
  name: 'Ammar',
  handle: 'ammar',
  role: 'Backend & Web Developer',
  headline: 'D-IV Information Technology student',
  location: 'Lhokseumawe, Aceh, Indonesia',
  status: 'Open to internship opportunities',
  email: 'ammarshiddiq2@gmail.com',
  github: 'https://github.com/ammarramma',
  githubLabel: 'github.com/ammarramma',
  linkedin: 'https://linkedin.com/in/ammarramma',
  linkedinLabel: 'linkedin.com/in/ammarramma',
  resume: '/resume.pdf',
  tagline:
    'I build web applications with Laravel, Supabase, and Go — and I care about how they feel, not just how they work.',
  about: [
    "I'm an Information Technology student at Politeknik Negeri Lhokseumawe, focused on web and backend development. I build applications with PHP, Laravel, JavaScript, and TypeScript, and I integrate Supabase for authentication, databases, and data storage.",
    "I work from the terminal — Git, GitHub, and the Linux CLI are part of my daily workflow. Before IT, I studied Visual Communication Design, which is why I care about hierarchy, clarity, and interfaces that don't need explaining.",
    "I'm currently looking for an internship where I can contribute to a real software team and keep learning in public.",
  ],
  neofetch: [
    ['Role', 'Backend / Web Developer'],
    ['Education', 'D-IV Informatics, Polnes'],
    ['Location', 'Lhokseumawe, Aceh, ID'],
    ['Languages', 'PHP · TypeScript · Go · Python · Bash'],
    ['Frameworks', 'Laravel · Supabase · React'],
    ['Tools', 'Git · GitHub · Linux CLI'],
    ['OS', 'Arch Linux'],
    ['Status', 'Open to internships'],
  ],
  skills: [
    {
      group: 'Languages',
      items: ['PHP', 'JavaScript', 'TypeScript', 'Go', 'Python', 'Bash'],
    },
    {
      group: 'Backend & Data',
      items: ['Laravel', 'Supabase', 'MySQL', 'Relational DB Design'],
    },
    {
      group: 'Frontend',
      items: ['React', 'HTML', 'CSS'],
    },
    {
      group: 'Tools & Workflow',
      items: ['Git', 'GitHub', 'Linux CLI', 'PHPUnit'],
    },
    {
      group: 'Focus',
      items: ['Web Development', 'Backend Development', 'Automation'],
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
