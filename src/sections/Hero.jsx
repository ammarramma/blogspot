import { motion, useReducedMotion } from 'framer-motion'
import TerminalWindow from '../components/TerminalWindow'
import StatusPill from '../components/StatusPill'
import { profile } from '../data/profile'

export default function Hero() {
  const reduce = useReducedMotion()

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section
      id="top"
      className="terminal-grid relative flex min-h-screen items-center pt-24 pb-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div {...fade}>
          <TerminalWindow
            title="ammar@lhokseumawe: ~"
            right="bash"
            className="shadow-[0_1px_0_0_rgba(232,236,230,0.04)_inset]"
          >
            <p className="font-mono text-xs text-fg-muted sm:text-sm">
              <span className="text-accent">$</span> whoami
            </p>

            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
              {profile.name}
              <span
                aria-hidden="true"
                className="caret ml-2 inline-block h-[0.68em] w-[0.36em] translate-y-[0.04em] bg-accent"
              />
            </h1>

            <div className="mt-5 space-y-1">
              <p className="font-mono text-sm text-fg sm:text-base">
                {profile.role}
              </p>
              <p className="font-mono text-xs text-fg-muted sm:text-sm">
                {profile.headline} · {profile.location}
              </p>
            </div>

            <p className="mt-8 max-w-xl text-[15px] leading-7 text-fg-muted">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="border border-accent/40 bg-accent/10 px-4 py-2.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg-0"
              >
                [ view projects ]
              </a>
              <a
                href="#contact"
                className="border border-line px-4 py-2.5 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                [ get in touch ]
              </a>
              <a
                href={profile.resume}
                download
                className="px-2 py-2.5 font-mono text-xs text-fg-dim underline decoration-line underline-offset-4 transition-colors hover:text-fg"
              >
                resume.pdf ↓
              </a>
            </div>

            <div className="mt-10 border-t border-line pt-5">
              <StatusPill>{profile.status}</StatusPill>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}
