import { socials } from '../data/profile'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="shell flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a
            href="#top"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            Ammar
          </a>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Backend, web, and security engineering for products that need to
            stay fast, clear, and hard to break.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
              className="capitalize transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
            >
              {social.label}
            </a>
          ))}
          <a
            href="#top"
            className="transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
          >
            Back to top ↑
          </a>
        </div>
      </div>

      <div className="shell border-t border-border py-4 text-xs text-muted-foreground">
        © {year} Ammar. Built with React and Tailwind CSS.
      </div>
    </footer>
  )
}
