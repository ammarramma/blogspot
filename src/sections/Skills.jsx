import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'

export default function Skills() {
  return (
    <section id="stack" className="pb-24 sm:pb-32">
      <div className="shell">
        <SectionHeader
          index="02"
          title="Stack"
          eyebrow="Toolkit"
          description="The tools I reach for, grouped by how I use them. No percentage bars — just what I actually work with."
        />

        <Reveal>
          <div className="border-t border-border">
            {profile.skills.map((group) => (
              <div
                key={group.group}
                className="group grid gap-3 border-b border-border py-5 transition-colors hover:bg-card/40 sm:grid-cols-[180px_1fr] sm:items-start sm:gap-6"
              >
                <h3 className="text-[0.6875rem] font-medium tracking-[0.14em] text-muted-foreground uppercase transition-colors group-hover:text-primary">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:border-ring/60 hover:bg-card hover:text-primary hover:shadow-md motion-reduce:hover:translate-y-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
