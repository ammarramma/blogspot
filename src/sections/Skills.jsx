import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'

export default function Skills() {
  return (
    <section id="skills" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          command="stack --list"
          index="02 / stack"
          label="Skills"
          description="The tools I reach for, grouped by how I use them. No percentage bars — just what I actually work with."
        />

        <Reveal>
          <div className="border-t border-line">
            {profile.skills.map((group) => (
              <div
                key={group.group}
                className="grid gap-3 border-b border-line py-5 sm:grid-cols-[180px_1fr] sm:items-start sm:gap-6"
              >
                <h3 className="font-mono text-[11px] tracking-[0.14em] text-fg-dim uppercase">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-line bg-bg-1 px-2.5 py-1 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
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
