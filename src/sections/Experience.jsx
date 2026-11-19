import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'

const typeTone = {
  work: 'bg-chart-5',
  edu: 'bg-muted-foreground',
  cert: 'bg-chart-2',
}

const typeText = {
  work: 'text-primary',
  edu: 'text-muted-foreground',
  cert: 'text-chart-3 dark:text-chart-1',
}

export default function Experience() {
  return (
    <section id="experience" className="pb-24 sm:pb-32">
      <div className="shell">
        <SectionHeader
          index="04"
          title="Experience"
          eyebrow="Timeline"
          description="Work, education, and certification — in reverse chronological order."
        />

        <Reveal>
          <ol className="border-l border-border pl-6 sm:pl-8">
            {profile.career.map((entry) => (
              <li
                key={`${entry.year}-${entry.title}`}
                className="group relative -mx-3 rounded-xl px-3 pb-10 transition-colors last:pb-0 hover:bg-card/50"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[31px] h-2 w-2 rounded-full ring-4 ring-background transition-transform duration-200 group-hover:scale-125 sm:-left-[39px] ${
                    typeTone[entry.type]
                  }`}
                />
                <div className="flex flex-wrap items-center gap-2 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
                  <span className="text-muted-foreground">{entry.year}</span>
                  <span aria-hidden="true" className="text-border">
                    /
                  </span>
                  <span className={typeText[entry.type]}>{entry.type}</span>
                </div>
                <h3 className="mt-1.5 font-serif text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {entry.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {entry.meta}
                </p>

                {entry.bullets.length > 0 ? (
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-muted-foreground">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
