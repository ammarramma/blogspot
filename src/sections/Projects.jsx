import SectionHeader from '../components/SectionHeader'
import TerminalWindow from '../components/TerminalWindow'
import StatusPill from '../components/StatusPill'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

function ProjectCard({ project }) {
  return (
    <TerminalWindow
      title={`~/projects/${project.slug}`}
      right={project.version ?? 'wip'}
      className="group flex h-full flex-col transition-colors hover:border-line-strong"
      bodyClassName="flex flex-1 flex-col"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-mono text-base text-fg transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-fg-muted">{project.subtitle}</p>
        </div>
        {project.status === 'development' ? (
          <StatusPill tone="amber">in development</StatusPill>
        ) : null}
      </div>

      <p className="mt-4 font-mono text-[11px] text-fg-dim">{project.type}</p>

      <ul className="mt-4 space-y-1.5 text-sm leading-6 text-fg-muted">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5">
            <span aria-hidden="true" className="text-fg-dim">
              -
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tool) => (
          <li
            key={tool}
            className="border border-line bg-bg-0 px-2 py-0.5 font-mono text-[10px] text-fg-dim"
          >
            {tool}
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-line pt-4">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] text-fg-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true" className="text-accent">
            →
          </span>
          {project.repoLabel}
          <span aria-hidden="true" className="text-fg-dim">
            ↗
          </span>
        </a>
      </div>
    </TerminalWindow>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          command="ls ~/projects"
          index="03 / projects"
          label="Projects"
          description="Three builds I can point to: a team library system, a Go terminal app, and a Laravel tool still in the shop."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 0.08}
              className={index === 0 ? 'h-full md:col-span-2' : 'h-full'}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
