import TerminalWindow from '../components/TerminalWindow'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader command="cat about.md" index="01 / about" label="About" />

        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal className="space-y-5">
            {profile.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[0.9375rem] leading-8 text-fg-muted"
              >
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 font-mono text-[0.6875rem] text-fg-dim">
              <span>
                <span className="text-accent">#</span> based in Lhokseumawe, ID
              </span>
              <span>
                <span className="text-accent">#</span> open to internships
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <TerminalWindow title="neofetch">
              <div className="min-w-0">
                <p className="font-mono text-xs text-fg">
                  ammar@lhokseumawe
                </p>
                <div className="my-2 h-px bg-line" />
                <dl className="space-y-1.5 font-mono text-[0.6875rem] leading-relaxed">
                  {profile.neofetch.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[80px_1fr] gap-2"
                    >
                      <dt className="text-fg-dim">{label}</dt>
                      <dd className="break-words text-fg-muted">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="mt-4 border-t border-line pt-3 font-mono text-[0.625rem] text-fg-dim">
                neofetch · 8 fields · text/plain
              </p>
            </TerminalWindow>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
