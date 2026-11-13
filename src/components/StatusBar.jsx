import { useEffect, useState } from 'react'

const links = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'experience', label: 'experience' },
  { id: 'contact', label: 'contact' },
]

export default function StatusBar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg-0/90 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="shell flex h-11 items-center justify-between"
      >
        <a
          href="#top"
          className="font-mono text-xs text-fg-muted transition-colors hover:text-fg"
        >
          <span className="text-accent">ammar@portfolio</span>
          <span className="text-fg-dim">:~$</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`font-mono text-xs transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={isActive ? 'text-accent' : 'text-transparent'}
                  >
                    [
                  </span>{' '}
                  {link.label}{' '}
                  <span
                    aria-hidden="true"
                    className={isActive ? 'text-accent' : 'text-transparent'}
                  >
                    ]
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-line font-mono text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg md:hidden"
        >
          {open ? 'x' : ':'}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-line bg-bg-0/95 backdrop-blur-md md:hidden"
        >
          <ul className="shell py-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 border-b border-line py-3 font-mono text-sm text-fg-muted last:border-0 hover:text-fg"
                >
                  <span aria-hidden="true" className="text-accent">
                    &gt;
                  </span>
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
