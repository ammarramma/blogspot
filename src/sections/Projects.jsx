import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import { projectCategories, projects } from '../data/projects'

function ProjectLinks({ project }) {
  const linkClass =
    'group/link inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1.5 text-[0.6875rem] font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/60 hover:text-primary hover:shadow-sm motion-reduce:hover:translate-y-0'

  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Live Demo
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      ) : null}

      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Source
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      ) : null}

      <span className="ml-auto hidden max-w-[14rem] truncate font-mono text-[0.625rem] text-muted-foreground sm:block">
        {project.liveLabel ?? project.repoLabel}
      </span>
    </div>
  )
}

function ProjectCard({ project, reduce }) {
  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.985 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
              layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            }
      }
      className="h-full"
    >
      <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-ring/60 hover:shadow-md motion-reduce:hover:translate-y-0 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[0.625rem] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors group-hover:text-primary">
            {project.category}
          </span>
          {project.featured ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ring/40 bg-ring/10 px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.1em] text-primary uppercase">
              <span aria-hidden="true">✦</span>
              Featured
            </span>
          ) : null}
        </div>

        <h3 className="mt-5 font-serif text-2xl leading-tight font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {project.subtitle}
        </p>
        <p className="mt-3 text-[0.6875rem] text-muted-foreground">
          {project.type} · {project.version ?? 'In development'}
        </p>

        <ul className="mt-5 flex-1 space-y-2 text-sm leading-6 text-muted-foreground">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-chart-4"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <p className="text-[0.625rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Stack
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {project.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/60 hover:text-primary motion-reduce:hover:translate-y-0"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const reduce = useReducedMotion()

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  )

  return (
    <section id="projects" className="pb-24 sm:pb-32">
      <div className="shell">
        <SectionHeader
          index="03"
          title="Projects"
          eyebrow="Selected work"
          description="Live products and shipped builds across security, web, and Go. Filter by category — new work slots in without touching the layout."
        />

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-2"
          >
            {projectCategories.map((category) => {
              const isActive = category === filter
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={isActive}
                  className={`relative rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-primary text-primary-foreground'
                      : 'border-border bg-card/40 text-muted-foreground hover:-translate-y-0.5 hover:border-ring/60 hover:text-primary motion-reduce:hover:translate-y-0'
                  }`}
                >
                  {isActive ? (
                    reduce ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    ) : (
                      <motion.span
                        layoutId="project-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )
                  ) : null}
                  <span className="relative z-10">{category}</span>
                </button>
              )
            })}
          </div>

          <p
            aria-live="polite"
            className="text-[0.6875rem] font-medium text-muted-foreground"
          >
            {String(filtered.length).padStart(2, '0')} /{' '}
            {String(projects.length).padStart(2, '0')} projects
          </p>
        </div>

        <motion.div layout={!reduce} className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                reduce={reduce}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
