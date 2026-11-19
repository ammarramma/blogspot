import { useEffect, useState } from 'react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-4 w-4"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-4 w-4"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export default function StatusBar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement

    setTheme(next)
    root.classList.toggle('dark', next === 'dark')
    root.dataset.theme = next
    root.style.colorScheme = next

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', next === 'dark' ? '#191724' : '#faf4ed')
    }

    try {
      localStorage.setItem('theme', next)
    } catch {
      /* Storage can be unavailable in private modes. */
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="shell flex h-16 items-center justify-between gap-4"
      >
        <a
          href="#top"
          aria-label="Ammar — back to top"
          className="group flex items-baseline gap-2.5 text-foreground transition-colors hover:text-primary"
        >
          <span className="font-serif text-xl font-semibold tracking-tight">
            Ammar
          </span>
          <span className="hidden text-[0.625rem] font-medium tracking-[0.22em] text-muted-foreground uppercase transition-colors group-hover:text-primary sm:inline">
            Portfolio
          </span>
        </a>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative text-sm transition-colors ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Switch to Rosé Pine Dawn light theme'
                : 'Switch to Rosé Pine dark theme'
            }
            aria-pressed={theme === 'dark'}
            title={
              theme === 'dark'
                ? 'Rosé Pine Dark · switch to Dawn'
                : 'Rosé Pine Dawn · switch to Dark'
            }
            className="group flex h-9 items-center gap-2 rounded-full border border-border bg-card/60 px-3 text-[0.6875rem] font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/60 hover:text-primary hover:shadow-sm motion-reduce:hover:translate-y-0"
          >
            <span className="transition-transform duration-300 group-hover:rotate-12">
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </span>
            <span>{theme === 'dark' ? 'Dark' : 'Dawn'}</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/60 hover:text-primary md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
        >
          <ul className="shell py-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-3 text-sm text-muted-foreground transition-colors last:border-0 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
