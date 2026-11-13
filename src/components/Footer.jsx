import { socials } from '../data/profile'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 font-mono text-[0.6875rem] text-fg-dim md:flex-row md:items-center md:justify-between">
        <p className="leading-6">
          <span className="text-accent">$</span> exit
          <span aria-hidden="true" className="mx-2 text-line-strong">
            /
          </span>
          © {year} Ammar
          <span aria-hidden="true" className="mx-2 text-line-strong">
            /
          </span>
          Built with React, Tailwind, and too much time in the terminal.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={
                social.href.startsWith('mailto:')
                  ? undefined
                  : 'noopener noreferrer'
              }
              className="transition-colors hover:text-fg"
            >
              {social.label}
            </a>
          ))}
          <a href="#top" className="transition-colors hover:text-fg">
            back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
