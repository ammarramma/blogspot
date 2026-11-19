import { motion, useReducedMotion } from 'framer-motion'
import StatusPill from '../components/StatusPill'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

const featuredProducts = projects.filter(
  (project) => project.featured && project.liveUrl,
)

const facts = [
  ['Focus', 'Go APIs · React · web security'],
  ['Building', 'Live products and own infrastructure'],
  ['Based in', 'Lhokseumawe, Indonesia'],
]

export default function Hero() {
  const reduce = useReducedMotion()

  const container = reduce
    ? {}
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
      }

  const item = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return (
    <section
      id="top"
      className="dot-grid relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="shell">
        <motion.div
          variants={container}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : 'show'}
        >
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-[0.625rem] font-medium tracking-[0.22em] text-muted-foreground uppercase"
          >
            <span>Backend · Web · Security</span>
            <span>{profile.location} — UTC+7</span>
          </motion.div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <motion.div variants={item}>
              <p className="text-[0.6875rem] font-medium tracking-[0.26em] text-primary uppercase">
                Independent portfolio · 2026
              </p>

              <h1 className="mt-4 font-serif text-[clamp(4rem,11vw,9rem)] leading-[0.84] font-semibold tracking-[-0.05em] text-foreground">
                {profile.name}
                <span aria-hidden="true" className="text-primary">
                  .
                </span>
              </h1>

              <p className="mt-8 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                {profile.role}
              </p>
              <p className="mt-2 text-[0.6875rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                {profile.headline}
              </p>

              <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
                {profile.tagline}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-full border border-primary bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
                >
                  View selected work
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/60 hover:text-primary hover:shadow-sm motion-reduce:hover:translate-y-0"
                >
                  Get in touch
                </a>
                <a
                  href={profile.resume}
                  download
                  className="px-2 py-3 text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                >
                  Download CV ↓
                </a>
              </div>
            </motion.div>

            <motion.aside
              variants={item}
              className="flex flex-col gap-9 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
            >
              <div>
                <p className="text-[0.625rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                  Currently
                </p>
                <div className="mt-4">
                  <StatusPill>{profile.status}</StatusPill>
                </div>

                <dl className="mt-8 space-y-5">
                  {facts.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[0.625rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        {label}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-foreground">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="mt-auto border-t border-border pt-6 font-serif text-lg leading-7 text-muted-foreground italic">
                “Clear interfaces, secure systems, and code that earns its
                place.”
              </p>
            </motion.aside>
          </div>

          <motion.div variants={item} className="mt-16 sm:mt-24">
            <div className="flex items-center gap-4">
              <p className="text-[0.625rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                Live products
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
              <span className="text-[0.625rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                Selected
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {featuredProducts.map((project, index) => (
                <a
                  key={project.slug}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} — live product`}
                  className="group flex flex-col rounded-xl border border-border bg-card/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-ring/60 hover:shadow-md motion-reduce:hover:translate-y-0 sm:p-6"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg leading-none text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    >
                      ↗
                    </span>
                  </span>

                  <span className="mt-7 font-serif text-2xl leading-tight font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </span>
                  <span className="mt-2 text-sm leading-6 text-muted-foreground">
                    {project.subtitle}
                  </span>

                  <span className="mt-5 flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.625rem] text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-chart-2"
                    />
                    {project.liveLabel}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
